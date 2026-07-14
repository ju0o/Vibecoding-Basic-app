"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

type Mode = "chat" | "agent" | "subagents" | "workflow"

const COPY: Record<Mode, { title: string; steps: string[]; risk: string }> = {
  chat: {
    title: "한 번 질문 · 한 번 답",
    steps: ["질문", "답변"],
    risk: "도구 반복·검증 루프가 약할 수 있음",
  },
  agent: {
    title: "Agent 루프",
    steps: ["목표", "관측", "도구/행동", "재관측", "완료 판단"],
    risk: "권한·범위 없으면 과한 변경 위험",
  },
  subagents: {
    title: "SubAgent 위임",
    steps: ["오케스트레이터", "조사 서브", "작성 서브", "검토 서브"],
    risk: "역할이 겹치면 중복·충돌",
  },
  workflow: {
    title: "Workflow",
    steps: ["요청", "구현", "검증", "기록", "사람 확인"],
    risk: "사람 확인을 빼면 사고 전파",
  },
}

type AgentWorkflowExperienceProps = {
  /** Lock primary mode for node-specific learning (still allow compare if unlocked) */
  readonly lockMode?: Mode
  readonly scenario?: string
  readonly allowCompare?: boolean
}

/**
 * C08–C10 — collaboration modes; node can lock focus mode + scenario.
 */
export function AgentWorkflowExperience({
  lockMode,
  scenario,
  allowCompare = true,
}: AgentWorkflowExperienceProps) {
  const [mode, setMode] = useState<Mode>(lockMode ?? "chat")
  const data = COPY[mode]
  const done = useMemo(() => data.steps.join(" → "), [data.steps])

  const body = (
    <div className="grid gap-3">
      {scenario ? (
        <p className="text-sm font-bold text-[var(--text-primary)]">시나리오: {scenario}</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(COPY) as Mode[]).map((m) => (
          <button
            className={`rounded-xl border px-3 py-2 text-xs font-extrabold ${
              mode === m ? "border-violet-500 bg-violet-500/15" : ""
            } ${lockMode && m !== lockMode && !allowCompare ? "opacity-40" : ""}`}
            disabled={!!lockMode && !allowCompare && m !== lockMode}
            key={m}
            onClick={() => {
              if (lockMode && !allowCompare && m !== lockMode) return
              setMode(m)
            }}
            type="button"
          >
            {COPY[m].title}
          </button>
        ))}
      </div>
      <p className="text-sm font-extrabold">{data.title}</p>
      <ol className="list-decimal pl-5 text-sm text-[var(--text-secondary)]">
        {data.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-xs font-bold">
        위험 신호: {data.risk}
      </p>
      <p className="font-mono text-[11px] text-[var(--text-tertiary)]">{done}</p>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={mode}
      controls={<span className="text-xs">교육 모델 · 특정 제품 = Agent 아님</span>}
      desktop={body}
      mobile={body}
      simulationNotice="Agent · SubAgent · Workflow"
      statusLabel={mode}
      title="협업 모드 탐색"
    />
  )
}
