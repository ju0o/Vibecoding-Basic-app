# AI 운영 Dashboard

요약 현황판. 원본 데이터는 [MASTER_PROGRESS.md](MASTER_PROGRESS.md), 실행 큐는 [STATE.md](STATE.md).
**갱신 주체: Fable "run" 시 자동** (O-03부터 운영자는 이 파일을 편집하지 않는다 — 읽기만).

## 마지막 갱신: 2026-07-11 (Codex QA Remediation Wave 1)

## 진행률 (개수만 — 막대 없음, MASTER_PROGRESS 집계에서 파생)

| 단계 | 현황 |
|---|---|
| KB (approved 이상) | 58건 approved / stale 0 |
| Lesson 생성 · Site 반영 | 67강 released / 100강 목표 |
| Verify · Release | `npm run verify` PASS / V1 제외 M5 위반 0 |
| Glossary · Diagrams | 340 terms / 40 SVG diagrams |

## 실행 상태

- **NEXT**: Codex 계속 실행 → V1 레거시 5강 V2 재생성, 이후 `model-selection-tradeoffs` 강의 생성·반영.
- 승인 대기: 없음 / 에스컬레이션: 없음 / 진행 중 루프: 없음
- 병목: V1 레거시 5강 잔존, 백로그 `kb_needed` 33건.

## 최근 완료 (최신 5)

| 날짜 | 작업 | 실행 |
|---|---|---|
| 2026-07-11 | QA Remediation Wave 1 — V1 제외 M5 위반 0, 용어 340개, verify PASS | Codex |
| 2026-07-11 | M4/M5 — stale KB 0, model-selection-tradeoffs KB approved 91, 전수 QA 스크립트 생성 | Codex |
| 2026-07-11 | M3 UI/UX Refactor Phase A~C, verify PASS | Codex |
| 2026-07-08 | O-06.1 2인 체제 정리, Cline/Grok 제외 | Fable |
| 2026-07-06 | V2 Wave 14까지 67강 released | Codex/Fable |
