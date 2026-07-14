# 파일이 서로 연결되는 방식

```yaml
lesson_id: files-connect
node_id: B05
order: 11
prev: javascript-basics
next: frontend
track: B
verified_at: 2026-07-14
sample: examples/day1-first-success
```

## 학생 질문

- HTML·CSS·JS 파일은 어떻게 한 페이지가 되나요?
- `link`와 `script`는 무엇을 하나요?
- 파일 경로가 틀리면 왜 스타일/동작이 사라지나요?

## 지금 배우는 이유

이미 HTML/CSS/JS를 각각 봤습니다. 이번에는 **세 파일이 한 화면으로 합쳐지는 연결**을 읽습니다. AI에게 “버튼 색 바꿔”라고 할 때 **어느 연결을 건드릴지** 고르기 위한 기초입니다.

## 핵심 개념 (교육 모델)

1. **HTML** — 뼈대와 **참조 지점**
2. **CSS** — 보통 HTML이 `link rel="stylesheet"`로 불러옴
3. **JS** — 보통 HTML이 `script src="..."`로 불러옴
4. 브라우저는 HTML을 읽다가 연결을 따라가 **함께 로드**합니다.
5. 경로가 틀리면 그 레이어만 **조용히 실패**할 수 있습니다 (화면 일부만 이상해 보임).

Day1 샘플 앵커:

```html
<link rel="stylesheet" href="./style.css" />
<script src="./main.js"></script>
```

## 실습

1. `src/index.html`에서 `link` / `script` 한 줄씩 찾기
2. (선택) 경로를 일부러 틀려 보고 → 복구하기 (로컬에서만)
3. AI 요청 연습: “style.css 연결은 유지하고 제목 색만 바꿔 주세요”

## Outcome

- [ ] 파일이 분리돼도 **참조로 연결**됨을 설명한다
- [ ] Day1 샘플에서 CSS/JS 연결 줄을 가리킨다
- [ ] 경로 오류 시 “연결 문제” 후보를 말할 수 있다

## Atlas / Tool / Technology

- Technology: HTML, CSS, JavaScript, 브라우저
- Tool: VS Code / AI IDE (파일 열기·경로 확인)
- Atlas: Context (관련 파일만 보여 주기) — 예고

## Sources

교육용 연결 모델 · WHATWG/MDN 개념 정렬 · 제품 순위 없음 · verified_at 2026-07-14

## Next

Frontend — 브라우저 쪽 UI의 자리
