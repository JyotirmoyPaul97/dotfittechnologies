"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { nutritionMacroData } from "@/data/fitnessMockData";
import { Sparkles, Utensils, Flame, CheckCircle2, ChevronRight, Apple } from "lucide-react";

export function NutritionSection() {
  const tips = [
    {
      title: "Add 200g Greek Yogurt to Snack 2",
      protein: "+20g Protein",
      note: "High leucine content for muscle protein synthesis",
    },
    {
      title: "Whey Isolate Post-Workout",
      protein: "+25g Protein",
      note: "Rapid absorption within your 90-min recovery window",
    },
    {
      title: "Increase Lunch Chicken Portion by 50g",
      protein: "+15g Protein",
      note: "Seamless addition without altering total fat ratio",
    },
  ];

  return (
    <section id="nutrition" className="relative py-28 md:py-36 bg-[#07080b] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-[#38bdf8]/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="07 // METABOLIC FUEL & RECOVERY"
          title={
            <>
              Train hard.
              <br />
              <span className="text-gradient-lime">Fuel intelligently.</span>
            </>
          }
          description="Nutrition isn't a separate spreadsheet. IntFit.ai ties your caloric targets and macro splits directly to your daily training volume and metabolic output."
        />

        {/* Nutrition Interface Module (No Stock Food Photos!) */}
        <div
          className="rounded-3xl bg-[#0c1018] border border-white/15 p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] space-y-8"
        >
          {/* Top Caloric Overview Card */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.25)] shrink-0">
                <Flame className="w-7 h-7 stroke-[2]" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  TODAY&apos;S METABOLIC TARGET
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    2,450
                  </span>
                  <span className="text-sm font-mono text-gray-400">KCAL / DAY</span>
                </div>
                <span className="text-xs text-[#ccff00] font-mono">
                  +180 kcal surplus calibrated for Hypertrophy Day
                </span>
              </div>
            </div>

            {/* Macro Ratio Mini-Pills */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00]">
                Protein 25%
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8]">
                Carbs 50%
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30 text-[#a855f7]">
                Fat 25%
              </span>
            </div>
          </div>

          {/* 3 Macro Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {nutritionMacroData.map((macro, idx) => {
              return (
                <div
                  key={macro.name}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                      {macro.name}
                    </span>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: macro.color }}
                    >
                      {macro.current} / {macro.target} {macro.unit}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${macro.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: macro.color }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
                    <span>Adherence: {macro.percentage}%</span>
                    <span>{macro.target - macro.current > 0 ? `-${macro.target - macro.current}g gap` : "Target Met"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prompt AI Nutrition Insight Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#ccff00]/10 via-[#ccff00]/5 to-transparent border border-[#ccff00]/30 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#ccff00] text-black shrink-0 shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#ccff00] font-bold">
                  AI NUTRITION INSIGHT
                </div>
                <p className="text-base text-white font-medium mt-1">
                  &ldquo;You&apos;re consistently missing your protein target. Here are three practical ways to close the gap:&rdquo;
                </p>
              </div>
            </div>

            {/* 3 Practical Action Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {tips.map((tip, tIdx) => (
                <div
                  key={tIdx}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 font-semibold">
                      OPTION 0{tIdx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-[#ccff00] font-bold">
                      {tip.protein}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white leading-snug">{tip.title}</h5>
                  <p className="text-[11px] text-gray-400 font-mono leading-tight">{tip.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
