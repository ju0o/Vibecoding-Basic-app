APPROVED 92

# Verification Report: git-restore-reset-revert

- Target: `ai-ops/knowledge-base/entries/T04/git-restore-reset-revert.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-06
- 검증 방식: 3개 man 페이지 세션 내 직접 fetch, 인용 전건 원문 일치

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장 역추적 — 3형제 용도 구분은 git-revert Note 원문이 직접 근거 |
| G2 | PASS | 14섹션 |
| G3 | PASS | frontmatter 완전 |
| G4 | PASS | 3 URL fetch 성공 + checked |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| restore 기본 대상 워킹 트리 + --staged 인덱스 | git-restore 원문 일치 | PASS |
| 소스에 없는 추적 파일 제거 | git-restore 원문 일치 | PASS |
| --soft/--mixed/--hard 각 정의 | git-reset 원문 일치 (soft의 HEAD~5 예시 포함) | PASS |
| --hard의 미추적 파일 덮어쓰기 가능 | git-reset 원문 일치 | PASS |
| revert = 반대 패치 새 커밋 + clean 전제 | git-revert 원문 일치 | PASS |
| 공유 이력엔 revert 권고 | git-revert Note 원문 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 19/20 | 전 주장 공식 출처, Note 원문이 핵심 구분의 직접 근거 |
| S2 | 15/15 | checked 오늘 |
| S3 | 14/15 | 중급 적정 — 파괴 반경 경고가 학습 안전에 직결 |
| S4 | 9/10 | 4개 시나리오 전부 명령 수준으로 구체 (soft HEAD~5는 문서 자체 예시) |
| S5 | 10/10 | AI 협업 안전장치 프레임 + Loop B revert 절차 연결 |
| S6 | 14/15 | 장면 4·실수 4 |
| S7 | 11/15 | related 실존. restore의 checkout 분리 서술은 문서 체계 해석 (branch KB와 동일 감점) |
| Total | 92/100 | Approved |

## Required Fixes
- None blocking.
