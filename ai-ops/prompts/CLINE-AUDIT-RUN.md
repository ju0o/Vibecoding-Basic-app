# CLINE-AUDIT-RUN — 전수 기계 감사 (장시간 무정지 작업)

Executor: **Cline 전용.** 한 번 붙여넣으면 5개 JOB을 순서대로 끝까지 수행한다. **어떤 콘텐츠·코드도 수정하지 않는다 — 산출물은 보고서뿐.**

```
당신은 AI Vibe Coding Master의 기계 감사 담당입니다. 아래 5개 JOB을 순서대로, 멈추지 말고 전부 수행하세요. 판단이 필요한 항목은 "검토 필요"로 표기만 하고 넘어갑니다. 각 JOB이 끝날 때마다 보고서를 저장하고 커밋하세요 (메시지: "AUDIT: {JOB명}"). 보고서 위치: ai-ops/reports/cline-audit/

## JOB 1 — 강의 형식 전수 스캔 → lesson-format-scan.md
src/content/lessons/markdown/*.md 전체(47+개)에 대해 표로 보고:
- V2 8섹션(## 한 줄 정의/왜 존재하는가/작동 원리/스펙과 세부/원문으로 읽기/실전에서/한계와 트레이드오프/더 읽기) 존재 여부
- 글자 수 (8,000자 미만이면 표시)
- 인용 블록(^> ") 수 (3 미만이면 표시)
- 하이라이트 == 짝 맞음(짝수) 여부, 섹션당 3개 초과 여부
- 콜아웃(> [!) 강의당 8개 초과 여부
- 구 V1 형식 잔존(## 오늘 배울 것 등 구 섹션 제목 발견 시 표시)
마지막에 위반 요약 표.

## JOB 2 — 인용·Quote Bank 전수 대조 → quote-integrity.md
각 강의의 인용문(^> "..." 첫 줄)을 추출해, 그 강의 meta.md 또는 MASTER_PROGRESS의 근거 KB 문서(ai-ops/knowledge-base/entries/**)의 Quote Bank(- > "...")에 글자 단위로 존재하는지 대조.
- 강의별: 인용 수 / 일치 수 / 불일치 인용 원문(있으면 전체 표기)
- 근거 KB를 못 찾는 강의는 "KB 매핑 없음"으로 표기 (구 파일럿 등)

## JOB 3 — 용어 사전 무결성 → glossary-integrity.md
src/content/glossary.ts 전체에 대해:
- term 중복 (대소문자 무시 비교 포함)
- 각 related 항목이 실제 term으로 존재하는지 (없으면 dangling으로 목록화)
- shortDefinition 60자 초과 항목 목록
- category별 개수 집계

## JOB 4 — 링크 생존 전수 점검 → link-check.md (가장 오래 걸림)
전 강의 md와 전 KB 문서의 http(s) URL을 전부 추출해 중복 제거 후, 각각 HTTP 요청으로 상태 확인 (HEAD 시도, 405/403이면 GET 재시도. 각 요청 사이 1초 대기 — 서버 예의).
- 표: URL / 상태코드 / 사용처 파일 수
- 4xx·5xx·타임아웃은 "깨진 링크" 섹션에 사용처 파일 목록과 함께 정리
- x.com은 차단이 정상이므로 "예상된 차단"으로 분류

## JOB 5 — 다이어그램 참조 검사 → diagram-refs.md
- 각 강의 md에서 /lesson-diagrams/{slug}/{file} 참조 추출 → src/content/lessons/diagrams/에 실제 파일 존재 여부
- 반대 방향: diagrams/에 있는데 어떤 강의도 참조하지 않는 SVG 목록
- SVG 파일 내 라벨 텍스트에 깨진 문자(인코딩 오류) 여부

## 종료
5개 보고서 경로 + 각 JOB의 위반/이상 건수 요약표 + 총평(수정 권고 항목 수)을 최종 보고로 출력.
수정은 하지 않는다 — 수정 여부는 운영자와 Fable이 결정한다.
```
