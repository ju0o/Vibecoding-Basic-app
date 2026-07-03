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

export type LessonSectionId = (typeof LESSON_SECTION_DEFINITIONS)[number]["id"]

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
  readonly title: string
  readonly summary: string
  readonly level: LessonLevel
  readonly minutes: number
  readonly tags: readonly string[]
  readonly checklist: readonly string[]
  readonly exercise: LessonExercise
}

export type LessonSection = {
  readonly id: LessonSectionId
  readonly title: string
  readonly content: string
}

export type Lesson = LessonMeta & {
  readonly sections: readonly LessonSection[]
}

export type LessonQuizQuestion = {
  readonly question: string
  readonly options: readonly string[]
  readonly answer: string
  readonly explanation: string
}

export type ExplanationPrompt = {
  readonly prompt: string
  readonly guide: readonly string[]
}

export type LessonExercise = {
  readonly quiz: LessonQuizQuestion
  readonly explanationPrompt: ExplanationPrompt
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
