---
id: automation-workflow-project
title: "자동화 Workflow 프로젝트 (Automation Workflow Project)"
topicGroup: T12
status: approved
score: 89
level: 중급
prerequisites: [orchestration, loop-engineering, agent-loop]
successors: [mcp-enabled-tool-project, private-ai-learning-site-project]
related: [harness, ai-system-evaluation, ci-cd-pipeline-basics]
consumers:
  lessons: [automation-workflow-project]
  glossary: [Workflow Dependency Graph, Workflow Tool Boundary, Predefined Code Path]
sources:
  - { title: "GitHub Docs — Workflows", url: "https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows", checked: 2026-07-12 }
  - { title: "GitHub Docs — Workflow syntax", url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax", checked: 2026-07-12 }
  - { title: "Anthropic Engineering — Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", checked: 2026-07-12 }
  - { title: "OpenAI Docs — Agents SDK", url: "https://developers.openai.com/api/docs/guides/agents", checked: 2026-07-12 }
  - { title: "OpenAI Docs — Function calling", url: "https://developers.openai.com/api/docs/guides/function-calling", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
자동화 Workflow 프로젝트는 이벤트, 단계, 조건, 도구 호출, 검증 게이트를 코드로 묶어 반복 가능한 작업 흐름을 만드는 실습이다. GitHub Actions는 workflow를 configurable automated process로 정의하고, Anthropic은 workflows를 predefined code paths로 LLMs and tools가 orchestrated되는 시스템으로 구분한다. 이 프로젝트의 핵심은 "AI가 알아서 하게 하기"가 아니라, 반복 작업의 경로와 멈춤 조건을 명확히 설계하는 것이다. (출처: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows, https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)

## 역사
자동화는 CI/CD, scheduled job, webhook, GitHub Actions 같은 deterministic workflow에서 널리 쓰였다. LLM 시대에는 도구 호출과 agent loop가 더해져 "고정된 단계"와 "모델이 다음 단계를 정하는 흐름"을 구분해야 한다. Anthropic은 workflows와 agents를 명확히 나누고, OpenAI Agents SDK는 agents가 plan, call tools, collaborate, keep state한다고 설명한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, https://developers.openai.com/api/docs/guides/agents, 확인: 2026-07-12)

## 해결하려는 문제
초보자는 자동화를 "한 번에 실행되는 스크립트"로 생각하거나, 반대로 모든 자동화를 agent에게 맡기려 한다. GitHub Actions workflow는 event로 trigger되고 jobs와 steps를 실행한다. Anthropic은 workflows가 predictable tasks에 consistency를 주고, agents는 flexibility와 model-driven decision-making이 필요한 곳에 적합하다고 설명한다. 자동화 프로젝트는 이 둘을 구분해 과한 agent화를 막는다. (출처: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows, https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)

## 핵심 개념
1. **Event trigger**: GitHub workflow는 repository event, external repository_dispatch, scheduled time, manual trigger로 실행될 수 있다. 자동화는 언제 시작되는지 먼저 정의한다. (출처: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows, 확인: 2026-07-12)
2. **Jobs and steps**: workflow는 one or more jobs와 each job의 steps로 구성된다. step은 script나 reusable action일 수 있다. (출처: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows, 확인: 2026-07-12)
3. **Dependency control**: workflow syntax는 jobs가 기본적으로 parallel run하며 `needs` keyword로 sequential dependency를 정의할 수 있다고 설명한다. 순서가 필요한 자동화는 dependency를 명시해야 한다. (출처: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax, 확인: 2026-07-12)
4. **Workflow vs agent**: Anthropic은 workflows가 predefined code paths이고 agents가 dynamically direct their own processes and tool usage한다고 설명한다. 예측 가능한 반복 작업은 workflow가 먼저다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
5. **Evaluator loop**: Anthropic evaluator-optimizer workflow는 한 LLM call이 output을 만들고 다른 call이 evaluation and feedback을 제공하는 loop다. AI 자동화에는 명확한 평가 기준이 필요하다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
6. **Tool execution boundary**: OpenAI function calling에서 application은 model이 요청한 tool call을 받아 실행하고 output을 다시 전달한다. 자동화는 tool 실행 권한과 결과 검증을 앱이 소유해야 한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-12)

## 관련 기술
- orchestration: 여러 단계와 worker를 어떤 순서로 실행할지 설계한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
- loop-engineering: 반복 조건, 종료 조건, 실패 시 중단 조건을 설계한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
- agent-loop: 예측하기 어려운 다단계 작업에서는 agent loop가 workflow 위에 얹힐 수 있다. (출처: https://developers.openai.com/api/docs/guides/agents, 확인: 2026-07-12)

## 선행 개념
- orchestration: 단계와 역할을 나누는 설계가 필요하다.
- loop-engineering: 반복과 종료 조건을 정해야 자동화가 폭주하지 않는다.
- agent-loop: agent가 필요한 경우와 workflow로 충분한 경우를 구분해야 한다.

## 후행 개념
- mcp-enabled-tool-project: 자동화 workflow가 외부 도구를 표준 protocol로 연결하는 프로젝트로 이어진다.
- private-ai-learning-site-project: 이 프로젝트의 ai-ops pipeline을 최종 사례로 설명하는 데 사용된다.

## AI 시대에서의 의미
AI 자동화의 품질은 모델 성능보다 workflow 설계에 크게 좌우된다. trigger, job, step, dependency, evaluation, tool boundary가 없는 자동화는 실패했을 때 어디서 멈춰야 할지 모른다. 바이브코딩에서는 AI에게 "계속 해"라고 시키기 전에, 어떤 상태에서 시작하고 어떤 evidence로 끝낼지 workflow로 고정해야 한다. (출처: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows, https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)

## 실무 활용
1. **CI workflow**: pull request event에서 lint, typecheck, test jobs를 실행하고 `needs`로 build 순서를 제어한다. (출처: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax, 확인: 2026-07-12)
2. **콘텐츠 파이프라인**: 수집, 검증, 생성, 통합, verify를 jobs와 dependency gate로 연결해 반복 작업을 자동화한다. (출처: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows, https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax, 확인: 2026-07-12)
3. **AI evaluator loop**: draft를 생성한 뒤 별도 evaluator가 criteria로 점검하고 feedback을 준다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
4. **Tool action approval**: function call 요청이 실제 write/delete/send action이면 앱이 permission과 approval을 검증한 뒤 실행한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-12)

```yaml
workflow_shape:
  trigger: pull_request
  jobs:
    collect: "자료 수집"
    verify:
      needs: collect
      gate: "score >= 80"
    integrate:
      needs: verify
      gate: "npm run verify"
```

## FAQ
Q: workflow와 agent는 같은가?
A: 아니다. Anthropic은 workflows를 predefined code paths, agents를 dynamically direct their own processes and tool usage로 구분한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)

Q: 모든 자동화를 agent로 만들면 더 똑똑한가?
A: 아니다. Anthropic은 simplest solution possible을 먼저 찾고 필요할 때 complexity를 올리라고 권장한다. 예측 가능한 작업은 workflow가 더 안정적일 수 있다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)

Q: GitHub Actions workflow에서 순서는 어떻게 보장하는가?
A: jobs는 기본적으로 parallel run하며, sequential dependency가 필요하면 `jobs.<job_id>.needs` keyword를 정의한다. (출처: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax, 확인: 2026-07-12)

## 자주 하는 실수
1. **trigger를 모호하게 둠**: 언제 실행되는지 불분명하다. 교정: event, schedule, manual trigger를 명시한다. (출처: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows, 확인: 2026-07-12)
2. **agent로 과설계**: 고정 순서 작업에 자율 agent를 붙여 비용과 불확실성을 늘린다. 교정: workflow로 충분한지 먼저 판단한다. (출처: https://www.anthropic.com/engineering/building-effective-agents, 확인: 2026-07-12)
3. **tool 실행을 모델에게 맡겼다고 착각**: 실제 실행은 application이 한다. 교정: tool call request, execution, output return 경계를 분리한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-12)

## 공식 출처
- Workflow definition and triggers — [GitHub Docs — Workflows](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows) (확인 날짜: 2026-07-12)
- Job dependency syntax — [GitHub Docs — Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) (확인 날짜: 2026-07-12)
- Workflow vs agent distinction — [Anthropic Engineering — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인 날짜: 2026-07-12)
- Agent escalation — [OpenAI Docs — Agents SDK](https://developers.openai.com/api/docs/guides/agents) (확인 날짜: 2026-07-12)
- Tool execution boundary — [OpenAI Docs — Function calling](https://developers.openai.com/api/docs/guides/function-calling) (확인 날짜: 2026-07-12)

## Quote Bank
- > "A workflow is a configurable automated process"
  - 출처: [GitHub Docs — Workflows](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows) (확인: 2026-07-12)
  - 맥락: workflow의 기본 정의를 설명할 때 사용한다.
- > "one or more jobs"
  - 출처: [GitHub Docs — Workflows](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows) (확인: 2026-07-12)
  - 맥락: workflow 구조를 jobs 단위로 설명할 때 사용한다.
- > "run in parallel by default"
  - 출처: [GitHub Docs — Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) (확인: 2026-07-12)
  - 맥락: jobs dependency가 필요한 이유를 설명할 때 사용한다.
- > "Workflows are systems where LLMs and tools are orchestrated through predefined code paths."
  - 출처: [Anthropic Engineering — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-12)
  - 맥락: workflow와 agent의 차이를 설명할 때 사용한다.
- > "dynamically direct their own processes and tool usage"
  - 출처: [Anthropic Engineering — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (확인: 2026-07-12)
  - 맥락: agent가 필요한 경우를 설명할 때 사용한다.
- > "Tool calls - requests from the model to use tools"
  - 출처: [OpenAI Docs — Function calling](https://developers.openai.com/api/docs/guides/function-calling) (확인: 2026-07-12)
  - 맥락: 자동화에서 모델 요청과 실제 도구 실행 경계를 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
