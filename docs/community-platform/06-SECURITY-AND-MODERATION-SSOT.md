# 06. 보안·운영 정본 (Security & Moderation SSOT)

## 0. 문서 지위

이 문서는 AI_VIBE_CODING_MASTER 커뮤니티 전환의 **보안·운영 정본(Single Source of Truth)**이다.
Firestore Security Rules, Storage Rules, > V1에서 Cloud Functions를 사용하지 않습니다. 아래 코드는 참고용입니다.
Cloud Functions 권한 검사, 신고·제재·삭제·개인정보 정책은
이 문서를 유일한 근거로 삼는다. 이 문서는 Opus가 확정한 CANON 어휘집의 C절(역할)·D절(Firestore 경로)·
E절(enum)·H절(Cloud Functions)을 변경 없이 그대로 인용한다. 새 역할명·경로명·enum 값은 이 문서에서
만들지 않으며, 필요한 경우 [19. 미결정 사항](#19-미결정-사항-open-nn)에 `OPEN-nn`으로 남긴다.

**관련 문서**
- 데이터 모델 정본 — `./05-DATA-MODEL-SSOT.md` (Firestore 문서 스키마 상세, 별도 작성)
- 역할·라우트·아키텍처 정본 문서(00~04번대, 파일명 미확정) — 본 문서와 같은 CANON 어휘집을 근거로 병행 작성 중
- 이 문서가 참조하는 배포 대상 실제 파일: `firestore.rules`(레포 루트), `storage.rules`(레포 루트) — 두 파일은 아직 레포에 존재하지 않으며, [4절](#4-firestore-security-rules-전문)과 [5절](#5-storage-rules-전문)의 코드블록이 그 초안이다.

---

## 1. 문서 구성

| 절 | 내용 |
|---|---|
| 2 | 인증과 커뮤니티 승인의 분리 |
| 3 | 역할 저장 방식 결정 (CANON D-003) |
| 4 | Firestore Security Rules 전문 |
| 5 | Storage Rules 전문 |
| 6 | Cloud Function 내부 권한 검사 표준 코드 |
| 7 | callable별 권한 요구사항 표 |
| 8 | 신고 처리 워크플로 |
| 9 | 제재 정책 |
| 10 | 소프트 삭제 정책 |
| 11 | 관리자 로그 |
| 12 | 개인정보 최소 수집 |
| 13 | 탈퇴와 데이터 보존 |
| 14 | 스팸·남용 방지 |
| 15 | 속도 제한이 필요한 작업 목록 |
| 16 | 악성 파일 업로드 방지 |
| 17 | 클라이언트만으로 안전하지 않은 작업 목록 |
| 18 | 보안 테스트 시나리오 |
| 19 | 미결정 사항 |

---

## 2. 인증과 커뮤니티 승인의 분리

**원칙: Firebase Auth 로그인 성공(신원 확인) ≠ 커뮤니티 참여 권한(승인).**
Auth는 "이 사람이 누구인지"만 증명한다. "이 사람이 글을 쓸 수 있는지"는 별도의 심사 단계(CANON D-009)를
거쳐야 한다. 두 축을 분리하지 않으면 신원만 확인된 사람이 곧바로 쓰기 권한을 얻는 취약점이 생긴다.

**두 축**
- 인증 축: `guest`(미인증) / 인증됨(Firebase Auth 로그인 성공, ID 토큰 보유)
- 승인 축: CANON `UserRole`(guest\|pending_member\|member\|trusted_member\|moderator\|admin) ×
  CANON `UserStatus`(active\|suspended\|withdrawn)

**조합표**

| 인증 상태 | role | status | 콘텐츠 읽기 | 게시글/댓글 쓰기 | 자료 등록 | 관리 기능 |
|---|---|---|---|---|---|---|
| 미인증 | `guest`(claim 없음) | - | 공개(`published`/`community`/`official`)만 | 불가 | 불가 | 불가 |
| 인증됨, 승인 신청 전/대기 | `pending_member` | `active` | 공개만 | 불가 | 불가 | 불가 |
| 인증됨, 승인 완료 | `member` | `active` | 공개 + 본인 비공개 | 가능 | 가능(`pending_review`로 시작) | 불가 |
| 인증됨, 신뢰회원 | `trusted_member` | `active` | 공개 + 본인 비공개 | 가능 | 가능(`community`로 즉시 게시) | 불가 |
| 인증됨, 운영진 | `moderator` | `active` | 전체(숨김 포함) | 가능 | 가능 | 신고 처리, 게시글 숨김/복구, 댓글 삭제 |
| 인증됨, 관리자 | `admin` | `active` | 전체 | 가능 | 가능 | 전권 |
| 인증됨, 임의 역할 | 임의 | `suspended` | 공개 + 본인 소유 데이터 읽기만 | 불가 | 불가 | 불가 |
| 인증됨, 임의 역할 | 임의 | `withdrawn` | 계정 자체가 삭제 절차 진행 중(13절) | 불가 | 불가 | 불가 |

`suspended`/`withdrawn`의 정확한 로그인·읽기·쓰기 동작은 [9절](#9-제재-정책)과 [13절](#13-탈퇴와-데이터-보존)에서
확정값으로 정의한다. 이 표는 조합의 전체 그림만 보여준다.

---

## 3. 역할 저장 방식 결정 (CANON D-003)

### 3.1 세 가지 방식 비교

| 방식 | 설명 | 장점 | 단점 | 채택 |
|---|---|---|---|---|
| A. Firestore 문서만 | `users/{uid}.role`만 두고 Rules에서 `get()`으로 조회 | 갱신이 즉시 반영, 토큰 갱신 불필요 | Rules 평가마다 추가 문서 읽기(비용·지연) 발생, 위조 방지를 위해 결국 "이 필드는 서버만 쓴다"는 별도 보증이 또 필요해 구조가 이중화됨 | 기각 |
| B. custom claims만 | Firestore에 role 필드를 두지 않고 claim만 사용 | Rules에서 `request.auth.token.role`로 즉시 판정, 추가 읽기 없음, 위조 불가(서버 서명 토큰) | 관리자 화면에서 "역할별 회원 목록"을 Firestore 쿼리로 뽑을 수 없음(claim은 컬렉션이 아니라 각 사용자 나열 후 Admin API로 개별 조회해야 함 — 비효율) | 기각 |
| C. 혼합: claims 권위 + Firestore 미러 | 진실은 custom claim `role`, `users/{uid}.role`은 서버만 쓰는 읽기 전용 복사본 | Rules는 claim으로 빠르게 판정(추가 읽기 없음), 목록/필터 조회는 Firestore 쿼리로 저렴하게 처리, 미러는 Cloud Functions만 쓰므로 위조 불가 | claim 전파 지연(§3.2) 동안 claim과 미러가 잠깐 다를 수 있음 | **채택 (CANON D-003)** |

### 3.2 claim 전파 지연과 대응

Firebase ID 토큰은 발급 후 **최대 1시간** 클라이언트에 캐시된다. `setUserRole` 등으로 custom claim이
바뀌어도 이미 로그인해 있던 세션의 토큰에는 즉시 반영되지 않는다.

**대응 메커니즘 (확정)**
1. `users/{uid}`에 정수 필드 `roleVersion`을 둔다. 역할이 바뀔 때마다 Cloud Function이 `roleVersion`을 `+1` 증가시켜 Firestore 미러와 함께 갱신한다.
2. 클라이언트는 로그인 세션 동안 `users/{uid}` 문서를 `onSnapshot`으로 구독하고, 로컬에 캐시해 둔 `roleVersion`과 다른 값이 수신되면 `getIdToken(true)`를 호출해 토큰을 강제 갱신한다.

**`getIdToken(true)` 강제 갱신을 실행하는 4개 시점 (확정)**
1. 앱(SPA) 최초 로드 시, 로그인 세션이 있으면 1회.
2. `users/{uid}`의 `roleVersion` 변경을 `onSnapshot`으로 감지한 즉시.
3. `/membership/pending` 화면 체류 중 30초 간격 폴링(가입 승인 대기자가 승인 결과를 반영받기 위함).
4. 관리자 화면에서 `setUserRole`/`suspendUser`/`restoreUser`/`reviewMembershipApplication` 호출이 성공 응답을 반환한 직후, 호출자 자신이 대상(`targetUid == 자기 uid`)이었던 경우(관리자 자기 역할 변경 케이스).

---

## 4. Firestore Security Rules 전문

### 4.1 `users/{uid}` 필드 정의 (본 문서에서 확정)

CANON D절은 `users/{uid}`를 "서버 전용 쓰기(역할·상태 미러)"로만 규정하고 필드 목록을 정의하지 않는다.
Rules와 Functions가 정확히 동작하려면 필드가 확정되어야 하므로 이 문서에서 다음과 같이 확정한다.

| 필드 | 타입 | 용도 |
|---|---|---|
| `role` | string(UserRole) | claim 미러 |
| `status` | string(UserStatus) | 계정 상태 |
| `roleVersion` | number | claim 전파 지연 대응(§3.2) |
| `createdAt` / `updatedAt` | Timestamp | 표준 필드 |
| `withdrawnAt` | Timestamp \| null | 탈퇴 처리 시각(13절) |
| `suspendedUntil` | Timestamp \| null | 정지 해제 예정일(9절, UI 표시용) |
| `lastCommentAt` | Timestamp \| null | 댓글 속도 제한(14절) |
| `lastCommentBody` | string \| null | 댓글 중복 내용 차단(14절) |

### 4.2 firestore.rules 전문

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // ---------- 공통 헬퍼 ----------

    function isSignedIn() {
      return request.auth != null;
    }

    function role() {
      return isSignedIn() && ('role' in request.auth.token)
        ? request.auth.token.role
        : 'guest';
    }

    function hasRole(roles) {
      return role() in roles;
    }

    function isActive() {
      return isSignedIn()
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.status == 'active';
    }

    function isOwner(uid) {
      return isSignedIn() && request.auth.uid == uid;
    }

    function isModerator() {
      return hasRole(['moderator', 'admin']) && isActive();
    }

    function isAdmin() {
      return hasRole(['admin']) && isActive();
    }

    // 지정된 필드가 이번 쓰기 전/후로 동일한지 검사한다. 서버 전용 필드 보호에 사용한다.
    function unchanged(field) {
      return request.resource.data[field] == resource.data[field];
    }

    // 댓글 연속 작성 10초 제한 (14절). users/{uid}.lastCommentAt은 onCommentWritten 트리거가 갱신한다.
    function notRateLimitedForComment(uid) {
      let u = get(/databases/$(database)/documents/users/$(uid)).data;
      return !('lastCommentAt' in u)
        || request.time > u.lastCommentAt + duration.value(10, 's');
    }

    // 5분 이내 동일 본문 재작성 차단 (14절). 문자열 원문 비교(해시 아님 — Rules에 해시 함수 없음).
    function notDuplicateComment(uid, body) {
      let u = get(/databases/$(database)/documents/users/$(uid)).data;
      return !('lastCommentBody' in u) || !('lastCommentAt' in u)
        || request.time > u.lastCommentAt + duration.value(5, 'm')
        || u.lastCommentBody != body;
    }

    // ---------- users/{uid} : 역할·상태 미러, 서버 전용 쓰기 ----------
    // 클라이언트 쓰기는 전면 차단한다. 단 하나의 예외: 본인이 status를 active -> withdrawn 으로
    // 바꾸는 자진 탈퇴만 허용한다(13절). role/roleVersion/createdAt/lastComment* 는 그 예외에서도 불변이어야 한다.
    match /users/{uid} {
      allow read: if isOwner(uid) || isModerator();

      allow update: if isOwner(uid)
        && resource.data.status == 'active'
        && request.resource.data.status == 'withdrawn'
        && unchanged('role')
        && unchanged('roleVersion')
        && unchanged('createdAt')
        && unchanged('lastCommentAt')
        && unchanged('lastCommentBody');

      // 최초 생성은 bootstrapUserAccount 콜러블(Admin SDK)에서만 이루어진다(D-017). 클라이언트 create 금지.
      allow create: if false;
      allow delete: if false;
    }

    // ---------- profiles/{uid} : 소유자 편집 가능한 공개 표시 정보 ----------
    match /profiles/{uid} {
      allow read: if true;

      allow create: if isOwner(uid) && isActive()
        && request.resource.data.displayName is string
        && request.resource.data.displayName.size() >= 2 && request.resource.data.displayName.size() <= 24
        && request.resource.data.bio is string
        && request.resource.data.bio.size() <= 300;

      allow update: if isOwner(uid) && isActive()
        && request.resource.data.displayName is string
        && request.resource.data.displayName.size() >= 2 && request.resource.data.displayName.size() <= 24
        && request.resource.data.bio is string
        && request.resource.data.bio.size() <= 300;

      allow delete: if false; // 탈퇴 시에도 삭제 대신 익명화(13절) — 물리 삭제 없음
    }

    // ---------- membershipApplications/{uid} : docId = uid, 1인 1건 ----------
    match /membershipApplications/{uid} {
      allow read: if isOwner(uid) || isAdmin();

      // 최초 제출: pending_member 본인, status는 반드시 submitted로 시작
      allow create: if isOwner(uid) && isActive()
        && role() == 'pending_member'
        && request.resource.data.status == 'submitted'
        && request.resource.data.motivation is string
        && request.resource.data.motivation.size() >= 10 && request.resource.data.motivation.size() <= 1000;

      // 재제출: 기존 상태가 rejected일 때만, 본인만, resubmitted로만 전이
      allow update: if isOwner(uid) && isActive()
        && resource.data.status == 'rejected'
        && request.resource.data.status == 'resubmitted'
        && request.resource.data.motivation is string
        && request.resource.data.motivation.size() >= 10 && request.resource.data.motivation.size() <= 1000;

      allow delete: if false; // 심사 이력 보존
    }

    // ---------- posts/{postId} ----------
    match /posts/{postId} {
      allow read: if resource.data.status == 'published'
        || (isSignedIn() && resource.data.authorUid == request.auth.uid)
        || isModerator();

      allow create: if isActive()
        && hasRole(['member', 'trusted_member', 'moderator', 'admin'])
        && request.resource.data.authorUid == request.auth.uid
        && request.resource.data.status == 'published'
        && request.resource.data.title is string
        && request.resource.data.title.size() >= 2 && request.resource.data.title.size() <= 100
        && request.resource.data.bodyMarkdown is string
        && request.resource.data.bodyMarkdown.size() >= 1 && request.resource.data.bodyMarkdown.size() <= 20000
        && request.resource.data.category is string
        && request.resource.data.tags is list && request.resource.data.tags.size() <= 5
        && request.resource.data.likeCount == 0
        && request.resource.data.commentCount == 0;

      // 본인 수정(published 유지) 또는 본인 소프트삭제(published -> deleted)만 허용.
      // hidden 전이는 moderatePost Function(Admin SDK, Rules 우회) 전용 — 클라이언트로는 절대 불가.
      allow update: if isActive()
        && resource.data.authorUid == request.auth.uid
        && unchanged('authorUid') && unchanged('createdAt')
        && unchanged('likeCount') && unchanged('commentCount')
        && (
          (resource.data.status == 'published' && request.resource.data.status == 'published'
            && request.resource.data.title.size() >= 2 && request.resource.data.title.size() <= 100
            && request.resource.data.bodyMarkdown.size() >= 1 && request.resource.data.bodyMarkdown.size() <= 20000)
          || (resource.data.status == 'published' && request.resource.data.status == 'deleted')
        );

      allow delete: if false; // 물리 삭제 없음(10절) — 소프트 삭제만
    }

    // ---------- materials/{materialId} ----------
    match /materials/{materialId} {
      allow read: if resource.data.status in ['community', 'official']
        || (isSignedIn() && resource.data.authorUid == request.auth.uid)
        || isModerator();

      // trusted_member는 즉시 community, member는 pending_review로 시작, moderator/admin은 자유 지정
      allow create: if isActive()
        && hasRole(['member', 'trusted_member', 'moderator', 'admin'])
        && request.resource.data.authorUid == request.auth.uid
        && request.resource.data.title is string
        && request.resource.data.title.size() >= 2 && request.resource.data.title.size() <= 120
        && request.resource.data.description is string
        && request.resource.data.description.size() >= 1 && request.resource.data.description.size() <= 5000
        // 출처 필수화(D-021, FR-M08): sourceType 은 항상 필수이며 external 일 때만 resourceUrl 을 요구한다.
        && request.resource.data.sourceType in ['original', 'external']
        && (
             (request.resource.data.sourceType == 'external'
               && request.resource.data.resourceUrl is string
               && request.resource.data.resourceUrl.size() > 0
               && request.resource.data.resourceUrl.size() <= 2048)
             || (request.resource.data.sourceType == 'original'
               && !('resourceUrl' in request.resource.data))
           )
        // 강의·용어·Atlas 연결(D-020): 개수 상한만 Rules 로 강제한다.
        // 항목 내부의 {type,id} 형태 검사는 Rules 에서 map 순회가 불가능하므로 zod(클라이언트)와
        // 쓰기 경로 코드로 보장하고, Rules 는 배열 타입·크기만 막는다.
        && (!('linkedRefs' in request.resource.data)
             || (request.resource.data.linkedRefs is list
                  && request.resource.data.linkedRefs.size() <= 5))
        && request.resource.data.tags is list && request.resource.data.tags.size() <= 5
        && request.resource.data.likeCount == 0
        && request.resource.data.commentCount == 0
        && (
          (role() == 'trusted_member' && request.resource.data.status == 'community')
          || (role() == 'member' && request.resource.data.status == 'pending_review')
          || (role() in ['moderator', 'admin'] && request.resource.data.status in ['pending_review', 'community', 'official'])
        );

      // 본인 소유, 서버 전용 필드 불변. 상태 전이는 "본인이 셀프로 할 수 있는 것"만 허용:
      //   pending_review -> draft(철회), needs_revision -> pending_review(재제출),
      //   임의 상태 -> archived(소프트 삭제, 10절).
      // community/official 승격, needs_revision 지정은 setMaterialStatus Function 전용.
      allow update: if isActive()
        && resource.data.authorUid == request.auth.uid
        && unchanged('authorUid') && unchanged('createdAt')
        && unchanged('likeCount') && unchanged('commentCount')
        && (
          unchanged('status')
          || (resource.data.status == 'pending_review' && request.resource.data.status == 'draft')
          || (resource.data.status == 'needs_revision' && request.resource.data.status == 'pending_review')
          || (resource.data.status != 'archived' && request.resource.data.status == 'archived')
        );

      allow delete: if false;
    }

    // ---------- comments/{commentId} ----------
    match /comments/{commentId} {
      allow read: if resource.data.status == 'published'
        || (isSignedIn() && resource.data.authorUid == request.auth.uid)
        || isModerator();

      allow create: if isActive()
        && hasRole(['member', 'trusted_member', 'moderator', 'admin'])
        && request.resource.data.authorUid == request.auth.uid
        && request.resource.data.status == 'published'
        && request.resource.data.targetType in ['post', 'material']
        && request.resource.data.targetId is string
        && request.resource.data.bodyMarkdown is string
        && request.resource.data.bodyMarkdown.size() >= 1 && request.resource.data.bodyMarkdown.size() <= 2000
        && notRateLimitedForComment(request.auth.uid)
        && notDuplicateComment(request.auth.uid, request.resource.data.bodyMarkdown);

      // 본인 수정(published 유지, 길이 재검증) 또는 본인 소프트삭제(published -> deleted)만 허용.
      // hidden 전이는 deleteCommentByModerator Function 전용.
      allow update: if isActive()
        && resource.data.authorUid == request.auth.uid
        && unchanged('authorUid') && unchanged('createdAt')
        && unchanged('targetType') && unchanged('targetId')
        && (
          (resource.data.status == 'published' && request.resource.data.status == 'published'
            && request.resource.data.bodyMarkdown.size() >= 1 && request.resource.data.bodyMarkdown.size() <= 2000)
          || (resource.data.status == 'published' && request.resource.data.status == 'deleted')
        );

      allow delete: if false;
    }

    // ---------- reactions/{reactionId} : id = {targetType}__{targetId}__{uid} ----------
    match /reactions/{reactionId} {
      allow read: if isSignedIn();

      allow create: if isActive()
        && hasRole(['member', 'trusted_member', 'moderator', 'admin'])
        && reactionId == request.resource.data.targetType + '__' + request.resource.data.targetId + '__' + request.auth.uid
        && request.resource.data.targetType in ['post', 'material']
        && request.resource.data.type == 'like';

      allow update: if false; // 토글은 delete 후 재생성으로만 처리

      allow delete: if isSignedIn() && reactionId.split('__')[2] == request.auth.uid;
    }

    // ---------- bookmarks/{bookmarkId} : id = {uid}__{targetType}__{targetId} ----------
    match /bookmarks/{bookmarkId} {
      allow read: if isSignedIn() && bookmarkId.split('__')[0] == request.auth.uid;

      allow create: if isActive()
        && hasRole(['member', 'trusted_member', 'moderator', 'admin'])
        && bookmarkId == request.auth.uid + '__' + request.resource.data.targetType + '__' + request.resource.data.targetId
        && request.resource.data.targetType in ['post', 'material'];

      allow update: if false;

      allow delete: if isSignedIn() && bookmarkId.split('__')[0] == request.auth.uid;
    }

    // ---------- categories/{categoryId} : slug 기반, 전면 서버 전용 ----------
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if false; // reviewCategoryRequest Function(Admin SDK)만 생성/수정
    }

    // ---------- categoryRequests/{requestId} ----------
    match /categoryRequests/{requestId} {
      allow read: if isSignedIn()
        && (resource.data.requestedByUid == request.auth.uid || isAdmin());

      allow create: if isActive()
        && hasRole(['member', 'trusted_member', 'moderator', 'admin'])
        && request.resource.data.requestedByUid == request.auth.uid
        && request.resource.data.status == 'submitted'
        && request.resource.data.kind in ['community', 'material']
        && request.resource.data.proposedName is string
        && request.resource.data.proposedName.size() >= 1 && request.resource.data.proposedName.size() <= 30
        && request.resource.data.proposedSlug is string
        && request.resource.data.proposedSlug.size() >= 1 && request.resource.data.proposedSlug.size() <= 40
        && request.resource.data.proposedSlug.matches('^[a-z0-9-]+$')
        && request.resource.data.reason is string
        && request.resource.data.reason.size() >= 1 && request.resource.data.reason.size() <= 500;

      allow update: if false; // 승인/거절은 reviewCategoryRequest Function 전용
      allow delete: if false;
    }

    // ---------- reports/{reportId} : id = {targetType}__{targetId}__{reporterUid} ----------
    match /reports/{reportId} {
      allow read: if isSignedIn()
        && (resource.data.reporterUid == request.auth.uid || isModerator());

      // 결정론적 id이므로 동일 신고자의 동일 대상 재신고는 "이미 존재하는 문서에 대한 update"가 되어
      // 아래 update 규칙(트리아지 전용)에 걸려 자동으로 차단된다 (8절 참고).
      allow create: if isActive()
        && hasRole(['member', 'trusted_member', 'moderator', 'admin'])
        && reportId == request.resource.data.targetType + '__' + request.resource.data.targetId + '__' + request.auth.uid
        && request.resource.data.reporterUid == request.auth.uid
        && request.resource.data.status == 'open'
        && request.resource.data.targetType in ['post', 'material']
        && request.resource.data.reason in ['spam', 'abuse', 'illegal', 'copyright', 'wrong_info', 'other']
        && request.resource.data.detail is string
        && request.resource.data.detail.size() <= 500;

      // 트리아지(담당 지정): open -> in_review 만 moderator+가 직접 전환 가능.
      // 그 외 모든 상태 전이(resolved/dismissed)는 resolveReport Function 전용.
      allow update: if isModerator()
        && resource.data.status == 'open'
        && request.resource.data.status == 'in_review'
        && unchanged('reporterUid') && unchanged('targetType') && unchanged('targetId')
        && unchanged('reason') && unchanged('detail') && unchanged('createdAt');

      allow delete: if false;
    }

    // ---------- notifications/{uid}/items/{notificationId} : 서버 전용 생성 ----------
    match /notifications/{uid}/items/{notificationId} {
      allow read: if isOwner(uid);

      allow create: if false; // Firestore 트리거(Admin SDK) 전용

      // 소유자는 readAt 단일 필드만 갱신 가능
      allow update: if isOwner(uid)
        && unchanged('type') && unchanged('createdAt') && unchanged('payload')
        && request.resource.data.readAt is timestamp;

      allow delete: if isOwner(uid); // 카운터가 없어 개인 알림함 정리가 다른 데이터에 영향을 주지 않음
    }

    // ---------- adminLogs/{logId} : 서버 전용, 불변 ----------
    match /adminLogs/{logId} {
      allow read: if isAdmin();
      allow write: if false; // create/update/delete 전부 차단 — Cloud Functions(Admin SDK)만 add()
    }

    // ---------- moderationActions/{actionId} : 서버 전용 ----------
    match /moderationActions/{actionId} {
      allow read: if isModerator();
      allow write: if false;
    }
  }
}
```

**알려진 한계 (문법이 아닌 표현력의 한계, 명시)**: Firestore Rules는 배열 원소를 순회하며 각 태그의
길이를 개별 검증할 수 없다. `tags.size() <= 5`로 개수만 강제하고, 각 태그 문자열 길이(1~20자)는
클라이언트 UI에서 강제한다. 서버 측 개별 태그 길이 강제가 필요해지면 Cloud Functions 트리거 도입이
필요하다(19절 OPEN 대상 아님 — 현재 리스크 낮음으로 판단해 V1 범위에서 제외).

---

## 5. Storage Rules 전문

### 5.1 storage.rules 전문

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {

    function isSignedIn() {
      return request.auth != null;
    }

    function hasMemberRole() {
      return isSignedIn()
        && ('role' in request.auth.token)
        && request.auth.token.role in ['member', 'trusted_member', 'moderator', 'admin'];
    }

    // Firestore users/{uid}.status == 'active' 교차 서비스(cross-service) 조회.
    // 업로드 1건당 Firestore 읽기 1회가 추가로 과금되지만, suspended 사용자의 업로드를 막기 위해 채택한다.
    function isActiveMember(uid) {
      return hasMemberRole()
        && request.auth.uid == uid
        && firestore.exists(/databases/(default)/documents/users/$(uid))
        && firestore.get(/databases/(default)/documents/users/$(uid)).data.status == 'active';
    }

    // 업로드 이미지: uid별 폴더로 격리 → 다른 사용자 경로는 애초에 매치되지 않아 접근 불가.
    match /mediaAssets/{mediaAssetId} {
      allow read: if true; // 게시글·자료 본문에 <img>로 노출되는 공개 자산

      allow write: if isActiveMember(uid)
        && yyyyMM.matches('^[0-9]{6}$')
        && request.resource.size <= 5 * 1024 * 1024
        && request.resource.contentType in ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

      allow delete: if isSignedIn() && request.auth.uid == uid;
    }

    // 그 외 모든 경로는 전면 차단
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

### 5.2 확정값

| 항목 | 값 |
|---|---|
| 경로 | `mediaAssets/{mediaAssetId}` |
| 쓰기 권한 | 소유자만(`request.auth.uid == uid`) |
| 최소 역할 | `member` 이상(`member`\|`trusted_member`\|`moderator`\|`admin`) — `pending_member`는 업로드 불가 |
| 크기 상한 | 5MB (`5 * 1024 * 1024` bytes) |
| 허용 content-type | `image/png`, `image/jpeg`, `image/webp`, `image/gif` — 이 4종 외 전부 거부 |

### 5.3 확장자 위조 대응의 한계

Storage Rules는 요청 헤더의 `Content-Type`을 그대로 신뢰하며, 업로드된 바이트를 열어 매직넘버(파일
시그니처)를 검사하지 않는다. 즉 텍스트 파일에 `Content-Type: image/png` 헤더를 붙여 업로드하면
Rules 검사를 통과한다. 완전한 방어(매직넘버 검증)는 Storage `onFinalize` 트리거로 업로드 후 파일을
재검사해야 하는데, 이 트리거는 CANON H절의 Firestore 트리거 목록에 없다. V1에서는 다음 3중 완화만
적용하고, 매직넘버 검증은 [OPEN-04](#19-미결정-사항-open-nn)로 남긴다.

1. Storage Rules의 content-type + 크기 제한(1차 방어선).
2. 업로드된 자산은 항상 `<img>` 태그로만 렌더링한다(HTML/JS 실행 컨텍스트로 렌더링하지 않으므로 XSS 실행 경로가 없다).
3. 원본 파일명을 저장하지 않는다. `fileId`는 클라이언트가 생성하는 임의 문자열이며 확장자는 업로드 시점의 MIME 기반으로만 결정한다.

---

## 6. Cloud Function 내부 권한 검사 표준 코드

모든 callable은 CANON H절이 정한 순서 — (1) `request.auth` 존재 → (2) `request.auth.token.role` 검사
→ (3) `users/{uid}.status == active` 검사 → (4) `adminLogs` 기록 — 을 그대로 따른다. 아래 헬퍼를
모든 callable 진입부에서 재사용한다.

```typescript
// functions/src/lib/guard.ts
import { HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const db = getFirestore();

export type UserRole =
  | "guest"
  | "pending_member"
  | "member"
  | "trusted_member"
  | "moderator"
  | "admin";

export interface AuthedRequest {
  auth: { uid: string; token: Record<string, unknown> };
}

// (1) request.auth 존재 검사
export function assertAuth<T>(request: CallableRequest<T>): AuthedRequest["auth"] {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "로그인이 필요합니다.");
  }
  return { uid: request.auth.uid, token: request.auth.token as Record<string, unknown> };
}

// (2) request.auth.token.role 검사
export function assertRole(
  auth: AuthedRequest["auth"],
  allowed: UserRole[],
): UserRole {
  const role = (auth.token.role as UserRole) ?? "guest";
  if (!allowed.includes(role)) {
    throw new HttpsError(
      "permission-denied",
      `역할 권한 부족: 필요=[${allowed.join("|")}], 현재=${role}`,
    );
  }
  return role;
}

// (3) users/{uid}.status == active 검사
export async function assertActive(uid: string): Promise<void> {
  const snap = await db.doc(`users/${uid}`).get();
  const status = snap.data()?.status;
  if (!snap.exists || status !== "active") {
    throw new HttpsError(
      "failed-precondition",
      "계정 상태가 active가 아닙니다.",
    );
  }
}

// (4) adminLogs 기록 — 모든 callable이 성공 시 반드시 호출한다.
export interface AdminLogEntry {
  actorUid: string;
  actorRole: UserRole;
  action: string;
  targetType:
    | "user"
    | "membershipApplication"
    | "material"
    | "categoryRequest"
    | "report"
    | "post"
    | "comment";
  targetId: string;
  before?: unknown;
  after?: unknown;
  reason?: string;
}

export async function writeAdminLog(entry: AdminLogEntry): Promise<void> {
  await db.collection("adminLogs").add({
    ...entry,
    createdAt: FieldValue.serverTimestamp(),
  });
}
```

**표준 진입 시퀀스 (모든 callable에 그대로 적용)**

```typescript
export const exampleCallable = onCall(async (request) => {
  const auth = assertAuth(request);              // (1)
  const role = assertRole(auth, ["moderator", "admin"]); // (2)
  await assertActive(auth.uid);                    // (3)

  // ...입력 검증 및 비즈니스 로직...

  await writeAdminLog({                            // (4)
    actorUid: auth.uid,
    actorRole: role,
    action: "example_action",
    targetType: "post",
    targetId: request.data.postId,
  });

  return { ok: true };
});
```

**실패 시 `HttpsError` 코드 매핑표**

| 검사 단계 | 실패 조건 | `HttpsError` code | 예시 message |
|---|---|---|---|
| `assertAuth` | `request.auth`가 없음 | `unauthenticated` | 로그인이 필요합니다. |
| `assertRole` | 현재 role이 허용 목록에 없음 | `permission-denied` | 역할 권한 부족: 필요=[moderator\|admin] |
| `assertActive` | status가 `suspended`/`withdrawn`/문서 없음 | `failed-precondition` | 계정 상태가 active가 아닙니다. |
| 입력 검증 | 필수 필드 누락, 타입 불일치, 길이 초과 | `invalid-argument` | 입력값이 올바르지 않습니다. |
| 대상 조회 | 대상 문서가 존재하지 않음 | `not-found` | 대상을 찾을 수 없습니다. |
| 상태 충돌 | 이미 처리된 상태 전이 재시도(예: 이미 `approved`) | `failed-precondition` | 이미 처리된 요청입니다. |
| 그 외 예외 | 위에 해당하지 않는 모든 예외 | `internal` | 서버 오류가 발생했습니다. |

---

## 7. callable별 권한 요구사항 표

CANON H절 callable 전부(원 9개 + `bootstrapUserAccount` = **10개**, [11 D-017](./11-DECISION-LOG.md)). `bootstrapUserAccount`만 진입부 검사 순서가 다르다(역할·`users` 문서가 아직 없는 상태에서 실행되는 유일한 콜러블이므로 `①auth → ②users 조회 → ③존재 시 무쓰기 반환 → ④생성 → ⑤claim → ⑥adminLog`). "adminLog 기록"란은 6절의 표준 시퀀스에 따라 **모든 callable이 예외 없이**
성공 시 `adminLogs`에 1건을 남긴다는 전제 위에서, 그 항목의 `action`/`targetType`/`before`/`after` 값을 정의한다.

| callable | 최소 역할 | 추가 조건 | 검증할 입력 | 실패 코드 | adminLog 기록 내용 |
|---|---|---|---|---|---|
| `submitMembershipApplication` | `pending_member`(본인) | 기존 `membershipApplications/{uid}` 없음 또는 `status == 'rejected'` | `motivation`(10~1000자) | unauthenticated, permission-denied, failed-precondition, invalid-argument | action=`submit_membership_application`, targetType=`membershipApplication`, targetId=uid, after={status: submitted\|resubmitted} |
| `reviewMembershipApplication` | `admin` | 대상 문서 `status in [submitted, resubmitted]` | `targetUid`, `decision`(approved\|rejected), `reason`(거절 시 1~500자 필수) | unauthenticated, permission-denied, failed-precondition, not-found, invalid-argument | action=`review_membership_application`, targetType=`membershipApplication`, before/after={status}, approved 시 `users/{uid}.role`도 `member`로 변경(claim 포함) |
| `setUserRole` | `admin` | 대상이 유일한 `admin`인 경우 자기 강등/타인 강등 모두 차단(최소 1명 admin 유지) | `targetUid`, `newRole`(UserRole 중 하나) | unauthenticated, permission-denied, failed-precondition(마지막 admin), invalid-argument, not-found | action=`change_role`, targetType=`user`, before/after={role}, `roleVersion` +1 |
| `suspendUser` | `admin` | 대상이 이미 `suspended`가 아님 | `targetUid`, `reason`(1~500자), `durationDays`(3\|7\|30\|null=영구) | unauthenticated, permission-denied, failed-precondition, invalid-argument, not-found | action=`suspend_user`, targetType=`user`, before/after={status}, reason, `suspendedUntil` 계산값 |
| `restoreUser` | `admin` | 대상이 `suspended` 상태임 | `targetUid` | unauthenticated, permission-denied, failed-precondition, not-found | action=`restore_user`, targetType=`user`, before/after={status} |
| `setMaterialStatus` | `moderator`(`pending_review`→`needs_revision`까지) / `admin`(`official` 승격 포함 전체) | 대상 자료 존재, 요청한 상태 전이가 유효(임의 상태 도약 금지) | `materialId`, `newStatus`, `reason`(`needs_revision` 지정 시 1~1000자 필수) | unauthenticated, permission-denied, failed-precondition, not-found, invalid-argument | action=`promote_material`\|`demote_material`, targetType=`material`, before/after={status} |
| `reviewCategoryRequest` | `admin` | 대상 요청 `status == 'submitted'` | `requestId`, `decision`(approved\|rejected), `reason`(거절 시 필수) | unauthenticated, permission-denied, failed-precondition, not-found, invalid-argument | action=`review_category_request`, targetType=`categoryRequest`, before/after={status}, 승인 시 `categories/{slug}` 생성 |
| `resolveReport` | `moderator` | 대상 신고 `status in [open, in_review]` | `reportId`, `resolution`(resolved\|dismissed), `actionTaken`(선택, ModerationActionType 값 또는 `warn_user` — 9절), `note`(0~1000자) | unauthenticated, permission-denied, failed-precondition, not-found, invalid-argument | action=`resolve_report`, targetType=`report`, before/after={status}, `actionTaken`이 ModerationActionType에 속하면 `moderationActions`에도 별도 기록 |
| `moderatePost` | `moderator` | 대상 게시글 존재 | `postId`, `action`(hide\|restore), `reason`(hide 시 1~500자 필수) | unauthenticated, permission-denied, failed-precondition, not-found, invalid-argument | action=`hide_post`\|`restore_post`, targetType=`post`, before/after={status} |
| `deleteCommentByModerator` | `moderator` | 대상 댓글 존재, 아직 `deleted` 아님 | `commentId`, `reason`(1~500자 필수) | unauthenticated, permission-denied, failed-precondition, not-found, invalid-argument | action=`delete_comment`, targetType=`comment`, before/after={status} |

---

## 8. 신고 처리 워크플로

```
접수(open) → 트리아지(in_review) → 조치 → 종결(resolved | dismissed)
```

| 단계 | 담당 역할 | 상태 전이 | 처리 경로 | SLA(확정값) |
|---|---|---|---|---|
| 접수 | `member` 이상(신고자) | (없음) → `open` | 클라이언트 직접 Firestore `create`(결정론적 id, 4.2절 Rules) | - |
| 트리아지 | `moderator` 이상 | `open` → `in_review` | 클라이언트 직접 Firestore `update`(4.2절 Rules에서 이 전이만 허용) | 접수 후 **24시간 이내** 착수 |
| 조치·종결 | `moderator` 이상 | `in_review` → `resolved`\|`dismissed` | `resolveReport` callable(6·7절) | 트리아지 후 **72시간 이내** 종결 |

V1은 SLA 위반에 대한 자동 에스컬레이션·알림을 구현하지 않는다(D-010 비목표: 이메일 발송 알림 없음과
일관). 위 24시간/72시간은 `/admin/reports` 대시보드에서 `createdAt` 기준 정렬로 운영자가 수동
확인하는 운영 목표치다.

**중복 신고 처리 (결정)**

신고 문서 ID는 **결정론적 ID `{targetType}__{targetId}__{reporterUid}`를 채택한다.**

- 근거: 동일 신고자가 동일 대상을 반복 제출해도 같은 문서 ID로 수렴하므로, 두 번째 이후 제출은
  Firestore `create`가 아니라 기존 문서에 대한 `update`가 되고, 4.2절 Rules는 `open → in_review`
  전이만 `update`로 허용하므로 신고자 본인이 임의로 `update`를 시도해도 통과하지 못한다(자기 자신은
  `isModerator()`가 아니므로). 즉 별도의 서버 로직·쿼리 없이 Rules만으로 중복 신고가 차단된다.
- 트레이드오프: 같은 신고자가 "다른 사유로" 같은 대상을 재신고하고 싶어도 막힌다. V1은 이를
  허용하지 않는다 — 재신고가 필요하면 `detail` 필드에 추가 정황을 적을 수 없으므로(문서가
  이미 존재해 `create` 자체가 불가), 사용자는 다른 채널(관리자 문의)로 보완 정보를 제공해야 한다.
  이 제약은 신고 남용(동일인의 도배성 반복 신고)을 막는 이득이 재신고 편의 손실보다 크다고 판단했다.
- `targetType`은 CANON `TargetType`(`post`\|`material`)만 지원한다. 댓글·회원(사용자) 자체를 직접
  신고 대상으로 지정하는 기능은 CANON에 해당 enum이 없어 V1에 없다([OPEN-01](#19-미결정-사항-open-nn)).

---

## 9. 제재 정책

### 9.1 단계별 정책

| 단계 | 발동 기준(확정값) | 실행 경로 | 기록 |
|---|---|---|---|
| 경고 | 첫 신고 확정(대상 콘텐츠에 명백한 문제는 아니나 주의가 필요한 경우) | `resolveReport`의 `actionTaken='warn_user'` | `notifications`(type=`admin_notice`) + `adminLogs`. `ModerationActionType` enum에 `warn_user` 값이 없어 `moderationActions`에는 기록하지 않는다([OPEN-05](#19-미결정-사항-open-nn)) |
| 임시 정지 3일 | 경고 누적 2회 이상 | `suspendUser`(admin), `durationDays=3` | `adminLogs` + `moderationActions`(`suspend_user`) |
| 임시 정지 7일 | 신고 3건 이상이 각각 `resolved`(조치 있음)로 확정 | `suspendUser`(admin), `durationDays=7` | 동일 |
| 임시 정지 30일 | `illegal`\|`copyright` 신고 확정 또는 명백한 도배(동일 내용 대량 게시)가 확인된 경우 | `suspendUser`(admin), `durationDays=30` | 동일 |
| 영구 정지 | `illegal` 신고 확정 반복, 또는 임시 정지 이력 2회 이상 후 재위반 | `suspendUser`(admin), `durationDays=null` | 동일 |

### 9.2 해제 절차

- `suspendUser`는 `suspendedUntil = now + durationDays`(영구 정지는 `null`)을 `users/{uid}`에 기록한다.
- **해제는 오직 `restoreUser`(admin) 수동 호출로만 이루어진다.** `suspendedUntil` 만료 시 자동으로
  `active`로 되돌리는 스케줄 Function은 두지 않는다 — CANON H절의 트리거 목록에 스케줄 트리거가
  없고, 새 트리거를 추가하는 것은 CANON 변경에 해당하기 때문이다([OPEN-08](#19-미결정-사항-open-nn)).
  `suspendedUntil`은 `/admin/members` 화면에서 "이 날짜가 지나면 관리자가 직접 해제하라"는 표시
  용도로만 쓰인다.

### 9.3 정지(`suspended`) 사용자의 로그인·읽기·쓰기

| 동작 | 결과 | 근거 |
|---|---|---|
| 로그인(Firebase Auth) | **가능** | Auth 계정 자체는 비활성화하지 않는다. Admin SDK의 계정 disable 기능을 V1에서 쓰지 않는 이유: 계정을 disable하면 클라이언트가 정지 사유를 알 수 없는 채로 로그인 오류만 보게 되어 UX가 나쁘다. 대신 로그인 후 클라이언트가 `users/{uid}.status`를 읽어 정지 안내 화면으로 리다이렉트한다. |
| 공개 콘텐츠 읽기 | 가능 | 4.2절 Rules의 read 조건은 role/status와 무관하게 `status=='published'` 등 공개 여부만 본다. |
| 본인 소유 데이터 읽기(`users`, `profiles`, `notifications` 등) | 가능 | `isOwner()`만 요구, `isActive()` 요구 없음. |
| 모든 쓰기(게시글/댓글/자료/반응/북마크 생성·수정) | **전면 차단** | 4.2절의 모든 `create`/`update` 규칙이 `isActive()`를 요구하며, `isActive()`는 `status=='active'`만 통과시킨다. |

### 9.4 `withdrawn` 사용자

13절 참조. 탈퇴 절차가 완료되면 Auth 계정 자체가 삭제되므로 재로그인이 불가능하다.

---

## 10. 소프트 삭제 정책

| 컬렉션 | 소프트 삭제 표현 | 남기는 것 | 지우는 것 | 화면 표시 문구 |
|---|---|---|---|---|
| `posts` | `status: 'deleted'`, `deletedAt` 기록 | `postId`, `authorUid`, `createdAt`, `deletedAt`, `title`, `bodyMarkdown`(원문 보존, 목록/피드에서는 제외) | 없음(원문 보존) | 목록: 노출 안 됨. 상세: "삭제된 게시글입니다." |
| `comments` | `status: 'deleted'`, `deletedAt` 기록 | 원문 보존(스레드 정합성·`commentCount` 산정을 위해) | 없음 | "삭제된 댓글입니다." (본문 자리에 표시, 스레드 위치는 유지) |
| `materials` | `status: 'archived'`(materials에는 `deleted` enum이 없어 `archived`를 소프트 삭제로 사용) | 원문 보존 | 없음 | 목록: 노출 안 됨. 상세: "보관된(비공개) 자료입니다." |

**물리 삭제 시점(확정값): `deletedAt` 기준 90일 경과.**
CANON H절 트리거 목록에 자동 물리 삭제용 스케줄 트리거가 없으므로, V1에서는 자동화하지 않는다.
90일이 지난 소프트 삭제 문서는 관리자가 Firebase 콘솔/Admin SDK 스크립트로 수동 조회 후 물리
삭제한다([OPEN-06](#19-미결정-사항-open-nn)).

---

## 11. 관리자 로그

### 11.1 기록 대상 액션 전체 목록

| action 값 | 발생 callable |
|---|---|
| `submit_membership_application` | `submitMembershipApplication` |
| `review_membership_application` | `reviewMembershipApplication` |
| `change_role` | `setUserRole` |
| `suspend_user` | `suspendUser` |
| `restore_user` | `restoreUser` |
| `promote_material` / `demote_material` | `setMaterialStatus` |
| `review_category_request` | `reviewCategoryRequest` |
| `resolve_report`(포함: `warn_user` 경고, 9절) | `resolveReport` |
| `hide_post` / `restore_post` | `moderatePost` |
| `delete_comment` | `deleteCommentByModerator` |

### 11.2 필드 규약

| 필드 | 타입 | 설명 |
|---|---|---|
| `logId` | string | 문서 ID(자동 생성) |
| `actorUid` | string | 실행자 uid |
| `actorRole` | UserRole | 실행 당시 역할 |
| `action` | string | 위 표의 값 |
| `targetType` | `user`\|`membershipApplication`\|`material`\|`categoryRequest`\|`report`\|`post`\|`comment` | 대상 종류 |
| `targetId` | string | 대상 문서 ID |
| `before` / `after` | any(선택) | 변경 전/후 스냅샷 일부 |
| `reason` | string(선택) | 사람이 입력한 사유 |
| `createdAt` | Timestamp | `FieldValue.serverTimestamp()` |

### 11.3 불변성 보장 방법

`adminLogs`에 대한 Firestore Rules는 `allow write: if false`로 create/update/delete를 전부
클라이언트에서 차단한다(4.2절). 오직 Cloud Functions가 Admin SDK로 `add()`만 호출하며, Admin SDK를
사용하는 코드베이스 어디에도 `adminLogs`의 update/delete 로직을 구현하지 않는 것을 운영 규칙으로
못박는다.

### 11.4 열람 권한 / 보존 기간

- 열람: `isAdmin()`만 가능. `moderator`는 자신이 수행한 조치라도 `adminLogs`를 직접 열람할 수 없고,
  대신 `moderationActions`(`isModerator()` 열람 가능)에서 자신의 모더레이션 이력만 확인한다.
- 보존 기간(확정값): **무기한 보존, 자동 삭제 없음.** 감사 목적의 로그이므로 삭제 정책 자체를 두지 않는다.

---

## 12. 개인정보 최소 수집

### 12.1 수집 항목

| 항목 | 목적 | 필수 | 보존 기간 | 저장 위치 |
|---|---|---|---|---|
| 이메일 | 로그인 식별, 계정 복구 | 필수 | 탈퇴 시 Auth 계정과 함께 삭제 | Firebase Auth |
| 비밀번호(해시) | 로그인 인증 | 이메일/비밀번호 로그인 사용 시 필수 | 탈퇴 시 삭제 | Firebase Auth(자체 해시 저장, 앱 코드에서 조회 불가) |
| 표시 닉네임 | 커뮤니티 표시명 | 필수 | 탈퇴 시 "탈퇴한 회원"으로 대체(13절), 원본 폐기 | `profiles/{uid}.displayName` |
| 아바타 이미지 | 프로필 표시 | 선택 | 탈퇴 시 Storage에서 삭제 | Storage `uploads/{uid}/...`, `profiles/{uid}.avatarUrl` |
| 자기소개(bio) | 프로필 표시 | 선택 | 탈퇴 시 삭제 | `profiles/{uid}.bio` |
| 가입 신청 동기 | 회원 승인 심사 | 필수(신청 시) | 심사 완료 후에도 이력으로 보존(삭제 없음, 10.·11. 준용) | `membershipApplications/{uid}` |
| 게시글/댓글/자료 본문 | 서비스 핵심 기능 | 필수(작성 시) | 탈퇴 후에도 본문은 유지, 작성자 표시만 익명화(13절) | `posts`/`materials`/`comments` |

### 12.2 수집하지 않는 것

IP 주소 로그(호스팅 제공자의 일반 접근 로그 제외 — 앱 코드가 별도 수집하지 않음), 위치정보, 기기
식별자/핑거프린트, 결제·카드 정보(D-010 비목표), 실명, 전화번호(V1 프로필 스키마에 없음), 로그인
제공자 프로필 사진 외 추가 SNS 데이터.

### 12.3 `/privacy` 페이지 갱신 필요 항목

현재 `src/app/privacy/page.tsx`는 "회원가입 기능 없음", "서버 측 사용자 계정 데이터베이스 없음"을
명시하고 있어 커뮤니티 기능 출시 시 사실과 어긋난다. 다음을 추가/수정해야 한다.

1. 1절("수집하지 않는 것")에서 "이름, 이메일... 회원가입 정보 (가입 기능 없음)"과 "서버 측 사용자
   계정 데이터베이스" 두 항목을 삭제 — 더 이상 사실이 아님.
2. Firebase Auth를 통한 이메일/비밀번호 수집·처리 위탁 사실 고지(위탁처리자: Google Firebase).
3. 프로필/게시글/댓글/자료 등 이용자 생성 콘텐츠(UGC) 저장 및 공개 노출 방침 추가.
4. 이미지 업로드(Firebase Storage) 저장 방침, 크기/형식 제한(5.2절) 고지.
5. 관리자 로그(`adminLogs`)에 이용자의 운영 관련 행위(신고, 제재 등)가 기록된다는 사실 고지.
6. 탈퇴 시 처리 방침(13절 요약: 계정 삭제, 콘텐츠 익명화, 복구 불가) 추가.
7. 신고 처리 시 신고자·피신고자 정보가 운영진에게 노출된다는 사실 고지.
8. 데이터 위탁처리자로 Google Firebase(Authentication/Firestore/Storage/Cloud Functions, 리전
   `asia-northeast3`)를 명시.

---

## 13. 탈퇴와 데이터 보존

### 13.1 탈퇴 절차

1. `/me/settings`에서 탈퇴 요청 → 비밀번호 재인증(Firebase Auth `reauthenticateWithCredential`).
2. "탈퇴 시 계정 정보와 프로필이 즉시 삭제되며 복구할 수 없습니다. 작성한 게시글·댓글은 익명화되어
   유지됩니다." 확인 모달에 동의.
3. 클라이언트가 다음을 순서대로 실행한다(전용 callable 없음 — 아래 "설계 근거" 참고).
   1. `users/{uid}.status`를 `active → withdrawn`으로 갱신(4.2절 Rules의 예외 허용 경로).
   2. `profiles/{uid}`를 소유자 권한으로 직접 갱신: `displayName → "탈퇴한 회원"`, `bio → ""`,
      `avatarUrl → 기본 이미지`.
   3. 본인 소유 `bookmarks/*`, `reactions/*`, `notifications/{uid}/items/*` 문서를 조회해 각각
      `delete`(모두 소유자 delete가 4.2절에서 허용됨).
   4. Firebase Auth 클라이언트 SDK의 `deleteUser(auth.currentUser)`로 본인 Auth 계정을 직접 삭제한다
      (클라이언트 SDK가 기본 제공하는 자기 계정 삭제 기능이며 Cloud Function이 아니다).

**설계 근거**: CANON H절이 정한 callable 목록(10개)에 탈퇴 전용 callable이 없다. 새 callable을
추가하는 것은 CANON 변경에 해당하므로, 탈퇴는 (a) Rules가 명시적으로 허용하는 `users/{uid}`
자기 상태 전이 예외, (b) 이미 소유자에게 허용된 `profiles`/`bookmarks`/`reactions`/`notifications`
쓰기 권한, (c) Firebase Auth 클라이언트 SDK의 표준 자기 계정 삭제 기능만으로 구성한다.

### 13.2 콘텐츠 익명화 방식

- `posts`/`comments`/`materials`에는 `authorDisplayName`/`authorPhotoUrl` 캐시(작성 시점 스냅샷)가
  존재한다([05 §2](./05-DATA-MODEL-SSOT.md)). 탈퇴 시 이 캐시를 콘텐츠 문서마다 덮어쓰지는 않는다
  (문서 수가 수십만 건이 될 수 있고 "작성 시점 스냅샷" 의미가 깨지기 때문 — [D-022](./11-DECISION-LOG.md)).
  익명화는 **`profiles/{uid}` 단일 지점 스크럽**으로 수행하고, 모든 화면이 [05 §6](./05-DATA-MODEL-SSOT.md)
  의 표시 시점 보정(Q18)을 통해 `profiles/{authorUid}.displayName`("탈퇴한 회원")으로 첫 페인트 스냅샷을
  교체한다. 이 보정이 동작하지 않으면 실명이 노출되므로 **Critical**이다([D-022](./11-DECISION-LOG.md),
  10 §3.24 AT-106).
- **`authorUid` 필드는 유지한다(확정).** 근거: (1) `uid`는 이메일이 아닌 Firebase가 발급한 임의
  식별자이므로 그 자체로는 개인정보에 해당하지 않는다, (2) 신고·제재 이력 추적과 콘텐츠 소유권
  정합성(수정/삭제 권한 판정) 유지를 위해 필요하다.

### 13.3 Auth 계정 삭제 vs 비활성

**삭제를 채택한다(비활성화 아님).** 근거: `users/{uid}.status`에 이미 `withdrawn`이라는 최종 상태가
있어 "탈퇴했다"는 사실은 Firestore 쪽에서 이미 영구 보존되므로, Auth 계정까지 남겨둘 이유가 없다.
Auth 계정을 삭제하면 동일 이메일로 재가입이 가능해지며, 이는 정책적으로 허용한다(재가입 시 새
`uid`로 시작하며 과거 이력과 자동 연결되지 않는다).

### 13.4 복구 불가 고지

13.1의 확인 모달 문구를 그대로 최종 확정 문구로 사용한다: **"탈퇴 시 계정 정보 및 프로필이 즉시
삭제되며 복구할 수 없습니다. 작성한 게시글·댓글은 익명화되어 유지됩니다."**

---

## 14. 스팸·남용 방지

### 14.1 V1에서 하는 것 / 하지 않는 것

| 규칙 | 확정값 | 강제 위치 | 서버 강제 가능 여부 |
|---|---|---|---|
| 댓글 연속 작성 간격 | 10초 | Firestore Rules(`notRateLimitedForComment`, 4.2절) + `onCommentWritten` 트리거가 `users/{uid}.lastCommentAt` 갱신 | **가능** (댓글은 이미 CANON에 `onCommentWritten` 트리거가 정의돼 있음) |
| 댓글 동일 내용 반복 차단 | 5분 이내 동일 본문 재작성 차단 | Firestore Rules(`notDuplicateComment`) + 같은 트리거가 `lastCommentBody` 갱신 | **가능** |
| 신규 `member` 첫 24시간 게시글 상한 | 3개 | (정책 목표만 문서화) | **불가능** — CANON H절이 `onPostCreated`를 "V1 없음"으로 명시. 카운팅 트리거가 없어 서버에서 셀 방법이 없다. [OPEN-02](#19-미결정-사항-open-nn) |
| 게시글 24시간 내 동일 내용 재작성 차단 | 동일 title+bodyMarkdown 24시간 내 재작성 금지 | (정책 목표만 문서화) | **불가능** — 위와 같은 이유. [OPEN-03](#19-미결정-사항-open-nn) |

V1에서 하지 않는 것: IP 기반 차단, CAPTCHA/봇 탐지, 이미지 콘텐츠 AI 스팸 검사, 자동 임계값 기반
자동 밴, 디바이스 핑거프린팅.

**정직성 원칙**: 24시간 게시글 상한/재작성 차단은 서버에서 강제되지 않는 "정책 목표"일 뿐이며,
클라이언트 UX(작성 폼에서 "오늘 이미 3개를 작성했습니다" 안내)로만 유도한다. 실제 우회는
가능하다 — 이는 정직하게 [OPEN-02](#19-미결정-사항-open-nn)로 남긴다.

---

## 15. 속도 제한이 필요한 작업 목록과 구현 방식

| 작업 | 제한 | 구현 가능 여부 |
|---|---|---|
| 댓글 작성 | 10초 간격, 5분 내 동일 내용 금지 | 가능(14절) |
| 게시글 작성 | 24시간 3개(정책 목표만) | 불가(14절, OPEN-02) |
| 반응(좋아요) 토글 | 별도 rate limit 불필요 | 결정론적 ID(`{targetType}__{targetId}__{uid}`)로 중복 생성 자체가 Rules에서 원천 차단되므로 추가 제한 불필요 |
| 신고 제출 | 별도 rate limit 불필요 | 결정론적 ID(8절)로 동일 대상 중복 신고가 원천 차단되므로 추가 제한 불필요 |
| 카테고리 신청 | 서버 강제 없음(V1) | member 전용 기능이라 남용 위험이 낮다고 판단해 생략 |

**구현 방식 선택: Firestore 카운터/타임스탬프 문서 방식을 채택한다(Functions 메모리 방식은 기각).**

근거: Cloud Functions gen2는 요청이 여러 인스턴스에 분산 라우팅될 수 있어 인스턴스 내 메모리
상태가 인스턴스 간에 공유되지 않는다. 메모리 기반 rate limit은 같은 사용자의 연속 요청이 서로 다른
인스턴스로 라우팅되는 순간 무력화되어 신뢰할 수 없다. 반면 Firestore 단일 문서는 강한 일관성(strong
consistency)을 보장하므로, `users/{uid}.lastCommentAt`/`lastCommentBody` 같은 카운터·타임스탬프
문서가 유일하게 신뢰 가능한 저장소다.

---

## 16. 악성 파일 업로드 방지

### 16.1 클라이언트 검사의 한계

브라우저의 `File.type`이나 파일 확장자는 사용자가 임의로 조작한 요청(예: Storage REST API에 직접
`PUT`하며 `Content-Type` 헤더를 임의로 지정)으로 우회 가능하다. 클라이언트 측 확장자/타입 검사는
**UX 힌트일 뿐 보안 경계가 아니다.**

### 16.2 실제 보안 경계와 한계

- content-type 검증(5.1·5.2절)이 실질적 서버 측 경계다. 단, Storage는 요청 헤더의 `Content-Type`을
  그대로 신뢰하며 바이트 내용을 검사하지 않으므로, 헤더만 위조하면 통과한다(5.3절).
- 매직넘버(파일 시그니처) 검증은 `onFinalize` 트리거가 필요하나 CANON H절 트리거 목록에 없어 V1에
  포함하지 않는다([OPEN-04](#19-미결정-사항-open-nn)).

### 16.3 이미지 리사이즈/재인코딩 도입 여부 — **V1은 도입하지 않는다(확정)**

근거: 리사이즈/재인코딩은 Storage `onFinalize` 트리거 또는 별도 이미지 처리 Function이 필요하며,
이 역시 CANON H절 트리거 목록에 없다. 새 트리거를 추가하는 것은 CANON 변경에 해당하므로 V1
범위에서 제외한다. V1은 업로드된 원본 파일을 그대로 저장하고 후처리하지 않는다.

### 16.4 Storage 경로 격리

`mediaAssets/{mediaAssetId}` — `uid`별 폴더 분리로 소유자 판정이 경로 매칭만으로 가능하고,
다른 사용자 경로는 Rules의 `match` 패턴 자체가 매치되지 않아 접근이 원천 차단된다. `yyyyMM` 하위
폴더는 콘솔에서 파일 목록을 월 단위로 분산해 관리 편의를 높인다.

---

## 17. 클라이언트만으로 안전하지 않은 작업 목록

다음은 반드시 callable Cloud Function을 거쳐야 하며, Firestore Rules만으로는 안전하게 처리할 수 없다.

| 작업 | 이유 |
|---|---|
| 역할 변경(`setUserRole`) | custom claim 발급은 Admin SDK 전용 기능 — 클라이언트 SDK로는 구조적으로 불가능 |
| 회원 승인/거절(`reviewMembershipApplication`) | 승인 시 역할 변경(claim 발급) 수반 |
| 회원 정지/복구(`suspendUser`/`restoreUser`) | `users/{uid}.status`는 서버 전용(탈퇴 예외 제외), admin 판단 필요 |
| 자료 공식 승격(`setMaterialStatus`의 `official` 전환) | 신뢰도 상승을 스스로 조작하는 것을 막아야 함 |
| 카테고리 승인(`reviewCategoryRequest`) | `categories` 컬렉션은 전면 서버 전용 쓰기 |
| 신고 최종 처리(`resolveReport`) | `moderationActions` 생성, `notifications` 발송을 원자적으로 동반 |
| 게시글 강제 숨김/복구(`moderatePost`) | 타인 콘텐츠에 대한 조작 |
| 댓글 강제 삭제(`deleteCommentByModerator`) | 타인 콘텐츠에 대한 조작 |
| `likeCount`/`commentCount` 갱신 | 클라이언트가 직접 갱신하면 위조 가능 — `onReactionWritten`/`onCommentWritten` 트리거 전용, Rules에서 해당 필드 변경 자체를 차단 |
| 알림 생성 | 클라이언트가 임의로 "당신에게 좋아요가 눌렸습니다" 등을 위조해 타인에게 보낼 수 있음 — 트리거 전용 |
| `adminLogs`/`moderationActions` 생성 | 감사 로그 위조 방지 |

예외적으로 **`users/{uid}.status`의 `active → withdrawn` 자기 전이(13절)만은** 클라이언트 직접
쓰기를 허용한다 — 자기 자신을 향한 일방향 파괴적 행위이며 권한 상승 위험이 없기 때문이다.

---

## 18. 보안 테스트 시나리오

`@firebase/rules-unit-testing`(`assertSucceeds`/`assertFails`, `initializeTestEnvironment`)로
검증한다. 각 행은 "누가 무엇을 시도 → 기대 결과"다.

| # | 시나리오 | 기대 결과 |
|---|---|---|
| 1 | 미인증(`guest`)이 `status='published'` 게시글 읽기 | 허용 |
| 2 | 미인증이 `status='hidden'` 게시글 읽기 | 거부 |
| 3 | 미인증이 게시글 생성 시도 | 거부 |
| 4 | `pending_member`가 게시글 생성 시도 | 거부 |
| 5 | `member`(status=active)가 유효한 게시글 생성(`likeCount=0`, `commentCount=0` 포함) | 허용 |
| 6 | `member`가 게시글 생성 시 `likeCount=5`로 지정 | 거부 |
| 7 | `member`가 `authorUid`를 타인 uid로 위장해 게시글 생성 | 거부 |
| 8 | 게시글 소유자가 자신의 글을 `published → deleted`로 변경 | 허용 |
| 9 | 게시글 소유자가 자신의 글을 `published → hidden`으로 변경 시도 | 거부 |
| 10 | 타인이 남의 게시글을 수정 시도 | 거부 |
| 11 | `moderator`가 클라이언트 경로로 `users/{uid}.status`를 직접 변경 시도(Admin SDK 우회 여부 검증) | 거부 |
| 12 | `member` 본인이 `users/{uid}.status`를 `active → withdrawn`으로 변경 | 허용 |
| 13 | `member` 본인이 탈퇴 전이에 `role`도 함께 `admin`으로 끼워넣어 변경 시도 | 거부 |
| 14 | `suspended` 사용자가 게시글 생성 시도 | 거부 |
| 15 | `suspended` 사용자가 공개 게시글 읽기 시도 | 허용 |
| 16 | `member`가 유효한 댓글 생성(bodyMarkdown 1~2000자, `targetType='post'`) | 허용 |
| 17 | `member`가 2001자 댓글 생성 시도 | 거부 |
| 18 | `member`가 10초 이내 연속으로 두 번째 댓글 생성 시도 | 거부 |
| 19 | `member`가 자신의 uid로 끝나는 `reactionId`로 반응 생성 | 허용 |
| 20 | `member`가 타인 uid로 끝나는 `reactionId`로 반응 생성(대리 좋아요 위조) 시도 | 거부 |
| 21 | `member`가 자신의 반응을 삭제 | 허용 |
| 22 | `member`가 타인의 반응을 삭제 시도 | 거부 |
| 23 | `member`가 자신의 `{uid}__...` 북마크를 생성 후, 타인이 그 문서를 읽기 시도 | 생성 허용 / 타인 읽기 거부 |
| 24 | `member`가 `categories` 컬렉션에 직접 새 카테고리 생성 시도 | 거부 |
| 25 | `member`가 `categoryRequests` 생성(유효 입력) 후, 본인이 `status`를 `approved`로 직접 변경 시도 | 생성 허용 / 상태 변경 거부 |
| 26 | `member`가 신고 생성(id=`post__abc__uid`, 유효) 후 동일 id로 재생성 시도(중복 신고) | 최초 허용 / 재시도 거부 |
| 27 | `moderator`가 `reports.status`를 `open → in_review`로 변경 | 허용 |
| 28 | `member`(비-moderator)가 `reports.status`를 `open → in_review`로 변경 시도 | 거부 |
| 29 | `member`가 자신이 만든 신고의 `status`를 `resolved`로 직접 변경 시도 | 거부 |
| 30 | 사용자 A가 `notifications/{B}/items/{x}`(타인 알림) 읽기 시도 | 거부 |
| 31 | 사용자 A가 자신의 알림 `readAt`만 갱신 | 허용 |
| 32 | 사용자 A가 자신의 알림 `readAt`과 함께 `payload`도 변경 시도 | 거부 |
| 33 | 임의 사용자가 자기 자신에게 알림 문서를 직접 `create` 시도(위조) | 거부 |
| 34 | `member`가 `adminLogs` 읽기 시도 | 거부 |
| 35 | `admin`이 `adminLogs` 읽기 | 허용 |
| 36 | 임의 역할이 `adminLogs`에 직접 `create` 시도 | 거부 |
| 37 | `trusted_member`가 자료 생성 시 `status='community'`로 직접 지정 | 허용 |
| 38 | `member`(trusted 아님)가 자료 생성 시 `status='community'`로 지정 시도 | 거부(`pending_review`만 허용) |
| 39 | `member`가 자료 생성 시 `status='official'`로 지정 시도 | 거부 |
| 40 | 로그인한 `member`가 `uploads/{자신 uid}/202608/f1`에 4MB `image/png` 업로드 | 허용 |
| 41 | 동일 사용자가 6MB `image/png` 업로드 시도 | 거부(5MB 초과) |
| 42 | 동일 사용자가 `image/svg+xml`(허용 목록 외) 업로드 시도 | 거부 |
| 43 | `member` A가 `uploads/{B의 uid}/...` 경로에 업로드 시도 | 거부 |
| 44 | `pending_member`(역할 미승인)가 업로드 시도 | 거부 |

---

## 19. 미결정 사항 (OPEN-nn)

| ID | 내용 |
|---|---|
| OPEN-01 | `reports`의 `targetType`이 댓글/회원(사용자)까지 포함해야 하는지 CANON `TargetType`(`post`\|`material`) enum에 정의가 없다. V1은 게시글/자료 신고만 지원한다. 댓글·회원에 대한 문제 제기는 관련 게시글/자료를 신고하며 `detail`에 상세를 적는 방식으로 대체한다. |
| OPEN-02 | 신규 회원 첫 24시간 게시글 상한(정책 목표 3개)을 서버에서 강제할 트리거가 없다(CANON이 `onPostCreated`를 "V1 없음"으로 명시). v1.1에서 CANON에 트리거를 추가해야 한다. |
| OPEN-03 | 게시글 24시간 내 동일 내용 재작성 차단의 서버 강제 메커니즘이 없다(OPEN-02와 동일 원인). |
| OPEN-04 | 제거됨(V1 Storage 미사용) | — | 과제. |
| OPEN-05 | `ModerationActionType` enum에 "경고(warn)" 값이 없어 경고 조치가 `moderationActions`에 정식 기록되지 못하고 `adminLogs`+`notifications`로만 남는다. v1.1에서 enum 확장(`warn_user` 추가) 검토가 필요하다. |
| OPEN-06 | 소프트 삭제 문서의 90일 후 물리 삭제를 자동화할 스케줄 Function이 CANON 트리거 목록에 없어 V1은 수동 처리다. |
| OPEN-07 | `/privacy` 페이지 갱신은 본 문서 12.3절이 필요 항목을 지정했을 뿐, 실제 반영(코드 수정)은 이 문서의 범위 밖이다 — 별도 작업 티켓 필요. |
| OPEN-08 | `suspendedUntil` 자동 만료 처리가 없어 admin이 만료일을 보고 수동으로 `restoreUser`를 호출해야 한다. 자동화하려면 CANON에 없는 스케줄 Function 신설이 필요하다. |
| OPEN-09 | 회원당 동시 진행 중(`submitted`) 카테고리 신청 건수를 서버가 제한하지 않는다(남용 위험이 낮다고 판단해 생략). 남용 사례 발생 시 재검토한다. |
| OPEN-10 | 신규 가입 시 `users/{uid}` 미러 문서 생성과 초기 custom claim(`role=pending_member`) 발급을 수행할 **Auth 트리거**(예: `identity.beforeUserCreated` 또는 `functions.auth.user().onCreate`)가 CANON H절에 정의되어 있지 않다. 시스템이 동작하려면 구조적으로 반드시 필요한 트리거이므로, v1.1 착수 전 CANON 갱신(H절에 Auth 트리거 항목 추가)이 필요하다. |
