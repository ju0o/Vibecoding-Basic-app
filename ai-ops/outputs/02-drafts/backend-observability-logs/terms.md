# 용어 초안: backend-observability-logs

기존 glossary.ts 대조: 로그/관찰 가능성 미등재 확인 (2026-07-08). 신규 2개.

## Observability (관찰 가능성)
category: 백엔드
shortDefinition: 실행 중인 서버가 지금 무엇을 하는지 바깥에서 알 수 있는 정도
explanation: 화면 없는 서버의 동작을 알려면 시간순 이벤트 기록이 필요하며, 로그가 그 기본 수단입니다. 로그 위에 지표(metric)·추적(trace)·대시보드·알림이 얹혀 완성됩니다. "동작한다"와 "관찰 가능하다"는 다른 문제로, AI가 만든 서버는 명시하지 않으면 로그를 빈약하게 남겨 문제 원인 추적이 어려워집니다.
related: [Log, HTTP 상태 코드, Debugging]

## Log (로그)
category: 백엔드
shortDefinition: 실행 중 프로세스의 집계·시간순 이벤트 스트림 — 관찰의 기본 수단
explanation: Twelve-Factor는 로그를 "집계되고 시간순으로 정렬된 이벤트의 스트림"으로 정의하고, 앱은 이를 unbuffered로 stdout에 쓰며 저장·라우팅은 실행 환경에 위임하라고 규정합니다("앱은 출력 스트림의 저장에 결코 관여하지 않는다"). 시간·요청 ID·상태 코드를 담되 토큰·비밀번호 같은 secret은 남기지 않아야 합니다 — 로그는 저장·전송되므로 유출 경로가 됩니다.
related: [Observability, Environment Variable, Secret]
