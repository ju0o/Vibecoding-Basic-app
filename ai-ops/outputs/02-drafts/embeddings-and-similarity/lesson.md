## 한 줄 정의

임베딩은 텍스트를 의미 비교가 가능한 숫자 벡터로 표현해 질문과 문서 조각 사이의 relatedness를 계산하게 만드는 기술입니다. 사용자는 문장과 문서를 읽지만, 검색 시스템은 그 텍스트를 vector representation으로 바꾸고, 벡터 사이의 distance를 통해 의미상 가까운 후보를 찾습니다. 그래서 embeddings는 "답을 생성하는 기술"이라기보다 "답변에 넣을 후보 근거를 찾는 기술"에 가깝습니다.

OpenAI 문서는 embedding을 floating point numbers의 vector라고 설명하고, 두 vector 사이의 distance가 relatedness를 측정한다고 설명합니다. Claude embeddings 문서는 text embeddings가 semantic similarity를 측정하게 하는 numerical representations of text라고 설명합니다. 이 두 설명을 합치면, 임베딩은 텍스트의 의미를 직접 눈으로 보여주는 것이 아니라, 의미 비교를 계산 가능한 형태로 바꾸는 표현 방식입니다.

이 강의에서 가장 중요한 구분은 similarity와 correctness입니다. 어떤 문서 조각이 질문과 의미상 가까울 수는 있지만, 그 문서가 최종 답변의 claim을 실제로 support한다는 뜻은 아닙니다. ==Embeddings는 관련 후보를 찾는 장치이고, 사실성은 grounding과 citation으로 다시 확인해야 합니다.== 이 구분을 놓치면 RAG 시스템이 "검색은 잘했는데 답은 틀리는" 상태가 됩니다.

## 왜 존재하는가

키워드 검색은 정확한 문자열에 강합니다. 오류 코드, API 이름, 함수명처럼 정확히 같은 단어가 중요한 경우에는 매우 유용합니다. 하지만 사용자가 문서와 다른 표현으로 질문하거나, 문서가 동의어와 paraphrase를 사용하면 관련 자료를 놓칠 수 있습니다. Claude embeddings 문서는 embeddings가 search와 recommendation 같은 semantic similarity task에 쓰인다고 설명합니다. 즉 문제는 단어가 같지 않아도 의미상 가까운 문서를 찾는 것입니다.

예를 들어 사용자가 "AI가 참고할 수 있는 작업 메모리"를 묻고, 문서에는 "context window"라고 쓰여 있을 수 있습니다. 키워드만 보면 두 표현은 멀어 보입니다. Embedding 기반 검색은 텍스트를 numerical representation으로 바꾸고, 질문과 문서 조각의 의미적 relatedness를 distance로 비교합니다. 이 방식은 표현이 달라도 가까운 의미를 찾을 수 있게 해줍니다.

LLM이 외부 지식을 쓰려면 관련 문서를 먼저 찾아야 합니다. OpenAI retrieval 문서는 vector stores가 Retrieval API와 file search tool의 semantic search를 power하며, file을 추가하면 chunked, embedded, indexed된다고 설명합니다. Anthropic Contextual Retrieval 글도 documents를 smaller chunks로 split하고 embedding model로 vector embeddings를 만든 뒤 vector database에 저장한다고 설명합니다. 이 흐름이 RAG의 기반입니다.

Embeddings가 존재하는 이유는 모델에게 모든 문서를 한 번에 넣을 수 없기 때문이기도 합니다. 앞에서 배운 context window는 유한합니다. 모든 강의, 모든 KB, 모든 로그를 넣으면 비용과 context rot 문제가 생깁니다. 따라서 먼저 질문과 의미상 가까운 후보를 찾고, 그 후보만 context에 넣는 절차가 필요합니다. ==임베딩 검색은 context window 앞단에서 "무엇을 넣을지"를 고르는 필터 역할을 합니다.==

하지만 이 필터는 완벽하지 않습니다. Semantic similarity가 높은 문서가 질문과 관련 있을 가능성은 높지만, 그것이 최종 claim의 근거로 충분하다는 뜻은 아닙니다. 그래서 embeddings는 Prompt Engineering, Grounding, Citation, Verification과 함께 배워야 합니다. 후보를 찾고, 근거로 쓰고, 인용하고, 검증하는 흐름이 이어져야 합니다.

## 작동 원리

### 1. 텍스트를 embedding vector로 바꿉니다

작동의 첫 단계는 텍스트를 embedding vector로 변환하는 것입니다. OpenAI 문서는 embedding을 floating point numbers의 vector라고 설명합니다. Claude 문서는 text embeddings가 numerical representations of text라고 설명합니다. 이 말은 시스템이 텍스트를 숫자 배열로 바꿔 저장하고 비교한다는 뜻입니다.

여기서 "숫자로 바뀐다"는 표현을 너무 과장하면 안 됩니다. KB는 embedding이 모델이 텍스트를 완전히 이해했다는 뜻이라고 말하지 않습니다. 공식 문서 표현은 numerical representation과 semantic similarity measurement입니다. 따라서 임베딩을 "의미 이해의 완성"이 아니라 "의미 비교를 위한 계산 표현"으로 이해해야 합니다.

### 2. 벡터 사이의 distance로 relatedness를 봅니다

OpenAI 문서는 두 vector 사이의 distance가 relatedness를 측정하며, small distances는 high relatedness를, large distances는 low relatedness를 시사한다고 설명합니다. 즉 질문 vector와 문서 chunk vector 사이의 거리가 작으면 두 텍스트가 의미상 관련 있을 가능성이 높다고 봅니다.

이 단계는 랭킹의 기초입니다. 사용자의 질문을 embedding으로 바꾸고, 저장된 문서 chunk들의 embedding과 비교합니다. distance가 작은 후보를 상위로 올립니다. 결과적으로 시스템은 "질문과 가장 가까운 문서 조각들"을 얻습니다.

### 3. 문서는 chunk로 나누어 저장됩니다

RAG 실무에서는 전체 문서를 하나의 vector로만 저장하지 않습니다. Anthropic Contextual Retrieval 글은 documents를 smaller chunks로 split하고 embedding model로 vector embeddings를 만든 뒤 vector database에 저장하는 흐름을 설명합니다. OpenAI retrieval 문서도 file을 추가하면 chunked, embedded, indexed된다고 설명합니다.

Chunking은 단순 편의가 아닙니다. 질문과 관련 있는 부분은 문서 전체가 아니라 특정 문단이나 섹션일 수 있습니다. 문서 전체를 하나의 단위로 비교하면 세부 근거를 찾기 어렵습니다. 반대로 chunk를 너무 작게 나누면 원래 문맥을 잃을 수 있습니다. KB는 Contextual Retrieval 글이 chunk가 context를 잃을 수 있음을 고려하라고 설명한다고 정리합니다.

### 4. Vector store는 검색 가능한 컨테이너입니다

Embedding vector는 저장되고 검색되어야 합니다. OpenAI retrieval 문서는 vector stores가 semantic search를 power하는 container라고 설명합니다. Vector store는 문서 chunk의 text, metadata, source URL, embedding vector를 저장하고, 질문 embedding과 가까운 항목을 찾아줍니다.

초보자가 자주 헷갈리는 점은 embedding과 vector store의 차이입니다. Embedding은 텍스트의 vector representation입니다. Vector store는 그 vector를 저장하고 검색하는 container입니다. 즉 embedding은 데이터 표현이고, vector store는 검색 인프라입니다.

### 5. Runtime retrieval은 질문에 맞는 후보를 꺼냅니다

사용자가 질문하면 시스템은 질문도 embedding으로 바꿉니다. 그 다음 vector store에서 질문 vector와 가까운 chunk를 찾습니다. 이 검색 결과는 LLM의 generation context로 들어갈 수 있습니다. 여기까지가 RAG에서 retrieval에 해당하는 핵심 흐름입니다.

그러나 retrieval 결과를 그대로 믿으면 안 됩니다. 유사도 높은 chunk는 "관련 후보"일 뿐입니다. 최종 답변이 해당 chunk를 정확히 대표하는지, claim이 source text로 직접 support되는지 확인해야 합니다. 이 지점에서 Grounding과 Citation이 필요합니다.

### 6. BM25와 hybrid retrieval로 보완합니다

Embeddings는 semantic similarity에 강하지만 exact keyword match가 중요한 경우에는 BM25 같은 키워드 검색이 유용할 수 있습니다. Anthropic Contextual Retrieval 글은 embeddings와 BM25를 결합하면 semantic similarity와 exact match의 장점을 함께 사용할 수 있다고 설명합니다.

예를 들어 "TypeError: X is not a function" 같은 오류 메시지, API endpoint 이름, 설정 키, 특정 파일명은 정확한 문자열 일치가 중요할 수 있습니다. 반대로 "컨텍스트가 너무 길어질 때 생기는 문제"처럼 표현이 다양할 수 있는 질문은 semantic similarity가 도움 됩니다. Hybrid retrieval은 두 신호를 결합하고 필요하면 rerank하는 방식입니다.

### 7. Similarity는 correctness와 분리됩니다

이 강의의 중심 원리는 여기입니다. Similarity가 높다는 것은 관련성이 높을 가능성을 말합니다. 그것이 답변 claim의 사실성을 의미하지 않습니다. KB는 semantic similarity가 높다는 것이 문서가 관련 있을 가능성을 말할 뿐, 답변 claim이 사실이라는 뜻은 아니며 grounding과 citation으로 retrieved evidence가 claim을 support하는지 따로 확인해야 한다고 정리합니다.

예를 들어 사용자가 "Anthropic이 자체 embedding model을 제공하나요?"라고 물었을 때 embedding 검색은 Claude embeddings 문서를 찾을 수 있습니다. 그러나 답변은 그 문서의 실제 claim, 즉 Anthropic이 자체 embedding model을 제공하지 않고 Voyage AI embedding models를 추천한다는 내용과 맞아야 합니다. 검색된 문서가 근처에 있다고 해서 아무 결론이나 내려도 되는 것은 아닙니다.

## 스펙과 세부

### Embedding vector

OpenAI 문서는 embedding을 floating point numbers의 vector라고 설명합니다. 이 표현은 embedding이 사람에게 보이는 문장이 아니라 계산 가능한 수치 표현이라는 점을 보여줍니다. distance 계산과 relatedness ranking은 이 vector 위에서 수행됩니다.

### Distance and relatedness

OpenAI 문서는 small distances가 high relatedness를, large distances가 low relatedness를 시사한다고 설명합니다. 여기서 시사한다는 점이 중요합니다. distance는 검색 신호이지 최종 truth 판단이 아닙니다. 따라서 검색 결과는 후속 grounding으로 검증해야 합니다.

### Vector store 자동 처리

OpenAI retrieval 문서는 file을 vector store에 추가하면 automatically chunked, embedded, and indexed된다고 설명합니다. 이 문장은 실무에서 vector store가 단순 저장소가 아니라 retrieval pipeline의 일부임을 보여줍니다. 파일을 쪼개고, embedding을 만들고, 검색 인덱스를 준비하는 단계가 연결됩니다.

### Anthropic embeddings 문서의 provider 경계

KB는 Claude embeddings 문서가 Anthropic이 자체 embedding model을 제공하지 않지만 Voyage AI embedding models를 추천한다고 설명한다고 정리합니다. 이 정보는 provider 의존성이 있으므로 2026-07-05 기준 문서 정보로 이해해야 합니다. 실무에서는 provider가 어떤 embedding model과 API를 실제로 제공하는지 확인해야 합니다.

### 실행 가능한 예시: 검색 후보 구조

```ts
type SearchHit = {
  chunkId: string
  sourceUrl: string
  embeddingScore: number
  keywordScore?: number
  text: string
}

type SimilaritySearch = (query: string) => Promise<SearchHit[]>

const search: SimilaritySearch = async () => [
  {
    chunkId: "kb-embeddings-001",
    sourceUrl: "https://developers.openai.com/api/docs/guides/embeddings",
    embeddingScore: 0.92,
    keywordScore: 0.41,
    text: "An embedding is a vector.",
  },
]

const hits = await search("embedding은 무엇인가?")
console.log(hits.map((hit) => `${hit.chunkId}: ${hit.embeddingScore}`).join("\n"))
```

이 코드는 실제 embedding API를 호출하지 않습니다. 대신 KB의 SearchHit 구조를 실행 가능한 TypeScript로 보여줍니다. 핵심은 `embeddingScore`가 후보 검색 점수이고, `sourceUrl`과 `text`가 후속 grounding의 재료라는 점입니다. 최종 답변은 이 후보를 그대로 복사하는 것이 아니라 claim이 text로 support되는지 확인한 뒤 작성해야 합니다.

## 원문으로 읽기

> "An embedding is a vector"
>
> — embedding은 vector다.
> [Vector embeddings — OpenAI API Docs](https://developers.openai.com/api/docs/guides/embeddings)

이 문장은 임베딩의 기술적 정의를 가장 짧게 잡아줍니다. 텍스트를 숫자 벡터로 표현해야 distance 계산과 relatedness 비교가 가능해집니다. 초보자는 embedding을 "AI가 이해한 의미"라고 넓게 말하기보다, 먼저 vector representation으로 이해하는 편이 안전합니다.

> "Small distances suggest high relatedness"
>
> — 작은 거리는 높은 관련성을 시사한다.
> [Vector embeddings — OpenAI API Docs](https://developers.openai.com/api/docs/guides/embeddings)

이 문장은 similarity search의 핵심입니다. 질문 vector와 문서 vector 사이의 distance가 작으면 관련 있을 가능성이 높습니다. 다만 suggest라는 성격을 놓치면 안 됩니다. 관련성이 높다는 신호이지, 최종 claim이 사실이라는 보장은 아닙니다.

> "Text embeddings are numerical representations of text"
>
> — text embeddings는 텍스트의 숫자 표현이다.
> [Embeddings — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/embeddings)

이 인용은 OpenAI의 vector 설명과 같은 방향을 가리킵니다. 텍스트를 numerical representation으로 바꾸면 의미 비교 작업을 할 수 있습니다. 그러나 numerical representation이라는 말은 검증을 대신한다는 뜻이 아닙니다.

> "enable measuring semantic similarity"
>
> — semantic similarity를 측정할 수 있게 한다.
> [Embeddings — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/embeddings)

Embeddings가 검색과 추천에 쓰이는 이유가 여기에 있습니다. 표현이 달라도 의미가 가까우면 가까운 후보로 찾을 수 있습니다. AI 학습 사이트에서는 사용자가 "토큰 비용"이라고 묻든 "입력 길이 비용"이라고 묻든 관련 강의를 찾는 데 이런 신호가 도움 됩니다.

> "automatically chunked, embedded, and indexed"
>
> — 자동으로 chunk되고, embedding되고, index된다.
> [Retrieval — OpenAI API Docs](https://developers.openai.com/api/docs/guides/retrieval)

이 문장은 vector store 기반 retrieval 흐름을 보여줍니다. 파일이 들어오면 검색 가능한 단위로 쪼개지고, embedding vector가 만들어지고, index가 준비됩니다. RAG 시스템의 검색 단계가 단순 파일 목록 조회가 아니라 전처리 pipeline임을 알 수 있습니다.

> "semantic search / retrieval in the vector space"
>
> — vector space에서의 semantic search/retrieval.
> [Embeddings — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/embeddings)

이 인용은 semantic search를 "문자열 검색"과 구분하게 해줍니다. vector space에서 가까운 항목을 찾는 것이므로 표현이 달라도 관련 후보를 찾을 수 있습니다. 동시에 exact keyword match가 중요한 경우에는 BM25와 함께 쓰는 hybrid retrieval을 고려해야 합니다.

## 실전에서

### 패턴 1: 교재 검색을 chunk 단위로 설계합니다

AI 학습 사이트에서는 강의 전체를 하나의 검색 단위로만 두지 않고, KB section이나 lesson section을 chunk로 나눌 수 있습니다. 사용자가 질문하면 질문을 embedding으로 바꾸고, 관련 chunk를 찾습니다. 그런 다음 해당 chunk의 source URL과 locator를 함께 모델 context에 넣어 grounded answer를 만들 수 있습니다.

이때 chunking은 품질에 직접 영향을 줍니다. 너무 큰 chunk는 불필요한 내용이 많고, 너무 작은 chunk는 원래 문맥을 잃을 수 있습니다. Anthropic Contextual Retrieval 글이 chunk context 문제를 다룬다는 KB 설명처럼, chunk 설계는 retrieval 품질의 일부입니다.

### 패턴 2: 유사 질문 추천에 씁니다

학습자가 "컨텍스트가 많으면 왜 안 좋아요?"라고 물을 때 기존 FAQ의 "context rot" 항목과 의미상 가깝게 찾을 수 있습니다. 정확히 같은 단어가 없어도 semantic similarity로 관련 후보를 추천합니다. Claude embeddings 문서가 search와 recommendation 같은 task를 언급하는 이유가 여기에 있습니다.

### 패턴 3: Hybrid retrieval로 오류 코드와 개념 검색을 함께 처리합니다

개념 질문은 semantic similarity가 좋지만, 오류 코드나 API 이름은 정확한 keyword match가 중요합니다. Anthropic Contextual Retrieval 글은 embeddings와 BM25를 함께 쓰는 hybrid retrieval을 설명합니다. 바이브코딩 디버깅에서는 이 조합이 자연스럽습니다. "TypeError" 같은 문자열은 BM25로 잡고, "상태가 꼬인 것 같다" 같은 표현은 embedding similarity로 잡습니다.

### 패턴 4: 검색 결과를 답변 근거로 승격하기 전에 검증합니다

Top similarity result를 바로 답변에 쓰지 않습니다. 먼저 문서가 질문과 관련 있는지 보고, 그 다음 답변 claim을 support하는지 확인합니다. source text가 claim을 직접 support하지 않으면 citation을 붙이면 안 됩니다. 이는 Grounding과 Citation 강의의 direct support 원칙과 연결됩니다.

### 패턴 5: Provider 의존 정보를 날짜와 함께 봅니다

KB는 Anthropic이 자체 embedding model을 제공하지 않고 Voyage AI models를 추천한다고 설명하지만, 이런 정보는 provider 정책에 따라 바뀔 수 있습니다. 따라서 공식 문서 확인 날짜를 남기고, 실제 구현 시점에 다시 확인해야 합니다. 이 프로젝트의 KB도 checked 날짜를 frontmatter에 둡니다.

## 한계와 트레이드오프

첫 번째 한계는 similarity가 correctness가 아니라는 점입니다. Semantic similarity가 높은 후보는 관련 있을 가능성이 높지만, 최종 답변이 그 source를 정확히 대표하는지는 별도 문제입니다. 따라서 embeddings는 grounding, citation, verification과 함께 써야 합니다.

두 번째 한계는 chunking 품질입니다. 문서를 어떻게 나누느냐에 따라 검색 결과가 달라집니다. 너무 큰 chunk는 노이즈가 많고, 너무 작은 chunk는 맥락을 잃을 수 있습니다. Contextual Retrieval이 등장하는 이유도 이 맥락 손실 문제와 연결됩니다.

세 번째 한계는 keyword exact match의 필요성입니다. Embeddings는 paraphrase와 개념 검색에 강하지만, 정확한 오류 코드, API 이름, 설정 키는 BM25 같은 keyword search가 유리할 수 있습니다. Hybrid retrieval은 이 trade-off를 줄이는 방법입니다.

네 번째 한계는 비용과 갱신입니다. Embedding 요청도 input tokens 기준 비용이 있는 API 작업입니다. 문서가 바뀌면 chunk, embedding, index 상태도 갱신해야 합니다. 이 작업을 자동화하지 않으면 vector store가 오래된 문서를 기반으로 검색할 수 있습니다.

다섯 번째 한계는 provider 경계입니다. Anthropic 문서는 자체 embedding model을 제공하지 않고 Voyage AI를 추천한다고 설명합니다. 반면 OpenAI는 embeddings와 vector stores를 문서화합니다. 어떤 provider와 모델을 쓰는지에 따라 구현 경로가 달라집니다.

==Embeddings는 좋은 RAG의 출발점이지만, 좋은 답변의 끝은 아닙니다.== 후보 검색, context 삽입, citation, claim verification이 모두 이어져야 사용자가 믿을 수 있는 AI 답변이 됩니다.

## 더 읽기

먼저 OpenAI Vector embeddings 문서를 읽어 embedding vector와 distance-relatedness 관계를 잡으세요. 그 다음 Claude Embeddings 문서에서 semantic similarity와 provider 경계를 확인하세요. OpenAI Retrieval 문서는 vector store가 file을 chunk, embed, index하는 흐름을 보여줍니다. 마지막으로 Anthropic Contextual Retrieval 글을 읽어 chunking, vector database, hybrid retrieval이 RAG 품질과 어떻게 연결되는지 보세요.

- [Vector embeddings — OpenAI API Docs](https://developers.openai.com/api/docs/guides/embeddings)
- [Embeddings — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/embeddings)
- [Retrieval — OpenAI API Docs](https://developers.openai.com/api/docs/guides/retrieval)
- [Introducing Contextual Retrieval — Anthropic Engineering](https://www.anthropic.com/engineering/contextual-retrieval)

읽을 때는 네 질문을 기준으로 보세요. 이 문서는 embedding을 어떤 numerical representation으로 정의하는가, distance가 relatedness를 어떻게 나타내는가, vector store가 어떤 전처리를 수행하는가, 그리고 similarity result를 final answer로 쓰기 전에 어떤 grounding이 필요한가. 이 네 질문이 분리되면 embeddings와 RAG의 관계가 훨씬 선명해집니다.
