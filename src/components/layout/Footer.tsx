import React from "react";
import Link from "next/link";
import { Activity, Twitter, Github, Instagram, Disc as Discord } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050608] text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ccff00] to-[#84cc16] flex items-center justify-center text-[#07080b] shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                <Activity className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold tracking-tight text-white">Int</span>
                <span className="text-xl font-bold tracking-tight text-[#ccff00]">Fit</span>
                <span className="text-sm font-mono font-bold text-[#ccff00]/90 ml-0.5 tracking-normal">.ai</span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Your personal AI fitness companion. Continuously analyzing session velocity, autoregulating progressive overload, and tailoring nutrition around your actual performance.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.03] border border-white/10 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
                Engine v4.2 Online
              </span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#workout" className="hover:text-white transition-colors">
                  Adaptive Workouts
                </Link>
              </li>
              <li>
                <Link href="#progression" className="hover:text-white transition-colors">
                  Progressive Overload
                </Link>
              </li>
              <li>
                <Link href="#intelligence" className="hover:text-white transition-colors">
                  AI Fitness Coach
                </Link>
              </li>
              <li>
                <Link href="#nutrition" className="hover:text-white transition-colors">
                  Nutrition Telemetry
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Methodology */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Science
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Autoregulation (RPE)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Volume Thresholds
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Hypertrophy Curves
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Fatigue Management
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Research Papers
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Security Architecture
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cookie Preferences
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} IntFit.ai Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-5 text-gray-400">
            <a href="#" className="hover:text-[#ccff00] transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#ccff00] transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#ccff00] transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#ccff00] transition-colors" aria-label="Discord">
              <Discord className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
