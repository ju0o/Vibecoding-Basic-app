# B07/B08 Practice 개선안

## 검토 기준

- Task 5 보고서 `ai-ops/reports/BETA-DAY-2-PRACTICE-DEEP-REVIEW.md`의 B07/B08 개선 제안
- `ai-ops/contracts/NODE_QUALITY_GATE.md`의 Practice 필수 필드: `start`, `action`, `expected`, `fail`, `recover`, `evidence`
- 연결된 학습 UI와 샘플 구현의 실제 동작

이 문서는 제안서다. 원본 Practice 파일과 소스 코드는 수정하지 않는다.

구현 확인 결과, B07 페이지는 `StackRolesExperience`로 Day1 파일을 Frontend/Backend로 분류하고, 실제 실행은 `examples/day1-first-success/server.js`가 담당한다. `WebLayersExperience`는 HTML/CSS/JS 체크박스와 Preview를 바꾸는 레이어 모델이며 서버를 시작하거나 중지하지 않는다. B08 페이지는 `RequestResponseExperience`를 사용하며 method/path 선택에 따라 고정된 교육용 응답을 표시하고 실제 네트워크 요청은 보내지 않는다.

## B07 개선안

### 현재 상태

원본의 6개 필드는 다음과 같다.

- **start:** “`server.js` 열 수 있음”, “(가능하면) 서버 실행/중지 가능”
- **action:** `server.js` 주석·포트 관련 줄을 읽고 무엇을 응답하는지 한 줄 작성; 인터랙티브에서 `server.js`를 Backend로 분류; 서버를 켠 뒤 브라우저 동작을 관찰하거나 영상 시나리오를 기록
- **expected:** “BE = 화면 뒤 처리 / 미니 서버 예시 연결”
- **fail:** Backend를 Node만 존재하는 것으로 단정; `package.json`을 FE로 설명
- **recover:** 본문 교육 경계와 A03 복습
- **evidence:** `server.js` 요약, 분류 성공 메모, 서버 off 관찰 메모

### 문제점

- “가능하면 실행/중지”가 선택 사항이어서 실행 여부에 따른 통과 기준이 없다.
- 실제 서버 실행, 파일 역할 분류, Preview 관찰이 한 흐름에 섞여 있다.
- “화면 뒤 처리”는 개념 요약이지 포트, URL, 응답 또는 접속 실패처럼 관찰할 수 있는 결과가 아니다.
- 실행하지 않고 상상한 서버 동작이나 영상 시나리오도 evidence로 통과할 수 있다.
- 현재 B07 구현은 `StackRolesExperience`의 분류 시뮬레이션이며, `WebLayersExperience`는 서버 상태를 표현하지 않는다. 시뮬레이터 결과를 실제 localhost 결과로 쓰면 안 된다.

### 제안 개선안

#### 1. start

두 경로 중 하나를 학생이 선택하되, 선택한 경로의 시작 상태를 기록하게 한다.

**실행 경로**

- 작업 폴더를 `examples/day1-first-success`로 연다.
- `server.js`, `package.json`, `src/index.html`이 보이는 초기 상태에서 시작한다.
- Node.js가 설치되어 있으면 `npm run dev` 또는 `node server.js`를 실행한다.
- 터미널에 서버 실행 메시지와 `http://127.0.0.1:3456` 주소가 보이는지 확인한다.

**시뮬레이터 경로**

- `/learn/vibe-coding-foundation/backend`를 열고 “교육용 역할 분류”임을 확인한다.
- 초기 선택 파일 `src/index.html`과 선택지 Frontend/Backend가 보이는 상태에서 시작한다.
- 이 경로는 실제 서버를 켜지 않는다는 점을 시작 기록에 포함한다.

#### 2. action

선택한 경로에 따라 다음 행동을 모두 수행한다.

**실행 경로**

1. `server.js` 3행의 주소, 10행의 포트 `3456`, 22행 이후의 요청 처리 코드를 읽는다.
2. 브라우저에서 `http://127.0.0.1:3456`을 열고 화면이 나타나는지 확인한다.
3. 터미널에서 `Ctrl+C`로 서버를 중지한 뒤 같은 주소를 새로고침한다.
4. 실행 전/후의 터미널 메시지와 브라우저 접속 결과를 각각 기록한다.

**시뮬레이터 경로**

1. `server.js`를 선택하고 Backend를 선택해 “맞음” 상태를 확인한다.
2. `src/index.html`, `src/style.css`, `src/main.js`도 각각 선택해 Frontend 결과를 확인한다.
3. 각 파일명, 선택한 역할, 화면에 표시된 결과 문구를 기록한다.

#### 3. expected

선택한 경로에 맞는 관찰 결과가 모두 나타나야 한다.

**실행 경로의 기대 결과**

- 터미널에 `127.0.0.1:3456`에서 서버가 실행 중이라는 메시지가 보인다.
- `http://127.0.0.1:3456`에서 `src/index.html`에 해당하는 페이지가 열린다.
- `server.js`는 브라우저 요청에 따라 `src` 아래 파일을 읽어 응답하는 미니 서버 역할이다.
- `Ctrl+C` 후 같은 URL을 새로고침하면 페이지가 정상 표시되지 않거나 접속 실패가 표시된다.

**시뮬레이터 경로의 기대 결과**

- `server.js` 선택 + Backend 선택 후 화면에 `맞음: server.js → backend`에 해당하는 성공 상태가 표시된다.
- `src/index.html`, `src/style.css`, `src/main.js` 선택 시 각각 Frontend 성공 상태가 표시된다.
- 이 결과는 역할 분류 모델의 결과이며 실제 포트 응답의 증거가 아니다.

#### 4. fail

- `server.js`를 Frontend로 분류하거나 Node라는 이름만 보고 Backend의 이유를 설명하지 못한다.
- `npm run dev`를 다른 폴더에서 실행해 `server.js`를 찾지 못한다.
- 포트 `3456`이 이미 사용 중이어서 서버가 시작되지 않는다.
- 서버를 중지했는데도 이전 브라우저 화면이 남아 있는 것을 서버가 계속 실행 중이라고 오해한다.
- 시뮬레이터의 성공 문구를 실제 localhost 접속 증거로 기록한다.

#### 5. recover

**실행 오류 복구**

1. 현재 폴더에서 `server.js`와 `package.json`이 있는지 다시 확인한다.
2. 포트 충돌이면 기존 서버 터미널을 찾아 종료하고 `npm run dev`를 다시 실행한다. 포트를 임의로 바꾸지 않는다.
3. 실행 메시지가 나타난 뒤 주소를 정확히 `http://127.0.0.1:3456`으로 다시 연다.
4. `Ctrl+C` 후 새로고침했을 때 접속 실패 또는 정상 표시 중단이 다시 확인되면 복구 완료로 기록한다.

**분류/해석 오류 복구**

- `server.js`는 요청을 받아 파일을 응답하므로 Backend 예시, `html/css/js`는 브라우저가 해석하는 Frontend 예시라는 표를 다시 확인한다.
- 시뮬레이터를 사용했다면 “시뮬레이터 결과”와 “실행 결과”를 evidence에서 분리해 다시 작성한다.

#### 6. evidence

제3자가 재현할 수 있도록 다음을 남긴다.

- 실행 경로: 작업 폴더, 실행 명령(`npm run dev` 또는 `node server.js`), `127.0.0.1:3456`, 실행 중 터미널 메시지, 브라우저 접속 결과, `Ctrl+C` 후 접속 실패 결과
- 분류 경로: 파일명 4개(`src/index.html`, `src/style.css`, `src/main.js`, `server.js`), 각 역할, 성공/오답 상태 문구
- 각 기록에 `실행 경로` 또는 `시뮬레이터 경로` 라벨을 붙인다.
- 상상한 결과, 영상만 본 결과, 실행하지 않은 결과는 통과 증거로 인정하지 않는다.

### 근거

- Task 5는 B07의 선택적 실행, 관찰/추론 혼합, 추상적 expected, 상상 시나리오 evidence를 지적했다.
- 샘플 `server.js` 3행은 주소, 10행은 포트 `3456`, 22~45행은 요청에 따른 파일 응답과 404, 49~53행은 실행/중지 메시지를 정의한다.
- B07 페이지의 `StackRolesExperience`는 `server.js`를 Backend, `src/index.html`·`style.css`·`main.js`를 Frontend로 분류한다.
- `WebLayersExperience`는 체크박스에 따른 Preview 변화만 제공하고 `simulationNotice`에서 교육용 레이어 모델임을 알린다. 따라서 실제 서버 실행 결과를 약속할 수 없다.
- 실행 경로와 시뮬레이터 경로를 나누면 초보 학생이 실제 행동과 교육용 추론을 구별하고, 제3자가 동일한 증거를 재확인할 수 있다.

## B08 개선안

### 현재 상태

원본의 6개 필드는 다음과 같다.

- **start:** “요청·응답 서버 페이지 열림”
- **action:** `GET /`와 `GET /missing` 결과 비교; `POST /api/note` 응답 확인; API 정의와 스키마 체크
- **expected:** 요청 값에 따라 404와 200을 구분
- **fail:** API를 제품명으로 오해; 비밀을 붙여 넣거나 공유
- **recover:** 본문 요청·응답 미니 모델; A06 비밀 금지
- **evidence:** status 메모, API 정의, 비밀 미공유 확인

### 문제점

- URL, 초기 method/path, 교육용 시뮬레이터이며 실제 네트워크 호출이 없다는 사실이 start에 없다.
- action이 status/body/note 중 어떤 필드를 기록할지 지정하지 않는다.
- expected에서 `POST /api/note`의 `201` 결과가 빠져 있다.
- evidence에 세 요청의 구체적 method, path, status, body 값이 없다.
- API를 실제 호출한 결과와 시뮬레이터가 고정해 보여주는 결과를 구분하지 않으면 검증 범위를 과장하게 된다.

### 제안 개선안

#### 1. start

- `/learn/vibe-coding-foundation/api`를 연다.
- `RequestResponseExperience`의 초기 상태인 `GET /`가 선택된 화면에서 시작한다.
- 화면의 안내대로 method와 path를 선택하는 교육용 요청·응답 모델임을 확인한다.
- 실제 네트워크 호출이 없으므로 브라우저 Network 탭이나 외부 API 결과를 증거로 요구하지 않는다.
- 기록 표의 열을 `method | path | status | body | note`로 미리 만든다.

#### 2. action

다음 세 요청을 정확히 순서대로 선택하고 매번 다섯 필드를 기록한다.

| 순서 | method | path | 반드시 기록할 값 |
|---:|---|---|---|
| 1 | GET | `/` | status `200`, body `<!DOCTYPE html>…index.html`, note: HTML 파일 응답 설명 |
| 2 | GET | `/missing` | status `404`, body `Not found: /missing`, note: 없는 경로 실패 설명 |
| 3 | POST | `/api/note` | status `201`, body `{ "ok": true, "saved": "메모 예시" }`, note: 교육용 JSON API이며 실제 Day1 샘플에는 없음 |

각 선택 뒤 화면에 표시되는 요청 줄, status 줄, body, note를 전/후 비교가 가능하도록 기록한다. `GET /`와 `GET /missing`은 status뿐 아니라 body도 비교한다.

#### 3. expected

- `GET /` → status `200`, body에 `index.html` 응답이 표시된다.
- `GET /missing` → status `404`, body가 `Not found: /missing`으로 표시된다.
- `POST /api/note` → status `201`, body에 `ok: true`와 `saved: "메모 예시"`가 표시된다.
- 세 요청을 비교하면 같은 path가 아니라 method/path 조합에 따라 응답 status와 body가 달라진다는 점을 설명할 수 있다.
- 위 값은 교육용 고정 모델의 기대값이며, 실제 서버나 외부 API의 실행 결과라고 표현하지 않는다.

#### 4. fail

- `/missing`의 `404`를 서버 전체 고장 또는 `200` 성공으로 기록한다.
- `POST /api/note`의 `201`을 `200`으로 적거나 body를 기록하지 않는다.
- `GET /api/note` 또는 `POST /`처럼 다른 조합을 선택한 뒤 필수 세 요청의 결과로 대체한다.
- API를 특정 제품명이나 항상 JSON만 반환하는 것으로 단정한다.
- 실제 API 키, 비밀번호, 토큰 또는 개인 정보를 입력·공유하려 한다.
- 고정 시뮬레이터 결과를 실제 네트워크 호출 성공으로 보고한다.

#### 5. recover

1. method와 path를 다시 초기화하고 표의 세 행을 빈 값으로 되돌린다.
2. `/`와 `/missing`의 철자 및 앞뒤 슬래시를 확인한 뒤 각각 다시 선택한다.
3. `POST`를 먼저 선택하고 `/api/note`를 선택해 `201`과 JSON body를 다시 확인한다.
4. status만 적었다면 각 응답의 body와 note를 보완한다.
5. 실제 호출을 시도했다면 중단하고, 이번 Practice의 증거는 화면에 표시된 교육용 고정 응답으로 제한한다.
6. 복구 후 세 행이 모두 `200 / 404 / 201` 순서와 해당 body를 갖추었는지 다시 확인하면 통과다.

#### 6. evidence

다음 세 행을 그대로 포함한 표 또는 화면 기록을 제출한다.

```text
GET  /            status=200  body=<!DOCTYPE html>…index.html
GET  /missing     status=404  body=Not found: /missing
POST /api/note    status=201  body={ "ok": true, "saved": "메모 예시" }
```

- 각 행에 note와 “교육용 시뮬레이터, 실제 네트워크 호출 없음”을 덧붙인다.
- 실제 네트워크 호출을 하지 않았다는 안내를 확인한 기록을 포함한다.
- status, body, note 중 하나라도 빠지거나 세 경로가 구체적으로 적히지 않으면 미완료다.
- 비밀값은 입력하지 않았다는 확인을 별도 체크한다.

### 근거

- Task 5는 B08의 URL·초기 상태·시뮬레이션 안내 부족, 기록 필드 부족, `201` 누락, 세 요청의 구체 값 부족을 지적했다.
- `RequestResponseExperience`는 `GET|/`에 `200`, `GET|/missing`에 `404`, `POST|/api/note`에 `201`과 고정 body를 매핑하고, 화면에 method/path/status/body/note를 표시한다.
- 같은 구현의 안내는 교육용이며 실제 네트워크 호출이 없다고 명시한다. 따라서 이 Practice의 evidence는 네트워크 로그가 아니라 화면의 고정 응답 값이어야 한다.
- `WebLayersExperience`도 교육용 모델과 Preview 상태를 제공할 뿐 API 호출을 수행하지 않는다. B08의 API 증거 근거로 사용할 수 없으므로 API 페이지의 `RequestResponseExperience`를 직접 기준으로 삼는다.
- 구체적인 세 행과 복구 후 재확인 규칙은 초보 학생과 제3자가 동일한 결과를 독립적으로 확인하게 한다.

## 우선순위

1. B07은 실행 경로와 시뮬레이터 경로를 분리하고, 실제 실행 경로에 포트 `3456`, URL, 실행/중지 결과를 고정한다.
2. B08은 `GET / = 200`, `GET /missing = 404`, `POST /api/note = 201`과 각 body를 expected/evidence에 고정한다.
3. 두 Practice 모두 실제 관찰값과 추론·시뮬레이터 결과에 경로 라벨을 붙인다.
4. fail/recover에 폴더·포트·오래된 브라우저 화면·잘못된 method/path·실제 호출 오해를 포함하고 복구 후 재확인 조건을 둔다.

## 검증 방법

- **Gate 필드 확인:** B07/B08 각각에 `start`, `action`, `expected`, `fail`, `recover`, `evidence`가 있고 행동과 완료 증거가 구체적인지 확인한다.
- **구현 일치 확인:** B07은 `StackRolesExperience`와 샘플 `server.js`, B08은 `RequestResponseExperience`의 실제 상수와 UI 표시를 대조한다. 제공된 `WebLayersExperience`는 서버/API 실행이 아닌 교육용 레이어 모델이라는 제한을 확인한다.
- **관찰 가능성 확인:** 추상어 대신 포트, URL, method, path, status, body, 화면 문구, 실행 전/후 접속 결과가 제시되는지 확인한다.
- **독립 실행성 확인:** 초보 학생이 작업 폴더·초기 상태·선택 행동·실패 복구·완료 기록을 추가 질문 없이 따라 할 수 있는지 확인한다.
- **증거 정직성 확인:** 실행하지 않은 상상 결과, 영상만 본 결과, 시뮬레이터 결과를 실제 서버/API 결과로 기록하지 않는지 확인한다.
- **범위 확인:** 이 제안서 작성은 문서 분석과 보고서 생성으로 제한하며 원본 Practice, P0 콘텐츠, 소스 코드, lint/build는 건드리지 않는다.

자체 점검 결과, 두 개선안은 Practice 6개 필드를 모두 구체화하고, 실행/시뮬 경로, 관찰값, 실패 복구, 독립 검증 가능한 evidence를 포함한다. 다만 이는 제안서의 Gate 적합성 검토이며, 원본 Practice에 반영되거나 실제 학생 실행으로 검증되었다는 의미는 아니다.
