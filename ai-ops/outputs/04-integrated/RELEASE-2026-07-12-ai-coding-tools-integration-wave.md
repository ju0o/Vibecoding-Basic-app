# RELEASE-2026-07-12-ai-coding-tools-integration-wave

## Summary

- Integrated 4 generated AI coding tools lessons into the site content.
- Added 13 glossary terms and 4 SVG diagrams.
- Updated curriculum metadata, BACKLOG, MASTER_PROGRESS, STATE, DASHBOARD, KB consumers, and M5 QA report.
- No deployment was performed.

## Site Content

- `src/content/lessons/markdown/chat-coding-era.md`
- `src/content/lessons/markdown/ide-agent-era.md`
- `src/content/lessons/markdown/codex-claude-cursor-comparison.md`
- `src/content/lessons/markdown/tool-permissions-sandboxes.md`

## Diagrams

- `src/content/lessons/diagrams/chat-coding-era/chat-coding-loop.svg`
- `src/content/lessons/diagrams/ide-agent-era/ide-agent-task-loop.svg`
- `src/content/lessons/diagrams/codex-claude-cursor-comparison/ai-coding-tool-fit.svg`
- `src/content/lessons/diagrams/tool-permissions-sandboxes/permission-sandbox-layers.svg`

## Metadata

- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T11/chat-coding-era.md`
- `ai-ops/knowledge-base/entries/T11/ide-agent-era.md`
- `ai-ops/knowledge-base/entries/T11/ai-coding-tool-comparison.md`
- `ai-ops/knowledge-base/entries/T11/tool-permissions-sandboxes.md`
- `ai-ops/outputs/00-backlog/BACKLOG.md`
- `ai-ops/MASTER_PROGRESS.md`
- `ai-ops/DASHBOARD.md`
- `ai-ops/STATE.md`
- `ai-ops/reports/codex-qa-scan.md`

## Verification

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `node ai-ops/reports/scripts/codex-qa-scan.mjs`
  - Lessons: 77
  - KB entries: 68
  - Diagrams: 55
  - Glossary terms: 384
  - Violations: 0

## Next

- Run P-06 verify for the 4 integrated lessons.
- If verification passes, continue to P-08 release without P-09 deployment.
