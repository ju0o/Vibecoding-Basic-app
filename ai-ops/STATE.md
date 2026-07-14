# STATE — 실행 큐 + 상태 기계

## 현황판

| 필드 | 값 |
|---|---|
| Current Batch | **EDUCATION PM MODE** |
| Current State | **PM mode active.** Top10 questions + A/B/C curriculum pick gate. No new lesson content until PICK. Platform T1–T6 already live. |
| Last Completed Step | Student Top10 · flow groups · ABC candidates · Research Queue · Studio board design (2026-07-14) |
| Next Executor | **운영자** — `PICK: A` \| `B` \| `C` (or REVISE_QUESTIONS) |
| Next Prompt File | **reports/CURRICULUM_CANDIDATES_POST_DAY1_ABC.md** |
| Blocker | Waiting operator curriculum pick |
| Required Human Action | Choose next Learning Node candidate only |
| Release Status | 미push · 미배포 |

### Mode

| Item | Status |
|---|---|
| Education PM Mode | **active** |
| Website last | enforced |
| New lesson without pick | **forbidden** |
| Research Queue | `ai-ops/research-queue/RESEARCH_QUEUE.md` |
| Studio production board | design + interim table |

## NEXT

```
- Verdict: WAITING_OPERATOR_CURRICULUM_PICK
- Read: STUDENT_QUESTIONS_TOP10_POST_DAY1.md + CURRICULUM_CANDIDATES_POST_DAY1_ABC.md
- Reply: PICK: A | PICK: B | PICK: C
- After pick: Research→…→Website pipeline for that node only
- Do not: invent Day2 pages before pick
```

## 이력

| 일시 | 항목 | 전이 |
|---|---|---|
| 2026-07-14 | Education PM mode | WAITING_OPERATOR_CURRICULUM_PICK |
| 2026-07-14 | T1–T6 platform | READY_FOR_LEARNING_PLATFORM_LOCAL_REVIEW |
