'use strict';

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'src', 'content', 'v3', 'course-data.js');
const deckPath = path.join(root, 'src', 'content', 'v3', 'deck.html');
const outputDir = path.join(root, 'src', 'content', 'assets', 'v3', 'fallbacks');
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function courses() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(dataPath, 'utf-8'), context);
  return context.window.VIBE_V3_COURSES;
}

app.whenReady().then(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const win = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    backgroundColor: '#09100e',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: false },
  });
  const failures = [];
  let captured = 0;

  for (const [courseId, course] of Object.entries(courses())) {
    for (const [index, lesson] of course.sessions.entries()) {
      await win.loadFile(deckPath, {
        query: { course: courseId, lesson: String(index + 1), slide: '5', motion: 'low' },
      });
      await wait(45);
      await win.webContents.executeJavaScript(`
        document.querySelector('#live-start')?.click();
        for (let index = 1; index < ${lesson.demo.stages.length}; index += 1) {
          document.querySelector('#live-next')?.click();
        }
      `);
      await wait(30);
      const image = await win.webContents.capturePage();
      const png = image.toPNG();
      const filename = `${courseId}-${String(index + 1).padStart(2, '0')}.png`;
      if (png.length < 20000) failures.push(`${filename}: screenshot appears blank (${png.length} bytes)`);
      fs.writeFileSync(path.join(outputDir, filename), png);
      captured += 1;
    }
  }

  console.log(JSON.stringify({ ok: failures.length === 0, captured, failures }, null, 2));
  app.exit(failures.length ? 1 : 0);
}).catch((error) => {
  console.error(error);
  app.exit(1);
});
