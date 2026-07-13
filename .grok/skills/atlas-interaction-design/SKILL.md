---
name: atlas-interaction-design
description: >
  Design Atlas simulators, diagrams, quizzes, and checkpoints with a11y,
  reduced-motion, static export, and small client-island constraints.
  Spec-first; no external model APIs for educational simulators.
---

# atlas-interaction-design

## Purpose
Specify interactions that teach routing/concepts without breaking performance or a11y.

## When to invoke
- Simulator / diagram / quiz UX
- Client island boundary design
- Accessibility acceptance criteria

## Input contract
```yaml
task_id: string
feature_refs: string[] # e.g. Feature Spec sections
allowed_paths: string[]
```

## Output contract
```yaml
status: done | blocked | failed
island_boundaries: string[]
a11y_checklist: string[]
reduced_motion: string
static_export_ok: boolean
no_external_model_api: boolean
artifacts: string[]
```

## Required SSOT
- Education Layer Playground principles
- Model Routing Feature Spec simulator/a11y sections when relevant

## Allowed tools
read; write allowlisted specs

## Forbidden tools
adding graph/motion libraries, wiring paid APIs

## Allowed paths
Context Package allowlist (default docs only)

## Forbidden paths
unapproved `src/**`

## Verification
- Keyboard path exists
- Text alternative for visual routes
- Educational simulation badge required

## Failure conditions
- Drag-only proposal without alternative
- Requires server/runtime model calls for MVP

## Main return format
spec paths + checklist booleans

## Human Approval
New dependency proposals
