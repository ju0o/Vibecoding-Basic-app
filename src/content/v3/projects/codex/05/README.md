# Codex Professional 05강 실습

## 목표
독립 작업을 Subagent와 Worktree로 격리하고 리뷰·테스트·스크린샷을 통합 품질 게이트로 운영합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 각 브랜치는 통과하지만 합치면 UI가 깨짐
- `complete`: 병렬 작업 계획, 역할별 결과·증거, 통합 리뷰 보고서

## 복구
원인: 개별 테스트만 있고 통합 시나리오가 없음

첫 수정: 병합 후 전체 사용자 흐름과 스크린샷 회귀를 다시 실행
