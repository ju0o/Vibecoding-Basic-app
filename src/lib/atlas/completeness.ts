import type { ContentOverallStatus, ContentSectionStatus } from "@/lib/atlas/content-status"

/** Explicit weights — must sum to 100. */
export const COMPLETENESS_WEIGHTS = {
  sections: 40,
  passport: 10,
  whyBridge: 10,
  quiz: 10,
  sources: 10,
  interactive: 10,
  wikiKb: 10,
} as const

export type CompletenessBreakdown = {
  readonly overallPercent: number
  readonly weights: typeof COMPLETENESS_WEIGHTS
  readonly parts: {
    readonly sections: { readonly score: number; readonly complete: number; readonly total: number }
    readonly passport: { readonly score: number; readonly present: boolean }
    readonly whyBridge: { readonly score: number; readonly present: boolean }
    readonly quiz: { readonly score: number; readonly present: boolean }
    readonly sources: {
      readonly score: number
      readonly kbCount: number
      readonly lessonCount: number
    }
    readonly interactive: { readonly score: number; readonly present: boolean }
    readonly wikiKb: {
      readonly score: number
      readonly wikiCount: number
      readonly kbCount: number
    }
  }
}

export function calculateConceptCompleteness(input: {
  readonly sectionStatuses: readonly ContentSectionStatus[]
  readonly hasPassport: boolean
  readonly hasWhyBridge: boolean
  readonly hasQuiz: boolean
  readonly kbCount: number
  readonly lessonCount: number
  readonly wikiCount: number
  readonly hasInteractive: boolean
}): CompletenessBreakdown {
  const total = input.sectionStatuses.length || 14
  const completeSections = input.sectionStatuses.filter((s) => s === "complete").length
  const sectionRatio = completeSections / total

  const sectionsScore = Math.round(COMPLETENESS_WEIGHTS.sections * sectionRatio)
  const passportScore = input.hasPassport ? COMPLETENESS_WEIGHTS.passport : 0
  const whyScore = input.hasWhyBridge ? COMPLETENESS_WEIGHTS.whyBridge : 0
  const quizScore = input.hasQuiz ? COMPLETENESS_WEIGHTS.quiz : 0
  const sourceRatio = Math.min(1, input.kbCount / 2) * 0.7 + Math.min(1, input.lessonCount) * 0.3
  const sourcesScore = Math.round(COMPLETENESS_WEIGHTS.sources * sourceRatio)
  const interactiveScore = input.hasInteractive ? COMPLETENESS_WEIGHTS.interactive : 0
  const wikiKbRatio =
    Math.min(1, input.wikiCount > 0 ? 1 : 0) * 0.4 + Math.min(1, input.kbCount / 2) * 0.6
  const wikiKbScore = Math.round(COMPLETENESS_WEIGHTS.wikiKb * wikiKbRatio)

  const overallPercent = Math.min(
    100,
    sectionsScore +
      passportScore +
      whyScore +
      quizScore +
      sourcesScore +
      interactiveScore +
      wikiKbScore,
  )

  return {
    overallPercent,
    weights: COMPLETENESS_WEIGHTS,
    parts: {
      sections: { score: sectionsScore, complete: completeSections, total },
      passport: { score: passportScore, present: input.hasPassport },
      whyBridge: { score: whyScore, present: input.hasWhyBridge },
      quiz: { score: quizScore, present: input.hasQuiz },
      sources: {
        score: sourcesScore,
        kbCount: input.kbCount,
        lessonCount: input.lessonCount,
      },
      interactive: { score: interactiveScore, present: input.hasInteractive },
      wikiKb: {
        score: wikiKbScore,
        wikiCount: input.wikiCount,
        kbCount: input.kbCount,
      },
    },
  }
}

export type RecommendedTask = {
  readonly priority: number
  readonly title: string
  readonly reason: string
  readonly recommendedAgent:
    | "atlas-content-writer"
    | "atlas-source-researcher"
    | "atlas-interaction-designer"
    | "atlas-curriculum-architect"
    | "atlas-implementer"
    | "main"
}

export function getRecommendedNextTasks(input: {
  readonly sectionStatuses: readonly {
    readonly id: string
    readonly title: string
    readonly status: ContentSectionStatus
  }[]
  readonly overall: ContentOverallStatus
  readonly sourceStatus: string
  readonly hasQuiz: boolean
  readonly hasInteractive: boolean
  readonly kbCount: number
}): readonly RecommendedTask[] {
  const tasks: RecommendedTask[] = []
  let priority = 1

  for (const section of input.sectionStatuses) {
    if (section.status === "missing" || section.status === "partial") {
      tasks.push({
        priority: priority++,
        title: `§ ${section.title} 보강`,
        reason: `section status=${section.status}`,
        recommendedAgent: "atlas-content-writer",
      })
    }
    if (section.status === "blocked_by_source") {
      tasks.push({
        priority: priority++,
        title: `§ ${section.title} 출처 확보`,
        reason: "blocked_by_source",
        recommendedAgent: "atlas-source-researcher",
      })
    }
  }

  if (input.sourceStatus === "pending" || input.sourceStatus === "missing" || input.kbCount < 1) {
    tasks.push({
      priority: priority++,
      title: "KB / 공식 출처 검증",
      reason: `sourceStatus=${input.sourceStatus}`,
      recommendedAgent: "atlas-source-researcher",
    })
  }

  if (!input.hasQuiz) {
    tasks.push({
      priority: priority++,
      title: "Quiz / Checkpoint 추가",
      reason: "quiz missing",
      recommendedAgent: "atlas-content-writer",
    })
  }

  if (!input.hasInteractive) {
    tasks.push({
      priority: priority++,
      title: "Interactive asset 연결 (StepPlayer / diagram / simulator)",
      reason: "interaction missing",
      recommendedAgent: "atlas-interaction-designer",
    })
  }

  if (tasks.length === 0) {
    tasks.push({
      priority: 1,
      title: "표본 리뷰 및 QA 재확인",
      reason: "no gaps detected by rules",
      recommendedAgent: "main",
    })
  }

  return tasks.slice(0, 6)
}
