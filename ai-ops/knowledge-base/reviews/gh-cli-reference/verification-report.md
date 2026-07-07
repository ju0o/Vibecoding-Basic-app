APPROVED 89

# Verification Report: gh-cli-reference

- Target: `ai-ops/knowledge-base/entries/T04/gh-cli-reference.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-07
- 검증 방식: cli.github.com/manual 6개 페이지 세션 내 fetch. 명령·플래그 설명은 매뉴얼의 짧은 정형 문장이라 요약 모델 왜곡 위험 낮음(man 페이지급 신뢰도).

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 명령·플래그 gh_pr_* 매뉴얼 역추적 |
| G2 | PASS | 14섹션 (13 + Quote Bank) |
| G3 | PASS | frontmatter 완전 (prereq github-pr-review-flow, sources 6) |
| G4 | PASS | 6 URL fetch (gh_pr_status만 페이지 미노출로 KB에서 제외) + checked 2026-07-07 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| gh pr create = "Create a pull request on GitHub." | gh_pr_create 상단 일치 | PASS |
| review 플래그 --approve/--comment/--request-changes | gh_pr_review 플래그 일치 | PASS |
| merge 플래그 --squash "Squash the commits into one commit and merge it into the base branch" | gh_pr_merge 일치 | PASS |
| gh pr checkout = "Check out a pull request in git" | gh_pr_checkout 일치 | PASS |
| gh pr list 기본 open만 | "By default, this only lists open PRs." 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 18/20 | 전 주장 공식 CLI 매뉴얼, 정형 문장 verbatim 신뢰 높음 |
| S2 | 15/15 | checked 오늘 |
| S3 | 13/15 | 중급 적정 — 개념(PR flow)↔명령 1:1 대응 구조가 학습 효율적 |
| S4 | 9/10 | create/review/checkout/merge 4실무 명령 예시 구체 |
| S5 | 9/10 | AI 에이전트가 실행하는 실제 명령이라는 연결 강함 |
| S6 | 12/15 | 장면 4·실수 4, gh pr status 누락은 경미 |
| S7 | 13/15 | prereq(github-pr-review-flow) 실존 연결. glossary 등재는 강의 단계 |
| Total | 89/100 | Approved |

## Required Fixes
- None blocking. gh pr status 한 줄 설명은 매뉴얼 페이지 재노출 시 보강 가능(현재 KB는 미포함으로 정확).
