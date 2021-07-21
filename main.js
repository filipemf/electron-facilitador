const {app, BrowserWindow, Menu, dialog, ipcMain} = require('electron')


var mainWindow = null;
async function createWindow(){
    mainWindow = new BrowserWindow({
        //fullscreen: true,
        //frame: false,
        width:1924,
        height: 1024,
        webPreferences:{
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false 
        }
    })
    mainWindow.removeMenu()
    mainWindow.maximize()
    await mainWindow.loadFile('src/pages/dashboard/index.html')

    mainWindow.webContents.openDevTools()

    ipcMain.on('update-content', function(event, data){
        console.log(data)
    })
}

    
//Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);


app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length===0){
        createWindow();
    }
})