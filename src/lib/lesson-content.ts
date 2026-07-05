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
} from "@/content/schema"

const LESSON_CONTENT_DIR = join(process.cwd(), "src", "content", "lessons", "markdown")
const HEADING_PATTERN = /^##\s+(.+?)\s*$/gm
const SUBHEADING_PATTERN = /^###\s+(.+?)\s*$/gm

const LEGACY_LESSON_SECTION_DEFINITIONS = [
  { id: "today", title: "오늘 배울 것" },
  { id: "one-line", title: "한 줄 정의" },
  { id: "analogy", title: "쉬운 비유" },
  { id: "origin", title: "왜 생겼는가" },
  { id: "problem", title: "어떤 문제를 해결하는가" },
  { id: "core", title: "핵심 개념" },
  { id: "real-example", title: "실제 예시" },
  { id: "code-example", title: "코드 예시" },
  { id: "ai-meaning", title: "AI 시대에서의 의미" },
  { id: "confusions", title: "자주 헷갈리는 것" },
  { id: "practice", title: "실무에서 쓰는 방식" },
  { id: "checklist", title: "공부 체크리스트" },
  { id: "references", title: "참고 출처" },
] as const

type SectionDefinition = {
  readonly id: string
  readonly title: string
}

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

export function getRelatedLessons(slug: string, limit = 3): readonly LessonMeta[] {
  const lesson = getLessonMetaBySlug(slug)

  if (lesson === undefined) {
    return []
  }

  const lessonTags = new Set(lesson.tags)

  return getSortedLessonMeta()
    .filter((candidate) => candidate.slug !== slug)
    .map((candidate) => ({
      lesson: candidate,
      score: candidate.tags.filter((tag) => lessonTags.has(tag)).length,
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => right.score - left.score || left.lesson.order - right.lesson.order)
    .slice(0, limit)
    .map((candidate) => candidate.lesson)
}

export const getLessonBySlug = cache((slug: string): Lesson | undefined => {
  const meta = getLessonMetaBySlug(slug)

  if (meta === undefined) {
    return undefined
  }

  const markdown = preprocessLessonMarkdown(
    readFileSync(join(LESSON_CONTENT_DIR, `${slug}.md`), "utf8"),
  )

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
  const transformedMarkdown = preprocessLessonMarkdown(markdown)
  const v2Sections = parseWithDefinitions(transformedMarkdown, LESSON_SECTION_DEFINITIONS)

  if (v2Sections !== undefined) {
    return v2Sections
  }

  const legacySections = parseWithDefinitions(
    transformedMarkdown,
    LEGACY_LESSON_SECTION_DEFINITIONS,
  )

  if (legacySections !== undefined) {
    // TODO(R3): remove this V1 fallback after all released lessons are regenerated to V2.
    return legacySections
  }

  throw new LessonContentError(`Lesson ${slug} is missing V2 sections`)
}

export function preprocessLessonMarkdown(markdown: string): string {
  const lines = markdown.split("\n")
  let inCodeFence = false

  return lines
    .map((line) => {
      if (line.trimStart().startsWith("```")) {
        inCodeFence = !inCodeFence
        return line
      }

      if (inCodeFence) {
        return line
      }

      return line.replaceAll(/==([^=\n]+)==/g, "<mark>$1</mark>")
    })
    .join("\n")
}

export function slugifyHeading(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[`"'~!@#$%^&*()+=[\]{}\\|;:,.<>/?]/g, "")
    .replaceAll(/\s+/g, "-")
}

function parseWithDefinitions(
  markdown: string,
  definitions: readonly SectionDefinition[],
): readonly LessonSection[] | undefined {
  const matches = Array.from(markdown.matchAll(HEADING_PATTERN))
  const headingToDefinition: ReadonlyMap<string, SectionDefinition> = new Map(
    definitions.map((section) => [section.title, section]),
  )
  const sectionContent = new Map<string, string>()

  for (const [index, match] of matches.entries()) {
    const fullMatch = match[0]
    const headingTitle = match[1]
    const startIndex = match.index

    if (fullMatch === undefined || headingTitle === undefined || startIndex === undefined) {
      continue
    }

    const definition = headingToDefinition.get(headingTitle)
    const nextMatch = matches[index + 1]
    const endIndex = nextMatch?.index ?? markdown.length

    if (definition !== undefined) {
      const contentStart = startIndex + fullMatch.length
      sectionContent.set(definition.id, markdown.slice(contentStart, endIndex).trim())
    }
  }

  const sectionList: LessonSection[] = []

  for (const definition of definitions) {
    const content = sectionContent.get(definition.id)

    if (content === undefined) {
      return undefined
    }

    sectionList.push({
      id: definition.id,
      title: definition.title,
      content,
      subheadings: Array.from(content.matchAll(SUBHEADING_PATTERN)).map((match) => {
        const title = match[1] ?? ""

        return {
          id: slugifyHeading(title),
          title,
        }
      }),
    })
  }

  return sectionList
}
