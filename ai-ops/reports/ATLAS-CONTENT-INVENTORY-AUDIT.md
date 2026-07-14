# CO-0 — Atlas Education Content Inventory Audit

| Field | Value |
|---|---|
| Date | 2026-07-14 |
| HEAD | 3b1f208 |
| Verdict | **CONTINUE** |

## Content locations (repo-relative)

| Type | Path | Used by |
|---|---|---|
| Concept metadata | `src/content/atlas.ts` | Roadmap, passport, links |
| Chapter markdown (14 sec) | `src/content/atlas/chapters/{id}.md` | `/atlas/concepts/[id]` |
| Chapter loader | `src/lib/atlas.ts` | Server/static parse |
| Progress | `src/lib/atlas-progress.ts` + Provider | Concept complete/visit |
| Timeline | `src/content/atlas/timeline.ts` | `/atlas/timeline` |
| Graph (MR edges) | `src/content/model-routing/graph.ts` | `/atlas/graph`, MR |
| Model Routing units | `src/content/model-routing/units.ts` | `/model-routing/*` |
| MR rules/scenarios/quizzes | `src/content/model-routing/*` | Simulator, quizzes |
| Textbook | `src/content/lessons/**`, curriculum | `/lessons/[slug]` |
| Wiki | `src/content/glossary.ts` | `/glossary` |
| KB | `ai-ops/knowledge-base/entries/**` | Evidence (ids on concepts) |
| Completeness report | `ai-ops/reports/ATLAS-CONTENT-COMPLETENESS.md` | Ops (static report) |
| Source freshness | `ai-ops/reports/ATLAS-SOURCE-FRESHNESS.md` | Ops |

## 14-section status encoding (current)

- Parser: `parseAtlasChapterMarkdown` in `src/lib/atlas.ts`
- `empty: true` if no body **or** body contains `<!-- partial -->`
- Sections 1–4 currently shell complete; 5–14 partial marker

## Student routes

```text
/atlas
/atlas/concepts/[id]
/atlas/graph
/atlas/timeline
/model-routing
/model-routing/simulator
/curriculum, /lessons/[slug], /glossary
```

## Gap for operators

No single UI lists complete/partial/missing per concept with paths and next work.
Studio will fix visibility without moving SSOT.

## Decision

**CONTINUE → CO-1**
