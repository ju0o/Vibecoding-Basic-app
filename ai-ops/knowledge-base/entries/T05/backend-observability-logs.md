---
id: backend-observability-logs
title: "백엔드 로그와 관찰 가능성 — 서버가 무엇을 하는지 보기"
topicGroup: T05
status: approved
score: 88
level: 중급
prerequisites: [rest-api-design]
successors: []
related: [debugging-error-reading, environment-variables-secrets]
sources:
  - { title: "The Twelve-Factor App: Logs", url: "https://12factor.net/logs", checked: 2026-07-08 }
  - { title: "429 Too Many Requests — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429", checked: 2026-07-08 }
consumers:
  lessons: [backend-observability-logs]
  glossary: [Observability, Log]
updated: 2026-07-08
---

## 정의
관찰 가능성(observability)은 "실행 중인 서버가 지금 무엇을 하고 있는지"를 바깥에서 알 수 있는 정도이고, 로그(log)는 그 관찰의 기본 수단이다. Twelve-Factor App은 "Logs are the stream of aggregated, time-ordered events collected from the output streams of all running processes"(로그는 실행 중인 모든 프로세스의 출력에서 수집된, 집계·시간순 이벤트의 스트림)라고 정의한다. 핵심 원칙은 "Treat logs as event streams"(로그를 이벤트 스트림으로 다루라)이다. (출처: 12factor Logs, 확인: 2026-07-08)

## 역사
서버는 화면이 없다. 브라우저처럼 눈으로 상태를 볼 수 없으므로, "무슨 일이 일어났는가"를 로그라는 시간순 기록으로 남긴다. Twelve-Factor는 앱이 로그의 저장·전송을 스스로 관리하지 말고 단지 stdout으로 흘려보내라고 규정한다 — "A twelve-factor app never concerns itself with routing or storage of its output stream." 앱은 이벤트를 내보내기만 하고, 수집·저장은 실행 환경의 몫이다. (출처: 12factor Logs, 확인: 2026-07-08)

## 해결하려는 문제
- 보이지 않는 서버 관찰: 화면 없는 서버의 동작을 시간순 이벤트로 기록. (출처: 12factor Logs, 확인: 2026-07-08)
- 앱과 로그 인프라 분리: 앱은 stdout으로 내보내기만, 저장·라우팅은 환경이 담당. (출처: 12factor Logs, 확인: 2026-07-08)
- 문제 원인 추적: 오류·남용(429 급증 등) 발생 시 시간순 이벤트로 원인 역추적. (근거: 12factor Logs + MDN 429, 확인: 2026-07-08)

## 핵심 개념
1. **로그 = 이벤트 스트림**: "the stream of aggregated, time-ordered events" — 시간순으로 흐르는 사건의 흐름. 파일이 아니라 스트림으로 본다. (출처: 12factor Logs, 확인: 2026-07-08)
2. **stdout으로 unbuffered 출력**: "Each running process writes its event stream, unbuffered, to stdout." 앱은 그냥 표준 출력에 흘려보낸다. (출처: 12factor Logs, 확인: 2026-07-08)
3. **앱은 저장·라우팅에 관여 안 함**: "never concerns itself with routing or storage of its output stream." 로그 파일 경로·회전은 앱의 책임이 아니다. (출처: 12factor Logs, 확인: 2026-07-08)
4. **관찰 가능성의 토대**: 시간순 이벤트가 있어야 "언제 무엇이 어떤 순서로 일어났는가"를 재구성할 수 있다. (근거: 12factor Logs, 확인: 2026-07-08)
5. **오류·남용 신호**: 429 급증, 5xx 증가 같은 패턴이 로그에서 드러난다 — 로그는 사후 디버깅뿐 아니라 실시간 이상 탐지의 근거다. (출처: 12factor Logs + MDN 429, 확인: 2026-07-08)
6. **디버깅과의 연결**: debugging-error-reading에서 배운 "증거로 원인 좁히기"가 서버에서는 로그를 통해 이뤄진다. (근거: debugging-error-reading KB, 확인: 2026-07-08)

## 관련 기술
- 로그 ↔ debugging-error-reading: 프론트의 콘솔·스택트레이스에 대응하는 서버의 증거가 로그다. (근거: debugging-error-reading KB, 확인: 2026-07-08)
- stdout ↔ environment-variables-secrets: 로그에 secret을 출력하면 유출되므로, 환경변수·토큰을 로그에 남기지 않아야 한다. (출처: 12factor Logs + env KB, 확인: 2026-07-08)
- 로그 ↔ api-security-rate-limits: 429·남용 패턴 관찰의 근거가 로그다. (출처: MDN 429 + 12factor Logs, 확인: 2026-07-08)

## 선행 개념
- rest-api-design: 상태 코드(2xx/4xx/5xx)가 로그로 남아 관찰의 단위가 된다.

## 후행 개념
- monitoring-errors-rollbacks (예정): 로그를 기반으로 한 알림·모니터링·롤백.

## AI 시대에서의 의미
AI가 만든 서버 코드가 "동작한다"는 것과 "관찰 가능하다"는 것은 다르다. 문제가 생겼을 때 원인을 찾으려면 로그가 있어야 하는데, AI는 명시하지 않으면 로그를 빈약하게 남긴다. 또 위험한 실수 하나는 ==AI가 디버깅 편의를 위해 토큰·비밀번호를 로그에 출력==하는 것이다 — 로그는 저장·전송되므로 secret이 새는 경로가 된다. "무엇을 로그로 남기고 무엇을 남기지 않는가"는 사람이 검토해야 할 지점이다. (근거: 12factor Logs + env KB, 확인: 2026-07-08)

## 실무 활용
1. stdout 출력: 앱은 이벤트를 stdout으로 unbuffered 출력, 저장은 환경에 위임. (출처: 12factor Logs, 확인: 2026-07-08)
2. 구조적 로그: 시간·요청 ID·상태 코드를 포함해 나중에 검색·집계 가능하게. (근거: 12factor Logs, 확인: 2026-07-08)
3. 이상 탐지: 429·5xx 급증을 로그에서 관찰해 남용·장애 조기 발견. (출처: MDN 429 + 12factor Logs, 확인: 2026-07-08)
4. secret 제외: 토큰·비밀번호·개인정보를 로그에 출력하지 않기. (근거: env KB, 확인: 2026-07-08)

## FAQ
Q: 로그를 파일로 관리해야 하나?
A: Twelve-Factor는 앱이 stdout으로만 내보내고 저장·라우팅은 실행 환경에 맡기라고 권한다 — 앱이 로그 파일 경로·회전을 직접 관리하지 않는다. (출처: 12factor Logs, 확인: 2026-07-08)
Q: 관찰 가능성과 로그의 관계는?
A: 로그는 관찰 가능성의 기본 수단이다. 시간순 이벤트 스트림이 있어야 "무엇이 언제 일어났는가"를 재구성할 수 있다. (출처: 12factor Logs, 확인: 2026-07-08)
Q: 무엇을 로그에 남기면 안 되나?
A: 토큰·비밀번호·개인정보 같은 secret이다. 로그는 저장·전송되므로 유출 경로가 된다. (근거: env KB, 확인: 2026-07-08)
Q: 로그로 남용을 어떻게 감지하나?
A: 429·5xx 같은 상태 코드의 급증을 시간순으로 관찰하면 남용·장애를 조기에 발견할 수 있다. (출처: MDN 429 + 12factor Logs, 확인: 2026-07-08)

## 자주 하는 실수
1. 실수: secret을 로그에 출력. 왜 생기나: 디버깅 편의. 교정: 토큰·비밀번호는 로그에서 제외·마스킹. (근거: env KB, 확인: 2026-07-08)
2. 실수: 앱이 로그 파일을 직접 관리. 왜 생기나: 인프라 책임을 앱에 둠. 교정: stdout으로 내보내고 저장은 환경에 위임. (출처: 12factor Logs, 확인: 2026-07-08)
3. 실수: 로그가 빈약해 원인 추적 불가. 왜 생기나: 무엇을 남길지 설계 안 함. 교정: 요청 ID·상태 코드·시간을 포함한 구조적 로그. (근거: 12factor Logs, 확인: 2026-07-08)
4. 실수: 오류만 로그. 왜 생기나: 정상 흐름도 관찰 대상임을 놓침. 교정: 주요 이벤트(요청·응답·상태 전이)도 기록. (근거: 12factor Logs, 확인: 2026-07-08)

## 공식 출처
- 로그=이벤트 스트림·stdout·저장 위임 — [Twelve-Factor App: Logs](https://12factor.net/logs) (확인: 2026-07-08)
- 429 등 상태 코드(관찰 대상) — [MDN 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (확인: 2026-07-08)

## Quote Bank
- > "Logs are the stream of aggregated, time-ordered events collected from the output streams of all running processes and backing services."
  - 출처: [Twelve-Factor App: Logs](https://12factor.net/logs) (확인: 2026-07-08)
  - 맥락: 로그의 정의 — 집계·시간순 이벤트 스트림
- > "Treat logs as event streams."
  - 출처: [Twelve-Factor App: Logs](https://12factor.net/logs) (확인: 2026-07-08)
  - 맥락: 로그를 파일이 아니라 스트림으로 다루라는 원칙
- > "A twelve-factor app never concerns itself with routing or storage of its output stream."
  - 출처: [Twelve-Factor App: Logs](https://12factor.net/logs) (확인: 2026-07-08)
  - 맥락: 앱은 로그 저장·라우팅에 관여하지 않음
- > "Each running process writes its event stream, unbuffered, to stdout."
  - 출처: [Twelve-Factor App: Logs](https://12factor.net/logs) (확인: 2026-07-08)
  - 맥락: 앱은 stdout으로 unbuffered 출력만 담당

## 변경 이력
- 2026-07-08: 최초 작성 (Fable — 대행, P-01)
