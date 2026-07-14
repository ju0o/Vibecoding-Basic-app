"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

const BIG = "로그인 있는 메모 앱 만들기"

const STEPS = [
  "정적 메모 화면 문구만 (FE)",
  "입력 칸 + 화면에 임시 표시 (FE)",
  "저장 API 설계 한 장 (문서)",
  "저장소 연결은 다음 단계로 미룸",
]

/**
 * C05 — toggle steps; score if order is small-verifiable chunks.
 */
export function TaskBreakdownExperience() {
  const [on, setOn] = useState([true, true, false, true])

  const active = useMemo(() => STEPS.filter((_, i) => on[i]), [on])
  const deferStep = STEPS[3] ?? ""
  const grade =
    active.length === 0
      ? "단계가 없음"
      : active.length > 3
        ? "너무 많음 — 한 스프린트에 과함 (교육 신호)"
        : deferStep !== "" && active.includes(deferStep) && active.length <= 3
          ? "좋음: 작은 검증 단위 + 나중 일 분리"
          : "보통: 더 쪼개거나 성공 기준을 붙이세요"

  const body = (
    <div className="grid gap-3">
      <p className="text-sm font-bold">큰 목표: {BIG}</p>
      <p className="text-xs text-[var(--text-secondary)]">포함할 작은 작업을 켜세요.</p>
      {STEPS.map((s, i) => (
        <button
          className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold ${
            on[i] ? "border-sky-500 bg-sky-500/15" : ""
          }`}
          key={s}
          onClick={() => setOn((arr) => arr.map((v, j) => (j === i ? !v : v)))}
          type="button"
        >
          {i + 1}. {s}
        </button>
      ))}
      <p className="text-sm font-extrabold" role="status">
        {grade}
      </p>
      <ol className="list-decimal pl-5 text-xs text-[var(--text-secondary)]">
        {active.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={grade}
      controls={<span className="text-xs">한 조각 = 확인 가능한 결과 1개</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 작업 분해"
      statusLabel="task-breakdown"
      title="기능을 작은 작업으로"
    />
  )
}
