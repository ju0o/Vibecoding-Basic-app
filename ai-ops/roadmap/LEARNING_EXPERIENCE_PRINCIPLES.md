# Learning Experience Principles

```yaml
document: LEARNING_EXPERIENCE_PRINCIPLES
authority: learning_experience_philosophy_ssot_candidate
status: operator_review_required
parent: STUDENT_JOURNEY.md
date: 2026-07-14
modifies_core_21_concepts: false
deletes_existing_atlas: false
code_change: false
```

---

## 1. 한 줄 철학

> 이 프로젝트는 세계 최고의 **사이트**를 만드는 것이 아니다.  
> **AI와 함께 성장하는 학습 경험**을 만드는 것이다.

모든 결정의 최우선 기준:

```text
학생이 정말 이해하는가?
```

---

## 2. 중심은 학생이다

우선순위 (높음 → 낮음):

```text
학생 경험
  → Student Journey / Learning Node
  → 교육자료 (본문 · 실습 · 애니메이션 · 퀴즈)
  → Course / Track 구조
  → Atlas (Knowledge Layer)
  → Tool Library
  → Website (Viewer)
```

Website · Atlas · Course 중 어느 것도 **학생보다 앞설 수 없다.**

---

## 3. 성장 루프 (모든 설계의 뼈대)

학생이 한 번 배울 때마다 이 고리를 돈다.

```text
무엇을 알고 있는가
  → 지금 무엇이 궁금한가
  → 다음 무엇을 배우는가
  → 왜 이것을 배우는가
  → 직접 무엇을 해보는가
  → 어디까지 이해했는가
  → 다음으로 어디를 가는가
```

강의 목록·메뉴·기능은 이 루프를 **돕는 장치**일 뿐, 루프 자체가 아니다.

---

## 4. Journey ≠ 강의 목록

| Journey가 아닌 것 | Journey인 것 |
|---|---|
| slug 나열 | 성장 단계 |
| 기술 용어 사전 순서 | 학생 질문 순서 |
| “전부 커버했다” 체크리스트 | “이해하며 다음으로 갈 수 있다” 상태 |
| Atlas Concept 번호 순서 | Path에서 필요할 때 심화로 빠졌다가 복귀 |

학생은 **지식을 외우기 위해** 오지 않는다.  
**할 수 있는 것이 늘어나기 위해** 온다.

---

## 5. Student Question Driven

커리큘럼은 **기술 라벨**이 아니라 **학생 질문**으로 시작한다.

| 기술 중심 (지양) | 학생 질문 중심 (지향) |
|---|---|
| Node.js | 왜 Node를 설치해야 하나요? |
| Frontend | 웹사이트는 어떻게 만들어지나요? |
| Prompt | 왜 같은 질문인데 AI 답변이 달라지나요? |
| Workflow | AI에게 여러 작업을 동시에 맡길 수 있나요? |
| Deploy | 내가 만든 것을 다른 사람도 쓰게 하려면? |

규칙:

1. 노드 제목·도입은 질문 또는 “왜 지금”으로 열 수 있어야 한다.  
2. 용어는 질문 다음에 등장한다.  
3. 공식 문서 조사는 그 질문을 **검증 가능하게** 만들기 위해 한다.

---

## 6. Living Education

- AI도 운영자도 틀릴 수 있다.  
- 틀린 것은 **공식 문서 + 실제 학습 경험**으로 고친다.  
- Journey 순서·노드 내용은 **최종안이 아니라 Living**이다.  
- “사이트에 올렸다 = 끝”이 아니다. 피드백 → 수정이 제품이다.

---

## 7. AI의 역할 / 금지

| AI가 한다 | AI가 하지 않는다 |
|---|---|
| 학생 질문 수집·재서술 | 커리큘럼 단독 확정 |
| 공식 문서 Research | 추측을 사실처럼 서술 |
| Claim Verification | X/커뮤니티만으로 확정 |
| 쉬운 설명·실습·애니 제안 | Website를 Content보다 먼저 구현 |
| Reviewer 통과용 초안 | 운영자 최종 판단을 대체 |

**운영자가 최종 판단한다.** AI는 제안·조사·초안 작성자다.

---

## 8. Atlas · Tool · Website의 위치

| 레이어 | 역할 | 하지 않는 것 |
|---|---|---|
| **Learning Path / Journey** | 메인 성장 경로 | — |
| **Atlas** | 궁금할 때 깊게 보는 Knowledge Layer | 강의를 대체 |
| **Tool Library** | 필요할 때 등장하는 도구 안내 | 도구 카탈로그만으로 커리큘럼 구성 |
| **Website** | 교육자료를 보여주는 Viewer | 제품 본체 행세 |

Atlas 복귀 패턴 (고정):

```text
Path 노드 → 궁금한 개념 → Atlas 심화 → 다시 Path
```

---

## 9. 콘텐츠 제작 순서 (절대)

```text
학생 질문
  → Research
  → Claim Verification
  → Curriculum (노드 위치·Why)
  → Education Content
  → Practice
  → Animation
  → Diagram
  → Quiz
  → Independent Review
  → Publish
  → Website (Viewer)   ← 항상 마지막
```

Website Last를 어기면 작업은 **거절**된다.

---

## 10. 실습 · 이해 측정

- **실습 없는 이해 주장은 의심한다.** (가능한 한 손이 움직이는 단위)  
- 완료 조건은 “페이지를 읽었다”가 아니라 **할 수 있다 / 설명할 수 있다**다.  
- Quiz · teach-back · 작은 산출물은 “어디까지 이해했는가”용이다.  
- 비개발자 기준: 10–20분 읽기 단위, 도구 설치·클릭·확인이 실습 후보.

---

## 11. 의사결정 체크리스트 (에이전트·운영자 공통)

작업 착수·머지 전에:

1. 이 변경이 **어느 학생 질문**을 돕는가?  
2. Journey의 **어느 노드·어느 성장 단계**에 속하는가?  
3. Research → … → Website 순서를 지켰는가?  
4. Atlas/Tool을 Path 대신 밀어 넣지 않았는가?  
5. 학생이 **이해했는지** 확인할 수단이 있는가?  
6. 기존 Atlas/Course를 **삭제·대규모 파괴**하지 않았는가?

하나라도 “아니오 / 불명”이면 보류한다.

---

## 12. 관련 문서

| 문서 | 역할 |
|---|---|
| [STUDENT_JOURNEY.md](./STUDENT_JOURNEY.md) | **최상위** 학생 경험 SSOT 후보 |
| [LEARNING_ROADMAP.md](./LEARNING_ROADMAP.md) | 전체 지도 · 단계 |
| [LEARNING_NODE_SPEC.md](./LEARNING_NODE_SPEC.md) | 노드 계약 필드 |
| [EDUCATION_PLATFORM_MASTER_PLAN.md](./EDUCATION_PLATFORM_MASTER_PLAN.md) | 플랫폼 방향 (본 철학의 하위 실행) |
| [CONTENT_PIPELINE.md](./CONTENT_PIPELINE.md) | 제작 파이프라인 · Studio |

---

## 13. 성공 기준

1. 신규 제안이 “기능”이 아니라 “학생 경험 개선”으로 서술된다.  
2. 기술 라벨만 있는 노드는 질문형으로 재작성 대상이 된다.  
3. Atlas·Website·Course 충돌 시 **학생 경험 문서가 우선**한다 (운영 스탬프 후).  
4. Living: 틀린 노드를 고치는 것이 실패가 아니라 **정상 운영**이다.
