# AI 제품·수익화 07강 실습

## 목표
정상 화면 뒤에 있는 비용·실패·운영·변경 관리를 실제 사례로 연결합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 수정 후 이전 승인 기능이 깨짐
- `complete`: 운영·변경 사건 기록, 복구 결과, 회귀 테스트표

## 복구
원인: 버전 기준과 회귀 체크리스트가 없음

첫 수정: 승인 버전 태그와 핵심 시나리오 재검증
