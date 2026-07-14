# Student Journey

```yaml
document: STUDENT_JOURNEY
authority: project_top_ssot_candidate
status: operator_review_required
priority: highest_over_website_atlas_course
product: learning_experience
site_role: viewer
atlas_role: knowledge_layer
living: true
date: 2026-07-14
modifies_core_21_concepts: false
deletes_existing_atlas: false
code_change: false
can_activate_build_plan: false
```

---

## 0. 문서 지위

이 문서는 **프로젝트 최상위 SSOT 후보**다.

| 이것보다 아래 | 이유 |
|---|---|
| Website | Viewer일 뿐 |
| Atlas | Knowledge Layer — 강의 대체 아님 |
| Course / 모듈 목록 | Journey의 구현 묶음 |
| 개별 기능 스펙 | 경험을 돕는 수단 |

**승인 후** 모든 강의 · Atlas 연결 · Tool · Practice · Studio 작업은  
이 Student Journey를 기준으로 생성·검토한다.

형제 문서:

| 문서 | 역할 |
|---|---|
| [LEARNING_EXPERIENCE_PRINCIPLES.md](./LEARNING_EXPERIENCE_PRINCIPLES.md) | 교육 철학 |
| [LEARNING_ROADMAP.md](./LEARNING_ROADMAP.md) | START→END 지도 |
| [LEARNING_NODE_SPEC.md](./LEARNING_NODE_SPEC.md) | 노드 필드 계약 |

하위 실행 (우선순위 낮음 · 정합 유지):  
`EDUCATION_PLATFORM_MASTER_PLAN.md`, Course / Pipeline / Curriculum 시스템 문서.

---

## 1. 최종 Goal (재정의)

이 프로젝트는

> 세계 최고의 AI·바이브코딩 **교육 사이트**를 만드는 것

이 아니라

> 세계 최고의 **「AI와 함께 성장하는」 학습 경험**을 만드는 것

이다.

매 결정:

```text
학생이 정말 이해하는가?
```

---

## 2. 중심 루프 — 학생 경험

설계·콘텐츠·UI·에이전트 작업은 모두 이 루프에 연결되어야 한다.

```text
무엇을 알고 있는가
  → 지금 무엇이 궁금한가
  → 다음 무엇을 배우는가
  → 왜 이것을 배우는가
  → 직접 무엇을 해보는가
  → 어디까지 이해했는가
  → 다음으로 어디를 가는가
```

**Journey = 이 루프가 시간에 따라 이어지는 성장 과정.**  
강의 목록·메뉴·Atlas 그래프가 Journey를 대신하지 않는다.

---

## 3. 학생이 사이트에 들어온 순간 (Day 0 → Day 1)

### 3.1 도착 상태

| 차원 | 가정 (비개발자) |
|---|---|
| 알고 있음 | AI 채팅을 조금 써 봤을 수 있음 · 코딩은 막연히 어려움 |
| 궁금함 | “나도 앱/웹을 만들 수 있나?” “바이브코딩이 뭐지?” |
| 두려움 | 용어 · 설치 · 실패 메시지 |
| 원하지 않음 | 백과사전 탐험부터 · 도구 20개 소개부터 |

### 3.2 사이트가 보여 줘야 하는 것 (경험 요구 · 미구현 명세)

구현은 **이 문서 승인 후 · Website Last**. 지금은 경험 정의만.

```text
1. 한 줄: 여기서는 AI와 함께 “만드는 법”을 이해하며 간다
2. Start Learning — Day 1 첫 노드로 바로
3. “지금 나” 위치 (진도) — 나중에
4. 막히면 Atlas / Wiki — 심화·용어 (메인 아님)
5. 강의 100개 목록을 메인으로 던지지 않음
```

### 3.3 Day 1 경험 시퀀스 (예시)

| 순간 | 학생 내면 | 시스템/콘텐츠 응답 | 학생이 얻는 것 |
|---|---|---|---|
| 입장 | 뭐부터? | Start Learning · “왜 코딩이 바뀌었나” 또는 바이브코딩 입구 | 방향 |
| 질문 | 바이브코딩이 뭐지? | 학생 질문으로 여는 본문 | 정의가 아닌 **감각** |
| 이해 | AI랑 같이 만든다는 거구나 | 짧은 예시 · 다이어그램 | 한 문장 설명 가능 |
| 실습 | 직접 해본다 | 안전한 초미니 실습 (채팅/지시 1회 등) | “했다” 경험 |
| 점검 | 진짜 알았나? | teach-back 한 줄 또는 퀴즈 1–2 | 완료 감각 |
| 다음 | 그다음은? | why_now: AI/LLM을 알아야 같이 일한다 | 자발적 진행 |

Day 1 성공 정의:

```text
학생이 “바이브코딩/이 학습이 무엇인지”를 자기 말로 말할 수 있고,
다음 노드로 가는 이유를 수긍한다.
```

---

## 4. Journey 전체 경험 (요약)

상세 지도·Stage: [LEARNING_ROADMAP.md](./LEARNING_ROADMAP.md)

```text
START
  왜 바뀌는가 → 바이브코딩 → AI → LLM
  → IDE → AI IDE → VS Code
  → Node → Terminal → 첫 프로젝트 → 파일 구조
  → HTML → CSS → JS → Frontend
  → Backend → Database → API
  → Git → Deploy
  → Agent → Workflow → Prompt → Context
  → MCP → Skill → SubAgent
  → Orchestration → Model Routing → Harness
  → Production
END
```

Living: 순서·이름은 운영자와 함께 수정한다. **확정 선언 금지(AI).**

---

## 5. 한 노드에서의 표준 경험

노드 계약 필드: [LEARNING_NODE_SPEC.md](./LEARNING_NODE_SPEC.md)

학생이 노드 하나를 통과할 때:

```text
1. 질문이 보인다 (student_question)
2. 왜 지금인지 보인다 (why_now)
3. 쉬운 설명으로 이해한다 (content)
4. 직접 해본다 (practice)
5. 흔한 실수를 미리 본다 (common_mistakes)
6. 더 깊게 알고 싶으면 Atlas (optional)
7. 이해했는지 확인한다 (quiz / teach-back)
8. 다음이 왜 이어지는지 본다 (next_why)
9. 완료 조건을 충족한다 (completion)
```

### 5.1 Atlas 지원 패턴 (고정)

```text
Path 학습 (예: Node)
  → “Runtime이 뭐지?” 
  → Atlas Knowledge (Runtime · JS · 엔진 감각)
  → 다시 Path 실습/다음 노드
```

Atlas는 **항상 Path를 지원**하고, Path를 대체하지 않는다.

### 5.2 Tool 등장 패턴 (고정)

```text
필요 발생 (예: 코드 실행)
  → Tool 안내 (Node, VS Code, …)
  → 설치/확인 실습
  → 본 학습 목표로 복귀
```

도구 라이브러리만 훑는 메인 플로우는 금지에 가깝다 (탐색은 허용, Journey 대체 금지).

---

## 6. Student Question Driven (운영 규칙)

| 금지에 가까운 시작 | 권장 시작 |
|---|---|
| “오늘은 Node.js 강의입니다” | “왜 Node를 설치해야 하나요?” |
| “Frontend 개요” | “웹사이트는 어떻게 만들어지나요?” |
| “Prompt Engineering” | “왜 같은 질문인데 답이 달라지나요?” |
| “Multi-agent Workflow” | “AI에게 여러 일을 맡길 수 있나요?” |

Research는 **그 질문의 답을 공식 근거로 검증**하기 위해 수행한다.

---

## 7. AI · 운영자 · Reviewer 역할

```text
학생 질문 (운영자·학습자·피드백)
  → AI: Research (공식 문서)
  → AI: Claim Verification
  → AI: Curriculum 제안 (위치·Why)
  → AI: Content / Practice / Animation / Diagram / Quiz 초안
  → Independent Reviewer
  → 운영자 최종 판단
  → Publish
  → Website (최후)
```

- AI는 **커리큘럼을 결정하지 않는다.**  
- AI는 조사·검증·초안·제안한다.  
- 운영자가 학습자 관점으로 질문하고 확정한다.

---

## 8. 콘텐츠 제작 순서 (절대)

```text
학생 질문
  → Research
  → Claim Verification
  → Curriculum
  → Education Content
  → Practice
  → Animation
  → Diagram
  → Quiz
  → Review
  → Publish
  → Website
```

Website Last.  
Studio는 “페이지 찍기 현황”이 아니라 **교육 제작 현황**이다.

### 8.1 Studio가 보여 줄 것 (경험·ops 요구)

| 영역 | 의미 |
|---|---|
| 학생 질문 | 이 노드를 연 질문 |
| Research | 조사 상태 |
| 출처 | URL / KB / checked_at |
| 검증 상태 | claim 통과 여부 |
| 작성 상태 | drafting … published |
| 실습 | practice 유무 |
| 애니메이션 | 시나리오 유무 |
| 퀴즈 | checkpoint 유무 |
| Reviewer | approve / revise / block |
| 최근 수정 | 언제·무엇 |
| 학생 피드백 | 막힘·오해 |
| 다음 작업 | 다음 Research/Write/Review |

기존 `/atlas/studio`는 **삭제하지 않고** 이 방향으로 재해석·확장한다 (구현은 별도 Wave).

---

## 9. 기존 자산 처리

| 자산 | Student Journey 관점 |
|---|---|
| Atlas 21 Concept · Graph · Timeline · MR · Studio | **유지** — Knowledge / 심화 / ops |
| Foundation AI→LLM 본문 | Journey 초반 Stage와 연결 예정 |
| 100강 · curriculum | Stage에 매핑 · 삭제 금지 |
| Education First Master Plan 묶음 | 플랫폼 실행 문서 — Journey **아래**로 정렬 |
| BUILD-PLAN | HOLD 유지 |

**폐기하는 것:** “사이트/Atlas 완성 = 제품 완성” 목표  
**폐기하지 않는 것:** 이미 만든 교육·Atlas 파일

---

## 10. Human Gate (이번 작업)

- 문서 설계만  
- 코드 구현 · UI 변경 · 새 라이브러리 · push / deploy **금지**  
- Atlas / Course 대규모 수정 **금지**

---

## 11. 승인 후 다음 단계

1. 본 묶음 Approve / Revise  
2. Roadmap Stage → `CURRICULUM_MASTER.xlsx` foundation 구간  
3. 노드 스펙 템플릿으로 Day 1–N **콘텐츠** 제작 (Website 아님)  
4. 기존 강의 slug → Stage 매핑  
5. 필요 시 Studio 보드 열 확장 (구현 Wave)

---

## 12. 성공 기준

1. 비개발자가 이 문서만 읽고 “내가 어떤 성장을 하는지” 말할 수 있다.  
2. Day 1 시퀀스가 질문→이해→실습→다음 이유로 닫힌다.  
3. Atlas/Tool/Website 역할이 Path를 침범하지 않는다.  
4. 에이전트가 커리큘럼 단독 확정하지 않는다.  
5. 모든 신규 콘텐츠 제안이 Journey 루프 문장으로 정당화된다.

---

## 13. 한 줄 요약

> **학생 경험이 최상위 제품이다. Journey는 성장 과정이다. Atlas는 참고다. Website는 마지막 Viewer다. 우리는 Living으로 함께 고친다.**

---

## 14. 세션 종료 상태

```text
Verdict: READY_FOR_STUDENT_JOURNEY_REVIEW
```

운영자 액션: `STUDENT_JOURNEY.md` 및 형제 3문서 검토 → Approve / Revise.
