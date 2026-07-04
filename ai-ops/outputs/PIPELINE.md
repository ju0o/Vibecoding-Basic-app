# 파이프라인 상태 보드

각 Agent는 작업 완료 시 자기 행만 갱신한다. (KB 체제 — WF-06)

## Knowledge Base 보드
상태: `draft → reviewing → recollect(n) → approved` (예외: `escalated`, `stale`)

| KB id | 주제군 | 상태 | Score | 갱신일 | 비고 |
|---|---|---|---|---|---|

## 강의 보드
상태: `planned → generated → integrated → build_fail(n) → verified → released` (예외: `escalated`)
(구 체제 상태값 `backlog → briefed → ... → released`는 파일럿 기록에만 남음)

| slug | 모듈 | 상태 | 현재 담당 | 갱신일 | 비고 |
|---|---|---|---|---|---|
| from-prompt-to-system | ai-system-design | integrated | Release | 2026-07-04 | Gate 1~3 PASS, 통합 완료. **Gate 4(verify) 운영자 중단으로 대기** — reports/2026-07-04-pilot-report.md |

## 배치 기록
| 배치 | slug 목록 | 시작 | 릴리스 | 비고 |
|---|---|---|---|---|
