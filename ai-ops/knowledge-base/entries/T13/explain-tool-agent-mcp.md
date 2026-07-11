---
id: explain-tool-agent-mcp
title: "Tool·Agent·MCP 관계 설명 (Explaining Tool, Agent, MCP)"
topicGroup: T13
status: approved
score: 90
level: 중급
prerequisites: [tool-calling, agent-loop, mcp]
successors: []
related: [explain-context-rag, orchestration, harness]
consumers:
  lessons: [explain-tool-agent-mcp]
  glossary: [Tool Layer, Agent Loop Layer, MCP Protocol Layer]
sources:
  - { title: "Anthropic — Tool use with Claude", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview", checked: 2026-07-12 }
  - { title: "Anthropic — Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", checked: 2026-07-12 }
  - { title: "MCP — Tools specification (2025-11-25)", url: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools", checked: 2026-07-12 }
  - { title: "MCP — Architecture", url: "https://modelcontextprotocol.io/specification/2025-11-25/architecture", checked: 2026-07-12 }
---

> 소싱 방법: 본 KB는 explanation-practice 모듈의 비교 설명(reference) 강의를 위한 근거로, 승인 KB `tool-calling`·`agent-loop`·`mcp`(T09/T10)가 세션 내 fetch로 원문 대조한 Anthropic·MCP 공식 문서의 verbatim 인용을 동일 출처 기준으로 재활용한다(2026-07-12 재확인). 신규 사실 없이 세 개념을 "층 관계로 설명하는 순서"로 재구성한다.

## 정의
Tool·Agent·MCP 관계 설명은 자주 뒤섞이는 세 개념 — 도구 호출(tool calling), 에이전트 루프(agent loop), MCP 프로토콜 — 이 각각 다른 층에 있음을 남이 이해하도록 정리하는 스킬이다. Anthropic은 tool use를 "Tool use lets Claude call functions"라 하고, 에이전트를 "dynamically direct their own processes"하는 시스템으로 설명하며, MCP는 서버가 "allows servers to expose tools"하는 프로토콜이다. ==핵심은 셋이 경쟁이 아니라 층 관계 — MCP는 도구를 노출하는 표준, tool calling은 모델이 도구를 부르는 행위, agent는 그 행위를 반복하는 루프==라는 점이다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, https://www.anthropic.com/engineering/building-effective-agents, https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-12)

## 역사
세 개념은 시기가 다르게 자리잡았다. 먼저 도구 호출이 "모델이 함수를 부르는" 방식으로 정립됐다 — Anthropic은 "Claude determines when to call a tool"이라 설명한다. 다음으로 이 호출을 반복하며 스스로 진행하는 에이전트 루프가 나왔다. 마지막으로 도구를 서버가 표준 방식으로 노출하는 MCP가 등장해, 각 도구를 앱마다 새로 붙이지 않아도 되게 했다. 셋을 함께 설명하려면 이 층 구분 — 노출(MCP) / 호출(tool) / 반복(agent) — 을 잡아야 한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-12)

## 해결하려는 문제
초보자는 "MCP가 에이전트냐", "tool calling이 곧 agent냐"처럼 층을 뒤섞는다. 이 혼동은 설계 판단을 흐린다. 예를 들어 "에이전트를 만들려면 MCP가 필요한가?"라는 질문은 층을 구분하면 쉽게 답할 수 있다 — 아니다, MCP는 도구 노출 표준일 뿐이고 에이전트 루프는 그것 없이도 만들 수 있다. 비교 설명은 이 층 구분으로 설계 질문을 명확하게 만든다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)

## 핵심 개념
1. **Tool calling = 모델이 함수를 부르는 행위**: "Tool use lets Claude call functions." 모델이 자연어 대신 "returns a structured call"로 도구를 호출한다. 이것은 한 번의 행위다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-12)
2. **모델이 호출 시점을 정한다**: "Claude determines when to call a tool." 도구를 부를지 말지는 모델의 판단이다 — 이것이 tool calling의 핵심 성질이다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-12)
3. **Agent = 호출을 반복하는 자율 루프**: Anthropic은 에이전트를 "dynamically direct their own processes"하는 시스템으로 설명한다. agent는 tool calling을 여러 번, 스스로 방향을 정하며 반복한다 — tool calling의 상위 층이다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
4. **MCP = 도구를 노출하는 표준 프로토콜**: MCP는 "allows servers to expose tools"하고 "Tools enable models to interact with external systems"다. MCP는 도구를 표준 방식으로 제공하는 층 — 호출도 반복도 아니다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-12)
5. **MCP 도구는 model-controlled**: MCP tool은 "designed to be model-controlled"다. 즉 모델이 호출을 주도하되, MCP 아키텍처는 "maintaining clear security boundaries"로 host-client-server를 분리해 안전 경계를 둔다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-12)
6. **층 관계 요약**: MCP(노출) → tool calling(호출) → agent(반복). 아래 층 없이 위 층만 쓸 수도 있다 — MCP 없이도 tool calling 가능, tool calling 없이도 단일 응답 가능. (근거: tool-calling·agent-loop·mcp KB, 확인: 2026-07-12)

## 관련 기술
- explain-tool-agent-mcp ↔ explain-context-rag: 둘 다 자주 혼동되는 개념 쌍을 층으로 구분하는 비교 설명이다. (근거: explain-context-rag KB, 확인: 2026-07-12)
- explain-tool-agent-mcp ↔ orchestration: 여러 에이전트·도구를 조율하는 상위 설계로 이어진다. (근거: orchestration KB, 확인: 2026-07-12)
- explain-tool-agent-mcp ↔ harness: 에이전트 루프를 실제로 실행하는 하네스 환경과 연결된다. (근거: harness KB, 확인: 2026-07-12)

## 선행 개념
- tool-calling: 모델이 함수를 부르는 행위.
- agent-loop: 호출을 반복하는 자율 루프.
- mcp: 도구를 노출하는 표준 프로토콜.

## 후행 개념
- explain-vibe-coding-history: 개념·도구의 흐름을 역사로 설명하는 다음 레퍼런스.

## AI 시대에서의 의미
"에이전트 만들려면 MCP 써야 하나요?"는 층을 뒤섞은 질문이다. 비교 설명은 이를 정리한다: ==MCP는 도구를 노출하는 표준, tool calling은 모델이 도구를 부르는 행위, agent는 그 행위를 반복하는 루프이며, 아래 층 없이 위 층만 쓸 수도 있다==. 이 층 구분을 정확히 설명할 수 있으면, 어떤 문제에 무엇이 필요한지(표준 노출이 필요한가, 단발 호출이면 되는가, 자율 반복이 필요한가) 판단할 수 있다. (출처: https://www.anthropic.com/engineering/building-effective-agents, https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-12)

## 실무 활용
1. **층으로 먼저 그린다**: "MCP=노출, tool=호출, agent=반복"으로 세 층을 구분해 시작한다. (근거: 세 KB, 확인: 2026-07-12)
2. **설계 질문을 층으로 답한다**: "MCP 필요?"→도구 표준 노출이 필요할 때만. "agent 필요?"→자율 반복이 필요할 때만. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
3. **security boundary 언급**: MCP를 설명할 때 "maintaining clear security boundaries"의 host-client-server 분리를 함께 말한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-12)
4. **model-controlled 강조**: MCP tool 호출은 모델 주도이되 사용자 승인 경계가 있음을 설명한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-12)

## FAQ
Q: 에이전트를 만들려면 MCP가 필요한가?
A: 아니다. MCP는 도구를 표준 방식으로 노출하는 층이고, 에이전트 루프는 MCP 없이도 만들 수 있다. 층이 다르다. (근거: agent-loop·mcp KB, 확인: 2026-07-12)
Q: tool calling과 agent의 차이는?
A: tool calling은 모델이 도구를 부르는 한 번의 행위, agent는 그 호출을 스스로 방향을 정하며 반복하는 루프다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
Q: MCP tool은 누가 호출하나?
A: "designed to be model-controlled" — 모델이 호출을 주도하되, 아키텍처가 security boundary로 안전 경계를 둔다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-12)

## 자주 하는 실수
1. **MCP를 에이전트와 동일시**: MCP는 노출 표준, agent는 반복 루프다. 층을 구분한다. (근거: agent-loop·mcp KB, 확인: 2026-07-12)
2. **tool calling을 agent로 착각**: 단발 호출과 자율 반복은 다르다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
3. **security boundary 누락**: MCP 설명에서 host-client-server 분리를 빠뜨린다. 함께 말한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-12)

## 공식 출처
- tool use = 모델이 함수를 부름, 호출 시점은 모델이 결정 — [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (확인: 2026-07-12)
- agent = 스스로 프로세스를 주도하는 시스템 — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-12)
- MCP = 서버가 도구를 노출, model-controlled — [MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) (확인: 2026-07-12)
- MCP 아키텍처 = 명확한 보안 경계 — [MCP Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture) (확인: 2026-07-12)

## Quote Bank
- > "Tool use lets Claude call functions"
  - 출처: [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (확인: 2026-07-12)
  - 맥락: tool calling을 모델-함수 연결 행위로 정의할 때 사용한다.
- > "Claude determines when to call a tool"
  - 출처: [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (확인: 2026-07-12)
  - 맥락: 호출 시점을 모델이 정한다는 성질을 설명할 때 사용한다.
- > "dynamically direct their own processes"
  - 출처: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-12)
  - 맥락: agent가 스스로 방향을 정하는 반복 루프임을 설명할 때 사용한다.
- > "allows servers to expose tools"
  - 출처: [MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) (확인: 2026-07-12)
  - 맥락: MCP가 도구를 노출하는 표준 층임을 설명할 때 사용한다.
- > "designed to be model-controlled"
  - 출처: [MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) (확인: 2026-07-12)
  - 맥락: MCP tool 호출 주체와 승인 경계를 설명할 때 사용한다.
- > "maintaining clear security boundaries"
  - 출처: [MCP Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture) (확인: 2026-07-12)
  - 맥락: MCP의 host-client-server 분리 이유를 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Fable — 대행, P-01/P-02). tool-calling·agent-loop·mcp 승인 KB의 Anthropic·MCP verbatim 인용 재활용, Score 90.
