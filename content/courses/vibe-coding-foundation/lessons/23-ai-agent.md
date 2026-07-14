# AI Agent (교육 개념)

```yaml
lesson_id: ai-agent
node_id: C08
order: 23
prev: qa-basics
next: subagent
track: C
verified_at: 2026-07-14
depth: review_ready_remediation
claim_scope: educational_interpretation
```

## 학생 질문

- Agent는 특정 앱 이름인가요?
- 채팅과 무엇이 다른가요?
- 왜 권한이 중요하나요?

## Why Now

QA까지 사람이 확인하는 흐름을 봤습니다.  
일부 도구는 목표를 위해 **여러 단계·도구를 반복**할 수 있습니다. 이를 교육적으로 **Agent 패턴**이라 부릅니다.  
**단일 업계 표준 정의·제품 순위가 아닙니다.**

## 핵심 (과장 금지)

- **Agent (교육)** — 목표를 위해 관측→행동(도구)→재관측을 반복할 수 있는 AI 사용 패턴.
- 한 번 묻고 한 번 답하는 채팅과 달리 **루프**가 강조됩니다.
- 권한이 넓으면 파일 대량 변경 등 **위험**도 커질 수 있습니다 → 범위·QA 필수.

## 오개념

| 오해 | 교정 |
|---|---|
| Agent = 특정 회사 제품 | 제품은 구현체, 말은 패턴/마케팅 혼재 |
| Agent면 검증 불필요 | 오히려 검증이 더 중요할 수 있음 |
| 항상 사람보다 정확 | 환각·범위 일탈 가능 |

## 실습

1. 인터랙티브에서 Chat vs Agent 모드 비교.  
2. “제목만 변경” 목표에 Agent를 쓸 때 **허용 도구/금지 파일**을 적는다.  
3. Teach-back: Agent를 브랜드 없이 한 문장.

## Outcome

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-C08-1 | Agent≠브랜드 | Explainable | 문장 |
| O-C08-2 | 루프 단계 말함 | Explainable | 관측-행동-재관측 |
| O-C08-3 | 권한/범위 필요성 | Assisted | 금지 목록 |

## Sources

- educational_interpretation only  
- do not invent official “Agent standard tiers”  
- verified_at: 2026-07-14  

## Next

역할을 나누면 → **SubAgent**
