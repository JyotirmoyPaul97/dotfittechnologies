"use client";

import React from "react";
import { motion } from "framer-motion";

interface DataFlowLineProps {
  label?: string;
  height?: number;
  variant?: "lime" | "cyan" | "purple";
  className?: string;
}

export function DataFlowLine({
  label,
  height = 70,
  variant = "lime",
  className = "",
}: DataFlowLineProps) {
  const colorMap = {
    lime: {
      stroke: "#ccff00",
      glow: "rgba(204, 255, 0, 0.4)",
      badgeBg: "rgba(204, 255, 0, 0.08)",
      badgeBorder: "rgba(204, 255, 0, 0.25)",
      badgeText: "#ccff00",
    },
    cyan: {
      stroke: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.4)",
      badgeBg: "rgba(56, 189, 248, 0.08)",
      badgeBorder: "rgba(56, 189, 248, 0.25)",
      badgeText: "#38bdf8",
    },
    purple: {
      stroke: "#c084fc",
      glow: "rgba(192, 132, 252, 0.4)",
      badgeBg: "rgba(192, 132, 252, 0.08)",
      badgeBorder: "rgba(192, 132, 252, 0.25)",
      badgeText: "#c084fc",
    },
  };

  const theme = colorMap[variant];

  return (
    <div
      className={`relative flex flex-col items-center justify-center my-0 pointer-events-none select-none z-20 ${className}`}
      aria-hidden="true"
    >
      {/* Upper line */}
      <div
        className="w-[1px] relative overflow-hidden"
        style={{
          height: `${height / 2}px`,
          background: `linear-gradient(to bottom, transparent, ${theme.stroke})`,
        }}
      >
        <motion.div
          animate={{ y: [0, height / 2] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-full h-4 rounded-full"
          style={{
            background: `linear-gradient(to bottom, transparent, #ffffff)`,
            boxShadow: `0 0 8px ${theme.glow}`,
          }}
        />
      </div>

      {/* Central data node with optional telemetry tag */}
      <div className="relative my-1 flex items-center justify-center">
        {/* Soft atmospheric radial glow behind node */}
        <div
          className="absolute w-28 h-12 rounded-full blur-xl pointer-events-none opacity-30 -z-10"
          style={{ backgroundColor: theme.glow }}
        />

        {/* Pulsing outer node ring */}
        <span
          className="absolute w-6 h-6 rounded-full animate-ping opacity-25"
          style={{ backgroundColor: theme.stroke }}
        />

        {label ? (
          <div
            className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5 shadow-sm border backdrop-blur-md"
            style={{
              backgroundColor: theme.badgeBg,
              borderColor: theme.badgeBorder,
              color: theme.badgeText,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: theme.stroke }}
            />
            <span>{label}</span>
          </div>
        ) : (
          <div
            className="w-3 h-3 rounded-full border flex items-center justify-center"
            style={{
              borderColor: theme.badgeBorder,
              backgroundColor: "#07080b",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: theme.stroke }}
            />
          </div>
        )}
      </div>

      {/* Lower line */}
      <div
        className="w-[1px] relative overflow-hidden"
        style={{
          height: `${height / 2}px`,
          background: `linear-gradient(to bottom, ${theme.stroke}, transparent)`,
        }}
      >
        <motion.div
          animate={{ y: [0, height / 2] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
          className="w-full h-4 rounded-full"
          style={{
            background: `linear-gradient(to bottom, transparent, #ffffff)`,
            boxShadow: `0 0 8px ${theme.glow}`,
          }}
        />
      </div>
    </div>
  );
}
