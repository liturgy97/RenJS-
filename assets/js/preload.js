const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  toggleFullscreen: () => ipcRenderer.send("toggle-fullscreen"),

  getFullscreenStatus: () => ipcRenderer.invoke("get-fullscreen-status"),

  onFullscreenStatusChanged: (callback) =>
    ipcRenderer.on("fullscreen-status", (event, status) => callback(status)),

  openInNewTab: (url) => ipcRenderer.invoke("open-url", url),
});
