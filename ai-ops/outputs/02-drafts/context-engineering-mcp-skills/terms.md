# 용어 초안: context-engineering-mcp-skills

기존 glossary.ts 대조 완료: Context Engineering, MCP, Skills는 이미 등록되어 있다.

## 생성 용어

### Progressive Disclosure
- category: AI 시스템
- shortDefinition: 필요한 정보만 단계적으로 로드해 컨텍스트 비용을 줄이는 방식
- explanation: Progressive Disclosure는 시스템이 모든 자료를 처음부터 모델 컨텍스트에 넣지 않고, metadata나 description처럼 작은 발견 정보만 먼저 노출한 뒤 실제 본문과 리소스는 필요할 때 로드하는 설계입니다. Skills의 metadata-first loading과 MCP의 on-demand tool/resource 사용을 이해할 때 핵심이 되는 용어입니다.
- related: ["Context Engineering", "Skills", "MCP"]

### MCP Resource
- category: AI 시스템
- shortDefinition: MCP server가 URI로 식별해 제공하는 컨텍스트 데이터
- explanation: MCP Resource는 파일, DB schema, 앱별 정보처럼 모델 판단에 필요한 데이터를 서버가 표준 방식으로 공유하는 primitive입니다. Tool이 외부 시스템 행동을 호출하는 기능이라면 Resource는 모델에게 읽힐 수 있는 컨텍스트 데이터를 제공하는 쪽에 가깝습니다.
- related: ["MCP", "Context Engineering", "RAG"]
