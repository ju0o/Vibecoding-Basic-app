"use client"

import { type ReactNode, useState } from "react"

type StudioPreviewTabsProps = {
  readonly rendered: ReactNode
  readonly source: ReactNode
}

export function StudioPreviewTabs({ rendered, source }: StudioPreviewTabsProps) {
  const [mode, setMode] = useState<"rendered" | "source">("rendered")

  return (
    <section className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-auto text-xl font-extrabold text-[var(--text-primary)]">
          콘텐츠 미리보기
        </h2>
        <button
          className={[
            "rounded-lg border px-3 py-1 text-sm font-bold",
            mode === "rendered"
              ? "border-[var(--accent-primary)] bg-[var(--accent-soft)]"
              : "border-[var(--border-default)]",
          ].join(" ")}
          onClick={() => setMode("rendered")}
          type="button"
        >
          Rendered Preview
        </button>
        <button
          className={[
            "rounded-lg border px-3 py-1 text-sm font-bold",
            mode === "source"
              ? "border-[var(--accent-primary)] bg-[var(--accent-soft)]"
              : "border-[var(--border-default)]",
          ].join(" ")}
          onClick={() => setMode("source")}
          type="button"
        >
          Source Preview
        </button>
      </div>
      <div aria-live="polite">{mode === "rendered" ? rendered : source}</div>
      <p className="text-xs text-[var(--text-tertiary)]">
        읽기 전용. 이번 단계에는 브라우저 CMS Editor를 제공하지 않습니다.
      </p>
    </section>
  )
}
