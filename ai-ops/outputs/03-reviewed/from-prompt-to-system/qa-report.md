# QA 보고서 (Gate 3): from-prompt-to-system

## 종합: PASS

| 게이트 항목 | 결과 | 상세 |
|---|---|---|
| 선행 검증: fact-check PASS | PASS | FIX 루프 1회 후 재검증 통과 |
| 선행 검증: edu-review PASS | PASS | FIX 루프 1회 후 재검증 통과 |
| 13섹션 제목 = schema.ts 일치 (순서 포함) | PASS | 기계 확인: 13/13 글자 단위 일치 |
| 섹션 누락·중복 없음 | PASS | 13개 정확 |
| slug 규칙 (kebab-case, 3~6단어, 중복 없음) | PASS | from-prompt-to-system (4단어), 기존 6개 강의와 비중복 |
| moduleId ∈ MODULE_IDS | PASS | ai-system-design |
| level 유효 | PASS | 기초 |
| minutes 20~60 | PASS | 40 |
| tags 3~5개 | PASS | 4개 |
| summary 1~2문장 | PASS | 1문장 |
| checklist 3~5개, 행동 문장 | PASS | 4개, 모두 "~한다" |
| quiz options 3개 | PASS | 3개 |
| quiz answer = options 문자열 완전 일치 | PASS | 두 번째 선택지와 글자 단위 일치 확인 |
| quiz explanation 존재 | PASS | 오답 2개 이유 포함 |
| explanationPrompt guide 3~4개 | PASS | 4개 |
| 용어 중복 (glossary.ts 대조, 표기 변형 포함) | PASS | Workflow·AI 시스템 설계 모두 미등재 확인. 기등재 6개 용어는 재생성 안 함 |
| 배치 내 용어 중복 | PASS | 배치 내 단일 slug |
| related 참조 무결성 | PASS | Agent, Context Engineering, Skills, MCP 기등재 / Workflow (이번 배치) |
| category 기존 체계 준수 | PASS | "AI 시스템" 기존 카테고리 재사용 |
| 강의 제목·범위 기존과 중복 없음 | PASS | 기존 order 6 강의와 경계 준수 (조망 vs 지도 — 브리프 경계 정의 확인) |
| 출처 3개 이상, URL 유효, 브리프 정합 | PASS | 5개, 전부 브리프와 일치 |
| 본문 분량 4,000~5,500자 | PASS | 4,025자 |

## 조치
- final/ 생성: lesson.md, meta.md, quiz.md, terms.md 복사 완료
- 특이 기록: 참고 출처 중 platform.claude.com은 docs.anthropic.com에서 이전된 신규 도메인 — SOURCE-REGISTRY.md 갱신 필요 (파이프라인 발견 사항)
