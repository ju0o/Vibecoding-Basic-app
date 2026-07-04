# Knowledge Base (KB) — 프로젝트의 Single Source of Truth

이 폴더는 프로젝트의 **모든 지식의 원천**이다. 강의, 용어 사전, 검색, PDF 교재, AI Tutor, 영상 스크립트는 전부 KB 문서에서 파생되며, KB에 없는 사실은 어떤 파생 콘텐츠에도 들어갈 수 없다.

## 왜 KB인가 (기존 브리프 방식과의 차이)

| | 구 방식 (강의별 브리프) | KB 방식 |
|---|---|---|
| 단위 | 강의 1개당 리서치 1회 | **개념 1개당 지식 문서 1개** (여러 강의가 재사용) |
| 검증 | 강의 초안을 검증 | **지식 자체를 검증** — 파생물은 재검증 부담 최소화 |
| 노후화 | 강의마다 출처 흩어짐 | KB 문서만 갱신하면 파생물 개정 대상이 자동 식별됨 |
| 확장 | 매체 추가 시 재작업 | PDF·튜터·영상이 같은 KB를 소비 |

## 폴더 구조

```
knowledge-base/
  README.md            ← 이 문서 (데이터 모델 + 운영 규칙)
  _TEMPLATE.md         KB 문서 템플릿
  entries/             KB 본체 — 주제군(T01~T12)별 폴더
    T09/mcp.md
    T09/rag.md
    T10/agent-loop.md ...
  reviews/             검증·스코어 보고서, 재수집 요청서
    {concept-id}/verification-report.md
    {concept-id}/recollection-request-{n}.md
```

## 데이터 모델 (KB 문서 1개 = 개념 1개)

### Frontmatter (기계 가독 — 그래프·검색·파생 추적용)

```yaml
---
id: mcp                        # 파일명과 동일, kebab-case — 전 시스템에서 이 id로 참조
title: "MCP (Model Context Protocol)"
topicGroup: T09                # sources/COLLECTION-PLAN.md의 주제군
status: draft                  # draft → verified → approved (score 통과) → stale (노후 판정)
score: null                    # Knowledge Score (qa/KNOWLEDGE-SCORE.md, approved 시 80+)
level: 중급                    # 이 개념을 처음 가르칠 적정 레벨
prerequisites: [tool-calling]  # 선행 개념 (KB id)
successors: [mcp-server-build] # 후행 개념 (KB id — 아직 없어도 예약 가능)
related: [skills, agent-loop]  # 관련 기술 (KB id)
consumers:                     # 이 KB에서 파생된 콘텐츠 (Site Integration이 갱신)
  lessons: []                  # 강의 slug
  glossary: []                 # 용어 term
sources:
  - { title: "MCP 공식", url: "https://modelcontextprotocol.io/", checked: 2026-07-04 }
updated: 2026-07-04
---
```

### 본문 13개 필수 섹션

| # | 섹션 | 내용 | 파생 대상 |
|---|---|---|---|
| 1 | ## 정의 | 첫 문장 = 60자 이내 한 줄 정의(명사형) + 2~3문장 확장 | 강의 "한 줄 정의", glossary shortDefinition |
| 2 | ## 역사 | 언제, 누가, 왜 만들었나 (연도·버전에 출처) | 강의 "왜 생겼는가" |
| 3 | ## 해결하려는 문제 | 이것이 없을 때의 고통 | 강의 "어떤 문제를 해결하는가" |
| 4 | ## 핵심 개념 | 구성요소·동작 원리 3~8개, 각각 출처 | 강의 "핵심 개념" |
| 5 | ## 관련 기술 | 함께 쓰이거나 비교되는 것과 차이 | 강의 "자주 헷갈리는 것" 재료 |
| 6 | ## 선행 개념 | frontmatter prerequisites의 이유 설명 | 커리큘럼 순서 근거 |
| 7 | ## 후행 개념 | 이걸 알면 다음에 배울 것 | 커리큘럼 순서 근거 |
| 8 | ## AI 시대에서의 의미 | 바이브코딩 실무와의 구체적 연결 | 강의 동명 섹션 |
| 9 | ## 실무 활용 | 실제 사용 장면 2~3개, 예시 코드 후보 | 강의 "실제 예시"·"코드 예시"·"실무에서 쓰는 방식" |
| 10 | ## FAQ | 학습자가 묻는 질문 3~5개와 답 | AI Tutor, 강의 보강 |
| 11 | ## 자주 하는 실수 | 오개념·실수 3~5개와 교정 | 퀴즈 오답 재료, 강의 "자주 헷갈리는 것" |
| 12 | ## 공식 출처 | frontmatter sources의 상세 (어떤 주장에 어떤 출처) | 강의 "참고 출처" |
| 13 | ## 변경 이력 | `- YYYY-MM-DD: 변경 내용 (담당, 프롬프트)` append 전용 | 파생물 개정 트리거 |

## SSOT 운영 규칙

1. **파생물은 KB를 인용하지, 재조사하지 않는다.** Lesson 생성 프롬프트의 입력은 KB 문서다. KB에 없는 사실이 필요하면 강의를 쓰지 말고 KB 보강(재수집 루프)을 먼저 한다.
2. **approved만 소비 가능.** status가 approved가 아닌 KB에서 강의를 생성할 수 없다 (Knowledge Score 80+ 필수).
3. **KB 수정 = 파생물 점검.** KB 문서가 갱신되면 frontmatter `consumers`에 나열된 강의·용어가 자동으로 개정 후보(REVISION-BACKLOG)가 된다.
4. **변경 이력은 삭제 금지** (append 전용). 노후화 점검은 sources의 `checked` 날짜 기준.
5. **id는 불변.** 한 번 참조된 KB id는 이름을 바꾸지 않는다 (consumers 추적이 깨짐).

## 매체별 파생 규칙

| 매체 | 파생 방법 | 상태 |
|---|---|---|
| 강의 (13섹션) | 위 표의 파생 대상 매핑 — 강의 1개는 KB 1~3개를 소비 | 현행 |
| 용어 사전 | 정의 첫 문장 → shortDefinition, 정의 확장 → explanation, related → related | 현행 |
| 검색 | frontmatter 인덱싱 (id, title, 정의 첫 문장) | Phase 2 |
| PDF 교재 | 모듈별 KB + 강의 병합 렌더링 | Phase 3 |
| AI Tutor | KB 전체가 컨텍스트 소스 (FAQ 섹션 우선) | Phase 3 |
| 영상 강의 | 강의 md + KB FAQ → 스크립트 | Phase 4 |

## Agent 역할 매핑 (KB 체제)

| 단계 | Agent | Executor | 프롬프트 |
|---|---|---|---|
| KB 수집·작성 | Source Collector (확장: Knowledge Collector) | Codex (수집 세션) | P-01 |
| KB 검증·스코어 | Fact Check + Education Review + QA (통합 실행) | Codex (검증 세션 — 수집과 분리) + **Fable 승인** | P-02 |
| KB 재수집 루프 | Source Collector | Codex (수집 세션) | P-03 |
| Lesson 생성 | Lesson Writer + Quiz + Terminology (통합 실행) | Codex | P-04 |
| 사이트 반영 | Site Integration | Codex | P-05 |
| 빌드 검증 | Release (Build QA) | Cline | P-06 |
| 빌드 수정 루프 | Site Integration | Codex | P-07 |
| 릴리스 | Release | Cline | P-08 |
| 커리큘럼·최종 편집 | Curriculum / Final Editorial | Fable (오케스트레이터) | O-01 / O-02 |
