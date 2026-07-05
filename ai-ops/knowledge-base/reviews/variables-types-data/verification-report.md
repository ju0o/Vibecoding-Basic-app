APPROVED 92

# Knowledge Verification Report: variables-types-data

검증일: 2026-07-06  
대상: `ai-ops/knowledge-base/entries/T01/variables-types-data.md`  
판정: APPROVED

## 게이트 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | 모든 핵심 주장이 MDN Variables, Data structures, Grammar and types, Objects, Indexed collections에 연결된다. |
| G2 필수 섹션 존재 | PASS | 13개 필수 섹션과 Quote Bank 존재. |
| G3 frontmatter 완전 | PASS | id, topicGroup, status, score, level, prerequisites, successors, related, sources, updated 포함. |
| G4 URL 접속 가능 | PASS | 대상 MDN URL 5개 재접속 확인. |

## 원문 대조 요약

| 주장 | 대조 출처 | verdict |
|---|---|---|
| variable은 value를 담는 container로 설명된다 | MDN Variables | PASS |
| `let`, `const`, `var`는 변수 선언 방식이다 | MDN Variables | PASS |
| JavaScript는 dynamically typed이며 value가 type을 갖는다 | MDN Data structures | PASS |
| primitive values와 objects가 큰 분류로 제시된다 | MDN Data structures | PASS |
| object는 properties collection이다 | MDN Working with objects | PASS |
| array는 indexed/list-like collection으로 설명된다 | MDN Indexed collections | PASS |
| literals는 grammar and types에서 다뤄진다 | MDN Grammar and types | PASS |

## 점수표

| 기준 | 점수 | 근거 |
|---|---:|---|
| S1 공식 출처 | 20/20 | 전 출처가 SOURCE-REGISTRY 1순위 MDN. |
| S2 최신성 | 15/15 | checked와 재확인 날짜 모두 2026-07-06. |
| S3 교육 적합성 | 14/15 | 정의가 입문자 친화적이고 prerequisites가 논리적이다. dynamic typing 설명은 강의에서 난이도 조절 필요. |
| S4 예시 품질 | 8/10 | object/array/let 예시가 실행 가능하나 후속 강의에서 UI/API 예시 확장 필요. |
| S5 AI 시대 연관성 | 9/10 | AI 생성 코드의 변수·타입·object shape 검토와 직접 연결된다. |
| S6 실무 활용성 | 13/15 | 사용 장면 3개, 실수 4개가 실제적이다. |
| S7 용어 일관성 | 13/15 | prerequisites/related는 실존 또는 이번 배치. glossary에는 일부 신규 용어 추가가 필요하다. |

총점: 92 / 100

## 승인 조건

- status를 `approved`로 변경 가능.
- score를 `92`로 기록.
- 권고: P-05에서 Variable, Value, Primitive Value, Object Shape, Array 용어를 glossary에 추가한다.
