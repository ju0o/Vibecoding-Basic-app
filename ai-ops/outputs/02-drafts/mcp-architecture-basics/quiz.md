# 퀴즈 초안: mcp-architecture-basics

## quiz
question: MCP에서 tools와 resources의 차이를 가장 정확하게 설명한 것은 무엇인가요?
options:
  - tools는 외부 행동을 호출하는 기능이고, resources는 모델에 제공할 컨텍스트 데이터를 URI로 노출하는 기능이다
  - tools와 resources는 모두 모델이 자동으로 항상 읽는 문서이며 차이가 없다
  - resources는 서버의 권한을 정하고, tools는 전체 대화 이력을 서버에 전달하는 기능이다
answer: tools는 외부 행동을 호출하는 기능이고, resources는 모델에 제공할 컨텍스트 데이터를 URI로 노출하는 기능이다
explanation: KB는 MCP tools를 외부 시스템과 상호작용하도록 서버가 노출하는 호출 가능한 기능으로, resources를 파일·DB schema·앱별 정보 같은 컨텍스트 데이터를 URI로 식별해 제공하는 primitive로 설명합니다. resources를 자동 첨부 문서로 보거나 서버가 전체 대화를 본다고 생각하는 것은 오개념입니다.

## explanationPrompt
prompt: "MCP는 Tool Calling이랑 같은 거 아닌가요?"라고 묻는 동료에게 차이를 설명해보세요.
guide:
  - Tool Calling은 모델이 도구 호출을 만드는 메커니즘이라고 설명하기
  - MCP는 host, client, server 사이의 표준 프로토콜이라고 설명하기
  - tools와 resources 차이를 예로 들기
  - host가 권한과 사용자 승인을 조정한다는 점으로 마무리하기
