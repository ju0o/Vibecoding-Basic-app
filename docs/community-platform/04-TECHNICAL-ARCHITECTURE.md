# 04. 기술 아키텍처

이 문서는 `CANON.md`의 결정(D-001~D-010, 역할·경로·enum·라우트·Functions 정본)을 전제로 작성한다. 이름·경로·enum은 CANON과 한 글자도 다르지 않게 사용한다. "현재:"는 코드에서 확인된 사실, "목표:"는 이번 전환에서 채택하는 설계다.

---

## 1. 현재 기술 구조

| 항목 | 현재 |
|---|---|
| 프레임워크 | Next.js 16.2.10 (App Router), React 19.2.7, TypeScript 6.0.3 |
| 렌더링 모드 | `next.config.ts`: `output: "export"` (정적 내보내기), `images.unoptimized: true`, `staticPageGenerationTimeout: 180` — 서버 런타임 없음, 빌드 시점에 전량 HTML 생성 |
| 스타일 | Tailwind CSS 4.3.2 (`@tailwindcss/postcss`) |
| 린트/포맷 | Biome 2.5.2 — `npm run lint` = `biome check .` |
| 테스트 | Vitest 4.1.9 — `npm run test` = `vitest run` |
| 검증 파이프라인 | `npm run verify` = `lint && typecheck && test && build` (package.json scripts) |
| 빌드 전처리 | `prebuild` = `node scripts/generate-sitemap.mjs` — `src/content/lessons/markdown/*.md` 파일명을 슬러그로 읽어 `public/sitemap.xml` 생성. 정적 경로 8개 + 레슨 슬러그만 포함, 커뮤니티 URL은 포함하지 않음 |
| 배포 대상 | Firebase Hosting 단독. `firebase.json`: `public: "out"`, `cleanUrls: true`, `trailingSlash: false`, `headers`(sitemap.xml·robots.txt에 `Cache-Control: public,max-age=3600`) |
| Firebase 프로젝트 | `.firebaserc` → `default: "ju0o-ec967"` |
| Firebase SDK | **package.json dependencies/devDependencies에 `firebase` 없음. Auth·Firestore·Firebase Storage: 이미지 업로드·저장·변환)                   │ │
│  └───────────────────────────────────────────────────────────────┘  │
└───────────────────────────┬───────────────────────────────────────┘
                             │ 신뢰가 필요한 조작만 callable 호출
                             ▼
┌───────────────────────────────────────────────────────────────────┐
│ Cloud Functions (gen2, Node 20, region asia-northeast3)              │
│  · callable: submitMembershipApplication, reviewMembershipApplication,│
│    setUserRole, suspendUser/restoreUser, setMaterialStatus,          │
│    reviewCategoryRequest, resolveReport, moderatePost,               │
│    deleteCommentByModerator                                          │
│  · Firestore 트리거: onReactionWritten, onCommentWritten,            │
│    onMembershipReviewed, onMaterialStatusChanged, onReportResolved   │
└───────────────────────────┬───────────────────────────────────────┘
                             ▼
┌───────────────────────────────────────────────────────────────────┐
│ Firebase 백엔드                                                       │
│  · Firestore (Native, asia-northeast3) — 정본 데이터                 │
│  · Firebase Storage: 이미지 업로드·저장·변환` 경로 검증) | — | 본인 업로드 경로 |

---

## 8. 권한 검증 3중 구조

| 층 | 위치 | 막는 공격 | 못 막는 것 |
|---|---|---|---|
| UI 가드 | `RoleGate`, 라우트별 조건부 렌더(클라이언트) | 일반 사용자의 실수 클릭, 권한 없는 메뉴/버튼 노출 | devtools 콘솔에서의 직접 SDK 호출, 네트워크 요청 위조 — **UI는 신뢰 경계가 아니다** |
| Security Rules(Firestore/Storage) | `firestore.rules`, `storage.rules` | 위조된 직접 쓰기, 타 소유자 데이터 접근, `likeCount` 등 서버 전용 필드 변조, 미승인 컬렉션 쓰기 | 여러 문서에 걸친 트랜잭션적 일관성, 승인 워크플로처럼 다단계 판단이 필요한 로직, `request.auth.token.role`이 최신이 아닐 때(claim 캐시 지연) |
| Cloud Function 내부 검사 | 모든 callable 진입부(CANON H절 순서: ①`request.auth` 존재 → ②`role` 검사 → ③`users/{uid}.status == active` 검사 → ④`adminLogs` 기록) | claim이 stale한 상태의 오남용, 다단계 승인/제재 로직, 감사 로그 누락 | Functions 배포 자체의 오류, 리전/네트워크 장애, region 밖에서의 직접 REST 호출(별도 App Check 없이는 완전 차단 불가 — OPEN-01) |

세 층은 서로 다른 공격면을 막으므로 **어느 하나도 생략할 수 없다.** UI 가드는 사용성, Rules는 1차 데이터 방어선, Functions 내부 검사는 신뢰 판단의 최종 authority다.

---

## 9. 알림 구조 (CANON D-008)

**흐름**: 트리거 함수(`onCommentWritten`, `onMembershipReviewed`, `onMaterialStatusChanged`, `onReportResolved`) → `notifications/{uid}/items/{notificationId}` 서브컬렉션에 문서 생성 → 클라이언트가 `onSnapshot`으로 실시간 구독.

**목표 구독 쿼리**(고정값):
```ts
query(
  collection(db, "notifications", uid, "items"),
  orderBy("createdAt", "desc"),
  limit(50),
)
```

**비용 상한 규칙**: 구독 쿼리의 `limit` 값은 **50으로 고정**한다. 이 이상 과거 알림은 실시간 구독 대상에서 제외하고, `/me/notifications` 전체 목록 페이지에서만 페이지네이션(`startAfter`)으로 추가 조회한다.

**읽지 않은 개수 계산**: 별도의 `where("readAt", "==", null)` 쿼리(복합 인덱스 추가 필요)를 만들지 않는다. 대신 **위 50건 구독 스냅샷 안에서 클라이언트가 `readAt == null`인 문서 수를 세어** 배지에 표시한다. 이유: 실시간 리스너를 2개(전체 목록 + 미읽음 카운트) 유지하면 읽기 비용이 2배가 되므로, 하나의 리스너에서 파생시켜 상한을 50건으로 묶는다. 51번째 이후의 오래된 미읽음은 배지에 반영되지 않는다(허용된 트레이드오프, §18에 리스크로 기록).

**클라이언트 쓰기 범위**: 자기 것 읽기 + `readAt` 필드 **단일 갱신**만 허용(Rules). 생성·삭제는 트리거 전용 → 위조 불가.

---

## 10. 검색 구조

- **기존 정적 인덱스는 변경하지 않는다.** `src/lib/search-index.ts`, `src/lib/search.ts`는 그대로 유지 — 레슨/용어집/리소스 검색은 이번 전환의 영향을 받지 않는다.
- **커뮤니티 검색 V1은 Firestore 쿼리로 제한한다**: 카테고리(`category ==`), 태그(`tags array-contains`), 정렬(`createdAt desc`)만 지원. **전문(全文) 검색은 비목표(D-010, Algolia 등 검색 엔진 도입 안 함).**
- **통합 검색 UI 결합 규칙**(목표): 검색창 결과는 두 섹션으로 분리해 보여준다.
  1. **정적 결과 우선** — 기존 `searchCatalog()` 결과(레슨/용어집/리소스)를 상단에 그대로 표시.
  2. **커뮤니티 결과 별도 섹션** — 하단에 "커뮤니티 결과"로 구분해 Firestore 쿼리 결과(게시글/자료 제목 매칭)를 표시.
  두 소스는 병합·재정렬하지 않는다. 정적 인덱스는 빌드타임에 이미 로드되어 즉시 응답하지만, 커뮤니티 결과는 비동기 Firestore 조회이므로 응답 속도가 다르기 때문이다.

---

## 11. 정적 콘텐츠 ↔ 동적 콘텐츠 결합 방식

**패턴**: 서버 컴포넌트(빌드타임 SSG)에 클라이언트 컴포넌트 "아일랜드"를 리프 노드로 삽입한다.

예: 자료 상세 셸(`src/app/materials/item/page.tsx`, 서버 컴포넌트)이 `<MaterialCommentThread targetType="material" targetId={materialId} />`(`"use client"`)를 렌더링.

**컴포넌트 경계**
- 서버 컴포넌트: 정적 셸의 레이아웃, 고정 텍스트, SEO 메타데이터만 담당. Firestore를 참조하지 않는다.
- 클라이언트 아일랜드: 마운트 후 `useEffect`에서 Firestore 구독을 시작. 이 코드베이스에 이미 확립된 패턴(`LearningStateProvider`의 `ready` 플래그)을 그대로 따른다 — 초기 렌더는 로딩 스켈레톤만 출력하고, 데이터 로드 완료 후에만 실제 콘텐츠로 교체한다.

**hydration 영향**: 서버가 생성한 최초 HTML에는 Firestore 데이터가 전혀 없다(스켈레톤뿐). 클라이언트 최초 렌더도 동일하게 스켈레톤을 출력하므로 **서버-클라이언트 첫 렌더가 항상 일치** → hydration mismatch가 발생하지 않는다. 실제 데이터 교체는 하이드레이션이 끝난 뒤 `useEffect` 내부에서만 일어난다. `suppressHydrationWarning`은 `<html>` 루트에서만 사용 중인 기존 관례를 유지하고, 커뮤니티 아일랜드에는 별도로 필요하지 않다(스켈레톤이 서버/클라이언트 동일하므로).

---

## 12. Firestore 인덱스 계획

**전제(목표 필드 추가)**: `reactions`, `bookmarks` 문서는 결정론적 문서 ID(D-006/D-007)만으로는 "내 좋아요"/"내 북마크" 목록을 정렬 조회할 수 없으므로, 각 문서에 소유자 식별 필드 `uid`(Auth `uid` 값)를 추가한다. 이는 CANON D절의 경로·ID 설계를 변경하지 않고 필드만 보강하는 것이다.

| # | collectionGroup | 필드 순서 | 정렬 방향 | 사용 쿼리 |
|---|---|---|---|---|
| 1 | posts | status | ASC, createdAt DESC | `/community` 전체 최신글 피드 |
| 2 | posts | category, status | ASC, ASC, createdAt DESC | `/community?category=slug` |
| 3 | posts | authorUid | ASC, createdAt DESC | `/me/posts` |
| 4 | materials | status | ASC, createdAt DESC | `/admin/materials` 검수 대기 목록(카테고리 무관) |
| 5 | materials | category, status | ASC, ASC, createdAt DESC | `/materials` 카테고리 필터 |
| 6 | materials | tags(array-contains), status | ASC, createdAt DESC | `/materials` 태그 필터 |
| 7 | materials | authorUid | ASC, createdAt DESC | 내가 등록한 자료 관리(`/materials/edit` 진입 전 목록) |
| 8 | comments | targetType, targetId | ASC, ASC, createdAt ASC | 게시글/자료 상세의 댓글 목록(오래된순) |
| 9 | comments | authorUid | ASC, createdAt DESC | `/me/comments` |
| 10 | reactions | uid | ASC, createdAt DESC | `/me/likes` |
| 11 | bookmarks | uid | ASC, createdAt DESC | `/me/bookmarks` |
| 12 | membershipApplications | status | ASC, createdAt DESC | `/admin/members` 승인 대기 목록 |
| 13 | categoryRequests | status | ASC, createdAt DESC | `/admin/categories` |
| 14 | reports | status | ASC, createdAt DESC | `/admin/reports` |

`notifications/{uid}/items`는 §9의 단일 쿼리(`orderBy(createdAt desc) limit(50)`)만 사용하므로 별도 복합 인덱스가 필요 없다(단일 필드 정렬은 Firestore가 자동 생성).

**`firestore.indexes.json` 초안**:
```json
{
  "indexes": [
    { "collectionGroup": "posts", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "posts", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "category", "order": "ASCENDING" },
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "posts", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "authorUid", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "materials", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "materials", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "category", "order": "ASCENDING" },
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "materials", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "tags", "arrayConfig": "CONTAINS" },
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "materials", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "authorUid", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "comments", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "targetType", "order": "ASCENDING" },
      { "fieldPath": "targetId", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "ASCENDING" }
    ]},
    { "collectionGroup": "comments", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "authorUid", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "reactions", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "uid", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "bookmarks", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "uid", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "membershipApplications", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "categoryRequests", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]},
    { "collectionGroup": "reports", "queryScope": "COLLECTION", "fields": [
      { "fieldPath": "status", "order": "ASCENDING" },
      { "fieldPath": "createdAt", "order": "DESCENDING" }
    ]}
  ],
  "fieldOverrides": []
}
```

---

## 13. 캐싱

**Hosting 헤더 정책**(§4 firebase.json에 반영됨)

| 대상 | Cache-Control | 이유 |
|---|---|---|
| `/_next/static/**` | `public,max-age=31536000,immutable` | 파일명에 콘텐츠 해시 포함, 영구 캐시 안전 |
| `**/*.html`(정적 셸 포함) | `public,max-age=0,must-revalidate` | 재배포 시 즉시 최신 셸 반영 필요. 셸 자체는 데이터를 담지 않으므로 캐시 미스 비용이 작음 |
| `/sitemap.xml`, `/robots.txt` | `public,max-age=3600`(기존 유지) | 변경 없음 |

**Firestore 클라이언트 캐시**: `persistentLocalCache`를 **사용한다**(목표, 확정).
```ts
import { initializeFirestore, persistentLocalCache, persistentSingleTabManager } from "firebase/firestore"

initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }),
})
```
- 이유: 정적 export + CSR 구조에서 페이지 이동(=하이드레이션 재시작에 가까운 클라이언트 라우팅)마다 동일 데이터를 재구독하는 비용이 크다. IndexedDB 기반 오프라인 캐시로 읽기 비용과 초기 렌더 지연을 줄인다.
- `persistentSingleTabManager`로 확정한다(멀티탭 동기화 미지원). 이유: 멀티탭 매니저는 구현 복잡도가 높고 V1 사용자 다수가 단일 탭 사용을 전제로 하는 커뮤니티 서비스이므로 비용 대비 이득이 낮다. 여러 탭을 열면 탭별로 독립 캐시를 갖는다(데이터 자체는 `onSnapshot`으로 각 탭이 서버와 동기화되므로 최신성에는 문제없음, 로컬 캐시 중복만 발생).

---

## 14. 오류 처리

Firebase 오류 코드 → 한국어 사용자 메시지 매핑(목표, 최소 12개 이상):

| 오류 코드 | 한국어 메시지 |
|---|---|
| `auth/email-already-in-use` | 이미 가입된 이메일입니다. 로그인을 시도하거나 비밀번호를 재설정하세요. |
| `auth/invalid-credential` | 이메일 또는 비밀번호가 올바르지 않습니다. |
| `auth/user-not-found` | 가입되지 않은 이메일입니다. |
| `auth/weak-password` | 비밀번호는 6자 이상이어야 합니다. |
| `auth/too-many-requests` | 요청이 너무 많습니다. 잠시 후 다시 시도하세요. |
| `auth/network-request-failed` | 네트워크 연결을 확인해주세요. |
| `auth/popup-closed-by-user` | 로그인 창이 닫혔습니다. 다시 시도해주세요. |
| `auth/account-exists-with-different-credential` | 다른 로그인 방식으로 이미 가입된 이메일입니다. |
| `auth/requires-recent-login` | 보안을 위해 다시 로그인해주세요. |
| `permission-denied` | 이 작업을 수행할 권한이 없습니다. |
| `unavailable` | 서버에 일시적으로 연결할 수 없습니다. 잠시 후 다시 시도하세요. |
| `not-found` | 요청한 데이터를 찾을 수 없습니다. |
| `already-exists` | 이미 존재하는 데이터입니다. |
| `resource-exhausted` | 요청 한도를 초과했습니다. 잠시 후 다시 시도하세요. |
| `unauthenticated` | 로그인이 필요한 기능입니다. |
| `failed-precondition` | 현재 상태에서는 처리할 수 없는 요청입니다. |
| `deadline-exceeded` | 요청 처리 시간이 초과되었습니다. |
| `storage/unauthorized` | 파일 업로드 권한이 없습니다. |
| `storage/quota-exceeded` | 저장 공간이 부족합니다. |
| `storage/canceled` | 업로드가 취소되었습니다. |

매핑 함수는 `src/lib/firebase/errors.ts`(목표 신규 파일)에 `mapFirebaseErrorToMessage(code: string): string` 형태로 두고, 위 목록에 없는 코드는 `"알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도하세요."`로 폴백한다.

---

## 15. 관측성

**V1에서 도입하는 것**
- 클라이언트 콘솔 로그 규칙: 에러만 `console.error("[community:<영역>]", error)` 형태로 접두어를 붙여 남긴다(예: `[community:auth]`, `[community:post]`).
- Cloud Functions 로깅: `functions.logger.info`/`.error`에 구조화 필드를 고정한다 — `{ fn: "<함수명>", uid, action, targetId, result: "ok"|"denied"|"error", durationMs }`. `adminLogs` 컬렉션 기록(CANON H절)과는 별도로, Cloud Logging 상의 디버깅용 로그다.

**V1에서 도입하지 않는 것**
- Cloud Monitoring 대시보드/알림 정책
- Sentry 등 외부 에러 추적 SaaS
- Firebase Analytics(GA4) 이벤트 계측
- Performance Monitoring
- 분산 트레이싱(OpenTelemetry 등)

---

## 16. 배포 구조와 환경

**환경 3종**

| 환경 | 구성 | Firebase 프로젝트 |
|---|---|---|
| dev | 로컬 머신 + Firebase Emulator Suite(§17). 클라우드 자원 접근 없음 | 없음(에뮬레이터가 대체) |
| staging | Firebase Hosting **프리뷰 채널**(`firebase hosting:channel:deploy staging`)로 배포. Firestore/Auth/Storage/Functions는 prod와 **동일 프로젝트를 공유** | `ju0o-ec967`(prod와 동일) |
| prod | Firebase Hosting 라이브 채널(`firebase deploy`) | `ju0o-ec967` |

**Firebase 프로젝트는 1개(`ju0o-ec967`)만 사용한다.** 사유: CANON D-001에서 Option C를 기각한 논리("1인 운영에 과부하")를 프로젝트 운영에도 동일 적용한다 — 프로젝트를 dev/staging/prod로 나누면 Security Rules·Functions·인덱스를 3벌 동기화해야 하는 운영 부담이 1인 체계에 맞지 않는다. Hosting 프리뷰 채널은 별도 프로젝트 없이 URL만 분리해 스테이징 역할을 수행한다. **staging이 prod와 백엔드(Firestore/Auth/Storage)를 공유한다는 점은 §18에 리스크로 기록한다.**

**배포 명령 시퀀스**(정확히 이 순서):
```
npm run verify
next build
firebase deploy --only hosting,firestore:rules,firestore:indexes
```
`npm run verify` 자체가 내부적으로 `build`를 포함하지만(lint→typecheck→test→build), 이는 **검증 게이트**로서의 빌드다. 배포 직전에 `next build`를 한 번 더 실행해 **배포 아티팩트(`out/`)를 실제 배포 시점 기준으로 새로 생성**한다 — verify 통과와 deploy 실행 사이에 시간差나 별도 단계가 끼어들 경우 `out/`이 stale해지는 것을 방지하기 위함이다.

---

## 17. 에뮬레이터 설정

`firebase.json`의 `emulators` 블록(§4 전문에 포함됨, 재게시):

```json
{
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "storage": { "port": 9199 },
    "functions": { "port": 5001 },
    "hosting": { "port": 5000 },
    "ui": { "enabled": true, "port": 4000 },
    "singleProject": true
  }
}
```

| 서비스 | 포트 |
|---|---|
| Auth | 9099 |
| Firestore | 8080 |
| Storage | 9199 |
| Functions | 5001 |
| Hosting | 5000 |
| Emulator UI | 4000 |

포트는 Firebase CLI 기본값을 그대로 채택한다(로컬 개발자 간 충돌 최소화, 문서화된 표준값).

---

## 18. 기술 리스크와 완화책

| 리스크 | 영향 | 완화책 |
|---|---|---|
| staging이 prod와 Firestore/Auth/Storage를 공유(§16) | staging 테스트 데이터가 실 사용자에게 노출되거나 실 데이터를 오염시킬 수 있음 | staging 전용 테스트 계정만 사용, 테스트 게시글에는 `category: "free"` 등 식별 가능한 접두어 규칙 적용, 정기적으로 정리. 완전한 격리가 필요해지면 OPEN-02로 재검토 |
| Firebase config 클라이언트 노출(§6) | 악의적 사용자가 config를 이용해 직접 SDK 호출 시도 가능 | Security Rules + Functions 내부 검사(§8)가 실제 방어선. config 노출 자체는 표준 설계이므로 리스크가 아니라 전제로 취급하되, 오해 방지를 위해 문서화 |
| custom claim 갱신 후 클라이언트 토큰 지연 | `setUserRole` 직후 클라이언트가 구 role로 잠시 동작 | 클라이언트가 `getIdToken(true)`로 강제 리프레시(CANON D-003), Functions 내부 검사가 최종 방어선이므로 UI 지연은 사용자 경험 문제일 뿐 보안 문제 아님 |
| `likeCount`/`commentCount` 트리거 레이스(동시 다발 반응) | 짧은 시간 내 카운터가 일시적으로 부정확할 수 있음 | `FieldValue.increment()`는 원자적 연산이므로 최종 값은 항상 정확. 화면 표시가 잠깐 지연될 뿐 |
| 알림 미읽음 카운트가 50건 상한 초과분을 반영 못함(§9) | 오래된 미읽음이 배지에서 누락 | `/me/notifications` 전체 목록에서는 페이지네이션으로 확인 가능. 배지는 "최근" 미읽음 지표로 문서에 명시 |
| `persistentLocalCache` 멀티탭 미지원(§13) | 여러 탭에서 로컬 캐시가 중복 생성 | 데이터 정확성에는 영향 없음(각 탭이 서버와 개별 동기화). 저장 공간 낭비만 존재, 브라우저 IndexedDB 용량 내에서 무해 |
| `firestore.indexes.json` 인덱스 14개 관리 부담 | 쿼리 추가 시 인덱스 누락으로 런타임 오류 발생 가능 | Firestore는 인덱스 누락 시 콘솔 링크가 포함된 오류를 던짐 — 오류 로그(§15)에서 즉시 식별 가능. 새 쿼리 추가 시 본 문서 §12 갱신을 배포 체크리스트에 포함 |
| 정적 셸 rewrite와 Next.js 클라이언트 라우팅 충돌 가능성 | `next/link`로 셸 내부 이동 시 `router.push`가 아닌 `window.location` 필요할 수 있음 | 상세 페이지 간 이동은 전체 페이지 리로드(`<a>` 또는 `window.location.assign`)로 처리해 rewrite가 항상 적용되도록 함(구현 세부는 Goose 재량이 아니라 별도 프런트엔드 설계 문서에서 확정) |

---

## 19. 미결정 사항

- **OPEN-01**: Cloud Functions callable에 대한 App Check 미도입 상태에서, 유효한 Firebase Auth 토큰만 있으면 region 밖에서의 직접 REST 호출을 완전히 차단할 수 없음. Phase 7 이후 App Check 도입 시점을 언제로 할지 미정.
- **OPEN-02**: staging이 prod와 백엔드를 공유하는 현재 설계(§16)를 완전 격리(별도 프로젝트 또는 별도 Firestore 네임스페이스)로 전환할 필요성과 시점.
- **OPEN-03**: Storage 업로드 이미지의 최대 파일 크기·허용 확장자 제한 값(현재 문서는 정하지 않음, `storage.rules`에서 확정 필요).
- **OPEN-04**: Cloud Functions 개별 함수의 메모리/타임아웃/최대 동시성(concurrency) 설정값.
- **OPEN-05**: Firestore 백업(정기 export) 정책과 보관 주기.
- **OPEN-06**: callable Functions에 대한 요청 빈도 제한(rate limiting) 설계 — 현재는 Firebase 기본 할당량에만 의존.
- **OPEN-07**: `materials.tags` 필드의 최대 개수 제한(array-contains 인덱스 비용과 직결).
- **OPEN-08**: 커뮤니티 신규 라우트가 `scripts/generate-sitemap.mjs`의 `sitemap.xml`에 포함되어야 하는지 여부(현재 스크립트는 정적 레슨 슬러그만 포함, UGC 상세 URL은 검색엔진 노출 목표가 아니므로 제외가 기본이나 카테고리 목록 페이지(`/community`, `/materials`)는 포함 여부 미정).
