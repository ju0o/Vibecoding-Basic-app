'use strict';

const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/content/course-manifest.json'), 'utf-8'));
const outputDir = path.join(root, 'output', 'pdf', 'v3-qa');
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const targets = manifest.courses
  .flatMap((course) => ['student', 'instructor'].flatMap((audience) =>
    (course.materials?.[audience] || [])
      .filter((material) => material.file.startsWith('v3/material.html'))
      .map((material) => ({ course, material, audience }))
  ));

app.whenReady().then(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const win = new BrowserWindow({
    show: false,
    width: 1200,
    height: 900,
    backgroundColor: '#ffffff',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: false },
  });
  const failures = [];
  const results = [];

  for (const { course, material, audience } of targets) {
    const [relativeFile, query = ''] = material.file.split('?');
    await win.loadFile(path.join(root, 'src', 'content', relativeFile), {
      query: Object.fromEntries(new URLSearchParams(query)),
    });
    await wait(40);
    const layout = await win.webContents.executeJavaScript(`({
      sheets: document.querySelectorAll('.sheet').length,
      widthOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      lightPaper: getComputedStyle(document.querySelector('.sheet')).backgroundColor
    })`);
    const buffer = await win.webContents.printToPDF({
      printBackground: true,
      pageSize: 'A4',
      landscape: false,
      preferCSSPageSize: true,
      margins: { marginType: 'none' },
    });
    const filename = `${course.id}-${audience}-${material.id.replace(`${course.id}-`, '')}.pdf`;
    fs.writeFileSync(path.join(outputDir, filename), buffer);
    const pages = (buffer.toString('latin1').match(/\/Type\s*\/Page\b/g) || []).length;
    const ok = layout.sheets > 0
      && !layout.widthOverflow
      && /rgb\(255,\s*255,\s*255\)/.test(layout.lightPaper)
      && buffer.subarray(0, 4).toString() === '%PDF'
      && pages === layout.sheets;
    if (!ok) failures.push(`${filename}: ${JSON.stringify({ layout, pages })}`);
    results.push({ filename, pages, sheets: layout.sheets, ok });
  }

  const report = { ok: failures.length === 0, checked: results.length, failures, results };
  fs.writeFileSync(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2), 'utf-8');
  console.log(JSON.stringify({ ok: report.ok, checked: report.checked, failures }, null, 2));
  app.exit(report.ok ? 0 : 1);
}).catch((error) => {
  console.error(error);
  app.exit(1);
});
