# 용어 초안: subagents-and-delegation

## SubAgent
- category: AI 시스템
- shortDefinition: 주 에이전트가 특정 하위 작업을 맡기는 별도 컨텍스트의 전문 에이전트
- explanation: SubAgent는 own context window, custom prompt, tool access, permissions를 가진 worker입니다. 긴 탐색 결과나 로그를 main conversation에 모두 넣지 않고, focused task를 수행한 뒤 summary나 structured result만 되돌려주는 데 사용합니다.
- related: ["Agent", "Agent Loop", "Orchestration", "Context Engineering"]

## Delegation
- category: AI 시스템
- shortDefinition: 주 에이전트가 특정 작업 범위와 결과 계약을 정해 다른 실행 주체에 맡기는 방식
- explanation: Delegation은 단순 병렬 실행이 아니라 어떤 task를 어떤 권한으로 맡기고, 어떤 결과를 돌려받아 최종 판단에 쓸지 정하는 설계입니다.
- related: ["SubAgent", "Orchestration", "Harness Engineering"]

## Dynamic Workflow
- category: AI 시스템
- shortDefinition: 많은 subagent를 script로 조정해 반복 실행 가능한 대규모 위임 흐름
- explanation: Dynamic Workflow는 개별 subagent 호출을 넘어, 여러 worker를 배치하고 결과를 모아 cross-check하는 script 기반 orchestration 방식입니다.
- related: ["SubAgent", "Orchestration", "Workflow"]

