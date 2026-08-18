# 02. 정보 구조(IA) — AI Vibe Coding Master 커뮤니티 플랫폼

## 0. 문서 메타

| 항목 | 값 |
|---|---|
| 문서 버전 | v1.0 |
| 기준 정본 | `CANON.md`(Opus 확정, 변경 금지) |
| 기준 코드 실측 시점 | 2026-08-07, `git rev-parse HEAD` = `272b2b175efefd4658c125788fa2cde3712a67fd` (브랜치 `master`) |
| 검증 대상 파일 | `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `src/content/site-navigation.ts`, `src/app/layout.tsx`, `src/app/**/page.tsx`(전수), `src/content/schema.ts`, `src/content/atlas.ts`, `src/content/glossary.ts` |

---

## 1. 문서 목적과 SSOT 관계

이 문서는 커뮤니티 플랫폼의 **정보 구조(IA)** — 전역 내비게이션, 페이지 트리, 라우트별 역할·렌더링 방식, 로그인 상태별 메뉴 노출, 콘텐츠 간 연결 구조 — 를 정의한다.

이 문서가 다루지 **않는** 것과 그 SSOT:

| 영역 | SSOT 문서 |
|---|---|
| Firestore 컬렉션 스키마, 필드, 인덱스 | [`./05-DATA-MODEL-SSOT.md`](./05-DATA-MODEL-SSOT.md) |
| 역할별 화면 진입 조건의 상세 플로우, 화면 전환 다이어그램 | [`./03-USER-FLOWS-AND-PERMISSIONS.md`](./03-USER-FLOWS-AND-PERMISSIONS.md) |

역할명·enum·Firestore 경로·라우트·Cloud Functions 이름은 전부 `CANON.md`를 그대로 인용한다. 이 문서와 `CANON.md`가 충돌하면 `CANON.md`가 우선한다. 이 문서와 위 두 SSOT 문서가 충돌하면 각 영역의 SSOT 문서가 우선한다.

---

## 2. 현재 내비게이션 실측

`src/content/site-navigation.ts` + `src/components/layout/SiteHeader.tsx` + `src/components/layout/SiteFooter.tsx` 전문 확인 결과.

### 2-1. 현재: 데스크톱 상단 메뉴 (`PRIMARY_NAV`, `xl` 브레이크포인트 이상에서 노출)

| 순서 | 라벨 | 링크 |
|---|---|---|
| 1 | 시작하기 | `/start` |
| 2 | 배우기 | `/learn` |
| 3 | 도구 | `/tools` |
| 4 | 기술 | `/technologies` |
| 5 | 실습 | `/lab` |
| 6 | Atlas | `/atlas` |
| 7 | 함께 고치기 | `/verification` |

헤더 우측 고정 요소(메뉴 배열과 무관, 항상 노출): `SiteSearch`(검색), `ThemeToggle`(라이트/다크 전환), 모바일 전용 햄버거 버튼.

### 2-2. 현재: 모바일 1단 메뉴 (`MOBILE_PRIMARY_NAV`, 햄버거를 열면 드롭다운 최상단에 노출)

| 순서 | 라벨 | 링크 |
|---|---|---|
| 1 | 시작하기 | `/start` |
| 2 | 배우기 | `/learn` |
| 3 | 실습 | `/lab` |

### 2-3. 현재: 모바일 "더보기" 2단 메뉴 (`MOBILE_MORE_NAV`, 드롭다운 내 "더보기" 토글 클릭 시 노출)

| 순서 | 라벨 | 링크 |
|---|---|---|
| 1 | 도구 | `/tools` |
| 2 | 기술 | `/technologies` |
| 3 | Atlas | `/atlas` |
| 4 | 함께 고치기 | `/verification` |

**현재: 지속형 하단 탭바(bottom tab bar)는 코드에 존재하지 않는다.** 모바일 메뉴는 헤더의 슬라이드다운 드롭다운 1종뿐이다(2-2 + 2-3 조합).

### 2-4. 현재: 푸터 바로가기 (`FOOTER_NAV`)

| 순서 | 라벨 | 링크 |
|---|---|---|
| 1 | 시작하기 | `/start` |
| 2 | 배우기 | `/learn` |
| 3 | 실습 | `/lab` |
| 4 | 전체 학습 지도 | `/curriculum` |
| 5 | 용어 | `/glossary` |
| 6 | 공식 문서 | `/resources` |
| 7 | 소개 | `/about` |
| 8 | 출처와 검증 | `/verification` |
| 9 | Atlas | `/atlas` |
| 10 | 개인정보 처리 안내 | `/privacy` |
| 11 | 이용 안내 | `/terms` |
| 12 | 라이선스·고지 | `/license` |

푸터에는 위 목록 외에 소개 문단과 Instagram(`@ju0o___`) 외부 링크가 고정 배치되어 있다(내비게이션 항목 아님, 변경 대상 아님).

---

## 3. 목표 전역 내비게이션 — 3계층 재구성

### 3-1. 계층 정의

| 계층 | 명칭 | 성격 | 포함 항목 |
|---|---|---|---|
| Tier 1 | 공식 지식층 | 정적 SSG, 저자가 검증한 교재/Atlas 콘텐츠 | 기존 `PRIMARY_NAV` 7개 그대로 |
| Tier 2 | 커뮤니티 참여층 | 정적 셸+CSR, 회원이 만드는 UGC | 신규 `커뮤니티`, `교육자료` |
| Tier 3 | 내 활동 | 로그인 상태 의존 아이콘 클러스터 | 검색(기존 유지) · 알림 · 내 활동/로그인 |

### 3-2. 데스크톱 GNB 좌→우 배치 순서

| 위치 | 요소 | 유형 | 표시 조건 |
|---|---|---|---|
| 1 | 로고 (`AI Vibe Coding Master`, `/`) | 기존 유지 | 전체 |
| 2 | Tier 1: 시작하기 | 기존 유지, 위치 이동 없음 | 전체 |
| 3 | Tier 1: 배우기 | 기존 유지 | 전체 |
| 4 | Tier 1: 도구 | 기존 유지 | 전체 |
| 5 | Tier 1: 기술 | 기존 유지 | 전체 |
| 6 | Tier 1: 실습 | 기존 유지 | 전체 |
| 7 | Tier 1: Atlas | 기존 유지 | 전체 |
| 8 | Tier 1: 함께 고치기 | 기존 유지 | 전체 |
| 9 | 구분선(시각적 구분자, `border-l`) | 신규 | 전체 |
| 10 | Tier 2: 커뮤니티 (`/community`) | 신규 | 전체 |
| 11 | Tier 2: 교육자료 (`/materials`) | 신규 | 전체 |
| — | spacer(`ml-auto`) | 기존 유지 | — |
| 12 | 검색 (`SiteSearch`) | 기존 유지, 위치 이동 없음 | 전체 |
| 13 | Tier 3: 알림벨 | 신규 | `pending_member` 이상 로그인 시에만 |
| 14 | Tier 3: 내 활동 아이콘(아바타 드롭다운) | 신규 | 로그인 시. 드롭다운 안에 `내 대시보드`, `관리자`(moderator+), `로그아웃` 포함 |
| 14' | Tier 3: 로그인 버튼(텍스트 버튼) | 신규 | `guest`일 때 14 대신 표시 |
| 15 | 테마 토글 (`ThemeToggle`) | 기존 유지 | 전체 |
| 16 | 모바일 햄버거 버튼 | 기존 유지, `xl` 미만에서만 | 전체 |

Tier 1(7개) + Tier 2(2개) = 데스크톱 텍스트 메뉴 9개. 기존 대비 2개 증가(OPEN-01 참고).

### 3-3. 기존 메뉴 항목의 신규 구조 내 배치

| 기존 항목 | 배치 위치(목표) | 변경 여부 |
|---|---|---|
| 시작하기, 배우기, 도구, 기술, 실습, Atlas, 함께 고치기 | Tier 1, 순서·라벨·링크 동일 | 변경 없음 |
| 검색(`SiteSearch`) | Tier 3 좌측 고정 위치, 순서 유지 | 변경 없음 |
| 테마 토글 | 최우측 고정, 순서 유지 | 변경 없음 |
| `FOOTER_NAV` 12개 항목 | 푸터 유지, 변경 없음. `커뮤니티`, `교육자료` 링크만 신규 추가 | 항목 추가만 |

---

## 4. 전체 페이지 트리

컬럼 정의: **경로** / **목적** / **최소 필요 역할**(`guest`\|`pending_member`\|`member`\|`trusted_member`\|`moderator`\|`admin`) / **렌더링 방식**(`정적 SSG` = 빌드타임 완성된 HTML, `정적 셸+CSR` = 빈 정적 HTML 셸에 클라이언트에서 Firestore 데이터를 채움) / **판정**(`유지`\|`신규`) / **주요 컴포넌트**.

### 4-1. 기존 라우트 (실측)

`src/app/**/page.tsx` 전수 검사 결과 **52개** page.tsx가 확인된다. `CANON.md` 본문은 "현재 라우트 51개"로 서술하지만 CANON 자체 표(A절 라우트 목록)를 항목 단위로 다시 세면 52개이며, 이는 파일시스템 실측과 일치한다(CANON 서술 텍스트의 개수 오기로 판단, 라우트 목록·이름 자체는 CANON과 완전히 동일하므로 재정의하지 않는다). 아래 52개 전부 **유지 / 경로 변경 없음**이 확정 판정이다.

#### A. 홈 · 소개 · 정책 (5)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/` | 홈, 학습 대시보드 진입점 | guest | 정적 SSG | 유지 | `LearningDashboard`, `Badge`, `PrimaryLink` |
| `/about` | 프로젝트 소개 | guest | 정적 SSG | 유지 | `PrimaryLink` |
| `/privacy` | 개인정보 처리방침 | guest | 정적 SSG | 유지 | 인라인 구현(별도 컴포넌트 없음) |
| `/terms` | 이용 안내 | guest | 정적 SSG | 유지 | 인라인 구현(별도 컴포넌트 없음) |
| `/license` | 라이선스·고지 | guest | 정적 SSG | 유지 | 인라인 구현(별도 컴포넌트 없음) |

#### B. 학습 허브 (3)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/start` | 학습 시작 가이드 | guest | 정적 SSG | 유지 | `Badge`, `PrimaryLink` |
| `/learn` | 커리큘럼 개요 | guest | 정적 SSG | 유지 | `Badge`, `PrimaryLink` |
| `/learn/ai-engineering-v2/[nodeId]` | AI 엔지니어링 v2 노드 상세 | guest | 정적 SSG | 유지 | `LessonMarkdown` |

#### C. Vibe Coding Foundation 실습 (25) — `/learn/vibe-coding-foundation/{slug}`

| slug | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `day-1` | Day 1 첫 성공 경험 실습 | guest | 정적 SSG | 유지 | `Day1FirstSuccessExperience`, `Day1QuizAndOutcomes` |
| `project-file-structure` | 프로젝트 폴더 구조 실습 | guest | 정적 SSG | 유지 | `ProjectFileStructureExperience`, `ProjectFileStructureQuiz` |
| `errors-to-ai` | AI에게 에러 전달하기 실습 | guest | 정적 SSG | 유지 | `ErrorsToAiExperience` |
| `ai-llm-ide` | AI·LLM·IDE 관계 실습 | guest | 정적 SSG | 유지 | `AiLlmIdeExperience` |
| `node-npm-package-json` | Node·npm·package.json 실습 | guest | 정적 SSG | 유지 | `NodeNpmExperience`, `NodeNpmQuiz` |
| `terminal-commands` | 터미널 명령 실습 | guest | 정적 SSG | 유지 | `TerminalCommandsExperience` |
| `frontend` | 프론트엔드 역할 실습 | guest | 정적 SSG | 유지 | `StackRolesExperience` |
| `backend` | 백엔드 역할 실습 | guest | 정적 SSG | 유지 | `StackRolesExperience` |
| `context-engineering` | 컨텍스트 엔지니어링 실습 | guest | 정적 SSG | 유지 | `ContextPickerExperience` |
| `good-ai-task-request` | 좋은 AI 작업 요청 실습 | guest | 정적 SSG | 유지 | `AiRequestBuilderExperience` |
| `prompt-engineering` | 프롬프트 엔지니어링 실습 | guest | 정적 SSG | 유지 | `PromptLabExperience` |
| `database` | 데이터베이스 개념 실습 | guest | 정적 SSG | 유지 | `DataStoreExperience` |
| `fix-loop` | 수정 반복 루프 실습 | guest | 정적 SSG | 유지 | `FixLoopExperience` |
| `qa-basics` | QA 기초 체크리스트 실습 | guest | 정적 SSG | 유지 | `QaChecklistExperience` |
| `task-breakdown` | 작업 분해 실습 | guest | 정적 SSG | 유지 | `TaskBreakdownExperience` |
| `ai-agent` | AI 에이전트 개념 실습 | guest | 정적 SSG | 유지 | `AgentWorkflowExperience` |
| `subagent` | 서브에이전트 개념 실습 | guest | 정적 SSG | 유지 | `AgentWorkflowExperience` |
| `api` | 요청·응답(API) 실습 | guest | 정적 SSG | 유지 | `RequestResponseExperience` |
| `css-basics` | CSS 기초 실습 | guest | 정적 SSG | 유지 | `NodeCheckpoint`, `WebLayersExperience` |
| `files-connect` | 파일 연결 실습 | guest | 정적 SSG | 유지 | `FileConnectExperience` |
| `html-basics` | HTML 기초 실습 | guest | 정적 SSG | 유지 | `NodeCheckpoint`, `WebLayersExperience` |
| `workflow` | 작업 흐름 실습 | guest | 정적 SSG | 유지 | `AgentWorkflowExperience` |
| `javascript-basics` | JavaScript 기초 실습 | guest | 정적 SSG | 유지 | `NodeCheckpoint`, `WebLayersExperience` |
| `related-files-context` | 관련 파일 컨텍스트 실습 | guest | 정적 SSG | 유지 | `ContextPickerExperience` |
| `web-how-pages-appear` | 웹 페이지 렌더링 원리 실습 | guest | 정적 SSG | 유지 | `NodeCheckpoint`, `WebLayersExperience` |

#### D. 강의 · 커리큘럼 · 용어 · 자료 (4)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/lessons/[slug]` | 개별 강의 본문 | guest | 정적 SSG | 유지 | `LessonMarkdown`, `LessonSidebar`, `LessonNavigationCards`, `ReadingProgressBar`, `BackToTopButton`, `LessonCompleteButton`, `LessonVisitTracker`, `Badge` |
| `/curriculum` | 전체 커리큘럼 지도 | guest | 정적 SSG | 유지 | `CurriculumExplorer`, `Badge` |
| `/glossary` | 용어 사전(전체 목록, 클라이언트 필터) | guest | 정적 SSG | 유지 | `GlossaryBrowser`, `Badge` |
| `/resources` | 공식 문서 링크 모음 | guest | 정적 SSG | 유지 | `Badge` |

#### E. 도구 · 기술 · 실습 · 검증 (4)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/tools` | AI 도구 소개 | guest | 정적 SSG | 유지 | `Badge`, `PrimaryLink` |
| `/technologies` | 기술 스택 소개 | guest | 정적 SSG | 유지 | `Badge`, `PrimaryLink` |
| `/lab` | 실습 허브 | guest | 정적 SSG | 유지 | `Badge`, `PrimaryLink` |
| `/verification` | 출처 검증·정정 제안 안내 | guest | 정적 SSG | 유지 | `Badge` |

#### F. Atlas (8)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/atlas` | Atlas 여정 지도 | guest | 정적 SSG | 유지 | `JourneyMap` |
| `/atlas/[nodeId]` | Atlas 노드 상세 | guest | 정적 SSG | 유지 | 인라인 구현(`content/atlas`, `lib/atlas` 직접 사용) |
| `/atlas/concepts/[conceptId]` | Atlas 개념 챕터 | guest | 정적 SSG | 유지 | `ChapterShell` |
| `/atlas/graph` | Atlas 관계 그래프 | guest | 정적 SSG | 유지 | 인라인 구현(`content/atlas`, `content/model-routing/graph`) |
| `/atlas/timeline` | Atlas 타임라인 | guest | 정적 SSG | 유지 | 인라인 구현(`content/atlas/timeline`) |
| `/atlas/studio` | Atlas 저작 도구 목록 | guest(현재 인증 미적용 유지, 4-4 참고) | 정적 SSG | 유지 | `StudioConceptList` |
| `/atlas/studio/concepts/[id]` | Atlas 저작 개념 편집 미리보기 | guest(현재 인증 미적용 유지) | 정적 SSG | 유지 | `StudioPreviewTabs` |
| `/atlas/studio/inventory` | Atlas 콘텐츠 인벤토리 | guest(현재 인증 미적용 유지) | 정적 SSG | 유지 | 인라인 구현(`lib/atlas/content-manifest`) |

#### G. Model Routing (3)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/model-routing` | 모델 라우팅 개념 소개 | guest | 정적 SSG | 유지 | `EducationalLabelNotice`, `RoutingDiagram` |
| `/model-routing/[unitId]` | 모델 라우팅 유닛별 퀴즈 | guest | 정적 SSG | 유지 | `EducationalLabelNotice`, `QuizPanel` |
| `/model-routing/simulator` | 라우팅 시뮬레이터 실습 | guest | 정적 SSG | 유지 | `TaskRouterSimulator` |

### 4-4. 참고: `/atlas/studio*` 역할 게이팅 범위

`/atlas/studio`, `/atlas/studio/concepts/[id]`, `/atlas/studio/inventory`는 CANON A절에 "관리자 기능"으로 분류되어 있으나 현재 인증 시스템 자체가 없고(서버 쓰기 없음, 읽기·저작 보조 UI), 이번 커뮤니티 역할 체계(6개 role)의 도입 범위에 포함되지 않는다. 이 문서는 해당 3개 라우트에 role 게이트를 **신규로 추가하지 않는다**. 향후 게이팅이 필요하면 별도 결정 사항으로 다룬다(OPEN-02).

### 4-5. 신규 라우트

렌더링은 D-001에 따라 전부 **정적 셸+CSR**이다(Firestore/Auth 직접 접근, 서버 렌더링 없음). 상세 셸 3종(`/community/post`, `/materials/item`, `/members`)의 rewrite 매핑은 5절 참고.

#### 공개 (9, 그 중 1개는 별도 page.tsx 없음)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/community` | 커뮤니티 통합 최신글 목록. `?category=slug` 쿼리로 카테고리 필터 | guest(읽기), member+(글쓰기 진입) | 정적 셸+CSR | 신규 | `CommunityFeed`, `CategoryFilterBar`, `PostCard` |
| `/community/[category]` | **별도 page.tsx 없음.** CANON D-002 결정에 따라 `/community?category=slug` 쿼리로 구현하므로 이 경로는 라우트로 존재하지 않는다 | — | — | 신규(문서 표기용, 구현 없음) | `/community`의 `CommunityFeed`를 쿼리 파라미터로 재사용 |
| `/community/post` | 게시글 상세 (rewrite: `/community/posts/*`) | guest(읽기), member+(댓글·반응) | 정적 셸+CSR | 신규 | `PostDetail`, `CommentThread`, `CommentForm`, `ReactionButton` |
| `/community/write` | 게시글 작성 | member | 정적 셸+CSR | 신규 | `PostEditor` |
| `/community/edit` | 게시글 수정 (`?id=`, 작성자 본인만) | member | 정적 셸+CSR | 신규 | `PostEditor` |
| `/materials` | 교육자료 목록 (필터: status/category/tag) | guest | 정적 셸+CSR | 신규 | `MaterialsGrid`, `MaterialFilterBar`, `MaterialStatusBadge` |
| `/materials/item` | 자료 상세 (rewrite: `/materials/items/*`) | guest(읽기), member+(댓글·반응) | 정적 셸+CSR | 신규 | `MaterialDetail`, `CommentThread`, `CommentForm`, `ReactionButton` |
| `/materials/new` | 자료 등록 | member | 정적 셸+CSR | 신규 | `MaterialEditor` |
| `/materials/edit` | 자료 수정 (`?id=`, 작성자 본인만) | member | 정적 셸+CSR | 신규 | `MaterialEditor` |

#### 사용자 (13)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/login` | 로그인 | guest | 정적 셸+CSR | 신규 | `LoginForm` |
| `/signup` | 회원가입 (Firebase Auth 계정 생성) | guest | 정적 셸+CSR | 신규 | `SignupForm` |
| `/onboarding/profile` | 최초 프로필 작성 + 가입 신청 제출 | pending_member | 정적 셸+CSR | 신규 | `ProfileSetupForm`, `MembershipApplicationForm` |
| `/membership/pending` | 승인 대기 안내 / 신청 상태 조회·재제출 | pending_member | 정적 셸+CSR | 신규 | `MembershipStatusCard` |
| `/me` | 내 대시보드 요약 | member | 정적 셸+CSR | 신규 | `MeDashboardSummary` |
| `/me/posts` | 내가 쓴 게시글 목록 | member | 정적 셸+CSR | 신규 | `MyPostsList`, `PostCard` |
| `/me/comments` | 내가 쓴 댓글 목록 | member | 정적 셸+CSR | 신규 | `MyCommentsList` |
| `/me/bookmarks` | 내 북마크 목록 | member | 정적 셸+CSR | 신규 | `MyBookmarksList` |
| `/me/likes` | 내가 반응(좋아요)한 항목 목록 | member | 정적 셸+CSR | 신규 | `MyLikesList` |
| `/me/notifications` | 내 알림 목록 | member | 정적 셸+CSR | 신규 | `NotificationList` |
| `/me/activity` | 내 활동 타임라인 | member | 정적 셸+CSR | 신규 | `MyActivityTimeline` |
| `/me/settings` | 계정/프로필 설정 | member | 정적 셸+CSR | 신규 | `AccountSettingsForm` |
| `/members` | 회원 공개 프로필 (rewrite: `/members/*`) | guest | 정적 셸+CSR | 신규 | `MemberProfileView` |

#### 관리자 (8, role: moderator\|admin — 클라이언트 가드 + Rules + Functions 3중 검증)

| 경로 | 목적 | 최소 역할 | 렌더링 | 판정 | 주요 컴포넌트 |
|---|---|---|---|---|---|
| `/admin` | 관리자 대시보드 요약 | moderator | 정적 셸+CSR | 신규 | `AdminDashboardSummary` |
| `/admin/members` | 회원 승인·역할 변경·제재 (역할 변경·승인은 admin 전용, 6-6 참고) | admin | 정적 셸+CSR | 신규 | `MemberApprovalTable`, `RoleAssignmentPanel` |
| `/admin/posts` | 게시글 숨김/복구 관리 | moderator | 정적 셸+CSR | 신규 | `PostModerationTable` |
| `/admin/materials` | 자료 검수 (`pending_review`→`needs_revision`까지는 moderator, `official` 승격은 admin) | moderator | 정적 셸+CSR | 신규 | `MaterialReviewTable` |
| `/admin/categories` | 카테고리 승인·관리 | admin | 정적 셸+CSR | 신규 | `CategoryApprovalTable` |
| `/admin/reports` | 신고 처리 | moderator | 정적 셸+CSR | 신규 | `ReportQueueTable` |
| `/admin/notices` | 공지 관리 | admin | 정적 셸+CSR | 신규 | `NoticeManager` |
| `/admin/logs` | 관리자 활동 로그 열람 | admin | 정적 셸+CSR | 신규 | `AdminLogViewer` |

---

## 5. 정적 export 제약과 셸 라우트 설계

근거: CANON D-002. `output: "export"`에서는 `generateStaticParams` 없이 `[id]` 동적 세그먼트를 빌드할 수 없다. 커뮤니티/자료/회원 문서는 런타임에 생성되므로 빌드타임에 모든 ID를 나열할 수 없다 → 파라미터 없는 정적 셸 라우트 + Firebase Hosting rewrite로 해결한다.

### 5-1. ID 해석 3가지 방식과 대상 라우트

| 방식 | 적용 라우트 | ID를 얻는 법 |
|---|---|---|
| Hosting rewrite + `location.pathname` 파싱 | `/community/post` ↔ `/community/posts/*`, `/materials/item` ↔ `/materials/items/*`, `/members` ↔ `/members/*` | 브라우저가 `/community/posts/abc123`으로 접속 → Hosting이 `/community/post.html`(빌드 산출물)을 서빙 → 클라이언트 JS가 `window.location.pathname`을 파싱해 마지막 세그먼트(`abc123`)를 문서 ID로 사용 |
| 쿼리 파라미터 | `/community/edit?id=`, `/materials/edit?id=` | `URLSearchParams`로 `id` 값을 직접 읽음. rewrite 불필요(경로에 동적 세그먼트가 없음) |
| 없음(로그인 사용자 컨텍스트) | `/me/*`, `/admin/*` | Firebase Auth 현재 사용자의 `uid`를 그대로 사용. URL에 ID가 없음 |

### 5-2. `firebase.json` `hosting.rewrites`에 추가할 블록 (CANON 원문, 이 순서로 추가)

```json
{ "source": "/community/posts/*",  "destination": "/community/post.html" },
{ "source": "/materials/items/*",  "destination": "/materials/item.html" },
{ "source": "/members/*",          "destination": "/members.html" }
```

### 5-3. 셸 라우트 파일 대응표

| 셸 라우트 파일 | 대응 rewrite 소스 | ID 없이 접근 시 동작 |
|---|---|---|
| `src/app/community/post/page.tsx` | `/community/posts/*` | `/community` 목록으로 리다이렉트 |
| `src/app/materials/item/page.tsx` | `/materials/items/*` | `/materials` 목록으로 리다이렉트 |
| `src/app/members/page.tsx` | `/members/*` | CANON에 명시 없음 → OPEN-03 |

---

## 6. 로그인 상태별 메뉴 노출 매트릭스

값 정의: **표시**(클릭 가능) / **비활성**(보이지만 클릭 시 안내만, 실제 이동 없음) / **숨김**(DOM에 렌더링하지 않음).

| 메뉴 항목 | guest | pending_member | member | trusted_member | moderator | admin |
|---|---|---|---|---|---|---|
| Tier 1 공식 지식층 7종(시작하기~함께 고치기) | 표시 | 표시 | 표시 | 표시 | 표시 | 표시 |
| Tier 2 커뮤니티(`/community`) | 표시(읽기) | 표시(읽기) | 표시 | 표시 | 표시 | 표시 |
| Tier 2 교육자료(`/materials`) | 표시(읽기) | 표시(읽기) | 표시 | 표시 | 표시 | 표시 |
| 검색 | 표시 | 표시 | 표시 | 표시 | 표시 | 표시 |
| 테마 토글 | 표시 | 표시 | 표시 | 표시 | 표시 | 표시 |
| 글쓰기 버튼(`/community/write` 진입, 커뮤니티 목록 내) | 숨김 | 비활성("승인 후 작성 가능" 안내) | 표시 | 표시 | 표시 | 표시 |
| 자료 등록 버튼(`/materials/new` 진입) | 숨김 | 비활성 | 표시 | 표시(즉시 `community` 게시) | 표시 | 표시 |
| 알림벨(Tier 3) | 숨김 | 표시(신청 상태 알림만 수신) | 표시 | 표시 | 표시 | 표시 |
| 로그인 버튼 | 표시 | 숨김 | 숨김 | 숨김 | 숨김 | 숨김 |
| 내 활동 아바타 드롭다운(Tier 3) | 숨김 | 표시(항목: 승인 대기 상태, 로그아웃) | 표시(항목: 내 대시보드, 로그아웃) | 표시 | 표시(+관리자 링크) | 표시(+관리자 링크) |
| 헤더 드롭다운 내 "관리자" 링크(`/admin`) | 숨김 | 숨김 | 숨김 | 숨김 | 표시 | 표시 |

---

## 7. 모바일 내비게이션

### 7-1. 하단 탭바 (신규, 지속 노출 5슬롯)

**현재: 존재하지 않음.** 신규 컴포넌트로 추가한다.

| 슬롯 | 라벨 | 아이콘(`@phosphor-icons/react`) | 링크 | 역할 조건 |
|---|---|---|---|---|
| 1 | 홈 | `House` | `/` | 전체 |
| 2 | 배우기 | `BookOpen` | `/learn` | 전체 |
| 3 | 커뮤니티 | `ChatCircleDots` | `/community` | 전체(읽기는 guest 포함, 쓰기 버튼은 6절 매트릭스 따름) |
| 4 | 알림 | `Bell` | 로그인 시 `/me/notifications`, guest는 `/login` | guest는 뱃지 없이 탭 시 로그인 유도, pending_member 이상은 미읽음 개수 뱃지 표시 |
| 5 | 내 정보 | `UserCircle` | 로그인 시 `/me`, guest는 `/login` | 전체 |

배치 컴포넌트: `MobileTabBar.tsx`, 경로 `src/components/layout/MobileTabBar.tsx`. `xl` 미만에서만 렌더링, `position: fixed; bottom: 0`. `SiteFooter`와의 겹침 처리는 OPEN-04.

### 7-2. 햄버거 메뉴 구성 (기존 슬라이드다운 대체/확장)

하단 탭바에 들어가지 않는 나머지 전부를 여기에 담는다.

| 그룹 | 항목 |
|---|---|
| Tier 1 잔여 | 시작하기, 도구, 기술, 실습, Atlas, 함께 고치기 |
| Tier 2 잔여 | 교육자료 |
| 학습 보조 | 전체 학습 지도(`/curriculum`), 용어(`/glossary`), 공식 문서(`/resources`) |
| 정책·소개 | 소개(`/about`), 개인정보 처리 안내(`/privacy`), 이용 안내(`/terms`), 라이선스·고지(`/license`) |
| 계정 | 로그인/회원가입(guest) 또는 로그아웃·설정(`/me/settings`)(로그인 시) |
| 관리자 | `/admin` 링크(moderator+만 표시) |

---

## 8. 신규 라우트별 컴포넌트 배치

### 8-1. 공유(cross-cutting) 컴포넌트

| 컴포넌트 | 경로 | 용도 |
|---|---|---|
| `LoadingState` | `src/components/state/LoadingState.tsx` | CSR 로딩 공통 표시 |
| `EmptyState` | `src/components/state/EmptyState.tsx` | 데이터 0건 공통 표시 |
| `ErrorState` | `src/components/state/ErrorState.tsx` | 요청 실패 공통 표시 |
| `AuthGuard` | `src/features/auth/AuthGuard.tsx` | 최소 역할 미만 접근 시 리다이렉트(`/login` 또는 `/membership/pending`) |
| `RoleGate` | `src/features/auth/RoleGate.tsx` | 컴포넌트 단위 role 조건부 렌더링(글쓰기 버튼 등) |
| `NotificationBell` | `src/features/notifications/NotificationBell.tsx` | 헤더/탭바 알림 아이콘 + 미읽음 카운트 |
| `MobileTabBar` | `src/components/layout/MobileTabBar.tsx` | 7-1의 하단 탭바 |

### 8-2. 라우트별 신규 컴포넌트

| 라우트 | 컴포넌트 | 경로 |
|---|---|---|
| `/community` | `CommunityFeed` | `src/features/community/CommunityFeed.tsx` |
| `/community` | `CategoryFilterBar` | `src/features/community/CategoryFilterBar.tsx` |
| `/community`, `/community/post`, `/me/posts` 등 공용 | `PostCard` | `src/features/community/PostCard.tsx` |
| `/community/post` | `PostDetail` | `src/features/community/PostDetail.tsx` |
| `/community/post`, `/materials/item` 공용 | `CommentThread` | `src/features/community/CommentThread.tsx` |
| `/community/post`, `/materials/item` 공용 | `CommentForm` | `src/features/community/CommentForm.tsx` |
| `/community/post`, `/materials/item` 공용 | `ReactionButton` | `src/features/community/ReactionButton.tsx` |
| `/community/write`, `/community/edit` | `PostEditor` | `src/features/community/PostEditor.tsx` |
| `/materials` | `MaterialsGrid` | `src/features/materials/MaterialsGrid.tsx` |
| `/materials` | `MaterialFilterBar` | `src/features/materials/MaterialFilterBar.tsx` |
| `/materials`, `/materials/item` 공용 | `MaterialStatusBadge` | `src/features/materials/MaterialStatusBadge.tsx` |
| `/materials/item` | `MaterialDetail` | `src/features/materials/MaterialDetail.tsx` |
| `/materials/new`, `/materials/edit` | `MaterialEditor` | `src/features/materials/MaterialEditor.tsx` |
| `/login` | `LoginForm` | `src/features/auth/LoginForm.tsx` |
| `/signup` | `SignupForm` | `src/features/auth/SignupForm.tsx` |
| `/onboarding/profile` | `ProfileSetupForm` | `src/features/onboarding/ProfileSetupForm.tsx` |
| `/onboarding/profile` | `MembershipApplicationForm` | `src/features/onboarding/MembershipApplicationForm.tsx` |
| `/membership/pending` | `MembershipStatusCard` | `src/features/onboarding/MembershipStatusCard.tsx` |
| `/me` | `MeDashboardSummary` | `src/features/me/MeDashboardSummary.tsx` |
| `/me/posts` | `MyPostsList` | `src/features/me/MyPostsList.tsx` |
| `/me/comments` | `MyCommentsList` | `src/features/me/MyCommentsList.tsx` |
| `/me/bookmarks` | `MyBookmarksList` | `src/features/me/MyBookmarksList.tsx` |
| `/me/likes` | `MyLikesList` | `src/features/me/MyLikesList.tsx` |
| `/me/notifications` | `NotificationList` | `src/features/notifications/NotificationList.tsx` |
| `/me/activity` | `MyActivityTimeline` | `src/features/me/MyActivityTimeline.tsx` |
| `/me/settings` | `AccountSettingsForm` | `src/features/me/AccountSettingsForm.tsx` |
| `/members` | `MemberProfileView` | `src/features/members/MemberProfileView.tsx` |
| `/admin` | `AdminDashboardSummary` | `src/features/community-admin/AdminDashboardSummary.tsx` |
| `/admin/members` | `MemberApprovalTable` | `src/features/community-admin/MemberApprovalTable.tsx` |
| `/admin/members` | `RoleAssignmentPanel` | `src/features/community-admin/RoleAssignmentPanel.tsx` |
| `/admin/posts` | `PostModerationTable` | `src/features/community-admin/PostModerationTable.tsx` |
| `/admin/materials` | `MaterialReviewTable` | `src/features/community-admin/MaterialReviewTable.tsx` |
| `/admin/categories` | `CategoryApprovalTable` | `src/features/community-admin/CategoryApprovalTable.tsx` |
| `/admin/reports` | `ReportQueueTable` | `src/features/community-admin/ReportQueueTable.tsx` |
| `/admin/notices` | `NoticeManager` | `src/features/community-admin/NoticeManager.tsx` |
| `/admin/logs` | `AdminLogViewer` | `src/features/community-admin/AdminLogViewer.tsx` |

컴포넌트 파일명은 전부 PascalCase, 폴더명은 기존 관례(`src/features/atlas-studio/`, `src/features/learning-interactions/`)를 따라 kebab-case로 통일한다(`community-admin`).

---

## 9. 콘텐츠 간 연결 구조

### 9-1. `linkedRefs` 필드 설계

`posts/{postId}` 문서(및 `materials/{materialId}` 문서)에 다음 배열 필드를 추가한다.

```
linkedRefs: Array<{ type: "lesson" | "glossary" | "atlas", id: string }>
```

| type | id 값의 출처 | 비고 |
|---|---|---|
| `lesson` | `LessonMeta.slug` (`src/content/schema.ts`) | `/lessons/{slug}` 경로 세그먼트와 동일 문자열 |
| `glossary` | `GlossaryTerm.term` (`src/content/schema.ts`) | 용어 원문 그대로(예: `"React"`). 별도 slug 필드 없음 — 현재 코드에 확인된 사실 |
| `atlas` | `AtlasConcept.id` (`src/content/atlas.ts`) | `/atlas/{id}` 경로 세그먼트와 동일 문자열 |

`linkedRefs` 항목은 정확히 `{ type, id }` 두 필드만 가진 객체 리터럴로 저장한다(부가 필드 금지). 이는 9-3의 Firestore `array-contains` 조회가 객체 완전 일치를 요구하기 때문이다.

### 9-2. 게시글 작성 화면에서 연결 대상 선택

`PostEditor`(`src/features/community/PostEditor.tsx`) 내부에 "관련 학습 자료 연결" 섹션을 둔다.

- `lesson`/`glossary` 후보: 기존 빌드타임 검색 인덱스 `getSearchIndex()`(`src/lib/search-index.ts`)의 `SearchEntry[]`를 재사용해 타이핑 즉시 필터링한다. 단, **현재: `SearchEntryKind`는 `"lesson" | "glossary" | "resource"`뿐이며 `"atlas"`를 포함하지 않는다**(`src/content/schema.ts` 확인).
- `atlas` 후보: 검색 인덱스에 없으므로 `src/content/atlas.ts`의 `AtlasConcept[]`를 클라이언트에서 직접 import해 별도 선택 목록을 구성한다.
- 사용자가 후보를 선택하면 `{ type, id }` 객체를 `linkedRefs` 배열에 추가한 뒤 게시글과 함께 저장한다.

### 9-3. 강의 페이지 하단 "이 강의 관련 커뮤니티 글" 섹션

대상 파일: `src/app/lessons/[slug]/page.tsx`(기존 정적 SSG 페이지, 수정 대상이지만 이 문서에서는 코드 변경 없이 설계만 기술한다).

1. 신규 클라이언트 컴포넌트 `LessonRelatedCommunityPosts`를 `src/features/community/LessonRelatedCommunityPosts.tsx`에 만든다. `slug: string` prop을 받는다.
2. `src/app/lessons/[slug]/page.tsx`의 본문 하단(기존 `LessonNavigationCards` 다음)에 `<LessonRelatedCommunityPosts slug={lesson.slug} />`를 추가한다. 이 컴포넌트만 CSR이고 나머지 페이지는 기존과 동일하게 SSG로 유지된다.
3. `LessonRelatedCommunityPosts`는 마운트 시 Firestore `posts` 컬렉션에 다음 쿼리를 실행한다:
   ```
   query(
     collection(db, "posts"),
     where("linkedRefs", "array-contains", { type: "lesson", id: slug }),
     where("status", "==", "published"),
     orderBy("createdAt", "desc"),
     limit(5)
   )
   ```
4. 결과가 0건이면 `EmptyState`(문구: "아직 이 강의를 다룬 커뮤니티 글이 없습니다. 첫 글을 남겨보세요." + `/community/write?linkLesson={slug}` 링크 버튼), 로딩 중이면 `LoadingState`, 실패 시 `ErrorState`를 표시한다.
5. 결과가 있으면 `PostCard`를 재사용해 최대 5건을 나열하고, 더보기는 `/community?linkedLesson={slug}` 쿼리로 연결한다(9-4).

### 9-4. Atlas 노드 페이지에서의 동일 패턴

`src/app/atlas/[nodeId]/page.tsx` 하단에도 동일한 방식으로 `AtlasRelatedCommunityPosts`(`src/features/community/AtlasRelatedCommunityPosts.tsx`)를 추가한다. 쿼리 조건만 `{ type: "atlas", id: nodeId }`로 바뀐다.

### 9-5. 용어 사전에서의 처리

`/glossary`는 개별 라우트가 없는 단일 목록 페이지이므로(4-1 D절), 용어별 관련 게시글 섹션은 `GlossaryBrowser` 내부에서 사용자가 특정 용어를 펼쳤을 때(현재 아코디언/상세 패턴 사용 여부와 무관하게, 선택된 `term` 상태가 존재하는 시점)에만 동일한 `array-contains` 쿼리(`{ type: "glossary", id: term }`)를 실행하는 하위 컴포넌트로 넣는다. 컴포넌트명 `GlossaryRelatedCommunityPosts`, 경로 `src/features/community/GlossaryRelatedCommunityPosts.tsx`.

---

## 10. 빈 상태 / 로딩 / 에러 화면 규칙

CSR 페이지는 항상 3가지 상태를 명시적으로 처리한다. 공통 컴포넌트는 8-1의 `LoadingState`/`EmptyState`/`ErrorState`(경로 `src/components/state/`)이다.

### 10-1. 문구 기준

| 상태 | 톤 | 구조 | 예시(커뮤니티 목록 기준) |
|---|---|---|---|
| 로딩 | 중립 | 스피너/스켈레톤 + 짧은 문구 | "불러오는 중입니다…" |
| 빈 상태 | 안내형, 다음 행동 제시 | 아이콘 + 상황 설명 1문장 + 행동 버튼(있으면) | "아직 게시글이 없습니다. 첫 글을 남겨보세요." + `[글쓰기]` 버튼(member+에게만 노출) |
| 에러 | 사과 없이 원인+행동 | 상황 설명 1문장 + 재시도 버튼 | "데이터를 불러오지 못했습니다. 다시 시도해주세요." + `[다시 시도]` 버튼 |
| 에러(권한 없음) | 원인 명시 | 상황 설명 + 대안 링크 | "로그인 후 이용할 수 있습니다." + `[로그인]` 버튼 |

### 10-2. Props 계약

| 컴포넌트 | Props |
|---|---|
| `LoadingState` | `label?: string`(기본값 "불러오는 중입니다…") |
| `EmptyState` | `message: string`, `actionLabel?: string`, `actionHref?: string` |
| `ErrorState` | `message: string`(기본값 "데이터를 불러오지 못했습니다. 다시 시도해주세요."), `onRetry: () => void` |

모든 신규 CSR 컴포넌트(8-2 목록 전부)는 데이터 페칭 훅에서 `status: "loading" | "empty" | "error" | "ready"` 4분기를 반환하고, 위 3개 공통 컴포넌트로 `loading`/`empty`/`error`를 처리한 뒤 `ready`일 때만 실제 콘텐츠를 렌더링한다.

---

## 11. 미결정 사항

| ID | 내용 |
|---|---|
| OPEN-01 | 데스크톱 GNB 텍스트 메뉴가 9개(Tier1 7 + Tier2 2)로 늘어난다. `xl`(1280px) 브레이크포인트에서 실제 밀집도·줄바꿈 여부는 시각 QA로 확인 필요. 필요 시 Tier1 항목 일부를 드롭다운으로 묶는 안을 검토 |
| OPEN-02 | `/atlas/studio*` 3개 라우트를 향후 community role 체계로 게이팅할지 여부와 시점. 현재는 6개 role 도입 범위 밖(4-4 참고) |
| OPEN-03 | `/members`를 ID 없이(순수 `/members` 경로로) 접근했을 때의 동작이 CANON에 정의되어 있지 않음. 전체 회원 디렉터리 목록을 V1에 포함할지, 아니면 다른 페이지로 리다이렉트할지 결정 필요 |
| OPEN-04 | 신규 `MobileTabBar`(7-1)와 기존 `SiteFooter`가 같은 화면에서 겹치지 않도록 하는 처리 방식(본문 하단 padding 추가 vs 탭바를 스크롤 종속으로 전환) |
| OPEN-05 | `/community?linkedLesson={slug}` 형태의 "관련 글 더보기" 목록 필터가 `/community` 페이지의 카테고리 필터(`?category=`)와 쿼리 파라미터를 동시에 쓸 수 있는지, `CommunityFeed`가 두 필터를 어떻게 조합할지 |
| OPEN-06 | `pending_member`가 `/me`에 직접 접근했을 때 제한된 대시보드를 보여줄지, 항상 `/membership/pending`으로 강제 리다이렉트할지. 현재 이 문서는 `/me` 최소 역할을 `member`로만 명시했고 `pending_member`의 접근 결과는 명시하지 않았음 |
