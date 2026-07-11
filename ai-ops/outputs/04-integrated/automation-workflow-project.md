# P-05 Integration Record — automation-workflow-project

- date: 2026-07-12
- executor: Codex
- status: integrated

## Source Draft

- `ai-ops/outputs/02-drafts/automation-workflow-project/lesson.md`
- `ai-ops/outputs/02-drafts/automation-workflow-project/meta.md`
- `ai-ops/outputs/02-drafts/automation-workflow-project/terms.md`
- pre-diagram copy hash match: `3F620E3D6E9EDD4C2AEEA456A7CA685FDE02FA9E42BF6A7036D6A48AD18A7B31`

## Site Files

- `src/content/lessons/markdown/automation-workflow-project.md`
- `src/content/lessons/diagrams/automation-workflow-project/workflow-dependency-graph.svg`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T12/automation-workflow-project.md`

## Integration Notes

- order adjustment: none (`project-textbook` order 4 신규 추가)
- diagram reference inserted into site markdown
- glossary terms added: Workflow Dependency Graph, Workflow Tool Boundary, Predefined Code Path
- KB consumers updated

## Validation

- `npm run lint`: PASS
- `npm run typecheck`: PASS
