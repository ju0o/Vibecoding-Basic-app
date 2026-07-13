---
name: atlas-claim-verification
description: >
  Verify Atlas draft sentences and research claims for claimScope, source fitness,
  and overclaim risk. Separates educational patterns from product-documented facts.
  Use after research or before content freezes.
---

# atlas-claim-verification

## Purpose
Stop unverified or over-strong claims from entering learner-facing content.

## When to invoke
- After `atlas-source-research`
- Before content authoring freeze
- During independent review of copy

## Input contract
```yaml
task_id: string
items:
  - text: string
    proposed_claimScope: educational_pattern | product_documented | unknown
    sources: string[] # optional
```

## Output contract
```yaml
status: done | blocked | failed
items:
  - text: string
    verdict: allow | rewrite | drop
    claimScope: educational_pattern | product_documented
    source_status: verified_fact | ...
    rewrite_hint: string
```

## Required SSOT
- Citation policy, Feature Spec § claimScope / educational labels
- Approved KB when product_documented

## Allowed tools
read, web fetch for re-check

## Forbidden tools
silent content publish, KB approve

## Allowed paths
read drafts; write only allowlisted review reports

## Forbidden paths
unapproved content paths

## Verification
- product_documented ⇒ official source or approved KB
- educational labels retained as non-standard

## Failure conditions
- Circular sourcing
- Missing dates on time-sensitive claims

## Main return format
Per-item verdict table

## Human Approval
If high-severity conflict between sources
