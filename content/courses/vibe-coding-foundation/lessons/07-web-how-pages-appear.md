# 웹사이트는 어떻게 화면에 나타날까요?

```yaml
lesson_id: web-how-pages-appear
node_id: B01
order: 7
prev: errors-to-ai
next: html-basics
track: B
verified_at: 2026-07-14
depth: review_ready_remediation
sample: examples/day1-first-success
```

## 학생 질문

- 주소를 치면 왜 화면이 보이나요?
- 로컬 `npm run dev` 와 인터넷 사이트는 같은 원리인가요?
- HTML/CSS/JS는 언제 합쳐지나요?

## 지금 배우는 이유 (Why Now)

Day1에서 서버를 켜고 브라우저로 열었습니다.  
오류를 AI에게 넘기는 법도 익혔습니다.  
이제 “그 화면이 **어떤 순서**로 만들어지는지”를 알아야, 다음에 HTML·CSS·JS를 나눌 수 있습니다.

## 한 줄 흐름 (교육 모델)

```text
주소 입력 또는 로컬 URL
  → 브라우저가 문서/자원을 요청
  → 서버(또는 파일)가 응답
  → 브라우저가 HTML 구조를 읽고
  → CSS로 꾸미고
  → JS로 동작을 더함
  → 화면에 그림
```

Day1 로컬에서는 `server.js`가 **아주 작은 서버** 역할로 파일을 건넵니다.  
인터넷의 대형 사이트와 규모는 다르지만, “요청 → 응답 → 해석 → 표시” 뼈대는 같습니다 (**교육 비유**, 제품 아키텍처 전부가 아님).

## 오개념 교정

| 오개념 | 바로잡기 |
|---|---|
| 브라우저가 코드를 “알아서 실행 파일로 컴파일한다” | 주로 **문서와 스크립트를 해석**해 화면을 그림 |
| HTML 파일만 있으면 항상 서버가 필요 없다 | 파일 직접 열기도 가능하지만, Day1 Path B는 **로컬 서버**로 배움 |
| CSS/JS는 자동으로 붙는다 | HTML이 **연결**해야 함 (다음 노드) |

## 실습 미리보기

인터랙티브에서 HTML/CSS/JS 레이어를 끄면 미리보기가 어떻게 바뀌는지 관찰합니다.  
그다음 Sample의 `index.html`을 열어 “뼈대 문서”를 눈으로 확인합니다.

## Outcome (증거 연결)

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-B01-1 | 요청→응답→표시 순서를 말한다 | Explainable | 자기 말로 3단계 이상 |
| O-B01-2 | Day1 서버의 역할을 한 줄로 | Assisted | “파일을 건네는 쪽” |
| O-B01-3 | 레이어 토글 결과를 설명한다 | Observed | 시뮬 결과 설명 |

## Sources

- educational_interpretation: 브라우저 로드 모델  
- primary_source candidates: MDN “How the web works” 계열 (개념)  
- product_specific: 없음  
- verified_at: 2026-07-14  

## Next Why Bridge

구조(HTML)를 알아야 레이어를 고칠 위치를 찾습니다 → **HTML 기초**
