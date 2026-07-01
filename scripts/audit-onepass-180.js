'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sessionDir = path.join(root, 'src', 'content', 'sessions');
const requirements = [
  { file: 'onepass-week1.html', minimumSlides: 35, terms: ['AI 한방 이해하기', 'React·Next.js', 'GitHub', '환경변수'], documentaryScenes: 0 },
  { file: 'onepass-week2.html', minimumSlides: 24, terms: ['Claude Code', 'Codex', '데스크톱 앱', 'CLI'], documentaryScenes: 3 },
  { file: 'onepass-week3.html', minimumSlides: 24, terms: ['MCP', 'Skill', 'SubAgent', 'Workflow'], documentaryScenes: 3 },
  { file: 'onepass-week4.html', minimumSlides: 24, terms: ['오케스트레이션', 'AI 사무실', '리뷰 게이트', '복구'], documentaryScenes: 3 },
];

const errors = [];
const weekOne = fs.readFileSync(path.join(sessionDir, 'onepass-week1.html'), 'utf-8');
for (const token of ['.src-s3 .building-lab', '.src-s5 .release-track']) {
  if (!weekOne.includes(token)) errors.push(`onepass-week1.html: missing scoped source CSS '${token}'`);
}
for (const requirement of requirements) {
  const file = path.join(sessionDir, requirement.file);
  const html = fs.readFileSync(file, 'utf-8');
  const slideCount = (html.match(/<div class="slide/g) || []).length + (html.match(/<section class="slide/g) || []).length;
  if (!html.includes('data-onepass-mode="lecture"')) errors.push(`${requirement.file}: lecture mode marker missing`);
  if (slideCount < requirement.minimumSlides) errors.push(`${requirement.file}: expected at least ${requirement.minimumSlides} slides, found ${slideCount}`);
  if (html.includes('오늘 실습') || html.includes('실습 타이머')) errors.push(`${requirement.file}: practice-only slide text remains`);
  if ((html.match(/class="op-seq/g) || []).length < 3) errors.push(`${requirement.file}: needs at least 3 manual scene controls`);
  if (!html.includes('data-seq-action="pause"')) errors.push(`${requirement.file}: pause control missing from manual scenes`);
  if (requirement.documentaryScenes && (html.match(/class="op-seq-evidence"/g) || []).length < requirement.documentaryScenes) {
    errors.push(`${requirement.file}: needs ${requirement.documentaryScenes} visual documentary manual scenes`);
  }
  if (requirement.documentaryScenes && !html.includes('공식 문서 기준')) {
    errors.push(`${requirement.file}: missing official-source caution caption`);
  }
  for (const term of requirement.terms) {
    if (!html.includes(term)) errors.push(`${requirement.file}: missing required topic '${term}'`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, decks: requirements.length, mode: '180-minute-lecture' }, null, 2));
