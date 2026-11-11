"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

interface RestTimerProps {
  initialSeconds?: number;
  className?: string;
  onFinish?: () => void;
}

export function RestTimer({ initialSeconds = 90, className = "" }: RestTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const toggleRun = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = ((initialSeconds - secondsLeft) / initialSeconds) * 100;
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div
      className={`flex items-center gap-3.5 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md ${className}`}
    >
      <div className="relative w-11 h-11 flex items-center justify-center flex-shrink-0">
        <svg className="w-11 h-11 -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="#ccff00"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-linear"
          />
        </svg>
        <Timer className="w-4 h-4 text-[#ccff00] absolute" />
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
          Rest Timer
        </span>
        <span className="font-mono text-base font-semibold tracking-tight text-white">
          {formatTime(secondsLeft)}
        </span>
      </div>

      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={toggleRun}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#ccff00]/20 hover:text-[#ccff00] transition-colors border border-white/10 text-gray-300"
          title={isRunning ? "Pause" : "Start"}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 transition-colors border border-white/10 text-gray-400 hover:text-white"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
