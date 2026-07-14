"use client"

import { StatusIndicator } from "./StatusIndicator"

type AiConversationProps = {
  readonly requestText: string | null
  readonly phase: "idle" | "requesting" | "planning" | "working" | "done" | "error"
  readonly planSteps: readonly string[]
  readonly planVisible: boolean
  readonly reducedMotion: boolean
}

export function AiConversation({
  requestText,
  phase,
  planSteps,
  planVisible,
  reducedMotion,
}: AiConversationProps) {
  const tone =
    phase === "error"
      ? "error"
      : phase === "done"
        ? "success"
        : phase === "idle"
          ? "idle"
          : "active"

  return (
    <div className="grid h-full gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-[var(--text-primary)]">AI · 요청</h3>
        <StatusIndicator
          label={
            phase === "idle"
              ? "대기"
              : phase === "requesting"
                ? "요청 수신"
                : phase === "planning"
                  ? "계획 중"
                  : phase === "error"
                    ? "오류 도움"
                    : phase === "done"
                      ? "완료"
                      : "작업 중"
          }
          tone={tone}
        />
      </div>

      <div className="grid gap-2">
        <p className="text-xs font-bold text-[var(--text-tertiary)]">학생 요청 카드</p>
        <div
          className={[
            "rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] p-3 text-sm text-[var(--text-primary)]",
            phase === "requesting" && !reducedMotion
              ? "translate-x-1 shadow-md transition-transform"
              : "",
            phase === "idle" ? "opacity-60" : "",
          ].join(" ")}
        >
          {requestText ?? "아래에서 요청을 선택하면 카드가 나타납니다."}
        </div>
      </div>

      {planVisible ? (
        <ol className="grid gap-1.5">
          <p className="text-xs font-bold text-[var(--text-tertiary)]">작업 계획</p>
          {planSteps.map((step, index) => (
            <li
              className={[
                "rounded-md border border-[var(--border-subtle)] bg-[var(--surface-primary)] px-2.5 py-2 text-xs text-[var(--text-secondary)]",
                !reducedMotion ? "animate-[fadeIn_0.25s_ease]" : "",
              ].join(" ")}
              key={step}
              style={reducedMotion ? undefined : { animationDelay: `${index * 40}ms` }}
            >
              <span className="font-bold text-[var(--accent-primary)]">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}
