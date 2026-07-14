# Learning Content Relationship Contract

```yaml
document: LEARNING-CONTENT-RELATIONSHIP-CONTRACT
status: operator_direction_review
date: 2026-07-14
no_content_duplication: true
```

---

## 1. 관계 모델 (복제 금지 · ID 연결)

```text
Course
└─ Track (A–E)
   └─ Stage
      └─ Learning Node
         ├─ student_questions[]
         ├─ why_now
         ├─ learning_outcomes[]     → OUTCOME ids
         ├─ markdown_path           → 학생 MD SSOT
         ├─ word_export_path        → 파생
         ├─ practice_path
         ├─ sample_project_path     → example | lab | complete
         ├─ interaction_spec_path
         ├─ animation_component_id  → React 시나리오
         ├─ quiz_path / assessment
         ├─ atlas_refs[]            → concept ids
         ├─ tool_refs[]
         ├─ technology_refs[]
         ├─ sources[] + verified_at
         └─ revision_history_ref
```

Course가 본문을 복제하지 않는다. **경로·ID만** 보유.

---

## 2. 객체 정의

| 객체 | 정의 | SSOT 위치 (현재/예정) |
|---|---|---|
| Course | 코스 묶음 | `content/courses/*/course.md` · CSV `course_id` |
| Track | 문제 해결 축 (A–E) | Curriculum Master `track_id` (확장) |
| Stage | 성장 구간 | Journey stage / CSV `stage_id` |
| Learning Node | 한 학습 단위 | lesson_id · LEARNING_NODE_SPEC |
| Outcome | can-do | LEARNING_OUTCOMES · assessment |
| Student Markdown | 학생 원문 | `content/courses/**` |
| Student Word | 파생 | `exports/student/**` |
| Practice | 실습 가이드 | `content/practice/**` |
| Sample Project | 실행 예제 | `examples/**` |
| Interactive Animation | 조작 시뮬 | `src/features/learning-interactions/**` |
| Quiz | 점검 | assessment · 페이지 컴포넌트 |
| Atlas Ref | 심화 개념 | atlas concept id |
| Tool Ref | 제품/도구 | tools slug (예정) |
| Technology Ref | 기술 개념 | tech slug (예정) |
| Source | 공식 근거 | source pack · KB |
| Revision | 변경 이력 | reports/changelog (예정) |

강사 자료: **optional** · 관계 필수 아님.

---

## 3. 역방향 링크 (Atlas · Tool · Tech)

| From | To |
|---|---|
| Atlas Concept | nodes[] · practices[] · tools[] |
| Tool | nodes[] · techs[] · atlas[] |
| Technology | nodes[] · tools[] · atlas[] |
| Lab item | node_id 필수 |

구현: 초기에는 CSV/JSON 맵 · 대규모 Atlas 본문 수정 없이 메타 테이블.

---

## 4. Day 1 인스턴스 (기준)

| 필드 | 값 |
|---|---|
| course_id | vibe-coding-foundation |
| track | A 기초 환경 |
| node | d1-first-success |
| route | `/learn/vibe-coding-foundation/day-1` |
| markdown | `content/courses/.../01-first-success.md` |
| sample | `examples/day1-first-success` |
| animation | `Day1FirstSuccessExperience` |
| quiz | `Day1QuizAndOutcomes` |
| atlas_refs | ai, llm (curiosity) |
| tools | browser, vscode, nodejs, npm, terminal |

---

## 5. 상태 (Node lifecycle)

영문 코드 (자동화) → 한글 (운영 XLSX):

| code | 한국어 |
|---|---|
| idea | 아이디어 |
| researching | 조사 중 |
| source_verified | 출처 검증 완료 |
| curriculum_ready | 커리큘럼 준비 |
| content_draft | 콘텐츠 초안 |
| content_review | 콘텐츠 검토 |
| practice_ready | 실습 완료 |
| interaction_spec | 애니메이션 설계 |
| interaction_ready | 애니메이션 구현 완료 |
| assessment_ready | 평가 준비 |
| website_connected | 사이트 연결 |
| operator_review | 운영자 검토 |
| published_locally | 로컬 공개 |
| needs_update | 업데이트 필요 |

Day1: `website_connected` + `operator_review` (인터랙티브 승인 상태).

---

## 6. 제작 흐름 (필수)

```text
Student Question → Research → Claim Verification → Curriculum Mapping
→ Outcomes → Markdown → Student Word → Practice → Sample
→ Interactive Animation → Quiz → Independent Review
→ Website Viewer → Feedback → Revision
```

Website first 금지. 승인된 Node만 Viewer 연결 (Day1 충족).

---

## 7. Curriculum Master 확장 열 (CSV 키 제안)

기존 열 유지 + 추가 후보:

`track_id`, `animation_status`, `sample_path`, `word_export_path`, `tool_refs` (있음), `technology_refs`, `latest_verification`, `revision_status`, `feedback_status`, `website_status`, `lifecycle_status`

XLSX 한글 헤더 매핑은 export 스크립트에서 처리.
