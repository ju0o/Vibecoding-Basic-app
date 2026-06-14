'use strict';

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const target = path.resolve(process.argv[2]);
const screenshotPath = process.env.SMOKE_SCREENSHOT
  ? path.resolve(process.env.SMOKE_SCREENSHOT)
  : null;
const selector = process.env.SMOKE_SELECTOR || null;
const printMedia = process.env.SMOKE_PRINT_MEDIA === '1';
const width = Number(process.env.SMOKE_WIDTH || 1440);
const height = Number(process.env.SMOKE_HEIGHT || 900);

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width,
    height,
    backgroundColor: '#050b10',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  try {
    await win.loadFile(target);
    win.showInactive();
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (printMedia) {
      win.webContents.debugger.attach('1.3');
      await win.webContents.debugger.sendCommand('Emulation.setEmulatedMedia', { media: 'print' });
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    if (selector) {
      await win.webContents.executeJavaScript(`
        document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: 'start' });
      `);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    const result = await win.webContents.executeJavaScript(`
      (() => {
        const focusButton = document.querySelector('[data-script-action="focus"]');
        focusButton?.click();
        const focusModeEnabled = document.body.classList.contains('memorize-mode');
        focusButton?.click();
        const focusModeRestored = !document.body.classList.contains('memorize-mode');

        const editor = document.querySelector('.personal-note-editor');
        const noteKey = 'vibe-session3-script:note:1';
        const previousNote = localStorage.getItem(noteKey);
        if (editor) {
          editor.textContent = 'QA 저장 확인';
          editor.dispatchEvent(new Event('input', { bubbles: true }));
        }
        const noteSaved = localStorage.getItem(noteKey) === 'QA 저장 확인';
        if (previousNote == null) localStorage.removeItem(noteKey);
        else localStorage.setItem(noteKey, previousNote);
        if (editor) editor.textContent = previousNote || '';

        return {
          title: document.title,
          cards: document.querySelectorAll('[data-script-slide]').length,
          checkboxes: document.querySelectorAll('[data-memorized]').length,
          noteEditors: document.querySelectorAll('.personal-note-editor').length,
          toolbarVisible: Boolean(document.querySelector('.script-toolbar')),
          focusModeEnabled,
          focusModeRestored,
          noteSaved,
          printMedia: ${printMedia},
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
          viewport: { width: innerWidth, height: innerHeight }
        };
      })()
    `);

    if (screenshotPath) {
      fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
      const image = await win.webContents.capturePage();
      fs.writeFileSync(screenshotPath, image.toPNG());
    }

    const ok = result.cards === 16
      && result.checkboxes === 16
      && result.noteEditors === 16
      && result.toolbarVisible
      && result.focusModeEnabled
      && result.focusModeRestored
      && result.noteSaved
      && !result.horizontalOverflow;

    console.log(JSON.stringify({ ok, result }, null, 2));
    if (win.webContents.debugger.isAttached()) win.webContents.debugger.detach();
    app.exit(ok ? 0 : 1);
  } catch (error) {
    console.error(error);
    app.exit(1);
  }
});
