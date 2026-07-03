import Link from "next/link"

type PrimaryLinkProps = {
  readonly href: string
  readonly children: React.ReactNode
  readonly variant?: "primary" | "secondary"
}

export function PrimaryLink({ href, children, variant = "primary" }: PrimaryLinkProps) {
  const className =
    variant === "primary"
      ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)]"
      : "border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]"

  return (
    <Link
      className={[
        "inline-flex min-h-10 items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition active:translate-y-px",
        className,
      ].join(" ")}
      href={href}
    >
      {children}
    </Link>
  )
}
