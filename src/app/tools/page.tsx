import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { PrimaryLink } from "@/components/ui/PrimaryLink"

export const metadata: Metadata = {
  title: "AI 도구 탐색",
  description: "AI 도구 라이브러리 — 공식 정보 검증 후 순차 공개. 추측 가격·기능을 적지 않습니다.",
}

const PRIORITY = ["Claude Code", "Codex", "Cursor", "Grok", "Cline", "Ollama"] as const

export default function ToolsIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Badge variant="accent">도구</Badge>
      <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">AI 도구 탐색</h1>
      <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
        AI 도구 탐색은 <strong className="text-[var(--text-primary)]">공식 정보 검증 후</strong>{" "}
        순차적으로 공개합니다. 특정 제품을 홍보하는 목록이 아니며, 가격·무료 여부·지원 모델을 추측해
        적지 않습니다.
      </p>
      <div className="mt-8 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 text-sm text-[var(--text-secondary)]">
        <p className="font-bold text-[var(--text-primary)]">초기 조사 우선순위 (미공개 후보)</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {PRIORITY.map((name, i) => (
            <li key={name}>
              {i + 1}. {name}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-[var(--text-tertiary)]">
          실제 공개 순서는 검증 가능 여부에 따릅니다. 지금은 상세 페이지를 만들지 않습니다.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <PrimaryLink href="/start">시작하기</PrimaryLink>
        <PrimaryLink href="/learn" variant="secondary">
          배우기
        </PrimaryLink>
        <Link
          className="text-sm font-semibold text-[var(--accent-primary)] underline"
          href="/resources"
        >
          공식 문서 모음
        </Link>
      </div>
    </main>
  )
}
