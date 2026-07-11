# RELEASE-2026-07-12-ai-coding-tools-release-wave

## 판정: 배포 가능

- V2 Wave 29 release complete.
- External deployment remains on HOLD. P-09 was not performed.

## Included Lessons

- `chat-coding-era`
- `ide-agent-era`
- `codex-claude-cursor-comparison`
- `tool-permissions-sandboxes`

## KB Used

- `chat-coding-era`
- `ide-agent-era`
- `ai-coding-tool-comparison`
- `tool-permissions-sandboxes`

## Added Terms

- `Context-aware Response`
- `Chat Session History`
- `Debugging Conversation`
- `Agent Mode`
- `Repository Task Delegation`
- `Cloud Sandbox`
- `Execution Surface`
- `Context Access`
- `Review Workflow`
- `Permission Policy`
- `Approval Prompt`
- `Sandbox Boundary`
- `Settings Hierarchy`

## Added Diagrams

- `src/content/lessons/diagrams/chat-coding-era/chat-coding-loop.svg`
- `src/content/lessons/diagrams/ide-agent-era/ide-agent-task-loop.svg`
- `src/content/lessons/diagrams/codex-claude-cursor-comparison/ai-coding-tool-fit.svg`
- `src/content/lessons/diagrams/tool-permissions-sandboxes/permission-sandbox-layers.svg`

## Verify Result

P-06 report: `ai-ops/outputs/06-build-verification/VERIFIED-2026-07-12-1.md`

| Step | Result |
|---|---|
| lint | PASS |
| typecheck | PASS |
| test | PASS, Vitest 3 files / 8 tests |
| build | PASS, Next.js 138 static pages |

## QA Result

- `node ai-ops/reports/scripts/codex-qa-scan.mjs`: PASS
- Lessons: 77
- KB entries: 68
- Diagrams: 55
- Glossary terms: 384
- Violations: 0

## Notes

- `src/content` changes were committed in `c79024f` (`P-05: integrate AI coding tools lessons`) and verified by `git show --stat`.
- This release commit only fixes the release state and release note after P-06 verification.
