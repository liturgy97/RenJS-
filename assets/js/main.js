const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: true,
    fullscreen: true,
    icon: path.join(__dirname, "..", "svg", "icons", "big.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "..", "..", "index.html"));

  mainWindow.setMenu(null);
  ipcMain.on("toggle-fullscreen", () => {
    const isFullScreen = !mainWindow.isFullScreen();
    mainWindow.setFullScreen(isFullScreen);

    mainWindow.webContents.send("fullscreen-status", isFullScreen);
  });

  ipcMain.handle("get-fullscreen-status", () => {
    return mainWindow.isFullScreen();
  });

  ipcMain.handle("open-url", async (event, url) => {
    if (url) {
      await shell.openExternal(url);
    }
  });

  // mainWindow.webContents.once("did-finish-load", () => {
  //   mainWindow.webContents.openDevTools();
  // });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
