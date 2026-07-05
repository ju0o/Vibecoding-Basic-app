# 용어 초안: designing-reusable-skills

기존 glossary.ts 대조 완료: Skills는 이미 등록되어 있다. 아래 용어는 신규 후보다.

## 생성 용어

### SKILL.md
- category: AI 시스템
- shortDefinition: Skill의 metadata와 실행 지침을 담는 필수 entrypoint 파일
- explanation: SKILL.md는 Skill 디렉터리의 중심 파일입니다. YAML frontmatter는 모델이 Skill을 언제 사용할지 발견하는 metadata를 제공하고, Markdown 본문은 Skill이 실행될 때 따라야 할 절차, 출력 형식, supporting files 안내를 담습니다.
- related: ["Skills", "Context Engineering", "Progressive Disclosure"]

### Skill Discovery
- category: AI 시스템
- shortDefinition: 모델이 요청과 description을 비교해 사용할 Skill을 찾는 과정
- explanation: Skill Discovery는 Skill 본문이 아니라 이름과 description 같은 가벼운 metadata를 통해 어떤 Skill이 현재 요청에 적합한지 판단하는 과정입니다. description이 모호하거나 서로 겹치면 잘못된 Skill이 선택되거나 필요한 Skill이 누락될 수 있습니다.
- related: ["Skills", "Context Engineering"]

### Supporting Files
- category: AI 시스템
- shortDefinition: Skill 본문 밖에 두는 예시, 템플릿, 스크립트, 참고 자료
- explanation: Supporting Files는 SKILL.md에 모든 내용을 넣지 않고, examples, templates, scripts, references처럼 필요할 때만 읽거나 실행할 자료를 분리하는 방식입니다. Skill을 간결하게 유지하면서도 깊은 작업 자료를 제공할 수 있게 합니다.
- related: ["Skills", "Progressive Disclosure"]
