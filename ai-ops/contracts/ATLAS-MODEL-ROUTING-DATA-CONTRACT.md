# Model Routing — MR-1 Data Contract (Controlled Pilot)

| Item | Value |
|---|---|
| status | **pilot_draft** — GO-9 controlled scope |
| parent | `ATLAS-MODEL-ROUTING-FEATURE-SPEC.md` (approved MR-0) |
| modifies_core_21_concepts | false |
| modifies_14_section_contract | false |
| src_integration | **not wired** — types live under `ai-ops/contracts/` only in this pilot |
| phase1_collision | avoided by not editing `src/lib/atlas.ts` / `src/content/atlas/**` |

---

## 1. Phase 1 collision analysis

| Phase 1 path | MR-1 need | Decision |
|---|---|---|
| `src/lib/atlas.ts` | eventual loader | **do not edit** in pilot |
| `src/content/atlas.ts` | nodes | **do not edit** |
| `src/content/atlas/chapters/*` | 12 placeholders | **do not edit** |
| `src/lib/atlas-progress.ts` | separate progress | **do not edit**; future progress nests under LearningState V2 per PRD |
| New contract files under `ai-ops/contracts/**` | types + docs | **allowlist** |

**Rollback boundary:** delete `ai-ops/contracts/ATLAS-MODEL-ROUTING-DATA-CONTRACT.md` and `ai-ops/contracts/model-routing-data-contract.ts` only.

---

## 2. Learning Unit IDs (frozen names)

| order | id | name |
|---:|---|---|
| 1 | `lu-task-classification` | Task Classification |
| 2 | `lu-task-routing` | Task Routing |
| 3 | `lu-executor-routing` | Executor Routing |
| 4 | `lu-model-routing` | Model Routing |
| 5 | `lu-cost-aware-orchestration` | Cost-Aware Orchestration |
| 6 | `lu-independent-review` | Independent Review |
| 7 | `lu-evaluation-retry` | Evaluation & Retry |
| 8 | `lu-human-escalation` | Human Escalation |
| 9 | `lu-routing-observability` | Routing Observability |

Route id: `model-routing`.

---

## 3. Input axes

```ts
difficulty | risk | repetition | judgment | contextScope | reversibility
// each integer 1..5
```

---

## 4. RoutingRule / Scenario / Result

See companion TypeScript module:

`ai-ops/contracts/model-routing-data-contract.ts`

Pure types; not imported by app build in this pilot.

---

## 5. Progress (nested, not separate LS key)

```ts
atlas.learningRoutes?.["model-routing"]?.units[unitId]
```

Fields: `visited`, `read`, `quizBestScore`, `simulatorDone`, `teachBackDone`.

**No migration implemented in pilot.**

---

## 6. Graph edges (logical)

- Unit order: `evolves_to` / why-bridge text
- Units `requires` concepts: `orchestration`, `evaluation`, `harness`
- Units `bounded_by` harness
- Units `deepens` existing lessons via KB consumers

Not written into `relationships.ts` in this pilot.

---

## 7. Allowlist for this pilot

```text
ai-ops/contracts/ATLAS-MODEL-ROUTING-DATA-CONTRACT.md
ai-ops/contracts/model-routing-data-contract.ts
```

## Forbidden

```text
src/**
Simulator UI
KB bodies
BUILD-PLAN
Phase 1 paths
```

---

## 8. Tests for pilot

- `node scripts/atlas/check-model-routing-units.mjs`
- `node scripts/atlas/check-ssot-freezes.mjs`
- Type module parses as TS text (no app import required)

---

## 9. Human Approval triggers (stop)

If next step needs Phase 1 rewrite, progress migration, new libraries, 21/14 change, KB edits, static export structure change, or scope beyond data contract → **HUMAN_APPROVAL_REQUIRED**.
