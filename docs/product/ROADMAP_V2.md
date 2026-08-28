# 구피티(Goopti) V1 Development Roadmap v2

**Version:** 2.0-draft  
**Author:** Hermes PM · JT-003 · V1 Planning  
**Status:** Draft — awaiting operator review  
**Last Updated:** 2026-08-12  
**Parent Product Definition:** [`PRODUCT_DEFINITION.md`](./PRODUCT_DEFINITION.md)  
**Curriculum Analysis:** [`CURRICULUM_ANALYSIS.md`](./CURRICULUM_ANALYSIS.md)  
**AI Ops Reconciliation:** [`AI_OPS_RECONCILIATION.md`](./AI_OPS_RECONCILIATION.md)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Phase 1: Foundation (W1-W2) — Curriculum Integration](#phase-1-foundation-w1-w2--curriculum-integration)
3. [Phase 2: Community MVP (W3-W4) — Social Features](#phase-2-community-mvp-w3-w4--social-features)
4. [Phase 3: Polish & QA (W5-W6) — Quality Improvements](#phase-3-polish--qa-w5-w6--quality-improvements)
5. [Resource Allocation](#resource-allocation)
6. [Risk Register](#risk-register)
7. [Success Metrics (KPIs)](#success-metrics-kpis)
8. [Rollback Plan](#rollback-plan)
9. [File Structure After Implementation](#file-structure-after-implementation)
10. [Appendix A: Task Priority Matrix](#appendix-a-task-priority-matrix)
11. [Appendix B: Firestore Schema Reference](#appendix-b-firestore-schema-reference)
12. [Appendix C: Module-to-Lesson Map](#appendix-c-module-to-lesson-map)
13. [Appendix D: Tag Normalization Blueprint](#appendix-d-tag-normalization-blueprint)

---

## 1. Executive Summary

### 1.1 Overview

구피티(Goopti)는 **커뮤니티 중심 교육 아카이브**입니다. 이 로드맵은 V1 개발의 전체 범위를 6주간(3フェイズ)에 걸쳐 정의합니다. 핵심 목표는 세 가지 영역을 완성하는 것입니다:

| 영역 | 설명 | 기간 |
|------|------|------|
| **Learning Core** | 13개 모듈 100개 강의의 체계적인 통합과 렌더링 | W1–W2 (Phase 1) |
| **Community MVP** | 인증·게시글·댓글·좋아요 기반 커뮤니티 기능 활성화 | W3–W4 (Phase 2) |
| **Admin & Polish** | 관리자 대시보드·고급 검색·성능 최적화·보안 검토 | W5–W6 (Phase 3) |

### 1.2 Product Context

구피티의 핵심 가치는 다음 네 기둥 위에 세워집니다 (PD §3):

| 원칙 | 의미 |
|------|------|
| **P1. 직접 해보기 (Learn by Doing)** | 모든 개념은 "설명 → 따라하기 → 확인"의 순환으로 제공됩니다 |
| **P2. AI 보조 개발 (AI-Assisted Dev)** | 플랫폼 자체도 AI 코딩 도구로 개발되며, 그 과정 자체가 학습이 됩니다 |
| **P3. 커뮤니티 주도 진화 (Community-Driven Progression)** | 콘텐츠는 영원히 완성되지 않습니다. 공동체가 지속적으로 개선합니다 |
| **P4. 점진적 난이도 (Progressive Difficulty)** | 입문 → 기초 → 중급 단계가 자연스러운 학습 경로를 만듭니다 |

현재 커리큘럼 분석 (CURRICULUM_ANALYSIS.md) 에 따르면:
- **100개 마크다운 강의**가 13개 모듈에 분포 (총 약 103시간 분량)
- 프론트메타는 9개 필드로 완벽하게 일관됨, 그러나 **태그 분리 문제** 심각 (309개 고유 태그, 84.7% 단일 사용)
- 수준 분포: 입문 6%, 기초 41%, 중급 53%
- `curriculum.ts`는 전방 링크가 없고, 빌드타임 레지스트리로 보완 필요

AI Ops 정합성 (AI_OPS_RECONCILIATION.md) 에 따르면:
- 기존 `ai-ops/` 문서 (~834개) 는 26개 KEEP / 719개 ARCHIVE / 70개 DELETE 로 분류됨
- V3.2 운영 계약은 `docs/workflows/V3_WORKFLOW.md` 등 6개 핵심 문서로 유지
- GooPiTi Phase 1 PRD (`PRD-GOOPTI-PHASE1.md`) 는 보류 상태이지만 현재 작업의 SSOT

### 1.3 Success Criteria (KPI Targets)

| KPI | Target | 측정 방법 |
|-----|--------|----------|
| 학습 완료율 | > 40% | `lessons_progress` 컬렉션 기준 |
| 커뮤니티 참여도 |avg 3+ 댓글/게시글 | Firestore 집계 쿼리 |
| 첫값 도달 시간 | < 30초 | 랜딩 → 첫 강의까지 |
| 개발 속도 | W2 커리큘럼 완료, W4 커뮤니티 오픈, W6 프로덕션 준비 | 깃 커밋 히스토리 기준 |
| 모바일 성능 점수 | ≥ 90 (Lighthouse) | Lighthouse CI |
| 접근성 준수 | WCAG 2.1 AA 합격 | axe-core 검증 |

---

## Phase 1: Foundation (W1-W2) — Curriculum Integration

### Goal

100개 강의를 앱에 통합하여 모듈별 탐색, 렌더링, 필터링이 가능한 상태로 만듭니다. 커리큘럼 데이터 레이어를 스테이시에서 복원하고, 빌드타임 레지스트리를 생성하며, Markdown 렌더러를 연결합니다.

### Precondition Check List

- [ ] Branch `symphony/AVM-JT-003` exists and is clean from main HEAD (`c0091b5`)
- [ ] `PRODUCT_DEFINITION.md` approved by operator
- [ ] `CURRICULUM_ANALYSIS.md` reviewed — tag normalization strategy understood
- [ ] Firestore project created and credentials available (`.env.local`)
- [ ] Firebase Auth configured (Email/Google OAuth providers enabled)
  - **2026-08-28 verified, still open:** live production repro (real trusted
    click, not synthetic `.click()`) confirms Google AND GitHub sign-in both
    fail with `auth/operation-not-allowed` — neither provider is enabled in
    the Firebase Console for `ju0o-ec967`. Both buttons temporarily disabled
    client-side (`src/lib/firebase/auth-provider-config.ts`) per Owner
    directive rather than left presenting as functional. Owner action
    required (Console-only; not performed by this Task — see
    `GUPITI-OWNER-P0-AUTH-01` final report).
- [ ] Stash `stash@{0}` verified accessible (all 100 lessons present)
- [ ] TypeScript strict mode passes on base branch

### P1 Tasks Detail

#### P1-1: LESSON_REGISTRY 빌더 스크립트

**Priority:** 🔴 Critical Path  
**Estimated Effort:** 2 days  
**Owner:** Developer  

**Description:**  
TypeScript 빌드 툴이 100개 강의의 frontmatter를 읽어서 정규화된 타입 안정 아티팩트를 생성합니다. CURRICULUM_ANALYSIS.md §9.3 Option A (Registry Generator) 제안에 따릅니다.

**Implementation Steps:**

1. **프론트메타 파싱 엔진 구축**
   - YAML frontmatter 블록 추출 (`---` 구분자 기반)
   - 9개 필드 모두 파싱: `slug`, `moduleId`, `order`, `title`, `summary`, `level`, `type`, `minutes`, `tags`
   - 각 필드에 대한 유효성 검사 수행

2. **스키마 검증 계층**
   - `LessonMeta` 인터페이스 정의 (src/content/schema.ts 기준)
   - `moduleId` 가 CURRICULUM_MODULES 의 실제 모듈 ID 인지 검증
   - `level` 값이 `"입문"` / `"기초"` / `"중급"` 중 하나인지 검증
   - `type` 값이 `"deep-dive"` / `"reference"` 중 하나인지 검증
   - `minutes` 가 양의 정수인지 검증
   - `tags` 배열 내 중복 항목 제거

3. **생성물产出 구조**
   ```typescript
   // src/content/__generated__/lesson-registry.generated.ts
   export const LESSON_REGISTRY = {
     // 모듈별 강의 목록 (순서대로 정렬)
     byModule: Record<ModuleId, ReadonlyArray<LessonMeta>>,
     
     // 평면 인덱스 (검색/색인에 사용)
     all: ReadonlyArray<LessonMeta>,
     
     // 모듈 집계 통계
     moduleStats: Record<ModuleId, ModuleStat>,
   
     // 정규화된 전역 태그 집합
     globalTagSet: ReadonlySet<string>,
   };
   ```

4. **빌드 연동**
   - `package.json scripts` 에 `generate:lessons` 추가
   - `npm run build` 전에 자동 실행되도록 설정
   - Gitignore 에 `__generated__/` 포함

**Exit Criteria:**
- [ ] `npm run generate:lessons` 이 성공적으로 실행됨
- [ ] `byModule["getting-started"]` 등 모든 모듈에 해당 강의가 포함되어 있음
- [ ] `moduleStats["ai-system-design"].totalMinutes === 1020` 등 정확성 검증 통과
- [ ] 생성된 파일이 TypeScript strict mode 에서 컴파일 오류 없이 import됨
- [ ] 프론트메타 스키마 위반 시 명확한 에러 메시지 출력

**Dependencies:** None

---

#### P1-2: curriculum.ts 전방 참조 수정

**Priority:** 🔴 Critical Path  
**Estimated Effort:** 0.5 days  
**Owner:** Developer  

**Description:**  
CURRICULUM_ANALYSIS.md §8 에서 지적한 대로 `curriculum.ts` 의 `CurriculumModule` 타입은 강의 슬러그 전방 참조가 없습니다. LESSON_REGISTRY 가 생성한 데이터를 활용하여 모듈 객체에 자식 강의 목록을 보충합니다.

**Approach:** 두 가지 전략 중 선택:

- **전략 A (권장):**LESSON_REGISTRY 생성물을 `curriculum.ts` 에 import 하여 확장된 타입을 export
- **전략 B:** `curriculum.ts` 의 `CurriculumModule` 타입에 선택적 `lessons?: LessonSlugRef[]` 필드 추가

```typescript
// Strategy B example:
export type CurriculumModule = {
  readonly id: ModuleId
  readonly order: number
  readonly title: string
  readonly description: string
  readonly goal: string
  readonly lessons?: readonly { slug: string; order: number }[]  // ← NEW
}
```

**Exit Criteria:**
- [ ] `CURRICULUM_MODULES[0].lessons` 에 해당하는 4개의 슬러그가 포함되어 있음
- [ ] 각 모듈이 해당 강의 수를 정확히 가짐 (예: ai-system-design=17, project-textbook=9)
- [ ] 전방 참조가 없는 경우 graceful degradation 으로 동작함
- [ ] 기존 API 호환성 유지 (선택적 필드)

**Dependencies:** P1-1 (LESSON_REGISTRY 생성물)

---

#### P1-3: 태그 정규화 스크립트

**Priority:** 🟡 High — Impacts discoverability quality  
**Estimated Effort:** 1.5 days  
**Owner:** Developer + Human Review  

**Description:**  
CURRICULUM_ANALYSIS.md §4 에서 진단한 바와 같이, 309개 고유 태그 중 84.7% 가 한 번만 사용됩니다. 이 문제를 해결하기 위해 다음과 같은 정규화 파이프라인을 구축합니다:

**Step 1: 동의어 병합 맵 구축**

```typescript
// src/content/tags/synonym-map.ts
const SYNONYM_MAP: Record<string, string> = {
  // English ↔ Korean equivalents
  "RAG 챗봇": "RAG",
  "Context Caching": "Prompt Caching",
  "도구 루프": "Tool Server",
  "Agent Loop": "Agent",
  
  // Capitalization normalizations
  "api": "API",
  "rag": "RAG",
  "mcp": "MCP",
  
  // Duplicate concepts
  "GitHub Copilot": "Copilot",
  "Firebase": "Firestore",
};
```

**Step 2: 모듈 기본 태그 자동 주입**

각 모듈의 주제별로 고정 태그를 자동으로 inject 합니다:

| 모듈 ID | 자동 주입 태그 |
|---------|---------------|
| `getting-started` | ["Vibe Coding", "Karpathy", "바이브코딩"] |
| `development-basics` | ["Terminal", "Git", "CLI", "개발 환경"] |
| `web-basics` | ["HTML", "CSS", "JavaScript", "HTTP"] |
| `frontend-frameworks` | ["React", "Next.js", "TypeScript", "Tailwind CSS"] |
| `git-collaboration` | ["Git", "Pull Request", "GitHub Actions"] |
| `data-backend` | ["PostgreSQL", "REST", "백엔드", "JSON"] |
| `deployment-ops` | ["배포", " Twelve-Factor", "모니터링"] |
| `ai-basics` | ["LLM", "프롬프트 엔지니어링", "AI 기초"] |
| `ai-coding-tools` | ["Claude Code", "Codex", "Grok", "Copilot"] |
| `ai-system-design` | ["Agent", "MCP", "Tool Calling", "RAG", "Context Engineering"] |
| `practical-vibe-coding` | ["실전", "프로젝트", "검증", "Human Review"] |
| `explanation-practice` | ["Explanation", "설명 연습", "Verification"] |
| `project-textbook` | ["Capstone", "실전 프로젝트", "종합"] |

**Step 3: 최종 태그 집합 확정**

목표: 309 → ~80개 핵심 태그 (CURRICULUM_ANALYSIS.md §9.4 권장)

**Target Tag Glossary (80개):**

```
[Agent, MCP, Tool Calling, RAG, Prompt Caching, Context Engineering, 
 LLM, 프롬프트 엔지니어링, Claude Code, Codex, Grok, Copilot, Vibe Coding,
 Next.js, React, TypeScript, Tailwind CSS, JavaScript, HTML, CSS,
 PostgreSQL, REST, JSON, HTTP, 백엔드, Firestore, 배포, Git, GitHub Actions,
 Pull Request, Terminal, CLI, Sandbox, Verification, Human Review, 
 Evals, Hallucination, Retrieval, DOM, IntelliSense, Browser, SEO,
 Responsive Design, Security, Rate Limits, Authentication, Session, Token,
 Playwright, CodeQL, Monitoring, Error Tracking, Rollbacks, Environment,
 Secrets, Deployment, Pipeline, CI/CD, npm, package management, diff,
 rebase, merge, Commit, Workflow, Skills, Citation, Cloud Agent,
 Karpathy, Explanation, Reference, Deep Dive, 입문, 기초, 중급]
```

**Step 4: ESLint 규칙 또는 pre-commit hook**

새 강의 작성 시 허용된 태그 목록을 검증하는 lint 규칙 추가.

**Exit Criteria:**
- [ ] 고유 태그 수 ≤ 100 (목표 ~80)
- [ ] 기존 강의 100개 모두 재검토 후 변경 기록 남김 (append-only policy)
- [ ] 정규화된 태그로 모듈 내 필터링이 의미 있는 결과 반환
- [ ] Synonym map 이 변경 이력과 함께 버전 관리됨
- [ ] pre-commit hook 이 새 태그 등록 시 경고 출력

**Dependencies:** None (can run as standalone script alongside P1-1)

---

#### P1-4: 강의 목록 페이지 라우트

**Priority:** 🔴 Critical Path  
**Estimated Effort:** 2 days  
**Owner:** Developer  

**Description:**  
PD §4.1 과 §5.1 에 정의된 정보 구조에 따라 강의 인덱스 페이지와 상세 페이지를 구현합니다. MDX 렌더러를 사용하여 마크다운 본문을 안전한 HTML로 변환합니다.

**Route 구현 상세:**

**(`/lessons` — 강의 인덱스)**

```
┌───────────────────────────────────────────────────┐
│                  Navbar                             │
│  홈  강의  실천  커뮤니티  대시보드  [로그인]       │
└───────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────┐
│  강의 목록                                          │
│                                                   │
│  [모든 모듈] [시작하기] [개발 기초] [웹 개발 기초] ... │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ [AI 바이브코딩이란 무엇인가]           │          │
│  │ 레벨: 입문 | ⏱ 40분 | #VibeCoding    │          │
│  │ 요약: AI와 함께 개발하는 새로운 패러다임 │          │
│  │                                     │          │
│  │      [자세히 보기 →]                  │          │
│  └─────────────────────────────────────┘          │
│  └─────────────────────────────────────┘          │
│  ... (card grid layout)                            │
│                                                   │
│  총 100개 강의 │ 시작하기: 4 | 개발 기초: 7 | ...   │
└───────────────────────────────────────────────────┘
```

- **모듈 탭 필터**: 13개 모듈을 가로 스크롤 가능한 탭으로 표시
- **레벨 필터 버튼**: `[입문] [기초] [중급]` — 드롭다운 또는 피버트 버튼
- **태그 검색**: 텍스트 입력창에서 키워드 검색 (tag 이름 매칭)
- **결과 카운트**: 각 필터 조합에 대해 실시간 결과 수 표시
- **강의 카드 구성**: 제목, 레벨 뱃지, 예상 소요시간(⏱), 주요 태그 최대 3개

**(`/lessons/[slug]` — 강의 상세)**

```
┌───────────────────────────────────────────────────┐
│  Navbar                                             │
├──────────┬────────────────────────────────────────┤
│ TOC      │  AI 바이브코딩이란 무엇인가               │
│          │                                         │
│ • 소개    │  > 왜 존재하는가                         │
│ • 작동    │  > [!NOTE] 이 강의는 ...                 │
│ • 세부    │                                         │
│ • 실전    │  ## 작동 원리                           │
│ • 원문    │  ...                                    │
│          │  ### 코드 예제                           │
│          │  ```tsx                                   │
│          │  const greeting = "Hello";               │
│          │  ```                                      │
│          │                                         │
│  -------- │  ---                                    │
│          │  [관련 강의]                              │
│          │  • AI 개발 환경 설계 가이드                │
│          │  • 개발자 지도 읽기                        │
│          │                                         │
│          │  [💬 커뮤니티에서 토론하기 →]              │
└──────────┴────────────────────────────────────────┘
```

- **TOC (Side Panel):** 헤딩 파싱 → 자동 생성 목차, 스크롤 따라active state 변경
- **본문 렌더링:**
  - 안전 HTML 출력 (DOMPurify 적용, `<script>` 태그 차단)
  - 코드 블럭 구문 강조 (shiki or prism.js)
  - 호출아웃/admonition 지원 (`> [!WARNING]`, `> [!NOTE]`, `> [!TIP]`)
  - `/lesson-diagrams/` 경로 이미지 리졸브
- **관련 강의:** 동일 `moduleId` 의 다른 강의 목록 (상단/하단에 표시)
- **커뮤니티 연결:** 하단에 "커뮤니티에서 토론하기" CTA 버튼
- **추천/읽은 시간 표시:** 프론트메타 `minutes` 값 기반 "(약 XX분 읽을 예정)"

**Acceptance Mapping:** 이 task 는 PD AC-1, AC-6 와 직접 연결됩니다.

**Exit Criteria:**
- [ ] `/lessons` 페이지에서 100개 강의 카드가 렌더링됨
- [ ] 모듈 탭 클릭 시 해당 모듈 강의만 필터링됨
- [ ] `/lessons/ai-vibe-coding-orientation-karpathy` 등 모든 slug URL 이 404 없이 동작
- [ ] 마크다운 본문이 안전하게 HTML 변환됨 (XSS 테스트 통과)
- [ ] 관련 강의 섹션이 올바르게 표시됨
- [ ] 커뮤니티 연결 CTA 버튼이 `/community/posts` 로 이동

**Dependencies:** P1-1 (LESSON_REGISTRY), P1-5 (TypeScript types)

---

#### P1-5: 프론트메타 타입 검증

**Priority:** 🟡 Medium-High — Prevents silent data corruption  
**Estimated Effort:** 0.5 days  
**Owner:** Developer  

**Description:**  
CURRICULUM_ANALYSIS.md §2 에서 검증된 대로 모든 강의가 동일한 9개 필드를 공유합니다. 이제 TypeScript strict 모드로 이를 강제하는 타입 체계를 구축합니다.

**Type Definitions:**

```typescript
// src/content/schema.ts — 신규 확장

export type Level = "입문" | "기초" | "중급";

export type LessonType = "deep-dive" | "reference";

export type ModuleId = 
  | "getting-started"
  | "development-basics"
  | "web-basics"
  | "frontend-frameworks"
  | "git-collaboration"
  | "data-backend"
  | "deployment-ops"
  | "ai-basics"
  | "ai-coding-tools"
  | "ai-system-design"
  | "practical-vibe-coding"
  | "explanation-practice"
  | "project-textbook";

export interface LessonFrontmatter {
  slug: string;
  moduleId: ModuleId;         // literal union — invalid moduleId fails at compile time
  order: number;              // positive integer within module
  title: string;              // non-empty string
  summary: string;            // non-empty string (< 200 chars preferred)
  level: Level;               // one of 3 allowed values
  type: LessonType;           // deep-dive or reference
  minutes: number;            // positive integer (≥ 1)
  tags: readonly string[];    // non-empty, deduplicated array
}
```

**Validation Layer:**

1. **Compile-time:** `ModuleId` 유니온 타입으로 잘못된 모듈 ID 를 사전에 차단
2. **Build-time:** LESSON_REGISTRY 빌더 스크립트가 런타임 검증 (필드 누락, 타입 불일치, 음수 값 등)
3. **CI-lint:** `npm run lint:frontmatter` 스크립트가 모든 `.md` 파일을 스캔하여 스키마 위반 여부 체크

**Exit Criteria:**
- [ ] `tsc --noEmit` 가 strict mode 에서 zero errors 로 통과
- [ ] `npm run lint:frontmatter` 가 모든 100개 파일에서 zero violations 보고
- [ ] 스키마 위반 파일이 있을 때 명확한 위치와 사유 출력
- [ ] 기존 강의 파일 변경 없음 (append-only per PD §9.4 rollback 정책)

**Dependencies:** None (runs before other Phase 1 tasks can proceed correctly)

---

#### P1-6: 기본 네비게이션 사이드바

**Priority:** 🟡 Medium — UX polish  
**Estimated Effort:** 0.5 days  
**Owner:** Developer  

**Description:**  
강의 상세 페이지에서 커리큘럼 모듈 트리를 사이드바로 보여주는 요소입니다. 모듈 내 강의 순서를 나타내고, 현재 위치에 하이라이트를 추가합니다.

**Sidebar 레이아웃:**

```
┌──────────────────────────────┐
│  시작하기 (4)                │
│ ├─ AI 바이브코딩이란...       │ ● ← 현재 위치         │
│ ├─ AI 개발 환경 설계...       │                      │
│ ├─ 개발자 지도 읽기           │                      │
│ └─ 바이브코딩 심화 코스       │                      │
│                              │
│  개발 기초 (7)               │
│ ├─ 터미널 기본 명령어...      │                      │
│ ├─ VS Code 완전 정복          │                      │
│ └─ ...                       │                      │
│                              │
│  웹 개발 기초 (8)            │
│  ...                         │
│                              │
│  ... (13 modules collapsed)  │
└──────────────────────────────┘
```

- **기본 상태:** 모든 모듈 collapsed, 클릭 시 expand/collapse
- **현재 위치 하이라이트:** 활성 강의가 속한 모듈 자동 expand + 하이라이트
- **완료 체크:** 진행률 저장과 연계하여 completed 강의에 ✓ 표시
- **반응형:** 모바일에서 햄버거 메뉴나 상단 드로우어로 전환

**Exit Criteria:**
- [ ] 13개 모듈이 모두 표시됩니다.
- [ ] 현재 강의의 모듈이 자동으로 expanded 됩니다.
- [ ] 각 모듈 내 강의 번호가 order 필드 기반으로 정렬됨.
- [ ] 클릭 시 해당 강의 slug 로 Navigation 됩니다.

**Dependencies:** P1-4 (강의 상세 페이지)

---

### Phase 1 Exit Criteria Summary

- [ ] ✅ All 100 lessons render correctly with frontmatter metadata
- [ ] ✅ Module-based listing and filtering works (tab selector, level filter, tag search)
- [ ] ✅ Tag system functional with normalized tags (target ~80 core tags)
- [ ] ✅ No frontmatter schema violations allowed (compile + build + CI lint checks)
- [ ] ✅ Estimated reading time shown per lesson (⏱ badge from `minutes` field)
- [ ] ✅ TOC auto-generated from heading parsing
- [ ] ✅ Related lessons section on each detail page
- [ ] ✅ Navigation sidebar shows full curriculum tree
- [ ] ✅ `LESSON_REGISTRY.__generated__.ts` built automatically during `npm run build`

---

## Phase 2: Community MVP (W3-W4) — Social Features

### Goal

AVM-COMMUNITY-001~003 브랜치에서 이미 병합된 인프라를 활용하여 커뮤니티 기능을 활성화합니다. 인증된 사용자가 게시글을 작성·댓글을 달고·좋아요를 누를 수 있는 상태까지 달성합니다.

### Preconditions

- [ ] Phase 1 exit criteria met
- [ ] Firebase Auth configured (Email + Google OAuth via NextAuth/Firebase provider)
  - Still open as of 2026-08-28 — see the same-titled item earlier in this
    file for verified live-repro evidence (`GUPITI-OWNER-P0-AUTH-01`).
- [ ] Firestore security rules deployed (from AVM-COMMUNITY-002)
- [ ] Firebase Admin SDK configured (for admin role detection)
- [ ] `.env.local` contains `NEXT_PUBLIC_FIREBASE_*` variables
- [ ] Custom claims for admin role set up via Firebase Console

### P2 Tasks Detail

#### P2-1: 사용자 프로필 페이지 (`/profile`)

**Priority:** 🔴 Critical Path  
**Estimated Effort:** 1 day  
**Owner:** Developer  

**Description:**  
인증된 사용자의 기본 정보를 displayed 하는 페이지. Firebase Auth UID 기준으로 `users/{uid}` 문서에서 데이터 가져옵니다.

**Page Layout:**

```
┌───────────────────────────────────────────────┐
│  내 프로필                                      │
│                                               │
│  ┌───────────┐                                 │
│  │ Profile   │  DisplayName                     │
│  │ Avatar    │  Email                          │
│  └───────────┘  Role: user                    │
│                Bio:                           │
│                ────────────                    │
│                자기소개 입력                   │
│                                               │
│  완료한 강의: 23 / 100 (23%)                 │
│  ━━━━━━━━━━━━━━━━░░░░░░░░░░░░░░░              │
│                                               │
│  내가 쓴 게시글: 5 개                           │
│  북마크한 강의: 12 개                          │
│                                               │
│  ┌──────────────┐ ┌──────────────┐            │
│  │  프로필 수정  │ │  비밀번호 변경 │            │
│  └──────────────┘ └──────────────┘            │
└───────────────────────────────────────────────┘
```

**Data Source:** `users/{uid}` 문서 (PD §6.1)
- `displayName`, `email`, `photoURL`, `role`, `bio` → displayed
- `lessons_progress` 조회 → 완료 강수량 계산

**Exit Criteria:**
- [ ] 로그인한 사용자는 자신의 프로필을 볼 수 있습니다.
- [ ] `isApproved: false` 사용자는 제한된 기능만 보입니다.
- [ ] 진행률 카운터가 Firestore 데이터와 동기화됩니다.
- [ ] 프로필 편집 가능 (displayName, bio).

**Dependencies:** AVM-COMMUNITY-001 (Auth), AVM-COMMUNITY-002 (User model)

---

#### P2-2: 커뮤니티 게시글 생성/편집

**Priority:** 🔴 Critical Path  
**Estimated Effort:** 1.5 days  
**Owner:** Developer  

**Description:**  
`/community/posts/new` 라우트에 게시글 작성 폼을 구현합니다. PD §6.2 PostDoc 스키마에 맞춘 데이터 저장을 수행합니다.

**Form Fields:**

| 필드 | 유형 | 필수 | 유효성 검사 |
|------|------|------|------------|
| 제목 | text (max 120 chars) | ✓ | 비어있으면 안 됨 |
| 내용 | textarea / rich editor | ✓ | 비어있으면 안 됨 |
| 태그 | comma-separated tags | ✗ | 정규화된 태그집합에서 선택 권장 |
| 연관 강의 | dropdown | ✗ | 관련 강의 slugs 중에서 선택 |

**Flow:**

```
사용자가 폼에 작성 → [저장하기] 클릭
  ↓
validity check → title empty? content empty? → reject with toast "제목을 입력해주세요"
  ↓
POST /api/community/posts → Firestore posts collection
  ↓
status = "pending" 생성 → authorUid = currentUser.uid
  ↓
✅ "게시글이 제출되었습니다. 승인 대기 중입니다." 토스트 표시
  ↓
/community/posts 로 리다이렉트 (작성자의 pending 글은 별도 표시)
```

**Approval Flow (from AVM-COMMUNITY-003):**
- 새 게시글은 항상 `status: "pending"` 으로 시작
- 관리자 승인后才能 공개 피드에 표시
- 거절 시 `status: "rejected"`, `rejectionReason` 기록

**Acceptance Mapping:** PD AC-3 와 직접 연결.

**Exit Criteria:**
- [ ] 인증된 사용자가 제목+내용을 입력하면 게시글 생성 가능
- [ ] 빈 폼 제출 시 명확한 에러 메시지 출력
- [ ] 생성된 게시글 status = `"pending"` Firestore 에 저장됨
- [ ] 작성자에게 "승인 대기 중" 피드백 표시
- [ ] md 기반 본문 저장 (markdown-to-HTML is deferred to rendering phase)

**Dependencies:** Phase 1 complete, Firebase config ready

---

#### P2-3: 댓글 시스템

**Priority:** 🔴 Critical Path  
**Estimated Effort:** 1 day  
**Owner:** Developer  

**Description:**  
게시글 상세 페이지에 댓글 목록과 댓글 작성 필드를 추가합니다. PD §6.3 CommentDoc 스키마 준수.

**Features:**
- 댓글 작성: `/api/community/comments/:postId` POST
- 댓글 목록: GET `/api/community/comments/:postId` (createdAt asc 정렬)
- 답글 지원: `parentCommentId` 필드로 중첩 구조
- 댓글 수 자동 증가: 게시글 `commentCount` 필드 업데이트

**UI Component:**

```
┌───────────────────────────────────────────────────┐
│  댓글 (5)                                        │
│                                                  │
│  ┌─────────────────────────────────────────────┐  │
│  │ 👤 김민수  2시간 전                         │  │
│  │ 정말 유익한 강의였습니다! 특히 MCP 부분은   │  │
│  │ 실무에서 바로 활용할 수 있을 것 같아요.       │  │
│  │        ↩ 답글  👍 3                         │  │
│  └─────────────────────────────────────────────┘  │
│                                                  │
│  ┌─────────────────────────────────────────────┐  │
│  │ 👤 최지현  1시간 전                         │  │
│  │ 저도 동의합니다! 에이gent 구현 팁도          │  │
│  │ 공유해주셔서 감사해요.                       │  │
│  │        ↩ 답글  👍 1                         │  │
│  └─────────────────────────────────────────────┘  │
│                                                  │
│  ┌─────────────────────────────────────────────┐  │
│  │ 💬 댓글 작성...                              │  │
│  │          [등록하기]                          │  │
│  └─────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘
```

**Acceptance Mapping:** PD AC-7 와 직접 연결.

**Exit Criteria:**
- [ ] 댓글 작성/조회/답글 모두 정상 동작
- [ ] `commentCount` 가 자동 증감
- [ ] 비로그인 상태에서 댓글 작성 시도 시 로그인 페이지로 리다이렉트
- [ ] 댓글 XSS 방지 (markdown 렌더링 시 sanitization)

**Dependencies:** P2-2 (게시글), Auth available

---

#### P2-4: 학습 진도 추적 통합

**Priority:** 🟡 High  
**Estimated Effort:** 1.5 days  
**Owner:** Developer  

**Description:**  
PD §6.4 `lessons_progress` 컬랙션을 활용하여 학습자 진도를 추적합니다. 강의 페이지 방문 시 자동 읽고, 완료 상태를 명시적으로 마킹할 수 있게 합니다.

**Mechanism:**

1. **스크롤 기반 읽기 비율 계산**
   - IntersectionObserver API 로 viewport 커버리지 추적
   - Debounce (≤2초 간격) 으로 Firestore 에 저장
   - `readPercentage` (0-100) 업데이트

2. **완료 마킹**
   - 강의 하단에 "📚 완료로 표시" 버튼 추가
   - 클릭 시 `status: "completed"`, `completedAt: Timestamp` 설정
   - `timeSpentMinutes` 누적

3. **진도 대시보드 (`/dashboard/progress`)**
   - 모듈별 완료률 차트
   - 진행 중인 강의 목록
   - 미완료 강의 추천

```
┌───────────────────────────────────────────────────┐
│  학습 진도                                          │
│                                                   │
│  전체: 23/100 완료 (23%)                          │
│  ━━━━━━━━━━━━━━━━░░░░░░░░░░░░░░░                  │
│                                                   │
│  ├── 시작하기          ████░  2/4 (50%)           │
│  ├── 개발 기초          ██░░░  2/7 (29%)           │
│  ├── 웹 개발 기초        ███░░  3/8 (38%)           │
│  ├── 프론트엔드           ░░░░░  0/7 (0%)           │
│  ├── Git & 협업          ░░░░░  0/8 (0%)           │
│  ├── ...                                              │
│  └── AI 시스템 설계      █░░░░  1/17 (6%)           │
│                                                   │
│  [다음 강의 추천: Next.js 라우팅 이해하기]        │
└───────────────────────────────────────────────────┘
```

**Acceptance Mapping:** PD AC-5 와 직접 연결.

**Exit Criteria:**
- [ ] 스크롤 비율이 real-time 으로 업데이트됨 (debounced)
- [ ] "/dashboard/progress" 페이지에서 완료 현황 시각화
- [ ] 완료 마킹 시 Firestore 문서 상태 변경됨
- [ ] 세션 간 진도 지속 (Firebase auth 연결)

**Dependencies:** Phase 1 (강의 pages exist), Auth available

---

#### P2-5: 좋아요/추천 시스템

**Priority:** 🟡 Medium  
**Estimated Effort:** 1 day  
**Owner:** Developer  

**Description:**  
PD §6.5 LikeDoc 스키마 기반. 게시글과 댓글에 좋아요 버튼을 구현합니다.

**Behavior:**
- 로그인한 사용자만 좋아요 토글 가능
- 비로그인 → 로그인 유도 토스트
- 중복 좋아요 방지를 위한 unique constraint enforcement: `(targetKind, targetId, userId)`
- 한 번 클릭하면 삭제, 다시 클릭하면 재생성 (toggle)
- 게시글 `upvoteCount` 실시간 증감 (Firestore transaction)

**UI:** 👍 버튼 with count display. 좋아요 수 0 → "추천" / 1+ → "❤️ N"

**Acceptance Mapping:** PD AC-8 과 직접 연결.

**Exit Criteria:**
- [ ] 좋아요 토글이 즉시 반영됨
- [ ] 중복 클릭 시 duplicate entry 생성되지 않음
- [ ] 비로그인 사용자는 로그인 유도 표시
- [ ] 서버 측 unique constraint 보장 (FireStore rules + client-side check)

**Dependencies:** P2-2 (게시글 존재 필요), Auth available

---

#### P2-6: 기본 검색

**Priority:** 🟡 Medium  
**Estimated Effort:** 1 day  
**Owner:** Developer  

**Description:**  
Firestore 질의를 통해 강의 제목과 요약 문장에서 키워드 검색을 구현합니다._PHASE_3 에서 고급 태그 필터 검색이 추가되므로, 여기서는 최소한의 기능을 제공합니다._

**Scope:**
- `/search?q=<keyword>` — 강의 title + summary 기반 검색
- Firestore `where("title", ">=", keyword)` + `where("title", "<=", keyword + "\uf8ff")` 패턴
- 최대 50개 결과, 최신순 정렬
- 500ms 이내 응답 목표

**Result Format:**
```
🔍 "RAG" 검색 결과: 12개
┌──────────────────────────────────────┐
│ • RAG 챗봇 설계 가이드               │
│   AI 시스템 설계 | 중급 | 55분      │
│   Retrieved context-based generation │
└──────────────────────────────────────┘
```

**Exit Criteria:**
- [ ] 키워드 매칭이 제목과 요약문에서 동작
- [ ] 500ms 이내 응답 (소규모 데이터 세트 기준)
- [ ] 일치 결과가 없으면 "검색 결과가 없습니다" 안내

**Dependencies:** Phase 1 (LESSON_REGISTRY indexing), Firestore available

---

#### P2-7: 관리자 승인 워크플로우

**Priority:** 🟡 Medium  
**Estimated Effort:** 1 day  
**Owner:** Developer  

**Description:**  
PD §6.2 PostDoc 의 `status: 'pending' | 'approved' | 'rejected'` 상태 머신을 구현합니다. AVM-COMMUNITY-003 의 승인 워크플로우를 UI 로 확장합니다.

**Routes:**
- `/community/approve` — 승인 대기열 (admin only)
- `/admin/posts` — 전체 게시글 관리 (admin only)

**승인 대기열 화면:**

```
┌───────────────────────────────────────────────────┐
│  📋 승인 대기열 (3 개)                             │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ 📝 "Agent Loops 완벽 가이드"                  │  │
│  │ 👤 박영희 | 2026-08-11 14:30               │  │
│  │ 미리보기: Agent loop 란... (markdown...)     │  │
│  │                                             │  │
│  │ [✔ 승인] [✖ 거절] [👁 전체 보기]            │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │ 📝 "MCP 프로토콜 심화"                       │  │
│  │ 👤 이수진 | 2026-08-11 11:00               │  │
│  │ 미리보기: MCP 는 ...                          │  │
│  │                                             │  │
│  │ [✔ 승인] [✖ 거절] [👁 전체 보기]            │  │
│  └─────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘
```

**승인/거절 액션:**
- **승인:** `status = "approved"`, `approvedAt = now()`, `approvedBy = adminUid`
- **거절:** `status = "rejected"`, `rejectionReason` 입력 필드 표시 (필수)
- **저작자 통지:** 토스트 또는 이메일 알림 (browser push — V1에서는 toast-level)

**Acceptance Mapping:** PD AC-9 와 직접 연결.

**Exit Criteria:**
- [ ] 관리자만 승인 대기열에 접근 가능
- [ ] 승인 시 게시글이 공개 피드에 즉시 표시됨
- [ ] 거절 시 사유 기록 + 작성자에게 통지
- [ ] 거절된 글은 작가에게 사유 표시 + 재제출 가능

**Dependencies:** AVM-COMMUNITY-003 (approval flow backend), Firebase Admin SDK

---

### Phase 2 Exit Criteria Summary

- [ ] ✅ 인증된 사용자가 게시글 생성 및 댓글 작성 가능
- [ ] ✅ 학습 진도가 세션 간에 지속되어 저장됨
- [ ] ✅ 검색이 관련 강의 결과를 500ms 이내에 반환
- [ ] ✅ 관리자 승인 워크플로우가 작동함
- [ ] ✅ 커뮤니티 대시보드에 활동 피드가 표시됨
- [ ] ✅ 좋아요 토글이 정상 동작하고 중복 방지 적용됨
- [ ] PD AC-2(Auth), AC-3(Post Creation), AC-4(Post Feed), AC-5(Progress), AC-7(Comments), AC-8(Likes), AC-9(Approval) 모두 테스트 통과

---

## Phase 3: Polish & QA (W5-W6) — Quality Improvements

### Goal

기존 기능의 품질을 높이고, 관리자 도구를 완성하며, 성능 최적화와 보안 검사를 수행하여 프로덕션 준비 상태를 달성합니다. 초기 사용자 테스트 피드백을 반영합니다.

### Preconditions

- [ ] Phase 2 exit criteria met
- [ ] Initial user testing feedback collected (beta cohort, min 5 testers)
- [ ] Lighthouse baseline measurements taken (expect improvement targets)
- [ ] Firewall/security rules peer-reviewed

### P3 Tasks Detail

#### P3-1: 관리자 대시보드 (`/admin`)

**Priority:** 🟡 High  
**Estimated Effort:** 2 days  
**Owner:** Developer  

**Description:**  
PD §5.3 Admin 기능 전반을 하나의 대시보드에 통합합니다.

**Dashboard Components:**

| 위젯 | 설명 |
|------|------|
| 👥 총 사용자 수 | 계정 생성일별 라인 차트 |
| 🔴 활성 오늘 | 지난 24시간 동안 활동한 사용자 |
| 📝 총 게시글 | 승인/대기/거절별 바 차트 |
| ⏳ 승인 대기 | 미처리 건 수 (클릭 시 approval queue 로 이동) |
| 📚 강의 조회수 | 모듈별 강의 조회수 TOP 5 |

**관리자 기능:**
- 게시글 승인/거절 (P2-7 와 통합)
- 사용자 역할 관리 (user → mentor → admin upgrade)
- 스팸 게시글 일괄 삭제
- 통계 내보내기 (CSV export)

**Exit Criteria:**
- [ ] 관리자 대시보드 통계가 실시간으로 갱신됨
- [ ] 역할 승인이 Firebase Custom Claims 를 통해 적용됨
- [ ] 스팸 삭제 시 관련 댓글/좋아요도 정리됨
- [ ] CSV 내보내기 정상 동작

**Dependencies:** Phase 2 (community data exists)

---

#### P3-2: 고급 검색 (태그 및 레벨 필터 포함)

**Priority:** 🟡 Medium  
**Estimated Effort:** 1.5 days  
**Owner:** Developer  

**Description:**  
Phase 2 의 기본 검색을 확장하여, 정규화된 태그와 수준 필터를 결합한 고급 검색을 구현합니다.

**Features:**
- `/lessons?module=&level=&tag=&q=` — 쿼리 파라미터 기반 필터 조합
- 다중 태그 선택 (checkbox 그룹)
- 레벨 필터 토글 (여러 레벨 동시 선택 가능)
- 조합 필터: ex. `module=ai-system-design&level=중급&tag=MCP`

**Exit Criteria:**
- [ ] 모든 필터 조합이 정확한 결과 반환
- [ ] combined 필터 시 AND 논리 적용
- [ ] URL 쿼리 파라미터로 공유 가능한 상태로 보존

**Dependencies:** Phase 1 (LESSON_REGISTRY indexing), Phase 2 (basic search pattern)

---

#### P3-3: 알림 시스템

**Priority:** 🟢 Low-Medium  
**Estimated Effort:** 1.5 days  
**Owner:** Developer  

**Description:**  
PD §8.2 Notification features 를 구현합니다. V1 은 브라우저 토스트 알림에 국한합니다.

**Event Triggers:**

| 이벤트 | 대상 | 방법 |
|--------|------|------|
| 내 게시글에 좋아요 | 포스트 작성자 | Toast: "[사용자]님이 당신의 게시글에 추천을 남겼습니다" |
| 내 게시글에 댓글 | 포스트 작성자 | Toast: "[사용er]님이 댓글을 남겼습니다" |
| 게시글 승인/거절 | 포스트 작성자 | Banner: "게시글이 승인되었습니다!" / "거절 사유: ..." |
| 학습里程碑 | 학습자 | Toast: "학습 진도 25% 달성! 🎉" |

**Notification Badge:**
- Navbar 우측에 🔔 아이콘 + badge counter (unread notification 수)
- 클릭 시 알림 내역 슬라이드 패널
- 읽음 처리 시 badge count 감소

**Limitations (V1):**
- Push notifications 는 브라우저 tab 이 active 일 때만 동작
- 백그라운드 FCM push 는 V2 scope (V1 제외)
- Realtime listener 는 Firestore `onSnapshot` 기반으로 구현

**Exit Criteria:**
- [ ] 좋아요/댓글 생성 시 toast 알림 출력
- [ ] 승인/거절 시 banner 표시
- [ ] Navbar notification badge accurate 한 unread count 표시
- [ ] 읽음 처리 시 badge 감소

**Dependencies:** Phase 2 (posts, comments, likes operational)

---

#### P3-4: 성능 최적화

**Priority:** 🔴 Critical Path  
**Estimated Effort:** 2 days  
**Owner:** Developer  

**Description:**  
PD §8.4 Performance & SEO 항목을 구현하여 프로덕션 준비 상태를 달성합니다.

**Actions:**

1. **정적 생성 (SSG)**
   - 각 강의 페이지에 `generateStaticParams()` 적용
   - `next build` 시 모든 `/lessons/[slug]` 페이지 prerender
   - ISR (Incremental Static Regeneration) 옵션: 60분 재validation

2. **이미지 최적화**
   - Next.js `<Image>` 컴포넌트 사용
   - `/lesson-diagrams/` assets 에 `next/image` pipeline 적용
   - lazy loading 적용 (below-the-fold images)

3. **폰트 로딩**
   - `next/font` 자동 최적화
   - font-display: swap 적용 (FCP 지연 최소화)

4. **로딩 스케폴턴 UI**
   - 강의 카드 그리드에 skeleton placeholder
   - 데이터 로딩 시 shimming 효과

5. **캐싱 전략**
   - `Cache-Control: s-maxage=3600` for lesson pages
   - Community API responses에 appropriate cache headers

**Exit Criteria:**
- [ ] `npm run build` 가 100개 강의 페이지를 static 으로 생성
- [ ] Lighthouse 성능 점수 desktop ≥ 95, mobile ≥ 90
- [ ] 첫 강의 로딩 시간 < 1.5초 (WiFi 기준)
- [ ] 모든 이미지가 lazy loaded 되고 WebP 형식으로 제공

**Dependencies:** Phase 1 (강의 페이지 존재)

---

#### P3-5: 모바일 반응형 디자인 검증

**Priority:** 🟡 Medium  
**Estimated Effort:** 1.5 days  
**Owner:** Designer + Developer  

**Description:**  
모바일 기기(375px~768px) 에서 모든 주요 페이지가 제대로 보이는지 검증하고 수정합니다.

**테스트 매트릭스:**

| Viewport | Devices | Focus Areas |
|----------|---------|-------------|
| 375px | iPhone SE, mini | Navigation collapse, card stacking |
| 428px | iPhone 14 Pro Max | Large-phone edge cases |
| 768px | iPad portrait | Tablet breakpoint transitions |

**Mobile-Specific Fixes:**
- Hamburger menu for navigation sidebar
- Full-width cards (remove grid columns on small screens)
- Touch-friendly button sizes (min 44x44px)
- Horizontal scroll for module tabs on mobile
- Collapsible TOC panel (slide-in drawer)
- Form validation messages above keyboard

**Exit Criteria:**
- [ ] 모든 주요 페이지가 375px 이상에서 usable 함
- [ ] 네비게이션이 모바일에서 hamburger menu 로 전환됨
- [ ] 카드 그리드가 single column 으로 stacking 됨
- [ ] 터치 타겟이 minimum 44px 크기를 갖춤
- [ ] 가로 스크롤이 unintentionally 발생하지 않음

**Dependencies:** Phase 1 & 2 (모든 페이지 구현 완료)

---

#### P3-6: 보안 검토

**Priority:** 🔴 Critical Path  
**Estimated Effort:** 1.5 days  
**Owner:** Developer + Peer Review  

**Description:**  
Firestore 보안 규칙 테스트, XSS 방지, 커뮤니티 행동 rate limiting 을 포함한 종합 보안 검토.

**Security Checklist:**

| 항목 | 테스트 방법 |
|------|-----------|
| **Firestore Rules** | Firebase Emulator Suite 에서 penetration scenarios 검증 |
| **XSS 방어** | DOMPurify 적용 확인, `<script>` injection test |
| **CSRF 보호** | NextAuth JWT validation for all mutating endpoints |
| **Rate Limiting** | API 라우트에 `limiter` 적용 (게시글 작성: 5/min, 댓글: 10/min) |
| **Authentication Guards** | 비인증 사용자가 `/community/*` 접근 시 401/302 확인 |
| **Role Enforcement** | Admin-only routes 에서 custom claims 검증 |
| **Input Sanitization** | 모든 user inputs 에 maxLength + sanitize 적용 |
| **SQL Injection** | Firestore 는 NoSQL 이지만, query builder misuse 방지 |

**Penetration Scenarios:**

```javascript
// Scenario 1: Non-admin accessing /admin/*
// Expected: 403 Forbidden

// Scenario 2: Unauthenticated post creation
// Expected: 401 Unauthorized → redirect to /login

// Scenario 3: Malicious script in post content
// Expected: Content stored as-is (markdown), rendered safely via sanitizer

// Scenario 4: Rate limit exceeded
// Expected: 429 Too Many Requests with retry-after header

// Scenario 5: Delete another user's post
// Expected: Firestore rule denies write to different author's doc
```

**Exit Criteria:**
- [ ] 모든 penetration scenario 에 대해 expected behavior 확인됨
- [ ] Firebase emulator 에서 rules 테스트 100% 통과
- [ ] XSS injection test 통과 (dompurify-safe output)
- [ ] Rate limiting configured on community endpoints
- [ ] Peer review sign-off obtained

**Dependencies:** Phase 2 (community features exist to test against)

---

#### P3-7: 애널리틱스 통합

**Priority:** 🟢 Low-Medium  
**Estimated Effort:** 1 day  
**Owner:** Developer  

**Description:**  
페이지 뷰, 인기 강의, 완료율을 추적하는 애널리틱스 시스템을 구축합니다.

**Metrics Tracked:**

| 메트릭 | 소스 | 목적 |
|--------|------|------|
| 페이지 뷰 | Next.js middleware + Firestore log |popular lesson identification |
| 강의 완료가율 | `lessons_progress` aggregation | Completion rate calculation |
| 커뮤니티 활동 | `posts` + `comments` counts | Engagement health monitoring |
| 검색 빈도 | Search endpoint logs | Content gap identification |
| 오류 발생률 | Sentry/Bugsnag integration | Bug frequency tracking |

**V1 Scope Limitation:**
- Google Analytics 4 (GA4) 또는 Plausible integration
- Private analytics dashboard (simple chart view)
- Raw event logging to Firestore (`analytics_events` collection)

**Exit Criteria:**
- [ ] 페이지 뷰 데이터가 실시간为大시보드에 표시됨
- [ ] 인기 강의 TOP 10 리스트 자동 생성
- [ ] 모듈별 완료율 집계 쿼리 정상 동작
- [ ] 오류 로깅이 활성 상태

**Dependencies:** Phase 2 (data streams available)

---

#### P3-8: 접근성 검증 (WCAG 2.1 AA)

**Priority:** 🟡 Medium  
**Estimated Effort:** 1.5 days  
**Owner:** Developer + Designer  

**Description:**  
PD §5.1 Learning Core 의 접근성 요구사항을 충족하기 위해 WCAG 2.1 AA 기준 검증.

**Focus Areas:**

| 항목 | 기준 |
|------|------|
| 색상 대비 | 최소 4.5:1 (텍스트), 3:1 (larger text) |
| 키보드 네비게이션 | Tab 순서가 논리적, focus indicator 표시 |
| 스크린 리더 | Alt text for images, ARIA labels |
| 포커스 관리 | Keyboard traps 없음, skip links |
|ฟอร์ม 접근성 | Label associations, error message readability |
| 콘텐츠 구조 | Heading hierarchy correct, semantic HTML |

**Tools:**
- axe-core automated scan (CI integration)
- Manual keyboard-only navigation test
- Screen reader test (NVDA on Windows, VoiceOver on Mac)
- Color contrast checker (WebAIM WCAG Contrast Checker)

**Exit Criteria:**
- [ ] axe-core scan 에서 critical/warning violation 0
- [ ] Keyboard-only navigation 이 모든 주요 기능 접근 가능
- [ ] 주요 페이지의 색상 대비 WCAG AA 기준 충족
- [ ] 스크린 리더 테스트에서 핵심 정보 접근성 확인

**Dependencies:** Phase 1 & 2 (page implementation complete)

---

### Phase 3 Exit Criteria Summary

- [ ] ✅ 관리자가 커뮤니티 콘텐츠 승인/거절 가능
- [ ] ✅ 검색이 태그 레벨과 난이도 수준의 필터를 포함
- [ ] ✅ 모바일 Lighthouse 점수 ≥ 90
- [ ] ✅ 주요 페이지에서 WCAG 2.1 AA 합격
- [ ] ✅ Firestore 보안 규칙이 pen-test 시나리오 통과
- [ ] ✅ 알림 시스템 작동을 위한toast/badge 구현
- [ ] ✅ SSG + SEO 최적화 완료 (OG meta, sitemap)
- [ ] ✅ 애널리틱스 대시보드 운영 중

---

## Resource Allocation

| Role | W1-W2 (Phase 1) | W3-W4 (Phase 2) | W5-W6 (Phase 3) | Total Weeks |
|------|-----------------|-----------------|-----------------|-------------|
| **Developer (Full-stack)** | 100% | 100% | 67% | ~2.5 dev equiv |
| **Designer (UI/UX)** | 33% | 33% | 67% | ~1.5 weeks equiv |
| **QA/Tester** | 0% | 0% | 100% | ~1 week equiv |
| **PM/Operator** | 33% | 33% | 33% | Continuous |

**Notes:**
- In our operating model: **Claude Code handles coding tasks**, human operator provides direction, review, and approval decisions.
- Designer involvement primarily needed for Phase 3 visual polish and responsive design audit.
- QA/testing mostly performed by the developer/operator pair using automated tools (axe, Lighthouse) and manual walkthroughs.
- Less than ideal resource profile compared to traditional teams, but sufficient for MVP scope if prioritized correctly.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Tag normalization breaks existing lessons** | Medium | High | Backup `stash@{0}`, validate every file before overwrite; append-only change log per PD |
| **Firestore rules misconfiguration leaks data** | Medium | Critical | Peer review rules, deploy to staging first, run penetration tests (P3-6) |
| **Lesson rendering regressions during integration** | Low | Medium | Each lesson gets a smoke-test assertion during P1-1 |
| **AI ops cleanup removes needed reference doc** | Low | Low | Archive-before-delete policy enforced (per AI_OPS_RECONCILIATION.md) |
| **Frontmatter schema mismatch causes build failure** | Low | Medium | CI lint step catches violations early (P1-5) |
| **Stash extraction path issues on Windows** | Medium | High | Use bash-compatible extraction scripts; verify file paths incrementally |
| **Firebase Auth state not syncing with NextAuth** | Low | Medium | Use Firebase JS SDK directly; avoid dual-auth complexity |
| **Performance degrades with large datasets** | Low | Medium | Pagination/infinite scroll for community feed; index Firestore queries |
| **Communtiy content spam overwhelms approval queue** | Medium | Medium | Rate limiting (P3-6), CAPTCHA on post creation, bulk approve/reject tools |
| **Learning progress data loss on session reset** | Low | High | LocalStorage fallback + Firestore persistence; periodic sync interval |

---

## Success Metrics (KPIs)

### Quantitative Targets

| # | Metric | Target | Measurement | Baseline |
|---|--------|--------|-------------|----------|
| 1 | 학습 완료율 | > 40% | `lessons_progress` 컬렉션 aggregated by user | N/A (zero users currently) |
| 2 | 커뮤니티 참여도 | avg 3+ 댓글/게시글 | Firestore comment aggregation | N/A |
| 3 | 첫값 도달 시간 | < 30초 | Landing → First lesson load time | Not measured yet |
| 4 | Dev velocity | W2 curriculum done, W4 community live, W6 production-ready | Git commit timestamps vs milestones | On track |
| 5 | Mobile perf score | ≥ 90 | Lighthouse mobile performance audit | TBD after P3-4 |
| 6 | Accessibility compliance | WCAG 2.1 AA | axe-core results on key pages | TBD after P3-8 |
| 7 | Build reliability | 100% success rate | `npm run build` pass rate across PRs | TBD |
| 8 | Tag usage density | ≤ 100 unique tags | LESSON_REGISTRY.globalTagSet.size | 309 → target ~80 |

### Qualitative Goals

1. **"懂了 → 했다"** (Understood → Did): Learners walk away from each lesson with something they actually made.
2. **"혼자서가 아니다"** (Never Alone): When learners get stuck, there's someone or some community to ask.
3. **"최신의 언어"** (Modern Language): Content reflects current AI coding toolkits and practices.
4. **"열린 아카이브"** (Open Archive): Lessons remain accessible as markdown files, community-evolving over time.

---

## Rollback Plan

If any phase fails its exit criteria, the following protocol applies:

### Step-by-Step Rollback Procedure

1. **Stop work immediately** on the next phase. No further feature development until current phase issues are resolved.

2. **Document specific failures** against each unmet exit criterion. This creates an actionable defect list with root cause hypotheses.

3. **Revert commit(s)** back to the previous phase's final commit:
   ```bash
   git revert <commit-hash-from-phase-N-end>
   git push origin symphony/AVM-JT-003
   ```

4. **Root cause analysis within 24 hours.** Identify whether the failure is:
   - Technical (code bug, configuration error)
   - Process (missing precondition, unclear requirement)
   - Resource (insufficient time, wrong priority)
   - External (Firebase API limits, dependency version conflict)

5. **Adjust scope or timeline** based on root cause findings. Options:
   - Reduce scope (defer lowest-priority tasks to V2)
   - Extend timeline (request additional weeks)
   - Add resources (temporary designer or QA support)

6. **No automatic rollback of frontmatter changes.** Per PD §9.4 rollback policy, frontmatter modifications are append-only. Historical versions are preserved in git history. If a frontmatter change caused an issue, cherry-pick the revert rather than rolling back the entire phase.

### Branch Safety

- `symphony/AVM-JT-003` was created from main HEAD `c0091b5` — it can be safely abandoned and recreated if needed.
- Community branches (`AVM-COMMUNITY-001~003`) are already merged into main and will NOT be affected by any rollback.
- Content layer lives in stash (`stash@{0}`), which is independent of the working tree — stash data survives branch operations.

---

## File Structure After Implementation

```
docs/product/                  # Single source of truth for product decisions
├── PRODUCT_DEFINITION.md      # Full product definition (9 sections)
├── CURRICULUM_ANALYSIS.md     # Frontmatter analysis of 100 lessons
├── AI_OPS_RECONCILIATION.md   # Document classification report
└── ROADMAP_V2.md              # This file (v1 development plan)

src/content/
├── curriculum.ts              # 13 modules — optionally enriched by LESSON_REGISTRY
├── schema.ts                  # TypeScript type definitions (strict mode)
├── lesson-frontmatter.ts      # Parsing utilities (existing on branch)
├── lessons/markdown/          # 100 .md files (source of truth for content)
│   ├── getting-started/       # 4 lessons
│   ├── development-basics/    # 7 lessons
│   ├── web-basics/            # 8 lessons
│   ├── frontend-frameworks/   # 7 lessons
│   ├── git-collaboration/     # 8 lessons
│   ├── data-backend/          # 7 lessons
│   ├── deployment-ops/        # 7 lessons
│   ├── ai-basics/             # 7 lessons
│   ├── ai-coding-tools/       # 7 lessons
│   ├── ai-system-design/      # 17 lessons (largest module)
│   ├── practical-vibe-coding/ # 7 lessons
│   ├── explanation-practice/  # 5 lessons
│   └── project-textbook/      # 9 lessons (capstone)
├── __generated__/             # Build artifacts (LESSON_REGISTRY output)
│   ├── lesson-registry.generated.ts  # byModule[], all[], moduleStats[]
│   └── tag-normalization.json         # Synonym map + canonical tags
└── tags/                      # Tag management (normalization)
    ├── synonym-map.ts         # Synonym resolution table
    └── allowed-tags.ts        # Canonical tag glossary (~80 items)
```

---

## Appendix A: Task Priority Matrix

| ID | Task | Priority | Duration | Dependencies | Acceptance Criteria |
|----|------|----------|----------|-------------|-------------------|
| P1-1 | LESSON_REGISTRY builder | 🔴 Critical | 2d | None | Registry generated, typed, importable |
| P1-2 | curriculum.ts forward refs | 🔴 Critical | 0.5d | P1-1 | Modules know their lessons |
| P1-3 | Tag normalization | 🟡 High | 1.5d | None | 309 → ~80 tags, synonym map |
| P1-4 | Lesson routes (list + detail) | 🔴 Critical | 2d | P1-1, P1-5 | All 100 pages route + render |
| P1-5 | Frontmatter type validation | 🟡 Medium | 0.5d | None | Compile + build + CI lint |
| P1-6 | Navigation sidebar | 🟡 Medium | 0.5d | P1-4 | Module tree + active highlight |
| P2-1 | User profile page | 🔴 Critical | 1d | AVM-COMMUNITY-001 | Display user info + progress |
| P2-2 | Post creation/editing | 🔴 Critical | 1.5d | P1 complete | Pending status + form validation |
| P2-3 | Comment system | 🔴 Critical | 1d | P2-2, Auth | Nested comments + count update |
| P2-4 | Progress tracking | 🟡 High | 1.5d | P1-4, Auth | Scroll tracking + dashboard |
| P2-5 | Like/reaction system | 🟡 Medium | 1d | P2-2, Auth | Toggle + uniqueness constraint |
| P2-6 | Basic search | 🟡 Medium | 1d | P1-1 | Title+summary search <500ms |
| P2-7 | Admin approval flow | 🟡 Medium | 1d | AVM-COMMUNITY-003 | Approve/reject with reason |
| P3-1 | Admin dashboard | 🟡 High | 2d | P2 complete | Stats + moderation tools |
| P3-2 | Advanced search | 🟡 Medium | 1.5d | P2-6 | Tag + level filters |
| P3-3 | Notification system | 🟢 Low | 1.5d | P2 complete | Toasts + badge counter |
| P3-4 | Performance optimization | 🔴 Critical | 2d | P1 complete | SSG + image + font optimization |
| P3-5 | Mobile responsive audit | 🟡 Medium | 1.5d | P1+P2 | Usable on 375px+ |
| P3-6 | Security review | 🔴 Critical | 1.5d | P2 complete | Pen-test pass + XSS defense |
| P3-7 | Analytics integration | 🟢 Low | 1d | P2 complete | Page views + completion rates |
| P3-8 | Accessibility audit | 🟡 Medium | 1.5d | P1+P2 | WCAG 2.1 AA compliant |

**Legend:** 🔴 Critical Path (blocks next phase) | 🟡 High/Medium (important quality) | 🟢 Nice-to-Have (V1 scope but deferrable)

---

## Appendix B: Firestore Schema Reference

Complete schema reference derived from PD §6. All collections use Firebase Auth UID as primary key pattern.

### Collection: `users`
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `uid` | string | ✓ | FirebaseAuth UID (document ID) |
| `email` | string | ✓ | Login email |
| `displayName` | string | ✓ | Display name |
| `photoURL` | string? | ✗ | Profile image URL |
| `role` | enum | ✓ | `'user' \| 'mentor' \| 'admin'` |
| `level` | enum | ✓ | `'beginner' \| 'basic' \| 'intermediate' \| 'expert'` |
| `createdAt` | Timestamp | ✓ | Account creation date |
| `lastActiveAt` | Timestamp | ✓ | Last activity timestamp |
| `isApproved` | boolean | ✓ | Admin approval status |
| `bio` | string? | ✗ | Brief introduction |

### Collection: `posts`
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `authorUid` | string | ✓ | Author UID |
| `title` | string | ✓ | Post title |
| `content` | string | ✓ | Markdown body |
| `contentHash` | string | ✓ | Hash for duplicate/change detection |
| `status` | enum | ✓ | `'pending' \| 'approved' \| 'rejected' \| 'draft'` |
| `tags` | string[] | ✓ | Topic tags |
| `upvoteCount` | number | ✓ | Like count |
| `commentCount` | number | ✓ | Comment count |
| `views` | number | ✓ | View count |
| `createdAt` | Timestamp | ✓ | Created at |
| `updatedAt` | Timestamp | ✓ | Updated at |
| `approvedAt` | Timestamp? | ✗ | Approval timestamp |
| `approvedBy` | string? | ✗ | Approver UID |
| `rejectionReason` | string? | ✗ | Reason for rejection |

### Collection: `comments`
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `postId` | string | ✓ | Parent post ID |
| `authorUid` | string | ✓ | Author UID |
| `parentCommentId` | string? | ✗ | Reply to comment ID |
| `content` | string | ✓ | Markdown body |
| `createdAt` | Timestamp | ✓ | Created at |
| `updatedAt` | Timestamp? | ✗ | Updated at |
| `edited` | boolean | ✓ | Edit flag |

### Collection: `lessons_progress`
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | ✓ | Learner UID |
| `lessonSlug` | string | ✓ | Lesson slug identifier |
| `moduleId` | string | ✓ | Associated module ID |
| `status` | enum | ✓ | `'not_started' \| 'in_progress' \| 'completed'` |
| `readPercentage` | number | ✓ | 0–100 based on scroll coverage |
| `lastReadAt` | Timestamp | ✓ | Last read timestamp |
| `completedAt` | Timestamp? | ✗ | Completion timestamp |
| `timeSpentMinutes` | number | ✓ | Cumulative time spent |
| `notes` | string? | ✗ | Personal learning notes |

### Collection: `likes`
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `targetKind` | enum | ✓ | `'post' \| 'comment'` |
| `targetId` | string | ✓ | Target document ID |
| `userId` | string | ✓ | User who liked |
| `createdAt` | Timestamp | ✓ | Created at |

**Unique Constraint:** `(targetKind, targetId, userId)` — prevents duplicate likes.

---

## Appendix C: Module-to-Lesson Map

Complete mapping of 13 modules to their 100 lessons, derived from CURRICULUM_ANALYSIS.md §3 and §8.

| Order | Module ID | Korean Title | Count | Levels | Est. Time |
|-------|-----------|-------------|-------|--------|-----------|
| 1 | `getting-started` | 시작하기 | 4 | 입문 2, 기초 2 | ~140 min |
| 2 | `development-basics` | 개발 기초 | 7 | 입문 3, 기초 3, 중급 1 | ~420 min |
| 3 | `web-basics` | 웹 개발 기초 | 8 | 입문 1, 기초 5, 중급 2 | ~480 min |
| 4 | `frontend-frameworks` | 프론트엔드 프레임워크 | 7 | 기초 4, 중급 3 | ~420 min |
| 5 | `git-collaboration` | Git & 협업 | 8 | 기초 4, 중급 4 | ~480 min |
| 6 | `data-backend` | 데이터와 백엔드 | 7 | 기초 4, 중급 3 | ~420 min |
| 7 | `deployment-ops` | 배포와 운영 | 7 | 기초 3, 중급 4 | ~420 min |
| 8 | `ai-basics` | AI 활용 기초 | 7 | 기초 5, 중급 2 | ~420 min |
| 9 | `ai-coding-tools` | AI 코딩 도구 | 7 | 기초 3, 중급 4 | ~420 min |
| 10 | `ai-system-design` | AI 시스템 설계 | 17 | 기초 4, 중급 13 | ~1020 min |
| 11 | `practical-vibe-coding` | 실전 바이브코딩 | 7 | 기초 2, 중급 5 | ~420 min |
| 12 | `explanation-practice` | 설명 연습 | 5 | 기초 2, 중급 3 | ~300 min |
| 13 | `project-textbook` | 실전 프로젝트 교재 | 9 | 중급 9 | ~570 min |
| | **TOTAL** | | **100** | **6/41/53** | **~6170 min** |

**Level Legend:** 입문 = Beginner (6%), 기초 = Basic (41%), 중급 = Intermediate (53%)
**Time Note:** `minutes` field estimates may differ from actual reading time. Consider collecting user feedback in V2.

---

## Appendix D: Tag Normalization Blueprint

Detailed synonym map and canonical tag glossary for P1-3 implementation.

### D.1 Synonym Resolution Map

```typescript
// src/content/tags/synonym-map.ts
export const SYNONYM_MAP: Record<string, string> = {
  // --- Concept synonyms (merge to canonical form) ---
  "RAG 챗봇": "RAG",
  "Context Caching": "Prompt Caching",
  "도구 루프": "Tool Server",
  "Agent Loop": "Agent",
  "AI 기초": "AI Basics",
  "AI 시스템 설계": "AI System Design",
  
  // --- Capitalization normalization ---
  "api": "API",
  "rag": "RAG",
  "mcp": "MCP",
  "llm": "LLM",
  "claude": "Claude",
  "codex": "Codex",
  "grok": "Grok",
  "copilot": "Copilot",
  "firebase": "Firestore",
  
  // --- Subsumption relationships (broader term absorbs narrower) ---
  "GitHub Copilot": "Copilot",
  "Google Gemini": "Gemini",
  "OpenAI": "GPT",
  "Anthropic": "Claude",
  
  // --- Duplicate topic markers ---
  "Deployment": "배포",
  "deploy": "배포",
  "DevOps": "배포",
  
  // --- Korean↔English concept pairs ---
  "검증": "Verification",
  "실전": "Practical",
  "설계": "Design",
  "설정": "Setup",
  "환경": "Environment",
  "도구": "Tool",
  "루프": "Loop",
  "서비스": "Service",
  "시스템": "System",
  "프레임워크": "Framework",
  "파이프라인": "Pipeline",
};

// Usage: For each lesson's tags array, apply:
// tags.map(tag => SYNONYM_MAP[tag] || tag).filter(Boolean)
```

### D.2 Module Auto-Injection Tags

```typescript
// src/content/tags/module-tags.ts
export const MODULE_TAGS: Record<string, string[]> = {
  "getting-started":      ["Vibe Coding", "Karpathy", "바이브코딩"],
  "development-basics":   ["Terminal", "Git", "CLI", "개발 환경"],
  "web-basics":           ["HTML", "CSS", "JavaScript", "HTTP"],
  "frontend-frameworks":  ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  "git-collaboration":    ["Git", "Pull Request", "GitHub Actions"],
  "data-backend":         ["PostgreSQL", "REST", "백엔드", "JSON"],
  "deployment-ops":       ["Deploy", "Twelve-Factor", "Monitoring"],
  "ai-basics":            ["LLM", "프롬프트 엔지니어링", "AI Basics"],
  "ai-coding-tools":      ["Claude Code", "Codex", "Grok", "Copilot"],
  "ai-system-design":     ["Agent", "MCP", "Tool Calling", "RAG", "Context Engineering"],
  "practical-vibe-coding":["실전", "Project", "Verification", "Human Review"],
  "explanation-practice": ["Explanation", "Verification"],
  "project-textbook":     ["Capstone", "Real-world", "Comprehensive"],
};

// Apply: Merge module tags with lesson-specific tags (deduplicate).
// Module tags take precedence in sorting (most relevant first).
```

### D.3 Target Tag Lexicon (Normalized Set)

See Section 11 (Appendix A of CURRICULUM_ANALYSIS.md) for the top 50 most frequent original tags. The normalization target reduces these to ~80 canonical tags including both high-frequency originals and module-auto-injected terms.

The full lexicon fits within `src/content/tags/allowed-tags.ts` and is used by:
1. LESSON_REGISTRY validation (reject unrecognized tags)
2. Search indexing (normalize search queries against lexicon)
3. Tag autocomplete in post creation form
4. New lesson creation lint rule (pre-commit hook)

---

*Roadmap end. This is a living document — update phases, priorities, and timelines as development progresses and new information becomes available.*
