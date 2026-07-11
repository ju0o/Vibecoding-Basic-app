# ORCHESTRATION-PLAN (O-06, v3) — Fable 지휘 · Grok/Codex 에이전트 체제

> **지위**: 본 문서가 기존 [CODEX-PLAN.md](CODEX-PLAN.md)(v2, 단일 실행자 무정지)를 **대체**한다. 파이프라인(P-01~P-09)·품질 게이트·인용 정책은 그대로 승계하고, **실행 조직**을 오케스트레이션 체제로 재편한다. (2026-07-08, 운영자 지시)

---

## 1. 조직

```
                 ┌─────────────────────────┐
                 │   운영자 (사람)          │  게이트: 배포 승인 · 에스컬레이션 · 스팟체크
                 └────────────┬────────────┘
                              │
                 ┌────────────▼────────────┐
                 │   Fable 5 — Maestro     │  지휘: 계획 · 검증(P-02) · QA 판정 · 통합 조정
                 │   (오케스트레이터)       │        상태 관리(STATE) · 릴리스 판정 · 배포 실행
                 └──────┬───────────┬──────┘
                        │           │
            ┌───────────▼──┐   ┌───▼──────────┐
            │  Codex        │   │  Grok        │
            │  Heavy Executor│   │  Light Executor│
            └───────────────┘   └──────────────┘
```

### 에이전트 특성과 역할 배정 근거

| 에이전트 | 특성 (운영자 확인) | 배정 역할 |
|---|---|---|
| **Fable 5** | 이 세션의 지휘자. 판단·검증·조정에 강함. 세션 단위 토큰 | **Maestro**: 미션 설계, P-02 검증·승인, 에이전트 산출물 QA(표본 재검증), 충돌 해결(git 재대사), 릴리스 판정, STATE/MASTER_PROGRESS 관리, **배포 실행(P-09)** |
| **Codex** | 한 번 명령을 받으면 **토큰이 다 되어도 몇 시간이고 완주** — 사람 호출 없는 대규모 연속 작업에 최적 | **Heavy Executor**: 다강 웨이브 묶음(P-01→P-08 연속), V1 레거시 5강 재생성, **UI/UX 리팩토링 구현**, 콘텐츠 리프레시 스윕 — "크고 긴" 미션 전담 |
| **Grok** | **토큰 사용량이 적음** — 잦은 소규모 작업에 경제적 | **Light Executor**: 기계 QA 스캔(형식·인용·링크·용어·다이어그램 5종), stale-KB 목록 생성, P-05 기계 복사, 소규모 수정, 조사 보조 — "작고 잦은" 작업 전담 |

> Cline은 본 체제에서 제외한다(감사 신뢰성 문제 2회 실증 — reports/lesson-format-scan.md 참조). Grok이 그 역할을 승계하되, **동일한 안전장치 적용**: 극단값 결과("전부 위반" 등)는 스스로 재검토, Fable이 수용 전 표본 재검증.

### 불변 원칙 (v2에서 승계)

1. **품질 게이트**: KB Score 80+, 강의 8섹션·8,000자+, 인용은 KB Quote Bank와 글자 단위 일치, `npm run verify` 통과 없이는 릴리스 불가.
2. **인용 정책 모드 A**: 비공개 학습 배포 — 인용 길이 무제한, 단 출처 링크+해설 필수. 긴 인용은 reports/citation-review.md 기록. 공개(모드 B) 전환은 운영자 전수 정리 후.
3. **콘텐츠 무수정 통합**: P-05는 해시 대조 복사. 다이어그램은 SVG 복사 + **마크다운 `![...]` 참조 삽입까지** 확인.
4. **커밋 규율**: 단계별 커밋("P-XX: 요약"), 완료 보고는 `git show --stat`로 실측 대조.
5. **배포 리듬**: 세션 중 산출물은 커밋으로 안전 확보, **배포는 세션 말미 1회**(운영자 확립 규칙). 배포 주체는 Fable.
6. **secret 규율**: 비밀번호·토큰은 코드/로그/커밋 금지. `.env.local`(gitignored)만.

---

## 2. 워크스트림 (4개)

### W1 — 커리큘럼 완주 (67 → 100강+)  `담당: Codex(생산) / Fable(검증·릴리스)`

남은 모듈 순서 (의존성 순):
1. **ai-basics 잔여**: model-selection-tradeoffs(6), ai-era-timeline(7)
2. **ai-coding-tools** (9모듈): autocomplete-era, chatgpt-coding, ide-agents(Copilot/Cursor/Claude Code), code-review-tools 등 백로그 57~ 행
3. **ai-system-design 잔여**: 백로그 확인 후
4. **practical-vibe-coding** (11모듈)
5. **explanation-practice** (12모듈)
6. **project-textbook** (13모듈, 교재형)
7. **V1 레거시 5강 재생성**: ai-vibe-coding-orientation, web-screen-anatomy, typescript-react-nextjs, git-collaboration-basics, api-db-backend-flow
8. **보류 해제**: production-env-and-secrets (deployment-ops order 5 — 소싱 확보 시)

### W2 — 콘텐츠 리프레시 (신규 동향 반영)  `담당: Grok(감지) → Codex(수집·생산) / Fable(검증)`

상세: [roadmap/CONTENT-REFRESH-2026H2.md](roadmap/CONTENT-REFRESH-2026H2.md)
- 초판 기획(2026-07-05) 이후 업데이트된 AI·바이브코딩 동향을 커리큘럼에 반영.
- 원칙: **후보는 자유롭게, 승격은 공식 문서 P-01 확보분만** (추측 서술 금지).
- stale-KB 재확인: `checked` 30일 경과 KB는 Grok이 목록화 → 재fetch 대조.

### W3 — UI/UX 리팩토링  `담당: Fable(스펙·리뷰) / Codex(구현)`

상세: [roadmap/UIUX-REFACTOR-PLAN.md](roadmap/UIUX-REFACTOR-PLAN.md)
- 67강·259용어 규모에 맞는 정보구조·탐색·읽기 경험 재설계.
- 제약: 콘텐츠(마크다운) 무수정 · 정적 export 유지 · PasswordGate 유지 · verify 통과.

### W4 — 상시 QA  `담당: Grok(실행) / Fable(판정)`

- 기계 QA 5종 스캔(형식·인용 대조·용어 무결성·링크 생존·다이어그램 참조)을 주기 실행.
- Fable은 Grok 보고서를 표본 재검증 후 수용. 극단값은 즉시 재검토 지시.

---

## 3. 실행 프로토콜

### 미션 발급 (운영자 → 에이전트)
- **Codex**: [prompts/CODEX-MISSIONS.md](prompts/CODEX-MISSIONS.md)에서 미션 1개를 골라 Codex에 붙여넣기. Codex는 미션 완료까지 무정지 진행(중간 승인 없음, BLOCKED 기록 후 계속).
- **Grok**: [prompts/RUN-GROK.md](prompts/RUN-GROK.md)를 붙여넣기. Grok은 태스크 목록에서 위에서부터 수행.
- **Fable**: 본 세션에서 "계속" — STATE의 NEXT를 읽고 지휘/검증/직접 수행.

### 병렬 안전 규칙
- 모든 에이전트는 작업 시작 전 `git log --oneline -5; git status` 재대사(다른 에이전트의 변경 확인).
- **파일 소유권**: 동시 작업 시 Codex=콘텐츠 생산 파일(drafts, src/content) 또는 UI 파일 중 미션당 하나의 영역만. Grok=reports/·간단 수정만. 충돌 시 Fable이 조정.
- src/content와 UI 코드(src/app, src/components)를 **같은 시점에 서로 다른 에이전트가 수정하지 않는다** (verify가 전체 빌드이므로 한쪽 깨짐이 서로를 블록).

### 게이트 (사람이 결정하는 것)
1. 배포 승인(현행: Fable이 세션 말미 실행하는 관례 유지 — 운영자가 언제든 회수 가능)
2. 에스컬레이션(루프 3회, 범위 재정의, 정책 변경)
3. 스팟체크(임의 반려)

---

## 4. 우선순위 큐 (2026-07-08 기준)

| 순위 | 작업 | 담당 | 산출물 |
|---|---|---|---|
| 1 | UI/UX 리팩토링 Phase A (정보구조·탐색) | Codex (M3) | src/app·components 개편 |
| 2 | ai-basics 잔여 2강 + ai-coding-tools 착수 | Codex (M1) | 웨이브 26~ |
| 3 | 기계 QA 전수 스캔 + stale-KB 목록 | Grok (T1~T6) | reports/ |
| 4 | 콘텐츠 리프레시 후보 승격(P-01) | Fable→Codex | 신규 KB |
| 5 | V1 레거시 5강 재생성 | Codex (M2) | v2 교체 |

> 운영자 한 줄 지시로 순위 변경 가능. 순위 1(UI)과 2(콘텐츠)는 **서로 다른 파일 영역**이므로 Codex 미션을 순차 발급하면 안전하고, 동시 발급하려면 M3(UI) → Codex, M1(콘텐츠) → Fable 대행으로 분리한다.

## 5. 성공 기준

- 강의 100+ / 용어 300+ / V1 잔존 0 / 기계 QA 위반 0 유지
- UI: 강의 탐색 3클릭 이내, 읽기 화면 TOC·진행 표시 유지, 용어집 검색 가능
- 콘텐츠 신선도: 전 KB `checked` 30일 이내 또는 재확인 기록
- 각 릴리스 `npm run verify` exit 0 + 세션 말미 배포
