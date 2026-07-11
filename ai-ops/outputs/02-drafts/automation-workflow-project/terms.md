# 용어 초안: automation-workflow-project

기존 glossary.ts 대조 완료: `Workflow`, `Agent`, `Tool Calling` 기본 용어와 충돌하지 않도록 자동화 프로젝트 구조 중심 용어만 생성한다.

## 생성 용어

## Workflow Dependency Graph

- category: AI 시스템 설계
- shortDefinition: workflow 안의 job들이 어떤 순서와 의존 관계로 실행되어야 하는지 나타내는 구조
- explanation: Workflow Dependency Graph는 job이 기본적으로 병렬 실행될 수 있다는 사실을 고려해, build 이후 test, test 이후 release처럼 명시적인 순서를 설계하는 기준입니다. 자동화 프로젝트에서 예측 가능성과 실패 위치 파악에 중요합니다.
- related: ["Workflow", "Automation", "CI"]

## Workflow Tool Boundary

- category: AI 시스템 설계
- shortDefinition: LLM이 tool 사용을 요청하는 단계와 workflow가 실제 tool을 실행하는 단계를 나누는 경계
- explanation: Workflow Tool Boundary는 모델의 tool call request가 곧바로 외부 시스템 실행이 되지 않도록 하는 안전 경계입니다. 자동화 workflow에서는 predefined code path가 어떤 tool을 어떤 조건에서 실행할지 정합니다.
- related: ["Tool Calling", "Agent", "Workflow"]

## Predefined Code Path

- category: AI 시스템 설계
- shortDefinition: agent가 동적으로 결정하기보다 사람이 미리 정한 절차대로 LLM과 tool을 orchestration하는 실행 경로
- explanation: Predefined Code Path는 Anthropic의 workflow 설명처럼 LLM과 tool이 미리 정한 코드 경로를 따라 움직이는 구조입니다. 반복 가능하고 예측 가능한 자동화에는 agent보다 workflow가 적합할 수 있습니다.
- related: ["Workflow", "Orchestration", "Agent"]
