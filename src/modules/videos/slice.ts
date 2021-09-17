import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, VideoFileInfo } from '../../utils/types'

const initialState: RootState['videos'] = {}

const slice = createSlice({
  name: 'videos',
  initialState: initialState,
  reducers: {
    addVideo: (state, action: PayloadAction<VideoFileInfo>) => {
      state[action.payload.path] = action.payload
    },
    addVideos: (state, action: PayloadAction<VideoFileInfo[]>) => {
      action.payload.forEach((video) => {
        state[video.path] = video
      })
    },
    removeVideo: (state, action: PayloadAction<VideoFileInfo>) => {
      delete state[action.payload.path]
    },
    removeAllVideos: () => {
      return initialState
    },
  },
})

export default slice.reducer

export const {
  addVideo,
  addVideos,
  removeVideo,
  removeAllVideos,
} = slice.actions

export const videosSelector = (state: RootState) => state.videos
