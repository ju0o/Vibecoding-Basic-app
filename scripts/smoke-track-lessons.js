'use strict';

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/content/course-manifest.json'), 'utf-8'));
const trackSessions = manifest.courses.flatMap((course) =>
  course.sessions
    .filter((session) => session.file?.startsWith('tracks/'))
    .map((session) => ({ courseId: course.id, session }))
);

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    backgroundColor: '#080b13',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  const failures = [];
  const results = [];
  let currentFile = '';

  win.webContents.on('console-message', (_event, level, message) => {
    if (/Electron Security Warning/i.test(message)) return;
    if (level >= 2 || /uncaught|failed|error/i.test(message)) {
      failures.push(`${currentFile}: ${message}`);
    }
  });

  for (const { courseId, session } of trackSessions) {
    currentFile = session.file;
    const target = path.join(root, 'src', 'content', session.file);
    await win.loadFile(target);
    await wait(35);

    const result = await win.webContents.executeJavaScript(`
      (() => {
        const active = document.querySelector('.slide.active');
        const sequenceButton = document.querySelector('[data-sequence="1"]');
        const journeyButton = document.querySelector('#journey-next');
        const beforeSequence = document.querySelector('#sequence-title')?.textContent || '';
        sequenceButton?.click();
        journeyButton?.click();
        return {
          title: document.title,
          slides: document.querySelectorAll('.slide').length,
          activeSlides: document.querySelectorAll('.slide.active').length,
          mode: document.body.dataset.mode || '',
          widthOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          heightOverflow: document.documentElement.scrollHeight > document.documentElement.clientHeight,
          sequenceChanged: beforeSequence !== (document.querySelector('#sequence-title')?.textContent || ''),
          journeyActive: document.querySelectorAll('[data-journey].active').length,
          interactiveButtons: document.querySelectorAll('button').length,
          activeTitle: active?.dataset.title || ''
        };
      })()
    `);

    const ok = result.slides === 11
      && result.activeSlides === 1
      && result.mode
      && !result.widthOverflow
      && !result.heightOverflow
      && result.sequenceChanged
      && result.journeyActive === 2
      && result.interactiveButtons >= 18;

    if (!ok) failures.push(`${session.file}: ${JSON.stringify(result)}`);
    results.push({ courseId, sessionId: session.id, ok, ...result });
  }

  const summary = {
    ok: failures.length === 0,
    checked: results.length,
    courses: new Set(results.map((result) => result.courseId)).size,
    failures,
  };

  console.log(JSON.stringify(summary, null, 2));
  app.exit(summary.ok ? 0 : 1);
}).catch((error) => {
  console.error(error);
  app.exit(1);
});
