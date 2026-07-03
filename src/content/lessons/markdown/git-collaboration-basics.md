## 오늘 배울 것

Git을 명령어 모음이 아니라 개발자의 작업 기록 시스템으로 이해합니다.

commit, branch, merge, pull request가 왜 필요한지 협업과 복구 관점에서 배웁니다.

## 한 줄 정의

Git은 코드의 변경 이력을 저장하고, 여러 사람이 안전하게 동시에 작업하도록 돕는 버전 관리 시스템입니다.

## 쉬운 비유

문서 작업에서 저장 지점을 여러 개 남긴다고 생각해봅시다. Git의 commit은 저장 지점이고, branch는 별도 실험 복사본입니다.

실험이 성공하면 본문에 합치고, 실패하면 원래 문서는 그대로 둔 채 버릴 수 있습니다.

## 왜 생겼는가

소프트웨어는 한 번에 완성되지 않습니다. 고치고, 되돌리고, 비교하고, 여러 사람이 동시에 수정합니다.

파일 이름을 `final`, `final2`, `real-final`로 관리하면 금방 무너집니다. Git은 변경 이력을 정확히 기록하고 충돌을 관리하기 위해 생겼습니다.

## 어떤 문제를 해결하는가

- 언제 어떤 코드를 바꿨는지 추적합니다.
- 문제가 생기면 이전 상태와 비교하거나 되돌릴 수 있습니다.
- 기능 개발을 branch로 분리해 안정적인 코드와 실험 코드를 나눕니다.
- pull request로 코드 리뷰와 토론을 남깁니다.

## 핵심 개념

commit은 의미 있는 변경 단위입니다. "로그인 오류 메시지 추가"처럼 나중에 읽어도 이해되는 기록이어야 합니다.

branch는 독립 작업 공간입니다. 새 기능, 버그 수정, 실험을 main 코드와 분리합니다.

merge는 branch의 변경을 합치는 과정입니다. pull request는 합치기 전에 리뷰하고 대화하는 협업 절차입니다.

## 실제 예시

학습 사이트에 북마크 기능을 추가한다고 합시다. main에서 바로 작업하면 중간에 깨진 코드가 섞일 수 있습니다.

`feature/bookmark` branch를 만들고 작업한 뒤, 동작 확인과 리뷰를 마치면 main에 합칩니다. 문제가 생기면 해당 branch와 commit을 추적해 원인을 찾습니다.

## 코드 예시

```bash
git checkout -b feature/bookmark
git add src/features/bookmark
git commit -m "Add lesson bookmark toggle"
git push origin feature/bookmark
```

## AI 시대에서의 의미

AI가 빠르게 많은 파일을 고칠수록 Git은 더 중요해집니다. 변경 전후를 비교하고, 원치 않는 수정이 섞였는지 확인해야 합니다.

AI와 일할 때는 작은 commit 단위가 안전합니다. 한 번에 너무 많은 변화를 만들면 리뷰가 어려워집니다.

## 자주 헷갈리는 것

GitHub는 Git이 아닙니다. Git은 버전 관리 도구이고, GitHub는 Git 저장소를 온라인에서 협업하게 해주는 서비스입니다.

commit은 백업이 아니라 설명 가능한 변경 기록입니다. 의미 없는 메시지는 미래의 나와 팀원을 힘들게 합니다.

## 실무에서 쓰는 방식

실무에서는 작업 전 branch를 만들고, 관련 파일만 commit합니다. 리뷰에서는 코드가 동작하는지뿐 아니라 왜 이렇게 바꿨는지도 봅니다.

AI가 만든 코드는 `git diff`로 확인하고, 의도하지 않은 파일 변경이 있으면 합치기 전에 정리합니다.

## 공부 체크리스트

- commit, branch, merge, pull request의 차이를 말할 수 있다.
- AI가 수정한 코드를 Git diff로 확인해야 하는 이유를 안다.
- 작은 변경 단위로 기록하는 습관을 설명할 수 있다.

## 참고 출처

- Git Documentation: https://git-scm.com/doc
- GitHub Docs: https://docs.github.com/
- Pro Git Book: https://git-scm.com/book
