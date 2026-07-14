# 코드 검토와 QA

```yaml
lesson_id: qa-basics
node_id: C07
order: 22
prev: fix-loop
next: ai-agent
track: C
verified_at: 2026-07-14
depth: review_ready_remediation
```

## 학생 질문

- AI가 줬으면 끝난 건가요?
- 무엇을 검사해야 하나요?
- Quiz 점수와 QA는 같나요?

## Why Now

수정 루프를 돌리면 “일단 돌아간” 상태가 됩니다.  
**생성 = 완료가 아닙니다.** 범위·비밀·실행·의도 확인이 필요합니다.

## 검사 항목 (최소)

1. 요청 **범위** 안의 파일만 바뀌었는가  
2. **비밀/키**가 결과·채팅·커밋에 없는가  
3. **실행 또는 화면**으로 확인했는가  
4. 의도하지 않은 리팩터·의존성 추가가 없는가  

## Outcome ≠ Quiz only

퀴즈는 개념 확인.  
Outcome은 **수행 증거**(체크·화면·설명).

## 실습

1. 인터랙티브 QA 체크리스트를 모두 켠다.  
2. 최근 AI 답변 1건에 동일 항목 적용.  
3. 실패 항목이 있으면 C06 루프로 되돌린다.

## Outcome

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-C07-1 | 생성≠완료 설명 | Explainable | 문장 |
| O-C07-2 | 검사 3항목 이상 | Independent | 체크 기록 |
| O-C07-3 | 비밀 미포함 확인 | Observed | 요청/결과 검토 |

## Sources

- educational_interpretation: human verification gate  
- verified_at: 2026-07-14  

## Next

도구가 여러 단계를 돌 때 → **Agent** (교육 개념)
