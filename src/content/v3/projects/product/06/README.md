# AI 제품·수익화 06강 실습

## 목표
SaaS팀은 핵심 행동을 실제 데이터와 연결하고 외주팀은 승인 가능한 마일스톤 단위로 제작합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 각 기능은 있지만 전체 사용 흐름이 끊김
- `complete`: 실행 가능한 마일스톤, 테스트 결과, 승인·반려 기록

## 복구
원인: 파일·화면 단위로 병렬 제작하고 통합 책임자가 없음

첫 수정: 통합 Owner가 사용자 흐름 기준으로 병합·테스트
