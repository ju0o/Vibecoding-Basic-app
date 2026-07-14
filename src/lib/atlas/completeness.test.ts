import { describe, expect, it } from "vitest"
import type { AtlasConcept } from "@/content/atlas"
import type { AtlasChapterSection } from "@/lib/atlas"
import {
  COMPLETENESS_WEIGHTS,
  calculateConceptCompleteness,
  getRecommendedNextTasks,
} from "@/lib/atlas/completeness"
import { buildManifestEntry } from "@/lib/atlas/content-manifest"
import {
  classifySectionStatus,
  deriveOverallStatus,
  deriveSourceStatus,
} from "@/lib/atlas/content-status"

function section(id: string, title: string, content: string): AtlasChapterSection {
  return {
    id: id as AtlasChapterSection["id"],
    title,
    content,
    empty: content.length === 0 || content.includes("<!-- partial -->"),
  }
}

describe("section status", () => {
  it("classifies complete partial missing blocked", () => {
    expect(
      classifySectionStatus(
        section("definition", "한 줄 정의", "충분히 긴 본문입니다. 여기 내용이 있습니다."),
      ),
    ).toBe("complete")
    expect(
      classifySectionStatus(section("real-cases", "실제 사례", "<!-- partial -->\n짧게")),
    ).toBe("partial")
    expect(classifySectionStatus(section("quiz", "퀴즈", ""))).toBe("missing")
    expect(
      classifySectionStatus(
        section("companies", "대표 기업", "status=blocked_by_source 출처 필요"),
      ),
    ).toBe("blocked_by_source")
  })
})

describe("completeness weights", () => {
  it("sums to 100", () => {
    const sum = Object.values(COMPLETENESS_WEIGHTS).reduce((a, b) => a + b, 0)
    expect(sum).toBe(100)
  })

  it("scores high when all assets present", () => {
    const statuses = Array.from({ length: 14 }, () => "complete" as const)
    const result = calculateConceptCompleteness({
      sectionStatuses: statuses,
      hasPassport: true,
      hasWhyBridge: true,
      hasQuiz: true,
      kbCount: 3,
      lessonCount: 2,
      wikiCount: 2,
      hasInteractive: true,
    })
    expect(result.overallPercent).toBeGreaterThanOrEqual(95)
  })

  it("scores low when mostly missing", () => {
    const statuses = Array.from({ length: 14 }, () => "missing" as const)
    const result = calculateConceptCompleteness({
      sectionStatuses: statuses,
      hasPassport: false,
      hasWhyBridge: false,
      hasQuiz: false,
      kbCount: 0,
      lessonCount: 0,
      wikiCount: 0,
      hasInteractive: false,
    })
    expect(result.overallPercent).toBe(0)
  })
})

describe("recommendations", () => {
  it("suggests content writer for missing sections", () => {
    const tasks = getRecommendedNextTasks({
      sectionStatuses: [{ id: "real-cases", title: "실제 사례", status: "missing" }],
      overall: "partial",
      sourceStatus: "partial",
      hasQuiz: true,
      hasInteractive: true,
      kbCount: 2,
    })
    expect(tasks.some((t) => t.recommendedAgent === "atlas-content-writer")).toBe(true)
  })

  it("suggests researcher when source pending", () => {
    const tasks = getRecommendedNextTasks({
      sectionStatuses: [],
      overall: "partial",
      sourceStatus: "pending",
      hasQuiz: true,
      hasInteractive: true,
      kbCount: 0,
    })
    expect(tasks.some((t) => t.recommendedAgent === "atlas-source-researcher")).toBe(true)
  })

  it("suggests interaction designer when interaction missing", () => {
    const tasks = getRecommendedNextTasks({
      sectionStatuses: [],
      overall: "partial",
      sourceStatus: "verified",
      hasQuiz: true,
      hasInteractive: false,
      kbCount: 2,
    })
    expect(tasks.some((t) => t.recommendedAgent === "atlas-interaction-designer")).toBe(true)
  })
})

describe("overall and source", () => {
  it("derives blocked and complete", () => {
    expect(
      deriveOverallStatus({
        sectionComplete: 14,
        sectionTotal: 14,
        hasBlocked: true,
        hasQuiz: true,
        hasWhyBridge: true,
        hasPassport: true,
      }),
    ).toBe("blocked_by_source")
    expect(
      deriveOverallStatus({
        sectionComplete: 14,
        sectionTotal: 14,
        hasBlocked: false,
        hasQuiz: true,
        hasWhyBridge: true,
        hasPassport: true,
      }),
    ).toBe("complete")
  })

  it("derives source status", () => {
    expect(deriveSourceStatus({ kbCount: 0, lessonCount: 0, hasBlockedSection: false })).toBe(
      "missing",
    )
    expect(deriveSourceStatus({ kbCount: 2, lessonCount: 1, hasBlockedSection: false })).toBe(
      "verified",
    )
  })
})

describe("manifest entry", () => {
  it("builds entry without duplicating SSOT paths incorrectly", () => {
    const concept = {
      id: "llm",
      slug: "llm",
      order: 5,
      title: "LLM",
      shortDefinition: "대규모 언어 모델",
      arc: "generation",
      stageLabel: "생성",
      question: "왜?",
      limitationOfPrevious: "이전",
      breakthrough: "돌파",
      whyBridge: "다음 기술이 필요한 이유입니다.",
      previousConceptId: "generative-ai",
      nextConceptId: "prompt-engineering",
      lessonSlugs: ["tokenization-and-context"],
      glossaryTerms: ["Token"],
      kbIds: ["tokenization-context"],
      status: "partial",
    } as AtlasConcept

    const sections = Array.from({ length: 14 }, (_, i) =>
      section(
        `s${i}`,
        `Title ${i}`,
        i < 4 ? "충분히 긴 교육용 본문 텍스트입니다." : "<!-- partial -->\n부분",
      ),
    )
    // Fix ids to match real contract ids for first four only for this unit test shape
    const realIds = [
      "definition",
      "why-emerged",
      "previous-limits",
      "what-it-solved",
      "real-cases",
      "companies",
      "services",
      "in-projects",
      "animation",
      "diagram",
      "practice",
      "quiz",
      "related-tech",
      "next-tech",
    ] as const
    const mapped: AtlasChapterSection[] = sections.map((s, i) => {
      const id = realIds[i] ?? "definition"
      return {
        ...s,
        id: id as AtlasChapterSection["id"],
        title: id,
      }
    })

    const entry = buildManifestEntry(concept, mapped)
    expect(entry.chapterPath).toBe("src/content/atlas/chapters/llm.md")
    expect(entry.studentRoute).toBe("/atlas/concepts/llm")
    expect(entry.studioRoute).toBe("/atlas/studio/concepts/llm")
    expect(entry.sectionComplete).toBeGreaterThanOrEqual(4)
    expect(entry.recommendations.length).toBeGreaterThan(0)
    expect(entry.workflowInferred).toBe(true)
  })
})
