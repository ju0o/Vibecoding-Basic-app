# HTML은 화면의 뼈대입니다

```yaml
lesson_id: html-basics
node_id: B02
order: 8
prev: web-how-pages-appear
next: css-basics
track: B
verified_at: 2026-07-14
depth: review_ready_remediation
sample: examples/day1-first-success/src/index.html
```

## 학생 질문

- HTML이 뭐고, 왜 태그로 감싸나요?
- 제목과 문단은 어디에 쓰나요?
- HTML만으로 버튼 동작까지 끝나나요?

## Why Now

화면이 나타나는 순서를 봤습니다.  
그중 **첫 문서**가 HTML입니다. 스타일·동작 전에 “무엇이 있는지”를 적습니다.

## 핵심

- **HTML** = 페이지의 **구조와 의미** (제목, 문단, 링크, 구역…).
- 태그는 “이 텍스트의 역할”을 표시합니다. 예: `h1` 큰 제목, `p` 문단.
- Day1 샘플: `src/index.html` 이 뼈대. `link`/`script`로 CSS·JS를 **연결**합니다 (자세한 연결은 B05).

## 오개념

| 오해 | 교정 |
|---|---|
| HTML = 디자인 | 디자인은 주로 CSS 몫 |
| HTML만으로 모든 앱 완성 | 동작·저장·서버는 별 레이어 |
| 태그 이름은 마음대로 아무거나 | 브라우저가 이해하는 표준 요소를 쓰는 것이 안전 (교육) |

## 실습 (실행)

1. `examples/day1-first-success/src/index.html` 연다.  
2. `h1` 또는 제목 문구를 찾는다.  
3. 문구를 한 군데만 바꾼다 → 저장 → 서버 켠 상태로 새로고침.  
4. **기대:** 화면에 새 문구.  
5. **실패 예:** 확장자/경로 오류, 서버 미실행.  
6. **복구:** Day1 경로로 다시 실행, 오류를 A06 방식으로 AI에 전달.

## Outcome

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-B02-1 | HTML=구조 한 줄 | Explainable | 문장 |
| O-B02-2 | index.html에서 제목 위치 가리키기 | Observed | 파일 위치 |
| O-B02-3 | 작은 텍스트 수정 성공 | Independent | 화면 변경 |

## Sources

- primary_source: HTML living standard / MDN HTML elements (개념)  
- educational_interpretation: “뼈대” 비유  
- verified_at: 2026-07-14  

## Next

꾸밈이 필요하면 → **CSS**
