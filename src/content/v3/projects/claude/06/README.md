# Claude Code Professional 06강 실습

## 목표
안정된 Claude 작업을 자동화하고 GitHub PR, 테스트, 배포와 다음 세션 인수인계까지 연결합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 자동 PR은 열리지만 항상 사람이 처음부터 다시 조사
- `complete`: 최종 Claude 워크스페이스, 자동화·CI 흐름, PR·운영 매뉴얼

## 복구
원인: 작업 근거와 검증·위험 요약이 없음

첫 수정: 정형화된 PR·세션 인수인계 템플릿 적용
