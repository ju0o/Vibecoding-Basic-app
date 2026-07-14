# Batch 3 Context Package — Track B 심화 (파일 연결 · FE · BE · API · DB)

```yaml
mode: continuous_curriculum_production
batch: 3
date: 2026-07-14
decision_after_pass: CONTINUE → Batch 4
push: false
```

## Nodes

| id | slug | 학생 질문 (요약) |
|---|---|---|
| B05 | files-connect | 파일이 서로 어떻게 연결되나? |
| B06 | frontend | Frontend는 무엇인가? |
| B07 | backend | Backend는 무엇인가? |
| B08 | api | API는 무엇인가? |
| B09 | database | Database는 왜 필요한가? |

## Sample 재사용

`examples/day1-first-success` — index.html ↔ style.css ↔ main.js, `server.js`를 Backend 교육 앵커로 사용.

## 금지

- 특정 DB/호스팅 제품 순위·가격을 표준처럼 서술
- 빈 메뉴 페이지
- push / deploy
- 유료 API·Auth·실제 DB 연결

## Website last

Research → Content → Practice → Interactive → Quiz/Outcome → IR light → route → /learn 연결

## Allowlist (implementation)

```text
content/courses/vibe-coding-foundation/lessons/11-*.md … 15-*.md
content/practice|assessment/vibe-coding-foundation/11…15*
src/features/learning-interactions/file-connect/**
src/features/learning-interactions/stack-roles/**
src/features/learning-interactions/request-response/**
src/features/learning-interactions/data-store/**
src/app/learn/vibe-coding-foundation/{files-connect,frontend,backend,api,database}/**
src/app/learn/page.tsx
ai-ops/research-queue/RESEARCH_QUEUE.md
ai-ops/curriculum/**
ai-ops/reports/**
ai-ops/STATE.md
```
