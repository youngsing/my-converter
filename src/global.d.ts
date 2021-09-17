import { IpcRenderer } from 'electron'
import { VideoFileInfo } from './utils/types'

declare global {
  var myAPI: Sandbox
}

export interface Sandbox {
  getVideosDuration: (videos: VideoFileInfo[]) => void
  onVideosDuration: (
    listener: (
      event: Electron.IpcRendererEvent,
      videos: VideoFileInfo[]
    ) => void
  ) => Electron.ipcRenderer
  convertVideos: (videos: VideoFileInfo[]) => void
  onConvertProgress: (
    listener: (event: Electron.IpcRendererEvent, video: VideoFileInfo) => void
  ) => Electron.IpcRenderer
  onConvertEnd: (
    listener: (event: Electron.IpcRendererEvent, video: VideoFileInfo) => void
  ) => IpcRenderer
  openFolder: (path: string) => void
}
