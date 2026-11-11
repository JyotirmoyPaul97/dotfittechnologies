"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

interface ParticleSimulationProps {
  particleCount?: number;
  colors?: string[];
  connectDistance?: number;
  speed?: number;
  mouseRadius?: number;
  mouseRepel?: number;
  className?: string;
  fixed?: boolean;
}

export function ParticleSimulation({
  particleCount = 70,
  colors = ["#ccff00", "#38bdf8", "#a855f7"],
  connectDistance = 130,
  speed = 0.35,
  mouseRadius = 90,
  mouseRepel = 0.8,
  className = "",
  fixed = true,
}: ParticleSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
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
      for (let i = 0; i < particleCount; i++) {
        const baseAlpha = Math.random() * 0.4 + 0.18;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: -(Math.random() * speed * 0.6 + speed * 0.15),
          size: Math.random() * 1.6 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repel effect
        if (mouseActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * mouseRepel;
            p.x += (dx / dist) * force * 2;
            p.y += (dy / dist) * force * 2;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges with seamless looping
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle alpha pulsation
        p.alpha = p.baseAlpha + Math.sin((Date.now() + i * 1000) * 0.001) * 0.08;
      }

      // Draw connections (constellation lines)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistance * connectDistance) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / connectDistance) * 0.18;
            ctx.strokeStyle = `rgba(204, 255, 0, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Soft glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.15;
        ctx.fill();

        ctx.globalAlpha = 1;
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

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion, particleCount, colors, connectDistance, speed, mouseRadius, mouseRepel]);

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