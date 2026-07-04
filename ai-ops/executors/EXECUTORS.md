# Executor 배정 문서

Executor = 실제로 프롬프트를 실행하는 AI 도구. **Agent(역할)와 Executor(도구)는 분리된다** — Agent 정의와 프롬프트는 Executor 이름을 모른 채 동작하고, 이 문서만이 "지금 누가 무엇을 맡는가"를 기록한다. Executor를 바꾸려면 이 문서의 표만 고치면 된다.

## 현재 배정표

| Agent | 1순위 Executor | 2순위(대체) | 배정 이유 |
|---|---|---|---|
| Chief Orchestrator 보좌 | Claude Fable 5 | — | 전체 파이프라인 맥락 유지, 파일 오케스트레이션 |
| Curriculum | Claude Fable 5 | GPT-5.5 | 커리큘럼 전체를 한 컨텍스트에 놓는 장문 추론 |
| Research | Claude Fable 5 | GPT-5.5 | 웹 리서치 + 긴 문서 요약 + 출처 규율 |
| Lesson Writer | Claude Fable 5 | GPT-5.5 | 한국어 교육 문체, 비유 생성 품질 |
| Quiz | GPT-5.5 (Codex) | Cline | 규격이 명확한 생성 — 상위 모델 불필요 |
| Terminology | GPT-5.5 (Codex) | Trae | 대량 규격 생성, 배치 처리 |
| Fact Check | **작성자와 반대** (기본 GPT-5.5) | Claude Fable 5 | 교차 검증 원칙 — 같은 모델의 같은 오류 방지 |
| Education Review | Claude Fable 5 (새 세션) | GPT-5.5 | 교육적 판단·한국어 뉘앙스. 단 작성 세션과 분리 |
| QA | Cline | GPT-5.5 | 기계적 규격 검사 + 로컬 파일 접근, 스크립트화 유리 |
| Site Integration | GPT-5.5 (Codex) | Cline | TypeScript 편집 + 커맨드 실행 |
| Release | GPT-5.5 (Codex) | Cline | 빌드·테스트 실행과 로그 해석 |
| Illustration (Ph2) | Claude Fable 5 | — | SVG/다이어그램 코드 생성 |
| Source Collector | Trae | GPT-5.5 | 주제 단위 대량 수집 — 판단 최소화 작업이라 저비용 Executor 적합 |
| Final Editorial | Claude Fable 5 | — | 사이트 전체를 한 컨텍스트에 놓는 통독 판단 |

## Executor별 상세 (강점 / 맡기면 안 되는 작업 / 프롬프트 / 출력 / 핸드오프)

### Claude Fable 5 (Claude Code)
- 강점: 장문 컨텍스트 유지, 한국어 글쓰기 품질, 웹 리서치·검증 규율, 서브에이전트로 자체 병렬화 가능, 파일 시스템 직접 접근
- 맡기기 좋은 작업: 커리큘럼 설계, 강의 집필, 교육 검토, 최종 편집(사이트 통독), 리서치 브리프
- **맡기면 안 되는 작업**: 자기가 쓴 강의의 사실 검증(교차 원칙 위반), 퀴즈·용어 대량 생산(비용 낭비)
- 프롬프트: P-01, P-02, P-03, P-07, P-11, P-13
- 출력 형식: 각 프롬프트가 지정한 outputs/·reports/ 경로의 md 파일
- 핸드오프: 산출물 저장 → PIPELINE.md 자기 slug 행 갱신 → 다음 담당 Executor에 프롬프트 전달은 운영자(또는 오케스트레이터 세션)가 수행

### GPT-5.5 (Codex)
- 강점: 코드 편집·실행 신뢰성, 규격 준수 생성, 병렬 외주(여러 인스턴스) 운용 용이
- 맡기기 좋은 작업: 사실 검증(Claude 작성분 교차), 사이트 반영(TS 편집), 릴리스, 퀴즈·용어 생산
- **맡기면 안 되는 작업**: 자기가 쓴 콘텐츠의 검증, 한국어 문체가 중요한 본문 집필의 단독 수행(Education Review 없이), 커리큘럼 전체 판단
- 프롬프트: P-04, P-05, P-06, P-09, P-10
- 출력 형식: 검증 보고서 md / src·content 코드 변경 + 04-integrated 반영 기록
- 핸드오프: 반영 기록·보고서 저장 후 lint/typecheck 로그를 기록에 첨부 → PIPELINE.md 갱신

### Trae
- 강점: IDE 통합 에이전트 — 반복적 파일 작업, 저비용 배치 작업
- 맡기기 좋은 작업: 자료 수집(P-12 — 출처 지도 작성), 용어 배치 생산, 산출물 파일 정리
- **맡기면 안 되는 작업**: 검증 계층 전체(Fact Check·Edu Review·QA), 커리큘럼 판단, 강의 본문 집필
- 프롬프트: P-12, P-05
- 출력 형식: `sources/notes/{topic}.md`, `outputs/02-drafts/glossary-batch-{n}/terms.md`
- 핸드오프: 수집 노트 저장 → 운영자가 Curriculum/Research에 노트 경로를 다음 프롬프트에 채워 전달

### Cline
- 강점: VS Code 내 파일 접근 + 커맨드 실행, 백엔드 모델 교체 가능(비용 조절 용이)
- 맡기기 좋은 작업: 빌드 검증(P-10 — npm run verify 실행·로그 해석), QA 게이트 체크리스트·스크립트 실행, Site Integration 대체
- **맡기면 안 되는 작업**: 창의 작업(집필·비유), 교육 판단, 사실 검증(백엔드 모델 편차 위험)
- 프롬프트: P-08, P-10
- 출력 형식: qa-report.md, RELEASE-{date}.md (verify 로그 포함)
- 핸드오프: 릴리스 노트 저장 → 배포 여부는 운영자 승인 대기로 종료

## 배정 원칙 (Executor가 바뀌어도 유지)

1. **판단 작업은 상위 모델, 규격 작업은 하위 모델** — 비용 최적화의 기본
2. **작성자 ≠ 검증자**: Fact Check는 항상 작성 Executor와 다른 것. Education Review는 최소한 다른 세션
3. **파일 접근 가능한 Executor 우선**: 파일을 못 읽는 환경(웹 챗)은 수동 복붙 비용이 커서 배치 작업에 부적합
4. **Release 계층은 커맨드 실행 가능한 Executor만** (npm run verify를 직접 돌려야 함)

## 병렬/순차 실행 규칙 (Executor 관점)

- 병렬 가능: 서로 다른 slug의 리서치·집필·검증. 같은 slug의 lesson/quiz/terms 3작업. 같은 초안의 fact-check/edu-review 2작업
- 순차 필수: Site Integration(전 slug 단일 세션), Release(항상 마지막 단독), BACKLOG.md 수정(Curriculum Agent 단독)
- 상세: [../PARALLEL-STRATEGY.md](../PARALLEL-STRATEGY.md)

## Executor 교체 절차 (영향 최소화 설계)

교체가 쉬운 이유 — 지켜야 계속 쉬움:
1. 모든 지시는 `prompts/`의 표준 프롬프트로만 전달 (Executor 전용 프롬프트 금지)
2. 모든 입출력은 `outputs/`의 파일 규격으로만 (대화 내용에 상태를 남기지 않음)
3. Agent 정의서에 Executor 이름은 "기본 Executor" 참고란에만 존재

교체 시:
1. 이 문서의 배정표에서 해당 행만 수정
2. 새 Executor로 **파일럿 1건** 실행 → 담당 Agent DoD + QA 게이트 통과 확인
3. 통과하면 정식 전환. 프롬프트·Workflow·Agent 문서는 수정할 필요가 없어야 정상 — 수정이 필요했다면 그 내용은 Executor 종속이었다는 뜻이므로 프롬프트를 중립적으로 고친다

## 실행 예시 (강의 5개 배치, 하루 사이클)

```
오전  Claude:   리서치 5건 (서브에이전트 병렬)
      Claude:   본문 5건 집필 시작 (브리프 완료분부터)
      Codex×2:  퀴즈 5건 + 용어 5건 병렬
오후  Codex:    Fact Check 5건 (Claude 작성분 교차 검증)
      Claude(새 세션): Education Review 5건
      Claude/Writer: FIX 루프 처리
저녁  Cline:    QA 게이트 배치 1회
      Codex:    Site Integration 순차 1세션 → Release 1회
```
