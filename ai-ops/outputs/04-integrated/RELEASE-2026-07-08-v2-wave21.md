# RELEASE — V2 Wave 21 (2026-07-08)

**판정:** 배포 가능 (npm run verify exit 0, 백그라운드 bhjvguae2) / **Executor:** Fable (대행)

## 포함 콘텐츠
- 강의 2강 (data-backend 모듈 완성):
  - api-security-rate-limits (order 6, deep-dive) — rate limit, 429 Too Many Requests, Retry-After, 지수 백오프, 429는 4xx(클라이언트 책임)
  - backend-observability-logs (order 7, deep-dive) — 관찰 가능성, 로그=이벤트 스트림, unbuffered stdout, 저장·라우팅 위임, secret 로그 금지
- 다이어그램 2개: rate-limit-flow.svg(시퀀스), log-stream-flow.svg(스트림)
- 신규 용어 4개: Rate Limit, Retry-After, Observability, Log (용어 총 245)
- 근거 KB: T05/api-security-rate-limits (88), T05/backend-observability-logs (88)

## 자가 QA
- 분량: 8,003자 / 8,006자 (하한 8,000 충족)
- 각 8섹션, 콜아웃 각 4개(섹션당 ≤2), 하이라이트 섹션당 ≤3 확인
- 원문 인용 rate-limits 5개(429 정의·rate limiting·Retry-After 결합·정의·429용법) + observability 4개(스트림 정의·이벤트 스트림·저장 미관여·stdout unbuffered) 전부 KB Quote Bank와 글자 단위 일치
- deep-dive형: 시퀀스 다이어그램 + 구조적 로그/로그 레벨/창(window) 개념 + 트레이드오프

## 설계 특기
- **data-backend 모듈 order 1~7 완성**: API 개요(1, V1) → REST 설계(2) → DB(3) → 인증(4) → 설정·secret(5) → rate limit(6) → 로그·관찰(7). "데이터가 오가는 길 + 그 길을 지키고(보안) 지켜보는(관찰) 방법"의 완결 흐름
- rate limit과 로그의 짝: 제한을 걸어도(6강) 관찰하지 못하면(7강) 그 제한이 정상 사용자를 막는지 남용을 막는지 알 수 없음 — 두 강의를 상호 참조로 엮음
- "AI가 놓치는 지점" 초점: rate-limits=Retry-After 무시 즉시 재시도, observability=secret을 로그에 출력. 둘 다 동작은 하지만 위험한 패턴

## 인용 품질 노트
- MDN(429·Retry-After)·Twelve-Factor(Logs) 모두 안정적 정형 문서 — verbatim 신뢰 높음
- rate limit 알고리즘 세부(토큰 버킷 등), 로그 스택(ELK 등)은 범위 밖으로 명확히 둠(오버클레임 방지)

## 누적: **61강 released** (61/100) — data-backend 모듈 완성(order 1~7, api-db-backend-flow만 V1 잔존·v2-regenerate 대기)
