# STATE — 실행 큐 + 상태 기계

**운영자는 아래 "## NEXT" 블록만 보면 된다.** 갱신 주체: 각 RUN이 종료 시 NEXT_ACTION 블록을 이 파일에 덮어쓴다 (규격: [OPERATION_MANUAL.md](OPERATION_MANUAL.md) — 보고 끝 블록과 이 파일은 항상 동일).

## 🔄 체제 (O-05.1, 2026-07-05): CODEX 무정지 전체 실행

**[CODEX-PLAN.md](CODEX-PLAN.md) v2** — Codex가 커리큘럼(100강+)→수집→검증(Score 루프)→강의(V2 심층)→다이어그램→용어(300+)→Git 레퍼런스→사이트 완성→개발 서버 자가 점검까지 **멈춤 없이 실행**. 유일한 운영자 게이트 = 개발 서버 확인 후 배포 승인 (Phase 5). 막힌 항목은 BLOCKED 기록 후 계속 (전체 정지 금지). Fable은 사후 표본 감사.

## 현황판 (O-03.1 필수 필드)

| 필드 | 값 |
|---|---|
| Current Batch | **O-06.1 (v3.1) — Fable(지휘+경량QA) · Codex(Heavy 미션 M1~M5) 2인 체제.** 기획서: ORCHESTRATION-PLAN.md |
| Current State | **🌐 공개 전환 완료(모드 B) + 🏁 100강 완주** — 게이트·noindex 제거, 인용 173블록 링크 강등, Footer(인스타 @ju0o___·비영리 고지)·about/privacy/terms/license 페이지 신설 |
| Last Completed Step | Grok이 공개 전환(저작권 정리·SEO·Footer·정보 페이지) 수행 → Fable이 전수 QA: 인용 300블록 전건 KB 글자 일치, 강의당 인용 3블록 준수, 자가 QA 내부 메타 22건 제거, 캡스톤·배포 체크리스트 시제 정정, verify exit 0, 재배포 (2026-07-12) |
| Next Executor | 운영자 판단 — W2 콘텐츠 리프레시(R1~R7), M5 QA 재스캔(공개판 기준), 캡스톤 4층 확장(retrieval 챗봇), Search Console 등록(선택) |
| Next Prompt File | 후속 시 ai-ops/prompts/CODEX-MISSIONS.md → M4(리프레시) 또는 M5(QA 전수 — T2는 부분 일치 기준으로 갱신 필요) |
| Blocker | 없음 |
| Required Human Action | 공개판 스팟체크(선택) + Instagram 링크 동작 확인 |
| Release Status | **V2 100강 released + 라이브 100강 공개(모드 B)** — https://ju0o-ec967.web.app 검색 허용·무료 공개 |

## NEXT (직전 실행자의 NEXT_ACTION — 항상 이 블록이 최신)

```
- Current State: 🏁 100강 완주 — V2 100강 released + 라이브 100강, KB 90건 approved, kb_needed 0, 백로그 100행 전부 v2-released/released
- Verdict: MISSION COMPLETE (W1 커리큘럼 완주)
- Next Executor: 운영자 판단
- Next Prompt File: (없음) 후속 워크스트림 시 CODEX-MISSIONS → M4(콘텐츠 리프레시 R1~R7) 또는 M5(기계 QA 전수 재스캔)
- Why: 백로그 1~100 전부 released. Codex가 91~95 + 96~100 KB(P-01)를, Fable이 84~90 + 96~100 강의 및 P-02·배포를 수행 — 2인 체제의 계획대로 완주.
- Required Operator Action: 완주 스팟체크(선택). 후속 방향 지시(리프레시/QA 재스캔/챗봇 확장) 시 한 줄이면 충분.
- If Approved: 유지보수 모드 — stale-KB 30일 주기 재확인(M4), 신규 동향 승격(CONTENT-REFRESH-2026H2), 캡스톤 4층(retrieval 챗봇) 설계 착수 가능.
- If Rejected: 반려 강의 명시 → 해당 강의만 P-04 재생성.
- Files to Check: ai-ops/outputs/00-backlog/BACKLOG.md(전 행 released 확인), src/content/lessons/markdown/(100파일), https://ju0o-ec967.web.app
- Stop Condition: (해당 없음 — 완주)
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

- KB: **85건 approved**, stale KB 0건 / D-02 플랫폼 증분 = **완료**
- 강의: **V2 released 95강 / 라이브 90강** / UI: **M3 UI/UX refactor verified locally** / M5 QA scan: 전체 위반 0건, V1 알려짐 0건
- 루프 카운터: 없음 (rag Loop A·tokenization-context Loop A 종결, Batch 1 빌드 재검증 1회 있었으나 VERIFIED로 종결)

## 이력 (전이 로그 — append 전용, 최근 10건)
| 일시 | 항목 | 전이 | 실행 |
|---|---|---|---|
| 2026-07-12 | explain-risk-and-verification·mini-saas-architecture·admin-dashboard-project·ai-chatbot-project·automation-workflow-project | verified → released | Codex P-08 Project Completion Release Wave A, V2 Wave 33, deployment HOLD |
| 2026-07-12 | explain-risk-and-verification·mini-saas-architecture·admin-dashboard-project·ai-chatbot-project·automation-workflow-project | integrated → verified | Codex P-06 Project Completion Verify Wave A, `npm run verify` PASS, Next build 174 static pages |
| 2026-07-12 | explain-risk-and-verification·mini-saas-architecture·admin-dashboard-project·ai-chatbot-project·automation-workflow-project | generated → integrated | Codex P-05 Project Completion Integration Wave A, markdown·curriculum·glossary 15개·diagrams 5개·KB consumers 반영, lint/typecheck PASS |
| 2026-07-12 | explain-risk-and-verification·mini-saas-architecture·admin-dashboard-project·ai-chatbot-project·automation-workflow-project | planned → generated | Codex P-04 Project Completion Draft Wave A, V2 8섹션·8,000자+·Quote Bank 인용 일치, P-05 대기 |
| 2026-07-12 | KB explain-risk-verification·mini-saas-architecture·admin-dashboard-project·ai-chatbot-project·automation-workflow-project | draft → approved, 백로그 91~95 planned | Codex P-02 Project Completion KB Wave A, scores 91·90·89·90·89, 원문 URL 재대조 완료 |
| 2026-07-12 | KB explain-risk-verification·mini-saas-architecture·admin-dashboard-project·ai-chatbot-project·automation-workflow-project | needed → draft, 백로그 91~95 draft | Codex P-01 Project Completion KB Wave A, 공식 출처 기반 draft 5건 수집, P-02 대기 |
| 2026-07-12 | ai-assisted-testing-loop | verified → released | Codex P-08 AI-assisted Testing Release, V2 Wave 32, deployment HOLD |
| 2026-07-12 | ai-assisted-testing-loop | integrated → verified | Codex P-06 AI-assisted Testing Verify, `npm run verify` PASS, Next build 150 static pages |
| 2026-07-12 | ai-assisted-testing-loop | generated → integrated | Codex P-05 AI-assisted Testing Integration, markdown·curriculum·glossary 4개·diagram 1개·KB consumers 반영, lint/typecheck PASS |
| 2026-07-12 | ai-assisted-testing-loop | planned → generated | Codex P-04 AI-assisted Testing Draft, V2 8섹션·10,753자·Quote Bank 인용 5개 일치, P-05 대기 |
| 2026-07-12 | ai-code-review-tools·requirement-to-task-breakdown·prompt-to-implementation-loop·code-change-risk-analysis | verified → released | Codex P-08 Practical Vibe Coding Release, V2 Wave 31, deployment HOLD |
| 2026-07-12 | ai-code-review-tools·requirement-to-task-breakdown·prompt-to-implementation-loop·code-change-risk-analysis | integrated → verified | Codex P-06 Practical Vibe Coding Verify, `npm run verify` PASS, Next build 148 static pages |
| 2026-07-12 | ai-code-review-tools·requirement-to-task-breakdown·prompt-to-implementation-loop·code-change-risk-analysis | generated → integrated | Codex P-05 Practical Vibe Coding Integration Wave, markdown·curriculum·glossary 16개·diagrams 4개·KB consumers 반영, lint/typecheck PASS |
| 2026-07-12 | ai-code-review-tools·requirement-to-task-breakdown·prompt-to-implementation-loop·code-change-risk-analysis | planned → generated | Codex P-04 Practical Vibe Coding Draft Wave, V2 8섹션·8,000자+·Quote Bank 인용 일치, P-05 대기 |
| 2026-07-12 | KB ai-code-review-tools·requirement-task-breakdown·prompt-implementation-loop·code-change-risk-analysis·ai-assisted-testing-loop | needed → draft → approved, 백로그 63·80~83 planned | Codex P-01/P-02 Practical Vibe Coding KB Wave, scores 90·89·90·91·90 |
| 2026-07-12 | human-ai-collaboration-patterns | verified → released | Codex P-08 Human-AI Collaboration Release, V2 Wave 30, deployment HOLD |
| 2026-07-12 | human-ai-collaboration-patterns | integrated → verified | Codex P-06 Human-AI Collaboration Verify, `npm run verify` PASS, Next build 140 static pages |
| 2026-07-12 | human-ai-collaboration-patterns | generated → integrated | Codex P-05 Human-AI Collaboration Integration, markdown·curriculum·glossary 4개·diagram 1개·KB consumers 반영 |
| 2026-07-12 | human-ai-collaboration-patterns | planned → generated | Codex P-04 Human-AI Collaboration Draft, V2 8섹션·9,426자·Quote Bank 인용 5개 일치, self QA PASS |
| 2026-07-12 | chat-coding-era·ide-agent-era·codex-claude-cursor-comparison·tool-permissions-sandboxes | verified → released | Codex P-08 AI Coding Tools Release, V2 Wave 29, deployment HOLD |
| 2026-07-12 | chat-coding-era·ide-agent-era·codex-claude-cursor-comparison·tool-permissions-sandboxes | integrated → verified | Codex P-06 AI Coding Tools Verify, `npm run verify` PASS, Next build 138 static pages |
| 2026-07-12 | chat-coding-era·ide-agent-era·codex-claude-cursor-comparison·tool-permissions-sandboxes | generated → integrated | Codex P-05 AI Coding Tools Integration Wave, markdown·curriculum·glossary 13개·diagrams 4개·KB consumers 반영 |
| 2026-07-12 | chat-coding-era·ide-agent-era·codex-claude-cursor-comparison·tool-permissions-sandboxes | planned → generated | Codex P-04 AI Coding Tools Draft Wave, 4강 모두 V2 8섹션·8,000자+·Quote Bank 인용 5개 일치, P-04 self QA PASS |
| 2026-07-12 | KB chat-coding-era·ide-agent-era·ai-coding-tool-comparison·tool-permissions-sandboxes·human-ai-collaboration-patterns | needed → draft → approved, 백로그 58~62 planned | Codex P-01/P-02 AI Coding Tools KB Wave, scores 91·90·88·91·90, M5 QA 전체 위반 0, `npm run verify` PASS |
| 2026-07-11 | autocomplete-era | planned → generated → integrated → verified → released | Codex V2 Wave 28, diagram 1개·glossary 5개 추가, M5 QA 전체 위반 0, `npm run verify` PASS |
| 2026-07-11 | tailwind-design-systems·frontend-testing-basics·production-env-and-secrets·ai-era-timeline | planned → generated → integrated → verified → released | Codex V2 Wave 27, diagrams 4개·glossary 20개 추가, M5 QA 전체 위반 0, `npm run verify` PASS |
| 2026-07-11 | KB tailwind-design-systems·frontend-testing-basics·production-env-secrets·ai-era-timeline·autocomplete-era | needed → draft → approved | Codex P-01/P-02 연속, scores 89·90·91·88·89 |
| 2026-07-11 | model-selection-tradeoffs | planned → V2 released | Codex, V2 강의·diagram·glossary·metadata 반영, M5 QA 전체 위반 0, `npm run verify` PASS |
| 2026-07-11 | V1 Legacy Regeneration | v2-regenerate → V2 released | Codex, 5강 V2 Deep Dive 재생성, 다이어그램 5개 추가, M5 QA 전체 위반 0, `npm run verify` PASS |
| 2026-07-11 | QA Remediation Wave 1 | M5 위반 122건 → V1 제외 0건 | Codex, glossary 340 terms, 19강 형식 보강, `npm run verify` PASS |
| 2026-07-11 | M5 Machine QA Scan | report-only → done | Codex, 전 강의 67개·KB 58개·다이어그램 40개·용어 259개 전수 스캔, `npm run verify` PASS |
| 2026-07-11 | M4 Content Refresh Sweep | stale scan + 신규 후보 승격 → approved | Codex, stale KB 0건, `model-selection-tradeoffs` score 91, 커밋 4018958 |
| 2026-07-11 | M3 UI/UX Refactor | Phase A~C → verified locally | Codex, 커리큘럼 탐색·진행률·읽기 UX·홈/용어집 마감, npm run verify PASS |
| 2026-07-06 | KB nextjs-routing-rendering·git-init-add-commit-status·git-branch-switch-merge·git-log-diff-show·git-restore-reset-revert | draft → approved (89·91·90·92·92) | **Fable(대행)** P-02 KB 9차 — 인용 전건 세션 내 fetch 원문 대조 |
| 2026-07-06 | KB nextjs-routing-rendering·git-init-add-commit-status·git-branch-switch-merge·git-log-diff-show·git-restore-reset-revert | needed → draft | **Fable(대행)** P-01 T03/T04 KB 9차 — Codex 토큰 소진, 운영자 승인 |
| 2026-07-06 | KB json-data-contracts·web-security-basics·typescript-type-system·react-component-model·react-state-effects | needed → draft | Codex P-01 T02/T03/T07 KB 8차 |
| 2026-07-06 | KB json-data-contracts·web-security-basics·typescript-type-system·react-component-model·react-state-effects | draft → approved | Codex P-02 T02/T03/T07 KB 8차 |
| 2026-07-06 | json-data-contracts·web-security-basics·typescript-type-system·react-component-mental-model | planned → generated | Codex P-04 T02/T03 Wave 1 |
| 2026-07-06 | json-data-contracts·web-security-basics·typescript-type-system·react-component-mental-model | generated → integrated | Codex P-05 T02/T03 Wave 1 |
| 2026-07-06 | json-data-contracts·web-security-basics·typescript-type-system·react-component-mental-model | integrated → verified | Codex P-06 T02/T03 Wave 1 |
| 2026-07-06 | json-data-contracts·web-security-basics·typescript-type-system·react-component-mental-model | verified → released | Codex P-08 T02/T03 Wave 1 |
| 2026-07-06 | react-state-and-effects | planned → generated | Codex P-04 T03 Wave 2 |
| 2026-07-06 | react-state-and-effects | generated → integrated | Codex P-05 T03 Wave 2 |
| 2026-07-06 | react-state-and-effects | integrated → verified | Codex P-06 T03 Wave 2 |
| 2026-07-06 | react-state-and-effects | verified → released | Codex P-08 T03 Wave 2 |
| 2026-07-06 | http-request-response | verified → released | Codex P-08 T02 Wave 2 |
| 2026-07-06 | http-request-response | integrated → verified | Codex P-06 T02 Wave 2 |
| 2026-07-06 | http-request-response | generated → integrated | Codex P-05 T02 Wave 2 |
| 2026-07-06 | http-request-response | planned → generated | Codex P-04 T02 Wave 2 |
| 2026-07-06 | html-semantic-elements·css-cascade-layout-responsive·javascript-dom-events·browser-rendering-network | verified → released | Codex P-08 T02 Wave 1 |
| 2026-07-06 | html-semantic-elements·css-cascade-layout-responsive·javascript-dom-events·browser-rendering-network | integrated → verified | Codex P-06 T02 Wave 1 |
| 2026-07-06 | html-semantic-elements·css-cascade-layout-responsive·javascript-dom-events·browser-rendering-network | generated → integrated | Codex P-05 T02 Wave 1 |
| 2026-07-06 | html-semantic-elements·css-cascade-layout-responsive·javascript-dom-events·browser-rendering-network | planned → generated | Codex P-04 T02 Wave 1 |
| 2026-07-06 | KB html-semantic-elements·css-cascade-layout·javascript-dom-events·browser-rendering-network·http-request-response | draft → approved | Codex P-02 T02 KB 7차 |
| 2026-07-06 | KB html-semantic-elements·css-cascade-layout·javascript-dom-events·browser-rendering-network·http-request-response | needed → draft | Codex P-01 T02 KB 7차 |
| 2026-07-06 | package-json-and-semver | verified → released | Codex P-08 T01 Wave 3 |
| 2026-07-06 | package-json-and-semver | integrated → verified | Codex P-06 T01 Wave 3 |
| 2026-07-06 | package-json-and-semver | generated → integrated | Codex P-05 T01 Wave 3 |
| 2026-07-06 | package-json-and-semver | planned → generated | Codex P-04 T01 Wave 3 |
| 2026-07-06 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search | verified → released | Codex P-08 T01 Wave 2 |
| 2026-07-06 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search | integrated → verified | Codex P-06 T01 Wave 2 |
| 2026-07-06 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search | generated → integrated | Codex P-05 T01 Wave 2 |
| 2026-07-06 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search | planned → generated | Codex P-04 T01 Wave 2 |
| 2026-07-06 | KB variables-types-data·control-flow-functions-errors·debugging-error-reading·regex-code-search·package-json-semver | draft → approved | Codex P-02 T01 KB 6차 |
| 2026-07-06 | KB variables-types-data·control-flow-functions-errors·debugging-error-reading·regex-code-search·package-json-semver | needed → draft | Codex P-01 T01 KB 6차 |
| 2026-07-06 | terminal-shell-basics-reference | verified → released | Codex P-08 Terminal Reference |
| 2026-07-06 | terminal-shell-basics-reference | integrated → verified | Codex P-06 Terminal Reference |
| 2026-07-06 | terminal-shell-basics-reference | generated → integrated | Codex P-05 Terminal Reference |
| 2026-07-06 | terminal-shell-basics-reference | planned → generated | Codex P-04 Terminal Reference |
| 2026-07-06 | development-environment-map·vibe-coding-origin-karpathy·learning-with-ai-verification·files-folders-and-paths | verified → released | Codex P-08 T01/T08 Wave |
| 2026-07-06 | development-environment-map·vibe-coding-origin-karpathy·learning-with-ai-verification·files-folders-and-paths | integrated → verified | Codex P-06 T01/T08 Wave |
| 2026-07-06 | development-environment-map·vibe-coding-origin-karpathy·learning-with-ai-verification·files-folders-and-paths | generated → integrated | Codex P-05 T01/T08 Wave |
| 2026-07-06 | development-environment-map·vibe-coding-origin-karpathy·learning-with-ai-verification·files-folders-and-paths | planned → generated | Codex P-04 T01/T08 Wave |
| 2026-07-06 | CODEX-PLAN D-02 플랫폼 증분 | 대기 → 완료 | Codex, 콜아웃 4종 + 비공개 접근 보호, verify PASS |
| 2026-07-06 | KB vibe-coding-origin-karpathy | draft → recollect(1) → draft → approved | Codex P-03/P-02, 특수 출처 승인 반영 |
| 2026-07-06 | KB dev-environment-map·ai-learning-verification·files-folders-paths·terminal-shell-commands | draft → approved | Codex P-02 T01/T08 KB 5차 |
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
