APPROVED 90

# P-02 Verification Report: ai-system-evaluation

검증일: 2026-07-05  
대상: `ai-ops/knowledge-base/entries/T10/ai-system-evaluation.md`  
판정: APPROVED  
Knowledge Score: 90 / 100

## Gate 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | evals, trace grading, success criteria, agentic coding eval claims 원문 대조. |
| G2 필수 섹션 존재 | PASS | 정의~변경 이력 + Quote Bank 존재. |
| G3 frontmatter 필수 필드 | PASS | id, topicGroup, level, sources, updated 존재. |
| G4 URL 접속/확인 날짜 | PASS | 8개 sources 모두 접속 확인, checked 날짜 존재. |

## 원문 재접속 기록

| URL | 접속 | 판정 |
|---|---:|---|
| https://developers.openai.com/api/docs/guides/agent-evals | OK | OpenAI 공식 API docs |
| https://developers.openai.com/api/docs/guides/evals | OK | OpenAI 공식 API docs |
| https://developers.openai.com/api/docs/guides/evaluation-best-practices | OK | OpenAI 공식 API docs |
| https://developers.openai.com/api/docs/guides/trace-grading | OK | OpenAI 공식 API docs |
| https://platform.claude.com/docs/en/test-and-evaluate/develop-tests | OK | Claude 공식 docs |
| https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | OK | Anthropic 공식 Engineering |
| https://www.anthropic.com/engineering/infrastructure-noise | OK | Anthropic 공식 Engineering |
| https://www.anthropic.com/engineering/writing-tools-for-agents | OK | Anthropic 공식 Engineering |

## 문장 단위 대조 요약

| KB 주장 | 출처 대조 | 판정 |
|---|---|---|
| Agent workflow eval은 traces, graders, datasets, eval runs를 사용한다. | OpenAI agent-evals 문서와 일치. | PASS |
| OpenAI Evals platform은 2026-10-31 read-only, 2026-11-30 shutdown scheduled다. | OpenAI evals 문서의 deprecation notice와 일치. | PASS |
| Evals는 nondeterministic AI system 측정에 필요하다. | OpenAI evaluation best practices 문서와 일치. | PASS |
| Success criteria는 specific, measurable, achievable, relevant해야 한다. | Claude develop-tests 문서와 일치. | PASS |
| Agentic coding eval에서는 runtime environment가 결과에 영향을 준다. | Anthropic infrastructure noise 글과 일치. | PASS |

## Score

| 기준 | 배점 | 점수 | 근거 |
|---|---:|---:|---|
| S1 공식 출처 | 20 | 18 | 모두 공식 출처. OpenAI 최신 docs URL이 SOURCE-REGISTRY의 OpenAI URL과 달라 비차단 감점. |
| S2 최신성 | 15 | 15 | 모든 checked 날짜 2026-07-05. OpenAI Evals deprecation 미래 일정 명시. |
| S3 교육 적합성 | 15 | 14 | eval/test/trace/outcome 구분이 명확함. |
| S4 예시 품질 | 10 | 9 | AgentEvalCase 코드와 trace/regr/eval 활용이 구체적. |
| S5 AI 시대 연관성 | 10 | 9 | 바이브코딩 결과 검증과 직접 연결. |
| S6 실무 활용성 | 15 | 14 | FAQ/실수 항목이 실제 평가 실패 모드를 다룸. |
| S7 용어 일관성 | 15 | 11 | prerequisite/related id 실존. `AI System Evaluation` glossary term은 아직 없음. |

합계: 90

## 수정 필요 사항

- 비차단: SOURCE-REGISTRY에 `developers.openai.com/api/docs` 최신 OpenAI 공식 docs URL 반영 권장.
- 비차단: `AI System Evaluation` glossary term 추가 권장.

## 승인 가능 여부

승인 가능. G1~G4 통과, score 80 이상. Evals platform deprecation 일정은 현재 원문과 일치함.

