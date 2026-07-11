# RELEASE NOTE — Practical Vibe Coding Release Wave

## 판정: 배포 가능

- date: 2026-07-12
- executor: Codex
- release status: released internally, deployment HOLD
- verification report: `ai-ops/outputs/06-build-verification/VERIFIED-2026-07-12-3.md`

## Verify 결과

- lint: PASS (`biome check .`, 151 files checked)
- typecheck: PASS (`tsc --noEmit`)
- test: PASS (Vitest 3 files, 8 tests)
- build: PASS (Next.js 16.2.10, 148 static pages generated)

## 포함 콘텐츠

### Lesson Slugs

- `ai-code-review-tools`
- `requirement-to-task-breakdown`
- `prompt-to-implementation-loop`
- `code-change-risk-analysis`

### 추가 용어

- AI Review Comment
- Suggested Change
- Review Instruction
- Comment Review Boundary
- Parent Issue
- Sub-issue
- Acceptance Criteria
- Reviewable Plan
- Implementation Loop
- Follow-up Prompt
- Repository Instruction
- Verification Feedback
- Diff Scope
- Risk Signal
- Security Alert
- Manual Review Boundary

### 사용 KB

- `ai-code-review-tools`
- `requirement-task-breakdown`
- `prompt-implementation-loop`
- `code-change-risk-analysis`

## 개정 사항

- 4개 V2 lesson markdown을 사이트 콘텐츠로 반영
- 4개 SVG 다이어그램을 추가하고 markdown에서 참조
- `curriculum.ts`에 AI 코딩 도구 1강, 실전 바이브코딩 3강 metadata 추가
- `glossary.ts`에 16개 용어 추가
- 각 KB frontmatter `consumers` 갱신

## 배포

- P-09 배포는 수행하지 않음
- 운영자 배포 승인 대기
