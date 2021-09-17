import { app, BrowserWindow, ipcMain, shell } from 'electron'
import {
  CONVERT_END,
  CONVERT_PROGRESS,
  CONVERT_START,
  FOLDER_OPEN,
  VIDEOS_DURATION,
  VIDEOS_DURATION_GOT,
} from './utils/constants'
import { VideoFileInfo } from './utils/types'
import ffmpeg from 'fluent-ffmpeg'

declare const MAIN_WINDOW_WEBPACK_ENTRY: any
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any

let mainWindow: BrowserWindow | null = null

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on(VIDEOS_DURATION, (_event, videos: VideoFileInfo[]) => {
  const promises = videos.map((video) => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        if (err) {
          reject(err)
        } else {
          video.duration = metadata.format.duration ?? 0
          resolve(video)
        }
      })
    })
  })

  Promise.all(promises).then((results) => {
    mainWindow?.webContents.send(VIDEOS_DURATION_GOT, results)
  })
})

ipcMain.on(CONVERT_START, (_event, videos: VideoFileInfo[]) => {
  videos.forEach((video) => {
    const outputDir = video.path.split(video.name)[0]
    const outputName = video.name.split('.')[0]
    const outputPath = `${outputDir}${outputName}.${video.format}`

    ffmpeg(video.path)
      .output(outputPath)
      .on('progress', (data) => {
        video.timemark = data.timemark
        mainWindow?.webContents.send(CONVERT_PROGRESS, video)
      })
      .on('end', () => {
        video.complete = true
        video.timemark = ''
        video.outputPath = outputPath
        mainWindow?.webContents.send(CONVERT_END, video)
      })
      .run()
  })
})

ipcMain.on(FOLDER_OPEN, (_event, filePath: string) => {
  console.log(filePath)
  shell.showItemInFolder(filePath)
})
