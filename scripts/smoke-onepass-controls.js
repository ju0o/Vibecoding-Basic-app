'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');

const root = path.join(__dirname, '..');
const files = [
  'onepass-week1.html',
  'onepass-week2.html',
  'onepass-week3.html',
  'onepass-week4.html',
];

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

app.whenReady().then(async () => {
  const window = new BrowserWindow({
    show: false,
    width: 1366,
    height: 768,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: false },
  });
  const failures = [];

  for (const file of files) {
    await window.loadFile(path.join(root, 'src', 'content', 'sessions', file));
    await wait(80);
    const result = await window.webContents.executeJavaScript(`
      (() => {
        const scene = document.querySelector('.op-seq');
        if (!scene) return { ok: false, reason: 'manual scene missing' };
        const next = scene.querySelector('[data-seq-action="next"]');
        const pause = scene.querySelector('[data-seq-action="pause"]');
        const reset = scene.querySelector('[data-seq-action="reset"]');
        next.click();
        const afterNext = scene.dataset.seqCurrent;
        pause.click();
        next.click();
        const afterPause = scene.dataset.seqCurrent;
        pause.click();
        next.click();
        const afterResume = scene.dataset.seqCurrent;
        reset.click();
        return {
          ok: afterNext === '1' && afterPause === '1' && afterResume === '2'
            && scene.dataset.seqCurrent === '0' && scene.dataset.seqPaused === 'false',
          afterNext, afterPause, afterResume,
          resetIndex: scene.dataset.seqCurrent,
          resetPaused: scene.dataset.seqPaused,
        };
      })()
    `);
    if (!result.ok) failures.push({ file, result });

    if (file === 'onepass-week1.html') {
      const sourceSimulations = await window.webContents.executeJavaScript(`
        (() => {
          const nodes = [...document.querySelectorAll('[data-sim]')];
          return {
            expected: nodes.length,
            mounted: nodes.filter((node) => node.dataset.simMounted === 'true').length,
            missing: nodes.filter((node) => node.dataset.simMounted !== 'true').map((node) => node.dataset.sim),
          };
        })()
      `);
      if (sourceSimulations.expected < 2 || sourceSimulations.mounted !== sourceSimulations.expected) {
        failures.push({ file, sourceSimulations });
      }

      const sourceMotion = await window.webContents.executeJavaScript(`
        (() => {
          const building = document.querySelector('#building-lab');
          const buildingStep = document.querySelector('[data-building-stage="3"]');
          const ux = document.querySelector('#ux-race');
          const runUx = document.querySelector('[data-action="run-ux"]');
          const api = document.querySelector('#api-stage');
          const apiStep = document.querySelector('[data-api-step="4"]');
          if (!building || !buildingStep || !ux || !runUx || !api || !apiStep) return { ok: false, reason: 'source scene controls missing' };
          buildingStep.click();
          const buildingState = building.dataset.stage;
          runUx.click();
          const uxRunning = ux.classList.contains('running');
          apiStep.click();
          const apiState = api.dataset.step;
          return { ok: buildingState === '3' && uxRunning && apiState === '4', buildingState, uxRunning, apiState };
        })()
      `);
      if (!sourceMotion.ok) failures.push({ file, sourceMotion });

      const restoredSourceScenes = await window.webContents.executeJavaScript(`
        (() => {
          const labCode = document.querySelector('.src-s4 #lab-code');
          const labButton = document.querySelector('.src-s4 [data-lab-file="button"]');
          const labTab = document.querySelector('.src-s4 #lab-tab');
          const diffCode = document.querySelector('.src-s4 #diff-code');
          const gitPush = document.querySelector('.src-s5 [data-git-command="push"]');
          const gitStatus = document.querySelector('.src-s5 #git-command-status');
          const devtoolsNext = document.querySelector('.src-s5 #devtools-next');
          const devtoolsStep = document.querySelector('.src-s5 #devtools-step');
          const envNext = document.querySelector('.src-s5 #env-next');
          const envScene = document.querySelector('.src-s5 .environment-documentary');
          const firebase = document.querySelector('.src-s5 [data-platform="firebase"]');
          const platform = document.querySelector('.src-s5 .platform-console');
          if (!labCode || !labButton || !labTab || !diffCode || !gitPush || !gitStatus || !devtoolsNext || !devtoolsStep || !envNext || !envScene || !firebase || !platform) {
            return { ok: false, reason: 'restored session 4 or 5 control missing' };
          }
          const initialLab = labCode.textContent.includes('export default function');
          const initialDiff = diffCode.textContent.includes('ReserveButton');
          labButton.click();
          const changedLab = labTab.textContent.includes('Button.tsx') && labCode.textContent.includes('ReserveButton');
          gitPush.click();
          const changedGit = gitStatus.textContent === 'GITHUB SYNCED';
          devtoolsNext.click();
          const changedDevtools = devtoolsStep.textContent.includes('STEP 2');
          envNext.click();
          const changedEnv = envScene.dataset.envState === '1';
          firebase.click();
          const changedPlatform = platform.dataset.platformMode === 'firebase';
          return { ok: initialLab && initialDiff && changedLab && changedGit && changedDevtools && changedEnv && changedPlatform, initialLab, initialDiff, changedLab, changedGit, changedDevtools, changedEnv, changedPlatform };
        })()
      `);
      if (!restoredSourceScenes.ok) failures.push({ file, restoredSourceScenes });
    }
  }

  console.log(JSON.stringify({ ok: failures.length === 0, checked: files.length, failures }, null, 2));
  app.exit(failures.length === 0 ? 0 : 1);
}).catch((error) => {
  console.error(error);
  app.exit(1);
});
