# 바이브코딩 기초반 · 2기 V3 작업본 04강 실습

## 목표
VS Code 파일 트리에서 수정 위치와 영향 범위를 찾고 작은 diff를 브라우저 결과와 연결합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 버튼 하나를 바꿨는데 모든 페이지 버튼이 변함
- `complete`: 개인 파일 지도, 검토한 Git diff, 안전한 수정 기록

## 복구
원인: 공용 컴포넌트 영향 범위를 확인하지 않음

첫 수정: 전용 variant 또는 페이지 전용 범위로 수정
