---
id: embeddings-similarity
title: "Embeddings and Similarity (임베딩과 의미 유사도)"
topicGroup: T08
status: approved
score: 88
level: 중급
prerequisites: [tokenization-context]
successors: [rag]
related: [context-engineering, grounding-citations]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Vector embeddings", url: "https://developers.openai.com/api/docs/guides/embeddings", checked: 2026-07-05 }
  - { title: "Embeddings", url: "https://platform.claude.com/docs/en/build-with-claude/embeddings", checked: 2026-07-05 }
  - { title: "Retrieval", url: "https://developers.openai.com/api/docs/guides/retrieval", checked: 2026-07-05 }
  - { title: "Introducing Contextual Retrieval", url: "https://www.anthropic.com/engineering/contextual-retrieval", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
임베딩은 텍스트를 의미 비교가 가능한 숫자 벡터로 표현한 것이다. OpenAI 문서는 embedding을 floating point numbers의 vector라고 설명하고, 두 vector 사이의 distance가 relatedness를 측정한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05)
Claude embeddings 문서는 text embeddings가 semantic similarity를 측정하게 하는 numerical representations of text라고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/embeddings, 확인: 2026-07-05)

## 역사
2026-07-05 기준 OpenAI는 embeddings를 search, recommendations, classification, clustering 같은 use case에서 text strings의 relatedness를 측정하는 방식으로 문서화한다. (출처: https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05)
Claude 문서는 Anthropic이 자체 embedding model을 제공하지 않지만, Voyage AI embedding models를 추천한다고 설명한다. 이 내용은 2026-07-05 기준 Anthropic 문서의 벤더 의존 정보다. (출처: https://platform.claude.com/docs/en/build-with-claude/embeddings, 확인: 2026-07-05)
RAG 실무에서는 documents를 chunks로 나누고, chunk를 embeddings로 변환한 뒤 vector database에서 semantic similarity로 검색하는 흐름이 사용된다. Anthropic Contextual Retrieval 글은 이 과정을 RAG 전처리와 runtime retrieval 흐름으로 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## 해결하려는 문제
키워드 검색만으로는 사용자가 다른 표현으로 묻거나 문서가 동의어와 paraphrase를 사용할 때 관련 문서를 놓칠 수 있다. Claude embeddings 문서는 embeddings가 search와 recommendation 같은 semantic similarity task에 쓰인다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/embeddings, 확인: 2026-07-05)
LLM이 외부 지식을 쓰려면 질문과 관련 있는 문서 조각을 찾아 context로 넣어야 한다. OpenAI retrieval 문서는 vector stores가 Retrieval API와 file search tool의 semantic search를 power하며, file을 추가하면 chunked, embedded, indexed된다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)
Embeddings and Similarity는 "문장이 같은 단어를 쓰는가"보다 "의미상 가까운가"를 계산 가능한 형태로 바꾸는 문제를 해결한다. (출처: https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/embeddings, 확인: 2026-07-05)

## 핵심 개념
1. Embedding vector: OpenAI는 embedding을 floating point numbers의 vector로 설명한다. (출처: https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05)
2. Distance and relatedness: OpenAI는 두 vector의 distance가 relatedness를 측정하며, small distances는 high relatedness를, large distances는 low relatedness를 시사한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05)
3. Semantic similarity: Claude 문서는 text embeddings가 semantic similarity 측정을 가능하게 한다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/embeddings, 확인: 2026-07-05)
4. Vector store: OpenAI retrieval 문서는 vector stores가 semantic search를 power하는 container이고 file 추가 시 chunking, embedding, indexing이 자동 수행된다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)
5. RAG preprocessing: Anthropic은 documents를 smaller chunks로 split하고 embedding model로 vector embeddings를 만든 뒤 vector database에 저장한다고 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
6. Hybrid retrieval: Anthropic Contextual Retrieval 글은 embeddings와 BM25를 결합하면 semantic similarity와 exact match의 장점을 함께 사용할 수 있다고 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## 관련 기술
- Embeddings vs Tokens: tokenization은 model input을 계산 단위로 나누고, embeddings는 text를 semantic similarity 계산용 vector로 표현한다. Claude token counting과 OpenAI embedding 문서가 각각 token count와 vector representation을 다룬다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05)
- Embeddings vs BM25: embeddings는 semantic similarity에 강하고, BM25는 exact keyword match에 강하다. Anthropic은 둘을 함께 쓰는 retrieval 개선을 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
- Embeddings vs RAG: embeddings는 관련 문서를 찾기 위한 표현과 검색 기술이고, RAG는 검색된 정보를 generation context로 넣는 전체 패턴이다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05; https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
- Similarity vs Correctness: semantic similarity가 높다는 것은 문서가 관련 있을 가능성을 말할 뿐, 답변 claim이 사실이라는 뜻은 아니다. Grounding과 citation은 retrieved evidence가 claim을 support하는지 따로 확인해야 한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

## 선행 개념
- tokenization-context: embedding 요청도 text input과 token 비용을 가진 API 작업이므로, 입력 단위와 context budget을 먼저 이해해야 한다. OpenAI embeddings 문서는 requests가 input tokens 기준으로 billed된다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05)

## 후행 개념
- rag: RAG는 chunking, embedding, vector database, runtime retrieval, prompt insertion으로 이어지므로 embeddings는 RAG의 핵심 선행 개념이다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 embeddings는 프로젝트 문서, 강의, 오류 로그, 코드 설명을 "의미상 가까운 자료"로 검색하게 만든다. OpenAI retrieval 문서는 vector stores가 file search와 Retrieval API의 semantic search를 power한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)
그러나 embeddings는 검증이 아니라 후보 검색이다. Similarity로 찾은 문서가 실제 claim을 support하는지는 grounding과 citation 규칙으로 다시 확인해야 한다. OpenAI citation formatting 문서는 cited response text를 directly support하는 sources만 cite하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

## 실무 활용
1. 교재 검색: 각 KB section을 chunk로 나누고 embedding을 만들어 사용자 질문과 가까운 chunk를 찾는다. OpenAI retrieval 문서의 vector store 흐름에 근거한다. (근거: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)
2. 유사 질문 추천: 학습자가 묻는 질문을 embedding으로 표현하고, 기존 FAQ와 가까운 항목을 추천한다. Claude embeddings 문서의 semantic similarity use case에 근거한다. (근거: https://platform.claude.com/docs/en/build-with-claude/embeddings, 확인: 2026-07-05)
3. Hybrid retrieval: 오류 코드나 API 이름은 BM25로, 개념 설명은 embedding similarity로 찾아 결과를 합치고 rerank한다. Anthropic Contextual Retrieval 글의 hybrid search 설명에 근거한다. (근거: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

```ts
type SearchHit = {
  chunkId: string
  sourceUrl: string
  embeddingScore: number
  keywordScore?: number
  text: string
}

type SimilaritySearch = (query: string) => Promise<SearchHit[]>
```

## FAQ
Q: Embedding은 모델이 텍스트를 이해했다는 뜻인가?
A: 이 KB에서는 그렇게 표현하지 않는다. 공식 문서는 embeddings를 text의 numerical representation으로 설명하고, similarity measurement에 사용한다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/embeddings, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05)

Q: Similarity가 높으면 답이 맞는가?
A: 아니다. Similarity는 관련 가능성을 나타내는 검색 신호이고, 답변 claim의 사실성은 grounding, citation, verification으로 확인해야 한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

Q: Embedding만 쓰면 keyword search는 필요 없는가?
A: 아니다. Anthropic Contextual Retrieval 글은 embeddings와 BM25를 함께 쓰는 hybrid retrieval을 설명한다. 고유명사, 오류 코드, 정확한 식별자는 keyword search가 유용할 수 있다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: embedding을 데이터베이스 자체라고 생각한다. 왜 생기나: vector store와 embedding vector를 혼동한다. 교정: embedding은 vector representation이고, vector store는 이를 저장·검색하는 container다. (출처: https://developers.openai.com/api/docs/guides/embeddings, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)
2. 실수: top-1 similarity 결과만 그대로 답변에 쓴다. 왜 생기나: 관련성과 사실성을 혼동한다. 교정: 여러 후보를 검색하고, claim support 여부를 citation 기준으로 확인한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
3. 실수: chunking을 대충 해도 embedding이 해결한다고 믿는다. 왜 생기나: vector search를 의미 이해 만능 도구로 본다. 교정: Anthropic Contextual Retrieval 글처럼 chunk가 context를 잃을 수 있음을 고려해 chunking과 context 보강을 평가한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
4. 실수: Anthropic API가 자체 embedding model을 제공한다고 가정한다. 왜 생기나: Claude 문서에 embeddings guide가 있어 provider 제공 모델로 착각한다. 교정: Anthropic 문서는 자체 embedding model을 제공하지 않고 Voyage AI models를 추천한다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/embeddings, 확인: 2026-07-05)

## 공식 출처
- Embedding은 floating point numbers의 vector이며 distance로 relatedness를 측정한다 — [Vector embeddings](https://developers.openai.com/api/docs/guides/embeddings) (확인: 2026-07-05)
- Text embeddings는 semantic similarity를 측정하게 하는 numerical representations of text다 — [Embeddings](https://platform.claude.com/docs/en/build-with-claude/embeddings) (확인: 2026-07-05)
- Vector stores는 semantic search를 power하며 파일을 chunk, embed, index한다 — [Retrieval](https://developers.openai.com/api/docs/guides/retrieval) (확인: 2026-07-05)
- RAG preprocessing은 documents를 chunk로 나누고 embedding model로 vector embedding을 만든 뒤 vector database에 저장한다 — [Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) (확인: 2026-07-05)
- Hybrid retrieval은 embeddings와 BM25를 함께 사용해 semantic similarity와 exact match를 보완한다 — [Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) (확인: 2026-07-05)

## Quote Bank
- > "An embedding is a vector"
  - 출처: [Vector embeddings](https://developers.openai.com/api/docs/guides/embeddings) (확인: 2026-07-05)
  - 맥락: embedding의 기술적 정의를 설명할 때 사용한다.
- > "Small distances suggest high relatedness"
  - 출처: [Vector embeddings](https://developers.openai.com/api/docs/guides/embeddings) (확인: 2026-07-05)
  - 맥락: vector distance와 유사도의 관계를 설명할 때 사용한다.
- > "Text embeddings are numerical representations of text"
  - 출처: [Embeddings](https://platform.claude.com/docs/en/build-with-claude/embeddings) (확인: 2026-07-05)
  - 맥락: 초보자용 한 줄 정의를 만들 때 사용한다.
- > "enable measuring semantic similarity"
  - 출처: [Embeddings](https://platform.claude.com/docs/en/build-with-claude/embeddings) (확인: 2026-07-05)
  - 맥락: embeddings가 왜 검색에 쓰이는지 설명할 때 사용한다.
- > "automatically chunked, embedded, and indexed"
  - 출처: [Retrieval](https://developers.openai.com/api/docs/guides/retrieval) (확인: 2026-07-05)
  - 맥락: vector store 기반 retrieval 흐름을 설명할 때 사용한다.
- > "semantic search / retrieval in the vector space"
  - 출처: [Embeddings](https://platform.claude.com/docs/en/build-with-claude/embeddings) (확인: 2026-07-05)
  - 맥락: semantic search 개념을 설명할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
