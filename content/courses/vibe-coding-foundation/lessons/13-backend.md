# Backend란 무엇인가

```yaml
lesson_id: backend
node_id: B07
order: 13
prev: frontend
next: api
track: B
verified_at: 2026-07-14
```

## 학생 질문

- Backend는 어디에 있나요?
- `server.js`는 Backend인가요?
- 왜 브라우저만으로 부족한가요?

## 지금 배우는 이유

Frontend만 알면 “화면”은 보이지만, **파일 제공·로직·데이터 보호** 같은 일은 보통 서버 쪽이 맡습니다. Day1에서 Node로 서버를 켠 이유를 **역할 이름**으로 연결합니다.

## 핵심 (교육 경계)

- **Backend (BE)** — 사용자 화면 뒤에서 동작하는 쪽. 요청을 받고, 규칙에 따라 처리하고, 파일·데이터·다른 서비스와 연결합니다.
- Day1의 `server.js`는 **아주 작은 Backend 역할 예시**: 브라우저 요청에 로컬 파일을 응답합니다.  
  → 완전한 앱 Backend(로그인·결제 등)는 아닙니다. **교육용 미니 서버**.
- Backend는 특정 언어 전용 이름이 아닙니다. Node, 다른 런타임, 서버리스 함수 등 **형태는 다양**합니다 (제품 순위 없음).

## Frontend vs Backend (한 표)

| | Frontend | Backend (개념) |
|---|---|---|
| 주로 보이는 곳 | 브라우저 | 서버/클라우드 쪽 |
| Day1 예시 | html/css/js | server.js |
| 학생 체감 | 화면 문구·색 | `npm run dev` 로 서버 실행 |

## 실습

1. `server.js` 상단 주석 읽고 “무엇을 응답하나?” 한 줄 쓰기
2. 서버를 끄면 브라우저가 어떻게 되는지 관찰 (로컬)
3. AI 요청: “server.js 포트 설명만 / 화면 문구는 수정 금지”

## Outcome

- [ ] BE를 “화면 뒤 처리 쪽”으로 설명한다
- [ ] Day1 server.js를 미니 Backend 예시로 연결한다
- [ ] FE와 한 줄 구분

## Next

API — 양쪽이 대화하는 창구
