---
id: deployment-platforms
title: "배포 플랫폼 — Firebase, Vercel과 정적·서버 모델"
topicGroup: T06
status: approved
score: 89
level: 기초
prerequisites: [build-and-runtime]
successors: [deployment-cli-reference]
related: [nextjs-routing-rendering, environment-variables-secrets]
sources:
  - { title: "Firebase Hosting — Firebase Documentation", url: "https://firebase.google.com/docs/hosting", checked: 2026-07-08 }
  - { title: "Deploying to Vercel — Vercel Documentation", url: "https://vercel.com/docs/deployments", checked: 2026-07-08 }
consumers:
  lessons: [deployment-platforms]
  glossary: [Deployment Platform, CDN, Static Hosting]
updated: 2026-07-08
---

## 정의
배포 플랫폼은 빌드된 앱을 사용자에게 서빙하는 실행 환경이다. 대표적으로 Firebase Hosting은 "Firebase Hosting provides fast and secure hosting for your web app"(웹 앱을 위한 빠르고 안전한 호스팅을 제공)이라 소개하며, 업로드한 파일을 CDN 엣지에 캐시해 서빙한다. Vercel은 배포를 "A deployment on Vercel is the result of a successful build of your project"(프로젝트 빌드 성공의 결과물)로 정의하고, 배포마다 고유 URL을 생성한다. 이 사이트도 Firebase Hosting으로 배포된다. (출처: Firebase Hosting·Vercel Deployments, 확인: 2026-07-08)

## 역사
build-and-runtime 강의의 "실행(run) 단계"를 실제로 담당하는 것이 배포 플랫폼이다. 개발자가 빌드한 산출물을 받아 전 세계 사용자에게 안전하고 빠르게 전달하는 인프라를, 플랫폼이 대신 운영한다. 정적 사이트(빌드된 HTML/JS를 그대로 서빙)와 서버·함수 기반(요청마다 실행) 두 모델이 있으며, Firebase Hosting과 Vercel은 이를 각각 또는 함께 지원한다. (근거: Firebase·Vercel + build-and-runtime KB, 확인: 2026-07-08)

## 해결하려는 문제
- 전 세계 빠른 전달: CDN 엣지 캐시로 사용자 가까운 곳에서 서빙. (출처: Firebase Hosting, 확인: 2026-07-08)
- 보안 기본 제공: "Zero-configuration SSL" — 설정 없이 HTTPS로 안전하게 전달. (출처: Firebase Hosting, 확인: 2026-07-08)
- 배포의 추적·미리보기: 배포마다 고유 URL로 변경을 미리 확인. (출처: Vercel Deployments, 확인: 2026-07-08)

## 핵심 개념
1. **Firebase Hosting = 정적 CDN 호스팅**: "provides fast and secure hosting for your web app." 업로드 파일을 CDN 엣지에 캐시해 서빙한다. (출처: Firebase Hosting, 확인: 2026-07-08)
2. **CDN 엣지 캐시**: "Each file that you upload is cached on SSDs at CDN edges around the world and served as gzip or Brotli." 파일이 전 세계 엣지에 복제되어 가까운 곳에서 압축 전송된다. (출처: Firebase Hosting, 확인: 2026-07-08)
3. **기본 SSL**: "Zero-configuration SSL is built into Firebase Hosting, so content is always delivered securely." 설정 없이 HTTPS가 켜진다. (출처: Firebase Hosting, 확인: 2026-07-08)
4. **Vercel 배포 = 빌드 결과물**: "A deployment on Vercel is the result of a successful build of your project." 빌드가 성공해야 배포가 된다. (출처: Vercel Deployments, 확인: 2026-07-08)
5. **배포마다 고유 URL**: "Each time you deploy, Vercel generates a unique URL." 각 배포가 고유 주소를 가져 미리보기·롤백이 쉽다. (출처: Vercel Deployments, 확인: 2026-07-08)
6. **환경 구분**: Vercel은 Local·Preview·Production 세 환경을 두어, 운영에 영향 없이 미리보기로 검증한 뒤 승격한다. (출처: Vercel Deployments, 확인: 2026-07-08)

## 관련 기술
- 배포 플랫폼 ↔ build-and-runtime: 플랫폼이 build/release/run의 "run"을 담당한다. (출처: Firebase·Vercel + build-and-runtime KB, 확인: 2026-07-08)
- 정적 호스팅 ↔ nextjs-routing-rendering: 정적 빌드(output export)를 CDN에 올리는 것이 정적 배포 모델. 이 사이트가 그 방식. (출처: Firebase Hosting + nextjs KB, 확인: 2026-07-08)
- Git 연동 배포 ↔ github-pr-review-flow: Vercel은 커밋·PR마다 자동 배포를 트리거한다. (출처: Vercel Deployments, 확인: 2026-07-08)

## 선행 개념
- build-and-runtime: 플랫폼이 실행하는 build/release/run 3단계.

## 후행 개념
- deployment-cli-reference: firebase deploy·vercel 등 배포 CLI 명령.
- ci-cd-pipeline-basics: 커밋 시 자동 배포를 잇는 파이프라인.

## AI 시대에서의 의미
AI에게 "배포해줘"라고 하면 플랫폼별 명령·설정을 AI가 다루는데, 그 플랫폼이 정적 모델인지 서버 모델인지에 따라 되는 것과 안 되는 것이 갈린다 — 이 사이트처럼 정적 호스팅(Firebase)이면 서버 코드(런타임 API)가 동작하지 않으므로, AI가 서버 기능을 넣은 코드를 정적 배포하면 실패한다. "이 플랫폼은 무엇을 실행할 수 있는가"를 사람이 알아야 AI의 배포 구성을 검증할 수 있다. (근거: Firebase Hosting 정적 모델 + build-and-runtime KB, 확인: 2026-07-08)

## 실무 활용
1. 정적 사이트 배포: 빌드 산출물을 Firebase Hosting에 올려 CDN·SSL로 서빙. (출처: Firebase Hosting, 확인: 2026-07-08)
2. 미리보기 검증: Vercel Preview 환경에서 운영 영향 없이 확인 후 Production 승격. (출처: Vercel Deployments, 확인: 2026-07-08)
3. Git 연동 자동 배포: 커밋·PR마다 배포를 트리거해 변경을 즉시 미리보기. (출처: Vercel Deployments, 확인: 2026-07-08)
4. 롤백: 배포마다 고유 URL이 남으므로 이전 배포로 되돌리기 쉬움. (출처: Vercel Deployments, 확인: 2026-07-08)

## FAQ
Q: 정적 호스팅과 서버 배포의 차이는?
A: 정적 호스팅(Firebase 등)은 빌드된 파일을 CDN으로 그대로 서빙하고, 서버·함수 모델은 요청마다 코드를 실행한다. 정적 모델에서는 런타임 서버 코드가 동작하지 않는다. (근거: Firebase Hosting 모델, 확인: 2026-07-08)
Q: CDN이 왜 빠른가?
A: 파일이 전 세계 엣지에 캐시되어 사용자와 가까운 곳에서 압축(gzip/Brotli) 전송되기 때문이다. (출처: Firebase Hosting, 확인: 2026-07-08)
Q: 배포마다 URL이 다른 이유는?
A: Vercel은 각 배포에 고유 URL을 만들어 미리보기·비교·롤백을 쉽게 한다. (출처: Vercel Deployments, 확인: 2026-07-08)
Q: HTTPS를 따로 설정해야 하나?
A: Firebase Hosting은 zero-configuration SSL로 설정 없이 HTTPS가 기본 적용된다. (출처: Firebase Hosting, 확인: 2026-07-08)

## 자주 하는 실수
1. 실수: 정적 호스팅에 서버 코드 기대. 왜 생기나: 플랫폼 모델을 안 따짐. 교정: 정적 모델은 런타임 서버가 없음을 인지. (근거: Firebase 모델, 확인: 2026-07-08)
2. 실수: 검증 없이 바로 Production 배포. 왜 생기나: Preview 환경 미활용. 교정: Preview로 확인 후 승격. (출처: Vercel Deployments, 확인: 2026-07-08)
3. 실수: SSL을 수동 설정하려 함. 왜 생기나: 기본 제공을 모름. 교정: Firebase는 zero-config SSL. (출처: Firebase Hosting, 확인: 2026-07-08)
4. 실수: 롤백 방법을 미리 안 챙김. 왜 생기나: 배포별 URL 개념 모름. 교정: 배포마다 고유 URL로 이전 버전 복구. (출처: Vercel Deployments, 확인: 2026-07-08)

## 공식 출처
- 정적 CDN 호스팅·엣지 캐시·zero-config SSL — [Firebase Hosting](https://firebase.google.com/docs/hosting) (확인: 2026-07-08)
- 배포=빌드 결과물·고유 URL·환경 구분 — [Deploying to Vercel](https://vercel.com/docs/deployments) (확인: 2026-07-08)

## Quote Bank
- > "Firebase Hosting provides fast and secure hosting for your web app."
  - 출처: [Firebase Hosting](https://firebase.google.com/docs/hosting) (확인: 2026-07-08)
  - 맥락: Firebase Hosting의 정의 — 빠르고 안전한 호스팅
- > "Each file that you upload is cached on SSDs at CDN edges around the world and served as gzip or Brotli."
  - 출처: [Firebase Hosting](https://firebase.google.com/docs/hosting) (확인: 2026-07-08)
  - 맥락: CDN 엣지 캐시 — 전 세계 가까운 곳에서 압축 전송
- > "Zero-configuration SSL is built into Firebase Hosting, so content is always delivered securely."
  - 출처: [Firebase Hosting](https://firebase.google.com/docs/hosting) (확인: 2026-07-08)
  - 맥락: 기본 SSL — 설정 없이 HTTPS
- > "A deployment on Vercel is the result of a successful build of your project."
  - 출처: [Deploying to Vercel](https://vercel.com/docs/deployments) (확인: 2026-07-08)
  - 맥락: Vercel 배포의 정의 — 빌드 성공의 결과물
- > "Each time you deploy, Vercel generates a unique URL so you and your team can preview changes in a live environment."
  - 출처: [Deploying to Vercel](https://vercel.com/docs/deployments) (확인: 2026-07-08)
  - 맥락: 배포마다 고유 URL — 미리보기·롤백의 토대

## 변경 이력
- 2026-07-08: 최초 작성 (Fable — 대행, P-01)
