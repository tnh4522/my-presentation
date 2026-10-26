"use client";

import React, { useState, useRef } from "react";

interface SlideVisualProps {
  slideId: number;
}

export const SLIDE_MEDIA_MAP: Record<
  number,
  {
    primaryImage: string;
    secondaryImage?: string;
    videoUrl?: string;
    credit: string;
  }
> = {
  1: {
    primaryImage: "/images/night-sky-dark/images (9).jpg",
    secondaryImage: "/images/night-sky-dark/23825795249_3b22921aef_o.webp",
    videoUrl: "/videos/night-sky-dark/interstellar.mp4",
    credit: "Deep Starry Horizon & Cosmic Video",
  },
  2: {
    primaryImage:
      "/images/night-sky-dark/04-Dunkery-Beacon-Keith-Trueman-d4dd113-e1597842367814.webp",
    secondaryImage: "/images/night-sky-dark/A6CPB4I4X46PGDQFXZIINNFOUE.webp",
    credit: "Dunkery Beacon Night Sky Silhouette",
  },
  3: {
    primaryImage: "/images/night-sky-dark/WUCynKkbic2oBm3N3utuPW.jpg",
    secondaryImage: "/images/night-sky-dark/ESSAY-TOPIMAGE.webp",
    credit: "Milky Way Arch & 1823 Astronomy",
  },
  4: {
    primaryImage: "/images/night-sky-dark/v5n22xGyNNHLzSnSArbrVH.jpg",
    secondaryImage: "/images/night-sky-dark/eso1019a.jpg",
    credit: "Concentric Orbits & Deep Star Shells",
  },
  5: {
    primaryImage: "/images/night-sky-dark/Stars-in-the-sky.webp",
    secondaryImage: "/images/night-sky-dark/eso1019a.jpg",
    credit: "Forest Trees vs. Deep Space Starfield",
  },
  6: {
    primaryImage: "/images/night-sky-dark/images (6).jpg",
    secondaryImage:
      "/images/night-sky-dark/digitally-created-3-dimensional-starry-sky-with-royalty-free-image-1747340356.avif",
    credit: "Golden Horizon & 3D Starfield",
  },
  7: {
    primaryImage: "/images/night-sky-dark/2MQtRGPwiA7BBYFUvrjhaa-1920-80.jpg",
    secondaryImage: "/images/night-sky-dark/images (8).jpg",
    credit: "Light vs. Dark Sky Comparison",
  },
  8: {
    primaryImage: "/images/night-sky-dark/ESSAY-TOPIMAGE.webp",
    credit: "Celestial Star Trails Geometry",
  },
  9: {
    primaryImage: "/images/night-sky-dark/cena.jpg",
    secondaryImage: "/images/night-sky-dark/images (10).jpg",
    credit: "Centaurus A Dark Cosmic Dust Lane",
  },
  10: {
    primaryImage: "/images/night-sky-dark/images (12).jpg",
    credit: "Heated Glowing Nebula Dust (NASA/Hubble)",
  },
  11: {
    primaryImage:
      "/images/night-sky-dark/Crab-Nebula-exposures-image-astronomers-explosion-NASA.webp",
    credit: "Shattered Cosmic Model · Crab Nebula (NASA)",
  },
  12: {
    primaryImage: "/images/night-sky-dark/quantum-gravity-curved-spacetime-galaxy.webp",
    credit: "Curved Spacetime & Cosmic Paradox",
  },
  13: {
    primaryImage: "/images/night-sky-dark/NGC_4414_(NASA-med).jpg",
    credit: "NGC 4414 Isolated Galaxy (NASA Hubble)",
  },
  14: {
    primaryImage: "/images/night-sky-dark/DM0HT8_WEB.webp",
    secondaryImage: "/images/night-sky-dark/images (5).jpg",
    credit: "Cosmic Cycles & Finite Time",
  },
  15: {
    primaryImage: "/images/night-sky-dark/23825795249_3b22921aef_o.webp",
    secondaryImage: "/images/night-sky-dark/images (4).jpg",
    credit: "Ancient Starlight Reaching Earth",
  },
  16: {
    primaryImage: "/images/night-sky-dark/images (12).jpg",
    secondaryImage:
      "/images/night-sky-dark/Crab-Nebula-exposures-image-astronomers-explosion-NASA.webp",
    credit: "Primordial Cosmic Expansion & Birth of Stars",
  },
  17: {
    primaryImage: "/images/night-sky-dark/Whirlpool-Galaxy-NGC-5195-Sc.webp",
    secondaryImage: "/images/night-sky-dark/images (11).jpg",
    credit: "Whirlpool Spiral Galaxy NGC 5195 (Hubble)",
  },
  18: {
    primaryImage: "/images/night-sky-dark/eath-universeITG-1737468674509-scaled.avif",
    secondaryImage: "/images/night-sky-dark/eso1019a.jpg",
    credit: "Earth & The Observable Universe Horizon",
  },
  19: {
    primaryImage: "/images/night-sky-dark/A6CPB4I4X46PGDQFXZIINNFOUE.webp",
    secondaryImage: "/images/night-sky-dark/images (11).jpg",
    credit: "Searching the Unreachable Cosmos",
  },
  20: {
    primaryImage: "/images/night-sky-dark/images (7).jpg",
    secondaryImage: "/images/night-sky-dark/quantum-gravity-curved-spacetime-galaxy.webp",
    credit: "Human Reflection Under the Cosmos",
  },
};

export function SlideVisual({ slideId }: SlideVisualProps) {
  const [selectedShell, setSelectedShell] = useState<number>(0); // Slide 4
  const [sightAngle, setSightAngle] = useState<number>(18); // Slide 5
  const [shellDensity, setShellDensity] = useState<number>(85); // Slide 6
  const [splitPos, setSplitPos] = useState<number>(50); // Slide 7
  const [dustStep, setDustStep] = useState<number>(3); // Slide 10
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [useVideoOnSlide1, setUseVideoOnSlide1] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const media = SLIDE_MEDIA_MAP[slideId] || SLIDE_MEDIA_MAP[1];

  const containerBase =
    "relative w-full h-full min-h-[180px] flex flex-col justify-between rounded-2xl overflow-hidden bg-[#03050c] select-none group";

  // Floating top-right controls (clean photo button removed)
  const renderOverlayToggle = (extraControl?: React.ReactNode) => {
    if (!extraControl) return null;
    return (
      <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5">
        {extraControl}
      </div>
    );
  };

  switch (slideId) {
    case 1:
      return (
        <div
          className={`${containerBase} border border-cyan-500/30 shadow-[0_0_50px_-15px_rgba(34,211,238,0.35)]`}
        >
          {/* Real Photo or Video Backdrop (Sound muted permanently for video) */}
          {useVideoOnSlide1 && !videoError && media.videoUrl ? (
            <video
              ref={videoRef}
              src={media.videoUrl}
              poster={media.primaryImage}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={media.primaryImage}
              alt="Deep starry night sky over mountain horizon"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* Subtle gradient vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-[#02040a]/50" />

          {renderOverlayToggle(
            !videoError && (
              <button
                type="button"
                onClick={() => setUseVideoOnSlide1((prev) => !prev)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyan-950/90 text-cyan-200 border border-cyan-500/40 hover:border-cyan-300 backdrop-blur-md cursor-pointer"
              >
                {useVideoOnSlide1 ? "🖼 Photo" : "🎬 Video"}
              </button>
            )
          )}
        </div>
      );

    case 2:
      return (
        <div className={`${containerBase} border border-indigo-500/35`}>
          <img
            src={media.primaryImage}
            alt="Silhouette of astronomer looking up at the Milky Way"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050e]/85 via-transparent to-[#03050e]/40" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              {/* Glowing Question Mark Constellation over the real Milky Way */}
              <g transform="translate(335, 32)">
                <path
                  d="M 20 55 C 20 18, 92 18, 92 58 C 92 88, 55 96, 55 130"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray="6 6"
                  className="animate-dash-flow"
                />
                <path
                  d="M 20 55 C 20 18, 92 18, 92 58 C 92 88, 55 96, 55 130"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity="0.25"
                />
                {[
                  [20, 55],
                  [35, 28],
                  [72, 26],
                  [92, 58],
                  [74, 88],
                  [55, 108],
                  [55, 130],
                  [55, 160],
                ].map(([cx, cy], i) => (
                  <g key={i}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={i === 7 ? 9 : 6}
                      fill="#38bdf8"
                      opacity="0.45"
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={i === 7 ? 5 : 3}
                      fill="#ffffff"
                    />
                  </g>
                ))}
              </g>

              {/* Sight line from silhouette to constellation ? */}
              <line
                x1="175"
                y1="175"
                x2="365"
                y2="115"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="5 5"
                opacity="0.8"
              />

              {/* Callout badges */}
              <g transform="translate(24, 290)">
                <rect
                  width="225"
                  height="50"
                  rx="10"
                  fill="#060918"
                  fillOpacity="0.88"
                  stroke="#38bdf8"
                />
                <text
                  x="14"
                  y="20"
                  fill="#38bdf8"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  OBSERVATION
                </text>
                <text
                  x="14"
                  y="38"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="bold"
                >
                  A Dark Sky with Small Stars
                </text>
              </g>
              <g transform="translate(365, 290)">
                <rect
                  width="210"
                  height="50"
                  rx="10"
                  fill="#1e1b4b"
                  fillOpacity="0.9"
                  stroke="#818cf8"
                />
                <text
                  x="14"
                  y="20"
                  fill="#a5b4fc"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  THEORY EXPECTATION
                </text>
                <text
                  x="14"
                  y="38"
                  fill="#fde047"
                  fontSize="13"
                  fontWeight="bold"
                >
                  Why Isn&apos;t It Bright?
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 3:
      return (
        <div className={`${containerBase} border border-amber-500/35`}>
          <img
            src={media.primaryImage}
            alt="Panoramic Milky Way arch over astronomer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05060d]/90 via-[#05060d]/55 to-transparent" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              {/* Vintage Portrait Medallion of Heinrich Olbers */}
              <g transform="translate(34, 42)">
                <rect
                  x="0"
                  y="0"
                  width="205"
                  height="270"
                  rx="16"
                  fill="#0b0e1a"
                  fillOpacity="0.92"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                <circle
                  cx="102"
                  cy="105"
                  r="60"
                  fill="#1c1917"
                  stroke="#fbbf24"
                  strokeOpacity="0.5"
                />
                <path
                  d="M52 166 C58 136, 146 136, 152 166 Z"
                  fill="#1e293b"
                  stroke="#fbbf24"
                  strokeWidth="1.2"
                />
                <path d="M86 138 L102 162 L118 138 Z" fill="#fef3c7" />
                <path
                  d="M72 86 C68 58, 136 58, 132 86 C138 94, 136 110, 128 112 C128 66, 76 66, 76 112 C68 110, 66 94, 72 86 Z"
                  fill="#d6d3d1"
                />
                <ellipse
                  cx="102"
                  cy="100"
                  rx="25"
                  ry="30"
                  fill="#fde68a"
                  fillOpacity="0.92"
                />
                <circle cx="93" cy="96" r="2.2" fill="#1c1917" />
                <circle cx="111" cy="96" r="2.2" fill="#1c1917" />
                <path
                  d="M95 112 Q102 117 109 112"
                  fill="none"
                  stroke="#44403c"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <rect
                  x="18"
                  y="190"
                  width="168"
                  height="56"
                  rx="8"
                  fill="#18181b"
                  stroke="#f59e0b"
                  strokeOpacity="0.5"
                />
                <text
                  x="102"
                  y="212"
                  textAnchor="middle"
                  fill="#fde68a"
                  fontSize="13"
                  fontWeight="bold"
                >
                  HEINRICH OLBERS
                </text>
                <text
                  x="102"
                  y="231"
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  German Astronomer (1823)
                </text>
              </g>

              {/* 1823 Quote Callout over the Milky Way arch */}
              <g transform="translate(265, 225)">
                <rect
                  width="305"
                  height="86"
                  rx="12"
                  fill="#090d16"
                  fillOpacity="0.88"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                />
                <text
                  x="18"
                  y="26"
                  fill="#fbbf24"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  OLBERS&apos; PARADOX (1823)
                </text>
                <text x="18" y="48" fill="#f8fafc" fontSize="13">
                  &ldquo;If the universe has so many stars,
                </text>
                <text
                  x="18"
                  y="68"
                  fill="#fde047"
                  fontSize="13"
                  fontWeight="bold"
                >
                  why isn&apos;t the night sky bright?&rdquo;
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 4:
      return (
        <div className={`${containerBase} border border-cyan-500/35 p-3`}>
          <img
            src={media.primaryImage}
            alt="Concentric orbits around bright sun in space"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#040816]/65" />

          <div className="relative z-20 flex flex-wrap items-center justify-between gap-1.5 shrink-0 pr-28">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full">
              Interactive Shell Balance
            </span>
            <div className="flex gap-1">
              {[
                { id: 0, label: "All" },
                { id: 1, label: "r=1" },
                { id: 2, label: "r=2" },
                { id: 3, label: "r=3" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSelectedShell(btn.id)}
                  className={`px-2 py-0.5 rounded-md text-xs font-mono transition cursor-pointer ${
                    selectedShell === btn.id
                      ? "bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                      : "bg-slate-900/90 text-slate-300 border border-slate-700 hover:border-cyan-400/50"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {renderOverlayToggle()}

          {showOverlay && (
            <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center">
              <svg
                viewBox="0 0 560 265"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full max-h-full object-contain"
              >
                {[
                  { r: 44, id: 1, count: 6, starR: 4.5, color: "#fde047" },
                  { r: 82, id: 2, count: 14, starR: 3.1, color: "#38bdf8" },
                  { r: 118, id: 3, count: 28, starR: 2.2, color: "#a78bfa" },
                ].map((shell) => {
                  const active =
                    selectedShell === 0 || selectedShell === shell.id;
                  return (
                    <g key={shell.id} opacity={active ? 1 : 0.2}>
                      <circle
                        cx="170"
                        cy="132"
                        r={shell.r}
                        fill="none"
                        stroke={shell.color}
                        strokeWidth={selectedShell === shell.id ? "2.4" : "1.4"}
                        strokeDasharray="5 5"
                      />
                      {Array.from({ length: shell.count }).map((_, i) => {
                        const angle = (i / shell.count) * Math.PI * 2;
                        const cx = 170 + Math.cos(angle) * shell.r;
                        const cy = 132 + Math.sin(angle) * shell.r;
                        return (
                          <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={shell.starR}
                            fill={shell.color}
                          />
                        );
                      })}
                    </g>
                  );
                })}

                <circle
                  cx="170"
                  cy="132"
                  r="13"
                  fill="#0284c7"
                  stroke="#7dd3fc"
                  strokeWidth="2"
                />
                <circle cx="166" cy="129" r="4" fill="#4ade80" />
                <text
                  x="170"
                  y="158"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  EARTH
                </text>

                <g transform="translate(325, 24)">
                  <rect
                    width="220"
                    height="214"
                    rx="12"
                    fill="#091024"
                    fillOpacity="0.92"
                    stroke="#0ea5e9"
                    strokeOpacity="0.6"
                  />
                  <text
                    x="16"
                    y="28"
                    fill="#38bdf8"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    SHELL GEOMETRY PROOF
                  </text>
                  <text x="16" y="54" fill="#e2e8f0" fontSize="12">
                    {selectedShell === 0
                      ? "Every shell (r = 1, 2, 3...)"
                      : `Inspecting Shell r = ${selectedShell}`}
                  </text>
                  <text
                    x="16"
                    y="84"
                    fill="#fde047"
                    fontSize="12"
                    fontFamily="monospace"
                  >
                    • Star Count:{" "}
                    {selectedShell <= 1
                      ? "1² = 1×"
                      : selectedShell === 2
                      ? "2² = 4× stars"
                      : "3² = 9× stars"}
                  </text>
                  <text
                    x="16"
                    y="110"
                    fill="#38bdf8"
                    fontSize="12"
                    fontFamily="monospace"
                  >
                    • Star Light:{" "}
                    {selectedShell <= 1
                      ? "1/1² = 1"
                      : selectedShell === 2
                      ? "1/2² = 1/4"
                      : "1/3² = 1/9"}
                  </text>
                  <line
                    x1="16"
                    y1="128"
                    x2="200"
                    y2="128"
                    stroke="#334155"
                  />
                  <text
                    x="16"
                    y="154"
                    fill="#4ade80"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    Total Shell Light = 100%
                  </text>
                  <text x="16" y="178" fill="#cbd5e1" fontSize="11">
                    Quantity &amp; distance balance
                  </text>
                  <text x="16" y="194" fill="#cbd5e1" fontSize="11">
                    each other out at every distance!
                  </text>
                </g>
              </svg>
            </div>
          )}
        </div>
      );

    case 5:
      return (
        <div className={`${containerBase} border border-emerald-500/35 p-3`}>
          {renderOverlayToggle()}

          <div className="relative z-20 flex items-center justify-between gap-2 shrink-0 pr-28">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
              Forest vs. Starfield Analogy
            </span>
            <label className="flex items-center gap-2 text-xs font-mono text-slate-200">
              <span>Sight Angle:</span>
              <input
                type="range"
                min={-30}
                max={30}
                value={sightAngle}
                onChange={(e) => setSightAngle(Number(e.target.value))}
                className="accent-emerald-400 w-24 cursor-pointer"
              />
            </label>
          </div>

          <div className="relative z-10 flex-1 min-h-0 grid grid-rows-2 gap-2 pt-2">
            {/* Top Panel: Real Forest Silhouette Under Starry Sky */}
            <div className="relative rounded-xl overflow-hidden border border-emerald-500/40">
              <img
                src={media.primaryImage}
                alt="Dense forest trees under starry sky"
                className="absolute inset-0 w-full h-full object-cover object-bottom"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
              {showOverlay && (
                <svg
                  viewBox="0 0 540 120"
                  preserveAspectRatio="xMidYMid meet"
                  className="relative z-10 w-full h-full"
                >
                  <text
                    x="14"
                    y="22"
                    fill="#6ee7b7"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    1. DENSE FOREST — EVERY LINE OF SIGHT HITS A TREE
                  </text>
                  <circle cx="48" cy="70" r="8" fill="#34d399" />
                  <line
                    x1="48"
                    y1="70"
                    x2="385"
                    y2={70 + sightAngle * 0.8}
                    stroke="#fde047"
                    strokeWidth="2.8"
                    strokeDasharray="6 4"
                  />
                  <circle
                    cx="385"
                    cy={70 + sightAngle * 0.8}
                    r="7"
                    fill="#fde047"
                  />
                </svg>
              )}
            </div>

            {/* Bottom Panel: Real ESO Deep Field Packed with Stars */}
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/40">
              <img
                src={media.secondaryImage}
                alt="Deep space field full of stars in every direction"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
              {showOverlay && (
                <svg
                  viewBox="0 0 540 120"
                  preserveAspectRatio="xMidYMid meet"
                  className="relative z-10 w-full h-full"
                >
                  <text
                    x="14"
                    y="22"
                    fill="#7dd3fc"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    2. ENDLESS UNIVERSE — EVERY DIRECTION MEETS A STAR
                  </text>
                  <circle cx="48" cy="70" r="8" fill="#38bdf8" />
                  <line
                    x1="48"
                    y1="70"
                    x2="385"
                    y2={70 + sightAngle * 0.8}
                    stroke="#38bdf8"
                    strokeWidth="2.8"
                    strokeDasharray="6 4"
                  />
                  <circle
                    cx="385"
                    cy={70 + sightAngle * 0.8}
                    r="7"
                    fill="#fde047"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      );

    case 6:
      return (
        <div className={`${containerBase} border border-amber-400/45 p-3`}>
          <img
            src={media.primaryImage}
            alt="Night landscape with glowing golden sky"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Interactive Golden Solar-Brightness Overlay */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, #fffbeb 0%, #fde047 45%, #f59e0b 80%, rgba(120,53,15,0.4) 100%)",
              opacity: (shellDensity / 100) * 0.86,
              mixBlendMode: "screen",
            }}
          />

          {renderOverlayToggle()}

          <div className="relative z-20 flex items-center justify-between gap-2 shrink-0 pr-28">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-200 bg-amber-950/90 border border-amber-400/50 px-2.5 py-0.5 rounded-full">
              Sky Coverage: {shellDensity}%
            </span>
            <label className="flex items-center gap-2 text-xs font-mono text-amber-100 bg-slate-950/80 px-2.5 py-0.5 rounded-lg">
              <span>Star Shells:</span>
              <input
                type="range"
                min={10}
                max={100}
                value={shellDensity}
                onChange={(e) => setShellDensity(Number(e.target.value))}
                className="accent-amber-400 w-24 cursor-pointer"
              />
            </label>
          </div>

          {showOverlay && (
            <div className="relative z-10 m-auto bg-slate-950/85 backdrop-blur-md border border-amber-400 rounded-2xl px-5 py-3.5 text-center shadow-2xl max-w-sm">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
                100% Starlight Coverage
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-1">
                Night should shine as brightly as the surface of the Sun!
              </div>
              <div className="text-[11px] font-mono text-amber-200/80 mt-1">
                Drag slider above to add endless star shells
              </div>
            </div>
          )}
        </div>
      );

    case 7:
      return (
        <div className={`${containerBase} border border-amber-500/35 p-3`}>
          {renderOverlayToggle()}

          <div className="relative z-20 flex items-center justify-between gap-2 shrink-0 pr-28">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 bg-amber-950/85 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
              Theory vs. Reality Split
            </span>
            <label className="flex items-center gap-2 text-xs font-mono text-slate-200 bg-slate-950/80 px-2.5 py-0.5 rounded-lg">
              <span>Compare:</span>
              <input
                type="range"
                min={15}
                max={85}
                value={splitPos}
                onChange={(e) => setSplitPos(Number(e.target.value))}
                className="accent-amber-400 w-24 cursor-pointer"
              />
            </label>
          </div>

          <div className="relative z-10 flex-1 min-h-0 mt-2 rounded-xl overflow-hidden border border-slate-700">
            {/* Base Right Layer: Pitch-black starry night (Reality) */}
            <img
              src={media.primaryImage}
              alt="Split comparison of dark starry sky and bright sky"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Left Layer Clipped: Blindingly Bright Golden Sky (Theory) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
            >
              <img
                src={media.secondaryImage}
                alt="Bright sky theory"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(254,240,138,0.92) 0%, rgba(245,158,11,0.85) 70%, rgba(120,53,15,0.6) 100%)",
                }}
              />
              {showOverlay && (
                <div className="absolute top-6 left-5 bg-slate-950/85 border border-amber-400 rounded-xl px-3.5 py-2">
                  <div className="text-xs font-mono font-bold text-amber-300">
                    THEORY SAYS
                  </div>
                  <div className="text-sm font-bold text-white">
                    Blindingly Bright Forever
                  </div>
                </div>
              )}
            </div>

            {showOverlay && (
              <div className="absolute top-6 right-5 bg-slate-950/85 border border-cyan-400 rounded-xl px-3.5 py-2 text-right">
                <div className="text-xs font-mono font-bold text-cyan-300">
                  REALITY SAYS
                </div>
                <div className="text-sm font-bold text-white">
                  Dark Starry Night Sky
                </div>
              </div>
            )}

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_#ffffff]"
              style={{ left: `${splitPos}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-[10px] font-mono font-bold text-amber-300">
                VS
              </div>
            </div>
          </div>
        </div>
      );

    case 8:
      return (
        <div className={`${containerBase} border border-violet-500/35`}>
          <img
            src={media.primaryImage}
            alt="Concentric circular star trails over observatory"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#050611]/55" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <g transform="translate(155, 165)">
                <circle
                  cx="0"
                  cy="0"
                  r="88"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="52"
                  fill="none"
                  stroke="#fde047"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="76"
                  y2="-44"
                  stroke="#fde047"
                  strokeWidth="2"
                />
              </g>

              <g transform="translate(285, 62)">
                <rect
                  width="275"
                  height="225"
                  rx="14"
                  fill="#090d1e"
                  fillOpacity="0.9"
                  stroke="#8b5cf6"
                  strokeWidth="1.8"
                />
                <text
                  x="18"
                  y="32"
                  fill="#c4b5fd"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  ASTRONOMICAL &amp; MATH AUDIT
                </text>
                <text
                  x="18"
                  y="64"
                  fill="#f8fafc"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  1. Astronomy Logic:
                </text>
                <text
                  x="28"
                  y="86"
                  fill="#4ade80"
                  fontSize="13"
                  fontFamily="monospace"
                >
                  N(r) = 4πr² · n  [CORRECT ✅]
                </text>

                <text
                  x="18"
                  y="120"
                  fill="#f8fafc"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  2. Mathematical Proof:
                </text>
                <text
                  x="28"
                  y="142"
                  fill="#4ade80"
                  fontSize="13"
                  fontFamily="monospace"
                >
                  I = ∫ (4πr² · L / 4πr²) dr [✅]
                </text>

                <rect
                  x="16"
                  y="160"
                  width="243"
                  height="48"
                  rx="8"
                  fill="#2e1065"
                  stroke="#f43f5e"
                />
                <text
                  x="28"
                  y="182"
                  fill="#fda4af"
                  fontSize="12"
                  fontWeight="bold"
                >
                  No obvious mistake found!
                </text>
                <text
                  x="28"
                  y="198"
                  fill="#e9d5ff"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  Needed a brand-new explanation
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 9:
      return (
        <div className={`${containerBase} border border-indigo-500/35`}>
          <img
            src={media.primaryImage}
            alt="Centaurus A galaxy with thick dark cosmic dust cloud absorbing starlight"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050c]/85 via-transparent to-[#03050c]/45" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              {/* Distant starlight arrows entering the real Centaurus A dust lane */}
              <g>
                <line
                  x1="75"
                  y1="95"
                  x2="245"
                  y2="165"
                  stroke="#fde047"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  className="animate-dash-flow"
                />
                <text
                  x="65"
                  y="78"
                  fill="#fde047"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  DISTANT STARLIGHT
                </text>
              </g>

              {/* Label over the real dark dust band */}
              <g transform="translate(195, 165)">
                <rect
                  width="225"
                  height="52"
                  rx="10"
                  fill="#090818"
                  fillOpacity="0.88"
                  stroke="#6366f1"
                />
                <text
                  x="112"
                  y="22"
                  textAnchor="middle"
                  fill="#a5b4fc"
                  fontSize="12"
                  fontWeight="bold"
                >
                  COSMIC DUST &amp; GAS LANE
                </text>
                <text
                  x="112"
                  y="40"
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  Hypothesis: Absorbs &amp; blocks light?
                </text>
              </g>

              {/* Earth at bottom right */}
              <g transform="translate(505, 285)">
                <circle
                  cx="0"
                  cy="0"
                  r="22"
                  fill="#0284c7"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <circle cx="-5" cy="-4" r="6" fill="#22c55e" />
                <text
                  x="0"
                  y="38"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  EARTH
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 10:
      return (
        <div className={`${containerBase} border border-rose-500/40 p-3`}>
          <img
            src={media.primaryImage}
            alt="Glowing heated cosmic dust nebula radiating bright light"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#0f050a]/55" />

          {renderOverlayToggle()}

          <div className="relative z-20 flex flex-wrap items-center justify-between gap-1.5 shrink-0 pr-28">
            <span className="text-[11px] font-mono uppercase tracking-wider text-rose-200 bg-rose-950/85 border border-rose-500/40 px-2.5 py-0.5 rounded-full">
              Law of Energy: Dust Glows!
            </span>
            <div className="flex gap-1">
              {[
                { s: 1, label: "1. Absorb" },
                { s: 2, label: "2. Heat 🔥" },
                { s: 3, label: "3. Glow" },
              ].map((item) => (
                <button
                  key={item.s}
                  type="button"
                  onClick={() => setDustStep(item.s)}
                  className={`px-2 py-0.5 rounded-md text-xs font-mono transition cursor-pointer ${
                    dustStep === item.s
                      ? "bg-rose-500 text-white font-bold shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                      : "bg-slate-950/90 text-slate-300 border border-slate-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {showOverlay && (
            <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center">
              <svg
                viewBox="0 0 560 255"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full max-h-full object-contain"
              >
                {[75, 130, 185].map((y, i) => (
                  <g key={i}>
                    <circle cx="48" cy={y} r="6" fill="#fde047" />
                    <line
                      x1="58"
                      y1={y}
                      x2="205"
                      y2={y}
                      stroke="#fde047"
                      strokeWidth="2.8"
                      strokeDasharray="8 6"
                      className="animate-dash-flow"
                    />
                  </g>
                ))}

                <g transform="translate(275, 130)">
                  <circle
                    cx="0"
                    cy="0"
                    r="62"
                    fill="#090d16"
                    fillOpacity="0.82"
                    stroke={dustStep === 1 ? "#6366f1" : "#fb7185"}
                    strokeWidth="2.5"
                  />
                  <text
                    x="0"
                    y="-6"
                    textAnchor="middle"
                    fill="#fde047"
                    fontSize="13"
                    fontWeight="bold"
                  >
                    {dustStep === 1
                      ? "1. DUST ABSORBS"
                      : dustStep === 2
                      ? "2. DUST GETS HOT 🔥"
                      : "3. HOT DUST GLOWS!"}
                  </text>
                  <text
                    x="0"
                    y="15"
                    textAnchor="middle"
                    fill="#f8fafc"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {dustStep === 1
                      ? "Takes in starlight"
                      : dustStep === 2
                      ? "Energy cannot vanish"
                      : "Radiates light to Earth"}
                  </text>
                </g>

                {dustStep >= 2 && (
                  <g opacity={dustStep === 3 ? 1 : 0.45}>
                    {[90, 130, 170].map((y, i) => (
                      <line
                        key={i}
                        x1="342"
                        y1={y}
                        x2="475"
                        y2="130"
                        stroke="#fb923c"
                        strokeWidth="3.5"
                        strokeDasharray="7 5"
                        className="animate-dash-flow"
                      />
                    ))}
                  </g>
                )}

                <g transform="translate(500, 130)">
                  <circle
                    cx="0"
                    cy="0"
                    r="22"
                    fill="#0284c7"
                    stroke="#fde047"
                    strokeWidth="2.5"
                  />
                  <text
                    x="0"
                    y="38"
                    textAnchor="middle"
                    fill="#fde047"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    STILL BRIGHT!
                  </text>
                </g>
              </svg>
            </div>
          )}
        </div>
      );

    case 11:
      return (
        <div className={`${containerBase} border border-violet-500/35`}>
          <img
            src={media.primaryImage}
            alt="Crab Nebula shattered cosmic filaments"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#04040c]/55" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <g transform="translate(300, 172)">
                <circle
                  cx="0"
                  cy="0"
                  r="105"
                  fill="#0f172a"
                  fillOpacity="0.45"
                  stroke="#a78bfa"
                  strokeWidth="2.5"
                />
                <path
                  d="M -72 -76 L -15 -10 L 45 -35 L 92 -62 M -15 -10 L -5 62 L -52 96 M -5 62 L 64 78"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon
                  points="118,-55 148,-70 138,-35"
                  fill="#a78bfa"
                  fillOpacity="0.6"
                  stroke="#c4b5fd"
                />
                <polygon
                  points="-125,35 -152,15 -135,60"
                  fill="#38bdf8"
                  fillOpacity="0.55"
                  stroke="#7dd3fc"
                />

                <rect
                  x="-145"
                  y="118"
                  width="290"
                  height="34"
                  rx="8"
                  fill="#090d16"
                  fillOpacity="0.92"
                  stroke="#f43f5e"
                />
                <text
                  x="0"
                  y="140"
                  textAnchor="middle"
                  fill="#fda4af"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  STATIC INFINITE MODEL = BROKEN ❌
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 12:
      return (
        <div className={`${containerBase} border border-cyan-500/35`}>
          <img
            src={media.primaryImage}
            alt="Curved spacetime galaxy grid"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#03050e]/55" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <text
                x="300"
                y="78"
                textAnchor="middle"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeOpacity="0.65"
                fontSize="60"
                fontWeight="bold"
                letterSpacing="10"
              >
                PARADOX
              </text>

              <g transform="translate(300, 205)">
                <polygon
                  points="0,-95 -88,54 -56,54 0,-42 15,-16 30,-42"
                  fill="#0ea5e9"
                  fillOpacity="0.45"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <polygon
                  points="-88,54 88,54 72,80 -72,80"
                  fill="#8b5cf6"
                  fillOpacity="0.45"
                  stroke="#a78bfa"
                  strokeWidth="2"
                />
                <polygon
                  points="0,-95 88,54 56,54 -15,-68"
                  fill="#f59e0b"
                  fillOpacity="0.45"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />

                <g transform="translate(-205, 45)">
                  <rect
                    width="130"
                    height="36"
                    rx="8"
                    fill="#091526"
                    fillOpacity="0.92"
                    stroke="#38bdf8"
                  />
                  <text
                    x="65"
                    y="23"
                    textAnchor="middle"
                    fill="#7dd3fc"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    LOGIC: BRIGHT
                  </text>
                </g>
                <g transform="translate(75, 45)">
                  <rect
                    width="130"
                    height="36"
                    rx="8"
                    fill="#1f1608"
                    fillOpacity="0.92"
                    stroke="#fbbf24"
                  />
                  <text
                    x="65"
                    y="23"
                    textAnchor="middle"
                    fill="#fde047"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    FACT: DARK SKY
                  </text>
                </g>
              </g>
            </svg>
          )}
        </div>
      );

    case 13:
      return (
        <div className={`${containerBase} border border-emerald-500/35`}>
          <img
            src={media.primaryImage}
            alt="NGC 4414 isolated spiral galaxy surrounded by dark void"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-black/85" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <text
                x="85"
                y="48"
                fill="#94a3b8"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                EMPTY SPACE BEYOND
              </text>

              <g transform="translate(300, 172)">
                <circle
                  cx="0"
                  cy="0"
                  r="116"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="3"
                  strokeDasharray="10 6"
                />
                <rect
                  x="-120"
                  y="126"
                  width="240"
                  height="32"
                  rx="8"
                  fill="#062c22"
                  fillOpacity="0.92"
                  stroke="#10b981"
                />
                <text
                  x="0"
                  y="146"
                  textAnchor="middle"
                  fill="#6ee7b7"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  ANSWER 1: FINITE STAR BOUNDARY
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 14:
      return (
        <div className={`${containerBase} border border-amber-500/35`}>
          <img
            src={media.primaryImage}
            alt="Cosmic planets and time cycles"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#04050c]/65" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <g transform="translate(300, 180)">
                <rect
                  x="-82"
                  y="-128"
                  width="164"
                  height="11"
                  rx="5"
                  fill="#f59e0b"
                />
                <rect
                  x="-82"
                  y="117"
                  width="164"
                  height="11"
                  rx="5"
                  fill="#f59e0b"
                />
                <path
                  d="M-70 -117 C-70 -42, -14 -18, -10 0 C-14 18, -70 42, -70 117 L70 117 C70 42, 14 18, 10 0 C14 -18, 70 -42, 70 -117 Z"
                  fill="#0f172a"
                  fillOpacity="0.72"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
                <line
                  x1="0"
                  y1="-30"
                  x2="0"
                  y2="92"
                  stroke="#fde047"
                  strokeWidth="3.5"
                  strokeDasharray="6 6"
                  className="animate-dash-flow"
                />
                <path
                  d="M-56 116 Q0 64 56 116 Z"
                  fill="#f59e0b"
                  fillOpacity="0.65"
                />
                <g transform="translate(92, -26)">
                  <rect
                    width="175"
                    height="58"
                    rx="8"
                    fill="#1c1917"
                    fillOpacity="0.92"
                    stroke="#f59e0b"
                  />
                  <text
                    x="12"
                    y="22"
                    fill="#fbbf24"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    ANSWER 2: LIMITED TIME
                  </text>
                  <text
                    x="12"
                    y="42"
                    fill="#f8fafc"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Finite Age (~13.8B Yrs)
                  </text>
                </g>
              </g>
            </svg>
          )}
        </div>
      );

    case 15:
      return (
        <div className={`${containerBase} border border-cyan-500/35`}>
          <img
            src={media.primaryImage}
            alt="Starlight streaming across dark space toward Earth horizon"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#03050e]/65" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <line
                x1="45"
                y1="305"
                x2="555"
                y2="305"
                stroke="#64748b"
                strokeWidth="2"
              />
              <text
                x="55"
                y="328"
                fill="#fde047"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                COSMIC BEGINNING (t = 0)
              </text>
              <text
                x="425"
                y="328"
                fill="#38bdf8"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                EARTH TODAY
              </text>

              {[
                [70, 80, 365, "Light Still Traveling Toward Us!"],
                [70, 148, 415, "Almost Arriving..."],
                [70, 216, 315, "Has Not Reached Earth Yet"],
              ].map(([sx, sy, endX, label], i) => (
                <g key={i}>
                  <circle
                    cx={sx as number}
                    cy={sy as number}
                    r="8"
                    fill="#fde047"
                  />
                  <line
                    x1={(sx as number) + 12}
                    y1={sy as number}
                    x2={endX as number}
                    y2={sy as number}
                    stroke="#38bdf8"
                    strokeWidth="4"
                    strokeDasharray="10 6"
                    className="animate-dash-flow"
                  />
                  <circle
                    cx={endX as number}
                    cy={sy as number}
                    r="6"
                    fill="#ffffff"
                  />
                  <line
                    x1={(endX as number) + 8}
                    y1={sy as number}
                    x2="500"
                    y2={sy as number}
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={(sx as number) + 25}
                    y={(sy as number) - 12}
                    fill="#ffffff"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {label as string}
                  </text>
                </g>
              ))}

              <g transform="translate(515, 148)">
                <circle
                  cx="0"
                  cy="0"
                  r="25"
                  fill="#0284c7"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
                <circle cx="-6" cy="-5" r="7" fill="#22c55e" />
                <text
                  x="0"
                  y="44"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                >
                  EARTH
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 16:
      return (
        <div className={`${containerBase} border border-amber-400/40`}>
          <img
            src={media.primaryImage}
            alt="Big Bang hot dense cosmic expansion evolving into stars"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#03050c]/80 via-[#03050c]/35 to-[#03050c]/75" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <path
                d="M 85 180 L 545 36 C 575 180, 575 180, 545 324 Z"
                fill="none"
                stroke="#fde047"
                strokeWidth="2.5"
                strokeDasharray="8 6"
              />
              <circle cx="85" cy="180" r="24" fill="#ffffff" />
              <circle
                cx="85"
                cy="180"
                r="38"
                fill="#fde047"
                fillOpacity="0.35"
              />
              <rect
                x="24"
                y="228"
                width="165"
                height="48"
                rx="8"
                fill="#090d16"
                fillOpacity="0.9"
                stroke="#fde047"
              />
              <text
                x="106"
                y="248"
                textAnchor="middle"
                fill="#fde047"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                THE BIG BANG
              </text>
              <text
                x="106"
                y="265"
                textAnchor="middle"
                fill="#f8fafc"
                fontSize="11"
              >
                Hot, Dense Beginning
              </text>

              <rect
                x="355"
                y="36"
                width="205"
                height="44"
                rx="8"
                fill="#090d16"
                fillOpacity="0.9"
                stroke="#38bdf8"
              />
              <text
                x="457"
                y="63"
                textAnchor="middle"
                fill="#38bdf8"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
              >
                EVOLVING STARS &amp; GALAXIES
              </text>
            </svg>
          )}
        </div>
      );

    case 17:
      return (
        <div className={`${containerBase} border border-violet-500/35`}>
          <img
            src={media.primaryImage}
            alt="Whirlpool Spiral Galaxy NGC 5195"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#040510]/45" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <g transform="translate(260, 180)">
                <circle
                  cx="0"
                  cy="0"
                  r="65"
                  fill="none"
                  stroke="#38bdf8"
                  strokeOpacity="0.55"
                  strokeDasharray="5 5"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="135"
                  fill="none"
                  stroke="#fb7185"
                  strokeOpacity="0.55"
                  strokeDasharray="8 6"
                />

                {/* Outward Expansion Velocity Vectors */}
                {[
                  [55, -45, 135, -110, "FASTER (v = 2x)"],
                  [-55, -45, -135, -110, "EXPANDING"],
                  [75, 50, 195, 125, "SPEEDING UP! (v = 3x)"],
                  [-65, 50, -155, 118, "MOVING AWAY"],
                ].map(([x1, y1, x2, y2, label], i) => (
                  <g key={i}>
                    <line
                      x1={x1 as number}
                      y1={y1 as number}
                      x2={x2 as number}
                      y2={y2 as number}
                      stroke="#fb7185"
                      strokeWidth="3.5"
                      strokeDasharray="7 5"
                      className="animate-dash-flow"
                    />
                    <circle
                      cx={x2 as number}
                      cy={y2 as number}
                      r="5"
                      fill="#fde047"
                    />
                    <rect
                      x={(x2 as number) - 65}
                      y={(y2 as number) + ((y2 as number) > 0 ? 8 : -28)}
                      width="130"
                      height="22"
                      rx="5"
                      fill="#090d16"
                      fillOpacity="0.88"
                      stroke="#fb7185"
                    />
                    <text
                      x={x2 as number}
                      y={(y2 as number) + ((y2 as number) > 0 ? 23 : -13)}
                      textAnchor="middle"
                      fill="#fda4af"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {label as string}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          )}
        </div>
      );

    case 18:
      return (
        <div className={`${containerBase} border border-rose-500/35`}>
          <img
            src={media.primaryImage}
            alt="Earth and the observable universe horizon"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#030308]/55" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <g transform="translate(300, 172)">
                <circle
                  cx="0"
                  cy="0"
                  r="108"
                  fill="#0c192c"
                  fillOpacity="0.35"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                />
                <rect
                  x="-95"
                  y="-122"
                  width="190"
                  height="26"
                  rx="6"
                  fill="#090d16"
                  fillOpacity="0.9"
                  stroke="#38bdf8"
                />
                <text
                  x="0"
                  y="-105"
                  textAnchor="middle"
                  fill="#38bdf8"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  OBSERVABLE UNIVERSE
                </text>

                {[
                  [-175, -80],
                  [175, -80],
                  [-175, 75],
                  [175, 75],
                ].map(([gx, gy], i) => (
                  <g key={i} transform={`translate(${gx}, ${gy})`}>
                    <ellipse
                      cx="0"
                      cy="0"
                      rx="18"
                      ry="7"
                      fill="#991b1b"
                      stroke="#ef4444"
                    />
                    <text
                      x="0"
                      y="20"
                      textAnchor="middle"
                      fill="#fca5a5"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      v &gt; c (Hidden)
                    </text>
                  </g>
                ))}

                <rect
                  x="-150"
                  y="122"
                  width="300"
                  height="30"
                  rx="8"
                  fill="#2a0a18"
                  fillOpacity="0.92"
                  stroke="#f43f5e"
                />
                <text
                  x="0"
                  y="141"
                  textAnchor="middle"
                  fill="#fda4af"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  BEYOND HORIZON: LIGHT NEVER ARRIVES
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 19:
      return (
        <div className={`${containerBase} border border-emerald-500/35`}>
          <img
            src={media.primaryImage}
            alt="Searching deep space for distant signals"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050c]/85 via-[#03050c]/30 to-[#03050c]/60" />

          {renderOverlayToggle()}

          {showOverlay && (
            <svg
              viewBox="0 0 600 360"
              preserveAspectRatio="xMidYMid meet"
              className="relative z-10 w-full h-full max-h-full object-contain"
            >
              <line
                x1="345"
                y1="20"
                x2="345"
                y2="320"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="8 8"
              />
              <rect
                x="235"
                y="322"
                width="220"
                height="26"
                rx="6"
                fill="#090d16"
                fillOpacity="0.9"
                stroke="#f43f5e"
              />
              <text
                x="345"
                y="339"
                textAnchor="middle"
                fill="#fb7185"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                COSMIC HORIZON GAP (v &gt; c)
              </text>

              {/* Radio Telescope Dish on Left */}
              <g transform="translate(115, 275)">
                <polygon points="-16,32 16,32 7,-5 -7,-5" fill="#334155" />
                <g transform="rotate(-35)">
                  <path
                    d="M-44 -10 Q0 26 44 -10"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                  <line
                    x1="0"
                    y1="8"
                    x2="0"
                    y2="-26"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="-26" r="4" fill="#34d399" />
                </g>
              </g>

              {/* Fading Radio Signals */}
              {[1, 2, 3].map((step) => (
                <path
                  key={step}
                  d={`M ${155 + step * 42} ${215 - step * 35} A 45 45 0 0 1 ${
                    185 + step * 42
                  } ${250 - step * 35}`}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  opacity={1 - step * 0.25}
                />
              ))}

              {/* Unreachable Distant Galaxy Card on Right */}
              <g transform="translate(375, 48)">
                <rect
                  width="195"
                  height="95"
                  rx="12"
                  fill="#062c22"
                  fillOpacity="0.9"
                  stroke="#34d399"
                />
                <text
                  x="97"
                  y="30"
                  textAnchor="middle"
                  fill="#6ee7b7"
                  fontSize="13"
                  fontWeight="bold"
                >
                  ALIEN LIFE? 🛸
                </text>
                <text
                  x="97"
                  y="52"
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="11"
                >
                  Ultra-distant galaxies
                </text>
                <text
                  x="97"
                  y="72"
                  textAnchor="middle"
                  fill="#fda4af"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  Signals can NEVER cross!
                </text>
              </g>
            </svg>
          )}
        </div>
      );

    case 20:
    default:
      return (
        <div
          className={`${containerBase} justify-between border border-cyan-500/35 p-3.5`}
        >
          <img
            src={media.primaryImage}
            alt="Human reflection under the starry night sky"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050c]/95 via-[#03050c]/65 to-[#03050c]/45" />

          {renderOverlayToggle()}

          <div className="relative z-10 text-center shrink-0 pr-24 sm:pr-0">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/85 border border-cyan-500/40 px-3 py-0.5 rounded-full">
              Three Simple Questions That Changed History
            </span>
          </div>

          {showOverlay && (
            <div className="relative z-10 grid grid-cols-3 gap-2.5 my-auto">
              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-rose-500/40 shadow-lg">
                <img
                  src="/images/night-sky-dark/v5n22xGyNNHLzSnSArbrVH.jpg"
                  alt="Newton Gravity Orbits"
                  className="w-full h-14 object-cover rounded-lg mb-1.5 border border-rose-500/30"
                />
                <div className="text-[11px] font-mono uppercase text-rose-300 font-bold">
                  Isaac Newton 🍎
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  Falling Apple
                </div>
                <div className="text-[11px] font-semibold text-rose-200 bg-rose-950/70 px-2 py-0.5 rounded mt-1">
                  Law of Gravity
                </div>
              </div>

              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/40 shadow-lg">
                <img
                  src="/images/night-sky-dark/quantum-gravity-curved-spacetime-galaxy.webp"
                  alt="Maxwell Waves"
                  className="w-full h-14 object-cover rounded-lg mb-1.5 border border-amber-500/30"
                />
                <div className="text-[11px] font-mono uppercase text-amber-300 font-bold">
                  J. C. Maxwell ⚡
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  Few Equations
                </div>
                <div className="text-[11px] font-semibold text-amber-200 bg-amber-950/70 px-2 py-0.5 rounded mt-1">
                  EM Waves
                </div>
              </div>

              <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-400/60 shadow-[0_0_25px_-8px_rgba(34,211,238,0.5)]">
                <img
                  src="/images/night-sky-dark/04-Dunkery-Beacon-Keith-Trueman-d4dd113-e1597842367814.webp"
                  alt="Olbers Dark Sky"
                  className="w-full h-14 object-cover rounded-lg mb-1.5 border border-cyan-400/40"
                />
                <div className="text-[11px] font-mono uppercase text-cyan-300 font-bold">
                  H. Olbers 🌌
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  Dark Night Sky
                </div>
                <div className="text-[11px] font-semibold text-cyan-200 bg-cyan-950/80 px-2 py-0.5 rounded mt-1">
                  Cosmic Beginning
                </div>
              </div>
            </div>
          )}

          <div className="relative z-10 text-center text-[11px] font-mono text-cyan-200/90 shrink-0">
            Keep asking questions · Thank you for listening! ✨
          </div>
        </div>
      );
  }
}
