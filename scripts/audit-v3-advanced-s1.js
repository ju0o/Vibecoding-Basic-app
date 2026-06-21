'use strict';

// Validates the advanced (심화 통합) pilot course. Originally S1-only; now generalized
// to validate every advanced lesson against the shared 9-slot / manual-scene / source-key
// rules, plus lesson-specific checks for S1 and S2.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const failures = [];

function pass(condition, message) {
  if (!condition) failures.push(message);
  else console.log(`✓ ${message}`);
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf-8'));
}

const manifest = readJson('src/content/course-manifest.json');
const sources = readJson('src/content/sources/official-sources.json').sources;
const context = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, 'src/content/v3/course-data.js'), 'utf-8'),
  context
);

const course = context.window.VIBE_V3_COURSES?.advanced;
const manifestCourse = manifest.courses.find((item) => item.id === 'advanced');
const lessons = course?.sessions || [];
const manifestLessons = manifestCourse?.sessions || [];
const deckJs = fs.readFileSync(path.join(root, 'src/content/v3/deck.js'), 'utf-8');
const registryJs = fs.readFileSync(path.join(root, 'src/content/v3/scene-registry.js'), 'utf-8');

// --- course registration ---
pass(Boolean(manifestCourse), 'advanced course is registered in manifest');
pass(manifestCourse?.visibility === 'preview', 'advanced pilot remains preview-only');
pass(Boolean(course), 'advanced course data exists');
pass(course?.visualMode === 'advanced', 'advanced course uses the advanced visual mode');
pass(lessons.length >= 2, 'advanced course exposes S1 and at least S2');
pass(manifestLessons.length === lessons.length, 'manifest and course data expose the same lesson count');

// --- per-lesson structural rules (apply to every advanced lesson) ---
lessons.forEach((lesson, index) => {
  const label = `S${index + 1}`;
  pass(Boolean(lesson?.module), `${label} has an explicit module label`);
  pass(Boolean(lesson?.visualScene?.id), `${label} has a visual scene id`);
  pass(lesson?.demo?.manual === true, `${label} demo is manual, not autoplay`);
  pass(
    lesson?.interactions?.controls?.join(',') === 'start,previous,next,pause,reset',
    `${label} uses the five presenter controls`,
  );
  pass((lesson?.sourceKeys || []).length >= 3, `${label} has at least three official source keys`);
  for (const key of lesson?.sourceKeys || []) {
    pass(Boolean(sources[key]), `${label} source key exists: ${key}`);
  }
  const slides = lesson?.slides || [];
  pass(slides.length === 9, `${label} uses the 9-slot slide architecture`);
  const imageSlots = slides.map((slide, slot) => (slide.kind === 'img' ? slot + 1 : null)).filter(Boolean);
  pass(JSON.stringify(imageSlots) === JSON.stringify([1, 2, 9]), `${label} uses image slots only for 1, 2, and 9`);
  pass(slides.some((slide) => slide.kind === 'scene'), `${label} includes a representative manual scene slot`);
  pass(slides.filter((slide) => slide.kind === 'cap').length >= 2, `${label} includes capture/documentary slots`);
  pass(slides.every((slide) => slide.title && slide.screenText), `${label} slides have visible titles and screen text`);
  pass(slides.every((slide) => slide.presenterNote), `${label} slides separate presenter-only notes`);
  pass(registryJs.includes(`'${lesson?.visualScene?.id}'`), `scene registry registers ${lesson?.visualScene?.id}`);
});

// --- lesson-specific checks ---
const s1 = lessons[0];
pass(s1?.module === 'S1 · SURFACE STRATEGY', 'S1 module label is explicit');
pass(s1?.visualScene?.id === 's-01-surface', 'S1 visual scene id is s-01-surface');
pass(s1?.visualScene?.type === 'surface-compare', 'S1 visual scene type is surface-compare');
pass(s1?.visualScene?.alias === 'workflow-01-terminal', 'S1 keeps the workflow-01-terminal alias');

const s2 = lessons[1];
pass(s2?.module === 'S2 · CONTEXT & MEMORY', 'S2 module label is explicit');
pass(s2?.visualScene?.id === 's-02-context', 'S2 visual scene id is s-02-context');
pass(s2?.visualScene?.type === 'context-memory', 'S2 visual scene type is context-memory');
pass(s2?.visualScene?.alias === 'workflow-02-workflow', 'S2 keeps the workflow-02-workflow alias');

const manifestS1 = manifestLessons[0];
pass(
  Boolean(manifestS1?.file?.includes('v3/deck.html?course=advanced&lesson=1')),
  'advanced S1 opens the V3 deck route',
);
const manifestS2 = manifestLessons[1];
pass(
  Boolean(manifestS2?.file?.includes('v3/deck.html?course=advanced&lesson=2')),
  'advanced S2 opens the V3 deck route',
);

// --- renderer + deck capabilities ---
pass(/structuredSlides|lesson\.slides|renderSlotSlide/.test(deckJs), 'V3 deck renderer supports structured slide data');
pass(/totalSlides/.test(deckJs), 'V3 deck counter is dynamic for non-13-slide decks');
pass(/surface-compare/.test(registryJs), 'scene registry includes a surface-compare renderer');
pass(/context-memory|renderContextMemory/.test(registryJs), 'scene registry includes a context-memory renderer');

const summary = {
  ok: failures.length === 0,
  checked: `advanced course (${lessons.length} lessons)`,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
