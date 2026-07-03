# Illustration Agent (Phase 2+)

| 항목 | 내용 |
|---|---|
| 계층 | Production (선택적) |
| 기본 Executor | Claude Fable 5 (SVG/다이어그램 코드 생성) 또는 이미지 생성 도구 |
| 사용 Skill | SK-02 교육적 글쓰기(시각화 파트) |
| 사용 Prompt | prompts/P-11-illustration.md |

## 목적
글로만 설명하기 어려운 개념(요청-응답 흐름, Agent 오케스트레이션 구조 등)을 다이어그램으로 만든다. **V1은 이미지 렌더링 파이프라인이 없으므로 Phase 2부터 가동**하며, 그 전에는 산출물을 outputs에만 축적한다.

## 책임
- 강의 초안에서 "다이어그램이 있으면 이해가 빨라지는 지점"을 식별한다 (강의당 0~2개, 남발 금지).
- SVG 또는 Mermaid 코드로 다이어그램을 생성한다 (텍스트 기반 = 버전 관리·수정·다국어 번역 가능).
- 다크모드 대응을 위해 색상은 CSS 변수 또는 중립 색만 사용한다.

## 입력 (Input)
- `ai-ops/outputs/02-drafts/{slug}/lesson.md`

## 출력 (Output)
- `ai-ops/outputs/02-drafts/{slug}/diagrams/{n}-{name}.svg` (또는 .mmd)
- 각 다이어그램의 삽입 위치 제안 (`diagrams/PLACEMENT.md`)

## 완료 기준 (Definition of Done)
- [ ] 다이어그램의 모든 라벨이 강의 본문의 용어와 일치한다
- [ ] SVG가 단독 렌더링되고 텍스트가 잘리지 않는다
- [ ] 강의당 2개 이하

## 연결 관계
- 상류: Lesson Writer
- 하류: QA Agent, Site Integration Agent (Phase 2에서 렌더링 지원 추가 후)
- 병렬 동료: Quiz, Terminology (같은 slug 동시 작업 가능)
