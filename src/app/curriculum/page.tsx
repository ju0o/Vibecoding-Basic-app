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
        <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">
          순서대로 읽으면 개발과 AI 시스템이 연결됩니다
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
          현재 {modules.length}개 모듈과 {totalLessons}개 강의가 연결되어 있습니다. 모듈을 펼치거나
          검색해서 지금 필요한 개념으로 바로 들어가세요.
        </p>
      </div>

      <aside className="mt-8 max-w-3xl rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-sky-800 dark:text-sky-200">
          신규 · 학생 자율 학습 경로
        </p>
        <h2 className="mt-2 text-xl font-extrabold text-[var(--text-primary)]">
          Day 1 — 첫 성공 (인터랙티브)
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          요청 → 파일 생성 → 설치 → 서버 → 미리보기 → 수정·오류 복구를{" "}
          <strong className="text-[var(--text-primary)]">실제로 조작</strong>해 보세요. 아래 기존
          100강 목록과는 별도 경로입니다.
        </p>
        <Link
          className="mt-4 inline-flex rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-500"
          href="/learn/vibe-coding-foundation/day-1"
        >
          Day 1 학습 시작
        </Link>
      </aside>

      <div className="mt-10">
        <CurriculumExplorer modules={modules} />
      </div>
    </div>
  )
}
