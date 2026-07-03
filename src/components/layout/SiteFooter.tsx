import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-[var(--text-secondary)] sm:px-6 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="font-bold text-[var(--text-primary)]">AI Vibe Coding Master</p>
          <p className="mt-2 max-w-2xl">
            개발 기초부터 AI 시스템 설계까지, 읽고 설명하며 익히는 교재형 학습 사이트입니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="hover:text-[var(--accent-primary)]" href="/curriculum">
            커리큘럼
          </Link>
          <Link className="hover:text-[var(--accent-primary)]" href="/glossary">
            용어 사전
          </Link>
          <Link className="hover:text-[var(--accent-primary)]" href="/resources">
            공식 문서
          </Link>
        </div>
      </div>
    </footer>
  )
}
