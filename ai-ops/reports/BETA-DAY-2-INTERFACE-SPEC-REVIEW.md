# INTERFACE_SPEC.md Quality Review — Beta Day 2

## Summary
- 점수: 17/30
- Gate 적합성: FAIL
- 핵심 판단: 학습 화면의 핵심 흐름, Day 1 기준 화면, 접근성·복구 원칙은 갖췄지만, 개발 참조 문서로 사용하기 위한 owner/review metadata, 상위 SSOT 연결, 실제 구현 경로, 검증 체크리스트가 부족하다. 또한 완료 상태 용어가 TEAM_GLOSSARY의 Status Dictionary와 완전히 정렬되지 않는다.

## 구조 completeness: 5/10

- 문서에는 번호가 있는 10개 섹션과 정보 구조 개요가 있어 기본 탐색은 가능하다 (`INTERFACE_SPEC.md:13-31`, `33-120`). 다만 별도 목차(TOC)는 없다.
- YAML에는 `status`, `scope`, `implementation_proof`, 기준 route, `last_verified`가 있으나 owner, 변경 이력, 검토 주기 필드는 없다 (`INTERFACE_SPEC.md:3-11`). `last_verified`만으로는 다음 검토 시점과 책임 주체를 알 수 없다.
- 화면 계약 → Practice → Quiz/Checkpoint → 완료 상태 → Day 1 → 접근성 → 반응형·성능 → 연결 정본 → 변경 경계의 순서는 대체로 논리적이다 (`INTERFACE_SPEC.md:33-120`).
- 실제 연결 정본으로 `ai-ops/master-toc.md`만 링크한다 (`INTERFACE_SPEC.md:106-115`). 상위 SSOT인 `STUDENT_JOURNEY.md`, `CONTENT_PIPELINE.md`, `DESIGN.md`에 대한 직접 링크와 우선순위 설명이 없다.

## 내용 일관성: 7/10

- `Practice`, `Quiz`, `teach-back`, `Outcome`, `Interactive`, `linked_static`, `data_unwired` 등 핵심 표현은 TEAM_GLOSSARY와 대체로 일치한다 (`INTERFACE_SPEC.md:39-46`, `48-64`; `TEAM_GLOSSARY.md:26-71`, `105-115`).
- 완료 상태에는 `not_started`, `in_progress`, `outcomes_partial`, `ready_for_check`, `complete`, `needs_retry`, `blocked`, `skipped`가 제시된다 (`INTERFACE_SPEC.md:66-76`). 그러나 TEAM_GLOSSARY의 Status Dictionary에는 `present`, `linked_static`, `interactive`, `data_unwired`, `verified`, `complete`만 정리되어 있어 상태 종류와 계층(자산 연결 상태 vs 학습 진행 상태)이 분리되어 있지 않다 (`TEAM_GLOSSARY.md:105-115`).
- DESIGN의 학습 rail 순서와 `complete` 판정, `aria-live`, reduced motion, reset 원칙은 일치한다 (`DESIGN.md:197-213`, `235-241`; `INTERFACE_SPEC.md:58-76`, `91-97`). 다만 INTERFACE_SPEC은 `STAGE_COMPLETION_SPEC.md`를 언급하면서 직접 링크하지 않는다 (`INTERFACE_SPEC.md:66-69`).
- Day 1 기준 route와 Next route는 master TOC의 A01/A02 값과 일치한다 (`INTERFACE_SPEC.md:78-89`; `ai-ops/master-toc.md:38-40`). 반면 25개 전체 node_id/route를 문서 안에서 확인할 수 있는 표나 참조 anchor는 없다. 현재 정합성은 master TOC를 별도 조회해야 유지된다.

## 실용성: 5/10

- 학생 화면의 흐름과 실제 동작은 비교적 구체적이다. Practice의 시작·행동·기대 결과·실패·복구·완료 증거 6요소가 명시되고 (`INTERFACE_SPEC.md:48-56`), Day 1의 Experience/Practice/Quiz/Next 구성도 제시된다 (`INTERFACE_SPEC.md:78-89`).
- 학생에게 보여야 할 키보드 이동, `aria-live`, reduced motion, reset/undo, 모바일 rail, 성능 목표가 있어 UX 검토의 출발점은 된다 (`INTERFACE_SPEC.md:91-104`).
- 구현자가 바로 이동할 수 있는 컴포넌트별 `src/...` 경로가 없다. 유일한 경로 예시는 `examples/day1-first-success`이며 (`INTERFACE_SPEC.md:80-86`), component name도 구현 파일과 매핑되지 않는다.
- 검증 방법이 “별도 검증한다” 수준으로 남아 있고 (`INTERFACE_SPEC.md:88-89`), route/link/static output, 키보드·focus, 상태 전환, reduced motion, reset/retry를 재현하는 명령 또는 PASS/FAIL 체크리스트가 없다.
- `implementation_proof: false`라고 명시한 것은 정직하지만 (`INTERFACE_SPEC.md:3-10`), 실제 학생 화면에서 어느 상태가 구현되었고 어느 상태가 문서 계약인지 구분하는 검증 매트릭스가 없다.

## 발견 사항
- [ ] owner, 변경 이력, 검토 주기와 다음 검토일이 없다 (`INTERFACE_SPEC.md:3-11`).
- [ ] 상위 SSOT인 `STUDENT_JOURNEY.md`, `CONTENT_PIPELINE.md`, `DESIGN.md` 직접 링크가 없다 (`INTERFACE_SPEC.md:106-115`).
- [ ] 학습 진행 상태와 asset/connection 상태가 같은 상태 체계처럼 보이며, TEAM_GLOSSARY Status Dictionary와 범위가 맞지 않는다 (`INTERFACE_SPEC.md:66-76`; `TEAM_GLOSSARY.md:105-115`).
- [ ] `STAGE_COMPLETION_SPEC.md`가 링크 없이 언급된다 (`INTERFACE_SPEC.md:66-69`).
- [ ] 컴포넌트별 실제 구현 파일 경로와 담당 영역 매핑이 없다.
- [ ] 검증 명령, 테스트 대상, 기대 결과, PASS/FAIL 기준이 없다.
- [ ] 25개 node_id/route 정합성을 문서 자체에서 빠르게 확인할 수 있는 참조 표가 없다 (`INTERFACE_SPEC.md:106-114`; `ai-ops/master-toc.md:35-72`).

## 개선 제안
1. YAML metadata에 `owner`, `review_cycle`, `next_review`, `change_history`를 추가하고, 문서 하단에 변경 이력 표를 둔다.
2. 정보 구조 상단에 TOC를 추가하고 `STUDENT_JOURNEY.md`, `CONTENT_PIPELINE.md`, `DESIGN.md`, `STAGE_COMPLETION_SPEC.md`, `TEAM_GLOSSARY.md`, `ai-ops/master-toc.md`를 역할별로 링크한다.
3. 상태를 `학습 진행 상태`와 `자산/연결 상태`로 분리한다. TEAM_GLOSSARY의 Status Dictionary에 없는 상태는 제안 상태로 표시하고, 각 상태의 표시 조건·학생 문구·전이 조건을 표로 정의한다.
4. Day 1부터 전체 노드까지 `node_id → route → Practice → Quiz/Outcome → connection status`를 확인할 수 있도록 master TOC 참조 표 또는 링크 anchor를 추가한다.
5. 인터페이스 요소별 구현 파일 경로, 학생에게 보이는 동작, 키보드/스크린리더 동작, reset/retry 동작을 한 표에 매핑한다.
6. route smoke, 정적 output, 키보드 focus, `aria-live`, reduced motion, reset/retry를 대상으로 한 문서 전용 검증 체크리스트와 기대 결과를 추가한다.

## Gate Readiness
- 범위 준수: PASS
- 문서 품질 준비: FAIL

판정 근거: 이번 검토는 원본 `INTERFACE_SPEC.md`와 관련 문서의 읽기·분석 및 보고서 생성만 수행하는 범위를 지켰다. 그러나 17/30점이며, 개발 참조에 필요한 책임성 metadata, 상태 정합성, 구현 경로, 검증 기준이 보완되지 않아 품질 Gate 통과 준비 상태로 보기는 어렵다.

## Next Actions
1. 문서 owner와 검토 주기를 확정하고 metadata·변경 이력을 보완한다.
2. 상태 사전을 학습 진행 상태와 연결 상태로 재분류하고 TEAM_GLOSSARY와 정합성을 확인한다.
3. 구현 파일 매핑 및 검증 체크리스트를 추가한 뒤 동일한 3축 재검토를 수행한다.
