# 용어 초안: npm-scripts-reference

기존 glossary.ts 대조: npm scripts/pre-post 미등재 확인 (2026-07-08). 신규 2개.

## npm scripts
category: 배포·운영
shortDefinition: package.json의 scripts 필드에 이름-명령으로 정의해 npm run으로 실행하는 프로젝트 명령
explanation: npm 문서는 scripts 필드가 "내장 스크립트와 사전 설정된 생명주기 이벤트, 임의 스크립트를 지원한다"고 설명합니다. 긴 명령을 짧은 이름 뒤에 감춰 팀·AI가 같은 방식(npm run <이름>)으로 같은 작업을 하게 하며, scripts 필드 자체가 "이 프로젝트를 어떻게 실행하나"의 목차 역할을 합니다. npm run은 npm run-script의 짧은 형태입니다.
related: [package.json, pre/post script, Build Time]

## pre/post script
category: 배포·운영
shortDefinition: 대상 스크립트 실행 시 이름 앞뒤에 붙어 자동 실행되는 npm 훅
explanation: npm 문서에 따르면 "이름이 일치하는 pre·post 명령도 함께 실행된다"(premyscript, myscript, postmyscript). npm run build가 prebuild→build→postbuild 순으로 자동 실행되어, "빌드 전 정리·배포 전 검증" 같은 앞뒤 작업을 명령에 엮습니다. 앞 단계가 실패하면 뒤 단계는 실행되지 않습니다. 자동 실행이라 모르면 디버깅이 어려우므로 의도적으로 써야 합니다.
related: [npm scripts, package.json]
