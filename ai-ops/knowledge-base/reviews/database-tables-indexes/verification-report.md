APPROVED 90

# Verification Report: database-tables-indexes

- Target: `ai-ops/knowledge-base/entries/T05/database-tables-indexes.md`
- Executor: Fable (대행), P-02 / Checked: 2026-07-07
- 검증 방식: PostgreSQL 공식 문서 2개(Table Basics, Indexes Introduction) 세션 내 fetch. 정밀 기술 산문이라 verbatim 신뢰 높음.

## Gate Verdict
| Gate | Verdict | Evidence |
|---|---:|---|
| G1 | PASS | 전 주장 PostgreSQL Table Basics·Indexes 역추적 |
| G2 | PASS | 14섹션 (13 + Quote Bank) |
| G3 | PASS | frontmatter 완전 (prereq api-db-backend-flow, sources 2) |
| G4 | PASS | 2 URL fetch 성공 + checked 2026-07-07 |

## Sentence-Level Verification (표본)
| Claim | Source check | Verdict |
|---|---|---|
| 테이블 = 행과 열, 종이 표 은유 | "much like a table on paper: It consists of rows and columns" 일치 | PASS |
| 데이터 타입 = 값 제한 + 의미 부여 | Table Basics 원문 일치 | PASS |
| 인덱스 유지 오버헤드 | "adds overhead to data manipulation operations" 일치 | PASS |
| 인덱스가 UPDATE/DELETE/join도 가속 | Indexes Introduction 일치 | PASS |
| 안 쓰는 인덱스 제거 권장 | "seldom or never used ... should be removed" 일치 | PASS |

## Knowledge Score
| Criterion | Score | Rationale |
|---|---:|---|
| S1 | 18/20 | 전 주장 PostgreSQL 공식 문서, 정밀 산문 verbatim 신뢰 높음 |
| S2 | 15/15 | checked 오늘 |
| S3 | 14/15 | 기초 적정 — 테이블/타입/인덱스 위계, 인덱스 트레이드오프 명확 |
| S4 | 9/10 | 스키마·조회 가속·감사·트레이드오프 4실무 구체 |
| S5 | 9/10 | AI 인덱스 제안의 비용 검증 지점 연결 강함 |
| S6 | 13/15 | 장면 4·실수 4 |
| S7 | 12/15 | prereq api-db-backend-flow(현재 V1 released 레슨) 연결. glossary 등재는 강의 단계 |
| Total | 90/100 | Approved |

## Required Fixes
- None blocking. prereq api-db-backend-flow는 현재 V1 레슨(KB 없음) — 해당 KB의 v2 재생성 시 관계 재확인 권장.
