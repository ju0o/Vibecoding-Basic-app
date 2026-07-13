"use client"

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { z } from "zod"
import {
  type AtlasConceptStatus,
  type AtlasProgress,
  EMPTY_ATLAS_PROGRESS,
  getAtlasCompletedCount,
  getAtlasConceptStatus,
  markChapterRead,
  markQuizPassed,
  markTeachBackDone,
  recordConceptVisit,
} from "@/lib/atlas-progress"

const STORAGE_KEY = "ai-vibe-coding-master-atlas-progress"

const AtlasProgressSchema = z.object({
  version: z.union([z.literal(1), z.literal(2)]),
  chapterRead: z.array(z.string()),
  quizPassed: z.array(z.string()).default([]),
  lastConceptId: z.string().optional(),
  lastNodeId: z.string().optional(),
  teachBackDone: z.array(z.string()).optional(),
})

type AtlasProgressContextValue = {
  readonly progress: AtlasProgress
  readonly ready: boolean
  readonly getConceptStatus: (conceptId: string) => AtlasConceptStatus
  readonly getCompletedCount: (conceptIds: readonly string[]) => number
  readonly markRead: (conceptId: string) => void
  readonly recordVisit: (conceptId: string) => void
  readonly markQuiz: (conceptId: string) => void
  readonly markTeachBack: (conceptId: string) => void
}

const AtlasProgressContext = createContext<AtlasProgressContextValue | null>(null)

export function AtlasProgressProvider({ children }: { readonly children: ReactNode }) {
  const [progress, setProgress] = useState<AtlasProgress>(EMPTY_ATLAS_PROGRESS)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setProgress(loadProgress())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready || typeof window === "undefined") {
      return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress, ready])

  const getConceptStatus = useCallback(
    (conceptId: string) => getAtlasConceptStatus(progress, conceptId),
    [progress],
  )

  const getCompletedCount = useCallback(
    (conceptIds: readonly string[]) => getAtlasCompletedCount(progress, conceptIds),
    [progress],
  )

  const markRead = useCallback((conceptId: string) => {
    setProgress((current) => markChapterRead(current, conceptId))
  }, [])

  const recordVisit = useCallback((conceptId: string) => {
    setProgress((current) => recordConceptVisit(current, conceptId))
  }, [])

  const markQuiz = useCallback((conceptId: string) => {
    setProgress((current) => markQuizPassed(current, conceptId))
  }, [])

  const markTeachBack = useCallback((conceptId: string) => {
    setProgress((current) => markTeachBackDone(current, conceptId))
  }, [])

  const value = useMemo(
    () => ({
      progress,
      ready,
      getConceptStatus,
      getCompletedCount,
      markRead,
      recordVisit,
      markQuiz,
      markTeachBack,
    }),
    [
      progress,
      ready,
      getConceptStatus,
      getCompletedCount,
      markRead,
      recordVisit,
      markQuiz,
      markTeachBack,
    ],
  )

  return <AtlasProgressContext.Provider value={value}>{children}</AtlasProgressContext.Provider>
}

export function useAtlasProgress(): AtlasProgressContextValue {
  const value = useContext(AtlasProgressContext)
  if (!value) {
    throw new Error("useAtlasProgress must be used within AtlasProgressProvider")
  }
  return value
}

function loadProgress(): AtlasProgress {
  if (typeof window === "undefined") {
    return EMPTY_ATLAS_PROGRESS
  }
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return EMPTY_ATLAS_PROGRESS
  }
  try {
    const parsed = AtlasProgressSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) {
      return EMPTY_ATLAS_PROGRESS
    }
    const data = parsed.data
    const last = data.lastConceptId ?? data.lastNodeId
    const base = {
      version: 2 as const,
      chapterRead: data.chapterRead,
      quizPassed: data.quizPassed ?? [],
      teachBackDone: data.teachBackDone ?? [],
    }
    return last !== undefined ? { ...base, lastConceptId: last } : base
  } catch {
    return EMPTY_ATLAS_PROGRESS
  }
}
