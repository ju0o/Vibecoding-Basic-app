'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const screenshotPath = process.env.SMOKE_SCREENSHOT
  ? path.resolve(process.env.SMOKE_SCREENSHOT)
  : path.join(root, 'artifacts', 'qa', 'app-dashboard.png');
const reportPath = process.env.SMOKE_REPORT
  ? path.resolve(process.env.SMOKE_REPORT)
  : path.join(root, 'artifacts', 'qa', 'app-dashboard.json');
const playerScreenshotPath = path.join(path.dirname(screenshotPath), 'app-player-session4.png');

ipcMain.handle('read-manifest', () => {
  return JSON.parse(fs.readFileSync(path.join(root, 'src/content/course-manifest.json'), 'utf-8'));
});

ipcMain.handle('read-community-share-resources', () => {
  const target = path.join(root, 'src/content/community-share-resources.json');
  return fs.existsSync(target)
    ? JSON.parse(fs.readFileSync(target, 'utf-8'))
    : { version: 1, resourcesUrl: '', resources: {} };
});

ipcMain.handle('get-content-base', () => {
  return `file:///${path.join(root, 'src/content').replace(/\\/g, '/')}`;
});

ipcMain.handle('get-fullscreen', () => false);
ipcMain.handle('is-dev', () => true);
ipcMain.handle('load-user-data', () => null);
ipcMain.handle('save-user-data', () => true);

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width: Number(process.env.SMOKE_WIDTH || 1440),
    height: Number(process.env.SMOKE_HEIGHT || 900),
    backgroundColor: '#10110f',
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
    if (level >= 2 || /error|failed|uncaught/i.test(message)) errors.push(message);
  });

  try {
    await win.loadFile(path.join(root, 'src/renderer/index.html'));
    await new Promise((resolve) => setTimeout(resolve, 1300));
    win.showInactive();
    await new Promise((resolve) => setTimeout(resolve, 250));

    const dashboard = await win.webContents.executeJavaScript(`
      (() => ({
        title: document.querySelector('#course-title')?.textContent || '',
        courses: document.querySelectorAll('#nav-courses .nav-item').length,
        sessionCards: document.querySelectorAll('#session-grid .session-card').length,
        studentLibraryButton: Boolean(document.querySelector('[data-nav="student-materials"]')),
        instructorLibraryButton: Boolean(document.querySelector('[data-nav="instructor-library"]')),
        viewportOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        activeView: document.querySelector('.view:not(.hidden)')?.id || ''
      }))()
    `);

    const image = await win.webContents.capturePage();
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    fs.writeFileSync(screenshotPath, image.toPNG());

    await win.webContents.executeJavaScript(`
      document.querySelector('[data-nav="instructor-library"]').click()
    `);
    await new Promise((resolve) => setTimeout(resolve, 250));

    const instructorLibrary = await win.webContents.executeJavaScript(`
      (() => ({
        title: document.querySelector('#appendix-title')?.textContent || '',
        cards: document.querySelectorAll('#appendix-grid .session-card').length,
        hasRoadmap: [...document.querySelectorAll('#appendix-grid .card-title')]
          .some((node) => node.textContent.includes('후속 과정 설계'))
      }))()
    `);

    await win.webContents.executeJavaScript(`
      document.querySelector('[data-course-id="basic"]').click();
      document.querySelector('[data-session-id="basic-04"]').click();
    `);
    await new Promise((resolve) => setTimeout(resolve, 1600));

    const player = await win.webContents.executeJavaScript(`
      (async () => {
        const webview = document.querySelector('#lecture-webview');
        const inner = await webview.executeJavaScript(\`
          ({
            slides: document.querySelectorAll('.slide').length,
            activeSlides: document.querySelectorAll('.slide.active').length,
            title: document.title
          })
        \`);
        return {
          activeView: document.querySelector('.view:not(.hidden)')?.id || '',
          sessionTitle: document.querySelector('#player-session-title')?.textContent || '',
          loadingHidden: document.querySelector('#webview-loading')?.classList.contains('hidden') || false,
          inner
        };
      })()
    `);

    await new Promise((resolve) => setTimeout(resolve, 300));
    const playerImage = await win.webContents.capturePage();
    fs.writeFileSync(playerScreenshotPath, playerImage.toPNG());

    const ok = dashboard.title === '바이브코딩 기초반'
      && dashboard.courses >= 3
      && dashboard.sessionCards === 6
      && dashboard.studentLibraryButton
      && dashboard.instructorLibraryButton
      && !dashboard.viewportOverflow
      && dashboard.activeView === 'view-dashboard'
      && instructorLibrary.title === '강사 자료실'
      && instructorLibrary.cards > 0
      && instructorLibrary.hasRoadmap
      && player.activeView === 'view-player'
      && player.sessionTitle.includes('4강')
      && player.loadingHidden
      && player.inner.slides === 17
      && player.inner.activeSlides === 1
      && errors.length === 0;

    const report = {
      ok,
      dashboard,
      instructorLibrary,
      player,
      errors,
      screenshotPath,
      playerScreenshotPath,
    };
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(JSON.stringify(report, null, 2));
    app.exit(ok ? 0 : 1);
  } catch (error) {
    console.error(error);
    app.exit(1);
  }
});
