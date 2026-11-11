"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DottedField } from "@/components/ui/DottedField";
import { Sparkles, User, Activity, Check, Brain, ShieldAlert, Cpu, ArrowRight } from "lucide-react";

export function IntelligenceSection() {
  const [activeStep, setActiveStep] = useState(0);

  const aiStages = [
    { step: "01", name: "DATA", desc: "Set velocity & RPE log" },
    { step: "02", name: "PROCESSING", desc: "Mesocycle volume baseline" },
    { step: "03", name: "ANALYSIS", desc: "CNS fatigue calculation" },
    { step: "04", name: "RECOMMENDATION", desc: "Adaptive next load" },
  ];

  useEffect(() => {
    const cycle = window.setInterval(() => setActiveStep((current) => (current + 1) % aiStages.length), 2800);
    return () => window.clearInterval(cycle);
  }, [aiStages.length]);

  return (
    <section id="intelligence" className="relative py-28 md:py-36 bg-[#090c12] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#38bdf8]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Restrained fluid motion at the base of the neural console */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 opacity-70">
        <DottedField
          pattern="organize"
          spacing={24}
          baseAlpha={0.12}
          mouseRadius={90}
          mouseStrength={0.4}
          fixed={false}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="03 // NEURAL COPILOT & REASONING"
          title="Meet the intelligence behind your training."
          description="A companion that listens to your biomechanical feedback, understands accumulated fatigue, and prescribes surgical micro-adjustments."
        />

        {/* AI VISUALIZATION: DATA → PROCESSING → ANALYSIS → RECOMMENDATION */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0c1018] border border-white/10 shadow-lg">
            <div className="text-[10px] font-mono tracking-widest uppercase text-gray-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#ccff00]">
                <Cpu className="w-3.5 h-3.5" />
                NEURAL SYNTHESIS PIPELINE
              </span>
              <span className="text-gray-500">Autonomous Evaluation Active</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
              {aiStages.map((stage, idx) => {
                const isActive = idx === activeStep;
                const isPast = idx < activeStep;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer z-10 ${
                      isActive
                        ? "bg-[#ccff00]/10 border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.25)]"
                        : isPast
                        ? "bg-white/[0.03] border-white/15 text-gray-300"
                        : "bg-white/[0.01] border-white/5 text-gray-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-gray-400">
                        {stage.step}
                      </span>
                      {isActive && (
                        <motion.span layoutId="active-stage" className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,.8)]" />
                      )}
                    </div>
                    <div
                      className={`text-xs font-mono font-bold mt-1 tracking-wider ${
                        isActive
                          ? "text-[#ccff00]"
                          : isPast
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {stage.name}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5 truncate">
                      {stage.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Realistic AI Chat & Telemetry Console with 3D Depth */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="explore"
          className="rounded-3xl bg-[#0c1018] border border-white/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-[0_35px_80px_-20px_rgba(204,255,0,0.15)] perspective-1000"
        >
          {/* Top Bar of Console */}
          <div className="px-6 py-4 bg-[#111522]/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white/20"></span>
                <span className="w-3 h-3 rounded-full bg-white/20"></span>
                <span className="w-3 h-3 rounded-full bg-white/20"></span>
              </div>
              <span className="h-4 w-[1px] bg-white/15 mx-1"></span>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#ccff00]" />
                <span className="text-xs font-mono font-medium text-white">
                  IntFit.ai Neural Copilot
                </span>
                <span className="text-[10px] font-mono text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded-full border border-[#ccff00]/20">
                  Online
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-gray-400 hidden sm:flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-gray-400" />
              <span>Model: Biomechanics-v4</span>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="p-6 sm:p-10 space-y-6">
            {/* User Message Bubble */}
            <div className="flex items-start justify-end gap-3 max-w-xl ml-auto">
              <div className="rounded-2xl rounded-tr-sm bg-[#1c2233] border border-white/15 p-4 sm:p-5 text-sm sm:text-base text-white shadow-lg">
                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                  YOU • TODAY 08:42 AM
                </div>
                <p className="font-medium text-white">
                  &ldquo;I couldn&apos;t complete my final set today.&rdquo;
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                <User className="w-4 h-4" />
              </div>
            </div>

            {/* Neural Context Processing Indicator */}
            <div className="flex items-center justify-center my-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111624] border border-[#ccff00]/20 text-[11px] font-mono text-gray-300 shadow-sm">
                <Activity className="w-3.5 h-3.5 text-[#ccff00] animate-spin" />
                <span>Synthesizing last 12 bench press sessions & velocity curves...</span>
              </div>
            </div>

            {/* AI Response Message Bubble with Layered Elevation */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0.65, y: 7, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3.5 max-w-2xl"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ccff00] to-[#84cc16] flex items-center justify-center text-black shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl rounded-tl-sm bg-[#121724] border border-[#ccff00]/30 p-5 sm:p-6 text-sm sm:text-base text-gray-200 shadow-xl space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#ccff00] font-semibold tracking-wider">
                    <span>INTFIT.AI INTELLIGENCE</span>
                    <span className="text-gray-400">Response Latency: 180ms</span>
                  </div>

                  <p className="leading-relaxed text-white">
                    Your performance was slightly below your recent average.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    Keep the same working weight (<span className="text-white font-semibold">80 KG</span>) next session and aim for <span className="text-[#ccff00] font-semibold">7–8 reps</span>.
                  </p>
                  <p className="leading-relaxed text-gray-300">
                    Once you consistently hit your target, we&apos;ll progress the load.
                  </p>
                </div>

                {/* Real-time Physiological Diagnosis Badges with Micro-Interaction Lift */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all text-xs font-mono group">
                    <span className="text-gray-400 block text-[10px] uppercase">RPE Assessment</span>
                    <span className="text-white font-semibold group-hover:text-[#ccff00] transition-colors">
                      9.5 (Near Technical Failure)
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#ccff00]/40 transition-all text-xs font-mono">
                    <span className="text-gray-400 block text-[10px] uppercase">Action Prescribed</span>
                    <span className="text-[#ccff00] font-semibold">Hold Load • Consolidate</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/40 transition-all text-xs font-mono">
                    <span className="text-gray-400 block text-[10px] uppercase">Next Target</span>
                    <span className="text-[#38bdf8] font-semibold">80 KG × 8 × 3</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Restrained organized dot field — AI Coach intelligence pattern */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 opacity-60">
        <DottedField
          pattern="organize"
          spacing={24}
          baseAlpha={0.12}
          mouseRadius={90}
          mouseStrength={0.4}
          fixed={false}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
