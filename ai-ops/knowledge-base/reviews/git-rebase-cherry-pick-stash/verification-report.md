APPROVED 91

# Verification Report: git-rebase-cherry-pick-stash

- Target: `ai-ops/knowledge-base/entries/T04/git-rebase-cherry-pick-stash.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-07
- 검증 방식: 3개 man 페이지 세션 내 직접 fetch — 인용 전건 fetch 원문과 글자 단위 일치

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장 git-rebase/cherry-pick/stash 원문 역추적 (rebase 다이어그램 예시 포함) |
| G2 | PASS | 14섹션 (13 + Quote Bank) |
| G3 | PASS | frontmatter 완전 |
| G4 | PASS | 3 URL fetch 성공 + checked 2026-07-07 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| rebase = 커밋 재적용, A→A' 새 커밋 생성 | rebase NAME + 다이어그램 예시 일치 | PASS |
| 공유 브랜치 재작성 경고 | "bad idea... forced to manually fix" 원문 일치 | PASS |
| --continue/--abort/--skip 제어 | rebase Common Commands 일치 | PASS |
| cherry-pick clean 전제 + 커밋별 새 커밋 + 충돌 마커 | cherry-pick DESCRIPTION 1~5항 일치 | PASS |
| stash 보관+HEAD 되돌림, list/show/apply | stash DESCRIPTION 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 19/20 | 전 주장 공식 man 페이지 |
| S2 | 15/15 | checked 오늘 |
| S3 | 14/15 | 중급 적정 — 공유 전/후 경계가 선행 KB(restore-reset-revert)와 일관 |
| S4 | 8/10 | PR 정리·핫픽스 이식·전환 전 치우기 시나리오 구체 |
| S5 | 10/10 | AI wip 커밋 정리(rebase -i)·선별 이식(cherry-pick) 연결 구체 |
| S6 | 14/15 | 장면 4·실수 4 |
| S7 | 11/15 | related/prereq 실존. rebase/stash 용어 glossary 등재는 강의 단계 |
| Total | 91/100 | Approved |

## Required Fixes
- None blocking.
