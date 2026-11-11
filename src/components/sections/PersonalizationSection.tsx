"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Target, Award, Calendar, Dumbbell, Scale, Cpu, ArrowDown, Sparkles } from "lucide-react";

export function PersonalizationSection() {
  const telemetryPoints = [
    {
      label: "GOAL",
      value: "Build Muscle",
      sub: "Hypertrophy focus",
      icon: Target,
      color: "text-[#ccff00]",
    },
    {
      label: "EXPERIENCE",
      value: "Intermediate",
      sub: "3.5 years training age",
      icon: Award,
      color: "text-[#38bdf8]",
    },
    {
      label: "TRAINING",
      value: "5 DAYS / WEEK",
      sub: "Upper / Lower split",
      icon: Calendar,
      color: "text-[#a855f7]",
    },
    {
      label: "EQUIPMENT",
      value: "FULL GYM",
      sub: "Barbells, cables & machines",
      icon: Dumbbell,
      color: "text-[#fbbf24]",
    },
    {
      label: "CURRENT WEIGHT",
      value: "65.0 KG",
      sub: "Target: 68.5 KG lean mass",
      icon: Scale,
      color: "text-[#10b981]",
    },
  ];

  return (
    <section id="personalization" className="relative py-28 md:py-36 bg-[#07080b] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial-gradient blur-3xl opacity-50 pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="02 // USER PROFILE & LIVE TELEMETRY"
          title="Your plan starts with you."
          description="We ingest your personal biomechanics, weekly volume tolerance, and goals to build a live physiological baseline."
        />

        {/* 3-Tier Pipeline Flow: USER DATA -> AI ANALYSIS -> PERSONALIZED PLAN */}
        <div className="space-y-8 relative">
          {/* TIER 1: USER DATA INPUT CARDS */}
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] bg-[#ccff00]/10 px-4 py-1.5 rounded-full border border-[#ccff00]/25">
                STAGE 01 // USER DATA INGESTION
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {telemetryPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0.3, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="cinema-card p-4 sm:p-5 rounded-2xl bg-[#0c1018] border border-white/10 hover:border-[#ccff00]/40 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase block">
                      {item.label}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
                      {item.value}
                    </h4>
                    <span className="text-[11px] text-gray-400 font-mono block mt-1">
                      {item.sub}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CONNECTING PIPELINE CONNECTOR */}
          <div className="flex flex-col items-center justify-center my-2">
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 via-[#ccff00] to-white/20"></div>
            <div className="w-7 h-7 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 via-[#ccff00] to-white/20"></div>
          </div>

          {/* TIER 2: AI PROCESSING LAYER */}
          <div
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#101522] to-[#0c0f17] border border-[#ccff00]/30 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ccff00] text-black flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(204,255,0,0.5)]">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] font-semibold">
                      STAGE 02 // AI ANALYSIS LAYER
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                    Synthesizing Biomechanical Profile
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  MEV: 14 sets/muscle
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                  MRV: 22 sets/muscle
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00]">
                  Overload Model: RPE Autoregulated
                </span>
              </div>
            </div>
          </div>

          {/* CONNECTING PIPELINE CONNECTOR */}
          <div className="flex flex-col items-center justify-center my-2">
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 via-[#ccff00] to-white/20"></div>
            <div className="w-7 h-7 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.3)]">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 via-[#ccff00] to-white/20"></div>
          </div>

          {/* TIER 3: PERSONALIZED PLAN GENERATED */}
          <div
            className="p-6 rounded-2xl bg-[#0b0e15] border border-white/10 text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-[#38bdf8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STAGE 03 // PERSONALIZED PLAN OUTPUT</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Upper / Lower Hypertrophy Progression • Custom Mesocycle 01 Activated
            </h4>
            <p className="text-xs text-gray-400 max-w-lg mx-auto mt-1 font-mono">
              Calibrated for 5 working days, 80kg bench baseline, and progressive volume scaling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
