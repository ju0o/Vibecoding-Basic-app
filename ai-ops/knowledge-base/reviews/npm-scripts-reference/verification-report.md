APPROVED 89

# Verification Report: npm-scripts-reference

- Target: `ai-ops/knowledge-base/entries/T06/npm-scripts-reference.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-08
- 검증 방식: npm 공식 문서(scripts, CLI v10) 세션 내 fetch. 명령·규칙 정형 문구 verbatim 신뢰 높음.

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장 npm scripts 문서 역추적 |
| G2 | PASS | 14섹션 (13 + Quote Bank 4) |
| G3 | PASS | frontmatter 완전 (prereq package-json-and-semver 실존, source 1) |
| G4 | PASS | 1 URL fetch + checked 2026-07-08 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| scripts 필드 역할 | "supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts" 일치 | PASS |
| pre/post 규칙 | "premyscript, myscript, postmyscript" 일치 | PASS |
| npm run = npm run-script | "npm run-script <stage> or npm run <stage> for short" 일치 | PASS |
| 의존성 스크립트 | "npm explore <pkg> -- npm run <stage>" 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 18/20 | 전 주장 npm 공식. 정형 명령·규칙 verbatim 신뢰 높음 |
| S2 | 15/15 | checked 오늘 |
| S3 | 13/15 | 기초 적정 — reference형 명령·규칙 정리 명확 |
| S4 | 9/10 | 표준화·검증파이프·pre/post·프로젝트파악 4실무 |
| S5 | 9/10 | AI가 scripts로 실행법 파악·pre/post 검토 연결(이 사이트 npm run verify 사례) |
| S6 | 12/15 | 장면 4·실수 4 |
| S7 | 13/15 | prereq 실존, build-and-runtime 연결 |
| Total | 89/100 | Approved |

## Required Fixes
- None blocking. 강의에서 이 프로젝트의 실제 scripts(dev/build/verify)를 예시로 활용 권장.
