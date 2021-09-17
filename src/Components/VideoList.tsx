import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import 'moment-duration-format'
import { VideoFileInfo } from '../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { addVideo, removeVideo, videosSelector } from '../modules/videos/slice'
import { openFolder } from '../Actions'

const VIDEO_FORMATS = [
  { value: 'aac', option: 'AAC（音频）' },
  { value: 'mp3', option: 'MP3（音频）' },
]

export const VideoList = () => {
  const dispatch = useDispatch()
  const videoFileInfos = useSelector(videosSelector)
  const videos = Object.values(videoFileInfos)

  const deleteVideo = (video: VideoFileInfo) => {
    dispatch(removeVideo(video))
  }

  const renderProgressBar = ({
    duration,
    timemark,
    complete,
  }: {
    duration: number
    timemark: string
    complete: boolean
  }) => {
    if (timemark) {
      return `${
        100 - moment.duration(timemark).asMilliseconds() / (duration * 10)
      }%`
    } else if (complete) {
      return '0%'
    } else {
      return '100%'
    }
  }

  const formatVideoDuration = (video: VideoFileInfo): string => {
    return moment
      .duration(video.duration, 's')
      .format('hh:mm:ss', { trim: false })
  }

  const onFormatChange = (video: VideoFileInfo, format: string) => {
    dispatch(addVideo({ ...video, format }))
  }

  const showStatus = ({
    complete,
    outputPath,
  }: {
    complete: boolean
    outputPath: string
  }) => {
    if (complete) {
      return (
        <button onClick={() => openFolder(outputPath)} className="btn">
          Open Folder
        </button>
      )
    }
    //  else if (err) {
    //   return <p className="red-text">{err}</p>
    // }
    return ''
  }

  return (
    <TableView className="collection videoList">
      {videos.map((video) => {
        return (
          <Row key={video.path} className="collection-item avatar">
            <ConvertProgressBg style={{ right: renderProgressBar(video) }} />
            <i
              className="material-icons circle btn-floating"
              onClick={() => deleteVideo(video)}
            >
              clear
            </i>
            <VideoInfoBox>
              <p>{video.name}</p>
              <p>{formatVideoDuration(video)}</p>
            </VideoInfoBox>
            <VideoFormatSelect className="secondary-content">
              <select
                className={
                  video.complete || video.timemark
                    ? 'hidden'
                    : 'browser-default right'
                }
                onChange={(e) => onFormatChange(video, e.target.value)}
              >
                {VIDEO_FORMATS.map((format) => (
                  <option key={format.option} value={format.value}>
                    {format.option}
                  </option>
                ))}
              </select>
              {showStatus(video)}
            </VideoFormatSelect>
          </Row>
        )
      })}
    </TableView>
  )
}

const TableView = styled.ul`
  height: 50vh;
  overflow-y: scroll;
`

const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid #e0e0e0 !important;
`
const ConvertProgressBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  transition-property: right;
  transition-duration: 0.25s;
  background-color: #03a9f4;
  opacity: 0.25;
`

const VideoInfoBox = styled.div`
  width: 65%;
`

const VideoFormatSelect = styled.div`
  z-index: 1;
  width: 180px;
  top: auto !important;
`
