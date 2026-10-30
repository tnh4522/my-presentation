"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

function IconSun({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function IconMoon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </svg>
  );
}

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme (Shortcut: T)" : "Switch to dark theme (Shortcut: T)"}
      title={isDark ? "Switch to light theme (T)" : "Switch to dark theme (T)"}
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-mono font-medium transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:focus-visible:ring-cyan-400 ${
        isDark
          ? "bg-slate-900 border border-slate-700/80 text-amber-300 hover:text-amber-200 hover:border-amber-400/60 hover:bg-slate-800 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
          : "bg-white border border-slate-200 text-sky-800 hover:text-sky-900 hover:border-sky-400 hover:bg-sky-50/60 shadow-sm"
      } ${className}`}
    >
      {isDark ? (
        <>
          <IconSun className="w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:rotate-45" />
          {showLabel && <span className="hidden sm:inline">Light Mode</span>}
        </>
      ) : (
        <>
          <IconMoon className="w-4 h-4 text-sky-700 transition-transform duration-300 group-hover:-rotate-12" />
          {showLabel && <span className="hidden sm:inline">Dark Mode</span>}
        </>
      )}
      <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono select-none opacity-70 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400">
        T
      </kbd>
    </button>
  );
}
