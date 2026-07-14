# Curriculum Master Schema

```yaml
document: CURRICULUM_MASTER_SCHEMA
status: operator_direction_2026-07-14
ssot: CURRICULUM_MASTER.csv
operator_view: exports/curriculum/CURRICULUM_MASTER.xlsx
```

---

## 1. SSOT vs 운영자 뷰

| 파일 | 역할 |
|---|---|
| `CURRICULUM_MASTER.csv` | **SSOT** · 영문 키 · Git diff |
| `CURRICULUM_MASTER.xlsx` | **파생** · **한글 컬럼** · 운영자 검토 |
| 본 스키마 | 키 ↔ 한글 매핑 |

편집: CSV(또는 승인된 프로세스). XLSX만 고치면 덮어쓰인다.

```text
python scripts/atlas/export-curriculum-xlsx.py
```

---

## 2. 컬럼 매핑 (영문 키 → 한글 표시)

| CSV 키 (SSOT) | XLSX 한글 헤더 | 설명 |
|---|---|---|
| course_id | 코스 ID | 코스 식별자 |
| stage_id | 학습 단계 | Journey/Outcome stage |
| lesson_id | 강의 ID | 강의 식별자 |
| order | 순서 | 코스 내 순서 |
| lesson_title | 강의 제목 | 학생용 제목 |
| student_question | 학생 질문 | 구동 질문 (`\|` 구분) |
| why_now | 지금 배우는 이유 | Why now |
| learning_goal | 학습 목표 | 목표 |
| outcomes | 학습 성과 | Outcome ID 목록 |
| practice | 실습 | 실습 MD 경로 |
| interaction | 인터랙션 | interaction spec 경로 |
| assessment | 퀴즈 | 평가 MD 경로 |
| atlas_refs | 참고 자료(Atlas) | Knowledge 링크 |
| tool_refs | 사용 도구 | tools |
| prerequisites | 선수 학습 | 선수 |
| next_lesson | 다음 강의 | 다음 |
| source_status | 출처 상태 | draft/partial/verified |
| content_status | 콘텐츠 상태 | drafting… |
| reviewer_status | 검토 상태 | pass/revise… |

### XLSX 추가 권장 표시 열 (export 시 파생)

| 한글 헤더 | 의미 | 소스 |
|---|---|---|
| 애니메이션 | 애니 설계/구현 상태 | Production 시트 또는 추후 CSV 열 `animation_status` |
| 진행 상태 | 한 줄 요약 | content + reviewer |
| 샘플 프로젝트 | examples 경로 | 추후 `sample_path` 열 |

현재 CSV에 없는 열은 Production Status 시트 또는 노트에 둔다. Living으로 `animation_status`, `sample_path` 추가 가능.

---

## 3. 시트 구성 (한글)

| 시트 | 내용 |
|---|---|
| 커리큘럼 | 위 매핑 행 |
| Day1 학습성과 | O1–O13 |
| 제작 현황 | 학생 콘텐츠·실습·애니·퀴즈·사이트 연결 등 |

---

## 4. 상태 enum

```text
content_status: idea → drafting → reviewing → approved → published_path
source_status: draft | partial | verified
reviewer_status: not_started | pass | revise | block
animation_status (planned): none | storyboard | implementing | interactive_ready
```

---

## 5. Day 1 행

`CURRICULUM_MASTER.csv` 참고.
