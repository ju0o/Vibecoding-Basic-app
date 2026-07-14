"use client"

import { useMemo, useState } from "react"

export type CheckpointQuestion = {
  readonly id: string
  readonly question: string
  readonly choices: readonly string[]
  readonly answer: number
  readonly whyCorrect: string
  readonly whyWrong: string
}

export type CheckpointOutcome = {
  readonly id: string
  readonly label: string
  readonly level: "Observed" | "Assisted" | "Independent" | "Explainable"
}

type NodeCheckpointProps = {
  readonly title?: string
  readonly questions: readonly CheckpointQuestion[]
  readonly outcomes: readonly CheckpointOutcome[]
  readonly teachBackPrompt: string
}

/**
 * Node-specific quiz + outcome checks (not batch-only completion).
 */
export function NodeCheckpoint({
  title = "Node Checkpoint",
  questions,
  outcomes,
  teachBackPrompt,
}: NodeCheckpointProps) {
  const [answers, setAnswers] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, null])),
  )
  const [submitted, setSubmitted] = useState(false)
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const [teachBack, setTeachBack] = useState("")

  const score = useMemo(
    () => questions.reduce((sum, q) => sum + (answers[q.id] === q.answer ? 1 : 0), 0),
    [answers, questions],
  )

  return (
    <div className="grid gap-6 rounded-2xl border border-[var(--border-default)] p-5">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">{title}</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Quiz 점수만으로 Node 완료가 되지 않습니다. Outcome 체크와 Teach-back을 함께 보세요.
        </p>
      </div>

      {questions.map((q) => (
        <fieldset className="grid gap-2" key={q.id}>
          <legend className="text-sm font-bold text-[var(--text-primary)]">{q.question}</legend>
          {q.choices.map((choice, index) => (
            <label className="flex items-start gap-2 text-sm" key={choice}>
              <input
                checked={answers[q.id] === index}
                className="mt-1"
                name={q.id}
                onChange={() => setAnswers((a) => ({ ...a, [q.id]: index }))}
                type="radio"
              />
              {choice}
            </label>
          ))}
          {submitted ? (
            <p className="text-xs text-[var(--text-secondary)]">
              {answers[q.id] === q.answer
                ? `정답 이유: ${q.whyCorrect}`
                : `오답 안내: ${q.whyWrong}`}
            </p>
          ) : null}
        </fieldset>
      ))}

      <button
        className="w-fit rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs font-extrabold"
        onClick={() => setSubmitted(true)}
        type="button"
      >
        채점
      </button>
      {submitted ? (
        <p className="text-sm font-bold">
          점수 {score}/{questions.length} · Quiz만으로 완료 아님
        </p>
      ) : null}

      <section className="grid gap-2">
        <h3 className="font-extrabold">Outcome Check</h3>
        {outcomes.map((o) => (
          <label className="flex items-start gap-2 text-sm" key={o.id}>
            <input
              checked={!!checks[o.id]}
              className="mt-1"
              onChange={() => setChecks((c) => ({ ...c, [o.id]: !c[o.id] }))}
              type="checkbox"
            />
            <span>
              <span className="font-bold">{o.id}</span> · {o.label}{" "}
              <span className="text-xs text-[var(--text-tertiary)]">[{o.level}]</span>
            </span>
          </label>
        ))}
      </section>

      <label className="grid gap-1 text-sm font-bold">
        Teach-back
        <textarea
          className="min-h-20 rounded-lg border bg-[var(--surface-primary)] p-2 text-sm font-normal"
          onChange={(e) => setTeachBack(e.target.value)}
          placeholder={teachBackPrompt}
          value={teachBack}
        />
      </label>
    </div>
  )
}
