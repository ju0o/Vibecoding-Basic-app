## 한 줄 정의

SubAgent 위임은 주 에이전트가 특정 하위 작업을 별도 컨텍스트와 권한을 가진 전문 에이전트에게 맡기고, 결과만 다시 받아 합성하는 설계입니다. SubAgent는 단순히 "AI를 하나 더 켠다"가 아니라, 주 대화가 감당하지 않아도 되는 탐색 로그, 검색 결과, 파일 내용을 분리하는 context engineering 장치입니다.

이 개념을 배울 때 가장 먼저 버려야 할 오해는 "agent가 많으면 더 똑똑해진다"입니다. 공식 문서가 강조하는 핵심은 수량이 아니라 경계입니다. 어떤 하위 작업을 분리할지, 그 하위 작업이 어떤 도구를 쓸 수 있는지, 어떤 모델을 쓸지, 결과를 어떤 크기와 형식으로 돌려줄지를 설계해야 합니다. ==SubAgent의 본질은 병렬성보다 위임 경계입니다.==

바이브코딩에서는 이 경계가 특히 중요합니다. 코드베이스를 조사하는 과정에서 수천 줄의 파일 내용과 명령 출력이 주 대화에 쌓이면, main agent는 중요한 결정을 내려야 할 순간에 오히려 불필요한 세부에 묻힙니다. SubAgent는 그런 세부 탐색을 자기 context에서 수행하고, 주 에이전트에게는 요약과 판단 근거만 돌려줍니다.

따라서 이 강의의 목표는 "subagent를 어떻게 많이 띄우는가"가 아닙니다. 언제 위임해야 하는지, 위임받은 agent의 권한을 어떻게 줄여야 하는지, background 실행과 foreground 결과 대기가 어떤 차이를 만드는지, 그리고 주 에이전트가 어떤 결과를 받아야 최종 판단을 잃지 않는지 이해하는 것입니다.

## 왜 존재하는가

AI agent는 도구를 사용하면서 작업합니다. 파일을 읽고, 검색하고, 테스트를 실행하고, 결과를 다시 보고 판단합니다. 이 반복은 강력하지만 한 가지 비용을 만듭니다. 모든 탐색 결과가 주 대화에 들어오면 context window가 빠르게 채워지고, 주 에이전트는 작업 목표보다 탐색 부산물을 더 많이 보게 됩니다.

Claude Code 문서는 side task가 main conversation을 search results, logs, file contents로 flood할 때 subagent가 own context에서 작업하고 summary만 반환한다고 설명합니다. 이 설명은 SubAgent가 생긴 이유를 거의 그대로 보여줍니다. 주 대화는 최종 판단과 사용자와의 상호작용을 담당하고, 하위 agent는 집중 탐색을 담당합니다.

긴 작업에서는 이 문제가 더 커집니다. Anthropic의 context engineering 글은 long-horizon tasks에서 context limitation을 우회하기 위한 방법 중 하나로 sub-agent architectures를 설명합니다. 하나의 agent가 전체 프로젝트의 모든 세부 상태를 유지하는 대신, 전문 sub-agent가 clean context window에서 focused task를 수행하고 lead agent가 high-level plan을 조정합니다.

여기서 중요한 점은 SubAgent가 "기억을 늘리는 장치"가 아니라 "오염을 격리하는 장치"라는 것입니다. subagent도 자기 context를 사용하고, 그 context 안에서 많은 토큰을 소비할 수 있습니다. 다만 그 비용과 세부를 main agent에 그대로 전염시키지 않습니다. ==위임의 목적은 더 많은 작업을 시키는 것이 아니라, 필요한 정보만 되돌려 받는 것입니다.==

이 구조는 사람 팀의 협업과도 비슷하지만, 완전히 같지는 않습니다. 사람에게 위임할 때는 암묵적 상식과 책임감이 작동합니다. AI subagent에게 위임할 때는 description, prompt, tools, model, permissions, maxTurns 같은 명시적 설정이 필요합니다. 설계하지 않은 위임은 품질을 높이지 않고 복잡도만 늘립니다.

## 작동 원리

### 1. 주 에이전트가 위임할 작업을 식별합니다

SubAgent는 아무 작업에나 쓰는 것이 아닙니다. 적합한 작업은 보통 세 가지 특징을 가집니다. 첫째, main conversation을 오염시킬 만큼 출력이 많습니다. 둘째, 별도 전문성이 필요합니다. 셋째, 결과가 summary나 structured output으로 되돌아와도 충분합니다.

예를 들어 "이 저장소에서 인증 관련 파일을 찾아 위험 요소를 요약하라"는 subagent 후보입니다. 검색 결과와 파일 읽기 결과가 많고, 보안 관점이라는 집중 기준이 있으며, 최종적으로는 위험 목록과 근거만 필요하기 때문입니다. 반대로 "이 문장 한 줄을 고쳐라"는 위임할 필요가 거의 없습니다. 별도 context를 열 비용이 더 큽니다.

주 에이전트는 subagent description을 보고 위임 여부를 판단합니다. description이 "코드를 리뷰한다"처럼 넓으면 언제 써야 하는지 모호합니다. "변경된 파일을 읽고 보안, 성능, 유지보수 위험을 요약한다. 사용자가 code review나 PR review를 요청할 때 사용한다"처럼 trigger와 범위가 있어야 합니다.

### 2. SubAgent는 별도 context와 system prompt로 시작합니다

SubAgent는 separate agent instance입니다. 별도 context window와 custom system prompt를 갖고, main conversation과 같은 모든 세부를 자동으로 공유하지 않습니다. 이 점이 위임의 핵심입니다. main agent가 모든 파일 내용을 직접 읽는 대신, subagent가 자기 창에서 읽고 필요한 결론만 돌려줍니다.

Claude Code custom subagent는 Markdown file과 YAML frontmatter로 정의할 수 있습니다. `name`, `description`, `tools`, `model` 같은 설정이 frontmatter에 들어가고, 본문은 그 subagent의 system prompt 역할을 합니다. SDK에서는 `AgentDefinition`으로 `description`, `prompt`, `tools`, `disallowedTools`, `model`, `skills`, `memory`, `mcpServers`, `maxTurns`, `permissionMode` 같은 설정을 둘 수 있습니다.

이 구조가 중요한 이유는 위임이 "대화 복사"가 아니기 때문입니다. SubAgent는 역할과 접근 권한이 다른 실행 단위입니다. code reviewer는 read-only 도구만 가질 수 있고, test runner는 Bash와 Read를 가질 수 있습니다. 연구 agent는 많은 파일을 읽어도 수정 도구를 가지지 않을 수 있습니다.

### 3. 도구 제한이 위임 품질을 결정합니다

위임받은 agent에게 모든 도구를 주면 subagent의 장점이 줄어듭니다. 전문 worker라는 말은 "이 일에 필요한 도구만 가진다"는 뜻이기도 합니다. Claude Code 문서는 subagent가 tool restrictions, permission modes, hooks, skills를 가질 수 있다고 설명합니다.

읽기 전용 리뷰 agent라면 `Read`, `Grep`, `Glob` 정도로 충분할 수 있습니다. 테스트 분석 agent라면 `Bash`, `Read`, `Grep`가 필요할 수 있습니다. 하지만 리뷰 agent에게 Write와 Edit를 줄 이유가 없다면 주지 않는 편이 안전합니다. ==SubAgent의 안전성은 prompt보다 tool surface에서 먼저 결정됩니다.==

도구 제한은 보안만의 문제가 아닙니다. 도구가 적을수록 agent가 선택해야 할 행동 공간이 줄어듭니다. 선택지가 줄면 routing이 쉬워지고, 결과가 더 예측 가능해집니다. 반대로 비슷한 도구가 너무 많거나, 쓰면 안 되는 도구가 열려 있으면 subagent도 main agent처럼 헤맬 수 있습니다.

### 4. 실행 방식은 foreground와 background로 나뉩니다

SubAgent는 결과가 즉시 필요한 foreground 작업으로 실행될 수도 있고, main session을 막지 않는 background 작업으로 실행될 수도 있습니다. Claude Code v2.1.198 기준 Agent tool call이 `run_in_background`를 생략하면 background subagent로 실행되고, 결과가 필요할 때는 Claude가 `run_in_background: false`를 설정한다고 KB는 정리합니다.

이 차이는 실제 workflow 설계에 영향을 줍니다. security review 결과가 없으면 다음 단계로 못 가는 작업은 foreground가 맞습니다. 반면 큰 코드베이스를 훑어 개선 후보를 모으는 작업은 background로 돌리고 main agent가 다른 계획을 계속 다듬을 수 있습니다.

background 위임은 편리하지만, 결과 통합 지점이 필요합니다. 여러 subagent가 독립적으로 조사한 결과를 그냥 이어 붙이면 충돌하거나 중복될 수 있습니다. 주 에이전트는 각 결과의 범위, 근거, 불확실성을 비교하고 최종 판단을 합성해야 합니다.

### 5. 결과는 요약이 아니라 계약이어야 합니다

SubAgent가 main agent에게 돌려주는 결과는 "대충 요약"이어서는 안 됩니다. 좋은 결과 계약은 세 가지를 포함합니다. 무엇을 조사했는가, 무엇을 발견했는가, 무엇을 확인하지 못했는가입니다. 특히 마지막 항목이 중요합니다. subagent가 보지 않은 범위를 main agent가 모르면 잘못된 전체 판단을 내릴 수 있습니다.

예를 들어 보안 리뷰 subagent의 결과는 다음처럼 구조화할 수 있습니다.

```ts
type DelegationResult = {
  agent: string
  scopeChecked: string[]
  findings: Array<{
    severity: "low" | "medium" | "high"
    file: string
    reason: string
    evidence: string
  }>
  notChecked: string[]
  recommendedNextStep: string
}
```

이 타입은 실제 SDK 타입이 아니라, 위임 결과를 설계하기 위한 예시입니다. 핵심은 subagent가 무엇을 했고 무엇을 하지 않았는지 main agent가 판단할 수 있게 만드는 것입니다.

### 6. 대규모 위임은 dynamic workflow로 넘어갑니다

SubAgent 하나로 충분하지 않을 때도 있습니다. codebase-wide bug sweep, 500-file migration, cross-checked research처럼 많은 worker가 필요한 작업은 dynamic workflow가 더 적합할 수 있습니다. Claude Code 문서는 dynamic workflows가 JavaScript script로 많은 subagents를 orchestrate하고, session은 responsive하게 유지한다고 설명합니다.

이 지점에서 SubAgent와 Orchestration이 만납니다. SubAgent는 worker 단위이고, orchestration은 어떤 worker를 언제 호출하고, 어떤 결과를 믿고, 어떻게 합성할지 정합니다. 작은 작업은 main agent가 직접 subagent 하나를 부르면 됩니다. 큰 작업은 script와 runtime이 위임 과정을 관리해야 합니다.

## 스펙과 세부

### 파일 기반 subagent의 기본 구조

Claude Code custom subagent는 Markdown 파일과 YAML frontmatter로 정의할 수 있습니다. KB가 정리한 핵심 필드는 `name`, `description`, `tools`, `model`입니다. 실제로는 permissionMode, maxTurns, skills, memory, mcpServers 같은 설정도 고려할 수 있습니다.

```md
---
name: code-reviewer
description: Reviews changed files for security, performance, and maintainability risks. Use after code changes or before release.
tools: Read, Grep, Glob
model: sonnet
---

You are a focused code review subagent.
Return findings with severity, evidence, and files checked.
Do not modify files.
```

이 예시에서 가장 중요한 줄은 `tools`입니다. read-only review라는 목적에 맞게 수정 도구를 열지 않았습니다. 두 번째로 중요한 줄은 `description`입니다. main agent가 언제 이 subagent를 써야 하는지 알려줍니다.

### SDK 관점의 정의

SDK에서는 SubAgent를 `AgentDefinition` 같은 구성 객체로 생각할 수 있습니다. KB의 `SubagentDefinition` 예시는 다음과 같습니다.

```ts
type SubagentDefinition = {
  description: string
  prompt: string
  tools?: string[]
  model?: "inherit" | "haiku" | "sonnet" | "opus"
  maxTurns?: number
}
```

여기서 `description`은 discovery 계약이고, `prompt`는 역할 계약이며, `tools`는 행동 계약입니다. `model`은 비용과 품질의 trade-off를 조정하고, `maxTurns`는 하위 agent가 무한히 탐색하지 않게 하는 안전장치입니다.

### Built-in과 custom의 차이

Claude Code에는 Explore, Plan, general-purpose 같은 built-in subagents가 있을 수 있습니다. Explore와 Plan은 주로 탐색과 계획을 분리하기 위한 목적으로 설명됩니다. custom subagent는 반복되는 특정 작업, 예를 들어 code review, debugging, data analysis, database query validation처럼 프로젝트나 개인 workflow에 맞춘 역할을 정의할 때 사용합니다.

Built-in은 빠르게 시작하기 좋지만, custom은 도구 제한과 description을 더 정교하게 맞출 수 있습니다. 팀에서 같은 작업을 반복한다면 custom subagent를 프로젝트에 저장해 버전 관리하는 편이 낫습니다. 반대로 일회성 탐색은 built-in이나 general-purpose 위임으로 충분할 수 있습니다.

### 권한과 모델 선택

SubAgent는 main conversation의 모델을 inherit할 수 있고, 특정 model alias를 지정할 수도 있습니다. KB는 Claude Code 문서가 v2.1.198 기준 Explore의 model inheritance 변경을 설명한다고 기록합니다. 이런 버전 의존 정보는 강의에서 외워야 할 세부라기보다, agent 시스템이 계속 변하고 있음을 보여주는 사례입니다.

실무에서는 비용이 낮은 모델을 탐색용 subagent에 배정하고, 합성이나 최종 판단은 더 강한 모델의 main agent가 맡는 구조를 고려할 수 있습니다. 다만 이 판단도 KB 범위 안에서는 "가능한 설계 방향"으로만 다룹니다. 핵심은 model도 위임 계약의 일부라는 점입니다.

## 원문으로 읽기

> "specialized AI assistants"
>
> — 특정 작업 유형을 맡는 전문 AI assistant.
> [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)

이 짧은 표현은 SubAgent를 이해하는 출발점입니다. SubAgent는 새 대화방이 아니라 specialized assistant입니다. "전문"이라는 말은 더 많은 권한이 아니라 더 좁은 역할을 뜻합니다. 역할이 좁아야 description이 선명해지고, 도구 제한도 가능해집니다.

> "own context window"
>
> — 자기 자신의 context window.
> [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)

이 문장이 중요한 이유는 context가 agent 성능의 핵심 자원이기 때문입니다. SubAgent가 자기 context에서 많은 탐색을 처리하면 main conversation은 그 세부를 모두 떠안지 않아도 됩니다. 바이브코딩에서 긴 로그와 검색 결과를 분리해야 하는 이유가 여기에 있습니다.

> "separate agent instances"
>
> — 별도의 agent instance.
> [Subagents in the SDK — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/subagents)

별도 instance라는 말은 설정과 권한을 다르게 줄 수 있다는 뜻입니다. main agent와 같은 목표를 공유하더라도, subagent는 다른 prompt, tools, model, permissions를 가질 수 있습니다. 이 차이를 설계하지 않으면 SubAgent는 단순히 비용이 더 드는 복제본이 됩니다.

> "Dynamic workflows orchestrate many subagents"
>
> — Dynamic workflow는 많은 subagent를 orchestrate한다.
> [Orchestrate subagents at scale with dynamic workflows — Claude Code Docs](https://code.claude.com/docs/en/workflows)

이 인용은 SubAgent가 커질 때 어디로 이어지는지 보여줍니다. subagent 하나를 부르는 수준을 넘어서면 orchestration 문제가 됩니다. 어떤 worker를 몇 개 실행할지, 결과를 어떻게 cross-check할지, 어떤 결과를 최종 판단에 반영할지 정해야 합니다.

> "specialized sub-agents can handle focused tasks"
>
> — 전문 sub-agent는 집중된 작업을 처리할 수 있다.
> [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

focused tasks라는 표현은 SubAgent 설계의 검증 질문입니다. 지금 만들려는 subagent의 task가 focused한가? 아니라면 아직 agent를 나눌 때가 아닐 수 있습니다. 분리가 성능을 높이는 순간은 책임 경계가 충분히 좁고, 결과 계약이 충분히 명확할 때입니다.

## 실전에서

### 패턴 1: 탐색은 subagent, 결정은 main agent

코드베이스를 조사할 때 main agent가 모든 파일을 직접 읽으면 판단 context가 무거워집니다. 이때 read-only researcher subagent를 만들 수 있습니다. 이 subagent는 `Read`, `Grep`, `Glob`만 사용해 관련 파일과 근거를 찾고, main agent에게 "확인한 파일, 핵심 발견, 불확실한 범위"를 반환합니다.

main agent는 그 요약을 바탕으로 실제 수정 계획을 세웁니다. 이 패턴의 장점은 탐색의 세부와 의사결정이 분리된다는 점입니다. 단점은 subagent 요약 품질이 낮으면 main agent가 잘못된 근거로 판단할 수 있다는 점입니다. 따라서 결과 계약을 구조화해야 합니다.

### 패턴 2: 리뷰 subagent는 수정 권한을 갖지 않습니다

코드 리뷰 subagent는 파일을 고치기보다 문제를 발견하는 역할이 더 적합할 때가 많습니다. Write/Edit 권한을 주면 리뷰와 수정이 섞이고, main agent가 변경 책임을 추적하기 어려워질 수 있습니다. read-only tools로 제한하면 "발견"과 "수정"의 경계가 생깁니다.

이 구조는 사람 팀에서도 익숙합니다. reviewer가 위험을 지적하고, implementer가 수정하고, main agent가 최종 결과를 검증합니다. AI 작업에서도 같은 분리가 유효합니다.

### 패턴 3: 테스트 분석은 별도 worker로 뺍니다

테스트 실패 로그는 길고 반복적입니다. test-runner subagent는 Bash로 테스트를 실행하고 실패 로그를 읽은 뒤, 실패 원인 후보와 관련 파일을 요약할 수 있습니다. main agent는 요약을 받아 수정 방향을 정합니다.

단, 테스트 실행 subagent는 Bash 권한을 가지므로 더 신중해야 합니다. destructive command를 실행하지 않도록 prompt와 permission을 제한하고, 필요하면 hook이나 harness 단계에서 제어해야 합니다.

### 작은 위임 설계 예시

```ts
type DelegationPlan = {
  task: "security-review"
  agent: "read-only-security-reviewer"
  tools: ["Read", "Grep", "Glob"]
  expectedReturn: ["filesChecked", "findings", "notChecked", "recommendedNextStep"]
}

const plan: DelegationPlan = {
  task: "security-review",
  agent: "read-only-security-reviewer",
  tools: ["Read", "Grep", "Glob"],
  expectedReturn: ["filesChecked", "findings", "notChecked", "recommendedNextStep"],
}

console.log(plan.expectedReturn.join(", "))
```

이 코드는 특정 SDK 호출을 재현하려는 예시가 아니라, 위임 계약을 사고하는 방법입니다. 좋은 위임은 agent 이름보다 expected return이 먼저 명확합니다. 무엇을 받아야 main agent가 다음 결정을 내릴 수 있는지부터 정해야 합니다.

## 한계와 트레이드오프

첫 번째 한계는 복잡도입니다. SubAgent가 늘어나면 실행 흐름을 추적하기 어려워집니다. 누가 어떤 파일을 읽었는지, 어떤 결과가 최신인지, 어떤 subagent가 어떤 가정을 했는지 관리해야 합니다. 작은 작업에 subagent를 쓰면 오히려 느리고 복잡해질 수 있습니다.

두 번째 한계는 결과 요약 손실입니다. SubAgent가 많은 세부를 읽고 summary만 반환하면 main agent는 세부를 직접 보지 않습니다. 이 구조가 context를 절약하지만, 중요한 미묘한 근거가 빠질 수도 있습니다. 그래서 결과에는 evidence와 notChecked가 있어야 합니다.

세 번째 한계는 권한 위험입니다. SubAgent도 도구를 사용할 수 있습니다. 특히 Bash나 write 권한이 있는 subagent는 main agent 못지않게 위험할 수 있습니다. "하위"라는 말이 더 안전하다는 뜻은 아닙니다. 권한은 별도로 제한해야 합니다.

네 번째 한계는 coordination cost입니다. 여러 subagent가 병렬로 작업하면 결과 합성 단계가 필요합니다. 서로 다른 결론이 나왔을 때 main agent가 어떤 기준으로 판단할지 정해야 합니다. 이 문제는 orchestration과 evaluation으로 이어집니다.

마지막 한계는 버전 변화입니다. KB는 Claude Code v2.1.198 기준 behavior를 기록합니다. agent 도구는 빠르게 바뀌므로, version-dependent behavior는 항상 확인 날짜와 함께 읽어야 합니다. SubAgent를 제품 기능처럼 외우기보다, 별도 context, 별도 prompt, 별도 tools, 결과 계약이라는 원리를 이해하는 편이 더 오래 갑니다.

## 더 읽기

먼저 Claude Code의 Create custom subagents 문서를 읽으세요. built-in subagents, custom file 구조, frontmatter, tool restriction을 한 번에 볼 수 있습니다. 그 다음 Agent SDK의 Subagents 문서를 읽으면 programmatic definition과 `AgentDefinition` 필드가 더 선명해집니다. 마지막으로 Anthropic의 Effective context engineering 글을 읽으면 SubAgent가 단순 병렬화가 아니라 long-horizon context strategy라는 점이 보입니다.

- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Subagents in the SDK — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/subagents)
- [Run agents in parallel — Claude Code Docs](https://code.claude.com/docs/en/agents)
- [Orchestrate subagents at scale with dynamic workflows — Claude Code Docs](https://code.claude.com/docs/en/workflows)
- [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents)

읽을 때는 "이 subagent가 main agent에게 무엇을 남겨야 하는가"를 계속 물어보세요. 그 질문에 답할 수 있으면 delegation입니다. 답할 수 없다면 아직 그냥 복잡한 병렬 실행일 가능성이 큽니다.

