---
id: subagents
title: "SubAgents (하위 에이전트)"
topicGroup: T10
status: approved
score: 91
level: 중급
prerequisites: [agent-loop, context-engineering]
successors: [orchestration, harness]
related: [agent-loop, orchestration, skills]
consumers:
  lessons: [subagents-and-delegation]
  glossary: [SubAgent, Delegation, Dynamic Workflow]
sources:
  - { title: "Create custom subagents", url: "https://code.claude.com/docs/en/sub-agents", checked: 2026-07-05 }
  - { title: "Subagents in the SDK", url: "https://code.claude.com/docs/en/agent-sdk/subagents", checked: 2026-07-05 }
  - { title: "Run agents in parallel", url: "https://code.claude.com/docs/en/agents", checked: 2026-07-05 }
  - { title: "Orchestrate subagents at scale with dynamic workflows", url: "https://code.claude.com/docs/en/workflows", checked: 2026-07-05 }
  - { title: "Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", checked: 2026-07-05 }
  - { title: "Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
SubAgent는 주 에이전트가 특정 하위 작업을 별도 컨텍스트와 지침으로 위임하는 전문 에이전트이다. Claude Code 문서는 subagent를 특정 유형의 작업을 처리하는 specialized AI assistant로 설명하고, 별도 context window, custom system prompt, tool access, independent permissions를 가진다고 설명한다. (출처: https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)

## 역사
Anthropic은 2024년 12월 19일 "Building effective agents"에서 orchestrator-workers workflow를 central LLM이 작업을 동적으로 분해하고 worker LLMs에 위임한 뒤 결과를 합성하는 구조로 설명했다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
Claude Code 문서는 2026-07-05 기준 subagents를 interactive Claude Code와 Agent SDK 양쪽에서 다루며, SDK에서는 `agents` parameter로 정의하고 Claude Code에서는 Markdown 파일로 정의할 수 있다고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05; https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)
Claude Code 문서는 v2.1.198 기준 `/agents` command가 interactive creation wizard를 열지 않고, `.claude/agents/` 또는 `~/.claude/agents/` 파일을 직접 편집하거나 Claude에게 작성시키는 흐름으로 안내한다고 설명한다. (출처: https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)

## 해결하려는 문제
긴 탐색 로그, 검색 결과, 대량 파일 내용이 주 대화에 모두 들어오면 main agent의 컨텍스트가 빠르게 오염되고 후속 판단이 어려워진다. Claude Code 문서는 side task가 main conversation을 search results, logs, file contents로 flood할 때 subagent가 own context에서 작업하고 summary만 반환한다고 설명한다. (출처: https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)
장시간 작업에서는 하나의 agent가 모든 세부 탐색 상태를 유지하기 어렵다. Anthropic은 sub-agent architectures가 context limitations를 우회하는 방식이며, specialist sub-agents가 focused tasks를 clean context windows에서 처리하고 lead agent는 high-level plan을 조정한다고 설명한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 핵심 개념
1. Subagent는 main agent가 spawn할 수 있는 separate agent instance이며 focused subtasks, context isolation, parallel analyses, specialized instructions에 쓰인다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
2. Claude Code custom subagent는 Markdown file과 YAML frontmatter로 정의되며 `name`, `description`, `tools`, `model` 같은 필드를 가질 수 있다. (출처: https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)
3. SDK `AgentDefinition`은 `description`, `prompt`, `tools`, `disallowedTools`, `model`, `skills`, `memory`, `mcpServers`, `maxTurns`, `permissionMode` 같은 설정을 지원한다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
4. Built-in subagents는 Explore, Plan, general-purpose 같은 유형을 포함할 수 있고, permission deny 또는 환경 변수로 제한할 수 있다. (출처: https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)
5. Claude Code v2.1.198 기준 Agent tool call이 `run_in_background` input을 생략하면 background subagent로 실행되고, 결과가 필요할 때는 Claude가 `run_in_background: false`를 설정한다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
6. Dynamic workflows는 많은 subagents를 JavaScript script로 orchestration해 background runtime에서 실행하고, session은 responsive하게 유지한다. (출처: https://code.claude.com/docs/en/workflows, 확인: 2026-07-05)
7. Anthropic의 context engineering 글은 subagent가 상세 탐색 컨텍스트를 격리하고 condensed summary만 lead agent에게 반환하는 separation of concerns를 제공한다고 설명한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 관련 기술
- SubAgent vs Agent Loop: agent loop는 한 agent의 평가-도구-결과 반복 구조이고, subagent는 그 loop를 별도 context와 권한으로 분리해 하위 작업에 적용하는 구조다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05; https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
- SubAgent vs Skill: Skill은 재사용 가능한 지침·자료 묶음이고, subagent는 자체 prompt, model, tools, permissions를 가진 실행 주체다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05; https://code.claude.com/docs/en/skills, 확인: 2026-07-05)
- SubAgent vs Orchestration: subagent는 worker 단위이고 orchestration은 어떤 worker를 언제 호출하고 결과를 어떻게 합성할지 정하는 조정 구조다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
- SubAgent vs Dynamic Workflow: subagent는 개별 worker이고 dynamic workflow는 많은 subagents를 script로 묶어 반복 실행 가능한 orchestration artifact로 만든다. (출처: https://code.claude.com/docs/en/workflows, 확인: 2026-07-05)

## 선행 개념
- agent-loop: subagent도 독립 agent instance로 동작하므로 prompt 평가, tool call, result feedback, stop condition의 반복 구조를 먼저 알아야 한다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
- context-engineering: subagent의 핵심 이점은 context isolation과 summary return이므로 context window와 context pollution 문제를 먼저 이해해야 한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 후행 개념
SubAgent 뒤에는 orchestration, dynamic workflows, harness engineering, subagent evaluation을 다룰 수 있다. Anthropic은 central LLM이 worker LLMs에 작업을 위임하고 결과를 합성하는 orchestrator-workers workflow를 설명하고, Claude Code는 많은 subagents를 dynamic workflow script로 실행할 수 있다고 설명한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05; https://code.claude.com/docs/en/workflows, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 SubAgent는 "AI를 여러 개 켜는 것"이 아니라 컨텍스트, 권한, 역할을 분리해 주 에이전트의 판단 품질을 보존하는 설계다. Claude Code 문서는 subagent가 own context에서 작업하고 summary만 반환해 main conversation context를 절약한다고 설명한다. (출처: https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)
대규모 코드베이스 탐색, 보안 리뷰, 테스트 분석처럼 로그가 많은 작업은 subagent에 맡기면 main agent가 큰 그림과 최종 결정을 유지할 수 있다. Anthropic은 sub-agent architectures가 detailed search context를 sub-agents 안에 격리하고 lead agent가 synthesis와 analysis에 집중하게 한다고 설명한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 실무 활용
1. 읽기 전용 코드 리뷰 subagent: `Read`, `Grep`, `Glob`만 허용하고 security, performance, maintainability 리뷰에 특화한다. (근거: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
2. 테스트 분석 subagent: `Bash`, `Read`, `Grep`를 허용해 테스트 실행과 실패 로그 요약을 담당하게 한다. (근거: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
3. 대규모 리서치 dynamic workflow: 다수 subagents가 서로 다른 source를 조사하고, script가 결과를 모아 cross-check한다. (근거: https://code.claude.com/docs/en/workflows, 확인: 2026-07-05)

```ts
type SubagentDefinition = {
  description: string
  prompt: string
  tools?: string[]
  model?: "inherit" | "haiku" | "sonnet" | "opus"
  maxTurns?: number
}
```

## FAQ
Q: SubAgent는 그냥 새 채팅인가?
A: 아니다. Claude Code와 Agent SDK에서 subagent는 main agent가 특정 하위 작업을 위해 spawn하거나 delegate하는 separate agent instance이며, 별도 context, instructions, tools, permissions를 가질 수 있다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)

Q: 모든 작업을 SubAgent에 맡기면 좋은가?
A: 아니다. Claude Code 문서는 subagents, agent view, agent teams, dynamic workflows가 서로 다른 parallelization 방식이며 상황에 따라 선택해야 한다고 설명한다. (출처: https://code.claude.com/docs/en/agents, 확인: 2026-07-05)

Q: SubAgent가 main context를 완전히 안 쓰는가?
A: subagent는 own context에서 작업하지만, 최종적으로 summary나 result를 main agent로 반환한다. Anthropic은 subagent가 tens of thousands of tokens를 탐색해도 condensed summary만 반환하는 패턴을 설명한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

Q: SubAgent에도 권한 제한이 필요한가?
A: 필요하다. Claude Code 문서는 subagent가 custom tool restrictions, permission modes, hooks, skills를 가질 수 있다고 설명한다. (출처: https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: subagent description을 모호하게 쓴다. 왜 생기나: main agent가 언제 delegate할지 자동으로 알 것이라고 가정한다. 교정: `description`에 어떤 상황에서 이 subagent를 사용할지 구체적으로 쓴다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
2. 실수: subagent에 모든 도구를 준다. 왜 생기나: 전문 worker와 general-purpose agent를 혼동한다. 교정: read-only review agent처럼 필요한 tools만 허용하고 `disallowedTools` 또는 permissions를 설정한다. (출처: https://code.claude.com/docs/en/agent-sdk/subagents, 확인: 2026-07-05)
3. 실수: subagent 결과를 검증 없이 합성한다. 왜 생기나: 여러 agent가 독립적으로 봤으니 충분히 정확하다고 믿는다. 교정: dynamic workflow나 orchestration 단계에서 cross-check, tests, source review를 둔다. (출처: https://code.claude.com/docs/en/workflows, 확인: 2026-07-05)
4. 실수: subagent를 context 절약이 아니라 복잡도 추가 수단으로만 쓴다. 왜 생기나: agent 수가 늘면 품질이 자동으로 오른다고 생각한다. 교정: Anthropic 권고처럼 context limitation, parallel exploration, separation of concerns가 실제로 필요한 경우에 사용한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 공식 출처
- Subagent는 specialized AI assistant이며 own context와 custom prompt, tool access, independent permissions를 가진다 — [Create custom subagents](https://code.claude.com/docs/en/sub-agents) (확인: 2026-07-05)
- SDK subagent는 focused subtasks, context isolation, parallel analyses, specialized instructions를 위해 `agents` parameter로 정의한다 — [Subagents in the SDK](https://code.claude.com/docs/en/agent-sdk/subagents) (확인: 2026-07-05)
- Claude Code의 parallel work 방식에는 subagents, agent view, agent teams, dynamic workflows가 있다 — [Run agents in parallel](https://code.claude.com/docs/en/agents) (확인: 2026-07-05)
- Dynamic workflows는 많은 subagents를 JavaScript script로 orchestrate한다 — [Orchestrate subagents at scale with dynamic workflows](https://code.claude.com/docs/en/workflows) (확인: 2026-07-05)
- Sub-agent architectures는 long-horizon task의 context limitation을 우회하는 방법이다 — [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
- Orchestrator-workers workflow는 central LLM이 task를 동적으로 분해하고 worker LLMs에 위임한다 — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)

## Quote Bank
- > "specialized AI assistants"
  - 출처: [Create custom subagents](https://code.claude.com/docs/en/sub-agents) (확인: 2026-07-05)
  - 맥락: SubAgent의 짧은 정의에 사용.
- > "own context window"
  - 출처: [Create custom subagents](https://code.claude.com/docs/en/sub-agents) (확인: 2026-07-05)
  - 맥락: context isolation 설명에 사용.
- > "separate agent instances"
  - 출처: [Subagents in the SDK](https://code.claude.com/docs/en/agent-sdk/subagents) (확인: 2026-07-05)
  - 맥락: SDK 관점의 subagent 정의에 사용.
- > "run tasks in parallel"
  - 출처: [Subagents in the SDK](https://code.claude.com/docs/en/agent-sdk/subagents) (확인: 2026-07-05)
  - 맥락: 병렬 분석 용도를 설명할 때 사용.
- > "Dynamic workflows orchestrate many subagents"
  - 출처: [Orchestrate subagents at scale with dynamic workflows](https://code.claude.com/docs/en/workflows) (확인: 2026-07-05)
  - 맥락: workflow와 subagent 관계를 설명할 때 사용.
- > "specialized sub-agents can handle focused tasks"
  - 출처: [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
  - 맥락: long-horizon context 관리에서 subagent의 역할을 설명할 때 사용.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
