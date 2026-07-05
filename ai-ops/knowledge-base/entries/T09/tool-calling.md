---
id: tool-calling
title: "Tool Calling (도구 호출)"
topicGroup: T09
status: approved
score: 88
level: 기초
prerequisites: []
successors: [mcp, agent-loop]
related: [mcp, agent-loop, context-engineering]
consumers:
  lessons: [tool-calling-basics, mcp-architecture-basics, agent-loop-anatomy]
  glossary: [Tool Calling]
sources:
  - { title: "Function calling", url: "https://developers.openai.com/api/docs/guides/function-calling", checked: 2026-07-05 }
  - { title: "Using tools", url: "https://developers.openai.com/api/docs/guides/tools", checked: 2026-07-05 }
  - { title: "Function calling and other API updates", url: "https://openai.com/index/function-calling-and-other-api-updates/", checked: 2026-07-05 }
  - { title: "Tool use with Claude", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview", checked: 2026-07-05 }
  - { title: "Define tools", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Tool Calling은 모델이 외부 함수나 도구를 구조화된 요청으로 선택하게 하는 연결 방식이다. OpenAI는 function calling을 모델이 외부 시스템과 인터페이스하고 학습 데이터 밖의 데이터나 애플리케이션 동작에 접근하게 하는 방법으로 설명한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-05)

## 역사
OpenAI는 2023년 6월 13일 Chat Completions API에 function calling 기능을 발표했고, 개발자가 함수를 설명하면 모델이 해당 함수 호출 인자를 JSON 객체로 출력할 수 있다고 설명했다. (출처: https://openai.com/index/function-calling-and-other-api-updates/, 확인: 2026-07-05)
Anthropic의 Claude 문서는 tool use를 Claude가 사용자 요청과 도구 설명을 바탕으로 도구 호출 여부를 결정하고, structured call을 반환하는 방식으로 설명한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-05)

## 해결하려는 문제
LLM은 기본적으로 텍스트를 생성하지만, 최신 날씨 조회, 데이터베이스 질의, 이메일 전송 같은 외부 행동은 애플리케이션 코드나 서버 도구가 수행해야 한다. OpenAI는 function calling을 모델 능력과 외부 도구·API를 더 안정적으로 연결하는 방법으로 설명한다. (출처: https://openai.com/index/function-calling-and-other-api-updates/, 확인: 2026-07-05)
도구 호출은 모델이 직접 실행하는 것이 아니라, 모델이 호출할 함수명과 인자를 구조화해 반환하고 애플리케이션이 실행하도록 경계를 나눈다. Anthropic은 client tools의 경우 Claude가 `tool_use` 블록을 반환하고 애플리케이션 코드가 실행 후 `tool_result`를 돌려준다고 설명한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-05)

## 핵심 개념
1. OpenAI의 function tool은 JSON Schema로 정의되는 특정 종류의 tool이다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-05)
2. OpenAI function definition은 type, name, description, parameters, strict 필드를 포함한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-05)
3. Anthropic client tool 정의에는 name, description, input_schema, 선택적 input_examples가 포함된다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools, 확인: 2026-07-05)
4. Claude는 기본 `tool_choice`가 auto일 때 요청과 도구 설명을 바탕으로 도구 호출 여부를 결정한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-05)
5. client tool은 애플리케이션이 실행하고 server tool은 제공자 인프라가 실행한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-05)
6. OpenAI는 built-in tools, function calling, tool search, remote MCP servers를 모델 능력 확장 방식으로 설명한다. (출처: https://developers.openai.com/api/docs/guides/tools, 확인: 2026-07-05)

## 관련 기술
- Tool Calling vs API 호출: API 호출은 애플리케이션 코드가 직접 수행하는 네트워크 요청이고, tool calling은 모델이 어떤 API 호출이 필요한지 구조화해 제안하는 인터페이스다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-05)
- Tool Calling vs MCP: tool calling은 도구 호출 메커니즘이고, MCP는 도구·리소스·프롬프트를 클라이언트와 서버 사이에서 표준화하는 프로토콜이다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, 확인: 2026-07-05)
- Tool Calling vs Agent Loop: tool calling은 한 번의 행동 단위이고, agent loop는 그런 행동과 결과 반영을 여러 턴 반복하는 구조다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)
- Structured Outputs vs Tool Calling: structured output은 응답 형식을 통제하는 데 쓰이고, tool calling은 외부 시스템과 상호작용하는 데 쓰인다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-05)

## 선행 개념
frontmatter prerequisites가 비어 있다. 이 개념은 모델과 외부 시스템 연결의 기본 단위로 사용된다. (출처: ai-ops/MASTER_PROGRESS.md, 확인: 2026-07-05)

## 후행 개념
- mcp: MCP server tools는 도구를 표준 프로토콜로 노출하므로 tool calling 이해가 선행된다. (출처: https://modelcontextprotocol.io/specification/2025-11-25/server/tools, 확인: 2026-07-05)
- agent-loop: agent loop는 도구 호출 결과를 다시 모델 판단에 넣는 반복 구조이므로 tool calling 이해가 필요하다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 tool calling은 AI가 "답변"을 넘어 실제 개발 환경, 파일, DB, API와 상호작용하는 접점이다. OpenAI는 tools가 모델이 웹 검색, 파일 검색, 함수 호출, MCP 서버 접근 같은 기능을 쓰게 해 모델 능력을 확장한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/tools, 확인: 2026-07-05)
도구 호출은 안전 경계도 만든다. OpenAI는 실제 영향을 주는 작업에는 사용자 확인 단계를 포함하라고 설명하고, Anthropic은 client tool의 실행 책임이 애플리케이션에 있음을 구분한다. (출처: https://openai.com/index/function-calling-and-other-api-updates/, 확인: 2026-07-05; https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-05)

## 실무 활용
1. 내부 API 조회: 사용자가 "이번 달 매출 상위 고객"을 물으면 모델이 `get_customers_by_revenue` 같은 함수 인자를 구성하게 한다. (근거: https://openai.com/index/function-calling-and-other-api-updates/, 확인: 2026-07-05)
2. 검색 보강: 모델이 답하기 전에 web search, file search, remote MCP server 같은 도구를 호출하게 한다. (근거: https://developers.openai.com/api/docs/guides/tools, 확인: 2026-07-05)
3. 안전한 작업 실행: 이메일 전송, 구매, 게시처럼 실제 영향이 있는 작업은 함수 호출 전 사용자 확인을 둔다. (근거: https://openai.com/index/function-calling-and-other-api-updates/, 확인: 2026-07-05)

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
```

## FAQ
Q: Tool Calling은 모델이 직접 함수를 실행한다는 뜻인가?
A: 아니다. client tool에서는 모델이 구조화된 호출을 반환하고 애플리케이션이 실행한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-05)

Q: JSON Schema가 왜 중요한가?
A: OpenAI function tool과 Anthropic client tool은 입력 인자를 JSON Schema로 정의해 모델이 어떤 구조의 인자를 만들어야 하는지 알게 한다. (출처: https://developers.openai.com/api/docs/guides/function-calling, 확인: 2026-07-05; https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools, 확인: 2026-07-05)

Q: 항상 도구를 호출하게 해야 하는가?
A: 아니다. Claude 문서는 기본 auto 모드에서 요청과 도구 설명을 바탕으로 호출 여부를 결정하며, 필요한 경우 `tool_choice`로 요구할 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: 모델이 도구를 실행한다고 설명한다. 왜 생기나: 호출 선택과 실행 책임을 구분하지 않는다. 교정: client tool은 앱이 실행하고 모델은 호출 요청을 만든다고 설명한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview, 확인: 2026-07-05)
2. 실수: description을 짧고 모호하게 쓴다. 왜 생기나: 도구 이름만으로 충분하다고 생각한다. 교정: Anthropic 문서처럼 무엇을 하는지, 언제 써야 하는지, 어떻게 동작하는지 자세히 적는다. (출처: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools, 확인: 2026-07-05)
3. 실수: 실제 영향이 있는 작업을 자동 실행한다. 왜 생기나: 데모 흐름을 운영 흐름으로 그대로 옮긴다. 교정: 사용자 확인과 신뢰 가능한 도구 사용 원칙을 둔다. (출처: https://openai.com/index/function-calling-and-other-api-updates/, 확인: 2026-07-05)

## 공식 출처
- Function calling은 OpenAI 모델을 외부 시스템과 연결하는 방법이다 — [Function calling](https://developers.openai.com/api/docs/guides/function-calling) (확인: 2026-07-05)
- Tools는 built-in tools, function calling, tool search, remote MCP servers 등을 포함한다 — [Using tools](https://developers.openai.com/api/docs/guides/tools) (확인: 2026-07-05)
- OpenAI는 2023년 6월 13일 function calling capability를 발표했다 — [Function calling and other API updates](https://openai.com/index/function-calling-and-other-api-updates/) (확인: 2026-07-05)
- Claude tool use는 structured call과 tool_result 왕복으로 설명된다 — [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (확인: 2026-07-05)
- Claude client tool 정의에는 name, description, input_schema가 포함된다 — [Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools) (확인: 2026-07-05)

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
