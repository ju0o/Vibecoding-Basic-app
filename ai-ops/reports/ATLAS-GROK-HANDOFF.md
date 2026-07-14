# Handoff — Day 1 Operator Review Package (2026-07-14)

| Field | Value |
|---|---|
| Verdict | **READY_FOR_DAY1_OPERATOR_REVIEW** |
| Site | not wired |
| Push/deploy | not run |

## Open these (operator)

1. `exports/curriculum/CURRICULUM_MASTER.xlsx`
2. `exports/student/DAY1-처음으로-AI와-프로그램-실행하기.docx`
3. `exports/instructor/DAY1-강사용-대본.docx`
4. `examples/day1-first-success/` + README
5. `exports/review/DAY1-INTERACTION-STORYBOARD.md`
6. `exports/review/DAY1-OPERATOR-REVIEW-PACKAGE.md` (§I–J)

## SSOT vs derivative

- SSOT: `content/**`, `ai-ops/curriculum/*.csv|md`, practice/assessment/interaction MD  
- Derivative: `exports/**` (regenerate via `scripts/atlas/export-day1-*`)

## After operator decision

- APPROVE_* → optional minor MD fixes → then Website/animation phase (separate gate)  
- REVISE_* → edit SSOT MD/CSV only, re-run export scripts  

## Resume

```text
Day1 operator package ready. Review exports not code. Website last. No push.
```
