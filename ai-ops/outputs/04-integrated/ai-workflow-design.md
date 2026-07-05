# Site Integration: ai-workflow-design

- date: 2026-07-05
- executor: Codex
- status: integrated
- source: `ai-ops/outputs/02-drafts/ai-workflow-design/`

## Changed Files

- `src/content/lessons/markdown/ai-workflow-design.md`
- `src/content/curriculum.ts`
- `ai-ops/knowledge-base/entries/T10/agent-loop.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- `LESSON_META` was added with `moduleId: ai-system-design` and `order: 5`.
- No glossary term was added because `terms.md` suppresses duplicate existing terms.
- KB consumers were updated for `agent-loop`.
- Order adjustment: none.

## Validation

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`; rerun after command timeout)

