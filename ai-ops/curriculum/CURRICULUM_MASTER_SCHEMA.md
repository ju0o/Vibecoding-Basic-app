# Curriculum Master Schema

```yaml
document: CURRICULUM_MASTER_SCHEMA
status: day1_draft
date: 2026-07-14
```

---

## 1. Recommendation (Choice B)

| Option | Pros | Cons |
|---|---|---|
| **A** xlsx + CSV mirror | Excel-friendly; dual files | Duplicate SSOT risk if both edited |
| **B** CSV (or YAML) SSOT → generate xlsx | Git-diffable; AI-friendly; single edit surface | Operators must open CSV or generated xlsx |

**Decision for this repo:** **Choice B**

```text
ai-ops/curriculum/CURRICULUM_MASTER.csv   ← SSOT (human + AI edit)
ai-ops/curriculum/CURRICULUM_MASTER_SCHEMA.md  ← column contract
(optional later) scripts/atlas/export-curriculum-xlsx.mjs → .xlsx artifact
```

Rationale vs CONTENT_PIPELINE Excel-first wording:

- Pipeline still allows Excel as *operator view*.
- Git review of education map is mandatory for Living curriculum.
- Generating xlsx from CSV avoids silent dual divergence.

Until export script exists, operators may open CSV in Excel and **save as CSV** when committing (or use PR review on CSV only).

---

## 2. Required columns

| Column | Type | Description |
|---|---|---|
| course_id | string | e.g. `vibe-coding-foundation` |
| stage_id | string | Journey/Outcome stage e.g. `D1_first_success` |
| lesson_id | string | e.g. `d1-first-success` |
| order | number | Sort within course |
| lesson_title | string | Student-facing title |
| student_question | string | Primary driving question(s); use `\|` for multiple |
| why_now | string | Why this lesson at this point |
| learning_goal | string | Goal in student language |
| outcomes | string | Semicolon-separated outcome IDs |
| practice | string | Path to practice md |
| interaction | string | Path to interaction spec |
| assessment | string | Path to assessment md |
| atlas_refs | string | Optional concept ids |
| tool_refs | string | Tools mentioned |
| prerequisites | string | lesson_ids or `none` |
| next_lesson | string | lesson_id or `tbd` |
| source_status | enum | `draft` / `partial` / `verified` |
| content_status | enum | `idea` / `drafting` / `reviewing` / `approved` / `published_path` |
| reviewer_status | enum | `not_started` / `pass` / `revise` / `block` |

Optional future columns: `markdown_path`, `instructor_path`, `owner`, `last_verified`.

---

## 3. Status enums (align CONTENT_PIPELINE)

```text
content_status: idea → drafting → reviewing → approved → published_path
source_status: draft | partial | verified
reviewer_status: not_started | pass | revise | block
```

---

## 4. Day 1 row

See `CURRICULUM_MASTER.csv`.
