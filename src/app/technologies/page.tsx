import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { PrimaryLink } from "@/components/ui/PrimaryLink"

export const metadata: Metadata = {
  title: "기술 도감",
  description: "개발 기술 개념 도감 — Day 1과 연결되는 기술부터 순차 제작. 대량 페이지 없음.",
}

const CANDIDATES = [
  "VS Code",
  "Node.js",
  "npm",
  "Terminal",
  "Git",
  "GitHub",
  "HTML",
  "CSS",
  "JavaScript",
] as const

export default function TechnologiesIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Badge variant="accent">기술</Badge>
      <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">기술 도감</h1>
      <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
        도구 사용법(제품)과 개발 기술(개념)을 분리합니다. 지금은{" "}
        <strong className="text-[var(--text-primary)]">대량 기술 페이지를 만들지 않습니다.</strong>{" "}
        Day 1·다음 Learning Node와 직접 연결되는 기술부터 제작합니다.
      </p>
      <div className="mt-8 rounded-2xl border border-[var(--border-default)] p-5 text-sm text-[var(--text-secondary)]">
        <p className="font-bold text-[var(--text-primary)]">초기 조사 후보</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {CANDIDATES.map((name) => (
            <li
              className="rounded-full border border-[var(--border-default)] px-3 py-1 text-xs font-semibold"
              key={name}
            >
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-[var(--text-tertiary)]">
          상세 설명·설치 절차는 검증된 Learning Node 패키지와 함께 공개됩니다.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <PrimaryLink href={"/learn/vibe-coding-foundation/day-1"}>
          Day 1에서 Node·npm 맛보기
        </PrimaryLink>
        <PrimaryLink href="/lab" variant="secondary">
          실습실
        </PrimaryLink>
        <Link
          className="text-sm font-semibold text-[var(--accent-primary)] underline"
          href="/tools"
        >
          도구 탐색 안내
        </Link>
      </div>
    </main>
  )
}
