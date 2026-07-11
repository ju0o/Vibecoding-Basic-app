---
id: production-env-secrets
title: "운영 환경과 Secret 배포 (Production Env and Secrets)"
topicGroup: T07
status: approved
score: 91
level: 중급
prerequisites: [environment-variables-secrets, deployment-platforms]
successors: [deployment-cli-reference]
related: [build-and-runtime, web-security-basics]
consumers:
  lessons: [production-env-and-secrets]
  glossary: [Environment Variable, Secret, Environment Scope, Public Environment Variable, Log Masking, GitHub Actions, Vercel]
sources:
  - { title: "Next.js — Environment Variables", url: "https://nextjs.org/docs/pages/guides/environment-variables", checked: 2026-07-11 }
  - { title: "Vercel — Environment variables", url: "https://vercel.com/docs/environment-variables", checked: 2026-07-11 }
  - { title: "GitHub Actions — Using secrets", url: "https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets", checked: 2026-07-11 }
  - { title: "The Twelve-Factor App — Config", url: "https://12factor.net/config", checked: 2026-07-11 }
updated: 2026-07-11
---

## 정의
운영 환경과 secret 배포는 배포별 설정과 민감 값을 코드 밖에서 주입하고 노출 범위를 통제하는 절차다. Twelve-Factor는 config를 environment variables에 저장한다고 설명하고, Next.js는 build time과 runtime environment variables를 모두 지원한다고 설명한다. (출처: https://12factor.net/config, https://nextjs.org/docs/pages/guides/environment-variables, 확인: 2026-07-11)

## 역사
SaaS 운영에서는 code와 config를 분리해 deploy마다 다른 값을 주입하는 방식이 표준적인 운영 패턴이 되었다. 2026-07-11 확인 기준 Vercel은 Production/Preview 환경별 environment variable 적용 범위를 문서화하고, GitHub Actions는 repository secret을 workflow input 또는 environment variable로 제공하는 방법을 문서화한다. (출처: https://vercel.com/docs/environment-variables, https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets, 확인: 2026-07-11)

## 해결하려는 문제
API key, database URL, OAuth secret을 코드에 넣으면 repository나 build log를 통해 유출될 수 있다. 또한 preview와 production이 같은 설정을 공유하면 테스트 변경이 실제 사용자 환경에 영향을 줄 수 있다. 운영 환경과 secret 배포는 codebase를 공개해도 credential이 새지 않는 구조와 deploy별 설정 분리를 목표로 한다. (출처: https://12factor.net/config, https://vercel.com/docs/environment-variables, 확인: 2026-07-11)

## 핵심 개념
1. **Build time vs runtime**: Next.js는 build time과 runtime environment variables를 모두 지원한다고 설명한다. (출처: https://nextjs.org/docs/pages/guides/environment-variables, 확인: 2026-07-11)
2. **Server-only default**: Next.js는 기본적으로 environment variable이 server에서만 사용 가능하다고 설명한다. (출처: https://nextjs.org/docs/pages/guides/environment-variables, 확인: 2026-07-11)
3. **Public prefix**: Next.js에서 browser에 노출하려면 `NEXT_PUBLIC_` prefix가 필요하며, 이 public variable은 `next build` 동안 JavaScript bundle에 inline된다. (출처: https://nextjs.org/docs/pages/guides/environment-variables, 확인: 2026-07-11)
4. **Vercel environment scope**: Vercel은 Production variable이 Production Deployment에, Preview variable이 Preview Deployment에 적용된다고 설명한다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-11)
5. **GitHub secrets context**: GitHub Actions는 repository secret을 `secrets` context로 workflow input 또는 environment variable에 제공할 수 있다고 설명한다. (출처: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets, 확인: 2026-07-11)
6. **Log masking**: GitHub Actions는 GitHub secret이 아닌 민감 정보도 `::add-mask::VALUE`로 mask하라고 경고한다. (출처: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets, 확인: 2026-07-11)

## 관련 기술
- Build and runtime: build 시점에 inline된 public variable은 runtime 변경만으로 바뀌지 않을 수 있다. (출처: https://nextjs.org/docs/pages/guides/environment-variables, 확인: 2026-07-11)
- Deployment platforms: Vercel은 production branch와 preview branch/CLI deployment에 따라 environment scope를 다르게 적용한다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-11)
- CI/CD: GitHub Actions secret은 workflow에서 외부 API key나 deploy token을 주입하는 경로가 된다. (출처: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets, 확인: 2026-07-11)

## 선행 개념
- environment-variables-secrets: env var와 secret의 기본 차이를 알아야 운영 배포 범위를 이해할 수 있다.
- deployment-platforms: production/preview deployment의 차이를 알아야 환경별 설정을 나눌 수 있다.

## 후행 개념
- deployment-cli-reference: CLI에서 production/preview 환경 변수와 deploy token을 다루는 절차로 확장된다.
- incident-response-secrets: secret 유출 시 rotate, revoke, audit 절차가 필요하다.

## AI 시대에서의 의미
AI가 배포 설정을 수정할 때 secret을 코드나 로그에 남기면 피해가 즉시 발생할 수 있다. 따라서 AI에게 작업을 맡길 때 "secret 값은 출력하지 않기", "`NEXT_PUBLIC_`는 공개 가능한 값만 사용", "CI 로그에 credential 출력 금지", "preview와 production 변수 분리" 같은 명시 규칙이 필요하다. (출처: https://nextjs.org/docs/pages/guides/environment-variables, https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets, 확인: 2026-07-11)

## 실무 활용
1. **Preview/Production 분리**: Vercel에서 Preview variable과 Production variable을 분리해 pull request 검증이 실제 production database를 건드리지 않게 한다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-11)
2. **Public variable 검토**: Next.js의 `NEXT_PUBLIC_` variable은 browser bundle에 inline되므로 secret을 붙이지 않는다. (출처: https://nextjs.org/docs/pages/guides/environment-variables, 확인: 2026-07-11)
3. **CI secret 주입**: GitHub Actions에서는 `secrets` context를 통해 token을 주입하고, 로그에 민감 값이 찍히지 않도록 mask를 확인한다. (출처: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets, 확인: 2026-07-11)

```yaml
env:
  NODE_ENV: production
  API_BASE_URL: ${{ vars.API_BASE_URL }}
  DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

## FAQ
Q: `.env` 파일을 commit해도 되는가?
A: secret이 들어 있다면 안 된다. Twelve-Factor는 config를 environment variables에 저장하고 code와 분리하는 것을 원칙으로 제시한다. (출처: https://12factor.net/config, 확인: 2026-07-11)

Q: `NEXT_PUBLIC_`이면 안전한가?
A: 아니다. Next.js는 `NEXT_PUBLIC_` 변수가 browser에 노출되고 build 중 bundle에 inline된다고 설명한다. 공개 가능한 값만 사용한다. (출처: https://nextjs.org/docs/pages/guides/environment-variables, 확인: 2026-07-11)

Q: GitHub secret이면 로그에 절대 안 찍히는가?
A: GitHub는 secret context 사용과 masking을 제공하지만, GitHub secret이 아닌 민감 정보는 `::add-mask::VALUE`로 mask하라고 경고한다. (출처: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets, 확인: 2026-07-11)

## 자주 하는 실수
1. **public prefix 오용**: secret을 `NEXT_PUBLIC_`로 노출한다. 공개 값과 server-only secret을 분리한다. (출처: https://nextjs.org/docs/pages/guides/environment-variables, 확인: 2026-07-11)
2. **preview가 production DB 사용**: Vercel environment scope를 나누지 않으면 preview deployment가 production resource에 연결될 수 있다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-11)
3. **로그에 값 출력**: CI에서 token을 echo하거나 error message에 포함한다. GitHub Actions masking과 secret context를 사용한다. (출처: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets, 확인: 2026-07-11)

## 공식 출처
- Build/runtime env와 `NEXT_PUBLIC_` 노출 — [Next.js — Environment Variables](https://nextjs.org/docs/pages/guides/environment-variables) (확인 날짜: 2026-07-11)
- Production/Preview variable scope — [Vercel — Environment variables](https://vercel.com/docs/environment-variables) (확인 날짜: 2026-07-11)
- GitHub Actions `secrets` context와 masking — [GitHub Actions — Using secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets) (확인 날짜: 2026-07-11)
- Config in env vars — [The Twelve-Factor App — Config](https://12factor.net/config) (확인 날짜: 2026-07-11)

## Quote Bank
- > "Next.js can support both build time and runtime environment variables."
  - 출처: [Next.js — Environment Variables](https://nextjs.org/docs/pages/guides/environment-variables) (확인: 2026-07-11)
  - 맥락: build/runtime 구분을 설명할 때 사용한다.
- > "By default, environment variables are only available on the server."
  - 출처: [Next.js — Environment Variables](https://nextjs.org/docs/pages/guides/environment-variables) (확인: 2026-07-11)
  - 맥락: server-only default를 설명할 때 사용한다.
- > "it must be prefixed with `NEXT_PUBLIC_`"
  - 출처: [Next.js — Environment Variables](https://nextjs.org/docs/pages/guides/environment-variables) (확인: 2026-07-11)
  - 맥락: client exposure 조건을 설명할 때 사용한다.
- > "Production"
  - 출처: [Vercel — Environment variables](https://vercel.com/docs/environment-variables) (확인: 2026-07-11)
  - 맥락: Vercel 환경 scope를 설명할 때 사용한다.
- > "Mask all sensitive information"
  - 출처: [GitHub Actions — Using secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets) (확인: 2026-07-11)
  - 맥락: CI log masking을 설명할 때 사용한다.
- > "The twelve-factor app stores config in environment variables"
  - 출처: [The Twelve-Factor App — Config](https://12factor.net/config) (확인: 2026-07-11)
  - 맥락: config 분리 원칙을 설명할 때 사용한다.

## 변경 이력
- 2026-07-11: 최초 작성 (Codex, P-01)
