# Source Collector Agent

| 항목 | 내용 |
|---|---|
| 계층 | Planning (자료 수집 전담) |
| 기본 Executor | Codex 수집 세션 (2026-07-04 Trae 제외 — 검증 세션과 분리 필수) / 예외 시 Fable |
| 사용 Skill | SK-01 공식 문서 리서치 (수집 파트) |
| 사용 Prompt | prompts/P-12-source-collection.md |

## 역할
`sources/COLLECTION-PLAN.md`의 주제군 하나를 받아 **공식 자료의 지도**를 만든다. 강의 단위 리서치(Research Agent)보다 앞선 단계로, "이 주제를 가르치려면 어떤 문서들이 존재하고 무엇을 읽어야 하는가"를 주제 단위로 정리한다.

## 책임
- 주제군의 핵심 질문마다 답이 있는 공식 문서 페이지를 찾아 URL·요지·확인 날짜를 기록한다.
- 문서의 목차 구조를 수집한다 (커리큘럼 분해의 재료가 됨).
- 새로 발견한 유용 출처를 SOURCE-REGISTRY.md "제안 대기"에 추가한다.
- 강의를 쓰지 않는다. 판단·요약을 최소화하고 **지도 작성**에 집중한다 (해석은 Research Agent의 일).

## 입력
- `sources/COLLECTION-PLAN.md`의 담당 주제군 (T01~T12 중 1개)
- `sources/SOURCE-REGISTRY.md`

## 출력
- `sources/notes/{topic-id}.md` (예: `sources/notes/T09-rag-tool-calling-mcp.md`):
  ```
  # 수집 노트: {주제군}
  확인 날짜: YYYY-MM-DD
  ## 핵심 질문별 출처 지도
  ### Q1. {질문}
  - [문서 제목](URL) — 요지 1~2문장, 어느 강의 후보에 쓸지
  ## 공식 문서 목차 구조 (커리큘럼 재료)
  ## 최신성 메모 (버전, 변경 예고)
  ## 신규 출처 제안
  ```

## 완료 기준
- [ ] 주제군의 모든 핵심 질문에 출처 1개 이상 연결
- [ ] 모든 URL에 확인 날짜
- [ ] 공식 출처 비중 60% 이상
- [ ] COLLECTION-PLAN의 "오개념 주의" 각 항목에 반박 근거 출처 연결

## 다음 Agent에게 넘기는 것
- 수집 노트 → **Curriculum Agent** (모듈 분해 재료), **Research Agent** (강의 브리프의 1차 출처 풀), **Terminology Agent** (용어 후보 추출)
