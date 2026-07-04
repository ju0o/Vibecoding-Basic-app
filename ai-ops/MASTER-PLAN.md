# 전체 운영 계획서 (Master Plan)

AI Vibe Coding Master를 "컴퓨터 기초 → 최신 AI 엔지니어링"을 순서대로 공부해 **남에게 설명할 수 있는 수준**에 도달하는 교육 사이트로 완성하기 위한 운영 계획. 이 문서는 모든 운영 문서의 지도다.

## 전체 흐름 (자료 → 사이트)

```
[A 자료 수집]──[B 출처·용어 정리]──[C 커리큘럼 배치]──[D 강의 기획·작성]──[E 검증]──[F 사이트 반영]──[G 빌드 검증]──[H 릴리스]──[I 최종 편집]
   WF-00           WF-00·WF-02          WF-04              WF-01 §1~2       WF-01 §3~4   WF-01 §5      WF-01 §6      WF-01 §6     WF-05
```

## 단계 정의표

| 단계 | 담당 Agent | 입력 파일 | 출력 파일 | 품질 기준 | 실패 시 되돌릴 단계 | 병렬 |
|---|---|---|---|---|---|---|
| A 자료 수집 | Source Collector | `sources/COLLECTION-PLAN.md`의 주제 항목 | `sources/notes/{topic}.md` | 공식 출처 우선, URL 전수, 확인 날짜 | — (시작점) | **주제 간 병렬** |
| B 출처·용어 정리 | Research + Terminology | 수집 노트 | `sources/SOURCE-REGISTRY.md` 갱신, `outputs/00-backlog/GLOSSARY-BACKLOG.md` | 등록부 형식, 중복 없음 | A (노트 부실 시) | 주제 간 병렬 |
| C 커리큘럼 배치 | Curriculum | 수집 노트, `roadmap/CURRICULUM-MAP.md` | `outputs/00-backlog/BACKLOG.md` | SK-03 DoD (선행 그래프, 레벨 곡선) | B | **순차 (BACKLOG 단일 작성자)** |
| D1 강의 리서치 | Research | backlog 항목, 수집 노트 | `outputs/01-briefs/{slug}.md` | 출처 5+, 공식 60%+ | A~B (재수집) | slug 간 병렬 |
| D2 강의 작성 | Lesson Writer + Quiz + Terminology | 브리프 | `outputs/02-drafts/{slug}/` 4종 | 각 Agent DoD | D1 (브리프 보강) | slug 간·slug 내 3작업 병렬 |
| E1 사실 검증 | Fact Check | 초안 + 브리프 | `outputs/03-reviewed/{slug}/fact-check-report.md` | SK-04, FIX엔 수정안 | D2 (FIX 루프, 최대 2회) | E2와 병렬 |
| E2 교육 검증 | Education Review | 초안 + 선행 강의 | `.../edu-review-report.md` | SK-05 렌즈 5개 | D2 (FIX 루프) | E1과 병렬 |
| E3 규격 QA | QA | 초안 + 두 보고서 | `.../qa-report.md` + `final/` | Gate 3 전 항목 | 원인 Agent | 배치 단위 1회 |
| F 사이트 반영 | Site Integration | `final/`만 | `src/content/` 변경 + `outputs/04-integrated/{slug}.md` | lint+typecheck 통과 | E3 (규격 반려) | **순차 전용** |
| G 빌드 검증 | Release | 워킹 트리 | verify 로그 | `npm run verify` 4단계 통과 | F (통합 되돌림) | **순차 전용** |
| H 릴리스 | Release | 반영 기록 | `outputs/04-integrated/RELEASE-{date}.md` + 커밋 | 릴리스 노트 완전성, 운영자 승인 | G | 순차 전용 |
| I 최종 편집 | Final Editorial | 배포된 콘텐츠 전체 | `reports/editorial-{date}.md` + 개정 backlog | `roadmap/FINAL-SITE-STRATEGY.md` 기준 | 개정은 WF-03으로 | 모듈 간 병렬 검토 가능 |

## 산출물 12종 ↔ 문서 위치

| # | 요구 산출물 | 위치 |
|---|---|---|
| 1 | 전체 운영 계획서 | 이 문서 |
| 2 | 자료 수집 계획서 | [sources/COLLECTION-PLAN.md](sources/COLLECTION-PLAN.md) |
| 3 | Agent 조직도 | [README.md](README.md) + [agents/](agents/) (13개) |
| 4 | Workflow 설계서 | [workflows/](workflows/) WF-00~05 |
| 5 | Skill 설계서 | [skills/](skills/) SK-01~08 |
| 6 | Executor 배정표 | [executors/EXECUTORS.md](executors/EXECUTORS.md) |
| 7 | Prompt Library | [prompts/](prompts/) P-01~13 |
| 8 | 커리큘럼 분해 계획서 | [roadmap/CURRICULUM-MAP.md](roadmap/CURRICULUM-MAP.md) |
| 9 | 자료 저장 규칙 | [outputs/README.md](outputs/README.md) |
| 10 | QA 체크리스트 | [qa/QA-GATES.md](qa/QA-GATES.md), [qa/QA-CHECKLIST.md](qa/QA-CHECKLIST.md) |
| 11 | 최종 사이트 완성 전략 | [roadmap/FINAL-SITE-STRATEGY.md](roadmap/FINAL-SITE-STRATEGY.md) |
| 12 | Phase별 실행 로드맵 | [ROADMAP.md](ROADMAP.md) |

## 요청 Agent명 ↔ 실제 Agent 매핑

조직 비대화를 막기 위해 역할이 같은 Agent는 통합했다.

| 요청된 이름 | 담당 Agent | 근거 |
|---|---|---|
| Source Research Agent | Research Agent | 강의 단위 리서치 담당 |
| Official Docs Collector Agent | **Source Collector Agent (신설)** | 주제 단위 대량 수집은 강의 리서치와 리듬이 달라 분리 |
| Curriculum Architect Agent | Curriculum Agent | 동일 역할 |
| Lesson Planner Agent | Curriculum Agent (강의 분해) + Research Agent (브리프) | 기획은 두 산출물(backlog 항목 + 브리프)로 이미 커버 |
| Build QA Agent | Release Agent | Gate 4 담당 |
| Final Editorial Agent | **Final Editorial Agent (신설)** | 사이트 전역 일관성은 기존 slug 단위 QA와 관점이 다름 |
| 나머지 (Terminology, Lesson Writer, Fact Check, Education Review, Site Integration, QA, Release) | 기존 동명 Agent | 변경 없음 |

## 운영 원칙 (요약 — 상세는 README.md)
1. Executor 교체 가능 (Agent·프롬프트·파일 규격은 AI 중립)
2. 모든 산출물은 md 파일 (대화창에 상태를 남기지 않음)
3. 작성자 ≠ 검증자 (교차 Executor)
4. 공유 파일(curriculum.ts, glossary.ts, BACKLOG.md)은 단일 작성자
5. 게이트 4개 통과 전 배포 금지
6. **강의 본문 집필은 이 계획서의 범위 밖** — 집필은 승인된 backlog에 대해 WF-01로만 진행
