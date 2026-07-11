# AI 운영 Dashboard

요약 현황판. 원본 데이터는 [MASTER_PROGRESS.md](MASTER_PROGRESS.md), 실행 큐는 [STATE.md](STATE.md).
**갱신 주체: Fable "run" 시 자동** (O-03부터 운영자는 이 파일을 편집하지 않는다 — 읽기만).

## 마지막 갱신: 2026-07-12 (Codex AI-assisted Testing Release)

## 진행률 (개수만 — 막대 없음, MASTER_PROGRESS 집계에서 파생)

| 단계 | 현황 |
|---|---|
| KB (approved 이상) | 73건 approved / stale 0 |
| Lesson 생성 · Site 반영 | 83강 generated / 83강 integrated 이상 / 83강 released / 100강 목표 |
| Verify · Release | 83강 verify PASS / 83강 released / M5 전체 위반 0 |
| Glossary · Diagrams | 408 terms / 61 SVG diagrams |

## 실행 상태

- **NEXT**: Codex 계속 실행 → `kb_needed` 5건 P-01 KB 수집.
- 승인 대기: 없음 / 에스컬레이션: 없음 / 진행 중 루프: 없음
- 병목: 백로그 `kb_needed` 17건.

## 최근 완료 (최신 5)

| 날짜 | 작업 | 실행 |
|---|---|---|
| 2026-07-12 | AI-assisted Testing Release — 1강 released, V2 Wave 32, deployment HOLD | Codex |
| 2026-07-12 | AI-assisted Testing Verify — `npm run verify` PASS, Next build 150 pages | Codex |
| 2026-07-12 | AI-assisted Testing Integration — 1강 site 반영, glossary 408개, diagram 61개, lint/typecheck PASS | Codex |
| 2026-07-12 | AI-assisted Testing Draft — 1강 generated, P-04 self QA PASS | Codex |
| 2026-07-12 | Practical Vibe Coding Release — 4강 released, V2 Wave 31, deployment HOLD | Codex |
| 2026-07-12 | Practical Vibe Coding Verify — `npm run verify` PASS, Next build 148 pages | Codex |
| 2026-07-12 | Practical Vibe Coding Integration Wave — 4강 site 반영, glossary 404개, diagram 60개, lint/typecheck PASS | Codex |
| 2026-07-12 | Practical Vibe Coding Draft Wave — 4강 generated, P-04 self QA PASS, P-05 대기 | Codex |
| 2026-07-12 | Practical Vibe Coding KB Wave — 5 KB approved, planned 5강 전환, KB 73건 | Codex |
| 2026-07-12 | V2 Wave 30 — human-ai-collaboration-patterns released, glossary 388개, diagram 56개, deploy HOLD | Codex |
| 2026-07-12 | Human-AI Collaboration P-06 — `npm run verify` PASS, Next build 140 pages | Codex |
| 2026-07-12 | Human-AI Collaboration P-05 — 1강 site 반영, glossary 388개, diagram 56개 | Codex |
| 2026-07-12 | Human-AI Collaboration P-04 — 1강 generated, self QA PASS | Codex |
| 2026-07-12 | V2 Wave 29 — AI coding tools 4강 released, glossary 384개, diagram 55개, deploy HOLD | Codex |
| 2026-07-12 | AI Coding Tools P-06 Verify — `npm run verify` PASS, Next build 138 pages | Codex |
| 2026-07-12 | AI Coding Tools P-05 Integration Wave — 4강 site 반영, glossary 384개, diagram 55개 | Codex |
| 2026-07-12 | AI Coding Tools P-04 Draft Wave — 4강 generated, P-04 self QA PASS | Codex |
| 2026-07-12 | AI Coding Tools KB Wave — 5 KB approved, planned 5강 전환, KB 68건 | Codex |
| 2026-07-11 | V2 Wave 28 — autocomplete-era released, glossary 371개, diagram 51개, M5 위반 0 | Codex |
| 2026-07-11 | V2 Wave 27 — tailwind-design-systems·frontend-testing-basics·production-env-and-secrets·ai-era-timeline released, glossary 366개, diagram 50개, M5 위반 0 | Codex |
| 2026-07-11 | P-01/P-02 KB Wave — 5 KB approved, planned 5강 전환 | Codex |
| 2026-07-11 | Model Selection Wave — model-selection-tradeoffs V2 released, glossary 346개, diagram 46개, verify PASS | Codex |
| 2026-07-11 | V1 Legacy Regeneration — 5강 V2 재생성, 다이어그램 45개, M5 전체 위반 0, verify PASS | Codex |
| 2026-07-11 | QA Remediation Wave 1 — V1 제외 M5 위반 0, 용어 340개, verify PASS | Codex |
| 2026-07-11 | M4/M5 — stale KB 0, model-selection-tradeoffs KB approved 91, 전수 QA 스크립트 생성 | Codex |
| 2026-07-11 | M3 UI/UX Refactor Phase A~C, verify PASS | Codex |
| 2026-07-08 | O-06.1 2인 체제 정리, Cline/Grok 제외 | Fable |
| 2026-07-06 | V2 Wave 14까지 67강 released | Codex/Fable |
