# Day 1 Interaction Storyboard

```yaml
source_ssot: content/interactions/vibe-coding-foundation/01-first-success-interaction-spec.md
artifact: derivative_for_operator_review
implementation: NOT_THIS_PHASE
date: 2026-07-14
```

이 문서는 운영자가 **시각적 움직임**을 검토하기 위한 스토리보드입니다.  
원본 상호작용 명세와 정합하며, 텍스트만 바뀌는 Stepper는 **구현 인정 대상이 아닙니다.**

---

## 공통 화면 레이아웃

```text
┌──────────────┬────────────────────┬──────────────────┐
│  User Card   │   AI Agent Dock    │    Workspace     │
│  프롬프트/CTA │   계획·응답        │  파일트리+미리보기 │
└──────────────┴────────────────────┴──────────────────┘
              ↗ 카드·칩 이동 경로 ↘
```

| 공통 키보드 | 동작 |
|---|---|
| Enter / Space | 다음 장면(또는 CTA 확정) |
| Backspace | 이전 장면 |
| 1–0 | 장면 점프(학습 모드) |
| Esc | 오류 패널 닫기(해당 시) |

| reduced-motion | 대안 |
|---|---|
| `prefers-reduced-motion: reduce` | 이동 거리 0, 즉시 컷 또는 ≤150ms 페이드, 자동재생 off, confetti off |
| 스크린 리더 | 각 장면 전환 시 `aria-live` 한 문장 |
| 텍스트 대안 | 장면 아래 “지금 무슨 일이?” 접기 패널 |

**구현 난이도 스케일:** L1 간단 · L2 중 · L3 상태머신+모션 경로.

---

## Scene 1 — Student Request

| 항목 | 내용 |
|---|---|
| 화면 구성 | User Card 중앙 CTA “페이지 만들어줘”, 프롬프트 미리보기 |
| 움직이는 대상 | CTA 호버 pulse(optional); 클릭 시 요청 카드가 Agent로 **아크 이동** |
| 사용자 입력 | CTA 클릭 또는 Enter |
| 시작 상태 | `idle` |
| 종료 상태 | `requesting` |
| 화면 텍스트 | “페이지 만들어줘” / 짧은 프롬프트 요약 |
| 학습 목적 | 요청이 AI 쪽으로 **전달되는** 감각 |
| 키보드 | Enter = CTA |
| reduced-motion | 카드 순간 이동(위치 점프) |
| 오류 상태 | 없음 |
| 구현 난이도 | L2 |

---

## Scene 2 — AI Planning

| 항목 | 내용 |
|---|---|
| 화면 구성 | Agent Dock에 체크리스트 영역 |
| 움직이는 대상 | 계획 행 3개가 **순차 slide-in**(120ms 간격). 타이핑 효과 금지 가능 |
| 사용자 입력 | Next 또는 자동 진행 |
| 시작 | `requesting` |
| 종료 | `planning` |
| 화면 텍스트 | 예: “HTML 뼈대” · “스타일” · “미리보기 확인” |
| 학습 목적 | AI가 바로 파일이 아니라 **계획 후 생성** |
| 키보드 | Enter 다음 |
| reduced-motion | 3행 동시 표시 |
| 오류 | 없음 |
| 난이도 | L2 |

---

## Scene 3 — File Generation

| 항목 | 내용 |
|---|---|
| 화면 구성 | Workspace 파일 트리 비어 있음 → 노드 등장 |
| 움직이는 대상 | `index.html` / `src/` 노드 **scale-in**; 코드 영역 하이라이트 스윕; progress 0→100% |
| 사용자 입력 | Next |
| 시작 | `planning` |
| 종료 | `generating` |
| 화면 텍스트 | 파일 이름, “생성 중…” |
| 학습 목적 | 말이 **파일**이 됨 |
| 키보드 | Enter |
| reduced-motion | 트리 최종 상태 즉시 |
| 오류 | (선택) 생성 실패 분기 → Scene 10 |
| 난이도 | L3 |

---

## Scene 4 — Dependency Installation

| 항목 | 내용 |
|---|---|
| 화면 구성 | 터미널 스트립 + package.json 하이라이트 |
| 움직이는 대상 | `npm install` 줄이 타이핑/스크롤; node_modules 폴더 아이콘 fade-in **또는** “0 packages” 배지(샘플 프로젝트 정합) |
| 사용자 입력 | Next / “설치 실행” 버튼 |
| 시작 | `generating` (또는 running 직전) |
| 종료 | install complete 중간 상태 → 다음 running |
| 화면 텍스트 | `$ npm install` / “added 0 packages” (샘플) 또는 “installing…” |
| 학습 목적 | package.json → install 단계 존재 |
| 키보드 | Enter |
| reduced-motion | 결과 한 줄만 |
| 오류 | 네트워크 실패 메시지 → Scene 10 |
| 난이도 | L2 |

> 샘플 `examples/day1-first-success`는 외부 의존성 0. 스토리보드는 “install 단계가 있다”를 보여 주되, 과장된 거대한 node_modules 파티클은 불필요.

---

## Scene 5 — Development Server

| 항목 | 내용 |
|---|---|
| 화면 구성 | Dev server 토글, 포트 LED, Preview 스켈레톤 |
| 움직이는 대상 | 토글 off→on; LED 점멸→고정 초록; 트리→Preview **연결선** draw |
| 사용자 입력 | Next 또는 “서버 켜기” |
| 시작 | install 후 |
| 종료 | `running` |
| 화면 텍스트 | `npm run dev` · `http://127.0.0.1:3456` |
| 학습 목적 | 로컬 서버가 미리보기를 연다 |
| 키보드 | Enter |
| reduced-motion | LED on + URL 텍스트 |
| 오류 | 포트 충돌 → Scene 10 |
| 난이도 | L3 |

---

## Scene 6 — Browser Result

| 항목 | 내용 |
|---|---|
| 화면 구성 | Preview 패널 |
| 움직이는 대상 | 스켈레톤 → 실제 카드 UI 페인트; 성공 체크 아이콘 |
| 사용자 입력 | 관찰 / Next |
| 시작 | `running` |
| 종료 | `success` |
| 화면 텍스트 | “나의 첫 바이브코딩” · “안녕하세요” |
| 학습 목적 | **첫 성공** 시각 확인 |
| 키보드 | Enter |
| reduced-motion | 즉시 최종 화면 (confetti 없음) |
| 오류 | 빈 미리보기 → 힌트 |
| 난이도 | L2 |

---

## Scene 7 — Revision Request

| 항목 | 내용 |
|---|---|
| 화면 구성 | 수정 칩 “제목 바꾸기” / “문장 추가” |
| 움직이는 대상 | 칩이 Agent Dock으로 **비행** |
| 사용자 입력 | 칩 선택 |
| 시작 | `success` |
| 종료 | `revision` (요청 중) |
| 화면 텍스트 | 선택한 수정 문구 |
| 학습 목적 | 바이브 리듬: 수정 요청 |
| 키보드 | 칩 포커스 + Enter |
| reduced-motion | 칩 선택 하이라이트만 |
| 오류 | 없음 |
| 난이도 | L2 |

---

## Scene 8 — File Change

| 항목 | 내용 |
|---|---|
| 화면 구성 | 파일 트리 + 코드 스니펫 |
| 움직이는 대상 | 해당 파일 노드 **glow pulse**; 코드 한 줄 하이라이트 교체 |
| 사용자 입력 | 자동 또는 Next |
| 시작 | revision 요청 후 |
| 종료 | 파일 갱신 완료 |
| 화면 텍스트 | 변경된 제목/문장 소스 |
| 학습 목적 | 수정 = 파일 내용 변화 |
| 키보드 | Enter |
| reduced-motion | glow 없이 diff 한 줄 |
| 오류 | 없음 |
| 난이도 | L2 |

---

## Scene 9 — Updated Result

| 항목 | 내용 |
|---|---|
| 화면 구성 | Preview |
| 움직이는 대상 | 문구 **크로스페이드** (이전→이후) |
| 사용자 입력 | 관찰 |
| 시작 | 파일 변경 후 |
| 종료 | `success` (갱신) |
| 화면 텍스트 | “Day 1 성공” 등 |
| 학습 목적 | 요청이 화면에 반영 |
| 키보드 | Enter 종료/루프 |
| reduced-motion | 즉시 새 문구 |
| 오류 | 없음 |
| 난이도 | L1–L2 |

---

## Scene 10 — Error and Recovery

| 항목 | 내용 |
|---|---|
| 화면 구성 | 터미널 스트립 상승, 빨간 테두리, Copy 버튼 |
| 움직이는 대상 | mild shake; Copy 버튼이 프롬프트 박스로 **이동** |
| 사용자 입력 | “오류 보기” / Copy / Retry |
| 시작 | 임의 분기 |
| 종료 | `error` → retry 시 `requesting` 또는 `running` |
| 화면 텍스트 | 예: `Missing script: "dev"` / `command not found` |
| 학습 목적 | 오류 = AI에게 줄 재료 (O13) |
| 키보드 | C = copy, R = retry |
| reduced-motion | shake 없음, 패널 즉시 |
| 오류 | 본 장면 자체 |
| 난이도 | L3 |

---

## 구현 인정 / 비인정

| 인정 | 비인정 |
|---|---|
| 파일 트리·미리보기·서버 LED가 상태에 따라 변함 | 설명 문장만 바뀌는 Stepper |
| 사용자 칩/CTA에 반응 | 버튼 = 다음 텍스트만 |
| 오류→복사 경로 모션 | “다이어그램 보세요” 안내만 |
| reduced-motion 대안 | 화살표 문자 나열 |

---

## 원본 매핑

| Storyboard | Spec state |
|---|---|
| 1 Request | idle → requesting |
| 2 Planning | planning |
| 3 File Generation | generating |
| 4 Install | (확장 장면, Path B) |
| 5 Dev Server | running |
| 6 Browser Result | success |
| 7–9 Revision | revision → success |
| 10 Error | error |
