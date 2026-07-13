export type AtlasConceptStatus = "not-visited" | "reading" | "completed"

export type AtlasProgress = {
  readonly version: 2
  readonly chapterRead: readonly string[]
  readonly quizPassed: readonly string[]
  readonly lastConceptId?: string
  readonly teachBackDone: readonly string[]
}

export const EMPTY_ATLAS_PROGRESS: AtlasProgress = {
  version: 2,
  chapterRead: [],
  quizPassed: [],
  teachBackDone: [],
}

export function getAtlasConceptStatus(
  progress: AtlasProgress,
  conceptId: string,
): AtlasConceptStatus {
  if (progress.chapterRead.includes(conceptId)) {
    return "completed"
  }
  if (progress.lastConceptId === conceptId) {
    return "reading"
  }
  return "not-visited"
}

/** @deprecated */
export const getAtlasNodeStatus = getAtlasConceptStatus

export function markChapterRead(progress: AtlasProgress, conceptId: string): AtlasProgress {
  if (progress.chapterRead.includes(conceptId)) {
    return progress
  }
  return {
    ...progress,
    chapterRead: [...progress.chapterRead, conceptId],
    lastConceptId: conceptId,
  }
}

export function recordConceptVisit(progress: AtlasProgress, conceptId: string): AtlasProgress {
  if (progress.lastConceptId === conceptId) {
    return progress
  }
  return {
    ...progress,
    lastConceptId: conceptId,
  }
}

/** @deprecated */
export const recordNodeVisit = recordConceptVisit

export function getAtlasCompletedCount(
  progress: AtlasProgress,
  conceptIds: readonly string[],
): number {
  return conceptIds.filter((id) => getAtlasConceptStatus(progress, id) === "completed").length
}

export function markQuizPassed(progress: AtlasProgress, conceptId: string): AtlasProgress {
  if (progress.quizPassed.includes(conceptId)) {
    return progress
  }
  return {
    ...progress,
    quizPassed: [...progress.quizPassed, conceptId],
  }
}

export function markTeachBackDone(progress: AtlasProgress, conceptId: string): AtlasProgress {
  if (progress.teachBackDone.includes(conceptId)) {
    return progress
  }
  return {
    ...progress,
    teachBackDone: [...progress.teachBackDone, conceptId],
  }
}
