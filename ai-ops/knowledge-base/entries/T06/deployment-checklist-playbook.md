---
id: deployment-checklist-playbook
title: "배포 체크리스트 플레이북 (Deployment Checklist Playbook)"
topicGroup: T06
status: approved
score: 89
level: 중급
prerequisites: [deployment-cli-reference, production-env-secrets, ci-cd-pipeline-basics]
successors: [private-ai-learning-site-project]
related: [build-and-runtime, monitoring-errors-rollbacks, npm-debugging-playbook]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Next.js Docs — Production Checklist", url: "https://nextjs.org/docs/app/guides/production-checklist", checked: 2026-07-12 }
  - { title: "Next.js Docs — Backend for Frontend", url: "https://nextjs.org/docs/app/guides/backend-for-frontend", checked: 2026-07-12 }
  - { title: "Next.js Docs — Server Actions", url: "https://nextjs.org/docs/app/guides/server-actions", checked: 2026-07-12 }
  - { title: "Vercel Docs — Environment Variables", url: "https://vercel.com/docs/environment-variables", checked: 2026-07-12 }
  - { title: "Vercel Docs — Deployment Protection", url: "https://vercel.com/docs/deployment-protection", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
배포 체크리스트 플레이북은 build, test, environment variables, auth, public endpoints, metadata/SEO, deployment protection, rollback evidence를 배포 전후에 확인하는 절차다. 목표는 "배포 버튼을 누르는 법"이 아니라, 운영 환경에서 깨질 수 있는 조건을 사전에 체크하고 실패 시 되돌릴 근거를 남기는 것이다.

## 역사
웹 배포는 정적 파일 업로드에서 CI/CD, preview deployment, serverless function, edge runtime, BFF pattern, protected deployment로 확장됐다. Next.js는 production checklist에서 performance, routing, data fetching, UI/accessibility, security, metadata, type safety를 배포 전 고려사항으로 제시한다. Vercel은 environment variables와 deployment protection을 project-level 설정으로 제공해 code와 운영 설정을 분리한다. (출처: https://nextjs.org/docs/app/guides/production-checklist, https://vercel.com/docs/environment-variables, https://vercel.com/docs/deployment-protection, 확인: 2026-07-12)

## 해결하려는 문제
초보자는 `npm run build`만 통과하면 배포 준비가 끝났다고 생각하기 쉽다. 하지만 production에서는 env 누락, auth check 누락, public route handler 노출, Server Action 검증 부족, robots/metadata 부재, preview/prod 보호 정책 차이, rollback evidence 부족이 문제가 된다. 체크리스트는 배포를 기술 명령이 아니라 운영 의사결정으로 다루게 한다. (출처: https://nextjs.org/docs/app/guides/production-checklist, https://nextjs.org/docs/app/guides/backend-for-frontend, 확인: 2026-07-12)

## 핵심 개념
1. **Local production build**: Next.js 문서는 production 전에 `next build`로 local build error를 잡고 `next start`로 production-like environment를 측정할 수 있다고 설명한다. 배포 전 `npm run verify` 같은 종합 command를 둔다. (출처: https://nextjs.org/docs/app/guides/production-checklist, 확인: 2026-07-12)
2. **Environment variables**: Vercel은 environment variables를 source code 밖 key-value로 정의하며 build step 또는 function execution에서 읽을 수 있다고 설명한다. secret은 code와 log에 남기지 않는다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-12)
3. **Security checks in actions**: Next.js production checklist는 Server Actions 안에서 auth/authz를 검증하고 page/layout/proxy level check만 믿지 말라고 한다. mutation은 action 내부에서 권한과 input validation을 확인한다. (출처: https://nextjs.org/docs/app/guides/production-checklist, 확인: 2026-07-12)
4. **Public endpoints**: Next.js BFF guide는 Route Handlers가 public HTTP endpoints이며 any client can access them이라고 설명한다. API route는 내부 함수가 아니라 외부 attack surface다. (출처: https://nextjs.org/docs/app/guides/backend-for-frontend, 확인: 2026-07-12)
5. **Server Action dispatch**: Server Actions는 client에서 sequential dispatch되며, mutation response가 data와 UI를 함께 전달할 수 있다. UX와 consistency를 위해 중복 제출과 stale state를 고려한다. (출처: https://nextjs.org/docs/app/guides/server-actions, 확인: 2026-07-12)
6. **Deployment protection**: Vercel Deployment Protection은 preview/production URL 접근을 제어한다. 보호 method와 scope를 project level에서 정한다. (출처: https://vercel.com/docs/deployment-protection, 확인: 2026-07-12)

## 관련 기술
- build-and-runtime: build-time error와 runtime config error를 구분한다.
- monitoring-errors-rollbacks: 배포 후 오류 확인과 rollback 근거가 필요하다.
- npm-debugging-playbook: install/build 단계 실패를 배포 전 분리해 해결한다.

## 선행 개념
- deployment-cli-reference: platform CLI와 project link, deploy command를 알아야 한다.
- production-env-secrets: 환경 변수와 secret 처리 없이 production 배포가 위험해진다.
- ci-cd-pipeline-basics: checklist를 자동 gate로 만들려면 CI job 구조를 알아야 한다.

## 후행 개념
- private-ai-learning-site-project: 최종 프로젝트에서 noindex, password gate, protected deployment, verify report를 묶는 실전 배포 절차로 이어진다.

## AI 시대에서의 의미
AI가 코드를 빠르게 작성해도 운영 품질은 배포 checklist가 결정한다. 바이브코딩에서는 AI에게 "배포해"라고 말하기 전에 build log, env matrix, route exposure, auth boundary, robots/noindex, release note, rollback plan을 요구해야 한다. 특히 AI agent가 deployment protection을 우회해야 할 때는 bypass secret을 header로 전달하고, secret을 commit/log에 남기지 않는 정책이 필요하다. (출처: https://vercel.com/docs/environment-variables, https://vercel.com/docs/deployment-protection, 확인: 2026-07-12)

## 실무 활용
1. **Pre-deploy gate**: lint, typecheck, test, build를 하나의 verify command로 묶는다.
2. **Env audit**: production/preview/development에 필요한 env key를 표로 관리하고 value는 저장하지 않는다.
3. **Route audit**: route handler와 server action을 public surface로 보고 auth/input validation 여부를 확인한다.
4. **Protection audit**: preview와 production URL protection scope를 확인한다.
5. **Release evidence**: commit hash, build result, changed files, known risks, rollback command를 release note에 남긴다.

```md
Deployment Gate
- [ ] npm run verify PASS
- [ ] required env keys configured
- [ ] public endpoints reviewed
- [ ] Server Actions auth/authz reviewed
- [ ] deployment protection scope confirmed
- [ ] release note and rollback evidence recorded
```

## FAQ
Q: build가 통과하면 바로 배포해도 되는가?
A: build는 필요조건이지 충분조건이 아니다. production checklist는 security, metadata, type safety, Web Vitals, accessibility 등 운영 전 확인 항목을 함께 제시한다. (출처: https://nextjs.org/docs/app/guides/production-checklist, 확인: 2026-07-12)

Q: Route Handler는 서버 내부 함수인가?
A: 아니다. Next.js BFF guide는 Route Handlers가 public HTTP endpoints이고 any client can access them이라고 설명한다. (출처: https://nextjs.org/docs/app/guides/backend-for-frontend, 확인: 2026-07-12)

Q: 환경 변수는 코드에 넣어도 되는가?
A: Vercel은 environment variable을 source code 밖에서 설정하는 key-value라고 설명한다. secret value는 code, README, log, commit에 남기지 않는다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-12)

## 자주 하는 실수
1. **env key 누락을 build 오류로만 봄**: local과 production env가 다르면 runtime에서 깨진다. 교정: env key matrix를 만든다.
2. **layout auth check만 믿음**: mutation endpoint가 직접 호출될 수 있다. 교정: Server Action/Route Handler 내부에서 auth/authz를 검증한다.
3. **preview protection과 production protection을 혼동**: scope가 다르면 public domain이 열릴 수 있다. 교정: protection method와 scope를 배포 전 확인한다.
4. **release evidence를 남기지 않음**: 실패 시 무엇을 되돌릴지 모른다. 교정: release note에 commit hash와 verify 결과를 기록한다.

## 공식 출처
- production 전 확인 항목과 build/start — [Next.js Docs — Production Checklist](https://nextjs.org/docs/app/guides/production-checklist) (확인 날짜: 2026-07-12)
- public endpoints와 BFF caveat — [Next.js Docs — Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend) (확인 날짜: 2026-07-12)
- Server Actions와 mutation response — [Next.js Docs — Server Actions](https://nextjs.org/docs/app/guides/server-actions) (확인 날짜: 2026-07-12)
- env var 관리 — [Vercel Docs — Environment Variables](https://vercel.com/docs/environment-variables) (확인 날짜: 2026-07-12)
- deployment protection — [Vercel Docs — Deployment Protection](https://vercel.com/docs/deployment-protection) (확인 날짜: 2026-07-12)

## Quote Bank
- > "Before taking your Next.js application to production"
  - 출처: [Next.js Docs — Production Checklist](https://nextjs.org/docs/app/guides/production-checklist) (확인: 2026-07-12)
  - 맥락: 배포 전 체크리스트의 목적을 설명할 때 사용한다.
- > "Verify authentication and authorization inside each action."
  - 출처: [Next.js Docs — Production Checklist](https://nextjs.org/docs/app/guides/production-checklist) (확인: 2026-07-12)
  - 맥락: action 내부 보안 검증을 설명할 때 사용한다.
- > "Route Handlers are public HTTP endpoints."
  - 출처: [Next.js Docs — Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend) (확인: 2026-07-12)
  - 맥락: API route exposure를 설명할 때 사용한다.
- > "Next.js dispatches Server Actions one at a time per client."
  - 출처: [Next.js Docs — Server Actions](https://nextjs.org/docs/app/guides/server-actions) (확인: 2026-07-12)
  - 맥락: mutation UX와 중복 제출 처리를 설명할 때 사용한다.
- > "Environment variables are key-value pairs configured outside your source code"
  - 출처: [Vercel Docs — Environment Variables](https://vercel.com/docs/environment-variables) (확인: 2026-07-12)
  - 맥락: secret을 code와 분리하는 이유를 설명할 때 사용한다.
- > "Deployment Protection lets you control who can access your preview and production URLs."
  - 출처: [Vercel Docs — Deployment Protection](https://vercel.com/docs/deployment-protection) (확인: 2026-07-12)
  - 맥락: protected deployment checklist를 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
