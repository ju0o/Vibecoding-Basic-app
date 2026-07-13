# Atlas V2 — Grok Multi-Agent Handoff

| Field | Value |
|---|---|
| Updated | 2026-07-13 (post Product Waves) |
| Branch | master |
| HEAD | see `git log -1` after product commits |
| Current Goal | Interactive Atlas V2; Model Routing subordinate route productized |
| Current Phase | **READY_FOR_RELEASE_REVIEW** (Model Routing slice) |
| Next work | Operator review; optional push; Phase 1 21/14 rebaseline later; content deepen via P-01/P-02 if product facts expand |

---

## Final Goal

비개발자가 Day 1부터 AI Engineering 역사·원리·연결·운영 구조를 이해하는 인터랙티브 플랫폼.

---

## Completed

### Grok OS
GO-0…GO-9 complete (prior commits dcae130…9b8b5eb).

### Product Waves
| Wave | Status |
|---|---|
| PW-0 Reconciliation | PASS — `ATLAS-PRODUCT-WAVE-RECONCILIATION.md` |
| PW-1 Contract integration | PASS — `src/lib/model-routing/contract.ts` |
| PW-2 Learning Route shell | PASS — `/model-routing` + 9 units |
| PW-3 Rule engine + scenarios | PASS — pure `evaluateRouting` + fixtures |
| PW-4 Diagram | PASS — SVG + keyboard list |
| PW-5 Simulator | PASS — client island, no API |
| PW-6 Content | PASS — 14 blocks × 9 units (educational) |
| PW-7 Quiz | PASS |
| PW-8 Graph | PASS — edge table |
| PW-9 Progress | PASS — separate LS key helpers (no lesson migration) |
| PW-10 Nav | PASS — home CTA |
| PW-11 A11y | PASS — aria-live, text table, non-color risk labels |
| PW-12 Source QA | PASS — claimScope educational_pattern; KB links |
| PW-13 Full QA | PASS — lint/typecheck/test/build |
| PW-14 | RC checklist = this handoff + STATE |

---

## URLs (static export)

```text
/model-routing
/model-routing/simulator
/model-routing/lu-task-classification … lu-routing-observability
```

---

## Protected Phase 1 (still uncommitted)

```text
src/app/atlas/**
src/content/atlas/**
src/features/atlas/**   # includes local client-boundary fix (LessonMarkdown/fs)
src/lib/atlas*.ts
src/content/atlas.ts (dirty)
src/components/layout/SiteHeader.tsx (dirty Atlas nav)
ai-ops/ATLAS-P1-PENDING.md
ai-ops/reports/atlas-phase-1-impact-report.md
```

Do **not** mix into product commits.

---

## Tests (last)

| Command | Result |
|---|---|
| biome lint | PASS |
| tsc | PASS |
| vitest (incl. model-routing 6) | PASS |
| next build (static export) | PASS |
| scripts/atlas check-ssot-freezes | PASS |

---

## Resume prompt

```text
Read AGENTS.md, STATE.md, this handoff, ATLAS-LONG-RUNNING-PRODUCT-PLAN.md.
Model Routing product slice is at /model-routing. Phase1 remains uncommitted.
No push unless operator orders. Education freezes intact.
```

---

## Decision

**READY_FOR_RELEASE_REVIEW** for Model Routing Learning Route product slice.  
No push/deploy performed.
