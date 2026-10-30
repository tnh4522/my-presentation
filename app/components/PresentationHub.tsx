"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRESENTATIONS, PresentationDeck } from "../data/presentations";
import { SLIDE_MEDIA_MAP } from "./SlideVisuals";
import { StarfieldCanvas } from "./StarfieldCanvas";
import { PresentationApp } from "./PresentationApp";

export function PresentationHub() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLaunch, setActiveLaunch] = useState<{
    deck: PresentationDeck;
    mode: "deck" | "gamma";
    slideIndex: number;
  } | null>(null);

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

  return (
    <div className="relative min-h-screen flex flex-col bg-[#03050c] text-slate-100">
      <StarfieldCanvas />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#03050c]/85 backdrop-blur-md">
        <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold text-sm sm:text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] shrink-0">
              ✦
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-sm sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
                  my-presentation
                </h1>
                <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shrink-0">
                  Slide Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block truncate">
                Personal Interactive Web Presentations &amp; Speaker Decks
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search presentation topics, keywords..."
                aria-label="Search presentation topics"
                className="w-full rounded-xl bg-slate-900/90 border border-slate-800 px-4 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Stats Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300 whitespace-nowrap">
              <span className="text-cyan-400 font-bold">
                {PRESENTATIONS.length}
              </span>{" "}
              Topic{PRESENTATIONS.length > 1 ? "s" : ""} ·{" "}
              <span className="text-amber-300 font-bold">
                {PRESENTATIONS.reduce((acc, p) => acc + p.slideCount, 0)}
              </span>{" "}
              Slides
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 py-5 sm:py-8 space-y-6 sm:space-y-10">
        {/* Featured Presentation Hero Banner */}
        {featuredDeck && (
          <section className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/35 bg-[#060a1c]/90 overflow-hidden shadow-[0_25px_80px_-20px_rgba(34,211,238,0.25)]">
            <img
              src={featuredDeck.coverImage}
              alt={featuredDeck.title}
              className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714]/90 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 p-4 sm:p-8 lg:p-10 items-center">
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-cyan-400 text-slate-950 whitespace-nowrap">
                    ★ FEATURED
                  </span>
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono bg-slate-900/90 border border-cyan-500/40 text-cyan-300 whitespace-nowrap">
                    {featuredDeck.category}
                  </span>
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono bg-slate-900/90 border border-slate-700 text-amber-300 whitespace-nowrap">
                    {featuredDeck.slideCount} Slides · ~{featuredDeck.estimatedMinutes} min
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                    {featuredDeck.title}
                  </h2>
                  <p className="text-sm sm:text-lg lg:text-xl text-cyan-300 font-medium mt-1">
                    {featuredDeck.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {featuredDeck.description}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({
                        deck: featuredDeck,
                        mode: "deck",
                        slideIndex: 0,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.5)] transition cursor-pointer"
                  >
                    <span>▶ Present Now (Slide Deck)</span>
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
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-mono font-semibold bg-slate-900/90 border border-slate-700 text-slate-200 hover:border-cyan-400 transition cursor-pointer"
                  >
                    <span>📜 Continuous Reading Mode</span>
                  </button>

                  <Link
                    href={`/presentations/${featuredDeck.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs font-mono bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition"
                    title="Open dedicated presentation URL"
                  >
                    <span>🔗 Direct URL</span>
                  </Link>
                </div>
              </div>

              {/* Right Preview Collage of Slide Thumbnails */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3">
                {[1, 4, 10, 17].map((slideNum) => {
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
                      className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden border border-slate-700/80 hover:border-cyan-400 transition text-left cursor-pointer shadow-lg"
                    >
                      <img
                        src={media?.primaryImage}
                        alt={slideObj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <div className="text-[10px] font-mono text-cyan-300 font-bold">
                          SLIDE {String(slideNum).padStart(2, "0")}
                        </div>
                        <div className="text-xs font-display font-bold text-white truncate">
                          {slideObj.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Section Header + Category Filter */}
        {/* Section Header + Category Filter */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="font-display text-lg sm:text-2xl font-bold text-white">
                My Presentations
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Click any topic or act below to launch the presentation.
              </p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono transition cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? "bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                      : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Empty Search Recovery State */}
          {filteredDecks.length === 0 && (
            <div className="rounded-3xl border border-slate-800 bg-[#060918]/80 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl text-cyan-400 mx-auto">
                🔍
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                No matching cosmic presentations found
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                We couldn&apos;t find any topics matching &ldquo;<span className="text-cyan-300 font-mono">{searchQuery}</span>&rdquo;. Try searching for &ldquo;paradox&rdquo;, &ldquo;cosmology&rdquo;, or clear the search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition cursor-pointer"
              >
                Reset Search Filter
              </button>
            </div>
          )}

          {/* Presentations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDecks.map((deck) => (
              <div
                key={deck.slug}
                className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-[#060918]/90 hover:border-cyan-500/50 transition-all overflow-hidden flex flex-col justify-between shadow-xl group"
              >
                <div>
                  {/* Cover Image Header */}
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060918] via-[#060918]/30 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 sm:top-3.5 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono bg-slate-950/85 border border-cyan-500/40 text-cyan-300 backdrop-blur-md whitespace-nowrap">
                        {deck.category}
                      </span>
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-slate-950/85 border border-slate-700 text-amber-300 backdrop-blur-md whitespace-nowrap">
                        {deck.slideCount} Slides · ~{deck.estimatedMinutes} min
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 sm:left-5 sm:right-5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                        {deck.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-cyan-200/90 font-medium line-clamp-1 mt-0.5">
                        {deck.subtitle}
                      </p>
                    </div>
                  </button>

                  {/* Deck Details & Act Quick-Jump Buttons */}
                  <div className="p-4 sm:p-5 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {deck.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {deck.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Jump to Specific Act */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Jump to Act:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {deck.acts.map((act) => (
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
                            className="text-left px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 text-xs font-mono text-slate-200 flex items-center justify-between transition cursor-pointer"
                          >
                            <span className="truncate">{act.title}</span>
                            <span className="text-[10px] text-cyan-400 shrink-0 ml-2">
                              S{act.slides[0]}–{act.slides[act.slides.length - 1]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-3 sm:p-4 bg-slate-950/70 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({ deck, mode: "deck", slideIndex: 0 })
                    }
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-center transition cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-1.5"
                  >
                    <span>▶</span>
                    <span>Start Presentation (Slide Deck)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({ deck, mode: "gamma", slideIndex: 0 })
                    }
                    className="py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-mono bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-400 text-center transition cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>📜</span>
                    <span>Continuous Read ({deck.slideCount} Cards)</span>
                  </button>
                </div>
              </div>
            ))}

              {/* Upcoming Cosmic Explorations Teaser */}
              <div className="rounded-3xl border border-slate-800/90 bg-[#060918]/60 p-6 flex flex-col justify-between space-y-4 min-h-[340px]">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      ✦ Upcoming Expeditions
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      In Research
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    The Fermi Paradox &amp; The Great Silence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    With billions of Earth-like planets in our galaxy, where are all the extraterrestrial civilizations? An upcoming deep-space visual journey investigating planetary evolution, cosmic filters, and Dyson spheres.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Expected Release: Late 2026
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    Act Outline Ready ▹
                  </span>
                </div>
              </div>
          </div>
        </section>
      </main>
    </div>
  );
}
