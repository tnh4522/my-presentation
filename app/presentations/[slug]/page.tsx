import { notFound } from "next/navigation";
import { PRESENTATIONS, getPresentationBySlug } from "../../data/presentations";
import { PresentationApp } from "../../components/PresentationApp";

export function generateStaticParams() {
  return PRESENTATIONS.map((p) => ({
    slug: p.slug,
  }));
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
