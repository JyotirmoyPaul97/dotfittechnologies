"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { howItWorksSteps } from "@/data/fitnessMockData";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 md:py-36 bg-[#090c12] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[170px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="10 // ONBOARDING PROTOCOL"
          title="Engineered simplicity in 4 steps."
          description="From physiological calibration to continuous autonomous overload—how IntFit.ai powers your progression."
        />

        {/* 4 Clean Steps Grid */}
        <div className="space-y-6 sm:space-y-8">
          {howItWorksSteps.map((step, idx) => {
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0.2, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="cinema-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0c1018] border border-white/10 hover:border-[#ccff00]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                  {/* Step Number in Huge Monospace Typography */}
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-gray-700 group-hover:text-[#ccff00] transition-colors shrink-0">
                    {step.step}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-0.5 rounded-full border border-[#ccff00]/20">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
