# P-05 Site Integration — prompt-engineering-foundations

Date: 2026-07-05  
Executor: Codex  
Source draft: `ai-ops/outputs/02-drafts/prompt-engineering-foundations/`

## Reflected Files

- `src/content/lessons/markdown/prompt-engineering-foundations.md`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T08/prompt-engineering.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- Curriculum metadata was added with module `ai-basics` and order 2.
- Order adjustment: none.
- Added glossary terms from `terms.md`: Prompt Contract, Evidence Policy, Output Format Control, XML Prompt Tags, Evidence Missing Behavior.
- Existing `Prompt Engineering` glossary term was preserved and not duplicated.
- Updated KB consumers for `prompt-engineering`.

## Verification

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`)

