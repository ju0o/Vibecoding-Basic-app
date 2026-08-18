# 11 · 결정 로그 (Decision Log)

> **문서 지위**: 아키텍처·제품 결정의 근거 기록. 결정 자체의 정본은 각 SSOT 문서이고, 이 문서는 **왜 그렇게 결정했고 무엇을 기각했는지**를 보존한다.
> **결정 주체**: Opus (Chief Product Architect) · **기준일**: 2026-08-07 · **기준 HEAD**: `272b2b175efefd4658c125788fa2cde3712a67fd`
> **관련 문서**: [01 PRD](./01-PRODUCT-PRD.md) · [04 기술 아키텍처](./04-TECHNICAL-ARCHITECTURE.md) · [05 데이터 모델](./05-DATA-MODEL-SSOT.md) · [06 보안·운영](./06-SECURITY-AND-MODERATION-SSOT.md)

---

## D-001 · 런타임: 정적 export 유지 + Firebase 클라이언트 SDK + callable Functions

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | 확정 |
| **결정** | `next.config.ts`의 `output: "export"`를 유지한다. 커뮤니티 기능은 클라이언트 렌더링으로 Firebase JS SDK를 통해 Firestore/Auth/Storage에 직접 접근하고, 신뢰가 필요한 조작만 callable Cloud Functions(gen2, Node 20, `asia-northeast3`)로 처리한다. |

**배경**
현재 사이트는 52개 라우트를 전부 정적 생성해 Firebase Hosting(`out` 디렉터리)으로 배포한다. Firebase는 Hosting만 쓰고 있고 SDK조차 설치되어 있지 않다. 커뮤니티 기능은 런타임 데이터를 요구하므로 렌더링 전략을 결정해야 했다.

**선택지**

| | Option A — 정적 export + 클라이언트 SDK | Option B — Firebase App Hosting / SSR | Option C — 공개 영역 정적 + 커뮤니티만 별도 런타임 |
|---|---|---|---|
| 기존 코드 변경 | 없음 (추가만) | `output: "export"` 제거, 배포 파이프라인 전면 재작성 | 배포 대상 2개로 분리 |
| 인증 세션 | 클라이언트 SDK 토큰 | 서버 세션 쿠키 가능 | 도메인·세션 경계 문제 발생 |
| 관리자 권한 안전성 | Rules + Functions로 확보 | 서버에서 검증 가능 | A와 동일 |
| SEO(커뮤니티 UGC) | 없음 | 있음 | 있음 |
| 비용 | Hosting 무료 티어 유지 | 컨테이너 상시 과금 | 두 배 |
| 운영 복잡도 | 낮음 | 중간 | 높음 |
| Goose 구현 난이도 | 낮음 | 높음 | 매우 높음 |

**채택 이유 (Option A)**
1. 기존 52개 라우트의 정적 생성·URL·성능 자산을 **한 줄도 건드리지 않고** 커뮤니티를 추가할 수 있다. [01 PRD](./01-PRODUCT-PRD.md) 원칙 6(기존 것을 부수지 않는다)의 직접적 귀결이다.
2. 커뮤니티 UGC의 SEO 가치는 이 제품에서 낮다. 검색 유입의 자산은 강의·용어·Atlas이고 그것은 이미 정적 생성된다.
3. 운영자가 1인이다. 서버 런타임이 생기면 장애 대응·스케일링·비용 감시라는 운영 축이 새로 생긴다.
4. Firebase Security Rules는 클라이언트 직접 접근을 전제로 설계된 메커니즘이다. Rules + callable Functions 조합으로 서버 없이도 권한 모델을 완결할 수 있다.

**기각 이유**
- **Option B**: 얻는 것(UGC SEO)에 비해 잃는 것(무료 정적 호스팅, 배포 단순성, 기존 파이프라인)이 크다. 커뮤니티가 충분히 커진 뒤 재검토할 사안이다.
- **Option C**: 두 개의 배포 대상, 두 개의 도메인 또는 경로 프록시, 두 벌의 세션 관리가 생긴다. 1인 운영 제약에 정면으로 반한다.

**영향** — [04 기술 아키텍처](./04-TECHNICAL-ARCHITECTURE.md) 전체, [08 로드맵](./08-IMPLEMENTATION-ROADMAP.md) Phase 1, 모든 Goose 패킷.

**재검토 조건** — (a) 커뮤니티 콘텐츠의 검색 유입이 전체의 20%를 넘을 때, (b) Firestore 클라이언트 읽기 비용이 월 무료 한도를 상시 초과할 때, (c) 커뮤니티 콘텐츠에 OG 미리보기가 사업적으로 필요해질 때.

---

## D-002 · 정적 export에서 동적 상세 페이지: 정적 셸 + Hosting rewrites

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | 확정 |
| **결정** | `[id]` 동적 세그먼트를 쓰지 않는다. 파라미터 없는 정적 셸 라우트를 만들고, `firebase.json`의 `rewrites`로 `/community/posts/*` → `/community/post.html` 형태로 매핑한다. 클라이언트가 `location.pathname`을 파싱해 문서 ID를 얻는다. |

**배경**
`output: "export"` 모드에서 `[postId]` 같은 동적 세그먼트는 `generateStaticParams()`가 반환한 값만큼만 HTML을 생성한다. 런타임에 생성되는 Firestore 문서 ID는 빌드 시점에 알 수 없으므로 이 방식으로는 상세 페이지를 만들 수 없다.

**선택지**
1. **쿼리 파라미터** — `/community/post?id=xxx`. 구현이 가장 단순하지만 URL이 지저분하고 공유·북마크 시 인상이 나쁘다.
2. **정적 셸 + Hosting rewrites** — 깔끔한 URL(`/community/posts/abc123`)을 유지하면서 정적 호스팅으로 서빙. Firebase Hosting의 문서화된 rewrite 기능을 사용.
3. **빌드 시 전체 문서 프리렌더** — 게시글이 늘어날 때마다 재배포해야 하므로 커뮤니티에 부적합.
4. **`output: "export"` 포기** — D-001에서 이미 기각.

**채택 이유 (2번)**
- URL이 사람이 읽을 수 있고 공유 가능하다. 커뮤니티에서 링크 공유는 핵심 행동이다.
- Hosting rewrite는 설정 파일 3줄이면 되고 추가 런타임이 없다.
- 셸 HTML은 캐시 가능하며, 실제 데이터만 클라이언트가 가져오므로 초기 응답이 빠르다.

**기각 이유**
- 1번: 기능적으로는 동작하지만 커뮤니티 URL의 품질이 제품 인상에 직접 영향을 준다.
- 3번: 게시글 1건 추가마다 빌드·배포가 필요해 커뮤니티의 성립 자체가 불가능하다.

**확정 매핑**

| 공개 URL | rewrite 대상 | 셸 라우트 파일 |
|---|---|---|
| `/community/posts/*` | `/community/post.html` | `src/app/community/post/page.tsx` |
| `/materials/items/*` | `/materials/item.html` | `src/app/materials/item/page.tsx` |
| `/members/*` | `/members.html` | `src/app/members/page.tsx` |

**영향** — [02 정보 구조](./02-INFORMATION-ARCHITECTURE.md) 5절, [04 기술 아키텍처](./04-TECHNICAL-ARCHITECTURE.md) 4절, Goose 패킷 GOOSE-01·GOOSE-04.

**리스크** — rewrite 규칙이 기존 52개 라우트와 충돌하면 기존 페이지가 셸로 덮인다. rewrite source 경로를 신규 네임스페이스(`/community/`, `/materials/`, `/members/`)로만 한정해 회피한다. Phase 4 회귀 테스트에서 반드시 검증.

**재검토 조건** — Next.js가 정적 export에서 클라이언트 동적 세그먼트를 공식 지원하게 될 때.

---

## D-003 · 역할 저장: custom claims를 권위로, Firestore 문서는 미러

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | 확정 |
| **결정** | 권위(authority)는 Firebase Auth **custom claim** `role`이다. Security Rules는 `request.auth.token.role`만 신뢰한다. `users/{uid}.role`은 목록·필터 조회용 미러이며 **Cloud Functions만 쓰기 가능**하고 클라이언트 쓰기는 Rules에서 전면 차단한다. |

**선택지**

| | Firestore 문서만 | custom claims만 | **혼합 (채택)** |
|---|---|---|---|
| Rules에서 검사 비용 | 매 요청 `get()` 호출 (읽기 과금 + 지연) | 토큰에 내장, 비용 0 | 토큰 검사만 → 비용 0 |
| 관리자 목록 조회 | 가능 (`where role == 'admin'`) | 불가 (Admin SDK 순회 필요) | 가능 |
| 권한 전파 지연 | 즉시 | 최대 1시간 (토큰 만료까지) | 최대 1시간 (강제 갱신으로 완화) |
| 위조 위험 | 문서 쓰기 규칙이 뚫리면 즉시 권한 상승 | 없음 (서버만 발급) | 없음 (Rules가 claim만 신뢰) |

**채택 이유**
- Rules에서 `get(/databases/$(database)/documents/users/$(uid))`를 매번 호출하면 **모든 읽기·쓰기마다 문서 읽기가 1회씩 추가로 과금**되고 지연도 늘어난다. 커뮤니티 목록처럼 문서를 다수 읽는 화면에서 이 비용이 곱해진다.
- 반대로 claims만 쓰면 "승인 대기 회원 목록"이나 "관리자 목록" 같은 운영 화면을 만들 수 없다.
- 혼합 방식은 **보안 판단은 claim, 조회는 문서**로 역할을 나눠 두 문제를 동시에 푼다. 미러 문서의 쓰기를 Functions로 잠그면 두 값이 어긋날 경로가 없다.

**기각 이유**
- Firestore 문서만: 비용·지연 문제에 더해, 권한 판단의 근거가 Rules로 보호되는 문서라는 순환 구조가 생긴다.
- claims만: 운영 화면 구축 불가.

**전파 지연 대응 (필수 구현 사항)**
`reviewMembershipApplication` / `setUserRole` callable이 성공 응답을 반환한 직후, 클라이언트는 반드시 `getIdToken(/* forceRefresh */ true)`를 호출한다. 이 호출이 빠지면 승인 직후 회원이 여전히 쓰기에 실패하는 버그가 발생하며, 이는 [10 수용 테스트](./10-ACCEPTANCE-TEST-PLAN.md)의 필수 케이스다.

**영향** — [06 보안·운영](./06-SECURITY-AND-MODERATION-SSOT.md) 3절, [05 데이터 모델](./05-DATA-MODEL-SSOT.md) User 엔터티, Goose 패킷 GOOSE-03.

**재검토 조건** — Firebase가 claim 즉시 무효화 기능을 제공할 때.

---

## D-004 · 게시글: 단일 `posts` 컬렉션 + `category` 필드

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | 확정 |
| **결정** | 8개 게시판을 별도 컬렉션으로 나누지 않고, 단일 `posts` 컬렉션에 `category` 필드를 둔다. |

**선택지**
1. 게시판별 컬렉션 (`freePosts`, `questionPosts`, …)
2. **단일 `posts` + `category` 필드 (채택)**
3. `boards/{boardId}/posts/{postId}` 서브컬렉션

**채택 이유**
- Security Rules를 **한 벌만** 쓰면 된다. 게시판이 8개면 1번은 Rules 블록이 8개가 되고, 카테고리를 추가할 때마다 Rules 배포가 필요해진다.
- 카테고리는 스키마가 아니라 **운영 데이터**다. [07 콘텐츠 거버넌스](./07-CONTENT-GOVERNANCE-SSOT.md)에서 카테고리 신설 신청·승인·보관을 다루는데, 이는 컬렉션이 아니라 문서로 관리되어야 가능하다.
- "커뮤니티 전체 최신글" 같은 교차 피드가 단일 쿼리로 해결된다. 1번·3번은 8개 쿼리를 클라이언트에서 병합해야 한다(3번은 collectionGroup으로 가능하지만 별도 인덱스가 필요).

**기각 이유**
- 1번: Rules 중복, 카테고리 추가 시 코드 변경 필요, 교차 피드 불가.
- 3번: collectionGroup 쿼리와 Rules가 복잡해지고, 얻는 이점(게시판별 격리)이 이 규모에서 무의미하다.

**영향** — [05 데이터 모델](./05-DATA-MODEL-SSOT.md) Post 엔터티, Firestore 인덱스 설계.

**재검토 조건** — 단일 컬렉션 문서 수가 수십만 건에 달해 인덱스 비용이 문제가 될 때(현실적으로 V1 범위 밖).

---

## D-005 · 댓글: 전역 단일 `comments` 컬렉션 + `targetType`/`targetId`

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | 확정 |
| **결정** | `posts/{postId}/comments` 서브컬렉션을 쓰지 않는다. 최상위 `comments` 컬렉션에 `targetType`(`post` \| `material`)과 `targetId`를 둔다. |

**배경**
댓글은 게시글과 교육자료 **양쪽**에 필요하다(FR-I01).

**선택지**
1. `posts/{postId}/comments` + `materials/{materialId}/comments` — 서브컬렉션 2벌
2. **전역 `comments` + `targetType`/`targetId` (채택)**

**채택 이유**
- 1번이면 Rules 블록이 2벌, 타입 정의가 2벌, 컴포넌트가 2벌이 된다. 댓글의 동작은 두 대상에서 완전히 동일하다.
- **"내 댓글" 화면**(`/me/comments`)이 1번에서는 `collectionGroup('comments')` 쿼리 + 별도 인덱스 + collectionGroup 전용 Rules가 필요하다. 2번에서는 `where('authorUid', '==', uid)` 단일 쿼리로 끝난다.
- **모더레이션 큐**도 마찬가지다. 신고된 댓글을 한 곳에서 처리할 수 있다.

**기각 이유 (1번)**
- 서브컬렉션의 유일한 장점인 "부모 삭제 시 자동 정리"는 Firestore에서 **어차피 자동으로 되지 않는다**(서브컬렉션은 부모 문서 삭제와 무관하게 남는다). 즉 이 장점은 존재하지 않는다.

**대가 (인정하고 감수)**
- 특정 게시글의 댓글을 읽으려면 `where('targetId', '==', postId)` 복합 인덱스가 필요하다. → [05](./05-DATA-MODEL-SSOT.md) 인덱스 절에 명시.

**영향** — [05 데이터 모델](./05-DATA-MODEL-SSOT.md) Comment 엔터티, [06](./06-SECURITY-AND-MODERATION-SSOT.md) Rules.

---

## D-006 · 반응: 결정론적 문서 ID + 서버 트리거 카운터

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | 확정 |
| **결정** | 좋아요는 `reactions/{targetType}__{targetId}__{uid}` 결정론적 문서 ID로 저장한다. 대상 문서의 `likeCount`는 **클라이언트가 절대 쓰지 않으며**, `reactions` onCreate/onDelete Firestore 트리거 함수가 `FieldValue.increment(±1)`로만 갱신한다. |

**중복 방지 선택지**
1. 쿼리로 기존 반응 확인 후 없으면 생성
2. **결정론적 문서 ID (채택)**

**채택 이유 (2번)**
- 1번은 **check-then-act 경쟁 조건**을 갖는다. 사용자가 좋아요를 빠르게 두 번 누르거나 두 탭에서 동시에 누르면 두 문서가 생긴다. 트랜잭션으로 감쌀 수는 있지만 비용과 복잡도가 늘어난다.
- 2번은 Firestore가 **문서 ID의 유일성을 구조적으로 보장**한다. 중복이 물리적으로 불가능하다. 추가 읽기도 트랜잭션도 필요 없다.
- 사용자가 이미 눌렀는지 확인하는 것도 단일 `getDoc(docId)`로 끝난다(쿼리보다 저렴).

**카운터 선택지**
1. 클라이언트가 `increment(1)`로 직접 갱신
2. **Firestore 트리거 함수가 갱신 (채택)**
3. 카운터 없이 매번 집계 쿼리

**채택 이유 (2번)**
- 1번은 근본적으로 안전하지 않다. Security Rules는 **하나의 배치 안의 다른 쓰기를 참조할 수 없다.** 즉 "reactions 문서가 생성되었을 때만 likeCount 증가를 허용"하는 규칙을 Rules로 표현할 방법이 없다. 클라이언트가 reactions를 만들지 않고 likeCount만 1000 올리는 요청을 막을 수 없다.
- 3번은 목록 화면에서 게시글 20건마다 집계 쿼리가 돌아 비용이 폭증한다.
- 2번은 클라이언트에게서 `likeCount` 쓰기 권한을 완전히 회수하고(Rules에서 필드 변경 차단), 서버가 사실상의 원장이 된다.

**대가** — 트리거 함수 실행까지 수백 ms 지연이 있다. UI는 낙관적 업데이트(optimistic update)로 즉시 반영하고 서버 값이 오면 보정한다.

**영향** — [05 데이터 모델](./05-DATA-MODEL-SSOT.md) Reaction·카운터 절, [06](./06-SECURITY-AND-MODERATION-SSOT.md) Rules, Goose 패킷 GOOSE-05.

---

## D-007 · 북마크: 결정론적 ID, 소유자 전용

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | `bookmarks/{uid}__{targetType}__{targetId}`. 소유자만 읽고 쓴다. 카운터를 두지 않는다. |
| **근거** | 중복 방지는 D-006과 동일 논리. 북마크는 사적 행위이므로 공개 카운터가 필요 없고, 카운터가 없으면 트리거 함수도 필요 없어 비용이 0이다. ID 앞에 `uid`를 두면 소유자 검사를 Rules에서 문서 ID 접두어로도 보강할 수 있다. |
| **영향** | [05](./05-DATA-MODEL-SSOT.md) Bookmark 엔터티 |

**기존 localStorage 북마크와의 관계**: 현재 `src/lib/progress.ts`의 `bookmarks`는 **강의 slug 북마크**이며 localStorage에 남는다. 커뮤니티 `bookmarks` 컬렉션은 게시글·자료 대상으로 별개다. V1에서 두 시스템을 통합하지 않는다([01 PRD](./01-PRODUCT-PRD.md) FR-A13 = Cut).

---

## D-008 · 알림: 서버 전용 생성

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | `notifications/{uid}/items/{notificationId}` 서브컬렉션. 생성·삭제는 Cloud Functions 트리거 전용. 클라이언트는 자기 것 읽기와 `readAt` 단일 필드 갱신만 가능. |

**선택지**
1. 클라이언트가 댓글 작성 시 직접 알림 문서 생성
2. **Functions 트리거가 생성 (채택)**

**채택 이유**
- 1번은 알림 **위조**를 허용한다. 악의적 사용자가 "관리자가 당신을 정지했습니다" 같은 알림을 타인에게 보낼 수 있다. Rules로 "실제 댓글이 있을 때만 알림 생성 허용"을 표현하려면 `get()` 검증이 필요한데, 그래도 내용 자체는 조작 가능하다.
- 2번은 알림의 원천이 서버 이벤트뿐이므로 위조 경로가 없다.

**서브컬렉션을 선택한 이유** — 소유자 검사가 경로만으로 끝난다(`match /notifications/{uid}/items/{id} { allow read: if request.auth.uid == uid }`). 최상위 컬렉션 + `targetUid` 필드였다면 필드 검사가 필요하고 목록 쿼리에 인덱스가 붙는다. 알림은 교차 조회가 필요 없는 유일한 엔터티라 서브컬렉션이 맞다.

**영향** — [05](./05-DATA-MODEL-SSOT.md) Notification, [04](./04-TECHNICAL-ARCHITECTURE.md) 9절, Goose 패킷 GOOSE-09.

---

## D-009 · 회원 승인: 인증과 참여 권한의 분리

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | Firebase Auth 성공은 신원 확인일 뿐 참여 권한이 아니다. 인증 성공 → `pending_member` → 프로필 작성 → 가입 신청 → 관리자 승인 → `member`. 승인 전에는 모든 쓰기가 Rules 레벨에서 차단된다. |

**배경** — 사용자 요구사항에 "회원가입 관리자 승인"이 명시되어 있다. 이를 UI 흐름이 아니라 **권한 모델**로 구현할지가 결정 사항이었다.

**채택 이유**
- 승인을 UI 단계로만 두면 클라이언트를 우회한 직접 Firestore 쓰기를 막을 수 없다. 정적 export 사이트는 클라이언트 코드가 전부 공개되므로 이 우회는 현실적 위협이다.
- 역할을 하나 추가(`pending_member`)하면 Rules에서 `hasRole('member','trusted_member','moderator','admin')` 한 줄로 전체 쓰기를 잠글 수 있다.

**기각한 대안** — `users/{uid}.approved: boolean` 플래그. 역할 체계와 별개의 축이 생겨 Rules 조건이 곱해지고, D-003의 claim 기반 검사에 플래그를 또 실어야 한다. 역할 하나로 표현하는 편이 단순하다.

**영향** — [03 플로우·권한](./03-USER-FLOWS-AND-PERMISSIONS.md) 전체, [06](./06-SECURITY-AND-MODERATION-SSOT.md) 2절.

---

## D-010 · 역할 6개 체계 확정

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | `guest` · `pending_member` · `member` · `trusted_member` · `moderator` · `admin` 6개를 V1부터 전부 데이터 모델에 포함한다. |

**쟁점** — `trusted_member`와 `moderator`는 V1 커뮤니티 규모(목표 30명)에서 실제로 쓰이지 않을 가능성이 높다. 나중에 추가할 수도 있었다.

**채택 이유**
- 역할은 **custom claim에 실리고 Rules에 하드코딩**된다. 나중에 역할을 추가하면 Rules 재작성 + 재배포 + 전체 회귀 테스트가 필요하다. 반면 지금 정의만 해두는 비용은 Rules 조건 한 줄과 문서 몇 줄이다.
- `moderator`는 [01 PRD](./01-PRODUCT-PRD.md) R-10(1인 admin 단일 실패점)의 완화책이다. 정의만 있으면 필요할 때 임명으로 즉시 활성화된다.
- `trusted_member`는 [01 PRD](./01-PRODUCT-PRD.md) R-5(운영 부하 폭증)의 완화책이다. 검토 대기 큐가 밀리면 신뢰 회원을 승격해 사후 검토로 전환할 수 있다.

**주의** — 정의는 V1부터, **실제 임명은 운영 판단**이다. V1 출시 시점에 `trusted_member`·`moderator`가 0명이어도 정상이다.

---

## D-011 · Cloud Functions 사용 범위

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 (단, OPEN-P02 선행) |
| **결정** | 다음 조작은 **반드시** callable Cloud Functions를 거친다: 회원 승인·거절, 역할 변경, 회원 정지·복구, 자료 상태 변경·공식 승격, 카테고리 신청 처리, 신고 처리, 게시글 숨김·복구, 관리자 댓글 삭제. 일반 게시글 작성·본인 프로필 수정·댓글 작성·좋아요·북마크는 Rules로 제한된 클라이언트 직접 쓰기를 허용한다. |

**판단 기준 (이 기준으로 향후 기능도 분류한다)**
어떤 조작이 다음 중 **하나라도** 해당하면 Function 전용이다.
1. 자신의 권한을 넘어서는 문서를 쓴다 (타인 문서·역할·상태)
2. 여러 문서를 원자적으로 함께 바꿔야 한다
3. 감사 로그(`adminLogs`)를 반드시 동반해야 한다
4. custom claim을 변경한다
5. 클라이언트가 알면 안 되는 정보를 참조한다

**전제** — Cloud Functions는 Firebase **Blaze 요금제**를 요구한다. [01 PRD](./01-PRODUCT-PRD.md) OPEN-P02가 해소되지 않으면 Phase 3 이후 전체가 블로킹된다. 이것은 이 계획 전체에서 **사용자 결정이 반드시 선행되어야 하는 유일한 항목**이다.

**기각한 대안** — 모든 관리자 조작을 Rules만으로 허용(`isAdmin()` 조건). 기술적으로 가능하지만 (a) 감사 로그를 클라이언트가 쓰게 되어 위조 가능하고, (b) custom claim 변경이 불가능하며, (c) 다중 문서 원자성이 깨진다.

---

## D-012 · 검색: 기존 정적 인덱스 유지, 커뮤니티 검색은 Firestore 쿼리로 제한

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | `src/lib/search.ts`·`search-index.ts`의 빌드타임 정적 인덱스를 **변경하지 않는다.** 커뮤니티 검색 V1은 카테고리·태그·정렬 필터로 제한하고 전문 검색 엔진을 도입하지 않는다. 통합 검색 UI는 정적 결과를 먼저, 커뮤니티 결과를 별도 섹션으로 보여준다. |

**기각 이유** — Algolia·Typesense 등 외부 검색 서비스는 (a) 비용, (b) 색인 동기화 파이프라인(Functions 트리거), (c) API 키 관리, (d) 장애 시 폴백이라는 네 개의 운영 축을 새로 만든다. 커뮤니티 글이 수백 건 규모인 V1에서 이 비용은 정당화되지 않는다.

**재검토 조건** — 커뮤니티 게시글이 1,000건을 넘고 카테고리 탐색만으로 원하는 글을 찾지 못한다는 피드백이 누적될 때.

---

## D-013 · localStorage 진행률의 계정 동기화를 V1에서 하지 않음

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | `LearningStateProvider`(localStorage)와 `AtlasProgressProvider`(localStorage)를 그대로 두고, 회원 계정과 동기화하지 않는다. |

**배경** — [01 PRD](./01-PRODUCT-PRD.md) P-1(학습이 기기에 갇힘)이 문제로 식별되어 있으므로 유혹이 크다.

**기각 이유**
1. **마이그레이션 정책이 비자명하다.** 로그인 시 로컬 상태와 서버 상태가 다르면 어느 쪽을 남길지, 병합할지, 여러 기기의 상태를 어떻게 합칠지 결정해야 한다. 잘못 만들면 사용자의 학습 이력이 **소실**된다.
2. **로그아웃 정책도 비자명하다.** 로그아웃 시 로컬 상태를 지울 것인가? 지우면 비회원 학습자의 이력이 사라지고, 안 지우면 공용 PC에서 이력이 노출된다.
3. **회귀 위험이 크다.** 진행률은 기존 52개 라우트 전부에 걸쳐 있는 기능이고 기존 테스트가 이를 검증한다. 여기를 건드리는 것은 [01 PRD](./01-PRODUCT-PRD.md) 원칙 6과 R-8에 정면으로 부딪힌다.
4. 커뮤니티 V1의 가치(P-2·P-3·P-4)는 진행률 동기화 없이도 전부 달성된다.

**V2에서 하려면 필요한 것** — 병합 정책 확정, 충돌 해결 UI, `users/{uid}/learningState` 스키마, 로컬→서버 1회성 마이그레이션 함수, 로그아웃 시 처리 정책, 다기기 동시 편집 정책.

---

## D-014 · 커뮤니티 카테고리 8개를 시드 데이터로 고정

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | `free`, `question`, `troubleshooting`, `today-i-made`, `project`, `tool-review`, `insight`, `gupt-meetup` 8개를 `categories` 컬렉션 시드로 넣는다. 코드 상수가 아니라 **데이터**로 관리한다. |
| **근거** | D-004의 귀결. 카테고리를 코드 상수로 두면 신설 신청·승인 기능(FR-G06)이 성립하지 않는다. 시드는 [05](./05-DATA-MODEL-SSOT.md) 8절의 JSON을 그대로 투입한다. |
| **주의** | 카테고리 slug는 URL과 쿼리에 쓰이므로 한번 정하면 변경 비용이 크다. 표시 이름(`displayName`)만 나중에 바꿀 수 있게 slug와 분리한다. |

---

## D-015 · 문서 배치: `docs/community-platform/` 신규 디렉터리

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | 기획 문서 13종을 `docs/community-platform/`에 새로 만든다. 기존 `ai-ops/` 문서와 루트 문서(`AGENTS.md`, `DESIGN.md`, `CONCEPTS.md` 등)를 **수정하지 않는다.** |

**근거**
- `ai-ops/`는 **교육 콘텐츠 생산 파이프라인**의 운영 기록이다. 커뮤니티 플랫폼 기획은 성격이 다른 축이므로 섞으면 두 체계가 서로를 오염시킨다.
- 기존 저장소에 미커밋 변경 38건이 있다. 기존 문서를 수정하면 사용자의 진행 중 작업과 충돌한다.

**supersede 계획 (구현 착수 시점에 별도 승인 필요, 이번 단계에서는 수정하지 않음)**

| 기존 문서 | 커뮤니티 전환 시 필요한 갱신 | 시점 |
|---|---|---|
| `ai-ops/DEPLOY-GUIDE.md` | Hosting 단독 배포 → Rules·Indexes·Functions 포함 배포 절차 추가 | Phase 1 |
| `AGENTS.md` | AI 쓰기 허용 경로에 `src/features/community/**` 등 추가, 커뮤니티 코드 보호 규칙 | Phase 1 |
| `src/app/privacy/page.tsx` | 계정·이메일·프로필 수집 항목 반영 | Phase 3 |
| `src/app/terms/page.tsx` | 커뮤니티 이용 규칙·제재 정책 반영 | Phase 8 |
| `README.md` | 커뮤니티 기능 소개, 기여 가이드 | Phase 10 |
| `ai-ops/STATE.md` | 커뮤니티 Phase 진행 상태 축 추가 | Phase 0 |

---

## D-016 · V1 범위를 Phase 0~10 전체로 확정

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 · **상태** 확정 |
| **결정** | V1은 회원가입부터 관리자 운영·알림·기존 콘텐츠 연결까지 Phase 0~10 전부를 포함한다. 중간 단계에서 부분 출시하지 않는다. |

**근거**
- 승인 기반 커뮤니티는 **부분 출시가 성립하지 않는다.** 게시글만 열고 신고·제재가 없으면 문제 콘텐츠를 처리할 수단이 없고, 알림이 없으면 질문에 답이 달려도 아무도 모른다. 즉 Phase 4만 배포하는 것은 기능이 아니라 부채다.
- 대신 **각 Phase는 에뮬레이터에서 독립 검증**되고, 프로덕션 배포는 Phase 10에서 한 번만 일어난다([08 로드맵](./08-IMPLEMENTATION-ROADMAP.md), Goose 패킷 GOOSE-12).

**기각한 대안** — Phase 4 완료 후 베타 공개. 신고·제재 없는 공개 게시판은 운영 리스크가 크고, 1인 운영자가 수동으로 감당할 수 없다.

---

## D-017 · 신규 가입 부트스트랩을 `bootstrapUserAccount` 콜러블로 확정

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | 확정 |
| **결정** | Firebase Auth 계정 생성 직후 클라이언트가 호출하는 **멱등 콜러블 `bootstrapUserAccount`** 를 CANON H절 콜러블 목록에 추가한다. 이 함수가 `users/{uid}` 문서를 `role: "pending_member"`, `status: "active"` 로 생성하고 custom claim `role=pending_member` 를 부여한다. |

### 배경 — 이것은 문서 공백이 아니라 **차단 결함**이었다

[03](./03-USER-FLOWS-AND-PERMISSIONS.md) OPEN-01, [05](./05-DATA-MODEL-SSOT.md) OPEN-01, [09](./09-GOOSE-IMPLEMENTATION-PACKETS.md) OPEN-01 이 각각 독립적으로 "Auth 신규 가입 시 `users/{uid}` 생성과 최초 claim 부여를 담당하는 함수가 CANON H절에 없다"를 기록했다. 세 문서가 같은 구멍을 발견한 것이다.

최종 독립 검토에서 이 구멍이 **단순한 미기재가 아니라 온보딩 전체를 정지시키는 교착**임이 확인되었다. [06](./06-SECURITY-AND-MODERATION-SSOT.md) 의 확정 Rules 기준:

| 동작 | 요구 조건 | 신규 가입자의 실제 상태 | 결과 |
|---|---|---|---|
| `profiles/{uid}` create | `isOwner(uid) && isActive()` | `isActive()` 는 `users/{uid}` 존재 + `status=='active'` 를 요구하는데 문서가 없음 | **거부** |
| `membershipApplications/{uid}` create | `isOwner(uid) && isActive() && role() == 'pending_member'` | `users/{uid}` 없음 + claim 없어 `role()` 은 `'guest'` 반환 | **거부** |

즉 계정을 만든 사용자는 **프로필도 못 만들고 가입 신청도 못 낸다.** `pending_member` 가 되는 경로가 존재하지 않으므로 [D-009](#d-009) 의 2단계 승인 모델 자체가 시작되지 못한다. 이 상태로 구현에 들어가면 Phase 3에서 반드시 막힌다.

`09` 는 이 상황에서 Goose에게 "트리거를 임의 명명해 구현하지 말 것"을 지시했는데, 이는 올바른 판단이었다. 함수 이름을 짓는 것은 정본 변경이며 Opus 결정 사항이다. 본 결정이 그 결정을 내린다.

### 선택지

| 안 | 방식 | 장점 | 단점 | 판정 |
|---|---|---|---|---|
| A | Auth 블로킹 함수 `beforeUserCreated` (gen2) | 계정 생성 전에 반드시 실행됨, 우회 불가 | **Identity Platform(GCIP) 업그레이드 필요** — 요금제·콘솔 설정이 추가로 바뀐다. [D-011](#d-011) 의 Blaze 확인(OPEN-P02)에 더해 두 번째 차단 항목이 생긴다 | 기각 |
| B | gen1 `functions.auth.user().onCreate` 트리거 | 추가 업그레이드 불필요 | ① gen1/gen2 혼용 — [D-001](#d-001) 이 확정한 gen2 단일 세대 원칙 위반 ② **비동기** — 클라이언트가 트리거 완료 전에 `/onboarding/profile` 에서 쓰기를 시도하면 `isActive()` 실패로 랜덤하게 깨진다. 재시도 UI를 별도로 설계해야 함 | 기각 |
| C | **멱등 콜러블 `bootstrapUserAccount`** 를 가입 성공 직후 클라이언트가 호출 | ① gen2 유지 ② **동기** — 성공 응답을 받은 뒤 토큰을 갱신하고 다음 화면으로 넘어가므로 경쟁 조건이 없다 ③ 추가 요금제/플랫폼 업그레이드 없음 ④ 기존 콜러블 패턴과 동일한 구조 | 클라이언트가 호출을 생략하면 부트스트랩이 안 됨 → 로그인 시마다 "claim 없으면 호출" 로직으로 자가 치유 | **채택** |

### 채택 이유

1. **차단 항목을 늘리지 않는다.** 안 A는 Identity Platform 업그레이드라는 두 번째 사용자 결정 사항을 만든다. 현재 미해결 차단 항목은 Blaze 확인([01 PRD](./01-PRODUCT-PRD.md) OPEN-P02) 하나이며, 이를 둘로 늘릴 이유가 없다.
2. **경쟁 조건이 원천적으로 없다.** 안 B의 비동기 트리거는 "가끔 온보딩이 실패하는" 유형의 버그를 만든다. 이는 재현이 어렵고 [10](./10-ACCEPTANCE-TEST-PLAN.md) 의 에뮬레이터 테스트에서 통과했다가 프로덕션에서 터지는 전형적 패턴이다.
3. **[D-003](#d-003) 의 토큰 강제 갱신 규약을 그대로 재사용한다.** D-003은 이미 "역할이 바뀌는 콜러블 성공 직후 `getIdToken(true)` 호출"을 의무화했다. 부트스트랩도 역할이 바뀌는 콜러블이므로 같은 규약이 자동 적용된다. 새 규약을 만들 필요가 없다.
4. **권한 상승 위험이 없다.** 이 함수가 부여할 수 있는 유일한 역할은 `pending_member` — 읽기 전용에 가까운 최저 권한이다.

### 확정 명세

```
함수명   : bootstrapUserAccount
종류     : callable (gen2, Node 20, asia-northeast3)
입력     : 없음
출력     : { role: "pending_member" | <기존 역할>, status: <기존 상태>, created: boolean }
```

**진입부 검사 순서** — 다른 콜러블은 CANON H절의 `①auth → ②role → ③active → ④adminLog` 를 따르지만, **이 함수만 예외**다. 역할과 `users` 문서가 아직 없는 상태에서 실행되는 유일한 콜러블이기 때문이다.

| 순서 | 검사 | 실패 시 |
|---|---|---|
| ① | `request.auth != null` | `unauthenticated` 반환 |
| ② | `users/{uid}` 존재 여부 조회 | — |
| ③ | **이미 존재하면 아무것도 쓰지 않고** 현재 `role`/`status` 를 `created: false` 와 함께 반환 | (정상 종료) |
| ④ | 없으면 `users/{uid}` 를 `{ role: "pending_member", status: "active", createdAt: serverTimestamp() }` 로 생성 | — |
| ⑤ | custom claim `{ role: "pending_member" }` 설정 | — |
| ⑥ | `adminLogs` 에 `bootstrapUserAccount` 기록 | — |

**멱등성이 보안 요건이다.** ③이 없으면 `admin` 사용자가 이 함수를 호출해 자신을 `pending_member` 로 강등시키거나, 더 나쁘게는 정지된(`suspended`) 사용자가 호출해 `status: "active"` 로 되돌릴 수 있다. **기존 문서가 있으면 절대 쓰지 않는다**가 이 함수의 핵심 불변식이다.

**클라이언트 호출 지점 (2곳, 둘 다 필수)**

| 지점 | 조건 | 이유 |
|---|---|---|
| 회원가입 성공 직후 (`/signup`) | 무조건 호출 | 정상 경로 |
| 로그인 성공 직후 (`/login`) | 토큰에 `role` claim 이 **없을 때만** 호출 | 자가 치유 — 가입 중 이탈했거나 네트워크 실패로 부트스트랩이 누락된 계정을 복구한다 |

두 지점 모두 성공 응답 후 **`getIdToken(true)` 로 토큰을 강제 갱신한 뒤** 다음 화면으로 이동한다([D-003](#d-003)).

### 영향

| 문서 | 반영 내용 |
|---|---|
| [05 데이터 모델](./05-DATA-MODEL-SSOT.md) | `users/{uid}` 생성 주체가 확정됨 — OPEN-01 해소 |
| [03 흐름·권한](./03-USER-FLOWS-AND-PERMISSIONS.md) | `pending_member` claim 부여 시점 = 가입 직후 `bootstrapUserAccount` 성공 시 — OPEN-01 해소 |
| [06 보안](./06-SECURITY-AND-MODERATION-SSOT.md) | Rules 변경 **없음.** `users/{uid}` 가 생기는 순간 기존 `isActive()`·`role()` 이 그대로 통과한다 |
| [09 구현 패킷](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | GOOSE-03이 이 함수를 구현하도록 범위 확대 — OPEN-01 해소 |
| [10 테스트](./10-ACCEPTANCE-TEST-PLAN.md) | 신규 케이스 필요: (a) 가입 후 프로필 생성 성공 (b) 중복 호출 시 역할 불변 (c) admin 호출 시 강등되지 않음 (d) suspended 사용자 호출 시 active 로 복구되지 않음 → **§3.23 AT-098~101 로 반영 완료** |
| CANON H절 | 콜러블 9개 → **10개** |

**재검토 조건** — Identity Platform 을 다른 이유(SAML/OIDC, MFA)로 도입하게 되면, 우회 불가능한 안 A(`beforeUserCreated`)로 이전을 검토한다.

---

## D-018 · `reports` 문서 ID를 결정론적 ID로 확정

**배경 — 문서 간 정면 충돌**

정합성 검사에서 같은 사안에 대해 네 문서가 서로 다른 입장을 취하고 있음이 드러났다. 이는 표현 차이가 아니라 **구현 불가 수준의 충돌**이었다.

| 문서 | 입장 |
|---|---|
| [01 PRD](./01-PRODUCT-PRD.md) FR-G02 | 중복 신고 방지를 Must-have 로 규정, 구현 방식을 "Rules(결정론적 ID)"로 지정 |
| [03 흐름·권한](./03-USER-FLOWS-AND-PERMISSIONS.md) OPEN-10 | "CANON D절에 명시 없음 — 중복 방지 메커니즘 미정" |
| [05 데이터 모델](./05-DATA-MODEL-SSOT.md) §2.11 | "**자동 생성 ID. 중복 신고 방지를 하지 않는다** — 의도적 설계" |
| [06 보안](./06-SECURITY-AND-MODERATION-SSOT.md) §4·§8 | 결정론적 ID `{targetType}__{targetId}__{reporterUid}` 를 Rules 코드로 이미 구현 |

**이것이 왜 치명적인가**

`09` 패킷대로 `addDoc(collection(db,'reports'), {...})`(자동 ID)로 신고 제출을 구현하고 `06` 의 Rules 를 그대로 배포하면, `06` 의 create 규칙은 `reportId == targetType + '__' + targetId + '__' + auth.uid` 를 요구한다. 자동 생성된 랜덤 ID 는 이 패턴과 **결코 일치할 수 없으므로 모든 신고 제출이 `permission-denied` 로 거부**된다. 신고 기능 전체가 동작하지 않는다.

**결정 — 결정론적 ID 채택 (06 의 입장 확정, 05 를 수정)**

```
문서 ID : {targetType}__{targetId}__{reporterUid}
예시    : post__aBc123__uid789
```

**05 의 기각 근거를 기각한 이유.** `05` 는 "모더레이션 우선순위 판단에 신고 건수 자체가 신호이므로 중복을 허용한다"고 주장했다. 그러나 결정론적 ID 를 써도 **신고자가 다르면 문서도 다르므로 대상별 신고 건수는 그대로 집계된다.** 달라지는 것은 한 사람이 같은 대상에 대해 건수를 부풀릴 수 없다는 점뿐이다. 즉 결정론적 ID 는 `05` 가 지키려던 신호(대상별 신고 수)를 **손상 없이 보존하면서**, 동시에 그 신호를 1인이 조작하는 경로만 제거한다. `05` 안이 얻는 것은 없고 잃는 것만 있다.

부수 근거:
- `reactions`(D-006)·`bookmarks`(D-007)에서 이미 채택한 패턴과 동일하다 — 새 개념을 도입하지 않는다.
- 서버 로직·선행 쿼리 없이 **Rules 만으로** 중복이 차단된다(추가 읽기 비용 0).
- `01` FR-G02(Must-have)를 별도 구현 없이 충족한다.

**트레이드오프(수용).** 같은 신고자가 다른 사유로 같은 대상을 재신고할 수 없다. 문서가 이미 존재해 `create` 가 불가하고, `update` 는 moderator 전용 `open → in_review` 전이만 허용되므로 본인이 갱신할 수도 없다. 보완 정보가 필요한 사용자는 관리자 문의 채널을 이용한다. 도배성 반복 신고 차단의 이득이 재신고 편의 손실보다 크다고 판단했다.

**영향**

| 문서 | 조치 |
|---|---|
| [05 §2.11](./05-DATA-MODEL-SSOT.md) | "자동 생성 ID, 중복 방지 안 함" → 결정론적 ID 로 **교체**, OPEN-04 해소 |
| [03 OPEN-10](./03-USER-FLOWS-AND-PERMISSIONS.md) | 해소 처리 |
| [06 §4·§8](./06-SECURITY-AND-MODERATION-SSOT.md) | 변경 없음(이미 이 결정과 일치) |
| [09 GOOSE-08](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | `addDoc` 금지, `setDoc(doc(db,'reports',id))` 명시 |
| [10 테스트](./10-ACCEPTANCE-TEST-PLAN.md) | AT-056 계열 중복 신고 거부 케이스 → **§3.24 AT-119(중복 신고 거부)·AT-120(`addDoc` 금지) 로 반영 완료** |

**재검토 조건** — 신고 사유별 다중 신고 요구가 실제 운영에서 반복 제기되면, ID 에 `reason` 을 추가(`{targetType}__{targetId}__{reporterUid}__{reason}`)하는 방식을 검토한다.

---

## D-019 · 필드명·필드 제약의 정본은 `05-DATA-MODEL-SSOT.md` 단 하나

**배경 — "SSOT" 를 자처하는 문서가 셋이었다**

`05`(데이터 모델)·`06`(보안)·`07`(콘텐츠 거버넌스)이 모두 제목에 SSOT 를 달고 있었고, 실제로 같은 엔터티의 필드명을 서로 다르게 규정하고 있었다.

| 엔터티 | 05 (데이터 모델) | 06 (Rules 코드) | 07 / 09 |
|---|---|---|---|
| Post 본문 | `bodyMarkdown` | `body` | `body` |
| Comment 본문 | `bodyMarkdown` | `body` | `body` |
| Material 본문 | `description` | `description` | `body` |
| Material 제목 길이 | 2~120자 | ≤100자 | — |
| Profile 표시명 | `displayName` 2~24자 | `nickname` 2~20자 | `displayName` |
| Profile 소개 | `bio` 0~300자 | `bio` ≤500자 | `bio` |
| Report 상세 | `detail` 0~500자 | `description` ≤1000자 | `detail` |
| CategoryRequest 신청자 | `requestedByUid` | `requesterUid` | `requestedByUid` |
| CategoryRequest 이름 | `proposedName` + `proposedSlug` | `name` 만 검사 | `slug`/`label` |

**이것이 왜 치명적인가**

Rules 의 `request.resource.data.X is string` 은 문서에 `X` 필드가 없으면 false 다. 따라서 `09` 패킷대로 클라이언트가 `{displayName: "..."}` 를 쓰고 `06` 의 Rules(`nickname is string`)를 배포하면 **모든 프로필 생성이 `permission-denied`** 로 거부된다. 온보딩 자체가 동작하지 않는다. 같은 실패가 Post·Comment·Material·Report·CategoryRequest 에 그대로 반복된다 — 즉 **주요 쓰기 기능 대부분이 배포 즉시 죽는다.**

**결정**

필드명·타입·길이 제약·기본값의 정본은 **`05-DATA-MODEL-SSOT.md` 단 하나**로 확정한다. `06`·`07`·`09`·`10` 은 05 를 인용할 뿐 독자적으로 필드를 규정하지 않는다.

**05 를 선택한 근거(다수결이 아님).** `06` 의 `body`·`07`/`09` 의 `body` 를 합치면 수적으로는 05 가 소수다. 그럼에도 05 를 정본으로 삼은 이유는, 05 만이 **필드별 타입·필수 여부·기본값·길이·enum·클라이언트 쓰기 가능 여부를 표로 전수 명시하고, 동일 내용을 TypeScript 인터페이스와 zod 스키마로 두 번 더 표현**하고 있기 때문이다. 다른 문서의 필드 언급은 각자의 관심사(Rules 조건문, 정책 산문, 구현 지시)를 서술하다 파생된 것이라 전수성·정합성 검증 수단이 없다. 정본은 가장 많이 등장하는 표기가 아니라 **가장 검증 가능한 표기**여야 한다.

**적용 완료** — 위 표의 모든 불일치를 `06`·`07`·`09` 에서 05 기준으로 교정했다(`nickname`→`displayName` 9곳, `data.body`→`data.bodyMarkdown` 11곳, `requesterUid`→`requestedByUid` 2곳, reports `description`→`detail` 및 ≤1000→0~500, material title ≤100→2~120, bio ≤500→0~300, categoryRequests `name`→`proposedName`+`proposedSlug` 정규식 검사 추가).

**운영 규칙(구현 단계에서 강제).** `05` 의 필드 표를 고칠 때는 같은 커밋에서 `06` 의 Rules 코드 블록과 `09` 의 데이터 계약 표를 함께 고친다. Phase 0 회귀 스크립트에 **필드명 1:1 대조 검사**를 추가해 기계적으로 검증한다([10 §5](./10-ACCEPTANCE-TEST-PLAN.md)).

**재검토 조건** — 없음. 05 자체를 개정할 때 전 문서를 동시 갱신하는 것이 유일한 운영 방식이다.

---

## D-020 · `linkedRefs`를 `Array<{type, id}>`로 확정하고 05 필드 표에 정식 편입

**배경 — 세 문서가 서로 다른 구조를 말하고 05에는 필드 자체가 없다**

| 문서 | 상태 |
|---|---|
| [01 PRD](./01-PRODUCT-PRD.md) FR-P07 | `linkedRefs`로 강의·용어·Atlas 참조 연결 (우선순위 S) |
| [02 IA](./02-INFORMATION-ARCHITECTURE.md) §9-1 | `Array<{ type: "lesson"\|"glossary"\|"atlas", id: string }>`, `array-contains` 완전 일치 조회로 설계 완료 |
| [08 로드맵](./08-IMPLEMENTATION-ROADMAP.md) OPEN-07 | "CANON에 없으므로" **스칼라 필드 `linkedLessonSlug`** 추가 방식으로 최소 구현 |
| [05 데이터 모델](./05-DATA-MODEL-SSOT.md) | **필드가 존재하지 않음** |

필드 정본인 05 에 필드가 없는 상태에서 02 와 08 이 서로 다른 구조를 지시하고 있었다. 이대로면 Phase 10 구현자가 어느 쪽을 따르든 다른 문서와 어긋난다.

**결정 — 02 의 `Array<{type, id}>` 를 채택하고, 05 §2.4(Post)·§2.5(Material)에 필드로 편입한다.**

```
linkedRefs: Array<{ type: "lesson" | "glossary" | "atlas", id: string }>   // 선택, 최대 5개
```

**08 의 `linkedLessonSlug` 스칼라 안을 기각한 이유**: (1) `lesson` 만 담을 수 있어 FR-P07 이 요구하는 용어·Atlas 연결을 구조적으로 지원하지 못한다 — 요구의 3분의 1만 충족한다. (2) 한 게시글이 여러 강의를 참조할 수 없다. (3) "CANON 에 없으므로 최소 구현"이라는 근거는 성립하지 않는다 — CANON 에 없는 세부는 이 문서 세트에서 결정하라는 것이 지시서의 전제이며, 실제로 02 가 이미 완결된 설계를 갖고 있었다.

**제약(02 §9-1 을 그대로 승계)**: 배열 항목은 **정확히 `type`·`id` 두 필드만** 갖는 객체 리터럴이어야 한다. Firestore `array-contains` 는 객체 완전 일치를 요구하므로 부가 필드가 하나라도 있으면 조회가 실패한다. `id` 값은 [00 §5](./00-CURRENT-STATE-AUDIT.md)가 확정한 안정 식별자(`lesson.slug`, `glossary.term`, `atlas.id`)만 사용하며, `title`·`summary`·`order` 는 사용 금지다.

**영향**: 05 Post/Material 필드 표에 `linkedRefs` 추가(선택, 최대 5개) · 06 Rules 에 배열 크기·타입 검사 추가 · 08 OPEN-07 해소 · 10 에 AT-108 신설.

**재검토 조건** — 연결 대상 종류가 3종을 넘어서면 `type` enum 확장으로 처리하고, 구조는 바꾸지 않는다.

---

## D-021 · 자료 출처 필수화를 `sourceType` 분기로 확정

**배경 — Must 요구와 정본 스키마가 정면 충돌**

[01 PRD](./01-PRODUCT-PRD.md) FR-M08 은 "출처 필드 필수화"를 **Must**(M)로 규정하고 구현 수단을 `Rules(zod)`로 지정했다. 그러나 [05 §2.5](./05-DATA-MODEL-SSOT.md)의 `resourceUrl` 은 **선택(N)** 필드다. 어느 쪽을 따르든 다른 쪽이 깨진다.

**왜 단순히 `resourceUrl` 을 필수로 바꾸면 안 되는가**: 교육자료에는 외부 링크를 소개하는 자료와 회원이 직접 작성한 자료가 모두 존재한다([07](./07-CONTENT-GOVERNANCE-SSOT.md)의 공식/회원 자료 구분이 이를 전제한다). 자체 작성 자료에 URL 을 강제하면 **자료 등록 자체가 불가능해진다.** 05 가 선택 필드로 둔 것은 이 때문이며, 그 판단 자체는 옳았다.

**결정 — 필수 필드 `sourceType` 을 신설하고 분기로 강제한다.**

```
sourceType : "original" | "external"        (필수)
resourceUrl: string                          ("external" 일 때만 필수, "original" 이면 금지)
```

Rules 검사:
```
&& request.resource.data.sourceType in ['original', 'external']
&& (
     (request.resource.data.sourceType == 'external'
       && request.resource.data.resourceUrl is string
       && request.resource.data.resourceUrl.size() > 0
       && request.resource.data.resourceUrl.size() <= 2048)
     || (request.resource.data.sourceType == 'original'
       && !('resourceUrl' in request.resource.data))
   )
```

이로써 **출처 표기는 언제나 필수**가 되고(FR-M08 충족), 자체 작성 자료는 `sourceType: "original"` 로 그 사실을 명시적으로 선언하는 것이 출처 표기가 된다. "출처 미상"으로 남겨두는 경로가 사라진다는 점이 이 결정의 핵심이며, 이것이 FR-M08 이 실제로 요구한 것이다.

**영향**: 05 §2.5 필드 표에 `sourceType` 추가 + `resourceUrl` 조건부 필수로 변경 · 06 materials create/update 규칙에 위 검사 추가 · 09 GOOSE-06 자료 등록 폼에 출처 유형 라디오 추가 · 10 에 §3.24 AT-108(외부)·AT-109(직접 작성) 신설.

**재검토 조건** — 세 번째 출처 유형(예: 오프라인 자료·도서)이 필요해지면 `sourceType` enum 을 확장하고 분기를 추가한다.

---

## D-022 · 탈퇴 익명화를 표시 시점 보정(Q18)에 의존하기로 확정

**배경 — 보안 SSOT 의 전제가 정본과 충돌**

[06 §13.2](./06-SECURITY-AND-MODERATION-SSOT.md) 는 탈퇴 익명화 설계의 근거로 "CANON D절에
`posts`/`comments` 문서 내 표시명 캐시 필드(`authorDisplayName` 등)가 정의되어 있지 않고
`authorUid` 만 정의되어 있다"고 서술한다. 그러나 정본 [05 §2.4·§2.5](./05-DATA-MODEL-SSOT.md) 는
`posts`/`comments`/`materials` 에 `authorDisplayName`(필수)·`authorPhotoUrl`(선택) denormalize 캐시를
명시한다(D-019 로 06·07·09 가 이 필드명을 따르기로 확정). 06 §13.2 의 전제는 **사실과 다르다.**

**이것이 왜 위험한가**

06 §13.2 는 "모든 화면이 `authorUid` 로 `profiles` 를 조회해 표시명을 가져오므로 `profiles/{uid}`
한 번의 스크럽으로 충분하다"고 가정한다. 그런데 05 §6 의 표시 시점 보정(Q18) 설계에 따르면
목록/상세의 **첫 페인트는 저장된 `authorDisplayName` 스냅샷을 그대로 그린다**. 즉 이 보정이 실제로
구현·동작하지 않으면 탈퇴 회원의 실명이 캐시 스냅샷으로 계속 노출된다. 보정의 존재 여부가
**개인정보 공개 결함**과 직결된다.

**결정 — 06 §13.2 의 전제를 바로잡고, 익명화의 성공 조건을 표시 시점 보정으로 고정한다.**

1. 캐시 필드는 존재한다(05 §2). 탈퇴 시 콘텐츠 문서를 순회해 `authorDisplayName` 을 덮어쓰는 방식은
   **채택하지 않는다** — 문서가 수십만 건이 될 수 있고 "작성 시점 스냅샷"의 의미를 깨며 쓰기 폭주를
   일으킨다.
2. 익명화는 06 §13.1 절차대로 `profiles/{uid}` 단일 지점 스크럽 + 05 §6 표시 시점 보정(Q18)이 화면을
   "탈퇴한 회원"으로 교체함으로써 완성된다.
3. 이 보정이 동작하지 않아 탈퇴 회원의 실명 스냅샷이 계속 표시되면 **Critical 결함**으로 분류한다
   (10 §3.24 AT-106 이 회귀 테스트).
4. 06 §13.2 의 "`authorDisplayName` 이 정의되어 있지 않다"는 서술은 아래 영향 표대로 교체한다.

**영향**

| 문서 | 조치 |
|---|---|
| [06 §13.2](./06-SECURITY-AND-MODERATION-SSOT.md) | 전제 서술 교체(캐시 필드 존재 명시 + 표시 시점 보정 의존 명문화) |
| [10 §3.24](./10-ACCEPTANCE-TEST-PLAN.md) | AT-106(탈퇴 후 익명화) 신설 — 실명 계속 노출 시 Critical |

**재검토 조건** — 표시 시점 보정 구현 비용이 커져, 콘텐츠 작성 시점부터 표시명을 `profiles` 값으로만
그리는 방식(캐시 스냅샷 폐기)으로 선회할 때.

---

## D-023 · 비밀번호 재설정을 V1 Must로 확정 — 별도 라우트 없이 이메일 발송으로 구현

**배경 — Must FR 와 패킷의 "구현 안 함" 선언이 정면 충돌**

[01 PRD](./01-PRODUCT-PRD.md) FR-A12(비밀번호 재설정)는 **Must** 다. 그러나 [09 GOOSE-02](./09-GOOSE-IMPLEMENTATION-PACKETS.md) OPEN-02 는 "재설정 흐름의 라우트/화면이 라우트 정본에 없다"는 이유로 **"V1 구현하지 않는다"**고 선언한다. Must 요구사항을 근거 없이 비목표로 만드는 것은 정합성 검사(§13 "일관된 V1 범위")에 위배된다.

**결정 — V1 구현을 확정하되, 별도 라우트는 신설하지 않는다.**

Firebase Auth 의 `sendPasswordResetEmail` 은 라우트·화면이 필요 없다. 로그인 화면의 "비밀번호를 잊으셨나요" 링크가 이메일 발송을 호출하고, 재설정 자체는 Firebase 가 발송한 이메일의 표준 링크에서 수행된다(전부 클라이언트 SDK — 정적 export 와 무관).

- 구현: 로그인 화면 하단 링크 → `sendPasswordResetEmail(auth, email)` → 성공/실패 안내.
- 검증: 10 §3.24 AT-104 (FR-A12 커버).

**영향**

| 문서 | 조치 |
|---|---|
| [09 OPEN-02](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | "V1 구현하지 않는다" → **해소**: 로그인 화면 `sendPasswordResetEmail` 호출로 구현 |
| [10 §3.24](./10-ACCEPTANCE-TEST-PLAN.md) | AT-104 로 반영 완료 |

**재검토 조건** — 재설정 전용 라우트(별도 화면)가 필요해지면 그때 라우트 정본에 추가한다.

---

## D-024 · 공지 관리를 `/admin/posts` 의 `isPinned` 토글로 확정 — `/admin/notices` 라우트 신설 안 함

**배경 — 세 문서가 서로 다른 라우트 존재를 전제**

[05 §2.4](./05-DATA-MODEL-SSOT.md) 는 "`/admin/notices` 는 `isPinned` 를 `true` 로 설정한 게시글 목록이다"라고 규정한다. [08](./08-IMPLEMENTATION-ROADMAP.md) Phase 8 은 수정 범위에서 `/admin/notices` 를 **제외**하고, [09](./09-GOOSE-IMPLEMENTATION-PACKETS.md) OPEN-03 은 "/admin/notices 라우트 자체를 생성하지 않는다"고 선언한다. 그런데 10 AT-115 의 절차는 "/admin/notices 에서 대상 글의 `isPinned=true` 설정"을 전제해, **어느 라우트에서 토글하는지가 세 문서 사이에서 모순**된다.

**결정 — FR-G09(공지 관리)는 별도 라우트 없이 두 지점으로 구현한다.**

1. 관리자: `/admin/posts` 목록에서 대상 글의 `isPinned` 를 직접 토글(05 §2.4 — admin 만, Security Rules role 검사 후 직접 필드 write, 콜러블 미경유).
2. 사용자: 커뮤니티 목록이 `(status ASC, isPinned DESC, createdAt DESC)` 인덱스로 공지를 상단 고정.

`/admin/notices` 라우트는 V1 에서 생성하지 않는다(08 수정 범위·09 OPEN-03 선언이 맞다). 05 §2.4 의 "`/admin/notices` 는 … 목록이다"는 **커뮤니티 목록의 공지 상단 고정 동작**을 설명한 것으로 다듬는다(라우트 존재를 뜻하지 않음).

**영향**

| 문서 | 조치 |
|---|---|
| [05 §2.4](./05-DATA-MODEL-SSOT.md) | `isPinned` 설명을 상단 고정 + `/admin/posts` 토글로 다듬음 |
| [08 OPEN-06](./08-IMPLEMENTATION-ROADMAP.md) | 해소: `isPinned` 필드 사용 확정, `isNotice` 플래그 신설 안 함 |
| [09 OPEN-03](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | 해소: `/admin/notices` 라우트 미생성 유지 |
| [10 AT-115](./10-ACCEPTANCE-TEST-PLAN.md) | 절차 1 을 `/admin/posts` 에서 토글로 수정 |

**재검토 조건** — 운영에서 공지 작성·예약 발송 기능이 요구되면 그때 `admin_notice` 알림과 함께 별도 라우트를 설계한다.

---

## D-025 · V1 사용자 이미지 저장소 ImageKit + Cloudflare Worker로 확정

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | **SUPERSEDED (by D-026)** |
| **결정** | V1 사용자 이미지 저장소는 **ImageKit**을 사용하며, 업로드 인증과 삭제 등 비밀키가 필요한 작업은 **Cloudflare Worker**가 담당한다. **Firebase Storage와 Firebase Cloud Functions는 V1에서 사용하지 않는다.** |

**배경**

[01 PRD](./01-PRODUCT-PRD.md) FR-P06(게시글 이미지 첨부)·FR-M07(교육자료 이미지 첨부)를 충족하려면 이미지 저장소가 필요하다. 기존 CANON은 Firebase Storage + Cloud Functions(이미지 변환) 조합을 전제했으나, 이는 (1) Spark 요금제 한도(Storage 5GB, 일일 다운로드 20MB)에 부적합하고, (2) 이미지 변환·최적화를 위해 Cloud Functions(Blaze 전제)가 필수라 운영 비용·복잡도가 커진다. 운영자는 **비용 최소화**를 목표로 Spark 요금제를 유지하면서도 사용자 경험(즉시 업로드)을 충족하는 구성을 요구했다.

**검토한 옵션**

| | Option A — ImageKit + Cloudflare Worker | Option B — Firebase Storage + Functions (기존) | Option C — 외부 이미지 URL만 허용 | Option D — Cloudinary unsigned upload |
|---|---|---|---|---|
| 저장 비용 | 무료 플랜 20GB 저장소, 20GB/월 전송량 | Spark 5GB, 일일 다운로드 20MB — UGC 부적합 | 저장소 불필요 | 무료 크레딧 의존 |
| 인증/보안 | Worker가 Firebase ID Token 검증 후 일회성 업로드 토큰 발급. Private Key는 Worker Secret에만 존재 | Storage Rules로 검증, 다만 Functions 없이 변환 불가 | 서드파티 호스팅 신뢰 문제 | unsigned upload는 preset 노출 시 악용 위험, Firebase 인증과 통합 불가 |
| 이미지 변환 | 내장(WebP, 리사이즈, 품질) — 별도 서버 불필요 | Blaze 전환 + Functions 필요 | 불가 | 일부 지원 |
| 운영 복잡도 | Worker 1개로 인증 전담, Firebase 의존성 감소 | Functions + Storage + Rules 다중 관리 | 사용자 부담 전가 | preset 관리 |
| 무료 한도 | 70/85/95% 운영 정책으로 대응 | 20MB/일 한도에 즉시 도달 | 해당 없음 | 크레딧 소진 시 정지 |

**채택 이유**

1. **비용**: ImageKit 무료 플랜(20GB 저장소, 20GB/월 전송)은 V1 예상 UGC 이미지 트래픽에 충분하다. Firebase Storage Spark(5GB, 20MB/일 다운로드)는 커뮤니티 이미지에 수일 내 한도 도달이 예상된다.
2. **보안**: Cloudflare Worker가 Firebase ID Token을 검증하고 ImageKit 일회성 업로드 인증값을 발급한다. `IMAGEKIT_PRIVATE_KEY`는 Worker Secret으로만 저장되어 브라우저/정적 번들에 노출되지 않는다. 업로드 목적·파일 수·MIME·크기 제한을 Worker에서 검증하므로 Firestore Rules만으로는 어려운 서버 측 검증이 가능하다.
3. **기능**: ImageKit이 WebP 변환·리사이즈·품질 최적화·EXIF 제거를 내장한다. 클라이언트 전처리(1600px, WebP, quality 80)와 결합하여 저장·전송 비용을 최소화한다.
4. **운영**: Cloud Functions 제거로 Firebase Spark 요금제 유지가 가능해진다. 이미지 인프라의 책임 경계가 명확하다(Firestore = 메타데이터, ImageKit = 파일, Worker = 인증·삭제).

**기각 이유**

- **Option B**: Spark 요금제 한도 부족 + 이미지 변환을 위한 Blaze 전환 비용·운영 부담. 무료 한도 도달 시 자동 유료 전환을 전제로 할 수 없다.
- **Option C**: 사용자가 외부 호스팅을 찾아야 하는 부담, 품질/가용성 통제 불가, 만료 링크 문제. "작성 화면에서 즉시 업로드"라는 운영자 요구를 충족하지 못한다.
- **Option D**: unsigned upload는 보안 통제가 약하고 Firebase Auth 사용자 검증과 통합이 어렵다.

**비용**

| 항목 | 구성 |
|---|---|
| ImageKit | 무료 플랜: 20GB 저장소, 20GB/월 전송 |
| Cloudflare Worker | 무료 플랜: 10만 요청/일 |
| Firebase | Spark 요금제 유지: Auth + Firestore 읽기/쓰기 |

**보안**

- `IMAGEKIT_PRIVATE_KEY`는 Cloudflare Worker Secret으로만 저장 (브라우저/Next.js 번들 포함 금지)
- 공개 가능한 값(`NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`, `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`)만 클라이언트 환경변수 사용
- 업로드 인증 흐름: Firebase 로그인 → ID Token 획득 → Worker 업로드 인증 엔드포인트 호출 → Worker가 토큰 검증 + 회원 상태 확인 + 업로드 목적·수·MIME·크기 제한 확인 → ImageKit 일회성 인증값 반환 → 브라우저가 ImageKit에 직접 업로드 → 반환 메타데이터를 Firestore `mediaAssets`에 저장
- `pending_member`·정지·거절·탈퇴 상태 사용자는 업로드 인증값을 받을 수 없다
- 실제 ImageKit 파일 삭제는 Worker의 인증된 삭제 엔드포인트 또는 관리자 수동 절차로만 수행 (Private Key가 브라우저에 없으므로)

**운영 복잡도**

- 새 운영 구성요소 2개 추가(ImageKit 계정, Cloudflare Worker) — 그러나 Firebase Storage + Functions보다 관리가 단순하다
- V1 자동 정리 작업 미구현 전제: 관리자가 임시(`temporary`)·삭제 대기(`pending_delete`) 이미지를 조회·정리할 수 있는 운영 절차 문서화 (ImageKit 대시보드 수동 삭제)
- ImageKit 사용량 자동 조회 API가 V1에서 제공되지 않으면 관리자 대시보드 수동 입력/운영 체크리스트 방식으로 사용량을 관리한다

**무료 한도**

| 사용량 | 조치 |
|---|---|
| 70% | 관리자 경고 |
| 85% | 관리자에게 강한 경고 |
| 95% | 일반 회원 신규 업로드 차단 (관리자는 정리 작업만 가능) |
| 100% 전 | 한도 초과 전 업로드 차단 |

**데이터 계약**

- 새 컬렉션: `mediaAssets/{mediaAssetId}`
- `MediaAsset` 타입(provider: `"imagekit"`, 상태 `temporary | attached | pending_delete | deleted`)은 [05 §2.16](./05-DATA-MODEL-SSOT.md)에 정본 편입 (D-019 규칙: 필드명·제약의 정본은 05 하나)
- 게시글·자료에는 전체 메타데이터를 중복 저장하지 않고 `mediaAssetIds: string[]`만 저장

**재검토 조건**

- ImageKit 무료 저장·전송 한도 도달
- 월간 활성 사용자 증가(약 1,000명 초과 시 재검토)
- 파일 첨부(PDF·ZIP 등) 요구
- 영상 업로드 요구
- 악용 대응이 Worker만으로 어려워짐
- 자체 서버 또는 Blaze 전환 승인

**영향**

| 문서 | 반영 내용 |
|---|---|
| [01 PRD](./01-PRODUCT-PRD.md) | FR-P06/M07 업로드 방식 ImageKit+Worker로 교체, OPEN-P02 해소 |
| [03 흐름·권한](./03-USER-FLOWS-AND-PERMISSIONS.md) | 업로드 플로우·mediaAssets 권한 갱신 |
| [04 아키텍처](./04-TECHNICAL-ARCHITECTURE.md) | Storage/Functions 제거, ImageKit/Worker 추가, Spark 유지 |
| [05 데이터 모델](./05-DATA-MODEL-SSOT.md) | `mediaAssets` 컬렉션 + `MediaAsset` 타입 편입, `mediaAssetIds` 필드 |
| [06 보안](./06-SECURITY-AND-MODERATION-SSOT.md) | Storage Rules/Cloud Functions 제거, mediaAssets Rules + Worker 보안 모델 추가 |
| [07 콘텐츠 거버넌스](./07-CONTENT-GOVERNANCE-SSOT.md) | 이미지 업로드 거버넌스 갱신 |
| [08 로드맵](./08-IMPLEMENTATION-ROADMAP.md) | Phase 1/6 Storage·Functions 제거, GOOSE-04A(이미지 인프라) 추가 |
| [09 구현 패킷](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | GOOSE-01/04/06 갱신, GOOSE-04A 신설 |
| [10 테스트](./10-ACCEPTANCE-TEST-PLAN.md) | 이미지 업로드 테스트 20건+ 추가 |
| [12 완료 보고](./12-PLANNING-COMPLETION-REPORT.md) | OPEN 해소 현황 갱신 |

---

## D-026 · V1 이미지 저장소 = Firebase Storage, ImageKit/Cloudflare Worker 미사용

| 항목 | 내용 |
|---|---|
| **날짜** | 2026-08-07 |
| **상태** | 확정 |
| **결정** | V1 사용자 생성 이미지 저장소는 **Firebase Storage**를 사용한다. **ImageKit과 Cloudflare Worker는 사용하지 않는다.** Firebase Blaze 요금제를 허용하며, 목표 월 비용 $0, 무료 할당량 중심 운영. Budget $5, 알림 $1/$3/$5, 비용 $7 부근 비상 대응, 희망 월 최대 비용 $10 미만. Google Cloud 비용 집계 지연으로 $10 절대 하드캡은 보장하지 않음. |

**배경**

D-025는 ImageKit + Cloudflare Worker 조합을 채택했으나, 다음 사유로 Firebase Storage로 전환한다:
1. **운영 단순화**: ImageKit 계정 + Cloudflare Worker 2개 외부 서비스 관리 부담. Firebase Storage 1개로 통합.
2. **비용 예측 가능성**: Blaze 요금제에서 Storage 무료 할당량(5GB 저장, 20GB/월 다운로드)으로 V1 시작 가능. 비용 $0 목표.
3. **Spark 한계 극복**: Blaze 요금제 허용으로 Storage 5GB/20MB 제한 해소. Cloud Functions 이미지 변환은 선택사항.
4. **규칙 통합**: Firestore Security Rules + Storage Rules를 Firebase 단일 권한 모델로 관리.

**V1 Storage 정책**

| 항목 | 값 |
|---|---|
| 이미지 형식 | WebP |
| 최대 해상도 | 긴 변 1600px |
| 최대 파일 크기 | 700KB |
| 게시글 최대 이미지 | 3장 |
| 회원 자료 최대 이미지 | 5장 |
| 관리자 자료 최대 이미지 | 10장 |

**비용 정책**

| 항목 | 값 |
|---|---|
| 요금제 | Firebase Blaze (종량제) |
| 목표 월 비용 | $0 (무료 할당량 내) |
| 예산 경고 | $5 |
| 알림 | $1 / $3 / $5 |
| 비상 대응 | $7 이상 발생 시 |
| 희망 최대 | $10 미만 |
| 하드캡 | 없음 (GCP 비용 집계 지연으로 절대 보장 불가) |

**영향**

| 문서 | 반영 내용 |
|---|---|
| [01 PRD](./01-PRODUCT-PRD.md) | FR-P06/M07: Firebase Storage 업로드로 변경, ImageKit/Worker 제거 |
| [03 사용자 흐름·권한](./03-USER-FLOWS-AND-PERMISSIONS.md) | Storage 업로드 흐름·mediaAssets 권한 갱신 |
| [04 기술 아키텍처](./04-TECHNICAL-ARCHITECTURE.md) | ImageKit/Worker 제거, Firebase Storage 추가, Blaze 허용 |
| [05 데이터 모델](./05-DATA-MODEL-SSOT.md) | `mediaAssets.provider`에 `firebase_storage` 추가 |
| [06 보안](./06-SECURITY-AND-MODERATION-SSOT.md) | Storage Rules 복원, mediaAssets Rules + Storage Rules 기본 원칙 추가 |
| [07 콘텐츠 거버넌스](./07-CONTENT-GOVERNANCE-SSOT.md) | 이미지 업로드 거버넌스 갱신 |
| [08 로드맵](./08-IMPLEMENTATION-ROADMAP.md) | Phase 1/6 Storage/Functions 복원, GOOSE-04A(이미지 인프라) 갱신 |
| [09 구현 패킷](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | GOOSE-01/04/06 갱신, GOOSE-04A ImageKit → Firebase Storage |
| [10 테스트](./10-ACCEPTANCE-TEST-PLAN.md) | 이미지 업로드 테스트 갱신 |
| [12 완료 보고](./12-PLANNING-COMPLETION-REPORT.md) | D-025 해결 항목 → D-026 기준 갱신 |

---

## 결정 요약표

| ID | 결정 | 핵심 기각 대안 | 재검토 조건 |
|---|---|---|---|
| D-001 | 정적 export + 클라이언트 SDK + Functions | App Hosting/SSR | UGC SEO 필요성 대두 |
| D-002 | 정적 셸 + Hosting rewrites | 쿼리 파라미터 / 전체 프리렌더 | Next.js 공식 지원 |
| D-003 | claims 권위 + Firestore 미러 | 문서만 / claims만 | claim 즉시 무효화 지원 |
| D-004 | 단일 `posts` + category | 게시판별 컬렉션 | 문서 수 수십만 건 |
| D-005 | 전역 `comments` + targetType | 서브컬렉션 | — |
| D-006 | 결정론적 ID + 트리거 카운터 | 쿼리 확인 / 클라이언트 카운터 | — |
| D-007 | 결정론적 ID, 카운터 없음 | — | 북마크 수 공개 요구 |
| D-008 | 알림 서버 전용 생성 | 클라이언트 생성 | — |
| D-009 | 인증 ≠ 참여 권한 | approved 플래그 | — |
| D-010 | 역할 6개 전부 V1 포함 | 4개로 축소 후 확장 | — |
| D-011 | 9개 callable Function 확정 | Rules만으로 관리자 조작 | — |
| D-012 | 정적 검색 유지, 커뮤니티는 필터 | 외부 검색 서비스 | 게시글 1,000건 초과 |
| D-013 | 진행률 계정 동기화 미실시 | V1 포함 | V2 |
| D-014 | 카테고리 8개 시드 데이터 | 코드 상수 | — |
| D-015 | `docs/community-platform/` 신규 | 기존 문서 수정 | — |
| D-016 | V1 = Phase 0~10 전체 | Phase 4 베타 출시 | — |
| D-017 | 멱등 콜러블 `bootstrapUserAccount` | Auth 블로킹 함수 / gen1 onCreate 트리거 | Identity Platform 도입 시 |
| D-018 | `reports` 결정론적 ID | 자동 생성 ID + 중복 허용(05 원안) | 사유별 다중 신고 요구 반복 시 |
| D-019 | 필드명 정본 = 05, 나머지 문서가 05를 따름 | 다수결 / 문서별 자율 | 05 자체 개정 시 전 문서 동시 갱신 |
| D-020 | `linkedRefs` = `Array<{type,id}>`, 05에 편입 | 스칼라 `linkedLessonSlug`(08 원안) | 연결 대상 3종 초과 시 enum 확장 |
| D-021 | `sourceType` 분기로 출처 필수화 | `resourceUrl` 무조건 필수 / FR-M08 완화 | 오프라인·도서 등 3번째 유형 필요 시 |
| D-022 | 탈퇴 익명화를 표시 시점 보정(Q18)에 의존 | 콘텐츠 문서 순회로 `authorDisplayName` 일괄 덮어쓰기 | 보정 구현 비용 대비 작성 시점 익명화 방식 필요 시 |
| D-023 | 비밀번호 재설정을 V1 Must 로 확정 — 라우트 없이 `sendPasswordResetEmail` 이메일 발송 | V1 비구현(09 OPEN-02 원안) | 재설정 전용 라우트 필요 시 |
| D-024 | 공지 = `/admin/posts` `isPinned` 토글 + 목록 상단 고정, `/admin/notices` 라우트 신설 안 함 | 별도 `/admin/notices` 라우트 | 공지 작성·예약 발송 요구 시 |
| D-025 | V1 이미지 저장소 = ImageKit + Cloudflare Worker, Firebase Storage/Functions V1 미사용 | Firebase Storage + Functions / 외부 URL만 / Cloudinary unsigned | ImageKit 한도 도달·Blaze 승인 시 |
