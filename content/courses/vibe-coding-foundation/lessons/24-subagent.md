# SubAgent (교육 개념)

```yaml
lesson_id: subagent
node_id: C09
order: 24
prev: ai-agent
next: workflow
track: C
verified_at: 2026-07-14
depth: review_ready_remediation
claim_scope: educational_interpretation
```

## 학생 질문

- SubAgent는 Agent의 하위 직원인가요?
- 왜 한 에이전트에 다 안 맡기나요?
- 조사/작성/검토를 나누면 뭐가 좋나요?

## Why Now

Agent 루프를 이해했습니다.  
일이 커지면 **역할이 좁은 하위 실행**으로 나누는 패턴이 등장합니다 (교육 라벨: SubAgent).  
제품마다 이름·구현이 다릅니다.

## 핵심

- **SubAgent (교육)** — 좁은 임무(조사만, 초안만, 검토만 등)를 맡은 하위 실행 단위.
- 이점(패턴): 컨텍스트 분산, 실수 범위 축소, 검토 분리.  
- 위험: 역할 중복, 전달 누락, 책임 공백.

## 실습 시나리오

목표: “Day1 제목 색만 변경”

| 역할 | 임무 | 금지 |
|---|---|---|
| 조사 | style.css / index 연결만 보고 위치 후보 | 수정 금지 |
| 작성 | 최소 diff 제안 | server.js 금지 |
| 검토 | 범위·비밀·실행 확인 | 새 기능 추가 금지 |

위 표를 채우고, 각 역할에 줄 요청문 1개씩 작성.

## Outcome

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-C09-1 | 위임 한 줄 | Explainable | 문장 |
| O-C09-2 | 3역할 표 | Independent | 표 |
| O-C09-3 | 전부-한-에이전트 위험 | Explainable | 예시 |

## Sources

- educational_interpretation  
- verified_at: 2026-07-14  

## Next

단계를 반복 가능하게 묶기 → **Workflow**
