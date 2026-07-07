APPROVED 88

# Verification Report: github-pr-review-flow

- Target: `ai-ops/knowledge-base/entries/T04/github-pr-review-flow.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-07
- 검증 방식: docs.github.com 3개 페이지 세션 내 fetch. 리뷰 3상태 문장은 **2회 독립 fetch로 동일 텍스트 확인**(WebFetch 요약 모델의 패러프레이즈 위험 대비) — 두 fetch 결과 글자 단위 일치가 verbatim 근거.

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장 about-pull-requests/reviews/merges 역추적 |
| G2 | PASS | 14섹션 (13 + Quote Bank) |
| G3 | PASS | frontmatter 완전 (prereq 2, sources 3 checked) |
| G4 | PASS | 3 URL fetch 성공 + checked 2026-07-07 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| PR = 제안·리뷰·병합 | "Pull requests let you propose, review, and merge code changes." 일치 | PASS |
| Files changed = diff 뷰 | "differences between the proposed changes and the existing code" 일치 | PASS |
| 리뷰 3상태 (Comment/Approve/Request changes) | 2회 fetch 동일 텍스트 | PASS |
| 병합 3전략 (merge/squash/rebase) | about-pull-request-merges 3항 일치 | PASS |
| Draft PR 병합 불가 | 페이지 서술 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 17/20 | 전 주장 공식 GitHub Docs. WebFetch 요약 경유라 verbatim 신뢰도는 man 페이지보다 1급 낮게 보수 채점 |
| S2 | 15/15 | checked 오늘 |
| S3 | 13/15 | 중급 적정 — base/head, 리뷰 상태, 병합 전략 위계 명확 |
| S4 | 8/10 | 제안·리뷰·병합 전략·초안 4시나리오 구체 |
| S5 | 9/10 | AI diff 검토 무대·required review 게이트·squash 정리 연결 |
| S6 | 13/15 | 장면 4·실수 4 |
| S7 | 13/15 | prereq(git-branch/log-diff) 실존, successor(gh-cli) 연결. glossary 등재는 강의 단계 |
| Total | 88/100 | Approved |

## Required Fixes
- None blocking. 공개 전환(모드 B) 시 GitHub Docs 인용은 운영자가 citation-review에서 재확인 권장(요약 모델 경유분).
