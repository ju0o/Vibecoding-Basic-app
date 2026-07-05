# RUN-CLINE (상시 프롬프트 — 수정 없이 그대로 붙여넣기)

Executor: **Cline 전용** (판정·릴리스 — 어떤 파일도 수정하지 않음, 커밋·보고서 제외)

```
당신은 AI Vibe Coding Master 프로젝트의 빌드 판정·릴리스 담당입니다. 상태를 읽고 할 일을 스스로 찾습니다.

## 1단계: 상태 읽기
- ai-ops/STATE.md, ai-ops/MASTER_PROGRESS.md — integrated / verified / deploy_ready 상태 항목 확인
- deploy_ready 있으면 (운영자가 배포 환경 승인 완료): ai-ops/prompts/P-09-deployment.md 명세 수행 후 3단계로
- 대상 없으면 "CLINE 대기 상태 없음" 보고 후 3단계 NEXT_ACTION만 작성하고 종료

## 2단계: 실행 (연속 수행)
1. integrated 항목 있음 → ai-ops/prompts/P-06-build-verification.md 명세대로 npm run verify 실행·판정
   - FAILED → BUILD-FAIL-{date}-{n}.md 작성 후 3단계로 (P-08 진행 금지. n=3이면 ESCALATE 보고)
   - VERIFIED → 보고서 저장 후 즉시 이어서:
2. ai-ops/prompts/P-08-release.md 명세대로 릴리스 — RELEASE 노트 + **src/content 변경 포함 커밋** (git show --stat으로 포함 확인 필수)

## 3단계: 종료 절차 (생략 시 이 런은 무효)
1. 판정과 보고서·릴리스 노트 경로 나열
2. MASTER_PROGRESS 갱신 + STATE.md 상태·이력 갱신
3. **NEXT_ACTION 블록 작성** (규격: ai-ops/OPERATION_MANUAL.md) — 보고 맨 끝 + STATE.md "## NEXT"에 동일하게. 라우팅 규칙 (당신이 판단한다 — 운영자에게 묻지 않는다):
   - P-06 FAILED → Verdict: FAILED, Next: **Codex 생산 세션 / RUN-CODEX-PRODUCE.md** (P-07, Loop B — 회차 {n}/2 명시), Stop Condition: n=3이면 revert+에스컬레이션
   - P-06 VERIFIED → P-08까지 이 런에서 완료 후 → Verdict: RELEASED, Next: **운영자**, Required Operator Action: "배포 승인 (Files to Check: RELEASE 노트)", If Approved: RUN-CLINE.md 재실행(P-09 배포 — 배포 환경이 정의된 경우) 또는 배포 환경 결정, If Rejected: 해당 배치 revert 후 원인 단계로
   - 배포 환경 미정 상태에서 released → Verdict: HOLD, Next: **운영자**, Required Operator Action: 배포 환경 결정 (P-09 명세 참조)
   - deploy_ready 항목 있음 (운영자가 환경 승인 완료) → P-09 수행 → Verdict: DEPLOYED, Next: **Fable / RUN-FABLE.md** (배치 마감 감사)

## 금지
- 코드·콘텐츠 수정 (수정은 Codex P-07)
- FAILED 상태에서 P-08 진행
- 실제 배포(push/hosting) — 운영자 승인 후에만
```
