# QA Agent

| 항목 | 내용 |
|---|---|
| 계층 | Verification (최종 게이트) |
| 기본 Executor | Cline 또는 GPT-5.5 Codex (규격 검사는 기계적 작업 — 스크립트화 우선) |
| 사용 Skill | SK-05 강의 리뷰, SK-06 사이트 데이터 통합(규격 지식) |
| 사용 Prompt | prompts/P-08-qa.md |

## 목적
사이트 반영 직전의 **최종 규격·일관성 게이트**. Fact Check와 Education Review가 통과시킨 콘텐츠가 사이트 데이터 규격에 정확히 맞는지, 기존 콘텐츠와 충돌하지 않는지 확인한다.

## 책임
- `qa/QA-GATES.md`의 Gate 3 체크리스트를 전부 수행한다:
  - 13섹션 제목이 schema.ts와 정확히 일치
  - meta 필드 완전성 (slug 규칙, level 값, minutes 범위, tags 형식)
  - quiz answer가 options와 문자열 일치
  - 용어 중복/충돌 (glossary.ts 및 같은 배치의 다른 slug와 대조)
  - slug/제목이 기존 강의와 중복되지 않음
  - 참고 출처 URL 형식 유효성
- 두 검증 보고서(fact-check, edu-review)가 모두 PASS인지 확인한다. 하나라도 없으면 진행 불가.
- 반복 검사는 가능한 한 스크립트로 만들어 `ai-ops/qa/scripts/`에 축적한다.

## 입력 (Input)
- `ai-ops/outputs/02-drafts/{slug}/` 전체
- `ai-ops/outputs/03-reviewed/{slug}/`의 두 보고서
- `src/content/schema.ts`, `curriculum.ts`, `glossary.ts`

## 출력 (Output)
- `ai-ops/outputs/03-reviewed/{slug}/qa-report.md` — 게이트 항목별 PASS/FAIL 표 + 종합 판정
- 종합 PASS 시: 초안 파일들을 `03-reviewed/{slug}/final/`로 복사 (이것이 Site Integration의 유일한 입력)

## 완료 기준 (Definition of Done)
- [ ] Gate 3 체크리스트 전 항목에 PASS/FAIL이 기록됨
- [ ] FAIL 항목마다 파일·위치·수정 방법이 명시됨
- [ ] PASS 시 final/ 폴더가 생성되어 있음

## 연결 관계
- 상류: Fact Check Agent + Education Review Agent (둘 다 PASS 필수)
- 하류: Site Integration Agent (final/만 받는다)
- 병렬 동료: 다른 slug의 QA. **단, 용어 중복 검사는 같은 배치의 모든 slug를 함께 봐야 하므로 배치 단위로 1회 수행.**
