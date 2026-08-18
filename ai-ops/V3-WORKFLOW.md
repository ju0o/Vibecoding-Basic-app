# V3 Workflow — AI Engineering Atlas 재구성 작업 흐름

> 적용일: 2026-07-18  
> 작성자: PM(Hermes 학습 모드) → 운영자 승인 전 W0  
> 범위: V3.2 — 21강 메인 라인 + TermChip + Atlas 부재료화 + 홈 개편 + 브랜드 분리(3단계 퍼널)  
> 전제: Ju0AXSymphony 완성 후 W1 착수. W0은 사전 준비(Symphony와 독립).

---

## 1. 역할 매트릭스 (AGENTS.md §3 보충, V3 작업 한정)

| 역할 | 실행체 | 주요 책임 | 금지 |
|------|------|---------|-----|
| **Orchestra (Chief)** | Grok Main Session | V3 Goal 유지·Phase 분해·배정·충돌 해결·통합·commit | push / 기존 100강 본문 / Atlas 21개념 / HOLD Build Plan |
| **V3 콘텐츠 집필** | Grok + atlas-content-writer | P01-V15 한국어 본문 · Practice/Quiz 자산 초안 | 보호 경로(AGENTS §5) 수정 / Day1 route 축소 |
| **V3 데이터 수집** | Grok SubAgent (atlas-source-researcher) | 공식문서 · E:\hermes\learning\logs\ 요약 | X 정보는 verified_fact / 추측 금지 (AGENTS §9) |
| **V3 UI/UX 컴포넌트** | Codex + Claude Code | TermChip · AXPromoCard · MainLineTimeline · Atlas 페이지 | atlas 보호 경로 / 무거운 라이브러리 / 외부 유료 API |
| **V3 QA** | Codex (Sol 페르소나) | `npm run qa` · 시나리오 QA · a11y · 모바일 · perf | 같은 Phase에서 Implementer 겸직 |
| **V3 Review (≥80)** | Codex Review | 점수 0-100 · Findings · Critical 0 · 80점 게이트 | 80 미만 PASS 보고 금지 |
| **PM 감시(Hermes)** | Hermes (observer) | W0~W9 까지 진행 모니터링 · 학습 기록 · 피드백 제안 | 코드 직접 작성 · SubAgent 무단 동원 |

---

## 2. Phase Roadmap (V3.2)

### W0 — 사전 문서 (즉시 착수, Symphony와 독립)

| Phase | 범위 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W0-A | V3 운영계약 부록 (AGENTS.md 확장) | Hermes 초안 → Grok 승인 | `ai-ops/V3-APPENDIX.md` | 운영자 확인 |
| W0-B | **본 WORKFLOW** | Hermes 초안 → Grok 승인 | `ai-ops/V3-WORKFLOW.md` | 운영자 확인 |
| W0-C | 3단계 퍼널 · 브랜드 분리 설계 | Hermes 초안 → Grok 승인 | `ai-ops/V3-BRAND-FUNNEL.md` | 운영자 승인 |
| W0-D | Context Package 템플릿 | Hermes 초안 | `ai-ops/V3-CONTEXT-PACKAGE.md` | 운영자 확인 |
| W0-E | SubAgent 능력·할당 기준표 | Hermes 초안 → Grok 승인 | `ai-ops/V3-AGENT-MAP.md` | 운영자 확인 |

### W1 — 메인 라인 목차 확정 (Symphony 완료 후 착수)

| Phase | 범위 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W1-A | 21강 메인 라인 목차 V3-MASTER-TOC.md 작성 | Grok | `ai-ops/V3-MASTER-TOC.md` | Hermes PM 리뷰 |
| W1-B | 100개 기존 강의 → 부재료(Atlas) 매핑표 | Codex | `ai-ops/V3-ASSET-MAP.md` | Hermes 리뷰 |

### W2 — 기초 필수 6강 (P01-P06)

| Phase | 강의 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W2-P01 | 두려워하지 않기 (비개발자도 할 수 있는 이유) | Grok | markdown + Practice + Quiz | typecheck + pure |
| W2-P02 | Node.js·npm 설치 (Windows/Mac) | Grok | markdown + 설치 스크린샷 + Practice | typecheck + pure |
| W2-P03 | VSCode 또는 Cursor 설치·셋업 | Grok | markdown + 셋업 Practice | typecheck + pure |
| W2-P04 | AI Chat vs AI Agent 차이 | Grok | markdown + 비교 표 + Quiz | typecheck + pure |
| W2-P05 | LLM이란 (한 면 서버 / 한 면 클라이언트 비유) | Grok | markdown + 다이어그램 + Quiz | typecheck + pure |
| W2-P06 | Local AI vs Cloud AI · Git 기초 | Grok | markdown + Ollama/Cloud 비교 + git 명령 Practice | typecheck + pure |

### W3 — 바이브 코딩 탄생·진화 (V01-V04)

| Phase | 강의 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W3-V01 | 바이브 코딩 탄생 (이 단어의 등장) | Grok | markdown + 출처 인용 | typecheck |
| W3-V02 | Autocomplete에서 Chat 코딩으로 | Grok | markdown + 시대표 | typecheck |
| W3-V03 | AI Agent 등장 (Cursor/Claude Code/Codex) | Grok | markdown + 비교 매트릭스 | typecheck |
| W3-V04 | MCP · Tool · Function 사다리 | Grok | markdown + 다이어그램 | typecheck |

### W4 — AI 쓰는 법 (V05-V09)

| Phase | 강의 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W4-V05 | 프롬프트 엔지니어링 기본 | Grok | markdown + 예시 5종 + Quiz | typecheck |
| W4-V06 | 컨텍스트 엔지니어링 (AI 잊지 않게) | Grok | markdown + 다이어그램 + Practice | typecheck |
| W4-V07 | 하네스 엔지니어링 (AI 안전하게) | Grok | markdown + 위험 케이스 | typecheck |
| W4-V08 | 루프 엔지니어링 (AI 멈추지 않게) | Grok | markdown + retry 정책 + Practice | typecheck |
| W4-V09 | 좋은 AI 작업 요청 · 태스크 분해 | Grok | markdown + bad vs good 예시 | typecheck |

### W5 — 에이전트·오케스트라 (V10-V15) — AX 도구 정식 출시 후

| Phase | 강의 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W5-V10 | AI Agent vs SubAgent vs Multi-Agent | Grok | markdown + 인용 | typecheck |
| W5-V11 | Workflow 설계 (병렬 실행) | Grok | markdown + 다이어그램 | typecheck |
| W5-V12 | Model Routing (모델 선택 시스템) | Grok | markdown + 의사결정표 | typecheck |
| W5-V13 | 오케스트레이션 개념 (Chief · PM · Worker) | Grok | markdown + 역할 다이어그램 | typecheck |
| W5-V14 | **AX Orchestra 실전 사례 (Ju0Symphony 출처 표기)** | Grok + Codex | markdown + 실 로그/스크린샷 + 출처 캡션 | typecheck + Hermes 사전 검수 |
| W5-V15 | Next Steps — AX Orchestra 다운로드·설치·첫 실행 | Grok + Codex | markdown + 설치 가이드 + Practice | typecheck |

### W6 — UI/UX 컴포넌트 (TermChip + Atlas 페이지 + MainLine Timeline)

| Phase | 범위 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W6-A | TermChip 컴포넌트 (커서오버 popover) | Codex | `src/components/learning/v3-term-chip.tsx` | typecheck + pure |
| W6-B | /atlas/[slug] 상세 페이지 | Codex | `src/app/atlas/[slug]/page.tsx` | typecheck |
| W6-C | MainLineTimeline 컴포넌트 (21강 직선 시각화) | Codex | `src/components/learning/v3-main-line-timeline.tsx` | typecheck + qa |
| W6-D | 메인 라인 학생 라우팅 (/learn/main/...) | Grok + Codex | `src/app/learn/main/**` | typecheck + qa |

### W7 — 홈 개편 + AXPromoCard (브랜드 rebrand 승인 후)

| Phase | 범위 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W7-A | 홈 Hero 정체성 1줄 + 3 Track 진입 카드 대신 메인 라인 시각화 | Grok + Codex | `src/app/page.tsx` 개편 | qa |
| W7-B | AXPromoCard 컴포넌트 (모든 강의 하단) | Codex | `src/components/learning/v3-ax-promo-card.tsx` | typecheck + pure |
| W7-C | 푸터 "비영리 선언" + 운영자 정보 업데이트 | Grok | `src/components/layout/SiteFooter.tsx` | qa |

### W8 — 기존 100강 Atlas 재태깅

| Phase | 범위 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W8-A | 100개 기존 markdown 라우팅/메타만 `/atlas/<slug>`로 매핑 | Codex | `src/content/atlas.ts` 확장 | typecheck |
| W8-B | 메인 라인 ↔ Atlas 용어 매핑표 최종 | Grok | `ai-ops/V3-ASSET-MAP.md` 갱신 | Hermes 리뷰 |

### W9 — 전체 QA + Review ≥80

| Phase | 범위 | 담당 | 산출물 | 게이트 |
|---|---|---|---|---|
| W9-A | 전체 `npm run qa` + typecheck + test + build | Codex QA | `evidence/v3-final-qa.txt` | qa PASS |
| W9-B | a11y (WCAG AA) · 모바일 · 200강 perf | Codex | `evidence/v3-a11y-perf.txt` | 기준 통과 |
| W9-C | Codex Review 점수 ≥80 · Critical 0 · 미승인 High 0 | Codex Review | `ai-ops/V3-FINAL-REVIEW.md` | codex_score ≥80 |
| W9-D | 퍼널 CTA 정상 연결 확인 (AX Orchestra Coming Soon 등) | Grok + Hermes | `evidence/v3-funnel-cta.txt` | Hermes 검수 |

---

## 3. Review 점수 루브릭 (V3 한정, 100점)

| 영역 | 배점 | 합격 가이드 |
|---|---:|---|
| 메인 라인 정합성 (21강 학습 순서) | 20 | P01 → V15 흐름 · 의존성 · 빈 자리(Coming Soon) 명시 |
| 부재료(Atlas) 연결 (TermChip → 상세) | 15 | 커서오버 1줄 + 클릭 이동 동작 · a11y |
| 기존 100강·Foundation 손상 없음 | 15 | master-toc.md · 보호 경로·21/14 계약 준수 |
| 한국어 UX (초심자 진입) | 15 | P01-P06 직관성 · "지금 할 일" 표시 · 빈 상태 안내 |
| 디자인 시스템 일관성 | 10 | DESIGN.md 토큰 준수 · 애플 미니멀 · 촌스러움 0 |
| 퍼널 CTA 자연 스러움 | 10 | 강의 하단 AXPromoCard · 강제 팝업 아님 · 닫기 가능 |
| 성능·a11y·회귀 | 15 | 200강 가상화 · LCP 2.5s · 키보드 · WCAG AA |
| 합계 | 100 | **≥ 80 Phase PASS** |

80 미만: Findings 티켓화 → 재배정 → 재 Review. 3회 실패 시 Human Escalation.

---

## 4. Retry 정책 (V3 한정)

| 횟수 | 조치 |
|---|---|
| 1 | Context/Prompt 보정 후 동일 역할 재시도 |
| 2 | 다른 Agent 또는 상위 설계/구현 경로 재배정 (하향 금지) |
| 3 | Human Escalation 또는 BLOCKED |

---

## 5. SubAgent 카탈로그 (V3 신규, 그 외 기존 유지)

| Agent | 출처 | 용도 |
|---|---|---|
| v3-content-writer | Grok SubAgent 신규 | 메인 라인 21강 한국어 본문 집필 |
| v3-ui-builder | Codex/Claude Code | TermChip · AXPromoCard · MainLineTimeline |
| v3-qa | Codex QA 페르소나 | V3 시나리오 QA |
| v3-reviewer | Codex Review | 점수 ≥80 판정 |
| v3-data-collector | Grok SubAgent | 공식문서 · 운영 로그 요약 |
| v3-handoff-curator | Grok | V3-HANDOFF.md 갱신 |

기존 atlas-* Grok SubAgent는 V3 작업에도 재사용 가능(atlas-content-writer 등).

---

## 6. 표준 Workflow (매 Phase)

```
[0] Baseline
    git status clean 권장 · V3-MASTER-TOC / V3-BRAND-FUNNEL 확인
[1] Orchestra Plan (Grok)
    Phase 범위 · allowed/forbidden paths · acceptance · rollback
[2] Research Gate (필요 시)
    공식문서 우선 · E:\hermes\learning\logs\ 활용
[3] Implementation
    Grok 집필 / Codex UI / 병렬 시 파일 소유권 충돌 주의
[4] Integrate (Grok Orchestra)
    병합 · 타입 · 라우팅 스팟 체크
[5] Script First QA
    npm run typecheck / npm run qa / npm run test
[6] Codex QA (Sol 페르소나)
    evidence 해석 · 실패 분석
[7] Codex Review
    score >= 80 → Phase 완료
    score < 80 → Findings 반영 재작업 → [3]
[8] Independent Review (Atlas/보안 변경 시)
    atlas-independent-reviewer 또는 Human Review
[9] Hermes PM 리뷰
    브랜드·퍼널 준수 · 학습 흐름 정합
[10] Orchestra 보고 · (필요 시) commit
    push 금지 · git add 정확한 경로만
```

---

## 7. Human Gate (V3)

승인 없이 실행 금지:
- 21 concepts / 14 sections / PRD 권한 확장
- master-toc.md 덮어쓰기
- 기존 100강 markdown 본문 수정
- Day1 (`/learn/vibe-coding-foundation/day-1`) 축소
- V5 Phase (V10-V15) — AX 도구 정식 출시 전 착수
- V7 (홈 개편) — 브랜드 rebrand 정식 결정 전 착수
- W14 V14 강의 Ju0Symphony 실명 공개 — Ax 도구 출시 전까지 Coming Soon
- git push / reset / clean / rebase / tag
- 외부 유료 API 연동
- 무거운 그래프/모션 라이브러리 추가

---

## 8. Git 규칙 (V3)

- SubAgent: commit/push/reset/clean/rebase/tag/stash 금지
- Orchestra만 Phase 검증 후 commit 가능
- push 항상 금지
- `git add <정확 경로>` only (`-A` 금지)
- V3 관련 커밋 prefix: `V3-W{n}-{task}:`
  예: `V3-W0-A: V3 APPENDIX`, `V3-W2-P01: P01 마크다운`, `V3-W6-A: TermChip 컴포넌트`

---

## 9. STATE update (V3)

- Main Orchestrator(Grok)만 `ai-ops/STATE.md`의 V3 섹션 갱신
- Phase 끝: 현황판·V3 상태·NEXT·history 행 추가
- `ai-ops/V3-HANDOFF.md`도 병행 갱신 (기존 ATLAS-GROK-HANDOFF.md와 분리)

Last updated: 2026-07-18
