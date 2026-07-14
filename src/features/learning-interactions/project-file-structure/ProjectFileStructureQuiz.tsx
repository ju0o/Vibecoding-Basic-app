"use client"

import { useState } from "react"

const QUIZ = [
  {
    id: "q1",
    q: "src 폴더는 모든 프로젝트에 필수인가요?",
    choices: [
      "예, npm이 강제한다",
      "아니오, 흔한 관례일 수 있다",
      "예, 브라우저가 강제한다",
      "예, Git이 강제한다",
    ],
    a: 1,
  },
  {
    id: "q2",
    q: "package.json 역할로 가장 가까운 것은?",
    choices: [
      "이미지만 저장하는 폴더",
      "프로젝트 메타·scripts·(있으면) 의존성 정보",
      "브라우저 캐시 파일",
      "Git 히스토리 전체",
    ],
    a: 1,
  },
  {
    id: "q3",
    q: "화면 문구를 바꾸기 전에 먼저 해야 할 일은?",
    choices: [
      "무조건 package.json 삭제",
      "어느 파일이 문구를 담당하는지 찾기/분석",
      "모든 파일을 동시에 수정",
      "Node 버전을 숨기기",
    ],
    a: 1,
  },
  {
    id: "q4",
    q: "AI에게 수정 범위를 제한할 때 좋은 요청은?",
    choices: [
      "알아서 전부 고쳐줘",
      "분석 후 허용 파일만 수정, 다른 파일 금지",
      "README만 무한 수정",
      "질문 없이 배포해줘",
    ],
    a: 1,
  },
  {
    id: "q5",
    q: "단일 HTML vs src+package.json 구조?",
    choices: [
      "항상 분리가 우수",
      "항상 단일 HTML이 우수",
      "상황에 따라 다르며 우열을 단정하지 않는다",
      "둘 다 불법",
    ],
    a: 2,
  },
] as const

const OUTCOMES = [
  "프로젝트 루트를 찾았다",
  "폴더와 파일을 구분한다",
  "src를 관례로 설명했다",
  "package.json을 기초 설명했다",
  "문구 파일을 찾아 수정했다",
  "AI 범위 제한 요청을 작성했다",
  "구조는 프로젝트마다 다를 수 있다고 말했다",
] as const

export function ProjectFileStructureQuiz() {
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [submitted, setSubmitted] = useState(false)
  const [checks, setChecks] = useState<Record<number, boolean>>({})
  const score = QUIZ.reduce((s, item) => s + (answers[item.id] === item.a ? 1 : 0), 0)

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 rounded-2xl border border-[var(--border-default)] p-5">
        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">퀴즈</h2>
        {QUIZ.map((item) => (
          <fieldset className="grid gap-2" key={item.id}>
            <legend className="text-sm font-bold text-[var(--text-primary)]">{item.q}</legend>
            {item.choices.map((c, i) => (
              <label className="flex gap-2 text-sm text-[var(--text-secondary)]" key={c}>
                <input
                  checked={answers[item.id] === i}
                  name={item.id}
                  onChange={() => setAnswers((a) => ({ ...a, [item.id]: i }))}
                  type="radio"
                />
                {c}
              </label>
            ))}
            {submitted ? (
              <p className="text-xs font-bold">
                {answers[item.id] === item.a ? (
                  <span className="text-emerald-700 dark:text-emerald-300">정답</span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-300">다시 보기</span>
                )}
              </p>
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
            {score}/{QUIZ.length} · Quiz만으로 완료 아님 · 아래 실습 체크 필요
          </p>
        ) : null}
      </section>

      <section className="grid gap-3 rounded-2xl border border-[var(--border-default)] p-5">
        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Outcome Check</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Teach-back: “파일이 많아도 수정 위치를 찾는 방법”을 자기 말로 말해 보세요.
        </p>
        <ul className="grid gap-2">
          {OUTCOMES.map((label, i) => (
            <li key={label}>
              <label className="flex gap-2 text-sm text-[var(--text-secondary)]">
                <input
                  checked={Boolean(checks[i])}
                  onChange={(e) => setChecks((c) => ({ ...c, [i]: e.target.checked }))}
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
