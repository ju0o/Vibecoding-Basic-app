APPROVED 90

# P-02 Verification Report — harness

- Date: 2026-07-05
- Executor: Codex, P-02 Knowledge Verification (continuous flow, O-05.2)
- Target KB: `ai-ops/knowledge-base/entries/T10/harness.md`
- Verdict: APPROVED
- Knowledge Score: 90 / 100

## Gate Verdict

| Gate | Verdict | Evidence |
|---|---|---|
| G1. 출처 확인 불가 주장 0건 | PASS | OpenAI Agents SDK, Claude Code Docs, Anthropic Engineering 원문으로 주요 사실을 대조했다. |
| G2. 필수 섹션 존재 | PASS | 템플릿 섹션 + Quote Bank + 변경 이력 존재. |
| G3. frontmatter 필수 필드 | PASS | id/topicGroup/status/score/level/prerequisites/related/consumers/sources/updated 존재. |
| G4. sources URL 접속 가능 | PASS | 7개 source URL 원문 재접속 완료. |

## Source Registry Fit

| Source | Registry status | Verdict |
|---|---|---|
| `developers.openai.com/api/docs` | OpenAI 공식 API 문서. Registry에는 `platform.openai.com/docs`로 등록되어 있어 URL 표기 갱신 필요 | PASS with note |
| `code.claude.com/docs` | 1순위 Claude Code 공식 문서 | PASS |
| `anthropic.com/engineering/...` | 3순위 공식 엔지니어링 글 | PASS |

공식 출처 비중: 100% (7/7 official or official engineering guide).

## Sentence-Level Verification Table

| Section | KB claim checked | Source evidence | Result |
|---|---|---|---|
| 정의 | Harness는 model calls, tool routing, handoffs, approvals, tracing, recovery, run state를 소유하는 control plane이다. | OpenAI Sandbox Agents 문서의 harness/control plane 설명과 ownership list를 확인했다. | PASS |
| 역사 | evaluation harness와 agent harness는 서로 다르다. | Anthropic evals 문서가 evaluation harness와 agent harness/scaffold를 별도 bullet로 정의한다. | PASS |
| 해결 문제 | agent mistakes can propagate and compound because agents use tools over turns and modify environment state. | Anthropic evals 문서에서 multi-turn tool use와 environment state 변경 리스크 확인. | PASS |
| 핵심 개념 | Sandbox는 filesystem, shell, packages, ports, snapshots 등을 제공하는 execution environment다. | OpenAI Sandbox Agents 문서의 sandbox workspace/manifest/capabilities/ports 설명 확인. | PASS |
| 핵심 개념 | Guardrails는 input/output/tool behavior를 자동 검증하고 human review는 run을 pause한다. | OpenAI Guardrails 문서의 automatic validation 및 human review 설명 확인. | PASS |
| 핵심 개념 | Traces는 debugging과 evaluation examples에 쓰인다. | OpenAI Observability 문서에서 “Use traces for two jobs” 목록 확인. | PASS |
| 핵심 개념 | Claude hooks는 PreToolUse, PostToolUse, Stop, SubagentStart 등 실행 단계에서 동작한다. | Claude Code Hooks 문서의 Available hooks table 확인. | PASS |
| 핵심 개념 | deny rules는 allow보다 우선한다. | Claude Code Permissions 문서에서 deny-first precedence 확인. | PASS |
| Quote Bank | 6개 인용구 원문 일치 | OpenAI Sandbox/Guardrails/Observability, Claude Hooks, Anthropic evals에서 단문 인용 확인. | PASS |

## Knowledge Score

| Criterion | Score | Rationale |
|---|---:|---|
| S1 공식 출처 | 18 / 20 | 전부 공식 계열이나 OpenAI API Docs URL이 SOURCE-REGISTRY의 구 표기와 달라 2점 감점. |
| S2 최신성 | 14 / 15 | 확인 날짜 현재일. OpenAI Sandbox Agents는 beta 성격의 문서라 변경 가능성 주의가 필요해 1점 감점. |
| S3 교육 적합성 | 14 / 15 | harness/sandbox/guardrails/eval 차이가 비교식으로 정리되어 level 적정. |
| S4 예시 품질 | 9 / 10 | sandbox, permission harness, eval harness 활용 장면이 구체적이다. |
| S5 AI 시대 연관성 | 9 / 10 | AI 코드 실행 환경과 결과 신뢰 조건을 구체적으로 연결한다. |
| S6 실무 활용성 | 14 / 15 | 권한·hook·trace·grader 실무 연결이 적절하다. |
| S7 용어 일관성 | 12 / 15 | `Harness Engineering` glossary는 존재한다. 다만 prerequisite `orchestration`은 이번 P-02에서 새로 approved되는 항목이라 추후 glossary 추가가 필요하다. |
| Total | 90 / 100 | APPROVED |

## Required Fixes

없음.

## Non-Blocking Notes

- `SOURCE-REGISTRY.md`의 OpenAI 공식 문서 URL 표기 갱신 권장.
- Sandbox Agents 문서는 빠르게 바뀔 수 있으므로 6개월 이내 노후화 재검토 후보로 표시하는 것이 좋다.
