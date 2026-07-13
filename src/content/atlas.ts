/**
 * AI Engineering Atlas V2 — 21 canonical concepts + 14-section chapter contract.
 * SSOT: ai-ops/roadmap/ATLAS-EDUCATION-LAYER.md
 * Model Routing is a subordinate Learning Route (not concept #22).
 */

export type AtlasArcId =
  | "intelligence"
  | "generation"
  | "grounding"
  | "action"
  | "agency"
  | "reliability"

export type AtlasConceptStatus = "complete" | "partial" | "missing" | "blocked_by_source"

export type AtlasConcept = {
  readonly id: string
  readonly slug: string
  readonly order: number
  readonly title: string
  readonly shortDefinition: string
  readonly arc: AtlasArcId
  readonly stageLabel: string
  readonly question: string
  readonly limitationOfPrevious: string
  readonly breakthrough: string
  readonly whyBridge: string
  readonly previousConceptId: string | null
  readonly nextConceptId: string | null
  readonly lessonSlugs: readonly string[]
  readonly glossaryTerms: readonly string[]
  readonly kbIds: readonly string[]
  readonly status: AtlasConceptStatus
  readonly subordinateRoutes?: readonly { readonly href: string; readonly label: string }[]
}

/** Approved 14-section contract (Education Layer §4.4). */
export const ATLAS_CHAPTER_SECTIONS = [
  { id: "definition", title: "한 줄 정의" },
  { id: "why-emerged", title: "왜 등장했는가" },
  { id: "previous-limits", title: "이전 기술의 한계" },
  { id: "what-it-solved", title: "무엇을 해결했는가" },
  { id: "real-cases", title: "실제 사례" },
  { id: "companies", title: "대표 기업" },
  { id: "services", title: "대표 서비스" },
  { id: "in-projects", title: "실제 프로젝트에서는 어떻게 사용하는가" },
  { id: "animation", title: "인터랙티브 애니메이션" },
  { id: "diagram", title: "인터랙티브 다이어그램" },
  { id: "practice", title: "실습" },
  { id: "quiz", title: "퀴즈" },
  { id: "related-tech", title: "관련 기술" },
  { id: "next-tech", title: "다음 기술" },
] as const

export type AtlasChapterSectionId = (typeof ATLAS_CHAPTER_SECTIONS)[number]["id"]

export const ATLAS_ARCS: readonly {
  readonly id: AtlasArcId
  readonly title: string
  readonly question: string
}[] = [
  {
    id: "intelligence",
    title: "Intelligence",
    question: "규칙을 쓰는 대신 어떻게 학습하게 되었는가?",
  },
  {
    id: "generation",
    title: "Generation",
    question: "분류·예측을 넘어 어떻게 생성과 대화가 가능해졌는가?",
  },
  {
    id: "grounding",
    title: "Grounding",
    question: "모델이 목표·상태·자료를 어떻게 다루는가?",
  },
  {
    id: "action",
    title: "Action",
    question: "모델이 어떻게 행동하고 연결을 표준화하는가?",
  },
  {
    id: "agency",
    title: "Agency",
    question: "한 번의 호출이 어떻게 반복·위임·조정이 되는가?",
  },
  {
    id: "reliability",
    title: "Reliability",
    question: "데모를 어떻게 믿을 수 있는 제품으로 만드는가?",
  },
]

/** @deprecated alias — prefer ATLAS_CONCEPTS */
export type AtlasNode = AtlasConcept

const C = (
  partial: Omit<AtlasConcept, "slug" | "previousConceptId" | "nextConceptId" | "status"> & {
    readonly status?: AtlasConceptStatus
  },
): Omit<AtlasConcept, "previousConceptId" | "nextConceptId"> => ({
  ...partial,
  slug: partial.id,
  status: partial.status ?? "partial",
})

const RAW = [
  C({
    id: "ai",
    order: 1,
    title: "AI",
    shortDefinition: "기계가 사람처럼 판단·행동을 흉내 내도록 만드는 넓은 목표다.",
    arc: "intelligence",
    stageLabel: "기초",
    question: "규칙을 다 적지 않고도 기계가 일할 수 없을까?",
    limitationOfPrevious: "소프트웨어는 사람이 적어 준 규칙만 따랐다.",
    breakthrough: "데이터에서 패턴을 학습하는 접근이 등장했다.",
    whyBridge: "규칙을 다 적을 수 없어 학습이 필요해졌다.",
    lessonSlugs: ["ai-vibe-coding-orientation", "ai-era-timeline", "learning-with-ai-verification"],
    glossaryTerms: ["Vibe Coding", "Hallucination"],
    kbIds: ["vibe-coding-origin-karpathy", "ai-learning-verification", "ai-era-timeline"],
  }),
  C({
    id: "machine-learning",
    order: 2,
    title: "Machine Learning",
    shortDefinition: "예제 데이터로 패턴을 학습해 예측·분류하는 방법이다.",
    arc: "intelligence",
    stageLabel: "기초",
    question: "규칙을 쓰는 대신 어떻게 학습하게 되었는가?",
    limitationOfPrevious: "모든 예외를 규칙으로 쓰기 어려웠다.",
    breakthrough: "특징과 데이터로 모델을 학습하는 일반 절차가 자리 잡았다.",
    whyBridge: "단순 학습만으로는 복잡한 표현을 다루기 어려워 Deep Learning이 필요해졌다.",
    lessonSlugs: ["learning-with-ai-verification"],
    glossaryTerms: ["Machine Learning"],
    kbIds: ["ai-learning-verification"],
  }),
  C({
    id: "deep-learning",
    order: 3,
    title: "Deep Learning",
    shortDefinition: "다층 신경망으로 복잡한 표현을 학습하는 방법이다.",
    arc: "intelligence",
    stageLabel: "기초",
    question: "왜 더 깊은 네트워크가 필요해졌는가?",
    limitationOfPrevious: "얕은 모델은 이미지·언어의 복잡한 패턴을 잘 못 잡았다.",
    breakthrough: "계층적 표현 학습이 가능해졌다.",
    whyBridge: "분류를 넘어 생성·대화가 필요해 Generative AI로 이어졌다.",
    lessonSlugs: ["embeddings-and-similarity"],
    glossaryTerms: ["Neural Network"],
    kbIds: ["embeddings-similarity"],
  }),
  C({
    id: "generative-ai",
    order: 4,
    title: "Generative AI",
    shortDefinition: "텍스트·이미지 등 새로운 콘텐츠를 생성하는 AI다.",
    arc: "generation",
    stageLabel: "생성",
    question: "분류·예측을 넘어 어떻게 생성과 대화가 가능해졌는가?",
    limitationOfPrevious: "모델이 주로 라벨을 고르는 쪽에 머물렀다.",
    breakthrough: "시퀀스 생성으로 말과 이미지를 만들 수 있게 되었다.",
    whyBridge: "범용 언어 인터페이스가 필요해 LLM이 중심이 되었다.",
    lessonSlugs: ["tokenization-and-context"],
    glossaryTerms: ["Generative AI"],
    kbIds: ["tokenization-context"],
  }),
  C({
    id: "llm",
    order: 5,
    title: "LLM",
    shortDefinition: "대규모 언어 모델로 토큰을 이어 쓰며 과제를 수행하는 모델이다.",
    arc: "generation",
    stageLabel: "생성",
    question: "왜 하필 거대 언어 모델이 판을 바꿨을까?",
    limitationOfPrevious: "과제마다 별도 모델과 인터페이스가 필요했다.",
    breakthrough: "자연어가 공통 인터페이스가 되었다.",
    whyBridge: "출력이 모호해 Prompt Engineering이 필요해졌다.",
    lessonSlugs: ["tokenization-and-context", "model-selection-tradeoffs"],
    glossaryTerms: ["Token", "Tokenization", "Model Selection"],
    kbIds: ["tokenization-context", "model-selection-tradeoffs"],
  }),
  C({
    id: "prompt-engineering",
    order: 6,
    title: "Prompt Engineering",
    shortDefinition: "모델에게 목표·형식·제약을 명확히 전달하는 설계다.",
    arc: "grounding",
    stageLabel: "접지",
    question: "같은 모델인데 왜 어떤 요청은 되고 어떤 요청은 실패할까?",
    limitationOfPrevious: "모호한 지시로 결과가 흔들렸다.",
    breakthrough: "계약형 지시와 예시로 출력 품질을 안정화한다.",
    whyBridge: "한 번의 문장만으로는 필요한 자료·상태가 부족해 Context Engineering이 필요해졌다.",
    lessonSlugs: ["prompt-engineering-foundations", "system-prompts-and-instruction-layers"],
    glossaryTerms: ["Prompt", "System Prompt"],
    kbIds: ["prompt-engineering"],
  }),
  C({
    id: "context-engineering",
    order: 7,
    title: "Context Engineering",
    shortDefinition: "제한된 창 안에 무엇을 넣고 빼을지 설계하는 일이다.",
    arc: "grounding",
    stageLabel: "접지",
    question: "모델이 지금 필요한 정보를 어떻게 갖게 할까?",
    limitationOfPrevious: "프롬프트만으로는 상태·자료·이력을 다루기 어려웠다.",
    breakthrough: "컨텍스트 창을 예산처럼 관리하는 설계가 생겼다.",
    whyBridge: "대화·작업 상태를 유지하려면 Memory가 필요해졌다.",
    lessonSlugs: ["context-window-and-memory", "context-engineering-mcp-skills"],
    glossaryTerms: ["Context Window", "Context Engineering"],
    kbIds: ["context-engineering", "context-caching"],
  }),
  C({
    id: "memory",
    order: 8,
    title: "Memory",
    shortDefinition: "단기·장기 상태를 저장하고 다시 꺼내 쓰는 장치다.",
    arc: "grounding",
    stageLabel: "접지",
    question: "모델은 어떻게 ‘기억’하는가?",
    limitationOfPrevious: "창이 끝나면 이전 대화가 사라졌다.",
    breakthrough: "요약·노트·외부 저장으로 상태를 이어 간다.",
    whyBridge: "외부 지식을 체계적으로 쓰려면 Knowledge 층이 필요해졌다.",
    lessonSlugs: ["context-window-and-memory", "context-caching-and-state"],
    glossaryTerms: ["Memory", "Context Caching"],
    kbIds: ["context-caching"],
  }),
  C({
    id: "knowledge",
    order: 9,
    title: "Knowledge",
    shortDefinition: "조직·제품의 자료를 모델이 참조할 수 있게 정리한 지식 층이다.",
    arc: "grounding",
    stageLabel: "접지",
    question: "모델 밖의 사실을 어떻게 연결할까?",
    limitationOfPrevious: "모델 내부 지식만으로는 최신·사내 정보가 부족했다.",
    breakthrough: "근거 문서를 붙이는 지식 체계가 생겼다.",
    whyBridge: "의미 검색을 위해 Embedding이 필요해졌다.",
    lessonSlugs: ["grounding-and-citations", "hallucination-and-verification"],
    glossaryTerms: ["Grounding", "Citation"],
    kbIds: ["grounding-citations", "hallucination-verification"],
  }),
  C({
    id: "embedding",
    order: 10,
    title: "Embedding",
    shortDefinition: "텍스트를 의미 벡터로 바꿔 유사도를 계산하게 한다.",
    arc: "grounding",
    stageLabel: "접지",
    question: "비슷한 문장을 어떻게 찾을까?",
    limitationOfPrevious: "키워드 검색만으로는 의미가 안 맞았다.",
    breakthrough: "벡터 공간에서 유사 문서를 찾을 수 있다.",
    whyBridge: "검색 후 생성으로 이어지려면 RAG가 필요해졌다.",
    lessonSlugs: ["embeddings-and-similarity"],
    glossaryTerms: ["Embedding", "Vector"],
    kbIds: ["embeddings-similarity"],
  }),
  C({
    id: "rag",
    order: 11,
    title: "RAG",
    shortDefinition: "검색으로 근거를 찾은 뒤 생성에 넣는 패턴이다.",
    arc: "grounding",
    stageLabel: "접지",
    question: "환각을 줄이면서 최신 자료를 쓰려면?",
    limitationOfPrevious: "모델 가중치만 믿으면 근거가 약하다.",
    breakthrough: "검색→생성 파이프라인으로 근거를 붙인다.",
    whyBridge: "읽기만으로는 부족해 행동하려면 Tool Calling이 필요해졌다.",
    lessonSlugs: ["explain-context-and-rag"],
    glossaryTerms: ["RAG", "Retrieval"],
    kbIds: ["rag"],
  }),
  C({
    id: "tool-calling",
    order: 12,
    title: "Tool Calling",
    shortDefinition: "모델이 스키마에 맞춰 도구를 호출해 행동을 수행한다.",
    arc: "action",
    stageLabel: "행동",
    question: "모델이 말만 하지 않고 일을 하려면?",
    limitationOfPrevious: "텍스트 답변만으로는 실제 시스템을 바꾸지 못한다.",
    breakthrough: "함수 호출 형식의 도구 사용이 표준화되기 시작했다.",
    whyBridge: "도구 연결이 제각각이라 MCP 같은 표준이 필요해졌다.",
    lessonSlugs: ["explain-tool-agent-mcp"],
    glossaryTerms: ["Tool Calling", "Function Calling"],
    kbIds: ["tool-calling"],
  }),
  C({
    id: "mcp",
    order: 13,
    title: "MCP",
    shortDefinition: "모델과 도구·데이터를 연결하는 표준 프로토콜이다.",
    arc: "action",
    stageLabel: "행동",
    question: "N×M 연결을 어떻게 줄일까?",
    limitationOfPrevious: "제품마다 다른 도구 연결 방식이 중복되었다.",
    breakthrough: "Host·Client·Server 경계로 연결을 표준화한다.",
    whyBridge: "재사용 가능한 능력 묶음으로 Skill이 필요해졌다.",
    lessonSlugs: ["explain-tool-agent-mcp", "mcp-enabled-tool-project"],
    glossaryTerms: ["MCP"],
    kbIds: ["mcp"],
  }),
  C({
    id: "skill",
    order: 14,
    title: "Skill",
    shortDefinition: "반복 가능한 지시·도구·절차를 패키지로 묶은 능력이다.",
    arc: "action",
    stageLabel: "행동",
    question: "같은 작업을 매번 처음부터 설명하지 않으려면?",
    limitationOfPrevious: "프롬프트와 도구 설정이 흩어져 재사용이 어려웠다.",
    breakthrough: "스킬 단위로 능력을 배포·재사용한다.",
    whyBridge: "여러 단계 자율 실행을 위해 Agent가 필요해졌다.",
    lessonSlugs: ["designing-reusable-skills", "context-engineering-mcp-skills"],
    glossaryTerms: ["Skill"],
    kbIds: ["skills"],
  }),
  C({
    id: "agent",
    order: 15,
    title: "Agent",
    shortDefinition: "목표를 위해 계획·도구 사용·관찰을 반복하는 실행 단위다.",
    arc: "agency",
    stageLabel: "자율",
    question: "한 번의 호출이 어떻게 작업 루프가 되는가?",
    limitationOfPrevious: "단일 응답으로는 긴 작업을 끝내지 못한다.",
    breakthrough: "루프와 도구로 다단계 작업을 수행한다.",
    whyBridge: "한 Agent가 모든 일을 하기 어려워 SubAgent 위임이 필요해졌다.",
    lessonSlugs: ["agent-loop-anatomy", "ai-workflow-design"],
    glossaryTerms: ["Agent", "Agent Loop"],
    kbIds: ["agent-loop"],
  }),
  C({
    id: "subagent",
    order: 16,
    title: "SubAgent",
    shortDefinition: "좁은 역할·별도 문맥을 가진 하위 실행 단위다.",
    arc: "agency",
    stageLabel: "자율",
    question: "전문 작업을 어떻게 나눠 맡길까?",
    limitationOfPrevious: "단일 컨텍스트에 모든 역할을 넣으면 혼란이 커진다.",
    breakthrough: "역할 분리와 위임으로 전문성을 나눈다.",
    whyBridge: "여러 단계를 안정적으로 이으려면 Workflow가 필요해졌다.",
    lessonSlugs: ["subagents-and-delegation"],
    glossaryTerms: ["SubAgent"],
    kbIds: ["subagents"],
  }),
  C({
    id: "workflow",
    order: 17,
    title: "Workflow",
    shortDefinition: "단계·조건·핸드오프로 작업을 순서화한 흐름이다.",
    arc: "agency",
    stageLabel: "자율",
    question: "반복 가능한 작업 순서를 어떻게 고정할까?",
    limitationOfPrevious: "즉흥 루프만으로는 재현과 감사가 어렵다.",
    breakthrough: "명시적 단계와 전이로 작업을 구조화한다.",
    whyBridge: "여러 Agent·경로를 조율하려면 Orchestration이 필요해졌다.",
    lessonSlugs: ["ai-workflow-design", "automation-workflow-project"],
    glossaryTerms: ["Workflow"],
    kbIds: ["orchestration"],
  }),
  C({
    id: "orchestration",
    order: 18,
    title: "Orchestration",
    shortDefinition: "여러 Agent·도구·핸드오프를 누가 언제 맡길지 조율한다.",
    arc: "agency",
    stageLabel: "자율",
    question: "여러 실행 단위를 어떻게 맞춰 돌릴까?",
    limitationOfPrevious: "워크플로만으로는 역할 간 라우팅 기준이 약했다.",
    breakthrough: "매니저·핸드오프·도구 호출로 조율한다.",
    whyBridge:
      "어떤 일을 누구에게·어떤 비용으로 맡길지 기준이 필요해 Model Routing 하위 학습 경로가 이어진다. 결과는 Evaluation으로 측정한다.",
    lessonSlugs: ["multi-agent-orchestration"],
    glossaryTerms: ["Orchestration", "Handoff"],
    kbIds: ["orchestration"],
    subordinateRoutes: [{ href: "/model-routing", label: "Model Routing Learning Route" }],
  }),
  C({
    id: "evaluation",
    order: 19,
    title: "Evaluation",
    shortDefinition: "성공 기준을 정해 출력·경로 품질을 측정한다.",
    arc: "reliability",
    stageLabel: "신뢰",
    question: "좋은 결과를 어떻게 판정할까?",
    limitationOfPrevious: "데모 한 번으로 품질을 단정하기 쉽다.",
    breakthrough: "루브릭·테스트·트레이스로 평가한다.",
    whyBridge: "측정된 실행을 안전하게 감싸려면 Harness가 필요해졌다.",
    lessonSlugs: ["ai-system-evaluation", "ai-assisted-testing-loop"],
    glossaryTerms: ["Evaluation", "Eval"],
    kbIds: ["ai-system-evaluation"],
  }),
  C({
    id: "harness",
    order: 20,
    title: "Harness",
    shortDefinition: "권한·샌드박스·승인·관측·복구로 Agent 실행을 감싼다.",
    arc: "reliability",
    stageLabel: "신뢰",
    question: "자율 실행을 어떻게 안전하게 묶을까?",
    limitationOfPrevious: "평가만으로는 권한·사고 전파를 막기 어렵다.",
    breakthrough: "제어면과 실행면을 분리해 가드레일을 둔다.",
    whyBridge: "운영 환경에 올리면 Production AI 문제가 남는다.",
    lessonSlugs: ["harness-engineering-basics", "tool-permissions-sandboxes"],
    glossaryTerms: ["Harness", "Sandbox", "Guardrails"],
    kbIds: ["harness", "tool-permissions-sandboxes"],
  }),
  C({
    id: "production-ai",
    order: 21,
    title: "Production AI",
    shortDefinition: "모니터링·롤백·비용·보안을 포함한 운영 가능한 AI 시스템이다.",
    arc: "reliability",
    stageLabel: "신뢰",
    question: "데모를 제품으로 어떻게 운영할까?",
    limitationOfPrevious: "실험 환경의 성공이 운영 성공을 보장하지 않는다.",
    breakthrough: "관측·배포·사고 대응을 제품 루프에 넣는다.",
    whyBridge: "여기까지가 Atlas 정본 21개 Concept 여정의 끝이다. 심화는 Textbook·KB로 이어진다.",
    lessonSlugs: [
      "monitoring-errors-rollbacks",
      "deployment-checklist-playbook",
      "explain-risk-and-verification",
    ],
    glossaryTerms: ["Observability", "Rollback"],
    kbIds: ["monitoring-errors-rollbacks"],
  }),
]

export const ATLAS_CONCEPTS: readonly AtlasConcept[] = RAW.map((concept, index, arr) => ({
  ...concept,
  previousConceptId: index === 0 ? null : (arr[index - 1]?.id ?? null),
  nextConceptId: index === arr.length - 1 ? null : (arr[index + 1]?.id ?? null),
}))

/** @deprecated use ATLAS_CONCEPTS — kept for gradual rename */
export const ATLAS_NODES = ATLAS_CONCEPTS

export const ATLAS_CONCEPT_COUNT = 21
export const ATLAS_SECTION_COUNT = 14
