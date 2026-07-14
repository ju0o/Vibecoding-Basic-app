# Content Pipeline

```yaml
parent: EDUCATION_PLATFORM_MASTER_PLAN.md
authority: content_pipeline_ssot_candidate
status: operator_review_required
date: 2026-07-14
website_last: true
```

---

## 1. 매체 사슬 (고정)

```text
CURRICULUM_MASTER.xlsx
        ↓  코스·강의·순서·상태 인덱스
Markdown (repo)
        ↓  학생용 원본 정본
Word (.docx)  [optional]
        ↓  강사용 대본·인쇄
Website Viewer
        ↓  Next.js static export
```

| 매체 | 역할 | 누가 고치나 |
|---|---|---|
| Excel | 전체 맵 · 상태 · 담당 · 의존성 | 운영자 + Curriculum Agent 제안 |
| Markdown | 학생 본문 · 실습 · 퀴즈 원문 | Content / Practice / Quiz roles |
| Word | 강의 스크립트 · 타이밍 | 운영자 선택 |
| Website | 렌더 · 네비 · Studio 현황 | Implementer **최후** |

**코드/라우트 변경은 Markdown(+검증) 없이 시작하지 않는다.**

---

## 2. 제작 Workflow (필수)

```text
학생 질문 / 학습 목표
  → Research (공식 문서 · approved KB)
  → Claim Verification (status tags)
  → Curriculum (선수 · 다음 · Why)
  → Education Content (쉬운 설명)
  → Practice
  → Animation
  → Quiz
  → Independent Review
  → Publish to Viewer (Website)
```

| 단계 | Agent (기존) | 산출 |
|---|---|---|
| Research | atlas-source-researcher | claim 표 · URL · checked_at |
| Verification | claim-verification skill | allow / rewrite / drop |
| Curriculum | atlas-curriculum-architect | 순서 · Why Bridge |
| Content | atlas-content-writer | Markdown 본문 |
| Practice | content-writer (+ practice skill 후보) | 실습 체크리스트 |
| Animation | atlas-interaction-designer | StepPlayer 시나리오 · SVG 스펙 |
| Quiz | content-writer | checkpoint · teach-back |
| Review | atlas-independent-reviewer | approve_merge / revise / block |
| Website | atlas-implementer | Viewer 반영 · 링크 |

---

## 3. Claim 상태 (학생 본문 규칙)

| Tag | 학생 본문 |
|---|---|
| `approved_kb` | 사용 가능 · KB 연결 |
| `official_verified` | 사용 가능 · 확인일 권장 |
| `primary_research` | 요약 가능 · 과장 금지 |
| `interpretation` | 교육 해석임을 문맥상 분명히 |
| `educational_example` | 예시로 명시 |
| `unverified` | **확정형 금지** |

X = 후보 탐색만. 단독 확정 금지.

---

## 4. 저장 위치 (현재 repo · 이동 금지 원칙)

| 콘텐츠 | 경로 |
|---|---|
| Path/Course 인덱스 (예정) | `ai-ops/curriculum/CURRICULUM_MASTER.xlsx` (신설 예정 · 승인 후) |
| 기존 모듈 맵 | `ai-ops/roadmap/CURRICULUM-MAP.md`, `src/content/curriculum.ts` |
| 학생 강의 MD | `src/content/lessons/markdown/**` |
| Atlas 개념 본문 | `src/content/atlas/chapters/**` |
| Atlas 메타 | `src/content/atlas.ts` |
| Model Routing | `src/content/model-routing/**` |
| Wiki | `src/content/glossary.ts` |
| KB | `ai-ops/knowledge-base/entries/**` |
| Studio 상태 | derived: `src/lib/atlas/content-manifest.ts` |

원문을 여러 위치에 복사하지 않는다. Viewer와 Studio는 **참조**만 한다.

---

## 5. 상태 머신 (강의/노드 단위)

```text
not_started
  → researching
  → source_verified
  → drafting
  → reviewing
  → published_locally   (dev Viewer 반영)
  → (optional) published_public  [Human deploy gate]
```

Studio의 workflow 배지는 이 머신과 맞춘다 (추론값이면 `inferred` 표시 유지).

---

## 6. 완성도 (기존 Studio 정책과 정합)

섹션·Passport·Why·Quiz·Sources·Interactive·Wiki/KB 가중치는  
`src/lib/atlas/completeness.ts` 의 `COMPLETENESS_WEIGHTS`를 따른다.

Path 노드 완성도는 별도 필드로 확장 예정:

```text
path_node_complete =
  content + practice + quiz
  (+ animation if required by node type)
```

---

## 7. Studio — 교육자료 제작 현황 보드

기존 `/atlas/studio`를 **폐기하지 않고** 확장 개념으로 유지한다.  
Studio는 “예쁜 대시보드”가 아니라 **제작·검증·다음 작업**을 한눈에 보는 ops 보드다.

| 보드 영역 | 보여 줄 것 | 현재/예정 소스 |
|---|---|---|
| **교육자료 제작 현황** | Path 노드·Concept·강의의 draft/review/published | Excel status + content-manifest |
| **검증 상태** | claim/source 검증 단계 · Review 결과 | claim tags · reviewer notes |
| **출처** | official URL · KB id · checked_at | sources frontmatter · KB links |
| **최근 수정** | 누가/무엇을/언제 고쳤는지 | git + Studio “last modified” 필드 |
| **다음 작업** | 다음 Research / Write / Review 후보 | STATE NEXT · Excel owner 열 |
| **학생 피드백** | 막힌 지점 · 오해 · 요청 주제 | `ai-ops/reports/feedback/` (승인 후) |

### Studio 운영 규칙

1. 원문(Markdown)을 Studio에 복제하지 않는다 — **경로·상태·점수만** 표시한다.  
2. 추론(inferred) 배지는 그대로 유지하고, 확정 상태와 구분한다.  
3. Website Builder 전에 Studio에서 “본문 준비 여부”를 확인할 수 있어야 한다.  
4. Path 노드 열이 추가되기 전까지는 Concept/lesson completeness로 운영한다 (구현 Wave 별도).  
5. 학생 피드백은 DB 없이 리포트 폴더로 시작하고, 커리큘럼 Living 루프에 연결한다.

---

## 8. Website 반영 규칙

Implementer 착수 조건:

1. Independent Reviewer `approve_merge` 또는 운영자 명시 승인  
2. Markdown 경로 확정  
3. allowlist 경로만 수정  
4. `npm run verify` (해당 변경 범위)

금지: 빈 페이지·placeholder 라우트를 “콘텐츠 완료”로 보고.

---

## 9. Excel 스키마 초안 (CURRICULUM_MASTER)

| Column | 의미 |
|---|---|
| track_id | foundation / tools / web / ship / agency / project |
| node_id | 고유 ID |
| order | Path 순서 |
| title | 학생용 제목 |
| type | lesson / lab / atlas_ref / tool / project / checkpoint |
| markdown_path | repo 상대 경로 |
| atlas_concept_ids | 연결 Knowledge (optional, comma) |
| status | 상태 머신 값 |
| source_status | verified / partial / … |
| owner | human / agent role |
| last_verified | YYYY-MM-DD |

파일은 Master Plan 승인 후 `ai-ops/curriculum/`에 생성한다. **이번 문서 단계에서는 xlsx 파일을 강제 생성하지 않아도 된다** (스키마만 확정).

---

## 10. 성공 기준

1. 신규 작업 티켓이 Workflow 단계를 명시한다.  
2. Website 작업이 Content 단계보다 앞에 오면 거절된다.  
3. unverified claim이 학생 본문에 확정형으로 들어가지 않는다.  
4. Studio가 제작 현황·검증·출처·최근 수정·다음 작업·피드백 경로를 운영자에게 보여 준다.
