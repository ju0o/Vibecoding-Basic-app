# Release Note — V1 Legacy Regeneration (2026-07-11)

## Summary

- V1 legacy 5 lessons regenerated as V2 Deep Dive lessons.
- Added 5 lesson diagrams and inserted markdown image references.
- Updated BACKLOG KB mappings from placeholder IDs to approved KB IDs.
- Removed the V1 legacy exception set from the machine QA scan.
- `node ai-ops/reports/scripts/codex-qa-scan.mjs`: M5 전체 위반 0.
- `npm run verify`: PASS.

## Regenerated Lessons

- `src/content/lessons/markdown/ai-vibe-coding-orientation.md`
- `src/content/lessons/markdown/web-screen-anatomy.md`
- `src/content/lessons/markdown/typescript-react-nextjs.md`
- `src/content/lessons/markdown/git-collaboration-basics.md`
- `src/content/lessons/markdown/api-db-backend-flow.md`

## Added Diagrams

- `src/content/lessons/diagrams/ai-vibe-coding-orientation/vibe-coding-learning-loop.svg`
- `src/content/lessons/diagrams/web-screen-anatomy/web-screen-layer-map.svg`
- `src/content/lessons/diagrams/typescript-react-nextjs/ts-react-next-responsibility-map.svg`
- `src/content/lessons/diagrams/git-collaboration-basics/git-collaboration-flow.svg`
- `src/content/lessons/diagrams/api-db-backend-flow/api-db-roundtrip-flow.svg`

## Quality Gates

- V2 8-section format: PASS
- 8,000+ characters after code stripping: PASS
- Callout limit: PASS
- Highlight token parity: PASS
- Quote Bank exact match: PASS
- Diagram markdown reference: PASS
- Glossary duplicate and related checks: PASS
- Link liveness domain scan: PASS
- `npm run verify`: PASS

## Notes

- `build-and-runtime` BACKLOG status was corrected from stale `kb_needed` placeholder to `v2-released` with the approved `build-and-runtime` KB id, matching the already released lesson and MASTER_PROGRESS history.
- Next work: generate and release `model-selection-tradeoffs`, then continue the remaining `kb_needed` backlog waves.
