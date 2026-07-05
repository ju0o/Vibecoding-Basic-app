APPROVED 88

# Verification Report: embeddings-similarity

- Target: `ai-ops/knowledge-base/entries/T08/embeddings-similarity.md`
- Executor: Codex, P-02 Knowledge Verification
- Checked: 2026-07-05
- Status decision: `approved`

## Gate Verdict

| Gate | Verdict | Evidence |
|---|---:|---|
| G1. 출처 확인 불가(BLOCK) 주장 0건 | PASS | OpenAI Embeddings/Retrieval, Claude Embeddings, Anthropic Contextual Retrieval 원문 대조 완료. |
| G2. 13개 필수 섹션 전부 존재 | PASS | template 13섹션 + Quote Bank 존재. |
| G3. frontmatter 필수 필드 완전 | PASS | `id`, `topicGroup`, `level`, `sources`, `updated` 존재. |
| G4. sources URL 접속 가능 + 확인 날짜 존재 | PASS | frontmatter sources 4개 모두 접속 확인, checked 2026-07-05 존재. |

## Sentence-Level Verification

| Section | Claim checked | Source check | Verdict |
|---|---|---|---|
| 정의/핵심 | embedding은 floating point vector이고 distance가 relatedness를 측정 | OpenAI Vector embeddings 원문 일치. | PASS |
| 정의/핵심 | text embeddings는 semantic similarity 측정을 가능하게 함 | Claude Embeddings 원문 일치. | PASS |
| 역사 | Anthropic은 자체 embedding model을 제공하지 않고 Voyage AI를 추천 | Claude Embeddings 원문 일치. | PASS |
| 문제/핵심 | vector store는 semantic search container이며 file을 chunk/embed/index함 | OpenAI Retrieval 원문 일치. | PASS |
| 관련 기술 | embeddings와 BM25 hybrid retrieval은 semantic similarity와 exact match를 보완 | Anthropic Contextual Retrieval 원문 일치. | PASS |
| AI 시대 | similarity는 후보 검색이고 correctness는 citation/verification이 필요 | OpenAI Citation Formatting의 direct support rule에서 타당하게 유도됨. | PASS |

## Source Registry Fit

- Official source ratio: 100% official docs or official Anthropic Engineering blog.
- Registered/allowed fit: PASS. Anthropic Engineering blog는 SOURCE-REGISTRY 3순위 공식 블로그 범주.

## Knowledge Score

| Criterion | Score | Rationale |
|---|---:|---|
| S1 공식 출처 | 18/20 | 모든 핵심 claim에 공식 URL 존재. Anthropic Engineering blog는 공식 블로그 범주. |
| S2 최신성 | 15/15 | checked 2026-07-05, provider 의존 정보 기준 날짜 있음. |
| S3 교육 적합성 | 13/15 | level 중급 적정, tokenization-context 선행 논리 적합. |
| S4 예시 품질 | 8/10 | SearchHit 타입과 실무 장면 3개 구체적. |
| S5 AI 시대 연관성 | 9/10 | 교재 검색·FAQ 추천·RAG 전 단계와 직접 연결. |
| S6 실무 활용성 | 14/15 | FAQ 3개, 실수 4개, 실제 오개념 반영. |
| S7 용어 일관성 | 11/15 | related id 실존. `Embeddings`, `Similarity`, `Vector Store` glossary 추가 필요. |
| Total | 88/100 | Approved threshold met. |

## Required Fixes

- None blocking.
- Recommended later: `Embeddings`, `Vector Store`, `Semantic Similarity`, `BM25` glossary 추가.
