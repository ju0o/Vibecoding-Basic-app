import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Engineering V2 — 학습 경로",
  description:
    "비개발자가 AI 제품을 혼자 질문하고, 만들고, 검증하고, 운영할 수 있게 되는 8개 도메인 학습 경로.",
}

type V2Domain = {
  readonly id: string
  readonly shortTitle: string
  readonly title: string
  readonly domain: string
  readonly estimatedTime: string
  readonly description: string
  readonly canonicalConceptIds: readonly string[]
}

const V2_DOMAINS: readonly V2Domain[] = [
  {
    id: "D1-llm-basics",
    shortTitle: "AI 기초",
    title: "LLM은 어떻게 문장을 다룰까?",
    domain: "Domain 1 — AI 기초",
    estimatedTime: "35–45분",
    description:
      "AI가 텍스트를 이해하고 생성하는 원리를 파악합니다. 막연한 아이디어를 관찰 가능한 문제로 바꾸는 사고를 기릅니다.",
    canonicalConceptIds: ["llm", "embedding"],
  },
  {
    id: "D2-vibe-coding",
    shortTitle: "바이브코딩",
    title: "AI와 어떻게 함께 만들까?",
    domain: "Domain 2 — Prompt · Context · Workflow",
    estimatedTime: "40–50분",
    description:
      "목표, 제약, 맥락, 완료 조건을 AI에게 전달하고 결과를 반복 개선하는 협업 능력을 기릅니다.",
    canonicalConceptIds: ["prompt-engineering", "context-engineering", "workflow"],
  },
  {
    id: "D3-ai-agent",
    shortTitle: "AI Agent",
    title: "AI에게 여러 역할을 맡기면 무엇이 달라질까?",
    domain: "Domain 3 — Agent · SubAgent · 역할 분담",
    estimatedTime: "45–55분",
    description:
      "조사, 작성, 검토처럼 좁은 역할로 위임하여 자율성을 높이는 에이전트 패턴을 학습합니다.",
    canonicalConceptIds: ["agent", "subagent", "workflow"],
  },
  {
    id: "D4-dev-ecosystem",
    shortTitle: "개발 생태계",
    title: "AI는 어떻게 바깥 도구와 연결될까?",
    domain: "Domain 4 — Tool Calling · MCP",
    estimatedTime: "45–55분",
    description:
      "화면, 서버, API, 데이터베이스가 어떻게 연결되는지 눈에 보이는 흐름으로 이해합니다.",
    canonicalConceptIds: ["tool-calling", "mcp"],
  },
  {
    id: "D5-orchestration",
    shortTitle: "오케스트레이션",
    title: "AI 작업을 어떻게 반복 가능하게 운영할까?",
    domain: "Domain 5 — Orchestration · Automation",
    estimatedTime: "45–55분",
    description:
      "여러 단계를 수행하게 만들고, 실패·재시도·중단·사람 승인 상태가 있는 흐름을 설계합니다.",
    canonicalConceptIds: ["memory", "workflow", "orchestration", "harness"],
  },
  {
    id: "D6-ide-tools",
    shortTitle: "IDE · 도구",
    title: "어떤 AI 코딩 도구를 어떻게 골라야 할까?",
    domain: "Domain 6 — IDE · Tools",
    estimatedTime: "45–55분",
    description:
      "과업의 난도, 지연 시간, 비용, 위험에 맞춰 모델과 도구를 선택하는 의사결정 방법을 학습합니다.",
    canonicalConceptIds: ["context-engineering", "agent", "workflow"],
  },
  {
    id: "D7-deploy-infra",
    shortTitle: "배포 · 인프라",
    title: "내 컴퓨터의 앱을 어떻게 다른 사람에게 보여 줄까?",
    domain: "Domain 7 — Deploy · Infra",
    estimatedTime: "50–60분",
    description:
      "로컬 데모를 실제 사용자가 반복해서 쓸 수 있는 제품으로 발전시키는 운영 가능한 상태를 완성합니다.",
    canonicalConceptIds: ["production-ai"],
  },
  {
    id: "D8-timeline",
    shortTitle: "AI 개발 연표",
    title: "AI와 만드는 방식은 해마다 어떻게 바뀌었을까?",
    domain: "Domain 8 — Timeline",
    estimatedTime: "45–55분",
    description:
      "AI 개발의 역사적 흐름을 파악하고, 각 시대의 핵심 변화와 현재 위치를 이해합니다.",
    canonicalConceptIds: [
      "ai",
      "machine-learning",
      "deep-learning",
      "generative-ai",
      "llm",
      "prompt-engineering",
      "context-engineering",
      "memory",
      "knowledge",
      "embedding",
      "rag",
      "tool-calling",
      "mcp",
      "skill",
      "agent",
      "subagent",
      "workflow",
      "orchestration",
      "evaluation",
      "harness",
      "production-ai",
    ],
  },
] as const

export default function AiEngineeringV2IndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav aria-label="현재 위치" className="mb-6 text-sm text-[var(--text-tertiary)]">
        <Link className="font-semibold text-[var(--accent-primary)] hover:underline" href="/learn">
          배우기
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page" className="text-[var(--text-secondary)]">
          AI Engineering V2
        </span>
      </nav>

      <header className="mb-10 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">
          AI Engineering V2 · 8 Domains
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          AI를 혼자 질문하고, 만들고, 검증하고, 운영하기
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
          비개발자가 AI 제품을 끝까지 만들 수 있는 8개 도메인 학습 경로입니다.
          각 도메인은 실제 질문에서 시작하여 이론, 실습, 완료 증거를 한 흐름으로 다룹니다.
        </p>
      </header>

      <section aria-label="전체 학습 흐름" className="mb-10">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">전체 학습 흐름</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          문제 발견 → 소프트웨어 구조 이해 → AI와 협업 → 모델 선택 → 지식 연결 → 에이전트 자동화 → 품질 검증 → 출시와 운영
        </p>
      </section>

      <section aria-label="8개 도메인" className="grid gap-4 sm:grid-cols-2">
        {V2_DOMAINS.map((domain, index) => (
          <Link
            key={domain.id}
            href={`/learn/ai-engineering-v2/${domain.id}`}
            className="group block rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 transition-colors hover:border-[var(--accent-primary)] hover:bg-[var(--surface-elevated)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">
                Domain {index + 1}
              </p>
              <span className="shrink-0 rounded-full border border-[var(--border-default)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-tertiary)]">
                {domain.estimatedTime}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
              {domain.shortTitle}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{domain.title}</p>
            <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">
              {domain.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {domain.canonicalConceptIds.slice(0, 4).map((conceptId) => (
                <li
                  key={conceptId}
                  className="rounded-full border border-[var(--border-default)] bg-[var(--surface-primary)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-tertiary)]"
                >
                  {conceptId}
                </li>
              ))}
              {domain.canonicalConceptIds.length > 4 && (
                <li className="rounded-full border border-[var(--border-default)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-tertiary)]">
                  +{domain.canonicalConceptIds.length - 4}
                </li>
              )}
            </ul>
          </Link>
        ))}
      </section>

      <section aria-label="V2 과정 완료 증거" className="mt-10 rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5">
        <h2 className="text-base font-bold text-[var(--text-primary)]">V2 과정 완료의 공통 증거</h2>
        <ol className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-secondary)]">
          <li>1. 실제 사용자 문제와 측정 가능한 성공 기준을 정의한다.</li>
          <li>2. 제품의 화면·서버·데이터·AI 흐름을 설계하고 고장 지점을 좁힌다.</li>
          <li>3. 적절한 컨텍스트, 모델, 지식, 도구를 선택해 작동하는 워크플로를 만든다.</li>
          <li>4. 대표 사례와 실패 사례로 품질·안전·비용을 평가한다.</li>
          <li>5. 제품을 출시 가능한 상태로 점검하고 운영 증거를 바탕으로 다음 개선을 결정한다.</li>
        </ol>
      </section>

      <nav aria-label="배우기 페이지로 돌아가기" className="mt-10 border-t border-[var(--border-subtle)] pt-6 text-right">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          ← Learning Path로 돌아가기
        </Link>
      </nav>
    </main>
  )
}
