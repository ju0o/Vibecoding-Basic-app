# ATLAS PW-14 — Model Routing Release Candidate Report

| Field | Value |
|---|---|
| Date | 2026-07-13 |
| HEAD (product) | `4ff3de4` (`ATLAS-PW: ship Model Routing learning route product slice`) |
| Verdict | **READY_FOR_RELEASE_REVIEW** |
| Push | **not performed** |
| Deploy | **not performed** |

---

## 1. Scope delivered

Subordinate **Model Routing Learning Route** (not a 22nd core concept):

| Surface | Path |
|---|---|
| Route home | `/model-routing` |
| Simulator | `/model-routing/simulator` |
| 9 Learning Units | `/model-routing/lu-*` |
| Pure engine | `src/lib/model-routing/engine.ts` |
| App contract | `src/lib/model-routing/contract.ts` |
| Rules / scenarios / content / quizzes / graph | `src/content/model-routing/**` |
| UI islands | `src/features/model-routing/**` |

Waves PW-0 … PW-13 completed prior to this RC report. Execution plan: `ai-ops/roadmap/ATLAS-LONG-RUNNING-PRODUCT-PLAN.md`.

---

## 2. Freezes preserved

| Freeze | Status |
|---|---|
| 21 core concepts | PASS (`scripts/atlas/check-ssot-freezes.mjs`) |
| 14-section chapter contract | PASS |
| ATLAS-BUILD-PLAN HOLD | PASS |
| Feature Spec `modifies_core_21_concepts: false` | PASS |
| 9 Learning Unit names in Feature Spec | PASS (`check-model-routing-units.mjs`) |
| Approved KB bodies | not rewritten |

---

## 3. QA command table + evidence log paths

Evidence directory (implementer scratch):

```text
C:\Users\user\AppData\Local\Temp\grok-goal-c98eac28f42d\implementer
```

| # | Gate | Command | Result | Log / artifact |
|---:|---|---|---|---|
| 1 | Phase 1 still dirty/untracked; not in product commit | `git status` + `git show 4ff3de4 --name-only` | PASS | `{SCRATCH}/git-status.txt`, `{SCRATCH}/product-commit-files.txt` |
| 1b | Protect paths not staged | `node scripts/atlas/check-protected-paths.mjs --staged` | PASS | `{SCRATCH}/protected-paths-staged.json` |
| 2a | SSOT freezes | `node scripts/atlas/check-ssot-freezes.mjs` | PASS ok:true | `{SCRATCH}/ssot-freezes.json` |
| 2b | Nine unit names | `node scripts/atlas/check-model-routing-units.mjs` | PASS ok:true | `{SCRATCH}/routing-units.json` |
| 3 | Routing unit tests (real `evaluateRouting` + scenarios) | `npm run test -- src/lib/model-routing/engine.test.ts` | PASS 6/6 | `{SCRATCH}/routing-tests.log` |
| 4 | Full product QA | `npm run verify` (lint + typecheck + test + build/static export) | PASS | `{SCRATCH}/verify.log` |
| 5 | Interaction constraints | package deps + disclaimer + no API | PASS | `{SCRATCH}/interaction-constraints.txt` |
| 6 | Headless browser | Playwright unavailable | SKIP | `{SCRATCH}/browser-skip.txt` |

---

## 4. Completed features

- Deterministic rule engine (no external AI/API)
- Educational Cheap/Standard/Frontier disclaimer
- Six-axis + preset scenario Simulator (client island)
- SVG + keyboard-accessible routing diagram + text table
- 9 units with learning sections, quizzes, checkpoints, Why Bridges
- Graph edges as LearningUnit table (no heavy graph library)
- Progress helpers with separate localStorage key (no lesson progress migration)
- Home page entry CTA to `/model-routing`

---

## 5. Incomplete / out of scope (not blockers for this RC)

- Full 21-concept Atlas chapter rebaseline (Phase 1 still uncommitted skeleton)
- Push / Firebase deploy
- Nesting routing progress into existing `LearningState` provider (intentionally separate key)
- Deeper product-documented claims beyond educational_pattern (would need P-01/P-02)

---

## 6. Protected assets (still uncommitted)

```text
M  src/components/layout/SiteHeader.tsx
M  src/content/atlas.ts
?? src/app/atlas/**
?? src/content/atlas/**
?? src/features/atlas/**
?? src/lib/atlas.ts
?? src/lib/atlas-progress.ts
?? src/lib/atlas.test.ts
?? ai-ops/ATLAS-P1-PENDING.md
?? ai-ops/reports/atlas-phase-1-impact-report.md
```

Local-only client-boundary fix may exist under `src/features/atlas/ChapterShell.tsx` to keep dirty Phase 1 from breaking build; **not** mixed into product commit `4ff3de4`.

---

## 7. Known risks

1. Phase 1 dual Atlas implementation remains in working tree until a dedicated rebaseline wave.
2. Educational content is pattern-level; do not treat Cheap/Standard/Frontier as vendor tiers.
3. No remote publish until operator orders push/deploy.

---

## 8. Operator decisions remaining

| Decision | Required for |
|---|---|
| Approve push | Remote backup / CI |
| Approve deploy | Public release |
| Phase 1 → 21/14 rebaseline | Full Atlas journey UI |

---

## 9. Final verdict

```text
READY_FOR_RELEASE_REVIEW
```

Push and deploy were **not** executed per mandate Human Gates.
