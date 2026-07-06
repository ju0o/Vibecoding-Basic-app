APPROVED 92

# Verification Report: git-log-diff-show

- Target: `ai-ops/knowledge-base/entries/T04/git-log-diff-show.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-06
- 검증 방식: 3개 man 페이지 세션 내 직접 fetch, 인용 전건 원문 일치

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장 역추적 (읽기 전용 주장은 DESCRIPTION의 표시·나열 서술을 근거로 명시) |
| G2 | PASS | 14섹션 |
| G3 | PASS | frontmatter 완전 |
| G4 | PASS | 3 URL fetch 성공 + checked |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| log = parent 링크 도달 가능성 나열 + ^ 제외 | git-log 원문 일치 | PASS |
| 기본 역시간순 | git-log 원문 일치 | PASS |
| diff 비교쌍 6종 | git-diff 원문 일치 | PASS |
| show 대상 4종 객체 | git-show 원문 일치 | PASS |
| 커밋 show = 메시지+diff, 병합은 --cc 형식 | git-show 원문 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 19/20 | 전 주장 공식 출처 |
| S2 | 15/15 | checked 오늘 |
| S3 | 14/15 | 기초 적정 — "읽기 전용 계층" 프레임이 학습 순서상 유효 |
| S4 | 8/10 | main..feature 도달 가능성 질의 예시 구체 |
| S5 | 10/10 | "AI 보고 실측 대조" 운영 원칙과의 연결이 프로젝트 실사례 기반 |
| S6 | 14/15 | 장면 3·실수 4 |
| S7 | 12/15 | related·prereq 실존. diff/log 용어 glossary 등재는 강의 단계 |
| Total | 92/100 | Approved |

## Required Fixes
- None blocking.
