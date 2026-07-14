# 커리큘럼 후보 A / B / C — 운영자 선택용

```yaml
document: CURRICULUM_CANDIDATES_POST_DAY1_ABC
parent_questions: STUDENT_QUESTIONS_TOP10_POST_DAY1.md
status: WAITING_OPERATOR_PICK
date: 2026-07-14
rule: pick_exactly_one_then_full_pipeline
```

---

## 학생 중심 한 줄

> Day 1 다음, 학생은 **“내가 연 프로젝트를 읽고 다시 실행할 수 있는가”**가 가장 급하다.

---

## 후보 한눈에

| | **A** 파일 구조 | **B** Node·npm·package.json | **C** AI·LLM·IDE 관계 |
|---|---|---|---|
| 핵심 질문 | 폴더·src·파일이 왜? | 명령이 무슨 뜻? | AI와 도구 자리? |
| 그룹 | G1 | G2 | G3 |
| 손 실습 | 강함 | 강함 | 중간 |
| Atlas 연결 | 약→중 | 중 | 강함 |
| Day1 직결 | generating | install/run | requesting |
| 추천 상황 | Path B 폴더를 연 직후 | 실행은 했는데 의미가 안개 | 용어가 섞여 혼란 |

**PM 기본 추천 순서 (승인 전):** A → B → C  
**지금 고를 것:** 하나만.

---

## 후보 A — 파일 구조 이해

**학생 질문:** Q1, Q2 (일부 Q7)

**Learning Outcomes (초안)**

- [ ] 샘플 트리에서 `src`, `package.json`, `server.js` 위치를 가리킨다  
- [ ] 각 역할 한 줄 설명  
- [ ] AI에게 “이 파일만 수정” 요청을 쓴다  

**실습:** Day1 sample 트리 스케치 · `main.js` 찾아 수정  
**애니:** File Tree (기존 primitive 확장)  
**파이프라인:** Research(RQ 시드) → MD → Word → Sample(기존 재사용) → Interactive → Quiz → Outcome → Website(`/learn/...` 신규 노드, Day1 비복제)

---

## 후보 B — Node · npm · package.json

**학생 질문:** Q3, Q4, Q5, Q6

**Learning Outcomes (초안)**

- [ ] Node를 “브라우저 밖 JS 실행”으로 한 줄  
- [ ] `npm install` vs `npm run dev` 구분  
- [ ] `package.json` scripts에서 `dev` 찾기  
- [ ] Missing script 오류를 읽고 대응  

**실습:** package.json 읽기 · 의도적 오타 복구  
**애니:** Terminal + Install Progress  
**파이프라인:** 동일 (Website last)

---

## 후보 C — AI · LLM · IDE · AI IDE

**학생 질문:** Q7, Q8 (+ Q10 일부)

**Learning Outcomes (초안)**

- [ ] 네 용어를 혼동 없이 한 줄씩  
- [ ] “생성 ≠ 자동 저장/실행” 설명  
- [ ] 같은 요청 2회 결과 차이 관찰·한 줄  

**실습:** 프롬프트 비교 · 채팅 vs 폴더 편집기  
**애니:** AI Conversation  
**Atlas:** ai, llm (curiosity)  
**주의:** 제품 가격·순위 단정 금지 · Research 필수  

---

## 선택 후 자동 진행 계약

운영자가 예:

```text
PICK: A
```

또는 `PICK: B` / `PICK: C`

그 다음 Main은 **강의 확정 토론 없이**:

1. Research Queue 해당 항목 처리  
2. Claim Verification  
3. Student Markdown (+ Word export)  
4. Practice · Sample (재사용 우선)  
5. Interactive (primitive 재사용)  
6. Quiz · Outcome  
7. Independent Review  
8. Website 연결 (마지막)  
9. Education Studio 진행률 갱신  

**금지:** 선택 전 Day2 본문·빈 라우트 대량 생성.

---

## 운영자 액션 (이번 Human Gate)

아래 중 **하나만** 회신:

| 코드 | 의미 |
|---|---|
| `PICK: A` | 파일 구조 노드 착수 |
| `PICK: B` | Node·npm 노드 착수 |
| `PICK: C` | AI·IDE 관계 노드 착수 |
| `PICK: A_THEN_B` | 순서만 승인 (여전히 먼저 A만 콘텐츠 착수) |
| `REVISE_QUESTIONS` | Top10/그룹 수정 요청 |

플랫폼 로컬 전환(T1–T6) 승인과 별개로, **다음 교육 콘텐츠는 이 선택이 게이트**다.
