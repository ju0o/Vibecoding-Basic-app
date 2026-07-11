# 용어 초안: mini-saas-architecture

기존 glossary.ts 대조 완료: `Authentication`, `Authorization`, `Environment Variable`, `Database Index` 성격의 기본 용어와 충돌하지 않도록 프로젝트 구조 중심 용어만 생성한다.

## 생성 용어

## SaaS Trust Boundary

- category: 프로젝트 교재
- shortDefinition: 사용자, 서버, 데이터베이스, 외부 설정 사이에서 인증 정보와 접근 권한이 넘어갈 수 있는 경계
- explanation: SaaS Trust Boundary는 미니 SaaS에서 어떤 정보가 client bundle에 들어가면 안 되는지, 어떤 data access가 server side에 남아야 하는지, 어떤 route와 data가 authorization으로 보호되어야 하는지 구분하는 설계 기준입니다.
- related: ["Authentication", "Authorization", "Environment Variable"]

## Server Data Boundary

- category: 백엔드
- shortDefinition: query logic과 credential을 클라이언트로 보내지 않고 서버 쪽에서 데이터 접근을 수행하는 경계
- explanation: Server Data Boundary는 Next.js Server Components나 서버 코드에서 데이터 접근을 처리해 민감한 credential과 query logic을 client bundle에 포함하지 않도록 하는 구조입니다. SaaS에서 데이터 접근 보안과 유지보수성을 같이 다룹니다.
- related: ["Server Component", "Database", "Authorization"]

## SaaS Access Map

- category: 프로젝트 교재
- shortDefinition: route, data, user role, session state를 연결해 누가 무엇에 접근할 수 있는지 정리한 설계 표
- explanation: SaaS Access Map은 authentication과 authorization을 구현하기 전에 제품의 접근 규칙을 명확히 하는 문서입니다. AI에게 구현을 맡길 때도 이 표가 있어야 route guard와 data filtering을 추측이 아니라 규칙에 맞춰 만들 수 있습니다.
- related: ["Authorization", "Authentication", "SaaS Trust Boundary"]
