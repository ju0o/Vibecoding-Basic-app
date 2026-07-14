# STATE — 실행 큐 + 상태 기계

## 현황판

| 필드 | 값 |
|---|---|
| Current Batch | **PROJECT REBASELINE — Education First** |
| Current State | **Direction docs drafted.** Product = education materials; site = viewer; Atlas = Knowledge Layer (kept). No large UI work this step. Operator review of Master Plan pack. |
| Last Completed Step | Education Platform Master Plan + Course / Pipeline / Curriculum system docs (2026-07-14) |
| Next Executor | 운영자 — 방향 문서 승인/수정 |
| Next Prompt File | **roadmap/EDUCATION_PLATFORM_MASTER_PLAN.md** |
| Blocker | None (docs only) |
| Required Human Action | Approve or revise Master Plan pack; then Path Excel + first Course content (not site-first) |
| Release Status | 기존 V2/MR/Studio/Foundation 자산 유지 · 미push · 미배포 |

### Direction

| Item | Status |
|---|---|
| Old goal “Atlas site as product” | **superseded in priority** by Education First |
| Education materials as Product | **active direction** |
| Website as Viewer | **active** |
| Atlas Knowledge Layer | **preserve** (no delete) |
| Learning Path as main IA | **designed in docs** · not fully re-implemented in UI yet |
| Master Plan pack | **operator_review_required** |

### Prior product status (unchanged assets)

| Item | Status |
|---|---|
| Model Routing RC | kept |
| Education Studio | kept · reframe as content ops board |
| Foundation AI→LLM chapters | kept · feed future Path |
| 21 / 14 freezes | held |
| BUILD-PLAN | HOLD |

## NEXT

```
- Verdict: READY_FOR_DIRECTION_REVIEW
- Read: EDUCATION_PLATFORM_MASTER_PLAN.md + COURSE_ARCHITECTURE + CONTENT_PIPELINE + CURRICULUM_SYSTEM
- After approve: CURRICULUM_MASTER.xlsx foundation track + content pipeline runs (no website-first)
- Stop: no Atlas delete, no push/deploy without order
```

## 이력

| 일시 | 항목 | 전이 |
|---|---|---|
| 2026-07-14 | Project rebaseline | Education First master plan docs |
| 2026-07-14 | FC-0…FC-12 | Foundation content AI→LLM |
| 2026-07-14 | CO-0…CO-12 | Education Studio |
| 2026-07-14 | EV-0…EV-19 | Atlas V2 RC |
| 2026-07-13 | PW / GO | Model Routing + Grok OS |
