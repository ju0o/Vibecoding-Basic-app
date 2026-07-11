# P-05 Integration Record — code-change-risk-analysis

- date: 2026-07-12
- executor: Codex
- status: integrated

## Source Draft

- `ai-ops/outputs/02-drafts/code-change-risk-analysis/lesson.md`
- `ai-ops/outputs/02-drafts/code-change-risk-analysis/meta.md`
- `ai-ops/outputs/02-drafts/code-change-risk-analysis/terms.md`
- pre-diagram copy hash match: `E0C1A3BD8DDE76C4D9647392B25FCE4574FB9C79AA31C4969CED78344FDAA2CA`

## Site Files

- `src/content/lessons/markdown/code-change-risk-analysis.md`
- `src/content/lessons/diagrams/code-change-risk-analysis/code-change-risk-map.svg`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T12/code-change-risk-analysis.md`

## Integration Notes

- order adjustment: none (`practical-vibe-coding` order 3 신규 추가)
- diagram reference inserted into site markdown
- glossary terms added: Diff Scope, Risk Signal, Security Alert, Manual Review Boundary
- KB consumers updated

## Validation

- `npm run lint`: PASS
- `npm run typecheck`: PASS
