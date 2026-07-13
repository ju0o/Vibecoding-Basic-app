---
name: atlas-repository-audit
description: >
  Audit Atlas V2 repository structure, impact surface, protected Phase 1 paths,
  and SSOT locations. Use before new phases or when scope is unclear.
  Read-only. Triggers: /atlas-repository-audit, phase start, impact analysis.
---

# atlas-repository-audit

## Purpose
Produce a structured audit of relevant paths, freezes, and Phase 1 contamination risks.

## When to invoke
- Start of GO/MR phases
- Unknown impact surface
- Before any commit staging decision

## Input contract
```yaml
task_id: string
goal: string
phase: string
extra_keywords: string[] # optional
```

## Output contract
```yaml
status: done | blocked | failed
do_not_touch: string[]
safe_to_edit: string[]
ssot_paths: string[]
phase1_status: object
impact_surface: string[]
risks: string[]
```

## Required SSOT
- `AGENTS.md`
- `ai-ops/STATE.md`
- `ai-ops/reports/ATLAS-GROK-HANDOFF.md`
- Education Layer + Feature Spec headers when Atlas work

## Allowed tools
read, search, list, read-only git status/diff

## Forbidden tools
write, edit, commit, push, reset, clean

## Allowed paths
read-anywhere in workspace

## Forbidden paths (write)
all writes

## Verification
- Phase 1 inventory matches `git status` sample
- SSOT files exist

## Failure conditions
- Cannot read git status
- SSOT missing

## Main return format
Short YAML RESULT + path lists only (no file bodies).

## Human Approval
Not required for audit itself. Escalate if destructive remediation seems needed.
