"use client"

import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"
import { BrowserPreview } from "../primitives/BrowserPreview"
import { FileTreeAnimation } from "../primitives/FileTreeAnimation"
import {
  ariaFor,
  buildAiRequest,
  createFsModel,
  FILES,
  type FileId,
  type FsModel,
  type FsScene,
  fsReduce,
} from "./file-structure-state"

const SCENE_LABEL: Record<FsScene, string> = {
  chaos: "혼란 — 파일이 많다",
  roles: "역할 보기",
  find: "수정 대상 찾기",
  wrong: "잘못된 선택",
  edit: "올바른 파일 수정",
  ai_scope: "AI 요청 범위",
  compare: "구조 비교",
  done: "완료",
}

const FILE_ORDER: readonly FileId[] = ["pkg", "server", "readme", "src", "html", "css", "js"]

function useReduced() {
  const [r, setR] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const u = () => setR(mq.matches)
    u()
    mq.addEventListener("change", u)
    return () => mq.removeEventListener("change", u)
  }, [])
  return r
}

export function ProjectFileStructureExperience() {
  const [model, dispatch] = useReducer(
    (m: FsModel, a: Parameters<typeof fsReduce>[1]) => fsReduce(m, a),
    undefined,
    createFsModel,
  )
  const systemReduced = useReduced()
  const [forceReduced, setForceReduced] = useState(false)
  const reduced = systemReduced || forceReduced

  const nodes = useMemo(
    () =>
      FILE_ORDER.map((id) => {
        const f = FILES[id]
        const depth = id === "html" || id === "css" || id === "js" ? 1 : 0
        return {
          id,
          name: f.name,
          kind: (id === "src" ? "folder" : "file") as "file" | "folder",
          depth,
          role: f.role,
          highlight: model.selected === id,
        }
      }),
    [model.selected],
  )

  const selectedMeta = model.selected ? FILES[model.selected] : null
  const previewActive =
    model.scene === "edit" ||
    model.scene === "ai_scope" ||
    model.scene === "compare" ||
    model.scene === "done" ||
    model.scene === "find" ||
    model.scene === "wrong" ||
    model.scene === "roles"

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    if (e.key === "ArrowRight" || e.key === "Enter") {
      e.preventDefault()
      dispatch({ type: "ADVANCE" })
    }
    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      e.preventDefault()
      dispatch({ type: "BACK" })
    }
  }, [])
  useEffect(() => {
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onKey])

  const hint =
    model.scene === "wrong" && selectedMeta
      ? `${selectedMeta.name}: ${selectedMeta.risk} · 환영 문구 본문은 src/main.js 에 있습니다.`
      : model.scene === "chaos"
        ? "파일이 많아 보여도 됩니다. ‘다음’으로 역할 보기로 가거나 파일을 눌러 보세요."
        : null

  const desktop = (
    <div className="grid gap-3">
      <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-950 dark:text-amber-50">
        교육용 시뮬레이션입니다. 실제 파일 수정은 examples/day1-first-success 에서 진행하세요.
      </p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SCENE_LABEL) as FsScene[]).map((s) => (
          <button
            className={[
              "rounded-full border px-2.5 py-1 text-[11px] font-bold",
              model.scene === s
                ? "border-sky-500 bg-sky-500/20 text-sky-900 dark:text-sky-100"
                : "border-[var(--border-default)] text-[var(--text-tertiary)]",
            ].join(" ")}
            key={s}
            onClick={() => dispatch({ type: "SET_SCENE", scene: s })}
            type="button"
          >
            {SCENE_LABEL[s]}
          </button>
        ))}
      </div>
      {model.scene === "find" ? (
        <p className="text-sm font-bold text-[var(--text-primary)]">
          목표: “환영 문구를 바꾸고 싶어요” → 담당 파일을 고른 뒤 「선택 확인」
        </p>
      ) : null}
      {hint ? <p className="text-sm text-rose-800 dark:text-rose-200">{hint}</p> : null}

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="grid gap-2">
          <FileTreeAnimation
            highlightId={model.selected}
            nodes={nodes}
            reducedMotion={reduced}
            visibleCount={nodes.length}
          />
          <div className="flex flex-wrap gap-2">
            {FILE_ORDER.map((id) => (
              <button
                className={[
                  "rounded-lg border px-2 py-1.5 text-xs font-bold",
                  model.selected === id
                    ? "border-sky-500 bg-sky-500/15"
                    : "border-[var(--border-default)]",
                ].join(" ")}
                key={id}
                onClick={() => dispatch({ type: "SELECT_FILE", id })}
                type="button"
              >
                {FILES[id].name}
              </button>
            ))}
          </div>
          {model.scene === "find" || model.scene === "wrong" ? (
            <button
              className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-sm font-bold"
              onClick={() => dispatch({ type: "TRY_FIND" })}
              type="button"
            >
              선택 확인
            </button>
          ) : null}
          {model.scene === "edit" ? (
            <button
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-bold"
              onClick={() => dispatch({ type: "APPLY_EDIT" })}
              type="button"
            >
              main.js 문구 수정 적용
            </button>
          ) : null}
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-3 text-sm">
            <h3 className="font-extrabold text-[var(--text-primary)]">선택 파일 정보</h3>
            {selectedMeta ? (
              <dl className="mt-2 grid gap-1 text-[var(--text-secondary)]">
                <div>
                  <dt className="text-xs font-bold text-[var(--text-tertiary)]">역할</dt>
                  <dd>{selectedMeta.role}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-[var(--text-tertiary)]">화면·실행 관계</dt>
                  <dd>{selectedMeta.link}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-[var(--text-tertiary)]">수정 위험</dt>
                  <dd>{selectedMeta.risk}</dd>
                </div>
                {selectedMeta.command ? (
                  <div>
                    <dt className="text-xs font-bold text-[var(--text-tertiary)]">관련 명령</dt>
                    <dd className="font-mono text-xs">{selectedMeta.command}</dd>
                  </div>
                ) : null}
              </dl>
            ) : (
              <p className="mt-2 text-[var(--text-tertiary)]">파일을 선택하세요.</p>
            )}
          </div>

          <BrowserPreview
            active={previewActive}
            preview={{
              title: "나의 첫 바이브코딩",
              message: "안녕하세요",
              accent:
                model.scene === "compare" && model.compareMode === "single" ? "#fef3c7" : "#e8f1ff",
              showButton: false,
              note: model.previewText,
            }}
            reducedMotion={reduced}
          />
        </div>
      </div>

      {model.scene === "ai_scope" || model.scene === "done" || model.scene === "compare" ? (
        <div className="grid gap-2 rounded-xl border border-[var(--border-default)] p-3">
          <h3 className="text-sm font-extrabold text-[var(--text-primary)]">AI 요청 조합</h3>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["analyze", "분석 먼저"],
                ["file", "수정할 파일"],
                ["forbid", "수정 금지"],
                ["done", "완료 조건"],
                ["verify", "검증/실행"],
              ] as const
            ).map(([key, label]) => (
              <button
                className={[
                  "rounded-lg border px-3 py-2 text-xs font-bold",
                  model.aiBlocks[key]
                    ? "border-sky-500 bg-sky-500/15"
                    : "border-[var(--border-default)]",
                ].join(" ")}
                key={key}
                onClick={() => dispatch({ type: "TOGGLE_AI", key })}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <pre className="overflow-x-auto rounded-lg bg-[var(--surface-secondary)] p-3 text-xs whitespace-pre-wrap text-[var(--text-secondary)]">
            {buildAiRequest(model)}
          </pre>
          <p className="text-xs text-[var(--text-tertiary)]">
            시각 범위: {model.aiBlocks.file ? "src/main.js 강조" : "파일 미지정"} ·{" "}
            {model.aiBlocks.forbid ? "그 외 파일 잠금 표시" : ""}
          </p>
        </div>
      ) : null}

      {model.scene === "compare" || model.scene === "done" ? (
        <div className="grid gap-2 rounded-xl border border-[var(--border-default)] p-3">
          <h3 className="text-sm font-extrabold text-[var(--text-primary)]">구조 비교</h3>
          <div className="flex gap-2">
            <button
              className="rounded-lg border px-3 py-2 text-xs font-bold"
              onClick={() => dispatch({ type: "SET_COMPARE", mode: "single" })}
              type="button"
            >
              index.html 하나
            </button>
            <button
              className="rounded-lg border px-3 py-2 text-xs font-bold"
              onClick={() => dispatch({ type: "SET_COMPARE", mode: "split" })}
              type="button"
            >
              src + package.json
            </button>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {model.compareMode === "single"
              ? "파일 수 적음 · 브라우저로 바로 열기 가능 · 작은 실험에 충분할 때가 많음."
              : "파일 분리 · npm scripts로 실행 · 확장이 쉬울 때가 많음. 무조건 우열이 아님."}
          </p>
        </div>
      ) : null}
    </div>
  )

  return (
    <AnimationShell
      ariaLive={ariaFor(model)}
      controls={
        <>
          <button
            className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-3 py-2 text-sm font-bold disabled:opacity-40"
            disabled={model.paused}
            onClick={() => dispatch({ type: "ADVANCE" })}
            type="button"
          >
            다음
          </button>
          <button
            className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: "BACK" })}
            type="button"
          >
            이전
          </button>
          <button
            className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: model.paused ? "RESUME" : "PAUSE" })}
            type="button"
          >
            {model.paused ? "재개" : "일시 정지"}
          </button>
          <button
            className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: "RESET" })}
            type="button"
          >
            초기화
          </button>
          <label className="inline-flex items-center gap-2 text-xs font-semibold">
            <input
              checked={forceReduced}
              onChange={(e) => setForceReduced(e.target.checked)}
              type="checkbox"
            />
            모션 줄이기
          </label>
        </>
      }
      desktop={desktop}
      footerNote={<p>키보드 ←/→ · 실제 실습은 샘플 폴더 · 후보 B 본문은 아직 없음</p>}
      mobile={desktop}
      simulationNotice="교육용 시뮬레이션 · 실제 실습은 Sample Project"
      statusLabel={SCENE_LABEL[model.scene] + (model.paused ? " (일시 정지)" : "")}
      title="파일 구조 인터랙티브 — 어떤 파일을 건드릴까?"
    />
  )
}
