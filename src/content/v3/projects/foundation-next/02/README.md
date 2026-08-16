# 바이브코딩 기초반 · 다음 기수 02강 실습

## 목표
버튼 클릭이 화면, 처리, 저장, 응답을 지나 돌아오는 과정을 보고 문제 위치를 구분합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 주문 완료 알림은 뜨지만 목록에 없음
- `complete`: 기능 흐름도, 문제 위치 판단표, AI 수정 요청

## 복구
원인: 화면 성공 처리와 데이터 저장이 분리됨

첫 수정: 저장 성공 응답 이후에만 완료 UI를 표시하도록 요청
