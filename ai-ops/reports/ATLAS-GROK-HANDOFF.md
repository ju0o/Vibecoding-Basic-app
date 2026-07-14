# Handoff — Student Journey Rebaseline (2026-07-14)

| Field | Value |
|---|---|
| Verdict | **READY_FOR_STUDENT_JOURNEY_REVIEW** |
| Product | **학습 경험** (materials under Journey; site = Viewer) |
| Center | **Student** — not Website, Atlas, or Course |
| Atlas | Knowledge Layer — **do not delete** |

## Read first (new top pack)

1. `ai-ops/roadmap/STUDENT_JOURNEY.md` — **highest SSOT candidate**
2. `ai-ops/roadmap/LEARNING_EXPERIENCE_PRINCIPLES.md`
3. `ai-ops/roadmap/LEARNING_ROADMAP.md`
4. `ai-ops/roadmap/LEARNING_NODE_SPEC.md`
5. `AGENTS.md` (SSOT table updated)

## Still useful (under Journey)

- `EDUCATION_PLATFORM_MASTER_PLAN.md` + Course / Pipeline / Curriculum system docs
- Atlas Education Layer (21/14) technical contract

## Growth loop

```text
knows → curious → learns → why → practices → checks understanding → next
```

## Pipeline (mandatory)

```text
Student question → Research → Verification → Curriculum → Content
  → Practice → Animation → Diagram → Quiz → Review → Publish → Website
```

Website last. AI proposes; operator decides.

## Keep

- `/atlas/**`, Studio, Model Routing, Foundation, 100 lessons, KB
- Education First direction docs (aligned under Journey)

## Do not

- Code / UI / new libraries this batch
- Delete Atlas or mass-edit courses
- push / deploy without order
- Finalize full curriculum without operator

## Next after operator approve

1. Map Roadmap stages → `CURRICULUM_MASTER.xlsx` (foundation first)
2. Author Day 1+ nodes per LEARNING_NODE_SPEC (content, not chrome)
3. Map existing lesson slugs → stages
4. Later: Studio education-production columns; Start Learning UX

## Resume prompt

```text
Student Journey first. Product = learning experience. Site = viewer. Atlas = reference.
Read STUDENT_JOURNEY pack. No website-first. No Atlas delete. Question-driven nodes.
```
