"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface LoginModalContentProps {
  isConfigured: boolean;
  error: string | null;
  onClearError: () => void;
  onSuccess: () => void;
  onSignIn: (email: string, password: string) => Promise<{ error: string | null }>;
  onSignUp: (email: string, password: string) => Promise<{ error: string | null; notice?: string }>;
  onSwitchToSignup: () => void;
}

export function LoginModalContent({
  isConfigured,
  error,
  onClearError,
  onSuccess,
  onSignIn,
  onSignUp,
  onSwitchToSignup,
}: LoginModalContentProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [localNotice, setLocalNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigured) return;
    setSubmitting(true);
    setLocalError(null);
    setLocalNotice(null);
    onClearError();

    const result: { error: string | null; notice?: string } =
      mode === "login"
        ? await onSignIn(email, password)
        : await onSignUp(email, password);

    if (result.error) {
      setLocalError(result.error);
      setSubmitting(false);
      return;
    }

    if (result.notice) {
      setLocalNotice(result.notice);
      setSubmitting(false);
      return;
    }

    // Login/signup succeeded — close the modal
    onSuccess();
  };

  const toggleMode = (next: "login" | "signup") => {
    setMode(next);
    setLocalError(null);
    setLocalNotice(null);
    onClearError();
  };

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl bg-white/[0.03] border border-white/10">
        <button
          type="button"
          onClick={() => toggleMode("login")}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
            mode === "login"
              ? "bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => toggleMode("signup")}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
            mode === "signup"
              ? "bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="auth-email"
            className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5"
          >
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-mono placeholder-gray-600 focus:outline-none focus:border-[#ccff00]/60 focus:shadow-[0_0_20px_-5px_rgba(204,255,0,0.3)] transition-all disabled:opacity-50"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="auth-password"
            className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1.5"
          >
            Password
          </label>
          <input
            id="auth-password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-mono placeholder-gray-600 focus:outline-none focus:border-[#ccff00]/60 focus:shadow-[0_0_20px_-5px_rgba(204,255,0,0.3)] transition-all disabled:opacity-50"
            placeholder="••••••••"
          />
        </div>

        {!isConfigured && (
          <p className="text-xs text-amber-400 font-mono">
            Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.
          </p>
        )}

        {(error || localError) && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-xs text-red-300 font-mono">
              {localError || error}
            </p>
          </div>
        )}

        {localNotice && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3" role="status">
            <p className="text-xs text-emerald-200">{localNotice}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={submitting || !isConfigured}
        >
          {submitting ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
        </Button>

        <p className="text-center text-xs text-gray-400 font-mono">
          {mode === "login" ? "No account yet? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => toggleMode(mode === "login" ? "signup" : "login")}
            className="text-[#ccff00] hover:underline font-semibold"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </form>
    </div>
  );
}
