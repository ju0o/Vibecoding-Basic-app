# Day 1 샘플 프로젝트 — 첫 성공 (Path B)

```text
SSOT 원본 아님 · 실습용 예제
lesson_id: d1-first-success
path: examples/day1-first-success/
```

## 목적

학생이 다음을 **직접** 해 봅니다.

1. 폴더 열기 (VS Code 등)  
2. 터미널 열기  
3. `npm install`  
4. `npm run dev`  
5. 브라우저에서 결과 확인  
6. `src/main.js` 한 줄 수정 → 새로고침  

Node.js가 **왜** 필요한지: 이 프로젝트의 `dev` 스크립트는 **Node로 `server.js`를 실행**합니다. 브라우저만으로는 같은 방식으로 로컬 서버를 켜지 않습니다.

## 구조

```text
package.json     ← 프로젝트 메모(이름, scripts)
server.js        ← Node로 동작하는 아주 작은 서버 (외부 패키지 0개)
src/
  index.html     ← 화면 뼈대
  style.css      ← 스타일
  main.js        ← 바꿀 문구 (실습)
README.md
```

**외부 npm 패키지 없음** → `npm install`은 거의 즉시 끝납니다.  
(실무 프로젝트는 보통 패키지를 받아 인터넷이 필요합니다. 아래 “인터넷” 참고.)

## 준비물

- Node.js LTS 설치 후 터미널에서 `node -v`, `npm -v` 가 나와야 함  
- VS Code 또는 다른 폴더 편집기 (권장)  
- 브라우저  

## Windows

1. 이 폴더를 탐색기에서 확인  
2. VS Code: **File → Open Folder** → `day1-first-success`  
3. 터미널: `` Ctrl+` `` 또는 메뉴 Terminal → New Terminal  
4. 명령 (프로젝트 폴더 안에서):

```powershell
npm install
npm run dev
```

5. 브라우저에서 열기: **http://127.0.0.1:3456**  
6. 끝: 터미널에서 `Ctrl+C`

PowerShell에서 실행 정책이 막히면, **개발자 PowerShell** 또는 정책 허용은 IT 정책에 따릅니다. `node` / `npm` 자체가 없다면 Node를 먼저 설치하세요.

## macOS

1. VS Code에서 폴더 열기  
2. Terminal 앱 또는 VS Code 통합 터미널  

```bash
cd /path/to/day1-first-success
npm install
npm run dev
```

3. 브라우저: **http://127.0.0.1:3456**  
4. 종료: `Ctrl+C`

## 기대 결과

- 연한 파란 배경 + 흰 카드  
- 제목: 나의 첫 바이브코딩  
- 문구: 안녕하세요  
- 아래: 나는 AI와 함께 만들고 있다 (`main.js`)

## 텍스트 한 줄 수정 실습

1. `src/main.js` 열기  
2. `const line = "..."` 문자열 변경  
3. 저장  
4. 브라우저 **새로고침(F5)**  
5. 아래 문장이 바뀌었는지 확인  

## package.json · src · npm 한 줄

| 이름 | 이 샘플에서의 역할 |
|---|---|
| package.json | `npm run dev` → `node server.js` 라고 적어 둔 메모 |
| npm install | 의존성 설치 단계 (이 샘플은 외부 패키지 0) |
| npm run dev | package.json의 `dev` 스크립트 실행 |
| src/ | 사람이 고치는 화면·스타일·스크립트 |

## 인터넷이 없을 때

| 단계 | 이 샘플 |
|---|---|
| Node 설치 | **인터넷 필요** (설치 파일 다운로드) |
| npm install | 외부 패키지 없음 → **오프라인 OK** (Node·npm만 있으면) |
| npm run dev | 로컬만 사용 → **오프라인 OK** |
| 다른 실무 프로젝트 | 보통 `npm install`에 **인터넷 필요** |

## 자주 막히는 곳

| 증상 | 확인 |
|---|---|
| `node` / `npm` 없음 | Node LTS 설치, 터미널 **재시작** |
| Missing script | 이 폴더가 맞는지, package.json 존재 |
| 포트 사용 중 | 다른 터미널에서 이미 서버 실행 중 → Ctrl+C |
| 페이지 404 | 주소가 `http://127.0.0.1:3456` 인지 |
| 문구가 안 바뀜 | `main.js` 저장·새로고침 |

## 초기 상태로 되돌리기

`src/main.js`를 다음으로 되돌립니다.

```js
const line = "나는 AI와 함께 만들고 있다";
```

`server.js` / `package.json` / `src/index.html` / `src/style.css`를 임의로 지웠다면 Git에서 이 폴더를 다시 받거나 백업본을 복사하세요.  
이 샘플은 `node_modules`를 쓰지 않습니다.

## 보안

- API 키·DB·로그인 없음  
- 서버는 `127.0.0.1` 만 리슨 (로컬)  

## 사이트 연결

이 예제는 **교육 실습용**입니다. 학생 웹사이트 라우트에 자동 연결되지 않습니다.
