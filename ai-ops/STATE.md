# STATE — 실행 큐 + 상태 기계

## 현황판

| 필드 | 값 |
|---|---|
| Current Batch | **DIRECTION UPDATE — Student Self-Serve + Animation System** |
| Current State | **Operator direction applied.** Instructor optional. Student Word kept. Sample kept. Animation Design System drafted (no React impl yet). Curriculum XLSX Korean headers. Website last. |
| Last Completed Step | Animation Design System + pipeline reframe + Korean curriculum export (2026-07-14) |
| Next Executor | 운영자 — Animation Design System 승인/수정 후 AF-1 또는 Day1 콘텐츠 게이트 |
| Next Prompt File | **roadmap/ANIMATION_DESIGN_SYSTEM.md** |
| Blocker | None |
| Required Human Action | Confirm Animation Design System; then allowlist for AF-1 framework skeleton (or content fixes first) |
| Release Status | 미push · 미배포 · 사이트 미연결 · 애니 미구현 |

### Direction (locked by operator)

| Item | Status |
|---|---|
| Education First | **maintained** |
| Student self-serve (not instructor LMS) | **active** |
| Instructor scripts | **optional only** |
| Student Word in pipeline | **required derivative** |
| Sample projects (example/lab/done) | **required direction** |
| Storyboard only = incomplete | **active** |
| Interactive Animation goal | **active** (design first) |
| Curriculum XLSX Korean | **active** |
| Website last / Viewer | **active** |

## NEXT

```
- Verdict: READY_FOR_ANIMATION_DESIGN_REVIEW
- Read: ANIMATION_DESIGN_SYSTEM.md + CONTENT_PIPELINE.md
- Open: exports/curriculum/CURRICULUM_MASTER.xlsx (한글 컬럼)
- Do not: treat instructor DOCX as required; do not ship text-stepper as animation
- After approve AF design: AF-1 AnimationShell allowlist (separate) OR Day1 content approve
- Stop: no push/deploy
```

## 이력

| 일시 | 항목 | 전이 |
|---|---|---|
| 2026-07-14 | Operator direction | Student-only pipeline + Animation Design System |
| 2026-07-14 | Day 1 operator package | READY_FOR_DAY1_OPERATOR_REVIEW (superseded in process by direction) |
| 2026-07-14 | Outcome / Journey / Education First | prior |
