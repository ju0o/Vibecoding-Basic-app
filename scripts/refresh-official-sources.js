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
];

function sourceFocus(key, source) {
  if (key.startsWith('claude-')) return 'Claude Code';
  if (key.startsWith('codex-')) return 'Codex';
  if (key.startsWith('github-')) return 'GitHub';
  if (key.startsWith('firebase-')) return 'Firebase';
  if (key.startsWith('vercel-')) return 'Vercel';
  if (key.startsWith('mcp-')) return 'MCP';
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
