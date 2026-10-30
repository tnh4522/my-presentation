import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRESENTATIONS, getPresentationBySlug } from "../../data/presentations";
import { PresentationApp } from "../../components/PresentationApp";

export function generateStaticParams() {
  return PRESENTATIONS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/presentations/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const deck = getPresentationBySlug(slug);

  if (!deck) {
    return {
      title: "Presentation Not Found",
    };
  }

  const title = `${deck.title} — ${deck.subtitle}`;
  const description = deck.description;
  const ogImage = deck.ogImage || deck.coverImage;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: `/presentations/${deck.slug}`,
      title,
      description,
      siteName: "My Presentations",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${deck.title} - ${deck.subtitle}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PresentationPage(
  props: PageProps<"/presentations/[slug]">
) {
  const { slug } = await props.params;
  const deck = getPresentationBySlug(slug);

  if (!deck) {
    notFound();
  }

  return <PresentationApp deck={deck} />;
}
