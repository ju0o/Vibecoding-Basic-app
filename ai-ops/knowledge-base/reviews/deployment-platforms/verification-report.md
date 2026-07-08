APPROVED 89

# Verification Report: deployment-platforms

- Target: `ai-ops/knowledge-base/entries/T06/deployment-platforms.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-08
- 검증 방식: Firebase Hosting 문서 + Vercel Deployments 문서 세션 내 fetch. Vercel은 원문 마크다운 그대로 반환되어 verbatim 신뢰 매우 높음.

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장 Firebase Hosting·Vercel Deployments 역추적 |
| G2 | PASS | 14섹션 (13 + Quote Bank 5) |
| G3 | PASS | frontmatter 완전 (prereq build-and-runtime 실존, sources 2) |
| G4 | PASS | 2 URL fetch + checked 2026-07-08 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| Firebase Hosting 정의 | "provides fast and secure hosting for your web app" 일치 | PASS |
| CDN 엣지 캐시 | "cached on SSDs at CDN edges around the world" 일치 | PASS |
| zero-config SSL | "Zero-configuration SSL is built into Firebase Hosting" 일치 | PASS |
| Vercel 배포 정의 | "the result of a successful build of your project" 일치 | PASS |
| 배포마다 고유 URL | "generates a unique URL" 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 18/20 | 공식 문서 2종. Vercel 원문 마크다운 그대로라 verbatim 확실 |
| S2 | 15/15 | checked 오늘 |
| S3 | 13/15 | 기초 적정 — 정적/서버 모델 구분, 이 사이트 사례 |
| S4 | 8/10 | 정적배포·미리보기·Git연동·롤백 4실무 |
| S5 | 9/10 | AI 정적 모델에 서버 코드 배포 실패 검토 지점 |
| S6 | 13/15 | 장면 4·실수 4 |
| S7 | 13/15 | prereq/successor 실존, nextjs·PR 연결 |
| Total | 89/100 | Approved |

## Required Fixes
- None blocking. 제품 문서(Firebase·Vercel)는 변경 가능성 있어 checked 날짜 관리 중요 — 기록됨.
