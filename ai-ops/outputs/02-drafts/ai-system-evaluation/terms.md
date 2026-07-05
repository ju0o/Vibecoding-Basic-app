# 용어 초안: ai-system-evaluation

## AI System Evaluation
- category: AI 시스템
- shortDefinition: 모델 출력, trace, 도구 사용, 환경 상태, 성공 기준을 함께 측정해 AI 애플리케이션 품질을 판단하는 평가 체계
- explanation: AI System Evaluation은 단일 답변 채점이 아니라 agent workflow의 tool calls, guardrails, handoffs, final environment outcome까지 포함해 품질을 측정하는 구조입니다.
- related: ["Trace Grading", "Grader", "Success Criteria", "Evaluation Harness"]

## Success Criteria
- category: AI 시스템
- shortDefinition: AI 시스템이 성공했다고 판단하기 위해 미리 정의하는 구체적이고 측정 가능한 기준
- explanation: Success Criteria는 eval과 grader가 무엇을 측정해야 하는지 정하는 출발점입니다. 좋은 기준은 specific, measurable, achievable, relevant해야 합니다.
- related: ["AI System Evaluation", "Grader"]

## Trace Grading
- category: AI 시스템
- shortDefinition: agent workflow trace를 보고 tool call, handoff, guardrail 같은 실행 경로 문제를 평가하는 방식
- explanation: Trace Grading은 최종 답변만 보는 대신 model calls, tool calls, guardrails, handoffs의 end-to-end record를 검토해 workflow-level issue를 찾습니다.
- related: ["Trace", "AI System Evaluation", "Agent"]

## Grader
- category: AI 시스템
- shortDefinition: success criteria를 출력, trace, outcome에 적용해 평가 신호를 만드는 장치
- explanation: Grader는 자동 평가나 사람 판단과 결합해 AI 시스템 품질을 측정합니다. 기준이 모호하면 grader의 점수도 의미가 약해집니다.
- related: ["Success Criteria", "AI System Evaluation"]

## Eval Run
- category: AI 시스템
- shortDefinition: 정해진 dataset과 평가 기준으로 AI 시스템을 반복 실행해 품질을 측정하는 평가 실행 단위
- explanation: Eval Run은 prompt change, model migration, regression tracking처럼 반복 가능한 비교가 필요할 때 사용합니다.
- related: ["AI System Evaluation", "Dataset", "Grader"]

