# 용어 초안: ide-agent-era

기존 glossary.ts 대조 완료: `Agent`, `Agent Loop`, `Cloud Agent`, `GitHub Copilot`, `Codex`, `Chat Coding` 관련 상위 용어는 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Agent Mode

- category: AI 코딩 도구
- shortDefinition: chat prompt를 시작점으로 AI가 여러 단계의 작업 계획과 도구 호출을 수행하는 코딩 도구 모드
- explanation: Agent Mode는 질문에 답하는 chat surface를 넘어 repository 조사, 파일 수정, terminal command, test 실행 같은 행동을 연결합니다. 따라서 prompt 품질뿐 아니라 권한, sandbox, diff review, stop condition이 함께 필요합니다.
- related: ["Agent", "Chat Coding", "Cloud Agent"]

## Repository Task Delegation

- category: AI 코딩 도구
- shortDefinition: 잘 정의된 repository 작업을 AI agent에게 맡기고 결과를 branch, diff, test output으로 검토하는 방식
- explanation: Repository Task Delegation은 agent가 독립적으로 작업한다는 환상이 아니라, 사람이 범위와 성공 기준을 정하고 agent의 변경 결과를 검토하는 협업 패턴입니다. 작은 issue, 명확한 acceptance criteria, 검증 명령이 있어야 review 가능한 단위가 됩니다.
- related: ["Agent Mode", "Code Review Boundary", "Verification"]

## Cloud Sandbox

- category: AI 코딩 도구
- shortDefinition: repository snapshot이 준비된 원격 격리 실행 환경에서 AI agent가 작업하는 공간
- explanation: Cloud Sandbox는 agent가 파일을 읽고 수정하거나 명령을 실행할 때 로컬 환경과 분리된 실행 경계를 제공합니다. 격리는 위험을 줄이지만 결과 코드의 정확성을 보장하지 않으므로 diff review와 test가 필요합니다.
- related: ["Cloud Agent", "Sandbox", "Verification"]
