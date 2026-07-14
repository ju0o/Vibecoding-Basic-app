"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

const ITEMS = [
  ["scope", "요청 범위 안의 파일만 변경됐는가?"],
  ["secret", "비밀·키가 결과/커밋에 없는가?"],
  ["run", "실행 또는 화면으로 확인했는가?"],
  ["intent", "의도하지 않은 리팩터/의존성이 없는가?"],
] as const

/**
 * C07 — checklist toggles → ship readiness label.
 */
export function QaChecklistExperience() {
  const [ok, setOk] = useState<Record<string, boolean>>({
    scope: false,
    secret: false,
    run: false,
    intent: false,
  })

  const pass = useMemo(() => ITEMS.every(([k]) => ok[k]), [ok])
  const count = ITEMS.filter(([k]) => ok[k]).length

  const body = (
    <div className="grid gap-3">
      <p className="text-sm font-bold">AI 출력 초안 검사 — 항목을 직접 확인했다고 표시하세요.</p>
      {ITEMS.map(([k, label]) => (
        <label className="flex items-start gap-2 text-sm font-semibold" key={k}>
          <input
            checked={ok[k]}
            className="mt-1"
            onChange={() => setOk((s) => ({ ...s, [k]: !s[k] }))}
            type="checkbox"
          />
          {label}
        </label>
      ))}
      <p className="text-sm font-extrabold" role="status">
        {pass ? "QA 통과 후보 (교육 체크)" : `미완료 ${count}/${ITEMS.length} — 생성 ≠ 완료`}
      </p>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={pass ? "pass" : "pending"}
      controls={<span className="text-xs">사람 확인 지점</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 QA"
      statusLabel="qa"
      title="코드 검토 · QA 체크"
    />
  )
}
