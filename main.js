const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // __dirname字符串指向当前正在执行的脚本的路径
            // path.join API 将多个路径联结在一起，创建一个跨平台的路径字符串
            preload: path.join(__dirname, 'preload.js') 
        }
    })

    win.loadURL('https://www.baidu.com')
}

// 在应用准备就绪时调用函数
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    // 监听模组的 activate 事件, 如果没有窗口打开则打开一个窗口 (macOS)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    // 通过检查 Node.js 的 process.platform 变量，您可以针对特定平台运行特定代码。 请注意，Electron 目前只支持三个平台：win32 (Windows), linux (Linux) 和 darwin (macOS)
    if (process.platform !== 'darwin') {
        // 监听 app 模块的 window-all-closed 事件，并调用 app.quit() 来退出您的应用程序。此方法不适用于 macOS
        app.quit()
    }
})