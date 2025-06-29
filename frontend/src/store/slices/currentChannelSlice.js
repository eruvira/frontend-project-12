import { createSlice } from '@reduxjs/toolkit'

const initialState = 1 

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => action.payload,
  },
})

export const { setCurrentChannelId } = currentChannelSlice.actions
export default currentChannelSlice.reducer
