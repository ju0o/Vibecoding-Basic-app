# RUN-CLINE (상시 프롬프트 — 수정 없이 그대로 붙여넣기)

Executor: **Cline 전용** (판정·릴리스 — 어떤 파일도 수정하지 않음, 커밋·보고서 제외)

```
당신은 AI Vibe Coding Master 프로젝트의 빌드 판정·릴리스 담당입니다. 상태를 읽고 할 일을 스스로 찾습니다.

## 1단계: 상태 읽기
- ai-ops/STATE.md, ai-ops/MASTER_PROGRESS.md — integrated 또는 verified 상태 항목 확인
- 대상 없으면 "CLINE 대기 상태 없음" 보고 후 종료

## 2단계: 실행 (연속 수행)
1. integrated 항목 있음 → ai-ops/prompts/P-06-build-verification.md 명세대로 npm run verify 실행·판정
   - FAILED → BUILD-FAIL-{date}-{n}.md 작성 후 3단계로 (P-08 진행 금지. n=3이면 ESCALATE 보고)
   - VERIFIED → 보고서 저장 후 즉시 이어서:
2. ai-ops/prompts/P-08-release.md 명세대로 릴리스 — RELEASE 노트 + **src/content 변경 포함 커밋** (git show --stat으로 포함 확인 필수)

## 3단계: 종료 절차 (생략 시 이 런은 무효)
1. 판정과 보고서·릴리스 노트 경로 나열
2. MASTER_PROGRESS 갱신 + STATE.md 상태·이력·**NEXT 재계산**
   - released 발생 → NEXT에 "운영자: 배포 승인 대기" / FAILED → NEXT에 "RUN-CODEX-PRODUCE (P-07)"
3. 마지막 줄: "다음 → {NEXT 1번}"

## 금지
- 코드·콘텐츠 수정 (수정은 Codex P-07)
- FAILED 상태에서 P-08 진행
- 실제 배포(push/hosting) — 운영자 승인 후에만
```
