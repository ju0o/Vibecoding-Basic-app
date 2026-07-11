APPROVED 91

# P-02 Verification Report — tool-permissions-sandboxes

## Verdict
- Verdict: APPROVED
- Score: 91 / 100
- 대상 KB: `ai-ops/knowledge-base/entries/T11/tool-permissions-sandboxes.md`
- 검증일: 2026-07-12
- Executor: Codex

## 필수 게이트
| Gate | 판정 | 근거 |
|---|---|---|
| G1. 출처 확인 불가 주장 0건 | PASS | OpenAI, Claude Code, GitHub 공식 문서 원문 대조 완료 |
| G2. 13개 필수 섹션 존재 | PASS | 템플릿 필수 섹션 13개와 변경 이력 존재 |
| G3. frontmatter 필수 필드 완전 | PASS | id, topicGroup, level, sources, updated 존재 |
| G4. 모든 URL 접속 가능·checked 존재 | PASS | sources 5개 모두 2026-07-12 checked |

## 문장별 검증 요약
| Claim | Source | 판정 |
|---|---|---|
| Codex CLI는 terminal에서 inspect/edit/run code를 수행한다 | Codex CLI | PASS |
| Claude Code는 fine-grained permission rules를 제공한다 | Claude Code permissions | PASS |
| Claude Code sandboxing은 Bash command의 filesystem/network 접근을 OS-level로 제한한다 | Claude Code sandboxing | PASS |
| GitHub Copilot CLI actions는 explicit permission prompts를 요구한다 | GitHub Copilot Agents responsible use | PASS |
| settings precedence는 managed, command line, local, project, user 계층을 가진다 | Claude Code settings | PASS |

## Citation Rule
- Quote Bank 5개 모두 원문 대조 완료.
- 확인 인용: `Inspect, edit, and run code`, `permissions, and commands`, `Sandboxing`, `fine-grained permissions`, `Sandboxing provides OS-level enforcement`.

## 공식 출처 비중
- 공식/등록 출처: 5 / 5
- SOURCE-REGISTRY 적합성: PASS (`developers.openai.com`, `code.claude.com`, `docs.github.com`)

## Knowledge Score
| 기준 | 점수 | 근거 |
|---|---:|---|
| S1 공식 출처 | 20 / 20 | 공식 문서만 사용 |
| S2 최신성 | 15 / 15 | checked 2026-07-12 |
| S3 교육 적합성 | 14 / 15 | 권한·sandbox 구분 명확 |
| S4 예시 품질 | 9 / 10 | 권한 정책 예시 실무적 |
| S5 AI 시대 연관성 | 10 / 10 | agentic coding 실행 권한과 직접 연결 |
| S6 실무 활용성 | 14 / 15 | read-only, limited edit, approval 흐름 구체적 |
| S7 용어 일관성 | 9 / 15 | `harness` related 명칭은 기존 KB id와 맞지만 glossary 반영은 후속 필요 |
| 합계 | 91 / 100 | APPROVED |

## 종합
잘못된 Anthropic IAM 경로와 Cursor SPA 잔재를 제거하고 등록 공식 문서 기준으로 보강했다. P-04 진행 가능.
