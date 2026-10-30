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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#03050c] text-slate-100 text-center selection:bg-cyan-500/30">
      <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-2xl shadow-[0_0_30px_rgba(34,211,238,0.3)] mb-4">
        ✦
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
        Cosmic Transmission Interrupted
      </h1>
      <p className="text-sm font-sans text-slate-300 max-w-md mb-6 leading-relaxed">
        An unexpected telemetry error occurred while rendering this celestial view. The system can recalibrate and reload the slide deck.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition shadow-[0_0_15px_rgba(34,211,238,0.4)] cursor-pointer"
        >
          ↻ Recalibrate &amp; Retry
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-400 transition"
        >
          ← Return to Hub
        </Link>
      </div>
    </div>
  );
}
