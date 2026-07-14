"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

type Style = "vague" | "structured"

/**
 * C02 — compare vague vs structured prompt; show predicted issues.
 */
export function PromptLabExperience() {
  const [style, setStyle] = useState<Style>("vague")
  const [wantFormat, setWantFormat] = useState(true)
  const [wantBan, setWantBan] = useState(true)
  const [wantExample, setWantExample] = useState(false)

  const prompt = useMemo(() => {
    if (style === "vague") return "웹사이트 예쁘게 잘 만들어 줘."
    const lines = [
      "목표: Day1 샘플 카드 제목을 '나의 학습 노트'로 변경",
      wantFormat ? "출력: 변경할 파일 경로 + 수정 전/후 한 줄" : "",
      wantBan ? "금지: server.js, 새 의존성, API 키" : "",
      wantExample ? "예: 제목 노드 id='title' 텍스트만" : "",
      "모르면 추측하지 말고 질문 1개만.",
    ].filter(Boolean)
    return lines.join("\n")
  }, [style, wantFormat, wantBan, wantExample])

  const risks = useMemo(() => {
    if (style === "vague") {
      return ["범위 없음 → 과한 리팩터 위험", "성공 기준 없음", "금지 없음 → 비밀/의존성 추가 위험"]
    }
    const r: string[] = []
    if (!wantFormat) r.push("형식 미지정 → 장황한 답변")
    if (!wantBan) r.push("금지 없음 → 범위 팽창")
    if (!wantExample) r.push("예시 없음 → 위치 오해 가능 (치명적이진 않음)")
    if (r.length === 0) r.push("구조화됨 — 여전히 결과는 검증 필요")
    return r
  }, [style, wantFormat, wantBan, wantExample])

  const body = (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {(["vague", "structured"] as Style[]).map((s) => (
          <button
            className={`rounded-xl border px-3 py-2 text-sm font-extrabold ${
              style === s ? "border-violet-500 bg-violet-500/15" : ""
            }`}
            key={s}
            onClick={() => setStyle(s)}
            type="button"
          >
            {s === "vague" ? "모호한 프롬프트" : "구조화 프롬프트"}
          </button>
        ))}
      </div>
      {style === "structured" ? (
        <div className="flex flex-wrap gap-2">
          {(
            [
              [wantFormat, setWantFormat, "출력 형식"],
              [wantBan, setWantBan, "금지"],
              [wantExample, setWantExample, "예시"],
            ] as const
          ).map(([val, set, label]) => (
            <button
              className={`rounded-lg border px-2 py-1.5 text-xs font-bold ${
                val ? "border-sky-500 bg-sky-500/15" : ""
              }`}
              key={label}
              onClick={() => set((v) => !v)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
      <pre className="whitespace-pre-wrap rounded-xl bg-[#0f172a] p-3 text-xs text-slate-100">
        {prompt}
      </pre>
      <ul className="list-disc pl-5 text-sm text-[var(--text-secondary)]">
        {risks.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={style}
      controls={<span className="text-xs">만능 주문 아님 · 검증 루프 필요</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 Prompt Lab"
      statusLabel="prompt-lab"
      title="프롬프트 비교 실험"
    />
  )
}
