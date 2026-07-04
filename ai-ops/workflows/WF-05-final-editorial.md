# WF-05 최종 편집 Workflow (사이트 전역 일관성)

개별 강의 QA(WF-01)가 아니라 **사이트를 책 한 권으로 읽었을 때의 품질**을 관리한다.
트리거: 강의 10개 릴리스마다 (해당 모듈), 분기마다 (전체 통독).

```
[범위 확정] → [전역 검토(모듈 간 병렬 가능)] → [발견 → 개정 backlog 변환] → [개정 실행(WF-03)] → [대시보드 갱신]
```

## 단계

### 1. 범위 확정
- 담당: Chief AI Orchestrator
- 출력: 검토 대상 모듈 목록 + 기준 문서 버전(FINAL-SITE-STRATEGY.md)

### 2. 전역 검토
- 담당: Final Editorial Agent
- 입력: `src/content/` 배포본, FINAL-SITE-STRATEGY.md, CURRICULUM-MAP.md
- 검토 항목 (FINAL-SITE-STRATEGY의 9개 기준):
  강의 순서 / 용어 일관성 / 난이도 곡선 / 중복 / 설명 방식 통일 / 출처 상태 / 퀴즈 품질 / 설명 연습 품질 / 릴리스 기준 충족
- 출력: `reports/editorial-{date}.md`
- 품질 기준: 발견마다 위치·위반 기준·심각도(high/medium/low)·수정 제안
- 병렬: **모듈 단위로 나눠 병렬 검토 가능.** 단, 모듈 경계를 넘는 항목(용어 일관성, 난이도 곡선)은 병렬 검토 후 통합 패스 1회 필수

### 3. 개정 backlog 변환
- 담당: Final Editorial Agent → Curriculum Agent (우선순위 지정)
- 출력: `outputs/00-backlog/REVISION-BACKLOG.md` 항목
- 실패 시 되돌릴 단계: 없음 (검토는 비파괴 — 콘텐츠를 직접 수정하지 않으므로)

### 4. 개정 실행
- WF-03 파이프라인으로 진행 (검증 축소 규칙 적용)

### 5. 대시보드 갱신
- 담당: Final Editorial Agent
- 출력: `reports/completeness-dashboard.md` — 모듈별: 목표 강의 수(CURRICULUM-MAP) vs 배포 수, 미해결 이슈 수, 마지막 검토일

## 종료 조건 (사이트 "완성" 판정)
아래 전부 충족 시 해당 모듈을 "완성" 마킹:
- CURRICULUM-MAP의 목표 강의가 전부 released
- 미해결 high 이슈 0건
- 최근 검토일이 마지막 릴리스 이후
