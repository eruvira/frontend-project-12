import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    setChannels: (state, action) => action.payload,
    addChannel: (state, action) => {
      state.push(action.payload)
    },
    removeChannel: (state, action) => {
      const id = action.payload
      return state.filter((channel) => channel.id !== id)
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload
      const channel = state.find((ch) => ch.id === id)
      if (channel) {
        channel.name = name
      }
    },
  },
})

export const { setChannels, addChannel, removeChannel, renameChannel } = channelsSlice.actions
export default channelsSlice.reducer
