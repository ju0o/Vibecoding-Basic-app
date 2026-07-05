## 한 줄 정의

`package.json`은 Node.js와 npm 프로젝트의 이름, 버전, 실행 명령, 의존성 정보를 담는 package metadata 파일이고, Semantic Versioning은 dependency version을 `MAJOR.MINOR.PATCH` 의미로 읽게 해 주는 버전 규칙입니다. Node.js 문서는 package를 `package.json` file로 described되는 folder tree로 설명하고, npm 문서는 `name`, `version`, `scripts`, `dependencies` 같은 fields를 package metadata로 다룹니다. SemVer 2.0.0은 incompatible API changes, backwards-compatible functionality, backwards-compatible bug fixes를 각각 major, minor, patch 증가와 연결합니다.

이 강의의 목표는 `package.json`을 "설정 파일 하나"로만 보는 습관에서 벗어나는 것입니다. 프로젝트를 설치하고 실행하고 빌드하고 테스트하는 흐름은 terminal command만으로 완성되지 않습니다. 터미널에서 `npm run build`를 입력하기 전에, 그 명령이 `package.json`의 `scripts` field에 어떤 문자열로 저장되어 있는지 읽어야 합니다. ==`package.json`은 프로젝트가 어떻게 실행되고 어떤 package에 의존하는지 설명하는 입구 파일==입니다.

Semantic Versioning도 단순히 최신 숫자를 따라가는 규칙이 아닙니다. `1.2.3`이라는 번호는 숫자 세 칸이 아니라 변경 위험을 읽기 위한 약속입니다. AI가 dependency를 추가하거나 upgrade를 제안할 때, 우리는 package name만 볼 것이 아니라 version range와 SemVer 의미를 함께 확인해야 합니다. 그래야 "설치가 됐다"와 "업데이트가 안전하다"를 구분할 수 있습니다.

![package.json과 SemVer 흐름](/lesson-diagrams/package-json-and-semver/package-semver-flow.svg)

## 왜 존재하는가

프로젝트가 작을 때는 필요한 파일과 실행 명령을 사람이 기억할 수 있습니다. 하지만 Node.js와 npm 생태계의 프로젝트는 package, scripts, dependency, version 정보가 함께 움직입니다. 어떤 package가 필요하고, 어떤 command로 개발 서버를 켜고, 어떤 command로 build와 test를 실행하는지 흩어져 있으면 같은 작업을 다른 컴퓨터에서 재현하기 어렵습니다. npm package.json 문서가 `scripts`와 `dependencies`를 package metadata로 설명하는 이유는 이 정보를 프로젝트 안에 고정하기 위해서입니다.

Node.js의 package model은 폴더 구조와 metadata 파일을 연결합니다. 단순한 folder와 package folder tree를 구분하려면 그 폴더가 어떤 metadata로 설명되는지 봐야 합니다. Node.js packages 문서의 package scope, `package.json`, entry points 설명은 package를 "파일 몇 개가 모인 폴더"가 아니라 실행과 resolution의 맥락을 가진 단위로 다루게 합니다. 이 강의에서는 entry point의 세부 동작보다 package metadata와 versioning에 집중합니다.

의존성 버전 문제도 같은 배경에서 생깁니다. 프로젝트가 외부 package에 의존하면, 외부 package가 바뀔 때 내 프로젝트의 동작도 영향을 받을 수 있습니다. Semantic Versioning은 `MAJOR.MINOR.PATCH` 형식으로 API 호환성 변화의 의미를 전달하려는 규칙입니다. dependency version이 단순한 장식이라면 업데이트 판단은 매번 감으로 해야 합니다. SemVer는 최소한 major, minor, patch라는 분류 기준을 줍니다.

AI 코딩 시대에는 이 필요성이 더 커집니다. AI는 "이 라이브러리를 추가하겠습니다", "빌드 스크립트를 바꾸겠습니다", "dependency를 업그레이드하겠습니다"라고 제안할 수 있습니다. 이때 사람이 `package.json`을 읽지 못하면 AI가 무엇을 바꿨는지 검토할 수 없습니다. ==AI가 package metadata를 수정할 때 사람의 검토 지점은 scripts, dependencies, version range입니다.==

> [!KEY]
> `package.json`은 프로젝트 실행 방법과 dependency 계약을 한곳에 모아 두는 metadata 파일입니다. terminal command를 실행하기 전에 이 파일을 읽으면 "무슨 명령을 왜 실행하는지"가 보입니다.

## 작동 원리

### 1. 폴더는 package metadata를 통해 package가 됩니다

Node.js packages 문서는 package를 `package.json` file로 described되는 folder tree로 설명합니다. 여기서 중요한 것은 "폴더"와 "package"가 같은 말이 아니라는 점입니다. 폴더는 파일을 담는 구조이고, package는 그 folder tree가 어떤 이름과 version, scripts, dependency metadata를 갖는지 설명될 때 프로젝트 단위로 읽힙니다.

이 관점은 초보자가 프로젝트 루트에서 길을 잃지 않게 합니다. 같은 `src` 폴더와 같은 `README`가 있더라도, npm 프로젝트에서 실제 실행 명령과 dependency 목록은 `package.json`에 모입니다. 따라서 새 프로젝트를 받으면 먼저 파일 트리 전체를 외우려 하지 말고 `package.json`의 핵심 field를 읽는 편이 좋습니다. `name`과 `version`은 package identity를, `scripts`는 실행 가능한 command alias를, `dependencies`는 외부 package 요구사항을 보여줍니다.

### 2. `scripts`는 terminal command에 이름을 붙입니다

npm package.json 문서는 `scripts` field가 package lifecycle events에서 실행되는 script commands를 담는다고 설명합니다. 입문자에게는 이 말을 조금 바꿔 읽는 것이 좋습니다. `scripts`는 terminal에서 매번 긴 command를 직접 치지 않도록 프로젝트 안에 이름을 붙여 저장한 command 목록입니다. 예를 들어 `build`라는 script가 `"next build"`라면, terminal에서 `npm run build`를 실행할 때 실제로는 package metadata에 저장된 build command를 실행하는 흐름으로 볼 수 있습니다.

이 구조 때문에 "터미널 명령"과 "`package.json` metadata"는 떨어져 있지 않습니다. `npm run dev`가 되는 프로젝트와 안 되는 프로젝트의 차이는 terminal 지식만으로 설명되지 않을 수 있습니다. 그 script name이 `package.json`에 있는지, 어떤 command 문자열로 정의됐는지 확인해야 합니다. 앞 강의에서 배운 current directory도 여기에 연결됩니다. npm command는 package metadata를 기준으로 움직이므로 어느 folder에서 실행하는지가 결과에 영향을 줍니다.

### 3. `dependencies`는 package name과 version range를 연결합니다

npm package.json 문서는 dependencies field가 package name과 version range를 mapping한다고 설명합니다. 여기서 mapping이라는 감각이 중요합니다. dependency 목록은 단순한 이름 나열이 아니라, "이 package 이름에는 이 version 또는 range를 허용한다"는 연결입니다. 예를 들어 `"next": "^15.0.0"` 같은 항목은 package name과 version range가 함께 있어야 의미를 가집니다.

이 연결을 모르면 dependency update를 제대로 읽을 수 없습니다. AI가 package를 추가했을 때 package name만 보고 끝내면, 어떤 version range가 들어갔는지 놓칠 수 있습니다. AI가 "업데이트했습니다"라고 말했을 때도 major, minor, patch 중 어떤 위험이 있는지 확인하지 않으면 변경의 의미가 흐려집니다. ==dependency 검토는 package name 확인과 version range 확인을 한 번에 하는 작업==입니다.

### 4. package specifier는 version만이 아닙니다

npm package spec 문서는 package를 설치할 때 name, version, tag, URL, git URL 같은 specifier를 사용할 수 있다고 설명합니다. 그래서 dependency를 볼 때 "version number만 있겠지"라고 가정하면 위험합니다. package specifier는 package를 가리키는 표기이고, version은 그중 하나의 요소일 수 있습니다.

이 지점은 AI가 설치 명령을 제안할 때 특히 중요합니다. AI가 어떤 package를 어떤 specifier로 설치하려는지 확인해야 합니다. name과 version이 명확한지, tag나 URL이나 git URL이 쓰였는지, 프로젝트의 목적에 맞는지 검토해야 합니다. 이 강의에서는 각 specifier의 세부 문법을 외우기보다, "dependency 항목은 package name 하나로 끝나지 않는다"는 읽기 기준을 세웁니다.

### 5. SemVer는 버전 숫자에 변경 의미를 부여합니다

Semantic Versioning 2.0.0은 version number를 `MAJOR.MINOR.PATCH` 형식으로 증가시키는 규칙을 정의합니다. KB는 이 규칙을 incompatible API changes, backwards-compatible functionality, backwards-compatible bug fixes와 연결합니다. 즉 major는 깨질 수 있는 변화, minor는 뒤로 호환되는 기능 추가, patch는 뒤로 호환되는 버그 수정의 의미를 전달합니다.

이 규칙은 package maintainer가 버전 번호를 통해 의도를 전달하기 위한 약속입니다. 사용자 입장에서는 dependency update를 볼 때 "숫자가 커졌다"가 아니라 "어떤 종류의 변화라고 주장되는가"를 읽을 수 있습니다. 물론 SemVer를 쓴다고 모든 update가 자동으로 안전해지는 것은 아닙니다. 실제 안전성은 package 변경 내용과 테스트로 확인해야 합니다. 하지만 SemVer는 검토 우선순위를 정하는 출발점이 됩니다.

### 6. version ranges는 허용되는 업데이트 범위를 만듭니다

npm의 semantic versioning 문서는 dependency version ranges와 semver calculator를 통해 허용되는 update 범위를 확인할 수 있다고 설명합니다. `dependencies`에 들어가는 값은 정확히 하나의 version일 수도 있지만, range일 수도 있습니다. range는 "어떤 version set을 허용할 것인가"라는 표현입니다. 그래서 설치 시점이나 update 시점에 실제로 선택되는 package version을 이해하려면 range를 읽어야 합니다.

초보자가 여기서 자주 겪는 혼란은 "package.json에 있는 숫자"와 "설치된 실제 package"를 같은 것으로 보는 것입니다. 이 KB는 lockfile을 후속 주제로 남기므로 여기서 세부를 확장하지 않습니다. 다만 중요한 원리는 말할 수 있습니다. `package.json`의 dependency entry는 package name과 version range를 선언하고, 그 range가 어떤 update를 허용하는지 확인하는 습관이 필요합니다.

### 7. AI 시대의 검토 루프는 package metadata diff에서 시작합니다

AI가 만든 코드 변경을 검토할 때 `package.json` diff는 작아 보여도 의미가 큽니다. scripts가 바뀌면 실행 명령이 바뀔 수 있고, dependencies가 바뀌면 설치와 build 결과가 달라질 수 있습니다. version range가 바뀌면 허용되는 update 범위가 달라집니다. 이런 변화는 UI 코드 한 줄보다 더 넓은 영향을 가질 수 있습니다.

따라서 AI에게 package 작업을 맡길 때는 요청을 좁혀야 합니다. "필요한 package를 추가해줘"라고만 말하기보다, 어떤 field를 바꿨는지, scripts를 추가했는지, dependencies와 devDependencies 중 어디에 들어갔는지, SemVer 관점에서 risk가 무엇인지 설명하게 하는 편이 좋습니다. AI의 답변이 아니라 `package.json` diff와 verify 결과가 최종 판단 기준입니다.

> [!WARNING]
> `package.json` 변경은 "설치가 성공했는가"만으로 승인하지 않습니다. scripts, dependencies, version range, verify 결과를 함께 봐야 합니다.

## 스펙과 세부

### package folder tree

Node.js packages 문서에서 package는 `package.json` file로 described되는 folder tree입니다. 이 표현은 package를 하나의 파일이 아니라 폴더 계층과 metadata의 조합으로 보게 합니다. 그래서 `package.json`을 읽을 때는 이 파일이 현재 folder tree를 어떤 package로 설명하는지 보는 것이 먼저입니다.

### `name`과 `version`

npm package.json docs는 `name`과 `version` fields를 package identity에 필요한 핵심 metadata로 설명합니다. `name`은 package를 식별하는 이름이고, `version`은 그 package의 버전입니다. AI가 package metadata를 수정할 때 이 두 field를 임의로 바꾸는 일은 프로젝트 정체성과 배포 의미에 영향을 줄 수 있으므로 별도 검토 대상입니다.

### `scripts`

`scripts` field는 package에 저장된 script commands를 담습니다. 입문 단계에서는 scripts를 "명령의 메뉴판"으로 읽을 수 있습니다. `"dev"`, `"build"`, `"test"` 같은 key는 terminal에서 `npm run dev`, `npm run build`, `npm test`처럼 실행 흐름과 연결됩니다. 다만 script command 자체는 프로젝트마다 다를 수 있으므로 이름만 보고 실제 동작을 단정하면 안 됩니다.

### `dependencies`

`dependencies` field는 package name과 version range를 mapping합니다. dependency는 외부 package가 필요하다는 선언이며, version range는 어떤 version set을 허용할지 나타냅니다. AI가 새 dependency를 추가했다면 package name, version range, 추가된 field를 함께 봐야 합니다.

### package specifier

npm package spec 문서는 name, version, tag, URL, git URL 같은 specifier 형태를 설명합니다. 즉 package를 가리키는 방법은 하나가 아닙니다. 이 사실은 AI가 생성한 install command나 dependency entry를 읽을 때 중요합니다. "어떤 package를 설치한다"는 말 뒤에는 어떤 specifier로 가리키는지가 숨어 있습니다.

### SemVer core

SemVer 2.0.0의 핵심은 `MAJOR.MINOR.PATCH`입니다. KB 기준으로 MAJOR는 incompatible API changes, MINOR는 backwards-compatible functionality, PATCH는 backwards-compatible bug fixes와 연결됩니다. 이 세 구분은 dependency update를 검토할 때 변경 위험을 분류하는 언어가 됩니다.

### version range와 semver calculator

npm semantic versioning 문서는 version ranges와 semver calculator를 통해 허용되는 update 범위를 확인할 수 있다고 설명합니다. range syntax를 전부 외우는 것보다 먼저 해야 할 일은 range가 존재한다는 사실을 인식하는 것입니다. 숫자 앞의 기호나 tag처럼 보이는 표기가 있으면, 그것이 어떤 version set을 허용하는지 문서와 calculator로 확인해야 합니다.

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

위 예시는 KB에 포함된 package metadata 흐름을 한눈에 보여줍니다. `scripts`는 실행 command 이름을 만들고, `dependencies`는 package name과 version range를 연결합니다. 이 파일을 읽으면 "이 프로젝트는 어떤 command로 빌드하는가", "어떤 package에 의존하는가", "version range가 들어가 있는가"라는 질문에 답할 수 있습니다.

> [!TIP]
> AI가 package 관련 변경을 만들면 `package.json` diff에서 `scripts`와 `dependencies`를 먼저 보세요. 그다음 terminal output과 verify 결과를 연결하면 변경 영향이 훨씬 선명해집니다.

## 원문으로 읽기

> "A package is a folder tree"
>
> — 패키지는 폴더 트리다.
> [Modules: Packages — Node.js](https://nodejs.org/api/packages.html)

이 짧은 문장은 `package.json`을 isolated file로 보지 말라는 신호입니다. Node.js package model에서 package는 folder tree이고, 그 tree를 설명하는 metadata가 `package.json`입니다. 따라서 프로젝트 루트를 이해하려면 파일 하나만 보거나 폴더 목록만 보는 것이 아니라, folder tree와 metadata의 관계를 함께 봐야 합니다.

> "package.json"
>
> — package.json.
> [package.json — npm Docs](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)

npm 문서의 제목 자체가 중요한 이유는 이 파일이 npm package metadata의 중심이라는 사실을 보여주기 때문입니다. `name`, `version`, `description`, `scripts`, `dependencies` 같은 fields는 흩어진 메모가 아니라 npm이 이해하는 metadata 형식입니다. 초보자는 파일 이름을 외우는 데서 멈추지 말고, 이 파일이 프로젝트 실행과 설치 정보를 모으는 약속이라는 점을 읽어야 합니다.

> "scripts"
>
> — scripts.
> [package.json — npm Docs](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)

`scripts`라는 field 이름은 terminal command와 package metadata를 이어 줍니다. `npm run build` 같은 명령은 공중에 떠 있는 명령이 아니라 `package.json` 안의 scripts entry와 연결됩니다. 그래서 AI가 "빌드 명령을 추가했다"고 말하면, 우리는 어떤 script key와 command string이 추가됐는지 확인해야 합니다.

> "MAJOR.MINOR.PATCH"
>
> — MAJOR.MINOR.PATCH.
> [Semantic Versioning 2.0.0](https://semver.org/)

SemVer의 중심 형식은 dependency update를 읽는 가장 짧은 언어입니다. major, minor, patch는 숫자 위치가 아니라 변경의 의미를 전달합니다. 이 문장을 기억하면 `2.0.0`과 `1.2.4`를 같은 종류의 "최신 숫자"로 보지 않게 됩니다.

> "version ranges"
>
> — 버전 범위.
> [About semantic versioning — npm Docs](https://docs.npmjs.com/about-semantic-versioning)

npm dependency는 version 하나만의 문제가 아니라 허용 범위의 문제입니다. version ranges는 어떤 update가 dependency 선언 안에서 허용되는지 판단하게 합니다. AI가 dependency를 추가하거나 upgrade할 때 range를 확인해야 하는 이유가 여기에 있습니다.

> "package spec"
>
> — package spec.
> [npm package spec — npm Docs](https://docs.npmjs.com/cli/v11/using-npm/package-spec)

package spec은 package를 가리키는 표기가 version number 하나로 끝나지 않을 수 있음을 알려줍니다. name, version, tag, URL, git URL 같은 형태가 가능하다는 사실은 install command나 dependency entry를 검토할 때 중요한 안전장치가 됩니다. specifier를 보지 않으면 AI가 어떤 출처 또는 어떤 표기로 package를 지정했는지 놓칠 수 있습니다.

## 실전에서

### 1. 새 프로젝트를 받으면 scripts부터 읽습니다

새 프로젝트 폴더를 열었을 때 곧바로 아무 command나 실행하지 않습니다. 먼저 `package.json`을 열고 `scripts`를 찾습니다. `dev`, `build`, `test` 같은 이름이 있는지 확인하고, 실제 command string이 무엇인지 읽습니다. 이 과정은 terminal-shell-commands에서 배운 current directory와 연결됩니다. package root가 아닌 다른 folder에서 command를 실행하면 기대와 다른 결과가 나올 수 있습니다.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "vitest run"
  }
}
```

이 예시에서 `npm run build`는 `"next build"`와 연결됩니다. "빌드가 실패했다"는 질문을 AI에게 할 때는 command, current directory, output만 말하는 것보다 `package.json`의 relevant script도 함께 제공하면 분석이 좋아집니다. AI는 어느 script가 어떤 underlying command를 실행했는지 알아야 원인을 좁힐 수 있습니다.

### 2. AI가 dependency를 추가하면 field와 range를 확인합니다

AI가 새 package를 추가했다면 먼저 `dependencies` 또는 devDependencies 중 어디가 바뀌었는지 봅니다. KB는 dependency 영향 확인에서 새 package가 dependencies 또는 devDependencies 중 어디에 들어가는지 확인하라고 말합니다. 그다음 package name과 version range를 함께 봅니다. package name만 맞아도 version range가 의도와 다를 수 있습니다.

```json
{
  "dependencies": {
    "next": "^15.0.0"
  }
}
```

이 예시는 name과 range가 함께 있는 구조를 보여줍니다. 여기서 `next`만 보는 것은 절반만 보는 것입니다. range가 어떤 update를 허용하는지 npm semantic versioning 문서와 semver calculator로 확인할 수 있습니다. 검토 결과는 "이 package를 추가했다"가 아니라 "이 field에 이 package name과 이 version range가 추가됐다"로 기록해야 합니다.

### 3. SemVer로 update risk를 먼저 분류합니다

dependency upgrade를 볼 때 major, minor, patch를 먼저 분류합니다. SemVer spec은 major를 incompatible API changes, minor를 backwards-compatible functionality, patch를 backwards-compatible bug fixes와 연결합니다. 이 기준은 테스트를 대체하지 않지만, 검토 순서를 정하는 데 도움이 됩니다. major update라면 breaking change 가능성을 먼저 보고, minor와 patch도 실제 변경 내용과 테스트로 확인합니다.

AI에게 요청할 때도 이 구조를 사용할 수 있습니다. "dependency를 최신으로 올려줘"보다 "어떤 dependency가 major/minor/patch 중 무엇으로 바뀌는지 표로 정리하고, package.json diff와 verify 결과를 함께 제시해줘"가 더 안전합니다. 이 요청은 AI가 단순 설치자가 아니라 변경 위험 설명자로 행동하게 만듭니다.

### 4. package specifier를 확인합니다

npm package spec 문서는 name, version, tag, URL, git URL 같은 specifier를 설명합니다. AI가 설치 명령을 제안하면 package name과 version만 보지 말고 specifier 형태를 확인합니다. tag, URL, git URL이 등장하면 왜 그 형태가 필요한지 설명을 요구해야 합니다. 이 강의는 package spec 세부 문법을 다루지 않지만, specifier가 여러 형태를 가질 수 있다는 사실만으로도 검토 수준이 올라갑니다.

> [!EXAMPLE]
> AI에게 "패키지를 추가해줘"라고만 요청하지 말고, "수정한 `package.json` field, package specifier, version range, SemVer risk, 실행한 verify 결과를 함께 보고해줘"라고 요청하면 검토 가능한 답변을 받을 가능성이 높아집니다.

## 한계와 트레이드오프

첫째, `package.json`은 모든 설치 상태를 설명하지 않습니다. 이 KB는 lockfile을 dependency tree 고정과 재현 설치 문제로 후속 주제에 남깁니다. 따라서 이 강의에서 package-lock이나 lockfile 세부를 억지로 확장하지 않습니다. 지금 단계의 목표는 package metadata, scripts, dependencies, SemVer와 version range를 읽는 것입니다.

둘째, SemVer는 위험을 없애는 보증서가 아닙니다. SemVer spec은 major, minor, patch 증가 조건을 정의하지만, 실제 안전성은 package의 변경 내용과 테스트로 확인해야 합니다. npm semantic versioning 문서의 version ranges도 허용 범위를 설명할 뿐, 그 범위 안의 모든 update가 내 프로젝트에서 안전하다고 보장하지는 않습니다. ==SemVer는 검토 우선순위를 주지만 테스트를 대체하지 않습니다.==

셋째, scripts는 이름만으로 동작을 알 수 없습니다. `"build"`라는 script가 항상 같은 일을 하는 것은 아닙니다. npm package.json docs는 scripts field가 script commands를 담는다고 설명하지만, command string은 프로젝트마다 다릅니다. 그러므로 AI에게 "build script를 실행했다"고 보고받으면 실제 script command와 output을 함께 확인해야 합니다.

넷째, package specifier는 단순 version보다 넓습니다. npm package spec 문서는 name, version, tag, URL, git URL 등 다양한 specifier를 다룹니다. 이 다양성은 유연하지만 검토 부담을 만듭니다. 특히 AI가 URL이나 git URL 형태를 제안하면 package 출처와 의도를 더 분명히 확인해야 합니다.

마지막으로, `package.json`을 잘 읽는다고 dependency conflict나 install error를 모두 해결할 수 있는 것은 아닙니다. KB는 npm debugging playbook을 후속 개념으로 둡니다. 이번 강의는 "어디를 먼저 봐야 하는가"의 기준을 세우는 단계입니다. 설치 오류와 lockfile, dependency tree 분석은 다음 학습 흐름에서 더 구체적으로 다룰 수 있습니다.

## 더 읽기

먼저 Node.js의 [Modules: Packages](https://nodejs.org/api/packages.html)를 읽어 package가 folder tree와 `package.json` metadata를 통해 설명된다는 관점을 잡습니다. 다음으로 npm의 [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) 문서에서 `name`, `version`, `scripts`, `dependencies` fields를 읽습니다. 이 두 문서를 연결하면 package folder tree와 npm metadata를 함께 이해할 수 있습니다.

그다음 [Semantic Versioning 2.0.0](https://semver.org/)을 읽어 `MAJOR.MINOR.PATCH`가 어떤 변경 의미를 전달하는지 확인합니다. 이어서 npm의 [About semantic versioning](https://docs.npmjs.com/about-semantic-versioning)을 읽으면 dependency version ranges와 semver calculator를 확인하는 흐름으로 넘어갈 수 있습니다. 마지막으로 [npm package spec](https://docs.npmjs.com/cli/v11/using-npm/package-spec)을 읽어 package를 가리키는 specifier가 name, version, tag, URL, git URL 등 여러 형태를 가질 수 있음을 확인합니다.

다음 학습 순서는 `npm-scripts-reference`가 적절합니다. 이번 강의가 `package.json`의 scripts field를 읽는 법을 다뤘다면, 다음에는 `npm run dev`, `npm run build`, `npm test` 같은 command를 더 체계적으로 볼 수 있습니다. 이후 `npm-debugging-playbook`으로 넘어가면 dependency version range, install spec, script command를 바탕으로 npm 설치와 빌드 오류를 해석하는 흐름을 만들 수 있습니다.
