## 한 줄 정의

npm scripts는 `package.json`의 `"scripts"` 필드에 **이름-명령 쌍**으로 정의해 `npm run <이름>`으로 실행하는 프로젝트 명령입니다. npm 문서는 이 필드가 ==내장 스크립트와 사전 설정된 생명주기 이벤트, 그리고 임의 스크립트를 지원==한다고 설명합니다.

핵심 효과는 **표준화**입니다. `npx firebase-tools deploy --only hosting --project ju0o-ec967` 같은 긴 명령을 `deploy`라는 짧은 이름 뒤에 감추면, 팀 전체(그리고 미래의 나, 그리고 AI)가 같은 이름으로 같은 작업을 합니다. "이 프로젝트는 어떻게 빌드하나?"의 답이 언제나 `scripts` 필드에 있습니다.

> [!KEY]
> npm scripts의 숨은 힘은 **pre/post 규칙**입니다. `npm run build`를 실행하면, 이름이 일치하는 `prebuild`와 `postbuild`가 있으면 ==앞뒤로 자동 실행==됩니다. 이 규칙을 알면 "빌드 전 정리 → 빌드 → 빌드 후 검증"을 하나의 명령으로 엮을 수 있고, 모르면 "왜 이게 자동으로 돌지?"에 당황하게 됩니다.

![npm scripts: 이름-명령 매핑과 pre/post 자동 실행 순서](/lesson-diagrams/npm-scripts-reference/npm-scripts-lifecycle.svg)

## 왜 존재하는가

프로젝트의 명령을 각자 외워서 실행하면 세 가지 문제가 생깁니다.

첫째, **긴 명령의 반복.** 빌드·테스트·배포 명령은 옵션이 붙어 길고 외우기 어렵습니다. 매번 타이핑하면 실수가 나고, 사람마다 조금씩 다르게 실행합니다. scripts에 등록하면 짧은 이름 하나로 통일되어, 옵션 하나 빠뜨리는 실수도 사라집니다.

둘째, **실행 방법의 실종.** 낯선 프로젝트를 받았을 때 "이걸 어떻게 실행하지?"의 답이 흩어져 있으면 시작조차 어렵습니다. `scripts` 필드는 그 자체로 "이 프로젝트를 다루는 법"의 문서가 됩니다 — 읽으면 무엇을 할 수 있는지 보입니다. 별도의 README를 뒤지지 않아도, `package.json` 한 파일이 "이 프로젝트에서 할 수 있는 작업 목록"을 제공하는 셈입니다.

셋째, **앞뒤 작업의 누락.** "빌드 전에 이전 산출물을 지우고, 배포 전에 검증을 돌려야 한다" 같은 규칙은 사람이 매번 기억해야 하면 빠집니다. 급하거나 피곤할 때 가장 먼저 건너뛰는 것이 이런 앞뒤 작업입니다. pre/post 규칙이 이 앞뒤 작업을 명령에 묶어 자동화하면, 기억에 의존하지 않고도 순서가 지켜집니다.

## 작동 원리

명령어 인덱스: [npm run](#npm-run) · [pre/post 규칙](#pre-post-규칙) · [생명주기 스크립트](#생명주기-스크립트)

### `npm run`

정의한 스크립트는 `npm run <이름>`으로 실행합니다. npm 문서는 이것이 `npm run-script <이름>`의 짧은 형태라고 명시합니다 — 둘은 같습니다. `package.json`에 이렇게 정의하면:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "verify": "biome check && tsc --noEmit && vitest run && next build"
  }
}
```

`npm run dev`, `npm run build`, `npm run verify`로 각각 실행됩니다. ==긴 명령이 짧은 이름 뒤에 숨어==, 실행하는 사람은 세부를 몰라도 됩니다.

### pre/post 규칙

npm 문서의 표현으로, ==이름이 일치하는 pre·post 명령도 함께 실행==됩니다(예: `premyscript`, `myscript`, `postmyscript`). `npm run myscript` 한 번이 세 단계를 순서대로 태웁니다:

```
npm run build
  ├─ prebuild   (있으면 먼저)
  ├─ build
  └─ postbuild  (있으면 나중)
```

이 규칙으로 "빌드 전 정리(prebuild)", "빌드 후 검증(postbuild)"을 명령에 엮습니다. 단, 자동으로 돈다는 것을 모르면 예상 못 한 작업이 실행돼 당황할 수 있으므로, pre/post는 의도적으로 씁니다.

> [!EXAMPLE]
> 배포 전 검증을 강제하고 싶다면 `predeploy`에 검증 스크립트를 겁니다. `"predeploy": "npm run verify"`, `"deploy": "firebase deploy ..."`로 정의하면, 누군가 `npm run deploy`를 실행할 때 npm이 먼저 `predeploy`(검증)를 돌리고, 통과해야만 `deploy`(실제 배포)로 넘어갑니다. "검증 없이 배포"가 사람의 기억이 아니라 규칙으로 막히는 것입니다 — 급해서 검증을 건너뛰고 싶어도 구조가 허락하지 않습니다.

### 생명주기 스크립트

일부 이름(예: `prepare`)은 특별합니다. 이런 **생명주기 스크립트**는 npm이 정해진 시점(설치·배포 등)에 자동으로 호출합니다. 임의 스크립트와 달리 호출 시점이 npm에 의해 정해져 있으므로, 이 이름들은 정해진 의미대로만 써야 합니다.

### 의존성의 스크립트

설치한 패키지 안의 스크립트를 실행할 때도 있습니다. npm 문서는 이를 `npm explore <pkg> -- npm run <stage>`로 실행한다고 안내합니다.

## 스펙과 세부

### 명령 요약

| 명령 | 의미 |
|---|---|
| `npm run <이름>` | scripts에 정의한 스크립트 실행 |
| `npm run-script <이름>` | 위와 동일(긴 형태) |
| `npm run` | (인자 없이) 정의된 스크립트 목록 표시 |
| `npm explore <pkg> -- npm run <이름>` | 의존성 패키지의 스크립트 실행 |

### 스크립트 종류

| 종류 | 설명 | 실행 시점 |
|---|---|---|
| 임의 스크립트 | 원하는 이름으로 정의 | `npm run`으로 수동 |
| pre/post | 이름 앞뒤에 붙는 훅 | 대상 스크립트 실행 시 자동 |
| 생명주기(prepare 등) | 예약된 이름 | npm이 정한 시점에 자동 |

### pre/post 실행 순서

| 실행 | 순서 |
|---|---|
| `npm run deploy` | predeploy → deploy → postdeploy |
| 실패 처리 | 앞 단계 실패 시 뒤 단계는 실행 안 됨 |

### 상황별 빠른 참조

| 하고 싶은 것 | 처방 |
|---|---|
| 긴 명령을 짧게 | scripts에 이름으로 등록 후 `npm run <이름>` |
| 낯선 프로젝트 실행법 파악 | `package.json`의 scripts 필드 읽기 |
| 빌드 전 자동 정리 | `prebuild` 스크립트 정의 |
| 여러 검사를 한 번에 | `verify` 같은 스크립트로 묶기 |
| 정의된 스크립트 목록 보기 | 인자 없이 `npm run` |

## 원문으로 읽기

> "The \"scripts\" property of your package.json file supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts."
>
> — package.json 파일의 "scripts" 속성은 여러 내장 스크립트와 그 사전 설정된 생명주기 이벤트, 그리고 임의 스크립트를 지원한다.
> [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)

이 한 문장이 scripts의 범위를 정합니다 — 세 종류가 공존합니다. **내장/생명주기 스크립트**(prepare 등, npm이 자동 호출)와 **임의 스크립트**(내가 이름 붙여 수동 실행). 대부분의 프로젝트 scripts는 이 임의 스크립트(dev, build, test)이고, 생명주기 스크립트는 특수 목적에 씁니다.

> "Pre and post commands with matching names will be run for those as well (e.g. premyscript, myscript, postmyscript)."
>
> — 이름이 일치하는 pre·post 명령도 함께 실행된다(예: premyscript, myscript, postmyscript).
> [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)

pre/post 규칙의 핵심 문장입니다. "will be run for those as well" — 대상 스크립트를 실행하면 앞뒤 훅도 ==자동으로 함께== 돕니다. 이것이 npm scripts를 단순 별칭(alias)을 넘어 작은 파이프라인으로 만듭니다. `predeploy`에 검증을 넣으면, `npm run deploy`가 언제나 검증을 먼저 거칩니다.

> "These all can be executed by running npm run-script <stage> or npm run <stage> for short."
>
> — 이 모두는 npm run-script <stage> 또는 짧게 npm run <stage>를 실행해 수행할 수 있다.
> [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)

`npm run`이 `npm run-script`의 짧은 형태임을 밝힙니다. 실무에서는 거의 언제나 짧은 `npm run`을 쓰며, 둘의 동작은 동일합니다. 이 통일된 진입점 덕분에 어떤 프로젝트든 "`npm run <무언가>`"라는 같은 방식으로 다룰 수 있습니다. 프로젝트마다 실행 방법을 매번 새로 배울 필요가 없다는 것이 이 표준화의 큰 이득입니다.

> "Scripts from dependencies can be run with npm explore <pkg> -- npm run <stage>."
>
> — 의존성의 스크립트는 npm explore <pkg> -- npm run <stage>로 실행할 수 있다.
> [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)

내 프로젝트의 scripts뿐 아니라 설치한 패키지 안의 스크립트도 실행할 수 있음을 보여줍니다. 자주 쓰이진 않지만, 특정 의존성이 제공하는 도구 스크립트를 직접 호출해야 할 때의 정공법입니다.

## 실전에서

### 낯선 프로젝트는 scripts부터

새 프로젝트를 받으면 코드보다 먼저 `package.json`의 `scripts`를 읽으세요. `dev`가 있으면 개발 서버 실행법을, `build`가 있으면 빌드법을, `test`가 있으면 테스트법을 즉시 알 수 있습니다. ==scripts는 그 프로젝트의 목차==입니다 — AI에게 "이거 어떻게 실행해?"를 물어도 결국 이 필드를 근거로 답합니다. 관례적인 이름(`dev`, `build`, `test`, `start`, `lint`)이 대부분의 프로젝트에서 반복되므로, 몇 개 프로젝트만 봐도 낯선 프로젝트의 scripts를 금세 읽어낼 수 있게 됩니다.

### 검증을 한 스크립트로 묶기

이 사이트는 `npm run verify` 하나로 lint·타입 검사·테스트·빌드를 순서대로 돌립니다. 여러 검사를 한 이름에 묶으면 "배포 전 이걸 다 통과해야 한다"가 명령 하나로 강제됩니다. 매번 네 개 명령을 따로 기억해 실행하는 것보다 실수가 적고, =="검증"의 정의가 코드로 남아== 팀이 공유합니다.

### pre/post로 안전장치 걸기

`predeploy`에 검증을 넣으면 `npm run deploy`가 언제나 검증을 먼저 거칩니다. 앞 단계가 실패하면 뒤 단계(실제 배포)는 실행되지 않으므로, "검증 없이 배포"라는 실수가 구조적으로 막힙니다. 사람의 기억이 아니라 규칙이 순서를 지키게 하는 것입니다. 이 프로젝트의 앞선 강의들이 반복한 "동작하는 코드와 안전한 코드는 다르다"는 원칙이, 여기서는 "배포 명령에 검증을 엮는다"는 구체적 실천으로 나타납니다.

### AI에게 명령을 표준화시키기

AI 에이전트가 프로젝트를 다룰 때도 scripts가 접점입니다. "빌드해줘"라고 하면 AI는 `npm run build`를 실행하고, "검증해줘"라고 하면 `npm run verify`를 찾습니다. 명령을 scripts에 표준화해두면, 사람이 지시하는 방식과 AI가 실행하는 방식이 하나로 통일됩니다 — scripts는 사람·AI 공통의 명령 인터페이스입니다. 반대로 scripts가 없으면 AI가 매번 긴 명령을 추측해 조립해야 하고, 그 과정에서 옵션을 틀릴 수 있습니다.

> [!TIP]
> AI가 만든 `package.json`을 받으면 ==pre/post 훅과 생명주기 스크립트를 먼저 확인==하세요. `prepublish`나 `prepare` 같은 스크립트는 설치·배포 시 자동으로 실행되므로, 의도치 않은 명령이 그 안에 있으면 예상 못 한 시점에 돕니다. "무엇이 자동으로 실행되는가"를 아는 것이 스크립트 검토의 핵심입니다.

## 한계와 트레이드오프

**scripts는 복잡한 로직에는 부적합합니다.** 한 줄 명령이나 몇 개를 이어붙이는 정도는 좋지만, 조건 분기·반복 같은 로직이 필요해지면 셸 문법에 억지로 밀어 넣게 되어 읽기 어려워집니다. 그 지점에서는 별도의 스크립트 파일(Node.js 스크립트 등)로 빼내 `npm run`이 그 파일을 호출하게 하는 것이 낫습니다. scripts는 "명령의 진입점"이지 "로직을 담는 곳"이 아니라는 경계를 지키면, package.json이 읽기 쉬운 목차로 남습니다.

**pre/post의 자동 실행은 양날입니다.** 편리하지만 "왜 이게 도는지" 모르면 디버깅이 어렵습니다. `npm run build`가 예상보다 오래 걸리거나 엉뚱한 작업을 한다면, `prebuild`·`postbuild`가 숨어 있는지 먼저 의심해야 합니다. 자동화는 명시적일 때만 이롭습니다.

**OS 차이가 스며들 수 있습니다.** scripts의 명령은 셸에서 실행되므로, Windows와 Unix 계열의 셸 문법 차이(경로 구분자, 환경변수 표기)가 스크립트에 새어들 수 있습니다. 예컨대 환경변수를 설정하는 `VAR=value cmd` 문법은 Unix에서는 되지만 Windows에서는 다르게 써야 합니다. 크로스 플랫폼 프로젝트라면 이 차이를 흡수하는 도구를 쓰거나, OS 의존적 명령을 Node.js 스크립트로 감싸는 것이 안전합니다.

> [!WARNING]
> `scripts` 안의 명령은 그대로 셸에서 실행됩니다. 그래서 신뢰할 수 없는 프로젝트의 `npm install`은 위험할 수 있습니다 — 생명주기 스크립트(`prepare`, `postinstall` 등)가 설치만으로 자동 실행되기 때문입니다. 낯선 저장소를 받으면 설치 전에 `package.json`의 스크립트를, 특히 install 계열 훅을 먼저 살피는 습관이 안전합니다.

## 더 읽기

- [npm Docs: scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts) — scripts 필드, npm run, pre/post 규칙, 생명주기·의존성 스크립트

이전 순서: [package.json과 Semantic Versioning](/lessons/package-json-and-semver) — scripts가 사는 package.json의 구조. 관련: [빌드 타임과 런타임](/lessons/build-and-runtime) — `npm run build`가 실행하는 빌드 단계. scripts는 그 빌드·배포 명령을 팀의 표준 진입점으로 만듭니다. deployment-ops 모듈에서 이후 다룰 배포 CLI 명령들도 대부분 scripts로 감싸 `npm run deploy` 한 줄로 통일되므로, 이 강의의 표준화 습관이 배포 실무의 토대가 됩니다.
