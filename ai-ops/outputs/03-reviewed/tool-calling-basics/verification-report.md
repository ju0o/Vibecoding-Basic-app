# Lesson QA Verification Report: tool-calling-basics

- Executor: Codex
- Scope: P-05 Lesson QA only
- Checked: 2026-07-05
- Overall verdict: APPROVED
- Overall score: 95
- P-06 readiness: YES

## Input Files

| File | Verdict | Score | Notes |
|---|---:|---:|---|
| lesson.md | APPROVED | 93 | 13-section template matched. Claims align with approved `tool-calling` KB. |
| meta.md | APPROVED | 100 | slug/moduleId/order/title/summary/level/minutes/tags/checklist match BACKLOG row. |
| quiz.md | APPROVED | 96 | 3 options, answer string exactly matches one option. Explanation addresses both distractors. |
| terms.md | APPROVED | 95 | `Tool Calling` is not currently in `src/content/glossary.ts`; term draft is appropriate and non-duplicative. |

## Template And Metadata

| Check | Result | Evidence |
|---|---:|---|
| Lesson 13 sections | PASS | All schema headings present. |
| Local frontmatter policy | PASS | Draft format uses separate `meta.md`; no YAML frontmatter required by current P-04 artifact format. |
| Lesson length | PASS | 4,159 characters, within 4,000-5,500 guide. |
| References | PASS | 5 source links, all from KB official source list. |
| Slug duplicate | PASS | No existing `src/content` slug found. |

## KB Alignment

- KB used: `tool-calling` (approved, score 88)
- KB external facts: 0 blocking findings.
- Creative additions: restaurant-order analogy and weather/internal-data examples are consistent with KB examples about weather, database queries, external APIs, and execution responsibility.

## Terms Review

- `Tool Calling` glossary draft quality: APPROVED.
- P-05 site integration handling: YES, this term should be added to `src/content/glossary.ts` from `tool-calling-basics/terms.md` in the later site-integration step.
- It should not be duplicated by `mcp-architecture-basics`.

## Education Review

- Flow: strong separation between model-generated call request and application execution.
- Quiz quality: distractors match KB misconceptions, especially "model directly executes tools".
- Slide generation: possible. Concept can be split into definition, order analogy, execution boundary, schema fields, safety boundary.

## Revision Requests

- Blocking: none.
- Non-blocking: P-05 site integration must add the `Tool Calling` glossary term once, using this terms file as the source.

