# 리서치 브리프: from-prompt-to-system

- 강의: 프롬프트에서 시스템으로 (ai-system-design, order 1, 기초)
- 작성: Research Agent (Claude Fable 5), 확인 날짜: 2026-07-03
- 경계: 이 강의는 "한계와 구성요소 지도"만 다룬다. CE/MCP/Skills 상세는 order 2~13 담당.

## 1. 주제 한 줄 정의
AI 시스템 설계란 일회성 프롬프트 대신, AI가 안정적으로 일하도록 컨텍스트·도구·절차·검증을 갖춘 구조를 만드는 일이다.
— 근거: Anthropic은 프롬프트 엔지니어링("효과적인 프롬프트 작성")에서 컨텍스트 엔지니어링("모델의 원하는 행동을 만들 가능성이 가장 높은 컨텍스트 구성 관리")으로의 진화를 설명 — [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (2026-07-03 확인)

## 2. 등장 배경과 해결하는 문제
- 초기 AI 활용 = 프롬프트 1회 → 답변 1회. 실제 개발 작업은 여러 단계·도구·파일이 필요.
- Anthropic 정의: 에이전트란 "LLMs autonomously using tools in a loop" (도구를 반복 사용하는 LLM) — 루프가 돌수록 컨텍스트가 쌓이고 관리가 필요해짐 — [출처 1](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- "context rot": 컨텍스트 윈도의 토큰이 늘수록 정보 회상 정확도가 떨어짐 → 컨텍스트는 "한계 효용이 감소하는 유한 자원" — [출처 1](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- 해결하는 문제: 결과 비일관성, 매번 처음부터 설명하는 비용, 검증 없는 산출물, 도구 연결의 중복 개발

## 3. 핵심 개념 (5개 — 구성요소 지도)
1. **프롬프트 엔지니어링**: 요청 문장을 잘 쓰는 기술. Anthropic 공식 가이드는 시작 전제로 "성공 기준 정의 + 검증 방법"을 요구 — [Prompt engineering overview](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview) (2026-07-03 확인, docs.anthropic.com에서 이전됨)
2. **컨텍스트(재료)**: 시스템 프롬프트, 도구, 예시, 메시지 이력이 컨텍스트의 구성요소 — [출처 1](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
3. **도구 연결(MCP)**: "AI 애플리케이션을 외부 시스템에 연결하는 오픈소스 표준", 공식 비유 "AI 애플리케이션의 USB-C 포트" — [modelcontextprotocol.io](https://modelcontextprotocol.io/) (2026-07-03 확인)
4. **절차(Skill)와 흐름(Workflow)**: Skill = 반복 지시를 SKILL.md 파일로 저장해 재사용 ("같은 지시·체크리스트·다단계 절차를 반복해서 붙여넣게 될 때 만들라") — [Claude Code Skills docs](https://code.claude.com/docs/en/skills) (2026-07-03 확인). Workflow = "사전 정의된 코드 경로로 오케스트레이션되는 LLM과 도구", Agent = "동적으로 자신의 프로세스와 도구 사용을 지휘하는 LLM" — [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (2026-07-03 확인)
5. **검증(측정과 반복)**: 성공 핵심은 "성과 측정과 반복(measuring performance and iterating)". 원칙: 단순성, 투명성, 도구 문서화·테스트 — [출처 2](https://www.anthropic.com/engineering/building-effective-agents)

## 4. 대표 예시 후보
- (실제 예시) 같은 요청 "검색 기능 만들어줘"의 두 버전: 한 줄 프롬프트 vs 목표+파일+규칙+완료 기준을 갖춘 작업 지시 — 이 사이트의 ai-ops 파이프라인 자체를 예시로 사용 가능
- (코드 예시) 한 줄 프롬프트 문자열 → 구조화된 작업 명세 타입(before/after 대비). 기존 강의(order 6)의 AgentContext 타입과 겹치지 않게 "요청 명세" 관점으로 작성
- (권고 인용) "가장 단순한 솔루션을 찾고, 필요할 때만 복잡성을 높여라" / "단일 LLM 호출 최적화만으로 충분한 경우가 많다" — [출처 2](https://www.anthropic.com/engineering/building-effective-agents)

## 5. 자주 혼동되는 개념
- 프롬프트 엔지니어링 vs 시스템 설계: 전자는 문장 기술, 후자는 문장+재료+도구+절차+검증의 구조. 좋은 프롬프트는 시스템의 부품이지 대체재가 아님
- Workflow vs Agent: 경로가 사전 정의(Workflow) vs 모델이 동적 결정(Agent) — [출처 2]
- "시스템 = 무조건 복잡"이라는 오해: 공식 권고는 오히려 단순성 우선 — [출처 2]

## 6. 참고 출처 목록
| # | 제목 | URL | 사용 섹션 |
|---|---|---|---|
| 1 | Effective context engineering for AI agents (Anthropic Engineering) | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | 한 줄 정의, 왜 생겼는가, 핵심 개념 |
| 2 | Building effective agents (Anthropic Engineering) | https://www.anthropic.com/engineering/building-effective-agents | 핵심 개념, 헷갈리는 것, 실무 |
| 3 | Model Context Protocol | https://modelcontextprotocol.io/ | 핵심 개념(도구 연결) |
| 4 | Prompt engineering overview (Claude Docs) | https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview | 핵심 개념(프롬프트), 헷갈리는 것 |
| 5 | Agent Skills (Claude Code Docs) | https://code.claude.com/docs/en/skills | 핵심 개념(절차) |

공식 출처 5/5 (100%).

## 7. 선행 강의/용어
- 선행 강의: ai-vibe-coding-orientation (요청-검증 루틴), ai-basics 모듈 개념(좋은 지시 만들기 — 아직 미작성이므로 본문에서 자체 한 줄 풀이 필요)
- 용어 후보: AI 시스템 설계, Context Engineering(기존 용어사전 확인 필요), Workflow, Agent(기존 확인 필요)

## [출처 미확보]
없음

## 심화 참고 (이 강의에서 사용 금지, order 3·12용)
- context rot의 정량 연구 상세, compaction/구조화 메모/멀티에이전트 기법 — order 3 (context-window-and-memory)에서 사용
