# Curriculum Milestone Report — Track A–C

```yaml
date: 2026-07-14
decision: READY_FOR_CURRICULUM_MILESTONE_REVIEW
track_d: PAUSE
push: false
deploy: false
```

## Totals

| Metric | Value |
|---:|---:|
| Total nodes A01–C10 | 25 |
| Near-complete strong packages | 3 (A01–A03) |
| Remediated depth this gate (MD) | B01–B04, C05–C10 (+ pages B01–B04, agent focus) |
| Fully meeting all 19 contract fields at complete | **0** |
| Website routes live | 25 |
| Student Word standalone | 3 (A01–A03) |

## Student Word policy recommendation

| Policy | Detail |
|---|---|
| Markdown | 필수 SSOT |
| Website | 필수 viewer |
| Word | 다운로드 가치 있을 때만 |
| A01–A03 | standalone_download_worthy (기존 유지, 삭제 금지) |
| A04–A06 | merge Track A workbook (미생성 OK) |
| B track | merge 웹 원리 워크북 |
| C track | merge AI 협업 워크북 |
| Mass thin DOCX | **금지** |

## Practice audit

| Band | Status |
|---|---|
| A01–A03 | executable guided practice files |
| B01–B04 | guided pack `07-10-web-layers-practice.md` after remediation |
| B05–B09 | partial page lists + some stubs — still needs per-node full template |
| C01–C04 | page lists — partial |
| C05–C10 | pack `20-25-track-c-practice.md` after remediation |

## Interactive audit

- A01–A03, A04–A06, B05, B08–B09, C01–C02, C05–C07: interactive_learning  
- B01–B04: shared primitive + **node focus** after fix  
- C08–C10: shared shell + **lockMode/scenario** after fix  
- residual: some still shallow vs A01 multi-scene  

## Quiz / Outcome

- NodeCheckpoint added for B01–B04 (node-specific, reasons, teach-back, outcome levels)  
- A01–A03 React quizzes remain best  
- C05–C10 / B05–B09 still partial page-level or missing full checkpoint widgets  
- Batch-only assessment not used as sole completion  

## Source audit

- Educational labels strengthened on Agent/Prompt/Context  
- Product pricing blocked  
- Inline official URLs still sparse — notes not full official_verified everywhere  

## Track IR

- A / B / C: **approve_with_notes**  
- Not full approve of contract completeness  

## Browser review

| Method | Result |
|---|---|
| Playwright new install | **not done** — avoid heavy dep; Human Gate if required |
| Route inventory | 25 foundation routes present on disk |
| Static inspection | page modules import interactives; smoke via typecheck |
| Manual browser | not automated this session — residual risk |

Key URLs (static present): `/start`, `/learn`, day-1, project-file-structure, node-npm, html-basics, javascript-basics, api, database, good-ai-task-request, context-engineering, fix-loop, ai-agent, workflow, `/lab`, `/verification`

## Full QA (commands)

Recorded in session after this report generation.

## Production gate change

Added `ai-ops/contracts/NODE_QUALITY_GATE.md` and linked from Continuous mode doc.  
Website complete / board COMPLETE cannot use batch-speed relaxation.

## Track D resume?

```text
NO — PAUSE_TRACK_D remains
Decision: READY_FOR_CURRICULUM_MILESTONE_REVIEW
```

Operator may:

1. Accept residual partials → force `CONTINUE_TRACK_D`  
2. Request more remediation (practice widgets for all C, full Word workbooks)  
3. Approve milestone as-is for content depth only  

## Commits (this milestone wave)

See git log after commit.

## Push/deploy

**Not executed.**
