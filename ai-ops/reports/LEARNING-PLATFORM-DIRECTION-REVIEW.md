# Learning Platform Direction Review

```yaml
document: LEARNING-PLATFORM-DIRECTION-REVIEW
date: 2026-07-14
verdict: READY_FOR_LEARNING_PLATFORM_DIRECTION_REVIEW
day1_interactive: approved_and_preserved
code_ui_changed: false
push: false
deploy: false
```

---

## 1. 새로운 프로젝트 정의

```text
Learning Platform + Knowledge Library + Living Verification System
```

- 학생이 Day 1부터 따라감  
- 궁금하면 Atlas/Tool/Tech  
- 출처·검증·수정으로 성장 (Living Education)

핵심 한 줄:

> Learning Path가 학생을 이끌고, Atlas·Tool·Technology가 필요할 때 지식을 주며, 모든 콘텐츠는 출처와 수정 이력으로 계속 성장한다.

---

## 2. 전체 사이트 목차

| 영역 | Route (권장) |
|---|---|
| 홈 | `/` |
| 시작하기 | `/start` → Day1 재사용 |
| 배우기 | `/learn` + tracks |
| 도구 | `/tools` |
| 기술 | `/technologies` |
| 실습 | `/lab` |
| Atlas | `/atlas` (+ MR, Studio) |
| 검증 센터 | `/verification` |
| 학습 지도 | `/curriculum` |
| Textbook | `/lessons/*` |
| Wiki | `/glossary` |

상세: `LEARNING-PLATFORM-INFORMATION-ARCHITECTURE.md`

---

## 3. 학생 주요 흐름

```text
홈 “오늘부터 시작하기”
  → /start 또는 Day1
  → Path A 시뮬 + Path B sample
  → Quiz / Outcome
  → /learn 다음 Track 노드
  → 막힘 시 Atlas / Tech / Tool
  → Lab에서 재실습
  → 틀리면 Verification 제안
```

---

## 4. 기존 자료 재사용

| 추정 | 내용 |
|---|---|
| ≥90% | 경로·파일 유지 |
| 기준 구현 | Day1 interactive + sample + quiz |
| 전량 보존 | 21 Concept, 14 section, Graph, Timeline, MR, Studio, 100강, KB |

삭제 0. Migration audit 참고.

---

## 5. Route 유지 · 변경 · 신규

| 유지 | 내비/홈 변경 예정 | 신규 예정 |
|---|---|---|
| atlas, lessons, curriculum, glossary, resources, model-routing, day-1 | `/` CTA, SiteHeader | start, learn, tools, technologies, lab, verification |

---

## 6. Day 1 위치

- **SSOT 구현:** `/learn/vibe-coding-foundation/day-1`  
- Start 허브·Learn Track A·Lab 카탈로그가 **링크**  
- 중복 Day1 페이지 **금지**  
- Interactive Review 승인 자산 보존  

---

## 7. Atlas 새 위치

- Reference Layer (메인 Path 아님)  
- 역링크 계약 설계 (대규모 챕터 수정 없음)  
- Model Routing 산하 유지  

---

## 8. Tool / Technology / Lab / Verification / Studio

| 영역 | 요지 |
|---|---|
| Tool | 선택 도우미 · 미검증 가격 금지 |
| Technology | 기술 개념 · Tool과 분리 |
| Lab | Node 연결 실습 허브 · Day1 deep-link |
| Verification | 검증 센터 · 무DB 제안 채널 |
| Studio | Atlas Studio 확장 → Education Studio 탭 권장 |

---

## 9. Curriculum 관계

Course→Track→Stage→Node + Outcomes + MD/Word/Sample/Anim/Quiz + refs  
CSV SSOT · 한글 XLSX · lifecycle 상태 한글 표시  
계약: `LEARNING-CONTENT-RELATIONSHIP-CONTRACT.md`

---

## 10. 콘텐츠 제작 흐름

```text
Question → Research → Verify → Map → Outcomes → MD → Word
→ Practice → Sample → Interactive Animation → Quiz → Review
→ Website → Feedback → Revision
```

---

## 11. 장기 Roadmap (제안)

Phase 1 Start (Day1+) → 2 Project 이해 → 3 AI 협업 → 4 Ship → 5 Tools → 6 AI Eng → 7 Production  
**운영자 승인 전 확정 아님.** Day2 콘텐츠 미작성.

---

## 12. 구현 전 운영자 결정 사항

1. IA·내비 라벨 확정 (검증 센터 명칭 포함)?  
2. `/curriculum` vs `/learn` 역할 문구 OK?  
3. Transition T1(`/start`)부터 착수 승인?  
4. SiteHeader Phase1 수정 allowlist 승인?  
5. Tool 초기 엔트리 우선순위 (공식 검증 가능 목록)?  
6. Studio: 확장 vs 상위 Education Studio 네이밍?  
7. Production Roadmap Phase 순서 수정?  
8. Home 카피 톤 승인 후 T2?  

---

## 13. 위험

| 위험 | 완화 |
|---|---|
| 내비 과밀 | 최상위 7개 제한 |
| Tool 미검증 사실 | Verification policy |
| Path vs 100강 혼란 | learn/curriculum 역할 분리 |
| Phase1 헤더 | allowlist·최소 diff |
| Scope creep Day2 | Roadmap만 · 콘텐츠 금지 본 Wave |

---

## 14. 권장 Transition 순서

T0 문서 승인 → T1 `/start` → T2 Home CTA → T3 Nav → T4 `/learn` skeleton → T5 Lab → T6 Verification → (이후 Tools/Tech 소수)

---

## 15. 생성 문서

| 문서 |
|---|
| `ai-ops/roadmap/LEARNING-PLATFORM-INFORMATION-ARCHITECTURE.md` |
| `ai-ops/reports/LEARNING-PLATFORM-ASSET-MIGRATION-AUDIT.md` |
| `ai-ops/roadmap/LEARNING-CONTENT-RELATIONSHIP-CONTRACT.md` |
| `ai-ops/roadmap/LIVING-KNOWLEDGE-VERIFICATION-POLICY.md` |
| `ai-ops/roadmap/LEARNING-PLATFORM-TRANSITION-PLAN.md` |
| `ai-ops/roadmap/LIVING-CURRICULUM-PRODUCTION-ROADMAP.md` |
| `ai-ops/reports/LEARNING-PLATFORM-DIRECTION-REVIEW.md` (본 파일) |
| `ai-ops/reports/LEARNING-PLATFORM-DIRECTION-IR.md` |

---

## 16. Independent Review

`LEARNING-PLATFORM-DIRECTION-IR.md` → **approve_with_notes**

---

## 17. 코드/UI · push/deploy

| 항목 | 상태 |
|---|---|
| Home/Nav 구현 | **없음** (계획만) |
| Day2 콘텐츠 | **없음** |
| Atlas 삭제 | **없음** |
| Day1 보존 | **예** |
| push / deploy | **미실행** |

---

## 18. Verdict

```text
READY_FOR_LEARNING_PLATFORM_DIRECTION_REVIEW
```
