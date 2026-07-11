# 용어 초안: requirement-to-task-breakdown

기존 glossary.ts 대조 완료: `Task Framing`, `Repository Task Delegation`, `Verification`, `Review Workflow`는 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Parent Issue

- category: AI 코딩 도구
- shortDefinition: 큰 목표와 전체 맥락을 담고 하위 task를 연결하는 상위 issue
- explanation: Parent Issue는 여러 sub-issue가 왜 존재하는지 설명하는 기준점입니다. AI 작업에서는 제품 의도, 전체 범위, 연결된 하위 작업을 보관해 agent가 작은 task를 더 큰 목표와 혼동하지 않게 도와줍니다.
- related: ["Sub-issue", "Task Framing", "Review Workflow"]

## Sub-issue

- category: AI 코딩 도구
- shortDefinition: 큰 작업을 사람이 review하고 AI가 실행할 수 있는 작은 task로 나눈 하위 issue
- explanation: Sub-issue는 parent issue의 목표를 구현 가능한 단위로 쪼갠 것입니다. 좋은 sub-issue는 scope, acceptance criteria, verification이 분명해 독립적으로 검토하고 되돌릴 수 있습니다.
- related: ["Parent Issue", "Acceptance Criteria", "Repository Task Delegation"]

## Acceptance Criteria

- category: AI 코딩 도구
- shortDefinition: task가 완료되었다고 판단하기 위해 충족해야 하는 확인 가능한 조건
- explanation: Acceptance Criteria는 구현 결과가 요구사항을 만족하는지 판단하는 기준입니다. AI에게 task를 맡길 때는 원하는 동작, 유지해야 할 범위, 오류 조건, 검증 방법을 criteria와 연결해야 합니다.
- related: ["Sub-issue", "Verification", "Task Framing"]

## Reviewable Plan

- category: AI 코딩 도구
- shortDefinition: 코드 작성 전에 변경 파일, 단계, 검증 방법을 사람이 검토할 수 있게 정리한 구현 계획
- explanation: Reviewable Plan은 바로 구현하기 전에 scope mismatch와 위험한 변경을 발견하게 해주는 산출물입니다. Plan 자체도 AI output일 수 있으므로 사람이 task와 비교해 승인하거나 수정해야 합니다.
- related: ["Task Framing", "Repository Task Delegation", "Review Workflow"]
