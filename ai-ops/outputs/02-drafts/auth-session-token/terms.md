# 용어 초안: auth-session-token

기존 glossary.ts 대조: 인증/세션/쿠키 미등재 확인 (2026-07-08). 신규 3개.

## Authentication (인증)
category: 백엔드
shortDefinition: 요청을 보낸 사람이 누구인지 확인하는 절차 — HTTP의 challenge-response 프레임워크
explanation: MDN은 "HTTP가 접근 제어와 인증을 위한 일반 프레임워크를 제공한다"고 정의합니다. 서버가 401 + WWW-Authenticate로 인증을 요구하면 클라이언트가 Authorization 헤더에 자격 증명을 담아 응답합니다. 인증은 "누구인지 1회 확인"이고, 그 결과를 이어가는 것이 세션·토큰입니다. 인증(누구인가)과 인가(권한이 있는가, 403)는 다릅니다.
related: [Session, HTTP 상태 코드, Session Cookie]

## Session (세션)
category: 백엔드
shortDefinition: 인증 결과를 이후 요청에도 이어가는 지속 상태 — stateless HTTP에 얹는 기억
explanation: HTTP는 stateless라 각 요청이 이전을 기억하지 못하므로, 로그인 상태를 유지하려면 세션이 필요합니다. 서버가 Set-Cookie로 세션 식별자를 심으면 브라우저가 이후 요청마다 Cookie 헤더로 자동 첨부해 "이미 인증된 사람"으로 인식됩니다. 서버가 세션 상태를 보관하는 방식이라, 토큰(정보를 토큰 자체에 담음)과 대비됩니다.
related: [Authentication, Session Cookie, Token]

## Session Cookie (세션 쿠키)
category: 백엔드
shortDefinition: 세션 식별자를 담아 로그인 상태를 유지하는 쿠키 — HttpOnly로 탈취를 방어
explanation: 쿠키는 "서버가 브라우저에 보내는 작은 데이터 조각"으로 Set-Cookie로 심기고 Cookie로 되돌아옵니다. Max-Age/Expires가 없으면 세션 종료 시 삭제(세션 쿠키), 있으면 만료까지 유지(영구 쿠키)됩니다. 세션을 지속하는 쿠키는 HttpOnly를 설정해 JavaScript 접근을 막아 XSS 세션 탈취를 완화해야 합니다.
related: [Session, Authentication, HttpOnly]
