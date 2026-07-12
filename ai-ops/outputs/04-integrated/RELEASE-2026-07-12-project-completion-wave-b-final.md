# RELEASE — 2026-07-12 Project Completion Wave B (96~100) · 🏁 커리큘럼 100강 완성

## 요약
- **백로그 96~100 릴리스로 커리큘럼 100/100 완성.** project-textbook 모듈 9/9 완결, 13모듈 전체 완주.
- 실행: Codex가 P-01(KB 5건 초안, 커밋 ed098da 계열 후속), Fable이 P-02 승인(표본 원문 대조 PASS, 951c887) + P-04~P-08 생산·릴리스 + P-09 배포.

## 릴리스 강의 (5)
| # | slug | 모듈/순서 | type | KB(Score) | 자수 |
|---|---|---|---|---|---|
| 96 | mcp-enabled-tool-project | project-textbook 5 | deep-dive | T12/mcp-enabled-tool-project (89) | 11,683 |
| 97 | git-recovery-playbook | project-textbook 6 | reference | T04/git-recovery-playbook (89) | 10,975 |
| 98 | npm-debugging-playbook | project-textbook 7 | reference | T06/npm-debugging-playbook (89) | 10,729 |
| 99 | deployment-checklist-playbook | project-textbook 8 | reference | T06/deployment-checklist-playbook (89) | 12,199 |
| 100 | private-ai-learning-site-project | project-textbook 9 | deep-dive (캡스톤) | T12/private-ai-learning-site-project (89) | 13,847 |

## 산출물
- 강의 마크다운 5 + 다이어그램 SVG 5(+마크다운 참조) + curriculum 항목 5 + glossary 용어 10(MCP Host, Token Audience, Reflog, Dry Run, Lockfile, npm ci, Public Surface, Deployment Checklist, Client-Side Gate, Capstone Project — 전건 충돌·related 실존 검사)
- KB consumers 갱신 5건, BACKLOG 96~100 → v2-released (kb_needed 잔여 0)

## QA
- 기계 QA T2(인용 대조): 신규 5강 26개 인용 전건 KB Quote Bank 글자 일치 — 1건 아포스트로피 불일치(U+2019 vs ASCII) 발견 즉시 KB 기준으로 정정 후 재검 PASS
- 형식: 8섹션×5, 8,000자 하한 전건 통과(최소 10,729), 하이라이트 짝수(인라인 코드 제외 기준), 콜아웃 미사용
- `npm run verify`: exit 0 (lint·typecheck·test 8/8·build 184 정적 페이지)
- 캡스톤(100)은 이 리포지토리 실구조(PasswordGate·정적 export·Firebase 명령)를 KB 출처 범위 안에서 사례로 사용

## 커밋
- P-02: 951c887 (KB wave B 승인)
- P-08/P-09: 본 릴리스 커밋 및 배포 커밋 참조 (git log 2026-07-12)

## 완주 선언
- V2 100강 released + 라이브 배포(https://ju0o-ec967.web.app), kb_needed 0, M5 QA 위반 0 유지
- 남은 워크스트림: W2 콘텐츠 리프레시(R1~R7), W4 QA 재스캔(M5), 캡스톤 4층 확장(retrieval 챗봇)
