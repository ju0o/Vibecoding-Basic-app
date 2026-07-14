"use client"

import { useState } from "react"

const QUIZ = [
  {
    id: "q1",
    question: "교육용 바이브코딩에서 사람의 역할로 가장 가까운 것은?",
    choices: [
      "코드를 절대 보지 않는다",
      "목표를 정하고 결과를 확인·수정·설명한다",
      "Node 버전 숫자를 외운다",
      "유료 AI만 사용한다",
    ],
    answer: 1,
  },
  {
    id: "q2",
    question: "npm run dev 가 실패하는 흔한 이유는?",
    choices: [
      "인터넷이 너무 빨라서",
      "해당 프로젝트 package.json에 dev 스크립트가 없을 수 있어서",
      "HTML 파일 이름이 길어서",
      "브라우저가 Chrome이 아니라서",
    ],
    answer: 1,
  },
  {
    id: "q3",
    question: "교육용 시뮬레이션과 Sample Project의 올바른 구분은?",
    choices: [
      "시뮬레이션이 내 PC에 Node를 설치한다",
      "시뮬레이션은 개념 체험, Sample Project는 실제 로컬 실행",
      "둘 다 실제 Shell을 브라우저에서 실행한다",
      "Sample Project는 볼 필요 없다",
    ],
    answer: 1,
  },
] as const

const OUTCOMES = [
  "바이브코딩과 전통 코딩의 차이를 내 말로 설명할 수 있다",
  "AI에게 작은 결과물을 요청할 수 있다",
  "결과를 보고 수정 요청을 할 수 있다",
  "IDE가 무엇인지 한 줄로 말할 수 있다",
  "VS Code / Node 설치 여부를 확인할 수 있다",
  "터미널을 열고 node -v / npm -v 를 실행할 수 있다",
  "Sample Project를 열고 npm install · npm run dev 를 시도할 수 있다",
  "브라우저에서 결과를 확인할 수 있다",
  "package.json / src / npm 을 아주 기본으로 설명할 수 있다",
  "오류 메시지를 복사해 AI에게 전달할 수 있다",
] as const

export function Day1QuizAndOutcomes() {
  const [answers, setAnswers] = useState<Record<string, number | null>>({
    q1: null,
    q2: null,
    q3: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [checks, setChecks] = useState<Record<number, boolean>>({})

  const score = QUIZ.reduce((sum, q) => {
    return sum + (answers[q.id] === q.answer ? 1 : 0)
  }, 0)

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 rounded-2xl border border-[var(--border-default)] p-5">
        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
          퀴즈 (개념 Checkpoint)
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Quiz 점수만으로 Outcome 완료가 되지 않습니다. 아래 수행 체크와 함께 보세요.
        </p>
        {QUIZ.map((q) => (
          <fieldset className="grid gap-2" key={q.id}>
            <legend className="text-sm font-bold text-[var(--text-primary)]">{q.question}</legend>
            {q.choices.map((choice, index) => (
              <label
                className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                key={choice}
              >
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
              <p className="text-xs font-bold">
                {answers[q.id] === q.answer ? (
                  <span className="text-emerald-700 dark:text-emerald-300">정답</span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-300">다시 생각해 보세요</span>
                )}
              </p>
            ) : null}
          </fieldset>
        ))}
        <button
          className="w-fit rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-2 text-sm font-bold"
          onClick={() => setSubmitted(true)}
          type="button"
        >
          채점하기
        </button>
        {submitted ? (
          <p className="text-sm font-bold text-[var(--text-primary)]">
            점수: {score} / {QUIZ.length}
          </p>
        ) : null}
      </section>

      <section className="grid gap-3 rounded-2xl border border-[var(--border-default)] p-5">
        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Outcome Check</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          최소 완료: Path A 성공 + 핵심 수행. Path B는 환경에 따라 보류 가능(기록). 모든 항목이
          Explainable일 필요는 없습니다.
        </p>
        <ul className="grid gap-2">
          {OUTCOMES.map((label, index) => (
            <li key={label}>
              <label className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <input
                  checked={Boolean(checks[index])}
                  className="mt-1"
                  onChange={(e) => setChecks((c) => ({ ...c, [index]: e.target.checked }))}
                  type="checkbox"
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
