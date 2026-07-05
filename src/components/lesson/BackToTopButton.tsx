"use client"

import { ArrowUp } from "@phosphor-icons/react"

export function BackToTopButton() {
  return (
    <button
      aria-label="페이지 위로 이동"
      className="fixed bottom-5 right-5 z-40 rounded-full border border-[var(--border-default)] bg-[var(--surface-elevated)] p-3 text-[var(--text-primary)] shadow-lg transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      <ArrowUp size={20} weight="bold" />
    </button>
  )
}
