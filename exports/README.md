# exports/ — 검토용 파생 산출물 (SSOT 아님)

## 필수에 가까운 파생

| 경로 | 원본 |
|---|---|
| `curriculum/CURRICULUM_MASTER.xlsx` | `ai-ops/curriculum/CURRICULUM_MASTER.csv` (**한글 컬럼**) |
| `student/*.docx` | `content/courses/**` 학생 Markdown |

## Optional

| 경로 | 비고 |
|---|---|
| `instructor/*.docx` | 강사용 — **제품 필수 아님** · 생성 스크립트 Optional |

## 재생

```text
python scripts/atlas/export-curriculum-xlsx.py
node scripts/atlas/export-day1-student-docx.mjs
# optional:
# node scripts/atlas/export-day1-instructor-docx.mjs
```

Interactive Animation은 exports가 아니라 **React 프레임워크 + 시나리오**로 구현한다.  
설계: `ai-ops/roadmap/ANIMATION_DESIGN_SYSTEM.md`
