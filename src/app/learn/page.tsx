import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { PrimaryLink } from "@/components/ui/PrimaryLink"
import { DAY1_HREF } from "@/content/site-navigation"

export const metadata: Metadata = {
  title: "배우기 — Learning Path",
  description: "비개발자가 순서대로 따라가는 바이브코딩 Learning Path. Outcome과 현재 단계 중심.",
}

type Track = {
  readonly id: string
  readonly title: string
  readonly question: string
  readonly canDo: string
  readonly status: "active" | "preparing"
  readonly available: readonly { readonly title: string; readonly href: string }[]
  readonly preparing: readonly string[]
  readonly atlas: string
  readonly lab: string
}

const TRACKS: readonly Track[] = [
  {
    id: "a",
    title: "Track A — 기초 환경",
    question: "무엇을 설치하고, 어떻게 첫 결과물을 만들지?",
    canDo: "AI와 함께 작은 결과물을 만들고 로컬에서 실행을 시도한다",
    status: "active",
    available: [{ title: "Day 1 — 첫 성공", href: DAY1_HREF }],
    preparing: ["프로젝트 파일 구조", "Node·npm 심화", "AI·LLM·IDE 관계"],
    atlas: "AI, LLM (궁금할 때)",
    lab: "Day 1 시뮬 · 샘플 프로젝트",
  },
  {
    id: "b",
    title: "Track B — 개발 원리",
    question: "화면은 어떻게 생기고, 파일은 왜 나뉘나?",
    canDo: "FE/BE/API/파일 구조를 기초 수준으로 설명한다",
    status: "preparing",
    available: [],
    preparing: ["HTML/CSS/JS", "package.json·src", "API·DB 감각"],
    atlas: "관련 Concept 예정",
    lab: "준비 중",
  },
  {
    id: "c",
    title: "Track C — AI 도구 사용",
    question: "어떤 AI 도구로 어떤 일을 맡길까?",
    canDo: "도구를 고르고 오류를 함께 고친다",
    status: "preparing",
    available: [],
    preparing: ["AI IDE · CLI", "Context·권한", "코드 리뷰 습관"],
    atlas: "Agent, Context, Prompt",
    lab: "준비 중",
  },
  {
    id: "d",
    title: "Track D — 실제 프로젝트",
    question: "작은 앱을 끝까지 만들 수 있을까?",
    canDo: "미니 프로젝트를 기획·구현·검증한다",
    status: "preparing",
    available: [],
    preparing: ["첫 페이지", "데이터 저장", "리팩터링"],
    atlas: "Workflow, Evaluation",
    lab: "준비 중",
  },
  {
    id: "e",
    title: "Track E — 배포·운영·보안",
    question: "다른 사람도 쓰게 하려면?",
    canDo: "Git·배포·비밀 관리의 기초를 수행한다",
    status: "preparing",
    available: [],
    preparing: ["Git·GitHub", "Deploy", "환경변수·보안"],
    atlas: "Production AI",
    lab: "준비 중",
  },
] as const

export default function LearnIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Badge variant="accent">배우기</Badge>
      <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">Learning Path</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
        학생이 <strong className="text-[var(--text-primary)]">순서대로 따라가는</strong> 실제 학습
        경로입니다. Outcome과 지금 할 수 있는 강의만 강조합니다. 교육 패키지가 없는 강의의 빈
        페이지는 만들지 않습니다.
      </p>
      <div className="mt-6 rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-4 text-sm text-[var(--text-secondary)]">
        <p>
          <strong className="text-[var(--text-primary)]">/learn</strong> = Path · Outcome 중심
        </p>
        <p className="mt-1">
          <strong className="text-[var(--text-primary)]">/curriculum</strong> = 기존 100강·모듈 전체
          학습 지도
        </p>
        <p className="mt-2">
          기존 자료 둘러보기:{" "}
          <Link className="font-semibold text-[var(--accent-primary)] underline" href="/curriculum">
            전체 학습 지도
          </Link>
        </p>
      </div>

      <div className="mt-10 grid gap-5">
        {TRACKS.map((track) => (
          <article
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5"
            key={track.id}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">{track.title}</h2>
              <span
                className={[
                  "rounded-full px-2.5 py-0.5 text-xs font-bold",
                  track.status === "active"
                    ? "bg-emerald-500/15 text-emerald-900 dark:text-emerald-100"
                    : "bg-[var(--surface-secondary)] text-[var(--text-tertiary)]",
                ].join(" ")}
              >
                {track.status === "active" ? "이용 가능" : "준비 중"}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              <span className="font-bold text-[var(--text-primary)]">학생 질문 · </span>
              {track.question}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              <span className="font-bold text-[var(--text-primary)]">할 수 있게 되는 것 · </span>
              {track.canDo}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold text-[var(--text-tertiary)]">현재 이용 가능</p>
                {track.available.length === 0 ? (
                  <p className="mt-1 text-sm text-[var(--text-tertiary)]">아직 없음</p>
                ) : (
                  <ul className="mt-1 space-y-1">
                    {track.available.map((item) => (
                      <li key={item.href}>
                        <Link
                          className="text-sm font-semibold text-[var(--accent-primary)] underline"
                          href={item.href}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-tertiary)]">준비 중 / 검토 중</p>
                <ul className="mt-1 list-disc pl-4 text-sm text-[var(--text-secondary)]">
                  {track.preparing.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              Atlas: {track.atlas} · 실습: {track.lab}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <PrimaryLink href={DAY1_HREF}>Day 1 시작하기</PrimaryLink>
        <PrimaryLink href="/start" variant="secondary">
          시작 안내
        </PrimaryLink>
        <PrimaryLink href="/lab" variant="secondary">
          실습실
        </PrimaryLink>
      </div>
    </main>
  )
}
