# 바이브코딩 기초반 · 다음 기수 04강 실습

## 목표
코드를 GitHub에 안전하게 저장하고 비밀값을 분리한 뒤 공개 URL로 배포하고 재배포합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 로컬에서는 되지만 배포 URL에서 API 오류
- `complete`: GitHub 저장소, 공개 배포 URL, 보안·재배포 점검표

## 복구
원인: 배포 환경변수 누락 또는 공개·서버 변수 혼동

첫 수정: 배포 서비스 환경변수 등록 후 새 빌드하고 네트워크 로그 확인
