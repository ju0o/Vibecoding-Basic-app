# 용어 초안: admin-dashboard-project

기존 glossary.ts 대조 완료: `React State`, `Server Component`, `Authorization`, `Table` 성격의 기본 용어와 충돌하지 않도록 dashboard 설계 중심 용어만 생성한다.

## 생성 용어

## Dashboard State Owner

- category: 프론트엔드
- shortDefinition: 필터, 정렬, 선택 행처럼 여러 dashboard 컴포넌트가 함께 쓰는 state를 소유하는 가장 가까운 공통 부모
- explanation: Dashboard State Owner는 React dashboard에서 필터와 table, summary card가 같은 조건을 공유할 때 state를 어디에 둘지 결정하는 기준입니다. 중복 state를 줄이고 한 화면의 판단 기준을 일관되게 유지합니다.
- related: ["React State", "Component", "Dashboard"]

## Admin Data Boundary

- category: 프로젝트 교재
- shortDefinition: 관리자 route와 관리자 data query가 모두 authorization으로 보호되어야 하는 경계
- explanation: Admin Data Boundary는 `/admin` 화면을 숨기는 것뿐 아니라 실제 server data fetch에서 관리자가 볼 수 있는 data만 반환하도록 만드는 설계 경계입니다. route와 data를 함께 보호하지 않으면 dashboard 보안이 깨집니다.
- related: ["Authorization", "Server Component", "SaaS Trust Boundary"]

## Accessible Data Table

- category: 웹 개발 기초
- shortDefinition: caption, header-cell 관계처럼 스크린리더와 사용자가 표의 의미를 이해할 수 있게 만든 데이터 table
- explanation: Accessible Data Table은 관리자 대시보드에서 단순히 표를 그리는 것이 아니라, 운영자가 행과 열의 의미를 정확히 읽고 판단할 수 있게 만드는 구조입니다. MDN table accessibility 관점의 caption과 header association이 핵심입니다.
- related: ["HTML", "Accessibility", "Dashboard"]
