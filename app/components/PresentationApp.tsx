"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { SLIDES, ACTS, SlideData, SlideAccent } from "../data/slides";
import { PresentationDeck } from "../data/presentations";
import { SlideVisual, SLIDE_MEDIA_MAP } from "./SlideVisuals";
import { StarfieldCanvas } from "./StarfieldCanvas";

const ACCENT_STYLES: Record<
  SlideAccent,
  {
    border: string;
    glow: string;
    badge: string;
    numberText: string;
    bulletDot: string;
    highlightBox: string;
    statBorder: string;
  }
> = {
  cyan: {
    border: "border-cyan-500/30",
    glow: "from-cyan-500/15 via-sky-500/5 to-transparent",
    badge: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
    numberText: "text-cyan-400",
    bulletDot: "bg-cyan-400 shadow-[0_0_10px_#22d3ee]",
    highlightBox: "bg-cyan-950/45 border-cyan-400/50 text-cyan-100",
    statBorder: "border-cyan-500/30 bg-cyan-950/25",
  },
  indigo: {
    border: "border-indigo-500/30",
    glow: "from-indigo-500/15 via-blue-500/5 to-transparent",
    badge: "bg-indigo-950/80 text-indigo-300 border-indigo-500/40",
    numberText: "text-indigo-400",
    bulletDot: "bg-indigo-400 shadow-[0_0_10px_#818cf8]",
    highlightBox: "bg-indigo-950/45 border-indigo-400/50 text-indigo-100",
    statBorder: "border-indigo-500/30 bg-indigo-950/25",
  },
  amber: {
    border: "border-amber-500/30",
    glow: "from-amber-500/15 via-orange-500/5 to-transparent",
    badge: "bg-amber-950/80 text-amber-300 border-amber-500/40",
    numberText: "text-amber-400",
    bulletDot: "bg-amber-400 shadow-[0_0_10px_#fbbf24]",
    highlightBox: "bg-amber-950/45 border-amber-400/50 text-amber-100",
    statBorder: "border-amber-500/30 bg-amber-950/25",
  },
  emerald: {
    border: "border-emerald-500/30",
    glow: "from-emerald-500/15 via-teal-500/5 to-transparent",
    badge: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
    numberText: "text-emerald-400",
    bulletDot: "bg-emerald-400 shadow-[0_0_10px_#34d399]",
    highlightBox: "bg-emerald-950/45 border-emerald-400/50 text-emerald-100",
    statBorder: "border-emerald-500/30 bg-emerald-950/25",
  },
  gold: {
    border: "border-yellow-400/35",
    glow: "from-yellow-400/15 via-amber-500/5 to-transparent",
    badge: "bg-yellow-950/80 text-yellow-200 border-yellow-400/40",
    numberText: "text-yellow-300",
    bulletDot: "bg-yellow-300 shadow-[0_0_10px_#fde047]",
    highlightBox: "bg-yellow-950/45 border-yellow-400/50 text-yellow-100",
    statBorder: "border-yellow-400/30 bg-yellow-950/25",
  },
  violet: {
    border: "border-violet-500/30",
    glow: "from-violet-500/15 via-purple-500/5 to-transparent",
    badge: "bg-violet-950/80 text-violet-300 border-violet-500/40",
    numberText: "text-violet-400",
    bulletDot: "bg-violet-400 shadow-[0_0_10px_#a78bfa]",
    highlightBox: "bg-violet-950/45 border-violet-400/50 text-violet-100",
    statBorder: "border-violet-500/30 bg-violet-950/25",
  },
  rose: {
    border: "border-rose-500/35",
    glow: "from-rose-500/15 via-pink-500/5 to-transparent",
    badge: "bg-rose-950/80 text-rose-300 border-rose-500/40",
    numberText: "text-rose-400",
    bulletDot: "bg-rose-400 shadow-[0_0_10px_#fb7185]",
    highlightBox: "bg-rose-950/45 border-rose-400/50 text-rose-100",
    statBorder: "border-rose-500/30 bg-rose-950/25",
  },
};

const BACKGROUND_MUSIC_URL =
  "/sound-background/night-sky-dark/Hans Zimmer - Interstellar - Main Theme (Piano Version) + Sheet Music - YouTube.mp3";

const COSMIC_VIDEOS = [
  {
    id: "interstellar",
    name: "Interstellar Theme",
    path: "/videos/night-sky-dark/interstellar.mp4",
  },
  {
    id: "nebula-1",
    name: "Cosmic Nebula",
    path: "/videos/night-sky-dark/141447-777657278_medium.mp4",
  },
  {
    id: "nebula-2",
    name: "Star Cluster",
    path: "/videos/night-sky-dark/141454-777657300_medium.mp4",
  },
  {
    id: "deep-space",
    name: "Deep Space Stars",
    path: "/videos/night-sky-dark/169951-842348732_medium.mp4",
  },
  {
    id: "galaxy",
    name: "Spinning Galaxy",
    path: "/videos/night-sky-dark/18492-292594998_medium.mp4",
  },
  {
    id: "horizon-1",
    name: "Cosmic Horizon",
    path: "/videos/night-sky-dark/215695_medium.mp4",
  },
  {
    id: "horizon-2",
    name: "Infinite Starlight",
    path: "/videos/night-sky-dark/215762_medium.mp4",
  },
];

interface PresentationAppProps {
  deck?: PresentationDeck;
  initialMode?: "deck" | "gamma";
  initialSlideIndex?: number;
  onBackToHub?: () => void;
}

export function PresentationApp({
  deck,
  initialMode = "deck",
  initialSlideIndex = 0,
  onBackToHub,
}: PresentationAppProps) {
  const slides = deck?.slides ?? SLIDES;
  const acts = deck?.acts ?? ACTS;
  const deckTitle = deck?.title ?? "Why Is the Night Sky Dark?";

  const [currentIndex, setCurrentIndex] = useState<number>(initialSlideIndex);
  const [viewMode, setViewMode] = useState<"deck" | "gamma">(initialMode);
  const [showOverview, setShowOverview] = useState<boolean>(false);
  const [overviewActFilter, setOverviewActFilter] = useState<number | "all">("all");
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>(
    "/videos/night-sky-dark/interstellar.mp4"
  );
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [largeTeleprompter, setLargeTeleprompter] = useState<boolean>(false);
  const [speakingSlideId, setSpeakingSlideId] = useState<number | null>(null);
  const [autoPlayDeck, setAutoPlayDeck] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Background Piano Music (Interstellar Main Theme - Piano Version)
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [bgmVolume, setBgmVolume] = useState<number>(0.07); // Soft 7% background volume

  // Mobile swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Reset scroll on mobile when changing slides
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    audio.volume = bgmVolume;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsBgmPlaying(true);
        })
        .catch(() => {
          // Browser autoplay policy: start on first user interaction gesture
          setIsBgmPlaying(false);
          const handleFirstGesture = () => {
            if (bgAudioRef.current) {
              bgAudioRef.current.volume = bgmVolume;
              bgAudioRef.current
                .play()
                .then(() => setIsBgmPlaying(true))
                .catch(() => {});
            }
            window.removeEventListener("pointerdown", handleFirstGesture);
            window.removeEventListener("keydown", handleFirstGesture);
          };
          window.addEventListener("pointerdown", handleFirstGesture, { once: true });
          window.addEventListener("keydown", handleFirstGesture, { once: true });
        });
    }
  }, [bgmVolume]);

  const toggleBgm = useCallback(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = bgmVolume;
      audio
        .play()
        .then(() => setIsBgmPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setIsBgmPlaying(false);
    }
  }, [bgmVolume]);

  const currentSlide = slides[currentIndex] ?? slides[0];

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingSlideId(null);
  }, []);

  const handleExitToHub = useCallback(() => {
    stopSpeech();
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
    }
    onBackToHub?.();
  }, [stopSpeech, onBackToHub]);

  const speakSlide = useCallback(
    (slide: SlideData, autoAdvance = false) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }
      window.speechSynthesis.cancel();

      if (speakingSlideId === slide.id && !autoAdvance) {
        setSpeakingSlideId(null);
        setAutoPlayDeck(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(slide.voiceover);
      utterance.lang = "en-US";
      utterance.rate = 0.96;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setSpeakingSlideId(slide.id);
      };

      utterance.onend = () => {
        setSpeakingSlideId(null);
        if (autoAdvance && slide.id < slides.length) {
          const nextIdx = slide.id;
          setCurrentIndex(nextIdx);
          setTimeout(() => {
            speakSlide(slides[nextIdx], true);
          }, 550);
        } else {
          setAutoPlayDeck(false);
        }
      };

      utterance.onerror = () => {
        setSpeakingSlideId(null);
        setAutoPlayDeck(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [speakingSlideId, slides]
  );

  const goNext = useCallback(() => {
    stopSpeech();
    setAutoPlayDeck(false);
    setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [stopSpeech, slides.length]);

  const goPrev = useCallback(() => {
    stopSpeech();
    setAutoPlayDeck(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, [stopSpeech]);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        if (viewMode === "deck" && !showOverview && !showVideoModal) {
          e.preventDefault();
          goNext();
        }
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        if (viewMode === "deck" && !showOverview && !showVideoModal) {
          e.preventDefault();
          goPrev();
        }
      } else if (e.key === "Home") {
        if (viewMode === "deck") {
          e.preventDefault();
          stopSpeech();
          setCurrentIndex(0);
        }
      } else if (e.key === "End") {
        if (viewMode === "deck") {
          e.preventDefault();
          stopSpeech();
          setCurrentIndex(slides.length - 1);
        }
      } else if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        setShowOverview((prev) => !prev);
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === "v" || e.key === "V") {
        e.preventDefault();
        speakSlide(currentSlide, false);
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setViewMode((prev) => (prev === "deck" ? "gamma" : "deck"));
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "Escape") {
        setShowOverview(false);
        setShowVideoModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    viewMode,
    showOverview,
    showVideoModal,
    goNext,
    goPrev,
    stopSpeech,
    speakSlide,
    currentSlide,
    slides.length,
    toggleFullscreen,
  ]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyVoiceover = (slide: SlideData) => {
    navigator.clipboard?.writeText(slide.voiceover);
    setCopiedId(slide.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const renderSlideCard = (slide: SlideData, isScrollMode = false) => {
    const style = ACCENT_STYLES[slide.accent];
    const wordCount = slide.voiceover.split(/\s+/).length;
    const estSeconds = Math.max(10, Math.round((wordCount / 130) * 60));
    const isSpeakingThis = speakingSlideId === slide.id;
    const mediaInfo = SLIDE_MEDIA_MAP[slide.id] || SLIDE_MEDIA_MAP[1];

    const isDenseSlide =
      slide.bullets.length >= 4 ||
      slide.bullets.some((b) => b.subItems && b.subItems.length > 0);

    return (
      <article
        key={slide.id}
        id={`slide-card-${slide.id}`}
        className={`relative w-full ${
          isScrollMode
            ? "rounded-2xl sm:rounded-3xl min-h-[82vh] flex flex-col justify-between"
            : "flex-1 lg:min-h-0 flex flex-col justify-between rounded-2xl sm:rounded-3xl"
        } border ${style.border} bg-[#060919]/92 backdrop-blur-xl shadow-[0_20px_70px_-20px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300`}
      >
        <img
          src={mediaInfo.primaryImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.07] blur-2xl scale-110"
        />

        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow}`}
        />

        <div className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-7 py-2 sm:py-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span
              className={`font-mono text-xs sm:text-sm font-bold tracking-wider ${style.numberText} bg-slate-950/90 border border-slate-800 px-2 sm:px-2.5 py-0.5 rounded-lg`}
            >
              SLIDE {String(slide.id).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 hidden sm:inline">
              {slide.act}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${style.badge}`}
            >
              {slide.tag}
            </span>
          </div>
        </div>

        <div
          className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 xl:gap-8 px-3.5 sm:px-7 ${
            isScrollMode
              ? "py-5 sm:py-6 flex-1 items-stretch"
              : "py-3 sm:py-3.5 flex-1 lg:min-h-0 lg:items-stretch lg:overflow-hidden"
          }`}
        >
          <div
            className={`lg:col-span-5 xl:col-span-5 flex flex-col justify-between ${
              isScrollMode
                ? "space-y-4 sm:space-y-5"
                : "space-y-3 lg:space-y-0 lg:min-h-0 lg:overflow-y-auto lg:pr-1 lg:gap-2"
            }`}
          >
            <div className={isDenseSlide ? "space-y-2" : "space-y-3"}>
              <div>
                <h2
                  className={`font-display font-bold tracking-tight text-white leading-tight ${
                    isDenseSlide
                      ? "text-xl sm:text-2xl xl:text-3xl"
                      : "text-2xl sm:text-3xl xl:text-4xl"
                  }`}
                >
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p
                    className={`mt-1 text-sm sm:text-base font-medium ${style.numberText}`}
                  >
                    {slide.subtitle}
                  </p>
                )}
              </div>

              <ul className={isDenseSlide ? "space-y-1.5" : "space-y-2.5"}>
                {slide.bullets.map((b, idx) => (
                  <li
                    key={idx}
                    className={`rounded-xl transition-all ${
                      isDenseSlide ? "px-3 py-1.5" : "px-3.5 py-2.5"
                    } ${
                      b.highlight
                        ? `border ${style.highlightBox} shadow-md`
                        : "bg-slate-900/60 border border-slate-800/80"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${style.bulletDot}`}
                      />
                      <div
                        className={`leading-snug ${
                          isDenseSlide
                            ? "text-xs sm:text-sm"
                            : "text-sm sm:text-base"
                        }`}
                      >
                        <div>
                          {b.label && (
                            <span className="font-bold text-white mr-1.5">
                              {b.label}
                            </span>
                          )}
                          <span
                            className={
                              b.highlight
                                ? "font-semibold text-white"
                                : "text-slate-200"
                            }
                          >
                            {b.text}
                          </span>
                        </div>

                        {b.subItems && b.subItems.length > 0 && (
                          <ul className="mt-1 space-y-0.5 pl-2.5 border-l-2 border-slate-700/80">
                            {b.subItems.map((sub, sIdx) => (
                              <li
                                key={sIdx}
                                className="text-xs font-mono text-slate-300 flex items-center gap-1.5"
                              >
                                <span className="text-cyan-400">▹</span>
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {slide.id === 1 && (
                <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-sm">
                  <img
                    src="/images/night-sky-dark/23825795249_3b22921aef_o.webp"
                    alt="Milky Way over clouds"
                    className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-xl border border-cyan-400/40 shadow-lg shrink-0"
                  />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                      The 100-Year Mystery
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white mt-0.5 leading-snug">
                      Billions of stars shine in space — yet the night sky above Earth remains dark.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {slide.keyStat && (
              <div
                className={`shrink-0 rounded-xl border ${
                  isDenseSlide ? "px-3 py-1.5 sm:px-3.5 sm:py-2" : "px-3.5 py-2 sm:px-4 sm:py-2.5"
                } flex items-center justify-between gap-3 ${style.statBorder}`}
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {slide.keyStat.label}
                  </div>
                  <div className="text-xs text-slate-300 truncate">
                    {slide.keyStat.sub}
                  </div>
                </div>
                <div
                  className={`font-display text-base sm:text-xl font-bold shrink-0 ${style.numberText}`}
                >
                  {slide.keyStat.value}
                </div>
              </div>
            )}
          </div>

          <div
            className={`lg:col-span-7 xl:col-span-7 flex flex-col justify-between gap-2 ${
              isScrollMode
                ? "min-h-[280px] sm:min-h-[380px]"
                : "w-full min-h-[240px] xs:min-h-[280px] sm:min-h-[340px] lg:min-h-0 lg:flex-1 lg:overflow-hidden"
            }`}
          >
            <div className="flex-1 min-h-[200px] xs:min-h-[240px] sm:min-h-[280px] lg:min-h-0 flex flex-col">
              <SlideVisual slideId={slide.id} />
            </div>

            <div className="shrink-0 flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-300 shrink-0">
                  {mediaInfo.credit}
                </span>
                <span className="truncate italic text-slate-300 text-[11px] sm:text-xs">
                  {slide.visualPrompt}
                </span>
              </div>
            </div>
          </div>
        </div>

        {(showNotes || isScrollMode) && (
          <footer className="relative z-10 shrink-0 mx-3.5 sm:mx-7 mb-3 rounded-xl border border-cyan-500/25 bg-[#030612]/95 px-3.5 sm:px-4 py-2.5 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-800/90">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  <span>🎙️</span>
                  <span>SPEAKER NOTES / VOICEOVER</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  {wordCount} words · ~{estSeconds}s
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => speakSlide(slide, false)}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium transition cursor-pointer ${
                    isSpeakingThis
                      ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                      : "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 hover:bg-cyan-500/30"
                  }`}
                >
                  <span>
                    {isSpeakingThis ? "⏹ Stop Audio" : "▶ Listen Voiceover"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setLargeTeleprompter((prev) => !prev)}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 cursor-pointer"
                  title="Toggle Teleprompter Text Size"
                >
                  {largeTeleprompter ? "Text: Large" : "Text: Normal"}
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyVoiceover(slide)}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-300 bg-slate-900 border border-slate-700 hover:border-slate-500 cursor-pointer"
                >
                  {copiedId === slide.id ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>

            <blockquote
              className={`text-slate-200 leading-snug font-normal ${
                largeTeleprompter
                  ? "text-base sm:text-lg max-h-24 overflow-y-auto"
                  : "text-xs sm:text-sm"
              }`}
            >
              &ldquo;{slide.voiceover}&rdquo;
            </blockquote>
          </footer>
        )}
      </article>
    );
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex flex-col bg-[#03050c] text-slate-100 ${
        viewMode === "deck"
          ? "min-h-dvh lg:h-dvh lg:max-h-dvh w-full overflow-x-hidden lg:overflow-hidden"
          : "min-h-screen w-full overflow-x-hidden"
      }`}
    >
      <audio
        ref={bgAudioRef}
        src={BACKGROUND_MUSIC_URL}
        loop
        preload="auto"
        onPlay={() => setIsBgmPlaying(true)}
        onPause={() => setIsBgmPlaying(false)}
      />
      <StarfieldCanvas />

      <header className="shrink-0 sticky top-0 z-30 border-b border-slate-800/80 bg-[#03050c]/85 backdrop-blur-md">
        <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 h-12 flex items-center justify-between gap-2 sm:gap-3">
          {/* Back to Hub + Presentation Title */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            {onBackToHub ? (
              <button
                type="button"
                onClick={handleExitToHub}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-cyan-300 hover:border-cyan-400 transition shrink-0 cursor-pointer"
                title="Return to My Presentations Hub"
              >
                <span>←</span>
                <span className="hidden sm:inline">All Topics</span>
              </button>
            ) : (
              <Link
                href="/"
                onClick={handleExitToHub}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-cyan-300 hover:border-cyan-400 transition shrink-0"
                title="Return to My Presentations Hub"
              >
                <span>←</span>
                <span className="hidden sm:inline">All Topics</span>
              </Link>
            )}

            <div className="flex items-center gap-1.5 truncate">
              <h1 className="font-display text-xs sm:text-sm font-bold text-white truncate max-w-[130px] xs:max-w-[180px] sm:max-w-[280px] md:max-w-none">
                {deckTitle}
              </h1>
              <span className="hidden lg:inline text-[11px] font-mono text-cyan-400">
                · {slides.length} Slides
              </span>
            </div>
          </div>

          {/* Center Act Pill / Progress */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-0.5 rounded-lg">
            {acts.map((act) => {
              const isCurrentAct = currentSlide.actNumber === act.number;
              return (
                <button
                  key={act.number}
                  type="button"
                  onClick={() => {
                    stopSpeech();
                    const targetIndex = act.slides[0] - 1;
                    setCurrentIndex(targetIndex);
                    if (viewMode === "gamma") {
                      document
                        .getElementById(`slide-card-${act.slides[0]}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition cursor-pointer ${
                    isCurrentAct
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Act {act.number}
                </button>
              );
            })}
          </div>

          {/* Right Mode & Action Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("deck")}
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition cursor-pointer ${
                  viewMode === "deck"
                    ? "bg-cyan-400 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="sm:hidden">Deck</span>
                <span className="hidden sm:inline">Slide Deck</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("gamma")}
                className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition cursor-pointer ${
                  viewMode === "gamma"
                    ? "bg-cyan-400 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="sm:hidden">All ({slides.length})</span>
                <span className="hidden sm:inline">All {slides.length} Cards</span>
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
              <button
                type="button"
                onClick={toggleBgm}
                className={`inline-flex items-center gap-1 text-[11px] font-mono transition cursor-pointer ${
                  isBgmPlaying
                    ? "text-cyan-300 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Toggle Interstellar Piano Background Music"
              >
                <span className={isBgmPlaying ? "animate-pulse" : ""}>
                  {isBgmPlaying ? "🎵" : "🔇"}
                </span>
                <span className="hidden md:inline">
                  {isBgmPlaying ? "Music: ON" : "Music: OFF"}
                </span>
              </button>

              <input
                type="range"
                min="0.01"
                max="0.25"
                step="0.01"
                value={bgmVolume}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  setBgmVolume(vol);
                  if (bgAudioRef.current) {
                    bgAudioRef.current.volume = vol;
                  }
                }}
                className="hidden sm:block w-12 sm:w-16 h-1 bg-slate-700 accent-cyan-400 rounded-lg cursor-pointer"
                title={`Background music volume: ${Math.round(bgmVolume * 100)}%`}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowVideoModal(true)}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 hover:border-indigo-400 cursor-pointer"
              title="Watch Cosmic Video"
            >
              <span>🎬 Video</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (autoPlayDeck || speakingSlideId !== null) {
                  stopSpeech();
                  setAutoPlayDeck(false);
                } else {
                  setAutoPlayDeck(true);
                  speakSlide(currentSlide, true);
                }
              }}
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono border transition cursor-pointer ${
                autoPlayDeck || speakingSlideId !== null
                  ? "bg-rose-500/20 border-rose-500 text-rose-200"
                  : "bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400/50"
              }`}
              title="Auto-narrate presentation with voiceover"
            >
              <span>
                {autoPlayDeck || speakingSlideId !== null
                  ? "⏹ Stop Voice"
                  : "🔊 Narrate"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowOverview((prev) => !prev)}
              className="px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg text-[11px] font-mono bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-400/50 cursor-pointer"
              title="Open Slide Grid (Shortcut: G)"
            >
              <span className="sm:hidden">Grid</span>
              <span className="hidden sm:inline">Grid ({slides.length})</span>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="hidden sm:inline-flex px-2 py-1 rounded-lg text-[11px] font-mono bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-400/50 cursor-pointer"
              title="Toggle Fullscreen (Shortcut: F)"
            >
              ⛶
            </button>
          </div>
        </div>

        <div className="w-full h-0.5 bg-slate-900">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          />
        </div>
      </header>

      <main
        className={`relative z-10 flex-1 w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 flex flex-col justify-between ${
          viewMode === "deck"
            ? "py-2 sm:py-3.5 gap-2 sm:gap-2.5 lg:min-h-0 lg:overflow-hidden"
            : "py-6 sm:py-8"
        }`}
      >
        {viewMode === "deck" ? (
          <>
            {renderSlideCard(currentSlide, false)}

            <div className="shrink-0 sticky bottom-2 lg:static z-20 flex items-center justify-between gap-1.5 sm:gap-3 bg-slate-950/95 border border-slate-800/90 rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-400 disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={currentIndex === slides.length - 1}
                  className="px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:opacity-35 disabled:pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.4)] cursor-pointer"
                >
                  Next →
                </button>
              </div>

              <div className="flex items-center justify-center min-w-0">
                <button
                  type="button"
                  onClick={() => setShowOverview(true)}
                  className="sm:hidden flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 hover:border-cyan-500/50 cursor-pointer"
                  title="Tap to see all slides"
                >
                  <span className="text-cyan-400 font-bold">{currentIndex + 1}</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-400">{slides.length}</span>
                  <span className="text-[10px] text-cyan-400 ml-0.5">▼</span>
                </button>

                <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
                  {slides.map((s, idx) => {
                    const active = idx === currentIndex;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          stopSpeech();
                          setCurrentIndex(idx);
                        }}
                        title={`Slide ${s.id}: ${s.title}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          active
                            ? "w-6 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                            : "w-2 bg-slate-700 hover:bg-slate-500"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowNotes((prev) => !prev)}
                  className={`px-2 sm:px-2.5 py-1.5 rounded-lg text-[11px] font-mono border transition cursor-pointer ${
                    showNotes
                      ? "bg-cyan-950/80 border-cyan-500/40 text-cyan-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                  title="Speaker notes (Shortcut: N)"
                >
                  <span className="sm:hidden">{showNotes ? "Hide 🎙️" : "Notes 🎙️"}</span>
                  <span className="hidden sm:inline">
                    {showNotes ? "Hide Notes (N)" : "Show Notes (N)"}
                  </span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8 pb-16">
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  Gamma Card Scroll Mode · All {slides.length} Slides &amp;
                  Speaker Notes
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Scroll through all {slides.length} cards continuously,
                  interact with every cosmic diagram &amp; photograph, or play
                  any card&apos;s voiceover note.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("deck")}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-cyan-400 text-slate-950 cursor-pointer"
              >
                Switch to Cinema Slide Deck
              </button>
            </div>

            {slides.map((slide) => renderSlideCard(slide, true))}
          </div>
        )}
      </main>

      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#060a18] border border-cyan-500/40 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl my-auto">
            <div className="px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-[#03050c]/90">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-base font-bold text-white">
                    🎬 Deep Space Videos · {deckTitle}
                  </h2>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {COSMIC_VIDEOS.length} Videos
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  {selectedVideoUrl}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Video Selector Tabs */}
            <div className="px-5 py-2.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
              {COSMIC_VIDEOS.map((v) => {
                const active = selectedVideoUrl === v.path;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVideoUrl(v.path)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition cursor-pointer ${
                      active
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                        : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                    }`}
                  >
                    ▶ {v.name}
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-black flex items-center justify-center">
              <video
                key={selectedVideoUrl}
                src={selectedVideoUrl}
                poster="/images/night-sky-dark/images (9).jpg"
                controls
                autoPlay
                className="max-h-[70vh] w-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {showOverview && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
          <div className="bg-[#050816] border border-cyan-500/40 rounded-3xl max-w-7xl w-full max-h-[94vh] flex flex-col overflow-hidden shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)]">
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-2.5 bg-[#03050c]/90">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-sm sm:text-lg font-bold text-white truncate">
                    All {slides.length} Slides
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    {overviewActFilter === "all"
                      ? `${slides.length} Cards`
                      : `Act ${overviewActFilter}`}
                  </span>
                </div>

                {/* Act Filter Pills */}
                <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-0.5 rounded-lg overflow-x-auto max-w-full">
                  <button
                    type="button"
                    onClick={() => setOverviewActFilter("all")}
                    className={`px-2 sm:px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-mono transition cursor-pointer shrink-0 ${
                      overviewActFilter === "all"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All ({slides.length})
                  </button>
                  {acts.map((act) => (
                    <button
                      key={act.number}
                      type="button"
                      onClick={() => setOverviewActFilter(act.number)}
                      className={`px-2 sm:px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-mono transition cursor-pointer shrink-0 ${
                        overviewActFilter === act.number
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Act {act.number}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden lg:inline text-xs font-mono text-slate-400">
                  Press ESC or G to close
                </span>
                <button
                  type="button"
                  onClick={() => setShowOverview(false)}
                  className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Modal Cards Grid: 50% Top Thumbnail, 50% Bottom Rich Slide Information */}
            <div className="p-3 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5">
              {slides
                .filter(
                  (s) =>
                    overviewActFilter === "all" ||
                    s.actNumber === overviewActFilter
                )
                .map((s) => {
                  const slideRealIndex = s.id - 1;
                  const isCurrent = slideRealIndex === currentIndex;
                  const thumb =
                    SLIDE_MEDIA_MAP[s.id]?.primaryImage ||
                    "/images/night-sky-dark/images (9).jpg";
                  const hasVideo = Boolean(SLIDE_MEDIA_MAP[s.id]?.videoUrl);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        stopSpeech();
                        setCurrentIndex(slideRealIndex);
                        setShowOverview(false);
                        if (viewMode === "gamma") {
                          setTimeout(() => {
                            document
                              .getElementById(`slide-card-${s.id}`)
                              ?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }
                      }}
                      className={`group text-left rounded-2xl border transition-all duration-200 flex flex-col items-stretch overflow-hidden cursor-pointer shadow-xl hover:shadow-cyan-500/25 hover:-translate-y-1.5 min-h-[420px] h-[420px] ${
                        isCurrent
                          ? "bg-[#060919] border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
                          : "bg-[#060919] border-slate-800/90 hover:border-cyan-500/50"
                      }`}
                    >
                      {/* Top 50%: Slide thumbnail preview */}
                      <div className="relative w-full h-52 shrink-0 overflow-hidden bg-slate-950">
                        <img
                          src={thumb}
                          alt={s.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/night-sky-dark/images (9).jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060919] via-transparent to-black/60 pointer-events-none" />

                        {/* Thumbnail badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono font-bold z-10">
                          <span className="bg-slate-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700/80 text-cyan-300 shadow">
                            SLIDE {String(s.id).padStart(2, "0")}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {hasVideo && (
                              <span className="bg-indigo-950/90 backdrop-blur-md px-2 py-0.5 rounded-lg border border-indigo-500/50 text-[10px] text-indigo-300 shadow flex items-center gap-1">
                                <span>🎬</span> Video
                              </span>
                            )}
                            <span className="bg-slate-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                              Act {s.actNumber}
                            </span>
                          </div>
                        </div>

                        {/* Active Badge or Topic Tag */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                          {isCurrent ? (
                            <span className="bg-cyan-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold shadow-[0_0_12px_#22d3ee]">
                              ● ACTIVE NOW
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono text-slate-300 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-800/80 truncate max-w-[85%]">
                              {s.act.split("·")[1]?.trim() || s.act}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom 50%: Full slide text & details */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3 bg-[#060919] border-t border-slate-800/70">
                        <div>
                          {/* Slide Title */}
                          <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition line-clamp-1">
                            {s.title}
                          </h3>

                          {/* Subtitle if available */}
                          {s.subtitle && (
                            <p className="text-xs font-mono text-cyan-400/90 line-clamp-1 mt-0.5">
                              {s.subtitle}
                            </p>
                          )}

                          {/* Slide Bullets / Text Information */}
                          <div className="space-y-1.5 mt-2.5">
                            {s.bullets.slice(0, 2).map((b, bIdx) => (
                              <div
                                key={bIdx}
                                className="flex items-start gap-1.5 text-xs text-slate-300 leading-relaxed"
                              >
                                <span className="text-cyan-400 shrink-0 font-bold mt-0.5">
                                  ›
                                </span>
                                <span className="line-clamp-2">
                                  {b.label && (
                                    <strong className="text-slate-100 font-semibold mr-1">
                                      {b.label}
                                    </strong>
                                  )}
                                  {b.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Footer Info: Category Tag & Key Stat / Voiceover hint */}
                        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono gap-2">
                          <span className="truncate text-cyan-400 font-medium bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                            {s.tag}
                          </span>

                          {s.keyStat ? (
                            <span
                              className="shrink-0 text-amber-300 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 text-[11px]"
                              title={s.keyStat.label}
                            >
                              {s.keyStat.value}
                            </span>
                          ) : (
                            <span className="shrink-0 text-slate-400">
                              🎙️ Note
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
