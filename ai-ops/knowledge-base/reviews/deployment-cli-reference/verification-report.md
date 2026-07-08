APPROVED 88

# Verification Report: deployment-cli-reference

- Target: `ai-ops/knowledge-base/entries/T06/deployment-cli-reference.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-08
- 검증 방식: Vercel CLI Overview(원문 마크다운 그대로 반환, 명령별 설명 다수) 세션 내 fetch. Firebase CLI 페이지는 JS 렌더링으로 body 미노출 → Firebase는 이 프로젝트의 실제 배포 명령(firebase-tools deploy)으로 대응(quote 없이 근거 표기).

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 인용 Vercel CLI Overview 역추적. Firebase 부분은 프로젝트 명령 근거(quote 아님) |
| G2 | PASS | 14섹션 (13 + Quote Bank 5) |
| G3 | PASS | frontmatter 완전 (prereq deployment-platforms/npm-scripts 실존, source 1) |
| G4 | PASS | 1 URL fetch + checked 2026-07-08 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| CLI 정의(터미널·자동화) | "interact with the Vercel platform using a terminal, or through an automated system" 일치 | PASS |
| vercel deploy 기본 명령 | "Deploy your Vercel projects. Default command when no subcommand is specified." 일치 | PASS |
| vercel rollback | "Roll back production deployments to previous deployments." 일치 | PASS |
| CI 토큰 환경변수 권장 | "Using the VERCEL_TOKEN environment variable is recommended for CI/CD..." 일치 | PASS |
| Firebase 배포 명령 | 프로젝트 DEPLOY-GUIDE의 firebase-tools deploy와 일치(quote 아님) | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 17/20 | Vercel CLI(원문 마크다운) verbatim 확실. Firebase는 quote 없이 프로젝트 근거 — 정직하게 표기 |
| S2 | 15/15 | checked 오늘 |
| S3 | 13/15 | 중급 reference 적정 — deploy/rollback/promote/토큰 위계 명확 |
| S4 | 9/10 | 배포·롤백·스크립트화·CI인증 4실무 |
| S5 | 9/10 | AI 배포 시 토큰 노출·--prod 오배포 검토 지점 |
| S6 | 12/15 | 장면 4·실수 4 |
| S7 | 13/15 | prereq 실존, npm-scripts·ci-cd·monitoring·env 연결 강함 |
| Total | 88/100 | Approved |

## Required Fixes
- None blocking. Firebase CLI 공식 verbatim은 JS 렌더링으로 미확보 → 강의에서도 Firebase는 이 프로젝트 실제 명령으로 예시(quote는 Vercel 중심). 향후 Firebase CLI 정적 문서 확보 시 보강 가능.
