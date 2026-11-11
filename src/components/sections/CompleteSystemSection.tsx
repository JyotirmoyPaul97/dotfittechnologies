"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DottedField } from "@/components/ui/DottedField";
import {
  UserCheck,
  Dumbbell,
  Apple,
  LineChart,
  Sparkles,
  Cpu,
  ArrowDown,
  Layers,
  Activity,
  Zap,
} from "lucide-react";

export function CompleteSystemSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[#07080b] border-t border-white/5 overflow-hidden">
      {/* Central neural glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[170px] pointer-events-none -z-10"></div>

      {/* Restrained fluid motion at the base of the compounding result */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 opacity-70">
        <DottedField
          pattern="grid"
          spacing={26}
          baseAlpha={0.1}
          mouseRadius={90}
          mouseStrength={0.4}
          fixed={false}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="09 // COMPOUNDING CLOSED-LOOP RESULTS"
          title="One intelligence. Your entire fitness journey."
          description="Isolated apps create disjointed results. IntFit.ai interconnects your biometrics, daily lifts, nutrition targets, and progression logs into a single closed feedback loop."
        />

        {/* Neural Connected Architecture Map with Layered 3D Depth */}
        <div className="relative max-w-4xl mx-auto space-y-4 perspective-1200">
          {/* LEVEL 1: PROFILE INPUT */}
          <div
            data-cursor="explore"
            className="p-5 rounded-2xl bg-[#0c1018] border border-white/15 max-w-md mx-auto text-center shadow-lg transition-all duration-300 hover:border-[#38bdf8]/50 hover:-translate-y-0.5"
          >
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-2">
              <UserCheck className="w-4 h-4 text-[#38bdf8]" />
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#38bdf8] font-bold">
              01 // BIOMETRIC PROFILE
            </span>
            <h4 className="text-base font-bold text-white mt-0.5">
              Anatomy • Schedule • Injury History • Goals
            </h4>
          </div>

          {/* Central Conduit 1 with Animated Flow Particle */}
          <div className="flex flex-col items-center justify-center h-10 relative">
            <div className="w-[2px] h-full bg-gradient-to-b from-[#38bdf8] via-[#ccff00] to-[#ccff00] relative overflow-hidden">
              <motion.div
                animate={{ y: [-10, 40] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-3 bg-white shadow-[0_0_8px_#ccff00]"
              />
            </div>
          </div>

          {/* LEVEL 2: CENTRAL AI BRAIN (Hero Engine with 3D Elevation) */}
          <div
            data-cursor="explore"
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#141b2b] to-[#0c1018] border-2 border-[#ccff00]/60 shadow-[0_0_60px_-10px_rgba(204,255,0,0.35)] max-w-lg mx-auto text-center relative transition-all duration-300 hover:shadow-[0_0_80px_-10px_rgba(204,255,0,0.5)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#ccff00] text-black flex items-center justify-center mx-auto mb-3 shadow-[0_0_25px_rgba(204,255,0,0.6)]">
              <Sparkles className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-xs font-mono text-[#ccff00] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
              CORE ADAPTIVE ENGINE
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              IntFit.ai Neural Engine
            </h3>
            <p className="text-xs text-gray-300 font-mono mt-1.5 max-w-xs mx-auto leading-relaxed">
              Real-time physiological feedback analysis & multi-variable autoregulation
            </p>
          </div>

          {/* Central Conduit Split */}
          <div className="flex flex-col items-center justify-center h-10 relative">
            <div className="w-[2px] h-full bg-gradient-to-b from-[#ccff00] to-white/20 relative overflow-hidden">
              <motion.div
                animate={{ y: [-10, 40] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                className="w-full h-3 bg-white shadow-[0_0_8px_#ccff00]"
              />
            </div>
          </div>

          {/* LEVEL 3: 3 SYNCHRONIZED PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left: Workout */}
            <div
              data-cursor="explore"
              className="p-5 rounded-2xl bg-[#0c1018] border border-white/10 text-center hover:border-[#ccff00]/50 hover:shadow-[0_0_25px_rgba(204,255,0,0.15)] transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-2 group-hover:border-[#ccff00]/40 transition-colors">
                <Dumbbell className="w-4 h-4 text-[#ccff00]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#ccff00] font-bold">
                WORKOUT
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Adaptive Programming</h4>
              <p className="text-[11px] text-gray-400 font-mono mt-1">
                Dynamic set volume & load targets updated post-set
              </p>
            </div>

            {/* Middle: Nutrition */}
            <div
              data-cursor="explore"
              className="p-5 rounded-2xl bg-[#0c1018] border border-white/10 text-center hover:border-[#38bdf8]/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-2 group-hover:border-[#38bdf8]/40 transition-colors">
                <Apple className="w-4 h-4 text-[#38bdf8]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#38bdf8] font-bold">
                NUTRITION
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Caloric Telemetry</h4>
              <p className="text-[11px] text-gray-400 font-mono mt-1">
                Fuel intake calibrated to expenditure & recovery load
              </p>
            </div>

            {/* Right: Progress */}
            <div
              data-cursor="explore"
              className="p-5 rounded-2xl bg-[#0c1018] border border-white/10 text-center hover:border-[#a855f7]/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-2 group-hover:border-[#a855f7]/40 transition-colors">
                <LineChart className="w-4 h-4 text-[#a855f7]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#a855f7] font-bold">
                PROGRESS
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Continuous Telemetry</h4>
              <p className="text-[11px] text-gray-400 font-mono mt-1">
                Velocity, weight, and volume trend quantification
              </p>
            </div>
          </div>

          {/* Central Conduit Convergence */}
          <div className="flex flex-col items-center justify-center h-10 relative">
            <div className="w-[2px] h-full bg-gradient-to-b from-white/20 to-[#ccff00] relative overflow-hidden">
              <motion.div
                animate={{ y: [-10, 40] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.8 }}
                className="w-full h-3 bg-white shadow-[0_0_8px_#ccff00]"
              />
            </div>
          </div>

          {/* LEVEL 4: BETTER PLAN COMPOUNDING RESULT */}
          <div
            data-cursor="explore"
            className="p-6 rounded-2xl bg-gradient-to-r from-[#ccff00]/10 via-[#ccff00]/20 to-[#ccff00]/10 border border-[#ccff00]/50 max-w-md mx-auto text-center shadow-[0_0_35px_rgba(204,255,0,0.25)] transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] font-bold">
              COMPOUNDING OUTCOME
            </span>
            <h4 className="text-lg font-extrabold text-white mt-0.5">
              Continuously Optimized Mesocycle
            </h4>
            <p className="text-xs text-gray-300 font-mono mt-1">
              Every day smarter than the last. Zero wasted sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

