# 용어 초안: prompt-to-implementation-loop

기존 glossary.ts 대조 완료: `Prompt Contract`, `Repository Task Delegation`, `Verification`, `Evaluation Set`, `Human Review Loop`는 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Implementation Loop

- category: AI 코딩 도구
- shortDefinition: prompt, 구현 후보, 검증 결과, feedback이 반복되는 AI 코딩 작업 순환
- explanation: Implementation Loop는 AI에게 한 번 요청하고 끝내는 방식이 아니라, build/test/review observation을 다음 prompt로 되돌려 구현을 좁혀 가는 절차입니다. 루프에는 성공 조건과 중단 조건이 함께 있어야 합니다.
- related: ["Prompt Contract", "Verification", "Human Review Loop"]

## Follow-up Prompt

- category: AI 코딩 도구
- shortDefinition: AI 응답 평가나 검증 실패 결과를 반영해 다음 시도에 제공하는 추가 요청
- explanation: Follow-up Prompt는 "다시 해줘"가 아니라 실패한 test, review comment, 유지해야 할 scope, 바꾸지 말아야 할 조건을 포함하는 증거 기반 수정 요청입니다.
- related: ["Implementation Loop", "Verification Feedback", "Prompt Contract"]

## Repository Instruction

- category: AI 코딩 도구
- shortDefinition: AI가 프로젝트를 이해하고 build/test/validate 방법을 따르도록 repository에 저장한 반복 지침
- explanation: Repository Instruction은 매 prompt마다 반복하기 어려운 프로젝트 규칙과 검증 방법을 고정하는 context layer입니다. 현재 task의 목표와 acceptance criteria는 별도 prompt로 제공해야 합니다.
- related: ["Prompt Contract", "Review Instruction", "Context Engineering"]

## Verification Feedback

- category: AI 코딩 도구
- shortDefinition: build, test, typecheck, review 결과를 다음 AI 요청의 수정 근거로 바꾼 feedback
- explanation: Verification Feedback은 구현 후보가 실패한 이유와 다음 시도에서 지켜야 할 조건을 함께 전달합니다. 좋은 feedback은 실패 로그를 그대로 던지지 않고 요구사항과 연결해 수정 범위를 좁힙니다.
- related: ["Implementation Loop", "Follow-up Prompt", "Verification"]
