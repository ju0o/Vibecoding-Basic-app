# 용어 초안: ai-code-review-tools

기존 glossary.ts 대조 완료: `AI Code Review`, `Review Workflow`, `Code Review Boundary`, `Verification`, `GitHub Copilot`은 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## AI Review Comment

- category: AI 코딩 도구
- shortDefinition: AI 리뷰 도구가 pull request나 diff에 남기는 문제 후보·수정 제안 의견
- explanation: AI Review Comment는 approve나 request changes 자체가 아니라 사람이 검토할 입력입니다. comment가 실제 결함인지, suggested change를 적용할지, 추가 test가 필요한지는 사람이 diff와 요구사항을 읽고 판단해야 합니다.
- related: ["AI Code Review", "Review Workflow", "Verification"]

## Suggested Change

- category: AI 코딩 도구
- shortDefinition: 리뷰 comment에서 바로 적용할 수 있는 코드 변경 후보
- explanation: Suggested Change는 문제 해결을 빠르게 시도하게 해주지만, 자동 정답은 아닙니다. 적용 전후 diff를 읽고 test로 검증해야 하며, 보안이나 business logic 변경에서는 사람 review가 더 깊게 필요합니다.
- related: ["AI Review Comment", "Code Review Boundary", "Verification"]

## Review Instruction

- category: AI 코딩 도구
- shortDefinition: AI 리뷰 도구가 프로젝트 규칙을 참고하도록 제공하는 repository 또는 team 수준의 검토 지침
- explanation: Review Instruction은 custom instructions, repository rules, BUGBOT.md처럼 리뷰 도구가 프로젝트별 금지 패턴과 검증 기준을 참고하게 하는 context layer입니다. 규칙이 짧고 구체적일수록 AI comment가 팀 기준에 가까워집니다.
- related: ["AI Code Review", "Repository Instruction", "Review Workflow"]

## Comment Review Boundary

- category: AI 코딩 도구
- shortDefinition: AI가 남긴 comment review와 사람이 내리는 approve/request changes 판단을 구분하는 경계
- explanation: Comment Review Boundary는 AI review를 merge approval로 오해하지 않게 하는 운영 기준입니다. AI는 comment와 suggested change 후보를 제공할 수 있지만, required approval과 최종 merge 책임은 사람 review 절차에 남습니다.
- related: ["AI Review Comment", "Code Review Boundary", "Review Workflow"]
