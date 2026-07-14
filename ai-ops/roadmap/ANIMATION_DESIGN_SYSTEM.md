# Animation Design System (V2)

```yaml
document: ANIMATION_DESIGN_SYSTEM
status: design_wave
authority: interactive_animation_ssot_candidate
date: 2026-07-14
implementation: not_started
site_wire: after_content_and_framework_gate
modifies_core_21_concepts: false
```

---

## 1. 왜 이 문서가 있는가

Storyboard는 **설계도**다. 끝이 아니다.

V2의 핵심 가치:

```text
학생이 실제로 조작하는 Interactive Animation
```

| 단계 | 산출 | 상태 정의 |
|---|---|---|
| 1 | Storyboard / interaction spec | 설계 |
| 2 | React Animation Component (재사용 프레임) | 프레임워크 |
| 3 | 강의별 시나리오 데이터 + 마운트 | 콘텐츠 완성 |
| 4 | Website Viewer 연결 | **항상 마지막** |

**텍스트 Stepper · 문장만 바뀌는 카드 · “다이어그램 보세요” 안내만** 으로는 Interactive Animation으로 인정하지 않는다.

---

## 2. 교육 파이프라인 안에서의 위치

```text
Research
  → Markdown (학생 원본)
  → Student Word (검토·배포용)
  → Sample Project (예제 · 실습 · 완성본)
  → Interactive Animation   ← 본 시스템
  → Quiz / Outcome Check
  → Website (Viewer)
```

강사용 대본은 **필수 파이프라인에 없다** (Optional · 이 사이트는 학생 자율학습).

---

## 3. 설계 원칙

1. **조작 가능** — 클릭·키보드·칩 선택이 상태와 화면을 바꾼다.  
2. **상태 머신** — 모든 애니에 `state` + `transition` + `reduced-motion` 대안.  
3. **재사용** — 강의마다 새로 그리지 않고 **프리미티브 + 시나리오 JSON/TS**로 조립.  
4. **가볍다** — 무거운 3D/Lottie 필수 금지 기조. SVG/CSS/React 우선.  
5. **정적 export 호환** — Next static export · 클라이언트 island만.  
6. **a11y** — 키보드, `prefers-reduced-motion`, `aria-live`, 텍스트 대안.  
7. **교육 목적 우선** — “예뻐 보이기”보다 **개념이 움직이는가**.  
8. **외부 유료 모델 API 비연결** — 시뮬은 로컬 시나리오.

---

## 4. 재사용 애니메이션 카탈로그 (Framework 대상)

| ID | 이름 | 학생에게 보이는 것 | 대표 사용 |
|---|---|---|---|
| `flow` | Flow Animation | 단계·화살표·토큰이 경로를 따라 이동 | 요청→생성→실행 |
| `card` | Card Animation | 카드 등장·강조·교체·스택 | 선택지, Outcome 카드 |
| `node-graph` | Node Graph | 노드·엣지 하이라이트, 경로 점등 | 개념 연결, Atlas 보조 |
| `terminal` | Terminal Simulation | 명령 입력·출력 스크롤·에러 줄 | npm, node -v, 오류 |
| `file-tree` | File Tree Animation | 폴더/파일 생성·glow·diff 한 줄 | package.json, src |
| `ai-conversation` | AI Conversation | 말풍선·요청 칩→에이전트 이동 | 바이브코딩 요청 |
| `workflow` | Workflow Animation | 단계 파이프라인 활성/대기/완료 | 다중 작업 흐름 |
| `agent-collab` | Agent Collaboration | 여러 에이전트 역할 분담·메시지 패스 | SubAgent, 협업 |
| `browser-preview` | Browser Preview | 미리보기 페인트·URL·새로고침 | 실행 결과 |
| `install-progress` | Install / Progress | 진행 바·패키지 배지 | npm install |

Day 1 First Success 스토리보드는 위 primitive 조합으로 구현 예정:

```text
ai-conversation + file-tree + terminal + install-progress
  + browser-preview + flow (+ card for revision chips)
```

---

## 5. 공통 컴포넌트 계약 (구현 전 명세)

### 5.1 `AnimationShell`

```text
props:
  scenarioId: string
  title: string
  states: StateId[]
  initialState: StateId
  onStateChange?: (s) => void
  reducedMotion?: boolean | "system"
slots:
  stage (visual)
  controls (play / next / prev / reset)
  liveRegion (aria)
  textAlternative (접기 패널)
```

### 5.2 `useAnimationMachine`

```text
input: { states, transitions, initial }
output: { state, send, canGo, history }
rules:
  - illegal transition → no-op + dev warn
  - reducedMotion → skip duration, jump to end frame
```

### 5.3 `Scenario` 데이터 (강의별)

```text
scenario:
  id, lessonId, primitiveIds[]
  frames[]:
    stateId
    visual: { ...primitive-specific }
    caption: string          # 짧은 교육 캡션
    ariaLive: string
  interactions[]:
    type: cta | chip | key
    fromState, toState
    label
```

시나리오는 **콘텐츠 레이어** (`content/interactions/...` 또는 향후 `src/content/animations/` — 사이트 연결 시).  
프레임워크 코드와 시나리오 데이터를 분리한다.

### 5.4 인정 기준 (QA)

| PASS | FAIL |
|---|---|
| 사용자 입력 후 파일/미리보기/서버 LED 등 **시각 객체** 변화 | 문장만 교체 |
| 최소 3개 이상의 의미 있는 상태 | 단일 페이드 |
| reduced-motion 경로 | 모션 필수 only |
| 키보드로 전 구간 진행 | 마우스 only |

---

## 6. 권장 디렉터리 (구현 Wave · 아직 생성 의무 없음)

```text
src/features/animations/          # framework (implementer allowlist 후)
  shell/
  machine/
  primitives/
    flow/
    card/
    node-graph/
    terminal/
    file-tree/
    ai-conversation/
    workflow/
    agent-collab/
    browser-preview/
    install-progress/
  registry.ts

content/interactions/<course>/    # scenario + storyboard (SSOT 쪽)
  *.interaction-spec.md
  *.scenario.json                 # 선택: 구현 시
```

**지금은 설계 문서만.** `src/` 대규모 구현은 별도 Context Package + 콘텐츠 게이트 후.

---

## 7. 성능 · 번들 가드레일

- 프리미티브 단위 코드 스플릿 (dynamic import)  
- 기본 의존: React + CSS/SVG. 새 무거운 그래프 라이브러리 **기본 금지**  
- 동시 재생 애니 1개 권장 (탭 비가시 pause)  
- prefers-reduced-motion 기본 존중  

---

## 8. Day 1 매핑 (참고 · 구현 전)

| Storyboard 장면 | Primitive |
|---|---|
| Student Request | ai-conversation + flow |
| AI Planning | card / workflow steps |
| File Generation | file-tree |
| Dependency Install | terminal + install-progress |
| Dev Server | terminal + browser-preview |
| Browser Result | browser-preview |
| Revision | card chips + ai-conversation |
| File Change | file-tree glow |
| Updated Result | browser-preview morph |
| Error Recovery | terminal + flow to copy |

---

## 9. 샘플 프로젝트와의 관계

| 자산 | 역할 |
|---|---|
| Sample Project (다운로드) | **진짜** 손 실습 |
| Interactive Animation | **안전한 시뮬**로 원리 체감 |
| 둘 다 | 강의 완성에 필요. 애니만으로 Path B 대체 금지 |

강의 패키지 권장 세트:

```text
예제 프로젝트 (starter)
실습 프로젝트 (lab)
완성본 (reference)
+ Interactive Animation
+ Quiz
```

---

## 10. 구현 Wave 제안 (승인 후)

| Wave | 내용 |
|---|---|
| AF-0 | 본 문서 승인 |
| AF-1 | `AnimationShell` + machine + a11y 스켈레톤 (allowlist) |
| AF-2 | primitive 3종: file-tree, terminal, browser-preview |
| AF-3 | Day 1 scenario 연결 (사이트 라우트는 콘텐츠 승인 후) |
| AF-4 | flow, ai-conversation, card |
| AF-5 | workflow, agent-collab, node-graph |

Website 연결은 교육 패키지 승인 **후**.

---

## 11. 비목표

- 강사용 LMS 플레이어  
- 실제 LLM API로 애니 구동  
- Storyboard만 만들고 완료 선언  
- BUILD-PLAN 활성화 · 21/14 변경  

---

## 12. 성공 기준

1. 모든 신규 강의 interaction이 **primitive ID**를 지정한다.  
2. “애니 완료” = 스토리보드 + **조작 가능 컴포넌트** + QA 표 PASS.  
3. Day 1이 프레임워크 첫 소비자로 재사용성을 증명한다.  
4. reduced-motion·키보드가 기본 계약이다.

---

## 13. 한 줄

> **Storyboard는 설계도이고, Interactive Animation이 제품이다. 재사용 primitive로 모든 강의가 움직인다.**
