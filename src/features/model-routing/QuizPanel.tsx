"use client"

import { useMemo, useState } from "react"
import { UNIT_QUIZZES } from "@/content/model-routing/quizzes"
import type { ModelRoutingUnitId } from "@/lib/model-routing/contract"

type QuizPanelProps = {
  readonly unitId: ModelRoutingUnitId
}

export function QuizPanel({ unitId }: QuizPanelProps) {
  const quiz = useMemo(() => UNIT_QUIZZES.find((item) => item.unitId === unitId), [unitId])
  const [selected, setSelected] = useState<string | null>(null)

  if (!quiz) {
    return null
  }

  const chosen = quiz.options.find((option) => option.id === selected)

  return (
    <section className="grid gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5">
      <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Quiz</h2>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">{quiz.prompt}</p>
      <div className="grid gap-2" role="radiogroup" aria-label="퀴즈 선택지">
        {quiz.options.map((option) => (
          <label
            className="flex cursor-pointer items-start gap-2 rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm"
            key={option.id}
          >
            <input
              checked={selected === option.id}
              className="mt-1"
              name={`quiz-${unitId}`}
              onChange={() => setSelected(option.id)}
              type="radio"
              value={option.id}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {chosen ? (
        <p
          aria-live="polite"
          className={[
            "rounded-lg px-3 py-2 text-sm leading-6",
            chosen.correct
              ? "bg-[var(--accent-soft)] text-[var(--text-primary)]"
              : "bg-[var(--surface-secondary)] text-[var(--text-secondary)]",
          ].join(" ")}
        >
          <span className="font-bold">{chosen.correct ? "정답. " : "오답. "}</span>
          {chosen.explain}
        </p>
      ) : null}
      <p className="text-xs text-[var(--text-tertiary)]">
        점수가 없어도 학습할 수 있습니다. 재시도 제한 없음.
      </p>
    </section>
  )
}
