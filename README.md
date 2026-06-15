
# VIBE STUDIO · 바이브코딩 강의 운영 콘솔

바이브코딩 기초반부터 응용·수익화반, AI 워크스페이스 심화반과 후속 전문 과정까지 한 곳에서 운영하는 Electron 기반 Windows 교육 프로그램입니다. 현재 13개 과정, 70개 회차가 모두 실행 가능한 강의로 연결되어 있습니다.

현재 앱 버전은 **2.0.0**이며, 제품명은 **VIBE STUDIO**입니다. 기초반은 프로그램 안에서 운영되는 첫 번째 정규 과정으로 유지됩니다.

## 실행

```bash
npm install
npm start
```

## Windows EXE 만들기

```bash
npm run release:current
```

현재 버전의 portable EXE, 현장 실행 가이드, 강의 전 체크리스트와 릴리즈 보고서가 생성됩니다. 빌드만 필요하면 `npm run release:build`를 사용합니다.

## GitHub 릴리즈

릴리즈는 [Semantic Versioning](https://semver.org/) 형식으로 관리합니다.

1. `package.json`과 `package-lock.json`의 버전을 변경합니다.
2. `CHANGELOG.md`에 변경 내용을 기록합니다.
3. 변경 사항을 Pull Request로 검증한 뒤 `main`에 반영합니다.
4. 같은 버전의 태그를 `main` 커밋에 푸시합니다.

```bash
git tag v2.0.0
git push origin v2.0.0
```

`v2.0.0` 같은 태그가 올라오면 GitHub Actions가 Windows portable EXE와 SHA-256 체크섬을 자동 생성해 GitHub Release에 첨부합니다.

자세한 절차는 `docs/RELEASE_MANAGEMENT.md`에 정리되어 있습니다.

## 강의자료 교체 위치

- `src/content/sessions/session-01-ai-understanding.html` — 1강 AI 이해
- `src/content/sessions/session-02-vibe-coding.html` — 2강 바이브코딩
- `src/content/sessions/session-03-direction.html` — 3강 프로그램이 움직이는 원리
- `src/content/sessions/session-04-revenue.html` — 4강 파일 구조 이해
- `src/content/sessions/session-05-security-api.html` — 5강 배포와 보안 그리고 데이터
- `src/content/sessions/session-06-showcase.html` — 6강 쇼케이스 Q&A

## 별첨 자료 위치

- `src/content/appendix/curriculum-one-page.html`
- `src/content/appendix/ai-types-specialized-catalog.html`
- `src/content/appendix/handout-session2-prep.html`
- `src/content/appendix/practice-log.html`
- `src/content/appendix/command-cheatsheet.html`
- `src/content/appendix/ai-instruction-templates.html`
- `src/content/appendix/error-guide.html`
- `src/content/appendix/mvp-worksheet.html`
- `src/content/appendix/glossary.html`
- `src/content/appendix/session-03-ui-ux-terms.html`
- `src/content/appendix/session-03-feature-review-workbook.html`
- `src/content/appendix/diagrams.html`
- `src/content/appendix/project-structure.html`
- `src/content/appendix/deployment-checklist.html`
- `src/content/appendix/presentation-template.html`
- `src/content/appendix/databases.html`

구버전·중복 별첨 HTML은 디자인 레퍼런스 보존용으로 파일만 남겨두고, 앱의 별첨 대시보드에서는 제외했습니다.
정리 기준은 `docs/APPENDIX_CLEANUP.md`에 따로 남겨두었습니다.

## 수업자료 출력

강의/별첨 플레이어 상단의 인쇄 버튼으로 바로 출력할 수 있고, PDF 버튼으로 현재 자료를 PDF 파일로 저장할 수 있습니다.

## 인터랙티브 시스템

시뮬레이션 엔진, 컴포넌트 구조, 새 인터랙션 추가 방법은 `docs/INTERACTIVE_SYSTEM.md`에 정리되어 있습니다.

## 품질 검사

```bash
npm run build:tracks
npm run check
npm run smoke:app
npm run smoke:tracks
```

`build:tracks`는 과정 매니페스트를 기준으로 64개 전문 강의와 24개 과정별 자료실 항목을 동기화합니다. `check`는 JavaScript 문법, 강의 매니페스트와 슬라이드 수를 검사합니다. `smoke:app`은 Electron 대시보드와 자료실을, `smoke:tracks`는 64개 공통 엔진 강의의 레이아웃과 인터랙션을 실제 Chromium에서 전수 검사합니다.
