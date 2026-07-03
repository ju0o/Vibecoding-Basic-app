"use client"

import { Check } from "@phosphor-icons/react"
import { useLearningState } from "@/features/progress/LearningStateProvider"

type LessonCompleteButtonProps = {
  readonly lessonSlug: string
}

export function LessonCompleteButton({ lessonSlug }: LessonCompleteButtonProps) {
  const { state, toggleLessonComplete } = useLearningState()
  const completed = state.completedLessons.includes(lessonSlug)

  return (
    <button
      aria-pressed={completed}
      className={[
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition active:translate-y-px",
        completed
          ? "border-[var(--status-success)] bg-[var(--status-success)]/10 text-[var(--status-success)]"
          : "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)]",
      ].join(" ")}
      onClick={() => toggleLessonComplete(lessonSlug)}
      type="button"
    >
      <Check size={17} weight="bold" />
      {completed ? "완료됨" : "강의 완료"}
    </button>
  )
}
