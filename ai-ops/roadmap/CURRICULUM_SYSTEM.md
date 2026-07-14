# Curriculum System

```yaml
parent: EDUCATION_PLATFORM_MASTER_PLAN.md
authority: curriculum_system_ssot_candidate
status: operator_review_required
date: 2026-07-14
living_education: true
```

---

## 1. 원칙

| 원칙 | 설명 |
|---|---|
| AI는 제안한다 | 커리큘럼 전체를 단독 확정하지 않는다 |
| 운영자는 학습자 관점으로 질문한다 | Day 1 감각 · 막히는 지점 |
| 함께 완성한다 | 제안 → 질문 → 조사 → 수정 루프 |
| Living | 틀리면 고친다. 버전·확인일을 남긴다 |

---

## 2. 커리큘럼 객체

```text
Track
  └─ Path Module (주 단위 또는 테마)
       └─ Path Node (한 학습 단위)
            ├─ content (Markdown)
            ├─ practice
            ├─ animation (optional)
            ├─ quiz / teach-back
            └─ atlas_refs[] (optional Knowledge links)
```

Atlas 21 Concept는 Path Node가 아니다. **참조 대상**이다.

---

## 3. 제안 · 승인 절차

```text
1. 운영자 질문 또는 학습 막힘 보고
2. Curriculum Agent: 노드 추가/재배치 제안
3. Source Research: 필요한 개념·도구의 공식 근거
4. 운영자: Approve / Revise / Reject (학습 체감 기준)
5. Content Pipeline 진입 (CONTENT_PIPELINE.md)
6. Independent Review
7. Viewer 반영
8. Studio 상태 갱신
```

**Human Gate:** Track 신설, Path 전면 재배치, 필수 선수 관계 변경.

**Agent 자율:** 노드 설명 개선안, 실습 문장, 퀴즈 초안 (Review 전 publish 금지).

---

## 4. Day 1 검증 질문 (운영자 체크리스트)

새 노드 승인 전 운영자가 물을 질문:

1. 비개발자가 10–20분에 읽을 수 있는가?  
2. 직전 노드 없이 이해 불가능한가? (선수 명시)  
3. “왜 지금 배우나?”에 한 문장으로 답하는가?  
4. 실습이 도구 설치·클릭·확인 가능한가?  
5. Atlas 링크가 있으면, Path를 대체하지 않고 심화인가?  
6. 과장·유행어·가격 순위가 본문을 지배하지 않는가?

---

## 5. 기존 자산 편입 규칙

| 기존 | 편입 |
|---|---|
| `src/content/curriculum.ts` 모듈 | Track/Module 후보로 매핑 |
| Foundation Atlas chapters AI–LLM | Path 초반 노드 + Atlas 양방향 링크 |
| Model Routing | Agency Track 하위 실습·이론 |
| 100강 V2 Deep Dive | Textbook depth · Path에서 “더 읽기” |
| Studio completeness | 노드/Concept 현황 보드 |

매핑 작업은 **스프레드시트 한 장**으로 시작하고, 코드 대이동은 하지 않는다.

---

## 6. Living update 루프

```text
학생/운영자 피드백
  → Claim 재검증
  → 본문 수정 (Markdown)
  → Review
  → Viewer
  → Studio “최근 수정”
```

피드백 저장 위치 (초기):  
`ai-ops/reports/feedback/` (승인 후 생성) · 복잡한 DB 없음.

---

## 7. AI 금지 행동

- 운영자 질문 없이 전체 Path 확정 선언  
- Atlas 21 Concept를 Path 순서로 강제  
- 미검증 최신 모델 순위를 커리큘럼 핵심에 삽입  
- Website 페이지를 먼저 만들고 본문을 나중에 채움  

---

## 8. 성공 기준

1. 모든 공개 Path 노드에 status · source_status · markdown_path가 있다.  
2. 변경 이력이 “왜 바꿨는지” 한 줄로 남는다.  
3. 운영자가 Day 1부터 한 바퀴 “따라 가며 질문”할 수 있는 초안 Path가 문서에 있다.  
4. Atlas는 커리큘럼 대체물이 아니라 참고 레이어로 명시된다.

---

## 9. 다음 실행 (문서 승인 후)

1. `CURRICULUM_MASTER.xlsx` 초안 1장 (foundation track only)  
2. 기존 100강 slug → track 매핑 표  
3. Home “Start Learning” 카피 초안 (구현 전 문구만)  
4. Studio에 Path 노드 상태 열 추가 (구현 Wave 별도)
