"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

type Role = "frontend" | "backend"

const FILES: Record<string, { role: Role; blurb: string }> = {
  "src/index.html": { role: "frontend", blurb: "화면 구조 — 브라우저가 읽음" },
  "src/style.css": { role: "frontend", blurb: "스타일 — 브라우저가 적용" },
  "src/main.js": { role: "frontend", blurb: "브라우저에서 도는 동작" },
  "server.js": { role: "backend", blurb: "요청을 받아 파일을 응답 (미니 서버)" },
  "package.json": { role: "backend", blurb: "실행 스크립트·프로젝트 메타 (서버 쪽 도구 축)" },
}

/**
 * B06/B07 — classify Day1 files as FE vs BE (educational).
 */
export function StackRolesExperience({ focus = "both" }: { readonly focus?: Role | "both" }) {
  const [picked, setPicked] = useState<string>("src/index.html")
  const [guess, setGuess] = useState<Role | null>(null)

  const truth = FILES[picked]?.role
  const result = useMemo(() => {
    if (!guess || !truth) return "파일을 고르고 Frontend / Backend를 선택하세요"
    if (guess === truth) return `맞음: ${picked} → ${truth}`
    return `다시: ${picked}는 교육 모델상 ${truth} 쪽에 가깝습니다`
  }, [guess, picked, truth])

  const visible = Object.entries(FILES).filter(([, v]) => focus === "both" || v.role === focus)

  const body = (
    <div className="grid gap-3">
      <p className="text-sm font-bold">
        Day1 샘플 파일을 고른 뒤, Frontend인지 Backend인지 맞춰 보세요.
      </p>
      <div className="flex flex-wrap gap-2">
        {visible.map(([name]) => (
          <button
            className={`rounded-lg border px-2.5 py-1.5 font-mono text-xs font-bold ${
              picked === name ? "border-sky-500 bg-sky-500/15" : ""
            }`}
            key={name}
            onClick={() => {
              setPicked(name)
              setGuess(null)
            }}
            type="button"
          >
            {name}
          </button>
        ))}
      </div>
      <p className="text-sm text-[var(--text-secondary)]">{FILES[picked]?.blurb}</p>
      <div className="flex flex-wrap gap-2">
        {(["frontend", "backend"] as Role[]).map((r) => (
          <button
            className={`rounded-xl border px-4 py-2 text-sm font-extrabold ${
              guess === r ? "border-violet-500 bg-violet-500/15" : ""
            }`}
            key={r}
            onClick={() => setGuess(r)}
            type="button"
          >
            {r === "frontend" ? "Frontend" : "Backend"}
          </button>
        ))}
      </div>
      <p className="text-sm font-bold text-[var(--text-primary)]" role="status">
        {result}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-3 text-xs">
          <p className="font-extrabold">Frontend</p>
          <p className="mt-1 text-[var(--text-secondary)]">브라우저 UI · 보이는 쪽</p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs">
          <p className="font-extrabold">Backend</p>
          <p className="mt-1 text-[var(--text-secondary)]">요청 처리 · 서버 쪽 (예시: server.js)</p>
        </div>
      </div>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={result}
      controls={<span className="text-xs">교육 경계 · 제품 아키텍처 전부가 아님</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 역할 분류"
      statusLabel={focus === "both" ? "fe-be" : focus}
      title="Frontend · Backend 역할 분류"
    />
  )
}
