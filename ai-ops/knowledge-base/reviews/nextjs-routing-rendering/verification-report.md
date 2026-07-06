APPROVED 89

# Verification Report: nextjs-routing-rendering

- Target: `ai-ops/knowledge-base/entries/T03/nextjs-routing-rendering.md`
- Executor: Fable (대행 — Codex 토큰 소진, 운영자 승인), P-02
- Checked: 2026-07-06
- 검증 방식 특기: 이 KB의 전 인용은 같은 세션에서 WebFetch로 직접 수집한 원문에서 나옴 — 수집 fetch 기록이 곧 재접속 대조 근거 (Next.js docs v16.2.10, lastUpdated 2026-06-23 메타 확인)

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1. BLOCK 주장 0건 | PASS | 전 사실 주장이 layouts-and-pages·server-and-client-components 두 문서로 역추적됨 |
| G2. 13섹션+Quote Bank | PASS | 기계 점검 14/14 |
| G3. frontmatter 완전 | PASS | id/topicGroup/level/sources/updated 존재 |
| G4. URL 접속+날짜 | PASS | 2건 모두 2026-07-06 fetch 성공, checked 기록 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| 파일 시스템 라우팅 정의 | 원문 "Next.js uses file-system based routing..." 일치 | PASS |
| layout 재렌더링 면제 | 원문 "preserve state, remain interactive, and do not rerender" 일치 | PASS |
| Server Components 기본값 | 원문 "By default, layouts and pages are Server Components..." 일치 | PASS |
| use client 경계·번들 포함 규칙 | 원문 boundary/module graph 절 일치 | PASS |
| searchParams → 동적 렌더링 | 원문 "opts your page into dynamic rendering" 일치 | PASS |
| 루트 레이아웃 html/body 필수 | 원문 "required and must contain html and body tags" 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 공식 출처 | 17/20 | 전 주장 공식 출처·100% 벤더 문서. 단 sources가 2건으로 얇음 (use-client 레퍼런스 등 미수집) — 감점 |
| S2 최신성 | 15/15 | 문서 버전(16.2.10)·갱신일 명시, checked 오늘 |
| S3 교육 적합성 | 14/15 | 중급 적정, prereq 논리적 (react-component-model 실존) |
| S4 예시 품질 | 8/10 | 사용 장면 구체 (사이트 자체 [slug] 예시 포함), 실행 코드 예시는 강의 단계로 위임 |
| S5 AI 연관성 | 10/10 | Server/Client 경계 = AI 산출물 리뷰 체크포인트 연결 구체적 |
| S6 실무 활용성 | 13/15 | 장면 4·실수 4, 전부 문서 근거 |
| S7 용어 일관성 | 12/15 | related/prereq id 전부 실존. Next.js 세부 용어(RSC Payload 등) glossary 등재는 강의 단계 권고 |
| Total | 89/100 | Approved |

## Required Fixes
- None blocking. 권고: 후속 개정 시 use-client·dynamic-routes 레퍼런스 페이지를 sources에 보강.
