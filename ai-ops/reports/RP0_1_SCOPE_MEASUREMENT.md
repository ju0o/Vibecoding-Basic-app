# RP0-1 범위 실측 보고서

```yaml
document: RP0_1_SCOPE_MEASUREMENT
date: 2026-07-16
phase: RP0-1
mode: read_only_scope_measurement
status: COMPLETE_WITH_OPERATOR_DECISIONS_REQUIRED
track_d: paused
p0_implementation_started: false
git_commands_run: false
build_or_test_run: false
files_created: 1
files_modified: 0
```

> 이 보고서는 D1–D8 노드와 P0 13건의 범위만 실측한다. 8개 노드, P0 13건, Atlas 정본, STATE, 보호 경로는 수정하지 않았다. 이 보고서 작성은 P0 13건의 채택, 구현, 페이지 연결 또는 Track D 재개를 뜻하지 않는다.

## 1. 결론

1. **21개 Concept 보존: PASS.** D1–D8은 별도 `sample_draft` curriculum node이며 Atlas 21개 정본을 추가·삭제·재명명하지 않는다.
2. **14개 Section 보존: PASS, 직접 충족: N/A.** 14개 공통 섹션은 Atlas Concept Chapter 계약이다. D1–D8은 각각 10개 H2를 사용하는 Node Quality Gate형 문서이므로 별도 domain/supporting node로 유지할 때는 위반이 아니다. 반대로 이 8개 파일을 `/atlas/concepts/[conceptId]`의 정본 챕터로 직접 채택하면 **8건 모두 불일치**다.
3. **V2 8개 Domain 정렬: FIX REQUIRED.** D1–D5·D7–D8은 `V2_DOMAIN_OUTLINE.md`의 같은 번호 Domain과 명칭·범위가 다르다. D6은 도구·에이전트 축과 일부 정렬되지만 제품별 IDE 선택에 좁혀져 있어 부분 정렬이다.
4. **Domain 1 명칭: 운영자 결정 필요.** 상위 개요는 `문제 발견과 AI 제품 사고`, D1 샘플은 `AI Basics`다.
5. **P0 13건: 전부 `P0_PARTIAL_UNVERIFIED`.** 승인 baseline이 아니며 역사적 owner는 모두 `unknown_owner`다. 다음 승인은 개별 disposition, 향후 책임자, 정확한 page wiring 범위, a11y 런타임 QA와 독립 리뷰를 함께 명시해야 한다.

## 2. 측정 기준과 경계

### 2.1 읽은 기준

- `AGENTS.md` §1: Education First, solo capability, Website Last, 필수 완성 사슬
- `AGENTS.md` §5: Phase 1 보호 경로와 frozen 경로
- `ai-ops/STATE.md`: `READY_FOR_CODEX_RP0_SCOPE_REVIEW`, P0 13건 미채택, Track D paused
- `ai-ops/roadmap/ATLAS-EDUCATION-LAYER.md` §4.2, §4.4: 21개 정본 Concept와 14개 Chapter Section
- `content/curriculum/V2_DOMAIN_OUTLINE.md`: 승인 전 후보인 8개 Domain 상위 개요
- `content/curriculum/nodes/D1-llm-basics.md` … `D8-timeline.md`: 8개 샘플 노드 전체
- `ai-ops/reports/P0-REMEDIATION-HANDOFF.md`, `P0-REMEDIATION-CONTEXT-PACKAGE.md`
- `ai-ops/contracts/NODE_QUALITY_GATE.md`, `ai-ops/roadmap/ANIMATION_DESIGN_SYSTEM.md`

### 2.2 적용한 Atlas 정본

21개 Concept:

```text
AI → Machine Learning → Deep Learning → Generative AI → LLM
→ Prompt Engineering → Context Engineering → Memory → Knowledge
→ Embedding → RAG → Tool Calling → MCP → Skill → Agent → SubAgent
→ Workflow → Orchestration → Evaluation → Harness → Production AI
```

14개 Section:

```text
한 줄 정의 / 왜 등장했는가 / 이전 기술의 한계 / 무엇을 해결했는가
/ 실제 사례 / 대표 기업 / 대표 서비스 / 실제 프로젝트에서는 어떻게 사용하는가
/ 인터랙티브 애니메이션 / 인터랙티브 다이어그램 / 실습 / 퀴즈
/ 관련 기술 / 다음 기술
```

### 2.3 판정 규칙

- `domain_node`, `tools_tech`, `timeline`은 21개 Concept를 참조할 수 있으나 새 정본 Concept가 아니다.
- 14개 Section은 `concept_chapter`에만 강제한다.
- 보조 용어·제품명은 교육 예시로 사용할 수 있지만 canonical `conceptId`로 승격할 수 없다.
- 8개 node를 21개 Concept 전체의 대체물로 간주하지 않는다.

## 3. D1–D8 계약 정합 실측

| 노드 | 21개 정본 연결 | V2 Domain 정렬 | 불일치·채택 조건 |
|---|---|---|---|
| D1 `llm-basics` | `LLM`, `Embedding` 직접 연결 | **불일치** | `Transformer`, `Token`은 보조 개념이다. 상위 D1은 문제 발견, 샘플 D1은 AI 기초다. |
| D2 `vibe-coding` | `Prompt Engineering`, `Context Engineering`, `Workflow`에 매핑 가능 | **불일치** | 상위 D2는 웹·소프트웨어 구조와 데이터 흐름이다. `Prompt`, `Context` 축약어에는 canonical ID 매핑이 필요하고 `Vibe Coding`을 새 Concept로 만들 수 없다. |
| D3 `ai-agent` | `Agent`, `SubAgent`, 일부 `Workflow` | **불일치** | 상위 D3는 프롬프트·컨텍스트 협업이다. `Planner`, `Reviewer`, `Multi-Agent`는 보조 역할이며 정본 승격 금지다. |
| D4 `dev-ecosystem` | `Tool Calling`, `MCP` | **불일치** | 상위 D4는 모델 이해와 라우팅이다. `API`, `SDK`, `Host`, `Resource`는 보조 용어다. D3→D4 순서는 Atlas 정본의 `Tool Calling → MCP → Skill → Agent` 순서와도 다르므로 Atlas Journey로 재사용할 수 없다. |
| D5 `orchestration` | `Memory`, `Workflow`, `Orchestration`, `Harness` | **불일치** | 상위 D5는 데이터·지식·RAG이며 Orchestration은 상위 D6에 있다. `Scheduler`는 보조 개념이다. 여러 Arc를 잇는 cross-cut node이지 단일 Concept Chapter가 아니다. |
| D6 `ide-tools` | Context·Agent·Workflow의 작업 표면 예시 | **부분 정렬** | 상위 D6의 도구 사용·에이전트·자동화 중 “도구 선택”만 구체화한다. Cursor/Claude Code/Codex/Windsurf는 정본 Concept가 아니며 `tools_tech` 또는 domain practice로만 적합하다. |
| D7 `deploy-infra` | `Production AI`의 배포·운영 지원 사례 | **불일치** | 상위 D7은 평가·안전·신뢰성이다. 제품명과 Hosting/Container/DB/Auth는 보조 기술이며 `Production AI` canonical ID 연결이 명시되어 있지 않다. |
| D8 `timeline` | 21개 흐름을 시간축에서 회고하는 Experience Layer | **불일치** | 상위 D8은 출시·관찰·지속 개선이다. Timeline은 Concept Chapter가 아니며 별도 timeline page가 적합하다. |

### 3.1 누락과 범위 초과

- 8개 노드는 21개 전체를 대체하거나 완전하게 커버하지 않는다.
- 주 개념으로 명확히 다루지 않는 정본 항목에는 `Machine Learning`, `Deep Learning`, `Generative AI`, `Knowledge`, `RAG`, `Skill`, `Evaluation`, 명시적 `Production AI`가 있다.
- 21개 밖이지만 보조 용어로 허용 가능한 항목에는 `Transformer`, `Token`, `Planner`, `Reviewer`, `Multi-Agent`, `API`, `SDK`, `Scheduler`, IDE·배포 제품명이 있다.
- Model Routing은 정본 Concept 추가 항목이 아니라 `Orchestration → Evaluation → Harness`를 가로지르는 하위 Learning Route로 유지해야 한다. D1–D8 어디에도 새 Concept로 승격하면 안 된다.

### 3.2 14개 Section 조건부 판정

D1–D8은 공통으로 다음 10개 H2를 사용한다.

```text
Student Question / Why Now / Outcomes와 완료 증거 / 개념 지도 / Bridges
/ 3-step Practice / Quiz와 teach-back / 출처 범위 / Interactive 범위
/ Node Quality Gate
```

이는 curriculum node에는 적합하지만 Atlas 14-section chapter와는 다른 스키마다.

- `domain_node | tools_tech | timeline`으로 채택: **PASS WITH PRECONDITIONS**
- `concept_chapter`로 직접 채택: **BLOCK — 8건 모두 14-section 불일치**
- 빈 14개 섹션 페이지를 만들어 형식만 맞추는 방식: **금지 — Website Last 및 empty placeholder 금지와 충돌**

## 4. Domain 1 명칭 운영자 결정 항목

### 사실

- 상위 개요: `Domain 1. 문제 발견과 AI 제품 사고`
- D1 frontmatter: `Domain 1 — AI Basics (운영자 지정 샘플 범위)`
- D1 마지막 문단도 이 차이를 명시하고 상위 정렬을 운영자 결정으로 남긴다.

### 선택지

| 선택 | 의미 | 영향 |
|---|---|---|
| A. 상위 D1 유지, AI Basics 재배치 **(권고)** | 문제 발견-first 흐름을 유지하고 D1 LLM 기초를 하위 node, 선행 지식 또는 Atlas Reference로 둔다. | 21/14와 상위 V2 개요를 건드리지 않는다. page type·위치만 별도 승인 필요. |
| B. 상위 D1을 AI Basics로 변경 | D1 샘플을 상위 Domain으로 승격한다. | curriculum 권한·질문·Outcome 변경이므로 별도 Human Approval 필요. 이번 RP0-1 범위 밖. |
| C. 두 축 병합 | 문제 발견과 AI 작동 원리를 하나의 Domain으로 재설계한다. | 범위 팽창과 theory-first 위험이 있어 새 후보 비교와 운영자 PICK 필요. |

**운영자 결정 요청:** A/B/C 중 하나를 선택하되, 이번 측정은 어떤 선택도 자동 적용하지 않는다.

> D1만의 문제가 아니다. D2–D8도 각 파일 마지막에서 상위 `V2_DOMAIN_OUTLINE.md`와 샘플 범위 차이를 명시한다. 다음 wiring 승인에는 8개 전체 배치표가 필요하다.

## 5. P0 13건 실측

### 5.1 구성과 현재 상태

| # | 파일 | 역할 | 현재 실측 | 채택 전 필수 확인 |
|---:|---|---|---|---|
| 1 | `content/practice/vibe-coding-foundation/11-files-connect-practice.md` | B05 Practice | 6필드 존재 | lesson·page와 행동/증거 정합, 독립 검토 |
| 2 | `content/practice/vibe-coding-foundation/12-frontend-practice.md` | B06 Practice | 6필드 존재 | 동일 |
| 3 | `content/practice/vibe-coding-foundation/13-backend-practice.md` | B07 Practice | 6필드 존재 | 동일 |
| 4 | `content/practice/vibe-coding-foundation/14-api-practice.md` | B08 Practice | 6필드 존재 | 동일 |
| 5 | `content/practice/vibe-coding-foundation/15-database-practice.md` | B09 Practice | 6필드 존재 | 동일 |
| 6 | `content/practice/vibe-coding-foundation/16-good-ai-task-request-practice.md` | C01 Practice | 6필드 존재 | 동일 |
| 7 | `content/practice/vibe-coding-foundation/17-prompt-engineering-practice.md` | C02 Practice | 6필드 + educational label | label·lesson·page 정합, 독립 검토 |
| 8 | `content/practice/vibe-coding-foundation/18-context-engineering-practice.md` | C03 Practice | 6필드 + educational label | 동일 |
| 9 | `content/practice/vibe-coding-foundation/19-related-files-context-practice.md` | C04 Practice | 6필드 존재 | lesson·page와 행동/증거 정합, 독립 검토 |
| 10 | `src/features/learning-interactions/checkpoints/track-c-checkpoints.ts` | C05–C10 Quiz/Outcome data | 데이터 존재, 6개 page 미연결 | node별 4수준 Outcome 충족 방식, 이유·teach-back·완료 증거, page wiring |
| 11 | `src/features/learning-interactions/core/usePrefersReducedMotion.ts` | 공유 reduced-motion hook | `matchMedia` 구독 정적 확인 | runtime preference 변경·cleanup·hydration QA |
| 12 | `src/features/learning-interactions/file-connect/FileConnectExperience.tsx` | B05 interaction 소비자 | hook 전달 + `ariaLive` 정적 확인 | keyboard·focus·live region·reset/recovery·mobile QA |
| 13 | `src/features/learning-interactions/web-layers/WebLayersExperience.tsx` | B01–B04 interaction 소비자 | hook 전달 + `ariaLive` 정적 확인 | 동일 |

공통 분류:

```text
adoption_status: not_adopted
verification_status: P0_PARTIAL_UNVERIFIED
historical_owner: unknown_owner
track_d_effect: none; remains paused
```

### 5.2 Page wiring 실측

- 9개 Practice 문서는 6필드 본문이 존재하지만 해당 9개 page는 현재 더 짧은 inline 실습 목록을 렌더링한다. 상세 Practice 문서가 page에 직접 연결됐다는 증거는 없다.
- B05 `FileConnectExperience`는 `files-connect/page.tsx`에 연결되어 있다. 이는 **interaction 연결**이며 B05 Practice 문서 채택·연결과는 별개다.
- `WebLayersExperience`는 B01–B04 page에서 사용된다. 이는 a11y 변경 후보의 소비 경로다.
- C05–C10 질문/Outcome export는 `track-c-checkpoints.ts`에 있으나 아래 6개 page는 `NodeCheckpoint`와 해당 데이터를 import/render하지 않는다.

```text
task-breakdown / fix-loop / qa-basics / ai-agent / subagent / workflow
```

- 현재 C05–C10 Outcome 배열은 노드마다 Observed/Assisted/Independent/Explainable 네 수준을 모두 포함하지 않는다. 다음 승인 전에 “각 node가 네 수준을 모두 가져야 하는지, lesson/별도 증거와 합쳐 충족할지”를 Curriculum Architect가 명시해야 한다.

### 5.3 a11y 정적 실측과 미검증 영역

정적으로 확인한 것:

- 공유 hook이 `(prefers-reduced-motion: reduce)`를 구독한다.
- `FileConnectExperience`, `WebLayersExperience`가 결과를 `BrowserPreview`에 전달한다.
- 두 interaction이 `AnimationShell`의 `ariaLive` 값을 제공한다.
- `src/features/learning-interactions/**`에서 literal `reducedMotion={false}`는 현재 검색되지 않았다.

아직 확인하지 않은 것:

- reduce / no-preference 양쪽 실제 동작과 런타임 preference 변경
- 전체 키보드 진행, 논리적 tab order, visible focus
- 상태 변경·reset·retry·error 뒤 focus 유지 또는 복원
- `aria-live`가 과다 반복·누락 없이 읽히는지
- 모션을 줄여도 학습 피드백이 유지되는지
- reset/retry/error/recovery와 mobile/responsive 동작
- hydration/static export 회귀

따라서 a11y 판정은 **STATIC CANDIDATE ONLY — RUNTIME QA REQUIRED**다.

## 6. 다음 운영자 승인 전제조건

다음 승인은 아래 항목을 모두 명시해야 한다. 저장소에 RP0-1 이후의 canonical 승인 토큰 이름은 정의되어 있지 않으므로 이 보고서가 새 토큰을 확정하지 않는다.

### 6.1 P0 13건 disposition

각 파일에 하나씩 결정:

```text
adopt_as_candidate | reject_and_preserve | quarantine_for_rewrite
```

- 일괄 채택 금지.
- `reject_and_preserve`도 삭제·restore 권한이 아니다. 별도 승인 전 현 상태를 보존한다.
- `adopt_as_candidate`는 검토 후보 채택이며 P0 COMPLETE 또는 Website COMPLETE가 아니다.

### 6.2 Owner 두 층 분리

- `historical_owner: unknown_owner`는 사실 기록으로 유지한다.
- `future_accountable_role`을 별도로 지정한다.

권고 책임 흐름:

| 범위 | 향후 책임 흐름 |
|---|---|
| Practice 9건 | Curriculum Architect → Content Writer → Practice/Mechanical QA → Independent Reviewer |
| C05–C10 Quiz/Outcome | Curriculum Architect → Implementer → Mechanical QA → Independent Reviewer |
| a11y 3건 | Interaction/A11y review → Implementer → keyboard/runtime QA → Independent Reviewer |
| STATE/Matrix/Studio honesty | Main Orchestrator 단일 writer |

Implementer와 Independent Reviewer는 동일 task unit에서 분리한다.

### 6.3 정확한 future write allowlist

승인문에는 최소한 다음을 exact path로 열거해야 한다.

- 채택할 Practice 파일의 정확한 9개 경로
- `track-c-checkpoints.ts`와 C05–C10의 정확한 6개 page 경로
- 채택할 a11y 3개 경로
- 공유 `NodeCheckpoint.tsx`, `AnimationShell.tsx`는 필요성 증명과 별도 명시가 없으면 read-only

계속 금지:

- Track D, 새 route, Phase 1 보호 경로, frozen KB/lesson 경로
- 무거운 dependency, external paid model API, deploy
- reset/clean/rebase/push 등 금지된 git 작업

### 6.4 Page wiring 승인 내용

- 9개 상세 Practice의 SSOT와 page 표현 방식을 결정한다: 직접 렌더링, 안전한 loader, 또는 명시적 링크 중 하나.
- C05–C10 각 page에 node별 QUESTIONS/OUTCOMES와 `teachBackPrompt`를 `NodeCheckpoint`로 연결할지 승인한다.
- 이유, 오개념, 네 Outcome 수준, teach-back, 완료 증거가 Node Quality Gate를 어떻게 충족하는지 명시한다.
- 기존 inline 실습/Outcome과 새 데이터가 중복 SSOT가 되지 않도록 source-of-truth를 한 곳으로 정한다.

### 6.5 a11y QA 승인 내용

채택 후 QA는 최소 다음을 포함해야 한다.

1. 관련 typecheck/unit/static-export 검증
2. reduced/no-preference 런타임과 preference 변경·cleanup
3. keyboard-only 전체 진행과 논리적 tab order
4. visible focus 및 reset/retry/error 후 focus 복원
5. `aria-live` 변경의 적시성·중복·누락
6. reset/retry/error/recovery 완료 가능성
7. mobile/responsive와 text alternative
8. literal `reducedMotion={false}` 회귀 검색
9. Implementer와 분리된 독립 검토

이번 RP0-1에서는 코드 실행·브라우저·build가 금지되었으므로 위 QA를 수행하지 않았다.

### 6.6 상태 및 완료 주장

- Track D는 RP0-11 재판정 전까지 paused.
- P0 13건 채택만으로 P0 완료, Website 완료, next-node COMPLETE를 주장하지 않는다.
- Practice, Quiz, Sources, IR, relevant QA, Studio honesty를 모두 통과해야 한다.
- 다음 승인 후에도 STATE/Matrix 변경은 Main Orchestrator 단일 writer만 수행한다.

## 7. 위험

| 위험 | 수준 | 통제 |
|---|---|---|
| 8개 domain node를 21개 Concept chapter로 오인 | 높음 | page type과 canonical concept ID를 승인표에 고정 |
| D1만 고치고 D2–D8 번호·범위 차이를 방치 | 높음 | 8개 전체 배치표 승인 |
| 보조 용어·제품명을 정본 Concept로 승격 | 높음 | supporting topic 표시, registry 비변경 검사 |
| P0 13건 존재를 baseline 채택으로 오인 | 높음 | 파일별 disposition과 owner 분리 |
| checkpoint data 존재를 page 완료로 오인 | 높음 | 6개 page import/render 및 runtime 증거 요구 |
| reduced-motion 문자열 제거를 a11y PASS로 오인 | 중간 | keyboard/focus/live region/recovery 런타임 QA |
| inline 실습과 Practice 문서의 이중 SSOT | 중간 | wiring 방식과 SSOT 단일화 승인 |

## 8. 보호 자산·실행 확인

| 항목 | 결과 |
|---|---|
| Phase 1 보호 경로 수정 | 없음 |
| frozen lesson/KB/BUILD-PLAN 수정 | 없음 |
| 21개 Concept 변경 | 없음 |
| 14개 Section 변경 | 없음 |
| D1–D8 node 수정 | 없음 |
| P0 13건 수정 | 없음 |
| STATE/Handoff 수정 | 없음 |
| git 명령 | 미실행 |
| build/typecheck/test/browser | 미실행 |
| 새 파일 | 본 보고서 1개 |

## 9. 다음 결정

```text
RP0-1: COMPLETE
P0 adoption/implementation: NOT AUTHORIZED BY THIS REPORT
Track D: PAUSED
Decision: HUMAN_APPROVAL_REQUIRED
```

운영자에게 필요한 다음 결정 묶음:

1. D1 `문제 발견` 대 `AI 기초` 선택
2. D1–D8 각 파일의 `page_type`과 상위 Domain 배치
3. canonical concept ID 매핑표
4. P0 13건 개별 disposition
5. future accountable roles
6. exact write allowlist와 C05–C10 page wiring 범위
7. a11y runtime QA·독립 리뷰 요구

