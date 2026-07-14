"use client"

import type { TerminalLine } from "../core/animation-types"
import { StatusIndicator } from "./StatusIndicator"

type TerminalSimulationProps = {
  readonly lines: readonly TerminalLine[]
  readonly serverStatus: "idle" | "starting" | "running" | "error"
}

const LINE_CLASS: Record<TerminalLine["kind"], string> = {
  input: "text-sky-700 dark:text-sky-300",
  output: "text-[var(--text-secondary)]",
  success: "text-emerald-700 dark:text-emerald-300",
  error: "text-rose-700 dark:text-rose-300 font-bold",
  info: "text-[var(--text-tertiary)]",
}

export function TerminalSimulation({ lines, serverStatus }: TerminalSimulationProps) {
  const tone =
    serverStatus === "error"
      ? "error"
      : serverStatus === "running"
        ? "success"
        : serverStatus === "starting"
          ? "active"
          : "idle"

  return (
    <div className="grid h-full gap-2 rounded-xl border border-[var(--border-default)] bg-[#0f172a] p-3 text-[var(--surface-primary)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-slate-100">터미널 (시뮬레이션)</h3>
        <StatusIndicator
          label={
            serverStatus === "idle"
              ? "서버 꺼짐"
              : serverStatus === "starting"
                ? "서버 시작"
                : serverStatus === "running"
                  ? "서버 실행 중"
                  : "서버 오류"
          }
          tone={tone}
        />
      </div>
      <div
        className="max-h-48 overflow-auto rounded-md bg-black/40 p-2 font-mono text-[11px] leading-5 sm:text-xs"
        role="log"
      >
        {lines.map((line) => (
          <p className={LINE_CLASS[line.kind]} key={line.id}>
            {line.text}
          </p>
        ))}
      </div>
    </div>
  )
}
