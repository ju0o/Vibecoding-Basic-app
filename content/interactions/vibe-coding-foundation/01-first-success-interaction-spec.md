# Interaction / Animation Spec — Day 1 첫 성공

```yaml
lesson_id: d1-first-success
type: interactive_animation_spec
implementation: NOT_IN_THIS_PHASE
site_wired: false
motion_required: true
text_stepper_only: false
```

---

## 1. 목적

학생이 **요청 → 생성 → 실행 → 수정**이 공간적으로 이동·변화하는 것을 본다.  
단순 문장 페이드/탭 전환만 있는 “텍스트 스테퍼”는 **이 명세의 구현으로 인정하지 않는다.**

---

## 2. 장면 개요 (Scene: “First Success Loop”)

화면 영역 (권장 레이아웃):

```text
┌────────────┬──────────────────┬─────────────┐
│ User Card  │  AI Agent Dock   │  Workspace  │
│ (prompt)   │  (plan/files)    │  (tree+preview) │
└────────────┴──────────────────┴─────────────┘
         │              │                │
         └──── motion paths ─────────────┘
```

### 필수 상태 머신

| State | 화면 | 무엇이 움직이는가 |
|---|---|---|
| `idle` | User Card 비활성 CTA “페이지 만들어줘” | 커서 힌트 pulse (optional) |
| `requesting` | 요청 카드가 **경로를 따라** Agent Dock으로 슬라이드 | 카드 translate + trail |
| `planning` | Agent 패널에 체크리스트 3줄이 **순차 등장** (타이핑 X, 행 slide-in) | plan rows |
| `generating` | Workspace 트리에 `index.html` (또는 `src/…`) 노드가 **스케일 인** · 코드 하이라이트 스윕 | file nodes, progress bar |
| `running` | “Dev server” 토글이 off→on, 포트 점 점멸, Preview iframe 영역 스켈레톤→페인트 | server LED, preview reveal |
| `success` | Preview에 실제 문구 “안녕하세요” 렌더, 성공 체크 아이콘 | preview content swap |
| `revision` | 사용자가 “제목 바꾸기” 칩 선택 → 해당 파일 노드 **강조 glow** → Preview 문구 크로스페이드 | file glow, text morph |
| `error` | 터미널 스트립에 빨간 에러 한 줄, Agent로 **복사 버튼** 이동 애니메이션 | error shake (mild), copy path |

Keyboard: 각 상태에서 `Enter`/`Space` = 다음, `Backspace` = 이전, `1–8` = 상태 점프(학습 모드).

---

## 3. 스텝 시나리오 (구현 단위)

| # | Trigger | From → To | Motion detail (must be visible) |
|---|---|---|---|
| 1 | CTA click / Enter | idle → requesting | Request chip arcs to agent (bezier, 400–600ms) |
| 2 | auto or Next | requesting → planning | Three plan lines cascade 120ms apart |
| 3 | Next | planning → generating | Tree empty → nodes pop; progress 0→100% |
| 4 | Next | generating → running | Cable/line from tree to preview; server LED green |
| 5 | Next | running → success | Preview content fades in; confetti **optional** (reduced-motion off) |
| 6 | Chip “수정 요청” | success → revision | Chip flies to agent; file node pulse; preview text changes |
| 7 | (branch) “오류 보기” | any → error | Terminal rises 24px; red border; copy button travels to prompt box |
| 8 | Retry | error → requesting or running | Error dismiss; path retries |

---

## 4. 다이어그램 (정적 대안)

애니메이션 불가 환경용 **동일 정보** 정적 figure:

1. **Flow diagram:** User → AI → Files → Runtime/Browser → User  
2. **Path A vs Path B split:** left “HTML file open”, right “Node + npm + localhost”  
3. **package.json callout:** scripts.dev arrow to terminal  

SVG ids (future): `d1-flow.svg`, `d1-path-ab.svg`, `d1-package-json.svg`

---

## 5. a11y · reduced-motion · 텍스트 대안

| 요구 | 명세 |
|---|---|
| `prefers-reduced-motion: reduce` | 이동 거리 0; crossfade ≤150ms 또는 즉시 상태 컷; 자동 재생 off |
| Keyboard | 위 단축키; focus ring on CTA/chips; roving tabindex on state dots |
| Screen reader | 상태 변경 시 `aria-live="polite"` 한 문장 예: “생성 완료. 미리보기에 인사 문구가 보입니다.” |
| 텍스트 대안 | 각 상태 아래 접을 수 있는 “지금 무슨 일이?” 문단 (학생 본문과 동일 메시지) |
| Color | 성공/에러를 색만으로 구분 금지 — 아이콘+텍스트 |

---

## 6. 비목표 (이번 구현 Phase 금지)

- 실제 LLM API 호출  
- 무거운 3D/Lottie 필수 의존  
- 사이트 라우트 연결 (명세만)  

---

## 7. 수락 기준 (나중에 구현 시)

1. 리뷰어가 “파일이 생기는 것 / 서버가 켜지는 것 / 수정 시 미리뷰 변화”를 **모션으로** 식별 가능  
2. 텍스트만 바뀌는 캐러셀이 아님  
3. reduced-motion 경로 존재  
4. error → copy 경로가 교육 메시지와 일치  
