# Codex Professional 02강 실습

## 목표
저장소 규칙과 개인 설정, 실행 정책을 구분하고 Git 기반의 안전한 변경 루프를 구축합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 프로젝트 config가 적용되지 않음
- `complete`: AGENTS.md, Codex 설정 설명서, 검증된 Git 커밋

## 복구
원인: 신뢰하지 않은 저장소의 프로젝트 설정

첫 수정: 프로젝트 신뢰 상태를 확인하고 전역·프로젝트 설정 범위를 구분
