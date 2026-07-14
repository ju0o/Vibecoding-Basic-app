"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

const GOALS = {
  title: "제목 문구만 바꾸기",
  color: "카드 배경색 바꾸기",
  port: "서버 포트 설명 듣기",
} as const

type Goal = keyof typeof GOALS

const FILES = [
  { id: "index.html", size: 2, secret: false },
  { id: "style.css", size: 2, secret: false },
  { id: "main.js", size: 2, secret: false },
  { id: "server.js", size: 3, secret: false },
  { id: "package.json", size: 1, secret: false },
  { id: ".env", size: 1, secret: true },
  { id: "node_modules/…", size: 9, secret: false },
] as const

const RELEVANT: Record<Goal, string[]> = {
  title: ["index.html", "main.js"],
  color: ["style.css", "index.html"],
  port: ["server.js", "package.json"],
}

/**
 * C03/C04 — pick goal + files; score relevance and warn secrets/bloat.
 */
export function ContextPickerExperience() {
  const [goal, setGoal] = useState<Goal>("title")
  const [sel, setSel] = useState<Record<string, boolean>>({
    "index.html": true,
    "main.js": false,
    "style.css": false,
    "server.js": false,
    "package.json": false,
    ".env": false,
    "node_modules/…": false,
  })

  const analysis = useMemo(() => {
    const chosen = FILES.filter((f) => sel[f.id])
    const relevant = RELEVANT[goal]
    const hits = chosen.filter((f) => relevant.includes(f.id)).length
    const noise = chosen.filter((f) => !relevant.includes(f.id) && !f.secret).length
    const secrets = chosen.filter((f) => f.secret).length
    const bloat = chosen.filter((f) => f.size >= 9).length
    const load = chosen.reduce((a, f) => a + f.size, 0)
    let grade = "관련 컨텍스트가 약함"
    if (secrets) grade = "위험: 비밀 파일 포함"
    else if (bloat) grade = "과부하: 거대 폴더 포함"
    else if (hits >= 1 && noise === 0 && load <= 5) grade = "좋음: 최소 관련 집합"
    else if (hits >= 1) grade = "보통: 관련은 있으나 잡음 있음"
    return { hits, noise, secrets, bloat, load, grade, relevant }
  }, [goal, sel])

  const body = (
    <div className="grid gap-3">
      <p className="text-sm font-bold">목표를 고르고, AI에게 보여줄 파일을 토글하세요.</p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(GOALS) as Goal[]).map((g) => (
          <button
            className={`rounded-xl border px-3 py-2 text-xs font-extrabold ${
              goal === g ? "border-sky-500 bg-sky-500/15" : ""
            }`}
            key={g}
            onClick={() => setGoal(g)}
            type="button"
          >
            {GOALS[g]}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {FILES.map((f) => (
          <button
            className={`rounded-lg border px-2 py-1.5 font-mono text-xs font-bold ${
              sel[f.id] ? "border-violet-500 bg-violet-500/15" : ""
            }`}
            key={f.id}
            onClick={() => setSel((s) => ({ ...s, [f.id]: !s[f.id] }))}
            type="button"
          >
            {f.id}
          </button>
        ))}
      </div>
      <p className="text-sm font-extrabold" role="status">
        {analysis.grade}
      </p>
      <p className="text-xs text-[var(--text-secondary)]">
        권장 관련: {analysis.relevant.join(", ")} · hit {analysis.hits} · noise {analysis.noise} ·
        load {analysis.load}
      </p>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={analysis.grade}
      controls={<span className="text-xs">Context = 이번 응답에 보이는 정보 선택</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 · 실제 토큰 계산 아님"
      statusLabel="context-picker"
      title="관련 파일 Context 고르기"
    />
  )
}
