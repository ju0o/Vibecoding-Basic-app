# Learning Platform Asset Migration Audit

```yaml
document: LEARNING-PLATFORM-ASSET-MIGRATION-AUDIT
date: 2026-07-14
delete_forbidden: true
judgments:
  - KEEP_CURRENT_ROUTE
  - MOVE_NAVIGATION_ONLY
  - CONNECT_TO_LEARNING_PATH
  - CONNECT_TO_TOOL_LIBRARY
  - CONNECT_TO_TECH_LIBRARY
  - CONNECT_TO_VERIFICATION
  - ARCHIVE_BUT_PRESERVE
  - DUPLICATE_REQUIRES_REVIEW
  - DELETE_REQUIRES_HUMAN
```

---

## 1. 요약

| 지표 | 값 |
|---|---|
| 조사일 | 2026-07-14 |
| 앱 라우트(page) | 홈·Atlas·curriculum·lessons·glossary·resources·model-routing·learn/day-1·약관 등 |
| Day1 신규 Path | `/learn/vibe-coding-foundation/day-1` — **보존·기준 구현** |
| 삭제 권고 | **0** (이번 Wave) |
| 즉시 코드 이동 | **0** (문서 Wave) |

**재사용 비율 (추정):** 기존 교육·Atlas·교재 자산 **≥90% 경로 유지**. 변경은 주로 **내비·홈 CTA·연결 메타**.

---

## 2. Route 인벤토리

| 현재 경로 | 현재 역할 | 새 역할 | 판정 | Migration |
|---|---|---|---|---|
| `/` | Atlas/커리큘럼 혼합 홈 | Learning Path 홈 | MOVE_NAVIGATION_ONLY (+ Home rewrite 별도 Wave) | 홈 카피·CTA 교체 계획 |
| `/about` | 소개 | 소개 유지 | KEEP_CURRENT_ROUTE | Living 문구 정렬 가능 |
| `/curriculum` | 13모듈+100강 탐색 | 전체 학습 지도 | CONNECT_TO_LEARNING_PATH | 배너→/learn·Day1 강화 |
| `/lessons/[slug]` | Textbook Deep Dive | Textbook | KEEP_CURRENT_ROUTE + CONNECT_TO_LEARNING_PATH | Node 역링크 메타 추후 |
| `/glossary` | Wiki 용어 | Wiki | KEEP_CURRENT_ROUTE | 내비 더보기로 |
| `/resources` | 공식 문서 링크 | 출처 허브 보조 | CONNECT_TO_VERIFICATION | /verification 과 교차 |
| `/atlas` | Atlas 허브 | Knowledge Layer | KEEP_CURRENT_ROUTE | 메인 내비 Reference 라벨 |
| `/atlas/[nodeId]` | 레거시 노드 | 유지 | KEEP_CURRENT_ROUTE | concepts와 중복 검토 |
| `/atlas/concepts/[id]` | 21 Concept | 유지 | KEEP_CURRENT_ROUTE | 역링크 계약 추후 |
| `/atlas/graph` | Graph | 유지 | KEEP_CURRENT_ROUTE | |
| `/atlas/timeline` | Timeline | 유지 | KEEP_CURRENT_ROUTE | |
| `/atlas/studio/**` | Content Studio | Education Studio 확장 후보 | KEEP_CURRENT_ROUTE | Studio evolution plan |
| `/model-routing/**` | MR 학습·시뮬 | Atlas 산하 심화 | KEEP_CURRENT_ROUTE | /atlas에서 진입 강화 |
| `/learn/.../day-1` | Day1 통합 학습 | Start + Learn 핵심 | KEEP_CURRENT_ROUTE + CONNECT_TO_LEARNING_PATH | **/start 허브가 링크** |
| `/privacy` `/terms` `/license` | 정책 | 유지 | KEEP_CURRENT_ROUTE | |

### 신규 예정 (미구현)

| 경로 | 판정 |
|---|---|
| `/start` | 신규 · Day1 중복 페이지 금지 |
| `/learn` | 신규 Track 인덱스 |
| `/tools` `/tools/[slug]` | 신규 · 대량 생성 금지(이번) |
| `/technologies` `/technologies/[slug]` | 신규 · 동일 |
| `/lab` `/lab/[slug]` | 신규 · Day1 deep-link |
| `/verification` | 신규 정적 |

---

## 3. 콘텐츠·코드 자산

| 자산 | 위치 | 새 역할 | 판정 |
|---|---|---|---|
| Day1 student MD | `content/courses/.../01-first-success.md` | Learning Node SSOT | CONNECT_TO_LEARNING_PATH |
| Day1 practice/assessment/interaction | `content/**` | Lab·Quiz·Anim 스펙 | CONNECT_TO_LEARNING_PATH |
| Day1 instructor | `content/instructor/**` | optional archive | ARCHIVE_BUT_PRESERVE |
| Day1 sample | `examples/day1-first-success/` | Lab sample | CONNECT_TO_LEARNING_PATH |
| Day1 interactive React | `src/features/learning-interactions/**` | 기준 구현 | KEEP + Lab 카탈로그 연결 |
| Curriculum CSV/XLSX | `ai-ops/curriculum/**` `exports/curriculum/**` | Living curriculum | KEEP · 확장 스키마 |
| 100 lessons MD | `src/content/lessons/markdown/**` | Textbook | KEEP · Path 매핑 추후 |
| curriculum.ts modules | `src/content/curriculum.ts` | 모듈 지도 | CONNECT_TO_LEARNING_PATH (Track 매핑) |
| glossary | `src/content/glossary.ts` | Wiki | KEEP |
| Atlas chapters | `src/content/atlas/**` | Knowledge | KEEP · 역링크 계획 |
| Model routing content | `src/content/model-routing/**` | Atlas 심화 | KEEP |
| resources | `src/content/resources.ts` | 출처 링크 | CONNECT_TO_VERIFICATION |
| Progress/localStorage | `src/features/progress/**` | Continue learning | KEEP · /start 연동 계획 |
| SiteSearch | `src/features/search/**` | 통합 검색 확장 후보 | KEEP · 계획 only |
| SiteHeader NAV | `SiteHeader.tsx` | Phase1 보호 주의 | MOVE_NAVIGATION_ONLY (별도 allowlist) |
| AI-Ops KB | `ai-ops/knowledge-base/**` | Evidence | CONNECT_TO_VERIFICATION (ops) |
| Roadmap SSOT pack | Journey/Outcome/Pipeline/Animation | 교육 정책 | KEEP |
| BUILD-PLAN | HOLD | HOLD | ARCHIVE_BUT_PRESERVE · 활성화 금지 |

---

## 4. 중복 · 위험

| 항목 | 위험 | 조치 |
|---|---|---|
| `/atlas/[nodeId]` vs `/concepts` | 이중 진입 | DUPLICATE_REQUIRES_REVIEW · 삭제 금지 |
| `/learn` vs `/curriculum` vs `/lessons` | 학생 혼란 | 역할 분리 문구 |
| 홈 CTA → orientation lesson | Day1 Path와 불일치 | Home Plan: Day1 우선 CTA |
| SiteHeader 수정 | Phase1 dirty | 명시 allowlist Wave |
| Tool 페이지 미검증 가격 | 허위 정보 | Verification policy 필수 |
| Day1 페이지 복제 | 드리프트 | **금지** |

---

## 5. Migration 필요 여부 (구현 Wave 순서 제안)

1. Home CTA + `/start` 허브 (Day1 링크)  
2. Nav 교체 (Start/Learn 중심)  
3. `/learn` Track 스켈레톤 (콘텐츠 없이 지도)  
4. Lab 인덱스 → Day1 deep-link  
5. Verification 정적 페이지  
6. Tools/Tech **템플릿 1개 + 소수 검증 엔트리** (대량 금지)  
7. Atlas 역링크 메타 점진  

**Rollback:** 구 내비 플래그 또는 구 홈 섹션 복구 · 기존 URL 유지.

---

## 6. 삭제

`DELETE_REQUIRES_HUMAN` 항목 **없음**. 전 자산 보존.
