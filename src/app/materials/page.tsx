import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import type { LessonMeta } from "@/content/schema"
import { getCurriculumModulesWithLessons } from "@/lib/lesson-content"

export const metadata: Metadata = {
  title: "자료실",
  description: "13개 커리큘럼 모듈의 강의 자료를 모듈별 강의 수·예상 학습 시간과 함께 모았습니다.",
}

function sumMinutes(lessons: readonly LessonMeta[]): number {
  return lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)
}

export default function MaterialsPage() {
  const modules = getCurriculumModulesWithLessons()
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const totalMinutes = sumMinutes(modules.flatMap((module) => module.lessons))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-3xl">
        <Badge variant="accent">자료실</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">교재 자료실</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
          {modules.length}개 모듈, {totalLessons}개 강의, 총 {totalMinutes}분 분량의 학습 자료를
          모듈 순서대로 모았습니다. 강의 제목을 눌러 바로 이동하세요.
        </p>
      </div>

      <div className="mt-10 grid gap-6">
        {modules.map((module) => {
          const moduleMinutes = sumMinutes(module.lessons)

          return (
            <section
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-6"
              key={module.id}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
                  {module.order}. {module.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Badge>{module.lessons.length}개 강의</Badge>
                  <Badge>{moduleMinutes}분</Badge>
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {module.description}
              </p>

              {module.lessons.length > 0 ? (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link
                        className="flex items-baseline justify-between gap-3 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-sm transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                        href={`/lessons/${lesson.slug}`}
                      >
                        <span className="font-semibold text-[var(--text-primary)]">
                          {lesson.title}
                        </span>
                        <span className="shrink-0 text-xs text-[var(--text-tertiary)]">
                          {lesson.minutes}분
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-[var(--text-tertiary)]">
                  이 모듈에는 아직 등록된 강의가 없습니다.
                </p>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
