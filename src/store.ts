import { configureStore } from '@reduxjs/toolkit'
import videos from './modules/videos/slice'

export const store = configureStore({
  reducer: {
    videos,
  },
})
