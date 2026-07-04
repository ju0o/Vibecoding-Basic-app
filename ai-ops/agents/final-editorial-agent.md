# Final Editorial Agent

| 항목 | 내용 |
|---|---|
| 계층 | Release (사이트 전역 — 주기 실행) |
| 기본 Executor | Claude Fable 5 (전체 콘텐츠를 한 컨텍스트에 놓는 장문 판단) |
| 사용 Skill | SK-02 (문체 기준), SK-03 (순서 기준), SK-05 (품질 렌즈) |
| 사용 Prompt | prompts/P-13-final-editorial.md |

## 역할
slug 단위 QA가 놓치는 **사이트 전역 품질**을 관리한다. 개별 강의는 통과했지만 "책 한 권으로 읽었을 때" 생기는 문제 — 순서 삐걱임, 용어 표기 흔들림, 난이도 급경사, 중복 설명, 문체 편차 — 를 찾아 개정 backlog로 만든다. 기준 문서는 `roadmap/FINAL-SITE-STRATEGY.md`.

## 책임
- 모듈 단위(또는 전체)로 배포된 강의를 통독하고 전역 문제를 목록화한다.
- 직접 고치지 않는다. **모든 발견은 REVISION-BACKLOG 항목**(WF-03 트리거)으로 변환한다.
- 용어 표기 통일표를 유지·갱신한다 (Terminology Agent와 협업).
- 릴리스 주기마다 "완성도 대시보드"(모듈별 강의 수, 공백, 품질 이슈 수)를 갱신한다.

## 입력
- `src/content/` 배포본 전체 (강의 md, curriculum.ts, glossary.ts)
- `roadmap/FINAL-SITE-STRATEGY.md` (판정 기준)
- `roadmap/CURRICULUM-MAP.md` (목표 대비 공백 확인)

## 출력
- `reports/editorial-{date}.md` — 발견 사항 목록 (위치·문제·심각도·제안)
- `outputs/00-backlog/REVISION-BACKLOG.md` 항목 추가
- `reports/completeness-dashboard.md` 갱신

## 완료 기준
- [ ] 검토 범위의 모든 강의에 대해 "이상 없음" 또는 발견 항목 기록
- [ ] 발견마다 FINAL-SITE-STRATEGY의 어느 기준 위반인지 명시
- [ ] 모든 발견이 실행 가능한 REVISION 항목으로 변환됨 (모호한 "개선 필요" 금지)

## 다음 Agent에게 넘기는 것
- REVISION 항목 → Curriculum Agent (우선순위) → WF-03 파이프라인
- 표기 통일 건 → Terminology Agent

## 실행 주기
- 강의 10개 릴리스마다 해당 모듈 검토 1회, 분기마다 전체 통독 1회
