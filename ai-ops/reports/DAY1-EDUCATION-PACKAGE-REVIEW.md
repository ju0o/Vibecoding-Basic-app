# Day 1 Education Package Review

```yaml
document: DAY1-EDUCATION-PACKAGE-REVIEW
date: 2026-07-14
verdict: READY_FOR_DAY1_EDUCATION_REVIEW
outcome_docs: operator_approved
site_ui_changed: false
push_deploy: false
```

---

## 1. Verdict

```text
READY_FOR_DAY1_EDUCATION_REVIEW
```

Operator should read student lesson + practice + assessment, then approve for **content freeze** before any Website wire.

---

## 2. Approved upstream SSOT

| Doc | Status |
|---|---|
| OUTCOME_FRAMEWORK.md | **operator_approved** |
| LEARNING_OUTCOMES.md | **operator_approved** |
| STAGE_COMPLETION_SPEC.md | **operator_approved** |
| ASSESSMENT_SYSTEM.md | **operator_approved** |
| Student Journey + Learning Outcome pair | top judgment criteria |

---

## 3. Day 1 student questions (bundled, not 15 lessons)

1. 바이브코딩이란? 일반 코딩과 차이?  
2. AI에게 말했는데 왜 파일이 생기는가?  
3. IDE / VS Code / AI IDE는?  
4. 로컬 환경·Node·터미널·node/npm -v 는?  
5. package.json / npm install / npm run dev / src 는?  
6. AI마다 구조가 다른 이유는?  
7. 결과가 틀렸을 때 수정·오류 전달은?  

Mapped inside one lesson flow (see student MD TOC).

---

## 4. Path A and Path B

| Path | Goal | Time |
|---|---|---|
| **A Zero-Setup** | Single HTML + browser (primary); optional AI preview | ~10 min target |
| **B Local Setup** | VS Code · Node LTS · terminal · install · run | **Not** guaranteed 10 min |

Not competitors: A = motivation; B = environment for later lessons.

---

## 5. Learning Outcomes

IDs O1–O13 with levels Observed / Assisted / Independent / Explainable.  
Minimum vs Recommended Complete defined in:

- `ai-ops/curriculum/DAY1-OUTCOME-CONTRACT.md`  
- `content/assessment/.../01-first-success-assessment.md`

---

## 6. Education artifacts created

| Kind | Path |
|---|---|
| Course index | `content/courses/vibe-coding-foundation/course.md` |
| Student lesson | `content/courses/vibe-coding-foundation/lessons/01-first-success.md` |
| Instructor script | `content/instructor/vibe-coding-foundation/01-first-success-instructor.md` |
| Practice | `content/practice/vibe-coding-foundation/01-first-success-practice.md` |
| Interaction spec | `content/interactions/vibe-coding-foundation/01-first-success-interaction-spec.md` |
| Assessment | `content/assessment/vibe-coding-foundation/01-first-success-assessment.md` |
| Outcome contract | `ai-ops/curriculum/DAY1-OUTCOME-CONTRACT.md` |
| Source pack | `ai-ops/reports/research/DAY1-SOURCE-PACK.md` |
| Independent review | `ai-ops/reports/DAY1-INDEPENDENT-REVIEW.md` |

**Path choice:** top-level `content/**` — **not** wired to `src/app` or `src/content/lessons` (frozen lessons untouched).

---

## 7. Curriculum Master

| Decision | **Choice B** — CSV SSOT, xlsx optional later export |
|---|---|
| Schema | `ai-ops/curriculum/CURRICULUM_MASTER_SCHEMA.md` |
| Data | `ai-ops/curriculum/CURRICULUM_MASTER.csv` (Day 1 row) |

Required columns present: course_id … reviewer_status.

---

## 8. Official sources (checked_at 2026-07-14)

- https://nodejs.org/ · npm learn page  
- https://docs.npmjs.com/cli/v11/using-npm/scripts  
- https://docs.npmjs.com/cli/v11/configuring-npm/package-json  
- https://code.visualstudio.com/docs · Download  
- MDN/browser open HTML (Path A)

Details: `DAY1-SOURCE-PACK.md`.

---

## 9. Practice summary

Path A steps + evidence; Path B install/version/run + deferral; safety (official downloads only).

---

## 10. Animation spec summary

States: idle → requesting → planning → generating → running → success → revision → error.  
Real motion (chip path, tree pop, server LED, preview swap).  
Keyboard, reduced-motion, aria-live, text alternative.  
**Not implemented in UI this phase.**

---

## 11. Assessment summary

Concept quiz 3Q; performance checklist; error scenarios; teach-back; independent trial; min/recommended complete; relearn rules.

---

## 12. Independent Review

`DAY1-INDEPENDENT-REVIEW.md` → **pass_with_notes**.  
Note: same-session reviewer; human re-stamp optional.

---

## 13. Known limits

1. No sample project zip for Path B  
2. No binary xlsx (CSV by design)  
3. No DOCX export yet (instructor MD is docx-ready structure)  
4. Existing 100-lesson orientation not rewritten  
5. LTS version numbers intentionally not frozen in student prose  

---

## 14. Day 2 candidates

| Candidate | Why |
|---|---|
| 파일·폴더 구조 읽기 | After first project exists |
| HTML/CSS/JS 역할 분리 (화면) | Natural web surface |
| AI 수정 요청을 “파일 지정”으로 고도화 | Builds on O3 |

Exact id: `d2-tbd` in curriculum CSV until Living decision.

---

## 15. Compliance gates

| Gate | Status |
|---|---|
| No student site page implementation | **Confirmed** |
| No Atlas UI change | **Confirmed** |
| No heavy animation implementation | **Confirmed** |
| No CMS/DB/auth/deploy/push | **Confirmed** |
| No 21 concept / 14 section change | **Confirmed** |
| No mass Foundation Atlas rewrite | **Confirmed** |
| Website last | **Confirmed** |

---

## 16. Phases completed

D1-0 Audit → D1-1 Outcome contract → D1-2 Source pack → D1-3 Curriculum → D1-4 Student → D1-5 Instructor → D1-6 Practice → D1-7 Interaction → D1-8 Assessment → D1-9 IR → D1-10 Report.

---

## 17. Next operator actions

1. Read `01-first-success.md` as a beginner  
2. Approve or request edits  
3. Only then: wire to site + implement animation from spec  
4. Optional: sample zip + docx export  

## Resume prompt

```text
Day1 package READY_FOR_DAY1_EDUCATION_REVIEW. content/** not site-wired.
Outcome docs approved. Path A HTML + Path B local. CSV curriculum SSOT.
Do not website-first. After human content approve, implement viewer last.
```
