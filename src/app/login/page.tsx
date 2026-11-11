"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";
import { LoginModalContent } from "@/components/ui/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { isProfileComplete } from "@/lib/profiles";

export default function LoginPage() {
  const router = useRouter();
  const { isConfigured, error, clearError, signIn, signUp, user, profile, loading, profileLoading } =
    useAuth();

  useEffect(() => {
    if (loading || profileLoading || !user) return;
    router.replace(isProfileComplete(profile) ? "/dashboard" : "/setup");
  }, [loading, profileLoading, user, profile, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07080b] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#0c1018] p-8 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] sm:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ccff00] to-[#84cc16] text-black">
            <Activity className="h-5 w-5 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Welcome to IntFit.ai</h1>
            <p className="font-mono text-xs text-gray-400">Sign in or create your account</p>
          </div>
        </div>

        <LoginModalContent
          isConfigured={isConfigured}
          error={error}
          onClearError={clearError}
          onSuccess={() => {}}
          onSignIn={signIn}
          onSignUp={signUp}
          onSwitchToSignup={() => {}}
        />

        <p className="mt-6 text-center font-mono text-xs text-gray-500">
          <Link href="/" className="text-[#ccff00] hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
