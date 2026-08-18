# 구피티(Goopti) — Product Definition Document

**Version:** 1.0-draft  
**Author:** 구피티 커뮤니티 · JT-003  
**Status:** Planning — awaiting team review  
**Last Updated:** 2026-08-12

---

## Table of Contents

1. [Identity](#1-identity)
2. [Definition & Problem/Users/Value](#2-definition--problemusersvalue)
3. [Principles](#3-principles)
4. [IA Routes (Information Architecture)](#4-ia-routes-information-architecture)
5. [V1 Scope](#5-v1-scope)
6. [Firestore Data Model](#6-firestore-data-model)
7. [Acceptance Criteria](#7-acceptance-criteria)
8. [Implementation Phases](#8-implementation-phases)
9. [Migration Plan](#9-migration-plan)

---

## 1. Identity

| Attribute | Value |
|-----------|-------|
| **Product Name** | 구피티 (Goopti) |
| **Tagline** | 커뮤니티 중심 교육 아카이브 |
| **Platform Type** | Vibe Coding 교육 Next.js 웹앱 |
| **Owner** | 구피티 커뮤니티 |
| **Primary Tech Stack** | Next.js (App Router), TypeScript, Tailwind CSS, Firebase Auth, Cloud Firestore |
| **Content System** | Markdown lessons with YAML frontmatter, rendered via `src/content/schema` types |
| **Branch Reference** | `symphony/AVM-JT-003` — feature branch from main HEAD `c0091b5` |

구피티는 AI 시대 개발자를 위한 커뮤니티 기반 교육 플랫폼입니다. "바이브코딩(Vibe Coding)"을 핵심 메타포로 삼아, 자연어와 AI를 매개로 한 실용적 코딩 교육을 제공합니다.

---

## 2. Definition & Problem/Users/Value

### 2.1 What Is Goopti?

구피티는 다음과 같은 특징을 가진 교육 플랫폼입니다:

- **커뮤니티 중심**: 학습자·멘토·개발자가 콘텐츠를 함께 만들고 공유합니다. 단일 저자가 아닌 집단 지성으로 진화하는 아카이브.
- **교육 아카이브**: 13개 모듈 100개 이상의 마크다운 강의가 체계적으로 구성되어 있습니다. 각 강의는 프론트메타(레벨, 태그, 소요일)를 갖추어 필터링·검색됩니다.
- **Vibe Coding 교육**: 사람이 AI 도구를 활용해 실제 제품을 빠르게 만드는 과정을 배웁니다. 이론만 배우고 끝나지 않고, 실제로 코드를 생성하고 검증하는 경험을 쌓습니다.
- **점진적 난이도**: 입문 → 기초 → 중급 단계로 자연스럽게 난이도가 상승하며, 학습자는 자신의 수준에 맞는 학습 경로를 선택합니다.

### 2.2 The Problem

기존의 온라인 학습 환경에는 세 가지 근본적인 문제가 있습니다:

1. **수동적 학습**: 동영상 강의를 보고 끝나는 것이 대부분입니다. 시청률이 높다고 해서 실제로 코드를 작성해보거나 문제를 해결하는 것이 아닙니다.
2. **고립된 학습 경험**: 학습자가 혼자 문제해결을 시도할 때 막히는 순간, 도움을 줄 멘토나 동료 커뮤니티가 부재합니다.
3. **빠르게 변화하는 AI 시대에 뒤처지는 콘텐츠**: ChatGPT, Codex, Claude 등 AI 코딩 도구의 발전 속도에 맞춰 가르치는 교육 인프라가 거의 존재하지 않습니다.

구피티는 이 문제들을 다음과 같이 해결합니다:

- **실습 중심 구조**: 각 강의는 "왜 존재하는가" → "작동 원리" → "스펙과 세부" → "실전에서" → "원문으로 읽기"의 흐름으로 구성됩니다. 단순 이론이 아니라 즉시 적용 가능한 실습을 포함합니다.
- **커뮤니티 피드백 루프**: 학습자는 강의를 읽고 직접 따라해보면, 그 결과를 커뮤니티에 공유하고 피드백을 받습니다. 멘토는 이를 검토하고 개선 방향을 제시합니다.
- **AI 도구 통합 교육**: 프롬프트 엔지니어링부터 에이전트 설계까지, 현대 AI 코딩 툴킷을 체계적으로 다룹니다.

### 2.3 Target Users

| 사용자 유형 | 설명 | 주요 니즈 |
|-------------|------|-----------|
| **입문자 (Beginner)** | 프로그래밍 경험이 적은 학습자 | 개발 기초부터 차근차근, AI를 두려워하지 않고 활용하는 법 배우기 |
| **초급 학습자 (Basic)** | HTML/CSS/JS 기본 이해한 학습자 | React, Next.js, Git 협업 등 실무 프레임워크 습득 |
| **중급 개발자 (Intermediate)** | 백엔드/AI 시스템 설계 관심 있는 학습자 | Agent Loop, MCP, Context Engineering 등 심화 주제 |
| **멘토 (Mentor)** | 현업 개발자/교육자 | 학습자에게 실질적 도움이 되는 최신 콘텐츠 기여, 커뮤니티 관리 |

### 2.4 Value Proposition

구피티가 제공하는 핵심 가치:

1. **실제로 쓸 줄 알게 된다**: 강의를 마칠 때마다 작게나마 작동하는 산출물을 만들 수 있습니다. "懂了"가 아니라 "했다".
2. **혼자서가 아니다**: 막혔을 때 물어볼 사람, 결과물을 보여줄 커뮤니티가 있습니다.
3. **최신의 언어로 배운다**: Karpathy의 Vibe Coding 철학에서부터 최근 LLM 에이전트 구조까지, 빠르게 변하는 AI 개발 생태계를 한국어로 전달합니다.
4. **열린 아카이브**: 모든 강의가 오픈된 마크다운 파일로 저장되어 있고, 커뮤니티가 지속적으로 업데이트합니다.

---

## 3. Principles

구피티의 교육 철학과 프로덕트 원칙은 다음 네 가지 기둥 위에 세워집니다.

### P1. Learn by Doing (직접 해보기)

모든 개념은 "설명 → 따라하기 → 확인"의 순환으로 제공됩니다. 학습자는 강의를 읽는 것뿐만 아니라, 지정된 실습을 반드시 수행해야 합니다.

- 각 강의에는 명확한 실습 목표가 포함되어야 합니다.
- 강사/작성자 측에서는 "이 실습을 완료하면 학습자는 X를 할 수 있게 됩니다"라는 기대 결과가 명시되어야 합니다.
- 플랫폼 내에는 "Practice" 뷰어에서 강의를 읽으며 동시에 코드를 실험할 수 있는 환경을 제공합니다.

### P2. AI-Assisted Development (AI 보조 개발)

구피티 자체도 AI 코딩 도구로 개발합니다. 학습자는 플랫폼을 사용하면서:

- AI에게 어떻게 요청해야 효과적인지 체감합니다.
- AI가 생성한 코드를 스스로 검증하는 방법을 익힙니다.
- 프롬프트 → 코드 생성 → human review → 수정의 사이클을 직접 경험합니다.

이는 단순한 교리가 아니라 **생체 인증(Body-Mounted Evidence)** 입니다. 학습자가 AI를 사용하는 방식 자체가 교육의 일부가 됩니다.

### P3. Community-Driven Content Progression (커뮤니티 주도 콘텐츠 진화)

콘텐츠는 영원히 완성되지 않습니다. 커뮤니티의 참여로 지속적으로 개선되고 새로운 강의가 추가됩니다:

- **강의 제출**: 커뮤니티 구성원이 새 강의를 제안하면, 리뷰 에이전트(Education Review Agent + Fact Check Agent)가 품질을 검토합니다.
- **iterative 개선**: 기존 강의에 대한 피드백이 모이면, 담당 작자가 개정한 버전을 릴리즈합니다.
- **versioning**: 각 강의 파일의 frontmatter에 버전 정보가 포함되어, 어떤 상태의 버전을 보고 있는지 추적합니다.

### P4. Progressive Difficulty (점진적 난이도)

학습자는 무작위로 주제를 선택하기보다, 레벨별로 조직화된 커리큘럼을 따라 진행합니다.

```
입문 (Getting Started)
    ↓
기초 (Development Basics → Web Basics → Frontend Frameworks → Git)
    ↓
중급 (Data & Backend → Deployment → AI Basics → AI Coding Tools → AI System Design)
    ↓
심화 (Practical Vibe Coding → Explanation Practice → Project Textbook)
```

각 레벨은 이전 레벨의 개념을 전제하므로, 학습자는 누락된 부분이 없도록 순차적으로 진행할 수 있습니다.

---

## 4. IA Routes (Information Architecture)

구피티의 사이트 네비게이션은 다음 구조를 기반으로 합니다:

### 4.1 Navigation Map

```
┌─────────────────────────────────────────────────────────────┐
│                        Navbar                                │
│  Home  Lessons  Practice  Community  Dashboard  [Login]      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  HOME (/)                                                    │
│  - 구피티 소개 히어로 배너                                   │
│  - 커리큘럼 요약 (13 모듈 아이콘 그리드)                     │
│  - 최신 커뮤니티 게시글                                      │
│  - 시작하기 CTA                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  LESSONS (/lessons)                                          │
│  ├─ /lessons (목록 뷰)                                      │
│  │   ├─ Module selector (13개 모듈 탭)                      │
│  │   ├─ Level filter (입문/기초/중급)                       │
│  │   ├─ Tag search                                          │
│  │   └─ 각 카드: 제목, 레벨, 태그, 예상 소요시간              │
│  └─ /lessons/[slug] (강의 상세)                              │
│      ├─ TOC (자동 생성된 목차)                               │
│      ├─ 본문 (markdown-rendered)                             │
│      ├─ Related lessons (동일 moduleId)                      │
│      └─ Comment section (Community 연결)                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PRACTICE (/practice)                                        │
│  - 강의별 실습 과제 목록                                     │
│  - Code editor embed (선택적)                                │
│  - 제출 및 피드백 영역                                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  COMMUNITY (/community)                                      │
│  ├─ /community/posts                                         │
│  │   ├─ Create post form                                      │
│  │   ├─ Feed (최신순/인기순 정렬)                            │
│  │   └─ Post detail                                           │
│  ├─ /community/comments/:postId                               │
│  └─ /community/notifications                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  DASHBOARD (/dashboard)                                      │
│  ├─ /dashboard/progress    - 학습 진도 파이프               │
│  ├─ /dashboard/certificates- 완료 certificate                │
│  └─ /dashboard/settings     - 프로필 설정                    │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 V1 Feature Placement in IA

| Feature | Route | Description |
|---------|-------|-------------|
| Lesson Index | `/lessons` | 13개 모듈별lesson 필터링 표시 |
| Lesson Detail | `/lessons/[slug]` | 마크다운 렌더링 + TOC + 관련 강의 |
| Community Feed | `/community/posts` | 게시글 목록 (인증 필요) |
| Create Post | `/community/posts/new` | 글쓰기 폼 (승인 대기 상태) |
| Post Detail | `/community/posts/[id]` | 본문 + 댓글 + 좋아요 |
| Dashboard Progress | `/dashboard/progress` | 학습 완료 현황 차트 |
| Settings | `/dashboard/settings` | 프로필, 비밀번호, 알림 옵션 |

### 4.3 Hidden/Restricted Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/admin/*` | Admin role only | 관리자 대시보드 (Phase 3) |
| `/community/approve` | Admin role | 게시글 승인 워크플로우 |

---

## 5. V1 Scope

### 5.1 Learning Core

| Feature | Status | Notes |
|---------|--------|-------|
| Curriculum module list (13 modules) | ✅ In stash | `src/content/curriculum.ts` at `stash@{0}` |
| Lesson frontmatter schema | ✅ In stash | `src/content/schema.ts`, `lesson-frontmatter.ts` |
| Markdown-to-Html rendering | ✅ In stash | 100 lessons prepared with proper frontmatter |
| Module-based lesson filtering | 🔄 In scope | Needs route + UI integration |
| Level/tag filtering | 🔄 In scope | Frontmatter 필드 기반 필터링 |
| TOC auto-generation | 🔄 In scope | headings parse → table of contents |
| Lesson progression state saving | 🔄 In scope | Firestore에 `lessons_progress` 컬렉션 사용 |

**IN SCOPE for V1:**
- Full curriculum display (all 13 modules, 100 lessons)
- Individual lesson page with markdown rendering
- Filter/search by module, level, tag
- Reading progress saved per user
- Glossary resource links displayed alongside lessons

**OUT OF SCOPE for V1:**
- Interactive code playground (planned V2)
- Quiz/auto-grading system (planned V2)
- Video/audio lesson content (planned V2)
- Mobile-native app (web-first responsive)

### 5.2 Community MVP

| Feature | Status | Notes |
|---------|--------|-------|
| Firebase Auth (login/signup) | ✅ Merged | `symphony/AVM-COMMUNITY-001` |
| User data model + Firestore rules | ✅ Merged | `symphony/AVM-COMMUNITY-002` |
| Admin approval flow | ✅ Merged | `symphony/AVM-COMMUNITY-003` |
| Post creation (text + markdown) | 🔄 In scope | Needs UI integration |
| Post feed (pagination) | 🔄 In scope | Community feed view |
| Comments on posts | 🔄 In scope | Nested comment structure |
| Likes/upvotes | 🔄 In scope | Like counts per post |

**IN SCOPE for V1:**
- User registration/login (Email + Google OAuth via Firebase Auth — already merged)
- Community post creation with markdown support
- Post listing with sort (newest/popular)
- Post detail with comments and like button
- Basic moderation: admin can approve/reject posts
- Notification badge for likes/comments on own posts

**OUT OF SCOPE for V1:**
- Direct messaging between users
- Group/community sub-forums
- Rich media uploads (images, videos) in posts
- Push notifications (browser-only toast)
- Reputation/badge system

### 5.3 Admin

| Feature | Status | Notes |
|---------|--------|-------|
| Admin dashboard | 🔄 In scope | 게시글 승인, 통계, 사용자 관리 |
| Lesson content management | 🔄 In scope | 강사진 전용 업로드/편집 인터페이스 |
| Analytics overview | 🔄 In scope | 활성 사용자, 강의 조회수 |

**IN SCOPE for V1:**
- Admin role detection (custom claims via Firebase Admin SDK)
- Pending post approval queue
- Simple analytics: total users, total posts, active today

**OUT OF SCOPE for V1:**
- Automated content quality scoring (manual review only)
- Multi-language (Korean only)
- Advanced audit logging

---

## 6. Firestore Data Model

### 6.1 Collection: `users`

사용자 기본 정보. Firebase Auth UID을 고유 키로 사용합니다.

```typescript
interface UserDoc {
  uid: string;                  // FirebaseAuth UID (document ID)
  email: string;                // 로그인 이메일
  displayName: string;          // 표시 이름
  photoURL?: string;            // 프로필 이미지 URL
  role: 'user' | 'mentor' | 'admin';  // 역할
  level: 'beginner' | 'basic' | 'intermediate' | 'expert';  // 자기보고 레벨
  createdAt: Timestamp;         // 계정 생성일
  lastActiveAt: Timestamp;      // 마지막 활동 시간
  isApproved: boolean;          // admin 승인 여부 (AVM-COMMUNITY-003)
  bio?: string;                 // 간단한 소개
}
```

**Relationships:**
- `posts.authorRef → users/{uid}`
- `comments.authorRef → users/{uid}`
- `likes.userId → users/{uid}`
- `lessons_progress.userId → users/{uid}`

### 6.2 Collection: `posts`

커뮤니티 게시글.

```typescript
interface PostDoc {
  id: string;                   // 자동 생성 문서 ID
  authorUid: string;            // 작성자 UID
  title: string;                // 게시글 제목
  content: string;              // 마크다운 본문
  contentHash: string;          // 중복/변경 감지를 위한 해시
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  tags: string[];               // 주제 태그
  upvoteCount: number;          // 좋아요 수
  commentCount: number;         // 댓글 수
  views: number;                // 조회수
  createdAt: Timestamp;         // 생성일
  updatedAt: Timestamp;         // 수정일
  approvedAt?: Timestamp;       // 승인 시각
  approvedBy?: string;          // 승인자 UID
  rejectionReason?: string;     // 거부 사유 (AVM-COMMUNITY-003)
}
```

**Indexes:**
- `{status: asc, createdAt: desc}` — 승인대기 목록
- `{upvoteCount: desc, createdAt: desc}` — 인기글
- `authorUid` — 내 게시글 조회

### 6.3 Collection: `comments`

게시글에 달린 댓글.

```typescript
interface CommentDoc {
  id: string;                   // 자동 생성 문서 ID
  postId: string;               // 부모 게시글 ID
  authorUid: string;            // 작성자 UID
  parentCommentId?: string;     // 상위 댓글 ID (답글 구조)
  content: string;              // 마크다운 본문
  createdAt: Timestamp;
  updatedAt?: Timestamp;        // 수정일
  edited: boolean;              // 수정 여부 플래그
}
```

**Indexes:**
- `{postId: asc, createdAt: asc}` — 게시글별 댓글 목록

### 6.4 Collection: `lessons_progress`

학습 진도 추적.

```typescript
interface LessonProgressDoc {
  id: string;                   // userId:slug 또는 자동 ID
  userId: string;               // 학습자 UID
  lessonSlug: string;           // 강의 slug (예: vibe-coding-origin-karpathy)
  moduleId: string;             //所属 모듈 ID (예: getting-started)
  status: 'not_started' | 'in_progress' | 'completed';
  readPercentage: number;       // 0-100, 스크롤 위치 기준
  lastReadAt: Timestamp;        // 마지막 읽은 시간
  completedAt?: Timestamp;      // 완료 시각
  timeSpentMinutes: number;     // 누적 소비 시간
  notes?: string;               // 개인 학습 메모
}
```

**Indexes:**
- `{userId: asc, status: asc}` — 학습자의 미완료 강의 목록
- `{moduleId: asc, status: asc}` — 모듈별 진도 분석 (관리자용)

### 6.5 Collection: `likes`

좋아요(추천).

```typescript
interface LikeDoc {
  id: string;                   // 자동 생성 문서 ID
  targetKind: 'post' | 'comment';  // 대상 타입
  targetId: string;             // 대상 문서 ID
  userId: string;               // 좋아요 누른 사용자 UID
  createdAt: Timestamp;
}
```

**Indexes:**
- `{targetKind: asc, targetId: asc}` — 특정 게시글의 좋아요 목록
- `{userId: asc}` — 특정 사용자의 좋아요 기록
- Unique constraint: `(targetKind, targetId, userId)` — 중복 좋아요 방지

### 6.6 Data Flow Diagram

```
┌──────────┐    POSTS/COMMENTS/LIKES     ┌──────────────┐
│  User    │ ◄──────────────────────────► │  Firestore   │
│  (Auth)  │                              │   (Data)     │
└──────────┘                              └──────────────┘
                                                │
                                   ┌────────────▼──────────┐
                                   │  lessons_progress     │
                                   │  (learning state)     │
                                   └───────────────────────┘
```

---

## 7. Acceptance Criteria

다음 10가지 criterion은 V1의 최소 기능 요구사항을 정의합니다. 모두 테스트 가능해야 합니다.

### AC-1: Lesson Rendering from Markdown + Frontmatter

Given a lesson file in `src/content/lessons/markdown/`, when a user navigates to `/lessons/[slug]`, then the following must occur:
- [ ] The frontmatter fields (`title`, `summary`, `level`, `tags`, `minutes`) are parsed and displayed correctly
- [ ] The markdown body is rendered as HTML using a secure renderer (no raw `<script>` injection)
- [ ] Auto-generated TOC matches the first-level and second-level headings in the body
- [ ] Related lessons (same `moduleId`) are displayed below the main content
- [ ] All 100 lessons from the stash render without errors

### AC-2: Authentication Flow

Given an unauthenticated user visits `/community/posts/new`, when they attempt to create a post, then:
- [ ] They are redirected to `/login` (Firebase Auth sign-in page)
- [ ] After successful login, they are returned to the original destination
- [ ] A new user can register via `/signup` using email/password or Google OAuth
- [ ] New accounts start in `isApproved: false` state (pending admin approval from AVM-COMMUNITY-003)

### AC-3: Community Post Creation

Given an authenticated and approved user, when they submit a new post at `/community/posts/new`, then:
- [ ] The post is created with `status: "pending"`
- [ ] The post appears in the admin approval queue
- [ ] The user receives visual feedback that their post is awaiting approval
- [ ] Invalid submissions (empty title or empty content) are rejected with clear error messages

### AC-4: Post Feed Display

When a user navigates to `/community/posts`, then:
- [ ] Approved posts are listed, sorted by default to newest first
- [ ] Sort options include " Newest" and "Most Popular" (by upvoteCount)
- [ ] Each post card shows title, author name, tags, and upvote count
- [ ] Pagination or infinite scroll loads additional posts beyond the initial batch

### AC-5: Progress Tracking

Given a logged-in user views a lesson at `/lessons/[slug]`, when they scroll through the page, then:
- [ ] Read percentage updates based on viewport coverage (debounced, ≤2s interval)
- [ ] Progress is saved to Firestore `lessons_progress` collection on page unload or periodic interval
- [ ] `/dashboard/progress` displays completion status per module as a visual progress bar
- [ ] Marking a lesson as complete sets `status: "completed"` and records `completedAt` timestamp

### AC-6: Search and Filter

When a user is on the lessons index page `/lessons`, then:
- [ ] Filtering by module (13 tabs/buttons) shows only lessons belonging to that module
- [ ] Filtering by level shows only lessons matching the selected level (입문/기초/중급)
- [ ] Searching by keyword filters both titles and tags across all modules
- [ ] Combined filters work correctly (e.g., module="ai-system-design" AND level="중급")

### AC-7: Comments on Posts

Given a post detail page `/community/posts/[id]`, when a user adds a comment, then:
- [ ] The comment is saved to Firestore under the `comments` collection with correct `postId` and `authorUid`
- [ ] The comment appears immediately in the comments list below the post
- [ ] Users can reply to existing comments (nested `parentCommentId` reference)
- [ ] The post's `commentCount` field increments automatically

### AC-8: Likes/Upvotes

Given a post or comment detail view, when an authenticated user clicks the like button, then:
- [ ] A `LikeDoc` is created in the `likes` collection with unique `(targetKind, targetId, userId)`
- [ ] The corresponding `upvoteCount` (for posts) or inline counter (for comments) increments
- [ ] Clicking again toggles off the like (removes the `LikeDoc`)
- [ ] Unauthenticated users see a login prompt instead

### AC-9: Admin Approval Workflow

Given an admin user navigates to the admin panel, then:
- [ ] Pending posts (status = "pending") are displayed in an approval queue
- [ ] Admin can approve a post (changes status to "approved", sets `approvedAt` and `approvedBy`)
- [ ] Admin can reject a post with a reason (status = "rejected", stores `rejectionReason`)
- [ ] The author of a rejected post can see the reason and optionally resubmit

### AC-10: Curriculum Integration

When the site renders the home page or lessons index, then:
- [ ] All 13 curriculum modules from `CURRICULUM_MODULES` are displayed
- [ ] Each module card shows its title, description, and number of lessons
- [ ] Total estimated study time per module is calculated from lesson `minutes` values
- [ ] The curriculum is importable from `src/content/curriculum.ts` without runtime errors
- [ ] The schema types from `src/content/schema.ts` are properly typed (TypeScript strict mode passes)

---

## 8. Implementation Phases

### Phase 1: Foundation (Weeks 1-3)

**Goal:** Curriculum content accessible and navigable.

#### 1.1 Curriculum Restore from Stash

Stash `stash@{0}` contains the entire content layer:
- `src/content/curriculum.ts` — 13 modules definition
- `src/content/schema.ts` — TypeScript type definitions
- `src/content/lessons/markdown/*.md` — 100 lesson files with frontmatter
- `src/content/lesson-frontmatter.ts` — parsing utilities

**Actions:**
1. Extract lesson files and schema from `stash@{0}` into working directory
2. Verify TypeScript compilation passes with strict mode
3. Create test suite for frontmatter parsing (jest/vitest)
4. Ensure all 100 lessons parse successfully

#### 1.2 Lesson Routing & Rendering

1. Implement `/lessons` index page with module grid
2. Implement `/lessons/[slug]` dynamic route
3. Build markdown renderer component with:
   - Safe HTML output (DOMPurify or equivalent)
   - Syntax highlighting for code blocks
   - Callout/admonition support (`> [!WARNING]`, `> [!NOTE]` etc.)
   - Image path resolution for `/lesson-diagrams/` assets
4. Generate automatic TOC from heading parsing

#### 1.3 Module-Level Filtering

1. Add filter sidebar/tabs on `/lessons`
2. Implement client-side or server-side filtering by:
   - Module ID (tab selection)
   - Level (filter buttons)
   - Tags (search input)
3. Show result counts for each filter combination

**Phase 1 Deliverables:**
- All 100 lessons viewable via `/lessons/[slug]`
- Module grid on home page and `/lessons`
- Functional filtering and search

### Phase 2: Community MVP (Weeks 4-7)

**Goal:** Functional community platform with auth, posts, and interactions.

#### 2.1 Leverage Existing Community Branches

Three branches are already merged into main and provide foundational infrastructure:

| Branch | Hash | Contribution |
|--------|------|-------------|
| `symphony/AVM-COMMUNITY-001` | `9a2c7e3` | Firebase Auth SDK setup, login/signup pages |
| `symphony/AVM-COMMUNITY-002` | `90c52e6` | User data model in Firestore, security rules, indexes |
| `symphony/AVM-COMMUNITY-003` | `e856d8e` | Admin approval workflow for community posts |

**Actions:**
1. Audit existing implementations against this spec's data model
2. Fill gaps: ensure `PostDoc` schema matches Section 6.2 exactly
3. Integrate Auth guards into `/community/*` routes
4. Wire up admin role from Firebase custom claims

#### 2.2 Community Pages

1. Build `/community/posts` feed component
2. Build `/community/posts/new` create-post form
3. Build `/community/posts/[id]` detail page
4. Implement comment thread component under each post
5. Add like button to posts and comments

#### 2.3 Firestore Integration

1. Set up Firebase config in Next.js environment variables
2. Create Firestore service layer (`lib/firestore/posts.ts`, etc.)
3. Implement CRUD operations:
   - `createPost()` → saves to `posts` collection
   - `getPosts()` → fetches with pagination
   - `addComment()` → saves to `comments` collection
   - `toggleLike()` → creates/removes from `likes` collection
4. Real-time listeners for comment/like counts (optional, if performance allows)

#### 2.4 Admin Approval Queue

1. Admin-only route for pending post review
2. Approve/reject actions that update `PostDoc.status`
3. Notify authors of approval/rejection (toast/banner on next login)

**Phase 2 Deliverables:**
- Login/signup working end-to-end
- Posts creatable, visible after approval
- Comments and likes functional
- Admin approval queue operational

### Phase 3: Polish & Analytics (Weeks 8-10)

**Goal:** Search optimization, notifications, admin tools, and production readiness.

#### 3.1 Enhanced Search

1. Client-side search across lesson titles, summaries, and tags
2. Fuzzy matching for typo tolerance
3. Search results page with highlighted matches

#### 3.2 Notifications

1. Toast notifications for:
   - New like on your post/comment
   - New comment on your post
   - Post approved or rejected
2. Badge counter in navbar

#### 3.3 Admin Dashboard

1. Overview stats: total users, active today, total posts, pending reviews
2. User management: view roles, change roles, suspend accounts
3. Content moderation: bulk approve/reject, delete spam

#### 3.4 Performance & SEO

1. Static generation (SSG) for all lesson pages (`generateStaticParams`)
2. Open Graph meta tags for shared lesson cards
3. Sitemap generation
4. Loading skeleton UIs for all async components

**Phase 3 Deliverables:**
- Search works across all 100 lessons
- Notification system functional
- Admin dashboard with basic analytics
- Production-ready with SSG + SEO

---

## 9. Migration Plan

### 9.1 Current State Assessment

| Item | Location | Status |
|------|----------|--------|
| Curriculum modules | `stash@{0}:src/content/curriculum.ts` | Ready, not restored yet |
| Schema types | `stash@{0}:src/content/schema.ts` | Ready, not restored yet |
| Lesson files | `stash@{0}:src/content/lessons/markdown/` | 100 files, ready |
| Existing frontmatter | `src/content/lesson-frontmatter.ts` | Partial integration on current branch |
| Community features | `symphony/AVM-COMMUNITY-001~003` | Merged into main |
| Docs/product/ | Not present on any branch | No prior product docs exist |

### 9.2 Integration Steps

```
Step 1: Restore content layer from stash
  git show stash@{0}:src/content/curriculum.ts > src/content/curriculum.ts
  git show stash@{0}:src/content/schema.ts > src/content/schema.ts
  For each lesson file: git show stash@{0}:src/content/lessons/markdown/<file> > ...

Step 2: Verify build
  npm run build  # Must pass clean

Step 3: Create PRODUCT_DEFINITION.md (this document)
  → docs/product/PRODUCT_DEFINITION.md ← HERE

Step 4: Wire up curriculum to routes
  /lessons → CURRICULUM_MODULES × lessons
  /lessons/[slug] → individual lesson renderer

Step 5: Integrate community from existing branches
  Reuse Auth (COMMUNITY-001), User model (COMMUNITY-002),
  Approval flow (COMMUNITY-003) — no reinventing

Step 6: Testing and QA
  Run all acceptance criteria tests
  Manual testing per AC-1 through AC-10
```

### 9.3 Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Stash extraction breaks paths on Windows | Medium | High | Test each file restore manually; use bash-friendly extract script |
| TypeScript breaking changes in new imports | Low | Medium | Run `tsc --noEmit` after each step; fix incremental |
| Firestore rules mismatch between branches | Low | High | Cross-reference COMMUNITY-002 rules with this spec's data model |
| 100 lesson images missing | Medium | Medium | Check `/lesson-diagrams/` paths against actual asset files |
| Frontmatter parsing fails for some lessons | Medium | Medium | Batch-test all 100 lessons during Step 2 |
| Firebase emulator doesn't match production | Low | Medium | Keep emulator sync with prod rules; test with real Firebase project early |

### 9.4 Rollback Strategy

If a critical issue arises during integration:
1. This branch (`symphony/AVM-JT-003`) was created from main `c0091b5` — it can be safely abandoned and recreated.
2. All content lives in stash, which is independent of the working tree.
3. Community branches are already merged into main — they will not be affected.
4. No existing source code is modified by this task — only new files are added.

**The safest path forward:** If restoration from stash causes issues, recreate the branch from main and restore content incrementally (one module at a time) rather than restoring all 100 files at once.

### 9.5 Timeline Summary

| Phase | Duration | Key Milestone |
|-------|----------|---------------|
| Phase 1: Foundation | Weeks 1-3 | All 100 lessons viewable via /lessons/[slug] |
| Phase 2: Community MVP | Weeks 4-7 | Users can create posts, comment, like |
| Phase 3: Polish | Weeks 8-10 | Search, notifications, admin dashboard live |
| **Total** | **~10 weeks** | **V1 complete** |

---

*Document end. This is a living artifact — update as requirements evolve.*
