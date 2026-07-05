# 용어 초안: harness-engineering-basics

## Sandbox
- category: AI 시스템
- shortDefinition: Agent가 파일, shell, package, port 같은 실행 자원을 격리해 사용하는 작업 환경
- explanation: Sandbox는 agent가 실제 작업을 수행하는 execution plane입니다. 파일 시스템, shell, installed packages, snapshots 같은 실행 자원을 제공하지만, tool routing, approvals, tracing 같은 control plane은 harness가 담당합니다.
- related: ["Harness Engineering", "Agent", "Tool Calling"]

## Guardrails
- category: AI 시스템
- shortDefinition: Agent의 입력, 출력, 도구 행동을 자동으로 검증하는 안전 경계
- explanation: Guardrails는 input, output, tool behavior를 자동 검증하고 run을 계속할지, 멈출지, 사람 승인으로 넘길지 판단하는 데 쓰입니다. harness 안의 validation boundary로 이해할 수 있습니다.
- related: ["Harness Engineering", "Human Review", "Tool Calling"]

## Human Review
- category: AI 시스템
- shortDefinition: 민감한 agent 행동을 잠시 멈추고 사람이 approve 또는 reject하는 승인 절차
- explanation: Human Review는 배포, 삭제, 민감 데이터 수정처럼 자동 진행이 위험한 행동에서 run을 pause하고 사람의 결정을 받는 approval boundary입니다.
- related: ["Guardrails", "Harness Engineering", "Approval"]

## Trace
- category: AI 시스템
- shortDefinition: Agent workflow run의 model call, tool call, approval, 결과 흐름을 따라갈 수 있는 실행 기록
- explanation: Trace는 agent 실패를 디버깅하고, 안정화된 뒤 agent workflow evaluation의 high-signal example로 활용할 수 있는 관찰 기록입니다.
- related: ["Harness Engineering", "Observability", "Evaluation Harness"]

## Evaluation Harness
- category: AI 시스템
- shortDefinition: Agent task를 end-to-end로 실행하고 trial, transcript, outcome, grader 결과를 모아 평가하는 infrastructure
- explanation: Evaluation Harness는 단일 답변이 아니라 agent가 여러 turn 동안 환경을 바꾸는 작업을 평가하기 위한 구조입니다. transcript와 final environment outcome을 구분해 agent의 실제 성공 여부를 판단합니다.
- related: ["Harness Engineering", "Agent Evaluation", "Trace"]

