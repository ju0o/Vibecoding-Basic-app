"use client"

import { useEffect } from "react"
import { useLearningState } from "@/features/progress/LearningStateProvider"

type LessonVisitTrackerProps = {
  readonly lessonSlug: string
}

export function LessonVisitTracker({ lessonSlug }: LessonVisitTrackerProps) {
  const { recordLessonVisit } = useLearningState()

  useEffect(() => {
    recordLessonVisit(lessonSlug)
  }, [lessonSlug, recordLessonVisit])

  return null
}
