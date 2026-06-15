# VIBE STUDIO V2 릴리즈 완료 보고서

## 버전
- 앱 버전: 2.0.0
- 프로그램명: VIBE STUDIO
- 포함 과정: 바이브코딩 기초반, 응용·수익화반, AI 워크스페이스 심화반
- 설계 과정: SaaS, 외주, 자동화, MCP, Skill, Agent, Agent Teams, Claude Code, Codex, 강사 마스터

## 릴리즈 산출물
- release/VIBE STUDIO 2.0.0.exe
- release/README-현장실행가이드.md
- release/CHECKLIST-강의전점검.md
- release/assets/preview.png

## 포함 기능
- 전체 과정 카탈로그와 과정별 대시보드
- 강의 일정 및 운영 메모
- 수강생 자료실과 강사 자료실
- 기초반 1~6강, 응용·수익화반 1~6강, AI 심화반 1~6강
- 인쇄/PDF 저장
- 발표자 모드와 화면 판서
- 파일트리, 배포, 보안, 제품 설계와 Agent 흐름 인터랙션

## 아이콘 교체 방법
1. `build/icon.ico` 파일을 원하는 아이콘으로 교체합니다.
2. `npm run release:current`를 실행합니다.
3. 아이콘 파일이 없으면 electron-builder와 앱 창 모두 기본 아이콘으로 fallback됩니다.

## 빌드 명령어
```bash
npm run release:current
```
