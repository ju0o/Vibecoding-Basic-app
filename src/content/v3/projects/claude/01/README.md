# Claude Code Professional 01강 실습

## 목표
Claude Code를 올바른 프로젝트 위치에서 실행하고 탐색·계획·권한 확인 후 첫 안전한 변경을 완료합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: Claude가 관련 없는 저장소 파일을 탐색
- `complete`: 저장소 지도, 검토한 계획, 첫 안전한 diff

## 복구
원인: 프로젝트 루트가 아닌 위치에서 시작

첫 수정: 올바른 저장소 폴더로 이동해 새 세션 시작
