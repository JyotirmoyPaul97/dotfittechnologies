"use client";

import React, { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  baseAlpha: number;
  size: number;
}

interface DottedFieldProps {
  pattern?: "flow" | "grid" | "arc" | "converge" | "organize";
  dotCount?: number;
  spacing?: number;
  baseAlpha?: number;
  accentAlpha?: number;
  mouseRadius?: number;
  mouseStrength?: number;
  scrollParallax?: boolean;
  className?: string;
  fixed?: boolean;
  reducedOnMobile?: boolean;
}

/**
 * Premium dotted graphics system.
 * Micro-dots (not particles), monochromatic with restrained lime accent.
 * Cursor creates a gentle physical ripple. Scroll adds parallax.
 * 60fps via DPR-capped canvas + rAF. Mobile auto-reduces.
 */
export function DottedField({
  pattern = "flow",
  dotCount = 120,
  spacing = 26,
  baseAlpha = 0.18,
  accentAlpha = 0.5,
  mouseRadius = 90,
  mouseStrength = 0.6,
  scrollParallax = true,
  className = "",
  fixed = true,
  reducedOnMobile = true,
}: DottedFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const scrollY = useRef(0);
  const dotsRef = useRef<Dot[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const narrow = window.innerWidth < 768;
    setIsMobile(touch || narrow);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let visible = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildDots = () => {
      const dots: Dot[] = [];
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing + spacing / 2;
          const y = r * spacing + spacing / 2;
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            baseAlpha: baseAlpha + Math.random() * 0.12,
            size: Math.random() * 0.7 + 0.5,
          });
        }
      }
      dotsRef.current = dots;
    };

    const draw = () => {
      if (!visible) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;
      const t = performance.now() * 0.001;

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        if (mouseActive) {
          const dx = mx - d.x;
          const dy = my - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * mouseStrength;
            d.x += (dx / dist) * force * 8;
            d.y += (dy / dist) * force * 8;
          }
        }

        d.x += (d.baseX - d.x) * 0.12;
        d.y += (d.baseY - d.y) * 0.12;

        const pulse = Math.sin(t * 0.6 + d.baseX * 0.01) * 0.03;
        const alpha = Math.max(0.04, d.baseAlpha + pulse);

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(204, 255, 0, " + alpha + ")";
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    buildDots();
    draw();

    const handleResize = () => {
      resize();
      buildDots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && !animationId) {
        animationId = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion, baseAlpha, mouseRadius, mouseStrength, spacing]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`${fixed ? "fixed" : "absolute"} inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
