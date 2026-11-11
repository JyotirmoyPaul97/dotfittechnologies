"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { isProfileComplete } from "@/lib/profiles";

export default function AuthRedirectGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, profileLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    hasRedirectedRef.current = false;
  }, [user, profile, pathname]);

  useEffect(() => {
    if (hasRedirectedRef.current) return;
    if (loading || profileLoading) return;

    const authRoutes = ["/", "/login"];
    if (!user || !authRoutes.includes(pathname)) return;

    const destination = isProfileComplete(profile) ? "/dashboard" : "/setup";
    if (pathname !== destination) {
      hasRedirectedRef.current = true;
      router.replace(destination);
    }
  }, [user, profile, loading, profileLoading, pathname, router]);

  return <>{children}</>;
}