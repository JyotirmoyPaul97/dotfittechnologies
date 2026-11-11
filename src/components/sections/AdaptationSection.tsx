"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { adaptationScenarios } from "@/data/fitnessMockData";
import {
  TrendingUp,
  Activity,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle,
} from "lucide-react";

export function AdaptationSection() {
  const [activeScenarioId, setActiveScenarioId] = useState<"exceeded" | "stable" | "fatigued">(
    "fatigued" // Default to fatigued as requested in the core problem statement
  );

  const scenario = adaptationScenarios.find((s) => s.id === activeScenarioId)!;

  return (
    <section id="adaptation" className="relative py-28 md:py-36 bg-[#090c12] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[450px] bg-[#ccff00]/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="08 // AUTONOMOUS RE-CALIBRATION"
          title="Every workout changes what comes next."
          description="The AI isn't giving you the same plan every week. Your session logs, movement velocity, and fatigue feedback continuously reshape the very next workout."
        />

        {/* 3-State Interactive Controller */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {adaptationScenarios.map((s) => {
            const isActive = s.id === activeScenarioId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveScenarioId(s.id)}
                className={`flex items-center gap-2.5 px-5 sm:px-7 py-3 rounded-full font-mono text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.35)] scale-[1.03]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {s.id === "exceeded" && <TrendingUp className="w-4 h-4 text-[#84cc16]" />}
                {s.id === "stable" && <Activity className="w-4 h-4 text-[#38bdf8]" />}
                {s.id === "fatigued" && <TrendingDown className="w-4 h-4 text-[#f43f5e]" />}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic State Card showing: PREVIOUS PERFORMANCE -> AI ANALYSIS -> NEXT RECOMMENDATION */}
        <div className="perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0.7, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.7, y: -8 }}
              transition={{ duration: 0.25 }}
              data-cursor="explore"
              className="rounded-3xl bg-[#0c1018] border border-white/15 p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] space-y-8 transition-all duration-300 hover:border-white/25"
            >
              {/* Header info for scenario */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: scenario.accentColor }}
                  ></span>
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    SCENARIO OUTCOME:
                  </span>
                  <span className="text-base font-bold font-mono text-white">
                    {scenario.statusText}
                  </span>
                </div>

                <div
                  className="text-xs font-mono px-3 py-1 rounded-full border w-fit"
                  style={{
                    color: scenario.accentColor,
                    borderColor: `${scenario.accentColor}40`,
                    backgroundColor: `${scenario.accentColor}10`,
                  }}
                >
                  {scenario.performanceDelta}
                </div>
              </div>

              {/* 3-Step Flow Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Step 1: Previous Performance */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-gray-400">
                    STEP 01 // PREVIOUS LOG
                  </div>
                  <h4 className="text-base font-bold text-white">Athlete Feedback</h4>
                  <p className="text-xs text-gray-300 italic font-mono leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                    {scenario.userLog}
                  </p>
                </div>

                {/* Step 2: AI Analysis */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <div className="text-[10px] font-mono tracking-widest uppercase text-[#ccff00]">
                    STEP 02 // AI DIAGNOSIS
                  </div>
                  <h4 className="text-base font-bold text-white">Physiological Assessment</h4>
                  <p className="text-xs text-gray-300 font-mono leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                    {scenario.aiDiagnosis}
                  </p>
                </div>

                {/* Step 3: Next Recommendation */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <div
                    className="text-[10px] font-mono tracking-widest uppercase"
                    style={{ color: scenario.accentColor }}
                  >
                    STEP 03 // ADAPTATION
                  </div>
                  <h4 className="text-base font-bold text-white">Next Session Prescription</h4>
                  <p className="text-xs text-gray-300 font-mono leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                    {scenario.aiAction}
                  </p>
                </div>
              </div>

              {/* Tactical Adjustment Summary Pills */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">NEXT LOAD:</span>
                  <span className="text-sm font-mono font-bold text-white">
                    {scenario.adjustmentLoad}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">VOLUME ADJUSTMENT:</span>
                  <span className="text-sm font-mono font-bold text-white">
                    {scenario.adjustmentVolume}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">FOCUS:</span>
                  <span
                    className="text-sm font-mono font-bold"
                    style={{ color: scenario.accentColor }}
                  >
                    {scenario.nextSessionFocus}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

