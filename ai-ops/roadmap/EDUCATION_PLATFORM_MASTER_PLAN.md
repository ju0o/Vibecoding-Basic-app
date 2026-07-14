# Education Platform Master Plan

```yaml
document: EDUCATION_PLATFORM_MASTER_PLAN
status: operator_review_required
authority: project_direction_ssot_candidate
priority_over_previous_goal: true
product: education_materials
site_role: viewer
modifies_core_21_concepts: false
deletes_existing_atlas: false
can_activate_build_plan: false
date: 2026-07-14
```

---

## 1. 프로젝트 목적 (재정의)

| | 이전 | 이후 (이번 정본 후보) |
|---|---|---|
| Goal | AI Engineering Atlas V2 인터랙티브 사이트 완성 | 비개발자를 위한 **AI · 바이브코딩 교육자료를 AI와 함께 연구·제작** |
| Product | 웹 사이트 / Atlas | **교육자료** (Curriculum · Lesson · Practice · Animation · Quiz) |
| Site | 제품 본체 | **Viewer** — 교육자료를 보여주는 창 |
| 완성 정의 | 기능·라우트·빌드 통과 | 학생이 Day 1부터 **이해하며** 끝까지 갈 수 있는가 |

> **이 문서의 Goal은 기존 “Atlas 중심 사이트 제작 Goal”보다 운영 우선순위가 높다.**  
> 다만 기존 Atlas 코드·콘텐츠는 **삭제·폐기하지 않고** Knowledge Layer로 유지한다.

---

## 2. 핵심 철학 — Living Education Project

이 프로젝트는 완성된 백과사전을 한 번에 찍는 일이 아니다.

- AI · 운영자 · (향후) 커뮤니티가 **함께 공부**한다.
- 틀리거나 부족할 수 있다. **공식 문서와 실제 학습 경험**으로 계속 검증한다.
- “사이트에 올렸다 = 끝”이 아니라, **검증·수정 루프가 제품**이다.

모든 의사결정의 최우선 질문:

```text
학생이 정말 이해할 수 있는가?
```

---

## 3. 운영 원칙 — Website Last

**절대로 사이트를 먼저 만들지 않는다.**

```text
Research
  → Verification
  → Curriculum
  → Education Content (학생용 본문)
  → Practice
  → Animation
  → Quiz
  → Website (Viewer)
```

Website Builder / UI 구현은 **항상 마지막**이다.

---

## 4. 레이어 모델

```text
┌─────────────────────────────────────────┐
│  Learning Path (MAIN)                   │  Day 1 → … 실습 중심 코스
├─────────────────────────────────────────┤
│  Courses / Tools / Projects             │  기초반 · 도구 · 프로젝트
├─────────────────────────────────────────┤
│  Atlas (Knowledge / Reference Layer)    │  개념 심화 · Graph · Timeline · MR
├─────────────────────────────────────────┤
│  Wiki (Index) · Textbook (Depth)        │  기존 100강 · glossary
├─────────────────────────────────────────┤
│  Knowledge Base (Evidence)              │  approved KB · sources
├─────────────────────────────────────────┤
│  Website Viewer                         │  Next.js static export
└─────────────────────────────────────────┘
```

| Layer | 역할 | 현재 저장소 자산 (유지) |
|---|---|---|
| Learning Path | 메인 학습 순서 | **신규 설계** (본 문서 묶음) |
| Courses | 코스 묶음 | curriculum 모듈 재해석 |
| Atlas | 심화 이론 Reference | `/atlas/**`, 21 Concept, Studio, Model Routing |
| Wiki | 빠른 용어 | `/glossary` |
| Textbook | 깊은 설명 | `/lessons/**`, 100강 |
| KB | 근거 | `ai-ops/knowledge-base/**` |
| Studio | 제작·완성도 운영 | `/atlas/studio` → **Education Studio로 확장 개념** |

---

## 5. 기존 Atlas 처리 (삭제 금지)

| 자산 | 처리 |
|---|---|
| 21 Concept · 14-section chapters | **유지** — Knowledge Layer 정본 계약 |
| Roadmap `/atlas` | 유지 · 메인 홈에서 “심화 참고”로 링크 |
| Concept Passport · Why Bridge | 유지 · 코스 강의에서 딥링크 |
| Graph · Timeline | 유지 · Reference 탐색 |
| Model Routing + Simulator | 유지 · 심화/운영 학습 경로 |
| Education Studio | 유지 · **교육자료 제작 현황 보드**로 역할 강화 (현황·검증·출처·최근 수정·다음 작업·피드백) |
| Foundation content (AI→LLM) | 유지 · Learning Path 초기 노드와 연결 예정 |

**폐기하는 것:** “Atlas 페이지를 채우는 것이 곧 제품 완성”이라는 **목표 정의**  
**폐기하지 않는 것:** Atlas 구현물·콘텐츠 파일

Studio 보드 상세 명세: [CONTENT_PIPELINE.md §7](./CONTENT_PIPELINE.md).

---

## 6. AI / Agent 역할 재배치

| 단계 | 역할 | 기존 atlas-* 대응 |
|---|---|---|
| Research | 공식 문서·KB 조사 | `atlas-source-researcher` |
| Claim Verification | 주장 상태 분류 | `atlas-claim-verification` |
| Curriculum | 순서·선수·Why | `atlas-curriculum-architect` |
| Content Writer | 학생용 설명 | `atlas-content-writer` |
| Practice Designer | 실습 | (신규 스킬 후보 · 당분간 content-writer + interaction) |
| Animation Designer | 시각 단계 | `atlas-interaction-designer` |
| Quiz Designer | 체크포인트 | content-writer + quiz 패턴 |
| Independent Reviewer | 과장·오해 검토 | `atlas-independent-reviewer` |
| Website Builder | Viewer 반영 | `atlas-implementer` **최후** |

**금지:** Main/Implementer가 Research·본문 없이 페이지부터 생성.

---

## 7. 콘텐츠 매체 파이프라인

```text
CURRICULUM_MASTER.xlsx   → 전체 코스·강의 인덱스 (운영 SSOT 후보)
        ↓
Markdown                 → 학생용 원본 (repo 내 정본 텍스트)
        ↓
Word (.docx)             → 강사용 대본·인쇄 (선택 산출)
        ↓
Website                  → Viewer (Next.js)
```

코드/라우트는 Markdown이 준비되고 Review를 통과한 뒤에만 갱신한다.

---

## 8. 관련 문서 (이번 산출 묶음)

| 문서 | 역할 |
|---|---|
| [COURSE_ARCHITECTURE.md](./COURSE_ARCHITECTURE.md) | Learning Path · Courses · 사이트 IA |
| [CONTENT_PIPELINE.md](./CONTENT_PIPELINE.md) | Excel→MD→Word→Site · 상태 머신 |
| [CURRICULUM_SYSTEM.md](./CURRICULUM_SYSTEM.md) | 커리큘럼 제안·승인·Living update |
| 기존 `ATLAS-EDUCATION-LAYER.md` | Atlas Knowledge Layer 기술 계약 (21/14) — **하위 유지** |
| 기존 `ATLAS-CONTENT-OPERATIONS.md` | Studio 운영 — 본 방향에 맞게 해석 |

---

## 9. 성공 기준

1. 운영자와 AI가 “교육자료가 Product”임을 문서·STATE에서 동일하게 본다.  
2. 신규 작업이 Research→…→Website 순서를 위반하면 거절된다.  
3. Atlas는 삭제 없이 Knowledge Layer로 설명 가능하다.  
4. Learning Path 초안이 Day 1부터 배치 가능한 골격으로 존재한다.  
5. 사이트 대규모 리라이트 없이 문서 재기준만으로 다음 세션이 시작 가능하다.

---

## 10. Human Gate / 금지

- 기존 Atlas 삭제·reset·clean  
- 21 Concept / 14섹션 계약 임의 변경  
- BUILD-PLAN 활성화  
- 이번 단계에서 대형 UI/라이브러리 추가  
- push / deploy  

**다음 운영자 결정:** 본 Master Plan 승인 여부 → 승인 시 `AGENTS.md` SSOT 표 승격.

---

## 11. 한 줄 요약

> **교육자료가 Product이고, 웹사이트는 Viewer이며, Atlas는 심화 Reference이고, 우리는 Living Education Project다.**
