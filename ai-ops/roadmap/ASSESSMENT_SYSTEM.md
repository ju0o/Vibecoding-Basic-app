# Assessment System

```yaml
document: ASSESSMENT_SYSTEM
authority: assessment_and_studio_signals_ssot_candidate
status: operator_review_required
parent: OUTCOME_FRAMEWORK.md
siblings:
  - LEARNING_OUTCOMES.md
  - STAGE_COMPLETION_SPEC.md
date: 2026-07-14
code_change: false
```

---

## 1. 목적

학생·운영자·Studio가 같은 언어로 묻는다:

```text
이 학생이 이 Stage를 혼자 할 수 있는가?
```

평가는 **순위 매기기**가 아니라 **능력 신호**다.  
Living Education: 측정은 학습을 돕기 위해 존재한다.

---

## 2. 평가 계층

```text
Item check     # 단일 Outcome 체크 / 퀴즈 문항
  → Node       # 한 학습 단위
  → Stage      # Outcome 묶음 + Complete 판정
  → Journey    # END / 캡스톤 능력
```

---

## 3. 네 가지 진행 신호 (Studio)

| 신호 ID | 이름 | 측정 | 학생 해석 |
|---|---|---|---|
| `learn_pct` | 학습 | 필수 콘텐츠  consum / 체크 | 자료를 봤는가 |
| `practice_pct` | 실습 | practice+experiment 체크 | 손을 움직였는가 |
| `quiz_pct` | Quiz | 문항 점수 · teach-back pass | 개념 점검 |
| `outcome_pct` | Outcome | required can-do 달성률 | **혼자 할 수 있는가** |

### 표시 규칙

- 네 신호를 **항상 함께** 보여 준다 (Outcome 숨김 금지).  
- Outcome이 낮으면 다른 신호가 100%여도 **강조 색/상태 = 주의**.  
- 한 줄 요약 우선:

```text
Outcome 60% → “아직 혼자 하기 어렵습니다”
Outcome 100% + 정책 충족 → “이 Stage는 혼자 할 수 있습니다”
```

### 계산 초안 (구현 전 명세)

```text
learn_pct     = required_content_done / required_content_total
practice_pct  = practice_items_done / practice_items_total
quiz_pct      = quiz_score_normalized_0_100
outcome_pct   = required_outcomes_done / required_outcomes_total
```

가중 평균으로 Complete를 **대체하지 않는다.**  
Complete 공식은 [STAGE_COMPLETION_SPEC.md](./STAGE_COMPLETION_SPEC.md).

---

## 4. 평가 활동 유형

| 유형 | Flow 단계 | Outcome 연결 |
|---|---|---|
| Experience demo | Experience | “실행했다” 계열 |
| Guided practice | Practice | 행동 Outcome |
| Open experiment | Experiment | 전이·응용 Outcome |
| Teach-back (한 문장) | Reflection | 설명 Outcome |
| Quiz (상황형 권장) | Reflection | 오개념 · 보조 |
| Capstone checklist | Outcome / END | Journey 수준 |

### 문항·체크 작성 원칙

1. **실제 문제** 상황으로 묻는다 (“정의는?”보다 “지금 에러가 나면?”).  
2. Outcome 동사와 정렬한다.  
3. 순수 암기 문항 비중을 낮춘다.  
4. “AI가 대신 해줄 수 있는 것”과 “학생이 확인해야 하는 것”을 구분한다.

---

## 5. Day 1 평가 시퀀스

```text
Experience 성공 여부 (실행 보임)
  → 필수: 미성공 시 Outcome 채점 진입 제한 권장
Question 후 설명 체크 (package.json, npm install …)
Practice / 수정 요청 재실행
Reflection teach-back 1–3문장
Outcome 체크리스트 전체
```

Day1 리포트 예:

| 신호 | 예 |
|---|---|
| 학습 | 90% |
| 실습 | 100% |
| Quiz | 75% |
| Outcome | 100% |
| 판정 | **Complete** — 첫 성공 + 핵심 왜 설명·재실행 가능 |

---

## 6. Studio — 교육 제작 + 학생 능력 (이중 보드)

### 6.1 제작 보드 (운영 · 기존 확장)

학생 질문 · Research · 출처 · 검증 · 작성 · 실습 · 애니 · 퀴즈 · Reviewer · 최근 수정 · 피드백 · 다음 작업  
(+ **Outcome 정의 여부** · Outcome–콘텐츠 역추적)

### 6.2 학습 능력 보드 (학생/운영)

| 열 | 내용 |
|---|---|
| Stage | 이름 |
| learn / practice / quiz / outcome % | 네 신호 |
| Complete? | Yes/No + 이유 |
| 미달성 Outcome | 남은 체크 항목 |
| 다음 액션 | 재실습 · Atlas · 운영자 질문 |

구현은 승인 후 Wave. 기존 `/atlas/studio` 삭제 없이 확장.

---

## 7. 피드백 루프

```text
Outcome 미달
  → 어떤 can-do가 빠졌는가
  → 해당 Practice/Experiment만 재시도
  → 필요 시 Question/Theory/Atlas
  → 재평가
  → Studio 갱신
```

학생 피드백(막힘)은 Outcome 개정 후보:

`ai-ops/reports/feedback/` (승인 후 폴더)

---

## 8. AI 역할 in Assessment

| 한다 | 하지 않는다 |
|---|---|
| 약한 Outcome 문장 개선 제안 | 학생 대신 Complete 클릭 |
| 실패 패턴 분류 · 재실습 제안 | 추측으로 “이해도 94%” 날조 |
| teach-back 초안 피드백 (과장 금지) | 공식 없는 순위·등급 남발 |

---

## 9. 공정 · 정직 · 프라이버시 (초기)

- 초기: 자가 보고 신뢰 · 강압 감시 없음  
- 성적표·공개 랭킹 기본 없음  
- 배포/시크릿 관련 Outcome은 **안전 행동** 강조  
- 외부 유료 API를 평가 채점에 필수 연결하지 않음  

---

## 10. Journey · Outcome · 콘텐츠 파이프라인

```text
학생 문제/질문
  → Research → Verification
  → Outcome 정의 (본 시스템)
  → Content / Practice / Animation / Diagram / Quiz
    (각 산출물이 outcome_id 참조)
  → Review (Outcome 역추적 검사)
  → Publish → Website last
```

Independent Review 체크 추가:

- [ ] 각 필수 섹션이 최소 1 Outcome에 연결되는가  
- [ ] Experience-first를 Theory-first로 되돌리지 않았는가  
- [ ] Complete 조건이 “읽음”으로 후퇴하지 않았는가  

---

## 11. 성공 기준

1. Studio 목업(문서)에 네 신호 + Outcome 강조가 있다.  
2. Assessment가 “많이 앎”이 아니라 “할 수 있음”을 측정한다.  
3. Day1·Git 등 예시 Stage와 평가 시퀀스가 대응한다.  
4. 구현 없이도 운영자가 오프라인 체크리스크로 동일 판정 가능.

---

## 12. 한 줄 요약

> **네 신호 중 Outcome이 왕이다. 평가는 학생이 혼자 만들 수 있는지를 보여 주기 위해 존재한다.**
