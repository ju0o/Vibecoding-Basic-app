# Codex Professional 01강 실습

## 목표
작업에 맞는 Codex 표면을 선택하고 Workspace, Sandbox와 승인 정책 안에서 검증 가능한 첫 작업을 완료합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: Codex가 파일을 찾지 못함
- `complete`: 표면 선택 기준표, 작업 계약, 첫 검증된 변경

## 복구
원인: Workspace와 실제 프로젝트 위치가 다름

첫 수정: 올바른 폴더를 Workspace로 열고 권한 범위를 확인
