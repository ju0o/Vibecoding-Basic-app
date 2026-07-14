# Workflow (교육 개념)

```yaml
lesson_id: workflow
node_id: C10
order: 25
prev: subagent
next: Track D (paused until milestone gate)
track: C
verified_at: 2026-07-14
depth: review_ready_remediation
claim_scope: educational_interpretation
```

## 학생 질문

- Workflow는 자동화 도구인가요?
- 사람 확인은 어디에 넣나요?
- Track C에서 배운 것을 어떻게 한 줄로 잇나요?

## Why Now

요청·프롬프트·컨텍스트·분해·수정 루프·QA·Agent/SubAgent를 조각으로 봤습니다.  
이제 **반복 가능한 순서**로 묶습니다.

## 핵심

- **Workflow (교육)** — 목표를 달성하기 위한 **단계 순서** (수동·반자동·도구 포함 가능).
- 좋은 교육 워크플로는 **Human-in-the-loop**(사람 확인) 지점을 넣습니다.
- 특정 CI 제품·특정 에이전트 제품 이름이 “Workflow의 정의”가 아닙니다.

## 미니 워크플로 템플릿

```text
1 목표·범위 적기 (C01)
2 관련 파일만 고르기 (C04)
3 작은 작업 1개 (C05)
4 구현/수정
5 오류 시 Fix Loop (C06)
6 QA 체크 (C07)
7 기록·다음 조각
```

## 실습

1. 인터랙티브 Workflow 모드 단계 읽기.  
2. 위 템플릿을 내 프로젝트 한 줄 목표에 맞게 5–7단계로 다시 쓰기.  
3. 사람 확인 지점에 빨간 표시.

## Outcome

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-C10-1 | 5단계+ 워크플로 | Independent | 목록 |
| O-C10-2 | HITL 지점 표시 | Assisted | 표시된 단계 |
| O-C10-3 | Track C 연결 설명 | Explainable | 2분 구두 |

## Track C 마무리

좋은 요청 → Prompt → Context → 관련 파일 → 분해 → Fix Loop → QA → Agent → SubAgent → Workflow  

**Track D는 Milestone Gate 통과 후** 재개.

## Sources

- educational_interpretation  
- verified_at: 2026-07-14  
