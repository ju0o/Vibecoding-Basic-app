# 용어 초안: chat-coding-era

기존 glossary.ts 대조 완료: `Chat Coding`, `GitHub Copilot`, `AI 코딩 도구`, `Verification`, `Inline Suggestion`, `Cloud Agent`는 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Context-aware Response

- category: AI 코딩 도구
- shortDefinition: 열려 있는 파일, repository 맥락, 이전 대화 같은 정보를 참고해 만들어지는 chat 답변
- explanation: Context-aware Response는 chat coding이 단순 일반 지식 답변이 아니라 현재 작업 맥락을 참고할 수 있음을 보여주는 개념입니다. 다만 맥락을 참고한다는 말이 곧 정확성을 보장한다는 뜻은 아니므로, 답변은 human review와 test로 검증해야 합니다.
- related: ["Chat Coding", "Context Engineering", "Verification"]

## Chat Session History

- category: AI 코딩 도구
- shortDefinition: chat coding에서 이전 질문과 답변이 후속 답변의 맥락으로 남는 대화 기록
- explanation: Chat Session History는 follow-up question이 가능한 대화형 코딩 보조의 핵심입니다. 같은 오류를 이어서 파고들 수 있게 하지만, 오래된 전제나 잘못된 가정도 함께 남을 수 있으므로 중요한 결정은 현재 코드와 테스트로 다시 확인해야 합니다.
- related: ["Chat Coding", "Context-aware Response", "Verification"]

## Debugging Conversation

- category: AI 코딩 도구
- shortDefinition: 오류 메시지, 관련 코드, 실행 결과를 제공하고 원인 가설과 확인 절차를 대화로 좁히는 방식
- explanation: Debugging Conversation은 chat coding의 대표적인 실무 사용 방식입니다. 답 하나를 바로 믿는 것이 아니라 가능한 원인, 확인 명령, 수정 후보를 분리해 검증 가능한 순서로 바꾸는 데 초점이 있습니다.
- related: ["Chat Coding", "Debugging", "Verification"]
