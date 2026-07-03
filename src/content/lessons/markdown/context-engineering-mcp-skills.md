## 오늘 배울 것

Prompt Engineering을 넘어 Context Engineering, MCP, Skills가 왜 필요한지 배웁니다.

AI 시스템 설계에서 맥락, 도구 연결, 재사용 절차가 어떻게 함께 작동하는지 이해합니다.

## 한 줄 정의

Context Engineering은 AI가 일할 수 있는 배경을 설계하는 일이고, MCP는 도구 연결의 표준이며, Skills는 반복 작업을 일관되게 수행하게 하는 재사용 절차입니다.

## 쉬운 비유

신입 팀원에게 일을 맡긴다고 생각해봅시다. 말 한마디로만 지시하면 결과가 흔들립니다.

업무 문서, 접근 가능한 도구, 팀 규칙, 예시, 완료 기준까지 주면 훨씬 안정적으로 일합니다. AI도 마찬가지입니다.

## 왜 생겼는가

초기 AI 활용은 프롬프트 한 번에 답을 받는 방식이 많았습니다. 하지만 실제 개발 작업은 파일을 읽고, 명령을 실행하고, 외부 문서를 확인하고, 결과를 검증해야 합니다.

프롬프트만으로는 이런 작업 맥락을 안정적으로 전달하기 어렵습니다. 그래서 컨텍스트 설계, 도구 프로토콜, 작업 스킬 같은 구조가 필요해졌습니다.

## 어떤 문제를 해결하는가

- AI가 필요한 파일과 규칙을 놓치는 문제를 줄입니다.
- 외부 서비스와 도구를 매번 새로 연결하는 비용을 낮춥니다.
- 반복 작업의 품질을 절차로 고정합니다.
- 여러 에이전트와 워크플로가 같은 기준으로 움직이게 합니다.

## 핵심 개념

Prompt Engineering은 요청 문장을 잘 쓰는 기술입니다. Context Engineering은 AI가 판단할 재료 전체를 설계하는 기술입니다.

MCP는 AI가 외부 도구를 호출하는 방식을 표준화합니다. 파일, 메일, 문서, GitHub, 데이터베이스 같은 세계와 AI를 연결합니다.

Skills는 반복되는 작업 절차입니다. 예를 들어 "프론트엔드 변경 후 모바일과 데스크톱 화면을 확인한다" 같은 기준을 저장해 재사용합니다.

Agent는 목표를 받고 도구와 컨텍스트를 사용해 여러 단계를 수행합니다. SubAgent와 Orchestration은 일을 나누고 조율하는 방식입니다.

## 실제 예시

"강의 검색 기능을 만들어줘"라고만 하면 AI는 데이터 구조, UI 위치, 모바일 동작, 진행률 저장 방식까지 추측해야 합니다.

Context Engineering을 적용하면 현재 콘텐츠 모델, 디자인 시스템, 검색 대상, 빈 상태, 검증 명령을 함께 제공합니다.

MCP가 있다면 AI는 GitHub 이슈나 Notion 기획 문서를 직접 읽을 수 있고, Skill이 있다면 검색 UI를 만든 뒤 접근성과 브라우저 확인을 반복할 수 있습니다.

## 코드 예시

```ts
type AgentContext = {
  readonly goal: string
  readonly files: readonly string[]
  readonly tools: readonly string[]
  readonly rules: readonly string[]
  readonly doneWhen: readonly string[]
}

const context: AgentContext = {
  goal: "강의 제목, 요약, 용어를 검색하는 UI 구현",
  files: ["src/content/curriculum.ts", "src/content/glossary.ts"],
  tools: ["typecheck", "browser visual QA"],
  rules: ["콘텐츠와 UI 분리", "모바일 반응형", "다크모드"],
  doneWhen: ["검색어 입력 시 결과가 좁혀짐", "빈 결과 메시지가 보임"],
}
```

## AI 시대에서의 의미

AI 엔지니어링은 좋은 프롬프트를 넘어서 좋은 작업 환경을 만드는 방향으로 움직입니다.

결과 품질은 모델만이 아니라 어떤 맥락을 주고, 어떤 도구를 연결하고, 어떤 루프로 검증하는지에 의해 결정됩니다.

## 자주 헷갈리는 것

컨텍스트는 긴 글을 많이 넣는 것이 아닙니다. 목표에 필요한 정보만 정확히 주는 것이 중요합니다.

MCP는 특정 서비스 하나가 아닙니다. AI와 도구 사이의 연결 방식을 표준화하려는 프로토콜입니다.

Skill은 마법 명령이 아닙니다. 반복 가능한 기준과 절차를 담은 작업 습관입니다.

## 실무에서 쓰는 방식

실무에서는 프로젝트 규칙, 코드 구조, 완료 기준을 먼저 정리합니다. 그런 다음 AI에게 필요한 파일과 검증 방법을 함께 줍니다.

복잡한 작업은 Agent가 여러 단계로 나누고, SubAgent가 일부 조사를 맡고, Orchestration이 결과를 합칩니다. Loop Engineering은 이 과정을 검증과 수정 루프로 안정화합니다.

## 공부 체크리스트

- Prompt Engineering과 Context Engineering의 차이를 말할 수 있다.
- MCP가 왜 필요한지 외부 도구 연결 관점에서 설명할 수 있다.
- Skills, Agent, SubAgent, Orchestration의 관계를 큰 흐름으로 설명할 수 있다.

## 참고 출처

- Model Context Protocol: https://modelcontextprotocol.io/
- OpenAI Developers: https://developers.openai.com/
- Next.js Docs: https://nextjs.org/docs
