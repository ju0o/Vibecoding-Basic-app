# Site Integration: tool-calling-basics

- date: 2026-07-05
- executor: Codex
- status: integrated
- source: `ai-ops/outputs/02-drafts/tool-calling-basics/`
- review: `ai-ops/outputs/03-reviewed/tool-calling-basics/verification-report.md` (APPROVED)

## Changed Files

- `src/content/lessons/markdown/tool-calling-basics.md`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T09/tool-calling.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- `LESSON_META` was added with `moduleId: ai-system-design` and `order: 7`.
- `Tool Calling` was added to `GLOSSARY_TERMS` from `terms.md`.
- KB consumers were updated for `tool-calling`.
- Order adjustment: none.

## Validation

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`)
- `npm run verify`: PASS (`lint`, `typecheck`, `test`, `build`)

