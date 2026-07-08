---
id: deployment-cli-reference
title: "배포 CLI 레퍼런스 — 터미널에서 배포·롤백"
topicGroup: T06
status: approved
score: 88
level: 중급
prerequisites: [deployment-platforms, npm-scripts-reference]
successors: []
related: [monitoring-errors-rollbacks, environment-variables-secrets]
sources:
  - { title: "Vercel CLI Overview — Vercel Documentation", url: "https://vercel.com/docs/cli", checked: 2026-07-08 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-08
---

## 정의
배포 CLI는 배포 플랫폼을 터미널에서 조작하는 명령줄 도구다. Vercel CLI는 "With the command-line interface (CLI) you can interact with the Vercel platform using a terminal, or through an automated system"(터미널이나 자동화 시스템으로 Vercel 플랫폼과 상호작용)라고 소개한다. 대표 명령은 `vercel deploy`("Deploy your Vercel projects. Default command when no subcommand is specified"), `vercel rollback`("Roll back production deployments to previous deployments") 등이다. 이 사이트도 배포 CLI(`npx firebase-tools deploy --only hosting --project ju0o-ec967`)로 배포된다. (출처: Vercel CLI Overview + 이 프로젝트 배포 명령, 확인: 2026-07-08)

## 역사
배포를 웹 대시보드 버튼으로만 하면 자동화가 어렵다. CLI는 같은 배포·롤백을 명령으로 옮겨, 스크립트·CI/CD·AI 에이전트가 실행할 수 있게 한다. npm-scripts 강의처럼 `npm run deploy` 뒤에 배포 CLI 명령을 감싸고, ci-cd 강의의 워크플로 스텝이 이 명령을 실행한다 — 배포 CLI가 자동화의 실제 손이다. (근거: Vercel CLI Overview + npm-scripts/ci-cd KB, 확인: 2026-07-08)

## 해결하려는 문제
- 터미널에서 배포: 대시보드 왕복 없이 `vercel deploy`로 즉시 배포. (출처: Vercel CLI deploy, 확인: 2026-07-08)
- 자동화 연결: CI/CD·스크립트가 배포를 실행하도록 명령화. (출처: Vercel CLI "automated system", 확인: 2026-07-08)
- 안전한 인증: CI/CD에서 토큰을 환경변수로 주입해 노출을 막음. (출처: Vercel CLI CI/CD 안내, 확인: 2026-07-08)

## 핵심 개념
1. **`vercel deploy`(기본 명령)**: "Deploy your Vercel projects. Default command when no subcommand is specified." `vercel`만 쳐도 배포되고, `vercel deploy --prod`는 프로덕션 배포다. (출처: Vercel CLI deploy, 확인: 2026-07-08)
2. **`vercel rollback`**: "Roll back production deployments to previous deployments." 터미널에서 이전 배포로 되돌린다(monitoring 강의의 롤백을 명령으로). (출처: Vercel CLI rollback, 확인: 2026-07-08)
3. **`vercel promote`**: "Promote an existing deployment to be the current deployment." 특정 배포를 현재(프로덕션)로 승격 — 롤백 해제에도 쓰인다. (출처: Vercel CLI promote, 확인: 2026-07-08)
4. **`vercel login` / `vercel list` / `vercel logs`**: 로그인("Login to your Vercel account through CLI"), 배포 목록("List recent deployments"), 런타임 로그("List runtime logs for a specific deployment") 조회. (출처: Vercel CLI login·list·logs, 확인: 2026-07-08)
5. **CI/CD 인증 = 토큰 환경변수**: "Using the VERCEL_TOKEN environment variable is recommended for CI/CD because it avoids exposing the token in command-line arguments, which can be visible in process lists and logs." — 토큰을 인자가 아니라 환경변수로. (출처: Vercel CLI CI/CD, 확인: 2026-07-08)
6. **Firebase CLI 대응**: 이 사이트는 `firebase-tools`로 `firebase deploy --only hosting --project <id>`를 실행한다 — 플랫폼은 달라도 "터미널에서 배포"라는 개념은 같다. (근거: 이 프로젝트 배포 명령, 확인: 2026-07-08)

## 관련 기술
- 배포 CLI ↔ npm-scripts-reference: 배포 명령을 `npm run deploy` 스크립트로 감싼다. (출처: Vercel CLI + npm-scripts KB, 확인: 2026-07-08)
- 배포 CLI ↔ ci-cd-pipeline-basics: 워크플로 스텝이 배포 CLI 명령을 실행한다. (근거: ci-cd KB, 확인: 2026-07-08)
- rollback ↔ monitoring-errors-rollbacks: 사고 시 `vercel rollback`이 복구 명령. (출처: Vercel CLI rollback + monitoring KB, 확인: 2026-07-08)
- 토큰 환경변수 ↔ environment-variables-secrets: CI 토큰을 secret 환경변수로 주입. (출처: Vercel CLI CI/CD + env KB, 확인: 2026-07-08)

## 선행 개념
- deployment-platforms: CLI가 조작하는 배포 플랫폼.
- npm-scripts-reference: 배포 명령을 감싸는 스크립트.

## 후행 개념
- 배포 체크리스트 플레이북 (예정): 배포 CLI 명령을 절차로 묶은 실무 체크리스트.

## AI 시대에서의 의미
AI 에이전트가 "배포해줘"를 수행할 때 실제로 실행하는 것이 배포 CLI 명령이다 — `vercel deploy`나 `firebase deploy`. 그때 위험 지점은 인증 토큰이다: AI가 토큰을 명령 인자로 넘기면 프로세스 목록·로그에 노출되므로, ==토큰은 환경변수(VERCEL_TOKEN 등)로 주입==해야 한다는 것을 사람이 확인해야 한다. 또 AI가 실수로 `--prod`를 붙여 검증 전 프로덕션에 배포하지 않는지도 검토 지점이다. (출처: Vercel CLI CI/CD 안내, 확인: 2026-07-08)

## 실무 활용
1. 프로덕션 배포: `vercel deploy --prod` 또는 `firebase deploy --only hosting`. (출처: Vercel CLI deploy + 프로젝트 명령, 확인: 2026-07-08)
2. 사고 롤백: `vercel rollback`으로 이전 배포로 복구. (출처: Vercel CLI rollback, 확인: 2026-07-08)
3. 스크립트화: 배포 명령을 `npm run deploy`로 감싸 표준화. (출처: Vercel CLI + npm-scripts KB, 확인: 2026-07-08)
4. CI 인증: `VERCEL_TOKEN` 환경변수로 토큰 주입(인자 노출 방지). (출처: Vercel CLI CI/CD, 확인: 2026-07-08)

## FAQ
Q: 인자 없이 vercel만 치면?
A: 기본 명령이 deploy이므로 배포가 실행된다. `vercel deploy`와 같다. (출처: Vercel CLI deploy, 확인: 2026-07-08)
Q: 프로덕션 배포는 어떻게?
A: `vercel deploy --prod`(또는 `vercel --prod`)로 프로덕션에 배포한다. (출처: Vercel CLI deploy, 확인: 2026-07-08)
Q: CI에서 토큰은 어떻게 넘기나?
A: `VERCEL_TOKEN` 환경변수로 주입하는 것이 권장된다 — 인자로 넘기면 프로세스 목록·로그에 노출될 수 있기 때문이다. (출처: Vercel CLI CI/CD, 확인: 2026-07-08)
Q: 터미널에서 롤백할 수 있나?
A: 있다. `vercel rollback`이 프로덕션을 이전 배포로 되돌린다. (출처: Vercel CLI rollback, 확인: 2026-07-08)

## 자주 하는 실수
1. 실수: 토큰을 명령 인자로 전달. 왜 생기나: 편의. 교정: VERCEL_TOKEN 환경변수로 — 인자는 로그 노출. (출처: Vercel CLI CI/CD, 확인: 2026-07-08)
2. 실수: 검증 전 실수로 --prod 배포. 왜 생기나: 프로덕션 플래그 부주의. 교정: 미리보기 후 프로덕션 승격. (근거: Vercel CLI deploy + 배포 플랫폼 KB, 확인: 2026-07-08)
3. 실수: 롤백 방법을 사고 때 처음 찾음. 왜 생기나: 사전 확인 안 함. 교정: `vercel rollback`·`firebase hosting:rollback`을 미리 숙지. (출처: Vercel CLI rollback + monitoring KB, 확인: 2026-07-08)
4. 실수: 배포 명령을 각자 다르게 실행. 왜 생기나: 미표준화. 교정: `npm run deploy`로 감싸 팀 통일. (근거: npm-scripts KB, 확인: 2026-07-08)

## 공식 출처
- Vercel CLI 정의·deploy/rollback/promote/login/list/logs·CI 토큰 — [Vercel CLI Overview](https://vercel.com/docs/cli) (확인: 2026-07-08)
- Firebase CLI 배포는 이 프로젝트의 `firebase-tools deploy --only hosting` 명령으로 대응 (근거: 프로젝트 DEPLOY-GUIDE, 확인: 2026-07-08)

## Quote Bank
- > "With the command-line interface (CLI) you can interact with the Vercel platform using a terminal, or through an automated system, enabling you to retrieve logs, manage certificates, replicate your deployment environment locally, manage Domain Name System (DNS) records, and more."
  - 출처: [Vercel CLI Overview](https://vercel.com/docs/cli) (확인: 2026-07-08)
  - 맥락: 배포 CLI의 정의 — 터미널·자동화로 플랫폼 조작
- > "Deploy your Vercel projects. Default command when no subcommand is specified."
  - 출처: [Vercel CLI Overview](https://vercel.com/docs/cli) (확인: 2026-07-08)
  - 맥락: vercel deploy — 기본 명령
- > "Roll back production deployments to previous deployments."
  - 출처: [Vercel CLI Overview](https://vercel.com/docs/cli) (확인: 2026-07-08)
  - 맥락: vercel rollback — 터미널 복구
- > "Promote an existing deployment to be the current deployment."
  - 출처: [Vercel CLI Overview](https://vercel.com/docs/cli) (확인: 2026-07-08)
  - 맥락: vercel promote — 특정 배포를 현재로 승격
- > "Using the VERCEL_TOKEN environment variable is recommended for CI/CD because it avoids exposing the token in command-line arguments, which can be visible in process lists and logs."
  - 출처: [Vercel CLI Overview](https://vercel.com/docs/cli) (확인: 2026-07-08)
  - 맥락: CI 인증 — 토큰은 인자가 아니라 환경변수로

## 변경 이력
- 2026-07-08: 최초 작성 (Fable — 대행, P-01)
