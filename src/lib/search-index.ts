import { GLOSSARY_TERMS } from "@/content/glossary"
import { RESOURCE_LINKS } from "@/content/resources"
import type { SearchEntry } from "@/content/schema"
import { getAllLessons } from "@/lib/lesson-content"

export function getSearchIndex(): readonly SearchEntry[] {
  const lessonEntries = getAllLessons().map((lesson) => ({
    kind: "lesson",
    title: lesson.title,
    href: `/lessons/${lesson.slug}`,
    summary: lesson.summary,
    keywords: [
      lesson.level,
      ...lesson.tags,
      ...lesson.sections.map((section) => section.title),
      ...lesson.sections.map((section) => section.content),
    ],
  })) satisfies readonly SearchEntry[]

  const glossaryEntries = GLOSSARY_TERMS.map((term) => ({
    kind: "glossary",
    title: term.term,
    href: "/glossary",
    summary: term.shortDefinition,
    keywords: [term.category, term.explanation, ...term.related],
  })) satisfies readonly SearchEntry[]

  const resourceEntries = RESOURCE_LINKS.map((resource) => ({
    kind: "resource",
    title: resource.title,
    href: resource.url,
    summary: resource.description,
    keywords: [resource.category, resource.url],
  })) satisfies readonly SearchEntry[]

  return [...lessonEntries, ...glossaryEntries, ...resourceEntries]
}
