# 파이프라인 상태 보드

각 Agent는 작업 완료 시 자기 slug의 행만 갱신한다.
상태: `backlog → briefed → drafting → drafted → reviewing → fix_loop → qa → final → integrated → released` (예외: `blocked`, `escalated`)

| slug | 모듈 | 상태 | 현재 담당 | 갱신일 | 비고 |
|---|---|---|---|---|---|
| from-prompt-to-system | ai-system-design | backlog | Curriculum | 2026-07-03 | Phase 1 파일럿 후보 — 운영자 승인 대기 |

## 배치 기록
| 배치 | slug 목록 | 시작 | 릴리스 | 비고 |
|---|---|---|---|---|
