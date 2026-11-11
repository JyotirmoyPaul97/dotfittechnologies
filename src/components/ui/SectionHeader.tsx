"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const shouldReduceMotion = useReducedMotion();
  const [canAnimate, setCanAnimate] = useState(false);
  const shouldAnimate = canAnimate && !shouldReduceMotion;
  const words = typeof title === "string" ? title.split(" ") : null;

  useEffect(() => setCanAnimate(true), []);

  return (
    <div
      className={`max-w-3xl mb-16 md:mb-20 ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <div
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[11px] font-mono tracking-[0.18em] uppercase bg-white/[0.04] border border-white/10 text-[#ccff00]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
        {words ? (
          words.map((word, index) => (
            <span className="inline-block overflow-hidden mr-[0.24em]" key={`${word}-${index}`}>
              <motion.span
                className="inline-block"
                initial={shouldAnimate ? { opacity: 0, y: 18, filter: "blur(6px)" } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.48, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))
        ) : (
          <motion.span
            className="inline-block"
            initial={shouldAnimate ? { opacity: 0, y: 20, filter: "blur(6px)" } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.span>
        )}
      </h2>

      {description && (
        <motion.p
          initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
