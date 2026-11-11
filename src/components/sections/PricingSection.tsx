"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const isAnnual = billingCycle === "annual";

  return (
    <section id="pricing" className="relative py-28 md:py-36 bg-[#090c12] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#ccff00]/5 rounded-full blur-[170px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="12 // MEMBERSHIP TIERS"
          title="Invest in intelligence, not guesswork."
          description="Transparent, simple membership options. Upgrade or downgrade at any time with zero commitment."
        />

        {/* Billing cycle switch */}
        <div className="flex justify-center mb-12">
          <div className="p-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1 backdrop-blur-md">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                !isAnnual
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                isAnnual
                  ? "bg-[#ccff00] text-black font-semibold shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-black/30 text-black px-2 py-0.5 rounded-full font-bold">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* 2-Tier Pricing Cards: Free vs Pro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* FREE TIER */}
          <motion.div
            initial={{ opacity: 0.2, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="cinema-card p-8 sm:p-10 rounded-3xl bg-[#0c1018] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all"
          >
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-semibold">
                  ENTRY TIER
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">FREE</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Basic fitness tracking and workout logging.
                </p>
              </div>

              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-gray-400">/ forever</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/10 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>Manual workout set & rep logging</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>Standard rest timer</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>Basic body-weight tracking chart</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 line-through">
                  <span>Dynamic AI autoregulation</span>
                </li>
                <li className="flex items-center gap-3 text-gray-500 line-through">
                  <span>Progressive overload engine</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <Button variant="secondary" size="md" className="w-full">
                Get Started Free
              </Button>
            </div>
          </motion.div>

          {/* PRO TIER (Featured) */}
          <motion.div
            initial={{ opacity: 0.2, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="cinema-card p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#141b29] to-[#0c1018] border-2 border-[#ccff00] flex flex-col justify-between shadow-[0_0_50px_-10px_rgba(204,255,0,0.3)] relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-[#ccff00] text-black text-[10px] font-mono font-extrabold tracking-widest uppercase px-4 py-1 rounded-bl-xl shadow-md">
              RECOMMENDED
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] font-semibold">
                  INTELLIGENT COMPANION
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">PRO</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Personalized AI fitness system that adapts every session.
                </p>
              </div>

              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">
                  {isAnnual ? "$14" : "$19"}
                </span>
                <span className="text-xs text-gray-400">
                  / month {isAnnual && "(billed annually)"}
                </span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/10 text-sm text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="font-semibold text-white">24/7 AI Coaching Companion</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Personalized adaptive workout generation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Automated progressive overload engine</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Intelligent nutrition & macro guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Longitudinal progress analysis & fatigue models</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                START YOUR JOURNEY →
              </Button>
              <div className="text-[11px] font-mono text-center text-gray-400 mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>14-day risk-free trial • Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
