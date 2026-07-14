# 오류 수정 Loop

```yaml
lesson_id: fix-loop
node_id: C06
order: 21
prev: task-breakdown
next: qa-basics
track: C
verified_at: 2026-07-14
depth: review_ready_remediation
```

## 학생 질문

- 오류가 나면 AI에게 뭐부터 시키나요?
- 한 번에 여러 파일을 고치게 해도 되나요?
- “되는 것 같아요”로 끝내면 안 되는 이유는?

## Why Now

작은 작업으로 나눠도 오류는 납니다.  
A06에서 오류 전달을 배웠고, 지금은 **반복 루프**로 고정합니다.

## 5단계 Loop (교육)

1. **재현** — 같은 명령/클릭으로 다시 낸다  
2. **증거** — 폴더, 명령, 오류 전문, 관련 scripts  
3. **가설 1개** — 원인 후보를 하나만  
4. **작은 수정** — 한 곳(또는 최소)  
5. **재실행** — 같은 방법으로 확인 · 기록  

AI에게는 “전체 리팩터”보다 **이 루프 한 바퀴**를 맡기는 편이 안전합니다.

## 오개념

| 오해 | 교정 |
|---|---|
| 오류 문구를 읽지 않고 재생성 | 증거 없이 더 커질 수 있음 |
| 한 번에 10파일 수정 | 원인 추적이 어려움 |
| 한 번 성공 = 영구 해결 | 다른 경로에서 재발 가능 → QA |

## 실습

1. 인터랙티브로 5단계를 순서대로 진행·리셋.  
2. 실제 또는 기억 오류 하나를 5칸 워크시트에 채운다.  
3. A06 요청 조립기와 연결: 증거 칸 채우기.

## Outcome

| ID | 행동 | 수준 | 증거 |
|---|---|---|---|
| O-C06-1 | 5단계 순서 | Explainable | 구두/메모 |
| O-C06-2 | 증거 포함 요청 | Independent | 요청문 |
| O-C06-3 | 한 가설·한 수정 | Assisted | 변경 범위 |

## Sources

- educational_interpretation: debugging loop  
- links: A03 Missing script, A06 packet  
- verified_at: 2026-07-14  

## Next

고친 뒤 사람이 확인 → **QA**
