# Learning Roadmap

```yaml
document: LEARNING_ROADMAP
authority: student_learning_map_ssot_candidate
status: operator_review_required
parent: STUDENT_JOURNEY.md
living: true
date: 2026-07-14
note: Not final. Operator + AI revise together.
modifies_core_21_concepts: false
code_change: false
```

---

## 1. 이 문서의 역할

학생이 **START → END**까지 걷는 **전체 지도**다.

- 강의 파일 목록이 아니다.  
- **성장 단계(Stage)** 와 그 안의 **권장 노드 골격**이다.  
- 최종안이 아니다. **Living Roadmap** — 운영자 질문으로 계속 수정한다.

상세 노드 계약: [LEARNING_NODE_SPEC.md](./LEARNING_NODE_SPEC.md)  
학생 순간 경험: [STUDENT_JOURNEY.md](./STUDENT_JOURNEY.md)

---

## 2. 전체 흐름 (권장 골격)

```text
START
  → 왜 AI 때문에 코딩이 바뀌고 있는가
  → 바이브코딩이란
  → AI란
  → LLM
  → IDE
  → AI IDE
  → VS Code
  → Node
  → Terminal
  → 첫 프로젝트
  → 파일 구조
  → HTML
  → CSS
  → JavaScript
  → Frontend
  → Backend
  → Database
  → API
  → Git
  → Deploy
  → AI Agent
  → Workflow
  → Prompt
  → Context
  → MCP
  → Skill
  → SubAgent
  → Orchestration
  → Model Routing
  → Harness
  → Production
END
```

위 목록은 **제안 순서**다. 노드 병합·분할·순서 변경은 정상 Living 작업이다.

---

## 3. Stage 지도

각 Stage는 “학생이 어떤 사람으로 성장하는가”로 정의한다.

| stage_id | 학생 성장 상태 (한 줄) | 포함 노드 (골격) | 대표 학생 질문 |
|---|---|---|---|
| `S0_arrive` | 사이트에 막 들어옴 · 방향 없음 | Orientation · Start Learning | 여기서 뭘 배우나요? |
| `S1_why_shift` | AI가 코딩 방식을 바꿨음을 느낌 | 왜 AI 때문에 코딩이 바뀌는가 | 왜 지금 코딩을 배우나요? |
| `S2_vibe` | 바이브코딩 감각 | 바이브코딩이란 | AI와 같이 만들면 뭐가 다른가요? |
| `S3_ai_llm` | AI / LLM 구분 | AI · LLM | AI랑 챗봇이랑 같은 건가요? |
| `S4_workspace` | 작업 공간을 연다 | IDE · AI IDE · VS Code | 코드를 어디서 짜나요? |
| `S5_runtime_cli` | 실행·명령 감각 | Node · Terminal | 왜 프로그램을 설치하나요? |
| `S6_first_build` | 첫 산출물 | 첫 프로젝트 · 파일 구조 | 내 폴더에 뭐가 생겼나요? |
| `S7_web_surface` | 화면이 어떻게 만들어지는지 | HTML · CSS · JS · Frontend | 웹사이트는 어떻게 보이나요? |
| `S8_web_depth` | 뒤쪽 데이터·통신 | Backend · Database · API | 로그인은 어디에 저장되나요? |
| `S9_ship` | 저장·배포 | Git · Deploy · (보안 기초) | 다른 사람도 쓰게 하려면? |
| `S10_agency` | AI에게 일을 맡김 | Agent · Workflow · Prompt · Context | AI가 알아서 하게 할 수 있나요? |
| `S11_platform` | 도구·에이전트 조합 | MCP · Skill · SubAgent | 도구를 AI에 연결하면? |
| `S12_systems` | 여러 모델·운영 | Orchestration · Model Routing · Harness | 비싸거나 느린 모델만 쓰면? |
| `S13_production` | 실제 서비스 감각 | Production · 점검 · 책임 | 만든 걸 계속 돌리려면? |
| `END` | Journey 한 바퀴 완료 · 재진입 가능 | 회고 · 다음 심화 선택 | 이제 뭘 더 깊게 볼까요? |

---

## 4. Stage별 Why Bridge (왜 다음으로 가는가)

| From → To | 연결 이유 (학생 언어) |
|---|---|
| S0 → S1 | 방향을 알았으면, 왜 이 시대에 배우는지부터 |
| S1 → S2 | 변화가 “바이브코딩”이라는 방식으로 구체화됨 |
| S2 → S3 | 같이 일하는 상대(AI/LLM)를 알아야 함 |
| S3 → S4 | 대화만으로는 부족 · 작업 공간이 필요 |
| S4 → S5 | 에디터 다음엔 실행 환경·명령 |
| S5 → S6 | 도구가 생겼으니 첫 프로젝트를 만든다 |
| S6 → S7 | 만든 것이 화면에 보이려면 웹 기초 |
| S7 → S8 | 화면 뒤에는 데이터와 서버가 있음 |
| S8 → S9 | 혼자 컴퓨터 안에만 있으면 끝 · 저장·배포 |
| S9 → S10 | 배포 가능한 기본기 위 · AI에게 일을 맡김 |
| S10 → S11 | 한 에이전트를 넘어 도구·스킬·분업 |
| S11 → S12 | 여러 모델·비용·품질을 고르는 운영 |
| S12 → S13 | 실험이 아니라 돌아가게 유지 |
| S13 → END | 회고 후 Atlas 심화 또는 프로젝트 재진입 |

---

## 5. Track 매핑 (기존 Course Architecture와 정합)

| Track (기존) | Roadmap Stages |
|---|---|
| Foundation | S0–S3, S6 일부 |
| Tools | S4–S5 |
| Web | S7–S8 |
| Ship | S9 |
| Agency | S10–S12 |
| Project / Production | S6, S13, 통합 프로젝트 노드 |

기존 100강 · curriculum 모듈은 **삭제하지 않고** 위 Stage에 **매핑**한다.  
매핑 표는 승인 후 Excel로 옮긴다.

---

## 6. Atlas 등장 지점 (예시 · 강제 아님)

| Path 근처 | 학생이 물을 수 있는 것 | Atlas / Knowledge |
|---|---|---|
| AI / LLM | 모델·토큰·환각 | AI, LLM 관련 Concept · Foundation chapters |
| Node | Runtime이 뭐지? | Runtime · JS · (필요 시) 엔진 감각 |
| API | 요청/응답 | API 관련 심화 |
| Agent / Workflow | 에이전트 루프 | Agent · Orchestration 계열 |
| Model Routing | 모델 고르기 | Model Routing Learning Route (하위) |
| Context / Prompt | 맥락·지시 | Context, Prompt 관련 |

Atlas는 Stage 순서를 **정의하지 않는다**. Path를 **지원**한다.

---

## 7. Tool Library 등장 지점 (예시)

| 시기 | Tool 예 | 이유 |
|---|---|---|
| S4 | VS Code, AI IDE (Claude Code, Codex 등) | 작업 공간 |
| S5 | Node, Terminal | 실행·명령 |
| S9 | GitHub, Deploy 대상(호스팅) | 저장·공개 |
| S9+ | Firebase 등 (프로젝트에 따라) | 백엔드/호스팅 선택 시 |
| S10+ | Agent 도구, MCP 연결 대상 | 에이전시 실습 |

도구는 카탈로그가 아니라 **해당 노드 practice**에 붙는다.

---

## 8. 분기 · 재진입

Living Roadmap은 직선만 강요하지 않는다.

| 상황 | 허용 동작 |
|---|---|
| 웹만 급함 | S4–S6 후 S7 집중 · S10은 나중 |
| AI 에이전트만 궁금 | S3 후 S10 미리보기 허용 · 단 선수 부족 경고 |
| 막힘 | 직전 Stage lab 또는 Atlas 심화 후 복귀 |
| END 이후 | Project 재도전 · Agency 심화 · Atlas Graph 탐험 |

분기는 노드의 `next_why`에 적는다. “마음대로 스킵”과 “권장 순서”를 구분한다.

---

## 9. 완료 · END 정의

**END** = 모든 기술을 마스터함 **이 아님**.

```text
END 조건 (권장):
  - 왜 이 Journey를 걸었는지 회고 가능
  - 작은 프로젝트를 저장·설명 가능
  - AI와 함께 다음 학습 주제를 스스로 고를 수 있음
  - Atlas에서 필요한 개념을 찾아 돌아올 수 있음
```

---

## 10. 운영자 수정 프로토콜

순서 변경 제안 시 남길 것:

1. 어떤 학생 질문/막힘이 원인인가  
2. 영향받는 Stage Why Bridge  
3. 기존 콘텐츠 매핑 영향  
4. Approve / Revise / Reject

AI는 제안만 한다. **확정은 운영자.**

---

## 11. 비목표 (이번 문서)

- 사이트 내비 즉시 구현  
- 기존 Course slug 대량 이동  
- Atlas 21 Concept 순서 변경  
- 최종 노드 ID 고정 (승인 후 Excel)

---

## 12. 성공 기준

1. 비개발자가 Stage 표만 읽고 “내가 어디를 걷는지” 말할 수 있다.  
2. 각 Stage에 대표 학생 질문이 있다.  
3. Atlas/Tool이 Path를 대체하지 않는다.  
4. Living: 수정 이력이 “왜”와 함께 남을 수 있다.
