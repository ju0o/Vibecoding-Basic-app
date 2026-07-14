# Education Studio — 제작 현황 보드 설계

```yaml
document: EDUCATION_STUDIO_PRODUCTION_BOARD
status: design
route_keep: /atlas/studio
ui_name: Education Studio
implement: later_allowlist
date: 2026-07-14
```

---

## 1. 목적

운영자가 **강의(Learning Node)마다** 파이프라인 진행을 한눈에 본다.

페이지 찍기 현황이 아니라 **교육 제작 현황**.

---

## 2. 보드 열 (Node 단위)

| 열 | 영문 키 | 0–100 또는 상태 |
|---|---|---|
| Research | research | not_started / done |
| Verification | verification | … |
| Writing (MD) | writing | … |
| Student Word | word | … |
| Practice | practice | … |
| Sample | sample | … |
| Animation | animation | none / storyboard / interactive |
| Quiz | quiz | … |
| Review | review | pass / revise / block |
| Outcome | outcome | defined / checked |
| Website | website | connected / not |

진행률 표시 예 (과장 수식 금지):

```text
완료 단계 수 / 11
```

또는 열별 ●○ 배지.

---

## 3. 화면 구조 (기존 Studio 확장)

Route **유지:** `/atlas/studio`

| 탭 (장기) | 내용 |
|---|---|
| 학습 과정 | Node 보드 (본 문서) |
| 교육자료 | MD/Word 경로 |
| Atlas | 기존 완성도 (현재 구현) |
| 출처 검증 | Research Queue · checked_at |
| 피드백 | 이슈/제안 링크 |

**이번 Wave 전체 재구현 금지.**  
당분간 운영 표:

```text
ai-ops/curriculum/NODE_PRODUCTION_STATUS.md  (또는 CSV 열 확장)
```

Day1 예시 행:

| node | research | verification | writing | word | practice | sample | animation | quiz | review | outcome | website |
|---|---|---|---|---|---|---|---|---|---|---|---|
| d1-first-success | done | partial | done | done | done | done | interactive | done | pass_notes | defined | connected |

---

## 4. 학생 화면 vs Studio

| 학생 | Studio |
|---|---|
| 공식 문서 기반 · 검증일 · 해석 포함 | 전 열 상세 |
| 수정 제안 링크 | Research Queue · Reviewer |

---

## 5. 구현 Wave (승인 후)

1. CSV/표에 열 추가 + 한글 XLSX  
2. Studio 탭 “학습 과정” 읽기 전용 표  
3. 쓰기 UI는 더 나중  

Atlas 완성도 위젯 **삭제하지 않음**.
