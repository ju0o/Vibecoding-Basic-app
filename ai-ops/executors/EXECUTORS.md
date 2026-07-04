# Executor 배정 문서

Executor = 실제로 프롬프트를 실행하는 AI 도구. **Agent(역할)와 Executor(도구)는 분리된다** — Agent 정의와 프롬프트는 Executor 이름을 모른 채 동작하고, 이 문서만이 "지금 누가 무엇을 맡는가"를 기록한다. Executor를 바꾸려면 이 문서의 표만 고치면 된다.

## 현재 배정표 (KB 체제, 2026-07-04 개편)

작업 Executor는 **Trae / Codex / Cline** 3원 체제. Claude Fable 5는 작업자가 아니라 **오케스트레이터**(운영자 보좌 — 커리큘럼 결정, 프롬프트 전달, 에스컬레이션 판단, 최종 편집)다.

| Executor | 담당 단계 | 프롬프트 | 교차 검증 관계 |
|---|---|---|---|
| **Trae** | KB 수집·생성, 재수집 루프 | P-01, P-03 | Trae가 만든 KB를 Codex가 검증 (작성자≠검증자 충족) |
| **Codex (GPT-5.5)** | KB 검증·Score, Lesson 생성, 사이트 반영, 빌드 수정 | P-02, P-04, P-05, P-07 | Codex가 만든 강의·통합을 Cline이 빌드로 검증 |
| **Cline** | 빌드 검증, 릴리스 | P-06, P-08 | 판정 전담 — 수정 권한 없음 (수정은 Codex) |
| **Claude Fable 5** (오케스트레이터) | 커리큘럼, 최종 편집, 파이프라인 조율 | O-01, O-02 | 파이프라인 밖에서 전체 품질 감독 |

구 배정표(강의별 브리프 체제)는 git 이력 참조. 2순위 대체: Trae↔Codex(수집), Codex↔Cline(통합·릴리스)은 상호 대체 가능 — 교차 검증 관계만 유지할 것.

## Executor별 상세 (강점 / 맡기면 안 되는 작업 / 프롬프트 / 출력 / 핸드오프)

### Claude Fable 5 (Claude Code)
- 강점: 장문 컨텍스트 유지, 한국어 글쓰기 품질, 웹 리서치·검증 규율, 서브에이전트로 자체 병렬화 가능, 파일 시스템 직접 접근
- 역할 (KB 체제): **오케스트레이터** — 커리큘럼 결정(O-01), 최종 편집(O-02), Executor 간 프롬프트 전달·산출물 확인, 에스컬레이션 판단
- **맡기면 안 되는 작업**: 파이프라인 내 생산·검증 작업 (오케스트레이터가 생산에 참여하면 감독 기능 상실 + 비용 낭비)
- 프롬프트: O-01, O-02
- 출력 형식: 각 프롬프트가 지정한 outputs/·reports/ 경로의 md 파일
- 핸드오프: 산출물 저장 → PIPELINE.md 자기 slug 행 갱신 → 다음 담당 Executor에 프롬프트 전달은 운영자(또는 오케스트레이터 세션)가 수행

### GPT-5.5 (Codex)
- 강점: 코드 편집·실행 신뢰성, 규격 준수 생성, 병렬 외주(여러 인스턴스) 운용 용이
- 맡기기 좋은 작업: KB 검증·Knowledge Score(Trae 산출물 교차 검증), Lesson 생성(KB 파생), 사이트 반영(TS 편집), 빌드 수정
- **맡기면 안 되는 작업**: 자기가 검증한 KB의 재검증 생략, KB 없는 강의 생성(재조사 금지 원칙), 빌드 판정(Cline 소관 — 수정자가 판정하면 안 됨)
- 프롬프트: P-02, P-04, P-05, P-07
- 출력 형식: verification-report.md / 02-drafts 4종 / src·content 변경 + 04-integrated 기록
- 핸드오프: 보고서·기록 저장 + PIPELINE.md 갱신 → 운영자가 다음 프롬프트 전달

### Trae
- 강점: IDE 통합 에이전트 — 반복적 파일 작업, 저비용 배치 작업
- 맡기기 좋은 작업: KB 수집·생성(P-01 — 템플릿 규격의 대량 작성), 재수집 루프(P-03 — 요청서 지시 이행)
- **맡기면 안 되는 작업**: 검증·Score 평가(자기 산출물 검증 금지), 커리큘럼 판단, Lesson 생성
- 프롬프트: P-01, P-03
- 출력 형식: `knowledge-base/entries/{Txx}/{id}.md` (frontmatter + 13섹션)
- 핸드오프: KB 파일 경로 목록 보고 → 운영자가 Codex에 P-02 전달

### Cline
- 강점: VS Code 내 파일 접근 + 커맨드 실행, 백엔드 모델 교체 가능(비용 조절 용이)
- 맡기기 좋은 작업: 빌드 검증(P-06 — npm run verify 실행·로그 발췌·판정), 릴리스(P-08 — 노트 작성·커밋)
- **맡기면 안 되는 작업**: 코드·콘텐츠 수정(판정자와 수정자 분리 — 수정은 Codex P-07), 창의 작업, 교육 판단
- 프롬프트: P-06, P-08
- 출력 형식: VERIFIED 보고 또는 BUILD-FAIL-{date}-{n}.md, RELEASE-{date}.md
- 핸드오프: 판정 보고 → 실패 시 운영자가 Codex에 P-07 전달, 통과 시 P-08 연속 실행 후 운영자 배포 승인 대기

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

## 실행 예시 (KB 5개 → 강의 3개 배치, 하루 사이클)

```
오전  Trae×2:  P-01 KB 수집 5건 (개념 간 병렬 — 세션 나눠 배정 가능)
      Codex:   P-02 검증·Score (완성분부터 순차 처리)
오후  Trae:    P-03 재수집 (미달분 루프)  →  Codex: P-02 재평가
      Codex×2: P-04 Lesson 생성 3건 (approved KB 확보분, slug 간 병렬)
저녁  Codex:   P-05 사이트 반영 (단일 세션 순차)
      Cline:   P-06 verify → (실패 시 Codex P-07 → Cline P-06) → P-08 릴리스
      Fable:   산출물 확인, PIPELINE 갱신, 익일 배치 계획
```
