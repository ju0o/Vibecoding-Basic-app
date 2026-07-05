# STATE — 실행 큐 + 상태 기계

**운영자는 아래 "## NEXT" 블록만 보면 된다.** 갱신 주체: 각 RUN이 종료 시 NEXT_ACTION 블록을 이 파일에 덮어쓴다 (규격: [OPERATION_MANUAL.md](OPERATION_MANUAL.md) — 보고 끝 블록과 이 파일은 항상 동일).

## 🔄 체제 (O-05.1, 2026-07-05): CODEX 무정지 전체 실행

**[CODEX-PLAN.md](CODEX-PLAN.md) v2** — Codex가 커리큘럼(100강+)→수집→검증(Score 루프)→강의(V2 심층)→다이어그램→용어(300+)→Git 레퍼런스→사이트 완성→개발 서버 자가 점검까지 **멈춤 없이 실행**. 유일한 운영자 게이트 = 개발 서버 확인 후 배포 승인 (Phase 5). 막힌 항목은 BLOCKED 기록 후 계속 (전체 정지 금지). Fable은 사후 표본 감사.

## 현황판 (O-03.1 필수 필드)

| 필드 | 값 |
|---|---|
| Current Batch | CODEX-PLAN v2 전체 실행 (Phase 0~5) |
| Current State | Phase 2 KB 5차 P-01 완료: dev-environment-map·vibe-coding-origin-karpathy·ai-learning-verification·files-folders-paths·terminal-shell-commands draft / P-02 원문 재접속 검증 대기 |
| Last Completed Step | Codex P-01 T01/T08 KB 5차 draft 5건 생성 (2026-07-05) |
| Next Executor | Codex |
| Next Prompt File | `prompts/P-02-knowledge-verification.md` |
| Blocker | 없음 |
| Required Human Action | None — 같은 Codex 흐름에서 P-02 원문 재접속 검증 진행 |
| Release Status | V2 22강 released·미배포 — 배포는 Phase 5 승인 후에만 |

## NEXT (직전 실행자의 NEXT_ACTION — 항상 이 블록이 최신)

```
NEXT_ACTION:
- Current State: 운영자 승인 완료 (2026-07-05) — ① MW·Collins 등록 + X는 archive.org 대조 ② 콜아웃 4종 추가 ③ 비공개 접근 보호 기능화
- Verdict: APPROVED (재개 준비 완료)
- Next Executor: Codex
- Next Prompt File: 아래 "재개 지시"를 Codex 세션에 그대로 전달
- Why: 5차 KB 검증이 출처 정책 승인 대기로 걸려 있었음 — 해소됨
- Required Operator Action: None — 다음 개입은 Phase 5
- If Approved: (완료)
- If Rejected: —
- Files to Check: sources/SOURCE-REGISTRY.md(특수 출처), roadmap/CONTENT-FORMAT-V2.md §3.5(콜아웃)
- Stop Condition: Phase 5 개발 서버 확인 보고에서만 정지
```

### 재개 지시 (Codex에 그대로 붙여넣기)

```
운영자 승인이 반영됐다. ai-ops/CODEX-PLAN.md 실행을 재개하라.
1. vibe-coding-origin-karpathy: SOURCE-REGISTRY의 "특수 출처"가 갱신됨 — Merriam-Webster·Collins 사용 가능,
   X 원문은 web.archive.org 스냅샷으로 대조(스냅샷 URL+캡처 날짜 기록). P-03 재수집 → P-02 재검증으로 이 KB를 통과시켜라.
2. 플랫폼 증분 D-02: roadmap/CONTENT-FORMAT-V2.md §3.5 콜아웃 4종(예시/핵심/주의/팁) 렌더링 +
   READING-UX-BRIEF §4.6 비공개 접근 보호(전 페이지 noindex, robots.txt 차단, Basic Auth 미들웨어 —
   비밀번호는 SITE_PASSWORD 환경변수, 코드에 하드코딩 금지, 프로덕션에서만 활성) 구현 후 verify.
3. 다이어그램이 계획(§3) 대비 0개다 — 이후 물결부터 필요처에 SVG를 포함하고, 기존 22강 중
   작동 원리 설명이 다이어그램을 요구하는 강의에 소급 추가하라 (별도 물결로).
4. 이후 남은 물결(기둥 A·B·D, 용어)을 계획대로 계속 — Phase 5에서만 정지.
```

## 상태 기계 (전이 규칙 — NEXT 계산의 유일한 근거)

### KB 항목
```
(없음) ──backlog에 KB 필요──▶ needed ──[PRODUCE: P-01]──▶ draft
draft ──[VERIFY: P-02]──▶ 점수≥80+게이트 → approved / 미달 → recollect(n)
recollect(n) ──[PRODUCE: P-03]──▶ draft (재평가 대상 표시)   ※ n=3 → escalated
approved ──[선택: FABLE 사후 감사]──▶ qa_approved   ← 감사 표식(강의 생성의 필수 전제는 아님)
```

### 강의 항목
```
planned(backlog 승인 + 근거 KB 전부 approved 이상) ──[PRODUCE: P-04]──▶ generated
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

- KB 1차: context-engineering·tool-calling·mcp·rag·agent-loop = **qa_approved + Quote Bank 6개씩 보강 완료** / KB 2차: skills·orchestration·harness = **approved** / KB 3차: subagents·loop-engineering·context-caching·ai-system-evaluation = **approved** / KB 4차 T08: tokenization-context·prompt-engineering·grounding-citations·hallucination-verification·embeddings-similarity = **approved** / KB 5차 T01/T08: dev-environment-map·vibe-coding-origin-karpathy·ai-learning-verification·files-folders-paths·terminal-shell-commands = **draft, P-02 대기**
- 강의: **V2 released 22강** (V2 Wave 1+2+3+4+5+6 — 배포는 HOLD, 운영자 게이트)
- 루프 카운터: 없음 (rag Loop A·tokenization-context Loop A 종결, Batch 1 빌드 재검증 1회 있었으나 VERIFIED로 종결)

## 이력 (전이 로그 — append 전용, 최근 10건)
| 일시 | 항목 | 전이 | 실행 |
|---|---|---|---|
| 2026-07-05 | KB dev-environment-map·vibe-coding-origin-karpathy·ai-learning-verification·files-folders-paths·terminal-shell-commands | needed → draft | Codex P-01 T01/T08 KB 5차 |
| 2026-07-05 | embeddings-and-similarity | integrated → verified → released | Codex Verify/Release T08 Wave 2 |
| 2026-07-05 | embeddings-and-similarity | generated → integrated | Codex P-05 T08 Wave 2 |
| 2026-07-05 | embeddings-and-similarity | planned → generated | Codex P-04 T08 Wave 2 |
| 2026-07-05 | tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification | integrated → verified → released | Codex Verify/Release T08 Wave 1 |
| 2026-07-05 | tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification | generated → integrated | Codex P-05 T08 Wave 1 |
| 2026-07-05 | tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification | planned → generated | Codex P-04 T08 Wave 1 |
| 2026-07-05 | KB tokenization-context | draft → approved | Codex P-02 Loop A |
| 2026-07-05 | KB tokenization-context | recollect(1) → draft | Codex P-03 |
| 2026-07-05 | KB prompt-engineering·grounding-citations·hallucination-verification·embeddings-similarity | draft → approved | Codex P-02 |
| 2026-07-05 | KB tokenization-context | draft → recollect(1) | Codex P-02 |
| 2026-07-05 | KB tokenization-context·prompt-engineering·grounding-citations·hallucination-verification·embeddings-similarity | needed → draft | Codex P-01 |
| 2026-07-05 | context-caching-and-state·ai-system-evaluation | integrated → verified → released | Codex P-06/P-08 |
| 2026-07-05 | context-caching-and-state·ai-system-evaluation | generated → integrated | Codex P-05 |
| 2026-07-05 | context-caching-and-state·ai-system-evaluation | planned → generated | Codex P-04 |
| 2026-07-05 | subagents-and-delegation·multi-agent-orchestration·loop-engineering-basics·harness-engineering-basics | integrated → verified → released | Codex P-06/P-08 |
| 2026-07-05 | subagents-and-delegation·multi-agent-orchestration·loop-engineering-basics·harness-engineering-basics | generated → integrated | Codex P-05 |
| 2026-07-05 | subagents-and-delegation·multi-agent-orchestration·loop-engineering-basics·harness-engineering-basics | planned → generated | Codex P-04 |
| 2026-07-05 | KB subagents·loop-engineering·context-caching·ai-system-evaluation | draft → approved | Codex P-02 (O-05.2 연속 검증) |
| 2026-07-05 | KB subagents·loop-engineering·context-caching·ai-system-evaluation | needed → draft | Codex P-01 |
| 2026-07-05 | context-engineering-mcp-skills·designing-reusable-skills | generated → integrated → verified → released | Codex P-05/verify/release |
| 2026-07-05 | context-engineering-mcp-skills·designing-reusable-skills | planned → generated | Codex P-04 |
| 2026-07-05 | KB skills·orchestration·harness | draft → approved | Codex P-02 (O-05.2 연속 검증) |
| 2026-07-05 | KB skills·orchestration·harness | needed → draft | Codex P-01 |
| 2026-07-05 | V1 9강 | v2-regenerate → V2 released | Codex Phase 2+3 |
| 2026-07-05 | KB 5건 | qa_approved → qa_approved + Quote Bank 5+ | Codex Phase 2 |
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
