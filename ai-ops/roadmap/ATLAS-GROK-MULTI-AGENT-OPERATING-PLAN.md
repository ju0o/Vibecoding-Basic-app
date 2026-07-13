# Atlas V2 — Grok Multi-Agent Operating System Plan

| 항목 | 값 |
|---|---|
| 문서 상태 | **APPROVED — GO-1 운영자 승인 완료 (2026-07-13)** |
| 작성일 | 2026-07-13 |
| 승인일 | 2026-07-13 |
| 상위 SSOT | [ATLAS-EDUCATION-LAYER.md](ATLAS-EDUCATION-LAYER.md) (approved) — 본 문서는 대체하지 않음 |
| 관련 Feature Spec | [ATLAS-MODEL-ROUTING-FEATURE-SPEC.md](ATLAS-MODEL-ROUTING-FEATURE-SPEC.md) (MR-0 **approved**) |
| 본 문서 권한 | **Grok CLI 개발·조사 운영 정본.** 교육 정본과 충돌 시 교육 정본 우선 |
| implementation_status | GO-2+ 연속 실행 중 (Agent/Skill 도입). MR-1 구현은 GO-9 Controlled Pilot 한정 |
| 제품 방향 | Evolution, not Rebuild |

> **이번 단계 범위:** 운영 체계 **설계 문서만**.  
> **금지:** MR-1 구현, Simulator, 콘텐츠 작성, KB 본문 변경, Phase 1 수정, Build Plan 활성화, commit/push/배포, 전체 Agent·Skill 파일 일괄 생성.

---

# 1. 현재 Agent·Workflow 구조 분석

## 1.1 저장소 실측 (2026-07-13)

| 항목 | 결과 |
|---|---|
| 프로젝트 루트 | `D:\Ai_Vibe_Coding_Master` (작업 트리 `ai_vibe_coding_master`) |
| 루트 `AGENTS.md` | **없음** |
| 프로젝트 `.grok/` | **없음** |
| 프로젝트 `.claude/` | 존재 (`settings.local.json`만). Claude skills/agents 체계 없음 |
| 글로벌 Grok | `~/.grok/` — skills(check-work, review, design 등), docs, config |
| 글로벌 Grok SubAgent 타입 | built-in: `general-purpose`, `explore`, `plan` (+ implementer/reviewer 등 역할) |
| AI-Ops Agents | `ai-ops/agents/` 13 역할 + `_TEMPLATE.md` |
| AI-Ops Skills | `ai-ops/skills/SK-01` ~ `SK-08` (콘텐츠 도메인 스킬 문서) |
| AI-Ops Workflows | `WF-00` ~ `WF-06` |
| AI-Ops Executors | Codex / Cline / Fable 3-Executor (`executors/EXECUTORS.md`) |
| AI-Ops Prompts | RUN-CODEX-PRODUCE/VERIFY, RUN-CLINE, RUN-FABLE + P-01~P-09 모듈 |
| KB 파이프라인 | P-01 수집 → P-02 Score → (P-03) → approved → P-04 Lesson → P-05 통합 |
| QA / verify | `npm run verify` = lint + typecheck + test + build; Cline P-06 판정 전용 |
| STATE / SSOT | `STATE.md`, `ATLAS-EDUCATION-LAYER.md`, Feature Spec MR-0 **approved** |
| ATLAS-BUILD-PLAN | **HOLD** |
| 미커밋 Phase 1 | tracked 2 + untracked atlas 초안 다수 — **보존, 승인 구현 아님** |

## 1.2 기존 AI-Ops Agent 목록 (콘텐츠 생산 도메인)

| Agent 문서 | 계층(템플릿) | 주 역할 |
|---|---|---|
| research-agent | Planning | 근거 수집 브리프 |
| source-collector-agent | Production | KB draft 수집 |
| fact-check-agent | Verification | 사실 대조 |
| education-review-agent | Verification | 교육 적합성 |
| lesson-writer-agent | Production | 강의 초안 |
| quiz-agent | Production | 퀴즈 |
| terminology-agent | Production | 용어 |
| illustration-agent | Production | 다이어그램 |
| qa-agent | Verification | QA 체크 |
| site-integration-agent | Production | 사이트 반영 |
| release-agent | Release | 릴리스 |
| curriculum-agent | Planning | 커리큘럼 |
| final-editorial-agent | Executive | 최종 편집 |

## 1.3 기존 Workflow·Prompt 축

```text
O-01 Curriculum (Fable)
  → P-01 KB 수집 (Codex)
  → P-02 검증 (Codex, 원문 재접속)
  → P-03 재수집 (loop)
  → P-04 Lesson (Codex)
  → P-05 Site integration (Codex, 순차 전용)
  → P-06 Verify (Cline, 수정 금지)
  → P-07 Fix (Codex) / P-08 Release (Cline)
  → P-09 Deploy (운영자 승인 후)
  → O-02 Editorial (Fable)
```

핵심 안전장치(유지 대상):

1. **수정자 ≠ 판정자** (Codex 수정 / Cline 판정)
2. Knowledge Score 80+ 및 원문 URL 재접속 대조
3. STATE NEXT_ACTION 의무 종결
4. 배포·에스컬레이션은 사람 게이트

## 1.4 기존 Script·기계 검증 자산

| 자산 | 용도 | Script First 후보 |
|---|---|---|
| `npm run lint` / `typecheck` / `test` / `build` / `verify` | 코드·빌드 게이트 | 예 |
| `npm run doctor` | React doctor | 예 |
| `scripts/scan-citations.mjs` 등 | 인용·사이트맵 | 예 |
| 향후 `scripts/atlas-*.mjs` (미작성) | Concept 수, 14섹션, frontmatter, 링크 | **도입 예정** |

## 1.5 글로벌 Grok 자산 (프로젝트와 분리)

- User skills: `check-work`, `review`, `design`, `create-skill` 등 — **범용**
- Built-in subagent types: explore(read-only 성격), plan, general-purpose
- Project rules 메커니즘: 루트 `AGENTS.md` + `.grok/rules/` + `.grok/agents/` + `.grok/skills/`

**결론:** Atlas용 Multi-Agent OS는 **프로젝트 로컬 `.grok/` + `AGENTS.md`로 확장**하는 것이 맞고, 글로벌 설정을 덮어쓰지 않는다. AI-Ops 문서는 폐기하지 않고 **도메인 정책·파이프라인 SSOT**로 남긴다.

---

# 2. 기존 구조와 Grok CLI 역할의 차이

## 2.1 두 계층을 혼동하지 말 것

| 계층 | 이름 공간 | 정체 | 산출물 |
|---|---|---|---|
| **AI-Ops Domain Agent** | `ai-ops/agents/*-agent.md` | 콘텐츠 생산 **역할 정의서** (사람이 Executor에 붙여넣는 프롬프트 체계의 일부) | KB, Lesson, verification-report |
| **AI-Ops Executor** | Codex / Cline / Fable | 과거·병행 **실행 도구** 배정 | 실제 세션 실행 |
| **Grok CLI Main Agent** | 현재 세션 (Grok 4.5) | Atlas 작업의 **오케스트레이터** | 분해·통합·승인 요청 |
| **Grok CLI SubAgent** | `.grok/agents/` 또는 built-in type | 저장소 작업 분담 **실행자** | 탐색 요약, 초안, 패치, 리뷰 리포트 |
| **Grok Skill** | `.grok/skills/*/SKILL.md` | 반복 절차 패키지 | 호출 시 행동 계약 |
| **AI-Ops Skill** | `ai-ops/skills/SK-0x-*.md` | 교육 콘텐츠 품질 **도메인 규칙** | P-01~ 작성 시 준수 |

## 2.2 이름 충돌 방지 규칙

1. Grok SubAgent ID는 **`atlas-*` 접두사**를 쓴다.  
   예: `atlas-explorer`, `atlas-source-researcher` — `research-agent`와 구분.
2. AI-Ops Agent 문서 파일명은 변경하지 않는다.
3. 문서·보고에서 항상 계층을 표기한다:  
   `Grok/SubAgent:atlas-explorer` vs `AI-Ops/Agent:research-agent`.
4. “Executor”는 AI-Ops 3도구 배정에만 쓰고, Grok 쪽은 **Main / SubAgent / Script**로 부른다.

## 2.3 병행 모델 (Evolution)

```text
[운영자]
    │
    ▼
[Grok Main Orchestrator]  ← 세션 진입점 (본 계획의 중심)
    │
    ├─ Script First (결정적 검증)
    ├─ Grok SubAgents (탐색·조사·작성·구현·리뷰)
    │
    ▼  (콘텐츠 생산이 기존 파이프라인에 들어갈 때)
[AI-Ops STATE / P-01~P-09 / KB Score]
    │
    ▼
[사이트 src/content · Atlas src]
```

- 기존 100강·KB 파이프라인은 **유지**.
- Atlas V2·Model Routing 작업은 Grok Multi-Agent로 **우선 오케스트레이션**.
- 신규 사실 주장이 KB가 필요하면 Grok Researcher 결과가 **P-01 입력 후보**가 되고, 승인 사실은 여전히 P-02 게이트를 통과한다.

---

# 3. Main Agent 책임

Grok Main Orchestrator(이하 **Main**)만 직접 수행:

| 책임 | 설명 |
|---|---|
| Goal 유지 | 현재 Phase 목표 한 줄 + 비목표 |
| SSOT 확인 | Education Layer, Feature Spec, STATE, HOLD Build Plan, Phase 1 보호 |
| 작업 분해 | Task graph, 의존성, 병렬 가능 여부 |
| 위험도 판단 | 결정적 / 저위험 / 조사 / 제작 / 고위험 |
| 배정 | Script vs SubAgent vs Main-only |
| 충돌 해결 | 복수 SubAgent 결과 불일치 시 재조사 또는 운영자 에스컬레이션 |
| 통합 | 단일 운영자 보고로 합성 |
| 승인 요청 | 고위험·커밋·배포·SSOT 변경 |
| 출처 최종 구분 | verified fact vs educational pattern vs opinion |

### Main이 반복 직접 수행하지 않는 것

전체 저장소 반복 검색, frontmatter/링크/파일 수 검사, 빌드·테스트 로그 원문 소화, 출처 후보 목록 수집, 단순 초안 작성, 동일 패턴 다파일 수정.

Main은 **위임 지시문 + 결과 요약 검증**만 한다.

---

# 4. SubAgent 목록

| ID (제안) | 표시 이름 | 기본 모드 | 대응 기존 자산 |
|---|---|---|---|
| `atlas-orchestrator` | Atlas Orchestrator | Main 세션 정책 (AGENTS.md) | Fable O-01/O-02 감독 역할의 **Grok 측 대응** |
| `atlas-explorer` | Repository Explorer | read_only | Grok built-in `explore` 확장 |
| `atlas-source-researcher` | Official Source Researcher | read_only | AI-Ops research + SK-01/SK-04 규칙 참조 |
| `atlas-curriculum-architect` | Curriculum Architect | documentation_write (제한) | curriculum-agent, SK-03 |
| `atlas-content-writer` | Content Writer | content_write (승인 경로) | lesson-writer, SK-02 |
| `atlas-interaction-designer` | Interaction Designer | documentation_write → 이후 source 제한 | SK-07 + Feature Spec a11y |
| `atlas-implementer` | Implementation Worker | source_write (Phase 경로만) | site-integration / Codex 구현 구간 |
| `atlas-mechanical-qa` | Mechanical QA Worker | test_execution + read_only 보고 | Cline P-06 정신 + scripts |
| `atlas-independent-reviewer` | Independent Reviewer | read_only | Fable 감사 + Grok review skill 정합 |

### 도입 순서 제약

- GO-3까지: Orchestrator + Explorer + Mechanical QA(스크립트 호출)만.
- Writer / Implementer는 GO-5~6.
- **구현 Worker와 Independent Reviewer를 같은 작업 단위에서 동일 주체가 겸하지 않음.**

---

# 5. Agent별 권한

권한 등급:

```text
read_only | documentation_write | content_write | source_write
test_execution | git_read | git_write
```

| Agent | 권한 | 비고 |
|---|---|---|
| Main Orchestrator | 전 등급 **조건부** | git_write/commit/push는 운영자 승인 후에만; 배포 금지 |
| Repository Explorer | `read_only`, `git_read` | 코드 수정 금지 |
| Official Source Researcher | `read_only` + 웹/X 검색 | 저장소 쓰기 금지. 조사 보고 파일은 Main이 지정한 `ai-ops/reports/research/**`만 예외 허용 시 documentation_write |
| Curriculum Architect | `documentation_write` | `ai-ops/roadmap/**`, 설계 문서. Concept 수 변경 제안만 가능, 확정은 Human |
| Content Writer | `content_write` | 승인된 slug/path만. KB 본문·21 Concept 금지(별도 승인 없으면) |
| Interaction Designer | `documentation_write`; 이후 승인 시 제한 `source_write` | Simulator 명세·a11y 체크리스트 우선 |
| Implementation Worker | `source_write`, `test_execution`, `git_read` | 승인 Phase 파일 목록만. Phase 1 보호 경로 기본 제외 |
| Mechanical QA | `test_execution`, `read_only`, `git_read` | 수정 금지(판정만). 실패 시 수정은 Implementer |
| Independent Reviewer | `read_only`, `git_read` | 자기 구현 승인 금지 |

### 공통 금지 (모든 Agent)

- `git reset --hard`, `clean -fd`, force push, rebase onto main without approval
- 배포 (Firebase hosting 등)
- `ATLAS-BUILD-PLAN` HOLD 해제
- 미커밋 Phase 1 파일 무단 수정·삭제·커밋 혼합
- 21 Concept 추가/삭제, 14섹션 계약 변경 (Human Approval 전)
- 외부 유료 API 키를 교육 Simulator에 연결

---

# 6. Agent별 도구

Grok CLI 도구 기준 매핑(개념 계약; 실제 agent 파일은 GO-3+에서 고정).

| Agent | 허용 도구 | 금지 도구 |
|---|---|---|
| Main | 전 도구 + spawn_subagent, 단 고위험 전 confirm | 무단 commit/push |
| Explorer | read_file, list_dir, grep, glob성 shell(읽기), web 불필요 시 미사용 | search_replace, write, git write |
| Source Researcher | web_search, open_page, web_fetch, x_* (후보만), read_file(KB) | write to src/**, KB 본문 수정 |
| Curriculum Architect | read + 제한 write(roadmap) | src 구현, KB 본문 |
| Content Writer | read + write 지정 content 경로 | package.json 대규모 변경, progress 스키마 단독 변경 |
| Interaction Designer | read + design docs write; 이후 제한 TSX | graph/motion 라이브러리 추가 제안 구현 |
| Implementer | read/write 승인 경로, shell test | 범위 밖 리팩토링, Phase1 보호 경로 |
| Mechanical QA | shell: npm run lint/typecheck/test/build/verify, 전용 scripts | search_replace로 “고쳐 통과” |
| Independent Reviewer | read, grep, shell 읽기/테스트, diff | 기능 코드 수정(필요 시 수정 제안만 보고) |

X 도구: Researcher만 기본 허용. 결과 분류 의무(§12).

---

# 7. Agent별 입력과 출력

## 7.1 공통 입력 봉투 (Main → SubAgent)

```yaml
task_id: "ATLAS-GO3-001"
goal: "한 줄 목표"
ssot:
  - ai-ops/roadmap/ATLAS-EDUCATION-LAYER.md
  - ai-ops/roadmap/ATLAS-MODEL-ROUTING-FEATURE-SPEC.md
  - ai-ops/STATE.md
constraints:
  - no_mr1_implementation
  - preserve_phase1_uncommitted
  - no_commit
  - concepts_21_frozen
  - sections_14_frozen
allowed_paths: []
forbidden_paths:
  - src/app/atlas/**          # Phase1 보호 예시(정책에 따라 갱신)
  - src/content/atlas/**
  - ai-ops/knowledge-base/entries/**
risk_class: explore | research | produce | high_risk
done_when:
  - "체크 가능한 완료 조건"
return_format: "§14 요약 스키마"
```

## 7.2 Agent별 입출력

| Agent | 입력 | 출력 (파일 또는 구조화 요약) |
|---|---|---|
| Explorer | 질문, 키워드, 경로 힌트 | `paths[]`, `symbols[]`, `impact_surface`, `open_questions` |
| Source Researcher | claim 목록, 주제, 기존 KB id | claim 표: text, sources[], status, checked_at, claimScope |
| Curriculum Architect | Feature Spec, 21 Concept, 기존 강의 맵 | Unit 순서, Why Bridge, 선수관계, 비변경 확인 |
| Content Writer | 승인 근거 묶음, Unit/섹션 템플릿 | draft md 경로, 미검증 문장 목록(분리) |
| Interaction Designer | a11y·Simulator 계약 | 인터랙션 명세, 컴포넌트 경계, 테스트 시나리오 |
| Implementer | 승인 명세 + 파일 목록 | diff 요약, 테스트 명령·결과, 범위 일탈 없음 선언 |
| Mechanical QA | 검사 스위트 이름 | PASS/FAIL 표, 로그 경로, 재현 명령 |
| Independent Reviewer | 요구사항 + diff + QA 결과 | findings(severity/major/minor), SSOT 위반, 승인 권고 |

---

# 8. Skill 목록

프로젝트 로컬 도입 예정 (`repo/.grok/skills/<name>/SKILL.md`). **지금은 생성하지 않음.**

| Skill ID | 목적 한 줄 |
|---|---|
| `atlas-repository-audit` | 구조·영향 범위·보호 경로 감사 |
| `atlas-source-research` | 공식 문서 우선 조사 절차 |
| `atlas-claim-verification` | 주장별 claimScope·출처 상태 판정 |
| `atlas-curriculum-design` | 21 Concept·하위 Route 정합 설계 |
| `atlas-content-authoring` | 승인 근거 기반 교육 문장 작성 |
| `atlas-interaction-design` | Simulator/Diagram/Quiz a11y·export 계약 |
| `atlas-implementation` | 승인 Phase 범위 내 코드 구현 |
| `atlas-content-qa` | 교육 콘텐츠 형식·라벨·인용 QA |
| `atlas-code-qa` | lint/type/test/build/정적 export QA |
| `atlas-release-audit` | 릴리스 전 범위·커밋·보호 경로 감사 |

기존 AI-Ops `SK-01`~`SK-08`은 **콘텐츠 품질 규칙 라이브러리**로 유지하고, Grok Skill 본문이 이를 **참조**한다(복제 최소화).

---

# 9. Skill 호출 조건 및 실행 계약

각 Skill 공통 필드(실제 SKILL.md 작성 시 필수):

- 목적 / 호출 조건 / 입력 / 출력  
- 읽을 SSOT / 허용·금지 도구 / 수정 가능·금지 경로  
- 완료 기준 / 실패 보고 / Main 반환 요약 형식  

### 9.1 atlas-repository-audit

| 필드 | 계약 |
|---|---|
| 호출 조건 | 새 Phase 시작, 영향 범위 불명, MR/Atlas 착수 전 |
| 입력 | 목표 Phase, 보호 경로 목록 |
| 출력 | 트리 맵, 관련 파일, 위험 접촉점 |
| SSOT | STATE, Education Layer, Feature Spec, impact report |
| 허용 도구 | read, grep, list, git status/diff read |
| 금지 | write, commit |
| 수정 경로 | 없음 |
| 완료 기준 | 보호 경로 상태 + 관련 경로 표 완성 |
| 실패 | 경로 접근 불능 시 blocked + 시도 목록 |
| 반환 요약 | `risk_touches[]`, `safe_to_edit[]`, `do_not_touch[]` |

### 9.2 atlas-source-research

| 필드 | 계약 |
|---|---|
| 호출 조건 | 새 사실 주장, Timeline 사건, 제품 기능 설명 필요 |
| 입력 | claims[], 기존 kbIds[] |
| 출력 | claim 검증표 + 공식 URL |
| SSOT | SOURCE-REGISTRY, CITATION-POLICY, KB entries |
| 허용 | web_*, open_page, x_*(후보), read KB |
| 금지 | src/KB 본문 write, 확정형 단정 |
| 완료 기준 | 모든 claim에 status 부여 |
| 반환 요약 | verified / candidate / community / unverified / opinion 집계 |

### 9.3 atlas-claim-verification

| 필드 | 계약 |
|---|---|
| 호출 조건 | Writer 초안 후, 또는 Researcher 결과 통합 시 |
| 입력 | 문장 목록 또는 draft 경로 |
| 출력 | 문장→claimScope→근거 매핑, 삭제/완화 권고 |
| 금지 | 근거 없이 approved로 승격 |
| 완료 기준 | educational_pattern vs product_documented 분리 |

### 9.4 atlas-curriculum-design

| 필드 | 계약 |
|---|---|
| 호출 조건 | Learning Route, Why Bridge, 선수 관계 설계 |
| 입력 | Feature Spec, 21 Concept 목록 |
| 출력 | Unit 그래프, 비변경 증명 |
| 수정 경로 | `ai-ops/roadmap/**` 설계 문서만 (승인 후) |
| 금지 | 22번째 Concept 추가를 기정사실화 |

### 9.5 atlas-content-authoring

| 필드 | 계약 |
|---|---|
| 호출 조건 | 근거 묶음 approved 또는 claimScope 명시 후 |
| 입력 | outline + evidence pack |
| 출력 | draft 경로, unknown 문장 분리 섹션 |
| 수정 경로 | 승인된 content path만 |
| 금지 | 새 사실 발명, 공식 등급 사칭 |

### 9.6 atlas-interaction-design

| 필드 | 계약 |
|---|---|
| 호출 조건 | Simulator, Diagram, Quiz UX |
| 입력 | Feature Spec §21–40, PRD Playground 원칙 |
| 출력 | island 경계, 키보드 경로, reduced-motion, 텍스트 표 |
| 금지 | 외부 API, drag-only, 신규 motion 라이브러리 |

### 9.7 atlas-implementation

| 필드 | 계약 |
|---|---|
| 호출 조건 | Phase 구현 승인 + 파일 목록 고정 후 |
| 입력 | 명세, allowed_paths, tests |
| 출력 | 변경 파일, 테스트 결과 |
| 금지 | 범위 밖 리팩토링, Phase1 혼합 커밋 |

### 9.8 atlas-content-qa

| 필드 | 계약 |
|---|---|
| 호출 조건 | 콘텐츠 draft 완료 후 |
| 입력 | draft paths |
| 출력 | 형식/라벨/인용/14섹션·Unit 계약 위반 목록 |
| 선호 | Script 결과 + 해석 |

### 9.9 atlas-code-qa

| 필드 | 계약 |
|---|---|
| 호출 조건 | 구현 후, 릴리스 전 |
| 입력 | 변경 범위 |
| 출력 | verify 단계별 PASS/FAIL |
| 금지 | 실패를 코드 수정으로 자체 해결(수정은 Implementer 재배정) |

### 9.10 atlas-release-audit

| 필드 | 계약 |
|---|---|
| 호출 조건 | 커밋/릴리스 직전 |
| 입력 | git status, 의도 파일 목록 |
| 출력 | 포함/제외 파일 판정, Phase1 혼입 여부 |
| 금지 | 무단 commit |

---

# 10. Task Routing Policy

| 위험 등급 | 예시 | 1순위 실행자 | 2순위 | Human |
|---|---|---|---|---|
| **결정적** | Concept 수, 14섹션, frontmatter, 링크, lint, typecheck, build, static export | **Script** | Mechanical QA가 스크립트 실행·요약 | 실패 3회 시 |
| **저위험 탐색** | 파일 찾기, KB 위치, 테스트 위치, 로그 요약 | **Explorer** | Main이 초단 질문만 | 아니오 |
| **조사** | 공식 문서, 발표일, 기능 지원 여부 | **Source Researcher** | claim-verification skill | 확정 콘텐츠 전 |
| **일반 제작** | 승인 콘텐츠, 소형 컴포넌트, Quiz | Writer / Interaction / Implementer | — | Phase 단위 승인 |
| **복잡·고위험** | 21 Concept 변경, 데이터 계약, Progress 마이그레이션, IA, Build Plan, Phase1 대규모 | **Main + Independent Reviewer** | — | **필수** |

### Model Routing 적용 예 (교육 주제와 운영 정책의 정렬)

Atlas 콘텐츠의 Model Routing Unit과 동일 논리로 작업을 라우팅한다:

```text
Task Classification → risk_class
Task Routing → Script | Explorer | Researcher | Producer | HighRisk lane
Executor Routing → 구체 SubAgent ID
Cost-Aware → 작은 컨텍스트 봉투, Script First
Independent Review → 구현과 분리된 Reviewer
Evaluation & Retry → Mechanical QA → 실패 시 재배정
Human Escalation → SSOT/커밋/배포/계약 변경
Observability → task_id, rule/skill id, 결과 요약 로그
```

---

# 11. Script First 정책

## 11.1 원칙

```text
규칙으로 검증 가능 → Script
문맥 판단 소량 → Worker SubAgent
설계·승인·충돌 → Main 또는 Independent Reviewer + Human
```

## 11.2 즉시 Script 대상 (우선 구현 백로그, 코드는 아직 작성하지 않음)

| Script 후보 | 검사 내용 |
|---|---|
| `scripts/atlas-count-concepts.mjs` | 정본 21개 일치 |
| `scripts/atlas-check-sections.mjs` | 챕터 14 헤딩·순서 |
| `scripts/atlas-check-frontmatter.mjs` | 필수 필드 |
| `scripts/atlas-check-links.mjs` | 내부 링크·slug 실존 |
| `scripts/atlas-check-route-units.mjs` | Model Routing 9 Unit id |
| `scripts/atlas-protect-phase1.mjs` | 보호 경로 diff 혼입 경고 |
| 기존 `npm run verify` | lint/type/test/build |

## 11.3 SubAgent가 Script를 대체하면 안 되는 경우

- “대략 맞아 보인다”는 주관 판정
- 동일 검사를 세션마다 토큰으로 재수행

Mechanical QA의 본업은 **스크립트 실행 + 구조화 보고**이지, 손으로 파일 수 세기 재현이 아니다.

---

# 12. X 검색 및 공식 출처 검증 정책

## 12.1 우선순위

```text
1. 기존 approved KB + Quote Bank
2. 공식 문서·사양·엔지니어링 블로그 (SOURCE-REGISTRY 1순위)
3. 공식 발표 (제품 블로그·docs changelog)
4. X / 커뮤니티 → 후보·키워드·감만
5. 추측 → 금지
```

## 12.2 X 결과 분류 (필수)

| 태그 | 의미 | 콘텐츠 사용 |
|---|---|---|
| `verified_fact` | 공식 문서로 교차 검증됨 | 확정 서술 가능 + 출처 |
| `official_announcement_candidate` | 공식 계정·발표로 보이나 문서 미교차 | 후보만, 본문 확정 금지 |
| `community_interpretation` | 실무 해석·패턴 | educational_pattern으로만, 표준 사칭 금지 |
| `unverified_claim` | 근거 불충분 | 사용 금지 또는 `[출처 미확인]` |
| `opinion_sentiment` | 의견·감성 | 트렌드 메모만, 사실 문장 금지 |

## 12.3 금지

- X 단독 근거로 Timeline 사건 등재
- X 단독으로 “업계 표준 등급” 단정
- 교차 검증 전 확정형 콘텐츠 작성

## 12.4 P-01 / P-02 연결

- 신규 제품 사실 → AI-Ops P-01 draft → P-02 score≥80 → 그 다음에 Writer가 본문 사용
- 교육용 합성 시나리오 → claimScope=`educational_pattern`, KB 불필요 가능하나 **사실처럼 쓰지 않음**

---

# 13. Context 전달 정책

## 13.1 목표

Main 컨텍스트를 보호하고, SubAgent에는 **최소 충분 봉투**만 전달.

## 13.2 규칙

1. **SSOT는 경로로 전달**, 본문 전체 붙여넣기 금지(필요 시 SubAgent가 해당 섹션만 read).
2. 이전 대화 전체 대신 `task_id` + 이전 결과 요약 파일 경로.
3. 파일 내용이 길면 “해당 헤딩만 읽기” 지시.
4. 병렬 SubAgent는 **겹치지 않는 allowed_paths**.
5. 비밀·`.env` 전달 금지.
6. Phase 1 보호: 기본 프롬프트에 `do_not_touch` 목록 포함.

## 13.3 컨텍스트 예산 가이드

| 작업 | Main이 유지 | SubAgent에 전달 |
|---|---|---|
| 탐색 | goal + 질문 | 키워드, 디렉터리 힌트 |
| 조사 | claim 목록 | claim + 기존 kb id |
| 구현 | 승인 범위 표 | 파일 목록 + 명세 섹션 앵커 |
| 리뷰 | 요구 체크리스트 | diff 범위 + QA 요약 |

---

# 14. Agent 결과 통합 방식

## 14.1 SubAgent 반환 스키마 (의무)

```markdown
## RESULT
- task_id:
- agent_id:
- status: done | blocked | failed | needs_human
- risk_class:

## ARTIFACTS
- path: … (없으면 none)

## FINDINGS
- (불릿, 경로·근거 포함)

## CLAIMS (해당 시)
| claim | status | sources | claimScope |

## DIFF_SUMMARY (해당 시)
- files_changed:
- files_touched_outside_allowlist: 0

## QA
- commands:
- pass/fail:

## OPEN_QUESTIONS
- 

## HANDOFF
- recommended_next_agent:
- recommended_next_skill:
```

## 14.2 Main 통합 알고리즘

1. 모든 SubAgent `status` 수집.
2. allowlist 밖 수정이 있으면 **즉시 실패** → 롤백 지시 또는 운영자 보고.
3. claim 충돌 시 Researcher 재배정 또는 Human.
4. 구현 결과와 Reviewer 결과가 충돌하면 **Reviewer 우선 보류**, 구현 병합 금지.
5. 운영자 보고는 단일 문서: 목표 / 변경 / 검증 / 위험 / 승인 요청.

## 14.3 기록 위치

| 기록 | 경로 제안 |
|---|---|
| 작업 런 로그 | `ai-ops/reports/grok-runs/YYYY-MM-DD-taskid.md` |
| 조사 팩 | `ai-ops/reports/research/{topic}.md` |
| STATE NEXT | `ai-ops/STATE.md` (Main만 갱신 권장) |

---

# 15. Independent Review 방식

## 15.1 분리 규칙

```text
작성/구현 Agent ≠ 최종 승인 Reviewer
Mechanical QA ≠ Independent Reviewer (전자는 기계, 후자는 판단)
```

## 15.2 리뷰 체크 축

1. 요구사항·Feature Spec 일치  
2. SSOT 위반 (21/14, HOLD, Phase1)  
3. 출처·claimScope  
4. 접근성·reduced-motion·static export  
5. 성능·번들(금지 라이브러리)  
6. 과도한 변경·범위 팽창  
7. 회귀 (기존 100강·용어·verify)

## 15.3 판정

| 판정 | 의미 |
|---|---|
| `approve_merge` | 운영자 커밋 승인 요청 가능 |
| `revise` | Implementer/Writer 재배정 |
| `block` | SSOT/안전 위반, Human 필수 |

Reviewer는 코드를 고치지 않고 **finding + 권고 패치 설명**만 낸다.

---

# 16. 실패와 재배정

| 실패 유형 | 재배정 |
|---|---|
| Script FAIL (결정적) | 로그 요약 → Implementer (수정) → Script 재실행. 루프 최대 2 후 Human |
| Explorer 범위 못 찾음 | 검색어 확장 1회 → Main이 경로 힌트 → 그래도 실패 시 Human |
| Researcher 출처 불명 | claim을 unverified로 강등, 콘텐츠 사용 금지 |
| Writer 사실 발명 의심 | claim-verification → 삭제/완화 |
| Implementer allowlist 위반 | 변경 되돌림 지시, Reviewer block |
| Reviewer vs Implementer 충돌 | Human Approval |
| 동일 task 3회 실패 | ESCALATED → 운영자 |

재배정 시 **새 task_id**를 발급하고 이전 요약을 입력으로 넘긴다(전체 로그 재첨부 금지).

---

# 17. Human Approval 조건

반드시 사람:

1. 커밋 / push / 배포  
2. MR-1 및 이후 구현 Phase 착수  
3. 21 Concept 또는 14섹션 계약 변경  
4. Build Plan HOLD 해제  
5. Phase 1 미커밋 파일 커밋·삭제·대규모 수정  
6. Progress 스키마 마이그레이션  
7. 신규 의존성(특히 graph/motion)  
8. KB 대량 생성·기존 KB 본문 정책 변경  
9. 에스컬레이션(루프 3회)  
10. 공개 문구 중 논쟁적 제품 비교·순위

사람이 안 해도 되는 것:

- 읽기 전용 탐색  
- Script 실행  
- 조사 후보 수집  
- 설계 문서 초안(단, SSOT 승격 전)  
- Reviewer finding 작성  

---

# 18. Token 절감 원칙

1. **Script First** — 결정적 검사는 모델 밖에서.  
2. **SubAgent 격리 컨텍스트** — Main에 원문 로그 미반입.  
3. **경로로 SSOT 참조** — 장문 PRD 전체 재주입 금지.  
4. **한 런 한 위험 등급** — 탐색+구현+리뷰를 한 SubAgent에 몰지 않음.  
5. **병렬은 읽기 전용끼리** — 쓰기 작업은 순차·파일 락(allowlist 분할).  
6. **요약 스키마 강제** — §14 형식 외 장문 금지에 가깝게.  
7. **스킬 호출로 절차 재설명 제거**.  
8. **X는 후보만** — 장문 스레드 전체를 Main에 붙이지 않음.  
9. **Phase 단위 세션** — 세션 목표 1개.  
10. **재작업 시 diff만** — 전체 파일 재생성 지양.

---

# 19. 경로 보호 정책

## 19.1 기본 보호 (do_not_touch unless explicit Phase approval)

```text
src/app/atlas/**
src/content/atlas/**
src/features/atlas/**
src/lib/atlas*.ts
src/content/atlas.ts          # Phase1 tracked 변경 포함
src/components/layout/SiteHeader.tsx  # Phase1 혼입 주의
ai-ops/knowledge-base/entries/**
src/content/lessons/**        # 기존 100강 — 별도 승인 없이 수정 금지
src/content/glossary.ts
ai-ops/roadmap/ATLAS-BUILD-PLAN.md   # HOLD — 활성화 금지
```

## 19.2 문서 작업 기본 허용 (이번 GO 단계)

```text
ai-ops/roadmap/ATLAS-GROK-MULTI-AGENT-OPERATING-PLAN.md
ai-ops/STATE.md                 # Main만, 상태 반영 시
ai-ops/reports/grok-runs/**     # 런 로그 (생성 시)
```

## 19.3 향후 설정 파일 (승인 후 GO-2+)

```text
AGENTS.md
.grok/agents/**
.grok/skills/**
.grok/rules/**
scripts/atlas-*.mjs
```

## 19.4 커밋 분리 규칙

| 커밋 묶음 | 포함 |
|---|---|
| docs/atlas-spec | Education Layer, Feature Spec, STATE (문서) |
| docs/grok-os | 본 Operating Plan, 이후 AGENTS/.grok |
| phase1-legacy | Phase 1 코드 — **별도 승인 전 커밋 금지** |
| mr-implementation | MR-1+ 코드 — Phase 승인 후 |

---

# 20. 단계별 도입 계획

| Phase | 이름 | 산출 | 소스 수정 | 병렬 쓰기 |
|---|---|---|---|---|
| **GO-0** | Existing Audit | 본 문서 §1 (완료 수준) | 없음 | — |
| **GO-1** | Multi-Agent Operating Plan | 본 문서 승인 | 없음 | — |
| **GO-2** | AGENTS.md | 루트 프로젝트 규칙 (Main 책임·보호 경로·SSOT) | 문서만 | — |
| **GO-3** | Read-Only Agents | `.grok/agents/atlas-explorer` 등 read-only | 없음 | 읽기 병렬 OK |
| **GO-4** | Research / Curriculum Skills | `atlas-source-research`, `atlas-claim-verification`, `atlas-curriculum-design` | reports/roadmap만 | 쓰기 순차 |
| **GO-5** | Content / Interaction Workers | writer + interaction skills/agents | 승인 content 경로 | 경로 분할 시만 |
| **GO-6** | Implementation Worker | `atlas-implementer` + implementation skill | 승인 Phase 경로 | **단일 writer** |
| **GO-7** | Independent Reviewer | reviewer agent + release-audit skill | 없음(리뷰) | — |
| **GO-8** | Scripts / Hooks / QA | `scripts/atlas-*.mjs`, Mechanical QA 연결 | scripts만 | — |
| **GO-9** | Controlled MR-1 Pilot | Data Contract **계획→소량 타입 파일** (별도 승인) | MR-1 allowlist만 | 금지(단일) |

### Pilot 원칙

- 처음부터 병렬 소스 수정 금지.  
- 읽기 전용 Agent·문서 Agent부터.  
- MR-1 Pilot은 GO-8 스크립트와 GO-7 Reviewer가 준비된 뒤.  
- GO-9도 **MR-1 운영자 착수 승인**이 별도로 필요하다(Spec 승인과 별개).

---

# 21. 권장 디렉터리 레이아웃 (생성은 승인 후)

```text
/
  AGENTS.md                          # GO-2
  .grok/
    agents/
      atlas-explorer.md              # GO-3
      atlas-source-researcher.md
      atlas-curriculum-architect.md  # GO-4+
      atlas-content-writer.md        # GO-5
      atlas-interaction-designer.md
      atlas-implementer.md           # GO-6
      atlas-mechanical-qa.md         # GO-3/8
      atlas-independent-reviewer.md  # GO-7
    skills/
      atlas-repository-audit/SKILL.md
      atlas-source-research/SKILL.md
      ...
    rules/
      atlas-protection.md            # Phase1, 21/14, HOLD
  ai-ops/
    roadmap/
      ATLAS-GROK-MULTI-AGENT-OPERATING-PLAN.md  # 본 문서 (GO-1)
    reports/
      grok-runs/
  scripts/
    atlas-*.mjs                      # GO-8
```

기존 `ai-ops/agents`, `ai-ops/skills`, `ai-ops/prompts`는 **삭제·이관하지 않음**. 참조 링크로 연결.

---

# 22. 기존 구조와의 중복·충돌 매트릭스

| 영역 | 충돌 가능성 | 해소 |
|---|---|---|
| “Agent” 용어 | AI-Ops vs Grok | `atlas-*` 접두 + 계층 표기 |
| Research | research-agent vs atlas-source-researcher | 전자=파이프라인 역할서, 후자=Grok 실행자; SK-01 규칙 공유 |
| QA | qa-agent / Cline vs mechanical-qa / reviewer | 기계 vs 독립 판단 분리 유지 |
| Executor | Codex/Cline/Fable vs Grok Main | Atlas 작업은 Grok OS 우선; 100강 파이프라인은 AI-Ops RUN 유지 가능 |
| Skills | ai-ops/SK-* vs .grok/skills | 전자=도메인 규칙, 후자=실행 계약; 후자가 전자를 read |
| AGENTS.md 부재 | Grok 프로젝트 규칙 없음 | GO-2에서 신설 (중복 없음) |
| Phase 1 미커밋 | 구현 Agent가 손댈 위험 | 보호 경로 + release-audit |
| BUILD-PLAN HOLD | 잘못 활성화 | AGENTS.md 금지 조항 |
| STATE 이중 갱신 | 여러 Agent가 STATE 기록 | **Main만 STATE 갱신** |

---

# 23. GO-1 완료 기준 (본 문서)

- [x] 저장소 기존 Agent/Workflow/Skill/Executor/QA 실측
- [x] AI-Ops vs Grok CLI 역할 분리
- [x] Main·SubAgent·Skill·Routing·Script First·X 정책·Context·통합·Review·실패·Human·Token·경로·도입 Phase
- [x] **운영자 승인** (2026-07-13)
- [x] 연속 실행 권한: GO-2→GO-9 (Gate 통과 시 CONTINUE, Human Gate만 정지)

---

# 24. 승인 상태 (GO-1)

| 항목 | 상태 |
|---|---|
| Operating Plan | **approved** — Grok CLI 운영 정본 |
| 교육 정본 대체 여부 | **아니오** (Education Layer / Feature Spec / STATE 우선) |
| Grok OS 기본 진입점 | **approved** (Atlas V2 신규 업무) |
| AI-Ops Pipeline | **보존** (100강·KB) |
| 연속 실행 | GO-2~GO-9 Gate 기반 자동 진행 |
| MR-1 full implementation | **GO-9 Controlled Pilot 전 금지** |
