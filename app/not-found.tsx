import React from "react";
import Link from "next/link";
import { StarfieldCanvas } from "./components/StarfieldCanvas";
import { ThemeToggle } from "./components/ThemeToggle";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#03050c] text-slate-900 dark:text-slate-100 text-center overflow-hidden transition-colors duration-300">
      <StarfieldCanvas />

      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/90 dark:bg-[#060a1c]/90 border border-sky-300/80 dark:border-cyan-500/35 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,132,199,0.12)] dark:shadow-[0_0_60px_-15px_rgba(34,211,238,0.3)]">
        <div className="w-14 h-14 rounded-2xl bg-sky-100 border border-sky-300 text-sky-700 dark:bg-cyan-950/80 dark:border-cyan-500/40 dark:text-cyan-400 flex items-center justify-center text-xl mx-auto mb-4 font-mono font-bold shadow-[0_4px_20px_rgba(2,132,199,0.2)] dark:shadow-[0_0_20px_rgba(34,211,238,0.35)]">
          404
        </div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Coordinates Beyond Visible Space
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          The requested presentation topic or cosmic coordinates could not be located in our observable catalog.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold bg-sky-600 hover:bg-sky-500 text-white dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 transition shadow-[0_4px_16px_rgba(2,132,199,0.25)] dark:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        >
          <span>Return to All Presentations</span>
        </Link>
      </div>
    </div>
  );
}
