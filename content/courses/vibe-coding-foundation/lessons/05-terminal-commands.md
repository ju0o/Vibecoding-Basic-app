# 터미널에 치는 글자는 왜 필요할까요?

```yaml
lesson_id: terminal-commands
order: 5
prev: ai-llm-ide
next: errors-to-ai
sources_checked_at: 2026-07-14
```

## 자리

Node·npm 수업에서 명령을 이미 쳐 봤습니다.  
오늘은 **터미널 = 글자로 컴퓨터에 지시하는 창** 감각과 **현재 폴더** 습관을 고정합니다.

## 질문

- 터미널은 왜 쓰나?  
- GUI와 뭐가 다른가?  
- 명령은 어디서 실행되나? (cwd)  
- `cd` · 경로 · package.json 위치

## 핵심

| 개념 | 설명 |
|---|---|
| 터미널/셸 | 글자 명령을 받는 인터페이스 |
| cwd | **지금 어느 폴더에 서 있는지** — 명령 성공의 열쇠 |
| 프로젝트 루트 | 보통 `package.json`이 있는 곳 |

Windows: PowerShell/Windows Terminal · macOS: Terminal · VS Code 통합 터미널.

**오개념:** 터미널 = 해킹 ❌ · 모든 명령을 외워야 함 ❌

습관:

```text
어디에 서 있지? → package.json 있나? → 어떤 명령? → 결과/오류 읽기
```

## 실습 (Day1 샘플)

1. 터미널 열기  
2. 프로젝트 루트로 이동  
3. `node -v` / `npm -v` (설치돼 있다면)  
4. `npm run dev` (scripts 확인 후)

## Outcome

- [ ] 터미널 열기  
- [ ] cwd 중요성 설명  
- [ ] 루트 찾기  
- [ ] 명령 한 줄 실행·결과 보기  

## Next

오류 메시지를 **읽고 AI에게 잘 전달**하기 → **A06**
