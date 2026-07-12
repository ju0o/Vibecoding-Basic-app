# AI Engineering Atlas — Education Layer PRD (전체 기획서 · 단일 정본)

| | |
|---|---|
| 날짜 | 2026-07-12 (운영자 지시로 전면 기획, v2) |
| 상태 | **현행 단일 정본(SSOT)** — 구현 전 기획 전용. Lab PRD(V2-PLATFORM-PRD.md)는 보류·아이디어 보관 |
| 대원칙 | **Evolution, not Rebuild.** 기존 AI-Ops(Agent·Workflow·KB·Executor·QA·Dashboard)와 100강·용어집 456개·다이어그램을 그대로 유지하고, 그 위에 Education Layer만 추가한다 |
| 선행 산출 | Phase A0(커밋 8364c09): `src/content/atlas.ts` 12노드 데이터 스켈레톤 — 본 PRD §20의 기반 |

## §0. 에이전트 읽기 규약 (토큰 낭비 방지 — 모든 후속 작업의 전제)

- **작업 시작 시 읽는 것 = 본 문서의 해당 섹션 + `ai-ops/STATE.md`의 NEXT 블록. 끝.**
- 본 문서는 길다 — **전체 읽기 금지.** NEXT가 지정한 섹션(예: "§9 애니메이션")만 offset-Read 또는 Grep으로 연다.
- 기존 파이프라인 규칙이 필요하면 해당 프롬프트 파일 1개만(P-01~P-08). V1 운영 문서(ORCHESTRATION-PLAN·CODEX-PLAN·MASTER-PLAN 등)는 완결·동결 — 열지 말 것.
- 인용 = 모드 B(`qa/CITATION-POLICY.md` §1: 짧은 인용, 문서당 ≤3블록, 출처 링크 필수).
- 기존 강의·용어·KB 확인은 Grep으로 해당 항목만.

---

# 1. 현재 구조 분석

## 1.1 제품 층 (src/) — 실측 2026-07-12

| 영역 | 현황 |
|---|---|
| 라우트 (9) | `/` 홈 · `/curriculum` · `/lessons/[slug]` (100강) · `/glossary` (456용어) · `/resources` · `/about` `/privacy` `/terms` `/license` |
| 콘텐츠 SSOT | `src/content/` — `curriculum.ts`(13모듈·100강 메타) · `glossary.ts`(456용어, related 관계 내장) · `lessons/markdown/*.md`(V2 8섹션) · `lessons/diagrams/**/*.svg`(105+) · `resources.ts` · `schema.ts`(모듈·섹션 정의) · `atlas.ts`(A0 신설) |
| 강의 읽기 UX | TOC · ReadingProgressBar · BackToTop · Sidebar · prev/next NavigationCards · LessonMarkdown(콜아웃·하이라이트·인용 렌더) |
| 학습 상태 | `features/progress/` — LearningStateProvider(**localStorage, 서버 없음**), 완료·북마크·방문 추적, LearningDashboard |
| 탐색 | `features/search/SiteSearch`(강의·용어·자료 통합 인덱스) · CurriculumExplorer(아코디언·진행률) · GlossaryBrowser(검색·카테고리) |
| 빌드·배포 | Next.js `output: "export"` 정적 188페이지 · sitemap prebuild 훅 · Firebase Hosting · `npm run verify`(lint+typecheck+test+build) |
| 공개 상태 | 모드 B 공개(2026-07-12): noindex 해제, 인용 정리 완료, Footer 비영리 고지·인스타 @ju0o___, LICENSE(MIT)+콘텐츠 고지 |

## 1.2 운영 층 (ai-ops/) — 이미 잘 설계되어 있어 그대로 쓴다

| 구성 | 내용 |
|---|---|
| **Agents (14)** | research / source-collector / fact-check / lesson-writer / **quiz-agent** / **illustration-agent** / terminology / curriculum / education-review / qa / site-integration / release / final-editorial (+템플릿) — **퀴즈·일러스트 에이전트가 이미 존재** |
| **Workflow** | P-01 수집 → P-02 검증(Score 80+) → P-03 재수집 → P-04 생성 → P-05 통합(해시 대조) → P-06 verify → P-07 수정 → P-08 릴리스 → P-09 배포. 상태 기계는 `STATE.md` |
| **Knowledge Base** | `knowledge-base/entries/T01~T13` 90건 approved — frontmatter(id·score·prerequisites·consumers·sources+checked) + 13섹션 + **Quote Bank**(글자 단위 검증 인용) |
| **Executor** | Fable(지휘·검증·릴리스·배포) / Codex(대량 무정지 미션) — 2인 체제, 미션 카탈로그 `prompts/CODEX-MISSIONS.md` |
| **QA** | 기계 QA 5종(형식·인용 대조·링크·다이어그램 참조·용어 무결성) + 모드 B 인용 스캐너(`scripts/scan-citations.mjs`) + 표본 재검증 원칙 |
| **Dashboard/State** | `DASHBOARD.md` · `STATE.md`(현황판+NEXT 블록) · `MASTER_PROGRESS.md` · 백로그 |

## 1.3 진단 — 왜 지금 "Wiki"에 머무르는가

| 강점 (자산) | 공백 (Education Layer가 채울 것) |
|---|---|
| 깊이: 100강 × 8섹션, 전 문장 KB 근거 | **서사 없음** — 용어들이 "왜, 어떤 순서로" 생겼는지의 이야기가 없다 |
| 관계 원료: 강의 prerequisites, 용어 related, KB consumers가 **이미 데이터로 존재** | 관계가 **보이지 않는다** — 그래프·지도로 렌더되지 않음 |
| 시간 원료: KB sources에 확인일·발표문 근거 | **타임라인 없음** — 발전사가 시각화되지 않음 |
| 다이어그램 105+ | **정적** — 단계·상호작용 없음 |
| 검색·용어집 | **찾아보기(lookup)형** — 목적어를 이미 아는 사람만 진입 가능 |
| 진행률(localStorage) | 강의 단위뿐 — **여정 단위** 진행 감각 없음 |

**결론**: 부족한 것은 콘텐츠가 아니라 **콘텐츠를 꿰는 층**이다. Education Layer는 신규 생산 최소·재조합 최대로 설계한다.

---

# 2. 유지해야 하는 구조 (불변 조항)

1. **ai-ops 전체 무수정** — agents 14종·workflow P-01~09·KB 스키마·executor 체제·QA 도구·DASHBOARD/STATE 형식. Atlas 콘텐츠도 이 파이프라인 **위에서** 생산된다(대체가 아니라 재사용).
2. **기존 콘텐츠 무수정** — 100강 markdown·curriculum.ts·glossary.ts·다이어그램·resources. Atlas는 **참조만** 한다. (허용 예외: 헤더 메뉴 1건, 홈 배너 1건 — §16·§17)
3. **기술 불변** — Next 정적 export · Firebase Hosting · localStorage 진행률(서버·계정 없음) · verify 게이트 · 모드 B 인용 · 비영리 공개 방침.
4. **품질 불변** — KB Score 80+ · 인용 Quote Bank 글자 일치 · era/역사 서술은 **KB 확보분만**(추측 금지) · 극단값 표본 재검증.

---

# 3. Education Layer 설계 (총론)

## 3.1 층 구조 — 기존 위에 5개 부분층을 얹는다

```
┌────────────────────── Education Layer (신규) ──────────────────────┐
│ ⑤ Guidance   Learning Roadmap · Progress (여정 안내)               │
│ ④ Interaction Animation · Playground · Quiz (손으로 확인)          │
│ ③ Time       Timeline (언제, 어떤 순서로)                          │
│ ② Relation   Knowledge Graph · Concept Relationship (무엇과 연결)  │
│ ① Story      12노드 Atlas Chapter (왜 등장했는가)                   │
├────────────────────── Knowledge Layer (기존·무수정) ────────────────┤
│ 100강 Lessons · 456 Glossary · 105+ Diagrams · Resources           │
├────────────────────── Evidence Layer (기존·무수정) ─────────────────┤
│ KB 90건 (Quote Bank·sources·checked) ← ai-ops 파이프라인이 생산     │
└────────────────────────────────────────────────────────────────────┘
```

## 3.2 스토리 축 — 12노드 체인 (모든 부분층의 공통 뼈대)

```
AI → LLM → Prompt → Context → Memory → Tool → MCP
→ Agent → Workflow → Orchestration → Harness → Production AI
```

각 노드는 세 질문에 답한다: **① 왜 등장했나(이전의 어떤 한계가)** · **② 무엇을 해결했나** · **③ 왜 이것만으로 부족했나 + 지금 산업은 어디인가**. — 용어 암기가 아니라 **필요의 역사**를 배운다.

## 3.3 추가 원칙

- **데이터 추가형(additive)**: 신규는 `src/content/atlas*` 데이터 파일과 `/atlas` 라우트뿐. 기존 파일은 참조 대상.
- **관계는 승격, 생산은 최소**: prerequisites·related·consumers를 그래프 엣지로 **승격**(빌드 타임 계산). 신규 수작업 데이터는 노드 서사·타임라인 이벤트·퀴즈 문항뿐.
- **커버리지 실측(A0)**: 12노드 중 10노드는 기존 강의 2~4편이 심화로 존재. 신규 KB는 AI·LLM 역사 1~2건.

---

# 4. 기존 Knowledge Base 활용 방법

| 용도 | 방법 |
|---|---|
| **챕터 인용 근거** | 각 노드의 `kbIds`(A0에 매핑 완료)가 근거 KB. 챕터의 인용은 해당 KB **Quote Bank에서만**, 모드 B(≤3블록) — explanation-practice 강의들이 검증한 재활용 패턴 그대로 |
| **era / industryNow / Timeline 이벤트** | KB `sources`(공식 발표문·스펙·사전) 확보분만 사용. 부족하면 **P-01 신규 수집**(AI·LLM 역사 KB 1~2건) → P-02 Score 80+ → 사용. 확보 실패 시 해당 필드 공란 유지(추측 금지) |
| **역추적** | KB frontmatter `consumers`에 `atlas: [nodeId]` 항목 추가(스키마 확장, 기존 필드 무변경) — "이 KB가 어느 노드를 지탱하나" 추적 |
| **신선도** | 기존 stale-KB 30일 재확인 절차(M4)에 Atlas 소비 KB 자동 포함 — Timeline·industryNow가 낡으면 같은 절차로 보수 |
| **특수 출처** | 용어 기원(예: vibe coding)은 기존 SOURCE-REGISTRY 특수 출처 절차(사전·Wayback 병기) 그대로 승계 |
| **생산 주체** | 챕터·퀴즈·타임라인 데이터 모두 기존 에이전트 정의 재사용: research→source-collector→fact-check(P-01/02) · lesson-writer(챕터 P-04) · **quiz-agent**(문항) · **illustration-agent**(스텝 다이어그램) · site-integration(P-05) · qa·release |

---

# 5. Learning Roadmap 설계

## 5.1 여정 구조 — "노드 안 3단"

각 노드는 같은 리듬으로 학습된다:

```
[Story]  Atlas Chapter (5~8분 읽기)     ← 신규, 비개발자 눈높이
   ↓
[Deep]   기존 강의 딥링크 2~4편 (선택)   ← 기존 100강, 무수정
   ↓
[Check]  Quiz 3~5문항 (2분)             ← 신규, 서사 이해 확인
```

## 5.2 트랙 (강제 아닌 권장)

| 트랙 | 경로 | 소요 |
|---|---|---|
| **스토리 일주** (기본) | Chapter 12편 + Quiz만 | 총 2~3시간 — "AI 엔지니어링 전체를 이야기로 한 바퀴" |
| **심화 동반** | 각 노드에서 Deep까지 | 노드당 +1~3시간 — 기존 커리큘럼과 자연 합류 |
| **역주행** (검색 유입) | 용어→노드→앞뒤 노드 | 자유 — Wiki 사용자를 여정으로 흡수 |

## 5.3 순서 규칙

- 잠금(lock) 없음 — 권장 순서(1→12)와 "이전 장의 한계" 연결 카피로 **유도**하되 자유 탐색 허용. (성인 자율 학습자 대상 — 강제 잠금은 이탈 요인)
- 저니 맵의 "다음 추천" = 미완료 노드 중 최저 order 1개 + 이어서 읽던 챕터.

---

# 6. Knowledge Graph 설계

## 6.1 노드·엣지 모델

| 노드 유형 | 수량 | 출처 |
|---|---|---|
| AtlasNode | 12 | atlas.ts (A0) |
| Lesson | 100 | curriculum.ts (기존) |
| Term | 456 | glossary.ts (기존) |

| 엣지 유형 | 의미 | 원료 (신규 수작업 여부) |
|---|---|---|
| `evolves-to` | 노드 n → n+1 (스토리 체인) | atlas.ts order — **완료** |
| `deepens` | AtlasNode → Lesson (심화) | atlas.ts lessonSlugs — **완료** |
| `defines` | AtlasNode → Term (핵심 용어) | atlas.ts glossaryTerms — **완료** |
| `requires` | Lesson → Lesson (선행) | curriculum/백로그 prerequisites — **기존 데이터 승격, 수작업 0** |
| `related` | Term ↔ Term | glossary related — **기존 데이터 승격, 수작업 0** |
| `evidenced-by` | AtlasNode → KB | atlas.ts kbIds — **완료** (그래프 UI에는 옵션 표시) |

→ **그래프는 빌드 타임에 기존 데이터에서 파생 생성**한다. 신규 수작업 엣지는 없다. 무결성은 A0에서 만든 참조 검증 스크립트 방식(존재 검사)을 verify에 편입.

## 6.2 뷰 2단계

| 뷰 | 내용 | 인터랙션 |
|---|---|---|
| **전도(全圖)** `/atlas/graph` | 12노드를 성좌(constellation)로, 각 노드 주위에 핵심 용어 위성 | 노드 클릭→우측 패널(질문·한계·돌파 요약+진입 링크) · 용어 클릭→팝오버 |
| **국소도** (챕터·용어 페이지 내) | 현재 항목 중심 1-hop 이웃 | 칩 클릭 이동 |

## 6.3 렌더 제약

- 정적 export 유지 → 물리 시뮬 라이브러리 지양. **빌드 타임 좌표 계산(고정 레이아웃) + 클라이언트 SVG** + CSS 트랜지션. 456용어 전부를 전도에 그리지 않는다 — 노드당 대표 용어 3~5개만 위성으로, 나머지는 국소도에서.
- 모바일: 전도는 세로 스크롤 체인으로 강등(성좌는 데스크톱 확장).

---

# 7. Timeline 설계

## 7.1 데이터 스키마 (개념 — 구현은 A-phase에서)

```
TimelineEvent {
  id, nodeId,              // 어느 노드의 사건인가
  period,                  // "2017" | "2018–2020" | "2024-11" 등 표기 그대로
  title, oneLiner,         // 사건 한 줄
  kbId, sourceUrl          // 근거 KB + 원 출처 (필수 — 없으면 등재 불가)
}
```

## 7.2 두 층의 타임라인

| 층 | 위치 | 내용 |
|---|---|---|
| **거시 밴드** | `/atlas` 저니 맵 상단 + `/atlas/timeline` | 12노드의 era 밴드가 가로로 이어진 발전사 — "규칙의 시대 → 학습의 시대 → 대화의 시대 → 도구의 시대 → 자율의 시대 → 운영의 시대" 식 시대 묶음 |
| **미시 이벤트** | 각 챕터의 "지금 산업은" 위 | 해당 노드의 사건 3~6개 점(예: MCP 노드 — 스펙 공개, 주요 호스트 채택) |

## 7.3 소싱 규칙 (엄격)

- 이벤트는 **KB sources에 실존하는 공식 근거**(발표문·스펙 버전·사전 등재·논문)만. 연도가 불확실하면 등재하지 않는다.
- 1차 수집 대상(P-01 후보): Transformer/LLM 등장 계열, 주요 모델 세대, tool calling 공개, MCP 스펙(2025-11-25 등 이미 KB에 있음), vibe coding 등재(Collins 2025 — 이미 KB에 있음). **기존 KB에서 이미 캐낼 수 있는 이벤트가 상당수**다.

---

# 8. Concept Relationship 설계

## 8.1 관계의 1급 시민 — "한계→돌파" 서사 엣지

일반 지식그래프의 "관련 있음"은 학습을 못 이끈다. Atlas의 핵심 관계는 방향과 이유가 있는 서사 엣지다:

```
[Prompt] ──"지시는 다듬지만, 모델은 우리 문서를 모른다"──▶ [Context]
```

- 데이터: atlas.ts의 `limitationOfPrevious`(다음 노드 관점의 이전 한계) — **A0에서 12개 전부 작성 완료.**
- UI 표현 3곳: ① 저니 맵 연결선 호버/탭 시 이 문장 노출 ② 챕터 도입부 "이전 세계의 한계" 카드 ③ 챕터 말미 "그래도 남은 문제" = 다음 엣지 예고.

## 8.2 보조 관계의 표현 위계

| 관계 | UI |
|---|---|
| deepens (노드→강의) | 챕터 하단 "원리 깊이 보기" 카드 (기존 LessonCard 재사용) |
| defines (노드→용어) | 챕터 내 용어 칩 → 기존 용어집 팝오버/링크 |
| related (용어↔용어) | 기존 용어집 그대로 + 국소 그래프 |
| requires (강의→강의) | 기존 강의 페이지 그대로 (Atlas는 개입하지 않음) |

## 8.3 일관성 규칙

- 한 관계는 한 곳에서 정의된다(엣지 원천 표 §6.1) — 중복 선언 금지.
- 서사 문장은 챕터 md와 atlas.ts 중 **atlas.ts가 정본**(챕터는 이를 확장 서술).

---

# 9. Animation 설계

## 9.1 원칙 (정적 export 제약 내)

1. **Step-first**: 자동 재생이 아니라 "한 단계씩" 클릭이 기본(오프라인 강의 검증 원칙). 재생 버튼은 보조.
2. **CSS/SVG만**: 무거운 모션 라이브러리 없이 transform/opacity 트랜지션. `prefers-reduced-motion` 준수 필수.
3. **데이터 주도**: 애니는 `steps[]`(라벨·캡션·하이라이트 대상) 데이터로 정의하고 **플레이어 컴포넌트 1개**가 전부 렌더 — 노드마다 코드 작성 금지.
4. **가르치지 않는 장식 금지**: 흐름 입자·강조는 데이터 이동이 있을 때만.

## 9.2 카탈로그 (노드당 1개 "원리 한 장" — MVP 6종 우선)

| 우선 | ID | 노드 | 스텝 스토리보드 |
|---|---|---|---|
| P0 | ani-story-chain | 저니 맵 | 12노드 연결선이 순서대로 점등(한계→돌파 문장과 동기) |
| P0 | ani-token-window | Context/Memory | 창 채움 → 넘침 → 밀려남 → 요약/캐시로 회수 |
| P0 | ani-tool-call | Tool | 의도 → 구조화 호출 → 실행 → 결과 → 답변 |
| P0 | ani-agent-loop | Agent | 계획→행동→관찰→갱신 순환 + 종료 조건 |
| P1 | ani-mcp-port | MCP | 앱×도구 N×M 스파게티 → 표준 포트로 정리 |
| P1 | ani-harness-gate | Harness | 게이트·한도·로그가 루프를 감싸는 과정 |
| P2 | 나머지 6노드 | — | 기존 정적 SVG를 스텝화(하이라이트 순서만 부여) |

- 기존 다이어그램 105+ 중 재사용 가능분은 **스텝 하이라이트만 얹는다**(재제작 금지). 신규 제작은 illustration-agent 정의 재사용.

---

# 10. Playground 설계

## 10.1 원칙

- **시뮬레이션 전용** (MVP): API 키·서버·비용 없음. 상태 머신 데이터로 "가짜지만 구조는 진짜"인 체험. 모든 화면에 "시뮬레이션" 배지.
- 시크릿 입력 UI 금지. 로그는 V1의 evidence packet 언어(method·입력·결과) 재사용 — 교과서와 어휘 통일.
- 실 API 연동(BYOK)은 본 PRD 범위 밖(추후 별도 판단).

## 10.2 MVP 3종 (+확장 2종)

| ID | 노드 | 체험 | 배우는 것 |
|---|---|---|---|
| pg-prompt-contract | Prompt | 모호한 요청 vs 계약형 요청을 토글 → 시뮬 응답 품질 비교 | 프롬프트=작업 계약 |
| pg-context-budget | Context/Memory | 자료 카드를 창에 드래그 → 예산 초과 시 밀려남 시각화 | 유한한 그릇·선별 |
| pg-permission-gate | Harness | 에이전트의 위험 도구 요청을 승인/거부 → 결과 분기 | 자율과 통제의 경계 |
| (P2) pg-tool-call-cycle | Tool | 호출 한 사이클 조립(의도→스키마→결과) | 구조화 호출 |
| (P2) pg-orchestrate | Orchestration | 작업 카드를 서브에이전트에 분배 → 병합 | 위임·병합 |

## 10.3 완료 연동

각 플레이그라운드는 1개 이상의 "관찰 과제"(예: "예산 초과 시 무엇이 먼저 밀려났나?")를 갖고, 완료가 Progress(§12)와 해당 노드 Quiz에 연결된다.

---

# 11. Quiz 시스템

## 11.1 목적 — 암기 확인이 아니라 **서사 이해 확인**

노드당 3~5문항, 유형 배분:

| 유형 | 예 | 확인하는 것 |
|---|---|---|
| 서사 선택 | "MCP가 등장한 직접적 이유는?" (도구 연결의 N×M 문제 / 모델이 느려서 / …) | ① 왜 등장했나 |
| 체인 배열 | Prompt·Context·Tool·Agent 카드를 등장 순서로 정렬 | 흐름 감각 |
| 한계 연결 | "Context만으로 부족했던 이유" ↔ 다음 노드 매칭 | ③ 왜 다음이 필요했나 |
| OX+이유 | "에이전트에는 MCP가 필수다 — O/X" (X: 층이 다르다) | 흔한 오해 교정 |

## 11.2 규칙

- 모든 해설에 근거 링크(챕터 섹션 또는 KB 인용 강의) — **해설 없는 문항 금지.**
- 오답 시 벌점·잠금 없음: 해당 챕터 섹션 딥링크로 "다시 읽기" 유도.
- 통과 기준: 노드당 정답 ≥ 60% → Progress에 check 기록(재응시 무제한).
- 채점·기록 전부 클라이언트(localStorage) — 서버 없음.
- **생산**: 기존 `quiz-agent` 정의로 챕터 완성 후 일괄 생성 → education-review-agent 검수 → 데이터 파일로 통합(P-05). 문항 스키마는 구현 phase에서 확정.

---

# 12. Progress 시스템

## 12.1 기존 확장 (재작성 금지)

기존 `LearningStateProvider`/`progress.ts`(localStorage·스키마 버전·초기화 제공)를 **확장 필드**로 넓힌다:

```
AtlasProgress {
  version,
  chapterRead:   nodeId[],     // 챕터 끝 도달(스크롤 90% 또는 버튼)
  quizPassed:    nodeId[],
  playgroundDone: playgroundId[],
  lastNodeId
}
```

## 12.2 노드 상태와 표시

| 상태 | 조건 | 저니 맵 표시 |
|---|---|---|
| 미방문 | — | 윤곽선 |
| 읽는 중 | 챕터 진입 | 반채움 |
| 완료 | chapterRead + quizPassed | 채움 + 체크 |
| 심화 완료 | + 연계 강의 전부 완료(기존 진행률과 교차 조회) | 채움 + 별 |

- 기존 강의 완료 데이터와 **양방향 표시**: 강의를 이미 끝낸 사용자는 해당 노드에 "심화는 이미 완료" 배지가 자동 표기 — 기존 사용자의 성취가 Atlas에서 승계된다.
- 홈·Atlas 랜딩에 "이어서 읽기"(lastNodeId) — 기존 홈의 이어읽기 패턴과 동일 UX.

---

# 13. 현재 Wiki(용어집)를 어떻게 발전시킬 것인가

**대체하지 않는다 — 용어집은 Atlas의 "사전 층"으로 승격된다.**

| 추가 (용어집 화면에) | 효과 |
|---|---|
| **시대 배지**: 용어마다 소속 노드 표시("MCP — 🧭 7장 도구 표준의 시대") | 검색 유입자가 낱말이 아니라 **지도 위 위치**를 얻는다 |
| **"이 용어는 왜 생겼나" 버튼** → 해당 챕터의 돌파구 섹션 딥링크 | lookup → story 전환(역주행 트랙 §5.2) |
| 국소 그래프(1-hop related) | 기존 related 배열의 시각화 — 데이터 신규 0 |
| 검색 인덱스에 챕터 추가 | 기존 SiteSearch 확장 — "왜"로 검색해도 챕터가 잡힘 |

- 456용어 전부에 노드를 강제 배정하지 않는다 — atlas.ts `glossaryTerms`(핵심 용어)부터 시작, 나머지는 카테고리→노드 대응표로 점진 배정(데이터 작업, 콘텐츠 무수정).

---

# 14. Information Architecture

```
AI Vibe Coding Master (한 사이트)
│
├─ 🧭 Atlas (신규 — Education Layer의 얼굴)
│    ├─ /atlas                여정 맵 (저니 + 거시 타임라인 밴드 + 이어서 읽기)
│    ├─ /atlas/[nodeId]       챕터 (스토리 5섹션 + 애니 + 용어 칩 + 심화 카드 + 퀴즈)
│    ├─ /atlas/graph          지식 그래프 전도
│    ├─ /atlas/timeline       발전사 타임라인 (거시+미시 통합 뷰)
│    └─ /atlas/playground/[id] 시뮬 3종 (P2)
│
├─ 📚 Textbook (기존 — 무수정)
│    ├─ /curriculum · /lessons/[slug]
│    └─ Atlas와의 접점: 챕터→강의 딥링크(deepens)만. 강의 페이지는 변경 없음*
│
├─ 📖 Wiki (기존 + §13 승격)
│    └─ /glossary (+시대 배지·왜 버튼·국소 그래프)
│
└─ 자료실·정보 (기존) /resources · /about · /privacy · /terms · /license

* P3 이후 선택: 강의 페이지에 "이 개념의 자리 보기 → Atlas" 링크 1줄 (기존 페이지 유일 수정 후보, 별도 승인)
```

- 콘텐츠 파일 계층: `src/content/atlas.ts`(노드·정본) + `src/content/atlas/` 폴더(챕터 md 12·timeline·quiz·animation steps 데이터) — 기존 `content/` 관례와 동일한 "파일=SSOT" 원칙.

---

# 15. User Flow

## 15.1 신규 방문자 (비개발자, 처음 옴)

```
홈 히어로 "AI는 어떻게 여기까지 왔을까?" 배너
 → /atlas (12노드 지도 한눈에 — "당신의 여정" 0/12)
 → 1장 AI 챕터 (5분: 한계→돌파→원리 한 장→남은 문제→지금)
 → 퀴즈 3문항 통과 → 노드 채움 ✓ → "다음: LLM — 이전 장의 남은 문제가 이렇게 풀립니다"
 → … 반복 → 12장 완주 화면 (여정 요약 + 심화 트랙 제안)
```

## 15.2 검색 유입 (특정 용어가 궁금해서 옴)

```
구글 "MCP란" → /glossary MCP → 시대 배지 "7장"
 → "이 용어는 왜 생겼나" → /atlas/mcp 돌파구 섹션
 → 앞장(Tool)의 남은 문제를 보고 "아, 그래서" → 저니 합류 or 심화 강의
```

## 15.3 기존 독자 (강의로 공부하던 사용자)

```
/curriculum → 강의 완료 (기존 흐름 그대로)
 → Atlas 첫 방문 시: 완료 강의가 노드에 "심화 완료" 배지로 자동 반영
 → 비어 있는 노드(스토리·퀴즈)만 채우는 짧은 일주
```

## 15.4 이탈 방지 장치

- 챕터는 5~8분 상한(V2 강의의 "무거운 첫 체감" 문제를 스토리 층에서 해소).
- 어느 화면에서든 2클릭 내: 지도 복귀 · 다음 노드 · 심화.

---

# 16. Navigation

| 위치 | 구성 |
|---|---|
| **헤더** (기존 +1) | 홈 · **Atlas** · 커리큘럼 · 용어집 · 자료실 · [검색] · [테마] — 기존 SiteHeader에 메뉴 1건 추가(허용 예외 ①) |
| **Atlas 보조 탭** | 여정 ─ 그래프 ─ 타임라인 (Atlas 섹션 내 상단 탭, 상태 공유) |
| **챕터 내부** | 상단: 노드 위치 표시(7/12)+지도 복귀 · 하단: ← 이전 장 | 다음 장 → (한계 문장 티저 포함) · 우측/하단 시트: 용어 칩·심화 카드 |
| **모바일** | 기존 패턴 승계: 헤더 축약, 저니 맵=세로 체인, 그래프=국소도 우선, 패널=바텀시트 |
| **키보드/접근성** | 애니 스텝 ←/→ · 탭 포커스 순서 = 읽기 순서 · reduced-motion 시 스텝 정지 화상 |

---

# 17. 첫 화면

## 17.1 홈(/) — 배너 1건만 추가 (허용 예외 ②)

기존 홈 유지. 히어로 아래 Atlas 진입 배너:

> **AI는 어떻게 여기까지 왔을까?**
> AI에서 Production AI까지, 12개의 전환점을 하나의 이야기로. — *새로 나온 Atlas에서 여정 시작* →

## 17.2 /atlas 랜딩 (Education Layer의 첫 화면)

```
[히어로]  12노드 성좌 미리보기 (ani-story-chain 저속 점등)
          "용어를 외우지 마세요. 필요의 역사를 읽으세요."
[여정]    12노드 가로 체인(데스크톱)/세로(모바일) + 내 진행 n/12
          각 노드: 아이콘·제목·질문 한 줄·상태
[이어서]  "이어서 읽기: 7장 MCP" (lastNodeId) / 처음이면 "1장에서 시작"
[안내]    3트랙 소개(스토리 일주 2~3h · 심화 동반 · 용어에서 역주행)
```

---

# 18. 사이트 철학

기존 4원칙 승계 + Atlas 3원칙 추가:

| # | 원칙 | 뿌리 |
|---|---|---|
| 1 | **출처 없는 문장은 없다** — 서사·연표도 KB 확보분만, 추측 금지 | V1 인용 정책 승계 |
| 2 | **검증이 학습이다** — human review·퀴즈 해설·시뮬 배지 | V1 검증 철학 승계 |
| 3 | **설명할 수 있어야 아는 것이다** — 완료 기준은 "왜"를 말할 수 있는가 | explanation-practice 승계 |
| 4 | **비영리·무료·한국어 우선** | 공개 전환 방침 승계 |
| 5 | **용어는 필요의 역사다** — 모든 개념은 이전 기술의 한계에서 태어났다 | Atlas 신규 |
| 6 | **찾아보기에서 여정으로** — lookup을 부정하지 않고 story로 승격한다 | Atlas 신규 |
| 7 | **Evolution, not Rebuild** — 쌓은 것을 부수지 않고 층을 얹는다 | 운영자 대원칙 |

---

# 19. 차별점

| 비교 대상 | 그들 | AI Engineering Atlas |
|---|---|---|
| 용어집·위키류 | 낱말 정의 나열, 관계·순서 없음 | **12장 서사** + 그래프 + 타임라인이 낱말을 꿰어줌 |
| 기술 블로그·뉴스레터 | 시의성 있지만 파편적, 출처 느슨 | 전 문장 KB 근거(Quote Bank 글자 검증), 시들면 stale 절차로 보수 |
| 강의 플랫폼 | 영상·유료·수동 시청 | 무료·텍스트+인터랙션·읽는 속도 자율, 서버·계정 없음 |
| 공식 문서 | 정확하나 "왜"와 역사가 없음, 영어 | 공식 문서를 **인용하면서** 왜·역사·한국어 서사를 얹음 — 문서로 돌아가는 다리(원문 링크) |
| AI 챗봇에게 묻기 | 즉답이나 검증·체계 없음 | 검증된 지식의 **지도** — 챗봇과 상호보완(질문할 좌표를 제공) |

**한 줄**: 검증된 지식 베이스(90 KB·100강·456용어) 위에 **서사·관계·시간·상호작용**을 얹은, 한국어 무료 AI 엔지니어링 발전사 지도 — 이 조합이 유일성이다.

---

# 20. 최종 프로젝트 구조

## 20.1 파일 트리 (■ 신규 / □ 기존 무수정 / ◪ 최소 수정 허용 예외)

```
src/
  content/
    ■ atlas.ts                     # 12노드 정본 (A0 완료)
    ■ atlas/
    ■   chapters/{nodeId}.md       # 챕터 12편 (5섹션 · 2.5~4천자)
    ■   timeline.ts                # TimelineEvent[] (KB 근거 필수)
    ■   quizzes.ts                 # 노드별 문항
    ■   animations.ts              # steps[] 정의 (플레이어 1개가 소비)
    □ curriculum.ts · glossary.ts · lessons/** · resources.ts · schema.ts
  app/
    ■ atlas/ (page · [nodeId] · graph · timeline · playground/[id])
    □ 기존 라우트 전부
    ◪ layout/SiteHeader (메뉴 +1) · app/page (배너 +1)
  features/
    ■ atlas/ (JourneyMap · ChapterView · GraphView · TimelineView ·
              StepPlayer · QuizRunner · PlaygroundShell · AtlasProgressProvider)
    □ progress/ · search/(인덱스 확장은 additive) · 기타 전부
ai-ops/
  □ 전 구조 무수정 (agents 14 · prompts P-01~09 · KB · QA · STATE 체계)
  ■ knowledge-base/entries/T14/    # Atlas 서사 KB (AI·LLM 역사 등 1~3건)
  ■ outputs 백로그에 atlas 행 추가 (기존 형식 그대로)
```

## 20.2 실행 로드맵 (기획 승인 후)

| Phase | 산출 | 게이트 |
|---|---|---|
| **A0** ✅ | 본 PRD + atlas.ts 12노드(참조 무결성 기계검증) | verify exit 0 (완료, 커밋 8364c09) |
| **A1** | /atlas 여정 맵 + 챕터 뼈대 + 헤더 메뉴 + AtlasProgress | verify + 육안(라이트/다크/모바일) |
| **A2** | KB 1~3건(P-01/02) + 챕터 12편(P-04/05) + era/industryNow 충전 | 인용 QA(모드 B) + verify |
| **A3** | StepPlayer + 애니 P0 4종 + 그래프 전도/국소도 | reduced-motion·키보드 점검 |
| **A4** | 타임라인(거시+미시) + Wiki 승격(시대 배지·왜 버튼) | KB 근거 전수 확인 |
| **A5** | Quiz 12세트(quiz-agent) + 완료 연동 + 홈 배너 | 해설·딥링크 전수 확인 |
| **A6** | Playground 3종 + 폴리시(a11y·perf) + **배포** | 라이브 스팟체크 + sitemap 반영 |

- 역할: Fable = 설계·P-02·QA·릴리스·배포 / Codex = 챕터·퀴즈 대량 생산 및 UI 구현 미션(발급 시). 커밋 규율 `ATLAS-Ax:`. 배포는 phase 완료 시 Fable.

## 20.3 성공 기준

1. 신규 사용자가 안내 없이 1장→2장으로 넘어가고, "MCP가 왜 나왔는지"를 이전·다음 노드와 연결해 말할 수 있다(퀴즈 통과율로 측정).
2. 기존 강의·용어집·ai-ops는 diff 0(허용 예외 ◪ 2곳 제외).
3. 서사·연표의 모든 사실 문장에 KB 근거 존재(공란은 있어도 추측은 없다).
4. verify exit 0 · 모드 B 인용 준수 · 정적 export 유지 · 라이브 배포.

## 20.4 리스크와 대응

| 리스크 | 대응 |
|---|---|
| 역사 서술의 부정확 | KB 근거 필수 + 공란 허용 원칙(§7.3) + stale 재확인 절차 편입 |
| 그래프 과밀(456용어) | 전도는 대표 용어만, 나머지는 국소도(§6.3) |
| 챕터가 강의의 요약 복제가 됨 | 챕터는 "왜"의 서사만(2.5~4천자 상한), 원리는 딥링크로 위임(§3.2) |
| 정적 export 제약과 인터랙션 욕심 충돌 | CSS/SVG·클라이언트 상태만으로 설계(§9.1·§10.1) — 서버 필요 기능은 범위 밖 선언 |
| 문서 엉킴 | 본 PRD가 유일 정본, Lab PRD 보류 명시, §0 읽기 규약 |

---

*본 문서는 기획 산출물이다. 코드 구현은 운영자 승인 후 §20.2 로드맵 순서로 진행한다.*
