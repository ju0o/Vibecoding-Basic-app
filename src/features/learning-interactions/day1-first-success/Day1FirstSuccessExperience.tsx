"use client"

import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"
import { AiConversation } from "../primitives/AiConversation"
import { BrowserPreview } from "../primitives/BrowserPreview"
import { FileTreeAnimation } from "../primitives/FileTreeAnimation"
import { FlowConnector } from "../primitives/FlowConnector"
import { InstallProgress } from "../primitives/InstallProgress"
import { TerminalSimulation } from "../primitives/TerminalSimulation"
import {
  canAdvance,
  createInitialDay1Model,
  type Day1Action,
  type Day1ErrorId,
  type Day1Model,
  type Day1PromptId,
  type Day1RevisionId,
  type Day1State,
  day1Reduce,
  ERRORS,
  FILE_TREE,
  getAriaLiveMessage,
  getHighlightedFileId,
  getTerminalLines,
  PLAN_STEPS,
  PROMPTS,
} from "./day1-state-machine"

const STATE_LABEL: Record<Day1State, string> = {
  idle: "시작 전",
  requesting: "요청 전달",
  planning: "계획",
  generating: "파일 생성",
  installing: "의존성 설치",
  starting_server: "서버 시작",
  running: "실행·미리보기",
  revising: "수정 반영",
  error: "오류",
  recovering: "복구",
  completed: "시뮬 완료",
}

const FLOW_ORDER: readonly Day1State[] = [
  "requesting",
  "planning",
  "generating",
  "installing",
  "starting_server",
  "running",
  "revising",
  "error",
  "completed",
]

function reduce(model: Day1Model, action: Day1Action): Day1Model {
  return day1Reduce(model, action)
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

export function Day1FirstSuccessExperience() {
  const [model, dispatch] = useReducer(reduce, undefined, createInitialDay1Model)
  const systemReduced = usePrefersReducedMotion()
  const [forceReduced, setForceReduced] = useState(false)
  const reducedMotion = systemReduced || forceReduced

  const promptText = model.promptId ? PROMPTS[model.promptId].text : null
  const terminalLines = useMemo(() => getTerminalLines(model), [model])
  const highlightId = getHighlightedFileId(model)
  const ariaLive = getAriaLiveMessage(model)
  const previewActive =
    model.state === "running" ||
    model.state === "revising" ||
    model.state === "completed" ||
    (model.state === "recovering" && model.serverStatus === "running")

  const fileNodes = FILE_TREE.map((n) => ({
    id: n.id,
    name: n.name,
    kind: n.kind,
    depth: n.depth,
    role: n.role,
    highlight: highlightId === n.id,
  }))

  const aiPhase =
    model.state === "idle"
      ? "idle"
      : model.state === "requesting"
        ? "requesting"
        : model.state === "planning"
          ? "planning"
          : model.state === "error" || model.state === "recovering"
            ? "error"
            : model.state === "completed"
              ? "done"
              : "working"

  const flowSteps = useMemo(() => {
    const idx = FLOW_ORDER.indexOf(model.state)
    return [
      { id: "req", label: "요청", active: model.state === "requesting", done: idx > 0 },
      { id: "plan", label: "계획", active: model.state === "planning", done: idx > 1 },
      {
        id: "gen",
        label: "파일",
        active: model.state === "generating",
        done: idx > 2,
      },
      {
        id: "inst",
        label: "설치",
        active: model.state === "installing",
        done: idx > 3,
      },
      {
        id: "srv",
        label: "서버",
        active: model.state === "starting_server",
        done: idx > 4,
      },
      {
        id: "run",
        label: "결과",
        active: model.state === "running" || model.state === "revising",
        done: model.state === "completed",
      },
    ]
  }, [model.state])

  const onKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }
      if (event.key === "ArrowRight" || event.key === "Enter") {
        if (canAdvance(model)) {
          event.preventDefault()
          dispatch({ type: "ADVANCE" })
        }
      }
      if (event.key === "ArrowLeft" || event.key === "Backspace") {
        event.preventDefault()
        dispatch({ type: "BACK" })
      }
      if (event.key === "r" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        dispatch({ type: "RESET" })
      }
    },
    [model],
  )

  useEffect(() => {
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onKey])

  const controls = (
    <>
      <button
        className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-3 py-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:opacity-40"
        disabled={!canAdvance(model)}
        onClick={() => dispatch({ type: "ADVANCE" })}
        type="button"
      >
        다음 단계
      </button>
      <button
        className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        onClick={() => dispatch({ type: "BACK" })}
        type="button"
      >
        이전
      </button>
      <button
        className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        onClick={() => dispatch({ type: model.paused ? "RESUME" : "PAUSE" })}
        type="button"
      >
        {model.paused ? "재개" : "일시 정지"}
      </button>
      <button
        className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        onClick={() => dispatch({ type: "RESET" })}
        type="button"
      >
        전체 초기화
      </button>
      <label className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
        <input
          checked={forceReduced}
          onChange={(e) => setForceReduced(e.target.checked)}
          type="checkbox"
        />
        모션 줄이기
      </label>
    </>
  )

  const requestPicker =
    model.state === "idle" || model.state === "completed" ? (
      <div className="grid gap-2 rounded-xl border border-[var(--border-default)] p-3">
        <p className="text-sm font-bold text-[var(--text-primary)]">1) 요청을 선택해 시작하세요</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PROMPTS) as Day1PromptId[]).map((id) => (
            <button
              className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-left text-sm font-semibold text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              key={id}
              onClick={() => dispatch({ type: "SELECT_PROMPT", promptId: id })}
              type="button"
            >
              {PROMPTS[id].label}
              <span className="mt-1 block text-xs font-normal text-[var(--text-tertiary)]">
                {PROMPTS[id].text}
              </span>
            </button>
          ))}
        </div>
      </div>
    ) : null

  const revisionPanel =
    model.state === "running" || model.state === "completed" ? (
      <div className="grid gap-2 rounded-xl border border-[var(--border-default)] p-3">
        <p className="text-sm font-bold text-[var(--text-primary)]">
          수정 요청 (파일 + 미리보기 동시 변화)
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["title", "제목 변경"],
              ["color", "색상 변경"],
              ["button", "버튼 추가"],
              ["copy", "설명 문구 변경"],
            ] as const
          ).map(([id, label]) => (
            <button
              className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              key={id}
              onClick={() =>
                dispatch({ type: "SELECT_REVISION", revisionId: id as Day1RevisionId })
              }
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    ) : null

  const errorPanel = (
    <div className="grid gap-2 rounded-xl border border-[var(--border-default)] p-3">
      <p className="text-sm font-bold text-[var(--text-primary)]">오류 시나리오 (의도적 연습)</p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(ERRORS) as Day1ErrorId[]).map((id) => (
          <button
            className="rounded-lg border border-rose-500/30 px-3 py-2 text-sm font-bold text-rose-800 dark:text-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:opacity-40"
            disabled={
              model.state !== "running" &&
              model.state !== "installing" &&
              model.state !== "starting_server"
            }
            key={id}
            onClick={() => dispatch({ type: "TRIGGER_ERROR", errorId: id })}
            type="button"
          >
            {ERRORS[id].label}
          </button>
        ))}
      </div>
      {model.state === "error" || model.state === "recovering" ? (
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold disabled:opacity-40"
            disabled={model.state !== "error"}
            onClick={() => dispatch({ type: "COPY_ERROR" })}
            type="button"
          >
            오류 복사 {model.errorCopied ? "✓" : ""}
          </button>
          <button
            className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold disabled:opacity-40"
            disabled={!model.errorCopied || model.state !== "error"}
            onClick={() => dispatch({ type: "SEND_TO_AI" })}
            type="button"
          >
            AI에게 전달 {model.errorSent ? "✓" : ""}
          </button>
          <button
            className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold disabled:opacity-40"
            disabled={!model.errorSent || model.state !== "error"}
            onClick={() => dispatch({ type: "APPLY_FIX" })}
            type="button"
          >
            해결 방법 적용
          </button>
          <button
            className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-bold disabled:opacity-40"
            disabled={model.state !== "recovering" && !(model.state === "error" && model.errorSent)}
            onClick={() => dispatch({ type: "RERUN" })}
            type="button"
          >
            다시 실행
          </button>
        </div>
      ) : null}
    </div>
  )

  const panels = {
    request: (
      <AiConversation
        phase={aiPhase}
        planSteps={[...PLAN_STEPS]}
        planVisible={
          model.state === "planning" ||
          model.state === "generating" ||
          model.state === "installing" ||
          model.state === "starting_server" ||
          model.state === "running" ||
          model.state === "revising" ||
          model.state === "completed"
        }
        reducedMotion={reducedMotion}
        requestText={promptText}
      />
    ),
    files: (
      <FileTreeAnimation
        highlightId={highlightId}
        nodes={fileNodes}
        reducedMotion={reducedMotion}
        visibleCount={model.filesVisible}
      />
    ),
    terminal: (
      <div className="grid gap-2">
        <TerminalSimulation lines={terminalLines} serverStatus={model.serverStatus} />
        <InstallProgress
          active={
            model.state === "installing" ||
            model.state === "starting_server" ||
            model.state === "running" ||
            model.state === "revising" ||
            model.state === "completed" ||
            model.state === "error" ||
            model.state === "recovering"
          }
          step={model.installStep}
          total={3}
        />
      </div>
    ),
    preview: (
      <BrowserPreview
        active={previewActive}
        preview={model.preview}
        reducedMotion={reducedMotion}
      />
    ),
  }

  const desktop = (
    <div className="grid gap-3">
      <FlowConnector steps={flowSteps} />
      {requestPicker}
      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
        {panels.request}
        {panels.files}
        {panels.terminal}
        {panels.preview}
      </div>
      {revisionPanel}
      {errorPanel}
    </div>
  )

  const mobile = (
    <div className="grid gap-3">
      <FlowConnector steps={flowSteps} />
      {requestPicker}
      <div className="flex flex-wrap gap-1" role="tablist" aria-label="패널 전환">
        {(
          [
            ["request", "요청/AI"],
            ["files", "파일"],
            ["terminal", "터미널"],
            ["preview", "미리보기"],
          ] as const
        ).map(([id, label]) => (
          <button
            aria-selected={model.mobilePanel === id}
            className={[
              "rounded-lg px-3 py-2 text-xs font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
              model.mobilePanel === id
                ? "bg-sky-500/20 text-sky-900 dark:text-sky-100"
                : "border border-[var(--border-default)] text-[var(--text-secondary)]",
            ].join(" ")}
            key={id}
            onClick={() => dispatch({ type: "SET_PANEL", panel: id })}
            role="tab"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{panels[model.mobilePanel]}</div>
      {revisionPanel}
      {errorPanel}
    </div>
  )

  return (
    <AnimationShell
      ariaLive={ariaLive}
      controls={controls}
      desktop={desktop}
      footerNote={
        <p>
          키보드: ←/→ 또는 Backspace/Enter · Ctrl/Cmd+R 초기화 · 자동 재생 없음. 실제 로컬 실습은
          아래 Sample Project에서 진행하세요.
        </p>
      }
      mobile={mobile}
      simulationNotice="교육용 시뮬레이션 · 실제 실습은 Sample Project"
      statusLabel={STATE_LABEL[model.state] + (model.paused ? " (일시 정지)" : "")}
      title="Day 1 인터랙티브 경험 — 요청부터 실행·수정·복구까지"
    />
  )
}
