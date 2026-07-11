"use client"

import { ArrowCounterClockwise, CaretDown, MagnifyingGlass } from "@phosphor-icons/react"
import { useEffect, useMemo, useState } from "react"
import { LessonCard } from "@/components/lesson/LessonCard"
import { Badge } from "@/components/ui/Badge"
import { ProgressBar } from "@/components/ui/ProgressBar"
import { useLearningState } from "@/features/progress/LearningStateProvider"
import type { ModuleWithLessons } from "@/lib/lesson-content"

type CurriculumExplorerProps = {
  readonly modules: readonly ModuleWithLessons[]
}

export function CurriculumExplorer({ modules }: CurriculumExplorerProps) {
  const { state, ready, resetLearningState } = useLearningState()
  const [query, setQuery] = useState("")
  const [openModuleIds, setOpenModuleIds] = useState<readonly string[]>([])
  const [initializedOpenModule, setInitializedOpenModule] = useState(false)

  const completedSlugs = useMemo(() => new Set(state.completedLessons), [state.completedLessons])
  const moduleProgress = useMemo(
    () =>
      modules.map((module) => {
        const totalCount = module.lessons.length
        const completedCount = module.lessons.filter((lesson) =>
          completedSlugs.has(lesson.slug),
        ).length
        const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

        return {
          id: module.id,
          totalCount,
          completedCount,
          percent,
        }
      }),
    [completedSlugs, modules],
  )
  const totalLessons = moduleProgress.reduce((sum, item) => sum + item.totalCount, 0)
  const totalCompleted = moduleProgress.reduce((sum, item) => sum + item.completedCount, 0)
  const totalPercent = totalLessons === 0 ? 0 : Math.round((totalCompleted / totalLessons) * 100)
  const currentModuleId =
    moduleProgress.find((item) => item.totalCount > item.completedCount)?.id ??
    moduleProgress.find((item) => item.totalCount > 0)?.id
  const normalizedQuery = query.trim().toLowerCase()
  const searchResults = useMemo(() => {
    if (normalizedQuery.length === 0) {
      return []
    }

    return modules.flatMap((module) =>
      module.lessons
        .filter((lesson) =>
          [lesson.title, lesson.summary, lesson.level, ...lesson.tags, module.title]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery),
        )
        .map((lesson) => ({
          lesson,
          moduleTitle: module.title,
        })),
    )
  }, [modules, normalizedQuery])

  useEffect(() => {
    if (!ready || initializedOpenModule) {
      return
    }

    setOpenModuleIds(currentModuleId === undefined ? [] : [currentModuleId])
    setInitializedOpenModule(true)
  }, [currentModuleId, initializedOpenModule, ready])

  function toggleModule(moduleId: string) {
    setOpenModuleIds((current) =>
      current.includes(moduleId)
        ? current.filter((item) => item !== moduleId)
        : [...current, moduleId],
    )
  }

  function handleReset() {
    if (window.confirm("이 브라우저에 저장된 학습 진행률과 북마크를 초기화할까요?")) {
      resetLearningState()
    }
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:grid-cols-[1fr_320px] lg:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">학습 지도</Badge>
            <Badge>{totalLessons}개 강의</Badge>
            <Badge>{modules.length}개 모듈</Badge>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-[var(--text-primary)]">
            필요한 강의를 찾고, 읽은 흐름을 이어가세요
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
            모듈은 접힌 상태로 정리되어 있고, 진행 중인 모듈이 자동으로 먼저 열립니다. 제목, 요약,
            태그, 모듈명을 검색해 바로 원하는 강의로 이동할 수 있습니다.
          </p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4">
          <ProgressBar
            detail={`${totalCompleted}/${totalLessons}개 강의를 완료했습니다.`}
            label="전체 진행률"
            value={totalPercent}
          />
          <button
            className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={totalCompleted === 0 && state.bookmarks.length === 0}
            onClick={handleReset}
            type="button"
          >
            <ArrowCounterClockwise size={17} weight="bold" />
            진행률 초기화
          </button>
        </div>
      </section>

      <label className="block rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
          <MagnifyingGlass size={18} weight="bold" />
          강의 검색
        </span>
        <input
          className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3 text-base text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-soft)]"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="예: RAG, Git, 배포, 프롬프트"
          type="search"
          value={query}
        />
      </label>

      {normalizedQuery.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
              검색 결과 {searchResults.length}개
            </h2>
            <button
              className="text-sm font-semibold text-[var(--accent-primary)] hover:underline"
              onClick={() => setQuery("")}
              type="button"
            >
              검색 지우기
            </button>
          </div>
          {searchResults.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--surface-elevated)] p-6 text-sm leading-6 text-[var(--text-secondary)]">
              일치하는 강의를 찾지 못했습니다. 더 짧은 단어로 다시 검색해보세요.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {searchResults.map(({ lesson, moduleTitle }) => (
                <LessonCard key={lesson.slug} lesson={lesson} moduleTitle={moduleTitle} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <div className="space-y-4">
          {modules.map((module) => {
            const progress = moduleProgress.find((item) => item.id === module.id)
            const isOpen = openModuleIds.includes(module.id)
            const completedCount = progress?.completedCount ?? 0
            const totalCount = progress?.totalCount ?? 0
            const percent = progress?.percent ?? 0

            return (
              <section
                className="overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                key={module.id}
              >
                <button
                  aria-expanded={isOpen}
                  className="grid w-full gap-4 p-5 text-left transition hover:bg-[var(--surface-secondary)] sm:p-6 lg:grid-cols-[minmax(0,1fr)_260px_32px]"
                  onClick={() => toggleModule(module.id)}
                  type="button"
                >
                  <span className="min-w-0">
                    <span className="text-xs font-bold text-[var(--text-tertiary)]">
                      {String(module.order).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block text-2xl font-extrabold text-[var(--text-primary)]">
                      {module.title}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">
                      {module.description}
                    </span>
                  </span>
                  <span className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4">
                    <span className="block text-sm font-bold text-[var(--text-primary)]">
                      {completedCount}/{totalCount} 읽음
                    </span>
                    <span className="mt-2 block h-2 overflow-hidden rounded-full bg-[var(--surface-inset)]">
                      <span
                        className="block h-full rounded-full bg-[var(--accent-primary)] transition-[width] duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </span>
                    <span className="mt-2 block text-xs font-semibold text-[var(--text-tertiary)]">
                      목표: {module.goal}
                    </span>
                  </span>
                  <CaretDown
                    aria-hidden="true"
                    className={[
                      "self-center justify-self-end text-[var(--text-tertiary)] transition",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                    size={24}
                    weight="bold"
                  />
                </button>
                {isOpen ? (
                  <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-5 sm:p-6">
                    {module.lessons.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 text-sm text-[var(--text-secondary)]">
                        이 모듈에는 아직 연결된 강의가 없습니다.
                      </div>
                    ) : (
                      <div className="grid gap-4 lg:grid-cols-2">
                        {module.lessons.map((lesson) => (
                          <LessonCard
                            key={lesson.slug}
                            lesson={lesson}
                            moduleTitle={module.title}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
