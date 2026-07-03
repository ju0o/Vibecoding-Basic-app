# Prompt Library 사용법

각 파일의 ` ``` ` 블록 안 내용을 **그대로 복사**해서 배정된 Executor(Claude / Codex / Trae / Cline)에 붙여넣는다.

## 규칙
1. `{slug}` 같은 `{중괄호}` 자리만 채우고 나머지는 수정하지 않는다. 프롬프트를 수정하고 싶으면 이 라이브러리 파일을 고쳐서 모든 Executor에 동일하게 적용한다 (Executor별 프롬프트 분기 금지 — Executor 독립성 원칙).
2. 모든 프롬프트는 "파일을 읽고 → 파일을 쓰는" 구조다. Executor가 파일 접근이 안 되는 환경(웹 챗)이면 파일 내용을 프롬프트 뒤에 직접 붙여넣고, 산출물을 받아 수동 저장한다.
3. 프롬프트 실행 전 확인: 입력 파일이 존재하는가, PIPELINE.md의 상태가 맞는 단계인가.
4. 실행 후: 산출물 저장 → 담당 Agent의 DoD 체크 → PIPELINE.md 갱신.

## 목록
| 파일 | Agent | 단계 |
|---|---|---|
| P-01-research.md | Research | WF-01 §1 |
| P-02-curriculum.md | Curriculum | WF-01 §0, WF-04 |
| P-03-lesson-writer.md | Lesson Writer | WF-01 §2 |
| P-04-quiz.md | Quiz | WF-01 §2 |
| P-05-terminology.md | Terminology | WF-01 §2, WF-02 |
| P-06-fact-check.md | Fact Check | WF-01 §3 |
| P-07-edu-review.md | Education Review | WF-01 §3 |
| P-08-qa.md | QA | WF-01 §4 |
| P-09-site-integration.md | Site Integration | WF-01 §5 |
| P-10-release.md | Release | WF-01 §6 |
| P-11-fix-loop.md | Lesson Writer (수정) | WF-01 §3 FIX 루프 |
