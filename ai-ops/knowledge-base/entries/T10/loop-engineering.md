---
id: loop-engineering
title: "Loop Engineering (루프 엔지니어링)"
topicGroup: T10
status: draft
score: null
level: 중급
prerequisites: [agent-loop, tool-calling]
successors: [harness]
related: [agent-loop, orchestration, harness]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "How the agent loop works", url: "https://code.claude.com/docs/en/agent-sdk/agent-loop", checked: 2026-07-05 }
  - { title: "How Claude Code works", url: "https://code.claude.com/docs/en/how-claude-code-works", checked: 2026-07-05 }
  - { title: "Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", checked: 2026-07-05 }
  - { title: "Intercept and control agent behavior with hooks", url: "https://code.claude.com/docs/en/agent-sdk/hooks", checked: 2026-07-05 }
  - { title: "Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", checked: 2026-07-05 }
  - { title: "Demystifying evals for AI agents", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Loop Engineering은 에이전트가 판단, 도구 호출, 결과 반영을 반복하는 방식을 종료 조건·권한·관찰 가능성과 함께 설계하는 작업이다. Claude Agent SDK 문서는 agent loop가 prompt 평가, tool call, result receipt, repeat until complete의 반복 구조라고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
이 KB에서 Loop Engineering은 벤더 공식 제품명이 아니라, 공식 agent loop 문서의 반복 실행 제어 요소를 교육용으로 묶은 프로젝트 개념이다. (근거: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 역사
Anthropic은 2024년 12월 19일 "Building effective agents"에서 agents를 LLMs using tools based on environmental feedback in a loop로 설명했고, completion 외에도 maximum number of iterations 같은 stopping conditions를 포함할 수 있다고 설명했다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
Claude Code 문서는 agentic loop를 gather context, take action, verify results의 세 phase가 섞여 반복되는 구조로 설명한다. (출처: https://code.claude.com/docs/en/how-claude-code-works, 확인: 2026-07-05)
Claude Agent SDK 문서는 동일한 loop에 대해 programmatic control over tools, permissions, cost limits, output을 제공한다고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 해결하려는 문제
에이전트가 여러 턴 동안 도구를 호출하면 작업이 길어지고 비용, 권한 위험, 컨텍스트 누적, 종료 실패가 함께 커진다. Claude Agent SDK 문서는 context가 session 내에서 reset되지 않고 system prompt, tool definitions, conversation history, tool inputs, tool outputs가 누적된다고 설명한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
Anthropic은 agent가 environment state를 여러 turn 동안 수정하므로 mistakes can propagate and compound한다고 설명한다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
Loop Engineering은 max turns, cost budget, tool permission, hook, compaction, success criterion을 설계해 loop 폭주와 검증 불가능한 작업을 줄인다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05; https://code.claude.com/docs/en/agent-sdk/hooks, 확인: 2026-07-05)

## 핵심 개념
1. Agent loop는 receive prompt, evaluate and respond, execute tools, repeat, return final result의 cycle로 설명된다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
2. 한 turn은 model response와 tool execution 결과가 다시 model에게 들어가는 왕복이며, tool call이 없을 때 final result로 끝날 수 있다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
3. Claude Agent SDK의 `max_turns`와 `max_budget_usd`는 loop 길이와 비용을 제한하는 제어 장치다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
4. `allowed_tools`, `disallowed_tools`, `permission_mode`는 loop가 호출할 수 있는 도구와 승인 방식을 제한한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
5. Hooks는 tool call, session start, execution stop 같은 agent events에서 block, log, transform, approve, track 결정을 삽입할 수 있다. (출처: https://code.claude.com/docs/en/agent-sdk/hooks, 확인: 2026-07-05)
6. Context window는 session 내에서 reset되지 않고 누적되며, context limit 근처에서는 SDK가 automatic compaction을 수행할 수 있다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
7. Anthropic은 agents가 ground truth from the environment를 각 step에서 얻어 progress를 평가하고, blockers나 checkpoints에서 human feedback을 받을 수 있다고 설명한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)

## 관련 기술
- Agent Loop vs Loop Engineering: agent loop는 반복 실행 구조이고, loop engineering은 그 반복의 종료 조건, 권한, 비용, 컨텍스트, 평가를 설계하는 작업이다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
- Loop Engineering vs Workflow: workflow는 predefined path를 따르고, loop engineering은 model-directed loop가 어디까지 반복하고 무엇을 근거로 멈출지 설계한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)
- Loop Engineering vs Harness Engineering: loop engineering은 반복 흐름의 제어 조건에 집중하고, harness engineering은 권한, sandbox, tracing, recovery, evaluation infrastructure까지 포함하는 더 넓은 실행 제어면이다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05; https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
- Loop Engineering vs Context Engineering: loop engineering은 반복의 행동 구조를, context engineering은 반복 중 어떤 정보가 window에 들어오고 사라지는지를 설계한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 선행 개념
- agent-loop: loop engineering은 agent loop 자체를 제어하는 설계이므로 loop의 turn, tool call, result feedback 구조를 먼저 알아야 한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
- tool-calling: loop의 행동 단계는 tool request와 tool result injection으로 진행되므로 tool calling의 스키마와 실행 책임을 먼저 알아야 한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 후행 개념
Loop Engineering 뒤에는 harness engineering, agent evaluation, sandbox policy, orchestration failure handling을 다룰 수 있다. Anthropic은 agent execution에서 checkpoints, blockers, stopping conditions가 중요하다고 설명하고, eval 문서는 agent mistakes가 여러 turn에서 propagate and compound될 수 있다고 설명한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05; https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 Loop Engineering은 "AI에게 끝까지 해달라"가 아니라 "어디까지 반복하고 무엇을 확인하면 멈출지"를 설계하는 능력이다. Claude Code 문서는 bug fix가 context gathering, action, verification을 반복할 수 있고, each tool use가 next step을 inform한다고 설명한다. (출처: https://code.claude.com/docs/en/how-claude-code-works, 확인: 2026-07-05)
초보자는 agent가 오래 작업하면 더 완성도가 높아진다고 생각하기 쉽지만, 공식 문서들은 context accumulation, permissions, budget, hooks, stopping conditions를 함께 다룬다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05; https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)

## 실무 활용
1. 버그 수정 루프: 실패 테스트 확인, 관련 파일 탐색, 수정, 재테스트를 반복하되 `max_turns`와 test-pass success criterion을 둔다. (근거: https://code.claude.com/docs/en/how-claude-code-works, 확인: 2026-07-05; https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
2. 위험 명령 차단 루프: `PreToolUse` hook으로 destructive command나 unauthorized file access를 막는다. (근거: https://code.claude.com/docs/en/agent-sdk/hooks, 확인: 2026-07-05)
3. 장시간 작업 루프: context가 커질 때 compaction, note-taking, subagent architecture를 사용해 coherence를 유지한다. (근거: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

```ts
type LoopPolicy = {
  maxTurns: number
  maxBudgetUsd?: number
  successSignals: string[]
  blockedSignals: string[]
  allowedTools: string[]
  stopWhen: "tests-pass" | "source-verified" | "human-approval"
}
```

## FAQ
Q: Loop Engineering은 공식 API 기능 이름인가?
A: 이 KB에서는 공식 제품명이 아니라 agent loop 공식 문서에서 확인되는 turn, tool, permission, budget, context, hook, stop condition을 묶은 교육용 설계 개념이다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

Q: loop가 길수록 결과가 좋은가?
A: 아니다. Claude Agent SDK는 `max_turns`와 `max_budget_usd`를 제공하고, Anthropic은 stopping conditions로 maximum number of iterations를 언급한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05; https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05)

Q: hook은 loop 안에서 무엇을 하는가?
A: hook은 PreToolUse, PostToolUse, Stop 같은 agent events에 반응해 operation을 allow, block, modify하거나 context를 inject할 수 있다. (출처: https://code.claude.com/docs/en/agent-sdk/hooks, 확인: 2026-07-05)

Q: compaction은 loop engineering인가 context engineering인가?
A: compaction은 context engineering 기법이지만, loop가 길어질 때 실행 지속성에 영향을 주므로 loop engineering에서도 종료·지속 정책으로 다룬다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05; https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: 종료 조건 없이 "완료될 때까지"만 지시한다. 왜 생기나: agent가 스스로 최적 종료점을 찾는다고 가정한다. 교정: max turns, budget, success signals, blocker escalation을 지정한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
2. 실수: tool result가 많을수록 더 좋다고 생각한다. 왜 생기나: 모든 로그가 근거라고 착각한다. 교정: context window가 누적되고 large tool outputs가 significant context를 소비한다는 점을 고려한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
3. 실수: 검증 단계를 최종 답변에만 맡긴다. 왜 생기나: agent가 "성공"이라고 말하면 성공이라고 본다. 교정: environment ground truth와 tests, graders, traces로 loop outcome을 확인한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-05; https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
4. 실수: 권한 제한과 loop 제어를 분리해서 생각한다. 왜 생기나: tool permissions를 보안 설정으로만 본다. 교정: allowed/disallowed tools와 permission mode는 loop가 취할 수 있는 행동 공간을 직접 제한한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## 공식 출처
- Agent loop는 prompt 평가, tool call, result 수신, task completion까지 반복하는 구조다 — [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
- Claude Code의 agentic loop는 context gathering, action, verification이 섞여 반복된다 — [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) (확인: 2026-07-05)
- Agent는 environmental feedback 기반 tool loop이며 stopping conditions를 둘 수 있다 — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)
- Hooks는 agent events에 반응해 block, log, transform, approve, track을 수행한다 — [Intercept and control agent behavior with hooks](https://code.claude.com/docs/en/agent-sdk/hooks) (확인: 2026-07-05)
- Long-horizon tasks에는 compaction, structured note-taking, multi-agent architectures가 필요할 수 있다 — [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)
- Agent eval에서는 multi-turn mistakes가 propagate and compound될 수 있다 — [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (확인: 2026-07-05)

## Quote Bank
- > "Every agent session follows the same cycle"
  - 출처: [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
  - 맥락: loop cycle의 기본 구조를 설명할 때 사용.
- > "Steps 2 and 3 repeat"
  - 출처: [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop) (확인: 2026-07-05)
  - 맥락: tool execution과 evaluation 반복을 설명할 때 사용.
- > "gather context, take action, and verify results"
  - 출처: [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) (확인: 2026-07-05)
  - 맥락: 바이브코딩 실무 루프를 설명할 때 사용.
- > "maximum number of iterations"
  - 출처: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-05)
  - 맥락: 종료 조건 필요성을 설명할 때 사용.
- > "block dangerous operations"
  - 출처: [Intercept and control agent behavior with hooks](https://code.claude.com/docs/en/agent-sdk/hooks) (확인: 2026-07-05)
  - 맥락: loop 중 위험 행동 차단을 설명할 때 사용.
- > "mistakes can propagate and compound"
  - 출처: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (확인: 2026-07-05)
  - 맥락: multi-turn loop 검증의 필요성을 설명할 때 사용.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
