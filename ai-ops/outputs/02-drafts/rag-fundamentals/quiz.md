# 퀴즈 초안: rag-fundamentals

## quiz
question: RAG를 실무에 적용할 때 가장 적절한 설명은 무엇인가요?
options:
  - 검색된 chunk를 많이 넣을수록 항상 답변 품질이 좋아진다
  - 문서를 chunk로 나누고 관련 chunk를 검색해 모델 입력에 넣되, reranking과 top-K로 품질을 조절한다
  - embedding 검색만 쓰면 고유명사나 오류 코드 검색 문제도 항상 해결된다
answer: 문서를 chunk로 나누고 관련 chunk를 검색해 모델 입력에 넣되, reranking과 top-K로 품질을 조절한다
explanation: KB는 RAG 흐름을 chunking, embedding, vector database, runtime retrieval, prompt insertion으로 설명하고, reranking을 관련 chunk만 전달하기 위한 filtering 단계로 설명합니다. 많은 chunk가 항상 좋은 것은 아니며, embedding만으로 exact match 문제를 모두 해결한다고 보는 것도 오개념입니다.

## explanationPrompt
prompt: "RAG는 그냥 검색 결과를 프롬프트에 붙이는 것 아닌가요?"라고 묻는 동료에게 설명해보세요.
guide:
  - RAG가 retrieval과 generation을 결합하는 방식임을 말하기
  - chunk, embedding, vector database, retrieval 순서로 설명하기
  - long context와 RAG의 선택 기준을 간단히 말하기
  - BM25와 reranking이 왜 필요한지 오개념과 함께 설명하기
