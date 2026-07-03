import { readFileSync } from "node:fs"
import { join } from "node:path"
import { cache } from "react"
import { CURRICULUM_MODULES, LESSON_META } from "@/content/curriculum"
import {
  type CurriculumModule,
  LESSON_SECTION_DEFINITIONS,
  type Lesson,
  type LessonMeta,
  type LessonSection,
  type LessonSectionId,
} from "@/content/schema"

const LESSON_CONTENT_DIR = join(process.cwd(), "src", "content", "lessons", "markdown")
const HEADING_PATTERN = /^##\s+(.+?)\s*$/gm
const HEADING_TO_DEFINITION: ReadonlyMap<string, (typeof LESSON_SECTION_DEFINITIONS)[number]> =
  new Map(LESSON_SECTION_DEFINITIONS.map((section) => [section.title, section]))

export class LessonContentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LessonContentError"
  }
}

export type ModuleWithLessons = CurriculumModule & {
  readonly lessons: readonly LessonMeta[]
}

export function getSortedLessonMeta(): readonly LessonMeta[] {
  return [...LESSON_META].sort((left, right) => left.order - right.order)
}

export function getLessonMetaBySlug(slug: string): LessonMeta | undefined {
  return getSortedLessonMeta().find((lesson) => lesson.slug === slug)
}

export function getModuleById(moduleId: string): CurriculumModule | undefined {
  return CURRICULUM_MODULES.find((module) => module.id === moduleId)
}

export function getCurriculumModulesWithLessons(): readonly ModuleWithLessons[] {
  const lessons = getSortedLessonMeta()

  return [...CURRICULUM_MODULES]
    .sort((left, right) => left.order - right.order)
    .map((module) => ({
      ...module,
      lessons: lessons.filter((lesson) => lesson.moduleId === module.id),
    }))
}

export function getPreviousNextLessons(slug: string): {
  readonly previous: LessonMeta | undefined
  readonly next: LessonMeta | undefined
} {
  const lessons = getSortedLessonMeta()
  const index = lessons.findIndex((lesson) => lesson.slug === slug)

  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return {
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index < lessons.length - 1 ? lessons[index + 1] : undefined,
  }
}

export const getLessonBySlug = cache((slug: string): Lesson | undefined => {
  const meta = getLessonMetaBySlug(slug)

  if (meta === undefined) {
    return undefined
  }

  const markdown = readFileSync(join(LESSON_CONTENT_DIR, `${slug}.md`), "utf8")

  return {
    ...meta,
    sections: parseLessonMarkdown(slug, markdown),
  }
})

export const getAllLessons = cache((): readonly Lesson[] => {
  return getSortedLessonMeta().map((meta) => {
    const lesson = getLessonBySlug(meta.slug)

    if (lesson === undefined) {
      throw new LessonContentError(`Missing lesson content for ${meta.slug}`)
    }

    return lesson
  })
})

export function parseLessonMarkdown(slug: string, markdown: string): readonly LessonSection[] {
  const matches = Array.from(markdown.matchAll(HEADING_PATTERN))
  const sectionContent = new Map<LessonSectionId, string>()

  for (const [index, match] of matches.entries()) {
    const fullMatch = match[0]
    const headingTitle = match[1]
    const startIndex = match.index

    if (fullMatch === undefined || headingTitle === undefined || startIndex === undefined) {
      continue
    }

    const definition = HEADING_TO_DEFINITION.get(headingTitle)
    const nextMatch = matches[index + 1]
    const endIndex = nextMatch?.index ?? markdown.length

    if (definition !== undefined) {
      const contentStart = startIndex + fullMatch.length
      sectionContent.set(definition.id, markdown.slice(contentStart, endIndex).trim())
    }
  }

  return LESSON_SECTION_DEFINITIONS.map((definition) => {
    const content = sectionContent.get(definition.id)

    if (content === undefined) {
      throw new LessonContentError(`Lesson ${slug} is missing section: ${definition.title}`)
    }

    return {
      id: definition.id,
      title: definition.title,
      content,
    }
  })
}
