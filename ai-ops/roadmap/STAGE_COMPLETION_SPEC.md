# Stage Completion Spec

```yaml
document: STAGE_COMPLETION_SPEC
authority: stage_completion_contract_ssot_candidate
status: operator_review_required
parent: OUTCOME_FRAMEWORK.md
sibling: LEARNING_OUTCOMES.md
date: 2026-07-14
code_change: false
```

---

## 1. 완료의 정의

```text
Complete ≠ 강의를 들었다
Complete ≠ 페이지를 스크롤했다
Complete ≠ Quiz 만점만으로 자동 확정
Complete  = 해당 Stage Learning Outcome을
            관찰 가능하게 수행할 수 있다
            (혼자 할 수 있는가?)
```

---

## 2. 판정 입력 (4신호)

| 신호 | 의미 | Complete에 미치는 영향 |
|---|---|---|
| **학습(콘텐츠)** | 필수 본문/애니 소비 | 필요하나 **충분 조건 아님** |
| **실습** | Practice / Experiment 수행 | 행동 Outcome에 강하게 기여 |
| **Quiz / teach-back** | 이해 점검 | 설명 Outcome · 오개념 탐지 |
| **Outcome** | can-do 체크리스트 | **게이트** — 미달 시 Complete 불가 |

예시:

```text
학습 100% · 실습 100% · Quiz 80% · Outcome 60%
→ Stage Complete = NO
→ 메시지: “아직 혼자 하기 어렵습니다. 남은 Outcome을 다시 시도하세요.”
```

---

## 3. Outcome 달성 규칙

### 3.1 필수 vs 권장

| 등급 | 의미 | Complete |
|---|---|---|
| `required` | Stage 통과 필수 can-do | 전부 충족 |
| `recommended` | 강화 · 다음 Stage 수월 | 미충족 가능하나 경고 |
| `stretch` | 심화 · Atlas 연계 | Complete 비의존 |

Day1 체크리스트 항목은 기본 `required` (Living 조정 가능).

### 3.2 증거 유형

| 유형 | 예 | 신뢰 |
|---|---|---|
| `demo` | 실행 화면 · 명령 출력 (자가 체크) | 높음 (정직 전제) |
| `action_log` | 실습 체크리스트 완료 | 중간 |
| `teachback` | 한 문장 설명 | 중간 |
| `quiz` | 객관/상황형 | 보조 |
| `peer_or_ops` | 운영자 확인 (오프라인 수업) | 높음 |

초기 제품: **자가 체크 + teach-back** 허용.  
부정 방지보다 **학습 정직·반복 시도**를 우선 (Living Education).

### 3.3 통과 임계 (초안)

| Stage 규모 | required Outcome | Quiz |
|---|---|---|
| Day1 / 짧은 Stage | **100% required** | 권장 ≥ 70% 또는 teach-back 통과 |
| 표준 Stage | **100% required** | 권장 ≥ 70% |
| 캡스톤 / END | 필수 산출물 1 + required 100% | 상황에 따라 |

Quiz만 높고 Outcome 미달 → **Incomplete**.  
Outcome 충족 · Quiz 약간 미달 → 운영 정책으로 `pass_with_review` 가능 (기본은 Quiz 재시도 권장).

---

## 4. Complete 상태 머신

```text
not_started
  → in_progress          # Experience 시작
  → outcomes_partial     # 일부 can-do
  → ready_for_check      # 자가 체크 제출
  → complete             # required 전부
  → complete_with_gaps   # (비권장) recommended만 남김 — 기본 정책에선 미사용
  → needs_retry          # Outcome 실패 · 실습 재진입
```

`complete` 이후에도 Living: 피드백으로 Outcome 개정 시 `needs_retry` 가능.

---

## 5. Experience-first 게이트 (Day1 특수)

Day1은 다음 순서를 **강요**한다 (콘텐츠 설계 계약):

```text
1) Experience (실행 성공) 없이 Theory-only Complete 불가
2) Question 블록 없이 “개념 강의 Complete” 불가
3) Atlas-only 열람으로 Day1 Complete 불가
```

---

## 6. Next Stage 해금

| 정책 | 설명 |
|---|---|
| **권장** | 직전 Stage `complete` 후 다음 권장 |
| **탐색 허용** | Atlas · 미리보기 노드는 열람 가능 |
| **경고 스킵** | Complete 없이 다음 진입 시 “혼자 하기 어려울 수 있음” 고지 |
| **금지** | Outcome 없는 Stage를 Complete로 표시 |

구현 전: 문서·운영 규칙으로만 적용.

---

## 7. 노드 vs Stage

| 단위 | Complete |
|---|---|
| Learning Node | 노드 Outcome 또는 practice+completion 필드 |
| Stage | 소속 required Outcome **전부** |
| Journey END | 캡스톤/회고 Outcome |

노드 Complete 합 ≠ 자동 Stage Complete (Stage 레벨 체크 필요).

---

## 8. 실패 · 재시도

1. 실패한 Outcome만 재실습 경로 제시  
2. `common_mistakes` / 실패하기 쉬운 부분 노출  
3. 필요 시 Atlas 링크 (궁금함 유도 후)  
4. 동일 Outcome 3회 실패 → 운영자/피드백 큐 (강제 진도 X)

---

## 9. AI 보조와 Complete

| 허용 | 불허 |
|---|---|
| AI가 절차를 안내 | AI가 대신 전부 수행한 것을 학생 Complete로 기록 |
| 학생이 AI에게 수정 요청 (Outcome에 포함 시) | “AI가 만들었으니 완료” 클릭만 |
| 에러 해석 도움 | 비밀 키/부정 우회 안내 |

Outcome 문장에 “AI와 함께”가 있으면 **학생 주도 확인 스텝**이 반드시 포함된다 (실행·설명·재시도).

---

## 10. Studio 표시 계약

```text
Stage Complete = (Outcome_required_rate == 100%)
                 AND (policy_quiz_ok)
                 AND (experience_gate_ok if Day1)
```

표시 예:

| 항목 | 값 |
|---|---|
| 학습 | 100% |
| 실습 | 100% |
| Quiz | 80% |
| Outcome | 60% |
| Status | **Incomplete — 혼자 하기 부족** |

---

## 11. 금지

- 출석·체류 시간만으로 Complete  
- Theory → Quiz만으로 Complete  
- Atlas 열람 횟수로 Complete  
- Journey 폐기 또는 Outcome 없는 새 Stage 추가  

---

## 12. 성공 기준

1. “들었다”와 “할 수 있다”가 문서·Studio 문구에서 분리된다.  
2. Outcome 60% 시나리오가 Incomplete로 명시된다.  
3. Day1 Experience 게이트가 스펙에 있다.  
4. 에이전트가 Complete를 허위로 선언하지 않는다.
