# CONTENT-REFRESH-2026H2 — 초판(2026-07-05) 이후 동향 반영 계획

> 원칙: **후보는 자유롭게 적되, 커리큘럼 승격은 공식 문서를 P-01로 실제 fetch·확보한 것만.** 추측·전문(傳聞) 서술 금지. 이 문서는 후보 대장이며, 승격 시 상태를 갱신한다.

## A. 재확인 대상 (stale-KB 절차)

- 전 KB frontmatter `checked` 날짜 기준 30일 경과분을 Grok(T6)이 목록화 → Codex(M4)가 재fetch 대조.
- 인용문이 원문에서 사라졌거나 바뀐 경우: KB Quote Bank 갱신 → 해당 강의 인용 보수 → 검증 리포트에 변경 기록.
- 특히 제품 문서(Firebase·Vercel·GitHub Docs)는 변경이 잦으므로 우선 재확인.

## B. 신규 주제 후보 (승격 대기)

| # | 후보 | 근거 출처(승격 시 fetch) | 들어갈 모듈 | 상태 |
|---|---|---|---|---|
| R1 | **Claude 5 모델 패밀리 (Fable 5 · Mythos 5, Mythos-class 티어)** — 2026 모델 세대 구분과 선택 | anthropic.com/news/claude-fable-5-mythos-5 + docs.claude.com 모델 문서 | ai-basics(model-selection-tradeoffs와 연계) | 후보 |
| R2 | **model-selection-tradeoffs** (백로그 55행, 기존 계획) — 능력·비용·지연의 3축 선택 | Anthropic/OpenAI 공식 모델·가격 문서 | ai-basics order 6 | 백로그 승계 |
| R3 | **ai-era-timeline** (백로그 56행) — 자동완성→어시스턴트→에이전트 시대 구분 | GitHub Copilot 공식 문서 + Karpathy 기존 KB 재활용 | ai-basics order 7 | 백로그 승계 |
| R4 | **AI 코딩 도구 지형 2026** — Copilot/Claude Code/Cursor 등 도구 계열과 역할 구분 | 각 도구 공식 문서 | ai-coding-tools 모듈 | 후보 |
| R5 | **MCP 현행 스펙 재확인** — 기존 mcp KB의 checked 갱신 + 변경분 반영 | modelcontextprotocol 공식 문서 | ai-system-design(기존 강의 보수) | 후보 |
| R6 | **Agent SDK / 에이전트 하네스** — 에이전트 실행 환경 개념 | Anthropic 공식 문서 | ai-system-design | 후보 |
| R7 | **바이브코딩 용어 후속 동향** — 사전 등재 이후 확산·비판 담론 | 기존 vibe-coding-origin KB 재확인 + 신규 공식·사전 출처 | getting-started(기존 강의 보수) | 후보 |

## C. 절차

1. **감지(Grok)**: T6 stale 목록 + (선택) 후보 출처 접근 가능 여부 사전 확인.
2. **승격 판정(Fable)**: 후보 중 소싱 가능·커리큘럼 적합분을 골라 Codex M4 또는 직접 P-01.
3. **수집·생산(Codex/Fable)**: P-01→P-02(Score 80+)→필요 시 P-04 신규 강의 또는 기존 강의 보수.
4. **기록**: 본 문서의 상태 열 갱신(후보→승격→released / 소싱 불가(사유)).

## D. 하지 않는 것

- 공식 문서 없이 "~라고 알려져 있다" 식 서술로 강의 만들기.
- 기존 강의의 대량 재작성(변경된 사실만 정밀 보수 — diff 최소화).
- 뉴스성 소식 나열(개념·원리 중심 유지 — 이 사이트는 아카이브지 뉴스레터가 아님).
