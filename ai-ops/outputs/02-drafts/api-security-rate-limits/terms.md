# 용어 초안: api-security-rate-limits

기존 glossary.ts 대조: rate limit/429/Retry-After 미등재 확인 (2026-07-08). 신규 2개.

## Rate Limit (요청 제한)
category: 백엔드
shortDefinition: 클라이언트가 일정 시간에 보낼 수 있는 요청 수를 제한해 API 남용을 막는 장치
explanation: 한도를 넘으면 서버는 429 Too Many Requests로 응답합니다. MDN은 이를 "클라이언트에게 요청 속도를 늦추라고 요청하는 메커니즘"으로 정의합니다 — 영구 차단이 아니라 일시적 감속입니다. 한도는 사용자·IP·API 키 단위로 적용되므로 인증을 전제하며, 클라이언트 코드가 아니라 반드시 서버에서 강제해야 방어가 됩니다.
related: [HTTP 상태 코드, Retry-After, Authentication]

## Retry-After
category: 백엔드
shortDefinition: 클라이언트가 다음 요청까지 얼마나 기다려야 하는지 알리는 HTTP 응답 헤더
explanation: MDN 정의로 "user agent가 후속 요청 전에 얼마나 기다려야 하는지"를 나타냅니다. 429에서는 재요청까지 대기 시간, 503에서는 서비스 복구 예상 시간을 뜻합니다. 429를 받은 클라이언트는 이 값을 추측이 아니라 서버의 지시로 받아 그만큼 기다린 뒤(없으면 지수 백오프로) 재시도해야 하며, 즉시 재시도하면 제한이 길어집니다.
related: [Rate Limit, HTTP 상태 코드, Idempotent]
