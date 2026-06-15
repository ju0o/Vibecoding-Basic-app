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
const playerScreenshotPath = path.join(path.dirname(screenshotPath), 'app-player-session5.png');
const practicalScreenshotPath = path.join(path.dirname(screenshotPath), 'app-player-practical.png');
const advancedScreenshotPath = path.join(path.dirname(screenshotPath), 'app-player-advanced.png');

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

    const catalog = await win.webContents.executeJavaScript(`
      (() => ({
        title: document.querySelector('#view-catalog .view-title')?.textContent || '',
        courses: document.querySelectorAll('#nav-courses .nav-item').length,
        catalogCards: document.querySelectorAll('#catalog-grid .catalog-card').length,
        courseCount: document.querySelector('#catalog-course-count')?.textContent || '',
        lessonCount: document.querySelector('#catalog-lesson-count')?.textContent || '',
        activeCount: document.querySelector('#catalog-active-count')?.textContent || '',
        plannedSessionButtons: document.querySelectorAll('.btn-card-open[disabled]').length,
        studentLibraryButton: Boolean(document.querySelector('[data-nav="student-materials"]')),
        instructorLibraryButton: Boolean(document.querySelector('[data-nav="instructor-library"]')),
        plannerButton: Boolean(document.querySelector('[data-nav="planner"]')),
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
      document.querySelector('[data-nav="student-materials"]').click()
    `);
    await new Promise((resolve) => setTimeout(resolve, 250));
    const studentLibrary = await win.webContents.executeJavaScript(`
      (() => ({
        title: document.querySelector('#appendix-title')?.textContent || '',
        cards: document.querySelectorAll('#appendix-grid .session-card').length,
        generatedWorkbooks: [...document.querySelectorAll('#appendix-grid .card-title')]
          .filter((node) => node.textContent.includes('수강생 워크북')).length
      }))()
    `);

    await win.webContents.executeJavaScript(`
      document.querySelector('[data-nav="planner"]').click()
    `);
    await new Promise((resolve) => setTimeout(resolve, 200));
    const planner = await win.webContents.executeJavaScript(`
      (() => ({
        activeView: document.querySelector('.view:not(.hidden)')?.id || '',
        scheduleRows: document.querySelectorAll('#schedule-list .schedule-row').length,
        noteReady: Boolean(document.querySelector('#program-note'))
      }))()
    `);

    await win.webContents.executeJavaScript(`
      document.querySelector('[data-course-id="basic"]').click();
      document.querySelector('[data-session-id="basic-05"]').click();
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

    async function inspectTrack(courseId, sessionId, screenshotTarget) {
      await win.webContents.executeJavaScript(`
        document.querySelector('[data-course-id="${courseId}"]').click();
        document.querySelector('[data-session-id="${sessionId}"]').click();
      `);
      await new Promise((resolve) => setTimeout(resolve, 900));

      const result = await win.webContents.executeJavaScript(`
        (async () => {
          const webview = document.querySelector('#lecture-webview');
          const inner = await webview.executeJavaScript(\`
            ({
              slides: document.querySelectorAll('.slide').length,
              activeSlides: document.querySelectorAll('.slide.active').length,
              title: document.title,
              hasInteractiveControls: document.querySelectorAll('button').length > 4
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

      const image = await win.webContents.capturePage();
      fs.writeFileSync(screenshotTarget, image.toPNG());
      return result;
    }

    const practicalPlayer = await inspectTrack('practical', 'practical-01', practicalScreenshotPath);
    const advancedPlayer = await inspectTrack('advanced', 'advanced-03', advancedScreenshotPath);

    const ok = catalog.title.includes('바이브코딩 교육 프로그램')
      && catalog.courses >= 13
      && catalog.catalogCards >= 13
      && catalog.courseCount === '13'
      && Number(catalog.lessonCount) >= 70
      && catalog.activeCount === '13'
      && catalog.plannedSessionButtons === 0
      && catalog.studentLibraryButton
      && catalog.instructorLibraryButton
      && catalog.plannerButton
      && !catalog.viewportOverflow
      && catalog.activeView === 'view-catalog'
      && instructorLibrary.title === '강사 자료실'
      && instructorLibrary.cards > 0
      && instructorLibrary.hasRoadmap
      && studentLibrary.title === '수강생 자료'
      && studentLibrary.cards > 0
      && studentLibrary.generatedWorkbooks >= 12
      && planner.activeView === 'view-planner'
      && planner.scheduleRows >= 13
      && planner.noteReady
      && player.activeView === 'view-player'
      && player.sessionTitle.includes('5강')
      && player.loadingHidden
      && player.inner.slides === 17
      && player.inner.activeSlides === 1
      && practicalPlayer.activeView === 'view-player'
      && practicalPlayer.sessionTitle.includes('팔릴 이유')
      && practicalPlayer.loadingHidden
      && practicalPlayer.inner.slides === 11
      && practicalPlayer.inner.activeSlides === 1
      && practicalPlayer.inner.hasInteractiveControls
      && advancedPlayer.activeView === 'view-player'
      && advancedPlayer.sessionTitle.includes('Agent 설계')
      && advancedPlayer.loadingHidden
      && advancedPlayer.inner.slides === 11
      && advancedPlayer.inner.activeSlides === 1
      && advancedPlayer.inner.hasInteractiveControls
      && errors.length === 0;

    const report = {
      ok,
      catalog,
      instructorLibrary,
      studentLibrary,
      planner,
      player,
      practicalPlayer,
      advancedPlayer,
      errors,
      screenshotPath,
      playerScreenshotPath,
      practicalScreenshotPath,
      advancedScreenshotPath,
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
