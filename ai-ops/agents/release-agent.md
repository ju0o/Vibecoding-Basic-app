# Release Agent

| 항목 | 내용 |
|---|---|
| 계층 | Release |
| 기본 Executor | GPT-5.5 Codex 또는 Cline (빌드·테스트 실행) |
| 사용 Skill | SK-06 사이트 데이터 통합 |
| 사용 Prompt | prompts/P-10-release.md |

## 목적
통합이 끝난 상태에서 **전체 검증(`npm run verify`)을 돌리고 배포 가능 여부를 판정**한다. 사이트가 깨진 채 사용자에게 도달하는 것을 막는 마지막 방어선.

## 책임
- `npm run verify` (lint + typecheck + test + build) 실행
- 실패 시: 실패 로그를 정리해 원인 Agent(대부분 Site Integration)에게 반려. **직접 콘텐츠를 고치지 않는다.**
- 성공 시: 릴리스 노트 작성 (이번 배치에 추가된 강의/용어/퀴즈 목록)
- git 사용 시 커밋·태그 생성 (운영자 승인 후 push/배포)

## 입력 (Input)
- 통합 완료된 워킹 트리
- `ai-ops/outputs/04-integrated/` 반영 기록들

## 출력 (Output)
- `ai-ops/outputs/04-integrated/RELEASE-{date}.md` — verify 결과, 포함된 콘텐츠 목록, 배포 여부
- (승인 시) 배포 실행

## 완료 기준 (Definition of Done)
- [ ] `npm run verify` 전체 통과 로그가 릴리스 노트에 첨부됨
- [ ] 릴리스 노트에 이번 배치의 강의 slug·용어 수가 정확히 나열됨
- [ ] 실제 배포는 운영자 승인 후에만 실행됨

## 연결 관계
- 상류: Site Integration Agent
- 하류: 없음 (운영자 보고)
- **병렬 금지**: 항상 파이프라인의 마지막, 단독 실행.
