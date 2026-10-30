"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PRESENTATIONS, PresentationDeck } from "../data/presentations";
import { SLIDE_MEDIA_MAP } from "./SlideVisuals";
import { StarfieldCanvas } from "./StarfieldCanvas";
import { PresentationApp } from "./PresentationApp";

/* ─── Tailored Deep-Space SVG Icons (Craft Floor: No Raw Unicode Glyphs) ─── */

function IconAperture({ className = "w-4 h-4" }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
      <line x1="9.69" y1="8" x2="21.17" y2="8" />
      <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
      <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
      <line x1="14.31" y1="16" x2="2.83" y2="16" />
      <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
    </svg>
  );
}

function IconSearch({ className = "w-4 h-4" }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconClose({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconPlay({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function IconScroll({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconLink({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconStar({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconCheck({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconTopology({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="11" y1="3" x2="11" y2="17" />
    </svg>
  );
}

function IconMedia({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function IconInteract({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function IconRadioDish({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}

function IconRadar({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="12" />
      <line x1="12" y1="12" x2="20.66" y2="7" strokeDasharray="2 2" />
    </svg>
  );
}

function IconReset({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

function IconGitHub({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

/* ─── Spectral Semantic Theme Mapping for Presentation Acts ─── */
const ACT_SPECTRAL_STYLES: Record<
  number,
  {
    border: string;
    text: string;
    bg: string;
    badge: string;
  }
> = {
  1: {
    border: "border-cyan-500/30 hover:border-cyan-400/80",
    text: "text-cyan-300",
    bg: "bg-cyan-950/20 hover:bg-cyan-950/40",
    badge: "text-cyan-400 bg-cyan-950/80 border-cyan-500/40",
  },
  2: {
    border: "border-indigo-500/30 hover:border-indigo-400/80",
    text: "text-indigo-300",
    bg: "bg-indigo-950/20 hover:bg-indigo-950/40",
    badge: "text-indigo-400 bg-indigo-950/80 border-indigo-500/40",
  },
  3: {
    border: "border-amber-500/30 hover:border-amber-400/80",
    text: "text-amber-300",
    bg: "bg-amber-950/20 hover:bg-amber-950/40",
    badge: "text-amber-400 bg-amber-950/80 border-amber-500/40",
  },
  4: {
    border: "border-rose-500/30 hover:border-rose-400/80",
    text: "text-rose-300",
    bg: "bg-rose-950/20 hover:bg-rose-950/40",
    badge: "text-rose-400 bg-rose-950/80 border-rose-500/40",
  },
  5: {
    border: "border-emerald-500/30 hover:border-emerald-400/80",
    text: "text-emerald-300",
    bg: "bg-emerald-950/20 hover:bg-emerald-950/40",
    badge: "text-emerald-400 bg-emerald-950/80 border-emerald-500/40",
  },
};

export function PresentationHub() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [activeLaunch, setActiveLaunch] = useState<{
    deck: PresentationDeck;
    mode: "deck" | "gamma";
    slideIndex: number;
  } | null>(null);

  const desktopSearchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

  // Global hotkey: '/' to focus search, 'Escape' to clear/blur
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === "INPUT" ||
        activeEl?.tagName === "TEXTAREA" ||
        activeEl?.getAttribute("contenteditable") === "true";

      if (e.key === "/" && !isInput) {
        e.preventDefault();
        if (window.innerWidth >= 768) {
          desktopSearchInputRef.current?.focus();
        } else {
          mobileSearchInputRef.current?.focus();
        }
      } else if (e.key === "Escape") {
        if (isInput) {
          (activeEl as HTMLElement)?.blur();
        } else if (searchQuery) {
          setSearchQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  // If a presentation was launched inline from the hub, render PresentationApp directly
  if (activeLaunch) {
    return (
      <PresentationApp
        deck={activeLaunch.deck}
        initialMode={activeLaunch.mode}
        initialSlideIndex={activeLaunch.slideIndex}
        onBackToHub={() => setActiveLaunch(null)}
      />
    );
  }

  const categories = [
    "All",
    ...Array.from(new Set(PRESENTATIONS.map((p) => p.category))),
  ];

  const filteredDecks = PRESENTATIONS.filter((deck) => {
    const matchesCategory =
      selectedCategory === "All" || deck.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;
    return (
      matchesCategory &&
      (deck.title.toLowerCase().includes(q) ||
        deck.subtitle.toLowerCase().includes(q) ||
        deck.description.toLowerCase().includes(q) ||
        deck.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  const featuredDeck =
    PRESENTATIONS.find((p) => p.featured) ?? PRESENTATIONS[0];

  const handleCopyShareLink = (deck: PresentationDeck) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/presentations/${deck.slug}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedSlug(deck.slug);
        setTimeout(() => setCopiedSlug(null), 2400);
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#03050c] text-slate-100 selection:bg-cyan-500/25 selection:text-white">
      <StarfieldCanvas />

      {/* Top Navigation Bar with Cosmic Glass Aesthetics */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#03050c]/85 backdrop-blur-md">
        <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Logo & Platform Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] shrink-0 group">
              <IconAperture className="w-5 h-5 text-slate-950 transition-transform duration-700 group-hover:rotate-90" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-sm sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
                  My Presentation
                </h1>
                <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shrink-0">
                  Planetarium Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block truncate">
                Interactive Celestial Decks &amp; Deep-Space Storytelling
              </p>
            </div>
          </div>

          {/* Desktop Search Bar with Global Hotkey & Precision Icon */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
                <IconSearch className="w-4 h-4" />
              </div>
              <input
                ref={desktopSearchInputRef}
                type="text"
                value={searchQuery}
                maxLength={120}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, paradoxes, acts... (Press / to search)"
                aria-label="Search presentation topics"
                className="w-full rounded-xl bg-slate-900/90 border border-slate-800 pl-10 pr-16 py-2 text-base sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition duration-200"
              />
              <div className="absolute right-3 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search query"
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    <IconClose className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 select-none">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Telemetry Stats Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300 whitespace-nowrap flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
              <span>
                <strong className="text-cyan-400 font-bold">
                  {PRESENTATIONS.length}
                </strong>{" "}
                Exhibit{PRESENTATIONS.length > 1 ? "s" : ""}
              </span>
              <span className="text-slate-600">·</span>
              <span>
                <strong className="text-amber-300 font-bold">
                  {PRESENTATIONS.reduce((acc, p) => acc + p.slideCount, 0)}
                </strong>{" "}
                Slides
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 py-5 sm:py-8 space-y-8 sm:space-y-12">
        {/* Featured Presentation Hero Banner */}
        {featuredDeck && (
          <section
            aria-labelledby="featured-deck-title"
            className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/35 bg-[#060a1c]/92 overflow-hidden shadow-[0_25px_80px_-20px_rgba(34,211,238,0.25)]"
          >
            <img
              src={featuredDeck.coverImage}
              alt={featuredDeck.title}
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = "/images/night-sky-dark/images (9).jpg";
              }}
              className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714]/92 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-8 lg:p-10 items-center">
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                {/* Meta Badge Cluster */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.5)] whitespace-nowrap">
                    <IconStar className="w-3 h-3 fill-current" />
                    <span>FEATURED EXHIBIT</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono bg-slate-900/90 border border-cyan-500/40 text-cyan-300 whitespace-nowrap">
                    {featuredDeck.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono bg-slate-900/90 border border-slate-700 text-amber-300 whitespace-nowrap">
                    {featuredDeck.slideCount} Slides · ~{featuredDeck.estimatedMinutes} Min Experience
                  </span>
                </div>

                <div>
                  <h2
                    id="featured-deck-title"
                    className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
                  >
                    {featuredDeck.title}
                  </h2>
                  <p className="text-sm sm:text-lg lg:text-xl text-cyan-300 font-medium mt-1.5">
                    {featuredDeck.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {featuredDeck.description}
                </p>

                {/* Presentation Launch Action Strip */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({
                        deck: featuredDeck,
                        mode: "deck",
                        slideIndex: 0,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.45)] hover:scale-[1.02] active:scale-[0.99] transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <IconPlay className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Slide Deck</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({
                        deck: featuredDeck,
                        mode: "gamma",
                        slideIndex: 0,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-semibold bg-slate-900/90 border border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-white transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <IconScroll className="w-4 h-4 text-cyan-400" />
                    <span>Continuous Reading Mode</span>
                  </button>

                  <Link
                    href={`/presentations/${featuredDeck.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-3 rounded-xl sm:rounded-2xl text-xs font-mono bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    title="Open dedicated presentation permalink"
                  >
                    <IconLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>Permalink</span>
                  </Link>
                </div>
              </div>

              {/* Right Milestone Collage: Interactive Slide Portal */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-3.5">
                {[
                  { id: 1, act: "Act I", tag: "The Mystery" },
                  { id: 4, act: "Act II", tag: "The Shells" },
                  { id: 10, act: "Act III", tag: "Thermodynamics" },
                  { id: 17, act: "Act V", tag: "Redshift" },
                ].map(({ id: slideNum, act, tag }) => {
                  const slideObj = featuredDeck.slides.find(
                    (s) => s.id === slideNum
                  );
                  const media = SLIDE_MEDIA_MAP[slideNum];
                  if (!slideObj) return null;
                  return (
                    <button
                      key={slideNum}
                      type="button"
                      onClick={() =>
                        setActiveLaunch({
                          deck: featuredDeck,
                          mode: "deck",
                          slideIndex: slideNum - 1,
                        })
                      }
                      className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      title={`Jump directly to Slide ${slideNum}: ${slideObj.title}`}
                    >
                      <img
                        src={media?.primaryImage}
                        alt={slideObj.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/night-sky-dark/images (9).jpg";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-1.5">
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-mono text-cyan-300 font-bold tracking-wider">
                            S{String(slideNum).padStart(2, "0")} · {act}
                          </div>
                          <div className="text-xs font-display font-bold text-white truncate group-hover:text-cyan-200 transition">
                            {slideObj.title}
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 shadow-[0_0_10px_#22d3ee] scale-90 group-hover:scale-100">
                          <IconPlay className="w-2.5 h-2.5 translate-x-0.5 fill-current" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Observatory Capabilities Architecture Strip */}
        <section
          aria-label="Platform Architecture Capabilities"
          className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4"
        >
          <div className="rounded-2xl border border-slate-800/80 bg-[#060919]/75 backdrop-blur-xl p-4 sm:p-5 flex items-start gap-3.5 group hover:border-cyan-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.35)] transition">
              <IconTopology className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-display text-sm font-bold text-white">
                Dual Presentation Topology
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Effortlessly toggle between a full-screen cinema slide deck (100dvh) and a vertical continuous reading document (Gamma mode).
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-[#060919]/75 backdrop-blur-xl p-4 sm:p-5 flex items-start gap-3.5 group hover:border-indigo-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 group-hover:shadow-[0_0_15px_rgba(129,140,248,0.35)] transition">
              <IconMedia className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-display text-sm font-bold text-white">
                Deep-Space Media &amp; Audio
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Authentic NASA &amp; ESA astrophotography, 4K looped cosmic video backgrounds, and ambient Interstellar soundtrack with volume control.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-[#060919]/75 backdrop-blur-xl p-4 sm:p-5 flex items-start gap-3.5 group hover:border-amber-500/40 transition duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.35)] transition">
              <IconInteract className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 className="font-display text-sm font-bold text-white">
                Interactive Celestial Models
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manipulate real-time SVG geometric shell layers, light ray-tracing simulations, and expanding universe redshift horizons.
              </p>
            </div>
          </div>
        </section>

        {/* Catalog Section Header & Filter Controls */}
        <section aria-labelledby="catalog-heading" className="space-y-5">
          {/* Mobile Search Bar (visible strictly on screens < 768px) */}
          <div className="md:hidden">
            <div className="relative flex items-center">
              <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
                <IconSearch className="w-4 h-4" />
              </div>
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={searchQuery}
                maxLength={120}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, paradoxes, acts..."
                aria-label="Search presentation topics"
                className="w-full rounded-xl bg-slate-900/90 border border-slate-800 pl-10 pr-10 py-2.5 text-base sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                >
                  <IconClose className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <h2
                id="catalog-heading"
                className="font-display text-xl sm:text-2xl font-bold text-white"
              >
                Observatory Catalog
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Select an exhibit to present live, jump into an act, or explore continuous reading mode.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => {
                const count =
                  cat === "All"
                    ? PRESENTATIONS.length
                    : PRESENTATIONS.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      selectedCategory === cat
                        ? "bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                        : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedCategory === cat
                          ? "bg-slate-950 text-cyan-300 font-bold"
                          : "bg-slate-950 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Empty Search Recovery State with Radar Telemetry & Suggestion Pills */}
          {filteredDecks.length === 0 && (
            <div className="rounded-3xl border border-slate-800 bg-[#060918]/85 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <IconRadar className="w-8 h-8 text-cyan-400 animate-spin-slow" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Coordinates Not Found in Observable Space
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                No exhibits matched &ldquo;<span className="text-cyan-300 font-mono">{searchQuery}</span>&rdquo;. Try searching for one of the cosmic queries below:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {["Olbers' Paradox", "Cosmology", "Big Bang", "Infinity"].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                        setSelectedCategory("All");
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-cyan-300 hover:border-cyan-400 transition cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.35)]"
              >
                <IconReset className="w-3.5 h-3.5" />
                <span>Reset Search Filter</span>
              </button>
            </div>
          )}

          {/* Presentations Catalog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDecks.map((deck) => (
              <div
                key={deck.slug}
                className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#060918]/92 hover:border-cyan-500/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Image Header with Hover Play Halo */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({ deck, mode: "deck", slideIndex: 0 })
                    }
                    className="relative h-48 sm:h-52 w-full overflow-hidden text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label={`Start presentation: ${deck.title}`}
                  >
                    <img
                      src={deck.coverImage}
                      alt={deck.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/night-sky-dark/images (9).jpg";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060918] via-[#060918]/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono bg-slate-950/85 border border-cyan-500/40 text-cyan-300 backdrop-blur-md whitespace-nowrap">
                        {deck.category}
                      </span>
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-slate-950/85 border border-slate-700 text-amber-300 backdrop-blur-md whitespace-nowrap">
                        {deck.slideCount} Slides · ~{deck.estimatedMinutes} min
                      </span>
                    </div>

                    {/* Center Hover Play Aura */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_#22d3ee] scale-90 group-hover:scale-100 transition-transform duration-300">
                        <IconPlay className="w-5 h-5 translate-x-0.5 fill-current" />
                      </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-3 left-4 right-4 sm:left-5 sm:right-5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                        {deck.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-cyan-200/90 font-medium line-clamp-1 mt-0.5">
                        {deck.subtitle}
                      </p>
                    </div>
                  </button>

                  {/* Deck Description & Act Quick-Jump Grid */}
                  <div className="p-4 sm:p-5 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {deck.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {deck.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 whitespace-nowrap"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Jump to Specific Act with Spectral Role Color Harmony */}
                    <div className="pt-2.5 border-t border-slate-800/80">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Jump to Act:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {deck.acts.map((act) => {
                          const spectral =
                            ACT_SPECTRAL_STYLES[act.number] ||
                            ACT_SPECTRAL_STYLES[1];
                          return (
                            <button
                              key={act.number}
                              type="button"
                              onClick={() =>
                                setActiveLaunch({
                                  deck,
                                  mode: "deck",
                                  slideIndex: act.slides[0] - 1,
                                })
                              }
                              className={`text-left px-3 py-2 rounded-xl border ${spectral.border} ${spectral.bg} text-xs font-mono text-slate-200 flex items-center justify-between transition cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400`}
                              title={`Jump directly to ${act.title}`}
                            >
                              <span className="truncate mr-2">{act.title}</span>
                              <span
                                className={`text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded border ${spectral.badge}`}
                              >
                                S{String(act.slides[0]).padStart(2, "0")}–
                                {String(
                                  act.slides[act.slides.length - 1]
                                ).padStart(2, "0")}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions with Direct Link Copy Toast */}
                <div className="p-3 sm:p-4 bg-slate-950/70 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({ deck, mode: "deck", slideIndex: 0 })
                    }
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-center transition cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <IconPlay className="w-3.5 h-3.5 fill-current" />
                    <span>Start Presentation (Slide Deck)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({ deck, mode: "gamma", slideIndex: 0 })
                    }
                    className="py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-mono bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-400 text-center transition cursor-pointer flex items-center justify-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <IconScroll className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Continuous Read ({deck.slideCount} Cards)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyShareLink(deck)}
                    className="py-2.5 px-3 rounded-xl text-xs font-mono bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    title="Copy direct presentation link"
                  >
                    {copiedSlug === deck.slug ? (
                      <>
                        <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <IconLink className="w-3.5 h-3.5" />
                        <span className="sm:hidden">Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}

            {/* Upcoming Cosmic Explorations Teaser Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-800/90 bg-[#060918]/65 p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-lg group hover:border-cyan-500/30 transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    <IconRadioDish className="w-3 h-3 text-cyan-400" />
                    <span>Upcoming Expedition</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                    In Research &amp; Blueprint
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-cyan-200 transition">
                  The Fermi Paradox &amp; The Great Silence
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  With billions of Earth-like planets across our Milky Way, where are all the extraterrestrial civilizations? An upcoming deep-space visual journey investigating planetary evolution, cosmic filters, and Dyson spheres.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["FermiParadox", "DrakeEquation", "DysonSpheres"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800/80 text-slate-400"
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono">
                <span className="text-slate-400 whitespace-nowrap">
                  Release: Late 2026
                </span>
                <span className="text-cyan-400 whitespace-nowrap font-medium flex items-center gap-1">
                  <span>Concept Blueprint Ready</span>
                  <span className="text-cyan-400">→</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Observatory Deep-Space Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#03050c]/95 backdrop-blur-md mt-12 py-8 sm:py-10">
        <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Observatory Coordinates */}
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
              <IconAperture className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <span>THE DEEP-SPACE PLANETARIUM</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.2 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Astronomy &amp; Cosmology web presentation catalog · Built with Next.js &amp; Tailwind CSS
              </p>
            </div>
          </div>

          {/* Keyboard Shortcut Hint Capsule */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400 shadow-inner">
            <span className="text-cyan-400 font-bold">HOTKEYS:</span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                ←
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                →
              </kbd>{" "}
              Navigate
            </span>
            <span className="text-slate-600">·</span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                F
              </kbd>{" "}
              Fullscreen
            </span>
            <span className="text-slate-600">·</span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                G
              </kbd>{" "}
              Dual Mode
            </span>
            <span className="text-slate-600">·</span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                /
              </kbd>{" "}
              Search
            </span>
          </div>

          {/* Attribution Citations & GitHub Repository Link */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3.5 sm:gap-4 text-xs font-mono text-slate-400">
            <span className="text-[11px]">
              Imagery: NASA / ESA / Hubble Heritage
            </span>
            <a
              href="https://github.com/tnh4522/my-presentation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition duration-200"
              aria-label="View source repository on GitHub"
            >
              <IconGitHub className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
