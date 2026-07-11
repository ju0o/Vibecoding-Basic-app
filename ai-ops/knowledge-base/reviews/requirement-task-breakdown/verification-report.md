APPROVED 89

# P-02 Verification Report — requirement-task-breakdown

## Verdict

- Verdict: APPROVED
- Score: 89
- Date: 2026-07-12
- Reviewer: Codex

## Gate Check

| Gate | Result | Evidence |
|---|---|---|
| G1. 출처 확인 불가 주장 0건 | PASS | 5개 source URL 재접속 200 OK. Cursor Plan Mode HTML meta 원문 대조 PASS |
| G2. 필수 섹션 | PASS | 14개 `##` 섹션 존재: 13개 KB 섹션 + Quote Bank |
| G3. frontmatter | PASS | id, topicGroup, level, sources, updated, status, score 존재 |
| G4. URL 접속·확인일 | PASS | 모든 source에 checked: 2026-07-12 존재 |

## Source Registry Check

| Source | Registry status |
|---|---|
| GitHub Docs | 1순위 벤더 공식 문서 |
| Cursor Docs | 1순위 벤더 공식 문서 |

Official-source ratio: 100%.

## Claim Verification

| Claim | Source | Result |
|---|---|---|
| GitHub Issues는 work를 plan and track하는 데 사용된다 | GitHub Docs — Quickstart for GitHub Issues | PASS |
| Sub-issues는 larger pieces of work를 tasks로 나눈다 | GitHub Docs — Adding sub-issues | PASS |
| Prompt는 broad description 뒤에 specific requirements를 둔다 | GitHub Docs — Prompt engineering | PASS |
| Repository custom instructions는 build, test, validate 안내를 제공할 수 있다 | GitHub Docs — Cloud agent best results | PASS |
| Cursor Plan Mode는 code 작성 전 reviewable implementation plan을 생성한다 | Cursor Docs — Plan Mode | PASS |

## Quote Bank Check

| Quote | Result |
|---|---|
| "plan and track a piece of work" | PASS |
| "break down larger pieces of work into tasks" | PASS |
| "Start general, then get specific" | PASS |
| "build, test and validate its changes" | PASS |
| "Create detailed implementation plans before writing code" | PASS |

## Score

| Criterion | Score | Rationale |
|---|---:|---|
| S1 공식 출처 | 20/20 | 전부 공식·등록 출처 |
| S2 최신성 | 15/15 | checked 2026-07-12 |
| S3 교육 적합성 | 13/15 | 입문자용 정의와 선행 개념 적합 |
| S4 예시 품질 | 8/10 | task breakdown 예시 충분 |
| S5 AI 시대 연관성 | 9/10 | agent task와 validation 연결 |
| S6 실무 활용성 | 12/15 | issue, sub-issue, plan 활용 설명 |
| S7 용어 일관성 | 12/15 | related/prerequisites 실존 또는 같은 배치 |
| Total | 89/100 | APPROVED |

## Notes

- No recollection required.
- P-04 lesson generation can use this KB after commit.
