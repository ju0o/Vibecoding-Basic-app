---
id: build-and-runtime
title: "빌드 타임과 런타임 — 코드가 실행되기까지의 세 단계"
topicGroup: T06
status: draft
score: 0
level: 기초
prerequisites: [nextjs-routing-rendering, environment-variables-secrets]
successors: [deployment-platforms]
related: [package-json-and-semver]
sources:
  - { title: "The Twelve-Factor App: Build, release, run", url: "https://12factor.net/build-release-run", checked: 2026-07-08 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-08
---

## 정의
빌드 타임(build time)과 런타임(runtime)은 코드가 "만들어지는 때"와 "실행되는 때"를 가르는 구분이다. Twelve-Factor App은 코드가 사용자에게 도달하기까지를 세 단계로 나눈다: build(빌드), release(릴리스), run(실행). "The build stage is a transform which converts a code repo into an executable bundle known as a build"(빌드 단계는 코드 저장소를 실행 가능한 번들로 변환한다), release는 그 빌드에 설정을 결합하며, "The run stage (also known as runtime) runs the app in the execution environment"(실행/런타임 단계는 실행 환경에서 앱을 구동한다). (출처: 12factor Build, release, run, 확인: 2026-07-08)

## 역사
"언제 무엇이 확정되는가"의 혼란을 없애기 위해 Twelve-Factor는 세 단계를 엄격히 분리한다 — "The twelve-factor app uses strict separation between the build, release, and run stages." 이 분리 덕분에 빌드는 개발자가, 실행은 서버가 담당하고, 그 사이 릴리스가 설정을 주입한다. nextjs-routing-rendering 강의에서 본 정적 빌드(빌드 시점에 HTML 생성)와 동적 렌더링(런타임에 생성)의 구분이 이 큰 그림의 한 사례다. (출처: 12factor Build, release, run + nextjs KB, 확인: 2026-07-08)

## 해결하려는 문제
- "언제 값이 확정되나" 명확화: 빌드 시점에 박히는 값과 런타임에 읽는 값을 구분. (근거: 12factor + env KB, 확인: 2026-07-08)
- 배포의 재현성: 같은 빌드를 여러 환경에서 실행 — 빌드는 한 번, 실행은 여러 번. (출처: 12factor Build, release, run, 확인: 2026-07-08)
- 런타임 수정 금지: "impossible to make changes to the code at runtime" — 실행 중 코드를 못 바꾸므로 문제는 빌드부터 다시. (출처: 12factor, 확인: 2026-07-08)

## 핵심 개념
1. **빌드 단계**: "converts a code repo into an executable bundle known as a build." 소스 코드를 실행 가능한 번들로 변환(컴파일·번들링). 개발자의 코드가 배포 가능한 산출물이 되는 때. (출처: 12factor, 확인: 2026-07-08)
2. **릴리스 단계**: 빌드에 "the deploy's current config"를 결합한다. 같은 빌드라도 개발·운영 설정을 달리 주입해 서로 다른 릴리스가 된다. (출처: 12factor, 확인: 2026-07-08)
3. **실행(런타임) 단계**: "runs the app in the execution environment, by launching some set of the app's processes." 실제로 앱이 돌아가는 때. (출처: 12factor, 확인: 2026-07-08)
4. **엄격한 분리**: "strict separation between the build, release, and run stages." 세 단계가 섞이지 않아야 재현성·안정성이 확보된다. (출처: 12factor, 확인: 2026-07-08)
5. **런타임 코드 수정 불가**: "it is impossible to make changes to the code at runtime, since there is no way to propagate those changes back to the build stage." 실행 중 고친 것은 빌드로 못 돌아가므로, 수정은 빌드부터 다시 시작한다. (출처: 12factor, 확인: 2026-07-08)
6. **빌드 타임 값 vs 런타임 값**: 빌드 시점에 번들에 박히는 값(정적)과 실행 시점에 환경에서 읽는 값(동적)이 다르다 — 이 사이트의 비밀번호 해시가 빌드 타임에 박혀, 바꾸면 재빌드가 필요한 것이 그 예다. (근거: 12factor + env KB, 확인: 2026-07-08)

## 관련 기술
- 빌드/런타임 ↔ nextjs-routing-rendering: 정적 빌드(빌드 타임 HTML)와 동적 렌더링(런타임 HTML)이 이 구분의 프론트엔드 사례. (출처: 12factor + nextjs KB, 확인: 2026-07-08)
- 릴리스 ↔ environment-variables-secrets: 릴리스가 "빌드 + 설정"이므로, 환경변수가 주입되는 지점이 릴리스다. (출처: 12factor + env KB, 확인: 2026-07-08)
- 빌드 ↔ package-json-and-semver: npm 스크립트(build)가 빌드 단계를 실행한다. (근거: package-json KB, 확인: 2026-07-08)

## 선행 개념
- nextjs-routing-rendering: 정적/동적 렌더링이 빌드/런타임 구분의 사례.
- environment-variables-secrets: 릴리스에서 주입되는 설정.

## 후행 개념
- deployment-platforms: 이 세 단계를 실제로 수행하는 배포 플랫폼들.

## AI 시대에서의 의미
AI가 "배포가 안 돼요"를 도울 때, 오류가 빌드 단계인지 런타임 단계인지를 먼저 가려야 한다 — 빌드 오류(컴파일·타입·번들)와 런타임 오류(실행 중 예외)는 원인도 해결도 다르다. 또 AI가 "환경변수를 바꿨는데 반영이 안 돼요"라고 할 때, 그 값이 빌드 타임에 박히는 종류(NEXT_PUBLIC_ 등)라면 ==재빌드가 필요==하다는 것을 사람이 알아야 한다. "언제 확정되는 값인가"의 구분이 배포 디버깅의 첫 질문이다. (근거: 12factor + env KB, 확인: 2026-07-08)

## 실무 활용
1. 오류 구간 판별: 실패가 빌드 로그인지 런타임 로그인지로 원인 구간을 좁힘. (출처: 12factor 3단계, 확인: 2026-07-08)
2. 빌드 1회·실행 N회: 같은 빌드 산출물을 여러 환경에 배포해 재현성 확보. (출처: 12factor, 확인: 2026-07-08)
3. 설정은 릴리스에서: 코드가 아니라 릴리스 시점에 환경변수를 주입. (출처: 12factor + env KB, 확인: 2026-07-08)
4. 빌드 타임 값 변경 시 재빌드: 번들에 박히는 값은 바꾸면 다시 빌드·배포. (근거: env KB, 확인: 2026-07-08)

## FAQ
Q: 빌드 타임과 런타임의 차이는?
A: 빌드 타임은 코드를 실행 가능한 번들로 변환하는 때, 런타임은 그 번들을 실행 환경에서 구동하는 때다. 빌드는 한 번, 실행은 여러 번 일어난다. (출처: 12factor, 확인: 2026-07-08)
Q: 릴리스는 뭐가 다른가?
A: 릴리스는 빌드에 그 배포의 설정을 결합한 것이다. 같은 빌드라도 설정이 다르면 다른 릴리스가 된다. (출처: 12factor, 확인: 2026-07-08)
Q: 실행 중에 코드를 고칠 수 없나?
A: 없다. 런타임의 변경은 빌드 단계로 전파될 방법이 없으므로, 수정은 빌드부터 다시 해야 한다. (출처: 12factor, 확인: 2026-07-08)
Q: 환경변수를 바꿨는데 왜 반영이 안 되나?
A: 그 값이 빌드 타임에 번들로 박히는 종류라면 재빌드·재배포가 필요하다. 런타임에 읽는 값이라면 재시작으로 반영된다. (근거: 12factor + env KB, 확인: 2026-07-08)

## 자주 하는 실수
1. 실수: 빌드 오류를 런타임에서 찾음. 왜 생기나: 두 단계를 구분 안 함. 교정: 빌드 로그와 런타임 로그를 먼저 나눠 봄. (출처: 12factor, 확인: 2026-07-08)
2. 실수: 빌드 타임 값 변경 후 재빌드 안 함. 왜 생기나: 정적/동적 값 구분 모름. 교정: 번들에 박히는 값은 재빌드. (근거: env KB, 확인: 2026-07-08)
3. 실수: 실행 중 서버 파일을 직접 수정. 왜 생기나: 런타임 수정이 지속된다고 오해. 교정: 수정은 빌드부터 — 런타임 변경은 전파 안 됨. (출처: 12factor, 확인: 2026-07-08)
4. 실수: 환경마다 따로 빌드. 왜 생기나: 빌드 1회 원칙 무시. 교정: 같은 빌드를 릴리스 설정만 달리해 배포. (출처: 12factor, 확인: 2026-07-08)

## 공식 출처
- build/release/run 3단계·엄격한 분리·런타임 수정 불가 — [Twelve-Factor App: Build, release, run](https://12factor.net/build-release-run) (확인: 2026-07-08)

## Quote Bank
- > "The build stage is a transform which converts a code repo into an executable bundle known as a build."
  - 출처: [Twelve-Factor App: Build, release, run](https://12factor.net/build-release-run) (확인: 2026-07-08)
  - 맥락: 빌드 단계의 정의 — 코드를 실행 가능한 번들로 변환
- > "The run stage (also known as \"runtime\") runs the app in the execution environment, by launching some set of the app's processes."
  - 출처: [Twelve-Factor App: Build, release, run](https://12factor.net/build-release-run) (확인: 2026-07-08)
  - 맥락: 실행/런타임 단계의 정의 — 실행 환경에서 앱 구동
- > "The twelve-factor app uses strict separation between the build, release, and run stages."
  - 출처: [Twelve-Factor App: Build, release, run](https://12factor.net/build-release-run) (확인: 2026-07-08)
  - 맥락: 세 단계의 엄격한 분리 원칙
- > "For example, it is impossible to make changes to the code at runtime, since there is no way to propagate those changes back to the build stage."
  - 출처: [Twelve-Factor App: Build, release, run](https://12factor.net/build-release-run) (확인: 2026-07-08)
  - 맥락: 런타임 코드 수정 불가 — 수정은 빌드부터

## 변경 이력
- 2026-07-08: 최초 작성 (Fable — 대행, P-01)
