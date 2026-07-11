# 용어 초안: tool-permissions-sandboxes

기존 glossary.ts 대조 완료: `Tool Calling`, `Secret`, `Log Masking`, `Harness Engineering`, `Agent Loop` 등 상위·연관 용어는 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Permission Policy

- category: AI 코딩 도구
- shortDefinition: AI agent가 어떤 tool, file edit, command를 허용·질문·거부할지 정하는 규칙
- explanation: Permission Policy는 agentic coding tool의 행동 범위를 코드와 설정으로 제한하는 운영 기준입니다. read/search만 허용할지, 특정 directory edit를 허용할지, install/delete/network/deploy 같은 행동은 approval을 요구할지 분리합니다.
- related: ["Agent Mode", "Tool Calling", "Verification"]

## Approval Prompt

- category: AI 코딩 도구
- shortDefinition: 위험한 agent action을 실행하기 전에 사람에게 명시적 승인을 요구하는 확인 단계
- explanation: Approval Prompt는 권한 정책과 사용자 판단을 연결합니다. 파일 삭제, dependency 설치, network access, deployment처럼 blast radius가 큰 행동은 자동 실행보다 승인 요청으로 멈추게 해야 합니다.
- related: ["Permission Policy", "Code Review Boundary", "Verification"]

## Sandbox Boundary

- category: AI 코딩 도구
- shortDefinition: AI agent가 filesystem, network, command execution 같은 실행 자원에 접근할 수 있는 격리 경계
- explanation: Sandbox Boundary는 permission rule과 별개로 OS 또는 실행 환경 수준에서 접근 범위를 제한하는 안전 장치입니다. 격리는 위험 범위를 줄이지만 잘못된 코드 변경의 논리 오류까지 자동으로 막지는 못합니다.
- related: ["Cloud Sandbox", "Harness Engineering", "Secret"]

## Settings Hierarchy

- category: AI 코딩 도구
- shortDefinition: 개인, 프로젝트, 로컬, 관리형 설정처럼 여러 설정 레벨의 우선순위를 정하는 구조
- explanation: Settings Hierarchy는 agent permission과 tool behavior가 어디에서 결정되는지 추적하게 해줍니다. 팀 정책과 개인 기본값을 분리하고, 프로젝트별로 더 엄격한 규칙을 적용할 때 필요합니다.
- related: ["Permission Policy", "AI 코딩 도구", "Verification"]
