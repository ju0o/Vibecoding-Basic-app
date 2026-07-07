# 용어 초안: environment-variables-secrets

기존 glossary.ts 대조: 환경변수/secret/Twelve-Factor 미등재 확인 (2026-07-08). 신규 3개.

## Environment Variable (환경변수)
category: 백엔드
shortDefinition: 코드 바깥에서 프로그램에 값을 전달하는 설정 통로 — Node.js에서 process.env로 읽음
explanation: Node.js는 "process.env가 사용자 환경을 담은 객체를 반환한다"고 정의하며 process.env.API_KEY처럼 읽습니다. 값은 근본적으로 문자열이라 숫자·불리언은 코드에서 파싱해야 합니다. 같은 코드가 환경변수만 바꿔 개발·운영에서 다르게 동작하므로, 배포마다 달라지는 값을 코드에서 분리하는 표준 통로입니다.
related: [Secret, Twelve-Factor App, Data Type (DB)]

## Secret (시크릿)
category: 백엔드
shortDefinition: 유출되면 안 되는 자격 증명 — API 키, DB 비밀번호, 토큰. 코드가 아닌 환경변수로 관리
explanation: secret을 코드에 하드코딩하면 Git 이력에 영구히 남아, 나중에 지워도 과거 커밋에 남습니다. 환경변수로 분리하고 .env는 .gitignore로 제외하며, 실수로 커밋됐다면 이력 제거와 별개로 키를 회전(폐기·재발급)해야 합니다. 클라이언트에 노출되는 변수(NEXT_PUBLIC_ 등)에는 담으면 안 됩니다.
related: [Environment Variable, Twelve-Factor App, Authentication]

## Twelve-Factor App
category: 백엔드
shortDefinition: 설정을 코드에서 분리해 환경변수에 저장하는 것을 포함한 앱 설계 12원칙
explanation: 핵심 통찰은 "설정은 배포마다 크게 달라지지만 코드는 그렇지 않다"이며, 설정을 환경변수에 저장할 것을 권합니다. 분리가 잘 됐는지의 리트머스 테스트는 "지금 코드베이스를 오픈소스로 공개해도 자격 증명이 새지 않는가"입니다 — AI 코드의 하드코딩 검토 기준으로도 실용적입니다.
related: [Environment Variable, Secret]
