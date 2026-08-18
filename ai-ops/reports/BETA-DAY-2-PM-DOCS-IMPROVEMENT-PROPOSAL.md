# PM Docs 품질 개선안 — Beta Day 2

## 배경

Task 7 리뷰에서 `DESIGN.md` 24/30, `TEAM_GLOSSARY.md` 25/30, `CONCEPTS.md` 23/30으로 평균 24/30을 기록했다. 범위 준수는 PASS였지만 품질 Gate는 FAIL이었다 (`ai-ops/reports/BETA-DAY-2-PM-DOCS-REVIEW.md:6-12`). 주요 원인은 상태 용어의 분산, 문서별 SSOT 경계와 운영 책임의 불명확성, 상위 SSOT 및 구현·검증 자료로의 직접 링크 부족이다 (`BETA-DAY-2-PM-DOCS-REVIEW.md:38-50`, `76-88`, `114-126`).

이 문서는 원본 문서, 소스 코드, P0 콘텐츠를 수정하지 않는 제안서다. 제안의 근거는 Task 7 리뷰와 현재 원문 줄 번호이며, 실제 적용 전 상태 사전의 권위와 동기화 순서는 별도 승인 대상으로 둔다.

## 문서별 개선안

## DESIGN.md 개선안

### 우선순위: HIGH

### 현재 문제 (Task 7에서 발견)

- 문서가 `STUDENT_JOURNEY.md`와 `STAGE_COMPLETION_SPEC.md`만 직접 링크하고 `CONTENT_PIPELINE.md`, `ANIMATION_DESIGN_SYSTEM.md`, `NODE_QUALITY_GATE.md`를 상위 계약으로 명시하지 않는다 (`DESIGN.md:13-16`, `BETA-DAY-2-PM-DOCS-REVIEW.md:40-43`).
- `interactive`, `linked_static`, `embedded_only`, `data_unwired`, `missing`의 표는 있지만 `verified`, `present`, `complete`와의 관계 및 정본 위치가 설명되지 않는다 (`DESIGN.md:229-237`, `BETA-DAY-2-PM-DOCS-REVIEW.md:28-30`).
- 실제 컴포넌트 파일·검증 명령·체크리스트로 연결되는 구현 증거 링크가 없고 `last_verified`만 있어 갱신 책임과 주기가 불명확하다 (`DESIGN.md:3-10`, `25-27`, `BETA-DAY-2-PM-DOCS-REVIEW.md:32-36`).

### 제안 개선안

1. 상위 SSOT와 구현·검증 링크를 문서 상단에 추가한다.
   - **변경 내용:** Journey/Outcome, Content Pipeline, Animation Design System, Stage Completion, Node Quality Gate를 “우선 참조”로 묶고 구현 정본과 검증 절차를 구분한다.
   - **변경 위치:** `DESIGN.md:13-16`의 문서 소개 및 `DESIGN.md:25-27`의 토큰 설명 아래.
   - **예상 효과:** 시각 규칙과 학습·완료 규칙의 소유권을 분리하고, 디자인 제안이 구현 완료로 오인되는 것을 막는다.
   - **구현 난이도:** 쉬움

2. 상태 표를 표시 규칙 중심으로 축소하고 공통 정의는 정본 링크로 위임한다.
   - **변경 내용:** `TEAM_GLOSSARY.md`의 Status Dictionary를 정의 SSOT로 지정하고, 이 문서에는 학생 화면의 문구·색상·접근성·금지 표현만 남긴다. `verified`와 `complete`를 각각 증거 상태와 완료 판정으로 구분한다.
   - **변경 위치:** `DESIGN.md:229-237`의 상태 표와 `DESIGN.md:209-214`의 완료 표시 규칙.
   - **예상 효과:** 같은 상태를 문서마다 다르게 해석하거나 자산 상태를 학습 완료 상태로 잘못 표시하는 문제를 줄인다.
   - **구현 난이도:** 보통

3. 문서 운영 메타데이터와 컴포넌트별 검증 매핑을 추가한다.
   - **변경 내용:** `owner`, `update_trigger`, `next_review`, `toc`를 추가하고, 주요 컴포넌트마다 구현 파일·접근성 확인·reduced-motion 확인 위치를 한 줄씩 링크한다.
   - **변경 위치:** YAML 블록 `DESIGN.md:3-11` 및 컴포넌트 섹션 `DESIGN.md:113-167` 뒤.
   - **예상 효과:** 누가 언제 무엇을 확인해야 하는지 추적할 수 있고, 디자인 계약과 실제 구현의 차이를 재검증할 수 있다.
   - **구현 난이도:** 보통

### 검증 방법

- Markdown 링크 검사로 위 5개 상위 SSOT 링크와 구현·검증 링크의 대상 파일 존재 여부를 확인한다.
- `interactive` 등 상태가 상태 사전과 동일한 철자·정의로만 사용되는지 검색한다.
- 각 컴포넌트의 링크된 구현 파일과 접근성 테스트 또는 체크리스트를 대조하고, 원본을 바꾼 뒤 별도 리뷰에서 `last_verified` 갱신 근거를 확인한다.

## TEAM_GLOSSARY.md 개선안

### 우선순위: HIGH

### 현재 문제 (Task 7에서 발견)

- 공통 용어의 정본 위치, owner, 변경 이력과 다음 검토 시점이 없다 (`TEAM_GLOSSARY.md:3-8`, `116-122`; `BETA-DAY-2-PM-DOCS-REVIEW.md:60-62`, `76-81`).
- `verified`, `present`, `interactive`, `linked_static`, `embedded_only`, `data_unwired`, `missing`이 공식 용어 목록으로 관리되지 않고 다른 문서에 흩어져 있다 (`BETA-DAY-2-PM-DOCS-REVIEW.md:64-69`).
- `Learning Node`의 실제 `node_id`, route, 자산 연결을 확인할 링크가 부족하고 `master-toc`가 별도 downstream 인덱스라는 경계가 명시되지 않았다 (`TEAM_GLOSSARY.md:26-29`, `10-15`; `BETA-DAY-2-PM-DOCS-REVIEW.md:78-81`).

### 제안 개선안

1. `Status Dictionary`를 공통 상태 용어의 canonical section으로 신설한다.
   - **변경 내용:** 7개 필수 상태를 category, 한 문장 정의, 학생 표시 규칙, 필요한 증거, 허용 관계와 함께 표준 표에 등록한다. `needs_retry`, `complete` 등 학습·완료 상태도 별도 category로 표시한다.
   - **변경 위치:** `TEAM_GLOSSARY.md:116-122`의 용어 변경 규칙 앞.
   - **예상 효과:** 세 문서와 Master TOC가 한 정의를 참조하고, `verified`와 `complete` 같은 서로 다른 차원의 상태를 혼동하지 않게 된다.
   - **구현 난이도:** 보통

2. 용어별 owner와 변경·deprecated 규칙을 추가한다.
   - **변경 내용:** 용어 변경 시 canonical definition → 영향 문서 → 실제 노드 인덱스 순서로 검토하도록 하고, renamed/deprecated 용어의 이전 이름·대체 용어·적용일을 기록한다.
   - **변경 위치:** `TEAM_GLOSSARY.md:116-122`의 용어 변경 규칙을 확장하고 YAML 메타데이터 `TEAM_GLOSSARY.md:3-8`에 owner/review 필드를 추가.
   - **예상 효과:** 용어가 조용히 바뀌거나 문서 간 구식 표현이 남는 것을 방지한다.
   - **구현 난이도:** 쉬움

3. 실제 연결 정보의 소유 문서와 참조 링크를 명시한다.
   - **변경 내용:** glossary는 의미만 소유하고, 화면 노출은 `INTERFACE_SPEC.md`, 실제 node/route/Practice/Quiz/Outcome 연결은 `ai-ops/master-toc.md`가 소유한다고 선언한다. A01/B01 예시를 링크로 연결한다.
   - **변경 위치:** `TEAM_GLOSSARY.md:10-17`, `26-29`, `116-122`.
   - **예상 효과:** 용어집이 실제 노드 목록이나 화면 구현을 중복 관리하지 않아 변경 충돌을 줄인다.
   - **구현 난이도:** 쉬움

### 검증 방법

- 상태 사전의 7개 필수 용어가 정확히 한 번씩 canonical definition을 갖는지 검색한다.
- 각 용어의 canonical source, owner, deprecated 규칙과 `INTERFACE_SPEC.md`·`master-toc.md` 링크를 확인한다.
- 문서 담당자가 임의의 상태 하나를 골라 “정의 → 화면 표시 → 실제 node 연결 → 검증 증거”를 추적할 수 있는지 walkthrough한다.

## CONCEPTS.md 개선안

### 우선순위: MEDIUM

### 현재 문제 (Task 7에서 발견)

- 개념 문서가 `present`, `linked_static`, `interactive`, `data_unwired`, `verified`, `complete`만 정의하고 `embedded_only`, `missing`을 빠뜨려 DESIGN과 상태 집합이 다르다 (`CONCEPTS.md:111-122`; `DESIGN.md:229-237`).
- `node_id`와 route를 연결하는 원리는 있으나 실제 형식·예시·검증 근거가 없다 (`CONCEPTS.md:43-55`, `BETA-DAY-2-PM-DOCS-REVIEW.md:114-119`).
- 관련 문서 목록은 있으나 Content Pipeline, Animation Design System, Student Journey, Node Quality Gate로의 직접 링크와 업데이트 순서가 완전하지 않다 (`CONCEPTS.md:124-129`, `BETA-DAY-2-PM-DOCS-REVIEW.md:98-106`).

### 제안 개선안

1. 상태 설명을 교육적 해석으로 정리하고 공통 정의를 위임한다.
   - **변경 내용:** 상태 표에 `embedded_only`와 `missing`을 추가하되, 정의·category·증거는 `TEAM_GLOSSARY.md#status-dictionary` 링크로 참조한다. 이 문서에는 학습자가 왜 “보완 필요”인지 이해하는 원리만 남긴다.
   - **변경 위치:** `CONCEPTS.md:111-122`.
   - **예상 효과:** DESIGN의 UI 표현, Glossary의 용어 정의, Concepts의 교육적 의미가 서로 다른 역할을 갖는다.
   - **구현 난이도:** 쉬움

2. 대표 node 연결 예시를 추가한다.
   - **변경 내용:** `node_id`, `lesson_body`, `route`, Practice, Interactive, Quiz, Outcome, Next를 포함한 A01 예시와 공유 Practice를 설명하는 B01 예시를 추가한다.
   - **변경 위치:** `CONCEPTS.md:43-55` 뒤 또는 관련 문서 섹션 앞.
   - **예상 효과:** 개념 원리가 실제 학습 단위에 어떻게 적용되는지 확인할 수 있고, 파일 순번과 공식 node ID를 혼동하지 않는다.
   - **구현 난이도:** 보통

3. 개념별 SSOT·검증 경로 표를 추가한다.
   - **변경 내용:** Journey/Outcome, Pipeline, Animation, Completion/Assessment, Atlas, 실제 연결 인덱스의 소유 문서와 동기화 순서를 표로 정리한다.
   - **변경 위치:** `CONCEPTS.md:124-129`의 관련 문서 섹션.
   - **예상 효과:** 개념 문서가 상위 정책을 재정의하지 않고, 변경 시 어느 문서를 먼저 확인해야 하는지 알 수 있다.
   - **구현 난이도:** 보통

### 검증 방법

- 상태 표의 7개 용어가 Glossary 정본에 링크되고, Concepts에 독자적인 정의가 중복되지 않는지 확인한다.
- A01/B01 예시의 `node_id`, route, Practice, Quiz, Outcome, Next가 `ai-ops/master-toc.md`와 일치하는지 대조한다.
- 상위 SSOT 변경을 가정해 동기화 순서를 따라가며 누락 downstream 문서가 없는지 체크한다.

## 상태 용어 표준화

### 정본과 참조 원칙

`TEAM_GLOSSARY.md`의 `Status Dictionary`를 공통 상태 정의의 SSOT로 삼는 것을 제안한다. 다만 이 권위 관계는 여러 문서의 의미를 바꾸므로 적용 전 운영자 승인이 필요하다. `DESIGN.md`는 시각·접근성 표시 규칙, `CONCEPTS.md`는 학습적 의미만 작성하고 정의 표를 복제하지 않는다. `ai-ops/master-toc.md`는 정의 SSOT가 아니라 실제 노드의 현재 연결 상태를 기록하는 downstream 인덱스다.

| 용어 | 정확한 정의 | category | SSOT/사용 문서 |
|---|---|---|---|
| `interactive` | 학생 입력에 따라 상태가 바뀌고 결과 확인·재시도·복구가 가능한 자산 | asset_status | 정의: `TEAM_GLOSSARY.md`; 표시: `DESIGN.md`; 실제 노드 상태: `master-toc.md` |
| `verified` | 재현 가능한 검사 절차와 결과 증거가 존재하는 상태 | evidence_status | 정의: `TEAM_GLOSSARY.md`; 검증 기록: 해당 리뷰/QA 보고서 |
| `present` | 파일 또는 데이터가 존재하는 상태. 실행·연결을 의미하지 않음 | existence_status | 정의: `TEAM_GLOSSARY.md`; 현재 값: `master-toc.md` 또는 산출물 인덱스 |
| `linked_static` | route에서 정적 자산 또는 안내로 연결되지만 상호작용형 체크포인트는 아닌 상태 | asset_status | 정의: `TEAM_GLOSSARY.md`; 학생 표시: `DESIGN.md` |
| `embedded_only` | 별도 Practice/Quiz 자산 없이 route 내부 안내만 존재하는 상태 | asset_status | 정의: `TEAM_GLOSSARY.md`; 보완 의미: `CONCEPTS.md`, 표시: `DESIGN.md` |
| `data_unwired` | 데이터 또는 자산은 존재하지만 학생 route에서 사용 가능하게 연결되지 않은 상태 | integration_status | 정의: `TEAM_GLOSSARY.md`; 실제 연결 확인: `master-toc.md`/구현 검증 |
| `missing` | 확인 가능한 진입점·자산·연결이 없는 상태 | asset_status | 정의: `TEAM_GLOSSARY.md`; 보완 표시: `DESIGN.md`, 교육적 해석: `CONCEPTS.md` |

표준화 시 다음 경계를 고정한다.

- `verified`는 증거의 상태이고 `complete`는 Node Quality Gate와 required Outcome을 충족한 학습 노드의 완료 판정이다. `verified`만으로 `complete`가 되지 않는다.
- `present`는 존재만 뜻하며 `linked_static`, `interactive`, `complete`와 동일하지 않다.
- `interactive`, `linked_static`, `embedded_only`, `data_unwired`, `missing`은 자산·연결 상태이며 선형 학습 진행률로 합산하지 않는다.
- 다른 문서에서는 정의를 복제하지 말고 정본 앵커를 링크한다. 실제 상태값이 필요한 경우에만 `master-toc.md`에 기록한다.

## SSOT 경계

| 문서 | 소유하는 정보 | 소유하지 않는 정보 | downstream 참조 |
|---|---|---|---|
| `DESIGN.md` | 학습 화면의 시각, 상호작용 표시, 접근성, reduced-motion 규칙 | 커리큘럼 순서, 상태의 canonical 정의, 실제 구현 완료 판정 | Journey/Outcome, Animation Design System, Glossary, Interface Spec |
| `TEAM_GLOSSARY.md` | 공통 용어, 상태 사전, 학생용 정의, 용어 변경 규칙 | 개념 전체 설명, 실제 route/자산 목록, CSS 구현 | Concepts, Interface Spec, Master TOC, 상위 SSOT |
| `CONCEPTS.md` | 학습 루프, Practice/Quiz/Outcome 관계, 개념적 경계와 교육적 해석 | 상태의 canonical definition, 실제 연결 인덱스, UI 세부 규칙 | Student Journey, Learning Outcomes, Content Pipeline, Animation, Node Quality Gate |

중복 제거 규칙은 “정의는 한 곳, 적용 규칙은 해당 문서, 실제 값은 인덱스”로 한다. 상위 정책은 `STUDENT_JOURNEY.md` + Outcome 문서, 제작은 `CONTENT_PIPELINE.md` + `ANIMATION_DESIGN_SYSTEM.md`, 완료·증거는 `STAGE_COMPLETION_SPEC.md` + `NODE_QUALITY_GATE.md`가 소유한다. 세 PM 문서는 이를 해석하고 연결하지만 상위 문서의 내용을 재정의하지 않는다.

## 구현/검증 링크 보완

Task 7에서 링크 자체는 일부 존재해도 상위 SSOT 전체와 구현·검증 경로를 완전히 연결하지 못한 것으로 확인됐다 (`BETA-DAY-2-PM-DOCS-REVIEW.md:153-159`). 다음 링크를 각 문서에 추가한다.

| 링크 대상 | 권장 경로 | 연결할 문서와 목적 |
|---|---|---|
| Content Pipeline | `./ai-ops/roadmap/CONTENT_PIPELINE.md` | `DESIGN.md`: 제작 산출물 순서와 UI 계약 연결; `CONCEPTS.md`: Lesson Body→Practice→Interactive 흐름 근거 |
| Animation Design System | `./ai-ops/roadmap/ANIMATION_DESIGN_SYSTEM.md` | `DESIGN.md`: interactive animation·접근성 계약의 상위 기준; `CONCEPTS.md`: 조작·상태 변화 원리 근거 |
| Node Quality Gate | `./ai-ops/contracts/NODE_QUALITY_GATE.md` | `DESIGN.md`: complete 표시 조건; `TEAM_GLOSSARY.md`: Complete/Evidence 정의; `CONCEPTS.md`: Outcome 증거 판정 |
| Student Journey | `./ai-ops/roadmap/STUDENT_JOURNEY.md` | 세 문서 모두: 경험 경로와 can-do Outcome의 최상위 기준 |
| Learning Outcomes | `./ai-ops/roadmap/LEARNING_OUTCOMES.md` | `TEAM_GLOSSARY.md`, `CONCEPTS.md`: 용어·개념이 지원해야 할 학생 결과 |
| Stage Completion / Assessment | `./ai-ops/roadmap/STAGE_COMPLETION_SPEC.md`, `./ai-ops/roadmap/ASSESSMENT_SYSTEM.md` | `DESIGN.md`, `CONCEPTS.md`: 완료·평가 경계 |
| 실제 연결 인덱스 | `./ai-ops/master-toc.md` | 세 문서: node_id, route, Practice, Quiz, Outcome, Next의 현재 값 |
| 구현·검증 | 관련 `src/` 파일 및 QA/리뷰 보고서 링크 | `DESIGN.md`: 토큰·컴포넌트 구현과 접근성 검증; 상태 주장의 근거 날짜·명령 연결 |

링크 보완 후 모든 링크는 대상 파일 존재, anchor 유효성, 링크 대상의 역할(정의/적용/현재값/검증)을 함께 점검한다.

## 우선순위 실행 계획

| 구분 | 실행 항목 | 예상 소요 | 산출물·완료 증거 |
|---|---|---:|---|
| **즉시 가능** | 세 문서에 owner/update_trigger/next_review/toc 메타데이터 초안 추가, 상위 SSOT와 Master TOC 링크 추가, 중복 정의 대신 정본 참조 문구 배치 | 1시간 이내 | 링크 검사 결과와 문서 diff |
| **즉시 가능** | `TEAM_GLOSSARY.md`의 Status Dictionary 초안과 7개 상태 category 작성 | 1시간 이내 | 용어 표, 각 상태의 증거·학생 표시 규칙 |
| **중기 개선** | DESIGN 상태 표를 UI 표시 규칙으로 재편, CONCEPTS 상태 표를 교육적 해석으로 재편, A01/B01 연결 예시 추가 | 1일 이내 | 세 문서 간 중복·누락 대조표 |
| **중기 개선** | 문서별 owner가 링크 대상과 상태값을 검토하고 Master TOC의 실제 연결을 대조 | 1일 이내 | 검토 보고서, 미검증 항목 목록 |
| **장기 개선** | 상태 사전 변경 시 downstream 영향 문서와 deprecated 용어를 추적하는 운영 절차 및 자동 링크·anchor 검사를 도입 | 구조적 변경 | 운영 규칙, 검증 스크립트 또는 CI 체크 |
| **장기 개선** | `TEAM_GLOSSARY.md`를 canonical로 확정할지 별도 `STATUS_DICTIONARY.md`를 만들지 운영자 결정 후 문서 전체의 권위 관계를 일괄 적용 | 구조적 변경 | 승인 기록, SSOT 맵, 독립 리뷰 PASS |

## 검증 및 Gate 준수

- **원본 문서:** 수정하지 않는다. 이 보고서만 변경 대상이다.
- **소스 코드/P0 콘텐츠:** 수정하지 않는다.
- **문서 품질 검증:** 세 문서별 개선안이 각각 3개 이상이며, 모든 개선안에 문제 줄 번호, 변경 위치, 난이도, 검증 방법이 있다.
- **적용 후 검증:** 링크 대상·anchor 검사, 상태 용어 검색, SSOT 대조표, 대표 노드 매핑 대조를 순서대로 실행한다. 실제 브라우저 동작·build·학생 화면은 원본 적용 후 별도 검증이 필요하다.
- **승인 필요:** 상태 사전의 canonical 권위, 상위 SSOT 동기화 순서, 기존 route·학생 화면 상태 표시 변경은 Human Approval 후 적용한다.

### 확인된 사실과 미검증 범위

- **확인된 사실:** Task 7 점수와 Gate 판정은 리뷰 보고서에 기록되어 있다 (`BETA-DAY-2-PM-DOCS-REVIEW.md:6-12`).
- **확인된 사실:** 현재 세 문서의 상태 표, 관련 문서 목록, 상위 링크는 본문 줄 번호로 확인했다.
- **미검증:** 이 제안의 원본 적용, 런타임 상호작용, 브라우저 접근성, 새 build 결과, 상태 사전 권위에 대한 운영자 승인은 수행하지 않았다.
