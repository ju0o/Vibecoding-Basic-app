import { ATLAS_CONCEPTS, type AtlasConcept } from "@/content/atlas"
import { type AtlasChapterSection, getAtlasChapterSections } from "@/lib/atlas"
import {
  type CompletenessBreakdown,
  calculateConceptCompleteness,
  getRecommendedNextTasks,
  type RecommendedTask,
} from "@/lib/atlas/completeness"
import {
  type ContentOverallStatus,
  type ContentSectionStatus,
  type ContentSourceStatus,
  classifySectionStatus,
  deriveOverallStatus,
  deriveSourceStatus,
  type InferredWorkflowStage,
  inferWorkflowStage,
  summarizeSectionStatuses,
} from "@/lib/atlas/content-status"

export type AtlasSectionManifest = {
  readonly id: string
  readonly title: string
  readonly status: ContentSectionStatus
  readonly charCount: number
  readonly preview: string
}

export type AtlasContentManifestEntry = {
  readonly conceptId: string
  readonly slug: string
  readonly order: number
  readonly title: string
  readonly arc: string
  readonly stageLabel: string
  readonly chapterPath: string
  readonly studentRoute: string
  readonly studioRoute: string
  readonly sectionStatuses: readonly AtlasSectionManifest[]
  readonly sectionComplete: number
  readonly sectionPartial: number
  readonly sectionMissing: number
  readonly passport: boolean
  readonly whyBridge: boolean
  readonly hasQuiz: boolean
  readonly hasInteractive: boolean
  readonly quizIds: readonly string[]
  readonly interactiveAssetIds: readonly string[]
  readonly wikiIds: readonly string[]
  readonly kbIds: readonly string[]
  readonly lessonSlugs: readonly string[]
  readonly sourceStatus: ContentSourceStatus
  readonly overallStatus: ContentOverallStatus
  readonly completeness: CompletenessBreakdown
  readonly workflowStage: InferredWorkflowStage
  readonly workflowInferred: true
  readonly recommendations: readonly RecommendedTask[]
  readonly whyBridgeText: string
  readonly shortDefinition: string
  readonly previousConceptId: string | null
  readonly nextConceptId: string | null
  readonly subordinateRoutes: readonly { readonly href: string; readonly label: string }[]
}

const INTERACTIVE_BY_CONCEPT: Readonly<Record<string, readonly string[]>> = {
  orchestration: ["model-routing-simulator", "routing-diagram"],
  llm: ["step-player-framework"],
  "prompt-engineering": ["step-player-framework"],
  rag: ["step-player-framework"],
  "tool-calling": ["step-player-framework"],
  mcp: ["step-player-framework"],
  agent: ["step-player-framework"],
  evaluation: ["step-player-framework"],
}

function sectionPreview(content: string): string {
  const cleaned = content.replace(/<!-- partial -->/g, "").trim()
  return cleaned.length > 160 ? `${cleaned.slice(0, 160)}…` : cleaned
}

export function buildManifestEntry(
  concept: AtlasConcept,
  sections: readonly AtlasChapterSection[],
): AtlasContentManifestEntry {
  const summary = summarizeSectionStatuses(sections)
  const sectionStatuses: AtlasSectionManifest[] = sections.map((section) => ({
    id: section.id,
    title: section.title,
    status: classifySectionStatus(section),
    charCount: section.content.trim().length,
    preview: sectionPreview(section.content),
  }))

  const hasPassport = Boolean(concept.shortDefinition && concept.question)
  const hasWhyBridge = concept.whyBridge.trim().length > 10
  const hasQuiz = true // checkpoint UI always present on concept page
  const interactiveAssetIds = INTERACTIVE_BY_CONCEPT[concept.id] ?? []
  const hasInteractive = interactiveAssetIds.length > 0 || concept.id === "orchestration"
  const wikiIds = concept.glossaryTerms
  const kbIds = concept.kbIds
  const lessonSlugs = concept.lessonSlugs

  const sourceStatus = deriveSourceStatus({
    kbCount: kbIds.length,
    lessonCount: lessonSlugs.length,
    hasBlockedSection: summary.blocked > 0,
  })

  const overallStatus = deriveOverallStatus({
    sectionComplete: summary.complete,
    sectionTotal: sections.length,
    hasBlocked: summary.blocked > 0,
    hasQuiz,
    hasWhyBridge,
    hasPassport,
  })

  const completeness = calculateConceptCompleteness({
    sectionStatuses: summary.statuses,
    hasPassport,
    hasWhyBridge,
    hasQuiz,
    kbCount: kbIds.length,
    lessonCount: lessonSlugs.length,
    wikiCount: wikiIds.length,
    hasInteractive,
  })

  const recommendations = getRecommendedNextTasks({
    sectionStatuses: sectionStatuses.map((s) => ({
      id: s.id,
      title: s.title,
      status: s.status,
    })),
    overall: overallStatus,
    sourceStatus,
    hasQuiz,
    hasInteractive,
    kbCount: kbIds.length,
  })

  const workflowStage = inferWorkflowStage({
    overall: overallStatus,
    source: sourceStatus,
    sectionComplete: summary.complete,
  })

  return {
    conceptId: concept.id,
    slug: concept.slug,
    order: concept.order,
    title: concept.title,
    arc: concept.arc,
    stageLabel: concept.stageLabel,
    chapterPath: `src/content/atlas/chapters/${concept.id}.md`,
    studentRoute: `/atlas/concepts/${concept.id}`,
    studioRoute: `/atlas/studio/concepts/${concept.id}`,
    sectionStatuses,
    sectionComplete: summary.complete,
    sectionPartial: summary.partial,
    sectionMissing: summary.missing,
    passport: hasPassport,
    whyBridge: hasWhyBridge,
    hasQuiz,
    hasInteractive,
    quizIds: hasQuiz ? [`checkpoint-${concept.id}`] : [],
    interactiveAssetIds,
    wikiIds,
    kbIds,
    lessonSlugs,
    sourceStatus,
    overallStatus,
    completeness,
    workflowStage,
    workflowInferred: true,
    recommendations,
    whyBridgeText: concept.whyBridge,
    shortDefinition: concept.shortDefinition,
    previousConceptId: concept.previousConceptId,
    nextConceptId: concept.nextConceptId,
    subordinateRoutes: concept.subordinateRoutes ?? [],
  }
}

/** Server/build-time only (uses chapter loader with fs). */
export function buildAtlasContentManifest(): readonly AtlasContentManifestEntry[] {
  return ATLAS_CONCEPTS.map((concept) => {
    const sections = getAtlasChapterSections(concept.id) ?? []
    return buildManifestEntry(concept, sections)
  }).sort((a, b) => a.order - b.order)
}

export type StudioSummary = {
  readonly totalConcepts: number
  readonly complete: number
  readonly partial: number
  readonly missing: number
  readonly blocked: number
  readonly sourceVerified: number
  readonly sourcePending: number
  readonly withQuiz: number
  readonly withInteractive: number
  readonly averageCompleteness: number
}

export function summarizeManifest(entries: readonly AtlasContentManifestEntry[]): StudioSummary {
  const total = entries.length
  const complete = entries.filter((e) => e.overallStatus === "complete").length
  const partial = entries.filter((e) => e.overallStatus === "partial").length
  const missing = entries.filter((e) => e.overallStatus === "missing").length
  const blocked = entries.filter((e) => e.overallStatus === "blocked_by_source").length
  const sourceVerified = entries.filter((e) => e.sourceStatus === "verified").length
  const sourcePending = entries.filter(
    (e) => e.sourceStatus === "pending" || e.sourceStatus === "missing",
  ).length
  const withQuiz = entries.filter((e) => e.hasQuiz).length
  const withInteractive = entries.filter((e) => e.hasInteractive).length
  const averageCompleteness =
    total === 0
      ? 0
      : Math.round(entries.reduce((sum, e) => sum + e.completeness.overallPercent, 0) / total)

  return {
    totalConcepts: total,
    complete,
    partial,
    missing,
    blocked,
    sourceVerified,
    sourcePending,
    withQuiz,
    withInteractive,
    averageCompleteness,
  }
}

export type InventoryRow = {
  readonly contentType: string
  readonly sourcePath: string
  readonly conceptId: string
  readonly status: string
  readonly usedBy: string
}

export function buildContentInventory(
  entries: readonly AtlasContentManifestEntry[],
): readonly InventoryRow[] {
  const rows: InventoryRow[] = []
  for (const entry of entries) {
    rows.push({
      contentType: "Chapter",
      sourcePath: entry.chapterPath,
      conceptId: entry.conceptId,
      status: entry.overallStatus,
      usedBy: entry.studentRoute,
    })
    rows.push({
      contentType: "Concept metadata",
      sourcePath: "src/content/atlas.ts",
      conceptId: entry.conceptId,
      status: entry.overallStatus,
      usedBy: entry.studentRoute,
    })
    for (const lesson of entry.lessonSlugs) {
      rows.push({
        contentType: "Textbook lesson",
        sourcePath: `src/content/lessons/markdown (slug=${lesson})`,
        conceptId: entry.conceptId,
        status: "linked",
        usedBy: `/lessons/${lesson}`,
      })
    }
    for (const kb of entry.kbIds) {
      rows.push({
        contentType: "KB evidence",
        sourcePath: `ai-ops/knowledge-base/entries/**/${kb}.md`,
        conceptId: entry.conceptId,
        status: entry.sourceStatus,
        usedBy: entry.studentRoute,
      })
    }
  }
  rows.push({
    contentType: "Model Routing units",
    sourcePath: "src/content/model-routing/units.ts",
    conceptId: "orchestration",
    status: "complete",
    usedBy: "/model-routing",
  })
  rows.push({
    contentType: "Model Routing simulator",
    sourcePath: "src/features/model-routing/TaskRouterSimulator.tsx",
    conceptId: "orchestration",
    status: "complete",
    usedBy: "/model-routing/simulator",
  })
  rows.push({
    contentType: "Timeline",
    sourcePath: "src/content/atlas/timeline.ts",
    conceptId: "—",
    status: "partial",
    usedBy: "/atlas/timeline",
  })
  rows.push({
    contentType: "Graph edges",
    sourcePath: "src/content/model-routing/graph.ts + concept prev/next",
    conceptId: "—",
    status: "partial",
    usedBy: "/atlas/graph",
  })
  return rows
}
