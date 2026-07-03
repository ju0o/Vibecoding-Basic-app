import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import type { Lesson, LessonMeta } from "@/content/schema"
import { BookmarkButton } from "@/features/progress/BookmarkButton"
import { LessonCompleteButton } from "@/features/progress/LessonCompleteButton"

type LessonSidebarProps = {
  readonly lesson: Lesson
  readonly moduleTitle: string
  readonly previous: LessonMeta | undefined
  readonly next: LessonMeta | undefined
}

export function LessonSidebar({ lesson, moduleTitle, next, previous }: LessonSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">{moduleTitle}</Badge>
          <Badge>{lesson.minutes}분</Badge>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          <LessonCompleteButton lessonSlug={lesson.slug} />
          <BookmarkButton lessonSlug={lesson.slug} />
        </div>
        <nav className="mt-5" aria-label="강의 목차">
          <p className="mb-2 text-xs font-bold text-[var(--text-tertiary)]">사이드바 목차</p>
          <div className="grid gap-1">
            {lesson.sections.map((section) => (
              <a
                className="rounded-md px-2 py-1.5 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--surface-secondary)] hover:text-[var(--accent-primary)]"
                href={`#${section.id}`}
                key={section.id}
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>
        <div className="mt-5 grid gap-2 border-t border-[var(--border-subtle)] pt-4">
          {previous === undefined ? null : (
            <Link
              className="rounded-lg border border-[var(--border-subtle)] p-3 text-sm transition hover:border-[var(--accent-primary)]"
              href={`/lessons/${previous.slug}`}
            >
              <span className="block text-xs font-semibold text-[var(--text-tertiary)]">
                이전 강의
              </span>
              <span className="mt-1 block font-semibold text-[var(--text-primary)]">
                {previous.title}
              </span>
            </Link>
          )}
          {next === undefined ? null : (
            <Link
              className="rounded-lg border border-[var(--border-subtle)] p-3 text-sm transition hover:border-[var(--accent-primary)]"
              href={`/lessons/${next.slug}`}
            >
              <span className="block text-xs font-semibold text-[var(--text-tertiary)]">
                다음 강의
              </span>
              <span className="mt-1 block font-semibold text-[var(--text-primary)]">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
