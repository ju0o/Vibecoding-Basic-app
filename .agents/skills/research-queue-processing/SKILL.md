---
name: research-queue-processing
description: Classify Research Queue items and collect official-source candidates without making final claim decisions.
---

# Purpose

Prepare bounded research inputs for a separate verifier.

# When to use

Use only in an approved research phase with named queue items.

# Authority paths

- `AGENTS.md`
- `ai-ops/research-queue/RESEARCH_QUEUE.md`
- `ai-ops/sources/SOURCE-REGISTRY.md`
- `ai-ops/skills/SK-01-official-doc-research.md`

# Inputs

Queue IDs, required claim scope, freshness needs, and official-source domains.

# Allowed writes

None by default. Queue or research-report paths only when explicitly allowlisted.

# Forbidden writes

Student content, KB bodies, source code, routes, Track D, and final fact status.

# Execution steps

1. Classify each item as fact, educational interpretation, time-sensitive, or blocked candidate.
2. Collect official-source candidates and checked dates.
3. List claims that require source-verifier judgment.
4. Preserve unresolved items in the Research Queue.

# QA

Check that each candidate has a source type, URL, checked date, and unresolved-claim note.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop if no permitted official source exists, scope is unclear, or publication is requested before verification.
