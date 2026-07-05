# Site Integration: system-prompts-and-instruction-layers

- date: 2026-07-05
- executor: Codex
- status: integrated
- source: `ai-ops/outputs/02-drafts/system-prompts-and-instruction-layers/`

## Changed Files

- `src/content/lessons/markdown/system-prompts-and-instruction-layers.md`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T10/context-engineering.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- `LESSON_META` was added with `moduleId: ai-system-design` and `order: 4`.
- `System Prompt` was added to `GLOSSARY_TERMS` from `terms.md`.
- KB consumers were updated for `context-engineering`.
- Order adjustment: none.

## Validation

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`; rerun after command timeout)

