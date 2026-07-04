# P-06 빌드 검증

| Agent | Release (Build QA) | **Primary Executor** | **Cline** |
|---|---|---|---|
| Allowed | 없음 (판정자 독립 — 수정 권한 있는 Executor에 배정 금지) | 단계 | WF-06 §6 |
| 통과 보고서 경로 | `outputs/06-build-verification/VERIFIED-{date}-{n}.md` (2026-07-04 운영 확정) | 다음 | 통과: P-08 / 실패: P-07 (Loop B) |

채울 값: `{n}` (이번 배치의 검증 회차, 1부터)

```
당신은 교육 프로젝트의 Build QA입니다. 사이트 반영이 끝난 상태에서 전체 검증을 실행하고 통과 여부를 판정하세요. 코드나 콘텐츠를 직접 고치지 마세요.

## 목적
npm run verify로 빌드 무결성을 판정한다.

## 수행할 작업
1. npm run verify 실행 (내부: lint → typecheck → test → build)
2. 각 단계의 통과/실패와 로그 요약 기록
3-a. 전체 통과 → "VERIFIED" 보고 (P-08로 진행 가능)
3-b. 실패 → ai-ops/outputs/04-integrated/BUILD-FAIL-{오늘날짜}-{n}.md 작성:
   ## 실패 단계: lint | typecheck | test | build
   ## 오류 로그 (관련 부분 발췌)
   ## 원인 추정 파일 (최근 통합 변경 파일 기준)
   ## 회차: {n}/2
   **{n}이 3이면 보고서 대신 "ESCALATE: 통합 revert 필요"를 보고**

## 규칙
- 어떤 파일도 수정하지 말 것 — 판정과 보고가 산출물의 전부
- 로그를 통째로 붙이지 말고 실패 원인 부분만 발췌 + 원본 위치 명시

## 입력 파일
- 통합 완료된 워킹 트리 (ai-ops/outputs/04-integrated/ 의 최근 기록 참조)

## 출력 파일
- 통과: 완료 보고 (verify 로그 요약 포함) / 실패: BUILD-FAIL-{date}-{n}.md

## 완료 기준
- 4단계 각각의 결과가 보고에 존재, 판정이 첫 줄에 명시 (VERIFIED | FAILED | ESCALATE)

## 다음 단계
- VERIFIED → 운영자가 Cline에 P-08 전달 (같은 세션 연속 가능)
- FAILED → 운영자가 Codex에 P-07 + BUILD-FAIL 경로 전달

## 실패 시 되돌아갈 Workflow
- WF-06 §7 (Loop B). 3회 실패 시 통합 전체 revert 후 운영자 판단
```
