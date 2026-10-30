import React from "react";
import Link from "next/link";
import { StarfieldCanvas } from "./components/StarfieldCanvas";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[#03050c] text-slate-100 text-center overflow-hidden">
      <StarfieldCanvas />
      <div className="relative z-10 max-w-md w-full bg-[#060a1c]/90 border border-cyan-500/35 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(34,211,238,0.3)]">
        <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-xl mx-auto mb-4 font-mono font-bold shadow-[0_0_20px_rgba(34,211,238,0.35)]">
          404
        </div>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
          Coordinates Beyond Visible Space
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          The requested presentation topic or cosmic coordinates could not be located in our observable catalog.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        >
          <span>← Return to All Presentations</span>
        </Link>
      </div>
    </div>
  );
}
