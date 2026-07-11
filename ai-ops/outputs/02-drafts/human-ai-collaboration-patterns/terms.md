# 용어 초안: human-ai-collaboration-patterns

기존 glossary.ts 대조 완료: `Verification`, `Code Review Boundary`, `Chat Coding`, `Agent Mode`, `Review Workflow`는 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Task Framing

- category: AI 코딩 도구
- shortDefinition: AI에게 맡길 작업의 목표, 범위, 성공 기준, 금지 행동을 사람이 먼저 정리하는 단계
- explanation: Task Framing은 AI 협업의 출발점입니다. 목표가 흐리면 AI는 범위와 성공 기준을 추측하므로, 사람이 먼저 무엇을 바꾸고 무엇을 바꾸지 않을지, 어떤 검증을 통과해야 하는지 정해야 합니다.
- related: ["Chat Coding", "Agent Mode", "Verification"]

## Human Review Loop

- category: AI 코딩 도구
- shortDefinition: AI output을 사람이 diff, test, source check로 검토하고 그 feedback을 다음 prompt나 task로 되돌리는 반복 구조
- explanation: Human Review Loop는 AI output을 한 번에 채택하지 않고 검토 결과를 다시 작업 입력으로 보내는 협업 방식입니다. 실패한 test, review comment, 바뀐 요구사항을 다음 AI instruction으로 돌려 품질을 높입니다.
- related: ["Review Workflow", "Code Review Boundary", "Verification"]

## Responsibility Boundary

- category: AI 코딩 도구
- shortDefinition: AI가 만든 결과라도 repository에 들어가는 순간 사람과 팀이 책임진다는 검토 경계
- explanation: Responsibility Boundary는 AI가 작성했다는 이유로 책임이 분리되지 않는다는 원칙입니다. 코드가 commit, PR, release로 들어가기 전 사람이 output을 review하고 검증해야 합니다.
- related: ["Code Review Boundary", "Verification", "Review Workflow"]

## Rollback Readiness

- category: AI 코딩 도구
- shortDefinition: AI와 함께 만든 변경이 실패했을 때 되돌릴 수 있도록 diff, commit, test 결과를 작게 유지하는 준비 상태
- explanation: Rollback Readiness는 AI 협업에서 변경을 작게 만들고 검증 결과를 남겨 복구 가능성을 확보하는 습관입니다. 큰 작업을 작은 task로 나누면 문제가 생겼을 때 원인을 찾고 되돌리기 쉽습니다.
- related: ["Git", "Review Workflow", "Verification"]
