"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RestTimer } from "@/components/ui/RestTimer";
import { heroExercises } from "@/data/fitnessMockData";
import { Check, Dumbbell, Flame, Sparkles } from "lucide-react";

export function WorkoutGenSection() {
  const [exercises, setExercises] = useState(heroExercises);

  // Toggle set completion interactively for demonstration
  const toggleSet = (exerciseId: string, setIndex: number, repsTarget: number) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const currentCompleted = [...ex.completedSets];
        if (currentCompleted.length > setIndex) {
          currentCompleted.splice(setIndex, 1);
        } else {
          currentCompleted.push(repsTarget);
        }
        return { ...ex, completedSets: currentCompleted };
      })
    );
  };

  const totalCompletedVolume = exercises.reduce((acc, ex) => {
    const setsDone = ex.completedSets.length;
    return acc + setsDone * ex.reps * ex.weight;
  }, 0);

  return (
    <section id="workout" className="relative py-28 md:py-36 bg-[#090c12] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="04 // DYNAMIC SESSION PLAN"
          title={
            <>
              Not another workout plan.
              <br />
              <span className="text-gradient-lime">A plan built around you.</span>
            </>
          }
          description="Every movement, working load, set threshold, and rest interval is engineered specifically for your current physiological capacity."
        />

        {/* Premium Interactive Workout Module with 3D Depth */}
        <div
          data-cursor="explore"
          className="rounded-3xl bg-[#0c1018] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] space-y-6 transition-all duration-300 hover:border-white/25 perspective-1000"
        >
          {/* Header of the Session */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#ccff00]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DYNAMICALLY ASSEMBLED SESSION</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                Chest + Triceps Hypertrophy
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                Target Stimulus: 12 Working Sets • Optimal RIR: 1–2
              </p>
            </div>

            {/* Live Interactive Rest Timer Component */}
            <RestTimer initialSeconds={90} />
          </div>

          {/* List of 4 Assembled Exercises */}
          <div className="space-y-4">
            {exercises.map((exercise, index) => {
              return (
                <div
                  key={exercise.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#ccff00]/30 transition-all duration-200 space-y-3 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#ccff00]/30 flex items-center justify-center text-xs font-mono font-bold text-gray-300 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors">
                            {exercise.name}
                          </h4>
                          <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                            {exercise.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#ccff00] font-mono mt-0.5">
                          {exercise.aiNote}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-11 sm:pl-0 font-mono">
                      <div className="text-right">
                        <span className="text-lg font-bold text-white">
                          {exercise.weight} {exercise.unit}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          {exercise.sets} × {exercise.reps}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sets Progress Checkboxes (Interactive with tactile scale feedback!) */}
                  <div className="flex items-center gap-2 pt-1 pl-11 sm:pl-0">
                    <span className="text-[11px] font-mono text-gray-500 mr-2">LOG SETS:</span>
                    {Array.from({ length: exercise.sets }).map((_, sIdx) => {
                      const isCompleted = exercise.completedSets.length > sIdx;
                      return (
                        <motion.button
                          key={sIdx}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => toggleSet(exercise.id, sIdx, exercise.reps)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer ${
                            isCompleted
                              ? "bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.4)]"
                              : "bg-white/5 text-gray-400 border-white/10 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          <Check className={`w-3 h-3 ${isCompleted ? "stroke-[3]" : "opacity-40"}`} />
                          <span>Set {sIdx + 1} ({exercise.reps})</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Session Footer Telemetry */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-400 gap-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#ccff00]" />
              <span>Current Session Volume:</span>
              <span className="text-white font-bold bg-[#ccff00]/10 border border-[#ccff00]/30 px-2 py-0.5 rounded text-[#ccff00]">
                {totalCompletedVolume.toLocaleString()} KG
              </span>
            </div>
            <div className="text-gray-400">
              Interactive preview • Click any set to log progress in real time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

