# Codex Professional 06강 실습

## 목표
안정된 Codex 작업을 Hook과 Automation으로 운영하고 GitHub Actions, PR과 Release까지 연결합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: Release에는 이전 버전 실행 파일이 올라감
- `complete`: 운영 Hook·Automation, GitHub Actions, 최종 Codex 릴리즈 시스템

## 복구
원인: 태그·package 버전·자산명 검증 누락

첫 수정: CI에서 버전 일치 검사 후 빌드·체크섬·업로드
