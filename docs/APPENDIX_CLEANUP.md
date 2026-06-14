# 별첨자료 정리 기준

## 앱에 노출하는 자료

수강생에게 실제로 나눠주거나 수업 중 반복해서 쓸 자료만 `src/content/course-manifest.json`의 `appendix` 목록에 남긴다.

- 1~6강 커리큘럼 1페이지 요약
- AI 종류별 특화 도구 가이드
- 2회차 사전 준비자료
- 수강생 실습 기록지
- 명령어 치트시트
- AI 작업지시서 템플릿
- 에러 해결 가이드
- MVP 기획 워크시트
- 코딩 용어집
- 시각적 다이어그램
- 프로젝트 폴더 구조 설명
- 데이터베이스 완전 가이드
- 배포 전 체크리스트
- 발표 템플릿

## 앱 대시보드에서 제외한 자료

아래 자료는 내용이 겹치거나 기초반 현장 배포 우선순위가 낮아 별첨자료 대시보드에서 제외한다. 다만 좋은 레이아웃과 시각 요소가 있어 파일은 레퍼런스 보존용으로 남긴다.

- `handout-session1.html`: 1강 요약 내용이 `curriculum-one-page.html`, `ai-types-specialized-catalog.html`과 겹친다.
- `session-handout-map.html`: 강사용 운영표 성격이라 수강생 프린트 자료로는 제외한다.
- `download-install-locations.html`: 설치 안내가 `handout-session2-prep.html`로 통합됐다.
- `preclass-setup.html`: 사전 준비 체크리스트가 `handout-session2-prep.html`로 통합됐다.
- `ai-tools.html`: AI 도구 안내가 `ai-types-specialized-catalog.html`로 통합됐다.
- `features-ideas.html`: 기능 확장과 수익화 방향은 기초반보다 응용반에서 쓰는 편이 자연스럽다.
- `vscode-ai-guide.html`: VS Code/AI IDE 안내가 `handout-session2-prep.html`로 통합됐다.

## 운영 메모

- 대시보드 노출 여부는 `src/content/course-manifest.json`만 기준으로 한다.
- 보존 파일은 직접 링크로 열 수 있지만 수강생 화면의 별첨자료 목록에는 나타나지 않는다.
- 각 별첨자료의 `강사용 안내` 모달은 화면 전용이며 인쇄/PDF에는 포함되지 않는다.
