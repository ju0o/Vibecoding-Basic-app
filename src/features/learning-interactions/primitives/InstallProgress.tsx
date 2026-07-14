"use client"

import { StatusIndicator } from "./StatusIndicator"

type InstallProgressProps = {
  readonly step: number
  readonly total: number
  readonly active: boolean
}

export function InstallProgress({ step, total, active }: InstallProgressProps) {
  const pct = active ? Math.round((step / total) * 100) : 0
  return (
    <div className="grid gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-primary)] p-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-[var(--text-secondary)]">
          설치 진행 (시뮬레이션)
        </span>
        <StatusIndicator
          label={pct >= 100 ? "성공" : active ? `${pct}%` : "대기"}
          tone={pct >= 100 ? "success" : active ? "active" : "idle"}
        />
      </div>
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={pct}
        className="h-2 overflow-hidden rounded-full bg-[var(--surface-secondary)]"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-sky-500 transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-[var(--text-tertiary)]">
        dependency 개념: package.json 을 보고 필요한 패키지를 받는 단계. 이 Day 1 샘플은 외부 패키지
        0개입니다.
      </p>
    </div>
  )
}
