# AI Engineering Atlas — Education Layer 기획서 (SSOT)

| | |
|---|---|
| 날짜 | 2026-07-12 (운영자 방향 지시) |
| 상태 | **현행 단일 정본** — Lab PRD(V2-PLATFORM-PRD.md)는 보류·아이디어 보관 |
| 원칙 | **리빌드 금지.** 기존 AI-Ops(Agent·Workflow·KB·Executor·QA·Dashboard)와 100강·용어집·다이어그램을 그대로 유지하고, 그 위에 Education Layer만 추가한다 (Evolution, not Rebuild) |

## 0. 에이전트 읽기 규약 (토큰 낭비 방지)

- **작업 시작 시 읽는 것 = 본 문서 + `ai-ops/STATE.md`의 NEXT 블록. 끝.**
- 기존 파이프라인 규칙이 필요하면 해당 프롬프트 파일 1개만(P-01~P-08). ORCHESTRATION-PLAN·CODEX-PLAN·MASTER-PLAN 등 V1 운영 문서는 **완결·동결 — 열지 말 것**.
- 인용 규칙 = 모드 B(짧은 인용 ≤3블록/문서, 출처 링크 필수) — `qa/CITATION-POLICY.md` §1만 참조.
- 기존 강의/용어/KB 내용 확인은 Grep으로 해당 파일만. 전체 읽기 금지.

## 1. 한 줄 정의

현재 사이트(용어를 "찾아보는" Wiki형 교과서)에 **Atlas Layer**를 추가해, 사용자가 AI Engineering의 발전사를 **하나의 스토리**로 통과하게 한다:

```
AI → LLM → Prompt → Context → Memory → Tool → MCP
→ Agent → Workflow → Orchestration → Harness → Production AI
```

각 노드의 학습 목표는 용어 암기가 아니라 세 질문이다:
**① 왜 등장했나(이전 기술의 어떤 한계가)** · **② 무엇을 해결했나** · **③ 왜 이것만으로 부족해 다음이 필요했나 + 지금 산업은 어디까지 왔나**.

## 2. 무엇을 만들지 않는가 (불변)

- 기존 `ai-ops/` 구조(agents·workflows·knowledge-base·executors·qa·DASHBOARD) — **무수정**
- 기존 100강 markdown·curriculum.ts·glossary.ts·다이어그램 — **무수정** (Atlas가 참조만)
- 새 리포지토리·새 앱·별도 배포 — 없음 (같은 Next 정적 export, 같은 Firebase)
- Lab PRD의 IDE/Playground/미션 런타임 — 이번 범위 아님

## 3. Education Layer 구조

### 3.1 데이터 (신규 파일 2종만)

| 파일 | 역할 |
|---|---|
| `src/content/atlas.ts` | 12노드 타입·순서·기존 자산 매핑(강의 slug·용어·KB id)·산업 현황 한 줄. **연결의 SSOT** |
| `src/content/atlas/{nodeId}.md` | 노드 내러티브(Atlas Chapter 형식, §3.3). 12편 |

```ts
type AtlasNode = {
  id: string            // "llm", "mcp" …
  order: number         // 1~12
  title: string         // "LLM — 언어가 인터페이스가 되다"
  era: string           // 대략적 시기 표기 ("~2017 이전", "2018–2020" 등, KB 근거)
  question: string      // 이 노드가 답하는 "왜" 한 문장
  limitationOfPrevious: string  // 이전 노드의 한계 한 문장 (스토리 연결선)
  breakthrough: string  // 돌파구 한 문장
  industryNow: string   // 현재 산업 위치 한 문장 (KB 근거)
  lessonSlugs: string[] // 기존 강의 딥링크 (심화)
  glossaryTerms: string[]
  kbIds: string[]       // 인용 근거
  diagramRefs?: string[] // 기존 SVG 재사용
}
```

### 3.2 12노드 ↔ 기존 자산 매핑 (커버리지 실측 2026-07-12)

| # | 노드 | 기존 강의(심화 딥링크) | 상태 |
|---|---|---|---|
| 1 | AI | ai-vibe-coding-orientation · ai-era-timeline · learning-with-ai-verification | 서사 KB 보강 △ |
| 2 | LLM | tokenization-and-context · model-selection-tradeoffs | **신규 KB 1건**(LLM 등장·스케일링) |
| 3 | Prompt | prompt-engineering-foundations · from-prompt-to-system | ✅ |
| 4 | Context | context-engineering-basics · explain-context-and-rag · tokenization-and-context | ✅ |
| 5 | Memory | context-window-and-memory · context-caching-and-state | ✅ |
| 6 | Tool | tool-calling-basics | ✅ |
| 7 | MCP | mcp-architecture-basics · explain-tool-agent-mcp · mcp-enabled-tool-project | ✅ |
| 8 | Agent | agent-loop-anatomy · explain-tool-agent-mcp | ✅ |
| 9 | Workflow | ai-workflow-design · automation-workflow-project | ✅ |
| 10 | Orchestration | multi-agent-orchestration · subagents-and-delegation | ✅ |
| 11 | Harness | harness-engineering-basics · loop-engineering-basics | ✅ |
| 12 | Production AI | ai-system-evaluation · monitoring-errors-rollbacks · deployment-checklist-playbook · production-env-and-secrets | ✅ |

→ **콘텐츠 신규 생산은 최소**: 노드 내러티브 12편(짧음) + KB 1~2건(AI/LLM 역사)뿐. 나머지는 전부 기존 자산의 재조합.

### 3.3 Atlas Chapter 형식 (노드 내러티브 — V2 강의형식과 다름, 의도적으로 짧게)

각 `atlas/{nodeId}.md`는 **5섹션 · 2,500~4,000자** (스토리 리듬 우선, 백과사전화 금지):

1. `## 이전 세계의 한계` — 직전 노드만으로 안 됐던 구체적 문제
2. `## 돌파구` — 무엇이 등장했고 무엇이 달라졌나 (짧은 인용 1~2, 모드 B)
3. `## 원리 한 장` — 기존 다이어그램 참조 또는 3문장 요약 + 심화는 기존 강의 딥링크
4. `## 그래도 남은 문제` — 다음 노드가 필요해지는 이유 (다음 장 예고)
5. `## 지금 산업은` — 현재 위치 2~3문장 (KB 근거, 추측 금지)

### 3.4 UI (신규 라우트 2개, 기존 페이지 무수정 + 내비 링크 1개만 추가)

| 라우트 | 내용 |
|---|---|
| `/atlas` | **저니 맵**: 12노드 세로 타임라인(모바일)/가로 흐름(데스크톱). 노드 카드 = 시기·질문·완료체크. 연결선에 "한계→돌파" 마이크로카피. 진행률 localStorage(기존 LearningStateProvider 패턴 재사용) |
| `/atlas/[nodeId]` | Chapter 뷰: 5섹션 내러티브 + 이전/다음 노드 내비 + "원리 깊이 보기"(기존 강의 링크) + 관련 용어 칩(기존 glossary 링크) |

인터랙션 수준: CSS transition + 클릭 확장 (Lab PRD의 애니메이션 엔진 아님 — 정적 export 유지).
헤더에 "Atlas" 메뉴 1개 추가, 홈에 진입 배너 1개 — 기존 페이지 변경은 이 두 곳뿐.

## 4. 파이프라인·워크플로 (기존 그대로 재사용)

- **동일 파이프라인**: P-01(KB)→P-02(검증)→P-04(Chapter 생성)→P-05(통합)→verify→P-08→P-09. 상태 전이는 `STATE.md` NEXT 블록 그대로.
- **역할**: Fable = 설계·P-02·QA·릴리스 판정·배포 / Codex = Chapter 대량 생산·UI 구현 미션(발급 시). 소규모는 Fable 대행 가능 — V1과 동일.
- **QA 게이트**: verify exit 0 · 인용 모드 B(챕터당 ≤3블록, KB Quote Bank 글자 일치) · era/industryNow 문장은 KB 근거 필수(추측 금지 — CONTENT-REFRESH 원칙 승계).
- **커밋 규율**: "ATLAS-Px: 요약". 배포는 세션 말미 Fable.

## 5. 단계 (작게, 순서대로)

| Phase | 산출 | 게이트 |
|---|---|---|
| **A0** | 본 기획서 + `atlas.ts` 12노드 스켈레톤(매핑 완결, 내러티브 없이 컴파일) | verify exit 0 |
| **A1** | `/atlas` 저니 맵 + `/atlas/[nodeId]` 뼈대(스켈레톤 데이터 렌더) + 헤더 메뉴 | verify + 육안 |
| **A2** | KB 1~2건(AI·LLM 역사) P-01/P-02 + Chapter 12편 P-04/P-05 | 인용 QA + verify |
| **A3** | 진행률·연결선 마이크로카피·홈 배너 + 모바일 점검 | verify + 라이브 확인 |
| **A4** | 배포 + sitemap 자동 반영 확인 | 라이브 스팟체크 |

## 6. 완료 기준

- 신규 사용자가 `/atlas`에서 12노드를 순서대로 읽고 "MCP가 왜 나왔는지"를 이전·다음 노드와 연결해 말할 수 있다
- 모든 챕터가 기존 강의로 딥링크되고, 기존 강의·용어집·KB는 단 한 글자도 바뀌지 않았다
- verify exit 0 · 모드 B 인용 준수 · 라이브 배포
