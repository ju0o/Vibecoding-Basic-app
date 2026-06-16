# VIBE STUDIO

현재 진행 중인 바이브코딩 기초반과 다음 전문과정을 운영하는 Electron 기반 강의 스튜디오입니다.

현재 개발 버전은 **3.0.0-beta.3**입니다. `기초반 2기 6주 운영본`은 활성 파일을 보존하면서 회차별 V3 작업본을 별도로 검수·승격하고, 다음 기수용 4주 개편본과 전문과정은 고유 시뮬레이션, 실행형 실습 패키지, 공식자료 연구노트로 관리합니다.

## 과정 구조

단일 강사용 스튜디오에는 다음 과정이 표시됩니다.

1. 바이브코딩 기초반 · 2기 운영본 6주
2. AI 제품·수익화 8주
3. AI Workflow Architect 4주
4. Claude Code Professional 6주
5. Codex Professional 6주
6. 바이브코딩 기초반 · 다음 기수 4주 개편본

수강생에게 나눠줄 자료는 별도 모드가 아니라 `수강생 출력물` 탭에서 미리보기, 인쇄, PDF 저장으로 관리합니다.

권장 순서는 `기초 → Workflow Architect → Claude Code 또는 Codex`입니다. 제품·수익화는 기초 수료 후 선택하는 별도 사업 트랙입니다.

## 실행

```bash
npm install
npm start
```

앱은 전체 과정 카탈로그 대신 다음 3단 구조로 시작합니다.

- 왼쪽: 과정, 일정, 설정
- 가운데: 선택 과정의 강의, 강사자료실, 수강생 출력물, 실습파일, 공식자료 학습실
- 오른쪽: 목표, 준비물, 결과물과 실행 버튼

`Ctrl+K`로 과정·회차·강사자료·수강생 출력물·실습 파일·공식자료를 검색할 수 있습니다. 현재 2기 회차의 운영본과 V3 작업본을 선택하고, 검수된 버전을 회차별로 승격할 수 있습니다.

## V3 콘텐츠 생성

```bash
npm run build:v3
```

`scripts/build-v3-content.js`와 `scripts/build-v3-labs.js`가 다음 파일을 동기화합니다.

- `src/content/course-manifest.json`
- `src/content/v3/course-data.js`
- `src/content/v3/projects/*`의 34개 실행형 실습 패키지
- `docs/v3/basic-v2-freeze.json`

현재 2기 활성 강의인 `src/content/sessions/*`는 생성 대상이 아니며 해시 감사로 보호합니다. 개편 작업본은 V3 덱으로 별도 생성됩니다.

오프라인 대체 화면은 다음 명령으로 34개 회차를 실제 렌더링해 생성합니다.

```bash
npm run capture:v3-fallbacks
```

## 공식 참고자료 갱신

```bash
npm run sources:refresh
```

GitHub, Vercel, Firebase, MCP, Claude Code, Codex 등의 공식 URL만 확인합니다. 원문을 복제하지 않고 상태, 확인 날짜, 쉬운 한국어 설명, 강사용 배경, 쉬운 비유, 오해, 시연 포인트와 수업 전 체크리스트를 저장합니다.

## 품질 검사

```bash
npm run audit:curriculum
npm run check
npm run smoke:app
npm run smoke:tracks
npm run qa:print
```

- `audit:curriculum`: 34개 개편 회차의 고유 scene id, 수동 제어, 대본, 실습 패키지, 대체 화면과 V2 활성 파일 검사
- `check`: JavaScript 문법, 매니페스트와 파일 연결, 기존 슬라이드 카운터 검사
- `smoke:app`: 단일 강사용 3단 UI, 5개 탭, 전역 강사자료실, 공식자료 학습실, 플레이어, `Ctrl+K` 검사
- `smoke:tracks`: 현재 2기 작업본을 포함한 34개 회차의 13장 덱과 수동 진행 제어 전수 검사
- `qa:print`: 71개 수강생·강사용 A4 PDF의 페이지 수, 밝은 배경과 가로 넘침 검사

## Windows Beta EXE

```bash
npm run release:v3-beta
```

`release/`에 portable EXE, 현장 실행 가이드, 강의 전 체크리스트와 미리보기 이미지가 생성됩니다.

## 주요 문서

- `docs/v3/CURRICULUM-V3.md`
- `docs/v3/CURRICULUM-MATRIX.md`
- `docs/v3/ARCHITECTURE.md`
- `docs/v3/QA-CHECKLIST.md`
- `docs/v3/SOURCES-WORKFLOW.md`

기존 2기 운영 커리큘럼은 `docs/CURRICULUM.md`에 그대로 보존합니다.
