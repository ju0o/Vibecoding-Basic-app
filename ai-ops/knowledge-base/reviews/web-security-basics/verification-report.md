APPROVED 91

# P-02 Verification Report — web-security-basics

검증일: 2026-07-06  
검증자: Codex  
대상: `ai-ops/knowledge-base/entries/T07/web-security-basics.md`

## 1. Verdict

| 항목 | 판정 |
|---|---|
| 종합 | APPROVED |
| Score | 91 |
| 상태 변경 | `draft` → `approved` 가능 |
| 재수집 필요 | 없음 |

## 2. 필수 게이트

| Gate | 판정 | 근거 |
|---|---|---|
| G1. 출처 확인 불가 주장 0건 | PASS | SOP, CORS, CSP, XSS, CSRF 설명이 MDN/OWASP 원문과 대조 가능 |
| G2. 13개 필수 섹션 존재 | PASS | 13개 필수 섹션과 Quote Bank 존재 |
| G3. frontmatter 필수 필드 | PASS | `id`, `topicGroup`, `level`, `sources`, `updated` 존재 |
| G4. sources URL 접속 및 확인 날짜 | PASS | 모든 source URL 2026-07-06 확인 날짜 포함, 재접속 OK |

## 3. URL 재접속 기록

| URL | 등록부 | 접속 | 확인 내용 |
|---|---|---|---|
| https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy | MDN Web Docs | OK | same-origin policy, origin tuple, cross-origin interaction 제한 |
| https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS | MDN Web Docs | OK | CORS가 HTTP-header based mechanism이며 server가 allowed origins를 표현 |
| https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP | MDN Web Docs | OK | CSP의 threat minimization 목적과 browser restriction instruction |
| https://owasp.org/www-community/attacks/xss/ | OWASP | OK | XSS를 trusted website에 malicious script injection으로 설명 |
| https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html | OWASP Cheat Sheet Series | OK | CSRF 공격 설명과 prevention guidance |

## 4. 문장별 사실 대조 요약

| Claim 묶음 | 대조 결과 |
|---|---|
| same-origin policy는 critical security mechanism이다 | PASS — MDN 설명과 일치 |
| origin은 protocol/port/host 기준이다 | PASS — MDN origin tuple 설명과 일치 |
| CORS는 HTTP header 기반 mechanism이다 | PASS — MDN CORS guide와 일치 |
| preflight는 actual request 허용 여부 확인에 쓰인다 | PASS — MDN CORS guide와 일치 |
| XSS는 malicious scripts injection이다 | PASS — OWASP XSS 문서와 일치 |
| CSRF는 authenticated browser를 unwanted action으로 속인다 | PASS — OWASP CSRF Cheat Sheet와 일치 |
| CSP는 browser restriction instruction으로 threat risk를 줄인다 | PASS — MDN CSP guide와 일치 |

## 5. Source Registry 적합성

| 항목 | 판정 |
|---|---|
| 공식 출처 비중 | 100% |
| 허용 출처 | MDN, OWASP |
| 미등록 출처 | 없음 |
| 비고 | `cheatsheetseries.owasp.org`는 OWASP Cheat Sheet Series 공식 하위 사이트로 보안 2순위 출처 기준에 적합 |

## 6. Knowledge Score

| 기준 | 배점 | 점수 | 근거 |
|---|---:|---:|---|
| S1 공식 출처 | 20 | 20 | 전 주장 공식 출처 기반 |
| S2 최신성 | 15 | 15 | 모든 checked 날짜가 2026-07-06 |
| S3 교육 적합성 | 15 | 13 | 중급 난이도에 맞고 HTTP 선행이 논리적 |
| S4 예시 품질 | 10 | 9 | CORS evidence, XSS rendering path, CSRF mutation request 예시 구체적 |
| S5 AI 시대 연관성 | 10 | 9 | AI가 CORS/XSS/CSRF를 오해하는 지점을 evidence 중심으로 연결 |
| S6 실무 활용성 | 15 | 13 | 실무 점검 항목과 자주 하는 실수가 실제적 |
| S7 용어 일관성 | 15 | 12 | related/prerequisite 실존. CORS/XSS/CSRF/CSP/Origin glossary 추가 필요 |
| 합계 | 100 | 91 | APPROVED |

## 7. 승인 조건 및 후속 권고

- KB frontmatter를 `status: approved`, `score: 91`로 변경 가능.
- P-04 생성 가능.
- P-05에서 `Same-Origin Policy`, `Origin`, `CORS`, `Preflight`, `CSP`, `XSS`, `CSRF` glossary를 추가할 것.
