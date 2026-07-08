---
id: monitoring-errors-rollbacks
title: "모니터링, 오류 추적, 롤백 — 배포 후를 지키기"
topicGroup: T06
status: approved
score: 88
level: 중급
prerequisites: [ci-cd-pipeline-basics, backend-observability-logs]
successors: []
related: [deployment-platforms, api-security-rate-limits]
sources:
  - { title: "Performing an Instant Rollback on a Deployment — Vercel Documentation", url: "https://vercel.com/docs/instant-rollback", checked: 2026-07-08 }
  - { title: "The Twelve-Factor App: Logs", url: "https://12factor.net/logs", checked: 2026-07-08 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-08
---

## 정의
배포는 끝이 아니라 시작이다. 모니터링(monitoring)은 배포된 앱이 잘 돌아가는지 지켜보는 것, 오류 추적(error tracking)은 문제를 감지·기록하는 것, 롤백(rollback)은 문제 시 이전 상태로 되돌리는 것이다. Vercel은 롤백을 "Vercel provides Instant Rollback as a way to quickly revert to a previous production deployment"(이전 프로덕션 배포로 빠르게 되돌리는 방법)로 정의하며, 이는 "swift recovery from production incidents, like breaking changes or bugs"(깨진 변경·버그 같은 운영 사고에서 신속 복구)에 유용하다. 관찰의 토대는 로그 — "Logs are the stream of aggregated, time-ordered events"이다. (출처: Vercel Instant Rollback·12factor Logs, 확인: 2026-07-08)

## 역사
CI/CD로 배포를 자동화해도(ci-cd-pipeline-basics), 배포 후 실제 사용자 환경에서 무슨 일이 일어나는지는 별개 문제다. 테스트가 잡지 못한 문제는 운영에서 드러나므로, 배포 후의 관찰(backend-observability-logs의 로그)과 문제 시 되돌리기(롤백)가 짝을 이룬다. "빠르게 감지하고 빠르게 되돌린다"가 운영의 기본 리듬이다. (근거: Vercel Instant Rollback + observability KB, 확인: 2026-07-08)

## 해결하려는 문제
- 배포 후 문제 감지: 로그·지표로 오류·이상을 관찰. (출처: 12factor Logs, 확인: 2026-07-08)
- 신속한 복구: 롤백으로 사용자 피해 시간을 최소화. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
- 원인보다 복구 우선: 먼저 정상으로 되돌리고 원인은 그 다음. (근거: Vercel "swift recovery" 취지, 확인: 2026-07-08)

## 핵심 개념
1. **모니터링 = 지켜보기**: 로그(시간순 이벤트 스트림)와 지표로 "지금 정상인가"를 관찰한다. 429·5xx 급증, 응답 지연 증가가 이상 신호다. (출처: 12factor Logs + observability KB, 확인: 2026-07-08)
2. **오류 추적**: 발생한 오류를 감지·수집·집계해 "무엇이, 언제, 얼마나" 터졌는지 파악한다. 로그가 그 근거다. (근거: 12factor Logs, 확인: 2026-07-08)
3. **롤백 = 이전 배포로 복귀**: "quickly revert to a previous production deployment." 새로 빌드하지 않고 과거의 검증된 배포로 되돌린다. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
4. **즉시성**: "The rollback happens instantaneously." 도메인을 이전 배포로 다시 가리켜 즉각 복구한다. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
5. **롤백 후 자동 배포 중단**: "After a rollback, Vercel turns off auto-assignment of production domains." 롤백 상태에서는 새 push가 자동으로 나가지 않아, 되돌린 상태가 지켜진다. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
6. **롤백의 한계**: 롤백은 코드·도메인을 되돌리지만 외부 상태(DB·외부 API)는 되돌리지 않는다 — Vercel도 "changing behavior of external APIs, databases"에 주의를 준다. (출처: Vercel Instant Rollback, 확인: 2026-07-08)

## 관련 기술
- 모니터링 ↔ backend-observability-logs: 로그가 모니터링·오류 추적의 근거 데이터다. (출처: 12factor Logs + observability KB, 확인: 2026-07-08)
- 롤백 ↔ deployment-platforms: 배포마다 고유 URL·기록이 남기에 이전 배포로 되돌릴 수 있다. (출처: Vercel Instant Rollback + 배포 플랫폼 KB, 확인: 2026-07-08)
- 신호 ↔ api-security-rate-limits: 429·5xx 급증이 모니터링의 대표 이상 신호. (근거: rate-limits/observability KB, 확인: 2026-07-08)

## 선행 개념
- ci-cd-pipeline-basics: 자동 배포 후의 관찰·복구가 이 강의.
- backend-observability-logs: 모니터링의 근거인 로그.

## 후행 개념
- 장애 대응식 AI 디버깅 (예정): 모니터링 신호로 시작하는 실전 디버깅.

## AI 시대에서의 의미
AI가 만든 코드를 배포한 뒤에도 관찰이 필요하다 — 테스트가 통과했다고 운영에서 문제가 없는 것은 아니기 때문이다. 문제가 감지되면 원인 분석보다 롤백(신속 복구)이 먼저다: 사용자가 깨진 화면을 보는 시간을 줄이는 것이 우선이고, 원인은 되돌린 뒤 로그로 분석한다. AI에게 "배포 후 모니터링·롤백 계획"까지 요구하지 않으면 이 사후 안전망이 빠지기 쉬우므로, 사람이 챙겨야 할 지점이다. (근거: Vercel Instant Rollback + observability KB, 확인: 2026-07-08)

## 실무 활용
1. 관찰 지표 정하기: 429·5xx·응답 지연 등 이상 신호를 로그·대시보드로 모니터링. (출처: 12factor Logs, 확인: 2026-07-08)
2. 롤백 절차 사전 확인: 배포 전에 "문제 시 어떻게 되돌리나"를 확인. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
3. 복구 우선 대응: 사고 시 즉시 롤백 → 정상화 → 원인 분석. (출처: Vercel "swift recovery", 확인: 2026-07-08)
4. 외부 상태 점검: 롤백이 DB·외부 API 상태는 되돌리지 않으므로 별도 확인. (출처: Vercel Instant Rollback, 확인: 2026-07-08)

## FAQ
Q: 롤백은 어떻게 동작하나?
A: 새로 빌드하지 않고 도메인을 이전 배포로 다시 가리켜, 즉시 이전 프로덕션 상태로 되돌린다. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
Q: 롤백하면 자동 배포는?
A: 롤백 후에는 프로덕션 도메인 자동 할당이 꺼져, 새 push가 자동으로 나가지 않는다. 정상 배포로 돌아가려면 별도 승격이 필요하다. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
Q: 롤백하면 모든 게 되돌아가나?
A: 아니다. 코드·도메인은 되돌리지만 DB·외부 API 같은 외부 상태는 되돌리지 않으므로 별도 확인이 필요하다. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
Q: 문제가 생기면 원인부터 찾아야 하나?
A: 아니다. 먼저 롤백으로 정상화해 사용자 피해를 줄이고, 원인은 그 뒤 로그로 분석하는 것이 순서다. (근거: Vercel "swift recovery" + observability KB, 확인: 2026-07-08)

## 자주 하는 실수
1. 실수: 배포 후 관찰을 안 함. 왜 생기나: "테스트 통과=끝"으로 오해. 교정: 운영 지표를 모니터링. (근거: observability KB, 확인: 2026-07-08)
2. 실수: 사고 시 원인부터 파느라 복구 지연. 왜 생기나: 복구·분석 순서 혼동. 교정: 롤백으로 먼저 정상화. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
3. 실수: 롤백이 외부 상태까지 되돌린다고 오해. 왜 생기나: 롤백 범위 misunderstanding. 교정: DB·외부 API는 별도 점검. (출처: Vercel Instant Rollback, 확인: 2026-07-08)
4. 실수: 롤백 후 자동 배포가 켜진 줄 알고 방치. 왜 생기나: 자동 할당 중단을 모름. 교정: 정상화하려면 명시적 승격. (출처: Vercel Instant Rollback, 확인: 2026-07-08)

## 공식 출처
- Instant Rollback 정의·즉시성·자동 배포 중단·외부 상태 주의 — [Performing an Instant Rollback](https://vercel.com/docs/instant-rollback) (확인: 2026-07-08)
- 모니터링의 근거인 로그(이벤트 스트림) — [Twelve-Factor App: Logs](https://12factor.net/logs) (확인: 2026-07-08)

## Quote Bank
- > "Vercel provides Instant Rollback as a way to quickly revert to a previous production deployment."
  - 출처: [Performing an Instant Rollback](https://vercel.com/docs/instant-rollback) (확인: 2026-07-08)
  - 맥락: 롤백의 정의 — 이전 프로덕션 배포로 빠르게 복귀
- > "This can be useful in situations that require a swift recovery from production incidents, like breaking changes or bugs."
  - 출처: [Performing an Instant Rollback](https://vercel.com/docs/instant-rollback) (확인: 2026-07-08)
  - 맥락: 롤백의 용도 — 운영 사고의 신속 복구
- > "The rollback happens instantaneously."
  - 출처: [Performing an Instant Rollback](https://vercel.com/docs/instant-rollback) (확인: 2026-07-08)
  - 맥락: 롤백의 즉시성
- > "After a rollback, Vercel turns off auto-assignment of production domains."
  - 출처: [Performing an Instant Rollback](https://vercel.com/docs/instant-rollback) (확인: 2026-07-08)
  - 맥락: 롤백 후 자동 배포 중단 — 되돌린 상태 보호
- > "Logs are the stream of aggregated, time-ordered events collected from the output streams of all running processes and backing services."
  - 출처: [Twelve-Factor App: Logs](https://12factor.net/logs) (확인: 2026-07-08)
  - 맥락: 모니터링·오류 추적의 근거인 로그의 정의

## 변경 이력
- 2026-07-08: 최초 작성 (Fable — 대행, P-01)
