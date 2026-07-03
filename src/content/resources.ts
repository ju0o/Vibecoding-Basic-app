import type { ResourceLink } from "@/content/schema"

export const RESOURCE_LINKS = [
  {
    title: "MDN Web Docs",
    description: "HTML, CSS, JavaScript의 표준 동작을 확인하는 가장 기본적인 웹 문서입니다.",
    url: "https://developer.mozilla.org/",
    category: "웹 기초",
  },
  {
    title: "TypeScript Handbook",
    description: "타입 시스템, 유니언, 제네릭, 설정을 공식 문서로 배울 수 있습니다.",
    url: "https://www.typescriptlang.org/docs/",
    category: "TypeScript",
  },
  {
    title: "React Docs",
    description: "컴포넌트, 상태, Hooks, 렌더링 사고방식을 공식 예제로 학습합니다.",
    url: "https://react.dev/",
    category: "React",
  },
  {
    title: "Next.js Docs",
    description: "App Router, 서버 컴포넌트, 라우팅, 배포 최적화를 확인합니다.",
    url: "https://nextjs.org/docs",
    category: "Next.js",
  },
  {
    title: "Git Documentation",
    description: "commit, branch, merge, rebase 같은 협업 명령의 원리를 확인합니다.",
    url: "https://git-scm.com/doc",
    category: "Git",
  },
  {
    title: "PostgreSQL Documentation",
    description: "관계형 데이터베이스와 SQL의 기준 동작을 배울 수 있습니다.",
    url: "https://www.postgresql.org/docs/",
    category: "DB",
  },
  {
    title: "OWASP Web Security Testing Guide",
    description: "웹 보안 위협과 점검 관점을 익히는 공식적인 보안 학습 자료입니다.",
    url: "https://owasp.org/www-project-web-security-testing-guide/",
    category: "보안",
  },
  {
    title: "OpenAI Developers",
    description: "AI API, 에이전트, 도구 사용 패턴을 최신 문서로 확인합니다.",
    url: "https://developers.openai.com/",
    category: "AI",
  },
  {
    title: "Model Context Protocol",
    description: "AI 도구 연결을 위한 MCP 개념과 SDK 문서를 확인합니다.",
    url: "https://modelcontextprotocol.io/",
    category: "AI 시스템",
  },
] satisfies readonly ResourceLink[]
