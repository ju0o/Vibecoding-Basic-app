## 오늘 배울 것

오늘은 RAG가 무엇인지 배웁니다. RAG는 검색으로 가져온 외부 정보를 생성 모델의 입력에 추가해 답변을 보강하는 방법입니다.

이 강의에서는 chunk, embedding, vector database, retrieval, reranking 같은 흐름을 한 번에 봅니다. 목표는 RAG를 "검색 붙이기"가 아니라, 근거를 찾아 컨텍스트에 넣는 설계로 이해하는 것입니다.

## 한 줄 정의

RAG는 검색으로 가져온 외부 정보를 생성 모델의 입력에 추가해 답변을 보강하는 방법입니다.

Claude glossary는 RAG를 정보 검색과 언어 모델 생성을 결합해 정확도와 관련성을 높이고, 답변을 증거에 더 잘 grounded하게 만드는 기술로 설명합니다.

## 쉬운 비유

RAG는 시험을 볼 때 기억만 믿지 않고 오픈북 자료를 찾아보는 방식과 비슷합니다.

머릿속 기억만으로 답하면 오래되었거나 틀린 내용을 말할 수 있습니다. 반대로 필요한 페이지를 찾아 옆에 펴놓고 답하면 근거가 분명해집니다. RAG는 질문과 관련 있는 문서 조각을 찾아 모델 입력에 함께 넣는 방식입니다.

다만 오픈북과 다른 점도 있습니다. 책 전체를 다 펼쳐놓으면 오히려 중요한 페이지를 찾기 어렵습니다. 그래서 문서를 작게 나누고, 질문과 관련 있는 조각을 고르고, 필요하면 다시 순위를 매깁니다.

## 왜 생겼는가

이 재수집본은 승인된 출처 기준으로 RAG의 실무화 흐름을 설명합니다. Anthropic은 2024년 9월 19일 Contextual Retrieval 글에서 개발자가 AI 모델의 지식을 보강할 때 일반적으로 RAG를 사용한다고 설명했습니다.

Claude glossary와 OpenAI Retrieval 문서는 RAG와 retrieval을 최신 정보, 도메인 지식, 파일 기반 semantic search를 모델 답변에 연결하는 실무 패턴으로 다룹니다.

## 어떤 문제를 해결하는가

모델은 기본 학습만으로 특정 비즈니스, 법률 사례, 고객지원 지식처럼 최신이거나 도메인에 특화된 배경 지식을 알 수 없습니다. Claude glossary는 RAG가 모델이 최신 정보, 도메인별 지식, 명시적 citation을 활용하게 도와준다고 설명합니다.

또 다른 문제는 검색 단위의 문맥 손실입니다. 전통적인 RAG에서는 문서를 작은 chunk로 나누는 과정에서 원문 전체의 문맥을 잃을 수 있습니다. Anthropic은 Contextual Retrieval을 이 문제를 줄이기 위한 전처리 방식으로 설명합니다.

## 핵심 개념

첫째, 문서 corpus를 작은 chunk로 나눕니다. corpus는 검색 대상 문서 묶음입니다. 너무 큰 문서를 그대로 넣기보다 검색 가능한 단위로 나누는 전처리입니다.

둘째, chunk를 embedding model로 vector embedding으로 변환합니다. embedding은 문장의 의미를 숫자 벡터로 표현한 값입니다. 이 값으로 의미가 비슷한 문서를 찾을 수 있습니다.

셋째, vector database가 embedding을 저장합니다. 런타임에는 사용자 query와 관련 있는 chunk를 찾아 generative model의 prompt에 추가합니다.

넷째, BM25와 embedding을 함께 쓸 수 있습니다. embedding은 의미 유사성을 찾는 데 강하고, BM25는 정확한 단어나 phrase match에 유리합니다.

다섯째, reranking은 처음 검색된 여러 chunk 중 가장 관련 있는 chunk만 모델에 전달하기 위한 filtering 단계입니다. 많은 chunk를 넣는 대신, 더 관련 있는 근거를 고르는 단계입니다.

## 실제 예시

교재 사이트 검색을 생각해봅시다. 강의와 KB 문서를 chunk로 나누고 embedding index를 만들어두면, 사용자가 "MCP와 RAG 차이"를 물었을 때 관련 문서 조각을 찾을 수 있습니다.

그 다음 모델은 검색된 chunk를 근거로 답합니다. 이때 검색 결과를 그대로 많이 붙이는 것이 아니라, 출처와 핵심 주장, 사용할 섹션을 정리해 넣으면 Context Engineering과 연결됩니다.

## 코드 예시

아래는 RAG 흐름을 타입과 간단한 함수로 표현한 예시입니다.

```ts
type RetrievedChunk = { chunk: string; sourceUrl: string }

const documents = ["RAG는 외부 지식을 검색해 모델 입력에 추가합니다."]

function retrieve(query: string): RetrievedChunk[] {
  return documents
    .filter((document) => document.includes("RAG") || query.includes("RAG"))
    .map((chunk) => ({ chunk, sourceUrl: "KB" }))
}

const evidence = retrieve("RAG는 무엇인가요?")
console.log(evidence[0]?.chunk)
```

## AI 시대에서의 의미

바이브코딩에서 RAG는 모델이 프로젝트의 최신 문서, 코드 규칙, 용어 사전, 운영 정책을 참조하게 해 기억에만 의존하는 생성을 줄이는 방법입니다.

RAG는 출처 추적과도 연결됩니다. Claude glossary는 RAG가 명시적 citation을 포함한 응답을 돕는다고 설명하고, OpenAI Retrieval 문서는 vector store가 파일 검색을 위한 semantic search 컨테이너로 동작한다고 설명합니다.

## 자주 헷갈리는 것

RAG는 검색만 붙이면 끝이 아닙니다. chunking, embeddings, vector database, runtime retrieval, top-K chunk prompt insertion 같은 흐름이 함께 필요합니다.

RAG가 항상 long context보다 나은 것도 아닙니다. Anthropic은 지식베이스가 200,000 tokens보다 작으면 전체 지식베이스를 prompt에 넣는 단순한 방법도 가능하지만, 더 큰 지식베이스에는 RAG가 더 확장 가능한 해결책이라고 설명합니다.

embedding만 쓰면 충분하다는 생각도 위험합니다. 고유명사, 오류 코드, 식별자는 BM25 같은 lexical search와 함께 평가해야 할 수 있습니다.

## 실무에서 쓰는 방식

실무에서는 교재 사이트 검색, 고객지원 챗봇, 코드베이스 Q&A 같은 곳에 RAG를 씁니다. 문서를 chunk로 나누고, embedding index나 vector store를 만들고, query별 top chunk를 찾아 답변 컨텍스트에 붙입니다.

검색 품질은 실험으로 봅니다. chunk boundary, overlap, 문맥 보강, reranking, top-K를 바꿔보며 비용·지연·정확도의 균형을 잡습니다.

## 공부 체크리스트

- RAG를 retrieval과 generation을 결합한 방식으로 설명할 수 있다.
- chunk, embedding, vector database, retrieval의 흐름을 순서대로 말할 수 있다.
- RAG와 long context가 항상 우열 관계가 아니라는 점을 설명할 수 있다.
- embedding 검색과 BM25 검색의 차이를 예로 들 수 있다.

## 참고 출처

- [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary)
- [Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval)
- [Retrieval](https://developers.openai.com/api/docs/guides/retrieval)
- [MCP Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources)
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
