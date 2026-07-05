## 오늘 배울 것

오늘은 Agent Loop의 구조를 배웁니다. Agent Loop는 모델이 상태를 평가하고, 도구를 호출하고, 결과를 받아 다시 판단하는 반복 실행 구조입니다.

핵심은 AI가 한 번 답하는 구조에서 벗어나는 것입니다. 관찰, 판단, 행동, 결과 반영이 여러 턴 이어질 때 어떤 장치가 필요한지 배웁니다.

## 한 줄 정의

Agent Loop는 모델이 상태를 평가하고 도구를 호출하며 결과를 받아 다시 판단하는 반복 실행 구조입니다.

Tool Calling이 한 번의 행동을 외부 실행으로 연결하는 메커니즘이라면, Agent Loop는 그런 호출과 결과 반영을 여러 턴 반복하는 실행 구조입니다.

## 쉬운 비유

정비사가 고장 난 기계를 고치는 장면을 떠올려보세요. 정비사는 증상을 보고, 도구로 확인하고, 결과를 보고, 다시 다음 조치를 정합니다. 한 번 보고 바로 끝내지 않습니다.

Agent Loop도 비슷합니다. 모델은 요청을 보고 답하거나 도구 호출을 만들고, 도구 실행 결과를 다시 받아 다음 판단을 합니다. 다만 정비사와 달리, 이 루프에는 권한, 비용, turn 제한 같은 실행 장치가 함께 필요합니다.

## 왜 생겼는가

단일 LLM 호출은 텍스트를 한 번 생성합니다. 하지만 실제 작업은 파일 읽기, 명령 실행, 검색, 편집, 테스트처럼 중간 행동과 결과 확인이 필요합니다.

Claude Agent SDK 문서는 에이전트 루프를 Claude가 프롬프트를 평가하고, 도구를 호출하고, 결과를 받은 뒤 작업이 끝날 때까지 반복하는 실행 루프로 설명합니다. 이 구조 덕분에 새로 발견한 오류나 정보를 다음 판단에 반영할 수 있습니다.

## 어떤 문제를 해결하는가

첫 번째 문제는 한 번의 답변으로 실제 작업을 끝내기 어렵다는 점입니다. 도구가 없으면 Claude는 텍스트로만 응답하지만, 도구가 있으면 파일 읽기, 명령 실행, 코드 검색, 외부 서비스 상호작용을 수행할 수 있습니다.

두 번째 문제는 중간 결과를 반영해야 한다는 점입니다. 테스트가 실패했거나 검색 결과가 부족하면, 그 결과를 다시 모델 판단에 넣어 다음 행동을 바꿔야 합니다.

## 핵심 개념

첫째, 루프는 prompt 수신, 평가와 응답, 도구 실행, 반복, 최종 결과 반환 단계로 구성됩니다. 모델은 요청을 평가하고 필요한 경우 도구 호출을 포함한 출력을 만듭니다.

둘째, 한 turn은 모델 출력과 도구 실행 결과가 오가는 왕복입니다. SDK가 도구를 실행하고 그 결과를 다시 모델에 제공하면, 모델은 다음 행동을 판단합니다.

셋째, Tool Calling은 루프의 행동 단위입니다. Tool Calling에서는 모델이 호출할 도구와 인자를 구조화해 반환하고, 애플리케이션이나 제공자 인프라가 실행을 맡습니다.

넷째, 루프에는 제한 장치가 필요합니다. max_turns와 max_budget_usd는 루프의 길이와 비용을 제한하고, permission_mode, allowed_tools, disallowed_tools는 도구 실행 권한과 승인 방식을 제어합니다.

다섯째, 도구 실행에는 순서가 중요합니다. KB는 read-only 도구는 병렬 실행될 수 있지만 상태를 바꾸는 도구는 충돌 방지를 위해 순차 실행된다고 설명합니다.

여섯째, 루프 상태는 메시지로 드러납니다. Claude Agent SDK는 SystemMessage, AssistantMessage, UserMessage, StreamEvent, ResultMessage 같은 메시지 타입으로 루프 상태를 노출한다고 설명합니다. 따라서 에이전트 실행은 단순한 최종 답변이 아니라 중간 상태가 쌓이는 과정입니다.

## 실제 예시

버그 수정 에이전트를 생각해봅시다. 첫 turn에서 모델은 실패 로그를 읽습니다. 다음 turn에서 관련 파일을 찾습니다. 그다음 수정하고 테스트를 다시 실행합니다. 실패하면 결과를 보고 접근을 조정합니다.

이 흐름은 단순 반복문과 다릅니다. 각 turn마다 모델 판단, 도구 호출, 도구 결과, 권한 확인, 최종 결과 반환이 함께 움직입니다.

리서치 에이전트도 같은 구조를 가집니다. 검색하고, 문서를 읽고, 충분한 근거가 모였는지 판단한 뒤 최종 결과를 냅니다. 중간 결과가 부족하면 루프는 다시 검색이나 읽기 행동으로 돌아갑니다.

## 코드 예시

아래 코드는 Agent Loop 상태를 간단히 표현한 예시입니다.

```ts
type AgentLoopState = {
  turn: number
  goal: string
  toolCalls: Array<{ name: string; status: "requested" | "done" | "blocked" }>
  done: boolean
}

const state: AgentLoopState = {
  turn: 2,
  goal: "실패한 테스트 원인을 찾습니다",
  toolCalls: [{ name: "run_tests", status: "done" }],
  done: false,
}

console.log(`turn ${state.turn}: ${state.goal}`)
```

## AI 시대에서의 의미

바이브코딩에서 Agent Loop는 AI를 “답변자”에서 “작업자”로 바꿉니다. AI는 파일을 읽고, 도구를 호출하고, 결과를 보고, 다음 행동을 정할 수 있습니다.

하지만 루프가 있다고 자동으로 안전해지는 것은 아닙니다. 비용과 지연이 늘 수 있고, 도구 권한을 잘못 주면 위험해질 수 있습니다. 그래서 종료 조건, 예산, 권한, 검증 기준을 함께 설계해야 합니다.

## 자주 헷갈리는 것

Agent Loop는 그냥 반복문이 아닙니다. 모델 응답, 도구 호출, 도구 결과, 권한, 비용 제한, 최종 결과 메시지를 포함하는 실행 구조입니다.

Tool Calling과 Agent Loop도 다릅니다. Tool Calling은 한 번의 도구 호출을 만드는 메커니즘이고, Agent Loop는 그런 호출과 결과 반영을 여러 턴 반복합니다.

루프가 길면 항상 좋은 것도 아닙니다. KB는 max_turns와 max_budget_usd 같은 제한을 설명하고, 에이전트가 비용과 지연을 성능과 교환한다고 말합니다.

## 실무에서 쓰는 방식

실무에서는 루프를 시작하기 전에 목표, 허용 도구, 금지 도구, 최대 turn, 예산을 정합니다. 파일 읽기처럼 상태를 바꾸지 않는 도구와 수정·실행처럼 상태를 바꾸는 도구도 구분합니다.

작업이 끝났는지는 최종 발화만으로 판단하지 않습니다. KB는 outcome과 grader를 분리해 평가해야 한다고 설명합니다. 실제 테스트 결과나 환경 상태를 확인해야 루프가 성공했는지 알 수 있습니다.

루프가 길어질수록 컨텍스트 관리도 함께 필요합니다. 도구 결과와 대화 이력이 누적되므로, 오래된 내용을 요약하고 현재 목표와 남은 위험을 작은 상태로 유지해야 다음 turn의 판단이 흐려지지 않습니다.

## 공부 체크리스트

- Agent Loop를 평가, 도구 호출, 결과 반영, 반복 구조로 설명할 수 있다.
- 한 turn이 모델 출력과 도구 결과의 왕복이라는 점을 말할 수 있다.
- Tool Calling과 Agent Loop의 차이를 구분할 수 있다.
- max_turns, budget, allowed_tools가 왜 필요한지 예로 들 수 있다.

## 참고 출처

- [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop)
- [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [Function calling](https://developers.openai.com/api/docs/guides/function-calling)
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
