# my-presentation

Personal interactive web presentation hub built with Next.js, React, and Tailwind CSS.

## Current Presentations

1. **Why Is the Night Sky Dark?** (*Olbers' Paradox & The Secret of Our Universe*)
   - **Level:** B1 English
   - **Slides:** 20 interactive slides with real astronomy photography, deep-space video, interactive SVG diagrams, and built-in Speaker Notes / Voiceover (TTS).
   - **Route:** `/presentations/why-is-the-night-sky-dark` (or launch directly from the Home Hub `/`).

## Adding New Presentations

Register new presentation decks in `app/data/presentations.ts` inside the `PRESENTATIONS` array. Each presentation automatically appears on the Home Hub (`/`) and gets its own static route at `/presentations/[slug]`.

## Running Locally

```powershell
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
