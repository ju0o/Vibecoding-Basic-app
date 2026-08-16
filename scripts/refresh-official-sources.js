'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const root = path.join(__dirname, '..');
const jsonPath = path.join(root, 'src', 'content', 'sources', 'official-sources.json');
const jsPath = path.join(root, 'src', 'content', 'sources', 'official-sources.js');
const catalog = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const allowedHosts = [
  'docs.github.com',
  'nodejs.org',
  'code.visualstudio.com',
  'developer.mozilla.org',
  'docs.npmjs.com',
  'firebase.google.com',
  'vercel.com',
  'modelcontextprotocol.io',
  'docs.anthropic.com',
  'code.claude.com',
  'platform.claude.com',
  'www.anthropic.com',
  'developers.openai.com',
  'platform.openai.com',
  'docs.stripe.com',
  'supabase.com',
  'docs.tosspayments.com',
  'www.nngroup.com',
  'www.atlassian.com',
  'www.ycombinator.com',
  'm2.material.io',
  'm3.material.io',
  'www.ibm.com',
  'x.com',
  'genai.owasp.org',
];

const additionalSources = {
  'product-yc-startup-advice': {
    publisher: 'Y Combinator',
    title: '스타트업 핵심 조언',
    url: 'https://www.ycombinator.com/library/4D-yc-s-essential-startup-advice',
    maturity: 'stable',
    summaryKo: '기능보다 실제 고객 문제, 빠른 출시, 사용자와의 직접 대화를 우선하는 초기 제품 검증 관점입니다.',
    instructorNote: '제품·수익화 과정에서 아이디어를 기능 목록이 아니라 반복 문제와 검증 행동으로 바꾸는 기준으로 사용합니다.',
  },
  'product-atlassian-user-stories': {
    publisher: 'Atlassian',
    title: '사용자 스토리',
    url: 'https://www.atlassian.com/agile/project-management/user-stories',
    maturity: 'stable',
    summaryKo: '사용자, 목표, 기대 가치가 드러나는 짧은 요구사항 문장으로 팀이 왜 만드는지 합의하게 합니다.',
    instructorNote: '팀 프로젝트에서 “누가 무엇을 왜 하는가”를 한 문장으로 고정하고 MVP 범위와 검수 기준으로 연결합니다.',
  },
  'product-nng-heuristics': {
    publisher: 'Nielsen Norman Group',
    title: '10가지 UI 사용성 휴리스틱',
    url: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
    maturity: 'stable',
    summaryKo: '시스템 상태 표시, 현실 세계와의 일치, 사용자 통제, 오류 예방 등 사용성 점검의 기본 원칙입니다.',
    instructorNote: 'UI/UX 수업에서 예쁜 화면보다 사용자가 현재 상태와 다음 행동을 이해하는지를 점검하는 기준으로 사용합니다.',
  },
  'product-material-onboarding': {
    publisher: 'Google Material Design',
    title: '온보딩 패턴',
    url: 'https://m2.material.io/design/communication/onboarding.html',
    maturity: 'stable',
    summaryKo: '사용자가 앱을 처음 만났을 때 핵심 가치와 첫 행동을 이해하도록 돕는 온보딩 설계 원칙입니다.',
    instructorNote: '가입 이후 첫 성공까지의 빈 상태, 안내, 진행 피드백을 설계하는 강사용 기준으로 사용합니다.',
  },
  'product-material-design': {
    publisher: 'Google Material Design',
    title: 'Material Design 3 시작하기',
    url: 'https://m3.material.io/get-started',
    maturity: 'stable',
    summaryKo: 'Google이 지원하는 디자인 시스템으로, 일관된 UI 컴포넌트와 사용성 있는 제품 설계의 기반을 제공합니다.',
    instructorNote: '디자인 시스템을 컬러·카드 장식이 아니라 반복 가능한 UI 규칙과 컴포넌트 언어로 설명할 때 사용합니다.',
  },
  'stripe-subscriptions': {
    publisher: 'Stripe',
    title: 'Stripe Subscriptions',
    url: 'https://docs.stripe.com/subscriptions',
    maturity: 'stable',
    summaryKo: '구독 상품의 가격, 청구 주기, 사용량, 체험 기간, 고객 포털 같은 반복 결제 운영 요소를 다룹니다.',
    instructorNote: 'SaaS 수익화에서 결제 버튼만이 아니라 고객, 가격, 상태, 권한, 실패와 취소 흐름이 필요함을 설명합니다.',
  },
  'stripe-checkout': {
    publisher: 'Stripe',
    title: 'Stripe Checkout',
    url: 'https://docs.stripe.com/payments/checkout',
    maturity: 'stable',
    summaryKo: '호스팅 또는 임베드 결제 UI를 통해 결제 세션, 성공·취소 URL, 결제 흐름을 구성합니다.',
    instructorNote: '결제는 UI, 서버 세션, 성공·실패 상태, 권한 부여가 함께 움직인다는 것을 시각화할 때 사용합니다.',
  },
  'product-toss-widget': {
    publisher: 'Toss Payments',
    title: '결제위젯 연동',
    url: 'https://docs.tosspayments.com/en/integration-widget',
    maturity: 'stable',
    summaryKo: '체크아웃 페이지에 결제 UI를 임베드하고 관리자에서 일부 결제 UI를 설정할 수 있는 저코드 결제 방식입니다.',
    instructorNote: '국내 결제 예시가 필요할 때 결제 UI, 결제 요청, 테스트 키, 운영 키의 차이를 설명하는 자료로 사용합니다.',
  },
  'supabase-rls': {
    publisher: 'Supabase',
    title: 'Row Level Security',
    url: 'https://supabase.com/docs/guides/database/postgres/row-level-security',
    maturity: 'stable',
    summaryKo: 'Postgres의 행 단위 보안으로, 사용자별로 읽고 쓸 수 있는 데이터 범위를 정책으로 제한합니다.',
    instructorNote: 'SaaS와 배포 수업에서 “로그인했다”와 “해당 데이터에 접근할 수 있다”가 다르다는 점을 설명합니다.',
  },
  'github-pull-requests': {
    publisher: 'GitHub',
    title: 'Pull Requests',
    url: 'https://docs.github.com/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
    maturity: 'stable',
    summaryKo: '브랜치의 변경을 병합하기 전 토론, 리뷰, 검증하는 GitHub의 협업 단위입니다.',
    instructorNote: '전문과정에서 AI가 만든 변경을 바로 반영하지 않고 diff, 리뷰, 상태 체크를 거쳐 승인하는 장면으로 설명합니다.',
  },
  'github-actions-secrets': {
    publisher: 'GitHub',
    title: 'GitHub Actions Secrets',
    url: 'https://docs.github.com/actions/security-guides/using-secrets-in-github-actions',
    maturity: 'stable',
    summaryKo: '워크플로에서 API 키와 토큰 같은 민감정보를 저장소, 환경, 조직 범위로 안전하게 사용하는 방법입니다.',
    instructorNote: '배포와 자동화 수업에서 .env, Actions secrets, 배포 환경변수의 책임 범위를 분리해 설명합니다.',
  },
  'stripe-webhooks': {
    publisher: 'Stripe',
    title: 'Stripe Webhooks',
    url: 'https://docs.stripe.com/webhooks',
    maturity: 'stable',
    summaryKo: '결제, 구독, 환불 같은 Stripe 이벤트를 서버 endpoint로 받아 후속 처리를 수행하는 구조입니다.',
    instructorNote: '제품·수익화에서 결제 성공 화면 이후 DB 저장, 권한 부여, 실패 복구가 서버 이벤트로 이어져야 함을 설명합니다.',
  },
  'stripe-customer-portal': {
    publisher: 'Stripe',
    title: 'Stripe Customer Portal',
    url: 'https://docs.stripe.com/customer-management',
    maturity: 'stable',
    summaryKo: '고객이 결제수단, 청구 정보, 구독 상태를 직접 관리할 수 있는 Stripe 호스팅 포털입니다.',
    instructorNote: 'SaaS 운영에서 가입·결제뿐 아니라 변경, 취소, 영수증, 고객 셀프서비스까지 운영 범위에 포함됨을 설명합니다.',
  },
  'firebase-auth': {
    publisher: 'Firebase',
    title: 'Firebase Authentication',
    url: 'https://firebase.google.com/docs/auth',
    maturity: 'stable',
    summaryKo: '웹과 앱에서 이메일, 전화번호, 소셜 로그인 등을 지원하는 Firebase 인증 서비스입니다.',
    instructorNote: '로그인 UI와 실제 사용자 신원 확인, 그리고 데이터 권한이 서로 다른 층이라는 점을 설명합니다.',
  },
  'firebase-rules-conditions': {
    publisher: 'Firebase',
    title: 'Firestore Security Rules Conditions',
    url: 'https://firebase.google.com/docs/firestore/security/rules-conditions',
    maturity: 'stable',
    summaryKo: 'Cloud Firestore Security Rules에서 인증 상태, 입력 데이터, 다른 문서 상태를 조건으로 읽기·쓰기를 허용합니다.',
    instructorNote: '데이터베이스 규칙을 “잠금장치”가 아니라 요청마다 검사되는 조건문으로 시각화할 때 사용합니다.',
  },
  'supabase-auth': {
    publisher: 'Supabase',
    title: 'Supabase Auth',
    url: 'https://supabase.com/docs/guides/auth',
    maturity: 'stable',
    summaryKo: '비밀번호, 매직링크, OTP, 소셜 로그인, SSO 등 사용자 인증과 권한 부여를 지원합니다.',
    instructorNote: 'Supabase RLS와 함께 인증된 사용자와 데이터 접근 권한을 분리해서 설명합니다.',
  },
  'vercel-rollback': {
    publisher: 'Vercel',
    title: 'Vercel Instant Rollback',
    url: 'https://vercel.com/docs/instant-rollback',
    maturity: 'stable',
    summaryKo: '프로덕션 문제가 발생했을 때 이전 배포로 빠르게 되돌리는 배포 복구 기능입니다.',
    instructorNote: '배포는 성공 버튼으로 끝나지 않고 장애 복구와 이전 정상 상태로 돌아가는 운영 기준이 필요함을 설명합니다.',
  },
  'openai-agents-sdk': {
    publisher: 'OpenAI',
    title: 'Agents SDK',
    url: 'https://developers.openai.com/api/docs/guides/agents',
    maturity: 'stable',
    summaryKo: '도구 호출, 전문 Agent 협업, 상태 관리, 승인과 실행 추적을 가진 Agent 애플리케이션을 코드로 구성합니다.',
    instructorNote: 'Workflow Architect에서 Agent를 마법처럼 설명하지 않고 orchestration, tool execution, approval, state의 구조로 설명합니다.',
  },
  'openai-tools': {
    publisher: 'OpenAI',
    title: 'Using Tools',
    url: 'https://developers.openai.com/api/docs/guides/tools',
    maturity: 'stable',
    summaryKo: '모델이 웹 검색, 파일 검색, 함수 호출, remote MCP 같은 도구를 사용하도록 확장하는 공식 개념입니다.',
    instructorNote: 'Tool·MCP 수업에서 도구는 “AI가 더 똑똑해지는 장식”이 아니라 외부 행동과 권한을 가진 계약임을 설명합니다.',
  },
  'openai-apps-sdk': {
    publisher: 'OpenAI',
    title: 'Apps SDK',
    url: 'https://developers.openai.com/apps-sdk',
    maturity: 'stable',
    summaryKo: 'MCP 서버와 웹 컴포넌트를 연결해 ChatGPT 안에서 도구와 UI를 함께 제공하는 앱 개발 경로입니다.',
    instructorNote: 'MCP와 UI가 함께 움직이는 고급 예시로, Tool 결과와 사용자 인터페이스가 어떻게 연결되는지 설명합니다.',
  },
  'claude-skills-cc': {
    publisher: 'Anthropic',
    title: 'Claude Code의 Skills',
    url: 'https://code.claude.com/docs/en/skills',
    maturity: 'stable',
    summaryKo: 'Claude Code에서 파일시스템 기반 커스텀 Skill을 만들고 프로젝트 또는 사용자 범위에서 재사용하는 방법입니다.',
    instructorNote: 'Claude 3강에서 Skill을 긴 프롬프트가 아니라 호출 조건, 자료, 절차, 검증을 가진 재사용 작업 단위로 설명합니다.',
  },
  'claude-agent-sdk': {
    publisher: 'Anthropic',
    title: 'Claude Agent SDK',
    url: 'https://code.claude.com/docs/en/agent-sdk/overview',
    maturity: 'stable',
    summaryKo: 'Claude Code의 도구와 능력을 기반으로 커스텀 Agent를 코드로 구성하는 개발 경로입니다.',
    instructorNote: 'Claude 자동화 회차에서 Claude Code를 단일 세션 도구에서 운영 가능한 Agent 작업공간으로 확장할 때 사용합니다.',
  },
  'mcp-architecture': {
    publisher: 'Model Context Protocol',
    title: 'MCP Architecture',
    url: 'https://modelcontextprotocol.io/docs/learn/architecture',
    maturity: 'stable',
    summaryKo: 'Host, Client, Server, 데이터층, 전송층, tools·resources·prompts 같은 MCP 구성요소를 설명합니다.',
    instructorNote: 'MCP를 추상 연결선이 아니라 Host/Client/Server와 권한 경계가 있는 시스템 장면으로 설명할 때 사용합니다.',
  },
  'mcp-spec': {
    publisher: 'Model Context Protocol',
    title: 'MCP Specification',
    url: 'https://modelcontextprotocol.io/specification/latest',
    maturity: 'stable',
    summaryKo: 'MCP 클라이언트와 서버 구현이 따라야 하는 최신 프로토콜 규격입니다.',
    instructorNote: '직접 구현까지 들어가지 않더라도, MCP가 제품별 기능명이 아니라 표준 계약이라는 사실을 강사용 배경으로 잡습니다.',
  },
  'anthropic-eng-agents': {
    publisher: 'Anthropic Engineering',
    title: 'Building effective agents',
    url: 'https://www.anthropic.com/engineering/building-effective-agents',
    maturity: 'secondary',
    summaryKo: '워크플로와 Agent를 구분하고, 단순하게 시작하며, 오케스트레이터·라우팅·병렬화 같은 패턴을 설명합니다.',
    instructorNote: 'Agent를 마법처럼 말하지 않고 언제 워크플로로 충분하고 언제 Agent가 필요한지 판단하는 기준으로 사용합니다.',
  },
  'anthropic-eng-context': {
    publisher: 'Anthropic Engineering',
    title: 'Effective context engineering for AI agents',
    url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
    maturity: 'secondary',
    summaryKo: '컨텍스트 설계, context rot, 지침의 고도, JIT 검색, 압축, 메모리와 Subagent 분리를 다룹니다.',
    instructorNote: 'Workflow 2강과 도구 전문과정에서 “많이 넣기”보다 범위, 유효기간, 필요한 시점의 정보 로딩을 가르칠 때 사용합니다.',
  },
  'anthropic-eng-multiagent': {
    publisher: 'Anthropic Engineering',
    title: 'How we built our multi-agent research system',
    url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
    maturity: 'secondary',
    summaryKo: '오케스트레이터-워커 구조, 멀티 Agent의 장점과 비용, 적합·부적합 조건을 설명합니다.',
    instructorNote: 'Agent Team이 항상 좋은 것이 아니라 비용과 통합 책임을 요구한다는 점을 강조할 때 사용합니다.',
  },
  'anthropic-eng-skills': {
    publisher: 'Anthropic Engineering',
    title: 'Equipping agents for the real world with Agent Skills',
    url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills',
    maturity: 'secondary',
    summaryKo: 'Agent Skills의 설계 철학과 실제 업무 적용 방식을 설명하는 심화 자료입니다.',
    instructorNote: 'Skill을 프롬프트 저장소가 아니라 필요한 순간 로딩되는 절차·자료·검증 패키지로 설명할 때 사용합니다.',
  },
  'vibe-coding-origin': {
    publisher: 'Andrej Karpathy',
    title: 'vibe coding 용어 첫 사용',
    url: 'https://x.com/karpathy/status/1886192184808149383',
    maturity: 'secondary',
    summaryKo: 'vibe coding이라는 표현이 대중적으로 퍼진 출발점으로, 자연어로 만들고 실행하며 반복하는 개발 감각을 설명하는 보조 자료입니다.',
    instructorNote: '기초 1강에서 용어 유래를 길게 설명하지 않고, 코딩 문법 암기보다 AI와 반복하는 작업 방식으로 연결할 때만 짧게 사용합니다.',
  },
  'vibe-coding-ibm': {
    publisher: 'IBM',
    title: 'What is Vibe Coding?',
    url: 'https://www.ibm.com/think/topics/vibe-coding',
    maturity: 'secondary',
    summaryKo: 'vibe coding의 정의와 맥락을 정리한 보조 설명 자료입니다.',
    instructorNote: 'X 원문 접근이 막힐 수 있으므로 강의에서는 용어 설명의 보조 출처로 함께 확인합니다.',
  },
  'claude-vision': {
    publisher: 'Anthropic',
    title: 'Claude Vision',
    url: 'https://platform.claude.com/docs/en/build-with-claude/vision',
    maturity: 'stable',
    summaryKo: 'Claude에서 이미지와 문서를 입력으로 이해하고 분석하는 멀티모달 기능입니다.',
    instructorNote: '제품·수익화와 도구 전문과정에서 스크린샷·시각 QA·문서 분석 예시를 설명할 때 사용합니다.',
  },
  'openai-images-vision': {
    publisher: 'OpenAI',
    title: 'Images and vision',
    url: 'https://platform.openai.com/docs/guides/images-vision',
    maturity: 'stable',
    summaryKo: 'OpenAI 모델의 이미지 이해와 이미지 생성 관련 공식 가이드입니다.',
    instructorNote: '멀티모달 결과물을 제품 온보딩, UX 리뷰, 브라우저 QA와 연결할 때 사용합니다.',
  },
  'openai-audio': {
    publisher: 'OpenAI',
    title: 'Audio and speech',
    url: 'https://developers.openai.com/api/docs/guides/audio',
    maturity: 'stable',
    summaryKo: '음성 입력, 음성 출력, 실시간 오디오 같은 AI 오디오 기능의 공식 가이드입니다.',
    instructorNote: '제품 아이디어가 텍스트·이미지 밖으로 확장될 때 필요한 입력/출력 채널로 설명합니다.',
  },
  'openai-models': {
    publisher: 'OpenAI',
    title: 'Models',
    url: 'https://developers.openai.com/api/docs/models',
    maturity: 'stable',
    summaryKo: 'OpenAI의 사용 가능한 모델과 용도, 제약을 확인하는 공식 기준 페이지입니다.',
    instructorNote: '모델명과 최신 여부는 변동이 잦으므로 수업 당일 확인하고, 슬라이드에는 특정 모델보다 선택 기준을 남깁니다.',
  },
  'claude-models': {
    publisher: 'Anthropic',
    title: 'Claude Models overview',
    url: 'https://platform.claude.com/docs/en/about-claude/models/overview',
    maturity: 'stable',
    summaryKo: 'Claude 모델의 종류와 특성, 사용 조건을 확인하는 공식 기준 페이지입니다.',
    instructorNote: 'Claude 관련 수업에서 모델 이름을 외우게 하지 말고 작업 특성, 비용, 한도, 지원 기능을 확인하게 합니다.',
  },
  'owasp-llm-top10': {
    publisher: 'OWASP Gen AI Security Project',
    title: 'Top 10 for LLM Applications',
    url: 'https://genai.owasp.org/llm-top-10/',
    maturity: 'secondary',
    summaryKo: '프롬프트 인젝션, 민감정보 노출, 공급망, 과도한 권한, 무제한 소비 등 LLM 앱의 주요 위험을 정리한 점검표입니다.',
    instructorNote: 'AI 자동화와 MCP·Agent 수업에서 “연결과 자동화는 보안 책임도 함께 늘린다”는 기준으로 사용합니다.',
  },
};

function sourceFocus(key, source) {
  if (key.startsWith('claude-')) return 'Claude Code';
  if (key.startsWith('codex-')) return 'Codex';
  if (key.startsWith('github-')) return 'GitHub';
  if (key.startsWith('openai-')) return 'OpenAI';
  if (key.startsWith('anthropic-eng-')) return 'Anthropic Engineering';
  if (key.startsWith('vibe-coding-')) return 'Vibe Coding';
  if (key.startsWith('owasp-')) return 'OWASP';
  if (key.startsWith('firebase-')) return 'Firebase';
  if (key.startsWith('vercel-')) return 'Vercel';
  if (key.startsWith('mcp-')) return 'MCP';
  if (key.startsWith('stripe-')) return 'Stripe';
  if (key.startsWith('supabase-')) return 'Supabase';
  if (key.startsWith('product-toss')) return 'Toss Payments';
  if (key.startsWith('product-nng')) return 'UX Research';
  if (key.startsWith('product-atlassian')) return 'Product Planning';
  if (key.startsWith('product-yc')) return 'Startup/Product';
  if (key.startsWith('product-material')) return 'UI/UX';
  if (key.startsWith('node-')) return 'Node.js';
  if (key.startsWith('vscode-')) return 'VS Code';
  if (key.startsWith('mdn-')) return 'HTTP';
  if (key.startsWith('npm-')) return 'npm';
  return source.publisher || '공식 문서';
}

function ensureTeachingFields(key, source) {
  const focus = sourceFocus(key, source);
  const title = source.title || source.pageTitle || key;
  source.coreConceptKo = source.coreConceptKo || source.summaryKo;
  if (!source.instructorBackground || /을 수업 전/.test(source.instructorBackground)) {
    source.instructorBackground = `${focus} 공식 문서는 버튼 위치를 외우기 위한 자료가 아니라 기능의 책임, 권한, 실패 조건을 확인하기 위한 기준 문서입니다. 강사는 이 문서를 수업 전 다시 열어 ${title}의 현재 메뉴명과 지원 상태를 확인해야 합니다.`;
  }
  if (!source.classroomAnalogy || source.classroomAnalogy.startsWith(title)) {
    source.classroomAnalogy = '이 문서는 현장 시연에서 사용하는 조작 설명서라기보다, 건물의 전기·수도 도면처럼 문제가 생겼을 때 어느 연결을 확인할지 알려주는 기준표로 설명합니다.';
  }
  source.commonMisunderstanding = source.commonMisunderstanding
    || `수강생은 '${focus}가 알아서 처리한다'고 이해하기 쉽습니다. 하지만 공식 문서가 말하는 범위, 권한, 로그, 검증 조건을 사람이 확인해야 실제 운영 가능한 결과가 됩니다.`;
  source.demoPoint = source.demoPoint
    || `슬라이드에서는 개념을 먼저 보여주고, 시연에서는 ${title}의 공식 용어가 실제 터미널·IDE·브라우저 화면에서 어디에 대응되는지 한 단계만 연결합니다.`;
  source.expectedQuestions = source.expectedQuestions || [
    {
      q: '이 내용을 모두 외워야 하나요?',
      a: '아닙니다. 수업에서는 정의 암기가 아니라 문제가 생겼을 때 어떤 공식 기준을 다시 확인해야 하는지 판단하는 법을 배웁니다.',
    },
    {
      q: 'AI에게 맡기면 공식 문서를 몰라도 되지 않나요?',
      a: 'AI가 초안을 만들 수는 있지만 권한, 비용, 보안, 배포 같은 결정은 사람이 공식 기준으로 검토해야 합니다.',
    },
  ];
  source.preClassCheck = source.preClassCheck || [
    '공식 URL 접속과 리다이렉트 상태 확인',
    '설치 명령, 요금제, 베타 기능 여부 재확인',
    '수업에서 보여줄 화면과 대체 캡처 준비',
    '수강생에게 말할 쉬운 비유 한 문장 준비',
  ];
  source.lectureUseHint = source.lectureUseHint
    || 'course-data의 sourceKeys로 연결된 회차에서 공식 개념 학습, 시연 전 주의점, 예상 질문 답변에 사용합니다.';
}

function writeOutputs() {
  fs.writeFileSync(jsonPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf-8');
  fs.writeFileSync(jsPath, `window.VIBE_OFFICIAL_SOURCES = ${JSON.stringify(catalog, null, 2)};\n`, 'utf-8');
}

function request(url, redirects = 0) {
  return new Promise((resolve) => {
    if (redirects > 6) return resolve({ ok: false, status: 0, finalUrl: url, title: '', error: 'too many redirects' });
    let parsed;
    try {
      parsed = new URL(url);
    } catch (error) {
      return resolve({ ok: false, status: 0, finalUrl: url, title: '', error: error.message });
    }
    if (!allowedHosts.includes(parsed.hostname)) {
      return resolve({ ok: false, status: 0, finalUrl: url, title: '', error: `host not allowed: ${parsed.hostname}` });
    }
    const client = parsed.protocol === 'http:' ? http : https;
    const req = client.get(parsed, {
      headers: {
        'User-Agent': 'VIBE-STUDIO-Sources/3.0',
        Accept: 'text/html,application/xhtml+xml',
      },
      timeout: 15000,
    }, (response) => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
        response.resume();
        const nextUrl = new URL(response.headers.location, parsed).toString();
        return resolve(request(nextUrl, redirects + 1));
      }
      let body = '';
      response.setEncoding('utf-8');
      response.on('data', (chunk) => {
        if (body.length < 250000) body += chunk;
      });
      response.on('end', () => {
        const title = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
          ?.replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim() || '';
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 400,
          status: response.statusCode || 0,
          finalUrl: parsed.toString(),
          title,
          error: '',
        });
      });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (error) => resolve({ ok: false, status: 0, finalUrl: url, title: '', error: error.message }));
  });
}

async function main() {
  for (const [key, source] of Object.entries(additionalSources)) {
    catalog.sources[key] = {
      ...catalog.sources[key],
      ...source,
    };
  }
  const checkedAt = new Date().toISOString();
  let okCount = 0;
  for (const [key, source] of Object.entries(catalog.sources)) {
    ensureTeachingFields(key, source);
    const result = await request(source.url);
    source.checkedAt = checkedAt;
    source.httpStatus = result.status;
    source.status = result.ok ? 'verified' : 'unavailable';
    source.finalUrl = result.finalUrl;
    if (result.title) source.pageTitle = result.title;
    if (result.error) source.lastError = result.error;
    else delete source.lastError;
    if (result.ok) okCount += 1;
    console.log(`${result.ok ? '✓' : '!'} ${key} ${result.status || result.error}`);
  }
  catalog.checkedAt = checkedAt;
  writeOutputs();
  console.log(`Official sources refreshed: ${okCount}/${Object.keys(catalog.sources).length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
