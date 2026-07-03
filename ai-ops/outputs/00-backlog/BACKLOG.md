# 강의 Backlog

Curriculum Agent만 이 파일을 수정한다. (단일 작성자 구역)
상태: `proposed`(제안) → `approved`(운영자 승인) → `in_pipeline`(PIPELINE.md로 이관)

## ai-system-design 모듈 분해 (2026-07-03, Curriculum Agent)

### 모듈 goal 분해 — "AI 기능을 일회성 프롬프트가 아니라 시스템으로 설계한다"
이 모듈을 마친 사람이 설명할 수 있어야 하는 것:
1. 프롬프트 한 번과 시스템 설계의 차이 (무엇이 시스템의 구성요소인가)
2. 컨텍스트를 설계하는 방법 (재료, 윈도 한계, 지침 계층)
3. 작업을 Workflow로 분해하고 품질 게이트를 놓는 방법
4. MCP가 도구 연결을 표준화하는 구조
5. Skill이 반복 절차를 고정하는 방식
6. Agent의 동작 원리 (도구 루프)와 SubAgent 위임
7. 여러 Agent의 Orchestration (병렬·순차·충돌 방지)
8. Loop Engineering (반복 실행·종료 조건)과 Harness Engineering (실행 환경·권한·검증 장치)

### 기존 강의와의 경계
- 기존: `context-engineering-mcp-skills` (order 6, 중급) — CE·MCP·Skills의 **관계 조망(종합)** 강의로 유지. 새 강의 1~5는 그 앞의 기초를, 7~13은 각 주제의 심화를 맡는다.
- 처리 방식 (b) 범위 조정: 신규 1번 강의는 "한계와 지도"만 다루고 CE/MCP/Skills 각각의 상세는 다루지 않는다 (기존 강의와 경계 유지).
- 개정 후보: 기존 강의에 앞뒤 강의로의 연결 문구 추가 → REVISION-BACKLOG 등록 예정 (WF-03, 신규 강의 배포 후).
- 프롬프트 작성 기초(좋은 지시문 자체)는 이 모듈이 아니라 `ai-basics` 모듈(order 8) 소관 — 여기서는 다루지 않음.

### 강의 목록

| 우선순위 | slug | moduleId | order | 제목 | 레벨 | 선행 slug | 상태 |
|---|---|---|---|---|---|---|---|
| 1 | from-prompt-to-system | ai-system-design | 1 | 프롬프트에서 시스템으로 | 기초 | ai-vibe-coding-orientation | proposed |
| 2 | context-engineering-basics | ai-system-design | 2 | Context Engineering 기초: AI가 판단할 재료 설계 | 기초 | from-prompt-to-system | proposed |
| 3 | context-window-and-memory | ai-system-design | 3 | 컨텍스트 윈도와 메모리 관리 | 기초 | context-engineering-basics | proposed |
| 4 | system-prompts-and-instruction-layers | ai-system-design | 4 | 시스템 프롬프트와 지침 계층 | 기초 | context-engineering-basics | proposed |
| 5 | ai-workflow-design | ai-system-design | 5 | AI Workflow 설계: 단계 분해와 품질 게이트 | 중급 | context-engineering-basics | proposed |
| — | (기존) context-engineering-mcp-skills | ai-system-design | 6 | Context Engineering, MCP, Skills의 관계 | 중급 | — | released(기존) |
| 6 | mcp-architecture-basics | ai-system-design | 7 | MCP 구조: 서버, 클라이언트, 도구, 리소스 | 중급 | context-engineering-mcp-skills | proposed |
| 7 | designing-reusable-skills | ai-system-design | 8 | Skill 설계: 재사용 절차 만들기 | 중급 | context-engineering-mcp-skills | proposed |
| 8 | agent-loop-anatomy | ai-system-design | 9 | Agent의 구조: 도구 루프와 관찰-행동 사이클 | 중급 | mcp-architecture-basics, designing-reusable-skills | proposed |
| 9 | subagents-and-delegation | ai-system-design | 10 | SubAgent와 위임 패턴 | 중급 | agent-loop-anatomy | proposed |
| 10 | multi-agent-orchestration | ai-system-design | 11 | Orchestration: 여러 Agent의 협업 설계 | 중급 | subagents-and-delegation | proposed |
| 11 | loop-engineering-basics | ai-system-design | 12 | Loop Engineering: 반복 실행과 종료 조건 | 중급 | agent-loop-anatomy | proposed |
| 12 | harness-engineering-basics | ai-system-design | 13 | Harness Engineering: 실행 환경, 권한, 검증 장치 | 중급 | loop-engineering-basics | proposed |

### 강의별 모듈 goal 기여 (한 줄씩)
1. `from-prompt-to-system` → goal 1: 일회성 프롬프트의 한계를 사례로 보이고, 시스템 구성요소(컨텍스트/도구/절차/에이전트) 지도를 그린다
2. `context-engineering-basics` → goal 2: 목표·자료·제약·완료 기준을 구조화하는 방법
3. `context-window-and-memory` → goal 2: 윈도 한계, 토큰, 요약·압축·캐시 같은 맥락 유지 기법
4. `system-prompts-and-instruction-layers` → goal 2: 시스템 프롬프트, 프로젝트 지침 파일(CLAUDE.md 류), 지침 우선순위
5. `ai-workflow-design` → goal 3: 작업 분해, 파일 핸드오프, 품질 게이트 (이 사이트의 ai-ops가 실물 예시)
6. `mcp-architecture-basics` → goal 4: MCP의 구성요소와 연결 구조
7. `designing-reusable-skills` → goal 5: 절차의 문서화·재사용 조건
8. `agent-loop-anatomy` → goal 6: 관찰→판단→행동 루프, 도구 호출
9. `subagents-and-delegation` → goal 6: 위임 기준, 컨텍스트 격리
10. `multi-agent-orchestration` → goal 7: 병렬/순차 판단, 충돌 방지, 조정자 역할
11. `loop-engineering-basics` → goal 8: 반복 개선 루프, 종료 조건, 폭주 방지
12. `harness-engineering-basics` → goal 8: 권한 경계, 샌드박스, 자동 검증 장치

### 검증 결과 (SK-03 DoD)
- [x] order 중복 없음 (1~13, 6은 기존 강의)
- [x] 선행 강의가 항상 대상보다 앞 순서 (8번의 선행 7·8 → order 9보다 앞 ✓)
- [x] 레벨 곡선 역행 없음 (기초×4 → 중급×9)
- [x] 기존 강의·backlog와 제목·범위 중복 없음 (경계는 위 "기존 강의와의 경계"에 기록)
- [x] slug 규칙 준수 (kebab-case 3~6단어)

## 작성 규칙
- slug: kebab-case 영문 3~6단어 (SK-03 참조)
- 선행 slug는 기존 강의 또는 backlog 상위 항목이어야 함
