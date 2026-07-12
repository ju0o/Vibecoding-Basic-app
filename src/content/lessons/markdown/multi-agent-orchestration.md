## 한 줄 정의

Multi-agent orchestration은 여러 agent와 specialist capability 사이에서 누가 작업을 소유하고, 언제 넘겨주며, 최종 답변 책임을 누가 가지는지 설계하는 구조입니다. 핵심은 여러 agent를 동시에 실행하는 것이 아니라, 작업 ownership과 routing surface를 명확히 하는 것입니다.

하나의 agent가 모든 도구, 지침, 정책, 출력 형식을 동시에 가지면 prompt가 커지고 책임 경계가 흐려집니다. Orchestration은 이 문제를 specialist로 나누되, specialist가 대화 소유권을 가져갈지 아니면 manager 뒤에서 bounded capability로 남을지를 정합니다. ==Orchestration의 첫 질문은 "몇 명인가"가 아니라 "누가 최종 책임자인가"입니다.==

바이브코딩에서 이 개념은 매우 실용적입니다. 예를 들어 main agent가 전체 요구사항을 잡고, researcher가 근거를 찾고, reviewer가 위험을 보고, implementer가 수정안을 만들 수 있습니다. 그러나 이 구조가 효과적이려면 각 agent가 무엇을 담당하는지, 어떤 도구를 쓰는지, 결과를 누가 합성하는지 분명해야 합니다.

이 강의는 Orchestration을 도구 이름이나 마케팅 용어로 다루지 않습니다. OpenAI의 handoff와 agents-as-tools 구분, Anthropic의 orchestrator-workers workflow, manager/decentralized pattern을 바탕으로, 여러 agent를 어떻게 단순하고 추적 가능하게 묶을지 설명합니다.

## 왜 존재하는가

Agent가 단일 작업을 수행할 때는 하나의 loop로 충분할 수 있습니다. 모델이 목표를 평가하고, 도구를 호출하고, 결과를 받아 다시 판단합니다. 하지만 실제 작업은 종종 서로 다른 전문성을 요구합니다. 고객 문의 분류와 환불 정책 적용, 코드 탐색과 보안 리뷰, 문서 작성과 사실 검증은 모두 다른 도구와 판단 기준을 필요로 할 수 있습니다.

이때 하나의 agent에게 모든 역할을 넣으면 prompt가 복잡해집니다. "너는 researcher이자 reviewer이자 implementer이고, 상황에 따라 다른 정책을 적용하라"는 지시는 가능해 보이지만, 어떤 순간에 어떤 기준을 우선해야 하는지 흐려질 수 있습니다. OpenAI Agent definitions 문서는 specialist가 다른 tool, MCP surface, approval policy, guardrail, model, output style을 필요로 할 때 agent를 나눌 수 있다고 설명합니다.

그러나 나누기만 해서는 충분하지 않습니다. specialist가 최종 사용자에게 답해야 하는지, 아니면 main agent에게 내부 결과만 제공해야 하는지 결정해야 합니다. OpenAI Orchestration 문서는 specialist가 대화 소유권을 넘겨받는 handoff와, manager가 최종 답변 책임을 유지하는 agents-as-tools 패턴을 구분합니다.

이 구분이 없으면 multi-agent 시스템은 쉽게 혼란스러워집니다. 어떤 agent가 사용자에게 답해야 하는지, 어떤 agent가 내부 도구처럼 호출되는지, 어느 결과가 최종 판단인지 불분명해집니다. ==여러 agent의 품질은 agent 수가 아니라 responsibility boundary의 선명도에서 나옵니다.==

## 작동 원리

### 1. 먼저 final answer ownership을 정합니다

Orchestration의 첫 번째 설계 선택은 최종 답변 ownership입니다. 사용자가 "내 환불 요청을 처리해줘"라고 했을 때 billing specialist가 다음 응답을 직접 소유해야 할 수 있습니다. 반대로 사용자가 "이 코드 변경을 리뷰하고 요약해줘"라고 했을 때 reviewer는 내부 분석을 제공하고 main agent가 최종 답변을 합성할 수 있습니다.

이 차이가 handoff와 agents-as-tools를 나눕니다. Handoff는 specialist가 해당 branch의 다음 응답을 소유해야 할 때 사용합니다. Agents-as-tools는 manager가 final answer 책임을 유지하고 specialist를 bounded capability로 호출할 때 사용합니다.

final answer ownership은 단순 UI 문제가 아닙니다. ownership이 이동하면 conversation policy, tone, next action, user-facing responsibility도 이동합니다. 반대로 manager가 ownership을 유지하면 specialist 결과는 내부 근거가 되고, user-facing answer는 main agent가 조립합니다.

### 2. Specialist job을 좁게 만듭니다

OpenAI 문서는 routing surface를 읽기 쉽게 유지하기 위해 specialist job을 좁게 만들고 handoffDescription을 짧고 구체적으로 유지하라고 설명합니다. 이 말은 multi-agent 설계에서 매우 중요합니다. specialist가 넓으면 routing이 어려워집니다. "technical agent", "support agent", "general helper" 같은 이름은 서로 겹치기 쉽습니다.

좋은 specialist는 명확한 입력과 출력이 있습니다. "refund-policy-agent"는 환불 정책 판단을 담당하고, "security-reviewer"는 변경 파일에서 보안 위험을 찾고, "test-runner"는 테스트 실행과 실패 로그 분석을 맡습니다. 각 specialist가 좁을수록 main agent는 언제 호출해야 하는지 알기 쉽습니다.

좁은 job은 권한도 줄입니다. 환불 정책 agent는 결제 API write permission을 항상 가질 필요가 없을 수 있습니다. security reviewer는 Write/Edit이 없어도 됩니다. routing과 permission은 함께 설계해야 합니다.

### 3. Handoff는 대화 소유권 이전입니다

Handoff는 specialist가 다음 응답을 소유해야 할 때 적합합니다. 예를 들어 사용자의 문제가 billing으로 분류되었고, billing specialist가 정책과 절차에 따라 대화를 이어가야 한다면 control이 specialist agent로 이동합니다.

Handoff가 일어나면 main agent는 "도구를 호출한 것"이 아니라 "대화 branch를 넘긴 것"에 가깝습니다. 사용자는 specialist가 이어받은 답변을 보게 됩니다. 따라서 handoffDescription은 짧고 구체적이어야 합니다. main agent가 잘못 넘기면 사용자는 엉뚱한 specialist와 대화하게 됩니다.

Handoff를 남용하면 대화가 분절됩니다. 사용자는 왜 agent가 바뀌었는지 모를 수 있고, 이전 context가 충분히 전달되지 않으면 specialist가 다시 묻게 됩니다. Handoff는 specialist가 정말 user-facing ownership을 가져야 할 때만 쓰는 편이 좋습니다.

### 4. Agents as tools는 manager ownership 유지입니다

Agents-as-tools는 manager가 최종 답변을 유지하면서 specialist에게 내부 작업을 맡기는 방식입니다. OpenAI 문서가 말하는 bounded capability가 여기에 해당합니다. manager는 specialist를 호출해 분석, 요약, 리뷰, 계산을 얻고, 그 결과를 자신의 판단에 통합합니다.

이 방식은 바이브코딩에 자주 맞습니다. main agent가 전체 작업 목표와 사용자 의도를 유지하고, code reviewer나 researcher agent는 내부 결과만 제공합니다. 사용자는 main agent의 일관된 답변을 받습니다.

Agents-as-tools의 위험은 specialist 결과를 무비판적으로 붙여 넣는 것입니다. manager는 결과를 합성해야 합니다. 여러 specialist 결과가 충돌하면 어느 쪽이 더 근거가 강한지 판단해야 하고, 불확실한 부분은 사용자에게 투명하게 말해야 합니다.

### 5. Orchestrator-workers는 동적 분해입니다

Anthropic은 orchestrator-workers workflow를 central LLM이 task를 동적으로 분해하고 worker LLMs에 위임한 뒤 결과를 합성하는 구조로 설명합니다. 이 패턴은 subtasks를 미리 예측하기 어려운 작업에 적합합니다. 복잡한 코드 변경처럼 어떤 파일을 몇 개 수정해야 할지 입력에 따라 달라지는 경우가 여기에 해당합니다.

Prompt chaining이나 routing처럼 경로가 미리 정해진 workflow와 다르게, orchestrator-workers는 central LLM이 상황을 보고 작업을 나눕니다. 그래서 유연하지만, 더 많은 제어가 필요합니다. worker의 범위, 결과 형식, 합성 기준, 중단 조건이 없으면 결과가 산만해질 수 있습니다.

이 패턴은 "AI가 알아서 여러 명으로 나눠 일한다"가 아닙니다. central LLM도 설계된 manager입니다. 무엇을 위임할 수 있고, 어떤 결과를 받아야 하며, 언제 더 이상 worker를 늘리지 않을지 기준을 가져야 합니다.

### 6. Orchestration은 harness와 만납니다

여러 agent가 움직이면 trace, approval, recovery, run state가 중요해집니다. 어느 specialist가 어떤 tool을 호출했는지, 어느 handoff가 일어났는지, 어떤 결과가 최종 답변에 반영되었는지 기록해야 합니다. KB의 harness 문서는 handoffs, approvals, tracing, recovery, run state가 harness control plane의 소유 항목이라고 설명합니다.

즉 orchestration은 "누가 누구에게 넘기는가"이고, harness는 "그 넘김과 실행을 어떻게 통제하고 검증하는가"입니다. 두 개념은 분리되지만 붙어 있습니다. Orchestration이 복잡해질수록 harness 없이는 재현과 감사가 어려워집니다.

## 스펙과 세부

### Handoff와 agents-as-tools의 구분표

| 질문 | Handoff | Agents as tools |
|---|---|---|
| 최종 답변 소유자 | specialist | manager |
| specialist 역할 | 대화 branch 담당 | bounded capability |
| 사용자 체감 | agent가 이어받음 | main agent가 계속 답함 |
| 적합한 상황 | billing, refund, technical support처럼 specialist 응답이 필요한 경우 | review, summarize, classify, research처럼 내부 결과가 필요한 경우 |
| 주요 위험 | 잘못된 specialist로 넘김 | specialist 결과를 무비판적으로 합성 |

이 표는 제품별 API 세부가 아니라 사고 모델입니다. 실제 시스템에서는 SDK나 플랫폼마다 구현 방식이 다를 수 있지만, final answer ownership이라는 기준은 계속 사용할 수 있습니다.

### Specialist 설계 타입

```ts
type OrchestrationPattern = "handoff" | "agents-as-tools"

type Specialist = {
  name: string
  ownsFinalReply: boolean
  tools: string[]
}

const securityReviewer: Specialist = {
  name: "security-reviewer",
  ownsFinalReply: false,
  tools: ["Read", "Grep", "Glob"],
}

const billingSupport: Specialist = {
  name: "billing-support",
  ownsFinalReply: true,
  tools: ["ReadPolicy", "CreateSupportTicket"],
}

function choosePattern(agent: Specialist): OrchestrationPattern {
  return agent.ownsFinalReply ? "handoff" : "agents-as-tools"
}

console.log(choosePattern(securityReviewer))
```

이 코드는 공식 SDK를 재현하려는 예시가 아니라, ownership 기준을 코드처럼 생각하는 방법입니다. `ownsFinalReply`가 true이면 handoff에 가깝고, false이면 manager가 specialist 결과를 도구처럼 받아 합성합니다.

### Handoff description의 역할

Handoff description은 routing surface입니다. main agent는 이 설명을 보고 언제 넘길지 판단합니다. 너무 넓으면 잘못 넘기고, 너무 좁으면 필요한 순간에도 못 넘깁니다. "Handles customer issues"보다 "Handles refund eligibility questions and next-step support ticket creation"이 낫습니다.

이 원칙은 subagent description에도 이어집니다. description은 사람을 위한 소개글이 아니라 model routing을 돕는 계약입니다. multi-agent 시스템이 커질수록 이 계약의 품질이 전체 품질을 결정합니다.

### Manager pattern과 decentralized pattern

OpenAI practical guide는 multi-agent systems를 manager pattern과 decentralized pattern으로 설명합니다. manager pattern에서는 manager가 specialists를 tool call처럼 부릅니다. decentralized pattern에서는 agents가 agents에게 handoff합니다.

manager pattern은 중앙 통제가 강합니다. 사용자 경험이 일관되고, 최종 판단 책임이 명확합니다. decentralized pattern은 specialist가 직접 대화를 이어갈 수 있어 자연스럽지만, handoff 품질과 context 전달이 중요해집니다. 어느 쪽이 더 좋다는 문제가 아니라, 제품의 책임 구조가 어느 쪽에 맞는지의 문제입니다.

## 원문으로 읽기

> "Choose whether specialists take over the conversation"
>
> — specialist가 대화를 넘겨받을지 선택하라.
> [Orchestration and handoffs — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/orchestration)

이 문장은 orchestration의 시작점을 정확히 짚습니다. 많은 사람이 "agent를 어떻게 나눌까"부터 생각하지만, 먼저 정해야 할 것은 specialist가 conversation을 take over하는지입니다. 이 선택이 handoff와 agents-as-tools를 가릅니다.

> "Control moves to the specialist agent"
>
> — 제어권이 specialist agent로 이동한다.
> [Orchestration and handoffs — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/orchestration)

handoff는 내부 함수 호출이 아닙니다. control이 이동합니다. 그래서 handoff는 강한 행동입니다. 잘못 넘기면 사용자는 잘못된 agent와 대화하게 됩니다. 따라서 handoff는 routing description, context transfer, fallback을 함께 설계해야 합니다.

> "The manager keeps ownership of the reply"
>
> — manager가 답변 ownership을 유지한다.
> [Orchestration and handoffs — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/orchestration)

agents-as-tools 패턴의 핵심입니다. specialist가 일을 하더라도, user-facing answer는 manager가 책임집니다. 바이브코딩에서는 이 패턴이 특히 유용합니다. main agent가 전체 목표와 사용자 의도를 유지하고, specialist 결과를 내부 근거로 사용할 수 있기 때문입니다.

관련 원문(링크): [Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents)

orchestrator-workers 패턴은 고정 workflow와 다릅니다. central LLM이 상황을 보고 subtasks를 정합니다. 이 유연성은 복잡한 코드 변경이나 조사 작업에 강하지만, worker 범위와 결과 합성 기준이 없으면 산만해질 수 있습니다.

관련 원문(링크): [A practical guide to building AI agents — OpenAI](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)

이 표현은 manager pattern을 짧게 기억하게 해줍니다. manager는 specialist를 도구처럼 호출하지만, 책임까지 도구에 넘기지는 않습니다. 이 차이를 이해하면 multi-agent 설계의 절반은 잡은 것입니다.

## 실전에서

### 패턴 1: 리뷰와 구현을 분리합니다

코드 변경 작업에서 implementer와 reviewer를 분리할 수 있습니다. implementer는 수정안을 만들고, reviewer는 read-only tools로 변경 위험을 점검합니다. manager는 두 결과를 비교해 최종 답변을 작성합니다.

이 구조는 agents-as-tools에 가깝습니다. reviewer가 사용자에게 직접 답하지 않고, manager가 결과를 받아 합성합니다. 장점은 최종 답변이 일관되고, reviewer의 권한을 좁게 유지할 수 있다는 점입니다.

### 패턴 2: 고객 지원은 handoff가 더 적합할 수 있습니다

고객 문의가 billing, technical support, refund처럼 명확히 나뉘고 specialist가 사용자와 직접 대화해야 한다면 handoff가 적합할 수 있습니다. 이때 main agent는 routing을 담당하고, specialist가 다음 응답을 이어받습니다.

중요한 것은 context transfer입니다. specialist가 사용자의 상황을 다시 묻지 않도록 필요한 context를 전달해야 합니다. 동시에 민감 정보나 불필요한 history를 넘기지 않도록 제한해야 합니다.

### 패턴 3: 큰 리서치는 orchestrator-workers로 다룹니다

여러 출처를 cross-check해야 하는 research task는 central agent가 source별 worker를 만들고 결과를 합성할 수 있습니다. 각 worker는 특정 source나 관점을 조사하고, central agent는 중복과 충돌을 정리합니다.

이 패턴은 속도와 다양성을 얻지만, 검증 비용도 생깁니다. worker가 가져온 근거가 같은 출처를 반복하거나, 서로 모순될 수 있습니다. 따라서 central agent는 "무엇을 믿을지" 기준을 가져야 합니다.

### 작은 orchestration 설계 예시

```ts
type WorkerResult = {
  worker: string
  ownsFinalReply: boolean
  summary: string
  evidence: string[]
  uncertainty: string[]
}

type ManagerDecision = {
  finalOwner: "manager" | "specialist"
  nextStep: "answer" | "handoff" | "ask-human"
}

function decide(result: WorkerResult): ManagerDecision {
  if (result.ownsFinalReply) {
    return { finalOwner: "specialist", nextStep: "handoff" }
  }

  if (result.uncertainty.length > 0) {
    return { finalOwner: "manager", nextStep: "ask-human" }
  }

  return { finalOwner: "manager", nextStep: "answer" }
}
```

이 예시는 orchestration의 핵심 판단을 단순화합니다. specialist가 final reply를 소유해야 하면 handoff이고, 그렇지 않으면 manager가 답합니다. 불확실성이 크면 사람에게 묻거나 추가 검증을 해야 합니다.

## 한계와 트레이드오프

첫 번째 한계는 복잡도입니다. agent를 나누면 각 agent의 prompt, tools, permissions, output contract, trace를 관리해야 합니다. 단순한 작업에는 단일 agent나 fixed workflow가 더 낫습니다.

두 번째 한계는 routing 오류입니다. specialist description이 겹치거나 넓으면 main agent가 잘못 넘길 수 있습니다. 잘못된 handoff는 사용자 경험을 망치고, 잘못된 agents-as-tools 호출은 내부 판단을 흐립니다.

세 번째 한계는 context 전달입니다. Handoff에서는 specialist가 필요한 context를 받아야 하지만, 너무 많은 context를 받으면 또다시 context pollution이 생깁니다. 필요한 정보만 넘기는 설계가 필요합니다.

네 번째 한계는 책임 분산입니다. 여러 agent가 일하면 실패했을 때 원인을 찾기 어렵습니다. worker가 잘못 조사했는지, manager가 잘못 합성했는지, handoff가 잘못되었는지 trace가 필요합니다. 여기서 harness engineering이 중요해집니다.

다섯 번째 한계는 "복잡한 구조 선호"입니다. Anthropic의 agent 설계 원칙은 단순한 해결책부터 시작하라는 방향입니다. multi-agent orchestration은 강력하지만, 모든 문제의 기본값이 되어서는 안 됩니다. ==오케스트레이션은 복잡한 일을 단순하게 만드는 경우에만 가치가 있습니다.==

## 더 읽기

먼저 OpenAI의 Orchestration and handoffs 문서를 읽으며 handoff와 agents-as-tools의 차이를 잡으세요. 그 다음 Anthropic의 Building effective agents에서 orchestrator-workers workflow를 읽으면 동적 분해 패턴을 이해할 수 있습니다. 마지막으로 Sandbox Agents나 observability 문서를 읽으면 orchestration이 harness와 trace로 이어지는 이유가 보입니다.

- [Orchestration and handoffs — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/orchestration)
- [Agent definitions — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/define-agents)
- [Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- [A practical guide to building AI agents — OpenAI](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
- [How the agent loop works — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/agent-loop)
- [Sandbox Agents — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/sandboxes)

읽을 때는 "이 specialist가 사용자에게 직접 답해야 하는가, 아니면 manager에게 근거만 줘야 하는가"를 계속 물어보세요. 그 질문이 handoff와 agents-as-tools를 나누는 가장 실용적인 기준입니다.

