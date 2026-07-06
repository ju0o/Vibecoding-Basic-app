# RELEASE-2026-07-06-v2-wave12

## 판정: 배포 가능

`http-request-response`는 P-05 사이트 반영과 P-06 build verification을 통과했으므로 V2 Wave 12로 릴리스한다.

실제 배포는 운영자 승인 전까지 HOLD한다.

## Verify 결과

P-06 report: `ai-ops/outputs/06-build-verification/VERIFIED-2026-07-06-6.md`

| Step | Result | Summary |
|---|---|---|
| lint | PASS | `biome check .` checked 76 files |
| typecheck | PASS | `tsc --noEmit` completed |
| test | PASS | Vitest 3 files, 8 tests passed |
| build | PASS | Next.js 16.2.10 build completed, 48 static pages generated |

## 포함 콘텐츠

| slug | moduleId | type | KB id |
|---|---|---|---|
| `http-request-response` | `web-basics` | `deep-dive` | `http-request-response` |

## 추가 용어

- HTTP Request
- HTTP Response
- HTTP Method
- HTTP Header
- HTTP Body
- Status Code

## 개정 사항

- `src/content/lessons/markdown/http-request-response.md` 추가
- `src/content/lessons/diagrams/http-request-response/http-message-anatomy.svg` 추가
- `src/content/curriculum.ts`에 `web-basics` order 6 lesson metadata 추가
- `src/content/glossary.ts`에 HTTP request/response 관련 용어 6개 추가
- `ai-ops/knowledge-base/entries/T02/http-request-response.md` consumers 갱신

## 배포 상태

- Deployment: HOLD
- Reason: CODEX-PLAN Phase 5 개발 서버 확인과 운영자 승인 전까지 외부 배포 금지
