---
name: route-smoke
description: Run deterministic-first route, link, static-output, and response smoke checks with concise evidence.
---

# Purpose

Confirm approved routes load and link correctly without modifying product files.

# When to use

Use after relevant build output exists and the Context Package lists smoke routes.

# Authority paths

- `AGENTS.md`
- `package.json`
- `ai-ops/reports/P0-REMEDIATION-CONTEXT-PACKAGE.md`
- `scripts/atlas/**`

# Inputs

Exact route list, server/static-output mode, expected status, and evidence destination.

# Allowed writes

None by default. A smoke evidence report only when explicitly allowlisted.

# Forbidden writes

Routes, components, content, dependencies, P0 fixes, and Track D.

# Execution steps

1. Use existing deterministic link and route scripts first.
2. Confirm build or static output preconditions.
3. Check each allowlisted route and record pass/fail evidence.
4. Classify failures without fixing them.

# QA

Ensure every requested route has one result and reproducible command evidence.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop if smoke requires a new heavy dependency, unavailable environment, or write outside the evidence allowlist.
