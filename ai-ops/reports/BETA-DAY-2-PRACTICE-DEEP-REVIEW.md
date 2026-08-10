# BETA Day 2 Practice Deep Review

## 검토 목적과 범위

- 기준 보고서: `ai-ops/reports/BETA-DAY-2-PRACTICE-QUALITY-REVIEW.md`
- 구조 기준: `ai-ops/contracts/NODE_QUALITY_GATE.md`의 Practice 필수 필드
- 심화 대상: B05–B09 5개 파일
  - `content/practice/vibe-coding-foundation/11-files-connect-practice.md`
  - `content/practice/vibe-coding-foundation/12-frontend-practice.md`
  - `content/practice/vibe-coding-foundation/13-backend-practice.md`
  - `content/practice/vibe-coding-foundation/14-api-practice.md`
  - `content/practice/vibe-coding-foundation/15-database-practice.md`
- 점수: 1점 = 필드가 형식상 있으나 실행·검증이 거의 불가, 5점 = 초보 학생이 같은 시작 상태에서 실행하고 제3자가 독립 검증 가능

## 검토 방법과 검증 상태

각 Practice 문서의 `start`, `action`, `expected`, `fail`, `recover`, `evidence`를 읽고, 연결된 lesson·시뮬레이터 구현에서 문서가 약속하는 관찰 결과를 정적 대조했다.

- 확인된 사실: 5개 문서 모두 6개 필드를 포함한다.
- 확인된 사실: B05 시뮬레이터는 CSS/JS 연결을 각각 끊고 미리보기 변화를 표시한다.
- 확인된 사실: B06/B07 역할 분류 시뮬레이터는 `src/index.html`, `src/style.css`, `src/main.js`, `server.js`, `package.json`에 교육용 역할을 부여한다.
- 확인된 사실: B08 시뮬레이터의 구현 응답은 `GET /` = 200, `GET /missing` = 404, `POST /api/note` = 201이다. 실제 네트워크 호출은 없다.
- 확인된 사실: B09 시뮬레이터는 메모리 모드의 값은 새로고침 시뮬레이션에서 비우고 Database 모드의 값은 유지한다.
- 미확인: 브라우저에서 실제 학생 동선을 실행한 런타임 QA. 따라서 아래 평가는 정적 심화 검토이며, 실제 UI 실행 성공을 의미하지 않는다.

## 종합 점수

| 파일 / Node | start | action | expected | fail | recover | evidence | 합계 / 30 | 판정 |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| `11-files-connect-practice.md` / B05 | 3 | 4 | 3 | 3 | 3 | 3 | 19 | 보완 필요 |
| `12-frontend-practice.md` / B06 | 3 | 4 | 3 | 3 | 3 | 3 | 19 | 보완 필요 |
| `13-backend-practice.md` / B07 | 2 | 3 | 2 | 3 | 3 | 2 | 15 | 우선 보완 |
| `14-api-practice.md` / B08 | 2 | 3 | 3 | 3 | 3 | 2 | 16 | 우선 보완 |
| `15-database-practice.md` / B09 | 2 | 4 | 3 | 3 | 3 | 3 | 18 | 보완 필요 |

## 파일별 심화 검토

### B05 — `11-files-connect-practice.md`

| 필드 | 점수 | 근거와 개선 제안 |
|---|---:|---|
| start | 3 | `Day1 샘플 폴더`와 `src/index.html`은 방향을 주지만, 로컬 실습인지 시뮬인지 선택지가 섞여 있고 샘플의 시작 커밋·URL·연결 상태가 없다. `시뮬레이터를 초기화하고 CSS/JS 연결됨 상태, 미리보기 제목을 확인`처럼 초기 상태를 고정한다. |
| action | 4 | 찾을 대상과 토글 행동이 명확하다. 다만 “찾아 표시”의 표시 방식과 CSS off/복구 후 확인 순서가 없다. `head의 link 줄과 body 끝의 script 줄을 각각 표시 → CSS 끊김 → 미리보기 배경 변화 기록 → CSS 복구`로 고정한다. |
| expected | 3 | 두 줄을 찾는 결과는 확인 가능하지만 “변화를 말로 설명”은 정답 판정이 주관적이다. `CSS off에서 배경이 흰색으로 바뀌고 JS off에서 추가 문구가 사라짐`처럼 관찰 가능한 결과와 최소 설명을 제시한다. |
| fail | 3 | 파일이 옆에 있으면 자동 연결된다는 오해와 연결 줄 탐색 실패는 현실적이다. 여기에 `href/src 경로가 보이지 않거나 토글 후 미리보기가 변하지 않음`을 추가하면 실제 실패 신호가 된다. |
| recover | 3 | 핵심 표 재확인과 head/하단 재검색은 유용하나 재시도 완료 조건이 없다. “link는 head, script는 body 끝에서 다시 찾고, 두 줄을 다시 표시한 뒤 CSS off 결과를 1회 재확인”까지 적는다. |
| evidence | 3 | 메모·스크린·한 줄 기록은 산출물이지만, 제3자가 위치와 결과를 재현할 정보가 부족하다. 파일명+줄 번호, CSS off/on 각각의 상태, AI 요청 원문을 한 체크리스트로 요구한다. |

**핵심 개선:** 시뮬레이터의 정확한 상태 변화(CSS off = 배경 기본색, JS off = 추가 문구 없음)를 expected/evidence에 고정한다.

### B06 — `12-frontend-practice.md`

| 필드 | 점수 | 근거와 개선 제안 |
|---|---:|---|
| start | 3 | 파일 목록과 인터랙티브 사용 가능은 있으나 목록이 실제 대상 3개인지, 초기 선택·정답 피드백 상태가 무엇인지 불명확하다. `5개 파일 목록이 보이고 선택값을 초기화한 상태`를 명시한다. |
| action | 4 | 세 파일을 라벨하고 인터랙티브에서 선택하는 동선은 실행 가능하다. 다만 라벨 저장 방식과 세 파일을 각각 선택해 정답 피드백을 확인하는 조건을 명시하면 더 재현 가능하다. |
| expected | 3 | “FE = 브라우저 UI 레이어”는 방향은 맞지만 학생 답변의 허용 범위가 없다. `index.html=구조, style.css=스타일, main.js=브라우저 동작`을 각각 맞히고 “브라우저에서 실행·표시되는 UI 코드”를 작성하는 것으로 판정한다. |
| fail | 3 | `server.js` 오분류와 FE를 디자인으로만 보는 오해는 현실적이다. `package.json`을 FE로 고르는 경우와 main.js가 항상 FE라는 일반화도 추가할 수 있다. |
| recover | 3 | FE/BE 표와 시뮬 정답 피드백은 적절하지만 어떤 오답을 어떻게 다시 풀지 없다. 오답 파일을 다시 선택하고 역할 설명을 읽은 뒤, 세 파일을 모두 재분류하도록 절차화한다. |
| evidence | 3 | 목록·정의·요청문은 남지만 실제 분류 성공을 제3자가 확인하기 어렵다. 파일별 라벨 표와 시뮬레이터의 `맞음` 피드백 3건을 캡처 또는 기록하도록 한다. |

**핵심 개선:** “세 파일 라벨 완료”를 파일별 정답(구조/스타일/브라우저 동작)과 연결해 expected/evidence를 객관화한다.

### B07 — `13-backend-practice.md`

| 필드 | 점수 | 근거와 개선 제안 |
|---|---:|---|
| start | 2 | `server.js 열 수 있음`은 구체성이 있으나 “가능하면 서버 실행/중지”가 선택 사항이다. 작업 폴더, 실행 명령, 기본 포트, 브라우저 주소 또는 시뮬 대체 경로를 하나로 고정해야 한다. |
| action | 3 | 주석·포트 읽기와 분류는 실행 가능하지만 “무엇을 응답하나?”의 답 형식이 없다. 서버를 끈 뒤 **관찰 또는 상상**을 허용해 실제 행동과 추론이 섞인다. 실행 경로와 시뮬 경로를 별도 명시하고, 시뮬 경로에서는 “서버 off 상태”를 선택하게 한다. |
| expected | 2 | `BE = 화면 뒤 처리 / 미니 서버 예시 연결`은 개념 요약이지 검증 가능한 결과가 아니다. `server.js가 요청을 받아 로컬 파일을 응답한다`, `포트와 주소를 찾는다`, `서버 off 시 페이지 요청이 실패하거나 접속 불가로 표시된다`처럼 관찰값을 제시한다. |
| fail | 3 | Node만이 Backend라는 오해와 package.json 오해는 현실적이다. 포트가 이미 사용 중이거나 잘못된 폴더에서 실행한 경우도 추가하면 실습 실패와 직접 연결된다. |
| recover | 3 | 교육 경계 표와 A03 복습은 방향을 주지만 실행 복구가 없다. `실행 폴더 확인 → package.json scripts/port 확인 → 이미 사용 중이면 중지 후 재실행 → localhost 주소 재접속` 순서를 제공한다. |
| evidence | 2 | 요약·분류·off 메모가 있지만 “상상 시나리오”도 통과할 수 있어 독립 검증이 약하다. 실행 또는 시뮬 모드를 표시하고, 포트 번호·응답 대상·off 결과(접속 실패/오류)를 각각 기록하게 한다. |

**핵심 개선:** B07의 `가능하면`, `관찰(또는 상상)`을 제거하고 실행형과 시뮬형의 증거 규칙을 분리한다. 현재 상태로는 독립 실행형 Practice의 핵심 게이트를 가장 크게 약화한다.

### B08 — `14-api-practice.md`

| 필드 | 점수 | 근거와 개선 제안 |
|---|---:|---|
| start | 2 | “요청·응답 시뮬 페이지 열림”만으로는 URL, 초기 메서드·경로, 교육용 시뮬임이 고정되지 않는다. `B08 API 시뮬레이터를 열고 GET / 초기 상태와 실제 네트워크 호출 없음 안내를 확인`으로 구체화한다. |
| action | 3 | 비교할 경로와 POST 행동은 명확하지만 어떤 필드(status/body/note)를 기록할지 없다. GET `/`·`/missing`은 status와 body를 기록하고, POST `/api/note`는 status 201과 교육용 JSON을 기록하도록 한다. |
| expected | 3 | 요청→응답과 404 vs 200을 확인하게 하지만 POST 결과와 201이 빠져 있다. 구현과 문서의 기대를 맞춰 `GET / = 200`, `GET /missing = 404`, `POST /api/note = 201`을 명시한다. |
| fail | 3 | API를 제품명으로 오해하거나 키를 붙이는 상황은 현실적이다. “실제 호출로 착각”, “404를 서버 전체 고장으로 해석”, “POST status를 200으로 기록”도 추가한다. |
| recover | 3 | 본문 모델과 비밀 금지 연결은 적절하지만 오답을 다시 검증하는 절차가 없다. 메서드·경로·status·body를 다시 한 줄씩 대응시키고 시뮬레이터의 교육용 안내를 확인하게 한다. |
| evidence | 2 | status 메모와 API 정의는 남지만 `/`와 `/missing` 각각의 값, POST 결과, 비밀 미포함 검증 방식이 빠져 있다. 3개 요청의 method/path/status/body 요약표와 “실제 네트워크 호출 없음” 체크를 요구한다. |

**핵심 개선:** 구현의 고정 응답값을 문서의 expected/evidence에 반영하고, 실제 API 호출이 아니라 교육 모델임을 start와 evidence 양쪽에서 확인한다.

### B09 — `15-database-practice.md`

| 필드 | 점수 | 근거와 개선 제안 |
|---|---:|---|
| start | 2 | 시뮬이 열렸다는 것 외에 초기 모드, 빈 메모, 새로고침 횟수가 없다. `메모리 모드·빈 입력·새로고침 0회`를 명시하면 재현성이 높아진다. |
| action | 4 | 두 모드 저장과 새로고침 비교, 판단 질문, AI 요청까지 순서가 좋다. 다만 모드 전환과 메모 텍스트를 고정하면 학생 간 비교가 쉬워진다. 예: `B09`를 두 모드에 동일하게 저장한다. |
| expected | 3 | 남는 저장소와 임시 메모리의 구분은 맞지만 시뮬레이터가 보여주는 구체적 변화가 없다. `memory: 새로고침 후 빈 값`, `database: 같은 메모 유지`를 명시하고 “제품 선택은 요구사항에 따라 달라짐”을 학생 문장 기준으로 둔다. |
| fail | 3 | 특정 제품 필수와 가격 단정은 현실적이다. 모드 전환 없이 비교하거나 새로고침 전 값을 기록하지 않는 절차 실패도 추가한다. |
| recover | 3 | 본문 표와 pricing blocked 연결은 안전하지만 학생이 어디까지 다시 해야 하는지 없다. 동일한 메모를 memory/database에 각각 저장하고 새로고침 시뮬을 다시 눌러 두 결과를 표로 재작성하게 한다. |
| evidence | 3 | 비교 메모와 판단 근거는 남지만 원본 메모·각 모드·새로고침 전후 값이 없다. 동일 문자열, 모드명, 전/후 값, refresh 횟수를 기록하게 하면 독립 검증이 가능해진다. |

**핵심 개선:** 두 모드의 전·후 값을 동일한 문자열로 기록하게 하여 “남는다/사라진다”를 재현 가능한 증거로 만든다.

## 우선순위 개선 목록

1. **B07:** 선택적 실행과 상상 기록을 제거하고 실행/시뮬 경로 및 접속 실패 결과를 고정한다.
2. **B08:** 구현에 맞는 status 기대값(200/404/201), body 기록, 실제 네트워크 호출 없음 안내를 추가한다.
3. **B05/B06/B09:** 정답 예시와 전·후 상태를 evidence 체크리스트에 넣어 제3자가 재검증할 수 있게 한다.
4. 모든 파일의 `start`에 URL 또는 샘플 경로, 초기 선택·상태, 학생이 기록할 입력값을 추가한다.
5. 모든 `recover`에 “복구 후 무엇을 다시 확인하면 통과인지”를 한 단계 이상 추가한다.

## 행동 원인 분류

| 검토 행동 | 원인 분류 | 근거 |
|---|---|---|
| B05–B09를 6개 필드별로 채점 | 사용자 직접 요청 + PROJECT_RULE | 사용자가 명시한 6개 기준과 `AGENTS.md`의 Practice/교육 품질 계약을 적용했다. |
| 실행 가능성·실패·복구·완료 증거를 심화 평가 | PROJECT_RULE + `executable-practice` Skill | `NODE_QUALITY_GATE.md`의 Practice 필드와 Skill의 “reproducible start / observable result / realistic failure / recovery / completion evidence” 절차에 따른 판단이다. |
| 관찰 결과와 코드 기반 기대를 분리하고 미실행 QA를 명시 | JUTELL 영향 | `.agents/skills/beginner-bridge/SKILL.md`의 evidence, verification state, risk, user action 분리 원칙을 보고서에 반영했다. |
| 대상 Practice 파일이나 구현을 수정하지 않음 | PROJECT_RULE | 이번 요청은 검토와 보고서 작성이며, 대상 콘텐츠는 보호·검토 범위로 유지했다. |

## JuTell Feature 실제 발동 여부

- **확인되지 않음.** 이번 작업에서 JuTell MCP/CLI 또는 자동 보고서 생성 기능을 호출했다는 실행 로그는 확인하지 못했다.
- 확인한 것은 프로젝트의 `.jutell.json` 설정과 `.jutell-local`의 기존 세션 파일뿐이다. 설정 존재나 기존 세션 파일만으로 이번 검토에서 JuTell Feature가 실제 발동했다고 판단하지 않는다.
- 따라서 본 보고서의 JUTELL 표기는 “보고서 작성 원칙에 영향을 준 로컬 지침”으로만 분류하며, Feature 실행 완료로 주장하지 않는다.

## 최종 판단

기준 보고서의 구조 판정인 5/5 필드 존재는 유지된다. 그러나 심화 품질 기준에서는 B05, B06, B09가 **보완 필요**, B07과 B08이 **우선 보완**이다. 특히 B07은 실제 실행 대신 상상을 허용하고, B08은 구현 응답값과 evidence가 충분히 연결되지 않아 현재 상태를 `Practice executable`의 강한 의미로 확정하기 어렵다.

### 실행·검증 기록

- 실행한 검토: 정적 파일 및 연결 구현 대조
- 미실행: 브라우저 런타임 QA, 학생 동선 재현, 실제 서버 기동
- 생성 파일: `ai-ops/reports/BETA-DAY-2-PRACTICE-DEEP-REVIEW.md`
- 대상 5개 Practice 파일: 수정하지 않음
