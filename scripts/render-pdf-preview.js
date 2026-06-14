'use strict';

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const pdfPath = path.resolve(process.argv[2]);
const outputPath = path.resolve(process.argv[3]);
const page = Number(process.argv[4] || 1);

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width: 1120,
    height: 920,
    backgroundColor: '#d5d7da',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      plugins: true,
    },
  });

  try {
    await win.loadURL(`${pathToFileURL(pdfPath).href}#page=${page}&zoom=page-width`);
    win.showInactive();
    // Chromium's PDF viewer can need an extra moment to paint the first page.
    await new Promise((resolve) => setTimeout(resolve, 3500));
    const image = await win.webContents.capturePage();
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, image.toPNG());
    console.log(outputPath);
    app.exit(0);
  } catch (error) {
    console.error(error);
    app.exit(1);
  }
});
