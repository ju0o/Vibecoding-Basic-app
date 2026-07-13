# Atlas Model Routing Learning Route — Feature Specification

| 항목 | 값 |
|---|---|
| parent_ssot | [ATLAS-EDUCATION-LAYER.md](ATLAS-EDUCATION-LAYER.md) |
| authority | **subordinate_feature_specification** (상위 PRD 하위 전용 명세) |
| status | **approved** — 운영자 승인 완료 (2026-07-13) |
| scope | education_layer_subordinate_learning_route |
| modifies_core_21_concepts | **false** |
| modifies_existing_14_section_contract | **false** |
| implementation_status | **not_started** (소스·콘텐츠 본문 모두 미착수) |
| 작성 기준일 | 2026-07-13 |
| 승인일 | 2026-07-13 |
| 승인 범위 | Feature Spec(MR-0) 한정. MR-1 이후 구현·배포는 별도 승인 |
| 제품 방향 | Evolution, not Rebuild |

> 본 문서는 Education Layer PRD의 **하위 Feature Spec**이다. 상위 정본을 대체하지 않으며, 21개 Concept·14섹션 계약을 변경하지 않는다. **Feature Spec은 승인됐으나, 소스 구현·KB 본문 수정·신규 KB 대량 생성·Simulator 구현은 MR-1 이후 Phase 승인 전 시작하지 않는다.**

---

# 1. 문서 권한과 상위 SSOT

| 계층 | 문서 | 권한 |
|---|---|---|
| 상위 SSOT | `ATLAS-EDUCATION-LAYER.md` | Education Layer 정본. 21 Concept · 14섹션 · Phase 0~12 · IA |
| 본 문서 | `ATLAS-MODEL-ROUTING-FEATURE-SPEC.md` | Orchestration→Evaluation→Harness 구간 **하위 Learning Route** 전용 명세 |
| Legacy 빌드 계획 | `ATLAS-BUILD-PLAN.md` | **HOLD**. 본 Feature Spec이 활성화하거나 수정하지 않음 |
| 영향 보고서 | `ai-ops/reports/atlas-phase-1-impact-report.md` | 기존 Phase 1 초안 영향 분석. 본 명세와 혼합하지 않음 |

**권한 규칙**

1. 상위 PRD와 충돌하면 **상위 PRD를 우선**한다.
2. 본 명세는 21개 Concept에 항목을 추가·삭제·재명명하지 않는다.
3. 본 명세는 기존 14섹션 챕터 계약을 바꾸지 않는다. Learning Unit 전용 계약은 하위에서만 관리한다.
4. 구현 착수는 **본 Feature Spec 운영자 승인 후**, 그리고 해당 구현 Phase 승인 후에만 한다.
5. 상위 PRD에 본 문서의 세부 시나리오·규칙 표를 복제하지 않는다. 링크와 원칙만 유지한다.

---

# 2. 배경

기존 AI-Ops 플랫폼과 Education Layer PRD는 이미 Agent, Workflow, Orchestration, Evaluation, Harness, Production AI 흐름을 정본 Concept로 정의했다. 학습자는 “여러 실행 단위를 어떻게 조율하는가”까지는 이해할 수 있으나, **어떤 작업을 누구에게·어떤 방식으로·어떤 비용 수준으로 맡기고, 실패 시 어떻게 검증·재시도·에스컬레이션하는가**를 하나의 연결 서사로 배우기 어렵다.

Model Routing은 업계 단일 표준 기술명이 아니라, 교육적으로 다음 결정을 묶는 **운영 패턴 학습 주제**다.

- 작업 분류
- 실행자 선택
- 모델·방식 선택
- 비용 인식
- 독립 검증
- 평가·재시도
- 사람 승인
- 결정 관측

본 Learning Route는 기존 구조 위에 하위 교육 경로로 얹으며, 기존 KB·강의·용어·파이프라인을 Depth Layer로 재사용한다.

---

# 3. 문제 정의

| 문제 | 학습 영향 |
|---|---|
| Orchestration만 배우면 “누가 무엇을 하는가”는 알지만 “왜 그 실행자인가”가 약하다 | 위임이 우연처럼 보인다 |
| Model selection을 독립 강의로만 보면 비용·위험·검증과 단절된다 | 모델 선택이 벤치마크 쇼핑으로 오해된다 |
| Evaluation·Harness를 따로 배우면 실패 후 경로가 보이지 않는다 | 재시도·승인·관측이 사후 부가물처럼 보인다 |
| 상위 21 Concept에 Routing을 새 Concept로 넣으면 정본 수가 팽창한다 | 기존 계약·여정·진행률 모델이 깨진다 |

**핵심 문제:** 학습자가 “여러 Agent를 만든 뒤, 작업을 안전하게·비용 인식적으로 라우팅하는 기준”을 Orchestration–Evaluation–Harness 사이에서 연속적으로 설명할 수 없다.

---

# 4. 목적

1. Orchestration → Evaluation → Harness 사이에 Model Routing **하위 Learning Route**를 정의한다.
2. 9개 Learning Unit으로 분류·라우팅·비용·검증·재시도·승인·관측을 순서 학습 가능하게 한다.
3. 규칙 기반 교육용 Simulator 계약(입력 축, rule ID, 결과 구조, 시나리오)을 명세한다.
4. 기존 8개 관련 KB를 Depth Layer로 재사용 매핑한다.
5. 기존 21 Concept·14섹션·lesson/checklist/bookmark Progress와 충돌 없이 확장 원칙을 고정한다.
6. 구현 Phase를 나누어 **문서 승인 → 데이터 계약 → 콘텐츠 → Simulator → QA** 순으로 안전하게 진행할 수 있게 한다.

---

# 5. 비목적

본 Feature Spec / 이번 문서 단계의 비목적:

- 21번째 이후 Concept 추가 또는 Concept 재배치
- 기존 14섹션 계약 변경
- 실제 외부 AI API·유료 모델 호출
- 프로덕션 라우터·게이트웨이·과금 시스템 구현
- 신규 KB 대량 생성 또는 기존 KB 본문 전면 개편
- ATLAS-BUILD-PLAN HOLD 해제 또는 12노드·13섹션 부활
- 기존 미커밋 Phase 1 코드 커밋·삭제·대규모 수정
- 계정·서버 동기화·실시간 관측 백엔드
- 업계 공식 “Model Routing 표준 등급” 제정 주장

---

# 6. 기존 Education Layer와의 관계

```text
Education Layer PRD (상위 SSOT, 승인 완료)
  ├─ 21 Concept Journey
  ├─ 14-section Chapters
  ├─ Graph · Timeline · Playground · Quiz · Progress
  └─ Subordinate Learning Routes
        └─ Model Routing (본 Feature Spec, 검토 대기)
              ├─ 9 Learning Units
              ├─ Why Bridges
              ├─ rule-based Simulator 계약
              └─ 기존 KB/Lesson Depth 링크
```

- Model Routing은 Experience Layer의 **부가 Learning Route**이며, 단독 제품이 아니다.
- 진입점 후보(구현 시 확정): Orchestration 챕터 말미 Why Bridge, Evaluation/Harness 관련 실습, `/atlas/playgrounds`의 routing simulator, Production Track 추천 경로.
- 상위 PRD의 Playground 원칙(결정론 시뮬레이션, API 키 없음, “시뮬레이션” 명시)을 계승한다.
- 상위 PRD Phase 8(Playground)·Phase 9(Quiz)와 정렬하되, **별도 하위 구현 Phase**로 승인받는다.

---

# 7. 기존 21개 Concept와의 관계

**원칙: `modifies_core_21_concepts: false`**

기존 21개 정본은 유지한다.

```text
AI → ML → Deep Learning → Generative AI → LLM → Prompt → Context → Memory
→ Knowledge → Embedding → RAG → Tool Calling → MCP → Skill → Agent → SubAgent
→ Workflow → Orchestration → Evaluation → Harness → Production AI
```

| 관계 | 설명 |
|---|---|
| 소속 구간 | Orchestration, Evaluation, Harness 사이를 **가로지르는** 하위 경로 |
| Concept 추가 | 없음. “Model Routing”을 22번째 Concept로 올리지 않음 |
| Chapter 계약 | 상위 3 Concept의 14섹션 본문은 기존 계약 유지. Learning Unit은 별도 데이터 |
| 그래프 | Learning Unit은 Concept의 하위 또는 횡단 노드로 연결 가능(§18). Concept 대체를 의미하지 않음 |

---

# 8. Orchestration·Evaluation·Harness 사이 배치 근거

| Concept | Model Routing이 배우는 것 |
|---|---|
| Orchestration | 작업을 나누고 넘기기 전에 **분류·실행자·모델 방식**을 고르는 기준 |
| Evaluation | 결과 품질·실패 신호를 보고 **재시도·경로 변경**을 결정하는 기준 |
| Harness | 권한·승인·한도·관측으로 라우팅 결정을 **감싸고 기록**하는 경계 |

배치 한 줄:

> 여러 Agent를 조율(Orchestration)한 뒤, 결과를 평가(Evaluation)하고, 실행을 안전하게 감싸려면(Harness) **누구에게 무엇을 어떤 비용으로 맡길지**를 가르는 학습 경로가 중간에 필요하다.

---

# 9. 학습 대상 사용자

| 페르소나 | 목표 |
|---|---|
| 비개발자·초보 개발자 | “왜 모든 작업에 가장 비싼 모델을 쓰지 않는가”를 시나리오로 이해 |
| Builder Track 학습자 | Agent/Workflow 이후 실무 라우팅 판단 연습 |
| Production Track 학습자 | 비용·위험·승인·관측을 운영 관점으로 연결 |
| 기존 100강 이수자 | model-selection, orchestration, evaluation, harness 강의를 하나의 Route로 재배치 학습 |

전제: 최소 Agent·SubAgent·Workflow 개념을 한 번 접한 사용자. 완전 초보자는 Orchestration 챕터 선행을 권장(잠금 아님).

---

# 10. 학습 목표

학습 완료 시 사용자는 다음을 할 수 있어야 한다.

1. 작업을 난이도·위험·반복성·판단 필요성·문맥 범위·가역성으로 분류한다.
2. Task Routing과 Executor Routing, Model Routing의 차이를 구분한다.
3. Cheap / Standard / Frontier가 **교육용 상대 분류**임을 설명한다.
4. 고성능 모델 일괄 사용의 비용 낭비를 Cost-Aware Orchestration으로 완화하는 이유를 말한다.
5. Independent Review가 “구현자 자기검증”과 다른 이유를 설명한다.
6. 실패 시 Evaluation → Retry → Escalation 경로를 시나리오로 고른다.
7. Human Approval이 필요한 조건을 위험·가역성 축으로 판단한다.
8. Routing Observability가 남기는 기록(rule ID, 분류, 추천, 검증, 승인)을 나열한다.
9. 위 전 과정이 Harness 경계 안에서 동작해야 함을 연결한다.

---

# 11. 신규 Learning Unit 9개

| # | Learning Unit ID (제안) | 이름 |
|---|---|---|
| 1 | `lu-task-classification` | Task Classification |
| 2 | `lu-task-routing` | Task Routing |
| 3 | `lu-executor-routing` | Executor Routing |
| 4 | `lu-model-routing` | Model Routing |
| 5 | `lu-cost-aware-orchestration` | Cost-Aware Orchestration |
| 6 | `lu-independent-review` | Independent Review |
| 7 | `lu-evaluation-retry` | Evaluation & Retry |
| 8 | `lu-human-escalation` | Human Escalation |
| 9 | `lu-routing-observability` | Routing Observability |

ID는 구현 Phase에서 스키마에 고정한다. 이름 변경이 필요하면 운영자 승인 후 본 명세를 갱신한다.

---

# 12. 각 Learning Unit의 한 줄 정의

| Learning Unit | 한 줄 정의 |
|---|---|
| Task Classification | 작업을 실행 전에 속성 축으로 분류해 “무엇인 일인가”를 명시한다. |
| Task Routing | 분류 결과에 따라 작업이 어떤 처리 경로(흐름)로 들어갈지 고른다. |
| Executor Routing | 경로 안에서 실제 수행 주체(사람·단일 Agent·SubAgent·도구 파이프라인 등)를 고른다. |
| Model Routing | 실행자가 모델이 필요할 때 교육용 상대 등급·방식으로 모델 선택을 고른다. |
| Cost-Aware Orchestration | 품질·지연·비용·위험을 함께 보고 과도한 고비용 경로를 피한다. |
| Independent Review | 구현·생성 주체와 분리된 검토로 자기검증 편향을 줄인다. |
| Evaluation & Retry | 성공 기준 미달 시 재시도·경로 변경·중단 조건을 적용한다. |
| Human Escalation | 자동화 한계·고위험·비가역 지점에서 사람에게 넘긴다. |
| Routing Observability | 분류·추천·규칙·검증·승인 결정을 기록·설명 가능하게 남긴다. |

---

# 13. 학습 순서

권장 순서(잠금 아님, Story Tour/Production Track 추천):

```text
Orchestration (기존 Concept)
→ Task Classification
→ Task Routing
→ Executor Routing
→ Model Routing
→ Cost-Aware Orchestration
→ Independent Review
→ Evaluation & Retry
→ Human-in-the-Loop / Escalation
→ Routing Observability
→ Harness (기존 Concept)
```

Evaluation Concept 본편 학습과 Evaluation & Retry Unit은 **상호 참조**한다. Unit이 Evaluation Concept을 대체하지 않는다.

---

# 14. Why Bridge

학습 서사 논리(노드 사이 연결 문장 원천):

```text
여러 Agent를 만들었다.
↓
하지만 어떤 작업을 누구에게 맡길지 기준이 없었다.
↓
Task Classification과 Task Routing이 필요해졌다.
↓
실행자를 골라도 어떤 방식과 어떤 모델을 쓸지 결정해야 했다.
↓
Executor Routing과 Model Routing이 필요해졌다.
↓
모든 작업에 고성능 모델을 사용하면 비용이 낭비됐다.
↓
Cost-Aware Orchestration이 필요해졌다.
↓
결과가 좋아 보여도 구현자가 스스로 검증하면 편향이 생길 수 있었다.
↓
Independent Review가 필요해졌다.
↓
실패 후 무엇을 할지 기준이 필요했다.
↓
Evaluation, Retry, Escalation이 필요해졌다.
↓
자동 결정의 근거와 기록이 필요했다.
↓
Routing Observability가 필요해졌다.
↓
이 모든 실행·평가·복구·승인을 안정적으로 감싸는 Harness가 필요해졌다.
```

UI 연결선 문구는 위 논리의 1문장 압축본을 사용한다. 장식용 연결선 금지.

---

# 15. 기존 KB 재사용 매핑

기존 KB는 **삭제·대규모 수정 없이** Depth Layer로 재사용한다. 아래는 저장소 실측 ID·경로다.

| Learning Unit | 재사용 KB id | 파일 경로 | 비고 |
|---|---|---|---|
| Model Routing, Cost-Aware | `model-selection-tradeoffs` | `ai-ops/knowledge-base/entries/T08/model-selection-tradeoffs.md` | status: approved |
| Task/Executor Routing, Orchestration 연결 | `orchestration` | `ai-ops/knowledge-base/entries/T10/orchestration.md` | 강의 slug `multi-agent-orchestration` 소비자 |
| Executor Routing, SubAgent 위임 | `subagents` | `ai-ops/knowledge-base/entries/T10/subagents.md` | 강의 slug `subagents-and-delegation` 소비자 |
| Evaluation & Retry | `ai-system-evaluation` | `ai-ops/knowledge-base/entries/T10/ai-system-evaluation.md` | status: approved |
| Evaluation & Retry, 루프 종료 | `loop-engineering` | `ai-ops/knowledge-base/entries/T10/loop-engineering.md` | 강의 slug `loop-engineering-basics` 소비자 |
| Human Escalation, Observability, Harness 연결 | `harness` | `ai-ops/knowledge-base/entries/T10/harness.md` | 강의 slug `harness-engineering-basics` 소비자 |
| Human Escalation, 협업 패턴 | `human-ai-collaboration-patterns` | `ai-ops/knowledge-base/entries/T11/human-ai-collaboration-patterns.md` | status: approved |
| Independent Review, 위험 판단 | `code-change-risk-analysis` | `ai-ops/knowledge-base/entries/T12/code-change-risk-analysis.md` | status: approved |

**매핑 규칙**

- 교육 지시문의 이름(`multi-agent-orchestration` 등)은 **강의 slug 또는 통칭**일 수 있다. 정본 참조는 **KB `id` 필드**를 사용한다.
- Feature 구현 시 consumer 목록에 `atlas-model-routing` 표기를 추가할 수 있으나, **KB 본문 재작성은 하지 않는다**(갭이 있을 때만 P-01/P-02).

---

# 16. 신규 KB가 필요한 주장

다음 주장만 신규·보강 KB 후보로 본다. **지금 단계에서 생성하지 않는다.**

| 후보 주제 | 필요 조건 | 처리 |
|---|---|---|
| 교육용 라우팅 규칙 카탈로그(rule ID 사전) | Simulator 규칙이 공식 제품 기능처럼 오해될 때 | claimScope=`educational_pattern`으로 내부 데이터 우선. 공식 근거 필요한 문장만 KB |
| 특정 벤더 라우터 제품 기능 | Timeline/사례에 제품명을 넣을 때 | 공식 문서 + P-01/P-02, score≥80 |
| 독립 리뷰어 패턴의 제품 사례 | Independent Review 사례 섹션 | 기존 code-change-risk / collaboration KB로 부족할 때만 |
| 관측(trace·approval log) 제품 기능 | Observability 사실 문장 | 기존 harness KB sources 우선, gap 시 증분 |

**금지:** “Model Routing이 202X년에 발명되었다” 유형의 단일 기원 서사 KB.

---

# 17. LearningUnit과 Pattern 노드 원칙

| 노드 종류 | 역할 | Concept와 관계 |
|---|---|---|
| LearningUnit | 하위 경로의 학습 단위(9개) | 21 Concept를 대체하지 않음 |
| Pattern (선택) | 재사용 가능한 운영 패턴 요약(예: cost-aware cascade, dual control review) | Unit에 부착. 그래프 전도 기본 미표시 가능 |
| Scenario | Simulator·퀴즈용 사전 정의 사례 | Unit/Pattern이 참조 |
| RoutingRule | 결정론 규칙 | Simulator 전용 데이터 |

원칙:

1. LearningUnit은 14섹션 Concept Chapter 의무를 **지지 않는다**(하위 전용 계약).
2. 필요 시 Unit 카드 템플릿(정의·Why·시나리오·Simulator 딥링크·Depth 강의·Quiz)을 쓰되, 상위 14섹션과 혼동 표기 금지.
3. Pattern 노드는 교육 압축용이며 공식 표준 명칭 사칭 금지.

---

# 18. Knowledge Graph 연결 관계

기존 관계 유형을 재사용·확장한다. 신규 타입이 필요하면 구현 Phase에서 스키마 승인.

| 관계 | from → to | 의미 |
|---|---|---|
| `evolves_to` / Why Bridge | Unit 순서 | 학습 서사 흐름 |
| `solves_limit_of` | 다음 Unit → 이전 Unit | 이전 한계 해결 |
| `requires` | Unit → Concept | 이해 선행(예: Model Routing requires Orchestration) |
| `uses` | Unit → KB/Lesson | Depth Layer |
| `evaluated_by` | Route 결과 → Evaluation Unit | 평가 연결 |
| `bounded_by` | 전 Unit → Harness | 실행 경계 |
| `deepens` | Unit → Lesson | 기존 강의 심화 |
| `evidenced_by` | 사실 문장 → KB | 근거 |

그래프 UX: Journey에서는 Orchestration–(Route ribbon)–Evaluation–Harness로 축약 가능. 전체 21 전도에 9 Unit을 항상 펼치지 않는다(과밀 방지, 상위 PRD §7.3 정합).

---

# 19. Progress 저장 원칙

상위 PRD의 통합 `LearningStateV2` 확장을 따른다. **별도 localStorage 키로 완전 분리된 진행률 섬을 만들지 않는다**(미커밋 Phase 1의 분리 Atlas progress 패턴은 채택하지 않음).

제안 필드(구현 시 스키마 확정):

```ts
atlas: {
  // 기존 concept 진행…
  learningRoutes?: {
    "model-routing": {
      units: Record<string, {
        visited: boolean
        read: boolean
        quizBestScore: number
        simulatorDone: boolean
        teachBackDone: boolean
      }>
      lastUnitId?: string
      simulatorRuns?: number // 개인 기기 내 카운트, 서버 전송 없음
    }
  }
}
```

원칙:

1. 기존 `completedLessons` / `checklistItems` / `bookmarks`와 키 충돌 금지.
2. V1→V2 마이그레이션 실패 시 기존 강의 기록 보존.
3. 서버 분석·추적 기본 도입 금지.
4. export/import JSON에 route 진행을 포함 가능.

---

# 20. 기존 lesson / checklist / bookmark와의 분리 원칙

| 기존 자산 | 관계 |
|---|---|
| Lesson 완료 | Unit의 `deepens` 배지로 표시 가능. Lesson 완료 ≠ Unit 완료 |
| Checklist | 기존 강의 체크리스트와 Unit 셀프체크를 동일 배열에 섞지 않음 |
| Bookmark | 강의 slug 북마크와 Unit/Simulator 북마크 네임스페이스 구분 |
| 검색 | 기존 lesson/glossary/resource에 concept/playground 종류 추가 시 route unit은 명시적 kind |

**분리 한 줄:** Textbook 진도와 Atlas Concept 진도와 Learning Route 진도는 한 상태 객체 안에서 **필드만 구분**하고, 의미상 서로 대체하지 않는다.

---

# 21. Simulator 목적

교육용 **Routing Decision Simulator**는 사용자가 입력 축을 바꾸거나 시나리오를 고를 때, **미리 정의된 규칙**으로 추천 Route를 설명하는 장치다.

목적:

1. 추상 정의를 입력→규칙→결과 표로 관찰하게 한다.
2. rule ID를 노출해 “왜 이 추천인가”를 추적 학습한다.
3. 비용·위험·승인·실패 다음 전략을 한 화면에서 연결한다.
4. 외부 모델 호출 없이 정적 export 환경에서 동작한다.

---

# 22. Simulator 비목적

- 실제 LLM/API 호출 또는 실시간 벤더 라우팅
- 프로덕션 정책 엔진·과금 최적화 SaaS
- “정답 모델 한 개”를 절대 진리로 제시
- drag-only 조작, 무거운 graph/motion 라이브러리 의존
- 시크릿·API 키 입력 UI
- 서버 저장 학습 분석

모든 화면에 **「교육용 시뮬레이션 · 실제 모델 호출 없음」** 배지를 표시한다.

---

# 23. 입력 축

사용자가 조절하거나 시나리오가 고정하는 축:

| 축 | 교육용 스케일(제안) | 의미 |
|---|---|---|
| 난이도 (difficulty) | 1–5 | 추론·전문성 요구 |
| 위험도 (risk) | 1–5 | 잘못될 때 피해 |
| 반복성 (repetition) | 1–5 | 동일 패턴 반복 빈도 |
| 판단 필요성 (judgment) | 1–5 | 애매한 경계·정책 판단 |
| 문맥 범위 (contextScope) | 1–5 | 필요한 문맥·자료 넓이 |
| 가역성 (reversibility) | 1–5 | 높을수록 되돌리기 쉬움 |

UI: 슬라이더 + 숫자 입력 + 키보드 조작. **색만으로 위험도를 표시하지 않는다**(숫자·라벨·아이콘 병행).

---

# 24. RoutingRule 구조

결정론 규칙 데이터 계약(초안):

```ts
type RoutingRule = {
  id: string                 // 예: "RR-COST-02"
  name: string
  priority: number           // 낮을수록 우선(또는 명시적 cascade)
  when: {
    // 축 조건. 구현 시 스키마로 엄격화
    difficulty?: { min?: number; max?: number }
    risk?: { min?: number; max?: number }
    repetition?: { min?: number; max?: number }
    judgment?: { min?: number; max?: number }
    contextScope?: { min?: number; max?: number }
    reversibility?: { min?: number; max?: number }
  }
  then: {
    taskClass: string
    executor: string
    modelClass: "cheap" | "standard" | "frontier" | "none"
    verification: string
    approvalRequired: boolean
    onFailure: string
    rationale: string        // 교육용 설명
  }
  claimScope: "educational_pattern" | "product_documented"
  sources?: string[]         // product_documented일 때 KB/source 필수
}
```

평가 순서: 우선순위 cascade → 첫 매칭(또는 명시적 multi-match 설명 모드). **동일 입력은 항상 동일 결과**(순수 함수).

---

# 25. rule ID 노출 방식

1. 결과 패널 상단/표 열에 `적용된 rule ID`를 항상 표시한다.
2. rule ID 클릭/포커스 시 조건 요약·rationale·claimScope를 펼친다.
3. 복수 규칙이 참고된 경우 primary + supporting ID 목록을 보여준다.
4. 사용자가 축을 바꾸면 이전 rule ID와 새 rule ID diff를 짧게 설명한다(장식 애니메이션 불필요).
5. 퀴즈·Teach-back에서 rule ID 암기보다 **조건→결과 인과**를 평가한다.

---

# 26. 분류 결과 구조

Simulator 출력 최소 필드:

| 필드 | 설명 |
|---|---|
| appliedRuleIds | 적용된 rule ID 목록 |
| classification | 작업 분류 결과(taskClass 등) |
| recommendedExecutor | 추천 실행자 |
| recommendedModelClass | cheap/standard/frontier/none + **교육용 상대 분류** 고지 |
| relativeCostIndex | 교육용 상대 비용 지수(절대 달러/토큰 가격 아님) |
| rationale | 추천 이유 |
| verificationMethod | 검증 방식 |
| approvalRequired | 승인 필요 여부 |
| nextStrategyOnFailure | 실패 시 다음 전략 |
| claimScope | 교육 패턴 vs 제품 문서 근거 |
| textRouteTable | 스크린리더·모바일용 텍스트 표 동등 정보 |

시각 Route 다이어그램이 있어도 **동일 내용의 텍스트 표가 반드시** 존재해야 한다.

---

# 27. 사전 정의 시나리오

공통 시나리오 스키마:

```ts
type RoutingScenario = {
  id: string
  title: string
  summary: string
  axes: {
    difficulty: number
    risk: number
    repetition: number
    judgment: number
    contextScope: number
    reversibility: number
  }
  learningFocus: string[]
  expectedPrimaryRuleId?: string  // QA용, UI 정답 스포일러 기본 숨김 가능
}
```

시나리오 팩(최소 4군 — §28~§31). 구현 시 각 군 1개 이상, 권장 군당 2개.

---

# 28. 결정적 작업 시나리오

**예시:** “의존성 버전 핀이 명시된 체크리스트성 문서 포맷 변환”

| 축 | 값(예) |
|---|---:|
| difficulty | 1–2 |
| risk | 1–2 |
| repetition | 4–5 |
| judgment | 1 |
| contextScope | 1–2 |
| reversibility | 5 |

**학습 포인트:** 저위험·고반복·저판단 → 저비용 실행자/규칙 경로, 무거운 Frontier 불필요. Independent Review는 샘플 검사 수준.

---

# 29. 일반 구현 시나리오

**예시:** “기존 UI에 필터 옵션 추가, 테스트 가능, 롤백 용이”

| 축 | 값(예) |
|---|---:|
| difficulty | 3 |
| risk | 2–3 |
| repetition | 2–3 |
| judgment | 2–3 |
| contextScope | 3 |
| reversibility | 4 |

**학습 포인트:** Standard 경로 + 자동 테스트 검증 + 선택적 동료 리뷰. Cost-Aware가 “항상 Frontier”를 거부하는 이유.

---

# 30. 고위험 작업 시나리오

**예시:** “프로덕션 권한·과금·개인정보 삭제에 가까운 변경”

| 축 | 값(예) |
|---|---:|
| difficulty | 3–5 |
| risk | 5 |
| repetition | 1–2 |
| judgment | 4–5 |
| contextScope | 4–5 |
| reversibility | 1–2 |

**학습 포인트:** approvalRequired=true, Independent Review 필수, Human Escalation 가능성, Harness 권한 경계. 색상 외 **「고위험」텍스트 라벨** 필수.

---

# 31. 실패·Retry·Escalation 시나리오

**예시:** “1차 자동 구현이 테스트 실패, 동일 경로 재시도 1회 후 리뷰어 경유”

**학습 포인트:**

1. Evaluation 기준 미달 감지
2. Retry 한도(무한 루프 금지)
3. 경로 변경(더 강한 검증·다른 실행자)
4. 한도 초과 시 Human Escalation
5. Observability에 실패 이유·rule·시도 횟수 기록

Simulator는 실패 분기 토글 또는 “1차 결과 실패” 체크박스로 다음 전략을 보여준다.

---

# 32. Independent Review 학습 방식

| 요소 | 내용 |
|---|---|
| 핵심 메시지 | 생성/구현 주체와 검토 주체를 분리한다 |
| 오해 교정 | “자기 테스트 통과 = 충분한 리뷰” 아님 |
| 연결 KB | `code-change-risk-analysis`, `human-ai-collaboration-patterns` |
| Simulator | 위험·가역성 임계 이상에서 reviewExecutor 분리 표시 |
| Quiz | 동일 Agent가 작성·승인한 경우의 편향 시나리오 |
| 비범위 | 실제 다중 모델 교차 호출 구현 |

---

# 33. Human Approval 학습 방식

| 요소 | 내용 |
|---|---|
| 핵심 메시지 | 자동화 끝 ≠ 책임 끝. 고위험·비가역·정책 애매 구간은 사람 |
| 표시 | approvalRequired, 승인자 역할(교육용 라벨), 대기 상태 |
| 연결 | Harness guardrails / human review (KB `harness`) |
| Simulator | 승인 필요 시 결과 패널에 체크리스트형 승인 조건 |
| 접근성 | 승인 상태를 색이 아닌 텍스트로 고지 |
| 비범위 | 실제 워크플로 승인 백엔드 |

---

# 34. Quiz

상위 PRD §14 정합 + Route 전용 보강.

| 항목 | 규칙 |
|---|---|
| 범위 | Route 전체 세트 + Unit별 소퀴즈 가능 |
| 문항 수 | Route 종합 5~8, Unit 3~5 |
| 유형 | 시나리오 판단, 축 해석, 순서, 오해 교정, OX+이유 |
| 금지 | 벤더 가격 암기, 공식 등급 사칭 문항 |
| 필수 | 교육용 라벨 고지 이해 문항 1개 이상 |
| 통과 | 60% 이해 확인, 재응시 무제한, 벌점·랭킹 없음 |
| 해설 | 관련 Unit·KB·Simulator 시나리오 딥링크 |

---

# 35. Checkpoint

Teach-back / 셀프 체크(서버 미전송):

1. 분류 축 6개를 말했는가.
2. Task / Executor / Model Routing 차이를 구분했는가.
3. 비용 인식 라우팅 이유를 말했는가.
4. Independent Review 필요 순간을 예로 들었는가.
5. 실패 시 Retry vs Escalation을 구분했는가.
6. Observability에 남겨야 할 최소 기록을 나열했는가.
7. Harness가 이 Route를 감싸는 이유를 말했는가.

---

# 36. 접근성

필수:

- 키보드만으로 축 조절·시나리오 선택·결과 탐색 완료
- drag-only 조작 금지(드래그 제공 시 동등 버튼/입력)
- 결과 영역 `aria-live` (polite)로 추천 변경 고지
- 텍스트형 Route 표 제공
- 위험도는 색 + 텍스트 라벨 + 숫자
- 포커스 순서 논리성, 44px 터치 타깃, 본문 16px+, 대비 유지
- 스크린리더용 rule ID·승인 필요 여부 명확 낭독

---

# 37. reduced-motion

- `prefers-reduced-motion: reduce`에서 자동 재생·장식 트랜지션 제거
- Route 변화는 즉시 텍스트/표 업데이트로 전달
- 단계 애니메이션이 있으면 정지 프레임 + 이전/다음 버튼으로 동일 정보 제공

---

# 38. 정적 export

- Next.js static export 유지
- 서버 Action·인증 게이트·런타임 모델 프록시 없음
- Simulator 상태 전부 클라이언트 메모리 + 선택적 localStorage
- 빌드 시 시나리오·규칙 데이터를 정적 모듈로 포함

---

# 39. client island 경계

| 영역 | 렌더 |
|---|---|
| Learning Unit 설명·Why Bridge 문장 | 정적 |
| 시나리오 목록·규칙 카탈로그 읽기 | 정적 데이터 |
| 축 슬라이더·시나리오 토글·결과 계산 | **작은 client island** |
| Quiz runner | 기존/공용 client 패턴 재사용 |
| Progress write | 기존 LearningState 어댑터 |

금지: Atlas 전체 레이아웃을 client bundle로 승격.

---

# 40. 번들·성능 제한

- 신규 graph/physics/motion 라이브러리 추가 금지(상위 PRD와 동일)
- SVG + CSS 우선
- Simulator island는 규칙 평가 순수 함수 + 최소 UI
- 불필요한 대형 아이콘 세트·차트 라이브러리 금지
- 성능 예산은 상위 Phase 11 전수 QA에서 회귀 확인

---

# 41. 출처 우선순위

1. 공식 제품 문서·사양·엔지니어링 블로그(이미 KB에 검증된 것 우선)
2. 승인 KB (`status: approved`, score 정책 준수)
3. Quote Bank 일치 인용
4. 교육용 합성 시나리오·규칙(`claimScope: educational_pattern`) — **사실처럼 단정 금지**
5. 2차 언론·순위 사이트 — 채택하지 않음(또는 공식 교차 확인 전 금지)

---

# 42. P-01 / P-02 검증 절차

Route 관련 **사실 주장**이 신규로 필요할 때만:

1. **P-01** 수집: 공식 URL, 인용, checkedAt, consumers에 atlas-model-routing
2. **P-02** 검증: Knowledge Score 게이트, 원문 대조
3. 교육 패턴 문장과 제품 사실 문장을 분리 표시
4. Lesson/Unit 생성은 근거 KB approved 이후(상위 파이프라인과 동일)
5. Simulator 규칙 자체는 코드/데이터 리뷰로 검증하고, 제품 사실로 위장하지 않음

---

# 43. claimScope

| claimScope | 사용 |
|---|---|
| `educational_pattern` | 상대 등급, 합성 시나리오, 교육용 rule 카탈로그 |
| `product_documented` | 특정 제품의 routing/approval/eval 기능 설명 — KB 필수 |

UI·콘텐츠에서 claimScope를 숨기지 않는다. 최소한 결과 패널과 Evidence Drawer에 표시.

---

# 44. 교육용 라벨 고지

다음 라벨은 **업계 공식 표준 등급이 아니다.**

- Cheap
- Standard
- Frontier
- 상대 비용 지수 (Relative Cost Index)

**필수 고지 문구(동등 의미 유지):**

> 이 분류는 학습을 위한 상대 비교용 라벨이며, 특정 벤더의 공식 티어·가격표·벤치마크 등급이 아닙니다.

표시 위치: Simulator 헤더, Model Routing Unit 도입, Quiz 관련 문항, 결과 표 modelClass 열 도움말.

---

# 45. Timeline 연결 원칙

- Model Routing을 **특정 연도 단일 발명** 또는 **공식 표준**처럼 표시하지 않는다.
- System Timeline에는 **공식 근거가 있는 제품 기능·사양·운영 패턴**만 선택 연결한다.
  - 예: 문서화된 model selection 가이드, agent orchestration handoff, guardrails/human review, eval harness 개념
- 이벤트 데이터 규칙은 상위 PRD §8.2(`kbId`, `sourceUrl`, `checkedAt`)를 그대로 따른다.
- 근거 없는 “라우팅의 역사” 서사 금지.

---

# 46. 단계별 구현 Phase

본 Feature는 상위 Phase와 **병행 가능하나 별도 승인 게이트**를 갖는다. HOLD Build Plan을 대체하지 않는다.

| Phase | 이름 | 산출 | 구현 착수 조건 |
|---|---|---|---|
| MR-0 | Spec Review (현재) | 본 Feature Spec | 운영자 검토 |
| MR-1 | Data Contract | Unit ID, rule/scenario 타입, progress 필드, 그래프 edge | Spec 승인 |
| MR-2 | Content Skeleton | 9 Unit 카드 문구·Why Bridge·Depth 링크(본문 최소) | MR-1 승인 |
| MR-3 | Simulator MVP | 규칙 엔진 + 시나리오 4군 + 결과 표 + a11y | MR-1 승인, client island |
| MR-4 | Quiz & Checkpoint | 종합 퀴즈·Teach-back | MR-2/3 일부 완료 |
| MR-5 | Integration QA | 정적 export, reduced-motion, 회귀, 라벨 고지 전수 | MR-3/4 완료 |

**이번 문서 작업 범위 = MR-0만.** 소스·UI·KB 본문 변경 없음.

---

# 47. 위험과 완화책

| 위험 | 완화 |
|---|---|
| 22번째 Concept로 오해 | 문서 헤더·상위 PRD 링크에 `modifies_core_21_concepts: false` 반복 |
| 교육 라벨이 공식 등급으로 오해 | 고정 고지 문구 + claimScope |
| 외부 API 요구로 범위 팽창 | Simulator 비목적·정적 export 명시 |
| 기존 Phase 1 코드와 progress 충돌 | 통합 LearningState만 허용, 분리 키 금지 |
| 그래프 과밀 | Unit은 ribbon/국소 뷰, 전도 기본 접기 |
| 상위 PRD와 세부 중복 | 상위는 링크만, 세부는 본 문서만 |
| Spec 승인을 구현 승인으로 오해 | Spec=approved, implementation=not_started 분리 기록 · MR-1 게이트 유지 |

---

# 48. 비범위 항목

- 프로덕션 모델 게이트웨이·A/B 라우팅 인프라
- 실시간 가격 API 연동
- 다중 벤더 자동 경매
- 서버형 승인 워크플로
- 신규 motion/graph 라이브러리
- 21 Concept 재작성
- 기존 100강 본문 수정
- ATLAS-BUILD-PLAN 활성화
- 본 단계에서의 커밋/push 강제

---

# 49. 운영자 승인 필요 사항

## 49.1 MR-0에서 승인된 사항 (2026-07-13)

| # | 항목 | 상태 |
|---|---|---|
| 1 | 본 Feature Spec 승인 (MR-0 종료) | **approved** |
| 2 | 9 Learning Unit 이름·순서 | Spec 본문 채택 |
| 3 | Simulator 입력 축 6개 및 1–5 스케일 | Spec 본문 채택 |
| 4 | Cheap/Standard/Frontier 교육 라벨 고지 문구 | Spec §44 채택 |
| 5 | Progress를 통합 LearningState 하위로 둘 것 | Spec §19 채택 |

## 49.2 아직 남은 결정 (구현 게이트)

| # | 항목 | 상태 |
|---|---|---|
| 6 | MR-1 Data Contract 착수 승인 | **대기** |
| 7 | Timeline에 연결할 제품 사건 후보(근거 있는 것만) | 콘텐츠 Phase에서 |
| 8 | 신규 KB 필요 시 P-01 착수 허용 여부 | gap 발생 시 |

승인 범위 과장 금지: **Spec 승인 ≠ 소스 구현 승인 ≠ 공개 배포 승인.**

---

# 50. 완료 기준

## 50.1 본 문서 단계(MR-0) 완료 기준

- [x] 상위 SSOT·하위 권한·status가 헤더에 명시됨
- [x] 21 Concept / 14섹션 비변경 명시
- [x] 9 Unit·학습 순서·Why Bridge 수록
- [x] KB 실측 경로 매핑
- [x] Simulator 목적/비목적·축·규칙·결과·시나리오 계약
- [x] a11y · reduced-motion · static export · client island · 번들 제한
- [x] claimScope · 교육 라벨 · Timeline 원칙
- [x] 구현 Phase · 위험 · 비범위 · 운영자 결정 · 완료 기준
- [x] **운영자 승인** (2026-07-13) — MR-0 완료

## 50.2 구현 완료 기준(향후, MR Phase 승인 후)

1. 9 Unit이 Orchestration→Harness 서사로 순회 가능
2. Simulator가 외부 API 없이 결정론 동작, rule ID·표·aria-live 제공
3. 교육 라벨 고지가 전 진입점에 존재
4. 기존 21 Concept 수·14섹션·100강·KB 본문 회귀 없음
5. Progress가 기존 lesson 기록을 지우지 않음
6. 키보드·모바일·reduced-motion 완주 가능
7. `npm run verify` 및 Route 전용 QA 통과

---

## 승인 상태 및 다음 단계

| 항목 | 상태 |
|---|---|
| Feature Spec (MR-0) | **approved** (2026-07-13) |
| MR-1 Data Contract | **다음 후보** — 착수 전 운영자 승인 필요 |
| 소스·Simulator·콘텐츠 구현 | **not_started** |

다음 권장 작업은 **MR-1 Data Contract 계획 보고**다. Unit ID, RoutingRule/Scenario 타입, progress 필드, 그래프 edge 초안만 다루며 기존 Phase 1 미커밋 코드와 섞지 않는다. 구현 코드·KB 본문 변경은 MR-1 승인 후에만 한다.

관련 상위 문서: [ATLAS-EDUCATION-LAYER.md](ATLAS-EDUCATION-LAYER.md)  
Build Plan: [ATLAS-BUILD-PLAN.md](ATLAS-BUILD-PLAN.md) (**HOLD**)  
Phase 1 영향 보고서: [../reports/atlas-phase-1-impact-report.md](../reports/atlas-phase-1-impact-report.md) (보존, 본 명세와 혼합 금지)
