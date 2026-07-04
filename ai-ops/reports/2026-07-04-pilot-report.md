# 파일럿 실행 보고서: from-prompt-to-system (WF-01 1회차)

날짜: 2026-07-03 ~ 07-04 / 목적: 파이프라인 검증 (강의 1개는 부산물)

## 진행 상태

| 단계 | 결과 |
|---|---|
| 1 리서치 | 완료 — 브리프 작성, 공식 출처 5/5 (`outputs/01-briefs/from-prompt-to-system.md`) |
| 2 집필 (본문+메타+퀴즈+용어) | 완료 (`outputs/02-drafts/from-prompt-to-system/`) |
| 3 검증 (Fact Check + Edu Review) | 완료 — 각 1건 FIX → FIX 루프 1회 → 재검증 PASS |
| 4 QA Gate 3 | PASS — final/ 생성 |
| 5 사이트 통합 | 완료 — 강의 md 복사, curriculum.ts에 LESSON_META 추가, glossary.ts에 용어 2개 추가 |
| 6 릴리스 (Gate 4: npm run verify) | **미실행 — 운영자 중단. src/content 변경분은 빌드 미검증 상태** |

## 변경 파일 (미커밋)
- `src/content/lessons/markdown/from-prompt-to-system.md` (신규)
- `src/content/curriculum.ts` (LESSON_META 1건 추가)
- `src/content/glossary.ts` (Workflow, AI 시스템 설계 추가)
- `ai-ops/outputs/` 01-briefs, 02-drafts, 03-reviewed 산출물 일체

## 발견 사항 (파이프라인 개선점)

1. **출처 등록부 노후**: docs.anthropic.com → platform.claude.com 으로 이전됨. SOURCE-REGISTRY.md 갱신 필요 → 조치 완료
2. **기존 glossary 데이터가 related 무결성 위반**: "Codex", "SubAgent", "Orchestration", "Loop Engineering", "검증", "테스트" 등 미등재 용어를 related가 참조 중. Gate 3 규칙을 기존 데이터가 위반 → 개정 backlog 등록 필요 (해당 용어들을 WF-02로 등재하는 것이 정공법)
3. **SK-08 규격 결함**: terms.md 초안이 "~입니다" 종결이었으나 기존 glossary는 명사형 종결. Site Integration이 통합 중 문형을 수정(콘텐츠 무수정 원칙의 경미한 위반) → SK-08에 명사형 종결 규칙 추가로 조치 완료
4. **프로세스 편차**: 작성자≠검증자(교차 Executor) 원칙이 단일 세션 파일럿에서는 미충족. 실제 배치에서는 Fact Check를 반드시 다른 Executor에 배정할 것

## 병목 관찰
- 리서치(웹 확인)와 통합(단일 파일 수정)이 시간의 대부분. 집필·퀴즈·용어는 빠름 → 병렬화 이득이 큰 구간은 리서치
- curriculum.ts 수기 편집은 강의 1개도 신경 소모가 큼 → Phase 2 frontmatter 전환의 근거 재확인

## 남은 일
- [ ] `npm run verify` 실행 (Gate 4) → 통과 시 커밋 (운영자 승인 대기)
