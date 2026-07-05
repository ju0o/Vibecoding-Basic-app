# 용어 초안: multi-agent-orchestration

## Orchestration
- category: AI 시스템
- shortDefinition: 여러 agent, tool, handoff 사이의 작업 소유권과 흐름을 조정하는 설계
- explanation: Orchestration은 specialist가 대화를 넘겨받는지, manager가 최종 답변 책임을 유지하는지, worker 결과를 어떻게 합성하는지 정하는 구조입니다.
- related: ["Agent", "SubAgent", "Handoff", "Harness Engineering"]

## Handoff
- category: AI 시스템
- shortDefinition: 대화나 작업 제어권이 specialist agent로 이동하는 위임 방식
- explanation: Handoff는 specialist가 다음 user-facing response를 소유해야 할 때 쓰는 orchestration 패턴입니다.
- related: ["Orchestration", "Agent", "SubAgent"]

## Agents as Tools
- category: AI 시스템
- shortDefinition: manager agent가 specialist agent를 내부 도구처럼 호출하고 최종 답변 책임을 유지하는 패턴
- explanation: Agents as Tools에서는 specialist가 bounded capability로 작동하고, manager가 결과를 받아 최종 응답을 합성합니다.
- related: ["Orchestration", "Tool Calling", "Agent"]

## Orchestrator-Workers
- category: AI 시스템
- shortDefinition: central LLM이 작업을 동적으로 쪼개 worker LLMs에 맡기고 결과를 합성하는 구조
- explanation: Orchestrator-Workers는 subtasks를 미리 예측하기 어려운 복잡한 작업에서 central agent가 worker를 구성하고 결과를 모아 판단하는 workflow입니다.
- related: ["Orchestration", "SubAgent", "Workflow"]

