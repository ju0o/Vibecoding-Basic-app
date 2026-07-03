"use client"

import { BookmarkSimple, CheckCircle } from "@phosphor-icons/react"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import type { LessonMeta } from "@/content/schema"
import { useLearningState } from "@/features/progress/LearningStateProvider"

type LessonCardProps = {
  readonly lesson: LessonMeta
  readonly moduleTitle: string
}

export function LessonCard({ lesson, moduleTitle }: LessonCardProps) {
  const { state } = useLearningState()
  const completed = state.completedLessons.includes(lesson.slug)
  const bookmarked = state.bookmarks.includes(lesson.slug)

  return (
    <Link
      className="group block rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-[var(--accent-primary)] active:translate-y-px"
      href={`/lessons/${lesson.slug}`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="muted">{moduleTitle}</Badge>
        <Badge>{lesson.level}</Badge>
        {completed ? <Badge variant="success">완료</Badge> : null}
        {bookmarked ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-primary)]">
            <BookmarkSimple size={14} weight="fill" />
            북마크
          </span>
        ) : null}
      </div>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-extrabold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
            {lesson.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{lesson.summary}</p>
        </div>
        {completed ? (
          <CheckCircle className="mt-1 text-[var(--status-success)]" size={22} weight="fill" />
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {lesson.tags.map((tag) => (
          <span
            className="rounded-full bg-[var(--surface-secondary)] px-2 py-1 text-xs font-semibold text-[var(--text-tertiary)]"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
