# Site Integration: mcp-architecture-basics

- date: 2026-07-05
- executor: Codex
- status: integrated
- source: `ai-ops/outputs/02-drafts/mcp-architecture-basics/`
- review: `ai-ops/outputs/03-reviewed/mcp-architecture-basics/verification-report.md` (APPROVED)

## Changed Files

- `src/content/lessons/markdown/mcp-architecture-basics.md`
- `src/content/curriculum.ts`
- `ai-ops/knowledge-base/entries/T09/mcp.md`
- `ai-ops/knowledge-base/entries/T09/tool-calling.md`

## Integration Notes

- `lesson.md` was copied to the site markdown directory without content edits.
- SHA-256 source/target match was confirmed after copy.
- `LESSON_META` was added with `moduleId: ai-system-design` and `order: 9`.
- No glossary term was added because `terms.md` suppresses duplicate existing terms and delegates `Tool Calling` to `tool-calling-basics`.
- KB consumers were updated for `mcp`; `tool-calling` also lists this lesson because the approved draft uses it for the MCP vs Tool Calling distinction.
- Order adjustment: none.

## Validation

- `npm run lint`: PASS (`biome check .`)
- `npm run typecheck`: PASS (`tsc --noEmit`)
- `npm run verify`: PASS (`lint`, `typecheck`, `test`, `build`)

