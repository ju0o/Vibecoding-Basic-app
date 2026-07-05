## 한 줄 정의

Skill 설계는 반복되는 AI 작업 절차와 지식을 `SKILL.md`, description, supporting files로 묶어 필요할 때 재사용하게 만드는 일입니다. 좋은 Skill은 긴 프롬프트 저장소가 아니라, 모델이 언제 불러야 하는지 발견할 수 있고, 불러온 뒤 무엇을 해야 하는지 선명하게 알려주는 capability입니다.

Skills를 배우는 이유는 "AI에게 더 많은 지침을 주기 위해서"가 아닙니다. 오히려 지침을 항상 컨텍스트에 넣지 않기 위해서입니다. 같은 체크리스트, 보고서 형식, 코드 리뷰 기준, 배포 절차를 매번 붙여 넣는 대신, Skill로 패키징해 필요할 때만 로드하게 만듭니다. ==Skill의 핵심은 재사용과 컨텍스트 절약을 동시에 만족시키는 구조==입니다.

바이브코딩에서 Skill은 작업 습관을 제품화하는 방식에 가깝습니다. 한 번 잘 만든 코드 리뷰 절차, 문서 생성 절차, 배포 전 점검 절차는 다음 작업에서도 다시 쓸 수 있습니다. 이때 중요한 것은 "AI가 알아서 잘 하게" 만드는 마법이 아니라, 반복 가능한 절차를 사람이 읽고 감사할 수 있는 파일 구조로 남기는 것입니다.

이 강의는 Skill을 만드는 문법만 다루지 않습니다. 왜 description이 중요한지, 왜 `SKILL.md`가 entrypoint가 되는지, 언제 supporting files로 나눠야 하는지, 왜 신뢰하지 않는 Skill을 감사해야 하는지까지 연결합니다. 끝까지 읽으면 "이 작업은 프롬프트로 충분한가, Skill로 만들 가치가 있는가"를 판단할 수 있어야 합니다.

## 왜 존재하는가

AI 작업이 짧을 때는 프롬프트 하나로 충분합니다. "이 문장을 고쳐줘", "이 코드의 오류를 찾아줘"처럼 한 번 답하면 끝나는 요청은 매번 설명해도 큰 비용이 들지 않습니다. 하지만 반복되는 작업은 다릅니다. 매주 같은 보고서를 만들고, 매 PR마다 같은 리뷰 기준을 적용하고, 매 배포마다 같은 체크리스트를 확인한다면 같은 지침을 계속 복사하게 됩니다.

이 방식은 세 가지 문제를 만듭니다. 첫째, 컨텍스트 비용이 낭비됩니다. 같은 규칙을 매 대화마다 붙이면 새로운 작업 정보가 들어갈 공간이 줄어듭니다. 둘째, 누락이 생깁니다. 사람이 매번 붙여 넣는 절차는 어느 순간 한 줄이 빠지거나 옛 버전이 섞입니다. 셋째, 절차가 팀 자산으로 남지 않습니다. 대화 안에만 있던 좋은 프롬프트는 다음 사람이 찾기 어렵습니다.

Skills는 이 문제를 파일 시스템 기반 자산으로 바꿉니다. `SKILL.md`는 Skill의 중심 파일이고, YAML frontmatter는 discovery를 위한 metadata를 제공합니다. 본문은 절차와 기준을 담고, examples, templates, scripts, reference 같은 supporting files는 필요할 때 로드할 수 있습니다.

이 구조는 Context Engineering과 직접 연결됩니다. Skill은 항상 모든 내용을 모델에게 먹이는 장치가 아닙니다. description처럼 작은 정보로 존재와 사용 조건을 알리고, 요청과 맞을 때 본문이 들어옵니다. 그래서 Skill은 반복 절차를 재사용하면서도 컨텍스트 창을 덜 더럽히는 방법입니다.

## 작동 원리

### 1. 반복되는 절차를 Skill 후보로 식별합니다

Skill 설계는 파일을 만들기 전에 "이 작업이 Skill이 될 만한가"를 판단하는 데서 시작합니다. 같은 instructions, checklist, multi-step procedure를 계속 붙여 넣는다면 후보입니다. 반대로 한 번만 필요한 설명, 현재 대화의 임시 제약, 프로젝트 전체에 항상 적용되어야 하는 짧은 규칙은 Skill보다 일반 프롬프트나 상위 지침이 더 적합할 수 있습니다.

좋은 후보는 반복성, 절차성, 감사 가능성을 가집니다. 반복성은 같은 작업이 여러 번 나타난다는 뜻입니다. 절차성은 단계와 판단 기준이 있다는 뜻입니다. 감사 가능성은 사람이 파일을 열어 "이 Skill이 AI에게 무엇을 시키는가"를 확인할 수 있다는 뜻입니다.

예를 들어 "우리 프로젝트의 릴리스 노트를 작성하라"는 Skill 후보입니다. 릴리스 노트 형식, 변경 분류, 위험 표시, 검증 로그 포함 여부가 반복되기 때문입니다. "오늘 회의 느낌을 부드럽게 요약해줘"는 Skill보다 대화 프롬프트에 가깝습니다. 반복 절차가 아니라 한 번의 표현 작업이기 때문입니다.

### 2. description은 discovery 계약입니다

Skill이 있어도 모델이 언제 써야 하는지 모르면 의미가 없습니다. description은 Skill discovery의 핵심입니다. 무엇을 하는지와 언제 사용할지를 함께 담아야 합니다. "문서를 작성한다"처럼 넓은 설명은 거의 도움이 되지 않습니다. "릴리스 노트 초안을 만들고 변경 사항을 기능/수정/위험/검증으로 분류한다. 사용자가 릴리스 노트, changelog, 배포 요약을 요청할 때 사용한다"처럼 trigger 조건이 있어야 합니다.

description이 겹치면 Skill 선택이 흔들립니다. `doc-writer`, `report-writer`, `release-writer`가 모두 비슷한 설명을 가지면 모델은 어떤 Skill을 써야 할지 어렵습니다. 따라서 Skill catalog가 커질수록 description의 범위와 이름을 더 엄격히 관리해야 합니다.

description은 길게 쓰는 것이 답이 아닙니다. 너무 긴 description은 매 요청마다 컨텍스트 비용이 됩니다. 좋은 description은 짧지만 분명합니다. 무엇을 하는지, 언제 쓰는지, 쓰면 안 되는 상황이 무엇인지가 드러나야 합니다.

### 3. `SKILL.md`는 절차의 entrypoint입니다

Claude Code 문서는 모든 Skill에 `SKILL.md`가 필요하다고 설명합니다. 이 파일은 Skill의 첫 화면입니다. 사용 조건을 frontmatter에 담고, 본문에는 단계, 판단 기준, 출력 형식, 필요한 supporting files의 위치를 적습니다.

`SKILL.md`에 모든 내용을 넣을 필요는 없습니다. 오히려 너무 많은 내용을 넣으면 Skill이 로드될 때마다 컨텍스트를 크게 차지합니다. 본문은 navigation 역할을 하게 하고, 자세한 API reference, 긴 예시, 템플릿, 스크립트는 별도 파일로 분리하는 편이 좋습니다. 본문이 500줄에 가까워진다면 이미 나눌 시점입니다.

예를 들어 문서 생성 Skill이라면 `SKILL.md`에는 "어떤 입력을 확인하고, 어떤 템플릿을 사용하고, 어떤 검증 스크립트를 실행하라"를 적습니다. 실제 템플릿은 `templates/report.md`, 예시는 `examples/good-report.md`, 검증은 `scripts/validate-report.ts`에 둘 수 있습니다. 이렇게 하면 모델은 필요한 파일만 읽고, 필요 없는 자료는 컨텍스트에 올리지 않습니다.

### 4. supporting files는 깊이를 주되, 자동 로드를 피합니다

Skills의 강점은 supporting files를 둘 수 있다는 점입니다. examples는 기대 출력의 품질 기준을 보여줍니다. templates는 반복 산출물의 구조를 고정합니다. scripts는 deterministic한 검증이나 변환을 맡을 수 있습니다. reference는 긴 설명이나 API 세부를 담습니다.

하지만 supporting files를 많이 만든다고 좋은 Skill이 되는 것은 아닙니다. 파일이 많아질수록 navigation이 중요해집니다. `SKILL.md`는 "언제 어떤 파일을 읽어야 하는가"를 알려야 합니다. 그렇지 않으면 모델은 필요한 파일을 놓치거나, 반대로 너무 많은 파일을 읽어 컨텍스트를 낭비할 수 있습니다.

Skills 설계에서 가장 좋은 구조는 "작은 entrypoint, 명확한 분기, 필요한 파일만 읽기"입니다. 이 구조는 progressive disclosure와 맞닿아 있습니다. 처음에는 metadata만 보이고, Skill이 triggered되면 본문이 들어오며, 본문이 가리키는 supporting files는 작업상 필요할 때만 들어옵니다.

### 5. 실행과 신뢰 경계를 설계합니다

Skill은 문서처럼 보이지만 실행에 영향을 줄 수 있습니다. Skill이 scripts를 포함하거나 도구 실행을 유도하면 실제 파일 변경, 네트워크 요청, 데이터 처리로 이어질 수 있습니다. 그래서 신뢰하지 않는 Skill은 설치된 소프트웨어처럼 감사해야 합니다. `SKILL.md`, scripts, images, resources를 모두 봐야 합니다.

좋은 Skill 설계는 "무엇을 하라"뿐 아니라 "무엇을 하지 말라"도 포함합니다. 예를 들어 배포 Skill은 실제 배포 명령을 바로 실행하지 않고, 먼저 diff, 테스트 결과, 환경 변수 누락 여부, 승인 상태를 확인하게 만들 수 있습니다. 코드 리뷰 Skill은 보안 민감 파일이나 `.env` 수정을 별도 위험 항목으로 표시하게 할 수 있습니다.

## 스펙과 세부

### 기본 파일 구조

가장 작은 Skill은 아래처럼 시작할 수 있습니다.

```text
my-skill/
  SKILL.md
```

조금 더 커지면 supporting files가 붙습니다.

```text
release-notes/
  SKILL.md
  templates/
    release-note.md
  examples/
    good-release-note.md
  scripts/
    check-sections.ts
```

이 구조에서 `SKILL.md`는 entrypoint입니다. templates와 examples는 본문에 직접 넣지 않고 필요할 때 참조합니다. scripts는 모델이 직접 다시 구현하지 않아도 되는 반복 검증을 맡길 수 있습니다.

### frontmatter와 description

Skill frontmatter의 핵심은 description입니다. description은 단순 소개글이 아니라 routing hint입니다. 모델이 사용자의 요청을 보고 이 Skill을 불러도 되는지 판단하는 데 쓰입니다. 따라서 "무엇을 하는가"와 "언제 쓰는가"를 함께 써야 합니다.

아래 예시는 외부 라이브러리 없이 Skill manifest의 핵심을 표현한 TypeScript 값입니다.

```ts
type SkillManifest = {
  name: string
  description: string
  entrypoint: "SKILL.md"
  supportingFiles: string[]
}

const releaseNotesSkill: SkillManifest = {
  name: "release-notes",
  description:
    "Draft release notes from committed changes. Use when the user asks for a changelog, release note, or deployment summary.",
  entrypoint: "SKILL.md",
  supportingFiles: ["templates/release-note.md", "examples/good-release-note.md"],
}

console.log(releaseNotesSkill.description.includes("Use when"))
```

여기서 중요한 것은 타입 자체가 아니라 description의 역할입니다. description은 Skill의 trigger 조건을 드러냅니다. "릴리스 노트를 쓴다"보다 "changelog, release note, deployment summary 요청 시 사용"이 훨씬 낫습니다.

### 자동 호출과 수동 호출

Skills는 관련 있을 때 자동으로 사용될 수 있고, 사용자가 직접 `/skill-name`처럼 호출할 수도 있습니다. 어떤 Skill은 자동 호출이 유용합니다. 예를 들어 코드 리뷰 요청이 들어오면 review Skill이 자동으로 쓰이는 것이 자연스럽습니다. 반대로 부작용이 큰 Skill은 사용자가 명시적으로 호출하게 하는 편이 안전할 수 있습니다.

Claude Code 문서는 `disable-model-invocation: true` 같은 설정으로 모델 자동 호출을 막을 수 있다고 설명합니다. 이 선택은 컨텍스트 비용과 안전에 영향을 줍니다. 자동 호출 가능한 Skill은 discovery를 위해 description이 보일 수 있고, 수동 전용 Skill은 필요할 때까지 숨길 수 있습니다.

### Skill과 다른 확장 방식의 차이

Skill은 반복 절차와 자료를 패키징합니다. MCP는 외부 도구와 데이터 연결을 표준화합니다. Subagent는 별도 context를 가진 isolated worker입니다. Hook은 특정 lifecycle event에서 외부 동작을 실행합니다. 이 차이를 모르면 모든 문제를 Skill로 해결하려고 하게 됩니다.

예를 들어 "GitHub 이슈를 읽어야 한다"는 MCP tool이나 connector 쪽 문제입니다. "이슈를 읽은 뒤 우리 팀 형식으로 요약해야 한다"는 Skill 문제입니다. "대량 검색을 별도 context에서 수행해야 한다"는 subagent 문제입니다. "파일 수정 후 자동으로 lint를 실행해야 한다"는 hook 문제입니다.

## 원문으로 읽기

> "Agent Skills are modular capabilities"
>
> — Agent Skills는 모듈형 capability다.
> [Agent Skills — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

이 문장은 Skill을 단순 프롬프트 저장소로 보지 말라고 말합니다. capability라는 말은 특정 작업을 반복적으로 수행할 수 있는 능력 단위라는 뜻에 가깝습니다. 따라서 좋은 Skill은 "긴 지침"이 아니라 "언제 쓰고, 무엇을 읽고, 어떤 형식으로 결과를 내는지"가 정리된 작업 능력입니다.

> "Skills are reusable, filesystem-based resources"
>
> — Skills는 재사용 가능한 파일 시스템 기반 리소스다.
> [Agent Skills — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

filesystem-based라는 말이 중요합니다. Skill은 대화 안에 흩어지는 지침이 아니라 파일로 남는 자산입니다. 그래서 버전 관리, 리뷰, 감사, 재사용이 가능합니다. 바이브코딩 팀에서는 좋은 프롬프트를 대화에 묻어두는 대신 Skill로 승격할 수 있습니다.

> "Only then does this content enter the context window"
>
> — 그때서야 이 내용이 컨텍스트 창에 들어간다.
> [Agent Skills — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

이 인용은 Skill이 Context Engineering과 맞물리는 지점을 보여줍니다. 본문을 항상 넣는 것이 아니라, 요청이 description과 맞을 때 들어옵니다. 그래서 Skill 설계에서는 entrypoint와 supporting files를 작게 나누는 일이 컨텍스트 비용을 줄이는 직접적인 방법이 됩니다.

> "Every skill needs a `SKILL.md` file"
>
> — 모든 Skill에는 `SKILL.md` 파일이 필요하다.
> [Extend Claude with skills — Claude Code Docs](https://code.claude.com/docs/en/skills)

`SKILL.md`는 Skill의 중심 계약입니다. 사용자는 이 파일을 보고 Skill이 무엇을 하는지 감사할 수 있어야 하고, 모델은 이 파일을 읽고 절차를 수행할 수 있어야 합니다. 그래서 `SKILL.md`가 너무 모호하거나 너무 길면 Skill 전체의 품질이 흔들립니다.

> "Good Skills are concise, well-structured"
>
> — 좋은 Skill은 간결하고 잘 구조화되어 있다.
> [Skill authoring best practices — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

Skill은 많이 적는다고 좋아지지 않습니다. 간결함은 단순함이 아니라 signal-to-noise ratio입니다. 잘 구조화된 Skill은 모델이 어디서 시작하고, 어떤 파일을 읽고, 언제 멈춰야 하는지 빠르게 알게 합니다.

## 실전에서

### 패턴 1: 체크리스트가 반복되면 Skill로 승격합니다

코드 리뷰를 예로 들어 보겠습니다. 매번 "보안, 에러 처리, 타입 안정성, 테스트 누락, 하드코딩을 봐줘"라고 말한다면 Skill 후보입니다. `code-review/SKILL.md`에는 리뷰 범위, 출력 형식, 위험 우선순위, 수정 금지 조건을 적습니다. 예시 리뷰는 `examples/`에 둡니다.

이렇게 하면 리뷰 기준이 개인의 기억이 아니라 프로젝트 자산이 됩니다. 새 팀원이 와도 같은 Skill을 사용할 수 있고, 기준이 바뀌면 파일을 수정하면 됩니다. 대화마다 긴 지침을 붙여 넣지 않아도 됩니다.

### 패턴 2: 긴 reference는 supporting file로 분리합니다

API 스타일 가이드가 30페이지라면 `SKILL.md`에 전부 넣지 마세요. `SKILL.md`에는 "API endpoint를 작성하거나 리뷰할 때 `references/api-style.md`를 읽어라"처럼 navigation을 둡니다. 실제 세부는 reference 파일로 분리합니다.

이 방식은 컨텍스트 비용을 줄입니다. 모든 요청이 API 세부 전체를 필요로 하지는 않습니다. 요청이 관련 있을 때만 reference를 읽게 하면, Skill은 가벼운 entrypoint와 깊은 자료를 동시에 가질 수 있습니다.

### 패턴 3: scripts는 검증 가능한 일을 맡깁니다

문서 형식 검증, JSON schema 검사, 파일명 규칙 확인처럼 deterministic한 일은 모델이 매번 자연어로 판단하기보다 script가 더 안정적입니다. Skill이 script를 포함하면 모델은 "검증 스크립트를 실행하고 실패하면 보고하라"는 절차를 따를 수 있습니다.

다만 script가 있다는 것은 보안 감사가 필요하다는 뜻이기도 합니다. 외부 URL에 접근하거나 파일을 수정하거나 비밀 값을 읽는 script는 위험합니다. Skill을 설치하거나 공유하기 전에 scripts와 resources를 반드시 검토해야 합니다.

### 작은 Skill 설계 예시

아래는 배포 요약 Skill의 `SKILL.md` 초안입니다. 실제 파일 내용으로 저장할 수 있는 형태를 보여주기 위한 예시입니다.

```md
---
description: Draft a deployment summary from completed changes. Use when the user asks for release notes, deploy notes, or a shipping summary.
disable-model-invocation: true
---

## Inputs

- Read the current git diff or release commit list.
- Read `templates/deploy-summary.md` before writing.
- Do not claim deployment success unless a verification log is present.

## Output

1. Changes shipped
2. Verification evidence
3. Risks and rollback notes
4. Follow-up checks
```

이 예시에서 `disable-model-invocation: true`는 의도적으로 넣었습니다. 배포 요약은 사용자 요청이 명확할 때만 실행되게 만들고 싶기 때문입니다. 모든 Skill이 이렇게 해야 하는 것은 아닙니다. 핵심은 부작용과 context cost를 보고 자동 호출 여부를 선택하는 것입니다.

## 한계와 트레이드오프

첫 번째 한계는 Skill이 모든 지침의 답이 아니라는 점입니다. 프로젝트 전체에 항상 적용되어야 하는 매우 짧은 규칙은 Skill보다 상위 지침이 나을 수 있습니다. 반대로 외부 시스템 호출은 Skill보다 MCP가 맞습니다. Skill은 반복 절차와 자료의 패키징에 강합니다.

두 번째 한계는 discovery 품질입니다. Skill이 많아지면 description이 겹치기 쉽습니다. 이름과 description이 흐리면 모델은 잘못된 Skill을 고르거나 필요한 Skill을 놓칠 수 있습니다. 그래서 Skill catalog가 커질수록 naming convention, scope, trigger phrase 관리가 필요합니다.

세 번째 한계는 컨텍스트 비용입니다. Skill은 on-demand라고 해도 metadata는 로드될 수 있고, 본문이 한 번 들어오면 이후 턴에 남아 비용이 됩니다. 본문이 불필요하게 길면 Skill을 쓰는 순간 작업 컨텍스트가 무거워집니다. supporting files로 나누는 이유가 여기에 있습니다.

네 번째 한계는 보안입니다. Skill은 instructions뿐 아니라 scripts와 resources를 포함할 수 있습니다. 악성 Skill은 도구 호출이나 코드 실행을 유도할 수 있습니다. 따라서 신뢰하지 않는 Skill은 그냥 문서처럼 읽지 말고, 설치하는 소프트웨어처럼 감사해야 합니다.

다섯 번째 한계는 유지보수입니다. Skill이 많아지면 오래된 절차가 남습니다. 배포 방식이 바뀌었는데 deploy Skill이 예전 명령을 계속 말할 수 있습니다. 그래서 Skill에도 소유자, 변경 이력, 테스트 예시, 폐기 기준이 필요합니다. Skill은 한 번 만들고 끝나는 파일이 아니라 운영되는 지식 자산입니다.

## 더 읽기

먼저 Claude Platform의 Agent Skills overview를 읽어 Skill이 modular capability라는 관점을 잡으세요. 그 다음 Claude Code의 Skills 문서를 읽으면 `SKILL.md`, 위치, 호출 방식, supporting files의 실제 구조가 보입니다. 마지막으로 best practices 문서를 읽으면 description, concise structure, testing 기준을 더 세밀하게 잡을 수 있습니다.

- [Agent Skills — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Extend Claude with skills — Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Skill authoring best practices — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Agent Skills in the SDK — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/skills)
- [Extend Claude Code — Claude Code Docs](https://code.claude.com/docs/en/features-overview)

읽을 때는 "이 파일을 내 프로젝트에 그대로 둔다면 누가, 언제, 왜 불러야 하는가"를 계속 물어보세요. 그 질문에 답하지 못하는 Skill은 아직 프롬프트 조각일 뿐입니다. 반대로 사용 조건, 절차, supporting files, 감사 경계가 선명하면 Skill은 팀의 반복 작업을 안정화하는 실질적인 시스템 부품이 됩니다.
