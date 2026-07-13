# PW-0 — Repository & Phase 1 Reconciliation

| Field | Value |
|---|---|
| Date | 2026-07-13 |
| HEAD | 9b8b5eb |
| Decision | **CONTINUE** — no mass discard required |

---

## 1. Phase 1 inventory (remeasured)

### Tracked modified
| Path | Purpose | Verdict |
|---|---|---|
| `src/components/layout/SiteHeader.tsx` | Adds Atlas nav entry | **preserve**; product nav uses home CTA to avoid staging this dirty file if possible |
| `src/content/atlas.ts` | 12-node legacy Atlas data (13-section contract) | **preserve** as legacy draft; not 21-concept SSOT |

### Untracked
| Path | Purpose | Verdict |
|---|---|---|
| `src/app/atlas/**` | Journey + [nodeId] shell | **reuse later** for 21-concept Atlas; **do not stage in MR product commits** |
| `src/content/atlas/chapters/*` | 12 placeholder chapters | **preserve**; skeleton only |
| `src/features/atlas/**` | JourneyMap, ChapterShell, separate progress | **reuse ideas**; separate LS key conflicts with PRD — do not promote as-is |
| `src/lib/atlas.ts` | Chapter loader for 13 sections | **reuse patterns** after 21/14 rebaseline |
| `src/lib/atlas-progress.ts` | Separate atlas progress | **do not adopt as global progress** |
| `src/lib/atlas.test.ts` | 12/13 integrity tests | **preserve**; rewrite later for 21/14 |
| `ai-ops/ATLAS-P1-PENDING.md` | Legacy pending note | **preserve** |
| `ai-ops/reports/atlas-phase-1-impact-report.md` | Impact analysis | **preserve SSOT for reuse** |

---

## 2. vs impact report

Impact report still accurate: 12≠21, 13≠14, separate progress conflicts with LearningState V2. No mass rewrite this wave.

---

## 3. MR-1 contract collision

| Asset | Collision? | Plan |
|---|---|---|
| `ai-ops/contracts/model-routing-data-contract.ts` | No app import | Mirror into `src/lib/model-routing/contract.ts` |
| Phase 1 atlas paths | High if we write under `src/app/atlas` | Use **`src/app/model-routing/**`** instead |

---

## 4. Wave allowlists (product)

```text
ai-ops/roadmap/ATLAS-LONG-RUNNING-PRODUCT-PLAN.md
ai-ops/reports/ATLAS-PRODUCT-WAVE-RECONCILIATION.md
ai-ops/reports/ATLAS-GROK-HANDOFF.md
ai-ops/STATE.md
src/lib/model-routing/**
src/content/model-routing/**
src/features/model-routing/**
src/app/model-routing/**
src/app/page.tsx                    # entry CTA only
scripts/atlas/**                    # optional extra checks
```

### Forbidden for product waves
```text
src/app/atlas/**
src/content/atlas/**
src/features/atlas/**
src/lib/atlas.ts
src/lib/atlas-progress.ts
src/lib/atlas.test.ts
ai-ops/knowledge-base/entries/**
ATLAS-BUILD-PLAN activation
```

---

## 5. Reuse vs rebuild

| Capability | Reuse |
|---|---|
| Static export Next config | yes |
| Design tokens / UI components | yes (Badge, PrimaryLink) |
| Vitest + biome | yes |
| Phase 1 JourneyMap | later, not this product wave |
| Model Routing OS contracts | yes |

---

## Decision

**CONTINUE → PW-1**  
No HUMAN_APPROVAL_REQUIRED (no mass discard).
