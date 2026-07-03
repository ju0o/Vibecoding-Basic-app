# ai-ops — AI Vibe Coding Master 콘텐츠 운영 시스템

이 폴더는 **AI 조직(Agents)이 강의·용어·퀴즈 콘텐츠를 대량 생산하고 유지보수하기 위한 운영 문서**입니다.
사람(운영자)은 Chief AI Orchestrator 역할을 하고, 실제 작업은 여러 AI Executor(Claude Fable 5, GPT-5.5 Codex, Trae, Cline)에게 분배합니다.

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
│   Curriculum Agent ──── Research Agent                      │
│   (무엇을, 어떤 순서로)   (근거 자료 수집)                     │
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
│   Site Integration Agent ──→ Release Agent                  │
│   (src/content 반영)          (verify + 배포)                │
└─────────────────────────────────────────────────────────────┘
```

## 폴더 구조

```
ai-ops/
  README.md               ← 이 문서 (조직도 + 원칙)
  PARALLEL-STRATEGY.md    병렬/순차 작업 전략
  ROADMAP.md              Phase별 로드맵 + 구현 우선순위
  agents/                 Agent 정의서 (목적/책임/입출력/DoD)
  workflows/              단계별 Workflow 정의
  skills/                 재사용 가능한 작업 단위 (Skill)
  prompts/                복붙용 프롬프트 라이브러리
  executors/              Executor 배정, 강점/한계, 교체 설계
  qa/                     품질 게이트, 검수 체크리스트
  outputs/                파이프라인 작업 산출물 (핸드오프 파일)
    00-backlog/           강의 아이디어 대기열
    01-briefs/            리서치 브리프 (Research Agent 산출)
    02-drafts/            강의 초안 (Writer/Quiz/Terminology 산출)
    03-reviewed/          검증 통과본 (Verification Layer 산출)
    04-integrated/        사이트 반영 완료 기록
    PIPELINE.md           전체 파이프라인 상태 보드
  sources/                공식 출처 등록부 (허용 출처 목록)
```

## 강의 1개의 생애주기 (요약)

```
아이디어(00-backlog)
  → Research Agent가 브리프 작성(01-briefs/{slug}.md)
  → Lesson Writer가 13섹션 초안(02-drafts/{slug}/lesson.md)
    + Quiz Agent가 퀴즈(02-drafts/{slug}/quiz.md)          ← 병렬
    + Terminology Agent가 용어(02-drafts/{slug}/terms.md)   ← 병렬
  → Fact Check + Education Review + QA (03-reviewed/{slug}/)
  → Site Integration Agent가 src/content 반영               ← 순차(단일 작성자)
  → Release Agent가 npm run verify 후 배포
```

상세 절차: [workflows/WF-01-lesson-production.md](workflows/WF-01-lesson-production.md)

## 시작하는 법

1. `outputs/00-backlog/`에 강의 아이디어를 한 줄씩 추가한다.
2. `prompts/P-01-research.md`를 열어 slug를 채우고, 배정된 Executor에 붙여넣는다.
3. 산출물이 나오면 `outputs/PIPELINE.md`의 해당 행 상태를 갱신한다.
4. 이후 단계도 같은 방식: 프롬프트 복사 → Executor 실행 → 산출물 저장 → 보드 갱신.
