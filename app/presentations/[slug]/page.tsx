import { Suspense } from "react";
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

async function PresentationContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deck = getPresentationBySlug(slug);

  if (!deck) {
    notFound();
  }

  return <PresentationApp deck={deck} />;
}

export default function PresentationPage(
  props: PageProps<"/presentations/[slug]">
) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#03050c] flex items-center justify-center">
          <div className="w-9 h-9 border-2 border-sky-500 dark:border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PresentationContent params={props.params} />
    </Suspense>
  );
}
