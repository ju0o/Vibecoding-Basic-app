# 자료 저장 규칙 (Storage Rules)

모든 작업 산출물은 대화창이 아니라 **이 폴더 구조의 md 파일**로 저장한다. Executor가 무엇이든, 세션이 끊겨도, 파일만 있으면 파이프라인이 이어진다.

## 폴더 구조와 규칙

| 폴더 | 저장물 | 파일 규칙 | 쓰기 권한 |
|---|---|---|---|
| `../sources/notes/` | 주제군 수집 노트 (WF-00) | `{T번호}-{주제}.md` | Source Collector |
| `00-backlog/` | 강의·용어·개정 대기열 | `BACKLOG.md`, `GLOSSARY-BACKLOG.md`, `REVISION-BACKLOG.md` | Curriculum (단일 작성자) |
| `01-briefs/` | 강의 리서치 브리프 | `{slug}.md` | Research |
| `02-drafts/` | 강의 초안 세트 | `{slug}/lesson.md, meta.md, quiz.md, terms.md, fix-log.md` | Writer·Quiz·Terminology (파일별 분리) |
| `03-reviewed/` | 검증 보고서 + 최종본 | `{slug}/fact-check-report.md, edu-review-report.md, qa-report.md, final/` | Fact Check·Edu Review·QA (파일별 분리) |
| `04-integrated/` | 반영·릴리스 기록 | `{slug}.md`, `RELEASE-{date}.md` | Site Integration·Release |
| `../reports/` | 파일럿·편집·대시보드 보고서 | `{date}-{이름}.md`, `editorial-{date}.md`, `completeness-dashboard.md` | Final Editorial·운영자 |
| `../MASTER_PROGRESS.md` | 유일한 상태 매트릭스 (구 PIPELINE.md 대체) | 자기 작업 칸만 수정, 행 추가는 오케스트레이터 | 전 Agent |

## 요청 명칭 ↔ 실제 폴더 매핑

| 계획서에서 요청된 이름 | 실제 위치 | 비고 |
|---|---|---|
| research/ | `01-briefs/` | 강의 단위 리서치 |
| source-notes/ | `../sources/notes/` | 주제 단위 수집 (출처와 함께 관리) |
| lesson-drafts/ | `02-drafts/` | |
| fact-checks/ | `03-reviewed/{slug}/fact-check-report.md` | 교육 검증과 같은 폴더 (slug 단위 묶음) |
| education-reviews/ | `03-reviewed/{slug}/edu-review-report.md` | |
| integration-reports/ | `04-integrated/` | |
| release-notes/ | `04-integrated/RELEASE-{date}.md` | |

번호 접두어(00~04)는 파이프라인 순서를 폴더명에 새겨 단계 착오를 막기 위한 것 — 유지한다.

## 불변 규칙
1. 산출물 없는 작업 완료 보고는 무효 — 파일이 증거다
2. 다음 단계는 이전 단계의 지정 파일만 입력으로 받는다 (대화 내용 인용 금지)
3. 같은 파일에 두 Agent가 쓰지 않는다 (충돌 지도: [../PARALLEL-STRATEGY.md](../PARALLEL-STRATEGY.md))
4. 삭제 금지 — 폐기 산출물은 파일 상단에 `status: superseded` 표기 (이력 보존)
