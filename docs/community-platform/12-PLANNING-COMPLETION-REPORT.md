# 12. 기획 완료 보고 (Planning Completion Report)

## 1. 개요

본 문서는 `docs/community-platform/` 13종 계획 문서 세트의 **최종 완료 보고**다. 목표는 "AI와
바이브코딩을 배우고, 찾고, 공유하고, 함께 만드는 지식 커뮤니티" 전환 계획의 확정을 선언하고,
계획 단계에서 남은 개방 질문(OPEN)을 한 곳에 모아 후속 작업이 문서를 횡단하며 헤매지 않게 하는
것이다.

**이 문서의 두 가지 고유 역할**:

1. **전역 OPEN 등록부**(§7) — 9개 문서(02·03·04·05·06·07·08·09·10)가 각자 `OPEN-01`부터 독립적으로
   번호를 매겨 **동일한 "OPEN-01"이 8가지 의미로 쓰이는 네임스페이스 충돌**이 있었다. 각 문서의 번호를
   그대로 유지한 채, 이 문서가 전역 ID(`G-O3-01` 등)를 부여해 무모순 참조를 가능하게 한다.
2. **기획 완료 판정**(§10) — 지시서 §15 형식의 최종 판정(`PLANNING_GO` / `PLANNING_PARTIAL` /
   `PLANNING_BLOCKED`)을 내린다.

## 2. 작업 베이스라인 (지시서 §4 준수)

| 항목 | 값 |
|---|---|
| 절대 경로 | `D:\ai_vibe_coding_master` |
| 브랜치 | `master` |
| HEAD | `272b2b175efefd4658c125788fa2cde3712a67fd` |
| 작업 범위 | `docs/community-platform/` 아래 **신규 문서 작성·기존 계획 문서 수정만**. 기존 미커밋 변경은 일절 손대지 않음 |
| 소스코드 변경 | **없음** — 아래 §10.2의 `git status --short` 재검증 참조 |
| 생성 파일 | `docs/community-platform/` 13종 전부(아래 §3) |

## 3. 문서 인벤토리

| # | 문서 | 상태 | 비고 |
|---|---|---|---|
| 00 | [00-CURRENT-STATE-AUDIT.md](./00-CURRENT-STATE-AUDIT.md) | 확정 | 라우트 52개 실측, 문서 드리프트 기록 |
| 01 | [01-PRODUCT-PRD.md](./01-PRODUCT-PRD.md) | 확정 | FR 56건(Must 38 / Should 13 / Could 3), MoSCoW |
| 02 | [02-INFORMATION-ARCHITECTURE.md](./02-INFORMATION-ARCHITECTURE.md) | 확정 | 정보 구조, 라우트 정본 |
| 03 | [03-USER-FLOWS-AND-PERMISSIONS.md](./03-USER-FLOWS-AND-PERMISSIONS.md) | 확정 | 사용자 흐름·권한 |
| 04 | [04-TECHNICAL-ARCHITECTURE.md](./04-TECHNICAL-ARCHITECTURE.md) | 확정 | 기술 아키텍처, D-002 정적 셸+rewrites |
| 05 | [05-DATA-MODEL-SSOT.md](./05-DATA-MODEL-SSOT.md) | **확정·정본** | 필드명·제약·enum의 단일 정본(D-019). 이번 세션에서 D-020(`linkedRefs`)·D-021(`sourceType`)·D-022(탈퇴 익명화) 반영 |
| 06 | [06-SECURITY-AND-MODERATION-SSOT.md](./06-SECURITY-AND-MODERATION-SSOT.md) | **확정·정본** | Security Rules·모더레이션 정본. 이번 세션에서 D-019 필드명 정렬(16건)·D-020/D-021 규칙·D-022 §13.2 전제 교체 |
| 07 | [07-CONTENT-GOVERNANCE-SSOT.md](./07-CONTENT-GOVERNANCE-SSOT.md) | 확정 | 콘텐츠 거버넌스. 이번 세션에서 필드명 정렬 |
| 08 | [08-IMPLEMENTATION-ROADMAP.md](./08-IMPLEMENTATION-ROADMAP.md) | 확정 | Phase 0~10 로드맵. 이번 세션에서 OPEN-06(D-024)·OPEN-07(D-020) 해소 |
| 09 | [09-GOOSE-IMPLEMENTATION-PACKETS.md](./09-GOOSE-IMPLEMENTATION-PACKETS.md) | 확정 | 구현 패킷. 이번 세션에서 필드명 정렬, OPEN-01(D-017)·02(D-023)·03(D-024) 해소, GOOSE-06에 D-020/D-021 반영 |
| 10 | [10-ACCEPTANCE-TEST-PLAN.md](./10-ACCEPTANCE-TEST-PLAN.md) | 확정 | 인수 테스트 120건(AT-001~120). 이번 세션에서 §3.23(AT-098~101)·§3.24(AT-102~120)·§3.25(FR↔AT 매트릭스)·§5.3(D-019 필드명 정합성) 신설 |
| 11 | [11-DECISION-LOG.md](./11-DECISION-LOG.md) | 확정 | 결정 로그 D-001~D-024. 이번 세션에서 D-018~D-024 추가 |
| **12** | **본 문서** | 확정 | 기획 완료 보고 |

## 4. 모델별 작업 요약 (지시서 §5 준수)

| 모델 | 담당 | 산출물 |
|---|---|---|
| Opus | 제품 정체성·PRD 핵심 결정·사용자/권한 모델·아키텍처 결정·SSOT 구조·보안/운영 리스크·충돌 해소·최종 독립 검토·GO/NO-GO | D-017~D-024 확정, 05/06/07/09/10/11 교차 정합성 조정, 전역 OPEN 등록부, 최종 판정 |
| Sonnet | 설계 문서 | 02·03·04·08의 세부 설계 초안 |
| Haiku | 목록·문서 수집 작업 | 라우트 52개 실측, FR 56건 추출, OPEN 항목 77건 수집 |

## 5. 핵심 결정 요약 (D-001~D-024)

전체 결정은 [11-DECISION-LOG.md](./11-DECISION-LOG.md)가 정본이며, 이번 세션(D-018~D-024)에서
추가된 결정을 요약하면:

| ID | 결정 | 해소한 충돌 |
|---|---|---|
| D-018 | `reports` 결정론적 ID `{targetType}__{targetId}__{reporterUid}` | 01(FR-G02)·03(OPEN-10)·05(자동 ID)·06(이미 구현) 4개 문서의 정면 충돌. `addDoc` 랜덤 ID는 Rules 패턴 검사를 통과할 수 없어 **모든 신고가 실패**하는 치명 결함이었음 |
| D-019 | 필드명·제약 정본 = 05 단 하나 | 05/06/07/09가 같은 엔터티를 서로 다른 필드명으로 규제 — Rules의 `X is string`이 부재 필드에서 거짓이 되어 **프로필/게시글/댓글/자료/신고/카테고리 신청 전부가 `permission-denied`**되는 결함 |
| D-020 | `linkedRefs` = `Array<{type,id}>`(최대 5개), 05에 편입 | 01(FR-P07)·02(`Array<{type,id}>`)·08(스칼라 `linkedLessonSlug`)·05(필드 없음) 4중 충돌. `array-contains` 완전 일치 요건상 항목은 정확히 두 필드만 |
| D-021 | `sourceType`(`original`\|`external`) 분기로 출처 필수화 | 01 FR-M08(Must "출처 필수") vs 05(`resourceUrl` 선택). `resourceUrl` 무조건 필수는 회원 자작 자료 등록을 불가능하게 하므로 기각 |
| D-022 | 탈퇴 익명화 = `profiles` 단일 지점 스크럽 + 표시 시점 보정(Q18) 의존 | 06 §13.2의 "`authorDisplayName` 캐시 필드 미존재" 전제가 05와 모순. 보정 미동작 시 실명 노출 = Critical |
| D-023 | 비밀번호 재설정 V1 Must 확정 — 라우트 없이 `sendPasswordResetEmail` 이메일 발송 | 01 FR-A12(Must) vs 09 OPEN-02 "V1 미구현". Must 요구를 근거 없이 비목표로 만든 충돌 |
| D-024 | 공지 = `/admin/posts`의 `isPinned` 토글 + 목록 상단 고정, `/admin/notices` 라우트 신설 안 함 | 05·08·09·10 네 문서의 라우트 존재 전제 모순. 08의 "/admin/notices 제외"와 09의 "라우트 미생성"을 확정으로 승인 |

## 6. 이번 세션에서 수정·신설한 정합성 결함 6건

| # | 결함 | 처리 |
|---|---|---|
| 1 | 05의 `MaterialSourceType`/`LinkedRef`/`LinkedRefSchema` 타입이 **참조만 되고 정의가 없음**(D-020/D-021 패치가 만든 미결 참조) | 05 Post/Material 타입·zod 블록에 정의 추가, Post `PostCreateInputSchema`에도 `linkedRefs` 배선 |
| 2 | 10 테스트가 FR 56건 중 **Must 5건·Should 5건을 한 건도 커버하지 못함**(`grep -c FR-` = 0) | §3.24 AT-102~120 신설 + §3.25 FR↔AT 추적 매트릭스(FR-A13/M09/I09은 V1 비목표 근거 명시) |
| 3 | 10 D-018 영향 케이스(중복 신고 거부) 누락 | AT-119(중복 신고 거부)·AT-120(`addDoc` 금지 회귀) 신설 |
| 4 | 08 OPEN-07(`linkedLessonSlug`)이 D-020으로 해소되었는데 문서가 구방식 | 08 신규 파일·데이터 변경·리스크 3곳을 `linkedRefs` `array-contains` 방식으로 갱신, OPEN-07 해소 |
| 5 | 09 GOOSE-06 자료 계약에 `sourceType`/`linkedRefs` 없음 | GOOSE-06 규칙·데이터 계약·작성 폼(출처 라디오+zod `discriminatedUnion`)에 D-020/D-021 반영 |
| 6 | **탈퇴·비밀번호·공지의 FR–패킷 모순**(위 §5 D-022/023/024) | D-022~D-024로 결정 + 05/06/08/09/10 갱신 |

## 7. 전역 OPEN 등록부

**충돌 설명**: 02~10 각 문서가 미결정 사항을 `OPEN-01`부터 독립적으로 번호를 매겼다. 따라서
"OPEN-01"만으로는 02(도입)/03(부트스트랩)/04(App Check)/05(부트스트랩)/06(targetType)/08(리전)/09(부트스트랩)/10(문서명)
8가지를 구분할 수 없다. **재번호를 붙이지 않고**(각 문서 로컬 번호는 그대로 두고) 이 문서가 전역
ID `G-{문서번호}-{로컬ID}`를 부여한다. 판정은 5단계: `해소(D-0xx)`(결정 로그로 종결) / `실질 해소`
(문서 본문이 이미 결정을 포함) / `부분 해소` / `미결`(후속 작업 필요) / `확정 비구현`(의도적 비목표).

### 7.1 02-INFORMATION-ARCHITECTURE

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O2-01 | OPEN-01 | 미결 | 데스크톱 GNB 9개 메뉴 밀집도(1280px) 시각 QA | Phase 10 수동 QA |
| G-O2-02 | OPEN-02 | 미결 | `/atlas/studio*` 3개 라우트의 role 게이팅 여부·시점 | 구현 착수 시 결정 |
| G-O2-03 | OPEN-03 | 미결 | `/members` 무-ID 접근 동작(전체 회원 디렉터리 V1 포함 여부) | 구현 착수 시 결정 |
| G-O2-04 | OPEN-04 | 미결 | `MobileTabBar`·`SiteFooter` 겹침 처리(하단 padding vs 탭바 스크롤 종속) | Phase 9 구현 시 |
| G-O2-05 | OPEN-05 | 미결 | `/community`의 `?linkedLesson=`·`?category=` 필터 조합 방식 | Phase 10 구현 시 |
| G-O2-06 | OPEN-06 | 미결 | `pending_member`의 `/me` 접근(제한 대시보드 vs `/membership/pending` 강제 리다이렉트) | Phase 3 구현 시 |

### 7.2 03-USER-FLOWS-AND-PERMISSIONS

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O3-01 | OPEN-01 | 해소(D-017) | `users/{uid}` 생성 + 초기 claim | — |
| G-O3-02 | OPEN-02 | 미결 | 최초 `admin` 계정 부트스트랩 방법 | **동일 주제 그룹**: G-O5-07, G-O8-02. Phase 3 착수 전 결정 |
| G-O3-03 | OPEN-03 | 미결 | `suspendUser`/`restoreUser`가 custom claim에 영향 주는지 | Phase 10 구현 시 |
| G-O3-04 | OPEN-04 | 미결 | 이메일 인증 메일 재전송 쿨다운·링크 만료 시간 | Phase 2 구현 시 |
| G-O3-06 | OPEN-06 | 미결 | `category` 유효성 검증(Rules vs 클라이언트) | 05 OPEN-03과 동일 주제 → G-O5-03 |
| G-O3-07 | OPEN-07 | 미결 | `setMaterialStatus` moderator 전이 범위(CANON 문구 모호) | Phase 7 구현 시 |
| G-O3-08 | OPEN-08 | 미결 | `reports` `TargetType`에 `comment` 포함 여부 | **동일 주제 그룹**: G-O6-01, G-O7-03, G-O8-05 |
| G-O3-09 | OPEN-09 | 미결 | `trusted_member` 신고 가중치 처리 위치 | Phase 8 구현 시 |
| G-O3-10 | OPEN-10 | 해소(D-018) | `reports` 문서 ID | — |
| G-O3-11 | OPEN-11 | 미결 | `withdrawn` 상태를 `restoreUser`로 `active` 복구 가능 여부 | Phase 10 구현 시 |
| G-O3-12 | OPEN-12 | 실질 해소 | 탈퇴 전용 콜러블 부재 | [06 §13.1](./06-SECURITY-AND-MODERATION-SSOT.md)이 전용 콜러블 없이 클라이언트 4단계로 확정 |
| G-O3-13 | OPEN-13 | 실질 해소 | 탈퇴 시 Auth 계정 삭제 여부 | [06 §13.3](./06-SECURITY-AND-MODERATION-SSOT.md)이 삭제 채택으로 확정 |
| G-O3-14 | OPEN-14 | 미결 | 최소 `admin` 1명 유지 정책 | 운영 정책, 구현 착수 전 |
| G-O3-15 | OPEN-15 | 미결 | `PostStatus` `hidden→deleted` 전이 여부 | Phase 8 구현 시 |
| G-O3-17 | OPEN-17 | 미결 | `MaterialStatus` `archived` 전이 주체(admin만?) | Phase 7 구현 시 |
| G-O3-18 | OPEN-18 | 미결 | `ReportStatus` `open→in_review` 별도 액션 존재 | Phase 8 구현 시 |
| G-O3-19 | OPEN-19 | 부분 해소 | 탈퇴 시 custom claim 제거/유지 | 06 §13이 사실상 무력화를 확정했으나 claim 자체 처리 방식은 미결 |

### 7.3 04-TECHNICAL-ARCHITECTURE

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O4-01 | OPEN-01 | 미결 | App Check 미도입 — region 밖 직접 REST 호출 완전 차단 불가 | Phase 7 이후 도입 시점 결정 |
| G-O4-02 | OPEN-02 | 미결 | staging-prod 완전 격리(별도 프로젝트/네임스페이스) 필요성 | 운영 개시 후 |
| G-O4-03 | Storage 업로드 최대 크기·허용 확장자 | 해소(D-026) | Firebase Storage 700KB, WebP, V1 Storage 사용 |
| G-O4-04 | CF 메모리/타임아웃/concurrency 설정값 | 제거(V1 Functions 미사용) | — |
| G-O4-05 | OPEN-05 | 미결 | Firestore 정기 백업(export) 정책·보관 주기 | 운영 절차 |
| G-O4-06 | OPEN-06 | 미결 | callable rate limiting(Firebase 기본 할당량 외) | 운영 모니터링 후 |
| G-O4-07 | OPEN-07 | 미결 | `materials.tags` 최대 개수(`array-contains` 비용) | 05 zod 상한(5개)과 조율 |
| G-O4-08 | OPEN-08 | 미결 | 커뮤니티 라우트의 sitemap 포함 여부 | Phase 10 구현 시 |

### 7.4 05-DATA-MODEL-SSOT

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O5-01 | OPEN-01 | 해소(D-017) | `users/{uid}` 생성 경로 | — |
| G-O5-02 | OPEN-02 | 미결 | `categories` admin 직접 수정의 감사 로그 누락 | Phase 10 구현 시(트리거 vs 콜러블) |
| G-O5-03 | OPEN-03 | 미결 | `posts.category` 약한 참조(Rules/콜러블 검증) | V1은 미검증 유지(05 §2.4) — 03 OPEN-06과 동일 주제 |
| G-O5-04 | OPEN-04 | 해소(D-018) | Report 중복 신고 | — |
| G-O5-05a | OPEN-05a | 미결 | `reaction_received` 알림 트리거 구분 | `onReactionWritten` 확장으로 잠정 처리 |
| G-O5-05b | OPEN-05b | 미결 | `admin_notice` 생성 콜러블 부재 | `/admin/notices` 라우트 미생성(D-024)과 맞물려 사실상 미사용 — 운영 요구 시 D-024 재검토 조건 참조 |
| G-O5-06 | OPEN-06 | 미결 | `recomputeEngagementCounters` 정식 편입 | Opus 승인 필요(구현은 별도) |
| G-O5-07 | OPEN-07 | 미결 | `bootstrap-admin.ts` 최초 관리자 스크립트 | **동일 주제 그룹**: G-O3-02, G-O8-02 |
| G-O5-08 | OPEN-08 | 미결 | Material 상태 전이 Rules 상세화 | 06이 정본 역할을 수행하므로 사실상 이행됨 — 확인만 필요 |
| G-O5-09 | OPEN-09 | 미결 | Storage 첨부 삭제 연쇄(고아 파일) | V1은 그대로 둠 |

### 7.5 06-SECURITY-AND-MODERATION-SSOT

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O6-01 | OPEN-01 | 미결 | `reports` `targetType`에 댓글/회원 포함 | **동일 주제 그룹**: G-O3-08, G-O7-03, G-O8-05. V1은 게시글/자료만 |
| G-O6-02 | OPEN-02 | 미결 | 신규 회원 게시글 상한(3개) 서버 강제 트리거 부재 | 10 AT-118이 "서버 미강제"를 고정. v1.1에서 `onPostCreated` |
| G-O6-03 | OPEN-03 | 미결 | 동일 내용 재작성 차단 서버 강제 부재 | v1.1 |
| G-O6-04 | OPEN-04 | 미결 | 업로드 매직넘버 검증(Storage `onFinalize`) | v1.1 |
| G-O6-05 | OPEN-05 | 미결 | `ModerationActionType`에 `warn` 부재 | v1.1 enum 확장 |
| G-O6-06 | OPEN-06 | 미결 | 소프트 삭제 90일 물리 삭제 스케줄 Function | V1 수동 처리 |
| G-O6-07 | OPEN-07 | 미결 | `/privacy` 페이지 갱신 반영 | 별도 작업 티켓 |
| G-O6-08 | OPEN-08 | 미결 | `suspendedUntil` 자동 만료 | 스케줄 Function 신설 필요 |
| G-O6-09 | OPEN-09 | 미결 | 카테고리 신청 동시 건수 서버 제한 | 남용 사례 발생 시 재검토 |
| G-O6-10 | OPEN-10 | 실질 해소 | Auth 트리거(`beforeUserCreated`/`onCreate`) 부재 | **D-017의 `bootstrapUserAccount`가 같은 문제를 해결**. 06의 이 행은 D-017과 동일 건이므로 06 갱신 시 해소 표기 권장 |

### 7.6 07-CONTENT-GOVERNANCE-SSOT

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O7-01 | OPEN-01 | 미결 | `posts→materials` 전환 동의 정식 필드(`sourcePostId`/`authorConsentAt`) | V1은 시스템 코멘트 방식 유지 |
| G-O7-02 | OPEN-02 | 부분 해소 | `materials` 구조화 출처 | **D-021의 `sourceType`/`resourceUrl` 도입으로 `external` 출처는 구조화됨.** 복수 출처·제목+URL 쌍은 여전히 비구조화(본문 `## 참고 자료` 섹션) |
| G-O7-03 | OPEN-03 | 미결 | 레포지토리 콘텐츠(강의·용어) 오류 신고 경로 | **동일 주제 그룹**: G-O3-08, G-O6-01, G-O8-05. V1은 `/verification` 정적 안내 유지 |
| G-O7-04 | OPEN-04 | 미결 | `Badge` 4-variant에 `warning`/`danger` 신설 여부 | UI 컴포넌트 변경 범위 — 구현 착수 시 |
| G-O7-05 | OPEN-05 | 미결 | 검토자 수 조건(moderator 1인+admin 1인) 재확인 | 운영 개시 후 |

### 7.7 08-IMPLEMENTATION-ROADMAP

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O8-01 | OPEN-01 | 미결 | Firestore/Storage 리전 확인 | Phase 1 착수 전 콘솔 확인 |
| G-O8-02 | OPEN-02 | 미결 | 최초 admin 부여 문서화 위치 | **동일 주제 그룹**: G-O3-02, G-O5-07 |
| G-O8-03 | Storage 업로드 크기 제한 기준값 | 해소(D-026) | 700KB Firebase Storage 제한으로 확정 |
| G-O8-04 | OPEN-04 | 미결 | 카테고리 신청 남발 rate limit | V1 미적용 |
| G-O8-05 | OPEN-05 | 미결 | 댓글 신고 지원 | **동일 주제 그룹**: G-O3-08, G-O6-01, G-O7-03. V1은 `deleteCommentByModerator` 직접 삭제 |
| G-O8-06 | OPEN-06 | 해소(D-024) | 공지 데이터 구조(`isNotice` 플래그) | `posts.isPinned` 확정 |
| G-O8-07 | OPEN-07 | 해소(D-020) | `linkedRefs` 정본 구조 | `Array<{type,id}>` 확정 |
| G-O8-08 | OPEN-08 | 미결 | V1 트래픽 규모·Firestore 읽기 비용 | 배포 후 1주일 모니터링 |
| G-O8-09 | OPEN-09 | 미결 | 진행률 계정 동기화 정식 Phase 편입 시점 | V1 이후(D-013) |

### 7.8 09-GOOSE-IMPLEMENTATION-PACKETS

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O9-01 | OPEN-01 | 해소(D-017) | `bootstrapUserAccount` 함수명·명세 | GOOSE-03이 구현 |
| G-O9-02 | OPEN-02 | 해소(D-023) | 비밀번호 재설정 흐름 | 로그인 화면 `sendPasswordResetEmail`(라우트 없음) |
| G-O9-03 | OPEN-03 | 해소(D-024) | `/admin/notices` 데이터 모델·함수 | `/admin/posts` `isPinned` 토글로 구현 |
| G-O9-04 | OPEN-04 | 확정 비구현 | `active→archived` 카테고리 전환 콜러블 | 카테고리는 활성화 후 UI상 전환 수단 없음(의도적) |
| G-O9-05 | OPEN-05 | 확정 비구현 | 기존 페이지 커뮤니티 CTA 삽입 위치 | 삽입하지 않음(의도적) — FR-L06과 별개 |

### 7.9 10-ACCEPTANCE-TEST-PLAN

| 전역 ID | 로컬 | 판정 | 주제 | 후속 처리 |
|---|---|---|---|---|
| G-O10-01 | OPEN-01 | 해소 | 문서 파일명 미확정 | 13종 전부 발행됨. 남은 작업: §3 SSOT 열의 `§X` 표기를 실제 링크로 교체(12 §9 후속 1) |
| G-O10-02 | OPEN-02 | 해소 | Phase 매핑 대조 대상(08) 발행 | 구현 착수 전 1회 대조 |
| G-O10-03 | Storage 업로드 상한값(AT-069) | 해소(D-026) | 700KB Firebase Storage, WebP, 1600px |
| G-O10-04 | OPEN-04 | 미결 | 댓글 soft delete UI 표시 정책(AT-035) | "삭제된 댓글입니다" 노출 vs 숨김 |
| G-O10-05 | OPEN-05 | 미결 | axe CI 연동(AT-092) | 현재 수동 |
| G-O10-06 | OPEN-06 | 미결 | CI 파이프라인·동적 라우트 산출물 자동 검증 | Phase 0 구현 시 |
| G-O10-07 | OPEN-07 | 미결 | 테스트 계정 이메일 명명 규칙 표준화 | §2.3 참조 |
| G-O10-08 | OPEN-08 | 미결 | 배포 롤백 절차 문서 분리 | 운영 절차 |

### 7.10 주제 그룹 요약 (중복 항목)

여러 문서가 같은 주제를 각자 다른 로컬 ID로 열어놓았다. **한 건을 결정하면 나머지가 같이 닫힌다**:

| 주제 그룹 | 구성원 |
|---|---|
| 최초 admin 부트스트랩 | G-O3-02, G-O5-07, G-O8-02 |
| Storage 업로드 크기·확장자 | G-O4-03 | Storage 업로드 최대 크기·허용 확장자 | 해소(D-026) | Firebase Storage 700KB, WebP, V1 Storage 사용 |
| `TargetType` 확장(댓글·레포지토리 신고) | G-O3-08, G-O6-01, G-O7-03, G-O8-05 |
| `categories` 약한 참조 검증 | G-O3-06, G-O5-03 |
| 서버 강제 스팸 차단(게시글 상한·재작성) | G-O6-02, G-O6-03 |

## 8. 정합성 검사 결과 (지시서 §13)

| 검사 항목 | 결과 |
|---|---|
| 문서 존재 | 13종 전부 존재(00~12) — 내부 링크 검사 `BROKEN` 0건 |
| 링크 유효성 | `./*.md` 패턴 전체 검사 통과(12 작성 후 재검증 완료) |
| 역할 명칭 일치 | `guest/pending_member/member/trusted_member/moderator/admin` 6개 — 01·03·05·06·09 전부 일치 |
| enum 일치 | `PostStatus`·`CommentStatus`·`MaterialStatus`·`ReportStatus`·`TargetType`·`MaterialSourceType`·`LinkedRefType` — 05 정본 기준 06·07·09·10 정렬 완료(D-019) |
| Firestore 경로 일치 | `users/{uid}`·`profiles/{uid}`·`posts`·`materials`·`comments`·`reports`·`notifications/{uid}/items/{id}`·`bookmarks`·`reactions`·`categoryRequests`·`categories`·`adminLogs`·`moderationActions` — 전 문서 일치 |
| 페이지 경로 일치 | 기존 52개 라우트 무변경 + 신규 커뮤니티 라우트(CANON F절) — 실측 `find src/app -name page.tsx | wc -l` = **52** |
| V1 범위 일치 | Phase 0~10(D-016) — 04·08·09·10 일치. FR-A13/M09/I09만 V1 비목표(D-013·FR 우선순위) |
| 승인 정책 일치 | `pending_member` 쓰기 차단, 멤버십 신청 2단계 — 03·06·09·10 일치 |
| 공식/회원 자료 정책 일치 | `MaterialStatus`+`official` — 05·06·07·09 일치 |
| Goose 패킷과 SSOT 비충돌 | GOOSE-01~10의 필드·콜러블·라우트를 05/06과 대조 — D-017~D-024 반영으로 해소. 잔여 패킷 수정은 12 §9 후속 4 |
| 테스트 커버리지 | **Must 38건 전건 커버**, Should 13건 전건 커버, Could 3건은 비목표 근거 명시(§3.25) |
| 미구현 기능을 현재형으로 기술 금지 | 09의 "GOOSE-XX 구현 예정" 표기를 준수. 미구현 항목은 모두 OPEN·해소 표기로 구분 |
| 회귀 방지 계획 존재 | 10 §5(회귀 스위트)·§5.1(Phase 종료 필수 시퀀스)·§5.2(라우트 검증 스크립트)·§5.3(필드명 정합성, D-019) |
| 금지 어휘 | "적절히 처리/필요하면 추가/상황에 따라/알아서 설계/일반적인 방식/추후 검토" **0건**(전 문서 grep) |
| 최종 결함 처리 | D-018~D-024 기록 + §6의 결함 6건 처리 완료 |

## 9. 잔여 작업 (구현 착수 전)

계획 문서는 확정되었으나, **구현 착수 전에 값 하나를 정해야** 하는 항목이 남는다. 전역 OPEN 등록부에서
파생된 목록:

1. **10 §3의 `§X` SSOT 표기 → 실제 파일 링크 교체**(G-O10-01). 테스트 표의 SSOT 열이 문서 초안 단계의
   `§D`·`§H` 표기를 일부 유지한다. 이는 테스트 실행에 영향 없으나, 구현 착수 전 마지막 정리로 교체를
   권고한다.
2. **Storage 업로드 상한값 통일**(G-O4-03 | Storage 업로드 최대 크기·허용 확장자 | 해소(D-026) | Firebase Storage 700KB, WebP, V1 Storage 사용 |
   Phase 4 착수 전 하나로 확정한다.
3. **최초 admin 부트스트랩 방식**(G-O3-02/G-O5-07/G-O8-02). `bootstrap-admin.ts` 스크립트를 만들지,
   콘솔 수동 조작으로 할지 Phase 3 착수 전 결정한다.
4. **GOOSE-08(관리자 대시보드)의 `setUserRole` 구현 범위**는 09가 이미 상세히 규정 — 추가 결정 불필요.
   다만 G-O3-03(`suspendUser`/`restoreUser`의 claim 영향)을 이 패킷 구현 시점에 확정한다.
5. **`categories` 약한 참조 검증 여부**(G-O3-06/G-O5-03). V1은 미검증이 기본값이지만, 이는 "검증을 아예
   안 한다"가 아니라 "Rules 단에서 `get()` 조회 비용을 수용할지"를 Phase 4에서 결정한다.
6. **댓글 신고**(G-O3-08/G-O6-01/G-O7-03/G-O8-05). V1은 게시글/자료 신고만 지원한다. 운영 요구가
   확인되면 `TargetType` enum 확장 + 06 규칙을 v1.1에서 다룬다.

## 10. 최종 판정 (지시서 §15)

### 10.1 판정

> ## **PLANNING_GO**

계획 단계의 13종 문서가 전부 확정되었고, D-017~D-024를 포함한 교차 정합성 결함이 해소되었으며,
FR 56건의 테스트 커버리지가 Must 전건·Should 전건으로 확인된다. §8의 정합성 검사 16개 항목을 전부
통과한다. **이 상태로 구현 착수(Phase 0)로 GO**를 내린다.

### 10.2 소스코드 무변경 재검증

`git status --short` 결과(작업 시작 시점과 동일):

- 수정(M) 7건: `DESIGN.md`, `ai-ops/STATE.md`, `ai-ops/reports/CODEX-P0-WORKFLOW-HANDOFF.md`,
  `content/practice/vibe-coding-foundation/11-files-connect-practice.md`, `src/app/learn/page.tsx`,
  `src/features/learning-interactions/file-connect/FileConnectExperience.tsx`,
  `src/features/learning-interactions/web-layers/WebLayersExperience.tsx` — **작업 시작 전부터 있던
  미커밋 변경이며 일절 손대지 않음**
- 미추적(??) 32건: 지시서 §4에 따라 기존 미커밋 파일들 + **`docs/`**(본 작업의 유일한 추가 경로)
- **`docs/` 안에는 `community-platform/` 13종만 존재** — 그 외 경로 변경 없음

```
find docs -type f   →  docs/community-platform/00..12  (13개 파일만)
find src/app -name page.tsx | wc -l   →  52  (기존 라우트 무변경)
```

| 항목 | 시작 시점 | 완료 시점 | 판정 |
|---|---|---|---|
| HEAD | `272b2b1` | `272b2b1` | 불변 |
| 수정 파일 | 7건 | 7건 | 불변 |
| 추적 외 파일 | 31건 | 31건 + `docs/` | `docs/`만 추가 |
| 커밋/푸시 | 없음 | 없음 | 없음 |

### 10.3 작성 문서 · 산출물 요약

- **작성 문서**: `docs/community-platform/` 00~12 전부(12종 기존 + 본 문서)
- **이번 세션 추가 결정**: D-018(신고 결정론적 ID), D-019(필드명 정본 05), D-020(`linkedRefs`),
  D-021(`sourceType`), D-022(탈퇴 익명화), D-023(비밀번호 재설정 V1 확정), D-024(공지 `isPinned`)
- **테스트 확장**: 97건 → **120건**(AT-098~120 신설) + FR↔AT 추적 매트릭스(FR 56건 전건 대응)
- **구현 준비도**: 08 Phase 0~10 로드맵 · 09 GOOSE-01~10 패킷 · 10 인수 테스트 120건 + 회귀 스위트가
  서로 정합. Phase 0 착수 전 결정 사항은 §9의 6건으로 명확히 한정됨

### 10.4 미결 사항 (PLANNING_GO 유지의 조건)

§9의 6건과 전역 OPEN 등록부의 "미결" 항목은 **계획 완료를 막지 않는다** — 전부 "구현 착수 시점
결정"이거나 "운영 개시 후 재검토" 항목이다. 단, 다음 2건은 Phase 0~4 사이에 반드시 값을 확정해야
하므로 구현 계획에 반영한다:

1. Storage 업로드 상한값(5MB vs 10MB) — Phase 4 착수 전
2. 최초 admin 부트스트랩 방식 — Phase 3 착수 전

이 두 건이 확정되면 구현은 08 로드맵·09 패킷·10 테스트만 따라가면 된다.
