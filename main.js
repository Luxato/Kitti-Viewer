'use strict';

const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;

require('electron-reload')(__dirname);

/*const remote = electron.remote;
const app = */

let mainWindow;
let addWindow;

/* *************************** EVENT HANDLERS *************************** */

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800
    });
    mainWindow.loadURL('file://C:\\wamp64\\www\\kittiviewer\\index.html'); // Pass the document you want to execute. Can be a real URL a local or html document.
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Command+Q'; // Keyshortcut for OSQ.
                    } else {
                        return 'Ctrl+Q'; // Keyshortcut for Windows.
                    }
                })(), // Command key just for OSX
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform === 'darwin') { // on OSX menu works differently, thus this step is necessary.
    menuTemplate.unshift({});
}
console.log('Current dev env is');
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') { // Open developer tools when I am not on production.
    // 'production'
    // 'development'
    // 'staging'
    // 'test'
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                label: 'Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) { // focusedWindow is a reference to the window which is currently highlighted and change will be applied only there.
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}


ipcMain.on('video:submit', (event, message) => { // message will come as JSON string

    // message is the varriable I receive from index.html
    /*console.log('I am executing video:submit event and message is: ' + message);
    console.log(message);*/

    // Now I will process the variable and send back response to the main window.
    mainWindow.webContents.send('video:metadata', 'some value');
});


function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Choose directory with data'
    });
    addWindow.loadURL('file://C:\\wamp64\\www\\Electron-learning-project\\add.html');
    addWindow.on('closed', () => addWindow = null); // Free memory - garbage collector.
}
