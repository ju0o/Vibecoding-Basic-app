# 08. 구현 로드맵 — 커뮤니티 플랫폼 V1 (Phase 0~10)

## 0. 문서 목적

이 문서는 AI_VIBE_CODING_MASTER에 커뮤니티 플랫폼(인증·회원·게시글·자료·댓글·알림·관리자)을 추가하기 위한
Phase 0~10 실행 계획이다. Goose(또는 동등한 구현 에이전트)가 이 문서 하나만 보고 Phase 단위로 작업에
착수할 수 있도록, Phase마다 목표·선행조건·변경/신규 파일·데이터 변경·Firebase 콘솔 수동 설정·완료
조건·테스트·롤백·리스크·다음 Phase 진입 조건을 명시한다.

이 문서의 모든 아키텍처 전제는 `CANON`(Opus 확정 정본)을 따른다. 이름·경로·enum·역할·라우트를
이 문서에서 새로 만들지 않았으며, CANON에 없는 결정이 필요한 지점은 `OPEN-nn`으로 표시했다.

### 관련 문서

현재: `docs/community-platform/` 디렉터리에는 이 문서(`08-IMPLEMENTATION-ROADMAP.md`) 외 파일이
없다. 아래는 CANON이 전제하는 문서 체계(예: CANON 본문의 `./05-DATA-MODEL-SSOT.md` 참조 표기)에
따라 이후 작성이 필요한 동반 문서다. 목표 파일명이며, 실제 작성 여부·순서는 이 로드맵의 범위 밖이다.

| 문서 번호 | 예상 파일명 | 다루는 내용(CANON 절 대응) |
|---|---|---|
| 00 | `00-OVERVIEW.md` | 프로젝트 배경, D-001~D-010 요약 |
| 01 | `01-ARCHITECTURE-DECISIONS.md` | CANON B절 D-001~D-010 상세 근거 |
| 02 | `02-ROLES-PERMISSIONS.md` | CANON C절 역할 6종, 권한 매트릭스 |
| 03 | `03-ROUTES.md` | CANON F절 라우트 정본 상세 |
| 04 | `04-SECURITY-RULES.md` | firestore.rules / storage.rules 전문 |
| 05 | `05-DATA-MODEL-SSOT.md` | CANON D·E절 컬렉션 스키마, 필드 타입 |
| 06 | `06-CLOUD-FUNCTIONS.md` | CANON H절 callable/트리거 함수 시그니처 |
| 07 | `07-UI-COMPONENT-INVENTORY.md` | 화면별 컴포넌트 트리 |
| 08 | `08-IMPLEMENTATION-ROADMAP.md` | 이 문서 |

---

## 1. Phase 전체 개요

| Phase | 목표 | 주요 산출물 | 선행 | 예상 규모(파일 수) |
|---|---|---|---|---|
| 0 | 기준선 보호 + 로컬 개발 환경 준비 | 브랜치, `.env.example`, 에뮬레이터, rules/indexes placeholder | 없음 | 6 |
| 1 | Firebase SDK 도입 | 클라이언트 초기화 모듈, Functions 프로젝트 뼈대, rules 뼈대 | Phase 0 | 9 |
| 2 | 인증 | AuthProvider, 로그인/회원가입/로그아웃, 이메일 인증 | Phase 1 | 12 |
| 3 | 회원 승인·프로필 | profiles, membershipApplications, 승인 UI, custom claims | Phase 2 | 16 |
| 4 | 커뮤니티 게시글 | posts CRUD, 카테고리 시드, 셸 라우트 + rewrites | Phase 3 | 15 |
| 4A | ImageKit + Cloudflare Worker | ImageKit 클라이언트 설정, Cloudflare Worker 프로젝트, mediaAssets Rules, 업로드 UI, 이미지 전처리 | Phase 3 | 10 |
| 5 | 댓글·좋아요·북마크 | comments/reactions/bookmarks, 카운터 트리거 | Phase 4 | 13 |
| 6 | 교육자료 | materials 상태 워크플로, Storage 업로드, 검토 큐 | Phase 5 | 20 |
| 7 | 카테고리 신청 | categoryRequests, 관리자 승인 | Phase 6 | 10 |
| 8 | 신고·관리자 운영 | reports, moderationActions, adminLogs, 관리자 대시보드 | Phase 7 | 19 |
| 9 | 알림·활동 내역 | notifications, /me/* 화면 | Phase 8 | 18 |
| 10 | 콘텐츠 연결 + 통합 QA + 배포 | linkedRefs, 강의 페이지 통합, 회귀 테스트, 배포 | Phase 9 | 6 |

합계(신규+변경, 중복 제거 전 단순합): 144. 실제 배포 시 Phase 순서를 건너뛰지 않는다 — 각 Phase는
직전 Phase의 완료 조건을 전제로 한다(예외는 6절 "병렬 가능 구간" 참조).

---

## 2. 기존 교육 기능 회귀 방지 계획 (모든 Phase 공통 적용)

현재: 52개 페이지 라우트, Firestore/Auth/Storage 미사용, 진행률은 `src/lib/progress.ts` +
`src/features/progress/LearningStateProvider.tsx`가 `localStorage` 키 `ai-vibe-coding-master-learning-state`
하나로 전담. `output: "export"` 정적 내보내기, 검증 파이프라인은 `npm run verify`
(`lint → typecheck → test → build`), 테스트는 Vitest 11개 파일.

모든 Phase는 산출물을 커밋하기 전에 아래 6개 항목을 **전부** 통과해야 한다.

| # | 체크 | 명령/절차 | 통과 기준 |
|---|---|---|---|
| R1 | 린트 | `npm run lint` | 에러 0건 |
| R2 | 타입체크 | `npm run typecheck` | 에러 0건 |
| R3 | 유닛 테스트 | `npm run test` | 기존 11개 테스트 파일 전부 pass(신규 테스트는 추가만, 삭제 없음) |
| R4 | 정적 빌드 | `npm run build` | 성공, 빌드 로그 "Route (app)" 표에 CANON 52개 기존 경로가 전부 남아 있음(동적 세그먼트 `[slug]`,`[nodeId]`,`[unitId]`,`[conceptId]`,`[id]`,`[file]` 포함) |
| R5 | 정적 산출물 | `out/` 디렉터리 확인 | 기존 52개 경로 각각에 대응하는 `.html`이 존재(예: `out/lessons/day-1.html`, `out/learn/vibe-coding-foundation/day-1.html`) — 신규 라우트가 기존 라우트를 덮어쓰거나 제거하지 않았는지 확인 |
| R6 | localStorage 진행률 | 브라우저 devtools → Application → Local Storage에서 `ai-vibe-coding-master-learning-state` 키 확인 | 키 이름·JSON 스키마(`completedLessons`,`checklistItems`,`bookmarks`,`lastReadLessonSlug`,`lastReadAt`)가 Phase 진행 전후 동일. Firebase 인증 로그인/로그아웃을 반복해도 이 키의 읽기/쓰기 로직(`LearningStateProvider.tsx`)이 변경되지 않았는지 diff로 확인 |

각 Phase의 "테스트" 절에서는 이 표를 "표준 회귀 체크(R1~R6)"로 지칭하고 Phase 고유 테스트만 추가로
기술한다.

---

## 3. localStorage 진행률 → 계정 동기화 전략

**결정: V1(Phase 0~10)에서는 하지 않는다.**

근거:
1. CANON D-010이 V1 범위를 Phase 0~10으로 확정했고, CANON F(라우트)·D(Firestore 경로)·H(Functions)
   어디에도 학습 진행률을 서버로 동기화하는 라우트·컬렉션·함수가 없다. `/me/*` 라우트는
   `posts/comments/bookmarks/likes/notifications/activity/settings`만 정의되어 있고 진행률 전용
   경로가 없다.
2. `LearningStateProvider`(진행률)와 `AuthProvider`(Phase 2에서 신설)는 설계상 서로 다른 시스템이다.
   진행률은 콘텐츠 소비 상태, 커뮤니티 인증은 참여 자격이며 CANON은 이 둘을 연결하는 어떤 결정도
   내리지 않았다.
3. 동기화를 하려면 최소한 (a) 신규 Firestore 경로(예: `progress/{uid}`)와 필드 스키마, (b) 로컬
   상태와 서버 상태 충돌 시 병합 규칙(마지막 쓰기 우선인지 합집합인지), (c) 비로그인→로그인 전환 시
   1회성 마이그레이션 로직, (d) 오프라인 우선 캐시 전략이 필요하다. 이 넷 다 CANON에 없다.

나중에 하려면 필요한 것(다음 스코프로 미룸, 이 로드맵의 Phase가 아님):
- CANON 개정: `progress/{uid}` 같은 신규 Firestore 경로와 필드 스키마를 D·E절에 추가하는 별도 승인.
- 병합 전략 결정(마지막 쓰기 우선 vs 합집합) — 특히 `checklistItems`처럼 배열이 아닌
  `Record<lessonSlug, string[]>` 구조는 단순 병합이 어렵다.
- `LearningStateProvider.tsx`에 Firestore 리스너/쓰기 훅 추가 및 네트워크 실패 시 localStorage
  폴백 전략.
- 별도 Phase(예: Phase 11)로 정식 편입 후 이 로드맵과 동일한 형식(11개 항목)으로 계획 작성.

이 결정에 따라 Phase 0~10 전체 기간 동안 `LearningStateProvider.tsx`는 **읽기 전용으로도 수정하지
않는다** — 표준 회귀 체크 R6이 모든 Phase에서 "변경 없음"을 검증하는 이유다.

---

## 4. 의존성 그래프

```
Phase 0 (기준선/에뮬레이터)
   |
Phase 1 (Firebase SDK/Functions 뼈대)
   |
Phase 2 (인증) ---------------------------+
   |                                      |
Phase 3 (회원 승인/프로필, custom claims)   |  AdminGuard, functions — 원 9개 + `bootstrapUserAccount`([11 D-017](./11-DECISION-LOG.md)) — + 트리거 6개, CANON H절)이 모두 배포
   상태인지 최종 대조.

### 완료 조건
- [ ] 레슨 페이지 하단에 연결된 게시글/자료가 있으면 노출, 없으면 섹션 자체가 숨겨짐(빈 상태 UI 없음)
- [ ] `npm run build` 성공, `out/` 디렉터리에 기존 52개 + 신규 정적 라우트(`/community`, `/materials`,
      `/login`, `/signup`, `/onboarding/profile`, `/membership/pending`, `/me`, `/me/*` 7개,
      `/admin`, `/admin/*` 7개 등 CANON F절 신규 라우트 전부)가 존재
- [ ] sitemap.xml에 신규 공개 정적 라우트가 포함되고, `/community/post`·`/materials/item`·`/members`
      같은 파라미터 없는 셸 라우트는 포함하되 실제 문서 ID가 붙은 동적 URL은 포함하지 않음
- [ ] 프로덕션 배포 후 `https://ju0o-ec967.web.app/community`, `/materials`, `/login` 실접속 확인
- [ ] 프로덕션에서 CANON H절 callable 10개(`bootstrapUserAccount` 포함) + 트리거 6개 전부 "정상" 상태
- [ ] 표준 회귀 체크 R1~R6 전부 통과(빌드 성공, 52개 기존 라우트 존재, 11개 테스트 통과, localStorage
      진행률 스키마 불변)

### 테스트
```
npm run verify
npx firebase deploy --project ju0o-ec967
# 프로덕션 URL에서 기존 레슨 페이지 1개 + 신규 커뮤니티 페이지 1개 수동 접속 확인
```

### 롤백 기준
- 프로덕션 배포 후 기존 52개 라우트 중 하나라도 접속 불가(404/500)
- 프로덕션 Firestore Rules 배포가 로컬 검증과 다르게 동작(에뮬레이터-프로덕션 불일치)

### 롤백 절차
`firebase hosting:rollback`으로 직전 릴리스로 즉시 되돌린다(Firebase Hosting은 릴리스 이력을 보관하므로
코드 롤백 없이 인프라 레벨에서 즉시 복구 가능). Firestore Rules는 콘솔의 규칙 변경 이력에서 이전
버전으로 되돌린다. 이후 로컬에서 원인 분석 후 재배포.

### 리스크
| 리스크 | 완화 |
|---|---|
| `linkedRefs` 구조가 CANON과 충돌 가능 | [D-020](./11-DECISION-LOG.md)으로 05 정본에 편입해 **해소**. 향후 연결 대상 3종을 넘으면 enum 확장으로 대응 |
| sitemap 생성 스크립트가 신규 라우트를 자동 인식하지 못해 누락 | `generate-sitemap.mjs` 수정 시 신규 라우트 목록을 CANON F절 전체 표에서 그대로 복사해 수기 대조 |
| 프로덕션 배포 직후 트래픽 급증으로 Firestore 읽기 비용 예상 초과 | V1 트래픽 규모가 CANON에 명시되지 않아 사전 예산 산정 불가 — `OPEN-08`로 기록, 배포 후 1주일 콘솔 사용량 모니터링을 운영 절차로 권고(코드 조치 아님) |

### 다음 Phase 진입 조건
없음(V1 최종 Phase). 완료 조건 전부 충족 시 CANON D-010 범위의 V1 구현이 종료된다.

---

## 6. 전체 리스크 등록부

| 리스크 | 확률 | 영향 | 완화 | 담당 Phase |
|---|---|---|---|---|
| 최초 admin 부여가 수동·비재현 절차 | 중 | 높음(운영 재현성) | 절차를 운영 문서에 명시적으로 기록(이 로드맵 범위 밖) | Phase 3 |
| custom claim 갱신 지연으로 UI-권한 불일치 | 중 | 중 | `getIdToken(true)` 강제 리프레시, 승인 후 재로그인 안내 | Phase 3, 9 |
| Firestore/Storage 리전 불일치(기존 프로젝트가 이미 다른 리전으로 생성됐을 가능성) | 낮음(미확인) | 높음(리전 변경은 재생성 필요) | Phase 1 착수 전 콘솔에서 리전 사전 확인 | Phase 1 |
| Hosting rewrite 배포 순서 오류(셸 HTML 미존재 상태에서 rewrite 먼저 배포) | 중 | 중 | `npm run build` 이후에만 hosting 배포 | Phase 4, 6, 9 |
| Firestore 복합 색인 생성 지연 중 쿼리 실패 | 중 | 낮음 | 색인 배포 후 몇 분 대기, 관리자 우선 확인 | Phase 4 |
| 댓글 신고(TargetType에 comment 없음) 미정의 | 확정(사실) | 낮음(V1 범위 밖으로 처리) | `OPEN-05`, V1은 관리자 직접 삭제만 지원 | Phase 8 |
| 공지 전용 컬렉션 부재 | 확정(사실) | 낮음 | `OPEN-06`, `posts` 재사용 | Phase 8 |
| Storage 업로드 크기 제한 기준(5MB) 미확정 | 확정(사실) | 낮음 | `OPEN-03`, 기본값 5MB로 진행 | Phase 6 |
| `linkedRefs` 필드가 CANON 미정의 | 해소(D-020) | 낮음 | [11 D-020](./11-DECISION-LOG.md)으로 05 정본 편입 | Phase 10 |
| 프로덕션 배포 후 Firestore 읽기 비용 미산정 | 확정(사실) | 중(비용) | `OPEN-08`, 배포 후 사용량 모니터링 | Phase 10 |
| 1인 운영으로 Phase 8(관리자 대시보드, 신규 파일 19개)에 작업 집중 | 중 | 중(일정) | 5절 "병렬 가능 구간"에서 화면 단위 분담 제시 | Phase 8 |
| `LearningStateProvider`(진행률)가 실수로 Phase 2~10 중 수정됨 | 낮음 | 높음(기존 사용자 진행률 손실) | 표준 회귀 체크 R6을 모든 Phase 완료 조건에 강제 포함 | 전체 |

---

## 7. 미결정 사항

| ID | 내용 | 영향 Phase | 기본 진행 방향(이 로드맵 채택) |
|---|---|---|---|
| OPEN-01 | Firestore/Storage 리전이 이미 `asia-northeast3`가 아닌 리전으로 생성되어 있을 가능성 | Phase 1 | Phase 1 착수 전 콘솔에서 리전 확인, 불일치 시 프로젝트 재구성 여부를 별도 결정 |
| OPEN-02 | 최초 admin 계정 부여를 위한 1회성 스크립트/절차를 어디에 문서화할지(CANON에 전용 파일명 없음) | Phase 3 | 저장소에 스크립트를 남기지 않고 운영 절차 문서(향후 `01-ARCHITECTURE-DECISIONS.md` 또는 별도 운영 가이드)에 기록 |
| OPEN-03 | 해소됨 → [11 D-025](./11-DECISION-LOG.md). 5MB ImageKit 제한 적용. | Phase 6 | 해소 |
| OPEN-04 | 카테고리 신청 남발 방지를 위한 rate limit 정책 | Phase 7 | V1에서는 미적용(CANON D-010 비목표 목록에 없지만 별도 언급도 없음) |
| OPEN-05 | 댓글(comment) 신고 지원 여부와 `TargetType` enum 확장 필요성 | Phase 8 | V1에서는 댓글 신고 미지원, 관리자가 `deleteCommentByModerator`로 직접 삭제하는 경로만 제공 |
| ~~OPEN-06~~ | **해소됨 → [11 D-024](./11-DECISION-LOG.md).** `posts.isPinned`로 확정. `/admin/posts`에서 admin이 토글, 커뮤니티 목록이 상단 고정. `isNotice` 플래그는 신설하지 않음 | Phase 8 | 05 §2.4, 10 AT-115 |
| ~~OPEN-07~~ | **해소됨 → [11 D-020](./11-DECISION-LOG.md).** `linkedRefs`를 `Array<{type, id}>`(최대 5개)로 확정하고 [05 §2](./05-DATA-MODEL-SSOT.md) Post·Material 필드 표에 정식 편입 | Phase 10 | 05 §2의 `linkedRefs` 배열 사용(`array-contains` 완전 일치 조회) |
| OPEN-08 | V1 예상 트래픽 규모 및 Firestore 읽기 비용 산정 | Phase 10 | 사전 산정 없이 진행, 배포 후 1주일 콘솔 사용량 모니터링을 운영 절차로 권고 |
| OPEN-09 | localStorage 진행률의 계정 동기화(3절 결정)를 정식 Phase로 편입할 시점 | V1 이후 | 이 로드맵 범위 밖. 별도 CANON 개정 후 신규 Phase 문서 작성 |
