# 바이브코딩 기초반 · 다음 기수 01강 실습

## 목표
네 작업대의 역할을 구분하고 요청, 생성, 실행, 확인의 첫 반복을 완성합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: localhost가 열리지 않음
- `complete`: 실행되는 로컬 프로젝트, 첫 작업 요청서, 수정 전후 캡처

## 복구
원인: 실행 폴더 또는 package.json 명령이 다름

첫 수정: 현재 폴더와 scripts를 확인한 뒤 올바른 명령으로 재실행
