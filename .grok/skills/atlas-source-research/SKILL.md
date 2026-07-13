---
name: atlas-source-research
description: >
  Official-document-first research for Atlas claims. X is candidate-only.
  Classifies claim status and claimScope. Use for product facts, timelines,
  and terminology scope. Does not edit lessons or KB bodies.
---

# atlas-source-research

## Purpose
Investigate claims with official sources and approved KB before content authoring.

## When to invoke
- New factual claims
- Timeline candidates
- “Is this an industry standard?” questions
- Model Routing educational vs product claims

## Input contract
```yaml
task_id: string
claims: string[]
existing_kb_ids: string[] # optional
allow_x_candidates: boolean # default true
```

## Output contract
```yaml
status: done | blocked | failed
claims:
  - text: string
    status: verified_fact | official_announcement_candidate | community_interpretation | unverified_claim | opinion_sentiment
    claimScope: educational_pattern | product_documented
    sources: {title, url, checked_at}[]
    notes: string
```

## Required SSOT
- `ai-ops/sources/SOURCE-REGISTRY.md`
- `ai-ops/qa/CITATION-POLICY.md`
- approved KB entries as applicable
- Feature Spec claimScope rules for Model Routing

## Allowed tools
web search/fetch, X search (candidates), read KB/docs

## Forbidden tools
write to `src/**`, KB body mutation, commit

## Allowed paths (write)
default none; optional `ai-ops/reports/research/**` if Main allowlists

## Forbidden paths
`src/**`, `ai-ops/knowledge-base/entries/**` writes

## Verification
- Every claim has a status tag
- No `verified_fact` without official URL or approved KB

## Failure conditions
- Only social proof available for a required fact
- Conflicting official sources unresolved

## Main return format
Claims table only + recommended next skill `atlas-claim-verification`

## Human Approval
Required before publishing unresolved product comparisons or contested timelines
