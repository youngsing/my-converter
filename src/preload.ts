import { contextBridge, ipcRenderer } from 'electron'
import {
  CONVERT_END,
  CONVERT_PROGRESS,
  CONVERT_START,
  FOLDER_OPEN,
  VIDEOS_DURATION,
  VIDEOS_DURATION_GOT,
} from './utils/constants'
import { VideoFileInfo } from './utils/types'

contextBridge.exposeInMainWorld('myAPI', {
  getVideosDuration: (videos: VideoFileInfo[]) =>
    ipcRenderer.send(VIDEOS_DURATION, videos),
  onVideosDuration: (
    listener: (
      event: Electron.IpcRendererEvent,
      videos: VideoFileInfo[]
    ) => void
  ) => ipcRenderer.on(VIDEOS_DURATION_GOT, listener),
  convertVideos: (videos: VideoFileInfo[]) =>
    ipcRenderer.send(CONVERT_START, videos),
  onConvertProgress: (
    listener: (event: Electron.IpcRendererEvent, video: VideoFileInfo) => void
  ) => ipcRenderer.on(CONVERT_PROGRESS, listener),
  onConvertEnd: (
    listener: (event: Electron.IpcRendererEvent, video: VideoFileInfo) => void
  ) => ipcRenderer.on(CONVERT_END, listener),
  openFolder: (path: string) => ipcRenderer.send(FOLDER_OPEN, path),
})
