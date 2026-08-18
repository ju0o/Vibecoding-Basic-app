# INTERFACE_SPEC.md 개선안

## 1. 현재 상태 분석

### Task 11 리뷰 결과 요약

- 점수는 **17/30**이며, 범위 준수는 PASS지만 품질 Gate는 FAIL이다 (`ai-ops/reports/BETA-DAY-2-INTERFACE-SPEC-REVIEW.md`).
- 현재 문서는 학습 화면의 기본 순서, Day 1 기준 경험, Practice 6요소, Quiz/Outcome, 접근성·복구 원칙을 설명한다.
- 그러나 개발자가 문서를 실제 구현·검증 기준으로 사용하기에는 책임 metadata, SSOT 연결, 상태 계층, 노드 매핑, 구현 경로, PASS/FAIL 기준이 부족하다.

### 주요 문제점

1. 책임 metadata와 변경 이력이 없다.
2. 상위 SSOT 링크와 하위 참조 목록이 불완전하며 `DRSign.md`는 현재 루트에서 발견되지 않는다.
3. 학습 진행 상태와 자산·연결 상태가 섞여 TEAM_GLOSSARY와 맞지 않는다.
4. 25개 `node_id → route → asset` 참조표가 없고 파일 번호와 공식 ID가 충돌한다.
5. 실제 구현 경로와 정적·동적·수동 검증 기준이 없다.

> 사실성 경계: 본 제안은 위 리뷰·매핑 보고서와 관련 문서/소스 경로를 읽어 작성했다. 실제 브라우저 동작, 정적 export, lint/typecheck/build는 검증하지 않았으며 구현 매핑은 적용 후 QA가 필요하다.

## 2. 개선안 (6개 영역)

### 2.1 metadata 추가

**제안 내용**

`DRSign.md`·`TEAM_GLOSSARY.md`와 같은 YAML front matter 스타일을 유지하되, 담당자와 검토 시점을 명시한다. 개인 이름을 확정하지 못한 상태에서는 역할명을 owner로 사용하고, 운영자가 실제 담당자를 승인한 뒤 교체한다.

**예시 코드/마크다운**

```yaml
document: INTERFACE_SPEC
status: proposed_for_update
scope: foundation_learning_interface
owner: education-platform-pm
review_date: 2026-08-10
next_review: 2026-09-10
review_cycle: monthly_or_route_contract_change
implementation_proof: false
schema_migration_authorized: false
reference_route: /learn/vibe-coding-foundation/day-1
change_history:
  - date: 2026-08-10
    owner: education-platform-pm
    change: Task 11 findings converted into an implementation proposal
    evidence: ai-ops/reports/BETA-DAY-2-INTERFACE-SPEC-REVIEW.md
```

본문 하단에는 다음 이력표를 둔다.

| 날짜 | 담당 | 변경 요약 | 근거 | 영향 범위 |
|---|---|---|---|---|
| 2026-08-10 | education-platform-pm | metadata·상태·구현·검증 구조 제안 | Task 11 review | 문서 계약만 |

`last_verified`는 실제 확인일, `review_date`는 검토일, `next_review`는 예정일로 구분한다. 승인 전에는 `proposed`/`unverified`를 유지한다.

**우선순위: 높음**

**검증 방법/성공 기준**

- 필수 4개 필드와 날짜·담당·변경·근거를 모두 확인한다.
- `next_review`가 `review_date`보다 미래이고, 승인 전 상태는 `proposed`다.

### 2.2 TOC/SSOT 링크

**제안 내용**

문서 상단에 TOC를 추가하고, “정의하는 문서”, “적용하는 문서”, “현재 연결값을 가진 문서”, “검증 증거”를 분리한다. `INTERFACE_SPEC.md`는 화면 계약을 소유하지만 상위 학습 목표나 상태 정의를 재정의하지 않는다.

**예시 코드/마크다운**

```markdown
## TOC
- [1. 문서 역할과 SSOT 경계](#1-문서-역할과-ssot-경계)
- [2. 화면 구조](#2-화면-구조)
- [3. 상태 계약](#3-상태-계약)
- [4. node_id와 route](#4-node_id와-route)
- [5. 구현 매핑](#5-구현-매핑)
- [6. 검증 체크리스트](#6-검증-체크리스트)

## 문서 참조
- 상위 경험/Outcome: [STUDENT_JOURNEY](./ai-ops/roadmap/STUDENT_JOURNEY.md), [LEARNING_OUTCOMES](./ai-ops/roadmap/LEARNING_OUTCOMES.md)
- 제작/상호작용: [CONTENT_PIPELINE](./ai-ops/roadmap/CONTENT_PIPELINE.md), [ANIMATION_DESIGN_SYSTEM](./ai-ops/roadmap/ANIMATION_DESIGN_SYSTEM.md), [DESIGN](./DESIGN.md)
- 완료/평가: [STAGE_COMPLETION_SPEC](./ai-ops/roadmap/STAGE_COMPLETION_SPEC.md), [ASSESSMENT_SYSTEM](./ai-ops/roadmap/ASSESSMENT_SYSTEM.md), [NODE_QUALITY_GATE](./ai-ops/contracts/NODE_QUALITY_GATE.md)
- 공통 용어: [TEAM_GLOSSARY](./TEAM_GLOSSARY.md)
- 상위 제품 결정: [DRSign](./DRSign.md) (현재 파일 미발견; 적용 전 실제 경로 확정 필요)
- 현재 연결값: [Master TOC](./ai-ops/master-toc.md)
- 하위 구현/검증: `src/app/`, `src/features/`, `ai-ops/reports/`
```

`DRSign.md`가 계속 없으면 실제 상위 제품 문서의 canonical 경로를 운영자가 정한 뒤 링크 대상을 교체한다. 링크마다 권한을 적어 중복 정의를 막는다.

**우선순위: 높음**

**검증 방법/성공 기준**

- 모든 anchor·존재하는 내부 링크가 유효하고, `DRSign.md` 미존재는 보류로 표시한다.
- 각 링크의 역할이 정의/적용/현재값/검증 중 하나이며 상위 SSOT를 재정의하지 않는다.

### 2.3 상태 정의 분리

**제안 내용**

TEAM_GLOSSARY의 Status Dictionary를 공통 상태 정의의 SSOT로 참조한다. INTERFACE_SPEC에는 학생 화면에 표시하는 문구·색상·aria-live·전이 UI만 둔다. 상태는 최소한 `learning_progress`, `asset_connection`, `evidence` 차원으로 나눈다.

| 차원 | canonical 정의 | INTERFACE_SPEC의 책임 | 예시 |
|---|---|---|---|
| 학습 진행 | `STAGE_COMPLETION_SPEC`/Outcome 규칙 | 표시·전이·복구 UI | `not_started`, `in_progress`, `ready_for_check`, `needs_retry`, `complete` |
| 자산/연결 | `TEAM_GLOSSARY#status-dictionary` 및 Master TOC | route에서 보이는 표시와 금지 표현 | `interactive`, `linked_static`, `embedded_only`, `data_unwired`, `missing` |
| 증거 | TEAM_GLOSSARY와 검증 보고서 | 증거 없음/확인됨 표시 | `verified` |

**상태 전이 규칙 예시**

```text
not_started → in_progress
in_progress → outcomes_partial → ready_for_check
ready_for_check → complete       (필수 Outcome과 증거 충족)
ready_for_check → needs_retry    (조건 미충족, 복구 안내 제공)
in_progress → blocked            (권한·환경·외부 의존성으로 진행 불가)
```

`interactive`나 `verified`만으로 `complete`를 자동 판정하지 않는다. `skipped`는 운영 정책이 허용한 경우에만 사용하고, 이유와 Next 경로를 함께 저장한다. `complete`는 화면 상태가 아니라 Node Quality Gate와 required Outcome을 만족한 판정이다.

**우선순위: 높음**

**검증 방법/성공 기준**

- 모든 상태에 차원·전이·학생 표시·aria-live 문구가 있다.
- Quiz만으로 `complete`가 되지 않으며 retry/reset이 복구된다.

### 2.4 node_id/route 참조 표

**제안 내용**

공식 ID는 `ai-ops/master-toc.md`가 소유하고, INTERFACE_SPEC에는 대표 예시와 전체 표 링크를 둔다. Task 9 매핑의 파일 번호 혼동을 막기 위해 파일명 순번과 공식 `node_id`를 절대 같은 값으로 취급하지 않는다.

| 공식 node_id | route | Lesson | Practice/Quiz 상태 | Next |
|---|---|---|---|---|
| A01 | `/learn/vibe-coding-foundation/day-1` | `01-first-success.md` | Sample Project + Day1 interactive | `/learn/vibe-coding-foundation/project-file-structure` |
| A05 | `/learn/vibe-coding-foundation/terminal-commands` | `05-terminal-commands.md` | embedded_only / Outcome missing | `/learn/vibe-coding-foundation/errors-to-ai` |
| B01 | `/learn/vibe-coding-foundation/web-how-pages-appear` | `07-web-how-pages-appear.md` | 07–10 shared_asset / NodeCheckpoint interactive | B02 route |
| B05 | `/learn/vibe-coding-foundation/files-connect` | `11-files-connect.md` | linked_static | B06 route |

전체 행은 `node_id`, route, lesson, practice, quiz/outcome, next, status, evidence date를 갖는다. 파일 번호와 Track ID가 어긋나면 Master TOC의 공식 ID를 우선하고 `mapping_note`를 남긴다. route가 없으면 임의 생성 대신 `missing`과 이유를 기록한다.

**우선순위: 높음**

**검증 방법/성공 기준**

- 25개 ID가 중복 없이 매핑되고 route 중복이 없다.
- A01/A05/B01/B05가 Master TOC와 같고 불일치 사유가 기록된다.

### 2.5 구현 매핑

**제안 내용**

문서의 각 UI 계약을 실제 구현 파일과 연결한다. 아래는 현재 파일 존재와 심볼 검색으로 확인한 초기 매핑이며, `implementation_proof: false`를 유지한 채 적용 후 동작 검증을 추가해야 한다.

| 계약 영역 | 구현 경로 | 대표 심볼/역할 | 의존성 방향 |
|---|---|---|---|
| Day 1 route shell | `src/app/learn/vibe-coding-foundation/day-1/page.tsx` | 페이지 순서·anchor·next | app → feature/content |
| Day 1 interactive | `src/features/learning-interactions/day1-first-success/Day1FirstSuccessExperience.tsx` | 첫 성공 시뮬레이션 | feature → core hook |
| Day 1 quiz/outcome | `src/features/learning-interactions/day1-first-success/Day1QuizAndOutcomes.tsx` | Quiz·Outcome check | feature → local state |
| 공통 checkpoint | `src/features/learning-interactions/core/NodeCheckpoint.tsx` | `CheckpointOutcome`, retry/teach-back 표시 | feature → shared core |
| reduced motion | `src/features/learning-interactions/core/usePrefersReducedMotion.ts` | motion preference | interaction → browser media query |
| B01 interaction | `src/features/learning-interactions/web-layers/WebLayersExperience.tsx` | 웹 레이어 조작 | app route → feature → core |
| A02/A03 interaction | `src/features/learning-interactions/project-file-structure/*`, `node-npm/*` | Practice·Quiz | app route → feature |

의존성은 `src/app → src/features → core` 단방향을 권장한다. feature의 app 역참조와 문서만으로 구현됐다는 표기를 금지한다.

**우선순위: 중간**

**검증 방법/성공 기준**

- 경로·심볼·app entry가 존재하고 Day 1 순서가 일치한다.
- `src/app → src/features → core` 방향 위반과 구현 과장이 없다.

### 2.6 검증 체크리스트

**제안 내용**

문서 하단에 정적·동적·수동 검증을 분리하고 명령/시나리오, 기대 결과, 증거 위치, PASS/FAIL을 둔다. 이번 작업에서는 체크리스트만 제안한다.

**정적 검증**

| 확인 | 제안 명령/방법 | PASS 기준 |
|---|---|---|
| Markdown 링크 | 링크 대상·anchor 검사 스크립트 또는 링크 목록 대조 | 깨진 내부 링크 0건; DRSign 미확정은 명시적 보류 |
| 타입/문법 | `npm run lint`, `npm run typecheck` | 오류 0건 |
| route 정합성 | Master TOC와 `src/app/learn/vibe-coding-foundation` 대조 | 공식 route 누락·중복 0건 |
| 구현 매핑 | 표의 `src/` 경로와 심볼 검색 | 미존재 경로 0건; 미검증 기능은 false 유지 |

**동적 검증 시나리오**

1. A01 route 진입 후 Experience를 조작하고 Practice로 이동한다. 기대 결과: 상태 변화와 다음 단계 안내가 보인다.
2. Quiz 오답을 제출한다. 기대 결과: 이유, retry, 관련 Practice 링크가 보이고 `complete`가 되지 않는다.
3. 필수 Outcome 증거를 제출한다. 기대 결과: `ready_for_check`에서 Gate 조건을 충족할 때만 `complete`가 된다.
4. reset/retry를 실행한다. 기대 결과: 초기 상태로 복구되고 `aria-live`가 변경을 알린다.
5. A05/B01 route를 열어 공식 `node_id`, Practice/Quiz 상태, Next가 Master TOC와 일치하는지 확인한다.

**수동 UI/UX 검증**

- 키보드만으로 route 진입, 조작, 제출, retry, reset, Next 이동이 가능하다.
- 포커스가 시각적으로 보이고, modal/dialog 또는 상태 변경이 스크린리더에 중복 없이 전달된다.
- `prefers-reduced-motion: reduce`에서 필수 정보가 즉시 보이고 비필수 애니메이션이 제거된다.
- 모바일 rail, 44px 터치 목표, 긴 오류 문구, 빈 상태, loading/error 상태가 겹치지 않는다.
- 학생이 `linked_static`, `data_unwired`, `missing`을 완료로 오해하지 않는다.

**우선순위: 중간**

**검증 방법/성공 기준**

- 모든 체크 항목에 PASS/FAIL/보류, 실행일·담당·증거 링크가 기록된다.
- 정적 검증은 링크·타입·route 누락을 정량적으로 보고한다.
- 동적 시나리오는 최소 A01과 상태 전이 4개를 재현하고, 수동 검증은 키보드·focus·reduced motion·모바일을 모두 포함한다.

## 3. 구현 우선순위

### 즉시 (1주 내)

- metadata와 변경 이력 추가
- TOC 및 존재하는 SSOT 링크 추가
- `TEAM_GLOSSARY` 참조 문구와 상태 차원 분리
- A01/A05/B01/B05 대표 매핑 및 Master TOC anchor 추가
- 원본 적용 전 문서 리뷰에서 `DRSign.md`의 실제 경로 결정

### 중기 (2–4주)

- 25개 전체 `node_id`/route/asset 상태 표 완성
- 실제 `src/app`·`src/features` 매핑을 route별로 확장
- 정적 링크·route·타입 검사를 CI 또는 결정적 스크립트로 고정
- A01 상태 전이, retry/reset, keyboard/focus 시나리오를 자동·수동 테스트로 기록

### 장기 (1개월+)

- Status Dictionary 변경 시 영향 문서와 Master TOC를 함께 점검하는 운영 절차 도입
- 문서 상태와 구현 증거를 분리한 `implementation_proof` 갱신 규칙 수립
- 25개 노드 매핑과 실제 route manifest의 자동 대조
- 독립 리뷰에서 SSOT 충돌, a11y, static export, bundle risk까지 재검토

## 4. 검증 방법

| 개선 영역 | 성공 기준 | 측정 지표 |
|---|---|---|
| metadata | 필수 필드와 이력 존재 | 필드 충족률 100%, 다음 검토일 누락 0건 |
| TOC/SSOT | 역할이 분리된 링크와 유효 anchor | 유효 링크 비율 100%, 미존재 DRSign 1건은 보류 명시 |
| 상태 | 진행/자산/증거 차원 분리 | 상태별 차원·전이·표시 문구 커버리지 100% |
| node mapping | 공식 ID와 route의 1:1 대조 | 25/25 ID 매핑, 중복 route 0건, 불일치 사유 100% 기록 |
| 구현 mapping | 계약별 실제 경로·심볼 근거 | 표 경로 존재율 100%, 미검증 기능의 false 유지 |
| checklist | 정적·동적·수동 증거 기록 | 필수 시나리오 5개, 수동 항목 5개 이상 PASS/보류 기록 |

적용 후에는 위 측정치를 먼저 채우고, 하나라도 근거 없이 PASS로 표기하지 않는다. 실제 브라우저 검증 전에는 `implementation_proof: false`를 유지한다.

## 5. Gate 준수 확인

- 원본 수정 없음 ✓ — `INTERFACE_SPEC.md`를 수정하지 않았다.
- 소스 코드 수정 없음 ✓ — `src/` 파일을 수정하지 않았다.
- 보고서만 생성 ✓ — 지정된 `ai-ops/reports/BETA-DAY-2-INTERFACE-SPEC-IMPROVEMENT-PROPOSAL.md`만 이번 작업으로 생성했다.
- lint/typecheck/build 미실행 ✓ — 사용자 Gate 제약에 따라 실행하지 않았다.
- 기존 변경 보존 ✓ — 작업 전부터 존재한 dirty/untracked 상태를 정리하거나 되돌리지 않았다.
- 검증 범위 명시 ✓ — 실제 동작 미검증 범위를 분리했다.
