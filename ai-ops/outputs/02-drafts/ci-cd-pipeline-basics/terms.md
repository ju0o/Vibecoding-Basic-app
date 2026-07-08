# 용어 초안: ci-cd-pipeline-basics

기존 glossary.ts 대조: CI/CD/워크플로 미등재 확인 (2026-07-08). 신규 3개.

## CI/CD
category: 배포·운영
shortDefinition: 코드 변경을 자동으로 빌드·테스트·배포하는 파이프라인 — 지속적 통합(CI)과 지속적 배포/전달(CD)
explanation: GitHub Actions는 CI/CD를 "빌드·테스트·배포 파이프라인을 자동화하는 플랫폼"으로 정의합니다. CI는 변경을 자주 통합하며 자동 빌드·테스트해 "안전한가"를 묻고, CD는 검증 통과분을 자동으로 배포 가능 상태로 만들거나 배포합니다. 검증 잡 통과에만 배포 잡이 실행되게 묶으면 깨진 코드 배포를 구조적으로 막습니다.
related: [Workflow (CI/CD), Deployment Platform, npm scripts]

## Workflow (CI/CD)
category: 배포·운영
shortDefinition: 하나 이상의 잡을 실행하는 설정 가능한 자동화 프로세스 — CI/CD의 최상위 단위
explanation: GitHub Actions 정의로 "하나 이상의 잡을 실행하는 설정 가능한 자동화된 프로세스"입니다. 이벤트(커밋·PR 등 저장소 활동)가 워크플로를 트리거하고, 워크플로는 잡을, 잡은 스텝(셸 스크립트 또는 액션)을 실행합니다. YAML 파일로 명시되어 파이프라인 자체가 코드로 관리·리뷰됩니다. 정해진 러너(서버)에서 일관되게 실행됩니다.
related: [CI/CD, Runner, pre/post script]

## Runner (러너)
category: 배포·운영
shortDefinition: 워크플로가 트리거될 때 그것을 실행하는 서버
explanation: GitHub Actions 정의로 "워크플로가 트리거될 때 그것을 실행하는 서버"입니다. 내 컴퓨터가 아니라 정해진 서버에서 언제나 같은 환경으로 실행되므로 "내 컴퓨터에서만 되는" 문제가 사라집니다. 잡은 같은 러너에서 실행되는 스텝의 묶음이며, 이 일관된 실행 환경이 CI/CD가 재현성을 보장하는 이유입니다.
related: [Workflow (CI/CD), CI/CD]
