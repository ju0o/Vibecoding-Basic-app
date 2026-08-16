'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const vm = require('vm');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/content/course-manifest.json'), 'utf-8'));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
const freeze = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'data', 'basic-v2-freeze.json'), 'utf-8'));
const sourceCatalog = JSON.parse(fs.readFileSync(path.join(root, 'src/content/sources/official-sources.json'), 'utf-8'));
const indexHtml = fs.readFileSync(path.join(root, 'src/renderer/index.html'), 'utf-8');
const courseDataContext = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, 'src/content/v3/course-data.js'), 'utf-8'),
  courseDataContext
);
const v3CourseData = courseDataContext.window.VIBE_V3_COURSES;

const failures = [];
const pass = (condition, message) => {
  if (!condition) failures.push(message);
  else console.log(`✓ ${message}`);
};

function normalizeFrozenBuffer(buffer) {
  if (freeze.hashMode === 'text-lf-normalized') {
    return Buffer.from(buffer.toString('utf-8').replace(/\r\n/g, '\n'), 'utf-8');
  }
  return buffer;
}

pass(pkg.version === '3.0.0-beta.3', 'package version is 3.0.0-beta.3');
pass(manifest.defaultCourseId === 'basic-current', 'current cohort remains the default course');
pass(manifest.modes?.studio?.show?.includes('preview'), 'studio mode can see preview courses');
pass(manifest.modes?.printPreview?.show?.includes('primary'), 'print preview remains primary-course scoped');

const expectedCounts = {
  'basic-current': 6,
  product: 8,
  workflow: 4,
  claude: 6,
  codex: 6,
  advanced: 8,
  'foundation-next': 4,
};

for (const [courseId, expected] of Object.entries(expectedCounts)) {
  const course = manifest.courses.find((item) => item.id === courseId);
  pass(Boolean(course), `${courseId} exists`);
  if (!course) continue;
  pass(course.sessions.length === expected, `${courseId} has ${expected} lessons`);
  const expectedStudent = courseId === 'basic-current' ? 7 : 6;
  const expectedInstructor = courseId === 'basic-current'
    ? 9
    : courseId === 'workflow'
      ? 10
      : courseId === 'advanced'
      ? 7
      : ['claude', 'codex'].includes(courseId)
      ? 9
      : courseId === 'product'
        ? 8
        : 7;
  pass((course.materials?.student || []).length === expectedStudent, `${courseId} has ${expectedStudent} student materials`);
  pass((course.materials?.instructor || []).length === expectedInstructor, `${courseId} has ${expectedInstructor} instructor materials`);
}

const preview = manifest.courses.find((course) => course.id === 'foundation-next');
pass(preview.visibility === 'preview', 'future four-week foundation is preview-only');
pass(preview.audience.length === 1 && preview.audience[0] === 'studio', 'future foundation is studio-only');
pass(!preview.sessions.some((session) => /AI 이해|쇼케이스/.test(session.title)), 'future foundation excludes AI general theory and showcase');

const current = manifest.courses.find((course) => course.id === 'basic-current');
pass(current.curriculumVersion === '2기-6주', 'current six-week cohort keeps its curriculum version');
// 6강 was rebuilt as a recap lecture; the original showcase must survive as an archived revision.
pass(
  current.sessions.some((session) => (session.revisions || []).some((revision) => revision.file?.includes('session-06-showcase'))),
  'current cohort keeps its showcase archived as a revision',
);
pass(current.sessions.every((session) => session.revisions?.length === 2), 'current cohort has active and V3 work revisions');

for (const record of freeze.files) {
  const filePath = path.join(root, record.file);
  if (!fs.existsSync(filePath)) {
    failures.push(`frozen current-course file missing: ${record.file}`);
    continue;
  }
  const buffer = normalizeFrozenBuffer(fs.readFileSync(filePath));
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
    // onepass runs as 180-minute intensive lectures, the special-lecture library
    // as 60-90 minute one-offs; every other V3 track stays at 120 minutes.
    const allowedDurations = course.id === 'onepass' ? ['180분'] : course.id === 'special' ? ['60분', '90분'] : ['120분'];
    pass(allowedDurations.includes(session.duration), `${session.id} uses the ${allowedDurations.join('/')} format`);
    for (const sourceKey of session.sourceKeys || []) {
      if (!sourceCatalog.sources[sourceKey]) failures.push(`${session.id} references unknown source: ${sourceKey}`);
    }
  }
}

const sceneIds = new Set();
let sceneLessons = 0;
for (const [courseId, course] of Object.entries(v3CourseData)) {
  for (const [index, session] of course.sessions.entries()) {
    sceneLessons += 1;
    pass(Boolean(session.revision), `${courseId}-${index + 1} has a revision`);
    const parentCourse = manifest.courses.find((item) => item.id === courseId);
    const allowedStatuses = parentCourse?.visibility === 'preview' ? ['review', 'ready', 'preview'] : ['review', 'ready'];
    pass(allowedStatuses.includes(session.status), `${courseId}-${index + 1} has a production status`);
    pass(Boolean(session.visualScene?.id), `${courseId}-${index + 1} has a visual scene`);
    pass(session.visualScene?.type !== 'generic', `${courseId}-${index + 1} does not use a generic scene`);
    if (sceneIds.has(session.visualScene?.id)) failures.push(`duplicate scene id: ${session.visualScene.id}`);
    sceneIds.add(session.visualScene?.id);
    pass(session.interactions?.controls?.join(',') === 'start,previous,next,pause,reset', `${courseId}-${index + 1} has manual controls`);
    pass(session.scriptSlides?.length === 13, `${courseId}-${index + 1} has a 13-slide instructor script`);
    pass(session.scriptSlides?.every((slide) => slide.say && slide.do && slide.ask && slide.expected && slide.deepDive && slide.recovery && slide.motionCue && slide.sourceCue), `${courseId}-${index + 1} has SAY/DO/ASK/expected/deep-dive/motion/source/recovery script`);
    if (session.status === 'ready') {
      pass((session.sourceKeys || []).length >= 3, `${courseId}-${index + 1} has at least 3 official study sources`);
      pass(Boolean(session.professional?.focus), `${courseId}-${index + 1} has professional research focus`);
      pass((session.professional?.officialStudy || []).length >= 3, `${courseId}-${index + 1} has official study notes`);
      pass(Boolean(session.professional?.visualSimulation), `${courseId}-${index + 1} has visual simulation brief`);
      pass((session.professional?.demoRun || []).length >= 4, `${courseId}-${index + 1} has demo runbook steps`);
      pass((session.professional?.failureDrill || []).length >= 3, `${courseId}-${index + 1} has failure drills`);
      pass((session.professional?.misconceptions || []).length >= 2, `${courseId}-${index + 1} has misconception corrections`);
      pass((session.professional?.expertQuestions || []).length >= 2, `${courseId}-${index + 1} has expert Q&A`);
      pass((session.professional?.studyPath || []).length >= 5, `${courseId}-${index + 1} has instructor study path`);
      pass((session.professional?.slideUpgrade || []).length >= 5, `${courseId}-${index + 1} has slide upgrade brief`);
      pass((session.professional?.motionStoryboard || []).length >= 5, `${courseId}-${index + 1} has motion storyboard`);
      pass((session.professional?.realWorldAssets || []).length >= 5, `${courseId}-${index + 1} has real-world asset checklist`);
      pass((session.professional?.rehearsalChecklist || []).length >= 5, `${courseId}-${index + 1} has rehearsal checklist`);
    }
    for (const variant of ['starter', 'broken', 'complete']) {
      const target = path.join(root, 'src/content', session.demoProject?.[variant] || '', 'index.html');
      if (!fs.existsSync(target)) failures.push(`${courseId}-${index + 1} missing ${variant} lab`);
    }
    const fallback = path.join(root, 'src/content', session.fallbackMedia?.image || '');
    if (!fs.existsSync(fallback)) failures.push(`${courseId}-${index + 1} missing fallback image`);
  }
}
pass(sceneLessons === 43, '43 revised lessons have scene and teaching data');
pass(sceneIds.size === sceneLessons, 'all revised lessons have unique scene ids');

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
pass(!/학생 모드|강사 모드|btn-mode|mode-toggle/.test(indexHtml), 'student/instructor mode toggle is removed from UI');
pass(/course-rail/.test(indexHtml) && /lesson-pane/.test(indexHtml) && /detail-pane/.test(indexHtml), 'three-pane studio structure exists');
pass(/command-palette/.test(indexHtml), 'Ctrl+K command palette exists');

for (const [key, source] of Object.entries(sourceCatalog.sources)) {
  pass(Boolean(source.coreConceptKo), `${key} has Korean core concept`);
  pass(Boolean(source.instructorBackground), `${key} has instructor background`);
  pass(Boolean(source.classroomAnalogy), `${key} has classroom analogy`);
  pass(Boolean(source.commonMisunderstanding), `${key} has common misunderstanding`);
  pass(Boolean(source.demoPoint), `${key} has demo point`);
  pass(Array.isArray(source.expectedQuestions) && source.expectedQuestions.length >= 2, `${key} has expected questions`);
  pass(Array.isArray(source.preClassCheck) && source.preClassCheck.length >= 4, `${key} has pre-class checklist`);
}

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
  studioCourses: manifest.courses.length,
  v3Lessons: v3Courses.reduce((total, course) => total + course.sessions.length, 0),
  revisedLessons: sceneLessons,
  sourceCount: Object.keys(sourceCatalog.sources).length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
