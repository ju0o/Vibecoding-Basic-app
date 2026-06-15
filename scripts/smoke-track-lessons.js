'use strict';

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/content/course-manifest.json'), 'utf-8'));
const manifestSessions = manifest.courses
  .filter((course) => course.id !== 'basic-current')
  .flatMap((course) => course.sessions.map((session) => ({ courseId: course.id, session })));
const current = manifest.courses.find((course) => course.id === 'basic-current');
const currentWorkSessions = current.sessions.map((session, index) => ({
  courseId: 'basic-current-work',
  session: {
    ...session,
    id: `${session.id}-v3-work`,
    file: session.revisions.find((revision) => revision.id === 'v3-work').file,
  },
  index,
}));
const sessions = [...manifestSessions, ...currentWorkSessions];
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    backgroundColor: '#0d0e10',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: false },
  });

  const failures = [];
  const results = [];
  let currentFile = '';
  win.webContents.on('console-message', (_event, level, message) => {
    if (/Electron Security Warning/i.test(message)) return;
    if (level >= 2 || /uncaught|failed|error/i.test(message)) failures.push(`${currentFile}: ${message}`);
  });

  for (const { courseId, session } of sessions) {
    currentFile = session.file;
    const [relativeFile, query = ''] = session.file.split('?');
    const target = path.join(root, 'src', 'content', relativeFile);
    await win.loadFile(target, { query: Object.fromEntries(new URLSearchParams(query)) });
    await wait(45);

    const result = await win.webContents.executeJavaScript(`
      (() => {
        const before = document.querySelector('#live-state')?.textContent || '';
        document.querySelector('#live-start')?.click();
        const afterStart = document.querySelector('#live-state')?.textContent || '';
        document.querySelector('#live-next')?.click();
        const afterNext = document.querySelector('#live-state')?.textContent || '';
        document.querySelector('#live-reset')?.click();
        const afterReset = document.querySelector('#live-state')?.textContent || '';
        return {
          title: document.title,
          slides: document.querySelectorAll('.slide').length,
          activeSlides: document.querySelectorAll('.slide.active').length,
          mode: document.body.dataset.mode || '',
          widthOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          heightOverflow: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1,
          manualControls: ['live-start','live-prev','live-next','live-pause','live-reset'].every((id) => Boolean(document.getElementById(id))),
          stageAdvanced: before !== afterStart && afterStart !== afterNext && afterReset.includes('READY'),
          buttons: document.querySelectorAll('button').length
        };
      })()
    `);

    const ok = result.slides === 13
      && result.activeSlides === 1
      && result.mode
      && !result.widthOverflow
      && !result.heightOverflow
      && result.manualControls
      && result.stageAdvanced
      && result.buttons >= 20;
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
