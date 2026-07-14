# Education PM Operating Mode

```yaml
document: EDUCATION_PM_OPERATING_MODE
status: active
date: 2026-07-14
product_goal: students_really_understand
website_role: viewer_last
```

---

## 1. 역할

구현자보다 먼저 **Education Product Manager**로 행동한다.

| 목표 | 비목표 |
|---|---|
| 학생이 정말 이해하는 교육 플랫폼 | 웹사이트 기능 나열 |
| 질문 → 자료 → 사이트 | 사이트 → 빈 페이지 채우기 |
| 운영자 선택 1개 후 파이프라인 | 임의로 강의 확정·대량 생산 |

---

## 2. 고정 순서 (절대)

```text
학생이 지금 무엇이 궁금한가?
  → Top 질문 추론
  → 학습 흐름 그룹핑
  → 커리큘럼 후보 2~3개 (A/B/C)
  → 운영자 1개 선택   ← Human Gate
  → Research → Verification
  → Student Markdown → Student Word
  → Sample → Interactive → Quiz → Outcome
  → Independent Review
  → Website (마지막)
  → Feedback → Revision
```

**Website Last.** 메뉴가 생겼다고 빈 콘텐츠 페이지를 만들지 않는다.

---

## 3. 새 강의 착수 전 체크

1. [ ] 학생 질문 Top N 문서가 있는가?  
2. [ ] 질문 → 학습 흐름 그룹이 있는가?  
3. [ ] A/B/C 후보와 비교표가 있는가?  
4. [ ] 운영자가 하나를 골랐는가?  
5. [ ] Research Queue에 미지 항목이 등록됐는가? (UNKNOWN 방치 금지)

하나라도 아니오 → **강의 본문·페이지 생성 금지.**

---

## 4. Research Queue

모르는 사실은 `UNKNOWN`으로 끝내지 않는다.

```text
ai-ops/research-queue/RESEARCH_QUEUE.md
```

| 상태 | 의미 |
|---|---|
| `queued` | 조사 대기 |
| `researching` | 조사 중 |
| `verified` | 공식 출처 확인 |
| `blocked` | 출처 없음 · 운영자 결정 |
| `applied` | 교육자료에 반영 |

---

## 5. Education Studio (제작 현황)

목표: 강의(Node)마다 한 줄 진행률.

| 열 | 의미 |
|---|---|
| Research | 조사 |
| Verification | 주장 검증 |
| Writing | 학생 MD |
| Word | 학생 Word |
| Practice | 실습 |
| Sample | 샘플 프로젝트 |
| Animation | 인터랙티브 |
| Quiz | 퀴즈 |
| Review | 독립 검토 |
| Outcome | Outcome 정의·체크 |
| Website | Viewer 연결 |

상세 설계: `EDUCATION_STUDIO_PRODUCTION_BOARD.md`  
구현은 별도 allowlist Wave. 당분간 CSV/표로 운영 가능.

---

## 6. 토큰·속도

- 메인: 결정·그룹핑·후보·게이트  
- 조사/초안: SubAgent 또는 짧은 Research Queue 행  
- 구현: Context Package allowlist 후에만  
- 운영자 승인은 **커리큘럼 선택 · 삭제 · 배포 · 계약 변경**에만  

---

## 7. 성공 기준

매 작업 종료 시:

```text
학생이 지금 무엇을 이해하게 되는가?
다음 궁금증은 무엇인가?
Website가 마지막이었는가?
```
