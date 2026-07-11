# Stale KB Report — M4 Content Refresh Sweep (2026-07-11)

## 기준
- 기준일: 2026-07-11
- stale cutoff: `checked < 2026-06-11`
- 스캔 범위: `ai-ops/knowledge-base/entries/**/*.md`
- 스캔 파일 수: 58
- `checked` 누락 KB: 0
- 30일 경과 stale KB: 0

## stale 판정

| 결과 | 파일 | 사유 |
|---|---|---|
| stale 없음 | n/a | 모든 KB source `checked` 값이 2026-06-11 이후임 |

## 재fetch 대상

stale KB가 없으므로 기존 KB의 출처 재fetch 및 인용 변동 보수 대상은 0건이다. 이번 M4에서는 `CONTENT-REFRESH-2026H2.md` 후보 중 공식 문서 fetch가 확보된 신규 후보 승격만 수행했다.

## 신규 후보 승격 시도

| 후보 | 판정 | 근거 및 처리 |
|---|---|---|
| R1 Claude 5 모델 패밀리 | 단독 KB 보류, R2 근거로 흡수 | Claude Platform의 Fable/Mythos 문서 fetch 성공. 다만 특정 제품 세대 뉴스 성격이 강해 독립 개념 KB가 아니라 `model-selection-tradeoffs`의 사례·Quote Bank로 반영. |
| R2 model-selection-tradeoffs | 승격 완료 | OpenAI Model selection/Models/Pricing, Claude Choosing a model/Models overview/Pricing/Fable·Mythos 문서 fetch 성공. KB 생성 및 P-02 검증 승인. |
| R3 ai-era-timeline | 소싱 가능, 별도 P-01 대기 | GitHub Copilot features/cloud agent 문서 fetch 성공. 기존 `vibe-coding-origin-karpathy`와 연결 가능하나 시대 구분 범위가 커서 이번 런에서는 KB화하지 않음. |
| R4 AI 코딩 도구 지형 2026 | 부분 소싱, 범위 보류 | GitHub Copilot, Claude Agent SDK, OpenAI Agents SDK 문서는 fetch 성공. Cursor docs는 URL은 확인되나 본문 fetch가 0줄로 수집되어 멀티벤더 비교 KB의 공식 소스셋이 불완전함. |
| R5 MCP 현행 스펙 재확인 | stale 아님 | 기존 `mcp` KB의 checked가 30일 이내라 M4 stale 재수집 대상이 아님. |
| R6 Agent SDK / 에이전트 하네스 | 소싱 가능, 범위 보류 | OpenAI Agents SDK와 Claude Agent SDK 문서 fetch 성공. 기존 `agent-loop`·`harness` KB와 중복이 커서 신규 KB id/범위 확정 후 별도 P-01 권장. |
| R7 바이브코딩 용어 후속 동향 | stale 아님 | 기존 `vibe-coding-origin-karpathy` KB가 특수 출처 승인 후 2026-07-06에 승인되어 30일 이내임. 신규 공식·사전 출처 재수집 대상 아님. |

## 승격 산출물
- KB: `ai-ops/knowledge-base/entries/T08/model-selection-tradeoffs.md`
- 검증 리포트: `ai-ops/knowledge-base/reviews/model-selection-tradeoffs/verification-report.md`

## 결론
- stale KB: 0
- 소싱 실패로 인한 stale 미해소: 없음
- 신규 KB 승격: 1건 (`model-selection-tradeoffs`, score 91)
