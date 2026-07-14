# STATE — 실행 큐 + 상태 기계

## 현황판

| 필드 | 값 |
|---|---|
| Current Batch | **STUDENT JOURNEY REBASELINE** |
| Current State | **Student Journey pack drafted.** Experience > Website/Atlas/Course. Docs only. Operator review. |
| Last Completed Step | STUDENT_JOURNEY + LEARNING_ROADMAP + LEARNING_NODE_SPEC + LEARNING_EXPERIENCE_PRINCIPLES (2026-07-14) |
| Next Executor | 운영자 — Student Journey 문서 승인/수정 |
| Next Prompt File | **roadmap/STUDENT_JOURNEY.md** |
| Blocker | None (docs only) |
| Required Human Action | Approve or revise Student Journey pack; then Excel + content nodes (not site-first) |
| Release Status | 기존 V2/MR/Studio/Foundation/Education First docs 유지 · 미push · 미배포 |

### Direction

| Item | Status |
|---|---|
| Center of design | **Student** (not Website / Atlas / Course) |
| Student Journey SSOT pack | **operator_review_required** |
| Education materials / Living | active (under Journey) |
| Website as Viewer | active · last |
| Atlas Knowledge Layer | **preserve** (no delete) |
| Learning Path as main IA | designed · Journey supersedes as top experience SSOT |
| Education First Master Plan | still valid **under** Student Journey |

### Prior product status (unchanged assets)

| Item | Status |
|---|---|
| Model Routing RC | kept |
| Education Studio | kept · reframe as **education production** board |
| Foundation AI→LLM | kept · feed Journey early stages |
| 21 / 14 freezes | held |
| BUILD-PLAN | HOLD |

## NEXT

```
- Verdict: READY_FOR_STUDENT_JOURNEY_REVIEW
- Read: STUDENT_JOURNEY.md + LEARNING_ROADMAP + LEARNING_NODE_SPEC + LEARNING_EXPERIENCE_PRINCIPLES
- After approve: CURRICULUM_MASTER foundation stages + node content (Website last)
- Stop: no code/UI this batch, no Atlas delete, no push/deploy without order
```

## 이력

| 일시 | 항목 | 전이 |
|---|---|---|
| 2026-07-14 | Student Journey rebaseline | Journey top SSOT candidates |
| 2026-07-14 | Project rebaseline | Education First master plan docs |
| 2026-07-14 | FC-0…FC-12 | Foundation content AI→LLM |
| 2026-07-14 | CO-0…CO-12 | Education Studio |
| 2026-07-14 | EV-0…EV-19 | Atlas V2 RC |
| 2026-07-13 | PW / GO | Model Routing + Grok OS |
