# RELEASE-2026-07-05 V2 Wave 1

**CODEX-PLAN Phase 2+3 / R3 V1 9강 V2 재생성**

## 판정

배포 가능 상태로 재생성 완료. 배포 자체는 CODEX-PLAN Phase 5 보고 이후 운영자 승인 전까지 HOLD.

## 포함 강의

- from-prompt-to-system
- context-engineering-basics
- context-window-and-memory
- system-prompts-and-instruction-layers
- ai-workflow-design
- tool-calling-basics
- rag-fundamentals
- mcp-architecture-basics
- agent-loop-anatomy

## 산출물

- `ai-ops/outputs/02-drafts/{slug}/lesson.md`
- `ai-ops/outputs/02-drafts/{slug}/meta.md`
- `ai-ops/outputs/02-drafts/{slug}/terms.md`
- `src/content/lessons/markdown/{slug}.md`
- `src/content/curriculum.ts`

## V2 자가 QA

| 항목 | 결과 |
|---|---|
| V2 8섹션 | PASS |
| 분량 8,000자 이상 | PASS (9개 모두 9,500자 이상) |
| Quote Bank 인용 3개 이상 | PASS (9개 모두 4개) |
| quiz/checklist/exercise 제거 | PASS |
| 사이트 Markdown 반영 | PASS |
| curriculum metadata 반영 | PASS |
| 긴 인용 citation-review 기록 | 해당 없음 |

## Verify 결과

- lint PASSED
- typecheck PASSED
- test PASSED (3 files, 7 tests)
- build PASSED (21 routes)

## 참고

- 긴 인용은 사용하지 않았다.
- `ai-ops/reports/citation-review.md`에 V2 Wave 1 검토 결과를 기록했다.
