# 용어 초안: database-tables-indexes

기존 glossary.ts 대조: 테이블/인덱스/데이터타입 미등재 확인 (2026-07-07). 신규 3개.

## Database Table (데이터베이스 테이블)
category: 백엔드
shortDefinition: 관계형 데이터베이스에서 데이터를 행과 열로 담는 저장 단위 — 종이 표와 유사
explanation: PostgreSQL 문서는 "종이 위의 표와 매우 비슷하다: 행과 열로 이루어진다"고 정의합니다. 열의 수·순서는 고정이고 각 열은 이름과 데이터 타입을 가지며(구조), 행의 수는 저장된 데이터 양에 따라 변합니다(내용). 엑셀 시트를 떠올리면 되고, 이 단순 모델이 수십 년 데이터 저장의 표준입니다.
related: [Database Index, Data Type (DB), Primary Key]

## Database Index (데이터베이스 인덱스)
category: 백엔드
shortDefinition: 테이블에서 특정 행을 빠르게 찾기 위한 보조 구조 — 책 뒤 색인과 같은 역할
explanation: 인덱스가 있으면 전수 스캔 대신 탐색 트리를 몇 단계만 내려가 목표 행을 찾고, 조건 조회·UPDATE·DELETE·조인까지 가속합니다. 단 테이블과 동기화되어야 해서 쓰기(INSERT/UPDATE/DELETE)마다 갱신되어 오버헤드를 더합니다. "읽기에서 벌고 쓰기에서 낸다"가 핵심이라, 조회에 실제로 쓰이는 열에만 만들고 안 쓰는 것은 제거합니다.
related: [Database Table, Data Type (DB)]

## Data Type (DB)
category: 백엔드
shortDefinition: 열에 들어올 값의 범위를 제한하고 데이터에 의미를 부여하는 열의 타입 지정
explanation: PostgreSQL 정의로 "값의 집합을 제한하고 저장된 데이터에 의미를 부여해 계산에 쓸 수 있게" 합니다. 정수 열에 문자열이 못 들어오게 막고(제한), 동시에 합계·평균 계산을 가능하게 합니다(의미). "모두 문자열로 저장"은 제한과 계산 능력을 모두 포기하는 선택이며, DB 열 타입과 코드(TypeScript)의 타입을 맞추는 것이 데이터 안전의 기본입니다.
related: [Database Table, Database Index, 타입]
