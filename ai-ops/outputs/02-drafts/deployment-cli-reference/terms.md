# 용어 초안: deployment-cli-reference

기존 glossary.ts 대조: 배포CLI 미등재 확인 (2026-07-08). 신규 2개.

## Deployment CLI (배포 CLI)
category: 배포·운영
shortDefinition: 배포 플랫폼을 터미널에서 조작하는 명령줄 도구 — vercel·firebase 등
explanation: Vercel CLI는 "터미널이나 자동화 시스템으로 플랫폼과 상호작용"한다고 소개합니다. vercel deploy(배포)·rollback(복구)·promote(승격)·list/logs(조회)·login(인증)이 대표 명령이며, 이 사이트는 firebase-tools로 firebase deploy --only hosting을 실행합니다. 웹 버튼을 명령으로 옮겨 스크립트·CI/CD·AI 에이전트가 배포를 실행할 수 있게 하며, npm run deploy로 감싸 표준화합니다.
related: [Deployment Platform, npm scripts, Rollback]

## Deploy Token (배포 토큰)
category: 배포·운영
shortDefinition: 프로덕션을 배포·롤백할 수 있는 강력한 자격 증명 — 인자가 아니라 환경변수로 다룸
explanation: CI/CD에서 사람이 로그인할 수 없으므로 토큰으로 인증합니다. Vercel 문서는 VERCEL_TOKEN 환경변수 사용을 권하는데, 토큰을 명령 인자로 넘기면 "프로세스 목록과 로그에 노출될 수 있기" 때문입니다. 유출되면 남이 사이트를 배포·훼손할 수 있으므로, 코드·인자·로그 어디에도 평문으로 남기지 말고 secret 저장소나 환경변수로만 다뤄야 합니다.
related: [Deployment CLI, Secret, Environment Variable]
