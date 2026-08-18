# 09 — GOOSE 구현 패킷 모음 (GOOSE-00 ~ GOOSE-12)

이 문서는 `AI_VIBE_CODING_MASTER` 저장소에 커뮤니티 플랫폼(V1)을 구현하기 위해 **Goose에게 그대로 붙여넣는 실행 패킷 13개**를 담는다. 각 패킷은 Opus가 확정한 정본 어휘(이하 CANON, 이 문서 §2 "공통 규약"에 전문 포함)를 전제로 작성되었다.

---

## 1. 문서 사용법

1. **항상 §2 "공통 규약" 섹션 전체 + 원하는 패킷 1개를 함께 복사**해서 Goose에 붙여넣는다. 공통 규약만 따로 보내거나 패킷만 따로 보내지 않는다.
2. 패킷은 **GOOSE-00 → GOOSE-01 → … → GOOSE-12 순서로 하나씩** 실행한다. 동시에 두 패킷을 병행 실행하지 않는다.
3. 각 패킷 실행이 끝나면 Goose는 §5 "공통 보고서 템플릿" 형식으로 완료 보고를 반환한다. 사람은 이 보고서를 검토하고, 완료 조건이 전부 PASS인지 확인한다.
4. **인계 방법**: 다음 패킷을 시작할 때, 직전 패킷의 완료 보고서 중 "다음 패킷에 전달할 사항" 항목만 잘라내 다음 패킷 프롬프트(공통 규약+패킷 본문) **맨 앞에 붙여넣는다.** 예:
   ```
   [직전 패킷 인계 사항]
   - GOOSE-02 완료: /login, /signup 정상 동작. 로그인 후 리다이렉트는 임시로 "/"를 가리킴(GOOSE-09에서 /me로 교체 예정).

   [공통 규약]
   ...(§2 전문)...

   [패킷: GOOSE-03]
   ...(§4의 GOOSE-03 본문)...
   ```
5. 패킷 완료 보고의 Status가 `BLOCKED` 또는 `HUMAN_APPROVAL_REQUIRED`이면 **다음 패킷으로 진행하지 않는다.** §6 에스컬레이션 규칙에 따라 사람이 먼저 판단한다.
6. 각 패킷은 직전 패킷의 브랜치에서 분기한다(§2 참조). 병합은 사람이 수행한다 — Goose는 자동으로 병합하지 않는다.

---

## 2. 공통 규약 (모든 패킷에 공통 적용, 패킷 본문에서 "공통 규약 준수"로 참조)

### 2.1 저장소 및 브랜치

| 항목 | 값 |
|---|---|
| 저장소 경로 | `D:\ai_vibe_coding_master` |
| 시작 시점 브랜치 | `master`, HEAD `272b2b175efefd4658c125788fa2cde3712a67fd` |
| 브랜치 규칙 | 패킷마다 `feat/community-goose-<두 자리 번호>` (예: `feat/community-goose-00`, `feat/community-goose-01`, …, `feat/community-goose-12`) |
| 분기 규칙 | 각 패킷 브랜치는 **직전 패킷 브랜치**에서 분기한다(GOOSE-00만 `master`에서 분기). 순서를 건너뛰지 않는다. |
| 병합 | Goose는 병합하지 않는다. 병합·`master` 반영은 사람이 수행한다. |
| 커밋 메시지 규칙 | `<type>(community): GOOSE-<번호> <한 줄 설명>` — `type`은 `feat`/`fix`/`chore`/`test`/`docs` 중 내용에 맞는 것 사용 |
| 커밋 범위 | 각 패킷의 "수정 허용 경로"에 해당하는 파일만 `git add`한다. `git add .` 금지. |
| push | 어떤 패킷도 `git push`를 실행하지 않는다. |

### 2.2 절대 건드리지 않을 것 — 기존 미커밋 38건

시작 시점(HEAD `272b2b175efefd4658c125788fa2cde3712a67fd`) 기준 아래 38개 경로는 **어떤 패킷에서도 diff가 발생하면 안 된다.** 매 패킷 종료 전 `git status --short`로 재확인한다.

**tracked 수정 7건**
```
DESIGN.md
ai-ops/STATE.md
ai-ops/reports/CODEX-P0-WORKFLOW-HANDOFF.md
content/practice/vibe-coding-foundation/11-files-connect-practice.md
src/app/learn/page.tsx
src/features/learning-interactions/file-connect/FileConnectExperience.tsx
src/features/learning-interactions/web-layers/WebLayersExperience.tsx
```

**untracked 31건**
```
CONCEPTS.md
INTERFACE_SPEC.md
TEAM_GLOSSARY.md
ai-ops/V3-AGENT-MAP.md
ai-ops/V3-APPENDIX.md
ai-ops/V3-BRAND-FUNNEL.md
ai-ops/V3-CONTEXT-PACKAGE.md
ai-ops/V3-MASTER-TOC.md
ai-ops/V3-WORKFLOW.md
ai-ops/master-toc.md
ai-ops/reports/CODEX-AGENT-SKILL-AUDIT.md
ai-ops/reports/CODEX-RP0-NEXT-CONTEXT-PACKAGE.md
ai-ops/reports/CODEX-RP0-RECOVERY-AUDIT.md
ai-ops/reports/CODEX-RP0-WORKING-TREE-INVENTORY.md
ai-ops/reports/RP0_1_SCOPE_MEASUREMENT.md
ai-ops/reports/RP0_1_SCOPE_MEASUREMENT_DRAFT.md
ai-ops/reports/V2_BUILD_REPORT.md
ai-ops/roadmap/CODEX-MODEL-ROUTING-POLICY.md
ai-ops/roadmap/CODEX-MULTI-AGENT-OPERATING-PLAN.md
content/curriculum/**
content/practice/vibe-coding-foundation/12-frontend-practice.md
content/practice/vibe-coding-foundation/13-backend-practice.md
content/practice/vibe-coding-foundation/14-api-practice.md
content/practice/vibe-coding-foundation/15-database-practice.md
content/practice/vibe-coding-foundation/16-good-ai-task-request-practice.md
content/practice/vibe-coding-foundation/17-prompt-engineering-practice.md
content/practice/vibe-coding-foundation/18-context-engineering-practice.md
content/practice/vibe-coding-foundation/19-related-files-context-practice.md
src/app/learn/ai-engineering-v2/**
src/features/learning-interactions/checkpoints/**
src/features/learning-interactions/core/usePrefersReducedMotion.ts
docs/community-platform/09-GOOSE-IMPLEMENTATION-PACKETS.md (이 문서 자체 — 읽기만, 수정 금지)
```

또한 `AGENTS.md` §5/§11/§12에 정의된 **Atlas Phase 1 보호 경로**(`src/app/atlas/**`, `src/content/atlas/**`, `src/features/atlas/**`, `src/lib/atlas*.ts`, `src/components/layout/SiteHeader.tsx`, `src/content/lessons/**`, `src/content/glossary.ts` 등)는 GOOSE 패킷의 "수정 허용 경로"에 명시적으로 포함되지 않는 한 절대 건드리지 않는다.

### 2.3 필수 검증

| 명령 | 의미 |
|---|---|
| `npm run lint` | `biome check .` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | `vitest run` |
| `npm run build` | `next build` (정적 export, `output: "export"`) |
| `npm run verify` | 위 4개 순차 실행 |

**모든 패킷은 커밋 전 `npm run verify`가 PASS해야 한다.** 실패 시 원인을 고치거나, 3회 연속 같은 원인으로 실패하면 §6에 따라 중단한다.

### 2.4 코드 스타일

- Biome 2.5.2 포맷을 따른다(`npm run format`으로 자동 정렬 가능, 커밋 전 실행 권장).
- TypeScript strict 모드 유지(`tsconfig.json` 변경 금지, strict 옵션을 낮추지 않는다).
- 데이터 타입은 `readonly` 필드/`ReadonlyArray`를 우선 사용한다. 클래스보다 함수 + 순수 타입을 우선한다.
- `"use client"`는 실제 브라우저 API(Firebase SDK, DOM 이벤트, localStorage)를 쓰는 최소 단위 컴포넌트에만 붙인다.

### 2.5 기존 52개 라우트 회귀 금지

아래 52개 라우트는 어떤 패킷에서도 **삭제·경로 변경·빌드 실패**가 발생하면 안 된다.

```
/                                   /license
/about                              /model-routing
/atlas                              /model-routing/[unitId]
/atlas/[nodeId]                     /model-routing/simulator
/atlas/concepts/[conceptId]         /privacy
/atlas/graph                        /resources
/atlas/studio                       /start
/atlas/studio/concepts/[id]         /technologies
/atlas/studio/inventory             /terms
/atlas/timeline                     /tools
/curriculum                         /verification
/glossary                           /lessons/[slug]
/lab
/learn
/learn/ai-engineering-v2/[nodeId]
/learn/vibe-coding-foundation/{ai-agent, ai-llm-ide, api, backend, context-engineering,
  css-basics, database, day-1, errors-to-ai, files-connect, fix-loop, frontend,
  good-ai-task-request, html-basics, javascript-basics, node-npm-package-json,
  project-file-structure, prompt-engineering, qa-basics, related-files-context,
  subagent, task-breakdown, terminal-commands, web-how-pages-appear, workflow}
```

### 2.6 문서-코드 충돌 시 절차

이 문서(및 CANON)와 실제 코드/CLI 동작이 맞지 않으면 **구현을 멈추고 즉시 보고한다.** 임의로 CANON을 수정하거나 임의로 코드를 CANON에 맞춰 추측 구현하지 않는다.

### 2.7 역할 정본 (6개, 이름 변경 금지)

`guest` · `pending_member` · `member` · `trusted_member` · `moderator` · `admin`

| 역할 | 정의 |
|---|---|
| `guest` | 미인증 방문자. claim 없음. |
| `pending_member` | 인증 성공, 승인 대기. 읽기만. |
| `member` | 승인 완료. 일반 쓰기 활동 가능. |
| `trusted_member` | 관리자가 수동 승격. member 권한 + 자료 즉시 `community` 게시(검토 대기 생략) + 신고 가중치. |
| `moderator` | 신고 처리, 게시글 숨김/복구, 댓글 삭제. 회원 승인·역할 변경·공식 승격은 불가. |
| `admin` | 전권. 회원 승인·역할 변경·공식 승격·카테고리 승인·로그 열람. |

### 2.8 Firestore 경로 정본 (경로·컬렉션명 변경 금지)

```
users/{uid}                                 서버 전용 쓰기(역할·상태 미러)
profiles/{uid}                              소유자 편집 가능(표시 정보)
membershipApplications/{uid}                docId = uid (1인 1건)
posts/{postId}
materials/{materialId}
comments/{commentId}
reactions/{reactionId}                      id = {targetType}__{targetId}__{uid}
bookmarks/{bookmarkId}                      id = {uid}__{targetType}__{targetId}
categories/{categoryId}                     categoryId = slug
categoryRequests/{requestId}
reports/{reportId}
notifications/{uid}/items/{notificationId}  서버 전용 생성
adminLogs/{logId}                           서버 전용, 불변
moderationActions/{actionId}                서버 전용
```

Storage 경로 정본:
```
uploads/{uid}/{yyyyMM}/{fileId}.{ext}       회원 업로드 이미지
```

날짜 필드는 전부 Firestore `Timestamp`, 필드명은 `createdAt` / `updatedAt` / `deletedAt` / `readAt`로 통일한다. 작성자 필드명은 `authorUid`(게시글·자료·댓글), 대상 사용자 필드명은 `targetUid`.

### 2.9 enum 정본 (문자열 리터럴 그대로 사용)

```
UserRole              guest | pending_member | member | trusted_member | moderator | admin
UserStatus             active | suspended | withdrawn
ApplicationStatus      submitted | approved | rejected | resubmitted
PostStatus              published | hidden | deleted
MaterialStatus          draft | pending_review | community | official | needs_revision | archived
CommentStatus           published | hidden | deleted
TargetType              post | material
ReactionType            like
CategoryKind            community | material
CategoryStatus          active | archived
RequestStatus           submitted | approved | rejected
ReportReason            spam | abuse | illegal | copyright | wrong_info | other
ReportStatus            open | in_review | resolved | dismissed
ModerationActionType    hide_post | restore_post | delete_comment | suspend_user | restore_user | promote_material | demote_material | change_role
MediaProvider              firebase_storage
MediaAssetStatus          temporary | attached | pending_delete | deleted
```


### 2.10 Cloud Functions 정본 (gen2, Node 20, region `asia-northeast3`)

callable:
```
submitMembershipApplication   신청 제출(본인)
reviewMembershipApplication   승인/거절 (admin)
setUserRole                   역할 변경 + claim 갱신 (admin)
suspendUser / restoreUser     제재/복구 (admin)
setMaterialStatus             자료 상태 변경·공식 승격 (moderator: pending_review→community 또는 needs_revision까지, official 승격은 admin)
reviewCategoryRequest         카테고리 신청 승인/거절 (admin)
resolveReport                 신고 처리 (moderator+)
moderatePost                  게시글 숨김/복구 (moderator+)
deleteCommentByModerator      댓글 삭제 (moderator+)
```
Firestore 트리거:
```
onReactionWritten       대상 문서 likeCount 증감
onCommentWritten        대상 문서 commentCount 증감 + 알림 생성
onMembershipReviewed    알림 생성
onMaterialStatusChanged 알림 생성
onReportResolved        알림 생성
```

모든 callable은 진입 즉시 (1) `request.auth` 존재, (2) `request.auth.token.role` 검사, (3) `users/{uid}.status == "active"` 검사, (4) `adminLogs` 기록 순으로 처리한다. 위 callable/트리거 **이름 외의 함수를 새로 만들지 않는다.** 새 함수가 필요해 보이면 §6에 따라 중단하고 보고한다.

### 2.11 라우트 정본 (신규)

```
공개
  /community                      커뮤니티 통합 최신글
  /community/[category]           카테고리별 목록 — 정적 export 불가하므로 /community?category=slug 쿼리로 구현
  /community/post                 게시글 상세 셸 (rewrite: /community/posts/*)
  /community/write                게시글 작성 (member+)
  /community/edit                 게시글 수정 셸 (?id=)
  /materials                      교육자료 목록 (필터: status/category/tag)
  /materials/item                 자료 상세 셸 (rewrite: /materials/items/*)
  /materials/new                  자료 등록 (member+)
  /materials/edit                 자료 수정 셸 (?id=)
사용자
  /login                          로그인
  /signup                         회원가입
  /onboarding/profile             최초 프로필 작성
  /membership/pending             승인 대기 안내 / 신청 상태
  /me                             내 대시보드
  /me/posts  /me/comments  /me/bookmarks  /me/likes  /me/notifications  /me/activity  /me/settings
  /members                        회원 공개 프로필 셸 (rewrite: /members/*)
관리자 (role: moderator|admin, 클라이언트 가드 + Rules + Functions 3중 검증)
  /admin                          대시보드
  /admin/members                  회원 승인·역할·제재
  /admin/posts                    게시글 관리
  /admin/materials                자료 검수·공식 승격
  /admin/categories               카테고리 승인·관리
  /admin/reports                  신고 처리
  /admin/notices                  공지 관리 (§7 OPEN-03 참조 — V1 구현 보류)
  /admin/logs                     관리자 활동 로그
```
셸 라우트(`/community/post`, `/materials/item`)는 ID 없이 접근 시 목록으로 리다이렉트한다. 기존 52개 라우트는 전부 유지, 경로 변경 없음.

확정 rewrite 규칙 (`firebase.json` `hosting.rewrites`에 이 순서로 추가, 순서를 바꾸지 않는다):
```json
{ "source": "/community/posts/*",  "destination": "/community/post.html" },
{ "source": "/materials/items/*",  "destination": "/materials/item.html" },
{ "source": "/members/*",          "destination": "/members.html" }
```

### 2.12 카테고리 시드 정본

`categories` 컬렉션 초기 데이터, `kind="community"`:
```
free            자유 이야기
question        질문·도움 요청
troubleshooting 오류 해결
today-i-made    오늘 만든 것
project         프로젝트 모집
tool-review     AI 도구 후기
insight         정보·인사이트
gupt-meetup     구피티 모임
```
`kind="material"`: `prompt`, `workflow`, `tool-guide`, `template`, `case-study`, `reference`

### 2.13 소스 레이아웃 정본 (목표 — 이 문서에서 결정, CANON에 없던 내부 디렉터리 구조를 GOOSE 패킷 전체가 동일하게 따르도록 고정)

```
src/lib/firebase/**        Firebase 클라이언트 SDK 초기화, enum 타입, 인증 헬퍼
src/lib/community/**       커뮤니티 데이터 접근 함수(쿼리/뮤테이션), 클라이언트 훅
// V1에서 Cloud Functions 미사용 소스 (Node 20)
src/features/community/**  게시글/댓글/반응/북마크 UI 컴포넌트
src/features/materials/**  교육자료 UI 컴포넌트
src/features/membership/** 로그인/가입/승인 UI 컴포넌트
src/features/admin/**      관리자 UI 컴포넌트
scripts/community/**       커뮤니티 전용 운영 스크립트(시드, 라우트 검증 등)
firestore.rules, firestore.indexes.json, storage.rules   저장소 루트(Firebase 표준 경로, 변경 불가)
```

### 2.14 데이터 계약 필드 명명 규칙 (목표 — 이 문서에서 결정)

CANON은 컬렉션 경로·문서ID 패턴·일부 필드(`likeCount`, `commentCount`, `authorUid`, `targetUid`, `createdAt`/`updatedAt`/`deletedAt`/`readAt`)만 확정했다. 각 패킷은 위임된 컬렉션의 나머지 필드 스키마를 해당 패킷 본문의 "데이터 계약" 절에서 직접 정의한다(추측 최소화를 위해 필드명은 패킷 본문에 명시된 이름을 정확히 그대로 사용한다).

### 2.15 공통 완료 조건 (모든 패킷에 추가로 적용)

- [ ] `npm run verify`가 PASS한다
- [ ] `git status --short` 결과에 §2.2의 38개 경로 diff가 없다
- [ ] §2.5의 기존 52개 라우트가 `npm run build` 산출물(`out/`)에 그대로 존재한다
- [ ] 해당 패킷의 "수정 허용 경로" 밖 파일이 스테이징되지 않았다

---

## 3. 패킷 간 인터페이스 표

| 패킷 | 다음 패킷에 넘기는 산출물 | 주요 소비 패킷 |
|---|---|---|
| GOOSE-00 | `.env.example`, `firebase.json`(emulators 블록) | GOOSE-01 |
| GOOSE-01 | `src/lib/firebase/client.ts`, `src/lib/firebase/types.ts`(enum 15종), `firestore.rules`/`firestore.indexes.json`/`storage.rules` 스캐폴드, `functions/` 빈 스캐폴드 | GOOSE-02~09 |
| GOOSE-02 | `src/lib/firebase/auth.ts`, `src/lib/community/session.ts`(`SessionProvider`/`useSession`), `/login`, `/signup` | GOOSE-03, GOOSE-09 |
| GOOSE-03 | `users`/`profiles`/`membershipApplications` rules+콜러블(`submitMembershipApplication`/`reviewMembershipApplication`), `/onboarding/profile`, `/membership/pending`, role custom claim 부여 흐름 | GOOSE-04(역할 기반 쓰기 가드), GOOSE-08(관리자 승인 UI), GOOSE-09(알림 트리거) |
| GOOSE-04 | `posts` 컬렉션+Rules, `src/lib/community/posts.ts`, `src/lib/community/categories.ts`(하드코딩 8종), Firebase Storage 업로드(GOOSE-04A 연동), `/community`·`/community/post`·`/community/write`·`/community/edit`, rewrite 1번째 줄 | GOOSE-04A, GOOSE-05, GOOSE-07, GOOSE-08, GOOSE-09 |
| GOOSE-04A | Firebase Storage 설정, Storage Rules(업로드 인증/정책), mediaAssets Rules, 업로드 UI(클라이언트 전처리: 1600px/WebP/80/EXIF), 임시 이미지 처리, 무료 한도 운영 장치 | GOOSE-04, GOOSE-05, GOOSE-06, GOOSE-07 |
| GOOSE-05 | `comments`/`reactions`/`bookmarks` rules+트리거(`onReactionWritten`/`onCommentWritten`), 댓글·좋아요·북마크 UI 컴포넌트 | GOOSE-08(신고 버튼 부착), GOOSE-09(내 댓글/좋아요/북마크) |
| GOOSE-06 | `materials` 컬렉션+rules, `setMaterialStatus`, `/materials`·`/materials/item`·`/materials/new`·`/materials/edit`, rewrite 2번째 줄 | GOOSE-07, GOOSE-08, GOOSE-09, GOOSE-10 |
| GOOSE-07 | `categories`/`categoryRequests` rules+`reviewCategoryRequest`, 시드 스크립트, GOOSE-04/06 카테고리 소스를 Firestore 기반으로 교체 | GOOSE-08(관리자 승인 UI), GOOSE-09 |
| GOOSE-08 | `reports`/`moderationActions`/`adminLogs` rules+5개 콜러블, `/admin` 하위 라우트 대부분, 신고 버튼 부착 | GOOSE-09(알림 트리거 훅), GOOSE-11 |
| GOOSE-09 | `notifications` rules+3개 트리거, `/me/**`, `/members`, rewrite 3번째 줄, 로그인 리다이렉트를 `/me`로 교체 | GOOSE-10, GOOSE-11 |
| GOOSE-10 | 네비게이션 진입점(승인 시) 또는 OPEN-05 보류 상태 기록 | GOOSE-11 |
| GOOSE-11 | Firestore 규칙 테스트 스위트, RBAC 체크리스트 결과, 라우트 회귀 확인 결과 | GOOSE-12 |
| GOOSE-12 | 배포 완료 상태 | (없음, 최종) |

---

## 4. 패킷 상세

각 패킷을 복사할 때는 **반드시 §2 공통 규약을 함께 붙여넣는다.**

---

### GOOSE-00 — 기준선 보호

**목적**: 커뮤니티 기능 개발을 위한 격리된 브랜치를 만들고, 로컬 개발에 필요한 환경변수 예시와 Firebase 에뮬레이터 설정만 추가한다. 기능 코드는 만들지 않는다. 이후 모든 GOOSE 패킷의 안전한 시작점을 보장한다.

**선행 패킷**: 없음(최초 패킷). 시작 전 `git status`로 현재 브랜치가 `master`이고 HEAD가 `272b2b175efefd4658c125788fa2cde3712a67fd`인지 사람이 먼저 확인한다.

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.1(브랜치), §2.2(38건 보호 목록)

**수정 허용 경로**:
- `.env.example` (신규)
- `firebase.json` (`emulators` 블록만 추가)

**수정 금지 경로**:
- `src/**`, `content/**`, `ai-ops/**`, `functions/**`(아직 미생성, 생성 금지)
- `firestore.rules`, `firestore.indexes.json`, `storage.rules`(아직 미생성, 생성 금지)
- `package.json`
- `firebase.json`의 기존 `hosting` 블록(한 글자도 변경 금지)
- §2.2의 38개 경로 전부

**구현 범위**:
1. `master`(HEAD `272b2b175efefd4658c125788fa2cde3712a67fd`)에서 `feat/community-goose-00` 브랜치를 생성하고 체크아웃한다.
2. 저장소 루트에 `.env.example`을 신규 생성한다. 다음 10개 키를 값 없이(빈 문자열) 나열한다: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DISABLE_REACT_DEVTOOLS`, `NEXT_PUBLIC_SITE_PASSWORD_HASH`, `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`.
3. `firebase.json`에 최상위 `"emulators"` 키를 추가한다. 포트 정본: `auth:9099`, `firestore:8080`, `storage:9199`, `functions:5001`, `ui:4000`, `singleProjectMode: true`.
4. 위 변경을 커밋 1개로 담는다.

**제외 범위**: `firebase` 패키지 설치 금지, `src/lib/firebase` 생성 금지, `firestore.rules`/`firestore.indexes.json`/`storage.rules` 생성 금지, 어떤 UI/라우트도 만들지 않는다.

**데이터 계약**: 해당 없음 — 이 패킷은 데이터 계층을 만들지 않는다.

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] 브랜치 `feat/community-goose-00`이 존재하고 현재 체크아웃되어 있다
- [ ] `.env.example`이 루트에 존재하고 10개 키를 전부, 값 없이 포함한다
- [ ] `firebase.json`의 `hosting` 블록이 수정 전과 바이트 단위로 동일하다
- [ ] `firebase.json`에 `emulators` 키가 존재하고 5개 서비스 포트가 정본과 일치한다
- [ ] `git status --short`에서 §2.2의 38건 외 다른 변경이 없다(신규 2개 파일만 존재)
- [ ] `npm run verify`가 PASS한다

**실행할 검사**: `npm run verify`, `git status --short`, `git diff -- firebase.json`(hosting 블록 불변 육안 확인)

**수동 확인 항목**: `firebase emulators:start`로 5개 에뮬레이터가 지정 포트에서 기동되는지 확인(기능 없음, 기동만 확인)

**보고 형식**:
```
## Packet: GOOSE-00 완료 보고

- Status: COMPLETE | BLOCKED | HUMAN_APPROVAL_REQUIRED
- 브랜치: feat/community-goose-00 (마지막 커밋 해시: )
- 목적 달성 여부:
- 생성 파일 목록:
- 수정 파일 목록:
- 구현 범위 체크리스트 (항목별 PASS/FAIL):
- 완료 조건 체크리스트 (항목별 PASS/FAIL):
- 실행한 검사 결과 (PASS/FAIL + 실패 시 로그 요약):
- 수동 확인 결과:
- 데이터 계약 준수 확인: 해당 없음
- 기존 52개 라우트 회귀 확인 결과:
- 기존 미커밋 38건 오염 여부 (git diff 결과):
- 발견한 문서-코드 충돌:
- 중단 조건 트리거 여부:
- 다음 패킷(GOOSE-01)에 전달할 사항:
- 최종 커밋 해시:
```

**커밋 여부**: 예. 메시지: `chore(community): GOOSE-00 baseline branch + emulator scaffold`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부 + `firebase.json`에 `emulators` 키가 이미 존재하면 중단하고 사람에게 보고

---

### GOOSE-01 — Firebase 기반

**목적**: Firebase 클라이언트 SDK를 설치하고 초기화 모듈을 만들며, Firestore/Storage 보안 규칙과 인덱스 파일을 기본 거부(deny-by-default) 상태로 스캐폴드한다. Cloud Functions 소스 디렉터리도 빈 상태로 스캐폴드한다.

**선행 패킷**: GOOSE-00 완료 보고에서 브랜치 `feat/community-goose-00` 존재, `.env.example` 존재, `firebase.json` emulators 블록 존재를 확인한다.

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.8(Firestore 경로 정본), §2.9(enum 정본), §2.10(Cloud Functions 정본), §2.13(소스 레이아웃)

**수정 허용 경로**:
- `package.json`, `package-lock.json`
- `src/lib/firebase/**` (신규)
- `firestore.rules` (신규)
- `firestore.indexes.json` (신규)
- `storage.rules` (신규)
- `firebase.json` (`firestore`/`storage` 섹션 추가만, `hosting`/`emulators`는 유지)
- `functions/package.json`, `functions/tsconfig.json`, `functions/src/index.ts` (신규)

**수정 금지 경로**: `src/app/**`, `src/features/**`, `src/components/**`, `content/**`, `ai-ops/**`, §2.2의 38건

**구현 범위**:
1. `feat/community-goose-00`에서 `feat/community-goose-01` 브랜치를 분기한다.
2. `npm install firebase`로 `firebase` 패키지를 `dependencies`에 추가한다(설치된 정확한 버전을 `package.json`에 고정 기록).
3. `src/lib/firebase/client.ts`: `initializeApp`, `getAuth`, `getFirestore`, `getStorage` 4개를 lazy-init 패턴으로 export한다. 환경변수는 `.env.example`의 `NEXT_PUBLIC_FIREBASE_*` 7개 키를 사용한다. 정적 export 빌드이므로 브라우저 전용 초기화(SSR 시점 호출 방지)로 작성한다.
4. `src/lib/firebase/types.ts`: §2.9 enum 정본 15종을 TypeScript 리터럴 유니온 타입으로 정의한다(`UserRole`, `UserStatus`, `ApplicationStatus`, `PostStatus`, `MaterialStatus`, `CommentStatus`, `TargetType`, `ReactionType`, `CategoryKind`, `CategoryStatus`, `RequestStatus`, `ReportReason`, `ReportStatus`, `ModerationActionType`, `NotificationType`). 리터럴 값은 §2.9와 정확히 동일해야 한다.
5. `firestore.rules` 생성. 최상위 규칙은 `allow read, write: if false;`로 전체 거부. §2.8의 13개 컬렉션 이름을 각각 빈 `match /{collection}/{docId} { }` 블록으로 나열하고, 블록 안에 `// TODO: GOOSE-0n에서 구현`(해당 컬렉션을 실제로 채우는 패킷 번호, §3 인터페이스 표 참조) 주석을 남긴다.
6. `firestore.indexes.json` 생성. `{"indexes": [], "fieldOverrides": []}` 빈 스캐폴드.
7. `storage.rules` 생성. 최상위 전체 거부, `uploads/{uid}/{yyyyMM}/{fileId}` 경로에 `// TODO: GOOSE-04에서 구현` 주석만 남긴다.
8. `firebase.json`에 `"firestore": {"rules": "firestore.rules", "indexes": "firestore.indexes.json"}`, `"storage": {"rules": "storage.rules"}` 키를 추가한다. `hosting`/`emulators`는 변경하지 않는다.
9. `functions/` 디렉터리 생성: `functions/package.json`(Node 20 엔진 고정, `dependencies`에 `firebase-functions`/`firebase-admin`만, 배포 스크립트는 넣지 않는다), `functions/tsconfig.json`(`strict: true`, target 지정), `functions/src/index.ts`(내용은 `export {}` 한 줄만).

**제외 범위**: callable/트리거 함수 구현 금지(선언도 하지 않는다). Rules에 실제 조건문 작성 금지(전체 거부만). UI 라우트를 만들지 않는다.

**데이터 계약**: Firestore 컬렉션 13개 이름을 §2.8 그대로 rules 스캐폴드에 반영(내용은 거부만). enum 15종을 §2.9 그대로 타입으로 반영.

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `firebase` 패키지가 `package.json` `dependencies`에 존재한다
- [ ] `src/lib/firebase/client.ts`가 app/auth/firestore/storage 4개를 export한다
- [ ] `src/lib/firebase/types.ts`가 §2.9 enum 15종을 전부, 정확한 리터럴 값으로 포함한다
- [ ] `firestore.rules`가 13개 컬렉션 이름을 전부 포함하고 최상위가 `if false`로 전체 거부한다
- [ ] `storage.rules`가 존재하고 최상위가 전체 거부다
- [ ] `firebase.json`에 `firestore`/`storage` 키가 추가되고 `hosting`/`emulators` 블록은 GOOSE-00 이후 상태와 바이트 단위로 동일하다
- [ ] `functions/src/index.ts`가 Next.js `npm run build`에 포함되지 않는다(빌드 결과 영향 없음)

**실행할 검사**: `npm run verify`, `npm ls firebase`, `firebase emulators:start --only firestore,storage`(규칙 컴파일 에러 없이 기동되는지 로그 확인 후 종료)

**수동 확인 항목**: 에뮬레이터 UI(`http://localhost:4000`)의 Firestore/Storage 규칙 탭에 방금 만든 규칙이 로드되어 있는지 확인

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-01"로 표기

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-01 firebase client sdk + rules scaffold`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부 + `.env.example`에 없는 환경변수 이름을 새로 만들어야 하면 중단

---

### GOOSE-02 — 인증

**목적**: Firebase Auth 기반 이메일/비밀번호 로그인·회원가입 흐름과 클라이언트 인증 상태 컨텍스트를 구현한다. 이 패킷에서는 역할(role) 부여 로직 없이 Firebase Auth 계정 생성/로그인/로그아웃만 동작한다.

**선행 패킷**: GOOSE-01 완료 보고에서 `src/lib/firebase/client.ts` 존재, `firestore.rules` 스캐폴드 존재 확인

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.11(라우트 정본 — `/login`, `/signup`), §2.7(역할 정본, 이 패킷에서는 claim을 만들지 않고 다음 패킷을 위한 훅만 준비)

**수정 허용 경로**: `src/lib/firebase/auth.ts`(신규), `src/features/membership/**`(신규), `src/app/login/**`(신규), `src/app/signup/**`(신규), `src/lib/community/session.ts`(신규)

**수정 금지 경로**: `src/lib/firebase/client.ts`(GOOSE-01 산출물 — 수정이 필요해 보이면 중단 후 보고), `firestore.rules`, `functions/**`, §2.5의 기존 52개 라우트

**구현 범위**:
1. `feat/community-goose-01`에서 `feat/community-goose-02` 브랜치를 분기한다.
2. `src/lib/firebase/auth.ts`: `signUpWithEmail(email, password)`, `signInWithEmail(email, password)`, `signOutUser()`, `onAuthStateChangedListener(callback)` 4개 함수를 Firebase Auth SDK로 구현한다.
3. `src/lib/community/session.ts`: React Context `SessionProvider` + `useSession()` 훅을 구현한다. 상태 타입: `{ status: "loading" | "signed-out" | "signed-in"; user: FirebaseUser | null }`. 이 시점에는 role을 포함하지 않는다(role 확장은 GOOSE-03).
4. `src/app/login/page.tsx`: 이메일/비밀번호 로그인 폼. 정적 export 대상이므로 `"use client"` 컴포넌트로 작성한다.
5. `src/app/signup/page.tsx`: 이메일/비밀번호 회원가입 폼. 가입 성공 시 `/onboarding/profile`로 이동하는 로직을 작성한다(해당 라우트는 GOOSE-03에서 생성되며, 이 패킷 실행 시점엔 아직 없어 링크가 404여도 이 패킷의 완료 조건 위반이 아니다. GOOSE-03 인계 사항에 남긴다).
6. 로그인 성공 후 이동 대상은 `/me`가 아직 없으므로(GOOSE-09에서 생성) 이 패킷에서는 `/`(홈)로 임시 이동시킨다. "다음 패킷에 전달할 사항"에 "로그인 후 리다이렉트 대상을 GOOSE-09에서 `/me`로 교체" 항목을 남긴다.

**제외 범위**: 소셜 로그인(Google 등) 구현 금지(CANON에 명시 없음). 비밀번호 재설정 흐름은 이 패킷 범위 밖(§7 OPEN-02 참조). custom claim 설정 없음. `Firestore` `users/{uid}` 문서 생성 없음(GOOSE-03에서 수행).

**데이터 계약**: 해당 없음(Firestore 쓰기 없음) — Firebase Auth 계정만 생성한다. Auth 사용자 객체의 `email`, `uid`만 사용한다.

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `/login`, `/signup` 라우트가 정적 빌드에 포함된다(`out/login/index.html`, `out/signup/index.html` 존재)
- [ ] 에뮬레이터 환경에서 회원가입 시 Firebase Auth 에뮬레이터에 사용자가 생성된다
- [ ] 에뮬레이터 환경에서 로그인 성공/실패(잘못된 비밀번호)가 UI에 각각 다른 메시지로 표시된다
- [ ] `useSession()`이 로그인 상태 변화 시 리렌더를 트리거한다(수동 확인)
- [ ] Firestore 쓰기가 0건이다(에뮬레이터 Firestore 탭에 문서 없음)

**실행할 검사**: `npm run verify`, `npm run build` 후 `out/login/index.html`·`out/signup/index.html` 존재 확인

**수동 확인 항목**: 에뮬레이터 기동 상태에서 `/signup` 접속 → 계정 생성 → Auth 에뮬레이터 UI에 사용자 표시 확인 → 로그아웃 → `/login`으로 재로그인 확인

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-02"로 표기. "다음 패킷에 전달할 사항"에 로그인 후 리다이렉트 임시 처리 사실을 반드시 기록한다.

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-02 email auth flow`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부

---

### GOOSE-03 — 회원 승인

**목적**: 2단계 회원 가입 흐름(Auth 성공 → 프로필 작성 → 신청 제출 → 관리자 승인 → member)의 데이터 계층과 사용자 화면을 구현한다. custom claim 부여는 Cloud Functions callable로만 수행한다.

**선행 패킷**: GOOSE-02 완료 보고에서 `/login`/`/signup`/`useSession()` 정상 동작 확인

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.7(역할 정본), §2.8(`users`/`profiles`/`membershipApplications` 경로), §2.9(`UserRole`/`UserStatus`/`ApplicationStatus`), §2.10(`submitMembershipApplication`/`reviewMembershipApplication`), §7(OPEN-01)

**수정 허용 경로**: `functions/src/membership/**`(신규), `functions/src/index.ts`(export 추가만), `firestore.rules`(`users`/`profiles`/`membershipApplications` 블록만 채움), `src/lib/community/membership.ts`(신규), `src/features/membership/**`(GOOSE-02 산출물 확장), `src/app/onboarding/profile/**`(신규), `src/app/membership/pending/**`(신규)

**수정 금지 경로**: `firestore.rules`의 다른 10개 컬렉션 블록, `src/lib/firebase/auth.ts`(GOOSE-02 산출물), §2.5의 기존 52개 라우트

**구현 범위**:
1. `feat/community-goose-02`에서 `feat/community-goose-03` 브랜치를 분기한다.
2. Cloud Functions callable `submitMembershipApplication`: 인증된 사용자 본인의 `membershipApplications/{uid}` 문서를 `status: "submitted"`(재신청은 `"resubmitted"`)로 생성/갱신한다. `profiles/{uid}` 문서가 없으면 오류를 반환해 프로필 작성을 먼저 강제한다.
3. Cloud Functions callable `reviewMembershipApplication`: `request.auth.token.role == "admin"` 검사 후 대상 신청서의 `status`를 `"approved"` 또는 `"rejected"`로 갱신한다. 승인 시 대상 사용자의 custom claim `role`을 `"member"`로 설정하고 `users/{uid}.role` 미러를 동기화하며, `adminLogs`에 기록한다.
4. `firestore.rules`: `users/{uid}` — 클라이언트 쓰기 전면 금지(Cloud Functions만 쓰기), 읽기는 본인+moderator+admin. `profiles/{uid}` — 소유자 본인 읽기/쓰기, 그 외는 읽기만 허용. `membershipApplications/{uid}` — 소유자 본인 읽기 + `submitted`/`resubmitted` 상태로만 쓰기(직접 `approved`/`rejected`로 쓰기 금지), moderator/admin은 읽기+쓰기 가능.
5. `src/app/onboarding/profile/page.tsx`: 프로필 작성 폼. `profiles/{uid}` 필드는 아래 데이터 계약의 `displayName`(필수), `bio`(선택) 2개만 사용한다.
6. `src/app/membership/pending/page.tsx`: 본인 `membershipApplications/{uid}.status`를 실시간 구독해 진행 상태를 표시한다. `submitted`/`resubmitted`면 대기 안내, `rejected`면 재신청 버튼(callable 재호출), `approved`면 `/me`로 안내(라우트는 GOOSE-09 이후 존재 — 이 시점엔 안내 문구만).
7. 콜러블 **`bootstrapUserAccount`**를 구현한다([11 결정 로그 D-017](./11-DECISION-LOG.md) 「확정 명세」 준수). 입력 없음, 출력 `{ role, status, created }`. 진입부는 다른 콜러블과 달리 `①request.auth 존재 → ②users/{uid} 조회 → ③존재하면 무쓰기 반환(created:false) → ④없으면 {role:"pending_member", status:"active", createdAt} 생성 → ⑤custom claim 설정 → ⑥adminLogs 기록` 순서다. **③의 멱등 분기는 보안 요건이므로 생략하면 admin 강등·정지 해제 우회가 가능해진다.** 클라이언트는 (a) 가입 성공 직후 무조건, (b) 로그인 시 토큰에 `role` claim이 없을 때만 호출하고, 두 경우 모두 성공 후 `getIdToken(true)`로 토큰을 갱신한다. claim 미보유 상태를 UI에서 `guest`와 동일하게 취급하는 처리는 자가 치유 경로 보호를 위해 유지한다.

**제외 범위**: moderator/admin 관리자 승인 화면(GOOSE-08에서 구현). `trusted_member` 승격 로직(GOOSE-08). 재신청 횟수 제한 없음(CANON에 명시 없어 무제한 허용).

**데이터 계약**:

| 컬렉션/문서 | 필드 | 타입/enum |
|---|---|---|
| `users/{uid}` | `role` | `UserRole` |
| `users/{uid}` | `status` | `UserStatus` |
| `users/{uid}` | `createdAt` / `updatedAt` | Timestamp |
| `profiles/{uid}` | `displayName` | string (필수) |
| `profiles/{uid}` | `bio` | string (선택) |
| `profiles/{uid}` | `createdAt` / `updatedAt` | Timestamp |
| `membershipApplications/{uid}` | `status` | `ApplicationStatus` |
| `membershipApplications/{uid}` | `createdAt` / `updatedAt` | Timestamp |
| `adminLogs/{logId}` | `actorUid`, `action`, `targetUid`, `createdAt` | string/string/string/Timestamp |

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `submitMembershipApplication`, `reviewMembershipApplication` 두 callable이 에뮬레이터에서 호출 가능하다
- [ ] 승인 후 대상 계정의 ID 토큰(강제 리프레시)에 `role: "member"` claim이 반영된다
- [ ] `users/{uid}.role` 미러가 claim과 일치한다
- [ ] 비로그인 상태에서 `membershipApplications` 문서를 직접 쓰려는 클라이언트 요청이 rules에 의해 거부된다(수동 확인)
- [ ] `/onboarding/profile`, `/membership/pending` 라우트가 정적 빌드에 포함된다
- [ ] `adminLogs`에 승인/거절 기록이 1건 이상 생성된다

**실행할 검사**: `npm run verify`, `firebase emulators:start`로 기동 후 callable 수동/스크립트 호출 테스트, `npm run build` 후 신규 라우트 산출물 확인

**수동 확인 항목**: 에뮬레이터에서 계정 A로 가입→프로필 작성→신청 제출, Firebase Admin SDK 또는 에뮬레이터 UI로 계정 B에 `admin` claim을 수동 부여한 뒤 계정 B로 `reviewMembershipApplication` 호출 → 계정 A 재로그인 후 role 반영 확인

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-03"으로 표기. "다음 패킷에 전달할 사항"에 `bootstrapUserAccount` 구현 완료 여부와 "관리자 승인 UI는 GOOSE-08에서 필요"를 명시한다.

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-03 membership application flow`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부 + `bootstrapUserAccount` 외의 Auth 관련 함수를 임의로 명명해 추가하려는 경우 즉시 중단 + `bootstrapUserAccount`의 멱등 분기(D-017 ③)를 생략하려는 경우 즉시 중단

---

### GOOSE-04 — 커뮤니티 게시글

**목적**: `posts` 단일 컬렉션 기반 게시글 CRUD와 목록/상세/작성/수정 화면을 구현한다. 카테고리는 이 패킷에서는 하드코딩 목록을 사용하고(GOOSE-07에서 Firestore 기반으로 교체), 이미지 업로드 인프라(Storage)도 이 패킷에서 함께 구현한다.

**선행 패킷**: GOOSE-03 완료 보고에서 `role` custom claim 부여 흐름과 `useSession()` 확장 여부 확인(role을 ID 토큰 claim에서 읽을 수 있어야 한다)

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.8(`posts` 경로, Storage 경로), §2.9(`PostStatus`), §2.11(라우트 정본, D-002 rewrite 규칙), §2.12(카테고리 시드 정본), §2.13(소스 레이아웃)

**수정 허용 경로**: `firestore.rules`(`posts` 블록만 채움), `storage.rules`(`uploads/{uid}/{yyyyMM}/{fileId}` 블록 실구현), `firestore.indexes.json`(posts 조회용 인덱스 추가만), `firebase.json`(`hosting.rewrites`에 `/community/posts/*` 1줄 추가), `src/lib/community/posts.ts`(신규), `src/lib/community/categories.ts`(신규, 하드코딩), `src/lib/community/uploads.ts`(신규), `src/features/community/**`(신규), `src/app/community/**`(신규)

**수정 금지 경로**: `firestore.rules`의 다른 12개 컬렉션 블록, `functions/src/membership/**`, §2.5의 기존 52개 라우트

**구현 범위**:
1. `feat/community-goose-03`에서 `feat/community-goose-04` 브랜치를 분기한다.
2. `firestore.rules` `posts` 블록: `read` — `status == "published"`는 누구나(guest 포함), `hidden`/`deleted`는 작성자 본인+moderator+admin만. `create` — role이 `member`/`trusted_member`/`moderator`/`admin` 중 하나, `authorUid == request.auth.uid`, `status`는 `"published"`로 강제. `update` — 작성자 본인만, `status`를 `hidden`/`deleted`로 직접 바꾸는 것은 금지(모더레이션은 GOOSE-08의 `moderatePost`에서만). `delete` — 금지(하드 삭제 없음, soft delete만).
3. `storage.rules` `uploads/{uid}/{yyyyMM}/{fileId}` 블록: 소유자 본인만 쓰기, 콘텐츠 타입이 `image/*`인 것만 허용, 파일당 5MB 이하로 제한. 읽기는 공개(published 게시글/자료에서 참조되므로).
4. `firestore.indexes.json`에 posts 목록 조회용 복합 인덱스 추가: `category ASC, createdAt DESC`, `status ASC, createdAt DESC`.
5. `firebase.json` `hosting.rewrites`에 `{ "source": "/community/posts/*", "destination": "/community/post.html" }` 1줄을 추가한다(배열 첫 번째 항목).
6. `src/lib/community/categories.ts`: §2.12의 커뮤니티 카테고리 8종을 하드코딩 상수 배열로 export한다(주석: "GOOSE-07에서 Firestore 기반으로 교체 예정").
7. `src/lib/community/uploads.ts`: `uploadImage(file, uid)` — Storage `uploads/{uid}/{yyyyMM}/{fileId}.{ext}` 경로에 업로드 후 다운로드 URL을 반환.
8. `src/lib/community/posts.ts`: `createPost`, `updatePost`(soft), `listPosts(category?, cursor?)`, `getPost(postId)`.
9. `src/app/community/page.tsx`: 통합 최신글 목록 + `?category=` 쿼리 필터.
10. `src/app/community/post/page.tsx`: 파라미터 없는 정적 셸. `location.pathname`의 마지막 세그먼트를 `postId`로 파싱해 `getPost` 호출. ID 없이 접근 시 `/community`로 리다이렉트.
11. `src/app/community/write/page.tsx`: `member` 이상 역할 가드(비회원/미승인 접근 시 `/membership/pending`으로 안내).
12. `src/app/community/edit/page.tsx`: `?id=` 쿼리로 게시글 수정, 작성자 본인만 접근 가능.

**제외 범위**: 댓글/좋아요/북마크 UI(GOOSE-05). 신고 버튼(GOOSE-08). 카테고리 관리자 승인(GOOSE-07). `commentCount`/`likeCount` 갱신 로직(GOOSE-05 트리거) — 이 패킷에서는 두 필드를 `0`으로만 초기화한다.

**데이터 계약**:

| 필드 | 타입/enum | 비고 |
|---|---|---|
| `title` | string | 목표(이 문서에서 결정) |
| `bodyMarkdown` | string(Markdown) | 목표 |
| `category` | string | §2.12 커뮤니티 8종 slug 중 하나(하드코딩, GOOSE-07 이후 Firestore 검증으로 교체) |
| `authorUid` | string | §2.8 |
| `status` | `PostStatus` | §2.9 |
| `likeCount` | number | 서버 전용 갱신(GOOSE-05), 이 패킷에서는 생성 시 `0` |
| `commentCount` | number | 서버 전용 갱신(GOOSE-05), 이 패킷에서는 생성 시 `0` |
| `createdAt` / `updatedAt` | Timestamp | §2.8 |

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `/community`, `/community/post`, `/community/write`, `/community/edit` 라우트가 정적 빌드에 포함된다
- [ ] `member` 미만 역할로 `/community/write`에서 글 작성 시도 시 rules가 거부한다(수동 확인)
- [ ] `guest`가 `published` 게시글 목록/상세를 읽을 수 있다
- [ ] `hidden`/`deleted` 게시글이 작성자 본인이 아닌 다른 `member`에게 노출되지 않는다
- [ ] `/community/posts/<임의ID>` 접근 시 rewrite로 `/community/post.html`이 서빙된다(빌드 산출물 기준 확인, 실제 rewrite 동작은 배포 후 검증 항목으로 인계)
- [ ] 이미지 업로드가 5MB 초과 또는 비이미지 파일에서 거부된다

**실행할 검사**: `npm run verify`, `firebase emulators:start`로 rules 통합 확인, `npm run build` 후 `out/community/**` 산출물 확인

**수동 확인 항목**: 계정별(guest/member) 목록·작성·수정 시나리오, 이미지 업로드 성공/실패 케이스

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-04"로 표기

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-04 posts crud`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부

---

### GOOSE-05 — 댓글·반응·북마크

**목적**: 게시글/자료 공용 댓글(`comments`), 좋아요(`reactions`), 북마크(`bookmarks`)를 구현한다. 좋아요/댓글 카운터는 클라이언트가 직접 쓰지 않고 Firestore 트리거로만 갱신한다.

**선행 패킷**: GOOSE-04 완료 보고에서 `posts` rules/UI 정상 동작 확인(댓글이 붙을 대상이 존재해야 함)

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.8(`comments`/`reactions`/`bookmarks` 경로 및 문서ID 패턴), §2.9(`CommentStatus`/`TargetType`/`ReactionType`), §2.10(`onReactionWritten`/`onCommentWritten`)

**수정 허용 경로**: `functions/src/reactions/**`(신규), `functions/src/comments/**`(신규), `functions/src/index.ts`(export 추가만), `firestore.rules`(`comments`/`reactions`/`bookmarks` 블록만 채움), `src/lib/community/comments.ts`(신규), `src/lib/community/reactions.ts`(신규), `src/lib/community/bookmarks.ts`(신규), `src/features/community/**`(GOOSE-04 산출물에 댓글/좋아요/북마크 컴포넌트 추가), `src/app/community/post/page.tsx`(댓글 영역 삽입만)

**수정 금지 경로**: `firestore.rules`의 다른 10개 컬렉션 블록, `src/lib/community/posts.ts`의 기존 함수 시그니처 변경 금지(내부에서 `commentCount`/`likeCount` 읽기 추가는 허용), §2.5의 기존 52개 라우트

**구현 범위**:
1. `feat/community-goose-04`에서 `feat/community-goose-05` 브랜치를 분기한다.
2. `firestore.rules` `comments` 블록: `read` — 대상(post/material)이 공개 상태면 누구나. `create` — `member` 이상, `authorUid == request.auth.uid`, `status`를 `"published"`로 강제. `update`/`delete` — 클라이언트 금지(모더레이션은 GOOSE-08의 `deleteCommentByModerator`에서만; 작성자 본인의 soft-hide는 V1 범위 밖으로 제외).
3. `firestore.rules` `reactions` 블록: 문서ID가 `{targetType}__{targetId}__{uid}` 패턴과 일치해야 함, `create`/`delete`만 허용(본인 uid 세그먼트와 `request.auth.uid` 일치 필수), `type`은 항상 `"like"`.
4. `firestore.rules` `bookmarks` 블록: 문서ID가 `{uid}__{targetType}__{targetId}` 패턴과 일치, 본인만 `create`/`delete`/`read` 가능(소유자 외 읽기 금지).
5. Firestore 트리거 `onReactionWritten`(`reactions` onCreate/onDelete): 대상 문서(`posts/{targetId}` 또는 `materials/{targetId}`)의 `likeCount`를 `FieldValue.increment(+1)`(생성)/`(-1)`(삭제)로 갱신.
6. Firestore 트리거 `onCommentWritten`(`comments` onCreate): 대상 문서의 `commentCount`를 `FieldValue.increment(+1)`로 갱신하고, `notifications/{targetUid}/items/{notificationId}`에 알림 문서를 생성한다. `targetUid`는 대상 게시글/자료의 `authorUid`(자기 자신의 글에 자기가 댓글을 달면 알림 생성하지 않는다). `parentCommentId`가 있으면 `type: "reply_to_comment"`, 없고 대상이 `post`면 `type: "comment_on_post"`, `material`이면 `type: "comment_on_material"`.
7. `firestore.rules` `posts`/`materials` 블록에 "`likeCount`/`commentCount` 필드는 클라이언트가 직접 쓸 수 없다"는 조건을 추가한다(이미 GOOSE-04/06에서 채운 블록을 이 항목만 확장 — GOOSE-04 블록 확장은 허용, GOOSE-06은 아직 미실행이므로 `materials` 블록은 GOOSE-06 완료 후 이 조건이 반영되도록 GOOSE-06 패킷 구현 범위에도 동일 조건을 명시해 둔다).
8. `src/lib/community/comments.ts`: `createComment(targetType, targetId, bodyMarkdown, parentCommentId?)`, `listComments(targetType, targetId)`.
9. `src/lib/community/reactions.ts`: `toggleLike(targetType, targetId)` — 결정론적 문서ID로 존재 확인 후 생성/삭제.
10. `src/lib/community/bookmarks.ts`: `toggleBookmark(targetType, targetId)`, `listMyBookmarks()`.
11. UI: `src/features/community/CommentList.tsx`, `CommentForm.tsx`, `LikeButton.tsx`, `BookmarkButton.tsx`를 만들고 `/community/post`에 삽입한다(자료 상세 페이지 삽입은 GOOSE-06에서 동일 컴포넌트를 재사용, 이 패킷에서는 컴포넌트만 공용으로 설계).

**제외 범위**: 신고 버튼(GOOSE-08). 댓글 대댓글의 UI 트리 들여쓰기 depth 제한 없음(1단계만 지원, 그 이상은 OPEN 없이 단순히 `parentCommentId`가 즉시 부모인 1단계로 제한). 자료(`materials`) 대상 댓글 UI 삽입은 GOOSE-06에서 수행(이 패킷은 컴포넌트 재사용 가능하도록 `targetType` 매개변수만 준비).

**데이터 계약**:

| 컬렉션 | 필드 | 타입/enum |
|---|---|---|
| `comments/{commentId}` | `targetType` | `TargetType` |
| `comments/{commentId}` | `targetId` | string |
| `comments/{commentId}` | `authorUid` | string |
| `comments/{commentId}` | `bodyMarkdown` | string |
| `comments/{commentId}` | `status` | `CommentStatus` |
| `comments/{commentId}` | `parentCommentId` | string \| null (목표 — 이 문서에서 결정, 대댓글 1단계) |
| `comments/{commentId}` | `createdAt` / `updatedAt` | Timestamp |
| `reactions/{targetType__targetId__uid}` | `targetType` | `TargetType` |
| `reactions/{...}` | `targetId`, `uid` | string |
| `reactions/{...}` | `type` | `ReactionType`(`"like"` 고정) |
| `reactions/{...}` | `createdAt` | Timestamp |
| `bookmarks/{uid__targetType__targetId}` | `targetType`, `targetId`, `uid` | string |
| `bookmarks/{...}` | `createdAt` | Timestamp |

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] 댓글 작성 시 대상 게시글의 `commentCount`가 1 증가한다(에뮬레이터에서 확인)
- [ ] 좋아요 토글 시 대상 게시글의 `likeCount`가 증감한다
- [ ] 클라이언트가 `posts/{postId}.likeCount`를 직접 `update`하려는 요청이 rules에 의해 거부된다
- [ ] 댓글 작성 시 대상 게시글 작성자의 `notifications` 서브컬렉션에 알림 문서가 1건 생성된다(단, 자기 글에 자기가 댓글을 단 경우는 생성되지 않는다)
- [ ] 북마크는 소유자 본인만 읽을 수 있다(다른 계정으로 조회 시 rules 거부, 수동 확인)
- [ ] `bookmarks`/`reactions` 문서ID가 정본 패턴과 정확히 일치한다

**실행할 검사**: `npm run verify`, 에뮬레이터에서 트리거 로그(`firebase emulators:start` 콘솔) 확인

**수동 확인 항목**: 계정 A로 게시글 작성, 계정 B로 댓글+좋아요+북마크 → 계정 A `notifications` 서브컬렉션(에뮬레이터 UI) 확인, `likeCount`/`commentCount` 값 확인

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-05"로 표기

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-05 comments reactions bookmarks`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부

---

### GOOSE-06 — 교육자료

**목적**: `materials` 컬렉션 기반 교육자료 등록/검수/공식 승격 흐름을 구현한다. `trusted_member`는 검토 없이 즉시 `community` 상태로 게시된다.

**선행 패킷**: GOOSE-05 완료 보고에서 댓글/좋아요/북마크 컴포넌트가 `targetType` 매개변수로 재사용 가능한지 확인

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.7(`trusted_member` 정의), §2.8(`materials` 경로), §2.9(`MaterialStatus`), §2.10(`setMaterialStatus`), §2.11(라우트 정본, rewrite 2번째 줄)

**수정 허용 경로**: `functions/src/materials/**`(신규), `functions/src/index.ts`(export 추가만), `firestore.rules`(`materials` 블록만 채움 — 단, GOOSE-05가 남긴 "`likeCount`/`commentCount` 클라이언트 쓰기 금지" 조건을 이 블록에도 반영해야 한다), `firestore.indexes.json`(materials 조회용 인덱스 추가만), `firebase.json`(`hosting.rewrites`에 `/materials/items/*` 1줄 추가, 배열 2번째 항목), `src/lib/community/materials.ts`(신규), `src/features/materials/**`(신규), `src/app/materials/**`(신규)

**수정 금지 경로**: `firestore.rules`의 다른 11개 컬렉션 블록, `src/lib/community/posts.ts`, `src/lib/community/categories.ts`(GOOSE-04 산출물 — GOOSE-06에서는 자료용 카테고리 상수를 별도 파일로 새로 만든다), §2.5의 기존 52개 라우트

**구현 범위**:
1. `feat/community-goose-05`에서 `feat/community-goose-06` 브랜치를 분기한다.
2. Cloud Functions callable `setMaterialStatus`: 호출자 role에 따라 허용 전이를 제한한다. `moderator` — `pending_review → community` 또는 `pending_review → needs_revision`만 허용. `admin` — 위 전이 전부 + 임의 상태 → `official`, 임의 상태 → `archived` 허용. 그 외 전이는 거부. 처리 후 `adminLogs` 기록.
3. `firestore.rules` `materials` 블록: `read` — `status`가 `community`/`official`이면 누구나, 그 외(`draft`/`pending_review`/`needs_revision`/`archived`)는 작성자 본인+moderator+admin만. `create` — `member` 이상, `authorUid == request.auth.uid`. 작성자 role이 `trusted_member`면 `status`를 `"community"`로 직접 생성 가능, 그 외 role은 `"draft"` 또는 `"pending_review"`로만 생성 가능. **출처 필수화(D-021, FR-M08)**: `sourceType`은 항상 필수(`original`/`external`)이며 `external`일 때만 `resourceUrl`(1~2048자)을 요구하고 `original`이면 `resourceUrl` 필드 자체를 금지한다. **연결(D-020)**: `linkedRefs`는 `is list` + `size() <= 5`만 Rules로 강제한다(항목 내부의 `{type,id}` 형태 검사는 Rules에서 map 순회가 불가능하므로 zod가 담당 — 06 §14 규칙과 동일). `update` — 작성자 본인은 `draft`/`needs_revision` 상태에서 내용 수정만 가능(상태 전이는 불가, 상태 전이는 `setMaterialStatus`에서만). `likeCount`/`commentCount`는 클라이언트 쓰기 금지(GOOSE-05와 동일 조건).
4. `firestore.indexes.json`에 `status ASC, category ASC, createdAt DESC` 복합 인덱스를 추가한다.
5. `firebase.json` `hosting.rewrites` 배열 2번째 항목으로 `{ "source": "/materials/items/*", "destination": "/materials/item.html" }`을 추가한다(1번째 항목인 `/community/posts/*`는 그대로 유지).
6. `src/lib/community/materials.ts`: `createMaterial`, `updateMaterial`, `listMaterials(status?, category?, tag?)`, `getMaterial(materialId)`. 이미지 업로드는 GOOSE-04의 `src/lib/community/uploads.ts`를 재사용한다(수정 없이 import만).
7. `src/features/materials/CategorySelect.tsx`: §2.12 자료 카테고리 6종을 하드코딩 상수로 사용한다(주석: "GOOSE-07에서 Firestore 기반으로 교체 예정").
8. `src/app/materials/page.tsx`: 목록 + status/category/tag 필터.
9. `src/app/materials/item/page.tsx`: 파라미터 없는 정적 셸, `location.pathname` 파싱으로 `materialId` 추출. GOOSE-05의 `CommentList`/`CommentForm`/`LikeButton`/`BookmarkButton`을 `targetType="material"`로 재사용한다.
10. `src/app/materials/new/page.tsx`: `member` 이상 가드. `trusted_member`면 등록 즉시 `community` 상태임을 UI에 안내. 작성 폼에 **출처 유형 라디오**(`sourceType`: 직접 작성/외부 자료)와 조건부 `resourceUrl` 입력을 포함하고, zod `discriminatedUnion`(05 §2.5)으로 분기 필수·금지를 강제한다(D-021).
11. `src/app/materials/edit/page.tsx`: `?id=` 쿼리, 작성자 본인만.

**제외 범위**: 공식 승격(`official`) UI 버튼은 이 패킷에서 만들지 않는다(관리자 전용 UI는 GOOSE-08에서 구현, 이 패킷은 콜러블/rules까지만). `tag` 필드의 자동완성/추천 기능 없음(단순 텍스트 배열).

**데이터 계약**:

| 필드 | 타입/enum | 비고 |
|---|---|---|
| `title` | string | 목표 |
| `bodyMarkdown` | string(Markdown) | 목표 |
| `category` | string | §2.12 자료 6종 slug(하드코딩, GOOSE-07 이후 교체) |
| `tags` | string[] | 목표, 자유 입력 |
| `sourceType` | `"original" \| "external"` | **필수**([D-021](./11-DECISION-LOG.md), FR-M08). `resourceUrl`과 분기 필수 |
| `resourceUrl` | string | `sourceType == "external"`이면 필수(1~2048자), `"original"`이면 필드 자체를 넣지 않음 |
| `attachmentUrls` | string[] | 최대 4개(이미지 전용) |
| `linkedRefs` | Array<{type, id}> | 최대 5개. 항목은 **정확히 `{type,id}` 두 필드만**([D-020](./11-DECISION-LOG.md)) |
| `authorUid` | string | §2.8 |
| `status` | `MaterialStatus` | §2.9 |
| `likeCount` / `commentCount` | number | 서버 전용, 생성 시 `0` |
| `createdAt` / `updatedAt` | Timestamp | §2.8 |

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `trusted_member` 계정으로 자료 등록 시 `status`가 즉시 `"community"`로 생성된다(에뮬레이터 확인)
- [ ] `member` 계정으로 자료 등록 시 `status`가 `"draft"` 또는 `"pending_review"`로만 생성된다
- [ ] `moderator` 계정의 `setMaterialStatus` 호출로 `official` 전이를 시도하면 거부된다
- [ ] `admin` 계정의 `setMaterialStatus` 호출로 `pending_review → official` 전이가 성공한다
- [ ] `guest`가 `draft`/`pending_review` 상태 자료를 읽을 수 없다(rules 거부)
- [ ] `/materials/items/<임의ID>` 빌드 산출물이 `/materials/item.html`로 rewrite 매핑되어 있다(firebase.json 기준 확인)

**실행할 검사**: `npm run verify`, 에뮬레이터에서 `setMaterialStatus` role별 전이 테스트, `npm run build` 후 `out/materials/**` 산출물 확인

**수동 확인 항목**: `trusted_member`/`member`/`moderator`/`admin` 4개 계정으로 등록·검수·승격 시나리오 전체 실행

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-06"으로 표기

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-06 materials crud + status transitions`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부

---

### GOOSE-07 — 카테고리와 신청

**목적**: `categories`/`categoryRequests` 데이터 계층과 카테고리 신청 흐름을 구현하고, GOOSE-04/06에서 하드코딩했던 카테고리 목록을 Firestore 기반으로 교체한다.

**선행 패킷**: GOOSE-06 완료 보고에서 `materials` 정상 동작, `src/lib/community/categories.ts`(GOOSE-04)와 `src/features/materials/CategorySelect.tsx`(GOOSE-06) 존재 확인

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.8(`categories`/`categoryRequests` 경로), §2.9(`CategoryKind`/`CategoryStatus`/`RequestStatus`), §2.10(`reviewCategoryRequest`), §2.12(시드 정본)

**수정 허용 경로**: `functions/src/categories/**`(신규), `functions/src/index.ts`(export 추가만), `firestore.rules`(`categories`/`categoryRequests` 블록만 채움), `scripts/community/seed-categories.mjs`(신규), `src/lib/community/categories.ts`(GOOSE-04 산출물 — 하드코딩을 Firestore 쿼리로 교체), `src/features/materials/CategorySelect.tsx`(GOOSE-06 산출물 — 동일하게 교체), `src/lib/community/categoryRequests.ts`(신규), `src/app/community/write/page.tsx`(GOOSE-04 산출물 — "새 카테고리 요청" 폼 추가), `src/app/materials/new/page.tsx`(GOOSE-06 산출물 — 동일)

**수정 금지 경로**: `firestore.rules`의 다른 11개 컬렉션 블록, `posts`/`materials`의 스키마 필드명 변경 금지(`category` 필드는 여전히 string), §2.5의 기존 52개 라우트

**구현 범위**:
1. `feat/community-goose-06`에서 `feat/community-goose-07` 브랜치를 분기한다.
2. `firestore.rules` `categories` 블록: `read` — `status == "active"`는 누구나, `archived`는 moderator/admin만. `write` — 클라이언트 전면 금지(서버 전용, `reviewCategoryRequest`에서만 생성/갱신).
3. `firestore.rules` `categoryRequests` 블록: `create` — `member` 이상, `requestedByUid == request.auth.uid`, `status`를 `"submitted"`로 강제. `read` — 본인 + moderator + admin. `update`/`delete` — 클라이언트 금지(서버 전용).
4. Cloud Functions callable `reviewCategoryRequest`: `admin`만 호출 가능. 승인 시 `categories/{categoryId}`(categoryId = 요청된 slug)를 `status: "active"`로 생성/갱신, `categoryRequests/{requestId}.status`를 `"approved"`로 갱신. 거절 시 `categoryRequests/{requestId}.status`를 `"rejected"`로만 갱신. 처리 후 `adminLogs` 기록.
5. `scripts/community/seed-categories.mjs`: Firebase Admin SDK로 에뮬레이터 또는 지정 프로젝트에 §2.12의 커뮤니티 8종 + 자료 6종, 총 14개 `categories` 문서를 `status: "active"`로 삽입하는 1회성 Node 스크립트. `npm run` 스크립트로 등록하지 않고 `node scripts/community/seed-categories.mjs`로 직접 실행하는 방식으로 문서화한다(package.json에 새 스크립트 추가하지 않는다).
6. `src/lib/community/categories.ts`를 수정한다: 기존 하드코딩 배열 export를 제거하고, `listCategories(kind: CategoryKind)` — `categories` 컬렉션에서 `kind`+`status=="active"` 조건으로 조회하는 함수로 교체한다. `posts`를 사용하는 GOOSE-04 컴포넌트들이 깨지지 않도록 함수 시그니처 이름은 유지하되 구현만 Firestore 조회로 바꾼다.
7. `src/features/materials/CategorySelect.tsx`도 동일하게 Firestore 조회 기반으로 교체한다.
8. `src/app/community/write/page.tsx`, `src/app/materials/new/page.tsx`에 "목록에 없는 카테고리 요청" 인라인 폼을 추가한다(별도 라우트 신설 없음 — §2.11에 카테고리 신청 전용 라우트가 없으므로 새 라우트를 만들지 않는다). 폼 제출 시 `categoryRequests` 문서를 생성한다.

**제외 범위**: `/admin/categories` 관리자 승인 UI는 이 패킷에서 만들지 않는다(GOOSE-08에서 다른 `/admin/**` 라우트와 함께 구현). 기존 활성 카테고리를 `archived`로 전환하는 UI/콜러블은 구현하지 않는다(§7 OPEN-04 참조).

**데이터 계약**:

| 컬렉션 | 필드 | 타입/enum |
|---|---|---|
| `categories/{slug}` | `kind` | `CategoryKind` |
| `categories/{slug}` | `label` | string(한국어 표시명) |
| `categories/{slug}` | `status` | `CategoryStatus` |
| `categories/{slug}` | `createdAt` / `updatedAt` | Timestamp |
| `categoryRequests/{requestId}`
`mediaAssets/{mediaAssetId}` | `kind` | `CategoryKind` |
| `categoryRequests/{requestId}` | `slug` | string |
| `categoryRequests/{requestId}` | `label` | string |
| `categoryRequests/{requestId}` | `requestedByUid` | string |
| `categoryRequests/{requestId}` | `status` | `RequestStatus` |
| `categoryRequests/{requestId}` | `createdAt` / `updatedAt` | Timestamp |

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `scripts/community/seed-categories.mjs` 실행 후 에뮬레이터 Firestore에 `categories` 문서 14건이 존재한다(커뮤니티 8 + 자료 6)
- [ ] `/community/write`, `/materials/new`의 카테고리 선택 목록이 Firestore `categories` 조회 결과와 일치한다(하드코딩 값이 더 이상 쓰이지 않음)
- [ ] `member`가 `categoryRequests` 문서를 생성할 수 있다
- [ ] `guest`가 `categoryRequests`를 읽으려 하면 rules가 거부한다
- [ ] `admin`의 `reviewCategoryRequest` 승인 호출로 `categories` 문서가 `status: "active"`로 생성된다
- [ ] GOOSE-04에서 만든 게시글 목록/작성 흐름이 이 패킷 이후에도 회귀 없이 동작한다(`npm run build` + 수동 확인)

**실행할 검사**: `npm run verify`, `node scripts/community/seed-categories.mjs`(에뮬레이터 대상) 실행 로그 확인, `npm run build`

**수동 확인 항목**: 시드 스크립트 실행 후 에뮬레이터 UI에서 `categories` 컬렉션 14건 확인, `/community/write`에서 카테고리 드롭다운이 시드 값과 일치하는지 확인, "새 카테고리 요청" 폼 제출 후 `categoryRequests` 문서 생성 확인

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-07"로 표기

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-07 categories + requests`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부 + 카테고리 슬러그가 §2.12 시드 목록과 다르게 생성되는 경우 즉시 중단

---

### GOOSE-08 — 신고·관리자

**목적**: 신고(`reports`) 처리와 `/admin/**` 관리자 라우트 대부분(공지 제외)을 구현한다. `moderationActions`/`adminLogs` 기록 체계를 완성한다.

**선행 패킷**: GOOSE-07 완료 보고에서 카테고리 Firestore 전환 완료, GOOSE-03/04/05/06에서 만든 콜러블(`reviewMembershipApplication`, `setMaterialStatus`, `reviewCategoryRequest`) 존재 확인

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.7(역할별 권한), §2.8(`reports`/`moderationActions`/`adminLogs` 경로), §2.9(`ReportReason`/`ReportStatus`/`ModerationActionType`), §2.10(`resolveReport`/`moderatePost`/`deleteCommentByModerator`/`suspendUser`/`restoreUser`/`setUserRole`), §2.11(관리자 라우트), §7(OPEN-03, OPEN-04)

**수정 허용 경로**: `functions/src/reports/**`(신규), `functions/src/moderation/**`(신규), `functions/src/users/**`(신규, `setUserRole`/`suspendUser`/`restoreUser`), `functions/src/index.ts`(export 추가만), `firestore.rules`(`reports`/`moderationActions`/`adminLogs` 블록만 채움), `src/lib/community/reports.ts`(신규), `src/lib/community/admin.ts`(신규), `src/features/admin/**`(신규), `src/app/admin/**`(신규, `/admin/notices` 제외), `src/features/community/**`(GOOSE-04/05 산출물 — 신고 버튼 추가), `src/features/materials/**`(GOOSE-06 산출물 — 신고 버튼 추가)

**수정 금지 경로**: `firestore.rules`의 다른 10개 컬렉션 블록, §2.5의 기존 52개 라우트, `src/app/admin/notices/**`(이 패킷에서 생성하지 않는다 — 아래 제외 범위 참조)

**구현 범위**:
1. `feat/community-goose-07`에서 `feat/community-goose-08` 브랜치를 분기한다.
2. `firestore.rules` `reports` 블록: `create` — `member` 이상, **문서 ID가 `{targetType}__{targetId}__{reporterUid}` 패턴과 정확히 일치**([D-018](./11-DECISION-LOG.md)), `reporterUid == request.auth.uid`, `reason`이 `ReportReason` 값 중 하나, `detail` 0~500자, `status`를 `"open"`으로 강제. `read` — 신고자 본인 + moderator + admin. `update` — moderator+의 `open → in_review` 전이만(그 외 전이는 `resolveReport` 전용). `delete` — 전면 금지. 정확한 코드는 [06 §4](./06-SECURITY-AND-MODERATION-SSOT.md)를 그대로 옮긴다.
   - **`src/lib/community/reports.ts`의 신고 제출은 `addDoc`을 쓰면 안 된다.** 반드시 `setDoc(doc(db, "reports", `${targetType}__${targetId}__${uid}`), {...})`로 ID를 직접 지정한다. `addDoc`의 랜덤 ID는 위 패턴 검사를 통과할 수 없어 **모든 신고가 `permission-denied`로 거부된다.**
   - 재신고 시 `create`가 아닌 `update`가 되어 Rules에서 거부되므로, 클라이언트는 `permission-denied`를 잡아 "이미 신고한 대상입니다"로 안내한다(오류 토스트가 아니라 정상 안내로 처리).
3. `firestore.rules` `moderationActions`/`adminLogs` 블록: 둘 다 클라이언트 쓰기 전면 금지(서버 전용). 읽기: `moderationActions`는 moderator+admin, `adminLogs`는 admin만(§2.7 "admin: …로그 열람").
4. Cloud Functions callable 5종을 §2.10의 진입 검사 순서(auth 존재 → role 검사 → `users/{uid}.status == "active"` → `adminLogs` 기록) 그대로 구현한다.
   - `resolveReport`(moderator+): `reports/{reportId}.status`를 `"in_review"`/`"resolved"`/`"dismissed"`로 갱신, `moderationActions` 기록.
   - `moderatePost`(moderator+): `posts/{postId}.status`를 `"hidden"`/`"published"`(복구)로 갱신, `moderationActions` 기록(`hide_post`/`restore_post`).
   - `deleteCommentByModerator`(moderator+): `comments/{commentId}.status`를 `"deleted"`로 갱신, `moderationActions` 기록(`delete_comment`).
   - `suspendUser`/`restoreUser`(admin): `users/{uid}.status`를 `"suspended"`/`"active"`로 갱신, `moderationActions` 기록(`suspend_user`/`restore_user`).
   - `setUserRole`(admin): 대상 custom claim `role` 갱신 + `users/{uid}.role` 미러 동기화, `moderationActions` 기록(`change_role`).
5. Firestore 트리거 `onReportResolved`(`reports` onUpdate, `status`가 `resolved`/`dismissed`로 전이될 때): 신고자에게 `notifications/{reporterUid}/items`에 `type: "report_resolved"` 알림 생성.
6. `/admin/page.tsx`: `moderator`/`admin` 클라이언트 가드(비인가 접근 시 홈으로 리다이렉트) + 대시보드 셸.
7. `/admin/members/page.tsx`: GOOSE-03에서 만든 `membershipApplications` 목록 조회 + `reviewMembershipApplication` 호출 UI(관리자 승인/거절 버튼), `setUserRole`/`suspendUser`/`restoreUser` 호출 UI.
8. `/admin/posts/page.tsx`: `moderatePost` 호출 UI(숨김/복구).
9. `/admin/materials/page.tsx`: `setMaterialStatus`(GOOSE-06에서 만든 콜러블) 호출 UI, `official` 승격 버튼(admin 전용으로 조건부 렌더).
10. `/admin/categories/page.tsx`: `reviewCategoryRequest`(GOOSE-07에서 만든 콜러블) 호출 UI. 기존 카테고리 archived 전환 버튼은 만들지 않는다(§7 OPEN-04).
11. `/admin/reports/page.tsx`: `reports` 목록 + `resolveReport` 호출 UI.
12. `/admin/logs/page.tsx`: `adminLogs` 읽기 전용 목록(admin만 접근 가능하도록 클라이언트 가드 + rules 이중 확인).
13. GOOSE-04/05/06에서 만든 게시글/댓글/자료 카드 컴포넌트에 "신고" 버튼을 추가한다. 클릭 시 `reports` 문서를 클라이언트가 직접 생성한다(4단계 rules에 맞춰).

**제외 범위**: `/admin/notices`(공지 관리)는 이 패킷에서 만들지 않는다. §2.10에 공지 발송용 콜러블/트리거 이름이 정의되어 있지 않고(`admin_notice`는 `NotificationType` 값일 뿐 함수가 아니다), 브로드캐스트 데이터 모델도 CANON에 없다. §7 OPEN-03으로 남기고, 사람이 함수명/데이터 모델을 확정하기 전까지 구현하지 않는다. 기존 카테고리의 `archived` 전환 UI도 만들지 않는다(§7 OPEN-04).

**데이터 계약**:

| 컬렉션 | 필드 | 타입/enum |
|---|---|---|
| `reports/{reportId}` | `targetType` | `TargetType` |
| `reports/{reportId}` | `targetId` | string |
| `reports/{reportId}` | `reporterUid` | string |
| `reports/{reportId}` | `reason` | `ReportReason` |
| `reports/{reportId}` | `detail` | string(선택, 목표) |
| `reports/{reportId}` | `status` | `ReportStatus` |
| `reports/{reportId}` | `createdAt` / `updatedAt` | Timestamp |
| `moderationActions/{actionId}` | `type` | `ModerationActionType` |
| `moderationActions/{actionId}` | `actorUid`, `targetUid`(선택), `targetId`(선택) | string |
| `moderationActions/{actionId}` | `createdAt` | Timestamp |
| `adminLogs/{logId}` | `actorUid`, `action`, `targetUid`(선택), `createdAt` | string/string/string/Timestamp |

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] 5개 관리자 콜러블(`resolveReport`/`moderatePost`/`deleteCommentByModerator`/`suspendUser`/`restoreUser`/`setUserRole` — 총 6개, 목적 항목 개수 오기 없이 정확히 열거) 전부가 §2.10의 4단계 진입 검사를 통과한 요청만 처리한다
- [ ] `moderator` 계정이 `setUserRole`을 호출하면 거부된다(admin 전용)
- [ ] `member` 계정이 신고를 제출하면 `reports` 문서가 생성되고, 같은 계정이 다른 사람의 `reports` 문서를 읽으려 하면 거부된다
- [ ] `moderatePost`로 숨김 처리된 게시글이 `guest`/`member`에게 노출되지 않는다
- [ ] `/admin/**`(공지 제외) 7개 라우트가 정적 빌드에 포함된다
- [ ] `adminLogs`는 `admin` 계정으로만 읽힌다(`moderator` 계정으로 읽으면 거부)

**실행할 검사**: `npm run verify`, 에뮬레이터에서 role별 콜러블 호출 매트릭스 테스트, `npm run build`

**수동 확인 항목**: `moderator`/`admin` 각각으로 로그인해 승인/제재/숨김/신고처리 시나리오 전체 실행, 신고 버튼이 게시글·댓글·자료 카드에 노출되는지 확인

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-08"로 표기. "다음 패킷에 전달할 사항"에 OPEN-03/OPEN-04 미해결 상태를 명시한다.

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-08 reports + admin console`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부 + `/admin/notices` 또는 공지 발송용 함수를 임의로 구현하려는 경우(OPEN-03 위반) 즉시 중단

---

### GOOSE-09 — 알림·프로필 활동

**목적**: `notifications` 서브컬렉션 UI와 `/me/**`, `/members` 라우트를 구현한다. GOOSE-02의 로그인 후 임시 리다이렉트를 `/me`로 교체한다.

**선행 패킷**: GOOSE-08 완료 보고에서 관리자 콜러블/라우트 정상 동작 확인

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.8(`notifications` 경로), §2.9(`NotificationType`), §2.10(`onMembershipReviewed`/`onMaterialStatusChanged`/`onReportResolved`), §2.11(`/me/**`, `/members`, rewrite 3번째 줄)

**수정 허용 경로**: `functions/src/notifications/**`(신규), `functions/src/index.ts`(export 추가만, `onMembershipReviewed`/`onMaterialStatusChanged` 훅을 GOOSE-03/06 로직에 연결), `firestore.rules`(`notifications` 블록만 채움), `firestore.indexes.json`(내 활동 조회용 인덱스 추가만), `firebase.json`(`hosting.rewrites`에 `/members/*` 1줄 추가, 배열 3번째 항목), `src/lib/community/notifications.ts`(신규), `src/app/me/**`(신규), `src/app/members/**`(신규), `src/app/login/page.tsx`(GOOSE-02 산출물 — 리다이렉트 대상만 `/me`로 교체)

**수정 금지 경로**: `firestore.rules`의 다른 12개 컬렉션 블록, `src/lib/firebase/auth.ts`, §2.5의 기존 52개 라우트

**구현 범위**:
1. `feat/community-goose-08`에서 `feat/community-goose-09` 브랜치를 분기한다.
2. `firestore.rules` `notifications/{uid}/items/{notificationId}` 블록: `read` — 본인만. `update` — 본인, `readAt` 필드 단일 갱신만 허용(다른 필드 변경 금지). `create`/`delete` — 클라이언트 금지(서버 전용).
3. Firestore 트리거 `onMembershipReviewed`(`membershipApplications` onUpdate, `status`가 `approved`/`rejected`로 전이될 때): 대상 `notifications/{uid}/items`에 `type: "membership_approved"`/`"membership_rejected"` 알림 생성.
4. Firestore 트리거 `onMaterialStatusChanged`(`materials` onUpdate, `status` 변경 시): 작성자 `notifications/{authorUid}/items`에 `type: "material_status_changed"` 알림 생성.
5. `onReportResolved`는 GOOSE-08에서 이미 구현되어 있으므로 이 패킷에서는 수정하지 않는다(존재 확인만).
6. `src/lib/community/notifications.ts`: `listNotifications()`, `markRead(notificationId)`(단일 `readAt` 필드 갱신).
7. `src/app/me/page.tsx`: 대시보드(요약 카드).
8. `src/app/me/posts/page.tsx`, `/me/comments`, `/me/bookmarks`, `/me/likes`, `/me/notifications`, `/me/activity`, `/me/settings` 각 라우트 구현.
9. `src/app/members/page.tsx`: 파라미터 없는 정적 셸. `location.pathname` 마지막 세그먼트를 `uid`로 파싱해 `profiles/{uid}` 공개 정보 표시.
10. `firebase.json` `hosting.rewrites` 배열 3번째 항목으로 `{ "source": "/members/*", "destination": "/members.html" }`을 추가한다(앞 2개 항목 순서 유지).
11. `firestore.indexes.json`에 "내 활동" 조회용 복합 인덱스 추가: `comments`(`authorUid ASC, createdAt DESC`), `reactions`(`uid ASC, createdAt DESC`), `bookmarks`(`uid ASC, createdAt DESC`), `posts`(`authorUid ASC, createdAt DESC`).
12. `src/app/login/page.tsx`의 로그인 성공 후 이동 대상을 `/`에서 `/me`로 교체한다.

**제외 범위**: `/admin/notices`(GOOSE-08과 동일하게 OPEN-03으로 보류, 이 패킷도 만들지 않는다). 알림 실시간 푸시(브라우저 푸시 알림)는 V1 비목표(CANON D-010).

**데이터 계약**:

| 컬렉션 | 필드 | 타입/enum |
|---|---|---|
| `notifications/{uid}/items/{notificationId}` | `type` | `NotificationType` |
| `notifications/{uid}/items/{notificationId}` | `targetUid` | string |
| `notifications/{uid}/items/{notificationId}` | `payload` | object(목표, 알림 유형별 최소 참조 정보: `targetType`/`targetId`) |
| `notifications/{uid}/items/{notificationId}` | `readAt` | Timestamp \| null |
| `notifications/{uid}/items/{notificationId}` | `createdAt` | Timestamp |

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `/me`, `/me/posts`, `/me/comments`, `/me/bookmarks`, `/me/likes`, `/me/notifications`, `/me/activity`, `/me/settings`, `/members` 라우트가 정적 빌드에 포함된다
- [ ] 회원가입 신청이 승인되면 신청자 `notifications` 서브컬렉션에 `membership_approved` 알림이 생성된다
- [ ] 자료 상태가 변경되면 작성자 `notifications` 서브컬렉션에 `material_status_changed` 알림이 생성된다
- [ ] 클라이언트가 `readAt` 외 필드를 갱신하려 하면 rules가 거부한다
- [ ] 다른 계정의 `notifications`를 읽으려 하면 rules가 거부한다
- [ ] 로그인 성공 후 `/me`로 이동한다(GOOSE-02 임시 처리가 교체됨)

**실행할 검사**: `npm run verify`, 에뮬레이터 트리거 로그 확인, `npm run build`

**수동 확인 항목**: 승인/자료상태변경/댓글/좋아요 각 시나리오로 알림 생성 확인, `/me/notifications`에서 읽음 처리 확인, `/members/<uid>` 공개 프로필 확인

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-09"로 표기

**커밋 여부**: 예. 메시지: `feat(community): GOOSE-09 notifications + profile dashboard`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부

---

### GOOSE-10 — 기존 교육 영역 통합

**목적**: 커뮤니티 플랫폼과 기존 교육 콘텐츠(52개 라우트) 사이의 진입점을 검토하고, 승인된 범위 내에서만 연결한다. 이 패킷은 대부분의 항목이 "사람 승인 후 진행" 또는 보류(OPEN)로 귀결될 수 있다.

**선행 패킷**: GOOSE-09 완료 보고에서 `/me`, `/members` 정상 동작 확인

**참조 SSOT 문서**: `AGENTS.md` §5(Protected paths, `src/components/layout/SiteHeader.tsx` 포함), §11(Writable paths), §12(Forbidden paths); 이 문서(공통 규약 준수) §2.2(38건 보호), §2.5(52개 라우트 보존)

**수정 허용 경로**: (사람 승인 전) 없음 — 조사·보고만 수행. (사람이 명시적으로 `src/components/layout/SiteHeader.tsx` 수정을 승인한 경우에 한해) `src/components/layout/SiteHeader.tsx`

**수정 금지 경로**: `AGENTS.md` §5의 Atlas Phase 1 보호 경로 전부, `content/**`, `src/content/lessons/**`, `src/content/glossary.ts`, §2.2의 38건, §2.5의 기존 52개 라우트 내부 콘텐츠

**구현 범위**:
1. `feat/community-goose-09`에서 `feat/community-goose-10` 브랜치를 분기한다.
2. `SiteHeader.tsx`는 `AGENTS.md` §5에 "Phase 1 tracked dirty, preserve"로 명시된 보호 경로다. 이 파일을 수정하지 않고 커뮤니티 진입점을 제공할 수 있는지 먼저 확인한다: `/community`, `/materials` 각 페이지 자체 네비게이션(GOOSE-04/06에서 이미 구현됨)으로 충분한지 점검한다.
3. 전역 헤더에 `/community`, `/materials` 링크가 반드시 필요하다고 판단되면, **코드를 수정하지 말고** 다음 내용을 포함한 승인 요청을 사람에게 보고한다: 변경하려는 정확한 diff 미리보기, `AGENTS.md` 보호 규정과의 충돌 사실, 대안(자체 네비게이션 유지) 대비 이점.
4. 사람이 명시적으로 승인하면, 그 승인 근거(승인한 사람·시각·승인 문구)를 커밋 메시지 본문에 기록하고 `SiteHeader.tsx`에 `/community`, `/materials` 링크 2개만 추가한다. 승인이 없으면 이 단계는 수행하지 않는다.
5. 기존 콘텐츠 페이지(`/`, `/resources`, `/curriculum` 등)에 "커뮤니티에 질문하기"/"자료 둘러보기" CTA를 삽입하는 것은 삽입 위치가 CANON에 지정되어 있지 않으므로 **이 패킷에서 구현하지 않는다.** §7 OPEN-05로 남긴다.
6. 빌드타임 정적 검색 인덱스(`src/lib/search-index.ts`)에 커뮤니티/자료 콘텐츠(CSR 전용 데이터)를 포함하지 않는다(정적 인덱스 특성상 통합 불가, 명시적 제외).

**제외 범위**: 검색 통합, 임의 위치 CTA 삽입, `SiteHeader.tsx` 외 다른 보호 경로 수정.

**데이터 계약**: 해당 없음 — 이 패킷은 UI 진입점 연결만 다룬다.

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `SiteHeader.tsx` 수정 필요 여부에 대한 판단 결과가 보고서에 명시되어 있다
- [ ] 사람 승인 없이 `SiteHeader.tsx`가 수정되지 않았다(git diff로 확인)
- [ ] `AGENTS.md` 보호 경로 어디에도 diff가 없다
- [ ] `/community`, `/materials` 자체 네비게이션이 여전히 정상 동작한다(회귀 없음)
- [ ] OPEN-05가 보고서에 기록되어 있다
- [ ] (승인된 경우) `SiteHeader.tsx`에 정확히 2개 링크만 추가되었고 승인 근거가 커밋 메시지에 있다

**실행할 검사**: `npm run verify`, `git diff -- src/components/layout/SiteHeader.tsx`(승인 전에는 반드시 빈 결과)

**수동 확인 항목**: `/community`, `/materials` 페이지에서 홈으로 돌아가는 경로가 있는지 확인(전역 헤더가 아니어도 됨)

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-10"으로 표기. `SiteHeader.tsx` 승인 필요 여부를 "중단 조건 트리거 여부"에 명확히 기재한다.

**커밋 여부**: 조사만 했다면 커밋 없음(보고만). 승인 후 수정했다면 커밋. 메시지: `feat(community): GOOSE-10 header navigation entry points (approved)`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부 + `SiteHeader.tsx` 수정이 필요한데 사람 승인이 없는 경우 즉시 중단(이 조건이 이 패킷의 기본 동작이다)

---

### GOOSE-11 — 통합 QA

**목적**: 52개 기존 라우트 + 신규 라우트 전체에 대한 회귀 확인, Firestore 보안 규칙에 대한 자동화된 역할별 테스트, RBAC 수동 점검을 수행한다.

**선행 패킷**: GOOSE-10 완료 보고 확인(승인/보류 상태 무관하게 진행 가능)

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.5(52개 라우트), §2.7(역할 6종), §2.8(13개 컬렉션), §3(패킷 간 인터페이스 표 전체)

**수정 허용 경로**: `package.json`(devDependency `@firebase/rules-unit-testing` 추가 + `"test:rules"` 스크립트 추가), `tests/security/**`(신규, Firestore rules 단위 테스트), `scripts/community/verify-routes.mjs`(신규)

**수정 금지 경로**: 기능 코드(`src/**`, `functions/**`) 전체 — 이 패킷은 버그를 발견하면 **수정하지 않고 보고만 한다**(수정은 해당 기능을 만든 패킷 재실행 또는 별도 수정 패킷에서 수행).

**구현 범위**:
1. `feat/community-goose-10`에서 `feat/community-goose-11` 브랜치를 분기한다.
2. `package.json`에 devDependency `@firebase/rules-unit-testing`을 추가한다. `"test:rules"` 스크립트를 추가한다(에뮬레이터 대상 Firestore rules 테스트 실행 명령).
3. `tests/security/firestore-rules.test.ts`: 6개 역할(`guest`~`admin`) × 13개 컬렉션의 핵심 read/write 케이스에 대한 허용/거부 매트릭스를 테스트한다. 최소 케이스: 각 컬렉션당 "허용되어야 하는 케이스 1개 이상 + 거부되어야 하는 케이스 1개 이상".
4. `scripts/community/verify-routes.mjs`: `npm run build` 산출물(`out/`)에서 §2.5의 52개 경로 + §2.11의 신규 라우트(공지 제외) 전부가 존재하는지 확인하는 Node 스크립트.
5. RBAC 수동 시나리오 체크리스트를 작성해 실행한다: 6개 역할 각각으로 로그인해 주요 쓰기 액션(게시글 작성, 댓글, 좋아요, 북마크, 자료 등록, 신고, 관리자 액션)을 시도하고 예상대로 허용/거부되는지 기록한다.
6. 접근성 최소 점검(자동화 도구 신규 설치 없이 수동): 신규 폼(`/login`, `/signup`, `/onboarding/profile`, `/community/write`, `/materials/new`)의 label-input 연결, 키보드 포커스 순서, 에러 메시지의 스크린리더 인지 가능 여부를 점검한다.
7. `npm run verify` 및 `npm run test:rules`를 실행해 최종 PASS를 확인한다.

**제외 범위**: 발견한 버그의 직접 수정. 신규 무거운 테스트/접근성 라이브러리(axe-core 등) 설치.

**데이터 계약**: 해당 없음(테스트 전용 패킷). 테스트 코드에서 사용하는 컬렉션/필드/enum은 §2.8/§2.9를 그대로 참조한다.

**완료 조건** (§2.15 공통 완료 조건 포함):
- [ ] `npm run test:rules`가 PASS한다
- [ ] `scripts/community/verify-routes.mjs` 실행 결과, §2.5의 52개 라우트 전부와 §2.11의 신규 라우트(공지 제외) 전부가 `out/`에 존재한다
- [ ] RBAC 수동 시나리오 체크리스트가 6개 역할 전부에 대해 기록되어 있다
- [ ] 접근성 최소 점검 결과가 보고서에 기록되어 있다
- [ ] 이 패킷 실행 중 `src/**`/`functions/**` 어디에도 diff가 없다(수정 금지 경로 위반 없음)
- [ ] 발견된 버그가 있다면 재현 절차와 함께 보고서에 나열되어 있다(수정하지 않음)

**실행할 검사**: `npm run verify`, `npm run test:rules`, `node scripts/community/verify-routes.mjs`

**수동 확인 항목**: RBAC 매트릭스 전체 수기 실행, 접근성 체크리스트 실행

**보고 형식**: §5 공통 보고서 템플릿을 그대로 사용, "Packet: GOOSE-11"로 표기. "발견한 문서-코드 충돌" 항목에 RBAC 매트릭스에서 발견된 모든 불일치를 나열한다.

**커밋 여부**: 예(테스트/스크립트 코드만). 메시지: `test(community): GOOSE-11 rbac + rules test suite`

**배포 여부**: 아니오

**중단 조건**: §6 공통 에스컬레이션 규칙 전부 + RBAC 매트릭스에서 거부되어야 할 케이스가 허용되는(보안 구멍) 경우 즉시 중단하고 최우선 보고

---

### GOOSE-12 — 배포

**목적**: Firestore 규칙/인덱스, Storage 규칙, Cloud Functions, Hosting을 순서대로 배포한다. 각 하위 단계는 실행 직전 개별적으로 사람 승인을 받는다.

**선행 패킷**: GOOSE-11 완료 보고에서 `npm run verify` PASS, `test:rules` PASS, RBAC 매트릭스에 보안 구멍 없음을 확인

**참조 SSOT 문서**: 이 문서(공통 규약 준수) §2.1(브랜치/병합 규칙), `firebase.json`(현재 파일, `.firebaserc` default = `ju0o-ec967`), `AGENTS.md` §12(Deploy는 금지 목록에 있으며 명시적 사람 승인 없이는 수행 불가)

**수정 허용 경로**: 없음(코드/문서 수정 없음, 배포 명령 실행만). 배포 과정에서 문제가 발견되어 코드 수정이 필요하면 이 패킷을 중단하고 해당 기능의 원본 패킷으로 되돌아간다.

**수정 금지 경로**: 전체(이 패킷은 배포 전용이며 어떤 파일도 커밋하지 않는다)

**구현 범위**:
1. `feat/community-goose-11`에서 `feat/community-goose-12` 브랜치를 분기한다(배포 이력 추적용, 커밋은 발생하지 않을 수 있다).
2. 병합 준비 상태를 점검한다: `git log`로 GOOSE-00~11 브랜치가 순서대로 분기되어 있는지 확인, `git diff master...feat/community-goose-11 --stat`으로 최종 변경 범위를 사람에게 보고한다. **병합 자체는 이 패킷이 수행하지 않는다** — 사람이 직접 병합하거나 병합을 명시적으로 지시할 때까지 대기한다.
3. **1단계 승인 요청**: "Firestore 규칙/인덱스, Storage 규칙을 배포해도 되는가?"를 사람에게 묻는다. 승인 시 `firebase deploy --only firestore:rules,firestore:indexes,storage --project ju0o-ec967`를 실행한다.
4. **2단계 승인 요청**: "Cloud Functions를 배포해도 되는가?"를 사람에게 묻는다. 승인 시 `firebase deploy --only functions --project ju0o-ec967`를 실행한다.
5. **3단계 승인 요청**: "프로덕션 빌드 후 Hosting을 배포해도 되는가?"를 사람에게 묻는다. 승인 시 `npm run build && firebase deploy --only hosting --project ju0o-ec967`를 실행한다.
6. 배포 후 스모크 테스트: 프로덕션 URL에서 §2.5의 기존 52개 라우트 중 5개 샘플 + 신규 라우트 중 핵심 5개(`/community`, `/materials`, `/login`, `/me`, `/admin`)가 200으로 응답하는지 확인한다.
7. `/community/posts/*`, `/materials/items/*`, `/members/*` 3개 rewrite가 프로덕션에서 실제로 셸 HTML을 서빙하는지 확인한다(정적 export + Hosting rewrite 조합이 로컬 에뮬레이터에서는 완전히 재현되지 않으므로 이 패킷에서 처음 실제 검증된다).

**제외 범위**: 병합(사람이 수행). 롤백 자동화(문제 발생 시 사람이 `firebase hosting:clone` 등으로 수동 롤백).

**데이터 계약**: 해당 없음 — 배포 전용 패킷.

**완료 조건**:
- [ ] 3단계 배포(rules/indexes/storage, functions, hosting) 각각에 대해 개별 사람 승인 기록이 보고서에 남아 있다
- [ ] `firebase deploy` 3개 명령 각각의 성공 로그가 보고서에 요약되어 있다
- [ ] 스모크 테스트 10개 URL(기존 5 + 신규 5) 전부 200 응답이다
- [ ] 3개 rewrite 규칙이 프로덕션에서 실제로 동작한다(각 1개 샘플 URL로 확인)
- [ ] 배포 중 어떤 코드 파일도 커밋되지 않았다(git status 확인)
- [ ] 배포 실패 시 즉시 중단하고 실패 단계 이후 단계를 진행하지 않았다

**실행할 검사**: 위 3개 `firebase deploy` 명령(각각 사람 승인 후), 배포 후 `curl -I` 또는 브라우저로 스모크 테스트

**수동 확인 항목**: 프로덕션에서 회원가입→승인→게시글 작성→댓글→신고 전체 흐름 1회 실행

**보고 형식**:
```
## Packet: GOOSE-12 배포 완료 보고

- Status: COMPLETE | BLOCKED | HUMAN_APPROVAL_REQUIRED
- 1단계(rules/indexes/storage) 승인자/시각:
- 1단계 배포 결과:
- 2단계(functions) 승인자/시각:
- 2단계 배포 결과:
- 3단계(hosting) 승인자/시각:
- 3단계 배포 결과:
- 스모크 테스트 결과(10개 URL):
- rewrite 3종 동작 확인:
- 발견한 문제:
- 롤백 필요 여부:
- 최종 상태:
```

**커밋 여부**: 아니오(배포 전용, 코드 변경 없음)

**배포 여부**: 예 — 단, §"구현 범위" 3~5단계 각각 실행 직전 사람 승인 필수

**중단 조건**: §6 공통 에스컬레이션 규칙 전부 + 3단계 중 어느 하나라도 사람 승인 없이 실행하려는 시도 자체가 중단 사유 + 배포 명령이 실패하면 다음 단계로 진행하지 않고 즉시 중단

---

## 5. 공통 보고서 템플릿

모든 패킷은 아래 형식으로 완료 보고를 반환한다(GOOSE-12는 §4의 전용 템플릿 사용).

```
## Packet: GOOSE-XX 완료 보고

- Status: COMPLETE | BLOCKED | HUMAN_APPROVAL_REQUIRED
- 브랜치: feat/community-goose-xx (마지막 커밋 해시: )
- 목적 달성 여부:
- 생성 파일 목록:
- 수정 파일 목록:
- 구현 범위 체크리스트 (항목별 PASS/FAIL):
- 완료 조건 체크리스트 (항목별 PASS/FAIL):
- 실행한 검사 결과 (lint/typecheck/test/build/verify 등, 각각 PASS/FAIL + 실패 시 로그 요약):
- 수동 확인 결과:
- 데이터 계약 준수 확인 (CANON Firestore 경로/필드/enum과 대조):
- 기존 52개 라우트 회귀 확인 결과:
- 기존 미커밋 38건 오염 여부 (git diff 결과):
- 발견한 문서-코드 충돌:
- 중단 조건 트리거 여부 (있다면 어떤 항목인지):
- 다음 패킷(GOOSE-XX+1)에 전달할 사항:
- 최종 커밋 해시:
```

---

## 6. 에스컬레이션 규칙 (Goose가 사람에게 물어야 하는 상황)

아래 상황 중 하나라도 발생하면 Goose는 **작업을 즉시 멈추고**, 지금까지의 변경사항을 커밋하지 않은 채(이미 커밋했다면 새 커밋을 추가하지 않은 채) §5 템플릿의 Status를 `HUMAN_APPROVAL_REQUIRED` 또는 `BLOCKED`로 표시해 보고한다.

1. `firestore.rules`/이 문서 §2에 없는 새 컬렉션·필드명·enum 값·역할명·Cloud Functions 이름을 만들어야만 패킷을 완료할 수 있는 경우
2. 해당 패킷의 "데이터 계약"에 없는 필드가 필요해 보이는 경우
3. `npm run verify`가 동일한 원인으로 3회 연속 실패하는 경우
4. 해당 패킷의 "수정 금지 경로"를 건드려야만 완료할 수 있어 보이는 경우
5. §2.2의 38개 경로 중 하나라도 `git diff`에 변화가 감지되는 경우
6. 해당 패킷의 "선행 패킷" 완료 조건이 실제로 충족되지 않은 것으로 확인되는 경우
7. `firebase deploy`가 포함된 어떤 명령이든 실행하기 직전(GOOSE-12에서 정의한 3단계 승인 절차 없이는 실행하지 않는다)
8. `AGENTS.md`의 보호 경로(§5 Protected paths, §11 Writable paths, §12 Forbidden paths)와 해당 패킷의 수정 허용 경로가 겹치는 경우
9. 이 문서의 §7 "미결정 사항(OPEN)" 항목을 구현해야만 패킷을 완료할 수 있는 경우 — 임의로 결정하지 않는다
10. Firestore 보안 규칙 테스트(GOOSE-11)에서 거부되어야 할 요청이 허용되는 것으로 나타나는 경우(보안 구멍) — 최우선 즉시 보고
11. 패킷 범위를 벗어나는 리팩터링·다른 패킷이 이미 만든 파일의 구조 변경이 필요해 보이는 경우(범위 확장 금지)

---

## 7. 미결정 사항 (OPEN)

| ID | 내용 | 영향 패킷 | 임시 처리 |
|---|---|---|---|
| ~~OPEN-01~~ | **해소됨 → [11 결정 로그 D-017](./11-DECISION-LOG.md).** 함수명이 `bootstrapUserAccount`(멱등 콜러블, gen2)로 확정되었다 | GOOSE-03 | **GOOSE-03이 이 함수를 구현한다.** 명세는 D-017 「확정 명세」 절 그대로 따른다. 멱등 분기(기존 문서 존재 시 무쓰기 반환)는 보안 요건이므로 생략 금지. claim 미보유 상태를 `guest`로 취급하는 UI 처리는 자가 치유 경로로 여전히 유지한다. |
| ~~OPEN-02~~ | **해소됨 → [11 D-023](./11-DECISION-LOG.md).** 비밀번호 재설정은 로그인 화면에서 `sendPasswordResetEmail` 호출(이메일 발송)로 V1 구현한다. 별도 라우트·화면을 만들지 않으므로 라우트 정본 변경 없음(FR-A12 Must 충족) | GOOSE-02 | 검증: 10 §3.24 AT-104 |
| ~~OPEN-03~~ | **해소됨 → [11 D-024](./11-DECISION-LOG.md).** 공지 관리는 `/admin/posts`의 `isPinned` 토글 + 커뮤니티 목록 상단 고정으로 구현한다. `/admin/notices` 라우트는 V1에서 만들지 않는다(FR-G09 충족) | GOOSE-08 | `admin_notice` 알림 전용 함수 없음(운영 요구 시 D-024 재검토 조건으로 연동) |
| OPEN-04 | 이미 `active`인 카테고리를 `archived`로 전환하는 콜러블이 CANON §2.10에 없다(`reviewCategoryRequest`는 신규 신청 승인/거절만 다룬다) | GOOSE-07, GOOSE-08 | V1 구현하지 않는다. 카테고리는 한 번 활성화되면 UI상 archived 전환 수단이 없다. |
| OPEN-05 | 기존 교육 콘텐츠 페이지(`/`, `/resources`, `/curriculum` 등)에 커뮤니티 CTA를 삽입할 정확한 위치가 CANON에 지정되어 있지 않다 | GOOSE-10 | 삽입하지 않는다. 사람이 위치를 지정하면 별도 패킷으로 추가한다. |

---

문서 끝.
