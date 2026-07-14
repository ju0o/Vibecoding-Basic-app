# Curriculum Milestone A–C — Emergency Handoff Package

```yaml
document: CURRICULUM-MILESTONE-HANDOFF
date: 2026-07-15
current_mode: curriculum_milestone_handoff
current_decision: READY_FOR_CURRICULUM_MILESTONE_REVIEW
track_d: paused
next_requires_operator_scope: true
push: false
deploy: false
verified_against_repo: true
```

---

## A. 프로젝트 Goal

| 원칙 | 의미 |
|---|---|
| Learning Path first | 학생이 `/learn` 순서로 따라가는 공개 교육 플랫폼 |
| Pipeline | Student Question → Research → Verification → Content → Practice → Interactive → Quiz → Review → **Website** |
| Website Last | 검증된 교육 패키지만 사이트 연결 (빈 메뉴 금지) |
| Atlas | Reference Layer (메인 학습 경로를 대체하지 않음) |
| Living Verification | 출처·검증일·Research Queue 유지 |
| Continuous Mode | 승인된 Roadmap 안에서는 자동 진행 **가능**하되, **현재는 Milestone Gate로 Track D 정지** |
| Quality Gate | `ai-ops/contracts/NODE_QUALITY_GATE.md` — batch 속도로 계약 완화 금지 |

교육 SSOT 우선순위는 `AGENTS.md` / Education Layer를 따름. HOLD Build Plan 활성화 금지.

---

## B. 현재 완료 상태

### Tracks / Batches / Nodes

| 범위 | 상태 |
|---|---|
| Track A | A01–A06 live |
| Track B | B01–B09 live |
| Track C | C01–C10 live |
| **총 Learning Node** | **25** (A01–C10) |
| Batch 1 | A04–A06 (prior) |
| Batch 2 | B01–B04 (prior) |
| Batch 3 | B05–B09 (prior) |
| Batch 4 | C01–C04 (prior) |
| Batch 5 | C05–C10 (prior) |
| Milestone MQ-0…15 | audit + **partial** remediation (commit `2427ef3`) |
| Track D | **NOT STARTED · PAUSED** |

### Routes (base: `/learn/vibe-coding-foundation/`)

| Node | Slug / path |
|---|---|
| A01 | `day-1` |
| A02 | `project-file-structure` |
| A03 | `node-npm-package-json` |
| A04 | `ai-llm-ide` |
| A05 | `terminal-commands` |
| A06 | `errors-to-ai` |
| B01 | `web-how-pages-appear` |
| B02 | `html-basics` |
| B03 | `css-basics` |
| B04 | `javascript-basics` |
| B05 | `files-connect` |
| B06 | `frontend` |
| B07 | `backend` |
| B08 | `api` |
| B09 | `database` |
| C01 | `good-ai-task-request` |
| C02 | `prompt-engineering` |
| C03 | `context-engineering` |
| C04 | `related-files-context` |
| C05 | `task-breakdown` |
| C06 | `fix-loop` |
| C07 | `qa-basics` |
| C08 | `ai-agent` |
| C09 | `subagent` |
| C10 | `workflow` |

Hubs: `/learn`, `/start`, `/lab`, `/verification` (and existing tools/tech hubs).

### Git (read-only verified 2026-07-15)

| Field | Value |
|---|---|
| Branch | `master` |
| HEAD | run `git rev-parse --short HEAD` (handoff series ends at pin commit on `master`) |
| Handoff package commits | `a84991d` (body) → `8fd6cc8` (HEAD pin) — verify with `git log -3` |
| Milestone audit commit | `2427ef3` — audit + partial remediation |
| Message (handoff) | `ATLAS-OPS: emergency curriculum milestone handoff package` |
| Working tree | expect **clean** after handoff commits; re-check `git status` |
| Push | **not executed** |
| Deploy | **not executed** |

Recent history (context):

```text
8fd6cc8 ATLAS-OPS: pin handoff HEAD hash after package commit
a84991d ATLAS-OPS: emergency curriculum milestone handoff package
2427ef3 ATLAS-OPS: A-C curriculum milestone audit and quality remediation
ab7a78c ATLAS-OPS: STATE after Batch5 Track C complete
```

---

## C. 현재 판정

```text
READY_FOR_CURRICULUM_MILESTONE_REVIEW
PAUSE_TRACK_D
```

### 왜 CONTINUE_TRACK_D 가 아닌가

1. **Full 19-field quality contract complete = 0 nodes** (Matrix 기준).  
2. Residual: B05–B09 / C01–C04 practice full templates, C05–C10 node quiz widgets, source links, browser smoke, Studio honesty.  
3. Track IR = `approve_with_notes` only — not unconditional full approve.  
4. Milestone mandate: Track D only after matrix + required remediation + IR + full QA + studio align — residual still open.  
5. Operator must accept residual **or** order P0 work before D01.

Continuous Mode is **not discarded** — only gated.

---

## D. 품질 현황

| Band | Nodes | Notes |
|---|---|---|
| **Strong** | A01–A03 | Deep MD, practice files, React quiz/outcome, student DOCX exist |
| **Partial** | A04–A06, B05–B09, C01–C04 | Usable routes/interactives; practice/quiz/word/source incomplete vs contract |
| **Remediated this milestone** | B01–B04, C05–C10 | MD deepened; B01–B04 NodeCheckpoint; practice packs; interaction focus modes |
| **Full 19-field complete** | **0** | Do not claim COMPLETE for Website board honesty |

### Residual (actual)

| Residual | Detail |
|---|---|
| Practice | B05–B09, C01–C04 lack full start/action/expected/fail/recover/evidence per node |
| Quiz/Outcome widgets | C05–C10 (and many B) still page-level or pack-only; not all NodeCheckpoint |
| Sources | Inline official/MDN links sparse |
| a11y | reduced-motion often hardcoded `false` in callers |
| Browser | no Playwright/manual full smoke recorded |
| Studio | interim board; not full Education Studio learn-tab sync |
| Word | only A01–A03 standalone; workbooks recommended not built |
| Lint | 4 format issues in `scripts/atlas` export scripts (pre-existing class) — typecheck/test/build passed at milestone |

---

## E. 반드시 읽을 문서 순서

| # | Document | Path |
|---:|---|---|
| 1 | Operating contract | `AGENTS.md` |
| 2 | Student journey | `ai-ops/roadmap/STUDENT_JOURNEY.md` |
| 3 | Learning outcomes | `ai-ops/roadmap/LEARNING_OUTCOMES.md` |
| 4 | Education PM mode | `ai-ops/roadmap/EDUCATION_PM_OPERATING_MODE.md` |
| 5 | Node quality gate | `ai-ops/contracts/NODE_QUALITY_GATE.md` |
| 6 | Milestone report | `ai-ops/reports/CURRICULUM-MILESTONE-A-C-REPORT.md` |
| 7 | Quality matrix | `ai-ops/reports/CURRICULUM-MILESTONE-A-C-MATRIX.md` |
| 8 | Track IR | `ai-ops/reports/CURRICULUM-MILESTONE-A-C-REVIEW.md` |
| 9a | Content audit | `ai-ops/reports/CURRICULUM-MILESTONE-A-C-CONTENT-AUDIT.md` |
| 9b | Interaction audit | `ai-ops/reports/CURRICULUM-MILESTONE-A-C-INTERACTION-AUDIT.md` |
| 9c | Source audit | `ai-ops/reports/CURRICULUM-MILESTONE-A-C-SOURCE-AUDIT.md` |
| 10 | Live state | `ai-ops/STATE.md` |
| 11 | **This handoff** | `ai-ops/reports/CURRICULUM-MILESTONE-HANDOFF.md` |

Also useful:

- `ai-ops/roadmap/CONTINUOUS_CURRICULUM_PRODUCTION_MODE.md`
- `ai-ops/curriculum/NODE_PRODUCTION_STATUS.md`
- `ai-ops/research-queue/RESEARCH_QUEUE.md`
- `ai-ops/reports/ATLAS-GROK-HANDOFF.md` (older continuous resume; **this file supersedes for milestone**)

---

## F. 남은 작업 목록

### P0 — Track D 전 필수 (operator chooses remediation path)

1. B05–B09 guided practice full template (per node)  
2. C01–C04 guided practice full template (per node)  
3. C05–C10 node-specific Quiz / Outcome (`NodeCheckpoint` or equivalent)  
4. Official source links in student MD (MDN/HTML/HTTP/Node docs as applicable; educational labels for Prompt/Agent)  
5. reduced-motion fixed `false` audit/fix in interaction callers  
6. Browser smoke or documented alternative verification of key URLs  
7. Studio / NODE_PRODUCTION_STATUS honest alignment after fixes  

### P1 — 선택

- Track A integrated workbook DOCX  
- 웹 원리 (Track B) workbook  
- AI 협업 (Track C) workbook  
- Playwright introduction review (**Human Gate** if new heavy dependency)  

### P2 — 이후

- **Track D** (D01+) only after `CONTINUE_TRACK_D`  

---

## G. 파일별 수정 후보 (residual)

| Residual | Nodes | Paths (primary) | Problem | Expected | Agent | QA | Done when |
|---|---|---|---|---|---|---|---|
| Practice B05–B09 | B05–B09 | `content/practice/vibe-coding-foundation/*`, lessons `11–15`, pages `files-connect`…`database` | stub/partial lists | full practice template fields | content-writer | content review | each node practice executable |
| Practice C01–C04 | C01–C04 | practice dir; lessons `16–19`; pages `good-ai-task-request`…`related-files-context` | page-only lists | full templates | content-writer | content review | same |
| Quiz C05–C10 | C05–C10 | `src/features/learning-interactions/core/NodeCheckpoint.tsx`, pages `task-breakdown`…`workflow` | missing/weak checkpoint UI | node-specific Q+outcome levels | implementer (allowlist) | typecheck/test | wired + reasons/teach-back |
| Sources | A–C | `content/courses/vibe-coding-foundation/lessons/*.md` | sparse official links | Sources section scoped | source-researcher + writer | claim check | educational vs official labeled |
| reduced-motion | interactions | e.g. `BrowserPreview` callers under `src/features/learning-interactions/**` | hardcode `false` | respect preference | implementer | a11y note | no fixed false without reason |
| Browser smoke | routes | `src/app/learn/**`, `/start` `/lab` `/verification` | no E2E record | checklist pass or approved alt | QA / human | documented | key URLs smoke logged |
| Studio status | ops | `ai-ops/curriculum/NODE_PRODUCTION_STATUS.md`, studio if any | overstated ◎ history | honest P/C/M | Main | ops review | matches matrix |
| Word workbooks | A/B/C | `exports/student/**`, scripts under `scripts/atlas/` | missing merge workbooks | P1 only if operator wants | content + export script | optional | download-worthy only |

**Do not mass-delete** existing A01–A03 DOCX or A–C routes.

---

## H. 새 실행자의 첫 작업 (하나만)

운영자 결정 **전** 자동으로 Track D / P0 전체 착수 금지.

### Option 1 — 운영자가 residual 수용

```text
Operator: ACCEPT_RESIDUALS_CONTINUE_TRACK_D
→ Read this handoff + NODE_QUALITY_GATE
→ Prepare Track D D01 Context Package only after explicit CONTINUE_TRACK_D
→ Do not silently skip quality gate for new D nodes
```

### Option 2 — 운영자가 보강 선택 (default until told otherwise)

```text
Operator: REMEDIATE_P0_ONLY
→ Execute only P0 list above
→ No Track D content/routes
→ Re-run relevant QA; update Matrix/STATUS; re-issue decision
```

Until operator speaks, next agent **stops after reading** this package and STATE.

---

## I. Resume Prompts

### Short Resume Prompt

```text
Curriculum Milestone A–C handoff. Decision: READY_FOR_CURRICULUM_MILESTONE_REVIEW. PAUSE_TRACK_D. HEAD verify git rev-parse; milestone 2427ef3; PAUSE_TRACK_D; master. Read ai-ops/reports/CURRICULUM-MILESTONE-HANDOFF.md then STATE. No Track D, no new work until operator Option 1 ACCEPT_RESIDUALS_CONTINUE_TRACK_D or Option 2 REMEDIATE_P0_ONLY. No push/deploy.
```

### Full Context Package Prompt

```text
You are resuming AI Engineering Atlas / vibe-coding public learning platform.

GOAL
- Learning Path education factory; Website Last; Atlas = reference.
- Continuous Curriculum Production Mode still active but TRACK D PAUSED.

CURRENT DECISION (do not invent better status)
- READY_FOR_CURRICULUM_MILESTONE_REVIEW
- PAUSE_TRACK_D
- next_requires_operator_scope: true

GIT
- branch: master
- HEAD: verify with git rev-parse (handoff commits a84991d + 8fd6cc8); milestone 2427ef3
- no push, no deploy

COMPLETED
- A01–C10 = 25 live routes under /learn/vibe-coding-foundation/*
- Milestone audits + partial remediation committed
- NODE_QUALITY_GATE active

NOT COMPLETE
- Full 19-field complete count = 0
- P0 residuals: B05–B09 practice, C01–C04 practice, C05–C10 quiz/outcome widgets, sources, reduced-motion, browser smoke, studio honesty

READ ORDER
1 AGENTS.md
2 ai-ops/roadmap/STUDENT_JOURNEY.md
3 ai-ops/roadmap/LEARNING_OUTCOMES.md
4 ai-ops/roadmap/EDUCATION_PM_OPERATING_MODE.md
5 ai-ops/contracts/NODE_QUALITY_GATE.md
6 ai-ops/reports/CURRICULUM-MILESTONE-A-C-REPORT.md
7 ai-ops/reports/CURRICULUM-MILESTONE-A-C-MATRIX.md
8 ai-ops/reports/CURRICULUM-MILESTONE-A-C-REVIEW.md
9 CONTENT / INTERACTION / SOURCE audits same folder
10 ai-ops/STATE.md
11 ai-ops/reports/CURRICULUM-MILESTONE-HANDOFF.md (this package)

FIRST ACTION
- Wait for operator: Option1 ACCEPT_RESIDUALS_CONTINUE_TRACK_D | Option2 REMEDIATE_P0_ONLY
- Do not start D01, do not mass rewrite A–C, do not push/deploy/reset/clean/rebase

FORBIDDEN UNTIL OPERATOR
- Track D content/routes
- Large dependency / Playwright install without Human Gate
- Treating all 25 nodes as quality-complete
```

---

## J. 사실 검증 (handoff 작성 시)

| Claim | Check |
|---|---|
| Handoff series `a84991d`/`8fd6cc8` · milestone `2427ef3` | `git log` ✓ |
| Branch `master` | ✓ |
| Clean tree | `git status --short` empty ✓ |
| Milestone reports exist | path Test-Path True ✓ |
| NODE_QUALITY_GATE exists | ✓ |
| 25 route dirs under learn foundation | listed ✓ |
| Track D routes absent | no `mini-website` etc. among dirs ✓ |
| Decision strings match REPORT/STATE | ✓ |

---

## Operator decision checklist

- [ ] `ACCEPT_RESIDUALS_CONTINUE_TRACK_D`  
- [ ] `REMEDIATE_P0_ONLY`  
- [ ] Other (scope in writing)  

---

## End state of this handoff session

```text
READY_FOR_NEW_AGENT_HANDOFF
```

No Track D, no P0 implementation, no QA rerun, no push in the emergency handoff turn (docs-only STATE + this file).
