# WF-03 기존 강의 개정 Workflow

이미 배포된 강의를 수정할 때 사용. 트리거는 세 가지다.

| 트리거 | 예시 | 시작 단계 |
|---|---|---|
| 사실 노후화 | 도구 버전 변경, API 변경, 새 표준 등장 | 1 (재리서치) |
| 품질 문제 발견 | 오타, 어색한 비유, 난이도 불일치 신고 | 2 (직접 수정) |
| 커리큘럼 개편 | 모듈 이동, 순서 변경, 강의 분할/병합 | 0 (Curriculum Agent) |

## 절차

1. **개정 요청 등록** — `outputs/00-backlog/REVISION-BACKLOG.md`에 slug, 트리거, 근거를 기록.
2. **현행본 스냅샷** — 담당 Agent가 `src/content/lessons/markdown/{slug}.md`를 `outputs/02-drafts/{slug}-rev{n}/lesson.md`로 복사한 뒤 수정한다. **src/content를 직접 수정하지 않는다** — 개정도 신규와 같은 파이프라인을 탄다.
3. **수정 범위에 따른 검증 축소 규칙**:
   - 사실 내용 변경 → Fact Check 필수, Education Review는 섹션 구조가 바뀌었을 때만
   - 문장 다듬기만 → Education Review만
   - 메타데이터만 (minutes, tags) → QA Agent만
4. **QA 게이트 → 통합 → 릴리스** — WF-01의 4~6단계와 동일.
5. **개정 기록** — `outputs/04-integrated/{slug}.md`에 개정 이력을 append (rev 번호, 변경 요약, 날짜).

## 정기 노후화 점검 (권장: 분기 1회)

- Research Agent에게 배정: "모듈 X의 강의들이 참조하는 공식 문서를 다시 방문해 변경점을 보고하라"
- 출력: `outputs/00-backlog/STALENESS-REPORT-{date}.md`
- 변경 발견 시 REVISION-BACKLOG에 자동 등록
