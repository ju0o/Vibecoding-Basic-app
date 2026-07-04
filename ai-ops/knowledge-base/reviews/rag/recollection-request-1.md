# 재수집 요청: rag (루프 1/2)

## 현재 점수: 76 / 미달 기준: S1, S7

## 항목별 지시

| 기준 | 감점 사유 | 구체적 보강 지시 |
|---|---|---|
| S1 공식 출처 | `Meta AI Research` RAG publication URL은 접속 가능하고 공식 연구 페이지이나 현재 `ai-ops/sources/SOURCE-REGISTRY.md` 허용 출처 목록에 없다. | 운영자가 Meta AI Research를 승인하면 `SOURCE-REGISTRY.md`에 신규 출처로 등록한 뒤, `## 역사`, `## 해결하려는 문제`, `## 공식 출처`의 Meta 기반 문장을 유지하고 재검증한다. 승인하지 않으면 해당 문장들을 현재 등록부에 있는 공식 벤더 문서, 공식 블로그, 또는 운영자가 승인한 연구 출처로 대체한다. |
| S7 용어 일관성 | `RAG`가 `src/content/glossary.ts`에 표준 용어로 아직 없다. | glossary에 `RAG` term을 추가하거나, 재평가 전에 용어 표준 파일에 등록된 표기와 KB title/본문 표기를 맞춘다. |
| Citation tracking | 일부 body citation이 frontmatter sources에 없다. | `effective-context-engineering`, MCP resources 등 본문에 쓰는 공식 URL을 frontmatter `sources`와 `## 공식 출처`에 반영한다. |

## 금지: 이미 통과한 섹션 임의 수정

- 13개 섹션 구조는 유지한다.
- Anthropic Contextual Retrieval, OpenAI Retrieval, Claude glossary 기반의 chunking/embedding/vector store/RAG 정의 설명은 사실 검증을 통과했으므로 불필요하게 다시 쓰지 않는다.

