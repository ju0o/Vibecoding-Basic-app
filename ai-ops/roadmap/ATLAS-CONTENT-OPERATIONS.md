# Atlas Content Operations Plan

```yaml
parent:
  - ATLAS-EDUCATION-LAYER.md
authority: content_operations_plan
modifies_core_21_concepts: false
modifies_14_section_contract: false
status: active
```

## 1. Storage locations

| Type | SSOT path |
|---|---|
| Concept metadata | `src/content/atlas.ts` |
| Chapter body | `src/content/atlas/chapters/{conceptId}.md` |
| Timeline | `src/content/atlas/timeline.ts` |
| Model Routing | `src/content/model-routing/**` |
| Textbook | `src/content/lessons/**` + curriculum |
| Wiki | `src/content/glossary.ts` |
| KB evidence | `ai-ops/knowledge-base/entries/**` |
| Studio manifest (index only) | `src/lib/atlas/content-manifest.ts` (derived) |

## 2–4. Layer roles

- **Atlas** = learning path (21 concepts)
- **Chapter MD** = student-facing section bodies
- **Textbook** = depth (`lessonSlugs`)
- **Wiki** = lookup (`glossaryTerms`)
- **KB** = evidence (`kbIds`) — do not copy bodies into Studio

## 5–9. Status, assets, sources

Section status: `complete | partial | missing | blocked_by_source | needs_review`  
Overall concept status derived by completeness rules.  
Quiz: concept checkpoint UI + MR unit quizzes.  
Interactive: StepPlayer framework + MR simulator/diagram.  
Graph/Timeline: static modules above.  
Sources: KB ids + claimScope in reports; no client FS.

## 10–12. Completeness & workflow

Weights (explicit constants in code):

```text
sections 40% | passport 10% | whyBridge 10% | quiz 10%
sources 10% | interactive 10% | wikiKb 10%
```

Workflow stages (inferred, labeled as inferred):  
`not_started → researching → source_verified → drafting → reviewing → published_locally`

## 13–16. Agents & preview

Researcher → Claim verify → Curriculum → Content → Interaction → QA → Student page.  
Operator preview: `/atlas/studio` + student links.  
Dev: `npm run dev` then Studio URLs.

## 17–20. Rules

No duplicated SSOT bodies; edit chapters/metadata in place; QA via verify + atlas scripts; future CMS optional — Studio is read-only ops UI first.
