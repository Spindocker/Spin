const electron = require('electron');

const {
  app, BrowserWindow, dialog, ipcMain,
} = electron;
const port = 3333;
process.env.ELECTRON_START_URL = `http://localhost:${port}`;
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    minWidth: 850,
    minHeight: 600,
  });
  mainWindow.loadURL(process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, './public/index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('item:add', (e) => {
  const filePath = dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  e.returnValue = false;
  if (filePath !== undefined) mainWindow.webContents.send('item:add', filePath[0]);
});
