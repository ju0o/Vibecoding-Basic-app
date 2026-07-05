## 오늘 배울 것

오늘은 Tool Calling이 무엇인지 배웁니다. Tool Calling은 AI가 외부 함수나 도구를 구조화된 요청으로 선택하게 하는 연결 방식입니다.

강의의 목표는 "AI가 도구를 직접 실행한다"는 오해를 바로잡는 것입니다. 모델은 호출할 도구와 인자를 제안하고, 실제 실행은 애플리케이션이나 제공자 인프라가 맡는다는 경계를 배웁니다.

## 한 줄 정의

Tool Calling은 모델이 외부 함수나 도구를 구조화된 요청으로 선택하게 하는 연결 방식입니다.

OpenAI는 function calling을 모델이 외부 시스템과 인터페이스하고 학습 데이터 밖의 데이터나 애플리케이션 동작에 접근하게 하는 방법으로 설명합니다.

## 쉬운 비유

Tool Calling은 식당에서 손님이 주문서를 쓰는 일과 비슷합니다. 손님은 "비빔밥 하나, 맵기는 보통"처럼 필요한 메뉴와 옵션을 적습니다.

하지만 손님이 주방에 들어가 요리하지는 않습니다. 주문서를 받은 주방이 실제 요리를 합니다. Tool Calling에서도 모델은 도구 이름과 입력값을 구조화해 내놓고, 애플리케이션이 그 요청을 실행합니다.

다만 비유와 다른 점은 주문서의 형식이 매우 중요하다는 것입니다. JSON Schema 같은 입력 구조가 있어야 모델이 어떤 인자를 만들어야 하는지 알 수 있습니다.

## 왜 생겼는가

OpenAI는 2023년 6월 13일 Chat Completions API에 function calling 기능을 발표했습니다. 개발자가 함수를 설명하면 모델이 해당 함수 호출 인자를 JSON 객체로 출력할 수 있다는 설명이었습니다.

Claude 문서도 tool use를 비슷한 구조로 설명합니다. Claude는 사용자 요청과 도구 설명을 바탕으로 도구 호출 여부를 결정하고, structured call을 반환합니다.

## 어떤 문제를 해결하는가

LLM은 기본적으로 텍스트를 생성합니다. 하지만 최신 날씨 조회, 데이터베이스 질의, 이메일 전송 같은 일은 텍스트 생성만으로 끝나지 않습니다. 외부 시스템을 실제로 호출해야 합니다.

Tool Calling은 이 경계를 분리합니다. 모델은 "무엇을 호출할지"와 "어떤 인자를 넣을지"를 구조화하고, 애플리케이션은 그 호출을 실행합니다. 그래서 모델의 판단 능력과 외부 도구·API를 더 안정적으로 연결할 수 있습니다.

## 핵심 개념

첫째, OpenAI의 function tool은 JSON Schema로 정의되는 특정 종류의 tool입니다. JSON Schema는 입력 데이터의 모양을 약속하는 형식입니다.

둘째, OpenAI function definition에는 type, name, description, parameters, strict 같은 필드가 포함됩니다. 이름만 주는 것이 아니라 무엇을 하는 도구인지, 어떤 입력이 필요한지 설명해야 합니다.

셋째, Claude client tool 정의에는 name, description, input_schema, 선택적 input_examples가 포함됩니다. description은 모델이 도구를 고를 때 참고하는 설명이므로 짧고 모호하면 안 됩니다.

넷째, Claude는 기본 tool_choice가 auto일 때 요청과 도구 설명을 바탕으로 도구 호출 여부를 결정합니다. 필요하면 tool_choice로 호출을 요구할 수도 있습니다.

다섯째, client tool과 server tool은 실행 책임이 다릅니다. client tool은 애플리케이션 코드가 실행하고, server tool은 제공자 인프라가 실행합니다.

## 실제 예시

사용자가 "서울의 현재 날씨를 알려줘"라고 묻는 상황을 생각해봅시다. 모델 자체는 최신 날씨를 알고 있는 것이 아닙니다.

애플리케이션은 `get_weather`라는 도구를 정의해둘 수 있습니다. 모델은 사용자의 요청을 읽고 `location: "서울"`이라는 입력을 만든 뒤 도구 호출을 요청합니다. 그 다음 애플리케이션이 실제 날씨 API를 실행하고 결과를 모델에 돌려줍니다.

같은 구조는 내부 데이터 조회에도 쓰입니다. 사용자가 "이번 달 매출 상위 고객을 알려줘"라고 묻는다면 모델은 적절한 조회 함수와 인자를 구성할 수 있습니다. 하지만 실제 데이터베이스 접근은 애플리케이션이 허용한 도구 안에서만 일어납니다.

## 코드 예시

아래는 도구 정의를 객체로 표현한 예시입니다.

```ts
const getWeatherTool = {
  type: "function",
  name: "get_weather",
  description: "Get current weather for a location",
  parameters: {
    type: "object",
    properties: { location: { type: "string" } },
    required: ["location"],
    additionalProperties: false,
  },
  strict: true,
}

console.log(getWeatherTool.name)
```

## AI 시대에서의 의미

바이브코딩에서 Tool Calling은 AI가 답변을 넘어 실제 개발 환경, 파일, 데이터베이스, API와 상호작용하는 접점입니다.

동시에 안전 경계이기도 합니다. 이메일 전송, 구매, 게시처럼 실제 영향이 있는 작업은 함수 호출 전 사용자 확인을 두어야 합니다. 모델이 호출을 제안하더라도 실행 책임과 승인 절차는 시스템이 설계해야 합니다.

## 자주 헷갈리는 것

첫째, Tool Calling은 모델이 직접 함수를 실행한다는 뜻이 아닙니다. client tool에서는 모델이 구조화된 호출을 반환하고 애플리케이션이 실행합니다.

둘째, API 호출과 Tool Calling은 같은 층위가 아닙니다. API 호출은 애플리케이션 코드가 직접 수행하는 네트워크 요청이고, Tool Calling은 모델이 어떤 호출이 필요한지 구조화해 제안하는 인터페이스입니다.

셋째, Tool Calling과 MCP도 다릅니다. Tool Calling은 도구 호출 메커니즘이고, MCP는 도구·리소스·프롬프트를 클라이언트와 서버 사이에서 표준화하는 프로토콜입니다.

## 실무에서 쓰는 방식

실무에서는 내부 API 조회, 검색 보강, 안전한 작업 실행에 Tool Calling을 씁니다. 예를 들어 사용자가 "이번 달 매출 상위 고객"을 묻는다면 모델이 `get_customers_by_revenue` 같은 함수 인자를 구성하게 할 수 있습니다.

도구 설명은 자세히 작성합니다. 무엇을 하는지, 언제 써야 하는지, 어떤 입력이 필요한지 분명해야 합니다. 실제 영향이 있는 도구는 자동 실행하지 않고 사용자 확인과 권한 경계를 둡니다.

검색 보강에서도 같은 원리가 적용됩니다. 모델이 바로 답하지 않고 web search, file search, remote MCP server 같은 도구를 먼저 호출하게 만들 수 있습니다. 이때 중요한 것은 도구를 많이 주는 것이 아니라, 현재 요청에 필요한 도구와 안전한 실행 경계를 분명히 하는 것입니다.

## 공부 체크리스트

- Tool Calling이 모델의 직접 실행이 아니라 구조화된 호출 요청임을 설명할 수 있다.
- JSON Schema가 도구 입력 구조를 약속하는 역할을 말할 수 있다.
- client tool과 server tool의 실행 책임 차이를 구분할 수 있다.
- Tool Calling과 MCP의 층위 차이를 한 문장으로 설명할 수 있다.

## 참고 출처

- [Function calling](https://developers.openai.com/api/docs/guides/function-calling)
- [Using tools](https://developers.openai.com/api/docs/guides/tools)
- [Function calling and other API updates](https://openai.com/index/function-calling-and-other-api-updates/)
- [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)
