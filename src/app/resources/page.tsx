import type { Metadata } from "next"
import { Badge } from "@/components/ui/Badge"
import { RESOURCE_LINKS } from "@/content/resources"

export const metadata: Metadata = {
  title: "공식 문서 링크",
  description: "개발과 AI 엔지니어링을 공부할 때 참고할 공식 문서 모음입니다.",
}

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-3xl">
        <Badge variant="accent">공식 문서 링크 모음</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">
          막힐 때 돌아갈 기준 문서
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
          AI가 답을 줘도 최종 기준은 공식 문서입니다. V1에서는 웹, 프론트엔드, Git, DB, 보안, AI
          시스템 문서를 한곳에 모았습니다.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {RESOURCE_LINKS.map((resource) => (
          <a
            className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 transition hover:border-[var(--accent-primary)] active:translate-y-px"
            href={resource.url}
            key={resource.url}
            rel="noreferrer"
            target="_blank"
          >
            <span className="text-xs font-bold text-[var(--accent-primary)]">
              {resource.category}
            </span>
            <h2 className="mt-2 text-xl font-extrabold text-[var(--text-primary)]">
              {resource.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {resource.description}
            </p>
            <span className="mt-4 block break-all text-sm font-semibold text-[var(--accent-primary)]">
              {resource.url}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
