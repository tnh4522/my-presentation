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
        <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-[0_0_25px_rgba(34,211,238,0.45)]">
              ✦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
                  my-presentation
                </h1>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Slide Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
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
                className="w-full rounded-xl bg-slate-900/90 border border-slate-800 px-4 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Stats Pill */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
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

      <main className="relative z-10 flex-1 w-full max-w-[1760px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-8 space-y-10">
        {/* Featured Presentation Hero Banner */}
        {featuredDeck && (
          <section className="relative rounded-3xl border border-cyan-500/35 bg-[#060a1c]/90 overflow-hidden shadow-[0_25px_80px_-20px_rgba(34,211,238,0.25)]">
            <img
              src={featuredDeck.coverImage}
              alt={featuredDeck.title}
              className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714]/90 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-400 text-slate-950">
                    ★ FEATURED PRESENTATION
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900/90 border border-cyan-500/40 text-cyan-300">
                    {featuredDeck.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900/90 border border-slate-700 text-amber-300">
                    {featuredDeck.slideCount} Slides · ~{featuredDeck.estimatedMinutes} min
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                    {featuredDeck.title}
                  </h2>
                  <p className="text-base sm:text-xl text-cyan-300 font-medium mt-1.5">
                    {featuredDeck.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  {featuredDeck.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({
                        deck: featuredDeck,
                        mode: "deck",
                        slideIndex: 0,
                      })
                    }
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.5)] transition cursor-pointer"
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
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-mono font-semibold bg-slate-900/90 border border-slate-700 text-slate-200 hover:border-cyan-400 transition cursor-pointer"
                  >
                    <span>📜 Scroll Mode (All 20 Cards)</span>
                  </button>

                  <Link
                    href={`/presentations/${featuredDeck.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-2xl text-xs font-mono bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition"
                    title="Open dedicated presentation URL"
                  >
                    <span>🔗 Direct URL</span>
                  </Link>
                </div>
              </div>

              {/* Right Preview Collage of Slide Thumbnails */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
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
        <section className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                My Presentations
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Click any topic or act below to launch the presentation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-cyan-400 text-slate-950 font-bold"
                      : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Presentations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDecks.map((deck) => (
              <div
                key={deck.slug}
                className="rounded-3xl border border-slate-800 bg-[#060918]/90 hover:border-cyan-500/50 transition-all overflow-hidden flex flex-col justify-between shadow-xl group"
              >
                <div>
                  {/* Cover Image Header */}
                  <div
                    onClick={() =>
                      setActiveLaunch({ deck, mode: "deck", slideIndex: 0 })
                    }
                    className="relative h-52 w-full overflow-hidden cursor-pointer"
                  >
                    <img
                      src={deck.coverImage}
                      alt={deck.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060918] via-[#060918]/30 to-transparent" />

                    <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-950/85 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                        {deck.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-950/85 border border-slate-700 text-amber-300 backdrop-blur-md">
                        {deck.slideCount} Slides · ~{deck.estimatedMinutes} min
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-5 right-5">
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-cyan-300 transition">
                        {deck.title}
                      </h3>
                      <p className="text-sm text-cyan-200/90 font-medium">
                        {deck.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Deck Details & Act Quick-Jump Buttons */}
                  <div className="p-5 space-y-4">
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
                <div className="px-5 py-4 bg-slate-950/70 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({ deck, mode: "deck", slideIndex: 0 })
                    }
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-center transition cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  >
                    ▶ Start Presentation (Slide Deck)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveLaunch({ deck, mode: "gamma", slideIndex: 0 })
                    }
                    className="py-2.5 px-3.5 rounded-xl text-xs font-mono bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-400 transition cursor-pointer"
                  >
                    📜 20 Cards
                  </button>
                </div>
              </div>
            ))}

            {/* Placeholder Card for Future Presentations */}
            <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950/40 p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[340px]">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl text-cyan-400">
                ＋
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                Next Presentation Topic
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                The <code className="text-cyan-300">my-presentation</code> platform is
                built to be easily extensible. Register new decks in{" "}
                <code className="text-cyan-300">app/data/presentations.ts</code>,
                and they will automatically appear here!
              </p>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full">
                Ready for new topics · /presentations/[slug]
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
