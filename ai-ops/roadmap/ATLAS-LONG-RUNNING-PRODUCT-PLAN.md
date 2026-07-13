# Atlas V2 — Long-Running Product Execution Plan

```yaml
parent:
  - ATLAS-EDUCATION-LAYER.md
  - ATLAS-MODEL-ROUTING-FEATURE-SPEC.md
authority: execution_plan
status: active
can_modify_core_concepts: false
can_modify_14_section_contract: false
can_activate_build_plan: false
```

| Item | Value |
|---|---|
| Started | 2026-07-13 |
| Entry HEAD | `9b8b5eb` |
| Product goal | Interactive Atlas so non-developers understand AI engineering history → production operations |
| Primary vehicle (this mandate) | Model Routing subordinate Learning Route + Atlas integration |

This plan does **not** replace Education Layer PRD or Model Routing Feature Spec.

---

## Waves

| Wave | Name | Outcome |
|---|---|---|
| PW-0 | Phase 1 reconciliation | Reuse map + allowlists |
| PW-1 | Contract app integration | App-local types mirror + tests |
| PW-2 | Learning Route shell | 9 units pages + metadata |
| PW-3 | Rule engine + scenarios | Pure function + fixtures + tests |
| PW-4 | Interactive diagram | SVG/CSS steps |
| PW-5 | Task Router Simulator | Client island |
| PW-6 | Learning content | 9 units × 14 learning blocks (batched) |
| PW-7 | Quiz + checkpoints | Per-unit checks |
| PW-8 | Knowledge graph links | LearningUnit edges data + UI list |
| PW-9 | Progress integration | Nested/compatible local routing progress |
| PW-10 | Nav integration | Home + route entry (avoid Phase1 mix) |
| PW-11 | A11y + performance | reduced-motion, keyboard, labels |
| PW-12 | Source / content QA | claimScope + KB links |
| PW-13 | Full product QA | lint/type/test/build |
| PW-14 | Release candidate prep | checklist, no push/deploy |

## Path strategy

```text
NEW (product commits):
  src/app/model-routing/**
  src/content/model-routing/**
  src/lib/model-routing/**
  src/features/model-routing/**

PRESERVE uncommitted Phase 1 (do not stage):
  src/app/atlas/**
  src/content/atlas/**
  src/features/atlas/**
  src/lib/atlas*.ts
  SiteHeader Phase1 dirt (prefer not staging)
```

## Checkpoints

- A: PW-0…PW-2  
- B: PW-3…PW-5  
- C: PW-6…PW-8  
- D: PW-9…PW-11  
- E: PW-12…PW-14 → READY_FOR_RELEASE_REVIEW  

## Status log

Updated by Main after each wave in STATE + HANDOFF.
