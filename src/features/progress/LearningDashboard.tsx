"use client"

import Link from "next/link"
import { ProgressBar } from "@/components/ui/ProgressBar"
import type { LessonMeta } from "@/content/schema"
import { useLearningState } from "@/features/progress/LearningStateProvider"

type LearningDashboardProps = {
  readonly lessons: readonly LessonMeta[]
}

export function LearningDashboard({ lessons }: LearningDashboardProps) {
  const { state, getOverallPercent } = useLearningState()
  const percent = getOverallPercent(lessons.length)
  const nextLesson =
    lessons.find((lesson) => !state.completedLessons.includes(lesson.slug)) ?? lessons[0]

  return (
    <section className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--accent-primary)]">내 학습 현황</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">
            오늘 이어서 보기
          </h2>
        </div>
        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-bold text-[var(--accent-primary)]">
          {state.completedLessons.length}/{lessons.length}
        </span>
      </div>
      <ProgressBar
        detail="진행률은 이 브라우저의 로컬 저장소에 저장됩니다."
        label="전체 강의 진행률"
        value={percent}
      />
      {nextLesson === undefined ? null : (
        <Link
          className="mt-5 block rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4 transition hover:border-[var(--accent-primary)] active:translate-y-px"
          href={`/lessons/${nextLesson.slug}`}
        >
          <span className="text-xs font-semibold text-[var(--text-tertiary)]">다음 추천 강의</span>
          <strong className="mt-1 block text-[var(--text-primary)]">{nextLesson.title}</strong>
          <span className="mt-1 block text-sm text-[var(--text-secondary)]">
            {nextLesson.summary}
          </span>
        </Link>
      )}
    </section>
  )
}
