"use client"

import { CheckCircle } from "@phosphor-icons/react"
import { useLearningState } from "@/features/progress/LearningStateProvider"

type LessonChecklistProps = {
  readonly lessonSlug: string
  readonly items: readonly string[]
}

export function LessonChecklist({ lessonSlug, items }: LessonChecklistProps) {
  const { state, toggleChecklistItem, getChecklistPercent } = useLearningState()
  const percent = getChecklistPercent(lessonSlug, items.length)

  return (
    <div className="mt-5 rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} weight="bold" />
          <p className="font-semibold text-[var(--text-primary)]">인터랙티브 체크리스트</p>
        </div>
        <span className="text-sm font-semibold text-[var(--accent-primary)]">{percent}%</span>
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          const checked = state.checklistItems[lessonSlug]?.includes(item) ?? false

          return (
            <label
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 text-sm transition hover:border-[var(--accent-primary)]"
              key={item}
            >
              <input
                checked={checked}
                className="mt-1 h-4 w-4 accent-[var(--accent-primary)]"
                onChange={() => toggleChecklistItem({ lessonSlug, item })}
                type="checkbox"
              />
              <span className={checked ? "text-[var(--text-tertiary)] line-through" : ""}>
                {item}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
