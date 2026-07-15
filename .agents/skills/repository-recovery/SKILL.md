---
name: repository-recovery
description: Recover the approved repository state, handoff, git inventory, and pre-existing change boundaries before any execution phase.
---

# Purpose

Establish an evidence-based starting state without altering or attributing existing work.

# When to use

Use at session recovery or the start of an approved RP0 recovery phase.

# Authority paths

- `AGENTS.md`
- `ai-ops/STATE.md`
- `ai-ops/reports/P0-REMEDIATION-HANDOFF.md`
- `ai-ops/reports/P0-REMEDIATION-CONTEXT-PACKAGE.md`

# Inputs

Current branch, HEAD, git status, handoff decision, and phase Context Package.

# Allowed writes

None by default. Only exact `allow_write_paths` in the current Context Package.

# Forbidden writes

All unlisted paths. Never reset, clean, discard, rebase, stage, push, or deploy.

# Execution steps

1. Read authority paths in order.
2. Record branch, HEAD, status, and untracked inventory.
3. Separate pre-existing changes from current-phase files without guessing ownership.
4. Confirm current decision, Track D posture, and next permitted action.

# QA

Compare the live inventory with the handoff and report every mismatch.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop on destructive-operation need, unclear authority, protected-path conflict, or a decision mismatch.
