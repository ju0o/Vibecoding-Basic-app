# V3 Context Package — SubAgent 위임용 템플릿

> 작성: 2026-07-18, PM(Hermes 학습 모드)  
> 상위: `ai-ops/V3-APPENDIX.md`, `ai-ops/V3-WORKFLOW.md`  
> 역할: V3에서 SubAgent에게 작업을 위임할 때 사용하는 **최소 Context Package** 템플릿. 전체 대화 전달 금지.

---

## 1. Context Package 기본 형식 (YAML)

모든 V3 SubAgent 위임 시 아래 형식을 사용한다. 본 대화를 복사하지 말고 경로+섹션 포인터로 전달.

```yaml
goal: |
  V3.2-W{n}-{task} — {한 줄 목표}

phase: V3.2-W{n}-{task_id}
task: |
  {구체적 작업 설명. 3-5문장.}

required_ssot:
  - path: ai-ops/V3-APPENDIX.md
    section: A1~A5 (V3 작업 규칙)
  - path: ai-ops/V3-WORKFLOW.md
    section: §2 Phase Roadmap / §3 Review 루브릭
  - path: ai-ops/V3-BRAND-FUNNEL.md
    section: §3 명칭 사용 / §4 V14 출처 표기
  - path: ai-ops/V3-AGENT-MAP.md
    section: §2 역할 상세 / §5 동시성 회피
  - path: AGENTS.md
    section: §5 보호경로 / §11 쓰기가능 / §12 금지 / §16 Human Gate

allowed_paths:
  - src/content/lessons/markdown/p{n}-*.md
  - src/components/learning/v3-*.tsx
  - ai-ops/V3-*.md
  # (필요 시 추가. 보호 경로 절대 포함 금지)

forbidden_paths:
  - src/components/layout/SiteHeader.tsx
  - src/content/atlas.ts
  - src/app/atlas/**
  - src/content/atlas/**
  - src/features/atlas/**
  - src/lib/atlas*.ts
  - src/content/lessons/markdown/{기존 100강 파일들}  # 본문 수정 금지
  - ai-ops/ATLAS-BUILD-PLAN.md  # HOLD
  - docs/goal/  # 기존 V2 goal 원장

acceptance_criteria:
  - 한국어 본문 (운영자 DESIGN 감성: 애플 미니멀 · 깔끔·편의성)
  - {Phase별 구체 기준}

required_tests:
  - npm run typecheck
  - npm run test:{{관련 테스트}}
  # (qa·a11y 등 필요 시 추가)

known_risks:
  - {Phase별 알려진 위험}
  - "AX Orchestra" 명칭 사용 (본문). "Ju0Symphony"는 V14 출처 캡션에만
  - 기존 100강 라우팅/메타 외 수정 금지

rollback_boundary: |
  {Phase 커밋 직전 태그. 예: baseline-v3-w2-p01}
  (Orchestra만 생성 가능. SubAgent 태그 금지)

review_gate: codex_score >= 80
```

---

## 2. 반환 형식 (Output Contract)

SubAgent는 아래 형식만 반환한다. 원문 전체 재출력 금지. 요약+근거 포인터만.

```text
Status: SUCCESS | PARTIAL | FAILED | BLOCKED | HUMAN_APPROVAL_REQUIRED

Files Read:
  - {path} (section {x.y})

Files Changed:
  - {path} (lines {a-b}, summary {한 줄})

Findings:
  - {관찰·발견 사항. 3-5개}

Tests Run:
  - npm run typecheck → PASS (exit 0)
  - npm run test:pure → PASS ({n}/{n})

Results:
  - {테스트 결과 요약}

Risks:
  - {새로 발견된 위험 또는 기존 위협 재확인}

Unresolved Questions:
  - {Hermes/운영자에게 묻고 싶은 점}

Recommended Next Agent:
  - {Codex QA | Grok 다음 Phase | Hermes PM 리뷰 | ...}

Recommendation:
  - {다음 행동 제안}
```

---

## 3. Phase별 Context Package 예시

### 3.1 W2-P01 (첫 강의 집필) 예시

```yaml
goal: |
  V3.2-W2-P01 — P01 "두려워하지 않기 (비개발자도 할 수 있는 이유)" 강의 집필

phase: V3.2-W2-P01
task: |
  P01 강의 markdown 작성. 비개발자 독자가 "나도 AI 코딩 할 수 있겠다"고 느끼게 하는 동기 부여 강의.
  4-5문단 내외. 강의 본문 300-500자. Practice 1개 (자기소개 AI에게 말로 전하기), Quiz 3문항.
  본문에 'AI Chat'/'LLM' 등 생소 단어 등장 시 TermChip 사용 가이드를 코멘트로 표시 (W6 전까지는 TODO).

required_ssot:
  - path: ai-ops/V3-MASTER-TOC.md
    section: P01 row
  - path: ai-ops/V3-BRAND-FUNNEL.md
    section: §6 Hero 정체성 (P01은 메인 라인 첫 강의, Hero 톤 일치 필수)

allowed_paths:
  - src/content/lessons/markdown/p01-no-fear.md
  - src/content/practice/main/p01-practice.md
  - src/content/quizzes/main/p01-quiz.md

forbidden_paths:
  - 기존 100강 markdown (전부)
  - src/app/atlas/**
  - SiteHeader.tsx 등 보호 경로

acceptance_criteria:
  - 한국어 300-500자 본문
  - Practice 1개 (시작 상태 · 행동 · 기대 결과 · 실패 · 복구 · 증거 6필드)
  - Quiz 3문항 (정답+오답 이유+재학습 방향)
  - TermChip TODO 코멘트 2-3개 (AI Chat, LLM)
  - 운영자 DESIGN 감성 (애플 미니멀, 깔끔·편의)

required_tests:
  - npm run typecheck
  - npm run test:pure -- src/content/quizzes/main/p01-quiz.test.ts

known_risks:
  - "AI Chat" 용어가 P04 · P05에 앞서 등장 — TermChip 설명 미구현이므로 TODO 코멘트만
  - 본문이 지시적이기보다 격려 톤이어야 (사용자 DESIGN 감성)

rollback_boundary: baseline-v3-w2-p01

review_gate: codex_score >= 80
```

### 3.2 W6-A (TermChip 컴포넌트) 예시

```yaml
goal: |
  V3.2-W6-A — TermChip 컴포넌트 구현 (커서오버 1줄 요약 popover)

phase: V3.2-W6-A
task: |
  React/TypeScript 컴포넌트 구현. 본문 inline 용어 위에 hover/focus 시 1줄 정의 popover.
  클릭 시 /atlas/[slug] 상세 페이지로 이동.
  DESIGN.md 8번 motion 타이밍(120ms opacity) · a11y(aria-describedby, Escape close) 준수.
  키보드 포커스 시 같은 popover 표시. 44px 터치 타깃. reduced-motion 즉시 전환.

required_ssot:
  - path: DESIGN.md
    section: §5 Components · §6 Motion · §11 A11y
  - path: ai-ops/V3-WORKFLOW.md
    section: §3 Review 루브릭 "부재료 연결"

allowed_paths:
  - src/components/learning/v3-term-chip.tsx
  - src/components/learning/v3-term-chip.test.ts
  - src/lib/glossary-lookup.ts (lookup helper)

forbidden_paths:
  - src/app/atlas/** (W6-B에서 별도 담당)
  - src/content/atlas.ts (보호)
  - SiteHeader.tsx

acceptance_criteria:
  - Hover · focus · click 3가지 상호작용 동작
  - aria-describedby · Escape close · 44px 터치
  - reduced-motion 즉시 전환
  - DESIGN.md 토큰(--space-2/-3, --text-secondary, --border-subtle) 사용

required_tests:
  - npm run typecheck
  - npm run test:pure -- src/components/learning/v3-term-chip.test.ts

known_risks:
  - popover 위치 모바일에서 호버 안 됨 → 모바일은 tap=직접 Atlas 이동으로 fallback

rollback_boundary: baseline-v3-w6-a

review_gate: codex_score >= 80
```

---

## 4. 위임 절차 (Orchestra → SubAgent)

```
[1] Orchestra, Phase 착수 전 Context Package 작성 (본 템플릿 사용)
[2] SubAgent 호출 (Grok: --single "..." --cwd ... --always-approve)
[3] SubAgent 작업 진행 · Output Contract 반환
[4] Orchestra, Output 검토 · V3-HANDOFF.md 갱신
[5] Codex QA (Sol 페르소나) — npm run qa, 시나리오
[6] Codex Review — 점수 ≥80
[7] 점수 80+ → Phase 완료 · commit (정확한 경로만)
    점수 80- → Findings 티켓화 → 재배정 → [3] 루프
[8] Hermes PM 리뷰 (브랜드·퍼널·학습 흐름 정합) — 모든 Phase 끝
[9] Hermes, V3-HANDOFF.md 학습 로그 기록
```

---

## 5. SubAgent 호출 문자열 예시

### Grok — P01 집필 위임
```bash
grok --single "$(cat ai-ops/V3-CONTEXT-PACKAGE.md | awk '/^### 3.1/,/^### 3.2/' | sed 's/^### 3.1//' | sed '/^### 3.2/d')" \
  --cwd "D:/Ai_vibe_coding_master" \
  --always-approve
```

(실제는 Context Package YAML 파일을 별도 저장하고 `cat`으로 읽어 전달 권장)

### Codex — W6-A TermChip 위임
```bash
codex exec "Read ai-ops/V3-CONTEXT-PACKAGE.md section 3.2. Implement src/components/learning/v3-term-chip.tsx per the Context Package. Obey forbidden_paths."
```

### Claude Code — W6-C MainLineTimeline 보조
```bash
claude --dangerously-skip-permissions -p "Implement src/components/learning/v3-main-line-timeline.tsx. 21강 진행 시각화. DESIGN.md 토큰 준수." \
  --add-dir "D:/Ai_vibe_coding_master/src/components/learning" \
  --add-dir "D:/Ai_vibe_coding_master/ai-ops"
```

---

## 6. 주의사항 (전체)

- Context Package는 **필요한 SSOT만 경로+섹션**으로. 전체 문서 복붙 금지 (AGENTS.md §19 Context economy)
- SubAgent는 **같은 파일 동시 쓰기 금지** (AGENTS.md §5, V3-AGENT-MAP.md §5 동시성)
- `git add -A` 금지 · `git push` 금지 · 보호 경로 stage 금지 (AGENTS.md §15)
- W5-V14, W7(홈 개편)은 사전 운영자 승인 필수 (Human Gate)
- SubAgent가 HUMAN_APPROVAL_REQUIRED 반환하면 즉시 Orchestra 보고 → 운영자 승인까지 대기

---

## 7. 관련 문서

- `ai-ops/V3-APPENDIX.md` (V3 운영계약 부록)
- `ai-ops/V3-WORKFLOW.md` (Phase·게이트)
- `ai-ops/V3-BRAND-FUNNEL.md` (브랜드·V14 출처)
- `ai-ops/V3-AGENT-MAP.md` (역할·할당)
- `ai-ops/V3-MASTER-TOC.md` (W1에서 작성, 메인 라인 인덱스)

Last updated: 2026-07-18
