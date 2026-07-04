# 용어 초안: from-prompt-to-system

기존 glossary.ts 대조 완료 (2026-07-03): Prompt Engineering, Context Engineering, MCP, Skills, Agent, Harness Engineering 기등재 — 중복 생성 안 함.

## Workflow (워크플로)
category: AI 시스템
shortDefinition: AI 작업의 진행 경로를 사람이 미리 코드로 정해둔 실행 흐름입니다.
explanation: AI에게 여러 단계를 맡길 때 매번 경로가 달라지면 결과를 믿기 어렵습니다. Workflow는 리서치, 작성, 검증처럼 단계와 순서를 미리 정해두고 그 경로대로만 진행하게 만듭니다. 경로를 AI가 스스로 결정하는 Agent와 대비되는 개념이며, 예측 가능성이 중요한 반복 작업에 적합합니다. 이 사이트의 강의 생산 파이프라인도 Workflow의 예입니다.
related: [Agent, Context Engineering, Skills]
status: new

## AI 시스템 설계
category: AI 시스템
shortDefinition: AI가 안정적으로 일하도록 재료, 도구, 절차, 검증을 갖춘 구조를 만드는 일입니다.
explanation: 프롬프트 한 번으로 얻는 결과는 매번 달라질 수 있습니다. AI 시스템 설계는 AI가 판단에 쓸 컨텍스트, 외부 도구 연결, 재사용 절차, 완료 검증까지 구조로 만들어 결과의 품질을 반복 가능하게 합니다. Context Engineering, MCP, Skills, Agent가 모두 이 설계의 부품입니다.
related: [Context Engineering, MCP, Skills, Agent, Workflow]
status: new
