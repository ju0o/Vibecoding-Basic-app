# 용어 초안: code-change-risk-analysis

기존 glossary.ts 대조 완료: `AI Code Review`, `Code Review Boundary`, `Review Workflow`, `Verification`, `API`, `XSS`, `CSRF`, `CORS`는 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Diff Scope

- category: AI 코딩 도구
- shortDefinition: pull request에서 실제로 바뀐 파일과 줄, 변경 영역의 범위
- explanation: Diff Scope는 위험 분석의 출발점입니다. 어떤 파일과 시스템 경계가 바뀌었는지 알아야 보안, API, 데이터, UI, dependency 같은 검토 우선순위를 정할 수 있습니다.
- related: ["Review Workflow", "AI Code Review", "Verification"]

## Risk Signal

- category: AI 코딩 도구
- shortDefinition: 변경이 더 깊은 review나 추가 검증을 요구할 수 있음을 알려주는 단서
- explanation: Risk Signal은 code scanning alert, auth 파일 변경, dependency 변경, scope 밖 diff, AI review comment처럼 위험 분석에서 우선순위를 올리는 입력입니다. signal은 결론이 아니라 사람이 확인할 후보입니다.
- related: ["Diff Scope", "Security Alert", "Review Workflow"]

## Security Alert

- category: AI 코딩 도구
- shortDefinition: code scanning이나 보안 분석 도구가 PR 또는 코드에서 표시하는 취약점·오류 후보
- explanation: Security Alert는 PR diff 안에서 검토할 수 있는 자동 분석 신호입니다. alert가 있으면 path, details, 변경 맥락을 확인해야 하며, alert가 없다고 manual review가 사라지는 것은 아닙니다.
- related: ["Risk Signal", "AI Code Review", "Verification"]

## Manual Review Boundary

- category: AI 코딩 도구
- shortDefinition: 자동 분석이나 AI review가 아니라 사람이 business logic과 context를 직접 확인해야 하는 검토 경계
- explanation: Manual Review Boundary는 authorization intent, data flow, business rule, context-specific vulnerability처럼 human expertise가 필요한 영역을 분리합니다. 자동 도구는 signal을 주고, 사람은 시스템 맥락과 요구사항을 연결합니다.
- related: ["Code Review Boundary", "Verification", "Risk Signal"]
