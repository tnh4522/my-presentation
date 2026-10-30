# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Curious science enthusiasts, astronomy students, educators, and peers seeking engaging, conceptually rigorous deep-dives into cosmic and scientific questions.

## Product Purpose

A personal presentation and educational showcase hub that publishes cinematic, interactive web slide decks. Success means transforming complex scientific and astronomical concepts (starting with Olbers' paradox in "Why Is the Night Sky Dark?") into captivating visual narratives that anyone can explore smoothly.

## Positioning

Unlike conventional static slide software (PowerPoint, Google Slides, Keynote) or basic text write-ups, this hub delivers interactive, browser-native audiovisual experiences. It combines high-resolution real astrophotography, video loops, interactive SVG diagrams, ambient soundscapes, and dual presentation views (slide deck presentation mode and vertical continuous reading mode).

## Operating Context

- Viewed on desktop, tablet, and mobile browsers (responsive web).
- Explored either as an immersive full-screen slide deck (keyboard arrows, touch swipes, voiceover speaker notes) or as a continuous vertical document mode (Gamma-style reading layout).
- Managed directly as a Next.js web application codebase where new presentations are declared modularly in `app/data/presentations.ts`.

## Capabilities and Constraints

- **Stack & Architecture:** Built on Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.
- **Dual Presentation Engine:** Presentation decks can be launched in either traditional slide deck mode or vertical reading document mode.
- **Multimedia Integration:** Integrated HTML5 background audio (ambient soundtrack with mute/volume control), looped video backgrounds, canvas-based animated starfield, and SVG diagrams.
- **Slide Progression:** Keyboard controls (left/right arrows, space, numbers, full-screen shortcut 'f', view mode toggle 'g', audio mute 'm'), voiceover/speaker notes drawer, and act-based progress indicators.
- **Constraints:** Must maintain high performance during video playback and starfield canvas animations without frame drops. Audio playback respects browser autoplay policies (user interaction required).

## Brand Commitments

- **Tone & Voice:** Contemplative, intellectually curious, accessible, and cinematic. Explanations avoid pedantic jargon while honoring astronomical accuracy.
- **Identity & Aesthetics:** Deep-space theme (`#03050c` night sky background, subtle starry canvas, glowing accents: cyan, indigo, amber, emerald, gold). Typography pairs Space Grotesk (display), Plus Jakarta Sans (body), and JetBrains Mono (data/stats).

## Evidence on Hand

- **Existing Deck:** "Why Is the Night Sky Dark? — Olbers' Paradox & The Secret of Our Universe" (20 slides across 4 acts: The Obvious Question, The Mathematical Trap, The Flawed Assumptions, The Cosmic Revelation).
- **Curated Media Assets:** Verified real space photography from NASA/ESA, 4K/HD space video loops (`interstellar.mp4` and numbered clips in `public/videos/night-sky-dark/`), and Hans Zimmer Interstellar piano ambient track (`public/sound-background/night-sky-dark/`).
- **Interactive SVG Visuals:** Interactive diagrams in `app/components/SlideVisuals.tsx` illustrating geometric shell layers, light absorption, light cone/expanding universe redshift.

## Product Principles

1. **Cinematic Immersion with Intellectual Rigor:** Visual beauty and atmospheric ambiance serve the concept rather than distracting from it; astronomy facts and math principles remain accurate.
2. **Dual-Mode Fluidity:** Welcome both presentation viewers who want an immersive step-by-step slide delivery and self-paced readers who prefer continuous scrolling.
3. **Frictionless Exploration:** Instant loading, seamless audio/video controls, intuitive keyboard navigation, and responsive touch gestures across devices.
4. **Modularity by Design:** Adding new presentations requires only declaring structured data and media maps in `presentations.ts`, inheriting hub listing, SEO metadata, and routing automatically.
