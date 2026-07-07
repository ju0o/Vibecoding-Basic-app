# 메타데이터 초안: api-security-rate-limits

- slug: api-security-rate-limits
- moduleId: data-backend
- order: 6
- type: deep-dive
- title: API 보안과 rate limit — 남용을 막는 설계
- summary: rate limit은 요청 수에 상한을 둬 남용을 막고, 초과 시 429+Retry-After로 "속도를 늦추라"고 안내합니다 — 429는 4xx(클라이언트 책임)이며 재시도는 Retry-After를 존중해야 합니다.
- level: 중급
- minutes: 45
- tags: ["API 보안", "rate limit", "429", "Retry-After", "백엔드"]
- kb: api-security-rate-limits
- format: V2 Deep Dive
- checklist/exercise: 없음
- diagram: rate-limit-flow.svg
