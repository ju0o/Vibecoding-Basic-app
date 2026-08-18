# 노드 ID 매핑표

## 개요

- 작성일: 2026-08-10
- 작성자: Codex
- Gate: `APPROVE_CONTENT_PM_DOCS`
- 공식 기준: `ai-ops/master-toc.md`의 Track A·B ID
- 변경 범위: 이 보고서만 생성, 원본 파일 수정 없음
- Lesson 확인 범위: Master TOC가 가리키는 `content/courses/vibe-coding-foundation/lessons/`의 01~15 파일
- 참고: 요청에 적힌 `content/curriculum/`에는 이 Foundation Lesson 본문이 없고, 실제 Master TOC 대상 본문은 `content/courses/.../lessons/`에 있다.

## 매핑표

`파일 내부 ID`는 Lesson front matter의 `node_id`를 뜻한다. `(없음)`은 해당 파일에서 `node_id`를 확인하지 못했다는 의미이며, 공식 ID가 없다는 뜻이 아니다.

| 공식 ID (Master TOC) | 파일명 | 파일 내부 ID | 학생용 표시명 | Practice 연결 | 비고 |
|---|---|---|---|---|---|
| A01 | `01-first-success.md` | (없음) | A01 Day 1 — 첫 성공: AI와 함께 결과물을 실행하기 | 공용/별도 `01-first-success-practice.md` + Sample Project, `interactive` | Master TOC의 공식 A01. 파일 내부에는 `lesson_id: d1-first-success`가 있다. |
| A02 | `02-project-file-structure.md` | (없음) | A02 AI가 만든 프로젝트에는 왜 이렇게 많은 파일이 생겼을까요? | `02-project-file-structure-practice.md`, `linked_static` | 파일 내부에는 `lesson_id: project-file-structure`가 있다. |
| A03 | `03-node-npm-package-json.md` | (없음) | A03 Node와 npm은 왜 설치하고 실행하는 걸까요? | `03-node-npm-package-json-practice.md`, `linked_static` | 파일 내부에는 `lesson_id: node-npm-package-json`가 있다. |
| A04 | `04-ai-llm-ide.md` | (없음) | A04 AI와 LLM, IDE와 AI IDE는 어떻게 다른가요? | route 내 3단계, `embedded_only` | Master TOC상 별도 Practice 자산 없음. |
| A05 | `05-terminal-commands.md` | (없음) | A05 터미널에 치는 글자는 왜 필요할까요? | route 내 Sample 명령, `embedded_only` | 파일 순번 05를 B05로 해석하면 안 된다. Lesson에는 `lesson_id: terminal-commands`만 있다. |
| A06 | `06-errors-to-ai.md` | (없음) | A06 오류 메시지는 실패 증명서가 아니라 AI에게 줄 재료입니다 | route 내 오류 요청문, `embedded_only` | 파일 순번 06을 B06으로 해석하면 안 된다. Lesson에는 `lesson_id: errors-to-ai`만 있다. |
| B01 | `07-web-how-pages-appear.md` | B01 | B01 웹사이트는 어떻게 화면에 나타날까요? | `07-10-web-layers-practice.md`, `shared_asset` | 파일 순번 기반 임시 표기 B07과 공식 B01이 충돌한다. |
| B02 | `08-html-basics.md` | B02 | B02 HTML은 화면의 뼈대입니다 | `07-10-web-layers-practice.md`, `shared_asset` | 파일 순번 기반 임시 표기 B08과 공식 B02가 충돌한다. |
| B03 | `09-css-basics.md` | B03 | B03 CSS는 보이는 느낌을 바꿉니다 | `07-10-web-layers-practice.md`, `shared_asset` | 파일 순번 기반 임시 표기 B09와 공식 B03이 충돌한다. |
| B04 | `10-javascript-basics.md` | B04 | B04 JavaScript는 동작을 더합니다 | `07-10-web-layers-practice.md`, `shared_asset` | Practice 파일 제목과 섹션도 B01~B04로 정렬되어 있다. |
| B05 | `11-files-connect.md` | B05 | B05 파일이 서로 연결되는 방식 | `11-files-connect-practice.md`, route 요약 연결, `linked_static` | 05번 파일이지만 공식 ID는 B05가 맞다. 08·09 파일의 연결 참고도 이 노드를 가리킨다. |
| B06 | `12-frontend.md` | B06 | B06 Frontend란 무엇인가 | `12-frontend-practice.md`, route 요약 연결, `linked_static` | 파일 순번 12와 공식 B06이 일치한다. |
| B07 | `13-backend.md` | B07 | B07 Backend란 무엇인가 | `13-backend-practice.md`, route 요약 연결, `linked_static` | 파일 순번 13과 공식 B07이 일치한다. |
| B08 | `14-api.md` | B08 | B08 API란 무엇인가 | `14-api-practice.md`, route 요약 연결, `linked_static` | 파일 순번 14와 공식 B08이 일치한다. |
| B09 | `15-database.md` | B09 | B09 Database가 필요한 이유 | `15-database-practice.md`, route 요약 연결, `linked_static` | 파일 순번 15와 공식 B09가 일치한다. |

## 불일치 분석

### 발견된 불일치

1. 사용자 요청에서 Lesson 파일 순번 05~09를 `B05~B09`로 지칭했지만, Master TOC의 공식 매핑은 `05-terminal-commands.md → A05`, `06-errors-to-ai.md → A06`, `07-web-how-pages-appear.md → B01`, `08-html-basics.md → B02`, `09-css-basics.md → B03`이다.
2. `05-terminal-commands.md`와 `06-errors-to-ai.md`에는 `node_id`가 없고, `lesson_id`만 있다. 따라서 파일 내부 ID를 근거로 B05/B06이라고 확정할 수 없다.
3. `07~09` Lesson에는 각각 `node_id: B01/B02/B03`가 있어 Master TOC와 일치한다.
4. 공용 Practice `07-10-web-layers-practice.md`는 B01~B04 섹션으로 구성되어 있어, 파일 순번 07~10을 B07~B10으로 읽는 해석과 맞지 않는다.
5. Lesson 본문과 Practice 일부에는 B05, A06 같은 다음 노드 참조가 있다. 이 참조는 파일 순번이 아니라 공식 노드 ID로 읽어야 한다.

### 원인 분류

- `[PROJECT_RULE]` Master TOC는 학습 Track 기준의 공식 ID를 사용하지만, 일부 요청/검토 문맥은 파일 순번을 임시 ID처럼 사용했다.
- `[PROJECT_RULE]` 파일 순번과 Track 내 노드 순번은 서로 다른 축이다. Track A는 파일 01~06을 A01~A06으로, Track B는 파일 07~15를 B01~B09로 매핑한다.
- `[AGENT/AUTHORING]` A01~A06 파일에는 `node_id`가 일관되게 기록되어 있지 않고, B Track 파일에는 기록되어 있다. 이 차이가 파일만 읽을 때의 오해 가능성을 키운다.
- `[MIXED]` 07~10 공용 Practice의 공유 자산 구조는 여러 Lesson과 연결되므로, Practice 파일 번호를 노드 ID로 사용하면 안 된다.

## 권장 해결 방안

### 최우선

1. Master TOC를 공식 ID의 단일 기준으로 확정한다. 이후 문서·리뷰·Practice 참조에서는 `05~09 파일 순번`과 `A05/A06/B01~B03 공식 ID`를 함께 쓰지 말고 공식 ID를 우선한다.
2. 사용자 요청 또는 검토 문서에서 파일 순번을 설명해야 할 때는 `파일 05 = 공식 A05`, `파일 07 = 공식 B01`처럼 명시해 별칭과 공식 ID를 분리한다.
3. 이번 매핑표를 후속 문서 검토의 기준표로 사용한다. 본 보고서에서는 원본 Lesson, Practice, Master TOC를 수정하지 않는다.

### 다음

1. 별도 콘텐츠 변경 승인을 받은 뒤 A01~A06에도 `node_id`를 추가할지 결정한다. 추가한다면 Master TOC와 동일한 공식 ID만 사용해야 한다.
2. ID 표준화 이후 Lesson, Practice, route, Quiz/Outcome의 표시명을 공식 ID 포함 형식으로 대조한다. 실제 학생 화면과 route 동작은 별도 검증 범위로 남긴다.
3. 후속 Practice 보강 시 `07-10`을 파일 묶음명으로 유지하되, 내부 섹션과 연결 메타데이터는 B01~B04처럼 노드 ID를 사용한다.

## Gate 준수

- [확인 사실] 이 보고서는 Master TOC와 Lesson/Practice 문서의 ID·경로·연결 상태를 분석하고 매핑표를 정리하는 문서 작업만 수행했다.
- [확인 사실] 소스 코드, Lesson 본문, Practice 파일, P0 콘텐츠는 수정하지 않았다.
- [확인 사실] `APPROVE_CONTENT_PM_DOCS` Gate 범위 내에서 지정된 보고서 파일만 생성했다.
- [확인 사실] lint/typecheck/build는 작업 범위에서 제외했으며 실행하지 않았다.

## 사실·판단·검증 상태

- **확인된 사실:** Master TOC의 Track A 공식 ID는 A01~A06, Track B 공식 ID는 B01~B09이다. Master TOC 링크, Lesson front matter의 `lesson_id`/`node_id`, Practice 파일명·섹션을 직접 대조했다.
- **확인된 사실:** 파일 05~09의 공식 매핑은 A05, A06, B01, B02, B03이다.
- **판단:** 파일 순번과 공식 노드 ID를 별도로 표기하고 Master TOC를 단일 기준으로 유지하는 것이 혼동을 줄이는 권장 방안이다.
- **검증하지 않은 것:** 실제 학생 화면의 표시명, route의 런타임 동작, 정적 빌드 결과, 학생 사용성은 이번 문서 검토에서 검증하지 않았다.

