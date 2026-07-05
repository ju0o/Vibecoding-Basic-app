# QA 게이트 정의

> **2026-07-05 O-04**: Gate 3의 강의 규격 항목(13섹션·퀴즈·체크리스트)은 [CONTENT-FORMAT-V2.md](../roadmap/CONTENT-FORMAT-V2.md) §7의 V2 체크리스트로 대체됨. 게이트 4단계 구조와 KB 검증(Gate 1~2 상당의 P-02)은 불변.

콘텐츠는 4개의 게이트를 순서대로 통과해야 사이트에 반영된다. **게이트를 건너뛴 콘텐츠는 src/content에 들어갈 수 없다.**

```
Gate 1 (사실)      Fact Check Agent      — 틀린 정보 차단
Gate 2 (교육)      Education Review Agent — 배울 수 없는 강의 차단
Gate 3 (규격·일관성) QA Agent             — 사이트 규격 위반·중복 차단
Gate 4 (빌드)      Release Agent          — 깨진 사이트 차단
```

## Gate 1 — 사실 검증 (Fact Check)
통과 조건: fact-check-report.md의 종합 판정 PASS
- 수치·연도·버전·API 문장 전수 검증 (SK-04 절차)
- 코드 예시 실행 또는 정적 검토 완료
- BLOCK 항목 0건 (삭제·재작성으로 해소)

## Gate 2 — 교육 품질 검증 (Education Review)
통과 조건: edu-review-report.md의 종합 판정 PASS
- 선행 지식 위반 0건
- 난이도 판정 "적정"
- 비유 대응 검토 통과, 체크리스트 실효성 확인

## Gate 3 — 규격·일관성 검증 (QA Agent)
통과 조건: qa-report.md 전 항목 PASS. 체크리스트:

### 구조 규격
- [ ] 13섹션 제목이 `schema.ts` LESSON_SECTION_DEFINITIONS와 글자 단위 일치, 순서 일치
- [ ] 섹션 누락·중복 없음
### 메타데이터
- [ ] slug: kebab-case, 기존 강의와 중복 없음, 3~6단어
- [ ] moduleId가 MODULE_IDS에 존재, level ∈ {입문, 기초, 중급}
- [ ] minutes 20~60, tags 3~5개, summary 1~2문장
- [ ] checklist 3~5개, 모두 행동 문장
### 퀴즈
- [ ] options 정확히 3개
- [ ] answer가 options 중 하나와 문자열 완전 일치
- [ ] explanation 존재, guide 3~4개
### 용어
- [ ] glossary.ts와 중복 0건 (표기 변형 포함 — 대소문자·한/영 표기 변형 검사)
- [ ] 같은 배치의 다른 slug 용어와 중복 0건
- [ ] related 참조가 모두 실존(또는 이번 배치 포함)
- [ ] category가 기존 체계 준수
### 중복·일관성
- [ ] 강의 제목·범위가 기존 강의와 실질 중복 없음
- [ ] 용어 표기가 본문·용어사전·기존 강의에서 통일
### 출처
- [ ] 참고 출처 3개 이상, URL 형식 유효, 브리프 출처와 정합
### 선행 검증 확인
- [ ] Gate 1, Gate 2 보고서가 존재하고 둘 다 PASS

## Gate 4 — 빌드 검증 (Release)
통과 조건: `npm run verify` (lint + typecheck + test + build) 전체 통과

## 반려 규칙
| 게이트 | FAIL 시 반려 대상 | 재검증 범위 |
|---|---|---|
| Gate 1 | Lesson Writer (P-11 FIX 루프) | Fact Check만 재실행 |
| Gate 2 | Lesson Writer (P-11 FIX 루프) | Education Review만 재실행 |
| Gate 3 | 원인 Agent (규격→Writer/Quiz, 용어→Terminology) | Gate 3만 재실행 |
| Gate 4 | Site Integration Agent | 통합 재작업 후 Gate 4만 |

- FIX 루프는 게이트당 최대 2회. 3회째 FAIL이면 운영자 에스컬레이션 (PIPELINE.md 상태 `escalated`)
