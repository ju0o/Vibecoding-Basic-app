# Prompt Library — 운영 매뉴얼

프롬프트 번호 = **실제 운영 순서**다. P-01부터 순서대로 실행하면 자료 수집에서 릴리스까지 한 배치가 완주된다. 마스터 워크플로: [WF-06 Knowledge Pipeline](../workflows/WF-06-knowledge-pipeline.md)

## 실행 순서 한눈에

```
운영자(Fable) O-01 커리큘럼: 무엇을 만들지 결정 (backlog + 필요한 KB id 지정)
   │
   ▼
┌ Trae ────────────────────────────────────────────┐
│ P-01 Knowledge 수집·KB 생성  (개념 간 병렬 가능)     │
└──────────────────────────────────────────────────┘
   ▼
┌ Codex ───────────────────────────────────────────┐
│ P-02 KB 검증·Knowledge Score                      │
│   ├─ 미달 → Trae P-03 재수집 → P-02 재평가 (최대 2회)│
│   └─ 통과(approved) ▼                             │
│ P-04 Lesson 생성  (slug 간 병렬 가능)               │
│ P-05 사이트 반영  (병렬 금지 — 단일 세션 순차)        │
└──────────────────────────────────────────────────┘
   ▼
┌ Cline ───────────────────────────────────────────┐
│ P-06 Build·Lint·Test·verify                       │
│   ├─ 실패 → Codex P-07 수정 → P-06 재검증 (최대 2회) │
│   └─ 통과 ▼                                       │
│ P-08 Release (배포는 운영자 승인 후)                 │
└──────────────────────────────────────────────────┘
   ▼
운영자(Fable) O-02 최종 편집: 강의 10개 릴리스마다 전역 검토
```

## 프롬프트 목록표

| 순서 | 파일 | Agent | Executor | 입력 파일 | 출력 파일 | 다음 단계 |
|---|---|---|---|---|---|---|
| P-01 | P-01-knowledge-collection.md | Source Collector | **Trae** | COLLECTION-PLAN, KB 템플릿 | `knowledge-base/entries/{Txx}/{id}.md` (draft) | P-02 |
| P-02 | P-02-knowledge-verification.md | FactCheck+EduReview+QA | **Codex** | draft KB, KNOWLEDGE-SCORE.md | `reviews/{id}/verification-report.md`, approved 갱신 또는 재수집 요청서 | 통과→P-04 / 미달→P-03 |
| P-03 | P-03-knowledge-recollection.md | Source Collector | **Trae** | recollection-request-{n}.md | 보강된 KB 문서 | P-02 재평가 |
| P-04 | P-04-lesson-generation.md | Writer+Quiz+Terminology | **Codex** | approved KB, BACKLOG 항목 | `outputs/02-drafts/{slug}/` 4종 | P-05 |
| P-05 | P-05-site-integration.md | Site Integration | **Codex** | 02-drafts | `src/content/` 변경, 04-integrated 기록, KB consumers | P-06 |
| P-06 | P-06-build-verification.md | Release (Build QA) | **Cline** | 워킹 트리 | VERIFIED 보고 또는 BUILD-FAIL-{date}-{n}.md | 통과→P-08 / 실패→P-07 |
| P-07 | P-07-build-fix.md | Site Integration (수정) | **Codex** | BUILD-FAIL 보고서 | 통합 코드 수정 | P-06 재검증 |
| P-08 | P-08-release.md | Release | **Cline** | VERIFIED 보고, 04-integrated | RELEASE-{date}.md, 커밋 | 운영자 배포 승인 |
| O-01 | orchestrator/O-01-curriculum.md | Curriculum | **Fable (오케스트레이터)** | curriculum.ts, CURRICULUM-MAP | BACKLOG.md | P-01 착수 근거 |
| O-02 | orchestrator/O-02-final-editorial.md | Final Editorial | **Fable (오케스트레이터)** | src/content 전체, FINAL-SITE-STRATEGY | `reports/editorial-{date}.md`, REVISION-BACKLOG | WF-03 개정 |

## 최종 실행 순서 (운영자 기준 — 이 순서 그대로)

1. **O-01** (Fable) — 배치의 backlog·KB id 확정 (새 배치 시작 시에만)
2. **P-01** (Trae) — KB 수집·생성
3. **P-02** (Codex) — KB 검증·Score
4. **P-03** (Trae) — Loop A: Score 미달 시에만 → 3번 재실행
5. **P-04** (Codex) — Lesson 생성
6. **P-05** (Codex) — 사이트 반영
7. **P-06** (Cline) — Build·verify
8. **P-07** (Codex) — Loop B: verify 실패 시에만 → 7번 재실행
9. **P-08** (Cline) — Release
10. **O-02** (Fable) — 강의 10개 릴리스마다 최종 편집

## 다음 단계로 넘기는 방법 (공통 규칙)

1. Executor의 완료 보고에서 **완료 기준 체크 결과**와 **산출물 파일 경로**를 확인한다
2. 산출물 파일이 실제로 존재하는지 확인한다 (보고만 있고 파일이 없으면 무효)
3. [../MASTER_PROGRESS.md](../MASTER_PROGRESS.md)의 해당 칸을 갱신한다
4. 다음 프롬프트 파일을 열어 `{중괄호}` 값을 채우고 다음 Executor에 붙여넣는다
5. 루프 프롬프트(P-03, P-07)는 요청서/보고서의 `{n}`을 반드시 확인 — n=3이면 프롬프트를 실행하지 말고 에스컬레이션

## 사용 규칙

- `{중괄호}` 자리만 채우고 본문은 수정하지 않는다. 수정이 필요하면 이 라이브러리 파일을 고쳐 모든 실행에 동일 적용 (Executor별 분기 금지)
- Executor가 파일 접근이 안 되는 환경이면 입력 파일 내용을 프롬프트 뒤에 붙여넣고 산출물을 수동 저장
- 병렬 실행: P-01·P-04는 다중 세션 가능. P-05~P-08은 배치당 1회 순차

## 구 프롬프트 매핑 (archive/)

| 구 (archive/) | 신 | 변경 요지 |
|---|---|---|
| P-01-research (강의별 브리프) | P-01 (KB 생성) | 리서치 단위가 강의→개념, 산출물이 브리프→KB 문서 |
| P-02-curriculum | O-01 | 오케스트레이터 전용으로 이동 |
| P-03-lesson-writer, P-04-quiz, P-05-terminology | P-04 (통합) | KB에서 4종 세트 일괄 생성 |
| P-06-fact-check, P-07-edu-review, P-08-qa | P-02 (통합) | 검증 대상이 강의→KB, Knowledge Score 추가 |
| P-09-site-integration | P-05 | KB consumers 갱신 추가 |
| P-10-release | P-06 + P-08 분리 | 빌드 검증과 릴리스 분리 (Loop B 지원) |
| P-11-fix-loop | P-03 (지식) + P-07 (빌드) | 루프 2종으로 분화 |
| P-12-source-collection | P-01에 흡수 | 수집과 KB 작성 통합 |
| P-13-final-editorial | O-02 | 오케스트레이터 전용으로 이동 |
