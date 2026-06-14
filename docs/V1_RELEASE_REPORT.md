# 바이브코딩 기초반 V1 릴리즈 완료 보고서

## 버전
- 앱 버전: 1.0.0
- 프로그램명: 바이브코딩 기초반
- 내부 과정명: 바이브코딩 기초반 V1

## 릴리즈 산출물
- release/바이브코딩 기초반 1.0.0.exe
- release/README-현장실행가이드.md
- release/CHECKLIST-강의전점검.md
- release/assets/preview.png

## 포함 기능
- 강의 선택 대시보드
- 1~6강 HTML 세션 플레이어
- 별첨자료 플레이어
- 인쇄/PDF 저장
- 발표자 모드
- 레이저 포인터
- API 흐름, 터미널, 파일트리, 배포, AI 채팅, 드래그 실습 시뮬레이션

## 아이콘 교체 방법
1. `build/icon.ico` 파일을 원하는 아이콘으로 교체합니다.
2. `npm run release:v1`을 실행합니다.
3. 아이콘 파일이 없으면 electron-builder와 앱 창 모두 기본 아이콘으로 fallback됩니다.

## 빌드 명령어
```bash
npm run release:v1
```
