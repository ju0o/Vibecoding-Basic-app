# Learning Platform Information Architecture

```yaml
document: LEARNING-PLATFORM-INFORMATION-ARCHITECTURE
status: operator_direction_review
date: 2026-07-14
day1_approved: true
day1_route: /learn/vibe-coding-foundation/day-1
code_change_this_wave: false
deletes_existing_assets: false
```

---

## 1. 프로젝트 최종 정의

공개 학습 플랫폼 =

```text
Learning Platform
  + Knowledge Library
  + Living Verification System
```

| 층 | 역할 |
|---|---|
| **Learning Platform** | 비개발자가 Day 1부터 따라가며 AI·바이브코딩을 배움 |
| **Knowledge Library** | 학습 중 개념을 깊게 탐색 (Atlas · Tech · Wiki · Textbook · KB) |
| **Living Verification** | 출처·검증일·수정 제안·이력으로 콘텐츠를 함께 고침 |

Living 루프:

```text
질문 → 조사 → 검증 → 교육자료 → 실습 → 인터랙션 → 공개 → 피드백 → 수정
```

**Learning Path가 메인.** Atlas는 Reference. Tools/Technology는 별도 탐색. Verification은 핵심 기능.

---

## 2. 사용자

| 사용자 | 목표 |
|---|---|
| 비개발 학습자 | Day 1 성공 → 다음 Path → 막히면 지식 레이어 |
| 재방문 학습자 | 이어서 학습 · Outcome · Lab |
| 심화 학습자 | Atlas · Model Routing · Tools 비교 |
| 운영자 | Studio · Curriculum · Verification 상태 |

---

## 3. 전체 사이트 목차 (IA)

```text
홈 /
│
├─ 오늘부터 시작하기          /start
│  └─ Day 1 (기존 재사용)     /learn/vibe-coding-foundation/day-1
│
├─ 바이브코딩 배우기          /learn
│  ├─ Track A 기초 환경
│  ├─ Track B 개발 원리
│  ├─ Track C AI 도구 사용
│  ├─ Track D 실제 프로젝트
│  └─ Track E 배포·운영·보안
│
├─ AI 도구 탐색               /tools  (+ /tools/[slug])
├─ 기술 도감                  /technologies  (+ /technologies/[slug])
│
├─ 실습실                     /lab  (+ /lab/[slug])
│
├─ AI Engineering Atlas       /atlas  (기존 유지)
│  ├─ Concepts / Graph / Timeline
│  ├─ Model Routing           /model-routing
│  └─ Studio                  /atlas/studio
│
├─ 검증과 수정                /verification  (또는 /verify · 메뉴명 「검증 센터」)
│
├─ 학습 지도 (보조)           /curriculum  → /learn 과 역할 분리
├─ 용어 (Wiki)                /glossary
├─ Textbook 강의              /lessons/[slug]
├─ 공식 문서 모음             /resources
└─ 소개/정책                  /about · /privacy · /terms · /license
```

---

## 4. 영역 목적

| 영역 | 목적 | 학생이 얻는 것 |
|---|---|---|
| 홈 | 정체성 · 시작점 · 범위 | 3초 안에 “뭐지/어디부터/뭘 배우나” |
| /start | 첫 진입 온보딩 | Day1 소개 · Path A/B · Outcome · 다음 |
| /learn | Course Layer | Track·Stage·Node 따라 학습 |
| /tools | 도구 선택 도움 | 비교·시작·한계·출처 (홍보 목록 아님) |
| /technologies | 개발 기술 도감 | 도구와 분리된 “기술 개념” |
| /lab | 실습 허브 | Node와 연결된 시뮬·샘플·평가 |
| /atlas | Knowledge Layer | 궁금할 때 심화 후 Path 복귀 |
| /verification | Living 신뢰 | 출처·검증일·수정 제안 |
| /curriculum | 전체 지도 | 기존 100강+모듈 탐색 (운영·심화 지도) |
| /lessons | Textbook depth | 기존 Deep Dive 유지 |
| /glossary | Wiki | 빠른 용어 |

---

## 5. 주요 Route (권장 · 실측 반영)

| Route | 상태 | 비고 |
|---|---|---|
| `/` | 기존 | **전환 예정** (Home Plan — 구현 별도 Wave) |
| `/start` | **신규 예정** | Day1 허브 · Day1 본문은 중복 생성 금지 |
| `/learn` | **신규 예정** | Track 인덱스 |
| `/learn/[course]/[lesson]` | 부분 존재 | Day1: `/learn/vibe-coding-foundation/day-1` **KEEP** |
| `/tools`, `/tools/[slug]` | 신규 예정 | 대량 페이지 이번 Wave 금지 |
| `/technologies`, `/technologies/[slug]` | 신규 예정 | 동일 |
| `/lab`, `/lab/[slug]` | 신규 예정 | Day1 lab 항목은 Day1 라우트로 deep-link |
| `/atlas/**` | **KEEP** | 삭제 금지 |
| `/model-routing/**` | **KEEP** | Atlas 산하 심화 |
| `/atlas/studio/**` | **KEEP** | Studio 진화 계획 |
| `/curriculum` | **KEEP → 역할 축소** | 전체 지도 / 검색 |
| `/lessons/[slug]` | **KEEP** | Textbook |
| `/glossary` | **KEEP** | Wiki |
| `/resources` | **KEEP** | 공식 문서 링크 허브 |
| `/verification` | 신규 예정 | 정적 정책+템플릿 우선 |

Redirect 원칙: 기존 URL **깨지 않기**. 새 내비가 메인이 되고 옛 링크는 301 또는 배너로 안내 (Transition Plan).

---

## 6. Navigation

### Desktop (권장 최상위 ≤7)

| 메뉴 | href |
|---|---|
| 시작하기 | `/start` |
| 배우기 | `/learn` |
| 도구 | `/tools` |
| 기술 | `/technologies` |
| 실습 | `/lab` |
| Atlas | `/atlas` |
| 검증 | `/verification` |

**더보기/푸터:** 커리큘럼 지도, 용어, 교재(강의), 소개, 리소스.

Wiki(/glossary)·Textbook(/lessons)·KB(ops)는 최상위 과밀 방지 → 푸터 · Atlas 내부 · 통합 검색.

### Mobile

1. 시작하기 (Day1 CTA)  
2. 배우기  
3. 실습  
4. 더보기 (도구·기술·Atlas·검증·용어)

---

## 7. 홈 구조 (구현 Plan only — 이번 Wave 미구현)

```text
Hero (이 사이트는 / 시작은 / 배우게 되는 것)
→ CTA: 오늘부터 시작하기 → /start 또는 Day1
→ 보조: 전체 학습 · Atlas · 도구
→ 학습 방식 (Experience → Outcome)
→ 전체 Learning Path 스케치 (Tracks)
→ Day 1 Interactive Preview (iframe/embed 또는 링크 카드)
→ 배울 수 있는 영역 (도구·기술·Atlas 카드)
→ Living Verification 원칙 한 블록
→ Continue Learning (로컬 progress 재사용)
```

기존 홈 재사용: 모듈 카드, LearningDashboard, 통계 배지 패턴.

---

## 8. Learning Path 구조

```text
/learn
  Track A 기초 환경     ← Day1 포함
  Track B 개발 원리
  Track C AI 도구 사용
  Track D 실제 프로젝트
  Track E 배포·운영·보안
```

- 강의 수 **미확정** — Living Curriculum (CSV + 운영자 승인).  
- 질문 중심 노드 (LEARNING_NODE_SPEC + OUTCOMES).  
- Day1 기준 구현 보존.

`/learn` vs `/curriculum`:

| | /learn | /curriculum |
|---|---|---|
| 청중 | 학생 Path | 전체 지도·기존 100강 탐색 |
| 톤 | Outcome·실습 중심 | 모듈 카탈로그 |
| Day1 | 1순위 노출 | 배너로 연결 (현재 구현 유지·강화 예정) |

---

## 9. Atlas 위치

- **Reference Layer** — Path를 대체하지 않음.  
- 역링크 계약 (설계): Concept → 관련 강의 · 실습 · Tool ID (대규모 본문 수정 없음 · Migration).  
- Model Routing = Atlas 산하 심화 루트 유지.

---

## 10. Tool vs Technology

| | Tool Library | Technology Library |
|---|---|---|
| 질문 | 무엇을 쓰면 되나? | 원리가 뭔가? |
| 예 | Claude Code, Cursor | Node.js, React, Git |
| 위험 | 제품 홍보·미검증 가격 | 도구와 혼동 |

교차 링크: Tool ↔ Tech ↔ Lesson ↔ Atlas.

---

## 11. Lab

실습 = Learning Node에 종속.

유형: Interactive Simulation · Sample Project · Guided Practice · Debugging · Mini Project · Outcome Check.

Day1 기준 자산 → Lab 카탈로그 항목으로 **링크** (복제 페이지 금지).

---

## 12. Verification

메뉴명 권장: **검증 센터** (`/verification`).

학생 노출: 공식 문서 기반 · 최근 검증일 · 교육적 해석 포함 · 업데이트 필요 · 출처 · 수정 제안.  
운영 상세: Studio + CSV 상태.

초기: GitHub Issue 템플릿 · 정적 제안 양식 · DB/Auth 없음.

---

## 13. 검색 (계획 only)

장기: 강의 · Node · Tool · Tech · Atlas · Wiki · Textbook · KB.  
현재 SiteSearch 재사용 확장 계획 — **이번 Wave 미구현**.

---

## 14. 성공 기준 (이 문서)

1. Learning Path 메인이 한 장 그림으로 설명된다.  
2. Day1 중복 페이지 없이 위치한다.  
3. Atlas/Tools/Tech/Lab/Verification 경계가 명확하다.  
4. 구현 없이 전환 계획이 가능하다.
