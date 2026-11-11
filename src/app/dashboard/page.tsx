"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Activity, ArrowRight, Clock, Dumbbell, Target, UserRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRequireAuth } from "@/hooks/use-auth-redirect";
import { AppHeader } from "@/components/layout/AppHeader";
import { heroExercises } from "@/data/fitnessMockData";

export default function DashboardPage() {
  const { user, profile, loading, profileLoading, isConfigured } = useAuth();
  useRequireAuth();

  if (loading || profileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080b] text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
          <p className="text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080b] px-4 text-center text-gray-400">
        Supabase is not configured. Add credentials to `.env.local` to use the app.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07080b] text-gray-400">
        Redirecting...
      </div>
    );
  }

  const displayName = profile?.name?.trim() || user.email || "Athlete";
  const todaySession = heroExercises.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f3f5f9]">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ccff00]/80">
          Session ready
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back, {displayName.split(" ")[0]}.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-400">
          Your training plan is calibrated around your profile. Review today&apos;s work, then
          keep your stats current so the next session can adapt.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Target className="h-4 w-4 text-[#ccff00]" />}
            label="Goal"
            value={labelize(profile?.goal) || "Not set"}
          />
          <StatCard
            icon={<Clock className="h-4 w-4 text-[#ccff00]" />}
            label="Weekly volume"
            value={
              profile?.days_per_week
                ? `${profile.days_per_week} days · ${profile.session_duration || "—"} min`
                : "Not set"
            }
          />
          <StatCard
            icon={<Dumbbell className="h-4 w-4 text-[#ccff00]" />}
            label="Training base"
            value={`${labelize(profile?.location) || "—"} · ${labelize(profile?.equipment) || "—"}`}
          />
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Today&apos;s session</h2>
              <p className="text-sm text-gray-400">Push emphasis · adaptive overload enabled</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-3 py-1 font-mono text-[11px] text-[#ccff00]">
              <Activity className="h-3 w-3" />
              Live plan
            </span>
          </div>
          <ul className="space-y-3">
            {todaySession.map((exercise) => (
              <li
                key={exercise.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-white">{exercise.name}</p>
                  <p className="font-mono text-xs text-gray-500">{exercise.category}</p>
                </div>
                <p className="font-mono text-sm text-[#ccff00]">
                  {exercise.sets}×{exercise.reps} @ {exercise.weight}
                  {exercise.unit}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#d9ff33]"
          >
            <UserRound className="h-4 w-4" />
            Edit profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
        {icon}
        {label}
      </div>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function labelize(value: string | null | undefined) {
  if (!value) return "";
  return value.replace(/_/g, " ");
}
