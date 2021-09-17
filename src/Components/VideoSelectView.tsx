import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { VideoFileInfo } from '../utils/types'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { fetchVideosDuration } from '../Actions'
import { useHistory } from 'react-router'

interface VideoSelectViewProps {
  small?: boolean
}

export const VideoSelectView = ({ small }: VideoSelectViewProps) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onDrop = useCallback((files: File[]) => {
    const videoFileInfos = files.map((file) => fileToVideoFileInfo(file))
    console.log(videoFileInfos)
    fetchVideosDuration(videoFileInfos, dispatch)
    history.push('/convert')
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({
    multiple: true,
    accept: 'video/*',
    onDrop,
  })

  return (
    <Container
      {...getRootProps({ isDragAccept, isDragReject, isDragActive, small })}
    >
      <input {...getInputProps()} />
      <DropMessage isDragAccept={isDragAccept} isDragReject={isDragReject}>
        点击选择视频或者拖拽视频至此区域
      </DropMessage>
    </Container>
  )
}

const fileToVideoFileInfo = (file: File): VideoFileInfo => {
  return {
    lastModified: file.lastModified,
    name: file.name,
    path: file.path,
    size: file.size,
    type: file.type,
    duration: 0,
    timemark: '',
    format: 'aac',
    complete: false,
    outputPath: '',
  }
}

interface DropProps {
  isDragAccept?: boolean
  isDragReject?: boolean
  isDragActive?: boolean
  small?: boolean
}

const getColor = (props: DropProps) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#bdbdbd'
}

const Container = styled.div<DropProps>`
  margin: 5vh auto;
  width: ${(props) => (props.small ? '' : '90vw')};
  height: ${(props) => (props.small ? '25vh' : '90vh')};
  border-style: dashed;
  border-color: ${(props) => getColor(props)};
  border-radius: 5px;
  border-width: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  color: #eeeeee;
  outline: none;
  transition: border 0.24s ease-in-out;
`

const DropMessage = styled.h4<DropProps>`
  color: ${(props) => getColor(props)};
  text-align: center;
`
