# 05. 데이터 모델 SSOT (Single Source of Truth)

## 0. 문서 지위

**이 문서는 AI_VIBE_CODING_MASTER 커뮤니티 전환의 데이터 모델(Firestore 스키마) 유일한 정본이다.**
Firestore 컬렉션 경로, 문서 ID 전략, 필드 스펙, TypeScript 타입, zod 검증 스키마, 인덱스, 시드 데이터, 쿼리 카탈로그는 **이 문서를 최종 근거로 한다.** 다른 문서(Security Rules, Cloud Functions 구현 스펙, 화면 설계 등)에 동일 내용이 등장하면 이 문서 쪽을 정본으로 하고, 불일치가 발견되면 이 문서를 수정한 뒤 나머지를 갱신한다.

이 문서는 `ai-ops/CANON.md`(Opus 확정, D절·E절·C절·H절)를 전제로 하며, 해당 절의 경로·enum·역할·Cloud Functions 이름을 **한 글자도 변경하지 않고** 그대로 사용한다. 이 문서에서 CANON에 없는 세부 결정(필드 단위 스키마, 길이 상한, 인덱스, 시드 값 등)을 내릴 때는 반드시 기준과 기본값을 명시하며, 정말로 결정할 수 없는 사항만 11절 "미결정 사항"에 `OPEN-nn`으로 남긴다.

### 관련 문서

같은 문서 세트(`docs/community-platform/`) 내에서 이 SSOT를 전제로 작성된 실제 문서는 다음과 같다.

| 문서 | 이 SSOT와의 관계 |
|---|---|
| [00-CURRENT-STATE-AUDIT.md](./00-CURRENT-STATE-AUDIT.md) | 이 SSOT가 전제하는 현재 코드베이스 상태(Firebase SDK 미설치, 라우트 52개, 기존 콘텐츠 식별자)의 실측 근거 |
| [01-PRODUCT-PRD.md](./01-PRODUCT-PRD.md) | 각 엔터티가 충족하는 기능 요구(FR-*)의 출처 |
| [02-INFORMATION-ARCHITECTURE.md](./02-INFORMATION-ARCHITECTURE.md) | 10절 쿼리 카탈로그의 각 쿼리가 어느 라우트에서 실행되는지의 매핑 |
| [03-USER-FLOWS-AND-PERMISSIONS.md](./03-USER-FLOWS-AND-PERMISSIONS.md) | 각 엔터티 "생성/수정/삭제 주체" 열이 참조하는 역할 이름·권한 매트릭스의 정의 원본 |
| [04-TECHNICAL-ARCHITECTURE.md](./04-TECHNICAL-ARCHITECTURE.md) | 정적 export·Hosting rewrites·Functions 런타임 등 이 스키마가 놓이는 실행 환경 |
| [06-SECURITY-AND-MODERATION-SSOT.md](./06-SECURITY-AND-MODERATION-SSOT.md) | 이 SSOT의 필드 스키마·소유권·enum을 Security Rules 코드로 옮긴 문서. **필드명·길이 제약의 정본은 이 문서(05)이며 06은 그 집행 규칙이다**([D-019](./11-DECISION-LOG.md)) |
| [07-CONTENT-GOVERNANCE-SSOT.md](./07-CONTENT-GOVERNANCE-SSOT.md) | `status` enum 전이의 정책적 근거(공식/회원 자료 승격 기준 등) |
| [08-IMPLEMENTATION-ROADMAP.md](./08-IMPLEMENTATION-ROADMAP.md) | 각 컬렉션이 어느 Phase에 도입되는지의 일정 |
| [09-GOOSE-IMPLEMENTATION-PACKETS.md](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | 각 패킷의 "데이터 계약" 표는 이 문서의 필드 표를 인용한 것이다 |
| [10-ACCEPTANCE-TEST-PLAN.md](./10-ACCEPTANCE-TEST-PLAN.md) | 이 스키마의 제약(길이·enum·소유권)을 검증하는 수용 테스트 |
| [11-DECISION-LOG.md](./11-DECISION-LOG.md) | D-004~D-008, D-018(reports ID), D-019(필드명 정본) 등 이 스키마의 근거 결정 |

> **필드명 정본 선언**([D-019](./11-DECISION-LOG.md)): 필드명·타입·길이 상한·기본값의 정본은 **이 문서 단 하나**다. 06·07·09·10은 이 문서를 인용할 뿐 독자적으로 필드를 규정하지 않는다. 이 문서의 필드 표를 고칠 때는 **같은 커밋에서** 06의 Rules 코드 블록과 09의 데이터 계약 표를 함께 고친다.

---

## 1. 공통 규약

### 1.1 필드명 규칙

- 전부 `camelCase`. 약어도 카멜케이스 규칙을 따른다 (`uid`, `url`은 소문자 유지 — 이미 관용 표기).
- 불리언 필드는 `is`/`has` 접두어를 쓴다 (`isPinned`).
- 카운터 필드는 `xxxCount` 접미어를 쓴다 (`likeCount`, `commentCount`).
- 참조 필드는 대상 컬렉션 단수형 + `Uid`/`Id` 접미어를 쓴다 (`authorUid`, `targetId`, `parentCommentId`, `categoryId`는 사용하지 않고 카테고리 참조는 슬러그 문자열 필드 `category`를 그대로 쓴다 — CANON D절에서 `categories/{categoryId}`의 `categoryId = slug`이므로 참조값 자체가 곧 사람이 읽는 슬러그다).

### 1.2 결정론적 ID 엔터티의 공통 규칙

**결정론적 문서 ID를 쓰는 모든 엔터티는, ID를 구성하는 값을 문서 필드로도 중복 저장한다.** (Security Rules에서 `request.resource.data.uid == request.auth.uid` 같은 검증을 하려면 필드가 있어야 하고, 클라이언트가 `snapshot.id`를 파싱하지 않고 필드로 바로 읽을 수 있어야 하기 때문.) 해당 엔터티: `User`(uid), `UserProfile`(uid), `MembershipApplication`(uid), `Reaction`(targetType/targetId/uid), `Bookmark`(uid/targetType/targetId), `Category`(slug).

### 1.3 시간 필드

| 필드명 | 의미 | 타입 | 쓰기 방법 |
|---|---|---|---|
| `createdAt` | 문서 최초 생성 시각 | Firestore `Timestamp` | 클라이언트/Functions 공통 — **항상 `serverTimestamp()`**. 클라이언트가 로컬 `Date`를 직접 넣는 것을 Security Rules에서 차단한다 |
| `updatedAt` | 마지막 수정 시각 | Firestore `Timestamp` | 모든 update 시 **항상 `serverTimestamp()`**로 갱신 (부분 필드 수정이라도 예외 없음) |
| `deletedAt` | 소프트 삭제 시각 (해당 엔터티에만 존재) | Firestore `Timestamp` (optional) | 소프트 삭제 전이 시 `serverTimestamp()`. 삭제 취소(복구) 시 `null`로 되돌리지 않고 필드 자체를 남겨 이력 추적(복구 시각은 `updatedAt`으로 판단) |
| `readAt` | 알림 읽음 시각 (Notification 전용) | Firestore `Timestamp` (optional) | 본인이 `serverTimestamp()`로 1회 설정. 미읽음 상태는 필드 부재(`undefined`)로 표현하며 `null` 저장을 쓰지 않는다 |

로컬 `Date.now()`, `new Date()` 값을 Firestore에 직접 쓰는 코드는 전부 금지 — 클라이언트 시계 위조/오차 방지를 위해 서버 타임스탬프만 신뢰한다.

### 1.4 작성자/대상 필드명

- 작성자 필드명: **`authorUid`** — Post, Material, Comment 3개 엔터티에서만 사용.
- 대상 사용자 필드명: **`targetUid`** — 이 SSOT의 14개 엔터티 중 실제로 "대상 사용자"를 갖는 것은 없다(Report/ModerationAction은 `targetId`+`type`으로 대상을 특정). CANON에 정의된 이름이므로 향후 사용자 대상 엔터티가 추가되면 이 이름을 그대로 쓴다.
- 반응/북마크 주체 필드명: **`uid`** (작성자가 아니라 "행위자"이므로 `authorUid`를 쓰지 않는다).
- 관리 행위자 필드명: **`actorUid`** — AdminLog, ModerationAction에서 사용 (Cloud Functions를 호출한 admin/moderator).

### 1.5 소프트 삭제 원칙

- **콘텐츠성 엔터티(Post, Material, Comment)는 물리 삭제(hard delete)를 하지 않는다.** 각자의 상태 enum에 이미 `deleted`(Post/Comment) 또는 `archived`(Material)가 있으므로 상태 전이 + `deletedAt` 스탬프로 삭제를 표현한다.
- **상태(존재 자체가 boolean인) 엔터티(Reaction, Bookmark)는 물리 삭제를 쓴다.** "좋아요 취소"는 문서를 지우는 것이 곧 정확한 의미이며, 소프트 삭제 필드를 두면 카운터 트리거 로직이 오히려 복잡해진다 (5절에서 상세).
- **불변 로그 엔터티(AdminLog, ModerationAction)는 생성만 가능, 수정·삭제 전면 금지.**
- **신청/신고류(MembershipApplication, CategoryRequest, Report)는 영구 보존, 삭제 없음.** 처리 결과는 `status` 전이로 표현한다.
- **Category는 소프트 삭제(`status: "archived"`)만 허용.** 기존 Post/Material이 슬러그로 참조 중이므로 물리 삭제 시 참조 무결성이 깨진다.
- **Notification은 V1에서 클라이언트 삭제를 제공하지 않는다.** 보존 정책은 9절 참조.

### 1.6 문자열 길이 상한 / 배열 길이 상한 (정본, 이 문서가 유일한 근거)

| 필드 | 하한 | 상한 | 비고 |
|---|---|---|---|
| `displayName` | 2자 | 24자 | |
| `bio` | 0자 | 300자 | |
| `profile.links[]` | - | 배열 최대 5개 | 각 항목 `label` 1~30자, `url` 1~2048자 |
| `skillTags[]` | - | 배열 최대 10개 | 각 항목 1~20자 |
| `category.name` | 1자 | 30자 | |
| `category.description` | 0자 | 200자 | |
| `post.title` | 2자 | 100자 | |
| `post.bodyMarkdown` | 1자 | 20,000자 | |
| `post.tags[]` | - | 배열 최대 5개 | 각 항목 1~20자 |
| `post.mediaAssetIds[]` / `material.mediaAssetIds[]` | - | 게시글 최대 3개, 자료 최대 5개 | 각 항목 mediaAsset 문서 ID |
| `material.title` | 2자 | 120자 | |
| `material.description` | 1자 | 5,000자 | |
| `material.resourceUrl` | - | 2048자 | optional |
| `material.statusNote` | 0자 | 500자 | |
| `comment.bodyMarkdown` | 1자 | 2,000자 | |
| `membershipApplication.motivation` | 1자 | 1,000자 | |
| `membershipApplication.referral` | 0자 | 200자 | |
| `*.rejectionReason` / `*.resolutionNote` / `report.detail` | 0자 | 500자 | 사유류 공통 상한 |
| `categoryRequest.proposedSlug` | 1자 | 40자 | 정규식 `^[a-z0-9-]+$` |
| `categoryRequest.reason` | 1자 | 500자 | |
| `notification.message` | 1자 | 200자 | |
| `notification.linkPath` | 0자 | 300자 | |
| 일반 URL 필드 전부 (`photoUrl` 등) | - | 2048자 | |

### 1.7 denormalize 필드 명명 규칙

**규칙: `{관계 접두어}{원본 필드명(PascalCase)}`.** 현재 사용 중인 인스턴스:

| denormalize 필드 | 관계 접두어 | 원본 | 원본 위치 |
|---|---|---|---|
| `authorDisplayName` | `author` | `displayName` | `profiles/{authorUid}.displayName` |
| `authorPhotoUrl` | `author` | `photoUrl` | `profiles/{authorUid}.photoUrl` |

갱신 정책은 6절에서 별도로 상세히 다룬다. 향후 새 denormalize 필드를 추가할 때도 이 명명 규칙을 그대로 따른다 (예: 카테고리 표시명을 denormalize한다면 `categoryName`).

---

## 2. 엔터티 14개 전체 명세

공통 표기: "클라이언트 쓰기"열의 값은 `생성 시`(문서 생성 요청에 포함 가능) / `생성+수정`(생성·수정 모두 클라이언트가 직접 씀) / `수정만`(생성은 서버, 특정 필드 수정만 클라이언트 허용) / `불가`(서버 전용, Cloud Functions만 씀) 중 하나다.

### 2.1 User — `users/{uid}`

**문서 ID 전략**: 결정론적. `uid` = Firebase Auth UID 그대로. 자동 생성 아님.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum 값 | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `uid` | string | Y | - | 문서 ID와 동일 (1.2 규칙) | - | 불가 |
| `email` | string | Y | - | Auth의 이메일 복사본 | - | 불가 |
| `emailVerified` | boolean | Y | `false` | Auth 이메일 인증 여부 복사본 | - | 불가 |
| `role` | string | Y | `"pending_member"` | custom claim의 **미러** (권위는 claim, D-003) | `pending_member \| member \| trusted_member \| moderator \| admin` (`guest`는 문서 자체가 없는 상태를 뜻하므로 저장값이 아니다) | 불가 |
| `status` | string | Y | `"active"` | 계정 상태 | `active \| suspended \| withdrawn` | 불가 |
| `suspendedAt` | Timestamp | N | 없음 | 정지 시각 | - | 불가 |
| `suspendedReason` | string | N | 없음 | 정지 사유, 0~500자 | - | 불가 |
| `lastRoleChangeAt` | Timestamp | N | 없음 | 마지막 역할 변경 시각 | - | 불가 |
| `lastRoleChangedByUid` | string | N | 없음 | 마지막 역할 변경을 수행한 admin uid | - | 불가 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: Cloud Functions만 — 구체적으로 멱등 콜러블 **`bootstrapUserAccount`**([11 결정 로그 D-017](./11-DECISION-LOG.md)). 가입 성공 직후 클라이언트가 호출하며 `{ role: "pending_member", status: "active", createdAt: serverTimestamp() }`로 생성한다. **문서가 이미 존재하면 절대 덮어쓰지 않는다**(멱등성 = 보안 요건: 역할 강등·정지 해제 우회 방지).
**수정 가능 주체**: `role`/`lastRoleChange*` — `setUserRole` 콜러블(admin). `status`/`suspended*` — `suspendUser`/`restoreUser` 콜러블(admin). `emailVerified` — Auth 상태 재동기화 트리거(향후 정의). 클라이언트 직접 쓰기는 어떤 필드도 불가.
**삭제 정책**: 물리 삭제 없음. 탈퇴는 `status: "withdrawn"` 전이로 표현 (9절).
**공개 여부**: 본인 + moderator/admin만 전체 필드 읽기 가능. 그 외에는 비공개(표시용 공개 정보는 `profiles/{uid}`가 담당).
**필요 인덱스**: `(role ASC, status ASC, createdAt DESC)` — 관리자 회원 목록/필터용.
**관련 엔터티**: `profiles/{uid}`(1:1), `membershipApplications/{uid}`(1:1), 모든 `authorUid`/`uid`/`actorUid` 참조의 원본.
**감사 로그 필요 여부**: Y — `role`/`status` 변경은 전부 `setUserRole`/`suspendUser`/`restoreUser` 콜러블 경유이므로 H절 규칙에 따라 자동으로 `adminLogs`에 남는다.

```ts
// src/features/community/types/user.ts
import type { Timestamp } from "firebase/firestore"

export type UserRole = "pending_member" | "member" | "trusted_member" | "moderator" | "admin"
export type UserStatus = "active" | "suspended" | "withdrawn"

export type User = {
  readonly uid: string
  readonly email: string
  readonly emailVerified: boolean
  readonly role: UserRole
  readonly status: UserStatus
  readonly suspendedAt?: Timestamp
  readonly suspendedReason?: string
  readonly lastRoleChangeAt?: Timestamp
  readonly lastRoleChangedByUid?: string
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod — User는 클라이언트가 어떤 필드도 쓰지 않으므로 입력 스키마 없음.
// setUserRole/suspendUser/restoreUser 콜러블의 "요청 payload" 검증 스키마만 존재한다.
import { z } from "zod"

export const SetUserRoleRequestSchema = z.object({
  targetUid: z.string().min(1),
  role: z.enum(["pending_member", "member", "trusted_member", "moderator", "admin"]),
})

export const SuspendUserRequestSchema = z.object({
  targetUid: z.string().min(1),
  reason: z.string().min(1).max(500),
})

export const RestoreUserRequestSchema = z.object({
  targetUid: z.string().min(1),
})
```

---

### 2.2 UserProfile — `profiles/{uid}`

**문서 ID 전략**: 결정론적. `uid`와 동일.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `uid` | string | Y | - | 문서 ID와 동일 | - | 생성 시 |
| `displayName` | string | Y | - | 2~24자 | - | 생성+수정 |
| `photoUrl` | string | N | 없음 | 최대 2048자 | - | 생성+수정 |
| `bio` | string | N | `""` | 0~300자 | - | 생성+수정 |
| `links` | array\<{label,url}\> | N | `[]` | 최대 5개, label 1~30자·url 1~2048자 | - | 생성+수정 |
| `skillTags` | array\<string\> | N | `[]` | 최대 10개, 각 1~20자 | - | 생성+수정 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가(항상 serverTimestamp) |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가(항상 serverTimestamp) |

**생성 주체**: 본인 (`uid == auth.uid`), 온보딩(`/onboarding/profile`)에서 client가 직접 write.
**수정 가능 주체**: 본인만. moderator/admin도 타인 프로필을 직접 수정할 권한은 없음 (제재는 `User.status`로 처리, 표시 정보는 본인 소관).
**삭제 정책**: 물리 삭제 없음. 탈퇴 시 필드 스크럽 정책은 9절 참조.
**공개 여부**: 전체 공개(guest 포함) — F절 `/members/*`가 공개 라우트이기 때문.
**필요 인덱스**: 없음(단일 문서 get만 사용, 목록 조회는 회원 검색 기능이 V1 범위 밖이므로 불요).
**관련 엔터티**: `users/{uid}`(1:1), `posts`/`materials`/`comments`의 denormalize 원본.
**감사 로그 필요 여부**: N.

```ts
// src/features/community/types/profile.ts
import type { Timestamp } from "firebase/firestore"

export type ProfileLink = {
  readonly label: string
  readonly url: string
}

export type UserProfile = {
  readonly uid: string
  readonly displayName: string
  readonly photoUrl?: string
  readonly bio: string
  readonly links: readonly ProfileLink[]
  readonly skillTags: readonly string[]
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod
import { z } from "zod"

const ProfileLinkSchema = z.object({
  label: z.string().min(1).max(30),
  url: z.string().url().max(2048),
})

export const UserProfileInputSchema = z.object({
  displayName: z.string().min(2).max(24),
  photoUrl: z.string().url().max(2048).optional(),
  bio: z.string().max(300).default(""),
  links: z.array(ProfileLinkSchema).max(5).default([]),
  skillTags: z.array(z.string().min(1).max(20)).max(10).default([]),
})
```

---

### 2.3 MembershipApplication — `membershipApplications/{uid}`

**문서 ID 전략**: 결정론적. `uid` (1인 1건, CANON D절 확정). 재신청은 신규 문서가 아니라 같은 문서를 갱신.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `uid` | string | Y | - | 문서 ID와 동일 | - | 불가(콜러블이 씀) |
| `status` | string | Y | `"submitted"` | | `submitted \| approved \| rejected \| resubmitted` | 불가 |
| `motivation` | string | Y | - | 신청 동기, 1~1000자 | - | 불가(콜러블 payload로만 전달) |
| `referral` | string | N | 없음 | 가입 경로, 0~200자 | - | 불가(콜러블 payload로만 전달) |
| `reviewedByUid` | string | N | 없음 | 검토한 admin uid | - | 불가 |
| `reviewedAt` | Timestamp | N | 없음 | | - | 불가 |
| `rejectionReason` | string | N | 없음 | 0~500자 | - | 불가 |
| `resubmitCount` | number | Y | `0` | | - | 불가 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: 본인이 `submitMembershipApplication` 콜러블을 호출 (Firestore 문서 쓰기는 Functions 내부에서 수행, 클라이언트가 `membershipApplications` 컬렉션에 직접 `setDoc`하지 않는다 — 신청 남발/위조 방지).
**수정 가능 주체**: 검토 — `reviewMembershipApplication` 콜러블(admin). 재신청 — 본인이 다시 `submitMembershipApplication` 호출 시 같은 문서를 `status: "resubmitted"`로 갱신하고 `resubmitCount`를 증가시킨다 (내부적으로 동일 콜러블 재사용, 새 콜러블을 만들지 않는다).
**삭제 정책**: 삭제 없음. 영구 보존.
**공개 여부**: 본인 + moderator/admin만 읽기 (개인정보 성격).
**필요 인덱스**: `(status ASC, createdAt DESC)` — 관리자 승인 대기 목록.
**관련 엔터티**: `users/{uid}`(1:1). 승인 시 `reviewMembershipApplication` 콜러블이 내부적으로 `users/{uid}.role`을 `"member"`로 바꾸는 로직까지 포함한다 (별도 콜러블 호출이 아니라 하나의 트랜잭션으로 처리 — 승인과 역할변경이 분리되면 중간 실패 시 "승인됐지만 여전히 pending_member"인 불일치 상태가 생기기 때문).
**감사 로그 필요 여부**: Y — `reviewMembershipApplication`은 콜러블이므로 H절 규칙에 따라 자동으로 `adminLogs`에 기록.

```ts
// src/features/community/types/membershipApplication.ts
import type { Timestamp } from "firebase/firestore"

export type ApplicationStatus = "submitted" | "approved" | "rejected" | "resubmitted"

export type MembershipApplication = {
  readonly uid: string
  readonly status: ApplicationStatus
  readonly motivation: string
  readonly referral?: string
  readonly reviewedByUid?: string
  readonly reviewedAt?: Timestamp
  readonly rejectionReason?: string
  readonly resubmitCount: number
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod — submitMembershipApplication 콜러블 payload
import { z } from "zod"

export const SubmitMembershipApplicationRequestSchema = z.object({
  motivation: z.string().min(1).max(1000),
  referral: z.string().max(200).optional(),
})

export const ReviewMembershipApplicationRequestSchema = z.object({
  targetUid: z.string().min(1),
  decision: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().max(500).optional(),
})
```

---

### 2.4 Post — `posts/{postId}`

**문서 ID 전략**: 자동 생성 ID (Firestore auto ID).

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `authorUid` | string | Y | - | `== auth.uid` 강제 | - | 생성 시 |
| `authorDisplayName` | string | Y | - | denormalize, 6절 참조 | - | 생성+수정(수정 시 최신값으로 동반 갱신) |
| `authorPhotoUrl` | string | N | 없음 | denormalize | - | 생성+수정 |
| `category` | string | Y | - | `categories/{slug}` 참조, kind="community"인 슬러그만 | - | 생성+수정 |
| `title` | string | Y | - | 2~100자 | - | 생성+수정 |
| `bodyMarkdown` | string | Y | - | 1~20,000자 | - | 생성+수정 |
| `status` | string | Y | `"published"`(생성 시 고정값) | | `published \| hidden \| deleted` | 생성 시(`published` 고정) + 수정(본인: `published→deleted`만, moderator+: 전체 전이는 `moderatePost` 콜러블) |
| `isPinned` | boolean | Y | `false` | 관리자 공지 고정. 커뮤니티 목록이 `(status ASC, isPinned DESC, createdAt DESC)` 정렬로 이 필드를 `true`로 설정한 글을 상단 고정한다(별도 컬렉션·별도 `/admin/notices` 라우트를 만들지 않는 결정, [D-024](./11-DECISION-LOG.md) — 설정은 `/admin/posts`에서 admin이 직접 토글) | - | 불가(admin만, Security Rules에서 role 검사 후 직접 필드 write 허용 — 콜러블 미경유. 근거: 저위험 메타데이터이며 H절에 전용 콜러블이 없음) |
| `likeCount` | number | Y | `0` | 서버 전용 카운터 (5절) | - | 불가 |
| `commentCount` | number | Y | `0` | 서버 전용 카운터 (5절) | - | 불가 |
| `tags` | array\<string\> | N | `[]` | 최대 5개, 각 1~20자 | - | 생성+수정 |
| `mediaAssetIds` | array\<string\> | N | `[]` | 게시글 최대 3개, 각 mediaAsset 문서 ID (ImageKit) | - | 생성+수정 |
| `linkedRefs` | array\<map\> | N | `[]` | 강의·용어·Atlas 연결. 항목은 **정확히 `{type, id}` 두 필드만** 가진 객체(부가 필드 금지 — `array-contains` 완전 일치 조회 요건). 최대 5개. `id`는 [00 §5](./00-CURRENT-STATE-AUDIT.md)의 안정 식별자(`lesson.slug`/`glossary.term`/`atlas.id`)만 사용 ([D-020](./11-DECISION-LOG.md)) | `type`: `lesson \| glossary \| atlas` | 생성+수정 |
| `deletedAt` | Timestamp | N | 없음 | 소프트삭제 시각 | - | 불가(항상 serverTimestamp, 상태 전이 시에만) |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: `member` 이상, client 직접 `addDoc`/`setDoc`.
**수정 가능 주체**: 본문(`title`/`bodyMarkdown`/`category`/`tags`/`mediaAssetIds`) — 작성자 본인, `status == "published"`인 동안만. `status` 전이 — 본인은 `published → deleted`(자진 삭제)만 직접 가능, `hidden` 전이 및 복구(`hidden/deleted → published`)는 `moderatePost` 콜러블(moderator+)만. `isPinned` — admin만.
**삭제 정책**: 소프트(`status: "deleted"` + `deletedAt`). 하드 삭제 없음(V1).
**공개 여부**: `status == "published"`는 전체 공개(guest 포함, `/community` 공개 라우트). `hidden`/`deleted`는 작성자 본인 + moderator/admin만.
**필요 인덱스**: `(status ASC, isPinned DESC, createdAt DESC)` — 커뮤니티 최신글(공지 상단 고정). `(status ASC, category ASC, createdAt DESC)` — 카테고리별 목록. `(authorUid ASC, status ASC, createdAt DESC)` — 내 글.
**관련 엔터티**: `category`→`categories/{slug}`, `authorUid`→`users`/`profiles`, `comments`(targetType="post"), `reactions`(targetType="post"), `bookmarks`(targetType="post"), `reports`(targetType="post").
**감사 로그 필요 여부**: Y — `moderatePost` 호출 시 `adminLogs` + `moderationActions`(`hide_post`/`restore_post`) 양쪽 기록.

> **결정 (Report 대상 범위)**: CANON E절 `TargetType` enum이 `post | material`만 정의하므로, **댓글과 회원은 V1에서 신고 대상이 아니다.** 새 enum 값을 추가하지 않는다는 CANON 제약을 그대로 따른 결과다.

```ts
// src/features/community/types/post.ts
import type { Timestamp } from "firebase/firestore"

export type PostStatus = "published" | "hidden" | "deleted"

// D-020. Post 와 Material 이 공유한다. 실제 파일 위치는
// src/features/community/types/linkedRef.ts 로 두고 양쪽에서 import 한다.
export type LinkedRefType = "lesson" | "glossary" | "atlas"

export type LinkedRef = {
  readonly type: LinkedRefType
  readonly id: string   // lesson.slug | glossary.term | atlas.id (00 §5 안정 식별자)
}

export type Post = {
  readonly authorUid: string
  readonly authorDisplayName: string
  readonly authorPhotoUrl?: string
  readonly category: string
  readonly title: string
  readonly bodyMarkdown: string
  readonly status: PostStatus
  readonly isPinned: boolean
  readonly likeCount: number
  readonly commentCount: number
  readonly tags: readonly string[]
  readonly mediaAssetIds: readonly string[]
  readonly linkedRefs: readonly LinkedRef[]
  readonly deletedAt?: Timestamp
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod
import { z } from "zod"

// D-020. `.strict()` 가 핵심이다 — 부가 필드가 하나라도 섞이면 Firestore
// array-contains 완전 일치 조회가 실패하므로, 스키마 단계에서 거부해야 한다.
export const LinkedRefSchema = z
  .object({
    type: z.enum(["lesson", "glossary", "atlas"]),
    id: z.string().min(1).max(200),
  })
  .strict()

export const PostCreateInputSchema = z.object({
  category: z.string().min(1).max(40),
  title: z.string().min(2).max(100),
  bodyMarkdown: z.string().min(1).max(20000),
  tags: z.array(z.string().min(1).max(20)).max(5).default([]),
  mediaAssetIds: z.array(z.string().min(1)).max(3).default([]),
  linkedRefs: z.array(LinkedRefSchema).max(5).default([]),
})

export const PostUpdateInputSchema = PostCreateInputSchema.partial().extend({
  title: z.string().min(2).max(100).optional(),
})
```

---

### 2.5 Material — `materials/{materialId}`

**문서 ID 전략**: 자동 생성 ID.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `authorUid` | string | Y | - | `== auth.uid` 강제 | - | 생성 시 |
| `authorDisplayName` | string | Y | - | denormalize | - | 생성+수정 |
| `authorPhotoUrl` | string | N | 없음 | denormalize | - | 생성+수정 |
| `category` | string | Y | - | `categories/{slug}`, kind="material" | - | 생성+수정 |
| `title` | string | Y | - | 2~120자 | - | 생성+수정 |
| `description` | string | Y | - | 1~5000자(마크다운) | - | 생성+수정 |
| `sourceType` | string | Y | - | 출처 유형. **필수** — 출처 미표기 경로를 없애기 위한 필드([D-021](./11-DECISION-LOG.md), FR-M08) | `original \| external` | 생성+수정 |
| `resourceUrl` | string | 조건부 | 없음 | `sourceType == "external"`이면 **필수**(1~2048자), `sourceType == "original"`이면 **필드 자체를 넣지 않는다** | - | 생성+수정 |
| `mediaAssetIds | array\<string\> | N | `[]` | 자료 최대 5개, 각 mediaAsset 문서 ID (ImageKit) | - | 생성+수정 | - | 생성+수정 |
| `linkedRefs` | array\<map\> | N | `[]` | Post와 동일 구조·동일 제약 ([D-020](./11-DECISION-LOG.md)) | `type`: `lesson \| glossary \| atlas` | 생성+수정 |
| `tags` | array\<string\> | N | `[]` | 최대 5개, 각 1~20자 | - | 생성+수정 |
| `status` | string | Y | 역할별 결정(아래) | | `draft \| pending_review \| community \| official \| needs_revision \| archived` | 생성+수정(허용된 전이만, 아래 표) |
| `likeCount` | number | Y | `0` | 서버 전용 카운터 | - | 불가 |
| `commentCount` | number | Y | `0` | 서버 전용 카운터 | - | 불가 |
| `reviewedByUid` | string | N | 없음 | | - | 불가 |
| `reviewedAt` | Timestamp | N | 없음 | | - | 불가 |
| `statusNote` | string | N | 없음 | `needs_revision` 사유 등, 0~500자 | - | 불가(콜러블 payload) |
| `deletedAt` | Timestamp | N | 없음 | `archived` 전이 시각 | - | 불가 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**초기 `status` 결정 규칙(작성 시점 역할 기준, 고정값이며 클라이언트가 임의 지정 불가)**:

| 작성자 역할 | 최초 저장 시 `status` |
|---|---|
| `member` | `"draft"` (자동저장), 제출 버튼 클릭 시 `"pending_review"`로 전이 |
| `trusted_member` | `"draft"`, 제출 시 `"community"`로 즉시 전이 (CANON C절: "자료 즉시 community 게시") |

**허용된 client 직접 `status` 전이 (이 두 가지만 Rules로 허용, 그 외 모든 전이는 콜러블 전용)**:
1. `draft → pending_review` (member 제출)
2. `draft → community` (trusted_member 제출)
3. `needs_revision → pending_review` (재제출, 작성자 본인)

그 외 모든 전이(`pending_review → community/official/needs_revision`, `community → official`, `* → archived` 등)는 `setMaterialStatus` 콜러블 전용 (moderator: `pending_review→needs_revision`까지, `official` 승격은 admin — CANON H절 그대로).

**생성 주체**: `member` 이상, client 직접 write (`status="draft"` 고정).
**수정 가능 주체**: 본문 — 작성자 본인 (모든 status에서 가능하나 `official` 승격 후 수정 시 `status`가 자동으로 되돌아가지 않음, 즉 승격 이후 내용 수정은 재검수 없이 반영됨 — 결정. 근거: 재검수 강제는 CANON H절에 없는 새 콜러블/트리거가 필요해 범위 밖). `status` — 위 표.
**삭제 정책**: 소프트(`status: "archived"` + `deletedAt`). 하드 삭제 없음.
**공개 여부**: `draft`/`pending_review`/`needs_revision` — 본인 + moderator/admin만. `community`/`official`/`archived` — 전체 공개(guest 포함). `archived`는 `/materials` 기본 목록 필터에서 제외하되 직접 링크 접근은 허용.
**필요 인덱스**: `(status ASC, category ASC, createdAt DESC)`, `(status ASC, createdAt DESC)`(검토 대기 목록), `(authorUid ASC, createdAt DESC)`(내 자료).
**관련 엔터티**: `category`, `authorUid`, `comments`(targetType="material"), `reactions`(targetType="material"), `bookmarks`(targetType="material"), `reports`(targetType="material").
**감사 로그 필요 여부**: Y — `setMaterialStatus` 호출 시 `adminLogs` + `moderationActions`(`promote_material`/`demote_material`) 기록. `promote_material` = `community/pending_review → official`, `demote_material` = 그 외 하향 전이(`→ needs_revision`, `→ archived`).

```ts
// src/features/community/types/material.ts
import type { Timestamp } from "firebase/firestore"

export type MaterialStatus =
  | "draft"
  | "pending_review"
  | "community"
  | "official"
  | "needs_revision"
  | "archived"

export type MaterialSourceType = "original" | "external"   // D-021

export type Material = {
  readonly authorUid: string
  readonly authorDisplayName: string
  readonly authorPhotoUrl?: string
  readonly category: string
  readonly title: string
  readonly description: string
  readonly sourceType: MaterialSourceType
  readonly resourceUrl?: string          // sourceType === "external" 일 때만 존재
  readonly mediaAssetIds: readonly string[]
  readonly linkedRefs: readonly LinkedRef[]
  readonly tags: readonly string[]
  readonly status: MaterialStatus
  readonly likeCount: number
  readonly commentCount: number
  readonly reviewedByUid?: string
  readonly reviewedAt?: Timestamp
  readonly statusNote?: string
  readonly deletedAt?: Timestamp
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod
import { z } from "zod"

export const MaterialCreateInputSchema = z.object({
  category: z.string().min(1).max(40),
  title: z.string().min(2).max(120),
  description: z.string().min(1).max(5000),
  mediaAssetIds: z.array(z.string().min(1)).max(5).default([]),
  tags: z.array(z.string().min(1).max(20)).max(5).default([]),
  linkedRefs: z.array(LinkedRefSchema).max(5).default([]),
})
  // 출처 분기(D-021): sourceType 에 따라 resourceUrl 의 필수 여부가 달라지므로 discriminatedUnion 으로 강제한다.
  .and(z.discriminatedUnion("sourceType", [
    z.object({ sourceType: z.literal("external"), resourceUrl: z.string().url().min(1).max(2048) }),
    z.object({ sourceType: z.literal("original") }).strict(),
  ]))

export const MaterialUpdateInputSchema = MaterialCreateInputSchema.partial()

export const SetMaterialStatusRequestSchema = z.object({
  materialId: z.string().min(1),
  status: z.enum(["pending_review", "community", "official", "needs_revision", "archived"]),
  statusNote: z.string().max(500).optional(),
})
```

---

### 2.6 Comment — `comments/{commentId}`

**문서 ID 전략**: 자동 생성 ID.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `authorUid` | string | Y | - | `== auth.uid` | - | 생성 시 |
| `authorDisplayName` | string | Y | - | denormalize | - | 생성 시 |
| `authorPhotoUrl` | string | N | 없음 | denormalize | - | 생성 시 |
| `targetType` | string | Y | - | | `post \| material` | 생성 시 |
| `targetId` | string | Y | - | 대상 문서 ID | - | 생성 시 |
| `parentCommentId` | string | N | 없음 | 대댓글(1단계만 허용, 아래 규칙) | - | 생성 시 |
| `bodyMarkdown` | string | Y | - | 1~2000자 | - | 생성+수정 |
| `status` | string | Y | `"published"` | | `published \| hidden \| deleted` | 생성 시(고정) + 수정(본인: `published→deleted`만, moderator+: `deleteCommentByModerator` 콜러블) |
| `deletedAt` | Timestamp | N | 없음 | | - | 불가 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**대댓글 규칙**: `parentCommentId`가 가리키는 댓글 자신도 `parentCommentId`를 갖고 있으면(즉 2단계가 되면) 생성 거부. 1단계 대댓글까지만 허용.

**생성 주체**: `member` 이상, client 직접 write.
**수정 가능 주체**: `bodyMarkdown` — 본인, `status == "published"`인 동안만. `status: published→deleted` — 본인 직접 가능(자진 삭제). `status→hidden/deleted`(타인에 의한) — `deleteCommentByModerator` 콜러블(moderator+)만. 복구 경로 없음(CANON `ModerationActionType`에 `restore_comment`가 없으므로 한 번 숨김/삭제된 댓글은 되돌릴 수 없다 — 결정).
**삭제 정책**: 소프트(`status: "deleted"`). 하드 삭제 없음.
**공개 여부**: `status == "published"`이고 대상(post/material)이 공개 상태일 때 전체 공개. 그 외는 작성자 본인 + moderator/admin만.
**필요 인덱스**: `(targetType ASC, targetId ASC, status ASC, createdAt ASC)` — 게시글/자료 상세의 댓글 목록. `(authorUid ASC, createdAt DESC)` — 내 댓글.
**관련 엔터티**: `targetType`+`targetId`→`posts`/`materials`, `authorUid`→`users`/`profiles`, `parentCommentId`→`comments`(자기 참조).
**감사 로그 필요 여부**: Y — `deleteCommentByModerator` 호출 시 `adminLogs` + `moderationActions`(`delete_comment`) 기록.

```ts
// src/features/community/types/comment.ts
import type { Timestamp } from "firebase/firestore"

export type TargetType = "post" | "material"
export type CommentStatus = "published" | "hidden" | "deleted"

export type Comment = {
  readonly authorUid: string
  readonly authorDisplayName: string
  readonly authorPhotoUrl?: string
  readonly targetType: TargetType
  readonly targetId: string
  readonly parentCommentId?: string
  readonly bodyMarkdown: string
  readonly status: CommentStatus
  readonly deletedAt?: Timestamp
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod
import { z } from "zod"

export const CommentCreateInputSchema = z.object({
  targetType: z.enum(["post", "material"]),
  targetId: z.string().min(1),
  parentCommentId: z.string().min(1).optional(),
  bodyMarkdown: z.string().min(1).max(2000),
})

export const CommentUpdateInputSchema = z.object({
  bodyMarkdown: z.string().min(1).max(2000),
})
```

---

### 2.7 Reaction — `reactions/{reactionId}`

**문서 ID 전략**: 결정론적. `{targetType}__{targetId}__{uid}` (CANON D-006 확정). 상세 설계는 4절.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `targetType` | string | Y | - | | `post \| material` | 생성 시 |
| `targetId` | string | Y | - | | - | 생성 시 |
| `uid` | string | Y | - | `== auth.uid` | - | 생성 시 |
| `type` | string | Y | `"like"` | V1은 `like` 하나뿐 | `like` | 생성 시(고정값) |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: `member` 이상, client `setDoc`(결정론적 ID).
**수정 가능 주체**: 없음(불변, update 자체를 Rules로 차단). "좋아요 취소"는 문서 삭제로 표현.
**삭제 정책**: **하드 삭제** (1.5절 예외 — 존재 자체가 boolean 상태이므로 물리 삭제가 정확한 의미). 본인만 자신의 반응 문서를 삭제 가능.
**공개 여부**: 개별 문서 `get`은 본인만(자신이 반응했는지 확인 용도). 목록 `list`은 `where uid == auth.uid` 조건이 걸린 쿼리만 허용(= `/me/likes`). 타인의 반응 목록 조회는 불가, 카운트(`likeCount`)만 대상 문서를 통해 공개.
**필요 인덱스**: `(uid ASC, createdAt DESC)` — 내 좋아요 목록.
**관련 엔터티**: `targetType`+`targetId`→`posts`/`materials`, `uid`→`users`.
**감사 로그 필요 여부**: N.

```ts
// src/features/community/types/reaction.ts
import type { Timestamp } from "firebase/firestore"
import type { TargetType } from "./comment"

export type ReactionType = "like"

export type Reaction = {
  readonly targetType: TargetType
  readonly targetId: string
  readonly uid: string
  readonly type: ReactionType
  readonly createdAt: Timestamp
}

export function buildReactionId(targetType: TargetType, targetId: string, uid: string): string {
  return `${targetType}__${targetId}__${uid}`
}
```

```ts
// zod
import { z } from "zod"

export const ReactionCreateInputSchema = z.object({
  targetType: z.enum(["post", "material"]),
  targetId: z.string().min(1),
})
```

---

### 2.8 Bookmark — `bookmarks/{bookmarkId}`

**문서 ID 전략**: 결정론적. `{uid}__{targetType}__{targetId}` (CANON D-007 확정). 상세 설계는 4절.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `uid` | string | Y | - | `== auth.uid` | - | 생성 시 |
| `targetType` | string | Y | - | | `post \| material` | 생성 시 |
| `targetId` | string | Y | - | | - | 생성 시 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

카운터 없음 (D-007 확정 — 북마크 수를 대상 문서에 노출하지 않는다).

**생성 주체**: `member` 이상, client `setDoc`.
**수정 가능 주체**: 없음.
**삭제 정책**: 하드 삭제, 본인만.
**공개 여부**: 본인만 `get`/`list`(`where uid == auth.uid`). 타인 북마크는 완전 비공개(좋아요와 달리 카운트조차 공개하지 않음).
**필요 인덱스**: `(uid ASC, createdAt DESC)` — 내 북마크 목록.
**관련 엔터티**: `targetType`+`targetId`→`posts`/`materials`, `uid`→`users`.
**감사 로그 필요 여부**: N.

```ts
// src/features/community/types/bookmark.ts
import type { Timestamp } from "firebase/firestore"
import type { TargetType } from "./comment"

export type Bookmark = {
  readonly uid: string
  readonly targetType: TargetType
  readonly targetId: string
  readonly createdAt: Timestamp
}

export function buildBookmarkId(uid: string, targetType: TargetType, targetId: string): string {
  return `${uid}__${targetType}__${targetId}`
}
```

```ts
// zod
import { z } from "zod"

export const BookmarkCreateInputSchema = z.object({
  targetType: z.enum(["post", "material"]),
  targetId: z.string().min(1),
})
```

---

### 2.9 Category — `categories/{categoryId}`

**문서 ID 전략**: 결정론적. `categoryId = slug` (CANON D절 확정).

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `slug` | string | Y | - | 문서 ID와 동일(1.2 규칙) | - | 불가 |
| `kind` | string | Y | - | | `community \| material` | 불가(생성 시 콜러블/시드가 결정) |
| `name` | string | Y | - | 1~30자, 표시명 | - | 생성 시(콜러블/시드), 수정(admin) |
| `description` | string | N | `""` | 0~200자 | - | 생성+수정(admin) |
| `order` | number | Y | - | `kind`별로 0부터 시작하는 정렬 순서 | - | 생성+수정(admin) |
| `status` | string | Y | `"active"` | | `active \| archived` | 수정(admin) |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: (1) 초기 시드 8절 — 배포 스크립트가 서비스 계정으로 최초 1회 직접 생성(Functions 아님). (2) 이후 신규 카테고리 — `reviewCategoryRequest` 콜러블(admin)이 신청 승인 시 생성. **client가 `categories` 컬렉션에 직접 신규 문서를 만드는 경로는 없다.**
**수정 가능 주체**: `name`/`description`/`order`/`status` — admin, Security Rules로 role 검사 후 직접 필드 write 허용(전용 콜러블 없음, 저위험 메타데이터로 판단 — CANON H절에 카테고리 수정 콜러블이 없기 때문의 결정. 감사 로그 공백은 **OPEN-02**).
**삭제 정책**: 소프트(`status: "archived"`). 물리 삭제 없음(참조 무결성).
**공개 여부**: 전체 공개(guest 포함, 목록/작성 폼 드롭다운에 필요).
**필요 인덱스**: `(kind ASC, status ASC, order ASC)`.
**관련 엔터티**: `posts.category`, `materials.category`(약한 참조, 문자열 슬러그 — FK 무결성 미보장, **OPEN-03**), `categoryRequests`(승인 시 이 컬렉션에 문서를 생성).
**감사 로그 필요 여부**: 시드/승인 생성은 Y(승인은 `reviewCategoryRequest` 콜러블 경유). 직접 필드 수정(admin)은 콜러블 미경유라 **OPEN-02**.

```ts
// src/features/community/types/category.ts
import type { Timestamp } from "firebase/firestore"

export type CategoryKind = "community" | "material"
export type CategoryStatus = "active" | "archived"

export type Category = {
  readonly slug: string
  readonly kind: CategoryKind
  readonly name: string
  readonly description: string
  readonly order: number
  readonly status: CategoryStatus
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod
import { z } from "zod"

export const CategoryUpdateInputSchema = z.object({
  name: z.string().min(1).max(30).optional(),
  description: z.string().max(200).optional(),
  order: z.number().int().min(0).optional(),
  status: z.enum(["active", "archived"]).optional(),
})
```

---

### 2.10 CategoryRequest — `categoryRequests/{requestId}`

**문서 ID 전략**: 자동 생성 ID.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `requestedByUid` | string | Y | - | `== auth.uid` | - | 생성 시 |
| `kind` | string | Y | - | | `community \| material` | 생성 시 |
| `proposedSlug` | string | Y | - | 1~40자, `^[a-z0-9-]+$` | - | 생성 시 |
| `proposedName` | string | Y | - | 1~30자 | - | 생성 시 |
| `reason` | string | Y | - | 1~500자 | - | 생성 시 |
| `status` | string | Y | `"submitted"` | | `submitted \| approved \| rejected` | 불가(수정은 콜러블 전용) |
| `reviewedByUid` | string | N | 없음 | | - | 불가 |
| `reviewedAt` | Timestamp | N | 없음 | | - | 불가 |
| `rejectionReason` | string | N | 없음 | 0~500자 | - | 불가 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: `member` 이상, client 직접 write(간단한 신청이라 콜러블 불요로 판단).
**수정 가능 주체**: `reviewCategoryRequest` 콜러블(admin)만 — 승인 시 `categories/{proposedSlug}` 문서도 함께 생성.
**삭제 정책**: 삭제 없음, 영구 보존.
**공개 여부**: 본인 + admin만.
**필요 인덱스**: `(status ASC, createdAt DESC)`.
**관련 엔터티**: `requestedByUid`→`users`, 승인 시 `categories`에 신규 문서 생성.
**감사 로그 필요 여부**: Y(`reviewCategoryRequest` 콜러블 경유).

```ts
// src/features/community/types/categoryRequest.ts
import type { Timestamp } from "firebase/firestore"
import type { CategoryKind } from "./category"

export type RequestStatus = "submitted" | "approved" | "rejected"

export type CategoryRequest = {
  readonly requestedByUid: string
  readonly kind: CategoryKind
  readonly proposedSlug: string
  readonly proposedName: string
  readonly reason: string
  readonly status: RequestStatus
  readonly reviewedByUid?: string
  readonly reviewedAt?: Timestamp
  readonly rejectionReason?: string
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod
import { z } from "zod"

export const CategoryRequestCreateInputSchema = z.object({
  kind: z.enum(["community", "material"]),
  proposedSlug: z.string().min(1).max(40).regex(/^[a-z0-9-]+$/),
  proposedName: z.string().min(1).max(30),
  reason: z.string().min(1).max(500),
})

export const ReviewCategoryRequestRequestSchema = z.object({
  requestId: z.string().min(1),
  decision: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().max(500).optional(),
})
```

---

### 2.11 Report — `reports/{reportId}`

**문서 ID 전략**: **결정론적 ID `{targetType}__{targetId}__{reporterUid}`** (예: `post__aBc123__uid789`). `reactions`(2.7절)·`bookmarks`(2.8절)와 동일한 패턴이다. 동일 신고자가 같은 대상을 재제출하면 같은 문서 ID로 수렴해 `create`가 아닌 `update`가 되고, `update`는 moderator 전용 `open → in_review` 전이만 허용되므로 **서버 로직 없이 Rules만으로 중복 신고가 차단된다**.

대상별 신고 건수는 신고자가 다르면 문서도 다르므로 그대로 집계된다 — 결정론적 ID는 모더레이션 우선순위 신호를 손상시키지 않고, 1인이 그 신호를 부풀리는 경로만 제거한다. 상세 근거와 기각된 자동 ID 안은 [D-018](./11-DECISION-LOG.md)에 있다(이 결정으로 **OPEN-04 해소**).

> **클라이언트 구현 제약**: `addDoc()`을 쓰면 안 된다. 반드시
> `setDoc(doc(db, "reports", `${targetType}__${targetId}__${auth.currentUser.uid}`), {...})` 형태로 ID를 직접 지정한다. `addDoc`은 랜덤 ID를 만들고, 그 ID는 Rules의 ID 패턴 검사를 절대 통과하지 못해 모든 신고가 `permission-denied`로 거부된다.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `reporterUid` | string | Y | - | `== auth.uid` | - | 생성 시 |
| `targetType` | string | Y | - | | `post \| material` | 생성 시 |
| `targetId` | string | Y | - | | - | 생성 시 |
| `reason` | string | Y | - | | `spam \| abuse \| illegal \| copyright \| wrong_info \| other` | 생성 시 |
| `detail` | string | N | 없음 | 0~500자 | - | 생성 시 |
| `status` | string | Y | `"open"` | | `open \| in_review \| resolved \| dismissed` | 불가(콜러블 전용) |
| `resolvedByUid` | string | N | 없음 | | - | 불가 |
| `resolvedAt` | Timestamp | N | 없음 | | - | 불가 |
| `resolutionNote` | string | N | 없음 | 0~500자 | - | 불가 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |
| `updatedAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: `member` 이상, client 직접 write.
**수정 가능 주체**: `resolveReport` 콜러블(moderator+)만.
**삭제 정책**: 삭제 없음, 영구 보존.
**공개 여부**: 본인(자신이 넣은 신고 목록) + moderator/admin.
**필요 인덱스**: `(status ASC, createdAt DESC)`, `(targetType ASC, targetId ASC, status ASC)`.
**관련 엔터티**: `reporterUid`→`users`, `targetType`+`targetId`→`posts`/`materials`.
**감사 로그 필요 여부**: Y(`resolveReport` 콜러블 경유, `adminLogs`에 기록. `resolveReport` 자체는 `ModerationActionType`에 없는 액션이므로 `moderationActions`는 기록하지 않고, 처리 과정에서 실제로 `moderatePost` 등을 별도 호출했다면 그 콜러블이 자신의 `moderationActions` 항목을 남긴다).

```ts
// src/features/community/types/report.ts
import type { Timestamp } from "firebase/firestore"
import type { TargetType } from "./comment"

export type ReportReason = "spam" | "abuse" | "illegal" | "copyright" | "wrong_info" | "other"
export type ReportStatus = "open" | "in_review" | "resolved" | "dismissed"

export type Report = {
  readonly reporterUid: string
  readonly targetType: TargetType
  readonly targetId: string
  readonly reason: ReportReason
  readonly detail?: string
  readonly status: ReportStatus
  readonly resolvedByUid?: string
  readonly resolvedAt?: Timestamp
  readonly resolutionNote?: string
  readonly createdAt: Timestamp
  readonly updatedAt: Timestamp
}
```

```ts
// zod
import { z } from "zod"

export const ReportCreateInputSchema = z.object({
  targetType: z.enum(["post", "material"]),
  targetId: z.string().min(1),
  reason: z.enum(["spam", "abuse", "illegal", "copyright", "wrong_info", "other"]),
  detail: z.string().max(500).optional(),
})

export const ResolveReportRequestSchema = z.object({
  reportId: z.string().min(1),
  decision: z.enum(["resolved", "dismissed"]),
  resolutionNote: z.string().max(500).optional(),
})
```

---

### 2.12 Notification — `notifications/{uid}/items/{notificationId}`

**문서 ID 전략**: 자동 생성 ID, `uid` 서브컬렉션으로 소유자 분리(CANON D절 확정).

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `type` | string | Y | - | | `comment_on_post \| comment_on_material \| reply_to_comment \| reaction_received \| membership_approved \| membership_rejected \| material_status_changed \| category_request_resolved \| report_resolved \| admin_notice` | 불가 |
| `actorUid` | string | N | 없음 | 알림을 유발한 사용자(있는 경우) | - | 불가 |
| `targetType` | string | N | 없음 | `post \| material \| comment \| membershipApplication \| category \| categoryRequest \| report` — `TargetType` enum보다 넓은 범위이므로 별도 문자열 필드(enum 아님) | - | 불가 |
| `targetId` | string | N | 없음 | | - | 불가 |
| `message` | string | Y | - | 서버가 생성하는 표시용 요약, 1~200자 | - | 불가 |
| `linkPath` | string | N | 없음 | 클릭 시 이동 경로, 0~300자 | - | 불가 |
| `readAt` | Timestamp | N | 없음(미읽음) | | - | **수정만**(본인, 이 필드 단일 갱신만) |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: Cloud Functions 트리거만 — `onCommentWritten`(댓글/대댓글 알림), `onMembershipReviewed`(가입 승인/거절), `onMaterialStatusChanged`(자료 상태 변경), `onReportResolved`(신고 처리 결과). `reaction_received`, `category_request_resolved` 타입의 실제 생성 트리거는 CANON H절 트리거 목록에 명시적 매핑이 없다 — `onReactionWritten`은 카운터 갱신 전용으로 정의되어 있으므로(H절), 좋아요 알림까지 같은 트리거가 겸하는지 여부는 **OPEN-05a**로 남긴다(구현 시 `onReactionWritten` 확장 또는 콜러블 내부 로직 추가 중 택1 필요). `admin_notice` 타입을 생성하는 콜러블도 H절에 없다 — **OPEN-05b**.
**수정 가능 주체**: 본인이 `readAt`만 `serverTimestamp()`로 1회 write. 그 외 필드 수정 불가.
**삭제 정책**: V1은 클라이언트 삭제 기능 없음. 보존 정책은 9절.
**공개 여부**: 본인만.
**필요 인덱스**: `(readAt ASC, createdAt DESC)` — 미읽음 목록(서브컬렉션 범위 안이므로 collectionGroup 불요).
**관련 엔터티**: 소유자 `uid`(경로 세그먼트), `actorUid`→`users`, `targetType`+`targetId`→해당 컬렉션.
**감사 로그 필요 여부**: N(사용자 대상 알림이므로 관리자 감사 대상 아님).

```ts
// src/features/community/types/notification.ts
import type { Timestamp } from "firebase/firestore"

export type NotificationType =
  | "comment_on_post"
  | "comment_on_material"
  | "reply_to_comment"
  | "reaction_received"
  | "membership_approved"
  | "membership_rejected"
  | "material_status_changed"
  | "category_request_resolved"
  | "report_resolved"
  | "admin_notice"

export type Notification = {
  readonly type: NotificationType
  readonly actorUid?: string
  readonly targetType?: string
  readonly targetId?: string
  readonly message: string
  readonly linkPath?: string
  readonly readAt?: Timestamp
  readonly createdAt: Timestamp
}
```

```ts
// zod — 클라이언트는 readAt 갱신 요청 외에 쓰지 않으므로 입력 스키마는 이것뿐
import { z } from "zod"

export const MarkNotificationReadInputSchema = z.object({
  notificationId: z.string().min(1),
})
```

---

### 2.13 AdminLog — `adminLogs/{logId}`

**문서 ID 전략**: 자동 생성 ID.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `actorUid` | string | Y | - | 콜러블을 호출한 사용자 | - | 불가 |
| `actorRole` | string | Y | - | 호출 당시 role 스냅샷 | `moderator \| admin` | 불가 |
| `action` | string | Y | - | 호출된 콜러블 함수명 원문(H절 목록의 이름 그대로: `submitMembershipApplication` 등) | - | 불가 |
| `targetType` | string | N | 없음 | 자유 문자열(`user \| post \| material \| comment \| category \| categoryRequest \| report \| membershipApplication`) | - | 불가 |
| `targetId` | string | N | 없음 | | - | 불가 |
| `detail` | map | N | `{}` | 변경 전/후 요약(예: `{beforeRole, afterRole}`) | - | 불가 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: Cloud Functions만 — H절의 모든 콜러블이 진입 즉시 4단계 검증의 마지막 단계로 기록(H절 "모든 callable은... adminLogs 기록 순으로 처리").
**수정 가능 주체**: 없음(불변).
**삭제 정책**: 삭제 금지. GDPR 등 예외적 삭제 요청 처리 방법은 V1 범위 밖(**OPEN-09**로 별도 명시하지 않고 정책 배제로 확정 — 감사 로그의 불변성이 원칙이므로 삭제 요청이 오면 개별 검토).
**공개 여부**: admin만 (`/admin/logs`).
**필요 인덱스**: `(actorUid ASC, createdAt DESC)`, `(targetType ASC, targetId ASC, createdAt DESC)`, `(action ASC, createdAt DESC)`.
**관련 엔터티**: 모든 엔터티를 `targetType`/`targetId`로 느슨하게 참조.
**감사 로그 필요 여부**: N/A(자기 자신이 감사 로그).

```ts
// src/features/community/types/adminLog.ts
import type { Timestamp } from "firebase/firestore"

export type AdminLog = {
  readonly actorUid: string
  readonly actorRole: "moderator" | "admin"
  readonly action: string
  readonly targetType?: string
  readonly targetId?: string
  readonly detail?: Readonly<Record<string, unknown>>
  readonly createdAt: Timestamp
}
```

```ts
// zod — 클라이언트가 쓰지 않으므로 입력 스키마 없음. Functions 내부 기록용 스키마만 둔다.
import { z } from "zod"

export const AdminLogWriteSchema = z.object({
  actorUid: z.string().min(1),
  actorRole: z.enum(["moderator", "admin"]),
  action: z.string().min(1),
  targetType: z.string().max(40).optional(),
  targetId: z.string().max(200).optional(),
  detail: z.record(z.string(), z.unknown()).optional(),
})
```

---

### 2.14 ModerationAction — `moderationActions/{actionId}`

**문서 ID 전략**: 자동 생성 ID.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `type` | string | Y | - | | `hide_post \| restore_post \| delete_comment \| suspend_user \| restore_user \| promote_material \| demote_material \| change_role` | 불가 |
| `actorUid` | string | Y | - | | - | 불가 |
| `targetId` | string | Y | - | 대상 문서 ID(대상 종류는 `type`에서 유추 가능하므로 별도 `targetType` 필드를 두지 않는다 — 새 enum 추가 회피) | - | 불가 |
| `reason` | string | N | 없음 | 0~500자 | - | 불가 |
| `metadata` | map | N | `{}` | 예: `{previousStatus, newStatus}`, `{previousRole, newRole}` | - | 불가 |
| `createdAt` | Timestamp | Y | serverTimestamp | | - | 불가 |

**생성 주체**: Cloud Functions만 — `moderatePost`(hide_post/restore_post), `deleteCommentByModerator`(delete_comment), `suspendUser`/`restoreUser`(suspend_user/restore_user), `setMaterialStatus`(promote_material/demote_material, 승격·강등에 해당하는 전이일 때만), `setUserRole`(change_role).
**수정 가능 주체**: 없음(불변).
**삭제 정책**: 삭제 금지.
**공개 여부**: moderator+ (대상 관련 이력 표시용), admin.
**필요 인덱스**: `(targetId ASC, createdAt DESC)`, `(type ASC, createdAt DESC)`, `(actorUid ASC, createdAt DESC)`.
**관련 엔터티**: `type`이 가리키는 대상 컬렉션(`posts`/`comments`/`users`/`materials`)에 `targetId`로 연결.
**감사 로그 필요 여부**: N/A(모더레이션 이력 자신, 별도로 `adminLogs`에도 동시 기록되므로 이중 기록이나 목적이 다름 — `adminLogs`는 "누가 무엇을 호출했는가"의 일반 감사, `moderationActions`는 "이 대상에 어떤 조치가 있었는가"의 대상 중심 이력).

```ts
// src/features/community/types/moderationAction.ts
import type { Timestamp } from "firebase/firestore"

export type ModerationActionType =
  | "hide_post"
  | "restore_post"
  | "delete_comment"
  | "suspend_user"
  | "restore_user"
  | "promote_material"
  | "demote_material"
  | "change_role"

export type ModerationAction = {
  readonly type: ModerationActionType
  readonly actorUid: string
  readonly targetId: string
  readonly reason?: string
  readonly metadata?: Readonly<Record<string, unknown>>
  readonly createdAt: Timestamp
}
```

```ts
// zod
import { z } from "zod"

export const ModerationActionWriteSchema = z.object({
  type: z.enum([
    "hide_post",
    "restore_post",
    "delete_comment",
    "suspend_user",
    "restore_user",
    "promote_material",
    "demote_material",
    "change_role",
  ]),
  actorUid: z.string().min(1),
  targetId: z.string().min(1),
  reason: z.string().max(500).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})
```

---


### 2.16 MediaAsset — `mediaAssets/{mediaAssetId}`

**문서 ID 전략**: Firestore auto ID (랜덤). `mediaAssetId`는 ImageKit API가 반환하는 `fileId`와 같지 않음. 문서 ID는 Firestore 내부 참조용이며, ImageKit `fileId`는 `fileId` 필드에 저장.

**필드**

| 필드 | 타입 | 필수 | 기본값 | 설명 | enum 값 | 클라이언트 쓰기 |
|---|---|---|---|---|---|---|
| `id` | string | Y | - | 문서 ID (1.2 규칙, Firestore auto ID와 동일) | - | 생성 후 불변 |
| `provider` | string | Y | `"imagekit"` | 이미지 제공자 | `"imagekit"` | 생성 시 |
| `fileId` | string | Y | - | ImageKit 내부 파일 ID | - | 생성 시 |
| `url` | string | Y | - | ImageKit URL | - | 생성 시 |
| `thumbnailUrl` | string | Y | - | 썸네일 URL (ImageKit 변환 `tr=w-400`) | - | 생성 시 |
| `originalFileName` | string | Y | - | 업로드 시 원본 파일명 | - | 생성 시 |
| `mimeType` | string | Y | - | MIME 타입 | `"image/jpeg" \| "image/png" \| "image/webp"` | 생성 시 |
| `width` | number | Y | - | 픽셀 너비 | - | 생성 시 |
| `height` | number | Y | - | 픽셀 높이 | - | 생성 시 |
| `sizeBytes` | number | Y | - | 파일 크기 (바이트), 최대 5MB | - | 생성 시 |
| `uploadedBy` | string | Y | - | 업로드한 사용자 UID | - | 생성 시 (불변) |
| `ownerType` | string | N | `null` | 연결된 콘텐츠 타입 | `"post" \| "material"` | 생성 시/attached 시 |
| `ownerId` | string | N | `null` | 연결된 콘텐츠 문서 ID | - | 생성 시/attached 시 |
| `status` | string | Y | `"temporary"` | 이미지 상태 | `"temporary" \| "attached" \| "pending_delete" \| "deleted"` | 생성 시 + update |
| `createdAt` | Timestamp | Y | `serverTimestamp()` | 문서 생성 시각 | - | 생성 시 |
| `attachedAt` | Timestamp | N | `null` | 게시글/자료에 연결된 시각 | - | attached 시 |
| `deletedAt` | Timestamp | N | `null` | 실제 삭제 시각 | - | deleted 시 |

**TypeScript 타입**

```ts
export type MediaProvider = "imagekit"

export type MediaAsset = {
  readonly id: string
  readonly provider: MediaProvider
  readonly fileId: string
  readonly url: string
  readonly thumbnailUrl: string
  readonly originalFileName: string
  readonly mimeType: "image/jpeg" | "image/png" | "image/webp"
  readonly width: number
  readonly height: number
  readonly sizeBytes: number
  readonly uploadedBy: string
  readonly ownerType: "post" | "material" | null
  readonly ownerId: string | null
  readonly status: "temporary" | "attached" | "pending_delete" | "deleted"
  readonly createdAt: Timestamp
  readonly attachedAt: Timestamp | null
  readonly deletedAt: Timestamp | null
}
```

**Security Rules 요약** (정본은 [06 §4](./06-SECURITY-AND-MODERATION-SSOT.md)):
- read: 인증 불필요 (공개 이미지)
- create: `request.auth != null && request.resource.data.uploadedBy == request.auth.uid`
- update: `request.auth != null && (resource.data.uploadedBy == request.auth.uid || request.auth.token.role == 'admin')`
- delete: `request.auth.token.role == 'admin'` (실제 ImageKit 파일 삭제는 Cloudflare Worker)

**이미지 상태 전이**
```
temporary → attached (게시글/자료 저장 성공)
temporary → pending_delete (글 작성 취소, 관리자 삭제)
attached → pending_delete (게시글/자료 영구 삭제)
pending_delete → deleted (ImageKit 실제 삭제 완료)
```

**V1에서 자동 정리 작업 미구현 전제**:
- `temporary` 상태 이미지가 24시간 이상 방치될 수 있음
- 관리자는 `mediaAssets` 컬렉션에서 `status == "temporary" && createdAt < 24시간 전` 조건으로 조회 후 ImageKit 대시보드 또는 Cloudflare Worker 삭제 엔드포인트로 정리

---

## 3. 중복 방지 문서 ID 전략 — Reaction / Bookmark 상세

### 3.1 왜 쿼리 기반이 아니라 ID 기반인가

쿼리 기반 중복 검사("이미 좋아요를 눌렀는지 `where uid==X and targetId==Y`로 조회한 뒤, 없으면 새 문서를 만든다")는 **TOCTOU(Time-Of-Check to Time-Of-Use) 경쟁 상태**를 갖는다:

1. 사용자가 두 탭에서 동시에 좋아요 버튼을 누른다(또는 더블클릭이 두 번의 이벤트를 만든다).
2. 두 요청이 거의 동시에 "존재 여부 조회"를 실행 — **둘 다 "없음"을 본다** (아직 어느 쪽도 쓰기를 완료하지 않았으므로).
3. 둘 다 "없으니 생성"으로 판단해 **서로 다른 auto-ID 문서 두 개**를 만든다.
4. 카운터 트리거가 두 번 실행되어 `likeCount`가 실제로는 1이어야 할 것이 2로 잘못 증가한다.

이 경쟁 상태는 Firestore 클라이언트 SDK가 트랜잭션 없이 "읽고 판단하고 쓰는" 3단계를 분리 수행하는 한 근본적으로 막을 수 없다.

**결정론적 ID(`{targetType}__{targetId}__{uid}`)는 이 문제를 구조적으로 없앤다**: 같은 사용자가 같은 대상에 반응하면 항상 **같은 문서 경로**를 가리키므로, 두 개의 동시 요청은 "서로 다른 두 문서를 만드는 것"이 아니라 "같은 문서를 두 번 쓰는 것"이 된다. 문서 생성 자체는 멱등(idempotent)해지고, 카운터 트리거는 5절에서 설명하는 대로 "문서가 새로 존재하게 된 순간"에만 반응하도록 설계하면 이중 증가가 일어날 수 없다.

### 3.2 동시성 안전성의 근거

Cloud Firestore의 문서는 **경로가 곧 정체성**이다. 결정론적 ID 설계에서:

- 두 클라이언트가 동시에 `setDoc(doc(db, "reactions", "post__abc__uid1"), {...})`를 호출해도, Firestore 서버는 이를 **같은 문서에 대한 두 번의 쓰기**로 직렬화한다(마지막 쓰기가 이긴다, last-write-wins). 결과는 문서 하나, 필드값은 사실상 동일(모두 같은 `targetType`/`targetId`/`uid`/`type: "like"`를 보내므로).
- 카운터를 증가시키는 Firestore 트리거(`onReactionWritten`, gen2 `onDocumentWritten`)는 `change.before`/`change.after`의 존재 여부로 "생성"과 "갱신"을 구분한다. 같은 문서에 대한 두 번째 `setDoc`은 `before.exists === true`이므로 **갱신 이벤트**로 분류되고, 핸들러는 `before.exists && after.exists`인 경우 아무 것도 하지 않는다(카운터 변경 없음). 오직 `!before.exists && after.exists`(최초 생성)일 때만 `+1`, `before.exists && !after.exists`(삭제)일 때만 `-1`을 한다.
- Firestore는 동일 문서에 대한 동시 쓰기를 **원자적으로 직렬화**하므로(내부적으로 낙관적 동시성 제어 + 재시도), "생성 이벤트가 두 번 발생"하는 상황 자체가 구조적으로 불가능하다 — 문서가 존재하지 않는 상태에서 존재하는 상태로의 전이는 논리적으로 단 한 번만 일어날 수 있다.

이 설계 때문에 카운터가 실제 반응 수와 어긋나는 경우는 오직 "트리거 실행 자체가 실패했을 때"(Functions 장애, 타임아웃 등)뿐이며, 이는 "중복 생성"과는 다른 문제로 5절의 재계산 배치로 복구한다.

### 3.3 ID 생성 함수 (정본 코드)

```ts
// src/features/community/lib/deterministicIds.ts
import type { TargetType } from "../types/comment"

/**
 * Reaction 문서 ID. CANON D-006: {targetType}__{targetId}__{uid}
 * 예: "post__k7Hn2pQxYzAbC123__6f3a9c1d8e0b4f2a9c7d5e3b1a0f8c6d"
 */
export function buildReactionId(targetType: TargetType, targetId: string, uid: string): string {
  return `${targetType}__${targetId}__${uid}`
}

/**
 * Bookmark 문서 ID. CANON D-007: {uid}__{targetType}__{targetId}
 * 예: "6f3a9c1d8e0b4f2a9c7d5e3b1a0f8c6d__material__k7Hn2pQxYzAbC123"
 */
export function buildBookmarkId(uid: string, targetType: TargetType, targetId: string): string {
  return `${uid}__${targetType}__${targetId}`
}
```

주의: `targetId`(Firestore auto ID)는 `__`(밑줄 2개)를 포함하지 않는다(Firestore auto ID는 영숫자만 사용). 따라서 `split("__")`로 역파싱해도 안전하다.

---

## 4. 카운터 필드 설계

| 필드 | 존재 위치 | 갱신 주체 | 갱신 방법 |
|---|---|---|---|
| `likeCount` | `posts/{postId}`, `materials/{materialId}` | **Cloud Functions만.** 클라이언트는 절대 쓰지 않는다(Security Rules에서 `likeCount` 필드가 요청 전후로 다르면 거부, 오직 트리거의 Admin SDK 쓰기만 이 검사를 우회) | `reactions` 컬렉션 `onReactionWritten` 트리거(`onDocumentWritten`)가 `!before.exists && after.exists`일 때 대상 문서에 `FieldValue.increment(+1)`, `before.exists && !after.exists`일 때 `FieldValue.increment(-1)` |
| `commentCount` | `posts/{postId}`, `materials/{materialId}` | **Cloud Functions만** | `comments` 컬렉션 `onCommentWritten` 트리거(`onDocumentWritten`)가 (a) 생성이면서 `after.status === "published"`일 때 `+1`, (b) 갱신이면서 `before.status === "published" && after.status !== "published"`일 때 `-1`. 그 외 전이(예: `hidden`끼리의 다른 필드 수정)는 무시 |
| `viewCount` | 없음(필드 자체를 스키마에서 제외) | 해당 없음 | 해당 없음 |

### 4.1 `viewCount` 미도입 결정

**결정: V1에서 `viewCount`를 완전히 제외한다. 필드를 예약만 해두지 않고 스키마에서 아예 뺀다.**

근거:
1. 정확한 조회수는 중복 조회 방지(동일 사용자의 새로고침·재방문을 한 번으로 셀지)가 필요하며, 이를 위해서는 세션/IP 기반 dedup 저장소가 별도로 필요하다 — CANON D절에 그런 저장소(예: `postViews/{postId}_{sessionId}` 같은 컬렉션)가 정의되어 있지 않고, 새 컬렉션을 추가하는 것은 금지되어 있다.
2. 부정확한 조회수(모든 페이지뷰를 그대로 증가)는 오히려 신뢰를 깎는다 — 새로고침 한 번마다 숫자가 튀는 카운터는 "없는 것"만 못하다.
3. D-010(V1 범위)에 명시적으로 배제되어 있지는 않지만, "범위 최소화" 원칙과 "Cloud Functions 쓰기 부하 최소화"(모든 상세 페이지 로드마다 `increment` 쓰기가 발생하면 자료/게시글 컬렉션 쓰기 폭주) 관점에서 V1 비목표로 확정한다.
4. 필드를 "예약"만 하고 값을 채우지 않으면, 화면에서 `0`으로 잘못 표시되거나 옵셔널 처리 분기가 코드 전체에 늘어난다 — 아예 없는 편이 스키마가 더 정직하다.

향후 필요해지면 별도 SSOT 개정(신규 컬렉션 추가 포함)으로 다룬다.

### 4.2 정합성 회복 — 재계산 배치 함수

카운터가 실제 `reactions`/`comments` 문서 수와 어긋나는 상황(Functions 실행 실패, 배포 중 트리거 유실, 수동 Firestore 콘솔 조작 등)을 복구하기 위한 함수를 아래와 같이 정의한다.

> **주의**: 이 함수는 CANON H절의 콜러블/트리거 목록에 없다. H절은 "한 글자도 바꾸지 말 것"이 원칙이므로, 이 함수를 정식으로 CANON에 편입하려면 Opus 승인이 필요하다(**OPEN-06**). 이 절은 그 승인을 전제로 한 잠정 스펙이며, Goose는 구현하되 함수 이름·목록을 CANON H절에 추가하는 것은 별도 승인 절차를 거친다.

**함수명**: `recomputeEngagementCounters` (HTTPS callable, admin 전용)

**입력**:
```ts
import { z } from "zod"

export const RecomputeEngagementCountersRequestSchema = z.object({
  targetType: z.enum(["post", "material"]),
  targetId: z.string().min(1),
})
```

**동작**:
1. `request.auth.token.role === "admin"` 검증(H절 4단계 검증 그대로 적용).
2. `reactions` 컬렉션에서 `where("targetType","==",targetType).where("targetId","==",targetId)`로 문서 수를 센다(`getCountFromServer` 집계 쿼리 사용 — 문서 다운로드 없이 카운트만).
3. `comments` 컬렉션에서 같은 대상 + `status == "published"` 조건으로 문서 수를 센다.
4. 대상 문서(`posts/{targetId}` 또는 `materials/{targetId}`)의 `likeCount`/`commentCount`를 계산된 실제 값으로 **덮어쓴다**(`increment`가 아니라 절대값 `set`).
5. `adminLogs`에 `action: "recomputeEngagementCounters"`, `detail: {before, after}` 기록.

**트리거 방법**: 자동 스케줄(예: 매일 새벽 전체 대상 순회)은 V1에서 도입하지 않는다 — `/admin/posts`, `/admin/materials` 화면에 "카운터 재계산" 수동 버튼을 두어 관리자가 의심되는 대상에 한해 호출한다. 이유: 전체 순회 스케줄 함수는 Firestore 읽기 비용이 대상 수에 비례해 계속 증가하며, V1 트래픽 규모에서 자동화의 이득보다 비용이 크다.

---

## 5. denormalized 작성자 정보 갱신 정책

**결정: 갱신하지 않고, 표시 시점에 `profiles` 조회로 보정한다.** (배치 갱신 방식은 채택하지 않는다.)

### 5.1 근거

- **배치 갱신 방식의 비용**: 활동이 많은 사용자 한 명이 닉네임을 바꾸면 그 사람이 쓴 모든 `posts`/`materials`/`comments` 문서를 찾아 갱신해야 한다. 이는 `where("authorUid","==",uid)`로 대상 문서를 모두 조회한 뒤 배치 쓰기(최대 500건/배치)를 반복하는 작업이며, 문서 수가 많을수록 Cloud Functions 실행 시간과 쓰기 비용이 선형으로 증가한다. 게다가 `comments`는 전역 컬렉션이라 한 사용자가 남긴 댓글 수가 게시글보다 훨씬 많을 수 있다.
- **표시 시점 보정 방식의 비용**: 목록 화면에서 `authorDisplayName`을 1차로 즉시 표시(빠른 첫 페인트, denormalize의 원래 목적)하고, 백그라운드에서 화면에 노출된 `authorUid` 집합(중복 제거)을 모아 `profiles` 컬렉션을 `where(documentId(), "in", [...최대 10개])`로 배치 조회한 뒤, 최신값이 저장값과 다르면 화면만 교체 렌더링한다(Firestore 문서 자체는 건드리지 않는다). 추가 읽기 비용은 "화면에 실제로 보이는 서로 다른 작성자 수"에만 비례하며, 쓰기 비용이 전혀 없다.
- V1 트래픽 규모(교육 커뮤니티, 소규모)에서는 읽기 비용 증가가 배치 쓰기의 실행 복잡도·실패 시 부분 갱신 리스크보다 훨씬 관리하기 쉽다.

### 5.2 구체적 규칙

1. `posts`/`materials`/`comments` 문서에 저장된 `authorDisplayName`/`authorPhotoUrl`은 **작성 시점의 스냅샷이며, 프로필이 바뀌어도 자동으로는 갱신되지 않는다.**
2. 목록/상세 렌더링 시 클라이언트는 저장된 `authorDisplayName`을 즉시 표시하고, 동시에 `profiles/{authorUid}`를 조회해 값이 다르면 최신값으로 교체한다(10절 쿼리 카탈로그 Q18 참조).
3. **예외**: 작성자 본인이 게시글/자료를 **수정(update)**할 때는 그 김에 `authorDisplayName`/`authorPhotoUrl`도 현재 자신의 `profiles` 값으로 함께 갱신한다 — 이미 쓰기가 발생하는 시점이므로 추가 비용이 없고, 점진적으로 스냅샷이 최신화되는 효과가 있다.
4. 댓글은 수정 UI 자체가 `bodyMarkdown`만 다루므로(2.6절), 댓글 수정 시에도 저자 정보는 동일하게 함께 갱신한다.

---

## 6. 컬렉션 관계도

```
users/{uid} ──1:1── profiles/{uid}
users/{uid} ──1:1── membershipApplications/{uid}
users/{uid} ──1:N── posts               (authorUid)
users/{uid} ──1:N── materials           (authorUid)
users/{uid} ──1:N── comments            (authorUid)
users/{uid} ──1:N── reactions           (uid)
users/{uid} ──1:N── bookmarks           (uid)
users/{uid} ──1:N── categoryRequests    (requestedByUid)
users/{uid} ──1:N── reports             (reporterUid)
users/{uid} ──1:N── notifications/{uid}/items   (소유, 서브컬렉션)
users/{uid} ──1:N── adminLogs           (actorUid, moderator/admin만)
users/{uid} ──1:N── moderationActions   (actorUid, moderator/admin만)

categories/{slug} ──1:N── posts         (category 필드, kind="community")
categories/{slug} ──1:N── materials     (category 필드, kind="material")
categoryRequests/{id} ──0:1(승인 시)── categories/{slug}   (신규 생성)

posts/{postId} ──1:N── comments         (targetType="post", targetId=postId)
posts/{postId} ──1:N── reactions        (targetType="post")
posts/{postId} ──1:N── bookmarks        (targetType="post")
posts/{postId} ──1:N── reports          (targetType="post")

materials/{materialId} ──1:N── comments   (targetType="material")
materials/{materialId} ──1:N── reactions  (targetType="material")
materials/{materialId} ──1:N── bookmarks  (targetType="material")
materials/{materialId} ──1:N── reports    (targetType="material")

comments/{commentId} ──0:N── comments   (parentCommentId, 1단계만)

[Cloud Functions 콜러블] ──기록──> adminLogs/{logId}          (모든 콜러블 공통)
[모더레이션류 콜러블]     ──기록──> moderationActions/{actionId}  (8종 액션만)
```

---

## 7. 초기 시드 데이터

### 7.1 카테고리 시드 (`categories` 컬렉션, CANON G절 그대로)

아래 14개 문서를 배포 스크립트로 최초 1회 생성한다. `createdAt`/`updatedAt`은 시드 스크립트 실행 시점의 `serverTimestamp()`(아래 JSON에서는 자리표시자 `"<SERVER_TIMESTAMP>"`로 표기).

```json
[
  { "docId": "free",            "slug": "free",            "kind": "community", "name": "자유 이야기",       "description": "",  "order": 0, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "question",        "slug": "question",        "kind": "community", "name": "질문·도움 요청",     "description": "",  "order": 1, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "troubleshooting", "slug": "troubleshooting", "kind": "community", "name": "오류 해결",         "description": "",  "order": 2, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "today-i-made",    "slug": "today-i-made",    "kind": "community", "name": "오늘 만든 것",       "description": "",  "order": 3, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "project",         "slug": "project",         "kind": "community", "name": "프로젝트 모집",      "description": "",  "order": 4, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "tool-review",     "slug": "tool-review",     "kind": "community", "name": "AI 도구 후기",      "description": "",  "order": 5, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "insight",         "slug": "insight",         "kind": "community", "name": "정보·인사이트",      "description": "",  "order": 6, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "gupt-meetup",     "slug": "gupt-meetup",     "kind": "community", "name": "구피티 모임",       "description": "",  "order": 7, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },

  { "docId": "prompt",      "slug": "prompt",      "kind": "material", "name": "프롬프트",     "description": "", "order": 0, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "workflow",    "slug": "workflow",    "kind": "material", "name": "워크플로우",    "description": "", "order": 1, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "tool-guide",  "slug": "tool-guide",  "kind": "material", "name": "도구 가이드",   "description": "", "order": 2, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "template",    "slug": "template",    "kind": "material", "name": "템플릿",      "description": "", "order": 3, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "case-study",  "slug": "case-study",  "kind": "material", "name": "사례 연구",    "description": "", "order": 4, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" },
  { "docId": "reference",   "slug": "reference",   "kind": "material", "name": "레퍼런스",     "description": "", "order": 5, "status": "active", "createdAt": "<SERVER_TIMESTAMP>", "updatedAt": "<SERVER_TIMESTAMP>" }
]
```

`order`는 `kind`별로 각각 0부터 시작한다(전체 통합 순번이 아니다).

### 7.2 첫 관리자 계정 부트스트랩

`setUserRole` 콜러블은 호출자가 이미 `admin`이어야 하므로, **최초의 admin은 콜러블로 만들 수 없다**(닭과 달걀 문제). 아래 방법으로 예외적으로 1회만 부트스트랩한다.

**결정: 로컬 스크립트 + Firebase Admin SDK 서비스 계정 키로 직접 처리한다.**

1. 대상 사용자가 먼저 일반 가입 절차(Auth 계정 생성)를 완료한다.
2. 운영자가 로컬에서 서비스 계정 키(`GOOGLE_APPLICATION_CREDENTIALS`)를 사용하는 1회성 스크립트를 실행한다. 스크립트 경로 제안: `scripts/bootstrap-admin.ts`(V1 코드베이스에 아직 없음, 신규 작성 필요 — **OPEN-07**).
3. 스크립트가 하는 일 (정확히 이 순서):
   - `admin.auth().setCustomUserClaims(uid, { role: "admin" })` — 권위(claim) 설정.
   - `admin.firestore().doc("users/" + uid).set({ role: "admin", status: "active", ... }, { merge: true })` — 미러 갱신.
   - `admin.firestore().collection("adminLogs").add({ actorUid: uid, actorRole: "admin", action: "bootstrapAdmin", targetType: "user", targetId: uid, createdAt: FieldValue.serverTimestamp() })` — 부트스트랩도 감사 로그에 남긴다(콜러블을 거치지 않은 예외 상황임을 명시하기 위해 `action` 값을 `"bootstrapAdmin"`으로 구분).
4. 대상 사용자는 다음 로그인(또는 `getIdToken(true)` 강제 리프레시) 시 admin 권한을 획득한다.
5. 이후 두 번째 이후의 admin/moderator 임명은 전부 `setUserRole` 콜러블(첫 admin이 호출)로 처리하며, 이 부트스트랩 절차를 다시 쓰지 않는다.

---

## 8. 데이터 보존·삭제 정책 표

| 엔터티 | 사용자 탈퇴(`withdrawn`) 시 | 사용자 정지(`suspended`) 시 | 관리자 삭제 시 |
|---|---|---|---|
| User | `status: "withdrawn"`로 전이, 문서는 영구 보존(감사 추적을 위해 물리 삭제 안 함) | `status: "suspended"` + `suspendedAt`/`suspendedReason` 기록 | 해당 없음(User는 `suspendUser`/`restoreUser`만 있고 삭제 콜러블 없음) |
| UserProfile | `displayName`을 `"탈퇴한 회원"`으로, `photoUrl`을 제거, `bio`/`links`/`skillTags`를 빈 값으로 스크럽(문서 자체는 유지 — 기존 게시글의 `authorUid` 참조가 깨지지 않도록) | 변경 없음(정지는 표시 정보에 영향 없음, 정지 배지는 UI에서 `User.status`를 따로 조회해 표시) | 해당 없음 |
| MembershipApplication | 변경 없음(영구 보존) | 변경 없음 | 해당 없음(삭제 콜러블 없음) |
| Post | 유지하되 `authorDisplayName`을 `"탈퇴한 회원"`로 즉시 갱신하지는 않는다(5절 정책과 동일하게 표시 시점 보정 — `profiles`가 스크럽되어 있으므로 자연히 "탈퇴한 회원"으로 보인다). `status`는 변경하지 않는다(글 자체는 남는다) | 신규 작성만 차단(Rules: `status=="active"`가 아니면 create 거부), 기존 글은 유지 | `moderatePost`로 `status: "hidden"` 전이(소프트) |
| Material | Post와 동일 | Post와 동일 | `setMaterialStatus`로 `status: "archived"` 전이 |
| Comment | Post와 동일(내용 유지, 저자 표시만 자연 스크럽) | 신규 작성 차단, 기존 유지 | `deleteCommentByModerator`로 `status: "deleted"` 전이 |
| Reaction | 물리적으로 유지(카운터 정합성을 위해 삭제하지 않는다 — 탈퇴했다고 "좋아요 취소"가 되는 것은 원래 행위의 의미와 다르다) | 변경 없음 | 해당 없음 |
| Bookmark | 유지(본인만 보이므로 노출 문제 없음) | 변경 없음 | 해당 없음 |
| Category | 영향 없음 | 영향 없음 | admin이 `status: "archived"` 직접 설정 |
| CategoryRequest | 유지(영구 보존) | 유지 | 해당 없음 |
| Report | 유지(영구 보존, 신고 이력) | 유지 | 해당 없음 |
| Notification | 유지(본인만 보이던 것이 탈퇴 후에도 조회는 가능하나 UI 진입 경로가 사라짐 — 별도 정리 배치 없음, V1 비목표) | 유지 | 해당 없음 |
| AdminLog | 영향 없음(불변) | 영향 없음 | 삭제 불가 |
| ModerationAction | 영향 없음(불변) | 영향 없음 | 삭제 불가 |

Storage(`uploads/{uid}/{yyyyMM}/{fileId}.{ext}`)의 파일 삭제 연쇄(게시글/자료 삭제 시 첨부 이미지를 Storage에서도 지울지)는 **OPEN-09**로 남긴다.

---

## 9. 쿼리 카탈로그

모든 쿼리는 Firebase JS SDK(모듈러) 기준. `db`는 `getFirestore()` 인스턴스.

**Q1. 커뮤니티 통합 최신글** (`/community`)
```ts
query(
  collection(db, "posts"),
  where("status", "==", "published"),
  orderBy("isPinned", "desc"),
  orderBy("createdAt", "desc"),
  limit(20),
)
```
인덱스: `posts (status ASC, isPinned DESC, createdAt DESC)`

**Q2. 카테고리별 목록** (`/community?category=slug`)
```ts
query(
  collection(db, "posts"),
  where("status", "==", "published"),
  where("category", "==", categorySlug),
  orderBy("createdAt", "desc"),
  limit(20),
)
```
인덱스: `posts (status ASC, category ASC, createdAt DESC)`

**Q3. 내 글** (`/me/posts`)
```ts
query(
  collection(db, "posts"),
  where("authorUid", "==", uid),
  orderBy("createdAt", "desc"),
  limit(20),
)
```
인덱스: `posts (authorUid ASC, createdAt DESC)` (status 필터 없이 본인은 hidden/deleted도 봐야 하므로 status 조건을 걸지 않는다)

**Q4. 내 댓글** (`/me/comments`)
```ts
query(
  collection(db, "comments"),
  where("authorUid", "==", uid),
  orderBy("createdAt", "desc"),
  limit(20),
)
```
인덱스: `comments (authorUid ASC, createdAt DESC)`

**Q5. 내 북마크** (`/me/bookmarks`)
```ts
query(
  collection(db, "bookmarks"),
  where("uid", "==", uid),
  orderBy("createdAt", "desc"),
  limit(20),
)
```
인덱스: `bookmarks (uid ASC, createdAt DESC)`

**Q6. 내 좋아요** (`/me/likes`)
```ts
query(
  collection(db, "reactions"),
  where("uid", "==", uid),
  orderBy("createdAt", "desc"),
  limit(20),
)
```
인덱스: `reactions (uid ASC, createdAt DESC)`

**Q7. 자료 목록(status 필터, 공개용 기본값)** (`/materials`)
```ts
query(
  collection(db, "materials"),
  where("status", "in", ["community", "official"]),
  where("category", "==", categorySlug),
  orderBy("createdAt", "desc"),
  limit(20),
)
```
인덱스: `materials (status ASC, category ASC, createdAt DESC)`

**Q8. 공식 자료만** (`/materials?status=official`)
```ts
query(
  collection(db, "materials"),
  where("status", "==", "official"),
  orderBy("createdAt", "desc"),
  limit(20),
)
```
인덱스: `materials (status ASC, createdAt DESC)`

**Q9. 검토 대기 자료(관리자)** (`/admin/materials`)
```ts
query(
  collection(db, "materials"),
  where("status", "==", "pending_review"),
  orderBy("createdAt", "asc"),
  limit(50),
)
```
인덱스: `materials (status ASC, createdAt ASC)` (오래된 순으로 처리 — 대기열 FIFO)

**Q10. 알림 미읽음** (`/me/notifications`)
```ts
query(
  collection(db, "notifications", uid, "items"),
  where("readAt", "==", null),
  orderBy("createdAt", "desc"),
  limit(30),
)
```
비고: Firestore는 필드 부재와 `null`을 다르게 다룬다. `readAt`을 아예 쓰지 않는 것(1.3절 원칙)과 이 쿼리를 맞추려면 `where("readAt", "==", null)` 대신 **`orderBy("readAt")`가 필드 부재 문서를 정렬 결과에서 제외**하는 Firestore 특성을 피해야 한다. 결정: 이 쿼리는 `readAt` 필드에 인덱스를 걸지 않고, 대신 최근 30건을 가져온 뒤 **클라이언트에서 `readAt === undefined`로 필터링**한다.
```ts
query(collection(db, "notifications", uid, "items"), orderBy("createdAt", "desc"), limit(30))
// then: docs.filter(d => d.data().readAt === undefined)
```
인덱스: `notifications/{uid}/items (createdAt DESC)` (서브컬렉션 단일 필드 인덱스는 자동 생성됨).

**Q11. 신고 목록(관리자)** (`/admin/reports`)
```ts
query(
  collection(db, "reports"),
  where("status", "==", "open"),
  orderBy("createdAt", "desc"),
  limit(50),
)
```
인덱스: `reports (status ASC, createdAt DESC)`

**Q12. 회원 승인 대기 목록(관리자)** (`/admin/members`)
```ts
query(
  collection(db, "membershipApplications"),
  where("status", "in", ["submitted", "resubmitted"]),
  orderBy("createdAt", "asc"),
  limit(50),
)
```
인덱스: `membershipApplications (status ASC, createdAt ASC)`

**Q13. 게시글 상세 댓글 목록** (`/community/post?id=...`)
```ts
query(
  collection(db, "comments"),
  where("targetType", "==", "post"),
  where("targetId", "==", postId),
  where("status", "==", "published"),
  orderBy("createdAt", "asc"),
  limit(100),
)
```
인덱스: `comments (targetType ASC, targetId ASC, status ASC, createdAt ASC)`

**Q14. 자료 상세 댓글 목록** (`/materials/item?id=...`) — Q13과 동일 인덱스, `targetType == "material"`.

**Q15. 활성 카테고리 목록(작성 폼 드롭다운)** (`/community/write`, `/materials/new`)
```ts
query(
  collection(db, "categories"),
  where("kind", "==", "community"),
  where("status", "==", "active"),
  orderBy("order", "asc"),
)
```
인덱스: `categories (kind ASC, status ASC, order ASC)`

**Q16. 카테고리 신청 대기 목록(관리자)** (`/admin/categories`)
```ts
query(
  collection(db, "categoryRequests"),
  where("status", "==", "submitted"),
  orderBy("createdAt", "asc"),
  limit(50),
)
```
인덱스: `categoryRequests (status ASC, createdAt ASC)`

**Q17. 관리자 활동 로그** (`/admin/logs`)
```ts
query(collection(db, "adminLogs"), orderBy("createdAt", "desc"), limit(50))
// 특정 대상 이력만 볼 때:
query(
  collection(db, "adminLogs"),
  where("targetType", "==", targetType),
  where("targetId", "==", targetId),
  orderBy("createdAt", "desc"),
)
```
인덱스: `adminLogs (createdAt DESC)`(자동), `adminLogs (targetType ASC, targetId ASC, createdAt DESC)`

**Q18. 작성자 표시 정보 배치 보정** (5절 denormalize 정책 실행부, 모든 목록 화면 공통)
```ts
import { documentId, query, collection, where, getDocs } from "firebase/firestore"

async function fetchLatestProfiles(uids: string[]) {
  const unique = Array.from(new Set(uids)).slice(0, 10) // Firestore `in` 최대 10개
  if (unique.length === 0) return new Map()
  const snap = await getDocs(
    query(collection(db, "profiles"), where(documentId(), "in", unique)),
  )
  return new Map(snap.docs.map((d) => [d.id, d.data()]))
}
```
인덱스: 불필요(`documentId() in [...]`는 단일 컬렉션 문서 ID 조회로 자동 처리됨).

**Q19. 회원 공개 프로필** (`/members/*` rewrite 대상, `/members` 셸)
```ts
getDoc(doc(db, "profiles", uid))
```
인덱스: 불필요(단일 문서 get).

---

## 10. 미결정 사항

| ID | 내용 | 임시 처리 |
|---|---|---|
| ~~OPEN-01~~ | **해소됨 → [11 결정 로그 D-017](./11-DECISION-LOG.md).** Opus가 멱등 콜러블 `bootstrapUserAccount`를 CANON H절에 추가 확정(콜러블 9개 → 10개). Auth 블로킹 함수(Identity Platform 필요)와 gen1 `onCreate`(비동기 경쟁 조건)는 기각. | `users/{uid}` 생성 경로가 확정되었다. 4.1절 참조 |
| OPEN-02 | `categories` 문서의 admin 직접 필드 수정(콜러블 미경유)이 `adminLogs`에 자동 기록되지 않는다 — 전용 콜러블을 신설할지, Firestore 트리거로 감사 로그를 붙일지 결정 필요 | 현재는 감사 로그 없이 진행, 필요 시 별도 트리거 추가 |
| OPEN-03 | `posts.category`/`materials.category`(문자열 슬러그)가 실제 `categories` 문서의 존재·`active` 상태를 참조 시점에 강제 검증하지 않는다(약한 참조) — Security Rules 또는 콜러블 단에서 `get()` 검증을 추가할지 결정 필요 | V1은 미검증(존재하지 않는 슬러그를 입력해도 쓰기 자체는 막지 않음) |
| ~~OPEN-04~~ **해소** | ~~`Report`의 동일 사용자·동일 대상 중복 신고를 막을지~~ → [D-018](./11-DECISION-LOG.md)로 확정: **결정론적 ID `{targetType}__{targetId}__{reporterUid}`를 채택해 Rules만으로 차단한다.** 2.11절 참조 | — |
| OPEN-05a | `reaction_received` `NotificationType`을 실제로 생성하는 트리거가 카운터 갱신용 `onReactionWritten`과 같은 함수인지, 별도 함수인지 CANON H절에 명시 없음 | 구현 시 `onReactionWritten` 확장으로 잠정 처리 |
| OPEN-05b | `admin_notice` `NotificationType`을 생성하는 콜러블이 CANON H절에 없음(공지 발송 경로 부재) | 미구현, `/admin/notices`는 `isPinned` 게시글 목록으로 대체 운용 |
| OPEN-06 | 4.2절 `recomputeEngagementCounters` 함수가 CANON H절 목록 밖의 신규 함수 — 정식 편입 여부 Opus 승인 필요 | 스펙만 확정, 구현 여부는 별도 승인 후 |
| OPEN-07 | `scripts/bootstrap-admin.ts` 최초 관리자 부트스트랩 스크립트가 아직 코드베이스에 없음(신규 작성 필요) | 7.2절 스펙대로 구현 예정 |
| OPEN-08 | Material의 상태 전이 권한(어떤 role이 어떤 `status → status`를 수행 가능한지)을 Firestore Security Rules 코드로 정확히 어떻게 표현할지는 `./06-SECURITY-RULES.md`에서 상세화 필요 — 이 문서는 상태값과 허용된 전이 "방향"만 정의 | 2.5절의 전이 표를 Rules 작성의 입력으로 사용 |
| OPEN-09 | 해소됨 → [11 D-025](./11-DECISION-LOG.md). Firebase Storage 미사용. `mediaAssets` 컬렉션으로 대체. V1 자동 정리 미구현 → 관리자 수동 정리 절차 문서화(§2.16) |

---

*이 문서는 `docs/community-platform/05-DATA-MODEL-SSOT.md`이며, 변경 시 이 파일만 수정한다. 다른 문서에서 데이터 모델을 언급할 때는 이 문서를 상대 경로로 링크한다.*


