"use client"

import { BookmarkSimple } from "@phosphor-icons/react"
import { useLearningState } from "@/features/progress/LearningStateProvider"

type BookmarkButtonProps = {
  readonly lessonSlug: string
}

export function BookmarkButton({ lessonSlug }: BookmarkButtonProps) {
  const { state, toggleBookmark } = useLearningState()
  const bookmarked = state.bookmarks.includes(lessonSlug)

  return (
    <button
      aria-pressed={bookmarked}
      className={[
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition active:translate-y-px",
        bookmarked
          ? "border-[var(--accent-primary)] bg-[var(--accent-soft)] text-[var(--accent-primary)]"
          : "border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]",
      ].join(" ")}
      onClick={() => toggleBookmark(lessonSlug)}
      type="button"
    >
      <BookmarkSimple size={17} weight={bookmarked ? "fill" : "bold"} />
      {bookmarked ? "북마크됨" : "북마크"}
    </button>
  )
}
