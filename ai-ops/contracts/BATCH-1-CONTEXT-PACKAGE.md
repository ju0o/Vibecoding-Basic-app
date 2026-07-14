# Batch 1 Context Package

```yaml
batch: 1
nodes: [A04, A05, A06]
allowed_src:
  - src/app/learn/vibe-coding-foundation/**
  - src/features/learning-interactions/**
  - src/app/learn/page.tsx
  - src/app/lab/page.tsx
  - src/app/start/page.tsx
allowed_content:
  - content/courses/vibe-coding-foundation/**
  - content/practice/vibe-coding-foundation/**
  - content/assessment/vibe-coding-foundation/**
  - exports/student/**
  - ai-ops/**
forbidden:
  - mass rewrite of day-1 / project-file-structure / node-npm packages
  - candidate C full track ahead of roadmap
  - push/deploy
```

## Nodes

| id | slug | title focus |
|---|---|---|
| A04 | ai-llm-ide | AI vs LLM vs IDE vs AI IDE |
| A05 | terminal-commands | terminal + commands habit |
| A06 | errors-to-ai | read errors + hand to AI |

## Sample

Reuse `examples/day1-first-success` unless a node needs a tiny extra file (prefer none).
