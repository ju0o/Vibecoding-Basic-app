# CODEX 마스터 계획서 — 바이브코딩 종합 지식 사이트 구축

> **이 문서는 Codex에게 그대로 전달하는 전체 위임 계획서다** (O-05, 2026-07-05). Codex는 이 계획서만으로 커리큘럼 설계 → 자료 수집 → 검증 → 강의 생성 → 시각 자료 → 사이트 구현까지 전부 수행한다. 운영자는 Phase 경계에서 Approve/Reject만 한다.

---

## 1. 만드는 것 (제품 정의)

**AI Vibe Coding Master** = 바이브코딩의 모든 지식을 깊이 있게 모아놓은 사이트. 세 개의 지식 기둥:

| 기둥 | 내용 | 예 |
|---|---|---|
| A. 코딩 기반 지식 | 바이브코딩을 하기 위해 알아야 하는 최소한의 코딩 지식 | IDE·에디터, 터미널, HTML/CSS/JS, TypeScript, Git, API/DB, 배포 |
| B. 바이브코딩 본체 | 등장부터 현재까지의 **전체 흐름과 맥락** + 핵심 개념 | 자동완성(Copilot) 시대 → 챗 코딩(ChatGPT) → 에이전트 도구(Claude Code·Codex·Cursor 등) → 현재. "vibe coding" 용어의 기원(Karpathy, 2025)과 진화 |
| C. AI 엔지니어링 심화 | 전문가 수준의 깊은 지식 | Context Engineering, Tool Calling, RAG, MCP, Agent, Multi-Agent, Loop/Harness Engineering |

**품질 방향 (운영자 확정, 변경 불가)**:
- 얕은 요약 금지 — 전문가 수준 깊이 (형식 규격: [roadmap/CONTENT-FORMAT-V2.md](roadmap/CONTENT-FORMAT-V2.md))
- 공식 문서·전문 문서 **원문 인용** (원어+번역+링크+해설) 중심
- `==형광 하이라이트==` 등 가독성 장치
- **이해를 돕는 시각 자료** (다이어그램) — 필요한 곳에
- 퀴즈·체크리스트·설명연습 없음
- 모든 사실은 공식 출처로 검증 (Knowledge Score 80+ 후에만 강의화)

## 2. Phase 0 — 플랫폼 구현 (코드 작업, 최우선)

[prompts/D-01-format-v2.md](prompts/D-01-format-v2.md)의 전체 작업 + 추가 1건:

- D-01: V2 스키마(8섹션)·파서·`==mark==` 렌더링·blockquote 인용 스타일·퀴즈/체크리스트 UI 제거·기존 메타 마이그레이션
- **추가 — 시각 자료 렌더링**: 강의 본문에 다이어그램 삽입 지원. 방식: **인라인 SVG 파일** (`src/content/lessons/diagrams/{slug}/{n}-{이름}.svg`, 마크다운 이미지로 참조). 요건: 텍스트 기반(버전 관리 가능), 라벨은 본문 용어와 일치, 다크모드 안전 색상(CSS currentColor 또는 중립색), 강의당 0~3개 (남발 금지 — 구조·흐름·비교를 글보다 빨리 전달할 때만)
- 완료 판정: `npm run verify` 통과 + 강의 페이지에서 mark·인용·SVG 렌더 확인

## 3. Phase 1 — 전체 커리큘럼 확정 (설계 작업)

기존 13개 모듈(schema.ts MODULE_IDS — 변경 금지)에 세 기둥을 배치한 **전체 강의 목록**을 설계한다.

- 입력: [roadmap/CURRICULUM-MAP.md](roadmap/CURRICULUM-MAP.md) (기존 지도 — 갱신 대상), [sources/COLLECTION-PLAN.md](sources/COLLECTION-PLAN.md) (주제군 T01~T12)
- **신설 필수**: 기둥 B의 "바이브코딩 역사와 흐름" 강의들 — 기존 지도에 없던 축. 예: 바이브코딩이란 무엇인가(용어 기원 포함) / 자동완성에서 에이전트까지(도구 연대기) / 바이브코딩 워크플로의 현재. M01(시작하기)·M09(AI 코딩 도구)에 배치
- 각 강의: slug, 모듈, order, 제목, 레벨, 선행 강의, **근거 KB id** (SK-03 규칙: 선행 그래프, 레벨 곡선, slug 규칙)
- 산출: CURRICULUM-MAP.md 갱신 + `outputs/00-backlog/BACKLOG.md` 전면 갱신 + 필요한 KB 전체 목록(주제군별)
- **🚪 운영자 게이트 1**: 커리큘럼 승인 후 Phase 2 진행

## 4. Phase 2 — KB 수집·검증 (지식 작업)

강의보다 KB가 항상 한 물결 앞선다. 배치 단위(개념 5~8개)로 반복:

1. **수집**: [knowledge-base/_TEMPLATE.md](knowledge-base/_TEMPLATE.md) 규격 (13섹션 + **Quote Bank 5개 이상** — 인용할 원문 구절 그대로 채집). 규칙: 공식 출처 우선([sources/SOURCE-REGISTRY.md](sources/SOURCE-REGISTRY.md)), 모든 주장에 URL+확인 날짜, 오늘 연 문서만
2. **검증**: [qa/KNOWLEDGE-SCORE.md](qa/KNOWLEDGE-SCORE.md) — 게이트 4 + 기준 7, 80점 미달 시 재수집 (최대 2회). **수집한 세션과 다른 새 세션에서 검증할 것** (자기 검증 금지 — 세션을 새로 열어 이 계획서와 함께 "Phase 2 검증"을 지시받은 것으로 간주)
3. 기존 qa_approved 5건(context-engineering, tool-calling, mcp, rag, agent-loop): **Quote Bank만 보강** 후 경량 재검증
- 산출: `knowledge-base/entries/`, `reviews/`, MASTER_PROGRESS 갱신

## 5. Phase 3 — 강의 생성·시각 자료·사이트 반영 (콘텐츠 작업)

qa_approved KB가 확보된 강의부터, 배치(3~5강) 단위로:

1. **V2 Deep Dive 생성**: [prompts/P-04-lesson-generation.md](prompts/P-04-lesson-generation.md) 명세 — 8섹션, ≥8,000자, 인용 3+ (Quote Bank에서만), 하이라이트 상한, KB 외 사실 0건
2. **다이어그램**: 작동 원리·아키텍처 설명에 필요한 곳에 SVG 제작 (Phase 0 규격)
3. **기존 V1 9강 전량 재생성 우선** (released됐지만 얕음 — 미배포라 사용자 노출 없음)
4. **반영**: lesson md + meta(checklist/exercise 없음) + glossary 용어 → src/content (콘텐츠 무수정 원칙, curriculum.ts는 한 세션에서만)
- 산출: 강의별 02-drafts → src/content 반영 기록

## 6. Phase 4 — 검증·릴리스 (품질 작업)

배치마다: `npm run verify` (lint+typecheck+test+build) → 실패 시 통합 실수만 수정(콘텐츠 문장 무수정) 후 재검증 → 통과 시 릴리스 노트(`outputs/04-integrated/RELEASE-{date}.md`) + **src/content 포함 커밋** (git show --stat으로 누락 확인 — 과거 2회 누락 사례 있음)
- **🚪 운영자 게이트 2**: 첫 V2 배치 릴리스 시 품질 확인 (깊이·인용·가독성이 의도에 맞는지 — 여기서 규격 조정 가능)
- **🚪 운영자 게이트 3**: 배포 (환경 결정 포함 — Vercel 권장)

## 7. 작업 방식 (모든 Phase 공통)

- **진행 기록**: 매 작업 후 `MASTER_PROGRESS.md`(항목 상태)와 `STATE.md`(현황판+NEXT_ACTION 블록 — 규격: [OPERATION_MANUAL.md](OPERATION_MANUAL.md)) 갱신 + git 커밋. 보고만 있고 파일이 없으면 무효
- **NEXT_ACTION**: 모든 세션 종료 보고는 NEXT_ACTION 블록으로 끝낸다 — 다음 세션이 무엇을 해야 하는지, 운영자 승인이 필요한지 명시
- **막히면**: 임의로 진행하지 말고 ESCALATED로 운영자 결정 요청 (선택지 2~3개 + 권고안 형식)
- **품질 불변 조건**: 공식 출처 없는 주장 금지 / KB 없는 강의 금지 / 검증은 새 세션 / verify 없는 릴리스 금지
- Fable(Claude 오케스트레이터)은 Phase 게이트에서 운영자를 보좌해 산출물을 감사한다 — Codex는 신경 쓸 필요 없음

## 8. 시작 지시 (첫 세션)

```
ai-ops/CODEX-PLAN.md를 읽고 Phase 0부터 시작하라.
Phase 0 완료 후 NEXT_ACTION으로 Phase 1(커리큘럼) 착수를 안내하라.
```
