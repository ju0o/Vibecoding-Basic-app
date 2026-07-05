APPROVED 88

# Knowledge Verification Report: html-semantic-elements

검증일: 2026-07-06  
대상: `ai-ops/knowledge-base/entries/T02/html-semantic-elements.md`  
판정: APPROVED

## 게이트 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | semantic element, content sectioning, main/nav/article/section, div 역할 주장이 MDN 원문과 연결된다. |
| G2 필수 섹션 존재 | PASS | 정의부터 변경 이력까지 필수 섹션과 Quote Bank 존재. |
| G3 frontmatter 완전 | PASS | id, topicGroup, level, sources, updated 포함. |
| G4 URL 접속 가능 | PASS | frontmatter sources 5개 모두 재접속 확인, checked 날짜 2026-07-06 존재. |

## 원문 재접속 기록

| URL | 접속 | 판정 |
|---|---:|---|
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements | OK | SOURCE-REGISTRY 1순위 MDN |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main | OK | SOURCE-REGISTRY 1순위 MDN |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav | OK | SOURCE-REGISTRY 1순위 MDN |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article | OK | SOURCE-REGISTRY 1순위 MDN |
| https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section | OK | SOURCE-REGISTRY 1순위 MDN |

## 원문 대조 요약

| 주장 | 대조 출처 | verdict |
|---|---|---|
| HTML elements는 tags로 만들어지고 기능별로 그룹화된다. | MDN HTML elements reference | PASS |
| content sectioning elements는 document content를 logical pieces로 조직한다. | MDN HTML elements reference | PASS |
| `<main>`은 body의 dominant content를 나타낸다. | MDN `<main>` element | PASS |
| `<nav>`는 navigation links를 제공하는 page section이다. | MDN `<nav>` element | PASS |
| `<article>`은 independently distributable or reusable composition이다. | MDN `<article>` element | PASS |
| `<section>`은 더 구체적인 semantic element가 없을 때 쓰는 generic standalone section이며 heading 권고가 있다. | MDN `<section>` element | PASS |
| `<div>`는 styling 전에는 content/layout effect가 없는 generic container다. | MDN HTML elements reference | PASS |

## Source Registry 판정

- 공식 출처 비중: 100% MDN.
- 보조 body citation으로 MDN DOM URL이 사용되지만 frontmatter sources에는 없다.
- 기존 P-02 관례에 따라 body-only 공식 URL은 G 실패가 아니라 S1/S7 감점으로 처리한다.

## 점수표

| 기준 | 점수 | 근거 |
|---|---:|---|
| S1 공식 출처 | 19/20 | 핵심 주장은 모두 MDN 공식 문서와 연결. body-only DOM citation으로 1점 감점. |
| S2 최신성 | 15/15 | sources checked 2026-07-06, 원문 재접속 완료. |
| S3 교육 적합성 | 14/15 | 정의와 선행 흐름이 초보자에게 적합하다. |
| S4 예시 품질 | 9/10 | 학습 사이트 구조 HTML 예시가 구체적이다. |
| S5 AI 시대 연관성 | 9/10 | AI 생성 HTML 검토 기준으로 semantic boundary를 연결한다. |
| S6 실무 활용성 | 14/15 | 페이지 골격, sidebar nav, article/card 예시와 실수 교정이 실제적이다. |
| S7 용어 일관성 | 8/15 | HTML/CSS/JavaScript 표기는 glossary와 일치. `accessibility-basics`는 아직 backlog/KB 실존 id가 아니며, Semantic HTML 용어는 glossary에 미등록. |

총점: 88 / 100

## 승인 조건

- status를 `approved`로 변경 가능.
- score를 `88`로 기록.
- 비차단 권고: 후속 P-04/P-05에서 `Semantic HTML`, `Accessibility` 용어와 `accessibility-basics` 예약 ID 정리를 검토한다.
