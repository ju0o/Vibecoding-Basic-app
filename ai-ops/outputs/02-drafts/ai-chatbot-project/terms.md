# 용어 초안: ai-chatbot-project

기존 glossary.ts 대조 완료: `RAG`, `Tool Calling`, `Agent`, `Context Engineering` 계열 기본 용어와 충돌하지 않도록 챗봇 프로젝트 구조 중심 용어만 생성한다.

## 생성 용어

## Conversation State Window

- category: AI 시스템 설계
- shortDefinition: 여러 message와 turn에 걸쳐 보존해야 할 대화 정보와 현재 요청에 포함할 context의 범위
- explanation: Conversation State Window는 챗봇이 이전 대화를 기억하는 것처럼 동작하기 위해 어떤 정보를 저장하고 어떤 정보를 현재 요청에 다시 넣을지 결정하는 설계 단위입니다. 모델 요청 자체가 stateless일 수 있으므로 state 관리는 애플리케이션의 책임입니다.
- related: ["Context Engineering", "RAG", "AI Chatbot"]

## Chatbot Tool Boundary

- category: AI 시스템 설계
- shortDefinition: 모델이 도구 사용을 요청하는 단계와 애플리케이션이 실제 외부 시스템을 호출하는 단계를 분리하는 경계
- explanation: Chatbot Tool Boundary는 tool calling에서 모델의 요청과 실제 실행 권한을 구분합니다. 챗봇은 외부 data나 system에 접근할 수 있지만, 어떤 tool을 언제 실행할지는 애플리케이션의 검증과 권한 경계를 거쳐야 합니다.
- related: ["Tool Calling", "Agent", "Authorization"]

## Retrieval Answer Loop

- category: AI 시스템 설계
- shortDefinition: 사용자의 질문을 semantic search로 관련 문서에 연결하고, 검색 결과를 context로 넣어 답변을 만드는 반복 구조
- explanation: Retrieval Answer Loop는 RAG 기반 챗봇의 핵심 흐름입니다. 사용자의 질문을 바로 모델에게만 보내지 않고, 관련 knowledge를 검색해 context에 넣고 답변 근거를 더 명확하게 만듭니다.
- related: ["RAG", "Semantic Search", "Context Engineering"]
