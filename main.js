const {app, BrowserWindow, Menu, dialog, ipcMain} = require('electron')


var mainWindow = null;
async function createWindow(){
    mainWindow = new BrowserWindow({
        width:1324,
        height: 968,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false 
        }
    })
    await mainWindow.loadFile('src/pages/dashboard/index.html')

    mainWindow.webContents.openDevTools()

    ipcMain.on('update-content', function(event, data){
        console.log(data)
    })
}

var file = {}

function createNewFile(){
    file = {
        name: 'novo-arquivo.txt',
        content: '',
        saved: false,
        path: app.getPath('documents')+'/novo-arquivo.txt'
    }
    mainWindow.webContents.send('set-file', file);
}

async function saveFileAs(){
    let dialogFile = await dialog.showSaveDialog({
        defaultPath: file.path
    })

    console.log(dialogFile)
}


const templateMenu = [
    {
        label:"Arquivo",
        submenu:[
            {
                label:'novo',
                click(){
                    createNewFile();
                }
            },
            {
                label: 'salvar',
                click(){
                    saveFileAs();
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(templateMenu);
//Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length===0){
        createWindow();
    }
})