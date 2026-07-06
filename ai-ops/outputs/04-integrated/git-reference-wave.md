# P-05 통합 기록 — Git 레퍼런스 4강 (Wave 15, 2026-07-06, Fable 대행)

| slug | module/order | 본문 해시 일치 | SVG | 신규 용어 |
|---|---|---|---|---|
| git-init-add-commit-status | git-collaboration/2 | ✓ | git-three-areas-cycle.svg | 6 (Repository~Untracked File) |
| git-branch-switch-merge | git-collaboration/3 | ✓ | branch-merge-flow.svg | 4 (Branch, Merge, Merge Conflict, Switch) |
| git-log-diff-show | git-collaboration/4 | ✓ | log-diff-show-scopes.svg | 3 (Diff, Reachability, Git Object) |
| git-restore-reset-revert | git-collaboration/5 | ✓ | undo-decision-tree.svg | 3 (Reset, Revert, Restore) |

- 조정: 레거시 git-collaboration-basics order 4→1 (backlog 기준, v2-regenerate 대기)
- 용어 충돌 처리: "Commit"이 React 용어로 기존재 → Git 쪽은 **"Commit (Git)"**으로 등재. **편집 권고**: 기존 React "Commit"→"Commit (React)" 개명 검토 (O-02/REVISION 후보)
- 부수 수정: biome.json에 out/·.firebase 제외 추가 (D-03의 정적 빌드 산출물이 lint 대상에 잡히던 문제)
- 검증: lint(95 files) + typecheck PASS. glossary 216 terms
- KB consumers 4건 갱신 완료
