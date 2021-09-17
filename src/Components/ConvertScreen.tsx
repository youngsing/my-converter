import React from 'react'
import { ConvertPanel } from './ConvertPanel'
import { VideoList } from './VideoList'
import { VideoSelectView } from './VideoSelectView'

export const ConvertScreen = () => {
  return (
    <div className="container">
      <VideoSelectView small />
      <VideoList />
      <ConvertPanel />
    </div>
  )
}
