## 한 줄 정의

Harness Engineering은 agent 실행을 둘러싼 제어면, 권한, 샌드박스, 관찰, 평가 장치를 설계하는 작업입니다. OpenAI Sandbox Agents 문서는 harness를 model calls, tool routing, handoffs, approvals, tracing, recovery, run state를 소유하는 control plane으로 설명합니다. 쉽게 말해 harness는 agent가 무엇을 할 수 있고, 어디에서 실행되며, 어떤 증거로 결과를 믿을지 정하는 바깥 구조입니다.

이 개념이 중요한 이유는 agent가 단순 API 호출이 아니기 때문입니다. agent는 여러 turn 동안 도구를 호출하고, 파일을 읽거나 쓰고, 테스트를 실행하고, 환경 상태를 바꿀 수 있습니다. ==Harness Engineering은 "AI가 일하게 하는 법"이 아니라 "AI가 일한 결과를 운영 가능한 상태로 만드는 법"입니다.==

바이브코딩에서는 harness가 없으면 agent의 최종 발화를 그대로 믿게 됩니다. "수정했습니다"라는 말이 실제 테스트 통과를 의미하는지, 어떤 파일을 바꿨는지, 위험한 명령은 차단되었는지, 실패하면 어디서 복구할 수 있는지 알기 어렵습니다. harness는 이런 질문에 답하기 위해 control plane과 execution plane을 분리합니다.

이 강의에서는 sandbox, guardrails, human review, traces, hooks, permissions, evaluation harness를 하나의 구조로 연결해 봅니다. 목표는 용어를 외우는 것이 아니라, agent 시스템을 만들 때 "모델", "실행 환경", "승인", "기록", "평가"가 왜 분리되어야 하는지 이해하는 것입니다.

## 왜 존재하는가

초기의 AI 사용은 주로 입력을 보내고 답변을 받는 형태였습니다. 이때 위험은 잘못된 답변이나 환각에 집중되었습니다. 하지만 agent는 다릅니다. agent는 도구를 사용하고, 여러 turn 동안 환경 상태를 바꾸며, 중간 결과를 바탕으로 다음 행동을 정합니다. 이 구조에서는 "답변이 그럴듯한가"만으로는 충분하지 않습니다.

Anthropic의 agent eval 문서는 agent가 여러 turn 동안 도구를 사용하고 environment state를 수정하기 때문에 mistakes can propagate and compound한다고 설명합니다. agent의 한 번의 실수는 단순한 문장 오류로 끝나지 않을 수 있습니다. 잘못된 파일 수정, 잘못된 명령 실행, 잘못된 근거 수집이 다음 turn의 기반이 될 수 있습니다.

OpenAI Sandbox Agents 문서는 harness와 compute boundary를 나눕니다. harness는 trusted infrastructure에서 control plane을 담당하고, sandbox는 filesystem, shell, package, ports, snapshot 같은 execution plane을 담당할 수 있습니다. 이 구분은 agent 시스템의 책임을 선명하게 만듭니다.

이런 분리가 없으면 세 가지 문제가 생깁니다. 첫째, 권한이 흐려집니다. 모델이 할 수 있는 말과 실행 환경이 허용하는 행동이 섞입니다. 둘째, 감사가 어렵습니다. 어떤 tool call이 어떤 결과를 낳았고 어떤 handoff가 일어났는지 추적하기 어렵습니다. 셋째, 복구가 어렵습니다. 실패한 run을 어디서 되돌리거나 재현해야 하는지 알 수 없습니다.

Harness Engineering은 이 문제를 해결하기 위해 등장한 실행 설계 관점입니다. agent loop와 orchestration이 "무엇을 반복하고 누구에게 넘기는가"를 다룬다면, harness는 "그 실행을 어디서 제한하고, 어떻게 기록하고, 무엇으로 평가하는가"를 다룹니다. ==agent가 강력해질수록 harness는 선택 기능이 아니라 운영 조건이 됩니다.==

## 작동 원리

### 1. Harness는 control plane을 맡습니다

OpenAI 문서에 따르면 harness는 model calls, tool routing, handoffs, approvals, tracing, recovery, run state를 소유하는 control plane입니다. control plane이라는 표현이 중요합니다. harness는 agent가 직접 작업하는 파일 시스템이나 shell 그 자체가 아니라, agent 실행의 흐름과 규칙을 관리하는 층입니다.

예를 들어 agent가 코드를 수정하는 작업을 한다고 해봅시다. harness는 어떤 모델 호출을 보낼지, 어떤 도구를 노출할지, 위험 행동에는 승인 절차를 둘지, 어떤 trace를 남길지, 실패하면 어떤 run state로 복구할지 관리합니다. agent의 "생각"을 대신하는 것이 아니라, agent가 행동할 수 있는 경계와 기록 방식을 정합니다.

이 관점에서 harness는 orchestration과도 연결됩니다. 여러 specialist agent가 handoff하거나 manager가 agents-as-tools 방식으로 specialist를 호출한다면, harness는 그 handoff와 run state를 기록하고 통제해야 합니다. 여러 agent가 움직일수록 control plane이 더 중요해집니다.

### 2. Sandbox는 execution plane을 맡습니다

Sandbox는 agent가 실제로 작업하는 격리된 실행 환경입니다. KB는 sandbox가 filesystem, shell, installed packages, mounted data, exposed ports, snapshots, controlled external access를 제공하는 isolated execution environment라고 정리합니다.

harness와 sandbox의 차이를 명확히 해야 합니다. harness는 "무엇을 허용하고 기록할 것인가"를 관리하고, sandbox는 "어디에서 실행할 것인가"를 제공합니다. agent가 파일을 수정하고 테스트를 실행해야 한다면 sandbox workspace가 필요할 수 있습니다. agent의 답변이 prompt context만이 아니라 sandbox workspace에서 수행한 작업에 의존할 때 sandbox가 중요해집니다.

이 분리는 안전과 재현성을 함께 줍니다. sandbox는 파일 시스템과 shell 같은 실행 자원을 격리합니다. snapshot은 실행 전후 상태를 비교하거나 복구하는 데 도움이 됩니다. 하지만 sandbox만으로 충분하지는 않습니다. sandbox 안에서 어떤 tool call이 허용되는지, 어떤 행동은 사람이 승인해야 하는지, 결과를 어떻게 trace할지는 harness가 정해야 합니다.

### 3. Guardrails와 human review는 승인 경계를 만듭니다

OpenAI guardrails 문서는 guardrails가 input, output, tool behavior를 자동 검증하고, human review가 sensitive action에서 run을 pause해 approve 또는 reject를 받을 수 있다고 설명합니다. Harness Engineering에서 guardrails는 validation boundary이고 human review는 approval boundary입니다.

자동 guardrail은 빠르게 반복되는 루프에 적합합니다. 입력이 정책에 맞는지, 출력이 형식에 맞는지, 도구 행동이 허용 범위를 넘지 않는지 확인할 수 있습니다. human review는 자동 판단만으로는 부족한 민감 행동에 적합합니다. 예를 들어 중요한 파일 삭제, 배포, 결제 관련 변경처럼 결과가 큰 행동은 사람 승인 없이 진행하지 않도록 설계할 수 있습니다.

중요한 점은 guardrails가 harness 전체가 아니라는 것입니다. guardrails는 validation과 approval boundary를 담당하지만, harness는 tool routing, tracing, recovery, run state까지 포함합니다. ==guardrail은 harness 안의 안전 장치이지, harness 전체를 대체하지 않습니다.==

### 4. Hooks는 실행 단계에 제어점을 넣습니다

Claude Agent SDK hooks는 PreToolUse, PostToolUse, Stop, SubagentStart 같은 실행 단계에서 allow, block, modify, inject context 결정을 반환할 수 있습니다. Hook은 harness가 agent loop 중간에 개입하는 실무적인 방법입니다.

예를 들어 `PreToolUse` hook은 위험한 shell command를 차단할 수 있습니다. `PostToolUse` hook은 실행 결과를 trace에 기록하거나 다음 context에 들어갈 정보를 정리할 수 있습니다. `SubagentStart` 같은 단계는 subagent가 시작될 때 권한이나 목적을 확인하는 데 쓰일 수 있습니다. KB 범위 안에서 보면, hook은 agent 실행의 event boundary입니다.

Hook은 prompt와 다릅니다. prompt는 모델에게 행동 기준을 알려주지만, hook은 실행 지점에서 decision을 반환할 수 있습니다. 따라서 반복 루프와 tool-calling agent에서는 prompt-only safety보다 hook 기반 control이 더 분명한 실행 경계를 만듭니다.

### 5. Permissions는 행동 공간을 줄입니다

Claude Code permission rules에는 allow, ask, deny가 있고 deny rules는 다른 level의 allow보다 우선합니다. 이 deny-first precedence는 권한 설계에서 중요합니다. 어떤 규칙이 허용하더라도 더 높은 금지 규칙이 있으면 위험 행동을 막을 수 있어야 합니다.

Permissions는 보안 설정이면서 품질 설정입니다. agent가 할 수 있는 행동이 너무 많으면 routing과 debugging이 어려워집니다. 읽기 전용 리뷰 작업에는 수정 권한이 필요하지 않습니다. 테스트 실행 작업에는 shell이 필요할 수 있지만, 배포 명령까지 필요하지는 않을 수 있습니다.

Harness Engineering은 permissions를 prompt 뒤에 붙은 주의사항으로 보지 않습니다. permissions는 agent의 실행 공간을 정의하는 control surface입니다. 특히 여러 agent가 있는 orchestration에서는 specialist마다 다른 permission을 줄 수 있어야 합니다.

### 6. Traces는 디버깅과 평가의 재료가 됩니다

OpenAI integrations and observability 문서는 traces를 workflow run debugging과 agent workflow evaluation examples에 사용한다고 설명합니다. Trace는 단순 로그가 아닙니다. 어떤 model call이 있었고, 어떤 tool routing이 일어났고, 어떤 approval이 필요했고, 어떤 결과가 나왔는지 연결해 보여주는 실행 기록입니다.

Trace가 없으면 agent 실패를 해석하기 어렵습니다. 잘못된 결과가 나왔을 때 모델 판단이 틀렸는지, tool result가 잘못되었는지, handoff가 엉뚱했는지, permission이 너무 넓었는지 구분할 수 없습니다. Trace는 한 run을 이해하는 데 필요하고, 안정화된 뒤에는 eval example로도 쓰입니다.

바이브코딩 학습에서도 trace 사고는 중요합니다. agent가 "완료"라고 말한 순간만 보지 말고, 어떤 경로로 완료에 도달했는지 봐야 합니다. 그래야 다음에 같은 작업을 더 안정적으로 만들 수 있습니다.

### 7. Evaluation harness는 transcript와 outcome을 나눕니다

Anthropic은 evaluation harness를 evals를 end-to-end로 실행하는 infrastructure라고 설명합니다. KB에 따르면 evaluation harness는 tasks를 실행하고, trials를 기록하고, graders로 outputs와 outcomes를 평가하고, aggregate results를 만듭니다.

여기서 transcript와 outcome의 구분이 중요합니다. Transcript는 trial의 complete record이고, outcome은 trial 끝의 final environment state입니다. agent가 대화에서 성공처럼 말해도, 실제 파일 상태나 테스트 결과가 실패일 수 있습니다. 그러므로 최종 발화만 평가하면 안 됩니다.

Harness Engineering은 이 평가 구조와 연결됩니다. agent harness가 실행을 가능하게 하는 scaffold라면, evaluation harness는 그 실행이 실제로 좋은지 end-to-end로 평가하는 infrastructure입니다. 제품 수준에서는 둘 다 필요합니다. 하나는 실행을 통제하고, 다른 하나는 품질을 측정합니다.

## 스펙과 세부

### Control plane과 execution plane

Harness Engineering을 이해할 때 가장 중요한 구분은 control plane과 execution plane입니다.

| 영역 | 담당 | 예시 |
|---|---|---|
| Control plane | 실행 흐름과 정책 | model calls, tool routing, handoffs, approvals, tracing, recovery, run state |
| Execution plane | 실제 작업 환경 | filesystem, shell, packages, mounted data, exposed ports, snapshots |

이 표는 OpenAI Sandbox Agents 문서의 구분을 교육용으로 정리한 것입니다. control plane은 trusted infrastructure에 가깝고, execution plane은 sandbox compute에 가깝습니다. 둘을 분리해야 "어떤 행동이 허용되었는가"와 "그 행동이 어디서 실행되었는가"를 따로 볼 수 있습니다.

### Harness boundary 타입으로 생각하기

```ts
type HarnessBoundary = {
  controlPlane: ["tool-routing", "approvals", "tracing", "run-state"]
  executionPlane: ["filesystem", "shell", "packages", "ports"]
}

const codingHarness: HarnessBoundary = {
  controlPlane: ["tool-routing", "approvals", "tracing", "run-state"],
  executionPlane: ["filesystem", "shell", "packages", "ports"],
}

console.log(codingHarness.controlPlane.includes("approvals"))
```

이 코드는 공식 SDK 타입이 아니라, harness 사고를 코드처럼 표현한 예시입니다. agent 시스템을 설계할 때 "이 기능은 control plane인가, execution plane인가"를 묻는 습관이 중요합니다.

### guardrails, approvals, hooks의 차이

Guardrails는 input, output, tool behavior를 자동 검증합니다. Human review는 sensitive action에서 run을 pause하고 approve 또는 reject를 받습니다. Hooks는 agent execution의 여러 stage에서 allow, block, modify, inject context 결정을 넣을 수 있습니다.

세 개는 겹쳐 보이지만 역할이 다릅니다. Guardrail은 검증 규칙입니다. Approval은 사람의 결정 지점입니다. Hook은 실행 이벤트에 연결된 개입 지점입니다. 실무 harness에서는 세 가지가 함께 쓰일 수 있습니다.

예를 들어 shell command를 실행하기 전에 hook이 command를 검사하고, guardrail이 tool behavior 정책을 확인하며, 민감 command는 human review로 pause할 수 있습니다. 이 구조는 prompt만으로 위험 행동을 막는 것보다 추적 가능하고 일관적입니다.

### permissions의 deny-first 사고

Claude Code permission rules에서 deny rules는 다른 level의 allow보다 우선합니다. 이 원칙은 agent 환경에서 중요합니다. 여러 설정이 겹칠 때 "어딘가에서 허용했으니 가능"이 아니라 "명시적으로 금지한 것은 금지가 이긴다"가 되어야 위험 행동을 안정적으로 막을 수 있습니다.

실무적으로는 읽기 전용 agent, 테스트 실행 agent, 배포 agent를 서로 다른 permission boundary로 나누는 방식이 좋습니다. 모든 agent에게 모든 권한을 주고 prompt로만 구분하면 실패 시 원인 추적이 어려워집니다.

### trace와 eval의 연결

Trace는 run 하나를 이해하기 위한 기록이고, evaluation harness는 여러 trial을 실행하고 aggregate results를 만드는 infrastructure입니다. 안정화된 trace는 high-signal examples로 eval에 쓰일 수 있습니다. 이 연결이 중요합니다. 관찰 가능성이 없으면 평가 데이터도 약해지고, 평가가 약하면 개선 방향도 흐려집니다.

따라서 harness를 설계할 때 "나중에 어떤 evidence로 이 agent를 평가할 것인가"를 함께 생각해야 합니다. tool call 결과, approval decision, final environment state, grader outcome이 모두 평가 재료가 될 수 있습니다.

## 원문으로 읽기

> "The harness is the control plane around the model"
>
> — harness는 모델을 둘러싼 control plane이다.
> [Sandbox Agents — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/sandboxes)

이 문장이 Harness Engineering의 중심입니다. harness는 모델 자체도 아니고 sandbox 그 자체도 아닙니다. 모델 주변에서 tool routing, approvals, tracing, recovery, run state를 관리하는 제어면입니다. 이 구분을 잡으면 agent 시스템을 API 호출이 아니라 운영 구조로 볼 수 있습니다.

> "Use a sandbox when the agent’s answer depends"
>
> — agent의 답변이 의존할 때 sandbox를 사용하라.
> [Sandbox Agents — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/sandboxes)

이 인용은 sandbox가 언제 필요한지 보여줍니다. agent의 답변이 단순 prompt context가 아니라 workspace에서 수행한 작업에 의존한다면, 그 작업을 격리하고 재현할 실행 환경이 필요합니다. 코드 수정, 테스트 실행, 파일 분석 같은 작업이 여기에 해당합니다.

> "Guardrails validate input, output, or tool behavior automatically."
>
> — guardrails는 input, output, tool behavior를 자동으로 검증한다.
> [Guardrails and human review — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)

guardrails의 범위를 정확히 보여주는 문장입니다. guardrail은 단지 출력 필터가 아닙니다. 입력, 출력, 도구 행동을 모두 검증할 수 있는 boundary입니다. 그러나 자동 검증만으로 부족한 행동은 human review와 approval로 넘어가야 합니다.

관련 원문(링크): [Integrations and observability — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/integrations-observability)

trace는 디버깅과 평가 예시라는 두 일을 연결합니다. 하나의 run을 이해하는 기록은 나중에 agent workflow evaluation의 좋은 사례가 될 수 있습니다. 이 연결 때문에 observability는 출시 후 모니터링만의 문제가 아니라 개발 중 품질 개선의 재료입니다.

관련 원문(링크): [Demystifying evals for AI agents — Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

이 문장은 eval을 단순 점수표가 아니라 실행 infrastructure로 보게 합니다. agent를 평가하려면 task를 실행하고, trial을 기록하고, transcript와 outcome을 구분하고, grader로 결과를 판단해야 합니다. harness 없이 agent 품질을 반복적으로 개선하기 어려운 이유입니다.

## 실전에서

### 패턴 1: 코드 수정 sandbox

agent가 파일을 읽고 쓰고 테스트를 실행해야 한다면 sandbox가 필요할 수 있습니다. 이때 harness는 어떤 도구가 허용되는지, 어떤 command는 승인되어야 하는지, 테스트 결과를 어디에 기록할지 정합니다. sandbox는 실제 파일 시스템과 shell을 제공합니다.

```ts
type AgentRunRecord = {
  runId: string
  sandboxId: string
  toolsAllowed: string[]
  approvalsRequired: string[]
  traceUrl?: string
  outcome: "passed" | "failed" | "needs-human"
}

const run: AgentRunRecord = {
  runId: "run_001",
  sandboxId: "sandbox_001",
  toolsAllowed: ["Read", "Edit", "Bash"],
  approvalsRequired: ["deploy", "delete-env"],
  traceUrl: "trace://run_001",
  outcome: "needs-human",
}

console.log(`${run.runId}: ${run.outcome}`)
```

이 코드는 특정 플랫폼 타입이 아니라 run state를 생각하는 예시입니다. agent 작업은 "대화"가 아니라 run으로 기록되어야 복구와 평가가 가능합니다.

### 패턴 2: 위험 행동 승인 경계

민감한 작업에서는 human review를 둡니다. 배포, 삭제, secret 수정, 외부 시스템 변경처럼 결과가 큰 행동은 자동으로 진행하지 않고 pause해야 합니다. KB는 human review가 sensitive action에서 run을 pause해 approve 또는 reject를 받을 수 있다고 설명합니다.

이때 중요한 것은 승인 지점을 너무 늦게 두지 않는 것입니다. 위험 명령이 실행된 뒤 승인하는 것은 의미가 약합니다. `PreToolUse` 같은 hook 단계에서 위험 행동을 감지하고, 필요하면 human review로 넘기는 구조가 더 안전합니다.

### 패턴 3: trace 기반 디버깅

agent가 실패했을 때 최종 답변만 보면 원인을 알 수 없습니다. trace를 보면 model call, tool routing, approval, tool result, handoff, run state를 따라갈 수 있습니다. 어떤 단계에서 잘못된 판단이 들어갔는지 확인할 수 있습니다.

예를 들어 agent가 테스트를 통과했다고 말했는데 실제 build가 실패했다면, trace에서 테스트 명령이 실제로 실행되었는지, 어떤 output을 받았는지, 그 output을 agent가 어떻게 해석했는지 확인해야 합니다. 이 과정이 없으면 실패가 prompt 문제인지, 도구 문제인지, 환경 문제인지 구분하기 어렵습니다.

### 패턴 4: evaluation harness로 품질을 반복 측정

agent 시스템을 운영하려면 한 번의 성공 사례보다 반복 평가가 필요합니다. evaluation harness는 task를 실행하고, trial을 기록하고, grader로 outputs와 outcomes를 평가합니다. 여기서 중요한 것은 transcript와 outcome을 분리하는 것입니다.

agent가 "완료했습니다"라고 말한 transcript가 있어도 outcome이 실패라면 성공이 아닙니다. 코드 작업이라면 테스트 통과, 파일 diff, 빌드 결과가 outcome의 일부가 됩니다. 문서 작업이라면 인용 정확성, 섹션 구조, 출처 확인 결과가 outcome의 일부가 될 수 있습니다.

## 한계와 트레이드오프

첫 번째 한계는 복잡도입니다. Harness를 제대로 만들려면 tool routing, permissions, sandbox, approvals, traces, recovery, eval을 생각해야 합니다. 간단한 질문 응답에 이 모든 구조를 붙이면 과합니다. agent가 실제 환경을 바꾸는 작업부터 harness가 중요해집니다.

두 번째 한계는 sandbox에 대한 과신입니다. sandbox는 execution isolation을 제공하지만, control plane governance를 대신하지 않습니다. sandbox 안에서도 위험한 명령, 잘못된 tool routing, 불충분한 trace가 있을 수 있습니다. sandbox와 harness를 구분해야 합니다.

세 번째 한계는 guardrails에 대한 과신입니다. Guardrails는 input, output, tool behavior를 자동 검증하지만, 모든 실무 판단을 자동화할 수는 없습니다. sensitive action은 human review가 필요할 수 있고, 최종 품질은 outcome 평가로 확인해야 합니다.

네 번째 한계는 trace 비용입니다. trace를 잘 남기면 디버깅과 평가에 도움이 되지만, 모든 세부를 무제한으로 저장하면 관리 부담이 생깁니다. 어떤 event와 outcome이 품질 판단에 필요한지 정해야 합니다.

다섯 번째 한계는 evaluation harness 설계의 어려움입니다. Anthropic 문서가 설명하듯 agent eval은 multi-turn state와 environment outcome을 다룹니다. 단일 답변 채점보다 복잡합니다. 그러나 이 복잡함을 피하면 agent가 실제로 잘 작동하는지 알기 어렵습니다.

마지막으로 harness는 agent의 품질을 자동으로 보장하지 않습니다. harness는 좋은 실행 경계와 증거를 제공합니다. 좋은 목표 정의, 좁은 tool surface, 적절한 loop engineering, 품질 좋은 eval이 함께 있어야 합니다. ==Harness Engineering은 AI를 믿기 위한 장치가 아니라, 믿을 수 있는지 확인하기 위한 장치입니다.==

## 더 읽기

먼저 OpenAI의 Sandbox Agents 문서를 읽어 harness와 sandbox compute의 차이를 잡으세요. 그 다음 Guardrails and human review로 validation과 approval boundary를 보고, Integrations and observability에서 traces가 디버깅과 평가에 어떻게 이어지는지 확인하세요. Claude hooks와 permissions 문서는 실제 실행 제어점을 이해하는 데 좋습니다. 마지막으로 Anthropic의 Demystifying evals for AI agents를 읽으면 evaluation harness와 agent harness의 차이를 이해할 수 있습니다.

- [Sandbox Agents — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/sandboxes)
- [Guardrails and human review — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)
- [Integrations and observability — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agents/integrations-observability)
- [Intercept and control agent behavior with hooks — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/hooks)
- [Configure permissions — Claude Code Docs](https://code.claude.com/docs/en/permissions)
- [Configure the sandboxed Bash tool — Claude Code Docs](https://code.claude.com/docs/en/sandboxing)
- [Demystifying evals for AI agents — Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

읽는 동안 계속 한 가지 질문을 붙잡으세요. "이 agent의 실행에서 control plane은 무엇을 책임지고, execution plane은 무엇을 책임지는가?" 이 질문이 보이면 harness, sandbox, guardrails, traces, eval이 흩어진 용어가 아니라 하나의 운영 구조로 묶입니다.
