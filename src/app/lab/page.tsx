import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { PrimaryLink } from "@/components/ui/PrimaryLink"
import { DAY1_HREF } from "@/content/site-navigation"

export const metadata: Metadata = {
  title: "실습실",
  description: "Learning Node와 연결된 시뮬레이션·샘플 프로젝트·Outcome 실습 허브.",
}

const PFS = "/learn/vibe-coding-foundation/project-file-structure"

const LABS = [
  {
    title: "첫 성공 인터랙티브 시뮬레이션",
    type: "Interactive Simulation",
    lesson: "Day 1 — 첫 성공",
    prep: "브라우저만",
    time: "10–20분",
    level: "입문",
    outcome: "요청→파일→서버→미리보기 흐름 이해",
    href: `${DAY1_HREF}#simulation`,
  },
  {
    title: "Day 1 샘플 프로젝트",
    type: "Sample Project",
    lesson: "Day 1 — 첫 성공",
    prep: "Node.js · 터미널 (Path B)",
    time: "환경에 따라 다름",
    level: "입문",
    outcome: "npm install · npm run dev · 문구 수정",
    href: `${DAY1_HREF}#practice`,
  },
  {
    title: "오류와 복구 실습",
    type: "Debugging Scenario",
    lesson: "Day 1 — 첫 성공",
    prep: "시뮬 또는 로컬",
    time: "5–15분",
    level: "입문",
    outcome: "오류 복사 → AI 전달 → 재실행",
    href: `${DAY1_HREF}#simulation`,
  },
  {
    title: "Day 1 Outcome Check",
    type: "Outcome Check",
    lesson: "Day 1 — 첫 성공",
    prep: "없음",
    time: "5–10분",
    level: "입문",
    outcome: "can-do 자가 점검",
    href: `${DAY1_HREF}#quiz-outcomes`,
  },
  {
    title: "파일 구조 — 역할 찾기 시뮬",
    type: "Interactive Simulation",
    lesson: "프로젝트 파일 구조",
    prep: "브라우저만",
    time: "15–25분",
    level: "입문",
    outcome: "문구 파일 찾기 · 잘못된 선택 피드백 · AI 범위 요청",
    href: `${PFS}#simulation`,
  },
  {
    title: "파일 구조 — 샘플에서 한 파일 수정",
    type: "Sample Project",
    lesson: "프로젝트 파일 구조",
    prep: "Day1 샘플 폴더 재사용",
    time: "10–20분",
    level: "입문",
    outcome: "main.js 수정 · 구조 비교",
    href: `${PFS}#practice`,
  },
  {
    title: "파일 구조 Outcome Check",
    type: "Outcome Check",
    lesson: "프로젝트 파일 구조",
    prep: "없음",
    time: "5–10분",
    level: "입문",
    outcome: "구조 읽기 can-do",
    href: `${PFS}#quiz-outcomes`,
  },
  {
    title: "Node·npm — scripts ↔ 터미널 시뮬",
    type: "Interactive Simulation",
    lesson: "Node·npm·package.json",
    prep: "브라우저만",
    time: "15–25분",
    level: "입문",
    outcome: "Missing script · 잘못된 폴더 · 명령 연결",
    href: "/learn/vibe-coding-foundation/node-npm-package-json#simulation",
  },
  {
    title: "Node·npm 실습 (Day1 샘플)",
    type: "Sample Project",
    lesson: "Node·npm·package.json",
    prep: "examples/day1-first-success",
    time: "15–30분",
    level: "입문",
    outcome: "scripts 확인 · 오류 복구",
    href: "/learn/vibe-coding-foundation/node-npm-package-json#practice",
  },
] as const

export default function LabPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge variant="accent">실습실</Badge>
      <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">실습실</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
        실습은 강의와 분리된 샘플 창고가 아닙니다. 각 항목은{" "}
        <strong className="text-[var(--text-primary)]">Learning Node</strong>에 연결됩니다. 지금은
        Day 1 자산만 공개합니다. 새 빈 실습 페이지는 만들지 않습니다.
      </p>

      <div className="mt-10 grid gap-4">
        {LABS.map((lab) => (
          <article
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5"
            key={lab.title}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">{lab.title}</h2>
              <span className="rounded-full bg-[var(--surface-secondary)] px-2.5 py-0.5 text-xs font-bold text-[var(--text-tertiary)]">
                {lab.type}
              </span>
            </div>
            <dl className="mt-3 grid gap-1 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
              <div>
                <dt className="text-xs font-bold text-[var(--text-tertiary)]">관련 강의</dt>
                <dd>{lab.lesson}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-[var(--text-tertiary)]">준비물</dt>
                <dd>{lab.prep}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-[var(--text-tertiary)]">
                  예상 시간 · 난이도
                </dt>
                <dd>
                  {lab.time} · {lab.level}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-[var(--text-tertiary)]">Outcome</dt>
                <dd>{lab.outcome}</dd>
              </div>
            </dl>
            <Link
              className="mt-4 inline-flex text-sm font-bold text-[var(--accent-primary)] underline"
              href={lab.href}
            >
              시작하기 →
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-[var(--text-tertiary)]">
        샘플 폴더 경로:{" "}
        <code className="rounded bg-[var(--surface-secondary)] px-1.5 py-0.5 text-xs">
          examples/day1-first-success/
        </code>
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <PrimaryLink href={DAY1_HREF}>Day 1 전체 페이지</PrimaryLink>
        <PrimaryLink href="/learn" variant="secondary">
          Learning Path
        </PrimaryLink>
      </div>
    </main>
  )
}
