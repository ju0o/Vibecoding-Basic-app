import type { Metadata } from "next"
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

      <div className="mt-10">
        <CurriculumExplorer modules={modules} />
      </div>
    </div>
  )
}
