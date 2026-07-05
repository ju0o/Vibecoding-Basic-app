# RELEASE — 2026-07-06 V2 Wave 8

Executor: Codex
Policy: CODEX-PLAN v2 continuous execution
Status: RELEASED internally, deployment still HOLD until Phase 5 approval

## 판정: 배포 가능

검증이 통과했으므로 `terminal-shell-basics-reference`는 V2 Wave 8로 released 처리한다. 실제 외부 배포는 운영자 승인 후에만 진행한다.

## Verify 결과

Source: `ai-ops/outputs/06-build-verification/VERIFIED-2026-07-06-2.md`

- lint: PASS (`biome check .`, 56 files)
- typecheck: PASS (`tsc --noEmit`)
- test: PASS (3 files passed, 8 tests passed)
- build: PASS (Next.js production build, 38 static pages)

## 포함 콘텐츠

### 강의 slug

- `terminal-shell-basics-reference`

### 추가 다이어그램

- `src/content/lessons/diagrams/terminal-shell-basics-reference/terminal-command-flow.svg`

### 추가 용어

- Terminal
- Shell
- Command Line
- Current Directory
- Shell Profile
- Basic Commands
- PowerShell Cmdlet
- Command Output

### 사용된 KB id

- `terminal-shell-commands`

## 사이트 파일

- `src/content/lessons/markdown/terminal-shell-basics-reference.md`
- `src/content/lessons/diagrams/terminal-shell-basics-reference/terminal-command-flow.svg`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`

## 개정 사항

- Lesson markdown file matches its P-04 draft `lesson.md` file.
- Diagram SVG file matches its P-04 draft SVG file.
- Site order uses `development-basics` order 2 with no order conflict.
- Deployment remains held until CODEX-PLAN Phase 5 developer-server confirmation and operator approval.
