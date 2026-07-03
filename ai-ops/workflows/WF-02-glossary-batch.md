# WF-02 용어 대량 생산 Workflow

강의와 독립적으로 용어 사전을 확장할 때 사용 (목표: 3,000개+).

```
[용어 후보 수집] → [배치 분할] → [정의 집필(병렬)] → [중복·일관성 검사(배치 단위)] → [통합(순차)]
```

## 단계

### 1. 후보 수집
- 담당: Terminology Agent
- 입력: 기존 강의 전체, glossary.ts, 커리큘럼 모듈 주제
- 출력: `outputs/00-backlog/GLOSSARY-BACKLOG.md` — 용어 + 카테고리 + 우선순위 (강의에 이미 등장하는 미등재 용어가 최우선)
- 기준: glossary.ts와 대조해 기존 용어 제외 완료

### 2. 배치 분할
- 담당: Chief AI Orchestrator
- 규칙: **카테고리 단위로 배치를 나눈다** (같은 카테고리를 두 Executor에 동시 배정 금지 — related 상호 참조와 중복 위험 때문)
- 배치 크기: 20~30개 용어

### 3. 정의 집필 (배치 간 병렬)
- 담당: Terminology Agent (Executor 여러 개에 배치별 배정 가능)
- 출력: `outputs/02-drafts/glossary-batch-{n}/terms.md`
- 기준: terminology-agent.md의 DoD

### 4. 중복·일관성 검사 (모든 배치 합쳐서 1회)
- 담당: QA Agent
- 입력: 이번 회차의 모든 배치 + glossary.ts
- 검사: 배치 간 중복, 기존 정의와 충돌, related 참조 무결성, 표기 통일
- 출력: `outputs/03-reviewed/glossary-batch-{회차}/qa-report.md` + `final/terms.md`(병합본)

### 5. 통합 (순차)
- 담당: Site Integration Agent
- glossary.ts에 병합, lint/typecheck, 반영 기록

## 주의
- 용어 수가 500개를 넘으면 glossary.ts 단일 파일이 병목이 된다 → ROADMAP Phase 2의 "카테고리별 파일 분리" 선행 필요.
- 사실 검증이 필요한 용어(수치, 역사, 버전 언급)는 Fact Check Agent를 추가로 거친다. 순수 개념 정의는 QA만으로 충분.
