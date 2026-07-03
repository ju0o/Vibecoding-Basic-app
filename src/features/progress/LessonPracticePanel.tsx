"use client"

import { useEffect, useState } from "react"
import type { LessonExercise } from "@/content/schema"

type LessonPracticePanelProps = {
  readonly exercise: LessonExercise
  readonly lessonSlug: string
}

export function LessonPracticePanel({ exercise, lessonSlug }: LessonPracticePanelProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [draft, setDraft] = useState("")
  const [draftLoaded, setDraftLoaded] = useState(false)
  const storageKey = `ai-vibe-coding-master-explanation-${lessonSlug}`

  useEffect(() => {
    const storedDraft = window.localStorage.getItem(storageKey)

    if (storedDraft !== null) {
      setDraft(storedDraft)
    }

    setDraftLoaded(true)
  }, [storageKey])

  useEffect(() => {
    if (draftLoaded) {
      window.localStorage.setItem(storageKey, draft)
    }
  }, [draft, draftLoaded, storageKey])

  const isCorrect = selectedOption === exercise.quiz.answer
  const hasAnswered = selectedOption !== null

  return (
    <section className="mt-6 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-bold text-[var(--accent-primary)]">
          학습 활동
        </span>
        <p className="text-sm font-semibold text-[var(--text-tertiary)]">
          퀴즈를 풀고, 자기 말로 설명해보세요.
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4">
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">확인 퀴즈</h2>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">{exercise.quiz.question}</p>
          <div className="mt-4 space-y-2">
            {exercise.quiz.options.map((option) => {
              const selected = selectedOption === option

              return (
                <button
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] px-4 py-3 text-left text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] data-[selected=true]:border-[var(--accent-primary)] data-[selected=true]:bg-[var(--accent-soft)] data-[selected=true]:text-[var(--accent-primary)]"
                  data-selected={selected}
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  type="button"
                >
                  {option}
                </button>
              )
            })}
          </div>
          {hasAnswered ? (
            <div className="mt-4 rounded-lg bg-[var(--surface-inset)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
              <p
                className={
                  isCorrect
                    ? "font-bold text-[var(--status-success)]"
                    : "font-bold text-[var(--status-warning)]"
                }
              >
                {isCorrect
                  ? "정답입니다."
                  : `다시 생각해보세요. 정답은 "${exercise.quiz.answer}"입니다.`}
              </p>
              <p className="mt-2">{exercise.quiz.explanation}</p>
            </div>
          ) : null}
        </div>

        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4">
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">설명 연습</h2>
          <p className="mt-3 leading-7 text-[var(--text-secondary)]">
            {exercise.explanationPrompt.prompt}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--text-tertiary)]">
            {exercise.explanationPrompt.guide.map((guide) => (
              <li key={guide}>{guide}</li>
            ))}
          </ul>
          <textarea
            className="mt-4 min-h-40 w-full resize-y rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="내 말로 설명을 적어보세요. 초안은 이 브라우저에 자동 저장됩니다."
            value={draft}
          />
        </div>
      </div>
    </section>
  )
}
