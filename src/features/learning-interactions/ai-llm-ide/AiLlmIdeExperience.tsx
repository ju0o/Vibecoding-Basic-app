"use client"

import { useReducer, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"
import { type AliModel, aliReduce, CORRECT, createAliModel, pairScore } from "./ai-llm-ide-state"

const MEANINGS = Object.values(CORRECT)

export function AiLlmIdeExperience() {
  const [model, dispatch] = useReducer(
    (m: AliModel, a: Parameters<typeof aliReduce>[1]) => aliReduce(m, a),
    undefined,
    createAliModel,
  )
  const [pickTerm, setPickTerm] = useState<string | null>(null)

  const pipeline = [
    "요청(말)",
    "모델 제안(텍스트)",
    "도구/사람이 파일에 저장·적용",
    "실행(터미널/브라우저)",
    "확인·수정 요청",
  ]

  const body = (
    <div className="grid gap-3">
      <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold">
        교육용 구분 · 특정 제품 순위/가격 없음 · 생성≠자동 실행
      </p>
      <div className="flex flex-wrap gap-2">
        {(["sort", "pair", "pipeline", "habit", "done"] as const).map((s) => (
          <button
            className={`rounded-full border px-2 py-1 text-[11px] font-bold ${model.scene === s ? "border-sky-500 bg-sky-500/20" : ""}`}
            key={s}
            onClick={() => dispatch({ type: "SET_SCENE", scene: s })}
            type="button"
          >
            {s}
          </button>
        ))}
      </div>

      {(model.scene === "sort" || model.scene === "pair") && (
        <div className="grid gap-3 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold">용어 선택</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.keys(CORRECT).map((term) => (
                <button
                  className={`rounded-lg border px-3 py-2 text-xs font-bold ${pickTerm === term ? "border-sky-500 bg-sky-500/15" : ""}`}
                  key={term}
                  onClick={() => setPickTerm(term)}
                  type="button"
                >
                  {term}
                  {model.pairs[term] ? " ✓" : ""}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">의미 연결 (선택한 용어에 클릭)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {MEANINGS.map((meaning) => (
                <button
                  className="rounded-lg border px-3 py-2 text-xs"
                  disabled={!pickTerm}
                  key={meaning}
                  onClick={() => {
                    if (pickTerm) dispatch({ type: "PAIR", term: pickTerm, meaning })
                  }}
                  type="button"
                >
                  {meaning}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm font-bold">맞은 개수: {pairScore(model)} / 5</p>
          </div>
        </div>
      )}

      {(model.scene === "pipeline" || model.scene === "habit" || model.scene === "done") && (
        <div className="grid gap-2">
          <p className="text-sm font-bold">생성 → 저장/적용 → 실행 파이프라인</p>
          <ol className="grid gap-2">
            {pipeline.map((step, i) => (
              <li
                className={`rounded-lg border px-3 py-2 text-sm ${i <= model.pipelineStep ? "border-sky-500 bg-sky-500/10 font-bold" : "opacity-50"}`}
                key={step}
              >
                {i + 1}. {step}
              </li>
            ))}
          </ol>
          <button
            className="w-fit rounded-lg border px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: "PIPELINE_NEXT" })}
            type="button"
          >
            다음 단계 강조
          </button>
        </div>
      )}

      {(model.scene === "habit" || model.scene === "done") && (
        <pre className="whitespace-pre-wrap rounded-lg bg-[var(--surface-secondary)] p-3 text-xs">
          {`목표: ...
관련 파일: ...
건드리지 말 파일: ...
아직 수정하지 말고 계획만: ...`}
        </pre>
      )}
    </div>
  )

  return (
    <AnimationShell
      ariaLive={`장면 ${model.scene}, 매칭 ${pairScore(model)}개`}
      controls={
        <>
          <button
            className="rounded-lg border bg-[var(--surface-secondary)] px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: "ADVANCE" })}
            type="button"
          >
            다음
          </button>
          <button
            className="rounded-lg border px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: "RESET" })}
            type="button"
          >
            초기화
          </button>
        </>
      }
      desktop={body}
      mobile={body}
      simulationNotice="교육용 구분 · 제품 순위 없음"
      statusLabel={model.scene}
      title="AI · LLM · IDE 구분 인터랙티브"
    />
  )
}
