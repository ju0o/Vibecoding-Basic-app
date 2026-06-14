'use strict';

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'src', 'content', 'appendix', 'script-session3.html');
const output = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, 'release', '3강-강사용-상세대본.pdf');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width: 1280,
    height: 900,
    backgroundColor: '#ffffff',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  try {
    await win.loadFile(source);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const pdf = await win.webContents.printToPDF({
      pageSize: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margins: {
        top: 0.45,
        bottom: 0.45,
        left: 0.45,
        right: 0.45,
      },
    });
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, pdf);
    console.log(output);
    app.exit(0);
  } catch (error) {
    console.error(error);
    app.exit(1);
  }
});
