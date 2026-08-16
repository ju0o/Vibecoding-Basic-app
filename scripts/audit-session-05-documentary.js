'use strict';

const fs = require('fs');
const path = require('path');

const sessionPath = path.join(__dirname, '../src/content/sessions/session-05-security-api.html');
const html = fs.readFileSync(sessionPath, 'utf8');
const titles = new Set([...html.matchAll(/data-title="([^"]+)"/g)].map((match) => match[1]));
const requiredTitles = [
  '내 컴퓨터와 공개 URL',
  'Git 명령어와 GitHub 확인',
  'GitHub에 남는 변경 기록',
  'GitHub 협업과 프로젝트 내려받기',
  '브라우저에서 확인하는 공개 요청',
  '비밀값과 배포 환경',
  '데이터 접근 규칙',
  'Vercel과 Firebase의 역할',
  '한 번의 release가 공개 URL이 되기까지',
  '30분 실습',
  '다음 강의 예고'
];

const missingTitles = requiredTitles.filter((title) => !titles.has(title));
const slideCount = [...html.matchAll(/<section class="slide(?:\s|\")/g)].length;
const requiredTokens = [
  'documentary-frame',
  'release-next',
  'release-reset',
  'git-command-workbench',
  'github-page-checks',
  'release-deployment-map',
  'secret-source-line',
  'github-operations',
  'collab-command-stage',
  'devtools-workbench',
  'firestore-console',
  'platform-console',
  'launch-browser-action'
];
const missingTokens = requiredTokens.filter((token) => !html.includes(token));
const errors = [];

if (slideCount !== 13) errors.push(`Expected 13 slides, found ${slideCount}.`);
if (missingTitles.length) errors.push(`Missing documentary slides: ${missingTitles.join(', ')}.`);
if (missingTokens.length) errors.push(`Missing documentary scene tokens: ${missingTokens.join(', ')}.`);
if (!html.includes('git add .') || !html.includes('git status') || !html.includes('git commit -m') || !html.includes('git push')) {
  errors.push('Git command walkthrough must include status, add, commit, and push.');
}
if (html.includes('data-title="Vercel 배포의 실제 순서"') || html.includes('data-title="Firebase Hosting 배포"')) {
  errors.push('Legacy deployment-only slides must be folded into the unified release pipeline.');
}

const report = {
  ok: errors.length === 0,
  slides: slideCount,
  missingTitles,
  missingTokens,
  errors
};

console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exit(1);
