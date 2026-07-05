# P-05 Site Integration — hallucination-and-verification

Date: 2026-07-05  
Executor: Codex  
Source draft: `ai-ops/outputs/02-drafts/hallucination-and-verification/`

## Reflected Files

- `src/content/lessons/markdown/hallucination-and-verification.md`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T08/hallucination-verification.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- Curriculum metadata was added with module `ai-basics` and order 4.
- Order adjustment: none.
- Added glossary terms from `terms.md`: Hallucination, Verification, Claim Audit, Uncertainty Permission, Evaluation Set.
- Existing `Human Review` glossary term was preserved and not duplicated.
- Updated KB consumers for `hallucination-verification`.

## Verification

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`)

