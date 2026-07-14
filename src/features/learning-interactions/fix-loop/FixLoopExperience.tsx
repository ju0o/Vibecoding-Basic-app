"use client"

import { useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

const PHASES = [
  { id: "repro", title: "1 재현", detail: "같은 명령으로 오류를 다시 낸다" },
  { id: "evidence", title: "2 증거", detail: "폴더·명령·오류 전문을 모은다" },
  { id: "hyp", title: "3 가설 1개", detail: "원인 후보를 하나만 고른다" },
  { id: "patch", title: "4 작은 수정", detail: "한 곳만 고친다" },
  { id: "rerun", title: "5 재실행", detail: "같은 명령으로 확인한다" },
] as const

/**
 * C06 — advance/back through fix loop; cannot skip without flag.
 */
export function FixLoopExperience() {
  const [i, setI] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const phase = PHASES[i] ?? PHASES[0]

  const next = () => {
    setLog((L) => [...L, phase.title])
    setI((x) => Math.min(PHASES.length - 1, x + 1))
  }
  const reset = () => {
    setI(0)
    setLog([])
  }

  const body = (
    <div className="grid gap-3">
      <p className="text-sm font-bold">오류 수정 Loop — 단계를 순서대로 진행하세요.</p>
      <div className="flex flex-wrap gap-2">
        {PHASES.map((p, idx) => (
          <span
            className={`rounded-full border px-2 py-1 text-[10px] font-bold ${
              idx === i ? "border-amber-500 bg-amber-500/15" : idx < i ? "opacity-60" : ""
            }`}
            key={p.id}
          >
            {p.title}
          </span>
        ))}
      </div>
      <div className="rounded-xl border bg-[var(--surface-secondary)] p-4">
        <p className="text-lg font-extrabold">{phase.title}</p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{phase.detail}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs font-extrabold"
          disabled={i >= PHASES.length - 1}
          onClick={next}
          type="button"
        >
          다음 단계
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-xs font-bold"
          onClick={reset}
          type="button"
        >
          루프 리셋
        </button>
      </div>
      <p className="text-xs text-[var(--text-tertiary)]">경과: {log.join(" → ") || "(시작)"}</p>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={phase.title}
      controls={<span className="text-xs">추측 대량 수정 금지 · 한 루프씩</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 디버그 루프"
      statusLabel="fix-loop"
      title="오류 수정 Loop"
    />
  )
}
