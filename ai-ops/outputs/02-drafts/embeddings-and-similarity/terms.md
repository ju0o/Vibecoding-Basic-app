# 용어 초안: embeddings-and-similarity

## Embeddings
- category: AI 시스템
- shortDefinition: 텍스트를 의미 비교가 가능한 숫자 벡터로 표현한 것
- explanation: Embeddings는 텍스트를 floating point numbers의 vector 또는 numerical representation으로 바꾸어 relatedness와 semantic similarity를 계산할 수 있게 합니다. 검색, 추천, 분류, clustering, RAG 후보 검색에서 문서와 질문을 비교하는 기초 표현으로 쓰입니다.
- related: ["Semantic Similarity", "Vector Store", "RAG"]

## Semantic Similarity
- category: AI 시스템
- shortDefinition: 표현이 달라도 의미상 얼마나 가까운지 비교하는 검색 신호
- explanation: Semantic Similarity는 단어가 정확히 같은지보다 문장이나 문서 조각의 의미가 얼마나 관련 있는지를 봅니다. Embedding vector 사이의 distance가 relatedness를 측정하는 데 쓰이지만, 관련성이 높다는 것이 claim의 사실성을 보장하지는 않습니다.
- related: ["Embeddings", "Grounding", "Citation"]

## Vector Store
- category: AI 시스템
- shortDefinition: embedding vector를 저장하고 semantic search에 사용할 수 있게 하는 저장·검색 컨테이너
- explanation: Vector Store는 파일이나 문서 조각을 chunk, embed, index한 뒤 질문 embedding과 가까운 후보를 찾는 데 쓰입니다. RAG에서는 runtime retrieval 단계에서 관련 chunk를 찾고 generation context에 넣는 기반이 됩니다.
- related: ["Embeddings", "RAG", "Semantic Similarity"]

## BM25
- category: 검색
- shortDefinition: 정확한 단어 일치와 문서 내 중요도를 활용하는 전통적 키워드 검색 방식
- explanation: BM25는 semantic similarity보다 exact keyword match에 강한 검색 신호입니다. 오류 코드, API 이름, 고유명사처럼 정확한 문자열이 중요한 경우 embeddings와 함께 hybrid retrieval로 쓰일 수 있습니다.
- related: ["Hybrid Retrieval", "Vector Store", "검색"]

## Hybrid Retrieval
- category: AI 시스템
- shortDefinition: embedding 기반 semantic search와 BM25 같은 keyword search를 결합하는 검색 방식
- explanation: Hybrid Retrieval은 embeddings의 의미 유사도 장점과 BM25의 exact match 장점을 함께 사용합니다. 개념 설명은 semantic similarity로 찾고, 오류 코드나 식별자는 keyword search로 보완한 뒤 결과를 합치고 rerank하는 식으로 설계할 수 있습니다.
- related: ["Embeddings", "BM25", "RAG"]

