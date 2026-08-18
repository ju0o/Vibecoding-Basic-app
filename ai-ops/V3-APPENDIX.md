# V3 — AI Engineering Atlas 재구성 (운영계약 부록)

> 본 파일은 `AGENTS.md`를 대체하지 않는다. AGENTS.md §1~§20은 그대로 유효하며, 본 파일은 V3.2 재구성 작업(2026-07-18 PM 기획)에 한정해 추가된 규칙이다.
> 충돌 시: AGENTS.md가 우선. 단 V3 작업 범위 내에서는 본 파일의 세부 규칙을 따른다.

---

## A1. V3 작업 배경 (2026-07-18)

운영자 지시:

1. V2 기존 100강(HTML/CSS/JS/DB/API 등)은 **메인이 아닌 부재료(Atlas)로 격하**
2. 메인 라인 21강(P01-V15) 직선 추가 — 기초 필수 → 바이브 코딩 → 오케스트레이션
3. 메인 라인 본문에서 생소 단어 등장 시 TermChip(커서오버 1줄 요약) + 클릭 Atlas 상세 페이지 분기
4. 홈 · UI/UX 개편 (애플 미니멀+글라스 감성 유지, 정체성 Hero 추가)
5. 3단계 퍼널: 교육(Stage 1) → AX 도구 무료 배포(Stage 2) → 구독 서비스(Stage 3)
6. 브랜드 분리: 교육 사이트 / AX 도구 / 구독 — 모두 별도 rebrand 대상 (가칭 AX Orchestra)
7. V14 강의는 AX 도구 정식 출시 후 완성 — "본 사이트 개발자가 만든 AX 프로그램 'Ju0Symphony'" 작은 출처 표기

---

## A2. V3에서 보존하는 기존 AGENTS.md 규칙

아래는 V3 작업에서도 **변경 없이 준수**:

- §1 Education First · Student Self-Serve
- §2 SSOT 우선순위(Journey/Outcome > Pipeline > ...)
- §5 Protected paths (src/components/layout/SiteHeader.tsx, src/content/atlas.ts, src/app/atlas/**, ATLAS-P1-PENDING.md 등)
- §6 Phase 1 uncommitted work 규칙
- §7 Script First
- §8 Official sources first
- §12 Forbidden (21 concepts/14 sections / HOLD Build Plan / schema migration / push 등)
- §16 Human Approval triggers

→ **V3에서 추가Hi 작업이 이 규칙들을 위반하면 안 됨.** 특히 Atlas 21개념/14섹션 계약은 유지.

---

## A3. V3에서 추가/확장하는 규칙

### A3.1 메인 라인 vs 부재료(Atlas) 계층 분리
- 메인 라인 21강(P01-V15)은 신규 경로 `/learn/main/` 아래 제공 (기존 `/learn/vibe-coding-foundation/` Foundation 25노드 경로 충돌 회피)
- Foundation 25노드 라우팅은 보존(V3에서 라우팅 변경 안 함)
- 기존 100강 markdown은 **본문 보존, 라우팅/메타만 `/atlas/<slug>`로 재매핑** (본문 수정 금지, AGENTS.md §5 준수)

### A3.2 V3 작업 쓰기 가능 경로 (AGENTS.md §11에 추가)
```
ai-ops/V3-*.md
ai-ops/agents/v3-*-agent.md (신규 V3 역할 정의)
src/components/learning/v3-* (TermChip, AXPromoCard, MainLine Timeline 등 V3 신규 컴포넌트)
src/app/learn/main/** (메인 라인 21강 학생 화면)
src/app/atlas/[slug]/page.tsx (Atlas 상세 페이지 + TermChip 진입)
```

### A3.3 V3 작업 금지/보호 (AGENTS.md §12 확장)
- 기존 100강 markdown 본문 수정 금지 (라우팅/메타만)
- Foundation 25 노드 라우팅(`master-toc.md`) 덮어쓰기 금지 — V3는 별도 `V3-MASTER-TOC.md` 사용
- "Ju0AXSymphony" 실명은 V14 강의의 출처 캡션에만 사용 (본문은 AX Orchestra)
- V14 강의는 AX 도구 정식 출시 전까지 완성 불가 — Coming Soon placeholder

### A3.4 V3 SubAgent 역할 (AGENTS.md §3 보충)
| 역할 | 실행체 | 책임 | 금지 |
|---|---|---|---|
| Chief/Orchestra | Grok Main | V3 Goal 유지·Phase 분해·배정·통합·commit | push 금지 |
| V3 콘텐츠 집필 | Grok (+ Grok SubAgent) | P01-V15 한국어 본문 집필 · Practice/Quiz 자산 초안 | 기존 100강 본문 수정 금지 |
| V3 UI/UX 컴포넌트 | Codex (+ Claude Code) | TermChip·AXPromoCard·MainLine Timeline 컴포넌트 | atlas 보호 경로 위반 금지 |
| V3 QA·Review | Codex (점수 ≥80) | typecheck/qa · a11y · 모바일 · perf | 같은 Phase에서 Implementer 겸직 금지 |
| V3 데이터 수집 | Grok SubAgent | 공식문서·E:\hermes\learning\logs\ 요약 | X 정보는 verified_fact만 사용(§9 준수) |

### A3.5 V3 Phase Gate
- 매 Phase 끝: `npm run typecheck` + `npm run test` 통과 + Codex Review ≥80
- W5(V10-V15 강의) → W9(최종 QA)는 AX 도구 정식 출시 이후까지 대기
- W7(홈 개편) 전 · V3-BRAND-FUNNEL.md의 브랜드 rebrand 승인 필요

### A3.6 V3 Handoff
- 매 Phase 끝 `ai-ops/V3-HANDOFF.md` 갱신 (기존 `ATLAS-GROK-HANDOFF.md`와 분리)
- 새 세션 읽기 순서: `AGENTS.md → V3-APPENDIX.md → V3-WORKFLOW.md → ai-ops/STATE.md → V3-HANDOFF.md → git status`

---

## A4. V3 SSOT 우선순위 (AGENTS.md §2 보충)

V3 작업 범위 안에서:

1. `ai-ops/V3-MASTER-TOC.md` (메인 라인 21강 인덱스 — master-toc.md와 별도)
2. `ai-ops/V3-BRAND-FUNNEL.md` (3단계 퍼널·브랜드 분리·V14 출처 규칙)
3. `ai-ops/V3-AGENT-MAP.md` (SubAgent 역할·할당 기준)
4. `ai-ops/V3-CONTEXT-PACKAGE.md` (위임용 템플릿)
5. `ai-ops/V3-WORKFLOW.md` (Phase·게이트)
6. 기존 SSOT(Journey/Outcome/Atlas) — 보존, V3와 충돌 시 기존이 우선

---

## A5. V3 시작 전 체크

V3.2-W0 착수 조건:
- [x] 본 V3-APPENDIX.md 작성 완료
- [ ] `V3-WORKFLOW.md` 작성
- [ ] `V3-CONTEXT-PACKAGE.md` 작성
- [ ] `V3-AGENT-MAP.md` 작성
- [ ] `V3-BRAND-FUNNEL.md` 작성
- [ ] 운영자로부터 W1(메인 라인 목차) 착수 승인

W0 산출물은 모두 `D:\Ai_vibe_coding_master\ai-ops\V3-*.md` 형식 — 기존 파일 덮어쓰기 없이 신규 생성.
