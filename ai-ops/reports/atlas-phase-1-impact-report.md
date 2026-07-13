# AI Engineering Atlas V2 — Phase 1 Baseline Reconciliation & Data Contract Impact Report

| 항목 | 값 |
|---|---|
| 작성일 | 2026-07-13 |
| 기준 정본 | `ai-ops/roadmap/ATLAS-EDUCATION-LAYER.md` (커밋 `c32a802`) |
| 분석 범위 | 현재 미커밋 Atlas Phase 1 코드 전체 + 기존 Content/Evidence/Progress/Build 계약 |
| 변경 범위 | **본 보고서 1개만 신규 작성. src 코드와 기존 콘텐츠는 변경하지 않음** |
| 구현 여부 | 구현하지 않음 |
| 커밋 여부 | 커밋하지 않음 |

## 결론 요약

현재 미커밋 초안은 12노드·13섹션 기준으로는 내부 일관성이 있다. Atlas 표적 테스트 10개, 관련 파일 Biome 검사, TypeScript typecheck가 통과했다. 또한 초안이 참조하는 강의 26개, 용어 27개, KB 16개는 현재 저장소에 모두 존재한다.

그러나 승인된 정본과는 다음 핵심 계약이 다르다.

- 12개 macro node가 21개 canonical concept를 표현하지 못한다.
- 13섹션에는 `실제 프로젝트에서는 어떻게 사용하는가`와 별도 `인터랙티브 다이어그램` 계약이 없다.
- `id` 하나가 내부 식별자와 URL slug 역할을 동시에 한다.
- `/atlas/[nodeId]`는 승인된 `/atlas/concepts/[conceptId]` IA와 다르다.
- Atlas 전용 localStorage와 Provider는 승인된 통합 Progress 구조와 충돌한다.
- 테스트가 12·13을 성공 조건으로 고정해 새 정본에서는 반드시 교체되어야 한다.

따라서 초안을 그대로 커밋해서는 안 된다. 다만 로더, 이전/다음 계산, 참조 무결성 검사, Journey/Chapter UI 골격은 수정 후 재사용 가치가 높다.

---

# 1. 현재 Git 상태

## 1.1 최근 커밋

```text
c32a802 ATLAS-P0: rebaseline V2 PRD to 21 concepts and 14-section chapters
edc302d ATLAS-PLAN: phase-gated build plan (P1-P7) — 13-section chapters, five-values charter
11fa475 ATLAS-PRD: full 20-section Education Layer PRD (plan only, no code)
8364c09 ATLAS-A0: Education Layer plan + 12-node data skeleton (Evolution, not Rebuild)
babd3d1 release: public launch (Mode B) — 100 lessons free, QA-polished
```

HEAD는 `c32a802`다. 원격 저장소는 설정되어 있지 않다.

## 1.2 작업 트리 요약

| 상태 | 수량 |
|---|---:|
| tracked modified | 2 |
| untracked | 22 |
| 합계 | 24 |
| staged | 0 |

### Tracked modified

```text
M src/components/layout/SiteHeader.tsx
M src/content/atlas.ts
```

### Untracked

```text
ai-ops/ATLAS-P1-PENDING.md
src/app/atlas/[nodeId]/page.tsx
src/app/atlas/layout.tsx
src/app/atlas/page.tsx
src/content/atlas/chapters/agent.md
src/content/atlas/chapters/ai.md
src/content/atlas/chapters/context.md
src/content/atlas/chapters/harness.md
src/content/atlas/chapters/llm.md
src/content/atlas/chapters/mcp.md
src/content/atlas/chapters/memory.md
src/content/atlas/chapters/orchestration.md
src/content/atlas/chapters/production-ai.md
src/content/atlas/chapters/prompt.md
src/content/atlas/chapters/tool.md
src/content/atlas/chapters/workflow.md
src/features/atlas/AtlasProgressProvider.tsx
src/features/atlas/ChapterShell.tsx
src/features/atlas/JourneyMap.tsx
src/lib/atlas-progress.ts
src/lib/atlas.test.ts
src/lib/atlas.ts
```

## 1.3 현재 초안 기준선 검사

| 검사 | 결과 | 해석 |
|---|---|---|
| `vitest run src/lib/atlas.test.ts` | PASS, 10/10 | 12노드·13섹션 legacy 계약의 내부 일관성만 증명한다. |
| Biome, Atlas 관련 11개 TS/TSX | PASS | 현재 초안에 포맷·lint 위반이 없다. |
| `tsc --noEmit` | PASS | 현재 미커밋 코드가 타입 검사된다. |
| 전체 build | 미실행 | 영향 분석 단계이며 static route 변경을 승인하지 않았으므로 실행하지 않았다. |

`ATLAS-P1-PENDING.md`의 “마감만 남음” 판단은 legacy 계약 기준이다. 최신 정본 승인 이후에는 유효한 완료 판정이 아니다.

---

# 2. 미커밋 파일별 판정

## 2.1 코드와 운영 메모

| 파일 | 판정 | 근거와 후속 조치 |
|---|---|---|
| `src/components/layout/SiteHeader.tsx` | **그대로 재사용, Phase 2까지 보류** | `/atlas` 전역 진입은 승인된 IA와 일치한다. 다만 Phase 1은 데이터 계약 단계이므로 현재 변경을 Phase 1 커밋에 섞지 않는다. |
| `src/content/atlas.ts` | **수정 후 재사용** | 12개 node의 교육적 문장과 검증된 일부 참조는 원료로 쓸 수 있다. `AtlasNode`, 13섹션, `id` 중심 구조는 21개 Concept 계약으로 교체하고 6개 Arc 파일로 분리해야 한다. |
| `ai-ops/ATLAS-P1-PENDING.md` | **보류** | 당시 실행 내역의 증거다. 완료 지시서로는 폐기되었지만 영향 분석이 끝날 때까지 삭제·커밋하지 않는다. 이후 legacy note로 보존하거나 보고서에 흡수할지 별도 승인한다. |
| `src/app/atlas/layout.tsx` | **수정 후 재사용** | Atlas 하위 레이아웃 경계는 유효하다. 현재 유일한 역할인 별도 `AtlasProgressProvider` 래핑은 제거하고, Phase 2에서 Atlas 보조 내비 레이아웃으로 재사용한다. |
| `src/app/atlas/page.tsx` | **수정 후 재사용** | Atlas 랜딩 골격은 유효하다. 12개 문구를 21개·6 Arc로 바꾸고 Journey 전용 `/atlas/journey`와 역할을 분리해야 한다. |
| `src/app/atlas/[nodeId]/page.tsx` | **폐기 대상(현 경로), 로직은 수정 후 재사용** | 승인 경로는 `/atlas/concepts/[conceptId]`다. `generateStaticParams`, metadata, prev/next, lesson resolve 패턴은 새 파일로 옮긴다. 새 경로가 통과하기 전 현 파일은 삭제하지 않는다. |
| `src/features/atlas/AtlasProgressProvider.tsx` | **폐기 대상** | 별도 key `ai-vibe-coding-master-atlas-progress`는 기존 학습 상태와 분리된다. 승인된 정본은 기존 `LearningStateProvider`의 하위 호환 확장이다. 현재 파일은 migration input 해석 참고용으로만 보존한다. |
| `src/features/atlas/ChapterShell.tsx` | **수정 후 재사용** | 헤더, 이전/다음, 관련 강의, 용어 칩은 가치가 있다. 13섹션 id, `/atlas/{id}` 링크, 별도 progress hook, locked section 집합을 14섹션·canonical route·통합 progress 계약에 맞춰야 한다. |
| `src/features/atlas/JourneyMap.tsx` | **수정 후 재사용** | 상태 표현과 Why Bridge 목록 골격은 유효하다. 6개 Arc 그룹, 21개 Concept, `/atlas/concepts/{slug}`, 접근 가능한 관계 설명을 추가한다. |
| `src/lib/atlas-progress.ts` | **수정 후 재사용** | 상태 파생 함수는 순수 함수라 재사용 가치가 있다. 별도 `AtlasProgress` 도메인 대신 `src/lib/progress.ts`의 V2 하위 상태 함수로 이동한다. |
| `src/lib/atlas.test.ts` | **수정 후 재사용** | 참조 검사의 방향은 정확하다. 12/13 하드코딩, 모든 KB id 허용, diagram·relationship·timeline 미검사를 21/14·approved/score·전체 registry 검사로 강화한다. |
| `src/lib/atlas.ts` | **수정 후 재사용** | 정렬, prev/next, Markdown 파서 구조는 재사용한다. `nodeId`를 `conceptId/slug`로 분리하고, 14섹션·frontmatter/strict heading·registry index를 지원하도록 역할을 나눈다. |

## 2.2 Chapter placeholder 12개

12개 파일은 SHA-256이 모두 동일하다. 실제 콘텐츠는 없고 13개 heading과 “Phase 2에서 작성” 문구만 있다.

| 파일 | 판정 | 조치 |
|---|---|---|
| `chapters/ai.md` | 수정 후 재사용 | 파일명 유지 가능, 14섹션 skeleton으로 변환 |
| `chapters/llm.md` | 수정 후 재사용 | 파일명 유지 가능, 14섹션 skeleton으로 변환 |
| `chapters/prompt.md` | 수정 후 재사용·rename | `prompt-engineering.md`로 canonical slug 정렬 |
| `chapters/context.md` | 수정 후 재사용·rename | `context-engineering.md`로 canonical slug 정렬 |
| `chapters/memory.md` | 수정 후 재사용 | 파일명 유지 가능 |
| `chapters/tool.md` | 수정 후 재사용·rename | `tool-calling.md`로 canonical slug 정렬 |
| `chapters/mcp.md` | 수정 후 재사용 | 파일명 유지 가능 |
| `chapters/agent.md` | 수정 후 재사용 | 파일명 유지 가능 |
| `chapters/workflow.md` | 수정 후 재사용 | 파일명 유지 가능 |
| `chapters/orchestration.md` | 수정 후 재사용 | 파일명 유지 가능 |
| `chapters/harness.md` | 수정 후 재사용 | 파일명 유지 가능 |
| `chapters/production-ai.md` | 수정 후 재사용 | 파일명 유지 가능 |

새 정본에는 아래 9개 chapter identity가 추가로 필요하다.

```text
machine-learning, deep-learning, generative-ai, knowledge, embedding,
rag, skill, subagent, evaluation
```

placeholder를 실제 학습 콘텐츠로 간주하지 않는다. Phase 1에서는 heading 계약 검증용 skeleton까지만 허용하고, Phase 3 Evidence & Story Content에서 P-01~P-05를 거쳐 채운다.

---

# 3. 기존 구조와 새 정본의 차이

## 3.1 12개 node의 분해 영향

| 기존 node | 새 정본 Concept | 영향 |
|---|---|---|
| AI | AI, Machine Learning, Deep Learning, Generative AI | 1개 macro 서사를 4개 독립 Why Bridge로 분해 |
| LLM | LLM | identity 유지, order 변경 |
| Prompt | Prompt Engineering | canonical id/slug 변경 |
| Context | Context Engineering, Knowledge, Embedding, RAG | 검색·지식 주입을 4개 시스템 층으로 분해 |
| Memory | Memory | identity 유지, 이전/다음 관계 변경 |
| Tool | Tool Calling | canonical id/slug 변경 |
| MCP | MCP | identity 유지 |
| 신규 | Skill | MCP와 Agent 사이에 재사용 가능한 능력 층 추가 |
| Agent | Agent | identity 유지 |
| Orchestration의 일부 | SubAgent | 위임 단위를 독립 Concept으로 승격 |
| Workflow | Workflow | identity 유지 |
| Orchestration | Orchestration | SubAgent 분리 후 관계 재설계 |
| Harness/Production의 일부 | Evaluation | 측정 층을 독립 Concept으로 승격 |
| Harness | Harness | Evaluation 다음의 실행 경계로 재정의 |
| Production AI | Production AI | 최종 운영 층으로 유지 |

## 3.2 세부 비교

| 관심사 | 현재 초안 | 승인 정본 | 필요한 변경 |
|---|---|---|---|
| 수량 | 12 `AtlasNode` | 21 `AtlasConcept` | order 1..21, 6 Arc |
| 식별자 | `id` 하나 | `conceptId` + `slug` | 내부 key와 URL 분리 |
| 섹션 | 13개 | 14개 | 순서 변경 + 2개 의미 분리 |
| 사례/프로젝트 | `실제 사용 사례` 1개 | `실제 사례` + `실제 프로젝트에서는` | 사실 사례와 시스템 적용 분리 |
| 시각화 | animation + demo | animation + interactive diagram | `demoId`를 `diagramId`로 바꾸고 Playground는 별도 계약 |
| 실습 | `practiceId` 예정 | chapter practice + `playgroundId` | 실습 서술과 시뮬레이션 id 연결 |
| 타입 | `AtlasNode` 단일 파일 | schema + 6 Arc concept modules + registries | 거대한 JSON 방지 |
| 라우트 | `/atlas/[nodeId]` | `/atlas/concepts/[conceptId]` | 새 canonical route 생성 후 old draft 제거 |
| Journey | 12개 세로 목록 | 6 Arc / 21 Concept | Arc grouping, 21 progress, 새 링크 |
| Chapter Shell | 13 section, 4 locked | 14 section, typed payload | section renderer registry 필요 |
| Progress | 별도 Provider/key | 기존 LearningState V2 | migration·dual write·rollback 필요 |
| 테스트 | 12/13 exact | 21/14 + registry integrity | legacy success assertion 전면 교체 |
| placeholder | 동일 파일 12개 | 21개 identity, 14 heading | 9개 추가, 3개 rename, 전부 14 heading |

## 3.3 13섹션에서 14섹션으로의 정확한 이동

```text
기존 5 대표 기업       → 신규 6 대표 기업
기존 6 대표 서비스     → 신규 7 대표 서비스
기존 7 실제 사용 사례  → 신규 5 실제 사례
신규 8 실제 프로젝트에서는 어떻게 사용하는가 추가
기존 8 애니메이션      → 신규 9 인터랙티브 애니메이션
기존 9 인터랙티브 데모 → 신규 10 인터랙티브 다이어그램으로 계약 변경
기존 10 실습           → 신규 11 실습
기존 11 퀴즈           → 신규 12 퀴즈
기존 12 관련 기술      → 신규 13 관련 기술
기존 13 다음 기술      → 신규 14 다음 기술
```

---

# 4. 21개 Concept Data Contract 초안

## 4.1 타입 초안

```ts
export type AtlasArcId =
  | "intelligence"
  | "generation"
  | "grounding"
  | "action"
  | "agency"
  | "reliability"

export type GroundedSummary = {
  readonly text: string
  readonly kbIds: readonly string[]
}

export type AtlasConcept = {
  readonly conceptId: string
  readonly slug: string
  readonly order: number
  readonly arc: AtlasArcId

  // Phase 1 identity registry에서는 null 허용.
  // published contract에서는 모두 GroundedSummary 필수.
  readonly definition: GroundedSummary | null
  readonly why: GroundedSummary | null
  readonly previousLimitation: GroundedSummary | null
  readonly breakthrough: GroundedSummary | null

  readonly lessonSlugs: readonly string[]
  readonly glossaryTerms: readonly string[]
  readonly kbIds: readonly string[]
  readonly relationshipIds: readonly string[]
  readonly timelineEventIds: readonly string[]

  readonly animationId: string | null
  readonly diagramId: string | null
  readonly playgroundId: string | null
  readonly quizId: string | null
  readonly nextConceptId: string | null
}
```

`null`은 “없어도 되는 콘텐츠”가 아니라 “후속 Evidence/Interaction Phase에서 아직 확보되지 않음”을 뜻한다. 두 검증 레벨을 둔다.

- **contract validator**: Phase 1부터 실행. identity, shape, order, 존재하는 참조의 무결성을 검사한다.
- **publish validator**: Phase 11부터 실행. narrative null 금지, 14섹션 완료, 필요한 interaction id와 KB 근거를 요구한다.

이 방식은 근거가 없는 concept에 가짜 문장·가짜 KB id를 넣는 것을 막는다.

## 4.2 21개 identity registry

| order | conceptId / slug | arc | nextConceptId |
|---:|---|---|---|
| 1 | `ai` | intelligence | `machine-learning` |
| 2 | `machine-learning` | intelligence | `deep-learning` |
| 3 | `deep-learning` | intelligence | `generative-ai` |
| 4 | `generative-ai` | generation | `llm` |
| 5 | `llm` | generation | `prompt-engineering` |
| 6 | `prompt-engineering` | grounding | `context-engineering` |
| 7 | `context-engineering` | grounding | `memory` |
| 8 | `memory` | grounding | `knowledge` |
| 9 | `knowledge` | grounding | `embedding` |
| 10 | `embedding` | grounding | `rag` |
| 11 | `rag` | grounding | `tool-calling` |
| 12 | `tool-calling` | action | `mcp` |
| 13 | `mcp` | action | `skill` |
| 14 | `skill` | action | `agent` |
| 15 | `agent` | agency | `subagent` |
| 16 | `subagent` | agency | `workflow` |
| 17 | `workflow` | agency | `orchestration` |
| 18 | `orchestration` | agency | `evaluation` |
| 19 | `evaluation` | reliability | `harness` |
| 20 | `harness` | reliability | `production-ai` |
| 21 | `production-ai` | reliability | `null` |

`conceptId`와 `slug`는 V2 초기에 같은 값을 사용한다. 두 필드를 분리하는 이유는 미래에 URL 표시를 바꾸더라도 관계·진행률의 내부 key를 유지하기 위해서다.

## 4.3 파일 분할

하나의 거대한 JSON을 만들지 않는다.

```text
src/content/atlas/
  schema.ts
  sections.ts
  arcs.ts
  concepts/
    intelligence.ts
    generation.ts
    grounding.ts
    action.ts
    agency.ts
    reliability.ts
    index.ts
  relationships.ts
  timeline.ts
  animations.ts
  diagrams.ts
  playgrounds.ts
  quizzes.ts
```

`concepts/index.ts`는 6개 Arc 배열을 합치기만 한다. 관계·타임라인·상호작용 registry는 별도 파일이 정본이며, Concept의 `*Ids`는 그 registry를 참조한다.

---

# 5. 14개 Chapter Section Contract

모든 `##` heading은 필수다. “선택”은 section 자체가 아니라 draft 단계 payload에만 적용된다.

| # | id / 제목 | payload 타입 | draft | publish | 근거 요구 | 기존 자산 연결 | 빌드 검증 |
|---:|---|---|---|---|---|---|---|
| 1 | `definition` / 한 줄 정의 | evidence markdown | null 허용 | 필수 | KB 1개 이상 | Glossary 정의 보조 | heading·KB id·인용 검사 |
| 2 | `why-emerged` / 왜 등장했는가 | evidence markdown | null 허용 | 필수 | 역사·배경 KB | Timeline과 연결 | 사실 문장 근거 |
| 3 | `previous-limitation` / 이전 기술의 한계 | evidence markdown | null 허용 | 필수 | 현재·이전 Concept KB | 이전 Why Bridge | order 1 예외, 나머지 prev 실존 |
| 4 | `breakthrough` / 무엇을 해결했는가 | evidence markdown | null 허용 | 필수 | 해당 Concept KB | 기존 Deep Dive 원리 | 인용·KB consumer |
| 5 | `real-cases` / 실제 사례 | cited case list | 빈 배열 허용 | 1개+ 또는 승인된 unavailable | 공식 사례 | 기존 project/lesson 링크 가능 | URL·checkedAt·KB |
| 6 | `companies` / 대표 기업 | cited entity list | 빈 배열 허용 | 1개+ 또는 승인된 unavailable | 공식 발표/문서 | Timeline actor | 광고성 문구 금지·근거 필수 |
| 7 | `services` / 대표 서비스 | cited entity list | 빈 배열 허용 | 1개+ 또는 승인된 unavailable | 공식 제품 문서 | Resource 링크 | URL·근거·현재성 |
| 8 | `project-usage` / 실제 프로젝트에서는 어떻게 사용하는가 | system pattern markdown | null 허용 | 필수 | KB + 검증된 Lesson | 100강·project-textbook | lesson slug·KB 역추적 |
| 9 | `animation` / 인터랙티브 애니메이션 | animation embed | id null 허용 | 필수 | caption 사실은 KB | animation registry | animationId 실존·step 무결성 |
| 10 | `interactive-diagram` / 인터랙티브 다이어그램 | diagram embed | id null 허용 | 필수 | label·관계는 KB/contract | 기존 SVG 재사용 가능 | diagramId·asset·alt 실존 |
| 11 | `practice` / 실습 | practice markdown + playground link | id null 허용 | 필수 | 새 사실 추가 금지 | Playground·기존 프로젝트 강의 | playgroundId 선택 시 실존 |
| 12 | `quiz` / 퀴즈 | quiz embed | id null 허용 | 필수 | 정답이 chapter/KB에서 도출 | Quiz registry | quizId·문항·해설 anchor |
| 13 | `related-tech` / 관련 기술 | derived references | 빈 배열 허용 | 필수 | 별도 서술보다 참조 무결성 | lessonSlugs·terms·edges | 모든 id 실존·edge가 concept에 연결 |
| 14 | `next-tech` / 다음 기술 | derived next bridge | final만 null | 필수 | next Concept의 previousLimitation | Journey next | order+1 일치, 마지막만 null |

## 5.1 Markdown 파서 규칙

1. `##` heading은 정확히 14개이고 순서가 동일해야 한다.
2. 중복 heading, 알 수 없는 heading, 누락 heading을 모두 오류로 처리한다.
3. 코드 fence 안의 `##`는 heading으로 세지 않는다.
4. section 9·10·12는 Markdown 본문에 임의 JSX를 넣지 않고 registry id를 frontmatter 또는 typed directive로 연결한다.
5. section 13·14는 중복 수작업 데이터보다 Concept registry에서 파생한다.
6. draft placeholder는 `pending` 상태로 명시하며 publish validator에서 실패해야 한다.

---

# 6. 참조 무결성

## 6.1 현재 저장소 기준선

| 자산 | 실측 | 무결성 |
|---|---:|---|
| Lesson metadata | 100 | unique slug 100 |
| Lesson Markdown | 100 | missing 0, extra 0 |
| Glossary | 456 | unique term 456 |
| KB | 90 | unique id 90, approved 90, score<80 0 |
| SVG diagram | 78 | Markdown reference 78, missing 0, unreferenced 0 |

현재 12노드 초안의 참조는 다음과 같다.

| 참조 종류 | unique 수 | 현재 결과 |
|---|---:|---|
| `lessonSlugs` | 26 | 전부 100강 metadata에 존재 |
| `glossaryTerms` | 27 | 전부 456개 exact term에 존재 |
| `kbIds` | 16 | 전부 90개 KB에 존재하고 approved |
| `diagramId` | 0 | 계약 자체가 없음 |

이 결과는 기존 26/27/16 연결이 “존재한다”는 뜻이다. 21개 Concept에 어떻게 재배치할지까지 승인한 것은 아니다.

## 6.2 새 정본의 탐지 방식

빌드 시 다음 Set/registry를 만든다.

```text
lessonSlugSet       = curriculum.ts 100개 + markdown 파일 100개 교집합
glossaryTermSet     = glossary.ts exact term 456개
approvedKbIdSet     = frontmatter status=approved AND score>=80
diagramRegistry     = 기존 78 SVG + 향후 Atlas SVG의 typed id
relationshipIdSet  = relationships.ts unique id
timelineEventIdSet = timeline.ts unique id
interactionIdSets  = animation/diagram/playground/quiz registries
conceptIdSet        = 21개 identity
```

검사 규칙:

1. 모든 참조 id는 대응 Set에 존재해야 한다.
2. KB는 파일 존재만이 아니라 `status: approved`, `score >= 80`을 요구한다.
3. `relationshipIds`의 edge는 해당 concept를 `from` 또는 `to`로 포함해야 한다.
4. `timelineEventIds`의 event `conceptId`는 해당 concept와 일치해야 한다.
5. `diagramId`는 실제 SVG 파일과 alt text registry를 동시에 요구한다.
6. `nextConceptId`는 마지막 concept 외에는 order+1과 일치해야 한다.
7. orphan registry item도 보고한다. 존재하지만 어떤 Concept에서도 소비하지 않는 animation/quiz/event를 경고한다.
8. 오류 메시지는 `conceptId`, field, bad id, expected registry를 함께 표시한다.

## 6.3 근거 gap 처리

KB id 이름만 기준으로 볼 때 `machine-learning`, `deep-learning`, `generative-ai`, `llm`, `memory`, `knowledge`, `workflow`, `production-ai` 전용 KB id는 없다. 일부는 `ai-era-timeline`, `tokenization-context`, `context-caching`, `orchestration`, 운영 KB에 관련 내용이 있을 수 있으나, 자동 배정하지 않는다.

Phase 1은 이 항목의 `kbIds`를 추정으로 채우지 않는다. Phase 3 시작 전 KB gap matrix를 만들고, 기존 approved KB의 실제 본문이 충분한지 P-02 수준으로 확인한다. 부족하면 기존 P-01~P-03 절차를 사용한다.

---

# 7. Progress V1 → V2 영향

## 7.1 현재 상태

- 기존 공개 key: `ai-vibe-coding-master-learning-state`
- 보존 대상: `completedLessons`, `checklistItems`, `bookmarks`, `lastReadLessonSlug`, `lastReadAt`
- 현재 미커밋 Atlas key: `ai-vibe-coding-master-atlas-progress`
- 현재 미커밋 Atlas 값: version 1, `chapterRead`, `quizPassed`, `lastNodeId`

현재 Atlas key 코드는 배포되지 않았지만 로컬 개발 브라우저에는 값이 있을 수 있으므로 migration input으로만 인식한다.

## 7.2 권장 V2 전략

한 Provider에서 하나의 도메인 상태를 제공하되 rollback 기간에는 localStorage를 dual-write한다.

```text
V1 key: ai-vibe-coding-master-learning-state
  - 기존 앱 rollback을 위해 V1 projection 유지

V2 key: ai-vibe-coding-master-learning-state-v2
  - lesson + bookmark + checklist + atlas 전체 상태

legacy Atlas key: ai-vibe-coding-master-atlas-progress
  - 최초 migration input으로만 읽고 자동 삭제하지 않음
```

## 7.3 Migration 순서

1. V2 key가 정상이라면 그것을 사용한다.
2. 없으면 V1 key를 strict parse하고 lesson/bookmark/checklist를 그대로 복사한다.
3. legacy Atlas key가 정상이라면 12 old id를 canonical id로 매핑 가능한 항목만 병합한다.
4. `prompt→prompt-engineering`, `context→context-engineering`, `tool→tool-calling`은 명시적 map으로 이동한다.
5. AI·Context처럼 여러 새 Concept로 분해된 old 완료는 **자동으로 여러 Concept 완료로 복제하지 않는다.** 원래 macro id에 가장 직접 대응하는 Concept 하나만 읽음 이력으로 이전하고, 나머지는 미완료로 둔다.
6. 성공 후 V2 key를 기록하고 V1 projection도 함께 기록한다.
7. legacy key와 V1 원본은 자동 삭제하지 않는다.

## 7.4 손상 데이터 복구

- 전체 parse 실패 시 즉시 empty로 덮어쓰지 않는다.
- 원문을 `...-recovery` key에 보존하고 field 단위 salvage를 시도한다.
- 배열이 아닌 필드는 제외하되 정상 배열은 유지한다.
- unknown lesson slug나 concept id는 삭제하지 않고 `orphaned` recovery 목록에 둔다.
- 사용자에게 “복구 가능한 기록 있음 / 초기화” 선택을 제공하기 전 자동 reset하지 않는다.

## 7.5 Rollback

- V1 key는 dual-write 기간 동안 계속 최신 lesson projection을 유지한다.
- V2 배포를 rollback하면 기존 앱은 V1 key를 그대로 읽는다.
- V2 key와 legacy Atlas key는 rollback 시 삭제하지 않는다.
- 적어도 한 번의 안정 릴리스와 사용자 확인 전에는 dual-write를 제거하지 않는다.

필수 테스트:

```text
empty → V2
정상 V1 → V2
정상 V1 + legacy Atlas → V2 merge
분해 node 완료의 과잉 승격 방지
손상 JSON
부분 손상 field
중복 배열
unknown slug/id
V2 → V1 projection rollback
reset 범위
```

---

# 8. 기존 기능 회귀 영향

| 기능 | Phase 1 직접 영향 | 위험 | 방어선 |
|---|---|---|---|
| `/curriculum` | 없음 | progress type 변경 시 읽음 표시 영향 | Phase 1에서는 기존 provider 미수정, Phase 4 migration test 후 변경 |
| `/lessons/[slug]` | 없음 | 완료·북마크·last read 유실 | V1 projection·기존 컴포넌트 회귀 테스트 |
| `/glossary` | 없음 | term type를 전역 변경하면 필터 영향 | Atlas term map을 별도 additive 파일로 유지 |
| `/resources` | 없음 | 없음 | 파일 diff 0 확인 |
| 검색 | Phase 1 없음 | SearchEntryKind 확장 시 SiteHeader 분기 누락 | 검색 확장은 Phase 10, exhaustive kind test 추가 |
| static export | Concept identity 추가만으로는 없음 | route 구현 시 params 누락 | Phase 2에서 21 static params exact 검사 |
| sitemap | Phase 1 없음 | 현재 script가 Atlas URL을 전혀 포함하지 않음 | Phase 2/11에서 concept 21 + Atlas static route 생성 로직 추가 |
| Firebase | Phase 1 없음 | clean URL·404·캐시 | `firebase.json` 유지, release 단계 live smoke |

## 8.1 정적 페이지 증가 예상

- 현재 미커밋 초안: `/atlas` 1 + 12 chapter = **13페이지 증가**.
- 승인 IA의 첫 UI 범위: `/atlas` + `/atlas/journey` + 21 Concept = **23페이지 증가**.
- Graph, Timeline, Playground index, Progress, MVP Playground 4개까지 포함하면 총 **31페이지 안팎 증가**.

Phase 1 Data Contract 자체는 route를 공개하지 않으므로 페이지 수를 증가시키지 않는 것이 안전하다. Phase 2부터 build output의 실제 page count와 route list를 기록한다.

## 8.2 기존 URL 회귀

`/atlas/[nodeId]`는 커밋·배포된 적이 없으므로 public redirect 의무는 없다. 다만 로컬 bookmark 가능성을 위해 새 canonical route가 완성될 때까지 현 파일을 삭제하지 않는다. 삭제 전 검색으로 `/atlas/{id}` 하드코딩 0건을 확인한다.

---

# 9. 예상 수정 파일

## 9.1 Phase 1 신규

```text
src/content/atlas/schema.ts
src/content/atlas/sections.ts
src/content/atlas/arcs.ts
src/content/atlas/concepts/intelligence.ts
src/content/atlas/concepts/generation.ts
src/content/atlas/concepts/grounding.ts
src/content/atlas/concepts/action.ts
src/content/atlas/concepts/agency.ts
src/content/atlas/concepts/reliability.ts
src/content/atlas/concepts/index.ts
src/content/atlas/relationships.ts
src/lib/atlas-reference-integrity.ts
src/lib/atlas-reference-integrity.test.ts
```

`timeline.ts`, interaction registry는 full schema만 정의하고 실제 항목은 해당 후속 Phase에서 추가해도 된다. 빈 registry는 허용하되 dangling id는 허용하지 않는다.

## 9.2 Phase 1 수정

```text
src/content/atlas.ts
src/lib/atlas.ts
src/lib/atlas.test.ts
src/content/atlas/chapters/*.md  # 14-heading skeleton 계약으로만 조정
```

현재 UI가 새 타입 때문에 typecheck를 막는 최소 범위에서 아래 파일의 field 이름만 호환 조정할 수 있다. UI 기능 구현은 Phase 2로 넘긴다.

```text
src/app/atlas/page.tsx
src/features/atlas/JourneyMap.tsx
src/features/atlas/ChapterShell.tsx
```

## 9.3 Phase 1 유지·무수정

```text
src/content/curriculum.ts
src/content/glossary.ts
src/content/lessons/markdown/*.md
src/content/lessons/diagrams/**/*.svg
src/content/resources.ts
src/app/curriculum/**
src/app/lessons/**
src/app/glossary/**
src/app/resources/**
ai-ops/agents/**
ai-ops/prompts/P-01~P-09
firebase.json
next.config.ts
scripts/generate-sitemap.mjs
```

## 9.4 삭제 후보 — 이번 보고 단계에서는 삭제 금지

```text
src/app/atlas/[nodeId]/page.tsx
src/features/atlas/AtlasProgressProvider.tsx
src/lib/atlas-progress.ts
src/content/atlas/chapters/prompt.md
src/content/atlas/chapters/context.md
src/content/atlas/chapters/tool.md
ai-ops/ATLAS-P1-PENDING.md
```

삭제 조건:

1. 대응 새 파일이 먼저 존재한다.
2. reference search가 old path/import 0건임을 확인한다.
3. targeted test와 typecheck가 통과한다.
4. 삭제 파일과 재사용된 로직을 완료 보고에 대조한다.

## 9.5 후속 Phase 수정 예정

```text
Phase 2: src/components/layout/SiteHeader.tsx, src/app/atlas/**, Atlas UI
Phase 4: src/lib/progress.ts, LearningStateProvider.tsx, progress tests
Phase 10: src/content/schema.ts SearchEntryKind, search-index.ts, GlossaryBrowser
Phase 11: scripts/generate-sitemap.mjs, QA reports
```

---

# 10. 위험과 대응

| 위험 | 수준 | 대응 |
|---|---|---|
| 미커밋 코드 충돌 | 높음 | 현재 24파일 목록·hash 기준선을 유지하고, 새 파일을 먼저 만든 후 old 파일을 단계적으로 전환한다. 작업 시작 전 git log/status 재대사. |
| localStorage 손실 | 매우 높음 | Phase 1에서는 provider 미수정. Phase 4에서 V1/V2 dual-write, recovery key, migration/rollback tests 후 적용. |
| 정적 페이지 증가 | 중간 | Phase 1 route 증가 0. Phase 2부터 실제 route count 기록, 21 params exact 검증. |
| 참조 누락 | 높음 | Set 기반 build validator, approved+score KB 검사, dangling/orphan 양방향 검사. |
| 번들 증가 | 낮음(Phase 1) | Phase 1은 data/server-side loader 중심. Graph/motion library 추가 금지. |
| 기존 URL 회귀 | 중간 | 기존 public URL 무수정. uncommitted old Atlas route는 canonical route 통과 후 제거. |
| 근거 없는 21개 매핑 | 높음 | identity만 확정하고 narrative/ref는 null/empty 허용. 실제 KB 본문 확인 전 자동 배정 금지. |
| 14섹션 placeholder가 완성 콘텐츠로 노출 | 높음 | draft/publish validator 분리, pending section은 release gate에서 실패. |
| 관계 데이터 중복 | 중간 | edge registry가 endpoint SSOT. `relationshipIds`는 curated ordering만 담당하고 edge가 concept를 포함하는지 검사. |
| STATE/MASTER 상태 드리프트 | 중간 | Phase 완료 때 실제 파일 수·test result로 상태를 갱신하고 상호 집계 검사를 후속 추가. |

---

# 11. Phase 1 구현 단위

Phase 1은 한 번에 UI를 완성하는 단계가 아니다. 다음 5개 단위로 제한한다.

## Unit 1 — Legacy Snapshot & Safe Boundary

- 구현 순서: git 재대사 → 24개 파일 존재·hash 확인 → 작업 소유 범위 선언.
- 테스트: 시작 전 status와 보고서 목록 일치.
- QA: 기존 사용자 변경이 섞이지 않았는지 확인.
- 완료 조건: 삭제 없이 안전 경계 확정.

## Unit 2 — Schema & 14 Section Contract

- 구현 순서: `schema.ts` → `sections.ts` → draft/publish validator.
- 테스트: 6 Arc enum, 14 id/title/order, duplicate/unknown/missing section failure.
- QA: PRD 14섹션과 글자 단위 대조.
- 완료 조건: legacy 13섹션 입력이 실패하고 canonical 14섹션 fixture가 통과.

## Unit 3 — 21 Concept Identity Registry

- 구현 순서: 6개 Arc 파일 → index aggregate → order/next validator.
- 테스트: exactly 21, unique conceptId/slug, order 1..21, next chain, Arc coverage.
- QA: narrative와 참조를 추정으로 채우지 않았는지 diff 검토.
- 완료 조건: 21 identity와 6 Arc만 확정, evidence gap이 명시됨.

## Unit 4 — Reference Integrity Index

- 구현 순서: Lesson/Term/approved KB/Diagram registry 수집 → Concept ref validator → orphan report.
- 테스트: 현재 100/456/90/78 기준선, bad fixture별 명확한 오류.
- QA: KB `status`와 `score`를 함께 검사하는지 확인.
- 완료 조건: 존재하지 않는 lesson/term/KB/asset/id를 build 전에 탐지.

## Unit 5 — Legacy Adapter & Clean Verification

- 구현 순서: 기존 `atlas.ts/lib/UI`의 최소 type adapter → 12 placeholder를 14 skeleton로 안전 전환 → 9 identity skeleton 추가 → old route/progress 삭제 후보는 보류.
- 테스트: Atlas targeted tests, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
- QA: 기존 100강·456용어·78 SVG·Progress 파일 diff 0, static route가 의도치 않게 공개되지 않았는지 확인.
- 완료 조건: 새 data contract가 통과하고 기존 제품 기능에 변경이 없으며, 미커밋 legacy 파일의 다음 판정이 명시됨.

## 예상 커밋 범위

승인 후에도 한 커밋에 UI·Progress·Content 생산을 섞지 않는다.

```text
ATLAS-P1a: define 21-concept and 14-section data contracts
ATLAS-P1b: add atlas reference integrity and legacy reconciliation tests
```

Phase 1에서 제외:

- Atlas 전역 메뉴 공개
- canonical Concept UI 완성
- Progress V2 migration 적용
- Story 콘텐츠 작성
- Timeline/Graph/Animation/Playground/Quiz 구현
- sitemap·Firebase 변경
- 배포

## Phase 1 완료 조건

1. 21 identity와 6 Arc가 정확하다.
2. 14 section contract가 정확하다.
3. 존재하는 모든 참조가 100 Lesson, 456 Term, approved KB 90, Diagram registry 중 하나로 해결된다.
4. 미확보 narrative/ref는 null/empty로 남고 추정값이 없다.
5. legacy 12/13 성공 테스트가 새 21/14 테스트로 교체된다.
6. 기존 100강 본문과 용어집 diff 0이다.
7. Progress·검색·sitemap·Firebase는 변경하지 않는다.
8. lint, typecheck, test, build가 통과한다.
9. 모든 삭제 후보는 대응 새 파일과 검증이 완료될 때까지 보존된다.

---

# 최종 상태

구조적 blocker는 없다. 현재 초안의 일부는 수정 후 재사용 가능하며, 근거가 불명확한 신규 Concept 연결은 비워 두는 2단계 계약으로 안전하게 Phase 1을 진행할 수 있다. 다음 단계는 운영자의 **Phase 1 구현 승인**이다.

READY_FOR_PHASE_1_IMPLEMENTATION_APPROVAL
