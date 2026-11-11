"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, LogOut, LayoutDashboard, UserRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function AppHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080b]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ccff00] to-[#84cc16] text-[#07080b]">
            <Activity className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Int<span className="text-[#ccff00]">Fit</span>
            <span className="ml-0.5 font-mono text-sm text-[#ccff00]/90">.ai</span>
          </span>
        </Link>

        {user ? (
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <UserRound className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
