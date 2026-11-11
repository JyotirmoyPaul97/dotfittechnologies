"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LoginModalContent } from "@/components/ui/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, ArrowRight, Activity, LogIn, LogOut } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { user, loading, isConfigured, signIn, signUp, signOut, error, clearError } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#07080b]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "py-5 bg-transparent"
      }`}
    >
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ccff00] to-[#84cc16] flex items-center justify-center text-[#07080b] shadow-[0_0_15px_rgba(204,255,0,0.4)] group-hover:scale-105 transition-transform">
              <Activity className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold tracking-tight text-white">Int</span>
              <span className="text-xl font-bold tracking-tight text-[#ccff00]">Fit</span>
              <span className="text-sm font-mono font-bold text-[#ccff00]/90 ml-0.5 tracking-normal">.ai</span>
              <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-[#ccff00] inline-block animate-pulse shadow-[0_0_8px_#ccff00]"></span>
            </div>
          </Link>

{/* Desktop Nav Items */}
           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
             <Link
               href="#problem"
               data-cursor="link"
               className="hover:text-white transition-colors duration-200"
             >
               The Problem
             </Link>
             <Link
               href="#intelligence"
               data-cursor="link"
               className="hover:text-white transition-colors duration-200"
             >
               AI Coach
             </Link>
             <Link
               href="#workout"
               data-cursor="link"
               className="hover:text-white transition-colors duration-200"
             >
               Workout Engine
             </Link>
             <Link
               href="#adaptation"
               data-cursor="link"
               className="hover:text-white transition-colors duration-200"
             >
               Adaptation
             </Link>
             <Link
               href="#how-it-works"
               data-cursor="link"
               className="hover:text-white transition-colors duration-200"
             >
               How It Works
             </Link>
             <Link
               href="#pricing"
               data-cursor="link"
               className="hover:text-white transition-colors duration-200"
             >
               Pricing
             </Link>
             {user && (
               <Link
                 href="/profile"
                 data-cursor="link"
                 className="hover:text-white transition-colors duration-200"
               >
                 Profile
               </Link>
             )}
           </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            {loading ? (
              <span className="text-xs sm:text-sm font-medium text-gray-500">…</span>
            ) : user ? (
              <button
                type="button"
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  clearError();
                  setLoginModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors"
                title="Log in"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log in</span>
              </button>
            )}
            <Link href="#pricing">
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Start Free
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger toggle — shown below `md` so tablet widths keep a menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-[#0a0d14]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 mt-3 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
        >
<nav className="flex flex-col space-y-3.5 text-base font-medium text-gray-300">
             <Link
               href="#problem"
               onClick={() => setMobileMenuOpen(false)}
               className="hover:text-[#ccff00] transition-colors"
             >
               The Problem
             </Link>
             <Link
               href="#intelligence"
               onClick={() => setMobileMenuOpen(false)}
               className="hover:text-[#ccff00] transition-colors"
             >
               AI Coach
             </Link>
             <Link
               href="#workout"
               onClick={() => setMobileMenuOpen(false)}
               className="hover:text-[#ccff00] transition-colors"
             >
               Workout Engine
             </Link>
             <Link
               href="#adaptation"
               onClick={() => setMobileMenuOpen(false)}
               className="hover:text-[#ccff00] transition-colors"
             >
               Adaptation
             </Link>
             <Link
               href="#how-it-works"
               onClick={() => setMobileMenuOpen(false)}
               className="hover:text-[#ccff00] transition-colors"
             >
               How It Works
             </Link>
             <Link
               href="#pricing"
               onClick={() => setMobileMenuOpen(false)}
               className="hover:text-[#ccff00] transition-colors"
             >
               Pricing
             </Link>
             {user && (
               <Link
                 href="/profile"
                 onClick={() => setMobileMenuOpen(false)}
                 className="hover:text-[#ccff00] transition-colors"
               >
                 Profile
               </Link>
             )}
           </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {loading ? (
              <span className="w-full text-center py-2 text-sm font-medium text-gray-500">…</span>
            ) : user ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
                className="w-full text-center py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  clearError();
                  setLoginModalOpen(true);
                }}
                className="w-full text-center py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Log in
              </button>
            )}
            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Start Free →
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Email + Password Login Modal */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
          onClick={() => {
            setLoginModalOpen(false);
            clearError();
          }}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-[#0c1018] border border-white/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] p-8 sm:p-10 animate-in slide-in-from-bottom-6 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setLoginModalOpen(false);
                clearError();
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close login modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ccff00] to-[#84cc16] flex items-center justify-center text-black shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                <Activity className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 id="login-modal-title" className="text-lg font-bold text-white tracking-tight">
                  Welcome back
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Sign in to your IntFit.ai account
                </p>
              </div>
            </div>

<LoginModalContent
               isConfigured={isConfigured}
               error={error}
               onClearError={clearError}
               onSuccess={() => {
                 setLoginModalOpen(false);
               }}
               onSignIn={signIn}
               onSignUp={signUp}
               onSwitchToSignup={() => {}}
             />
          </div>
        </div>
      )}
    </header>
  );
}
