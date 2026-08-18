# RP0-1 Scope Measurement — DRAFT (Read-Only)

```yaml
document: RP0_1_SCOPE_MEASUREMENT_DRAFT
date: 2026-07-16
phase: RP0-1 (candidate, operator-gated)
mode: read_only_scope_measurement
author_role: atlas-independent-reviewer (read-only)
source_gate: APPROVE_CODEX_RP0_RECOVERY (done) -> READY_FOR_CODEX_RP0_SCOPE_REVIEW
requires: APPROVE_CODEX_RP0_SCOPE_MEASUREMENT (NOT yet granted)
allow_write_paths: []   # this draft is the single permitted artifact
writes_executed: 1 (this file only)
git_writes: false
p0_implementation_started: false
```

> **이 파일은 단일 허용 산출물(draft)입니다.** 운영자 승인 `APPROVE_CODEX_RP0_SCOPE_MEASUREMENT` 없이는 작성자(RP0-1)가 시작되지 않으며, 본 리포트는 측정 결과만 담습니다. 13건 P0 파일은 채택·편집·staging·삭제되지 않았습니다.

---

## 1. Status

- **현재 게이트:** `READY_FOR_CODEX_RP0_SCOPE_REVIEW` (RP0-0 완료, STATE.md)
- **요청 작업:** P0 partial/unverified 13건 + owner unknown 14건에 대한 **read-only 스코프 측정**
- **결과:** 13건 전체를 파일별로 측정 완료. 교육 원칙(§1) 위배 0건, Protected path(§5) 오염 0건.
- **결정:** 본 리포트 제출 후 **STOP — 운영자 승인 대기** (`APPROVE_CODEX_RP0_SCOPE_MEASUREMENT`).

---

## 2. Files Read (측정 입력)

**SSOT / 상태**
- `AGENTS.md` (§1 목표, §5 protected, §9 X분류, §11 writable, §12 forbidden)
- `ai-ops/STATE.md`
- `E:\hermes\projects\aivibe_pm_directive.md` (PM 지시서)

**기준 인벤토리 / 감사**
- `ai-ops/reports/CODEX-RP0-WORKING-TREE-INVENTORY.md`
- `ai-ops/reports/CODEX-RP0-RECOVERY-AUDIT.md`

**13건 P0 파일 (전부 직접 열람·측정)**
- `content/practice/vibe-coding-foundation/11-files-connect-practice.md`
- `content/practice/vibe-coding-foundation/12-frontend-practice.md`
- `content/practice/vibe-coding-foundation/13-backend-practice.md`
- `content/practice/vibe-coding-foundation/14-api-practice.md`
- `content/practice/vibe-coding-foundation/15-database-practice.md`
- `content/practice/vibe-coding-foundation/16-good-ai-task-request-practice.md`
- `content/practice/vibe-coding-foundation/17-prompt-engineering-practice.md`
- `content/practice/vibe-coding-foundation/18-context-engineering-practice.md`
- `content/practice/vibe-coding-foundation/19-related-files-context-practice.md`
- `src/features/learning-interactions/core/usePrefersReducedMotion.ts`
- `src/features/learning-interactions/file-connect/FileConnectExperience.tsx`
- `src/features/learning-interactions/web-layers/WebLayersExperience.tsx`
- `src/features/learning-interactions/checkpoints/track-c-checkpoints.ts`

**검증 스크립트 (read-only 실행)**
- `node scripts/atlas/check-protected-paths.mjs` → `ok: true`, `protected_present: []`
- `node scripts/atlas/check-ssot-freezes.mjs` → `ok: true`, concepts/sections/build_plan/feature 모두 PASS

---

## 3. Files Changed

**없음.** 본 리포트 1건 외 파일 생성·수정·staging·삭제 모두 없음. 13건 P0 파일은 읽기 전용으로만 측정됨. `git` 쓰기 명령 미실행. 21개념/14섹션/BUILD-PLAN(HOLD) 미변경.

---

## 4. Findings — P0 13건 분류

공통: 분류 `P0_PARTIAL_UNVERIFIED`, 소유주 `unknown_owner`. six-field(시작/행동/기대/실패/복구/증거) 구조는 9개 연습 파일 전부에 기계적으로 존재함. 소유주 확정은 본 측정 범위 밖(운영자 승인 후 후속 phase에서).

### 4.1 연습 콘텐츠 (content/practice, markdown · 9건)

| # | 파일 | 노드 | 예상 소유주(추론) | §1 위배 | 비고 |
|---|---|---|---|---|---|
| 1 | 11-files-connect-practice.md | B05 / RP0-2 | content-writer / site-integration | 없음 | tracked 수정(M). six-field 충족. 샘플 `examples/day1-first-success` 존재 확인 |
| 2 | 12-frontend-practice.md | B06 / RP0-2 | content-writer / site-integration | 없음 | untracked. FE/BE 분류 인터랙티브 참조 |
| 3 | 13-backend-practice.md | B07 / RP0-2 | content-writer / site-integration | 없음 | untracked. server.js 분류 |
| 4 | 14-api-practice.md | B08 / RP0-2 | content-writer / site-integration | 없음 | untracked. 404/200, 비밀 키 금지 안내 |
| 5 | 15-database-practice.md | B09 / RP0-2 | content-writer / site-integration | 없음 | untracked. "Firebase 필수"를 실패 예시로 명시(교육적 정직) |
| 6 | 16-good-ai-task-request-practice.md | C01 / RP0-3 | content-writer / site-integration | 없음 | untracked. 4+/6 품질 기준 |
| 7 | 17-prompt-engineering-practice.md | C02 / RP0-3 | content-writer / site-integration | 없음 | untracked. `claim_scope: educational_interpretation` 표기(§9 준수) |
| 8 | 18-context-engineering-practice.md | C03 / RP0-3 | content-writer / site-integration | 없음 | untracked. `claim_scope: educational_interpretation` 표기(§9 준수) |
| 9 | 19-related-files-context-practice.md | C04 / RP0-3 | content-writer / site-integration | 없음 | untracked. node_modules/비밀/로그 제외 체크리스트 |

### 4.2 소스/컴포넌트 (src/features/learning-interactions · 4건)

| # | 파일 | 노드 | 예상 소유주(추론) | §1 위배 | 비고 |
|---|---|---|---|---|---|
| 10 | usePrefersReducedMotion.ts | shared / RP0-6 | atlas-implementer / interaction-designer | 없음 | untracked. 공유 reduced-motion 훅(`forceReduced` 옵션). a11y/§14 정렬 |
| 11 | FileConnectExperience.tsx | B05 / RP0-6 | atlas-implementer / interaction-designer | 없음 | tracked 수정(M). 고정 `false` → 공유 훅. `AnimationShell`+`aria-live` 활용, 대화형 |
| 12 | WebLayersExperience.tsx | B01–B04 / RP0-6 | atlas-implementer / interaction-designer | 없음 | tracked 수정(M). 동일 패턴. 노드별 `focus` prop로 B01–B04 구분 |
| 13 | track-c-checkpoints.ts | C05–C10 / RP0-4 | qa-agent / site-integration | 없음 | untracked. QUESTIONS/OUTCOMES 6노드 export. **페이지 미연결**(B01–B04만 NodeCheckpoint wiring 확인됨) |

### 4.3 교육 원칙(§1) 평가 결과

AGENTS.md §1 통과 기준 6항목 적용:

1. **can-do outcomes 향상?** — 충족. 9개 연습이 action/expected/evidence로 학생 행동 산출.
2. **Experience/question before theory?** — 충족. "시작 상태→행동" 흐름, 이론 선행 아님.
3. **Complete = solo capability?** — **부분(PARTIAL).** 연습·체크포인트가 페이지에 wiring되지 않아 학생이 사이트에서 도달 불가. 원칙 위배가 아닌 *완성도 갭* (P0 "partial/unverified"의 정의와 일치).
4. **Pipeline before Website?** — 해당없음/충족. 콘텐츠·인터랙티브 우선 존재.
5. **Animation interactive?** — 충족. FileConnect/WebLayers는 조작 가능 React(버튼/토글), reduced-motion 존중.
6. **Facts honest; Journey/Atlas preserved?** — 충족. "Firebase 필수"·"유료 제품=API"를 실패 예시로 명시, `educational_interpretation` 표기. Atlas/여정 자산 무변경.

**§1 위배 = 0건.** 모두 학생 중심·self-serve 지향. 단, 4.3-3의 *페이지 미연결*은 채택 전 검증 필요 항목(아래 Risks).

### 4.4 owner unknown 14건 구성

- P0 13건 (위 4.1·4.2) — `unknown_owner`.
- 생성 XLSX 1건: `ai-ops/reports/curriculum_master.xlsx` (openpyxl 생성, initiating owner 미확인) — 분류 `GENERATED_OUTPUT`, **P0 범위 제외** (STATE/Inventory 기준).
- → 합계 14건. 본 측정은 P0 13건에 한정; XLSX는 제외 대상으로 명시만 함.

---

## 5. Protected Assets Check (§5 / §12)

| 검사 | 결과 | 증거 |
|---|---|---|
| Phase 1 protected working-tree paths | **PASS (오염 0)** | `check-protected-paths.mjs` → `protected_present: []` |
| 21 concepts freeze | PASS | `check-ssot-freezes.mjs` → concepts PASS |
| 14 sections freeze | PASS | sections_1_to_14 PASS |
| Build Plan HOLD | PASS | build_plan_hold PASS |
| Model Routing core mutation | PASS | feature_no_core_mutate PASS |
| Track D path mixing | PASS (0건) | WORKING-TREE-INVENTORY: TRACK_D_VIOLATION 0 |
| 13 P0 파일이 protected/frozen 경로에 포함? | **아니오** | 경로는 `content/practice/**`·`src/features/learning-interactions/**` — §5 목록(예: `src/content/lessons/**`, `src/features/atlas/**`, `ai-ops/knowledge-base/entries/**`)과 불일치 |

**결론:** 13건 P0는 Protected path(§5)를 오염하지 않음. Frozen 경로(`src/content/lessons/**` 등)도 미촉각.

---

## 6. Recommendation — 운영자 승인 요청 항목

본 리포트는 측정만 수행. 다음은 **운영자 `APPROVE_CODEX_RP0_SCOPE_MEASUREMENT` 승인 후** 실행 가능한 후속 단계(본 phase에서 수행 안 함):

1. **P0 13건 채택/기각 결정** — 각 파일별 adopt / reject (Inventory "adopt or reject later").
2. **소유주 귀속** — 13건 + XLSX 1건의 실제 작성자/agent 확인 및 기록.
3. **페이지 wiring 검증** — C05–C10 체크포인트, B05–B09/C01–C04 연습을 노드 페이지에 연결할지 결정(RP0-4/2/3).
4. **a11y 런타임 QA** — reduced-motion 4건에 대해 키보드/브라우저 실 QA (RP0-0에서 미실행).
5. **교육 라벨 최종 확인** — C02/C03 `claim_scope` 표기 외 C05–C10 체크포인트의 `educational_interpretation` 일관성.

---

## 7. Risks

- **R1 (높음):** 13건 P0는 페이지에 wiring되지 않음 → 채택 시 학생 도달 불가(solo capability 미달). 채택 전 wiring/search 증거 필요.
- **R2 (중간):** `unknown_owner` — 책임 추적 불가. 후속 phase에서 귀속 절차 필수.
- **R3 (낮음):** 4건 a11y 컴포넌트는 런타임 QA 미수행(정적 코드만 확인). reduced-motion 동작은 브라우저 검증 필요.
- **R4 (낮음):** 두 Hermes 제안서(`CURRICULUM_INTEGRATED.md`, `EDUCATION_DESIGN.md`) 및 XLSX는 RP0 권한 밖(UNRELATED/GENERATED) — P0에 혼입 금지.

---

## 8. Unresolved

- 실제 소유주/agent 식별 미완료 (측정 범위 밖, 운영자 승인 후).
- C05–C10 페이지 wiring 여부 미결.
- 런타임 a11y QA 미실행.

---

## 9. Next Agent

- **승인 전:** 운영자 검토 → `APPROVE_CODEX_RP0_SCOPE_MEASUREMENT`.
- **승인 후:** RP0-1 본측정/채택 agent(또는 Main)가 위 Recommendation 항목 수행. 본 리포트는 read-only draft로 남김.
- **금지:** 본 phase에서 Writer/Implementer/Source Verifier/Reviewer/P0 구현/Track D 실행 금지(STATE 명시).

---

## 10. Human Approval Required — 명시 STOP

다음 항목은 운영자 승인이 필요하며, 승인 전 연속 실행을 멈춥니다:

1. `APPROVE_CODEX_RP0_SCOPE_MEASUREMENT` (본 RP0-1 측정 본단계 시작)
2. P0 13건 채택/기각 및 소유주 귀속 (21/14/BUILD-PLAN 변경 없음 전제)
3. 교육 라벨/페이지 wiring 변경 시 별도 승인

**→ STOP. 운영자 승인 대기.**
