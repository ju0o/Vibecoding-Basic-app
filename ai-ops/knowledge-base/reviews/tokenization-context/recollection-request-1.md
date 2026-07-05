# 재수집 요청: tokenization-context (루프 1/2)

## 현재 점수: 78 / 미달 기준: G1, S1, S7

## 항목별 지시

| 기준 | 감점 사유 | 구체적 보강 지시 |
|---|---|---|
| G1/S1 | `Cached prompt prefixes still occupy the context window` 문구와 주장은 Claude `Context windows` 문서에서 확인되지만, KB의 핵심 개념·공식 출처·Quote Bank가 `Prompt caching` 문서를 출처로 적고 있다. | `## 핵심 개념` 6번, `## 공식 출처`의 cached prefix bullet, `## Quote Bank`의 해당 quote 출처 URL을 `https://platform.claude.com/docs/en/build-with-claude/context-windows`로 교체한다. |
| S7 | Quote Bank는 원문 그대로뿐 아니라 정확한 출처 위치를 가져야 한다. 현재 quote text는 맞지만 source document가 틀려 표준 인용으로 쓰기 어렵다. | Quote Bank의 문구는 유지하고 출처 문서명만 `Context windows`로 교체한다. |

## 금지: 이미 통과한 섹션 임의 수정

- 정의, 역사, 해결하려는 문제, FAQ, 자주 하는 실수는 재작성하지 않는다.
- token counting, Claude Code prompt caching, model tokenizer 관련 통과 문장은 유지한다.
- P-03에서는 위 3개 citation 위치만 수정한다.
