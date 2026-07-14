# Learning Node Spec

```yaml
document: LEARNING_NODE_SPEC
authority: learning_node_contract_ssot_candidate
status: operator_review_required
parent: STUDENT_JOURNEY.md
sibling: LEARNING_ROADMAP.md
date: 2026-07-14
modifies_core_21_concepts: false
code_change: false
```

---

## 1. 목적

Learning Node는 Journey 위의 **한 성장 단위**다.  
강의 파일 하나 = 노드 하나일 수 있으나, **파일이 아니라 학생 경험 계약**이 정본이다.

모든 공개 노드는 아래 필드를 갖거나, 작성 중이면 **명시적 빈 칸 + status**를 남긴다.

---

## 2. 노드 타입

| type | 학생 경험 | 필수 강조 필드 |
|---|---|---|
| `lesson` | 읽고 이해 | student_question, why_now, completion |
| `lab` | 손 실습 | practice, common_mistakes, completion |
| `tool` | 도구 설치·사용 | tools, practice, why_now |
| `project` | 여러 개념 통합 산출 | practice, completion, next_why |
| `checkpoint` | 이해 점검 | quiz / teach-back, completion |
| `atlas_ref` | Path에서 심화 링크 (노드 본문 아님) | atlas_refs only — Path 대체 금지 |

---

## 3. 필수 필드 계약

| 필드 | 설명 | 작성 규칙 |
|---|---|---|
| `node_id` | 고유 ID (예: `sj-foundation-vibe-01`) | 안정적; 제목 변경과 분리 |
| `title` | 학생용 제목 | 가능하면 질문형 또는 행동형 |
| `order` | Journey 순서 (실수 허용 · Living) | Roadmap 단계 안에서의 상대 순서 |
| `stage` | Roadmap stage id | START … END 구간 |
| `type` | 위 타입 | 필수 |
| `student_question` | **이 노드를 시작하는 질문** | 기술 라벨만 두지 말 것 |
| `knows_before` | 오기 전 알고 있어도 되는 것 | 선수 최소 |
| `curious_now` | 지금 궁금한 상태 (감정·막힘) | 1–2문장 |
| `why_learn` | 왜 이걸 배우는가 | 학생 언어 |
| `why_now` | 왜 **지금** 순서인가 | 직전 노드와 연결 |
| `learns` | 이 노드 후 이해·할 수 있는 것 | 불릿 3개 내외 |
| `practice` | 직접 해보는 것 | 클릭·설치·확인 가능한 단위 |
| `common_mistakes` | 자주 하는 실수 | 비개발자 관점 |
| `atlas_refs` | 참고 Atlas Concept / 주제 | optional; Path 대체 금지 |
| `tools` | 관련 Tool | 필요할 때만 |
| `next_node` | 다음 노드 id | 또는 분기 설명 |
| `next_why` | 다음 강의가 이어지는 이유 | 한 문장 이상 |
| `completion` | 완료 조건 | “읽음”만으로 부족하면 보완 |
| `recommended_practice` | 추천 실습 (확장) | practice와 중복 가능 · 상세용 |
| `recommended_animation` | 추천 애니메이션 시나리오 | optional |
| `recommended_diagram` | 추천 다이어그램 | optional |
| `quiz_or_teachback` | 이해 점검 | checkpoint에서 필수 |
| `status` | 제작 상태 | §5 |
| `source_status` | 근거 상태 | verified / partial / draft |
| `markdown_path` | 학생 본문 경로 | 없으면 `tbd` |
| `last_verified` | 확인일 | YYYY-MM-DD |

### 필수 최소 세트 (초안 통과)

다음이 비어 있으면 **Publish / Website 금지**:

```text
student_question
why_learn
why_now
practice (lab/tool/project) 또는 learns (lesson)
completion
next_why
status
```

`atlas_refs` · animation · diagram · quiz는 노드 타입에 따라 단계적으로 채운다.  
완전 공개(student-facing publish) 시 lesson은 quiz 또는 teach-back 중 하나 권장.

---

## 4. 필드 작성 예시 (축약)

```yaml
node_id: sj-tools-node-01
title: 왜 Node를 설치해야 하나요?
type: tool
stage: tools_runtime
student_question: 왜 내 컴퓨터에 Node를 깔아야 하나요?
knows_before:
  - 터미널에 글자를 칠 수 있다
  - AI IDE에서 프로젝트를 연 적이 있다
curious_now: AI가 만든 코드를 실행하라는데 뭘 설치해야 하는지 모르겠다
why_learn: 많은 웹·도구 코드가 Node 환경에서 돌아가기 때문
why_now: VS Code로 파일을 열 수 있게 된 다음, 실행 환경이 필요해서
learns:
  - Node가 “자바스크립트를 실행하는 환경” 감각으로 설명 가능
  - node -v 로 설치 확인 가능
practice:
  - 공식 안내에 따라 LTS 설치
  - 터미널에서 node -v 확인
common_mistakes:
  - PATH 미설정으로 명령어를 못 찾음
  - 버전을 확인하지 않고 다른 튜토리얼 버전과 혼동
atlas_refs:
  - runtime (Knowledge: Runtime · JS engine 감각)
tools:
  - Node.js
  - Terminal
next_node: sj-tools-terminal-01
next_why: 설치 후 명령을 입력하는 창(터미널)을 익혀야 실습이 이어짐
completion:
  - node -v 결과를 스스로 확인했다
  - “왜 설치했는지”를 한 문장으로 말할 수 있다
recommended_animation: 설치 → PATH → 버전 확인 3스텝
recommended_diagram: 파일 → Node runtime → 출력
status: drafting
source_status: partial
```

---

## 5. 상태 머신 (노드 단위)

```text
idea
  → question_captured      # 학생 질문 확정
  → researching
  → source_verified
  → drafting               # 본문·실습 초안
  → reviewing              # Independent Review
  → published_path         # Journey에 연결 · Viewer 반영 가능
  → living_update          # 피드백 후 수정 루프
```

Studio 교육 제작 보드는 이 상태 + 하위 체크를 보여 준다:

```text
학생 질문 | Research | 출처 | 검증 | 작성 | 실습 | 애니 | 퀴즈 | Reviewer | 최근 수정 | 피드백 | 다음 작업
```

---

## 6. 제작 순서 (노드 1개)

```text
학생 질문
  → Research
  → Claim Verification
  → Curriculum (Roadmap 위치 · why_now)
  → Education Content (learns · 쉬운 설명)
  → Practice
  → Animation
  → Diagram
  → Quiz
  → Review
  → Publish
  → Website
```

Website 반영은 **Review 승인 후**만.  
Implementer는 이 스펙 필드를 채운 Markdown/스펙 없이 라우트만 만들지 않는다.

---

## 7. Atlas 연결 규칙

| 해도 됨 | 하면 안 됨 |
|---|---|
| `atlas_refs`로 심화 링크 | Atlas 챕터를 노드 본문 대신 사용 |
| “Runtime이 궁금하면 Atlas” | Path 순서를 Concept 번호로 강제 |
| 복귀 문장: “이제 강의로 돌아가…” | Atlas만 보고 완료 처리 |

---

## 8. Tool 연결 규칙

- Tool은 **필요할 때** `tools`에 등장한다.  
- Tool-only 카탈로그 페이지가 Journey를 대체하지 않는다.  
- 설치 실수는 `common_mistakes`에 남긴다.

---

## 9. 완료 조건 품질 기준

| 약한 완료 | 강한 완료 |
|---|---|
| 페이지를 스크롤했다 | 한 문장으로 왜 배웠는지 말한다 |
| 영상을 틀었다 | 체크리스트 실습을 통과했다 |
| “알 것 같다” | teach-back 또는 퀴즈 통과 |

최소 1개의 **관찰 가능 행동**을 `completion`에 넣는다.

---

## 10. Excel / 저장 매핑 (승인 후)

`CURRICULUM_MASTER.xlsx` 및 노드 스펙 시트 열 후보:

`node_id, order, stage, title, type, student_question, why_learn, why_now, markdown_path, atlas_refs, tools, status, source_status, last_verified`

상세 서술 필드(`common_mistakes`, animation 등)는 Markdown frontmatter 또는 `ai-ops/curriculum/nodes/*.md` 스펙 파일에 둘 수 있다.  
**이번 단계에서는 파일 생성 의무 없음** — 계약만 확정.

---

## 11. 금지

- 필수 필드 없이 “강의 완료” 보고  
- student_question 없이 기술 제목만 게시  
- Website를 drafting 단계에서 먼저 구현  
- 21 Concept 수·14섹션 계약을 노드 필드로 변경  
- 기존 Course/Atlas 대규모 삭제

---

## 12. 성공 기준

1. 신규 노드는 본 스펙 템플릿으로 리뷰 가능하다.  
2. 운영자가 필드만 보고 “학생이 뭘 겪는지” 재현 가능하다.  
3. Studio 보드 열이 본 상태 머신과 대응한다.  
4. Atlas/Tool 링크가 Path를 침범하지 않는다.
