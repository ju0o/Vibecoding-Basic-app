# PM Docs Quality Review — Beta Day 2

검토 범위: `DESIGN.md`, `TEAM_GLOSSARY.md`, `CONCEPTS.md`의 현재 작업 트리 내용과 문서 내부 링크.
행 번호는 검토 시점의 파일 기준이다. 소스 코드와 세 문서 본문은 수정하지 않았다.

## Summary

- 총 문서 수: 3
- 평균 점수: 24/30
- Gate 적합성: **FAIL (범위 준수는 PASS, 품질 준비는 조건부)**
- 확인된 링크 대상: 10개 전부 존재
- 핵심 판단: `APPROVE_CONTENT_PM_DOCS`의 문서 전용 범위와 금지사항은 지켰지만, Gate 완료 보고로 보기에는 상태 용어·업데이트 절차·탐색성이 덜 닫혀 있다.

점수는 각 문서에 대해 구조 completeness, 내용 일관성, 실용성을 각각 10점 만점으로 평가했다. “일치율”은 TEAM_GLOSSARY의 19개 표제어를 기준으로, 해당 표제어가 다른 문서에 문자열로 명시적으로 등장하는 비율이다. 이는 의미적 완전 일치가 아니라 재현 가능한 점검 지표다.

## DESIGN.md

### 점수: 24/30

### 구조 completeness: 8/10

11개 번호 섹션으로 정체성, 색상, 타이포그래피, 레이아웃, 컴포넌트, 모션, 표면, 학습 레일, Day 1, 자산 상태, 접근성을 순서대로 다룬다 (`DESIGN.md:17-245`). 색상·타이포그래피·간격·컴포넌트에는 표와 상태 규칙이 있다 (`DESIGN.md:28-45`, `58-110`, `113-166`).

감점 근거는 목차/빠른 탐색이 없고, 문서 소유자·변경 이력·검토 주기가 명시되지 않은 점이다. 상위 우선 문서도 `STUDENT_JOURNEY.md`와 `STAGE_COMPLETION_SPEC.md`만 직접 링크한다 (`DESIGN.md:13-16`).

### 내용 일관성: 8/10

학습 레일, Outcome 증거 수준, `complete`의 Node Quality Gate 의존성을 명시해 Journey/Outcome 중심 원칙과 잘 맞는다 (`DESIGN.md:201-216`). `interactive`, `linked_static`, `embedded_only`, `data_unwired`, `missing` 상태도 구분한다 (`DESIGN.md:229-237`).

다만 이 상태 집합이 TEAM_GLOSSARY와 CONCEPTS에 동일한 표로 재사용되지 않는다. 또한 문서 상단의 권위 선언은 Journey/Node Gate 중심인데, 프로젝트 SSOT의 Content Pipeline·Animation Design System과의 연결은 직접 확인할 수 없다 (`DESIGN.md:3-10`).

### 실용성: 8/10

색상 토큰, 간격, 반응형 기준, 컴포넌트 상태, 접근성, reduced motion 규칙이 있어 개발 참조성이 높다 (`DESIGN.md:28-52`, `102-110`, `113-183`, `239-245`). Day 1 기준 경험과 Practice/Quiz 상태도 포함한다 (`DESIGN.md:219-237`).

실제 컴포넌트 파일·테스트·수용 체크리스트로 연결되는 예제가 없고, `last_verified`만 있어 누가 언제 갱신하는지 알 수 없다 (`DESIGN.md:3-10`).

### 발견 사항

- [ ] 목차가 없어 11개 섹션과 토큰 표를 빠르게 찾기 어렵다 (`DESIGN.md:17-245`).
- [ ] `interactive` 등 상태 정의가 이 문서에만 집중되어 문서 간 단일 상태 사전이 없다 (`DESIGN.md:229-237`, `TEAM_GLOSSARY.md:77-100`, `CONCEPTS.md:111-122`).
- [ ] `CONTENT_PIPELINE.md`와 `ANIMATION_DESIGN_SYSTEM.md`가 프로젝트 상위 SSOT인데 문서의 직접 의존성으로 표시되지 않는다 (`AGENTS.md:20-22`, `DESIGN.md:13-16`).
- [ ] 실제 구현·검증 링크 없이 디자인 계약과 구현 상태의 경계만 선언되어 있다 (`DESIGN.md:25-27`, `3-10`).

### 개선 제안

1. 문서 상단에 섹션 목차와 `owner`, `update_trigger`, `next_review` 메타데이터를 추가한다.
2. 상태 집합을 `TEAM_GLOSSARY.md`에 정본으로 옮기고, DESIGN은 시각 표시 규칙만 참조하도록 분리한다.
3. 각 주요 컴포넌트에 대표 사용처, 관련 구현 경로, 검증 명령 또는 체크리스트 링크를 1개씩 연결한다.
4. Journey/Outcome, Content Pipeline, Animation Design System, Node Quality Gate의 우선순위와 역할을 한 표로 명시한다.

---

## TEAM_GLOSSARY.md

### 점수: 25/30

### 구조 completeness: 8/10

`사용 원칙` → `학습 구조` → `제품·운영 구조` → `용어 변경 규칙` 흐름이 명확하다 (`TEAM_GLOSSARY.md:10-17`, `19-114`, `116-122`). 각 용어에 한 줄 정의와 예시가 다수 포함되어 있다 (`TEAM_GLOSSARY.md:21-73`).

목차가 없고, 각 용어의 canonical source·owner·마지막 변경 사유가 없어 규모가 커질 때 관리성이 떨어진다. 상태 용어와 학생용 용어가 한 문서 안에 섞여 있으나 분류 체계는 더 세분화되지 않았다.

### 내용 일관성: 9/10

Learning Path, Learning Node, Practice, Quiz, Teach-back, Outcome, Evidence Level, Complete를 학생 경험 중심으로 정의하고, `complete`를 Node Quality Gate와 연결한다 (`TEAM_GLOSSARY.md:21-73`). Atlas와 Model Routing의 경계도 교육용 상대 분류라는 조건과 함께 적었다 (`TEAM_GLOSSARY.md:77-100`).

남은 불일치는 상태 정의다. `verified`, `present`, `interactive`, `linked_static`, `embedded_only`, `data_unwired`, `missing` 중 일부는 CONCEPTS 또는 DESIGN에만 있고 이 용어집에는 정식 정의가 없다 (`CONCEPTS.md:111-122`, `DESIGN.md:229-237`).

### 실용성: 8/10

학생 화면의 표시 원칙, Practice의 6개 필드, 용어 변경 순서를 제시해 기획·개발·콘텐츠 작성자가 참조하기 쉽다 (`TEAM_GLOSSARY.md:10-17`, `35-38`, `116-122`).

그러나 대부분의 예시가 한 문장 수준이고, 용어별 `학생에게 보이는 문구`, `금지 표현`, `연결된 canonical 문서`가 없다. 개발자가 상태를 구현할 때 DESIGN/CONCEPTS를 다시 대조해야 한다.

### 발견 사항

- [ ] 용어 변경 절차는 있지만 승인자와 변경 기록 위치가 없다 (`TEAM_GLOSSARY.md:116-122`).
- [ ] 상태 용어의 정본이 아니어서 `complete`·`verified`·`interactive`의 경계를 여러 문서에서 다시 해석해야 한다 (`TEAM_GLOSSARY.md:70-73`, `CONCEPTS.md:111-122`).
- [ ] `Learning Node` 정의는 A01–C10을 25개 노드로 설명하지만, 실제 연결 상태의 근거는 `ai-ops/master-toc.md`로 분리되어 있다 (`TEAM_GLOSSARY.md:26-29`, `10-15`).
- [ ] 용어별 업데이트 책임과 deprecated/renamed 표기가 없다.

### 개선 제안

1. 각 표제어에 `정본 문서`, `학생 표시 예`, `사용하지 않을 표현` 열을 추가한다.
2. 상태 용어를 별도 `상태 사전` 표로 만들고 DESIGN/CONCEPTS가 이를 참조하게 한다.
3. 용어 변경 규칙에 승인자, 변경 로그 경로, 관련 문서 동기화 확인 항목을 추가한다.
4. `node_id`, `route`, `required Outcome`, `Sample Project`처럼 실제 연결에 필요한 용어를 추가하거나 다른 문서의 정본 위치를 명시한다.

---

## CONCEPTS.md

### 점수: 23/30

### 구조 completeness: 8/10

11개 섹션이 우선순위, 학습 루프, 자산 연결, Practice, Quiz/Outcome, Day 1, Atlas/Model Routing, 인간–AI 검증, Agent/Workflow, 상태, 관련 문서 순으로 구성된다 (`CONCEPTS.md:16-129`). 흐름도와 상태 표가 있어 개념 간 관계를 파악할 수 있다 (`CONCEPTS.md:18-39`, `48-53`, `113-122`).

목차와 문서 운영 메타데이터가 없고, 개념별 `적용 예/비적용 예`가 일관된 형식으로 제공되지 않는다. 관련 문서 목록은 있으나 상위 SSOT별 우선순위와 변경 시 동기화 규칙은 충분히 설명하지 않는다 (`CONCEPTS.md:124-129`).

### 내용 일관성: 8/10

Student Journey → Content Pipeline → Completion/Assessment → Platform/Atlas/Website의 우선순위를 명시하고 (`CONCEPTS.md:16-25`), Lesson Body와 Practice/Interactive/Quiz/Outcome을 같은 `node_id`와 route에 연결하는 원칙을 제시한다 (`CONCEPTS.md:43-55`). Atlas와 Model Routing 경계도 TEAM_GLOSSARY와 일치한다 (`CONCEPTS.md:86-90`).

다만 상태 표는 `present`, `linked_static`, `interactive`, `data_unwired`, `verified`, `complete`만 포함하고 (`CONCEPTS.md:111-122`), DESIGN의 `embedded_only`, `missing`과 TEAM_GLOSSARY에서 실질적으로 사용되는 `required`, `needs_retry`가 빠져 있다 (`DESIGN.md:229-237`, `TEAM_GLOSSARY.md:59-73`, `CONCEPTS.md:70-78`).

### 실용성: 7/10

Practice의 여섯 질문, Quiz와 Outcome의 판정 사례, 인간–AI 검증 흐름, Agent/Workflow의 간결한 정의는 실무 판단에 유용하다 (`CONCEPTS.md:57-76`, `92-109`).

반면 개발자가 바로 적용할 수 있는 route/데이터 예시, 상태 전이 예시, 실패·복구 시나리오, 문서 변경 시 검증 절차가 없다. 원칙 문서로는 유용하지만 구현 계약으로 사용하려면 사례와 수용 기준이 필요하다.

### 발견 사항

- [ ] 상태 표가 DESIGN의 전체 상태 집합과 일치하지 않는다 (`CONCEPTS.md:113-122`, `DESIGN.md:229-237`).
- [ ] `needs_retry`와 `required Outcome`은 본문에서 판정에 사용되지만 용어집과 상태 표에서 정식 상태/필드로 정리되지 않는다 (`CONCEPTS.md:70-78`).
- [ ] `node_id`와 route 연결 원칙은 있으나 실제 형식 또는 예시가 없다 (`CONCEPTS.md:43-55`).
- [ ] 관련 문서 목록은 있으나 업데이트 순서와 충돌 해결 절차가 없다 (`CONCEPTS.md:124-129`).

### 개선 제안

1. 상태 표를 TEAM_GLOSSARY의 공통 상태 사전과 통합하고, `embedded_only`, `missing`, `needs_retry`의 성격을 명시한다.
2. 하나의 대표 노드에 대해 `node_id`, route, Practice/Quiz/Outcome 연결 예시를 추가한다.
3. 각 핵심 원리에 “적용 예 / 잘못된 적용 / 확인 증거”를 한 세트씩 추가한다.
4. 상위 SSOT 변경 시 이 문서를 어떻게 재검토하는지 문서 운영 절차를 추가한다.

---

## Cross-Document Analysis

### 용어 일관성

엄격한 표제어 문자열 기준(TEAM_GLOSSARY의 19개 표제어):

- DESIGN ↔ GLOSSARY 일치율: **37% (7/19)**
- CONCEPTS ↔ GLOSSARY 일치율: **47% (9/19)**

이 수치는 DESIGN이 시각·상태 계약이고 CONCEPTS가 원리 계약이라는 범위 차이를 반영하지 못하므로 품질 결론으로 단독 사용하지 않는다. 의미상 핵심 공통어인 `Practice`, `Quiz`, `Teach-back`, `Outcome`, `Complete`는 세 문서에서 같은 방향으로 사용된다. 문제는 누락된 상태 용어와 정본 위치다.

### 중복 정의

- `Practice`, `Quiz`, `Outcome`, `Complete`: 세 문서에서 각각 시각 규칙, 학생용 정의, 원리/판정으로 반복된다. 역할별 중복은 허용되지만, 한 줄 canonical definition을 먼저 두어야 한다 (`DESIGN.md:229-237`, `TEAM_GLOSSARY.md:35-73`, `CONCEPTS.md:57-78`).
- `Atlas`, `Model Routing`: TEAM_GLOSSARY와 CONCEPTS에서 경계를 설명하고 DESIGN은 직접 정의하지 않는다. 이 분리는 비교적 적절하나, 용어집을 정본으로 명시해야 한다 (`TEAM_GLOSSARY.md:77-100`, `CONCEPTS.md:86-90`).

### 누락 정의

- 공통 상태: `present`, `verified`, `interactive`, `linked_static`, `embedded_only`, `data_unwired`, `missing`
- 판정/필드: `needs_retry`, `required Outcome`, `node_id`, `route`
- 학습 운영 용어: `Why Now`, `Reflection`, `Next`, `Sample Project`

현재 일부는 본문에서 사용되지만 공통 용어집의 정식 표제어로 관리되지 않는다 (`CONCEPTS.md:34-39`, `43-55`, `70-78`, `DESIGN.md:229-237`).

### 의존성 맵

- DESIGN.md → `STUDENT_JOURNEY.md`, `STAGE_COMPLETION_SPEC.md`, `NODE_QUALITY_GATE.md`, `ai-ops/master-toc.md`, 구현 시 `src/app/globals.css` (`DESIGN.md:13-16`, `25-27`, `216`).
- TEAM_GLOSSARY.md → `CONCEPTS.md`, `INTERFACE_SPEC.md`, `ai-ops/master-toc.md`, Journey/Outcome/Node Quality Gate (`TEAM_GLOSSARY.md:10-17`, `116-122`).
- CONCEPTS.md → `ATLAS-EDUCATION-LAYER.md`, DESIGN.md, TEAM_GLOSSARY.md, INTERFACE_SPEC.md, `ai-ops/master-toc.md` (`CONCEPTS.md:11-14`, `124-129`).
- 프로젝트 상위 SSOT → `STUDENT_JOURNEY.md` + Outcome 문서, `CONTENT_PIPELINE.md`, `ANIMATION_DESIGN_SYSTEM.md`, `STAGE_COMPLETION_SPEC.md`, `ASSESSMENT_SYSTEM.md`, `ATLAS-EDUCATION-LAYER.md` (`AGENTS.md:20-22`). 현재 세 문서의 직접 링크는 이 전체 집합을 완전히 반영하지 않는다.

참조 링크 자체는 점검 시점에 모두 존재했다. 링크 존재는 확인했지만 링크 대상 문서의 내용 정합성까지 이 검토에서 재검증한 것은 아니다.

---

## Gate Readiness

### 현재 상태

- **범위 준수: PASS.** `ai-ops/STATE.md:37-51`은 현재 `APPROVE_CONTENT_PM_DOCS`가 세 PM 문서 및 `INTERFACE_SPEC.md`, `ai-ops/master-toc.md`의 문서 전용 작업을 허용하고 소스 코드 수정을 금지한다고 명시한다. 이번 작업은 지정 보고서만 추가했으며 소스 코드는 수정하지 않았다.
- **문서 품질 준비: FAIL.** 목차 부재, 상태 용어 정본 부재, 업데이트 책임 부재, 상위 SSOT 의존성의 부분적 표기 때문에 세 문서를 즉시 “완료된 공통 계약”으로 승인하기 어렵다.
- 현재 작업 트리는 이미 다수의 선행 변경을 포함하고 있으므로, 본 보고서의 생성만으로 기존 변경의 소유권이나 품질을 승인하지 않는다 (`git status --short --branch` 점검 결과).

### Gate 진입 전 필수 작업

1. TEAM_GLOSSARY에 공통 상태·판정 용어의 정본 표를 만들고 DESIGN/CONCEPTS의 상태 집합을 일치시킨다.
2. 세 문서에 목차, owner, update trigger, next review를 추가한다.
3. 상위 SSOT 의존성(Content Pipeline, Animation Design System, Outcome/Assessment 포함)을 문서별로 명시하고 링크를 검증한다.
4. 대표 노드의 `node_id`/route/Practice/Quiz/Outcome 연결 예시와 검증 증거를 추가한다.

### Gate 진입 전 선택 작업

1. 용어별 학생 표시 예, 금지 표현, canonical source를 표로 확장한다.
2. DESIGN 컴포넌트별 구현 경로와 QA 체크리스트 링크를 추가한다.
3. 상태 전이 다이어그램과 `needs_retry` 복구 시나리오를 추가한다.

---

## Next Actions

1. 문서 담당자가 상태 용어의 정본 위치를 결정한다.
2. `TEAM_GLOSSARY.md`를 먼저 갱신한 뒤 DESIGN과 CONCEPTS의 상태·용어 참조를 동기화한다.
3. 상위 SSOT 링크, 대표 노드 예시, 목차/운영 메타데이터를 보완하고 동일 기준으로 재검토한다.
4. 재검토 후 범위 준수와 품질 준비를 분리해 `PASS` 또는 `HUMAN_APPROVAL_REQUIRED`로 기록한다.

