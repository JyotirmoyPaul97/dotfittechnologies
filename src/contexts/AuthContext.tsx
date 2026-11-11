"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import { getProfile, ProfileFormData } from "@/lib/profiles";

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
  profile: ProfileFormData | null;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
  clearError: () => void;
  loadProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileFormData | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const clearError = useCallback(() => setError(null), []);

  // Refs to prevent duplicate profile loads for the same user
  const isFetchingProfileRef = useRef(false);
  const loadedUserIdRef = useRef<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!user?.id) {
      setProfile(null);
      return;
    }

    // If we are already fetching for this user, skip
    if (
      isFetchingProfileRef.current &&
      loadedUserIdRef.current === user.id
    ) {
      return;
    }

    isFetchingProfileRef.current = true;
    loadedUserIdRef.current = user.id;
    setProfileLoading(true);

    try {
      const profileData = await getProfile(user.id);
      setProfile(profileData ?? null);
    } catch (err) {
      console.error("Failed to load profile:", {
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
        userId: user.id
      });
      setProfile(null);
    } finally {
      setProfileLoading(false);
      isFetchingProfileRef.current = false;
    }
  }, [user]);

  // Load profile whenever the user id changes (and user is authenticated)
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    if (!user?.id) {
      setProfile(null);
      return;
    }
    loadProfile();
  }, [user?.id, loadProfile, isSupabaseConfigured]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let mounted = true;

    // Restore existing session on mount
    (async () => {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (!mounted) return;
      if (sessionError) {
        setError(sessionError.message);
      }
      const sessionUser = data.session?.user ?? null;
      setSession(data.session ?? null);
      setUser(sessionUser);
      if (sessionUser) {
        setProfileLoading(true);
        const profileData = await getProfile(sessionUser.id);
        if (!mounted) return;
        setProfile(profileData ?? null);
        loadedUserIdRef.current = sessionUser.id;
        setProfileLoading(false);
      }
      setLoading(false);
    })();

    // Listen for auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setError(null);
        // profile loading will trigger via user.id effect
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
        // Clear refs so a new login starts fresh
        isFetchingProfileRef.current = false;
        loadedUserIdRef.current = null;
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [isSupabaseConfigured]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!isSupabaseConfigured) {
        return { error: "Supabase is not configured." };
      }
      clearError();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
        return { error: authError.message };
      }
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setProfileLoading(true);
        const profileData = await getProfile(data.session.user.id);
        setProfile(profileData ?? null);
        loadedUserIdRef.current = data.session.user.id;
        setProfileLoading(false);
      }
      return { error: null };
    },
    [clearError]
  );

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) {
      return { error: "Supabase is not configured." };
    }
    const { error: authError } = await supabase.auth.signOut();
    if (authError) {
      setError(authError.message);
      return { error: authError.message };
    }
    setSession(null);
    setUser(null);
    setProfile(null);
    // Clear refs
    isFetchingProfileRef.current = false;
    loadedUserIdRef.current = null;
    return { error: null };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string) => {
      if (!isSupabaseConfigured) {
        return { error: "Supabase is not configured." };
      }
      clearError();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) {
        setError(authError.message);
        return { error: authError.message };
      }
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setProfileLoading(true);
        const profileData = await getProfile(data.session.user.id);
        setProfile(profileData ?? null);
        loadedUserIdRef.current = data.session.user.id;
        setProfileLoading(false);
        return { error: null };
      }
      return { error: "Account created. Confirm your email, then log in." };
    },
    [clearError]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      error,
      isConfigured: isSupabaseConfigured,
      profile,
      profileLoading,
      signIn,
      signUp,
      signOut,
      clearError,
      loadProfile,
    }),
    [
      user,
      session,
      loading,
      error,
      isSupabaseConfigured,
      profile,
      profileLoading,
      signIn,
      signUp,
      signOut,
      clearError,
      loadProfile,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}