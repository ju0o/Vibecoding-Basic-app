# P-05 Integration Record — ai-chatbot-project

- date: 2026-07-12
- executor: Codex
- status: integrated

## Source Draft

- `ai-ops/outputs/02-drafts/ai-chatbot-project/lesson.md`
- `ai-ops/outputs/02-drafts/ai-chatbot-project/meta.md`
- `ai-ops/outputs/02-drafts/ai-chatbot-project/terms.md`
- pre-diagram copy hash match: `82A1D7649189DD5B2C80197BE1BCCBA74CE818D0FB69AE3D614ACFB83696240C`

## Site Files

- `src/content/lessons/markdown/ai-chatbot-project.md`
- `src/content/lessons/diagrams/ai-chatbot-project/chatbot-system-loop.svg`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T12/ai-chatbot-project.md`

## Integration Notes

- order adjustment: none (`project-textbook` order 3 신규 추가)
- diagram reference inserted into site markdown
- glossary terms added: Conversation State Window, Chatbot Tool Boundary, Retrieval Answer Loop
- KB consumers updated

## Validation

- `npm run lint`: PASS
- `npm run typecheck`: PASS
