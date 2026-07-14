"use client"

import { useCallback, useEffect, useReducer, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"
import { BrowserPreview } from "../primitives/BrowserPreview"
import { FileTreeAnimation } from "../primitives/FileTreeAnimation"
import { InstallProgress } from "../primitives/InstallProgress"
import { TerminalSimulation } from "../primitives/TerminalSimulation"
import {
  ariaNn,
  buildErrorAi,
  createNnModel,
  type NnModel,
  type NnScene,
  nnReduce,
  SAMPLE_SCRIPTS,
  terminalLines,
} from "./node-npm-state"

const LABELS: Record<NnScene, string> = {
  inspect: "1 package.json ↔ 명령",
  install: "2 npm install",
  dev: "3 dev server",
  missing: "4 Missing script",
  wrong_dir: "5 잘못된 폴더",
  builder: "6 Command Builder",
  ai_error: "7 AI 오류 요청",
  done: "완료",
}

export function NodeNpmExperience() {
  const [model, dispatch] = useReducer(
    (m: NnModel, a: Parameters<typeof nnReduce>[1]) => nnReduce(m, a),
    undefined,
    createNnModel,
  )
  const [forceReduced, setForceReduced] = useState(false)

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

  const lines = terminalLines(model)
  const previewOn = model.server === "running"

  const body = (
    <div className="grid gap-3">
      <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold">
        교육용 시뮬레이션 · 실제 Shell 미실행 · 샘플 scripts = Day1 프로젝트와 동일
      </p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(LABELS) as NnScene[]).map((s) => (
          <button
            className={[
              "rounded-full border px-2.5 py-1 text-[11px] font-bold",
              model.scene === s ? "border-sky-500 bg-sky-500/20" : "border-[var(--border-default)]",
            ].join(" ")}
            key={s}
            onClick={() => dispatch({ type: "SET_SCENE", scene: s })}
            type="button"
          >
            {LABELS[s]}
          </button>
        ))}
      </div>

      <div className="grid gap-3 rounded-xl border border-[var(--border-default)] p-3 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-extrabold">package.json (샘플)</h3>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-[var(--surface-secondary)] p-3 font-mono text-[11px] leading-5">
            {`{
  "name": "day1-first-success",
  "scripts": {
    "dev": "node server.js",
    "start": "node server.js"
  }
  // dependencies / devDependencies: 이 샘플에는 없음
}`}
          </pre>
          <p className="mt-2 text-xs text-[var(--text-tertiary)]">
            scripts 이름을 누르면 터미널 명령이 연결됩니다. <code>dev</code>는 관례적 이름입니다.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["dev", "start", "serve"] as const).map((name) => (
              <button
                className={[
                  "rounded-lg border px-3 py-2 text-xs font-bold",
                  model.selectedScript === name
                    ? "border-sky-500 bg-sky-500/15"
                    : "border-[var(--border-default)]",
                  name === "serve" ? "border-rose-400/50" : "",
                ].join(" ")}
                key={name}
                onClick={() => dispatch({ type: "SELECT_SCRIPT", name })}
                type="button"
              >
                {name}
                {name === "serve"
                  ? " (없음)"
                  : ` → ${SAMPLE_SCRIPTS[name as "dev" | "start"] ?? ""}`}
              </button>
            ))}
          </div>
          {model.selectedScript && model.selectedScript !== "serve" ? (
            <p className="mt-2 text-sm font-bold text-sky-800 dark:text-sky-200">
              npm run {model.selectedScript} ⇔ {SAMPLE_SCRIPTS[model.selectedScript]}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <TerminalSimulation
            lines={lines}
            serverStatus={
              model.server === "error"
                ? "error"
                : model.server === "running"
                  ? "running"
                  : model.server === "starting"
                    ? "starting"
                    : "idle"
            }
          />
          <InstallProgress
            active={model.scene === "install" || model.installStep > 0}
            step={model.installStep}
            total={3}
          />
          <BrowserPreview
            active={previewOn}
            preview={{
              title: "나의 첫 바이브코딩",
              message: "안녕하세요",
              accent: "#e8f1ff",
              showButton: false,
              note: previewOn ? "서버 running (시뮬)" : "서버 대기",
            }}
            reducedMotion={forceReduced}
          />
        </div>
      </div>

      {(model.scene === "wrong_dir" || model.scene === "inspect") && (
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg border px-3 py-2 text-xs font-bold"
            onClick={() => dispatch({ type: "SET_CWD", cwd: "outside" })}
            type="button"
          >
            터미널 위치: 프로젝트 밖
          </button>
          <button
            className="rounded-lg border px-3 py-2 text-xs font-bold"
            onClick={() => dispatch({ type: "SET_CWD", cwd: "project" })}
            type="button"
          >
            터미널 위치: 프로젝트 루트
          </button>
          <FileTreeAnimation
            highlightId={model.cwd === "project" ? "pkg" : null}
            nodes={[
              {
                id: "pkg",
                name: "package.json",
                kind: "file",
                depth: 0,
                role: "루트 표시",
                highlight: model.cwd === "project",
              },
              {
                id: "server",
                name: "server.js",
                kind: "file",
                depth: 0,
                role: "dev가 실행",
                highlight: false,
              },
            ]}
            reducedMotion={forceReduced}
            visibleCount={2}
          />
        </div>
      )}

      {model.scene === "builder" || model.scene === "done" ? (
        <div className="rounded-xl border p-3">
          <h3 className="text-sm font-extrabold">Command Builder</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["install", "dev", "build", "test"] as const).map((c) => (
              <button
                className="rounded-lg border px-3 py-2 text-xs font-bold"
                key={c}
                onClick={() => dispatch({ type: "BUILDER", choice: c })}
                type="button"
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            이 샘플에 정의된 실행 가능 명령: install(개념) · dev/start. build/test 는 scripts에 없어
            실행 불가 설명이 뜹니다.
          </p>
        </div>
      ) : null}

      {model.scene === "ai_error" || model.scene === "done" || model.lastError ? (
        <div className="rounded-xl border p-3">
          <h3 className="text-sm font-extrabold">AI 오류 요청 조합</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {(
              [
                ["cwd", "현재 폴더"],
                ["cmd", "실행 명령"],
                ["err", "오류 전문"],
                ["scripts", "scripts"],
                ["goal", "원하는 결과"],
                ["analyze", "분석만"],
              ] as const
            ).map(([k, label]) => (
              <button
                className={[
                  "rounded-lg border px-2 py-1.5 text-xs font-bold",
                  model.aiBits[k] ? "border-sky-500 bg-sky-500/15" : "",
                ].join(" ")}
                key={k}
                onClick={() => dispatch({ type: "TOGGLE_AI", key: k })}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-[var(--surface-secondary)] p-3 text-xs">
            {buildErrorAi(model)}
          </pre>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-sm font-bold"
          onClick={() => dispatch({ type: "RUN_SELECTED" })}
          type="button"
        >
          선택 명령 실행 (시뮬)
        </button>
        {model.scene === "install" ? (
          <button
            className="rounded-lg border px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: "INSTALL_STEP" })}
            type="button"
          >
            install 진행 +1
          </button>
        ) : null}
      </div>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={ariaNn(model)}
      controls={
        <>
          <button
            className="rounded-lg border bg-[var(--surface-secondary)] px-3 py-2 text-sm font-bold"
            disabled={model.paused}
            onClick={() => dispatch({ type: "ADVANCE" })}
            type="button"
          >
            다음
          </button>
          <button
            className="rounded-lg border px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: "BACK" })}
            type="button"
          >
            이전
          </button>
          <button
            className="rounded-lg border px-3 py-2 text-sm font-bold"
            onClick={() => dispatch({ type: model.paused ? "RESUME" : "PAUSE" })}
            type="button"
          >
            {model.paused ? "재개" : "일시 정지"}
          </button>
          <button
            className="rounded-lg border px-3 py-2 text-sm font-bold"
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
      desktop={body}
      footerNote={<p>후보 C 미제작 · Day1 샘플 재사용 · keyboard ←/→</p>}
      mobile={body}
      simulationNotice="교육용 시뮬레이션 · 실제 실습은 Sample Project"
      statusLabel={LABELS[model.scene] + (model.paused ? " (일시 정지)" : "")}
      title="Node · npm · package.json 인터랙티브"
    />
  )
}
