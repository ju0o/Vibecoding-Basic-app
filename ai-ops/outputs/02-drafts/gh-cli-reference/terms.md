# 용어 초안: gh-cli-reference

기존 glossary.ts 대조: gh/GitHub CLI 미등재 확인 (2026-07-07). 신규 2개.

## GitHub CLI (gh)
category: Git
shortDefinition: PR·이슈·리뷰를 터미널에서 수행하는 GitHub 공식 명령줄 도구
explanation: gh pr create(제안)·review(리뷰)·merge(병합)·checkout(로컬로 받기)으로 웹 PR 흐름 전체를 셸에서 처리합니다. 플래그가 웹 개념의 직역이라(--base/--head, --approve/--comment/--request-changes, --merge/--squash/--rebase) 개념을 알면 명령이 읽힙니다. 스크립트·AI 에이전트가 PR을 다룰 때 실제로 실행하는 명령군이며, gh auth login 인증과 GitHub 원격이 전제입니다.
related: [Pull Request, Code Review, Merge Strategy]

## gh pr checkout
category: Git
shortDefinition: 대상 PR을 로컬 git 브랜치로 받아 실행·검토할 수 있게 하는 명령
explanation: 매뉴얼 정의는 "Check out a pull request in git"입니다. diff를 눈으로 읽는 것을 넘어 남의(또는 AI의) PR을 실제로 내 컴퓨터에서 돌려보게 해 "읽는 리뷰"를 "돌려보는 리뷰"로 확장합니다. AI 결과일수록 실행 검증이 중요하므로 리뷰의 숨은 절반을 담당합니다.
related: [GitHub CLI (gh), Pull Request, Code Review]
