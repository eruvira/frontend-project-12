import { createSlice } from '@reduxjs/toolkit'

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState: 1, 
  reducers: {
    setCurrentChannelId: (state, action) => action.payload,
  },
})

export const { setCurrentChannelId } = currentChannelSlice.actions
export default currentChannelSlice.reducer
