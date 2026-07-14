# Learning Platform Local Transition Review (T1–T6)

```yaml
date: 2026-07-14
verdict: READY_FOR_LEARNING_PLATFORM_LOCAL_REVIEW
direction: APPROVE_WITH_MINOR_REVISIONS
push: false
deploy: false
```

---

## 1. Verdict

```text
READY_FOR_LEARNING_PLATFORM_LOCAL_REVIEW
```

### 개발 서버 검토 URL

```text
npm run dev

http://localhost:3000/
http://localhost:3000/start
http://localhost:3000/learn
http://localhost:3000/lab
http://localhost:3000/verification
http://localhost:3000/tools          (안내 스켈레톤)
http://localhost:3000/technologies   (안내 스켈레톤)
http://localhost:3000/learn/vibe-coding-foundation/day-1
http://localhost:3000/atlas
http://localhost:3000/curriculum
```

---

## 2. 구현한 Route

| Route | 역할 |
|---|---|
| `/start` | 시작 허브 · Day1 미복제 · CTA → Day1 |
| `/` | Learning-first Home |
| Nav | 시작/배우기/도구/기술/실습/Atlas/함께 고치기 |
| `/learn` | Track A–E · Day1만 active |
| `/lab` | Day1 실습 deep-link 4종 |
| `/verification` | 출처와 검증 |
| `/tools` `/technologies` | 본격 콘텐츠 없음 · 공개 정책 안내 |

---

## 3. Home 변경

- Primary CTA: **오늘부터 시작하기** → `/start`
- Secondary: `/learn`, Atlas 보조
- Day1 Interactive 섹션, 학습 방식, Track, 도구·기술·Atlas, 함께 고치기
- 기존 모듈 카드·통계·Continue Learning **하단 보존**

---

## 4. Navigation

- Desktop: `PRIMARY_NAV` 7개 (`src/content/site-navigation.ts`)
- Mobile: 시작·배우기·실습 + 더보기(도구·기술·Atlas·함께 고치기)
- Footer: curriculum, glossary, resources, about 등
- 기존 URL 유지 · 삭제 없음

---

## 5. Day 1 연결

- 단일 구현: `/learn/vibe-coding-foundation/day-1`
- Lab anchors: `#simulation` `#practice` `#quiz-outcomes`
- 복제 페이지 없음

---

## 6. 기존 자산 보존

| 자산 | 상태 |
|---|---|
| `/atlas/**` `/model-routing/**` `/atlas/studio/**` | 유지 · Studio 표시명 Education Studio |
| `/curriculum` `/lessons/**` `/glossary` `/resources` | 유지 |
| Day1 interactive + sample | 유지 |
| 21/14 | 미변경 |
| 삭제 | 없음 |

---

## 7. Education Studio

- Route `/atlas/studio` 유지
- 화면 제목 **Education Studio**
- 장기 탭 계약 문구만 (재구현 없음)

---

## 8. QA

| 검사 | 결과 |
|---|---|
| typecheck | PASS |
| unit tests (nav + day1 SM) | PASS 11 |
| biome (변경 경로) | PASS |
| next build | (동시 실행) |
| E2E browser | 미실행 — 한계 기록 |

---

## 9. Independent Review

| 항목 | 결과 |
|---|---|
| 시작점 명확 | PASS |
| Day1 미복제 | PASS |
| learn vs curriculum | PASS |
| Atlas 비메인 | PASS |
| Nav 과밀 방지 | PASS (7 + footer) |
| 준비 중 오인 방지 | PASS |
| 검증 철학 | PASS |
| 자산 훼손 없음 | PASS |
| 모바일 Day1 | PASS (시작하기 우선) |
| 빈 페이지 남발 없음 | PASS |

**IR:** `approve_with_notes` — E2E 없음; xl 미만 데스크톱 내비는 햄버거(의도).

---

## 10. 운영자 확인 항목

1. 홈 CTA → /start → Day1  
2. Desktop/Mobile 내비  
3. /learn Track A만 활성  
4. /lab deep-link  
5. /verification 수정 제안 채널  
6. Atlas·curriculum·lessons 회귀  
7. Day1 시뮬 동작  

---

## 11. 알려진 제한

- tools/tech 본문 없음 (의도)  
- Day2 미확정  
- xl 미만 상단 전체 메뉴 숨김 → 모바일 패턴  
- GitHub Issue 템플릿 파일 미추가 (Instagram + 안내)  

---

## 12. Day 2 후보 비교

| | A 파일 구조 | B Node·npm·package.json | C AI·LLM·IDE 관계 |
|---|---|---|---|
| 지금 필요 | Path B 후 “폴더가 왜?” | 실행 명령 심화 | 이론 공백 메우기 |
| 선수 | Day1 Path A/B | Day1 Path B | Day1 Path A |
| Outcomes | 트리 읽기·진입점 | install/run 설명 | 용어 구분 한 줄 |
| 실습 | 샘플 트리 스케치 | 명령 재실행 | 프롬프트 비교 |
| 애니 | file-tree 확장 | terminal+install | ai-conversation |
| Day1 연결 | generating 장면 | install/run | requesting |
| 다음 | HTML/CSS | FE 입문 | Tool library |

**권장(제안):** **A → B → C** (손 실습 연속성). 최종은 운영자.

---

## 13. push / deploy

**미실행**
