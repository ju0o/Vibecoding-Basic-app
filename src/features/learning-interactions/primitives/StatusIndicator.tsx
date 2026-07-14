"use client"

type StatusIndicatorProps = {
  readonly label: string
  readonly tone: "idle" | "active" | "success" | "error" | "warn"
}

const TONE_CLASS: Record<StatusIndicatorProps["tone"], string> = {
  idle: "bg-[var(--surface-secondary)] text-[var(--text-secondary)] border-[var(--border-default)]",
  active: "bg-sky-500/15 text-sky-800 dark:text-sky-100 border-sky-500/40",
  success: "bg-emerald-500/15 text-emerald-900 dark:text-emerald-100 border-emerald-500/40",
  error: "bg-rose-500/15 text-rose-900 dark:text-rose-100 border-rose-500/40",
  warn: "bg-amber-500/15 text-amber-900 dark:text-amber-100 border-amber-500/40",
}

const TONE_ICON: Record<StatusIndicatorProps["tone"], string> = {
  idle: "○",
  active: "◎",
  success: "✓",
  error: "!",
  warn: "△",
}

export function StatusIndicator({ label, tone }: StatusIndicatorProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${TONE_CLASS[tone]}`}
    >
      <span aria-hidden="true">{TONE_ICON[tone]}</span>
      {label}
    </span>
  )
}
