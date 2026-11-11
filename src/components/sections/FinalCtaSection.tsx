"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { DottedField } from "@/components/ui/DottedField";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="relative py-32 md:py-44 bg-[#07080b] border-t border-white/5 overflow-hidden">
      {/* Editorial finish: image texture is treated like low-contrast film, not a hero photograph. */}
      <div
        aria-hidden="true"
        className="cinematic-photo-layer absolute inset-0 pointer-events-none opacity-[0.22] -z-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1800&q=85')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#07080b]/75 pointer-events-none -z-10" />
      {/* Intense atmospheric center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-gradient blur-[140px] pointer-events-none -z-10 opacity-70"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#ccff00]/10 blur-[120px] pointer-events-none -z-10 animate-pulse-subtle"></div>

      {/* Premium fluid wave — closing energy across the CTA base */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 opacity-80">
        <DottedField
          pattern="converge"
          spacing={32}
          baseAlpha={0.12}
          mouseRadius={120}
          mouseStrength={0.5}
          fixed={false}
          className="w-full h-full"
        />
      </div>

      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0.3, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.3)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE NEXT GENERATION OF FITNESS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0.3, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
        >
          Your next level starts with a{" "}
          <span className="text-gradient-lime">better plan.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0.3, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-lg sm:text-xl text-gray-300 font-normal max-w-xl mx-auto leading-relaxed"
        >
          Train with intelligence. Progress with purpose.
          <br />
          Experience what happens when your workouts adapt to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0.3, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#pricing">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="text-base px-9 py-4 font-bold shadow-[0_0_35px_rgba(204,255,0,0.5)]"
            >
              Start Your Journey →
            </Button>
          </Link>
        </motion.div>

        {/* Minimal live telemetry footer ribbon */}
        <motion.div
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-400"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
            Real-Time Engine Active
          </span>
          <span>•</span>
          <span>Zero Static Spreadsheets</span>
          <span>•</span>
          <span>Continuous Progressive Overload</span>
        </motion.div>
      </div>

      {/* Minimal elegant converging dot field — Final CTA centerpiece */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 opacity-70">
        <DottedField
          pattern="converge"
          spacing={32}
          baseAlpha={0.12}
          mouseRadius={120}
          mouseStrength={0.5}
          fixed={false}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
