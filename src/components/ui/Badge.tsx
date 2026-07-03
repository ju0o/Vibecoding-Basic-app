type BadgeVariant = "default" | "accent" | "success" | "muted"

type BadgeProps = {
  readonly children: React.ReactNode
  readonly variant?: BadgeVariant
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        getVariantClass(variant),
      ].join(" ")}
    >
      {children}
    </span>
  )
}

function getVariantClass(variant: BadgeVariant): string {
  switch (variant) {
    case "accent":
      return "border-[var(--accent-primary)]/20 bg-[var(--accent-soft)] text-[var(--accent-primary)]"
    case "success":
      return "border-[var(--status-success)]/20 bg-[var(--status-success)]/10 text-[var(--status-success)]"
    case "muted":
      return "border-[var(--border-subtle)] bg-[var(--surface-secondary)] text-[var(--text-tertiary)]"
    case "default":
      return "border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-secondary)]"
  }
}
