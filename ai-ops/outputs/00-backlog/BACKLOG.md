# BACKLOG V2 — 100-Lesson Deep Archive

Updated: 2026-07-05
Executor: Codex Phase 1
Status: 확정. CODEX-PLAN v2에 따라 Phase 2 KB 물결로 진행한다.

## Columns

| Column | Meaning |
|---|---|
| P | Pillar: A 코딩 기반, B 바이브코딩 본체, C AI 엔지니어링, D 레퍼런스 |
| type | `deep-dive` or `reference` |
| status | `v2-regenerate`, `v2-released`, `integrated`, `generated`, `planned`, `kb_needed`, `blocked` |

## Lesson Queue

| # | P | slug | moduleId | order | type | title | level | prerequisites | KB ids | status |
|---:|---|---|---|---:|---|---|---|---|---|---|
| 1 | B | ai-vibe-coding-orientation | getting-started | 1 | deep-dive | AI 바이브코딩이란 무엇인가 | 입문 | - | vibe-coding-origin-karpathy,ai-learning-verification,dev-environment-map | v2-released |
| 2 | A | development-environment-map | getting-started | 2 | deep-dive | 개발 환경 지도: IDE, 터미널, 브라우저, Git | 입문 | ai-vibe-coding-orientation | dev-environment-map | v2-released |
| 3 | B | vibe-coding-origin-karpathy | getting-started | 3 | deep-dive | 바이브코딩 용어의 기원과 Karpathy 2025 | 기초 | ai-vibe-coding-orientation | vibe-coding-origin-karpathy | v2-released |
| 4 | A | learning-with-ai-verification | getting-started | 4 | deep-dive | AI와 배울 때 검증이 먼저인 이유 | 기초 | ai-vibe-coding-orientation | ai-learning-verification | v2-released |
| 5 | C | from-prompt-to-system | getting-started | 5 | deep-dive | 프롬프트에서 시스템으로 | 기초 | ai-vibe-coding-orientation | agent-loop,context-engineering | v2-released |
| 6 | A | files-folders-and-paths | development-basics | 1 | deep-dive | 파일, 폴더, 경로를 정확히 이해하기 | 입문 | development-environment-map | files-folders-paths | v2-released |
| 7 | D | terminal-shell-basics-reference | development-basics | 2 | reference | 터미널·셸 기본 명령 레퍼런스 | 기초 | files-folders-and-paths | terminal-shell-commands | v2-released |
| 8 | A | variables-types-and-data-shapes | development-basics | 3 | deep-dive | 변수, 타입, 데이터 모양 | 입문 | files-folders-and-paths | variables-types-data | v2-released |
| 9 | A | control-flow-functions-errors | development-basics | 4 | deep-dive | 조건문, 반복문, 함수, 오류 | 입문 | variables-types-and-data-shapes | control-flow-functions-errors | v2-released |
| 10 | A | debugging-error-reading | development-basics | 5 | deep-dive | 오류 메시지를 읽고 디버깅하는 법 | 기초 | control-flow-functions-errors | debugging-error-reading | v2-released |
| 11 | D | regex-for-code-search | development-basics | 6 | reference | 코드 검색을 위한 정규식 레퍼런스 | 중급 | debugging-error-reading | regex-code-search | v2-released |
| 12 | D | package-json-and-semver | development-basics | 7 | reference | package.json과 Semantic Versioning | 기초 | terminal-shell-basics-reference | package-json-semver | v2-released |
| 13 | A | web-screen-anatomy | web-basics | 1 | deep-dive | 웹 화면은 어떻게 만들어지는가 | 입문 | files-folders-and-paths | html-semantic-elements,css-cascade-layout,javascript-dom-events,browser-rendering-network,http-request-response | v2-released |
| 14 | A | html-semantic-elements | web-basics | 2 | deep-dive | HTML 의미 구조와 접근성 | 기초 | web-screen-anatomy | html-semantic-elements | v2-released |
| 15 | A | css-cascade-layout-responsive | web-basics | 3 | deep-dive | CSS cascade, layout, responsive | 기초 | web-screen-anatomy | css-cascade-layout | v2-released |
| 16 | A | javascript-dom-events | web-basics | 4 | deep-dive | JavaScript, DOM, 이벤트 흐름 | 기초 | web-screen-anatomy | javascript-dom-events | v2-released |
| 17 | A | browser-rendering-network | web-basics | 5 | deep-dive | 브라우저 렌더링과 네트워크 탭 읽기 | 중급 | javascript-dom-events | browser-rendering-network | v2-released |
| 18 | A | http-request-response | web-basics | 6 | deep-dive | HTTP 요청과 응답의 실제 구조 | 기초 | browser-rendering-network | http-request-response | v2-released |
| 19 | A | json-data-contracts | web-basics | 7 | deep-dive | JSON과 데이터 계약 | 기초 | http-request-response | json-data-contracts | v2-released |
| 20 | A | web-security-basics | web-basics | 8 | deep-dive | 웹 보안 기초: XSS, CSRF, CORS | 중급 | http-request-response | web-security-basics | v2-released |
| 21 | A | typescript-react-nextjs | frontend-frameworks | 1 | deep-dive | TypeScript, React, Next.js는 왜 함께 쓰는가 | 기초 | javascript-dom-events | typescript-type-system,react-component-model,react-state-effects,nextjs-routing-rendering | v2-released |
| 22 | A | typescript-type-system | frontend-frameworks | 2 | deep-dive | TypeScript 타입 시스템의 실제 역할 | 기초 | typescript-react-nextjs | typescript-type-system | v2-released |
| 23 | A | react-component-mental-model | frontend-frameworks | 3 | deep-dive | React 컴포넌트 사고방식 | 기초 | typescript-react-nextjs | react-component-model | v2-released |
| 24 | A | react-state-and-effects | frontend-frameworks | 4 | deep-dive | React 상태와 effect의 경계 | 중급 | react-component-mental-model | react-state-effects | v2-released |
| 25 | A | nextjs-routing-rendering | frontend-frameworks | 5 | deep-dive | Next.js 라우팅과 렌더링 모델 | 중급 | react-component-mental-model | nextjs-routing-rendering | v2-released |
| 26 | A | tailwind-design-systems | frontend-frameworks | 6 | deep-dive | Tailwind와 디자인 시스템 사고 | 기초 | css-cascade-layout-responsive | tailwind-design-systems | v2-released |
| 27 | A | frontend-testing-basics | frontend-frameworks | 7 | deep-dive | 프론트엔드 테스트 기초 | 중급 | react-state-and-effects | frontend-testing-basics | v2-released |
| 28 | D | git-collaboration-basics | git-collaboration | 1 | reference | Git은 왜 개발자의 타임머신인가 | 기초 | terminal-shell-basics-reference | git-init-add-commit-status,git-branch-switch-merge,git-log-diff-show,github-pr-review-flow | v2-released |
| 29 | D | git-init-add-commit-status | git-collaboration | 2 | reference | git init/add/commit/status 레퍼런스 | 기초 | git-collaboration-basics | git-init-add-commit-status | v2-released |
| 30 | D | git-branch-switch-merge | git-collaboration | 3 | reference | git branch/switch/merge 레퍼런스 | 기초 | git-init-add-commit-status | git-branch-switch-merge | v2-released |
| 31 | D | git-log-diff-show | git-collaboration | 4 | reference | git log/diff/show 레퍼런스 | 기초 | git-init-add-commit-status | git-log-diff-show | v2-released |
| 32 | D | git-restore-reset-revert | git-collaboration | 5 | reference | git restore/reset/revert 복구 레퍼런스 | 중급 | git-log-diff-show | git-restore-reset-revert | v2-released |
| 33 | D | git-rebase-cherry-pick-stash | git-collaboration | 6 | reference | git rebase/cherry-pick/stash 레퍼런스 | 중급 | git-branch-switch-merge | git-rebase-cherry-pick-stash | released |
| 34 | D | github-pr-review-flow | git-collaboration | 7 | reference | GitHub PR, review, merge 전략 | 중급 | git-branch-switch-merge | github-pr-review-flow | released |
| 35 | D | gh-cli-reference | git-collaboration | 8 | reference | GitHub CLI 실무 레퍼런스 | 중급 | github-pr-review-flow | gh-cli-reference | released |
| 36 | A | api-db-backend-flow | data-backend | 1 | deep-dive | API와 DB는 제품 뒤에서 무엇을 하는가 | 기초 | http-request-response | http-request-response,rest-api-design,database-tables-indexes,auth-session-token,json-data-contracts | v2-released |
| 37 | A | rest-api-design | data-backend | 2 | deep-dive | REST API 설계와 상태 코드 | 기초 | api-db-backend-flow | rest-api-design | released |
| 38 | A | database-tables-indexes | data-backend | 3 | deep-dive | DB 테이블, 인덱스, 쿼리 기초 | 기초 | api-db-backend-flow | database-tables-indexes | released |
| 39 | A | auth-session-token | data-backend | 4 | deep-dive | 인증, 세션, 토큰 | 중급 | rest-api-design | auth-session-token | released |
| 40 | A | environment-variables-secrets | data-backend | 5 | deep-dive | 환경변수와 secret 관리 | 기초 | auth-session-token | environment-variables-secrets | released |
| 41 | A | api-security-rate-limits | data-backend | 6 | deep-dive | API 보안과 rate limit | 중급 | auth-session-token | api-security-rate-limits | released |
| 42 | A | backend-observability-logs | data-backend | 7 | deep-dive | 백엔드 로그와 관찰 가능성 | 중급 | rest-api-design | backend-observability-logs | released |
| 43 | A | build-and-runtime | deployment-ops | 1 | deep-dive | build time과 runtime 구분 | 기초 | nextjs-routing-rendering | build-and-runtime | v2-released |
| 44 | A | deployment-platforms | deployment-ops | 2 | deep-dive | Vercel, Firebase, 서버 배포 모델 | 기초 | build-and-runtime | deployment-platforms | released |
| 45 | D | npm-scripts-reference | deployment-ops | 3 | reference | npm scripts와 package manager 명령 | 기초 | package-json-and-semver | npm-scripts-reference | released |
| 46 | A | ci-cd-pipeline-basics | deployment-ops | 4 | deep-dive | CI/CD 파이프라인 기초 | 중급 | github-pr-review-flow | ci-cd-pipeline | released |
| 47 | A | production-env-and-secrets | deployment-ops | 5 | deep-dive | 운영 환경과 secret 배포 | 중급 | environment-variables-secrets | production-env-secrets | v2-released |
| 48 | A | monitoring-errors-rollbacks | deployment-ops | 6 | deep-dive | 모니터링, 오류 추적, 롤백 | 중급 | ci-cd-pipeline-basics | monitoring-errors-rollbacks | released |
| 49 | D | deployment-cli-reference | deployment-ops | 7 | reference | 배포 CLI 명령 레퍼런스 | 중급 | deployment-platforms | deployment-cli-reference | released |
| 50 | C | tokenization-and-context | ai-basics | 1 | deep-dive | 토큰화와 컨텍스트 비용 | 기초 | ai-vibe-coding-orientation | tokenization-context | v2-released |
| 51 | C | prompt-engineering-foundations | ai-basics | 2 | deep-dive | Prompt Engineering의 기본 원리 | 기초 | tokenization-and-context | prompt-engineering | v2-released |
| 52 | D | grounding-and-citations | ai-basics | 3 | reference | Grounding과 citation 레퍼런스 | 기초 | prompt-engineering-foundations | grounding-citations | v2-released |
| 53 | C | hallucination-and-verification | ai-basics | 4 | deep-dive | 환각과 검증 루틴 | 기초 | grounding-and-citations | hallucination-verification | v2-released |
| 54 | C | embeddings-and-similarity | ai-basics | 5 | deep-dive | 임베딩과 의미 유사도 | 중급 | tokenization-and-context | embeddings-similarity | v2-released |
| 55 | C | model-selection-tradeoffs | ai-basics | 6 | deep-dive | 모델 선택과 trade-off | 중급 | hallucination-and-verification | model-selection-tradeoffs | v2-released |
| 56 | B | ai-era-timeline | ai-basics | 7 | deep-dive | 자동완성에서 에이전트까지 AI 개발 시대 구분 | 기초 | vibe-coding-origin-karpathy | ai-era-timeline | v2-released |
| 57 | B | autocomplete-era | ai-coding-tools | 1 | deep-dive | 자동완성 시대: Copilot 이전과 이후 | 기초 | ai-era-timeline | autocomplete-era | v2-released |
| 58 | B | chat-coding-era | ai-coding-tools | 2 | deep-dive | 챗 코딩 시대: 대화형 개발의 장점과 한계 | 기초 | autocomplete-era | chat-coding-era | planned |
| 59 | B | ide-agent-era | ai-coding-tools | 3 | deep-dive | IDE 에이전트 시대 | 중급 | chat-coding-era | ide-agent-era | planned |
| 60 | B | codex-claude-cursor-comparison | ai-coding-tools | 4 | deep-dive | Codex, Claude Code, Cursor의 역할 비교 | 중급 | ide-agent-era | ai-coding-tool-comparison | planned |
| 61 | A | tool-permissions-sandboxes | ai-coding-tools | 5 | deep-dive | AI 도구 권한과 sandbox | 중급 | ide-agent-era | tool-permissions-sandboxes | planned |
| 62 | B | human-ai-collaboration-patterns | ai-coding-tools | 6 | deep-dive | 사람-AI 협업 패턴 | 기초 | chat-coding-era | human-ai-collaboration-patterns | planned |
| 63 | B | ai-code-review-tools | ai-coding-tools | 7 | deep-dive | AI 코드 리뷰 도구와 한계 | 중급 | frontend-testing-basics | ai-code-review-tools | kb_needed |
| 64 | C | context-engineering-basics | ai-system-design | 1 | deep-dive | Context Engineering 기초 | 기초 | from-prompt-to-system | context-engineering | v2-released |
| 65 | C | context-window-and-memory | ai-system-design | 2 | deep-dive | 컨텍스트 윈도와 메모리 관리 | 기초 | context-engineering-basics | context-engineering | v2-released |
| 66 | C | system-prompts-and-instruction-layers | ai-system-design | 3 | deep-dive | 시스템 프롬프트와 지침 계층 | 기초 | context-engineering-basics | context-engineering | v2-released |
| 67 | C | ai-workflow-design | ai-system-design | 4 | deep-dive | AI Workflow 설계: 단계 분해와 품질 게이트 | 중급 | context-engineering-basics | agent-loop | v2-released |
| 68 | C | context-engineering-mcp-skills | ai-system-design | 6 | deep-dive | Context Engineering, MCP, Skills의 관계 | 중급 | ai-workflow-design | context-engineering,mcp,skills | v2-released |
| 69 | C | tool-calling-basics | ai-system-design | 6 | deep-dive | Tool Calling: AI가 도구를 부르는 방식 | 중급 | context-engineering-basics | tool-calling | v2-released |
| 70 | C | rag-fundamentals | ai-system-design | 7 | deep-dive | RAG: 모델이 모르는 것을 알려주는 방법 | 중급 | context-window-and-memory | rag | v2-released |
| 71 | C | mcp-architecture-basics | ai-system-design | 8 | deep-dive | MCP 구조: 서버, 클라이언트, 도구, 리소스 | 중급 | tool-calling-basics | mcp,tool-calling | v2-released |
| 72 | C | designing-reusable-skills | ai-system-design | 10 | deep-dive | Skill 설계: 재사용 절차 만들기 | 중급 | context-engineering-mcp-skills | skills | v2-released |
| 73 | C | agent-loop-anatomy | ai-system-design | 10 | deep-dive | Agent의 구조: 도구 루프와 관찰-행동 사이클 | 중급 | tool-calling-basics | agent-loop,tool-calling | v2-released |
| 74 | C | subagents-and-delegation | ai-system-design | 11 | deep-dive | SubAgent와 위임 패턴 | 중급 | agent-loop-anatomy | agent-loop,subagents | v2-released |
| 75 | C | multi-agent-orchestration | ai-system-design | 12 | deep-dive | Orchestration: 여러 Agent의 협업 설계 | 중급 | subagents-and-delegation | orchestration | v2-released |
| 76 | C | loop-engineering-basics | ai-system-design | 13 | deep-dive | Loop Engineering: 반복 실행과 종료 조건 | 중급 | agent-loop-anatomy | agent-loop,loop-engineering | v2-released |
| 77 | C | harness-engineering-basics | ai-system-design | 14 | deep-dive | Harness Engineering: 실행 환경, 권한, 검증 장치 | 중급 | loop-engineering-basics | harness | v2-released |
| 78 | C | context-caching-and-state | ai-system-design | 15 | deep-dive | Context Caching과 상태 재사용 | 중급 | context-window-and-memory | context-caching | v2-released |
| 79 | D | ai-system-evaluation | ai-system-design | 16 | reference | AI 시스템 평가와 eval 레퍼런스 | 중급 | harness-engineering-basics | ai-system-evaluation | v2-released |
| 80 | B | requirement-to-task-breakdown | practical-vibe-coding | 1 | deep-dive | 요구사항을 작업 단위로 쪼개기 | 기초 | human-ai-collaboration-patterns | requirement-task-breakdown | kb_needed |
| 81 | B | prompt-to-implementation-loop | practical-vibe-coding | 2 | deep-dive | 프롬프트에서 구현 루프까지 | 중급 | requirement-to-task-breakdown | prompt-implementation-loop | kb_needed |
| 82 | A | code-change-risk-analysis | practical-vibe-coding | 3 | deep-dive | 코드 변경 위험 분석 | 중급 | debugging-error-reading | code-change-risk-analysis | kb_needed |
| 83 | A | ai-assisted-testing-loop | practical-vibe-coding | 4 | deep-dive | AI와 테스트 루프 설계 | 중급 | frontend-testing-basics | ai-assisted-testing-loop | kb_needed |
| 84 | B | refactoring-with-ai | practical-vibe-coding | 5 | deep-dive | AI와 리팩터링하기 | 중급 | code-change-risk-analysis | refactoring-with-ai | kb_needed |
| 85 | B | reviewing-ai-output | practical-vibe-coding | 6 | deep-dive | AI 결과물 리뷰하는 법 | 기초 | hallucination-and-verification | reviewing-ai-output | kb_needed |
| 86 | A | incident-style-ai-debugging | practical-vibe-coding | 7 | deep-dive | 장애 대응식 AI 디버깅 | 중급 | monitoring-errors-rollbacks | incident-ai-debugging | kb_needed |
| 87 | B | explain-web-flow | explanation-practice | 1 | deep-dive | 웹 요청 흐름을 남에게 설명하기 | 기초 | http-request-response | explain-web-flow | kb_needed |
| 88 | D | explain-context-and-rag | explanation-practice | 2 | reference | Context와 RAG 비교 레퍼런스 | 중급 | rag-fundamentals | explain-context-rag | kb_needed |
| 89 | D | explain-tool-agent-mcp | explanation-practice | 3 | reference | Tool Calling, Agent, MCP 관계 레퍼런스 | 중급 | mcp-architecture-basics | explain-tool-agent-mcp | kb_needed |
| 90 | B | explain-vibe-coding-history | explanation-practice | 4 | deep-dive | 바이브코딩의 역사와 오해 설명하기 | 기초 | vibe-coding-origin-karpathy | explain-vibe-coding-history | kb_needed |
| 91 | D | explain-risk-and-verification | explanation-practice | 5 | reference | 위험과 검증 설명 레퍼런스 | 중급 | reviewing-ai-output | explain-risk-verification | kb_needed |
| 92 | A | mini-saas-architecture | project-textbook | 1 | deep-dive | 미니 SaaS 아키텍처 교재 | 중급 | auth-session-token | mini-saas-architecture | kb_needed |
| 93 | A | admin-dashboard-project | project-textbook | 2 | deep-dive | 관리자 대시보드 프로젝트 교재 | 중급 | react-state-and-effects | admin-dashboard-project | kb_needed |
| 94 | C | ai-chatbot-project | project-textbook | 3 | deep-dive | AI 챗봇 프로젝트 교재 | 중급 | rag-fundamentals | ai-chatbot-project | kb_needed |
| 95 | C | automation-workflow-project | project-textbook | 4 | deep-dive | 자동화 Workflow 프로젝트 교재 | 중급 | ai-workflow-design | automation-workflow-project | kb_needed |
| 96 | C | mcp-enabled-tool-project | project-textbook | 5 | deep-dive | MCP 도구 연결 프로젝트 교재 | 중급 | mcp-architecture-basics | mcp-enabled-tool-project | kb_needed |
| 97 | D | git-recovery-playbook | project-textbook | 6 | reference | Git 복구 플레이북 | 중급 | git-restore-reset-revert | git-recovery-playbook | kb_needed |
| 98 | D | npm-debugging-playbook | project-textbook | 7 | reference | npm 설치·빌드 오류 복구 플레이북 | 중급 | npm-scripts-reference | npm-debugging-playbook | kb_needed |
| 99 | A | deployment-checklist-playbook | project-textbook | 8 | reference | 배포 체크리스트 플레이북 | 중급 | deployment-cli-reference | deployment-checklist-playbook | kb_needed |
| 100 | C | private-ai-learning-site-project | project-textbook | 9 | deep-dive | 비공개 AI 학습 사이트 완성 프로젝트 | 중급 | ai-chatbot-project | private-ai-learning-site-project | kb_needed |

## Required KB Inventory

The `KB ids` column is the canonical inventory. Existing qa-approved KBs to reinforce with Quote Bank first:

- context-engineering
- tool-calling
- mcp
- rag
- agent-loop

Existing needed KBs from O-01:

- skills
- orchestration
- harness

All other KB ids in the table are `needed` and will be collected in Phase 2 waves. A KB may support more than one lesson when the table lists multiple slugs against the same concept family.

## Self Check

- Lesson count: 100
- Pillar lower bounds: A 40, B 15, C 25, D 20
- Type coverage: deep-dive + reference
- MODULE_IDS unchanged
- Reference lessons present: 21
- V1 regeneration wave identified: 9 lessons
- BLOCKED items: none
