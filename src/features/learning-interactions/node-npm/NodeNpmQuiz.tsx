"use client"

import { useState } from "react"

const QUIZ = [
  {
    id: "q1",
    q: "Node.js와 npm의 관계로 맞는 것은?",
    choices: [
      "완전히 같은 프로그램이다",
      "Node는 런타임, npm은 패키지 매니저 쪽 도구로 구분한다",
      "npm만 있으면 Node는 필요 없다",
      "둘 다 브라우저 전용이다",
    ],
    a: 1,
  },
  {
    id: "q2",
    q: "npm install vs npm run dev?",
    choices: [
      "둘 다 같은 명령이다",
      "install은 의존성 맞춤, run dev는 scripts에 정의된 명령 실행",
      "run dev만 인터넷이 필요하다",
      "install은 항상 모든 npm 패키지를 깐다",
    ],
    a: 1,
  },
  {
    id: "q3",
    q: "npm run serve 실패 시 먼저?",
    choices: ["PC 포맷", "package.json scripts에 serve가 있는지 확인", "CSS 삭제", "Git push"],
    a: 1,
  },
  {
    id: "q4",
    q: "package.json이 안 보일 때?",
    choices: ["무시하고 계속", "현재 폴더가 프로젝트 루트인지 확인", "Node 삭제", "무조건 성공"],
    a: 1,
  },
  {
    id: "q5",
    q: "프로젝트마다 명령이 다른 이유?",
    choices: [
      "npm 버그",
      "scripts 정의가 프로젝트마다 다르기 때문",
      "브라우저 언어 설정",
      "항상 동일해야 함",
    ],
    a: 1,
  },
] as const

const OUT = [
  "Node를 런타임으로 설명했다",
  "Node ≠ npm",
  "scripts에서 명령 찾기",
  "install vs run 구분",
  "Missing script 진단",
  "잘못된 폴더 확인",
  "AI에 오류·경로·명령 전달",
] as const

export function NodeNpmQuiz() {
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [submitted, setSubmitted] = useState(false)
  const [checks, setChecks] = useState<Record<number, boolean>>({})
  const score = QUIZ.reduce((s, q) => s + (answers[q.id] === q.a ? 1 : 0), 0)

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 rounded-2xl border p-5">
        <h2 className="text-lg font-extrabold">퀴즈</h2>
        {QUIZ.map((q) => (
          <fieldset className="grid gap-2" key={q.id}>
            <legend className="text-sm font-bold">{q.q}</legend>
            {q.choices.map((c, i) => (
              <label className="flex gap-2 text-sm" key={c}>
                <input
                  checked={answers[q.id] === i}
                  name={q.id}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  type="radio"
                />
                {c}
              </label>
            ))}
            {submitted ? (
              <p className="text-xs font-bold">{answers[q.id] === q.a ? "정답" : "다시"}</p>
            ) : null}
          </fieldset>
        ))}
        <button
          className="w-fit rounded-lg border px-4 py-2 text-sm font-bold"
          onClick={() => setSubmitted(true)}
          type="button"
        >
          채점
        </button>
        {submitted ? (
          <p className="text-sm font-bold">
            {score}/{QUIZ.length} · 실습 증거 필요
          </p>
        ) : null}
      </section>
      <section className="grid gap-2 rounded-2xl border p-5">
        <h2 className="text-lg font-extrabold">Outcome · Teach-back</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          처음 보는 프로젝트에서 실행 명령을 찾는 순서를 자기 말로.
        </p>
        {OUT.map((label, i) => (
          <label className="flex gap-2 text-sm" key={label}>
            <input
              checked={Boolean(checks[i])}
              onChange={(e) => setChecks((c) => ({ ...c, [i]: e.target.checked }))}
              type="checkbox"
            />
            {label}
          </label>
        ))}
      </section>
    </div>
  )
}
