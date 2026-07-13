---
name: atlas-curriculum-design
description: >
  Design Atlas learning order, Why Bridges, prerequisites, and subordinate
  Learning Routes while freezing the core 21 concepts and 14-section contract.
  Use for Model Routing units and journey alignment.
---

# atlas-curriculum-design

## Purpose
Produce curriculum structures that evolve Atlas without breaking education freezes.

## When to invoke
- Learning Route design
- Why Bridge writing
- Prerequisites mapping
- Checking 21/14 invariance

## Input contract
```yaml
task_id: string
route_id: string # e.g. model-routing
constraints:
  concepts_21_frozen: true
  sections_14_frozen: true
```

## Output contract
```yaml
status: done | needs_human | failed
units: {id, name, one_liner, prev, next}[]
why_bridges: string[]
freeze_proof:
  concepts_count: 21
  sections_contract_unchanged: true
artifacts: string[]
```

## Required SSOT
- Education Layer § concepts & sections
- Model Routing Feature Spec when route_id=model-routing

## Allowed tools
read; write only roadmap/contracts/reports allowlist

## Forbidden tools
editing lessons bulk, KB bodies, src defaults

## Allowed paths
`ai-ops/roadmap/**`, `ai-ops/contracts/**`, `ai-ops/reports/**` when allowlisted

## Forbidden paths
concept identity files that would add a 22nd core concept

## Verification
- Exactly 21 core concepts remain
- Subordinate units are not promoted to core concepts

## Failure conditions
- Proposal requires core concept insertion

## Main return format
Unit graph + freeze_proof

## Human Approval
Any proposal touching 21/14
