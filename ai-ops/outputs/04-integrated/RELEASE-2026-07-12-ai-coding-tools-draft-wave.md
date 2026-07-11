# RELEASE-2026-07-12-ai-coding-tools-draft-wave

## Summary

- Generated 4 V2 lesson drafts for the AI coding tools module.
- Converted BACKLOG rows 58-61 from `planned` to `generated`.
- Left `human-ai-collaboration-patterns` as `planned` for the next P-04 wave.
- No `src/content` integration or deployment was performed in this commit.

## Generated Drafts

- `ai-ops/outputs/02-drafts/chat-coding-era/lesson.md`
- `ai-ops/outputs/02-drafts/chat-coding-era/meta.md`
- `ai-ops/outputs/02-drafts/chat-coding-era/terms.md`
- `ai-ops/outputs/02-drafts/ide-agent-era/lesson.md`
- `ai-ops/outputs/02-drafts/ide-agent-era/meta.md`
- `ai-ops/outputs/02-drafts/ide-agent-era/terms.md`
- `ai-ops/outputs/02-drafts/codex-claude-cursor-comparison/lesson.md`
- `ai-ops/outputs/02-drafts/codex-claude-cursor-comparison/meta.md`
- `ai-ops/outputs/02-drafts/codex-claude-cursor-comparison/terms.md`
- `ai-ops/outputs/02-drafts/tool-permissions-sandboxes/lesson.md`
- `ai-ops/outputs/02-drafts/tool-permissions-sandboxes/meta.md`
- `ai-ops/outputs/02-drafts/tool-permissions-sandboxes/terms.md`

## KB Used

- `ai-ops/knowledge-base/entries/T11/chat-coding-era.md`
- `ai-ops/knowledge-base/entries/T11/ide-agent-era.md`
- `ai-ops/knowledge-base/entries/T11/ai-coding-tool-comparison.md`
- `ai-ops/knowledge-base/entries/T11/tool-permissions-sandboxes.md`

## Self QA

| slug | chars | sections | Quote Bank quotes | quote match | callouts |
|---|---:|---|---:|---|---:|
| chat-coding-era | 11388 | PASS | 5 | PASS | 0 |
| ide-agent-era | 10027 | PASS | 5 | PASS | 0 |
| codex-claude-cursor-comparison | 10196 | PASS | 5 | PASS | 0 |
| tool-permissions-sandboxes | 10290 | PASS | 5 | PASS | 0 |

## Next

- Run P-05 as a single integration step for the 4 generated lessons.
- Required P-05 additions:
  - hash-checked markdown copy to `src/content/lessons/markdown`
  - curriculum metadata registration
  - glossary term merge without duplicates
  - SVG diagrams under `src/content/lessons/diagrams/{slug}/`
  - markdown `![...]` references for every diagram
  - M5 QA scan and `npm run verify`
