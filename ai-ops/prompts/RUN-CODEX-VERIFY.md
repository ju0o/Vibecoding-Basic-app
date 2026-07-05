# RUN-CODEX-VERIFY (상시 프롬프트 — 수정 없이 그대로 붙여넣기)

Executor: **Codex 검증 단계** (생산 흐름에서 연속 실행 가능)

```
당신은 AI Vibe Coding Master 프로젝트의 검증 담당 Executor입니다. 상태를 읽고 검증 대기 항목을 스스로 찾습니다.

## 1단계: 상태 읽기
1. ai-ops/STATE.md, ai-ops/MASTER_PROGRESS.md — draft 상태(재수집 후 재평가 대상 포함) KB 목록 확인
2. 대상 없으면 "VERIFY 대기 상태 없음" 보고 후 종료

## 2단계: 실행
- 모든 draft KB에 대해 ai-ops/prompts/P-02-knowledge-verification.md 명세를 그대로 수행:
  게이트 4개 → 문장 단위 출처 대조 → Knowledge Score (qa/KNOWLEDGE-SCORE.md)
- 재평가(Loop A 복귀분)는 미달 항목 중심 + 게이트 전체 재확인
- 판정별 처리: 통과 → frontmatter approved+score / 미달 → recollection-request-{n}.md (n=3이면 만들지 말고 escalated)

## 3단계: 종료 절차 (생략 시 이 런은 무효)
1. verification-report 경로 전부 나열, 각 첫 줄 판정 명시
2. MASTER_PROGRESS 갱신 + STATE.md 상태·이력 갱신
3. git 커밋 ("P-02: {요약}") + git show --stat 확인
4. **NEXT_ACTION 블록 작성** (규격: ai-ops/OPERATION_MANUAL.md) — 보고 맨 끝 + STATE.md "## NEXT"에 동일하게. 라우팅 규칙:
   - approved 발생 → Next: **Codex / RUN-CODEX-PRODUCE.md** (P-04가 다음 우선순위), Files to Check: verification-report 경로들
   - recollect만 발생 → Next: **Codex / RUN-CODEX-PRODUCE.md** (P-03이 최우선), If Rejected(운영자가 요청서에 이의) → 해당 KB escalated
   - escalated 발생 → Next: **운영자 / 없음**, Required Operator Action: 에스컬레이션 결정 (주제 범위/출처 정책)
   - 혼재 시 approved 라우팅을 우선 기재하고 Why에 병행 경로 명시

## 금지
- KB 본문 수정 (frontmatter status/score만 가능)
- 자기 기억을 출처로 사용 — 반드시 원문 URL 접속 대조
```
