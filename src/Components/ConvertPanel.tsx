import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { removeAllVideos, videosSelector } from '../modules/videos/slice'
import { startCovertVideo } from '../Actions'

export const ConvertPanel = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const videoInfos = useSelector(videosSelector)
  const videos = Object.values(videoInfos).filter((v) => !v.complete)

  const onCancel = () => {
    dispatch(removeAllVideos())
    history.push('/')
  }

  const onConvert = () => {
    startCovertVideo(videos, dispatch)
    // ipcRenderer.send('convert:start', infos)
    // ipcRenderer.on('convert:progress', (_event, videoInfo: VideoFileInfo) => {
    //   dispatch(videoConvertProgress(videoInfo))
    // })
    // ipcRenderer.on('convert:end', (_event, videoInfo: VideoFileInfo) => {
    //   console.log(videoInfo)
    //   dispatch(addVideo(videoInfo))
    // })
  }

  return (
    <Container>
      <button className="btn red" onClick={onCancel}>
        取消
      </button>
      <button className="btn" onClick={onConvert}>
        转换
      </button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
