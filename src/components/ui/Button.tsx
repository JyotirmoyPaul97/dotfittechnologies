"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  magnetic?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  magnetic = true,
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  // Magnetic spring values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 15 });
  const springY = useSpring(y, { stiffness: 220, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.28;
    const distanceY = (e.clientY - centerY) * 0.28;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-full transition-[background-color,border-color,box-shadow,color] duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ccff00]/40 disabled:opacity-50 disabled:cursor-not-allowed group";

  const variantStyles = {
    primary:
      "bg-[#ccff00] text-[#07080b] font-semibold hover:bg-[#d9ff33] shadow-[0_0_24px_-4px_rgba(204,255,0,0.45)] hover:shadow-[0_0_36px_0px_rgba(204,255,0,0.65)]",
    secondary:
      "bg-white/[0.07] text-white hover:bg-white/[0.12] border border-white/10 hover:border-[#ccff00]/40 backdrop-blur-md shadow-lg",
    outline:
      "bg-transparent text-gray-200 border border-white/20 hover:border-[#ccff00] hover:text-[#ccff00]",
    ghost:
      "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
  };

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5 font-semibold",
  };

  return (
    <motion.button
      ref={btnRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      data-cursor="cta"
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </motion.button>
  );
}

