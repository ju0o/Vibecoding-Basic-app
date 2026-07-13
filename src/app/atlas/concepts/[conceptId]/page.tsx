import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ATLAS_CONCEPTS } from "@/content/atlas"
import { LESSON_META } from "@/content/curriculum"
import { ChapterShell } from "@/features/atlas/ChapterShell"
import {
  getAtlasChapterSections,
  getAtlasConceptById,
  getPreviousNextAtlasConcepts,
  getSortedAtlasConcepts,
} from "@/lib/atlas"

type PageProps = {
  readonly params: Promise<{ readonly conceptId: string }>
}

export function generateStaticParams() {
  return ATLAS_CONCEPTS.map((concept) => ({ conceptId: concept.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conceptId } = await params
  const concept = getAtlasConceptById(conceptId)
  if (!concept) {
    return { title: "Concept not found" }
  }
  return {
    title: `${concept.order}. ${concept.title} | Atlas`,
    description: concept.shortDefinition,
  }
}

export default async function AtlasConceptPage({ params }: PageProps) {
  const { conceptId } = await params
  const concept = getAtlasConceptById(conceptId)
  const sections = getAtlasChapterSections(conceptId)

  if (!concept || !sections) {
    notFound()
  }

  const { previous, next } = getPreviousNextAtlasConcepts(conceptId)
  const deepenLessons = concept.lessonSlugs
    .map((slug) => LESSON_META.find((lesson) => lesson.slug === slug))
    .filter((lesson) => lesson !== undefined)

  return (
    <ChapterShell
      concept={concept}
      deepenLessons={deepenLessons}
      next={next}
      previous={previous}
      sections={sections}
      totalConcepts={getSortedAtlasConcepts().length}
    />
  )
}
