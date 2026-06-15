'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const qaDir = path.join(root, 'artifacts', 'qa');
const screenshotPath = process.env.SMOKE_SCREENSHOT
  ? path.resolve(process.env.SMOKE_SCREENSHOT)
  : path.join(qaDir, `studio-${process.env.SMOKE_WIDTH || 1280}x${process.env.SMOKE_HEIGHT || 720}.png`);
const reportPath = process.env.SMOKE_REPORT
  ? path.resolve(process.env.SMOKE_REPORT)
  : path.join(qaDir, `studio-${process.env.SMOKE_WIDTH || 1280}x${process.env.SMOKE_HEIGHT || 720}.json`);
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

ipcMain.handle('read-manifest', () => JSON.parse(fs.readFileSync(path.join(root, 'src/content/course-manifest.json'), 'utf-8')));
ipcMain.handle('read-community-share-resources', () => ({ version: 1, resources: {} }));
ipcMain.handle('get-content-base', () => `file:///${path.join(root, 'src/content').replace(/\\/g, '/')}`);
ipcMain.handle('get-fullscreen', () => false);
ipcMain.handle('toggle-fullscreen', () => false);
ipcMain.handle('is-dev', () => true);
ipcMain.handle('load-user-data', () => null);
ipcMain.handle('save-user-data', () => true);

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width: Number(process.env.SMOKE_WIDTH || 1280),
    height: Number(process.env.SMOKE_HEIGHT || 720),
    backgroundColor: '#0d0e10',
    webPreferences: {
      preload: path.join(root, 'src/preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webviewTag: true,
    },
  });
  const errors = [];
  win.webContents.on('console-message', (_event, level, message) => {
    if (/Electron Security Warning/i.test(message)) return;
    if (level >= 2 || /uncaught|failed|error/i.test(message)) errors.push(message);
  });

  try {
    await win.loadFile(path.join(root, 'src/renderer/index.html'));
    await wait(900);

    const student = await win.webContents.executeJavaScript(`
      (() => ({
        courses: document.querySelectorAll('#course-list .course-button').length,
        previewCourses: document.querySelectorAll('#course-list .preview-flag').length,
        panes: ['.course-rail','.lesson-pane','.detail-pane'].every((selector) => Boolean(document.querySelector(selector))),
        cards: document.querySelectorAll('.catalog-card,.session-card').length,
        tabs: document.querySelectorAll('#course-tabs button:not(.hidden)').length,
        selectedTitle: document.querySelector('#course-title')?.textContent || '',
        selectedLessons: document.querySelectorAll('#lesson-list .lesson-row').length,
        overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        overflowY: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1
      }))()
    `);

    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    fs.writeFileSync(screenshotPath, (await win.webContents.capturePage()).toPNG());

    await win.webContents.executeJavaScript(`document.querySelector('#btn-mode').click()`);
    await wait(180);
    const instructor = await win.webContents.executeJavaScript(`
      (() => ({
        courses: document.querySelectorAll('#course-list .course-button').length,
        previewCourses: document.querySelectorAll('#course-list .preview-flag').length,
        instructorTab: !document.querySelector('[data-tab="instructor"]').classList.contains('hidden')
      }))()
    `);

    await win.webContents.executeJavaScript(`
      document.querySelector('[data-course="foundation-next"]').click();
      document.querySelector('[data-tab="student"]').click();
    `);
    await wait(150);
    const materials = await win.webContents.executeJavaScript(`
      (() => ({
        title: document.querySelector('#course-title')?.textContent || '',
        rows: document.querySelectorAll('#lesson-list .material-row').length,
        detail: document.querySelector('#detail-content')?.textContent || ''
      }))()
    `);

    await win.webContents.executeJavaScript(`
      document.querySelector('[data-tab="lessons"]').click();
      document.querySelector('[data-session="foundation-next-01"]').click();
      document.querySelector('#btn-open-lesson').click();
    `);
    await wait(900);
    const player = await win.webContents.executeJavaScript(`
      (async () => {
        const webview = document.querySelector('#lecture-webview');
        const inner = await webview.executeJavaScript(\`({
          slides: document.querySelectorAll('.slide').length,
          activeSlides: document.querySelectorAll('.slide.active').length,
          controls: ['live-start','live-next','live-pause','live-reset'].every((id) => Boolean(document.getElementById(id)))
        })\`);
        return {
          open: !document.querySelector('#player').classList.contains('hidden'),
          loadingHidden: document.querySelector('#player-loading').classList.contains('hidden'),
          title: document.querySelector('#player-title')?.textContent || '',
          inner
        };
      })()
    `);

    await win.webContents.executeJavaScript(`document.querySelector('#btn-player-close').click()`);
    await win.webContents.executeJavaScript(`
      document.dispatchEvent(new KeyboardEvent('keydown', {key:'k', ctrlKey:true, bubbles:true}))
    `);
    await wait(80);
    const command = await win.webContents.executeJavaScript(`
      (() => ({
        open: !document.querySelector('#command-palette').classList.contains('hidden'),
        items: document.querySelectorAll('#command-results .command-item').length
      }))()
    `);

    const ok = student.courses === 5
      && student.previewCourses === 0
      && student.panes
      && student.cards === 0
      && student.tabs === 2
      && student.selectedTitle.includes('2기')
      && student.selectedLessons === 6
      && !student.overflowX
      && !student.overflowY
      && instructor.courses === 6
      && instructor.previewCourses === 1
      && instructor.instructorTab
      && materials.title.includes('다음 기수')
      && materials.rows === 5
      && materials.detail.includes('A4')
      && player.open
      && player.loadingHidden
      && player.inner.slides === 13
      && player.inner.activeSlides === 1
      && player.inner.controls
      && command.open
      && command.items > 20
      && errors.length === 0;

    const report = { ok, student, instructor, materials, player, command, errors, screenshotPath };
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(JSON.stringify(report, null, 2));
    app.exit(ok ? 0 : 1);
  } catch (error) {
    console.error(error);
    app.exit(1);
  }
});
