"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

const ERRORS = {
  missing: 'npm error Missing script: "serve"',
  enoent: "npm error enoent Could not read package.json",
  port: "Error: listen EADDRINUSE 127.0.0.1:3456",
} as const

export function ErrorsToAiExperience() {
  const [errKey, setErrKey] = useState<keyof typeof ERRORS>("missing")
  const [bits, setBits] = useState({
    folder: true,
    cmd: true,
    err: true,
    scripts: false,
    goal: true,
    analyze: true,
    secret: false,
  })

  const request = useMemo(() => {
    const lines: string[] = []
    if (bits.goal) lines.push("목표: 개발 서버를 실행하고 싶다")
    if (bits.folder) lines.push("현재 폴더: examples/day1-first-success")
    if (bits.cmd) lines.push("실행한 명령: npm run serve")
    if (bits.err) lines.push(`오류 전문:\n${ERRORS[errKey]}`)
    if (bits.scripts) {
      lines.push('package.json scripts: { "dev": "node server.js", "start": "node server.js" }')
    }
    if (bits.analyze) lines.push("아직 파일을 수정하지 말고 원인 후보와 확인 순서만 알려 주세요.")
    if (bits.secret) lines.push("API_KEY=sk-xxxxx  (⚠️ 실전에서는 지우세요!)")
    return lines.join("\n")
  }, [bits, errKey])

  const quality =
    bits.folder && bits.cmd && bits.err && bits.analyze && !bits.secret
      ? "좋은 요청 (맥락+분석, 비밀 없음)"
      : bits.secret
        ? "위험: 비밀이 포함됨"
        : "부족: 폴더·명령·오류·분석 요청을 더 채우세요"

  const body = (
    <div className="grid gap-3">
      <p className="text-xs font-bold">
        오류를 고르고, AI에게 붙일 조각을 켜세요. 품질이 변합니다.
      </p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(ERRORS) as (keyof typeof ERRORS)[]).map((k) => (
          <button
            className={`rounded-lg border px-3 py-2 text-xs font-bold ${errKey === k ? "border-sky-500 bg-sky-500/15" : ""}`}
            key={k}
            onClick={() => setErrKey(k)}
            type="button"
          >
            {k}
          </button>
        ))}
      </div>
      <pre className="rounded-lg bg-[#0f172a] p-3 font-mono text-xs text-rose-300">
        {ERRORS[errKey]}
      </pre>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["folder", "폴더"],
            ["cmd", "명령"],
            ["err", "오류"],
            ["scripts", "scripts"],
            ["goal", "목표"],
            ["analyze", "분석만"],
            ["secret", "비밀(나쁜 예)"],
          ] as const
        ).map(([k, label]) => (
          <button
            className={`rounded-lg border px-2 py-1.5 text-xs font-bold ${bits[k] ? "border-sky-500 bg-sky-500/15" : ""}`}
            key={k}
            onClick={() => setBits((b) => ({ ...b, [k]: !b[k] }))}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-sm font-bold">{quality}</p>
      <pre className="whitespace-pre-wrap rounded-lg bg-[var(--surface-secondary)] p-3 text-xs">
        {request}
      </pre>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={quality}
      controls={<span className="text-xs">선택에 따라 요청문과 품질 라벨이 바뀝니다</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 · 실제 키를 붙여 넣지 마세요"
      statusLabel="errors-to-ai"
      title="오류 → AI 전달 인터랙티브"
    />
  )
}
