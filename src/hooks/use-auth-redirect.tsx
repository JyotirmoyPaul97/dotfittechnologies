"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { isProfileComplete } from "@/lib/profiles";

export function useRequireAuth() {
  const { user, session, loading, error, isConfigured, profile, profileLoading, signIn, signUp, signOut, clearError, loadProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || profileLoading) return;

    // If user is not authenticated, take them to the real sign-in route.
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!isProfileComplete(profile)) {
      router.push("/setup");
      return;
    }
  }, [user, loading, profile, profileLoading, router]);

  return { user, session, loading, error, isConfigured, profile, profileLoading, signIn, signUp, signOut, clearError, loadProfile };
}

export function useRequireNoAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // If user is authenticated, redirect to dashboard
    if (user) {
      router.push("/dashboard");
      return;
    }
  }, [user, loading, router]);
}

export function useRequireProfile() {
  const { profile, loading, profileLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || profileLoading) return;

    if (!isProfileComplete(profile)) {
      router.push("/setup");
      return;
    }
  }, [profile, loading, profileLoading, router]);
}
