# AI Engineering Atlas — 구현 계획 (Phase-Gated Build Plan, LEGACY DRAFT)

> **HOLD (2026-07-13):** 이 문서는 12노드·13섹션 초기안이다. 최신 정본 후보는 [ATLAS-EDUCATION-LAYER.md](ATLAS-EDUCATION-LAYER.md)의 21개 개념·14개 챕터 섹션·Phase 0~12 계획이다. 운영자가 새 PRD를 승인하기 전에는 이 문서를 근거로 구현을 진행하지 않는다. 승인 후 본 문서를 새 정본에 맞게 재작성한다.

| | |
|---|---|
| 날짜 | 2026-07-12 초기안, 2026-07-13 HOLD |
| 상위 문서 | [ATLAS-EDUCATION-LAYER.md](ATLAS-EDUCATION-LAYER.md) — 최신 PRD 후보 |
| 진행 방식 | **실행 금지.** 최신 PRD 승인 후 Phase 1에서 재작성 |
| 챕터 형식 | 이 문서의 13섹션은 **legacy**. 최신 PRD 후보의 14섹션이 승인 대상 |

---

## §A. 헌법 — 모든 Phase의 판단 기준 (운영자 지시 원문 반영)

> **"이 프로젝트는 AI Engineering을 배우는 교육 플랫폼입니다. 모든 설계와 구현은 '사용자가 더 잘 이해하도록 만드는가?'를 최우선 기준으로 판단하세요."**

1. **기능 게이트 질문**: 새 기능·컴포넌트·화면을 추가하기 전에 반드시 묻는다 — *"이것이 AI Engineering Learning Experience를 향상시키는가?"* 아니오면 만들지 않는다. 멋진 UI 자체는 목적이 아니다.
2. **5대 가치 (우선순위 동률의 심사축)**: **Visual · Interaction · Story · Engineering · Learning** — 다섯을 모두 만족 못 하면 Learning을 최후 기준으로 삼는다.
3. **Story Flow 불변**: 단순 Wiki 구조 금지. 모든 학습 단위는 "왜 → 한계 → 해결 → 다음"의 흐름을 가지며, 사용자는 **"왜"를 이해하면서 자연스럽게 다음 기술로 이동**해야 한다.
4. PRD 불변 조항 승계(§2): 기존 ai-ops·100강·용어집 무수정, 정적 export, KB 근거 없는 사실 서술 금지.

## §B. 챕터 13섹션 형식 (정본 — 전 챕터 공통, 순서 고정)

| # | 섹션 | 성격 | 데이터/근거 규칙 |
|---|---|---|---|
| 1 | 한 줄 정의 | 서사 | 비개발자 언어 1~2문장 |
| 2 | 왜 등장했는가 | 서사 | 시대적 필요 — KB 근거 |
| 3 | 이전 기술의 한계 | 서사 | 이전 노드와의 연결(atlas.ts limitationOfPrevious 확장 서술) |
| 4 | 무엇을 해결했는가 | 서사 | 돌파구 + 짧은 인용(모드 B, 챕터 전체 ≤3블록) |
| 5 | 대표 기업 | 사실 | **KB 확보분만** — 공식 발표·문서로 확인된 기업만, 확보 실패 시 항목 축소(추측 금지) |
| 6 | 대표 서비스 | 사실 | 동일 규칙 + 공식 링크 |
| 7 | 실제 사용 사례 | 사실 | 공식 사례(문서·발표) 1~2건, 이 사이트 자체 사례 적극 활용 가능 |
| 8 | 애니메이션 | 인터랙션 | StepPlayer 임베드(animationId) — 원리 한 장을 단계로 |
| 9 | 인터랙티브 데모 | 인터랙션 | 노드별 소형 데모(demoId) — 클릭·토글·드래그로 개념 확인 |
| 10 | 실습 | 인터랙션 | 사용자가 실제 도구(ChatGPT·Claude 등 무료 경로)로 해보는 과제 + 셀프체크 |
| 11 | 퀴즈 | 학습 확인 | QuizRunner 임베드(노드당 3~5문항, 해설 필수) |
| 12 | 관련 기술 | 연결 | 용어 칩 + 심화 강의 카드(기존 자산 딥링크) |
| 13 | 다음 기술 | 연결 | 다음 노드 예고 — "그래도 남은 문제" 문장으로 자연 이동 |

- 파일 형태: 챕터 md(13개 고정 `##` 헤딩) + 8·9·11은 md 안에 임베드 지시자(데이터 id) — 기존 강의 QA(헤딩 기계검사·인용 대조)를 그대로 재사용하기 위함.
- 기계 QA: "13헤딩 정확히 존재·순서 일치" 검사 추가(기존 8섹션 검사와 같은 방식).

## §C. 공통 규율 (모든 Phase)

- 시작: `git log --oneline -3; git status` 재대사. 종료: verify exit 0 → 커밋 → STATE NEXT 갱신 → **운영자 승인 요청 후 정지**.
- 커밋 접두 `ATLAS-P{n}:`. 배포는 운영자가 Phase 승인 시 지시한 경우만(기본은 P7 말미 1회).
- 에이전트 읽기: STATE NEXT + 본 문서의 해당 Phase 절 + (지시된) PRD 섹션만.

---

# Phase 1 — Foundation: 스키마 확장 + 여정 맵 + 챕터 뼈대

**목표**
- 13섹션 챕터를 담을 수 있는 데이터 구조와, Story Flow의 골격인 **여정 맵(/atlas)** · **챕터 화면(/atlas/[nodeId]) 뼈대**를 세운다. 이 Phase가 끝나면: 헤더에서 Atlas 진입 → 12노드 지도에서 진행 상태를 보고 → 챕터 뼈대(13섹션 자리 + 서사 필드 임시 표시 + "다음 기술" 이동)를 순회할 수 있다. *(Learning: 여정 감각 / Story: 노드 간 "한계→돌파" 연결선 문구 노출)*

**수정 파일**
- 신규: `src/content/atlas/` 폴더(챕터 placeholder 12), `src/features/atlas/` (JourneyMap · ChapterShell · AtlasProgressProvider), `src/app/atlas/page.tsx` · `src/app/atlas/[nodeId]/page.tsx`, `src/lib/atlas.ts`(로더·검증), `src/lib/atlas.test.ts`
- 확장: `src/content/atlas.ts` (13섹션 스키마 필드: companies/services/cases/animationId/demoId/practice 자리 — 값은 Phase 2~4에서 충전)
- 허용 예외 수정: `src/components/layout/SiteHeader.tsx` (메뉴 "Atlas" 1건)

**영향 범위**
- 기존 라우트·콘텐츠·빌드: **불변** (신규 라우트 추가만 — 정적 export 페이지 수 +13). 기존 100강·용어집 diff 0. localStorage 키는 신규 네임스페이스(`atlas-progress-v1`) — 기존 진행률 데이터와 충돌 없음.

**구현 계획**
1. atlas.ts 스키마 확장(§B 반영) — 빈 값 허용 필드로(콘텐츠는 후속 Phase).
2. A0의 참조 무결성 검사(파이썬)를 **vitest 테스트로 이식**(`atlas.test.ts`): 12노드·order 연속·lessonSlugs/glossaryTerms/kbIds 실존.
3. AtlasProgressProvider — 기존 progress.ts 패턴 복제 확장(스키마 버전·초기화), chapterRead 추적만 우선.
4. JourneyMap — 12노드 체인(모바일 세로/데스크톱 가로), 노드 상태(미방문/읽는중/완료) 표시, 연결선 호버·탭에 limitationOfPrevious 문구(=Story Flow 노출), "이어서 읽기".
5. ChapterShell — 13섹션 자리 렌더(있는 데이터만 표시, 8~11은 "Phase 3~5에서 열립니다" 상태), 하단 이전/다음 노드 내비(다음 예고 문구 포함), 노드 위치 표시(n/12).
6. 헤더 메뉴 추가. `/atlas` 미방문 시 홈 배너는 **P7로 연기**(승인 전 노출 금지).

**테스트**
- vitest: atlas 스키마 무결성(위 2) · AtlasProgress 저장/복원/버전/초기화 · 챕터 로더(존재하지 않는 nodeId → notFound).
- 수동: 라이트/다크/모바일 3뷰에서 여정 맵→챕터→다음 노드 순회, 키보드 탭 이동.

**QA**
- verify exit 0 (신규 페이지 13 포함 정적 생성 확인) · 기존 페이지 diff 0 확인(`git diff --stat`으로 src/content/lessons·glossary·curriculum 무변경) · reduced-motion에서 연결선 애니 정지 확인.

**Commit Message**
```
ATLAS-P1: foundation — journey map, chapter shell (13-section schema), atlas progress
```

---

# Phase 2 — Story: KB 보강 + 챕터 서사 12편 (섹션 1~7, 12~13)

**목표**
- 13섹션 중 서사·사실·연결 9개 섹션(1~7, 12~13)을 **12편 전부** 채운다. era/industryNow·타임라인 이벤트 원천도 이 Phase의 KB에서 확보. 사용자는 이 Phase 후 "왜"의 이야기 12장을 완주할 수 있다(인터랙션 3종은 잠금 표시). *(Story·Engineering·Learning)*

**수정 파일**
- 신규: `ai-ops/knowledge-base/entries/T14/*.md` (역사·기업·서비스 근거 KB 2~4건: ai-history / llm-emergence / (필요시) tool-ecosystem-adoption), `src/content/atlas/chapters/{nodeId}.md` ×12
- 확장: `src/content/atlas.ts` (era·industryNow·companies·services 충전 — KB 확보분만), `src/content/atlas/timeline.ts` 초기 이벤트
- ai-ops: 백로그에 atlas 행 추가, KB consumers에 atlas 표기, STATE 전이

**영향 범위**
- src 기존 파일 불변. 페이지 수 불변(챕터 내용만 충전). ai-ops는 기존 형식대로 항목 추가만.

**구현 계획**
1. P-01/P-02: T14 KB 수집·검증(Score 80+) — 대표 기업·서비스·사용 사례는 **공식 발표문·공식 문서·공식 사례 페이지**만 출처로(스토어 순위·블로그 전언 금지). 확보 실패 항목은 챕터에서 해당 섹션을 얇게(있는 것만) — 추측으로 채우지 않는다.
2. P-04: 챕터 12편 작성 — 13헤딩 골격 전부 생성하되 8~11은 임베드 지시자+한 줄 안내만. 분량 가이드: 서사 9섹션 합계 3,000~4,500자(챕터는 강의 요약 복제가 아니다 — 원리는 §12의 딥링크로 위임).
3. 인용: 챕터당 ≤3블록, 해당 노드 kbIds의 Quote Bank에서만, 글자 일치.
4. P-05: 통합 + 13헤딩 기계검사 스크립트(기존 형식 스캐너에 챕터 규칙 추가) + 참조 무결성 테스트 통과.
5. 12편은 4편씩 3웨이브로 나눠 진행(각 웨이브 verify) — Codex 미션 발급 가능(공통 규약 = 본 문서 §B·§C).

**테스트**
- vitest 기존 + 챕터 13헤딩 검사(신규 스크립트를 테스트로) · era/industryNow 채운 노드의 KB 근거 존재 검사.
- 수동: 3개 표본 챕터를 처음부터 끝까지 읽고 "다음 기술" 문구로 자연 이동되는지(Story Flow 체감) 확인.

**QA**
- 인용 전수 대조(축약 마커 제외 부분일치 — 공개판 기준) · 기업/서비스/사례 문장 전수: 출처 링크 존재 확인 · verify exit 0 · 모드 B 스캐너 0 위반.

**Commit Message**
```
ATLAS-P2: story content — T14 evidence KBs + 12 chapters (narrative sections 1-7,12-13)
```
(웨이브별: `ATLAS-P2a/b/c: chapters {노드목록}`)

---

# Phase 3 — Visual: 애니메이션 (섹션 8 개방)

**목표**
- **StepPlayer**(데이터 주도 단일 플레이어)와 P0 애니 4종(story-chain·token-window·tool-call·agent-loop)을 구현하고, 나머지 8노드는 기존 SVG에 스텝 하이라이트를 부여해 **12챕터 전부 섹션 8을 연다.** *(Visual — 추상 개념을 단계로 본다)*

**수정 파일**
- 신규: `src/features/atlas/StepPlayer.tsx`, `src/content/atlas/animations.ts`(steps 정의 12), 신규 SVG 4종(`src/content/atlas/diagrams/`)
- 확장: ChapterShell의 섹션 8 임베드 활성화, JourneyMap 히어로에 ani-story-chain

**영향 범위**
- 챕터·아틀라스 라우트 내부만. 번들: 모션 라이브러리 **추가 금지**(CSS/SVG+React 상태만) — 성능 영향 최소.

**구현 계획**
1. StepPlayer: 이전/다음/처음/재생(보조) 컨트롤, 키보드 ←/→, 단계 캡션(비개발자 한 줄), `prefers-reduced-motion` 시 트랜지션 제거·정지 화상, 진행 점 표시.
2. animations.ts: 스텝 = {label, caption, highlight 대상 id} — PRD §9.2 스토리보드 그대로.
3. P0 4종 신규 SVG(요소에 data-id 부여) → 하이라이트는 CSS 클래스 토글.
4. 잔여 8노드: 기존 강의 다이어그램 재사용 + 스텝 순서만 부여(재제작 금지).
5. 애니 완료(마지막 스텝 도달)를 AtlasProgress에 기록(§12 연동 준비).

**테스트**
- vitest: steps 데이터 무결성(빈 스텝·중복 id·highlight 대상 존재) · StepPlayer 상태 로직(다음/이전/경계).
- 수동: 키보드 전용 조작 완주 · reduced-motion ON에서 학습 가능성 유지 · 모바일 터치.

**QA**
- a11y: 컨트롤 aria-label·포커스 링 · verify exit 0 · 4종 애니가 각 개념의 "왜"를 실제로 보여주는지 §A 게이트 자문(장식 스텝 제거).

**Commit Message**
```
ATLAS-P3: visual — StepPlayer + 12 step animations (4 new, 8 retrofitted)
```

---

# Phase 4 — Interaction: 인터랙티브 데모 + 실습 (섹션 9·10 개방)

**목표**
- 노드별 **소형 데모**(클릭·토글·드래그로 개념을 조작해 보는 시뮬)와 **실습 과제**(사용자가 실제 무료 도구로 수행+셀프체크)를 12챕터에 연다. PRD §10의 플레이그라운드 3종은 규모 큰 데모로 이 Phase에 포함. *(Interaction — 손으로 확인한다)*

**수정 파일**
- 신규: `src/features/atlas/demos/`(공용 프리미티브: 토글비교·드래그예산·승인게이트 + 노드별 구성 데이터), `src/content/atlas/demos.ts`, `src/content/atlas/practice.ts`(실습 과제·셀프체크 문항)
- 확장: ChapterShell 섹션 9·10 활성화, AtlasProgress(demoDone·practiceDone)

**영향 범위**
- 아틀라스 내부만. 모든 데모 화면에 "시뮬레이션" 배지(§10.1) — API 키·시크릿 입력 UI 금지.

**구현 계획**
1. 데모 프리미티브 3종 구현: (a) A/B 토글 비교(pg-prompt-contract 계열) (b) 드래그/선택 예산(pg-context-budget) (c) 승인/거부 분기(pg-permission-gate). 나머지 노드 데모는 이 3종 프리미티브의 데이터 구성으로 해결(신규 컴포넌트 남발 금지 — §A 게이트).
2. 각 데모에 "관찰 과제" 1개(예: "무엇이 먼저 밀려났나?") — 답하면 완료.
3. practice.ts: 노드당 실습 1개 — 실제 도구에서 해보는 지시(예: Prompt 노드 — 같은 요청을 모호/계약형으로 보내 차이 기록) + 셀프체크 2~3항. 로그인·비용 필요한 절차는 대안 경로 병기.
4. 완료 상태를 Progress에 기록.

**테스트**
- vitest: 데모 상태머신(각 프리미티브의 분기·완료 조건) · practice 데이터 무결성.
- 수동: 12노드 데모+실습을 실제 수행(표본 4노드는 도구까지 실제 실행) · 모바일 드래그 대체 조작(탭 선택) 확인.

**QA**
- "시뮬레이션" 배지 전수 · 시크릿 입력 UI 부재 확인 · §A 게이트: 각 데모가 해당 노드의 "왜"를 조작으로 확인시키는가(장식 데모 반려) · verify exit 0.

**Commit Message**
```
ATLAS-P4: interaction — node demos (3 primitives) + hands-on practice with self-check
```

---

# Phase 5 — Learning Loop: 퀴즈 + 진행 완성 (섹션 11 개방)

**목표**
- 노드당 3~5문항 퀴즈(서사 이해 확인·해설 필수)와 **노드 완료 규칙**(챕터 읽음+퀴즈 통과)·완주 화면을 구현해 학습 루프를 닫는다. 기존 강의 완료가 "심화 완료" 배지로 자동 승계(PRD §12.2). *(Learning — 이해를 증거로)*

**수정 파일**
- 신규: `src/features/atlas/QuizRunner.tsx`, `src/content/atlas/quizzes.ts`(12세트), 완주 화면(여정 요약)
- 확장: ChapterShell 섹션 11, JourneyMap 상태(완료·심화 배지), AtlasProgress(quizPassed)

**영향 범위**
- 아틀라스 내부 + 기존 진행률 **읽기 전용 조회**(강의 완료 승계 — 기존 progress 데이터 쓰기 없음).

**구현 계획**
1. 문항 생산: 기존 **quiz-agent** 정의로 챕터 기반 생성 → education-review 검수 → quizzes.ts 통합. 유형 배분·해설 규칙 = PRD §11(서사 선택/체인 배열/한계 연결/OX+이유, 해설에 근거 딥링크 필수).
2. QuizRunner: 즉시 채점(클라이언트), 오답 → 챕터 해당 섹션 딥링크, 통과 60%+, 재응시 무제한, 벌점 없음.
3. 노드 완료 = chapterRead && quizPassed → 여정 맵 채움+체크. 심화 배지 = 연계 강의 전부 완료(기존 localStorage 조회).
4. 12/12 도달 시 완주 화면: 여정 요약(12개 "한계→돌파" 문장 일람) + 심화 트랙·용어집 제안.

**테스트**
- vitest: 채점 로직(경계 60%)·해설 링크 무결성(전 문항 딥링크 실존)·완료 규칙·강의 승계 조회.
- 수동: 오답→딥링크→재응시 루프 · 완주 화면 도달.

**QA**
- 문항 전수: 해설 없는 문항 0 · 정답이 챕터 본문에서 도출 가능한지 표본 검증(노드 3개) · verify exit 0.

**Commit Message**
```
ATLAS-P5: learning loop — quizzes (12 sets, explained answers) + completion rules + finale
```

---

# Phase 6 — Connection: Knowledge Graph + Timeline + Wiki 승격

**목표**
- 배운 것을 **관계와 시간**으로 재조망하게 한다: 그래프 전도/국소도(/atlas/graph), 타임라인 뷰(/atlas/timeline + 챕터 미시 이벤트), 용어집 승격(시대 배지·"이 용어는 왜 생겼나" 버튼·국소 그래프). *(Story×Engineering — 지도 완성)*

**수정 파일**
- 신규: `src/features/atlas/GraphView.tsx`·`TimelineView.tsx`, `src/lib/atlas-graph.ts`(빌드 타임 파생 엣지 계산), `src/app/atlas/graph/page.tsx`·`src/app/atlas/timeline/page.tsx`
- 확장: 챕터에 미시 타임라인 점, GlossaryBrowser에 시대 배지·왜 버튼(**additive** — 기존 기능 무변경), SiteSearch 인덱스에 챕터 추가

**영향 범위**
- 용어집·검색은 additive 확장(기존 데이터·기존 UI 동작 보존 — 스냅샷 비교로 검증). 그래프는 기존 prerequisites/related에서 파생(수작업 엣지 0, PRD §6.1).

**구현 계획**
1. atlas-graph.ts: 6종 엣지 파생 + 빌드 타임 좌표(고정 레이아웃) — 물리 시뮬 라이브러리 금지.
2. GraphView: 성좌 전도(노드 12 + 대표 용어 위성 3~5/노드) + 클릭 패널, 모바일은 세로 체인 강등. 국소도는 챕터·용어 페이지 재사용 컴포넌트.
3. TimelineView: 거시 밴드(era) + 미시 이벤트(timeline.ts — P2에서 수집분, KB 근거 필수). 근거 없는 이벤트는 미등재.
4. 용어집: 시대 배지(atlas glossaryTerms 우선, 카테고리→노드 대응표로 확장)·왜 버튼 → 챕터 섹션 4 딥링크.

**테스트**
- vitest: 엣지 파생 정확성(표본 대조)·타임라인 이벤트 kbId 실존·검색 인덱스에 챕터 포함.
- 수동: 그래프에서 3-hop 탐색(용어→노드→강의) · 용어집 기존 검색/필터 회귀 확인.

**QA**
- 용어집 기존 기능 회귀 0(변경 전후 상호작용 체크리스트) · 타임라인 전 이벤트 출처 링크 열림 · verify exit 0.

**Commit Message**
```
ATLAS-P6: connection — derived knowledge graph, timeline views, glossary era-badges
```

---

# Phase 7 — Polish & Launch: 통합 QA + 홈 배너 + 배포

**목표**
- 5대 가치 기준 전수 점검 후 공개한다. 홈 배너(허용 예외 ②)로 기존 사용자에게 Atlas를 소개.

**수정 파일**
- 허용 예외: `src/app/page.tsx` 배너 1건 · 신규: 없음(수정·정리만) · `public/sitemap` 자동(prebuild)

**영향 범위**
- 전 Atlas 화면 + 홈 배너. 라이브 사이트 갱신(배포).

**구현 계획**
1. 전수 QA 스윕: 13섹션 기계검사 ×12, 인용 스캐너, 참조 무결성, a11y(키보드 완주·aria·reduced-motion), 성능(모바일 3G 체감 — 그래프/애니 지연 로드), 라이트/다크.
2. §A 게이트 최종 자문: 각 화면·기능이 학습 효과에 기여하는가 — 기여 불명 요소 제거.
3. 홈 배너 + about 페이지에 Atlas 소개 1문단(선택, 운영자 확인).
4. `npm run verify` → 배포 → 라이브 스팟체크(여정 완주 1회, 신규 URL sitemap 확인).

**테스트** — 전 Phase 테스트 일괄 재실행 + 라이브 스모크(홈→Atlas→챕터→퀴즈→그래프).

**QA** — M5식 전수 리포트(`ai-ops/reports/atlas-qa-scan.md`) 작성: 검사 수·위반 0 명시.

**Commit Message**
```
ATLAS-P7: polish & launch — full QA sweep, home banner, public deploy
```

---

## §D. 승인 프로토콜

- 각 Phase 완료 시 보고 형식: 산출물 목록 · verify 결과 · 테스트/QA 결과 · 스크린 확인 포인트 · 다음 Phase 요약. **운영자 "승인" 후에만 다음 Phase 착수.**
- Phase 내 설계 변경이 필요하면 본 문서 해당 절을 먼저 수정·보고 후 구현(문서=정본).
- 현재 상태: **HOLD — 최신 21개 개념·14섹션 PRD 승인 대기.**
