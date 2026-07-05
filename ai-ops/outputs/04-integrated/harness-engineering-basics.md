# P-05 Site Integration — harness-engineering-basics

Date: 2026-07-05  
Executor: Codex  
Source draft: `ai-ops/outputs/02-drafts/harness-engineering-basics/`

## Reflected Files

- `src/content/lessons/markdown/harness-engineering-basics.md`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T10/harness.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- Curriculum metadata was added with site order 15.
- Order adjustment: draft `meta.md` order 14 shifted to site order 15 to preserve the existing M10 sequence.
- Added glossary terms from `terms.md`: Sandbox, Guardrails, Human Review, Trace, Evaluation Harness.
- `Harness Engineering` already existed in the glossary and was not duplicated.
- Updated KB consumers for `harness`.

## Verification

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`)

