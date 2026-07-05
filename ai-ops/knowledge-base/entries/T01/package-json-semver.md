---
id: package-json-semver
title: "package.json and Semantic Versioning (package.json과 시맨틱 버저닝)"
topicGroup: T01
status: approved
score: 85
level: 기초
prerequisites: [terminal-shell-commands, variables-types-data]
successors: [npm-scripts-reference, npm-debugging-playbook]
related: [files-folders-paths, deployment-platforms]
consumers:
  lessons: [package-json-and-semver]
  glossary: [package.json, Semantic Versioning, Dependency, Version Range, npm scripts, Package Specifier]
sources:
  - { title: "Modules: Packages", url: "https://nodejs.org/api/packages.html", checked: 2026-07-06 }
  - { title: "About semantic versioning", url: "https://docs.npmjs.com/about-semantic-versioning", checked: 2026-07-06 }
  - { title: "package.json", url: "https://docs.npmjs.com/cli/v11/configuring-npm/package-json", checked: 2026-07-06 }
  - { title: "Semantic Versioning 2.0.0", url: "https://semver.org/", checked: 2026-07-06 }
  - { title: "npm package spec", url: "https://docs.npmjs.com/cli/v11/using-npm/package-spec", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
`package.json`은 Node.js와 npm 생태계에서 package의 이름, 버전, scripts, dependencies 같은 메타데이터를 담는 JSON 파일이다. Node.js packages 문서는 package를 `package.json` file로 described되는 folder tree로 설명한다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-06)
Semantic Versioning은 `MAJOR.MINOR.PATCH` 형식으로 버전 변경 의미를 전달하는 규칙이다. SemVer 2.0.0은 version number가 MAJOR, MINOR, PATCH로 증가한다고 설명한다. (출처: https://semver.org/, 확인: 2026-07-06)

## 역사
Node.js package model은 package folder tree와 `package.json` metadata를 중심으로 동작한다. Node.js packages 문서는 package의 package scope, `package.json`, package entry points를 설명한다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-06)
npm은 package 설치와 배포에서 `package.json`을 핵심 설정 파일로 사용한다. npm package.json 문서는 name, version, description, scripts, dependencies 같은 fields를 설명한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
Semantic Versioning 2.0.0은 API 호환성 변화의 의미를 버전 번호로 전달하기 위한 규칙이다. SemVer spec은 incompatible API changes, backwards-compatible functionality, backwards-compatible bug fixes를 각각 MAJOR, MINOR, PATCH 증가와 연결한다. (출처: https://semver.org/, 확인: 2026-07-06)

## 해결하려는 문제
프로젝트에 어떤 package가 필요하고 어떤 명령을 실행해야 하는지 흩어져 있으면 설치, 개발, 빌드, 테스트 흐름을 재현하기 어렵다. npm package.json 문서는 scripts와 dependencies fields를 package metadata로 설명한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
dependency version 의미를 모르면 업데이트가 안전한 patch인지, 기능 추가 minor인지, 깨질 수 있는 major인지 판단하기 어렵다. SemVer spec은 MAJOR, MINOR, PATCH의 증가 조건을 정의한다. (출처: https://semver.org/, 확인: 2026-07-06)
터미널 명령만 알고 package metadata를 모르면 `npm install`, `npm run build`, dependency conflict 같은 결과를 이해하기 어렵다. npm package spec과 package.json docs는 package specifier와 dependencies를 설명한다. (출처: https://docs.npmjs.com/cli/v11/using-npm/package-spec, 확인: 2026-07-06; https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)

## 핵심 개념
1. Package folder tree: Node.js는 package를 `package.json` file로 described되는 folder tree로 설명한다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-06)
2. `name` and `version`: npm package.json docs는 `name`과 `version` fields를 package identity에 필요한 핵심 metadata로 설명한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
3. `scripts`: npm package.json docs는 scripts field가 package lifecycle events에서 실행되는 script commands를 담는다고 설명한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
4. `dependencies`: npm package.json docs는 dependencies field가 package name과 version range를 mapping한다고 설명한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
5. Package specifier: npm package spec 문서는 package를 설치할 때 name, version, tag, URL, git URL 같은 specifier를 사용할 수 있다고 설명한다. (출처: https://docs.npmjs.com/cli/v11/using-npm/package-spec, 확인: 2026-07-06)
6. SemVer core: SemVer 2.0.0은 version number를 MAJOR.MINOR.PATCH 형식으로 증가시키는 규칙을 정의한다. (출처: https://semver.org/, 확인: 2026-07-06)
7. Version ranges: npm의 semantic versioning 문서는 dependency version ranges와 semver calculator를 통해 허용되는 업데이트 범위를 확인할 수 있다고 설명한다. (출처: https://docs.npmjs.com/about-semantic-versioning, 확인: 2026-07-06)

## 관련 기술
- package.json vs package-lock.json: 이 KB는 `package.json`과 SemVer를 다룬다. lockfile은 dependency tree 고정과 재현 설치 문제로 후속 npm debugging 또는 package manager KB에서 다룬다. npm package.json docs와 package spec에 근거한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06; https://docs.npmjs.com/cli/v11/using-npm/package-spec, 확인: 2026-07-06)
- npm scripts vs terminal commands: scripts는 `package.json`에 이름으로 저장된 shell command이고, 실제 실행은 terminal에서 `npm run`으로 이루어진다. npm package.json scripts 설명과 terminal-shell-commands KB에 근거한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06; https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)
- SemVer vs npm range syntax: SemVer는 version number 의미 규칙이고, npm range syntax는 dependency가 허용하는 version set을 표현한다. SemVer spec과 npm semantic versioning 문서에 근거한다. (출처: https://semver.org/, 확인: 2026-07-06; https://docs.npmjs.com/about-semantic-versioning, 확인: 2026-07-06)
- Package vs module: Node.js packages 문서는 package와 module resolution을 함께 다루지만, 이 KB에서는 package metadata와 versioning에 범위를 둔다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-06)

## 선행 개념
- terminal-shell-commands: npm install과 npm run은 terminal에서 실행하는 command이므로 shell, current directory, command output을 먼저 알아야 한다. VS Code terminal 문서는 build, test, deploy를 위해 shell commands를 실행할 수 있다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)
- variables-types-data: `package.json`은 JSON object 형태의 metadata 파일이므로 key-value 구조와 string, array, object 값을 읽을 수 있어야 한다. MDN object와 data structures 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)

## 후행 개념
- npm-scripts-reference: `scripts` field를 이해하면 `npm run dev`, `npm run build`, `npm test` 같은 명령 레퍼런스로 넘어갈 수 있다. npm package.json scripts 설명에 근거한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
- npm-debugging-playbook: dependency version range, install spec, script command를 이해해야 npm 설치와 빌드 오류를 해석할 수 있다. npm package spec과 package.json docs에 근거한다. (출처: https://docs.npmjs.com/cli/v11/using-npm/package-spec, 확인: 2026-07-06; https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 "패키지를 추가하겠다"고 할 때 `package.json`의 dependencies와 scripts가 어떻게 바뀌는지 확인해야 한다. npm package.json docs는 dependencies와 scripts를 공식 fields로 설명한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
AI가 제안한 dependency upgrade는 SemVer 범위와 major/minor/patch 의미를 확인해야 한다. SemVer spec과 npm semantic versioning 문서는 version number와 version range를 판단 기준으로 제공한다. (출처: https://semver.org/, 확인: 2026-07-06; https://docs.npmjs.com/about-semantic-versioning, 확인: 2026-07-06)

## 실무 활용
1. 실행 명령 찾기: `package.json`의 scripts field를 보고 프로젝트에서 지원하는 dev, build, test 명령을 확인한다. npm package.json docs에 근거한다. (근거: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
2. dependency 영향 확인: 새 package가 dependencies 또는 devDependencies 중 어디에 들어가는지 확인한다. npm package.json docs에 근거한다. (근거: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
3. version risk 읽기: major upgrade는 incompatible API changes 가능성을 우선 점검하고, minor와 patch는 SemVer 의미를 기준으로 검토한다. SemVer spec에 근거한다. (근거: https://semver.org/, 확인: 2026-07-06)

```json
{
  "name": "ai-vibe-coding-master",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.0.0"
  }
}
```

## FAQ
Q: package.json은 코드 파일인가?
A: JavaScript 실행 로직을 담는 파일은 아니지만 package metadata와 scripts, dependencies를 담는 JSON 파일이다. Node.js packages와 npm package.json docs에 근거한다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-06; https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)

Q: `^`가 붙은 dependency는 항상 안전한가?
A: 안전하다고 단정할 수 없다. npm semantic versioning 문서는 version ranges를 설명하고, SemVer spec은 version number 의미를 정의한다. 실제 안전성은 package의 변경 내용과 테스트로 확인해야 한다. (출처: https://docs.npmjs.com/about-semantic-versioning, 확인: 2026-07-06; https://semver.org/, 확인: 2026-07-06)

Q: npm scripts는 어디에서 실행되는가?
A: package의 `scripts` field에 정의되고 terminal에서 npm command로 실행된다. npm package.json scripts 설명과 terminal-shell-commands KB의 terminal 실행 설명에 근거한다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06; https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)

Q: version과 package spec은 같은가?
A: 아니다. version은 package의 버전 번호이고 package specifier는 name, version, tag, URL 등 package를 가리키는 다양한 표기다. npm package spec 문서에 근거한다. (출처: https://docs.npmjs.com/cli/v11/using-npm/package-spec, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: `package.json`을 단순 메모 파일로 본다. 왜 생기나: JSON 형태라 설정처럼만 보이기 때문이다. 교정: Node.js package model과 npm metadata의 중심 파일로 읽는다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-06; https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
2. 실수: SemVer major/minor/patch 의미를 외우지 않고 dependency를 업데이트한다. 왜 생기나: version number를 단순 최신 숫자로 보기 때문이다. 교정: SemVer spec의 MAJOR, MINOR, PATCH 증가 조건을 확인한다. (출처: https://semver.org/, 확인: 2026-07-06)
3. 실수: dependencies와 scripts를 바꾼 뒤 실행 명령을 확인하지 않는다. 왜 생기나: 설치와 실행을 별개로만 생각하기 때문이다. 교정: package.json의 scripts와 dependencies를 함께 본다. (출처: https://docs.npmjs.com/cli/v11/configuring-npm/package-json, 확인: 2026-07-06)
4. 실수: AI가 추가한 package specifier를 검토하지 않는다. 왜 생기나: package name만 맞으면 된다고 생각하기 때문이다. 교정: npm package spec 문서 기준으로 name, version, tag, URL, git URL 등 specifier 형태를 확인한다. (출처: https://docs.npmjs.com/cli/v11/using-npm/package-spec, 확인: 2026-07-06)

## 공식 출처
- Node.js package는 `package.json` file로 described되는 folder tree다 — [Modules: Packages](https://nodejs.org/api/packages.html) (확인: 2026-07-06)
- npm package.json docs는 name, version, scripts, dependencies 같은 fields를 설명한다 — [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) (확인: 2026-07-06)
- npm semantic versioning docs는 version ranges와 dependency update 범위를 설명한다 — [About semantic versioning](https://docs.npmjs.com/about-semantic-versioning) (확인: 2026-07-06)
- SemVer 2.0.0은 MAJOR.MINOR.PATCH 증가 조건을 정의한다 — [Semantic Versioning 2.0.0](https://semver.org/) (확인: 2026-07-06)
- npm package spec은 package를 가리키는 specifier 형태를 설명한다 — [npm package spec](https://docs.npmjs.com/cli/v11/using-npm/package-spec) (확인: 2026-07-06)

## Quote Bank
- > "A package is a folder tree"
  - 출처: [Modules: Packages](https://nodejs.org/api/packages.html) (확인: 2026-07-06)
  - 맥락: package와 folder tree의 관계를 설명할 때 사용한다.
- > "package.json"
  - 출처: [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) (확인: 2026-07-06)
  - 맥락: metadata 파일의 이름과 역할을 설명할 때 사용한다.
- > "scripts"
  - 출처: [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) (확인: 2026-07-06)
  - 맥락: npm run 명령과 package metadata를 연결할 때 사용한다.
- > "MAJOR.MINOR.PATCH"
  - 출처: [Semantic Versioning 2.0.0](https://semver.org/) (확인: 2026-07-06)
  - 맥락: semantic versioning의 핵심 형식을 설명할 때 사용한다.
- > "version ranges"
  - 출처: [About semantic versioning](https://docs.npmjs.com/about-semantic-versioning) (확인: 2026-07-06)
  - 맥락: dependencies에서 허용되는 업데이트 범위를 설명할 때 사용한다.
- > "package spec"
  - 출처: [npm package spec](https://docs.npmjs.com/cli/v11/using-npm/package-spec) (확인: 2026-07-06)
  - 맥락: dependency specifier가 단순 version만이 아님을 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
