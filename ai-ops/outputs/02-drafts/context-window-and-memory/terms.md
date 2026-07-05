# 용어 초안: context-window-and-memory

기존 `src/content/glossary.ts` 대조 완료 (2026-07-05): `Context Window` 미등재.

## Context Window (컨텍스트 윈도)
category: AI 시스템
shortDefinition: 모델이 응답을 만들 때 참조할 수 있는 유한한 작업 메모리
explanation: Context Window는 모델이 현재 응답을 만들 때 함께 볼 수 있는 토큰 범위입니다. 시스템 프롬프트, 메시지, 문서, 도구 정의, 도구 결과가 모두 이 범위를 차지할 수 있으므로 긴 작업에서는 필요한 정보를 선별하고 오래된 내용은 요약해야 합니다.
related: [Context Engineering, Agent, Tool Calling]
status: new

