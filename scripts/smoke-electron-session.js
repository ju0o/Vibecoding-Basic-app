'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const sessionFile = process.argv[2] || path.join(__dirname, '../src/content/sessions/session-03-direction.html');
const target = path.resolve(sessionFile);
const width = Number(process.env.SMOKE_WIDTH || 1280);
const height = Number(process.env.SMOKE_HEIGHT || 800);
const requestedSlide = process.env.SMOKE_SLIDE || '1';
const requestedBuild = process.env.SMOKE_BUILD || '2';
const reportPath = process.env.SMOKE_REPORT ? path.resolve(process.env.SMOKE_REPORT) : null;
const screenshotPath = process.env.SMOKE_SCREENSHOT ? path.resolve(process.env.SMOKE_SCREENSHOT) : null;
const clickSelector = process.env.SMOKE_CLICK_SELECTOR || '';
const clickCount = Math.max(1, Number(process.env.SMOKE_CLICK_COUNT || 1));
const clickSequence = process.env.SMOKE_CLICK_SEQUENCE
  ? JSON.parse(process.env.SMOKE_CLICK_SEQUENCE)
  : [];
const inspectSelector = process.env.SMOKE_INSPECT_SELECTOR || '';
const overflowTolerance = Math.max(0, Number(process.env.SMOKE_OVERFLOW_TOLERANCE || 6));

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    width,
    height,
    backgroundColor: '#07081A',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  const errors = [];
  win.webContents.on('console-message', (_event, _level, message) => {
    if (/error|failed|blocked|cors/i.test(message)) errors.push(message);
  });
  win.webContents.on('render-process-gone', (_event, details) => {
    errors.push(`render-process-gone: ${details.reason}`);
  });

  try {
    await win.loadFile(target, { query: { slide: requestedSlide, build: requestedBuild } });
    await new Promise((resolve) => setTimeout(resolve, 1800));

    if (clickSelector) {
      await win.webContents.executeJavaScript(`
        (() => {
          const target = document.querySelector(${JSON.stringify(clickSelector)});
          if (!target) throw new Error('Smoke click target not found: ${clickSelector.replace(/'/g, "\\'")}');
          for (let count = 0; count < ${clickCount}; count += 1) target.click();
        })()
      `);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    if (clickSequence.length) {
      await win.webContents.executeJavaScript(`
        (async () => {
          const sequence = ${JSON.stringify(clickSequence)};
          for (const item of sequence) {
            const target = document.querySelector(item.selector);
            if (!target) throw new Error('Smoke click target not found: ' + item.selector);
            const count = Math.max(1, Number(item.count || 1));
            for (let index = 0; index < count; index += 1) {
              target.click();
              await new Promise((resolve) => setTimeout(resolve, Number(item.wait || 180)));
            }
          }
        })()
      `);
      await new Promise((resolve) => setTimeout(resolve, 700));
    }

    if (screenshotPath) {
      win.showInactive();
      await new Promise((resolve) => setTimeout(resolve, 500));
      const initialPage = await win.webContents.capturePage();
      fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
      fs.writeFileSync(screenshotPath, initialPage.toPNG());
    }

    const result = await win.webContents.executeJavaScript(`
      (async () => {
        const slides = [...document.querySelectorAll('.slide')];
        const originalActive = slides.findIndex((slide) => slide.classList.contains('active'));
        const slideOverflow = [];
        const layoutTolerance = ${overflowTolerance};
        const hasDeckNavigator = typeof window.move === 'function';
        let activeIndex = Math.max(0, originalActive);

        for (let index = 0; index < slides.length; index += 1) {
          if (hasDeckNavigator) {
            window.move(index - activeIndex);
            activeIndex = index;
          } else {
            slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === index));
          }
          // BrowserWindow is intentionally hidden in smoke runs. requestAnimationFrame can
          // be throttled there, so use a short real timer before measuring layout.
          await new Promise((resolve) => setTimeout(resolve, 80));
          const slide = slides[index];
          const overBy = Math.max(0, Math.ceil(slide.scrollHeight - slide.clientHeight));
          // Tiny font/layout rounding differences vary between Windows GPU and headless
          // compositing. A 6px ceiling catches real scroll while avoiding false failures.
          if (overBy > layoutTolerance) {
            slideOverflow.push({
              index: index + 1,
              title: slide.dataset.title || '',
              scrollHeight: Math.ceil(slide.scrollHeight),
              clientHeight: Math.ceil(slide.clientHeight),
              overBy
            });
          }
        }

        if (hasDeckNavigator) {
          window.move(Math.max(0, originalActive) - activeIndex);
        } else {
          slides.forEach((slide, index) => slide.classList.toggle('active', index === Math.max(0, originalActive)));
        }
        await new Promise((resolve) => setTimeout(resolve, 700));
        const canvas = document.querySelector('canvas');
        const canvasRect = canvas ? canvas.getBoundingClientRect() : null;

        return {
          readyState: document.readyState,
          slides: slides.length,
          activeSlides: slides.filter((slide) => slide.classList.contains('active')).length,
          viewport: { width: window.innerWidth, height: window.innerHeight },
          slideOverflow,
          canvas: canvasRect ? {
            width: Math.round(canvasRect.width),
            height: Math.round(canvasRect.height),
            left: Math.round(canvasRect.left),
            top: Math.round(canvasRect.top)
          } : null
        };
      })()
    `);

    let canvasPixelCheck = null;
    let inspected = null;
    if (inspectSelector) {
      inspected = await win.webContents.executeJavaScript(`
        (() => [...document.querySelectorAll(${JSON.stringify(inspectSelector)})].map((node) => {
          const rect = node.getBoundingClientRect();
          const styles = getComputedStyle(node);
          return {
            selector: ${JSON.stringify(inspectSelector)},
            tag: node.tagName,
            className: node.className,
            clientHeight: Math.round(node.clientHeight),
            scrollHeight: Math.round(node.scrollHeight),
            rect: { width: Math.round(rect.width), height: Math.round(rect.height), top: Math.round(rect.top) },
            padding: [styles.paddingTop, styles.paddingRight, styles.paddingBottom, styles.paddingLeft],
            zoom: styles.zoom,
            display: styles.display,
          };
        }))()
      `);
    }
    let page = null;
    if (result.canvas && result.canvas.width > 0 && result.canvas.height > 0) {
      page = await win.webContents.capturePage();
      const canvasImage = page.crop({
        x: Math.max(0, result.canvas.left),
        y: Math.max(0, result.canvas.top),
        width: Math.min(result.canvas.width, page.getSize().width - Math.max(0, result.canvas.left)),
        height: Math.min(result.canvas.height, page.getSize().height - Math.max(0, result.canvas.top)),
      });
      const bitmap = canvasImage.toBitmap();
      const colors = new Set();
      const pixelCount = canvasImage.getSize().width * canvasImage.getSize().height;
      const stride = Math.max(1, Math.floor(pixelCount / 1500));
      for (let pixel = 0; pixel < pixelCount; pixel += stride) {
        const offset = pixel * 4;
        colors.add(`${bitmap[offset]},${bitmap[offset + 1]},${bitmap[offset + 2]}`);
      }
      canvasPixelCheck = { sampledColors: colors.size, nonblank: colors.size > 12 };
    }

    const ok = result.readyState === 'complete'
      && result.slides > 0
      && result.activeSlides === 1
      && result.slideOverflow.length === 0
      && (!canvasPixelCheck || canvasPixelCheck.nonblank);

    const report = { ok, result, canvasPixelCheck, inspected, errors };
    if (reportPath) fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(JSON.stringify(report, null, 2));
    if (!ok) {
      app.exit(1);
      return;
    }
    app.exit(0);
  } catch (error) {
    console.error(error);
    app.exit(1);
  }
});
