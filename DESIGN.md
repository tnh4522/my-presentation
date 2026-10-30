---
name: my-presentation
description: Personal interactive web presentation hub featuring cinematic slide decks and deep-space storytelling
colors:
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
---

# Design System: my-presentation

## Overview

**Creative North Star: "The Deep-Space Planetarium"**

The design language of `my-presentation` evokes the hushed, reverent atmosphere of an optical planetarium or astronomical observatory at midnight. The interface recedes into an obsidian cosmic void (`#03050c`), punctuated only by a living canvas of twinkling starlight, rich photographic windows into deep space, and razor-sharp spectral telemetry lines. Rather than viewing slides as corporate office documents, the user steps into an expansive cosmic exhibition where every slide is an illuminated artifact floating in space.

Surfaces are crafted as dark semi-translucent glass slabs (`#060919` at 92% opacity with `backdrop-blur-xl`) bound by delicate 1px luminescent frontiers (`border-cyan-500/30`). High-chroma color is treated with absolute discipline: hue is never applied as arbitrary surface fill, but exclusively as emitted starlight—phosphorescent cyan, nebula indigo, and solar amber glows that indicate active states, telemetry measurements, and conceptual discoveries.

Visual density balances widescreen cinematic drama with technical rigor. Space Grotesk commands display titles with modern architectural geometry, Plus Jakarta Sans delivers warm, crystalline readability for explanations, and JetBrains Mono anchors timestamps, act numbers, and scientific readouts like instrument markings on an observatory console.

**Key Characteristics:**
- **Obsidian Abyssal Void:** The true black base (`#03050c`) absorbs the canvas and isolates content with zero visual noise.
- **Translucent Cosmic Glass:** Heavy backdrop blurs and subtle 1px luminous borders create weightless floating hierarchy.
- **Spectral Emission Accents:** Vibrant colors (cyan, indigo, amber, emerald) appear strictly as emitted photon energy on interactive nodes and badges.
- **Dual Presentation Topology:** Equal visual dignity between the cinematic single-slide stage (deck view) and the continuous long-form scroll (reading view).
- **Instrument Precision Typography:** Clear tripartite separation between architectural headings, warm reading prose, and monospaced telemetry.

## Colors

The palette is rooted in deep astrophysical darkness, contrasted against sharp stellar spectral emissions and crisp starlight neutrals.

### Primary
- **Cerenkov Cyan** (`#22d3ee` / `rgb(34, 211, 238)`): The primary energetic accent of the system. Used for primary CTA buttons, active slide number highlights, active tab chips, focus borders, and interactive SVG ray-tracing lines.
- **Cyan Glow** (`#67e8f9`): High-intensity photon emission used on button hover states, interactive node flares, and active drop-glows.
- **Cyan Void Tint** (`#082f49`): Deep translucent cyan background tint (`rgba(8, 47, 73, 0.45)`) used for telemetry badge backgrounds and highlighted key insight containers.

### Secondary
- **Deep Nebula Indigo** (`#818cf8`): Secondary accent representing cosmological depth. Used for secondary act badges, mathematics/paradox slide accents, and subtle secondary button borders.

### Tertiary
- **Solar Flare Amber** (`#fbbf24`): Warning and critical insight accent. Used for historical misconception callouts, paradox highlights, slide duration stats, and star luminosity badges.
- **Aurora Emerald** (`#34d399`): Resolution and scientific confirmation accent. Used for cosmological proofs, expanding universe resolutions, and positive status indicators.

### Neutral
- **Obsidian Void** (`#03050c`): Base canvas and background environment. Represents deep infinite space; applied to root `<body>` and header backing.
- **Cosmic Glass** (`#060919`): Semi-transparent dark slab surface background (`bg-[#060919]/92` or `bg-slate-900/60`). Houses slide cards, featured hero banners, modal sheets, and drawer panels.
- **Starlight White** (`#f1f5f9`): Primary high-contrast foreground text for titles, headings, and primary bullet labels.
- **Muted Nebula Slate** (`#94a3b8` / `#64748b`): Secondary descriptive text, speaker note metadata, unselected category tabs, and secondary body copy.
- **Instrument Border** (`#1e293b`): Subtle 1px structural framing for cards, table dividers, and inactive button boundaries.

### Named Rules
**The Emission-Only Rule.** The pitch-black void (`#03050c`) consumes ≥85% of any viewport. High-chroma accents (cyan, amber, emerald) exist exclusively as luminous emitters on interactive controls, active indicators, and spectral data points (<15% total screen weight). Rarity preserves celestial awe.

**The Spectral Role Rule.** Colors carry semantic physical meaning: Cyan denotes active exploration and current truth; Amber denotes astronomical paradoxes, traps, and historical queries; Indigo denotes mathematical models; Emerald denotes confirmed cosmological resolutions. Colors must not be randomly swapped across acts.

## Typography

**Display Font:** Space Grotesk (with `system-ui, -apple-system, sans-serif` fallback)
**Body Font:** Plus Jakarta Sans (with `system-ui, sans-serif` fallback)
**Label/Mono Font:** JetBrains Mono (with `ui-monospace, monospace` fallback)

**Character:** Space Grotesk brings geometric, wide-aperture architectural authority to titles and cosmic questions. Plus Jakarta Sans maintains neutral, warm legibility across long scientific descriptions and speaker notes. JetBrains Mono provides crisp, unvarnished instrument telemetry for coordinates, slide counters, act tags, and durations.

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

**The Subtitle Resonance Rule.** Slide subtitles must never repeat the heading color in neutral white. Subtitles take the act's active spectral accent color (e.g. `text-cyan-400` or `text-amber-400`), immediately establishing the thematic tone before the bullet points begin.

## Layout

The presentation layout adapts dynamically between two viewing modes across screen sizes, anchored within a maximum widescreen container width (`max-w-[1760px]`).

- **Presentation Stage (Deck Mode):** Optimized for zero-scroll viewport containment (`h-screen` or `100dvh`). The layout divides into a fixed top telemetry bar (48px–64px), a central stage housing the primary interactive slide card, and a bottom control dock with keyboard guides, slide thumbnails, and audio/voiceover triggers. The slide card itself divides into a 5-column textual/concept column and a 7-column interactive visual/media viewport on desktop (`lg:grid-cols-12`), collapsing into a stacked column on mobile.
- **Continuous Reading (Scroll Mode / Gamma View):** Optimized for editorial reading flow. Slide cards stack vertically with generous breathing space (`space-y-12 sm:space-y-16`) and comfortable min-height (`min-h-[82vh]`), allowing seamless mouse-wheel exploration through all 20 slides.
- **Home Hub Layout:** Features a high-impact widescreen featured presentation banner with split preview collage, followed by a responsive grid (`grid-cols-1 lg:grid-cols-2`) of presentation deck cards with direct act navigation jump links.
- **Spacing Scale:** Standard 4px grid multiplied across semantic steps: `xs: 6px`, `sm: 10px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `2xl: 48px`.

### Named Rules
**The Horizon-Anchored Frame Rule.** In presentation view, slide cards adapt to viewport constraints with sticky navigation, keeping the interactive slide canvas and primary media centered without window scroll.

**The Dual-Mode Parity Rule.** Every slide component must render with equal structural fidelity in both single-slide stage mode and continuous vertical scroll mode. No feature or interactive diagram may be omitted in either view.

## Elevation & Depth

Depth in `my-presentation` is created through optical glassmorphism and colored photon emissions rather than muddy drop shadows. The deep black void is infinite and flat; objects achieve z-depth through translucency, backdrop blur filters, fine luminous rims, and atmospheric glows.

### Shadow Vocabulary
- **Spectral Button Glow** (`box-shadow: 0 0 25px rgba(34, 211, 238, 0.45)`): Radiant photon aura on primary CTA buttons (`▶ Present Now`), indicating live energy and immediate interactivity.
- **Subtle Surface Rim Glow** (`box-shadow: 0 0 15px rgba(34, 211, 238, 0.2)`): Used on hovered presentation cards, active act chips, and focused search inputs.
- **Cosmic Card Isolation** (`box-shadow: 0 20px 70px -20px rgba(0, 0, 0, 0.85)`): Deep black ambient shadow that visually lifts glass slide cards above the animated starfield canvas.
- **Hero Starlight Flare** (`box-shadow: 0 25px 80px -20px rgba(34, 211, 238, 0.25)`): Wide diffuse aura anchoring the featured presentation hero banner.

### Named Rules
**The Spectral Aura Rule.** Surfaces never cast murky black physical drop-shadows onto the cosmos. Depth is communicated through glass translucency (`backdrop-blur-xl`), thin boundary lines, and chromatic aura glows (cyan glow on active/hover states).

**The Z-Plane Integrity Rule.** The visual stack maintains strict layer separation: Starfield canvas (`z-0`), Background video loops (`z-5`), Glass card stage (`z-10`), Header and control bars (`z-30`), Modal drawers and video player dialogs (`z-50`).

## Shapes

The form language combines celestial curves with precision instrumentation geometry.

- **Large Radii (24px to 32px / `rounded-2xl` to `rounded-3xl`):** Applied to primary slide cards, hero banners, and presentation deck overview cards, reflecting the gentle curvature of celestial horizons.
- **Medium Radii (12px to 16px / `rounded-xl` to `rounded-2xl`):** Applied to interactive buttons, visual media containers, input bars, and stat callout blocks.
- **Compact Radii (6px to 8px / `rounded-md` to `rounded-lg`):** Applied to slide number tags, sub-item bullets, and hotkey keyboard caps.
- **Full Pill Radii (`rounded-full` / `9999px`):** Applied strictly to category filters, act indicators, telemetry status chips, and circular playback buttons.
- **Borders & Rims:** 1px hairline boundaries (`border border-slate-800/80` transitioning to `border-cyan-500/40` on active states). Solid heavy borders are strictly prohibited.

### Named Rules
**The Planetary Arc Rule.** Major visual enclosures (cards, media viewports, banners) must use generous curvature (≥16px) echoing planetary bodies. Sharp 0px corners are reserved exclusively for code blocks and raw SVG diagram vectors.

## Components

### Buttons
- **Shape:** Softly curved corners (12px to 16px radius, `rounded-xl` to `rounded-2xl`).
- **Primary Action (`button-primary`):** Solid Cerenkov Cyan background (`#22d3ee`), obsidian text (`#03050c`), bold mono typography (`font-mono text-xs sm:text-sm font-bold`), padding (`10px 20px`), with active cyan aura glow (`box-shadow: 0 0 25px rgba(34, 211, 238, 0.45)`).
- **Primary Hover:** Vibrant Cyan Glow (`#67e8f9`), scale lift (`scale-[1.02]`), expanded shadow intensity.
- **Secondary / Glass (`button-secondary`):** Translucent cosmic glass (`bg-slate-900/90`), hairline instrument border (`border border-slate-700`), starlight text (`#f1f5f9`), with hover transition to cyan rim border (`hover:border-cyan-400`).
- **Ghost / Icon Buttons:** Unpadded or tight circular buttons (`p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60`).

### Chips
- **Category Filter Chips:** Rounded pill (`rounded-full`), mono font (`text-xs font-mono`), padding (`6px 14px`). Unselected state features dark glass (`bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700`); selected state ignites with solid Cerenkov Cyan (`bg-cyan-400 text-slate-950 font-bold`).
- **Telemetry & Act Chips:** Compact pill badges (`px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-cyan-500/40 bg-cyan-950/80 text-cyan-300`).

### Cards / Containers
- **Corner Style:** Curvature radius of 24px (`rounded-3xl`) for top-level deck cards, 16px (`rounded-2xl`) for internal slide sub-cards.
- **Background:** High-density cosmic glass (`#060919` at 92% opacity with `backdrop-blur-xl`).
- **Border:** 1px hairline border with contextual spectral accent tint (`border-cyan-500/30`, `border-amber-500/30`, or `border-slate-800/80`).
- **Internal Padding:** `16px 20px` on mobile, scaling to `24px 32px` on desktop.

### Inputs / Fields
- **Search Field:** High-density slate container (`bg-slate-900/90`), 12px radius (`rounded-xl`), 1px border (`border-slate-800`), crisp placeholder text (`text-slate-500`), and instant cyan glow transition on focus (`focus:border-cyan-400 focus:outline-none`). Includes inline clear button (`✕`).

### Navigation
- **Hub Header:** Sticky 64px (`h-16`) navigation bar with glass backdrop blur (`bg-[#03050c]/85 backdrop-blur-md`), hairline bottom border (`border-b border-slate-800/80`), brand logo glowing badge with gradient cyan/indigo flare, search bar, and live slide counter badge.
- **Slide Stage Controller:** Docked lower controller housing act progress step-dots, slide scrubber, voiceover audio toggle, full-screen trigger, and view-mode switch (`Deck` vs `Scroll`).

### Signature Component: The Cosmic Media Stage & Ambient Player
- **Visual Media Canvas:** Embedded 16:9 or auto-flex widescreen viewport capable of seamlessly swapping between high-resolution astrophotography, continuous loop 4K cosmic video backgrounds, and interactive SVG diagrams with ray-tracing animations.
- **Speaker Teleprompter Drawer:** Collapsible bottom drawer rendered in high-contrast cosmic glass (`bg-[#030612]/95 border-cyan-500/25`) featuring word-count estimation, speech synthesis audio playback (`SpeechSynthesisUtterance`), and copyable transcript notes.

## Do's and Don'ts

### Do:
- **Do** anchor every interface surface against the deep obsidian void (`#03050c`) with animated or static starfield texture.
- **Do** use Space Grotesk exclusively for major headings, Plus Jakarta Sans for body prose, and JetBrains Mono for all numbers, metrics, and labels.
- **Do** limit vivid chromatic accents (cyan, amber, emerald) to active controls, key insight badges, and interactive diagram vectors (<15% screen space).
- **Do** use rounded glass containers (`backdrop-blur-xl`, `border-slate-800/80`, 16px–24px radius) for all elevated UI elements.
- **Do** provide smooth transitions (`transition-all duration-300 ease-out`) on card hover states and view-mode toggles.
- **Do** ensure all audio and video interactions respect browser autoplay restrictions and offer instant mute controls.

### Don't:
- **Don't** introduce light-mode themes or white page backgrounds; the presentation identity is strictly nocturnal.
- **Don't** use opaque muddy drop shadows (`rgba(0,0,0,0.2)`) on dark surfaces; convey depth through glass opacity steps and colored luminescent glows.
- **Don't** mix random rainbow colors on a single slide; respect the semantic spectral accent assigned to the slide's Act.
- **Don't** use standard sans-serif fonts for slide numbers, timers, or technical metrics; always use JetBrains Mono.
- **Don't** create sharp 0px rectangular cards or thick clunky borders (>1px) that break the weightless celestial aesthetic.
