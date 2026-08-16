# Codex Professional 04강 실습

## 목표
외부 서비스의 자료와 행동을 적절한 MCP·App·Connector로 연결하고 Browser로 실제 결과를 검증합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 자동 테스트는 통과했지만 버튼이 화면 밖에 있음
- `complete`: 연결 결정표, 권한 설정, 브라우저 QA 보고서

## 복구
원인: 동작 검사만 하고 실제 렌더링을 보지 않음

첫 수정: 대표 해상도 스크린샷과 인터랙션 QA 추가
