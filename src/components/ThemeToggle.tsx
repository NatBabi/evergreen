"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light botanical theme" : "Switch to dark forest theme"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`inline-flex items-center justify-center gap-2 rounded-full border transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf min-h-[36px] ${
        isDark
          ? "bg-forest/60 hover:bg-forest border-ivory/20 text-leaf hover:text-ivory shadow-sm"
          : "bg-white/90 hover:bg-white border-forest/15 text-forest hover:text-leaf shadow-sm"
      } ${
        showLabel ? "px-3 py-1" : "w-9 h-9 sm:w-10 sm:h-10"
      } ${className}`}
    >

      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
      {showLabel && (
        <span className="text-xs font-mono font-semibold leading-4">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
