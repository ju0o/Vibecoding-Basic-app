# MASTER_PROGRESS — 프로젝트 전체 진행 매트릭스

**항목별 상태 매트릭스** (구 outputs/PIPELINE.md 대체). 실행 큐와 전이 규칙은 [STATE.md](STATE.md), 요약은 [DASHBOARD.md](DASHBOARD.md).
갱신 규칙 (O-03): **RUN 프롬프트의 종료 절차가 자동 갱신** — 사람이 편집하지 않는다. 행 추가는 O-01(Fable)만. 상태 값은 STATE.md 상태 기계의 명칭을 따른다.
Executor 체제 (2026-07-04~): **Codex** = 수집(P-01)·검증(P-02)·재수집(P-03)·Lesson(P-04)·반영(P-05)·빌드수정(P-07) / **Cline** = Verify(P-06)·Release(P-08) / **Fable** = O-01·O-02·Phase 5 사후 표본 감사. Trae 제외.

## 상태 기호
`—` 미착수 / `▶` 진행 중 / `↻n` 루프 n회차 / `✓` 완료 / `✗` 실패·에스컬레이션 / `n/a` 해당 없음

## Knowledge Base 매트릭스

| KB id (개념) | 주제군 | 수집(P-01) | 검증·Score(P-02) | 비고 |
|---|---|---|---|---|
| context-engineering | T10 | ✓ | ✓ 91 (Fable 승인 2026-07-05, QA-01) | 강의 order 2·3·4 근거 / Quote Bank 6개 보강 |
| tool-calling | T09 | ✓ | ✓ 88 (Fable 승인 2026-07-05, QA-01) | order 7·9·11 근거 / Quote Bank 6개 보강 |
| mcp | T09 | ✓ | ✓ 92 (Fable 승인 2026-07-05, QA-01) | order 9 근거 / Quote Bank 6개 보강 |
| rag | T09 | ✓ | ✓ 90 (Loop A 1회 후, Fable 승인 2026-07-05, QA-01) | order 8 근거 / Quote Bank 6개 보강 |
| agent-loop | T10 | ✓ | ✓ 91 (Fable 승인 2026-07-05, QA-01) | order 11·12·14 근거 / Quote Bank 6개 보강 |
| skills | T10 | ✓ | ✓ 93 (2026-07-05, O-05.2 연속 검증) | order 10 근거 |
| orchestration | T10 | ✓ | ✓ 89 (2026-07-05, O-05.2 연속 검증) | order 13 근거 |
| harness | T10 | ✓ | ✓ 90 (2026-07-05, O-05.2 연속 검증) | order 15 근거 |
| subagents | T10 | ✓ | ✓ 91 (2026-07-05, O-05.2 연속 검증) | order 12 근거 |
| loop-engineering | T10 | ✓ | ✓ 88 (2026-07-05, O-05.2 연속 검증) | order 14 근거 |
| context-caching | T10 | ✓ | ✓ 89 (2026-07-05, O-05.2 연속 검증) | order 15 근거 |
| ai-system-evaluation | T10 | ✓ | ✓ 90 (2026-07-05, O-05.2 연속 검증) | order 16 근거 |
| tokenization-context | T08 | ✓ | ✓ 90 (Loop A 1회 후, 2026-07-05) | order 50 근거 |
| prompt-engineering | T08 | ✓ | ✓ 89 (2026-07-05, O-05.2 연속 검증) | order 51 근거 |
| grounding-citations | T08 | ✓ | ✓ 91 (2026-07-05, O-05.2 연속 검증) | order 52 근거 |
| hallucination-verification | T08 | ✓ | ✓ 90 (2026-07-05, O-05.2 연속 검증) | order 53 근거 |
| embeddings-similarity | T08 | ✓ | ✓ 88 (2026-07-05, O-05.2 연속 검증) | order 54 근거 |
| dev-environment-map | T01 | ✓ | ✓ 88 (2026-07-06) | order 2 근거 |
| vibe-coding-origin-karpathy | T08 | ✓ | ✓ 86 (Loop A 1회 후, 2026-07-06) | order 3 근거 / 특수 출처 승인 반영 |
| ai-learning-verification | T08 | ✓ | ✓ 92 (2026-07-06) | order 4 근거 |
| files-folders-paths | T01 | ✓ | ✓ 90 (2026-07-06) | order 6 근거 |
| terminal-shell-commands | T01 | ✓ | ✓ 88 (2026-07-06) | order 7 근거 |
| variables-types-data | T01 | ✓ | ✓ 92 (2026-07-06) | order 8 근거 |
| control-flow-functions-errors | T01 | ✓ | ✓ 92 (2026-07-06) | order 9 근거 |
| debugging-error-reading | T01 | ✓ | ✓ 89 (2026-07-06) | order 10 근거 |
| regex-code-search | T01 | ✓ | ✓ 87 (2026-07-06) | order 11 근거 |
| package-json-semver | T01 | ✓ | ✓ 85 (2026-07-06) | order 12 근거 / npm·SemVer registry 명시 권고 |
| html-semantic-elements | T02 | ✓ | ✓ 88 (2026-07-06) | order 14 근거 / Semantic HTML glossary 보강 권고 |
| css-cascade-layout | T02 | ✓ | ✓ 87 (2026-07-06) | order 15 근거 / responsive 관련 예약 id 정리 권고 |
| javascript-dom-events | T02 | ✓ | ✓ 88 (2026-07-06) | order 16 근거 / DOM·Event glossary 보강 권고 |
| browser-rendering-network | T02 | ✓ | ✓ 89 (2026-07-06) | order 17 근거 / DevTools UI 예시는 후속 보강 권고 |
| http-request-response | T02 | ✓ | ✓ 90 (2026-07-06) | order 18·19 근거 / HTTP 세부 용어 보강 권고 |
| json-data-contracts | T02 | ✓ | ✓ 89 (2026-07-06) | order 19 근거 / JSON·data contract glossary 보강 권고 |
| web-security-basics | T07 | ✓ | ✓ 91 (2026-07-06) | order 20 근거 / CORS·XSS·CSRF glossary 보강 권고 |
| typescript-type-system | T03 | ✓ | ✓ 90 (2026-07-06) | order 22 근거 / TypeScript type 용어 보강 권고 |
| react-component-model | T03 | ✓ | ✓ 90 (2026-07-06) | order 23 근거 / React component 용어 보강 권고 |
| react-state-effects | T03 | ✓ | ✓ 91 (2026-07-06) | order 24 근거 / React state/effect 용어 보강 권고 |
| nextjs-routing-rendering | T03 | ✓ | ✓ 89 (2026-07-06, Fable 대행) | order 25 근거 / sources 보강 권고 (use-client 레퍼런스) |
| git-init-add-commit-status | T04 | ✓ | ✓ 91 (2026-07-06, Fable 대행) | git-collaboration order 2 근거 / Git 용어 glossary 등재 권고 |
| git-branch-switch-merge | T04 | ✓ | ✓ 90 (2026-07-06, Fable 대행) | order 3 근거 |
| git-log-diff-show | T04 | ✓ | ✓ 92 (2026-07-06, Fable 대행) | order 4 근거 |
| git-restore-reset-revert | T04 | ✓ | ✓ 92 (2026-07-06, Fable 대행) | order 5 근거 |

| git-rebase-cherry-pick-stash | T04 | v | v 91 (2026-07-07, Fable 대행) | git-collaboration order 6 근거 |
| github-pr-review-flow | T04 | v | v 88 (2026-07-07, Fable 대행) | order 7 근거 / docs.github.com, 리뷰 3상태 2회 fetch 대조 |
| gh-cli-reference | T04 | v | v 89 (2026-07-07, Fable 대행) | order 8 근거 / cli.github.com gh_pr_* 매뉴얼 |
| rest-api-design | T05 | v | v 90 (2026-07-07, Fable 대행) | data-backend order 2 근거 / MDN Methods·Status·Glossary |
| database-tables-indexes | T05 | v | v 90 (2026-07-07, Fable 대행) | order 3 근거 / PostgreSQL Table Basics·Indexes |
| auth-session-token | T05 | v | v 89 (2026-07-07, Fable 대행) | order 4 근거 / MDN Authentication·Cookies |
| environment-variables-secrets | T05 | v | v 90 (2026-07-07, Fable 대행) | order 5 근거 / Node.js process.env·12factor Config |
| api-security-rate-limits | T05 | v | v 88 (2026-07-08, Fable 대행) | order 6 근거 / MDN 429·Retry-After |
| backend-observability-logs | T05 | v | v 88 (2026-07-08, Fable 대행) | order 7 근거 / 12factor Logs·MDN 429 |
| build-and-runtime | T06 | v | v 89 (2026-07-08, Fable 대행) | deployment-ops order 1 근거 / 12factor Build-release-run |
| npm-scripts-reference | T06 | v | v 89 (2026-07-08, Fable 대행) | order 3 근거 / npm Docs scripts |
| deployment-platforms | T06 | v | v 89 (2026-07-08, Fable 대행) | order 2 근거 / Firebase Hosting·Vercel Deployments |
| ci-cd-pipeline-basics | T06 | v | v 89 (2026-07-08, Fable 대행) | order 4 근거 / GitHub Actions Understanding |
| monitoring-errors-rollbacks | T06 | v | v 88 (2026-07-08, Fable 대행) | order 6 근거 / Vercel Instant Rollback·12factor Logs |
| deployment-cli-reference | T06 | v | v 88 (2026-07-08, Fable 대행) | order 7 근거 / Vercel CLI Overview + 프로젝트 firebase-tools |
| model-selection-tradeoffs | T08 | ✓ | ✓ 91 (2026-07-11, M4) | ai-basics order 6 근거 / R1 Claude 5 후보 흡수 |
| tailwind-design-systems | T03 | ✓ | ✓ 89 (2026-07-11, Codex) | frontend-frameworks order 6 근거 / Tailwind theme variables·responsive design |
| frontend-testing-basics | T03 | ✓ | ✓ 90 (2026-07-11, Codex) | frontend-frameworks order 7 근거 / Vitest·Testing Library·Playwright |
| production-env-secrets | T07 | ✓ | ✓ 91 (2026-07-11, Codex) | deployment-ops order 5 근거 / Next.js·Vercel·GitHub Actions secrets |
| ai-era-timeline | T08 | ✓ | ✓ 88 (2026-07-11, Codex) | ai-basics order 7 근거 / IntelliSense→Copilot→Chat→Agent |
| autocomplete-era | T11 | ✓ | ✓ 89 (2026-07-11, Codex) | ai-coding-tools order 1 근거 / IntelliSense·Copilot inline suggestions |
| chat-coding-era | T11 | ✓ | ✓ 91 (2026-07-12, Codex) | ai-coding-tools order 2 근거 / GitHub Copilot Chat·OpenAI Codex |
| ide-agent-era | T11 | ✓ | ✓ 90 (2026-07-12, Codex) | ai-coding-tools order 3 근거 / GitHub Copilot coding agent·Claude Code |
| ai-coding-tool-comparison | T11 | ✓ | ✓ 88 (2026-07-12, Codex) | ai-coding-tools order 4 근거 / Codex·Claude Code·Cursor 역할 비교 |
| tool-permissions-sandboxes | T11 | ✓ | ✓ 91 (2026-07-12, Codex) | ai-coding-tools order 5 근거 / 권한 승인·sandbox·방화벽 환경 |
| human-ai-collaboration-patterns | T11 | ✓ | ✓ 90 (2026-07-12, Codex) | ai-coding-tools order 6 근거 / 리뷰·반복·협업 패턴 |
| ai-code-review-tools | T11 | ✓ | ✓ 90 (2026-07-12, Codex) | ai-coding-tools order 7 근거 / Copilot code review·Bugbot·human review boundary |
| requirement-task-breakdown | T12 | ✓ | ✓ 89 (2026-07-12, Codex) | practical-vibe-coding order 1 근거 / issue·sub-issue·Plan Mode |
| prompt-implementation-loop | T12 | ✓ | ✓ 90 (2026-07-12, Codex) | practical-vibe-coding order 2 근거 / prompt·implementation·verify feedback loop |
| code-change-risk-analysis | T12 | ✓ | ✓ 91 (2026-07-12, Codex) | practical-vibe-coding order 3 근거 / PR diff·CodeQL·OWASP review |
| ai-assisted-testing-loop | T12 | ✓ | ✓ 90 (2026-07-12, Codex) | practical-vibe-coding order 4 근거 / Copilot test generation·Playwright·Vitest |

## Lesson 매트릭스

| 강의 slug | 모듈 | 근거 KB | Lesson(P-04) | Site(P-05) | Verify(P-06) | Release(P-08) | 비고 |
|---|---|---|---|---|---|---|---|
| ai-vibe-coding-orientation | getting-started | vibe-coding-origin-karpathy, ai-learning-verification, dev-environment-map | ✓ | ✓ | ✓ (2026-07-11, V1 regeneration verify) | ✓ | V1 legacy → V2 Deep Dive 재생성, diagram 추가 |
| development-environment-map | getting-started | dev-environment-map | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 7, RELEASE-2026-07-06-v2-wave7.md |
| vibe-coding-origin-karpathy | getting-started | vibe-coding-origin-karpathy | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 7, RELEASE-2026-07-06-v2-wave7.md |
| learning-with-ai-verification | getting-started | ai-learning-verification | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 7, RELEASE-2026-07-06-v2-wave7.md |
| from-prompt-to-system | M10 | n/a (구 체제 파일럿) | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| files-folders-and-paths | development-basics | files-folders-paths | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 7, RELEASE-2026-07-06-v2-wave7.md |
| terminal-shell-basics-reference | development-basics | terminal-shell-commands | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 8, RELEASE-2026-07-06-v2-wave8.md |
| variables-types-and-data-shapes | development-basics | variables-types-data | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 9, RELEASE-2026-07-06-v2-wave9.md |
| control-flow-functions-errors | development-basics | control-flow-functions-errors | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 9, RELEASE-2026-07-06-v2-wave9.md |
| debugging-error-reading | development-basics | debugging-error-reading | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 9, RELEASE-2026-07-06-v2-wave9.md |
| regex-for-code-search | development-basics | regex-code-search | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 9, RELEASE-2026-07-06-v2-wave9.md |
| package-json-and-semver | development-basics | package-json-semver | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 10, RELEASE-2026-07-06-v2-wave10.md |
| web-screen-anatomy | web-basics | html-semantic-elements, css-cascade-layout, javascript-dom-events, browser-rendering-network, http-request-response | ✓ | ✓ | ✓ (2026-07-11, V1 regeneration verify) | ✓ | V1 legacy → V2 Deep Dive 재생성, diagram 추가 |
| html-semantic-elements | web-basics | html-semantic-elements | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 11, RELEASE-2026-07-06-v2-wave11.md |
| css-cascade-layout-responsive | web-basics | css-cascade-layout | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 11, RELEASE-2026-07-06-v2-wave11.md |
| javascript-dom-events | web-basics | javascript-dom-events | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 11, RELEASE-2026-07-06-v2-wave11.md |
| browser-rendering-network | web-basics | browser-rendering-network | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 11, RELEASE-2026-07-06-v2-wave11.md |
| http-request-response | web-basics | http-request-response | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 12, RELEASE-2026-07-06-v2-wave12.md |
| json-data-contracts | web-basics | json-data-contracts | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 13, RELEASE-2026-07-06-v2-wave13.md |
| web-security-basics | web-basics | web-security-basics | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 13, RELEASE-2026-07-06-v2-wave13.md |
| typescript-react-nextjs | frontend-frameworks | typescript-type-system, react-component-model, react-state-effects, nextjs-routing-rendering | ✓ | ✓ | ✓ (2026-07-11, V1 regeneration verify) | ✓ | V1 legacy → V2 Deep Dive 재생성, diagram 추가 |
| typescript-type-system | frontend-frameworks | typescript-type-system | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 13, RELEASE-2026-07-06-v2-wave13.md |
| react-component-mental-model | frontend-frameworks | react-component-model | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 13, RELEASE-2026-07-06-v2-wave13.md |
| react-state-and-effects | frontend-frameworks | react-state-effects | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 14, RELEASE-2026-07-06-v2-wave14.md |
| context-engineering-basics | M10 | context-engineering | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| context-window-and-memory | M10 | context-engineering | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| system-prompts-and-instruction-layers | M10 | context-engineering | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| ai-workflow-design | M10 | agent-loop | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| context-engineering-mcp-skills | M10 | context-engineering, mcp, skills | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 2, RELEASE-2026-07-05-v2-wave2.md |
| tool-calling-basics | M10 | tool-calling | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| rag-fundamentals | M10 | rag | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| mcp-architecture-basics | M10 | mcp, tool-calling | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| designing-reusable-skills | M10 | skills | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 2, RELEASE-2026-07-05-v2-wave2.md |
| agent-loop-anatomy | M10 | agent-loop, tool-calling | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| subagents-and-delegation | M10 | agent-loop, subagents | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 3, RELEASE-2026-07-05-v2-wave3.md |
| multi-agent-orchestration | M10 | orchestration | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 3, RELEASE-2026-07-05-v2-wave3.md |
| loop-engineering-basics | M10 | agent-loop, loop-engineering | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 3, RELEASE-2026-07-05-v2-wave3.md |
| harness-engineering-basics | M10 | harness | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 3, RELEASE-2026-07-05-v2-wave3.md |
| context-caching-and-state | M10 | context-caching | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 4, RELEASE-2026-07-05-v2-wave4.md |
| ai-system-evaluation | M10 | ai-system-evaluation | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 4, RELEASE-2026-07-05-v2-wave4.md |
| tokenization-and-context | ai-basics | tokenization-context | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 5, RELEASE-2026-07-05-v2-wave5.md |
| prompt-engineering-foundations | ai-basics | prompt-engineering | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 5, RELEASE-2026-07-05-v2-wave5.md |
| grounding-and-citations | ai-basics | grounding-citations | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 5, RELEASE-2026-07-05-v2-wave5.md |
| hallucination-and-verification | ai-basics | hallucination-verification | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 5, RELEASE-2026-07-05-v2-wave5.md |
| embeddings-and-similarity | ai-basics | embeddings-similarity | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 6, RELEASE-2026-07-05-v2-wave6.md |
| model-selection-tradeoffs | ai-basics | model-selection-tradeoffs | ✓ | ✓ | ✓ (2026-07-11, model selection wave verify) | ✓ | V2 Wave 26, RELEASE-2026-07-11-model-selection.md |
| ai-era-timeline | ai-basics | ai-era-timeline | ✓ | ✓ | ✓ (2026-07-11, V2 wave 27 verify) | ✓ | V2 Wave 27, RELEASE-2026-07-11-platform-ai-era-wave.md |
| autocomplete-era | ai-coding-tools | autocomplete-era | ✓ | ✓ | ✓ (2026-07-11, V2 wave 28 verify) | ✓ | V2 Wave 28, RELEASE-2026-07-11-autocomplete-era.md |
| chat-coding-era | ai-coding-tools | chat-coding-era | ✓ | ✓ | ✓ (2026-07-12, AI coding tools verify) | ✓ | V2 Wave 29, RELEASE-2026-07-12-ai-coding-tools-release-wave.md |
| ide-agent-era | ai-coding-tools | ide-agent-era | ✓ | ✓ | ✓ (2026-07-12, AI coding tools verify) | ✓ | V2 Wave 29, RELEASE-2026-07-12-ai-coding-tools-release-wave.md |
| codex-claude-cursor-comparison | ai-coding-tools | ai-coding-tool-comparison | ✓ | ✓ | ✓ (2026-07-12, AI coding tools verify) | ✓ | V2 Wave 29, RELEASE-2026-07-12-ai-coding-tools-release-wave.md |
| tool-permissions-sandboxes | ai-coding-tools | tool-permissions-sandboxes | ✓ | ✓ | ✓ (2026-07-12, AI coding tools verify) | ✓ | V2 Wave 29, RELEASE-2026-07-12-ai-coding-tools-release-wave.md |
| human-ai-collaboration-patterns | ai-coding-tools | human-ai-collaboration-patterns | ✓ | ✓ | ✓ (2026-07-12, human-AI collaboration verify) | ✓ | V2 Wave 30, RELEASE-2026-07-12-human-ai-collaboration-release.md |
| ai-code-review-tools | ai-coding-tools | ai-code-review-tools | ✓ | ✓ | ✓ (2026-07-12, Practical Vibe Coding verify) | — | V2 Wave 31 verified, P-08 대기 |
| requirement-to-task-breakdown | practical-vibe-coding | requirement-task-breakdown | ✓ | ✓ | ✓ (2026-07-12, Practical Vibe Coding verify) | — | V2 Wave 31 verified, P-08 대기 |
| prompt-to-implementation-loop | practical-vibe-coding | prompt-implementation-loop | ✓ | ✓ | ✓ (2026-07-12, Practical Vibe Coding verify) | — | V2 Wave 31 verified, P-08 대기 |
| code-change-risk-analysis | practical-vibe-coding | code-change-risk-analysis | ✓ | ✓ | ✓ (2026-07-12, Practical Vibe Coding verify) | — | V2 Wave 31 verified, P-08 대기 |

| git-init-add-commit-status | git-collaboration | git-init-add-commit-status | v | v | v | v | Wave 15 (Fable), reference |
| git-branch-switch-merge | git-collaboration | git-branch-switch-merge | v | v | v | v | Wave 15 (Fable), reference |
| git-log-diff-show | git-collaboration | git-log-diff-show | v | v | v | v | Wave 15 (Fable), reference |
| git-restore-reset-revert | git-collaboration | git-restore-reset-revert | v | v | v | v | Wave 15 (Fable), reference |

| nextjs-routing-rendering | frontend-frameworks | nextjs-routing-rendering | v | v | v | v | Wave 16 (Fable), deep-dive |
| tailwind-design-systems | frontend-frameworks | tailwind-design-systems | ✓ | ✓ | ✓ (2026-07-11, V2 wave 27 verify) | ✓ | V2 Wave 27, RELEASE-2026-07-11-platform-ai-era-wave.md |
| frontend-testing-basics | frontend-frameworks | frontend-testing-basics | ✓ | ✓ | ✓ (2026-07-11, V2 wave 27 verify) | ✓ | V2 Wave 27, RELEASE-2026-07-11-platform-ai-era-wave.md |

| git-collaboration-basics | git-collaboration | git-init-add-commit-status, git-branch-switch-merge, git-log-diff-show, github-pr-review-flow | ✓ | ✓ | ✓ (2026-07-11, V1 regeneration verify) | ✓ | V1 legacy → V2 Deep Dive 재생성, diagram 추가 |
| git-rebase-cherry-pick-stash | git-collaboration | git-rebase-cherry-pick-stash | v | v | v | v | Wave 17 (Fable), reference |
| github-pr-review-flow | git-collaboration | github-pr-review-flow | v | v | v | v | Wave 18 (Fable), reference |
| gh-cli-reference | git-collaboration | gh-cli-reference | v | v | v | v | Wave 18 (Fable), reference |
| api-db-backend-flow | data-backend | http-request-response, rest-api-design, database-tables-indexes, auth-session-token, json-data-contracts | ✓ | ✓ | ✓ (2026-07-11, V1 regeneration verify) | ✓ | V1 legacy → V2 Deep Dive 재생성, diagram 추가 |
| rest-api-design | data-backend | rest-api-design | v | v | v | v | Wave 19 (Fable), deep-dive |
| database-tables-indexes | data-backend | database-tables-indexes | v | v | v | v | Wave 19 (Fable), deep-dive |
| auth-session-token | data-backend | auth-session-token | v | v | v | v | Wave 20 (Fable), deep-dive |
| environment-variables-secrets | data-backend | environment-variables-secrets | v | v | v | v | Wave 20 (Fable), deep-dive |
| api-security-rate-limits | data-backend | api-security-rate-limits | v | v | v | v | Wave 21 (Fable), deep-dive |
| backend-observability-logs | data-backend | backend-observability-logs | v | v | v | v | Wave 21 (Fable), deep-dive |
| build-and-runtime | deployment-ops | build-and-runtime | v | v | v | v | Wave 22 (Fable), deep-dive |
| npm-scripts-reference | deployment-ops | npm-scripts-reference | v | v | v | v | Wave 22 (Fable), reference |
| deployment-platforms | deployment-ops | deployment-platforms | v | v | v | v | Wave 23 (Fable), deep-dive |
| ci-cd-pipeline-basics | deployment-ops | ci-cd-pipeline-basics | v | v | v | v | Wave 23 (Fable), deep-dive |
| production-env-and-secrets | deployment-ops | production-env-secrets | ✓ | ✓ | ✓ (2026-07-11, V2 wave 27 verify) | ✓ | V2 Wave 27, RELEASE-2026-07-11-platform-ai-era-wave.md |
| monitoring-errors-rollbacks | deployment-ops | monitoring-errors-rollbacks | v | v | v | v | Wave 24 (Fable), deep-dive |
| deployment-cli-reference | deployment-ops | deployment-cli-reference | v | v | v | v | Wave 25 (Fable), reference |

## 집계 (Executor가 행 갱신 시 함께 갱신)

| 단계 | 완료 / 전체 | 진행률 |
|---|---|---|
| Knowledge Base 수집(P-01) | 73 / 73 | 100% (P-01/P-02 practical vibe coding KB Wave 2026-07-12 포함) |
| Knowledge Base (approved 이상) | 73 / 73 | 100% (QA scan 기준 KB 73건 approved 이상) |
| KB Quote Bank (1차 qa_approved KB) | 5 / 5 | 100% |
| KB Quote Bank (2차 approved KB) | 3 / 3 | 100% |
| KB Quote Bank (3차 approved KB) | 4 / 4 | 100% |
| KB Quote Bank (4차 approved KB) | 5 / 5 | 100% (tokenization-context Loop A 후 승인) |
| KB Quote Bank (5차 approved KB) | 5 / 5 | 100% (vibe-coding-origin-karpathy Loop A 후 승인) |
| KB Quote Bank (6차 approved KB) | 5 / 5 | 100% |
| KB Quote Bank (7차 approved KB) | 5 / 5 | 100% |
| KB Quote Bank (8차 approved KB) | 5 / 5 | 100% |
| KB Quote Bank (9차 approved KB) | 5 / 5 | 100% (AI coding tools KB Wave 승인) |
| KB Quote Bank (10차 approved KB) | 5 / 5 | 100% (practical vibe coding KB Wave 승인) |
| V2 regeneration Wave 1 | 9 / 9 | 100% |
| Lesson 생성 | 82 / 100 | 82% (V2 generated 82강, integrated 82강) |
| Site 반영 | 82 / 100 | 82% (V2 integrated 82강, P-06 검증 대기 4강) |
| Verify 통과 | 82 / 100 | 82% (`npm run verify` PASS, Next build 148 static pages) |
| Release | 78 / 100 | 78% (V2 released 78강, deployment HOLD) |

## 예외 상태 로그 (✗·↻ 발생 시 append)

| 날짜 | 대상 | 상태 | 조치 |
|---|---|---|---|
| 2026-07-04 | from-prompt-to-system | ~~Verify 대기~~ **해소** | Cline P-06 실행, VERIFIED (커밋 739640b). P-08 릴리스만 남음 |
| 2026-07-04 | P-06 보고서 경로 | ~~프로세스 편차~~ **해소** | Cline의 신규 경로 `outputs/06-build-verification/`를 표준으로 확정, P-06 프롬프트에 명시 (Executor 리팩토링에 포함) |
| 2026-07-04 | P-08 커밋 누락 | **해소** | Cline P-08 커밋(45fd9e6)에 src/content 3파일 누락 → 후속 커밋 a389dee로 보완, P-08 프롬프트에 확인 규칙 추가 |
| 2026-07-04 | Executor 정책 변경 | 완료 | **Trae 완전 제외** — Codex/Cline/Fable 3원 체제. 작성자≠검증자는 "Codex 세션 분리 + Fable 승인"으로 대체 (freeze 개정 1호) |
| 2026-07-05 | rag Loop A | 해소 (↻1 → ✓) | 76점(S1 미등록 출처, S7 용어 부재) → 재수집 → 90점. 루프 메커니즘 첫 실전 작동 |
| 2026-07-05 | glossary.ts Loop A 중 직접 수정 | 관찰 (경미) | 재수집 요청서 지시로 RAG 용어가 P-05 밖에서 추가됨 — lint/typecheck 통과 확인, QA-01 커밋에 포함. 개선안: 재수집 중 src/content 수정 금지 + 용어 예약 목록 (운영자 승인 대기) |
| 2026-07-05 | P-08 커밋 누락 **재발** (Batch 1, 5bafba1) | 해소 | src/content 미포함 — 후속 커밋 a0b6849로 보완. 파일럿과 동일 패턴 2회째 → RUN-CLINE 종료 절차의 git show --stat 확인이 Batch 2부터 방지 |
| 2026-07-05 | Batch 1 배포 | **HOLD (운영자 게이트)** | 배포 인프라 미정 (vercel.json 등 부재) — 운영자의 배포 환경 결정 대기. `outputs/06-deployment/DEPLOY-REPORT-2026-07-05.md` |
| 2026-07-05 | CODEX-PLAN Phase 0 | 완료 | D-01 Content Format V2 구현, V1 fallback 전환기 규칙, `npm run verify` PASS |
| 2026-07-05 | CODEX-PLAN Phase 1 | 완료 | 100강 V2 커리큘럼·백로그 확정, Pillar 분포 A40/B15/C25/D20 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 2차 | 완료 | skills 93·orchestration 89·harness 90 APPROVED, O-05.2 연속 검증 첫 적용 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 | 완료 | context-engineering-mcp-skills·designing-reusable-skills V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05/verify/release | 완료 | context-engineering-mcp-skills·designing-reusable-skills 사이트 반영, `npm run verify` PASS, V2 Wave 2 릴리스 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 3차 | 완료 | subagents·loop-engineering·context-caching·ai-system-evaluation P-01 draft 생성 후 P-02 approved |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 3차 P-02 | 완료 | subagents 91·loop-engineering 88·context-caching 89·ai-system-evaluation 90 APPROVED |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 Batch 3 | 완료 | subagents-and-delegation·multi-agent-orchestration·loop-engineering-basics·harness-engineering-basics V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05 Batch 3 | 완료 | subagents-and-delegation·multi-agent-orchestration·loop-engineering-basics·harness-engineering-basics 사이트 반영, 검증 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-06/P-08 Batch 3 | 완료 | `npm run verify` PASS, V2 Wave 3 릴리스 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 Batch 4 | 완료 | context-caching-and-state·ai-system-evaluation V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05 Batch 4 | 완료 | context-caching-and-state·ai-system-evaluation 사이트 반영, 검증 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-06/P-08 Batch 4 | 완료 | `npm run verify` PASS, V2 Wave 4 릴리스 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 4차 P-01 | 완료 | tokenization-context·prompt-engineering·grounding-citations·hallucination-verification·embeddings-similarity draft 생성, P-02 대기 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 4차 P-02 | 부분 완료 | prompt-engineering 89·grounding-citations 91·hallucination-verification 90·embeddings-similarity 88 APPROVED / tokenization-context 78 RECOLLECT ↻1 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 4차 Loop A | 완료 | tokenization-context P-03 citation 보정 후 P-02 재평가 90 APPROVED |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 T08 Wave 1 | 완료 | tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05 T08 Wave 1 | 완료 | tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification 사이트 반영, `npm run lint`/`npm run typecheck` PASS |
| 2026-07-05 | CODEX-PLAN Phase 3 Verify/Release T08 Wave 1 | 완료 | `npm run verify` PASS, tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification V2 Wave 5 릴리스 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 T08 Wave 2 | 완료 | embeddings-and-similarity V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05 T08 Wave 2 | 완료 | embeddings-and-similarity 사이트 반영, `npm run lint`/`npm run typecheck` PASS |
| 2026-07-05 | CODEX-PLAN Phase 3 Verify/Release T08 Wave 2 | 완료 | `npm run verify` PASS, embeddings-and-similarity V2 Wave 6 릴리스 |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 5차 P-02 | 완료 | dev-environment-map 88·vibe-coding-origin-karpathy 86(Loop A)·ai-learning-verification 92·files-folders-paths 90·terminal-shell-commands 88 APPROVED |
| 2026-07-06 | CODEX-PLAN D-02 플랫폼 증분 | 완료 | 콜아웃 4종 렌더링 + noindex/robots/Basic Auth(SITE_PASSWORD) 구현, `npm run verify` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T01/T08 Wave | 완료 | development-environment-map·vibe-coding-origin-karpathy·learning-with-ai-verification·files-folders-and-paths V2 Lesson Draft + diagrams 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T01/T08 Wave | 완료 | 4강 사이트 반영 + glossary/KB consumers/diagrams 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T01/T08 Wave | 완료 | `npm run verify` PASS, 4강 verified |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T01/T08 Wave | 완료 | development-environment-map·vibe-coding-origin-karpathy·learning-with-ai-verification·files-folders-and-paths V2 Wave 7 릴리스 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 Terminal Reference | 완료 | terminal-shell-basics-reference V2 Reference Draft + diagram 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 Terminal Reference | 완료 | terminal-shell-basics-reference 사이트 반영 + glossary/KB consumers/diagram 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 Terminal Reference | 완료 | `npm run verify` PASS, terminal-shell-basics-reference verified |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 Terminal Reference | 완료 | terminal-shell-basics-reference V2 Wave 8 릴리스, deployment HOLD |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 6차 P-01 | 완료 | variables-types-data·control-flow-functions-errors·debugging-error-reading·regex-code-search·package-json-semver draft 생성, P-02 대기 |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 6차 P-02 | 완료 | variables-types-data 92·control-flow-functions-errors 92·debugging-error-reading 89·regex-code-search 87·package-json-semver 85 APPROVED |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T01 Wave 2 | 완료 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search V2 Lesson Draft + diagrams 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T01 Wave 2 | 완료 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search 사이트 반영 + glossary/KB consumers/diagrams 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T01 Wave 2 | 완료 | `npm run verify` PASS, variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search 검증 통과 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T01 Wave 2 | 완료 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search V2 Wave 9 릴리스, deployment HOLD |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T01 Wave 3 | 완료 | package-json-and-semver V2 Reference Draft + diagram 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T01 Wave 3 | 완료 | package-json-and-semver 사이트 반영 + glossary/KB consumers/diagram 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T01 Wave 3 | 완료 | `npm run verify` PASS, package-json-and-semver 검증 통과 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T01 Wave 3 | 완료 | package-json-and-semver V2 Wave 10 릴리스, deployment HOLD |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 7차 P-01 | 완료 | html-semantic-elements·css-cascade-layout·javascript-dom-events·browser-rendering-network·http-request-response draft 생성, P-02 대기 |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 7차 P-02 | 완료 | html-semantic-elements 88·css-cascade-layout 87·javascript-dom-events 88·browser-rendering-network 89·http-request-response 90 APPROVED |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T02 Wave 1 | 완료 | html-semantic-elements·css-cascade-layout-responsive·javascript-dom-events·browser-rendering-network V2 Lesson Draft + diagrams 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T02 Wave 1 | 완료 | html-semantic-elements·css-cascade-layout-responsive·javascript-dom-events·browser-rendering-network 사이트 반영 + glossary/KB consumers/diagrams 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T02 Wave 1 | 완료 | `npm run verify` PASS, html-semantic-elements·css-cascade-layout-responsive·javascript-dom-events·browser-rendering-network 검증 통과 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T02 Wave 1 | 완료 | html-semantic-elements·css-cascade-layout-responsive·javascript-dom-events·browser-rendering-network V2 Wave 11 릴리스, deployment HOLD |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T02 Wave 2 | 완료 | http-request-response V2 Lesson Draft + diagram 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T02 Wave 2 | 완료 | http-request-response 사이트 반영 + glossary/KB consumers/diagram 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T02 Wave 2 | 완료 | `npm run verify` PASS, http-request-response 검증 통과 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T02 Wave 2 | 완료 | http-request-response V2 Wave 12 릴리스, deployment HOLD |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 8차 P-01 | 완료 | json-data-contracts·web-security-basics·typescript-type-system·react-component-model·react-state-effects draft 생성, P-02 대기 |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 8차 P-02 | 완료 | json-data-contracts 89·web-security-basics 91·typescript-type-system 90·react-component-model 90·react-state-effects 91 APPROVED |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T02/T03 Wave 1 | 완료 | json-data-contracts·web-security-basics·typescript-type-system·react-component-mental-model V2 Lesson Draft + diagrams 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T02/T03 Wave 1 | 완료 | 4강 사이트 반영 + glossary/KB consumers/diagrams 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T02/T03 Wave 1 | 완료 | `npm run verify` PASS, json-data-contracts·web-security-basics·typescript-type-system·react-component-mental-model 검증 통과 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T02/T03 Wave 1 | 완료 | json-data-contracts·web-security-basics·typescript-type-system·react-component-mental-model V2 Wave 13 릴리스, deployment HOLD |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T03 Wave 2 | 완료 | react-state-and-effects V2 Lesson Draft + diagram 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T03 Wave 2 | 완료 | react-state-and-effects 사이트 반영 + glossary/KB consumers/diagram 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T03 Wave 2 | 완료 | `npm run verify` PASS, react-state-and-effects 검증 통과 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T03 Wave 2 | 완료 | react-state-and-effects V2 Wave 14 릴리스, deployment HOLD |
| 2026-07-11 | M4 Content Refresh Sweep | 완료 | stale KB 0건 확인, `model-selection-tradeoffs` 신규 KB 승격 및 검증 승인(score 91), 백로그 55행 planned 전환 |
| 2026-07-11 | M5 Machine QA Scan | 완료 | 전 강의 67개·KB 58개·다이어그램 40개·용어 259개 스캔, 인용/링크/다이어그램 위반 0건, 형식 19건·용어집 103건 보고, `npm run verify` PASS |
| 2026-07-11 | QA Remediation Wave 1 | 완료 | 용어 340개로 확장, V1 레거시 제외 M5 위반 0건, `npm run verify` PASS |
| 2026-07-11 | V1 Legacy Regeneration | 완료 | ai-vibe-coding-orientation·web-screen-anatomy·typescript-react-nextjs·git-collaboration-basics·api-db-backend-flow V2 재생성, 다이어그램 5개 추가, M5 QA 전체 위반 0, `npm run verify` PASS |
| 2026-07-11 | Model Selection Wave | 완료 | model-selection-tradeoffs V2 강의·meta·diagram·glossary 반영, M5 QA 전체 위반 0, `npm run verify` PASS |
| 2026-07-11 | P-01/P-02 KB Wave | 완료 | tailwind-design-systems 89·frontend-testing-basics 90·production-env-secrets 91·ai-era-timeline 88·autocomplete-era 89 approved, planned 5강 전환 |
| 2026-07-11 | V2 Wave 27 | 완료 | tailwind-design-systems·frontend-testing-basics·production-env-and-secrets·ai-era-timeline V2 강의·diagram·glossary·metadata 반영, M5 QA 전체 위반 0 |
| 2026-07-11 | V2 Wave 28 | 완료 | autocomplete-era V2 강의·diagram·glossary·metadata 반영, M5 QA 전체 위반 0 |
| 2026-07-12 | P-01/P-02 AI Coding Tools KB Wave | 완료 | chat-coding-era 91·ide-agent-era 90·ai-coding-tool-comparison 88·tool-permissions-sandboxes 91·human-ai-collaboration-patterns 90 approved, 백로그 58~62행 planned 전환 |
| 2026-07-12 | P-04 AI Coding Tools Draft Wave | 완료 | chat-coding-era·ide-agent-era·codex-claude-cursor-comparison·tool-permissions-sandboxes V2 draft 생성, 각 8섹션·1만자 내외·Quote Bank 인용 5개 원문 일치, P-05 대기 |
| 2026-07-12 | P-05 AI Coding Tools Integration Wave | 완료 | 4강 markdown·curriculum·glossary 13개·diagrams 4개·KB consumers 반영, lint/typecheck/verify 대기 |
| 2026-07-12 | P-06 AI Coding Tools Verify | 완료 | `npm run verify` PASS: lint·typecheck·Vitest 3 files/8 tests·Next build 138 static pages, P-08 대기 |
| 2026-07-12 | P-08 AI Coding Tools Release | 완료 | chat-coding-era·ide-agent-era·codex-claude-cursor-comparison·tool-permissions-sandboxes V2 Wave 29 released, deployment HOLD |
| 2026-07-12 | P-04 Human-AI Collaboration Draft | 완료 | human-ai-collaboration-patterns V2 draft 생성, 8섹션·9,426자·Quote Bank 인용 5개 원문 일치, P-05 대기 |
| 2026-07-12 | P-05 Human-AI Collaboration Integration | 완료 | human-ai-collaboration-patterns markdown·curriculum·glossary 4개·diagram 1개·KB consumers 반영, lint/typecheck/verify 대기 |
| 2026-07-12 | P-06 Human-AI Collaboration Verify | 완료 | `npm run verify` PASS: lint·typecheck·Vitest 3 files/8 tests·Next build 140 static pages, P-08 대기 |
| 2026-07-12 | P-08 Human-AI Collaboration Release | 완료 | human-ai-collaboration-patterns V2 Wave 30 released, deployment HOLD |
| 2026-07-12 | P-01/P-02 Practical Vibe Coding KB Wave | 완료 | ai-code-review-tools 90·requirement-task-breakdown 89·prompt-implementation-loop 90·code-change-risk-analysis 91·ai-assisted-testing-loop 90 approved, 백로그 63·80~83 planned 전환 |
| 2026-07-12 | P-04 Practical Vibe Coding Draft Wave | 완료 | ai-code-review-tools·requirement-to-task-breakdown·prompt-to-implementation-loop·code-change-risk-analysis V2 draft 생성, 8섹션·8,000자+·Quote Bank 인용 일치, P-05 대기 |
| 2026-07-12 | P-05 Practical Vibe Coding Integration Wave | 완료 | 4강 markdown·curriculum·glossary 16개·diagrams 4개·KB consumers 반영, lint/typecheck PASS |
| 2026-07-12 | P-06 Practical Vibe Coding Verify | 완료 | `npm run verify` PASS: lint·typecheck·Vitest 3 files/8 tests·Next build 148 static pages, P-08 대기 |
