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
  'developers.openai.com',
  'docs.stripe.com',
  'supabase.com',
  'docs.tosspayments.com',
  'www.nngroup.com',
  'www.atlassian.com',
  'www.ycombinator.com',
  'm2.material.io',
  'm3.material.io',
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
};

function sourceFocus(key, source) {
  if (key.startsWith('claude-')) return 'Claude Code';
  if (key.startsWith('codex-')) return 'Codex';
  if (key.startsWith('github-')) return 'GitHub';
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
