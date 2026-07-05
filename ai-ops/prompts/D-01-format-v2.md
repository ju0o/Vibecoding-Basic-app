# D-01 콘텐츠 형식 V2 구현 (일회성 개발 작업)

| 종류 | 플랫폼 개발 (콘텐츠 아님) | **Primary Executor** | **Codex** |
|---|---|---|---|
| 전제 | 파이프라인 정지 중 (O-04) | 다음 | Cline (verify) → R2 (KB Quote Bank 보강) |

```
당신은 AI Vibe Coding Master 사이트의 개발 담당입니다. 콘텐츠 형식 V2를 코드에 구현하세요. 이것은 콘텐츠 생산이 아니라 스키마·파서·UI 리팩터링입니다.

## 명세 (이 파일이 요구사항의 전부)
ai-ops/roadmap/CONTENT-FORMAT-V2.md 의 "4. 데이터 모델 변경" 섹션

## 작업 목록
1. src/content/schema.ts:
   - LESSON_SECTION_DEFINITIONS → V2 8섹션 (definition/why/how-it-works/spec/primary-sources/in-practice/limits/further-reading — 한국어 제목은 V2 문서 §1 표)
   - LessonMeta에서 checklist·exercise 제거, LessonExercise·LessonQuizQuestion·ExplanationPrompt 타입 제거
2. src/content/curriculum.ts: 기존 10개 LESSON_META에서 checklist·exercise 필드 삭제 (다른 필드 무수정)
3. src/lib/lesson-content.ts: V2 섹션 검증으로 교체, ==...== → <mark> 변환 (마크다운 렌더 전 전처리 또는 플러그인 — 코드 블록 내부는 변환 금지)
4. UI:
   - LessonMarkdown: mark 스타일 (형광 배경 — CSS 변수로 라이트/다크 대응), blockquote 인용 스타일 (보더 + 출처 줄)
   - LessonChecklist, LessonPracticePanel 컴포넌트와 사용처 제거 (진행률 완료 버튼·북마크는 유지)
   - 강의 페이지·사이드바 목차가 V2 섹션으로 동작
5. 테스트: lesson-content.test.ts 등 V2 기준으로 갱신. 기존 강의 md들은 V1 구조라 파서 검증에 실패할 것 — **전환기 규칙: 섹션 검증을 경고로 완화하거나 V1/V2 겸용 파싱** 중 단순한 쪽 선택 (R3 재생성 완료 후 V2 전용으로 조이는 TODO 주석)
6. npm run verify 통과

## 금지
- 강의 md 본문 수정 (재생성은 R3의 일)
- 이 작업 범위 밖의 리팩터링

## 산출물
- 코드 변경 + ai-ops/outputs/04-integrated/D-01-format-v2.md (변경 파일 목록, 전환기 규칙 선택과 이유, verify 로그)
- 커밋 "D-01: content format V2 (schema, parser, UI)"
```

## 종료 규격 (O-03.1)
보고는 NEXT_ACTION 블록으로 끝낸다. 라우팅: verify 통과 → Next: Codex 수집 세션 (R2 — KB Quote Bank 보강, RUN-CODEX-PRODUCE가 recollect 변형으로 처리) / 실패 → 자체 수정 후 재시도 (콘텐츠 아닌 개발 작업이므로 Loop B 미적용).
