---
id: context-engineering
title: "Context Engineering (컨텍스트 엔지니어링)"
topicGroup: T10
status: approved
score: 91
level: 중급
prerequisites: []
successors: [agent-loop, tool-calling, rag]
related: [agent-loop, tool-calling, mcp, rag]
consumers:
  lessons: [context-engineering-basics, context-window-and-memory, system-prompts-and-instruction-layers]
  glossary: [Context Window, System Prompt]
sources:
  - { title: "Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", checked: 2026-07-05 }
  - { title: "Context windows", url: "https://platform.claude.com/docs/en/build-with-claude/context-windows", checked: 2026-07-05 }
  - { title: "How the agent loop works", url: "https://code.claude.com/docs/en/agent-sdk/agent-loop", checked: 2026-07-05 }
  - { title: "Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Context Engineering은 모델 추론 시점에 들어갈 정보 묶음을 설계·선별·유지하는 작업이다. Anthropic은 context engineering을 프롬프트뿐 아니라 시스템 지시, 도구, MCP, 외부 데이터, 메시지 이력 등 추론 시점에 들어가는 토큰 전체를 관리하는 전략으로 설명한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 역사
Anthropic은 2025년 9월 29일 "Effective context engineering for AI agents"에서 context engineering을 prompt engineering의 자연스러운 확장으로 설명했다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
이 용어는 장기 실행 에이전트가 여러 턴 동안 시스템 지시, 도구 결과, 외부 데이터, 대화 이력을 누적하면서 단일 프롬프트 작성만으로는 원하는 동작을 안정적으로 만들기 어려운 문제를 배경으로 등장했다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 해결하려는 문제
컨텍스트 창은 모델이 응답을 만들 때 참조할 수 있는 작업 메모리이며, 대화가 길어질수록 시스템 프롬프트, 메시지, 도구 결과, 이미지, 문서, 도구 정의가 모두 창을 차지한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
Anthropic은 토큰 수가 늘어날수록 정확도와 회상이 떨어지는 현상을 "context rot"으로 설명하며, 컨텍스트를 많이 넣는 것보다 필요한 정보를 선별하는 일이 중요하다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
장기 실행 에이전트는 도구 호출과 중간 결과를 반복해 더 많은 정보를 만들기 때문에, 매 턴마다 어떤 정보를 유지하고 어떤 정보를 줄일지 결정해야 한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 핵심 개념
1. 컨텍스트는 모델이 샘플링할 때 포함되는 토큰 집합이다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
2. 시스템 프롬프트는 원하는 행동을 분명히 제시하되 brittle한 조건문 목록이나 모호한 일반론을 피해야 한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
3. 도구 정의는 에이전트와 정보·행동 공간 사이의 계약이며, 도구는 명확하고 겹침이 적어야 한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
4. 예시는 많은 예외를 나열하는 방식보다 대표적인 행동 패턴을 보여주는 방식으로 선별해야 한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
5. 장기 세션에서는 대화 이력과 도구 결과가 누적되므로 compaction, context editing, 상태 산출물 같은 관리 전략이 필요하다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
6. Claude Agent SDK 문서는 도구 정의, 대화 이력, 도구 입력·출력, 스킬 설명이 컨텍스트를 소비한다고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 관련 기술
- Prompt Engineering vs Context Engineering: prompt engineering은 지시 작성에 초점이 있고, context engineering은 추론 시점의 전체 정보 상태를 관리한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
- RAG vs Context Engineering: RAG는 외부 문서를 검색해 프롬프트에 넣는 기술이고, context engineering은 검색 결과를 포함해 무엇을 컨텍스트에 넣을지 결정하는 상위 설계 문제다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
- MCP vs Context Engineering: MCP는 외부 데이터·도구·프롬프트를 연결하는 표준이고, context engineering은 MCP로 얻은 정보까지 포함해 토큰 상태를 관리한다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)
- Agent Loop vs Context Engineering: agent loop는 평가·도구 실행·반복의 실행 흐름이고, context engineering은 그 루프의 각 턴에 공급되는 정보 품질을 다룬다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 선행 개념
frontmatter prerequisites가 비어 있다. 이 개념은 T10 모듈의 상위 설계 개념으로 사용된다. (출처: ai-ops/MASTER_PROGRESS.md, 확인: 2026-07-05)

## 후행 개념
- agent-loop: 루프가 길어질수록 컨텍스트 누적과 compaction이 핵심 운영 문제가 된다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
- tool-calling: 도구 정의와 도구 결과는 컨텍스트를 차지하므로 도구 설계가 컨텍스트 설계와 연결된다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
- rag: 검색 결과를 얼마나, 어떤 형태로 넣을지 결정하는 일이 context engineering의 일부가 된다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 context engineering은 "AI에게 더 길게 설명하기"가 아니라 목표, 제약, 파일, 로그, 검증 기준, 도구 결과를 매 작업 턴에 맞게 정리하는 일이다. Anthropic은 좋은 컨텍스트가 가능한 한 작고 신호가 높아야 한다고 설명한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
코드 에이전트 작업에서는 큰 로그나 파일 전체를 계속 넣으면 컨텍스트가 빠르게 커지므로, 산출물·체크리스트·요약 상태로 회복 가능한 작업 상태를 남기는 방식이 필요하다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 실무 활용
1. 장기 리팩터링 세션: 현재 목표, 수정 파일, 테스트 결과, 남은 위험을 작은 상태 문서로 유지하고 오래된 로그는 요약한다. (근거: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
2. 도구 많은 에이전트: 모든 도구를 한 번에 넣지 않고 현재 작업에 필요한 도구만 노출해 도구 정의가 차지하는 컨텍스트를 줄인다. (근거: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
3. RAG 기반 교재 사이트: 검색 결과를 그대로 붙이지 않고 출처, 핵심 주장, 사용 섹션을 분리해 강의 생성 컨텍스트로 전달한다. (근거: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

```ts
type ContextPacket = {
  goal: string
  constraints: string[]
  evidence: Array<{ claim: string; sourceUrl: string }>
  nextAction: string
}
```

## FAQ
Q: Context Engineering은 Prompt Engineering과 같은가?
A: 아니다. Anthropic은 prompt engineering을 지시 작성 중심으로, context engineering을 추론 시점의 전체 정보 상태 관리로 구분한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

Q: 컨텍스트는 길수록 좋은가?
A: 아니다. Anthropic 문서는 더 큰 컨텍스트가 자동으로 더 좋은 결과를 뜻하지 않으며 토큰 증가가 정확도와 회상을 떨어뜨릴 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

Q: RAG를 쓰면 context engineering이 필요 없어지는가?
A: 아니다. RAG는 검색된 정보를 가져오는 방법이고, context engineering은 검색 결과를 포함해 어떤 정보를 넣을지 관리하는 작업이다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: 모든 파일과 로그를 한 번에 넣는다. 왜 생기나: 컨텍스트를 "많을수록 안전한 자료"로 오해한다. 교정: high-signal 토큰을 선별하고 오래된 내용은 요약한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
2. 실수: 도구 설명을 겹치게 만든다. 왜 생기나: 기능 단위로만 도구를 늘린다. 교정: 모델이 언제 어떤 도구를 써야 하는지 명확히 구분한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)
3. 실수: 초기 프롬프트 한 번으로 장기 작업을 끝내려 한다. 왜 생기나: 에이전트 루프에서 정보가 매 턴 누적된다는 점을 놓친다. 교정: compaction과 상태 산출물을 설계한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 공식 출처
- Context engineering은 추론 시점의 토큰 전체를 관리하는 전략이다 — [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
- 컨텍스트 창에는 시스템 프롬프트, 메시지, 도구 결과, 문서, 도구 정의가 포함된다 — [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (확인: 2026-07-05)
- Claude Agent SDK의 루프에서는 도구 정의, 대화 이력, 도구 입력·출력이 컨텍스트를 소비한다 — [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
- agentic systems는 복잡도를 늘리기 전에 단순한 솔루션을 우선 검토해야 한다 — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)

## Quote Bank
- > "Context is a critical but finite resource for AI agents."
  - 출처: [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
  - 맥락: 컨텍스트를 무한한 입력 공간이 아니라 제한된 자원으로 설명할 때 사용한다.
- > "Context refers to the set of tokens included when sampling"
  - 출처: [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
  - 맥락: 컨텍스트의 기술적 범위를 토큰 집합으로 정의할 때 사용한다.
- > "Context engineering refers to the set of strategies"
  - 출처: [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
  - 맥락: 프롬프트 작성과 컨텍스트 설계를 구분하는 정의 문장에 사용한다.
- > "more context isn't automatically better"
  - 출처: [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (확인: 2026-07-05)
  - 맥락: 긴 컨텍스트가 항상 더 좋은 답을 만들지 않는다는 오개념을 교정할 때 사용한다.
- > "finding the smallest possible set of high-signal tokens"
  - 출처: [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
  - 맥락: 컨텍스트 최적화의 실무 원칙을 설명할 때 사용한다.
- > "compaction, structured note-taking, and multi-agent architectures"
  - 출처: [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
  - 맥락: 장기 작업에서 컨텍스트 한계를 우회하는 대표 전략을 소개할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
