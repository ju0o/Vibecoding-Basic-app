import type { Metadata } from "next"
import { LessonCard } from "@/components/lesson/LessonCard"
import { Badge } from "@/components/ui/Badge"
import { getCurriculumModulesWithLessons } from "@/lib/lesson-content"

export const metadata: Metadata = {
  title: "전체 커리큘럼",
  description: "AI Vibe Coding Master의 13단계 학습 커리큘럼입니다.",
}

export default function CurriculumPage() {
  const modules = getCurriculumModulesWithLessons()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-3xl">
        <Badge variant="accent">전체 커리큘럼</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">
          순서대로 읽으면 개발과 AI 시스템이 연결됩니다
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
          V1은 전체 구조와 핵심 샘플 강의를 제공합니다. 각 모듈은 나중에 MDX 콘텐츠와 DB 기반
          진행률로 확장하기 쉬운 데이터 구조를 사용합니다.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {modules.map((module) => (
          <section
            className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 sm:p-6"
            key={module.id}
          >
            <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="text-xs font-bold text-[var(--text-tertiary)]">
                  {String(module.order).padStart(2, "0")}
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">
                  {module.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {module.description}
                </p>
                <p className="mt-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 text-sm font-semibold text-[var(--text-primary)]">
                  목표: {module.goal}
                </p>
              </div>
              {module.lessons.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 text-sm text-[var(--text-secondary)]">
                  V1 이후 강의 콘텐츠가 추가될 예정입니다.
                </div>
              ) : (
                <div className="grid gap-4">
                  {module.lessons.map((lesson) => (
                    <LessonCard key={lesson.slug} lesson={lesson} moduleTitle={module.title} />
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
