---
name: my-presentation
description: Personal interactive web presentation hub featuring cinematic slide decks, deep-space storytelling, and dual-theme celestial cartography
colors:
  # Dark Theme ("The Deep-Space Planetarium")
  obsidian-void: "#03050c"
  slate-glass: "#060919"
  starlight-white: "#f1f5f9"
  slate-muted: "#94a3b8"
  slate-border: "#1e293b"
  cerenkov-cyan: "#22d3ee"
  cyan-glow: "#67e8f9"
  cyan-dim: "#082f49"
  deep-nebula: "#818cf8"
  solar-flare: "#fbbf24"
  aurora-emerald: "#34d399"
  # Light Theme ("The Solar Celestial Atlas")
  solar-canvas: "#f8fafc"
  solar-card: "#ffffff"
  solar-ink: "#0f172a"
  solar-muted: "#475569"
  solar-border: "#cbd5e1"
  solar-cyan: "#0284c7"
  solar-indigo: "#4f46e5"
  solar-amber: "#b45309"
  solar-emerald: "#059669"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  telemetry:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  micro:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.cerenkov-cyan}"
    textColor: "{colors.obsidian-void}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.cyan-glow}"
  button-secondary:
    backgroundColor: "{colors.slate-glass}"
    textColor: "{colors.starlight-white}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
  card-glass:
    backgroundColor: "{colors.slate-glass}"
    textColor: "{colors.starlight-white}"
    rounded: "{rounded.xl}"
    padding: "24px 28px"
  input-search:
    backgroundColor: "{colors.slate-glass}"
    textColor: "{colors.starlight-white}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  badge-telemetry:
    backgroundColor: "{colors.cyan-dim}"
    textColor: "{colors.cerenkov-cyan}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  theme-toggle:
    rounded: "{rounded.xl}"
    padding: "8px 12px"
    fontFamily: "JetBrains Mono, monospace"
---

# Design System: my-presentation

## Overview

**Creative North Star: "The Deep-Space Planetarium & The Solar Celestial Atlas"**

`my-presentation` operates on a dual-aesthetic celestial paradigm:

1. **The Deep-Space Planetarium (Dark Mode):** Evoking the hushed, reverent atmosphere of an optical planetarium or astronomical observatory at midnight. The interface recedes into an obsidian cosmic void (`#03050c`), punctuated only by a living canvas of twinkling starlight, rich photographic windows into deep space, and razor-sharp spectral telemetry lines. Surfaces are dark semi-translucent glass slabs (`#060919` at 92% opacity with `backdrop-blur-xl`) bound by delicate 1px luminescent frontiers (`border-cyan-500/30`).
2. **The Solar Celestial Atlas (Light Mode):** Inspired by historical astronomical cartography and modern solar observatory sunrooms. The canvas adopts a warm celestial alabaster tone (`#f8fafc`), layered with pristine white translucent glass cards (`#ffffff/95` with `backdrop-blur-xl`), razor-sharp slate borders (`border-slate-200/80` and `border-sky-300`), deep ink typography (`#0f172a`), and rich cerulean (`#0284c7`), sapphire (`#4f46e5`), and warm amber (`#b45309`) telemetry accents. The starfield dynamically transforms into floating celestial chart coordinate particles.

Surfaces in both themes are crafted with glassmorphism and subtle structural hairlines rather than heavy drop shadows. High-chroma color is treated with absolute discipline: hue is never applied as arbitrary surface fill, but exclusively as emitted starlight or cartographic telemetry markers.

### Dual-Theme Architecture
- **Tailwind CSS v4 Integration:** Driven via class-based `.dark` variant configured through `@custom-variant dark (&:where(.dark, .dark *));` in `app/globals.css`.
- **Zero-FOUC Pre-Hydration:** An inline script in `<head>` executes synchronously prior to first paint, reading `localStorage['my-presentation-theme']` or falling back to `prefers-color-scheme: dark`.
- **Global Theme Context:** Managed via `ThemeProvider` (`app/components/ThemeProvider.tsx`), supporting `light`, `dark`, and `system` modes with seamless persistence and live OS media query synchronization.
- **Dedicated Theme Toggle:** Rendered via `ThemeToggle` (`app/components/ThemeToggle.tsx`), featuring custom SVG solar rays and lunar crescent icons, accessible `aria-label`, and global `[T]` keyboard hotkey trigger.
- **System Browser Integration:** Viewport metadata provides light (`#f8fafc`) and dark (`#03050c`) theme colors for mobile address bars; selection highlights and custom scrollbars adapt dynamically to active themes.

## Colors

The palette delivers equal aesthetic rigor and full WCAG AA/AAA contrast compliance across both themes.

### Dark Theme ("The Deep-Space Planetarium")
- **Obsidian Void** (`#03050c`): Base canvas and background environment.
- **Cosmic Glass** (`#060919`): Semi-transparent dark slab surface background (`bg-[#060919]/92` or `bg-slate-900/60`).
- **Cerenkov Cyan** (`#22d3ee` / `#38bdf8`): Primary energetic accent for CTAs, active slide badges, and interactive diagram lines.
- **Deep Nebula Indigo** (`#818cf8`): Secondary accent representing cosmological depth and mathematical proofs.
- **Solar Flare Amber** (`#fbbf24`): Warning and critical paradox accent.
- **Aurora Emerald** (`#34d399`): Resolution and observational proof accent.
- **Starlight White** (`#f1f5f9`): Primary high-contrast foreground text.
- **Muted Nebula Slate** (`#94a3b8` / `#64748b`): Secondary descriptive text and speaker notes.
- **Instrument Border** (`#1e293b`): Subtle 1px structural framing for cards and dividers.

### Light Theme ("The Solar Celestial Atlas")
- **Solar Alabaster Canvas** (`#f8fafc`): Base celestial paper/sunroom canvas.
- **Pristine Solar Glass** (`#ffffff` at 92–96% with `backdrop-blur-xl`): Slide cards, hero banners, and floating panels.
- **Cerulean Atlas** (`#0284c7`): Primary energetic accent for CTAs, active badges, and focus rings (high contrast on white).
- **Royal Sapphire** (`#4f46e5`): Secondary accent for Act badges and mathematical paradoxes.
- **Solar Amber** (`#b45309`): High-contrast paradox and warning indicator (WCAG compliant on light surfaces).
- **Observatory Emerald** (`#059669`): Scientific confirmation and positive status indicator.
- **Atlas Ink Slate** (`#0f172a`): Primary high-contrast foreground text (contrast ratio >14:1 on white).
- **Muted Cartography Slate** (`#475569`): Secondary descriptive copy and telemetry annotations (contrast ratio >5.5:1).
- **Hairline Meridian Border** (`#e2e8f0` / `#cbd5e1`): Fine 1px architectural dividers and card boundaries.

### Named Rules
**The Dual-Dignity Rule.** Light Mode and Dark Mode are treated with equal visual dignity. Dark Mode must never feel like an unreadable muddy gray, and Light Mode must never feel like an unstyled blinding white document—it must embody an authoritative solar observatory atlas.

**The Emission & Cartography Rule.** In Dark Mode, vivid colors exist exclusively as emitted starlight against the dark void. In Light Mode, vivid colors act as precision cartographic inks and astronomical instruments. Rarity preserves visual authority.

**The Spectral Role Rule.** Colors carry semantic physical meaning: Cyan/Cerulean denotes active exploration and current truth; Amber denotes astronomical paradoxes and historical queries; Indigo/Sapphire denotes mathematical models; Emerald denotes confirmed cosmological resolutions.

## Typography

**Display Font:** Space Grotesk (with `system-ui, -apple-system, sans-serif` fallback)  
**Body Font:** Plus Jakarta Sans (with `system-ui, sans-serif` fallback)  
**Label/Mono Font:** JetBrains Mono (with `ui-monospace, monospace` fallback)

### Hierarchy
- **Display** (Bold 700, `2.25rem` / `36px` to `2.75rem` / `44px`, line-height `1.15`, tracking `-0.02em`): Deck titles on hero banners, presentation covers, and fullscreen slide deck titles.
- **Headline** (Bold 700, `1.5rem` / `24px` to `1.875rem` / `30px`, line-height `1.25`, tracking `-0.01em`): Slide card titles, hub section headers, and modal drawer titles.
- **Title** (Semi-bold 600, `1.125rem` / `18px`, line-height `1.4`): Slide card subtitles, key takeaway headings, and act group titles.
- **Body** (Regular 400 & Medium 500, `0.9375rem` / `15px` to `1rem` / `16px`, line-height `1.6`): Primary explanatory text, bullet details, voiceover speaker notes, and presentation abstracts. Max line length constrained to 65–75ch for effortless reading.
- **Label** (Medium 500 & Bold 700, `0.75rem` / `12px` to `0.8125rem` / `13px`, tracking `0.08em` uppercase): Slide index readouts (`SLIDE 04 / 20`), act badges, category chips, duration meters, and hotkey hints.
- **Telemetry** (Semi-bold 600, `0.6875rem` / `11px`, tracking `0.08em` uppercase): Dense observatory HUD telemetry, act navigation ranges (`S1–S4`), metadata tags, and compact badge chips.
- **Micro** (Bold 700, `0.625rem` / `10px`, tracking `0.1em` uppercase): Micro-badges, slide thumbnail index counters (`SLIDE 01`), and minute telemetry sub-indicators.

### Named Rules
**The Telemetry Contrast Rule.** Display headings always command bold presence in Space Grotesk, body explanations remain in highly legible Plus Jakarta Sans, and all numbers, slide indexes, durations, and metadata are strictly set in JetBrains Mono. Numbers are instruments, not prose.

**The Subtitle Resonance Rule.** Slide subtitles must never repeat the heading color in plain text. Subtitles take the act's active spectral accent color (e.g. `text-sky-700 dark:text-cyan-400` or `text-amber-800 dark:text-amber-400`), immediately establishing the thematic tone.

## Layout

The presentation layout adapts dynamically between two viewing modes across screen sizes, anchored within a maximum widescreen container width (`max-w-[1760px]`).

- **Presentation Stage (Deck Mode):** Optimized for zero-scroll viewport containment (`h-screen` or `100dvh`). The layout divides into a fixed top telemetry bar (48px–64px), a central stage housing the primary interactive slide card, and a bottom control dock with keyboard guides, slide thumbnails, and audio/voiceover triggers.
- **Continuous Reading (Scroll Mode / Gamma View):** Optimized for editorial reading flow. Slide cards stack vertically with generous breathing space (`space-y-12 sm:space-y-16`) and comfortable min-height (`min-h-[82vh]`), allowing seamless mouse-wheel exploration through all 20 slides.
- **Home Hub Layout:** Features a high-impact widescreen featured presentation banner with split preview collage, followed by a responsive grid (`grid-cols-1 lg:grid-cols-2`) of presentation deck cards with direct act navigation jump links.
- **Spacing Scale:** Standard 4px grid multiplied across semantic steps: `xs: 6px`, `sm: 10px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `2xl: 48px`.

## Elevation & Depth

Depth in `my-presentation` is created through optical glassmorphism and colored photon emissions rather than muddy drop shadows.

### Shadow & Aura Vocabulary
- **Spectral Button Glow:** Radiant photon aura on primary CTA buttons (`box-shadow: 0 0 25px rgba(34, 211, 238, 0.45)` in Dark Mode, `box-shadow: 0 4px 16px rgba(2, 132, 199, 0.25)` in Light Mode).
- **Subtle Surface Rim Glow:** Used on hovered presentation cards, active act chips, and focused search inputs.
- **Cosmic Card Isolation:** Deep ambient shadow that visually lifts glass slide cards above the animated starfield canvas.
- **Hero Starlight Flare:** Wide diffuse aura anchoring the featured presentation hero banner.

## Components

### Theme Toggle (`ThemeToggle.tsx`)
- Sleek, accessible pill button supporting light, dark, and system modes.
- Visual icon state renders custom SVG Sun (`IconSun`) with radiant solar rays and Moon (`IconMoon`) with crater detailing.
- Keyboard indicator displays `[T]` shortcut label.
- Placed prominently in the Hub header, the Deck presentation HUD, and 404 error views.

### Buttons
- **Shape:** Softly curved corners (12px to 16px radius, `rounded-xl` to `rounded-2xl`).
- **Primary Action (`button-primary`):** Solid Cerulean/Cyan background (`bg-sky-600 dark:bg-cyan-400`), contrasting text (`text-white dark:text-slate-950`), bold mono typography, with active aura glow.
- **Secondary / Glass (`button-secondary`):** Translucent glass (`bg-white/90 dark:bg-slate-900/90`), hairline instrument border (`border-slate-300 dark:border-slate-700`), crisp text with hover transitions.

### Category Filter Chips
- Rounded pill (`rounded-full`), mono font (`text-xs font-mono`), padding (`6px 14px`).
- In Light Mode: Unselected state is white glass with slate borders (`bg-white border-slate-300 text-slate-700 hover:border-sky-400`); selected state is solid cerulean (`bg-sky-500 text-white font-bold`).
- In Dark Mode: Unselected state is dark glass (`bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700`); selected state is solid cyan (`bg-cyan-400 text-slate-950 font-bold`).

### Cards / Containers
- Curvature radius of 24px (`rounded-3xl`) for top-level deck cards, 16px (`rounded-2xl`) for internal slide sub-cards.
- Background: High-density solar glass in Light Mode (`bg-white/95 backdrop-blur-xl`), cosmic glass in Dark Mode (`bg-[#060919]/92 backdrop-blur-xl`).
- Border: 1px hairline border with contextual spectral accent tint.

### Inputs / Search Field
- Container: `bg-white/90 dark:bg-slate-900/90`, 12px radius (`rounded-xl`), 1px border (`border-slate-300 dark:border-slate-800`), crisp placeholder text (`text-slate-500`), and instant glow transition on focus. Includes inline clear button (`✕`).

### Navigation & Telemetry
- **Hub Header:** Sticky navigation bar with glass backdrop blur (`bg-white/80 dark:bg-[#03050c]/85 backdrop-blur-md`), hairline bottom border (`border-b border-slate-200 dark:border-slate-800/80`), search input, telemetry statistics, and `ThemeToggle`.
- **Slide Stage Controller:** Docked lower controller housing act progress step-dots, slide scrubber, voiceover audio toggle, full-screen trigger, and view-mode switch (`Deck` vs `Scroll`).

### Cosmic Media Stage & Viewport
- Space photography, nebulae, galaxies, and interactive SVG diagrams are hosted within dedicated dark celestial viewports to ensure scientific authenticity and astronomical contrast across both light and dark site themes.

## Do's and Don'ts

### Do:
- **Do** support both Dark Mode ("The Deep-Space Planetarium") and Light Mode ("The Solar Celestial Atlas") with equal aesthetic dignity and craft.
- **Do** use Space Grotesk for major headings, Plus Jakarta Sans for body prose, and JetBrains Mono for all numbers, metrics, hotkey caps, and labels.
- **Do** maintain >=4.5:1 contrast ratio for all body copy and >=3:1 for large display elements across both themes.
- **Do** provide instant theme switching via `ThemeToggle` and global `T` hotkey without any flash of unstyled content (FOUC).
- **Do** use rounded glass containers (`backdrop-blur-xl`, 16px–24px radius) for all elevated UI elements.
- **Do** ensure all audio and video interactions respect browser autoplay restrictions and offer instant mute controls.

### Don't:
- **Don't** hardcode raw single-theme dark styles or raw `#03050c` on page surfaces without theme-adaptive classes (`bg-slate-50 dark:bg-[#03050c]`).
- **Don't** use opaque muddy drop shadows on surfaces; convey depth through glass opacity steps, fine borders, and luminescent glows.
- **Don't** mix random rainbow colors on a single slide; respect the semantic spectral accent assigned to the slide's Act.
- **Don't** use standard sans-serif fonts for slide numbers, timers, or technical metrics; always use JetBrains Mono.
- **Don't** create sharp 0px rectangular cards or thick clunky borders (>1px) that break the weightless celestial aesthetic.
