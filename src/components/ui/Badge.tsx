import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "lime" | "cyan" | "purple" | "muted" | "outline";
  size?: "sm" | "md";
  className?: string;
  pulse?: boolean;
}

export function Badge({
  children,
  variant = "lime",
  size = "sm",
  className = "",
  pulse = false,
}: BadgeProps) {
  const variantStyles = {
    lime: "bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/30 shadow-[0_0_12px_-2px_rgba(204,255,0,0.25)]",
    cyan: "bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/30 shadow-[0_0_12px_-2px_rgba(56,189,248,0.25)]",
    purple: "bg-[#a855f7]/10 text-[#c084fc] border-[#a855f7]/30",
    muted: "bg-white/5 text-gray-400 border-white/10",
    outline: "bg-transparent text-gray-300 border-white/15",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-1 tracking-wider uppercase font-medium",
    md: "text-xs px-3 py-1.5 font-medium",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
}
