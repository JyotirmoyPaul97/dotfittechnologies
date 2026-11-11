"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Activity,
  CheckCircle2,
  ChevronRight,
  Flame,
  Zap,
  Award,
  Target,
  Cpu,
} from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [canAnimate, setCanAnimate] = useState(false);
  const shouldAnimate = canAnimate && !shouldReduceMotion;

  // Avoid server/client motion preference mismatches: reduced-motion users always
  // receive the fully visible composition without a hidden animation start state.
  useEffect(() => setCanAnimate(true), []);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-350, 350], [6, -6]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-450, 450], [-7, 7]), {
    stiffness: 140,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[720px] pt-28 pb-16 md:pt-36 md:pb-20 flex flex-col justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Restrained atmospheric field — designed to sit behind, never compete with, the product. */}
      <div className="hero-plasma pointer-events-none" aria-hidden="true" />
      <div className="hero-data-lines pointer-events-none" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-radial-gradient pointer-events-none -z-10 blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="animate-fade-in-up inline-flex items-center">
            <Badge variant="lime" size="sm" pulse className="text-[10px] sm:text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              YOUR PERSONAL FITNESS INTELLIGENCE
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.06] break-words" aria-label="Train smarter. Progress continuously.">
            <span className="block overflow-hidden">
              {["Train", "smarter."].map((word, index) => (
                <motion.span
                  key={word}
                  initial={shouldAnimate ? { opacity: 0, y: 26, filter: "blur(8px)" } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                  transition={{ duration: 0.55, delay: 0.12 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-[0.24em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden text-gradient-lime">
              {["Progress", "continuously."].map((word, index) => (
                <motion.span
                  key={word}
                  initial={shouldAnimate ? { opacity: 0, y: 26, filter: "blur(8px)", letterSpacing: "-0.06em" } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "-0.025em" } : undefined}
                  transition={{ duration: 0.55, delay: 0.32 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-[0.24em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Your personal AI fitness companion that adapts your workouts, nutrition, and progression around you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="#pricing">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="#problem">
              <Button
                variant="secondary"
                size="lg"
                icon={<ChevronRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Product Visual — Layered 3D AI Fitness Interface */}
        <div className="relative mt-14 md:mt-20 max-w-4xl mx-auto perspective-1200">
          {/* Main 3D Floating Interface Card */}
          <motion.div
            style={{
              rotateX: shouldAnimate ? rotateX : 0,
              rotateY: shouldAnimate ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            data-cursor="explore"
            className="hero-dashboard relative rounded-2xl sm:rounded-3xl bg-[#0c0f17]/90 border border-white/15 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-5 sm:p-8 overflow-visible z-10 transition-shadow duration-300 hover:shadow-[0_35px_80px_-15px_rgba(204,255,0,0.15)]"
          >
            {/* Ambient top light line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#ccff00]/60 to-transparent"></div>

            {/* Interface Header — Layer 1 (translateZ: 20px) */}
            <div
              style={{ transform: "translateZ(20px)" }}
              className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.2)]">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono tracking-wider uppercase text-gray-400">
                    GOOD MORNING, ALEX
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white tracking-tight flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span>YOUR PLAN TODAY:</span> <span className="text-[#ccff00]">CHEST + TRICEPS</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
                  Adaptive v4.2
                </span>
                <span className="text-xs font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                  Est. 52 min
                </span>
              </div>
            </div>

            {/* Exercises List in Hero Card — Layer 2 (translateZ: 30px) */}
            <div style={{ transform: "translateZ(30px)" }} className="py-6 space-y-3">
              {/* Exercise 1 */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-[#ccff00]/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] text-xs font-bold font-mono">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#ccff00] transition-colors">
                      Barbell Bench Press
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">Primary Strength • 3-min rest</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pl-11 sm:pl-0">
                  <div className="text-right font-mono">
                    <span className="text-base sm:text-lg font-bold text-white">80 KG</span>
                    <span className="text-xs text-gray-400 ml-1.5">× 8 × 3</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded-full text-xs font-mono font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>8 / 8 / 8</span>
                  </div>
                </div>
              </div>

              {/* Exercise 2 */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 text-xs font-bold font-mono">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white">
                      Incline Dumbbell Press
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">Upper Hypertrophy • 90s rest</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pl-11 sm:pl-0">
                  <div className="text-right font-mono">
                    <span className="text-base sm:text-lg font-bold text-white">24 KG</span>
                    <span className="text-xs text-gray-400 ml-1.5">× 10 × 3</span>
                  </div>
                  <div className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                    Target Ready
                  </div>
                </div>
              </div>

              {/* Exercise 3 */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 text-xs font-bold font-mono">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white">
                      Cable Fly
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">Peak Stretch Isolation • 60s rest</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pl-11 sm:pl-0">
                  <div className="text-right font-mono">
                    <span className="text-base sm:text-lg font-bold text-white">12 KG</span>
                    <span className="text-xs text-gray-400 ml-1.5">× 12 × 3</span>
                  </div>
                  <div className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">
                    Target Ready
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded AI Recommendation Banner — Layer 3 (translateZ: 45px) */}
            <div
              style={{ transform: "translateZ(45px)" }}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#ccff00]/10 via-[#ccff00]/5 to-transparent border border-[#ccff00]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#ccff00] text-black shrink-0 mt-0.5 shadow-[0_0_15px_rgba(204,255,0,0.5)]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#ccff00] font-semibold">
                    AI RECOMMENDATION
                  </div>
                  <p className="text-sm text-gray-200 mt-0.5 font-medium leading-relaxed">
                    &ldquo;Keep 80 kg today. Your next progression target is 3 × 9.&rdquo;
                  </p>
                </div>
              </div>

              <button
                data-cursor="cta"
                className="px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-semibold text-xs uppercase tracking-wider font-mono hover:bg-[#d9ff33] transition-all shrink-0 shadow-[0_0_20px_-3px_rgba(204,255,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                Start Workout
              </button>
            </div>

            {/* ============================================================ */}
            {/* Surrounding Floating Telemetry Satellites with Layered Depth */}
            {/* Embedded inside preserve-3d motion container for true 3D tilt */}
            {/* ============================================================ */}

            {/* SATELLITE 1: STRENGTH +8.4% (Top-Right, translateZ: 50px) */}
            <div
              style={{ transform: "translateZ(50px)" }}
              className="hidden lg:flex absolute -top-8 -right-8 rounded-2xl bg-[#121622]/95 border border-white/15 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl items-center gap-3.5 z-20 animate-float-slow pointer-events-none select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
                  STRENGTH OVERLOAD
                </div>
                <div className="text-lg font-mono font-bold text-white flex items-center gap-1.5">
                  +8.4%
                  <span className="text-[10px] font-mono font-normal text-[#ccff00]">4-wk gain</span>
                </div>
              </div>
            </div>

            {/* SATELLITE 2: VOLUME +12% (Bottom-Left, translateZ: 40px) */}
            <div
              style={{ transform: "translateZ(40px)" }}
              className="hidden lg:flex absolute -bottom-6 -left-10 rounded-2xl bg-[#121622]/95 border border-white/15 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl items-center gap-3.5 z-20 animate-float-reverse pointer-events-none select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
                  WEEKLY VOLUME
                </div>
                <div className="text-lg font-mono font-bold text-white flex items-center gap-1.5">
                  +12%
                  <span className="text-[10px] font-mono font-normal text-[#38bdf8]">Optimal zone</span>
                </div>
              </div>
            </div>

            {/* SATELLITE 3: CONSISTENCY 94% (Top-Left, translateZ: 45px) */}
            <div
              style={{ transform: "translateZ(45px)" }}
              className="hidden xl:flex absolute -top-8 -left-8 rounded-2xl bg-[#121622]/95 border border-white/15 p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl items-center gap-3 z-20 pointer-events-none select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
                  CONSISTENCY
                </div>
                <div className="text-base font-mono font-bold text-white flex items-center gap-1">
                  94%
                  <span className="text-[10px] font-mono text-[#10b981] font-normal">24/25 sessions</span>
                </div>
              </div>
            </div>

            {/* SATELLITE 4: AI ACTIVE (Top-Center pill, translateZ: 35px) */}
            <div
              style={{ transform: "translateZ(35px)" }}
              className="hidden sm:flex absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#111624]/95 border border-[#ccff00]/40 px-3.5 py-1 shadow-[0_0_20px_rgba(204,255,0,0.2)] backdrop-blur-xl items-center gap-2 z-20 pointer-events-none select-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]"></span>
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#ccff00] uppercase">
                AI ACTIVE
              </span>
              <span className="text-[10px] font-mono text-gray-400">• Neural Model 4.2</span>
            </div>

            {/* SATELLITE 5: NEXT TARGET 80 KG × 8 (Bottom-Right, translateZ: 55px) */}
            <div
              style={{ transform: "translateZ(55px)" }}
              className="hidden sm:flex absolute -bottom-8 right-6 rounded-2xl bg-[#121622]/95 border border-[#ccff00]/30 px-4 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl items-center gap-3 z-20 pointer-events-none select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider uppercase text-gray-400">
                  NEXT TARGET
                </div>
                <div className="text-xs font-mono font-bold tracking-wider text-white">
                  <span className="text-[#ccff00]">80 KG × 8</span> • Form Stable
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
