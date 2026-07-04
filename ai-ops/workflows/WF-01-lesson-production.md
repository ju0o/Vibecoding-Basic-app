# WF-01 강의 생산 Workflow (아이디어 → 배포)

> **status: superseded (2026-07-04)** — [WF-06 Knowledge Pipeline](WF-06-knowledge-pipeline.md)로 대체됨. 핵심 변화: 강의별 리서치 브리프 → 검증된 KB 문서가 입력, 강의별 Fact Check → KB 단계에서 선행 수행. 이 문서는 이력 보존용 (파일럿 1회가 이 워크플로로 완주됨).

강의 1개가 거치는 표준 경로. 모든 단계는 **파일 산출물**로 끝나며, 다음 단계는 그 파일만 입력으로 받는다.

```
[0 아이디어] → [1 리서치] → [2 집필(병렬 3작업)] → [3 검증(병렬 2작업)] → [4 QA 게이트] → [5 통합] → [6 릴리스]
```

## 단계 정의

### 0. 아이디어 등록
| | |
|---|---|
| 담당 | Curriculum Agent |
| 입력 | 운영자 지시, 커리큘럼 갭 분석 |
| 출력 | `outputs/00-backlog/BACKLOG.md`에 행 추가 (slug, 모듈, order, 레벨, 선행 강의) |
| 품질 기준 | 중복 없음, 선행 강의가 먼저 존재하거나 backlog 상위에 있음 |
| 다음 단계 | 운영자가 우선순위 승인 → 1로 |

### 1. 리서치
| | |
|---|---|
| 담당 | Research Agent |
| 입력 | backlog 항목, `sources/SOURCE-REGISTRY.md` |
| 출력 | `outputs/01-briefs/{slug}.md` |
| 품질 기준 | 출처 5+개(공식 60%+), 모든 주장에 URL, 13섹션 재료 커버 |
| 다음 단계 | 브리프 존재 확인 → 2로 (병렬 시작 가능) |

### 2. 집필 — 같은 slug 내 3작업 병렬
| 작업 | 담당 | 출력 |
|---|---|---|
| 본문 | Lesson Writer Agent | `outputs/02-drafts/{slug}/lesson.md` + `meta.md` |
| 퀴즈 | Quiz Agent | `outputs/02-drafts/{slug}/quiz.md` |
| 용어 | Terminology Agent | `outputs/02-drafts/{slug}/terms.md` |

- 입력은 셋 다 브리프. 서로 다른 파일에 쓰므로 충돌 없음.
- 품질 기준: 각 Agent의 DoD (agents/*.md 참조)
- 다음 단계: 3개 파일이 모두 존재하면 → 3으로

### 3. 검증 — 2작업 병렬
| 작업 | 담당 | 출력 | 판정 |
|---|---|---|---|
| 사실 검증 | Fact Check Agent (작성자와 다른 Executor) | `outputs/03-reviewed/{slug}/fact-check-report.md` | PASS / FIX / BLOCK |
| 교육 검증 | Education Review Agent | `outputs/03-reviewed/{slug}/edu-review-report.md` | PASS / FIX |

- **FIX 발생 시 루프**: 보고서를 입력으로 Lesson Writer가 수정 → 해당 검증만 재실행. 최대 2회 루프, 3회째도 FIX면 운영자 에스컬레이션.
- BLOCK 발생 시: 해당 문장 삭제 또는 브리프 보강(1로 회귀).
- 다음 단계: 두 보고서 모두 PASS → 4로

### 4. QA 게이트
| | |
|---|---|
| 담당 | QA Agent |
| 입력 | drafts 전체 + 두 검증 보고서 + `src/content/schema.ts`, `curriculum.ts`, `glossary.ts` |
| 출력 | `outputs/03-reviewed/{slug}/qa-report.md` + PASS 시 `final/` 폴더 |
| 품질 기준 | `qa/QA-GATES.md` Gate 3 전 항목 PASS |
| 다음 단계 | PASS → 5로. FAIL → 원인 Agent에게 반려 |

### 5. 사이트 통합 — **순차 전용**
| | |
|---|---|
| 담당 | Site Integration Agent (동시에 1개 배치만) |
| 입력 | `outputs/03-reviewed/{slug}/final/` |
| 출력 | `src/content/` 변경 + `outputs/04-integrated/{slug}.md` |
| 품질 기준 | lint + typecheck 통과, 강의가 사이트에서 렌더링됨 |
| 다음 단계 | 배치의 모든 slug 통합 완료 → 6으로 |

### 6. 릴리스
| | |
|---|---|
| 담당 | Release Agent |
| 입력 | 통합 완료된 워킹 트리 |
| 출력 | `npm run verify` 결과 + `RELEASE-{date}.md` + (운영자 승인 후) 배포 |
| 품질 기준 | verify 4단계 전체 통과 |
| 다음 단계 | PIPELINE.md 상태를 `released`로 갱신, 종료 |

## 상태 추적

`outputs/PIPELINE.md`의 상태 값:
`backlog → briefed → drafting → drafted → reviewing → fix_loop → qa → final → integrated → released`
(+ 예외 상태: `blocked`, `escalated`)

각 단계 완료 시 담당 Agent가 자기 slug의 행을 갱신한다. PIPELINE.md는 append/행 단위 수정만 하므로 충돌 위험이 낮지만, 동시 편집이 잦아지면 slug별 status 파일로 전환한다 (ROADMAP Phase 2 참조).

## 소요 기준 (배치 운영 시)

- 강의 5개 배치 기준: 리서치 5개 병렬 → 집필 15작업 병렬 → 검증 10작업 병렬 → QA 배치 1회 → 통합 순차 1세션 → 릴리스 1회
- 병목은 항상 5(통합)이다. 통합을 배치로 몰아서 하루 1회만 실행하는 것을 권장.
