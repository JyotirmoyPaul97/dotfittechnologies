"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DottedField } from "@/components/ui/DottedField";
import { TrendingUp, Scale, Dumbbell, Calendar, CheckCircle2 } from "lucide-react";

export function ProgressDashboardSection() {
  const [activeMetric, setActiveMetric] = useState<"strength" | "weight" | "volume" | "consistency">("strength");

  const kpis = [
    {
      id: "weight",
      label: "BODY WEIGHT",
      value: "65.4 KG",
      delta: "-0.8 KG this month",
      sub: "Target: 68.5 KG (Lean Surplus)",
      icon: Scale,
      color: "text-[#38bdf8]",
    },
    {
      id: "strength",
      label: "STRENGTH CAPACITY",
      value: "1,140 PTS",
      delta: "+14.2% since start",
      sub: "Compound Total: +42.5 KG",
      icon: Dumbbell,
      color: "text-[#ccff00]",
    },
    {
      id: "volume",
      label: "TRAINING VOLUME",
      value: "42,850 KG",
      delta: "+8.5% weekly overload",
      sub: "14 working sets / session",
      icon: TrendingUp,
      color: "text-[#a855f7]",
    },
    {
      id: "consistency",
      label: "CONSISTENCY RATE",
      value: "96%",
      delta: "24 / 25 sessions logged",
      sub: "Current Streak: 18 Days",
      icon: Calendar,
      color: "text-[#10b981]",
    },
  ];

  return (
    <section id="progress" className="relative py-28 md:py-36 bg-[#090c12] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[450px] bg-[#ccff00]/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="06 // CONTINUOUS PERFORMANCE TRACKING"
          title="See the work becoming results."
          description="High-resolution data on every metric that matters. No guesswork, no vanity metrics—just measurable physiological adaptation."
        />

        {/* 4 Core Metric KPI Cards with 3D Depth */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 perspective-1000">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            const isActive = activeMetric === kpi.id;

            return (
              <button
                key={kpi.label}
                type="button"
                data-cursor="explore"
                onClick={() => setActiveMetric(kpi.id as any)}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#141a29] border-[#ccff00]/60 shadow-[0_0_25px_-3px_rgba(204,255,0,0.25)] scale-[1.02]"
                    : "bg-[#0c1018] border-white/10 hover:border-white/20 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                    {kpi.label}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon className={`w-3.5 h-3.5 ${kpi.color}`} />
                  </div>
                </div>

                <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-xs font-mono text-[#ccff00] font-medium mt-1">
                  {kpi.delta}
                </div>
                <div className="text-[10px] font-mono text-gray-500 mt-1">
                  {kpi.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Multi-Metric Clean Interactive Chart with 3D Depth */}
        <div
          data-cursor="explore"
          className="rounded-3xl bg-[#0c1018] border border-white/15 p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] space-y-6 transition-all duration-300 hover:border-white/25 perspective-1000"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">
                TELEMETRY VISUALIZER
              </span>
              <h4 className="text-lg font-bold text-white tracking-tight">
                {activeMetric === "strength" && "Compound Strength Index (8-Week Trend)"}
                {activeMetric === "weight" && "Body Composition & Scale Weight"}
                {activeMetric === "volume" && "Tonnage Volume per Muscle Group"}
                {activeMetric === "consistency" && "Session Consistency Rate (8-Week Trend)"}
              </h4>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                Verified Logs
              </span>
              <span className="text-gray-400">Sample Demonstration Data</span>
            </div>
          </div>

          {/* SVG Multi-Week Progression Curve */}
          <div className="w-full h-56 sm:h-64 py-2">
            <svg viewBox="0 0 700 220" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(204, 255, 0, 0.3)" />
                  <stop offset="100%" stopColor="rgba(204, 255, 0, 0)" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[40, 90, 140, 190].map((y) => (
                <line
                  key={y}
                  x1="20"
                  y1={y}
                  x2="680"
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Chart Path */}
              {activeMetric === "strength" && (
                <>
                  <path
                    d="M 50 180 Q 150 160, 250 135 T 450 85 T 650 45 L 650 200 L 50 200 Z"
                    fill="url(#chartGlow)"
                  />
                  <motion.path
                    d="M 50 180 Q 150 160, 250 135 T 450 85 T 650 45"
                    fill="none"
                    stroke="#ccff00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </>
              )}

              {activeMetric === "weight" && (
                <>
                  <path
                    d="M 50 70 Q 150 75, 250 85 T 450 110 T 650 130 L 650 200 L 50 200 Z"
                    fill="url(#chartGlow)"
                  />
                  <motion.path
                    d="M 50 70 Q 150 75, 250 85 T 450 110 T 650 130"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </>
              )}

              {activeMetric === "volume" && (
                <>
                  <path
                    d="M 50 190 Q 150 150, 250 130 T 450 90 T 650 50 L 650 200 L 50 200 Z"
                    fill="url(#chartGlow)"
                  />
                  <motion.path
                    d="M 50 190 Q 150 150, 250 130 T 450 90 T 650 50"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </>
              )}

              {activeMetric === "consistency" && (
                <>
                  <path
                    d="M 50 150 Q 150 120, 250 100 T 450 70 T 650 40 L 650 200 L 50 200 Z"
                    fill="url(#chartGlow)"
                  />
                  <motion.path
                    d="M 50 150 Q 150 120, 250 100 T 450 70 T 650 40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </>
              )}

              {/* Month Marks */}
              {["Month 1", "Month 2", "Month 3", "Month 4", "Current Week"].map(
                (label, i) => (
                  <text
                    key={label}
                    x={50 + i * 150}
                    y="215"
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {label}
                  </text>
                )
              )}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
