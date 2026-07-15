---
name: claim-verification
description: Verify official facts, educational interpretations, freshness, blocked claims, and verified_at metadata.
---

# Purpose

Produce an honest claim decision that separates sourced facts from teaching conventions.

# When to use

Use after source candidates exist and before publishing or updating claim-bearing content.

# Authority paths

- `AGENTS.md`
- `ai-ops/sources/SOURCE-REGISTRY.md`
- `ai-ops/skills/SK-01-official-doc-research.md`
- `ai-ops/skills/SK-04-source-verification.md`

# Inputs

Numbered claims, candidate sources, claim scope, current date, and target content paths.

# Allowed writes

None by default. Verification reports only when explicitly allowlisted.

# Forbidden writes

Unverified student claims, approved KB bodies outside P-01/P-02, prices without current evidence, and Track D.

# Execution steps

1. Classify claims as official fact, educational interpretation, time-sensitive, or blocked.
2. Check primary official sources and conditions.
3. Assign PASS, FIX, or BLOCK with a proposed safe wording.
4. Record `verified_at` and the exact claim scope.

# QA

Every factual, versioned, comparative, or causal claim must have a disposition and source.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop when official sources conflict, freshness cannot be established, or scope requires human approval.
