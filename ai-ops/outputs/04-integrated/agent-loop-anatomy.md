# Site Integration: agent-loop-anatomy

- date: 2026-07-05
- executor: Codex
- status: integrated
- source: `ai-ops/outputs/02-drafts/agent-loop-anatomy/`

## Changed Files

- `src/content/lessons/markdown/agent-loop-anatomy.md`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T10/agent-loop.md`
- `ai-ops/knowledge-base/entries/T09/tool-calling.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- `LESSON_META` was added with `moduleId: ai-system-design` and `order: 11`.
- `Agent Loop` was added to `GLOSSARY_TERMS` from `terms.md`.
- KB consumers were updated for `agent-loop`; `tool-calling` also lists this lesson because the generated draft uses it for the Tool Calling vs Agent Loop distinction.
- Order adjustment: none.

## Validation

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`; rerun after command timeout)

