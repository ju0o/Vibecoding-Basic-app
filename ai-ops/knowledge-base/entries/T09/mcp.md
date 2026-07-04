---
id: mcp
title: "MCP (Model Context Protocol)"
topicGroup: T09
status: approved
score: 92
level: 중급
prerequisites: [tool-calling]
successors: [agent-loop]
related: [tool-calling, context-engineering, rag, agent-loop]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "What is the Model Context Protocol (MCP)?", url: "https://modelcontextprotocol.io/docs/getting-started/intro", checked: 2026-07-05 }
  - { title: "MCP Architecture", url: "https://modelcontextprotocol.io/specification/2025-11-25/architecture", checked: 2026-07-05 }
  - { title: "MCP Tools", url: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools", checked: 2026-07-05 }
  - { title: "MCP Resources", url: "https://modelcontextprotocol.io/specification/2025-11-25/server/resources", checked: 2026-07-05 }
  - { title: "Build an MCP server", url: "https://modelcontextprotocol.io/docs/develop/build-server", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
MCP는 AI 애플리케이션을 외부 시스템에 연결하기 위한 오픈소스 표준이다. Model Context Protocol 문서는 MCP를 데이터 소스, 도구, 워크플로를 AI 애플리케이션과 연결하는 표준으로 설명한다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)

## 역사
MCP 공식 문서는 최신 사양 버전을 2025-11-25로 표시한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)
MCP는 AI 애플리케이션이 파일, 데이터베이스, 검색 엔진, 계산기, 전문 프롬프트 같은 외부 시스템에 접근하도록 표준 연결 방식을 제공하기 위해 만들어진다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)

## 해결하려는 문제
AI 애플리케이션마다 외부 데이터와 도구를 별도 방식으로 붙이면 연결 코드, 권한 경계, 도구 설명, 결과 형식이 반복된다. MCP 문서는 한 번 서버를 만들면 여러 클라이언트와 서버 생태계에서 통합하기 쉬워진다고 설명한다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)
MCP 아키텍처는 host, client, server를 분리해 보안 경계를 유지하고 책임을 나눈다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)

## 핵심 개념
1. Host는 여러 client instance를 만들고 권한, lifecycle, 사용자 승인, 컨텍스트 집계를 조정한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)
2. Client는 특정 server와 1:1 상태 세션을 유지하고 프로토콜 메시지를 양방향으로 라우팅한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)
3. Server는 resources, tools, prompts를 노출하고 독립적인 책임을 가진다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)
4. Tools는 모델이 외부 시스템과 상호작용하도록 서버가 노출하는 호출 가능한 기능이다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-05)
5. Resources는 파일, DB schema, 앱별 정보 같은 컨텍스트 데이터를 URI로 식별해 제공하는 primitive다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/resources, 확인: 2026-07-05)
6. 서버는 resources, tools, prompts라는 세 가지 주요 capability를 제공할 수 있다. (출처: https://modelcontextprotocol.io/docs/develop/build-server, 확인: 2026-07-05)

## 관련 기술
- MCP vs Tool Calling: tool calling은 모델이 도구 호출을 만드는 방식이고, MCP는 서버가 도구를 표준 방식으로 노출하고 client가 호출하는 프로토콜이다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-05)
- MCP Resources vs RAG: resources는 컨텍스트 데이터를 표준적으로 노출하고, RAG는 검색된 문서를 모델 프롬프트에 넣어 답변을 보강한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/resources, 확인: 2026-07-05; https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
- MCP Host vs Client: host는 사용자 경험과 전체 조정을 맡고, client는 개별 server 연결을 담당한다. (출처: https://modelcontextprotocol.io/docs/learn/client-concepts, 확인: 2026-07-05)
- MCP vs Plugin: MCP는 연결 프로토콜이고, plugin은 특정 제품이나 플랫폼에서 배포되는 확장 단위일 수 있다. MCP 공식 intro는 다양한 AI assistants와 개발 도구가 MCP를 지원한다고 설명한다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)

## 선행 개념
- tool-calling: MCP의 tools primitive는 모델이 호출할 수 있는 기능을 노출하므로 도구 호출 개념이 선행되어야 한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-05)

## 후행 개념
- agent-loop: MCP tools와 resources는 에이전트 루프 안에서 외부 시스템 행동과 컨텍스트 제공에 사용될 수 있다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 MCP는 AI 코딩 도구가 코드베이스, 디자인 도구, 브라우저, 데이터베이스 같은 외부 시스템에 일관된 방식으로 접근하게 하는 연결 계층이다. MCP 공식 intro는 Claude, ChatGPT, Visual Studio Code, Cursor 등 다양한 클라이언트와 서버 생태계가 MCP를 지원한다고 설명한다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)
MCP는 서버가 전체 대화를 보지 않고 필요한 정보만 받도록 설계되어 보안 경계와 관심사 분리를 돕는다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)

## 실무 활용
1. 디자인 연동: Figma 같은 도구의 데이터를 MCP server가 tools와 resources로 제공하면 AI 코딩 도구가 디자인 정보를 읽을 수 있다. (근거: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)
2. 사내 DB 질의: DB schema를 resource로, 조회 함수를 tool로 노출해 AI가 허가된 경계 안에서 분석을 수행하게 한다. (근거: https://modelcontextprotocol.io/specification/2025-11-25/server/resources, 확인: 2026-07-05; https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-05)
3. 로컬 개발 자동화: MCP server는 local process나 remote service일 수 있으므로 개발 환경 도구를 표준 연결로 노출할 수 있다. (근거: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)

```ts
const toolDefinition = {
  name: "get_project_status",
  description: "Return current project status",
  inputSchema: { type: "object", additionalProperties: false },
}
```

## FAQ
Q: MCP는 모델인가?
A: 아니다. MCP는 AI 애플리케이션과 외부 시스템을 연결하는 프로토콜이다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)

Q: MCP server는 전체 대화를 볼 수 있는가?
A: MCP 아키텍처 문서는 서버가 전체 대화 이력을 보지 않아야 하며 필요한 contextual information만 받는다고 설명한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)

Q: MCP에서 tools와 resources는 무엇이 다른가?
A: tools는 외부 시스템 행동을 호출하는 기능이고, resources는 모델에 제공할 컨텍스트 데이터를 URI로 노출하는 기능이다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-05; https://modelcontextprotocol.io/specification/2025-11-25/server/resources, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: MCP와 tool calling을 같은 층위로 설명한다. 왜 생기나: 둘 다 도구와 관련 있기 때문이다. 교정: tool calling은 호출 메커니즘, MCP는 클라이언트-서버 프로토콜로 구분한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-05)
2. 실수: MCP server가 모든 권한을 스스로 결정한다고 생각한다. 왜 생기나: server를 일반 백엔드처럼 본다. 교정: host가 권한, lifecycle, 사용자 승인을 조정한다고 설명한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/architecture, 확인: 2026-07-05)
3. 실수: resources를 모델이 자동으로 항상 읽는 문서로 이해한다. 왜 생기나: resource를 첨부 파일과 혼동한다. 교정: resource는 host application이 필요에 따라 포함 방식을 결정하는 컨텍스트 primitive로 설명한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/resources, 확인: 2026-07-05)

## 공식 출처
- MCP는 AI 애플리케이션을 외부 시스템에 연결하는 오픈소스 표준이다 — [What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro) (확인: 2026-07-05)
- MCP는 host-client-server 아키텍처를 따른다 — [MCP Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture) (확인: 2026-07-05)
- MCP tools는 서버가 모델 호출 가능 기능을 노출하는 primitive다 — [MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) (확인: 2026-07-05)
- MCP resources는 서버가 모델용 컨텍스트 데이터를 노출하는 primitive다 — [MCP Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources) (확인: 2026-07-05)
- MCP 서버는 resources, tools, prompts를 주요 capability로 제공할 수 있다 — [Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server) (확인: 2026-07-05)

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
