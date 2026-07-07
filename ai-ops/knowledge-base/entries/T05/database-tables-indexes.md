---
id: database-tables-indexes
title: "데이터베이스 — 테이블, 데이터 타입, 인덱스"
topicGroup: T05
status: draft
score: 0
level: 기초
prerequisites: [api-db-backend-flow]
successors: []
related: [rest-api-design, json-data-contracts]
sources:
  - { title: "Table Basics — PostgreSQL Documentation", url: "https://www.postgresql.org/docs/current/ddl-basics.html", checked: 2026-07-07 }
  - { title: "Indexes / Introduction — PostgreSQL Documentation", url: "https://www.postgresql.org/docs/current/indexes-intro.html", checked: 2026-07-07 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-07
---

## 정의
관계형 데이터베이스에서 데이터는 **테이블**에 저장된다 — PostgreSQL 문서는 "A table in a relational database is much like a table on paper: It consists of rows and columns"(관계형 DB의 테이블은 종이 위 표와 매우 비슷하다 — 행과 열로 이루어진다)라고 정의한다. 열의 수와 순서는 고정이고 각 열은 이름과 **데이터 타입**을 가지며, 행의 수는 저장된 데이터 양에 따라 변한다. **인덱스**는 이 테이블에서 특정 행을 빠르게 찾기 위한 보조 구조로, 책 뒤의 색인과 같은 역할을 한다. (출처: PostgreSQL Table Basics·Indexes Introduction, 확인: 2026-07-07)

## 역사
관계형 모델은 데이터를 "행과 열의 표"로 보는 오래된 추상이다. 이 강의가 PostgreSQL 문서를 근거로 삼는 이유는, 테이블·타입·인덱스의 개념이 특정 제품을 넘어 관계형 DB 전반에 공통이기 때문이다. 색인 은유는 문서 자신이 든다 — "terms and concepts that are frequently looked up by readers are collected in an alphabetic index at the end of the book"(자주 찾는 용어를 책 끝 색인에 모은다). (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)

## 해결하려는 문제
- 구조화된 저장: 테이블의 열·타입이 "이 데이터는 이런 모양"이라는 약속을 강제한다. (출처: PostgreSQL Table Basics, 확인: 2026-07-07)
- 느린 조회 해결: 인덱스 없이는 "the system would have to scan the entire table, row by row"(전체 테이블을 행 단위로 훑어야) 한다 — 인덱스가 이 전수 스캔을 대체한다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
- 데이터 무결성: 데이터 타입이 열에 들어올 수 있는 값의 집합을 제한한다. (출처: PostgreSQL Table Basics, 확인: 2026-07-07)

## 핵심 개념
1. **테이블 = 행 × 열**: "It consists of rows and columns." 열의 수·순서는 고정이고 이름을 가지며, 행 수는 가변이다. (출처: PostgreSQL Table Basics, 확인: 2026-07-07)
2. **데이터 타입의 역할**: "The data type constrains the set of possible values that can be assigned to a column and assigns semantics to the data stored in the column so that it can be used for computations." — 타입은 값의 범위를 제한하고 의미를 부여한다. (출처: PostgreSQL Table Basics, 확인: 2026-07-07)
3. **인덱스 = 빠른 탐색 구조**: 인덱스가 있으면 "it might only have to walk a few levels deep into a search tree"(탐색 트리 몇 단계만 내려가면 됨) — 전수 스캔 대신 트리 탐색. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
4. **인덱스의 유지 비용**: "After an index is created, the system has to keep it synchronized with the table. This adds overhead to data manipulation operations." — 인덱스는 공짜가 아니다. 쓰기(INSERT/UPDATE/DELETE)마다 인덱스도 갱신된다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
5. **인덱스는 조회를 넓게 돕는다**: "Indexes can also benefit UPDATE and DELETE commands with search conditions. Indexes can moreover be used in join searches." — 조건 조회·조인까지 가속한다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
6. **안 쓰는 인덱스는 제거**: "Therefore indexes that are seldom or never used in queries should be removed." — 읽기 이득 없이 쓰기 비용만 남기 때문. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)

## 관련 기술
- 테이블 열 ↔ json-data-contracts: 테이블 스키마(열·타입)와 API의 JSON 계약은 "데이터 모양의 약속"이라는 점에서 짝을 이룬다. (근거: PostgreSQL Table Basics + json-data-contracts KB, 확인: 2026-07-07)
- 인덱스 ↔ rest-api-design: 목록 조회 API(GET)의 필터·정렬 성능이 인덱스 유무에 좌우된다. (근거: PostgreSQL Indexes + rest-api-design KB, 확인: 2026-07-07)
- 데이터 타입 ↔ 타입 시스템: DB 열 타입은 런타임 값의 제약이고, TypeScript 타입은 코드의 제약 — 둘을 맞추는 것이 데이터 안전의 기본. (근거: PostgreSQL Table Basics, 확인: 2026-07-07)

## 선행 개념
- api-db-backend-flow: API 뒤에서 DB가 데이터를 저장·조회하는 큰 그림.

## 후행 개념
- 쿼리 최적화·정규화 (예정): 인덱스 설계와 테이블 구조를 성능·중복 관점에서 다룸.

## AI 시대에서의 의미
AI에게 "이 조회 느린데 고쳐줘"라고 하면 흔히 "인덱스를 추가하세요"라고 답한다 — 맞는 경우가 많지만, 인덱스의 유지 비용("adds overhead to data manipulation operations")을 함께 따지지 않으면 쓰기가 느려진다. AI가 제안한 인덱스가 "읽기 이득 > 쓰기 비용"인지, 실제로 쿼리에 쓰이는지(안 쓰이면 제거 대상)를 사람이 판단해야 한다. 스키마 설계에서 열 타입 선택도 AI에 맡기되, 타입이 값의 범위를 제한한다는 원칙으로 검증한다. (근거: PostgreSQL Indexes·Table Basics, 확인: 2026-07-07)

## 실무 활용
1. 스키마 설계: 각 열에 적절한 데이터 타입을 지정해 값의 범위와 의미를 강제한다. (출처: PostgreSQL Table Basics, 확인: 2026-07-07)
2. 조회 가속: 자주 WHERE·JOIN에 쓰는 열에 인덱스를 만든다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
3. 인덱스 감사: 안 쓰는 인덱스는 제거해 쓰기 비용을 회수한다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
4. 트레이드오프 판단: 쓰기가 잦은 테이블은 인덱스를 신중히 — 갱신 오버헤드가 커진다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)

## FAQ
Q: 인덱스를 많이 만들면 무조건 빨라지나?
A: 아니다. 조회는 빨라지지만 인덱스는 테이블과 동기화되어야 해서 쓰기마다 오버헤드가 는다. 안 쓰는 인덱스는 비용만 남긴다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
Q: 데이터 타입은 왜 중요한가?
A: 타입이 열에 들어올 수 있는 값의 집합을 제한하고 의미를 부여해, 계산에 쓸 수 있게 한다. 잘못된 값의 저장을 애초에 막는다. (출처: PostgreSQL Table Basics, 확인: 2026-07-07)
Q: 인덱스는 조회에만 쓰이나?
A: 아니다. 검색 조건이 있는 UPDATE·DELETE와 조인 검색도 가속한다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
Q: 인덱스 없이 조회하면?
A: 전체 테이블을 행 단위로 훑는다 — 행이 많고 결과가 적을수록 비효율적이다. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)

## 자주 하는 실수
1. 실수: 모든 열에 인덱스 생성. 왜 생기나: "인덱스=빠름"만 앎. 교정: 조회에 실제로 쓰이는 열만 — 나머지는 쓰기 비용만. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
2. 실수: 안 쓰는 인덱스 방치. 왜 생기나: 생성 후 감사 안 함. 교정: 거의 안 쓰는 인덱스는 제거 권장. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)
3. 실수: 부적절한 데이터 타입 선택(모두 문자열). 왜 생기나: 타입의 제약·의미 역할을 무시. 교정: 값의 범위와 계산 용도에 맞는 타입. (출처: PostgreSQL Table Basics, 확인: 2026-07-07)
4. 실수: 쓰기 잦은 테이블에 인덱스 남발. 왜 생기나: 유지 오버헤드를 안 따짐. 교정: 읽기 이득과 쓰기 비용을 저울질. (출처: PostgreSQL Indexes Introduction, 확인: 2026-07-07)

## 공식 출처
- 테이블·행·열·데이터 타입 — [PostgreSQL Table Basics](https://www.postgresql.org/docs/current/ddl-basics.html) (확인: 2026-07-07)
- 인덱스 목적·유지 비용·제거 권장 — [PostgreSQL Indexes Introduction](https://www.postgresql.org/docs/current/indexes-intro.html) (확인: 2026-07-07)

## Quote Bank
- > "A table in a relational database is much like a table on paper: It consists of rows and columns."
  - 출처: [PostgreSQL Table Basics](https://www.postgresql.org/docs/current/ddl-basics.html) (확인: 2026-07-07)
  - 맥락: 테이블의 정의 — 종이 표 은유, 행과 열
- > "The data type constrains the set of possible values that can be assigned to a column and assigns semantics to the data stored in the column so that it can be used for computations."
  - 출처: [PostgreSQL Table Basics](https://www.postgresql.org/docs/current/ddl-basics.html) (확인: 2026-07-07)
  - 맥락: 데이터 타입의 두 역할 — 값 제한 + 의미 부여
- > "After an index is created, the system has to keep it synchronized with the table. This adds overhead to data manipulation operations."
  - 출처: [PostgreSQL Indexes Introduction](https://www.postgresql.org/docs/current/indexes-intro.html) (확인: 2026-07-07)
  - 맥락: 인덱스의 유지 비용 — 인덱스는 공짜가 아니다
- > "Indexes can also benefit UPDATE and DELETE commands with search conditions. Indexes can moreover be used in join searches."
  - 출처: [PostgreSQL Indexes Introduction](https://www.postgresql.org/docs/current/indexes-intro.html) (확인: 2026-07-07)
  - 맥락: 인덱스의 이득 범위 — 조건 조회·조인까지
- > "Therefore indexes that are seldom or never used in queries should be removed."
  - 출처: [PostgreSQL Indexes Introduction](https://www.postgresql.org/docs/current/indexes-intro.html) (확인: 2026-07-07)
  - 맥락: 안 쓰는 인덱스 제거 권장 — 쓰기 비용만 남으므로

## 변경 이력
- 2026-07-07: 최초 작성 (Fable — 대행, P-01)
