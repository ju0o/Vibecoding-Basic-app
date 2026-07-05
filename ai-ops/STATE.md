# STATE — 실행 큐 + 상태 기계

**운영자는 아래 "## NEXT" 블록만 보면 된다.** 갱신 주체: 각 RUN이 종료 시 NEXT_ACTION 블록을 이 파일에 덮어쓴다 (규격: [OPERATION_MANUAL.md](OPERATION_MANUAL.md) — 보고 끝 블록과 이 파일은 항상 동일).

## ⏸ 파이프라인 정지 중 (O-04, 2026-07-05) — V2 전환 롤아웃만 진행

운영자 결정: 콘텐츠 형식 V2 (심층·인용·하이라이트, 퀴즈·체크리스트·설명연습 제거), V1 콘텐츠 9강 전량 재생성. **R1~R3 완료 전 P-04~P-08 일반 실행 금지, 배포 금지.** 규격: [roadmap/CONTENT-FORMAT-V2.md](roadmap/CONTENT-FORMAT-V2.md)

| 롤아웃 | 작업 | 상태 |
|---|---|---|
| R1 | D-01 개발 (스키마·파서·UI) + verify | **▶ NEXT** |
| R2 | KB 5건 Quote Bank 보강 → 경량 재검증 → Fable 승인 | 대기 |
| R3 | 9강 V2 재생성 → 반영 → verify → 릴리스 | 대기 |
| R4 | 파이프라인 재개 + V1 규격 문서 정리 | 대기 |

## 현황판 (O-03.1 필수 필드)

| 필드 | 값 |
|---|---|
| Current Batch | **V2 전환 롤아웃 (R1~R4)** — Batch 2는 V2 재생성 대상으로 흡수 |
| Current State | 강의: released 5 + integrated 4 = **9강 전부 V1, 재생성 대상** / KB 5건 qa_approved (Quote Bank 없음 — R2 대상) / KB 2차 3건 needed |
| Last Completed Step | Fable O-04 (V2 규격 확정, 2026-07-05) |
| Next Executor | Codex |
| Next Prompt File | `prompts/D-01-format-v2.md` |
| Blocker | V1 형식 (전량 재생성 전까지 릴리스·배포 무의미) |
| Required Human Action | None (배포 환경 결정은 R3 완료 후로 연기) |
| Release Status | V1 5강 released·미배포 — **V2 완료 전 배포 금지** |

## NEXT (직전 실행자의 NEXT_ACTION — 항상 이 블록이 최신)

```
NEXT_ACTION:
- Current State: 파이프라인 정지, V2 롤아웃 R1
- Verdict: DONE (O-04 규격 확정)
- Next Executor: Codex (개발 — 아무 세션)
- Next Prompt File: prompts/D-01-format-v2.md
- Why: V2 형식은 스키마·파서·UI 변경이 선행돼야 콘텐츠 재생성이 가능 (롤아웃 R1)
- Required Operator Action: None
- If Approved: (해당 없음)
- If Rejected: V2 규격에 이의 시 "Reject: {항목}" → Fable이 CONTENT-FORMAT-V2.md 개정
- Files to Check: ai-ops/roadmap/CONTENT-FORMAT-V2.md (V2 규격 — 원하시면 검토)
- Stop Condition: D-01의 verify 실패 시 Codex 자체 수정 (개발 작업 — Loop B 미적용)
```

## 상태 기계 (전이 규칙 — NEXT 계산의 유일한 근거)

### KB 항목
```
(없음) ──backlog에 KB 필요──▶ needed ──[PRODUCE: P-01]──▶ draft
draft ──[VERIFY: P-02]──▶ 점수≥80+게이트 → approved / 미달 → recollect(n)
recollect(n) ──[PRODUCE: P-03]──▶ draft (재평가 대상 표시)   ※ n=3 → escalated
approved ──[FABLE: 보고서 승인]──▶ qa_approved   ← 강의 생성의 전제
```

### 강의 항목
```
planned(backlog 승인 + 근거 KB 전부 qa_approved) ──[PRODUCE: P-04]──▶ generated
generated ──[PRODUCE: P-05, 단독 실행]──▶ integrated
integrated ──[CLINE: P-06]──▶ VERIFIED → verified / FAILED → build_fail(n)
build_fail(n) ──[PRODUCE: P-07]──▶ integrated (재검증 대상)   ※ n=3 → 통합 revert + escalated
verified ──[CLINE: P-08, 같은 런에서 연속]──▶ released
released ──[운영자: 배포 환경·승인]──▶ deploy_ready ──[CLINE: P-09]──▶ deployed
```

### RUN 우선순위 (한 런 = 최고 우선순위 단계 하나만 수행)
- PRODUCE 세션: `build_fail` P-07 > `generated 있음` P-05(이때 다른 작업 금지) > `recollect` P-03 > `planned` P-04 > `needed` P-01
- VERIFY 세션: `draft` P-02 (전건)
- CLINE: `integrated` P-06 → 통과 시 P-08 연속
- FABLE: `approved`(승인 대기) 검토 > 에스컬레이션 > backlog 소진 시 O-01 > 강의 10개 릴리스마다 O-02

### 사람(운영자) 게이트 — 이것만 사람이 결정한다
1. **배포 승인** (P-08 후 외부 공개)
2. **에스컬레이션 결정** (루프 3회, 주제 범위 재정의, 정책 변경)
3. (선택) 품질 스팟체크 — 원할 때 아무 산출물이나 열어 반려 가능

## 항목별 현재 상태 (요약 — 상세는 MASTER_PROGRESS.md)

- KB 1차: context-engineering·tool-calling·mcp·rag·agent-loop = **qa_approved** / KB 2차: skills·orchestration·harness = **needed** (O-01 등록 2026-07-05)
- 강의: **released 5강** (파일럿 + Batch 1 Final 4강 — 배포는 HOLD, 운영자 게이트) / **integrated 4강** (order 3·4·5·11 — Cline P-06 대기) / **planned + KB 충족 2강** (order 12·14) / KB 대기 3강 (order 10·13·15)
- 루프 카운터: 없음 (rag Loop A 종결, Batch 1 빌드 재검증 1회 있었으나 VERIFIED로 종결)

## 이력 (전이 로그 — append 전용, 최근 10건)
| 일시 | 항목 | 전이 | 실행 |
|---|---|---|---|
| 2026-07-05 | context-window-and-memory·system-prompts-and-instruction-layers·ai-workflow-design·agent-loop-anatomy | generated → integrated | Codex P-05 |
| 2026-07-05 | context-window-and-memory·system-prompts-and-instruction-layers·ai-workflow-design·agent-loop-anatomy | planned → generated | Codex P-04 |
| 2026-07-05 | KB skills·orchestration·harness | (등록) → needed | Fable O-01 |
| 2026-07-05 | Batch 1 4강 | verified → released (배포 HOLD) | Cline P-08 (5bafba1, 콘텐츠 커밋 보완 a0b6849) |
| 2026-07-05 | Batch 1 4강 | integrated → verified | Cline P-06 ×2 (93ca776, e69fb4b) |
| 2026-07-05 | Batch 1 4강 | planned → generated → integrated | Codex P-04/P-05 |
| 2026-07-05 | KB 5건 | approved → qa_approved | Fable QA-01 |
| 2026-07-05 | rag | recollect(1) → draft → approved | Codex P-03/P-02 |
| 2026-07-05 | KB 5건 | needed → draft → approved | Codex P-01/P-02 |
| 2026-07-04 | from-prompt-to-system | verified → released | Cline P-08 |
