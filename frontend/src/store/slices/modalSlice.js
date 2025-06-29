import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: null,
  channelId: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action) => {
      const { type, channelId = null } = action.payload
      state.type = type
      state.channelId = channelId
    },
    closeModal: () => initialState,
  },
})

export const { setModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
