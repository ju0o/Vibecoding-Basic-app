# 오류 메시지는 실패 증명서가 아니라 AI에게 줄 재료입니다

```yaml
lesson_id: errors-to-ai
order: 6
prev: terminal-commands
next: web-how-pages-appear (Track B · next batch)
sources_checked_at: 2026-07-14
```

## 자리

명령을 치면 가끔 빨간 글자가 납니다.  
오늘은 **당황 → 복사 → 맥락과 함께 AI에게** 루프를 몸에 익힙니다.

## 질문

- 오류를 보면 뭐부터 하나?  
- AI에게 뭘 붙여 넣어야 도움이 되나?  
- 비밀(키·비밀번호)은?

## 진단 순서

```text
1 현재 폴더
2 실행한 명령 전문
3 오류 메시지 전체
4 package.json scripts (해당 시)
5 원하는 결과
6 “아직 수정하지 말고 원인 분석” (선택)
```

## 안전한 전달

- API 키·토큰·비밀번호 **지우기**  
- 개인 경로 중 민감 부분은 가리기 가능  

## 템플릿

```text
목표: ...
OS: Windows / macOS / ...
현재 폴더: ...
실행한 명령:
...
오류 전문:
...
package.json scripts (있으면):
...
아직 파일을 마음대로 고치지 말고, 원인 후보와 확인 순서만 알려 주세요.
```

## Outcome

- [ ] 오류를 숨기지 않고 복사  
- [ ] 폴더·명령·오류를 묶음  
- [ ] 비밀 제외  
- [ ] 분석 요청 문장 작성  

## Next (Track B)

웹사이트는 **어떻게 화면에 나타날까?** → Batch 2
