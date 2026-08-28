import Link from "next/link"
import { FOOTER_NAV_GROUPS } from "@/content/site-navigation"

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(12rem,1.1fr)_3fr]">
          <div className="max-w-sm space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
            <p className="text-lg font-bold text-[var(--text-primary)]">GUPITI</p>
            <p>A community for people learning, making, and sharing with AI.</p>
            <p className="text-xs text-[var(--text-tertiary)]">
              Gatherings, projects, and outcomes grow here together.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4"
          >
            {FOOTER_NAV_GROUPS.map((group) => (
              <div className="space-y-3" key={group.label}>
                <p className="text-sm font-bold text-[var(--text-primary)]">{group.label}</p>
                <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
                  {group.items.map((item) => (
                    <Link
                      className="w-fit hover:text-[var(--accent-primary)]"
                      href={item.href}
                      key={item.href}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-[var(--border-subtle)] pt-4 text-xs text-[var(--text-tertiary)]">
          © {new Date().getFullYear()} GUPITI · Community-led learning and making
        </p>
      </div>
    </footer>
  )
}
