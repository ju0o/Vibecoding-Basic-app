import type { AtlasChapterSection } from "@/lib/atlas"

export type ContentSectionStatus =
  | "complete"
  | "partial"
  | "missing"
  | "blocked_by_source"
  | "needs_review"

export type ContentOverallStatus = "complete" | "partial" | "missing" | "blocked_by_source"

export type ContentSourceStatus = "verified" | "partial" | "pending" | "missing"

export type InferredWorkflowStage =
  | "not_started"
  | "researching"
  | "source_verified"
  | "drafting"
  | "reviewing"
  | "published_locally"

export function classifySectionStatus(section: AtlasChapterSection): ContentSectionStatus {
  const text = section.content.trim()
  if (text.length === 0) {
    return "missing"
  }
  if (text.includes("<!-- partial -->") || text.includes("status=partial")) {
    return "partial"
  }
  if (text.includes("blocked_by_source") || text.includes("status=blocked_by_source")) {
    return "blocked_by_source"
  }
  if (text.includes("needs_review") || text.includes("status=needs_review")) {
    return "needs_review"
  }
  // Shell boilerplate still counts as complete-minimum (honest shell), not missing
  if (text.length < 20) {
    return "partial"
  }
  return "complete"
}

export function summarizeSectionStatuses(sections: readonly AtlasChapterSection[]): {
  readonly complete: number
  readonly partial: number
  readonly missing: number
  readonly blocked: number
  readonly needsReview: number
  readonly statuses: readonly ContentSectionStatus[]
} {
  const statuses = sections.map(classifySectionStatus)
  return {
    complete: statuses.filter((s) => s === "complete").length,
    partial: statuses.filter((s) => s === "partial").length,
    missing: statuses.filter((s) => s === "missing").length,
    blocked: statuses.filter((s) => s === "blocked_by_source").length,
    needsReview: statuses.filter((s) => s === "needs_review").length,
    statuses,
  }
}

export function deriveOverallStatus(input: {
  readonly sectionComplete: number
  readonly sectionTotal: number
  readonly hasBlocked: boolean
  readonly hasQuiz: boolean
  readonly hasWhyBridge: boolean
  readonly hasPassport: boolean
}): ContentOverallStatus {
  if (input.hasBlocked) {
    return "blocked_by_source"
  }
  if (input.sectionComplete === 0 && !input.hasWhyBridge) {
    return "missing"
  }
  if (
    input.sectionComplete === input.sectionTotal &&
    input.hasQuiz &&
    input.hasWhyBridge &&
    input.hasPassport
  ) {
    return "complete"
  }
  return "partial"
}

export function deriveSourceStatus(input: {
  readonly kbCount: number
  readonly lessonCount: number
  readonly hasBlockedSection: boolean
}): ContentSourceStatus {
  if (input.hasBlockedSection) {
    return "pending"
  }
  if (input.kbCount === 0 && input.lessonCount === 0) {
    return "missing"
  }
  if (input.kbCount >= 2 && input.lessonCount >= 1) {
    return "verified"
  }
  return "partial"
}

export function inferWorkflowStage(input: {
  readonly overall: ContentOverallStatus
  readonly source: ContentSourceStatus
  readonly sectionComplete: number
}): InferredWorkflowStage {
  if (input.overall === "missing" || input.sectionComplete === 0) {
    return "not_started"
  }
  if (input.source === "pending" || input.source === "missing") {
    return "researching"
  }
  if (input.source === "verified" && input.overall === "partial") {
    return "drafting"
  }
  if (input.overall === "partial") {
    return "drafting"
  }
  if (input.overall === "complete") {
    return "published_locally"
  }
  if (input.source === "verified") {
    return "source_verified"
  }
  return "reviewing"
}
