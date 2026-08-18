# Master TOC — Foundation 25개 학습 노드 연결 인덱스

```yaml
document: master-toc
status: recovered_and_reviewed
scope: A01-C10_foundation_index
track_d: paused
lesson_bodies_modified: false
last_verified: 2026-08-09
```

## 1. 문서 역할

이 문서는 25개 레슨 본문을 다시 쓰는 목차가 아니다. 각 보존 본문이 학생 route에서 어느
Practice와 Quiz/Outcome으로 이어지는지 보여 주는 실측 인덱스다.

```text
보존 Lesson Body → Route → Practice → Quiz/teach-back → Outcome → Next
```

상위 기준은 `STUDENT_JOURNEY.md`, `LEARNING_OUTCOMES.md`, `NODE_QUALITY_GATE.md`다.
파일이 존재해도 학생 화면에서 쓸 수 없으면 `complete`로 표시하지 않는다.

## 2. 상태 범례

| 상태 | 뜻 |
|---|---|
| `interactive` | route에서 학생이 조작·제출·재시도할 수 있다. |
| `linked_static` | route에 정적 실습/Quiz·Outcome 안내가 연결되어 있다. |
| `embedded_only` | 별도 자산 없이 route 안에 짧은 안내만 있다. |
| `shared_asset` | 여러 노드가 하나의 Practice 묶음을 공유한다. |
| `data_unwired` | 체크포인트 데이터는 있으나 route에서 아직 사용하지 않는다. |
| `missing` | 현재 확인된 진입점이 없다. |

## 3. Track A — 첫 성공과 개발 환경 (A01–A06)

| ID | 보존 lesson | 학생 route | Practice 연결 | Quiz/Outcome 연결 |
|---|---|---|---|---|
| A01 | [01-first-success.md](../content/courses/vibe-coding-foundation/lessons/01-first-success.md) | `/learn/vibe-coding-foundation/day-1` | [01 practice](../content/practice/vibe-coding-foundation/01-first-success-practice.md) + Sample Project, `interactive` | `Day1QuizAndOutcomes`, `interactive` |
| A02 | [02-project-file-structure.md](../content/courses/vibe-coding-foundation/lessons/02-project-file-structure.md) | `/learn/vibe-coding-foundation/project-file-structure` | [02 practice](../content/practice/vibe-coding-foundation/02-project-file-structure-practice.md), `linked_static` | `ProjectFileStructureQuiz`, `interactive` |
| A03 | [03-node-npm-package-json.md](../content/courses/vibe-coding-foundation/lessons/03-node-npm-package-json.md) | `/learn/vibe-coding-foundation/node-npm-package-json` | [03 practice](../content/practice/vibe-coding-foundation/03-node-npm-package-json-practice.md), `linked_static` | `NodeNpmQuiz`, `interactive` |
| A04 | [04-ai-llm-ide.md](../content/courses/vibe-coding-foundation/lessons/04-ai-llm-ide.md) | `/learn/vibe-coding-foundation/ai-llm-ide` | route 내 3단계, `embedded_only` | Outcome 목록만 있음, `linked_static` |
| A05 | [05-terminal-commands.md](../content/courses/vibe-coding-foundation/lessons/05-terminal-commands.md) | `/learn/vibe-coding-foundation/terminal-commands` | route 내 Sample 명령, `embedded_only` | `missing` |
| A06 | [06-errors-to-ai.md](../content/courses/vibe-coding-foundation/lessons/06-errors-to-ai.md) | `/learn/vibe-coding-foundation/errors-to-ai` | route 내 오류 요청문, `embedded_only` | `missing` |

## 4. Track B — 웹 레이어와 데이터 흐름 (B01–B09)

| ID | 보존 lesson | 학생 route | Practice 연결 | Quiz/Outcome 연결 |
|---|---|---|---|---|
| B01 | [07-web-how-pages-appear.md](../content/courses/vibe-coding-foundation/lessons/07-web-how-pages-appear.md) | `/learn/vibe-coding-foundation/web-how-pages-appear` | [07–10 shared practice](../content/practice/vibe-coding-foundation/07-10-web-layers-practice.md), `shared_asset` | `NodeCheckpoint`, `interactive` |
| B02 | [08-html-basics.md](../content/courses/vibe-coding-foundation/lessons/08-html-basics.md) | `/learn/vibe-coding-foundation/html-basics` | 07–10 shared practice, `shared_asset` | `NodeCheckpoint`, `interactive` |
| B03 | [09-css-basics.md](../content/courses/vibe-coding-foundation/lessons/09-css-basics.md) | `/learn/vibe-coding-foundation/css-basics` | 07–10 shared practice, `shared_asset` | `NodeCheckpoint`, `interactive` |
| B04 | [10-javascript-basics.md](../content/courses/vibe-coding-foundation/lessons/10-javascript-basics.md) | `/learn/vibe-coding-foundation/javascript-basics` | 07–10 shared practice, `shared_asset` | `NodeCheckpoint`, `interactive` |
| B05 | [11-files-connect.md](../content/courses/vibe-coding-foundation/lessons/11-files-connect.md) | `/learn/vibe-coding-foundation/files-connect` | [11 practice](../content/practice/vibe-coding-foundation/11-files-connect-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |
| B06 | [12-frontend.md](../content/courses/vibe-coding-foundation/lessons/12-frontend.md) | `/learn/vibe-coding-foundation/frontend` | [12 practice](../content/practice/vibe-coding-foundation/12-frontend-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |
| B07 | [13-backend.md](../content/courses/vibe-coding-foundation/lessons/13-backend.md) | `/learn/vibe-coding-foundation/backend` | [13 practice](../content/practice/vibe-coding-foundation/13-backend-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |
| B08 | [14-api.md](../content/courses/vibe-coding-foundation/lessons/14-api.md) | `/learn/vibe-coding-foundation/api` | [14 practice](../content/practice/vibe-coding-foundation/14-api-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |
| B09 | [15-database.md](../content/courses/vibe-coding-foundation/lessons/15-database.md) | `/learn/vibe-coding-foundation/database` | [15 practice](../content/practice/vibe-coding-foundation/15-database-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |

## 5. Track C — AI 협업과 검증 (C01–C10)

| ID | 보존 lesson | 학생 route | Practice 연결 | Quiz/Outcome 연결 |
|---|---|---|---|---|
| C01 | [16-good-ai-task-request.md](../content/courses/vibe-coding-foundation/lessons/16-good-ai-task-request.md) | `/learn/vibe-coding-foundation/good-ai-task-request` | [16 practice](../content/practice/vibe-coding-foundation/16-good-ai-task-request-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |
| C02 | [17-prompt-engineering.md](../content/courses/vibe-coding-foundation/lessons/17-prompt-engineering.md) | `/learn/vibe-coding-foundation/prompt-engineering` | [17 practice](../content/practice/vibe-coding-foundation/17-prompt-engineering-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |
| C03 | [18-context-engineering.md](../content/courses/vibe-coding-foundation/lessons/18-context-engineering.md) | `/learn/vibe-coding-foundation/context-engineering` | [18 practice](../content/practice/vibe-coding-foundation/18-context-engineering-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |
| C04 | [19-related-files-context.md](../content/courses/vibe-coding-foundation/lessons/19-related-files-context.md) | `/learn/vibe-coding-foundation/related-files-context` | [19 practice](../content/practice/vibe-coding-foundation/19-related-files-context-practice.md), route는 요약 연결, `linked_static` | 정적 Quiz·Outcome, `linked_static` |
| C05 | [20-task-breakdown.md](../content/courses/vibe-coding-foundation/lessons/20-task-breakdown.md) | `/learn/vibe-coding-foundation/task-breakdown` | [20–25 shared practice](../content/practice/vibe-coding-foundation/20-25-track-c-practice.md), route는 짧은 안내, `shared_asset` | 정적 Outcome + checkpoint data `data_unwired` |
| C06 | [21-fix-loop.md](../content/courses/vibe-coding-foundation/lessons/21-fix-loop.md) | `/learn/vibe-coding-foundation/fix-loop` | 20–25 shared practice, `shared_asset` | 정적 Outcome + checkpoint data `data_unwired` |
| C07 | [22-qa-basics.md](../content/courses/vibe-coding-foundation/lessons/22-qa-basics.md) | `/learn/vibe-coding-foundation/qa-basics` | 20–25 shared practice, `shared_asset` | 정적 Outcome + checkpoint data `data_unwired` |
| C08 | [23-ai-agent.md](../content/courses/vibe-coding-foundation/lessons/23-ai-agent.md) | `/learn/vibe-coding-foundation/ai-agent` | 20–25 shared practice, route 진입점 `missing` | 정적 Outcome + checkpoint data `data_unwired` |
| C09 | [24-subagent.md](../content/courses/vibe-coding-foundation/lessons/24-subagent.md) | `/learn/vibe-coding-foundation/subagent` | 20–25 shared practice, route는 짧은 안내, `shared_asset` | 정적 Outcome + checkpoint data `data_unwired` |
| C10 | [25-workflow.md](../content/courses/vibe-coding-foundation/lessons/25-workflow.md) | `/learn/vibe-coding-foundation/workflow` | 20–25 shared practice, route는 짧은 안내, `shared_asset` | 정적 Outcome + checkpoint data `data_unwired` |

Checkpoint 데이터 위치: `src/features/learning-interactions/checkpoints/track-c-checkpoints.ts`.
현재 학생 route에 import되지 않았으므로 사용 가능하다고 표시하지 않는다.

### Practice/Quiz 품질 메모

- 별도 Practice 자산은 22/25 노드에 존재한다. A04–A06은 route 안의 짧은 실습만 있다.
- 2026-08-09 실측: B06–B09와 C01–C04의 8개 Practice 파일이 모두 존재하고, 각 TOC 연결 상태는 `linked_static`이다.
- A02 Practice는 현실적인 실패 예와 복구 절차가 부족하고, A03 Practice는 기대 결과와 완료
  증거가 명시되지 않아 여섯 필드 Gate 통과로 선언하지 않는다.
- B01–B04 공용 Practice, B05–C04 개별 Practice, C05–C10 공용 Practice는 여섯 필드 구조가
  확인됐지만, 독립 리뷰 전까지 노드 전체 `complete`를 뜻하지 않는다.
- 상호작용형 Quiz/Checkpoint는 7/25(A01–A03, B01–B04)다.
- A05–A06은 Quiz 진입점이 없고, A06에서 B01로 가는 직접 Next 링크도 없다.

## 6. Day 1 검증 기준

기준 route: `/learn/vibe-coding-foundation/day-1`

| 검사 | 기대 결과 |
|---|---|
| 정적 route/build | 페이지 모듈이 빌드되고 route가 생성된다. |
| 응답 | 실행 가능한 서버에서 HTTP 200을 반환한다. |
| Interactive | 선택/실행에 따라 파일 트리·터미널·미리보기 상태가 바뀐다. |
| Practice | `examples/day1-first-success`의 시작·행동·기대·복구를 찾을 수 있다. |
| Quiz/Outcome | Quiz와 required Outcome이 구분되고 재시도할 수 있다. |
| Next | 프로젝트 파일 구조 route와 `/learn`으로 이동할 수 있다. |

검증 결과는 명령과 함께 기록하며, 정적 존재 확인을 브라우저 상호작용 통과로 대신하지 않는다.

### 2026-07-17 읽기 전용 smoke 결과

결정: `PASS_WITH_BROWSER_CAVEAT`

| 검사 | 결과 | 근거 |
|---|---|---|
| route/조립 | PASS | page가 `Day1FirstSuccessExperience`, `Day1QuizAndOutcomes`를 조립한다. |
| 진입·다음·복귀 링크 | PASS | 기존 정적 산출물에서 canonical route, 다음 노드, `/learn` 링크를 확인했다. |
| anchor | PASS | `read`, `simulation`, `practice`, `quiz-outcomes`가 존재한다. |
| 핵심 테스트 | PASS | `npm test -- src/content/site-navigation.test.ts src/features/learning-interactions/day1-first-success/day1-state-machine.test.ts` → 2 files / 11 tests. |
| TypeScript | PASS | `npx tsc --noEmit --incremental false`. |
| lesson reference | PASS | `node scripts/atlas/check-lesson-refs.mjs` → missing 0. |
| 정적 HTTP | PASS | 기존 `out`을 임시 Python 정적 서버로 제공해 Day 1 HTML의 HTTP 200을 확인했다. 실행 로그는 별도 파일로 보존하지 않았다. |
| 브라우저 E2E | 미실행 | 클릭·키보드·상태 전이·reduced motion은 실제 브라우저로 검증하지 않았다. |

기존 `out` 응답과 현재 route 소스 존재를 각각 확인한 읽기 전용 smoke다. 동일 build의
identity/hash 정합은 검증하지 않았다. 새 build는 출력 파일을 만들 수 있어 이번 문서-only
경계에서 실행하지 않았다.

## 7. 보완 우선순위 — 문서 밖 구현은 별도 승인

1. A05–A06의 노드별 Quiz/teach-back 진입점
2. A04–A06의 여섯 필드 Practice 자산
3. B05–C04의 정적 Quiz를 node-specific Checkpoint로 강화
4. C05–C10 checkpoint data를 각 route에 연결하고 이유·teach-back·수준을 검증
5. 모든 route에서 Practice 자산 경로가 아니라 학생용 행동 링크/영역으로 보이게 연결

이 목록은 구현 승인이나 완료 선언이 아니다. 현재 작업에서는 lesson 본문과 P0 파일을 수정하지 않는다.

## 8. 관련 문서

- [DESIGN.md](../DESIGN.md) — 시각·학습 rail
- [TEAM_GLOSSARY.md](../TEAM_GLOSSARY.md) — 공통 용어
- [CONCEPTS.md](../CONCEPTS.md) — 학습 연결 원리
- [INTERFACE_SPEC.md](../INTERFACE_SPEC.md) — 화면·상태 계약
- [NODE_QUALITY_GATE.md](./contracts/NODE_QUALITY_GATE.md) — 완료 필수 조건
- [STUDENT_JOURNEY.md](./roadmap/STUDENT_JOURNEY.md) — 최상위 경험 경로
- [STAGE_COMPLETION_SPEC.md](./roadmap/STAGE_COMPLETION_SPEC.md) — 완료 판정

## 9. 후보·비공개 문서

- [V2_DOMAIN_OUTLINE.md](../content/curriculum/V2_DOMAIN_OUTLINE.md)와
  `content/curriculum/nodes/D1-*.md`–`D8-*.md`는 `sample_draft` 후보 자산이다.
- 위 D1–D8 문서 ID는 Foundation Day 1 또는 Track D 공개 노드 번호가 아니다.
- `website_status: not_started`이며 Track D 시작 승인이나 공개 목차 편입을 뜻하지 않는다.

## 10. 보존·운영 경계

- Atlas 21개 개념·14개 섹션 계약을 변경하지 않는다.
- `ATLAS-BUILD-PLAN.md`는 HOLD다.
- Track D는 PAUSE이며 이 목차에 활성 과정으로 추가하지 않는다.
- lesson 본문, P0 partial/unverified 파일, Phase 1 보호 경로는 별도 승인 없이 수정하지 않는다.
- push, deploy, reset, clean을 수행하지 않는다.
