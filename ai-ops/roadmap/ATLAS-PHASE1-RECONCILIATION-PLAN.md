# EV-2 — Phase 1 Reconciliation Plan

```yaml
parent:
  - ATLAS-EDUCATION-LAYER.md
authority: execution_plan
modifies_core_21_concepts: false
modifies_14_section_contract: false
status: active
```

## Reuse map

| Asset | Action |
|---|---|
| Journey / Chapter shell UI | Keep structure; feed 21 concepts |
| Loader parse markdown by `##` titles | Keep; titles = 14 PRD sections |
| Model Routing product | External subordinate route; link from Orchestration |
| Lessons / glossary / KB | Depth / Index / Evidence links only |

## Delete candidates

None this wave. No human deletion approval needed.

## Allowlist (EV-3…EV-10 commits)

```text
src/content/atlas.ts
src/content/atlas/chapters/**
src/lib/atlas.ts
src/lib/atlas-progress.ts
src/lib/atlas.test.ts
src/app/atlas/**
src/features/atlas/**
src/components/layout/SiteHeader.tsx
src/app/page.tsx
src/lib/progress.ts (optional nested only if migration-free)
ai-ops/reports/ATLAS-*.md
ai-ops/STATE.md
ai-ops/reports/ATLAS-GROK-HANDOFF.md
scripts/atlas/**
```

## Protect

```text
src/content/lessons/**
src/content/glossary.ts
ai-ops/knowledge-base/entries/**
ATLAS-BUILD-PLAN HOLD
model-routing product paths (no rewrite)
```

## Runtime boundary

- Server-only: `src/lib/atlas.ts` fs chapter load
- Client: ChapterShell uses ReactMarkdown only
- Static export: generateStaticParams for 21 concepts

## Rollback

Revert atlas rebaseline commits; Model Routing commits remain.

## Decision

**CONTINUE → EV-3**
