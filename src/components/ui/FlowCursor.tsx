"use client";

import React, { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

type CursorMode = "default" | "cta" | "link" | "explore";

export function FlowCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const modeRef = useRef<CursorMode>("default");
  const isVisibleRef = useRef(false);

  // Raw cursor and smoothed positions
  const mousePos = useRef<Point>({ x: -100, y: -100 });
  const ringPos = useRef<Point>({ x: -100, y: -100 });
  const ctaTarget = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  // Flowing telemetry data trail (3 trailing particles)
  const trailPoints = useRef<Point[]>([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const clickWaveRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only enable on desktop pointer: fine devices, never touch screens
    if (typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isHoverable = window.matchMedia("(hover: hover)").matches;
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isFinePointer || !isHoverable || (hasTouch && window.innerWidth < 1024)) {
      return;
    }

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Check hover targets for interactive modes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const ctaElement = target.closest(
        'button, [data-cursor="cta"], [data-cursor="magnetic"], .btn-primary, [role="button"]'
      ) as HTMLElement | null;
      const linkElement = target.closest('a, [data-cursor="link"], nav a');
      const exploreElement = target.closest('[data-cursor="explore"], svg.cursor-pointer, .interactive-card');

      let newMode: CursorMode = "default";

      if (ctaElement) {
        newMode = "cta";
        const rect = ctaElement.getBoundingClientRect();
        ctaTarget.current.x = rect.left + rect.width / 2;
        ctaTarget.current.y = rect.top + rect.height / 2;
        ctaTarget.current.active = true;
      } else if (exploreElement) {
        newMode = "explore";
        ctaTarget.current.active = false;
      } else if (linkElement) {
        newMode = "link";
        ctaTarget.current.active = false;
      } else {
        newMode = "default";
        ctaTarget.current.active = false;
      }

      if (modeRef.current !== newMode) {
        modeRef.current = newMode;
        setMode(newMode);
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      if (clickWaveRef.current) {
        clickWaveRef.current.classList.remove("animate-cursor-pulse");
        void clickWaveRef.current.offsetWidth; // Trigger reflow for instant re-trigger
        clickWaveRef.current.classList.add("animate-cursor-pulse");
      }
    };

    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    let animationFrameId: number;

    const animate = () => {
      const mouseX = mousePos.current.x;
      const mouseY = mousePos.current.y;

      // 1. Instant GPU response for center core
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // 2. Magnetic attraction for outer ring when hovering a CTA
      let targetRingX = mouseX;
      let targetRingY = mouseY;
      if (ctaTarget.current.active) {
        // Strong magnetic pull toward button center while keeping user responsiveness
        targetRingX = mouseX * 0.55 + ctaTarget.current.x * 0.45;
        targetRingY = mouseY * 0.55 + ctaTarget.current.y * 0.45;
      }

      // Smooth physics lerp for outer ring
      ringPos.current.x += (targetRingX - ringPos.current.x) * 0.24;
      ringPos.current.y += (targetRingY - ringPos.current.y) * 0.24;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // 3. Trailing data telemetry flow
      let prevX = ringPos.current.x;
      let prevY = ringPos.current.y;

      trailPoints.current.forEach((pt, index) => {
        const lerpFactor = 0.36 - index * 0.08;
        pt.x += (prevX - pt.x) * lerpFactor;
        pt.y += (prevY - pt.y) * lerpFactor;

        const el = trailRefs.current[index];
        if (el) {
          el.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
        }

        prevX = pt.x;
        prevY = pt.y;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Flowing data telemetry trail */}
      {trailPoints.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="absolute -top-1 -left-1 rounded-full pointer-events-none will-change-transform"
          style={{
            width: `${Math.max(2, 3.5 - i * 0.8)}px`,
            height: `${Math.max(2, 3.5 - i * 0.8)}px`,
            backgroundColor: i === 0 ? "#ccff00" : i === 1 ? "#8ad8ff" : "#c084fc",
            opacity: 0.42 - i * 0.12,
            boxShadow: i === 0 ? "0 0 8px rgba(204,255,0,0.6)" : "none",
          }}
        />
      ))}

      {/* Smooth outer ring */}
      <div
        ref={ringRef}
        className={`absolute rounded-full pointer-events-none transition-[width,height,border-color,background-color,margin] duration-200 ease-out will-change-transform flex items-center justify-center ${
          mode === "cta"
            ? "w-12 h-12 -mt-6 -ml-6 border border-[#ccff00] bg-[#ccff00]/10 shadow-[0_0_24px_rgba(204,255,0,0.35)]"
            : mode === "explore"
            ? "w-14 h-14 -mt-7 -ml-7 border border-[#ccff00]/50 bg-[#ccff00]/[0.05] shadow-[0_0_22px_rgba(204,255,0,0.2)]"
            : mode === "link"
            ? "w-9 h-9 -mt-[18px] -ml-[18px] border border-[#ccff00]/60 bg-white/[0.02]"
            : "w-7 h-7 -mt-3.5 -ml-3.5 border border-white/25 bg-transparent"
        } ${isClicking ? "scale-80 border-[#ccff00]" : "scale-100"}`}
      >
        {/* Click pulse ring wave */}
        <div
          ref={clickWaveRef}
          className="absolute inset-0 rounded-full border border-[#ccff00]/80 opacity-0 pointer-events-none"
        />

        {/* Explore state badge */}
        {mode === "explore" && (
          <span className="text-[7.5px] font-mono font-bold tracking-widest text-[#ccff00] uppercase select-none">
            DATA
          </span>
        )}
      </div>

      {/* High-precision glowing center dot */}
      <div
        ref={dotRef}
        className={`absolute w-1.5 h-1.5 -mt-[3px] -ml-[3px] rounded-full pointer-events-none will-change-transform transition-[background-color,transform] duration-150 ${
          mode === "cta"
            ? "bg-[#ccff00] shadow-[0_0_10px_#ccff00,0_0_2px_#ffffff] scale-125"
            : mode === "explore"
            ? "bg-[#ccff00] shadow-[0_0_8px_#ccff00]"
            : "bg-[#ccff00] shadow-[0_0_6px_#ccff00]"
        } ${isClicking ? "scale-75" : ""}`}
      />
    </div>
  );
}

