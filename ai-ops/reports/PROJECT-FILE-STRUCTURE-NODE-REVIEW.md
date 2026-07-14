# Project File Structure Node Review

```yaml
pick: A_THEN_B
node_id: project-file-structure
verdict: READY_FOR_PROJECT_STRUCTURE_NODE_REVIEW
date: 2026-07-14
push: false
deploy: false
```

## 학생 질문

어떤 파일을 수정해야 하지? · src/package.json 역할 · AI에 범위 지정 · 구조는 왜 다른가?

## Research

- RQ-001/003/005/006 → verified · source pack  
- RQ-002/004 → open (B/C only)

## Outcomes / Content

- MD: `content/courses/.../02-project-file-structure.md`  
- Word: `exports/student/PROJECT-FILE-STRUCTURE-프로젝트-파일-구조-읽기.docx`  
- Practice + Assessment under `content/practice|assessment/...`  
- Sample: **reuse** `examples/day1-first-success` (no new project)

## Interactive

- `ProjectFileStructureExperience` — chaos/roles/find/wrong/edit/ai_scope/compare  
- File select ↔ role panel · wrong feedback · preview text change · AI request builder  
- Not text stepper only

## Website

```text
http://localhost:3000/learn/vibe-coding-foundation/project-file-structure
```

Linked from Day1 footer, /start, /learn Track A, /lab

## Why Bridge → B

파일 역할 이해 시작 → Node/npm/run 낯섦 → **B 미제작** (검토 후)

## QA

- unit tests: file-structure-state + prior day1/nav  
- typecheck/build: run in pipeline  
- E2E browser: not automated  

## IR

`approve_with_notes` — src not absolute rule; package.json npm-based; Day1 not rewritten; B not authored

## Limits

- B/C content absent by design  
- Word is summary export not full MD mirror  
- Studio board is markdown table interim  

## Verdict

```text
READY_FOR_PROJECT_STRUCTURE_NODE_REVIEW
```
