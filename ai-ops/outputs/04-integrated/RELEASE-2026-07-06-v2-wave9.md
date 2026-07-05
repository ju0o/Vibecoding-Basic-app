# RELEASE — 2026-07-06 V2 Wave 9

Executor: Codex
Policy: CODEX-PLAN v2 continuous execution
Status: RELEASED internally, deployment still HOLD until Phase 5 approval

## 판정: 배포 가능

검증이 통과했으므로 `variables-types-and-data-shapes`, `control-flow-functions-errors`, `debugging-error-reading`, `regex-for-code-search`는 V2 Wave 9로 released 처리한다. 실제 외부 배포는 운영자 승인 후에만 진행한다.

## Verify 결과

Source: `ai-ops/outputs/06-build-verification/VERIFIED-2026-07-06-3.md`

- lint: PASS (`biome check .`, 64 files)
- typecheck: PASS (`tsc --noEmit`)
- test: PASS (3 files passed, 8 tests passed)
- build: PASS (Next.js production build, 42 static pages)

## 포함 콘텐츠

### 강의 slug

- `variables-types-and-data-shapes`
- `control-flow-functions-errors`
- `debugging-error-reading`
- `regex-for-code-search`

### 추가 다이어그램

- `src/content/lessons/diagrams/variables-types-and-data-shapes/variables-data-shape-flow.svg`
- `src/content/lessons/diagrams/control-flow-functions-errors/control-function-error-flow.svg`
- `src/content/lessons/diagrams/debugging-error-reading/debugging-evidence-loop.svg`
- `src/content/lessons/diagrams/regex-for-code-search/regex-search-flow.svg`

### 추가 용어

- Variable
- Value
- Primitive Value
- Object Shape
- Array
- Control Flow
- Conditional
- Loop
- Function
- Exception Handling
- Debugging
- Error Message
- Breakpoint
- Call Stack
- Evidence Packet
- Regular Expression
- RegExp
- Character Class
- Assertion
- Search Scope

### 사용된 KB id

- `variables-types-data`
- `control-flow-functions-errors`
- `debugging-error-reading`
- `regex-code-search`

## 사이트 파일

- `src/content/lessons/markdown/variables-types-and-data-shapes.md`
- `src/content/lessons/markdown/control-flow-functions-errors.md`
- `src/content/lessons/markdown/debugging-error-reading.md`
- `src/content/lessons/markdown/regex-for-code-search.md`
- `src/content/lessons/diagrams/variables-types-and-data-shapes/variables-data-shape-flow.svg`
- `src/content/lessons/diagrams/control-flow-functions-errors/control-function-error-flow.svg`
- `src/content/lessons/diagrams/debugging-error-reading/debugging-evidence-loop.svg`
- `src/content/lessons/diagrams/regex-for-code-search/regex-search-flow.svg`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`

## 개정 사항

- Lesson markdown files match their P-04 draft `lesson.md` files.
- Diagram SVG files match their P-04 draft SVG files.
- Site order uses `development-basics` order 3-6 with no order conflict.
- Deployment remains held until CODEX-PLAN Phase 5 developer-server confirmation and operator approval.
