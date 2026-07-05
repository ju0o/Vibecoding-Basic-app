# 용어 초안: tool-calling-basics

기존 `src/content/glossary.ts` 대조 완료 (2026-07-05): `Tool Calling` 미등재.

## Tool Calling (도구 호출)
category: AI 시스템
shortDefinition: 모델이 외부 함수나 도구를 구조화된 요청으로 선택하게 하는 연결 방식
explanation: Tool Calling은 모델이 직접 함수를 실행하는 것이 아니라, 호출할 도구 이름과 입력값을 구조화해 반환하게 하는 방식입니다. 실제 실행은 애플리케이션 코드나 제공자 인프라가 맡습니다. JSON Schema 같은 입력 구조와 명확한 도구 설명이 있어야 모델이 언제 어떤 도구를 써야 하는지 판단할 수 있습니다.
related: [MCP, Agent, API, Context Engineering]
status: new
