## 오늘 배울 것

오늘은 AI Workflow 설계를 배웁니다. Workflow는 미리 정의된 코드 경로로 LLM과 도구를 조정하는 방식입니다.

핵심은 AI에게 모든 과정을 맡기는 것이 아닙니다. 사람이 작업 단계를 정하고, 각 단계가 끝났는지 확인하는 품질 게이트를 두어 반복 작업을 예측 가능하게 만드는 법을 배웁니다.

## 한 줄 정의

AI Workflow는 미리 정의된 실행 경로로 LLM과 도구를 조정하는 작업 흐름입니다.

Agent가 모델이 과정과 도구 사용을 동적으로 정하는 방식이라면, Workflow는 사람이 경로를 먼저 정합니다. 예측 가능성이 중요한 작업에서는 이 차이가 매우 중요합니다.

## 쉬운 비유

여행 일정을 생각해봅시다. “알아서 좋은 곳을 다녀와”라고 맡기면 자유롭지만 결과를 예측하기 어렵습니다. 반대로 “역 도착, 호텔 체크인, 점심, 박물관, 저녁”처럼 순서를 정하면 움직임이 단순해집니다.

AI Workflow도 같습니다. AI가 매번 스스로 다음 행동을 정하게 하지 않고, 읽기, 작성, 검토, 수정처럼 정해진 순서를 따라가게 합니다. 다만 여행 일정과 달리, 각 단계에는 도구 호출과 결과 검증이 함께 들어갈 수 있습니다.

## 왜 생겼는가

Anthropic은 agentic systems를 workflows와 agents로 구분합니다. Workflows는 미리 정의된 코드 경로로 LLM과 도구를 조정하고, agents는 LLM이 자기 프로세스와 도구 사용을 동적으로 지휘하는 시스템입니다.

이 구분은 복잡도를 조절하기 위해 필요합니다. Anthropic은 agentic systems가 비용과 지연을 성능과 교환한다고 설명하며, 복잡도를 늘리기 전에 단순한 해결책을 먼저 검토하라고 권고합니다.

## 어떤 문제를 해결하는가

첫 번째 문제는 매번 결과가 달라지는 흐름입니다. 작업 순서가 없으면 AI는 어떤 때는 파일을 먼저 읽고, 어떤 때는 바로 수정하고, 어떤 때는 검증을 건너뛸 수 있습니다.

두 번째 문제는 성공 판단이 흐려지는 것입니다. Agent eval에서는 transcript, outcome, grader, harness를 구분해야 합니다. 즉 AI가 무슨 말을 했는지와 실제 결과가 성공했는지는 분리해서 봐야 합니다.

## 핵심 개념

첫째, Workflow는 미리 정의된 경로입니다. 사람이 “입력 확인 → 작업 → 검토 → 결과 반환” 같은 순서를 정하고, LLM과 도구는 그 경로 안에서 움직입니다.

둘째, Agent는 더 동적인 방식입니다. 모델이 자기 프로세스와 도구 사용을 정하므로 유연하지만, 비용과 지연이 늘 수 있습니다. 그래서 모든 작업을 Agent로 만들 필요는 없습니다.

셋째, 단계 분해는 작업을 작은 판단 단위로 나누는 일입니다. 단일 LLM 호출은 텍스트를 한 번 생성하지만, 실제 작업은 파일 읽기, 명령 실행, 검색, 편집, 테스트처럼 중간 행동과 결과 확인이 필요합니다.

넷째, 품질 게이트는 다음 단계로 넘어가기 전에 확인할 기준입니다. KB의 eval 개념으로 보면 outcome은 실제 결과이고, grader는 그 결과를 판정하는 기준입니다.

다섯째, harness는 실행과 평가를 감싸는 장치입니다. KB는 evaluation harness를 평가를 end-to-end로 실행하는 인프라로, agent harness를 모델이 에이전트처럼 행동하게 하는 시스템으로 설명합니다.

여섯째, 제한 장치도 Workflow 설계의 일부입니다. Agent Loop KB는 max_turns와 max_budget_usd가 루프의 길이와 비용을 제한한다고 설명합니다. Workflow 안에서도 단계가 끝없이 반복되지 않도록 길이와 비용의 경계를 정해야 합니다.

## 실제 예시

강의 초안을 만드는 Workflow를 생각해봅시다. 첫 단계는 승인된 KB를 읽는 것입니다. 두 번째 단계는 13개 섹션 초안을 작성하는 것입니다. 세 번째 단계는 퀴즈 정답이 보기와 정확히 일치하는지 확인하는 것입니다. 마지막 단계는 산출물 경로를 보고하는 것입니다.

이 흐름을 Agent에게 모두 자유롭게 맡기면 빠질 수 있는 단계가 생깁니다. Workflow로 정하면 “검증 전에는 다음 단계로 가지 않는다”는 품질 게이트를 둘 수 있습니다.

버그 수정 작업도 비슷합니다. “실패 로그 읽기 → 관련 파일 찾기 → 수정 → 테스트 재실행 → 결과 보고”처럼 경로를 정하면, AI가 중간 검증 없이 바로 결론을 내리는 일을 줄일 수 있습니다. 각 단계는 도구 호출과 결과 확인을 포함할 수 있습니다.

## 코드 예시

아래 코드는 단계를 먼저 정하고 각 단계마다 게이트를 두는 예시입니다.

```ts
type WorkflowStep = {
  name: string
  action: string
  gate: string
}

const lessonWorkflow: WorkflowStep[] = [
  { name: "read", action: "승인된 KB 읽기", gate: "status가 approved인지 확인" },
  { name: "write", action: "13섹션 작성", gate: "섹션 제목이 모두 있는지 확인" },
  { name: "quiz", action: "퀴즈 작성", gate: "answer가 options와 일치하는지 확인" },
]

for (const step of lessonWorkflow) {
  console.log(`${step.name}: ${step.gate}`)
}
```

## AI 시대에서의 의미

바이브코딩에서 Workflow는 AI를 덜 쓰는 방식이 아닙니다. AI가 잘하는 생성과 판단을 쓰되, 사람이 실행 경로와 완료 기준을 정해 결과를 반복 가능하게 만드는 방식입니다.

특히 교육 콘텐츠, 코드 리뷰, 배포 검증처럼 빠뜨리면 안 되는 단계가 있는 작업에 적합합니다. Agent처럼 자율성을 크게 주기 전에, Workflow로도 해결되는지 먼저 검토하는 것이 안전합니다.

## 자주 헷갈리는 것

Workflow와 Agent는 같은 말이 아닙니다. Workflow는 미리 정의된 코드 경로를 따르고, Agent는 모델이 과정과 도구 사용을 동적으로 정합니다.

품질 게이트는 AI의 설명을 믿는 절차가 아닙니다. KB의 eval 개념처럼 실제 outcome과 그것을 평가하는 grader를 분리해 보는 절차입니다.

단계가 많다고 좋은 Workflow도 아닙니다. 복잡도를 늘리기 전에 단순한 해결책을 검토해야 합니다.

## 실무에서 쓰는 방식

실무에서는 반복되는 작업을 먼저 단계로 나눕니다. 예를 들어 “입력 확인, 작업 수행, 결과 검증, 보고”처럼 최소 경로를 만들고, 각 단계마다 넘어가도 되는 기준을 둡니다.

도구를 사용하는 단계에서는 권한과 비용도 함께 봅니다. Agent Loop KB는 max_turns, max_budget_usd, permission_mode, allowed_tools 같은 제한 장치를 설명합니다. Workflow 안에서도 이런 제한을 품질 게이트와 함께 사용합니다.

검증 단계에서는 transcript만 보지 않습니다. AI가 어떤 말을 했는지보다 실제 outcome이 요구를 만족하는지가 중요합니다. 그래서 grader 역할을 하는 기준을 단계마다 두면, 설명은 그럴듯하지만 결과가 틀린 상황을 줄일 수 있습니다.

## 공부 체크리스트

- Workflow를 미리 정의된 코드 경로로 LLM과 도구를 조정하는 방식이라고 설명할 수 있다.
- Workflow와 Agent의 차이를 한 문장으로 구분할 수 있다.
- 단계 분해와 품질 게이트가 왜 필요한지 예로 들 수 있다.
- outcome, grader, harness를 성공 판단과 연결해 설명할 수 있다.

## 참고 출처

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop)
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
