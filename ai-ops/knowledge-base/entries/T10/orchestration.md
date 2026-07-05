---
id: orchestration
title: "Orchestration (에이전트 오케스트레이션)"
topicGroup: T10
status: approved
score: 89
level: 중급
prerequisites: [agent-loop, tool-calling]
successors: [harness]
related: [agent-loop, skills, mcp]
consumers:
  lessons: [multi-agent-orchestration]
  glossary: [Orchestration, Handoff, Agents as Tools, Orchestrator-Workers]
sources:
  - { title: "Orchestration and handoffs", url: "https://developers.openai.com/api/docs/guides/agents/orchestration", checked: 2026-07-05 }
  - { title: "Agent definitions", url: "https://developers.openai.com/api/docs/guides/agents/define-agents", checked: 2026-07-05 }
  - { title: "Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", checked: 2026-07-05 }
  - { title: "A practical guide to building AI agents", url: "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/", checked: 2026-07-05 }
  - { title: "How the agent loop works", url: "https://code.claude.com/docs/en/agent-sdk/agent-loop", checked: 2026-07-05 }
  - { title: "Agent Skills", url: "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview", checked: 2026-07-05 }
  - { title: "Sandbox Agents", url: "https://developers.openai.com/api/docs/guides/agents/sandboxes", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Orchestration은 여러 agent, tool, handoff, workflow 단계를 누가 소유하고 언제 넘길지 설계하는 조정 구조다. OpenAI Agents SDK 문서는 orchestration의 첫 설계 선택을 specialist가 대화 소유권을 넘겨받을지, manager가 specialist를 bounded capability로 호출할지 정하는 문제로 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)

## 역사
Anthropic은 2024년 12월 19일 "Building effective agents"에서 workflows와 agents를 구분했고, workflows는 predefined code paths로 LLM과 tools가 orchestrated되는 시스템이라고 설명했다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
OpenAI Agents SDK 문서는 multi-agent workflows에서 specialists가 job의 서로 다른 부분을 소유해야 할 때 orchestration이 유용하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)

## 해결하려는 문제
하나의 agent가 모든 도구, 지침, 정책, 출력 스타일을 동시에 가지면 prompt가 커지고 책임 경계가 흐려진다. OpenAI Agent definitions 문서는 specialist가 다른 tool, MCP surface, approval policy, guardrail, model, output style을 필요로 할 때 agent를 나눌 수 있다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/define-agents, 확인: 2026-07-05)
Orchestration은 specialist가 최종 답변을 소유할지, manager가 최종 답변 소유권을 유지할지를 명확히 해 대화와 실행의 책임을 나눈다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)

## 핵심 개념
1. Handoff는 specialist가 해당 branch의 다음 응답을 소유해야 할 때 사용하며 control이 specialist agent로 이동한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)
2. Agents as tools는 manager가 final answer의 책임을 유지하고 specialist를 bounded capability로 호출할 때 사용한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)
3. OpenAI는 routing surface를 읽기 쉽게 유지하기 위해 specialist job을 좁게 만들고, handoffDescription을 짧고 구체적으로 유지하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)
4. Anthropic의 orchestrator-workers workflow는 central LLM이 task를 동적으로 분해하고 worker LLMs에 위임한 뒤 결과를 합성하는 구조다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
5. OpenAI practical guide는 multi-agent systems를 manager pattern과 decentralized pattern으로 설명하고, manager pattern의 edge는 tool call, decentralized pattern의 edge는 handoff라고 설명한다. (출처: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/, 확인: 2026-07-05)

## 관련 기술
- Workflow vs Orchestration: workflow는 predefined path이고 orchestration은 여러 agent와 tool 사이의 ownership, routing, handoff를 설계하는 조정 문제다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
- Agent Loop vs Orchestration: agent loop는 한 agent의 반복 실행 구조이고, orchestration은 여러 agent loop 또는 specialist capability를 연결한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)
- Skills vs Orchestration: Skills는 specialist capability의 재사용 자료이고, orchestration은 어떤 agent가 어떤 capability를 언제 쓰거나 넘겨받는지 정한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)

## 선행 개념
- agent-loop: orchestration은 agent loop를 여러 specialist, handoff, tool-agent로 확장하므로 단일 loop의 평가·도구 호출·결과 반영 구조가 선행되어야 한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
- tool-calling: agents as tools와 handoffs는 tool surface 또는 handoff surface로 specialist를 호출하므로 tool calling 이해가 필요하다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)

## 후행 개념
- harness: orchestration은 handoff, approval, state, trace를 남기므로 실행 환경과 검증 장치인 harness 설계가 뒤따른다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 orchestration은 "AI 여러 개를 동시에 켠다"가 아니라 작업 소유권과 최종 답변 책임을 설계하는 일이다. OpenAI 문서는 multi-agent workflow의 첫 선택이 각 branch의 final user-facing answer 소유자를 정하는 것이라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)
코드 작업에서는 한 agent가 모든 일을 맡기보다 reviewer, researcher, implementer처럼 다른 도구·승인 정책·출력 계약을 가진 specialist를 나누는 것이 추적과 검증을 쉽게 한다. (출처: https://developers.openai.com/api/docs/guides/agents/define-agents, 확인: 2026-07-05)

## 실무 활용
1. Manager pattern: main agent가 최종 답변 책임을 유지하고 summarizer, researcher, code reviewer agent를 tool처럼 호출한다. (근거: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)
2. Handoff pattern: refund, billing, technical support처럼 specialist가 다음 응답을 소유해야 할 때 handoff를 사용한다. (근거: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)
3. Orchestrator-workers: 복잡한 코드 변경처럼 subtasks를 미리 알기 어려울 때 central LLM이 동적으로 task를 쪼개고 worker 결과를 합성한다. (근거: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)

```ts
type OrchestrationPattern = "handoff" | "agents-as-tools"
type Specialist = { name: string; ownsFinalReply: boolean; tools: string[] }
```

## FAQ
Q: Orchestration은 그냥 병렬 실행인가?
A: 아니다. 병렬 실행은 동시에 작업하는 방식이고, orchestration은 specialist ownership, routing, handoff, final answer responsibility를 결정하는 설계다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)

Q: 언제 handoff를 쓰는가?
A: OpenAI 문서는 specialist가 다음 응답을 소유해야 할 때 handoff가 clearest fit이라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)

Q: 언제 agents as tools를 쓰는가?
A: OpenAI 문서는 main agent가 final answer 책임을 유지하고 specialist를 helper로 호출해야 할 때 `agent.asTool()`을 쓰라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: specialist를 너무 많이 나눈다. 왜 생기나: agent 수가 많을수록 똑똑해진다고 생각한다. 교정: Anthropic 권고처럼 가장 단순한 해결책부터 시작하고 필요할 때 복잡도를 늘린다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
2. 실수: handoff와 agents-as-tools를 구분하지 않는다. 왜 생기나: 둘 다 specialist를 부르는 방식으로 보이기 때문이다. 교정: final answer ownership이 이동하면 handoff, manager가 유지하면 agents-as-tools로 구분한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)
3. 실수: specialist job을 넓게 둔다. 왜 생기나: 한 specialist에게 많은 책임을 넣어야 효율적이라고 생각한다. 교정: specialist job을 좁게 만들고 routing surface를 읽기 쉽게 유지한다. (출처: https://developers.openai.com/api/docs/guides/agents/orchestration, 확인: 2026-07-05)

## 공식 출처
- Orchestration은 specialists가 대화 소유권을 넘겨받는지 manager 뒤에서 bounded capability로 남는지 결정한다 — [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration) (확인: 2026-07-05)
- Agent는 model, instructions, tools, guardrails, MCP servers, handoffs, structured outputs를 패키징한다 — [Agent definitions](https://developers.openai.com/api/docs/guides/agents/define-agents) (확인: 2026-07-05)
- Workflows는 predefined code paths로 orchestrated되고 agents는 process와 tool usage를 동적으로 지휘한다 — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)
- Multi-agent systems에는 manager pattern과 decentralized pattern이 있다 — [A practical guide to building AI agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) (확인: 2026-07-05)
- Claude Code agent loop는 tool call 결과를 다음 iteration의 context로 다시 전달한다 — [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
- Agent Skills는 specialist capability의 재사용 자료로 쓸 수 있는 modular capabilities다 — [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) (확인: 2026-07-05)
- Sandbox Agents 문서는 handoffs, approvals, tracing, recovery, run state를 harness control plane의 소유 항목으로 설명한다 — [Sandbox Agents](https://developers.openai.com/api/docs/guides/agents/sandboxes) (확인: 2026-07-05)

## Quote Bank
- > "Choose whether specialists take over the conversation"
  - 출처: [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration) (확인: 2026-07-05)
  - 맥락: orchestration의 핵심 질문을 소개할 때 사용.
- > "Control moves to the specialist agent"
  - 출처: [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration) (확인: 2026-07-05)
  - 맥락: handoff의 소유권 이전을 설명할 때 사용.
- > "The manager keeps ownership of the reply"
  - 출처: [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration) (확인: 2026-07-05)
  - 맥락: agents-as-tools 패턴을 설명할 때 사용.
- > "central LLM dynamically breaks down tasks"
  - 출처: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)
  - 맥락: orchestrator-workers workflow를 설명할 때 사용.
- > "Manager (agents as tools)"
  - 출처: [A practical guide to building AI agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) (확인: 2026-07-05)
  - 맥락: manager pattern 명칭을 원문으로 제시할 때 사용.
- > "Decentralized (agents handing off to agents)"
  - 출처: [A practical guide to building AI agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) (확인: 2026-07-05)
  - 맥락: decentralized pattern 명칭을 원문으로 제시할 때 사용.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
