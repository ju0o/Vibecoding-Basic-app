# Outcome Framework

```yaml
document: OUTCOME_FRAMEWORK
authority: outcome_system_ssot_candidate
status: operator_approved
approved_at: 2026-07-14
paired_top_ssot_with: STUDENT_JOURNEY.md
product: capability_to_build_alone
date: 2026-07-14
modifies_core_21_concepts: false
deletes_existing_journey: false
deletes_existing_atlas: false
code_change: false
```

---

## 1. 철학 변경 (한 단계 발전)

| 이전 중심 | 이후 중심 (추가 · 상위 판단) |
|---|---|
| 무엇을 **배우는가** | 무엇을 **할 수 있게 되었는가** |
| 이해했는가? | **혼자 할 수 있는가?** |
| 수업을 들었다 = 완료 | **Outcome 달성** = 완료 |

Student Journey는 **폐기하지 않는다.**  
Journey = *어떤 경험으로 걷나* · Outcome = *걸은 뒤 무엇을 할 수 있나*.

```text
Student Journey  +  Learning Outcome  =  프로젝트 최상위 SSOT 쌍
```

---

## 2. 최종 Goal

이 플랫폼은 학생이 **많이 아는** 곳이 아니다.

학생이 **혼자 프로젝트를 끝까지 만들 수 있게** 하는 곳이다.

모든 판단:

```text
학생이 혼자 할 수 있는가?
```

보조 질문 (여전히 유효):

```text
학생이 정말 이해하는가?  →  Outcome을 가능하게 하는 이해인가?
```

---

## 3. 문제 출발 (Problem-First)

학생은 이론을 위해 공부하지 않는다.  
**문제를 해결하기 위해** 공부한다.

모든 Stage / 강의 / 실습 / 애니 / 퀴즈는:

```text
실제 문제 (Experience)
  → 학생 질문
  → 이론 (필요할 때만 · 짧게)
  → 실습
  → 실험
  → 성찰
  → Outcome 확인
  → 다음
```

기술 라벨로 챕터를 열고 나중에 실습을 붙이는 방식은 **폐기 대상 패턴**이다.

---

## 4. Learning Flow (정본)

### 폐기 패턴

```text
Theory → Practice → Quiz → Complete
```

### 새 정본

```text
Experience     # 먼저 성공·실패를 겪는다 (10분 첫 성공 포함)
  → Question   # 왜? 뭐가 생겼지?
  → Theory     # 질문에 답하는 최소 이론 (Atlas는 여기서 선택)
  → Practice   # 가이드 실습
  → Experiment # 스스로 바꿔 본다
  → Reflection # 뭘 할 수 있게 됐는지 말로/체크
  → Outcome    # 관찰 가능 능력 체크
  → Next       # 다음 문제가 열리는 이유
```

| 단계 | 학생에게 일어나는 일 | 산출/장치 |
|---|---|---|
| Experience | 손·화면으로 무언가 됨 | 미니 성공 / 데모 |
| Question | 궁금증이 생김 | student_question |
| Theory | 최소 설명 · 필요 시 Atlas | content · atlas_ref |
| Practice | 따라 함 | guided lab |
| Experiment | 조건을 바꿔 봄 | open lab |
| Reflection | 자기 언어로 정리 | teach-back |
| Outcome | 할 수 있음 증명 | outcome checklist |
| Next | 다음 문제 수긍 | next_why |

---

## 5. Day 1 — 10분 첫 성공 (Theory-First 폐기)

### 폐기 순서

```text
AI → LLM → IDE → VS Code → Node   (이론 먼저 나열)
```

이 순서를 **Day 1 메인 경로로 쓰지 않는다.**  
(해당 개념은 **질문 이후** Atlas / 후속 Stage에서 Reference로 유지)

### 새 Day 1 경험

```text
1. 학생이 AI에게 프로그램 생성을 요청한다
2. AI가 프로젝트를 생성한다
3. 학생이 VS Code로 연다
4. Node를 설치한다 (필요 시)
5. 프로젝트를 실행한다
6. Hello World(또는 동등한 첫 화면/출력)를 본다
   ── 여기까지 = 첫 번째 성공 (Experience)
7. 그제야 질문한다
   - 왜 Node가 필요한가?
   - 왜 package.json이 생겼는가?
   - 왜 src가 생겼는가?
   - 왜 npm install을 하는가?
   - 왜 터미널을 사용하는가?
8. 질문마다 짧은 Theory + Atlas(선택) + Practice
9. Day 1 Outcome 체크 (혼자 재실행·설명 가능)
```

**Day 1 성공 정의:**  
이론 시험을 통과한 것이 아니라, **AI가 만든 프로젝트를 열어 실행까지 해 본 경험** + **핵심 “왜?”에 한 줄씩 답할 수 있음**.

상세 Outcome 목록: [LEARNING_OUTCOMES.md](./LEARNING_OUTCOMES.md) · Day1 Stage.

---

## 6. Atlas 역할 (Reference · 궁금할 때)

Atlas는 이론을 **먼저** 가르치지 않는다.

```text
실습/경험 중 궁금함
  → Atlas (Runtime · Node · V8 · …)
  → 다시 실습 / Outcome으로 복귀
```

| Atlas가 하는 일 | 하지 않는 일 |
|---|---|
| Experience 이후 심화 | Day 1을 Concept 순회로 대체 |
| 질문의 깊이 있는 답 | Journey/Outcome 완료 판정 |
| Knowledge Layer 유지 | 삭제·폐기 |

기존 Atlas · Model Routing · Foundation · Journey · Roadmap **전부 유지**.

---

## 7. AI의 역할 (Outcome 관점)

| AI가 한다 | AI가 하지 않는다 |
|---|---|
| 학생이 **스스로 하게** 돕는 실습·체크리스트 설계 | 대신 다 해 주고 “완료” 처리 |
| 질문·Research·초안 제안 | 커리큘럼·Outcome 단독 확정 |
| Outcome 검증 가능한 문장 작성 | 답을 외우게 하는 이론 덤프 |
| 실패 지점 예고 | Website를 Outcome보다 먼저 구현 |

> AI는 답을 알려 주는 존재가 아니라,  
> 학생이 **혼자 할 수 있도록** 돕는 존재다.

운영자가 최종 판단한다.

---

## 8. 콘텐츠 설계 단위

모든 강의 · 실습 · 애니메이션 · 퀴즈는 **Learning Outcome에 역추적**되어야 한다.

```text
Outcome (할 수 있어야 함)
  ← Experiment / Practice
  ← Theory (질문 답)
  ← Question
  ← Experience (문제)
```

Outcome에 연결되지 않은 “좋은 설명”은 보류하거나 Atlas 심화로 내린다.

---

## 9. Stage 필수 정보 (요약)

상세: [LEARNING_OUTCOMES.md](./LEARNING_OUTCOMES.md) · [STAGE_COMPLETION_SPEC.md](./STAGE_COMPLETION_SPEC.md)

```text
Stage Name
  → Student Question(s)
  → Learning Goal
  → Learning Outcome(s)   # observable can-do
  → Practice / Experiment
  → Failure-prone points
  → Atlas references (optional, after curiosity)
  → Why next Stage is needed
```

---

## 10. Studio (Outcome 달성률)

Studio는 페이지 진행률만이 아니다.

```text
Stage N
  학습(콘텐츠 소비)   xx%
  실습                xx%
  Quiz                xx%
  Outcome             xx%   ← 최우선 신호
```

예: 학습 100% · 실습 100% · Quiz 80% · **Outcome 60%**  
→ 학생은 **아직 혼자 할 수 없다** → Complete 아님.

상세: [ASSESSMENT_SYSTEM.md](./ASSESSMENT_SYSTEM.md)

---

## 11. 관련 문서 맵

| 문서 | 역할 |
|---|---|
| [STUDENT_JOURNEY.md](./STUDENT_JOURNEY.md) | 경험 경로 (유지 · 쌍의 한쪽) |
| **OUTCOME_FRAMEWORK.md** (본 문서) | Outcome 철학 · Flow · Day1 |
| [LEARNING_OUTCOMES.md](./LEARNING_OUTCOMES.md) | Stage별 can-do 목록 |
| [STAGE_COMPLETION_SPEC.md](./STAGE_COMPLETION_SPEC.md) | Complete 판정 계약 |
| [ASSESSMENT_SYSTEM.md](./ASSESSMENT_SYSTEM.md) | 측정 · Studio 신호 |
| LEARNING_ROADMAP / NODE_SPEC | Journey 상세 (Outcome 필드 정렬 예정) |

---

## 12. Human Gate (이번 작업)

- 문서 설계만 · 코드/UI/라이브러리/push 금지  
- Journey·Atlas·Foundation·MR **삭제 금지**  
- Outcome Layer **추가**

---

## 13. 성공 기준

1. 신규 콘텐츠 제안이 Outcome 문장으로 정당화된다.  
2. Day 1이 Theory-first가 아니라 Experience-first로 서술된다.  
3. Complete = 출석이 아니라 can-do 증명이다.  
4. Studio 설계가 Outcome %를 포함한다.  
5. “혼자 할 수 있는가?”가 머지 게이트 문구에 들어간다.

---

## 14. 한 줄 요약

> **배운 양이 아니라 할 수 있는 능력이다. 경험 먼저, 질문 다음, Atlas는 궁금할 때, Complete는 혼자 할 수 있을 때다.**
