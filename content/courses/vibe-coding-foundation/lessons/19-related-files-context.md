# 관련 파일만 AI에게 보여주기

```yaml
lesson_id: related-files-context
node_id: C04
order: 19
prev: context-engineering
next: C05 task breakdown (Batch 5)
track: C
verified_at: 2026-07-14
```

## 학생 질문

- 프로젝트 전체를 다 붙여 넣어야 하나요?
- 어떤 파일을 고르면 되나요?
- @파일 / 첨부 기능은 왜 쓰나요? (도구 공통 패턴)

## 핵심

- **최소 관련 집합**: 목표와 직접 닿는 파일 + 연결 한 단계.
- Day1 “제목 문구” → `index.html` 또는 `main.js` (어디 문자열이 있는지) + 필요 시 `style.css`.
- `node_modules` · 비밀 · 거대한 로그는 **기본 제외**.
- 도구마다 첨부 UI는 다르지만, **관련 파일만** 원칙은 같습니다.

## 실습

인터랙티브에서 목표를 고르고 파일을 토글 → “관련도 점수/경고” 확인.

## Outcome

- [ ] 목표별 파일 2개 이하 우선 선택  
- [ ] 제외할 것(비밀/거대 폴더) 말함  
- [ ] 전체 붙여 넣기 습관을 줄인다  

## Batch 4 마무리

좋은 요청 → Prompt → Context → 관련 파일  
다음은 작업 분해 · 오류 수정 Loop · QA · Agent (Batch 5)
