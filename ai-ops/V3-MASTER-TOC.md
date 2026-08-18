# V3 Master TOC — 엉피티 메인 라인 21강

> 작성: 2026-07-19, Hermes PM (B안 확정)
> 전제: V3-WORKFLOW.md §2 Phase Roadmap · V3-BRAND-FUNNEL.md §3 (퍼널) 준수
> 게이트: Hermes PM 리뷰 (본 파일) → 운영자 승인 → W2 (본문 집필) 착수
> 브랜드: 교육 사이트 "엉피티" · AX 도구 "AI Todo" · 내부 출처 "Ju0Symphony"
> Hero (1차 제안, 운영자 미확정):
>   "AI와 함께 코딩하는 방법을 배우는 곳 — 21강으로 첫 성공부터 AX 오케스트레이션까지"

---

## 메인 라인 21강 개요

```
Stage A: 기초 필수 (P01-P06)    — 비개발자가 AI 코딩 시작하는 데 필요한 최소 장비
Stage B: 바이브 코딩 입문 (V01-V04) — 바이브 코딩 탄생·진화, 첫 성공
Stage C: 바이브 코딩 실전 (V05-V09) — Cursor/Claude Code/Codex 실사용, 마이크로 프로젝트 3종
Stage D: 오케스트레이션 입문 (V10-V14) — AI Todo(AX Orchestra) 도구 실전, 5열 칸반, 4-Agent 협업
Stage E: 오케스트레이션 자율 (V15) — End-to-end 자율 프로젝트 1개 완주
```

---

## Stage A — 기초 필수 6강 (P01-P06)

> 목표: "AI 코딩 시작하려고 합니다" 단계에서 AI 도구 열고 프롬프트 넣기 직전까지. 6강 종료 시 학생은 Node·VSCode·Git 설치되어 있고, AI Chat vs AI Agent 구분할 수 있고, Local/Cloud AI 선택 기준 알고 있음.

### P01 — 두려워하지 않기: 비개발자도 AI와 코딩할 수 있는 이유
- 학습 목표: 코딩 경험 없는 사람이 AI 코딩 시도해도 된다는 객관적 근거 이해
- 핵심: "코드를 짜는 주체는 AI, 사람은 말로 지시한다" 명제
- Practice: AI에게 자기소개 MD 파일 만들어보기 (5분)
- Quiz: 2문항 (코딩 경험 요구 여부, AI가 짜는 코드의 소유권)
- TermChip: vibe coding / prompt / autocomplete
- 하단 CTA: AX 도구 "AI Todo" 소개 (Coming Soon)

### P02 — 개발 환경 설치: Node.js · npm (Windows / Mac)
- 학습 목표: Node.js 설치, 터미널에서 node -v / npm -v 출력
- 핵심: 버전 일치 중요성, nvm 옵션 소개만 (설치 강제 X)
- Practice: 터미널에서 'node -v' 입력 → 숫자 1개 출력까지 (스크린샷 인증)
- Quiz: 2문항 (Node.js 역할, npm이 무엇)
- TermChip: Node.js / npm / 터미널 / PATH
- 허들: PATH 환경변수 데스크톱 환경 설치 (Windows/Mac 차이 명시)
- 하단 CTA: AX PromoCard (Coming Soon)

### P03 — 에디터 설치: VSCode 또는 Cursor (AI 내장형)
- 학습 목표: VSCode 설치 + 기본 확장(Korean Lang Pack, ES7 snippets)
- 핵심: Cursor는 VSCode 포크 — 둘 중 하나면 충분
- Practice: Hello.js 만들어서 콘솔 출력까지
- Quiz: 2문항 (에디터 vs IDE, 확장 기능 설치)
- TermChip: VSCode / Cursor / 확장 / workspace
- 하단 CTA: AI Todo (Coming Soon)

### P04 — AI Chat vs AI Agent: 무엇이 다른가
- 학습 목표: ChatGPT와 Cursor/Claude Code의 결정적 차이 1개 이해
- 핵심: "대화상자" vs "파일 읽고/쓰고/실행하는" - 경우의 수
- Practice: ChatGPT에게 "Main.xを作って" → 코드만 받기. Cursor에서 같은 프롬프트 → 파일까지 만들어지는 걸 비교
- Quiz: 2문항 (Chat은 파일 읽을 수 있는가, Agent는 몇 단계까지 자율)
- TermChip: AI Chat / AI Agent / 터미널 실행 / 파일 접근
- 하단 CTA: AX Orchestra (AI Todo) preview

### P05 — LLM이란: 한 면 서버 / 한 면 클라이언트 비유
- 학습 목표: LLM이 "다음 토큰 예측기"임을 직관 이해
- 핵심: 한 면은 서버(모델), 한 면은 클라이언트(프롬프트) — 이메일 비유
- Practice: 같은 질문 3종 작성 (礼貌/단닉/거칠) → 응답 품질 비교
- Quiz: 2문항 (LLM 입력/출력 단위, 템퍼러처 영향)
- TermChip: LLM / 토큰 / 컨텍스트 / temperature
- 하단 CTA: AI Todo (Coming Soon)

### P06 — Local AI vs Cloud AI · Git 기초 (1일 차 마무리)
- 학습 목표: ① Ollama 설치 → 로컬로 모델 실행 ② git init/add/commit 3개 명령
- 핵심: Local(무료, 느림) vs Cloud(비용, 빠름) 선택 기준 / Git은 "세이브 포인트" 비유
- Practice: Ollama로 llama3.2 실행 + git init 후 P01-P05 산출물 commit
- Quiz: 3문항 (Local vs Cloud 장단, git 3단계 순서, .gitignore)
- TermChip: Ollama / Local LLM / git / commit / .gitignore
- Stage A 종료 마커: "첫 Git 저장소 완성 — Stage B에서 바이브 코딩 시작합니다"
- 하단 CTA: AI Todo (Coming Soon)

---

## Stage B — 바이브 코딩 입문 4강 (V01-V04)

> 목표: 바이브 코딩이라는 단어의 등장 배경 이해 → 첫 성공 경험 (HTML 1페이지 만들기)

### V01 — "바이브 코딩"이라는 단어의 탄생
- 학습 목표: ① Karpathy "vibe coding" 트윗 출처 ② 단어가 가리키는 행위
- 핵심: 이전 세대와 비교 — "복붙 코딩" → "자동완성" → "프롬프트 코딩" → vibe coding
- Practice: 발음 "vibe" 직접 해보기 / 코딩 유튜브 1개 시청 후 느낌 적기
- Quiz: 2문항 (vibe coding 제안자, 단어 등장 연도)
- 출처 인용: Karpathy tweet (날짜), 공식 문서 필요시
- TermChip: vibe coding / autocomplete / 프롬프트
- 하단 CTA: AI Todo (Coming Soon)

### V02 — Autocomplete에서 Chat 코딩으로: AI 코딩 시대표
- 학습 목표: Copilot → Cursor Chat → Claude Code / Codex CLI 흐름 이해
- 핵심: 시대표 4개 (2021 Copilot / 2023 Cursor / 2024 Claude Code / 2025 Codex CLI)
- Practice: Copilot 자동완성 한 줄 vs Chat에서 30줄 받기 비교
- Quiz: 2문항 (시대 순서, 각 도구 특징 1개씩)
- TermChip: Copilot / Cursor / Claude Code / Codex CLI
- 하단 CTA: AI Todo (Coming Soon)

### V03 — AI Agent 등장: Cursor · Claude Code · Codex 실비교
- 학습 목표: 3개 도구를 직접 켜보고 용도 차이 체감
- 핵심: Cursor(IDE 통합) vs Claude Code(터미널) vs Codex(터미널, OpenAI)
- Practice: 각 도구에 같은 프롬프트 "todo list app 만들어" → 산출물 비교 1분
- Quiz: 2문항 (터미널 vs IDE, 3개 도구 제작사)
- TermChip: IDE 통합 / CLI / Codex / Claude Code
- 하단 CTA: AI Todo (Coming Soon)

### V04 — 첫 성공: HTML 1페이지를 AI와 함께 만들기
- 학습 목표: AI에게 "나에게 맞는 소개 페이지 만들어" → 브라우저에서 열기까지
- 핵심: 프롬프트 1개 → AI 출력 → index.html 저장 → 브라우저 열기 → 완성
- Practice: 강사 제공 1 프롬프트로 자기소개 페이지 완성 (10분)
- Quiz: 2문항 (HTML 기본 구조, 파일 확장자)
- TermChip: HTML / browser / index.html / preview
- Stage B 종료 마커: "첫 성공 — 다음 Stage C에서 진짜 프로젝트 3종"
- 하단 CTA: AI Todo (Coming Soon)

---

## Stage C — 바이브 코딩 실전 5강 (V05-V09)

> 목표: 학생이 마이크로 프로젝트 3종 (Todo · 날씨앱 · 블로그)을 AI와 함께 완성

### V05 — Todo List App: 데이터를 다루는 법 (Local Storage)
- 학습 목표: 상태(state) 개념, localStorage로 데이터 저장/불러오기
- Practice: V01에서 만든 소개 페이지에 todo 입력/추가/삭제 기능 추가 (30분)
- Quiz: 2문항 (localStorage 특징, 배열 메서드 push/splice)
- TermChip: state / localStorage / 배열 / 이벤트

### V06 — 날씨앱: 외부 API 호출 (Open-Meteo 무료)
- 학습 목표: fetch, JSON 응답 파싱, 도시별 날씨 표시
- Practice: 도시명 입력 → Open-Meteo API → 온도/습도/구름 출력 (40분)
- Quiz: 2문항 (fetch Promise, JSON.parse)
- TermChip: API / fetch / Promise / JSON
- 출처 인용: Open-Meteo 공식문서
- 주의: API 키 필요 없는 엔드포인트만 사용 (유료/로그인 API 금지)

### V07 — 블로그 (Static Markdown): 파일 입출력 + 라우팅 기초
- 학습 목표: 마크다운 → HTML 변환, 페이지 분리 (Posts/Post)
- Practice: V03 사용 도구로 마크다운 파일 3개 → 블로그 화면 완성
- Quiz: 2문항 (마크다운 문법 5종, 라우팅)
- TermChip: Markdown / routing / component

### V08 — 디버깅: AI가 짠 코드가 안 될 때
- 학습 목표: 에러 메시지 읽기 → AI에게 다시 질문하는 루프
- 핵심: "에러 전체 복사 → AI에게 줘 → 수정본 받아 → 적용 → 반복"
- Practice: V06 날씨앱에 일부러 오타 넣기 → AI와 3회 안에 복구
- Quiz: 2문항 (디버깅 사이클, 신뢰할 수 있는 에러 원천)
- TermChip: console.log / stack trace / 디버거 / 에러 메시지
- 정직성: "AI가 항상 정답 아니다 → 크로스체크 필요" 명시

### V09 — Git 협업 시뮬레이션: 혼자 두 브랜치 쓰기
- 학습 목표: branch/merge/pull request 개념 (혼자 2역)
- Practice: main에 V04, feature/weather에 V06 → merge 시뮬
- Quiz: 2문항 (브랜치 목적, 충돌 해결)
- TermChip: branch / merge / PR / conflict
- Stage C 종료 마커: "마이크로 프로젝트 3종 완성 — 다음은 오케스트레이션"

---

## Stage D — 오케스트레이션 입문 5강 (V10-V14)

> 목표: AX 도구 "AI Todo" 실사용 — 5열 칸반, 4-Agent 협업 보드 운영
> V10-V13: AI Todo 다운로드 후 실습. V14 강의는 AX 도구 정식 출시 후 공개 (Coming Soon)
> 이 영역이 AX 도구(AI Todo) → 교육 사이트 자연 연결 → 퍼널 Stage 1→2 전환 지점

### V10 — AX 오케스트레이션이란: 한 사람이 4개 AI 협업시키는 법
- 학습 목표: 오케스트레이션 개념, "Codex + Claude Code + Ollama + NVIDIA AI" 협업 동선
- 핵심: ①PM 지시 → ②SubAgent 배정 → ③병렬 실행 → ④QA → ⑤병합
- Practice: 흐름도 1장 그리기 (손그림 / Mermaid)
- Quiz: 2문항 (오케스트레이션 정의, 5단계)
- TermChip: Orchestration / PM / SubAgent / QA / 병합
- 하단 CTA: **AI Todo 다운로드 (무료) — V11부터 실습에 사용** ← Stage 2 전환

### V11 — AI Todo 첫 실행: 5열 칸반 보드 이해하기
- 학습 목표: AI Todo 다운로드 → 첫 실행 → 백로그/할일/진행중/검토/병합 5열 이해
- 핵심: 5열의 의미, 각 열이 의미하는 작업 상태
- Practice: 데모 프로젝트 로드 → 5열 상태 시각적으로 확인
- Quiz: 2문항 (5열 순서, 각 열에 들어갈 작업 1개씩)
- TermChip: 백로그 / 할일 / 진행중 / 검토 / 병합 / 칸반

### V12 — SubAgent 배정: Codex · Claude Code · NVIDIA AI · Ollama 역할 분배
- 학습 목표: 4개 SubAgent 특성 이해 → 작업 유형별 배정 기준
- 핵심: Codex(안정/품질) vs Claude Code(자유/빠름) vs NVIDIA AI(추론/비전) vs Ollama(로컬/무료)
- Practice: V05-V09 산출물을 작업 유형별 SubAgent에 매칭 표 작성
- Quiz: 3문항 (4개 SubAgent 특성 1줄씩, 비용/속도/품질 순위)
- TermChip: Codex / Claude Code / NVIDIA AI / Ollama / 모델 라우팅

### V13 — PM 워크플로: 승인·QA·병합 게이트 실습
- 학습 목표: AI Todo 보드에서 PM 역할 수행 — 승인/반려/QA/병합 사이클
- Practice: V10에서 만든 흐름도를 실제 보드 카드 3개로 만들어 게이트 통과
- Quiz: 2문항 (승인 우회 불가 cond, QA 실패 시 카드 상태)
- TermChip: PM / 승인 / QA / 게이트 / 병합
- 정직성: "AI가 완료했다고 해서 자동 병합 아니다 → 사람 판정 필요" 명시

### V14 — AX 오케스트레이션 실전 사례: AX Orchestra 프로그램 "Ju0Symphony"
- **상태: Coming Soon (AX 도구 정식 출시 후 공개)**
- 출처 표기: 스크린샷/로그 하단 작은 글씨
  ```
  출처: 본 사이트 개발자가 만든 AX 프로그램 "Ju0Symphony" 실 운영 로그
  ```
- 본문은 "AX Orchestra" 일반 명칭 사용 (V3-BRAND-FUNNEL §3.1 준수)
- 게이트: AX 도구 정식 출시 전 W5 V14 착수 금지 (§7 Human Gate)
- TermChip: AX Orchestra / Ju0Symphony / 실운영 로그 / 스크린샷

---

## Stage E — 오케스트레이션 자율 1강 (V15)

### V15 — End-to-End 자율 프로젝트 1개 완주
- 학습 목표: 학생이 자신의 작은 프로젝트 1개를 AI 4-Agent 투입해서 처음부터 끝까지 완성
- 핵심: PRD 초안 → 5열 보드 생성 → SubAgent 배정 → 자율 실행 → QA → 병합 → git commit
- Practice: 주제 3안(오늘의 날씨 기록장 / 버킷리스트 / 식단 사진 일기) 중 택 1 완주
- Quiz: 5문항 (21강 전체 핵심 복습 — Stage A-D 각 1문항 + 종합 1)
- TermChip: 자율 프로젝트 / E2E / PRD / 자율 실행 / 최종 병합
- 종료 마커: "엉피티 21강 수료 — 다음은 AI Todo 공식 커뮤니티 (Stage 3 구독 미리보기)"
- 하단 CTA: AI Todo 커뮤티 가입 (Stage 3 퍼널) + 다운로드 페이지

---

## 부재료(Atlas) 연결 정책

- 100강 기존 마크다운 → `/atlas/<slug>` 라우팅 (W8 Phase)
- 메인 라인 21강 본문 내 TermChip 커서오버 → Atlas 1줄 미리보기 → 클릭 시 Atlas 상세 페이지
- Atlas는 부재료 — 21강 흐름 끊지 않도록 본문 밖에서 참조
- TermChip a11y: 커서오버/탭/ESC 닫기 (WCAG AA)

---

## 게이트 (W1 → W2 전환)

- [ ] Hermes PM 본 파일 작성 완료 (2026-07-19) ← 현재
- [ ] 운영자 W1-A 승인 (Hero 문구 포함)
- [ ] W1-B: 100강 Atlas 매핑표 작성 → `ai-ops/V3-ASSET-MAP.md` (Codex)
- [ ] W2 착수: P01 마크다운 + Practice + Quiz 집필 (Grok)
- [ ] Hermes PM W1 → W2 전환 사인

---

## Human Gate (W1 한정, 운영자 승인 필요)

- Hero 1줄 문구 확정 (현재 추천안: "AI와 함께 코딩하는 방법을 배우는 곳 — 21강으로 첫 성공부터 AX 오케스트레이션까지")
- V10 CTA "AI Todo 다운로드" 문구 AX 도구 출시 전 임시 Coming Soon 유지 여부
- V14 강의가 Coming Soon인 상태에서 Stage D 전체 노출 여부 (V10-V13만 먼저 공개 / V14 Coming Soon 카드)
- W1-B Atlas 매핑 담당을 Grok vs Codex 확정 (V3-WORKFLOW §2 W1-B는 Codex 기재)

---

## 메타

- 이 파일은 V3-WORKFLOW.md §2 W1-A의 산출물
- 작성자: Hermes (PM observer/learner) — 오퍼레이터 위임
- 변경 이력: 첫 작성 2026-07-19
- 다음 Phase: W1-B (Atlas 매핑표) → W2 (P01 집필) 오퍼레이터 승인 시
