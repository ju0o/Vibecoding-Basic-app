# 인터랙티브 교육형 시뮬레이션 시스템

현재 강의 프로그램은 Electron 런처 구조를 유지하면서, 각 HTML 세션 안에 재사용 가능한 교육용 인터랙션을 마운트하는 방식으로 고도화했다.

## 전체 폴더 구조

```text
src/
├─ main/
│  └─ main.js
├─ preload/
│  └─ preload.js
├─ renderer/
│  ├─ engine/
│  │  ├─ animation-engine/
│  │  │  └─ animation-engine.js
│  │  ├─ particle-system/
│  │  │  └─ particle-system.js
│  │  ├─ simulation-engine/
│  │  │  └─ simulation-engine.js
│  │  ├─ interaction-engine/
│  │  │  └─ interaction-engine.js
│  │  └─ presentation-engine/
│  │     └─ presentation-engine.js
│  ├─ components/
│  │  ├─ api-flow/
│  │  │  ├─ api-flow.js
│  │  │  └─ api-flow.css
│  │  ├─ deploy-visualizer/
│  │  │  ├─ deploy-visualizer.js
│  │  │  └─ deploy-visualizer.css
│  │  ├─ terminal-sim/
│  │  │  ├─ terminal-sim.js
│  │  │  └─ terminal-sim.css
│  │  ├─ ai-chat-sim/
│  │  │  ├─ ai-chat-sim.js
│  │  │  └─ ai-chat-sim.css
│  │  ├─ file-tree/
│  │  │  ├─ file-tree.js
│  │  │  └─ file-tree.css
│  │  ├─ quiz/
│  │  │  ├─ quiz.js
│  │  │  └─ quiz.css
│  │  └─ drag-exercise/
│  │     ├─ drag-exercise.js
│  │     └─ drag-exercise.css
│  ├─ shared/
│  │  ├─ motion/
│  │  │  └─ motion-tokens.css
│  │  ├─ effects/
│  │  │  └─ presenter-effects.css
│  │  ├─ transitions/
│  │  │  └─ deck-transitions.css
│  │  └─ themes/
│  │     └─ immersive-theme.css
│  ├─ interactive-education.js
│  └─ interactive-education.css
└─ content/
   └─ sessions/
      ├─ session-02-vibe-coding.html
      ├─ session-03-direction.html
      ├─ session-04-revenue.html
      └─ session-05-security-api.html
```

## 현재 구현된 인터랙션

- `api-flow`: 프론트 → API → 서버 → DB → 응답 흐름, particle beam, latency, success/fail/retry 상태
- `terminal-sim`: typing animation, fake loading, command history, error state, AI 해결 후 retry
- `file-tree`: expandable file tree, active highlight, dependency glow, walkthrough, preview 연결
- `deploy-visualizer`: 내 컴퓨터 → GitHub → 배포 서비스 → URL → 사용자 접속 흐름
- `ai-chat-sim`: thinking indicator, code streaming, generated file flash, preview update
- `drag-exercise`: drag & drop, snap, correct/wrong feedback, score, completion state
- `quiz`: 선택형 빠른 점검 컴포넌트
- `presentation-engine`: 레이저 포인터, 클릭 ripple, 발표자 HUD, 발표 메모 표시

## 세션에서 사용하는 방법

세션 HTML의 `<head>`에 공통 CSS를 연결한다.

```html
<link rel="stylesheet" href="../../renderer/interactive-education.css">
```

본문 원하는 위치에 시뮬레이션 마커를 넣는다.

```html
<div data-sim="api-flow"></div>
<div data-sim="terminal-sim" data-scenario="error"></div>
<div data-sim="drag-exercise" data-exercise="env-safety"></div>
```

마지막 스크립트 아래에 공통 런타임을 연결한다.

```html
<script type="module" src="../../renderer/interactive-education.js"></script>
```

## 새 인터랙션 추가 방법

1. `src/renderer/components/my-sim/my-sim.js`와 `my-sim.css`를 만든다.
2. JS 파일은 `static mount(host, context)`를 가진 클래스를 export한다.
3. `src/renderer/interactive-education.js`에서 `simulationEngine.register('my-sim', MySim)`을 추가한다.
4. `src/renderer/interactive-education.css`에 CSS import를 추가한다.
5. 세션 HTML에 `<div data-sim="my-sim"></div>`를 넣는다.

## 새 강의 추가 방법

1. `src/content/sessions/session-07-name.html`을 만든다.
2. 기존 세션처럼 `.deck`, `.slide`, `render()` 구조를 유지한다.
3. 인터랙션이 필요하면 공통 CSS/JS를 연결하고 `data-sim`을 배치한다.
4. `src/content/course-manifest.json`의 해당 course `sessions`에 새 항목을 추가한다.
5. 앱에서 강의 카드가 보이는지 확인한다.

## Electron 연동

- Electron 구조는 유지한다.
- 런처는 `src/renderer/index.html`과 `src/renderer/studio.js`가 담당한다.
- 세션은 `webview`로 `src/content/sessions/*.html`을 연다.
- PDF/인쇄/발표자 모드는 기존 Electron IPC 흐름을 그대로 사용한다.

## EXE 빌드 방법

```bash
npm install
npm run dist
```

portable만 만들 때:

```bash
npm run dist:portable
```

결과물은 `release/` 폴더에 생성된다.

## 성능 최적화 원칙

- 이동 애니메이션은 `left/top`이 아니라 `transform`과 `opacity` 중심으로 구현한다.
- particle은 canvas 한 장에서 그리며 DOM particle을 대량 생성하지 않는다.
- 빔프로젝터 기준으로 대비를 높이고, 작은 텍스트는 최소화한다.
- `prefers-reduced-motion` 환경에서는 애니메이션 시간을 최소화한다.
- 시뮬레이션은 `data-sim`이 있는 곳에만 마운트한다.
- 저사양 노트북을 위해 WebGL 대신 CSS transform + Canvas 2D를 기본으로 사용한다.

## 현장 발표 체크리스트

- 발표 전 `npm start`로 2~5회차 주요 시뮬레이션을 한 번씩 클릭한다.
- 빔프로젝터 연결 후 전체화면에서 글자 크기와 contrast를 확인한다.
- 3회차 `api-flow`, 4회차 `file-tree`, 5회차 `deploy-visualizer`를 리허설한다.
- 레이저 포인터는 세션 화면에서 `L` 키로 켜고 끈다.
- 발표 메모는 런처 상단 메모 버튼 또는 세션 내 `N` 키 HUD로 확인한다.
- 인터넷 연결이 불안정해도 로컬 HTML/JS/CSS는 동작한다.
- PDF 출력이 필요하면 런처 상단 PDF 버튼을 사용한다.

## 검증 명령어

```powershell
Get-ChildItem 'src/renderer' -Recurse -Filter '*.js' | ForEach-Object { node --check $_.FullName }
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue; .\node_modules\.bin\electron.cmd scripts/smoke-electron-session.js src/content/sessions/session-03-direction.html
```
