# 메타데이터 초안: auth-session-token

- slug: auth-session-token
- moduleId: data-backend
- order: 4
- type: deep-dive
- title: 인증, 세션, 토큰 — 로그인은 어떻게 유지되는가
- summary: 인증은 challenge-response(401→Authorization)로 신원을 1회 확인하고, 세션 쿠키·토큰은 그 확인을 이후 요청에 이어가며, HttpOnly가 세션 탈취를 막습니다.
- level: 중급
- minutes: 50
- tags: ["인증", "세션", "토큰", "쿠키", "보안"]
- kb: auth-session-token
- format: V2 Deep Dive
- checklist/exercise: 없음
- diagram: auth-session-flow.svg
