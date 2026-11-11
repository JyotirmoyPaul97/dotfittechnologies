"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface FluidWaveProps {
  color?: string;
  secondaryColor?: string;
  amplitude?: number;
  speed?: number;
  opacity?: number;
  blur?: number;
  className?: string;
  reversed?: boolean;
  layers?: number;
}

/**
 * Premium SVG fluid wave — GPU-accelerated via SVG SMIL animations.
 * Zero JS math loop: the browser compositor owns every frame.
 * Sits behind content; never competes with text or CTAs.
 */
export function FluidWave({
  color = "#ccff00",
  secondaryColor = "#38bdf8",
  amplitude = 28,
  speed = 7,
  opacity = 0.5,
  blur = 6,
  className = "",
  reversed = false,
  layers = 3,
}: FluidWaveProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (shouldReduceMotion || !mounted) {
    return (
      <div
        className={`absolute left-0 right-0 pointer-events-none ${className}`}
        style={{
          height: `${amplitude * 2.5}px`,
          background: `linear-gradient(to bottom, ${color}14, transparent)`,
          filter: `blur(${blur * 2}px)`,
        }}
        aria-hidden="true"
      />
    );
  }

  const id = "fw-" + color.replace("#", "") + "-" + secondaryColor.replace("#", "");
  const dur = speed + "s";
  const height = amplitude * 2.5;

  // Build two-sine organic fluid paths at three depths
  const buildPath = (layer: number) => {
    const amp = amplitude - layer * 6;
    const baseY = 10 + layer * 3;
    const offset = 8 + layer * 4;
    return (
      "M0," +
      (baseY + amp) +
      " C 120," +
      (baseY + amp - offset) +
      " 200," +
      (baseY + amp + offset) +
      " 400," +
      (baseY + amp) +
      " C 600," +
      (baseY + amp - offset) +
      " 700," +
      (baseY + amp + offset) +
      " 900," +
      (baseY + amp) +
      " L 900,40 L 0,40 Z"
    );
  };

  const pathA = buildPath(0);
  const pathB = buildPath(1);
  const pathC = buildPath(2);

  const filterUrl = "url(#" + id + "-blur)";
  const gradUrl = "url(#" + id + "-grad)";

  return (
    <div
      className={`absolute left-0 right-0 pointer-events-none overflow-visible ${className}`}
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <svg
        viewBox="0 0 900 40"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ height: height + "px" }}
      >
        <defs>
          <filter id={id + "-blur"}>
            <feGaussianBlur stdDeviation={blur} />
          </filter>
          <linearGradient id={id + "-grad"} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity={0} />
            <stop offset="50%" stopColor={color} stopOpacity={opacity} />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity={opacity * 0.7} />
          </linearGradient>
        </defs>

        <g filter={filterUrl}>
          {/* Layer 1 — primary lime wave */}
          <path d={pathA} fill={gradUrl}>
            <animate
              attributeName="d"
              dur={dur}
              repeatCount="indefinite"
              values={pathA + ";" + buildPath(1) + ";" + pathA}
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
            />
          </path>

          {/* Layer 2 — secondary cyan wave, offset phase */}
          <path d={pathB} fill={gradUrl}>
            <animate
              attributeName="d"
              dur={dur}
              repeatCount="indefinite"
              values={pathB + ";" + buildPath(2) + ";" + pathB}
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              begin="-1.6s"
            />
          </path>

          {/* Layer 3 — deep purple accent, slowest */}
          <path d={pathC} fill={gradUrl}>
            <animate
              attributeName="d"
              dur={dur}
              repeatCount="indefinite"
              values={pathC + ";" + buildPath(0) + ";" + pathC}
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              begin="-3.2s"
            />
          </path>
        </g>
      </svg>
    </div>
  );
}