---
id: agent-loop
title: "Agent Loop (에이전트 루프)"
topicGroup: T10
status: approved
score: 91
level: 중급
prerequisites: [context-engineering, tool-calling]
successors: []
related: [context-engineering, tool-calling, mcp]
consumers:
  lessons: [ai-workflow-design, agent-loop-anatomy, subagents-and-delegation, loop-engineering-basics]
  glossary: [Agent Loop]
sources:
  - { title: "How the agent loop works", url: "https://code.claude.com/docs/en/agent-sdk/agent-loop", checked: 2026-07-05 }
  - { title: "Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", checked: 2026-07-05 }
  - { title: "Demystifying evals for AI agents", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", checked: 2026-07-05 }
  - { title: "Agent SDK overview", url: "https://code.claude.com/docs/en/agent-sdk/overview", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Agent Loop는 모델이 상태를 평가하고 도구를 호출하며 결과를 받아 다시 판단하는 반복 실행 구조이다. Claude Agent SDK 문서는 에이전트 루프를 Claude가 프롬프트를 평가하고, 도구를 호출하고, 결과를 받은 뒤 작업이 끝날 때까지 반복하는 실행 루프로 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 역사
Anthropic은 2024년 12월 19일 "Building effective agents"에서 agentic systems를 workflows와 agents로 구분했다. workflows는 미리 정의된 코드 경로로 LLM과 도구를 조정하고, agents는 LLM이 자기 프로세스와 도구 사용을 동적으로 지휘하는 시스템으로 설명된다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
Claude Agent SDK 문서는 Claude Code를 구동하는 같은 실행 루프를 SDK에 내장해 애플리케이션에서 도구, 권한, 비용 제한, 출력을 제어할 수 있다고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 해결하려는 문제
단일 LLM 호출은 텍스트를 한 번 생성하지만, 실제 작업은 파일 읽기, 명령 실행, 검색, 편집, 테스트처럼 중간 행동과 결과 확인이 필요하다. Claude Agent SDK 문서는 도구가 없으면 Claude는 텍스트로만 응답하지만, 도구가 있으면 파일 읽기, 명령 실행, 코드 검색, 외부 서비스 상호작용을 수행할 수 있다고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
에이전트 루프는 도구 결과를 다시 모델 판단에 넣어 다음 행동을 정하게 하므로, 작업 중 발견한 오류나 새 정보를 반영할 수 있다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 핵심 개념
1. 루프는 prompt 수신, 평가와 응답, 도구 실행, 반복, 최종 결과 반환 단계로 구성된다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
2. 한 turn은 모델이 도구 호출을 포함한 출력을 만들고 SDK가 도구를 실행한 뒤 그 결과를 다시 모델에 제공하는 왕복이다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
3. Claude Agent SDK는 SystemMessage, AssistantMessage, UserMessage, StreamEvent, ResultMessage 같은 메시지 타입으로 루프 상태를 노출한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
4. max_turns와 max_budget_usd는 루프의 길이와 비용을 제한하는 장치다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
5. permission_mode, allowed_tools, disallowed_tools는 도구 실행 권한과 승인 방식을 제어한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
6. read-only 도구는 병렬 실행될 수 있지만 상태를 바꾸는 도구는 충돌 방지를 위해 순차 실행된다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 관련 기술
- Workflow vs Agent: workflow는 미리 정의된 코드 경로를 따르고 agent는 모델이 도구 사용과 과정을 동적으로 정한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
- Tool Calling vs Agent Loop: tool calling은 한 행동을 외부 실행으로 연결하는 메커니즘이고, agent loop는 그런 호출을 여러 턴에 걸쳐 반복하는 실행 구조다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
- Evaluation Harness vs Agent Harness: Anthropic은 evaluation harness를 평가를 end-to-end로 실행하는 인프라로, agent harness를 모델이 에이전트처럼 행동하게 하는 시스템으로 설명한다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
- Context Engineering vs Agent Loop: 루프가 길어질수록 도구 결과와 대화 이력이 누적되므로 context engineering이 필요하다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 선행 개념
- context-engineering: 루프는 여러 턴 동안 메시지와 도구 결과를 축적하므로 컨텍스트 관리가 선행되어야 한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
- tool-calling: 에이전트 루프의 행동 단계는 도구 호출과 도구 결과 반환을 기반으로 한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 후행 개념
이 개념 뒤에는 subagent 위임, multi-agent orchestration, loop 종료 조건, harness engineering을 다룰 수 있다. Anthropic은 subagent를 별도 컨텍스트 창과 권한을 가진 전문 assistant로 설명한다. (출처: https://code.claude.com/docs/en/sub-agents, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 agent loop는 "AI가 한 번 답하는 것"을 "목표를 향해 행동하고 검증하며 반복하는 것"으로 바꾼다. Claude Agent SDK 문서는 복잡한 작업이 수십 개 도구 호출과 여러 turn을 거치며, Claude가 각 결과를 바탕으로 접근을 조정할 수 있다고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
루프가 있다고 해서 자동으로 안전한 것은 아니며, Anthropic은 에이전트가 비용·지연과 성능 사이의 trade-off를 만들기 때문에 단순한 해결책을 먼저 검토하라고 권고한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)

## 실무 활용
1. 버그 수정 에이전트: 테스트 실행, 실패 로그 읽기, 코드 수정, 재실행을 turn 단위로 반복한다. (근거: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
2. 리서치 에이전트: 검색과 문서 읽기를 반복하고, 충분한 근거가 모이면 최종 결과를 낸다. (근거: https://code.claude.com/docs/en/agent-sdk/overview, 확인: 2026-07-05)
3. 운영 에이전트: permission_mode와 budget 설정으로 도구 실행 범위와 비용을 제한한다. (근거: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

```ts
type AgentLoopState = {
  turn: number
  goal: string
  toolCalls: Array<{ name: string; status: "requested" | "done" | "blocked" }>
  done: boolean
}
```

## FAQ
Q: Agent Loop는 그냥 반복문인가?
A: 아니다. 루프는 모델 응답, 도구 호출, 도구 결과, 권한, 비용 제한, 최종 결과 메시지까지 포함하는 실행 구조다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

Q: Agent와 Workflow는 같은가?
A: 아니다. Anthropic은 workflow를 미리 정한 코드 경로, agent를 모델이 과정과 도구 사용을 동적으로 지휘하는 시스템으로 구분한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)

Q: 루프가 길면 항상 더 좋은가?
A: 아니다. Claude Agent SDK는 max_turns와 max_budget_usd로 루프를 제한할 수 있으며, Anthropic은 에이전트가 비용과 지연을 성능과 교환한다고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05; https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: 종료 조건 없이 루프를 둔다. 왜 생기나: 모델이 알아서 끝낼 것이라고 가정한다. 교정: max_turns, budget, 성공 기준을 둔다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
2. 실수: 모든 도구를 무제한 허용한다. 왜 생기나: 에이전트 자율성을 권한과 혼동한다. 교정: allowed_tools, disallowed_tools, permission_mode를 설계한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
3. 실수: 루프 로그만 보고 성공으로 판단한다. 왜 생기나: 최종 발화와 실제 환경 상태를 혼동한다. 교정: outcome과 grader를 분리해 평가한다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 공식 출처
- 에이전트 루프는 평가, 도구 호출, 도구 결과 수신, 반복, 최종 결과 반환으로 구성된다 — [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
- workflow와 agent는 predefined path와 model-directed process라는 차이가 있다 — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)
- agent eval은 transcript, outcome, grader, harness를 구분해야 한다 — [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (확인: 2026-07-05)
- Claude Agent SDK는 Claude Code의 도구, agent loop, context management를 Python·TypeScript로 제공한다 — [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview) (확인: 2026-07-05)

## Quote Bank
- > "autonomous agent loop"
  - 출처: [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
  - 맥락: agent loop를 Claude Code 실행 구조와 연결해 설명할 때 사용한다.
- > "Claude evaluates your prompt"
  - 출처: [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
  - 맥락: 루프의 첫 판단 단계를 설명할 때 사용한다.
- > "Every agent session follows the same cycle"
  - 출처: [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
  - 맥락: 에이전트 루프가 반복 가능한 실행 사이클이라는 점을 설명할 때 사용한다.
- > "Workflows are systems"
  - 출처: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)
  - 맥락: workflow와 agent의 구조적 차이를 시작할 때 사용한다.
- > "dynamically direct their own processes"
  - 출처: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)
  - 맥락: agent가 미리 정한 경로가 아니라 모델 주도 흐름을 따른다는 점을 설명할 때 사용한다.
- > "mistakes can propagate and compound"
  - 출처: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (확인: 2026-07-05)
  - 맥락: agent loop 검증에서 루프 누적 오류를 설명할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
