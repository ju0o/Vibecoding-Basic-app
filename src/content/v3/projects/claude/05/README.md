# Claude Code Professional 05강 실습

## 목표
독립 작업만 Subagent와 Agent Team으로 분리하고 반환 형식, Reviewer와 Human Lead를 운영합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: Agent 결과가 서로 다른 전제를 사용
- `complete`: 멀티 Agent 작업 계약, 역할별 결과, 리뷰·통합 보고서

## 복구
원인: 공통 목표·입력·반환 형식이 없음

첫 수정: 작업 계약과 공유 결정 로그를 먼저 제공
