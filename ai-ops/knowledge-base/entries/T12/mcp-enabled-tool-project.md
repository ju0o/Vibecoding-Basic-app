---
id: mcp-enabled-tool-project
title: "MCP 도구 연결 프로젝트 (MCP-enabled Tool Project)"
topicGroup: T12
status: approved
score: 89
level: 중급
prerequisites: [mcp, tool-calling, tool-permissions-sandboxes]
successors: [private-ai-learning-site-project]
related: [automation-workflow-project, harness, production-env-secrets]
consumers:
  lessons: [mcp-enabled-tool-project]
  glossary: []
sources:
  - { title: "MCP Specification 2025-11-25", url: "https://modelcontextprotocol.io/specification/2025-11-25", checked: 2026-07-12 }
  - { title: "MCP Docs — What is MCP?", url: "https://modelcontextprotocol.io/docs/getting-started/intro", checked: 2026-07-12 }
  - { title: "MCP Specification Draft — Tools", url: "https://modelcontextprotocol.io/specification/draft/server/tools", checked: 2026-07-12 }
  - { title: "MCP Authorization 2025-06-18", url: "https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization", checked: 2026-07-12 }
  - { title: "MCP Security Best Practices", url: "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
MCP 도구 연결 프로젝트는 학습 사이트나 개발 도구가 외부 기능을 MCP 서버의 tool로 노출하고, AI 클라이언트가 이를 안전하게 발견·호출하도록 만드는 프로젝트다. MCP는 LLM application과 external data sources/tools 사이의 integration을 표준화하고, host·client·server 구조와 JSON-RPC 메시지 기반 통신을 둔다. 이 프로젝트의 핵심은 "AI에게 명령 권한을 준다"가 아니라, tool schema, authorization, consent, audit boundary를 명시하는 것이다. (출처: https://modelcontextprotocol.io/specification/2025-11-25, 확인: 2026-07-12)

## 역사
MCP는 AI application마다 외부 데이터와 도구 연결 방식을 새로 구현해야 하는 문제를 줄이기 위해 등장했다. 공식 소개 문서는 MCP를 AI application과 external systems를 연결하는 open-source standard로 설명하고, specification은 LLM application과 context/tools 연결을 위한 authoritative protocol requirements를 정의한다. AI 코딩 환경이 IDE, chat, workflow, agent로 확장되면서 "도구 연결을 어떻게 표준화하고 안전하게 제한할 것인가"가 프로젝트 주제가 되었다. (출처: https://modelcontextprotocol.io/docs/getting-started/intro, https://modelcontextprotocol.io/specification/2025-11-25, 확인: 2026-07-12)

## 해결하려는 문제
도구 호출을 앱마다 직접 붙이면 schema, permission, logging, auth, user consent가 제각각이 된다. MCP는 application이 contextual information을 share하고, tools/capabilities를 expose하며, composable integrations/workflows를 만들 수 있는 표준 접점을 제공한다. 하지만 MCP 자체가 보안 원칙을 완전히 강제하지는 않으므로 프로젝트는 host UI, server auth, tool allowlist, sandbox, error handling을 함께 설계해야 한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25, 확인: 2026-07-12)

## 핵심 개념
1. **Host / Client / Server**: Host는 connection을 시작하는 LLM application, Client는 host 내부 connector, Server는 context와 capability를 제공하는 service다. 프로젝트 구조를 이 세 역할로 나누면 책임 경계가 선명해진다. (출처: https://modelcontextprotocol.io/specification/2025-11-25, 확인: 2026-07-12)
2. **JSON-RPC message**: MCP specification은 communication에 JSON-RPC 2.0 messages를 사용한다고 설명한다. 따라서 프로젝트는 HTTP endpoint만 만드는 것이 아니라 method, params, result/error를 안정적으로 다뤄야 한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25, 확인: 2026-07-12)
3. **Tool schema**: Tools 문서는 server가 model이 호출할 수 있는 tools를 expose하며, 각 tool은 name과 schema metadata를 가진다고 설명한다. tool description은 모델 입력이 되므로 짧고 검증 가능해야 한다. (출처: https://modelcontextprotocol.io/specification/draft/server/tools, 확인: 2026-07-12)
4. **Model-controlled invocation**: Tools는 model-controlled로 설계될 수 있지만, implementation은 UI pattern을 자유롭게 정할 수 있다. 안전한 프로젝트는 destructive action에 human confirmation을 둔다. (출처: https://modelcontextprotocol.io/specification/draft/server/tools, 확인: 2026-07-12)
5. **Authorization per request**: MCP authorization 문서는 client-to-server HTTP request마다 Authorization header가 필요하다고 설명한다. tool 목록도 authorization scope에 따라 달라질 수 있으므로, server는 request별 token validation을 해야 한다. (출처: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization, 확인: 2026-07-12)
6. **Token passthrough 금지**: Security best practices는 MCP server가 자신에게 발급되지 않은 token을 받아 downstream API로 넘기는 anti-pattern을 금지한다. proxy형 tool project는 upstream token과 MCP resource server token을 분리해야 한다. (출처: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices, 확인: 2026-07-12)

## 관련 기술
- tool-calling: MCP tool은 모델이 호출할 수 있는 기능이지만, 실제 실행은 application/server 쪽 코드가 담당한다.
- harness: MCP server를 실행할 때 filesystem/network permission, sandbox, test harness가 필요하다.
- production-env-secrets: server token, API key, bypass secret은 source code가 아니라 환경 변수와 secret store에서 관리해야 한다.

## 선행 개념
- mcp: protocol의 host/client/server, resources, prompts, tools 구조를 먼저 알아야 한다.
- tool-calling: 모델의 tool call request와 application-side execution 경계를 이해해야 한다.
- tool-permissions-sandboxes: 도구 실행 권한과 sandbox 없이는 MCP 프로젝트가 위험해진다.

## 후행 개념
- private-ai-learning-site-project: 비공개 학습 사이트가 lesson search, glossary lookup, progress report 같은 tool을 MCP로 제공하는 최종 프로젝트로 이어진다.

## AI 시대에서의 의미
AI 코딩 시대의 생산성은 "모델이 답을 잘한다"에서 "모델이 안전한 도구를 정확히 사용할 수 있다"로 이동한다. MCP 도구 연결 프로젝트는 학습자가 schema, auth, consent, sandbox를 한 번에 체감하게 한다. 특히 바이브코딩에서는 AI에게 repo나 배포 환경을 연결하기 전에 어떤 tool이 노출되는지, 어떤 scope로 제한되는지, 호출 기록을 어떻게 검증할지 명시해야 한다. (출처: https://modelcontextprotocol.io/specification/2025-11-25, https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices, 확인: 2026-07-12)

## 실무 활용
1. **Lesson search tool**: `search_lessons({ query })`를 MCP tool로 노출해 AI가 사이트 강의를 검색하게 한다.
2. **Glossary lookup tool**: `lookup_term({ term })`을 schema로 정의하고, 읽기 전용 데이터만 반환한다.
3. **Progress report tool**: 사용자별 진도는 authorization token으로 scope를 확인한 뒤 최소 DTO만 반환한다.
4. **Admin action tool**: write action은 confirmation UI, audit log, allowlist, rollback plan을 요구한다.

```ts
const tool = {
  name: "search_lessons",
  description: "Search approved lesson summaries by keyword.",
  inputSchema: {
    type: "object",
    properties: { query: { type: "string" } },
    required: ["query"],
  },
};
```

## FAQ
Q: MCP tool은 API endpoint와 같은가?
A: 비슷하지만 같지 않다. API endpoint는 앱끼리의 HTTP contract이고, MCP tool은 AI client가 discover/invoke할 수 있도록 schema와 protocol message를 갖춘 capability다. (출처: https://modelcontextprotocol.io/specification/draft/server/tools, 확인: 2026-07-12)

Q: MCP를 쓰면 모든 도구를 자동으로 실행해도 되는가?
A: 아니다. tools 문서는 trust & safety를 위해 human in the loop와 confirmation prompt를 권장한다. 특히 파일 수정, 결제, 배포 같은 action은 승인 흐름이 필요하다. (출처: https://modelcontextprotocol.io/specification/draft/server/tools, 확인: 2026-07-12)

Q: token을 그대로 upstream API에 넘기면 간단하지 않은가?
A: 위험하다. MCP security best practices는 token passthrough를 anti-pattern으로 설명하며, MCP server용 token과 upstream API token을 분리해야 한다. (출처: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices, 확인: 2026-07-12)

## 자주 하는 실수
1. **tool description을 프롬프트처럼 길게 씀**: 모델이 오해한다. 교정: name, description, input schema를 짧고 검증 가능하게 만든다.
2. **authorization을 connection state로 착각**: request마다 credential이 달라질 수 있다. 교정: 모든 HTTP request에서 token validation과 scope check를 수행한다. (출처: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization, 확인: 2026-07-12)
3. **로컬 MCP 서버를 무제한 권한으로 실행**: local server compromise 위험이 커진다. 교정: stdio transport, sandbox, restricted filesystem/network, command pattern warning을 둔다. (출처: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices, 확인: 2026-07-12)

## 공식 출처
- MCP의 정의와 host/client/server 구조 — [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25) (확인 날짜: 2026-07-12)
- MCP의 실무 목적과 ecosystem 설명 — [MCP Docs — What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro) (확인 날짜: 2026-07-12)
- tool schema와 model-controlled invocation — [MCP Specification Draft — Tools](https://modelcontextprotocol.io/specification/draft/server/tools) (확인 날짜: 2026-07-12)
- OAuth, token, 401/403 처리 — [MCP Authorization 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) (확인 날짜: 2026-07-12)
- confused deputy, token passthrough, local server compromise — [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) (확인 날짜: 2026-07-12)

## Quote Bank
- > "MCP provides a standardized way for applications to:"
  - 출처: [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25) (확인: 2026-07-12)
  - 맥락: MCP가 앱과 모델 사이의 표준 접점이라는 점을 설명할 때 사용한다.
- > "Hosts: LLM applications that initiate connections"
  - 출처: [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25) (확인: 2026-07-12)
  - 맥락: host/client/server 역할 분리를 설명할 때 사용한다.
- > "Think of MCP like a USB-C port for AI applications."
  - 출처: [MCP Docs — What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro) (확인: 2026-07-12)
  - 맥락: 초보자용 비유로 사용한다.
- > "Tools in MCP are designed to be model-controlled"
  - 출처: [MCP Specification Draft — Tools](https://modelcontextprotocol.io/specification/draft/server/tools) (확인: 2026-07-12)
  - 맥락: 모델이 tool을 discover/invoke할 수 있다는 점을 설명할 때 사용한다.
- > "Access tokens MUST NOT be included in the URI query string"
  - 출처: [MCP Authorization 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) (확인: 2026-07-12)
  - 맥락: token handling과 log leakage 위험을 설명할 때 사용한다.
- > "MCP servers MUST NOT accept any tokens that were not explicitly issued for the MCP server."
  - 출처: [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) (확인: 2026-07-12)
  - 맥락: token passthrough 금지와 audience binding을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
