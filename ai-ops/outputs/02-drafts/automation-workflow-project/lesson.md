## 한 줄 정의

자동화 Workflow 프로젝트는 trigger가 발생했을 때 하나 이상의 job을 정해진 순서나 의존 관계로 실행하고, 필요한 경우 LLM과 tool을 미리 정의된 code path 안에서 orchestration해 반복 가능한 작업을 처리하는 시스템입니다. 자동화는 "AI가 알아서 다 하게 한다"가 아니라, 어떤 입력에서 어떤 단계가 실행되고 어떤 조건에서 멈추며 어떤 증거를 남기는지 설계하는 일입니다. ==workflow의 핵심은 자유도가 아니라 예측 가능성이고, agent의 핵심은 필요한 경우 동적으로 process와 tool usage를 조정하는 능력==입니다.

이 강의는 project-textbook 모듈의 네 번째 강의입니다. 앞의 AI 챗봇 프로젝트에서 tool calling과 agent 확장 가능성을 봤다면, 여기서는 자동화가 언제 workflow여야 하고 언제 agent가 필요한지 구분합니다. GitHub Actions의 workflow, jobs, dependency, parallel execution 개념은 일반 자동화 설계에도 좋은 기준을 제공합니다. Anthropic의 workflow/agent 구분은 LLM 자동화에서 미리 정한 경로와 동적 의사결정의 차이를 설명합니다.

자동화 workflow 프로젝트는 CI/CD만을 뜻하지 않습니다. 콘텐츠 검수, 문서 변환, 이슈 triage, 교재 release 준비, 테스트 실행, 보고서 생성처럼 반복되는 작업이 모두 후보가 됩니다. 다만 자동화가 실제로 유용하려면 job 경계, 실패 처리, tool 실행 권한, 결과 기록이 분명해야 합니다.

## 왜 존재하는가

사람이 반복해서 하는 작업은 실수와 피로를 만듭니다. 매번 같은 파일을 확인하고, 같은 테스트를 돌리고, 같은 보고서를 만들고, 같은 조건에서 다음 단계로 넘기는 일은 자동화하기 좋습니다. Workflow는 이런 반복 작업을 configurable automated process로 만들기 위해 존재합니다.

그러나 자동화가 무조건 좋은 것은 아닙니다. 절차가 불분명한 상태에서 자동화하면 실수가 더 빨리 반복됩니다. 어떤 job이 먼저 실행되어야 하는지, 어떤 실패가 전체를 멈춰야 하는지, 어떤 tool을 실행해도 되는지 정하지 않으면 workflow는 편리한 도구가 아니라 위험한 버튼이 됩니다.

AI 시대에는 이 문제가 더 커집니다. LLM은 요약, 분류, 초안 작성, tool call 요청을 할 수 있습니다. 하지만 LLM을 workflow에 넣는 순간 자동화는 외부 시스템과 data에 접근할 가능성을 갖습니다. OpenAI function calling 문맥에서 tool call은 모델이 tool 사용을 요청하는 것입니다. 이 요청과 실제 tool 실행을 분리하지 않으면 예측 불가능한 자동화가 됩니다.

Anthropic의 workflow와 agent 구분은 여기서 중요합니다. Workflows는 LLM과 tool이 predefined code path를 따라 orchestration되는 시스템입니다. Agents는 process와 tool usage를 동적으로 지시할 수 있습니다. ==자동화 설계의 첫 질문은 "agent를 쓸까"가 아니라 "이 작업은 미리 정한 경로로 충분한가, 아니면 동적 판단이 필요한가"입니다==.

## 작동 원리

### 1. trigger가 workflow를 시작한다

Workflow는 어떤 사건으로 시작됩니다. GitHub Actions에서는 push, pull request, schedule, manual dispatch 같은 trigger를 떠올릴 수 있습니다. 일반 자동화 프로젝트에서도 trigger는 중요합니다. 사용자가 버튼을 누르는가. 매일 정해진 시간에 실행되는가. 새 파일이 들어오면 실행되는가. PR이 열리면 실행되는가.

Trigger가 명확해야 workflow의 책임이 정해집니다. 예를 들어 "매일 오전 stale KB를 검사한다"는 schedule trigger이고, "lesson draft가 생성되면 QA scan을 실행한다"는 file state trigger입니다. Trigger가 흐리면 workflow가 언제 실행되어야 하는지, 중복 실행을 어떻게 막을지 알 수 없습니다.

### 2. job으로 작업 단위를 나눈다

GitHub workflow는 하나 이상의 job을 갖습니다. Job은 자동화의 실행 단위입니다. Build, test, lint, generate report, upload artifact처럼 단계별 책임을 분리합니다. 하나의 큰 job에 모든 것을 넣으면 실패 지점이 흐리고, 재사용과 병렬화가 어렵습니다.

자동화 프로젝트에서도 job 경계가 중요합니다. "수집", "검증", "통합", "릴리스 노트 생성"을 각각 job으로 나누면 어떤 단계가 실패했는지 알 수 있습니다. AI가 포함된 workflow라면 "LLM 요약 생성"과 "공식 출처 대조"를 같은 job에 섞지 않는 것이 좋습니다. 검증 가능한 단계와 생성 단계가 섞이면 결과를 믿기 어렵습니다.

### 3. job dependency를 명시한다

GitHub workflow syntax에서 jobs는 기본적으로 병렬 실행될 수 있습니다. 이 사실은 자동화 설계에서 매우 중요합니다. Build가 끝나기 전에 test가 실행되면 안 되거나, QA report가 생성되기 전에 release note가 만들어지면 안 되는 경우에는 dependency를 명시해야 합니다.

Workflow Dependency Graph는 job들이 어떤 순서로 실행되어야 하는지 나타냅니다. 예를 들어 `collect -> verify -> integrate -> release-note`는 순차 실행입니다. `lint`와 `typecheck`는 같은 source state를 기준으로 병렬 실행할 수 있습니다. ==workflow가 틀리는 흔한 이유는 job이 있다는 사실이 아니라, job 사이의 dependency가 암묵적으로 남아 있기 때문==입니다.

### 4. predefined code path로 LLM과 tool을 orchestration한다

LLM workflow는 LLM이 들어간다고 해서 곧바로 agent가 아닙니다. Anthropic의 표현처럼 workflows는 LLM과 tools가 predefined code path를 따라 orchestration되는 시스템입니다. 예를 들어 "문서를 읽고 요약 초안을 만든 뒤, 인용문이 Quote Bank에 있는지 검사하고, 실패하면 report를 남긴다"는 미리 정한 경로입니다.

이 구조의 장점은 예측 가능성입니다. 어떤 단계에서 LLM을 쓰고, 어떤 단계에서 deterministic script를 쓰고, 어떤 실패가 다음 단계로 넘어가지 못하게 하는지 정할 수 있습니다. 교재 파이프라인에서도 P-01, P-02, P-04, P-05처럼 단계가 나뉘어 있는 이유가 여기에 있습니다.

### 5. tool call request와 tool execution을 분리한다

OpenAI function calling 문맥에서 tool call은 모델이 tool 사용을 요청하는 것입니다. Workflow에서는 이 요청을 그대로 실행하지 않습니다. 먼저 schema validation, permission check, allowlist, dry run 가능 여부를 확인합니다. Tool을 실행하는 주체는 workflow runtime이지 모델이 아닙니다.

예를 들어 LLM이 "deploy를 실행하라"는 tool call을 요청해도, workflow policy가 P-09 배포를 Fable만 수행하도록 정했다면 Codex 자동화는 실행하지 않아야 합니다. Tool boundary는 사람의 운영 정책을 코드 경로 안에 넣는 장치입니다. AI가 말한 행동과 실제 시스템 행동 사이에는 항상 workflow guard가 있어야 합니다.

### 6. agent는 동적 판단이 필요할 때만 선택한다

Agent는 process와 tool usage를 동적으로 지시할 수 있습니다. 이 능력은 복잡한 문제 해결에 유용하지만, 반복 가능한 운영 절차에서는 과할 수 있습니다. "PR마다 lint, test, build를 실행한다"는 workflow입니다. "실패 로그를 읽고 원인을 가설별로 나누어 추가 검사를 선택한다"는 agent 후보입니다.

프로젝트 교재에서는 먼저 workflow로 충분한 경로를 설계하고, 특정 job 안에서 agent가 필요한지를 검토하는 방식이 좋습니다. 전체 자동화를 agent에게 맡기는 대신, "debug job에서는 agent가 로그를 분석하고 다음 검사 tool을 선택한다"처럼 제한된 범위에서 동적성을 부여할 수 있습니다.

```ts
type JobName = "collect" | "verify" | "integrate" | "release-note"

type Job = {
  name: JobName
  needs: JobName[]
}

const jobs: Job[] = [
  { name: "collect", needs: [] },
  { name: "verify", needs: ["collect"] },
  { name: "integrate", needs: ["verify"] },
  { name: "release-note", needs: ["integrate"] },
]

function canRun(job: Job, completed: Set<JobName>): boolean {
  return job.needs.every((dependency) => completed.has(dependency))
}

const completed = new Set<JobName>(["collect", "verify"])

for (const job of jobs) {
  console.log(job.name, canRun(job, completed))
}
```

이 예시는 dependency가 충족된 job만 실행 가능한 구조를 보여줍니다. 실제 workflow engine은 더 많은 기능을 제공하지만, 사고의 핵심은 같습니다. Job은 독립 실행 단위이고, dependency가 자동화의 순서를 만듭니다.

> [!KEY]
> Workflow는 job을 나누고 dependency를 명시해 예측 가능성을 얻습니다. Agent는 예측 가능한 경로만으로 부족할 때, 제한된 범위에서 동적 판단을 맡기는 선택지입니다.

## 스펙과 세부

### Configurable automated process는 책임을 문서화한다

Workflow가 configurable automated process라는 말은 설정으로 반복 가능한 절차를 정의한다는 뜻입니다. 설정에는 trigger, job, permissions, environment, artifact, dependency 같은 항목이 들어갈 수 있습니다. 중요한 것은 사람이 "무슨 일이 언제 왜 실행되는지" 읽을 수 있어야 한다는 점입니다.

AI가 workflow 파일을 만들 때도 이 설명 가능성이 필요합니다. Job 이름이 모호하거나 모든 step이 하나의 script에 숨어 있으면 자동화가 실패했을 때 어디를 봐야 할지 알 수 없습니다. 좋은 workflow는 실행뿐 아니라 관찰과 수정이 쉬워야 합니다.

### Jobs는 기본 병렬성을 고려해 설계한다

GitHub workflow syntax에서 jobs가 기본적으로 병렬 실행될 수 있다는 사실은 dependency 설계의 근거입니다. 병렬 실행은 빠르지만, 순서가 필요한 job에는 위험합니다. Test가 build artifact를 필요로 하거나 release note가 QA report를 필요로 한다면 `needs` 같은 dependency가 필요합니다.

자동화 프로젝트를 설계할 때는 job을 두 그룹으로 나눕니다. 독립적으로 병렬 실행 가능한 job과 순서가 필요한 job입니다. Lint와 typecheck는 병렬 후보일 수 있고, verify 이후 integrate는 순차 후보입니다. 이 구분이 없으면 workflow가 가끔은 성공하고 가끔은 실패하는 불안정한 상태가 됩니다.

### Workflow와 agent의 차이는 autonomy다

Anthropic의 workflow 설명은 predefined code path를 강조합니다. 같은 글에서 agent는 process와 tool usage를 동적으로 지시할 수 있다고 설명됩니다. 이 차이는 autonomy입니다. Workflow는 사람이 경로를 정하고, agent는 목표를 달성하기 위해 다음 행동을 더 많이 선택합니다.

Autonomy가 높아지면 유연성도 높아지지만 검증 비용도 늘어납니다. Agent가 어떤 tool을 왜 호출했는지 trace해야 하고, 잘못된 행동을 막는 permission boundary가 필요합니다. 그래서 운영 자동화에서는 workflow를 기본으로 두고, agent는 필요한 곳에 제한적으로 넣는 편이 설명하기 쉽습니다.

### Tool call은 request이고 실행은 policy다

OpenAI function calling의 tool call 표현은 "requests from the model to use tools"입니다. 요청이라는 단어가 중요합니다. 모델은 요청하지만, workflow policy가 허용해야 실행됩니다. 이 policy에는 tool allowlist, argument schema, user/session permission, rate limit, dry run, manual approval 같은 조건이 들어갈 수 있습니다.

교재 프로젝트에서는 이 경계를 반복해서 강조해야 합니다. AI 자동화가 위험한 이유는 모델이 나빠서가 아니라, 요청과 실행 사이의 경계가 사라질 때입니다. Workflow Tool Boundary는 그 경계를 코드와 문서로 남깁니다.

## 원문으로 읽기

> "A workflow is a configurable automated process"
>
> — workflow는 설정 가능한 자동화 process이다.
> [GitHub Docs — Workflows](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows)

이 문장은 workflow를 가장 짧게 정의합니다. 자동화는 사람이 반복하는 작업을 설정 가능한 process로 만드는 일입니다. 설정 가능하다는 말은 trigger, job, dependency, permission 같은 요소를 읽고 바꿀 수 있어야 한다는 뜻입니다.

> "one or more jobs"
>
> — 하나 이상의 job을 가진다.
> [GitHub Docs — Workflows](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows)

이 문장은 workflow의 내부 구조를 보여줍니다. 자동화는 하나의 거대한 step이 아니라 job 단위로 나누어집니다. Job 경계가 분명할수록 실패 위치와 책임이 잘 보입니다.

> "run in parallel by default"
>
> — 기본적으로 병렬 실행된다.
> [GitHub Docs — Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)

이 문장은 dependency 설계가 필요한 이유를 설명합니다. Job들이 기본적으로 병렬 실행될 수 있다면, 순서가 필요한 작업은 명시적으로 연결해야 합니다. 암묵적 순서를 기대하면 자동화가 불안정해집니다.

> "Workflows are systems where LLMs and tools are orchestrated through predefined code paths."
>
> — workflows는 LLM과 tool이 미리 정의된 code path를 통해 orchestration되는 시스템이다.
> [Anthropic Engineering — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

이 문장은 LLM 자동화에서 workflow와 agent를 구분하는 핵심입니다. LLM이 들어간다고 모두 agent가 되는 것은 아닙니다. 미리 정한 경로에서 LLM과 tool을 사용하는 구조는 workflow입니다.

## 실전에서

### 자동화 설계 packet

자동화 workflow 프로젝트를 시작할 때는 다음 packet을 작성합니다. 이 packet은 코드보다 먼저 workflow의 실행 조건과 안전 경계를 정의합니다.

```text
Automation Workflow Packet

Trigger:
- lesson draft가 생성되면 수동으로 실행

Jobs:
- collect-input: draft와 KB mapping 확인
- verify-format: 8섹션, 8,000자, quote match 검사
- integrate: approved draft만 src/content로 복사
- release-note: 변경 파일과 verify 결과 기록

Dependencies:
- verify-format needs collect-input
- integrate needs verify-format
- release-note needs integrate

Tool boundary:
- LLM은 수정 제안을 만들 수 있음
- 파일 쓰기와 git commit은 workflow policy가 허용한 단계에서만 실행
- deploy tool은 이 workflow에서 실행하지 않음
```

이 packet은 자동화가 무엇을 하고 무엇을 하지 않는지 분명히 합니다. 특히 deploy를 하지 않는다는 정책처럼 금지 조건도 workflow의 일부입니다.

### LLM workflow step 예시

```ts
type WorkflowStep =
  | { kind: "deterministic"; name: "count-sections" }
  | { kind: "llm"; name: "summarize-violations" }
  | { kind: "tool"; name: "write-report"; requiresApproval: boolean }

const steps: WorkflowStep[] = [
  { kind: "deterministic", name: "count-sections" },
  { kind: "llm", name: "summarize-violations" },
  { kind: "tool", name: "write-report", requiresApproval: false },
]

function describeStep(step: WorkflowStep): string {
  if (step.kind === "tool") {
    return `${step.name}: tool execution, approval=${step.requiresApproval}`
  }

  return `${step.name}: ${step.kind}`
}

console.log(steps.map(describeStep))
```

이 예시는 deterministic step, LLM step, tool step을 분리합니다. 실제 workflow에서는 deterministic scan이 사실을 계산하고, LLM은 설명을 정리하고, tool step은 report를 씁니다. 역할을 섞지 않으면 검증이 쉬워집니다.

### 실패 처리는 다음 행동으로 남긴다

Workflow가 실패했을 때는 "실패"만 남기면 안 됩니다. 어떤 job이 실패했는지, dependency 때문에 어떤 job이 실행되지 않았는지, tool call이 policy에 막혔는지 기록해야 합니다. AI가 포함된 workflow에서는 LLM 출력이 부족했는지, deterministic 검사에서 위반이 나온 것인지도 구분합니다.

## 한계와 트레이드오프

Workflow의 한계는 유연성입니다. 미리 정한 경로를 따르기 때문에 예상하지 못한 상황에서는 멈추거나 사람의 결정을 요구해야 합니다. 이것은 단점이면서 장점입니다. 운영 자동화에서는 멈춰야 할 때 멈추는 것이 안전합니다.

Agent의 한계는 검증 비용입니다. Agent가 동적으로 process와 tool usage를 결정하면 더 많은 문제를 처리할 수 있지만, 그 결정이 왜 나왔는지 추적해야 합니다. Tool permission, audit log, rollback, human approval이 더 중요해집니다. 반복 가능한 작업에 agent를 쓰면 불필요하게 복잡해질 수 있습니다.

Workflow dependency도 trade-off가 있습니다. 모든 job을 순차로 만들면 안전하지만 느립니다. 모든 job을 병렬로 만들면 빠르지만 순서가 필요한 작업에서 위험합니다. Dependency graph는 속도와 정확성의 균형입니다.

AI 자동화의 흔한 오해는 "모델이 판단하므로 workflow가 필요 없다"입니다. 실제로는 반대입니다. 모델이 판단하는 부분이 있을수록 그 판단이 들어가는 경로, tool 실행 조건, 실패 처리 기준을 더 명확히 해야 합니다. ==AI workflow의 성숙도는 모델의 자율성보다 경계와 기록의 명확성에서 드러납니다==.

> [!WARNING]
> Tool call은 실행 명령이 아니라 요청입니다. Workflow policy가 허용하지 않은 tool 실행은 모델이 요청해도 수행하지 않아야 합니다.

## 더 읽기

먼저 GitHub Workflows 문서로 workflow와 jobs의 기본 구조를 읽습니다. 그다음 Workflow syntax에서 jobs가 기본적으로 병렬 실행될 수 있다는 점을 확인하며 dependency 설계를 이해합니다. Anthropic Building Effective Agents 글은 workflow와 agent의 차이를 읽는 데 중요합니다. 마지막으로 OpenAI Function Calling 문서의 tool call 표현을 읽으며 모델 요청과 실제 실행을 분리하는 사고를 정리합니다.

- [GitHub Docs — Workflows](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows)
- [GitHub Docs — Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [Anthropic Engineering — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [OpenAI Docs — Function calling](https://developers.openai.com/api/docs/guides/function-calling)

함께 읽을 내부 강의는 `ai-workflow-design`, `agent-loop`, `tool-calling-basics`, `ai-chatbot-project`입니다. 다음 프로젝트 교재에서는 이런 workflow 설계를 MCP-enabled tool project나 debugging playbook으로 확장할 수 있습니다.
