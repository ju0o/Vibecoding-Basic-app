import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { CurriculumExplorer } from "@/features/curriculum/CurriculumExplorer"
import { getCurriculumModulesWithLessons } from "@/lib/lesson-content"

export const metadata: Metadata = {
  title: "전체 커리큘럼",
  description: "AI Vibe Coding Master의 13단계 학습 커리큘럼입니다.",
}

export default function CurriculumPage() {
  const modules = getCurriculumModulesWithLessons()
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-3xl">
        <Badge variant="accent">전체 커리큘럼</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">전체 학습 지도</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
          기존 {modules.length}개 모듈과 {totalLessons}개 Textbook 강의를 탐색하는{" "}
          <strong className="text-[var(--text-primary)]">카탈로그·지도</strong>입니다. 학생이
          Outcome 순서로 따라가는 Path는{" "}
          <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
            /learn
          </Link>
          을 사용하세요.
        </p>
      </div>

      <aside className="mt-8 max-w-3xl rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-sky-800 dark:text-sky-200">
          Learning Path · 시작점
        </p>
        <h2 className="mt-2 text-xl font-extrabold text-[var(--text-primary)]">
          Day 1 — 첫 성공 (인터랙티브)
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Path 중심 학습은 여기 카탈로그와 역할이 다릅니다. Day 1에서 요청·실행 시뮬과 실습을
          이어가세요.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            className="inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-500"
            href="/learn/vibe-coding-foundation/day-1"
          >
            Day 1 시작
          </Link>
          <Link
            className="inline-flex rounded-lg border border-sky-600/40 px-4 py-2 text-sm font-bold text-sky-900 dark:text-sky-100"
            href="/start"
          >
            시작 안내
          </Link>
          <Link
            className="inline-flex rounded-lg border border-sky-600/40 px-4 py-2 text-sm font-bold text-sky-900 dark:text-sky-100"
            href="/learn"
          >
            Learning Path
          </Link>
        </div>
      </aside>

      <div className="mt-10">
        <CurriculumExplorer modules={modules} />
      </div>
    </div>
  )
}
