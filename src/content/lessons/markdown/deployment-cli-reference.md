## 한 줄 정의

배포 CLI는 **배포 플랫폼을 터미널에서 조작하는 명령줄 도구**입니다. Vercel CLI는 ==터미널이나 자동화 시스템으로 Vercel 플랫폼과 상호작용==한다고 소개합니다. 웹 대시보드 버튼으로 하던 배포·롤백·조회를 명령으로 옮겨, 사람뿐 아니라 스크립트·CI/CD·AI 에이전트가 실행할 수 있게 합니다.

이 사이트도 배포 CLI로 배포됩니다 — `npx firebase-tools deploy --only hosting --project ju0o-ec967`. 플랫폼(Vercel·Firebase)은 달라도 "터미널에서 배포한다"는 개념은 같으므로, 한 CLI를 익히면 다른 CLI도 같은 틀로 빠르게 읽힙니다.

> [!KEY]
> 배포 CLI의 가장 중요한 실무 지점은 **인증 토큰**입니다. Vercel 문서는 ==CI/CD에서 토큰을 명령 인자가 아니라 환경변수(VERCEL_TOKEN)로 주입==하길 권합니다 — 인자로 넘기면 프로세스 목록과 로그에 노출될 수 있기 때문입니다. 앞 강의(환경변수·secret)의 원칙이 배포 명령에서 그대로 적용됩니다.

![배포 CLI: 배포·롤백·조회·인증 명령과 CI 토큰 환경변수 주입](/lesson-diagrams/deployment-cli-reference/deploy-cli-map.svg)

## 왜 존재하는가

배포를 웹 대시보드로만 하면 세 가지가 불편합니다.

첫째, **왕복 비용.** 코드는 터미널에서 다루는데 배포하려고 브라우저로 가서 버튼을 누르고 돌아오는 것은 흐름을 끊습니다. 하루에 여러 번 배포하는 프로젝트라면 이 왕복이 쌓여 상당한 방해가 됩니다. CLI는 `vercel deploy` 한 줄로 자리에서 배포합니다.

둘째, **자동화 불가.** 대시보드 버튼은 사람이 눌러야 하지만, CLI 명령은 스크립트·CI/CD·AI가 실행할 수 있습니다. ci-cd 강의의 워크플로 스텝이 실제로 실행하는 것이 이 배포 CLI 명령이고, npm-scripts 강의처럼 `npm run deploy`로 감싸 팀이 통일해 씁니다.

셋째, **긴급 대응 속도.** 사고가 났을 때 대시보드를 열어 로그인하고 프로젝트를 찾아 클릭을 헤매기보다, `vercel rollback` 한 줄이 빠릅니다. 사고 상황에서는 1초가 아깝고, 손에 익은 명령 한 줄이 마우스 클릭 여러 번보다 확실합니다. monitoring 강의의 "복구 우선"을 명령으로 즉시 실행하는 것입니다.

## 작동 원리

명령어 인덱스: [배포](#deploy) · [롤백·승격](#rollback-promote) · [조회](#조회) · [인증](#인증)

### 배포 — `vercel deploy` {#deploy}

Vercel의 기본 명령은 배포입니다 — ==인자 없이 `vercel`만 쳐도 배포==됩니다. 문서의 표현으로 "Deploy your Vercel projects. Default command when no subcommand is specified"(하위 명령이 없으면 기본 명령). `--prod`를 붙이면 프로덕션 배포입니다.

이 사이트의 Firebase 대응은 `firebase deploy --only hosting`입니다. `--only hosting`으로 호스팅만 배포하고, `--project`로 대상 프로젝트를 지정합니다. 옵션이 "무엇을, 어디에" 배포할지를 정하는 셈입니다.

### 롤백·승격 — `vercel rollback` / `vercel promote` {#rollback-promote}

사고 대응의 명령들입니다. `vercel rollback`은 "Roll back production deployments to previous deployments"(프로덕션을 이전 배포로 되돌림), `vercel promote`는 "Promote an existing deployment to be the current deployment"(특정 배포를 현재로 승격). ==롤백으로 복구하고, promote로 정상 배포로 되돌아갑니다== — monitoring 강의의 롤백·승격을 터미널에서 수행합니다.

### 조회 — `list` / `logs`

무슨 일이 일어났는지 보는 명령입니다. `vercel list`는 "List recent deployments"(최근 배포 목록), `vercel logs`는 "List runtime logs for a specific deployment"(특정 배포의 런타임 로그). 모니터링의 근거를 터미널에서 확인합니다.

### 인증

`vercel login`("Login to your Vercel account through CLI")으로 로그인합니다. 하지만 CI/CD에서는 사람이 입력할 수 없으므로, ==토큰을 `VERCEL_TOKEN` 환경변수로 주입==합니다. 문서가 이 방식을 권하는 이유는 명확합니다 — 토큰을 명령 인자로 넘기면 프로세스 목록·로그에 노출되기 때문입니다.

> [!EXAMPLE]
> 이 사이트의 실제 배포 명령은 `npx firebase-tools deploy --only hosting --project ju0o-ec967`입니다. 이것을 CI로 자동화한다면, 워크플로 스텝에서 이 명령을 실행하되 Firebase 인증 토큰은 명령에 직접 쓰지 않고 CI의 secret으로 주입합니다. 그러면 워크플로 로그에는 "deploy 실행"만 남고 토큰은 노출되지 않습니다 — 같은 배포 명령이라도 "누가 어떻게 인증하는가"가 안전을 가릅니다.

## 스펙과 세부

### Vercel CLI 주요 명령

| 명령 | 의미 |
|---|---|
| `vercel` / `vercel deploy` | 배포(기본 명령) |
| `vercel deploy --prod` | 프로덕션 배포 |
| `vercel rollback [id]` | 이전 배포로 롤백 |
| `vercel promote [id]` | 특정 배포를 현재로 승격 |
| `vercel list` | 최근 배포 목록 |
| `vercel logs [url]` | 배포의 런타임 로그 |
| `vercel login` | 로그인 |

### Firebase CLI 대응 (이 사이트)

| 명령 | 의미 |
|---|---|
| `firebase login` | 로그인 |
| `firebase deploy --only hosting --project <id>` | 호스팅 배포 |
| `firebase hosting:rollback` | 이전 릴리스로 롤백 |

### CI/CD 인증

| 방식 | 안전성 |
|---|---|
| `VERCEL_TOKEN` 환경변수 | 권장 — 인자 노출 없음 |
| `--token` 인자 | 비권장 — 프로세스·로그 노출 위험 |

### 상황별 빠른 참조

| 하고 싶은 것 | 명령 |
|---|---|
| 프로덕션 배포 | `vercel deploy --prod` / `firebase deploy --only hosting` |
| 사고 시 복구 | `vercel rollback` |
| 롤백 해제 | `vercel promote [id]` |
| 배포 이력 확인 | `vercel list` |
| CI에서 인증 | `VERCEL_TOKEN` 환경변수 |
| 배포 명령 표준화 | `npm run deploy`로 감싸기 |

## 원문으로 읽기

> "With the command-line interface (CLI) you can interact with the Vercel platform using a terminal, or through an automated system, enabling you to retrieve logs, manage certificates, replicate your deployment environment locally, manage Domain Name System (DNS) records, and more."
>
> — CLI로 터미널이나 자동화 시스템을 통해 Vercel 플랫폼과 상호작용할 수 있으며, 로그 조회·인증서 관리·배포 환경 로컬 복제·DNS 레코드 관리 등이 가능하다.
> [Vercel CLI Overview](https://vercel.com/docs/cli)

"using a terminal, or through an automated system" — 이 구절이 CLI의 두 얼굴입니다. 사람이 터미널에서 직접 치기도 하고, 자동화 시스템(CI/CD)이 대신 실행하기도 합니다. 같은 명령이 두 맥락에서 쓰이므로, CLI를 배우면 수동 배포와 자동 배포를 하나의 도구로 다루게 됩니다.

> "Deploy your Vercel projects. Default command when no subcommand is specified."
>
> — Vercel 프로젝트를 배포한다. 하위 명령이 지정되지 않으면 기본 명령이다.
> [Vercel CLI Overview](https://vercel.com/docs/cli)

배포가 "기본 명령"이라는 점이 흥미롭습니다 — `vercel`만 쳐도 배포됩니다. 가장 자주 하는 동작을 기본값으로 둔 설계입니다. 다만 이 편의는 주의도 요합니다: 무심코 `vercel --prod`를 치면 검증 없이 프로덕션에 배포될 수 있으므로, 프로덕션 플래그는 의식적으로 다뤄야 합니다.

> "Roll back production deployments to previous deployments."
>
> — 프로덕션 배포를 이전 배포로 되돌린다.
> [Vercel CLI Overview](https://vercel.com/docs/cli)

`vercel rollback`의 정의가 monitoring 강의와 정확히 이어집니다. 그 강의에서 "복구가 원인 분석보다 먼저"라고 배운 그 복구를, 이 명령 한 줄이 수행합니다. 사고 시 대시보드를 헤매지 않고 터미널에서 즉시 되돌릴 수 있다는 것이 CLI의 큰 가치입니다.

> "Using the VERCEL_TOKEN environment variable is recommended for CI/CD because it avoids exposing the token in command-line arguments, which can be visible in process lists and logs."
>
> — CI/CD에서는 VERCEL_TOKEN 환경변수 사용이 권장된다. 토큰이 명령 인자로 노출되는 것을 피하기 때문인데, 인자는 프로세스 목록과 로그에서 보일 수 있다.
> [Vercel CLI Overview](https://vercel.com/docs/cli)

이 문장이 배포 자동화의 핵심 보안 원칙입니다. "visible in process lists and logs"(프로세스 목록·로그에 노출) — 토큰을 인자로 넘기면 여러 곳에 흔적이 남습니다. 앞 강의(환경변수·로그)에서 배운 "secret은 로그에 남기지 않는다"가 배포 명령에서 구체화된 것입니다. ==인증 정보는 인자가 아니라 환경변수로==.

## 실전에서

### 배포 명령을 스크립트로 감싸기

배포 CLI 명령은 옵션이 붙어 길어지기 쉽습니다(`firebase deploy --only hosting --project ju0o-ec967`). 이를 `npm run deploy` 스크립트로 감싸면, 팀 누구나 같은 짧은 명령으로 같은 배포를 합니다 — npm-scripts 강의의 표준화가 배포에 적용되는 지점입니다. 긴 명령을 매번 손으로 치다 `--project`나 `--only hosting` 같은 옵션 하나를 빠뜨려 엉뚱한 곳에 배포하는 실수도 사라집니다.

### AI의 배포 명령에서 토큰 확인

AI 에이전트가 배포를 자동화하는 코드를 만들 때, 가장 위험한 것이 토큰 처리입니다. AI가 편의를 위해 토큰을 `--token abc123`처럼 인자로 넣으면, 그 토큰이 CI 로그에 그대로 남습니다. ==AI가 만든 배포 스크립트에서 토큰이 환경변수로 주입되는지==를 사람이 확인해야 합니다 — 이것이 배포 자동화 검토의 1순위입니다.

### 롤백을 미리 연습하기

`vercel rollback`이나 `firebase hosting:rollback`을 사고가 난 뒤 처음 찾으면 늦습니다. 평온할 때 한 번 실행해 보고 동작을 익혀두면, 실제 사고에서 손이 떨리지 않습니다. monitoring 강의의 "대응 계획은 평온할 때 세워둔다"가 배포 CLI에서도 그대로입니다. 명령 이름과 옵션을 미리 알아두는 몇 분이, 사고 상황의 몇 분을 아낍니다 — 그 몇 분 동안 사용자는 정상 사이트를 봅니다.

### 조회 명령으로 상태 파악

배포가 잘 됐는지, 무엇이 최근에 나갔는지는 `vercel list`로 확인합니다. 문제가 의심되면 `vercel logs`로 특정 배포의 런타임 로그를 봅니다 — monitoring 강의의 "로그로 관찰"을 터미널에서 즉시 하는 것입니다. 배포·롤백 같은 "행동" 명령뿐 아니라 이런 "조회" 명령을 익혀두면, 상황 파악과 대응을 한 도구 안에서 끝낼 수 있습니다.

> [!TIP]
> `vercel`처럼 인자 없는 기본 명령이 배포를 실행한다는 점을 기억하되, ==프로덕션 배포(`--prod`)는 항상 의식적으로== 하세요. "그냥 확인만 하려던" 명령이 프로덕션을 덮어쓰지 않도록, 미리보기 배포와 프로덕션 배포를 습관적으로 구분하는 것이 안전합니다.

## 한계와 트레이드오프

**CLI는 플랫폼마다 다릅니다.** `vercel`과 `firebase`는 명령 이름·옵션이 다르고, 다른 플랫폼은 또 다릅니다. 여기서 배우는 것은 특정 명령 암기가 아니라 "배포·롤백·조회·인증"이라는 공통 동작의 패턴이며, 그 패턴은 플랫폼이 달라도 이전됩니다. 새 플랫폼을 만나면 "이 넷을 무슨 명령으로 하나"를 찾으면 되고, 대부분의 배포 CLI 문서가 이 네 동작을 중심으로 구성되어 있어 금세 찾을 수 있습니다.

**명령의 즉시성이 실수를 키웁니다.** 대시보드는 배포 전 확인 화면을 보여주지만, CLI는 엔터를 누른 즉시 실행합니다. 특히 `--prod`·`rollback` 같은 되돌리기 어려운 명령은, 실행 전에 대상과 옵션을 한 번 더 확인하는 습관이 필요합니다. 자동화에서는 이 확인을 사람이 못 하므로, 워크플로에 검증 게이트를 두는 것으로 대신합니다.

**이 강의는 Vercel 명령 중심입니다.** Firebase CLI의 전체 명령 체계, 다른 플랫폼(Netlify·Cloudflare 등)의 CLI는 여기서 다루지 않았습니다. 하지만 공통 동작(배포·롤백·조회·인증)과 토큰 보안 원칙을 잡으면, 어떤 배포 CLI를 만나도 그 문서를 같은 틀로 빠르게 읽을 수 있습니다.

> [!WARNING]
> 배포 토큰은 프로덕션을 배포·롤백할 수 있는 강력한 자격 증명입니다. 이 토큰이 유출되면 남이 여러분의 사이트를 마음대로 배포·훼손할 수 있습니다. 그래서 토큰은 명령 인자·코드·로그 어디에도 평문으로 남기지 말고, CI의 secret 저장소나 환경변수로만 다뤄야 합니다 — 배포 CLI의 편의는 이 보안 규율 위에서만 안전합니다. 강력한 도구일수록 그 자격 증명을 지키는 일이 더 중요해집니다.

### 설명 연습: CLI를 플랫폼의 리모컨으로 말하기

배포 CLI는 마법 명령이 아니라 플랫폼 API를 터미널에서 다루는 리모컨입니다. login은 누가 조작하는지 증명하고, deploy는 현재 산출물을 새 배포로 만들며, list와 logs는 무엇이 올라가 있고 어떤 일이 벌어지는지 확인합니다. rollback과 promote는 이미 존재하는 배포 중 어느 것을 사용자에게 연결할지 바꾸는 운영 명령입니다. 이렇게 말하면 CLI 명령 하나하나가 플랫폼 상태를 바꾸는 동작으로 보입니다.

실무에서는 같은 CLI라도 로컬과 CI에서 의미가 달라집니다. 로컬에서는 사람이 직접 로그인하고 결과를 눈으로 확인하지만, CI에서는 토큰과 환경변수가 대신 인증하고 로그가 유일한 증거가 됩니다. 따라서 배포 CLI를 npm scripts로 감쌀 때는 명령 이름, 대상 환경, dry-run 가능성, 실패 시 rollback 경로를 함께 정해야 합니다. AI에게 배포 명령을 맡길 때도 "어떤 프로젝트, 어떤 환경, 어떤 토큰, 어떤 확인 절차"를 명확히 남겨야 안전합니다.

또한 CLI 출력은 배포 완료의 전부가 아닙니다. 고유 URL이 생겼는지, production alias가 바뀌었는지, 빌드 로그에 경고가 있었는지, 접근 보호와 noindex 정책이 유지되는지를 함께 봐야 합니다. CLI는 빠르게 움직이게 해 주지만, 빠른 만큼 결과 확인을 소홀히 하면 잘못된 배포도 빠르게 퍼집니다.

### 스스로 점검할 질문

배포 CLI를 실행하기 전에는 네 가지를 입으로 확인해 보세요. 첫째, 어느 프로젝트와 어느 계정에 연결되어 있는가. 둘째, 지금 명령이 preview를 만드는가 production을 바꾸는가. 셋째, 인증 토큰과 환경변수가 로그에 남지 않는가. 넷째, 실패하거나 잘못 배포했을 때 어떤 명령과 URL로 되돌릴 수 있는가. 이 질문에 답하지 못한다면 아직 명령을 실행할 준비가 덜 된 것입니다.

특히 AI에게 배포를 맡길 때는 "배포해 줘"보다 "현재 브랜치에서 build를 통과한 뒤 preview 배포만 만들고, production alias는 바꾸지 말며, 결과 URL과 rollback 가능 여부를 보고하라"처럼 경계를 적어야 합니다. CLI는 사람이 직접 누르는 버튼보다 빠르기 때문에, 제한 조건도 더 정확해야 합니다.

## 더 읽기

- [Vercel CLI Overview](https://vercel.com/docs/cli) — deploy/rollback/promote/login/list/logs, CI/CD 토큰 인증

이전 순서: [배포 플랫폼](/lessons/deployment-platforms) — CLI가 조작하는 대상. 관련: [npm scripts](/lessons/npm-scripts-reference) — 배포 명령을 감싸는 표준 진입점. [모니터링·오류·롤백](/lessons/monitoring-errors-rollbacks) — `vercel rollback`이 수행하는 복구. [환경변수와 secret](/lessons/environment-variables-secrets) — 배포 토큰을 다루는 원칙. 이로써 deployment-ops 모듈이 "빌드 → 플랫폼 → 스크립트 → CI/CD → 관찰·롤백 → CLI"로 이어지는 배포·운영의 전 과정을 담게 됩니다. 내 컴퓨터의 코드가 사용자에게 도달하고, 도달한 뒤에도 안전하게 관리되는 전체 여정을 하나의 모듈로 꿴 셈입니다.
