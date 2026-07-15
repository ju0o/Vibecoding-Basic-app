---
name: studio-status-sync
description: Reconcile Matrix and Studio status through one writer without false completion claims.
---

# Purpose

Keep operational status aligned with observed artifacts and quality gates.

# When to use

Use only after implementation, QA, and review evidence are complete for the target unit.

# Authority paths

- `ai-ops/contracts/NODE_QUALITY_GATE.md`
- `ai-ops/curriculum/NODE_PRODUCTION_STATUS.md`
- `ai-ops/reports/CURRICULUM-MILESTONE-A-C-MATRIX.md`
- phase-specific Context Package

# Inputs

Observed files, QA results, independent review decision, Matrix row, and Studio status.

# Allowed writes

None by default. Exact Matrix and status paths only when allowlisted to one writer.

# Forbidden writes

Parallel Matrix/Studio writers, false complete status, product files, content, routes, and Track D.

# Execution steps

1. Compare observed evidence with each status field.
2. Preserve partial, blocked, or needs-revision states honestly.
3. Update allowlisted status surfaces sequentially through one writer.
4. Re-read both surfaces and report any mismatch.

# QA

Verify counts, node IDs, dates, status vocabulary, and Quality Gate evidence.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop if evidence is incomplete, writers overlap, or a complete claim would exceed the gate.
