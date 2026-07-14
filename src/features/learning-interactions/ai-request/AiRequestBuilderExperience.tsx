"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

const PARTS = [
  ["goal", "목표", "목표: Day1 샘플 제목 문구만 바꾸고 싶다"],
  ["scope", "범위", "범위: src/index.html (또는 main.js 문자열)만"],
  ["constraint", "제약", "제약: server.js·package.json 수정 금지. 비밀 키 금지."],
  ["status", "현황", "현황: 로컬 서버 실행됨. 제목은 아직 기본 문구."],
  ["mode", "모드", "모드: 수정 패치 제안 전에 변경 파일 목록만 먼저."],
  ["success", "성공기준", "성공: 브라우저 새로고침 후 제목이 새 문구."],
] as const

/**
 * C01 — toggle request parts → quality label + composed prompt.
 */
export function AiRequestBuilderExperience() {
  const [on, setOn] = useState<Record<string, boolean>>({
    goal: true,
    scope: false,
    constraint: false,
    status: true,
    mode: false,
    success: false,
  })

  const text = useMemo(
    () =>
      PARTS.filter(([k]) => on[k])
        .map(([, , line]) => line)
        .join("\n"),
    [on],
  )

  const score = PARTS.filter(([k]) => on[k]).length
  const quality =
    score >= 5
      ? "탄탄한 요청 (목표·범위·제약·확인이 보임)"
      : score >= 3
        ? "보통 — 범위·제약·성공 기준을 더 채우세요"
        : "약함 — “잘 만들어 줘”에 가깝습니다"

  const body = (
    <div className="grid gap-3">
      <p className="text-sm font-bold">조각을 켜면 요청문이 조립되고 품질 라벨이 바뀝니다.</p>
      <div className="flex flex-wrap gap-2">
        {PARTS.map(([k, label]) => (
          <button
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold ${
              on[k] ? "border-sky-500 bg-sky-500/15" : ""
            }`}
            key={k}
            onClick={() => setOn((s) => ({ ...s, [k]: !s[k] }))}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-sm font-extrabold" role="status">
        {quality} · {score}/6
      </p>
      <pre className="whitespace-pre-wrap rounded-xl bg-[var(--surface-secondary)] p-3 text-xs">
        {text || "(조각을 켜 보세요)"}
      </pre>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={quality}
      controls={<span className="text-xs">교육 패턴 · 제품별 UI와 무관</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 요청 조립기"
      statusLabel="ai-request"
      title="좋은 AI 작업 요청 만들기"
    />
  )
}
