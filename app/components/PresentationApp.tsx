"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { SLIDES, ACTS, SlideData, SlideAccent } from "../data/slides";
import { PresentationDeck } from "../data/presentations";
import { SlideVisual, SLIDE_MEDIA_MAP } from "./SlideVisuals";
import { StarfieldCanvas } from "./StarfieldCanvas";
import { ThemeToggle } from "./ThemeToggle";

/* ─── Tailored Deep-Space SVG Icons (Craft Floor: No Raw Unicode / Emojis) ─── */

function IconArrowLeft({ className = "w-4 h-4" }: { className?: string }) {
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconChevronDown({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconClose({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconMic({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function IconPlay({ className = "w-3.5 h-3.5" }: { className?: string }) {
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

function IconStop({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
    </svg>
  );
}

function IconVolume({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function IconVolumeMute({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconFilm({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}

function IconFullscreen({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

function IconFullscreenExit({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M4 10h6m0 0V4m0 6L3 3m17 7h-6m0 0V4m0 6l7-7" />
    </svg>
  );
}

function IconGrid({ className = "w-4 h-4" }: { className?: string }) {
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
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function IconHelp({ className = "w-4 h-4" }: { className?: string }) {
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
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconKeyboard({ className = "w-4 h-4" }: { className?: string }) {
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
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <line x1="6" y1="8" x2="6.01" y2="8" />
      <line x1="10" y1="8" x2="10.01" y2="8" />
      <line x1="14" y1="8" x2="14.01" y2="8" />
      <line x1="18" y1="8" x2="18.01" y2="8" />
      <line x1="6" y1="12" x2="6.01" y2="12" />
      <line x1="10" y1="12" x2="10.01" y2="12" />
      <line x1="14" y1="12" x2="14.01" y2="12" />
      <line x1="18" y1="12" x2="18.01" y2="12" />
      <line x1="7" y1="16" x2="17" y2="16" />
    </svg>
  );
}

function IconDockSide({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <rect x="15" y="3" width="6" height="18" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

function IconDockBottom({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <rect x="3" y="15" width="18" height="6" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

function IconType({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );
}

function IconCopy({ className = "w-3.5 h-3.5" }: { className?: string }) {
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
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
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
    border: "border-sky-300 dark:border-cyan-500/30",
    glow: "from-sky-500/10 via-sky-500/5 to-transparent dark:from-cyan-500/15 dark:via-sky-500/5 dark:to-transparent",
    badge:
      "bg-sky-50 dark:bg-cyan-950/80 text-sky-800 dark:text-cyan-300 border-sky-300 dark:border-cyan-500/40",
    numberText: "text-sky-700 dark:text-cyan-400",
    bulletDot:
      "bg-sky-500 shadow-[0_0_8px_#0284c7] dark:bg-cyan-400 dark:shadow-[0_0_10px_#22d3ee]",
    highlightBox:
      "bg-sky-50/90 dark:bg-cyan-950/45 border-sky-300 dark:border-cyan-400/50 text-sky-950 dark:text-cyan-100",
    statBorder:
      "border-sky-200 dark:border-cyan-500/30 bg-sky-50/50 dark:bg-cyan-950/25",
  },
  indigo: {
    border: "border-indigo-200 dark:border-indigo-500/30",
    glow: "from-indigo-500/10 via-indigo-500/5 to-transparent dark:from-indigo-500/15 dark:via-blue-500/5 dark:to-transparent",
    badge:
      "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/40",
    numberText: "text-indigo-700 dark:text-indigo-400",
    bulletDot:
      "bg-indigo-500 shadow-[0_0_8px_#4f46e5] dark:bg-indigo-400 dark:shadow-[0_0_10px_#818cf8]",
    highlightBox:
      "bg-indigo-50/90 dark:bg-indigo-950/45 border-indigo-300 dark:border-indigo-400/50 text-indigo-950 dark:text-indigo-100",
    statBorder:
      "border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-950/25",
  },
  amber: {
    border: "border-amber-300 dark:border-amber-500/30",
    glow: "from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/15 dark:via-orange-500/5 dark:to-transparent",
    badge:
      "bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-500/40",
    numberText: "text-amber-800 dark:text-amber-400",
    bulletDot:
      "bg-amber-500 shadow-[0_0_8px_#d97706] dark:bg-amber-400 dark:shadow-[0_0_10px_#fbbf24]",
    highlightBox:
      "bg-amber-50/90 dark:bg-amber-950/45 border-amber-300 dark:border-amber-400/50 text-amber-950 dark:text-amber-100",
    statBorder:
      "border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/25",
  },
  emerald: {
    border: "border-emerald-200 dark:border-emerald-500/30",
    glow: "from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-500/15 dark:via-teal-500/5 dark:to-transparent",
    badge:
      "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40",
    numberText: "text-emerald-700 dark:text-emerald-400",
    bulletDot:
      "bg-emerald-500 shadow-[0_0_8px_#059669] dark:bg-emerald-400 dark:shadow-[0_0_10px_#34d399]",
    highlightBox:
      "bg-emerald-50/90 dark:bg-emerald-950/45 border-emerald-300 dark:border-emerald-400/50 text-emerald-950 dark:text-emerald-100",
    statBorder:
      "border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/25",
  },
  gold: {
    border: "border-amber-300 dark:border-yellow-400/35",
    glow: "from-amber-400/10 via-amber-400/5 to-transparent dark:from-yellow-400/15 dark:via-amber-500/5 dark:to-transparent",
    badge:
      "bg-amber-50 dark:bg-yellow-950/80 text-amber-900 dark:text-yellow-200 border-amber-300 dark:border-yellow-400/40",
    numberText: "text-amber-800 dark:text-yellow-300",
    bulletDot:
      "bg-amber-500 shadow-[0_0_8px_#d97706] dark:bg-yellow-300 dark:shadow-[0_0_10px_#fde047]",
    highlightBox:
      "bg-amber-50/90 dark:bg-yellow-950/45 border-amber-300 dark:border-yellow-400/50 text-amber-950 dark:text-yellow-100",
    statBorder:
      "border-amber-200 dark:border-yellow-400/30 bg-amber-50/50 dark:bg-yellow-950/25",
  },
  violet: {
    border: "border-purple-200 dark:border-violet-500/30",
    glow: "from-purple-500/10 via-purple-500/5 to-transparent dark:from-violet-500/15 dark:via-purple-500/5 dark:to-transparent",
    badge:
      "bg-purple-50 dark:bg-violet-950/80 text-purple-800 dark:text-violet-300 border-purple-200 dark:border-violet-500/40",
    numberText: "text-purple-700 dark:text-violet-400",
    bulletDot:
      "bg-purple-500 shadow-[0_0_8px_#7c3aed] dark:bg-violet-400 dark:shadow-[0_0_10px_#a78bfa]",
    highlightBox:
      "bg-purple-50/90 dark:bg-violet-950/45 border-purple-300 dark:border-violet-400/50 text-purple-950 dark:text-violet-100",
    statBorder:
      "border-purple-200 dark:border-violet-500/30 bg-purple-50/50 dark:bg-violet-950/25",
  },
  rose: {
    border: "border-rose-200 dark:border-rose-500/35",
    glow: "from-rose-500/10 via-rose-500/5 to-transparent dark:from-rose-500/15 dark:via-pink-500/5 dark:to-transparent",
    badge:
      "bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-500/40",
    numberText: "text-rose-700 dark:text-rose-400",
    bulletDot:
      "bg-rose-500 shadow-[0_0_8px_#e11d48] dark:bg-rose-400 dark:shadow-[0_0_10px_#fb7185]",
    highlightBox:
      "bg-rose-50/90 dark:bg-rose-950/45 border-rose-300 dark:border-rose-400/50 text-rose-950 dark:text-rose-100",
    statBorder:
      "border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/25",
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
  const [modalVideoError, setModalVideoError] = useState<boolean>(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>(
    "/videos/night-sky-dark/interstellar.mp4"
  );
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [largeTeleprompter, setLargeTeleprompter] = useState<boolean>(false);
  const [speakingSlideId, setSpeakingSlideId] = useState<number | null>(null);
  const [autoPlayDeck, setAutoPlayDeck] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // New HUD navigation & modal states
  const [showActMenu, setShowActMenu] = useState<boolean>(false);
  const [showMediaMenu, setShowMediaMenu] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [teleprompterDock, setTeleprompterDock] = useState<"bottom" | "side">("bottom");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Background Piano Music (Interstellar Main Theme - Piano Version)
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [bgmVolume, setBgmVolume] = useState<number>(0.07); // Soft 7% background volume
  const wasBgmPlayingBeforeVideo = useRef<boolean>(false);
  const speakSlideRef = useRef<((slide: SlideData, autoAdvance?: boolean) => void) | null>(null);

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

  const handleTouchCancel = () => {
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Reset scroll on mobile when changing slides
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [currentIndex]);

  // Synchronize continuous Read mode scroll depth with header telemetry and progress
  useEffect(() => {
    if (viewMode !== "gamma" || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIdAttr = entry.target.getAttribute("data-slide-id");
            if (slideIdAttr) {
              const slideNum = parseInt(slideIdAttr, 10);
              if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= slides.length) {
                setCurrentIndex(slideNum - 1);
              }
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0.15,
      }
    );

    slides.forEach((s) => {
      const el = document.getElementById(`slide-card-${s.id}`);
      if (el) {
        el.setAttribute("data-slide-id", String(s.id));
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [viewMode, slides]);

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

  // Smart Audio Ducking: lower piano volume smoothly when voiceover speaks
  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (speakingSlideId !== null) {
      audio.volume = Math.min(bgmVolume * 0.25, 0.015);
    } else {
      audio.volume = bgmVolume;
    }
  }, [speakingSlideId, bgmVolume]);

  // Video modal coordination: pause BGM when watching cosmic video, restore after
  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    if (showVideoModal) {
      wasBgmPlayingBeforeVideo.current = !audio.paused;
      if (!audio.paused) {
        audio.pause();
      }
    } else if (wasBgmPlayingBeforeVideo.current && isBgmPlaying) {
      audio.play().catch(() => {});
      wasBgmPlayingBeforeVideo.current = false;
    }
  }, [showVideoModal, isBgmPlaying]);

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
            speakSlideRef.current?.(slides[nextIdx], true);
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

  useEffect(() => {
    speakSlideRef.current = speakSlide;
  }, [speakSlide]);

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
      } else if (e.key === "?" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        setShowShortcutsModal((prev) => !prev);
      } else if (e.key === "Escape") {
        setShowOverview(false);
        setShowVideoModal(false);
        setShowShortcutsModal(false);
        setShowMediaMenu(false);
        setShowActMenu(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    viewMode,
    showOverview,
    showVideoModal,
    showShortcutsModal,
    showMediaMenu,
    showActMenu,
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
            ? "rounded-2xl sm:rounded-3xl min-h-[82vh] flex flex-col justify-between content-visibility-auto"
            : "flex-1 lg:min-h-0 flex flex-col justify-between rounded-2xl sm:rounded-3xl"
        } border ${style.border} bg-white/95 dark:bg-[#060919]/92 backdrop-blur-xl shadow-[0_15px_50px_-15px_rgba(15,23,42,0.1)] dark:shadow-[0_20px_70px_-20px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300`}
      >
        <img
          src={mediaInfo.primaryImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = "/images/night-sky-dark/images (9).jpg";
          }}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.04] dark:opacity-[0.07] blur-2xl scale-110"
        />

        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow}`}
        />

        <div className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-2.5 sm:py-3 border-b border-slate-200/90 dark:border-slate-800/80">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span
              className={`font-mono text-xs sm:text-sm font-bold tracking-wider ${style.numberText} bg-slate-100 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 px-2 sm:px-2.5 py-0.5 rounded-lg`}
            >
              SLIDE {String(slide.id).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 hidden sm:inline">
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
          className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-9 ${
            isScrollMode
              ? "py-5 sm:py-6 flex-1 items-stretch"
              : "py-4 sm:py-5 lg:py-6 flex-1 lg:min-h-0 lg:items-stretch lg:overflow-hidden"
          }`}
        >
          <div
            className={`lg:col-span-5 xl:col-span-5 flex flex-col justify-between ${
              isScrollMode
                ? "space-y-4 sm:space-y-5"
                : "space-y-3 lg:space-y-0 lg:min-h-0 lg:gap-3"
            }`}
          >
            <div className={isDenseSlide ? "space-y-2" : "space-y-3 sm:space-y-3.5"}>
              <div>
                <h2
                  className={`font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight ${
                    isDenseSlide
                      ? "text-lg sm:text-xl xl:text-2xl"
                      : "text-xl sm:text-2xl xl:text-3xl"
                  }`}
                >
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p
                    className={`mt-0.5 text-xs sm:text-sm font-semibold ${style.numberText}`}
                  >
                    {slide.subtitle}
                  </p>
                )}
              </div>

              <ul className={isDenseSlide ? "space-y-1 sm:space-y-1.5" : "space-y-1.5 sm:space-y-2"}>
                {slide.bullets.map((b, idx) => (
                  <li
                    key={idx}
                    className={`rounded-xl transition-all ${
                      isDenseSlide ? "px-3 py-1.5 sm:px-3.5 sm:py-2" : "px-3.5 py-2 sm:px-4 sm:py-2.5"
                    } ${
                      b.highlight
                        ? `border ${style.highlightBox} shadow-sm`
                        : "bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800/80"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${style.bulletDot}`}
                      />
                      <div
                        className={`leading-snug ${
                          isDenseSlide
                            ? "text-xs sm:text-sm"
                            : "text-xs sm:text-sm xl:text-base"
                        }`}
                      >
                        <div>
                          {b.label && (
                            <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                              {b.label}
                            </span>
                          )}
                          <span
                            className={
                              b.highlight
                                ? "font-semibold text-slate-950 dark:text-white"
                                : "text-slate-700 dark:text-slate-200"
                            }
                          >
                            {b.text}
                          </span>
                        </div>

                        {b.subItems && b.subItems.length > 0 && (
                          <ul className="mt-1 space-y-0.5 pl-2.5 border-l-2 border-slate-300 dark:border-slate-700/80">
                            {b.subItems.map((sub, sIdx) => (
                              <li
                                key={sIdx}
                                className="text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500/80 dark:bg-cyan-400/80 shrink-0" />
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
                <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-sky-50/80 dark:bg-cyan-950/40 border border-sky-200 dark:border-cyan-500/30 backdrop-blur-sm">
                  <img
                    src="/images/night-sky-dark/23825795249_3b22921aef_o.webp"
                    alt="Milky Way over clouds"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = "/images/night-sky-dark/images (9).jpg";
                    }}
                    className="w-14 h-10 sm:w-16 sm:h-12 object-cover rounded-lg border border-sky-300 dark:border-cyan-400/40 shadow-sm shrink-0"
                  />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-sky-700 dark:text-cyan-400 font-bold">
                      The 100-Year Mystery
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-0.5 leading-snug">
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
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {slide.keyStat.label}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {slide.keyStat.sub}
                  </div>
                </div>
                <div
                  className={`font-display text-sm sm:text-base xl:text-lg font-bold shrink-0 whitespace-nowrap ${style.numberText}`}
                >
                  {slide.keyStat.value}
                </div>
              </div>
            )}
          </div>

          <div
            className={`lg:col-span-7 xl:col-span-7 flex flex-col justify-between gap-1.5 sm:gap-2 ${
              isScrollMode
                ? "min-h-[280px] sm:min-h-[380px]"
                : "w-full min-h-[220px] xs:min-h-[260px] sm:min-h-[300px] lg:min-h-0 lg:flex-1 lg:overflow-hidden"
            }`}
          >
            <div className="flex-1 min-h-[190px] xs:min-h-[230px] sm:min-h-[260px] lg:min-h-0 flex flex-col">
              <SlideVisual slideId={slide.id} />
            </div>

            <div className="shrink-0 flex items-center justify-between gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg bg-slate-100/90 dark:bg-slate-950/85 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-sky-800 dark:text-cyan-300 border border-slate-200 dark:border-slate-700 shrink-0 max-w-[130px] sm:max-w-none truncate font-medium">
                  {mediaInfo.credit}
                </span>
                <span className="truncate italic text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs">
                  {slide.visualPrompt}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isScrollMode && (
          <footer className="relative z-10 shrink-0 mx-3.5 sm:mx-7 mb-3 rounded-xl border border-sky-300/60 dark:border-cyan-500/25 bg-slate-50/95 dark:bg-[#030612]/95 px-3.5 sm:px-4 py-2.5 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-200 dark:border-slate-800/90">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-sky-100 dark:bg-cyan-500/15 text-sky-800 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/30">
                  <IconMic className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                  <span>SPEAKER NOTES / VOICEOVER</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                  {wordCount} words · ~{estSeconds}s
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => speakSlide(slide, false)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition cursor-pointer ${
                    isSpeakingThis
                      ? "bg-sky-500 text-white dark:bg-cyan-400 dark:text-slate-950 font-bold shadow-md border border-sky-400 dark:border-cyan-300"
                      : "bg-sky-50 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-200 border border-sky-200 dark:border-cyan-500/40 hover:bg-sky-100 dark:hover:bg-cyan-500/30"
                  }`}
                >
                  {isSpeakingThis ? (
                    <>
                      <IconStop className="w-3 h-3 fill-current" />
                      <span>Stop Voiceover</span>
                    </>
                  ) : (
                    <>
                      <IconPlay className="w-3 h-3 fill-current" />
                      <span>Listen Voiceover</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setLargeTeleprompter((prev) => !prev)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-400 cursor-pointer"
                  title="Toggle Teleprompter Text Size"
                >
                  <IconType className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                  <span>{largeTeleprompter ? "Normal" : "Large"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyVoiceover(slide)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-400 cursor-pointer"
                >
                  {copiedId === slide.id ? (
                    <>
                      <IconCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <blockquote
              className={`text-slate-800 dark:text-slate-200 leading-snug font-normal ${
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
      onTouchCancel={handleTouchCancel}
      className={`relative flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#03050c] dark:text-slate-100 ${
        viewMode === "deck"
          ? "min-h-dvh lg:h-dvh lg:max-h-dvh w-full overflow-x-hidden lg:overflow-hidden"
          : "min-h-screen w-full overflow-x-hidden"
      } transition-colors duration-200`}
    >
      <audio
        ref={bgAudioRef}
        src={BACKGROUND_MUSIC_URL}
        loop
        preload="none"
        onPlay={() => setIsBgmPlaying(true)}
        onPause={() => setIsBgmPlaying(false)}
        onError={() => setIsBgmPlaying(false)}
      />
      <StarfieldCanvas />

      <header className="shrink-0 sticky top-0 z-30 border-b border-slate-200/90 dark:border-slate-800/80 bg-white/85 dark:bg-[#03050c]/85 backdrop-blur-md transition-colors duration-200">
        <div className="w-full max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-12 xl:px-16 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Back to Hub + Presentation Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {onBackToHub ? (
              <button
                type="button"
                onClick={handleExitToHub}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sky-800 dark:text-cyan-300 hover:border-sky-400 dark:hover:border-cyan-400 hover:bg-sky-50/50 dark:hover:bg-slate-800 transition shrink-0 cursor-pointer shadow-sm dark:shadow-none"
                title="Return to My Presentations Hub"
              >
                <IconArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All Topics</span>
              </button>
            ) : (
              <Link
                href="/"
                onClick={handleExitToHub}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sky-800 dark:text-cyan-300 hover:border-sky-400 dark:hover:border-cyan-400 hover:bg-sky-50/50 dark:hover:bg-slate-800 transition shrink-0 shadow-sm dark:shadow-none"
                title="Return to My Presentations Hub"
              >
                <IconArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All Topics</span>
              </Link>
            )}

            <div className="flex items-center gap-2 min-w-0 truncate">
              <h1 className="font-display text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
                {deckTitle}
              </h1>
              <span className="hidden sm:inline text-xs sm:text-sm font-mono text-sky-700 dark:text-cyan-400 shrink-0 font-medium">
                · {slides.length} Slides
              </span>
            </div>
          </div>

          {/* Center Act Chapter Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowActMenu((prev) => !prev);
                setShowMediaMenu(false);
              }}
              aria-expanded={showActMenu}
              aria-haspopup="true"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-sky-400 dark:hover:border-cyan-500/50 hover:bg-sky-50/50 dark:hover:bg-slate-800/80 transition cursor-pointer whitespace-nowrap shadow-sm dark:shadow-none"
              title="Jump to Act chapter"
            >
              <span className="text-sky-700 dark:text-cyan-400 font-bold whitespace-nowrap">
                Act {currentSlide.actNumber}
              </span>
              <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">·</span>
              <span className="hidden sm:inline text-slate-700 dark:text-slate-300 max-w-[140px] md:max-w-[220px] lg:max-w-[320px] truncate font-medium">
                {acts.find((a) => a.number === currentSlide.actNumber)?.title ||
                  `Act ${currentSlide.actNumber}`}
              </span>
              <IconChevronDown
                className={`w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 transition-transform duration-200 ${
                  showActMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {showActMenu && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-64 max-w-[calc(100vw-24px)] bg-white dark:bg-[#070b1c] border border-slate-200 dark:border-cyan-500/40 rounded-xl shadow-2xl p-1.5 z-40 backdrop-blur-xl animate-in fade-in duration-150">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1 border-b border-slate-100 dark:border-slate-800/80 mb-1 font-semibold">
                  Cosmic Chapters
                </div>
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
                        setShowActMenu(false);
                        if (viewMode === "gamma") {
                          document
                            .getElementById(`slide-card-${act.slides[0]}`)
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition flex items-center justify-between cursor-pointer ${
                        isCurrentAct
                          ? "bg-sky-50 dark:bg-cyan-500/20 text-sky-900 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/40 font-bold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      <span className="truncate">
                        Act {act.number}: {act.title}
                      </span>
                      <span
                        className={`text-[10px] font-normal shrink-0 ml-1 px-1.5 py-0.2 rounded border ${
                          isCurrentAct
                            ? "bg-sky-100 dark:bg-cyan-950 text-sky-800 dark:text-cyan-300 border-sky-200 dark:border-cyan-500/40 font-medium"
                            : "bg-slate-100 dark:bg-slate-950 text-slate-500 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        S{String(act.slides[0]).padStart(2, "0")}–
                        {String(act.slides[act.slides.length - 1]).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Mode & Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* View Mode Toggle: Deck vs Continuous Read */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-0.5 sm:p-1">
              <button
                type="button"
                onClick={() => setViewMode("deck")}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-mono transition cursor-pointer ${
                  viewMode === "deck"
                    ? "bg-sky-500 text-white dark:bg-cyan-400 dark:text-slate-950 font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Slide-by-slide Deck Mode"
              >
                Deck
              </button>
              <button
                type="button"
                onClick={() => setViewMode("gamma")}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-mono transition cursor-pointer ${
                  viewMode === "gamma"
                    ? "bg-sky-500 text-white dark:bg-cyan-400 dark:text-slate-950 font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Continuous Document Read Mode"
              >
                Read
              </button>
            </div>

            {/* Media Studio Popover */}
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => {
                  if (bgAudioRef.current && bgAudioRef.current.preload !== "auto") {
                    bgAudioRef.current.preload = "auto";
                  }
                }}
                onFocus={() => {
                  if (bgAudioRef.current && bgAudioRef.current.preload !== "auto") {
                    bgAudioRef.current.preload = "auto";
                  }
                }}
                onClick={() => {
                  setShowMediaMenu((prev) => !prev);
                  setShowActMenu(false);
                }}
                aria-expanded={showMediaMenu}
                aria-haspopup="true"
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono border transition cursor-pointer ${
                  isBgmPlaying || speakingSlideId !== null || autoPlayDeck
                    ? "bg-sky-50 dark:bg-cyan-950/80 border-sky-300 dark:border-cyan-500/50 text-sky-800 dark:text-cyan-300 shadow-[0_0_12px_rgba(14,165,233,0.2)] dark:shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm dark:shadow-none"
                }`}
                title="Audio, Voiceover & Video controls"
              >
                <span className="flex items-center gap-0.5">
                  <span
                    className={`w-1 h-3.5 rounded-full bg-sky-600 dark:bg-cyan-400 ${
                      isBgmPlaying ? "animate-pulse" : "opacity-60"
                    }`}
                  />
                  <span
                    className={`w-1 h-2.5 rounded-full bg-sky-500 dark:bg-cyan-300 ${
                      isBgmPlaying ? "animate-pulse" : "opacity-40"
                    }`}
                  />
                  <span
                    className={`w-1 h-4 rounded-full bg-sky-600 dark:bg-cyan-400 ${
                      isBgmPlaying ? "animate-pulse" : "opacity-60"
                    }`}
                  />
                </span>
                <span className="hidden sm:inline">Media</span>
                <IconChevronDown
                  className={`w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 transition-transform duration-200 ${
                    showMediaMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMediaMenu && (
                <div className="absolute top-full right-0 mt-1.5 w-72 max-w-[calc(100vw-24px)] bg-white dark:bg-[#070b1c] border border-slate-200 dark:border-cyan-500/35 rounded-2xl shadow-2xl p-3 z-40 backdrop-blur-xl space-y-3 animate-in fade-in duration-150">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center justify-between font-semibold">
                    <span>Cosmic Media Studio</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 animate-ping" />
                  </div>

                  {/* BGM Row */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        Interstellar Piano
                      </span>
                      <button
                        type="button"
                        onClick={toggleBgm}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                          isBgmPlaying
                            ? "bg-sky-50 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/50"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {isBgmPlaying ? (
                          <>
                            <IconVolume className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                            <span>ON</span>
                          </>
                        ) : (
                          <>
                            <IconVolumeMute className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                            <span>OFF</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        Vol
                      </span>
                      <input
                        type="range"
                        min="0.01"
                        max="0.25"
                        step="0.01"
                        value={bgmVolume}
                        aria-label="Background music volume"
                        onChange={(e) => {
                          const vol = parseFloat(e.target.value);
                          setBgmVolume(vol);
                          if (bgAudioRef.current) {
                            bgAudioRef.current.volume = vol;
                          }
                        }}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-700 accent-sky-500 dark:accent-cyan-400 rounded-lg cursor-pointer"
                        title={`Background music volume: ${Math.round(bgmVolume * 100)}%`}
                      />
                      <span className="text-[10px] font-mono text-sky-700 dark:text-cyan-300 w-7 text-right font-medium">
                        {Math.round(bgmVolume * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Auto Voice Narration Row */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-slate-800 dark:text-slate-200 font-medium">
                        Voiceover
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        Auto-read slides
                      </div>
                    </div>
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
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono border transition cursor-pointer ${
                        autoPlayDeck || speakingSlideId !== null
                          ? "bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:text-slate-950 font-bold shadow-md dark:shadow-[0_0_12px_#22d3ee] border-sky-400 dark:border-cyan-300"
                          : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sky-800 dark:text-cyan-300 hover:border-sky-400 dark:hover:border-cyan-400/50"
                      }`}
                    >
                      {autoPlayDeck || speakingSlideId !== null ? (
                        <>
                          <IconStop className="w-3 h-3 fill-current" />
                          <span>Stop Narration</span>
                        </>
                      ) : (
                        <>
                          <IconPlay className="w-3 h-3 fill-current" />
                          <span>Auto-Narrate</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Video Modal Trigger */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMediaMenu(false);
                        setShowVideoModal(true);
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg text-xs font-mono bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/40 text-indigo-900 dark:text-indigo-200 hover:border-indigo-400 flex items-center justify-center gap-1.5 cursor-pointer transition font-medium"
                    >
                      <IconFilm className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 mr-1" />
                      <span>Cosmic Video Library ({COSMIC_VIDEOS.length})</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Grid button */}
            <button
              type="button"
              onClick={() => setShowOverview((prev) => !prev)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-sky-400 dark:hover:border-cyan-400/50 hover:bg-sky-50/50 dark:hover:bg-slate-800/80 hover:text-sky-900 dark:hover:text-white transition cursor-pointer shadow-sm dark:shadow-none"
              title="Open Slide Grid (Shortcut: G)"
            >
              <IconGrid className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
              <span>Grid ({slides.length})</span>
            </button>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Shortcuts Help button */}
            <button
              type="button"
              onClick={() => setShowShortcutsModal(true)}
              className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-sky-800 dark:hover:text-cyan-300 hover:border-sky-300 dark:hover:border-cyan-500/50 hover:bg-sky-50/50 dark:hover:bg-slate-800/80 transition cursor-pointer shadow-sm dark:shadow-none"
              title="Keyboard Shortcuts Cheatsheet (?)"
              aria-label="Keyboard Shortcuts"
            >
              <IconHelp className="w-4 h-4" />
            </button>

            {/* Fullscreen button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs sm:text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-400 dark:hover:border-cyan-400/50 hover:bg-sky-50/50 dark:hover:bg-slate-800/80 hover:text-sky-900 dark:hover:text-white transition cursor-pointer shadow-sm dark:shadow-none"
              title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <IconFullscreenExit className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
              ) : (
                <IconFullscreen className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {(showActMenu || showMediaMenu) && (
          <div
            className="fixed inset-0 z-30"
            onClick={() => {
              setShowActMenu(false);
              setShowMediaMenu(false);
            }}
            aria-hidden="true"
          />
        )}

        <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-900">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-amber-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-amber-400 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          />
        </div>
      </header>

      <main
        className={`relative z-10 flex-1 w-full max-w-[1520px] mx-auto px-3 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between ${
          viewMode === "deck"
            ? "py-3 sm:py-4 lg:py-5 gap-3 sm:gap-4 lg:min-h-0 lg:overflow-hidden"
            : "py-6 sm:py-8"
        }`}
      >
        {viewMode === "deck" ? (
          <>
            {renderSlideCard(currentSlide, false)}

            {/* Floating Teleprompter Notes Drawer in Deck Mode */}
            {showNotes && (
              <div
                role="region"
                aria-label="Speaker notes teleprompter"
                className={`${
                  teleprompterDock === "bottom"
                    ? "fixed bottom-16 sm:bottom-18 left-1/2 -translate-x-1/2 w-[94vw] max-w-3xl z-40 rounded-2xl p-3 sm:p-4 animate-in fade-in slide-in-from-bottom-2"
                    : "fixed top-14 bottom-16 right-3 w-[92vw] sm:w-[390px] z-40 rounded-2xl p-3.5 sm:p-4.5 flex flex-col justify-between animate-in fade-in slide-in-from-right-2"
                } border border-slate-200 dark:border-cyan-500/40 bg-white/98 dark:bg-[#040816]/96 backdrop-blur-2xl shadow-[0_12px_45px_rgba(15,23,42,0.15)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.85)] duration-200`}
              >
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-200 dark:border-slate-800/90">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-50 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-200 dark:border-cyan-500/40 truncate">
                      <IconMic className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                      <span>NOTES · S{String(currentSlide.id).padStart(2, "0")}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                      {currentSlide.voiceover.split(/\s+/).length} words · ~{Math.max(10, Math.round((currentSlide.voiceover.split(/\s+/).length / 130) * 60))}s
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => speakSlide(currentSlide, false)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition cursor-pointer ${
                        speakingSlideId === currentSlide.id
                          ? "bg-sky-500 text-white dark:bg-cyan-400 dark:text-slate-950 font-bold shadow-md border border-sky-400 dark:border-cyan-300"
                          : "bg-sky-50 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-200 border border-sky-200 dark:border-cyan-500/40 hover:bg-sky-100 dark:hover:bg-cyan-500/30"
                      }`}
                    >
                      {speakingSlideId === currentSlide.id ? (
                        <>
                          <IconStop className="w-3 h-3 fill-current" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <IconPlay className="w-3 h-3 fill-current" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setTeleprompterDock((prev) =>
                          prev === "bottom" ? "side" : "bottom"
                        )
                      }
                      className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-400 cursor-pointer"
                      title="Dock notes to side or bottom so slide visuals stay visible"
                    >
                      {teleprompterDock === "bottom" ? (
                        <>
                          <IconDockSide className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                          <span>Dock: Side</span>
                        </>
                      ) : (
                        <>
                          <IconDockBottom className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                          <span>Dock: Bottom</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLargeTeleprompter((prev) => !prev)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-400 cursor-pointer"
                      title="Toggle text size"
                    >
                      <IconType className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                      <span>{largeTeleprompter ? "Normal" : "Large"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyVoiceover(currentSlide)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-400 cursor-pointer"
                    >
                      {copiedId === currentSlide.id ? (
                        <>
                          <IconCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <IconCopy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNotes(false)}
                      className="p-1 rounded-md text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer"
                      aria-label="Close speaker notes"
                    >
                      <IconClose className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <blockquote
                  className={`text-slate-800 dark:text-slate-100 font-sans leading-relaxed ${
                    teleprompterDock === "side"
                      ? largeTeleprompter
                        ? "text-base sm:text-lg flex-1 overflow-y-auto my-2 pr-1"
                        : "text-xs sm:text-sm flex-1 overflow-y-auto my-2 pr-1"
                      : largeTeleprompter
                      ? "text-base sm:text-lg max-h-36 overflow-y-auto"
                      : "text-xs sm:text-sm max-h-24 overflow-y-auto"
                  }`}
                >
                  &ldquo;{currentSlide.voiceover}&rdquo;
                </blockquote>
              </div>
            )}

            <div className="shrink-0 sticky bottom-2 lg:static z-20 flex items-center justify-between sm:justify-center gap-2 sm:gap-4 md:gap-5 bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl px-2.5 sm:px-4 py-1 sm:py-1.5 backdrop-blur-xl shadow-xl dark:shadow-2xl w-full sm:w-auto sm:max-w-fit mx-auto">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="h-8 sm:h-8.5 px-2.5 sm:px-3 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-sky-400 dark:hover:border-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none inline-flex items-center justify-center cursor-pointer transition gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 dark:focus-visible:ring-cyan-400"
                >
                  <IconArrowLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                  <kbd className="hidden lg:inline text-[10px] px-1 rounded bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">←</kbd>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={currentIndex === slides.length - 1}
                  className="h-8 sm:h-8.5 px-3 sm:px-3.5 rounded-lg text-xs font-mono font-bold bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 disabled:opacity-30 disabled:pointer-events-none shadow-md inline-flex items-center justify-center cursor-pointer transition gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:focus-visible:ring-cyan-300"
                >
                  <span>Next</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                  <kbd className="hidden lg:inline text-[10px] px-1 rounded bg-sky-600 dark:bg-cyan-950 border border-sky-400 dark:border-cyan-500/40 text-white dark:text-cyan-300 font-normal">→</kbd>
                </button>
              </div>

              <div className="flex items-center justify-center min-w-0">
                <button
                  type="button"
                  onClick={() => setShowOverview(true)}
                  className="sm:hidden h-8 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 hover:border-sky-400 dark:hover:border-cyan-500/50 cursor-pointer"
                  title="Tap to see all slides"
                >
                  <IconGrid className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                  <span className="text-sky-700 dark:text-cyan-400 font-bold">{currentIndex + 1}</span>
                  <span className="text-slate-400 dark:text-slate-500">/</span>
                  <span className="text-slate-600 dark:text-slate-400">{slides.length}</span>
                  <IconChevronDown className="w-3 h-3 text-sky-600 dark:text-cyan-400 ml-0.5" />
                </button>

                <div className="hidden sm:flex items-center gap-0.5 md:gap-1 overflow-x-auto py-0.5 px-2 sm:px-3 border-x border-slate-200 dark:border-slate-800/80 max-w-full">
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
                        aria-label={`Go to slide ${s.id}: ${s.title}`}
                        className="min-w-[18px] min-h-[22px] p-0.5 flex items-center justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 dark:focus-visible:ring-cyan-400 rounded-full"
                      >
                        <span
                          className={`h-1.5 rounded-full transition-all ${
                            active
                              ? "w-5 bg-sky-500 dark:bg-cyan-400 shadow-[0_0_8px_#0284c7] dark:shadow-[0_0_8px_#22d3ee]"
                              : "w-1.5 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:bg-slate-500"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowNotes((prev) => !prev)}
                  className={`h-8 sm:h-8.5 px-2.5 sm:px-3 rounded-lg text-xs font-mono border transition inline-flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 dark:focus-visible:ring-cyan-400 ${
                    showNotes
                      ? "bg-sky-50 dark:bg-cyan-950/80 border-sky-300 dark:border-cyan-500/40 text-sky-800 dark:text-cyan-300 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                  title="Speaker notes (Shortcut: N)"
                >
                  <IconMic className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                  <span className="sm:hidden">{showNotes ? "Hide" : "Notes"}</span>
                  <span className="hidden sm:inline">
                    {showNotes ? "Hide Notes" : "Speaker Notes"}
                  </span>
                  <kbd className="hidden lg:inline text-[10px] px-1 rounded bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400">N</kbd>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8 pb-16">
            <div className="rounded-2xl border border-sky-300/60 dark:border-cyan-500/30 bg-sky-50/70 dark:bg-cyan-950/20 p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-mono uppercase tracking-wider text-sky-900 dark:text-cyan-300 font-bold">
                  Gamma Card Scroll Mode · All {slides.length} Slides &amp;
                  Speaker Notes
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  Scroll through all {slides.length} cards continuously,
                  interact with every cosmic diagram &amp; photograph, or play
                  any card&apos;s voiceover note.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("deck")}
                className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-sky-500 hover:bg-sky-600 text-white dark:bg-cyan-400 dark:text-slate-950 cursor-pointer shadow-sm"
              >
                Switch to Cinema Slide Deck
              </button>
            </div>

            {slides.map((slide) => renderSlideCard(slide, true))}
          </div>
        )}
      </main>

      {showVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="bg-[#060a18] border border-sky-400/40 dark:border-cyan-500/40 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl my-auto">
            <div className="px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-[#03050c]/90">
              <div>
                <div className="flex items-center gap-2">
                  <IconFilm className="w-5 h-5 text-cyan-400" />
                  <h2 id="video-modal-title" className="font-display text-base font-bold text-white">
                    Deep Space Video Archive · {deckTitle}
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700/80 transition cursor-pointer"
              >
                <IconClose className="w-3.5 h-3.5 text-slate-400" />
                <span>Close</span>
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
                    onClick={() => {
                      setModalVideoError(false);
                      setSelectedVideoUrl(v.path);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition cursor-pointer ${
                      active
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                        : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                    }`}
                  >
                    <IconPlay className="w-2.5 h-2.5 fill-current shrink-0" />
                    <span>{v.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-black flex items-center justify-center min-h-[260px] sm:min-h-[360px]">
              {modalVideoError ? (
                <div className="p-8 text-center max-w-md mx-auto space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
                    <IconRadioDish className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="text-sm font-mono font-bold text-rose-300">
                    Video Stream Unreachable
                  </div>
                  <p className="text-xs text-slate-400">
                    The requested cosmic media asset could not be decoded or loaded in your current network session.
                  </p>
                  <button
                    type="button"
                    onClick={() => setModalVideoError(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 cursor-pointer"
                  >
                    Retry Loading Video
                  </button>
                </div>
              ) : (
                <video
                  key={selectedVideoUrl}
                  src={selectedVideoUrl}
                  poster="/images/night-sky-dark/images (9).jpg"
                  controls
                  autoPlay
                  onError={() => setModalVideoError(true)}
                  className="max-h-[70vh] w-auto rounded-xl shadow-2xl"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {showOverview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="overview-modal-title"
          className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/85 backdrop-blur-xl flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto"
        >
          <div className="bg-[#f8fafc] dark:bg-[#050816] border border-slate-200 dark:border-cyan-500/40 rounded-3xl max-w-7xl w-full max-h-[94vh] flex flex-col overflow-hidden shadow-2xl dark:shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)]">
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800/90 flex flex-wrap items-center justify-between gap-2.5 bg-white/90 dark:bg-[#03050c]/90">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                <div className="flex items-center gap-2">
                  <IconGrid className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
                  <h2 id="overview-modal-title" className="font-display text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                    All {slides.length} Slides
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-sky-50 dark:bg-cyan-950 border border-sky-200 dark:border-cyan-500/40 text-sky-800 dark:text-cyan-300 font-medium">
                    {overviewActFilter === "all"
                      ? `${slides.length} Cards`
                      : `Act ${overviewActFilter}`}
                  </span>
                </div>

                {/* Act Filter Pills */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-0.5 rounded-lg overflow-x-auto max-w-full">
                  <button
                    type="button"
                    onClick={() => setOverviewActFilter("all")}
                    className={`px-2 sm:px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-mono transition cursor-pointer shrink-0 ${
                      overviewActFilter === "all"
                        ? "bg-white dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/40 font-bold shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
                          ? "bg-white dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/40 font-bold shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Act {act.number}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden lg:inline text-xs font-mono text-slate-500 dark:text-slate-400">
                  Press ESC or G to close
                </span>
                <button
                  type="button"
                  onClick={() => setShowOverview(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                >
                  <IconClose className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Close</span>
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
                      className={`group text-left rounded-2xl border transition-all duration-200 flex flex-col items-stretch overflow-hidden cursor-pointer shadow-sm hover:shadow-lg dark:hover:shadow-cyan-500/25 hover:-translate-y-1.5 min-h-[420px] h-[420px] ${
                        isCurrent
                          ? "bg-white dark:bg-[#060919] border-sky-500 dark:border-cyan-400 ring-2 ring-sky-500/40 dark:ring-cyan-400/50 shadow-md dark:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
                          : "bg-white dark:bg-[#060919] border-slate-200 dark:border-slate-800/90 hover:border-sky-400 dark:hover:border-cyan-500/50"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60 pointer-events-none" />

                        {/* Thumbnail badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono font-bold z-10">
                          <span className="bg-slate-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700/80 text-cyan-300 shadow">
                            SLIDE {String(s.id).padStart(2, "0")}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {hasVideo && (
                              <span className="bg-indigo-950/90 backdrop-blur-md px-2 py-0.5 rounded-lg border border-indigo-500/50 text-[10px] text-indigo-300 shadow flex items-center gap-1">
                                <IconFilm className="w-2.5 h-2.5 text-indigo-400" />
                                <span>Video</span>
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
                            <span className="inline-flex items-center gap-1.5 bg-sky-500 dark:bg-cyan-400 text-white dark:text-slate-950 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-extrabold shadow-sm dark:shadow-[0_0_12px_#22d3ee]">
                              <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-slate-950 animate-pulse" />
                              ACTIVE NOW
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono text-slate-300 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-800/80 truncate max-w-[85%]">
                              {s.act.split("·")[1]?.trim() || s.act}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom 50%: Full slide text & details */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3 bg-white dark:bg-[#060919] border-t border-slate-100 dark:border-slate-800/70">
                        <div>
                          {/* Slide Title */}
                          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-cyan-300 transition line-clamp-1">
                            {s.title}
                          </h3>

                          {/* Subtitle if available */}
                          {s.subtitle && (
                            <p className="text-xs font-mono text-sky-700 dark:text-cyan-400/90 line-clamp-1 mt-0.5 font-medium">
                              {s.subtitle}
                            </p>
                          )}

                          {/* Slide Bullets / Text Information */}
                          <div className="space-y-1.5 mt-2.5">
                            {s.bullets.slice(0, 2).map((b, bIdx) => (
                              <div
                                key={bIdx}
                                className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 shrink-0 mt-1.5 shadow-[0_0_4px_#0284c7] dark:shadow-[0_0_4px_#22d3ee]" />
                                <span className="line-clamp-2">
                                  {b.label && (
                                    <strong className="text-slate-900 dark:text-slate-100 font-semibold mr-1">
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
                        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono gap-2">
                          <span className="truncate text-sky-800 dark:text-cyan-400 font-medium bg-sky-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded border border-sky-200 dark:border-cyan-500/30">
                            {s.tag}
                          </span>

                          {s.keyStat ? (
                            <span
                              className="shrink-0 text-amber-800 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/30 text-[11px]"
                              title={s.keyStat.label}
                            >
                              {s.keyStat.value}
                            </span>
                          ) : (
                            <span className="shrink-0 text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
                              <IconMic className="w-3 h-3 text-sky-600 dark:text-cyan-400" />
                              <span>Speaker Note</span>
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

      {showShortcutsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-modal-title"
          className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white dark:bg-[#060a1a] border border-slate-200 dark:border-cyan-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-5 sm:p-6 my-auto animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <IconKeyboard className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
                <h2
                  id="shortcuts-modal-title"
                  className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white"
                >
                  Keyboard Shortcuts
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowShortcutsModal(false)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 cursor-pointer transition"
                aria-label="Close keyboard shortcuts dialog"
              >
                <IconClose className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Close</span>
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs font-mono">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-400 mb-2">
                  Navigation
                </div>
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-950/70 rounded-xl p-2.5 border border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Next slide</span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">→</kbd>
                      <span className="text-slate-400 dark:text-slate-500">or</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">Space</kbd>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Previous slide</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">←</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">First / Last slide</span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">Home</kbd>
                      <span className="text-slate-400 dark:text-slate-500">/</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">End</kbd>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-400 mb-2">
                  Presentation &amp; Views
                </div>
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-950/70 rounded-xl p-2.5 border border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Toggle Light / Dark Theme</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs font-bold text-sky-700 dark:text-cyan-300">T</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Slide Grid overview</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">G</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Toggle Speaker Notes teleprompter</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">N</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Voiceover read aloud</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">V</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Switch Deck / Continuous Read</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">M</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Toggle Fullscreen</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">F</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Cheatsheet help</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">?</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Close modal / popover</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-xs">Esc</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
