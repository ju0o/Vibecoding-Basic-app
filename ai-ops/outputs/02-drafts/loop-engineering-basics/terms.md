# 용어 초안: loop-engineering-basics

## Loop Engineering
- category: AI 시스템
- shortDefinition: Agent가 판단과 도구 호출을 반복하는 루프의 종료 조건, 권한, 비용, 검증 기준을 설계하는 일
- explanation: Loop Engineering은 agent loop를 무작정 오래 돌리는 것이 아니라 max turns, budget, allowed tools, hooks, success signals, blocked signals를 함께 설계해 반복을 통제하는 관점입니다.
- related: ["Agent Loop", "Tool Calling", "Harness Engineering", "Context Engineering"]

## Stop Condition
- category: AI 시스템
- shortDefinition: Agent loop가 성공, 실패, 막힘, 사람 승인 등의 이유로 멈추는 기준
- explanation: Stop Condition은 테스트 통과, 공식 출처 확인, 최대 반복 도달, 같은 실패 반복처럼 루프 종료를 판단하는 신호입니다. 명확한 종료 기준이 없으면 agent는 오래 반복하면서도 실제 완료 상태를 보장하지 못할 수 있습니다.
- related: ["Loop Engineering", "Agent Loop", "Harness Engineering"]

## Hook
- category: AI 시스템
- shortDefinition: Agent 실행 중 특정 이벤트에서 차단, 기록, 승인, 변환 같은 결정을 넣는 제어점
- explanation: Hook은 PreToolUse, PostToolUse, Stop 같은 실행 단계에서 위험 행동을 막거나 결과를 기록하는 장치입니다. 반복 루프에서는 작은 위험 행동이 누적될 수 있으므로 hook이 중요한 통제점이 됩니다.
- related: ["Loop Engineering", "Harness Engineering", "Tool Calling"]

## Compaction
- category: AI 시스템
- shortDefinition: 긴 작업에서 커진 context를 요약하거나 압축해 다음 판단에 필요한 정보만 남기는 방식
- explanation: Compaction은 context limit에 가까워질 때 긴 history와 tool output을 줄여 루프를 계속 가능하게 하는 context management 기법입니다. 중요한 목표, 시도 내역, 실패 원인, 남은 불확실성이 보존되어야 합니다.
- related: ["Context Engineering", "Loop Engineering", "Context Window"]

