---
id: rag
title: "RAG (Retrieval-Augmented Generation)"
topicGroup: T09
status: approved
score: 90
level: 기초
prerequisites: []
successors: [context-engineering]
related: [context-engineering, tool-calling, mcp]
consumers:
  lessons: [rag-fundamentals]
  glossary: []
sources:
  - { title: "Claude glossary", url: "https://platform.claude.com/docs/en/about-claude/glossary", checked: 2026-07-05 }
  - { title: "Introducing Contextual Retrieval", url: "https://www.anthropic.com/engineering/contextual-retrieval", checked: 2026-07-05 }
  - { title: "Retrieval", url: "https://developers.openai.com/api/docs/guides/retrieval", checked: 2026-07-05 }
  - { title: "MCP Resources", url: "https://modelcontextprotocol.io/specification/2025-11-25/server/resources", checked: 2026-07-05 }
  - { title: "Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
RAG는 검색으로 가져온 외부 정보를 생성 모델의 입력에 추가해 답변을 보강하는 방법이다. Claude glossary는 RAG를 정보 검색과 언어 모델 생성을 결합해 정확도와 관련성을 높이고 답변을 증거에 더 잘 grounded하게 만드는 기술로 설명한다. (출처: https://platform.claude.com/docs/en/about-claude/glossary, 확인: 2026-07-05)

## 역사
이 재수집본은 `SOURCE-REGISTRY.md`에 등록된 승인 출처만 기준으로 RAG의 실무화 흐름을 설명한다. (출처: ai-ops/sources/SOURCE-REGISTRY.md, 확인: 2026-07-05)
Anthropic은 2024년 9월 19일 Contextual Retrieval 글에서 개발자가 AI 모델의 지식을 보강할 때 일반적으로 RAG를 사용한다고 설명했다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
Claude glossary와 OpenAI Retrieval 문서는 RAG와 retrieval을 최신 정보, 도메인 지식, 파일 기반 semantic search를 모델 답변에 연결하는 실무 패턴으로 다룬다. (출처: https://platform.claude.com/docs/en/about-claude/glossary, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)

## 해결하려는 문제
Claude glossary는 RAG가 모델이 최신 정보, 도메인별 지식, 명시적 citation을 활용하게 도와준다고 설명한다. (출처: https://platform.claude.com/docs/en/about-claude/glossary, 확인: 2026-07-05)
Anthropic은 특정 비즈니스, 법률 사례, 고객지원 지식처럼 모델이 기본 학습만으로 알 수 없는 배경 지식이 필요할 때 RAG가 쓰인다고 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
전통적인 RAG에서는 문서를 작은 chunk로 나누는 과정에서 chunk가 원문 전체의 문맥을 잃을 수 있고, 이 때문에 검색 단계에서 관련 chunk를 놓칠 수 있다. Anthropic은 Contextual Retrieval을 이 문제를 줄이기 위한 전처리 방식으로 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## 핵심 개념
1. 전처리 단계에서 문서 corpus를 작은 chunk로 나눈다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
2. chunk를 embedding model로 vector embedding으로 변환한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
3. vector database는 semantic similarity 검색을 위해 embedding을 저장한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
4. 런타임에는 사용자 query와 관련 있는 chunk를 검색해 generative model의 prompt에 추가한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
5. OpenAI Retrieval API의 vector store는 파일을 추가하면 자동으로 chunk, embed, index하는 container로 설명된다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)
6. BM25와 embedding을 함께 쓰면 exact match와 semantic similarity를 균형 있게 사용할 수 있다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
7. reranking은 처음 검색된 여러 chunk 중 가장 관련 있는 chunk만 모델에 전달하기 위한 filtering 단계다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## 관련 기술
- RAG vs Long Context: Anthropic은 지식베이스가 200,000 tokens보다 작으면 전체 지식베이스를 prompt에 넣는 단순한 방법도 가능하지만, 더 큰 지식베이스에는 RAG가 더 확장 가능한 해결책이라고 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
- RAG vs MCP Resources: RAG는 검색된 문서를 prompt에 넣는 패턴이고, MCP resources는 서버가 파일·DB schema·앱 정보를 URI로 노출하는 표준 primitive다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05; https://modelcontextprotocol.io/specification/2025-11-25/server/resources, 확인: 2026-07-05)
- Embeddings vs BM25: embeddings는 의미 유사성을, BM25는 정확한 단어나 phrase match를 찾는 데 유리하다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
- Contextual Retrieval vs Traditional RAG: Contextual Retrieval은 chunk에 문서 전체 맥락을 설명하는 짧은 문맥을 붙여 retrieval을 개선하는 전처리 방식이다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## 선행 개념
frontmatter prerequisites가 비어 있다. 이 개념은 T09에서 모델 외부 지식 연결의 기본 패턴으로 사용된다. (출처: ai-ops/MASTER_PROGRESS.md, 확인: 2026-07-05)

## 후행 개념
- context-engineering: 검색된 chunk를 얼마나, 어떤 형식으로, 어떤 근거와 함께 넣을지 결정하는 일이 컨텍스트 설계로 이어진다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 RAG는 모델이 프로젝트의 최신 문서, 코드 규칙, 용어 사전, 운영 정책을 참조하게 해 "기억"에 의존하는 생성을 줄이는 방법이다. Claude glossary는 RAG가 외부 knowledge base나 문서 집합을 context window에 전달한다고 설명한다. (출처: https://platform.claude.com/docs/en/about-claude/glossary, 확인: 2026-07-05)
RAG는 출처 추적과도 연결된다. Claude glossary는 RAG가 명시적 citation을 포함한 응답을 돕는다고 설명하고, OpenAI Retrieval 문서는 vector store가 파일 검색을 위한 semantic search 컨테이너로 동작한다고 설명한다. (출처: https://platform.claude.com/docs/en/about-claude/glossary, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)

## 실무 활용
1. 교재 사이트 검색: KB 문서를 chunk로 나누고 embedding index를 만들어 강의 생성 전 관련 근거를 검색한다. (근거: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)
2. 고객지원 챗봇: 제품 정책 문서를 검색해 사용자의 질문과 관련된 조항을 답변 컨텍스트에 넣는다. (근거: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
3. 코드베이스 Q&A: README, ADR, API schema를 vector store에 넣고 query별 top chunk를 찾아 답변에 붙인다. (근거: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)

```ts
type RagPipeline = {
  chunk: (documents: string[]) => string[]
  embed: (chunks: string[]) => Promise<number[][]>
  retrieve: (query: string) => Promise<Array<{ chunk: string; sourceUrl: string }>>
  generate: (query: string, evidence: string[]) => Promise<string>
}
```

## FAQ
Q: RAG는 검색만 붙이면 끝인가?
A: 아니다. Anthropic은 chunking, embeddings, vector database, runtime retrieval, top-K chunk prompt insertion을 RAG 흐름으로 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

Q: RAG가 항상 long context보다 나은가?
A: 아니다. Anthropic은 작은 지식베이스는 전체 prompt 포함이 단순한 선택일 수 있고, 큰 지식베이스에는 RAG가 확장 가능한 선택이라고 설명한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

Q: Vector store는 무엇을 하나?
A: OpenAI 문서는 vector store가 Retrieval API와 file search tool의 semantic search를 지원하는 container이며, 파일 추가 시 chunking, embedding, indexing이 자동 수행된다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: chunk를 너무 기계적으로 자른다. 왜 생기나: 검색 단위를 토큰 수만으로 본다. 교정: chunk boundary, overlap, 문맥 보강을 평가한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
2. 실수: embedding만 쓰면 충분하다고 믿는다. 왜 생기나: semantic similarity가 모든 검색을 해결한다고 오해한다. 교정: 고유명사, 오류 코드, 식별자는 BM25 같은 lexical search와 함께 평가한다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)
3. 실수: top chunk를 많이 넣을수록 좋다고 생각한다. 왜 생기나: 더 많은 증거가 항상 더 좋은 답변을 만든다고 가정한다. 교정: reranking과 top-K 실험으로 비용·지연·정확도 균형을 잡는다. (출처: https://www.anthropic.com/engineering/contextual-retrieval, 확인: 2026-07-05)

## 공식 출처
- RAG는 retrieval과 generation을 결합해 grounded response를 만드는 기술로 정의된다 — [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) (확인: 2026-07-05)
- RAG 전처리와 런타임 검색 흐름은 chunking, embedding, vector database, retrieval, prompt insertion으로 설명된다 — [Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) (확인: 2026-07-05)
- OpenAI Retrieval API에서 vector store는 semantic search를 지원하고 파일을 chunk, embed, index한다 — [Retrieval](https://developers.openai.com/api/docs/guides/retrieval) (확인: 2026-07-05)
- MCP resources는 서버가 모델용 컨텍스트 데이터를 노출하는 primitive다 — [MCP Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources) (확인: 2026-07-05)
- 검색된 chunk를 어떤 형식으로 컨텍스트에 넣을지 결정하는 일은 context engineering으로 이어진다 — [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-05)

## Quote Bank
- > "combines information retrieval with language model generation"
  - 출처: [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) (확인: 2026-07-05)
  - 맥락: RAG의 한 줄 정의를 구성할 때 사용한다.
- > "external knowledge base or a set of documents"
  - 출처: [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) (확인: 2026-07-05)
  - 맥락: RAG가 모델 외부 지식을 연결한다는 점을 설명할 때 사용한다.
- > "retrieved at run time"
  - 출처: [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) (확인: 2026-07-05)
  - 맥락: 사전 학습 지식과 런타임 검색을 구분할 때 사용한다.
- > "often destroy context"
  - 출처: [Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) (확인: 2026-07-05)
  - 맥락: 전통적 RAG chunking의 한계를 설명할 때 사용한다.
- > "documents are typically split into smaller chunks"
  - 출처: [Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) (확인: 2026-07-05)
  - 맥락: chunking이 왜 필요한지 설명할 때 사용한다.
- > "automatically chunked, embedded, and indexed"
  - 출처: [Retrieval](https://developers.openai.com/api/docs/guides/retrieval) (확인: 2026-07-05)
  - 맥락: vector store 기반 검색 파이프라인의 자동 처리 단계를 설명할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
- 2026-07-05: P-01 Loop A 재수집 - Meta AI Research 미등록 출처 제거, 등록부 내 공식 출처로 역사·문제 정의·공식 출처 보강 (Codex, P-01 Loop A)
