import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import type { LessonMeta, ModuleId } from "@/content/schema"
import { getModuleById } from "@/lib/lesson-content"

type LessonNavigationCardsProps = {
  readonly previous: LessonMeta | undefined
  readonly next: LessonMeta | undefined
  readonly currentModuleId: ModuleId
}

export function LessonNavigationCards({
  previous,
  next,
  currentModuleId,
}: LessonNavigationCardsProps) {
  return (
    <nav
      aria-label="이전 및 다음 강의"
      className="mx-auto mt-6 grid max-w-[72ch] gap-4 md:grid-cols-2"
    >
      <NavigationCard currentModuleId={currentModuleId} direction="previous" lesson={previous} />
      <NavigationCard currentModuleId={currentModuleId} direction="next" lesson={next} />
    </nav>
  )
}

function NavigationCard({
  currentModuleId,
  direction,
  lesson,
}: {
  readonly currentModuleId: ModuleId
  readonly direction: "previous" | "next"
  readonly lesson: LessonMeta | undefined
}) {
  const label = direction === "previous" ? "이전 강의" : "다음 강의"
  const alignment = direction === "previous" ? "text-left" : "text-left md:text-right"

  if (lesson === undefined) {
    return (
      <div
        className={[
          "rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--surface-elevated)] p-5",
          alignment,
        ].join(" ")}
      >
        <p className="text-sm font-bold text-[var(--text-tertiary)]">{label}</p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          {direction === "previous"
            ? "첫 강의입니다. 여기서 출발하면 됩니다."
            : "마지막 강의입니다. 커리큘럼에서 복습할 강의를 골라보세요."}
        </p>
      </div>
    )
  }

  const moduleTitle = getModuleById(lesson.moduleId)?.title ?? "커리큘럼"
  const isModuleBoundary = lesson.moduleId !== currentModuleId

  return (
    <Link
      className={[
        "group rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-[var(--accent-primary)] active:translate-y-px",
        alignment,
      ].join(" ")}
      href={`/lessons/${lesson.slug}`}
    >
      <div className="flex flex-wrap gap-2 md:justify-start">
        <Badge variant={direction === "previous" ? "muted" : "accent"}>{label}</Badge>
        {isModuleBoundary ? <Badge>모듈 이동</Badge> : null}
      </div>
      <p className="mt-4 text-xs font-bold text-[var(--text-tertiary)]">{moduleTitle}</p>
      <strong className="mt-2 block text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
        {lesson.title}
      </strong>
      <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">
        {lesson.summary}
      </span>
    </Link>
  )
}
