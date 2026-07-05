APPROVED 90

# Knowledge Verification Report: files-folders-paths

검증일: 2026-07-06  
대상: `ai-ops/knowledge-base/entries/T01/files-folders-paths.md`  
판정: APPROVED

## 게이트 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | Node.js docs와 VS Code UI 문서로 모든 핵심 주장 대조 가능. |
| G2 필수 섹션 존재 | PASS | 필수 섹션과 Quote Bank 존재. |
| G3 frontmatter 완전 | PASS | 필수 frontmatter 필드 완전. |
| G4 URL 접속 가능 | PASS | Node.js File Paths, Path, fs, packages, VS Code UI 재접속 확인. |

## 원문 대조 요약

| 주장 | 대조 출처 | verdict |
|---|---|---|
| 모든 file은 path를 가진다 | Node.js File Paths | PASS |
| Windows path와 Linux/macOS path는 다르다 | Node.js File Paths | PASS |
| `node:path`는 file/directory paths utility를 제공한다 | Node.js Path API | PASS |
| `node:fs`는 file system interaction을 제공한다 | Node.js File system API | PASS |
| package는 `package.json`이 described하는 folder tree다 | Node.js Packages | PASS |
| VS Code Explorer는 files and folders를 보여준다 | VS Code User Interface | PASS |

## 점수표

| 기준 | 점수 | 근거 |
|---|---:|---|
| S1 공식 출처 | 19/20 | Node.js 공식 문서 중심. VS Code 공식 문서가 registry 본표에 없어 경미 감점. |
| S2 최신성 | 15/15 | checked 날짜 2026-07-05, 재확인 2026-07-06. |
| S3 교육 적합성 | 14/15 | 입문자 수준에 적합하며 path/package/fs 차이를 분리한다. |
| S4 예시 품질 | 9/10 | `node:path` 실행 코드 예시가 구체적. |
| S5 AI 시대 연관성 | 9/10 | AI에게 파일 경로를 정확히 지시해야 하는 이유와 연결. |
| S6 실무 활용성 | 13/15 | 사용 장면 3개와 실수 4개가 실제적. |
| S7 용어 일관성 | 11/15 | successor 예약 id `variables-types-data`는 추후 등록 필요. |

총점: 90 / 100

## 승인 조건

- status를 `approved`로 변경 가능.
- score를 `90`으로 기록.

