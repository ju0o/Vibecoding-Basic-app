/**
 * AI Engineering Atlas — Education Layer 데이터 (SSOT: ai-ops/roadmap/ATLAS-EDUCATION-LAYER.md)
 *
 * 12노드 스토리 체인: AI → LLM → Prompt → Context → Memory → Tool → MCP
 * → Agent → Workflow → Orchestration → Harness → Production AI
 *
 * 원칙:
 * - 기존 강의·용어집·KB를 참조만 한다 (기존 콘텐츠 무수정).
 * - `era`·`industryNow`는 KB 근거로만 채운다 (Phase A2). 빈 문자열이면 UI에서 숨긴다.
 * - question/limitationOfPrevious/breakthrough는 교육적 프레이밍(스토리 연결선)이다.
 */

export type AtlasNode = {
  readonly id: string
  readonly order: number
  readonly title: string
  /** 대략적 시기 표기 — Phase A2에서 KB 근거로 채움. 빈 문자열 = UI 숨김 */
  readonly era: string
  /** 이 노드가 답하는 "왜" 한 문장 */
  readonly question: string
  /** 이전 노드의 한계 한 문장 (스토리 연결선) — 1번 노드는 학습 여정의 출발 문장 */
  readonly limitationOfPrevious: string
  /** 돌파구 한 문장 */
  readonly breakthrough: string
  /** 현재 산업 위치 — Phase A2에서 KB 근거로 채움. 빈 문자열 = UI 숨김 */
  readonly industryNow: string
  /** 심화 딥링크 — 기존 강의 slug (curriculum.ts에 실존해야 함) */
  readonly lessonSlugs: readonly string[]
  /** 관련 용어 — glossary.ts의 term과 정확히 일치해야 함 */
  readonly glossaryTerms: readonly string[]
  /** 인용 근거 KB id (ai-ops/knowledge-base/entries) */
  readonly kbIds: readonly string[]
}

export const ATLAS_NODES = [
  {
    id: "ai",
    order: 1,
    title: "AI — 기계가 판단을 흉내 내기 시작하다",
    era: "",
    question: "사람이 일일이 규칙을 코딩하지 않아도 기계가 일하게 할 수 없을까?",
    limitationOfPrevious:
      "여정의 출발점 — 소프트웨어는 사람이 적어 준 규칙만 따를 수 있었고, 규칙으로 다 적을 수 없는 일(언어·판단)은 자동화 밖에 있었다.",
    breakthrough:
      "규칙을 적는 대신 데이터에서 패턴을 학습하는 접근이 자리잡으며, '가르치지 않은 입력'에도 그럴듯한 출력을 내는 소프트웨어가 등장했다.",
    industryNow: "",
    lessonSlugs: ["ai-vibe-coding-orientation", "ai-era-timeline", "learning-with-ai-verification"],
    glossaryTerms: ["Vibe Coding", "Hallucination"],
    kbIds: ["vibe-coding-origin-karpathy", "ai-learning-verification"],
  },
  {
    id: "llm",
    order: 2,
    title: "LLM — 언어가 인터페이스가 되다",
    era: "",
    question: "왜 하필 '거대 언어 모델'이 판을 바꿨을까?",
    limitationOfPrevious:
      "과제마다 모델을 따로 만들어야 했다 — 번역 모델, 분류 모델, 요약 모델이 전부 별개였고, 쓰려면 각각의 입출력 형식을 배워야 했다.",
    breakthrough:
      "토큰을 이어 쓰는 단일 모델이 커지자 온갖 과제를 '말로 시키는' 것이 가능해졌다 — 자연어가 곧 인터페이스가 됐고, 능력·비용·지연의 모델 선택 문제가 함께 태어났다.",
    industryNow: "",
    lessonSlugs: ["tokenization-and-context", "model-selection-tradeoffs"],
    glossaryTerms: ["Token", "Tokenization", "Model Selection"],
    kbIds: ["tokenization-context", "model-selection-tradeoffs"],
  },
  {
    id: "prompt",
    order: 3,
    title: "Prompt — 말로 시키는 법을 설계하다",
    era: "",
    question: "같은 모델인데 왜 어떤 요청은 잘 되고 어떤 요청은 엉망일까?",
    limitationOfPrevious:
      "말로 시킬 수 있게 됐지만, 모델은 마음을 읽지 못한다 — 모호한 요청은 모호한 출력을 낳았고 결과가 복불복이었다.",
    breakthrough:
      "요청을 '좋은 문장'이 아니라 목표·제약·근거 정책·출력 형식을 담은 작업 계약으로 설계하는 프롬프트 엔지니어링이 정립됐다.",
    industryNow: "",
    lessonSlugs: ["prompt-engineering-foundations", "from-prompt-to-system"],
    glossaryTerms: ["Prompt Engineering", "Output Format Control"],
    kbIds: ["prompt-engineering"],
  },
  {
    id: "context",
    order: 4,
    title: "Context — 모델이 보는 세계를 채우다",
    era: "",
    question: "프롬프트를 잘 써도 모델이 우리 문서·우리 코드를 모르는 건 어떻게 하나?",
    limitationOfPrevious:
      "프롬프트는 지시를 다듬지만, 모델의 지식은 학습 시점에 멈춰 있다 — 우리 회사 문서, 오늘의 코드베이스는 모델 안에 없다.",
    breakthrough:
      "모델이 한 번에 보는 토큰 집합(context)에 필요한 자료를 골라 넣는 기술 — 검색(RAG)과 컨텍스트 엔지니어링 — 이 지시와 지식의 간극을 메웠다.",
    industryNow: "",
    lessonSlugs: [
      "context-engineering-basics",
      "explain-context-and-rag",
      "tokenization-and-context",
    ],
    glossaryTerms: ["Context Window", "Context Engineering", "RAG"],
    kbIds: ["context-engineering", "rag"],
  },
  {
    id: "memory",
    order: 5,
    title: "Memory — 대화가 이어지게 만들다",
    era: "",
    question: "왜 모델은 방금 한 말도 '창이 넘치면' 잊어버릴까?",
    limitationOfPrevious:
      "context는 유한한 그릇이다 — 대화가 길어지면 앞부분이 밀려나고, 세션이 끝나면 전부 사라진다.",
    breakthrough:
      "창 밖의 상태를 다루는 층 — 요약·캐시·외부 저장(메모리) — 이 생기며, 긴 작업과 이어지는 대화가 가능해졌다.",
    industryNow: "",
    lessonSlugs: ["context-window-and-memory", "context-caching-and-state"],
    glossaryTerms: ["Context Window", "High-Signal Tokens"],
    kbIds: ["context-caching", "context-engineering"],
  },
  {
    id: "tool",
    order: 6,
    title: "Tool — 모델이 손을 갖다",
    era: "",
    question: "말만 하는 모델이 어떻게 검색하고 계산하고 파일을 만들까?",
    limitationOfPrevious:
      "기억과 컨텍스트가 있어도 모델의 출력은 결국 글자였다 — 세상을 읽을 수도, 바꿀 수도 없었다.",
    breakthrough:
      "모델이 자연어 대신 구조화된 함수 호출을 내놓는 tool calling이 등장해, '언제 어떤 도구를 부를지'를 모델이 판단하게 됐다.",
    industryNow: "",
    lessonSlugs: ["tool-calling-basics"],
    glossaryTerms: ["Tool Calling", "Tool Layer"],
    kbIds: ["tool-calling"],
  },
  {
    id: "mcp",
    order: 7,
    title: "MCP — 도구 연결이 표준이 되다",
    era: "",
    question: "앱마다 도구를 새로 붙이는 N×M 문제는 누가 풀까?",
    limitationOfPrevious:
      "도구 호출은 됐지만 연결이 제각각이었다 — 앱 3개가 같은 도구를 쓰려면 3번 붙여야 했고, 도구가 바뀌면 3곳을 고쳤다.",
    breakthrough:
      "도구·리소스를 표준 방식으로 노출하는 프로토콜(MCP)이 나와, 한 번 노출한 도구를 어떤 호스트든 같은 방식으로 쓰게 됐다 — 'AI의 USB-C 포트'.",
    industryNow: "",
    lessonSlugs: ["mcp-architecture-basics", "explain-tool-agent-mcp", "mcp-enabled-tool-project"],
    glossaryTerms: ["MCP", "MCP Protocol Layer", "MCP Host"],
    kbIds: ["mcp"],
  },
  {
    id: "agent",
    order: 8,
    title: "Agent — 한 번의 호출이 루프가 되다",
    era: "",
    question: "도구를 부를 줄 아는 모델이 왜 '스스로 일하는' 것처럼 보일까?",
    limitationOfPrevious:
      "도구 호출은 한 번의 행위였다 — 부르고, 결과를 받고, 끝. 여러 단계가 필요한 일은 사람이 매번 다음 지시를 내려야 했다.",
    breakthrough:
      "계획→행동→관찰→갱신을 반복하며 스스로 방향을 정하는 에이전트 루프가 등장해, 목표만 주면 여러 단계를 이어서 진행하게 됐다.",
    industryNow: "",
    lessonSlugs: ["agent-loop-anatomy", "explain-tool-agent-mcp"],
    glossaryTerms: ["Agent Loop", "Agent Loop Layer"],
    kbIds: ["agent-loop"],
  },
  {
    id: "workflow",
    order: 9,
    title: "Workflow — 예측 가능함이 필요해지다",
    era: "",
    question: "에이전트가 알아서 하는데 왜 다시 '정해진 절차'가 필요할까?",
    limitationOfPrevious:
      "자율 루프는 유연하지만 매번 경로가 달라질 수 있다 — 반복 업무·규정 업무에서는 그 자유가 오히려 위험과 비용이 된다.",
    breakthrough:
      "사람이 미리 정한 코드 경로 위에서 LLM과 도구를 조합하는 워크플로가 자리잡아, 반복 가능한 자동화와 자율 에이전트를 구분해 쓰게 됐다.",
    industryNow: "",
    lessonSlugs: ["ai-workflow-design", "automation-workflow-project"],
    glossaryTerms: ["Workflow", "Predefined Code Path"],
    kbIds: ["orchestration", "loop-engineering"],
  },
  {
    id: "orchestration",
    order: 10,
    title: "Orchestration — 하나로는 부족해지다",
    era: "",
    question: "일이 커지면 왜 에이전트를 '여럿' 쓰고, 누가 그들을 지휘할까?",
    limitationOfPrevious:
      "에이전트 하나의 컨텍스트와 시간에는 한계가 있다 — 큰 일을 통째로 맡기면 느려지고, 오류가 누적된다.",
    breakthrough:
      "일을 쪼개 서브에이전트에 위임하고 결과를 병합·조정하는 오케스트레이션이 등장해, 병렬성과 역할 분담이 가능해졌다.",
    industryNow: "",
    lessonSlugs: ["multi-agent-orchestration", "subagents-and-delegation"],
    glossaryTerms: ["Orchestration", "Delegation"],
    kbIds: ["orchestration", "subagents"],
  },
  {
    id: "harness",
    order: 11,
    title: "Harness — 자율에 고삐를 채우다",
    era: "",
    question: "잘 도는 에이전트를 '믿고 맡길 수 있게' 만드는 것은 무엇일까?",
    limitationOfPrevious:
      "루프와 위임이 강력해질수록 실패도 조용히 커졌다 — 무한 루프, 권한 남용, 검증 없는 결과가 사람 모르게 쌓일 수 있었다.",
    breakthrough:
      "입력 게이트·권한 경계·루프 한도·로그·평가를 갖춘 실행 환경(하네스)이 에이전트를 감싸며, 자율성과 통제가 함께 설계되기 시작했다.",
    industryNow: "",
    lessonSlugs: ["harness-engineering-basics", "loop-engineering-basics"],
    glossaryTerms: ["Harness Engineering", "Evaluation Harness"],
    kbIds: ["harness", "loop-engineering"],
  },
  {
    id: "production-ai",
    order: 12,
    title: "Production AI — 데모가 제품이 되다",
    era: "",
    question: "돌아가는 AI와 '운영해도 되는' AI의 차이는 무엇일까?",
    limitationOfPrevious:
      "하네스까지 갖춰도 그것은 한 번의 실행 이야기다 — 매일, 수천 명에게, 비용과 사고 대응까지 책임지는 것은 다른 문제다.",
    breakthrough:
      "평가(eval)·모니터링·롤백·secret 관리·배포 체크리스트가 AI 시스템에 이식되며, AI 엔지니어링이 소프트웨어 운영의 규율과 합류했다.",
    industryNow: "",
    lessonSlugs: [
      "ai-system-evaluation",
      "monitoring-errors-rollbacks",
      "deployment-checklist-playbook",
      "production-env-and-secrets",
    ],
    glossaryTerms: ["Evaluation", "Monitoring", "Rollback"],
    kbIds: ["ai-system-evaluation"],
  },
] as const satisfies readonly AtlasNode[]

export function getAtlasNode(id: string): AtlasNode | undefined {
  return ATLAS_NODES.find((n) => n.id === id)
}
