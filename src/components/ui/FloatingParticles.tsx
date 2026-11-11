"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FloatingParticle {
  id: number;
  size: number;
  color: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
  xDrift: number;
  yDrift: number;
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
  area?: "top" | "mid" | "bottom" | "full";
  intensity?: "subtle" | "moderate";
}

/**
 * Lightweight CSS-driven floating particles.
 * Pure framer-motion transforms on absolutely-positioned divs —
 * GPU compositing, zero canvas, zero rAF math, perfect for sections.
 */
export function FloatingParticles({
  count = 12,
  colors = ["#ccff00", "#38bdf8", "#a855f7"],
  className = "",
  area = "full",
  intensity = "subtle",
}: FloatingParticlesProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    setMounted(true);
    const drift = intensity === "moderate" ? 40 : 22;
    const baseDur = intensity === "moderate" ? 14 : 18;

    const generated: FloatingParticle[] = [];
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        size: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 94 + 3}%`,
        top: `${Math.random() * 94 + 3}%`,
        duration: baseDur + Math.random() * 8,
        delay: Math.random() * -baseDur,
        xDrift: (Math.random() - 0.5) * drift,
        yDrift: -(Math.random() * drift * 0.8 + 8),
      });
    }
    setParticles(generated);
  }, [count, colors, intensity]);

  if (shouldReduceMotion || !mounted) return null;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            willChange: "transform",
          }}
          animate={{
            x: [0, p.xDrift, 0],
            y: [0, p.yDrift, 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
}