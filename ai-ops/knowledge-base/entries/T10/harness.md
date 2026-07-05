---
id: harness
title: "Harness Engineering (하네스 엔지니어링)"
topicGroup: T10
status: approved
score: 90
level: 중급
prerequisites: [agent-loop, orchestration]
successors: []
related: [agent-loop, orchestration, tool-calling]
consumers:
  lessons: [harness-engineering-basics]
  glossary: [Harness Engineering, Sandbox, Guardrails, Human Review, Trace, Evaluation Harness]
sources:
  - { title: "Sandbox Agents", url: "https://developers.openai.com/api/docs/guides/agents/sandboxes", checked: 2026-07-05 }
  - { title: "Guardrails and human review", url: "https://developers.openai.com/api/docs/guides/agents/guardrails-approvals", checked: 2026-07-05 }
  - { title: "Integrations and observability", url: "https://developers.openai.com/api/docs/guides/agents/integrations-observability", checked: 2026-07-05 }
  - { title: "Intercept and control agent behavior with hooks", url: "https://code.claude.com/docs/en/agent-sdk/hooks", checked: 2026-07-05 }
  - { title: "Configure permissions", url: "https://code.claude.com/docs/en/permissions", checked: 2026-07-05 }
  - { title: "Configure the sandboxed Bash tool", url: "https://code.claude.com/docs/en/sandboxing", checked: 2026-07-05 }
  - { title: "Demystifying evals for AI agents", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Harness Engineering은 agent 실행을 둘러싼 제어면, 권한, 샌드박스, 관찰, 평가 장치를 설계하는 작업이다. OpenAI Sandbox Agents 문서는 harness를 model calls, tool routing, handoffs, approvals, tracing, recovery, run state를 소유하는 control plane으로 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)

## 역사
Anthropic은 agent eval 문서에서 evaluation harness와 agent harness를 구분한다. evaluation harness는 evals를 end-to-end로 실행하는 infrastructure이고, agent harness는 model이 agent처럼 행동하게 하는 system으로 설명된다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
OpenAI Agents SDK 문서는 sandbox agent에서 harness와 compute boundary를 나누어, harness가 trusted infrastructure에서 control plane을 담당하고 sandbox가 filesystem, shell, package, ports, snapshot 같은 execution plane을 담당할 수 있다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)

## 해결하려는 문제
Agent는 도구를 여러 턴 호출하고 환경 상태를 바꾸므로, 단순 API wrapper처럼 다루면 권한, 감사, 복구, 평가가 흐려진다. Anthropic은 agent가 여러 turn 동안 도구를 사용하고 환경 state를 수정하기 때문에 mistakes can propagate and compound한다고 설명한다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
Harness는 모델이 무엇을 할 수 있는지와 실행 환경이 무엇을 허용하는지를 분리해 위험한 도구 사용, 불명확한 성공 판정, 재현 불가능한 실행을 줄인다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)

## 핵심 개념
1. Harness는 agent loop, model calls, tool routing, handoffs, approvals, tracing, recovery, run state를 소유하는 control plane이다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)
2. Sandbox는 filesystem, shell, installed packages, mounted data, exposed ports, snapshots, controlled external access를 제공하는 isolated execution environment다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)
3. Guardrails는 input, output, tool behavior를 자동 검증하고 human review는 sensitive action에서 run을 pause해 approve/reject를 받는다. (출처: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals, 확인: 2026-07-05)
4. Traces는 한 workflow run을 debug하고, 안정화 뒤 agent workflow evaluation에 high-signal examples를 공급하는 데 사용된다. (출처: https://developers.openai.com/api/docs/guides/agents/integrations-observability, 확인: 2026-07-05)
5. Claude Agent SDK hooks는 PreToolUse, PostToolUse, Stop, SubagentStart 같은 실행 단계에서 allow, block, modify, inject context 결정을 반환할 수 있다. (출처: https://code.claude.com/docs/en/agent-sdk/hooks, 확인: 2026-07-05)
6. Claude Code permission rules에는 allow, ask, deny가 있고 deny rules는 다른 level의 allow보다 우선한다. (출처: https://code.claude.com/docs/en/permissions, 확인: 2026-07-05)
7. Evaluation harness는 tasks를 실행하고, trials를 기록하고, graders로 outputs/outcomes를 평가하고, aggregate results를 만든다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 관련 기술
- Harness vs Sandbox: harness는 control plane이고 sandbox는 execution plane이다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)
- Harness vs Guardrails: guardrails는 harness 안의 validation/approval boundary이고, harness는 tool routing, state, tracing, recovery까지 포함한다. (출처: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals, 확인: 2026-07-05)
- Harness vs Eval: agent harness는 agent를 실행하게 하는 scaffold이고 evaluation harness는 그 agent를 end-to-end로 평가하는 infrastructure다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 선행 개념
- agent-loop: harness는 agent loop를 실행·제한·기록하는 control plane이므로 loop 구조 이해가 필요하다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)
- orchestration: harness는 handoffs, approvals, run state를 소유하므로 여러 specialist의 routing 구조 이해가 필요하다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)

## 후행 개념
Harness 뒤에는 agent evaluation, release gate, sandbox provider selection, production deployment governance를 다룰 수 있다. OpenAI와 Anthropic 문서는 traces, guardrails, sandbox, eval harness를 agent production 품질 관리의 일부로 다룬다. (출처: https://developers.openai.com/api/docs/guides/agents/integrations-observability, 확인: 2026-07-05; https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 harness는 "AI가 코드를 바꿔도 되는 환경"과 "그 결과를 믿어도 되는 조건"을 만든다. OpenAI는 sandbox를 agent answer가 prompt context만이 아니라 sandbox workspace에서 수행한 작업에 의존할 때 사용하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)
실무에서는 권한, hook, trace, grader가 없으면 agent가 파일을 바꾼 뒤 성공처럼 말해도 실제 결과를 검증하기 어렵다. Anthropic은 outcome을 transcript와 분리해 최종 환경 상태로 보아야 한다고 설명한다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 실무 활용
1. 코드 수정 sandbox: agent가 파일을 읽고 쓰고 테스트를 실행해야 할 때 sandbox workspace와 snapshot을 사용한다. (근거: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)
2. 권한 하네스: 위험한 shell command나 `.env` 수정은 deny rule 또는 PreToolUse hook으로 차단한다. (근거: https://code.claude.com/docs/en/permissions, 확인: 2026-07-05; https://code.claude.com/docs/en/agent-sdk/hooks, 확인: 2026-07-05)
3. 평가 하네스: task, trial, grader, transcript, outcome을 분리하고 unit test, static analysis, rubric, state check를 조합한다. (근거: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

```ts
type HarnessBoundary = {
  controlPlane: ["tool-routing", "approvals", "tracing", "run-state"]
  executionPlane: ["filesystem", "shell", "packages", "ports"]
}
```

## FAQ
Q: Harness는 sandbox와 같은가?
A: 아니다. OpenAI 문서는 harness를 control plane, sandbox compute를 execution plane으로 구분한다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)

Q: Guardrails만 있으면 harness가 완성되는가?
A: 아니다. Guardrails는 input/output/tool behavior validation과 human review boundary이고, harness는 routing, approvals, tracing, recovery, run state까지 포함한다. (출처: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)

Q: Agent eval에서 transcript와 outcome은 왜 나누는가?
A: Anthropic은 transcript를 trial의 complete record로, outcome을 trial 끝의 final environment state로 설명한다. 최종 발화가 성공처럼 보여도 환경 상태가 실패일 수 있기 때문이다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: agent가 성공했다고 말하면 성공으로 본다. 왜 생기나: transcript와 outcome을 구분하지 않는다. 교정: 환경 상태, 테스트, grader로 outcome을 확인한다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
2. 실수: sandbox만 있으면 안전하다고 본다. 왜 생기나: execution isolation과 control plane governance를 혼동한다. 교정: harness가 approvals, tracing, recovery state를 별도로 소유하게 한다. (출처: https://developers.openai.com/api/docs/guides/agents/sandboxes, 확인: 2026-07-05)
3. 실수: allow rule로 deny를 덮을 수 있다고 생각한다. 왜 생기나: 권한 규칙을 일반 allowlist로만 이해한다. 교정: Claude Code 문서처럼 deny-first precedence를 고려한다. (출처: https://code.claude.com/docs/en/permissions, 확인: 2026-07-05)

## 공식 출처
- Harness는 model calls, tool routing, handoffs, approvals, tracing, recovery, run state를 소유하는 control plane이다 — [Sandbox Agents](https://developers.openai.com/api/docs/guides/agents/sandboxes) (확인: 2026-07-05)
- Guardrails와 human review는 run을 continue, pause, stop할지 정하는 validation/approval boundary다 — [Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) (확인: 2026-07-05)
- Traces는 one workflow run debugging과 agent workflow evaluation examples에 쓰인다 — [Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability) (확인: 2026-07-05)
- Hooks는 agent execution 단계에서 allow, block, modify, inject context 결정을 반환할 수 있다 — [Intercept and control agent behavior with hooks](https://code.claude.com/docs/en/agent-sdk/hooks) (확인: 2026-07-05)
- Claude Code permission rules는 allow, ask, deny를 제공하고 deny-first precedence를 따른다 — [Configure permissions](https://code.claude.com/docs/en/permissions) (확인: 2026-07-05)
- Claude Code Bash sandbox는 filesystem과 network isolation을 OS 수준에서 강제한다 — [Configure the sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing) (확인: 2026-07-05)
- Evaluation harness는 evals를 end-to-end로 실행하는 infrastructure다 — [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (확인: 2026-07-05)

## Quote Bank
- > "The harness is the control plane around the model"
  - 출처: [Sandbox Agents](https://developers.openai.com/api/docs/guides/agents/sandboxes) (확인: 2026-07-05)
  - 맥락: harness의 한 줄 정의에 사용할 인용.
- > "Use a sandbox when the agent’s answer depends"
  - 출처: [Sandbox Agents](https://developers.openai.com/api/docs/guides/agents/sandboxes) (확인: 2026-07-05)
  - 맥락: sandbox 사용 조건을 설명할 때 사용.
- > "Guardrails validate input, output, or tool behavior automatically."
  - 출처: [Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals) (확인: 2026-07-05)
  - 맥락: guardrails의 범위를 설명할 때 사용.
- > "Use traces for two jobs"
  - 출처: [Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability) (확인: 2026-07-05)
  - 맥락: trace의 debugging/evaluation 용도를 설명할 때 사용.
- > "The SDK provides hooks for different stages"
  - 출처: [Intercept and control agent behavior with hooks](https://code.claude.com/docs/en/agent-sdk/hooks) (확인: 2026-07-05)
  - 맥락: hooks가 실행 제어점이라는 점을 설명할 때 사용.
- > "An evaluation harness is the infrastructure"
  - 출처: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (확인: 2026-07-05)
  - 맥락: evaluation harness와 agent harness를 구분할 때 사용.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
