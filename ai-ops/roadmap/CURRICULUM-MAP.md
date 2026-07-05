# Curriculum Map V2 — 100-Lesson Deep Archive

Updated: 2026-07-05
Executor: Codex Phase 1
Status: 확정. CODEX-PLAN v2에 따라 운영자 승인 없이 Phase 2로 진행한다.

## Goal

AI Vibe Coding Master는 개요형 블로그가 아니라 바이브코딩을 깊게 이해하기 위한 지식 아카이브다. 기존 13개 `MODULE_IDS`는 유지하고, 4개 지식 기둥과 자가 확장 주제를 총 100강으로 배치한다.

## Four Pillars

| Pillar | Target | Lesson Count | Curriculum Role |
|---|---:|---:|---|
| A. 코딩 기반 | IDE, 터미널, 웹, 프론트엔드, API/DB, 배포, 보안 | 40 | 바이브코딩을 검증할 수 있는 개발 언어를 만든다. |
| B. 바이브코딩 본체 | Karpathy 2025, 자동완성→챗 코딩→에이전트 시대, 도구·문화 변화 | 15 | 용어의 등장 배경과 흐름을 이해하게 한다. |
| C. AI 엔지니어링 | Context/Prompt/Loop/Harness Engineering, Tool Calling, RAG, MCP, Agent, Orchestration | 25 | AI 기능을 시스템으로 설계하는 핵심 축이다. |
| D. 레퍼런스 | Git/GitHub, 터미널, npm, 배포 명령 | 20 | 실무 중 바로 찾아보는 명령어 지식 기반이다. |

Total: 100 lessons.

## Module Distribution

| Module ID | Title | Pillars | Lesson Count | Notes |
|---|---|---|---:|---|
| getting-started | 시작하기 | A, B | 5 | 학습법, 바이브코딩 기원, 개발 환경 개요 |
| development-basics | 개발 기초 | A, D | 7 | 파일, 터미널, 변수, 오류, 명령 기초 |
| web-basics | 웹 개발 기초 | A | 8 | HTML/CSS/JS, 브라우저, HTTP/JSON |
| frontend-frameworks | 프론트엔드 프레임워크 | A | 7 | TypeScript, React, Next.js, 상태와 렌더링 |
| git-collaboration | Git & 협업 | A, D | 8 | Git/GitHub 레퍼런스 핵심 |
| data-backend | 데이터와 백엔드 | A | 7 | API, DB, 인증, 환경변수, 보안 |
| deployment-ops | 배포와 운영 | A, D | 7 | 빌드, CI/CD, 로그, 패키지 명령 |
| ai-basics | AI 활용 기초 | B, C | 7 | 토큰, 모델, 프롬프트, 검증 |
| ai-coding-tools | AI 코딩 도구 | B, C | 7 | 자동완성, 챗 코딩, IDE 에이전트 |
| ai-system-design | AI 시스템 설계 | C | 16 | 기존 M10 전체를 V2 심층 트랙으로 확장 |
| practical-vibe-coding | 실전 바이브코딩 | A, B, C | 7 | 요구사항→구현→검증 루틴 |
| explanation-practice | 설명 연습 | B, C | 5 | 남에게 설명하기 위한 개념 연결 |
| project-textbook | 실전 프로젝트 교재 | A, C, D | 9 | SaaS, 챗봇, 자동화, 관리자 도구, 레퍼런스 묶음 |

## Self-Discovered Topics

CODEX-PLAN §2의 자가 확장 기준에 따라 다음 주제를 포함한다.

| Topic | Why It Belongs |
|---|---|
| HTTP / JSON | API, Tool Calling, RAG 결과 전달 모두 구조화된 요청·응답 위에 선다. |
| 환경변수 | API 키, 배포, AI 도구 보안의 최소 단위다. |
| 정규식 | 검색, 로그 분석, 텍스트 전처리, 코드 수정 요청에 자주 등장한다. |
| 토큰화 | 컨텍스트 윈도, 비용, RAG chunking을 이해하는 바닥 개념이다. |
| 임베딩 | RAG, 검색, 의미 기반 분류의 핵심이다. |
| Context Caching | 긴 컨텍스트 비용과 재사용 전략을 설명하는 데 필요하다. |
| Semantic Versioning | 패키지 설치, API 변경, 배포 위험을 이해하는 기준이다. |
| CI/CD | AI가 만든 코드를 검증하고 배포하는 안전장치다. |
| Observability | 로그, 모니터링, eval 결과를 해석하는 운영 언어다. |

## Learning Graph Rules

- 모든 신규 강의는 `type: deep-dive` 또는 `type: reference`를 가진다.
- reference 강의는 명령어별 `###` 소절을 사용한다.
- V2 강의 본문은 8섹션이다: definition, why, how-it-works, spec, primary-sources, in-practice, limits, further-reading.
- KB id는 backlog의 `KB ids` 열을 기준으로 생성한다.
- 선행 그래프는 같은 모듈 안에서 앞 order를 우선하고, cross-module 선행은 이미 등장한 기본 개념만 지정한다.

## Phase 2 Wave Order

1. V1 9강 V2 재생성: 기존 KB 5건 Quote Bank 보강 후 진행.
2. C 기둥 완성: AI 시스템 설계 M10 나머지 + agent/subagent/orchestration/harness.
3. B 기둥: 바이브코딩 역사와 도구 시대 흐름.
4. A 기둥: 코딩 기반 심층.
5. D 기둥: Git/GitHub/터미널/npm 레퍼런스.
6. 자가 확장분: HTTP/JSON, env, regex, tokenization, embeddings, CI/CD, observability 보강.

See `ai-ops/outputs/00-backlog/BACKLOG.md` for the canonical 100-row lesson queue.
