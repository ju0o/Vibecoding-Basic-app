# 10. 수용 테스트 계획 (Acceptance Test Plan)

> 대상: AI_VIBE_CODING_MASTER 커뮤니티 플랫폼 전환 (V1, Phase 0~10)
> 정본 어휘: CANON — 역할·enum·Firestore 경로·라우트·Cloud Functions 정본 (§11 OPEN-01 참고: 발행본 문서 파일명 미확정)
> 작성 원칙: 코드에서 확인한 사실은 "현재:", 제안·목표값은 "목표:"로 구분. 미결정은 `OPEN-nn`.

---

## 1. 문서 목적 · 관련 문서 · 테스트 계층 정의

### 1.1 목적

이 문서는 커뮤니티 플랫폼(회원가입·게시글·댓글·좋아요·북마크·교육자료·신고·알림·관리자 기능) 전체를 **출시 가능 상태로 판정하기 위한 수용 테스트 기준**을 정의한다. 대상 범위는 CANON §B D-010이 정의한 V1 범위(Phase 0~10 전부)이며, 기존 52개 학습 라우트·용어사전·Atlas·커리큘럼·검색·localStorage 진행률 등 **기존 자산의 회귀 없음**도 동일한 수용 기준에 포함한다.

### 1.2 관련 문서

본 문서 초안 작성 시점에는 다른 문서가 아직 발행되지 않아 **목표(제안) 문서명**을 사용했다. 발행 완료 후 아래와 같이 **실제 파일명으로 확정**한다. `OPEN-01`은 이로써 해소되었다.

| 번호 | 실제 파일명 (확정) | CANON 대응 절 | 내용 |
|---|---|---|---|
| 00 | [`00-CURRENT-STATE-AUDIT.md`](./00-CURRENT-STATE-AUDIT.md) | §A | 검증된 현재 상태, 라우트 52개 실측, 문서 드리프트 |
| 01 | [`01-PRODUCT-PRD.md`](./01-PRODUCT-PRD.md) | 전체 | 제품 요구사항, FR 목록, 성공 지표 |
| 02 | [`02-INFORMATION-ARCHITECTURE.md`](./02-INFORMATION-ARCHITECTURE.md) | §F | 정보 구조, 라우트 정본 |
| 03 | [`03-USER-FLOWS-AND-PERMISSIONS.md`](./03-USER-FLOWS-AND-PERMISSIONS.md) | §C | 사용자 흐름, 역할 6종 정본 |
| 04 | [`04-TECHNICAL-ARCHITECTURE.md`](./04-TECHNICAL-ARCHITECTURE.md) | §B D-001~D-002 | 런타임·라우팅 아키텍처 |
| 05 | [`05-DATA-MODEL-SSOT.md`](./05-DATA-MODEL-SSOT.md) | §D, §E | Firestore/Storage 경로, enum 정본 |
| 06 | [`06-SECURITY-AND-MODERATION-SSOT.md`](./06-SECURITY-AND-MODERATION-SSOT.md) | §D, §E, §H | Rules 명세, 모더레이션, callable·트리거 정본 |
| 07 | [`07-CONTENT-GOVERNANCE-SSOT.md`](./07-CONTENT-GOVERNANCE-SSOT.md) | §G | 콘텐츠 거버넌스, 카테고리 시드 정본 |
| 08 | [`08-IMPLEMENTATION-ROADMAP.md`](./08-IMPLEMENTATION-ROADMAP.md) | §B D-010 | Phase 0~10 로드맵 |
| 09 | [`09-GOOSE-IMPLEMENTATION-PACKETS.md`](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | 전체 | 구현 에이전트용 작업 패킷 |
| 10 | `10-ACCEPTANCE-TEST-PLAN.md` | 전체 | 본 문서 |
| 11 | [`11-DECISION-LOG.md`](./11-DECISION-LOG.md) | §B | 결정 로그 D-001~D-024 |
| 12 | [`12-PLANNING-COMPLETION-REPORT.md`](./12-PLANNING-COMPLETION-REPORT.md) | 전체 | 기획 완료 보고 |

이 문서 안에서 "CANON §X"는 위 정본 어휘의 원본 작업 노트를 가리킨다. 발행본이 확정된 지금, **정본의 효력은 위 표의 실제 문서에 있으며 CANON 작업 노트는 이력 참고용**이다. 두 내용이 다르면 발행본이 우선한다.

### 1.3 Phase 0~10 기능 매핑 (목표, 제안)

CANON §B D-010은 "V1 범위 = Phase 0~10 전부"만 규정하고 Phase별 기능 범위는 명시하지 않는다. 아래는 §3 테스트 케이스 표의 "관련 Phase" 열을 채우기 위한 **목표(제안) 매핑**이며, 실제 로드맵 문서 [`08-IMPLEMENTATION-ROADMAP.md`](./08-IMPLEMENTATION-ROADMAP.md)가 발행되었으므로, 그 Phase 정의와 대조해 확정한다(`OPEN-02` 해소).

| Phase | 범위 |
|---|---|
| 0 | 기반 설정 — Firebase SDK 설치, 프로젝트 연동, 에뮬레이터 구성, 환경변수 추가, 기존 자산 회귀 기준선 |
| 1 | 인증 — 회원가입/로그인/로그아웃/이메일 인증, 초기 claim(guest→pending_member) |
| 2 | 회원 승인 — `membershipApplications`, `setUserRole`, `reviewMembershipApplication` |
| 3 | 프로필 — `profiles/{uid}`, `/onboarding/profile`, `/members` |
| 4 | 게시글 — `posts` CRUD, `categories`(kind=community), `/community/*` |
| 5 | 댓글 — `comments` CRUD, `commentCount` 트리거 |
| 6 | 반응·북마크 — `reactions`, `bookmarks`, `likeCount` 트리거 |
| 7 | 교육자료 — `materials` CRUD·상태 전이, `categories`(kind=material), `/materials/*` |
| 8 | 신고·모더레이션 — `reports`, `moderationActions`, `moderatePost`, `deleteCommentByModerator`, `resolveReport` |
| 9 | 알림 — `notifications/{uid}/items`, 트리거 4종 |
| 10 | 관리자·운영 — `/admin/*`, `adminLogs`, `suspendUser`/`restoreUser`, `reviewCategoryRequest`, 최종 배포 |

### 1.4 테스트 계층 정의

| 계층 | 목적 | 도구 | 실행 위치 | 실행 시점 |
|---|---|---|---|---|
| 단위(Unit) | 순수 함수 로직 검증 (Firebase 의존 없음) | Vitest 4.1.9 (`npm run test`) | 로컬/CI | 매 커밋 |
| Rules 단위(Rules Unit) | Firestore/Storage Security Rules 자체의 허용/거부 검증 | `@firebase/rules-unit-testing` + Vitest, Firestore/Storage 에뮬레이터 | 로컬/CI (에뮬레이터 기동 필요) | Rules 변경 시, Phase 종료 시 |
| 통합(Integration, 에뮬레이터) | 클라이언트 SDK + Rules + Cloud Functions(에뮬레이터)를 엔드투엔드로 결합해 트리거·카운터·알림까지 검증 | Vitest + Firebase JS SDK + Firebase Emulator Suite(Auth/Firestore/Storage/Functions) | 로컬/CI | Phase 종료 시, 배포 전 |
| 수동 E2E | 실제 브라우저에서 사람이 화면 흐름·시각 요소·접근성을 확인 | 브라우저(에뮬레이터 프론트엔드 연결) | 로컬 | Phase 종료 시, 배포 직전 |
| 회귀(Regression) | 기존 52개 라우트·검증 파이프라인이 여전히 정상 동작하는지 확인 | `npm run verify`, 라우트 검사 스크립트(§5) | 로컬/CI | 매 Phase 종료 시 필수 |

---

## 2. 테스트 환경

### 2.1 Firebase Emulator Suite

현재: `package.json`에 `firebase`, `firebase-admin`, `firebase-tools`, `@firebase/rules-unit-testing` 의존성이 전혀 없다(CANON §A). 아래는 Phase 0에서 devDependencies에 추가해야 할 **목표(제안) 구성**이다.

목표: `firebase.json`에 아래 `emulators` 블록을 추가한다(신규 최상위 키, 기존 `hosting` 키와 병존).

```json
{
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "storage": { "port": 9199 },
    "functions": { "port": 5001 },
    "ui": { "enabled": true, "port": 4000 },
    "singleProjectMode": true
  }
}
```

| 에뮬레이터 | 포트 | 용도 |
|---|---|---|
| Authentication | 9099 | 6종 역할 테스트 계정 생성/로그인/커스텀 클레임 |
| Firestore | 8080 | 모든 컬렉션 읽기/쓰기, Rules 검증 |
| Storage | 9199 | `uploads/{uid}/{yyyyMM}/{fileId}.{ext}` 업로드 검증 |
| Functions | 5001 | callable 10종(`bootstrapUserAccount` 포함, [11 D-017](./11-DECISION-LOG.md)) + 트리거 6종 로컬 실행 |
| Emulator UI | 4000 | 수동 확인(계정 목록, Firestore 데이터, 요청 로그) |

목표: `firebase use ju0o-ec967` 프로젝트를 그대로 쓰되, 모든 에뮬레이터 테스트는 `FIRESTORE_EMULATOR_HOST=127.0.0.1:8080`, `FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099`, `FIREBASE_STORAGE_EMULATOR_HOST=127.0.0.1:9199` 환경변수로 프로덕션 프로젝트에 절대 연결되지 않도록 강제한다.

### 2.2 시드 데이터 준비

`firebase emulators:start` 기동 후, §8에서 정의하는 시드 스크립트(목표: `scripts/seed-emulator.mjs`, `firebase-admin` SDK를 Admin 권한으로 에뮬레이터에 연결)를 실행해 역할별 테스트 계정과 게시글/자료/댓글/반응/북마크/카테고리 시드를 생성한다. 에뮬레이터는 재시작 시 데이터가 초기화되므로, `firebase emulators:start --import=./emulator-seed --export-on-exit`로 시드 스냅샷을 저장/재사용하는 것을 목표로 한다.

### 2.3 테스트 계정 6종 생성 절차

CANON §C 역할 정본에 따라 아래 6개 역할 각 1개씩 + 소유권 충돌 테스트용 보조 계정 2개(memberB, memberC)를 만든다.

| 계정 | 역할(claim) | users.status | 이메일(목표 명명 규칙, `OPEN-07`) | emailVerified | 용도 |
|---|---|---|---|---|---|
| guest | 없음(비인증) | — | 계정 생성 안 함, 로그아웃 상태로 테스트 | — | §3 비회원 케이스 |
| pending | pending_member | active | qa.pending@test.local | true | §3 승인 대기 차단 케이스 |
| memberA | member | active | qa.membera@test.local | true | §3 게시글/댓글/좋아요 기본 케이스(소유자) |
| memberB | member | active | qa.memberb@test.local | true | §3 "타인 게시글" 소유권 충돌 케이스 |
| trusted | trusted_member | active | qa.trusted@test.local | true | §3 자료 즉시 게시 케이스 |
| mod | moderator | active | qa.mod@test.local | true | §3 신고 처리 케이스 |
| admin | admin | active | qa.admin@test.local | true | §3 관리자 전권 케이스 |

생성 절차(목표, `scripts/seed-emulator.mjs` 내부 로직):

1. `admin.auth().createUser({ email, password: "Qa!2345678", emailVerified: true })`로 6개 계정(guest 제외) 생성.
2. `admin.auth().setCustomUserClaims(uid, { role })`로 pending/memberA/memberB는 `"member"` 또는 `"pending_member"`, trusted/mod/admin은 각각 `"trusted_member"`/`"moderator"`/`"admin"` 설정.
3. `admin.firestore().doc("users/" + uid).set({ role, status: "active", createdAt: FieldValue.serverTimestamp() })`로 미러 문서 생성(CANON §D-003).
4. `admin.firestore().doc("profiles/" + uid).set({ displayName, bio, createdAt: ... })`로 표시 프로필 생성.
5. pending 계정은 4번을 건너뛰고 `membershipApplications/{uid}`를 `status: "submitted"`로만 생성해 "승인 대기" 상태를 재현.
6. 생성된 `{email, uid, idToken}` 목록을 `scratchpad`(또는 로컬 `.emulator-accounts.json`, `.gitignore` 대상)에 출력해 수동 E2E 로그인에 재사용.

### 2.4 정리(cleanup)

각 통합 테스트 스위트는 `beforeEach`에서 `testEnv.clearFirestore()` / `testEnv.clearStorage()`를 호출하고, 계정 자체는 세션 전체에서 재사용한다(재생성 비용 절감). 세션 종료 시 `firebase emulators:start --export-on-exit`가 자동으로 스냅샷을 남기므로 다음 실행 시 `--import`로 동일 시드를 재사용하거나, 완전히 새로 시작하려면 `emulator-seed/` 디렉터리를 삭제한다.

---

## 3. 수용 테스트 케이스 표 (총 120건)

범례: 검증방식 열의 "Rules단위" = §4 코드 패턴 적용, "통합(에뮬레이터)" = Auth+Firestore+Functions 에뮬레이터 결합, "E2E" = 브라우저 수동 조작. SSOT 열의 `§X`는 §1.2의 CANON 절 번호.

### 3.1 비회원 공개 콘텐츠 열람 (AT-001~004)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-001 | 비회원 열람 | guest(미인증), `posts` status=published ≥10건 시드 | 1) 시크릿 브라우저로 `/community` 접속 2) 목록 렌더링 대기 3) "글쓰기" 버튼 클릭 | 게시글 목록(제목·작성자·카테고리·작성일)이 표시됨. "글쓰기" 클릭 시 `/login?redirect=/community/write`로 이동 | 수동 E2E | 4 | §F, §D-009 |
| AT-002 | 비회원 열람 | guest, 카테고리별 posts 시드 존재 | 1) `/community?category=free` 접속 2) 목록의 모든 항목 category 확인 3) 카테고리 탭에서 "질문·도움 요청" 클릭 4) URL이 `?category=question`으로 바뀌는지 확인 | `category` 쿼리에 해당하는 posts만 표시, status가 hidden/deleted인 문서는 제외 | 수동 E2E | 4 | §D-002, §D-004, §G |
| AT-003 | 비회원 열람 | guest, `/community/posts/{postId}` rewrite 대상 존재 | 1) 특정 postId로 `/community/posts/{postId}` 접속 2) 네트워크 탭에서 `/community/post.html` 셸 서빙 확인 3) `location.pathname` 파싱으로 postId 로드 확인 4) 댓글 목록 확인 5) "좋아요" 버튼 클릭 시도 | 상세·댓글이 읽기 전용으로 표시, 쓰기 버튼 클릭 시 로그인 유도. hidden/deleted 문서 ID 접근 시 "찾을 수 없음" 안내 | 수동 E2E | 4 | §D-002 |
| AT-004 | 비회원 열람 | guest, materials status 4종 이상 시드 | 1) `/materials` 접속 2) status 필터를 official→community로 전환 3) 카드 클릭해 `/materials/items/{materialId}` 접속 | draft/pending_review/needs_revision/archived 상태 자료는 목록·상세 어디에도 노출되지 않음. official/community만 노출 | 수동 E2E | 7 | §E MaterialStatus, §F |

### 3.2 회원가입·이메일 인증 (AT-005~009)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-005 | 가입 | 미인증, Auth 에뮬레이터 초기화 상태 | 1) `/signup` 접속 2) 이메일·비밀번호(8자 이상) 입력 후 제출 3) `createUserWithEmailAndPassword` 호출 확인 4) 가입 성공 직후 `bootstrapUserAccount` 콜러블이 1회 호출되는지 확인 5) `getIdToken(true)` 후 role claim 확인 | Auth 계정 생성 성공, `bootstrapUserAccount`가 `{ role: "pending_member", status: "active", created: true }` 반환, `users/{uid}` 미러가 `role="pending_member"`, `status="active"`로 **콜러블에 의해** 생성됨(클라이언트가 role 필드를 직접 쓰지 않음), 강제 갱신된 토큰에 `role="pending_member"` claim 존재 | 통합(에뮬레이터) | 1 | §D-003, §D-009, [D-017](./11-DECISION-LOG.md) |
| AT-006 | 이메일 인증 | 가입 직후, emailVerified=false | 1) 가입 완료 2) `sendEmailVerification` 호출을 Emulator UI에서 확인 3) 미인증 상태로 `/membership/pending` 접근 4) "가입 신청 제출" 클릭 시도 | `emailVerified=false`인 동안 "이메일 인증 후 신청 가능" 안내 표시, 신청 제출 버튼 비활성 | 수동 E2E | 1 | §D-009 |
| AT-007 | 이메일 인증 | pending 계정, emailVerified 전환 대상 | 1) Emulator UI에서 해당 계정 인증 링크 강제 발급 2) 앱 복귀 후 `/onboarding/profile` 접근 3) 표시 이름·소개 입력 후 제출 | `emailVerified=true` 확인 후 `profiles/{uid}` 생성, 성공 시 `/membership/pending`으로 이동 | 통합(에뮬레이터) + 수동 | 3 | §D(profiles/{uid}) |
| AT-008 | 가입 | 이미 가입된 이메일 존재 | 1) 기존 가입 이메일로 `/signup` 재시도 2) 제출 | `auth/email-already-in-use` 오류가 한국어로 표시, 계정 중복 생성 없음 | 통합(에뮬레이터) | 1 | §D-009 |
| AT-009 | 가입 | 미인증 | 1) `/signup`에서 5자 비밀번호 입력 2) 제출 | Firebase Auth 기본 정책(최소 6자) 위반으로 `auth/weak-password` 오류 반환, 계정 미생성 | 통합(에뮬레이터) | 1 | §D-009 |

### 3.3 로그인·로그아웃·세션 지속 (AT-010~013)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-010 | 로그인 | memberA 계정 존재(§2.3) | 1) `/login`에서 memberA 이메일/비밀번호 입력 2) 제출 3) 리다이렉트 확인 | `signInWithEmailAndPassword` 성공, 헤더에 표시 이름 노출, role=member UI(글쓰기 버튼 활성) 반영 | 통합(에뮬레이터) + 수동 | 1 | — |
| AT-011 | 로그아웃 | memberA 로그인 상태 | 1) `/me` 접근 확인 2) 로그아웃 클릭 3) `signOut` 호출 확인 4) 다시 `/me` 접근 | 로그아웃 즉시 인증 상태 초기화, `/me` 접근 시 `/login?redirect=/me`로 이동 | 수동 E2E | 1 | — |
| AT-012 | 세션 지속 | memberA 로그인 상태, `/me` 진입 | 1) `/me`에서 새로고침(F5) 2) `onAuthStateChanged` 재발화 대기 | 재로그인 없이 동일 세션 유지, role 기반 UI 동일하게 표시 | 수동 E2E | 1 | — |
| AT-013 | claim 갱신 | memberA 로그인 중, 관리자가 `setUserRole(uid,"trusted_member")` 실행 | 1) 관리자가 별도 세션에서 승격 실행 2) memberA 클라이언트에서 `getIdToken(true)` 강제 리프레시 트리거 3) 역할 배지 확인 | 리프레시 이후 `role="trusted_member"` 반영. 리프레시 전에는 기존 토큰 role 유지(즉시 전파 아님) | 통합(에뮬레이터) | 2 | §D-003 |

### 3.4 승인 대기 사용자 쓰기 차단 (AT-014~018)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-014 | 쓰기 차단 UI | pending 계정 로그인 | 1) `/community` 접속 2) "글쓰기" 버튼 상태 확인 3) `/community/write` 직접 URL 접근 | 버튼 비활성 또는 클릭 시 "승인 대기 중" 안내+`/membership/pending` 링크. 직접 URL 접근도 동일 안내로 대체 | 수동 E2E | 2 | §C |
| AT-015 | Rules 차단 | pending 컨텍스트 | 1) `setDoc(doc(db,"posts/x"), {...})` 직접 호출 | `permission-denied`, 문서 미생성 | Rules단위/통합(에뮬레이터) | 2 | §C, §D-004 |
| AT-016 | 댓글 차단 | pending 계정, 게시글 상세 진입 | 1) 댓글 입력창 상태 확인 2) devtools에서 `addDoc(collection(db,"comments"), {...})` 직접 호출 | UI 입력창 비활성+안내. 직접 SDK 호출은 `permission-denied` | Rules단위 + 수동 | 2 | §C |
| AT-017 | 좋아요 차단 | pending 계정, 게시글 상세 | 1) 좋아요 버튼 클릭 2) `setDoc(doc(db,"reactions/post__{id}__{uid}"))` 직접 호출 | UI는 안내 토스트만 표시(문서 미생성), 직접 SDK 호출은 `permission-denied` | Rules단위 + 수동 | 2/6 | §D-006 |
| AT-018 | 자료 등록 차단 | pending 계정 | 1) `/materials/new` 직접 URL 접근 2) `addDoc(collection(db,"materials"), {...})` 직접 호출 | 페이지 접근 시 안내 후 리다이렉트, 직접 쓰기 시도는 `permission-denied` | Rules단위 + 수동 | 2/7 | §C |

### 3.5 관리자 회원 승인·거절·재신청 (AT-019~023)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-019 | 신청 제출 | pending, emailVerified=true, profiles 존재 | 1) `/membership/pending`에서 "신청 제출" 클릭 2) `submitMembershipApplication` 호출 확인 | `membershipApplications/{uid}` 생성(status="submitted", docId==uid). 재제출 시 동일 문서 status="resubmitted" | 통합(에뮬레이터) | 2 | §D(membershipApplications), §H |
| AT-020 | 승인 | admin 로그인, 신청 status=submitted | 1) `/admin/members` 접속 2) 대상 선택 3) "승인" 클릭 → `reviewMembershipApplication({uid, decision:"approved"})` | 신청 status="approved", `users/{uid}.role` 미러가 "member"로 갱신, 대상 계정 custom claim role="member", `adminLogs` 1건 추가 | 통합(에뮬레이터) | 2/10 | §H, §D-003 |
| AT-021 | 거절 | admin, 신청 status=submitted | 1) 대상 선택 2) "거절" 클릭, 사유 입력 3) `reviewMembershipApplication({uid, decision:"rejected", reason})` | status="rejected", role은 pending_member 유지, `onMembershipReviewed` 트리거로 알림(membership_rejected) 생성 | 통합(에뮬레이터) | 2/9/10 | §H |
| AT-022 | 재신청 | rejected 상태 사용자 로그인 | 1) `/membership/pending`에서 "재신청" 클릭 2) `submitMembershipApplication` 재호출 | 동일 문서(`membershipApplications/{uid}`) status가 "resubmitted"로 갱신(신규 문서 생성 아님) | 통합(에뮬레이터) | 2 | §D |
| AT-023 | 권한 경계 | moderator 인증 컨텍스트 | 1) moderator로 `reviewMembershipApplication` 직접 호출 | Functions 진입부 role 검사에서 오류 반환, `adminLogs` 미생성 | 통합(에뮬레이터) | 10 | §C, §H |

### 3.6 게시글 작성·수정·삭제 (AT-024~029)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-024 | 작성 | memberA 로그인 | 1) `/community/write` 접속 2) 제목·카테고리(free)·본문 입력 3) "게시" 클릭 | `posts/{postId}` 생성(authorUid=본인, status="published", createdAt/updatedAt Timestamp), `/community/posts/{postId}`로 이동해 즉시 표시 | 통합(에뮬레이터) + 수동 | 4 | §D-004 |
| AT-025 | 수정 | memberA, 본인 게시글 존재 | 1) 상세에서 "수정" 클릭 → `/community/edit?id={postId}` 2) 제목 변경 3) "저장" 클릭 | `updatedAt` 갱신, `authorUid`/`createdAt` 불변, 변경된 제목이 목록·상세에 즉시 반영 | 통합(에뮬레이터) + 수동 | 4 | §D-004 |
| AT-026 | 삭제 | memberA, 본인 게시글 존재 | 1) 상세에서 "삭제" 클릭 2) 확인 모달 재확인 | `posts.status="deleted"`로 갱신(문서 보존), 목록·검색에서 즉시 제외, 직접 URL 접근 시 "삭제된 게시글" 안내 | 통합(에뮬레이터) + 수동 | 4 | §E PostStatus |
| AT-027 | 유효성 | memberA, `/community/write` | 1) 카테고리 미선택 상태로 "게시" 클릭 2) 본문 공백만 입력 후 재시도 | 클라이언트 유효성 검사로 제출 차단, Firestore 쓰기 요청 미발생 | 수동 E2E | 4 | — |
| AT-028 | 역할별 차이 확인 | trusted 로그인 | 1) 게시글 작성 2) 게시 직후 상태 확인 | status가 즉시 "published"(trusted_member 특혜는 materials 즉시 게시에만 적용되고 posts는 역할 무관 동일 동작임을 확인) | 수동 | 4 | §C |
| AT-029 | 목록 정렬 | memberA, `/community` 목록 존재 | 1) 현재 최상단 글 확인 2) 새 글 작성 완료 후 `/community` 복귀 | createdAt 내림차순 기준 방금 작성한 글이 최상단 노출 | 수동 E2E | 4 | — |

### 3.7 타인 게시글 수정·삭제 차단 (AT-030~032)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-030 | UI 차단 | memberA 로그인, memberB 소유 게시글 존재 | 1) memberB 게시글의 edit URL 직접 접근 | "본인 게시글만 수정 가능" 안내 후 상세로 리다이렉트, 수정 폼 미렌더링 | 수동 E2E | 4 | — |
| AT-031 | Rules 차단(수정) | memberA 컨텍스트 | 1) `updateDoc(doc(db,"posts/{memberB의postId}"), {title:"해킹"})` 직접 호출 | `permission-denied`, 원본 문서 미변경 | Rules단위 | 4 | §D-004 |
| AT-032 | Rules 차단(삭제) | memberA 컨텍스트 | 1) `updateDoc(doc(db,"posts/{memberB의postId}"), {status:"deleted"})` 직접 호출 | `permission-denied`. moderator도 클라이언트 직접 쓰기로는 거부되며 반드시 `moderatePost` callable을 거쳐야 함 | Rules단위 | 4/8 | §H moderatePost |

### 3.8 댓글 작성·삭제 (AT-033~036)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-033 | 게시글 댓글 | memberB, memberA 게시글 상세 진입 | 1) 댓글 입력 2) 등록 | `comments/{commentId}` 생성(targetType="post", targetId=postId, authorUid=memberB), `onCommentWritten` 트리거로 `posts.commentCount` +1, memberA에게 알림(comment_on_post) 생성 | 통합(에뮬레이터) | 5/9 | §D-005 |
| AT-034 | 자료 댓글 | memberA, 자료 상세 진입 | 1) 댓글 작성 | `comments` 문서 targetType="material", targetId=materialId. `materials.commentCount` +1 | 통합(에뮬레이터) | 5/9 | §D-005 |
| AT-035 | 삭제 | memberB, 본인 댓글 존재 | 1) 본인 댓글 "삭제" 클릭 2) 확인 | `comments.status="deleted"`로 갱신, 트리거로 대상 문서 `commentCount` -1 | 통합(에뮬레이터) | 5 | §E CommentStatus (표시 정책 `OPEN-04`) |
| AT-036 | 유효성 | memberA, 댓글 입력창 | 1) 공백만 입력 2) 등록 클릭 | 클라이언트 유효성 검사로 제출 차단, `addDoc` 미호출 | 수동 E2E | 5 | — |

### 3.9 좋아요 중복 방지 + 카운터 정합성 (AT-037~040)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-037 | 생성 | memberA, 게시글 상세 | 1) 좋아요 버튼 클릭 2) `reactions/post__{postId}__{uid}` 확인 3) `posts.likeCount` 확인 | reactions 문서 생성(type="like"), `onReactionWritten` 트리거로 `likeCount` 정확히 +1(클라이언트 직접 증가 아님) | 통합(에뮬레이터) | 6 | §D-006 |
| AT-038 | 토글 | memberA, 이미 좋아요한 게시글 | 1) 좋아요 버튼 재클릭(취소) 2) 다시 클릭(재좋아요) | 결정론적 문서 ID로 삭제/재생성, `likeCount`는 취소 시 -1, 재좋아요 시 +1로 정확히 1씩만 증감 | 통합(에뮬레이터) | 6 | §D-006 |
| AT-039 | 동시성 정합성 | 서로 다른 5개 계정, 동일 게시글 | 1) 5개 계정이 순차로 좋아요 클릭 2) `reactions` 중 targetId==postId 문서 수 카운트 3) `posts.likeCount`와 비교 | `likeCount` == reactions 문서 수(정확히 5) | 통합(에뮬레이터) | 6 | §D-006 |
| AT-040 | Rules 차단 | memberA 컨텍스트 | 1) `updateDoc(doc(db,"posts/{id}"), {likeCount: 9999})` 직접 호출 | `permission-denied`, likeCount 불변 | Rules단위 | 6 | §D-006 |

### 3.10 북마크 중복 방지 (AT-041~043)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-041 | 생성 | memberA, 게시글 상세 | 1) "북마크" 클릭 2) `bookmarks/{uid}__post__{postId}` 확인 | 결정론적 ID로 문서 생성, `/me/bookmarks`에 즉시 반영, 카운터 필드 없음 | 통합(에뮬레이터) | 6 | §D-007 |
| AT-042 | 토글 | memberA, 이미 북마크한 게시글 | 1) 북마크 버튼 재클릭 | 문서 삭제(해제), 재클릭 시 동일 ID로 재생성, 문서 수 항상 0 또는 1 | 통합(에뮬레이터) | 6 | §D-007 |
| AT-043 | Rules 차단(읽기) | memberB 컨텍스트 | 1) memberA의 bookmarks 문서를 직접 조회 시도 | `permission-denied` 또는 빈 결과(소유자 외 읽기 금지) | Rules단위 | 6 | §D-007 |

### 3.11 교육자료 작성·검토·상태 전이 (AT-044~049)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-044 | 작성→제출 | memberA, `/materials/new` | 1) 제목·카테고리(prompt)·본문 입력 후 "임시저장" 2) `materials.status="draft"` 확인 3) "검토 요청 제출" 클릭 | draft 저장 시 작성자만 열람, 제출 시 status="pending_review"로 전이하고 목록 비공개 유지 | 통합(에뮬레이터) | 7 | §E MaterialStatus |
| AT-045 | trusted 즉시 게시 | trusted 로그인 | 1) `/materials/new`에서 자료 작성 후 제출 | pending_review 없이 즉시 status="community"로 설정되어 `/materials`에 바로 노출 | 통합(에뮬레이터) | 7 | §C |
| AT-046 | 반려 | mod, materials status=pending_review 존재 | 1) `/admin/materials` 접속 2) 대상 선택 3) `setMaterialStatus({materialId, status:"needs_revision", reason})` | status="needs_revision", `onMaterialStatusChanged` 알림 생성, 작성자가 `/materials/edit?id=`에서 수정 후 재제출 가능 | 통합(에뮬레이터) | 7/9/10 | §H |
| AT-047 | 권한 경계 | mod 컨텍스트 | 1) `setMaterialStatus({materialId, status:"official"})` 호출 2) 동일 mod로 status:"community" 재시도 | official 승격은 오류 반환(§H "official 승격은 admin"), community 승인은 성공 | 통합(에뮬레이터) | 7/10 | §H |
| AT-048 | 공식 승격 | admin, materials status=community 존재 | 1) `/admin/materials`에서 대상 선택 2) "공식 자료로 승격" → `setMaterialStatus({materialId, status:"official"})` | status="official"로 전이, "공식" 배지로 목록에 구분 표시, 알림 생성 | 통합(에뮬레이터) | 7/10 | §H |
| AT-049 | 보관 | 작성자, materials status=needs_revision 존재 | 1) 상세에서 "보관" 클릭 | status="archived"로 전이, 목록·검토 대기열에서 제외. archived→pending_review 역행 UI 없음 | 수동 E2E | 7 | §E MaterialStatus |

### 3.12 공식·회원 자료 구분 표시 (AT-050~052)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-050 | 목록 배지 | guest, official/community 자료 각 1건 이상 | 1) `/materials` 접속 2) 두 카드의 배지 확인 | official에는 "공식" 배지, community에는 "회원" 배지 표시, 스크린리더가 배지 텍스트를 읽을 수 있는 마크업 | 수동 E2E | 7 | §E MaterialStatus |
| AT-051 | 필터 | guest | 1) 필터에서 "공식만 보기" 체크 2) 목록 갱신 확인 | status=="official" 문서만 표시, community 완전 제외 | 수동 E2E | 7 | — |
| AT-052 | 상세 배지 | guest | 1) official 자료 상세 진입 2) community 자료 상세 진입 | 목록과 동일한 배지 규칙, official에는 추가로 "관리자 승인일"(updatedAt 기준) 표시 | 수동 E2E | 7 | — |

### 3.13 카테고리 신청·승인 (AT-053~055)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-053 | 신청 | memberA 로그인 | 1) 카테고리 신청 UI에서 이름/kind="community" 입력 후 제출 | `categoryRequests/{requestId}` 생성(status="submitted"), `categories`는 즉시 미반영 | 통합(에뮬레이터) | 4/10 | §D |
| AT-054 | 승인 | admin, categoryRequests status=submitted | 1) `/admin/categories`에서 대상 선택 2) `reviewCategoryRequest({requestId, decision:"approved"})` | status="approved", `categories/{slug}` 신규 문서 생성(status="active"), 알림 생성, 게시글 작성 시 신규 카테고리 선택 가능 | 통합(에뮬레이터) | 10 | §H, §G |
| AT-055 | 거절 | admin, categoryRequests status=submitted | 1) 대상 선택 2) `reviewCategoryRequest({requestId, decision:"rejected"})` | status="rejected", `categories` 변화 없음, 신청자에게 거절 알림 | 통합(에뮬레이터) | 10 | §H |

### 3.14 신고·숨김·복구 (AT-056~059)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-056 | 신고 접수 | memberA, 게시글 상세 | 1) "신고" 클릭 2) reason="spam" 선택 후 제출 | `reports/{reportId}` 생성(status="open", reason="spam", targetType="post") | 통합(에뮬레이터) | 8 | §E ReportReason |
| AT-057 | 숨김 처리 | mod, reports status=open 존재 | 1) `/admin/reports`에서 확인 2) "게시글 숨김" → `moderatePost({postId, action:"hide"})` 3) `resolveReport({reportId, status:"resolved"})` | `posts.status="hidden"`(문서 보존), reports.status="resolved", `moderationActions` 생성(hide_post), 알림 생성 | 통합(에뮬레이터) | 8/9 | §H |
| AT-058 | 복구 | mod, posts status=hidden 존재 | 1) `/admin/posts`에서 대상 선택 2) "복구" → `moderatePost({postId, action:"restore"})` | status="published"로 복원, `moderationActions` 생성(restore_post), 목록 재노출 | 통합(에뮬레이터) | 8 | §H |
| AT-059 | 중복 처리 방지 | mod, reports status=resolved 존재 | 1) 이미 resolved인 신고에 `resolveReport` 재호출 | 오류 반환 또는 no-op, 중복 `moderationActions` 미생성 | 통합(에뮬레이터) | 8 | §H |

### 3.15 회원 정지·복구 (AT-060~062)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-060 | 정지 | admin, memberB 대상 | 1) `/admin/members`에서 대상 선택 2) "정지" → `suspendUser({uid, reason})` | `users/{uid}.status="suspended"`, 다음 쓰기 액션이 status 검사에서 전부 거부, `adminLogs` 기록 | 통합(에뮬레이터) | 10 | §H |
| AT-061 | 정지 중 차단 | memberB, status=suspended | 1) 로그인 2) `/community/write` 접근, 댓글 작성 시도 | 로그인은 성공, 모든 쓰기 UI가 "계정이 정지되었습니다" 안내로 대체, 직접 SDK 쓰기도 거부 | 통합(에뮬레이터) + 수동 | 10 | §H |
| AT-062 | 복구 | admin, memberB status=suspended | 1) 대상 선택 2) "정지 해제" → `restoreUser({uid})` | `status="active"`로 복원, 이후 쓰기 정상 동작, `adminLogs` 추가 기록 | 통합(에뮬레이터) | 10 | §H |

### 3.16 알림 생성·읽음·위조 차단 (AT-063~066)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-063 | 생성 | memberA 게시글 존재 | 1) memberB가 댓글 작성 2) memberA로 `/me/notifications` 확인 | `notifications/{memberA_uid}/items/{id}` 생성(type="comment_on_post"), 배지 카운트 +1 | 통합(에뮬레이터) | 9 | §D-008 |
| AT-064 | 읽음 처리 | memberA, 미읽음 알림 존재 | 1) `/me/notifications`에서 알림 클릭 | `readAt`이 서버 Timestamp로 갱신(클라이언트는 이 필드만 갱신 가능), 대상 콘텐츠로 이동, 배지 -1 | 통합(에뮬레이터) + 수동 | 9 | §D-008 |
| AT-065 | 위조 생성 차단 | memberA 컨텍스트 | 1) `setDoc(doc(db,"notifications/{memberB_uid}/items/fake-1"), {...})` 직접 호출 | `permission-denied`(생성은 서버 전용) | Rules단위 | 9 | §D-008 |
| AT-066 | 위조 수정 차단 | memberA, 본인 알림 문서 존재 | 1) `updateDoc(doc(...), {type:"admin_notice", message:"위조"})` 호출 | `readAt` 단일 필드 갱신만 허용되므로 `permission-denied` | Rules단위 | 9 | §D-008 |

### 3.17 Storage 업로드(크기·타입·권한) (AT-067~070)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-067 | 정상 업로드 | memberA, `/community/write` | 1) 이미지 첨부로 PNG 2MB 업로드 | `uploads/{본인uid}/{yyyyMM}/{fileId}.png`에 저장, 완료 후 본문에 URL 삽입 | 통합(에뮬레이터) | 4/7 | §D(Storage 경로) |
| AT-068 | 타입 차단 | memberA | 1) 첨부 버튼으로 `.exe` 파일 선택 시도 | 클라이언트 accept 필터로 선택 차단 또는 업로드 강행 시 Storage Rules의 contentType(image/*) 검사로 거부 | Rules단위(Storage) + 수동 | 4/7 | §D |
| AT-069 | 용량 차단 | memberA | 1) 15MB 이미지 업로드 시도 | Storage Rules의 `request.resource.size` 상한(목표 10MB) 초과로 실패, "파일 크기 초과" 안내 | Rules단위(Storage) + 수동 | 4/7 | `OPEN-03` |
| AT-070 | 경로 권한 | memberA 컨텍스트 | 1) `uploads/{memberB_uid}/202608/test.png` 경로에 업로드 시도 | Storage Rules의 `request.auth.uid == uid` 검사로 `permission-denied` | Rules단위(Storage) | 4/7 | §D |

### 3.18 Security Rules 직접 검증 (AT-071~078)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-071 | users 쓰기 금지 | memberA 컨텍스트 | 1) `setDoc(doc(db,"users/{본인uid}"), {role:"admin"})` 직접 호출 | `permission-denied`(서버 전용 쓰기) | Rules단위 | 1 | §D(users 서버 전용) |
| AT-072 | profiles 소유권 | memberA 컨텍스트 | 1) `updateDoc(doc(db,"profiles/{memberB_uid}"), {bio:"수정"})` 호출 | `permission-denied`. 본인 프로필 수정은 성공 | Rules단위 | 3 | §D(profiles 소유자 편집) |
| AT-073 | membershipApplications 소유권 | memberA 컨텍스트 | 1) `getDoc(doc(db,"membershipApplications/{memberB_uid}"))` 조회 시도 | `permission-denied` | Rules단위 | 2 | §D |
| AT-074 | categories 읽기/쓰기 | guest, memberA 컨텍스트 | 1) guest로 `getDocs(collection(db,"categories"))` 조회 2) memberA로 `addDoc(collection(db,"categories"), {...})` 시도 | 읽기는 미인증 포함 항상 성공, 쓰기는 역할 무관 `permission-denied`(callable 경유만 허용) | Rules단위 | 4/10 | §D |
| AT-075 | adminLogs 불변 | admin, mod 컨텍스트 | 1) admin으로 기존 adminLogs 문서 `updateDoc` 시도 2) mod로 adminLogs 컬렉션 read 시도 | 둘 다 `permission-denied`(서버 전용·불변, admin만 읽기 가능) | Rules단위 | 10 | §D(adminLogs) |
| AT-076 | moderationActions 권한 | memberA, mod 컨텍스트 | 1) memberA로 moderationActions 조회 시도 2) memberA로 직접 addDoc 시도 | memberA는 read/write 모두 `permission-denied`, mod는 read 성공/write는 서버 전용이므로 거부 | Rules단위 | 8 | §D |
| AT-077 | reactions 위조 방지 | memberA 컨텍스트 | 1) `setDoc(doc(db,"reactions/post__{postId}__{memberB_uid}"), {type:"like", authorUid: memberB_uid})` 타인 명의 생성 시도 | 문서 ID의 uid 세그먼트와 `request.auth.uid` 불일치로 `permission-denied` | Rules단위 | 6 | §D-006 |
| AT-078 | comments 위조 방지 | memberA 컨텍스트 | 1) `addDoc(collection(db,"comments"), {authorUid: memberB_uid, targetType:"post", targetId:postId, body:"위조"})` 호출 | `permission-denied`(authorUid는 `request.auth.uid`와 일치해야 함) | Rules단위 | 5 | §D-005 |

### 3.19 기존 교육 자산 회귀 (AT-079~086)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-079 | 라우트 존재 | `npm run build` 완료 | 1) 빌드 실행 2) §5 회귀 스크립트로 `out/` 검사 | 기존 52개 라우트 전부 대응 HTML 존재, 신규 커뮤니티 라우트 추가로 인한 누락·충돌 없음 | 회귀 스크립트 | 0(매 Phase 종료 시) | §A(52개 라우트) |
| AT-080 | 용어사전 | 빌드된 앱 기동 | 1) `/glossary` 접속 2) 검색창에 임의 용어 입력 | 커뮤니티 도입 전과 동일하게 용어 카드·검색 결과 표시 | 수동 E2E | 0 | §A |
| AT-081 | Atlas | 빌드된 앱 기동 | 1) `/atlas` 접속 후 임의 노드 완료 처리 2) 새로고침 3) `/atlas/graph`, `/atlas/timeline` 접속 | `atlas-progress.ts` 기반 localStorage 진행률 유지, Firebase 도입과 무관하게 동작 | 수동 E2E | 0 | §A, §B D-001 |
| AT-082 | 커리큘럼 | 빌드된 앱 기동 | 1) `/curriculum` 접속 2) 하위 커리큘럼 항목 클릭 | 기존과 동일하게 콘텐츠 표시, 신규 네비게이션 추가로 인한 레이아웃 깨짐 없음 | 수동 E2E | 0 | §A |
| AT-083 | 검색 격리 | 기존 테스트 스위트 존재 | 1) `npm run test`로 `src/lib/search.test.ts` 재실행 2) 검색 UI에서 임의 키워드 검색 | 기존 2개 테스트 100% 통과, 검색 결과에 posts/materials가 섞이지 않음(커뮤니티 전문검색은 V1 비목표) | 단위(기존 테스트) + 수동 | 0 | §B D-010 |
| AT-084 | localStorage 독립성 | 비로그인 상태 | 1) 비로그인 상태에서 레슨 완료 체크 2) 커뮤니티 계정으로 로그인 3) 레슨 진행률 재확인 | 학습 진행률은 여전히 localStorage 전용, 로그인 여부와 무관하게 동작 | 수동 E2E | 0 | §B D-001 |
| AT-085 | 검증 파이프라인 | 저장소 최신 상태 | 1) `npm run verify` 실행 | lint→typecheck→test→build 4단계 모두 종료 코드 0, 기존 3개 테스트 파일 포함 전체 그린 | 회귀 스크립트 | 0(매 Phase 종료 시) | §A |
| AT-086 | PasswordGate 무영향 | 빌드된 앱 기동 | 1) PasswordGate가 언급되는 강의 페이지 접속 2) 컴포넌트 렌더 확인(layout.tsx 미사용 유지 확인) | PasswordGate는 layout.tsx에서 여전히 미사용 상태이며 Firebase Auth 도입이 해당 컴포넌트 예제 코드에 영향 없음 | 수동 | 0 | §A(PasswordGate) |

### 3.20 모바일 반응형 (AT-087~089)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-087 | 목록 반응형 | 뷰포트 375x812 | 1) 뷰포트 375x812 설정 2) `/community` 접속 3) MOBILE_PRIMARY_NAV 및 "더보기" 메뉴에서 진입 경로 확인 | 게시글 카드 1열 리플로우, 하단 네비게이션이 콘텐츠를 가리지 않음, 가로 스크롤 없음 | 수동 | 4 | — |
| AT-088 | 작성 폼 반응형 | 뷰포트 375x812, memberA 로그인 | 1) `/community/write` 접속 2) 카테고리 드롭다운 터치 조작 3) 이미지 첨부 버튼 터치 | 터치 타깃 최소 44x44px, 키보드 노출 시에도 입력창이 가려지지 않음 | 수동 | 4 | — |
| AT-089 | 관리자 테이블 반응형 | 뷰포트 375x812, admin 로그인 | 1) `/admin/members` 접속 | 회원 목록 테이블이 페이지 전체를 가로로 밀지 않고 테이블 컨테이너 내부에서만 `overflow-x:auto` 스크롤 | 수동 | 10 | — |

### 3.21 접근성 (AT-090~093)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-090 | 키보드 흐름 | memberA 로그인 | 1) 마우스 없이 Tab으로 `/community` 진입 2) "글쓰기" 링크 포커스 후 Enter 3) 제목/카테고리/본문을 Tab으로 순회 입력 4) "게시" 버튼 포커스 후 Enter | 포커스 순서가 시각적 순서와 일치, 모든 인터랙티브 요소가 Tab으로 도달 가능, 포커스 트랩 없이 게시 완료 | 수동 | 4 | — |
| AT-091 | 포커스 표시 | 임의 페이지 | 1) Tab으로 버튼/링크/입력창 순회하며 포커스 스타일 확인 | outline 또는 대체 포커스 스타일이 배경과 대비되어 식별 가능(`outline:none` 단독 사용 금지) | 수동 | 전체 | — |
| AT-092 | 폼 레이블 | 가입/로그인/작성/댓글 폼 | 1) 각 폼의 input을 axe DevTools 등으로 스캔 | 모든 input/textarea/select가 `<label for>` 또는 `aria-label`/`aria-labelledby`로 연결, label 누락 critical 위반 0건 | 수동(axe 스캔), 자동 연동은 `OPEN-05` | 1/4/5 | — |
| AT-093 | 대비·랜드마크 | `/community` | 1) 텍스트/배경 대비를 대비 검사 도구로 측정 2) 스크린리더(NVDA/VoiceOver)로 `/community` 접속해 main/nav 랜드마크, heading 순서 확인 | 본문 텍스트 대비 4.5:1 이상, 큰 텍스트 3:1 이상. main/nav 랜드마크 announce, heading 레벨 건너뜀 없음 | 수동 | 전체 | — |

### 3.22 빌드·배포 (AT-094~097)

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-094 | Hosting rewrites | `npm run build` 완료 | 1) Hosting 에뮬레이터 기동(또는 실 배포) 2) `/community/posts/{id}`, `/materials/items/{id}`, `/members/{uid}` 접속 | 세 경로 모두 200 응답, 각각 post.html/item.html/members.html 셸 서빙, pathname 파싱으로 올바른 문서 로드 | 통합(Hosting 에뮬레이터) + 수동 | 4/7/3 | §D-002 |
| AT-095 | 배포 후 라우트 | 스테이징 배포 완료 | 1) 스테이징 프로젝트에 배포 2) `/community`, `/materials`, `/login`, `/admin` 등 신규 라우트 및 기존 52개 라우트 접속 | 신규·기존 라우트 모두 200 응답, 회귀 없음 | 수동 | 배포 직전(전체) | — |
| AT-096 | Functions 배포 | `firebase deploy --only functions` 완료 | 1) callable 10종을 실 계정으로 1회씩 호출 | 10개 callable 모두 region `asia-northeast3`에서 정상 응답(cold start 포함 10초 이내), 미인증 호출은 전부 거부 | 수동 | 배포 직전(전체) | §H |
| AT-097 | 성능 예산 | `npm run build` 로그 확보 | 1) First Load JS 크기 확인 2) 빌드 총 소요 시간 기록 | §7 상한(First Load JS 증가폭, firebase SDK 초기 청크) 미초과, `staticPageGenerationTimeout`(180초) 내 빌드 완료 | 회귀 스크립트(빌드 로그 파싱) | 배포 직전(전체) | §A(staticPageGenerationTimeout) |

### 3.23 `bootstrapUserAccount` 멱등성 (AT-098~101)

근거: [D-017](./11-DECISION-LOG.md). 이 콜러블의 멱등 분기(호출 시 `users/{uid}`가 이미 존재하면 **아무것도 쓰지 않음**)는 편의 기능이 아니라 **보안 요건**이다. 분기가 빠지면 `admin`이 자신을 `pending_member`로 강등시키거나, `suspended` 사용자가 스스로 `status="active"`로 복구할 수 있다. 따라서 AT-099~101은 세 결함 각각을 직접 재현하는 회귀 테스트이며, 하나라도 실패하면 **Critical**(§10)로 분류해 배포를 중단한다.

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-098 | 부트스트랩 → 프로필 | Auth·Firestore 에뮬레이터 초기화, 신규 계정 가입 완료(AT-005 통과) | 1) 가입 직후 `bootstrapUserAccount` 1회 호출 2) `getIdToken(true)` 3) `/onboarding/profile`에서 `profiles/{uid}` 생성 시도 | `created: true` 반환, `profiles/{uid}` 생성 **성공**. (이 케이스가 D-017 이전의 교착 — `isActive()`가 `users/{uid}` 부재로 false가 되어 프로필 생성이 `permission-denied`되던 상태 — 이 해소되었음을 증명한다) | 통합(에뮬레이터) | 3 | [D-017](./11-DECISION-LOG.md), §D(profiles/{uid}) |
| AT-099 | 멱등성 | AT-098 통과 계정(`role="pending_member"`, `status="active"`) | 1) `bootstrapUserAccount`를 연속 3회 추가 호출 2) 매 호출 후 반환값 기록 3) `users/{uid}` 문서의 `createdAt` 및 모든 필드 비교 | 2~4회차 모두 `{ role: "pending_member", status: "active", created: false }` 반환, `users/{uid}` 문서가 **어떤 필드도 변경되지 않음**(`createdAt` 동일), custom claim 불변 | 통합(에뮬레이터) | 3 | [D-017](./11-DECISION-LOG.md) |
| AT-100 | 권한 강등 차단 | `role="admin"`, `status="active"`인 계정으로 로그인 | 1) 해당 계정으로 `bootstrapUserAccount` 호출 2) 반환값 확인 3) `users/{uid}.role` 및 `getIdToken(true)` 후 claim 확인 4) `/admin` 접근 시도 | `{ role: "admin", status: "active", created: false }` 반환, `users/{uid}.role`이 **`admin` 그대로** 유지, claim도 `admin` 유지, `/admin` 접근 계속 허용. **`pending_member`로 덮어써지면 즉시 Critical 결함** | 통합(에뮬레이터) | 3 | [D-017](./11-DECISION-LOG.md), §D-009 |
| AT-101 | 정지 우회 차단 | `status="suspended"`인 계정(AT-060에서 정지 처리된 계정 재사용) | 1) 해당 계정으로 로그인 2) `bootstrapUserAccount` 호출 3) `users/{uid}.status` 확인 4) 게시글 작성 시도 | `{ role: <기존 역할>, status: "suspended", created: false }` 반환, `users/{uid}.status`가 **`suspended` 그대로** 유지, `isActive()`가 계속 false여서 게시글 작성이 `permission-denied`로 거부됨. **`active`로 복구되면 즉시 Critical 결함** | 통합(에뮬레이터) | 3 | [D-017](./11-DECISION-LOG.md), §D-009 |

### 3.24 잔여 FR 커버리지 보강 (AT-102~120)

근거: §01 PRD의 기능 요구사항(FR) 56건을 §3 전체와 1:1 대조한 결과, AT-001~101 이 한 건도
건드리지 않는 FR 이 남아 있었다(아래 §3.25 추적 매트릭스의 "보강" 표시 행). 그중 **Must** 5건
(FR-A02 / FR-A11 / FR-A12 / FR-M08 / FR-G10)은 커버리지 0인 상태로 출시할 수 없으므로 여기서
케이스를 신설한다. Should 5건(FR-P07 / FR-I03 / FR-G09 / FR-L06 / FR-L07)도 같은 절에 포함한다.

| ID | 영역 | 전제조건 | 절차 | 기대 결과 | 검증방식 | Phase | SSOT |
|---|---|---|---|---|---|---|---|
| AT-102 | Google 신규 가입 | 미인증, Auth 에뮬레이터 초기화 | 1) `/signup`에서 "Google로 계속하기" 클릭 2) `signInWithPopup(auth, GoogleAuthProvider)` 성공 3) `bootstrapUserAccount` 호출 4) `getIdToken(true)` | Auth user 생성 + `emailVerified=true` **자동 설정**(이메일 인증 단계 생략), `users/{uid}`가 `role="pending_member"`/`status="active"`로 생성, claim 반영. 이메일 가입과 최종 상태가 동일 | 통합(에뮬레이터) | 2 | [03 플로우 3](./03-USER-FLOWS-AND-PERMISSIONS.md), [D-017](./11-DECISION-LOG.md) |
| AT-103 | Google 팝업 취소 | 미인증 | 1) "Google로 계속하기" 클릭 2) 팝업을 그대로 닫음 | `auth/popup-closed-by-user` 처리, **상태 전이 없음**(Auth 계정 미생성, `users` 문서 미생성), `/signup`에 머무르며 오류 문구 노출 | 수동 | 2 | [03 플로우 3 E2](./03-USER-FLOWS-AND-PERMISSIONS.md) |
| AT-104 | 비밀번호 재설정 | 이메일 가입 계정 존재, Auth 에뮬레이터 | 1) `/login`에서 "비밀번호를 잊으셨나요" 2) `sendPasswordResetEmail` 호출 3) 에뮬레이터 UI의 재설정 링크로 새 비밀번호(8자 이상) 설정 4) 새 비밀번호로 로그인 | 재설정 메일 발송 성공, 새 비밀번호 로그인 성공, **`users/{uid}`의 `role`/`status`와 custom claim이 재설정 전과 동일**(비밀번호 변경이 권한에 영향 없음), 구 비밀번호는 `auth/invalid-credential` | 통합(에뮬레이터) | 2 | FR-A12 |
| AT-105 | 탈퇴 시퀀스 | memberA 로그인, 게시글·댓글·북마크·좋아요 각 1건 이상 보유 | 1) `/me/settings` → 탈퇴 2) `reauthenticateWithCredential` 3) 확인 모달 동의 4) [06 §13.1](./06-SECURITY-AND-MODERATION-SSOT.md)의 4단계를 순서대로 실행 | `users/{uid}.status="withdrawn"`, `profiles/{uid}`가 `displayName="탈퇴한 회원"`/`bio=""`로 스크럽, 본인 `bookmarks`/`reactions`/`notifications` 문서 삭제, Auth 계정 삭제. **게시글·댓글 문서 자체는 삭제되지 않음** | 통합(에뮬레이터) | 3 | [06 §13.1](./06-SECURITY-AND-MODERATION-SSOT.md) |
| AT-106 | 탈퇴 후 익명화 | AT-105 완료, 해당 회원의 과거 게시글이 목록에 존재 | 1) 다른 계정으로 로그인 2) 커뮤니티 목록·상세에서 탈퇴 회원의 글을 연다 3) 초기 페인트와 보정 후 화면을 각각 확인 | 문서에 남은 `authorDisplayName` 스냅샷이 잠시 보일 수 있으나, [05 §6](./05-DATA-MODEL-SSOT.md) 표시 시점 보정(Q18)이 `profiles/{authorUid}`를 조회해 **"탈퇴한 회원"으로 교체 렌더링**된다. 보정이 동작하지 않아 실명이 계속 표시되면 **Critical**([D-022](./11-DECISION-LOG.md)) | 통합(에뮬레이터) + 수동 | 3 | [D-022](./11-DECISION-LOG.md) |
| AT-107 | 탈퇴 후 재가입 | AT-105 완료 | 1) 동일 이메일로 다시 회원가입 | 가입 성공, **새 `uid` 발급**, 과거 게시글·이력과 자동 연결되지 않음, 새 계정은 `pending_member`부터 다시 시작 | 통합(에뮬레이터) | 3 | [06 §13.3](./06-SECURITY-AND-MODERATION-SSOT.md) |
| AT-108 | 자료 출처(external) | memberA, `/materials/new` | 1) `sourceType="외부 자료"` 선택 2) `resourceUrl` 비운 채 제출 3) 유효한 URL 입력 후 재제출 | 2)는 zod 단계에서 거부되고 제출 불가, 3)은 생성 성공. Rules 단위로 `resourceUrl` 없이 `sourceType="external"` 직접 쓰기 시 `permission-denied` | 통합(에뮬레이터) + Rules단위 | 7 | [D-021](./11-DECISION-LOG.md), FR-M08 |
| AT-109 | 자료 출처(original) | memberA, `/materials/new` | 1) `sourceType="직접 작성"` 선택 2) 정상 제출 3) Rules 단위로 `sourceType="original"` + `resourceUrl` 동봉 쓰기 시도 | 2)는 생성 성공(`resourceUrl` **필드 자체가 문서에 없음**), 3)은 `permission-denied`. "출처 미상" 상태가 만들어질 수 없음을 확인 | 통합(에뮬레이터) + Rules단위 | 7 | [D-021](./11-DECISION-LOG.md), FR-M08 |
| AT-110 | linkedRefs 저장 | memberA, 게시글 작성 폼 | 1) 강의 1건 + 용어 1건을 연결해 게시글 작성 2) Firestore 문서 확인 | `linkedRefs = [{type:"lesson",id:<slug>},{type:"glossary",id:<term>}]`로 저장, 각 항목이 **정확히 두 필드**만 보유, 상세 화면에 연결 배지 노출 | 통합(에뮬레이터) | 5 | [D-020](./11-DECISION-LOG.md), FR-P07 |
| AT-111 | linkedRefs 부가 필드 거부 | memberA 컨텍스트 | 1) `setDoc`으로 `linkedRefs:[{type:"lesson",id:"x",title:"제목"}]` 직접 쓰기 2) 6개 항목 배열 쓰기 | 1)은 zod `.strict()`가 거부(클라이언트 경로), Rules 단위로는 `size()<=5` 위반인 2)가 `permission-denied`. **1)이 Rules를 통과하는 것은 설계상 정상**이며([D-020](./11-DECISION-LOG.md)) 이 케이스는 zod 검증이 쓰기 경로에 실제로 걸려 있는지를 확인한다 | 단위(zod) + Rules단위 | 5 | [D-020](./11-DECISION-LOG.md) |
| AT-112 | 강의 페이지 커뮤니티 섹션 | 빌드 완료, AT-110의 게시글 존재 | 1) `npm run build` 2) 연결된 강의 페이지 접속 3) 하단 커뮤니티 섹션 확인 4) `out/`의 해당 HTML 원문 확인 | 섹션이 CSR 아일랜드로 렌더되어 관련 글 1건 표시, **`out/` HTML에는 커뮤니티 글 내용이 포함되지 않음**(SSG 산출물 불변 — 정적 셸 유지), 빌드 시 Firestore 접근 없음 | 빌드 + 수동 | 5 | FR-L06, [02 §9-1](./02-INFORMATION-ARCHITECTURE.md) |
| AT-113 | 용어·Atlas 역참조 | AT-110의 게시글 존재, 복합 인덱스 배포 | 1) `/glossary`에서 연결된 용어를 펼침 2) `/atlas/{nodeId}` 접속 3) 각각의 `array-contains` 쿼리 결과 확인 | `where("linkedRefs","array-contains",{type,id})` + `orderBy("createdAt","desc")` 쿼리가 **인덱스 오류 없이** 실행되고 해당 글이 노출됨. 인덱스 미배포 시 `failed-precondition`이 나오므로 이 케이스는 인덱스 배포 검증도 겸한다 | 통합(에뮬레이터) + 수동 | 5 | FR-L07, [05 §3 인덱스](./05-DATA-MODEL-SSOT.md) |
| AT-114 | 대댓글 1단계 | memberA 댓글 1건 존재 | 1) 해당 댓글에 답글 작성(`parentCommentId` 지정) 2) 생성된 답글에 다시 답글 작성 시도 | 1)은 성공하고 들여쓰기 1단계로 표시, 2)는 **거부**(부모가 이미 `parentCommentId`를 가지므로 2단계 불가). UI에서도 답글의 답글 버튼이 노출되지 않음 | 통합(에뮬레이터) | 5 | [05 §Comment 대댓글 규칙](./05-DATA-MODEL-SSOT.md), FR-I03 |
| AT-115 | 공지 고정 | admin, 게시글 1건 존재 | 1) `/admin/posts`에서 대상 글의 `isPinned=true` 설정 2) 커뮤니티 목록 확인 3) memberA 계정으로 동일 필드 수정 시도 | 해당 글이 목록 최상단 고정(`isPinned DESC, createdAt DESC` 정렬), memberA의 `isPinned` 수정은 `permission-denied`. **별도 `notices` 컬렉션·`/admin/notices` 라우트가 생성되지 않음**(D-024)을 함께 확인 | 통합(에뮬레이터) | 10 | [05 Post `isPinned`](./05-DATA-MODEL-SSOT.md), [D-024](./11-DECISION-LOG.md), FR-G09 |
| AT-116 | 댓글 연속 작성 간격 | memberA, 게시글 상세 | 1) 댓글 작성 2) 10초 이내에 다른 내용으로 댓글 재작성 3) 10초 경과 후 재시도 | 2)는 `permission-denied`(`notRateLimitedForComment`), 3)은 성공. UI는 남은 대기 시간을 안내 | Rules단위 + 통합 | 5 | [06 §14.1](./06-SECURITY-AND-MODERATION-SSOT.md), FR-G10 |
| AT-117 | 동일 본문 반복 차단 | AT-116 통과 상태 | 1) 댓글 작성 2) 10초 경과 후 **동일한 본문**으로 재작성 3) 5분 경과 후 동일 본문 재작성 | 2)는 `permission-denied`(`notDuplicateComment`), 3)은 성공 | Rules단위 | 5 | [06 §14.1](./06-SECURITY-AND-MODERATION-SSOT.md), FR-G10 |
| AT-118 | 게시글 상한 미강제 확인 | 신규 `member` 계정 | 1) 24시간 내 게시글 4개 연속 작성 2) 각 시도의 서버 응답 확인 | 4개 모두 **서버에서는 성공한다**. 클라이언트 UI만 "오늘 이미 3개를 작성했습니다"를 안내한다. 이 케이스는 결함 재현이 아니라 [06 §14.1](./06-SECURITY-AND-MODERATION-SSOT.md)의 "정직성 원칙"이 문서대로 유지되는지를 확인하는 **정합성 확인 케이스**다(서버 차단이 관측되면 문서가 낡은 것이므로 문서를 갱신한다) | 통합(에뮬레이터) | 5 | [06 §14.1 OPEN-02](./06-SECURITY-AND-MODERATION-SSOT.md), FR-G10 |
| AT-119 | 중복 신고 거부 | memberA, AT-056에서 이미 신고한 게시글 | 1) 동일 게시글을 다른 사유로 재신고 2) 응답 확인 3) `reports` 컬렉션의 해당 대상 문서 수 확인 | `setDoc`이 기존 문서 ID(`post__{postId}__{memberA_uid}`)를 겹쳐 쓰므로 **update로 판정되어 `permission-denied`**, UI는 "이미 신고한 대상입니다" 표시, 문서 수는 1건 유지. memberB의 신고는 **별도 문서로 정상 접수**(대상별 신고자 수 신호 보존) | 통합(에뮬레이터) | 8 | [D-018](./11-DECISION-LOG.md), FR-G02 |
| AT-120 | `addDoc` 신고 금지 | memberA 컨텍스트 | 1) `addDoc(collection(db,"reports"), {...})`로 랜덤 ID 신고 생성 시도 | `permission-denied`(랜덤 ID는 `{targetType}__{targetId}__{uid}` 패턴 검사를 통과할 수 없음). 구현이 `addDoc`을 쓰면 **모든 신고가 실패**하므로 이 케이스는 구현 방식 자체를 고정하는 회귀 테스트다 | Rules단위 | 8 | [D-018](./11-DECISION-LOG.md) |

---

### 3.25 FR ↔ AT 추적 매트릭스

목적: §13 정합성 점검 항목 "테스트 계획이 PRD 요구사항을 빠짐없이 덮는가"를 기계적으로 확인할 수
있게 한다. [01 PRD](./01-PRODUCT-PRD.md)의 FR 56건 전부를 나열하며, **빈칸을 남기지 않는다** —
커버하지 않기로 한 항목은 사유를 명시한다.

| FR | 우선순위 | 대응 AT | 비고 |
|---|---|---|---|
| FR-A01 이메일 가입 | M | AT-005~007 | |
| FR-A02 Google 로그인 | M | AT-102, AT-103 | 보강 |
| FR-A03 로그인/로그아웃 | M | AT-010~012 | |
| FR-A04 세션 지속 | M | AT-013 | |
| FR-A05 이메일 인증 | M | AT-008, AT-009 | |
| FR-A06 가입 신청 제출 | M | AT-014, AT-019 | |
| FR-A07 관리자 승인 | M | AT-020, AT-021 | |
| FR-A08 승인 거절·재신청 | M | AT-022, AT-023 | |
| FR-A09 역할 부여 | M | AT-071, AT-100 | |
| FR-A10 프로필 등록·수정 | M | AT-072, AT-098 | |
| FR-A11 회원 탈퇴 | M | AT-105~107 | 보강 |
| FR-A12 비밀번호 재설정 | M | AT-104 | 보강 |
| FR-A13 진행률 계정 동기화 | C | — | **V1 비목표**([D-013](./11-DECISION-LOG.md)). 진행률은 localStorage 전용이며 AT-084가 그 불변을 검증한다 |
| FR-P01 게시글 작성 | M | AT-024, AT-025 | |
| FR-P02 게시글 수정 | M | AT-026, AT-030 | |
| FR-P03 게시글 삭제 | M | AT-027~029, AT-031 | |
| FR-P04 카테고리 분류 | M | AT-053~055 | |
| FR-P05 태그 | S | AT-024 | 태그 상한은 AT-024 절차에 포함 |
| FR-P06 이미지 첨부 | S | AT-067~070 | |
| FR-P07 linkedRefs 연결 | S | AT-110, AT-111 | 보강 |
| FR-P08 좋아요 | M | AT-037~040 | |
| FR-M01 자료 등록 | M | AT-044 | |
| FR-M02 자료 검토 | M | AT-045~047 | |
| FR-M03 자료 상태 전이 | M | AT-048, AT-049 | |
| FR-M04 공식 자료 구분 | M | AT-050~052 | |
| FR-M05 자료 태그·분류 | S | AT-044 | |
| FR-M06 자료 첨부 | S | AT-067~070 | |
| FR-M07 자료 북마크 | M | AT-041~043 | |
| FR-M08 출처 필수화 | M | AT-108, AT-109 | 보강 |
| FR-M09 자료 수정 이력 | C | — | **V1 비목표**. 버전 관리 컬렉션이 [05](./05-DATA-MODEL-SSOT.md)에 없으며 추가는 CANON 변경에 해당한다. 전역 OPEN 등록부 참조 |
| FR-I01 댓글 작성 | M | AT-033, AT-034 | |
| FR-I02 댓글 삭제 | M | AT-035, AT-036 | |
| FR-I03 대댓글(1단계) | S | AT-114 | 보강 |
| FR-I04 북마크 | M | AT-041~043 | |
| FR-I05 알림 생성 | M | AT-063, AT-064 | |
| FR-I06 알림 읽음 | M | AT-064 | |
| FR-I07 알림 위조 차단 | M | AT-065, AT-066 | |
| FR-I08 프로필 열람 | S | AT-072 | |
| FR-I09 멘션 | C | — | **V1 비목표**. [01 PRD](./01-PRODUCT-PRD.md) 비목표 목록에 포함 |
| FR-G01 신고 접수 | M | AT-056, AT-119, AT-120 | 중복 방지 보강 |
| FR-G02 신고 중복 방지 | M | AT-119, AT-120 | 보강 |
| FR-G03 게시글 숨김 | M | AT-057 | |
| FR-G04 숨김 복구 | M | AT-058 | |
| FR-G05 댓글 모더레이션 | M | AT-036 | |
| FR-G06 회원 정지 | M | AT-060, AT-061 | |
| FR-G07 정지 해제 | M | AT-062 | |
| FR-G08 감사 로그 | M | AT-075 | |
| FR-G09 공지 관리 | S | AT-115 | 보강 |
| FR-G10 스팸 방지 | M | AT-116~118 | 보강. 게시글 상한은 서버 미강제이며 AT-118이 그 사실을 고정한다 |
| FR-L01 `output: "export"` 유지 | M | AT-094, AT-095 | |
| FR-L02 기존 52개 라우트 유지 | M | AT-079 | |
| FR-L03 기존 Vitest 통과 | M | AT-083, AT-085 | |
| FR-L04 localStorage 진행률 유지 | M | AT-081, AT-084 | |
| FR-L05 정적 검색 인덱스 유지 | M | AT-083 | |
| FR-L06 강의 페이지 커뮤니티 섹션 | S | AT-112 | 보강 |
| FR-L07 용어·Atlas 관련 글 | S | AT-113 | 보강 |

**커버리지 요약**: Must 38건 — **전건 커버(누락 0)**. Should 13건 — 전건 커버.
Could 3건(FR-A13 / FR-M09 / FR-I09) — 의도적 비커버이며 각각 V1 비목표 근거를 위에 명시했다.

> **이 매트릭스의 유지 규칙**: 01 PRD 의 FR 표에 행을 추가·삭제하면 **같은 커밋에서** 이 매트릭스도
> 갱신한다. 대응 AT 칸이 비어 있는 Must/Should 행이 하나라도 있으면 그 상태로는 출시 판정
> (§9 최종 체크리스트)을 통과시키지 않는다.

---



## 3.26 이미지 업로드 테스트 (AT-121~140)

| ID | 시나리오 | 기대 결과 | 비고 |
|---|---|---|---|
| AT-121 | 승인 회원(member) 이미지 업로드 인증 발급 | Cloudflare Worker가 인증 토큰 반환, ImageKit 업로드 성공, mediaAssets 생성 | FR-P06 |
| AT-122 | 승인 대기 회원(pending_member) 인증 발급 | Worker가 인증 거부(403) | FR-P06 |
| AT-123 | 비회원(guest) 인증 발급 | Worker가 인증 거부(401) | |
| AT-124 | 정지 회원(suspended) 인증 발급 | Worker가 인증 거부(403) | |
| AT-125 | 5MB 초과 이미지 업로드 | Worker가 크기 초과 거부(413) | FR-P06 |
| AT-126 | 허용되지 않은 MIME(pdf) 업로드 | Worker가 MIME 거부(415) | |
| AT-127 | SVG 위장 업로드(Content-Type 조작) | Worker가 시그니처 검증 또는 ImageKit 차단 | |
| AT-128 | 게시글 3장 초과 이미지 첨부 | Firestore Rules가 mediaAssetIds 3개 초과 거부 | |
| AT-129 | 교육자료 5장 초과 이미지 첨부 | Firestore Rules가 mediaAssetIds 5개 초과 거부 | |
| AT-130 | 1600px 초과 이미지 리사이징 | 클라이언트 전처리로 긴 변 1600px 이하 확인 | |
| AT-131 | WebP 변환 확인 | 업로드 후 ImageKit URL이 WebP 형식 | |
| AT-132 | EXIF 메타데이터 제거 확인 | 업로드 후 EXIF 정보 제거 | |
| AT-133 | 업로드 직후 temporary 상태 | mediaAssets.status == "temporary" | |
| AT-134 | 게시글 저장 후 attached 전환 | mediaAssets.status == "attached", ownerId/ownerType 설정 | |
| AT-135 | 글 작성 취소 후 임시 이미지 유지 | mediaAssets.status == "temporary", ownerId == null | |
| AT-136 | 타인 이미지 삭제 시도 | Firestore Rules가 update 거부(403) | |
| AT-137 | 관리자 이미지 삭제 | Firestore Rules 허용, mediaAssets.status == "pending_delete" | |
| AT-138 | ImageKit 오류 시 Firestore 문서 미생성 | Worker 오류 반환, 클라이언트에서 mediaAssets create 중단 | |
| AT-139 | Firestore 오류 시 고아 이미지 처리 | mediaAssets create 실패, ImageKit 파일은 정리 필요(수동) | |
| AT-140 | 무료 한도 차단 모드 | 95% 초과 시 일반 회원 업로드 차단, 관리자만 가능 | |

### 기존 Storage/Functions 테스트 제거
- Storage Rules 관련 테스트(AT-040~043) → V1 미사용으로 제거 또는 "V1 비목표" 표시
- Cloud Functions 관련 테스트 → V1 미사용으로 제거 또는 "V1 비목표" 표시

## 4. Rules 단위 테스트 코드 예시

목표: 아래 3개 케이스는 `@firebase/rules-unit-testing` + Vitest 조합으로 작성한다. Phase 0에서 devDependencies에 `firebase`, `@firebase/rules-unit-testing`을 추가하고, `firestore.rules` 파일을 리포지토리 루트에 신설해야 실행 가능하다(현재 두 항목 모두 미존재, CANON §A). 실행 전 `firebase emulators:start --only firestore` (포트 8080)가 기동돼 있어야 한다.

목표: 이 테스트들은 Firestore 에뮬레이터가 필요하므로 기존 `npm run test`(에뮬레이터 없이 항상 통과해야 하는 단위 테스트) 대상에서 분리한다. 파일명 관례 `*.rules.test.ts` + 별도 vitest 설정(`vitest.config.rules.ts`, include: `["**/*.rules.test.ts"]`) + 별도 스크립트 `"test:rules": "firebase emulators:exec --only firestore \"vitest run --config vitest.config.rules.ts\""`를 제안한다(`package.json`/vitest 설정 변경은 이 문서의 범위가 아니므로 실제 반영은 Phase 0 구현 작업에서 수행).

### 4.1 예시 1 — posts 쓰기 권한 (AT-015, AT-024 대응)

```ts
import { readFileSync } from "node:fs"
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing"
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest"

let testEnv: RulesTestEnvironment

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "ju0o-ec967-rules-test",
    firestore: {
      rules: readFileSync("firestore.rules", "utf8"),
      host: "127.0.0.1",
      port: 8080,
    },
  })
})

afterAll(async () => {
  await testEnv.cleanup()
})

beforeEach(async () => {
  await testEnv.clearFirestore()
})

describe("posts 컬렉션 쓰기 권한", () => {
  it("pending_member는 posts 생성이 거부된다", async () => {
    const pending = testEnv.authenticatedContext("uid-pending", { role: "pending_member" })
    const db = pending.firestore()

    await assertFails(
      setDoc(doc(db, "posts/post-001"), {
        authorUid: "uid-pending",
        category: "free",
        status: "published",
        title: "테스트",
        body: "본문",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }),
    )
  })

  it("member는 authorUid가 본인과 일치하면 posts를 생성할 수 있다", async () => {
    const member = testEnv.authenticatedContext("uid-member", { role: "member" })
    const db = member.firestore()

    await assertSucceeds(
      setDoc(doc(db, "posts/post-002"), {
        authorUid: "uid-member",
        category: "free",
        status: "published",
        title: "테스트",
        body: "본문",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }),
    )
  })

  it("member라도 authorUid를 타인 uid로 위조하면 거부된다", async () => {
    const member = testEnv.authenticatedContext("uid-member", { role: "member" })
    const db = member.firestore()

    await assertFails(
      setDoc(doc(db, "posts/post-003"), {
        authorUid: "uid-other-user",
        category: "free",
        status: "published",
        title: "위조",
        body: "본문",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }),
    )
  })
})
```

### 4.2 예시 2 — likeCount 직접 수정 차단 (AT-040 대응)

```ts
import { readFileSync } from "node:fs"
import {
  assertFails,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing"
import { doc, updateDoc } from "firebase/firestore"
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest"

let testEnv: RulesTestEnvironment

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "ju0o-ec967-rules-test",
    firestore: { rules: readFileSync("firestore.rules", "utf8"), host: "127.0.0.1", port: 8080 },
  })
})

afterAll(async () => {
  await testEnv.cleanup()
})

beforeEach(async () => {
  await testEnv.clearFirestore()
  // Rules를 우회해 시드 데이터를 직접 심는다(트리거 함수가 없는 순수 Rules 테스트 환경이므로
  // likeCount 초깃값은 withSecurityRulesDisabled로만 만들 수 있다).
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await context
      .firestore()
      .doc("posts/post-liked")
      .set({ authorUid: "uid-author", category: "free", status: "published", likeCount: 3 })
  })
})

describe("posts.likeCount 필드 보호", () => {
  it("member가 likeCount를 직접 수정하면 거부된다", async () => {
    const member = testEnv.authenticatedContext("uid-member", { role: "member" })
    const db = member.firestore()

    await assertFails(updateDoc(doc(db, "posts/post-liked"), { likeCount: 9999 }))
  })
})
```

### 4.3 예시 3 — notifications 위조 생성/수정 차단 (AT-065, AT-066 대응)

```ts
import { readFileSync } from "node:fs"
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing"
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest"

let testEnv: RulesTestEnvironment

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "ju0o-ec967-rules-test",
    firestore: { rules: readFileSync("firestore.rules", "utf8"), host: "127.0.0.1", port: 8080 },
  })
})

afterAll(async () => {
  await testEnv.cleanup()
})

beforeEach(async () => {
  await testEnv.clearFirestore()
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await context
      .firestore()
      .doc("notifications/uid-owner/items/notif-1")
      .set({
        type: "comment_on_post",
        targetId: "post-001",
        readAt: null,
        createdAt: Timestamp.now(),
      })
  })
})

describe("notifications 서브컬렉션 서버 전용 생성", () => {
  it("클라이언트가 타인 알림 컬렉션에 직접 생성하면 거부된다", async () => {
    const attacker = testEnv.authenticatedContext("uid-attacker", { role: "member" })
    const db = attacker.firestore()

    await assertFails(
      setDoc(doc(db, "notifications/uid-owner/items/fake-1"), {
        type: "admin_notice",
        targetId: "none",
        readAt: null,
        createdAt: Timestamp.now(),
      }),
    )
  })

  it("소유자는 readAt 필드만 갱신할 수 있다", async () => {
    const owner = testEnv.authenticatedContext("uid-owner", { role: "member" })
    const db = owner.firestore()

    await assertSucceeds(
      updateDoc(doc(db, "notifications/uid-owner/items/notif-1"), { readAt: Timestamp.now() }),
    )
  })

  it("소유자라도 type 필드를 수정하면 거부된다", async () => {
    const owner = testEnv.authenticatedContext("uid-owner", { role: "member" })
    const db = owner.firestore()

    await assertFails(
      updateDoc(doc(db, "notifications/uid-owner/items/notif-1"), { type: "admin_notice" }),
    )
  })
})
```

---

## 5. 회귀 테스트 스위트

### 5.1 매 Phase 종료 시 필수 실행 시퀀스

```
1. npm run lint
2. npm run typecheck
3. npm run test                    # 기존 단위 테스트 (progress/search/site-navigation 포함)
4. npm run test:rules               # 목표(제안): firebase emulators:exec --only firestore,storage "vitest run --config vitest.config.rules.ts"
5. npm run test:integration          # 목표(제안): firebase emulators:exec --only auth,firestore,storage,functions "vitest run --config vitest.config.integration.ts"
6. npm run build
7. node scripts/verify-routes.mjs    # §5.2 라우트 존재 검증 스크립트(신설, 목표)
```

통과 기준: 1~7 전체 종료 코드 0. 4~5번은 devDependencies·설정 신설 전까지(Phase 0 완료 전) 스킵하되, 스킵 사실을 Phase 종료 보고서에 명시한다. 6번(build) 실패 또는 7번에서 `MISSING` 라우트가 1건이라도 보고되면 해당 Phase는 종료 승인 불가.

### 5.2 라우트 존재 검증 스크립트 초안 (`scripts/verify-routes.mjs`, 신설 목표)

```js
// scripts/verify-routes.mjs
// 목표(제안): npm run build 이후 out/ 산출물에 기존 52개 라우트가 모두 존재하는지 검사한다.
// next.config.ts의 output:"export" + firebase.json의 cleanUrls:true, trailingSlash:false 조합에서
// 정적 export는 라우트별로 `<route>.html` 또는 `<route>/index.html` 형태로 생성된다.
import { existsSync } from "node:fs"
import { join } from "node:path"

const OUT_DIR = "out"

// 00-CURRENT-STATE-AUDIT.md §4-1 실측 확정 52개 라우트 목록 그대로. 동적 세그먼트([slug] 등)는
// generateStaticParams 결과에 따라 파일 수가 달라지므로 이 스크립트는
// 정적 셸/고정 라우트만 검사 대상으로 삼는다(동적 산출물 개수 검증은 별도 §OPEN 항목).
const STATIC_ROUTES = [
  "/", "/about", "/atlas", "/atlas/graph", "/atlas/studio", "/atlas/studio/inventory",
  "/atlas/timeline", "/curriculum", "/glossary", "/lab", "/learn", "/license",
  "/model-routing", "/model-routing/simulator", "/privacy", "/resources", "/start",
  "/technologies", "/terms", "/tools", "/verification",
  // /learn/vibe-coding-foundation/{slug} 23개
  ...[
    "ai-agent", "ai-llm-ide", "api", "backend", "context-engineering", "css-basics",
    "database", "day-1", "errors-to-ai", "files-connect", "fix-loop", "frontend",
    "good-ai-task-request", "html-basics", "javascript-basics", "node-npm-package-json",
    "project-file-structure", "prompt-engineering", "qa-basics", "related-files-context",
    "subagent", "task-breakdown", "terminal-commands", "web-how-pages-appear", "workflow",
  ].map((slug) => `/learn/vibe-coding-foundation/${slug}`),
]

function routeToCandidates(route) {
  if (route === "/") return [join(OUT_DIR, "index.html")]
  const trimmed = route.replace(/^\//, "")
  return [join(OUT_DIR, `${trimmed}.html`), join(OUT_DIR, trimmed, "index.html")]
}

const missing = []
for (const route of STATIC_ROUTES) {
  const candidates = routeToCandidates(route)
  if (!candidates.some((path) => existsSync(path))) {
    missing.push(route)
  }
}

if (missing.length > 0) {
  console.error(`MISSING ${missing.length}건:`)
  for (const route of missing) console.error(`  - ${route}`)
  process.exit(1)
}

console.log(`OK: 정적 라우트 ${STATIC_ROUTES.length}건 전부 존재 확인`)
process.exit(0)
```

이 스크립트는 학습 라우트 25개(정적 셸 21 + `/learn/vibe-coding-foundation/*` 25 — 실제로는 25개 slug이며 CANON §A 목록의 `{...}` 나열을 그대로 전개함) 및 동적 라우트(`/atlas/[nodeId]` 등)를 제외한 **정적 고정 경로만** 검사한다. 동적 라우트(`[slug]`, `[nodeId]`, `[conceptId]`, `[id]`, `[unitId]`)는 `generateStaticParams`가 생성하는 실제 산출물 수가 콘텐츠 건수에 따라 달라지므로, 검증은 "빌드가 오류 없이 완료되는지"(§5.1의 6번)로 갈음하고 개수 검증 자동화는 `OPEN-06`으로 남긴다.

### 5.3 필드명 1:1 정합성 검사 (D-019 회귀)

근거: [D-019](./11-DECISION-LOG.md). Firestore Rules의 `request.resource.data.X is string` 검사는 `X`가 필드에 없으면 **거짓**이 된다. 필드명이 05(정본)와 06(규칙)·07(거버넌스)·09(패킷) 사이에서 어긋나면, 규칙을 배포한 뒤 해당 쓰기 전체가 `permission-denied`로 실패한다. 05는 **가장 검증 가능한 표기**(제약 표 + TypeScript interface + zod 스키마로 필드를 3회 표현)로 정본을 정했고, 필드명을 바꾸는 개정은 05와 나머지 문서를 **같은 커밋**에서 동시에 갱신해야 한다.

이 절은 그 원칙이 위반되지 않았는지 매 Phase 종료 시 기계적으로 확인한다. 대상 필드 13개(05가 3회 표현하는 것들)를 문서 간 대조한다:

| 대상 필드 | 05(정본) | 06·07·09·10 일치 확인 대상 |
|---|---|---|
| `bodyMarkdown` | Post/Comment 본문 | `body` 미사용(06 §4·§8, 07 필수 필드, 09 GOOSE-03/04/05/06/08) |
| `description` | Material 본문 | `body` 미사용(07, 09 GOOSE-06) |
| `displayName` | Profile 표시명 | `nickname` 미사용(06 §4·§5) |
| `photoUrl` | Profile 사진 | `avatarUrl` 미사용(06 §4·§5) |
| `bio` | Profile 소개 | 06 §4·§5 |
| `linkedRefs` | Post/Material 연결 | `linkedLessonSlug` 미사용(08, 09) |
| `sourceType` | Material 출처 | 06 §4·§5, 09 GOOSE-06 |
| `resourceUrl` | Material 외부 URL | 06 §4·§5 |
| `attachmentUrls` | Post/Material 첨부 | 06 §4·§5 |
| `status` | Post/Material/User 상태 | 06·07·09 |
| `requestedByUid` | CategoryRequest 신청자 | `requesterUid` 미사용(06 §4·§5) |
| `proposedName`/`proposedSlug` | CategoryRequest 필드 | `name` 미사용(06 §4·§5) |
| `detail` | Report 내용 | `description` 미사용(06 §4·§5) |

검사 방법(Phase 0에서 자동화, 그 전에는 수동 확인):
```
# Phase 0 목표(제안): scripts/verify-field-names.mjs — 위 표의 "미사용" 필드명이
# firestore.rules · src/lib/community/** · src/features/community/** 에 0건인지 검사한다.
rg -n "nickname|requesterUid|linkedLessonSlug" firestore.rules src/lib/community src/features/community
# 위 명령의 매치 수가 0이어야 한다. 1건이라도 나오면 해당 Phase는 종료 승인 불가.
```

통과 기준: 위 13개 필드 각각에 대해 06/07/09/10의 표기가 05와 동일한지 확인, 위 `rg` 매치가 0건, 05 §2 개정 이력(결정 로그 D-019 이후)이 없거나 개정된 필드가 같은 커밋에서 06~10에 반영되었는지 확인.

---

## 6. 접근성 테스트 기준

WCAG 2.1 AA를 기준선으로 한다. 항목별 확인 절차는 §3.21 AT-090~093과 동일하며, 아래는 반복 실행 가능하도록 정리한 체크리스트다.

| 항목 | 확인 절차 |
|---|---|
| 키보드 내비게이션 | 1) 마우스 연결 해제 또는 사용 금지 2) 대상 페이지 진입 후 Tab/Shift+Tab만으로 모든 인터랙티브 요소(링크·버튼·입력창·드롭다운) 도달 3) Enter/Space로 각 요소 실행 가능 확인 4) 모달이 있는 경우 ESC로 닫히고 트리거 요소로 포커스 복귀하는지 확인 |
| 포커스 표시 | 1) Tab으로 요소를 하나씩 이동 2) 각 요소에 시각적 포커스 표시(outline, box-shadow 등)가 배경 대비 3:1 이상으로 나타나는지 확인 3) `outline: none`만 적용되고 대체 스타일이 없는 요소가 있는지 코드 검색(`outline:\s*none`, `outline:\s*0`) |
| 폼 레이블 | 1) 대상 폼의 모든 `input`/`textarea`/`select`를 나열 2) 각 요소가 `<label for="id">` 또는 `aria-label`/`aria-labelledby`로 연결되는지 확인 3) axe DevTools 등으로 스캔해 "Form elements must have labels" critical 위반 0건 확인 |
| 색 대비 | 1) 본문 텍스트/배경 조합을 대비 검사 도구(브라우저 DevTools Contrast Checker 등)로 측정 2) 일반 텍스트 4.5:1 이상, 18pt 이상(또는 14pt bold 이상) 큰 텍스트 3:1 이상 확인 3) 배지·버튼 등 텍스트를 포함한 UI 컴포넌트도 동일 기준 적용 |
| 스크린리더 랜드마크 | 1) NVDA(Windows) 또는 VoiceOver(macOS)로 대상 페이지 접속 2) 랜드마크 탐색 단축키로 `header`/`nav`/`main`/`footer`가 모두 announce되는지 확인 3) heading 목록 탐색 단축키로 `h1`부터 순서대로 건너뜀 없이 내려가는지 확인 |

---

## 7. 성능 기준

목표(제안, 확정 숫자): 아래 값은 커뮤니티 기능 도입 시 지켜야 할 상한/목표치이며, 측정 도구는 Chrome DevTools Performance 패널 및 `next build` 콘솔 출력을 사용한다.

| 항목 | 목표값 | 측정 조건 |
|---|---|---|
| 커뮤니티 목록(`/community`) 첫 렌더(TTI 근사) — 최초 방문(캐시 없음) | 1500ms 이내 | Chrome DevTools "Fast 3G" 네트워크 스로틀링, posts 15건 표시 완료까지 |
| 커뮤니티 목록 첫 렌더 — 재방문(캐시 있음) | 800ms 이내 | 동일 조건, 브라우저 캐시/Firestore 로컬 캐시 활성 상태 |
| Firestore 문서 읽기 상한 — `/community` 목록 최초 로드 | 21건 이하 | posts 20건(페이지당) + categories 캐시 조회 1건 |
| Firestore 문서 읽기 상한 — `/community/posts/{id}` 상세 최초 로드 | 52건 이하 | post 1건 + comments 최대 50건 + 작성자 프로필 조회 1건(캐시 시 0건) |
| 번들 크기 증가 상한 — 커뮤니티 라우트 1개당 First Load JS | 90KB(gzip) 이하 | `next build` 콘솔의 Route(app) First Load JS 열 기준 |
| 번들 크기 증가 상한 — Firebase SDK(auth+firestore+storage) 초기 청크 | 150KB(gzip) 이하 | 동적 import(`next/dynamic`)로 지연 로드 시 초기 청크만 측정 |
| 정적 빌드 시간 상한 | `staticPageGenerationTimeout`(180초) 이내 | `npm run build` 전체 소요 시간 |

이 값을 초과하는 변경은 §10 결함 등급 "Major" 이상으로 분류하고, 원인(쿼리 미사용 인덱스, 불필요한 리스너, 번들 분할 누락 등)을 식별해 조치한 뒤에만 다음 Phase로 진행한다.

---

## 8. 테스트 데이터 시드 스크립트 명세

목표(제안): `scripts/seed-emulator.mjs` (신설, `firebase-admin` SDK를 에뮬레이터 호스트로 연결해 실행. `FIRESTORE_EMULATOR_HOST`/`FIREBASE_AUTH_EMULATOR_HOST`/`FIREBASE_STORAGE_EMULATOR_HOST` 환경변수 필수 — 미설정 시 프로덕션 오염을 막기 위해 스크립트가 즉시 종료하도록 가드 필요).

### 8.1 생성 대상

| 컬렉션/영역 | 건수 | 비고 |
|---|---|---|
| Auth 계정 | §2.3의 6역할 + memberB/memberC 2건 = 8건 | custom claim + `users/{uid}` 미러 동시 생성 |
| `profiles` | 계정 수만큼(8건) | pending 계정은 §2.3 절차 5에 따라 생략 가능 |
| `categories`(kind=community) | 8건 | CANON §G 시드 8종 그대로: free, question, troubleshooting, today-i-made, project, tool-review, insight, gupt-meetup |
| `categories`(kind=material) | 6건 | CANON §G 시드 6종 그대로: prompt, workflow, tool-guide, template, case-study, reference |
| `posts` | 15건 이상 | 카테고리별 최소 1건 이상 분포, status는 published 12 / hidden 2 / deleted 1 혼합 |
| `materials` | 8건 이상 | status 6종(draft/pending_review/community/official/needs_revision/archived) 각 1건 이상 |
| `comments` | posts·materials 대상 각 2~3건 | targetType 양쪽 모두 커버 |
| `reactions` | 게시글 3~5건에 대해 서로 다른 계정으로 5건 | AT-039 동시성 정합성 케이스용 |
| `bookmarks` | memberA 기준 2~3건 | AT-041~043용 |
| `membershipApplications` | pending 계정 1건(submitted), 별도 1건(rejected) | AT-022 재신청 케이스용 |
| `categoryRequests` | 1건(submitted) | AT-053~055용 |
| `reports` | 1건(open) | AT-056~059용 |
| `notifications` | memberA 대상 2~3건(읽음 1 + 안읽음 1~2) | AT-063~066용 |

### 8.2 실행 절차

1. `firebase emulators:start --only auth,firestore,storage` 기동 확인(포트 §2.1).
2. 환경변수 3종(`FIRESTORE_EMULATOR_HOST=127.0.0.1:8080`, `FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099`, `FIREBASE_STORAGE_EMULATOR_HOST=127.0.0.1:9199`) 설정 후 `node scripts/seed-emulator.mjs` 실행.
3. 스크립트는 §2.3 계정 생성 → §8.1 순서(categories → posts → materials → comments → reactions/bookmarks → membershipApplications/categoryRequests → reports → notifications)로 의존성 순서를 지켜 생성한다(예: comments는 posts/materials 생성 이후에만 생성 가능).
4. 완료 시 생성된 문서 ID·계정 UID 매핑을 `scratchpad/emulator-seed-manifest.json`(리포지토리에 커밋하지 않음)으로 출력해 수동 E2E 테스터가 참조.

### 8.3 정리(cleanup)

- 통합 테스트 스위트 실행 전후로 `testEnv.clearFirestore()` / `testEnv.clearStorage()`를 호출해 매 테스트 파일이 독립적인 상태에서 시작하도록 한다.
- 수동 E2E 세션 종료 시 에뮬레이터 프로세스를 종료하면 `--export-on-exit` 옵션에 따라 스냅샷이 저장되거나(재사용 목적) 데이터가 완전히 소멸한다(일회성 목적). 두 방식 중 선택은 세션 목적에 따르되, CI에서는 항상 매 실행마다 신규 시드로 초기화한다.
- 에뮬레이터 데이터는 프로덕션 프로젝트(`ju0o-ec967`)와 물리적으로 분리되어 있으므로 별도 프로덕션 정리 작업은 불필요하다. 다만 스크립트에 프로덕션 호스트 오설정 방지 가드(§8 서두)를 반드시 포함한다.

---

## 9. 출시 전 최종 체크리스트

| 구분 | 항목 | 확인 방법 |
|---|---|---|
| 보안 | `firestore.rules`/`storage.rules`가 §4·§3.18(AT-071~078)·§3.17(AT-067~070) 전 케이스를 통과한 상태로 배포됨 | `npm run test:rules` 전체 그린 + `firebase deploy --only firestore:rules,storage` 배포 로그 확인 |
| 보안 | 프로덕션 Firebase 프로젝트(`ju0o-ec967`)에 테스트 계정(§2.3, `qa.*@test.local`)이 존재하지 않음 | Firebase Console Authentication 탭에서 `qa.` 접두 이메일 검색 결과 0건 |
| 보안 | Cloud Functions 9종 callable 전체가 §H "진입 즉시 4단계 검사"(auth 존재→role→status→adminLogs) 순서로 구현됨 | 코드 리뷰 체크리스트, AT-023/AT-047/AT-060 재실행 |
| 데이터 | `categories` 컬렉션에 CANON §G의 커뮤니티 8종·자료 6종 시드가 프로덕션에 실제로 존재 | Firebase Console Firestore 데이터 탭 확인 |
| 데이터 | 시드/테스트 목적 `posts`/`materials`/`comments` 등이 프로덕션에 남아있지 않음 | Firestore 데이터 탭에서 `authorUid`가 테스트 UID인 문서 0건 확인 |
| 콘텐츠 | 커뮤니티 이용규칙·신고 정책 안내 콘텐츠가 실제 라우트(`/community` 또는 별도 안내 페이지)에 게시됨 | 수동 열람 |
| 콘텐츠 | 기존 52개 라우트가 신규 네비게이션(PRIMARY_NAV 등) 추가 이후에도 전부 접근 가능 | AT-079/AT-095 재실행 |
| 운영 | admin 역할 계정이 최소 1개 이상 실제 운영자 이메일로 프로덕션에 존재 | Firebase Console + `users/{uid}.role=="admin"` 문서 확인 |
| 운영 | `adminLogs` 열람 화면(`/admin/logs`)에서 최근 관리 작업이 정상적으로 조회됨 | 수동 확인 |
| 운영 | Firebase Hosting/Functions 배포 롤백 절차(이전 릴리스로 되돌리는 명령)가 문서화되어 있음 | 배포 가이드 문서 존재 확인(`OPEN-08`: 별도 롤백 절차 문서 필요 여부) |
| 성능 | §7 성능 기준 7개 항목이 모두 목표값 이내로 측정됨 | AT-097 결과 기록 |
| 접근성 | §6 접근성 체크리스트 5개 항목이 모두 통과 | AT-090~093 결과 기록 |

---

## 10. 결함 등급 정의

| 등급 | 정의 | 예시 | 출시 차단 여부 |
|---|---|---|---|
| Blocker | 데이터 손실, 보안 침해(권한 없는 사용자의 쓰기/읽기 성공, Rules 우회), 인증 완전 불가 | pending_member가 posts를 생성할 수 있음(AT-015 실패), 타인 알림 위조 생성 성공(AT-065 실패) | 차단(즉시 수정 전까지 배포 금지) |
| Critical | 핵심 플로우(가입→승인→게시글/댓글/좋아요 CRUD) 완전 불가 또는 잘못된 데이터가 영구 저장됨 | 승인 후에도 role이 갱신되지 않음(AT-020 실패), likeCount가 실제 반응 수와 어긋남(AT-039 실패) | 차단 |
| Major | 핵심 플로우는 동작하나 부분 기능 오작동, 성능 기준(§7) 미달 | 댓글 작성 시 알림이 누락됨(AT-063 일부 실패), 목록 첫 렌더가 목표값을 20% 이상 초과 | 원칙적으로 차단, 예외 승인 시 다음 패치 커밋 계획을 배포 전 문서화해야 조건부 출시 가능 |
| Minor | UI 표시 오류, 문구 오탈자, 비핵심 페이지의 반응형 깨짐 | 모바일에서 관리자 로그 테이블 여백이 어긋남 | 차단 아님(백로그 등록) |
| Trivial | 시각적 미세 차이, 콘솔 경고, 문서 오탈자 | 개발자 콘솔에 사용되지 않는 변수 경고 | 차단 아님(백로그 등록) |

Blocker/Critical 결함이 §3 케이스 표에서 1건이라도 미해결 상태면 해당 Phase 및 전체 V1 출시를 승인하지 않는다.

---

## 11. 미결정 사항

- `OPEN-01`: `docs/community-platform/` 내 01~09번 문서의 정확한 파일명·구성 미확정. 본 문서(§1.2)가 CANON §I 예시(`05-DATA-MODEL-SSOT.md`)로부터 유추한 번호 체계는 제안이며, 실제 발행본과 다를 수 있다. 발행 시 §1.2 표와 §3 SSOT 열의 `§X` 표기를 실제 파일 경로 링크로 교체해야 한다.
- `OPEN-02`: **해소됨.** §1.3 Phase 0~10 기능 매핑의 대조 대상인 [`08-IMPLEMENTATION-ROADMAP.md`](./08-IMPLEMENTATION-ROADMAP.md)가 발행되었다. 구현 착수 전 Phase 정의를 1회 대조한다.
- `OPEN-03`: Storage 업로드 최대 용량 상한값(AT-069, 본 문서 제안 10MB)이 CANON에 명시되어 있지 않다. 최종값 확정 필요.
- `OPEN-04`: 댓글 soft delete 시 UI 표시 정책(AT-035) — "삭제된 댓글입니다" 문구를 노출할지, 목록에서 완전히 숨길지 미확정.
- `OPEN-05`: axe-core 등 접근성 자동 스캔의 CI 연동 여부(AT-092) 미확정. 현재는 수동 스캔으로만 정의.
- `OPEN-06`: 통합(에뮬레이터) 테스트 및 §5 회귀 스위트를 실행할 CI 파이프라인(GitHub Actions 등)의 존재 여부·구성이 확인되지 않았다. 본 계획은 로컬 실행을 전제로 작성되었으며, `[slug]`/`[nodeId]` 등 동적 라우트 산출물 개수를 자동 검증하는 방법도 함께 확정 필요.
- `OPEN-07`: 테스트 계정 이메일 도메인·명명 규칙(본 문서 제안 `qa.<role>@test.local`)의 표준화 여부 미확정.
- `OPEN-08`: Firebase Hosting/Functions 배포 롤백 절차를 별도 운영 문서로 분리할지, 본 계획(§9)에 계속 포함할지 미확정.
