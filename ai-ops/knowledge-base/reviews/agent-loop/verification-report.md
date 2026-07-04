APPROVED 91

# Verification Report: agent-loop

- Target: `ai-ops/knowledge-base/entries/T10/agent-loop.md`
- Executor: Codex, P-02 Knowledge Verification
- Checked: 2026-07-05
- Status decision: `approved`

## Gate Verdict

| Gate | Verdict | Evidence |
|---|---:|---|
| G1. 출처 확인 불가(BLOCK) 주장 0건 | PASS | Agent SDK, Anthropic Engineering, evals 글, sub-agents 문서로 핵심 주장 대조됨. |
| G2. 13개 필수 섹션 전부 존재 | PASS | KB README의 13개 필수 섹션 모두 존재. |
| G3. frontmatter 필수 필드 완전 | PASS | `id`, `topicGroup`, `level`, `sources`, `updated` 존재. |
| G4. sources URL 접속 가능 + 확인 날짜 존재 | PASS | frontmatter sources 4개 모두 접속 확인, checked 날짜 존재. |

## Sentence-Level Verification

| Section | Claim checked | Source check | Verdict |
|---|---|---|---|
| 정의 | agent loop는 prompt 평가, 도구 호출, 결과 수신, 반복 구조 | Claude Agent SDK agent-loop 문서 원문과 일치. `https://code.claude.com/docs/en/agent-sdk/agent-loop` | PASS |
| 역사 | Anthropic은 2024-12-19 글에서 workflows와 agents를 구분 | Published date와 workflow/agent 정의 확인. `https://www.anthropic.com/engineering/building-effective-agents` | PASS |
| 해결하려는 문제 | 도구가 있으면 파일 읽기, 명령 실행, 코드 검색, 외부 서비스 상호작용 가능 | Agent SDK 문서와 overview에서 확인. | PASS |
| 핵심 개념 | `max_turns`, `max_budget_usd`, 권한 옵션으로 루프 제어 | Agent SDK agent-loop 문서의 loop control 항목과 일치. | PASS |
| 핵심 개념 | read-only 도구 병렬, state-changing 도구 순차 | Agent SDK 문서의 parallel tool execution 설명과 일치. | PASS |
| 관련 기술 | workflow는 predefined path, agent는 model-directed process | Anthropic Building Effective Agents 원문과 일치. | PASS |
| 후행 개념 | subagent는 별도 컨텍스트와 권한을 가진 assistant | Claude Code sub-agents 문서 확인. `https://code.claude.com/docs/en/sub-agents` | PASS |
| 자주 하는 실수 | 종료 조건, 권한 제한, eval harness 필요성 | Agent SDK 및 Demystifying evals 글 근거와 일치. | PASS |

## Source Registry Fit

- Official source ratio: 100% official or official vendor blog/docs.
- Registered/allowed fit: PASS.
- Notes: Claude Code Docs는 Source Registry 1순위 `Claude Code Docs` 범주, Anthropic Engineering 글은 공식 블로그/엔지니어링 출처로 허용 가능.
- Non-blocking issue: `sub-agents` 문서는 body citation으로 쓰였지만 frontmatter sources에는 없음. Citation Rule은 만족하나 frontmatter 추적성은 개선 가능.

## Knowledge Score

| Criterion | Score | Rationale |
|---|---:|---|
| S1 공식 출처 | 18/20 | 모든 핵심 주장에 공식 출처가 붙어 있음. body-only 공식 URL 누락으로 소폭 감점. |
| S2 최신성 | 15/15 | checked 날짜 2026-07-05, Agent SDK 문서 현재 접속 가능. |
| S3 교육 적합성 | 14/15 | workflow와 agent 차이를 초보자도 이해 가능한 구조로 설명. |
| S4 예시 품질 | 8/10 | 버그 수정, 리서치, 운영 에이전트 예시가 구체적이나 코드 예시는 개념 타입 수준. |
| S5 AI 시대 연관성 | 9/10 | 바이브코딩에서 단일 답변과 반복 실행의 차이를 잘 연결. |
| S6 실무 활용성 | 14/15 | 사용 장면 3개, 오개념 3개가 실무 위험과 직접 연결. |
| S7 용어 일관성 | 13/15 | related/prerequisites id가 실존. glossary의 `Agent` 표기와 충돌 없음. |
| Total | 91/100 | Approved threshold met. |

## Required Fixes

- None blocking.
- Recommended: `sub-agents` URL을 frontmatter sources에 추가하면 후행 개념 추적이 더 명확해진다.

