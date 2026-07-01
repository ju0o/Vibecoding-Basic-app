'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'src/content/sessions/session-04-revenue.html');
const html = fs.readFileSync(htmlPath, 'utf-8');
const scriptPath = path.join(root, 'src/content/appendix/script-session4.html');
const scriptHtml = fs.readFileSync(scriptPath, 'utf-8');
const failures = [];

function pass(condition, message) {
  if (!condition) failures.push(message);
}

const titles = Array.from(html.matchAll(/<section class="slide[^"]*" data-title="([^"]+)"/g)).map((match) => match[1]);
function slideHtml(title) {
  const marker = `data-title="${title}"`;
  const start = html.indexOf(marker);
  if (start === -1) return '';
  const sectionStart = html.lastIndexOf('<section', start);
  const next = html.indexOf('</section>', start);
  return next === -1 ? html.slice(sectionStart) : html.slice(sectionStart, next + '</section>'.length);
}

const slide2 = slideHtml('왜 파일 구조가 다를까');
const slide7 = slideHtml('프로젝트 규모 키우기');
const slide8 = slideHtml('프로젝트 전체 지도');

[
  '파일 구조 이해',
  '왜 파일 구조가 다를까',
  '원룸 구조',
  '일반 주택 구조',
  '아파트 구조',
  '대형 쇼핑몰 구조',
  '프로젝트 규모 키우기',
  '프로젝트 전체 지도',
  'VS Code 파일 탐색기',
  'src 작업 영역',
  '코드와 화면 연결',
  '페이지 조립과 수정 영향',
  'AI 수정 내역 검토',
  '30분 실습',
  '다음 강의 예고',
].forEach((title) => pass(titles.includes(title), `missing slide: ${title}`));

pass(titles.length === 18, `expected 18 slides after duplicate cleanup, got ${titles.length}`);
pass(!titles.includes('설정과 기록 파일'), 'settings file details should be folded into slide 8');
pass(!titles.includes('수정 영향 범위'), 'impact explanation should be merged into composition slide');
pass(!titles.includes('대형 식당 주방 비유'), 'kitchen metaphor slide should be removed from the main flow');
pass(/원룸[\s\S]*index\.html/.test(html), 'studio apartment slide explains single index.html');
pass(/일반 주택[\s\S]*style\.css[\s\S]*script\.js/.test(html), 'house slide explains HTML/CSS/JS split');
pass(/아파트[\s\S]*src\/[\s\S]*components\/[\s\S]*utils\//.test(html), 'apartment slide explains src role grouping');
pass(/대형 쇼핑몰[\s\S]*src\/app\/dashboard\/page\.tsx/.test(html), 'mall slide explains app router example');
pass(/style\.css[\s\S]*script\.js[\s\S]*components\/[\s\S]*\.env\.local[\s\S]*\.env\.example[\s\S]*\.gitignore/.test(scriptHtml), 'instructor script explains staged project scaling and env safety');
pass(/scale-ambient/.test(html), 'ambient autoplay motion class exists');
pass(/structure-result-grid/.test(html), 'slide 2 uses a structure comparison board instead of previewing all buildings');
pass(!/scale-showcase/.test(slide2), 'slide 2 should not preview all building stages');
pass(!/data-building-kind=/.test(slide2), 'slide 2 should not show building images before the focused metaphor slides');
pass(/building-viewport/.test(html), 'single-building viewport exists for focused slides');
pass(/building-scene/.test(html), 'single-building 3D scene class exists');
pass(/data-building-kind="studio"/.test(html), 'studio building has a dedicated scene');
pass(/data-building-kind="house"/.test(html), 'house building has a dedicated scene');
pass(/data-building-kind="apartment"/.test(html), 'apartment building has a dedicated scene');
pass(/data-building-kind="mall"/.test(html), 'mall building has a dedicated scene');
pass(!/scale-detail-layout">[\s\S]{0,500}<div class="building studio"[\s\S]{0,500}<div class="building house"[\s\S]{0,500}<div class="building apartment"[\s\S]{0,500}<div class="building mall"/.test(html), 'focused slides should not render all four buildings at once');
pass(/modern-house-exterior-unsplash-2\.jpg/.test(html), 'house slide uses a dedicated house image');
pass(/single-file-breakdown/.test(html), 'single index.html slide separates internal sections without drawing them as file-tree children');
pass(/scale-up-prompt/.test(slide7), 'growth slide uses a simple AI prompt card');
pass(!/scale-growth-step/.test(slide7), 'growth slide should not show the detailed five-step technical list');
pass(!/src 안에 public이나 node_modules/.test(slide8), 'root map slide should not include the old warning text');
pass(/\.env\.local은 내 PC 실제 비밀값/.test(html), 'slide 8 root details explain .env.local and .env.example once');
pass(/architecture-combo/.test(html), 'composition and impact are merged into one upgraded slide');

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, slides: titles.length, checked: 'session-04 structure scale cleanup' }, null, 2));
