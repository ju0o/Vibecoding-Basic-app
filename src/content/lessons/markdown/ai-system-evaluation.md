## 한 줄 정의

AI System Evaluation은 모델 출력뿐 아니라 도구 사용, trace, 환경 상태, 성공 기준을 함께 측정해 AI 애플리케이션 품질을 판단하는 평가 체계입니다. 일반 테스트가 deterministic code behavior를 확인하는 데 익숙하다면, AI 평가에서는 variable output, agent loop, tool call, handoff, final environment outcome을 함께 봐야 합니다.

OpenAI는 evaluations를 model outputs가 지정한 style과 content criteria를 만족하는지 테스트하는 방법으로 설명하고, agent workflow에서는 traces, graders, datasets, eval runs를 사용한다고 설명합니다. Anthropic은 agent eval에서 tools, task, environment, agent loop, final environment state를 함께 본다고 설명합니다. ==AI System Evaluation의 핵심은 "좋아 보이는 답변"이 아니라 "정의한 성공 기준을 실제 실행이 만족했는가"입니다.==

바이브코딩에서 이 차이는 큽니다. AI가 만든 코드가 그럴듯하게 설명되어도 테스트가 실패하면 성공이 아닙니다. agent가 "완료"라고 말해도 실제 repo 상태가 바뀌지 않았거나, 잘못된 tool을 골랐거나, runtime resource limit 때문에 실패했다면 성공이 아닙니다.

이 강의는 eval을 단순 채점표로 다루지 않습니다. success criteria, trace grading, dataset eval, grader, transcript와 outcome, infrastructure noise, resource budget을 연결해서 AI 시스템을 어떻게 반복적으로 개선할지 설명합니다.

## 왜 존재하는가

전통적인 소프트웨어 테스트는 같은 입력에 같은 출력이 나오는 결정적 코드에 강합니다. 함수가 예상 값을 반환하는지, API가 상태 코드를 맞게 주는지, UI가 특정 이벤트에서 상태를 바꾸는지 확인합니다. 하지만 generative AI는 같은 입력에도 다른 출력을 낼 수 있고, agent는 여러 turn 동안 도구를 호출하며 환경을 바꿀 수 있습니다.

OpenAI Evaluation best practices 문서는 generative AI가 variable하고 nondeterministic이기 때문에 evals가 AI system을 테스트하는 방법이라고 설명합니다. 즉 eval은 AI가 불안정해서 어쩔 수 없이 하는 임시 조치가 아니라, AI 시스템의 품질을 다루기 위한 기본 구조입니다.

Agent workflow는 더 복잡합니다. OpenAI는 trace가 model calls, tool calls, guardrails, handoffs를 포함한 end-to-end record라고 설명합니다. Anthropic은 agentic coding evals에서 runtime environment가 passive container가 아니라 problem-solving process의 integral component라고 설명합니다. 따라서 최종 텍스트만 보면 agent 품질을 제대로 알 수 없습니다.

AI System Evaluation은 이 문제를 해결하려고 존재합니다. prompt가 좋아 보이는지보다 실제 작업 outcome이 기준을 만족했는지 봅니다. tool choice가 적절했는지, handoff가 필요한 시점에 일어났는지, safety policy를 어겼는지, tests가 통과했는지, resource budget 안에서 끝났는지 확인합니다.

또 하나의 배경은 플랫폼 변화입니다. KB에 따르면 OpenAI는 2026-07-05 기준 Evals platform을 deprecating 중이며, Evals가 2026-10-31에 read-only가 되고 2026-11-30에 shutdown scheduled라고 설명합니다. 이 사실은 eval 개념이 사라진다는 뜻이 아닙니다. 오히려 특정 플랫폼 기능과 일반 평가 설계를 구분해야 한다는 뜻입니다.

## 작동 원리

### 1. 먼저 success criteria를 정의합니다

Anthropic Platform 문서는 LLM application을 만들 때 success criteria를 먼저 정의하고, 그 기준을 측정할 evaluations를 설계하는 cycle이 prompt engineering의 중심이라고 설명합니다. 좋은 success criteria는 specific, measurable, achievable, relevant해야 합니다.

이 단계가 가장 중요합니다. "좋은 답변"은 평가 기준이 아닙니다. "공식 출처를 3개 이상 인용한다", "테스트가 통과한다", "사용자에게 민감 정보를 노출하지 않는다", "필요한 경우 handoff를 수행한다", "tool error를 숨기지 않는다"처럼 측정 가능한 기준이 필요합니다.

바이브코딩에서 success criteria는 작업 종류마다 달라집니다. 코드 수정이라면 tests-pass, no new lint errors, intended file diff가 기준이 될 수 있습니다. 문서 작성이라면 citation accuracy, section completeness, style compliance가 기준이 될 수 있습니다. agent orchestration이라면 correct handoff, tool choice, guardrail compliance가 기준이 될 수 있습니다.

### 2. Trace는 실행 경로를 보여줍니다

OpenAI agent workflow evaluation은 traces, graders, datasets, eval runs를 사용합니다. Trace는 one run의 model calls, tool calls, guardrails, handoffs를 포함하는 end-to-end record입니다. Trace grading은 workflow-level issues를 찾는 빠른 방법으로 제시됩니다.

Trace가 중요한 이유는 최종 결과만으로 원인을 알 수 없기 때문입니다. agent가 실패했을 때, 모델이 잘못 판단했는지, tool이 실패했는지, guardrail이 과하게 막았는지, handoff가 잘못되었는지 구분해야 합니다. Trace는 그 경로를 보여줍니다.

예를 들어 agent가 파일을 고쳤지만 테스트가 실패했다면, trace에서 어떤 파일을 읽었고 어떤 tool을 호출했으며 어떤 테스트 output을 받았는지 봐야 합니다. 그래야 실패를 prompt 문제로 볼지, tool 설계 문제로 볼지, environment 문제로 볼지 판단할 수 있습니다.

### 3. Grader는 criteria를 적용합니다

Success criteria는 "무엇이 좋은가"의 기준이고, grader는 그 기준을 출력이나 trace에 적용해 점수화하는 장치입니다. OpenAI agent eval 문서는 graders를 사용해 agent quality를 개선한다고 설명합니다. Anthropic 문서도 success criteria를 측정할 evaluation 설계를 강조합니다.

Grader는 자동일 수도 있고, 사람이 포함될 수도 있습니다. OpenAI Evaluation best practices 문서는 eval score만으로 충분하지 않고 metrics와 human judgment를 결합해야 한다고 설명합니다. 따라서 grader는 전체 판단을 대체하는 것이 아니라, 반복적으로 볼 수 있는 신호를 제공합니다.

좋은 grader는 기준과 연결되어야 합니다. "응답이 좋아 보이는가"보다 "출처 URL이 공식 문서인가", "trace에 필요한 tool call이 있었는가", "final environment outcome이 tests-pass인가"처럼 구체적인 신호가 낫습니다.

### 4. Dataset과 eval run은 반복성을 만듭니다

OpenAI 문서는 dataset과 eval run이 repeatability가 필요할 때 사용되며, prompt change, benchmark, larger-scale evaluation에 적합하다고 설명합니다. 이는 eval을 일회성 리뷰가 아니라 회귀 추적 도구로 만든다는 뜻입니다.

prompt를 바꾸거나 모델을 바꾸기 전에 representative dataset을 돌려야 합니다. 한두 개 예시에서 좋아 보여도 전체 작업군에서 품질이 떨어질 수 있습니다. eval run은 변경 전후를 비교하고, 어떤 작업 유형에서 나빠졌는지 찾는 데 필요합니다.

바이브코딩 교육 사이트에서도 이 원리는 적용됩니다. 강의 생성 agent를 개선한다면, 여러 KB와 lesson slug를 대표 dataset으로 두고 섹션 구조, 인용 정확성, glossary 반영, build 통과 여부를 반복 평가할 수 있습니다.

### 5. Transcript와 outcome을 분리합니다

Anthropic agent eval 문서는 evaluation harness, trials, transcripts, outcomes, graders를 구분합니다. Transcript는 trial의 complete record이고, outcome은 trial 끝의 final environment state입니다. 이 구분은 agent 평가의 핵심입니다.

agent가 "수정 완료"라고 말하는 transcript가 있어도, outcome이 실패일 수 있습니다. 코드가 실제로 바뀌지 않았거나, 테스트가 실패했거나, 파일이 잘못 수정되었을 수 있습니다. 반대로 transcript가 어색해도 outcome이 정확히 성공한 경우도 있습니다. 그래서 최종 발화와 환경 상태를 분리해 봐야 합니다.

이 구분은 harness engineering과 연결됩니다. 평가하려면 environment state를 기록할 수 있어야 하고, tests나 graders가 그 state를 확인해야 합니다. 단순 채팅 로그만으로는 agentic 작업 품질을 평가하기 어렵습니다.

### 6. Infrastructure noise도 평가 대상입니다

Anthropic infrastructure noise 글은 agentic coding eval에서 CPU, RAM, time limits 같은 runtime resource budgets가 평가 결과에 영향을 줄 수 있다고 설명합니다. 또한 runtime environment가 passive container가 아니라 problem-solving process의 integral component라고 설명합니다.

이 말은 중요합니다. agent가 실패한 이유가 모델 능력 때문이 아니라, 느린 환경, 부족한 RAM, time limit, package 설치 문제일 수 있습니다. 따라서 eval 결과를 해석할 때 runtime resource budget을 기록해야 합니다.

정적 benchmark에서는 runtime environment doesn't factor처럼 보일 수 있지만, agentic coding eval에서는 환경이 결과에 영향을 줍니다. 도구 호출 횟수, total runtime, token consumption, tool errors도 함께 봐야 합니다.

### 7. Evaluation은 prompt 개선보다 먼저 올 수 있습니다

많은 사람이 prompt를 먼저 고치고 eval을 나중에 붙입니다. 하지만 Anthropic 문서는 success criteria를 정의하고 evaluations를 설계하는 cycle을 강조합니다. 평가 기준이 없으면 prompt 개선이 실제 개선인지 알 수 없습니다.

따라서 AI 시스템 개발의 순서는 "prompt 작성 → 감으로 확인"이 아니라 "성공 기준 정의 → 평가 설계 → baseline 측정 → prompt나 tool 개선 → regression 확인"에 가까워야 합니다. ==eval은 마지막 채점이 아니라 개발 루프의 계기판입니다.==

## 스펙과 세부

### Agent eval case 구조

```ts
type AgentEvalCase = {
  input: string
  successCriteria: string[]
  traceChecks: ["tool-choice", "handoff", "guardrail"]
  outcomeChecks: ["tests-pass", "state-changed", "no-policy-violation"]
  resourceBudget: { maxTurns: number; maxMinutes: number }
}

const case1: AgentEvalCase = {
  input: "Fix the failing login test",
  successCriteria: ["target test passes", "no unrelated files changed"],
  traceChecks: ["tool-choice", "handoff", "guardrail"],
  outcomeChecks: ["tests-pass", "state-changed", "no-policy-violation"],
  resourceBudget: { maxTurns: 8, maxMinutes: 10 },
}

console.log(case1.successCriteria.length)
```

이 코드는 공식 SDK 타입이 아니라 AI System Evaluation을 사고하기 위한 예시입니다. input만 두는 것이 아니라 success criteria, trace checks, outcome checks, resource budget을 함께 둡니다.

### Trace grading과 dataset eval의 차이

Trace grading은 debugging 중 workflow-level issue를 빠르게 찾는 데 좋습니다. 특정 run에서 tool choice가 잘못되었는지, guardrail이 실패했는지, handoff가 빠졌는지 볼 수 있습니다. Dataset eval은 prompt change나 model migration처럼 반복성과 규모가 필요한 비교에 좋습니다.

둘 중 하나만 선택하는 문제가 아닙니다. 개발 중에는 trace grading으로 문제를 빨리 찾고, release 전에는 dataset eval로 regression을 확인하는 식으로 조합할 수 있습니다.

### Success criteria와 grader의 관계

Success criteria는 사람이 정한 목표입니다. Grader는 그 목표를 적용하는 기계적 또는 반기계적 장치입니다. 기준이 모호하면 grader도 모호합니다. 따라서 grader 품질은 criteria 품질에서 출발합니다.

예를 들어 "답변이 친절해야 한다"는 기준은 약합니다. "초보자에게 필요한 용어 3개를 정의하고, 공식 출처 2개 이상을 인용하며, 위험한 단정 표현을 피한다"는 기준은 더 측정 가능합니다.

### Platform lifecycle 확인

KB는 OpenAI Evals platform의 deprecation 일정을 포함합니다. 2026-07-05 기준 read-only와 shutdown scheduled 날짜가 공지되어 있으므로, 특정 플랫폼 기능을 쓰는 설계는 현재 문서의 transition guidance를 확인해야 합니다. 이 강의에서 중요한 것은 특정 플랫폼 이름이 아니라, eval 설계가 traces, datasets, graders, outcomes를 중심으로 계속 필요하다는 점입니다.

## 원문으로 읽기

> "Use traces, graders, datasets, and eval runs"
>
> — traces, graders, datasets, eval runs를 사용하라.
> [Evaluate agent workflows — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agent-evals)

이 문장은 agent workflow evaluation의 구성요소를 한 줄로 보여줍니다. agent 평가에는 최종 답변만으로 충분하지 않습니다. trace로 경로를 보고, grader로 기준을 적용하고, dataset과 eval run으로 반복성을 확보해야 합니다.

> "Generative AI is variable"
>
> — 생성형 AI는 가변적이다.
> [Evaluation best practices — OpenAI API Docs](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

AI 평가가 필요한 근본 이유입니다. 같은 입력에도 출력이 달라질 수 있으므로 deterministic unit test만으로는 품질을 충분히 설명하기 어렵습니다. variable output을 다루려면 criteria, grader, human judgment, metrics가 필요합니다.

> "clearly defining your success criteria"
>
> — 성공 기준을 명확히 정의하는 것.
> [Define success criteria and build evaluations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)

평가는 기준에서 시작합니다. 좋은 success criteria 없이 eval을 만들면 점수는 있어도 의미가 약합니다. 평가가 prompt 개선의 중심이 되려면 무엇이 성공인지 먼저 말할 수 있어야 합니다.

관련 원문(링크): [Demystifying evals for AI agents — Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

eval을 가장 짧게 이해하게 해주는 표현입니다. 단, agent eval에서는 이 test가 단일 텍스트 출력을 넘어서 tools, environment, transcript, outcome을 포함합니다. 그래서 evaluation harness가 필요합니다.

관련 원문(링크): [Quantifying infrastructure noise in agentic coding evals — Anthropic](https://www.anthropic.com/engineering/infrastructure-noise)

이 문장은 static benchmark와 agentic coding eval의 차이를 설명할 때 중요합니다. 정적 문제에서는 runtime environment가 크게 작용하지 않을 수 있지만, agentic coding eval에서는 CPU, RAM, time limits 같은 실행 환경이 결과에 영향을 줄 수 있습니다.

## 실전에서

### 패턴 1: trace review로 workflow 문제를 찾습니다

agent가 실패했을 때 최종 답변만 보면 원인을 알 수 없습니다. trace를 열어 model calls, tool calls, guardrails, handoffs를 봅니다. 잘못된 tool을 골랐는지, 필요한 handoff가 없었는지, guardrail을 우회했는지 확인합니다.

이 과정은 빠른 debugging에 좋습니다. dataset 전체를 돌리기 전에 특정 실패 run의 trace를 보고 구조 문제를 찾을 수 있습니다. 예를 들어 agent가 테스트를 실행하지 않고 "통과했다"고 말했다면, trace에서 test command가 실제로 없다는 사실을 확인할 수 있습니다.

### 패턴 2: regression eval set을 만듭니다

prompt나 model을 바꾸기 전에 대표 작업 묶음을 준비합니다. 쉬운 작업, 긴 작업, tool이 필요한 작업, handoff가 필요한 작업, 실패해야 하는 작업을 섞습니다. 변경 전후에 같은 eval run을 돌려 품질 변화를 봅니다.

이 방식은 AI 시스템을 운영 가능한 제품으로 만드는 데 필요합니다. 새 모델이 평균 점수는 좋아도 특정 작업에서 나빠질 수 있습니다. eval set이 있어야 그런 regression을 발견할 수 있습니다.

### 패턴 3: outcome을 환경 상태로 확인합니다

코딩 agent 평가에서는 final answer보다 repo 상태가 중요합니다. tests-pass, no unrelated file changed, build success, policy compliance 같은 outcome checks를 둡니다. 문서 agent라면 section completeness, citation accuracy, source registry compliance 같은 outcome checks를 둘 수 있습니다.

Transcript는 과정을 설명하지만 outcome은 결과 상태입니다. 둘을 함께 봐야 합니다. agent가 과정에서 좋은 말을 했더라도 outcome이 실패하면 release gate를 통과할 수 없습니다.

### 패턴 4: runtime resource budget을 기록합니다

agentic coding eval에서는 runtime environment가 결과에 영향을 줄 수 있습니다. maxTurns, maxMinutes, CPU, RAM, time limits 같은 budget을 기록해야 합니다. 같은 agent라도 resource budget이 다르면 결과가 달라질 수 있습니다.

tool evaluation에서는 total runtime, number of tool calls, token consumption, tool errors도 수집할 수 있습니다. 이 지표들은 품질뿐 아니라 비용과 안정성을 보여줍니다.

## 한계와 트레이드오프

첫 번째 한계는 eval 설계 비용입니다. 좋은 success criteria와 dataset, grader, trace checks를 만드는 데 시간이 듭니다. 하지만 기준 없이 prompt만 바꾸면 개선 여부를 알 수 없으므로, 이 비용은 제품 품질의 일부입니다.

두 번째 한계는 grader 과신입니다. 자동 grader가 점수를 주어도 human judgment가 필요할 수 있습니다. OpenAI 문서는 metrics와 human judgment를 결합해야 한다고 설명합니다. 특히 교육 콘텐츠, 안전 정책, UX 품질은 사람 검토가 함께 필요할 수 있습니다.

세 번째 한계는 eval set 과적합입니다. 같은 eval set만 반복하면 prompt가 그 set에 맞춰지고, 실제 사용에서는 약해질 수 있습니다. held-out tasks와 다양한 scenario가 필요합니다.

네 번째 한계는 environment noise입니다. agentic coding eval에서는 runtime resource budgets가 결과에 영향을 줍니다. 평가가 낮게 나왔을 때 모델만 탓하면 안 됩니다. 환경과 도구 오류도 함께 봐야 합니다.

다섯 번째 한계는 플랫폼 변화입니다. 특정 eval platform 기능은 deprecate될 수 있습니다. 따라서 평가 설계는 특정 제품 UI에만 묶이지 말고, success criteria, traces, datasets, graders, outcomes라는 일반 구조로 남겨야 합니다.

마지막으로 eval은 완벽한 진실이 아닙니다. eval은 품질을 보는 렌즈입니다. 렌즈가 좋아질수록 시스템 개선이 쉬워지지만, 렌즈 자체도 계속 검증하고 개선해야 합니다. ==좋은 AI System Evaluation은 agent를 심판하는 장치이면서, 동시에 agent를 더 좋게 만드는 피드백 루프입니다.==

## 더 읽기

먼저 OpenAI의 Evaluate agent workflows 문서로 traces, graders, datasets, eval runs의 전체 구조를 잡으세요. 그 다음 Evaluation best practices에서 generative AI가 variable하다는 문제의식을 읽고, Claude의 success criteria 문서로 기준 작성법을 봅니다. Anthropic의 Demystifying evals for AI agents는 transcript, outcome, evaluation harness를 이해하는 데 좋습니다. 마지막으로 infrastructure noise 글을 읽으면 agentic coding eval에서 runtime environment가 왜 중요한지 보입니다.

- [Evaluate agent workflows — OpenAI API Docs](https://developers.openai.com/api/docs/guides/agent-evals)
- [Working with evals — OpenAI API Docs](https://developers.openai.com/api/docs/guides/evals)
- [Evaluation best practices — OpenAI API Docs](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Trace grading — OpenAI API Docs](https://developers.openai.com/api/docs/guides/trace-grading)
- [Define success criteria and build evaluations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)
- [Demystifying evals for AI agents — Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Quantifying infrastructure noise in agentic coding evals — Anthropic](https://www.anthropic.com/engineering/infrastructure-noise)
- [Writing effective tools for AI agents — Anthropic](https://www.anthropic.com/engineering/writing-tools-for-agents)

읽을 때는 "이 평가가 output만 보는가, trace와 outcome까지 보는가"를 계속 물어보세요. 그 질문이 일반 AI 답변 평가와 agent system evaluation을 나누는 가장 중요한 기준입니다.
