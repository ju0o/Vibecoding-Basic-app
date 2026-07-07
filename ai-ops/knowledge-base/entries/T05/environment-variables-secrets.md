---
id: environment-variables-secrets
title: "환경변수와 secret 관리 — 코드에서 설정을 분리하기"
topicGroup: T05
status: draft
score: 0
level: 기초
prerequisites: [auth-session-token]
successors: []
related: [package-json-and-semver, web-security-basics]
sources:
  - { title: "process.env — Node.js Documentation", url: "https://nodejs.org/api/process.html", checked: 2026-07-07 }
  - { title: "The Twelve-Factor App: Config", url: "https://12factor.net/config", checked: 2026-07-07 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-07
---

## 정의
환경변수(environment variable)는 코드 바깥에서 프로그램에 값을 전달하는 설정 통로다. Node.js에서 "The process.env property returns an object containing the user environment"(process.env 속성은 사용자 환경을 담은 객체를 반환한다) — 즉 `process.env.API_KEY`처럼 읽는다. secret(비밀값)은 그중에서도 유출되면 안 되는 것(API 키, DB 비밀번호, 토큰)이며, 이런 값은 코드가 아니라 환경변수로 관리해야 한다. Twelve-Factor App은 "The twelve-factor app stores config in environment variables"(설정을 환경변수에 저장한다)를 원칙으로 든다. (출처: Node.js process.env, 12factor Config, 확인: 2026-07-07)

## 역사
"설정을 코드에서 분리하라"는 Twelve-Factor App(2011)이 정립한 원칙이다. 핵심 통찰은 "Config varies substantially across deploys, code does not"(설정은 배포마다 크게 달라지지만 코드는 그렇지 않다)이다. 같은 코드가 개발·스테이징·운영에서 다른 DB, 다른 키로 돌아야 하므로, 달라지는 부분(설정)을 코드에서 빼내 환경변수로 주입한다. 앞 강의(auth-session-token)에서 다룬 토큰·세션 비밀키가 바로 이렇게 관리해야 할 secret이다. (출처: 12factor Config, 확인: 2026-07-07)

## 해결하려는 문제
- 배포마다 달라지는 값 분리: "everything that is likely to vary between deploys"를 코드에서 빼낸다. (출처: 12factor Config, 확인: 2026-07-07)
- 자격 증명 유출 방지: secret을 코드에 하드코딩하면 저장소에 영구히 남는다 — 환경변수로 분리해 코드와 격리. (출처: 12factor Config litmus test, 확인: 2026-07-07)
- 코드에서 설정 읽기: Node.js가 process.env로 환경변수를 객체처럼 노출한다. (출처: Node.js process.env, 확인: 2026-07-07)

## 핵심 개념
1. **process.env**: "returns an object containing the user environment" — `process.env.DATABASE_URL`처럼 읽는 설정 객체. (출처: Node.js process.env, 확인: 2026-07-07)
2. **값은 문자열**: "Assigning a property on process.env will implicitly convert the value to a string." 환경변수는 근본적으로 문자열이라, 숫자·불리언은 코드에서 파싱해야 한다. (출처: Node.js process.env, 확인: 2026-07-07)
3. **설정의 정의**: "An app's config is everything that is likely to vary between deploys" — 배포 환경마다 달라질 값이 config다. (출처: 12factor Config, 확인: 2026-07-07)
4. **코드와 설정의 분리**: "Config varies substantially across deploys, code does not." 코드는 고정, 설정은 주입. (출처: 12factor Config, 확인: 2026-07-07)
5. **환경변수 저장 원칙**: "The twelve-factor app stores config in environment variables" — 설정 파일이 아니라 환경변수가 표준. (출처: 12factor Config, 확인: 2026-07-07)
6. **오픈소스 리트머스 테스트**: "whether the codebase could be made open source at any moment, without compromising any credentials" — 지금 저장소를 공개해도 자격 증명이 안 새면 설정 분리가 잘 된 것. (출처: 12factor Config, 확인: 2026-07-07)

## 관련 기술
- secret ↔ auth-session-token: 토큰·세션 비밀키가 대표적 secret으로, 환경변수 분리 대상이다. (출처: 12factor Config + auth-session-token KB, 확인: 2026-07-07)
- .env 파일 ↔ .gitignore: 로컬 환경변수는 흔히 .env 파일에 두되 .gitignore로 커밋에서 제외한다(이 프로젝트의 .env.local 패턴). (근거: 12factor litmus test, 확인: 2026-07-07)
- process.env ↔ package-json-and-semver: npm 스크립트가 환경변수를 주입해 프로그램을 실행한다. (근거: Node.js process.env, 확인: 2026-07-07)

## 선행 개념
- auth-session-token: 관리해야 할 secret(토큰·세션 키)이 무엇인지.

## 후행 개념
- production-env-and-secrets (예정): 운영 환경에서 secret을 안전하게 주입·회전하는 방법.

## AI 시대에서의 의미
AI에게 "이 API 연동해줘"라고 하면 편의를 위해 API 키를 코드에 직접 박아 넣는 경우가 흔하다 — 이것이 secret 유출의 첫 번째 경로다. AI가 만든 코드를 검토할 때 ==하드코딩된 키·토큰·비밀번호가 있는지==를 먼저 봐야 하며, 발견하면 환경변수로 옮기고 .env를 .gitignore에 넣는다. Twelve-Factor의 리트머스 테스트("지금 공개해도 자격 증명이 안 새는가")가 AI 코드 검토의 실용적 기준이 된다. (근거: 12factor litmus test, 확인: 2026-07-07)

## 실무 활용
1. 설정 읽기: `process.env.API_KEY`로 코드에서 환경변수 참조 (없을 때 기본값·검증 처리). (출처: Node.js process.env, 확인: 2026-07-07)
2. 로컬 관리: .env 파일에 값을 두고 .gitignore로 커밋 제외. (근거: 12factor, 확인: 2026-07-07)
3. 타입 처리: 환경변수는 문자열이므로 숫자·불리언은 파싱·검증. (출처: Node.js process.env, 확인: 2026-07-07)
4. 분리 점검: 리트머스 테스트로 "지금 저장소를 공개해도 안전한가" 확인. (출처: 12factor Config, 확인: 2026-07-07)

## FAQ
Q: 환경변수와 설정 파일의 차이는?
A: Twelve-Factor는 설정을 환경변수에 저장할 것을 권한다 — 설정 파일은 실수로 커밋되기 쉽고 언어·프레임워크마다 흩어지지만, 환경변수는 코드와 분리된 표준 통로다. (출처: 12factor Config, 확인: 2026-07-07)
Q: process.env 값은 왜 항상 문자열인가?
A: Node.js가 환경변수 할당 시 값을 문자열로 변환하기 때문이다. 숫자·불리언이 필요하면 코드에서 파싱해야 한다. (출처: Node.js process.env, 확인: 2026-07-07)
Q: secret을 코드에 두면 왜 위험한가?
A: 저장소 이력에 영구히 남아, 나중에 지워도 과거 커밋에 남는다. 리트머스 테스트("공개해도 자격 증명이 안 새는가")를 통과하지 못한다. (출처: 12factor Config, 확인: 2026-07-07)
Q: .env 파일은 커밋해도 되나?
A: 안 된다. secret이 담기므로 .gitignore로 제외한다. 예시용으로는 값 없는 .env.example만 커밋한다. (근거: 12factor litmus test, 확인: 2026-07-07)

## 자주 하는 실수
1. 실수: API 키를 코드에 하드코딩. 왜 생기나: 임시로 넣고 방치. 교정: 환경변수로 분리 — 리트머스 테스트 통과 확인. (출처: 12factor Config, 확인: 2026-07-07)
2. 실수: .env 파일을 커밋. 왜 생기나: .gitignore 누락. 교정: .env를 .gitignore에 추가, 이미 커밋됐으면 이력에서 제거·키 회전. (근거: 12factor, 확인: 2026-07-07)
3. 실수: 환경변수를 숫자로 착각. 왜 생기나: 문자열 변환을 모름. 교정: Number()·비교로 명시적 파싱. (출처: Node.js process.env, 확인: 2026-07-07)
4. 실수: 설정을 코드 상수로 관리. 왜 생기나: 분리 원칙 무시. 교정: 배포마다 달라질 값은 환경변수로. (출처: 12factor Config, 확인: 2026-07-07)

## 공식 출처
- process.env 정의·문자열 변환·삭제 — [Node.js process.env](https://nodejs.org/api/process.html) (확인: 2026-07-07)
- 설정 정의·코드 분리·환경변수 저장·리트머스 테스트 — [Twelve-Factor App: Config](https://12factor.net/config) (확인: 2026-07-07)

## Quote Bank
- > "The process.env property returns an object containing the user environment."
  - 출처: [Node.js process.env](https://nodejs.org/api/process.html) (확인: 2026-07-07)
  - 맥락: process.env의 정의 — 환경변수를 담은 객체
- > "Assigning a property on process.env will implicitly convert the value to a string."
  - 출처: [Node.js process.env](https://nodejs.org/api/process.html) (확인: 2026-07-07)
  - 맥락: 환경변수는 문자열 — 숫자·불리언은 파싱 필요
- > "An app's config is everything that is likely to vary between deploys."
  - 출처: [Twelve-Factor App: Config](https://12factor.net/config) (확인: 2026-07-07)
  - 맥락: 설정의 정의 — 배포마다 달라질 값
- > "Config varies substantially across deploys, code does not."
  - 출처: [Twelve-Factor App: Config](https://12factor.net/config) (확인: 2026-07-07)
  - 맥락: 코드와 설정 분리의 근거
- > "The twelve-factor app stores config in environment variables."
  - 출처: [Twelve-Factor App: Config](https://12factor.net/config) (확인: 2026-07-07)
  - 맥락: 설정 저장 표준 — 환경변수
- > "A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials."
  - 출처: [Twelve-Factor App: Config](https://12factor.net/config) (확인: 2026-07-07)
  - 맥락: 분리 점검 기준 — 공개해도 자격 증명이 안 새는가

## 변경 이력
- 2026-07-07: 최초 작성 (Fable — 대행, P-01)
