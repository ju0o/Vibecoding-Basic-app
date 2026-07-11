## 한 줄 정의

AI 챗봇 프로젝트는 사용자의 message를 받아 모델 응답을 보여주는 UI만이 아니라, 대화 상태를 저장하고, 필요한 지식을 retrieval로 찾아 context에 넣고, 외부 시스템 접근은 tool boundary로 통제하며, agent가 필요한 경우와 단순 챗봇으로 충분한 경우를 구분하는 AI 시스템입니다. "채팅창"은 표면이고, 실제 architecture는 state, context, retrieval, tool, permission의 조합입니다. ==좋은 챗봇 프로젝트는 모델에게 모든 것을 기억하라고 맡기는 것이 아니라, 애플리케이션이 어떤 정보를 보존하고 어떤 정보를 넣고 어떤 행동을 허용할지 설계하는 프로젝트==입니다.

이 강의는 project-textbook 모듈의 세 번째 강의입니다. 앞에서 미니 SaaS와 관리자 대시보드가 사용자, 데이터, 권한 경계를 다뤘다면, AI 챗봇은 그 위에 모델 호출이라는 새 경계를 추가합니다. 모델은 텍스트를 생성하지만, 대화 기록을 어떻게 다룰지, 검색 결과를 어떻게 넣을지, 도구 호출을 실제로 실행할지, agent처럼 계획과 도구 사용을 맡길지는 애플리케이션이 결정합니다.

근거 KB는 OpenAI Conversation State, Retrieval, Function Calling, Agents SDK, Anthropic Effective Context Engineering입니다. 이 강의는 특정 SDK 튜토리얼이 아니라 AI 챗봇을 설명 가능한 시스템으로 보는 방법을 다룹니다. 초보자가 나중에 "챗봇은 그냥 API 호출 아닌가요?"라는 질문에 state와 retrieval, tool boundary로 답할 수 있게 만드는 것이 목표입니다.

## 왜 존재하는가

초기의 챗봇 구현은 input box와 API call만으로도 동작해 보입니다. 사용자가 message를 보내면 모델이 답합니다. 그러나 조금만 실제 제품에 가까워지면 문제가 생깁니다. 이전 대화를 기억해야 하고, 회사 문서나 교재 내용에 근거해야 하고, 주문 조회나 티켓 생성 같은 외부 시스템 접근이 필요해지고, 잘못된 도구 실행을 막아야 합니다.

AI 챗봇 프로젝트가 필요한 첫 번째 이유는 conversation state입니다. OpenAI 문서는 conversation state를 여러 message나 turn에 걸쳐 정보를 보존하는 것으로 설명합니다. 그런데 각 text generation request가 independent and stateless일 수 있다는 점도 중요합니다. 즉 모델이 알아서 모든 것을 기억하는 것이 아니라, 애플리케이션이 history와 summary, user profile, retrieved context를 관리해야 합니다.

두 번째 이유는 retrieval입니다. 모델이 모든 최신 문서와 내부 지식을 알고 있다고 가정하면 hallucination 위험이 커집니다. Retrieval은 사용자의 질문을 semantic search로 데이터와 연결합니다. 교재 사이트라면 사용자의 질문을 관련 lesson이나 KB 조각에 연결하고, 그 결과를 context로 넣어 답변하게 할 수 있습니다.

세 번째 이유는 tool calling입니다. 챗봇이 외부 시스템과 data에 접근하려면 함수나 tool을 호출해야 합니다. OpenAI function calling 문맥에서 tool은 external systems and access data와 연결됩니다. 하지만 모델이 tool call을 요청한다고 해서 애플리케이션이 무조건 실행해야 하는 것은 아닙니다. 권한과 validation이 필요합니다.

네 번째 이유는 agent와 workflow의 구분입니다. Agents는 plan하고 tool을 call하는 application으로 확장될 수 있습니다. 그러나 모든 챗봇이 agent일 필요는 없습니다. 질문 답변, 검색 기반 답변, 간단한 상태 유지로 충분한 경우도 많습니다. ==AI 챗봇 설계의 첫 판단은 "얼마나 똑똑하게 만들까"가 아니라 "state, retrieval, tool, agent 중 무엇이 실제 문제 해결에 필요한가"입니다==.

## 작동 원리

### 1. 사용자의 message를 request 단위로 받는다

챗봇의 시작은 message입니다. 사용자는 자연어로 질문하거나 요청합니다. 애플리케이션은 이 message를 그대로 모델에게 보내기 전에 user, session, conversation id, 현재 product context를 확인합니다. 이 단계에서 이미 일반적인 API endpoint와 비슷한 보안 경계가 생깁니다. 로그인한 사용자인지, 어떤 workspace에 속하는지, 어떤 데이터에 접근 가능한지 확인해야 합니다.

단순한 데모에서는 message만 보내도 됩니다. 그러나 SaaS 챗봇에서는 message가 누구의 데이터와 연결되는지 중요합니다. "내 결제 내역 보여줘"라는 요청은 사용자 identity와 account access 없이는 실행하면 안 됩니다. 그래서 AI chatbot endpoint도 일반 backend endpoint와 마찬가지로 authentication과 authorization의 영향을 받습니다.

### 2. conversation state를 애플리케이션이 조립한다

각 text generation request가 independent and stateless라면, 이전 대화를 기억하는 듯한 경험은 애플리케이션이 만들어야 합니다. Conversation State Window는 어떤 message history를 다시 넣을지, 너무 긴 대화는 summary로 압축할지, user profile이나 preference를 넣을지, retrieval 결과를 넣을지 결정하는 설계 단위입니다.

여기서 context는 finite resource입니다. 무작정 모든 history를 넣으면 비용과 품질 문제가 생깁니다. Anthropic의 context engineering 관점처럼 context는 중요하지만 유한합니다. 따라서 챗봇은 "모두 기억"보다 "현재 요청에 필요한 정보를 선별"하는 방향으로 설계해야 합니다. ==대화 상태 관리는 메모리 흉내가 아니라 현재 답변에 필요한 context를 선택하는 engineering 문제==입니다.

### 3. retrieval로 외부 지식을 찾는다

사용자의 질문이 제품 문서, 교재, 정책, 데이터베이스 문서와 관련되어 있다면 retrieval 단계가 필요합니다. OpenAI Retrieval 문서는 data에 대한 semantic search를 수행하는 흐름을 말합니다. RAG 챗봇에서는 사용자 질문을 embedding이나 검색 index에 보내 관련 문서를 찾고, 그 snippet 또는 source를 모델 context에 넣습니다.

Retrieval의 역할은 모델에게 "알아서 기억해"라고 하는 대신, 답변에 필요한 근거를 현재 요청에 공급하는 것입니다. 교재 챗봇이라면 `context-engineering-basics`, `rag-fundamentals`, `tool-calling-basics` 같은 lesson에서 관련 조각을 찾아 넣을 수 있습니다. 이때 검색 결과가 많다고 좋은 것은 아닙니다. Context가 finite resource이기 때문에 관련도가 높은 조각을 선별해야 합니다.

### 4. 모델은 답변 또는 tool call 요청을 만든다

모델 호출 결과는 단순 텍스트일 수도 있고 tool call request일 수도 있습니다. Function calling 문맥에서 tool call은 모델이 tool을 사용하겠다고 요청하는 것입니다. 이 지점이 Chatbot Tool Boundary입니다. 모델은 "이 tool을 호출하면 좋겠다"라고 제안하지만, 실제 외부 시스템 호출은 애플리케이션이 수행합니다.

예를 들어 사용자가 "내 최근 주문 상태 알려줘"라고 물으면 모델은 `getOrders` tool call을 요청할 수 있습니다. 그러나 애플리케이션은 먼저 사용자의 session과 account access를 확인해야 합니다. Tool arguments도 schema에 맞는지 검증해야 합니다. 모델이 만든 argument를 그대로 신뢰하면 안 됩니다.

### 5. tool 결과를 다시 context에 넣어 답변한다

Tool이 실행되면 결과가 다시 모델 context에 들어가 최종 답변을 만들 수 있습니다. 이때도 결과 전체를 무조건 넣지 않습니다. 필요한 field만 넣고, 민감한 정보는 제거하거나 요약합니다. 예를 들어 주문 상태 답변에는 order id와 status는 필요할 수 있지만 내부 결제 token은 필요하지 않습니다.

Tool 결과를 답변에 넣을 때는 source와 action boundary를 설명할 수 있어야 합니다. "검색한 문서에 따르면", "주문 시스템에서 확인한 결과"처럼 사용자가 답변 근거를 이해할 수 있게 해야 합니다. 챗봇이 외부 시스템을 호출했다면 audit log나 trace도 중요해집니다.

### 6. agent가 필요한지 판단한다

OpenAI Agents SDK 문맥에서 agents는 plan하고 tools를 call하는 application입니다. Anthropic의 building effective agents 관점에서도 agent는 자신의 process와 tool usage를 동적으로 지시할 수 있습니다. 그러나 이 능력은 강력한 만큼 통제와 검증이 필요합니다.

단순 Q&A 챗봇은 retrieval과 conversation state만으로 충분할 수 있습니다. 사용자의 요청이 여러 단계의 계획, 조건부 tool 사용, 결과에 따른 다음 행동을 요구한다면 agent 구조가 필요할 수 있습니다. 예를 들어 "이번 주 실패한 workflow를 찾아 원인별로 묶고 재실행 후보를 제안해줘"는 search, query, analysis, maybe action까지 이어질 수 있습니다. 하지만 "RAG가 뭐야?"라는 질문에는 agent가 필요하지 않습니다.

```ts
type ChatMessage = {
  role: "user" | "assistant" | "system"
  content: string
}

type RetrievedChunk = {
  title: string
  content: string
}

function buildChatContext(history: ChatMessage[], retrieved: RetrievedChunk[]): ChatMessage[] {
  const recentHistory = history.slice(-6)
  const retrievalContext = retrieved
    .map((chunk) => `Source: ${chunk.title}\n${chunk.content}`)
    .join("\n\n")

  return [
    {
      role: "system",
      content: "답변은 제공된 conversation history와 retrieval context에 근거해 작성한다.",
    },
    ...recentHistory,
    {
      role: "system",
      content: `Retrieval context:\n${retrievalContext}`,
    },
  ]
}

const context = buildChatContext(
  [{ role: "user", content: "RAG가 뭐야?" }],
  [{ title: "rag-fundamentals", content: "RAG는 retrieval 결과를 생성 context에 연결한다." }],
)

console.log(context)
```

이 예시는 모든 history를 넣지 않고 최근 history와 retrieval context를 조립하는 사고방식을 보여줍니다. 실제 프로덕션에서는 token budget, privacy, source ranking, user permission을 더 엄격히 다뤄야 합니다.

> [!KEY]
> 챗봇의 핵심 구조는 message → state 조립 → retrieval 선택 → model response 또는 tool call → tool 결과 반영 → 최종 답변입니다. 이 흐름을 설명하지 못하면 채팅 UI가 있어도 시스템을 이해한 것이 아닙니다.

## 스펙과 세부

### Stateless request는 애플리케이션 state를 요구한다

각 text generation request가 독립적이고 stateless일 수 있다는 점은 챗봇 설계의 출발점입니다. 모델은 이전 turn을 자동으로 영구 기억하지 않습니다. 애플리케이션이 conversation id를 관리하고, message history를 저장하고, 필요한 부분을 요청에 포함해야 합니다.

이 구조는 장점도 있습니다. 애플리케이션이 어떤 정보를 넣을지 통제할 수 있고, privacy나 비용을 관리할 수 있습니다. 단점은 설계 책임이 커진다는 것입니다. History를 너무 적게 넣으면 맥락이 끊기고, 너무 많이 넣으면 context가 복잡해지고 비용이 늘어납니다.

### Retrieval은 semantic search와 context selection이다

Retrieval은 단순 keyword search보다 넓게 semantic search를 포함합니다. 사용자의 질문과 의미가 가까운 문서 조각을 찾고, 그것을 답변 context에 넣습니다. 하지만 검색 결과를 많이 넣는 것이 항상 좋지는 않습니다. Context가 finite resource이기 때문입니다. 관련도, 최신성, 사용자 권한, 중복 제거가 필요합니다.

교재 챗봇에서는 lesson markdown, glossary, KB source를 retrieval 대상 후보로 둘 수 있습니다. 다만 이 강의의 KB 범위에서는 구체적 구현보다 retrieval answer loop의 원리를 이해하는 것이 중요합니다. 질문을 바로 모델에게 보내지 않고, 관련 지식을 찾고, 그 지식이 답변 근거가 되게 만드는 흐름입니다.

### Tool calling은 요청과 실행의 분리다

Function calling에서 모델은 external systems and access data와 인터페이스하기 위해 tool call을 요청할 수 있습니다. 그러나 실제 system call은 애플리케이션의 권한입니다. Tool schema는 어떤 argument가 가능한지 제한하고, 애플리케이션은 session과 authorization을 확인합니다.

이 분리가 없으면 챗봇은 위험합니다. 사용자가 자연어로 "다른 사용자의 주문도 보여줘"라고 했을 때 모델이 tool call을 만들 수 있어도, 애플리케이션은 authorization을 통과하지 못하게 해야 합니다. Tool boundary는 AI 시스템 설계에서 backend 보안과 직접 연결됩니다.

### Agent는 자동화 수준의 선택이다

Agent는 plan하고 tools를 call하는 application으로 확장될 수 있습니다. 그러나 agent가 많다고 좋은 시스템은 아닙니다. Workflow가 predefined code path로 충분하면 workflow가 더 예측 가능할 수 있습니다. Agent는 동적으로 process와 tool usage를 결정해야 할 때 적합하지만, 그만큼 관찰성, 권한, 실패 복구가 더 중요합니다.

챗봇 프로젝트에서는 먼저 Q&A, retrieval, tool calling을 분리하고, 그 뒤 agent가 필요한 요구사항이 있는지 판단합니다. 이 순서를 지키면 불필요하게 복잡한 agent를 만들지 않게 됩니다.

## 원문으로 읽기

> "preserving information across multiple messages or turns"
>
> — 여러 message나 turn에 걸쳐 정보를 보존한다.
> [OpenAI Docs — Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)

이 문장은 conversation state의 목적을 보여줍니다. 챗봇은 한 번의 질문만 처리하는 것이 아니라 대화의 흐름을 이어갑니다. 그러나 이 보존은 애플리케이션의 설계 대상입니다. 무엇을 저장하고 무엇을 다시 넣을지 결정해야 합니다.

> "each text generation request is independent and stateless"
>
> — 각 text generation request는 독립적이고 stateless이다.
> [OpenAI Docs — Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)

이 문장은 챗봇 초보자가 반드시 이해해야 하는 경계입니다. 모델이 모든 이전 대화를 알아서 기억한다고 생각하면 안 됩니다. 애플리케이션이 history, summary, retrieval context를 조립해 요청에 포함해야 합니다.

> "perform semantic search over your data"
>
> — 자신의 data에 대해 semantic search를 수행한다.
> [OpenAI Docs — Retrieval](https://developers.openai.com/api/docs/guides/retrieval)

이 문장은 RAG 기반 챗봇의 검색 단계를 설명합니다. 모델에게 모든 지식을 암기시키는 대신, 사용자의 질문과 관련된 data를 찾아 context에 공급합니다. 교재 챗봇에서는 lesson과 glossary가 retrieval source가 될 수 있습니다.

> "interface with external systems and access data"
>
> — 외부 시스템과 인터페이스하고 data에 접근한다.
> [OpenAI Docs — Function calling](https://developers.openai.com/api/docs/guides/function-calling)

이 문장은 tool calling의 힘과 위험을 동시에 보여줍니다. 챗봇이 외부 시스템과 data에 접근할 수 있다면, 권한과 validation이 필수입니다. 모델이 요청한 tool call과 실제 실행은 분리되어야 합니다.

## 실전에서

### 챗봇 설계 packet

AI 챗봇 프로젝트를 시작할 때는 다음 packet을 먼저 씁니다. 이 문서는 프론트엔드 UI보다 먼저 정해야 할 시스템 경계를 담습니다.

```text
AI Chatbot Project Packet

Conversation state:
- conversation_id 기준 message 저장
- 최근 6개 turn은 그대로 포함
- 오래된 대화는 summary 후보

Retrieval:
- source: lesson markdown, glossary, KB summary
- question별 semantic search 수행
- 사용자 권한이 없는 source는 context에 넣지 않음

Tool boundary:
- 모델은 getLesson, searchGlossary tool call을 요청할 수 있음
- 애플리케이션은 tool args와 user permission을 검증한 뒤 실행
- tool result에서 민감한 field는 제거

Agent decision:
- 단순 Q&A는 agent 사용 안 함
- 여러 tool을 계획적으로 써야 하는 작업만 agent 후보
```

이 packet이 있으면 AI에게 "챗봇 만들어줘"라고만 하지 않아도 됩니다. 어떤 state를 저장하고, 어떤 source를 검색하고, 어떤 tool을 허용하고, agent가 필요한 경계를 명확히 줄 수 있습니다.

### Tool boundary 예시

```ts
type ToolCall = {
  name: "searchLessons"
  arguments: {
    query: string
    limit: number
  }
}

type User = {
  id: string
  canSearchPrivateLessons: boolean
}

function validateToolCall(user: User, call: ToolCall): ToolCall {
  const limit = Math.min(Math.max(call.arguments.limit, 1), 5)

  if (!user.canSearchPrivateLessons && call.arguments.query.includes("private")) {
    throw new Error("not authorized")
  }

  return {
    name: call.name,
    arguments: {
      query: call.arguments.query,
      limit,
    },
  }
}
```

이 예시는 모델이 만든 tool argument를 그대로 실행하지 않는다는 원칙을 보여줍니다. Limit을 제한하고, 사용자 권한과 query를 확인합니다. 실제 서비스에서는 더 엄격한 schema validation과 audit log가 필요합니다.

### 응답에는 근거와 한계를 남긴다

RAG 챗봇은 답변에 근거 source를 남길 수 있어야 합니다. "문서에서 찾은 내용에 따르면"처럼 검색 결과를 연결하고, 검색 결과가 부족하면 모른다고 말해야 합니다. Context가 finite resource이므로 모든 문서를 넣을 수 없다는 한계도 설계에 반영해야 합니다.

## 한계와 트레이드오프

AI 챗봇 프로젝트의 첫 한계는 context입니다. Context is finite라는 사실은 모든 설계에 영향을 줍니다. 오래된 대화를 모두 넣으면 비용과 noise가 늘고, 너무 적게 넣으면 사용자가 기대한 연속성이 사라집니다. Summary, recent turns, retrieval result를 조합하는 이유가 여기에 있습니다.

두 번째 한계는 retrieval 품질입니다. Semantic search가 관련 없는 문서를 가져오면 모델은 그 문서에 근거해 틀린 답을 할 수 있습니다. 검색 결과가 없을 때 억지로 답하지 않게 만드는 정책도 필요합니다. RAG는 hallucination을 줄이는 구조이지만, retrieval 자체가 틀리면 답변도 흔들립니다.

세 번째 한계는 tool calling의 안전성입니다. Tool은 외부 시스템과 data에 접근하므로 권한과 validation이 없으면 위험합니다. 특히 사용자별 data를 다루는 SaaS 챗봇에서는 tool boundary가 backend authorization과 동일하게 중요합니다.

네 번째 한계는 agent 과잉입니다. Agent는 plan과 tool use를 동적으로 처리할 수 있지만, 모든 챗봇을 agent로 만들면 복잡성과 실패 가능성이 커집니다. 단순 Q&A는 retrieval chatbot으로 충분할 수 있습니다. 여러 단계의 목표와 tool orchestration이 필요할 때 agent를 검토합니다.

> [!WARNING]
> 챗봇이 "기억한다"는 표현은 UX 관점의 말입니다. 시스템 관점에서는 애플리케이션이 어떤 conversation state를 저장하고 현재 요청에 다시 넣는지 설명해야 합니다.

## 더 읽기

먼저 OpenAI Conversation State 문서로 stateless request와 state preservation의 관계를 읽습니다. 그다음 OpenAI Retrieval 문서로 semantic search 기반 context 공급을 이해하고, Function Calling 문서로 tool call request와 실제 실행 경계를 확인합니다. Agents SDK 문서는 agent가 plan하고 tools를 call하는 application이라는 확장 방향으로 읽으면 됩니다. Anthropic Effective Context Engineering 문서는 context가 critical but finite resource라는 관점으로 함께 읽습니다.

- [OpenAI Docs — Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)
- [OpenAI Docs — Retrieval](https://developers.openai.com/api/docs/guides/retrieval)
- [OpenAI Docs — Function calling](https://developers.openai.com/api/docs/guides/function-calling)
- [OpenAI Docs — Agents SDK](https://developers.openai.com/api/docs/guides/agents)
- [Anthropic Engineering — Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

함께 읽을 내부 강의는 `rag-fundamentals`, `tool-calling-basics`, `context-engineering-basics`, `agent-loop`입니다. 다음 프로젝트 교재인 `automation-workflow-project`에서는 챗봇의 tool 경계를 workflow와 agent orchestration 차이로 확장합니다.
