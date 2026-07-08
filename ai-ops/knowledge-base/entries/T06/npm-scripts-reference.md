---
id: npm-scripts-reference
title: "npm scripts 레퍼런스 — 프로젝트 명령의 표준 통로"
topicGroup: T06
status: approved
score: 89
level: 기초
prerequisites: [package-json-and-semver]
successors: []
related: [build-and-runtime]
sources:
  - { title: "scripts — npm Docs (CLI v10)", url: "https://docs.npmjs.com/cli/v10/using-npm/scripts", checked: 2026-07-08 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-08
---

## 정의
npm scripts는 `package.json`의 `"scripts"` 필드에 이름-명령 쌍으로 정의해 `npm run <이름>`으로 실행하는 프로젝트 명령이다. npm 문서는 "The scripts property of your package.json file supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts"(package.json의 scripts 속성은 내장 스크립트와 사전 설정된 생명주기 이벤트, 그리고 임의 스크립트를 지원한다)라고 설명한다. `npm run build`, `npm run dev`처럼 긴 명령을 짧은 이름 뒤에 감춰, 팀 전체가 같은 명령으로 같은 작업을 하게 한다. (출처: npm scripts, 확인: 2026-07-08)

## 역사
프로젝트마다 빌드·테스트·실행 명령이 제각각이면 협업이 어렵다. npm scripts는 이 명령들을 package.json 한 곳에 표준화해, "이 프로젝트는 어떻게 빌드하나?"의 답을 `scripts` 필드로 통일한다. build-and-runtime 강의의 빌드 단계가 실무에서 대개 `npm run build`로 실행되는 것이 이 표준화의 사례다. (출처: npm scripts + build-and-runtime KB, 확인: 2026-07-08)

## 해결하려는 문제
- 긴 명령의 표준화: 복잡한 명령을 짧은 이름 뒤에 두어 팀이 공유. (출처: npm scripts, 확인: 2026-07-08)
- 생명주기 자동화: pre/post 규칙으로 앞뒤 작업을 자동 연결. (출처: npm scripts, 확인: 2026-07-08)
- 실행 방법의 문서화: scripts 필드 자체가 "이 프로젝트를 어떻게 다루나"의 문서. (근거: npm scripts, 확인: 2026-07-08)

## 핵심 개념
1. **scripts 필드**: package.json의 `"scripts"`가 내장 스크립트·생명주기 이벤트·임의 스크립트를 지원한다. (출처: npm scripts, 확인: 2026-07-08)
2. **`npm run <이름>`**: "These all can be executed by running npm run-script <stage> or npm run <stage> for short." — 정의한 스크립트를 이 명령으로 실행. (출처: npm scripts, 확인: 2026-07-08)
3. **pre/post 규칙**: "Pre and post commands with matching names will be run for those as well (e.g. premyscript, myscript, postmyscript)." — `npm run myscript`가 premyscript → myscript → postmyscript 순으로 자동 실행된다. (출처: npm scripts, 확인: 2026-07-08)
4. **생명주기 스크립트**: prepare 등 특정 이름은 npm이 정해진 시점(설치·배포 등)에 자동 호출한다. (출처: npm scripts, 확인: 2026-07-08)
5. **임의 스크립트**: 정해진 이름 외에 원하는 이름으로 명령을 정의해 `npm run`으로 실행 가능. (출처: npm scripts, 확인: 2026-07-08)
6. **의존성의 스크립트**: "Scripts from dependencies can be run with npm explore <pkg> -- npm run <stage>." (출처: npm scripts, 확인: 2026-07-08)

## 관련 기술
- npm scripts ↔ package-json-and-semver: scripts는 package.json의 한 필드다. (출처: npm scripts + package-json KB, 확인: 2026-07-08)
- build 스크립트 ↔ build-and-runtime: `npm run build`가 빌드 단계를 실행. (출처: npm scripts + build-and-runtime KB, 확인: 2026-07-08)
- pre/post ↔ 자동화: 검증·정리 작업을 pre/post로 엮어 실수 방지. (근거: npm scripts, 확인: 2026-07-08)

## 선행 개념
- package-json-and-semver: scripts가 사는 package.json의 구조.

## 후행 개념
- deployment-cli-reference (예정): 배포 CLI 명령을 scripts로 감싸는 실무.

## AI 시대에서의 의미
AI에게 "이 프로젝트 어떻게 실행해?"를 물으면 답의 근거가 scripts 필드다 — AI도 사람도 package.json의 scripts를 읽어 그 프로젝트의 표준 명령을 파악한다. 이 사이트도 `npm run verify`(lint·타입·테스트·빌드) 같은 스크립트로 검증을 표준화한다. AI가 만든 스크립트를 검토할 때는 pre/post 훅이 의도치 않은 작업(예: prepublish의 자동 실행)을 하지 않는지 확인해야 한다. (근거: npm scripts, 확인: 2026-07-08)

## 실무 활용
1. 명령 표준화: 자주 쓰는 긴 명령을 scripts에 이름으로 등록. (출처: npm scripts, 확인: 2026-07-08)
2. 검증 파이프라인: `npm run verify`처럼 여러 검사를 한 스크립트로 묶음. (근거: npm scripts, 확인: 2026-07-08)
3. pre/post 자동화: `prebuild`로 정리, `postbuild`로 후처리를 자동 연결. (출처: npm scripts, 확인: 2026-07-08)
4. 프로젝트 파악: 낯선 프로젝트는 scripts 필드부터 읽어 실행 방법 확인. (근거: npm scripts, 확인: 2026-07-08)

## FAQ
Q: npm run과 npm run-script의 차이는?
A: 같다. `npm run <stage>`는 `npm run-script <stage>`의 짧은 형태다. (출처: npm scripts, 확인: 2026-07-08)
Q: pre/post는 어떻게 동작하나?
A: `npm run foo`를 실행하면 이름이 일치하는 `prefoo`와 `postfoo`도 함께(앞·뒤로) 실행된다. (출처: npm scripts, 확인: 2026-07-08)
Q: 아무 이름이나 스크립트로 쓸 수 있나?
A: 그렇다. 내장·생명주기 스크립트 외에 임의 이름의 스크립트를 정의해 `npm run`으로 실행할 수 있다. (출처: npm scripts, 확인: 2026-07-08)
Q: 의존성 패키지의 스크립트를 실행하려면?
A: `npm explore <pkg> -- npm run <stage>`로 실행한다. (출처: npm scripts, 확인: 2026-07-08)

## 자주 하는 실수
1. 실수: 같은 명령을 팀원마다 다르게 실행. 왜 생기나: scripts 미표준화. 교정: 공통 명령을 scripts에 등록. (출처: npm scripts, 확인: 2026-07-08)
2. 실수: pre/post 훅이 도는 줄 모름. 왜 생기나: 규칙 미인지. 교정: pre/post 이름 규칙을 이해하고 의도적으로 사용. (출처: npm scripts, 확인: 2026-07-08)
3. 실수: 낯선 프로젝트를 임의 명령으로 실행. 왜 생기나: scripts를 안 읽음. 교정: package.json scripts부터 확인. (근거: npm scripts, 확인: 2026-07-08)
4. 실수: 생명주기 스크립트(prepare 등)를 임의 용도로 오용. 왜 생기나: 자동 호출 시점 모름. 교정: 생명주기 이름은 정해진 의미대로만. (출처: npm scripts, 확인: 2026-07-08)

## 공식 출처
- scripts 필드·npm run·pre/post 규칙·의존성 스크립트 — [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts) (확인: 2026-07-08)

## Quote Bank
- > "The \"scripts\" property of your package.json file supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts."
  - 출처: [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts) (확인: 2026-07-08)
  - 맥락: scripts 필드의 역할 — 내장·생명주기·임의 스크립트
- > "Pre and post commands with matching names will be run for those as well (e.g. premyscript, myscript, postmyscript)."
  - 출처: [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts) (확인: 2026-07-08)
  - 맥락: pre/post 자동 실행 규칙
- > "These all can be executed by running npm run-script <stage> or npm run <stage> for short."
  - 출처: [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts) (확인: 2026-07-08)
  - 맥락: npm run이 npm run-script의 짧은 형태
- > "Scripts from dependencies can be run with npm explore <pkg> -- npm run <stage>."
  - 출처: [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts) (확인: 2026-07-08)
  - 맥락: 의존성 패키지의 스크립트 실행법

## 변경 이력
- 2026-07-08: 최초 작성 (Fable — 대행, P-01)
