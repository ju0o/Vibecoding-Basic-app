export type LearningState = {
  readonly completedLessons: readonly string[]
  readonly checklistItems: Readonly<Record<string, readonly string[]>>
  readonly bookmarks: readonly string[]
}

export type ProgressStats = {
  readonly completedCount: number
  readonly totalCount: number
  readonly percent: number
}

export const EMPTY_LEARNING_STATE: LearningState = {
  completedLessons: [],
  checklistItems: {},
  bookmarks: [],
}

export function getProgressStats(input: {
  readonly completedLessons: readonly string[]
  readonly totalLessons: number
}): ProgressStats {
  const completedCount = new Set(input.completedLessons).size
  const totalCount = input.totalLessons
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return {
    completedCount,
    totalCount,
    percent,
  }
}

export function isLessonComplete(state: LearningState, slug: string): boolean {
  return state.completedLessons.includes(slug)
}

export function isLessonBookmarked(state: LearningState, slug: string): boolean {
  return state.bookmarks.includes(slug)
}

export function getCompletedChecklistCount(state: LearningState, lessonSlug: string): number {
  return state.checklistItems[lessonSlug]?.length ?? 0
}
