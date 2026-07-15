---
name: milestone-review
description: Run track-level independent review against the Quality Gate and decide whether Track D remains paused.
---

# Purpose

Provide an independent, evidence-based milestone decision without editing implementation.

# When to use

Use after all scoped implementation and relevant QA have finished, never in parallel with the implementer.

# Authority paths

- `AGENTS.md`
- `ai-ops/contracts/NODE_QUALITY_GATE.md`
- `ai-ops/roadmap/STUDENT_JOURNEY.md`
- `ai-ops/roadmap/LEARNING_OUTCOMES.md`
- phase-specific Context Package

# Inputs

Track scope, diffs, source reports, QA evidence, status matrix, protected-path check, and prior review notes.

# Allowed writes

None by default. Independent review report only when explicitly allowlisted.

# Forbidden writes

Implementation, content, Matrix/Studio status, Track D, push, and deploy.

# Execution steps

1. Review requirements, education quality, claims, practice, checkpoint, accessibility, and scope.
2. Verify QA and protected/frozen asset evidence.
3. Check that writer and reviewer are independent.
4. Return approve, approve_with_notes, revise_required, or blocked.
5. Leave Track D paused unless RP0-11 separately authorizes continuation.

# QA

Every verdict must cite observed evidence and unresolved risks.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop on missing evidence, reviewer contamination, SSOT conflict, or any Human Approval condition.
