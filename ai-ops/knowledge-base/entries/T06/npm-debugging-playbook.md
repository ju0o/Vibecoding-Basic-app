---
id: npm-debugging-playbook
title: "npm 설치·빌드 오류 복구 플레이북 (npm Debugging Playbook)"
topicGroup: T06
status: approved
score: 89
level: 중급
prerequisites: [npm-scripts-reference, package-json-semver]
successors: [deployment-checklist-playbook]
related: [build-and-runtime, ci-cd-pipeline-basics, production-env-secrets]
consumers:
  lessons: [npm-debugging-playbook]
  glossary: []
sources:
  - { title: "npm Docs — npm ci", url: "https://docs.npmjs.com/cli/v11/commands/npm-ci/", checked: 2026-07-12 }
  - { title: "npm Docs — package.json", url: "https://docs.npmjs.com/cli/v11/configuring-npm/package-json/", checked: 2026-07-12 }
  - { title: "npm Docs — npm install", url: "https://docs.npmjs.com/cli/v11/commands/npm-install/", checked: 2026-07-12 }
  - { title: "npm Docs — package-lock.json", url: "https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/", checked: 2026-07-12 }
  - { title: "npm Docs — Auditing package dependencies", url: "https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
npm 디버깅 플레이북은 `package.json`, lockfile, install mode, scripts, Node/npm version, audit report를 순서대로 확인해 설치·빌드 오류를 좁히는 절차다. 초보자에게 중요한 점은 npm 오류를 "패키지 문제"로 뭉뚱그리지 않고 manifest 문제, lockfile 불일치, peer dependency 충돌, script 실패, 환경 변수 문제로 나누는 것이다.

## 역사
npm 생태계가 커지면서 dependency tree는 개발자 한 명이 직접 추적하기 어려울 만큼 복잡해졌다. `package.json`은 프로젝트의 manifest 역할을 하고, `package-lock.json`은 생성된 dependency tree를 기록해 재현 가능한 설치를 돕는다. CI와 deployment에서는 `npm install`보다 frozen install에 가까운 `npm ci`가 필요해졌고, audit은 dependency vulnerability 점검 절차로 자리 잡았다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json/, https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/, https://docs.npmjs.com/cli/v11/commands/npm-ci/, 확인: 2026-07-12)

## 해결하려는 문제
설치 오류는 원인이 다양하다. `package.json`이 JSON 형식이 아니거나, lockfile이 dependency range와 맞지 않거나, CI에서 `npm ci`가 lock mismatch로 실패하거나, install flag가 lockfile 생성 때와 달라질 수 있다. 플레이북은 "node_modules 삭제 후 재시도" 전에 manifest와 lockfile 관계를 읽고, 로컬과 CI의 install command를 일치시키게 한다. (출처: https://docs.npmjs.com/cli/v11/commands/npm-ci/, https://docs.npmjs.com/cli/v11/commands/npm-install/, 확인: 2026-07-12)

## 핵심 개념
1. **package.json은 실제 JSON**: npm 문서는 package.json이 JavaScript object literal이 아니라 actual JSON이어야 한다고 설명한다. trailing comma나 주석이 있으면 parsing error가 난다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json/, 확인: 2026-07-12)
2. **lockfile은 exact tree 기록**: package-lock은 npm이 node_modules tree나 package.json을 수정할 때 자동 생성되며, subsequent install이 동일한 tree를 만들 수 있게 한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/, 확인: 2026-07-12)
3. **install과 ci 차이**: `npm install`은 package.json과 lockfile을 비교하고 필요하면 lockfile을 갱신한다. `npm ci`는 lockfile이 필요하며 불일치 시 error로 종료한다. (출처: https://docs.npmjs.com/cli/v11/commands/npm-install/, https://docs.npmjs.com/cli/v11/commands/npm-ci/, 확인: 2026-07-12)
4. **node_modules는 재현 대상**: `npm ci`는 기존 node_modules가 있으면 자동으로 제거하고 install을 시작한다. 따라서 CI에서 node_modules를 커밋하거나 수동 수정한 상태를 믿으면 안 된다. (출처: https://docs.npmjs.com/cli/v11/commands/npm-ci/, 확인: 2026-07-12)
5. **install flag 일치**: lockfile을 `--legacy-peer-deps` 같은 flag로 만들었다면 `npm ci`에도 같은 flag가 필요할 수 있다. project `.npmrc`에 기록해 팀과 CI가 같은 설정을 쓰게 한다. (출처: https://docs.npmjs.com/cli/v11/commands/npm-ci/, 확인: 2026-07-12)
6. **audit은 risk triage**: npm audit은 configured dependencies를 registry에 제출해 known vulnerabilities report를 요청한다. report는 severity, path, fix command, manual review 여부를 제공한다. (출처: https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/, 확인: 2026-07-12)

## 관련 기술
- build-and-runtime: install은 build 이전 준비 단계이고, runtime 오류와 구분해야 한다.
- ci-cd-pipeline-basics: CI에서는 lockfile 기반 reproducible install이 중요하다.
- production-env-secrets: build script가 환경 변수를 요구하면 install 문제가 아니라 환경 설정 문제일 수 있다.

## 선행 개념
- npm-scripts-reference: `npm run build`, `npm test`, `npm run verify`가 어떤 script를 실행하는지 알아야 한다.
- package-json-semver: dependency range와 lockfile exact version의 차이를 알아야 한다.

## 후행 개념
- deployment-checklist-playbook: 배포 전에 install/build/test/audit를 체크리스트로 묶는 단계로 이어진다.

## AI 시대에서의 의미
AI에게 "npm 오류 고쳐줘"라고 하면 가장 흔한 응답은 무작정 package version을 올리거나 lockfile을 다시 쓰는 것이다. 하지만 실무에서는 lockfile이 팀과 CI의 재현성을 담당하므로, AI가 변경한 dependency와 lockfile diff를 반드시 검토해야 한다. 바이브코딩에서는 오류 로그를 붙일 때 command, Node/npm version, package manager, lockfile 상태, CI/local 차이를 함께 제공해야 한다.

## 실무 활용
1. **JSON parse error**: package.json의 trailing comma, comment, quote 누락을 먼저 확인한다.
2. **CI에서만 실패**: CI command가 `npm ci`인지 보고 package-lock과 package.json 불일치를 확인한다.
3. **peer dependency 충돌**: lockfile 생성 때 사용한 install flag와 CI `.npmrc`가 일치하는지 본다.
4. **audit 실패**: severity와 breaking change 여부를 보고 자동 fix와 manual review를 나눈다.
5. **빌드 script 실패**: install 성공 후 `npm run build`가 실패하면 TypeScript, env, Next build 문제로 분리한다.

```bash
npm --version
npm ci
npm run build
npm audit
```

## FAQ
Q: 로컬에서는 `npm install`이 되는데 CI에서 `npm ci`가 실패하는 이유는?
A: `npm ci`는 package-lock과 package.json dependencies가 맞지 않으면 lockfile을 갱신하지 않고 error로 종료한다. CI에서는 이 차이가 의도된 안전장치다. (출처: https://docs.npmjs.com/cli/v11/commands/npm-ci/, 확인: 2026-07-12)

Q: package-lock.json은 커밋해야 하는가?
A: npm 문서는 package-lock이 source repositories에 committed intended라고 설명한다. 팀, deployment, CI가 동일 dependency tree를 설치하게 하기 위해 필요하다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/, 확인: 2026-07-12)

Q: audit fix를 바로 실행해도 되는가?
A: report가 semver major breaking change를 제안할 수 있다. 자동 fix 전에 affected path와 breaking warning을 읽고 테스트해야 한다. (출처: https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/, 확인: 2026-07-12)

## 자주 하는 실수
1. **lockfile을 지우고 해결했다고 생각**: 재현성이 사라진다. 교정: 왜 lock mismatch가 났는지 package.json diff와 함께 확인한다.
2. **npm install과 npm ci를 섞음**: local과 CI의 dependency tree가 달라진다. 교정: 개발·CI 정책을 README와 `.npmrc`에 명시한다.
3. **audit fix만 믿음**: breaking change가 들어올 수 있다. 교정: audit report, changelog, test를 함께 본다.
4. **build 오류를 install 오류로 오해**: install이 성공했는데 `npm run build`가 실패하면 source/type/env 문제다. 교정: command boundary를 분리해 로그를 읽는다.

## 공식 출처
- frozen install과 lock mismatch 처리 — [npm Docs — npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) (확인 날짜: 2026-07-12)
- manifest 형식과 name/version — [npm Docs — package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/) (확인 날짜: 2026-07-12)
- install과 lockfile precedence — [npm Docs — npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/) (확인 날짜: 2026-07-12)
- exact dependency tree와 source repository commit — [npm Docs — package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/) (확인 날짜: 2026-07-12)
- audit report와 manual review — [npm Docs — Auditing package dependencies](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/) (확인 날짜: 2026-07-12)

## Quote Bank
- > "It must be actual JSON"
  - 출처: [npm Docs — package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/) (확인: 2026-07-12)
  - 맥락: package.json parse 오류를 설명할 때 사용한다.
- > "This command installs a package and any packages that it depends on."
  - 출처: [npm Docs — npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/) (확인: 2026-07-12)
  - 맥락: install 명령의 기본 목적을 설명할 때 사용한다.
- > "`package-lock.json` is automatically generated"
  - 출처: [npm Docs — package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/) (확인: 2026-07-12)
  - 맥락: lockfile의 생성과 역할을 설명할 때 사용한다.
- > "Clean install a project"
  - 출처: [npm Docs — npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) (확인: 2026-07-12)
  - 맥락: npm ci를 CI용 clean install로 설명할 때 사용한다.
- > "installs are essentially frozen"
  - 출처: [npm Docs — npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) (확인: 2026-07-12)
  - 맥락: npm ci가 package 파일을 쓰지 않는다는 점을 설명할 때 사용한다.
- > "`npm audit` checks direct dependencies"
  - 출처: [npm Docs — Auditing package dependencies](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/) (확인: 2026-07-12)
  - 맥락: audit scope와 한계를 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
