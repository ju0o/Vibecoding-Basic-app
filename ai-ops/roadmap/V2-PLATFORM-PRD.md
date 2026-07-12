# AI Vibe Coding Master — V2 Platform PRD & Architecture

| | |
|---|---|
| **문서 종류** | V2 전체 설계 (PRD + 교육 + 아키텍처 + 로드맵) |
| **날짜** | 2026-07-12 |
| **상태** | **보류 (2026-07-12 운영자 방향 변경)** — 현행 정본은 [`ATLAS-EDUCATION-LAYER.md`](./ATLAS-EDUCATION-LAYER.md) (기존 구조 유지 + Education Layer 추가). 본 PRD는 아이디어 보관 |
| **V1 공개 기준** | https://ju0o-ec967.web.app (Batch2 public release) |
| **근거 소스** | V1 `src/`·`curriculum`·`ai-ops/*` · `CodingLabV2.md` · `D:\vibe-coding-basic-app` |

---

# 0. Executive Positioning

| | V1 Textbook (유지) | V2 Lab Platform (신규) |
|---|---|---|
| 역할 | **교과서** — AI와 개발 **원리** | **실습실** — AI와 함께 **일하는 방법** 체험 |
| 매체 | 장문 Markdown · 정적 다이어그램 · 용어집 | Animation · Interactive diagram · Wiki · Playground · Mission |
| 완료 기준 | “설명할 수 있다” | “시나리오를 한 바퀴 돌리고 증거를 남긴다” |
| 브랜드 | AI Vibe Coding Master | 동일 브랜드 · 제품 라인 **Lab** |

**한 줄 철학:**  
V2는 “AI 사용법 팁 모음”이 아니라, 비개발자가 **AI와 협업하는 작업 방식**을 직관·손·검증으로 익히는 학습 플랫폼이다.

---

# 1. V2 전체 PRD

## 1.1 제품 정의

**제품명 (가칭):** AI Vibe Coding Master — **Lab** (내부 코드명: `v2-lab`)

**한 줄 정의:**  
애니메이션·인터랙티브 다이어그램·시나리오 미션으로, Claude Code / Cursor / Codex / Cline / Gemini CLI / MCP / Agent 등을 **언제·왜·어떻게** 쓰는지 체화하는 실습 플랫폼.

## 1.2 문제

| 문제 | 증거 기반 관찰 |
|---|---|
| V1 텍스트 깊이 | 100강·8섹션 deep archive는 원리에 강하나, 비개발자에게 **첫 체감이 무겁다** (`CURRICULUM-MAP`, 실제 분량). |
| CodingLabV2.md 초안 | 변수/함수 애니 + 브라우저 IDE + 커뮤니티에 치우침 → **AI 도구/에이전트 실습 공백** (파일 본문 확인). |
| 오프라인 성공 패턴 | `vibe-coding-basic-app`은 **수동 단계 제어·도구 표면 시뮬레이션·성공/실패 비교**로 비개발자가 이해 (INTERACTIVE_SYSTEM, CURRICULUM, DESIGN). |
| 이론→도구 단절 | V1에 `ai-coding-tools`·`ai-system-design` 이론이 있으나 **클릭 가능한 루프/권한/컨텍스트 체험**이 없음. |

## 1.3 목표 / 비목표

### 목표 (Outcomes)

1. 학습자가 Agent Loop / Tool Calling / MCP / Context Window를 **애니메이션으로 한 바퀴 설명할 수 있다.**  
2. 동일 미션을 두 도구(예: Cursor vs Claude Code) 관점으로 **선택 기준을 말할 수 있다.**  
3. V1 강의에서 **「실습하기」** 로 Lab 미션에 진입하고, 다시 V1 원리로 복귀할 수 있다.  
4. 진행률·다음 추천이 **Learning Path**로 자동 제시된다.  
5. Wiki 용어 클릭 → 정의 → 관련 Lab/V1 → 공식 문서 링크.

### 비목표 (v1–MVP)

- 클라우드 완전체 호스팅 IDE  
- 유료 모델 API를 기본 경로로 강제하는 Playground (MVP는 **시뮬** 우선)  
- 풀 커뮤니티 포럼 (CodingLabV2.md의 Q&A 전체는 후순위)  
- V1 100강 삭제·대체  

## 1.4 사용자

| 세그먼트 | 니즈 |
|---|---|
| 비개발 PM/운영/디자이너 | 스펙을 에이전트 작업으로 번역·검증 |
| V1 독학자 | 이론 다음 “손” 단계 |
| 오프라인 코호트 수강생 | basic-app 현장 감각의 웹 버전 |
| **비대상 (초기)** | 엔터프라이즈 SSO·컴플라이언스 전문 트랙 (V3+) |

## 1.5 성공 지표

| 지표 | 목표 (출시 후 90일, 방향) |
|---|---|
| Mission 완료율 (시작→성공 증거) | ≥ 40% |
| V1→Lab 전환 CTR (실습하기) | ≥ 15% |
| 평균 세션 내 애니 완료 수 | ≥ 2 |
| “도구 선택 이유” 셀프체크 통과 | ≥ 70% of completers |
| 이탈 (첫 미션 60초) | 모니터링 후 개선 |

## 1.6 CodingLabV2.md 와의 관계 (피벗)

| CodingLabV2.md | V2 Lab PRD |
|---|---|
| 일반 코딩 애니 (변수·함수) | **보조** 트랙만 (V1 development-basics 딥링크) |
| 브라우저 통합 IDE | MVP **제외** 또는 최소 샌드박스; 실 CLI/IDE는 학습자 로컬 |
| 커뮤니티 Q&A 풀스택 | **제외** (이슈/Instagram 유지) |
| 애니메이션 재생 제어 | **채택·강화** (basic-app 수동 단계 원칙과 결합) |
| AI 도구 시나리오 | **핵심 축으로 승격** |

`CodingLabV2.md`는 이력·아이디어 창고로 두고, **본 문서가 V2 범위의 단일 진실(source of truth)** 이다.

---

# 2. 교육 철학

## 2.1 핵심 문장

> **AI를 쓰는 방법**이 아니라 **AI와 함께 일하는 방법**을 가르친다.  
> 완료 기준은 “화면이 나왔다”가 아니라 **검증·설명·선택 근거**다.

## 2.2 네 가지 기둥

1. **See (본다)** — Animation / Interactive diagram  
2. **Touch (만진다)** — 클릭·단계·드래그·토글 권한  
3. **Do (한다)** — 시나리오 미션 (로컬 도구 또는 시뮬)  
4. **Explain (말한다)** — V1 딥링크 + 한 줄 설명 제출  

## 2.3 비개발자가 이해했던 방식 (basic-app 분석)

`D:\vibe-coding-basic-app` 오프라인 스튜디오에서 확인된 원리:

| 원리 | 현장 패턴 | V2 적용 |
|---|---|---|
| **수동 단계** | 시작 전 정지 → 「한 단계 진행」 (v3 ARCHITECTURE, 3회차 원칙) | 모든 핵심 애니 기본값 = 수동 step |
| **증거 표면** | 도구 UI 시뮬레이션이 주인공, 설명은 주석 (DESIGN documentary) | ToolSurface 컴포넌트 |
| **정상/실패** | success·fail·retry 비교 (api-flow, terminal-sim) | 모든 미션에 Happy / Broken path |
| **한 장면 한 증거** | 카드 그리드 남발 금지 | Lab 화면 1 primary canvas |
| **협업 순서** | 찾기→설명→영향→수정→diff→검증 (4회차) | Mission step 템플릿 고정 |
| **은유** | 건축·준공·공사 목록 (3·6회차) | Agent를 “공사 팀” 은유 옵션 |
| **Vibe Loop** | 설계 AI ↔ AI IDE 왕복 (vibe-loop.js) | 플랫폼 시그니처 애니 #1 |
| **저사양** | transform/opacity, Canvas 2D | 동일 성능 원칙 |
| **reduced motion** | prefers-reduced-motion | 필수 |

## 2.4 V1과의 철학 연속

V1이 심은 것: 출처·human review·설명 가능성·구조 언어.  
V2가 더하는 것: 그 언어로 **도구를 고르고 루프를 돌리는 근육**.

---

# 3. V1 → V2 학습 흐름

## 3.1 거시 경로

```
[발견] 공개 사이트 홈 (V1)
   ↓
[원리] V1 모듈 읽기 (Textbook)
   ↓  「실습하기」 CTA
[체화] V2 Lab Mission / Animation
   ↓
[선택] Tool scenario (Claude Code vs Cursor …)
   ↓
[검증] 성공 증거 체크 + 한 줄 설명
   ↓
[복귀] V1 심화 강의 또는 다음 Path 노드
```

## 3.2 모듈 매핑 (V1 13모듈 → Lab 트랙)

| V1 moduleId | Lab Track (V2) | 대표 실습 |
|---|---|---|
| getting-started | T0 Onboarding | Vibe Loop 애니 |
| development-basics | T1 Workspace | File tree + terminal sim |
| web-basics | T1 Workspace | HTTP message 인터랙티브 |
| frontend-frameworks | T1 (light) | 컴포넌트 트리 클릭 |
| git-collaboration | T2 Ship basics | Diff 리뷰 시뮬 |
| data-backend | T2 | API flow 시뮬 |
| deployment-ops | T2 | Deploy visualizer |
| ai-basics | T3 Context | Token window 애니 |
| ai-coding-tools | T4 Tools | 도구 선택 시나리오 |
| ai-system-design | T5 Systems | MCP / Agent / Loop |
| practical-vibe-coding | T6 Mission End-to-End | 요구→구현→검증 미션 |
| explanation-practice | T7 Explain | 설명 루브릭 |
| project-textbook | T6 Capstone missions | 미니 SaaS/챗봇 시나리오 |

## 3.3 「실습하기」 핸드오프 계약

V1 강의 페이지 CTA:

```
/lab/missions/{missionId}?from=v1&lesson={slug}
```

| 파라미터 | 의미 |
|---|---|
| `from=v1` | 복귀 링크 생성 |
| `lesson` | V1 slug — 완료 후 “원리 다시 읽기” |
| `missionId` | Lab 콘텐츠 id |

V1 측 최소 변경 (구현 시): `LessonMeta`에 optional `labMissionId?: string`.

## 3.4 권장 학습 순서 (신규 사용자)

1. V1 orientation 1강  
2. Lab T0 Vibe Loop  
3. V1 files/HTTP 중 택1  
4. Lab T1  
5. V1 AI tools 개요  
6. Lab T4 도구 비교 미션 2개  
7. Lab T5 MCP/Agent  
8. T6 E2E 미션  

---

# 4. 페이지 구조 (IA)

## 4.1 URL 맵 (제안)

| Path | 이름 | 설명 |
|---|---|---|
| `/` | V1 Home | 기존 유지 + Lab 진입 배너 |
| `/lab` | Lab Home | 진행·추천·시그니처 애니 |
| `/lab/path` | Learning Path | 그래프·다음 추천 |
| `/lab/missions` | Mission 목록 | 필터: track/tool/level |
| `/lab/missions/[id]` | Mission 상세 | 단계·증거·시뮬 |
| `/lab/animations` | Animation gallery | 개념별 애니 라이브러리 |
| `/lab/animations/[id]` | Animation player | step 제어 |
| `/lab/diagrams/[id]` | Interactive diagram | 클릭형 도식 |
| `/lab/wiki` | Wiki index | 용어 A–Z / 카테고리 |
| `/lab/wiki/[termId]` | Wiki entry | 정의·관련·공식문서 |
| `/lab/tools` | Tool map | Claude/Cursor/… 지도 |
| `/lab/tools/[toolId]` | Tool scenario hub | 언제/왜/어떻게 |
| `/lab/playground` | Playground hub | 시뮬 목록 |
| `/lab/playground/[id]` | Playground session | prompt/context/agent |
| `/lab/progress` | My progress | local 우선 |
| `/about` 등 | 기존 legal | 공유 |

## 4.2 레이아웃

```
┌─────────────────────────────────────────────┐
│ Brand rail: Master | Lab | Path | Wiki | …  │
├──────────────┬──────────────────────────────┤
│ Secondary    │ Primary canvas               │
│ (steps/wiki) │ (animation / diagram /       │
│              │  mission stage)              │
├──────────────┴──────────────────────────────┤
│ Evidence bar: checklist · explain · next    │
└─────────────────────────────────────────────┘
```

기본-app의 **3단 스튜디오** 감각을 웹에 이식하되, V1의 paper-white + accent blue 브랜드를 Lab에서도 유지 (다크 모드는 애니 스튜디오 옵션).

---

# 5. 기능 명세서 (Feature Spec)

## 5.1 기능 목록

| ID | 기능 | 우선 | 수용 기준 (요약) |
|---|---|---|---|
| F-PATH | Learning Path 엔진 | P0 | 완료 노드 기준 next 1–3 추천; 수동 오버라이드 |
| F-MIS | Mission 런타임 | P0 | 단계 순서 강제 옵션; 성공 증거 전부 체크 전 complete 불가 |
| F-ANI | Animation player | P0 | play/pause/reset/step/speed; keyboard; reduced-motion |
| F-DIAG | Interactive diagram | P0 | 노드 클릭 → 패널 설명; 관련 wiki/mission 링크 |
| F-WIKI | Wiki | P0 | termId 딥링크; V1 glossary 연동 또는 확장 스키마 |
| F-TOOL | Tool scenarios | P0 | 도구별 when/why/how/compare 4블록 |
| F-PLAY | Playground (sim) | P1 | 실 API 없이 상태 머신 시뮬 ≥3종 |
| F-PLAY-LIVE | Live API playground | P2 | 사용자 키 로컬 전용; 서버에 키 미수집 |
| F-V1CTA | V1 실습하기 버튼 | P0 | slug→mission 매핑 테이블 |
| F-PROG | Progress store | P0 | localStorage; 스키마 버전 |
| F-LIB | Animation component library | P0 | 공통 primitives 문서화 |
| F-A11Y | 접근성 | P0 | 키보드, focus, 대체 텍스트, reduced motion |
| F-BRAND | 브랜드 토큰 공유 | P0 | V1 DESIGN tokens 확장 |
| F-I18N | 한국어 우선 | P0 | UI 한국어; 용어 영문 병기 |
| F-ADMIN | 콘텐츠 CMS | P2 | md/json 콘텐츠 파이프라인 (ai-ops 재사용) |

## 5.2 Mission 스키마 (개발 가능 수준)

```ts
type LabMission = {
  id: string
  title: string
  track: "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7"
  level: "S" | "M" | "L"
  estimatedMinutes: number
  tools: ToolId[]
  v1LessonSlugs: string[]          // 선행/연계 교과서
  animationIds: string[]
  diagramIds: string[]
  wikiTermIds: string[]
  goal: string
  scenario: string                 // 언제/왜 스토리
  steps: MissionStep[]
  successEvidence: EvidenceItem[]
  explainPrompt: string
  compareTools?: { a: ToolId; b: ToolId; decisionCriteria: string[] }
}

type MissionStep = {
  id: string
  kind: "watch" | "click" | "simulate" | "local-action" | "explain"
  title: string
  body: string
  animationId?: string
  playgroundId?: string
  hintLevels?: [string, string, string]
}

type EvidenceItem = {
  id: string
  label: string
  kind: "checkbox" | "text" | "screenshot-note" | "command-output-note"
}

type ToolId =
  | "claude-code" | "codex" | "cursor" | "cline"
  | "gemini-cli" | "claude-desktop" | "chatgpt"
  | "github" | "mcp-generic" | "other"
```

## 5.3 Wiki 스키마

```ts
type WikiTerm = {
  id: string                 // "mcp"
  term: string
  aliases: string[]
  shortDefinition: string    // 1문장 비개발자 언어
  explanation: string
  animationId?: string
  diagramId?: string
  relatedMissionIds: string[]
  relatedV1Slugs: string[]
  officialLinks: { title: string; url: string }[]
  category: "foundation" | "tool" | "system" | "ops"
}
```

---

# 6. 컴포넌트 구조

## 6.1 계층

```
packages/ or src/lab/
  ui/                 # buttons, sheets, rails (V1 tokens)
  motion/             # primitives: StepController, Timeline, HighlightBeam
  surfaces/           # ToolSurface, TerminalSurface, ChatSurface, IdeSurface
  diagrams/           # NodeGraph, SequenceFlow, HierarchyTree
  animations/         # composed: VibeLoop, TokenWindow, AgentLoop, McpHost
  wiki/               # TermPopover, TermPage, RelatedRail
  mission/            # MissionShell, StepList, EvidenceBar, ExplainBox
  playground/         # PromptCompare, ContextBudget, PermissionGate
  path/               # PathGraph, NextCard
  progress/           # LabProgressProvider (local)
```

## 6.2 핵심 컴포넌트 책임

| 컴포넌트 | 책임 |
|---|---|
| `StepController` | index, next/prev, reset, speed, reduced-motion bridge |
| `ToolSurface` | 가짜 앱 크롬 + 상태(initial/progress/success/fail) |
| `HighlightBeam` | A→B 흐름 particle/선 (basic-app api-flow 교훈) |
| `TermPopover` | 인라인 용어 → wiki 요약 |
| `MissionShell` | 미션 레이아웃 + V1 복귀 링크 |
| `EvidenceBar` | 완료 게이트 |
| `PathGraph` | 노드 완료/잠금/추천 |

## 6.3 basic-app → Lab 포팅 맵

| basic-app | Lab |
|---|---|
| vibe-loop | `animations/VibeLoop` |
| api-flow | `diagrams/HttpApiFlow` |
| terminal-sim | `surfaces/TerminalSurface` |
| file-tree | `surfaces/FileTreeSurface` |
| deploy-visualizer | `animations/DeployPath` |
| ai-chat-sim | `surfaces/ChatSurface` |
| drag-exercise | `playground/OrderSteps` |
| quiz | `mission/QuickCheck` |
| animation-engine | `motion/StepController` + RAF utils |

---

# 7. 애니메이션 설계

## 7.1 원칙

1. **Animation First:** 추상 개념은 텍스트 전에 30–90초 시각 루프.  
2. **Manual default:** 자동 재생은 명시 버튼; 학습 기본은 step.  
3. **State vocabulary:** idle → armed → running → success | fail → recover.  
4. **Motion tokens:** 150 / 250 / 450ms (basic-app DESIGN 정렬, V1 easing과 조화).  
5. **No decoration without teaching:** 파티클은 데이터 흐름이 있을 때만.

## 7.2 시그니처 애니메이션 카탈로그 (MVP 우선순위)

| ID | 개념 | 스토리보드 (단계) |
|---|---|---|
| `ani-vibe-loop` | Vibe coding loop | 설계AI → 프롬프트 → IDE → 결과 → 검증 → 다시 |
| `ani-token-window` | Context / Token | 블록 채움 → overflow → 축출 → 비용 힌트 |
| `ani-tool-call` | Tool calling | 의도 → tool schema → call → result → answer |
| `ani-agent-loop` | Agent loop | plan → act → observe → update → stop condition |
| `ani-mcp` | MCP | host / client / server · tools vs resources |
| `ani-subagent` | Sub agent | 위임 · 결과 병합 · 권한 경계 |
| `ani-permissions` | Sandbox / 권한 | 요청 → 승인/거부 → 결과 차이 |
| `ani-harness` | Harness | 입력 게이트 · 루프 한도 · 로그 · eval |
| `ani-workflow` | Workflow | 단계 큐 · 실패 분기 · 재시도 |
| `ani-orchestration` | Orchestration | 다중 에이전트 스케줄 |

## 7.3 Animation Library API (설계)

```ts
type AnimStep = {
  id: string
  label: string
  caption: string          // 비개발자 한 줄
  highlight?: string[]     // node ids
  durationMs?: number
}

type AnimationDefinition = {
  id: string
  title: string
  conceptWikiIds: string[]
  steps: AnimStep[]
  failVariant?: AnimStep[]
}
```

`AnimationPlayer`는 definition만 받아 UI 제어를 통일한다.

---

# 8. 인터랙티브 다이어그램 설계

## 8.1 유형

| 유형 | 사용 예 | 인터랙션 |
|---|---|---|
| **Node graph** | MCP host-client-server | 노드 클릭 → 책임 패널 |
| **Sequence** | Tool call timeline | scrub / step |
| **Hierarchy** | Subagent tree | expand/collapse |
| **Compare split** | Cursor vs Claude Code | 토글 하이라이트 차이 |
| **Budget bar** | Context window | 슬라이더로 토큰 배분 |

## 8.2 공통 UX

- 호버: 용어 프리뷰  
- 클릭: 고정 패널 + Wiki 링크  
- “관련 미션” 칩  
- 모바일: 패널 바텀시트  

## 8.3 MVP 다이어그램 5종

1. HTTP request/response anatomy  
2. MCP architecture  
3. Agent loop  
4. Repo file map (Next app)  
5. Deploy path (local → git → host → user)  

---

# 9. AI Tool 학습 구조

## 9.1 도구 카드 템플릿 (시나리오 필수)

모든 도구 페이지는 동일 뼈대:

1. **한 줄 역할**  
2. **언제 쓰는가** (상황 3)  
3. **언제 쓰지 않는가** (안티패턴 3)  
4. **어떻게 시작하는가** (로컬 설치 개요 + 공식 링크)  
5. **비교** (최소 1개 peer tool)  
6. **권한·위험**  
7. **연계 미션 / V1 강의**  
8. **성공 증거 예시**  

## 9.2 도구 맵

| Tool | Lab 초점 |
|---|---|
| ChatGPT / Claude Desktop | 설계·분해·설명 · 코드 비실행 기본 |
| Cursor | IDE 안 편집·멀티파일 · 적용 전 diff |
| Claude Code | CLI 에이전트 · 리포 작업 · 권한 |
| Codex | 구현·리뷰 루프 · 레포 컨텍스트 |
| Cline | IDE 에이전트 변형 · 도구 호출 관찰 |
| Gemini CLI | CLI 대안 · 모델 선택 감각 |
| GitHub | PR · review · Actions 입문 |
| MCP | 도구/리소스 표준 연결 |
| Skills / Workflow / Subagent | 시스템 설계 트랙 |

## 9.3 비교 매트릭스 (교육용 예시 프레임)

| 질문 | Cursor | Claude Code | Codex |
|---|---|---|---|
| 주 표면 | IDE | CLI/에이전트 | 에이전트/코딩 |
| 사람이 보는 것 | diff in editor | 터미널 로그·패치 | 태스크 결과 |
| 고를 때 | UI 중심 수정 | 레포 단위 작업 | 구현 배치·검증 루프 |

(세부 제품 UI는 자주 바뀜 → **능력 단위**로 서술, 스크린샷 최소화.)

---

# 10. Wiki 구조

## 10.1 정보 구조

```
Wiki Home
  ├─ Categories (foundation / tool / system / ops)
  ├─ Search
  └─ Term Page
        ├─ Short definition (plain language)
        ├─ Deeper explanation
        ├─ Animation embed
        ├─ Related missions
        ├─ Related V1 lessons
        └─ Official docs
```

## 10.2 V1 glossary 연계

- **Phase A:** V1 `GLOSSARY_TERMS`를 Lab Wiki 소스로 import (id slugify).  
- **Phase B:** Lab 전용 필드(animationId, missionIds) 확장 테이블.  
- 인라인: Lab 본문 `[[mcp]]` 또는 `<Term id="mcp" />`.

## 10.3 클릭 플로우

```
본문 "MCP" 칩 클릭
  → TermPopover (2초 읽기)
  → "자세히" → /lab/wiki/mcp
  → "애니로 보기" → ani-mcp
  → "미션" → mission mcp-connect
  → "V1 강의" → /lessons/mcp-architecture-basics
```

---

# 11. Playground 구조

## 11.1 원칙

| 모드 | 설명 | 단계 |
|---|---|---|
| **Sim Playground (default)** | 상태 머신·가짜 툴 결과 · API 키 불필요 | MVP |
| **Local BYOK** | 사용자 브라우저에서만 키 사용 · 서버 미전송 | P2 |
| **Server proxy** | 운영 비용·정책 필요 | V3 검토 |

## 11.2 MVP Playground 3종

| ID | 이름 | 학습 목표 |
|---|---|---|
| `pg-prompt-compare` | 프롬프트 A/B | 모호 vs 제약·검증 포함 |
| `pg-context-budget` | 컨텍스트 예산 | 파일 선택 → 윈도 초과 시각화 |
| `pg-agent-permissions` | 권한 게이트 | 위험 툴 호출 승인/거부 결과 차이 |

## 11.3 비기능

- 시크릿 입력 UI 금지 (MVP)  
- 모든 시뮬 결과에 “이것은 시뮬레이션” 배지  
- 로그 패널에 **evidence packet** 형식 (method/path 등 V1 언어 재사용)

---

# 12. Learning Path

## 12.1 엔진 규칙

```
nextCandidates =
  unlockable missions whose prerequisites ⊆ completed
  sort by (track order, level, estimatedMinutes)
  take 3
```

## 12.2 노드 상태

`locked | available | in_progress | completed | skipped`

## 12.3 추천 카피

- “다음 10분: Token Window 애니”  
- “막히면 V1: tokenization-and-context”  
- “도구 선택 미션 잠금 해제까지 1개 남음”

## 12.4 데이터

로컬:

```ts
type LabProgress = {
  version: 1
  completedMissions: string[]
  completedAnimations: string[]
  wikiOpened: string[]
  lastMissionId?: string
}
```

계정 동기화는 V3.

---

# 13. 로드맵

| Phase | 이름 | 기간( ind. 가이드) | 산출 |
|---|---|---|---|
| **P0** | Design freeze | 본 문서 | PRD 합의 |
| **P1** | Foundation | 2–3주 | monorepo/lab 라우트, tokens, StepController, Progress |
| **P2** | MVP Lab | 4–6주 | 미션 12 + 애니 6 + Wiki + V1 CTA + Path |
| **P3** | Tools depth | 3–4주 | 도구 시나리오 전체 + compare |
| **P4** | Playground+ | 3주 | playground 3→6, 힌트 시스템 |
| **P5** | Polish | 2주 | a11y, perf, content refresh 파이프라인 |
| **V3** | Ecosystem | — | §17 |

---

# 14. 개발 우선순위

## 14.1 순서 (의존성)

1. Design tokens + Lab shell layout  
2. `StepController` + 1 signature animation (`ani-vibe-loop`)  
3. Mission schema + 3 missions wired  
4. Wiki term page + popover  
5. V1 `labMissionId` + 실습하기 버튼 (소수 강의 파일럿)  
6. Path next-card  
7. MCP + Agent loop anim  
8. Tool hub pages (Cursor, Claude Code, Codex)  
9. Playground sim ×3  
10. Content scale (missions 12→30)

## 14.2 운영 파이프라인

V1 `ai-ops` 패턴 재사용:

- Lab 콘텐츠도 KB 인용 규칙(Mode B) 적용  
- 미션/애니 id 백로그  
- `npm run verify` 확장: lab schema tests  

---

# 15. MVP 정의

## 15.1 MVP에 포함

| 포함 | 상세 |
|---|---|
| Lab Home | 추천 1 + 시그니처 애니 |
| Animations | 6종 (vibe-loop, token-window, tool-call, agent-loop, mcp, permissions) |
| Diagrams | 3종 (HTTP, MCP, Agent) |
| Missions | 12 (T0–T5 중심) |
| Wiki | ≥ 40 terms (V1 용어 재사용 + Lab 시스템 용어) |
| Tools | 5 hubs: Cursor, Claude Code, Codex, ChatGPT/Desktop, GitHub |
| Playground | 3 sim |
| V1 link | 파일럿 20개 강의에 실습하기 |
| Progress | localStorage |
| A11y baseline | keyboard steps, focus, reduced-motion |

## 15.2 MVP 제외

- 실모델 API 기본 경로  
- 브라우저 full IDE  
- 커뮤니티/댓글/강사 대시보드  
- 계정  
- 다국어  
- Electron 포팅 (basic-app은 **참고만**)  

## 15.3 MVP 출시 체크

- [ ] 신규 사용자가 가이드 없이 T0 완료  
- [ ] V1 orientation → Lab → V1 복귀 루프  
- [ ] 모바일에서 Mission 단계 완주  
- [ ] verify + lab schema tests green  

---

# 16. V2 아키텍처

## 16.1 배치 옵션

| 옵션 | 설명 | 권고 |
|---|---|---|
| A. V1 모노리스에 `/lab` | 같은 Next 앱, 라우트 분리 | **MVP 권고** (브랜드·배포 단순) |
| B. `apps/lab` monorepo | 패키지 공유 | 규모 확대 시 |
| C. 완전 별도 배포 | 도메인 lab. | 브랜드 분열 위험 |

## 16.2 논리 아키텍처

```
                  ┌──────────── V1 Textbook ────────────┐
                  │ content/lessons + curriculum + wiki │
                  └───────────────┬────────────────────┘
                                  │ labMissionId / deep links
                  ┌───────────────▼────────────────────┐
                  │           Lab App Shell              │
                  │  Path │ Mission │ Wiki │ Playground  │
                  └───────┬──────────┬─────────┬────────┘
                          │          │         │
              Animation   │   Diagram│  Sim    │ Progress
              Library     │   Engine │ Runtime │ (local)
                          │          │         │
                  ┌───────▼──────────▼─────────▼────────┐
                  │     Shared Design Tokens (V1+)        │
                  └──────────────────────────────────────┘
```

## 16.3 기술 스택 (제안)

| 층 | 선택 | 이유 |
|---|---|---|
| Framework | Next.js (V1과 동일) | 정적 export 가능 여부 재평가; Lab은 client interactivity 多 → **hybrid 또는 Node 호스팅** 검토 |
| UI | React 19 + Tailwind tokens | V1 정렬 |
| Motion | CSS + optional Motion One/Framer **소수** | 번들 신중 |
| Content | MD/MDX + zod schema | ai-ops 친화 |
| State | localStorage → 이후 sync | MVP 단순 |
| Test | Vitest + schema tests + playwright smoke | basic-app smoke 문화 |

**확인 필요:** V1이 `output: "export"` 고정이므로, Lab 고도화 시 (1) 별도 서버 타깃 또는 (2) client-only Lab with static hosting 한계를 구현 kickoff 때 결정.

## 16.4 폴더 구조 (모노리스 시)

```
src/
  app/
    lab/
      page.tsx
      path/page.tsx
      missions/...
      animations/...
      wiki/...
      tools/...
      playground/...
  lab/
    components/...
    content/missions/*.json
    content/animations/*.json
    content/wiki-ext/*.json
    lib/path-engine.ts
    lib/progress.ts
  content/          # V1 유지
```

## 16.5 보안·프라이버시

- MVP: 서버 수집 없음 (V1 Privacy 연장)  
- BYOK 시: 키는 memory only, localStorage 저장 금지 기본  
- 시뮬 배지로 환각 기대 관리  

---

# 17. V3까지의 확장 전략

```
V1 Textbook (done, public)
    ↓
V2 Lab (this PRD) — 개인 실습 · 시뮬 · 도구 시나리오
    ↓
V3 Tracks
    ├─ Agent Professional (싱글 에이전트 심화 · eval · harness)
    ├─ Workflow & Orchestration (멀티스텝 · 서브에이전트 · 관측)
    ├─ AI Company (팀 역할 · 리뷰 문화 · 비용 · 거버넌스)
    └─ Offline Studio Bridge (optional): basic-app 현장 모드 연동
```

| V3 요소 | 의존 |
|---|---|
| 계정·코호트 대시보드 | V2 progress 스키마 안정 |
| Live playground 운영 | 비용·약관·키 정책 |
| 강사 모드 | basic-app presenter HUD 이식 |
| 인증서/수료 | Mission rubric 자동화 |
| B2B | AI Company 트랙 |

---

# 부록 A — 브랜드 시스템 (V1↔V2)

| 요소 | 규칙 |
|---|---|
| 이름 | Master = 교과서, Lab = 실습 (한 사이트 내비) |
| 컬러 | V1 accent blue 유지; Lab 애니 화면만 optional charcoal studio |
| 로고 | “AI” 마크 공유; Lab은 작은 flask/loop 배지 |
| 톤 | 차분한 책상(V1) + 증거 중심 워크숍(V2) |
| 카피 | “사용법” 대신 “협업·검증·선택” |

UI 레퍼런스 (감성만): Apple (여백·타이포), Linear (밀도·키보드), Raycast (커맨드·속도), Arc (공간·재미) — **복제 금지**, 모션 절제.

---

# 부록 B — MVP 미션 12 초안

| # | id | track | 제목 |
|---|---|---|---|
| 1 | `m-vibe-loop` | T0 | 바이브 루프 한 바퀴 |
| 2 | `m-token-window` | T3 | 컨텍스트 창이 넘칠 때 |
| 3 | `m-http-packet` | T1 | 요청 증거 패킷 읽기 |
| 4 | `m-file-map` | T1 | 파일이 화면에 닿는 길 |
| 5 | `m-git-diff-review` | T2 | AI diff 위험 표시 |
| 6 | `m-tool-pick` | T4 | Cursor vs Claude Code 고르기 |
| 7 | `m-permissions` | T4 | 위험 도구 승인/거부 |
| 8 | `m-tool-call` | T5 | 툴 콜 한 사이클 |
| 9 | `m-mcp-map` | T5 | Host·Client·Server 구분 |
| 10 | `m-agent-stop` | T5 | 루프 종료 조건 만들기 |
| 11 | `m-prompt-contract` | T6 | 요청을 작업 계약으로 |
| 12 | `m-explain-ship` | T7 | 5분 설명 + 증거 |

---

# 부록 C — V1 파일럿 CTA 매핑 예시

| V1 slug | labMissionId |
|---|---|
| ai-vibe-coding-orientation | m-vibe-loop |
| files-folders-and-paths | m-file-map |
| http-request-response | m-http-packet |
| tokenization-and-context | m-token-window |
| mcp-architecture-basics | m-mcp-map |
| agent-loop-anatomy | m-agent-stop |
| codex-claude-cursor-comparison | m-tool-pick |
| tool-permissions-sandboxes | m-permissions |
| prompt-to-implementation-loop | m-prompt-contract |

---

# 부록 D — 근거 스냅샷 (설계 시점)

| 소스 | 확인 사실 |
|---|---|
| V1 curriculum | 13 modules, 100 lessons |
| V1 public | Batch2 → ju0o-ec967.web.app |
| CodingLabV2.md | 애니+IDE+커뮤니티 초안, AI 도구 실습 약함 |
| basic-app | sims: vibe-loop, api-flow, terminal, file-tree, deploy, ai-chat, quiz, drag; engines; 6주 커리큘럼; 수동 단계 원칙 |

---

# 부록 E — 다음 실행 한 줄

**Design 승인 후 첫 구현 스프린트:**  
`/lab` 라우트 + `StepController` + `ani-vibe-loop` + mission `m-vibe-loop` + V1 orientation「실습하기」.

---

*본 문서는 구현이 아닌 설계 산출물이다. CodingLabV2.md 범위는 본 PRD로 피벗·대체한다.*
