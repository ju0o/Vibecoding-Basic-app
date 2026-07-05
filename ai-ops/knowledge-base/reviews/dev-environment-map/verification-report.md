APPROVED 88

# Knowledge Verification Report: dev-environment-map

검증일: 2026-07-06  
대상: `ai-ops/knowledge-base/entries/T01/dev-environment-map.md`  
판정: APPROVED

## 게이트 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | 모든 사실 주장에 MDN, VS Code, Git Pro Book URL과 확인 날짜가 붙어 있다. |
| G2 필수 섹션 존재 | PASS | 정의, 역사, 해결하려는 문제, 핵심 개념, 관련 기술, 선행/후행, AI 의미, 실무 활용, FAQ, 실수, 공식 출처, Quote Bank, 변경 이력 존재. |
| G3 frontmatter 완전 | PASS | id, title, topicGroup, status, score, level, prerequisites, successors, related, consumers, sources, updated 존재. |
| G4 URL 접속 가능 | PASS | 2026-07-06 재접속 확인: MDN installing basic software, VS Code UI/Terminal/Source Control, Git Pro Book 모두 200/본문 확인. |

## 원문 대조 요약

| 주장 | 대조 출처 | verdict |
|---|---|---|
| 초보 웹 개발 환경에는 code editor, browser, local testing server가 필요하다 | MDN Installing basic software | PASS |
| VS Code는 Explorer, editor, Side Bar, Panel, integrated terminal을 제공한다 | VS Code User Interface | PASS |
| VS Code integrated terminal은 workspace root에서 시작하고 `mkdir`, `git` 명령을 실행할 수 있다 | VS Code Terminal Basics | PASS |
| Source Control은 staging, committing, branching, merge conflict resolution을 다룬다 | VS Code Source Control | PASS |
| version control은 파일 변경을 기록해 특정 버전을 회수하게 한다 | Git Pro Book About Version Control | PASS |

## 점수표

| 기준 | 점수 | 근거 |
|---|---:|---|
| S1 공식 출처 | 17/20 | MDN, Git 공식 문서 비중 높음. VS Code 공식 문서는 벤더 공식 문서이나 SOURCE-REGISTRY 본표에 명시되지 않아 경미 감점. |
| S2 최신성 | 15/15 | 모든 checked 날짜 2026-07-05, 6개월 이내. |
| S3 교육 적합성 | 14/15 | 입문자용 정의와 도구 역할 구분이 명확하다. |
| S4 예시 품질 | 8/10 | 개발 환경 타입 예시와 점검 장면이 구체적이나 실행 코드 예시는 구조 예시 중심. |
| S5 AI 시대 연관성 | 9/10 | AI 코딩 도구 결과를 파일/터미널/브라우저/Git으로 검증하는 연결이 구체적. |
| S6 실무 활용성 | 13/15 | 사용 장면 3개, 실수 4개가 실제 입문 오개념과 연결된다. |
| S7 용어 일관성 | 12/15 | prerequisites/related id는 실존 또는 이번 배치. successor 예약 id 사용은 허용되나 후속 등록 필요. |

총점: 88 / 100

## 승인 조건

- status를 `approved`로 변경 가능.
- score를 `88`로 기록.
- 권고: SOURCE-REGISTRY에 VS Code Docs를 T01/T03 개발 도구 공식 문서로 추가하면 S1 감점 제거 가능.

