export const MODULE_IDS = [
  "getting-started",
  "development-basics",
  "web-basics",
  "frontend-frameworks",
  "git-collaboration",
  "data-backend",
  "deployment-ops",
  "ai-basics",
  "ai-coding-tools",
  "ai-system-design",
  "practical-vibe-coding",
  "explanation-practice",
  "project-textbook",
] as const

export type ModuleId = (typeof MODULE_IDS)[number]

export const LESSON_SECTION_DEFINITIONS = [
  { id: "definition", title: "한 줄 정의" },
  { id: "why", title: "왜 존재하는가" },
  { id: "how-it-works", title: "작동 원리" },
  { id: "spec", title: "스펙과 세부" },
  { id: "primary-sources", title: "원문으로 읽기" },
  { id: "in-practice", title: "실전에서" },
  { id: "limits", title: "한계와 트레이드오프" },
  { id: "further-reading", title: "더 읽기" },
] as const

export type LessonSectionId = (typeof LESSON_SECTION_DEFINITIONS)[number]["id"]
export type LessonType = "deep-dive" | "reference"

export type CurriculumModule = {
  readonly id: ModuleId
  readonly order: number
  readonly title: string
  readonly description: string
  readonly goal: string
}

export type LessonLevel = "입문" | "기초" | "중급"

export type LessonMeta = {
  readonly slug: string
  readonly moduleId: ModuleId
  readonly order: number
  readonly type: LessonType
  readonly title: string
  readonly summary: string
  readonly level: LessonLevel
  readonly minutes: number
  readonly tags: readonly string[]
}

export type LessonSubheading = {
  readonly id: string
  readonly title: string
}

export type LessonSection = {
  readonly id: string
  readonly title: string
  readonly content: string
  readonly subheadings: readonly LessonSubheading[]
}

export type Lesson = LessonMeta & {
  readonly sections: readonly LessonSection[]
}

export type GlossaryTerm = {
  readonly term: string
  readonly category: string
  readonly shortDefinition: string
  readonly explanation: string
  readonly related: readonly string[]
}

export type ResourceLink = {
  readonly title: string
  readonly description: string
  readonly url: string
  readonly category: string
}

export type SearchEntryKind = "lesson" | "glossary" | "resource"

export type SearchEntry = {
  readonly kind: SearchEntryKind
  readonly title: string
  readonly href: string
  readonly summary: string
  readonly keywords: readonly string[]
}
