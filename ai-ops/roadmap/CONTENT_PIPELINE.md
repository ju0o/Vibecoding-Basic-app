# Content Pipeline

```yaml
parent: EDUCATION_PLATFORM_MASTER_PLAN.md
authority: content_pipeline_ssot_candidate
status: operator_direction_2026-07-14
website_last: true
audience: student_self_serve
instructor_materials: optional_only
```

---

## 1. 제품 성격

이 사이트는 **강사용 LMS가 아니다.**  
**학생이 직접 학습**하는 플랫폼이다.

| 유지 (필수) | 제거·비필수 |
|---|---|
| 학생용 Markdown | 강사용 대본 **필수 파이프라인** |
| 학생용 Word | 강사 DOCX 자동 생성 (Optional로만) |
| 실습 · 샘플 프로젝트 | — |
| Interactive Animation | Storyboard만으로 “완료” |
| Quiz / Outcome | — |
| Website Viewer (최후) | 사이트 먼저 구현 |

---

## 2. 매체 사슬 (정본)

```text
Research
  → Markdown          # 학생용 원본 SSOT
  → Student Word      # 검토·인쇄·배포용 파생 (유지)
  → Sample Project    # 예제 · 실습 · 완성본
  → Interactive Animation   # Storyboard → React 조작 애니 (필수 목표)
  → Quiz / Outcome Check
  → Website Viewer    # 항상 마지막
```

| 매체 | 역할 | SSOT? |
|---|---|---|
| Curriculum CSV → 한글 XLSX | 운영 맵 | CSV SSOT / XLSX 파생 |
| Markdown | 학생 본문·퀴즈 원문 | **Yes** |
| Student Word | 사람이 읽기 쉬운 학생본 | No (파생) |
| Sample Project | 다운로드 실행 | Yes (examples/) |
| Interaction spec + Storyboard | 애니 설계도 | Yes (설계) |
| React Animation | **실제 조작** | 구현물 (프레임워크+시나리오) |
| Quiz | 이해·수행 점검 | Yes |
| Website | Viewer | 최후 연결 |

**강사용 Word/MD:** `content/instructor/**` 및 export 스크립트는 **Optional**. 신규 강의 필수 산출물에 넣지 않는다.

---

## 3. 강의 완성 정의 (문서만 ≠ 완료)

한 강의가 “완성”이려면:

```text
[ ] Research / 출처
[ ] Markdown 학생 본문
[ ] Student Word 파생 (또는 재생성 가능)
[ ] Sample: 예제 + 실습 + 완성본 (단계적으로 채움)
[ ] Interactive Animation (스토리보드 + 구현 또는 구현 티켓+프레임 재사용)
[ ] Quiz / Outcome Check
[ ] Independent Review
[ ] Website Viewer 연결 (마지막)
```

Storyboard만 있으면 **설계 완료**, 강의 완성 아님.

---

## 4. Sample Project 정책

각 강의(가능한 한) 제공:

| 종류 | 설명 |
|---|---|
| 예제 (example/starter) | 바로 열 수 있는 최소 시작점 |
| 실습 (lab) | 학생이 채울 구멍·체크리스트 |
| 완성본 (reference) | 막혔을 때 대조 (해답 남용 주의) |

경로 관례: `examples/<course-or-lesson-id>/`  
보안: 시크릿·유료 API·DB 기본 금지.

---

## 5. Interactive Animation 정책

상세: [ANIMATION_DESIGN_SYSTEM.md](./ANIMATION_DESIGN_SYSTEM.md)

```text
Storyboard → React primitive 조합 → 학생 조작 → Quiz 연계
```

비인정: 텍스트 Stepper, 버튼=다음 문장만, 화살표 문자 나열.

---

## 6. 제작 Workflow (필수)

```text
학생 질문 / 문제
  → Research
  → Claim Verification
  → Curriculum (Why · Outcome)
  → Markdown Content
  → Student Word export
  → Sample Project
  → Interaction Spec + Storyboard
  → Interactive Animation 구현 (프레임워크 재사용)
  → Quiz / Outcome
  → Independent Review
  → Website Viewer
```

Website Last.  
Implementer는 콘텐츠·애니 시나리오 없이 라우트만 만들지 않는다.

---

## 7. Curriculum Master

- SSOT: `ai-ops/curriculum/CURRICULUM_MASTER.csv` (영문 키 · Git diff)  
- 운영자 뷰: `exports/curriculum/CURRICULUM_MASTER.xlsx` (**한글 컬럼**)  
- 스키마: `CURRICULUM_MASTER_SCHEMA.md`

---

## 8. Optional: 강사 자료

| 항목 | 정책 |
|---|---|
| `content/instructor/**` | 보관 가능 · 신규 필수 아님 |
| `scripts/atlas/export-day1-instructor-docx.mjs` | Optional 유틸 |
| 운영 리뷰 체크리스트 | 강사 DOCX **필수 항목 삭제** |

---

## 9. Studio (교육 제작)

페이지 진행률만이 아니라:

학생 질문 · Research · Markdown · Word · Sample · **Animation 구현 상태** · Quiz · Outcome · Review · Website

---

## 10. 성공 기준

1. 신규 작업이 강사 LMS가 아니라 **학생 자율학습**으로 서술된다.  
2. 애니 완료 기준이 Storyboard를 넘어 **조작 가능 컴포넌트**를 포함한다.  
3. Word는 학생용만 필수 파생이다.  
4. Website는 교육 패키지 뒤에만 연결된다.
