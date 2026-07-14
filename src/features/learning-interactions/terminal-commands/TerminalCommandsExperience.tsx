"use client"

import { useReducer } from "react"
import { AnimationShell } from "../core/AnimationShell"
import { TerminalSimulation } from "../primitives/TerminalSimulation"

type State = {
  cwd: "home" | "project"
  lines: { id: string; kind: "input" | "output" | "success" | "error" | "info"; text: string }[]
  step: number
}

type Action =
  | { type: "CD_PROJECT" }
  | { type: "CD_HOME" }
  | { type: "RUN"; cmd: string }
  | { type: "RESET" }

function reduce(s: State, a: Action): State {
  if (a.type === "RESET") {
    return {
      cwd: "home",
      step: 0,
      lines: [{ id: "0", kind: "info", text: "cwd: (홈) — 프로젝트 밖" }],
    }
  }
  if (a.type === "CD_PROJECT") {
    return {
      ...s,
      cwd: "project",
      step: Math.max(s.step, 1),
      lines: [
        ...s.lines,
        { id: String(s.lines.length), kind: "input", text: "$ cd examples/day1-first-success" },
        {
          id: String(s.lines.length + 1),
          kind: "success",
          text: "cwd: 프로젝트 루트 (package.json 있음)",
        },
      ],
    }
  }
  if (a.type === "CD_HOME") {
    return {
      ...s,
      cwd: "home",
      lines: [
        ...s.lines,
        { id: String(s.lines.length), kind: "input", text: "$ cd ~" },
        { id: String(s.lines.length + 1), kind: "info", text: "cwd: (홈)" },
      ],
    }
  }
  if (a.type === "RUN") {
    if (s.cwd !== "project" && (a.cmd.includes("npm") || a.cmd.includes("node server"))) {
      return {
        ...s,
        lines: [
          ...s.lines,
          { id: String(s.lines.length), kind: "input", text: `$ ${a.cmd}` },
          {
            id: String(s.lines.length + 1),
            kind: "error",
            text: "package.json 없음 — 현재 폴더를 확인하세요",
          },
        ],
      }
    }
    if (a.cmd === "node -v") {
      return {
        ...s,
        step: Math.max(s.step, 2),
        lines: [
          ...s.lines,
          { id: String(s.lines.length), kind: "input", text: "$ node -v" },
          {
            id: String(s.lines.length + 1),
            kind: "success",
            text: "vXX.x.x (시뮬 · 실제 버전은 PC마다 다름)",
          },
        ],
      }
    }
    if (a.cmd === "npm run dev") {
      return {
        ...s,
        step: Math.max(s.step, 3),
        lines: [
          ...s.lines,
          { id: String(s.lines.length), kind: "input", text: "$ npm run dev" },
          { id: String(s.lines.length + 1), kind: "info", text: "→ node server.js" },
          { id: String(s.lines.length + 2), kind: "success", text: "http://127.0.0.1:3456" },
        ],
      }
    }
    return s
  }
  return s
}

export function TerminalCommandsExperience() {
  const [state, dispatch] = useReducer(reduce, {
    cwd: "home" as const,
    step: 0,
    lines: [{ id: "0", kind: "info" as const, text: "cwd: (홈) — 프로젝트 밖" }],
  })

  const body = (
    <div className="grid gap-3">
      <p className="text-xs font-bold text-amber-900 dark:text-amber-100">
        교육용 시뮬 · 실제 터미널은 샘플 폴더에서
      </p>
      <p className="text-sm font-bold">
        현재 위치: {state.cwd === "project" ? "프로젝트 루트 ✓" : "프로젝트 밖"}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-lg border px-3 py-2 text-xs font-bold"
          onClick={() => dispatch({ type: "CD_PROJECT" })}
          type="button"
        >
          프로젝트로 cd
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-xs font-bold"
          onClick={() => dispatch({ type: "CD_HOME" })}
          type="button"
        >
          홈으로
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-xs font-bold"
          onClick={() => dispatch({ type: "RUN", cmd: "node -v" })}
          type="button"
        >
          node -v
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-xs font-bold"
          onClick={() => dispatch({ type: "RUN", cmd: "npm run dev" })}
          type="button"
        >
          npm run dev
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-xs font-bold"
          onClick={() => dispatch({ type: "RESET" })}
          type="button"
        >
          초기화
        </button>
      </div>
      <TerminalSimulation
        lines={state.lines}
        serverStatus={state.step >= 3 && state.cwd === "project" ? "running" : "idle"}
      />
      <p className="text-sm text-[var(--text-secondary)]">
        습관: 어디에 서 있지? → package.json? → 명령? → 결과/오류
      </p>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={`cwd ${state.cwd}`}
      controls={
        <span className="text-xs text-[var(--text-tertiary)]">
          버튼을 눌러 위치와 명령을 바꿔 보세요
        </span>
      }
      desktop={body}
      mobile={body}
      simulationNotice="교육용 시뮬레이션"
      statusLabel={state.cwd}
      title="터미널 · 현재 폴더 인터랙티브"
    />
  )
}
