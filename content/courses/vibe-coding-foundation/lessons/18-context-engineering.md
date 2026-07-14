# Context Engineering 기초

```yaml
lesson_id: context-engineering
node_id: C03
order: 18
prev: prompt-engineering
next: related-files-context
track: C
verified_at: 2026-07-14
```

## 학생 질문

- 프롬프트만 잘 쓰면 충분한가요?
- Context는 무엇인가요?
- 왜 긴 대화가 흐려지나요? (개념)

## 핵심 (교육)

- **Context** — 모델이 **이번 응답을 만들 때 볼 수 있는 정보** (대화, 파일, 도구 결과, 시스템 지시 등).
- **Context Engineering** — 필요한 정보를 **골라 넣고**, 불필요한 것을 **빼며**, 한계를 아는 실천 (교육 라벨; 단일 공식 표준 아님).
- 창(컨텍스트 윈도)에는 **한계**가 있어 전부 넣을 수 없습니다.
- 좋은 프롬프트 + **잘못된/과다 컨텍스트** = 여전히 실패할 수 있음.

## Day1 연결

“제목 색만” 요청인데 `server.js` 전체를 붙여 넣으면 모델이 **엉뚱한 수정**을 제안할 수 있습니다.

## Outcome

- [ ] Context ≠ Prompt 전체와 동일하지 않음을 구분  
- [ ] 넣을 것/빼 볼 것 한 가지씩 말함  
- [ ] 한계가 있음을 인정  

## Next

관련 파일만 AI에게 보여주기
