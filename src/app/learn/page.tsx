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
    available: [
      { title: "Day 1 — 첫 성공", href: DAY1_HREF },
      {
        title: "파일 구조 읽기 — 어떤 파일을 건드릴까?",
        href: "/learn/vibe-coding-foundation/project-file-structure",
      },
      {
        title: "Node·npm — 왜 설치하고 실행할까?",
        href: "/learn/vibe-coding-foundation/node-npm-package-json",
      },
      {
        title: "AI·LLM·IDE 구분",
        href: "/learn/vibe-coding-foundation/ai-llm-ide",
      },
      {
        title: "터미널과 명령어",
        href: "/learn/vibe-coding-foundation/terminal-commands",
      },
      {
        title: "오류를 AI에게 전달하기",
        href: "/learn/vibe-coding-foundation/errors-to-ai",
      },
    ],
    preparing: [],
    atlas: "AI, LLM (궁금할 때)",
    lab: "Track A 전체",
  },
  {
    id: "b",
    title: "Track B — 개발 원리",
    question: "화면은 어떻게 생기고, 파일은 왜 나뉘나?",
    canDo: "FE/BE/API/파일 구조를 기초 수준으로 설명한다",
    status: "active",
    available: [
      {
        title: "웹이 화면에 나타나는 원리",
        href: "/learn/vibe-coding-foundation/web-how-pages-appear",
      },
      { title: "HTML 기초", href: "/learn/vibe-coding-foundation/html-basics" },
      { title: "CSS 기초", href: "/learn/vibe-coding-foundation/css-basics" },
      { title: "JavaScript 기초", href: "/learn/vibe-coding-foundation/javascript-basics" },
      {
        title: "파일이 서로 연결되는 방식",
        href: "/learn/vibe-coding-foundation/files-connect",
      },
      { title: "Frontend", href: "/learn/vibe-coding-foundation/frontend" },
      { title: "Backend", href: "/learn/vibe-coding-foundation/backend" },
      { title: "API", href: "/learn/vibe-coding-foundation/api" },
      { title: "Database가 필요한 이유", href: "/learn/vibe-coding-foundation/database" },
    ],
    preparing: [],
    atlas: "Context (예고)",
    lab: "파일 연결 · FE/BE · 요청/응답 · 저장소 시뮬",
  },
  {
    id: "c",
    title: "Track C — AI와 함께 개발하기",
    question: "AI에게 어떻게 요청하고, 무엇을 보여 줄까?",
    canDo: "좋은 요청·프롬프트·컨텍스트·관련 파일을 고른다",
    status: "active",
    available: [
      {
        title: "AI에게 좋은 작업 요청하기",
        href: "/learn/vibe-coding-foundation/good-ai-task-request",
      },
      {
        title: "Prompt Engineering 기초",
        href: "/learn/vibe-coding-foundation/prompt-engineering",
      },
      {
        title: "Context Engineering 기초",
        href: "/learn/vibe-coding-foundation/context-engineering",
      },
      {
        title: "관련 파일만 AI에게 보여주기",
        href: "/learn/vibe-coding-foundation/related-files-context",
      },
      {
        title: "기능을 작은 작업으로 나누기",
        href: "/learn/vibe-coding-foundation/task-breakdown",
      },
      {
        title: "오류 수정 Loop",
        href: "/learn/vibe-coding-foundation/fix-loop",
      },
      { title: "코드 검토와 QA", href: "/learn/vibe-coding-foundation/qa-basics" },
      { title: "AI Agent", href: "/learn/vibe-coding-foundation/ai-agent" },
      { title: "SubAgent", href: "/learn/vibe-coding-foundation/subagent" },
      { title: "Workflow", href: "/learn/vibe-coding-foundation/workflow" },
    ],
    preparing: [],
    atlas: "Prompt, Context, Agent, Workflow",
    lab: "분해 · 수정 루프 · QA · Agent/Workflow 탐색",
  },
  {
    id: "d",
    title: "Track D — 실제 프로젝트",
    question: "작은 앱을 끝까지 만들 수 있을까?",
    canDo: "미니 프로젝트를 기획·구현·검증한다",
    status: "preparing",
    available: [],
    preparing: ["D01 첫 미니 웹사이트", "D02 데이터 저장 앱", "D03 외부 API", "…"],
    atlas: "Workflow, Evaluation",
    lab: "다음 Continuous Batch",
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

const V2_NODES = [
  { id: "D1-llm-basics", title: "AI 기초", description: "LLM · Token · Embedding" },
  { id: "D2-vibe-coding", title: "바이브코딩", description: "Prompt · Context · Workflow" },
  { id: "D3-ai-agent", title: "AI Agent", description: "Agent · SubAgent · 역할 분담" },
  { id: "D4-dev-ecosystem", title: "개발 생태계", description: "Tool Calling · MCP · API" },
  { id: "D5-orchestration", title: "오케스트레이션", description: "Workflow · Harness · Memory" },
  { id: "D6-ide-tools", title: "IDE · 도구", description: "과업에 맞는 AI 코딩 도구 선택" },
  { id: "D7-deploy-infra", title: "배포 · 인프라", description: "Deploy · Container · Backend" },
  { id: "D8-timeline", title: "AI 개발 연표", description: "Autocomplete에서 Multi-Agent까지" },
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

      <section aria-labelledby="v2-heading" className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Badge variant="accent">새 학습 경로</Badge>
            <h2 className="mt-3 text-2xl font-extrabold text-[var(--text-primary)]" id="v2-heading">
              AI Engineering V2
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              질문에서 시작해 개념을 연결하고, 3단계 실습과 퀴즈로 혼자 설명할 수 있는지 확인합니다.
              각 노드는 기존 Atlas 21개 정본 개념을 참조합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PrimaryLink href="/learn/ai-engineering-v2/D1-llm-basics">D1 시작하기</PrimaryLink>
            <Link
              href="/learn/ai-engineering-v2"
              className="inline-flex items-center rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-2 text-sm font-semibold text-[var(--accent-primary)] transition-colors hover:border-[var(--accent-primary)] hover:bg-[var(--surface-elevated)]"
            >
              전체 경로 보기 →
            </Link>
          </div>
        </div>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {V2_NODES.map((node, index) => (
            <li key={node.id}>
              <Link
                className="block h-full rounded-2xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 transition-colors hover:border-[var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                href={`/learn/ai-engineering-v2/${node.id}`}
              >
                <span className="text-xs font-extrabold text-[var(--accent-primary)]">
                  D{index + 1}
                </span>
                <span className="mt-1 block font-extrabold text-[var(--text-primary)]">
                  {node.title}
                </span>
                <span className="mt-2 block text-xs leading-5 text-[var(--text-secondary)]">
                  {node.description}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

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
