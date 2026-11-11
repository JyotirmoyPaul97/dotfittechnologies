"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HelpCircle, Shuffle, TrendingDown, ArrowDown, Sparkles } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      number: "01",
      icon: Shuffle,
      title: "RANDOM WORKOUTS",
      tagline: "The influencer workout trap",
      description:
        "Switching routines every week based on social media trends. Without targeted stimulus frequency, your muscles receive mixed, incompatible signals.",
    },
    {
      number: "02",
      icon: HelpCircle,
      title: "NO CLEAR PROGRESSION",
      tagline: "Guessing loads & reps in the dark",
      description:
        "Not knowing whether to add 2.5 kg, attempt another repetition, or deload after fatigue. Static PDFs and notes apps cannot calculate physiological fatigue.",
    },
    {
      number: "03",
      icon: TrendingDown,
      title: "INCONSISTENT RESULTS",
      tagline: "Plateaus, burnout & wasted months",
      description:
        "Working hard in the gym without seeing measurable changes in your compound strength, muscle thickness, or body composition. Effort without intelligence is stagnation.",
    },
  ];

  return (
    <section id="problem" className="relative py-28 md:py-36 bg-[#07080b] border-t border-white/5 overflow-hidden">
      {/* An editorial training texture, deliberately dimmed to keep the diagnosis legible. */}
      <div
        aria-hidden="true"
        className="cinematic-photo-layer absolute inset-0 pointer-events-none opacity-[0.18] -z-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#07080b]/80 via-[#07080b]/92 to-[#07080b] pointer-events-none -z-10" />
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-950/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <SectionHeader
          eyebrow="01 // THE SYSTEMIC PROBLEM"
          title="You shouldn't have to guess your way through fitness."
          description="Most fitness apps are static databases masquerading as coaches. Without real-time adaptation, they trap you in an endless cycle of guesswork."
        />

        {/* Sequential Cascade of Problems */}
        <div className="space-y-6 md:space-y-8 relative">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <React.Fragment key={problem.number}>
                <motion.div
                  initial={{ opacity: 0.3, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="cinema-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0b0e15]/90 border border-white/10 hover:border-red-500/30 transition-all duration-300 group backdrop-blur-sm shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-red-400/90 group-hover:scale-105 group-hover:border-red-500/40 transition-all shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-gray-500 font-semibold tracking-wider">
                            PROBLEM {problem.number}
                          </span>
                          <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                            {problem.tagline}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                          {problem.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-3xl sm:pl-16">
                    {problem.description}
                  </p>
                </motion.div>

                {index < problems.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div
                      className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-500"
                    >
                      <ArrowDown className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Climax transition into the solution */}
        <motion.div
          initial={{ opacity: 0.3, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 md:mt-24 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 shadow-[0_0_30px_-5px_rgba(204,255,0,0.3)]">
            <Sparkles className="w-4 h-4 text-[#ccff00]" />
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#ccff00]">
              THE SOLUTION BEGINS WITH YOUR BASELINE →
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
