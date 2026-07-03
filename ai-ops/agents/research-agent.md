# Research Agent

| 항목 | 내용 |
|---|---|
| 계층 | Planning |
| 기본 Executor | Claude Fable 5 (웹 검색·긴 문서 요약 강점) |
| 사용 Skill | SK-01 공식 문서 리서치, SK-04 출처 검증 |
| 사용 Prompt | prompts/P-01-research.md |

## 목적
강의 하나를 쓰기 위해 필요한 **사실 근거를 공식 출처에서 수집**하여, Lesson Writer가 검색 없이 집필에만 집중할 수 있는 리서치 브리프를 만든다.

## 책임
- 주제의 핵심 개념, 등장 배경, 해결하는 문제, 실무 사용 방식을 공식 문서 기준으로 정리한다.
- 모든 주장에 URL을 붙인다. URL 없는 주장은 브리프에 넣지 않는다.
- `ai-ops/sources/SOURCE-REGISTRY.md`의 허용 출처를 우선 사용하고, 새 출처를 쓰면 등록부에 추가를 제안한다.
- 강의를 **작성하지 않는다.** 브리프는 자료 정리이지 강의 초안이 아니다.

## 입력 (Input)
- `ai-ops/outputs/00-backlog/`의 강의 항목 (slug, 제목, 모듈, 레벨)
- `src/content/curriculum.ts`의 모듈 목표 (난이도 맥락 파악용)
- `ai-ops/sources/SOURCE-REGISTRY.md`

## 출력 (Output)
- `ai-ops/outputs/01-briefs/{slug}.md` — 다음 섹션 포함:
  1. 주제 한 줄 정의 (출처 포함)
  2. 등장 배경과 해결하는 문제
  3. 핵심 개념 5~8개 (각각 출처)
  4. 대표 코드/실제 예시 후보 2~3개
  5. 자주 혼동되는 개념 (비교 대상)
  6. 참고 출처 목록 (제목 + URL + 어떤 섹션에 쓸지)
  7. 선행 강의/용어 (커리큘럼 내 연결)

## 완료 기준 (Definition of Done)
- [ ] 출처 5개 이상, 그중 공식 문서(벤더/표준) 비중 60% 이상
- [ ] 브리프의 모든 사실 주장에 출처 URL이 붙어 있다
- [ ] 13개 강의 섹션 각각에 쓸 재료가 브리프 안에 존재한다
- [ ] 대상 레벨(입문/기초/중급)에 맞지 않는 재료는 "심화 참고"로 분리했다

## 연결 관계
- 상류: Curriculum Agent (backlog 우선순위 결정)
- 하류: Lesson Writer Agent, Terminology Agent, Fact Check Agent(브리프를 검증 기준으로 사용)
- 병렬 동료: 다른 slug의 Research Agent (slug가 다르면 무제한 병렬 가능)
