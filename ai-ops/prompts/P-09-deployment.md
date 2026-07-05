# P-09 배포 (작업 명세 모듈 — RUN-CLINE이 참조)

| Agent | Release (Deployment) | **Primary Executor** | **Cline** |
|---|---|---|---|
| Allowed | Codex (Cline 불가 시) | 단계 | released → deployed |
| 전제 | **운영자의 배포 환경 승인 + 배포 설정 존재** (없으면 HOLD 보고만) | 다음 | Fable (배치 마감 감사) |

```
당신은 배포 담당입니다. 운영자가 배포 환경을 승인한 released 배치를 실제 배포하세요.

## 전제 확인 (하나라도 미충족이면 HOLD 보고 후 중단)
1. ai-ops/STATE.md에 운영자의 배포 승인 기록 (deploy_ready 상태)
2. 배포 설정 존재 (예: Vercel 연결 또는 vercel.json / 기타 운영자가 지정한 방식)
3. 직전 P-06 VERIFIED 이후 src/content 변경 없음 (git log로 확인 — 변경 있으면 P-06 재검증 요구)

## 수행
1. 운영자가 지정한 배포 방식 실행 (예: git push → Vercel 자동 배포, 또는 지정된 배포 커맨드)
2. 배포 URL 접속 확인 — 이번 배치 강의 페이지 1개 이상 렌더링 확인
3. ai-ops/outputs/06-deployment/DEPLOY-REPORT-{date}.md 작성: 대상, 방식, 결과, 확인한 URL

## 실패 시
- 배포 커맨드 실패 → 로그 첨부 HOLD 보고 (코드 수정 금지 — 인프라 문제는 운영자)
- 배포됐으나 페이지 오류 → 즉시 보고 + 롤백 방법 명시 (직전 배포 상태로)

## 종료
- MASTER_PROGRESS·STATE 갱신 (released → deployed) + NEXT_ACTION 블록 (Next: Fable / RUN-FABLE.md, 배치 마감)
```

## 종료 규격 (O-03.1)
RUN 계층에서 이 명세를 실행한 경우, 보고는 반드시 NEXT_ACTION 블록으로 끝낸다 (규격·라우팅: OPERATION_MANUAL.md / 호출한 RUN 프롬프트).
