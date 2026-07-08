---
id: ci-cd-pipeline-basics
title: "CI/CD 파이프라인 기초 — 커밋에서 배포까지 자동화"
topicGroup: T06
status: approved
score: 89
level: 중급
prerequisites: [github-pr-review-flow, build-and-runtime]
successors: [monitoring-errors-rollbacks]
related: [npm-scripts-reference]
sources:
  - { title: "Understanding GitHub Actions — GitHub Docs", url: "https://docs.github.com/en/actions/about-github-actions/understanding-github-actions", checked: 2026-07-08 }
consumers:
  lessons: [ci-cd-pipeline-basics]
  glossary: [CI/CD, Workflow (CI/CD), Runner]
updated: 2026-07-08
---

## 정의
CI/CD는 지속적 통합(Continuous Integration)과 지속적 배포/전달(Continuous Delivery)로, 코드 변경을 자동으로 빌드·테스트·배포하는 파이프라인이다. GitHub Actions는 "a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline"(빌드·테스트·배포 파이프라인을 자동화하는 CI/CD 플랫폼)이라 정의된다. 핵심 단위는 워크플로(workflow) — "a configurable automated process that will run one or more jobs"(하나 이상의 잡을 실행하는 설정 가능한 자동 프로세스)이다. (출처: Understanding GitHub Actions, 확인: 2026-07-08)

## 역사
사람이 매번 손으로 빌드·테스트·배포하면 실수가 나고 느리다. CI/CD는 이 반복을 자동화해, github-pr-review-flow 강의의 PR과 결합한다 — 커밋이나 PR이 이벤트가 되어 워크플로를 자동 실행하고, 테스트가 통과해야 병합·배포가 진행된다. npm-scripts 강의의 `npm run verify` 같은 명령이 이 파이프라인의 한 스텝으로 들어간다. (근거: Understanding GitHub Actions + PR/npm-scripts KB, 확인: 2026-07-08)

## 해결하려는 문제
- 수동 반복 제거: 빌드·테스트·배포를 자동화해 실수와 시간을 줄임. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
- 병합 전 검증 강제: 이벤트(PR 등)가 워크플로를 트리거해 테스트를 자동 실행. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
- 일관된 실행 환경: 워크플로가 정해진 러너에서 같은 절차로 실행. (출처: Understanding GitHub Actions, 확인: 2026-07-08)

## 핵심 개념
1. **CI/CD 플랫폼**: GitHub Actions는 "automate your build, test, and deployment pipeline"을 하는 CI/CD 플랫폼이다. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
2. **워크플로(workflow)**: "a configurable automated process that will run one or more jobs." 자동화의 최상위 단위. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
3. **이벤트(event)**: "a specific activity in a repository that triggers a workflow run." 커밋·PR 등이 워크플로를 촉발한다. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
4. **잡(job)과 스텝(step)**: "A job is a set of steps in a workflow that is executed on the same runner." 각 스텝은 "either a shell script that will be executed, or an action that will be run." (출처: Understanding GitHub Actions, 확인: 2026-07-08)
5. **액션(action)**: "a pre-defined, reusable set of jobs or code that performs specific tasks within a workflow." 재사용 가능한 작업 단위. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
6. **러너(runner)**: "a server that runs your workflows when they're triggered." 워크플로가 실제로 실행되는 서버. (출처: Understanding GitHub Actions, 확인: 2026-07-08)

## 관련 기술
- CI/CD ↔ github-pr-review-flow: PR이 이벤트가 되어 워크플로를 트리거하고, 검사 통과가 병합 게이트가 된다. (출처: Understanding GitHub Actions + PR KB, 확인: 2026-07-08)
- 스텝 ↔ npm-scripts-reference: 워크플로 스텝이 `npm run verify`·`npm run build` 같은 스크립트를 실행한다. (출처: Understanding GitHub Actions + npm-scripts KB, 확인: 2026-07-08)
- CD ↔ deployment-platforms: 테스트 통과 후 배포 플랫폼으로 자동 배포하는 것이 CD. (근거: Understanding GitHub Actions + 배포 플랫폼 KB, 확인: 2026-07-08)

## 선행 개념
- github-pr-review-flow: PR과 이벤트가 워크플로를 트리거하는 맥락.
- build-and-runtime: 파이프라인이 자동화하는 build/test/deploy.

## 후행 개념
- monitoring-errors-rollbacks: 배포 후 관찰과 문제 시 롤백.

## AI 시대에서의 의미
AI에게 "CI 설정해줘"라고 하면 워크플로 YAML을 만드는데, 그 파이프라인이 무엇을 검증하는지를 사람이 알아야 한다 — 테스트·타입 검사·빌드가 포함됐는지, secret이 로그에 노출되지 않는지(env·observability 강의의 원칙), 배포 스텝이 검증 통과에만 실행되는지. AI가 만든 워크플로는 "동작하는 자동화"일 수 있지만 "안전한 게이트"인지는 별개이므로, 각 스텝의 목적과 순서를 검토해야 한다. (근거: Understanding GitHub Actions + env/observability KB, 확인: 2026-07-08)

## 실무 활용
1. PR 검증 워크플로: PR 이벤트에 테스트·린트·빌드 잡을 걸어 병합 전 자동 검증. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
2. 스텝으로 npm 스크립트 실행: `npm ci` → `npm run verify` → `npm run build`를 스텝으로 구성. (출처: Understanding GitHub Actions + npm-scripts KB, 확인: 2026-07-08)
3. 재사용 액션 활용: 체크아웃·환경 설정 등 반복 작업을 액션으로. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
4. CD 연결: 검증 통과 시 배포 플랫폼으로 자동 배포. (근거: 배포 플랫폼 KB, 확인: 2026-07-08)

## FAQ
Q: CI와 CD의 차이는?
A: CI(지속적 통합)는 변경을 자주 통합하며 자동 빌드·테스트하는 것, CD(지속적 배포/전달)는 그 결과를 자동으로 배포 가능 상태로 만들거나 배포하는 것이다. GitHub Actions는 둘 다의 플랫폼이다. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
Q: 워크플로는 언제 실행되나?
A: 이벤트(커밋 push, PR 등 저장소의 특정 활동)가 워크플로 실행을 트리거한다. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
Q: 잡과 스텝의 관계는?
A: 잡은 같은 러너에서 실행되는 스텝의 묶음이고, 각 스텝은 셸 스크립트이거나 액션이다. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
Q: 액션은 무엇인가?
A: 워크플로 안에서 특정 작업을 하는 재사용 가능한 미리 정의된 코드/잡 묶음이다. (출처: Understanding GitHub Actions, 확인: 2026-07-08)

## 자주 하는 실수
1. 실수: 검증 없이 배포 스텝만 자동화. 왜 생기나: CI(검증) 없이 CD(배포)만 붙임. 교정: 테스트·빌드 잡을 배포 앞에 배치. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
2. 실수: secret을 워크플로 로그에 노출. 왜 생기나: 환경변수 취급 부주의. 교정: secret은 마스킹·secret 저장소로(env·observability 원칙). (근거: env/observability KB, 확인: 2026-07-08)
3. 실수: 배포가 검증 실패에도 실행. 왜 생기나: 잡 의존·조건 미설정. 교정: 검증 잡 통과에만 배포 실행. (출처: Understanding GitHub Actions, 확인: 2026-07-08)
4. 실수: 모든 작업을 한 거대한 스텝에. 왜 생기나: 잡·스텝 구조 미활용. 교정: 의미 단위로 스텝·잡 분리해 실패 지점 파악 쉽게. (출처: Understanding GitHub Actions, 확인: 2026-07-08)

## 공식 출처
- CI/CD 플랫폼 정의·워크플로/이벤트/잡/스텝/액션/러너 — [Understanding GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) (확인: 2026-07-08)

## Quote Bank
- > "GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline."
  - 출처: [Understanding GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) (확인: 2026-07-08)
  - 맥락: CI/CD 플랫폼의 정의 — 빌드·테스트·배포 자동화
- > "A workflow is a configurable automated process that will run one or more jobs."
  - 출처: [Understanding GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) (확인: 2026-07-08)
  - 맥락: 워크플로의 정의 — 자동화의 최상위 단위
- > "An event is a specific activity in a repository that triggers a workflow run."
  - 출처: [Understanding GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) (확인: 2026-07-08)
  - 맥락: 이벤트 — 커밋·PR이 워크플로를 촉발
- > "A job is a set of steps in a workflow that is executed on the same runner."
  - 출처: [Understanding GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) (확인: 2026-07-08)
  - 맥락: 잡 — 같은 러너에서 실행되는 스텝 묶음
- > "A runner is a server that runs your workflows when they're triggered."
  - 출처: [Understanding GitHub Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) (확인: 2026-07-08)
  - 맥락: 러너 — 워크플로가 실제로 실행되는 서버

## 변경 이력
- 2026-07-08: 최초 작성 (Fable — 대행, P-01)
