# 용어 초안: agent-loop-anatomy

기존 `src/content/glossary.ts` 대조 완료 (2026-07-05): `Agent Loop` 미등재. `Agent`, `Tool Calling`, `Workflow`는 기등재.

## Agent Loop (에이전트 루프)
category: AI 시스템
shortDefinition: 모델이 상태를 평가하고 도구를 호출하며 결과를 받아 다시 판단하는 반복 실행 구조
explanation: Agent Loop는 모델이 프롬프트를 평가하고, 필요한 도구를 호출하고, 도구 결과를 다시 받아 작업이 끝날 때까지 반복하는 구조입니다. 한 turn은 모델 출력과 도구 실행 결과가 오가는 왕복이며, 루프에는 max_turns, budget, allowed_tools 같은 제한 장치가 필요합니다.
related: [Agent, Tool Calling, Workflow, Context Engineering]
status: new

