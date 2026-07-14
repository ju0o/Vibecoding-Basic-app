"use client"

import type { PreviewModel } from "../core/animation-types"
import { StatusIndicator } from "./StatusIndicator"

type BrowserPreviewProps = {
  readonly active: boolean
  readonly preview: PreviewModel
  readonly reducedMotion: boolean
}

export function BrowserPreview({ active, preview, reducedMotion }: BrowserPreviewProps) {
  return (
    <div className="grid h-full gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-[var(--text-primary)]">브라우저 미리보기</h3>
        <StatusIndicator
          label={active ? "미리보기 활성" : "대기"}
          tone={active ? "success" : "idle"}
        />
      </div>
      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)]">
        <div className="flex items-center gap-1 border-b border-[var(--border-subtle)] px-2 py-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 truncate font-mono text-[10px] text-[var(--text-tertiary)]">
            http://127.0.0.1:3456
          </span>
        </div>
        <div
          className={[
            "flex min-h-[140px] items-center justify-center p-4 transition-colors",
            reducedMotion ? "" : "duration-300",
            active ? "" : "opacity-50",
          ].join(" ")}
          style={{ background: active ? preview.accent : "var(--surface-secondary)" }}
        >
          {active ? (
            <div className="w-full max-w-xs rounded-xl bg-white p-4 text-center shadow-md dark:bg-slate-900">
              <p className="text-lg font-extrabold text-slate-900 dark:text-slate-50">
                {preview.title}
              </p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{preview.message}</p>
              {preview.note ? (
                <p className="mt-2 text-xs font-semibold text-teal-700 dark:text-teal-300">
                  {preview.note}
                </p>
              ) : null}
              {preview.showButton ? (
                <button
                  className="mt-3 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white"
                  type="button"
                >
                  시작하기
                </button>
              ) : null}
            </div>
          ) : (
            <p className="text-xs text-[var(--text-tertiary)]">
              서버가 실행되면 결과가 여기에 표시됩니다.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
