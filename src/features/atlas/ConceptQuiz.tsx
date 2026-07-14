"use client"

import { useState } from "react"
import { getFoundationQuiz } from "@/content/atlas/foundation-quizzes"

export function ConceptQuiz({ conceptId }: { readonly conceptId: string }) {
  const quiz = getFoundationQuiz(conceptId)
  const [selected, setSelected] = useState<Record<string, string>>({})

  if (!quiz) {
    return (
      <p className="text-sm text-[var(--text-secondary)]">
        이 Concept 전용 객관식 팩이 아직 없습니다. 아래 Checkpoint/Teach-back을 사용하세요.
      </p>
    )
  }

  return (
    <div className="grid gap-6">
      {quiz.checkpoints.map((cp, index) => {
        const choice = quiz.checkpoints[index]?.options.find((o) => o.id === selected[cp.id])
        return (
          <div
            className="grid gap-2 rounded-lg border border-[var(--border-subtle)] p-3"
            key={cp.id}
          >
            <p className="text-sm font-bold text-[var(--text-primary)]">
              Checkpoint {index + 1}. {cp.prompt}
            </p>
            <div className="grid gap-2" role="radiogroup" aria-label={cp.prompt}>
              {cp.options.map((option) => (
                <label className="flex gap-2 text-sm text-[var(--text-secondary)]" key={option.id}>
                  <input
                    checked={selected[cp.id] === option.id}
                    name={cp.id}
                    onChange={() => setSelected((s) => ({ ...s, [cp.id]: option.id }))}
                    type="radio"
                    value={option.id}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {choice ? (
              <p aria-live="polite" className="text-sm leading-6 text-[var(--text-secondary)]">
                <strong>{choice.correct ? "정답." : "오답."}</strong> {choice.explain}
              </p>
            ) : null}
          </div>
        )
      })}
      <div className="rounded-lg bg-[var(--surface-secondary)] p-3 text-sm leading-6 text-[var(--text-secondary)]">
        <p className="font-bold text-[var(--text-primary)]">Teach-back</p>
        <p className="mt-1">{quiz.teachBack}</p>
        <p className="mt-2 text-xs text-[var(--text-tertiary)]">
          외부 AI 채점 없음. 스스로 말한 뒤 Passport/Studio에서 완료를 표시하세요.
        </p>
      </div>
    </div>
  )
}
