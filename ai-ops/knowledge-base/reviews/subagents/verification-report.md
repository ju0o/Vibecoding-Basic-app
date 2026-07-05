APPROVED 91

# P-02 Verification Report: subagents

검증일: 2026-07-05  
대상: `ai-ops/knowledge-base/entries/T10/subagents.md`  
판정: APPROVED  
Knowledge Score: 91 / 100

## Gate 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | 주요 정의, 역사, 구성, 버전 의존 주장 모두 원문 URL 재접속으로 대조. |
| G2 필수 섹션 존재 | PASS | 정의~변경 이력 + Quote Bank 존재. |
| G3 frontmatter 필수 필드 | PASS | id, topicGroup, level, sources, updated 존재. |
| G4 URL 접속/확인 날짜 | PASS | 6개 sources 모두 접속 확인, checked 날짜 존재. |

## 원문 재접속 기록

| URL | 접속 | 판정 |
|---|---:|---|
| https://code.claude.com/docs/en/sub-agents | OK | 공식 Claude Code Docs |
| https://code.claude.com/docs/en/agent-sdk/subagents | OK | 공식 Claude Code Docs |
| https://code.claude.com/docs/en/agents | OK | 공식 Claude Code Docs |
| https://code.claude.com/docs/en/workflows | OK | 공식 Claude Code Docs |
| https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | OK | Anthropic 공식 Engineering |
| https://www.anthropic.com/engineering/building-effective-agents | OK | Anthropic 공식 Engineering |

## 문장 단위 대조 요약

| KB 주장 | 출처 대조 | 판정 |
|---|---|---|
| Subagent는 별도 context, system prompt, tool access, permissions를 가진다. | Claude Code sub-agents 문서의 정의와 일치. | PASS |
| SDK subagent는 `agents` parameter와 `AgentDefinition`으로 정의된다. | Agent SDK subagents 문서의 configuration 표와 일치. | PASS |
| v2.1.198 기준 `/agents` command wizard 동작이 변경되었다. | Claude Code sub-agents 문서의 버전 의존 설명과 일치. | PASS |
| Dynamic workflows는 많은 subagents를 script로 orchestrate한다. | Dynamic workflows 문서와 일치. | PASS |
| Sub-agent architectures는 long-horizon context limitation을 우회한다. | Anthropic context engineering 글의 sub-agent architectures 설명과 일치. | PASS |

## Score

| 기준 | 배점 | 점수 | 근거 |
|---|---:|---:|---|
| S1 공식 출처 | 20 | 19 | 공식 문서·공식 엔지니어링 글만 사용. 일부 본문 보조 링크가 frontmatter sources 밖에 있으나 모두 공식. |
| S2 최신성 | 15 | 15 | 모든 checked 날짜 2026-07-05. 버전 의존 정보에 v2.1.198 명시. |
| S3 교육 적합성 | 15 | 14 | 정의와 선행 개념 논리 적정. 단, `SubAgent` 표기는 glossary에 아직 독립 term 없음. |
| S4 예시 품질 | 10 | 9 | read-only reviewer, test analyzer, dynamic workflow 예시가 구체적. |
| S5 AI 시대 연관성 | 10 | 9 | 바이브코딩 context isolation과 delegation 의미가 구체적. |
| S6 실무 활용성 | 15 | 14 | FAQ 4개, 실수 4개, permission/tool 제한 실무성이 높음. |
| S7 용어 일관성 | 15 | 11 | prerequisite/related id 실존. glossary에 `SubAgent` term 추가 필요. |

합계: 91

## 수정 필요 사항

- 비차단: `SubAgent` 또는 `Subagents` glossary term 추가 권장.
- 비차단: P-04/P-05 단계에서 `subagents-and-delegation` 소비자 연결 필요.

## 승인 가능 여부

승인 가능. G1~G4 통과, 공식 출처 비중 100%, 점수 80 이상.

