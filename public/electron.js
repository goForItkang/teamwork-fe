const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  console.log("✅ Electron 창 생성됨");

  const win = new BrowserWindow({
    title:"hello world",
    width: 500,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  // macOS에서 앱이 꺼지지 않게
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 모든 창이 닫히면 앱 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
