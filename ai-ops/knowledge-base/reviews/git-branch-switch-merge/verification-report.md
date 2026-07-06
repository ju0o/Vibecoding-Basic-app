APPROVED 90

# Verification Report: git-branch-switch-merge

- Target: `ai-ops/knowledge-base/entries/T04/git-branch-switch-merge.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-06
- 검증 방식: 3개 man 페이지 세션 내 직접 fetch, 인용 전건 원문 일치

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장 git-branch/switch/merge 역추적 |
| G2 | PASS | 14섹션 |
| G3 | PASS | frontmatter 완전 |
| G4 | PASS | 3 URL fetch 성공 + checked |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| 브랜치 = HEAD를 가리키는 새 branch head | git-branch 원문 일치 | PASS |
| switch의 워킹트리·인덱스 갱신 + 이후 커밋 위치 | git-switch 원문 일치 | PASS |
| switch -c 생성+전환 | git-switch 원문 일치 | PASS |
| merge = 분기 이후 변경을 현재 브랜치로 편입 | git-merge 원문 일치 | PASS |
| pull이 merge 사용 | git-merge 원문 일치 | PASS |
| 충돌 시 임의 선택 없음·양쪽 보존 | git-merge 원문 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 19/20 | 전 주장 공식 출처 |
| S2 | 15/15 | checked 오늘 |
| S3 | 14/15 | 기초 적정, prereq 실존 |
| S4 | 8/10 | 방향 실수·전환 실수 시나리오 구체 |
| S5 | 9/10 | AI 작업 브랜치 격리 연결 — 타당하나 일반적 |
| S6 | 14/15 | 장면 3·실수 4 |
| S7 | 11/15 | 역사 섹션의 checkout 분리 서술은 fetch 문서의 직접 문장이 아닌 문서 체계 해석 — 과장 없는 수준이나 감점. related 실존 |
| Total | 90/100 | Approved |

## Required Fixes
- None blocking. 권고: checkout 역사 서술은 강의화 시 git(1) 원문 확인 후 인용으로 승격하거나 해석임을 유지.
