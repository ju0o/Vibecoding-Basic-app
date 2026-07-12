## 한 줄 정의

운영 환경과 secret 배포는 API key, database URL, OAuth secret처럼 민감하거나 배포마다 달라지는 설정을 코드에 직접 쓰지 않고, 환경별로 안전하게 주입하고 노출 범위를 통제하는 절차입니다. 개발자는 로컬, preview, production 환경에서 서로 다른 설정을 사용합니다. 로컬에서는 테스트 데이터베이스를 쓰고, preview에서는 pull request 확인용 리소스를 쓰며, production에서는 실제 사용자 데이터와 연결됩니다. 이 경계를 코드 한 줄로 섞어버리면 작은 실수가 실제 사고가 됩니다.

환경변수는 설정을 코드 밖으로 빼내는 통로입니다. Secret은 그중에서도 외부에 노출되면 안 되는 민감 값입니다. Twelve-Factor 원칙은 config를 environment variables에 저장한다고 설명하고, Next.js는 build time과 runtime environment variables를 모두 지원한다고 설명합니다. Vercel은 Production과 Preview 환경별 변수를 나누고, GitHub Actions는 workflow에서 secrets context를 통해 민감 값을 주입할 수 있게 합니다.

==운영 환경과 secret 관리의 핵심은 값을 숨기는 기술 하나가 아니라, 어떤 값이 언제 어디에 노출되는지 설명 가능한 구조를 만드는 것입니다==. 특히 Next.js처럼 서버 코드와 브라우저 bundle이 함께 있는 프레임워크에서는 “server-only인지, client에 공개되는지, build 때 inline되는지”를 구분해야 합니다.

![운영 환경과 secret 흐름](/lesson-diagrams/production-env-and-secrets/production-env-secret-flow.svg)

## 왜 존재하는가

초보 프로젝트에서는 `.env` 파일에 값을 넣고 잘 작동하면 끝난 것처럼 느낄 수 있습니다. 하지만 서비스가 배포되면 문제가 복잡해집니다. 같은 코드가 preview와 production에서 다르게 동작해야 하고, CI/CD는 사람이 터미널에 직접 입력하지 않아도 deploy token을 사용해야 하며, 로그에는 민감 값이 찍히면 안 됩니다. 또한 프론트엔드 bundle에 들어간 값은 사용자 브라우저에서 볼 수 있습니다.

Secret을 코드에 직접 쓰면 Git 이력에 남습니다. 나중에 파일에서 지워도 과거 commit에는 남아 있을 수 있습니다. public repository가 아니더라도 권한을 가진 사람, CI 로그, build artifact, error report를 통해 노출될 수 있습니다. 그래서 secret은 코드가 아니라 secret store, deployment platform, CI secret 같은 경로로 주입해야 합니다.

환경별 분리도 중요합니다. Preview deployment가 production database에 연결되면 테스트 중인 코드가 실제 사용자 데이터를 바꿀 수 있습니다. 반대로 production이 staging API를 바라보면 실제 사용자가 잘못된 데이터를 보게 됩니다. 따라서 environment scope는 단순 편의 기능이 아니라 운영 안전 경계입니다.

AI 시대에는 이 문제가 더 예민합니다. AI에게 배포 설정이나 CI workflow를 수정하게 할 때 secret 값을 prompt에 붙이거나, 로그를 통째로 제공하거나, 예시 코드에 실제 token을 남기면 곧바로 유출 경로가 됩니다. AI 작업 지시에는 “secret 값을 출력하지 말 것”, “`NEXT_PUBLIC_`에는 공개 가능한 값만 둘 것”, “CI 로그에 민감 값 echo 금지” 같은 규칙이 반드시 필요합니다.

> [!WARNING]
> secret은 “채팅창에 한 번만 보여주기”도 위험합니다. 코드, 로그, 프롬프트, 스크린샷, 커밋 어디에도 실제 값을 남기지 않는 운영 습관이 필요합니다.

## 작동 원리

### 1. Config와 code를 분리한다

Twelve-Factor는 config를 environment variables에 저장한다고 설명합니다. 여기서 config는 배포마다 달라질 수 있는 값입니다. API endpoint, database URL, feature flag, OAuth client id, deploy token 같은 값은 코드에 박아두면 환경을 바꾸기 어렵고, 민감 값은 유출 위험이 커집니다. Environment variable은 실행 환경이 process에 값을 넣어주고, 애플리케이션은 그 값을 읽어 동작합니다.

이 구조의 장점은 같은 codebase를 여러 환경에 배포할 수 있다는 점입니다. 코드는 그대로 두고 환경변수만 바꾸면 preview와 production의 API endpoint를 다르게 설정할 수 있습니다. 또한 secret을 repository에 넣지 않아도 됩니다.

### 2. Build time과 runtime을 구분한다

Next.js는 build time과 runtime environment variables를 모두 지원한다고 설명합니다. Build time 값은 앱을 빌드할 때 읽혀 bundle이나 static output에 반영될 수 있습니다. Runtime 값은 실행 중 서버 환경에서 읽힙니다. 이 차이를 이해하지 못하면 “환경변수를 바꿨는데 왜 반영되지 않지?”라는 문제가 생깁니다.

정적 export나 client bundle에 포함된 값은 build 이후 바뀌지 않을 수 있습니다. 반대로 server runtime에서 읽는 값은 배포 환경에서 주입된 값을 사용할 수 있습니다. 어떤 값이 build에 inline되는지, 어떤 값이 server에서만 읽히는지 구분해야 합니다.

### 3. Server-only default와 public prefix를 이해한다

Next.js는 기본적으로 environment variable이 server에서만 사용 가능하다고 설명합니다. 이것은 좋은 기본값입니다. secret은 브라우저에 보내지면 안 되기 때문입니다. 브라우저에서 사용할 환경변수는 `NEXT_PUBLIC_` prefix가 필요하고, 이 값은 build 중 JavaScript bundle에 inline될 수 있습니다.

따라서 `NEXT_PUBLIC_`는 “안전하게 공개된 secret”이 아닙니다. 공개 가능한 설정만 넣는 이름표입니다. 예를 들어 공개 API base URL이나 analytics public id는 가능할 수 있지만, database password, private API key, signing secret은 절대 넣으면 안 됩니다.

### 4. Environment scope를 나눈다

Vercel은 Production variable이 Production Deployment에, Preview variable이 Preview Deployment에 적용된다고 설명합니다. 이 scope 분리는 운영 사고를 줄입니다. Pull request preview는 테스트용 API와 DB를 바라보게 하고, production은 실제 리소스를 바라보게 하는 식입니다.

환경 scope는 변수 이름만큼 중요합니다. 같은 `DATABASE_URL`이라도 preview와 production에서 값이 달라야 할 수 있습니다. 개발자는 “변수 이름이 무엇인가”뿐 아니라 “이 값이 어떤 deployment에 적용되는가”를 확인해야 합니다.

### 5. CI secret은 로그와 권한을 함께 관리한다

GitHub Actions는 repository secret을 `secrets` context로 workflow input 또는 environment variable에 제공할 수 있다고 설명합니다. CI는 사람이 직접 로그인하지 않고도 배포와 테스트를 수행해야 하므로 token이 필요합니다. 하지만 token이 로그에 출력되면 secret store를 쓴 의미가 사라집니다.

GitHub Actions는 GitHub secret이 아닌 민감 정보도 mask하라고 경고합니다. 로그는 저장되고 공유될 수 있으므로, `echo`로 token을 출력하거나 error message에 secret 값이 섞이지 않게 해야 합니다.

```yaml
name: deploy-preview

on:
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      API_BASE_URL: ${{ vars.API_BASE_URL }}
      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run verify
```

## 스펙과 세부

Next.js 환경변수에서 가장 조심해야 할 규칙은 client exposure입니다. Server component, route handler, build script처럼 서버 쪽에서만 쓰는 값은 일반 환경변수로 둘 수 있습니다. 브라우저에서 접근해야 하는 값은 `NEXT_PUBLIC_` prefix를 붙여야 하지만, 이 순간 그 값은 공개 가능해야 합니다. 이름에 public이 들어간다는 것은 보안 면제권이 아니라 공개 선언입니다.

또 하나의 세부는 build와 deploy pipeline입니다. 정적 사이트에서는 build 결과물이 HTML, JS, CSS 파일로 만들어지고 CDN에 올라갑니다. 이 결과물 안에 들어간 값은 사용자에게 전달됩니다. 따라서 정적 export 프로젝트에서 secret을 client 코드에 섞으면 전 세계에 배포된 파일 안에 secret이 들어갈 수 있습니다. 이 프로젝트가 비공개 접근 보호를 하더라도 static bundle 자체에 secret을 넣지 않는 원칙은 변하지 않습니다.

Vercel 같은 플랫폼의 환경변수 scope는 배포 유형과 연결됩니다. Production Deployment는 production branch나 production deploy에 해당하고, Preview Deployment는 branch나 pull request별 검증 환경에 해당할 수 있습니다. 이 구분 덕분에 같은 코드가 서로 다른 외부 리소스를 안전하게 바라볼 수 있습니다.

GitHub Actions에서 secret을 쓸 때는 두 가지를 나눠 봅니다. 첫째, 누가 secret을 설정하고 수정할 권한이 있는가입니다. 둘째, workflow가 secret을 어디에 전달하는가입니다. secret을 environment variable로 넘기는 것은 편리하지만, 실행 명령이 그 값을 출력하지 않는지 확인해야 합니다. 특히 실패 로그, debug flag, third-party action이 민감 값을 노출하지 않는지 주의해야 합니다.

AI에게 workflow를 작성하게 할 때는 placeholder만 사용해야 합니다. 실제 token 값 대신 `${{ secrets.DEPLOY_TOKEN }}` 같은 참조를 쓰고, README에도 “여기에 실제 값을 붙여넣으라”고 쓰지 않습니다. 문서에는 어떤 secret이 필요한지, 어디에서 설정하는지만 적습니다.

```ts
const requiredServerEnv = ["DATABASE_URL", "SESSION_SECRET"] as const

export function assertServerEnv() {
  for (const key of requiredServerEnv) {
    if (!process.env[key]) {
      throw new Error(`Missing required server environment variable: ${key}`)
    }
  }
}
```

이 예시는 secret 값을 출력하지 않고, 필요한 변수 이름만 알려주는 방식입니다. 오류 메시지에는 실제 값이 없어야 합니다.

## 원문으로 읽기

Next.js 환경변수 문서에서 build/runtime 구분을 보여주는 문장은 다음입니다.

> "Next.js can support both build time and runtime environment variables."

이 문장은 환경변수를 단순 key-value 저장소로 보지 말고, 언제 읽히는지까지 함께 봐야 한다는 뜻입니다. build 때 읽힌 값과 runtime에 읽히는 값은 변경 반영 방식이 다릅니다.

> "By default, environment variables are only available on the server."

이 문장은 server-only default가 보안상 중요한 기본값임을 보여줍니다. secret은 기본적으로 브라우저로 보내지 않아야 합니다.

> "it must be prefixed with `NEXT_PUBLIC_`"

이 문장은 client exposure 조건을 설명합니다. 브라우저에서 쓰려면 prefix가 필요하지만, prefix가 붙은 값은 공개 가능한 값이어야 합니다.

Vercel environment scope를 읽을 때는 다음 짧은 단어도 중요합니다.

관련 원문: 원문

Production이라는 scope는 실제 사용자에게 영향을 주는 배포 범위를 뜻합니다. Preview와 Production을 나누지 않으면 테스트 작업이 실제 운영 리소스를 건드릴 수 있습니다.

GitHub Actions secret 문서에서는 로그 masking이 핵심입니다.

관련 원문: 원문

이 문장은 secret store를 쓰는 것만으로 끝나지 않는다는 점을 알려줍니다. 로그, error, debug output까지 민감 정보가 나오지 않게 해야 합니다.

Twelve-Factor config 원칙은 다음 문장으로 요약됩니다.

관련 원문: 원문

이 문장은 config를 code에서 분리하는 가장 오래되고 실용적인 기준입니다. 현대 배포 플랫폼에서도 이 원칙은 여전히 중요합니다.

## 실전에서

실무에서 첫 번째로 할 일은 변수 목록을 inventory로 만드는 것입니다. `DATABASE_URL`, `SESSION_SECRET`, `API_BASE_URL`, `NEXT_PUBLIC_ANALYTICS_ID`처럼 필요한 key를 적고, 각 key가 secret인지 public인지 표시합니다. 이 목록이 없으면 팀원과 AI가 어떤 값을 어디에 넣어야 하는지 추측하게 됩니다.

두 번째는 환경별 scope를 정하는 것입니다. Local, Preview, Production을 나누고 각 환경에서 어떤 값이 달라지는지 기록합니다. Preview에서 production DB를 쓰지 않도록 하고, production에서 test API를 쓰지 않도록 합니다. 이 구조는 사고를 막는 체크리스트가 됩니다.

세 번째는 client exposure review입니다. 코드에서 `NEXT_PUBLIC_`로 시작하는 값은 전부 공개 가능하다고 가정하고 다시 검토합니다. 이름이 public이 아닌 secret을 client component에서 읽으려 하면 build나 runtime에서 문제가 날 수 있고, 억지로 prefix를 붙이면 secret이 노출됩니다. “브라우저에서 꼭 필요한가?”를 먼저 물어야 합니다.

네 번째는 CI log review입니다. Workflow에서 secret을 echo하지 않는지, 실패 시 command가 token을 포함해 출력하지 않는지, third-party action에 불필요한 secret을 넘기지 않는지 확인합니다. GitHub Actions masking이 있더라도, secret이 아닌 민감 정보는 별도로 mask해야 합니다.

> [!TIP]
> AI에게 배포 설정을 맡길 때는 실제 값 없이 변수 이름, scope, 공개 여부, 검증 명령만 제공하세요. AI가 알아야 하는 것은 secret의 내용이 아니라 secret이 필요한 위치와 안전 경계입니다.

## 한계와 트레이드오프

환경변수는 강력하지만 모든 보안을 해결하지는 않습니다. secret store에 넣어도 애플리케이션이 값을 잘못 출력하면 유출됩니다. 권한이 과도한 token을 CI에 넣으면 작은 workflow 취약점이 큰 사고가 될 수 있습니다. 따라서 secret은 최소 권한, rotate, audit, log masking과 함께 관리해야 합니다.

Build time과 runtime 구분도 trade-off가 있습니다. Build time 값은 static output에 빠르게 반영되어 CDN에서 서빙하기 좋지만, 배포 후 바꾸려면 다시 build가 필요할 수 있습니다. Runtime 값은 환경 변경에 유연하지만, server runtime이 필요하거나 실행 환경에 따라 접근 방식이 달라질 수 있습니다.

Public environment variable은 편리하지만 오해하기 쉽습니다. 공개 가능한 값이라도 너무 많은 내부 구조를 드러내면 공격자가 시스템을 추론하는 단서가 될 수 있습니다. public API endpoint 자체는 숨길 수 없지만, private token이나 internal admin path는 절대 client bundle에 넣으면 안 됩니다.

AI 코딩에서도 한계가 있습니다. AI는 placeholder와 실제 secret을 구분하지 못한 채 로그를 요약하거나 코드를 복사할 수 있습니다. 그래서 사람이 secret redaction 규칙을 먼저 적용해야 합니다. 실제 운영 로그를 AI에게 제공해야 한다면 민감 값을 제거한 뒤 제공해야 합니다.

## 더 읽기

이 강의의 근거는 Next.js Environment Variables, Vercel Environment variables, GitHub Actions Using secrets, Twelve-Factor Config 문서입니다. 먼저 Twelve-Factor의 config 분리 원칙을 읽고, Next.js 문서에서 server-only default와 `NEXT_PUBLIC_` 규칙을 확인하세요. 이어서 Vercel의 environment scope와 GitHub Actions secret masking 규칙을 보면 배포 파이프라인 전체가 연결됩니다.

다음 학습으로는 `deployment-cli-reference`와 `monitoring-errors-rollbacks`가 이어집니다. CLI 배포에서는 token을 인자로 넘기지 않는 습관이 중요하고, 운영 후 로그와 오류 추적에서는 secret이 남지 않는지 계속 확인해야 합니다.

복습 질문입니다.

- Environment variable과 secret은 어떻게 다르며, 왜 code와 분리해야 하는가?
- Build time과 runtime environment variable은 어떤 상황에서 다르게 반영되는가?
- `NEXT_PUBLIC_` prefix가 붙은 값에 secret을 넣으면 안 되는 이유는 무엇인가?
- Preview와 Production environment scope를 나누지 않으면 어떤 사고가 생길 수 있는가?
- AI에게 배포 설정을 맡길 때 secret 값을 숨기기 위해 어떤 규칙을 줘야 하는가?
