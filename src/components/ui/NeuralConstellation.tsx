"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  ox: number; // original x (for drift baseline)
  oy: number; // original y
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseAlpha: number;
  phase: number;
}

interface NeuralConstellationProps {
  particleCount?: number;
  colors?: string[];
  connectDistance?: number;
  mouseRadius?: number;
  mouseStrength?: number;
  driftSpeed?: number;
  className?: string;
  fixed?: boolean;
  reducedOnMobile?: boolean;
}

/**
 * Premium neural-network constellation.
 * Canvas 2D with requestAnimationFrame, DPR-aware, pointer-safe.
 * Mouse gently attracts particles; edges wrap seamlessly.
 * Reduced-motion, tab-blur pause, and mobile fallback handled here.
 */
export function NeuralConstellation({
  particleCount = 55,
  colors = ["#ccff00", "#38bdf8", "#a855f7"],
  connectDistance = 120,
  mouseRadius = 110,
  mouseStrength = 0.55,
  driftSpeed = 0.18,
  className = "",
  fixed = true,
  reducedOnMobile = true,
}: NeuralConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const effectiveCount =
    isLowEnd && reducedOnMobile ? Math.floor(particleCount * 0.4) : particleCount;

  // Detect preferences once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const narrow = window.innerWidth < 1024;
    setIsMobile(isTouch || narrow);

    // Heuristic low-end detection: hardware concurrency + touch
    const cores = navigator.hardwareConcurrency || 4;
    setIsLowEnd(isTouch || cores < 4 || narrow);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
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
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < effectiveCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * driftSpeed,
          vy: (Math.random() - 0.5) * driftSpeed,
          size: Math.random() * 1.4 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.35 + 0.18,
          phase: Math.random() * Math.PI * 2,
        });
      }
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

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle attraction toward mouse
        if (mouseActive) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * mouseStrength;
            p.vx += (dx / dist) * force * 0.04;
            p.vy += (dy / dist) * force * 0.04;
          }
        }

        // Damping so particles don't accelerate forever
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges seamlessly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Soft alpha pulse
        const alpha = p.baseAlpha + Math.sin(t + p.phase) * 0.06;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.1;
        ctx.fill();

        ctx.globalAlpha = 1;
      }

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistance * connectDistance) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / connectDistance) * 0.16;
            ctx.strokeStyle = `rgba(204, 255, 0, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    const handleResize = () => {
      resize();
      initParticles();
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

    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible && !animationId) {
        animationId = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion, isLowEnd, reducedOnMobile, effectiveCount, colors, connectDistance, mouseRadius, mouseStrength, driftSpeed]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`${fixed ? "fixed" : "absolute"} inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ willChange: "transform" }}
    />
  );
}