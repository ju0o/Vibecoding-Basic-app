# P0 Remediation Handoff

```yaml
document: P0-REMEDIATION-HANDOFF
date: 2026-07-15
current_mode: p0_remediation_handoff
operator_decision: REMEDIATE_P0_ONLY
current_decision: REMEDIATE_P0_ONLY
track_d: paused
implementation_started: false
next_executor_may_start_p0: true
push: false
deploy: false
```

## A. Goal

Learning Path 공개 교육 플랫폼의 **A01–C10 (25 nodes)** 품질을 Milestone Gate 기준에 맞게 끌어올린다.  
**Website Last** · **Node Quality Gate** 유지 · **Track D 금지** until post-P0 재판정.

## B. 운영자 결정 (확정)

```text
REMEDIATE_P0_ONLY
PAUSE_TRACK_D
REMEDIATE_P0_ONLY_APPROVED
```

병행 유지:

```text
READY_FOR_CURRICULUM_MILESTONE_REVIEW  (quality posture until RP0-11)
```

- 25개 Node · 기존 Route **보존** (대량 삭제/재작성 금지)
- Word 워크북 **P0 비필수**
- 얇은 DOCX 25개 양산 **금지**

## C. P0 범위 (승인)

| ID | 작업 | 대상 |
|---|---|---|
| P0-1 | Practice full template | B05–B09, C01–C04 |
| P0-2 | Node Quiz + Outcome | C05–C10 |
| P0-3 | Sources / claimScope / verified_at | A01–C10 MD (우선 도메인 아래) |
| P0-4 | a11y / reduced-motion | `src/features/learning-interactions/**` |
| P0-5 | Browser smoke (no new heavy deps) | 핵심 routes list |
| P0-6 | Studio/Matrix/STATUS honesty | ops curriculum files |

Practice 계약 (각 노드): 시작 상태 · 학생 행동 · 기대 결과 · 실패 예시 · 복구 · 완료 증거  
Quiz 계약: 개념 · 오개념 · 상황 · 순서 · 정/오 이유 · Teach-back · Observed/Assisted/Independent/Explainable · 증거 · 재학습

## D. 제외 (이번 P0)

- Track D / D01 / 새 Route / 새 강의 양산  
- A01–A03 강 패키지 재작성  
- Word 25개 기계 생성  
- Playwright **신규 설치** (필요 시 Human Gate만)  
- 제품 가격 fact 해제 (blocked 유지)  
- push / deploy / reset / clean / rebase  

## E. 다음 세션 실행 순서 (고정)

```text
RP0-0  Handoff / Git / Matrix 복구
RP0-1  P0 대상 파일 실측
RP0-2  B05–B09 Practice
RP0-3  C01–C04 Practice
RP0-4  C05–C10 Quiz / Outcome
RP0-5  Source Sections / Verification Dates
RP0-6  Reduced Motion / Accessibility
RP0-7  Browser Smoke
RP0-8  Studio / Matrix 정합
RP0-9  Full Relevant QA
RP0-10 Track A/B/C Independent Review
RP0-11 Milestone 재판정 → CONTINUE_TRACK_D | READY_… | BLOCKED | HUMAN_…
```

단계 통과 시 다음으로 자동 진행. **Track D는 RP0-11 전 금지.**

## F. CONTINUE_TRACK_D 조건 (RP0-11)

- P0 Practice 완료 (B05–B09, C01–C04)  
- C05–C10 Node Quiz 완료  
- 출처 범위 명시  
- 접근성 수정  
- Browser Smoke 기록  
- Studio 상태 정합  
- 관련 QA 통과  
- Track별 IR 통과 (revise_required면 D 금지)  
- Word 워크북 **불필요**

## G. Git (handoff 작성 시 — 실행자가 재확인)

| Field | Value |
|---|---|
| Branch | `master` |
| Expected family | milestone `2427ef3` · emergency handoff `a84991d`… · latest verify with `git rev-parse --short HEAD` |
| Working tree | re-check `git status --short` |
| Push/deploy | never done in milestone/handoff sessions |

## H. 읽을 문서 (순서)

1. `AGENTS.md`  
2. `ai-ops/contracts/NODE_QUALITY_GATE.md`  
3. `ai-ops/reports/CURRICULUM-MILESTONE-HANDOFF.md`  
4. `ai-ops/reports/CURRICULUM-MILESTONE-A-C-MATRIX.md`  
5. `ai-ops/reports/CURRICULUM-MILESTONE-A-C-REPORT.md`  
6. `ai-ops/reports/P0-REMEDIATION-CONTEXT-PACKAGE.md`  
7. `ai-ops/STATE.md`  

## I. 첫 명령 (다음 실행자)

```text
REMEDIATE_P0_ONLY approved. PAUSE_TRACK_D. Read P0-REMEDIATION-HANDOFF.md + P0-REMEDIATION-CONTEXT-PACKAGE.md + STATE. Start RP0-0 only. No Track D.
```

## J. Resume Prompts

### Short

```text
Operator: REMEDIATE_P0_ONLY. PAUSE_TRACK_D. implementation_started was false at plan handoff. Read ai-ops/reports/P0-REMEDIATION-HANDOFF.md and CONTEXT-PACKAGE. Execute RP0-0→RP0-11. No D01. No push.
```

### Full

```text
REMEDIATE_P0_ONLY. Preserve A01–C10 routes. P0 only:
1) Practice B05–B09 + C01–C04 (start/action/expected/fail/recover/evidence)
2) Quiz+Outcome C05–C10 (NodeCheckpoint-style, not batch-only)
3) Sources claimScope + verified_at on A–C MD (Node/npm/HTML/CSS/JS/HTTP/API/DB; Prompt/Context/Agent educational not standards; pricing blocked)
4) reduced-motion / a11y in learning-interactions
5) Browser smoke without new heavy deps
6) Honest Studio/Matrix/STATUS
Order RP0-0…RP0-11. Gate: NODE_QUALITY_GATE.md. Decision at end: CONTINUE_TRACK_D only if all P0+IR+QA pass. Word not required. No push/deploy.
```

## K. Session that wrote this package

- **Did not** implement P0 code/content  
- **Did not** run full QA  
- **Did not** start Track D  
- Docs only: this file + Context Package + STATE  

```text
READY_FOR_P0_REMEDIATION_HANDOFF
```
