# JavaScript는 동작을 더합니다

```yaml
lesson_id: javascript-basics
node_id: B04
order: 10
prev: css-basics
next: files-connect
track: B
verified_at: 2026-07-14
depth: review_ready_remediation
sample: examples/day1-first-success/src/main.js
```

## 학생 질문

- 버튼·문구 변경은 누가 하나요?
- HTML/CSS와 JS는 어떻게 다르나요?
- 예전에 배운 Node와 브라우저 JS는 같나요?

## Why Now

구조와 표현을 나눴습니다.  
“페이지가 반응한다”는 경험은 보통 **스크립트**와 연결됩니다.

## 핵심

- **JavaScript (JS)** = 페이지에서 **논리·동작·상호작용**을 다루는 언어 (교육 시작점).
- Day1: `src/main.js`가 추가 문구 등을 넣을 수 있음. HTML이 `script src`로 불러옴.
- **Node.js** = 브라우저 밖에서도 JS를 실행하는 **런타임** (A03).  
  같은 언어 가족이지만 **실행 장소와 할 수 있는 일**이 다릅니다.

## 오개념

| 오해 | 교정 |
|---|---|
| 모든 JS = Frontend | 서버(Node)에서도 JS 가능 |
| JS = Java | 다른 언어 |
| JS만 고치면 항상 안전 | 범위·검증 필요 (Track C) |

## 실습

1. `main.js`에서 문자열을 찾는다.  
2. 한 줄 수정 → 저장 → 새로고침.  
3. 인터랙티브에서 JS 레이어 off 시 추가 문구 사라짐 확인.  
4. **Teach-back:** “Node로 서버 실행”과 “브라우저 JS”를 한 문장씩.

## Outcome

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-B04-1 | JS=동작 | Explainable | 문장 |
| O-B04-2 | main.js 수정 | Independent | 화면 |
| O-B04-3 | Node vs 브라우저 JS 구분 | Explainable | 두 문장 |

## Sources

- primary_source: MDN JavaScript first steps (개념)  
- educational_interpretation: Day1 샘플 매핑  
- verified_at: 2026-07-14  

## Next

세 파일이 **어떻게 묶이는지** → 파일 연결 (B05)
