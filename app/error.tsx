"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected errors for diagnostics
    console.error("Telemetry error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#03050c] text-slate-900 dark:text-slate-100 text-center selection:bg-sky-500/30 dark:selection:bg-cyan-500/30 transition-colors duration-300">
      <div className="w-16 h-16 rounded-2xl bg-sky-100 border border-sky-300 dark:bg-cyan-950/80 dark:border-cyan-500/40 flex items-center justify-center text-sky-600 dark:text-cyan-400 text-2xl shadow-[0_0_30px_rgba(2,132,199,0.2)] dark:shadow-[0_0_30px_rgba(34,211,238,0.3)] mb-4">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
        Cosmic Transmission Interrupted
      </h1>
      <p className="text-sm font-sans text-slate-600 dark:text-slate-300 max-w-md mb-6 leading-relaxed">
        An unexpected telemetry error occurred while rendering this celestial view. The system can recalibrate and reload the slide deck.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-sky-600 text-white hover:bg-sky-500 dark:bg-cyan-400 text-slate-950 dark:hover:bg-cyan-300 transition shadow-[0_0_15px_rgba(2,132,199,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.4)] cursor-pointer"
        >
          Recalibrate &amp; Retry
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-white border border-slate-300 text-slate-800 hover:border-sky-500 hover:text-sky-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300 transition shadow-sm"
        >
          Return to Hub
        </Link>
      </div>
    </div>
  );
}
