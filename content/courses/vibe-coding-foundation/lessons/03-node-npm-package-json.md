# Node와 npm은 왜 설치하고 실행하는 걸까요?

```yaml
lesson_id: node-npm-package-json
course_id: vibe-coding-foundation
order: 3
prev: project-file-structure
next_candidate: ai-ide-relationship (C — not authored)
sources_checked_at: 2026-07-14
site_route: /learn/vibe-coding-foundation/node-npm-package-json
```

---

## 보조 제목

package.json을 읽고 프로젝트 실행 명령을 이해하는 방법

---

## Day 1 · 파일 구조에서 이어오기

이미 한 일: 요청 · 실행 · 폴더 읽기 · 한 파일 수정.  
오늘은 **명령이 왜 동작했는지** — `package.json` 안을 읽습니다.  
파일 구조 수업을 길게 반복하지 않습니다.  
([파일 구조 노드](/learn/vibe-coding-foundation/project-file-structure))

---

## Question

> 왜 `npm install`과 `npm run dev`를 쳐야 했지?

---

## Node.js는 무엇인가?

공식 학습 문서: Node.js는 **오픈소스·크로스 플랫폼 JavaScript 런타임 환경**입니다.  
브라우저 밖에서도 JS를 돌리기 위해 V8 엔진을 사용합니다.  
(https://nodejs.org/en/learn/getting-started/introduction-to-nodejs · 확인일 2026-07-14)

**브라우저 런타임**과 **Node 런타임**은 둘 다 JS를 실행하지만, 환경(DOM 유무 등)이 다릅니다.  
자세한 차이는 Node 공식 “Differences between Node.js and the Browser”를 참고할 수 있습니다.

**오개념:** Node.js = “개발 서버” ❌  
Node는 런타임이고, 서버는 **우리가 작성/실행하는 코드**(예: `server.js`)일 수 있습니다.

---

## npm은 Node와 같은가?

**아닙니다.**  
npm은 Node 생태계에서 쓰는 **패키지 매니저**(표준 소개: Node learn — introduction to npm).  
보통 Node를 설치할 때 함께 쓰게 되는 경우가 많지만, **동일 프로그램이 아닙니다.**

---

## Inspect — 우리 샘플 package.json

경로: `examples/day1-first-success/package.json`

이 샘플에 **실제로 있는** 것:

- `name`, `version`, `private`, `description`
- **`scripts`**: `"dev": "node server.js"`, `"start": "node server.js"`
- `engines.node`

이 샘플에 **없을 수 있는** 것:

- `dependencies` / `devDependencies` 필드

→ “없을 수 있다” = 프로젝트가 잘못된 것이 아닙니다.  
필드가 **있을 때** 의미를 아래에서 배웁니다.

### scripts

npm 문서: `scripts`는 실행할 명령들의 사전입니다.  
`npm run dev` → `scripts.dev` 값인 `node server.js` 를 실행합니다.  
**`dev`라는 이름은 관례**이지, 모든 프로젝트 필수 이름이 아닙니다.  
없는 이름이면 `Missing script` 류 오류가 납니다.

### dependencies / devDependencies (일반 의미)

있을 때:

- **dependencies** — 앱이 동작하는 데 쓰는 패키지  
- **devDependencies** — 주로 개발·테스트 도구  

정확한 필드는 공식 package.json 문서를 따릅니다.  
“devDependencies는 배포 시 절대 안 쓴다”처럼 절대 규칙으로 단정하지 마세요. (빌드 파이프라인에 따라 다름 · 교육 해석 주의)

### npm install

- 프로젝트에 선언된 의존성을 맞추는 단계  
- **인터넷의 모든 라이브러리를 까는 것**이 아님  
- 우리 샘플처럼 의존성이 거의 없으면 설치가 거의 즉시 끝날 수 있음 (zero-dep 교육 문장)

---

## Run — 명령 연결 (이 샘플)

```text
package.json  "dev": "node server.js"
        ↓
터미널  npm run dev
        ↓
실제   node server.js
        ↓
브라우저  http://127.0.0.1:3456  (README 기준)
```

---

## Break · Diagnose · Recover

| 상황 | 먼저 볼 것 |
|---|---|
| `npm run deve` / `serve` | scripts에 이름이 있는지 |
| package.json 없음 | **현재 폴더**가 루트인지 |
| install 전 오류 | 의존성 필요 여부 · 메시지 |
| 포트 사용 중 | 이미 서버 실행 중인지 |
| `node` 인식 불가 | Node 설치 · 터미널 재시작 |

순서:

```text
현재 폴더 → package.json 존재 → scripts → 입력 명령 → 오류 전문 → 설치/Node 상태
```

### AI에게 오류 전달 템플릿

```text
현재 폴더: ...
실행한 명령: ...
오류 전문: ...
package.json scripts: ...
원하는 결과: 개발 서버 실행
아직 수정하지 말고 원인 분석만 해주세요.
```

---

## Outcome 체크

- [ ] Node를 런타임으로 한 줄  
- [ ] Node ≠ npm  
- [ ] package.json 열기 · scripts에서 명령 찾기  
- [ ] install vs run 구분  
- [ ] Missing script → scripts 확인  
- [ ] 잘못된 폴더 확인  
- [ ] 오류+경로+명령을 AI에 전달  

---

## Next — 후보 C Why Bridge (본문 없음)

프로젝트를 실행하는 방법은 이해하기 시작했다.  
그런데 **AI는 어떻게 파일을 만들고 수정할까? IDE와 AI IDE는 무엇이 다를까?**  
→ 후보 C (미제작)

---

## 출처

- Node.js Learn — Introduction: nodejs.org (2026-07-14)  
- npm package.json / scripts docs (2026-07-14)  
- Sample: examples/day1-first-success  
