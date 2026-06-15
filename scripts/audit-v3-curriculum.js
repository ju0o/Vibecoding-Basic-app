'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/content/course-manifest.json'), 'utf-8'));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
const freeze = JSON.parse(fs.readFileSync(path.join(root, 'docs/v3/basic-v2-freeze.json'), 'utf-8'));
const sourceCatalog = JSON.parse(fs.readFileSync(path.join(root, 'src/content/sources/official-sources.json'), 'utf-8'));
const indexHtml = fs.readFileSync(path.join(root, 'src/renderer/index.html'), 'utf-8');

const failures = [];
const pass = (condition, message) => {
  if (!condition) failures.push(message);
  else console.log(`✓ ${message}`);
};

pass(pkg.version === '3.0.0-beta.1', 'package version is 3.0.0-beta.1');
pass(manifest.defaultCourseId === 'basic-current', 'current cohort remains the default course');
pass(manifest.studentCourseIds.length === 5, 'student mode has exactly five courses');
pass(new Set(manifest.studentCourseIds).size === 5, 'student course ids are unique');

const expectedCounts = {
  'basic-current': 6,
  product: 8,
  workflow: 4,
  claude: 6,
  codex: 6,
  'foundation-next': 4,
};

for (const [courseId, expected] of Object.entries(expectedCounts)) {
  const course = manifest.courses.find((item) => item.id === courseId);
  pass(Boolean(course), `${courseId} exists`);
  if (!course) continue;
  pass(course.sessions.length === expected, `${courseId} has ${expected} lessons`);
  pass((course.materials?.student || []).length === 5, `${courseId} has five student materials`);
  pass((course.materials?.instructor || []).length === 5, `${courseId} has five instructor materials`);
}

const preview = manifest.courses.find((course) => course.id === 'foundation-next');
pass(preview.visibility === 'preview', 'future four-week foundation is preview-only');
pass(preview.audience.length === 1 && preview.audience[0] === 'instructor', 'future foundation is instructor-only');
pass(!preview.sessions.some((session) => /AI 이해|쇼케이스/.test(session.title)), 'future foundation excludes AI general theory and showcase');

const current = manifest.courses.find((course) => course.id === 'basic-current');
pass(current.curriculumVersion === '2기-6주', 'current six-week cohort keeps its curriculum version');
pass(current.sessions.some((session) => session.type === 'showcase'), 'current cohort still contains its showcase');

for (const record of freeze.files) {
  const filePath = path.join(root, record.file);
  if (!fs.existsSync(filePath)) {
    failures.push(`frozen current-course file missing: ${record.file}`);
    continue;
  }
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  if (hash !== record.sha256 || buffer.length !== record.bytes) {
    failures.push(`frozen current-course file changed: ${record.file}`);
  }
}
if (!failures.some((failure) => failure.startsWith('frozen current-course'))) {
  console.log(`✓ ${freeze.files.length} current-course files match the V2 freeze`);
}

const v3Courses = manifest.courses.filter((course) => course.id !== 'basic-current');
for (const course of v3Courses) {
  for (const session of course.sessions) {
    pass(session.duration === '120분', `${session.id} uses the 120-minute format`);
    for (const sourceKey of session.sourceKeys || []) {
      if (!sourceCatalog.sources[sourceKey]) failures.push(`${session.id} references unknown source: ${sourceKey}`);
    }
  }
}

const titles = new Map();
for (const course of v3Courses) {
  for (const session of course.sessions) {
    const normalized = session.title.replace(/^\d+강\s*·\s*/, '').trim();
    if (titles.has(normalized)) {
      failures.push(`duplicate specialist lesson title: "${normalized}" in ${titles.get(normalized)} and ${course.id}`);
    }
    titles.set(normalized, course.id);
  }
}
console.log(`✓ ${titles.size} V3 lesson titles are distinct`);

pass(!/전체 과정|catalog-grid|catalog-card|과정 통계/.test(indexHtml), 'catalog and course-card dashboard are removed');
pass(/course-rail/.test(indexHtml) && /lesson-pane/.test(indexHtml) && /detail-pane/.test(indexHtml), 'three-pane studio structure exists');
pass(/command-palette/.test(indexHtml), 'Ctrl+K command palette exists');

for (const course of manifest.courses) {
  for (const session of course.sessions) {
    const target = path.join(root, 'src/content', session.file.split(/[?#]/)[0]);
    if (!fs.existsSync(target)) failures.push(`missing lesson target: ${session.file}`);
  }
  for (const audience of ['student', 'instructor']) {
    for (const material of course.materials?.[audience] || []) {
      const target = path.join(root, 'src/content', material.file.split(/[?#]/)[0]);
      if (!fs.existsSync(target)) failures.push(`missing material target: ${material.file}`);
    }
  }
}

const summary = {
  ok: failures.length === 0,
  courses: manifest.courses.length,
  studentCourses: manifest.studentCourseIds.length,
  v3Lessons: v3Courses.reduce((total, course) => total + course.sessions.length, 0),
  sourceCount: Object.keys(sourceCatalog.sources).length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
