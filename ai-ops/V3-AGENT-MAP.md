# V3 Agent Map — SubAgent 능력·비교·할당 기준표

> 작성: 2026-07-18, PM(Hermes 학습 모드)  
> 상위: `E:\hermes\projects\aivibe_v3_2_plan.md`, `ai-ops/V3-APPENDIX.md`, `ai-ops/V3-WORKFLOW.md`  
> 역할: V3 작업에서 Grok · Codex · Claude Code · Hermes 각각의 역할·능력·제한·할당 기준을 정의.

---

## 1. 실행체 비교 요약

| 실행체 | 호출 경로 | 주 특성 | V3 역할 |
|---|---|---|---|
| **Grok CLI** | `grok --single "..." --cwd ... --always-approve` pty 모드 | TUI 출력, 한국어·장문 대응 양호, 실 출력 보임 | Chief/Orchestra + 콘텐츠 집필 주력 |
| **Codex CLI** | `codex exec ...` (sandbox danger-full-access 기본) | 구조화·QA·Review 강점, STATE.md 게이트 존중 | UI/UX 컴포넌트 + QA/Review ≥80 |
| **Claude Code** | `claude --dangerously-skip-permissions -p ...` pty 권장 | 긴 문서 분석·파일 단위 작업 강함, 멈춤 현상 빈번 | UI/UX 컴포넌트 보조 (W6) |
| **Hermes (본인)** | (직접 안 함) | 관찰·PM 기획·리뷰·패턴 인식 | PM + 감시 + 학습 + V3-BRAND-FUNNEL 수호 |

자세한 CLI 특성은 `E:\hermes\memory\agents\{grok,codex,claude-code}.md` 참조.

---

## 2. V3 역할 상세 매핑

### 2.1 Grok — Chief/Orchestra + 콘텐츠 집필

**책임:**
- V3 Goal 유지 (`V3-MASTER-TOC.md`, `V3-BRAND-FUNNEL.md`)
- Phase 분해 · 배정 · 충돌 해결 · 통합 · (승인 후) commit
- 메인 라인 21강 한국어 본문 집필 (P01-V15)
- Practice/Quiz 자산 초안 작성
- W5에서 V14 실 운영 로그 활용 사전 검수

**강점:**
- 한국어 본문 톤 '사람말투' — 운영자 DESIGN 감성(애플 미니멀, 깔끔·편의성) 기반
- 긴 문서 분석 후 자연어로 재구성 능력 우수
- `--single` 모드에서 실 출력·진행 상황 관찰 가능

**금지:**
- `git push` · `git reset` · `git clean` · `git rebase` · `git add -A`
- 기존 100강 markdown 본문 수정 (라우팅/메타만)
- 보호 경로 (AGENTS.md §5 — SiteHeader.tsx 등) 직접 수정
- 21 concepts / 14 sections 계약 / HOLD Build Plan 위반
- W5-V14 강의를 AX 도구 정식 출시 전에 완성

**할당 받는 Phase:**
- W0 (승인 하) · W1-A · W2 (P01-P06 전부) · W3 (V01-V04) · W4 (V05-V09) · W5 (V10-V15, V14는 AX 출시 후) · W7-B 푸터 · W8-B Atlas 매핑

### 2.2 Codex — UI/UX 컴포넌트 + QA + Review

**책임:**
- TermChip (W6-A) · Atlas 상세 페이지 (W6-B) · MainLineTimeline (W6-C) 컴포넌트 구현
- AXPromoCard (W7-B) 컴포넌트 구현
- 라우팅 `/learn/main/...` · `/atlas/[slug]` (W6-D)
- QA (`npm run qa` 해석, 시나리오 테스트, a11y, 모바일, 200강 perf) — W9-A/B
- Codex Review 점수 ≥80 게이트 (W9-C)
- Atlas 100강 재태깅 메타/라우팅 (W8-A)

**강점:**
- TypeScript/React 구조화·타입 안정성 우수
- STATE.md · AGENTS.md 운영계약 존중 (Human Gate 인식)
- 한국어 UX 라벨·a11y 검증 정확

**금지:**
- 같은 Phase에서 Implementer 겸직 (Implementer ≠ Reviewer, AGENTS.md §10)
- 보호 경로 (AGENTS.md §5) 위반
- 무거운 그래프/모션 라이브러리 추가 (AGENTS.md §12)
- 외부 유료 API 연동
- `git push` (항상 금지)

**할당 받는 Phase:**
- W0-D (CONTEXT-PACKAGE 작성 협력) · W1-B (Atlas 매핑) · W6 (UI 전부) · W7-B (AXPromoCard) · W8-A (재태깅) · W9 (QA·Review·a11y·perf)

### 2.3 Claude Code — UI/UX 보조 (W6 한정)

**책임:**
- W6 컴포넌트 구현 시 Codex와 병렬 작업 (파일 소유권 분할)
- 긴 TypeScript/React 리팩토링 작업 보조

**강점:**
- 긴 문서 파일 단위 작업·리팩토링 강함
- `--add-dir`로 접근 범위 제한 가능

**금지:**
- 11분 이상 running + 출력 없으면 kill 후 재시작 (멈춤 빈번, E:\hermes\memory\agents\claude-code.md)
- STATE.md 게이트 무시 금지
- 보호 경로 · 21/14 / HOLD 위반

**할당 받는 Phase:**
- W6-A/B/C/D 보조 (1-2개 컴포넌트). 그 외 V3 작업에서는 사용 안 함.

### 2.4 Hermes (본인) — PM + 감시 + 학습

**책임:**
- V3.2-W0 사전 문서 5개 작성 (지금 진행 중)
- 각 Phase 끝 PM 리뷰 (브랜드·퍼널·학습 흐름 정합)
- 학습 로그 `E:\hermes\learning\logs\` 기록
- V3 작업 패턴 인식 → 다음 세션에서 활용 가능한 스킬로 저장

**금지 (사용자 지시):**
- V3 프로젝트 산출물 직접 작성 (코드·markdown 본문)
- SubAgent 무단 동원
- push / reset 등 위험 명령

**할당 받는 Phase:**
- W0 (현재) · 모든 Phase 끝 PM 리뷰 · W9-D 퍼널 CTA 정상 연결 검수

---

## 3. 할당 기준표 (작업 유형별)

| 작업 유형 | 주 담당 | 보조 | 게이트 |
|---|---|---|---|
| 새 markdown 강의 집필 (한국어 본문) | Grok | - | typecheck + pure |
| Practice/Quiz 자산 제작 | Grok | - | typecheck + pure |
| 공식문서·운영 로그 요약 | Grok SubAgent (v3-data-collector) | - | Hermes 리뷰 |
| React/TypeScript 컴포넌트 구현 | Codex | Claude Code (W6) | typecheck + pure + qa |
| 라우팅/메타데이터 변경 | Codex | - | typecheck + qa |
| 기존 100강 본문 수정 | **금지** | - | - |
| 기존 100강 라우팅/메타만 변경 | Codex | - | typecheck |
| 홈 화면 개편 (Hero·CTA·푸터) | Grok (문구) + Codex (UI) | - | qa |
| `npm run qa` · typecheck · test | Codex QA (Sol) | - | PASS |
| a11y · 모바일 · 200강 perf | Codex QA | - | 기준 통과 |
| Codex Review ≥80 | Codex Review | - | codex_score ≥80 |
| 브랜드 rebrand (도메인·SNS 조사) | Grok SubAgent | Hermes PM | 운영자 승인 |
| V14 출처 캡션 사전 검수 | Hermes | - | Hermes 검수 |
| V3-HANDOFF.md 갱신 | Grok | - | Phase 끝 |

---

## 4. 실행체 호출 가이드 (CLI 특성 요약)

### 4.1 Grok CLI
```bash
grok --single "프롬프트" --cwd "D:/Ai_vibe_coding_master" --always-approve
```
- prompt는 따옴표로 감싸 하나의 argv
- pty 모드 권장 (TUI 안 깨지게)
- 397초+ 실행 가능 (MyFriend에서 검증됨)
- 중간 출력 sparse → poll로 상태 확인

### 4.2 Codex CLI
```bash
codex exec "프롬프트"
```
- `exec` 서브커맨드 필수
- STATE.md `next_requires_operator_approval` true면 HUMAN_APPROVAL_REQUIRED
- sandbox danger-full-access 기본 (쓰기 허용 경로만 사용)
- 약 2-3분 이상 출력 없으면 kill 후 재시작

### 4.3 Claude Code
```bash
claude --dangerously-skip-permissions -p "프롬프트" --add-dir "D:/Ai_vibe_coding_master/src/components/learning"
```
- pty 모드 권장
- 11분 running + 출력 없으면 kill (멈춤 현상)
- `--add-dir`로 접근 범위 명시
- 범위 좁히는 것이 안정성 ↑

### 4.4 Hermes (본인)
- terminal 도구로 위 CLI 호출
- `notify_on_complete=true` + background=true로 무거운 작업 모니터링
- limit 도달 시 운영자 즉시 알림 (메모리 policy 준수)

---

## 5. 동시성·충돌 회피

- 같은 파일 동시 쓰기 금지 (Orchestra가 파일 소유권 분할)
- W6에서 Codex와 Claude Code 병렬 시:
  - Codex → `src/components/learning/v3-term-chip.tsx` + `src/app/atlas/[slug]/`
  - Claude Code → `src/components/learning/v3-main-line-timeline.tsx` (별도 파일)
- W2-W5에서 Grok이 21강 집필 시:
  - 한 번에 1강씩 (`src/content/lessons/markdown/p01-*.md` ...)
  - Codex는 `src/content/atlas.ts` 메타 확장 작업과 병렬 가능 (파일 다름)

---

## 6. 운영자 개입 지점

| 시점 | 운영자 행동 | 사유 |
|---|---|---|
| W0 끝 | 사전 문서 5개 검토 · 승인 | V3 방향 확정 |
| W1 끝 | 메인 라인 21강 목차 최종 승인 | 콘텐츠 방향 고정 |
| W4 끝 (W5 진입 전) | AX 도구 정식 출시 여부 결정 | V14·V15 착수 조건 |
| W6 후·W7 전 | 브랜드 rebrand 정식 승인 | 홈 개편·AXPromoCard 적용 |
| W9 끝 | V3.2 사이트 공개 승인 | Stage 1 퍼널 시작 |
| 이후 | AX 도구 정식 출시 | V14 완성·AXPromoCard → live 전환 |

---

## 7. 관련 문서

- AGENTS.md (기존 V2 운영계약, 보존)
- ai-ops/V3-APPENDIX.md (V3 확장 규칙)
- ai-ops/V3-WORKFLOW.md (Phase·게이트)
- ai-ops/V3-BRAND-FUNNEL.md (브랜드·퍼널·V14 출처)
- ai-ops/V3-CONTEXT-PACKAGE.md (위임 템플릿)
- E:\hermes\memory\agents\{grok,codex,claude-code}.md (CLI 특성)

Last updated: 2026-07-18
