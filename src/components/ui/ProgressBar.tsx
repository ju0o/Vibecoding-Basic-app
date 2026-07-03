type ProgressBarProps = {
  readonly value: number
  readonly label: string
  readonly detail?: string
}

export function ProgressBar({ value, label, detail }: ProgressBarProps) {
  const boundedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-[var(--text-primary)]">{label}</span>
        <span className="font-semibold text-[var(--accent-primary)]">{boundedValue}%</span>
      </div>
      <div
        aria-label={label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={boundedValue}
        className="h-2 overflow-hidden rounded-full bg-[var(--surface-inset)]"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-[var(--accent-primary)] transition-[width] duration-300 ease-in-out"
          style={{ width: `${boundedValue}%` }}
        />
      </div>
      {detail === undefined ? null : (
        <p className="text-sm text-[var(--text-secondary)]">{detail}</p>
      )}
    </div>
  )
}
