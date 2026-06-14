/**
 * start-electron.js
 * ELECTRON_RUN_AS_NODE=1 이 설정된 환경(Claude Code 등)에서도
 * 정상적인 Electron GUI 앱을 실행하기 위한 래퍼 스크립트.
 *
 * 원인: Claude Code는 자체 Node.js 실행을 위해 ELECTRON_RUN_AS_NODE=1 을 설정하는데
 * 이 변수가 Electron을 "Node.js 전용 모드"로 실행시켜 BrowserWindow/ipcMain 등이
 * 비활성화됩니다.
 */

'use strict';

const { spawn } = require('child_process');
const path = require('path');

const electronBin = require('electron');
const appDir = path.join(__dirname, '..');

// ELECTRON_RUN_AS_NODE를 비우고 Electron을 실행
const env = Object.assign({}, process.env);
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electronBin, [appDir], {
  stdio: 'inherit',
  env,
  windowsHide: false,
});

child.on('close', (code, signal) => {
  if (code === null) {
    console.error('Electron exited with signal', signal);
    process.exit(1);
  }
  process.exit(code);
});

process.on('SIGINT',  () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
