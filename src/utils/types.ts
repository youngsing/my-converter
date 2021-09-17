export interface RootState {
  videos: { [key: string]: VideoFileInfo }
}

export interface VideoFileInfo {
  lastModified: number
  name: string
  path: string
  size: number
  type: string
  duration: number
  timemark: string
  format: string
  complete: boolean
  outputPath: string
}
