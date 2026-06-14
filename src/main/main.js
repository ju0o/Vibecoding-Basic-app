'use strict';

const { app, BrowserWindow, ipcMain, globalShortcut, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function getOptionalIconPath() {
  const iconPath = path.join(__dirname, '../../build/icon.ico');
  return fs.existsSync(iconPath) ? iconPath : undefined;
}

function createWindow() {
  const icon = getOptionalIconPath();
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: 'VIBE STUDIO · 강의 운영 콘솔',
    ...(icon ? { icon } : {}),
    backgroundColor: '#07081A',
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webviewTag: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('fullscreen-changed', true);
  });
  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('fullscreen-changed', false);
  });
}

function registerShortcuts() {
  globalShortcut.register('CommandOrControl+H', () => {
    if (mainWindow) mainWindow.webContents.send('shortcut', 'home');
  });
  globalShortcut.register('CommandOrControl+F', () => {
    if (mainWindow) {
      const next = !mainWindow.isFullScreen();
      mainWindow.setFullScreen(next);
    }
  });
  globalShortcut.register('Escape', () => {
    if (!mainWindow) return;
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false);
    } else {
      mainWindow.webContents.send('shortcut', 'escape');
    }
  });
}

ipcMain.handle('read-manifest', () => {
  const manifestPath = path.join(__dirname, '../content/course-manifest.json');
  const raw = fs.readFileSync(manifestPath, 'utf-8');
  return JSON.parse(raw);
});

ipcMain.handle('read-community-share-resources', () => {
  const sharePath = path.join(__dirname, '../content/community-share-resources.json');
  if (!fs.existsSync(sharePath)) {
    return { version: 1, resourcesUrl: '', resources: {} };
  }
  const raw = fs.readFileSync(sharePath, 'utf-8');
  return JSON.parse(raw);
});

ipcMain.handle('get-content-base', () => {
  const contentPath = path.join(__dirname, '../content').replace(/\\/g, '/');
  const prefix = /^[a-zA-Z]:/.test(contentPath) ? 'file:///' : 'file://';
  return prefix + contentPath;
});

ipcMain.handle('toggle-fullscreen', () => {
  if (!mainWindow) return false;
  const next = !mainWindow.isFullScreen();
  mainWindow.setFullScreen(next);
  return next;
});

ipcMain.handle('get-fullscreen', () => {
  return mainWindow ? mainWindow.isFullScreen() : false;
});

ipcMain.handle('save-pdf', async (_event, data, defaultPath) => {
  if (!mainWindow) return { ok: false, canceled: true };

  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'PDF로 저장',
    defaultPath,
    filters: [{ name: 'PDF', extensions: ['pdf'] }],
  });

  if (result.canceled || !result.filePath) {
    return { ok: false, canceled: true };
  }

  fs.writeFileSync(result.filePath, Buffer.from(data));
  return { ok: true, filePath: result.filePath };
});

ipcMain.handle('open-external', async (_event, targetUrl) => {
  try {
    const parsed = new URL(targetUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { ok: false, message: '지원하지 않는 주소 형식입니다.' };
    }
    await shell.openExternal(parsed.toString());
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err.message };
  }
});

ipcMain.handle('save-user-data', (_event, key, value) => {
  try {
    const dataPath = path.join(app.getPath('userData'), 'vbc-state.json');
    let data = {};
    if (fs.existsSync(dataPath)) {
      data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }
    data[key] = value;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch { return false; }
});

ipcMain.handle('is-dev', () => !app.isPackaged);

ipcMain.handle('load-user-data', (_event, key) => {
  try {
    const dataPath = path.join(app.getPath('userData'), 'vbc-state.json');
    if (!fs.existsSync(dataPath)) return null;
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return key in data ? data[key] : null;
  } catch { return null; }
});

app.whenReady().then(() => {
  createWindow();
  registerShortcuts();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
