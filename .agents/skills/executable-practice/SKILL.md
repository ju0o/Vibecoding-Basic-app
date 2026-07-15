---
name: executable-practice
description: Design or review practice with start, action, expected result, failure, recovery, and completion evidence.
---

# Purpose

Make practice independently executable and verifiable by a student.

# When to use

Use for an approved node whose practice is missing or under remediation.

# Authority paths

- `ai-ops/contracts/NODE_QUALITY_GATE.md`
- `ai-ops/roadmap/STUDENT_JOURNEY.md`
- `ai-ops/roadmap/LEARNING_OUTCOMES.md`
- phase-specific Context Package

# Inputs

Node question, outcomes, lesson context, sample project state, and failure modes.

# Allowed writes

None by default. Exact practice paths only when explicitly allowlisted.

# Forbidden writes

Passive reading labeled as practice, unrelated lessons, source code, routes, and Track D.

# Execution steps

1. Define the reproducible start state.
2. Specify concrete student actions.
3. Show the expected observable result.
4. Include a realistic failure example and recovery steps.
5. Define completion evidence tied to outcome levels.

# QA

Simulate the instructions from the stated start state and verify all six fields.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop if required tools, files, expected output, or evidence cannot be specified honestly.
