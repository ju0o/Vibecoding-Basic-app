# 용어 초안: build-and-runtime

기존 glossary.ts 대조: 빌드/런타임/릴리스 미등재 확인 (2026-07-08). 신규 3개.

## Build Time (빌드 타임)
category: 배포·운영
shortDefinition: 코드를 실행 가능한 번들로 변환하는 때 — 이 시점에 박힌 값은 재빌드해야 바뀜
explanation: Twelve-Factor는 빌드를 "코드 저장소를 실행 가능한 번들로 변환하는 과정"으로 정의합니다. TypeScript 컴파일·번들링·최적화가 여기서 일어나며, 빌드 시점에 번들에 박히는 값(정적)은 실행 중 재시작으로는 바뀌지 않고 재빌드가 필요합니다. Next.js의 NEXT_PUBLIC_ 접두사 변수가 대표적 빌드 타임 값입니다.
related: [Runtime, Release (배포 단계), Environment Variable]

## Runtime (런타임)
category: 배포·운영
shortDefinition: 빌드된 앱을 실행 환경에서 구동하는 때 — 실행 중 코드는 바꿀 수 없음
explanation: Twelve-Factor 정의로 "앱의 프로세스들을 구동해 실행 환경에서 앱을 돌리는" 단계입니다. 런타임에 읽는 값(동적)은 재시작으로 반영되지만, 런타임에 코드를 바꾸는 것은 불가능합니다 — 그 변경을 빌드 단계로 되돌릴 방법이 없기 때문입니다. 모든 코드 수정은 빌드부터 다시 시작해야 합니다.
related: [Build Time, Release (배포 단계), Log]

## Release (배포 단계)
category: 배포·운영
shortDefinition: 빌드 산출물에 그 배포의 설정을 결합하는 중간 단계 — 같은 빌드도 설정이 다르면 다른 릴리스
explanation: Twelve-Factor의 build→release→run 중 가운데 단계로, "빌드 + 그 배포의 현재 설정"입니다. 같은 빌드를 개발·운영 설정과 각각 결합해 서로 다른 릴리스를 만들므로, 환경변수가 주입되는 지점이 바로 릴리스입니다. "빌드 1회, 릴리스는 환경마다"가 재현성의 핵심입니다.
related: [Build Time, Runtime, Environment Variable]
