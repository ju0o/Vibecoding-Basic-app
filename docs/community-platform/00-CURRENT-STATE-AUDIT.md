# 00 — 현재 상태 감사 (Current State Audit)

> **문서 종류**: 사실 기록 (Fact Record)
> **작성 모델**: Opus (판단·검증), Haiku (인벤토리 수집)
> **작성일**: 2026-08-07
> **상태**: 확정
> **목적**: 커뮤니티 전환 설계의 모든 판단이 딛고 설 **검증된 사실 기반**을 고정한다. 이 문서에 없는 사실은 다른 문서에서 근거로 쓸 수 없다.

---

## 0. 이 문서를 읽는 법

이 문서는 **추측을 포함하지 않는다**. 모든 항목은 다음 세 등급 중 하나로 표기한다.

| 등급 | 의미 | 표기 |
|---|---|---|
| **검증됨** | 파일을 직접 읽거나 명령을 실행해 확인함 | ✅ |
| **인벤토리 기반** | Haiku 에이전트가 수집하고 Opus가 표본 검증함 | 📋 |
| **불일치 발견** | 기존 문서의 서술이 실제 코드와 다름 | ⚠️ |

`⚠️` 항목은 **§9 문서 드리프트**에 모아 두었으며, 설계 판단에 영향을 준 것은 본문에서 다시 언급한다.

---

## 1. 리포지토리 베이스라인 (지시서 §4 준수 기록)

| 항목 | 값 | 등급 |
|---|---|---|
| 절대 경로 | `D:\ai_vibe_coding_master` (POSIX: `/d/ai_vibe_coding_master`) | ✅ |
| 브랜치 | `master` | ✅ |
| HEAD 커밋 | `272b2b175efefd4658c125788fa2cde3712a67fd` | ✅ |
| HEAD 커밋 메시지 | `ATLAS-OPS: add project-scoped Codex multi-agent configuration` | ✅ |
| 미커밋 변경 총계 (기획 착수 시점) | **38건** | ✅ |
| — 추적 파일 수정 (` M`) | 7건 | ✅ |
| — 미추적 파일/디렉터리 (`??`) | 31건 | ✅ |

### 1-1. 미커밋 변경 전체 목록 (기획 착수 시점 스냅샷)

**추적 파일 수정 7건**

```
 M DESIGN.md
 M ai-ops/STATE.md
 M ai-ops/reports/CODEX-P0-WORKFLOW-HANDOFF.md
 M content/practice/vibe-coding-foundation/11-files-connect-practice.md
 M src/app/learn/page.tsx
 M src/features/learning-interactions/file-connect/FileConnectExperience.tsx
 M src/features/learning-interactions/web-layers/WebLayersExperience.tsx
```

**미추적 31건**

```
?? CONCEPTS.md
?? INTERFACE_SPEC.md
?? TEAM_GLOSSARY.md
?? ai-ops/V3-AGENT-MAP.md
?? ai-ops/V3-APPENDIX.md
?? ai-ops/V3-BRAND-FUNNEL.md
?? ai-ops/V3-CONTEXT-PACKAGE.md
?? ai-ops/V3-MASTER-TOC.md
?? ai-ops/V3-WORKFLOW.md
?? ai-ops/master-toc.md
?? ai-ops/reports/CODEX-AGENT-SKILL-AUDIT.md
?? ai-ops/reports/CODEX-RP0-NEXT-CONTEXT-PACKAGE.md
?? ai-ops/reports/CODEX-RP0-RECOVERY-AUDIT.md
?? ai-ops/reports/CODEX-RP0-WORKING-TREE-INVENTORY.md
?? ai-ops/reports/RP0_1_SCOPE_MEASUREMENT.md
?? ai-ops/reports/RP0_1_SCOPE_MEASUREMENT_DRAFT.md
?? ai-ops/reports/V2_BUILD_REPORT.md
?? ai-ops/roadmap/CODEX-MODEL-ROUTING-POLICY.md
?? ai-ops/roadmap/CODEX-MULTI-AGENT-OPERATING-PLAN.md
?? content/curriculum/
?? content/practice/vibe-coding-foundation/12-frontend-practice.md
?? content/practice/vibe-coding-foundation/13-backend-practice.md
?? content/practice/vibe-coding-foundation/14-api-practice.md
?? content/practice/vibe-coding-foundation/15-database-practice.md
?? content/practice/vibe-coding-foundation/16-good-ai-task-request-practice.md
?? content/practice/vibe-coding-foundation/17-prompt-engineering-practice.md
?? content/practice/vibe-coding-foundation/18-context-engineering-practice.md
?? content/practice/vibe-coding-foundation/19-related-files-context-practice.md
?? src/app/learn/ai-engineering-v2/
?? src/features/learning-interactions/checkpoints/
?? src/features/learning-interactions/core/usePrefersReducedMotion.ts
```

### 1-2. 이 미커밋 변경에 대한 처리 방침 (확정)

| 방침 | 내용 |
|---|---|
| 되돌리지 않는다 | `git checkout`, `git restore`, `git reset`, `git clean` 어떤 것도 실행하지 않았고, 구현 단계에서도 실행 금지 |
| 커밋하지 않는다 | 이 38건은 다른 작업 흐름(ATLAS-OPS / CODEX 계열)의 산출물이며 커뮤니티 전환과 무관하다 |
| 수정하지 않는다 | 커뮤니티 전환 구현은 이 38건 중 **어떤 파일도 건드리지 않는다** |
| 유일한 예외 | `src/app/learn/ai-engineering-v2/`, `src/features/learning-interactions/checkpoints/` 는 신규 라우트/기능이므로, 구현 단계에서 라우트 충돌 검사 대상에 포함한다 (충돌 시 커뮤니티 쪽이 양보) |

### 1-3. 기획 산출물의 델타 (검증)

기획 문서 작성 후 `git status --short` 재실행 결과 **39건**.

| 델타 | 항목 | 판정 |
|---|---|---|
| +1 | `?? docs/` | ✅ 신규 문서 디렉터리 `docs/community-platform/` 1개만 추가됨 |

**결론: 소스코드 변경 0건.** `src/`, `content/`, `ai-ops/`, `public/`, 루트 설정 파일 중 어느 것도 이번 기획으로 인해 상태가 바뀌지 않았다.

---

## 2. 기술 스택 (전량 검증)

### 2-1. 런타임 의존성 (`package.json` `dependencies`) ✅

| 패키지 | 버전 | 용도 |
|---|---|---|
| `next` | 16.2.10 | App Router, 정적 내보내기 |
| `react` | 19.2.7 | — |
| `react-dom` | 19.2.7 | — |
| `@phosphor-icons/react` | 2.1.10 | 아이콘 |
| `react-markdown` | 10.1.0 | 레슨 마크다운 렌더링 |
| `rehype-raw` | ^7.0.0 | 마크다운 내 HTML 허용 |
| `zod` | 4.4.3 | localStorage 상태 스키마 검증 |

### 2-2. 개발 의존성 ✅

| 패키지 | 버전 |
|---|---|
| `typescript` | 6.0.3 |
| `@biomejs/biome` | 2.5.2 |
| `vitest` | 4.1.9 |
| `tailwindcss` / `@tailwindcss/postcss` | 4.3.2 |
| `@types/node` | 26.1.0 |
| `@types/react` | 19.2.17 |
| `@types/react-dom` | 19.2.3 |

### 2-3. **결정적 사실: Firebase SDK가 프로젝트에 존재하지 않는다** ✅

```
$ grep -c firebase package.json
0
```

`package.json` 전체에서 `firebase` 문자열이 **0회** 등장한다. 즉:

| 확인 항목 | 상태 |
|---|---|
| `firebase` (클라이언트 SDK) | ❌ 미설치 |
| `firebase-admin` | ❌ 미설치 |
| `firebase-functions` | ❌ 미설치 |
| `firebase-tools` | ❌ 미설치 (배포 시 `npx firebase-tools` 로 일회성 실행) |
| Firebase Authentication 사용 | ❌ 없음 |
| Firestore 사용 | ❌ 없음 |
| Cloud Storage 사용 | ❌ 없음 |
| Cloud Functions 사용 | ❌ 없음 |

**Firebase는 현재 Hosting 전용으로만 쓰인다.** 이것이 커뮤니티 전환이 "기존 백엔드에 얹기"가 아니라 **"백엔드를 처음 도입하기"** 인 이유이며, [`04-TECHNICAL-ARCHITECTURE.md`](./04-TECHNICAL-ARCHITECTURE.md) 의 런타임 선택과 [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-001 의 전제다.

*D-025에서 V1 Cloud Functions 미사용으로 확정되어 Blaze 요금제가 필요하지 않다. 이미지 업로드 인증은 Cloudflare Worker가 대체한다. → [`01-PRODUCT-PRD.md`](./01-PRODUCT-PRD.md) OPEN-P02, [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-011.

### 2-4. npm 스크립트 ✅

```json
{
  "dev": "next dev",
  "prebuild": "node scripts/generate-sitemap.mjs",
  "build": "next build",
  "start": "next start",
  "lint": "biome check .",
  "format": "biome check --write .",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "verify": "npm run lint && npm run typecheck && npm run test && npm run build",
  "sitemap": "node scripts/generate-sitemap.mjs",
  "doctor": "npx react-doctor@latest --json"
}
```

**`npm run verify` 가 기존 품질 게이트다.** 커뮤니티 전환은 이 게이트를 확장하되 대체하지 않는다 → [`10-ACCEPTANCE-TEST-PLAN.md`](./10-ACCEPTANCE-TEST-PLAN.md).

`prebuild` 훅이 `generate-sitemap.mjs` 를 자동 실행하므로, **신규 커뮤니티 라우트를 사이트맵에 넣으려면 이 스크립트를 수정해야 한다** — 단, 동적 상세 페이지(`/community/posts/{id}`)는 빌드 시점에 존재하지 않으므로 사이트맵에 넣을 수 없다.

---

## 3. 빌드·배포 구성 (전량 검증)

### 3-1. `next.config.ts` ✅

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Firebase 정적 호스팅(firebase.json public: "out")용 정적 내보내기.
  output: "export",
  // Large static export (lessons + atlas + studio) can exceed default 60s/page under load.
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

**`output: "export"` 가 이 프로젝트 전체 설계의 최상위 제약이다.**

| 제약 | 결과 |
|---|---|
| 서버 런타임 없음 | API Route, Server Action, Route Handler, 미들웨어 전부 사용 불가 |
| 동적 세그먼트 불가 | `generateStaticParams` 로 빌드 시점에 확정 가능한 경로만 생성됨. 런타임에 생성되는 게시글 ID는 불가능 |
| 세션 쿠키 불가 | 서버가 없으므로 HttpOnly 세션 쿠키 검증 지점이 없다. 인증은 클라이언트 SDK + Firestore Rules 로만 강제 가능 |
| 이미지 최적화 없음 | `images.unoptimized: true` — 업로드 이미지도 클라이언트에서 리사이즈해야 함 |
| 빌드 타임아웃 180초 | 이미 페이지 수가 많아 기본 60초를 초과함. 커뮤니티 라우트 추가 시 이 값 재확인 필요 |

→ 이 제약이 [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-001(런타임 선택), D-002(정적 셸 + rewrites)를 강제한다.

### 3-2. `firebase.json` ✅

```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
      { "source": "/sitemap.xml", "headers": [{ "key": "Cache-Control", "value": "public,max-age=3600" }] },
      { "source": "/robots.txt",  "headers": [{ "key": "Cache-Control", "value": "public,max-age=3600" }] }
    ]
  }
}
```

**현재 `rewrites` 블록이 존재하지 않는다.** 커뮤니티 전환은 이 파일에 `rewrites` 배열을 **신규 추가**한다 (기존 `headers`·`cleanUrls`·`trailingSlash` 는 변경 금지) → [`04-TECHNICAL-ARCHITECTURE.md`](./04-TECHNICAL-ARCHITECTURE.md), [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-002.

**주의 (구현 시 검증 필수)**: `cleanUrls: true` 와 `rewrites` 는 상호작용한다. Firebase Hosting 은 정적 파일 매칭 → rewrites 순으로 처리하므로, `/community/post.html` 실물 파일이 존재하는 상태에서 `/community/posts/*` 를 그 파일로 rewrite 하는 구성은 성립한다. 그러나 `cleanUrls` 가 `/community/post` 요청을 `/community/post.html` 로 매핑하는 동작과 겹치므로, **Phase 4 회귀 테스트에서 실제 배포 전 에뮬레이터로 반드시 확인한다** → [`10-ACCEPTANCE-TEST-PLAN.md`](./10-ACCEPTANCE-TEST-PLAN.md).

### 3-3. `.firebaserc` ✅

```json
{ "projects": { "default": "ju0o-ec967" } }
```

Firebase 프로젝트 ID: **`ju0o-ec967`**. 배포 도메인 기본값: `https://ju0o-ec967.web.app`.

### 3-4. 배포 절차 📋

```
npm run verify
npx firebase-tools deploy --only hosting --project ju0o-ec967
```

현재는 **Hosting 단독 배포**다. 커뮤니티 전환 후에는 `--only hosting,firestore:rules,firestore:indexes` 로 확장되며, **배포 순서가 안전에 직결된다** (Rules 먼저 → Hosting) → [`08-IMPLEMENTATION-ROADMAP.md`](./08-IMPLEMENTATION-ROADMAP.md) Phase 10.

---

## 4. 라우트 인벤토리

### 4-1. 총 라우트 수: **52** ✅ (확정)

```
$ find src/app -name "page.tsx" | wc -l
52
```

> **불일치 해소 기록**: 기획 초기 작업 노트(CANON)의 산문 서술은 "51개"였고, IA 문서 작성 시 재집계에서 52가 나와 [`02-INFORMATION-ARCHITECTURE.md`](./02-INFORMATION-ARCHITECTURE.md) §4-1 에 불일치가 기록되었다.
> **본 감사에서 파일 시스템 직접 집계로 52를 확정한다. 이후 모든 문서의 정본 값은 52다.** 51로 서술된 곳은 오기로 간주하고 정정 대상이다.

### 4-2. 라우트 성격 분류 📋

| 분류 | 특징 |
|---|---|
| 정적 콘텐츠 라우트 | 레슨·아틀라스·커리큘럼·소개·정책 등. 빌드 시점 데이터로 완전 확정 |
| 개발 전용 라우트 | `/atlas/studio/*` **3개**. `NODE_ENV === "development"` 조건으로 프로덕션에서 비활성 |
| 쓰기 경로 | **0개**. 서버로 데이터를 보내는 경로가 전무하다 |
| 데이터 성격 | 전부 읽기 전용 정적/계산 데이터 |

**"쓰기 경로 0개"가 이 프로젝트의 현재 보안 표면이다.** 커뮤니티 전환은 쓰기 경로를 처음 만드는 작업이므로, 보안 설계는 "기존 보안을 확장"하는 것이 아니라 **"보안 경계를 신설"**하는 것이다 → [`06-SECURITY-AND-MODERATION-SSOT.md`](./06-SECURITY-AND-MODERATION-SSOT.md).

### 4-3. 네비게이션 구조 📋

`src/content/site-navigation.ts` 에 4개 배열로 중앙 집중되어 있다.

| 배열 | 항목 수 | 용도 |
|---|---|---|
| `PRIMARY_NAV` | 7 | 데스크톱 상단 |
| `MOBILE_PRIMARY_NAV` | 3 | 모바일 하단 탭 |
| `MOBILE_MORE_NAV` | 4 | 모바일 더보기 |
| `FOOTER_NAV` | 12 | 푸터 |

상수 `DAY1_HREF = "/learn/vibe-coding-foundation/day-1"`.

**네비게이션이 한 파일에 모여 있다는 점이 유리하다.** 커뮤니티 진입점 추가는 이 파일 하나의 수정으로 끝나며, 기존 라우트 파일을 건드릴 필요가 없다 → [`02-INFORMATION-ARCHITECTURE.md`](./02-INFORMATION-ARCHITECTURE.md).

---

## 5. 콘텐츠 자산 (보존 대상)

### 5-1. `src/content/` 코어 데이터 📋

| 파일 | 규모 | 내용 |
|---|---|---|
| `schema.ts` | 94줄 | `MODULE_IDS` 13개, `LESSON_SECTION_DEFINITIONS` 8개, 타입 `LessonMeta` / `GlossaryTerm` / `ResourceLink` / `SearchEntry` |
| `curriculum.ts` | 1,305줄 | 모듈 13개, `LESSON_META` **100개** |
| `glossary.ts` | 3,740줄 | 용어 **456개** |
| `resources.ts` | 58줄 | 외부 링크 9개 |
| `atlas.ts` | 442줄 | `ATLAS_CONCEPTS` 21, `ATLAS_CHAPTER_SECTIONS` 14, `ATLAS_ARCS` 6 |

### 5-2. 파일 자산 📋

| 경로 | 규모 |
|---|---|
| `src/content/lessons/markdown/` | 마크다운 **100개** |
| `src/content/lessons/diagrams/` | SVG 다이어그램 폴더 **79개** |
| `src/content/atlas/chapters/` | 마크다운 **21개** |
| `content/` (루트) | **55개** — courses 26, practice 14, curriculum 9, assessment 3, instructor 2, interactions 1 |

### 5-3. 빌드 타임 정적 임포트 증거 ✅

```typescript
// src/lib/lesson-content.ts:4
import { CURRICULUM_MODULES, LESSON_META } from "@/content/curriculum"

// src/lib/search-index.ts:1-2
import { GLOSSARY_TERMS } from "@/content/glossary"
import { RESOURCE_LINKS } from "@/content/resources"
```

**모든 교육 콘텐츠는 TypeScript 모듈로 번들에 정적 임포트된다.** 런타임 fetch 가 없으므로:

| 함의 | 내용 |
|---|---|
| 커뮤니티 도입이 교육 콘텐츠를 깨뜨릴 경로가 없다 | 두 데이터 소스가 물리적으로 분리됨 (번들 vs Firestore) |
| 교육 콘텐츠를 Firestore로 옮기지 않는다 | V1 범위 밖. 정적 임포트 유지 |
| 단, 번들 크기는 공유된다 | Firebase SDK 추가 시 초기 번들 증가 → 코드 스플리팅으로 커뮤니티 청크 분리 필요 → [`04-TECHNICAL-ARCHITECTURE.md`](./04-TECHNICAL-ARCHITECTURE.md) |

### 5-4. Firestore 연결용 안정 식별자 ✅ (중요)

커뮤니티 데이터가 교육 콘텐츠를 참조할 때(예: "이 레슨에 대한 질문 글") **다음 식별자만 사용한다.**

| 식별자 | 출처 | 안정성 근거 |
|---|---|---|
| `lesson.slug` | `curriculum.ts` LESSON_META | URL에 노출되어 이미 외부 계약이 됨 |
| `glossary.term` | `glossary.ts` | 용어 자체가 키 |
| `atlas.id` | `atlas.ts` ATLAS_CONCEPTS | 명시적 ID 필드 |
| `lesson.moduleId` | `MODULE_IDS` (schema.ts) | 13개 고정 상수 |

**사용 금지 식별자**: `title`, `summary`, `order` — 콘텐츠 편집으로 언제든 바뀌며, 바뀌면 Firestore 참조가 조용히 끊어진다.

이 규칙은 [`05-DATA-MODEL-SSOT.md`](./05-DATA-MODEL-SSOT.md) 의 참조 필드 정의에 반영되어야 한다.

### 5-5. 코스 마크다운 프론트매터 📋

`content/courses/` 마크다운은 `lesson_id`, `course_id`, `stage_id`, `flow`, `site_wired`, `sources_checked_at` 키를 가진다. 이는 `src/content/` 의 사이트 데이터와 **별도 체계**이며, 현재 사이트 빌드에 직접 참여하지 않는 편집 원본 성격이다. 커뮤니티 전환은 이 체계를 건드리지 않는다.

---

## 6. 상태 관리 현황 (보존 대상)

### 6-1. localStorage 학습 진도 ✅

| 항목 | 값 |
|---|---|
| 스토리지 키 | `"ai-vibe-coding-master-learning-state"` |
| 정의 위치 | `src/features/.../LearningStateProvider.tsx:7` (STORAGE_KEY) |
| 타입 정의 | `src/lib/progress.ts:1-7` |
| 검증 | 로드 시 zod 스키마로 파싱 (`readStoredState()`) |

**저장 형태**

```typescript
{
  completedLessons: string[]
  checklistItems: Record<string, string[]>
  bookmarks: string[]
  lastReadLessonSlug?: string
  lastReadAt?: string
}
```

**코드 위치 (회귀 테스트 앵커)**

| 기능 | 위치 |
|---|---|
| 로드 (zod 검증 포함) | `LearningStateProvider.tsx:40-43` |
| 저장 | `LearningStateProvider.tsx:45-49` |
| `toggleLessonComplete` / `toggleBookmark` / `toggleChecklistItem` | `LearningStateProvider.tsx:51-76` |
| `recordLessonVisit` | `LearningStateProvider.tsx:79-84` |

### 6-2. 이 구조가 설계에 미친 영향

| 사실 | 설계 결과 |
|---|---|
| 학습 진도가 **계정과 무관하게** localStorage에만 있다 | 로그인해도 진도가 서버로 가지 않는다. V1에서 동기화하지 않는다 → [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-013 |
| `bookmarks: string[]` 가 **레슨 북마크**다 | 커뮤니티 북마크(`bookmarks/{bookmarkId}` Firestore)와 **이름은 같지만 완전히 다른 것**이다. 코드·문서에서 혼동 금지 → D-007 |
| zod 검증이 이미 있다 | 스키마를 바꾸면 기존 사용자 진도가 검증 실패로 초기화될 수 있다. **`LearningStateProvider` 와 `src/lib/progress.ts` 는 커뮤니티 전환에서 변경 금지** |

### 6-3. Provider 트리 ✅

`src/app/layout.tsx` 기준:

```
LearningStateProvider
  └─ SiteHeader (searchEntries={searchEntries})
  └─ main
  └─ SiteFooter
```

`getSearchIndex()` 가 **빌드 시점**에 호출되어 `searchEntries` 를 헤더에 주입한다.

**커뮤니티 전환 시 `AuthProvider` 를 추가해야 하는데, 이 트리를 건드린다.** 이는 커뮤니티 전환이 기존 파일을 수정하는 **소수의 지점 중 하나**이므로, 회귀 테스트에서 최우선 검증 대상이다 → [`10-ACCEPTANCE-TEST-PLAN.md`](./10-ACCEPTANCE-TEST-PLAN.md).

### 6-4. 검색 ✅

빌드 시점에 생성된 정적 인덱스를 클라이언트에서 점수화하는 방식. 서버 검색 없음.
→ 커뮤니티 게시글은 이 인덱스에 들어갈 수 없다 (빌드 시점에 존재하지 않음). V1 커뮤니티 검색은 카테고리/태그/정렬 필터로 한정 → [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-012.

### 6-5. `src/lib/` 구성 📋

`atlas.ts`, `atlas.test.ts`, `atlas-progress.ts`, `lesson-content.ts`, `lesson-content.test.ts`, `progress.ts`, `progress.test.ts`, `search.ts`, `search-index.ts`

**기존 테스트가 3개 존재한다** (`atlas.test.ts`, `lesson-content.test.ts`, `progress.test.ts`). 이들은 회귀 방지의 1차 방어선이며, 커뮤니티 전환 중 **한 번도 실패해서는 안 된다** → [`10-ACCEPTANCE-TEST-PLAN.md`](./10-ACCEPTANCE-TEST-PLAN.md).

---

## 7. 보안·공개 상태 (검증 결과가 기존 문서와 다름)

### 7-1. `public/robots.txt` 실측 ✅

```
User-agent: *
Allow: /

Sitemap: https://ju0o-ec967.web.app/sitemap.xml
```

**전체 허용이다.** 크롤링 차단이 아니다.

### 7-2. `src/app/layout.tsx` 메타데이터 실측 ✅

```typescript
robots: {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
}
```

**색인 허용이다.** `noindex` 가 아니다.

### 7-3. `PasswordGate` 실측 ✅

```
$ grep -rln "PasswordGate" src/ --include=*.tsx --include=*.ts
src/components/site/PasswordGate.tsx    ← 자기 자신의 정의
src/content/glossary.ts                 ← 산문 속 교육용 예시 언급 (L3729)
```

| 확인 | 결과 |
|---|---|
| `layout.tsx` 에서 임포트 | ❌ 없음 |
| 어느 페이지에서든 렌더링 | ❌ 없음 |
| 컴포넌트 내용 | 클라이언트 SHA-256 게이트. `STORAGE_KEY = "avcm-unlock"`, `PASSWORD_HASH = process.env.NEXT_PUBLIC_SITE_PASSWORD_HASH` |

**`PasswordGate` 는 데드 코드다.** 사이트에 비밀번호 보호가 걸려 있지 않다.

### 7-4. 종합 판정 ⚠️

| 항목 | 실제 상태 |
|---|---|
| 사이트 공개 여부 | **완전 공개** — 누구나 접근 가능, 검색엔진 색인 허용 |
| 비밀번호 게이트 | **작동하지 않음** (데드 코드) |
| 인증 | 없음 |

**이것이 커뮤니티 설계에 미치는 영향**: 회원가입 기능을 붙이는 순간, 이미 공개된 사이트에 **처음으로 개인정보 처리가 발생**한다. 따라서 개인정보처리방침·이용약관 갱신이 선택이 아니라 필수 선행 조건이다 → [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-015 supersede 표 (`src/app/privacy/page.tsx` Phase 3, `src/app/terms/page.tsx` Phase 8).

`.env.local` 에는 `NEXT_PUBLIC_SITE_PASSWORD_HASH` 하나만 존재한다 📋. Firebase 클라이언트 설정값 추가 시 이 파일이 확장되며, `NEXT_PUBLIC_` 접두사 값은 **번들에 그대로 노출된다**는 점을 전제로 설계해야 한다 (Firebase 웹 API 키는 원래 공개값이므로 문제없으나, 그 외 비밀값을 여기 두면 안 된다) → [`06-SECURITY-AND-MODERATION-SSOT.md`](./06-SECURITY-AND-MODERATION-SSOT.md).

---

## 8. 기존 운영 규칙 (준수 대상)

### 8-1. `AGENTS.md` 보호 경로 📋

13개 경로가 보호 대상으로 지정되어 있다. 커뮤니티 전환과 관련된 주요 항목:

```
src/content/lessons/**
src/content/glossary.ts
src/app/atlas/**
src/features/atlas/**
ai-ops/knowledge-base/entries/**
```

**커뮤니티 전환은 이 경로들을 전혀 건드리지 않는다.** (§5-3 에서 확인했듯 데이터 소스가 물리적으로 분리되어 있어 애초에 건드릴 이유가 없다.)

### 8-2. `AGENTS.md` 금지 행위 📋

`git reset` / `git clean` / `git rebase` / force push / 태그 덮어쓰기 / 임의 배포 금지.
→ 본 기획은 이 중 어느 것도 수행하지 않았으며, 구현 단계에서도 동일하게 적용된다.

### 8-3. `ai-ops/` 문서 체계 📋

| 하위 디렉터리 | 문서 수 |
|---|---|
| `reports/` | 66 |
| `roadmap/` | 38 |
| `prompts/` | 17 |
| `agents/` | 14 |
| `skills/` | 8 |
| `workflows/` | 7 |
| `contracts/` | 6 |
| `qa/` | 5 |
| `curriculum/` | 4 |
| `knowledge-base/`, `outputs/`, `sources/` | 각 2 |
| `executors/`, `research-queue/` | 각 1 |

루트 문서: `README.md`, `AGENTS.md`, `DESIGN.md`, `CONCEPTS.md`, `INTERFACE_SPEC.md`, `TEAM_GLOSSARY.md`, `THIRD_PARTY_NOTICES.md`

**커뮤니티 기획 문서는 이 체계에 섞지 않고 신규 `docs/community-platform/` 에 격리했다** → [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-015.

---

## 9. 문서 드리프트 (발견된 불일치)

기존 문서의 서술이 실제 코드와 다른 항목. **설계 근거로 사용 금지.**

| # | 문서 | 문서의 주장 | 실제 (검증) | 영향 |
|---|---|---|---|---|
| DR-1 | `ai-ops/DEPLOY-GUIDE.md` | 사이트가 "비밀번호 게이트 + robots.txt 전체 차단 + noindex (CITATION-POLICY 모드 A)"로 보호됨 | §7 참조 — 셋 다 사실 아님. 사이트는 완전 공개 | **큼.** "이미 비공개니까 커뮤니티 붙여도 안전하다"는 전제가 성립하지 않는다. 개인정보 처리 방침 갱신이 선행 필수 |
| DR-2 | 기획 초기 작업 노트(CANON) 산문 | 라우트 51개 | 실측 **52개** (§4-1) | 작음. 본 문서에서 52로 확정 |

**DR-1 처리 방침**: `ai-ops/DEPLOY-GUIDE.md` 는 [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) D-015 의 supersede 표에 Phase 1 대상으로 이미 등재되어 있다. **본 기획에서는 수정하지 않는다** (지시서 §3 "기존 파일 수정 금지"). 구현 Phase 1 에서 별도 승인을 받아 정정한다.

---

## 10. 커뮤니티 전환이 건드리는 기존 파일 (전체 목록)

지시서 §3 은 기획 단계의 소스 수정을 금지한다. 아래는 **구현 단계에서** 불가피하게 수정될 기존 파일의 완전 목록이며, 이 목록 밖의 기존 파일은 수정하지 않는다.

| 파일 | 수정 내용 | Phase | 회귀 위험 |
|---|---|---|---|
| `package.json` | Firebase SDK 의존성 추가 | 1 | 낮음 (추가만) |
| `firebase.json` | `rewrites` 블록 신규 추가 | 4 | **높음** — `cleanUrls` 와 상호작용 (§3-2) |
| `src/app/layout.tsx` | `AuthProvider` 를 Provider 트리에 추가 | 2 | **높음** — 전 라우트 영향 (§6-3) |
| `src/content/site-navigation.ts` | 커뮤니티/자료실/로그인 진입점 추가 | 4 | 중간 — 4개 배열 모두 확인 필요 |
| `scripts/generate-sitemap.mjs` | 신규 정적 라우트 반영 | 10 | 낮음 |
| `.env.local` / 환경변수 | Firebase 클라이언트 설정 추가 | 1 | 낮음 |
| `src/app/privacy/page.tsx` | 개인정보 처리 항목 갱신 | 3 | 낮음 (별도 승인 필요) |
| `src/app/terms/page.tsx` | 커뮤니티 이용약관 추가 | 8 | 낮음 (별도 승인 필요) |
| `README.md` | 커뮤니티 기능 반영 | 10 | 없음 (별도 승인 필요) |
| `ai-ops/DEPLOY-GUIDE.md` | DR-1 정정 + 확장 배포 절차 | 1 | 없음 (별도 승인 필요) |
| `AGENTS.md` | 보호 경로에 커뮤니티 경로 추가 | 1 | 없음 (별도 승인 필요) |
| `ai-ops/STATE.md` | 상태 갱신 | 0 | 없음 (별도 승인 필요) |

**절대 수정 금지 (회귀 위험 최상위)**

| 파일 | 이유 |
|---|---|
| `src/features/.../LearningStateProvider.tsx` | localStorage 스키마 변경 시 기존 사용자 학습 진도 소실 (§6-2) |
| `src/lib/progress.ts` | 위와 동일 |
| `src/content/curriculum.ts` / `glossary.ts` / `atlas.ts` | `AGENTS.md` 보호 경로 (§8-1) |
| `src/content/lessons/**` / `src/app/atlas/**` / `src/features/atlas/**` | `AGENTS.md` 보호 경로 |
| §1-1 의 미커밋 변경 38건 전체 | 다른 작업 흐름의 산출물 (§1-2) |

---

## 11. 감사 결론

| 질문 | 답 |
|---|---|
| 기존 교육 자산이 커뮤니티 도입으로 손상될 구조적 경로가 있는가? | **없다.** 정적 임포트(번들) vs Firestore(런타임)로 데이터 소스가 물리적으로 분리된다 (§5-3) |
| 그렇다면 회귀 위험은 어디에 있는가? | **§10 의 12개 파일에만 있다.** 특히 `layout.tsx`(전 라우트 영향)와 `firebase.json`(URL 라우팅 영향) 두 곳 |
| 백엔드를 "확장"하는가, "신설"하는가? | **신설이다.** Firebase SDK가 0개, 쓰기 경로가 0개다 (§2-3, §4-2) |
| 착수 전 반드시 해결해야 할 것은? | **Spark 요금제 확인** ([`01-PRODUCT-PRD.md`](./01-PRODUCT-PRD.md) OPEN-P02). V1에서 Cloud Functions를 사용하지 않으므로 Spark 요금제로 유지 가능. 이미지 업로드 인증은 Cloudflare Worker |
| 기존 문서를 그대로 믿어도 되는가? | **아니다.** DR-1 이 실재한다 (§9). 본 문서의 ✅ 항목만 근거로 사용한다 |

---

## 관련 문서

- [01-PRODUCT-PRD.md](./01-PRODUCT-PRD.md) — 제품 요구사항
- [02-INFORMATION-ARCHITECTURE.md](./02-INFORMATION-ARCHITECTURE.md) — 정보 구조
- [03-USER-FLOWS-AND-PERMISSIONS.md](./03-USER-FLOWS-AND-PERMISSIONS.md) — 사용자 흐름·권한
- [04-TECHNICAL-ARCHITECTURE.md](./04-TECHNICAL-ARCHITECTURE.md) — 기술 아키텍처
- [05-DATA-MODEL-SSOT.md](./05-DATA-MODEL-SSOT.md) — 데이터 모델
- [06-SECURITY-AND-MODERATION-SSOT.md](./06-SECURITY-AND-MODERATION-SSOT.md) — 보안·모더레이션
- [07-CONTENT-GOVERNANCE-SSOT.md](./07-CONTENT-GOVERNANCE-SSOT.md) — 콘텐츠 거버넌스
- [08-IMPLEMENTATION-ROADMAP.md](./08-IMPLEMENTATION-ROADMAP.md) — 구현 로드맵
- [09-GOOSE-IMPLEMENTATION-PACKETS.md](./09-GOOSE-IMPLEMENTATION-PACKETS.md) — 구현 패킷
- [10-ACCEPTANCE-TEST-PLAN.md](./10-ACCEPTANCE-TEST-PLAN.md) — 인수 테스트
- [11-DECISION-LOG.md](./11-DECISION-LOG.md) — 결정 로그
- [12-PLANNING-COMPLETION-REPORT.md](./12-PLANNING-COMPLETION-REPORT.md) — 기획 완료 보고
