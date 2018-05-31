const electron = require('electron');
const { exec } = require('child_process');
const net = require('net');
const path = require('path');
const url = require('url');

const {
  app, BrowserWindow, dialog, ipcMain,
} = electron;
const port = 3333;
process.env.ELECTRON_START_URL = `http://localhost:${port}`;
const client = new net.Socket();
const child = exec('npm start', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
  console.log(stderr);
});

child.stdout.on('data', (data) => {
  console.log(data);
});

child.stderr.on('data', (error) => {
  console.log(error);
});
let startedElectron = false;
let mainWindow;

// const tryConnection = () => client.connect({ port }, () => {
//   client.end();
//   if (!startedElectron) {
//     startedElectron = true;
//     exec('npm run electron');
//   }
// });
//
// tryConnection();

// client.on('error', (error) => {
//   setTimeout(tryConnection, 1000);
// });

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
  console.log('POOP');
  exec('kill $(lsof -t -i:3333)');
  if (process.platform === 'darwin') {
    app.quit();
  }
  app.quit();
});

app.on('quit', () => {
  exec('kill $(lsof -t -i:3333)');
  console.log('paPOOP');
  app.quit();
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
