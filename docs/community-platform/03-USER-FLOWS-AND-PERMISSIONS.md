# 03. 사용자 플로우와 권한 정본

## 0. 문서 성격

**현재:** `package.json`에 firebase 의존성이 없고, Auth·Firestore·Storage·Cloud Functions는 전부 미도입 상태다(CANON A절). 커뮤니티 기능은 코드 기준 0%다.
**목표:** 이 문서는 CANON(`B. Opus 확정 아키텍처 결정`, `C~H절` 정본)을 전제로, 실제 구현 시 화면·역할·Firestore 경로·Cloud Functions가 어떻게 맞물리는지 정의한 설계 문서다.

별도 표기가 없는 서술은 전부 **목표(구현 대상)**다. "현재:"로 시작하는 문장만 기존 코드에서 확인된 사실이다.

### 관련 SSOT 링크
- 데이터 모델 필드/스키마 상세: [`./05-DATA-MODEL-SSOT.md`](./05-DATA-MODEL-SSOT.md)
- Security Rules 원문·모더레이션 정책 상세: [`./06-SECURITY-AND-MODERATION-SSOT.md`](./06-SECURITY-AND-MODERATION-SSOT.md)

이 문서는 **플로우와 권한의 정본**이며, 필드 타입·Rules 문법 자체는 위 두 문서를 따른다. 본 문서와 위 두 문서가 충돌하면 CANON 원문(`C:\...\scratchpad\CANON.md`)이 최종 근거다.

---

## 1. 역할 정의표

역할명은 CANON C절 정본을 한 글자도 바꾸지 않는다: `guest` · `pending_member` · `member` · `trusted_member` · `moderator` · `admin`

| 역할 | 획득 조건 | 상실 조건 | claim(`role`) 값 | 대표 권한 요약 |
|---|---|---|---|---|
| `guest` | 기본 상태(미인증 방문). 별도 절차 없음 | 회원가입/로그인 성공 시 `pending_member`로 전환되며 소멸 | 없음(`request.auth`가 `null`) | 공개 콘텐츠(공식 자료, 커뮤니티 최신글) 읽기만 |
| `pending_member` | Auth 계정 생성 성공 직후 클라이언트가 호출한 `bootstrapUserAccount`(D-017)가 claim 최초 부여 | ① admin이 `reviewMembershipApplication`(approved) 처리 → `member`로 승격 ② `suspendUser`로 `status: suspended` ③ 탈퇴(`status: withdrawn`, OPEN-12) | `pending_member` | 읽기만. 프로필(`profiles/{uid}`) 작성·수정과 가입 신청 제출(`submitMembershipApplication`)만 예외적으로 허용 |
| `member` | admin의 `reviewMembershipApplication`(approved) 처리로 `pending_member`에서 승격 | ① admin의 `setUserRole`로 강등 ② `suspendUser`(status만 변경, role claim 유지 — OPEN-03) ③ 탈퇴 | `member` | 게시글·댓글·좋아요·북마크·신고 작성, 자료 등록(`draft`/`pending_review`), 본인 프로필 수정 |
| `trusted_member` | admin이 `setUserRole`로 수동 승격 (자동 승격 경로 없음) | admin이 `setUserRole`로 강등, 또는 정지/탈퇴 | `trusted_member` | `member` 권한 전체 + 자료 즉시 `community` 게시(검토 대기 생략) + 신고 가중치(OPEN-09) |
| `moderator` | admin이 `setUserRole`로 임명 | admin이 `setUserRole`로 강등, 또는 정지/탈퇴 | `moderator` | 신고 처리(`resolveReport`), 게시글 숨김/복구(`moderatePost`), 댓글 삭제(`deleteCommentByModerator`), 자료 `pending_review→needs_revision` 처리(범위 OPEN-07). 회원 승인·역할 변경·공식 승격 **불가** |
| `admin` | `setUserRole`로 임명. **최초 1인의 부트스트랩 경로는 CANON에 없음(OPEN-02)** | 다른 admin의 `setUserRole` 강등(최소 인원 정책 OPEN-14) | `admin` | 전권: 회원 승인·정지·복구·역할 변경·자료 공식 승격·카테고리 승인·신고 처리·관리자 로그 열람 |

---

## 2. 핵심 플로우 (19종)

표기 규칙: 각 단계는 `[화면 경로] [수행 주체] [Firestore 경로 R/W] 설명` 형식이며, Firestore/Auth에 상태 변화가 있으면 `상태전이:` 줄을 추가한다. 수행 주체는 사용자·클라이언트·Rules·Cloud Function 중 하나다.

### 플로우 1 — 비회원 탐색

**시작 조건**: actor = 익명 방문자, role = `guest`(claim 없음), 상태 = 미인증

1. `[/ , /learn 등 기존 라우트]` [사용자] 사이트 진입. 클라이언트가 `onAuthStateChanged`로 `role=guest` 판정(auth 세션 없음).
2. `[/community]` [클라이언트] `posts` 컬렉션에서 `status == 'published'` 문서를 `createdAt desc`로 조회(R: `posts/*`).
3. `[/community/post]`(rewrite: `/community/posts/*`) [클라이언트] `location.pathname` 파싱으로 `postId` 획득 → `getDoc(posts/{postId})`(R). Rules: `status=='published'`인 문서만 비인증 read 허용.
4. `[/materials]` [클라이언트] `materials` 컬렉션에서 `status in ['community','official']` 조회(R: `materials/*`).
5. `[모든 화면의 좋아요·댓글·북마크·신고 버튼]` [클라이언트] `auth.currentUser == null` 감지 → `/login`으로 리다이렉트(UI 가드, Firestore 쓰기 시도 자체가 발생하지 않음).

**실패·예외 분기**
- E1: guest가 `status='draft'`/`'hidden'`/`'deleted'`인 `posts` 문서에 ID를 직접 지정해 접근 → Rules가 `request.auth==null && resource.data.status!='published'` 조건으로 거부(`PERMISSION_DENIED`).
- E2: guest가 `/me`, `/admin/*` 등 인증 필요 라우트에 직접 URL 접근 → 클라이언트 라우트 가드가 `onAuthStateChanged` 결과 `null` 확인 후 `/login`으로 리다이렉트(UI 가드). 해당 화면의 Firestore 쿼리 역시 Rules로 거부되어 실제 데이터는 노출되지 않음.

**종료 조건**: guest는 read-only 상태로 세션을 마치거나 `/signup`, `/login`으로 전환한다. 상태전이 없음.

---

### 플로우 2 — 이메일 회원가입 (이메일 인증 포함)

**시작 조건**: actor = 신규 방문자, role = `guest`, 상태 = 미인증

1. `[/signup]` [사용자] 이메일 + 비밀번호 입력, 제출.
2. `[/signup]` [클라이언트] Firebase Auth `createUserWithEmailAndPassword(email, password)` 호출 → Auth 계정 생성(`uid` 발급).
3. `[클라이언트]` `sendEmailVerification(user)` 호출 → Firebase가 인증 메일 발송. 화면에 "이메일을 확인하세요" 안내(라우트 이동 없음).
4. `[Cloud Function]` 클라이언트가 가입 성공 직후 콜러블 **`bootstrapUserAccount`**(D-017)를 호출한다. 이 함수가 `users/{uid}`를 `{role:"pending_member", status:"active"}`로 생성하고 custom claim `role=pending_member`를 부여한다. 클라이언트는 성공 응답 후 `getIdToken(true)`로 토큰을 갱신한 뒤 다음 화면으로 이동한다.
   **상태전이**: `users/{uid}` (없음) → 생성, `role`: (없음) → `pending_member`
5. `[클라이언트]` `getIdToken(true)`로 강제 리프레시하여 새 claim 반영.
6. `[사용자]` 수신 메일의 인증 링크 클릭 → Firebase Auth 내부 상태 `emailVerified: false → true`(Firestore 문서 아님, Auth 사용자 레코드).
7. `[/signup 또는 로그인 화면]` [클라이언트] `user.reload()` 후 `emailVerified` 확인 → `true`면 `/onboarding/profile`로 이동.

**실패·예외 분기**
- E1: 이미 가입된 이메일로 재시도 → Auth가 `auth/email-already-in-use` 반환 → 클라이언트가 `/login` 안내(상태전이 없음).
- E2: 이메일 미인증 상태로 가입 신청(`submitMembershipApplication`) 시도 → Cloud Function 진입검사에서 이메일 인증 여부 확인 실패 → 거부, "이메일 인증 필요" 안내(재전송 정책 OPEN-04).
- E3: 인증 메일 미수신 → 사용자가 재전송 버튼 클릭 → `sendEmailVerification` 재호출(쿨다운 시간 OPEN-04).

**종료 조건**: `emailVerified == true` 확인 후 `/onboarding/profile` 진입 가능. role은 여전히 `pending_member`.

---

### 플로우 3 — Google 소셜 로그인

**시작 조건**: actor = 신규 또는 기존 방문자, role = `guest`

1. `[/signup 또는 /login]` [사용자] "Google로 계속하기" 클릭.
2. `[클라이언트]` `signInWithPopup(auth, GoogleAuthProvider)` 호출.
3. `[클라이언트]` 인증 성공 시 Auth user 반환. Google 계정은 Firebase 표준 동작상 `emailVerified=true`로 자동 설정됨 → 플로우 2의 이메일 인증 단계가 생략됨.
4. `[Cloud Function]` 토큰에 `role` claim이 없으면 **`bootstrapUserAccount`**(D-017)를 호출한다. 신규 `uid`면 `users/{uid}` 생성(`role=pending_member`). 기존 `uid`(재로그인)면 함수가 멱등 분기로 아무것도 쓰지 않고 현재 역할·상태를 그대로 반환한다.
   **상태전이(신규 사용자만)**: `users/{uid}` (없음) → 생성, `role`: (없음) → `pending_member`
5. `[클라이언트]` `getIdToken(true)` 강제 리프레시.
6. `[클라이언트]` `role==pending_member` && `profiles/{uid}` 미존재 → `/onboarding/profile`. `profiles/{uid}` 존재 && `role>=member` → `/community`.

**실패·예외 분기**
- E1: 브라우저 팝업 차단 → `auth/popup-blocked` → 클라이언트가 `signInWithRedirect`로 폴백 안내.
- E2: 사용자가 Google 팝업 취소 → `auth/popup-closed-by-user` → `/signup`에 머무름(상태전이 없음).

**종료 조건**: 신규 사용자는 `emailVerified=true` 상태의 `pending_member`로 진입. 기존 사용자는 보유 role대로 로그인 완료.

---

### 플로우 4 — 로그인 (이메일)

**시작 조건**: actor = 기존 가입자, role ∈ {`pending_member`, `member`, `trusted_member`, `moderator`, `admin`}, Auth 계정 존재

1. `[/login]` [사용자] 이메일 + 비밀번호 입력.
2. `[클라이언트]` `signInWithEmailAndPassword` 호출.
3. `[클라이언트]` 성공 시 `user.emailVerified` 확인. `false`면 재인증 안내(메일 재전송 옵션) 표시, 화면 유지.
4. `[클라이언트]` `emailVerified==true`면 `getIdToken()`으로 `claim.role` 확인.
5. `[클라이언트]` `[/login]` `users/{uid}.status`를 R: `users/{uid}`로 조회(Rules: 본인 uid만 read 허용).
6. `[클라이언트]` role/status 조합별 리다이렉트: `pending_member`+`profiles` 없음 → `/onboarding/profile`, `pending_member`+`profiles` 있음 → `/membership/pending`, `member` 이상 → `/community` 또는 `/me`.

**실패·예외 분기**
- E1: 비밀번호 오류 → `auth/wrong-password` → 에러 메시지, 상태전이 없음.
- E2: `status==suspended` → 로그인 자체는 성공하나 정지 사유/기간 안내 화면만 노출, 나머지 쓰기 기능은 Rules의 `status==active` 검사로 실제 차단.
- E3: `status==withdrawn` 계정 재로그인 시도 → 재활성화 불가 정책(OPEN-11) → 안내 후 `signOut()` 처리.

**종료 조건**: 정상 로그인 시 역할별 홈으로 진입, Firebase Auth 세션 유지.

---

### 플로우 5 — 최초 프로필 작성

**시작 조건**: actor = 인증 완료 사용자, role = `pending_member`, `profiles/{uid}` 미존재

1. `[/onboarding/profile]` [클라이언트] 라우트 가드: `auth.currentUser` 존재 && `profiles/{uid}` 미존재 확인. 조건 불충족 시 리다이렉트.
2. `[/onboarding/profile]` [사용자] 닉네임·소개 등 입력, 제출.
3. `[클라이언트]` `setDoc(profiles/{uid}, {...})`(W: `profiles/{uid}`). Rules: `request.auth.uid==uid`이고 문서 최초 생성만 허용.
   **상태전이**: `profiles/{uid}` (없음) → 생성
4. `[클라이언트]` 저장 성공 후 `/membership/pending`으로 이동(가입 신청 미제출 상태 안내, "신청하기" 버튼 노출).

**실패·예외 분기**
- E1: 닉네임 중복/형식 오류(클라이언트 검증) → 제출 차단, 상태전이 없음.
- E2: `profiles/{uid}`가 이미 존재하는데 재접근(뒤로가기 등) → 클라이언트가 사전 `exists` 조회로 감지해 `/membership/pending`으로 자동 리다이렉트. 우회 시도(직접 `setDoc` 재호출)는 Rules가 문서 재생성으로 거부.

**종료 조건**: `profiles/{uid}` 생성 완료. role은 여전히 `pending_member`.

---

### 플로우 6 — 가입 승인 신청 제출

**시작 조건**: actor = `pending_member`, `emailVerified==true`, `profiles/{uid}` 존재, `membershipApplications/{uid}` 미존재 또는 `status==rejected`

1. `[/membership/pending]` [사용자] "가입 신청하기" 클릭(신청 사유 등 입력).
2. `[클라이언트]` callable `submitMembershipApplication` 호출.
3. `[Cloud Function submitMembershipApplication]` 진입검사: `request.auth` 존재, 이메일 인증 여부(OPEN-04), `users/{uid}.status==active`(R: `users/{uid}`).
4. `[Cloud Function]` `membershipApplications/{uid}`를 `set`(W: `membershipApplications/{uid}`).
   **상태전이**: `membershipApplications/{uid}` (없음 또는 `status=rejected`) → `status: submitted`
5. `[/membership/pending]` [클라이언트] `membershipApplications/{uid}` 실시간 구독으로 "검토 중" 상태 반영.

**실패·예외 분기**
- E1: `emailVerified==false`로 호출 → Function이 `FAILED_PRECONDITION` 반환 → "이메일 인증 필요" 안내.
- E2: 이미 `status==submitted`인데 중복 제출 → Function이 현재 상태와 불일치로 거부.

**종료 조건**: `membershipApplications/{uid}.status==submitted`. 관리자 검토 대기.

---

### 플로우 7 — 승인 대기 중 쓰기 시도 차단

**시작 조건**: actor = `pending_member`, `membershipApplications/{uid}.status ∈ {submitted, resubmitted}` 또는 미제출

1. `[/community/write 등]` [클라이언트] 라우트 가드: `role < member`면 작성 버튼 비활성화 또는 안내 문구만 노출(UI 가드, 비보안).
2. `[임의 경로]` [사용자] devtools 등으로 Firestore SDK `addDoc(posts, {...})` 직접 호출 시도(UI 우회).
3. `[Rules]` `posts` `create` 규칙: `request.auth.token.role in ['member','trusted_member','moderator','admin']` 검사 → `pending_member` 불일치 → 거부(`PERMISSION_DENIED`).
   **상태전이**: 없음(쓰기 거부)
4. 동일 원리로 `comments`, `reactions`, `bookmarks`, `materials`, `categoryRequests`, `reports`의 `create`도 Rules의 role 검사로 차단.

**실패·예외 분기**
- E1: `pending_member`가 `reports` 제출 시도 → 위 4번과 동일하게 Rules 거부.
- E2(반례): `pending_member`가 본인 `profiles/{uid}` 수정 시도 → 이는 **허용**(프로필 작성/수정은 승인 이전 단계에서도 가능, 역할표 참조). 차단 대상이 아님을 명확히 하기 위한 대조 사례.

**종료 조건**: 커뮤니티 쓰기 요청은 전부 `PERMISSION_DENIED`로 종료. 클라이언트는 에러를 캐치해 "승인 후 이용 가능" 토스트를 표시.

---

### 플로우 8 — 관리자 승인

**시작 조건**: actor = `admin`, 대상 `membershipApplications/{targetUid}.status ∈ {submitted, resubmitted}`

1. `[/admin/members]` [admin] `membershipApplications where status in [submitted, resubmitted]` 조회(R).
2. `[/admin/members]` [admin] 신청 상세 확인 후 "승인" 클릭.
3. `[클라이언트]` callable `reviewMembershipApplication({targetUid, decision: approved})` 호출.
4. `[Cloud Function reviewMembershipApplication]` 진입검사: `auth.token.role==admin`, 처리자 `users/{admin uid}.status==active`.
5. `[Cloud Function]` `membershipApplications/{targetUid}.status: submitted→approved`(W).
6. `[Cloud Function]` 내부적으로 `setUserRole` 로직 호출(D-003 준수 — claim 변경 경로 단일화) → custom claim `role: pending_member→member`, `users/{targetUid}.role` 미러 갱신(W: `users/{targetUid}`).
7. `[Cloud Function]` `adminLogs/{logId}` 기록(W: `adminLogs/{logId}`): `{actorUid, targetUid, before: pending_member, after: member, createdAt}`.
8. `[Firestore 트리거 onMembershipReviewed]` `notifications/{targetUid}/items/{id}` 생성(W): `type=membership_approved`.
   **상태전이**: `membershipApplications.status: submitted→approved` / `users.role: pending_member→member`
9. `[클라이언트, 대상 세션]` 다음 `getIdToken(true)` 또는 실시간 리스너로 role 갱신 반영, `/me` 진입 가능.

**실패·예외 분기**
- E1: `moderator`가 동일 callable 호출 시도 → 진입검사에서 `role!=admin` → 거부(CANON C: moderator는 회원 승인 불가).
- E2: 이미 `approved` 처리된 신청을 중복 승인 시도 → 현재 `status`가 `submitted`/`resubmitted`가 아니므로 거부.

**종료 조건**: 대상 `role==member`, `membershipApplications.status==approved`, `adminLogs` 1건, 알림 1건 생성.

---

### 플로우 9 — 관리자 거절 + 재신청

**시작 조건**: actor = `admin`(거절) → 이후 actor = 해당 `pending_member`(재신청)

1. `[/admin/members]` [admin] 신청 상세에서 "거절" 클릭, 거절 사유 입력.
2. `[클라이언트]` callable `reviewMembershipApplication({targetUid, decision: rejected, reason})` 호출.
3. `[Cloud Function]` `membershipApplications/{targetUid}.status: submitted→rejected`, `reason` 필드 기록(W). role 변경 없음(`pending_member` 유지).
4. `[Cloud Function]` `adminLogs` 기록(W).
5. `[트리거 onMembershipReviewed]` `notifications` 생성(W): `type=membership_rejected`.
   **상태전이**: `membershipApplications.status: submitted→rejected`

재신청:

6. `[/membership/pending]` [사용자] 거절 사유 확인 후 "재신청" 클릭(신청서 재작성).
7. `[클라이언트]` callable `submitMembershipApplication` 재호출.
8. `[Cloud Function]` 현재 `status==rejected` 확인 후 갱신(W).
   **상태전이**: `membershipApplications.status: rejected→resubmitted`
9. `[/admin/members]` admin이 플로우 8 절차로 재검토(승인 시 `resubmitted→approved`).

**실패·예외 분기**
- E1: 거절 사유 미입력 → 클라이언트 폼 검증에서 제출 차단(상태전이 없음).
- E2: `rejected`가 아닌 상태(예: `approved`)에서 재신청 시도 → Function이 상태 불일치로 거부.

**종료 조건**: 재신청 시 `status==resubmitted`. 이후 승인/거절은 플로우 8과 동일하게 종료.

---

### 플로우 10 — 게시글 작성

**시작 조건**: actor = `member` 이상, `users/{uid}.status==active`

1. `[/community/write]` [클라이언트] 라우트 가드: `role<member`면 `/community`로 리다이렉트(UI 가드).
2. `[/community/write]` [사용자] `categories(kind=community, status=active)` 중 카테고리 선택, 제목·본문(마크다운) 작성.
3. `[클라이언트]` `addDoc(posts, {...})`(W: `posts/{postId}`) — 직접 Firestore 쓰기(신뢰 조작 아니므로 D-001상 Cloud Function 경유 불필요).
4. `[Rules]` `posts` `create` 검사: `role in [member,trusted_member,moderator,admin]`, `authorUid==auth.uid`, `status=='published'`(초기값 고정), 카운터 필드(`likeCount`/`commentCount`)는 `0` 고정만 허용.
   **상태전이**: `posts/{postId}` (없음) → 생성, `status`: (없음) → `published`
5. `[Firestore 트리거 onPostCreated]` CANON H절에 "(V1 없음)"으로 명시 — 부가 처리 없음.
6. `[클라이언트]` 작성 성공 시 `/community/post`(실제 경로 `/community/posts/{postId}`)로 이동.

**실패·예외 분기**
- E1: `pending_member`가 URL 직접 조작으로 접근 후 제출 시도 → Rules에서 role 불일치로 거부(플로우 7과 동일 메커니즘).
- E2: 제목/본문 미입력 → 클라이언트 폼 검증에서 제출 차단.
- E3: 존재하지 않거나 `status==archived`인 `categoryId` 지정 → 검증 위치 미정(OPEN-06).

**종료 조건**: `posts/{postId}.status==published` 생성 완료, 목록/상세에 노출.

---

### 플로우 11 — 교육자료 작성·검토 요청

**시작 조건**: actor = `member` 이상

1. `[/materials/new]` [클라이언트] 라우트 가드: `role<member`면 차단.
2. `[/materials/new]` [사용자] `categories(kind=material)` 선택, 제목·본문·태그 작성, "임시저장" 또는 "검토 요청" 선택.
3-a. 임시저장(member/trusted_member 공통): `[클라이언트]` `addDoc(materials, {..., status: draft, authorUid})`(W).
   **상태전이**: `materials/{materialId}` (없음) → 생성, `status`: (없음) → `draft`
3-b. `member`가 "검토 요청" 선택: `[클라이언트]` `status: pending_review`로 생성(또는 `draft→pending_review` 갱신, W).
   **상태전이**: `status: (없음 또는 draft) → pending_review`
3-c. `trusted_member`가 "검토 요청" 선택: 역할표의 즉시 게시 권한 적용 → `[클라이언트]` `status: community`로 즉시 생성(W).
   **상태전이**: `status: (없음) → community`
4. `[/me 또는 자료 목록]` [사용자] `pending_review` 자료에 "검토 대기중" 표시.
5. `[/admin/materials]` [moderator 이상] `status==pending_review` 목록 조회 후 검토.
6. `[클라이언트]` callable `setMaterialStatus({materialId, status: community 또는 needs_revision})` 호출.
7. `[Cloud Function setMaterialStatus]` 진입검사: `role in [moderator, admin]`, `status==active`. `pending_review→community` 승인을 moderator가 수행할 수 있는지는 CANON 문구가 모호(OPEN-07).
   **상태전이**: `materials.status: pending_review → community` 또는 `→ needs_revision`(W)
8. `[트리거 onMaterialStatusChanged]` `notifications` 생성(W): `type=material_status_changed`.

**실패·예외 분기**
- E1: `member`가 `status`를 `community`/`official`로 직접 `addDoc` 시도(trusted_member 아님) → Rules가 `create` 시 `status ∈ {draft, pending_review}`만 허용하므로 거부.
- E2: 검토자가 `needs_revision`으로 반려하며 사유 미입력 → 클라이언트 폼 검증 차단.

**종료 조건**: `materials.status`가 `draft`/`pending_review`/`community`/`needs_revision` 중 하나로 확정, 상태 변경 시 작성자에게 알림 발송.

---

### 플로우 12 — 댓글 작성

**시작 조건**: actor = `member` 이상, `targetType ∈ {post, material}` 대상 문서가 존재하고 열람 가능 상태

1. `[/community/post 또는 /materials/item]` [사용자] 댓글 입력창에 내용 작성.
2. `[클라이언트]` `addDoc(comments, {targetType, targetId, authorUid, content, status: published, createdAt})`(W: `comments/{commentId}`).
3. `[Rules]` `comments` `create`: `role in [member,...,admin]`, `authorUid==auth.uid`, `status=='published'` 고정.
   **상태전이**: `comments/{commentId}` (없음) → 생성
4. `[Firestore 트리거 onCommentWritten]` 대상 문서(`posts` 또는 `materials`)의 `commentCount`를 `FieldValue.increment(1)`로 갱신(W) + 알림 생성(`comment_on_post`/`comment_on_material`, W: `notifications/{authorUid}/items/{id}`).
   **상태전이**: `posts 또는 materials.commentCount: n → n+1`

**실패·예외 분기**
- E1: 대상 문서가 `status==hidden`/`deleted`(post) 또는 `archived`(material)인데 댓글 작성 시도 → Rules가 대상 문서 상태를 확인해 거부(검사 방식은 `./05-DATA-MODEL-SSOT.md` 참조).
- E2: `pending_member`가 시도 → role 불일치로 거부(플로우 7과 동일).

**종료 조건**: `comments/{commentId}` 생성, 대상 `commentCount` 갱신, 원 작성자에게 알림 발송.

---

### 플로우 13 — 좋아요

**시작 조건**: actor = `member` 이상, `targetType ∈ {post, material}`

1. `[/community/post 등]` [사용자] 좋아요 버튼 클릭.
2. `[클라이언트]` 결정론적 ID `{targetType}__{targetId}__{uid}` 계산 → `setDoc(reactions/{reactionId}, {targetType, targetId, uid, type: like, createdAt})`(W).
   **상태전이**: `reactions/{id}` (없음) → 생성
3. `[Rules]` `reactions` `create`: `request.auth.uid==uid`, 문서 ID가 결정론적 규칙과 일치해야 함(위조 방지).
4. `[Firestore 트리거 onReactionWritten]` 대상 문서 `likeCount: FieldValue.increment(1)`(W).
   **상태전이**: `posts/materials.likeCount: n → n+1`
5. `[사용자]` 재클릭(취소) 시 `[클라이언트]` `deleteDoc(reactions/{reactionId})`(W) → 트리거가 `increment(-1)`.

**실패·예외 분기**
- E1: 이미 존재하는 `reactionId`로 재생성 시도(중복 좋아요) → 동일 ID `setDoc`은 `update`로 처리되어 `onCreate` 트리거가 재발화하지 않음(D-006의 "중복 방지" 목적과 일치, 카운터 중복 증가 없음).
- E2: `pending_member`가 시도 → role 불일치로 거부.
- E3: 클라이언트가 `posts/materials`의 `likeCount` 필드를 직접 쓰기 시도(우회) → Rules가 `likeCount` 필드 변경을 전면 차단(D-006 명시).

**종료 조건**: `reactions` 문서 존재 여부로 좋아요 상태 확정, 대상 `likeCount` 최신화.

---

### 플로우 14 — 북마크

**시작 조건**: actor = `member` 이상

1. `[/community/post 등]` [사용자] 북마크 버튼 클릭.
2. `[클라이언트]` 결정론적 ID `{uid}__{targetType}__{targetId}` 계산 → `setDoc(bookmarks/{bookmarkId}, {...})`(W).
   **상태전이**: `bookmarks/{id}` (없음) → 생성
3. `[Rules]` `create`: `request.auth.uid==uid`(ID 접두사와 일치). 읽기는 소유자만(D-007).
4. 카운터 갱신 없음(D-007 명시).
5. `[/me/bookmarks]` [사용자] `bookmarks where uid==본인` 조회(R, 소유자만 read 허용).
6. 재클릭(취소) 시 `deleteDoc(bookmarks/{bookmarkId})`(W).

**실패·예외 분기**
- E1: 타인이 남의 `bookmarks` 문서를 ID 추측으로 조회 시도 → Rules가 read 거부(소유자만).
- E2: `pending_member`가 시도 → role 불일치로 거부.

**종료 조건**: `bookmarks` 문서 존재 여부로 북마크 상태 확정.

---

### 플로우 15 — 신고 접수

**시작 조건**: actor = `member` 이상, `targetType ∈ {post, material}`(댓글 신고 포함 여부 OPEN-08)

1. `[/community/post, /materials/item 등]` [사용자] "신고" 클릭, `ReportReason` 선택.
2. `[클라이언트]` `addDoc(reports, {targetType, targetId, reason, reporterUid, status: open, createdAt})`(W: `reports/{reportId}`).
   **상태전이**: `reports/{reportId}` (없음) → 생성, `status`: (없음) → `open`
3. `[Rules]` `create`: `role in [member,...,admin]`, `reporterUid==auth.uid`.
4. `trusted_member`의 신고는 "가중치" 부여(CANON C절) — 처리 위치 미정(OPEN-09).
5. `[/admin/reports]` [moderator 이상] `status==open` 목록 조회(R).

**실패·예외 분기**
- E1: 동일 대상에 동일 사용자가 중복 신고 → `reports`도 `reactions`/`bookmarks`와 **동일하게 결정론적 ID `{targetType}__{targetId}__{reporterUid}`를 사용한다**([D-018](./11-DECISION-LOG.md)). 재제출은 `create`가 아닌 `update`가 되고 `update`는 moderator 전용 전이만 허용되므로 Rules 단계에서 자동 차단된다. 사용자에게는 "이미 신고한 대상입니다" 안내를 표시한다(OPEN-10 해소).
- E2: `pending_member`가 시도 → role 불일치로 거부.

**종료 조건**: `reports/{reportId}.status==open` 생성, 관리자 처리 대기열에 노출. (처리 자체는 권한 매트릭스의 "신고 처리" 행 및 `resolveReport` 참조 — 본 플로우는 접수까지로 종료.)

---

### 플로우 16 — 카테고리 신설 신청

**시작 조건**: actor = `member` 이상

1. `[/community 또는 /materials 내 "카테고리 제안"]` [사용자] 카테고리명, `kind`(`community`/`material`), 사유 입력.
2. `[클라이언트]` `addDoc(categoryRequests, {name, kind, reason, requesterUid, status: submitted, createdAt})`(W).
   **상태전이**: `categoryRequests/{requestId}` (없음) → 생성, `status`: (없음) → `submitted`
3. `[Rules]` `create`: `role in [member,...,admin]`.
4. `[/admin/categories]` [admin] `status==submitted` 목록 조회(R).
5. `[admin]` 승인 클릭 → callable `reviewCategoryRequest({requestId, decision: approved})` 호출.
6. `[Cloud Function]` 진입검사: `role==admin`.
7. `[Cloud Function]` `categoryRequests/{requestId}.status: submitted→approved`(W).
8. `[Cloud Function]` `categories/{slug}` 생성(`categoryId=slug`, `kind`, `status: active`, W).
   **상태전이**: `categories/{slug}` (없음) → 생성, `status`: (없음) → `active` / `categoryRequests.status: submitted → approved`
9. `[트리거]` `notifications` 생성(W): `type=category_request_resolved`.

**실패·예외 분기**
- E1: 이미 존재하는 `slug`로 중복 신청 → Function이 `categories/{slug}` 존재 확인 후 거부.
- E2: admin이 거절 → `categoryRequests.status: submitted→rejected`, `categories` 생성 없음.

**종료 조건**: 승인 시 `categories/{slug}.status==active` 생성 및 신청자 알림. 거절 시 `categoryRequests.status==rejected`로 종료.

---

### 플로우 17 — 자료 공식 승격

**시작 조건**: actor = `admin`, 대상 `materials/{materialId}.status==community`

1. `[/admin/materials]` [admin] `status==community` 자료 목록에서 승격 대상 선택.
2. `[클라이언트]` callable `setMaterialStatus({materialId, status: official})` 호출.
3. `[Cloud Function setMaterialStatus]` 진입검사: `role==admin`(CANON H: "official 승격은 admin" — moderator 불가).
4. `[Cloud Function]` `materials/{materialId}.status: community→official`(W).
   **상태전이**: `materials.status: community → official`
5. `[Cloud Function]` `adminLogs` 기록(W): `type=promote_material`.
6. `[트리거 onMaterialStatusChanged]` `notifications` 생성(W): `type=material_status_changed`(수신: 작성자).

**실패·예외 분기**
- E1: `moderator`가 승격 시도 → 진입검사에서 `role!=admin` → 거부.
- E2: `status!=community`인 자료(`draft`, `pending_review` 등)를 바로 `official`로 승격 시도 → Function이 현재 상태 검사 후 거부.

**종료 조건**: `materials.status==official`로 확정, `/materials` 공식 필터에 노출.

---

### 플로우 18 — 회원 정지·복구

**시작 조건(정지)**: actor = `admin`, 대상 `users/{targetUid}.status==active`

1. `[/admin/members]` [admin] 대상 선택, 정지 사유 입력.
2. `[클라이언트]` callable `suspendUser({targetUid, reason})` 호출.
3. `[Cloud Function suspendUser]` 진입검사: `role==admin`, 처리자 `status==active`.
4. `[Cloud Function]` `users/{targetUid}.status: active→suspended`(W).
   **상태전이**: `users.status: active → suspended`
5. `[Cloud Function]` `adminLogs` 기록(W): `type=suspend_user`.
6. 대상 사용자의 이후 모든 쓰기 요청은 Rules/Function의 `status==active` 검사에서 거부(role claim은 유지 — OPEN-03).

복구:

7. `[/admin/members]` [admin] 정지 회원 목록에서 "복구" 클릭.
8. `[클라이언트]` callable `restoreUser({targetUid})` 호출.
9. `[Cloud Function restoreUser]` `users/{targetUid}.status: suspended→active`(W).
   **상태전이**: `users.status: suspended → active`
10. `[Cloud Function]` `adminLogs` 기록(W): `type=restore_user`.

**실패·예외 분기**
- E1: `moderator`가 `suspendUser` 호출 시도 → CANON H에 "(admin)"로 명시 → `role!=admin` 거부.
- E2: 이미 `suspended`인 사용자를 재정지 시도 → Function이 상태 불일치로 거부.
- E3: `withdrawn` 상태 사용자를 `restoreUser`로 복구 시도 → 허용 여부 미정(OPEN-11).

**종료 조건**: `users.status`가 `suspended` 또는 `active`로 확정, `adminLogs` 기록 완료.

---

### 플로우 19 — 탈퇴

**시작 조건**: actor = 본인, role ∈ {`pending_member`, `member`, `trusted_member`, `moderator`, `admin`}

1. `[/me/settings]` [사용자] "탈퇴하기" 클릭 → 재인증(비밀번호 재입력 또는 소셜 재인증).
2. `[클라이언트]` `reauthenticateWithCredential`(또는 소셜 재인증 플로우) 수행.
3. `[클라이언트]` 탈퇴 처리 callable 호출 — **CANON H 콜러블 목록에 탈퇴 전용 함수가 없음(OPEN-12)**.
4. `[Cloud Function, OPEN-12]` `users/{uid}.status: (active|suspended)→withdrawn`(W).
   **상태전이**: `users.status → withdrawn`
5. `[Cloud Function]` Firebase Auth 계정 삭제 여부 미정(OPEN-13).
6. `[클라이언트]` 처리 완료 후 `signOut()`, `/`로 이동.

**실패·예외 분기**
- E1: 재인증 실패(비밀번호 오류) → 탈퇴 절차 중단, 상태전이 없음.
- E2: 시스템에 admin이 1명뿐인 상태에서 본인 탈퇴 시도 → 최소 admin 유지 정책 미정(OPEN-14).

**종료 조건**: `users.status==withdrawn`. 콘텐츠 처리는 본 문서 6절 참조.

---

## 3. 역할×기능 권한 매트릭스

`✅ 허용` · `❌ 불가` · `🔸 조건부(각주)`. "강제 지점"은 `Rules` / `Function` / `Rules+Function` / `UI만(비보안)` 중 하나.

| 기능 | guest | pending_member | member | trusted_member | moderator | admin | 강제 지점 |
|---|---|---|---|---|---|---|---|
| 공식 콘텐츠 열람(materials `official`) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Rules |
| 커뮤니티 글 열람(posts) | 🔸¹ | 🔸¹ | 🔸¹ | 🔸¹ | 🔸² | 🔸² | Rules |
| 자료 열람(materials) | 🔸¹ | 🔸¹ | 🔸¹ | 🔸¹ | 🔸² | 🔸² | Rules |
| 게시글 작성 | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | Rules |
| 게시글 수정(본인) | ❌ | ❌ | 🔸³ | 🔸³ | 🔸³ | 🔸³ | Rules |
| 게시글 삭제(본인) | ❌ | ❌ | 🔸³ | 🔸³ | 🔸³ | 🔸³ | Rules |
| 타인 게시글 숨김 | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | Rules+Function |
| 교육자료 작성 | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | Rules |
| 자료 수정(본인) | ❌ | ❌ | 🔸⁴ | 🔸⁴ | 🔸⁴ | 🔸⁴ | Rules |
| 자료 상태 변경 | ❌ | ❌ | ❌ | ❌ | 🔸⁵ | ✅ | Function |
| 자료 공식 승격 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | Function |
| 댓글 작성 | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | Rules |
| 댓글 삭제(본인) | ❌ | ❌ | 🔸³ | 🔸³ | 🔸³ | 🔸³ | Rules |
| 타인 댓글 삭제 | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | Rules+Function |
| 좋아요 | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | Rules |
| 북마크 | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | Rules |
| 신고 접수 | ❌ | ❌ | ✅ | 🔸⁶ | ✅ | ✅ | Rules |
| 신고 처리 | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | Function |
| 카테고리 신청 | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | Rules |
| 카테고리 승인 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | Function |
| 회원 승인 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | Function |
| 회원 정지 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | Function |
| 역할 변경 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | Function |
| 관리자 로그 열람 | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | Rules |
| 프로필 수정(본인) | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | Rules |
| 알림 열람 | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | Rules |

각주:
1. `status ∈ {published}`(posts) 또는 `{community, official}`(materials)인 문서만. 본인 소유 비공개 상태(`draft` 등)는 작성자 본인만 추가로 열람 가능.
2. `moderator`/`admin`은 위 1의 범위에 더해 `hidden`(posts), `pending_review`/`needs_revision`/`archived`(materials) 등 모든 상태를 열람 가능(모더레이션 목적).
3. `authorUid == request.auth.uid`인 문서에 한함. `moderator`/`admin`도 "본인 게시글/댓글"에 대해서만 이 행의 권한을 가지며, 타인 콘텐츠 삭제는 별도 행("타인 게시글 숨김", "타인 댓글 삭제")을 따른다.
4. `authorUid == request.auth.uid`이며 `status ∈ {draft, needs_revision}`인 자료만. `community`/`official` 상태의 자료는 본인도 직접 수정 불가(재수정이 필요하면 관리자가 `needs_revision`으로 되돌린 뒤 수정).
5. `moderator`는 `pending_review → needs_revision` 전이까지만 확실히 명시됨. `pending_review → community` 승인 가능 여부는 미정(OPEN-07).
6. `trusted_member`는 일반 `member`와 동일하게 접수 가능하되, 처리 시 가중치가 반영됨(처리 로직 위치 OPEN-09).

---

## 4. 상태 전이도

### MembershipApplication (`ApplicationStatus`)

| 현재 상태 | 다음 상태 | 전이 주체 | 트리거 |
|---|---|---|---|
| (없음) | `submitted` | 본인(`pending_member`) | `submitMembershipApplication` |
| `submitted` | `approved` | `admin` | `reviewMembershipApplication`(approved) |
| `submitted` | `rejected` | `admin` | `reviewMembershipApplication`(rejected) |
| `rejected` | `resubmitted` | 본인 | `submitMembershipApplication` 재호출 |
| `resubmitted` | `approved` | `admin` | `reviewMembershipApplication`(approved) |
| `resubmitted` | `rejected` | `admin` | `reviewMembershipApplication`(rejected) |

`approved`는 종단 상태(이후 CANON에 정의된 재전이 없음).

### PostStatus

| 현재 상태 | 다음 상태 | 전이 주체 | 트리거 |
|---|---|---|---|
| (없음) | `published` | 작성자(`member`+) | 게시글 작성(직접 `addDoc`) |
| `published` | `hidden` | `moderator`/`admin` | `moderatePost`(hide) |
| `hidden` | `published` | `moderator`/`admin` | `moderatePost`(restore) |
| `published` | `deleted` | 작성자 본인 | 직접 쓰기(소프트 삭제) |
| `hidden` | `deleted` | 미정 | OPEN-15 |

`deleted`는 종단 상태로 취급(복구 경로 CANON에 없음).

### MaterialStatus

| 현재 상태 | 다음 상태 | 전이 주체 | 트리거 |
|---|---|---|---|
| (없음) | `draft` | 작성자(`member`) | 자료 생성(임시저장) |
| (없음) | `pending_review` | 작성자(`member`) | 자료 생성(바로 검토 요청) |
| (없음) | `community` | 작성자(`trusted_member`) | 자료 생성(즉시 게시) |
| `draft` | `pending_review` | 작성자 | "검토 요청" |
| `pending_review` | `community` | `moderator`(범위 OPEN-07)/`admin` | `setMaterialStatus` |
| `pending_review` | `needs_revision` | `moderator`/`admin` | `setMaterialStatus` |
| `needs_revision` | `pending_review` | 작성자 | 수정 후 재요청 |
| `community` | `official` | `admin`만 | `setMaterialStatus` |
| `community` | `archived` | 미정 | OPEN-17 |
| `official` | `archived` | `admin`(추정, OPEN-17) | `setMaterialStatus` |

### ReportStatus

| 현재 상태 | 다음 상태 | 전이 주체 | 트리거 |
|---|---|---|---|
| (없음) | `open` | 신고자(`member`+) | 신고 접수 |
| `open` | `in_review` | `moderator`/`admin` | 처리 시작(경유 필수 여부 OPEN-18) |
| `open` | `resolved` | `moderator`/`admin` | `resolveReport` |
| `open` | `dismissed` | `moderator`/`admin` | `resolveReport` |
| `in_review` | `resolved` | `moderator`/`admin` | `resolveReport` |
| `in_review` | `dismissed` | `moderator`/`admin` | `resolveReport` |

---

## 5. UI 가드와 서버 가드의 분리 원칙

**UI에서 버튼을 숨기거나 라우트를 리다이렉트하는 것은 보안이 아니다.** 클라이언트 코드(JS 번들)는 누구나 열람·수정할 수 있고, Firestore/Storage SDK는 브라우저에서 임의로 호출 가능하므로, 실제 방어는 반드시 **Firestore Security Rules**(V1에서는 Cloud Functions 미사용, 이미지 업로드는 Cloudflare Worker)에서만 이뤄진다. UI 가드는 정상 사용자의 경험(불필요한 오류 노출 방지)을 위한 장치일 뿐이다.

| 화면 | UI 가드가 하는 일 | 실제 방어 위치 | 비고 |
|---|---|---|---|
| `/community/write` | `role<member`면 작성 버튼 비활성화·리다이렉트 | Rules(`posts` `create`) | UI 우회해도 Rules가 최종 차단(플로우 7) |
| `/community/edit` | 작성자 본인이 아니면 편집 버튼 숨김 | Rules(`update` 시 `authorUid` 검사) | |
| `/materials/new`, `/materials/edit` | 동일 패턴(role, 소유자) | Rules(`create`/`update` 조건, 상태 조건) | |
| `/admin/*` 전체 | `role ∉ {moderator, admin}`이면 레이아웃 단에서 즉시 리다이렉트 | ① Cloud Function 진입검사(role, status) ② Rules(`adminLogs` 등 컬렉션 read 제한) | Rules+Function 이중 방어 |
| `/me/*` | `auth.currentUser` 없으면 `/login` 리다이렉트 | Rules(본인 `uid` 문서만 read/write) | |
| `/membership/pending`, `/onboarding/profile` | role·문서 존재 여부에 따라 화면 간 리다이렉트 순서 강제 | Rules(`profiles`/`membershipApplications` 소유자 검사) + Function(`submitMembershipApplication` 진입검사) | |
| 전 화면 공통 좋아요·북마크·댓글·신고 버튼 | `role<member`면 버튼 비활성 또는 `/login` 유도 | Rules(각 컬렉션 `create` 조건) | |

원칙 요약: **UI 가드 = 사용성. Rules/Function = 보안.** 두 층 중 하나만 구현하고 다른 하나를 생략하면 안 된다(UI만 있으면 우회 가능, Rules만 있으면 사용자가 오류를 먼저 겪음).

---

## 6. 정지·탈퇴 사용자의 콘텐츠 처리 규칙

CANON에 정의된 enum(`PostStatus`, `CommentStatus`에는 "익명화" 상태값이 없음)을 벗어나는 새 enum 값은 만들지 않는다. 따라서 아래를 **기본값**으로 확정한다.

| 대상 | 정지(`suspended`) 시 처리 | 탈퇴(`withdrawn`) 시 처리 | 기본값 근거 |
|---|---|---|---|
| 게시글(`posts`) | **유지.** `status` 변경 없음(그대로 `published`). 신규 작성만 Rules에서 차단 | **유지.** `status`·`authorUid` 변경 없음(참조 무결성 보존). 화면 표시만 아래 프로필 마스킹을 통해 "탈퇴한 회원"으로 노출 | `PostStatus`에 별도 익명화 값이 없어 기존 문서를 그대로 두는 것이 CANON과 모순 없는 유일한 선택 |
| 댓글(`comments`) | **유지.** 동일 | **유지.** 동일(위와 같은 근거) | 상동 |
| 프로필(`profiles/{uid}`) | **변경 없음.**(임시 조치이므로 복구 가능성 보존) | **서버가 표시 필드를 마스킹.** 닉네임 → "탈퇴한 회원", 소개 등 개인정보 필드 → 공란. 문서 자체는 삭제하지 않음(댓글/게시글의 `authorUid` 참조가 깨지지 않도록) | 마스킹 처리는 탈퇴 처리 Function(OPEN-12)의 책임 범위에 포함되어야 함 |
| 업로드 이미지(`mediaAssets/{mediaAssetId}`) | **유지.** | **유지.** 게시글·자료에서 참조 중인 이미지가 깨지지 않도록 삭제하지 않음. ImageKit 파일 삭제는 Worker/관리자 수동 | 참조 무결성 우선 |
| `users/{uid}` | `status: active→suspended`(플로우 18) | `status: (active\|suspended)→withdrawn`(플로우 19). custom claim(`role`) 처리 여부는 미정(OPEN-19) | 플로우 18·19 정의 그대로 |

정지는 **임시 조치**이므로 콘텐츠·프로필을 전혀 건드리지 않는다(복구 시 원상태로 돌아가야 하므로). 탈퇴는 **영구 조치**이므로 개인 식별 정보만 마스킹하고, 커뮤니티 콘텐츠 자산(게시글·댓글·이미지)은 참조 무결성을 위해 삭제하지 않는 것을 기본값으로 한다.

---

## 7. 미결정 사항

| ID | 내용 |
|---|---|
| ~~OPEN-01~~ | **해소됨 → [11 결정 로그 D-017](./11-DECISION-LOG.md#d-017--신규-가입-부트스트랩을-bootstrapuseraccount-콜러블로-확정).** 멱등 콜러블 `bootstrapUserAccount`가 `users/{uid}` 생성과 `pending_member` claim 최초 부여를 담당한다. 가입 성공 직후 및 로그인 시 claim 미보유일 때 클라이언트가 호출하고, 성공 후 `getIdToken(true)`로 토큰을 갱신한다. |
| OPEN-02 | 최초 `admin` 계정 부트스트랩 방법 미정. 모든 역할 변경은 `setUserRole`(admin 전용)로만 발생하므로 최초 1인을 어떻게 만드는지(콘솔 수동 조작/별도 스크립트 등) 결정 필요 |
| OPEN-03 | `suspendUser`/`restoreUser`가 custom claim(`role`)에도 영향을 주는지, 아니면 `users/{uid}.status`만 변경하는지 CANON에 명시 없음(본 문서는 status만 변경하는 것으로 가정) |
| OPEN-04 | 이메일 인증 메일 재전송 쿨다운 시간, 인증 링크 만료 시간, `submitMembershipApplication` 진입검사에서 이메일 인증 확인 방식(claim vs ID 토큰 갱신 시점) 미정 |
| OPEN-06 | 게시글/자료 작성 시 `categoryId` 유효성(존재·`active` 여부) 검사를 Rules에서 하는지 클라이언트 검증만으로 충분한지 미정 |
| OPEN-07 | `setMaterialStatus`에서 `moderator`가 `pending_review→community` 승인까지 가능한지, `needs_revision` 반려까지만 가능한지 CANON H 문구("moderator: pending_review→needs_revision까지")가 모호함 |
| OPEN-08 | `reports`의 `TargetType`이 댓글(`comment`)을 포함하는지 불명(CANON E절 `TargetType` enum은 `post`\|`material`만 정의) |
| OPEN-09 | `trusted_member` 신고의 "가중치" 처리 로직 위치(`resolveReport` 내부 계산 vs 별도 필드) 미정 |
| ~~OPEN-10~~ **해소** | ~~`reports` 컬렉션 문서 ID가 autoId인지, 결정론적 ID인지 CANON D절에 명시 없음~~ → [D-018](./11-DECISION-LOG.md): **결정론적 ID `{targetType}__{targetId}__{reporterUid}`** 확정 |
| OPEN-11 | `withdrawn` 상태 사용자를 `restoreUser`로 `active` 복구 가능한지 여부 미정 |
| OPEN-12 | 회원 본인 탈퇴 처리 전용 Cloud Function이 CANON H 콜러블 목록에 없음(신설 필요) |
| OPEN-13 | 탈퇴 시 Firebase Auth 계정 자체를 삭제하는지, `users.status=withdrawn`만 남기고 Auth 계정은 보존하는지 미정 |
| OPEN-14 | 시스템에 `admin`이 1명만 남았을 때 해당 admin의 자진 탈퇴·강등을 허용할지(최소 admin 유지 정책) 미정 |
| OPEN-15 | `PostStatus`의 `hidden→deleted` 전이 가능 여부(모더레이터가 숨김 게시글을 완전 삭제까지 할 수 있는지) 미정 |
| OPEN-17 | `MaterialStatus`의 `archived` 전이를 `admin`만 수행하는지 `moderator`도 가능한지 CANON H에 명시 없음 |
| OPEN-18 | `ReportStatus`의 `open→in_review` 전이가 별도 액션으로 존재하는지, `resolveReport` 호출 시 `open`에서 바로 `resolved`/`dismissed`로 직행하는지 미정 |
| OPEN-19 | 탈퇴 시 custom claim(`role`)을 제거하는지 유지하는지 미정(`users.status=withdrawn`과 Rules의 `status==active` 검사로 사실상 무력화되나, claim 자체의 처리 방식은 별도 결정 필요) |
