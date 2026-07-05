# RELEASE — 2026-07-05 V2 Wave 5

Executor: Codex  
Policy: O-05.2 continuous execution  
Status: RELEASED internally, deployment still HOLD until Phase 5 approval

## Verdict

배포 가능. 실제 외부 배포는 운영자 승인 후에만 진행한다.

## Verification Result

Source: `ai-ops/outputs/06-build-verification/VERIFIED-2026-07-05-6.md`

- lint: PASS (`biome check .`, 45 files)
- typecheck: PASS (`tsc --noEmit`)
- test: PASS (`3 passed`, `7 tests`)
- build: PASS (Next.js production build, 32 static pages)

## Released Lessons

- `tokenization-and-context`
- `prompt-engineering-foundations`
- `grounding-and-citations`
- `hallucination-and-verification`

## Added Glossary Terms

- Tokenization
- Token Counting
- Context Budget
- Context Rot
- Prompt Contract
- Evidence Policy
- Output Format Control
- XML Prompt Tags
- Evidence Missing Behavior
- Grounding
- Citation
- Citable Unit
- Stable Source ID
- Source Locator
- Hallucination
- Verification
- Claim Audit
- Uncertainty Permission
- Evaluation Set

## KB Used

- `tokenization-context`
- `prompt-engineering`
- `grounding-citations`
- `hallucination-verification`

## Site Files

- `src/content/lessons/markdown/tokenization-and-context.md`
- `src/content/lessons/markdown/prompt-engineering-foundations.md`
- `src/content/lessons/markdown/grounding-and-citations.md`
- `src/content/lessons/markdown/hallucination-and-verification.md`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`

## Notes

- Lesson markdown files match their P-04 draft `lesson.md` files exactly.
- Site order uses `ai-basics` order 1-4 with no order conflict.
- Deployment remains held until CODEX-PLAN Phase 5 developer-server confirmation and operator approval.
