"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DottedField } from "@/components/ui/DottedField";
import { Sparkles, User, Database, Check, Cpu, MessageSquare, History } from "lucide-react";

export function DeepContextChatSection() {
  const contextPills = [
    { label: "18 Past Sessions Analyzed", status: "Verified" },
    { label: "Sleep Average: 7.4 hrs", status: "Optimal" },
    { label: "Protein Adherence: 96%", status: "On Target" },
    { label: "Bench Progression: +10 KG", status: "Active" },
    { label: "Accumulated CNS Fatigue: Low", status: "Green" },
  ];

  return (
    <section className="relative py-28 md:py-36 bg-[#07080b] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#ccff00]/5 rounded-full blur-[170px] pointer-events-none -z-10"></div>

      {/* Restrained organized dot field — memory console pattern */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 opacity-60">
        <DottedField
          pattern="organize"
          spacing={24}
          baseAlpha={0.1}
          mouseRadius={85}
          mouseStrength={0.35}
          fixed={false}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="11 // LONGITUDINAL MEMORY"
          title="An AI coach that remembers every rep."
          description="Generic AI models forget who you are between prompts. IntFit.ai retains deep continuous memory of your fatigue history, strength PRs, and nutritional compliance."
        />

        {/* Deep AI Chat Terminal */}
        <motion.div
          initial={{ opacity: 0.2, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#0c1018] border border-white/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Active Context Bar */}
          <div className="p-4 sm:p-5 bg-[#121622] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#ccff00]" />
              <span className="text-xs font-mono text-white font-medium">
                Active Memory Context:
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {contextPills.map((pill) => (
                <span
                  key={pill.label}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300"
                >
                  <span className="text-[#ccff00] font-semibold">✓</span>
                  {pill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Chat Messages */}
          <div className="p-6 sm:p-10 space-y-6">
            {/* User Message */}
            <div className="flex items-start justify-end gap-3 max-w-xl ml-auto">
              <div className="rounded-2xl rounded-tr-sm bg-[#1a2133] border border-white/15 p-4 sm:p-5 text-white shadow-lg">
                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                  YOU • YESTERDAY 07:15 PM
                </div>
                <p className="font-medium text-base text-white">
                  &ldquo;What should I change next week?&rdquo;
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                <User className="w-4 h-4" />
              </div>
            </div>

            {/* AI Deep Contextual Reply */}
            <div className="flex items-start gap-3.5 max-w-2xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ccff00] to-[#84cc16] flex items-center justify-center text-black shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div className="rounded-2xl rounded-tl-sm bg-[#111624] border border-[#ccff00]/30 p-5 sm:p-6 text-sm sm:text-base text-gray-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#ccff00] font-semibold">
                  <span>INTFIT.AI COMPANION</span>
                  <span className="text-gray-400">Contextual Reasoning Synthesized</span>
                </div>

                <p className="leading-relaxed text-white">
                  Looking at your last 4 weeks: your bench press working capacity has adapted exceptionally well (<span className="text-[#ccff00] font-semibold">+10 KG</span> total).
                </p>

                <p className="leading-relaxed text-gray-300">
                  However, your triceps pushdown velocity dropped by <span className="text-red-400 font-semibold">18%</span> on Thursday, indicating accumulated isolation fatigue.
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="text-[#ccff00] font-bold uppercase tracking-wider">
                    Prescription for Next Week:
                  </div>
                  <div className="text-gray-300">
                    1. <span className="text-white font-semibold">Chest Primary:</span> Keep load at 80 KG • Target 3 × 9 reps.
                  </div>
                  <div className="text-gray-300">
                    2. <span className="text-white font-semibold">Triceps Accessory:</span> Reduce sets from 4 to 3 to facilitate neuromuscular recovery.
                  </div>
                  <div className="text-gray-300">
                    3. <span className="text-white font-semibold">Nutrition:</span> Increase pre-workout carbohydrates by 30g to maximize glycogen stores.
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-mono italic">
                  I&apos;ve already pre-calibrated your session schedule starting Monday morning.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
