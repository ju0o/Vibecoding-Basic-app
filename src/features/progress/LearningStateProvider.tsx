"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { EMPTY_LEARNING_STATE, getProgressStats, type LearningState } from "@/lib/progress"

const STORAGE_KEY = "ai-vibe-coding-master-learning-state"

const LearningStateSchema = z.object({
  completedLessons: z.array(z.string()),
  checklistItems: z.record(z.string(), z.array(z.string())),
  bookmarks: z.array(z.string()),
  lastReadLessonSlug: z.string().optional(),
  lastReadAt: z.string().optional(),
})

type ChecklistToggleInput = {
  readonly lessonSlug: string
  readonly item: string
}

type LearningStateContextValue = {
  readonly state: LearningState
  readonly ready: boolean
  readonly toggleLessonComplete: (slug: string) => void
  readonly toggleBookmark: (slug: string) => void
  readonly toggleChecklistItem: (input: ChecklistToggleInput) => void
  readonly recordLessonVisit: (slug: string) => void
  readonly resetLearningState: () => void
  readonly getChecklistPercent: (lessonSlug: string, totalItems: number) => number
  readonly getOverallPercent: (totalLessons: number) => number
}

const LearningStateContext = createContext<LearningStateContextValue | null>(null)

export function LearningStateProvider({ children }: { readonly children: React.ReactNode }) {
  const [state, setState] = useState<LearningState>(EMPTY_LEARNING_STATE)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setState(readStoredState())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [ready, state])

  const toggleLessonComplete = useCallback((slug: string) => {
    setState((current) => ({
      ...current,
      completedLessons: toggleValue(current.completedLessons, slug),
    }))
  }, [])

  const toggleBookmark = useCallback((slug: string) => {
    setState((current) => ({
      ...current,
      bookmarks: toggleValue(current.bookmarks, slug),
    }))
  }, [])

  const toggleChecklistItem = useCallback((input: ChecklistToggleInput) => {
    setState((current) => {
      const existingItems = current.checklistItems[input.lessonSlug] ?? []

      return {
        ...current,
        checklistItems: {
          ...current.checklistItems,
          [input.lessonSlug]: toggleValue(existingItems, input.item),
        },
      }
    })
  }, [])

  const recordLessonVisit = useCallback((slug: string) => {
    setState((current) => ({
      ...current,
      lastReadLessonSlug: slug,
      lastReadAt: new Date().toISOString(),
    }))
  }, [])

  const resetLearningState = useCallback(() => {
    setState(EMPTY_LEARNING_STATE)
  }, [])

  const getChecklistPercent = useCallback(
    (lessonSlug: string, totalItems: number) => {
      const completedItems = state.checklistItems[lessonSlug]?.length ?? 0
      return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100)
    },
    [state.checklistItems],
  )

  const getOverallPercent = useCallback(
    (totalLessons: number) =>
      getProgressStats({ completedLessons: state.completedLessons, totalLessons }).percent,
    [state.completedLessons],
  )

  const value = useMemo(
    () => ({
      state,
      ready,
      toggleLessonComplete,
      toggleBookmark,
      toggleChecklistItem,
      recordLessonVisit,
      resetLearningState,
      getChecklistPercent,
      getOverallPercent,
    }),
    [
      state,
      ready,
      toggleLessonComplete,
      toggleBookmark,
      toggleChecklistItem,
      recordLessonVisit,
      resetLearningState,
      getChecklistPercent,
      getOverallPercent,
    ],
  )

  return <LearningStateContext.Provider value={value}>{children}</LearningStateContext.Provider>
}

export function useLearningState(): LearningStateContextValue {
  const value = useContext(LearningStateContext)

  if (value === null) {
    throw new LearningStateProviderError("useLearningState must be used inside provider")
  }

  return value
}

class LearningStateProviderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LearningStateProviderError"
  }
}

function readStoredState(): LearningState {
  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (raw === null) {
    return EMPTY_LEARNING_STATE
  }

  try {
    return LearningStateSchema.parse(JSON.parse(raw))
  } catch (error) {
    if (error instanceof Error) {
      return EMPTY_LEARNING_STATE
    }

    return EMPTY_LEARNING_STATE
  }
}

function toggleValue(values: readonly string[], value: string): readonly string[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}
