---
name: atlas-independent-review
description: >
  Independent review of Atlas work products for SSOT, scope, sources, a11y,
  tests, and Phase 1 contamination. Read-only. Use after implementation or
  content pipelines. Implementer must not self-review.
---

# atlas-independent-review

## Purpose
Provide an independent gate before CONTINUE / commit recommendations.

## When to invoke
- After implementer or multi-step content pipeline
- Before GO phase CONTINUE when writes occurred
- Before staging commits

## Input contract
```yaml
task_id: string
requirements_refs: string[]
changed_paths: string[]
test_evidence: string[]
author_agent: string # must not equal reviewer
```

## Output contract
```yaml
status: done | failed | needs_human
verdict: approve_merge | revise | block
findings:
  - severity: critical | major | minor
    item: string
    evidence: string
human_approval_required: boolean
```

## Required SSOT
- AGENTS.md, Education Layer freezes, relevant Feature Spec
- Phase Context Package if any

## Allowed tools
read, diff, optional test re-run for evidence

## Forbidden tools
product code edits, self-merge

## Allowed paths
read changed paths + SSOT

## Forbidden paths
writes

## Verification checklist
requirements, SSOT, over-change, sources, educational labels, a11y, reduced-motion, static export, islands, bundle, tests, Phase 1 mix, human gate

## Failure conditions
- author_agent == reviewer identity
- missing test evidence for source changes

## Main return format
verdict + findings table

## Human Approval
verdict=block or human_approval_required=true
