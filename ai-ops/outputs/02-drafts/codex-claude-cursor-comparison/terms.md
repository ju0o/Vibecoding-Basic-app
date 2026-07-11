# 용어 초안: codex-claude-cursor-comparison

기존 glossary.ts 대조 완료: `Cloud Agent`, `AI 코딩 도구`, `GitHub Copilot`, `Verification`, `Code Review Boundary` 등 상위 용어는 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Execution Surface

- category: AI 코딩 도구
- shortDefinition: AI 코딩 도구가 사용자의 작업과 만나는 위치와 형태
- explanation: Execution Surface는 terminal, IDE, cloud sandbox처럼 agent가 어디에서 context를 읽고 도구를 실행하며 결과를 보여주는지 구분하는 기준입니다. 같은 AI coding tool이라도 surface가 다르면 권한, 관찰 가능성, review workflow가 달라집니다.
- related: ["AI 코딩 도구", "Cloud Agent", "Tool Calling"]

## Context Access

- category: AI 코딩 도구
- shortDefinition: AI 도구가 작업 판단에 사용할 수 있는 repository, 파일, 검색, 대화, 실행 결과의 범위
- explanation: Context Access는 도구 비교에서 모델 성능만큼 중요한 축입니다. 로컬 codebase, remote sandbox, selected files, search tools 중 무엇을 볼 수 있는지에 따라 답변과 수정 품질이 달라지며, 많은 context가 항상 더 정확하다는 뜻은 아닙니다.
- related: ["Context Engineering", "AI 코딩 도구", "Verification"]

## Review Workflow

- category: AI 코딩 도구
- shortDefinition: AI가 만든 변경을 diff, test, branch, PR, 사람 검토로 통과시키는 절차
- explanation: Review Workflow는 agent output을 제품 코드로 받아들이기 전의 검증 흐름입니다. AI-generated code needs review라는 원칙을 실제 작업에서는 changed files, test result, risk report, human review로 나누어 적용합니다.
- related: ["Code Review Boundary", "Verification", "Cloud Agent"]
