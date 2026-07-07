# RELEASE — V2 Wave 20 (2026-07-08)

**판정:** 배포 가능 (npm run verify exit 0, 백그라운드 b2knx941g) / **Executor:** Fable (대행)

## 포함 콘텐츠
- 강의 2강 (data-backend 모듈 보안 짝):
  - auth-session-token (order 4, deep-dive) — 인증 challenge-response(401→WWW-Authenticate→Authorization), 쿠키 세션 왕복, 세션/영구 쿠키, HttpOnly로 XSS 방어
  - environment-variables-secrets (order 5, deep-dive) — process.env, 설정=배포마다 달라지는 값, .env/.gitignore, Twelve-Factor 리트머스 테스트
- 다이어그램 2개: auth-session-flow.svg(시퀀스), config-separation.svg(설정 분리)
- 신규 용어 6개: Authentication, Session, Session Cookie, Environment Variable, Secret, Twelve-Factor App (용어 총 241)
- 근거 KB: T05/auth-session-token (89), T05/environment-variables-secrets (90)

## 자가 QA
- 분량: 8,000자 / 8,034자 (하한 8,000 충족)
- 각 8섹션, 콜아웃 각 4개(섹션당 ≤2), 하이라이트 섹션당 ≤3 확인
- 원문 인용 각 5개 전부 KB Quote Bank와 글자 단위 일치 (auth 5/5: 인증프레임워크·WWW-Authenticate·Authorization·쿠키정의·HttpOnly / env 5/5: process.env·문자열변환·config정의·코드분리·리트머스)
- deep-dive형: 시퀀스 다이어그램 + 리팩터링 before/after + 트레이드오프

## 설계 특기
- 두 강의를 data-backend "보안 짝"으로: auth는 앞 강의 rest-api-design의 401이 실제로 어떻게 구현되는지, env는 그 인증 토큰·세션 키를 어떻게 안전하게 관리하는지 — 연속된 흐름
- **이 프로젝트 자신을 산 예시로**: env 강의가 사이트의 `.env.local`(NEXT_PUBLIC_SITE_PASSWORD_HASH gitignore) 패턴을 리트머스 테스트의 실제 사례로 인용. 빌드 시점 환경변수(비번 변경 시 재빌드 필요)도 이 사이트 운영 방식으로 설명
- "AI가 놓치는 보안 지점" 초점: auth=세션 쿠키 HttpOnly 누락(테스트로 안 잡힘), env=키 하드코딩(동작은 함) — 둘 다 사람 검토 게이트

## 부수 정리
- api-db-backend-flow(V1 legacy) 커리큘럼 order 5→1 조정: data-backend 개요 강의로서 나머지(rest-api order 2 등)의 선행 위치. order 5 중복 해소

## 인용 품질 노트
- MDN(Authentication·Cookies)·Node.js(process.env)·Twelve-Factor(Config) 모두 안정적 정형 문서 — verbatim 신뢰 높음, 재fetch 대조 불필요

## 누적: **59강 released** (59/100) — data-backend 모듈 order 1~5 완성(api-db-backend-flow는 V1, v2-regenerate 대기)
