# Source / Freshness Audit — A–C

```yaml
date: 2026-07-14
```

## Claim classes used

| Class | Meaning |
|---|---|
| official_verified | Tied to official docs + verification date |
| primary_source | Spec/MDN/WHATWG class |
| educational_interpretation | Teaching model, not industry law |
| product_specific | Named product fact |
| time_sensitive | versions, pricing, free tier |
| blocked | must not assert as fact |

## Domain findings

| Domain | Nodes | Class | Notes |
|---|---|---|---|
| Node.js runtime | A03 | educational + partial official (source pack) | LTS wording present earlier packs |
| npm scripts | A03 | educational + common tool behavior | not inventing CLI flags wildly |
| HTML/CSS/JS | B02–B04 | primary_source *should* link MDN — **often missing inline** | source_gap |
| FE/BE | B06–B07 | educational_interpretation | OK if labeled |
| HTTP/API | B08 | educational + primary HTTP model | add MDN HTTP link |
| Database | B09 | educational; products listed as options | pricing **blocked** (RQ-B3-06) |
| Prompt/Context | C02–C04 | educational_interpretation **must stay labeled** | not ISO |
| Agent/SubAgent/Workflow | C08–C10 | educational_interpretation | risk of overclaim if “standard” |

## Research Queue snapshot

| ID | Status |
|---|---|
| RQ-B3-06 product pricing | blocked |
| Prior A/B node claims | applied |
| RQ-C05 agent product defs | still open for depth |

## Required source actions

1. Add “Sources” section with official/MDN/educational tags on every review_ready MD.  
2. Never present Prompt Engineering / Agent as single industry standard.  
3. Time-sensitive install steps only with `verified_at`.
