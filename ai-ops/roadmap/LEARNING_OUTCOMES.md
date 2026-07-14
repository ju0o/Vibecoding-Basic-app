# Learning Outcomes

```yaml
document: LEARNING_OUTCOMES
authority: stage_outcomes_ssot_candidate
status: operator_review_required
parent: OUTCOME_FRAMEWORK.md
paired_with: STUDENT_JOURNEY.md
living: true
date: 2026-07-14
code_change: false
```

---

## 1. 목적

각 **Stage가 끝났을 때** 학생이 **무엇을 할 수 있어야 하는지**를 정의한다.

- Outcome = 관찰 가능한 **can-do** (체크박스)
- “설명을 들었다” ≠ Outcome
- Living: 운영자와 함께 수정

철학·Flow: [OUTCOME_FRAMEWORK.md](./OUTCOME_FRAMEWORK.md)  
완료 판정: [STAGE_COMPLETION_SPEC.md](./STAGE_COMPLETION_SPEC.md)

---

## 2. Stage 카드 템플릿 (필수)

모든 Stage는 아래 구조를 가진다.

```text
Stage Name
  → Student Question
  → Learning Goal
  → Learning Outcome (can-do 목록)
  → 실습 (Practice / Experiment)
  → 실패하기 쉬운 부분
  → Atlas 참고 (궁금 후)
  → 다음 Stage가 필요한 이유
```

---

## 3. Day 1 Stage — 첫 성공 (Experience-first)

### Stage Name

`D1_first_success` — 10분 안에 첫 실행 성공

### Student Question (Experience **이후**에 본격화)

- 왜 Node를 설치하나요?
- 왜 package.json이 생겼나요?
- 왜 src(또는 프로젝트 폴더)가 생겼나요?
- 왜 npm install을 하나요?
- 왜 터미널을 사용하나요?
- (선행 행동) AI에게 프로그램을 만들어 달라고 하면 어떻게 되나요?

### Learning Goal

이론 습득이 아니라, **AI와 함께 만든 프로젝트를 내 환경에서 실행해 보는 것.**

### Learning Outcome (Day 1 종료 후)

학생은:

- [ ] VS Code(또는 동등 IDE)를 설치·실행할 수 있다  
- [ ] Node를 설치하고 `node -v`로 확인할 수 있다  
- [ ] 터미널을 열고 프로젝트 폴더로 이동할 수 있다  
- [ ] 프로젝트를 실행하는 명령을 따라 할 수 있다  
- [ ] AI가 만든 프로젝트를 열어 실행할 수 있다  
- [ ] Hello World(또는 동등한 첫 출력/화면)를 확인할 수 있다  
- [ ] package.json이 **무엇인지** 한 문장으로 설명할 수 있다  
- [ ] npm install의 **의미**를 한 문장으로 설명할 수 있다  
- [ ] AI에게 **수정 요청**을 하고 결과를 다시 실행해 볼 수 있다  

### 실습

1. AI에게 “Hello World 웹/콘솔 프로젝트 만들어 줘” 요청  
2. 폴더를 VS Code로 열기  
3. Node 설치 · 버전 확인  
4. (필요 시) `npm install` · 실행 스크립트 실행  
5. 성공 화면/출력 캡처 또는 체크  
6. 문구 한 줄 수정 요청 → 재실행  

### 실패하기 쉬운 부분

- PATH / `node` 명령을 못 찾음  
- 잘못된 폴더에서 명령 실행  
- install 없이 run  
- AI 출력 파일을 저장하지 않음  
- “실행”과 “편집”을 혼동  

### Atlas 참고 (궁금해진 뒤)

| 질문 | Atlas / Knowledge |
|---|---|
| Runtime이 뭐지? | Runtime · JS 실행 환경 감각 |
| Node / V8 | Node · 엔진 (깊이 선택) |
| 패키지 | package / dependency 개념 |

### 다음 Stage가 필요한 이유

실행은 했지만 **화면·구조·버전 관리**를 모르면 혼자 확장할 수 없다.  
다음: 파일 구조·웹 기초 또는 저장(Git) 중 Journey Living 순서에 따름.

---

## 4. Stage 카드 — 전체 골격 (Living)

Roadmap Stage id와 정렬. Outcome은 **초안**이며 운영자 수정 대상.

### S0 — 도착 · 방향

| 필드 | 내용 |
|---|---|
| Student Question | 여기서 뭘 하게 되나요? 혼자 뭘 만들 수 있게 되나요? |
| Learning Goal | 이 플랫폼이 “할 수 있게 되는 곳”임을 안다 |
| Learning Outcome | Start Learning을 눌러 Day1 Experience에 진입할 수 있다 · “완료=혼자 하기”를 말할 수 있다 |
| 실습 | Start Learning 1회 |
| 실패 포인트 | 강의 목록만 훑고 이탈 |
| Atlas | 불필요 (나중에) |
| Next why | 방향이 생기면 첫 성공 경험이 필요 |

### S1–S2 — 왜 바뀌는가 · 바이브코딩 (가급적 Experience 전/후 짧게)

| 필드 | 내용 |
|---|---|
| Student Question | 왜 AI 때문에 만드는 방식이 바뀌었나요? 바이브코딩은 뭐가 다른가요? |
| Learning Goal | “타이핑 암기가 아니라 AI와 함께 만든다” 감각 |
| Learning Outcome | 바이브코딩을 자기 말로 한 문장 · AI에게 작업 요청 1회 성공 (D1과 겹치면 D1에 통합 가능) |
| 실습 | 동일 작업을 “혼자 추측” vs “AI 요청” 비교 (가벼움) |
| 실패 포인트 | 이론만 읽고 손 안 댐 |
| Atlas | AI 개념 (질문 후) |
| Next why | 같이 만들려면 실행 환경이 필요 → D1/도구 |

> **정렬 원칙:** S1–S2 이론이 Day1 Experience를 **막지 않도록** Living 조정. 권장: D1 성공 직후 짧은 Reflection으로 “왜 이런 방식인가” 배치.

### S3 — AI / LLM (질문 후)

| 필드 | 내용 |
|---|---|
| Student Question | AI랑 LLM이 같은 건가요? 왜 답이 달라지나요? |
| Learning Goal | 도구로서의 AI/LLM 한계·강점 감각 |
| Learning Outcome | AI/LLM을 구분하는 한 문장 · “같은 프롬프트 다른 결과”를 재현·설명할 수 있다 |
| 실습 | 동일 프롬프트 2회 비교 |
| 실패 포인트 | 항상 옳다고 믿음 |
| Atlas | AI · LLM Foundation |
| Next why | 더 큰 작업은 에디터·에이전트 도구가 필요 |

### S4 — 작업 공간 (IDE / AI IDE / VS Code)

| 필드 | 내용 |
|---|---|
| Student Question | 코드를 어디서 보고 고치나요? |
| Learning Goal | 파일을 열고 수정·저장할 수 있는 공간 |
| Learning Outcome | VS Code로 프로젝트 열기 · 파일 수정·저장 · (가능 시) AI IDE로 수정 요청 |
| 실습 | 한 파일 문구 수정 |
| 실패 포인트 | 폴더가 아닌 단일 파일만 염 |
| Atlas | IDE 개념 (선택) |
| Next why | 수정한 코드를 실행·공유하려면 CLI/Git 등 |

### S5 — Runtime · Terminal (질문 중심 · D1 심화)

| 필드 | 내용 |
|---|---|
| Student Question | 왜 Node? 왜 터미널? |
| Learning Goal | 명령으로 환경을 확인하고 스크립트를 돌림 |
| Learning Outcome | `node -v` · 기본 `cd` · 프로젝트 스크립트 재실행 · 에러 메시지 한 줄 읽기 |
| 실습 | 일부러 틀린 폴더에서 실행 → 고치기 |
| 실패 포인트 | GUI만 찾음 · PATH |
| Atlas | Runtime · Node · V8 |
| Next why | 구조·웹·저장으로 확장 |

### S6 — 첫 프로젝트 · 파일 구조

| 필드 | 내용 |
|---|---|
| Student Question | 왜 src? 왜 AI마다 폴더가 다르죠? |
| Learning Goal | 프로젝트 트리 읽기 · 진입점 찾기 |
| Learning Outcome | 주요 폴더/파일 역할 3개 설명 · 진입 파일 찾아 열기 · AI에게 “이 파일 수정” 지정 가능 |
| 실습 | 트리 스케치 · 한 파일 책임 설명 |
| 실패 포인트 | 모든 파일을 다 읽으려 함 |
| Atlas | 모듈/패키지 감각 |
| Next why | 사용자에게 보이는 화면이 궁금 |

### S7 — 웹 표면 (HTML · CSS · JS · Frontend)

| 필드 | 내용 |
|---|---|
| Student Question | 웹사이트는 어떻게 보이나요? |
| Learning Goal | 브라우저에 보이는 층 감각 |
| Learning Outcome | HTML/CSS/JS 역할을 한 문장씩 · 텍스트·색·간단 동작 중 하나 수정 후 확인 |
| 실습 | 카피/스타일/버튼 문구 변경 |
| 실패 포인트 | 프레임워크 이름만 암기 |
| Atlas | Frontend 관련 심화 |
| Next why | 데이터·로그인은 화면 뒤에 있음 |

### S8 — Backend · Database · API

| 필드 | 내용 |
|---|---|
| Student Question | 로그인은 어디에 저장되나요? API는 뭔가요? |
| Learning Goal | 요청/응답 · 저장 위치 감각 |
| Learning Outcome | API 호출 1회 관찰(도구/로그) · “프론트 vs 백” 한 문장 · DB가 하는 일 한 문장 |
| 실습 | 샘플 API 응답 읽기 · 가짜 데이터 수정 요청 |
| 실패 포인트 | 전부 프론트에 저장한다고 착각 |
| Atlas | API · 데이터 |
| Next why | 혼자 두면 사라짐 → 저장·배포 |

### S9 — Git · Deploy (Ship)

| 필드 | 내용 |
|---|---|
| Student Question | 다른 사람도 쓰게 하려면? 실수하면 되돌리려면? |
| Learning Goal | 버전 관리 + 공개 경로 |
| Learning Outcome (Git 과정 예) | |
| | □ Repository 생성 가능 |
| | □ Commit 가능 |
| | □ Push 가능 |
| | □ Branch 생성 가능 |
| | □ Merge 가능 (기초) |
| | □ AI와 Git 협업 가능 (메시지·충돌 도움 요청) |
| | (+ Deploy) □ 배포 대상에 올리고 URL 확인 가능 |
| 실습 | 작은 변경 commit → push · (가능 시) 미리보기 배포 |
| 실패 포인트 | secret 커밋 · 큰 바이너리 · 강제 push |
| Atlas | Git 모델 심화 (선택) |
| Next why | 반복 작업을 AI에게 맡기고 싶음 |

### S10 — Agent · Workflow · Prompt · Context

| 필드 | 내용 |
|---|---|
| Student Question | AI Agent는 뭐예요? Workflow는? 왜 프롬프트/컨텍스트가 중요해요? |
| Learning Goal | 한 번 답이 아니라 **일련의 작업**을 맡김 |
| Learning Outcome | 다단계 작업을 Agent/Workflow로 요청 · 프롬프트 1회 개선으로 결과 차이 설명 · 컨텍스트에 파일/목표를 넣는 이유 설명 |
| 실습 | “조사→초안→수정” 3스텝 요청 |
| 실패 포인트 | 한 방에 전부 요청 후 포기 |
| Atlas | Agent · Orchestration 입문 |
| Next why | 도구·분업이 필요 |

### S11 — MCP · Skill · SubAgent

| 필드 | 내용 |
|---|---|
| Student Question | MCP는 왜 쓰나요? Skill/SubAgent는? |
| Learning Goal | 도구 연결 · 역할 분담 감각 |
| Learning Outcome | MCP/도구 연결의 “왜” 한 문장 · Skill을 “반복 절차”로 설명 · SubAgent 분업 시나리오 1개 설계(문서) |
| 실습 | 도구 1개 연결 또는 시뮬레이션 체크리스트 |
| 실패 포인트 | 용어만 수집 |
| Atlas | 관련 Knowledge |
| Next why | 비용·품질·여러 모델 |

### S12 — Orchestration · Model Routing · Harness

| 필드 | 내용 |
|---|---|
| Student Question | 비싼 모델만 쓰면 되나요? 어떻게 고르나요? |
| Learning Goal | 작업에 맞는 모델·검증 루프 |
| Learning Outcome | 교육용 라우팅 기준으로 작업 1개를 Cheap/Standard/Frontier 중 고르고 **이유** 설명 (상대 분류 라벨 명시) · 간단 검증 스텝 1개 |
| 실습 | Model Routing 시뮬/루트 과제 |
| 실패 포인트 | 순위를 절대 진리로 암기 |
| Atlas · MR | Model Routing Learning Route |
| Next why | 계속 돌아가게 유지 |

### S13 — Production

| 필드 | 내용 |
|---|---|
| Student Question | 만든 걸 계속 돌리려면? 책임은? |
| Learning Goal | 운영 최소 세트 |
| Learning Outcome | 로그/에러 확인 경로 1개 · 시크릿을 코드에 안 넣는 이유 설명 · “완료 후 점검” 체크리스트 작성 |
| 실습 | 배포본에서 깨진 점 1개 찾아 수정 요청 |
| 실패 포인트 | 로컬만 성공 = 완료 착각 |
| Atlas | 운영·평가 심화 |
| Next why | END 회고 · 재진입 |

### END

| 필드 | 내용 |
|---|---|
| Student Question | 이제 혼자 무엇을 만들 수 있나요? |
| Learning Goal | 능력 포트폴리오 인식 |
| Learning Outcome | 작은 프로젝트를 기획→AI협업→실행→저장→(가능 시)배포까지 **체크리스트로 재현** · 다음 학습 주제 스스로 선택 |
| 실습 | 캡스톤 미니 또는 회고 템플릿 |
| Atlas | 자유 탐험 |
| Next why | Living 재진입 · 심화 프로젝트 |

---

## 5. Outcome 작성 규칙

| 좋은 Outcome | 나쁜 Outcome |
|---|---|
| VS Code로 폴더를 연다 | IDE를 이해한다 |
| commit 후 push 한다 | Git을 안다 |
| package.json을 한 문장 설명 | 패키지 생태계를 마스터 |
| AI에게 수정 요청 후 재실행 | AI를 활용할 수 있다 (모호) |

규칙:

1. 동사로 시작 (설치한다 · 실행한다 · 설명한다 · 요청한다)  
2. 관찰 가능 (옆에서 보면 알 수 있음)  
3. Stage당 핵심 5–12개 (너무 많으면 분할)  
4. Quiz 점수 ≠ Outcome 전부 (설명 Outcome과 행동 Outcome 분리 가능)

---

## 6. 기존 자산 매핑

| 기존 | Outcome Layer |
|---|---|
| Student Journey / Roadmap | Stage 뼈대 유지 · Outcome 카드 부착 |
| Foundation AI–LLM | S3 등 **질문 후** Theory/Atlas |
| Model Routing | S12 Outcome · 시뮬 실습 |
| 100강 | 노드 실습 소스로 매핑 · 삭제 없음 |
| Atlas | 궁금 후 Reference |

---

## 7. 성공 기준

1. Day1 Outcome 체크리스트만으로 “첫 성공” 수업 설계 가능  
2. Git Stage Outcome이 사용자 예시와 동등 수준의 can-do  
3. 모든 Stage 카드에 Question · Goal · Outcome · 실습 · 실패 · Atlas · Next 존재  
4. Theory-first Day1 순서가 문서상 폐기됨  

---

## 8. 승인 후

1. D1·S9 Outcome을 Excel/노드 스펙에 이식  
2. 기존 강의에 outcome_id 매핑  
3. Studio Outcome % 설계 (구현 Wave 별도)
