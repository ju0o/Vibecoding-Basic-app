# P-05 Site Integration Report: json-data-contracts

Date: 2026-07-06
Executor: Codex
Status: INTEGRATED

## Source Draft

- `ai-ops/outputs/02-drafts/json-data-contracts/lesson.md`
- `ai-ops/outputs/02-drafts/json-data-contracts/meta.md`
- `ai-ops/outputs/02-drafts/json-data-contracts/terms.md`
- `ai-ops/outputs/02-drafts/json-data-contracts/diagrams/json-contract-flow.svg`

## Integrated Files

- `src/content/lessons/markdown/json-data-contracts.md`
- `src/content/lessons/diagrams/json-data-contracts/json-contract-flow.svg`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T02/json-data-contracts.md`

## Content Integrity

Lesson markdown was copied without content edits.

| File pair | SHA256 |
|---|---|
| draft lesson / site lesson | `9813E466818B48C337A4C903B5D07CEAC8422C36390458B55FD094B40E1D9690` |
| draft diagram / site diagram | `0E6DC9EE93D619F4AAB0FEDC2EFA3EF508A92B9E9AF4B6037D47262DB27DEAEF` |

## Metadata

- slug: `json-data-contracts`
- moduleId: `web-basics`
- order: 7
- type: `deep-dive`
- level: `기초`
- minutes: 90
- tags: `JSON`, `Data Contract`, `API`, `Content-Type`, `TypeScript`
- order adjustment: none

## Glossary Added

- JSON
- Data Contract
- JSON.parse
- JSON.stringify
- Content-Type
- API Response Shape

## KB Consumers

- lessons: `json-data-contracts`
- glossary: `JSON`, `Data Contract`, `JSON.parse`, `JSON.stringify`, `Content-Type`, `API Response Shape`

## Checks

- `npm run lint`: PASS
- `npm run typecheck`: PASS

## Next

- P-06 build verification
