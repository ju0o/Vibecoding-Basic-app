# WF-06 Knowledge Pipeline (마스터 Workflow — WF-00·WF-01 대체)

자료 수집부터 릴리스까지의 단일 파이프라인. **KB가 SSOT**이며, 두 개의 자동 루프(지식 루프, 빌드 루프)를 포함한다.

```
┌────────────────────── 지식 생산 ──────────────────────┐
│ [Codex P-01] 자료 수집 → KB 생성 (status: draft)       │
│      ↓                                                │
│ [Codex P-02] Fact Check → 출처 검증 → 교육 검토         │
│              → Knowledge Score 평가                    │
│      ↓                                                │
│  ┌─ 미달(<80 또는 게이트 실패) ──────────────┐          │
│  │   재수집 요청서 생성                       │          │
│  │   → [Codex P-03] 재수집 (최대 2회)          │          │
│  │   → P-02 재평가 ──────────────────────────┘ (Loop A) │
│  └─ 3회 미달 → escalated, 운영자 판단                   │
│      ↓ 통과 (status: approved, score 기록)             │
│      ↓ 통과 후 P-04로 연속 진행 (Fable은 Phase 5 감사)  │
└───────────────────────────────────────────────────────┘
┌────────────────────── 콘텐츠 생산 ─────────────────────┐
│ [Codex P-04] Lesson 생성 (approved KB만 입력)          │
│      ↓                                                │
│ [Codex P-05] 사이트 반영 (curriculum.ts 등 — 순차 전용)  │
│      ↓                                                │
│ [Cline P-06] Build → Lint → Test → npm run verify     │
│      ↓                                                │
│  ┌─ 실패 ──────────────────────────────────┐          │
│  │   실패 보고서 생성                        │          │
│  │   → [Codex P-07] 통합 수정 (콘텐츠 무수정) │          │
│  │   → [Cline P-06] 재검증 (루프 최대 2회) ──┘ (Loop B) │
│  └─ 3회 실패 → 통합 되돌림(revert), 운영자 판단          │
│      ↓ 통과                                           │
│ [Cline P-08] Release (릴리스 노트, 커밋 — 배포는 승인 후) │
└───────────────────────────────────────────────────────┘
```

## 단계 상세

### 1. KB 수집·생성 — Codex, P-01
| | |
|---|---|
| 입력 | `sources/COLLECTION-PLAN.md` 주제군, `knowledge-base/_TEMPLATE.md`, 배정된 개념 목록 |
| 출력 | `knowledge-base/entries/{Txx}/{id}.md` (status: draft) |
| 품질 기준 | 13섹션 전부 작성, 모든 주장에 URL+확인 날짜 |
| 실패 시 | — (시작점. 템플릿 미준수는 P-02가 게이트로 잡음) |
| 병렬 | **개념 간 무제한 병렬** (개념 1개 = 파일 1개) |

### 2. KB 검증·스코어 — Codex, P-02
| | |
|---|---|
| 입력 | draft KB 문서, `qa/KNOWLEDGE-SCORE.md`, `sources/SOURCE-REGISTRY.md`, `src/content/glossary.ts`(표기 기준) |
| 출력 | `knowledge-base/reviews/{id}/verification-report.md` (사실·출처·교육 검토 + 점수표) / 통과 시 KB frontmatter `status: approved, score: NN` 갱신 / 미달 시 `recollection-request-{n}.md` |
| 품질 기준 | KNOWLEDGE-SCORE.md의 게이트 4 + 기준 7 전부 판정 |
| 실패 시(Loop A) | 재수집 요청서 → 3단계. **루프 카운터는 요청서 파일명의 {n}** — n=3이면 생성하지 말고 escalated 보고 |
| 병렬 | 개념 간 병렬. 같은 흐름에서 P-01 직후 P-02 연속 실행 가능. 단 같은 개념의 P-02와 P-03 동시 실행 금지 |

### 3. KB 재수집 — Codex, P-03 (Loop A)
| | |
|---|---|
| 입력 | recollection-request-{n}.md, 대상 KB 문서 |
| 출력 | KB 문서 보강 (해당 섹션만), 변경 이력 append |
| 품질 기준 | 요청서의 항목별 지시 전부 이행, 통과 섹션 무수정 |
| 실패 시 | → 2단계 재평가로 복귀 |

### 4. Lesson 생성 — Codex, P-04
| | |
|---|---|
| 입력 | **approved 이상 KB만** (BACKLOG 항목에 명시된 KB id들), `skills/SK-02`(문체), `schema.ts` |
| 출력 | `outputs/02-drafts/{slug}/` — lesson.md, meta.md, quiz.md, terms.md |
| 품질 기준 | KB에 없는 사실 추가 금지(전 문장이 KB로 역추적 가능), 13섹션 규격, SK-02 문체 |
| 실패 시 | KB 정보 부족 발견 → 강의 생성 중단, KB 보강 요청(2단계로). **강의 단계에서 재조사 금지** |
| 병렬 | slug 간 병렬 |
| 참고 | KB가 이미 검증됐으므로 구 방식의 강의별 Fact Check는 생략. 단 문체·규격은 P-05 직전 QA 게이트(Gate 3 축소판)로 확인 — P-04 완료 기준에 자가 체크로 내장 |

### 5. 사이트 반영 — Codex, P-05
| | |
|---|---|
| 입력 | `outputs/02-drafts/{slug}/` (P-04 완료 기준 충족분) |
| 출력 | `src/content/` 변경 + `outputs/04-integrated/{slug}.md` + **KB frontmatter consumers 갱신** |
| 품질 기준 | lint+typecheck 통과, 콘텐츠 무수정 |
| 실패 시 | 규격 문제 → P-04 반려 |
| 병렬 | **금지 — 항상 단일 세션 순차** (curriculum.ts 단일 작성자) |

### 6. 빌드 검증 — Cline, P-06
| | |
|---|---|
| 입력 | 통합 완료된 워킹 트리 |
| 출력 | verify 로그. 실패 시 `outputs/04-integrated/BUILD-FAIL-{date}-{n}.md` (실패 단계, 로그, 원인 추정 파일) |
| 품질 기준 | `npm run verify` (lint→typecheck→test→build) 전체 통과 |
| 실패 시(Loop B) | → 7단계. n=3이면 통합 전체 revert 후 운영자 보고 |

### 7. 빌드 수정 — Codex, P-07 (Loop B)
| | |
|---|---|
| 입력 | BUILD-FAIL 보고서 |
| 출력 | 통합 코드 수정 (curriculum.ts 문법 오류 등) + 수정 기록 |
| 품질 기준 | **콘텐츠 문장 무수정** — 고칠 수 있는 것은 통합 실수뿐. 콘텐츠 자체가 원인이면 P-04 반려 |
| 실패 시 | → 6단계 재검증 복귀 |

### 8. 릴리스 — Cline, P-08
| | |
|---|---|
| 입력 | verify 통과 워킹 트리, 04-integrated 기록 |
| 출력 | `outputs/04-integrated/RELEASE-{date}.md`, git 커밋. 배포는 운영자 승인 후 |
| 품질 기준 | verify 로그 첨부, 포함 콘텐츠 목록 정확 |

## 상태 추적 ([MASTER_PROGRESS.md](../MASTER_PROGRESS.md) — 유일한 상태 파일)

- KB 매트릭스: 수집(P-01)·검증(P-02) 열 / 강의 매트릭스: Lesson·Site·Verify·Release 열
- 기호: `—` 미착수, `▶` 진행 중, `↻n` 루프 n회차, `✓` 완료, `✗` 실패·에스컬레이션

## 병렬/순차 요약

| 구간 | 병렬성 |
|---|---|
| P-01~P-03 (지식 생산) | 개념 간 병렬 가능 — 같은 Codex 흐름에서 수집→검증→재수집 루프 연속 실행 가능. 단 원문 URL 재접속 대조 기록 필수 |
| P-04 (강의 생성) | slug 간 병렬 — Codex 다중 세션 가능 |
| P-05~P-08 (반영·검증·릴리스) | **전체 순차** — 배치로 묶어 하루 1회 권장 |

## 구 워크플로와의 관계
- WF-00(수집)·WF-01(강의 생산): 이 문서로 대체 (superseded)
- WF-02(용어 배치): 유지하되 용어 정의의 원천이 KB로 변경 (approved KB의 정의 섹션에서 파생)
- WF-03(개정): 유지. 개정 트리거에 "KB 갱신 → consumers 자동 개정 후보" 추가
- WF-04(모듈 기획)·WF-05(최종 편집): 유지 (오케스트레이터 소관, O-01·O-02)
