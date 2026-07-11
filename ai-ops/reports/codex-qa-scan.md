# Codex QA Scan — M5 (2026-07-12)

## 요약

- 강의 마크다운 검사 파일 수: 78
- KB 검사 파일 수: 73
- 다이어그램 SVG 검사 파일 수: 56
- 용어집 term 수: 388
- 링크 생존 검사 도메인 수(중복 제거): 38
- 위반 수(V1 알려짐 제외): 0
- 위반 없음

| 검사 | 위반 수 | 비고 |
|---|---:|---|
| 형식(8섹션·8,000자·콜아웃≤8·하이라이트 짝수) | 0 | V1 알려짐 0건 별도 표기 |
| 인용(강의 quote ↔ KB Quote Bank 글자 일치) | 0 | MASTER_PROGRESS KB ids 우선, BACKLOG fallback |
| 링크 생존(도메인 중복 제거) | 0 | HTTP 5xx/네트워크 실패만 위반 처리 |
| 다이어그램 참조 | 0 | src/content/lessons/diagrams/*/*.svg 기준 |
| 용어집(term 중복·related 실존) | 0 | 정확한 term 문자열 기준 |

## 형식 위반

- 위반 없음

## V1 알려짐

- 해당 없음

## 인용 위반

- 위반 없음

## 링크 생존

- 위반 없음

<details>
<summary>도메인별 검사 결과</summary>

| domain | status | method | sample | files |
|---|---:|---|---|---:|
| 12factor.net | 200 | HEAD | https://12factor.net/logs | 9 |
| anthropic.com | 200 | HEAD | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 23 |
| arxiv.org | 200 | HEAD | https://arxiv.org/html/2506.23253v2 | 3 |
| businessinsider.com | 200 | HEAD | https://www.businessinsider.com/vibe-coding-ai-silicon-valley-andrej-karpathy-2025-2 | 2 |
| cheatsheetseries.owasp.org | 200 | HEAD | https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html | 4 |
| cli.github.com | 200 | HEAD | https://cli.github.com/manual/gh_pr_create | 2 |
| code.claude.com | 200 | HEAD | https://code.claude.com/docs/en/agent-sdk/agent-loop | 27 |
| code.visualstudio.com | 200 | HEAD | https://code.visualstudio.com/docs/editor/debugging | 13 |
| collinsdictionary.com | 403 | GET | https://www.collinsdictionary.com/us/woty | 3 |
| cursor.com | 200 | HEAD | https://cursor.com/blog/agent-best-practices | 7 |
| datatracker.ietf.org | 200 | HEAD | https://datatracker.ietf.org/doc/html/rfc9110 | 4 |
| developer.mozilla.org | 200 | HEAD | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview | 39 |
| developers.openai.com | 200 | HEAD | https://developers.openai.com/api/docs/guides/agent-evals | 34 |
| docs.github.com | 200 | HEAD | https://docs.github.com/en/copilot/responsible-use/chat | 20 |
| docs.npmjs.com | 200 | HEAD | https://docs.npmjs.com/cli/v10/using-npm/scripts | 4 |
| firebase.google.com | 200 | HEAD | https://firebase.google.com/docs/hosting | 2 |
| git-scm.com | 200 | HEAD | https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control | 13 |
| github.blog | 200 | HEAD | https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/ | 2 |
| learn.microsoft.com | 200 | HEAD | https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules | 2 |
| merriam-webster.com | 403 | GET | https://www.merriam-webster.com/slang/vibe-coding | 2 |
| modelcontextprotocol.io | 200 | HEAD | https://modelcontextprotocol.io/specification/2025-11-25/server/tools | 6 |
| nextjs.org | 200 | HEAD | https://nextjs.org/docs/app/getting-started/layouts-and-pages | 4 |
| nodejs.org | 200 | HEAD | https://nodejs.org/api/process.html | 7 |
| openai.com | 403 | GET | https://openai.com/index/introducing-codex/ | 10 |
| owasp.org | 200 | HEAD | https://owasp.org/www-community/attacks/xss/ | 2 |
| platform.claude.com | 200 | HEAD | https://platform.claude.com/docs/en/test-and-evaluate/develop-tests | 33 |
| playwright.dev | 200 | HEAD | https://playwright.dev/ | 2 |
| postgresql.org | 200 | HEAD | https://www.postgresql.org/docs/current/ddl-basics.html | 3 |
| react.dev | 200 | HEAD | https://react.dev/learn/your-first-component | 6 |
| semver.org | 200 | HEAD | https://semver.org/ | 2 |
| tailwindcss.com | 200 | HEAD | https://tailwindcss.com/docs/styling-with-utility-classes | 1 |
| testing-library.com | 200 | HEAD | https://testing-library.com/docs/guiding-principles/ | 2 |
| timesofindia.indiatimes.com | 200 | HEAD | https://timesofindia.indiatimes.com/technology/tech-news/rewind-2025-when-teslas-former-ai-director-gave-the-world-the-word-that-has-changed-the-work-of-software-engineers-forever/articleshow/126276591.cms | 2 |
| typescriptlang.org | 200 | HEAD | https://www.typescriptlang.org/docs/handbook/2/basic-types.html | 6 |
| vercel.com | 200 | HEAD | https://vercel.com/docs/cli | 7 |
| vitest.dev | 200 | HEAD | https://vitest.dev/ | 2 |
| web.archive.org | 200 | HEAD | https://web.archive.org/web/20250206155957id_/https://x.com/karpathy/status/1886192184808149383 | 3 |
| x.com | 200 | HEAD | https://x.com/karpathy/status/1886192184808149383 | 1 |

</details>

## 다이어그램 위반

- 위반 없음

## 용어집 위반

- 위반 없음

## 극단값 및 표본 손 검증

- 전 강의급 극단값은 감지되지 않았다. 그래도 표본 3개를 손으로 대조했다.
- `tokenization-and-context`: V2 8섹션 존재, 11453자, 콜아웃 0개, 하이라이트 표식 8개로 스크립트 판정과 일치.
- `html-semantic-elements`: V2 8섹션 존재, 12614자, 콜아웃 4개, 하이라이트 표식 6개로 스크립트 판정과 일치.
- `ai-vibe-coding-orientation`: V2 8섹션 존재, 8785자, 콜아웃 2개, 하이라이트 표식 4개로 스크립트 판정과 일치.

## 검사 규칙

- 형식: 코드 펜스와 인라인 코드를 제거한 뒤 글자 수, 콜아웃 수, `==` 개수를 계산했다.
- 인용: 강의의 `> "..."` 직접 인용이 MASTER_PROGRESS 우선, BACKLOG fallback으로 찾은 대응 KB Quote Bank에 글자 단위로 존재하는지 확인했다.
- 링크: 강의와 KB에서 URL을 추출하고 도메인 중복 제거 후 대표 URL을 HEAD/GET으로 확인했다.
- 다이어그램: 모든 `src/content/lessons/diagrams/*/*.svg`가 대응 slug 마크다운에서 `![...]`로 참조되는지 확인했다.
- 용어집: `term` 중복과 `related` 항목의 실제 term 존재 여부를 검사했다.
- 스크립트 동작: 본 스캔은 리포트 파일만 생성한다.
