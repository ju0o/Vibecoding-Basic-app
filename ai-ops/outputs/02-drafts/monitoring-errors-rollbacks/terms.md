# 용어 초안: monitoring-errors-rollbacks

기존 glossary.ts 대조: 모니터링/롤백 미등재 확인 (2026-07-08). 신규 2개.

## Monitoring (모니터링)
category: 배포·운영
shortDefinition: 배포된 앱이 잘 돌아가는지 로그·지표로 지켜보는 것 — 이상 신호를 감지하는 관찰
explanation: 근거 데이터는 로그(시간순 이벤트 스트림)입니다. 429·5xx 급증, 응답 지연 증가, 특정 엔드포인트 오류 집중이 이상 신호이며, "평소를 알아야 이상이 보인다"가 핵심입니다. 테스트는 배포 전 검증이고 모니터링은 배포 후 현실이라, 테스트가 재현 못한 실제 사용자·데이터·부하의 문제를 드러냅니다. 무엇을 볼지 정한 만큼만 보므로 계속 범위를 넓혀갑니다.
related: [Log, Rollback, Observability]

## Rollback (롤백)
category: 배포·운영
shortDefinition: 문제 시 이전 프로덕션 배포로 빠르게 되돌려 복구하는 것 — 원인 분석보다 먼저
explanation: Vercel Instant Rollback은 "이전 프로덕션 배포로 빠르게 되돌리는 방법"으로, 새로 빌드하지 않고 도메인을 이전 배포로 재지정해 즉시 복구합니다("instantaneously"). 배포마다 고유 URL이 남기에 되돌아갈 지점이 보존됩니다. 롤백 후 자동 배포는 꺼져 되돌린 상태가 지켜지며, 코드·도메인은 되돌리지만 DB·외부 API 같은 외부 상태는 되돌리지 않으므로 별도 점검이 필요합니다.
related: [Monitoring, Deployment Platform, Log]
