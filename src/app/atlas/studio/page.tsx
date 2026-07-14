import type { Metadata } from "next"
import Link from "next/link"
import { StudioConceptList } from "@/features/atlas-studio/StudioConceptList"
import { buildAtlasContentManifest, summarizeManifest } from "@/lib/atlas/content-manifest"

export const metadata: Metadata = {
  title: "Education Studio (Operator)",
  description: "Operator content visibility dashboard for education materials and Atlas.",
  robots: { index: false, follow: false },
}

export default function AtlasEducationStudioPage() {
  const entries = buildAtlasContentManifest()
  const summary = summarizeManifest(entries)

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6">
      <header className="grid gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)]">
          Operator · Education Studio
        </p>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Education Studio</h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
          교육 자료가 어디에 있고, 무엇이 완성·미완인지 운영자가 한 화면에서 확인합니다. 현재 탭은
          Atlas 완성도입니다. 장기 탭 계약: 학습 과정 · 교육자료 · Atlas · 출처 검증 · 피드백. Route{" "}
          <code className="text-xs">/atlas/studio</code> 유지 · 기존 기능 보존 · 이번 Wave 전체
          재구현 없음.
        </p>
        <nav className="flex flex-wrap gap-3 text-sm font-bold">
          <Link className="text-[var(--accent-primary)]" href="/atlas/studio/inventory">
            Content Inventory
          </Link>
          <Link className="text-[var(--accent-primary)]" href="/atlas">
            학생 Roadmap
          </Link>
          <Link className="text-[var(--accent-primary)]" href="/model-routing">
            Model Routing
          </Link>
          <Link className="text-[var(--accent-primary)]" href="/learn">
            Learning Path
          </Link>
        </nav>
      </header>

      <section className="rounded-xl border border-dashed border-[var(--border-default)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
        <h2 className="font-extrabold text-[var(--text-primary)]">콘텐츠 생산 Workflow</h2>
        <p className="mt-2 font-mono text-xs sm:text-sm">
          Source Research → Claim Verification → Curriculum → Content → Interaction → QA → Student
          Page
        </p>
        <p className="mt-2 text-xs text-[var(--text-tertiary)]">
          Concept 카드의 workflow 단계는 콘텐츠 상태에서 추론한 값입니다 (Agent 실행 로그 아님).
        </p>
      </section>

      <StudioConceptList entries={entries} summary={summary} />
    </main>
  )
}
