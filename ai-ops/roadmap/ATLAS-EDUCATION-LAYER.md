# AI Engineering Atlas V2 PRD

| 항목 | 내용 |
|---|---|
| 문서 상태 | **APPROVED — Education Layer PRD 운영자 승인 완료** |
| 작성 기준일 | 2026-07-13 |
| 승인 범위 | 본 Education Layer PRD(21 Concept · 14섹션 · Phase 0~12 전략). 하위 Feature Spec·소스 구현은 별도 승인 |
| 제품 방향 | **Evolution, not Rebuild** |
| 제품 정의 | 기존 AI-Ops Architecture 위에 Education Layer를 추가한 인터랙티브 AI 엔지니어링 학습 플랫폼 |
| 핵심 사용자 | AI Engineering을 체계적으로 이해하고 싶은 비개발자·초보 개발자 |
| 구현 상태 | PRD 승인 완료. Model Routing Feature Spec 승인 완료. **소스·콘텐츠 본문 구현은 미착수.** |

> 정본 결정: Atlas의 학습 흐름은 **21개 핵심 개념**, 모든 챕터는 **14개 공통 섹션**을 사용한다. 기존 12노드 데이터 스켈레톤과 13섹션 구현 계획([ATLAS-BUILD-PLAN.md](ATLAS-BUILD-PLAN.md))은 **HOLD**이며, 승인된 본 PRD를 기준으로 별도 Phase에서 안전하게 재기준화한다.

> **하위 Feature Spec:** Model Routing Learning Route 세부 설계는 [ATLAS-MODEL-ROUTING-FEATURE-SPEC.md](ATLAS-MODEL-ROUTING-FEATURE-SPEC.md)에 둔다. 이 Learning Route는 **기존 21개 Concept와 14섹션 계약을 변경하지 않는다.** Feature Spec은 **승인 완료(MR-0)**이며, 소스·콘텐츠 구현은 **MR-1 이후 Phase 승인 전 시작하지 않는다.**

---

# 1. 현재 프로젝트 분석

## 1.1 제품 자산 실측

현재 프로젝트는 이미 완성도 높은 교재 시스템과 콘텐츠 운영 시스템을 함께 갖고 있다.

| 영역 | 현재 자산 | 판단 |
|---|---|---|
| 프레임워크 | Next.js 16.2.10, React 19.2.7, TypeScript 6, Tailwind CSS 4 | 정적 교육 플랫폼에 충분하다. 프레임워크 교체가 필요하지 않다. |
| 콘텐츠 | 13개 모듈, 100개 강의 Markdown, 456개 용어, 78개 SVG 다이어그램 | Atlas가 새로 만들기보다 연결해야 할 핵심 자산이다. |
| 근거 체계 | approved KB 90건, Quote Bank, source checked, Knowledge Score | 서사·연표·기업·서비스 정보의 신뢰 기반으로 재사용할 수 있다. |
| 읽기 UX | 8섹션 Deep Dive, 목차, 읽기 진행 바, 이전/다음, 관련 강의, 북마크 | 깊이 학습 층으로 유지한다. |
| 탐색 | 커리큘럼 아코디언, 강의·용어·자료 통합 검색, 용어 필터 | lookup은 강하지만 개념의 발생 순서와 인과 관계는 보이지 않는다. |
| 진행률 | localStorage 기반 완료·체크리스트·북마크·마지막 읽기 | 계정 없이 동작하는 좋은 기반이나 Atlas 여정 상태가 없다. |
| 배포 | Next.js static export, Firebase Hosting, sitemap, verify 게이트 | V2에서도 유지한다. 서버를 전제로 한 기능은 MVP 범위에서 제외한다. |
| 디자인 | 종이색 표면·그래파이트·명확한 블루, 다크 모드, 반응형 | 기존 디자인 토큰을 확장하고 재사용한다. |

## 1.2 운영 자산 실측

`ai-ops/`는 단순 문서 모음이 아니라 콘텐츠 생산 운영체제다.

- Agent: research, source collection, fact check, lesson writing, quiz, illustration, terminology, education review, QA, integration, release 역할이 이미 분리되어 있다.
- Workflow: P-01 수집부터 P-09 배포까지 상태 전이와 품질 게이트가 정의되어 있다.
- Knowledge Base: 출처·확인일·점수·소비자를 추적할 수 있다.
- QA: 형식, 인용, 링크, 다이어그램, 용어 무결성을 기계 검사한다.
- Dashboard/State: 작업의 현재 상태와 다음 실행자를 기록한다.

이 구조는 Atlas를 만드는 기반이며 대체 대상이 아니다. Atlas 콘텐츠도 같은 수집→검증→생성→통합→검증→릴리스 파이프라인을 통과해야 한다.

## 1.3 현재 사용자 경험의 강점과 한계

| 강점 | 현재 한계 |
|---|---|
| 개별 강의가 깊고 출처가 명확하다. | 처음 온 사용자는 무엇부터 왜 읽어야 하는지 알기 어렵다. |
| 용어를 검색하면 빠르게 정의를 찾을 수 있다. | 검색할 용어를 이미 아는 사용자에게 유리하다. |
| 관련 강의와 이전/다음 이동이 있다. | 기술 A의 한계가 기술 B를 낳았다는 인과 관계는 약하다. |
| 다이어그램이 많다. | 대부분 정적이며 단계별 관찰·조작이 어렵다. |
| 강의 진행률이 저장된다. | 전체 AI Engineering 여정에서 현재 위치를 보여주지 못한다. |
| 운영 파이프라인이 엄격하다. | `STATE.md`와 `MASTER_PROGRESS.md` 일부 집계가 95/100과 100/100으로 어긋나는 상태 드리프트가 있다. |

## 1.4 핵심 진단

현재 프로젝트에 부족한 것은 콘텐츠 양이 아니다. 부족한 것은 다음 네 가지 연결이다.

1. **인과 연결**: 왜 다음 기술이 필요해졌는가.
2. **관계 연결**: 어떤 기술이 어떤 기술을 사용·보완·평가하는가.
3. **시간 연결**: 언제 어떤 전환이 일어났는가.
4. **행동 연결**: 읽은 개념을 어떻게 직접 관찰하고 설명하는가.

따라서 V2는 기존 Wiki와 Textbook 사이에 Story·Map·Time·Practice를 제공하는 Education Layer를 추가해야 한다.

---

# 2. 유지해야 하는 구조

## 2.1 불변 구조

1. `ai-ops/agents`, P-01~P-09, Knowledge Score, Citation Rule, QA·release 구조를 유지한다.
2. `src/content/lessons/markdown`, `curriculum.ts`, `glossary.ts`, 기존 다이어그램을 Atlas의 원료로 사용한다.
3. 기존 `/curriculum`, `/lessons/[slug]`, `/glossary`, `/resources` URL과 사용자 흐름을 보존한다.
4. Next.js static export와 Firebase Hosting을 유지한다.
5. 계정 없이 localStorage에 진행률을 저장하는 기본 방침을 유지한다.
6. 라이트/다크 모드, 모바일 반응형, 키보드 접근성, reduced motion을 유지한다.
7. 공식 출처 중심, Quote Bank 일치, KB Score 80+라는 콘텐츠 품질 기준을 유지한다.

## 2.2 유지 이유

- 100개 강의는 Atlas보다 더 깊은 설명을 담당하는 검증된 Depth Layer다.
- 456개 용어는 Atlas의 Concept Index이자 검색 진입점이다.
- KB는 기업·서비스·역사처럼 변하기 쉬운 사실을 검증하는 Evidence Layer다.
- 정적 export와 localStorage는 비용·보안·개인정보 부담을 낮춘다.
- 기존 콘텐츠 파이프라인은 Atlas가 단순한 시각 데모로 변질되는 것을 막는다.

---

# 3. 개선해야 하는 구조

## 3.1 데이터 구조

- 현재 강의·용어·KB 관계를 화면마다 다시 해석하지 않고, 빌드 시점에 파생되는 `AtlasIndex`로 통합한다.
- 12노드 초기 스켈레톤을 21개 정본 개념 노드로 확장한다.
- 챕터, 관계, 타임라인, 애니메이션, 플레이그라운드, 퀴즈를 각각 별도 데이터로 관리하되 `conceptId`로 결합한다.
- 콘텐츠 스키마는 Zod 또는 현재 프로젝트의 타입 검증 패턴으로 빌드 시 검증한다.

## 3.2 진행률 구조

별도 Provider를 여러 개 만드는 대신 기존 `LearningStateProvider`를 하위 호환으로 확장한다.

```ts
type LearningStateV2 = {
  version: 2
  completedLessons: string[]
  checklistItems: Record<string, string[]>
  bookmarks: string[]
  lastReadLessonSlug?: string
  atlas: {
    concepts: Record<string, {
      visited: boolean
      chapterRead: boolean
      quizBestScore: number
      practiceDone: boolean
      teachBackDone: boolean
    }>
    lastConceptId?: string
    completedPlaygrounds: string[]
  }
}
```

기존 저장값은 마이그레이션 함수가 V2로 승격하며, 실패하면 기존 강의 기록을 잃지 않는 방향으로 복구한다.

## 3.3 검색 구조

현재 `lesson | glossary | resource` 검색 종류에 `concept | timeline | playground`를 추가한다. 검색 결과는 단순 일치 목록이 아니라 다음 질문에 답해야 한다.

- 이 개념의 한 줄 정의는 무엇인가.
- Atlas의 몇 번째 위치인가.
- 왜 등장했는가.
- 깊게 읽을 기존 강의는 무엇인가.

## 3.4 운영 구조

- Atlas 항목도 `MASTER_PROGRESS`에 KB·chapter·interaction·QA 상태를 별도 열로 추적한다.
- `STATE.md`, `DASHBOARD.md`, `MASTER_PROGRESS.md`의 집계는 한 스크립트가 생성하거나 검증하도록 하여 상태 드리프트를 막는다.
- 현재 미커밋 Phase 1 코드는 폐기하지 않되, 본 PRD 승인 전에는 승인된 구현으로 간주하지 않는다.

---

# 4. Education Layer 설계

## 4.1 계층 구조

```text
Experience Layer
  Journey · Chapter · Graph · Timeline · Playground · Quiz · Progress

Education Composition Layer
  Concept Map · Why Bridge · Story Flow · Learning Recommendation

Content Layer (기존)
  100 Lessons · 456 Glossary Terms · 78 Diagrams · Resources

Evidence Layer (기존)
  90 Approved KBs · Quote Bank · Sources · Checked Dates

Operations Layer (기존)
  Agents · Executors · Workflow P-01~P-09 · QA · Dashboard
```

## 4.2 21개 정본 개념 흐름

```text
AI
→ Machine Learning
→ Deep Learning
→ Generative AI
→ LLM
→ Prompt Engineering
→ Context Engineering
→ Memory
→ Knowledge
→ Embedding
→ RAG
→ Tool Calling
→ MCP
→ Skill
→ Agent
→ SubAgent
→ Workflow
→ Orchestration
→ Evaluation
→ Harness
→ Production AI
```

## 4.3 6개 학습 Arc

| Arc | 개념 | 핵심 질문 |
|---|---|---|
| 1. Intelligence | AI → ML → Deep Learning | 규칙을 쓰는 대신 어떻게 학습하게 되었는가? |
| 2. Generation | Generative AI → LLM | 분류·예측을 넘어 어떻게 생성과 대화가 가능해졌는가? |
| 3. Grounding | Prompt → Context → Memory → Knowledge → Embedding → RAG | 모델이 우리의 목표·상태·자료를 어떻게 다루는가? |
| 4. Action | Tool Calling → MCP → Skill | 모델이 어떻게 행동하고, 연결을 표준화하고, 재사용 능력을 갖는가? |
| 5. Agency | Agent → SubAgent → Workflow → Orchestration | 한 번의 호출이 어떻게 반복·위임·조정되는 시스템이 되는가? |
| 6. Reliability | Evaluation → Harness → Production AI | 동작하는 데모를 어떻게 믿고 운영하는 제품으로 만드는가? |

## 4.4 모든 챕터의 14개 공통 섹션

| # | 섹션 | 작성 규칙 |
|---|---|---|
| 1 | 한 줄 정의 | 비개발자 언어 1~2문장 |
| 2 | 왜 등장했는가 | 시대적·기술적 필요를 KB 근거로 설명 |
| 3 | 이전 기술의 한계 | 직전 개념의 부족함과 연결 |
| 4 | 무엇을 해결했는가 | 핵심 돌파구와 작동 원리 요약 |
| 5 | 실제 사례 | 검증 가능한 사례 1~3개 |
| 6 | 대표 기업 | 역사적 기여와 현재 채택을 구분, 공식 근거 필수 |
| 7 | 대표 서비스 | 제품·서비스 역할과 공식 링크, 단순 홍보 금지 |
| 8 | 실제 프로젝트에서는 어떻게 사용하는가 | 시스템 안의 위치, 입력·출력·실패 지점 설명 |
| 9 | 인터랙티브 애니메이션 | 시간 순서나 상태 변화를 단계별로 관찰 |
| 10 | 인터랙티브 다이어그램 | 구성 요소·경계·관계를 직접 선택·탐색 |
| 11 | 실습 | 무료·로컬·시뮬레이션 우선, 셀프체크 포함 |
| 12 | 퀴즈 | 암기보다 인과·판단·오해 교정 확인 |
| 13 | 관련 기술 | 그래프 관계와 기존 강의·용어 딥링크 |
| 14 | 다음 기술 | 아직 남은 문제를 제시하고 다음 개념으로 이동 |

## 4.5 추가 학습 장치

- **Concept Passport**: 정의, 시대, 이전 한계, 해결, 현재 위치를 한 화면에 요약한다.
- **Why Bridge**: 노드 사이 연결선 자체가 “A의 한계 때문에 B가 필요했다”는 문장이 된다.
- **Misconception Radar**: 자주 혼동하는 인접 개념을 2열 비교한다.
- **Teach-back Checkpoint**: 사용자가 60초 설명을 작성하고 핵심 체크포인트로 스스로 평가한다.
- **Evidence Drawer**: 기업·서비스·역사 문장의 근거와 확인일을 즉시 볼 수 있다.

---

# 5. 새로운 IA (Information Architecture)

```text
/
├─ /atlas                         AI Engineering Atlas 홈
│  ├─ /atlas/journey             21개 개념 학습 로드맵
│  ├─ /atlas/concepts/[conceptId] 14섹션 개념 챕터
│  ├─ /atlas/graph               지식 그래프
│  ├─ /atlas/timeline            AI 발전 타임라인
│  ├─ /atlas/playgrounds         실습·시뮬레이션 목록
│  │  └─ /atlas/playgrounds/[id]
│  └─ /atlas/progress            Atlas 진행·복습·Teach-back
├─ /curriculum                   기존 13모듈·100강
├─ /lessons/[slug]               기존 Deep Dive
├─ /glossary                     기존 용어집 + Atlas 연결
├─ /resources                    기존 공식 문서
└─ /about · /privacy · /terms · /license
```

IA의 핵심은 Atlas가 기존 Textbook을 대체하지 않는 것이다. Atlas는 “전체 흐름을 이해하는 입구”, Textbook은 “원리를 깊게 읽는 본문”, Wiki는 “찾아보는 사전”으로 역할을 분리한다.

---

# 6. Learning Roadmap

## 6.1 기본 학습 리듬

```text
Concept Passport
→ Why Story
→ Interactive Animation
→ Interactive Diagram
→ Mini Practice
→ Quiz
→ Teach-back
→ Next Why Bridge
```

각 개념은 8~15분 Story 학습을 기본으로 하고, 기존 Deep Dive 강의는 선택 심화로 연결한다.

## 6.2 학습 트랙

| 트랙 | 대상 | 경로 |
|---|---|---|
| Story Tour | AI 전체 흐름이 처음인 사용자 | 21개 Concept Chapter + Quiz |
| Builder Track | 실제 AI 기능을 만들고 싶은 사용자 | LLM → Prompt → Context → RAG → Tool → MCP → Agent → Evaluation |
| Production Track | 운영 관점을 배우려는 사용자 | Workflow → Orchestration → Evaluation → Harness → Production AI |
| Lookup Track | 검색으로 들어온 사용자 | Term → Concept Passport → 이전/다음 Why Bridge |

트랙은 추천일 뿐 잠금 장치가 아니다. 모든 노드는 직접 접근할 수 있어야 한다.

## 6.3 추천 규칙

1. 마지막으로 읽던 개념이 있으면 “이어서 학습”을 우선한다.
2. 없으면 완료하지 않은 가장 앞 개념을 추천한다.
3. 기존 강의를 완료했다면 연계 개념에 “심화 학습 완료”를 표시한다.
4. 퀴즈 오답이 반복되면 다음 노드보다 현재 노드의 관련 강의·용어를 추천한다.

---

# 7. Knowledge Graph

## 7.1 노드 유형

| 노드 | 출처 | V2 표시 범위 |
|---|---|---|
| Concept | Atlas 21개 정본 | 전부 표시 |
| Lesson | 기존 100강 | 선택한 Concept의 1-hop에만 표시 |
| Term | 기존 456개 | 대표 용어 3~6개, 나머지는 국소 그래프 |
| Evidence | KB 90건+ | Evidence Drawer에서 표시 |
| Company/Service | 공식 근거 확보 항목 | 챕터에서만, 그래프 전도에는 기본 미표시 |

## 7.2 관계 유형

- `evolves_to`: 시간·필요의 흐름
- `solves_limit_of`: 이전 개념의 한계를 해결
- `requires`: 이해 또는 구현 선행 조건
- `uses`: 시스템 구성에서 사용
- `standardizes`: 제각각인 연결을 표준화
- `retrieves_from`: 지식에서 관련 정보를 검색
- `delegates_to`: Agent가 SubAgent에 위임
- `evaluated_by`: 시스템이 Evaluation으로 측정됨
- `bounded_by`: Agent/Workflow가 Harness의 제약을 받음
- `deepens`: Concept에서 기존 Lesson으로 이동
- `defines`: Concept에서 Glossary Term으로 이동
- `evidenced_by`: Concept에서 KB 근거로 이동

## 7.3 뷰

- **Journey View**: 21개 Why Bridge를 순서대로 본다.
- **System View**: 선택한 개념의 1~2 hop 관계를 본다.
- **Compare View**: 혼동하기 쉬운 두 개념의 관계·차이를 나란히 본다.

데스크톱은 고정 좌표 SVG/Canvas를 사용할 수 있지만, 모바일과 스크린리더에는 동일 정보를 제공하는 세로 목록·관계 표가 반드시 존재해야 한다. V2에서는 물리 시뮬레이션 라이브러리를 추가하지 않는다.

---

# 8. Timeline

## 8.1 타임라인 구조

| Band | 내용 |
|---|---|
| Foundation | AI, ML, Deep Learning의 주요 연구·제품 전환 |
| Model | Generative AI, LLM, Embedding 등 모델·표현 기술의 전환 |
| System | RAG, Tool Calling, MCP, Agent, Evaluation, Harness의 시스템 전환 |
| Industry | 공식 출시·표준 버전·대표 서비스 채택·Production 사례 |

## 8.2 이벤트 데이터 규칙

```ts
type TimelineEvent = {
  id: string
  conceptId: string
  date: string
  precision: "day" | "month" | "year" | "range"
  kind: "research" | "release" | "standard" | "adoption"
  title: string
  summary: string
  kbId: string
  sourceUrl: string
  checkedAt: string
}
```

- 공식 논문·공식 발표·공식 사양·공식 제품 문서로 확인된 사건만 등재한다.
- 기업·서비스의 “대표”는 인기 순위가 아니라 개념의 등장·채택을 설명하는 교육적 관련성으로 선정한다.
- MCP 같은 버전형 표준은 현재 버전과 이전 주요 버전을 함께 보여준다.
- 각 챕터에는 “이 개념의 버전·역사” 미니 타임라인을 제공한다.

---

# 9. Navigation

## 9.1 전역 내비게이션

`홈 · Atlas · 커리큘럼 · 용어 사전 · 공식 문서 · 검색 · 테마`

기존 메뉴 구조에 Atlas만 추가한다. Atlas 내부에서만 Journey·Graph·Timeline·Playground·Progress 보조 탭을 노출한다.

## 9.2 챕터 Learning Rail

데스크톱의 sticky rail과 모바일의 compact rail은 다음을 항상 보여준다.

- 현재 Arc와 `n/21`
- 현재 14섹션 위치
- 챕터·퀴즈·실습 상태
- 이전/다음 Concept
- Journey 복귀
- 관련 Deep Dive 진입

## 9.3 전환 원칙

- 어느 화면에서든 Journey로 1회 동작 안에 돌아갈 수 있다.
- 챕터 말미의 다음 버튼은 제목뿐 아니라 “왜 다음이 필요한가”를 보여준다.
- 용어집과 검색 결과는 Atlas 위치를 함께 보여준다.
- 사용자가 길을 잃었을 때 “추천 다음 학습”은 하나만 강하게 제안한다.

---

# 10. UX Flow

## 10.1 처음 방문한 비개발자

```text
홈의 Atlas 진입
→ 21개 여정과 6개 Arc를 한눈에 확인
→ 1장 AI의 Concept Passport
→ Why Story와 단계 애니메이션
→ 3~5문항 Quiz
→ 다음 Why Bridge
```

첫 화면에서 전문 용어를 나열하지 않고 “기계에게 규칙을 다 적지 않아도 되는 방법은 왜 필요했을까?” 같은 질문으로 시작한다.

## 10.2 특정 용어로 유입된 사용자

```text
검색 또는 용어집
→ 용어 정의
→ “Atlas에서 이 개념의 위치 보기”
→ 이전 한계·해결·다음 개념
→ 필요 시 기존 Deep Dive
```

## 10.3 기존 100강 학습자

```text
기존 완료 기록 유지
→ Atlas에서 연계 개념의 심화 배지 확인
→ 비어 있는 Story·Quiz만 빠르게 완주
```

## 10.4 프로젝트 중심 사용자

```text
Builder Track 선택
→ 관련 Concept만 순차 학습
→ “실제 프로젝트에서는” 섹션
→ Playground
→ 기존 project-textbook 강의
```

## 10.5 복습 사용자

Progress 화면에서 오답 개념·미완료 Teach-back·오래된 완료를 기준으로 복습 큐를 제공한다. 점수 경쟁이나 연속 출석 압박은 넣지 않는다.

---

# 11. UI 방향

## 11.1 시각 언어

- 기존 `DESIGN.md`의 paper-white, graphite, clear blue 토큰을 유지한다.
- Atlas에는 Arc별 보조 색을 제한적으로 추가하되 의미 없는 단색 장식으로 사용하지 않는다.
- 화면은 “현대적인 지도 + 시스템 블루프린트 + 읽기 좋은 교재”의 결합을 지향한다.
- Apple·Stripe·Linear·OpenAI·Claude·Vercel·Figma의 명료한 위계와 상호작용 원칙을 참고하되 외형을 복제하지 않는다.

## 11.2 주요 화면 구성

- Atlas Home: 6개 Arc와 21개 노드가 첫 화면에서 전체 여정으로 보인다.
- Concept Chapter: 본문 중심, 우측 Learning Rail, 중간에 상호작용이 자연스럽게 삽입된다.
- Graph: 전체 그래프보다 현재 개념 주변을 먼저 보여주고 사용자가 확대한다.
- Timeline: 사건 카드보다 기술 전환의 이유를 강조한다.
- Progress: 숫자 대시보드보다 “무엇을 이해했고 무엇을 설명해볼 차례인지”를 보여준다.

## 11.3 접근성과 반응형

- 모든 그래프·다이어그램은 텍스트 대체 뷰를 제공한다.
- 색만으로 상태를 구분하지 않는다.
- 키보드로 전체 여정·애니메이션·퀴즈를 완료할 수 있어야 한다.
- 44px 이상 터치 타깃, 본문 16px 이상, 충분한 대비를 유지한다.
- 모바일에서는 Zoom Canvas보다 세로 Story Flow를 우선한다.

---

# 12. Animation 방향

## 12.1 원칙

1. 애니메이션은 장식이 아니라 상태 변화·데이터 이동·피드백을 설명한다.
2. 자동 재생보다 Step-by-step 조작을 기본으로 한다.
3. CSS·SVG·React 상태를 우선하며 새 모션 라이브러리는 필요가 증명될 때만 추가한다.
4. `prefers-reduced-motion`에서는 같은 정보를 정지 단계로 제공한다.
5. 사용자가 현재 단계와 전체 단계 수를 알 수 있어야 한다.

## 12.2 재사용할 7개 시각 문법

| 문법 | 설명 대상 |
|---|---|
| Evolution Chain | 이전 한계 → 다음 기술 |
| Layer Stack | AI→모델→컨텍스트→도구→운영 계층 |
| Data Flow | RAG, Tool Calling, MCP의 요청·응답 |
| Budget Window | Token, Context, Memory의 용량·손실 |
| Loop | Agent, Workflow, Evaluation의 반복 |
| Boundary Gate | Permission, Harness, Production 제어 |
| Feedback Compare | Prompt·Evaluation 전후 비교 |

애니메이션과 인터랙티브 다이어그램은 구분한다. 애니메이션은 시간 순서를 설명하고, 다이어그램은 사용자가 관계를 탐색한다.

---

# 13. Playground

## 13.1 V2 원칙

- API 키·로그인·과금 없이 동작하는 결정론적 시뮬레이션을 우선한다.
- 모든 화면에 “시뮬레이션”임을 명시한다.
- 예쁜 결과보다 관찰 과제와 실패 이유를 보여준다.
- 시크릿 입력 UI를 만들지 않는다.

## 13.2 우선 플레이그라운드

| ID | 연결 개념 | 사용자가 조작하는 것 | 배우는 것 |
|---|---|---|---|
| prompt-contract | Prompt | 모호한 요청과 계약형 요청 토글 | 출력 품질은 지시 구조에 영향을 받는다. |
| context-budget | Context·Memory | 자료를 제한된 창에 배치 | 무엇을 넣고 버리는지가 성능을 좌우한다. |
| embedding-space | Embedding | 문장 카드를 벡터 공간에 배치 | 의미 유사도가 좌표로 표현된다. |
| rag-pipeline | Knowledge·RAG | 문서·질문·검색 결과 선택 | 생성 전 검색이 어떤 근거를 제공하는지 본다. |
| tool-call-cycle | Tool Calling | 스키마·인자·도구 결과 조립 | 모델 출력과 실제 실행은 다른 층이다. |
| mcp-connector | MCP·Skill | Host·Client·Server 연결 | N×M 연결을 표준화하는 이유를 본다. |
| agent-loop | Agent·SubAgent | 계획·행동·관찰·종료 조건 조절 | 자율성과 무한 루프 위험을 함께 본다. |
| orchestration-lab | Workflow·Orchestration | 작업 분해·위임·병합 | 병렬성과 조정 비용을 비교한다. |
| eval-harness | Evaluation·Harness | 평가 기준·권한·한도 설정 | 좋은 결과와 안전한 실행은 별개임을 배운다. |

MVP는 `prompt-contract`, `context-budget`, `rag-pipeline`, `agent-loop` 4개로 시작한다. 나머지는 공용 프리미티브의 재사용성이 검증된 후 확장한다.

---

# 14. Quiz

## 14.1 평가 목표

퀴즈는 정의 암기가 아니라 다음을 확인한다.

- 왜 등장했는가.
- 이전 기술의 어떤 한계를 해결했는가.
- 실제 시스템에서 어느 위치에 있는가.
- 다음 기술이 왜 필요한가.
- 인접 개념과 무엇이 다른가.

## 14.2 문항 구조

- 챕터당 4~6문항
- 유형: 서사 선택, 순서 배열, 관계 연결, 시나리오 판단, OX+이유
- 모든 오답에 설명과 해당 섹션 딥링크 제공
- 60% 이상을 이해 확인으로 표시하되 재응시 무제한
- 벌점·잠금·랭킹 없음
- 정답은 챕터와 KB 근거에서 도출 가능해야 함

## 14.3 Teach-back

Quiz 다음에 “다른 사람에게 3문장으로 설명해보세요”를 제공한다. 답변은 서버로 전송하지 않고 브라우저에 저장하며, 다음 체크포인트로 자기 평가한다.

1. 등장 이유를 말했다.
2. 이전 한계를 말했다.
3. 실제 사용 위치를 말했다.
4. 다음 기술과 연결했다.

---

# 15. Progress

## 15.1 상태 모델

| 상태 | 조건 | 표시 |
|---|---|---|
| Not Started | 방문 기록 없음 | 윤곽 노드 |
| Exploring | 챕터 방문 또는 일부 섹션 읽음 | 부분 채움 |
| Understood | 챕터 읽음 + Quiz 60% 이상 | 체크 노드 |
| Applied | 실습 또는 Playground 완료 | 도구 배지 |
| Can Explain | Teach-back 체크 완료 | 설명 배지 |
| Deepened | 연계 기존 강의 완료 | 심화 별 배지 |

## 15.2 사용자 기능

- 전체 21개 진행률과 Arc별 진행률
- 이어서 학습
- 복습 큐
- 오답 개념 모음
- 북마크와 연계
- 진행 데이터 JSON 내보내기·가져오기(계정 없는 사용자 백업)
- 전체 초기화 전에 영향 범위 확인

V2는 분석 서버나 사용자 추적을 기본 도입하지 않는다. 성과 측정은 사용자 기기 안의 학습 상태와 수동 사용성 테스트로 시작한다.

---

# 16. 기존 Wiki를 어떻게 Evolution 시킬 것인가

용어집은 폐기하거나 Atlas로 합치지 않는다. 역할을 “사전”에서 “Atlas의 인덱스”로 확장한다.

## 16.1 용어 항목에 추가할 것

- 소속 Concept와 Arc 배지
- “왜 생겼는가” 한 문장
- 이전·다음 관련 개념
- 관련 강의
- 국소 Knowledge Graph
- 근거 확인일과 공식 문서 링크

## 16.2 진입 흐름

```text
용어 검색
→ 짧은 정의
→ Atlas 위치
→ 왜 등장했는가
→ 관련 Deep Dive
```

## 16.3 마이그레이션 원칙

- 456개 용어를 한 번에 수작업 분류하지 않는다.
- Atlas 핵심 용어부터 `conceptId`를 명시한다.
- 나머지는 기존 category와 related를 이용해 후보 매핑을 빌드 시 생성하고, 검증된 항목만 승격한다.
- 기존 용어 검색·필터·URL 동작을 보존한다.

---

# 17. V2 → V3 확장 전략

V3는 V2의 정적·로컬 우선 구조가 실제 학습에 효과적이라는 증거가 쌓인 뒤 진행한다.

| 확장 | V2에서 준비할 인터페이스 | V3 가능성 |
|---|---|---|
| 계정·동기화 | Progress 저장소 인터페이스 분리 | 여러 기기 진행률, 선택적 로그인 |
| Grounded AI Tutor | Concept·KB·Lesson 역추적 인덱스 | 출처가 있는 질의응답·설명 피드백 |
| Adaptive Learning | Quiz·Teach-back 결과 스키마 | 개인별 복습·추천 |
| Live Lab | Playground Shell과 시뮬레이션 계약 | 샌드박스 코드 실행, BYOK 선택 |
| Authoring Studio | 14섹션·관계·타임라인 스키마 | 편집자용 시각 저작 도구 |
| Collaboration | Progress·노트 export 계약 | 코호트, 교사 대시보드, 팀 학습 |
| Localization | Concept 데이터와 UI 문자열 분리 | 영어·일본어 등 다국어 Atlas |
| Versioned Atlas | Timeline·checkedAt·concept version | 기술 변화 비교와 릴리스 노트 |

V3에서도 Evidence Layer와 AI-Ops 파이프라인은 중심에 둔다. AI Tutor가 추가되어도 근거 없는 자유 생성이 콘텐츠 정본을 덮어쓰지 못하게 한다.

---

# 18. 프로젝트 리스크

| 리스크 | 영향 | 대응 |
|---|---|---|
| 21개 챕터와 상호작용의 범위 폭증 | 일정 지연·품질 하락 | Arc 단위 릴리스, 공용 시각 문법과 데모 프리미티브 재사용 |
| 기존 100강과 챕터 내용 중복 | 사용자가 같은 설명을 반복해서 읽음 | Atlas는 Why·관계·시간에 집중, 원리 상세는 Deep Dive로 연결 |
| 기업·서비스 정보의 빠른 노후화 | 신뢰 하락 | 공식 출처, checkedAt, stale 재검증, 역사적 기여와 현재 채택 구분 |
| 그래프 과밀 | 모바일·초보자 사용성 저하 | 전도는 21개 Concept 중심, 나머지는 국소 1-hop과 텍스트 대체 |
| 장식적인 애니메이션 | 성능 저하·학습 방해 | 학습 질문과 관찰 과제가 없는 애니메이션은 구현하지 않음 |
| localStorage 스키마 변경 | 기존 진행률 유실 | 버전 마이그레이션, 백업, 실패 시 기존 필드 보존 |
| 정적 export 제약 | 서버형 실습·동기화 제한 | V2는 결정론적 클라이언트 시뮬레이션, 서버 기능은 V3 인터페이스만 준비 |
| 접근성 저하 | 그래프·드래그 사용 불가 | 키보드, 리스트 대체, 탭 선택 대체, reduced motion 필수 |
| 운영 상태 문서 드리프트 | 잘못된 실행·중복 작업 | 단일 집계 검증 스크립트와 Phase 시작 전 git/status 재대사 |
| 승인 전 병렬 구현 | PRD와 코드 불일치 | 현재 미커밋 Phase 1 변경을 보존하되 승인 전 병합·커밋·확장 금지 |

---

# 19. 단계별 개발 전략

모든 Phase는 **계획 보고 → 운영자 승인 → 구현 → 테스트·QA → 완료 보고 → 다음 Phase 승인** 순서로 진행한다. 한 번의 승인으로 여러 Phase를 묶지 않는다.

## Phase 0 — Discovery & PRD (현재)

- 목표: 기존 구조를 분석하고 V2 정본을 확정한다.
- 작업: 저장소·AI-Ops·콘텐츠·UX 분석, 21노드·14섹션·아키텍처 정의.
- 영향 범위: `ai-ops/roadmap` 문서만.
- 수정 파일: `ATLAS-EDUCATION-LAYER.md`, 기존 빌드 계획의 HOLD 표시.
- 테스트: 문서 내부 숫자·경로·용어 일관성 검사.
- QA: 사용자 요구 20개 항목과 대조.
- 예상 리스크: 이전 12노드/13섹션 계획과 충돌.
- Commit Message: `ATLAS-P0: rebaseline V2 PRD to 21 concepts and 14-section chapters`

## Phase 1 — Baseline Reconciliation & Data Contract

- 목표: 코드 작성 전에 21개 Concept·관계·챕터·진행률 계약을 확정한다.
- 작업: 12→21 매핑표, 기존 강의·용어·KB 연결표, Zod/TypeScript 스키마, 상태 문서 집계 정합화.
- 영향 범위: `ai-ops/roadmap`, `src/content/atlas*`, `src/lib`의 타입·검증만.
- 수정 파일: `src/content/atlas.ts`, `src/content/atlas/schema.ts`, `src/lib/atlas-index.ts`, 테스트.
- 테스트: 21개 order, slug, lesson/term/KB 참조 실존, 기존 100강 무변경.
- QA: 데이터 계약 리뷰, 이전 미커밋 Phase 1 변경의 재사용/수정/보류 목록.
- 예상 리스크: 초기 프로토타입 코드와 새 정본의 충돌.
- Commit Message: `ATLAS-P1: establish 21-concept data contract and reference integrity`

## Phase 2 — Information Architecture & Navigation Shell

- 목표: Atlas에 들어와 현재 위치와 다음 행동을 이해하게 한다.
- 작업: `/atlas`, Journey, Concept shell, Learning Rail, 전역 메뉴 연결.
- 영향 범위: 신규 Atlas 라우트와 헤더 1건.
- 수정 파일: `src/app/atlas/**`, `src/features/atlas/**`, `SiteHeader.tsx`.
- 테스트: static params 21개, notFound, 모바일·키보드 내비.
- QA: 기존 URL·헤더·검색 회귀, 라이트/다크/모바일 육안.
- 예상 리스크: 첫 화면의 정보 과밀.
- Commit Message: `ATLAS-P2: add journey navigation and 21-concept chapter shell`

## Phase 3 — Evidence & Story Content

- 목표: 21개 챕터의 14섹션 중 서사·사실·연결 콘텐츠를 근거 기반으로 채운다.
- 작업: KB gap 분석, P-01/P-02, Arc별 P-04/P-05, 기업·서비스·사례 근거 수집.
- 영향 범위: KB·Atlas chapter 데이터만. 기존 100강 본문 무수정.
- 수정 파일: `ai-ops/knowledge-base/entries/T14/**`, `src/content/atlas/chapters/**`.
- 테스트: 14개 헤딩·순서, Quote Bank 인용, 링크 생존, KB consumer.
- QA: Arc당 3개 표본 Teach-back 리뷰, 마케팅성 문장 제거.
- 예상 리스크: 21개 챕터 동시 생산에 따른 깊이 편차.
- Commit Message: `ATLAS-P3x: publish evidence-grounded chapters for arc {name}`

## Phase 4 — Unified Progress & Learning Roadmap

- 목표: 기존 강의 진행률과 Atlas 진행률을 하나의 학습 상태로 연결한다.
- 작업: LearningState V2 마이그레이션, Arc/Concept 상태, 이어서 학습, 데이터 export/import.
- 영향 범위: 기존 progress 기능의 하위 호환 확장.
- 수정 파일: `src/lib/progress.ts`, `LearningStateProvider.tsx`, Atlas progress UI.
- 테스트: V1→V2 마이그레이션, 손상 데이터 복구, reset, lesson badge 교차 조회.
- QA: 기존 완료·북마크 유실 0.
- 예상 리스크: localStorage 데이터 손상.
- Commit Message: `ATLAS-P4: unify textbook and atlas learning progress`

## Phase 5 — Knowledge Graph

- 목표: 개념의 관계를 탐색 가능한 지도에서 이해하게 한다.
- 작업: 파생 edge 엔진, Journey/System/Compare 뷰, 텍스트 대체.
- 영향 범위: Atlas와 용어 연결만.
- 수정 파일: `src/lib/atlas-graph.ts`, `src/features/atlas/graph/**`, route.
- 테스트: edge 무결성, 1-hop 결과, 키보드 탐색, 모바일 목록.
- QA: 21개 노드 과밀·라벨 겹침·색 의존 점검.
- 예상 리스크: 시각 복잡도와 번들 증가.
- Commit Message: `ATLAS-P5: add derived knowledge graph and accessible relation views`

## Phase 6 — Timeline & Version History

- 목표: 기술의 발생·표준·채택을 시간 흐름으로 이해하게 한다.
- 작업: 공식 근거 이벤트 수집, 4-band 타임라인, 챕터 미니 역사.
- 영향 범위: Atlas timeline 데이터와 화면.
- 수정 파일: `src/content/atlas/timeline.ts`, timeline components/routes.
- 테스트: 모든 이벤트에 kbId·sourceUrl·checkedAt, 날짜 정렬.
- QA: 공식 출처 전수 확인, 불확실 날짜 미등재.
- 예상 리스크: 현재성 정보의 빠른 노후화.
- Commit Message: `ATLAS-P6: add sourced AI evolution timeline and concept history`

## Phase 7 — Animation & Interactive Diagrams

- 목표: 추상 원리와 관계를 단계·조작으로 보이게 한다.
- 작업: StepPlayer, DiagramExplorer, 공용 7개 시각 문법, 우선 Concept 적용.
- 영향 범위: Atlas 챕터 섹션 9·10.
- 수정 파일: `src/features/atlas/visuals/**`, `src/content/atlas/animations.ts`, diagram assets.
- 테스트: 단계 경계, keyboard, reduced motion, SVG id 무결성.
- QA: 각 시각화가 답하는 학습 질문 명시, 장식 단계 제거.
- 예상 리스크: 모션 과다와 모바일 성능.
- Commit Message: `ATLAS-P7: add step animations and interactive concept diagrams`

## Phase 8 — Playground & Practice

- 목표: 핵심 개념을 사용자가 직접 조작하고 관찰한다.
- 작업: 공용 시뮬레이션 프리미티브, MVP 4개 Playground, 챕터 실습 연결.
- 영향 범위: Atlas 내부 클라이언트 상태.
- 수정 파일: `src/features/atlas/playgrounds/**`, `src/content/atlas/playgrounds.ts`.
- 테스트: 상태 머신, 완료 조건, 드래그 대체 조작, 시크릿 입력 부재.
- QA: 시뮬레이션 배지, 관찰 과제, 모바일 터치.
- 예상 리스크: 실제 API처럼 오해할 가능성.
- Commit Message: `ATLAS-P8: launch four deterministic learning playgrounds`

## Phase 9 — Quiz & Teach-back

- 목표: 사용자가 왜·한계·실제 위치를 설명할 수 있는지 확인한다.
- 작업: QuizRunner, 21세트 문항, 해설 딥링크, Teach-back 체크포인트.
- 영향 범위: Atlas chapter와 progress.
- 수정 파일: `src/content/atlas/quizzes.ts`, quiz/teach-back components.
- 테스트: 60% 경계, 재응시, 해설 링크, 저장·복원.
- QA: 문항 전수 근거 확인, 암기형 편중 점검.
- 예상 리스크: 쉬운 문항으로 인한 허위 완료감.
- Commit Message: `ATLAS-P9: add causal quizzes and teach-back checkpoints`

## Phase 10 — Wiki Evolution & Search

- 목표: 용어 lookup 사용자를 Atlas 여정으로 연결한다.
- 작업: concept badge, why link, 국소 그래프, 검색 인덱스 확장.
- 영향 범위: GlossaryBrowser·SiteSearch의 additive 변경.
- 수정 파일: `src/features/glossary/**`, `src/lib/search-index.ts`, Atlas term map.
- 테스트: 기존 검색·필터 회귀, 새 result kind, term mapping 실존.
- QA: 456개 용어 전체의 미검증 자동 노출 금지.
- 예상 리스크: 용어 매핑 오류.
- Commit Message: `ATLAS-P10: connect glossary and search to the atlas`

## Phase 11 — Full QA, Performance & Release Candidate

- 목표: 학습 효과·접근성·성능·콘텐츠 무결성을 통합 검증한다.
- 작업: 전수 스캔, 사용성 표본, 성능 최적화, sitemap, release note.
- 영향 범위: Atlas 전체, 기존 화면 회귀 점검.
- 수정 파일: QA script/report, 필요한 최소 수정.
- 테스트: `npm run verify`, static export, keyboard journey, reduced motion, mobile.
- QA: 21×14 구조, 인용, 링크, 관계, 타임라인, playground, quiz 전수.
- 예상 리스크: 마지막 단계에서 누적 결함 발견.
- Commit Message: `ATLAS-P11: complete atlas QA and release candidate`

## Phase 12 — Release

- 목표: 운영자 최종 승인 후 공개한다.
- 작업: 배포, 라이브 스모크, rollback 확인.
- 영향 범위: Firebase Hosting과 public sitemap.
- 수정 파일: release/deployment report만.
- 테스트: 홈→Journey→Concept→Quiz→Graph→Timeline 라이브 흐름.
- QA: canonical, robots, 404, 모바일, 다크 모드.
- 예상 리스크: 캐시·정적 경로 누락.
- Commit Message: `ATLAS-P12: release AI Engineering Atlas V2`

---

# 20. 최종 아키텍처

## 20.1 논리 아키텍처

```text
User
  ├─ Journey / Chapter / Graph / Timeline / Playground / Progress
  │
  ▼
Education Layer
  ├─ AtlasIndex (21 Concepts + derived relationships)
  ├─ Story Composer (14-section chapters)
  ├─ Recommendation (next, review, deep dive)
  ├─ Interaction Registry (animation, diagram, playground, quiz)
  └─ Unified Learning State Adapter
  │
  ├───────────────┬────────────────┬─────────────────┐
  ▼               ▼                ▼                 ▼
Lessons 100     Glossary 456     Diagrams 78      Resources
  │               │                │                 │
  └───────────────┴──────────┬─────┴─────────────────┘
                             ▼
Evidence Layer: Approved KB + Quote Bank + Sources + checkedAt
                             ▲
                             │
Operations Layer: Agents + P-01~P-09 + QA + STATE/DASHBOARD
```

## 20.2 목표 폴더 구조

```text
src/
  app/
    atlas/
      page.tsx
      journey/page.tsx
      concepts/[conceptId]/page.tsx
      graph/page.tsx
      timeline/page.tsx
      playgrounds/page.tsx
      playgrounds/[id]/page.tsx
      progress/page.tsx
  content/
    atlas.ts
    atlas/
      schema.ts
      chapters/*.md
      relationships.ts
      timeline.ts
      animations.ts
      diagrams.ts
      playgrounds.ts
      quizzes.ts
  features/
    atlas/
      journey/
      chapter/
      graph/
      timeline/
      visuals/
      playgrounds/
      quiz/
      progress/
  lib/
    atlas-index.ts
    atlas-graph.ts
    atlas-content.ts
    progress.ts

ai-ops/
  agents/                         # 기존 유지
  prompts/                        # 기존 P-01~P-09 유지
  knowledge-base/entries/T14/     # Atlas gap만 추가
  reports/atlas-*.md
  roadmap/ATLAS-EDUCATION-LAYER.md
```

## 20.3 성공 기준

1. 비개발자가 21개 기술을 “이전 한계 → 해결 → 다음 필요”로 설명할 수 있다.
2. MCP·RAG·Agent 같은 용어를 독립 정의가 아니라 전체 시스템 안의 위치로 이해한다.
3. 기존 100강·456개 용어·90개 KB의 링크와 기능이 유지된다.
4. Atlas의 모든 사실·기업·서비스·타임라인 항목이 KB로 역추적된다.
5. 모든 챕터가 14섹션을 갖고 Quiz·Teach-back·다음 Why Bridge로 학습 루프를 닫는다.
6. 키보드·모바일·reduced motion에서도 핵심 학습 경험을 완료할 수 있다.
7. `npm run verify`와 Atlas 전수 QA가 통과한다.

---

## 승인 상태

| 항목 | 상태 |
|---|---|
| Education Layer PRD (본 문서) | **승인 완료** |
| Model Routing Learning Route Feature Spec | **승인 완료 (MR-0)** — [ATLAS-MODEL-ROUTING-FEATURE-SPEC.md](ATLAS-MODEL-ROUTING-FEATURE-SPEC.md) |
| Model Routing 소스 구현 | **미착수** (MR-1+ 별도 승인) |
| Model Routing 콘텐츠 구현 | **미착수** |
| ATLAS-BUILD-PLAN (12노드·13섹션) | **HOLD** |

본 PRD 승인 후에도 Phase 1 소스 구현은 별도 운영자 승인 후에만 진행한다. Phase 1 착수 시 먼저 12노드 초기 스켈레톤과 현재 미커밋 Phase 1 코드를 21노드·14섹션 정본에 맞추는 영향 분석([reports/atlas-phase-1-impact-report.md](../reports/atlas-phase-1-impact-report.md))을 기준으로 재사용·수정·보류 목록을 확정한다.

Model Routing은 Orchestration → Evaluation → Harness 구간을 가로지르는 **하위 Learning Route**이며, 21개 Concept에 새 Concept를 추가하지 않는다. 상세 학습 단위·Simulator·시나리오 계약은 Feature Spec에만 기술하고 본 PRD에 복제하지 않는다.
