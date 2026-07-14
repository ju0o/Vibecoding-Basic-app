# Course Architecture

```yaml
parent: EDUCATION_PLATFORM_MASTER_PLAN.md
authority: course_architecture_ssot_candidate
status: operator_review_required
date: 2026-07-14
modifies_core_21_concepts: false
```

---

## 1. 사이트 IA (교육 우선)

### 권장 메인 내비 (구현은 승인 후)

| 메뉴 | 역할 | 현재 자산 매핑 |
|---|---|---|
| Home | 왜 배우는지 · Start Learning | `/` |
| Start Learning / Path | **메인** Day 1 순서 | **신규** (기존 curriculum 재배치) |
| Courses | 코스 카탈로그 | curriculum 13 modules 재해석 |
| Tools | 도구 과정 (IDE, CLI, Git…) | 기존 T01–T04 계열 강의 |
| Projects | 미니 프로젝트 | project-textbook 계열 |
| Atlas | **심화 Reference** | `/atlas` (유지) |
| Wiki | 용어 | `/glossary` |
| KB / Evidence | (운영·심화) | Studio + KB 경로 |
| Studio | 제작 현황 (ops) | `/atlas/studio` |

Atlas는 메인이 아니다. **Learning Path가 메인**이다.

---

## 2. Learning Path (학생 메인 흐름)

운영자 지시 초안을 저장소 실측 강의와 맞춘 **권장 Path**이다. 항목 ID는 추후 `CURRICULUM_MASTER.xlsx`로 고정한다.

```text
Day1  바이브코딩이란?
  → AI (Atlas 개념 연결 가능)
  → LLM (Atlas)
  → IDE / AI IDE
  → VS Code
  → Node / Runtime 감각
  → Terminal
  → 첫 프로젝트
  → 파일 구조
  → Frontend 기초
  → Backend 감각
  → Database
  → API
  → Git
  → Deploy
  → 보안 기초
  → AI Agent
  → Workflow
  → Context
  → Prompt
  → (이후 Orchestration · Model Routing · Evaluation · Harness …)
```

### Path 노드 타입

| type | 설명 |
|---|---|
| `lesson` | 학생용 Markdown 강의 |
| `lab` | 실습 체크리스트 |
| `atlas_ref` | Atlas Concept 딥링크 (필수 아님 · 필요할 때) |
| `tool` | 도구 튜토리얼 |
| `project` | 통합 프로젝트 |
| `checkpoint` | 퀴즈 · teach-back |

### Atlas 등장 방식 (예시)

```text
Node 강의: “Node로 서버를 켠다”
  학생 질문: Runtime이 뭐지?
  → Atlas / Knowledge: runtime · JS · (필요 시) 관련 Concept
  → 다시 Learning Path로 복귀
```

Atlas 챕터를 Path 순서와 1:1로 강제하지 않는다.

---

## 3. Course 트랙

| Track | 대상 | 내용 소스 |
|---|---|---|
| **기초반 (Foundation)** | 비개발자 Day 1 | 바이브코딩 · AI · LLM · IDE · 첫 프로젝트 |
| **도구 과정 (Tools)** | 같은 학습자 | VS Code · Terminal · Node · Git · CLI |
| **웹 기초 (Web)** | 화면·서버 감각 | Frontend · Backend · DB · API |
| **운영 입문 (Ship)** | 배포·보안 | Deploy · Secrets · 기본 보안 |
| **AI 시스템 (Agency)** | 심화 | Agent · Workflow · Context · Prompt · Orchestration · Model Routing |
| **프로젝트** | 통합 | mini-saas · chatbot · automation 등 기존 project lessons |

기존 13 모듈 curriculum은 **삭제하지 않고** Track 아래로 재라벨링한다.

---

## 4. 기존 100강 · Atlas 21 Concept 관계

| 자산 | 관계 |
|---|---|
| 100 lessons | Learning Path / Courses의 **Depth Textbook** |
| Atlas 21 Concept | Path 어디서든 열 수 있는 **Knowledge Layer** |
| Model Routing 9 Units | Agency 트랙의 하위 실습·이론 루트 |
| Foundation chapters (AI–LLM) | Path 초반 + Atlas 양쪽에 연결 |

**21 Concept 수·14섹션 계약은 변경하지 않는다.**

---

## 5. 홈 경험 (목표 스케치 · 미구현)

```text
Start Learning (다음 Path 노드)
추천 Track
최근 진도
“이해가 안 되면 Atlas에서 찾아보기”
```

구현 착수는 Master Plan 승인 + Path 스프레드시트 초안 이후.

---

## 6. 비목표 (이번 아키텍처)

- Atlas 삭제 또는 `/atlas` 폐기  
- 전면 사이트 리디자인 즉시 착수  
- 새 그래프 라이브러리  
- 계정/DB 필수화  

---

## 7. 성공 기준

1. 내비 초안에서 Learning Path가 Atlas보다 앞에 온다.  
2. 모든 Path 노드가 lesson/lab/atlas_ref 중 하나로 분류 가능하다.  
3. 기존 강의 slug가 최소 하나의 Track에 배정 가능하다.  
4. Atlas는 “심화 참고”로 한 문장 정의된다.
