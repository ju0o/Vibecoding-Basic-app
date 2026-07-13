import type {
  ModelRoutingRouteProgress,
  ModelRoutingUnitId,
  ModelRoutingUnitProgress,
} from "@/lib/model-routing/contract"

/** Separate key avoids migrating existing lesson LearningState. */
export const MODEL_ROUTING_PROGRESS_KEY = "atlas-model-routing-progress-v1"

export const EMPTY_ROUTE_PROGRESS: ModelRoutingRouteProgress = {
  units: {},
  simulatorRuns: 0,
}

export function emptyUnitProgress(): ModelRoutingUnitProgress {
  return {
    visited: false,
    read: false,
    quizBestScore: 0,
    simulatorDone: false,
    teachBackDone: false,
  }
}

export function parseRouteProgress(raw: unknown): ModelRoutingRouteProgress {
  if (!raw || typeof raw !== "object") {
    return EMPTY_ROUTE_PROGRESS
  }
  const value = raw as Partial<ModelRoutingRouteProgress>
  const parsed: ModelRoutingRouteProgress = {
    units: value.units ?? {},
    simulatorRuns: typeof value.simulatorRuns === "number" ? value.simulatorRuns : 0,
  }
  if (value.lastUnitId !== undefined) {
    return { ...parsed, lastUnitId: value.lastUnitId }
  }
  return parsed
}

export function markUnitVisited(
  progress: ModelRoutingRouteProgress,
  unitId: ModelRoutingUnitId,
): ModelRoutingRouteProgress {
  const current = progress.units[unitId] ?? emptyUnitProgress()
  return {
    units: {
      ...progress.units,
      [unitId]: { ...current, visited: true },
    },
    lastUnitId: unitId,
    simulatorRuns: progress.simulatorRuns,
  }
}

export function markUnitRead(
  progress: ModelRoutingRouteProgress,
  unitId: ModelRoutingUnitId,
): ModelRoutingRouteProgress {
  const current = progress.units[unitId] ?? emptyUnitProgress()
  return {
    units: {
      ...progress.units,
      [unitId]: { ...current, visited: true, read: true },
    },
    lastUnitId: unitId,
    simulatorRuns: progress.simulatorRuns,
  }
}

export function recordQuizScore(
  progress: ModelRoutingRouteProgress,
  unitId: ModelRoutingUnitId,
  score: number,
): ModelRoutingRouteProgress {
  const current = progress.units[unitId] ?? emptyUnitProgress()
  return {
    ...progress,
    units: {
      ...progress.units,
      [unitId]: {
        ...current,
        visited: true,
        quizBestScore: Math.max(current.quizBestScore, score),
      },
    },
  }
}

export function markSimulatorDone(progress: ModelRoutingRouteProgress): ModelRoutingRouteProgress {
  return {
    ...progress,
    simulatorRuns: progress.simulatorRuns + 1,
  }
}
