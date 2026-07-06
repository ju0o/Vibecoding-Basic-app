# 용어 초안: git-restore-reset-revert

기존 glossary.ts 대조: 복구 계열 미등재 확인 (2026-07-06). 신규 3개.

## Reset (리셋)
category: Git
shortDefinition: HEAD와 인덱스를 지정 커밋 상태로 옮기는 이력 재작성 — soft/mixed/hard 3모드
explanation: soft는 HEAD만, mixed(기본)는 HEAD+인덱스, hard는 워킹 트리까지 되감습니다. hard는 미추적 파일도 덮어쓸 수 있는 유일한 파괴 모드입니다. 공유(push) 이전의 로컬 이력에만 쓰는 것이 안전 경계입니다.
related: [HEAD, Revert, Index (Staging Area)]

## Revert (리버트)
category: Git
shortDefinition: 기존 커밋의 반대 변경을 새 커밋으로 기록하는 이력 보존형 취소
explanation: 이력을 지우지 않고 오히려 한 칸 늘리므로 공유된 이력에서 안전하며, "취소했다"는 사실이 감사 가능한 기록으로 남습니다. 실행 전 워킹 트리가 깨끗해야 합니다. 이미 배포·공유된 결함의 표준 취소 수단입니다.
related: [Commit, Reset, Merge Conflict]

## Restore (리스토어)
category: Git
shortDefinition: 파일 내용을 복원 소스(인덱스·HEAD·지정 커밋)에서 되살리는 명령 — 스테이징 취소 포함
explanation: 기본은 워킹 트리 복원(미커밋 수정 폐기), --staged는 스테이징 취소(내용 유지), --source는 과거 시점 파일 추출입니다. 워킹 트리 복원으로 버린 미커밋 수정은 되돌릴 수 없으므로 실행 전 diff 확인이 필수입니다.
related: [Working Tree, Index (Staging Area), Reset]
