## 한 줄 정의

Loop Engineering은 agent가 판단, 도구 호출, 결과 반영을 반복하는 루프를 종료 조건, 권한, 비용, 컨텍스트, 검증 기준과 함께 설계하는 작업입니다. agent loop 자체는 모델이 프롬프트를 평가하고, 필요한 도구를 호출하고, 도구 결과를 받아 다시 판단하는 반복 구조입니다. Loop Engineering은 그 구조를 "그냥 계속 돌게" 두지 않고, 어디까지 반복할지와 무엇을 근거로 멈출지를 정합니다.

이 강의에서 Loop Engineering은 특정 벤더의 공식 기능 이름이 아니라 교육용 설계 개념입니다. Claude Agent SDK의 agent loop 문서가 설명하는 turn, tool call, tool result, permissions, budget, context accumulation, compaction 같은 요소를 하나의 설계 관점으로 묶은 것입니다. ==Loop Engineering의 핵심은 반복을 많이 시키는 능력이 아니라 반복을 통제하는 능력입니다.==

바이브코딩에서 이 개념은 바로 체감됩니다. "테스트가 통과할 때까지 고쳐줘"라고 말하면 agent는 파일을 읽고, 수정하고, 테스트를 실행하고, 로그를 읽고, 다시 수정합니다. 이 과정은 강력하지만 종료 조건, 권한 제한, 비용 제한, 검증 신호가 없으면 오래 돌고도 실제로 성공했는지 알기 어렵습니다.

따라서 Loop Engineering을 배운다는 것은 agent에게 일을 맡긴 뒤 기다리는 법을 배우는 것이 아닙니다. agent가 어떤 상태를 보고 다음 행동을 정하는지, 어떤 도구 결과가 다음 context로 들어가는지, 어떤 신호가 성공과 막힘을 구분하는지, 그리고 어떤 순간에 사람의 판단이나 별도 harness가 필요한지 이해하는 것입니다.

## 왜 존재하는가

agent가 단일 답변만 만드는 시대에는 "잘 묻기"가 중요했습니다. 그러나 tool-calling agent는 답변을 바로 끝내지 않습니다. 프롬프트를 평가하고, 도구를 호출하고, 도구 결과를 받고, 그 결과를 다시 context에 넣어 다음 판단을 합니다. 이 반복이 agent를 유용하게 만들지만, 동시에 새로운 문제를 만듭니다.

첫 번째 문제는 종료 실패입니다. Anthropic은 agent가 environmental feedback을 바탕으로 tool loop를 돌 수 있고, stopping conditions에는 completion뿐 아니라 maximum number of iterations도 포함될 수 있다고 설명합니다. 즉 agent는 어떤 조건에서는 자연스럽게 끝나지만, 어떤 조건에서는 반복 횟수나 예산 같은 외부 제한이 필요합니다.

두 번째 문제는 context 누적입니다. Claude Agent SDK 문서는 session 안에서 context가 reset되지 않고, system prompt, tool definitions, conversation history, tool inputs, tool outputs가 함께 누적된다고 설명합니다. 긴 로그와 큰 파일 내용이 계속 들어오면 agent는 더 많은 자료를 보지만, 그 자료가 항상 판단 품질을 높이는 것은 아닙니다.

세 번째 문제는 권한과 비용입니다. agent loop는 도구 호출을 반복할 수 있으므로, 한 번의 위험한 tool call보다 여러 번 누적된 tool call이 더 큰 영향을 만들 수 있습니다. Claude Agent SDK는 `max_turns`, `max_budget_usd`, `allowed_tools`, `disallowed_tools`, `permission_mode` 같은 제어 장치를 제공합니다. 이런 장치들은 loop를 제약하는 실무적 도구입니다.

네 번째 문제는 실수 전파입니다. Anthropic의 agent eval 문서는 agent가 여러 turn 동안 environment state를 수정하므로 mistakes can propagate and compound한다고 설명합니다. 한 turn의 잘못된 판단이 다음 turn의 context가 되고, 그 위에서 다시 잘못된 행동이 이어질 수 있습니다. ==agent loop는 지능의 반복이면서 동시에 오류 전파의 통로입니다.==

Loop Engineering은 이 네 문제를 함께 다룹니다. 언제 멈출지, 어떤 도구를 쓸 수 있을지, 어떤 결과를 성공으로 볼지, context가 커질 때 어떻게 압축하거나 분리할지, 위험한 도구 호출을 hook으로 막을지 설계합니다. 그래서 Loop Engineering은 agent loop의 "내부 동작 설명"을 넘어, 실무에서 agent를 안전하고 재현 가능하게 쓰기 위한 실행 설계가 됩니다.

## 작동 원리

### 1. 루프는 prompt 평가에서 시작합니다

Claude Agent SDK 문서는 agent session이 같은 cycle을 따른다고 설명합니다. 사용자가 프롬프트를 주면 모델은 현재 context를 보고 다음 행동을 정합니다. 이때 context에는 사용자의 요청뿐 아니라 system prompt, tool definitions, conversation history, 이전 tool inputs와 outputs가 포함될 수 있습니다.

Loop Engineering 관점에서 첫 단계의 질문은 "agent가 무엇을 보고 판단하는가"입니다. 같은 요청이라도 context에 어떤 파일 내용, 어떤 테스트 로그, 어떤 규칙, 어떤 이전 실패가 들어 있는지에 따라 다음 행동이 달라집니다. 그래서 loop를 설계할 때는 첫 프롬프트뿐 아니라 loop 중간에 쌓이는 정보도 설계 대상입니다.

이 단계에서 명확해야 할 것은 success signal입니다. 예를 들어 "문제를 해결해줘"보다 "테스트 A가 통과하고 lint 오류가 없어질 때까지 조사하라"가 더 나은 루프 조건입니다. agent는 목표가 구체적일수록 다음 tool call을 선택하기 쉽고, 사람도 결과를 평가하기 쉽습니다.

### 2. 모델은 응답하거나 도구를 호출합니다

agent loop에서 모델은 바로 최종 답변을 할 수도 있고, tool call을 만들 수도 있습니다. tool call은 보통 도구 이름과 입력값을 구조화해 반환하는 방식입니다. 실제 실행은 모델이 아니라 애플리케이션, SDK, 또는 실행 환경이 담당합니다.

Loop Engineering은 여기서 tool surface를 좁히는 일을 합니다. `allowed_tools`가 너무 넓으면 agent는 필요 이상의 행동을 할 수 있습니다. `disallowed_tools`와 `permission_mode`는 loop가 취할 수 있는 행동 공간을 제한합니다. 이는 보안만의 문제가 아닙니다. 행동 공간이 좁아지면 agent가 선택해야 할 경로도 선명해집니다.

예를 들어 단순 리서치 루프라면 파일 읽기와 검색 도구만 열어도 됩니다. 테스트 수정 루프라면 읽기, 수정, 테스트 실행 도구가 필요할 수 있습니다. 배포나 삭제 같은 위험한 행동은 루프 목표에 필요하지 않다면 열지 않는 편이 맞습니다.

### 3. 도구 결과는 다시 context로 들어갑니다

도구가 실행되면 그 결과가 모델에게 돌아갑니다. Claude Agent SDK 문서는 tool execution result가 conversation에 추가되고, 모델이 그 결과를 사용해 다음 response를 생성한다고 설명합니다. 이것이 loop의 힘입니다. agent는 환경에서 얻은 결과를 보고 다음 행동을 조정할 수 있습니다.

하지만 이 단계가 context 비용을 만듭니다. 실패 로그가 길거나 파일 내용이 크면 tool output이 significant context를 소비할 수 있습니다. session context가 reset되지 않는다는 점 때문에, loop가 길어질수록 agent가 보는 자료도 커집니다. ==tool result는 근거인 동시에 context 부채입니다.==

따라서 좋은 loop는 tool result를 그대로 많이 모으는 방식이 아닙니다. 필요한 결과를 구조화하고, 불필요한 긴 로그는 요약하거나, subagent와 compaction 같은 context engineering 기법을 함께 씁니다. loop engineering과 context engineering은 여기서 만납니다.

### 4. 반복은 성공 또는 제한에 의해 멈춥니다

Claude Agent SDK 문서는 step 2와 3이 반복된다고 설명합니다. 모델이 도구를 호출하고, 결과를 받고, 다시 판단합니다. 도구 호출이 더 이상 필요 없으면 final result로 끝납니다. 그러나 실무에서는 이 자연 종료만 믿기 어렵습니다.

그래서 loop에는 명시적 제한이 필요합니다. `max_turns`는 loop가 몇 번까지 model-tool 왕복을 할 수 있는지 제한합니다. `max_budget_usd`는 비용 상한을 둡니다. successSignals는 무엇이 성공인지 정의하고, blockedSignals는 어떤 상황을 막힘으로 볼지 정의합니다.

예를 들어 테스트 수정 루프의 종료 조건은 "관련 테스트 통과"일 수 있습니다. 리서치 루프의 종료 조건은 "공식 출처 3개 확인"일 수 있습니다. 위험한 명령 차단 루프의 종료 조건은 "위험 tool call이 block되고 대체 절차가 제안됨"일 수 있습니다. 종료 조건이 없으면 agent는 성실하게 반복하지만, 사람이 원하는 완료 상태와 어긋날 수 있습니다.

### 5. hook은 루프 중간에 통제점을 삽입합니다

Claude Agent SDK hooks 문서는 tool call, session start, execution stop 같은 agent events에서 block, log, transform, approve, track 결정을 넣을 수 있다고 설명합니다. Loop Engineering에서 hook은 루프의 행동을 관찰하고 제한하는 제어점입니다.

예를 들어 `PreToolUse` hook은 위험한 명령을 실행 전에 막을 수 있습니다. `PostToolUse` hook은 실행 결과를 기록하거나 다음 판단에 필요한 context를 정리할 수 있습니다. `Stop` 계열 이벤트는 agent가 멈추려 할 때 최종 조건을 확인하는 데 쓰일 수 있습니다. KB가 설명한 범위 안에서 보면, hook은 loop의 "중간문"입니다.

hook이 중요한 이유는 prompt만으로 모든 위험 행동을 막기 어렵기 때문입니다. prompt는 모델의 행동 기준을 제시하지만, hook은 실행 경계에서 allow, block, modify 같은 결정을 넣을 수 있습니다. 특히 반복 루프에서는 작은 위험 행동도 여러 번 누적될 수 있으므로 중간 제어점이 필요합니다.

### 6. context가 커지면 compaction과 분리가 필요합니다

Claude Agent SDK 문서는 context limit 근처에서 automatic compaction이 수행될 수 있다고 설명합니다. Anthropic의 context engineering 글은 long-horizon task에서 compaction, structured note-taking, sub-agent architectures가 coherence 유지에 필요할 수 있다고 설명합니다.

Loop Engineering은 이 정보를 종료 정책과 연결합니다. context가 너무 커져도 무조건 계속 돌리는 것이 아니라, 요약할지, note로 분리할지, subagent에 탐색을 맡길지, 사람에게 막힘을 보고할지 결정해야 합니다. 이 결정은 단순한 메모리 관리가 아니라 loop 지속성의 문제입니다.

예를 들어 agent가 코드베이스 전체를 조사하다가 검색 결과와 파일 내용으로 context가 커졌다면, main loop가 계속 모든 세부를 들고 갈 필요는 없습니다. subagent가 focused task를 수행하고 condensed summary만 돌려주는 구조를 쓸 수 있습니다. 이렇게 하면 main agent는 최종 판단과 합성에 집중할 수 있습니다.

### 7. 검증은 최종 발화가 아니라 환경 신호로 봅니다

Anthropic은 agents가 ground truth from the environment를 각 step에서 얻어 progress를 평가할 수 있다고 설명합니다. 바이브코딩에서는 테스트 결과, lint 결과, 빌드 결과, 파일 diff, trace가 이런 환경 신호가 됩니다.

Loop Engineering이 약한 경우 agent는 "수정했습니다"라고 말하고 끝낼 수 있습니다. 그러나 강한 loop에서는 "무엇을 실행했고, 어떤 결과가 나왔으며, 어떤 기준을 충족했는지"가 종료 조건에 포함됩니다. 이 관점은 harness engineering으로 이어집니다. loop가 반복 구조라면, harness는 그 반복을 기록하고 평가하는 실행 제어면입니다.

## 스펙과 세부

### 기본 루프 구성요소

Loop Engineering에서 다루는 핵심 구성요소는 다음처럼 정리할 수 있습니다. 이 표는 공식 API 타입을 그대로 재현한 것이 아니라, KB의 공식 문서 요소를 교육용으로 구조화한 것입니다.

| 구성요소 | 역할 | 설계 질문 |
|---|---|---|
| prompt evaluation | 현재 context를 보고 다음 행동 판단 | agent가 무엇을 보고 있는가 |
| tool call | 외부 행동 요청 | 어떤 도구가 허용되는가 |
| tool result | 환경 결과를 context로 반환 | 결과가 너무 크거나 위험하지 않은가 |
| repeat condition | 다음 turn 진행 | 더 반복할 근거가 있는가 |
| stop condition | final result 또는 중단 | 무엇을 성공 또는 막힘으로 보는가 |
| hook | event 기반 통제점 | 어디에서 block, log, approve할 것인가 |
| budget | 비용과 길이 제한 | 몇 turn, 얼마까지 허용할 것인가 |

이 구성요소는 서로 따로 움직이지 않습니다. tool result가 커지면 context 전략이 필요하고, 권한이 넓으면 hook과 approval이 필요하며, 종료 조건이 모호하면 budget과 max turns가 안전망이 됩니다.

### 정책 객체로 생각하기

실무에서는 루프를 아래처럼 policy로 생각하면 이해가 쉽습니다.

```ts
type LoopPolicy = {
  maxTurns: number
  maxBudgetUsd?: number
  successSignals: string[]
  blockedSignals: string[]
  allowedTools: string[]
  stopWhen: "tests-pass" | "source-verified" | "human-approval"
}

const bugFixLoop: LoopPolicy = {
  maxTurns: 8,
  maxBudgetUsd: 1,
  successSignals: ["target tests pass", "lint has no new errors"],
  blockedSignals: ["same failure appears twice", "required file is missing"],
  allowedTools: ["Read", "Edit", "Bash"],
  stopWhen: "tests-pass",
}

console.log(`${bugFixLoop.stopWhen}: ${bugFixLoop.successSignals.join(", ")}`)
```

이 코드는 특정 SDK 설정을 그대로 의미하지 않습니다. 중요한 것은 agent에게 "계속 해봐"라고 말하기 전에 반복의 경계와 성공 신호를 언어로 만들 수 있어야 한다는 점입니다.

### max turns와 max budget의 의미

`max_turns`는 agent가 model response와 tool execution result를 오가는 왕복을 얼마나 허용할지 정하는 장치입니다. `max_budget_usd`는 비용 측면의 상한입니다. 둘 다 "agent를 못 믿어서" 넣는 장치라기보다, 반복 작업을 운영 가능한 단위로 만드는 장치입니다.

작은 작업에는 낮은 max turns가 맞습니다. 큰 리서치나 코드 수정에는 더 많은 turn이 필요할 수 있습니다. 그러나 큰 작업도 무한 반복이 되면 안 됩니다. 반복이 길어질수록 context와 실수 전파 위험이 커지기 때문입니다.

### allowed, disallowed, permission mode

Loop Engineering에서 권한 설정은 loop의 행동 공간을 정의합니다. `allowed_tools`는 사용할 수 있는 도구를 좁히고, `disallowed_tools`는 금지 도구를 분명히 하며, `permission_mode`는 승인 방식에 영향을 줍니다. 이 설정들은 보안 정책이면서 동시에 품질 정책입니다.

예를 들어 "원인 조사만 하라"는 loop에는 수정 도구가 없어야 합니다. "수정하고 테스트하라"는 loop에는 수정과 테스트 실행이 필요합니다. "위험 명령은 사람이 승인해야 한다"는 loop에는 hook 또는 permission boundary가 필요합니다.

### compaction의 위치

compaction은 context engineering의 기법이지만 loop engineering에서도 중요합니다. 긴 loop는 context limit에 가까워질 수 있고, SDK가 automatic compaction을 수행할 수 있습니다. 이때 무엇이 보존되어야 하는지 생각하지 않으면 중요한 판단 근거가 흐려질 수 있습니다.

실무적으로는 "현재 목표, 이미 시도한 행동, 실패 로그의 핵심, 남은 불확실성"이 보존되어야 합니다. 단순 로그 전체보다 이런 summary가 다음 turn의 판단에 더 유용할 수 있습니다. 물론 이 문장은 KB의 compaction 원리를 바탕으로 한 교육적 정리이며, 특정 SDK의 내부 compaction 알고리즘을 설명하는 것은 아닙니다.

## 원문으로 읽기

> "Every agent session follows the same cycle"
>
> — 모든 agent session은 같은 cycle을 따른다.
> [How the agent loop works — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/agent-loop)

이 문장은 Loop Engineering의 출발점입니다. agent가 마법처럼 한 번에 답을 내는 것이 아니라, 일정한 반복 구조 안에서 행동합니다. 반복 구조가 있다는 것은 곧 설계 지점이 있다는 뜻입니다. cycle을 이해해야 어디에 권한, 비용, 종료 조건, hook을 넣을지 보입니다.

> "Steps 2 and 3 repeat"
>
> — 2단계와 3단계가 반복된다.
> [How the agent loop works — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/agent-loop)

이 짧은 문장은 tool loop의 핵심을 보여줍니다. 모델은 한 번 도구를 호출하고 끝나는 것이 아니라, 도구 결과를 받아 다시 판단합니다. 그래서 tool result가 다음 판단의 재료가 되고, 잘못된 결과나 과도한 로그도 다음 context에 영향을 줍니다.

> "gather context, take action, and verify results"
>
> — context를 모으고, 행동을 취하고, 결과를 검증한다.
> [How Claude Code works — Claude Code Docs](https://code.claude.com/docs/en/how-claude-code-works)

바이브코딩에서 agent 작업을 설명할 때 가장 실용적인 문장입니다. 코드 수정은 보통 이 세 단계가 섞여 반복됩니다. 좋은 loop는 context gathering만 길게 하지 않고, action만 반복하지도 않으며, verification 없이 끝내지도 않습니다.

> "maximum number of iterations"
>
> — 최대 반복 횟수.
> [Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents)

agent가 스스로 끝낼 수 있어도 반복 횟수 제한은 필요합니다. 반복 제한은 품질을 낮추는 장치가 아니라 폭주를 막고 결과를 운영 가능한 단위로 만드는 장치입니다. 특히 비용과 시간이 중요한 실무 환경에서는 max turns와 budget이 설계의 일부가 됩니다.

> "mistakes can propagate and compound"
>
> — 실수는 전파되고 누적될 수 있다.
> [Demystifying evals for AI agents — Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

이 문장은 Loop Engineering이 단순 최적화가 아니라 안전 설계라는 점을 보여줍니다. agent는 여러 turn 동안 환경 상태를 바꿀 수 있습니다. 한 번의 착각이 다음 행동의 전제가 되고, 그 결과가 다시 다음 context에 들어가면 실수가 커질 수 있습니다. 그래서 중간 검증과 종료 조건이 필요합니다.

## 실전에서

### 패턴 1: 테스트 통과 루프

가장 흔한 바이브코딩 루프는 테스트 통과 루프입니다. agent가 실패 테스트를 보고, 관련 파일을 읽고, 코드를 수정하고, 다시 테스트를 실행합니다. 이때 좋은 지시는 "고쳐줘"가 아니라 "대상 테스트가 통과할 때까지 최대 N번 반복하고, 같은 실패가 두 번 반복되면 멈추고 원인을 보고하라"에 가깝습니다.

```ts
type TestLoopState = {
  attempts: number
  maxAttempts: number
  lastFailure?: string
  repeatedFailure: boolean
  testsPassed: boolean
}

function shouldStop(state: TestLoopState) {
  return (
    state.testsPassed ||
    state.attempts >= state.maxAttempts ||
    state.repeatedFailure
  )
}

console.log(shouldStop({
  attempts: 2,
  maxAttempts: 5,
  lastFailure: "expected 200, received 500",
  repeatedFailure: false,
  testsPassed: false,
}))
```

이 예시는 loop stop condition을 코드처럼 사고하게 해줍니다. 실패를 보고도 계속할 수 있지만, 같은 실패가 반복되면 막힘으로 보고해야 할 수 있습니다. 이것이 agent가 오래 일하는 것과 잘 일하는 것의 차이입니다.

### 패턴 2: 공식 출처 검증 루프

문서나 강의를 만들 때는 source verification loop가 필요합니다. agent는 출처를 열고, 인용할 문구를 확인하고, KB나 lesson의 주장과 맞는지 대조해야 합니다. 종료 조건은 "공식 출처를 열어 핵심 문구를 확인했고, 인용이 원문과 일치한다"가 됩니다.

이 루프에서는 tool result가 너무 많아질 수 있습니다. 여러 문서를 열고 긴 페이지를 읽으면 context가 빠르게 커집니다. 따라서 필요한 passage만 요약하고, 인용 후보를 Quote Bank처럼 분리하는 구조가 좋습니다. 이 판단은 context engineering과 연결됩니다.

### 패턴 3: 위험 명령 차단 루프

agent가 shell을 사용할 수 있는 환경에서는 위험한 명령을 차단해야 합니다. Claude hooks 문서가 설명하는 것처럼 hook은 dangerous operations를 block할 수 있습니다. 반복 루프에서는 이 통제가 더 중요합니다. 한 번의 위험 명령도 문제지만, 자동 반복 중 위험 명령이 여러 번 시도될 수도 있기 때문입니다.

```ts
type ToolRequest = {
  tool: "Read" | "Edit" | "Bash"
  input: string
}

function preToolUse(request: ToolRequest) {
  const destructive = /rm\s+-rf|git\s+reset\s+--hard/i.test(request.input)

  if (request.tool === "Bash" && destructive) {
    return { decision: "block", reason: "destructive command" }
  }

  return { decision: "allow" }
}

console.log(preToolUse({ tool: "Bash", input: "npm test" }))
```

이 코드는 hook의 실제 SDK 구현이 아니라 실행 경계에서 block 결정을 넣는 사고 모델입니다. 중요한 점은 위험 행동을 prompt 뒤쪽의 주의사항으로만 두지 않고, loop 중간의 control point로 만든다는 것입니다.

### 패턴 4: 막힘 보고 루프

좋은 agent loop는 실패를 숨기지 않습니다. 공식 문서들이 blockers, checkpoints, stopping conditions를 다루는 이유가 여기에 있습니다. 예를 들어 필요한 파일이 없거나, 같은 테스트 실패가 반복되거나, 공식 출처가 확인되지 않으면 agent는 계속 추측하기보다 막힘을 보고해야 합니다.

막힘 보고는 포기가 아닙니다. 오히려 loop를 안전하게 종료하는 방식입니다. 사용자는 무엇이 확인되었고 무엇이 확인되지 않았는지 알아야 다음 결정을 내릴 수 있습니다.

## 한계와 트레이드오프

첫 번째 한계는 과도한 통제입니다. max turns, budget, allowed tools를 너무 좁게 잡으면 agent가 실제로 필요한 탐색을 하지 못할 수 있습니다. loop를 통제해야 하지만, 작업 성격에 맞는 여유도 필요합니다.

두 번째 한계는 context 손실입니다. compaction이나 summary는 context 비용을 줄이지만, 세부 근거가 빠질 수 있습니다. 그래서 중요한 근거, 실패 로그의 핵심, 아직 확인하지 않은 범위는 구조화해 남겨야 합니다.

세 번째 한계는 성공 신호의 모호함입니다. "잘 됨", "괜찮음", "완성" 같은 신호는 loop 종료 조건으로 약합니다. 테스트 통과, 공식 출처 확인, 빌드 성공, 사람 승인처럼 환경에서 확인 가능한 신호가 더 강합니다.

네 번째 한계는 hook과 permission이 모든 문제를 해결하지 않는다는 점입니다. hook은 실행 경계에서 통제점을 제공하지만, 목표가 모호하거나 source가 부족하면 loop 품질은 여전히 낮을 수 있습니다. 권한 제한과 좋은 작업 정의가 함께 필요합니다.

다섯 번째 한계는 반복 자체에 대한 과신입니다. loop가 길수록 결과가 좋아지는 것은 아닙니다. Anthropic 문서가 말한 것처럼 mistakes can propagate and compound할 수 있습니다. ==좋은 Loop Engineering은 더 오래 돌리는 설계가 아니라, 더 빨리 확인하고 더 명확히 멈추는 설계입니다.==

마지막으로 Loop Engineering은 Harness Engineering과 분리해서 끝나지 않습니다. loop는 반복 구조를 다루고, harness는 그 반복을 실행·기록·승인·복구·평가하는 제어면을 다룹니다. 실무 agent 시스템에서는 두 개념이 함께 필요합니다.

## 더 읽기

먼저 Claude Code의 How the agent loop works를 읽어 agent session cycle과 turn, tool result, budget, permission의 기본 구조를 잡으세요. 그 다음 How Claude Code works에서 gather context, take action, verify results가 실제 coding loop에서 어떻게 섞이는지 보세요. Anthropic의 Building effective agents는 stopping conditions와 workflow/agent 구분을 이해하는 데 좋습니다.

- [How the agent loop works — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/agent-loop)
- [How Claude Code works — Claude Code Docs](https://code.claude.com/docs/en/how-claude-code-works)
- [Building effective agents — Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- [Intercept and control agent behavior with hooks — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/hooks)
- [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Demystifying evals for AI agents — Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

읽는 순서는 loop 구조, coding loop, stopping conditions, hooks, context management, eval 순서가 좋습니다. 이 순서로 읽으면 "agent가 반복한다"는 막연한 이해에서 "반복을 어디서 제한하고, 무엇으로 검증하며, 언제 사람에게 넘길지"라는 실무 설계로 넘어갈 수 있습니다.
