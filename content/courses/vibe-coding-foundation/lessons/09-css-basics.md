# CSS는 보이는 느낌을 바꿉니다

```yaml
lesson_id: css-basics
node_id: B03
order: 9
prev: html-basics
next: javascript-basics
track: B
verified_at: 2026-07-14
depth: review_ready_remediation
sample: examples/day1-first-success/src/style.css
```

## 학생 질문

- 색·간격·글자 크기는 어디서 바꾸나요?
- HTML에 스타일을 다 적어도 되나요?
- CSS를 끄면 왜 화면이 허전해 보이나요?

## Why Now

뼈대(HTML)를 봤습니다. 같은 구조도 **보이는 방식**이 다르면 다른 페이지처럼 느껴집니다.

## 핵심

- **CSS** = 색, 여백, 글꼴, 배치 등 **표현**.
- Day1: `src/style.css`, HTML의 `link rel="stylesheet"`로 연결.
- 선택자(어떤 요소에) + 속성(무엇을) 패턴으로 읽기 시작합니다 (세부는 이후).

## 오개념

| 오해 | 교정 |
|---|---|
| CSS = 프로그래밍 언어와 동일 | 스타일 규칙 언어에 가깝게 시작 |
| 인라인 style만 쓴다 | 파일로 나누면 유지보수가 쉬움 (교육 권장) |
| CSS가 데이터를 저장한다 | 저장/로직은 다른 레이어 |

## 실습

1. `style.css`에서 배경색 또는 카드 관련 규칙을 찾는다.  
2. 색 값 하나를 바꾼다 → 저장 → 새로고침.  
3. 인터랙티브에서 CSS 레이어 off 시 차이 확인.  
4. **실패:** 연결 끊김(B05), 잘못된 선택자.  
5. **복구:** `link` 줄 확인, 철자 확인.

## Outcome

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-B03-1 | CSS=표현 설명 | Explainable | 문장 |
| O-B03-2 | style.css 위치 | Observed | 경로 |
| O-B03-3 | 색/여백 1곳 수정 | Independent | 화면 |

## Sources

- primary_source: MDN CSS first steps (개념)  
- educational_interpretation: “느낌/표현” 비유  
- verified_at: 2026-07-14  

## Next

클릭·문구 변경 등 **동작** → JavaScript
