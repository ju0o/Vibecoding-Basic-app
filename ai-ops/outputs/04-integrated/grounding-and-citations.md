# P-05 Site Integration — grounding-and-citations

Date: 2026-07-05  
Executor: Codex  
Source draft: `ai-ops/outputs/02-drafts/grounding-and-citations/`

## Reflected Files

- `src/content/lessons/markdown/grounding-and-citations.md`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T08/grounding-citations.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- Curriculum metadata was added with module `ai-basics` and order 3.
- Order adjustment: none.
- Added glossary terms from `terms.md`: Grounding, Citation, Citable Unit, Stable Source ID, Source Locator.
- Updated KB consumers for `grounding-citations`.

## Verification

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`)

