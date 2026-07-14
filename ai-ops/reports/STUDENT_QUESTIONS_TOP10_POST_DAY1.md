# 학생 질문 Top 10 — Day 1 직후

```yaml
document: STUDENT_QUESTIONS_TOP10_POST_DAY1
mode: education_pm_inference
basis: Day1 Path A/B · interactive sim · sample project · outcomes
date: 2026-07-14
not_a_curriculum_decision: true
```

---

## 0. 학생은 지금 무엇이 궁금할까?

Day 1을 마친 비개발자의 머리:

> “화면에 뭔가 나왔는데…  
> 폴더는 왜 이렇게 생겼지?  
> `npm`이 뭐길래 계속 치지?  
> AI는 코딩 도구랑 뭐가 다르지?”

아래 Top 10은 **설문 실측이 아니라** Day1 경험·Outcome·막힘 지점에서 추론한 교육 PM 가설이다.  
실습 피드백이 쌓이면 순위를 갱신한다.

---

## 1. Top 10 학생 질문

| # | 학생 질문 (말투) | Day1 촉발 장면 | 깊이 |
|---|---|---|---|
| Q1 | 이 폴더들이 왜 생겼나요? `src`는 뭔가요? | 파일 트리 · 샘플 열기 | 구조 |
| Q2 | `package.json`은 왜 있나요? | 트리 · npm 스크립트 | 구조 |
| Q3 | `npm install`은 뭐 하는 건가요? 왜 해요? | 설치 시뮬 · Path B | 실행 |
| Q4 | `npm run dev`는 왜 그 이름인가요? 다른 건 안 되나요? | 서버 실행 | 실행 |
| Q5 | Node.js는 브라우저랑 뭐가 다른가요? | Path B · node -v | 런타임 |
| Q6 | 터미널에 치는 글자는 왜 필요한가요? | 터미널 패널 | 실행 |
| Q7 | AI가 파일을 “만들었다”는 게 정확히 뭔가요? | 요청→생성 시뮬 | AI 협업 |
| Q8 | IDE / VS Code / AI IDE는 어떻게 다르나요? | Path B 편집기 | 도구 |
| Q9 | 오류 메시지를 어디에 붙여 넣면 되나요? (복습) | 오류·복구 | 습관 |
| Q10 | 다음엔 뭘 배워야 혼자 더 고칠 수 있나요? | Outcome · 다음 단계 | 메타 |

---

## 2. 학습 흐름 자동 그룹핑

질문을 **학생이 겪는 순서**로 묶는다 (기술 사전 순 아님).

```text
G1  내가 연 것 이해하기 (구조)
    Q1 폴더·src
    Q2 package.json
         ↓
G2  실행 줄 이해하기 (명령)
    Q6 터미널
    Q5 Node vs 브라우저
    Q3 npm install
    Q4 npm run dev
         ↓
G3  AI·도구 자리 잡기 (협업 맥락)
    Q7 AI가 파일을 만든다는 것
    Q8 IDE vs AI IDE
         ↓
G4  습관·다음 (전이)
    Q9 오류 전달 복습
    Q10 다음에 뭘
```

한 줄 체인 (커리큘럼 뼈대):

```text
파일 구조 → Node 감각 → package.json → npm → 프로젝트 실행
  → (선택) AI·IDE 관계 정리 → 다음 Outcome
```

---

## 3. 그룹 ↔ 후보 커리큘럼 매핑

| 그룹 | 주로 다루는 후보 |
|---|---|
| G1 | **후보 A** (파일 구조) |
| G2 | **후보 B** (Node·npm·package.json) |
| G3 | **후보 C** (AI·LLM·IDE 관계) |
| G4 | 모든 후보의 닫는 Outcome + Day1 복습 |

운영자가 A/B/C 중 **하나만** 고르면, 해당 그룹의 질문을 Node의 `student_questions` SSOT로 고정하고 파이프라인을 시작한다.

---

## 4. Research Queue 시드 (UNKNOWN 금지)

| id | 질문/사실 | 상태 | 비고 |
|---|---|---|---|
| RQ-001 | package.json `scripts` 필드 공식 의미 | queued | npm docs |
| RQ-002 | Node LTS vs Current 학습자 안내 문구 | queued | nodejs.org · 버전 숫자 고정 금지 |
| RQ-003 | `npm install` with zero deps 교육적 설명 한계 | queued | Day1 샘플과 정합 |
| RQ-004 | IDE 일반 정의 vs 제품명 혼동 방지 문장 | queued | 교육 해석 라벨 |
| RQ-005 | AI 생성 파일 = 저장/적용 단계 구분 출처 | queued | 제품 불특정 |

전체 큐: `ai-ops/research-queue/RESEARCH_QUEUE.md`
