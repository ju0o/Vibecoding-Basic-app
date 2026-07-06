APPROVED 91

# Verification Report: git-init-add-commit-status

- Target: `ai-ops/knowledge-base/entries/T04/git-init-add-commit-status.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-06
- 검증 방식: 4개 man 페이지를 이 세션에서 직접 fetch — 인용 전건이 fetch 원문과 글자 단위 일치 확인

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장이 git-init/add/commit/status man 페이지로 역추적 |
| G2 | PASS | 14섹션 기계 점검 통과 |
| G3 | PASS | frontmatter 완전 |
| G4 | PASS | 4 URL 전건 fetch 성공 + checked 기록 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| .git 하위 구조 (objects, refs/heads, refs/tags) | git-init DESCRIPTION 원문 일치 | PASS |
| init 재실행 안전 | 원문 "safe. It will not overwrite" 일치 | PASS |
| staged-only 커밋 규칙 | git-add 원문 일치 | PASS |
| 커밋 = HEAD 직계 자식 + 브랜치 갱신 | git-commit 원문 일치 ([...] 생략 표기 적절) | PASS |
| status 세 묶음 구분 | git-status 원문 일치 | PASS |
| --amend = 브랜치 끝 교체 | git-commit 원문 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 19/20 | 4 sources 전건 공식 man 페이지, 전 주장 출처 |
| S2 | 15/15 | checked 오늘 |
| S3 | 14/15 | 기초 적정, prereq(files-folders-paths·terminal-shell-commands) 실존 |
| S4 | 8/10 | add -p 선별 수용 시나리오 구체, 명령 예시는 레퍼런스 강의로 위임 |
| S5 | 10/10 | AI 변경 선별 수용·커밋 체크포인트 연결 + 프로젝트 실사례(P-08 누락) 인용 |
| S6 | 14/15 | 장면 4·실수 4 전부 문서 근거 |
| S7 | 11/15 | related 중 git-restore-reset-revert는 이번 배치 내 실존. Git 용어(index/staging 등) glossary 등재 필요 — 강의 단계 권고 |
| Total | 91/100 | Approved |

## Required Fixes
- None blocking. 권고: 레퍼런스 강의에서 index/staging area/HEAD/untracked 용어를 glossary에 등재.
