# 07 — 콘텐츠 거버넌스 SSOT

## 0. 문서 지위

이 문서는 AI_VIBE_CODING_MASTER 커뮤니티 전환의 **콘텐츠 운영 정본(SSOT)**이다. 콘텐츠 2계층 모델, `MaterialStatus` 6개 상태의 운영 정의, 자료 검토·공식 승격 워크플로, 카테고리·태그 운영, 출처·저작권 정책, 버전 관리, 회원 수정 제안, 금지 콘텐츠, 품질 최소 요건, 검토 부하 관리를 확정한다.

이 문서와 다른 문서가 충돌하면 이름·경로·enum·역할 정의는 **CANON.md**(정본 어휘)가 우선한다. 이 문서는 CANON.md가 정한 `MaterialStatus` / `ReportReason` / `CategoryKind` / `NotificationType` 등 enum과 `materials` / `categories` / `reports` 등 Firestore 경로를 그대로 사용하며, 새 필드·새 컬렉션이 필요한 지점은 전부 §17 미결정 사항(OPEN-nn)으로 분리한다.

**관련 문서**
- `./05-DATA-MODEL-SSOT.md` — `materials` / `categories` 등 컬렉션의 필드 스펙(이 문서가 참조하는 데이터 모델의 원본)
- `AGENTS.md`(레포지토리 루트) — 기존 교육 콘텐츠 운영 계약, §8 "공식 소스 우선순위", §9 "X 정보 분류" — §8 콘텐츠 정책의 근거
- `src/app/verification/page.tsx` — 기존 `/verification` 페이지의 출처 우선순위 6단계·콘텐츠 상태 6종 안내(정적 텍스트, DB 없음) — §8·§10 정책이 이를 계승
- `ai-ops/README.md` — 기존 레포지토리 콘텐츠 생산 파이프라인(Executor 독립성, 파일 기반 핸드오프, Single-Writer Zone, 품질 게이트) — §3·§7 정책의 근거
- `scripts/scan-citations.mjs` — 기존 강의 마크다운의 인용 블록 스캔 스크립트 — §8 인용 규칙의 근거

---

## 1. (문서 지위는 §0에 통합)

## 2. 콘텐츠 2계층 모델

### 2.1 정의

| 계층 | 정의 | 포함 대상 |
|---|---|---|
| **공식 지식층**(official knowledge layer) | 사실 검증을 거쳐 편집 권한이 레포지토리 관리자(git 커밋 권한자) 또는 `admin`에게만 있는 콘텐츠 | (a) `content/`, `src/content/`의 레포지토리 관리 콘텐츠 전부 (b) `materials` 컬렉션 중 `status == "official"` 문서 |
| **참여층**(community layer) | 회원이 직접 작성·수정하며, 검토 전이거나 검토를 거쳤어도 아직 공식 승격되지 않은 콘텐츠 | (a) `posts` 컬렉션 전체(모든 `PostStatus`) (b) `materials` 컬렉션 중 `status`가 `draft` / `pending_review` / `community` / `needs_revision` / `archived`인 문서 |

### 2.2 경계 규칙

- `materials` 문서 1건은 항상 두 계층 중 하나에만 속한다. 계층 판정은 오직 `status` 필드 하나로 결정한다(`status == "official"`이면 공식 지식층, 그 외 5개 상태는 전부 참여층).
- `posts`는 어떤 상태에서도 공식 지식층으로 전환되지 않는다. 우수 게시글이 공식 지식층에 들어가려면 §7의 전환 경로를 거쳐 새 `materials` 문서 또는 레포지토리 콘텐츠로 재생산되어야 한다.
- 레포지토리 관리 콘텐츠(§3)는 `status` 필드 자체가 없다. Firestore 문서가 아니므로 이 표의 계층 판정 규칙이 적용되지 않고, 처음부터 끝까지 공식 지식층으로 고정이다.

### 2.3 시각적 구분 규칙(배지 라벨·색·문구 확정)

기존 `src/components/ui/Badge.tsx`는 `default` / `accent` / `success` / `muted` 4개 variant만 제공한다. V1은 이 4개 variant를 그대로 사용하며 새 variant를 추가하지 않는다(컴포넌트 신설 여부는 §17 OPEN-04).

**레이어 배지** (목록/상세 페이지 최상단, 콘텐츠 출처 구분용):

| 콘텐츠 종류 | Badge variant | 문구 |
|---|---|---|
| 레포지토리 관리 콘텐츠(`content/`, `src/content/`) | `success` | "공식 지식" |
| `materials`, `status == "official"` | `success` | "공식 자료" |
| `posts`(모든 상태) | `accent` | "커뮤니티 글" |
| `materials`, `status != "official"` | `accent` | "회원 작성" (상태 배지와 함께 표기, §2.4) |

**상태 배지**(`materials`에만 적용, `MaterialStatus` 6개 전부):

| MaterialStatus | Badge variant | 문구 |
|---|---|---|
| `draft` | `muted` | "초안" |
| `pending_review` | `default` | "검토 대기" |
| `community` | `accent` | "커뮤니티 자료" |
| `official` | `success` | "공식 자료" |
| `needs_revision` | `default` | "수정 필요" |
| `archived` | `muted` | "보관됨" |

`pending_review`와 `needs_revision`은 variant를 공유하지만 문구로 구분한다. `draft`와 `archived`도 동일하다. 이는 §17 OPEN-04로 남긴 4-variant 제약의 확정된 임시 해법이다.

### 2.4 표기 조합 규칙

`materials` 상세 페이지에는 **레이어 배지 + 상태 배지**를 항상 함께 표시한다(예: `status == "community"`인 문서는 "회원 작성" + "커뮤니티 자료" 두 배지를 나란히 표기). `status == "official"`인 문서는 "공식 자료" 배지 1개만 표시하고 "회원 작성" 배지는 표시하지 않는다(원저자 표기는 §6에서 별도 텍스트로 처리).

---

## 3. 기존 공식 교육 콘텐츠의 지위

### 3.1 대상

CANON A절 기준 아래 콘텐츠는 전부 **레포지토리 관리 콘텐츠**다.

```
content/assessment      (3개 파일)
content/courses         (26개 파일)
content/curriculum      (9개 파일)
content/instructor      (2개 파일)
content/interactions    (1개 파일)
content/practice        (14개 파일)
src/content/atlas.ts
src/content/curriculum.ts
src/content/glossary.ts
src/content/resources.ts
src/content/schema.ts
src/content/site-navigation.ts
src/content/lessons/**
```

### 3.2 편집 권한

**회원은 위 콘텐츠를 편집할 수 없다.** 커뮤니티 시스템(`posts` / `materials` / `comments` 등 Firestore 컬렉션)에는 위 콘텐츠에 대한 쓰기 경로가 존재하지 않으며, 어떤 Cloud Function도 위 경로를 대상으로 하지 않는다(CANON H절 callable 목록에 콘텐츠 파일 쓰기 함수 없음).

### 3.3 변경 경로

변경 경로는 **오직 git 커밋 + 기존 ai-ops 파이프라인** 하나뿐이다.

1. `ai-ops/README.md`의 AI 조직도(Planning → Production → Verification → Release 4계층, Executor: Codex/Cline/Fable)를 그대로 따른다.
2. `AGENTS.md` §5(Protected paths)에 열거된 파일(`src/content/atlas.ts`, `src/app/atlas/**`, `src/content/lessons/**`, `src/content/glossary.ts` 등)은 Phase 1 보존 대상 또는 운영자 명시 승인 없이는 동결 상태이며, 이 문서가 그 동결을 해제하지 않는다.
3. 커뮤니티 시스템에서 발생하는 신호(회원 수정 제안, 우수 게시글)는 §7·§10에서 정의한 경로를 통해 ai-ops 파이프라인의 **입력**으로만 전달되고, 파이프라인 자체를 우회하는 자동 반영은 V1에 없다.

---

## 4. MaterialStatus 6개 상태의 운영 정의

| 상태 | 의미 | 누가 볼 수 있는가 | 누가 바꿀 수 있는가 | 다음 가능 상태 | 배지 문구 |
|---|---|---|---|---|---|
| `draft` | 작성 중, 미제출 | 작성자(`authorUid`) 본인만 | 작성자 본인(편집·삭제) | `pending_review`(member 제출) / `community`(trusted_member 제출, CANON C절) | "초안" |
| `pending_review` | 제출 완료, 검토 대기 큐 | 작성자 본인 + `moderator` 이상 | `moderator` 이상(`setMaterialStatus`) | `community`(승인) / `needs_revision`(반려) / `archived`(즉시 보관, `admin`) | "검토 대기" |
| `community` | 공개 커뮤니티 자료 | 전체 공개(`guest` 포함) | `moderator` 이상(`needs_revision`로 강등) / `admin`(`official` 승격, `archived` 보관) | `official`(승격, `admin`) / `needs_revision`(강등, `moderator`+) / `archived`(`admin`) | "커뮤니티 자료" |
| `official` | 공식 승격 자료 | 전체 공개, `materials` 목록 기본 정렬 최상단 | `admin`만(`demote_material`) | `community`(강등) / `archived`(`admin`) | "공식 자료" |
| `needs_revision` | 반려·수정 요청 | 작성자 본인 + `moderator` 이상 | 작성자 본인(수정 후 재제출) / `moderator` 이상(`archived`로 종료) | `pending_review`(재제출) / `archived`(종료) | "수정 필요" |
| `archived` | 보관됨(비공개 취급) | 작성자 본인 + `moderator` 이상 | `admin`만(`community` 또는 `pending_review`로 복원) | `community` / `pending_review`(복원, `admin`) | "보관됨" |

목록 노출 규칙: `archived` 상태 자료는 `/materials` 목록에 노출하지 않는다. 직접 URL(`/materials/items/{id}`)로 접근하면 작성자 본인과 `moderator` 이상에게만 "보관된 자료입니다" 안내와 함께 내용을 보여주고, 그 외 사용자에게는 404와 동일하게 처리한다.

---

## 5. 자료 검토 워크플로

### 5.1 제출 → 큐 진입 → 검토 → 결과

```
member 작성 완료 → "제출" 클릭 → draft → pending_review → (검토) → community | needs_revision | archived
trusted_member 작성 완료 → "제출" 클릭 → draft → community  (검토 생략, CANON C절 근거, 큐에 들어가지 않음)
```

- 큐: `pending_review` 상태 `materials` 문서를 `createdAt` 오름차순(선입선출)으로 `/admin/materials`에 노출한다.
- 검토자: `moderator` 또는 `admin`. `MaterialStatus`는 CANON 정본으로 6개 고정이므로 "검토 중" 같은 중간 상태를 별도로 두지 않는다. 검토 시작을 별도로 기록하지 않고, 결과가 확정되는 시점에만 `setMaterialStatus`를 호출한다.
- 결과 처리:
  - 승인 → `community`
  - 반려 → `needs_revision`, 반려 사유는 알림(`material_status_changed`) 본문에 필수로 포함한다.
  - 즉시 보관(스팸·금지 콘텐츠) → `archived`

### 5.2 검토 기준 체크리스트(확정 9개 항목)

1. 출처 명시 여부 — 인용·참고 자료 URL 또는 원저작자 표기 존재
2. 저작권 — 타 사이트 전문 복사 여부, 이미지 저작권 확인(§8 기준)
3. 정확성 — 확인 가능한 범위에서 기술적으로 틀린 내용 없음
4. 중복 — 기존 `official` 자료 또는 최근 90일 이내 등록된 `community` 자료와 제목·핵심 내용이 중복되지 않음
5. 카테고리 적합성 — CANON G절 `material` 카테고리(`prompt` / `workflow` / `tool-guide` / `template` / `case-study` / `reference`) 중 정확히 하나에 부합
6. 최소 분량 충족 — §15 기준(본문 200자 이상) 충족
7. 금지 콘텐츠 미포함 — §14 목록에 해당 없음
8. 개인정보 포함 여부 — 실명·연락처·이메일·학교명 등 제3자 개인정보 미포함
9. 제목 규칙 준수 — §15 기준(5자 이상 80자 이내) 충족

9개 항목을 모두 충족해야 승인(`community`)한다. 1개라도 미충족이면 반려(`needs_revision`)하며, 반려 사유에는 위 번호를 반드시 포함한다.

---

## 6. 공식 승격 절차

### 6.1 승격 기준(`community` → `official`, 정량 기준 확정)

아래 3개 조건을 **모두** 충족해야 승격 후보가 된다.

| 조건 | 기준값 |
|---|---|
| 좋아요 수 | `likeCount` 30 이상 |
| 신고 없음 | 해당 자료를 대상으로 한 `reports` 중 `status == "resolved"`(조치 확정)인 유효 신고 0건. `status == "dismissed"`(무효 판정)는 카운트하지 않는다 |
| 검토자 수 | `moderator` 이상 1인 이상의 사전 승격 추천 확보 |

3개 조건을 모두 충족하면 `admin` 1인이 최종 승격을 확정한다(`setMaterialStatus`, `promote_material` 액션으로 `adminLogs` 및 `moderationActions` 기록). `admin`은 위 3개 조건 확인 없이 임의로 승격할 수 없다.

### 6.2 원저자 크레딧 처리

승격 후에도 `authorUid` 필드는 원저자로 유지한다. 자료 상세 페이지에 "원저자: {회원 표시명}"을 고정 표기하며, 이후 어떤 조작으로도 삭제·변경하지 않는다.

### 6.3 승격 후 편집 권한 이전

승격 시점부터 원저자의 직접 편집 권한은 **종료**된다. 이후 본문 수정은 `admin`만 가능하다. 원저자가 수정을 원하면 §10 "회원 수정 제안" 경로로 제출한다.

### 6.4 되돌리기(demote) 조건

`admin`이 `demote_material` 액션을 실행하는 조건은 아래 3가지 중 하나다.

1. 승격 후 60일 이내 유효 신고(`status == "resolved"`) 3건 이상 누적
2. 사실관계 오류가 확인되어 `admin`이 즉시 판단
3. 원저자가 저작권 문제를 사후 제기하고 `admin`이 인정

demote 시 기본 목적지 상태는 `community`다(원저작권 문제로 인한 demote는 `archived`).

---

## 7. 커뮤니티 게시글 → 공식 지식 전환 경로

```
posts(게시글)  →  materials(교육자료, pending_review)  →  materials(official)  →  레포지토리 강의/용어
```

| 단계 | 전환 주체 | 산출물 |
|---|---|---|
| 1. `posts` 작성 | 회원(`member` 이상) | `posts` 문서 1건 |
| 2. `materials` 전환 | `moderator` 또는 `admin`이 우수 게시글을 발견하고 원저자에게 전환 동의 요청 → 원저자 동의 → `moderator`/`admin`이 신규 `materials` 문서 생성(`status == "pending_review"`, `authorUid`는 원저자 유지) | 새 `materials` 문서 1건, §5 표준 검토 워크플로 진입 |
| 3. `official` 승격 | §6 절차 그대로 | `materials` 문서 `status == "official"` |
| 4. 레포지토리 반영 | `admin`이 수동으로 결정, 해당 `official` 자료의 URL(`/materials/items/{id}`)을 ai-ops 파이프라인 Source Collector 단계 입력으로 전달 | 레포지토리 커밋(강의/용어 반영), §3의 git + ai-ops 경로 그대로 사용 |

4단계는 V1에서 자동화하지 않는다(수동 트리거). `admin`이 별도 이슈 또는 문서로 ai-ops 파이프라인에 전달한다.

**원저자 동의 절차(확정):** 2단계 전환은 원저자의 **명시적 동의**가 반드시 필요하다. CANON D절에는 동의 기록 전용 필드가 없으므로, V1은 동의 기록을 새 `materials` 문서와 연결된 `comments`(`targetType == "post"`, 원본 게시글 대상) 문서에 `moderator`/`admin`이 "[전환동의] {날짜}" 형식의 시스템 코멘트로 남기는 방식을 기본값으로 확정한다. 정식 스키마(`sourcePostId`, `authorConsentAt` 필드)는 §17 OPEN-01로 남긴다.

---

## 8. 출처 표기와 저작권 정책

### 8.1 기존 정책 요약

- `AGENTS.md` §8 "공식 소스 우선순위": 승인된 KB > 공식 문서/스펙/엔지니어링 블로그 > 공식 제품 공지 > X/커뮤니티(후보만) > 추측(금지).
- `AGENTS.md` §9 "X 정보 분류": `verified_fact` / `official_announcement_candidate` / `community_interpretation` / `unverified_claim` / `opinion_sentiment` 5단계 태그.
- `/verification` 페이지(`src/app/verification/page.tsx`): 출처 우선순위 6단계(공식 문서 → 공식 GitHub/Release → 표준 문서 → 논문/기술 보고서 → 공식 Engineering Blog → 커뮤니티 참고(후보만·단독 확정 금지)), 콘텐츠 상태 6종 라벨.
- `scripts/scan-citations.mjs`: 레포지토리 강의 마크다운(`src/content/lessons/markdown`)의 인용 블록(`>` 인용문)을 정적 스캔해 길이·수량을 점검.

### 8.2 회원 자료 적용 규칙(확정)

| 항목 | 규칙 |
|---|---|
| 인용 길이 상한 | 외부 자료 원문 인용 1건당 200자 이내, 본문 전체 대비 인용 비중 10% 이내 |
| 출처 필수 필드 | CANON D절에 `materials` 전용 구조화 출처 필드가 없으므로, V1은 본문 마크다운 말미 `## 참고 자료` 섹션에 `제목 + URL`을 나열하는 방식을 기본값으로 확정(구조화 필드는 §17 OPEN-02) |
| 이미지 저작권 | `mediaAssets/{yyyyMM}/{fileId}.{ext}`에 업로드하는 이미지는 본인 촬영·제작 또는 라이선스가 확인된 이미지만 허용. 도구 사용법 설명 목적의 화면 캡처(스크린샷)는 허용. 타인 저작물 캡처·전재는 금지 |
| AI 생성물 표기 의무 | 본문의 절반 이상이 AI 생성 결과(코드·텍스트)이면 자료 서두에 "AI 생성 포함"을 명시해야 한다. 누락은 §5.2 체크리스트 7번 위반으로 `needs_revision` 반려 사유 |
| 타 사이트 전문 복사 금지 | 외부 문서와 동일 문장이 30% 이상이면 즉시 `archived` 처리하고 `reports`(`reason == "copyright"`)를 자동 생성 대상으로 표시 |

### 8.3 위반 시 조치 단계

1. 1차 위반 — `needs_revision` 반려 + 위반 항목 명시
2. 90일 이내 동일 위반 재발(2차) — 해당 자료 `archived` + 작성자 알림(`material_status_changed`)
3. 3차 위반 — `moderator`가 `reports`(`reason == "copyright"`) 생성 → `admin`이 `suspendUser` 검토

---

## 9. 버전 관리와 수정 이력

### 9.1 V1 기본값: 이력 보관하지 않음

CANON D절 Firestore 경로 정본에 버전 이력용 서브컬렉션이 없다. 새 컬렉션 신설은 CANON 위반이므로, V1은 `materials`/`posts` 각 문서의 **최신 본문 1개만 유지**하고 별도 history 저장소를 두지 않는다.

### 9.2 `updatedAt` 표시 규칙

- 상세 페이지에 "최근 수정: {updatedAt}"을 표시한다.
- `createdAt`과 `updatedAt`의 차이가 60초 미만이면 표시하지 않는다(저장 재시도 노이즈 제외).

### 9.3 대폭 수정 시 재검토 트리거 조건

`status`가 `community`인 `materials` 문서에서, 저장 시점 기준 본문 글자 수가 직전 저장 대비 **30% 이상 증감**하거나 **제목이 변경**되면, 클라이언트가 저장과 동시에 `status`를 `needs_revision`으로 되돌리고 `moderator`에게 알림을 보낸다. `status == "official"`인 문서는 §6.3에 따라 원저자 편집 권한 자체가 없으므로 이 트리거가 적용되지 않는다.

---

## 10. 회원 수정 제안

### 10.1 V1 결정: `reports` 컬렉션의 `wrong_info` 사유 재사용

별도 컬렉션을 신설하지 않는다. 근거: CANON E절 `ReportReason`에 이미 `wrong_info`가 정의되어 있고, CANON D절에 별도 수정제안(`corrections`류) 컬렉션이 없어 신설 시 CANON 위반이 된다.

### 10.2 처리 흐름

```
회원이 reports 생성(targetType="material", reason="wrong_info", 본문에 수정 제안 기재)
  → moderator/admin이 /admin/reports에서 확인
  → resolveReport 호출
  → (반영 시) setMaterialStatus로 needs_revision 전환
  → 원저자에게 material_status_changed 알림
  → 반영 완료 시 report.status = "resolved"
```

### 10.3 레포지토리 콘텐츠(강의/용어)에 대한 제안

CANON `TargetType`은 `post | material`로 고정되어 있어 레포지토리 콘텐츠(예: `/learn/...` 강의, `src/content/glossary.ts` 용어)는 `reports`의 대상이 될 수 없다. V1은 `/verification` 페이지의 기존 정적 안내(Instagram DM `@ju0o___`, 저장소 GitHub Issue `[content]`/`[outdated]` 태그)를 그대로 유지한다. 이 경로를 `reports`로 통합하는 방안은 §17 OPEN-03으로 남긴다.

### 10.4 반영 시 기여자 표기

제안이 실제 반영되어 자료가 수정되면, 자료 상세 페이지 원저자 표기 줄 아래에 "제안: {제안자 표시명}"을 추가로 표기한다. 신고자 익명성은 별도로 보장하지 않는다(`reports`는 원래 `moderator` 이상에게 공개되므로 신규 프라이버시 이슈가 아니다).

---

## 11. 카테고리 운영 정책

### 11.1 신설 신청 요건(확정 5개 필수 항목)

`categoryRequests` 제출 시 아래 5개 필드를 모두 채워야 제출(`RequestStatus == "submitted"`)이 성립한다.

1. 카테고리명(slug, 영문 소문자·하이픈만 허용)
2. 표시 이름(한글)
3. 카테고리 종류(`CategoryKind`: `community` 또는 `material`)
4. 신설 사유(300자 이상)
5. 예상 월간 게시물 수(숫자)

### 11.2 승인 기준(확정)

아래 3개 조건을 **모두** 충족해야 `admin`이 승인(`RequestStatus == "approved"`)한다.

1. 기존 카테고리(CANON G절 총 14개: `community` 8개 + `material` 6개)와 목적이 중복되지 않음
2. 예상 월간 게시물 수 10건 이상
3. 신청자가 `trusted_member` 이상이거나, `moderator` 이상의 추천 1건을 동반

### 11.3 거절 사유 템플릿(고정 문구)

`RequestStatus == "rejected"` 처리 시 아래 중 해당하는 코드를 반드시 함께 기록한다.

- `REJ-01`: 기존 카테고리 '{slug}'와 목적이 중복됩니다.
- `REJ-02`: 예상 게시물 수가 월 10건 미만으로 운영 실효성이 낮습니다.
- `REJ-03`: 신청 자격(trusted_member 이상 또는 moderator 추천) 요건을 충족하지 않습니다.
- `REJ-04`: 신설 사유가 300자 미만이거나 카테고리 목적이 불명확합니다.

### 11.4 카테고리 보관(archive) 시 기존 글 처리

`CategoryStatus`가 `archived`로 전환된 카테고리에 속한 기존 `posts`/`materials`는 삭제·이동하지 않고 그대로 유지한다. 신규 글 작성 폼의 카테고리 선택지에서는 제외한다. `/community`, `/materials` 목록의 카테고리 필터에서 `archived` 카테고리는 기본 숨김이지만, `?category=slug` 직접 접근 시 기존 글은 정상 노출된다.

---

## 12. 태그 정책

### 12.1 자유 태그 채택(확정, 근거)

V1은 **자유 입력 태그**를 채택한다(통제 어휘 방식 기각). 근거: 통제 어휘 관리(승인 큐, 동의어 정리, 지속적 정비)는 `ai-ops/README.md`가 전제하는 1인 운영 체제(사람 = Chief AI Orchestrator)에 추가 운영 부담이며, CANON D-010이 "포인트/뱃지/랭킹" 등 부가 운영 요소를 V1 비목표로 명시한 것과 같은 원칙을 태그 승인 시스템에도 적용한다.

### 12.2 태그 규칙(확정)

| 항목 | 규칙 |
|---|---|
| 개수 상한 | `posts`/`materials` 각 최대 5개 |
| 정규화 | 저장 전 소문자 변환 + 공백을 하이픈으로 치환(예: "Prompt Engineering" → `prompt-engineering`). 한글 태그는 소문자 변환 없이 하이픈 치환만 적용 |
| 금지 태그 | 카테고리 슬러그와 동일한 문자열, §14 금지 콘텐츠 관련 단어, 특수문자만으로 구성된 태그 |
| 용어사전 연결 | V1은 연결하지 않는다(자동 매칭 없음). `glossary.ts`의 `term`은 정식 한글 명칭 기준이고 태그는 자유 입력이라 자동 매칭 시 오매칭 위험이 크다. 용어 연결은 §13의 `[[용어명]]` 표기로만 처리한다 |

---

## 13. 용어사전·Atlas와 커뮤니티 연결

### 13.1 커뮤니티 글에서 용어 참조

본문 마크다운에서 `[[용어명]]` 표기를 사용하면, 저장 시 클라이언트가 `src/content/glossary.ts`의 `term` 배열과 **정확히 일치**하는 경우에만 `/glossary#{term}` 링크로 자동 치환한다. 일치하지 않으면 일반 텍스트로 남기고 에러를 표시하지 않는다.

### 13.2 용어 상세 페이지의 관련 커뮤니티 글 노출 규칙

`/glossary` 상세 뷰에 "이 용어를 다루는 커뮤니티 글" 섹션을 추가한다.

| 항목 | 규칙 |
|---|---|
| 대상 | `status == "published"`인 `posts` 중 본문에 해당 용어의 `[[용어명]]` 링크가 포함된 글 |
| 정렬 | `likeCount` 내림차순 |
| 개수 상한 | 최대 5건 |

### 13.3 잘못된 용어 사용 발견 시 처리

`moderator`가 발견하면 별도 상태 변경 없이 `comments`(`targetType == "post"`)에 정정 코멘트를 남긴다. 동일 작성자가 3회 이상 반복하면 §10의 `reports`(`reason == "wrong_info"`)로 정식 이관한다.

---

## 14. 금지 콘텐츠 목록(확정 9개 + 조치 수위)

| 번호 | 항목 | 조치 수위 |
|---|---|---|
| 1 | 스팸·광고성 도배 | 즉시 `hidden`(`posts`) 또는 `archived`(`materials`), `reports`(`reason == "spam"`) 자동 생성, 3회 누적 시 `suspendUser` |
| 2 | 욕설·혐오·차별 표현 | 즉시 `hidden`/`archived`, `reports`(`reason == "abuse"`), 1회부터 `suspendUser` 검토 대상 |
| 3 | 불법 콘텐츠(불법 다운로드·크랙·저작권 우회 도구 안내 등) | 즉시 삭제(`deleted`/`archived`), `reports`(`reason == "illegal"`), 계정 즉시 `suspendUser` |
| 4 | 저작권 침해(§8 기준 위반) | §8.3의 3단계 조치 |
| 5 | 개인정보 노출(제3자 실명·연락처·주소 등 무단 게재) | 즉시 `hidden`/`archived`, `reports`(`reason == "other"`), 작성자에게 삭제 요청 알림 |
| 6 | 카테고리 목적과 무관한 정치·종교 논쟁 유도 | `hidden` 처리, 재게시 시 `needs_revision` 수준 경고 |
| 7 | 타 회원 비방·저격 게시물 | 즉시 `hidden`, `reports`(`reason == "abuse"`), 반복 시 `suspendUser` |
| 8 | 사전 협의 없는 상업적 홍보(유료 서비스·제품 판매 유도) | `hidden` 처리. `tool-review` 카테고리는 후기 목적에 한해 허용하되 판매 링크 삽입 시 위반 |
| 9 | 동일 글 5개 이상 카테고리 대량 크로스포스팅 | 중복분 `hidden`, 원본 1건만 유지, `reports`(`reason == "spam"`) |

---

## 15. 콘텐츠 품질 최소 요건

### 15.1 `posts`

| 항목 | 기준 |
|---|---|
| 제목 | 5자 이상 60자 이내 |
| 본문 | 최소 30자 |
| 필수 필드 | `title`, `bodyMarkdown`(markdown), `category`(CANON G절 `community` 카테고리 중 하나), `authorUid`, `createdAt` |

### 15.2 `materials`

| 항목 | 기준 |
|---|---|
| 제목 | 5자 이상 80자 이내 |
| 본문 | 최소 200자 |
| 필수 필드 | `title`, `description`(markdown), `category`(CANON G절 `material` 카테고리 중 하나), `authorUid`, `status`, `createdAt` |
| 추가 규칙 | §8.2 출처·저작권 규칙 준수(AI 생성 표기 포함) |

---

## 16. 운영자 검토 부하 관리

| 항목 | 기준(확정) |
|---|---|
| 검토 대기 큐 상한 | `pending_review` 상태 `materials` 동시 300건. 300건 도달 시에도 신규 제출 자체는 막지 않되, 작성 화면에 "검토 지연 예상" 안내 배너를 노출한다 |
| 우선순위 규칙 | `createdAt` 오름차순(선입선출)이 기본. `trusted_member`가 추천 코멘트를 남긴 자료는 목록 최상단에 고정 노출(CANON C절 "신고 가중치"와는 별개 규정) |
| 자동 아카이브 기준 | `pending_review` 상태로 30일 경과 시 자동 `archived` 전환 + 작성자에게 `material_status_changed` 알림(재제출 시 `pending_review`로 복귀 가능). `needs_revision` 상태로 60일 경과 시에도 동일하게 자동 `archived` |

---

## 17. 미결정 사항

- **OPEN-01**: `posts → materials` 전환 동의를 기록할 정식 필드(`sourcePostId`, `authorConsentAt`)가 CANON D/E절에 없다. V1 임시 해법은 §7의 시스템 코멘트 방식. 정식 필드 추가는 데이터 모델 문서(`./05-DATA-MODEL-SSOT.md`) 갱신과 CANON 개정이 선행되어야 한다.
- **OPEN-02**: `materials`의 구조화 출처(`sources`) 필드가 CANON에 없다. V1 임시 해법은 §8.2의 본문 `## 참고 자료` 섹션 방식.
- **OPEN-03**: 레포지토리 콘텐츠(강의·용어) 오류 신고가 `reports` 대상이 될 수 없다(`TargetType`이 `post | material`로 고정). V1은 `/verification` 페이지의 기존 정적 안내를 유지(§10.3). `TargetType`에 `lesson` 등을 추가할지는 CANON 개정 사안.
- **OPEN-04**: `MaterialStatus` 6개 상태를 Badge 4개 variant에 매핑하면서 2개 쌍(`pending_review`/`needs_revision`, `draft`/`archived`)이 variant를 공유한다(§2.3). `Badge` 컴포넌트에 `warning`/`danger` variant를 신설할지는 UI 컴포넌트 변경 범위이므로 이 문서에서 확정하지 않는다.
- **OPEN-05**: §6.1 "검토자 수" 조건을 "moderator 1인 이상 사전 추천 + admin 최종 확정"으로 단순화했다. 원 요구가 "서로 다른 2인 이상의 검토자"를 의미했는지, `moderator` 1인 + `admin` 1인 조합으로 충분한지는 운영 개시 후 재확인이 필요하다.
