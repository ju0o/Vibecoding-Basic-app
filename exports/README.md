# exports/ — Review derivatives (not SSOT)

| Path | Source of truth |
|---|---|
| curriculum/*.xlsx | `ai-ops/curriculum/CURRICULUM_MASTER.csv` |
| student/*.docx | `content/courses/**/*.md` |
| instructor/*.docx | `content/instructor/**/*.md` |
| review/*.md | assembled from content + ai-ops reports |

Do not edit exports as primary content. Regenerate after SSOT changes:

```text
python scripts/atlas/export-curriculum-xlsx.py
node scripts/atlas/export-day1-student-docx.mjs
node scripts/atlas/export-day1-instructor-docx.mjs
```
