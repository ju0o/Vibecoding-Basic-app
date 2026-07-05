APPROVED 88

# Knowledge Verification Report: terminal-shell-commands

검증일: 2026-07-06  
대상: `ai-ops/knowledge-base/entries/T01/terminal-shell-commands.md`  
판정: APPROVED

## 게이트 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | MDN, VS Code, Microsoft Learn URL과 확인 날짜가 모든 핵심 주장에 연결된다. |
| G2 필수 섹션 존재 | PASS | 필수 섹션과 Quote Bank 존재. |
| G3 frontmatter 완전 | PASS | 필수 frontmatter 필드 완전. |
| G4 URL 접속 가능 | PASS | MDN command line, VS Code Terminal Basics/Getting Started, Microsoft Learn Windows commands/command shell/Discover PowerShell 재접속 확인. |

## 원문 대조 요약

| 주장 | 대조 출처 | verdict |
|---|---|---|
| web development 중 terminal 또는 command line commands를 실행해야 할 수 있다 | MDN Command line crash course | PASS |
| VS Code integrated terminal은 workspace root에서 시작하고 `mkdir`, `git`을 실행할 수 있다 | VS Code Terminal Basics | PASS |
| shell commands는 build, test, deploy 작업에 쓰인다 | VS Code Getting started with the terminal | PASS |
| Windows에는 Command shell과 PowerShell이 있다 | Microsoft Learn Windows commands | PASS |
| terminal은 shell을 host하고 shell은 command를 evaluate/execute한다 | Microsoft Learn What is a command shell? | PASS |
| PowerShell cmdlet은 Verb-Noun pair로 구성된다 | Microsoft Learn Discover PowerShell | PASS |

## 점수표

| 기준 | 점수 | 근거 |
|---|---:|---|
| S1 공식 출처 | 17/20 | 전부 공식 문서지만 VS Code/Microsoft Learn은 SOURCE-REGISTRY 본표에 명시되지 않아 감점. COLLECTION-PLAN T01 공식 출처와는 정합. |
| S2 최신성 | 15/15 | checked 날짜 2026-07-05, 재확인 2026-07-06. |
| S3 교육 적합성 | 14/15 | terminal/shell/PowerShell 구분이 입문자에게 적합. |
| S4 예시 품질 | 8/10 | PowerShell 명령 예시가 실행 가능하나 레퍼런스형 강의에서 더 확장 필요. |
| S5 AI 시대 연관성 | 9/10 | AI가 실행한 명령의 shell/current directory 확인과 직접 연결. |
| S6 실무 활용성 | 13/15 | 사용 장면 3개와 실수 4개가 실제적. |
| S7 용어 일관성 | 12/15 | prerequisites/related 실존. successor 예약 id는 후속 KB 필요. |

총점: 88 / 100

## 승인 조건

- status를 `approved`로 변경 가능.
- score를 `88`로 기록.
- 권고: SOURCE-REGISTRY에 Microsoft Learn과 VS Code Docs를 T01 공식 출처로 명시하면 다음 검증에서 S1 감점 제거 가능.
