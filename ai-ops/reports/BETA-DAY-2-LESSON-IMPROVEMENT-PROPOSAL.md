# A05/A06/B01/B02/B03 Lesson 개선안

## 1. 목적과 범위

이 문서는 Task 6의 Lesson 품질 검토 결과를 공식 노드 ID 기준으로 분리한 개선 제안서다. 원본 Lesson, Practice, route, Quiz/Outcome, 소스 코드는 수정하지 않는다.

- 기준 보고서: `BETA-DAY-2-LESSON-QUALITY-REVIEW.md` (Task 6)
- ID 기준: `ai-ops/master-toc.md` 및 `BETA-DAY-2-NODE-ID-MAPPING.md` (Task 9)
- Gate 기준: `ai-ops/contracts/NODE_QUALITY_GATE.md` 및 `BETA-DAY-2-GATE-READINESS-ANALYSIS.md` (Task 13)
- Practice 설계 기준: `start · action · expected · fail · recover · evidence` 6개 필드
- 공식 Lesson 경로: `content/courses/vibe-coding-foundation/lessons/`

사용자 요청의 파일 순번 05~09는 공식 ID와 일치하지 않는다. 이 보고서에서는 파일 순번을 별칭으로만 사용하고, 모든 연결·우선순위·Gate 판정은 공식 ID를 사용한다.

| 파일 순번/원본 Lesson | 공식 ID | Task 6 점수 | 현재 연결 상태 | 현재 Lesson readiness |
|---|---|---:|---|---|
| `05-terminal-commands.md` | **A05** | 22/30 | route 내 Sample 명령, `embedded_only`; Quiz/Outcome `missing` | 개선안 미적용 — Gate ready 아님 |
| `06-errors-to-ai.md` | **A06** | 24/30 | route 내 오류 요청문, `embedded_only`; Quiz/Outcome `missing` | 개선안 미적용 — Gate ready 아님 |
| `07-web-how-pages-appear.md` | **B01** | 23/30 | `07-10-web-layers-practice.md`, `shared_asset`; `NodeCheckpoint`, `interactive` | 개선안 미적용 — Gate ready 아님 |
| `08-html-basics.md` | **B02** | 25/30 | `07-10-web-layers-practice.md`, `shared_asset`; `NodeCheckpoint`, `interactive` | 개선안 미적용 — Gate ready 아님 |
| `09-css-basics.md` | **B03** | 25/30 | `07-10-web-layers-practice.md`, `shared_asset`; `NodeCheckpoint`, `interactive` | 개선안 미적용 — Gate ready 아님 |

Task 6의 평균은 **23.8/30**이다. 이는 문서 품질 참고치이며, 원본 반영·학생 실행·독립 리뷰가 끝났다는 뜻은 아니다.

## 2. 공통 개선 원칙

1. **공식 ID를 먼저 고정한다.** A05/A06을 B05/B06으로 표시하지 않고, 파일 순번과 노드 ID를 별도 표기한다. A05/A06에 `node_id`를 추가할지는 별도 승인 사항으로 남긴다.
2. **Lesson의 설명을 독립 수행 카드로 닫는다.** 학생이 시작 상태, 행동, 기대 결과, 실패 예, 복구 순서, 완료 증거를 추가 질문 없이 확인할 수 있어야 한다.
3. **Practice와 Assessment를 분리해 연결한다.** Practice는 수행 증거를 만들고, Assessment/Quiz는 학생이 이유를 설명하고 오개념을 교정했는지 확인한다.
4. **시뮬레이터 결과와 실제 실행 결과를 구분한다.** 화면에 표시된 교육 모델을 localhost·브라우저·네트워크 실행 증거로 표현하지 않는다.
5. **Gate-ready는 제안서 작성과 다르다.** 원본 반영 후 정적 대조, route/interaction 확인, 학생 실행, 관련 QA, 독립 리뷰가 모두 남아야 한다.

## 3. 공식 A05 — `05-terminal-commands.md`

### 현재 상태 요약

- **점수:** 22/30 (`BETA-DAY-2-LESSON-QUALITY-REVIEW.md`의 B05 파일순번 항목)
- `자리 → 질문 → 핵심 → 실습 → Outcome → Next` 흐름과 터미널·cwd·프로젝트 루트 설명은 있다.
- 실습은 터미널 열기, 프로젝트 루트 이동, 버전 확인, `npm run dev`의 4단계지만, 시작 상태·기대 결과·실패·복구·완료 증거가 분리되어 있지 않다.
- Master TOC에서 A05는 별도 Practice가 아닌 route 내 `embedded_only`이고 Quiz/Outcome은 `missing`이다.
- `package.json`이 있는 곳을 프로젝트 루트로 보는 설명과 “cwd가 명령 성공의 열쇠”라는 표현은 초보자에게 유용하지만, 일반적 관례라는 범위 표시가 필요하다.
- 파일 내부에는 `node_id`가 없고 `lesson_id: terminal-commands`만 있다. 공식 ID는 Master TOC의 A05로 관리해야 한다.

### 개선 영역과 우선순위

#### A05-1. 공식 ID·연결 표기 정렬 — **HIGH**

- 학생용 제목, route 안내, Next, 후속 Practice/Assessment 문서에서 `A05 터미널에 치는 글자는 왜 필요할까요?`를 canonical 표기로 사용한다.
- `B05` 또는 “파일 05 = B05”라는 별칭은 사용하지 않는다. B05는 Master TOC에서 `11-files-connect.md`를 가리킨다.
- A05에 `node_id`를 실제로 추가할지 여부는 원본 콘텐츠 변경 승인 후 결정한다. 이 보고서에서는 ID 정책만 제안한다.

#### A05-2. embedded Practice를 6개 필드 실행 카드로 구체화 — **HIGH**

- **start:** `examples/day1-first-success`에서 시작하고 현재 폴더, `package.json`, `scripts` 위치를 확인한다.
- **action:** 현재 폴더를 기록하고, 프로젝트 루트를 찾고, `scripts`를 확인한 뒤 설치 상태에 맞는 `node -v`/`npm -v`와 `npm run dev`를 실행한다.
- **expected:** 실행한 폴더와 명령이 일치하고, 터미널의 실행 결과 또는 명확한 오류가 관찰된다.
- **fail:** 다른 폴더에서 명령 실행, `scripts`에 없는 명령 실행, 서버 실행 후 표시되는 주소·메시지를 확인하지 않음.
- **recover:** 현재 폴더를 다시 확인하고 `package.json`/`scripts`를 찾은 뒤 명령을 재실행한다. 실패 결과는 지우지 않고 A06 형식으로 전달한다.
- **evidence:** 폴더 경로, `package.json` 확인, 확인한 script 이름, 실행 명령, 터미널 결과, 실패 시 복구 후 결과를 한 표에 기록한다.

#### A05-3. node-specific Assessment/teach-back 추가 — **HIGH**

- Quiz 또는 route 내 checkpoint에서 후보 폴더 중 프로젝트 루트를 고르게 하고, 선택 이유를 `package.json`·`scripts`·현재 폴더와 연결해 설명하게 한다.
- “명령을 실행했다”만으로 통과시키지 않고, 학생이 **왜 그 폴더에서 그 명령을 실행했는지** 말하게 한다.
- 오답 이유에는 “파일은 존재하지만 현재 폴더가 다름”, “script가 없음”, “실행 결과를 확인하지 않음”을 포함한다.

#### A05-4. 교육용 단순화와 실행 경계 보완 — **MEDIUM**

- “보통 `package.json`이 있는 곳”은 일반적인 프로젝트 관례임을 표시하고, 모든 프로젝트의 유일한 정의로 제시하지 않는다.
- “cwd가 명령 성공의 열쇠”는 많은 명령에서 중요한 확인점이라는 표현으로 완화한다.
- 현재 실행 환경에서 확인하지 않은 명령 결과를 성공 사례처럼 단정하지 않는다.

### 검증 방법

1. **정적 연결 대조:** `master-toc.md`의 A05 ID·route·`embedded_only`·Quiz/Outcome 상태와 Lesson, route, 후속 문서의 표기를 대조한다.
2. **6개 필드 점검:** A05 실행 카드에 여섯 필드가 있고 각 필드가 실제 입력·관찰·기록 행동으로 작성됐는지 확인한다.
3. **실행 검증:** 깨끗한 Day1 Sample에서 올바른 폴더 실행과 잘못된 폴더 실행을 각각 재현하고, 결과와 복구 기록을 확인한다.
4. **Assessment 검증:** 학생이 폴더·script·명령의 관계를 선택 이유와 함께 설명하는지 확인한다. 단순 체크박스 성공만으로 통과시키지 않는다.
5. **경계 검증:** 실제 터미널 결과와 Lesson의 교육용 설명을 구분하고, 미실행 결과를 evidence로 인정하지 않는다.

### A05 Gate-ready 성공 기준

- 공식 ID A05, route, Next A06, Practice/Assessment 연결이 한 기준표에서 일치한다.
- 6개 필드가 채워지고, 초보 학생이 현재 폴더 확인부터 실행·실패·복구·기록까지 독립 수행할 수 있다.
- 폴더·`package.json`·script·명령·터미널 결과가 제3자 재확인 가능한 evidence로 남는다.
- A05 전용 Assessment가 이유 설명과 teach-back을 포함한다.
- Interactive는 실제 실행을 제공하거나, 제공하지 않는 경우 `not_applicable_with_reason`가 명시된다.
- Sources 범위, 독립 리뷰, 관련 QA, Studio 상태가 `NODE_QUALITY_GATE.md`에 맞게 확인된다.

## 4. 공식 A06 — `06-errors-to-ai.md`

### 현재 상태 요약

- **점수:** 24/30 (`BETA-DAY-2-LESSON-QUALITY-REVIEW.md`의 B06 파일순번 항목)
- 현재 폴더·실행 명령·오류 전문·`package.json` scripts·원하는 결과를 함께 전달하는 진단 순서와 비밀정보 제거 안내는 강점이다.
- guided example이 없어 학생이 템플릿을 실제 오류에 적용하는 과정을 끝까지 확인하기 어렵다.
- Master TOC에서 A06은 route 내 오류 요청문만 있는 `embedded_only`이며 Quiz/Outcome은 `missing`이다.
- “빨간 글자”는 오류 자체가 아니라 출력 색상에 의존하는 표현이므로 “오류 메시지/실패 출력”으로 보완해야 한다.

### 개선 영역과 우선순위

#### A06-1. 공식 ID와 Assessment 진입점 정렬 — **HIGH**

- 학생용 제목과 route에서 `A06 오류 메시지는 실패 증명서가 아니라 AI에게 줄 재료입니다`를 공식 ID와 함께 표시한다.
- `A06 → B01`의 Next 연결은 유지하되, B01을 파일 07 또는 요청 별칭 B07로 표시하지 않는다.
- A06의 별도 Practice/Quiz 자산을 만들지, route embedded 형태로 유지할지는 승인 대상이다. 어느 형태든 Gate 필드는 충족해야 한다.

#### A06-2. 민감정보 제거 전·후 guided example 추가 — **HIGH**

하나의 실패 상황을 처음부터 끝까지 채우는 예시를 둔다.

1. **start:** 실패 명령, 현재 폴더, 목표, OS, 오류 출력이 준비된 상태에서 시작한다.
2. **action:** 개인 경로·API key·token·password를 `[REDACTED]`로 바꾸고, 명령·오류 전문·관련 script·원하는 결과를 템플릿에 넣는다.
3. **expected:** AI에 전달한 요청문에서 재현에 필요한 맥락은 남고 비밀값은 제거된다.
4. **fail:** 오류 한 줄만 전달, “빨간 글자”만 전달, 비밀값을 그대로 붙여넣기, 원인 분석 전에 수정 명령을 실행하기.
5. **recover:** 민감정보를 다시 가리고 현재 폴더·명령·오류·목표를 보완한 뒤 “아직 수정하지 말고 원인 후보와 확인 순서만” 요청한다.
6. **evidence:** 가리기 전/후의 차이, 완성된 안전한 요청문, AI 분석 결과의 원인 후보, 다음 확인 행동을 기록한다. 실제 비밀값은 evidence에 남기지 않는다.

#### A06-3. 안전한 전달과 원인 분석을 확인하는 Assessment — **HIGH**

- 학생이 오류 예시에서 제거해야 할 값을 선택하고, 제거 이유를 설명하게 한다.
- 완성된 요청문에서 “원인 분석 → 확인 순서 → 수정 여부 결정”의 순서를 teach-back하게 한다.
- AI가 제안한 수정 명령을 바로 실행하지 않고, 먼저 재현 조건과 원인을 확인했는지 평가한다.

#### A06-4. 용어·복구 경계 정밀화 — **MEDIUM**

- “빨간 글자”를 “오류 메시지 또는 실패 출력”으로 바꾼다.
- `[REDACTED]` 예시와 “개인 경로의 민감한 부분도 가릴 수 있음”을 함께 보여 준다.
- 오류를 AI에 전달하는 행동과 AI의 답을 실제로 적용하는 행동을 분리한다.

### 검증 방법

1. **정적 연결 대조:** A06 route, Next B01, embedded/Practice 상태, Assessment 진입점이 `master-toc.md`와 일치하는지 확인한다.
2. **예시 검증:** guided example에 시작 오류, redaction 전·후, 안전한 요청문, 분석 결과, 다음 행동이 모두 있는지 확인한다.
3. **안전성 검증:** 실제 키·토큰·비밀번호가 예시와 제출 evidence에 없는지 검색한다. 테스트 출력에도 비밀정보를 포함하지 않는다.
4. **학생 실행 검증:** 초보 학생이 오류를 재현하거나 제공된 오류 사례를 사용해 안전한 요청문을 만들고, 원인 분석과 다음 확인 행동을 설명하는지 확인한다.
5. **Assessment 검증:** 오답 이유와 복구 경로가 있으며, 오류를 전달했다는 사실만으로 통과되지 않는지 확인한다.

### A06 Gate-ready 성공 기준

- 공식 ID A06, route, Next B01, Practice/Assessment 표기가 서로 일치한다.
- 학생이 오류를 안전하게 정리해 전달하고, 각 맥락 필드가 필요한 이유를 설명할 수 있다.
- redaction 전·후 예시와 안전한 요청문이 있고, 실제 비밀정보는 없다.
- 오류 전달, AI 원인 분석, 수정 실행 결정을 서로 다른 단계로 관찰할 수 있다.
- A06 전용 Quiz/Assessment가 이유·오개념 교정·teach-back을 포함한다.
- Interactive 또는 정당한 비적용 사유, scoped Sources, 독립 리뷰, 관련 QA, 정직한 Studio 상태가 확인된다.

## 5. 공식 B01 — `07-web-how-pages-appear.md`

### 현재 상태 요약

- **점수:** 23/30 (Task 6의 파일순번 B07 항목, 공식 ID B01)
- 학생 질문, Why Now, 교육 모델, 오개념 교정, Outcome 표가 있어 개념 흐름은 좋다.
- `실습 미리보기`는 레이어 관찰 지시 수준이며, 시작 상태·예상·실제 결과·실패·복구·완료 evidence가 충분히 구체화되지 않았다.
- 공용 `07-10-web-layers-practice.md`와 주제는 일치하지만, 레이어 토글과 메모가 실제 관찰·설명 능력을 충분히 증명하지 못할 수 있다.
- 현재 문서가 “교육 모델”이라고 표시한 점은 유지해야 하며, 선형 흐름을 실제 브라우저 전체 동작으로 과장하지 않아야 한다.

### 개선 영역과 우선순위

#### B01-1. 공유 Practice를 관찰 가능한 실행 카드로 확장 — **HIGH**

- **start:** B01 route의 레이어 인터랙티브와 Sample의 `index.html`을 준비하고, 실제 서버 실행인지 교육용 시뮬레이션인지 먼저 기록한다.
- **action:** HTML/CSS/JS 레이어를 한 번에 하나씩 끄고, 끄기 전 예상 변화와 실제 Preview 변화를 각각 기록한다. 그 뒤 `index.html`에서 구조·연결 대상을 확인한다.
- **expected:** 각 레이어를 끄었을 때의 변화와 “어떤 계층이 영향을 주었는지”를 한 문장으로 설명한다.
- **fail:** 예상과 실제를 구분하지 않음, 레이어 토글 결과를 localhost 실행 결과로 기록함, HTML/CSS/JS 역할을 서로 바꿈.
- **recover:** 레이어를 초기화하고 한 계층씩 다시 토글한 뒤, 교육 모델과 실제 Sample 관찰을 별도 표로 작성한다.
- **evidence:** `레이어 | 예상 | 실제 Preview 변화 | 이유 | 실행/시뮬레이션 경로` 표와 B01 설명 문장을 남긴다.

#### B01-2. NodeCheckpoint의 질문·이유·teach-back 연결 — **HIGH**

- 요청→응답→해석→표시 흐름의 순서를 고르게 하는 문항을 B01 전용으로 둔다.
- HTML/CSS/JS 레이어 중 하나를 끈 결과를 선택하게 하고, 정답 이유를 설명하게 한다.
- “Preview가 바뀌었다”와 “실제 브라우저 요청이 발생했다”를 구분하는 오답 이유를 제공한다.

#### B01-3. 교육 모델의 범위 표지와 실제 관찰 경계 — **MEDIUM**

- 현재의 “교육 모델” 표기를 흐름도와 함께 유지한다.
- 실제 브라우저에는 추가 자원 요청·파싱·실행·레이아웃·페인트 등의 상호작용이 있을 수 있음을 짧게 안내한다.
- 인터랙티브 Preview는 실제 서버·네트워크 증거가 아니라 교육용 레이어 모델이라는 문구를 evidence 영역에도 반복한다.

#### B01-4. 공식 ID와 공유 자산 표시 정리 — **LOW**

- Practice 파일명 `07-10`은 파일 묶음명으로 유지할 수 있지만, 내부 섹션·checkpoint·완료 기록은 B01~B04 공식 ID를 사용한다.
- 요청 문맥의 B07 표기를 학생용 또는 운영용 완료 신호로 사용하지 않는다.

### 검증 방법

1. **정적 대조:** Master TOC의 B01 route·shared Practice·NodeCheckpoint 연결과 Lesson의 Outcome ID를 대조한다.
2. **상태 대조:** 레이어 인터랙티브의 시뮬레이션 안내와 Lesson/Practice의 실제 실행 표현이 모순되지 않는지 확인한다.
3. **학생 실행:** 학생이 예상→토글→실제 관찰→이유 설명 순서를 혼자 수행하고, 예측이 틀렸을 때 reset/retry할 수 있는지 확인한다.
4. **Assessment 검증:** B01 전용 문항이 순서·레이어·교육 모델의 한계를 묻고, 답을 고른 이유와 teach-back을 남기는지 확인한다.
5. **증거 검증:** 시뮬레이션 결과와 localhost/브라우저 실행 결과가 서로 다른 라벨로 기록되는지 확인한다.

### B01 Gate-ready 성공 기준

- 공식 ID B01, route, shared Practice 섹션, NodeCheckpoint가 동일한 ID로 연결된다.
- 학생이 세 레이어를 예측·관찰·기록하고, 각 변화의 이유를 설명할 수 있다.
- 실행/시뮬레이션 경계와 교육용 단순화가 명시된다.
- Practice 6개 필드, node-specific checkpoint, reasons, teach-back, reset/retry 증거가 확인된다.
- Outcome evidence가 단순 메모가 아니라 제3자가 다시 확인할 수 있는 전·후 기록이다.
- Sources, 독립 리뷰, 관련 QA, 정직한 Studio 상태가 추가로 PASS한다.

## 6. 공식 B02 — `08-html-basics.md`

### 현재 상태 요약

- **점수:** 25/30 (Task 6의 파일순번 B08 항목, 공식 ID B02)
- HTML을 구조·의미 계층으로 설명하고 CSS·동작·저장을 분리한다. 시작 파일, 저장·새로고침, 실패·복구도 제시되어 다섯 Lesson 중 실행 안내가 비교적 구체적이다.
- 현재 Practice와 Outcome은 제목 문구 한 곳 변경에 머물러, HTML을 구조·의미를 가진 요소로 적용하는 능력과 Sample Project 연결이 좁다.
- `h1 = 큰 제목`으로만 기억하면 의미와 시각 크기를 혼동할 수 있다.
- 본문의 “자세한 연결은 B05”는 공식 B05 `11-files-connect.md`를 뜻하므로, 파일 05 또는 A05와 혼동되지 않게 명시해야 한다.

### 개선 영역과 우선순위

#### B02-1. 문구 교체에서 구조 변경으로 Practice 확장 — **HIGH**

- **start:** 기존 Sample의 `src/index.html`에서 `h1`, `p`, 구역 또는 카드 블록을 먼저 찾고, 변경 전 구조와 화면을 기록한다.
- **action:** 제목·문단·구역의 역할을 말한 뒤 작은 소개 블록 또는 정보 카드를 의미 있는 HTML 요소로 추가하거나 한 블록을 재구성한다.
- **expected:** 새 요소가 올바른 위치에 나타나고, 학생이 각 요소의 문서 역할을 설명한다. 보이는 크기 변화는 CSS의 책임임을 구분한다.
- **fail:** 태그를 시각 크기만으로 선택, 구조와 문구를 혼동, 닫는 태그·중첩·저장 경로 오류, 서버 미실행.
- **recover:** 변경 범위를 한 블록으로 줄이고, 태그 중첩·파일 경로·서버 상태를 확인한 뒤 새로고침한다. 필요한 경우 A06 방식으로 오류를 전달한다.
- **evidence:** 변경 전·후 HTML 구조, 추가/재구성한 요소의 역할 설명, 화면 전·후, 실패 시 복구 결과를 함께 제출한다.

#### B02-2. B02 전용 Assessment와 teach-back 연결 — **HIGH**

- `h1`, `p`, 구역 요소의 역할을 고르게 하고, 왜 CSS가 아니라 HTML에서 수정하는지 설명하게 한다.
- “글자가 커 보이므로 `h1`을 쓴다”와 “주요 제목의 의미를 나타내므로 `h1`을 쓴다”를 구분하는 오답 이유를 둔다.
- 학생이 추가한 블록을 다른 사람이 읽고 구조를 재현할 수 있는지 확인한다.

#### B02-3. 의미·표시·연결 ID 보완 — **MEDIUM**

- `h1`을 “주요 제목을 나타내는 요소”로 설명하고, 보이는 크기는 CSS가 정할 수 있다고 명시한다.
- `B05` 참조를 “공식 B05 — 파일 연결”로 풀어 쓰고, A05 터미널 Lesson과 혼동하지 않게 한다.
- HTML 구조가 CSS·JS와 연결되지만 HTML만으로 동작·저장·서버가 완성되는 것은 아니라는 경계를 유지한다.

#### B02-4. 실제 프로젝트 적용 폭을 좁게 확장 — **LOW**

- 전체 페이지 재작성 대신 기존 Sample의 한 블록만 수정한다.
- 추가된 구조가 B03 CSS Practice에서 선택자 대상으로 이어질 수 있게, 안정적인 요소 또는 class를 사용한다.

### 검증 방법

1. **정적 대조:** B02 route, shared Practice, NodeCheckpoint, `sample` 경로, Next B03 및 B05 연결 문구를 공식 ID와 대조한다.
2. **실행 검증:** 학생이 변경 전 구조 확인→요소 추가/재구성→저장·새로고침→실패 복구를 수행하는지 확인한다.
3. **의미 검증:** 결과 화면만 보지 않고, 학생이 `h1`·`p`·구역의 역할과 CSS와의 차이를 설명하는지 확인한다.
4. **evidence 검증:** 구조 diff 또는 변경 전·후 기록과 화면 결과가 일치하는지 제3자가 확인한다.
5. **Assessment 검증:** B02 전용 이유·오개념·teach-back 문항이 있고, 단일 문자열 변경만으로 통과되지 않는지 확인한다.

### B02 Gate-ready 성공 기준

- 공식 ID B02, route, shared Practice, NodeCheckpoint, Next B03 및 공식 B05 연결이 일치한다.
- 학생이 제목·문단·구역의 의미를 설명하고, 기존 Sample에 작은 구조 변경을 독립적으로 수행한다.
- Practice 6개 필드와 구조·화면·복구 evidence가 모두 있다.
- `h1`의 의미와 CSS의 시각 스타일을 혼동하지 않는지 Assessment와 teach-back으로 확인한다.
- Interactive, scoped Sources, 독립 리뷰, 관련 QA, 정직한 Studio 상태가 모두 Gate 기준을 충족한다.

## 7. 공식 B03 — `09-css-basics.md`

### 현재 상태 요약

- **점수:** 25/30 (Task 6의 파일순번 B09 항목, 공식 ID B03)
- 선택자·속성, 색·여백·글꼴·배치, `link rel="stylesheet"` 연결을 설명하고 CSS가 데이터를 저장하지 않는다는 경계를 둔다.
- Practice와 Outcome이 색 또는 여백 한 곳 변경에 머물러 선택자 범위와 대상/비대상 비교를 충분히 연습하지 못한다.
- 실패 복구가 “B05 연결 끊김”처럼 축약되어 있어, 공식 B05 파일 연결 Lesson을 가리킨다는 사실을 학생이 바로 알기 어렵다.
- 인라인 style보다 파일 분리가 쉽다는 설명은 교육 권장이며, 모든 상황의 절대 규칙으로 읽히지 않게 유지해야 한다.

### 개선 영역과 우선순위

#### B03-1. 단일 값 변경에서 선택자 범위 비교로 확장 — **HIGH**

- **start:** `src/style.css`의 카드 또는 특정 요소 선택자와 HTML의 연결된 대상을 확인하고, 변경 전 대상/비대상 화면을 기록한다.
- **action:** 한 선택자의 색과 여백 중 최소 두 속성을 조정하고, 같은 선택자를 공유하는 대상과 영향을 받지 않아야 하는 비대상을 비교한다.
- **expected:** 의도한 요소만 변경되고, 선택자·속성·값을 각각 설명할 수 있다.
- **fail:** stylesheet `link` 경로 오류, 선택자 철자 오류, 다른 요소까지 변경, 색만 보고 CSS 연결을 판단.
- **recover:** `index.html`의 stylesheet 경로→선택자 철자와 범위→저장→새로고침 순서로 확인하고, 변경 전 상태와 비교한다.
- **evidence:** 선택자, 변경한 속성/값, 대상 요소, 비대상 요소, 변경 전·후 화면, 복구 결과를 기록한다.

#### B03-2. B03 전용 Assessment와 teach-back 연결 — **HIGH**

- HTML의 구조와 CSS의 표현을 같은 예시에서 구분하게 한다.
- 특정 선택자가 어떤 요소에 적용되는지 고르게 하고, 적용되지 않아야 할 요소를 설명하게 한다.
- 화면이 바뀌지 않을 때 `link` 경로·선택자·새로고침을 어떤 순서로 확인할지 말하게 한다.

#### B03-3. 공식 B05 참조와 복구 절차 명료화 — **MEDIUM**

- “연결 끊김(B05)” 대신 “공식 B05 — 파일 연결: `11-files-connect.md`”처럼 표시한다.
- B05가 파일 05 또는 A05가 아니라 Track B의 파일 연결 노드라는 점을 복구 안내에서 명확히 한다.
- 복구 완료는 “화면이 바뀌었다”가 아니라 stylesheet 연결·선택자 적용·새로고침 결과를 다시 확인한 상태로 정의한다.

#### B03-4. 교육 권장과 다음 학습 경계 보완 — **LOW**

- 파일 분리를 유지보수에 유리한 일반적 권장으로 표현한다.
- CSS가 표현·레이아웃·반응형 조정으로 확장될 수 있음을 다음 학습 연결로 짧게 표시하되, 이번 노드의 독립 목표를 과도하게 넓히지 않는다.

### 검증 방법

1. **정적 대조:** B03 route, shared Practice, NodeCheckpoint, sample 경로, Next B04 및 공식 B05 복구 참조를 대조한다.
2. **실행 검증:** 연결된 stylesheet에서 선택자 범위와 두 속성을 변경하고, 대상/비대상 변화가 기대와 같은지 확인한다.
3. **실패·복구 검증:** 의도적으로 경로 또는 선택자를 틀린 상태에서 복구 순서를 실행하고, 복구 완료 evidence를 남긴다.
4. **개념 검증:** 학생이 HTML 구조, CSS 선택자, CSS 속성·값의 역할을 자기 말로 설명하는지 확인한다.
5. **Assessment 검증:** B03 전용 이유·teach-back 문항과 reset/retry가 있고, 단일 색상 변경만으로 통과되지 않는지 확인한다.

### B03 Gate-ready 성공 기준

- 공식 ID B03, route, shared Practice, NodeCheckpoint, Next B04 및 공식 B05 연결이 일치한다.
- 학생이 선택자·속성·값과 대상/비대상 범위를 설명하고 독립적으로 수정한다.
- stylesheet 연결 실패와 선택자 실패를 구분하고, 지정된 복구 순서로 재검증한다.
- Practice 6개 필드와 전·후 화면, 대상/비대상, 복구 evidence가 모두 확인된다.
- Interactive, scoped Sources, 독립 리뷰, 관련 QA, 정직한 Studio 상태가 Gate 기준을 충족한다.

## 8. 후속 적용 순서

1. **ID 정책 승인:** A05/A06의 `node_id` 처리, 파일 순번 별칭 사용 범위, 학생 화면의 공식 ID 표기 방식을 결정한다.
2. **A05/A06 연결 보강:** 두 route의 embedded Practice를 6개 필드로 만들고, A05/A06 전용 Assessment/teach-back 진입점을 보완한다.
3. **B01~B03 공유 Practice 보강:** 공용 자산 안에서 공식 섹션 ID를 유지하며 B01 관찰, B02 구조 변경, B03 선택자 비교를 각각 독립 수행 카드로 만든다.
4. **Lesson 문구와 참조 동기화:** cwd·h1·브라우저 교육 모델·B05 연결 표현을 수정 범위 승인 후 동기화한다.
5. **후속 검증:** Master TOC, Lesson metadata, route, Practice, Interactive, Quiz/Outcome, Next를 한 번에 대조하고 학생 실행·관련 QA·독립 리뷰를 수행한다.

## 9. 전체 Gate readiness 판단

| 판정 대상 | 현재 판단 | 근거 |
|---|---|---|
| 이번 보고서 작성 작업 | **PASS** | 요청된 보고서만 생성하는 문서 작업이며 원본 Lesson/Practice/소스는 수정하지 않음 |
| A05/A06/B01/B02/B03 Lesson 개선안 분리 | **PASS** | 다섯 공식 ID 각각에 현재 상태, 개선 영역, 우선순위, 검증 방법, 성공 기준을 기록함 |
| 다섯 Lesson의 현재 품질 Gate | **NOT READY** | 제안서만 존재하고 원본 반영, 실제 학생 실행 증거, 관련 QA, 독립 리뷰가 없음 |
| 다음 구현/콘텐츠 변경 Gate | **HUMAN_APPROVAL_REQUIRED** | ID 적용 정책과 원본 Lesson/Practice/Assessment 변경 범위가 운영자 승인 대상임 |

### Gate-ready 공통 조건

다섯 Lesson은 다음 조건을 모두 충족한 뒤에만 Gate ready로 판정한다.

- `master-toc.md` 공식 ID, canonical route, Lesson metadata, Practice/Interactive/Quiz/Outcome/Next 연결이 일치한다.
- Student Question과 Outcome이 Observed/Assisted/Independent/Explainable evidence에 연결된다.
- Practice에 `start · action · expected · fail · recover · evidence`가 있고, 실제 행동과 완료 증거가 구체적이다.
- Interactive가 실제 학습 상호작용으로 동작하거나 `not_applicable_with_reason`가 있다.
- Quiz/Assessment가 노드별 이유, 오개념 교정, teach-back을 포함한다. A05/A06의 현재 `missing` 상태는 이 조건을 충족하지 않는다.
- Sources가 official / educational / blocked 범위로 구분되고, 교육용 모델과 실제 동작의 경계가 정직하게 표시된다.
- 관련 lint/typecheck/test/build 또는 허용된 deterministic 검증이 PASS하고, 독립 리뷰가 같은 범위를 재확인한다.
- Studio/Matrix/상태 문서에 원본 반영 전 제안 상태를 완료 상태로 표시하지 않는다.

### 최종 판단

Task 14의 **보고서 산출물은 완료**됐지만, 이 문서는 개선 제안서이므로 Lesson 품질을 자동으로 Gate ready로 승격하지 않는다. 현재 다섯 Lesson의 readiness는 **검토 완료·개선안 분리 완료·원본 반영 전·조건부 미준비**이며, 후속 변경은 `HUMAN_APPROVAL_REQUIRED` 상태에서 승인된 범위로 진행해야 한다.

## 10. 사실·판단·검증 상태

- **확인된 사실:** Task 6 점수와 핵심 지적, Task 9 공식 ID 매핑, Master TOC의 route/Practice/Quiz 연결 상태, Task 13의 Lesson readiness 판정을 기존 로컬 보고서와 대조했다.
- **제안/판단:** 각 Lesson의 개선 영역, 우선순위, 실행 카드, Assessment, 검증 방법, Gate-ready 조건은 위 확인 사실을 바탕으로 한 설계 제안이다.
- **이번 작업에서 검증하지 않은 것:** 원본 반영 후 route 런타임, 실제 학생 사용성, 브라우저 화면, 정적 빌드, lint/typecheck/test/build, 독립 리뷰 결과.
- **보존 조건:** 원본 Lesson 파일과 Practice/소스 코드는 수정하지 않았고, 기존 dirty/untracked 변경은 reset·clean·checkout·삭제하지 않았다.
