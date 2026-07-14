# Learning Platform Transition Plan

```yaml
document: LEARNING-PLATFORM-TRANSITION-PLAN
status: operator_direction_review
date: 2026-07-14
implementation_wave: separate_after_approve
```

---

## 1. 원칙

1. **기존 URL 보존** — 북마크·외부 링크 깨지 않기  
2. **Day1 중복 페이지 금지**  
3. **Atlas/100강/MR/Studio 삭제 금지**  
4. Learning Path 내비 우선  
5. 작은 PR 단위 · 롤백 가능  
6. push/deploy는 운영자 명시 후에만  

---

## 2. 단계별 전환

| Phase | 내용 | UI? | 위험 |
|---|---|---|---|
| **T0** | 본 Direction 문서 승인 | No | 낮음 |
| **T1** | `/start` 허브 (Day1 링크·Path A/B·Outcome 요약) | Yes | 낮음 |
| **T2** | Home CTA 교체 (오늘부터 시작하기 → Day1/start) | Yes | 중 (홈) |
| **T3** | Nav: 시작/배우기/… (SiteHeader allowlist) | Yes | 중 Phase1 |
| **T4** | `/learn` Track 스켈레톤 (빈 강의 없이 Day1만 활성) | Yes | 낮음 |
| **T5** | `/lab` 인덱스 → Day1 sim/sample deep-link | Yes | 낮음 |
| **T6** | `/verification` 정적 정책 페이지 | Yes | 낮음 |
| **T7** | Tools/Tech 템플릿 + **검증된 1–3 엔트리** | Yes | 출처 위험 |
| **T8** | Atlas 역링크 메타 (점진) | Yes 소 | 중 |
| **T9** | Studio 탭 확장 계획 실행 | Yes | 중 |
| **T10** | Curriculum CSV 확장 열 + XLSX | Docs/data | 낮음 |

**이번 PL Wave = T0 only (문서).**

---

## 3. 기존 Route 유지 · 변경 · 신규

| 구분 | Routes |
|---|---|
| 유지 | `/atlas/**`, `/lessons/**`, `/curriculum`, `/glossary`, `/model-routing/**`, `/resources`, Day1 learn URL, 약관 |
| 내비만 이동 | 홈 CTA, 헤더 메뉴 구성 |
| 신규 | `/start`, `/learn`, `/tools`, `/technologies`, `/lab`, `/verification` |
| Redirect | 당장 필수 아님. 추후 구 딥링크 유지 |

---

## 4. Navigation 교체

| 현재 (실측) | 목표 |
|---|---|
| 홈, Atlas, 커리큘럼, 용어, 공식 문서, 소개 | 시작, 배우기, 도구, 기술, 실습, Atlas, 검증 |

푸터: curriculum, glossary, lessons 탐색, about, resources.

**SiteHeader** = Phase1 보호 경로 → 구현 시 **명시 allowlist + 최소 diff**.

---

## 5. Home 교체 (Plan)

구현 금지 본 Wave. 목표:

- Hero 3문장 답  
- Primary CTA → `/start` 또는 Day1  
- Day1 interactive 카드  
- Continue Learning (기존 Dashboard)  
- Atlas/Tools 보조  

기존 모듈 그리드·통계는 하부 섹션으로 재배치 가능.

---

## 6. Day 1 노출

| 터치포인트 | 동작 |
|---|---|
| 홈 CTA | Day1 또는 /start |
| /start | Day1 상세 허브 → 기존 URL |
| /learn | Track A 첫 노드 |
| /lab | Day1 sim · sample 항목 |
| /curriculum | 배너 (현재 있음 · 유지) |

---

## 7. Atlas · Tool · Tech · Lab · Verification

- Atlas: 내비 위치만 Reference · 삭제 없음  
- Tool/Tech: 템플릿 후 검증 엔트리  
- Lab: 카탈로그 + deep-link  
- Verification: 정책 정적 페이지 → 이슈 템플릿  

---

## 8. Rollback

- 내비 feature flag 또는 git revert 단위 PR  
- 구 홈 섹션 브랜치 보존  
- Day1 라우트 절대 제거 금지  

---

## 9. QA (구현 Wave)

- lint/typecheck/test/build  
- 기존 /atlas /lessons /model-routing 스모크  
- Day1 interactive regression  
- 모바일 내비  
- 21/14 freeze  
- Phase1 경로 오염 없음  

---

## 10. 배포 전 Gate

- Direction 승인  
- T1–T3 로컬 검증  
- Independent Review  
- 운영자 명시 push/deploy  

---

## 11. Studio Evolution (요약)

권장: **Atlas Studio 유지 + Education Studio 상위 개념**

```text
/atlas/studio  →  "Education Studio"
  탭: Atlas 완성도 | Learning Nodes | Verification | Feedback
```

즉시 폐기·전면 재작성 금지. 상세는 Direction Review §Studio.
