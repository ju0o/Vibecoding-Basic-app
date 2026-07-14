# Day 1 Operator Review Package

```yaml
verdict_target: READY_FOR_DAY1_OPERATOR_REVIEW
date: 2026-07-14
website_wired: false
push_deploy: false
```

운영자가 **개발 지식 없이** Day 1 교육자료를 검토하기 위한 통합 문서입니다.

---

## A. Day 1 한눈에 보기

| 항목 | 내용 |
|---|---|
| Lesson | 첫 성공 — AI와 함께 결과물을 실행하기 (`d1-first-success`) |
| Course | vibe-coding-foundation · order 1 |
| Stage | `D1_first_success` |
| Student Question | 바이브코딩이란? · AI 요청 시 왜 파일? · 왜 Node/터미널? |
| Why Now | 이론 전에 작은 성공 → 이후 학습 환경 준비 |
| Path A | 설치 없이 HTML+브라우저 첫 성공 (~10분 **목표**, 보장 표현 아님) |
| Path B | VS Code · Node · 터미널 · `examples/day1-first-success` · **시간 보장 없음** |
| Outcomes | O1–O13 (Excel 시트 Day 1 Outcomes) |
| 예상 시간 | Path A only 25–40분 수업 · A+B 60–150분 가변 |
| 준비물 | 브라우저, AI 채팅, (B) 설치 권한·Node·편집기 |

---

## B. 파일 지도

| 자료 | 경로 | 역할 | SSOT? | 파생 | 상태 |
|---|---|---|---|---|---|
| Curriculum CSV | `ai-ops/curriculum/CURRICULUM_MASTER.csv` | 커리큘럼 인덱스 | **Yes** | → xlsx | drafting |
| Curriculum XLSX | `exports/curriculum/CURRICULUM_MASTER.xlsx` | 운영자 Excel 검토 | No | from CSV | generated |
| Course | `content/courses/.../course.md` | 코스 메타 | Yes | — | drafting |
| Student MD | `content/courses/.../lessons/01-first-success.md` | 학생 원본 | **Yes** | → student DOCX | drafting |
| Student DOCX | `exports/student/DAY1-처음으로-AI와-프로그램-실행하기.docx` | 읽기 쉬운 학생본 | No | from MD | generated |
| Instructor MD | `content/instructor/.../01-first-success-instructor.md` | 강사 원본 | **Yes** | → DOCX | drafting |
| Instructor DOCX | `exports/instructor/DAY1-강사용-대본.docx` | 수업 대본 | No | from MD | generated |
| Practice | `content/practice/.../01-first-success-practice.md` | 실습 절차 | Yes | — | drafting |
| Interaction | `content/interactions/.../01-first-success-interaction-spec.md` | 애니 명세 | Yes | → Storyboard | drafting |
| Storyboard | `exports/review/DAY1-INTERACTION-STORYBOARD.md` | 장면 검토 | No | from spec | generated |
| Assessment | `content/assessment/.../01-first-success-assessment.md` | 평가 | Yes | — | drafting |
| Outcome contract | `ai-ops/curriculum/DAY1-OUTCOME-CONTRACT.md` | O1–O13 | Yes | → xlsx sheet | draft |
| Source pack | `ai-ops/reports/research/DAY1-SOURCE-PACK.md` | 공식 출처 | Yes | — | partial |
| Sample project | `examples/day1-first-success/` | Path B 실행 대상 | Yes (example) | — | verified |
| This package | `exports/review/DAY1-OPERATOR-REVIEW-PACKAGE.md` | 통합 검토 | No | — | active |

**규칙:** 내용 수정은 항상 **Markdown/CSV 원본**. XLSX/DOCX는 재생성.

---

## C. 학생 경험 (처음부터 끝까지)

```text
1. 목표·준비 확인
2. Path A: AI에 HTML 요청 → 저장 → 브라우저 → 수정 1회   ← 첫 성공
3. 짧은 이해: 바이브코딩, 파일이 생기는 이유, IDE
4. Path B: VS Code/Node 확인 → 터미널 → node/npm -v
5. 샘플 폴더 열기 → npm install → npm run dev → localhost
6. main.js 한 줄 수정 → 새로고침
7. 오류 나면 복사 → AI 템플릿
8. Outcome Check · 정리 · 다음이 필요한 이유
```

설치가 막히면 4–6을 미루고 Path A 성공은 유지 (Partial).

---

## D. 강사 경험

```text
준비: 학생 DOCX/MD, 샘플 프로젝트, 오프라인 HTML, Outcome 시트
오프닝 → Path A 시연·실습 → Theory → IDE
→ Path B 랩(가변) → package.json 한 줄 → 오류 연습
→ Outcome · 다음 연결 멘트
지연 시: Path B를 버전 확인까지 축소, Path A·리듬·오류 전달은 유지
```

DOCX에서 **파란 줄 = 말할 말**, **노란 음영 = 강사 메모**.

---

## E. 실습

| | Path A | Path B (sample) |
|---|---|---|
| 명령/행동 | 저장·브라우저 열기 | `npm install` · `npm run dev` |
| 기대 | 제목+인사 문구 | http://127.0.0.1:3456 카드 UI |
| 실패 | 확장자 .txt, 부분 복사 | node 없음, 잘못된 폴더, 포트 |
| 복구 | 새 파일명, 전체 코드 | 터미널 재시작, Ctrl+C, README |

검증: 로컬에서 HTTP 200 + 제목 문자열 확인 (2026-07-14).

---

## F. 애니메이션

- 명세: interaction-spec  
- 운영자용: `DAY1-INTERACTION-STORYBOARD.md` (10 장면)  
- **필수:** 요청 카드 이동, 파일 트리 생성, 서버 LED, 미리보기 변화, 수정 glow, 오류→복사  
- **비인정:** 텍스트 Stepper만  

구현은 콘텐츠 승인 **이후**.

---

## G. 평가

| | 기준 |
|---|---|
| 최소 완료 | Path A O2/O3/O11 Independent; O1/O4 Assisted; Path B O5–O8 Assisted 또는 보류; O13 Assisted |
| 권장 | Path B localhost + O12 등 Independent/Explainable |
| 등급 | Observed / Assisted / Independent / Explainable |
| 재학습 | Path A 수정 설명 불가, 오류 숨김, dev 만능 암기 오해 |

상세: assessment MD · Excel “Day 1 Outcomes”.

---

## H. 사실 검증

| 주장 | 출처 | 검증일 | 해석? | 재확인 |
|---|---|---|---|---|
| Node = JS 런타임(브라우저 밖) | nodejs.org | 2026-07-14 | 단순화 | 배포 전 |
| npm = 패키지 관리, install | nodejs.org learn | 2026-07-14 | | 배포 전 |
| npm run = scripts | docs.npmjs.com | 2026-07-14 | | |
| VS Code 설치/문서 | code.visualstudio.com | 2026-07-14 | 예시 도구 | |
| 단일 HTML 브라우저 실행 | 웹 플랫폼 | 2026-07-14 | | |
| LTS 번호 | — | — | **고정 안 함** | 설치 당일 |

Source pack: `ai-ops/reports/research/DAY1-SOURCE-PACK.md`.

---

## I. 운영자가 직접 결정할 항목

1. Day 1에 **Node 설치(Path B)를 필수**로 둘 것인가, Path A 최소 완료를 허용할 것인가?  
2. Path A 기본 수단을 **HTML+브라우저**로 확정할 것인가? (다른 기본 도구?)  
3. 학생용 설명 **분량**이 오프라인 수업 / 자율학습에 적절한가?  
4. package.json 설명 **깊이**가 Day 1에 적절한가?  
5. Day 1 본문에 **Git을 언급**할 것인가? (현재 본문은 “다음에” 수준)  
6. 샘플 프로젝트 **디자인 톤**(연한 파랑 카드)을 유지할 것인가?  
7. 오프라인 수업과 온라인 자율학습을 **같은 콘텐츠**로 지원할 것인가?  
8. 강사 DOCX를 수업 정본으로 쓸 것인가, 항상 MD 재생성 후 쓸 것인가?  
9. Independent Review를 **다른 사람이 재스탬프**할 것인가?  
10. 사이트 연결 승인 전 **추가 수정 라운드**가 필요한가?

---

## J. 승인 선택지

아래 중 하나를 답으로 남겨 주세요.

| 코드 | 의미 |
|---|---|
| **APPROVE_AS_IS** | 원본 유지, 사이트/애니 설계 착수 가능(별도 구현 게이트) |
| **APPROVE_WITH_MINOR_REVISIONS** | 소수정 후 진행 (목록 첨부) |
| **REVISE_LEARNING_FLOW** | Path A/B·순서 재설계 |
| **REVISE_PRACTICE** | 실습·샘플 프로젝트 수정 |
| **REVISE_CONTENT_DEPTH** | 설명 양·깊이 조절 |
| **REVISE_INTERACTION** | 애니/스토리보드 수정 |

---

## 열어볼 파일 (권장 순서)

1. `exports/curriculum/CURRICULUM_MASTER.xlsx`  
2. `exports/student/DAY1-처음으로-AI와-프로그램-실행하기.docx`  
3. `exports/instructor/DAY1-강사용-대본.docx`  
4. `examples/day1-first-success/README.md` (+ 직접 실행)  
5. `exports/review/DAY1-INTERACTION-STORYBOARD.md`  
6. 본 문서 §I–J 결정  
