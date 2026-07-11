# Codex QA Scan — M5 (2026-07-11)

## 요약

- 강의 마크다운 검사 파일 수: 67
- KB 검사 파일 수: 58
- 다이어그램 SVG 검사 파일 수: 40
- 용어집 term 수: 259
- 링크 생존 검사 도메인 수(중복 제거): 32
- 위반 수(V1 알려짐 제외): 122

| 검사 | 위반 수 | 비고 |
|---|---:|---|
| 형식(8섹션·8,000자·콜아웃≤8·하이라이트 짝수) | 19 | V1 알려짐 5건 별도 표기 |
| 인용(강의 quote ↔ KB Quote Bank 글자 일치) | 0 | MASTER_PROGRESS KB ids 우선, BACKLOG fallback |
| 링크 생존(도메인 중복 제거) | 0 | HTTP 5xx/네트워크 실패만 위반 처리 |
| 다이어그램 참조 | 0 | src/content/lessons/diagrams/*/*.svg 기준 |
| 용어집(term 중복·related 실존) | 103 | 정확한 term 문자열 기준 |

## 형식 위반

- `src/content/lessons/markdown/api-security-rate-limits.md`: 8,000자 미만: 7875자
- `src/content/lessons/markdown/auth-session-token.md`: 8,000자 미만: 7691자
- `src/content/lessons/markdown/backend-observability-logs.md`: 8,000자 미만: 7764자
- `src/content/lessons/markdown/build-and-runtime.md`: 8,000자 미만: 7732자
- `src/content/lessons/markdown/ci-cd-pipeline-basics.md`: 8,000자 미만: 7689자
- `src/content/lessons/markdown/database-tables-indexes.md`: 8,000자 미만: 7701자
- `src/content/lessons/markdown/deployment-cli-reference.md`: 8,000자 미만: 6954자
- `src/content/lessons/markdown/deployment-platforms.md`: 8,000자 미만: 7886자
- `src/content/lessons/markdown/environment-variables-secrets.md`: 8,000자 미만: 6970자
- `src/content/lessons/markdown/gh-cli-reference.md`: 8,000자 미만: 6729자
- `src/content/lessons/markdown/git-branch-switch-merge.md`: 8,000자 미만: 6750자; 하이라이트 == 홀수: 7개
- `src/content/lessons/markdown/git-init-add-commit-status.md`: 8,000자 미만: 7626자
- `src/content/lessons/markdown/git-log-diff-show.md`: 8,000자 미만: 6563자
- `src/content/lessons/markdown/git-rebase-cherry-pick-stash.md`: 8,000자 미만: 7135자
- `src/content/lessons/markdown/git-restore-reset-revert.md`: 8,000자 미만: 6983자
- `src/content/lessons/markdown/monitoring-errors-rollbacks.md`: 8,000자 미만: 7914자
- `src/content/lessons/markdown/nextjs-routing-rendering.md`: 8,000자 미만: 7810자
- `src/content/lessons/markdown/npm-scripts-reference.md`: 8,000자 미만: 6707자
- `src/content/lessons/markdown/rest-api-design.md`: 8,000자 미만: 7927자

## V1 알려짐

- `src/content/lessons/markdown/ai-vibe-coding-orientation.md`: V2 섹션 누락: 왜 존재하는가, 작동 원리, 스펙과 세부, 원문으로 읽기, 실전에서, 한계와 트레이드오프, 더 읽기; 8,000자 미만: 2099자
- `src/content/lessons/markdown/api-db-backend-flow.md`: V2 섹션 누락: 왜 존재하는가, 작동 원리, 스펙과 세부, 원문으로 읽기, 실전에서, 한계와 트레이드오프, 더 읽기; 8,000자 미만: 1757자
- `src/content/lessons/markdown/git-collaboration-basics.md`: V2 섹션 누락: 왜 존재하는가, 작동 원리, 스펙과 세부, 원문으로 읽기, 실전에서, 한계와 트레이드오프, 더 읽기; 8,000자 미만: 1731자
- `src/content/lessons/markdown/typescript-react-nextjs.md`: V2 섹션 누락: 왜 존재하는가, 작동 원리, 스펙과 세부, 원문으로 읽기, 실전에서, 한계와 트레이드오프, 더 읽기; 8,000자 미만: 1986자
- `src/content/lessons/markdown/web-screen-anatomy.md`: V2 섹션 누락: 왜 존재하는가, 작동 원리, 스펙과 세부, 원문으로 읽기, 실전에서, 한계와 트레이드오프, 더 읽기; 8,000자 미만: 1892자

## 인용 위반

- 위반 없음

## 링크 생존

- 위반 없음

<details>
<summary>도메인별 검사 결과</summary>

| domain | status | method | sample | files |
|---|---:|---|---|---:|
| 12factor.net | 200 | HEAD | https://12factor.net/logs | 8 |
| anthropic.com | 200 | HEAD | https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents | 23 |
| arxiv.org | 200 | HEAD | https://arxiv.org/html/2506.23253v2 | 2 |
| businessinsider.com | 200 | HEAD | https://www.businessinsider.com/vibe-coding-ai-silicon-valley-andrej-karpathy-2025-2 | 2 |
| cheatsheetseries.owasp.org | 200 | HEAD | https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html | 2 |
| cli.github.com | 200 | HEAD | https://cli.github.com/manual/gh_pr_create | 2 |
| code.claude.com | 200 | HEAD | https://code.claude.com/docs/en/agent-sdk/agent-loop | 21 |
| code.visualstudio.com | 200 | HEAD | https://code.visualstudio.com/docs/editor/debugging | 11 |
| collinsdictionary.com | 403 | GET | https://www.collinsdictionary.com/us/woty | 2 |
| datatracker.ietf.org | 200 | HEAD | https://datatracker.ietf.org/doc/html/rfc9110 | 4 |
| developer.mozilla.org | 200 | HEAD | https://developer.mozilla.org/ | 40 |
| developers.openai.com | 200 | HEAD | https://developers.openai.com/api/docs/guides/agent-evals | 29 |
| docs.github.com | 200 | HEAD | https://docs.github.com/en/actions/about-github-actions/understanding-github-actions | 5 |
| docs.npmjs.com | 200 | HEAD | https://docs.npmjs.com/cli/v10/using-npm/scripts | 4 |
| firebase.google.com | 200 | HEAD | https://firebase.google.com/docs/hosting | 2 |
| git-scm.com | 200 | HEAD | https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control | 13 |
| learn.microsoft.com | 200 | HEAD | https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules | 2 |
| merriam-webster.com | 403 | GET | https://www.merriam-webster.com/slang/vibe-coding | 2 |
| modelcontextprotocol.io | 200 | HEAD | https://modelcontextprotocol.io/specification/2025-11-25/server/tools | 6 |
| nextjs.org | 200 | HEAD | https://nextjs.org/docs | 4 |
| nodejs.org | 200 | HEAD | https://nodejs.org/api/process.html | 7 |
| openai.com | 200 | GET | https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/ | 3 |
| owasp.org | 200 | HEAD | https://owasp.org/www-project-api-security/ | 3 |
| platform.claude.com | 200 | HEAD | https://platform.claude.com/docs/en/test-and-evaluate/develop-tests | 31 |
| postgresql.org | 200 | HEAD | https://www.postgresql.org/docs/ | 3 |
| react.dev | 200 | HEAD | https://react.dev/learn/your-first-component | 6 |
| semver.org | 200 | HEAD | https://semver.org/ | 2 |
| timesofindia.indiatimes.com | 200 | HEAD | https://timesofindia.indiatimes.com/technology/tech-news/rewind-2025-when-teslas-former-ai-director-gave-the-world-the-word-that-has-changed-the-work-of-software-engineers-forever/articleshow/126276591.cms | 2 |
| typescriptlang.org | 200 | HEAD | https://www.typescriptlang.org/docs/ | 6 |
| vercel.com | 200 | HEAD | https://vercel.com/docs/cli | 6 |
| web.archive.org | 200 | HEAD | https://web.archive.org/web/20250206155957id_/https://x.com/karpathy/status/1886192184808149383 | 2 |
| x.com | 200 | HEAD | https://x.com/karpathy/status/1886192184808149383 | 1 |

</details>

## 다이어그램 위반

- 위반 없음

## 용어집 위반

- 중복 term: Hook
- `addEventListener` related `EventTarget` 미등재
- `any` related `unknown` 미등재
- `API` related `상태 코드` 미등재
- `API` related `HTTP` 미등재
- `Array` related `Indexed Collection` 미등재
- `Assertion` related `Code Search` 미등재
- `Batching` related `Updater Function` 미등재
- `BM25` related `검색` 미등재
- `Breakpoint` related `Debugger` 미등재
- `Breakpoint` related `Variable Inspection` 미등재
- `Browser Rendering` related `Layout` 미등재
- `Character Class` related `Code Search` 미등재
- `Character Class` related `Pattern Matching` 미등재
- `Command Output` related `Shell Command` 미등재
- `Component Boundary` related `AI Code Review` 미등재
- `Composition` related `Component Tree` 미등재
- `Conditional` related `Boolean` 미등재
- `Content Sectioning` related `Heading` 미등재
- `CSP` related `Browser Security` 미등재
- `CSRF` related `Cookie` 미등재
- `CSS Cascade` related `CSS Declaration` 미등재
- `CSS` related `반응형 UI` 미등재
- `CSS` related `Tailwind CSS` 미등재
- `Current Directory` related `Shell Command` 미등재
- `DB` related `백엔드` 미등재
- `DB` related `SQL` 미등재
- `Dynamic Trust` related `Evaluation` 미등재
- `Effect Dependency` related `External System` 미등재
- `Effect` related `External System` 미등재
- `Error Message` related `JavaScript Error Reference` 미등재
- `Eval Run` related `Dataset` 미등재
- `Evaluation Harness` related `Agent Evaluation` 미등재
- `Event` related `EventTarget` 미등재
- `File Path` related `File System` 미등재
- `Function` related `Parameter` 미등재
- `Function` related `Return Value` 미등재
- `Function` related `Scope` 미등재
- `Generic` related `Reusable Component` 미등재
- `Harness Engineering` related `검증` 미등재
- `Harness Engineering` related `테스트` 미등재
- `HTML` related `브라우저` 미등재
- `HTTP 상태 코드` related `HTTP` 미등재
- `HTTP Method` related `REST` 미등재
- `Human Review` related `Approval` 미등재
- `Idempotent` related `HTTP` 미등재
- `Integrated Terminal` related `Shell Command` 미등재
- `JSON.parse` related `Validation` 미등재
- `Local Testing Server` related `Browser` 미등재
- `Local Testing Server` related `Deployment` 미등재
- `Loop` related `Iteration` 미등재
- `MCP` related `도구` 미등재
- `Media Query` related `Viewport` 미등재
- `Narrowing` related `Type Guard` 미등재
- `Natural Language to Code` related `Code Generation` 미등재
- `Nav Element` related `Accessibility` 미등재
- `Nav Element` related `Navigation` 미등재
- `Next.js` related `라우팅` 미등재
- `Next.js` related `배포` 미등재
- `Node File System Module` related `File System` 미등재
- `Normal Flow` related `CSS Layout` 미등재
- `Normal Flow` related `Display` 미등재
- `Object Shape` related `Object` 미등재
- `Object Shape` related `Property` 미등재
- `Object Type` related `Optional Property` 미등재
- `Origin` related `HTTP` 미등재
- `Package Folder Tree` related `Node.js` 미등재
- `Path Separator` related `Operating System` 미등재
- `Performance Timing` related `Network` 미등재
- `Performance Timing` related `Performance` 미등재
- `PowerShell Cmdlet` related `PowerShell` 미등재
- `Primitive Value` related `Data Type` 미등재
- `Primitive Value` related `Object` 미등재
- `Prompt Engineering` related `검증` 미등재
- `Prompt Engineering` related `AI 코딩 도구` 미등재
- `Prototype Boundary` related `Technical Debt` 미등재
- `RAG` related `검색` 미등재
- `RAG` related `출처` 미등재
- `React` related `상태` 미등재
- `React` related `컴포넌트` 미등재
- `RegExp` related `Flags` 미등재
- `RegExp` related `Pattern Matching` 미등재
- `Regular Expression` related `Code Search` 미등재
- `Regular Expression` related `Pattern Matching` 미등재
- `Render Tree` related `Layout` 미등재
- `Responsive Design` related `CSS Layout` 미등재
- `Responsive Design` related `Viewport` 미등재
- `REST API` related `HTTP` 미등재
- `Same-Origin Policy` related `Browser Security` 미등재
- `Search Scope` related `Code Search` 미등재
- `Semantic HTML` related `Accessibility` 미등재
- `Skills` related `Codex` 미등재
- `Source Control View` related `Git` 미등재
- `Specificity` related `CSS Declaration` 미등재
- `Specificity` related `Selector` 미등재
- `State Snapshot` related `State Setter` 미등재
- `TypeScript` related `타입` 미등재
- `Union Type` related `Type Guard` 미등재
- `useState` related `State Setter` 미등재
- `Variable` related `Data Type` 미등재
- `Version Control` related `Git` 미등재
- `XSS` related `Input Validation` 미등재
- `XSS` related `Rendering Context` 미등재

## 극단값 및 표본 손 검증

- 전 강의급 극단값은 감지되지 않았다. 그래도 표본 3개를 손으로 대조했다.
- `tokenization-and-context`: V2 8섹션 존재, 11453자, 콜아웃 0개, 하이라이트 표식 8개로 스크립트 판정과 일치.
- `html-semantic-elements`: V2 8섹션 존재, 12614자, 콜아웃 4개, 하이라이트 표식 6개로 스크립트 판정과 일치.
- `ai-vibe-coding-orientation`: V1 레거시 5강 중 하나로 V2 형식 미준수는 알려짐으로 분리했다.

## 검사 규칙

- 형식: 코드 펜스와 인라인 코드를 제거한 뒤 글자 수, 콜아웃 수, `==` 개수를 계산했다.
- 인용: 강의의 `> "..."` 직접 인용이 MASTER_PROGRESS 우선, BACKLOG fallback으로 찾은 대응 KB Quote Bank에 글자 단위로 존재하는지 확인했다.
- 링크: 강의와 KB에서 URL을 추출하고 도메인 중복 제거 후 대표 URL을 HEAD/GET으로 확인했다.
- 다이어그램: 모든 `src/content/lessons/diagrams/*/*.svg`가 대응 slug 마크다운에서 `![...]`로 참조되는지 확인했다.
- 용어집: `term` 중복과 `related` 항목의 실제 term 존재 여부를 검사했다.
- 콘텐츠 수정 없음: 본 런은 보고만 수행했다.
