## 오늘 배울 것

오늘은 MCP의 구조를 배웁니다. MCP는 AI 애플리케이션을 외부 시스템에 연결하기 위한 오픈소스 표준입니다.

특히 host, client, server가 어떻게 나뉘는지, tools와 resources가 무엇이 다른지, Tool Calling과 MCP가 어떤 관계인지 정리합니다.

## 한 줄 정의

MCP는 AI 애플리케이션을 외부 시스템에 연결하기 위한 오픈소스 표준입니다.

Model Context Protocol 문서는 MCP를 데이터 소스, 도구, 워크플로를 AI 애플리케이션과 연결하는 표준으로 설명합니다.

## 쉬운 비유

MCP는 여러 전자기기를 연결하는 공통 포트처럼 생각할 수 있습니다.

노트북마다 충전기 모양이 다르면 매번 별도 어댑터가 필요합니다. 공통 포트가 있으면 기기와 주변 장치를 일관된 방식으로 연결할 수 있습니다. MCP도 AI 애플리케이션과 외부 데이터·도구 사이의 연결 방식을 표준화합니다.

다만 MCP는 단순한 케이블이 아닙니다. 누가 연결을 관리하는지, 어떤 서버가 어떤 도구와 리소스를 제공하는지, 사용자가 무엇을 승인해야 하는지까지 나누는 아키텍처입니다.

## 왜 생겼는가

MCP 공식 문서는 최신 사양 버전을 2025-11-25로 표시합니다. MCP는 AI 애플리케이션이 파일, 데이터베이스, 검색 엔진, 계산기, 전문 프롬프트 같은 외부 시스템에 접근하도록 표준 연결 방식을 제공하기 위해 만들어졌습니다.

AI 애플리케이션마다 외부 시스템을 별도 방식으로 붙이면 연결 코드, 권한 경계, 도구 설명, 결과 형식이 반복됩니다. MCP는 서버를 한 번 만들면 여러 클라이언트와 서버 생태계에서 통합하기 쉬워지는 방향을 제공합니다.

그래서 MCP는 도구 하나의 편의 기능이 아니라 연결 방식의 반복을 줄이는 구조입니다. 같은 외부 시스템을 여러 AI 클라이언트에서 쓰고 싶을 때, 서버가 표준 방식으로 tools, resources, prompts를 제공할 수 있습니다.

## 어떤 문제를 해결하는가

첫 번째 문제는 연결 방식의 반복입니다. 도구마다 연결 방식이 다르면 AI 앱을 만들 때마다 같은 종류의 통합 코드를 다시 작성해야 합니다.

두 번째 문제는 책임 경계입니다. MCP 아키텍처는 host, client, server를 분리해 보안 경계를 유지하고 책임을 나눕니다. 서버가 전체 대화를 보는 구조가 아니라, 필요한 contextual information만 받도록 설계됩니다.

## 핵심 개념

첫째, Host는 전체 AI 애플리케이션입니다. Host는 여러 client instance를 만들고 권한, lifecycle, 사용자 승인, 컨텍스트 집계를 조정합니다.

둘째, Client는 특정 server와 1:1 상태 세션을 유지합니다. 프로토콜 메시지를 양방향으로 라우팅하며, 개별 서버 연결을 담당합니다.

셋째, Server는 resources, tools, prompts를 노출합니다. 각 서버는 독립적인 책임을 가지고 외부 시스템과 연결됩니다.

넷째, Tools는 모델이 외부 시스템과 상호작용하도록 서버가 노출하는 호출 가능한 기능입니다. Tool Calling을 이해하면 MCP tools가 왜 필요한지 더 쉽게 이해할 수 있습니다.

다섯째, Resources는 파일, DB schema, 앱별 정보 같은 컨텍스트 데이터를 URI로 식별해 제공하는 primitive입니다. Tools가 행동이라면, Resources는 모델에 줄 수 있는 자료에 가깝습니다.

## 실제 예시

사내 DB를 AI에게 연결한다고 생각해봅시다. DB schema는 resource로 노출할 수 있고, 허가된 조회 함수는 tool로 노출할 수 있습니다.

이때 host는 사용자가 어떤 작업을 승인했는지 관리합니다. client는 특정 DB server와 세션을 유지합니다. server는 schema resource와 조회 tool을 제공합니다. 이렇게 나누면 AI가 무작정 DB 전체를 보는 것이 아니라 허가된 경계 안에서 필요한 정보와 행동만 사용할 수 있습니다.

디자인 연동도 같은 구조로 볼 수 있습니다. 디자인 도구의 데이터를 resource로 제공하고, 필요한 조회 기능을 tool로 제공하면 AI 코딩 도구가 디자인 정보를 읽을 수 있습니다. 이때 server는 전체 대화 이력을 볼 필요가 없고, 필요한 정보만 받아 역할을 수행합니다.

## 코드 예시

아래는 MCP server가 노출할 수 있는 tool 정의를 단순화한 예시입니다.

```ts
const toolDefinition = {
  name: "get_project_status",
  description: "Return current project status",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false,
  },
}

console.log(`${toolDefinition.name}: ${toolDefinition.description}`)
```

## AI 시대에서의 의미

바이브코딩에서 MCP는 AI 코딩 도구가 코드베이스, 디자인 도구, 브라우저, 데이터베이스 같은 외부 시스템에 일관된 방식으로 접근하게 하는 연결 계층입니다.

MCP는 Context Engineering과도 연결됩니다. Resources는 모델에 제공할 컨텍스트 데이터를 표준 방식으로 노출하고, Tools는 외부 행동을 표준 방식으로 호출하게 합니다. 그래서 MCP는 AI가 사용할 재료와 행동을 시스템 구조 안에 넣는 방법입니다.

## 자주 헷갈리는 것

MCP는 모델이 아닙니다. AI 애플리케이션과 외부 시스템을 연결하는 프로토콜입니다.

MCP와 Tool Calling도 같은 층위가 아닙니다. Tool Calling은 모델이 도구 호출을 만드는 방식이고, MCP는 서버가 도구를 표준 방식으로 노출하고 client가 호출하는 프로토콜입니다.

Tools와 Resources도 다릅니다. Tools는 외부 시스템 행동을 호출하는 기능이고, Resources는 모델에 제공할 컨텍스트 데이터를 URI로 노출하는 기능입니다.

## 실무에서 쓰는 방식

실무에서는 디자인 연동, 사내 DB 질의, 로컬 개발 자동화 같은 곳에 MCP를 씁니다. Figma 같은 도구의 데이터를 MCP server가 tools와 resources로 제공하면 AI 코딩 도구가 디자인 정보를 읽을 수 있습니다.

사내 DB에서는 DB schema를 resource로, 조회 함수를 tool로 노출할 수 있습니다. 로컬 개발 환경에서는 local process나 remote service를 MCP server로 연결해 개발 자동화를 표준 연결로 만들 수 있습니다.

설계할 때는 host가 권한과 사용자 승인을 조정한다는 점을 잊지 않아야 합니다. MCP server를 일반 백엔드처럼 모든 권한을 스스로 결정하는 존재로 보면 책임 경계가 흐려집니다. host, client, server의 역할을 나누어야 안전한 연결 구조가 됩니다.

## 공부 체크리스트

- MCP를 AI 애플리케이션과 외부 시스템을 연결하는 프로토콜로 설명할 수 있다.
- host, client, server의 책임을 구분할 수 있다.
- tools와 resources의 차이를 예로 들 수 있다.
- MCP와 Tool Calling의 층위 차이를 한 문장으로 설명할 수 있다.

## 참고 출처

- [What is the Model Context Protocol (MCP)?](https://modelcontextprotocol.io/docs/getting-started/intro)
- [MCP Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture)
- [MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [MCP Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources)
- [Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server)
- [Function calling](https://developers.openai.com/api/docs/guides/function-calling)
