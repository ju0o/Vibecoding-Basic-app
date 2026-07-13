---
name: atlas-content-authoring
description: >
  Author Atlas educational copy and content specifications from verified evidence
  packs. Never invent facts. Keeps educational labels distinct from standards.
  Default documentation scope; src writes only with allowlist.
---

# atlas-content-authoring

## Purpose
Turn curriculum + verified claims into learner-facing drafts/specs.

## When to invoke
- After claim verification
- Unit card / quiz / teach-back copy
- Content specification documents

## Input contract
```yaml
task_id: string
outline: object
evidence_pack_path: string
allowed_paths: string[]
```

## Output contract
```yaml
status: done | blocked | failed
artifacts: string[]
unresolved_claims: string[]
educational_label_notices: boolean
```

## Required SSOT
- Feature Spec / Education Layer sections relevant to topic
- Evidence pack statuses

## Allowed tools
read; write only `allowed_paths`

## Forbidden tools
KB approve, silent fact invention

## Allowed paths
from Context Package only

## Forbidden paths
Phase 1 protect list unless explicitly allowlisted

## Verification
- Every product fact maps to allow/verified evidence
- Educational labels include disclaimer language when model tiers appear

## Failure conditions
- Evidence pack missing
- Allowlist empty but write requested to src

## Main return format
artifact paths + unresolved_claims

## Human Approval
Marketing-like comparisons, contested vendor claims
