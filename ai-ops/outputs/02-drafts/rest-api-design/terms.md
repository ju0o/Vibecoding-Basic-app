# 용어 초안: rest-api-design

기존 glossary.ts 대조: REST/safe/idempotent/상태코드 미등재 확인 (2026-07-07). 신규 3개.

## REST API
category: 백엔드
shortDefinition: 서버 기능을 자원으로 보고 HTTP 메서드로 다루며 결과를 상태 코드로 알리는 API 설계 방식
explanation: 경로가 자원(무엇을), 메서드가 동작(어떻게), 상태 코드가 결과(어땠는가)를 담당합니다. 새 규칙을 만드는 게 아니라 HTTP가 이미 정한 메서드·상태 코드의 의미를 일관되게 지키는 것이 본질이라, 잘 설계된 REST API는 문서 없이도 동작을 짐작하게 합니다.
related: [HTTP, Idempotent, HTTP 상태 코드]

## Idempotent (멱등)
category: 백엔드
shortDefinition: 같은 요청을 여러 번 보내도 한 번 보낸 것과 서버 효과가 같은 성질
explanation: MDN 정의는 "한 번 요청한 효과가 동일한 요청을 여러 번 한 효과와 같으면 idempotent". GET·PUT·DELETE가 멱등이고 POST는 아닙니다. 네트워크 오류로 응답을 못 받았을 때 재시도해도 되는지를 판정하는 근거로, POST 재시도는 중복 생성 위험이 있어 멱등 키 같은 방어가 필요합니다. safe(읽기 전용)와는 다른 성질입니다.
related: [REST API, HTTP, Safe (HTTP)]

## HTTP 상태 코드
category: 백엔드
shortDefinition: 응답 결과를 5클래스(1xx~5xx)로 알리는 세 자리 코드 — 앞자리가 결과 종류를 말함
explanation: 2xx 성공(200 OK, 201 Created), 3xx 리다이렉션, 4xx 클라이언트 오류(400/401/404), 5xx 서버 오류(500). 앞자리 하나가 "누구 잘못인가"(4xx=클라이언트, 5xx=서버)를 먼저 말해 디버깅 방향을 정합니다. 오류를 200+본문으로 감추면 모니터링·재시도 도구가 감지하지 못하므로 반드시 코드로 알려야 합니다.
related: [REST API, HTTP, Idempotent]
