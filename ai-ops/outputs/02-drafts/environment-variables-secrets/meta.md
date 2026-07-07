# 메타데이터 초안: environment-variables-secrets

- slug: environment-variables-secrets
- moduleId: data-backend
- order: 5
- type: deep-dive
- title: 환경변수와 secret 관리 — 코드에서 설정을 분리하기
- summary: 배포마다 달라지는 설정을 코드에서 빼내 process.env로 주입하고, secret은 .gitignore로 격리합니다 — "지금 공개해도 자격 증명이 안 새는가"가 분리의 리트머스 테스트입니다.
- level: 기초
- minutes: 45
- tags: ["환경변수", "secret", "설정", "보안", "Twelve-Factor"]
- kb: environment-variables-secrets
- format: V2 Deep Dive
- checklist/exercise: 없음
- diagram: config-separation.svg
