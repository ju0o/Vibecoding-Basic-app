# WF-00 자료 수집 Workflow (주제군 → 수집 노트 → 커리큘럼 재료)

강의 파이프라인(WF-01)보다 앞선 상류 공정. COLLECTION-PLAN의 주제군 12개를 수집 노트로 만든다.

```
[주제군 배정] → [출처 지도 수집(병렬)] → [출처 등록부 갱신] → [용어 후보 추출] → [커리큘럼 반영]
```

## 단계

### 1. 주제군 배정
- 담당: Chief AI Orchestrator
- 규칙: 주제군 1개 = Executor 1개 세션. **같은 주제군을 두 Executor에 배정 금지.** 서로 다른 주제군은 무제한 병렬
- 우선순위: COLLECTION-PLAN 하단의 우선순위표

### 2. 출처 지도 수집 (주제군 간 병렬)
- 담당: Source Collector Agent
- 입력: COLLECTION-PLAN의 주제군 정의
- 출력: `sources/notes/{topic-id}.md`
- 품질 기준: source-collector-agent.md의 완료 기준
- 실패 시: 노트가 기준 미달이면 같은 주제군을 보강 재실행 (다른 단계로 되돌릴 것 없음 — 시작점)

### 3. 출처 등록부 갱신 (순차 — SOURCE-REGISTRY 단일 작성자 구역)
- 담당: Research Agent (신규 출처 제안 검토) + 운영자 승인
- 출력: SOURCE-REGISTRY.md "제안 대기" → 정식 표 반영

### 4. 용어 후보 추출 (주제군 간 병렬)
- 담당: Terminology Agent
- 입력: 수집 노트
- 출력: `outputs/00-backlog/GLOSSARY-BACKLOG.md` 후보 추가 (이후 WF-02로 생산)

### 5. 커리큘럼 반영
- 담당: Curriculum Agent
- 입력: 수집 노트의 "공식 문서 목차 구조"
- 출력: `roadmap/CURRICULUM-MAP.md` 보강, 모듈 분해(WF-04) 착수 근거
- 이 단계부터 WF-04 → WF-01로 이어진다

## 병렬/순차 요약
| 단계 | 병렬 |
|---|---|
| 2 수집 | 주제군 간 병렬 (최대 12) |
| 3 등록부 | 순차 (단일 파일) |
| 4 용어 후보 | 주제군 간 병렬, GLOSSARY-BACKLOG 반영만 순차 |
| 5 커리큘럼 | 순차 (Curriculum 단일 작성자) |

## 노후화 관리
- 최신성 "매우 높음" 주제군(T08~T11)의 수집 노트는 분기마다 재확인 (WF-03 정기 점검과 통합 실행)
