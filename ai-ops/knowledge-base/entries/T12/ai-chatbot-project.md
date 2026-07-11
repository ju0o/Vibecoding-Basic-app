---
id: ai-chatbot-project
title: "AI 챗봇 프로젝트 (AI Chatbot Project)"
topicGroup: T12
status: draft
score: null
level: 중급
prerequisites: [rag, context-engineering, tool-calling]
successors: [private-ai-learning-site-project]
related: [context-caching, mcp, grounding-citations]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "OpenAI Docs — Conversation state", url: "https://developers.openai.com/api/docs/guides/conversation-state", checked: 2026-07-12 }
  - { title: "OpenAI Docs — Function calling", url: "https://developers.openai.com/api/docs/guides/function-calling", checked: 2026-07-12 }
  - { title: "OpenAI Docs — Retrieval", url: "https://developers.openai.com/api/docs/guides/retrieval", checked: 2026-07-12 }
  - { title: "OpenAI Docs — Agents SDK", url: "https://developers.openai.com/api/docs/guides/agents", checked: 2026-07-12 }
  - { title: "Anthropic Engineering — Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
AI 챗봇 프로젝트는 대화 상태, 지식 검색, 도구 호출, 안전한 컨텍스트 구성을 결합해 사용자의 질문에 답하고 필요한 작업을 수행하는 웹 애플리케이션 실습이다. OpenAI conversation state 문서는 multiple messages or turns across a conversation에서 정보를 보존하는 것이 중요하다고 설명하고, Retrieval 문서는 semantic search over your data를 제공한다고 설명한다. 챗봇 프로젝트의 핵심은 "말풍선 UI"가 아니라 state, retrieval, tool boundary다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-12)

## 역사
초기 챗봇은 단일 prompt-response에 가까웠지만, 제품형 챗봇은 대화 맥락을 유지하고, 외부 지식을 검색하고, 함수나 도구로 행동해야 한다. OpenAI function calling 문서는 models가 external systems와 interface하고 training data 밖의 data에 접근하게 한다고 설명한다. Agents SDK 문서는 agents를 plan, call tools, collaborate, keep enough state를 하는 applications로 설명한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, https://developers.openai.com/api/docs/guides/agents, 확인: 2026-07-12)

## 해결하려는 문제
초보자는 챗봇을 "API를 호출해 답변을 보여주는 UI"로만 생각한다. 그러면 이전 대화가 사라지고, 최신 문서를 모른 채 답하며, 실제 작업은 못 하고, 긴 대화에서 관련 없는 context가 쌓인다. OpenAI는 each text generation request가 independent and stateless라고 설명하면서도 conversation state 관리 방법을 제시한다. Anthropic은 context가 finite resource이며 high-signal tokens를 선별해야 한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)

## 핵심 개념
1. **Conversation state**: OpenAI는 conversation state가 multiple messages or turns across a conversation에서 정보를 보존하는 데 중요하다고 설명한다. 챗봇은 history, summary, user profile, task state를 구분해야 한다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, 확인: 2026-07-12)
2. **Stateless request boundary**: OpenAI는 each text generation request가 independent and stateless라고 설명한다. 따라서 past messages나 previous response id, conversation object를 명시적으로 다뤄야 한다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, 확인: 2026-07-12)
3. **Retrieval**: OpenAI Retrieval API는 semantic search over your data를 수행하고 vector stores가 indices 역할을 한다고 설명한다. 문서 기반 답변에는 검색 대상과 citation 정책이 필요하다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-12)
4. **Function calling**: OpenAI는 function calling이 models를 external systems와 interface하게 하는 방법이라고 설명한다. 챗봇이 예약, 저장, 조회, 계산을 하려면 tool schema와 execution boundary가 필요하다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-12)
5. **Context engineering**: Anthropic은 context를 finite resource로 보고 high-signal tokens를 찾는 전략을 강조한다. 챗봇은 모든 history와 모든 검색 결과를 넣는 것이 아니라 task에 필요한 context packet을 구성해야 한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)
6. **Agent escalation**: OpenAI Agents SDK는 agents가 tools를 call하고 state를 유지해 multi-step work를 끝낸다고 설명한다. 단순 Q&A 챗봇이 충분하지 않을 때만 agent loop로 확장한다. (출처: https://developers.openai.com/api/docs/guides/agents, 확인: 2026-07-12)

## 관련 기술
- rag: 챗봇이 외부 문서와 최신 지식을 검색해 답변 근거로 사용한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-12)
- context-engineering: 검색 결과, 대화 이력, 지시를 작은 high-signal context로 구성한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)
- tool-calling: 챗봇이 앱 기능을 호출하려면 function schema와 tool result 주입이 필요하다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-12)

## 선행 개념
- rag: 문서 기반 답변을 위해 retrieval과 vector store 개념이 필요하다.
- context-engineering: 대화와 검색 결과를 어떻게 넣을지 설계해야 한다.
- tool-calling: 챗봇이 외부 행동을 하려면 도구 호출 구조가 필요하다.

## 후행 개념
- private-ai-learning-site-project: 이 사이트의 KB와 강의를 챗봇 컨텍스트로 연결하는 최종 프로젝트로 이어진다.

## AI 시대에서의 의미
바이브코딩에서 AI 챗봇 프로젝트는 "채팅 UI를 붙이는 법"을 넘어, AI 시스템 설계 개념을 한곳에 묶는 실전이다. context engineering은 입력 품질을 관리하고, retrieval은 외부 지식을 연결하며, function calling은 행동 경계를 만들고, conversation state는 여러 턴의 연속성을 유지한다. 이 네 가지가 빠지면 챗봇은 그럴듯하지만 제품이 아니다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, https://developers.openai.com/api/docs/guides/retrieval, https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-12)

## 실무 활용
1. **Q&A 챗봇**: FAQ나 교재 KB를 vector store에 넣고 semantic search로 관련 근거를 찾는다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-12)
2. **작업 챗봇**: 일정 생성, 데이터 조회, 티켓 업데이트 같은 기능을 function calling으로 연결한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-12)
3. **학습 튜터**: 이전 대화 state와 현재 lesson context를 분리해 학습자의 이해도를 이어간다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, 확인: 2026-07-12)
4. **Agent 확장**: 여러 단계의 조사, 도구 호출, 승인 흐름이 필요할 때 Agents SDK나 직접 loop로 확장한다. (출처: https://developers.openai.com/api/docs/guides/agents, 확인: 2026-07-12)

```ts
type ChatbotContext = {
  userMessage: string
  conversationSummary: string
  retrievedEvidence: Array<{ title: string; url: string; quote: string }>
  toolsAvailable: Array<{ name: string; purpose: string }>
  safetyConstraints: string[]
}
```

## FAQ
Q: 챗봇은 매번 전체 대화 이력을 보내면 되는가?
A: 아니다. OpenAI는 request가 stateless라고 설명하지만, Anthropic은 context가 finite resource라고 설명한다. 필요한 history와 요약을 선별해야 한다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)

Q: RAG를 붙이면 답변이 항상 정확한가?
A: 아니다. Retrieval은 semantically similar results를 찾지만, 어떤 결과를 넣고 어떻게 citation할지 검토해야 한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-12)

Q: 모든 챗봇을 agent로 만들어야 하나?
A: 아니다. OpenAI Agents SDK는 multi-step work에 적합한 agent 구조를 제공하지만, 단순 Q&A는 retrieval과 single response flow로 충분할 수 있다. (출처: https://developers.openai.com/api/docs/guides/agents, 확인: 2026-07-12)

## 자주 하는 실수
1. **채팅 UI만 만들고 state를 잊음**: 이전 turn의 정보가 사라진다. 교정: conversation state 저장과 요약 방식을 정한다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, 확인: 2026-07-12)
2. **검색 결과를 전부 넣음**: context가 커지고 관련성이 떨어진다. 교정: high-signal tokens만 선별한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)
3. **도구 실행 경계 누락**: 모델이 tool call을 제안했을 때 앱이 어떤 검증 후 실행할지 정하지 않는다. 교정: function schema, permission, tool result handling을 명시한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-12)

## 공식 출처
- Multi-turn state — [OpenAI Docs — Conversation state](https://developers.openai.com/api/docs/guides/conversation-state) (확인 날짜: 2026-07-12)
- Tool/function boundary — [OpenAI Docs — Function calling](https://developers.openai.com/api/docs/guides/function-calling) (확인 날짜: 2026-07-12)
- Semantic retrieval and vector stores — [OpenAI Docs — Retrieval](https://developers.openai.com/api/docs/guides/retrieval) (확인 날짜: 2026-07-12)
- Agent escalation — [OpenAI Docs — Agents SDK](https://developers.openai.com/api/docs/guides/agents) (확인 날짜: 2026-07-12)
- Context resource management — [Anthropic Engineering — Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인 날짜: 2026-07-12)

## Quote Bank
- > "preserving information across multiple messages or turns"
  - 출처: [OpenAI Docs — Conversation state](https://developers.openai.com/api/docs/guides/conversation-state) (확인: 2026-07-12)
  - 맥락: 챗봇 state의 필요성을 설명할 때 사용한다.
- > "each text generation request is independent and stateless"
  - 출처: [OpenAI Docs — Conversation state](https://developers.openai.com/api/docs/guides/conversation-state) (확인: 2026-07-12)
  - 맥락: history를 명시적으로 관리해야 함을 설명할 때 사용한다.
- > "perform semantic search over your data"
  - 출처: [OpenAI Docs — Retrieval](https://developers.openai.com/api/docs/guides/retrieval) (확인: 2026-07-12)
  - 맥락: RAG 기반 챗봇의 검색 단계를 설명할 때 사용한다.
- > "interface with external systems and access data"
  - 출처: [OpenAI Docs — Function calling](https://developers.openai.com/api/docs/guides/function-calling) (확인: 2026-07-12)
  - 맥락: 챗봇 tool calling의 역할을 설명할 때 사용한다.
- > "Agents are applications that plan, call tools"
  - 출처: [OpenAI Docs — Agents SDK](https://developers.openai.com/api/docs/guides/agents) (확인: 2026-07-12)
  - 맥락: 단순 챗봇과 agent 확장을 구분할 때 사용한다.
- > "Context is a critical but finite resource"
  - 출처: [Anthropic Engineering — Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-12)
  - 맥락: 챗봇 context를 무한히 넣으면 안 됨을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
