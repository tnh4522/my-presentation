import { SLIDES, ACTS, SlideData, SlideAccent } from "./slides";

export interface PresentationAct {
  number: number;
  title: string;
  slides: number[];
}

export interface PresentationDeck {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level?: string;
  coverImage: string;
  ogImage?: string;
  videoPreview?: string;
  accent: SlideAccent;
  tags: string[];
  slideCount: number;
  estimatedMinutes: number;
  updatedAt: string;
  featured?: boolean;
  slides: SlideData[];
  acts: PresentationAct[];
}

export const PRESENTATIONS: PresentationDeck[] = [
  {
    slug: "why-is-the-night-sky-dark",
    title: "Why Is the Night Sky Dark?",
    subtitle: "Olbers' Paradox & The Secret of Our Universe",
    description:
      "A 20-slide cinematic deep-space presentation exploring how a simple question about the dark night sky confused astronomers for 100 years and revealed that our universe had a beginning.",
    category: "Astronomy & Cosmology",
    coverImage:
      "/images/night-sky-dark/04-Dunkery-Beacon-Keith-Trueman-d4dd113-e1597842367814.webp",
    ogImage: "/images/night-sky-dark/og-cover.png",
    videoPreview: "/videos/night-sky-dark/interstellar.mp4",
    accent: "cyan",
    tags: [
      "Olbers' Paradox",
      "Big Bang",
      "Cosmology",
      "Voiceover Notes",
    ],
    slideCount: SLIDES.length,
    estimatedMinutes: 6,
    updatedAt: "2026-10-26",
    featured: true,
    slides: SLIDES,
    acts: ACTS,
  },
];

export function getPresentationBySlug(
  slug: string
): PresentationDeck | undefined {
  return PRESENTATIONS.find((p) => p.slug === slug);
}
