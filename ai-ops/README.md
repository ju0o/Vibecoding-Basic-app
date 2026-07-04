# ai-ops — AI Vibe Coding Master 콘텐츠 운영 시스템

> **DESIGN FREEZE (2026-07-04)** — 설계 종료. 새 Agent·Workflow·Skill·Prompt 추가 금지. 운영은 [OPERATION_MANUAL.md](OPERATION_MANUAL.md), 현황은 [DASHBOARD.md](DASHBOARD.md) / [MASTER_PROGRESS.md](MASTER_PROGRESS.md), 변경은 [reports/DESIGN-FREEZE.md](reports/DESIGN-FREEZE.md)의 규칙으로만.

이 폴더는 **AI 조직(Agents)이 강의·용어·퀴즈 콘텐츠를 대량 생산하고 유지보수하기 위한 운영 문서**입니다.
사람(운영자)은 Chief AI Orchestrator 역할을 하고, 실제 작업은 3개 Executor — **Codex(수집·검증·생성·반영), Cline(빌드 판정·릴리스), Fable(기획·QA·최종 검토)** — 에게 분배합니다. (2026-07-04 정책: Trae 제외 확정)

## 핵심 원칙

1. **Executor 독립성** — Agent와 Workflow는 특정 AI에 종속되지 않는다. 모든 지시는 `prompts/`의 표준 프롬프트로 전달하고, 모든 산출물은 `outputs/`의 파일로 주고받는다. Executor가 바뀌어도 프롬프트와 파일 규격은 그대로다.
2. **파일 기반 핸드오프** — Agent 간 통신은 대화가 아니라 파일이다. 각 단계의 산출물 파일이 다음 단계의 입력이 된다.
3. **작성자 ≠ 검증자** — 강의를 쓴 Executor가 그 강의를 검증하지 않는다. 반드시 다른 Executor(또는 다른 세션)가 검증한다.
4. **단일 작성자 구역(Single-Writer Zone)** — `curriculum.ts`, `glossary.ts` 같은 공유 파일은 한 번에 하나의 Agent만 수정한다. 병렬 생산은 강의 단위(slug 단위)로만 한다.
5. **품질 게이트 통과 전 사이트 반영 금지** — `qa/QA-GATES.md`의 게이트를 통과하지 못한 콘텐츠는 `src/content/`에 들어갈 수 없다.

## AI 조직도

```
┌─────────────────────────────────────────────────────────────┐
│ Executive Layer                                             │
│   Chief AI Orchestrator (사람 + 메인 Claude 세션)            │
│   - 우선순위 결정, Executor 배정, 게이트 승인                 │
├─────────────────────────────────────────────────────────────┤
│ Planning Layer                                              │
│   Source Collector ── Curriculum Agent ── Research Agent    │
│   (주제 단위 수집)     (무엇을, 어떤 순서로)  (강의 단위 브리프)  │
├─────────────────────────────────────────────────────────────┤
│ Production Layer (강의 단위 병렬 실행 가능)                    │
│   Lesson Writer Agent ── Quiz Agent ── Terminology Agent    │
│   (13섹션 본문)          (퀴즈/설명연습)  (용어 정의)           │
├─────────────────────────────────────────────────────────────┤
│ Verification Layer                                          │
│   Fact Check Agent ── Education Review Agent ── QA Agent    │
│   (사실/출처 검증)      (교육 품질/난이도)       (규격/중복/일관성)│
├─────────────────────────────────────────────────────────────┤
│ Release Layer (순차 실행 전용)                                │
│   Site Integration ──→ Release ──→ Final Editorial          │
│   (src/content 반영)    (verify+배포)  (사이트 전역 편집·주기 실행)│
└─────────────────────────────────────────────────────────────┘
```

전체 운영 계획과 문서 지도: [MASTER-PLAN.md](MASTER-PLAN.md)

## 폴더 구조

```
ai-ops/
  README.md               ← 이 문서 (조직도 + 원칙)
  MASTER-PLAN.md          전체 운영 계획 (문서 지도)
  PARALLEL-STRATEGY.md    병렬/순차 작업 전략
  ROADMAP.md              Phase별 로드맵
  knowledge-base/         ★ Single Source of Truth — 모든 콘텐츠의 원천
    entries/{Txx}/        KB 문서 (개념 1개 = 파일 1개)
    reviews/              검증 보고서, Knowledge Score, 재수집 요청서
  agents/                 Agent 정의서
  workflows/              WF-06(마스터), WF-02~05 (WF-00·01은 superseded)
  skills/                 재사용 작업 단위 (SK-01~08)
  prompts/                ★ 운영 순서대로 번호 부여 (P-01~08 + O-01·02, 구판은 archive/)
  executors/              Executor 배정 (Codex/Cline/Fable 3원 체제)
  qa/                     QA-GATES, KNOWLEDGE-SCORE
  outputs/                강의 산출물 (00-backlog ~ 04-integrated, PIPELINE.md)
  sources/                출처 등록부, 수집 계획
  roadmap/                커리큘럼 지도, 최종 완성 전략
  reports/                파일럿·편집·대시보드 보고서
```

## 콘텐츠 생애주기 (KB 체제 — 요약)

```
O-01 커리큘럼 결정 (Fable)
  → P-01 KB 수집·생성 (Codex 수집 세션, 개념 간 병렬)
  → P-02 검증·Knowledge Score (Codex 검증 세션 — 수집과 분리) ⇄ P-03 재수집 루프 (최대 2회)
  → Fable: 검증 보고서 승인 (QA 게이트)
  → P-04 Lesson 생성 (Codex, approved KB만 입력)
  → P-05 사이트 반영 (Codex, 순차 전용)
  → P-06 빌드 검증 (Cline) ⇄ P-07 수정 루프 (Codex, 최대 2회)
  → P-08 릴리스 (Cline) → 운영자 배포 승인
  → O-02 최종 편집 (Fable, 강의 10개마다)
```

상세: [workflows/WF-06-knowledge-pipeline.md](workflows/WF-06-knowledge-pipeline.md) / 실행 매뉴얼: [prompts/README.md](prompts/README.md)

## 시작하는 법

1. [prompts/README.md](prompts/README.md)의 실행 순서를 연다 — 프롬프트 번호가 곧 운영 순서다.
2. 프롬프트의 `{중괄호}`를 채워 표에 지정된 Executor에 붙여넣는다.
3. 완료 보고에서 산출물 파일 존재를 확인하고 `outputs/PIPELINE.md`를 갱신한다.
4. 다음 번호의 프롬프트로 넘어간다 (루프 발생 시 P-03/P-07).
