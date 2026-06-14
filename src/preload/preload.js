'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('vibeCodingApp', {
  // 강의 매니페스트 읽기
  readManifest: () => ipcRenderer.invoke('read-manifest'),

  // 커뮤니티에 공유 가능한 별첨자료 목록 읽기
  readShareResources: () => ipcRenderer.invoke('read-community-share-resources'),

  // content 폴더의 file:// 기반 URL 반환
  getContentBase: () => ipcRenderer.invoke('get-content-base'),

  // 전체화면 토글 (true/false 반환)
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),

  // 현재 전체화면 상태 확인
  getFullscreen: () => ipcRenderer.invoke('get-fullscreen'),

  // 현재 강의/별첨을 PDF 파일로 저장
  savePdf: (data, defaultPath) => ipcRenderer.invoke('save-pdf', data, defaultPath),

  // 외부 브라우저에서 안전한 http/https URL 열기
  openExternal: (url) => ipcRenderer.invoke('open-external', url),

  // 사용자 데이터 저장/불러오기 (app userData 폴더)
  saveData: (key, value) => ipcRenderer.invoke('save-user-data', key, value),
  loadData: (key) => ipcRenderer.invoke('load-user-data', key),

  // 개발/패키징 여부
  isDev: () => ipcRenderer.invoke('is-dev'),

  // 메인 프로세스 → 렌더러 이벤트 구독
  onShortcut: (callback) => {
    ipcRenderer.on('shortcut', (_event, key) => callback(key));
  },
  onFullscreenChanged: (callback) => {
    ipcRenderer.on('fullscreen-changed', (_event, isFS) => callback(isFS));
  }
});
