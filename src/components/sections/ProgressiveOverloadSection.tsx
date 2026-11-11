"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DottedField } from "@/components/ui/DottedField";
import { progressiveOverloadData } from "@/data/fitnessMockData";
import { TrendingUp, Sparkles, Target, ArrowUpRight, Award } from "lucide-react";

export function ProgressiveOverloadSection() {
  const [selectedWeek, setSelectedWeek] = useState(4); // Week 5 (index 4) default

  // SVG coordinates for the 5 weeks
  // (x, y) mapping inside 600x260 viewBox
  const points = [
    { x: 60, y: 200, weight: 70.0, week: "Week 1" },
    { x: 180, y: 165, weight: 72.5, week: "Week 2" },
    { x: 300, y: 130, weight: 75.0, week: "Week 3" },
    { x: 420, y: 95, weight: 77.5, week: "Week 4" },
    { x: 540, y: 60, weight: 80.0, week: "Week 5" },
  ];

  const pathD = `M ${points[0].x} ${points[0].y} Q ${points[1].x - 30} ${points[1].y + 10}, ${points[1].x} ${points[1].y} T ${points[2].x} ${points[2].y} T ${points[3].x} ${points[3].y} T ${points[4].x} ${points[4].y}`;
  const areaD = `${pathD} L ${points[4].x} 240 L ${points[0].x} 240 Z`;

  return (
    <section id="progression" className="relative py-28 md:py-36 bg-[#07080b] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="05 // ACTIVE GYM EXECUTION"
          title="Your training evolves as you do."
          description="Never stay stuck at a plateau. IntFit.ai automatically calculates rep velocity and RIR thresholds to trigger incremental overload safely."
        />

        {/* Strength Progression Graph Dashboard with 3D Depth */}
        <div
          data-cursor="explore"
          className="rounded-3xl bg-[#0c1018] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] space-y-8 transition-all duration-300 hover:border-white/25 perspective-1000"
        >
          {/* Header of Graph */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ccff00]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>BENCH PRESS WORKING LOAD OVER TIME</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                +10.0 KG Compound Progression
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                5-Week Microcycle
              </span>
              <span className="text-xs font-mono text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 px-3 py-1 rounded-full font-semibold">
                +14.3% Load Increase
              </span>
            </div>
          </div>

          {/* SVG Animated Graph Container with Path Drawing */}
          <div className="relative w-full overflow-x-auto py-2">
            <svg
              viewBox="0 0 600 260"
              className="w-full h-56 sm:h-72 overflow-visible cursor-pointer"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#ccff00" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(204, 255, 0, 0.25)" />
                  <stop offset="100%" stopColor="rgba(204, 255, 0, 0)" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[60, 110, 160, 210].map((yVal, i) => (
                <line
                  key={i}
                  x1="30"
                  y1={yVal}
                  x2="570"
                  y2={yVal}
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Filled Area below curve */}
              <path
                d={areaD}
                fill="url(#areaGradient)"
              />

              {/* Animated Main Line Drawing */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Data points */}
              {points.map((pt, idx) => {
                const isSelected = selectedWeek === idx;
                return (
                  <g
                    key={pt.week}
                    className="cursor-pointer group"
                    onClick={() => setSelectedWeek(idx)}
                  >
                    {/* Outer pulse circle for current week */}
                    {idx === 4 && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="14"
                        fill="#ccff00"
                        opacity="0.25"
                        className="animate-ping"
                      />
                    )}

                    {/* Point circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? "7" : "5"}
                      fill={isSelected ? "#ccff00" : "#10141f"}
                      stroke={isSelected ? "#ffffff" : "#ccff00"}
                      strokeWidth={isSelected ? "3" : "2"}
                      className="transition-all duration-300"
                    />

                    {/* Week label */}
                    <text
                      x={pt.x}
                      y="255"
                      textAnchor="middle"
                      fill={isSelected ? "#ccff00" : "#9ca3af"}
                      fontSize="11"
                      fontFamily="monospace"
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {pt.week}
                    </text>

                    {/* Weight label */}
                    <text
                      x={pt.x}
                      y={pt.y - 14}
                      textAnchor="middle"
                      fill={isSelected ? "#ffffff" : "#d1d5db"}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {pt.weight} KG
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Week Detail Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
            {progressiveOverloadData.map((item, index) => {
              const active = selectedWeek === index;
              return (
                <button
                  key={item.week}
                  onClick={() => setSelectedWeek(index)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    active
                      ? "bg-[#ccff00]/10 border-[#ccff00] text-white shadow-[0_0_15px_-3px_rgba(204,255,0,0.3)] scale-[1.02]"
                      : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                    {item.week}
                  </div>
                  <div className="text-base font-bold font-mono text-white mt-0.5">
                    {item.weight} KG
                  </div>
                  <div className="text-[11px] font-mono text-[#ccff00] mt-0.5">
                    {item.reps} reps • {item.volume} kg vol
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prompt AI Recommendation Callout */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#ccff00]/10 via-[#ccff00]/5 to-transparent border border-[#ccff00]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#ccff00] text-black shrink-0 mt-0.5 shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ccff00] font-bold">
                    NEXT TARGET
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
                    80 KG × 8
                  </span>
                </div>
                <p className="text-sm text-gray-200 mt-1 font-medium leading-relaxed">
                  &ldquo;Complete your target reps consistently before increasing load.&rdquo;
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-gray-400 sm:text-right shrink-0">
              Trigger criteria: 3 × 8 @ RPE &le; 8.5
            </div>
          </div>
        </div>
      </div>

      {/* Restrained grid dot field — performance data visualization pattern */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 opacity-50">
        <DottedField
          pattern="grid"
          spacing={22}
          baseAlpha={0.1}
          mouseRadius={80}
          mouseStrength={0.35}
          fixed={false}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}

