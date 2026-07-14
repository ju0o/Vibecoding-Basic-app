# AI가 만든 프로젝트에는 왜 이렇게 많은 파일이 생겼을까요?

```yaml
lesson_id: project-file-structure
course_id: vibe-coding-foundation
slug: project-file-structure
order: 2
prev: d1-first-success
next_candidate: node-npm-package-json (B — not authored yet)
flow: Experience → Question → Observe → Map → Change → Ask AI → Compare → Outcome → Next
sources_checked_at: 2026-07-14
site_route: /learn/vibe-coding-foundation/project-file-structure
```

---

## 보조 제목

src·package.json·파일 구조를 **처음 읽는 방법**

Day 1에서 이미 한 일(요청 · 실행 · 한 파일 수정)을 길게 반복하지 않습니다.  
오늘은 **“어떤 파일을 건드릴지”** 를 찾는 법을 익힙니다.

---

## 오늘 끝나면

- 프로젝트 **루트**를 찾을 수 있다  
- 폴더와 파일을 구분한다  
- `src`를 “주요 작성 파일이 모이는 **대표적인** 위치”로 말한다  
- `package.json`을 설정·명령·의존성 정보를 담는 파일로 **기초** 설명한다  
- 샘플에서 **화면 문구**를 담은 파일을 찾는다  
- 그 파일만 작게 수정한다  
- AI에게 **이 파일만 / 다른 파일 금지** 를 말할 수 있다  
- 프로젝트마다 구조가 **다를 수 있다**고 말한다  

---

## Experience — Day 1 샘플을 다시 연다

폴더:

```text
examples/day1-first-success/
```

Day 1 Path B를 끝냈다면 그 폴더를 그대로 엽니다.  
아직이면 Day 1의 샘플 안내를 먼저 따라 가도 됩니다.  
([Day 1 페이지](/learn/vibe-coding-foundation/day-1#practice))

---

## Question

> 도대체 **어떤 파일**을 수정해야 하지?

파일이 많아 보여도, 오늘은 **전부 외우지 않습니다.**  
**역할을 추적하는 방법**만 가져가면 됩니다.

---

## Observe — 트리를 본다

이 샘플의 실제 구조(고정):

```text
examples/day1-first-success/
  package.json
  server.js
  README.md
  src/
    index.html
    style.css
    main.js
```

스스로 확인:

1. **루트** = `package.json`이 있는 폴더  
2. 이름이 `/`로 끝나면 보통 **폴더**, 아니면 **파일**  
3. `src` 안에 화면 관련 파일이 모여 있는지  

---

## Map — 역할 카드 (이 샘플 기준)

| 이름 | 이 샘플에서의 역할 | 비고 |
|---|---|---|
| **package.json** | 프로젝트 이름·설명, **scripts**(예: `dev`), (있으면) 의존성 목록 | npm 공식: package metadata · `scripts`는 실행할 명령 사전 |
| **src/** | 사람이 주로 고치는 **소스**가 모인 대표 위치 | **관례**이지 전 세계 필수 규칙은 아님 |
| **server.js** | Node로 로컬 서버를 켜는 실행 파일 (`npm run dev` → `node server.js`) | 다른 프로젝트는 다른 실행 파일을 쓸 수 있음 |
| **README.md** | 사람을 위한 사용 안내 | 컴퓨터 실행 파일이 아님 |
| **src/index.html** | 화면 뼈대 | |
| **src/style.css** | 색·레이아웃 | |
| **src/main.js** | **환영 문구 문자열**이 있는 곳 (이 샘플) | 문구 수정 실습 대상 |

### package.json (공식 기반 · 기초만)

npm 문서에 따르면 `package.json`은 패키지(프로젝트) 메타데이터이며 **실제 JSON**이어야 합니다.  
그중 **`scripts`** 는 생명주기·사용자 정의 명령을 담는 사전이고, `npm run <이름>` 으로 실행합니다.  
(`docs.npmjs.com` — package.json · scripts, 확인일 2026-07-14)

우리 샘플에는 `dependencies`가 거의/전혀 없을 수 있습니다.  
그래도 `npm install` 단계는 “의존성을 맞추는 **습관**”으로 남습니다. (외부 패키지 0개여도 명령 자체는 유효)

### 절대 규칙처럼 외우지 말 것

- 모든 프로젝트에 `src`가 있다 ❌  
- 모든 `src`가 같다 ❌  
- `package.json`은 라이브러리 목록일 뿐이다 ❌ (scripts·이름 등 더 있음)  
- 파일이 많을수록 좋다 ❌  
- AI가 만든 구조는 항상 정답 ❌  
- 한 파일만 고치면 다른 곳은 절대 안 깨진다 ❌  

**정확한 말:** 구조는 도구·규모·AI 선택에 따라 달라질 수 있다. `src`는 **흔한 관례**. 역할은 **열어보고·연결을 따라** 확인한다.

---

## Change — 파일 하나만 수정

1. `src/main.js` 를 연다  
2. 문자열(환영 문구)을 바꾼다  
3. 저장한다  
4. 브라우저를 새로고침한다 (서버가 켜져 있다면)  
5. 화면이 바뀌었는지 본다  

이게 “역할을 추적했다”는 증거입니다.

---

## Ask AI — 범위를 제한하는 요청

**1단계 — 분석만 (아직 수정 금지)**

```text
먼저 이 프로젝트의 파일 구조를 분석해 주세요.
화면의 환영 문구를 담당하는 파일을 찾아 주세요.
아직 파일은 수정하지 말고,
수정 대상과 이유만 설명해 주세요.
```

**2단계 — 확인 후 한 파일만**

```text
확인한 파일 하나만 수정해 주세요.
다른 파일은 변경하지 마세요.
변경 후 실행 방법도 알려 주세요.
```

---

## Compare — 단일 HTML vs 분리 구조

| | 단일 HTML | 이 샘플 (src + package.json) |
|---|---|---|
| 파일 수 | 적음 | 더 많음 |
| 실행 | 브라우저로 파일 열기 | Node 서버 + npm scripts 등 |
| 언제 충분한가 | 아주 작은 실험 | 명령·여러 파일·확장 예정이 있을 때 |

어느 쪽이 **무조건 우수**하지 않습니다.  
상황에 맞는 구조를 고르는 감각이 목표입니다.

---

## Outcome 체크

- [ ] 루트 폴더를 찾았다  
- [ ] 폴더/파일 구분  
- [ ] `src`를 관례로 설명  
- [ ] `package.json` 기초 설명  
- [ ] 문구 파일 찾기 · 수정  
- [ ] AI 범위 제한 요청 작성  
- [ ] 구조는 프로젝트마다 다를 수 있다고 말함  

---

## Next — 후보 B로 가는 Why Bridge

어떤 파일이 어떤 역할을 하는지는 알기 시작했다.  
하지만 이 프로젝트를 움직이는 **Node, npm install, npm run dev** 는 아직 낯설 수 있습니다.

→ 다음 후보 **B** (Node·npm·package.json 더 깊게)  
**이번 페이지에서는 B 본문을 만들지 않습니다.** 운영자 검토 후 진행합니다.

---

## 출처

- npm Docs — package.json: https://docs.npmjs.com/cli/v11/configuring-npm/package-json (2026-07-14)  
- npm Docs — scripts: https://docs.npmjs.com/cli/v11/using-npm/scripts  
- Day1 sample: `examples/day1-first-success/`  
