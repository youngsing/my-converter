import { Dispatch } from 'redux'
import { addVideo, addVideos } from '../modules/videos/slice'
import { VideoFileInfo } from '../utils/types'

export const fetchVideosDuration = (
  videos: VideoFileInfo[],
  dispatch: Dispatch<any>
) => {
  myAPI.getVideosDuration(videos)
  myAPI.onVideosDuration((_event, videoInfos) => {
    dispatch(addVideos(videoInfos))
  })
}

export const startCovertVideo = (
  videos: VideoFileInfo[],
  dispatch: Dispatch<any>
) => {
  myAPI.convertVideos(videos)
  myAPI.onConvertProgress((_event, video) => {
    dispatch(addVideo(video))
  })
  myAPI.onConvertEnd((_event, video) => {
    dispatch(addVideo(video))
  })
}

export const openFolder = (path: string) => {
  myAPI.openFolder(path)
}
